import { memoryGroups, representativeMemory, withGroupContexts } from "./memory-groups";
import type { VocabularyAttempt, VocabularyMemory } from "./model";
import { localDay } from "./scheduler";

export type DatedWordState = "pending" | "learned";
export type DatedWord = { memory: VocabularyMemory; state: DatedWordState; timestamp: number };
export type DatedWordGroup = { day: string; label: string; items: DatedWord[] };

function firstLearnedAt(group: VocabularyMemory[], firstAttempts: Map<string, number>) {
  const attemptTimes = group.flatMap(memory => firstAttempts.has(memory.id) ? [firstAttempts.get(memory.id)!] : []);
  const reviewedTimes = group.flatMap(memory => typeof memory.lastReviewedAt === "number" ? [memory.lastReviewedAt] : []);
  if (attemptTimes.length || reviewedTimes.length) return Math.min(...attemptTimes, ...reviewedTimes);
  // Old word-level records did not save a review timestamp. A retained rating is
  // proof that the word was learned; updatedAt is the only honest recoverable date.
  const legacyRated = group.filter(memory => memory.lastRating).map(memory => memory.updatedAt);
  return legacyRated.length ? Math.min(...legacyRated) : undefined;
}

export function datedWords(
  memories: Record<string, VocabularyMemory>,
  attempts: Record<string, VocabularyAttempt>,
): DatedWord[] {
  const firstAttempts = new Map<string, number>();
  for (const attempt of Object.values(attempts)) {
    if (attempt.kind !== "reading") continue;
    firstAttempts.set(attempt.memoryId, Math.min(firstAttempts.get(attempt.memoryId) ?? attempt.createdAt, attempt.createdAt));
  }
  return memoryGroups(memories).groups.flatMap(group => {
    if (!group.some(memory => memory.kind === "word")) return [];
    const representative = representativeMemory(group)
      ?? group.slice().sort((left, right) => left.createdAt - right.createdAt || left.id.localeCompare(right.id))[0];
    if (!representative) return [];
    const view = withGroupContexts(representative, group);
    const memory = !view.spelling.enabled && group.some(member => member.spelling.enabled)
      ? { ...view, spelling: { ...view.spelling, enabled: true } } : view;
    const learnedAt = firstLearnedAt(group, firstAttempts);
    return [{ memory, state: learnedAt === undefined ? "pending" as const : "learned" as const,
      timestamp: learnedAt ?? Math.min(...group.map(item => item.createdAt)) }];
  }).sort((left, right) => right.timestamp - left.timestamp || left.memory.id.localeCompare(right.memory.id));
}

export function vocabularyDateLabel(timestamp: number, now: number) {
  const date = new Date(timestamp);
  const day = localDay(timestamp);
  if (day === localDay(now)) return `今天 · ${date.getMonth() + 1}月${date.getDate()}日`;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function groupDatedWords(items: DatedWord[], now: number): DatedWordGroup[] {
  const groups = new Map<string, DatedWord[]>();
  for (const item of items) {
    const day = localDay(item.timestamp);
    const group = groups.get(day) ?? [];
    group.push(item);
    groups.set(day, group);
  }
  return [...groups.entries()].sort(([left], [right]) => right.localeCompare(left))
    .map(([day, grouped]) => ({ day, label: vocabularyDateLabel(grouped[0].timestamp, now), items: grouped }));
}
