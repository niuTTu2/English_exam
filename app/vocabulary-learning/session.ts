import { scheduleReview } from "./scheduler";
import type { VocabularyAttempt, VocabularyMemory, VocabularyQueueItem, VocabularyRating, VocabularySession } from "./model";
import { activeMemory, distinctMemoryKeys, memoryGroup, memoryGroups, representativeMemory, withGroupContexts } from "./memory-groups";

export function createSession(queue: VocabularyQueueItem[], now: number, options: { id?: string; timeLimitMinutes?: number } = {}): VocabularySession {
  const id = options.id ?? `session-${globalThis.crypto.randomUUID()}`;
  return { id, queue: queue.map(item => ({ ...item })), cursor: 0, phase: queue[0]?.kind === "spelling" ? "spelling" : "front",
    status: queue.length ? "active" : "completed", attemptIds: [], difficultIds: [],
    startedAt: now, updatedAt: now, activeElapsedMs: 0, runningSince: queue.length ? now : undefined,
    ...(options.timeLimitMinutes ? { timeLimitMinutes: options.timeLimitMinutes } : {}),
    ...(!queue.length ? { completedAt: now } : {}) };
}

export function revealSession(session: VocabularySession, now: number): VocabularySession {
  if (session.status !== "active" || session.phase !== "front" || !session.queue[session.cursor]) return session;
  return { ...session, phase: "answer", revealedAt: now, updatedAt: now };
}
export function pauseSession(session: VocabularySession, now: number): VocabularySession {
  return session.status !== "active" ? session : { ...session, status: "paused", activeElapsedMs: sessionElapsedMs(session, now), runningSince: undefined, updatedAt: now };
}
export function resumeSession(session: VocabularySession, now: number): VocabularySession {
  return session.status !== "paused" ? session : { ...session, status: "active", runningSince: now, updatedAt: now };
}
export function sessionElapsedMs(session: VocabularySession, now: number) {
  return (session.activeElapsedMs ?? 0) + (session.status === "active" ? Math.max(0, now - (session.runningSince ?? session.updatedAt)) : 0);
}
export function skipPausedSessionItems(session: VocabularySession, memories: Record<string, VocabularyMemory>, now: number): VocabularySession {
  const grouping = memoryGroups(memories);
  const prefix = session.queue.slice(0, session.cursor);
  const initialSeen = new Set(prefix.filter(item => item.kind !== "spelling").map(item => grouping.keys.get(item.memoryId) ?? item.memoryId));
  const remaining = session.queue.slice(session.cursor).filter(item => {
    if (memories[item.memoryId] && !activeMemory(memories[item.memoryId])) return false;
    // A retry remains a deliberate second recall; only redundant initial cards are removed.
    if (item.kind === "retry" || item.kind === "spelling") return true;
    const key = grouping.keys.get(item.memoryId) ?? item.memoryId;
    if (initialSeen.has(key)) return false;
    initialSeen.add(key); return true;
  });
  if (prefix.length + remaining.length === session.queue.length) return session;
  const changedCard = remaining[0]?.id !== session.queue[session.cursor]?.id;
  return { ...session, queue: [...prefix, ...remaining], updatedAt: now,
    ...(changedCard ? { phase: remaining[0]?.kind === "spelling" ? "spelling" as const : "front" as const, revealedAt: undefined } : {}),
    ...(!remaining.length ? { status: "completed" as const, completedAt: now, activeElapsedMs: sessionElapsedMs(session, now), runningSince: undefined } : {}) };
}
export function switchSessionContext(session: VocabularySession, memory: VocabularyMemory, contextId: string, now: number): VocabularySession {
  const current = session.queue[session.cursor];
  if (!current || current.memoryId !== memory.id || !memory.contexts.some(context => context.id === contextId)) return session;
  return { ...session, queue: session.queue.map((item, index) => index === session.cursor ? { ...item, contextId } : item), phase: "front", revealedAt: undefined, updatedAt: now };
}

