import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createServer } from "vite";

const vite = await createServer({ appType: "custom", configFile: false,
  root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const codec = await vite.ssrLoadModule("/app/vocabulary-learning/codec.ts");
const sync = await vite.ssrLoadModule("/app/study-sync.ts");

function makeState(count, rounds) {
  const state = { version: 1, updatedAt: 1, termNotes: { note: "旧笔记完全保留" },
    vocabularyMemories: {}, vocabularyAttempts: {}, vocabularySessions: {} };
  const memories = Array.from({ length: count }, (_, index) => {
    const term = `synthetic-word-${index}`;
    const sourceId = `2010-p1-s${index + 1}`;
    const contextId = `${sourceId}:word:${term}`;
    const id = `vocab:word:${term}:n:source%3A${sourceId}`;
    const value = { id, termKey: term, kind: "word", senseId: `source:${sourceId}`, headword: term, partOfSpeech: "n", meaning: `第${index}个真实语境的核心义项`,
      primaryContextId: contextId, contexts: [{ id: contextId, sourceId, articleId: "2010-p1", year: 2010, sourceType: "sentence", sentenceId: sourceId, expression: term }],
      status: "review", dueAt: 1750000000000, intervalDays: 14, consecutiveKnown: rounds, lapses: 0, lastRating: "known", lastReviewedAt: 1740000000000,
      spelling: { enabled: false, attempts: 0, correct: 0 }, paused: false, createdAt: 1730000000000, updatedAt: 1740000000000 };
    state.vocabularyMemories[id] = value;
    return value;
  });
  for (let round = 0; round < rounds; round += 1) {
    for (let start = 0; start < count; start += 20) {
      const sessionId = `session-${randomUUID()}`;
      const queue = memories.slice(start, start + 20).map((memory, index) => ({ id: `card-${index}-${memory.id}`, memoryId: memory.id, kind: "review", contextId: memory.primaryContextId }));
      const attemptIds = queue.map(item => {
        const id = `${sessionId}:${item.id}`;
        state.vocabularyAttempts[id] = { id, sessionId, queueItemId: item.id, memoryId: item.memoryId, contextId: item.contextId,
          kind: "reading", rating: "known", createdAt: 1740000000000 + round, wasNew: round === 0 };
        return id;
      });
      state.vocabularySessions[sessionId] = { id: sessionId, queue, cursor: queue.length, phase: "front", status: "completed", attemptIds, difficultIds: [], startedAt: 1740000000000 + round,
        updatedAt: 1740000000000 + round, completedAt: 1740000000000 + round, activeElapsedMs: 180000 };
    }
  }
  return state;
}

test("dictionary envelopes round-trip every field, Unicode, unknown additions and prototype-like keys", () => {
  const original = makeState(2, 2);
  original.futureField = { remains: ["未来", false, null, -7, 0.25] };
  original.vocabularySettings = JSON.parse('{"future":{"__proto__":{"polluted":true},"constructor":"保留","emoji":"👩🏽‍💻"}}');
  const packed = codec.packVocabularySnapshot(original);
  assert.equal(packed.vocabularyMemories, undefined);
  assert.deepEqual(packed.termNotes, original.termNotes);
  assert.deepEqual(codec.unpackVocabularySnapshot(JSON.parse(JSON.stringify(packed))), original);
  assert.equal({}.polluted, undefined);
});

test("corrupt dictionary indices, prefixes, duplicate fields and future versions fail closed", () => {
  const packed = codec.packVocabularySnapshot(makeState(1, 1));
  const mutations = [
    value => { value.vocabularyEnvelope.version = 2; },
    value => { value.vocabularyEnvelope.strings[0] = [-1]; },
    value => { value.vocabularyEnvelope.atoms[0][0] = 999999; },
    value => { value.vocabularyEnvelope.value = [0, 999999]; },
    value => { value.vocabularyMemories = {}; },
    value => { value.vocabularyEnvelope.shapes[0] = [0, 0]; },
  ];
  for (const mutate of mutations) {
    const invalid = structuredClone(packed); mutate(invalid);
    assert.throws(() => codec.unpackVocabularySnapshot(invalid));
  }
  const expansion = { vocabularyEnvelope: { version: 1, atoms: [[0, "x".repeat(1_000_000)], ...Array.from({ length: 25 }, () => [1_000_000, ""])], strings: [], shapes: [], value: [2] } };
  assert.throws(() => codec.unpackVocabularySnapshot(expansion), /展开过大/);
});

test("representative 100, 1000 and 2000 memories with six reading rounds retain all events", t => {
  for (const count of [100, 1000, 2000]) {
    const original = makeState(count, 6);
    const packed = codec.packVocabularySnapshot(original);
    const rawBytes = codec.studyStorageBytes(original), packedBytes = codec.studyStorageBytes(packed);
    t.diagnostic(`${count} memories / ${count * 6} attempts: ${rawBytes} -> ${packedBytes} UTF-8 bytes`);
    assert.deepEqual(codec.unpackVocabularySnapshot(packed), original);
    assert.ok(packedBytes < rawBytes / 2);
    if (count <= 1000) assert.ok(packedBytes <= codec.MAX_STUDY_STORAGE_BYTES, "1000 words and six rounds fit the safe cloud budget");
  }
});

test("local and account base envelopes decode; explicit cloud conflict choice first preserves the original", () => {
  const entries = new Map();
  const storage = { get length() { return entries.size; }, key: index => [...entries.keys()][index] ?? null,
    getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
  const owner = "synthetic@example.test";
  const local = makeState(1, 1);
  const base = { state: structuredClone(local), updatedAt: 10 };
  sync.saveLocalStudyState(storage, owner, { state: local, base });
  const key = sync.studyStorageKey(owner);
  assert.ok(JSON.parse(entries.get(key)).state.vocabularyEnvelope);
  assert.ok(JSON.parse(entries.get(key)).base.state.vocabularyEnvelope);
  assert.deepEqual(sync.readLocalStudyState(storage, owner), { state: local, base });
  const remote = structuredClone(local);
  Object.values(remote.vocabularyAttempts)[0].rating = "forgot";
  assert.throws(() => sync.saveLocalStudyState(storage, owner, { state: remote, base }), /冲突/);
  sync.replaceLocalStudyStateAfterBackup(storage, owner, { state: remote, base });
  assert.deepEqual(sync.readLocalStudyState(storage, owner).state, remote);
  const backup = [...entries.entries()].find(([name]) => name.startsWith(`${key}:backup:`));
  assert.ok(backup);
  assert.deepEqual(codec.unpackVocabularySnapshot(JSON.parse(backup[1]).state), local);
  const stable = sync.prepareLocalSnapshot(remote, remote, 0, 999);
  assert.equal(stable, remote, "unchanged renders reuse snapshot identity and avoid duplicate packing");
});

test("record encoding and complete account-save timings for 1000 memories and six rounds", t => {
  const state = makeState(1000, 6);
  const base = { state, updatedAt: 1 };
  const entries = new Map();
  const storage = { get length() { return entries.size; }, key: index => [...entries.keys()][index] ?? null,
    getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
  const packTimes = [], saveTimes = [];
  for (let run = 0; run < 5; run += 1) {
    let started = performance.now();
    codec.packVocabularySnapshot(state);
    packTimes.push(performance.now() - started);
    started = performance.now();
    sync.saveLocalStudyState(storage, "performance@example.test", { state, base });
    saveTimes.push(performance.now() - started);
  }
  const describe = values => `median=${values.sort((a, b) => a - b)[2].toFixed(1)}ms max=${Math.max(...values).toFixed(1)}ms`;
  t.diagnostic(`Desktop Node synthetic 1000 memories / 6000 attempts: pack ${describe(packTimes)}; full account save ${describe(saveTimes)}`);
  assert.equal(Object.keys(sync.readLocalStudyState(storage, "performance@example.test").state.vocabularyAttempts).length, 6000);
});
