import { DEFAULT_SETTINGS, type VocabularyAttempt, type VocabularyMemory, type VocabularySession, type VocabularySettings } from "./model";

export type VocabularyMigrationState = {
  version: 1;
  migratedKeys: Record<string, string[]>;
  unresolvedKeys: string[];
  completedAt: number;
};

export type VocabularySnapshotFields = {
  vocabularyMemories?: Record<string, VocabularyMemory>;
  vocabularyAttempts?: Record<string, VocabularyAttempt>;
  vocabularySessions?: Record<string, VocabularySession>;
  vocabularySettings?: VocabularySettings;
  vocabularyQueueState?: { activeSessionId?: string; updatedAt: number };
  vocabularyMigration?: VocabularyMigrationState;
};

export type VocabularyData = Required<Omit<VocabularySnapshotFields, "vocabularyMigration">> & Pick<VocabularySnapshotFields, "vocabularyMigration">;

/** Hydration only; corpus construction and migration happen on explicit vocabulary entry. */
export function readVocabularyData(snapshot: VocabularySnapshotFields): VocabularyData {
  if (!isVocabularySnapshotFields(snapshot as Record<string, unknown>)) throw new Error("词汇学习记录格式异常，原记录已保留，已停止写回。");
  return {
    vocabularyMemories: snapshot.vocabularyMemories ?? {}, vocabularyAttempts: snapshot.vocabularyAttempts ?? {},
    vocabularySessions: snapshot.vocabularySessions ?? {}, vocabularySettings: snapshot.vocabularySettings ?? { ...DEFAULT_SETTINGS },
    vocabularyQueueState: snapshot.vocabularyQueueState ?? { updatedAt: 0 },
    ...(snapshot.vocabularyMigration ? { vocabularyMigration: snapshot.vocabularyMigration } : {}),
  };
}

const record = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const time = (value: unknown): value is number => Number.isSafeInteger(value) && Number(value) >= 0;
const nonnegative = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
const identifier = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const rating = (value: unknown) => ["forgot", "fuzzy", "known", "easy"].includes(String(value));
const optional = (value: unknown, valid: (value: unknown) => boolean) => value === undefined || valid(value);
const map = (value: unknown, valid: (entry: unknown) => boolean) => record(value) && Object.entries(value).every(([key, entry]) => valid(entry) && (!record(entry) || entry.id === undefined || entry.id === key));

function isVocabularyContext(value: unknown): boolean {
  return record(value) && [value.id, value.sourceId, value.articleId, value.expression].every(identifier)
    && time(value.year) && ["sentence", "prompt", "option"].includes(String(value.sourceType))
    && optional(value.sentenceId, identifier) && optional(value.questionId, time) && optional(value.optionKey, identifier)
    && optional(value.mark, item => ["完全不会", "有些陌生", "不会搭配", "容易混淆"].includes(String(item)));
}

export function isVocabularyMemory(value: unknown): value is VocabularyMemory {
  if (!record(value)) return false;
  return [value.id, value.termKey, value.senseId, value.headword, value.primaryContextId, value.partOfSpeech, value.meaning].every(identifier)
    && ["word", "phrase"].includes(String(value.kind)) && ["unseen", "learning", "review", "mastered", "paused"].includes(String(value.status))
    && Array.isArray(value.contexts) && value.contexts.length > 0 && value.contexts.every(isVocabularyContext)
    && value.contexts.some(context => record(context) && context.id === value.primaryContextId)
    && [value.dueAt, value.consecutiveKnown, value.lapses, value.createdAt, value.updatedAt].every(time)
    && nonnegative(value.intervalDays) && typeof value.paused === "boolean"
    && optional(value.lastRating, rating) && optional(value.lastReviewedAt, time) && optional(value.lastAdvancedDay, item => typeof item === "string")
    && record(value.spelling) && typeof value.spelling.enabled === "boolean" && time(value.spelling.attempts) && time(value.spelling.correct)
    && value.spelling.correct <= value.spelling.attempts && optional(value.spelling.lastAttemptAt, time);
}

export function isVocabularyAttempt(value: unknown): value is VocabularyAttempt {
  return record(value) && [value.id, value.sessionId, value.queueItemId, value.memoryId, value.contextId].every(identifier)
    && time(value.createdAt) && typeof value.wasNew === "boolean"
    && ((value.kind === "reading" && rating(value.rating)) || (value.kind === "spelling" && typeof value.correct === "boolean"));
}

