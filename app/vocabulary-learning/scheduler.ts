import type { VocabularyMemory, VocabularyRating } from "./model";

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60] as const;
export function localDay(now: number) {
  const date = new Date(now);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function startOfDay(now: number) { const date = new Date(now); date.setHours(0, 0, 0, 0); return date.getTime(); }
function afterDays(now: number, days: number) { const date = new Date(now); date.setDate(date.getDate() + days); return date.getTime(); }

export function scheduleReview(memory: VocabularyMemory, rating: VocabularyRating, now: number): VocabularyMemory {
  const updated = { ...memory, lastRating: rating, lastReviewedAt: now, updatedAt: now };
  if (rating === "forgot" || rating === "fuzzy") {
    const shortDue = now + (rating === "forgot" ? 10 : 30) * 60_000;
    return { ...updated, status: "learning", consecutiveKnown: 0,
      lapses: memory.lapses + (rating === "forgot" ? 1 : 0), intervalDays: 0,
      // Explicit failure may shorten a future plan; it never silently postpones an overdue item.
      dueAt: memory.dueAt > now ? Math.min(memory.dueAt, shortDue) : shortDue };
  }
  if (memory.status === "learning" && (memory.lastRating === "forgot" || memory.lastRating === "fuzzy")) {
    // Successfully recalling a same-session retry restores a one-day plan, never the old long interval.
    return { ...updated, status: "review", intervalDays: 1, consecutiveKnown: 1,
      dueAt: afterDays(now, 1), lastAdvancedDay: localDay(now) };
  }
  const canAdvance = memory.lastAdvancedDay !== localDay(now) && (memory.status === "unseen" || memory.dueAt <= now);
  if (!canAdvance) return updated;
  const nextCount = Math.min(REVIEW_INTERVALS.length, memory.consecutiveKnown + (rating === "easy" ? 2 : 1));
  const intervalDays = REVIEW_INTERVALS[nextCount - 1];
  return { ...updated, status: nextCount >= 5 ? "mastered" : "review", consecutiveKnown: nextCount,
    intervalDays, dueAt: afterDays(now, intervalDays), lastAdvancedDay: localDay(now) };
}

export function dueMemories(memories: Record<string, VocabularyMemory>, now: number) {
  return Object.values(memories).filter(memory => !memory.paused && memory.status !== "paused" && memory.status !== "unseen" && memory.dueAt <= now)
    .sort((left, right) => left.dueAt - right.dueAt || left.id.localeCompare(right.id));
}
