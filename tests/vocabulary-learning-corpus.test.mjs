import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { createVocabularyCorpus, vocabularyCandidateAllowed } = await vite.ssrLoadModule("/app/vocabulary-learning/corpus.ts");
const { createMemory, mergeCandidate, DEFAULT_SETTINGS, isCandidateEligible } = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");

// The bridge deliberately calls the production resolver and legacy source lookup.
// Test fixtures are references to existing articles, never another set of word content.
const articles = Object.values(articleContents);
const sources = articles.flatMap(article => [
  ...article.sentences.map(sentence => ({ id: sentence.id, sentenceId: sentence.id, article, text: sentence.text, section: `${article.label}正文` })),
  ...article.questions.flatMap(question => [
    { id: `question-${question.id}-prompt`, article, text: question.prompt, section: `${article.label}第 ${question.number ?? question.id} 题题干` },
    ...(question.format === "matching" && question.id !== question.sharedOptionsId ? [] : question.options.map(option => ({ id: `question-${question.format === "matching" ? question.sharedOptionsId : question.id}-option-${option.key}`, article, text: option.text, section: `${article.label}选项${option.key}` }))),
  ]),
]);
const phraseAnnotations = articles.flatMap(article => [
  ...article.sentences.flatMap(sentence => sentence.phrases.map(label => ({ label, sourceId: sentence.id }))),
  ...article.questions.flatMap(question => [
    ...(question.analysis?.prompt?.phrases ?? []).map(label => ({ label, sourceId: `question-${question.id}-prompt` })),
    ...question.options.flatMap(option => (question.analysis?.options?.[option.key]?.phrases ?? []).map(label => ({ label, sourceId: `question-${question.format === "matching" ? question.sharedOptionsId : question.id}-option-${option.key}` }))),
  ]),
]);
const bridge = {
  sources, phraseAnnotations,
  resolveEntry: study.resolveEntry, findTermContexts: study.findTermContexts,
  tokenizeWords: text => text.match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [],
};
const corpus = createVocabularyCorpus(bridge);
const word = (label, sourceId, manual = false) => corpus.resolveCandidate(label, false, sourceId, manual);
const phrase = (label, sourceId) => corpus.resolveCandidate(label, true, sourceId);

test("momentum keeps the reviewed contextual meaning, priority, source text and translation", () => {
  const candidate = word("momentum", "2010-p1-s5");
  assert.equal(candidate.entry.key, "momentum");
  assert.equal(candidate.priority.id, "core");
  assert.match(candidate.entry.contextualMeaning, /势头/);
  const sentence = articleContents["2010-p1"].sentences.find(item => item.id === "2010-p1-s5");
  assert.equal(candidate.text, sentence.text);
  assert.equal(candidate.translation, sentence.natural);
  assert.equal(candidate.context.sourceType, "sentence");
  assert.equal(candidate.context.year, 2010);
  assert.ok(isCandidateEligible(candidate, DEFAULT_SETTINGS));
  const memory = createMemory(candidate, 1000);
  assert.equal(memory.termKey, "momentum");
  assert.equal(memory.contexts[0].text, undefined, "source text stays in the corpus");
  assert.equal(memory.entry, undefined, "a memory is not a duplicate dictionary entry");
});

