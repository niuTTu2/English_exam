import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { captureV1 } from "./helpers/v1-render-baseline.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const load = path => vite.ssrLoadModule(`/app/${path}`);
const [{ syntheticArticle: article, syntheticCorpus: corpus, emptyV2State: empty }, model, content, state, sync, bridge, memory, persistence, codec] = await Promise.all([
  vite.ssrLoadModule("/tests/fixtures/article-v2-synthetic.ts"), load("article-v2/model.ts"), load("article-v2/content.ts"), load("article-v2/state.ts"), load("study-sync.ts"), load("vocabulary-learning/study-bridge.ts"), load("vocabulary-learning/model.ts"), load("article-v2/persistence.ts"), load("vocabulary-learning/codec.ts"),
]);
const [{ ExamPage }, { QuickReadingCard }, { QuestionAnalysisPage }, { default: ArticleV2 }, { ArticleVocabularyPage }] = await Promise.all([load("article-v2/exam-page.tsx"), load("article-v2/quick-reading-card.tsx"), load("article-v2/question-mistake-card.tsx"), load("article-v2/article-v2.tsx"), load("article-v2/article-vocabulary-page.tsx")]);
const noop = () => {};
const props = { article, data: empty, corpus, ready: true, onUpdate: noop, onTerm: noop, onSource: noop, onExternalSource: noop, renderDetails: () => React.createElement("p", null, "完整讲义"), renderQuestionDetails: () => null };
const render = (component, changes = {}) => renderToStaticMarkup(React.createElement(component, { ...props, ...changes }));
const answered = { ...empty, answers: { 990001: "B", 990002: "C" }, submittedSections: { [article.id]: true } };
const snapshot = extra => ({ ...empty, ...extra });
const cloud = (value, updatedAt = 10) => ({ state: value, updatedAt, accountEmail: "v2@example.test" });

