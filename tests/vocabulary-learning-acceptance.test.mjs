import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root,
  resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const queue = await vite.ssrLoadModule("/app/vocabulary-learning/queue.ts");
const session = await vite.ssrLoadModule("/app/vocabulary-learning/session.ts");
const scheduler = await vite.ssrLoadModule("/app/vocabulary-learning/scheduler.ts");
const sync = await vite.ssrLoadModule("/app/study-sync.ts");
const persistence = await vite.ssrLoadModule("/app/vocabulary-learning/persistence.ts");
const migration = await vite.ssrLoadModule("/app/vocabulary-learning/migration.ts");
const codec = await vite.ssrLoadModule("/app/vocabulary-learning/codec.ts");
const bridge = await vite.ssrLoadModule("/app/vocabulary-learning/study-bridge.ts");
const now = new Date(2026, 8, 19, 12).getTime();

function candidate(index, overrides = {}) {
  const key = `acceptance-${index}`;
  return {
    entry: { key, headword: key, display: key, kind: "word", partOfSpeech: "n.",
      contextualMeaning: `合成义项${index}`, use: "仅用于验证学习状态，不进入正式词库。",
      specialForms: [], examSynonyms: [], collocations: [], otherMeanings: [], wordFamily: [], confusions: [],
      counts: { form: 1, lemma: 1, family: 1 }, occurrences: [] },
    context: { id: `source-${index}:word:${key}`, sourceId: `source-${index}`, articleId: "synthetic",
      year: 2010, sourceType: "sentence", sentenceId: `source-${index}`, expression: key },
    priority: { id: "core", label: "核心迁移词", reason: "测试", recommendedReview: true },
    ...overrides,
  };
}

function storage() {
  const values = new Map();
  return { get length() { return values.size; }, key(index) { return [...values.keys()][index] ?? null; },
    getItem(key) { return values.get(key) ?? null; }, setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); } };
}

test("第7张经账号/游客持久化恢复，前6张尝试和间隔不会再次结算", () => {
  const built = queue.createLearningQueue({}, Array.from({ length: 8 }, (_, index) => candidate(index)),
    { ...model.DEFAULT_SETTINGS, dailyWords: 8 }, now, "new");
  let active = session.createSession(built.queue, now, { id: "seventh-card" });
  const memories = { ...built.memories }, attempts = {};
  for (let index = 0; index < 6; index += 1) {
    active = session.revealSession(active, now + index * 1000);
    const result = session.rateSession(active, memories, "known", now + index * 1000 + 1);
    assert.ok(result);
    memories[result.memory.id] = result.memory;
    attempts[result.attempt.id] = result.attempt;
    active = result.session;
  }
  assert.equal(active.cursor, 6);
  const state = { version: 1, updatedAt: now, vocabularyMemories: memories, vocabularyAttempts: attempts,
    vocabularySessions: { [active.id]: active }, vocabularyQueueState: { activeSessionId: active.id, updatedAt: now } };
  assert.equal(sync.isStudySnapshot(state), true);
  const disk = storage();
  for (const email of [null, "synthetic@example.test"]) {
    sync.saveLocalStudyState(disk, email, { state, base: null });
    const restored = sync.readLocalStudyState(disk, email).state;
    const recovered = restored.vocabularySessions[restored.vocabularyQueueState.activeSessionId];
    assert.equal(recovered.cursor, 6);
    assert.equal(recovered.phase, "front");
    assert.equal(Object.keys(restored.vocabularyAttempts).length, 6);
    assert.deepEqual(restored.vocabularyMemories, memories);
    assert.equal(session.rateSession(recovered, restored.vocabularyMemories, "known", now + 10_000), undefined,
      "刷新后的未翻面卡不能评分，前六项不会重放");
    const seventh = session.rateSession(session.revealSession(recovered, now + 11_000), restored.vocabularyMemories, "known", now + 12_000);
    assert.equal(seventh.session.cursor, 7);
    assert.equal(seventh.session.attemptIds.length, 7);
    assert.equal(new Set(seventh.session.attemptIds).size, 7);
    const sameItemSettled = { ...session.revealSession(recovered, now + 11_000), attemptIds: seventh.session.attemptIds };
    assert.equal(session.rateSession(sameItemSettled, restored.vocabularyMemories, "known", now + 13_000), undefined);
  }
});

