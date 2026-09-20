import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root,
  resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { prepareLocalSnapshot, readRemoteSnapshot } = await vite.ssrLoadModule("/app/study-sync.ts");

test("annual vocabulary preserves every source sense without duplicating lemmas or counts", () => {
  const words = study.buildYearWordItems(2010);
  const company = words.find(word => word.headword === "company");
  assert.equal(words.filter(word => word.headword === "company").length, 1);
  assert.equal(company.count, 6);
  assert.deepEqual(company.forms, ["companies", "company"]);
  assert.ok(company.contexts.some(context => context.sentenceId === "2010-p3-s1" && /公司/.test(context.meaning)));
  assert.ok(company.contexts.some(context => context.sentenceId === "2010-p5-s15" && /结伴/.test(context.meaning)));
  for (const word of words) {
    assert.equal(new Set(word.contexts.map(context => context.sentenceId)).size, word.contexts.length);
    for (const context of word.contexts) {
      const entry = study.resolveEntry(context.sourceForm, false, context.sentenceId);
      assert.equal(context.meaning, entry.contextualMeaning);
      assert.equal(context.partOfSpeech, entry.partOfSpeech);
      assert.equal(entry.headword, word.headword);
      assert.equal(study.sourceDestination(context.sentenceId).year, 2010);
    }
  }
});

test("annual search opens the matching sense and form rather than the first occurrence", () => {
  const words = study.buildYearWordItems(2010);
  const company = study.searchYearWordItems(words, "  结伴  ").find(word => word.headword === "company");
  assert.ok(company);
  assert.equal(company.sentenceId, "2010-p5-s15");
  assert.equal(company.sourceForm, "company");
  assert.equal(company.count, 6);
  assert.match(company.meaning, /结伴/);
  for (const word of words.filter(item => item.contexts.some(context => context.sourceForms.length > 1))) {
    for (const form of word.forms) {
      const found = study.searchYearWordItems([word], form)[0];
      assert.equal(found.sourceForm, form);
      assert.ok(word.contexts.find(context => context.sentenceId === found.sentenceId).sourceForms.includes(form));
    }
  }
  const peer = study.searchYearWordItems(words, "PEERING").find(word => word.headword === "peer");
  assert.equal(peer.sourceForm, "peering");
  assert.match(peer.meaning, /张望/);
  assert.equal(study.searchYearWordItems(words, "  ").length, words.length);
  assert.deepEqual(study.searchYearWordItems(words, "不存在的检索词"), []);
  assert.ok(!study.searchYearWordItems(study.buildYearWordItems(2000), "结伴").some(word => word.headword === "company"));
});

test("word and phrase occurrences navigate to real sentence, prompt and option sources", () => {
  assert.deepEqual(study.sourceDestination("2010-p5-s15"), {
    articleId: "2010-p5", year: 2010, view: "study", sentenceId: "2010-p5-s15", elementId: "source-2010-p5-s15",
  });
  for (const sourceId of ["question-201042-prompt", "question-201042-option-T", "question-201030-option-C"]) {
    const target = study.sourceDestination(sourceId);
    assert.equal(target.view, "test");
    assert.equal(target.sentenceId, undefined);
    assert.equal(target.elementId, `source-${sourceId}`);
  }
  assert.equal(study.sourceDestination("question-201042-option-A"), undefined);
  assert.equal(study.sourceDestination("missing-source"), undefined);
  for (const [label, isPhrase] of [["company", false], ["In the U.S.", true]]) {
    const occurrences = study.currentOccurrences(label, isPhrase);
    assert.ok(occurrences.length > 1);
    for (const occurrence of occurrences) assert.ok(study.sourceDestination(occurrence.sourceId));
    assert.equal(new Set(occurrences.map(occurrence => occurrence.sourceId)).size, occurrences.length);
  }
});

