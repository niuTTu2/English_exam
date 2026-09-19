import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const cards = await vite.ssrLoadModule("/app/vocabulary-learning/learning-card.tsx");
const spelling = await vite.ssrLoadModule("/app/vocabulary-learning/spelling-practice.tsx");
const { VocabularyHome } = await vite.ssrLoadModule("/app/vocabulary-learning/vocabulary-home.tsx");
const { VocabularyLearning } = await vite.ssrLoadModule("/app/vocabulary-learning/vocabulary-learning.tsx");
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const sessionModel = await vite.ssrLoadModule("/app/vocabulary-learning/session.ts");
const { createVocabularyCorpus } = await vite.ssrLoadModule("/app/vocabulary-learning/corpus.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const sources = Object.values(articleContents).flatMap(article => article.sentences.map(sentence => ({ id: sentence.id, sentenceId: sentence.id, article, text: sentence.text, section: `${article.label}正文` })));
const phraseAnnotations = Object.values(articleContents).flatMap(article => article.sentences.flatMap(sentence => sentence.phrases.map(label => ({ label, sourceId: sentence.id }))));
const corpus = createVocabularyCorpus({ sources, phraseAnnotations, resolveEntry: study.resolveEntry, findTermContexts: study.findTermContexts, tokenizeWords: text => text.match(/[a-z]+(?:['’-][a-z]+)?/gi) ?? [] });
const noop = () => {};
function cardProps(label, sourceId, phrase = false) {
  const candidate = corpus.resolveCandidate(label, phrase, sourceId);
  assert.ok(candidate, `${label} must resolve a real source`);
  return { candidate, sourceLabel: `${candidate.context.year} · ${candidate.sourceLabel}`, revealed: false, onSource: noop, onReveal: noop, onRate: noop };
}

test("word front exposes a real highlighted source but never the Chinese answer, use, note or expanded dictionary", () => {
  const props = { ...cardProps("momentum", "2010-p1-s5"), note: "这是不应提前泄露的私人答案" };
  const html = renderToStaticMarkup(React.createElement(cards.WordLearningCard, props));
  assert.match(html, /data-card-face="front"/);
  assert.match(html, /核心迁移词/);
  assert.match(html, /<mark>momentum<\/mark>/);
  assert.match(html, /The world art market/);
  assert.match(html, /显示释义/);
  for (const answer of [props.candidate.entry.contextualMeaning, props.candidate.entry.use, props.candidate.translation, props.note]) if (answer) assert.ok(!html.includes(answer));
  assert.doesNotMatch(html, /其他义项|我的笔记|回忆后自评/);
});

test("answer gives contextual meaning, translation and four large self-ratings with all dictionary details folded", () => {
  const props = { ...cardProps("momentum", "2010-p1-s5"), revealed: true };
  const html = renderToStaticMarkup(React.createElement(cards.WordLearningCard, props));
  assert.ok(html.includes(props.candidate.entry.contextualMeaning));
  assert.ok(html.includes(props.candidate.translation));
  for (const rating of ["忘了", "模糊", "认识", "太简单"]) assert.ok(html.includes(`<span>${rating}</span>`));
  assert.match(html, /aria-label="回忆后自评"/);
  assert.match(html, /回到原句/);
  assert.ok(html.indexOf('class="vl-card-actions"') < html.indexOf('class="vl-extras"'), "rating is reachable before dictionary extras");
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/);
  assert.equal((html.match(/class="vl-rating vl-rating-/g) ?? []).length, 4);
});

test("filed for bankruptcy is a whole phrase card with canonical instance, variable structure and exact source cloze", () => {
  const props = cardProps("filed for bankruptcy", "2010-p1-s4", true);
  const front = renderToStaticMarkup(React.createElement(cards.PhraseLearningCard, { ...props, initialCloze: true }));
  assert.match(front, /data-card-kind="phrase"/);
  assert.match(front, /回忆整组表达/);
  assert.match(front, /class="vl-blank"/);
  assert.doesNotMatch(front, /filed for bankruptcy|申请破产/);
  const answer = renderToStaticMarkup(React.createElement(cards.PhraseLearningCard, { ...props, revealed: true }));
  assert.match(answer, /filed for bankruptcy/);
  assert.match(answer, /file for bankruptcy/);
  assert.match(answer, /规范形式|搭配规则/);
  assert.match(answer, /申请破产/);
});

test("all but two remains one quantity structure, using the unchanged original source", () => {
  const props = cardProps("all but two", "2010-p1-s2", true);
  const answer = renderToStaticMarkup(React.createElement(cards.PhraseLearningCard, { ...props, revealed: true }));
  assert.match(answer, /<mark>All but two<\/mark>/);
  assert.match(answer, /除.*两/);
  assert.equal(props.candidate.entry.kind, "phrase");
});

test("phrase cloze respects word boundaries and preserves punctuation", () => {
  assert.deepEqual(cards.expressionRanges("another than; other than; other thanks", "other than"), [{ start: 14, end: 24 }]);
  assert.deepEqual(cards.expressionRanges("In the U.S., people agree.", "In the U.S."), [{ start: 0, end: 11 }]);
  assert.equal(cards.expressionRanges("", "").length, 0);
});

test("home has three principal actions, all scopes and opt-in spelling, names and function words", () => {
  const html = renderToStaticMarkup(React.createElement(VocabularyHome, { metrics: { dueWords: 8, duePhrases: 3, overdue: 2, completed: 6, newWords: 2, newPhrases: 1, remainingNew: 12, estimatedMinutes: 6 }, settings: model.DEFAULT_SETTINGS, scope: { kind: "article" }, articleLabel: "Text 1", year: 2010, lists: ["本周重点"], onScope: noop, onSettings: noop, onStart: noop, onResume: noop }));
  for (const action of ["继续上次学习", "今日复习", "学习新词"]) assert.ok(html.includes(action));
  for (const scope of ["article", "year", "all", "marked", "list"]) assert.ok(html.includes(`value="${scope}"`));
  assert.match(html, /只学 10 个|只学 10 分钟/);
  assert.equal(model.DEFAULT_SETTINGS.spellingEnabled, false);
  assert.equal(model.DEFAULT_SETTINGS.includeNames, false);
  assert.equal(model.DEFAULT_SETTINGS.includeFunctionWords, false);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/);
});

test("spelling offers exact-source cloze and reliable phrase key parts without leaking the expression into the input", () => {
  const { candidate, sourceLabel } = cardProps("filed for bankruptcy", "2010-p1-s4", true);
  const html = renderToStaticMarkup(React.createElement(spelling.SpellingPractice, { candidate, sourceLabel, onSubmit: noop, onSkip: noop }));
  assert.equal(spelling.phraseKeyPart(candidate), "for");
  assert.match(html, /词组关键成分补全/);
  assert.match(html, /看中文／听音拼写/);
  assert.match(html, /autoComplete="off"/);
  assert.match(html, /spellCheck="false"/);
  assert.match(html, /enterKeyHint="done"/);
  assert.doesNotMatch(html, /value="filed for bankruptcy"/);
  assert.match(html, /<form[^>]*class="vl-spelling-form"/);
  assert.match(html, /type="submit"/);
});

test("form-choice options only use explicit reviewed forms and disappear when none exist", () => {
  const { candidate } = cardProps("momentum", "2010-p1-s5");
  assert.deepEqual(spelling.reviewedSpellingForms({ ...candidate, entry: { ...candidate.entry, specialForms: [] } }), []);
  const reviewed = { ...candidate, context: { ...candidate.context, expression: "sought" }, entry: { ...candidate.entry, specialForms: ["seek（原形）", "seeks（第三人称单数）", "sought（过去式/过去分词）", "seeking（-ing）"] } };
  assert.deepEqual(spelling.reviewedSpellingForms(reviewed), ["seek", "seeking", "seeks", "sought"]);
});

test("restored seventh card is rendered from persisted cursor without replaying six ratings", () => {
  const { candidate } = cardProps("momentum", "2010-p1-s5");
  const memory = model.createMemory(candidate, 100);
  const queue = Array.from({ length: 8 }, (_, index) => ({ id: `item-${index}`, memoryId: memory.id, kind: "review", contextId: candidate.context.id }));
  const saved = { ...sessionModel.createSession(queue, 100, { id: "restore-test" }), cursor: 6, attemptIds: ["one", "two", "three", "four", "five", "six"] };
  const updates = [];
  const html = renderToStaticMarkup(React.createElement(VocabularyLearning, { data: { vocabularyMemories: { [memory.id]: memory }, vocabularySessions: { [saved.id]: saved }, vocabularyQueueState: { activeSessionId: saved.id, updatedAt: 100 } }, onUpdate: update => updates.push(update), corpus, articleId: "2010-p1", articleLabel: "Text 1", year: 2010, lists: [], listItems: {}, marks: {}, notes: {}, onSource: noop }));
  assert.match(html, /第 7 张/);
  assert.match(html, /已完成 6 张/);
  assert.match(html, /剩余 2 张/);
  assert.equal(updates.length, 0, "rendering restoration must not settle previous attempts");
});

test("mobile layout uses shrinkable columns, safe-area actions and a keyboard-friendly spelling form", async () => {
  const css = await readFile(new URL("../app/vocabulary-learning/vocabulary-learning.css", import.meta.url), "utf8");
  assert.match(css, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.vl-card-actions\s*\{[^}]*position: sticky;[^}]*safe-area-inset-bottom/s);
  assert.match(css, /\.vl-rating\s*\{[^}]*min-height: 66px/s);
  assert.match(css, /\.vl-spelling-form button\s*\{ position: static;/);
  assert.match(css, /scroll-margin-block: 120px/);
  assert.match(css, /@media \(max-width: 380px\)/);
  assert.match(css, /\.vl-root select, \.vl-root input, \.vl-root textarea\s*\{ font-size: 16px/);
});
