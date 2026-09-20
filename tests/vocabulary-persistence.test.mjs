import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const vite = await createServer({ appType: "custom", configFile: false,
  root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const persistence = await vite.ssrLoadModule("/app/vocabulary-learning/persistence.ts");
const { migrateLegacyVocabulary, resolveLegacyVocabularySource } = await vite.ssrLoadModule("/app/vocabulary-learning/migration.ts");
const { selectLegacyVocabularyCandidates } = await vite.ssrLoadModule("/app/vocabulary-learning/legacy-selection.ts");
const sync = await vite.ssrLoadModule("/app/study-sync.ts");

const candidate = (key = "note", meaning = "基调；意味", sourceId = "2010-p1-s1") => ({
  entry: { key, headword: key, display: key, kind: "word", partOfSpeech: "n.", contextualMeaning: meaning, use: "用于当前真题语境",
    specialForms: [], examSynonyms: [], collocations: [], otherMeanings: [], wordFamily: [], confusions: [], counts: { form: 1, lemma: 2, family: 2 }, occurrences: [] },
  context: { id: `${sourceId}:${key}`, sourceId, articleId: "2010-p1", year: 2010, sourceType: "sentence", sentenceId: sourceId, expression: key },
});
const note = candidate();
const memory = model.createMemory(note, 100);
const empty = { version: 1, updatedAt: 0, termNotes: {}, answers: {} };
const data = { ...empty, vocabularyMemories: { [memory.id]: memory }, ...Object.fromEntries(Object.entries(persistence.readVocabularyData({})).filter(([key]) => key !== "vocabularyMemories")) };
const cloud = state => ({ state, updatedAt: 100 });
const storage = () => {
  const entries = new Map();
  return { entries, get length() { return entries.size; }, key: index => [...entries.keys()][index] ?? null,
    getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
};

test("vocabulary snapshot validation accepts optional fields and stops malformed records", () => {
  assert.equal(sync.isStudySnapshot(empty), true);
  assert.equal(sync.isStudySnapshot(data), true);
  assert.equal(sync.hasStudyRecords(data), true);
  assert.equal(sync.hasStudyRecords({ ...empty, vocabularySettings: model.DEFAULT_SETTINGS }), false);
  for (const fields of [
    { vocabularyMemories: { [memory.id]: { ...memory, dueAt: -1 } } },
    { vocabularyMemories: { different: memory } },
    { vocabularySettings: { ...model.DEFAULT_SETTINGS, sessionSize: 0 } },
    { vocabularyQueueState: { updatedAt: 0, activeSessionId: 7 } },
    { vocabularyMigration: { version: 1, migratedKeys: {}, unresolvedKeys: [3], completedAt: 0 } },
  ]) assert.equal(sync.isStudySnapshot({ ...empty, ...fields }), false);
});

test("legacy migration keeps every old field, future and overdue schedules, and is idempotent", () => {
  const context = { articleId: note.context.articleId, sourceId: note.context.sourceId, headword: "note", label: "note", kind: "word" };
  const legacy = { ...empty, termRatings: { note: "正确" }, reviewSchedule: { note: { dueAt: 999999, intervalDays: 14, repetitions: 7 } },
    termContexts: { '["review","note"]': [context] }, marks: { note: ["容易混淆"] }, termNotes: { note: "原笔记" }, notes: { note: "更早版本笔记" },
    lists: ["本周重点", "精读"], listItems: { 精读: ["note"] }, futureOptionalField: { untouched: true } };
  const original = structuredClone(legacy);
  const result = migrateLegacyVocabulary(legacy, () => [note, candidate("note", "笔记；记录", "other")], 200);
  assert.deepEqual(legacy, original);
  for (const [key, value] of Object.entries(legacy)) assert.deepEqual(result.state[key], value, key);
  assert.equal(result.added, 1, "saved sense only, not every homographic meaning");
  const migrated = Object.values(result.state.vocabularyMemories)[0];
  assert.equal(migrated.meaning, "基调；意味");
  assert.equal(migrated.dueAt, 999999);
  assert.equal(migrated.intervalDays, 14);
  assert.equal(migrated.consecutiveKnown, 0, "old self-rating cannot invent independent mastery");
  assert.equal(migrated.contexts[0].mark, "容易混淆");
  const again = migrateLegacyVocabulary(result.state, () => { throw new Error("must not resolve migrated keys again"); }, 300);
  assert.equal(again.changed, false);
  assert.deepEqual(again.state, result.state);
  const overdue = migrateLegacyVocabulary({ ...legacy, reviewSchedule: { note: { dueAt: 50, intervalDays: 1, repetitions: 0 } } }, () => [note], 200);
  assert.equal(Object.values(overdue.state.vocabularyMemories)[0].dueAt, 50, "migration must not silently postpone overdue items");
});

test("old terms automatically use their most frequent real sense without duplicating historical progress", () => {
  const record = candidate("note", "笔记；记录", "other");
  const otherTone = candidate("note", "意味；色彩", "p5-s5");
  const legacy = { ...empty, termRatings: { note: "正确" }, reviewSchedule: { note: { dueAt: 9000, intervalDays: 7, repetitions: 3 } }, marks: { note: ["完全不会"] },
    termNotes: { note: "原笔记" }, notes: { note: "早期笔记" }, lists: ["重点"], listItems: { 重点: ["note"] }, termContexts: {}, futureField: { untouched: true } };
  const original = structuredClone(legacy);
  const result = migrateLegacyVocabulary(legacy, () => [record, otherTone, note, record], 200);
  assert.deepEqual(legacy, original);
  for (const [key, value] of Object.entries(legacy)) assert.deepEqual(result.state[key], value, key);
  assert.deepEqual(result.unresolvedKeys, []);
  assert.equal(result.added, 1);
  assert.equal(Object.keys(result.state.vocabularyMemories).length, 1);
  const migrated = Object.values(result.state.vocabularyMemories)[0];
  assert.equal(migrated.senseId, "reviewed:tone");
  assert.equal(migrated.contexts.length, 2);
  assert.equal(migrated.primaryContextId, note.context.id);
  assert.equal(migrated.dueAt, 9000);
  assert.equal(migrated.intervalDays, 7);
  assert.equal(migrated.consecutiveKnown, 0);
  assert.equal(migrated.contexts[0].mark, "完全不会");
  assert.equal(result.state.vocabularyAttempts, undefined, "migration does not fabricate a practice event");
  assert.deepEqual(result.state.vocabularyMigration.migratedKeys.note, [migrated.id]);
  assert.equal(migrateLegacyVocabulary(result.state, () => { throw new Error("already migrated"); }, 300).changed, false);
});

test("valid old sources outrank frequency while obsolete sources fall back automatically", () => {
  const record = candidate("note", "笔记；记录", "other");
  const secondRecord = candidate("note", "笔记；记录", "other-two");
  const saved = { articleId: note.context.articleId, sourceId: note.context.sourceId, headword: "note", label: "note", kind: "word" };
  const legacy = { ...empty, reviewSchedule: { note: { dueAt: 50, intervalDays: 14, repetitions: 4 } }, termContexts: { '["review","note"]': [saved] } };
  const available = [secondRecord, record, note];
  const preserved = Object.values(migrateLegacyVocabulary(legacy, () => available, 200).state.vocabularyMemories)[0];
  assert.equal(preserved.senseId, "reviewed:tone");
  assert.equal(preserved.primaryContextId, note.context.id);
  assert.equal(preserved.dueAt, 50, "overdue plans are never silently postponed");
  const obsolete = { ...legacy, termContexts: { '["review","note"]': [{ ...saved, sourceId: "removed-source" }] } };
  const result = migrateLegacyVocabulary(obsolete, () => available, 200);
  const replaced = Object.values(result.state.vocabularyMemories)[0];
  assert.equal(replaced.senseId, "reviewed:record");
  assert.equal(replaced.contexts.length, 2);
  assert.equal(replaced.dueAt, 50);
  assert.deepEqual(result.state.termContexts, obsolete.termContexts, "a new practice example is not written as historical source metadata");
});

test("automatic legacy selection deduplicates sources, uses a stable tie, and distinguishes same-source phrases", () => {
  const record = candidate("note", "笔记；记录", "other");
  const duplicateTone = { ...note, context: { ...note.context, id: `${note.context.id}:duplicate` } };
  const forward = selectLegacyVocabularyCandidates([note, record, duplicateTone]);
  const reverse = selectLegacyVocabularyCandidates([duplicateTone, record, note]);
  assert.deepEqual(forward, reverse);
  assert.equal(forward[0].entry.contextualMeaning, "笔记；记录", "one source counted twice cannot beat the stable sense tie");
  const tools = candidate("pattern:simple-noun-phrase", "农具", "shared-source");
  const chemicals = candidate("pattern:simple-noun-phrase", "化肥", "shared-source");
  tools.entry.kind = chemicals.entry.kind = "phrase";
  tools.context = { ...tools.context, id: "tools", expression: "agricultural implements" };
  chemicals.context = { ...chemicals.context, id: "chemicals", expression: "chemical fertilizers" };
  const selected = selectLegacyVocabularyCandidates([tools, chemicals], [{ articleId: tools.context.articleId, sourceId: tools.context.sourceId, label: "chemical fertilizers", kind: "phrase" }]);
  assert.deepEqual(selected, [chemicals]);
});

test("migration never overwrites existing sense progress, even without stored attempts", () => {
  const record = candidate("note", "笔记；记录", "other");
  const tone = { ...model.createMemory(note, 100), status: "mastered", dueAt: 90_000, intervalDays: 30, consecutiveKnown: 5, lapses: 2 };
  const other = { ...model.createMemory(record, 100), status: "review", dueAt: 40_000, intervalDays: 14, consecutiveKnown: 3 };
  const legacy = { ...empty, vocabularyMemories: { [tone.id]: tone, [other.id]: other }, reviewSchedule: { note: { dueAt: 10, intervalDays: 1, repetitions: 0 } },
    marks: { note: ["完全不会"] }, termContexts: { '["review","note"]': [{ articleId: note.context.articleId, sourceId: note.context.sourceId, headword: "note", label: "note", kind: "word" }] } };
  const result = migrateLegacyVocabulary(legacy, () => [record, note], 200);
  assert.equal(result.added, 0);
  assert.deepEqual(result.state.vocabularyMemories, legacy.vocabularyMemories);
  assert.equal(result.state.vocabularyAttempts, undefined);
  const unresolved = { ...legacy, vocabularyMigration: { version: 1, migratedKeys: {}, unresolvedKeys: ["note"], completedAt: 100 } };
  const explicitlySelected = resolveLegacyVocabularySource(unresolved, "note", note, 200).vocabularyMemories[tone.id];
  for (const key of ["status", "dueAt", "intervalDays", "consecutiveKnown", "lapses", "lastRating", "lastReviewedAt"]) assert.equal(explicitlySelected[key], tone[key], key);
});

test("automatic context enrichment keeps an existing primary source, spelling and attempts intact", () => {
  const oldTone = candidate("note", "意味；色彩", "p5-s5");
  const learned = { ...model.createMemory(oldTone, 100), status: "paused", paused: true, dueAt: 90_000,
    intervalDays: 30, consecutiveKnown: 5, lapses: 2, lastRating: "known", lastReviewedAt: 180, lastAdvancedDay: "1970-01-01",
    spelling: { enabled: true, attempts: 3, correct: 2, lastAttemptAt: 190 } };
  const attempt = { id: "session:old-note", sessionId: "session", queueItemId: "old-note", memoryId: learned.id,
    contextId: oldTone.context.id, kind: "spelling", correct: false, createdAt: 190, wasNew: false };
  const legacy = { ...empty, vocabularyMemories: { [learned.id]: learned }, vocabularyAttempts: { [attempt.id]: attempt },
    reviewSchedule: { note: { dueAt: 10, intervalDays: 1, repetitions: 0 } }, marks: { note: ["完全不会"] }, termContexts: {} };
  const original = structuredClone(legacy);
  const selected = selectLegacyVocabularyCandidates([note, oldTone], [], legacy.vocabularyMemories);
  assert.deepEqual(legacy, original, "temporary grouping cannot change a saved timestamp or memory");
  assert.deepEqual(selected, [note, oldTone], "only original real corpus candidates leave selection");
  const result = migrateLegacyVocabulary(legacy, () => [note, oldTone], 200);
  const enriched = result.state.vocabularyMemories[learned.id];
  assert.equal(result.added, 0);
  assert.equal(enriched.primaryContextId, oldTone.context.id, "automatic selection cannot replace an existing primary source");
  assert.deepEqual(enriched.contexts, [oldTone.context, note.context]);
  for (const key of ["status", "paused", "dueAt", "intervalDays", "consecutiveKnown", "lapses", "lastRating", "lastReviewedAt", "lastAdvancedDay", "createdAt", "spelling"]) {
    assert.deepEqual(enriched[key], learned[key], key);
  }
  assert.deepEqual(result.state.vocabularyAttempts, legacy.vocabularyAttempts);
  assert.deepEqual(result.state.termContexts, {});
  assert.deepEqual(legacy, original);
});

test("previously unresolved terms retry automatically; unavailable terms retain records without blocking others", () => {
  const legacy = { ...empty, reviewSchedule: { note: { dueAt: 50, intervalDays: 3, repetitions: 2 }, missing: { dueAt: 70, intervalDays: 1, repetitions: 0 } },
    marks: { note: ["容易混淆"], missing: ["完全不会"] }, termNotes: { missing: "保留这个旧词" },
    vocabularyMigration: { version: 1, migratedKeys: {}, unresolvedKeys: ["note", "missing"], completedAt: 100 } };
  const result = migrateLegacyVocabulary(legacy, key => key === "note" ? [note, candidate("note", "意味；色彩", "p5-s5")] : [], 200);
  assert.equal(result.added, 1);
  assert.deepEqual(result.unresolvedKeys, ["missing"]);
  assert.deepEqual(result.state.reviewSchedule, legacy.reviewSchedule);
  assert.deepEqual(result.state.termNotes, legacy.termNotes);
  assert.deepEqual(result.state.marks, legacy.marks);
  assert.equal(Object.values(result.state.vocabularyMemories)[0].dueAt, 50);
  const again = migrateLegacyVocabulary(result.state, key => { assert.equal(key, "missing"); return []; }, 300);
  assert.equal(again.changed, false);
  assert.deepEqual(again.state, result.state);
});

test("migration failures are pure and cannot overwrite original local records", () => {
  const legacy = { ...empty, marks: { note: ["完全不会"] }, termNotes: { note: "不能丢失" } };
  const original = structuredClone(legacy);
  assert.throws(() => migrateLegacyVocabulary(legacy, () => { throw new Error("bad corpus"); }, 200), /bad corpus/);
  assert.deepEqual(legacy, original);
  const partlyResolvable = { ...legacy, marks: { note: ["完全不会"], missing: ["完全不会"] } };
  const before = structuredClone(partlyResolvable);
  assert.throws(() => migrateLegacyVocabulary(partlyResolvable, key => { if (key === "note") return [note]; throw new Error("later failure"); }, 200), /later failure/);
  assert.deepEqual(partlyResolvable, before, "no partially migrated state leaks after a later failure");
  const local = storage();
  const key = sync.studyStorageKey(null);
  local.entries.set(key, "broken-json-original");
  assert.throws(() => sync.saveLocalStudyState(local, null, { state: empty, base: null }));
  assert.equal(local.entries.get(key), "broken-json-original");
  local.entries.set(key, JSON.stringify({ state: legacy, base: null }));
  const raw = local.entries.get(key);
  assert.throws(() => sync.saveLocalStudyState(local, null, { state: { ...legacy, vocabularyMemories: { bad: {} } }, base: null }), /停止写回/);
  assert.equal(local.entries.get(key), raw);
});

test("old snapshots and clients preserve vocabulary and future unknown fields", () => {
  const original = { ...data, futureStudyField: { value: "preserve" } };
  const oldPage = { ...empty, termNotes: { note: "旧页面更新" } };
  const safe = persistence.preserveVocabularyRecords(original, oldPage);
  assert.deepEqual(safe.vocabularyMemories, original.vocabularyMemories);
  assert.deepEqual(safe.futureStudyField, original.futureStudyField);
  assert.equal(safe.termNotes.note, "旧页面更新");
  const next = sync.prepareLocalSnapshot(oldPage, original, 0, 200);
  assert.deepEqual(next.vocabularyMemories, data.vocabularyMemories);
  const merged = sync.reconcileStudyState({ state: oldPage, base: cloud(original) }, cloud({ ...original, answers: { 1: "A" } }));
  assert.deepEqual(merged.conflicts, []);
  assert.deepEqual(merged.state.vocabularyMemories, data.vocabularyMemories);
  assert.deepEqual(merged.state.futureStudyField, original.futureStudyField);
});

test("concurrent memory and session updates conflict atomically rather than mix intervals or queue order", () => {
  const id = memory.id;
  const base = { ...data, vocabularySessions: { "session.with.dots": makeSession() } };
  const local = { ...base, vocabularyMemories: { [id]: { ...memory, intervalDays: 3, dueAt: 300 } },
    vocabularySessions: { "session.with.dots": { ...makeSession(), cursor: 7 } } };
  const remote = { ...base, vocabularyMemories: { [id]: { ...memory, intervalDays: 7, dueAt: 700 } },
    vocabularySessions: { "session.with.dots": { ...makeSession(), cursor: 8, queue: [...makeSession().queue].reverse() } } };
  const merged = sync.reconcileStudyState({ state: local, base: cloud(base) }, cloud(remote));
  assert.deepEqual(new Set(merged.conflicts), new Set([`vocabularyMemories.${id}`, "vocabularySessions.session.with.dots"]));
  assert.deepEqual(merged.state.vocabularyMemories[id], local.vocabularyMemories[id]);
  assert.deepEqual(merged.state.vocabularySessions["session.with.dots"], local.vocabularySessions["session.with.dots"]);
});

function makeSession() {
  return { id: "session.with.dots", queue: Array.from({ length: 20 }, (_, index) => ({ id: `item-${index}`, memoryId: memory.id, kind: "review", contextId: memory.primaryContextId })),
    cursor: 6, phase: "front", status: "paused", attemptIds: Array.from({ length: 6 }, (_, index) => `attempt-${index}`), difficultIds: [], startedAt: 100, updatedAt: 200 };
}

test("guest and signed-in envelopes restore card seven and all six immutable ratings", () => {
  const session = makeSession();
  const attempts = Object.fromEntries(session.attemptIds.map((id, index) => [id, { id, sessionId: session.id, queueItemId: `item-${index}`, memoryId: memory.id,
    contextId: memory.primaryContextId, kind: "reading", rating: "known", createdAt: 101 + index, wasNew: false }]));
  const state = { ...data, vocabularySessions: { [session.id]: session }, vocabularyAttempts: attempts, vocabularyQueueState: { activeSessionId: session.id, updatedAt: 200 } };
  const local = storage();
  for (const owner of [null, "synthetic@example.test"]) {
    sync.saveLocalStudyState(local, owner, { state, base: owner ? cloud(state) : null });
    const restored = sync.readLocalStudyState(local, owner).state;
    assert.equal(restored.vocabularySessions[session.id].cursor, 6);
    assert.equal(Object.keys(restored.vocabularyAttempts).length, 6);
    assert.deepEqual(restored.vocabularySessions[session.id].attemptIds, session.attemptIds);
  }
  assert.throws(() => persistence.preserveVocabularyRecords(state, { ...state,
    vocabularyAttempts: { ...attempts, "attempt-0": { ...attempts["attempt-0"], rating: "forgot" } } }), /冲突/);
});