test("2010 Part B uses real T/F sources and annual indexes", () => {
  const article = articleContents["2010-p5"];
  assert.equal(study.questionNumberLabel(article.questions), "第 41–45 题");
  assert.equal(article.questions.filter(question => ["F", "T", "F", "T", "F"][question.number - 41] === question.answer).length, 5);
  const words = study.buildYearWordItems(2010);
  assert.ok(words.find(word => word.headword === "upwash"));
  assert.ok(words.find(word => word.headword === "a350")?.forms.includes("a350"));
  assert.ok(words.find(word => word.headword === "h1n1")?.forms.includes("h1n1"));
  assert.match(study.resolveEntry("A350", false, "2010-p5-s1").contextualMeaning, /空客/);
  assert.match(study.resolveEntry("H1N1", false, "2010-cloze-s8").contextualMeaning, /H1N1/);
  assert.ok(words.find(word => word.headword === "finding")?.forms.includes("findings"));
  assert.ok(words.find(word => word.headword === "find")?.forms.includes("finding"));
  assert.match(study.resolveEntry("company", false, "2010-p5-s15").contextualMeaning, /结伴/);
  assert.match(study.resolveEntry("peering", false, "2010-p5-s17").contextualMeaning, /张望/);
  assert.equal(study.resolveEntry("True", false, "question-201042-option-T").contextualMeaning, "符合原文的");
  assert.equal(study.resolveEntry("False", false, "question-201042-option-F").contextualMeaning, "不符合原文的");
  const phrase = study.buildYearPhraseItems(2010).find(item => item.source === "remains to be seen");
  assert.ok(phrase);
  assert.equal(phrase.sentenceId, "2010-p5-s19");
  assert.ok(phrase.count > 0);
});

test("2010 ordinal tokens and scoped lemmas stay whole in annual vocabulary", () => {
  const words = study.buildYearWordItems(2010);
  assert.ok(words.find(word => word.headword === "twentieth")?.forms.includes("20th"));
  assert.ok(words.find(word => word.headword === "1940s"));
  assert.ok(words.find(word => word.headword === "1960s"));
  assert.ok(!words.some(word => word.headword === "h"));
  assert.ok(words.find(word => word.headword === "find")?.forms.includes("finding"));
  assert.ok(words.find(word => word.headword === "including"));
});

test("punctuation-ending source expressions have matching counts and occurrences", () => {
  const counts = study.currentCounts("In the U.S.", true);
  assert.ok(counts.form > 0, "2010完形原文中的In the U.S.不能显示0次");
  const item = study.buildYearPhraseItems(2010).find((entry) => entry.source === "In the U.S.");
  assert.equal(item.count, 2);
  assert.deepEqual(study.findPhraseOccurrences(item.source).filter((entry) => entry.source.article.year === 2010)
    .map((entry) => entry.source.id), ["2010-cloze-s9", "question-201030-option-C"]);
  assert.equal(item.sentenceId, "2010-cloze-s9");
  assert.ok(study.currentOccurrences(item.source, true).some((entry) => entry.excerpt.includes("In the U.S.,")));
  assert.equal(item.count, study.findPhraseOccurrences(item.source).filter((entry) => entry.source.article.year === 2010).length);
});

test("phrase matching handles abbreviations, punctuation, quotes, hyphens and whitespace without partial words", () => {
  for (const [text, phrase, expected] of [
    ["In the U.S., and in the U.S.", "in the u.s.", 2],
    ["In\nthe\u00a0U.S.,", "In the U.S.", 1],
    ["a well-being measure; WELL‑BEING matters", "well-being", 2],
    ["women’s lives; women's lives", "women's lives", 2],
    ["(a+b) and (a+b).", "(a+b)", 2],
    ["another than; other than; other thanks", "other than", 1],
    ["self-sufficiently", "self-sufficient", 0],
  ]) assert.equal(study.phraseMatchRanges(text, phrase).length, expected, `${text} / ${phrase}`);
  assert.deepEqual(study.phraseMatchRanges("any text", ""), []);
});

test("phrase structure counts and source lists share the same occurrence index", () => {
  for (const phrase of ["more than", "In the U.S.", "other than", "as well as"]) {
    const exact = study.findPhraseOccurrences(phrase);
    const structure = study.findPhraseOccurrences(phrase, true);
    const counts = study.currentCounts(phrase, true);
    assert.equal(counts.form, exact.length);
    assert.equal(counts.lemma, structure.length);
    assert.ok(counts.lemma >= counts.form);
    assert.equal(study.currentOccurrences(phrase, true).length, new Set(structure.map((entry) => entry.source.id)).size);
  }
  assert.ok(study.findPhraseOccurrences("other than").some((entry) => entry.source.id.startsWith("question-")));
  const [first, second] = articleContents.cloze.sentences;
  const crossSource = `${first.text.trim().split(/\s+/).at(-1)} ${second.text.trim().split(/\s+/)[0]}`;
  assert.equal(study.findPhraseOccurrences(crossSource).length, 0, "不能把相邻来源拼成一次词组出现");
});