export function isVocabularySession(value: unknown): value is VocabularySession {
  return record(value) && identifier(value.id) && Array.isArray(value.queue) && value.queue.every(item => record(item)
    && [item.id, item.memoryId, item.contextId].every(identifier) && ["new-word", "new-phrase", "review", "retry", "spelling"].includes(String(item.kind)))
    && new Set(value.queue.map(item => (item as { id: string }).id)).size === value.queue.length
    && time(value.cursor) && value.cursor <= value.queue.length
    && ["front", "answer", "spelling"].includes(String(value.phase)) && ["active", "paused", "completed"].includes(String(value.status))
    && strings(value.attemptIds) && strings(value.difficultIds) && time(value.startedAt) && time(value.updatedAt)
    && optional(value.completedAt, time) && optional(value.revealedAt, time) && optional(value.timeLimitMinutes, item => nonnegative(item) && Number(item) > 0)
    && optional(value.activeElapsedMs, nonnegative) && optional(value.runningSince, time);
}

export function isVocabularySettings(value: unknown): value is VocabularySettings {
  return record(value) && [value.dailyWords, value.dailyPhrases].every(time) && time(value.sessionSize) && value.sessionSize > 0
    && [value.reviewFirst, value.spellingEnabled, value.includeRecognition, value.includeFunctionWords, value.includeNames].every(item => typeof item === "boolean")
    && time(value.updatedAt);
}

export function isVocabularyMigration(value: unknown): value is VocabularyMigrationState {
  return record(value) && value.version === 1 && map(value.migratedKeys, strings) && strings(value.unresolvedKeys) && time(value.completedAt);
}

/** Optional additions to the existing version 1 snapshot; unknown additions are retained. */
export function isVocabularySnapshotFields(value: Record<string, unknown>): boolean {
  return optional(value.vocabularyMemories, item => map(item, isVocabularyMemory))
    && optional(value.vocabularyAttempts, item => map(item, isVocabularyAttempt))
    && optional(value.vocabularySessions, item => map(item, isVocabularySession))
    && optional(value.vocabularySettings, isVocabularySettings)
    && optional(value.vocabularyQueueState, item => record(item) && time(item.updatedAt) && optional(item.activeSessionId, identifier))
    && optional(value.vocabularyMigration, isVocabularyMigration);
}

const legacyFields = new Set([
  "version", "updatedAt", "expanded", "locationAttempts", "practiceAttempts", "practiceReveals", "practiceSessions", "learningReflections", "questionWork",
  "marks", "termRatings", "reviewSchedule", "termContexts", "termNotes", "sentenceNotes", "sentenceMarks", "answers", "translationAnswers", "submittedTranslationTasks",
  "submitted", "activeSection", "selectedYear", "submittedSections", "revealTiming", "timerMode", "lists", "listItems", "reviewFilter",
]);
const vocabularyFields = new Set(["vocabularyMemories", "vocabularyAttempts", "vocabularySessions", "vocabularySettings", "vocabularyQueueState", "vocabularyMigration"]);

/** Spread these fields into the next UI snapshot before the currently understood fields. */
export function unknownStudyFields(snapshot: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(snapshot).filter(([key]) => !legacyFields.has(key) && !vocabularyFields.has(key)));
}

const same = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((item, index) => same(item, b[index]));
  if (!record(a) || !record(b)) return false;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].every(key => same(a[key], b[key]));
};

/** No vocabulary deletion operation exists: pause memories and keep immutable attempts. */
export function preserveVocabularyRecords(previous: Record<string, unknown>, incoming: Record<string, unknown>): Record<string, unknown> {
  const result = { ...unknownStudyFields(previous), ...incoming };
  for (const key of vocabularyFields) {
    if (!Object.hasOwn(incoming, key) && previous[key] !== undefined) result[key] = previous[key];
  }
  for (const key of ["vocabularyMemories", "vocabularyAttempts", "vocabularySessions"] as const) {
    const oldMap = previous[key], nextMap = incoming[key];
    if (!record(oldMap) || !record(nextMap)) continue;
    if (key === "vocabularyAttempts") {
      for (const [id, attempt] of Object.entries(nextMap)) {
        if (oldMap[id] !== undefined && !same(oldMap[id], attempt)) throw new Error("词汇尝试记录冲突，原记录已保留，请先同步再继续。");
      }
    }
    result[key] = { ...oldMap, ...nextMap };
  }
  return result;
}

/** Sessions and schedules are indivisible; recursively merging their fields corrupts queues. */
export function isAtomicVocabularyPath(path: string): boolean {
  return /^vocabulary(Memories|Attempts|Sessions)\..+$/.test(path)
    || path === "vocabularyQueueState" || path === "vocabularySettings" || path === "vocabularyMigration";
}