test("all 35 frozen V1 article objects and every read/word/structure render remain byte-identical", async () => {
  const expected = JSON.parse(await readFile(new URL("./fixtures/v1-frozen-before-v2.json", import.meta.url), "utf8"));
  const actual = await captureV1(vite);
  assert.equal(Object.keys(expected.articles).length, 35);
  for (const [id, baseline] of Object.entries(expected.articles)) assert.deepEqual(actual[id], baseline, `${id} changed`);
});
test("version is explicit, V2 has four pages, and no synthetic article enters the catalog", async () => {
  assert.equal(model.isV2Article({ year: 2099, quickReading: {} }), false);
  assert.equal(model.isV2Article({ experienceVersion: 1 }), false);
  assert.equal(model.isV2Article(article), true);
  assert.equal(model.isV2Article({ experienceVersion: "2" }), false);
  const { articleContents } = await load("data.ts");
  assert.equal(articleContents[article.id], undefined);
  for (const a of Object.values(articleContents)) if (a.experienceVersion === 2) assert.deepEqual(content.validateV2Article(a, (await load("study-app.tsx")).vocabularyCorpus), []);
  assert.deepEqual(content.validateV2Article(article, corpus), []);
  const html = render(ArticleV2);
  for (const label of Object.values(model.v2Pages)) assert.ok(html.includes(`>${label}</button>`));
  assert.ok(!html.includes("progressbar"));
});
test("V2 import gate rejects false deep detail, broken spans, wrong-source vocab and generic corrections", () => {
  for (const mutate of [
    a => { a.sentences[0].literal = "普通句被强行加深度"; },
    a => { a.sentences[0].quickReading.blocks[0].start = 1; },
    a => { a.paragraphs[1].sentenceIds = [a.sentences[0].id]; },
    a => { a.vocabularyFocus[0].sourceId = "not-a-source"; },
    a => { delete a.questions[0].reasoning.correction.byWrongOption.B; },
    a => { a.questions[0].reasoning.correction.minimalEvidenceIds = ["missing"]; },
    a => { delete a.sentences[1].practice[0].purpose; },
  ]) { const copy = structuredClone(article); mutate(copy); assert.ok(content.validateV2Article(copy, corpus).length > 0); }
});
test("exam preserves raw paragraph boundaries and never leaks explanation even after submission", () => {
  for (const data of [empty, answered]) {
    const html = render(ExamPage, { data });
    assert.equal((html.match(/data-paragraph-id=/g) ?? []).length, 2);
    assert.equal((html.match(/type="radio"/g) ?? []).length, 8);
    for (const leaked of ["团队做了笔记", "最关键的差别", "正确答案", "hopeful 明确", "完整结构", "讲解解锁"]) assert.ok(!html.includes(leaked), leaked);
  }
  const sources = content.articleSources(article);
  assert.equal(sources.get("question-990001-option-B"), "A guarantee of success.");
});
test("ordinary sentences have no syntax tree or tasks, key structure is folded and not a reading prerequisite", () => {
  const ordinary = render(QuickReadingCard, { sentence: article.sentences[0] });
  assert.ok(ordinary.includes(article.sentences[0].natural));
  assert.ok(!ordinary.includes("展开完整结构"));
  assert.ok(!ordinary.includes("自己试一下"));
  const key = render(QuickReadingCard, { sentence: article.sentences[1] });
  assert.ok(key.includes('<details class="v2-deep-disclosure"><summary>我还是没读懂'));
  assert.ok(key.includes("句子骨架与各部分关系"));
  assert.ok(!key.includes("谁修饰谁"));
  assert.ok(!key.includes("<details open"));
  assert.ok(key.indexOf(article.sentences[1].natural) < key.indexOf("展开完整结构"));
});
test("analysis is submission-gated and each wrong choice gets its own contrast before the full lecture", () => {
  assert.ok(!render(QuestionAnalysisPage).includes("正确答案"));
  const html = render(QuestionAnalysisPage, { data: answered });
  const ordered = ["你选择", "正确答案", "最关键的差别", "最小充分原文证据", "原文怎样换成正确选项", "本次干扰方式", "原文有没有保证成功", "完整解析"];
  let index = -1; for (const word of ordered) { const next = html.indexOf(word); assert.ok(next > index, word); index = next; }
  assert.ok(html.includes("B 把乐观基调偷换成了成功保证"));
  const reversed = render(QuestionAnalysisPage, { data: { ...answered, answers: { 990001: "C", 990002: "D" } } });
  assert.ok(reversed.indexOf("第 22 题") < reversed.indexOf("第 21 题"));
  assert.ok(reversed.includes("D 漏读了明确写出的 hopeful note"));
});
test("rechecks reuse immutable attempts and remain assisted, retries do not erase history", () => {
  const task = article.questions[0].reasoning.correction.byWrongOption.B.recheck;
  const first = state.recordV2Check(empty, article.id, "question-990001-prompt", task, "保证了", "check1", 100);
  const second = state.recordV2Check(first, article.id, "question-990001-prompt", task, task.answer, "check2", 200);
  assert.equal(Object.keys(second.practiceAttempts).length, 2);
  assert.equal(second.practiceAttempts.check1.correct, false);
  assert.equal(second.practiceAttempts.check2.correct, true);
  assert.equal(second.practiceAttempts.check2.relevantHintUsed, true);
  assert.equal(sync.isStudySnapshot(second), true);
});
test("shared corpus enrolls separate note senses and independent phrase, including exact question sources", () => {
  let data = snapshot({ answers: { 12: "A" }, termNotes: { existing: "旧笔记" } });
  for (const focus of article.vocabularyFocus) {
    const candidate = corpus.resolveCandidate(focus.expression, focus.kind === "phrase", focus.sourceId, true);
    data = bridge.enrollVocabulary(data, candidate, 100);
    assert.equal(candidate.context.sourceId, focus.sourceId);
    assert.equal(candidate.text, content.articleSources(article).get(focus.sourceId));
  }
  const memories = Object.values(data.vocabularyMemories);
  const notes = memories.filter(m => m.headword === "note");
  assert.equal(notes.length, 2); assert.notEqual(notes[0].senseId, notes[1].senseId);
  assert.equal(memories.filter(m => m.kind === "phrase").length, 2);
  assert.ok(memories.some(m => m.contexts[0].sourceType === "option"));
  assert.ok(memories.some(m => m.contexts[0].sourceType === "prompt"));
  assert.equal(data.answers[12], "A"); assert.equal(data.termNotes.existing, "旧笔记");
  const candidate = corpus.resolveCandidate("note", false, "synthetic.v2-s2");
  assert.equal(candidate.priority.id, "sense");
  assert.equal(corpus.resolveCandidate("notes", false, "synthetic.v2-s1").priority.recommendedReview, true);
  const before = memory.createMemory(candidate, 0).id;
  data = bridge.enrollVocabulary(data, candidate, 200, "有些陌生");
  assert.ok(data.vocabularyMemories[before].dueAt <= 200);
  assert.equal(Object.keys(data.vocabularyMemories).length, memories.length);
  const html = render(ArticleVocabularyPage, { data });
  for (const label of Object.values(model.vocabularyCategories)) assert.ok(html.includes(label));
});
test("timer resumes by timestamp and pauses on page change; precise marks toggle without losing history", () => {
  let data = snapshot({ articleV2Progress: { [article.id]: { articleId: article.id, page: "exam", elapsedMs: 500, timerStartedAt: 1000, updatedAt: 1000 } } });
  assert.equal(state.elapsed(state.progressFor(data, article.id), 2000), 1500);
  data = state.changePage(data, article.id, "read", 2500);
  assert.equal(data.articleV2Progress[article.id].elapsedMs, 2000);
  assert.equal(data.articleV2Progress[article.id].timerStartedAt, undefined);
  const mark = { articleId: article.id, sourceId: "synthetic.v2-s1", kind: "word", start: 14, end: 19 };
  data = state.toggleSourceMark(data, mark, 2600);
  const id = state.markId(mark);
  assert.equal(data.articleV2Marks[id].active, true);
  data = state.toggleSourceMark(data, mark, 2700);
  assert.equal(data.articleV2Marks[id].active, false);
  assert.equal(data.articleV2Marks[id].createdAt, 2600);
});
const note = { id: "note.1", articleId: article.id, sourceId: "synthetic.v2-s2", intent: "trunk", question: "主干在哪里？", note: "个人笔记", createdAt: 10, updatedAt: 10 };
test("optional records survive old clients, codec round trips, local save and isolated account keys", () => {
  const original = snapshot({ answers: { 21: "B" }, articleV2FollowUps: { [note.id]: note } });
  assert.equal(sync.isStudySnapshot(original), true);
  assert.equal(sync.hasStudyRecords(snapshot({ articleV2FollowUps: original.articleV2FollowUps })), true);
  assert.deepEqual(persistence.preserveArticleV2Records(original, snapshot({ articleV2FollowUps: {} })).articleV2FollowUps, original.articleV2FollowUps);
  const packed = codec.packVocabularySnapshot(original);
  assert.deepEqual(codec.unpackVocabularySnapshot(packed), original);
  const values = new Map(), storage = { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v), removeItem: k => values.delete(k) };
  sync.saveLocalStudyState(storage, "a@example.test", { state: original, base: cloud(empty) });
  sync.saveLocalStudyState(storage, "a@example.test", { state: snapshot({ articleV2FollowUps: {} }), base: cloud(empty) });
  assert.deepEqual(sync.readLocalStudyState(storage, "a@example.test").state.articleV2FollowUps, original.articleV2FollowUps);
  assert.equal(sync.readLocalStudyState(storage, "b@example.test"), null);
  assert.notEqual(sync.studyStorageKey(null), sync.studyStorageKey("a@example.test"));
  assert.equal(sync.isStudySnapshot(snapshot({ articleV2FollowUps: { [note.id]: { ...note, sourceId: "" } } })), false);
});
test("V2 multi-device merges preserve independent entries and report whole-record conflicts", () => {
  const base = snapshot({ articleV2FollowUps: { [note.id]: note } });
  const local = { ...base, articleV2FollowUps: { [note.id]: { ...note, note: "离线笔记", updatedAt: 20 } } };
  const remote = { ...base, articleV2FollowUps: { [note.id]: { ...note, question: "另一设备的追问", updatedAt: 30 } } };
  const result = sync.reconcileStudyState({ state: local, base: cloud(base) }, cloud(remote, 30));
  assert.deepEqual(result.conflicts, ["articleV2FollowUps.note.1"]);
  assert.deepEqual(result.state.articleV2FollowUps[note.id], local.articleV2FollowUps[note.id]);
  const independent = { ...base, articleV2FollowUps: { ...base.articleV2FollowUps, second: { ...note, id: "second" } } };
  const merged = sync.reconcileStudyState({ state: local, base: cloud(base) }, cloud(independent, 30));
  assert.deepEqual(merged.conflicts, []); assert.equal(Object.keys(merged.state.articleV2FollowUps).length, 2);
});