test("note tone shares two real contexts while annotation and noticing remain independent", () => {
  const dramatic = word("note", "2010-p1-s1");
  const hypocrisy = word("note", "p5-s5");
  const annotation = word("notes", "p3-s10");
  const notice = word("noted", "2010-cloze-s5");
  const original = createMemory(dramatic, 1000);
  const remembered = { ...original, dueAt: 9_000_000, intervalDays: 14, consecutiveKnown: 4, status: "review" };
  const merged = mergeCandidate({ [remembered.id]: remembered }, hypocrisy, 2000);
  assert.equal(merged.id, remembered.id);
  assert.equal(merged.contexts.length, 2);
  assert.equal(merged.primaryContextId, dramatic.context.id);
  assert.equal(merged.dueAt, remembered.dueAt);
  assert.equal(new Set([merged.id, createMemory(annotation, 1000).id, createMemory(notice, 1000).id]).size, 3);
  const cards = corpus.candidatesForMemory(merged);
  assert.deepEqual(cards.map(card => card.context.sourceId), ["2010-p1-s1", "p5-s5"]);
  assert.match(cards[0].entry.contextualMeaning, /基调/);
  assert.match(cards[1].entry.contextualMeaning, /意味；色彩/);
  assert.equal(dramatic.entry.counts.lemma, notice.entry.counts.lemma);
  assert.deepEqual(dramatic.entry.familyDetails, notice.entry.familyDetails);
});

test("work forms and synonymous artwork wording share one sense without absorbing employment", () => {
  const works = word("works", "2010-p1-s1");
  const work = word("work", "2010-p1-s17");
  const option = word("works", "question-201022-option-D");
  const employment = word("work", "2010-p2-s8");
  assert.equal(createMemory(works, 1000).id, createMemory(work, 1000).id);
  assert.equal(createMemory(works, 1000).id, createMemory(option, 1000).id);
  assert.notEqual(createMemory(works, 1000).id, createMemory(employment, 1000).id);
});

test("filed for bankruptcy is a stable independent phrase with original and canonical forms", () => {
  const candidate = phrase("filed for bankruptcy", "2010-p1-s4");
  assert.equal(candidate.entry.kind, "phrase");
  assert.equal(candidate.entry.key, "pattern:2010-p1-filed-for-bankruptcy");
  assert.equal(candidate.entry.sourceExpression, "filed for bankruptcy");
  assert.equal(candidate.canonicalInstance, "file for bankruptcy");
  assert.equal(candidate.entry.canonicalForm, "file for + legal status");
  assert.match(candidate.entry.contextualMeaning, /申请破产/);
  assert.equal(candidate.priority.id, "structure");
  assert.match(candidate.entry.structures[0].rule, /正式提交申请/);
  const key = createMemory(candidate, 1000).id;
  assert.notEqual(key, createMemory(word("filed", "2010-p1-s4"), 1000).id);
  const byWord = corpus.phraseCandidatesForWord("filed", "2010-p1-s4");
  assert.deepEqual(byWord.map(item => item.entry.key), [candidate.entry.key]);
  const manualScope = corpus.candidatesForScope({ kind: "marked", keys: [candidate.entry.key], contexts: [candidate.context] });
  assert.equal(manualScope.length, 1);
  assert.equal(manualScope[0].entry.kind, "phrase", "a phrase mark cannot spawn component word cards");
});

test("all but two remains a quantity expression with an exclusion rule", () => {
  const candidate = phrase("all but two", "2010-p1-s2");
  assert.equal(candidate.entry.key, "pattern:2010-p1-all-but-two");
  assert.equal(candidate.entry.canonicalForm, "all but + number");
  assert.match(candidate.entry.contextualMeaning, /除了两个以外全部/);
  assert.match(candidate.entry.structures[0].rule, /不是转折/);
  assert.match(candidate.text.toLowerCase(), /all but two/);
});

test("two real phrases with the same structural key in one sentence retain independent contexts and progress", () => {
  const farmingTools = phrase("agricultural implements", "cloze-s4");
  const fertilizers = phrase("chemical fertilizers", "cloze-s4");
  assert.equal(farmingTools.entry.key, "pattern:simple-noun-phrase");
  assert.equal(fertilizers.entry.key, farmingTools.entry.key, "the existing structural key is unchanged");
  assert.notEqual(farmingTools.context.id, fertilizers.context.id);
  const learned = { ...createMemory(farmingTools, 1000), intervalDays: 30, consecutiveKnown: 5, dueAt: 9_000_000, status: "mastered" };
  const second = mergeCandidate({ [learned.id]: learned }, fertilizers, 2000);
  assert.notEqual(second.id, learned.id);
  assert.equal(second.intervalDays, 0);
  assert.equal(second.status, "unseen");
  assert.equal(second.contexts.length, 1);
  assert.equal(second.contexts[0].expression, "chemical fertilizers");
  assert.equal(learned.contexts[0].expression, "agricultural implements");
  assert.equal(learned.intervalDays, 30);
  assert.equal(corpus.getCandidate(second.contexts[0], second.kind).entry.contextualMeaning, "化肥");
});