test("末张连续忘记每次均重现，直到认识；不伪造完成或重复新学数量", () => {
  const built = queue.createLearningQueue({}, [candidate(1)], model.DEFAULT_SETTINGS, now, "new");
  let active = session.createSession(built.queue, now, { id: "last-card" });
  const memories = { ...built.memories }, attempts = {};
  for (let index = 0; index < 2; index += 1) {
    const result = session.rateSession(session.revealSession(active, now + index * 1000), memories, "forgot", now + index * 1000 + 1);
    assert.ok(result);
    memories[result.memory.id] = result.memory;
    attempts[result.attempt.id] = result.attempt;
    active = result.session;
    if (index === 0) {
      assert.equal(active.status, "active");
      assert.equal(active.queue[active.cursor].kind, "retry");
    }
  }
  assert.equal(active.status, "active");
  assert.equal(active.queue[active.cursor].kind, "retry");
  assert.equal(memories[built.queue[0].memoryId].status, "learning");
  assert.equal(memories[built.queue[0].memoryId].lapses, 2);
  const recalled = session.rateSession(session.revealSession(active, now + 3000), memories, "known", now + 3001);
  memories[recalled.memory.id] = recalled.memory;
  attempts[recalled.attempt.id] = recalled.attempt;
  active = recalled.session;
  assert.equal(active.status, "completed");
  const summary = session.sessionSummary(active, attempts, memories);
  assert.equal(summary.newWords, 1);
  assert.equal(summary.reviews, 0);
  assert.equal(summary.forgot, 2);
  assert.equal(summary.difficultIds.length, 1);
});

test("十分钟会话暂停时间不计入活动用时，翻面状态和当前卡继续保留", () => {
  const built = queue.createLearningQueue({}, [candidate(1)], model.DEFAULT_SETTINGS, now, "new");
  const active = session.revealSession(session.createSession(built.queue, now, { id: "paused-clock", timeLimitMinutes: 10 }), now + 1000);
  const paused = session.pauseSession(active, now + 120_000);
  assert.equal(session.sessionElapsedMs(paused, now + 3_600_000), 120_000);
  const resumed = session.resumeSession(JSON.parse(JSON.stringify(paused)), now + 3_600_000);
  assert.equal(resumed.phase, "answer");
  assert.equal(resumed.cursor, 0);
  assert.equal(session.sessionElapsedMs(resumed, now + 3_660_000), 180_000);
});

test("提前已认识不能推迟到期时间；同日多次认识/太简单不能跳级", () => {
  let memory = model.createMemory(candidate(1), now);
  memory = scheduler.scheduleReview(memory, "known", now);
  const advanced = { ...memory };
  for (let index = 1; index <= 50; index += 1) memory = scheduler.scheduleReview(memory, index % 2 ? "easy" : "known", now + index * 1000);
  assert.equal(memory.dueAt, advanced.dueAt);
  assert.equal(memory.intervalDays, advanced.intervalDays);
  assert.equal(memory.consecutiveKnown, advanced.consecutiveKnown);
  const tomorrowMorning = new Date(2026, 8, 20, 8).getTime();
  const early = scheduler.scheduleReview(memory, "known", tomorrowMorning);
  assert.equal(early.dueAt, advanced.dueAt);
  assert.equal(early.consecutiveKnown, advanced.consecutiveKnown);
  const due = scheduler.scheduleReview(early, "known", advanced.dueAt);
  assert.equal(due.intervalDays, 3);
});

