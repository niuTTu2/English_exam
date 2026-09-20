import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", root, configFile: false, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const groups = await vite.ssrLoadModule("/app/vocabulary-learning/memory-groups.ts");
const queue = await vite.ssrLoadModule("/app/vocabulary-learning/queue.ts");
const scheduler = await vite.ssrLoadModule("/app/vocabulary-learning/scheduler.ts");
const sessions = await vite.ssrLoadModule("/app/vocabulary-learning/session.ts");
const bridge = await vite.ssrLoadModule("/app/vocabulary-learning/study-bridge.ts");
const persistence = await vite.ssrLoadModule("/app/vocabulary-learning/persistence.ts");
const now = new Date(2026, 8, 20, 10).getTime(), day = 86_400_000;

function candidate(key, meaning, source, pos = "n.") {
  return { manual: true, entry: { key, headword: key, display: key, kind: "word", partOfSpeech: pos,
    contextualMeaning: meaning, use: "语境用法", otherMeanings: [], occurrences: [] },
  context: { id: `${source}:${key}`, sourceId: source, articleId: "article", year: 2010, sourceType: "sentence", expression: key } };
}
function legacy(meaning, source, changes = {}, key = "company", pos = "n.") {
  const memory = model.createMemory(candidate(key, meaning, source, pos), now - day);
  const senseId = `source:${source}|${key}`;
  return { ...memory, senseId, id: model.memoryId(key, "word", senseId, memory.partOfSpeech), ...changes };
}
function dictionary(...memories) { return Object.fromEntries(memories.map(memory => [memory.id, memory])); }
function item(memory, id, kind = "review") { return { id, memoryId: memory.id, contextId: memory.primaryContextId, kind }; }

test("legacy equivalent senses count once and retain every source, ID, future date and old object", () => {
  const overdue = legacy("公司", "source-a", { status: "review", dueAt: now - day, consecutiveKnown: 2, intervalDays: 3 });
  const future = legacy("公司；企业", "source-b", { status: "mastered", dueAt: now + 30 * day, consecutiveKnown: 5, intervalDays: 30 });
  const unseen = legacy("公司；商号", "source-c");
  const companion = legacy("陪伴", "source-d", { status: "review", dueAt: now + day });
  const original = dictionary(overdue, future, unseen, companion), before = structuredClone(original);
  assert.equal(scheduler.dueMemories(original, now).length, 1);
  const prepared = queue.createLearningQueue(original, [], model.DEFAULT_SETTINGS, now);
  assert.equal(prepared.queue.length, 1);
  assert.equal(prepared.queue[0].memoryId, overdue.id);
  assert.equal(prepared.memories[overdue.id].contexts.length, 3);
  assert.equal(prepared.memories[overdue.id].primaryContextId, overdue.primaryContextId);
  assert.deepEqual(Object.keys(prepared.memories).sort(), Object.keys(original).sort());
  for (const memory of Object.values(prepared.memories)) assert.equal(memory.dueAt, original[memory.id].dueAt);
  assert.deepEqual(original, before);
  assert.equal(prepared.memories[future.id], future);
  assert.equal(persistence.isVocabularySnapshotFields({ vocabularyMemories: prepared.memories }), true);
});

test("an existing semantic identity is reused when another equivalent source is marked", () => {
  const memory = legacy("公司", "source-a", { status: "review", dueAt: now + day, consecutiveKnown: 2 });
  const original = { vocabularyMemories: dictionary(memory), termRatings: { company: "认识" }, termNotes: { company: "原笔记" } };
  const enrolled = bridge.enrollVocabulary(original, candidate("company", "公司；企业", "source-b"), now);
  assert.deepEqual(Object.keys(enrolled.vocabularyMemories), [memory.id]);
  assert.equal(enrolled.vocabularyMemories[memory.id].contexts.length, 2);
  assert.equal(enrolled.vocabularyMemories[memory.id].dueAt, memory.dueAt);
  assert.deepEqual(enrolled.termRatings, original.termRatings);
  assert.deepEqual(enrolled.termNotes, original.termNotes);
});

