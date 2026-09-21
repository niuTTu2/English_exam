import assert from 'node:assert/strict';
import test, { after } from 'node:test';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const root = fileURLToPath(new URL('..', import.meta.url));
const vite = await createServer({ root, configFile: false, appType: 'custom', resolve: { alias: { '@': root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const load = path => vite.ssrLoadModule(`/app/${path}`);
const [study, data, bridge, model, queue, globals, marked, overview, groups, learning, mistakes] = await Promise.all([
 load('study-app.tsx'), load('data.ts'), load('vocabulary-learning/reading-marks.ts'), load('vocabulary-learning/model.ts'), load('vocabulary-learning/queue.ts'), load('vocabulary-learning/global-marks.tsx'), load('article-v2/marked-vocabulary.tsx'), load('vocabulary-learning/sense-overview.ts'), load('vocabulary-learning/memory-groups.ts'), load('vocabulary-learning/vocabulary-learning.tsx'), load('article-v2/question-mistake-card.tsx'),
]);
const corpus = study.vocabularyCorpus;
const empty = { answers: {}, practiceAttempts: {}, submittedSections: {}, marks: {}, lists: [], listItems: {}, termNotes: {}, sentenceNotes: {} };
function mark(word, sourceId) {
 const source = corpus.getSource(sourceId), start = source.text.indexOf(word); assert.ok(start >= 0, `${word} in ${sourceId}`);
 return { id: `${sourceId}:${word}`, articleId: source.articleId, sourceId, start, end: start + word.length, kind: 'word', active: true, createdAt: 10, updatedAt: 10 };
}
function add(state, input) { return bridge.enrollReadingMark({ ...state, articleV2Marks: { ...state.articleV2Marks, [input.id]: input } }, input, corpus, 10, true); }

test('prompt and option marks expose their exact translations in reading/analysis and enter global review with zero new quota', () => {
 const q = data.articleContents['2013-p1'].questions[0];
 const inputs = [mark('used', `question-${q.id}-prompt`), mark('advances', data.questionOptionSourceId(q, 'A'))];
 let saved = empty; for (const input of inputs) saved = add(saved, input);
 const values = marked.markedArticleVocabulary(data.articleContents['2013-p1'], saved, corpus);
 assert.equal(values.length, 2);
 for (const candidate of values) {
  assert.equal(candidate.entry.contextualMeaning, study.resolveEntry(candidate.context.expression, false, candidate.context.sourceId).contextualMeaning);
  assert.ok(candidate.entry.contextualMeaning.trim());
 }
 const html = renderToStaticMarkup(React.createElement(marked.MarkedVocabulary, { article: data.articleContents['2013-p1'], data: saved, corpus, onTerm() {} }));
 assert.match(html, /题干/); assert.match(html, /选项/);
 for (const candidate of values) assert.ok(html.includes(candidate.entry.contextualMeaning));
 const result = queue.createLearningQueue(saved.vocabularyMemories, [], { ...model.DEFAULT_SETTINGS, dailyWords: 0, dailyPhrases: 0 }, 20, 'review');
 assert.equal(result.queue.length, 2); assert.ok(result.queue.every(item => item.kind === 'review'));
 assert.ok(Object.values(saved.vocabularyMemories).every(memory => !memory.lastReviewedAt && memory.consecutiveKnown === 0));
 const home = renderToStaticMarkup(React.createElement(learning.VocabularyLearning, { data: saved, corpus, articleId: '2000-p1', articleLabel: '其他年份', year: 2000, lists: [], listItems: {}, marks: {}, notes: {}, onUpdate() {}, onSource() {} }));
 assert.match(home, /全局待复习 <b>2<\/b>/); assert.match(home, /value="all" selected/); assert.match(home, /advance/);
});

test('global highlights follow source-aware lemmas across years without recruiting other senses or mutating records', () => {
 const saved = add(empty, mark('past', '2013-p1-s4')), before = JSON.stringify(saved);
 const lookup = globals.createGlobalMarkLookup(saved, corpus);
 for (const id of ['p2-s12', 'p2-s23', '2010-p3-s1', '2012-p5-s23']) assert.equal(lookup('past', id), true, id);
 assert.equal(lookup('future', '2013-p1-s4'), false);
 const used = add(empty, mark('used', 'question-201321-prompt'));
 assert.equal(globals.createGlobalMarkLookup(used, corpus)('use', '2011-p1-s9'), true);
 const html = renderToStaticMarkup(React.createElement(globals.GlobalVocabularyProvider, { data: saved, corpus }, React.createElement(globals.GlobalMarkedText, { text: 'in the past', sourceId: 'p2-s12' })));
 assert.match(html, /global-vocabulary-mark/); assert.equal(JSON.stringify(saved), before);
});

test('old marked-new records upgrade once; learned/future and paused schedules remain untouched', () => {
 const saved = add(empty, mark('past', '2013-p1-s4')), memory = Object.values(saved.vocabularyMemories)[0];
 const old = { ...saved, vocabularyMemories: { [memory.id]: { ...memory, status: 'unseen' } } };
 const promoted = bridge.promoteMarkedMemories(old, 50);
 assert.equal(promoted.vocabularyMemories[memory.id].status, 'review'); assert.equal(bridge.promoteMarkedMemories(promoted, 60), promoted);
 for (const changes of [{ status: 'review', dueAt: 99999, lastReviewedAt: 30 }, { status: 'paused', paused: true }]) {
  const value = { ...old, vocabularyMemories: { [memory.id]: { ...old.vocabularyMemories[memory.id], ...changes } } };
  assert.equal(bridge.promoteMarkedMemories(value, 60), value);
 }
});

test('reviewed synonyms merge across all source wording while real semantic differences remain separate', () => {
 const expectations = { past: 1, average: 4, disappear: 1, ensure: 1, replace: 1, relate: 2, compete: 1, include: 1 };
 for (const [word, expected] of Object.entries(expectations)) {
  const entry = study.resolveEntry(word, false), rows = overview.buildSenseOverview(entry).filter(row => !row.annotationReason);
  assert.equal(rows.length, expected, `${word}: ${rows.map(row => row.meaning).join(' / ')}`);
  for (const row of rows) assert.equal(row.count, row.sources.length ? new Set(row.sources.map(source => source.sourceId)).size : null);
 }
 const past = study.resolveEntry('past', false, '2013-p1-s4');
 const rows = overview.buildSenseOverview(past, '2013-p1-s4'); assert.equal(rows[0].count, 9); assert.equal(rows[0].current, true);
 for (const source of past.occurrences) for (const context of source.contexts ?? []) assert.ok(rows[0].sources.some(item => item.sourceId === source.sourceId && item.partOfSpeech === context.partOfSpeech && item.meaning === context.meaning && item.use === context.use));
 const patient = overview.buildSenseOverview(study.resolveEntry('patient', false)).filter(row => !row.annotationReason);
 assert.ok(patient.some(row => row.meaning === '患者')); assert.ok(patient.some(row => row.meaning.includes('耐心')));
});

test('legacy past noun/adjective identities share a queue item without deleting saved IDs or sources', () => {
 const a = model.createMemory(corpus.resolveCandidate('past', false, 'p2-s12', true), 1);
 const b = model.createMemory(corpus.resolveCandidate('past', false, 'p2-s23', true), 2);
 a.id = 'old-n'; a.partOfSpeech = 'n'; a.senseId = 'reviewed:past-time'; a.meaning = '过去'; a.status = 'review';
 b.id = 'old-adj'; b.partOfSpeech = 'adj'; b.senseId = 'reviewed:past'; b.meaning = '过去的'; b.status = 'review';
 const original = { [a.id]: a, [b.id]: b }; const snapshot = JSON.stringify(original);
 assert.equal(groups.memoryGroups(original).groups.length, 1);
 const result = queue.createLearningQueue(original, [], model.DEFAULT_SETTINGS, 20, 'review');
 assert.equal(result.queue.length, 1); assert.deepEqual(Object.keys(result.memories).sort(), ['old-adj', 'old-n']); assert.equal(JSON.stringify(original), snapshot);
});

test('analysis exposes every original prompt/option as source-specific lookup buttons', () => {
 const article = data.articleContents['2013-p1'], q = article.questions[0];
 const html = renderToStaticMarkup(React.createElement(mistakes.QuestionMistakeCard, { article, question: q, data: { ...empty, answers: { [q.id]: 'B' } }, onTerm() {}, onUpdate() {}, onSource() {}, renderDetails() { return null; } }));
 assert.match(html, /aria-label="题干与选项查词"/); assert.match(html, /aria-label="查看单词 advances"/);
});