test("到期积压多于本组时新词不能挤占；future/paused/unseen不混成今日复习", () => {
  const memories = Object.fromEntries(Array.from({ length: 14 }, (_, index) => {
    const memory = model.createMemory(candidate(index), now - 100_000);
    return [memory.id, { ...memory, status: "review", dueAt: now - (index + 1) * 1000 }];
  }));
  const future = { ...model.createMemory(candidate("future"), now), status: "review", dueAt: now + 1 };
  const paused = { ...model.createMemory(candidate("paused"), now), status: "paused", paused: true, dueAt: now - 100_000 };
  memories[future.id] = future;
  memories[paused.id] = paused;
  const result = queue.createLearningQueue(memories, [candidate("new")], model.DEFAULT_SETTINGS, now, "new", { size: 10 });
  assert.equal(result.queue.length, 10);
  assert.ok(result.queue.every(item => item.kind === "review"));
  assert.ok(result.queue.every(item => item.memoryId !== future.id && item.memoryId !== paused.id));
  const originalDueTimes = Object.fromEntries(Object.entries(memories).map(([id, memory]) => [id, memory.dueAt]));
  assert.deepEqual(Object.fromEntries(Object.entries(result.memories).map(([id, memory]) => [id, memory.dueAt])), originalDueTimes,
    "生成队列不能静默改期，也不能持久化未被选中的新词");
});

test("拼写失败只改变拼写记录，阅读掌握和到期时间保持不变", () => {
  const created = model.createMemory(candidate(1), now);
  const memory = { ...created, status: "mastered", intervalDays: 30, consecutiveKnown: 5, dueAt: now + 30 * 86_400_000,
    spelling: { enabled: true, attempts: 0, correct: 0 }, lastRating: "known", lastReviewedAt: now };
  const memories = { [memory.id]: memory };
  const base = session.createSession([{ id: "reading", memoryId: memory.id, kind: "review", contextId: memory.primaryContextId }], now, { id: "spelling-isolated" });
  const completed = { ...base, cursor: 1, status: "completed", completedAt: now };
  const spelling = session.appendSpelling(completed, memories, now + 1);
  const result = session.recordSpellingResult(spelling, memories, false, now + 2);
  assert.ok(result);
  for (const key of ["status", "dueAt", "intervalDays", "consecutiveKnown", "lapses", "lastRating", "lastReviewedAt"])
    assert.equal(result.memory[key], memory[key], key);
  assert.equal(result.memory.spelling.attempts, 1);
  assert.equal(result.memory.spelling.correct, 0);
  assert.equal(result.attempt.kind, "spelling");
  assert.equal(result.attempt.wasNew, false);
});

test("包含点号的memory稳定键也原子冲突，不得拼成跨设备混合调度", () => {
  const sample = candidate(1);
  sample.entry = { ...sample.entry, key: "a.b", headword: "a.b" };
  const memory = model.createMemory(sample, now);
  assert.match(memory.id, /\./);
  const base = { version: 1, updatedAt: now, vocabularyMemories: { [memory.id]: memory } };
  const local = { ...base, updatedAt: now + 1, vocabularyMemories: { [memory.id]: { ...memory, lapses: 1, updatedAt: now + 1 } } };
  const remote = { ...base, updatedAt: now + 2, vocabularyMemories: { [memory.id]: { ...memory, dueAt: now + 1000, updatedAt: now + 2 } } };
  const merged = sync.reconcileStudyState({ state: local, base: { state: base, updatedAt: now } }, { state: remote, updatedAt: now + 2 });
  assert.equal(merged.conflicts.length, 1);
  assert.deepEqual(merged.state.vocabularyMemories[memory.id], local.vocabularyMemories[memory.id]);
});

test("旧客户端往返保留未知字段和新词汇数据，迁移异常不改原对象", () => {
  const memory = model.createMemory(candidate(1), now);
  const old = { version: 1, updatedAt: now, termRatings: { legacy: "正确" }, reviewSchedule: { legacy: { dueAt: now - 20, intervalDays: 3, repetitions: 2 } },
    marks: { legacy: ["有些陌生"] }, termNotes: { legacy: "原始笔记" }, lists: ["自定义"], listItems: { "自定义": ["legacy"] },
    futureExtension: { version: 4, nested: { enabled: true } }, vocabularyMemories: { [memory.id]: memory } };
  const protectedState = persistence.preserveVocabularyRecords(old, { version: 1, updatedAt: now + 1, termNotes: { legacy: "修改笔记" } });
  assert.deepEqual(protectedState.futureExtension, old.futureExtension);
  assert.deepEqual(protectedState.vocabularyMemories, old.vocabularyMemories);
  const before = JSON.stringify(old);
  assert.throws(() => migration.migrateLegacyVocabulary(old, () => { throw new Error("synthetic resolver failure"); }, now));
  assert.equal(JSON.stringify(old), before);
});