test("saved review and custom-list contexts preserve different senses of the same stable word", () => {
  const options = study.findTermContexts("epidemic");
  const metaphor = options.find((context) => context.sourceId === "2010-p2-s14");
  const medical = options.find((context) => context.sourceId === "2010-cloze-s1");
  assert.ok(metaphor);
  assert.ok(medical);
  let contexts = study.rememberTermContext({}, "epidemic", metaphor);
  contexts = study.rememberTermContext(contexts, "epidemic", medical, "本周重点");
  const review = study.resolveSavedTermContext("epidemic", contexts[study.termContextKey("epidemic")]).selected;
  const list = study.resolveSavedTermContext("epidemic", contexts[study.termContextKey("epidemic", "本周重点")]).selected;
  assert.equal(review.sourceId, metaphor.sourceId);
  assert.equal(list.sourceId, medical.sourceId);
  assert.match(study.resolveEntry(review.label, false, review.sourceId).contextualMeaning, /比喻/);
  assert.match(study.resolveEntry(list.label, false, list.sourceId).use, /疫情/);
  contexts = study.rememberTermContext(contexts, "epidemic", medical);
  contexts = study.rememberTermContext(contexts, "epidemic", metaphor);
  assert.equal(contexts[study.termContextKey("epidemic")].length, 2);
  assert.equal(contexts[study.termContextKey("epidemic")][0].sourceId, metaphor.sourceId);
});

test("legacy and stale records never guess a source when multiple contexts exist", () => {
  const legacy = study.resolveSavedTermContext("epidemic");
  assert.equal(legacy.selected, undefined);
  assert.ok(legacy.options.length > 1);
  assert.equal(study.resolveSavedTermContext("epidemic", [{ sourceId: "review", articleId: "2010-p2" }]).selected, undefined);
  const forged = { ...legacy.options[0], articleId: "not-the-source-article" };
  assert.equal(study.resolveSavedTermContext("epidemic", [forged]).selected, undefined);
  const word = study.buildYearWordItems(2010).find((entry) => study.findTermContexts(entry.headword).length === 1);
  assert.ok(word);
  assert.ok(study.resolveSavedTermContext(word.headword).selected);
});

test("legacy cards open a frequent real example without requiring or rewriting historical context", () => {
  const missing = [];
  const automatic = study.resolveLearningTermContext("note", missing);
  assert.equal(automatic.automatic, true);
  assert.ok(["2010-p1-s1", "p5-s5"].includes(automatic.selected.sourceId));
  assert.deepEqual(missing, []);
  assert.equal(study.resolveSavedTermContext("note", missing).selected, undefined, "a default example is not invented historical metadata");
  const annotation = study.findTermContexts("note").find(context => context.sourceId === "p3-s10");
  const stored = [annotation];
  const preserved = study.resolveLearningTermContext("note", stored);
  assert.equal(preserved.automatic, false);
  assert.equal(preserved.selected.sourceId, annotation.sourceId);
  assert.deepEqual(stored, [annotation]);
  const stale = [{ ...annotation, articleId: "no-longer-valid" }];
  assert.equal(study.resolveLearningTermContext("note", stale).automatic, true);
  assert.deepEqual(stale, [{ ...annotation, articleId: "no-longer-valid" }]);
  const unavailable = study.resolveLearningTermContext("unknown-legacy-word");
  assert.equal(unavailable.selected, undefined);
  assert.equal(unavailable.automatic, false);
});

