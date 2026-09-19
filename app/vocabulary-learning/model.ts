import type { VocabEntry } from "../data";
import type { VocabularyPriority } from "../vocabulary-priority";
import { resolveMemorySense } from "./sense-registry";

export type VocabularyRating = "forgot" | "fuzzy" | "known" | "easy";
export type VocabularyMark = "完全不会" | "有些陌生" | "不会搭配" | "容易混淆";
/** References point to the immutable corpus; never duplicate dictionary entries in user data. */
export type VocabularyContext = {
  id: string; sourceId: string; articleId: string; year: number;
  sourceType: "sentence" | "prompt" | "option";
  sentenceId?: string; questionId?: number; optionKey?: string;
  expression: string; mark?: VocabularyMark;
};
export type VocabularyCandidate = {
  entry: VocabEntry; context: VocabularyContext; priority?: VocabularyPriority;
  senseId?: string; manual?: boolean; text?: string; translation?: string;
};
export type VocabularyMemory = {
  id: string; termKey: string; kind: "word" | "phrase"; senseId: string;
  headword: string; partOfSpeech: string; meaning: string;
  primaryContextId: string; contexts: VocabularyContext[];
  status: "unseen" | "learning" | "review" | "mastered" | "paused";
  dueAt: number; intervalDays: number; consecutiveKnown: number; lapses: number;
  lastRating?: VocabularyRating; lastReviewedAt?: number; lastAdvancedDay?: string;
  spelling: { enabled: boolean; attempts: number; correct: number; lastAttemptAt?: number };
  paused: boolean; createdAt: number; updatedAt: number;
};
export type VocabularyQueueItem = {
  id: string; memoryId: string; kind: "new-word" | "new-phrase" | "review" | "retry" | "spelling"; contextId: string;
};
export type VocabularyAttempt = {
  id: string; sessionId: string; queueItemId: string; memoryId: string; contextId: string;
  kind: "reading" | "spelling"; rating?: VocabularyRating; correct?: boolean;
  createdAt: number; wasNew: boolean;
};
export type VocabularySession = {
  id: string; queue: VocabularyQueueItem[]; cursor: number;
  phase: "front" | "answer" | "spelling"; status: "active" | "paused" | "completed";
  attemptIds: string[]; difficultIds: string[]; startedAt: number; updatedAt: number;
  completedAt?: number; timeLimitMinutes?: number; revealedAt?: number;
  activeElapsedMs?: number; runningSince?: number;
};
export type VocabularySettings = {
  dailyWords: number; dailyPhrases: number; reviewFirst: boolean; sessionSize: number;
  spellingEnabled: boolean; includeRecognition: boolean; includeFunctionWords: boolean; includeNames: boolean; updatedAt: number;
};
export type VocabularyMigrationState = { version: 1; migratedKeys: Record<string, string[]>; unresolvedKeys: string[]; completedAt: number };
export type VocabularyLearningData = {
  vocabularyMemories?: Record<string, VocabularyMemory>;
  vocabularyAttempts?: Record<string, VocabularyAttempt>;
  vocabularySessions?: Record<string, VocabularySession>;
  vocabularySettings?: VocabularySettings;
  vocabularyQueueState?: { activeSessionId?: string; updatedAt: number };
  vocabularyMigration?: VocabularyMigrationState;
};
export const DEFAULT_SETTINGS: VocabularySettings = {
  dailyWords: 10, dailyPhrases: 5, reviewFirst: true, sessionSize: 20,
  spellingEnabled: false, includeRecognition: false, includeFunctionWords: false, includeNames: false, updatedAt: 0,
};
export const DEFAULT_VOCABULARY_SETTINGS = DEFAULT_SETTINGS;
export const RATING_LABELS: Record<VocabularyRating, string> = { forgot: "忘了", fuzzy: "模糊", known: "认识", easy: "太简单" };

export function memoryId(termKey: string, kind: VocabularyMemory["kind"], senseId: string, partOfSpeech: string) {
  return ["vocab", kind, termKey, partOfSpeech, senseId].map(encodeURIComponent).join(":");
}

export function createMemory(candidate: VocabularyCandidate, now: number, existing: VocabularyMemory[] = []): VocabularyMemory {
  const sense = resolveMemorySense(candidate, existing);
  return {
    id: memoryId(candidate.entry.key, candidate.entry.kind, sense.senseId, sense.partOfSpeech),
    termKey: candidate.entry.key, kind: candidate.entry.kind, senseId: sense.senseId,
    headword: candidate.entry.headword, partOfSpeech: sense.partOfSpeech, meaning: candidate.entry.contextualMeaning,
    primaryContextId: candidate.context.id, contexts: [{ ...candidate.context }],
    status: candidate.context.mark === "有些陌生" ? "review" : "unseen", dueAt: now,
    intervalDays: 0, consecutiveKnown: 0, lapses: 0,
    spelling: { enabled: false, attempts: 0, correct: 0 }, paused: false, createdAt: now, updatedAt: now,
  };
}

/** Returns a single upsert; callers apply it atomically alongside attempt/session changes. */
export function mergeCandidate(memories: Record<string, VocabularyMemory>, candidate: VocabularyCandidate, now: number): VocabularyMemory {
  const created = createMemory(candidate, now, Object.values(memories));
  const existing = memories[created.id];
  if (!existing) return created;
  const prior = existing.contexts.find(context => context.id === candidate.context.id);
  if (prior && (!candidate.context.mark || prior.mark === candidate.context.mark)) return existing;
  return { ...existing, contexts: prior
    ? existing.contexts.map(context => context.id === prior.id ? { ...context, mark: candidate.context.mark } : context)
    : [...existing.contexts, { ...candidate.context }], updatedAt: now };
}

export function isCandidateEligible(candidate: VocabularyCandidate, settings: VocabularySettings) {
  if (candidate.manual || candidate.context.mark) return true;
  const priority = candidate.priority?.id ?? "recognition";
  if (priority === "name") return settings.includeNames;
  if (priority === "function") return settings.includeFunctionWords;
  if (priority === "recognition") return settings.includeRecognition;
  return true;
}

export function setMemoryPaused(memory: VocabularyMemory, paused: boolean, now: number): VocabularyMemory {
  return { ...memory, paused, status: paused ? "paused" : memory.lastReviewedAt ? "review" : "unseen", updatedAt: now };
}