test("词汇封包保留未知嵌套字段与特殊键；损坏封包原文不可被空状态覆盖", () => {
  const memory = model.createMemory(candidate(1), now);
  memory.futureDetails = { nested: [null, true, false, 1.25, [0, 1], [], {}],
    special: Object.fromEntries([["__proto__", { safe: "内容" }], ["constructor", "自有字段"]]) };
  const state = { version: 1, updatedAt: now, vocabularyMemories: { [memory.id]: memory }, futureOutsideVocabulary: { enabled: true } };
  const packed = codec.packVocabularySnapshot(state);
  assert.deepEqual(codec.unpackVocabularySnapshot(JSON.parse(JSON.stringify(packed))), state);
  assert.equal({}.safe, undefined);
  const disk = storage();
  const original = JSON.stringify({ state: { version: 1, updatedAt: now,
    vocabularyEnvelope: { version: 1, strings: [], value: [0, 999] } }, base: null });
  disk.setItem(sync.studyStorageKey(null), original);
  assert.throws(() => sync.readLocalStudyState(disk, null), /封包/);
  assert.throws(() => sync.saveLocalStudyState(disk, null, { state: { version: 1, updatedAt: now }, base: null }), /封包/);
  assert.equal(disk.getItem(sync.studyStorageKey(null)), original);
});

test("主动采用云端冲突记录必须先成功备份，本地与云端的同ID评分都能追溯", () => {
  const memory = model.createMemory(candidate(1), now);
  const attempt = { id: "conflicting-event", sessionId: "same-session", queueItemId: "same-card", memoryId: memory.id,
    contextId: memory.primaryContextId, kind: "reading", rating: "forgot", createdAt: now, wasNew: true };
  const local = { version: 1, updatedAt: now, vocabularyMemories: { [memory.id]: memory }, vocabularyAttempts: { [attempt.id]: attempt } };
  const remote = { ...local, updatedAt: now + 1, vocabularyAttempts: { [attempt.id]: { ...attempt, rating: "known" } } };
  const disk = storage();
  sync.saveLocalStudyState(disk, null, { state: local, base: null });
  assert.throws(() => sync.saveLocalStudyState(disk, null, { state: remote, base: null }), /冲突/);
  sync.saveLocalStudyState(disk, null, { state: remote, base: null }, { replaceVocabularyAfterBackup: true });
  assert.equal(sync.readLocalStudyState(disk, null).state.vocabularyAttempts[attempt.id].rating, "known");
  const backupKey = Array.from({ length: disk.length }, (_, index) => disk.key(index)).find(key => key.includes(":backup:"));
  assert.ok(backupKey);
  const original = codec.unpackVocabularySnapshot(JSON.parse(disk.getItem(backupKey)).state);
  assert.equal(original.vocabularyAttempts[attempt.id].rating, "forgot");
  const blocked = storage();
  sync.saveLocalStudyState(blocked, null, { state: local, base: null });
  const previousBytes = blocked.getItem(sync.studyStorageKey(null));
  const write = blocked.setItem;
  blocked.setItem = (key, value) => { if (key.includes(":backup:")) throw new Error("synthetic quota"); write(key, value); };
  assert.throws(() => sync.saveLocalStudyState(blocked, null, { state: remote, base: null }, { replaceVocabularyAfterBackup: true }), /quota/);
  assert.equal(blocked.getItem(sync.studyStorageKey(null)), previousBytes);
});

