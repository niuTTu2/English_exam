import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const vite = await createServer({ appType: "custom", configFile: false,
  root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { prepareLocalSnapshot, readRemoteSnapshot, reconcileStudyState, isStudySnapshot, hasStudyRecords,
  sameStudySnapshot, studyStorageKey, readLocalStudyState, saveLocalStudyState, preserveLocalStudyState, LEGACY_STORAGE_KEY } = await vite.ssrLoadModule("/app/study-sync.ts");

const email = "synthetic@example.test";
const learning = await vite.ssrLoadModule("/app/learning-model.ts");
const empty = { version: 1, updatedAt: 0, termNotes: {}, answers: {}, sentenceMarks: [], lists: ["本周重点"], listItems: { "本周重点": [] } };
const cloud = (state, updatedAt = 20) => ({ state, updatedAt, accountEmail: email });

test("训练记录按独立事件跨设备合并，旧页面上传不能删掉训练历史", () => {
  const attempt = { id: "a", articleId: "2010-p1", sentenceId: "2010-p1-s1", taskId: "main-predicate", revision: 1, answer: "ended", correct: true, assisted: false, at: 10, conceptId: "finite-predicate", errorType: "predicate" };
  const base = { ...empty, practiceAttempts: {} };
  const local = { ...base, practiceAttempts: { a: attempt } };
  const remote = cloud({ ...base, practiceAttempts: { b: { ...attempt, id: "b", sentenceId: "2010-p1-s18", at: 20 } } });
  const merged = reconcileStudyState({ state: local, base: cloud(base, 10) }, remote);
  assert.deepEqual(Object.keys(merged.state.practiceAttempts).sort(), ["a", "b"]);
  assert.deepEqual(merged.conflicts, []);
  assert.equal(hasStudyRecords(local), true);
  assert.equal(isStudySnapshot(local), true);
  assert.equal(isStudySnapshot({ ...local, practiceAttempts: { a: { ...attempt, correct: "yes" } } }), false);
  assert.equal(isStudySnapshot({ ...local, learningReflections: { a: { translation: "我的译文", translationRating: "wrong", errors: ["unknown"] } } }), false);
  assert.equal(isStudySnapshot({ ...local, learningReflections: { a: { translation: "我的译文", translationRating: "wrong", errors: ["attachment"] } }, questionWork: { 201021: { scope: "adjacent-sentences", sentenceIds: ["2010-p1-s4"] } } }), true);
  const oldPage = learning.preserveTrainingRecords(merged.state, { ...empty, termNotes: { word: "已有笔记的更新" } });
  assert.equal(Object.keys(oldPage.practiceAttempts).length, 2);
  assert.equal(oldPage.termNotes.word, "已有笔记的更新");
  const newPage = learning.preserveTrainingRecords(merged.state, { ...local, practiceAttempts: { c: { ...attempt, id: "c" } } });
  assert.deepEqual(Object.keys(newPage.practiceAttempts).sort(), ["a", "b", "c"]);
});

test("a newer blank device cannot hide the account's existing cloud records", async () => {
  const local = { ...empty, updatedAt: 900, selectedYear: 2010 };
  const remote = cloud({ ...empty, termNotes: { word: "原有笔记" }, answers: { 21: "A" } });
  const loaded = await readRemoteSnapshot(email, async () => Response.json(remote));
  const merged = reconcileStudyState({ state: local, base: { state: empty, updatedAt: null } }, loaded);
  assert.equal(merged.state.termNotes.word, "原有笔记");
  assert.equal(merged.state.answers[21], "A");
  assert.deepEqual(merged.conflicts, []);
  assert.equal(hasStudyRecords(local), false);
});

test("rendering and login do not pretend that unchanged local records were edited", () => {
  const current = { updatedAt: 0, termNotes: { word: "笔记" } };
  const initial = prepareLocalSnapshot(current, null, 123, 999);
  assert.equal(initial.updatedAt, 123);
  assert.equal(prepareLocalSnapshot(current, initial, 0, 1000).updatedAt, 123);
  assert.equal(prepareLocalSnapshot({ ...current, termNotes: { word: "新笔记" } }, initial, 0, 1000).updatedAt, 1000);
  assert.equal(prepareLocalSnapshot(current, null, 0, 999).updatedAt, 0);
  assert.equal(sameStudySnapshot({ updatedAt: 1, answers: { 21: "A", 22: "B" } }, { answers: { 22: "B", 21: "A" }, updatedAt: 3 }), true);
});

test("edits made during download merge with unrelated cloud records, not whole-snapshot timestamps", async () => {
  const base = cloud(empty, 10);
  let local = empty;
  const remote = await readRemoteSnapshot(email, async () => {
    local = { ...empty, updatedAt: 900, termNotes: { local: "读取期间新增" } };
    return Response.json(cloud({ ...empty, termNotes: { cloud: "另一设备" } }));
  });
  const result = reconcileStudyState({ state: local, base }, remote);
  assert.deepEqual(result.state.termNotes, { local: "读取期间新增", cloud: "另一设备" });
  assert.deepEqual(result.conflicts, []);
  assert.equal(remote.updatedAt, 20);
});

test("unchanged local entries follow cloud deletion; genuine offline edits survive", () => {
  const base = cloud({ ...empty, termNotes: { removed: "删除我", same: "原笔记" }, answers: { 21: "A" } });
  const local = { ...base.state, answers: { 21: "B" } };
  const remote = cloud({ ...base.state, termNotes: { same: "原笔记", added: "新记录" } }, 30);
  const result = reconcileStudyState({ state: local, base }, remote);
  assert.deepEqual(result.state.termNotes, { same: "原笔记", added: "新记录" });
  assert.deepEqual(result.state.answers, { 21: "B" });
  assert.deepEqual(result.conflicts, []);
});

test("same-entry edits and delete-versus-edit conflicts retain the local copy for explicit resolution", () => {
  const base = cloud({ ...empty, termNotes: { word: "原始" } });
  for (const notes of [{ word: "另一设备改写" }, {}]) {
    const local = { ...base.state, termNotes: { word: "离线改写" } };
    const remote = cloud({ ...base.state, termNotes: notes }, 30);
    const result = reconcileStudyState({ state: local, base }, remote);
    assert.deepEqual(result.conflicts, ["termNotes.word"]);
    assert.equal(result.state.termNotes.word, "离线改写");
    assert.deepEqual(remote.state.termNotes, notes);
  }
});

test("concurrent tags and list membership merge without resurrecting removals", () => {
  const base = cloud({ ...empty, sentenceMarks: ["old", "shared"], marks: { word: ["有些陌生"] } });
  const local = { ...base.state, sentenceMarks: ["shared", "local"], marks: { word: ["有些陌生", "容易混淆"] } };
  const remote = cloud({ ...base.state, sentenceMarks: ["old", "shared", "remote"], marks: { word: ["不会搭配"] } }, 30);
  const result = reconcileStudyState({ state: local, base }, remote);
  assert.deepEqual(new Set(result.state.sentenceMarks), new Set(["shared", "local", "remote"]));
  assert.deepEqual(new Set(result.state.marks.word), new Set(["容易混淆", "不会搭配"]));
  assert.deepEqual(result.conflicts, []);
});

test("failed, mismatched and malformed cloud reads never authorize uploads", async () => {
  const methods = [];
  await assert.rejects(readRemoteSnapshot(email, async (url, options) => {
    assert.equal(url, "/api/study-state");
    methods.push(options?.method ?? "GET");
    return new Response("unavailable", { status: 503 });
  }), /暂不上传/);
  assert.deepEqual(methods, ["GET"]);
  for (const remote of [{ state: null }, { ...cloud(empty), accountEmail: "another@example.test" }, cloud([]), cloud({ ...empty, termNotes: { bad: [] } }), cloud(empty, null)]) {
    await assert.rejects(readRemoteSnapshot(email, async () => Response.json(remote)), /暂停同步/);
  }
  const remote = await readRemoteSnapshot(email, async () => Response.json(cloud(null, null)));
  assert.deepEqual(remote, { state: null, updatedAt: null });
  const local = { ...empty, termNotes: { word: "离线学习" } };
  assert.deepEqual(reconcileStudyState({ state: local, base: null }, remote).state, local);
});

test("anonymous and other-account snapshots are never implicitly imported into an existing account", () => {
  const local = { ...empty, updatedAt: 999999, termNotes: { private: "另一个账号" } };
  const remote = cloud({ ...empty, termNotes: { own: "本账号" } });
  assert.deepEqual(reconcileStudyState({ state: local, base: null }, remote).state, remote.state);
  assert.notEqual(studyStorageKey(email), studyStorageKey("another@example.test"));
  assert.notEqual(studyStorageKey(email), studyStorageKey(null));
  assert.equal(studyStorageKey(email.toUpperCase()), studyStorageKey(email));
});

test("account drafts, conflict backups and untouched legacy records survive independently", () => {
  const entries = new Map([[LEGACY_STORAGE_KEY, JSON.stringify({ ...empty, termNotes: { old: "旧设备原件" } })]]);
  const storage = { get length() { return entries.size; }, key: (index) => [...entries.keys()][index] ?? null,
    getItem: (key) => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
  const local = { state: { ...empty, termNotes: { local: "新笔记" } }, base: cloud(empty) };
  saveLocalStudyState(storage, email, local);
  preserveLocalStudyState(storage, email, local);
  preserveLocalStudyState(storage, email, local);
  saveLocalStudyState(storage, "another@example.test", { state: empty, base: null });
  assert.deepEqual(readLocalStudyState(storage, email), local);
  assert.equal(readLocalStudyState(storage, null), null);
  assert.equal(JSON.parse(entries.get(LEGACY_STORAGE_KEY)).termNotes.old, "旧设备原件");
  assert.equal([...entries.keys()].filter((key) => key.startsWith(`${studyStorageKey(email)}:backup:`)).length, 1);
  entries.set(studyStorageKey(email), "broken-json");
  assert.throws(() => readLocalStudyState(storage, email));
  assert.equal(entries.get(studyStorageKey(email)), "broken-json");
  assert.throws(() => saveLocalStudyState({ setItem() { throw new Error("quota"); } }, email, local), /quota/);
});

test("explicit legacy recovery only adds non-conflicting data and never treats absence as a cloud deletion", () => {
  const legacy = { ...empty, termNotes: { old: "找回旧笔记" }, answers: { 21: "A" } };
  const current = { ...empty, termNotes: { new: "已存在的新笔记" }, answers: { 22: "B" } };
  const merged = reconcileStudyState({ state: legacy, base: { state: empty, updatedAt: null } }, cloud(current));
  assert.deepEqual(merged.conflicts, []);
  assert.deepEqual(merged.state.termNotes, { old: "找回旧笔记", new: "已存在的新笔记" });
  assert.deepEqual(merged.state.answers, { 21: "A", 22: "B" });
  const conflict = reconcileStudyState({ state: legacy, base: { state: empty, updatedAt: null } }, cloud({ ...current, answers: { 21: "B" } }));
  assert.deepEqual(conflict.conflicts, ["answers.21"]);
  assert.deepEqual(current.termNotes, { new: "已存在的新笔记" });
});

test("empty and corrupt study payloads cannot masquerade as learning records", () => {
  assert.equal(isStudySnapshot(empty), true);
  for (const value of [null, [], {}, { ...empty, updatedAt: -1 }, { ...empty, termNotes: "bad" }, { ...empty, answers: { 21: {} } }, { ...empty, expanded: [3] }]) assert.equal(isStudySnapshot(value), false);
  assert.equal(hasStudyRecords(empty), false);
  assert.equal(hasStudyRecords({ ...empty, expanded: ["cloze-s8"], updatedAt: 999, selectedYear: 2010 }), false);
  for (const extra of [{ termNotes: { word: "笔记" } }, { answers: { 21: "A" } }, { sentenceMarks: ["sentence"] }, { translationAnswers: { task: "翻译" } }, { lists: ["自定义清单"] }]) assert.equal(hasStudyRecords({ ...empty, ...extra }), true);
});