test("scoped counts and queues use the same earliest plan across aliases from different articles", () => {
  const overdue = legacy("公司", "source-a", { status: "review", dueAt: now - day });
  const future = legacy("公司；企业", "source-b", { status: "review", dueAt: now + 30 * day });
  const otherSense = legacy("陪伴", "source-c", { status: "review", dueAt: now - day });
  const memories = dictionary(overdue, future, otherSense);
  const scoped = groups.memoriesInSemanticScope(memories, [future.id]);
  assert.deepEqual(Object.keys(scoped).sort(), [overdue.id, future.id].sort());
  assert.equal(queue.vocabularyTodayStats(scoped, {}, now).dueWords, 1);
  const prepared = queue.createLearningQueue(memories, [], model.DEFAULT_SETTINGS, now, "review", { memoryIds: [future.id] });
  assert.equal(prepared.queue.length, 1);
  assert.equal(prepared.queue[0].memoryId, overdue.id);
});

test("explicit recall shares a conservative schedule and cannot requeue alias copies", () => {
  const a = legacy("公司", "source-a", { status: "review", dueAt: now - day, consecutiveKnown: 1, intervalDays: 1, lapses: 2 });
  const b = legacy("公司；企业", "source-b", { status: "mastered", dueAt: now + 30 * day, consecutiveKnown: 5, intervalDays: 30, lapses: 7 });
  const unrelated = legacy("陪伴", "source-c", { status: "review", dueAt: now - day });
  const original = dictionary(a, b, unrelated), before = structuredClone(original);
  const session = sessions.revealSession(sessions.createSession([item(a, "first"), item(b, "duplicate"), item(unrelated, "other")], now), now);
  const result = sessions.rateSession(session, original, "known", now);
  assert.deepEqual(Object.keys(result.memories).sort(), [a.id, b.id].sort());
  assert.equal(result.memories[a.id].intervalDays, 3);
  assert.equal(result.memories[b.id].dueAt, result.memory.dueAt);
  assert.equal(result.memories[b.id].lapses, b.lapses);
  assert.equal(result.memories[b.id].primaryContextId, b.primaryContextId);
  assert.equal(result.memories[b.id].meaning, b.meaning);
  assert.deepEqual(result.memories[b.id].spelling, b.spelling);
  assert.deepEqual(result.session.queue.map(card => card.id), ["first", "other"]);
  assert.equal(result.session.cursor, 1);
  assert.equal(result.attempt.memoryId, a.id);
  assert.deepEqual(original, before);
  const next = { ...original, ...result.memories };
  assert.deepEqual(scheduler.dueMemories(next, now).map(memory => memory.id), [unrelated.id]);
  const staleSession = sessions.revealSession(sessions.createSession([item(b, "another")], now + 1), now + 1);
  const repeated = sessions.rateSession(staleSession, next, "easy", now + 1);
  assert.equal(repeated.memory.dueAt, result.memory.dueAt);
  assert.equal(repeated.memory.consecutiveKnown, result.memory.consecutiveKnown);
});

test("same-day advancement on any alias guards a still-overdue sibling", () => {
  const a = legacy("公司", "source-a", { status: "review", dueAt: now - day, consecutiveKnown: 2 });
  const b = legacy("公司；企业", "source-b", { status: "review", dueAt: now + 7 * day, consecutiveKnown: 3, lastAdvancedDay: scheduler.localDay(now) });
  const result = sessions.rateSession(sessions.revealSession(sessions.createSession([item(a, "first")], now), now), dictionary(a, b), "easy", now);
  assert.equal(result.memory.consecutiveKnown, 2);
  assert.equal(result.memory.lastAdvancedDay, scheduler.localDay(now));
  assert.equal(result.memory.intervalDays, 1);
  assert.equal(result.memories[b.id].dueAt, result.memory.dueAt);
});

test("source rotation reads attempts from every alias and spelling is offered once per sense", () => {
  const a = legacy("公司", "source-a", { status: "review", dueAt: now - day, consecutiveKnown: 2 });
  const b = legacy("公司；企业", "source-b", { status: "review", dueAt: now - 2 * day, consecutiveKnown: 2 });
  const memories = dictionary(a, b);
  const attempt = { id: "past", memoryId: a.id, kind: "reading", contextId: a.primaryContextId, createdAt: now - 1 };
  const prepared = queue.createLearningQueue(memories, [], model.DEFAULT_SETTINGS, now, "review", { attempts: { past: attempt } });
  assert.equal(prepared.queue[0].memoryId, b.id);
  assert.equal(prepared.queue[0].contextId, b.primaryContextId);
  const completed = { ...sessions.createSession([item(a, "one"), item(b, "two")], now), status: "completed", cursor: 2 };
  const spelling = sessions.appendSpelling(completed, memories, now);
  assert.equal(spelling.queue.filter(card => card.kind === "spelling").length, 1);
  const finished = { ...spelling, status: "completed", cursor: spelling.queue.length };
  assert.equal(sessions.appendSpelling(finished, memories, now), finished);
});