test("multiple original halves of the same either-or structure keep distinct source references", () => {
  const first = phrase("either sell", "cloze-s7");
  const second = phrase("or seek", "cloze-s7");
  assert.equal(first.entry.key, second.entry.key);
  assert.notEqual(first.context.id, second.context.id);
  assert.equal(corpus.getCandidate(first.context).context.expression, "either sell");
  assert.equal(corpus.getCandidate(second.context).context.expression, "or seek");
});

test("Damien and Hirst keep their reviewed name cards and source but are never automatic candidates", () => {
  for (const label of ["Damien", "Hirst"]) {
    const candidate = word(label, "2010-p1-s1");
    assert.equal(candidate.priority.id, "name");
    assert.match(candidate.text, /Damien Hirst/);
    assert.equal(vocabularyCandidateAllowed(candidate.priority), false);
    assert.equal(vocabularyCandidateAllowed(candidate.priority, { includeProperNames: true }), true);
    assert.equal(isCandidateEligible(candidate, DEFAULT_SETTINGS), false);
    assert.equal(isCandidateEligible(word(label, "2010-p1-s1", true), DEFAULT_SETTINGS), true);
  }
  assert.equal(phrase("Damien Hirst", "2010-p1-s1"), undefined, "an unannotated proper name is not fabricated as a fixed phrase");
});

test("manual marks select their actual source meaning instead of every homograph sense", () => {
  const candidate = word("note", "2010-p1-s1", true);
  const exact = corpus.candidatesForScope({ kind: "marked", keys: ["note"], contexts: [candidate.context] });
  assert.deepEqual(exact.map(item => item.context.sourceId), ["2010-p1-s1"]);
  const saved = corpus.candidatesForScope({ kind: "list", keys: ["note"], savedContexts: { note: [{ articleId: "2010-p1", sourceId: "2010-p1-s1", headword: "note", label: "note", kind: "word" }] } });
  assert.deepEqual(saved.map(item => item.context.sourceId), ["2010-p1-s1", "p5-s5"]);
  const automatic = corpus.candidatesForScope({ kind: "marked", keys: ["note"] });
  assert.deepEqual(automatic.map(item => item.context.sourceId), ["2010-p1-s1", "p5-s5"], "legacy marks can immediately practice the most frequent sense");
  assert.equal(new Set(automatic.map(item => createMemory(item, 1000).id)).size, 1, "word-level marks do not create progress for every meaning");
  const obsolete = corpus.candidatesForScope({ kind: "list", keys: ["note"], savedContexts: { note: [{ articleId: "gone", sourceId: "removed", headword: "note", label: "note", kind: "word" }] } });
  assert.deepEqual(obsolete.map(item => item.context.sourceId), automatic.map(item => item.context.sourceId));
});

test("legacy resolver preserves explicit primary source order and exposes other meanings for safe migration", () => {
  const saved = [{ articleId: "2010-p1", sourceId: "2010-p1-s1", headword: "note", label: "note", kind: "word" }];
  const candidates = corpus.resolveLegacyCandidates("note", saved);
  assert.equal(candidates[0].context.sourceId, "2010-p1-s1");
  assert.equal(new Set(candidates.map(candidate => candidate.context.id)).size, candidates.length);
  assert.ok(candidates.some(candidate => candidate.context.sourceId === "2010-cloze-s5"));
  assert.deepEqual(corpus.resolveLegacyCandidates("unknown-legacy-key", []), []);
});