test("从单词标记不会搭配后选择人工词组，后续旧数据迁移不再产生组成单词卡", async () => {
  const { vocabularyCorpus } = await vite.ssrLoadModule("/app/study-app.tsx");
  const phrase = vocabularyCorpus.resolveCandidate("filed for bankruptcy", true, "2010-p1-s4", true);
  assert.ok(phrase);
  const original = { version: 1, updatedAt: now, marks: {}, termContexts: {}, termNotes: { file: "原有笔记" },
    lists: ["我的清单"], listItems: { "我的清单": [] } };
  const first = migration.migrateLegacyVocabulary(original, vocabularyCorpus.resolveLegacyCandidates, now).state;
  const enrolled = bridge.enrollVocabulary(bridge.vocabularyDataFrom(first), phrase, now + 1, "不会搭配", "file");
  const memory = Object.values(enrolled.vocabularyMemories)[0];
  assert.equal(memory.kind, "phrase");
  assert.equal(memory.termKey, "pattern:2010-p1-filed-for-bankruptcy");
  assert.equal(memory.contexts[0].mark, "不会搭配");
  assert.deepEqual(enrolled.vocabularyMigration.migratedKeys.file, [memory.id]);
  const marked = { ...first, ...enrolled, marks: { file: ["不会搭配"] },
    reviewSchedule: { file: { dueAt: now, intervalDays: 0, repetitions: 0 } },
    termContexts: { [JSON.stringify(["review", "file"])]: [{ articleId: "2010-p1", sourceId: "2010-p1-s4", headword: "file", label: "filed", kind: "word" }] } };
  let fileResolutions = 0;
  const migrated = migration.migrateLegacyVocabulary(marked, (key, contexts) => {
    if (key === "file") fileResolutions += 1;
    return vocabularyCorpus.resolveLegacyCandidates(key, contexts);
  }, now + 2);
  assert.equal(fileResolutions, 0);
  assert.equal(migrated.added, 0);
  assert.equal(migrated.changed, false);
  assert.deepEqual(Object.keys(migrated.state.vocabularyMemories), [memory.id]);
  assert.equal(Object.values(migrated.state.vocabularyMemories).some(item => item.kind === "word" && item.termKey === "file"), false);
  for (const key of ["marks", "termContexts", "reviewSchedule", "termNotes", "lists", "listItems"])
    assert.deepEqual(migrated.state[key], marked[key], `保留旧字段 ${key}`);
  const repeated = bridge.enrollVocabulary(enrolled, phrase, now + 3, "不会搭配", "file");
  assert.deepEqual(repeated.vocabularyMigration.migratedKeys.file, [memory.id], "重复选择不复制迁移映射或词组记忆");
});

test("普通标记更新到期安排并追加同义语境，不覆盖原主要出处或推迟逾期项", async () => {
  const { vocabularyCorpus } = await vite.ssrLoadModule("/app/study-app.tsx");
  const dramatic = vocabularyCorpus.resolveCandidate("note", false, "2010-p1-s1", true);
  const hypocrisy = vocabularyCorpus.resolveCandidate("note", false, "p5-s5", true);
  const created = model.createMemory(dramatic, now - 100_000);
  const originalMemory = { ...created, status: "mastered", paused: true, intervalDays: 30,
    consecutiveKnown: 5, lastRating: "known", lastReviewedAt: now - 10_000, dueAt: now + 86_400_000 };
  const originalBytes = JSON.stringify(originalMemory);
  const updated = bridge.enrollVocabulary({ vocabularyMemories: { [created.id]: originalMemory } }, hypocrisy, now, "容易混淆");
  assert.equal(Object.keys(updated.vocabularyMemories).length, 1);
  const memory = updated.vocabularyMemories[created.id];
  assert.equal(memory.primaryContextId, dramatic.context.id);
  assert.equal(memory.contexts.length, 2);
  assert.equal(memory.contexts.find(context => context.id === hypocrisy.context.id).mark, "容易混淆");
  assert.equal(memory.dueAt, now);
  assert.equal(memory.status, "review");
  assert.equal(memory.paused, false);
  assert.equal(memory.consecutiveKnown, originalMemory.consecutiveKnown, "标记本身不伪造或结算一次评分");
  assert.equal(JSON.stringify(originalMemory), originalBytes, "原记忆对象不被原地修改");
  const overdue = { ...originalMemory, dueAt: now - 86_400_000 };
  const remarked = bridge.enrollVocabulary({ vocabularyMemories: { [created.id]: overdue } }, hypocrisy, now, "有些陌生");
  assert.equal(remarked.vocabularyMemories[created.id].dueAt, overdue.dueAt);
  assert.equal(remarked.vocabularyMemories[created.id].primaryContextId, dramatic.context.id);
});