test("optional context metadata survives local persistence and cloud restoration without changing old keys", async () => {
  const context = study.findTermContexts("epidemic").find((entry) => entry.sourceId === "2010-p2-s14");
  const before = { version: 1, updatedAt: 123, marks: { epidemic: ["有些陌生"] }, termNotes: { epidemic: "保留笔记" }, listItems: { 本周重点: ["epidemic"] } };
  const current = { ...before, termContexts: study.rememberTermContext({}, "epidemic", context) };
  const snapshot = prepareLocalSnapshot(current, before, 0, 456);
  const { state: remote } = await readRemoteSnapshot("synthetic@example.test", async () => Response.json({ state: JSON.parse(JSON.stringify(snapshot)), updatedAt: 456, accountEmail: "synthetic@example.test" }));
  assert.deepEqual(remote.marks, before.marks);
  assert.deepEqual(remote.termNotes, before.termNotes);
  assert.deepEqual(remote.listItems, before.listItems);
  assert.equal(study.resolveSavedTermContext("epidemic", remote.termContexts[study.termContextKey("epidemic")]).selected.sourceId, context.sourceId);
});

test("review queues use actual due timestamps, separate overdue and future items, and sort by due time", () => {
  const now = new Date(2026, 8, 16, 12).getTime();
  const schedules = {
    later: { dueAt: now + 1, intervalDays: 0, repetitions: 0 },
    overdue: { dueAt: new Date(2026, 8, 14, 12).getTime(), intervalDays: 30, repetitions: 1 },
    today: { dueAt: now, intervalDays: 1, repetitions: 1 },
  };
  const keys = ["later", "today", "overdue", "unscheduled"];
  assert.deepEqual(study.filterReviewKeys(keys, schedules, "due", now), ["unscheduled", "overdue", "today"]);
  assert.deepEqual(study.filterReviewKeys(keys, schedules, "overdue", now), ["overdue"]);
  assert.equal(study.filterReviewKeys(keys, schedules, "all", now).length, 4);
  assert.equal(study.formatReviewDue(schedules.overdue, now), "逾期 2 天");
  assert.equal(study.formatReviewDue(schedules.today, now), "今天复习");
});

test("ratings immediately remove tomorrow's work from today's queue and dates survive reopening across months", () => {
  const now = new Date(2026, 8, 30, 12).getTime();
  const next = study.nextReviewSchedule(undefined, "正确", now);
  assert.equal(new Date(next.dueAt).getDate(), 1);
  assert.deepEqual(study.filterReviewKeys(["epidemic"], { epidemic: next }, "due", now), []);
  assert.equal(study.formatReviewDue(next, now), "明天");
  const reopened = JSON.parse(JSON.stringify(next));
  const later = new Date(2026, 9, 3, 12).getTime();
  assert.equal(study.formatReviewDue(reopened, later), "逾期 2 天");
  assert.deepEqual(study.filterReviewKeys(["epidemic"], { epidemic: reopened }, "due", later), ["epidemic"]);
  const wrong = study.nextReviewSchedule(next, "错误", now);
  assert.deepEqual(study.filterReviewKeys(["epidemic"], { epidemic: wrong }, "due", now), ["epidemic"]);
});

test("self-test descriptions use actual displayed question numbers, including non-contiguous and single questions", () => {
  assert.equal(study.questionNumberLabel(articleContents.p1.questions), "第 11–14 题");
  assert.equal(study.questionNumberLabel(articleContents["2010-p1"].questions), "第 21–25 题");
  assert.equal(study.questionNumberLabel(articleContents["2010-p2"].questions), "第 26–30 题");
  assert.equal(study.questionNumberLabel([{ id: 101, number: 5 }]), "第 5 题");
  assert.equal(study.questionNumberLabel([{ id: 1 }, { id: 3 }, { id: 4 }]), "第 1、3–4 题");
  assert.equal(study.questionNumberLabel([]), "本篇题目");
});

test("due labels handle later today, midnight and year boundaries without reusing the original interval", () => {
  const now = new Date(2026, 11, 31, 12).getTime();
  const schedule = { dueAt: new Date(2026, 11, 31, 16, 5).getTime(), intervalDays: 30, repetitions: 1 };
  assert.equal(study.formatReviewDue(schedule, now), "今天 16:05");
  assert.equal(study.formatReviewDue(schedule, new Date(2027, 0, 1, 0, 1).getTime()), "逾期 1 天");
  assert.equal(study.formatReviewDue({ ...schedule, dueAt: new Date(2027, 0, 2, 12).getTime() }, now), "2027年1月2日");
  assert.equal(study.formatReviewDue(study.nextReviewSchedule(undefined, "正确", now), now), "明天");
});
