import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const load = path => vite.ssrLoadModule(`/app/${path}`);
const [study, bridge, state, model, queue, forms, cards, sync, { emptyV2State: empty }] = await Promise.all([
  load("study-app.tsx"), load("vocabulary-learning/reading-marks.ts"), load("article-v2/state.ts"), load("vocabulary-learning/model.ts"),
  load("vocabulary-learning/queue.ts"), load("vocabulary-learning/word-forms.tsx"), load("vocabulary-learning/learning-card.tsx"), load("study-sync.ts"),
  vite.ssrLoadModule("/tests/fixtures/article-v2-synthetic.ts"),
]);
const corpus = study.vocabularyCorpus;
function mark(expression, sourceId = "2013-p1-s1", kind = "word") {
  const source = corpus.getSource(sourceId);
  const start = source.text.indexOf(expression);
  assert.ok(start >= 0);
  return { articleId: source.articleId, sourceId, kind, start, end: start + expression.length };
}
function add(snapshot, input, at = 10) { return bridge.enrollReadingMark(state.setSourceMark(snapshot, input, true, at), input, corpus, at, true); }

test("confirmed reading words enroll the exact source/sense, survive snapshot validation and enter global review queues", () => {
  const input = mark("automated");
  const saved = add(empty, input);
  const [memory] = Object.values(saved.vocabularyMemories);
  assert.equal(memory.headword, "automate");
  assert.equal(memory.contexts[0].expression, "automated");
  assert.equal(memory.contexts[0].sourceId, "2013-p1-s1");
  assert.equal(memory.contexts[0].mark, "完全不会");
  assert.equal(bridge.isMarkedVocabulary(memory, {}), true);
  assert.equal(memory.status, "review");
  assert.deepEqual(saved.answers, empty.answers);
  assert.equal(sync.isStudySnapshot(saved), true);
  const restored = JSON.parse(JSON.stringify(saved));
  const result = queue.createLearningQueue(restored.vocabularyMemories, [], { ...model.DEFAULT_SETTINGS, dailyWords: 0, dailyPhrases: 0 }, 20, "review", { memoryIds: [memory.id] });
  assert.equal(result.queue.length, 1);
  assert.equal(result.queue[0].memoryId, memory.id);
  assert.equal(bridge.enrollSavedReadingMarks(saved, corpus, 30), saved);
  assert.equal(Object.keys(add(saved, input, 40).vocabularyMemories).length, 1);
});

test("past active marks backfill without resetting learning or paused schedules; different senses stay separate", () => {
  let old = state.setSourceMark(empty, mark("average"), true, 10);
  old = state.setSourceMark(old, mark("average", "2013-p1-s5"), true, 11);
  const saved = bridge.enrollSavedReadingMarks(old, corpus, 30);
  const memories = Object.values(saved.vocabularyMemories);
  assert.equal(memories.length, 1, "ordinary/ordinary level share one core meaning");
  assert.equal(memories[0].contexts.length, 2);
  const existing = { ...memories[0], status: "paused", paused: true, dueAt: 90000, intervalDays: 7, consecutiveKnown: 3, lastReviewedAt: 25 };
  const learned = { ...saved, vocabularyMemories: { ...saved.vocabularyMemories, [existing.id]: existing } };
  assert.equal(bridge.enrollSavedReadingMarks(learned, corpus, 80), learned);
  assert.deepEqual(learned.vocabularyMemories[existing.id], existing);
});

test("only reviewed phrases become independent memories; whole sentences, invalid sources and cancelled drafts do not", () => {
  const phrase = mark("keep the man away from", "2013-p1-s2", "phrase");
  const saved = add(empty, phrase);
  const [memory] = Object.values(saved.vocabularyMemories);
  assert.equal(memory.kind, "phrase");
  assert.match(memory.termKey, /^pattern:/);
  assert.equal(memory.contexts[0].expression, "keep the man away from");
  const invalid = [mark("the author Adam", "2013-p1-s1", "phrase"), mark("automated", "2013-p1-s1", "sentence"), { ...mark("automated"), articleId: "2010-p1" }];
  for (const input of invalid) assert.equal(bridge.enrollReadingMark(empty, input, corpus, 50), empty);
  const cancelled = state.setSourceMark(empty, mark("automated"), false, 50);
  assert.equal(bridge.enrollSavedReadingMarks(cancelled, corpus, 60), cancelled);
});

