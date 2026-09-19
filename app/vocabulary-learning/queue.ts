import { DEFAULT_SETTINGS, isCandidateEligible, mergeCandidate, type VocabularyAttempt, type VocabularyCandidate, type VocabularyMemory, type VocabularyQueueItem, type VocabularySettings } from "./model";
import { dueMemories, localDay } from "./scheduler";

export type VocabularyQueueMode = "new" | "review" | "mixed";
export type VocabularyQueueOptions = { size?: number; timeLimitMinutes?: number; attempts?: Record<string, VocabularyAttempt>; memoryIds?: string[] };

export function nextContextId(memory: VocabularyMemory, attempts: Record<string, VocabularyAttempt> = {}) {
  const prior = Object.values(attempts).filter(attempt => attempt.memoryId === memory.id && attempt.kind === "reading")
    .sort((left, right) => right.createdAt - left.createdAt || right.id.localeCompare(left.id))[0];
  const index = memory.contexts.findIndex(context => context.id === (prior?.contextId ?? memory.primaryContextId));
  return memory.contexts[prior ? (index + 1) % memory.contexts.length : Math.max(index, 0)]?.id ?? memory.primaryContextId;
}

export function createLearningQueue(
  original: Record<string, VocabularyMemory>, candidates: VocabularyCandidate[], rawSettings: VocabularySettings,
  now: number, mode: VocabularyQueueMode = "mixed", options: VocabularyQueueOptions = {},
) {
  const settings = { ...DEFAULT_SETTINGS, ...rawSettings };
  const attempts = options.attempts ?? {};
  const memories = { ...original };
  const admitted = new Map<string, number>();
  // Build only when explicitly starting a session, never during a home render.
  for (const candidate of candidates) {
    if (!isCandidateEligible(candidate, settings)) continue;
    const memory = mergeCandidate(memories, candidate, now);
    memories[memory.id] = memory;
    const ranks: Record<string, number> = { core: 1, sense: 2, structure: 3 };
    const rank = candidate.manual || candidate.context.mark ? 0 : (ranks[candidate.priority?.id ?? "recognition"] ?? 4);
    admitted.set(memory.id, Math.min(admitted.get(memory.id) ?? rank, rank));
  }
  const permitted = options.memoryIds ? new Set([...options.memoryIds, ...admitted.keys()]) : undefined;
  const reviews = dueMemories(memories, now).filter(memory => !permitted || permitted.has(memory.id));
  const newItems = Object.values(memories).filter(memory => memory.status === "unseen" && !memory.paused && (!permitted || permitted.has(memory.id)))
    .sort((left, right) => (admitted.get(left.id) ?? 0) - (admitted.get(right.id) ?? 0) || left.createdAt - right.createdAt || left.id.localeCompare(right.id));
  const todayNewIds = new Set(Object.values(attempts).filter(attempt => attempt.kind === "reading" && attempt.wasNew && localDay(attempt.createdAt) === localDay(now)).map(attempt => attempt.memoryId));
  const learnedWords = [...todayNewIds].filter(id => memories[id]?.kind === "word").length;
  const learnedPhrases = [...todayNewIds].filter(id => memories[id]?.kind === "phrase").length;
  const words = newItems.filter(memory => memory.kind === "word").slice(0, Math.max(0, settings.dailyWords - learnedWords));
  const phrases = newItems.filter(memory => memory.kind === "phrase").slice(0, Math.max(0, settings.dailyPhrases - learnedPhrases));
  const withReviews = mode !== "new" || settings.reviewFirst;
  const ordered = mode === "review" ? reviews : withReviews ? [...reviews, ...words, ...phrases] : [...words, ...phrases];
  const size = Math.max(1, Math.min(100, options.size ?? settings.sessionSize));
  const selected = ordered.slice(0, size);
  const queue: VocabularyQueueItem[] = selected.map((memory, index) => ({
    id: `card-${index}-${memory.id}`, memoryId: memory.id,
    kind: memory.status === "unseen" ? memory.kind === "word" ? "new-word" : "new-phrase" : "review",
    contextId: nextContextId(memory, attempts),
  }));
  // Persist only existing memories and the items actually selected, not thousands of untouched candidates.
  const persisted = { ...original };
  for (const memory of selected) persisted[memory.id] = memory;
  for (const id of Object.keys(original)) if (memories[id] !== original[id]) persisted[id] = memories[id];
  return { queue, memories: persisted };
}

export function vocabularyTodayStats(memories: Record<string, VocabularyMemory>, attempts: Record<string, VocabularyAttempt>, now: number) {
  const due = dueMemories(memories, now);
  const today = Object.values(attempts).filter(attempt => localDay(attempt.createdAt) === localDay(now));
  return { dueWords: due.filter(memory => memory.kind === "word").length,
    duePhrases: due.filter(memory => memory.kind === "phrase").length,
    overdue: due.filter(memory => localDay(memory.dueAt) < localDay(now)).length,
    completed: new Set(today.filter(attempt => attempt.kind === "reading").map(attempt => attempt.memoryId)).size,
    newWords: new Set(today.filter(attempt => attempt.wasNew && memories[attempt.memoryId]?.kind === "word").map(attempt => attempt.memoryId)).size,
    newPhrases: new Set(today.filter(attempt => attempt.wasNew && memories[attempt.memoryId]?.kind === "phrase").map(attempt => attempt.memoryId)).size,
    estimatedMinutes: Math.ceil(due.length * 20 / 60) };
}
