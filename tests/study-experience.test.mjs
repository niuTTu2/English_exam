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

test("optional context metadata survives local persistence and cloud restoration without changing old keys", async () => {
  const context = study.findTermContexts("epidemic").find((entry) => entry.sourceId === "2010-p2-s14");
  const before = { updatedAt: 123, marks: { epidemic: ["有些陌生"] }, termNotes: { epidemic: "保留笔记" }, listItems: { 本周重点: ["epidemic"] } };
  const current = { ...before, termContexts: study.rememberTermContext({}, "epidemic", context) };
  const snapshot = prepareLocalSnapshot(current, before, 0, 456);
  const remote = await readRemoteSnapshot(() => before, async () => Response.json({ state: JSON.parse(JSON.stringify(snapshot)), updatedAt: 456 }));
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