test("undo retracts only untouched new enrollment, preserves later learning and allows deliberate re-marking", () => {
  const input = mark("automated");
  const saved = add(empty, input);
  const unmarked = state.undoSourceMark(saved, input, { updatedAt: 10, active: true }, false, 20);
  const undone = bridge.undoReadingEnrollment(unmarked, empty.vocabularyMemories, saved.vocabularyMemories, corpus, 20);
  const [memory] = Object.values(undone.vocabularyMemories);
  assert.equal(memory.status, "paused");
  assert.equal(queue.createLearningQueue(undone.vocabularyMemories, [], model.DEFAULT_SETTINGS, 30, "new").queue.length, 0);
  assert.equal(add(undone, input, 40).vocabularyMemories[memory.id].paused, false);
  const studied = { ...unmarked, vocabularyMemories: { ...unmarked.vocabularyMemories, [memory.id]: { ...saved.vocabularyMemories[memory.id], lastReviewedAt: 15, updatedAt: 15, consecutiveKnown: 1 } } };
  assert.equal(bridge.undoReadingEnrollment(studied, empty.vocabularyMemories, saved.vocabularyMemories, corpus, 20), studied);
  // Explicit removal of highlighting never deletes previously accumulated study history.
  assert.equal(state.setSourceMark(saved, input, false, 30).vocabularyMemories, saved.vocabularyMemories);
});

test("word cards lead with the lemma while original inflections remain in the sentence; fronts do not reveal answers", () => {
  const candidate = corpus.resolveCandidate("automated", false, "2013-p1-s1", true);
  const props = { candidate, sourceLabel: "2013 · 第1句", revealed: false, onSource() {}, onReveal() {}, onRate() {} };
  const front = renderToStaticMarkup(React.createElement(cards.WordLearningCard, props));
  assert.match(front, /<h3 lang="en">automate<\/h3>/);
  assert.match(front, /本句词形：<span lang="en">automated<\/span>/);
  assert.match(front, /<mark>automated<\/mark>/);
  assert.ok(!front.includes(candidate.entry.contextualMeaning));
  const answer = renderToStaticMarkup(React.createElement(cards.WordLearningCard, { ...props, revealed: true }));
  for (const form of ["automate", "automates", "automated", "automating"]) assert.ok(answer.includes(form));
  assert.match(answer, /aria-label="词形变化"/);
  assert.ok(answer.indexOf('class="vl-card-actions"') < answer.indexOf('class="word-forms"'));
});

test("declared ordinary and irregular forms are recovered across articles without turning derivations into inflections", () => {
  const automated = study.resolveEntry("automated", false, "2013-p1-s1");
  const info = forms.wordFormInfo({ ...automated, specialForms: [] });
  assert.ok(info.forms.includes("automates") && info.forms.includes("automating"));
  const produce = forms.wordFormInfo(study.resolveEntry("produces", false, "cloze-s1"));
  assert.ok(produce.forms.includes("produced") && produce.forms.includes("producing"));
  assert.ok(!produce.forms.includes("production"));
  const be = forms.wordFormInfo(study.resolveEntry("is", false, "2013-p1-s2"));
  for (const value of ["was", "were", "been", "being"]) assert.ok([...be.forms, ...be.notes].some(line => line.includes(value)), value);
  assert.equal(forms.vocabularyTitle(automated), "automate");
  assert.equal(automated.display, "automated", "rendering must not mutate source lookup data or stable keys");
});