test("old phrase list keeps its exact expression when multiple phrases share a source and stable key", () => {
  const selected = corpus.candidatesForScope({ kind: "list", keys: ["pattern:simple-noun-phrase"], savedContexts: {
    "pattern:simple-noun-phrase": [{ articleId: "cloze", sourceId: "cloze-s4", headword: "simple noun phrase", label: "chemical fertilizers", kind: "phrase" }],
  } });
  assert.ok(selected.length > 0);
  assert.equal(selected[0].context.expression, "chemical fertilizers");
  assert.equal(selected[0].entry.contextualMeaning, "化肥");
  assert.ok(selected.every(item => item.entry.kind === "phrase" && item.manual));
  assert.ok(selected.every(item => item.context.expression !== "agricultural implements"));
  assert.equal(new Set(selected.map(item => createMemory(item, 1000).id)).size, 1);
});

test("question and option cards use their exact source and translation, never answer explanations", () => {
  for (const sourceId of ["question-201021-prompt", "question-201021-option-A", "question-201021-option-D"]) {
    const source = corpus.getSource(sourceId);
    const question = articleContents["2010-p1"].questions.find(item => item.id === 201021);
    const optionKey = sourceId.match(/option-([A-D])/)?.[1];
    assert.equal(source.text, optionKey ? question.options.find(item => item.key === optionKey).text : question.prompt);
    assert.equal(source.translation, (optionKey ? question.analysis.options[optionKey] : question.analysis.prompt).natural);
    assert.equal(source.sourceType, optionKey ? "option" : "prompt");
    assert.equal(source.questionId, question.id);
    if (optionKey) assert.notEqual(source.translation, question.explanations[optionKey]);
  }
  const shared = sources.find(source => source.id.startsWith("question-") && source.id.includes("option-") && source.article.questions.some(question => question.format === "matching"));
  assert.ok(shared);
  assert.equal(corpus.getSource(shared.id).text, shared.text);
});

test("invalid source expressions and invented adjacent phrases never enter a learning queue", () => {
  assert.equal(word("momentum", "2010-p1-s1"), undefined);
  assert.equal(phrase("art market had", "2010-p1-s5"), undefined);
  assert.equal(word("momentum", "missing-source"), undefined);
  assert.equal(corpus.getSource("missing-source"), undefined);
});

test("home construction is lazy and a limited queue resolves only the cards actually requested", () => {
  let calls = 0;
  const lazy = createVocabularyCorpus({ ...bridge, resolveEntry(...args) { calls += 1; return study.resolveEntry(...args); } });
  assert.equal(calls, 0);
  lazy.getSource("2010-p1-s5");
  assert.equal(calls, 0, "source lookup does not build dictionary cards");
  const first = lazy.candidatesForScope({ kind: "article", articleId: "2010-p1" }, { limit: 3 });
  assert.equal(first.length, 3);
  assert.equal(calls, 3);
  assert.ok(first.every(candidate => !["name", "function", "recognition"].includes(candidate.priority.id)));
  lazy.candidatesForScope({ kind: "article", articleId: "2010-p1" }, { limit: 3 });
  assert.equal(calls, 3, "repeat scope reads reuse resolved cards");
});

test("scopes honor article/year boundaries and defaults never relabel unranked content as core", () => {
  const article = corpus.candidatesForScope({ kind: "article", articleId: "2010-p1" }, { limit: 20 });
  assert.ok(article.length > 0);
  assert.ok(article.every(candidate => candidate.context.articleId === "2010-p1"));
  const year = corpus.candidatesForScope({ kind: "year", year: 2012 }, { limit: 5 });
  assert.ok(year.every(candidate => candidate.context.year === 2012));
  const old = corpus.candidatesForScope({ kind: "article", articleId: "cloze" }, { includeRecognition: true, limit: 2 });
  assert.equal(old.length, 2);
  assert.ok(old.every(candidate => candidate.priority.id === "recognition"));
});