test("failure suppresses initial duplicate cards but preserves the required retry and immutable prefix", () => {
  const a = legacy("公司", "source-a"), b = legacy("公司；企业", "source-b");
  const other = legacy("陪伴", "source-c");
  const memories = dictionary(a, b, other);
  const session = sessions.revealSession(sessions.createSession([item(a, "first", "new-word"), item(b, "duplicate", "new-word"), item(other, "other", "new-word")], now), now);
  const result = sessions.rateSession(session, memories, "forgot", now);
  assert.equal(result.session.queue[0].id, "first");
  assert.equal(result.session.queue.filter(card => card.kind === "retry").length, 1);
  assert.equal(result.session.queue.some(card => card.id === "duplicate"), false);
  assert.equal(result.memory.lapses, 1);
  assert.equal(result.memories[b.id].lapses, 1);
  assert.equal(result.session.attemptIds.length, 1);
  const restored = sessions.skipPausedSessionItems(JSON.parse(JSON.stringify(sessions.pauseSession(result.session, now + 1))), { ...memories, ...result.memories }, now + 2);
  assert.equal(restored.cursor, 1);
  assert.deepEqual(restored.attemptIds, result.session.attemptIds);
  assert.equal(restored.queue.filter(card => card.kind === "retry").length, 1);
});

test("paused-only groups stay paused; mixed groups keep active work until the user pauses the sense", () => {
  const a = legacy("公司", "source-a", { status: "paused", paused: true });
  const b = legacy("公司；企业", "source-b", { status: "review", dueAt: now - day, lastReviewedAt: now - day });
  assert.equal(queue.createLearningQueue(dictionary(a), [], model.DEFAULT_SETTINGS, now).queue.length, 0);
  assert.equal(queue.createLearningQueue(dictionary(a, b), [], model.DEFAULT_SETTINGS, now).queue.length, 1);
  const paused = groups.setMemoryGroupPaused(dictionary(a, b), b.id, true, now);
  assert.ok(Object.values(paused).every(memory => memory.paused));
  assert.equal(queue.createLearningQueue(paused, [], model.DEFAULT_SETTINGS, now).queue.length, 0);
});

test("discarded legacy duplicates do not shorten the four-card forgot retry gap", () => {
  const a = legacy("公司", "source-a"), b = legacy("公司；企业", "source-b"), c = legacy("公司；商号", "source-c");
  const others = Array.from({ length: 6 }, (_, index) => legacy(`义${index}`, `other-${index}`, {}, `word-${index}`));
  const memories = dictionary(a, b, c, ...others);
  const cards = [a, b, c, ...others].map((memory, index) => item(memory, `card-${index}`, "new-word"));
  const session = sessions.revealSession(sessions.createSession(cards, now), now);
  const result = sessions.rateSession(session, memories, "forgot", now);
  const retryIndex = result.session.queue.findIndex(card => card.kind === "retry");
  assert.equal(retryIndex, 5);
  assert.equal(result.session.queue[retryIndex].memoryId, a.id);
  assert.equal(result.session.queue.slice(1, retryIndex).length, 4);
});

test("frequency-equivalent attempts count once, while all original attempts survive and different senses remain separate", () => {
  const a = legacy("公司", "source-a"), b = legacy("公司；企业", "source-b"), c = legacy("陪伴", "source-c");
  const memories = dictionary(a, b, c);
  const events = [a, b, c].map((memory, index) => ({ id: `attempt-${index}`, sessionId: "old", queueItemId: `card-${index}`,
    memoryId: memory.id, contextId: memory.primaryContextId, kind: "reading", rating: "known", createdAt: now, wasNew: true }));
  const attempts = Object.fromEntries(events.map(attempt => [attempt.id, attempt])), before = structuredClone(attempts);
  const stats = queue.vocabularyTodayStats(memories, attempts, now);
  assert.equal(stats.completed, 2); assert.equal(stats.newWords, 2);
  const session = { ...sessions.createSession([item(a, "card-0"), item(b, "card-1"), item(c, "card-2")], now), attemptIds: events.map(attempt => attempt.id) };
  assert.equal(sessions.sessionSummary(session, attempts, memories).newWords, 2);
  assert.deepEqual(attempts, before);
  const noun = legacy("工作", "noun", {}, "work", "n."), verb = legacy("工作", "verb", {}, "work", "v.");
  assert.notEqual(groups.memorySemanticKey(noun), groups.memorySemanticKey(verb));
});