function advanceSession(session: VocabularySession, now: number): VocabularySession {
  const cursor = session.cursor + 1;
  return { ...session, cursor, phase: session.queue[cursor]?.kind === "spelling" ? "spelling" : "front", revealedAt: undefined,
    status: cursor >= session.queue.length ? "completed" : "active", updatedAt: now,
    ...(cursor >= session.queue.length ? { completedAt: now, activeElapsedMs: sessionElapsedMs(session, now), runningSince: undefined } : {}) };
}
export function skipSessionSpelling(session: VocabularySession, now: number): VocabularySession {
  return session.status === "active" && session.queue[session.cursor]?.kind === "spelling" ? advanceSession(session, now) : session;
}

export function rateSession(session: VocabularySession, memories: Record<string, VocabularyMemory>, rating: VocabularyRating, now: number) {
  const item = session.queue[session.cursor];
  if (session.status !== "active" || session.phase !== "answer" || !item || item.kind === "spelling") return undefined;
  const attemptId = `${session.id}:${item.id}`;
  if (session.attemptIds.includes(attemptId) || !memories[item.memoryId] || !activeMemory(memories[item.memoryId])) return undefined;
  const attempt: VocabularyAttempt = { id: attemptId, sessionId: session.id, queueItemId: item.id,
    memoryId: item.memoryId, contextId: item.contextId, kind: "reading", rating, createdAt: now,
    wasNew: item.kind === "new-word" || item.kind === "new-phrase" };
  const group = memoryGroup(memories, item.memoryId).filter(activeMemory);
  const prior = memories[item.memoryId];
  const learned = group.filter(member => member.status !== "unseen");
  const basis = representativeMemory(group) ?? prior;
  // A stale duplicate must not bypass today's advancement guard or hide an overdue record.
  const latestAdvancedDay = group.flatMap(member => member.lastAdvancedDay ? [member.lastAdvancedDay] : []).sort().at(-1);
  const scheduled = scheduleReview({ ...prior, status: basis.status, dueAt: basis.dueAt, intervalDays: basis.intervalDays,
    consecutiveKnown: learned.length ? Math.min(...learned.map(member => member.consecutiveKnown)) : prior.consecutiveKnown,
    lastRating: basis.lastRating, lastAdvancedDay: latestAdvancedDay }, rating, now);
  const changed: Record<string, VocabularyMemory> = {};
  for (const member of group.length ? group : [prior]) changed[member.id] = { ...member,
    status: scheduled.status, dueAt: scheduled.dueAt, intervalDays: scheduled.intervalDays, consecutiveKnown: scheduled.consecutiveKnown,
    lastRating: scheduled.lastRating, lastReviewedAt: scheduled.lastReviewedAt, lastAdvancedDay: scheduled.lastAdvancedDay,
    lapses: member.lapses + Number(rating === "forgot"), updatedAt: now };
  const memory = withGroupContexts(changed[item.memoryId], group);
  changed[memory.id] = memory;
  const nextMemories = { ...memories, ...changed };
  // Reconcile the unattempted suffix before positioning a retry: removed legacy
  // duplicates must not count as the four intervening recall cards.
  const reconciled = skipPausedSessionItems({ ...session, cursor: session.cursor + 1 }, nextMemories, now);
  let next = { ...session, queue: [...reconciled.queue], attemptIds: [...session.attemptIds, attemptId] };
  if (rating === "forgot" || rating === "fuzzy") {
    next.difficultIds = Array.from(new Set([...next.difficultIds, memory.id]));
    // Every forgotten/fuzzy response gets another recall, including the last card or a failed retry.
    // The learner may pause and resume this queue; failing twice must not silently complete it.
    const aliases = new Set(group.map(member => member.id));
    if (!next.queue.slice(session.cursor + 1).some(queued => aliases.has(queued.memoryId) && queued.kind === "retry")) {
      const at = rating === "forgot" ? Math.min(next.queue.length, session.cursor + 5) : next.queue.length;
      next.queue.splice(at, 0, { ...item, id: `retry-${next.attemptIds.length}-${memory.id}`, kind: "retry" });
    }
  }
  next = advanceSession(next, now);
  return { session: skipPausedSessionItems(next, nextMemories, now), memory, memories: changed, attempt };
}

export function appendSpelling(session: VocabularySession, memories: Record<string, VocabularyMemory>, now: number): VocabularySession {
  if (session.status !== "completed" || session.cursor < session.queue.length) return session;
  const grouping = memoryGroups(memories);
  const seen = new Set<string>();
  const ids = Array.from(new Set(session.queue.filter(item => item.kind !== "spelling").map(item => item.memoryId))).filter(id => {
    const key = grouping.keys.get(id) ?? id;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
  const extra = ids.filter(id => (grouping.byId.get(id) ?? []).some(memory => memory.spelling.enabled || memory.consecutiveKnown >= 2))
    .filter(id => !session.queue.some(item => (grouping.keys.get(item.memoryId) ?? item.memoryId) === (grouping.keys.get(id) ?? id) && item.kind === "spelling"))
    .map((id, index): VocabularyQueueItem => ({ id: `spelling-${index}-${id}`, memoryId: id, kind: "spelling", contextId: memories[id].primaryContextId }));
  if (!extra.length) return session;
  return { ...session, queue: [...session.queue, ...extra], status: "active", phase: "spelling", runningSince: now, completedAt: undefined, updatedAt: now };
}

export function recordSpellingResult(session: VocabularySession, memories: Record<string, VocabularyMemory>, correct: boolean, now: number) {
  const item = session.queue[session.cursor];
  if (!item || item.kind !== "spelling" || session.status !== "active" || !memories[item.memoryId]) return undefined;
  const attemptId = `${session.id}:${item.id}`;
  if (session.attemptIds.includes(attemptId)) return undefined;
  const old = memories[item.memoryId];
  const memory: VocabularyMemory = { ...old, spelling: { ...old.spelling, attempts: old.spelling.attempts + 1,
    correct: old.spelling.correct + Number(correct), lastAttemptAt: now }, updatedAt: now };
  const attempt: VocabularyAttempt = { id: attemptId, sessionId: session.id, queueItemId: item.id,
    memoryId: memory.id, contextId: item.contextId, kind: "spelling", correct, createdAt: now, wasNew: false };
  return { memory, attempt, session: advanceSession({ ...session, attemptIds: [...session.attemptIds, attemptId] }, now) };
}

export function sessionSummary(session: VocabularySession, attempts: Record<string, VocabularyAttempt>, memories: Record<string, VocabularyMemory>) {
  const events = session.attemptIds.map(id => attempts[id]).filter((attempt): attempt is VocabularyAttempt => Boolean(attempt));
  const count = (rating: VocabularyRating) => events.filter(attempt => attempt.rating === rating).length;
  const distinct = (items: VocabularyAttempt[]) => distinctMemoryKeys(items.map(item => item.memoryId), memories).size;
  const reading = events.filter(attempt => attempt.kind === "reading");
  const nextTimes = Array.from(new Set(reading.map(attempt => attempt.memoryId))).map(id => memories[id]?.dueAt).filter((time): time is number => typeof time === "number");
  return { newWords: distinct(reading.filter(attempt => attempt.wasNew && memories[attempt.memoryId]?.kind === "word")),
    newPhrases: distinct(reading.filter(attempt => attempt.wasNew && memories[attempt.memoryId]?.kind === "phrase")),
    reviews: distinct(reading.filter(attempt => !attempt.wasNew && session.queue.find(item => item.id === attempt.queueItemId)?.kind !== "retry")),
    forgot: count("forgot"), fuzzy: count("fuzzy"), known: count("known"), easy: count("easy"),
    spellingAttempts: events.filter(attempt => attempt.kind === "spelling").length,
    spellingCorrect: events.filter(attempt => attempt.kind === "spelling" && attempt.correct).length,
    difficultIds: [...session.difficultIds], nextDueAt: nextTimes.length ? Math.min(...nextTimes) : undefined };
}
