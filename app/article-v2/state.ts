import type { ArticleV2Data, ArticleV2Mark, ArticleV2Progress, V2Page } from "./model";
import type { PracticeAttempts, PracticeTask } from "../learning-model";
import { makePracticeAttempt, taskKey } from "../learning-model";
import type { VocabularyLearningData } from "../vocabulary-learning/model";

/** The existing snapshot remains authoritative; optional maps only add V2 personal records. */
export type V2StudySnapshot = ArticleV2Data & VocabularyLearningData & {
  answers: Record<number, string>; submittedSections?: Record<string, boolean>;
  practiceAttempts: PracticeAttempts; termNotes: Record<string, string>; sentenceNotes: Record<string, string>;
  lists: string[]; listItems: Record<string, string[]>; marks: Record<string, string[]>;
};
export type V2Update = (current: V2StudySnapshot) => V2StudySnapshot;
export function progressFor(data: ArticleV2Data, articleId: string): ArticleV2Progress {
  return data.articleV2Progress?.[articleId] ?? { articleId, page: "exam", elapsedMs: 0, updatedAt: 0 };
}
export function elapsed(progress: ArticleV2Progress, now: number) {
  return progress.elapsedMs + (progress.timerStartedAt === undefined ? 0 : Math.max(0, now - progress.timerStartedAt));
}
export function pauseTimer(progress: ArticleV2Progress, now: number): ArticleV2Progress {
  const paused = { ...progress, elapsedMs: elapsed(progress, now), updatedAt: now };
  delete paused.timerStartedAt;
  return paused;
}
export function changePage(data: V2StudySnapshot, articleId: string, page: V2Page, now: number): V2StudySnapshot {
  const progress = pauseTimer(progressFor(data, articleId), now);
  return { ...data, articleV2Progress: { ...data.articleV2Progress, [articleId]: { ...progress, page } } };
}
export function markId(mark: Pick<ArticleV2Mark, "articleId" | "sourceId" | "kind" | "start" | "end">) {
  return [mark.articleId, mark.sourceId, mark.kind, mark.start, mark.end].map(v => encodeURIComponent(String(v))).join(":");
}
export type SourceMarkInput = Omit<ArticleV2Mark, "id" | "createdAt" | "updatedAt" | "active">;
export function setSourceMark(data: V2StudySnapshot, input: SourceMarkInput, active: boolean, now: number): V2StudySnapshot {
  const id = markId(input), previous = data.articleV2Marks?.[id];
  if (previous?.active === active) return data;
  return { ...data, articleV2Marks: { ...data.articleV2Marks, [id]: { ...input, id, active, createdAt: previous?.createdAt ?? now, updatedAt: now } } };
}
export function toggleSourceMark(data: V2StudySnapshot, input: SourceMarkInput, now: number): V2StudySnapshot {
  return setSourceMark(data, input, !data.articleV2Marks?.[markId(input)]?.active, now);
}
export function undoSourceMark(data: V2StudySnapshot, input: SourceMarkInput, expected: Pick<ArticleV2Mark, "updatedAt" | "active">, previousActive: boolean, now: number): V2StudySnapshot {
  const saved = data.articleV2Marks?.[markId(input)];
  if (saved?.updatedAt !== expected.updatedAt || saved.active !== expected.active) throw new Error("这处标记已发生其他修改，未撤销，请在已标记列表中核对。");
  return setSourceMark(data, input, previousActive, Math.max(now, expected.updatedAt + 1));
}
/** V2 checks happen after explanation: preserve events, but never claim independent mastery. */
export function recordV2Check(data: V2StudySnapshot, articleId: string, sourceId: string, task: PracticeTask, answer: string, id: string, now: number): V2StudySnapshot {
  const attempt = makePracticeAttempt({ id, articleId, sentenceId: sourceId, task, answer, at: now,
    session: { id: `v2-check-${id}`, startedAt: now, lastActiveAt: now,
      hints: [{ id: `v2-explanation-${id}`, type: "previous-answer", source: sourceId, at: now, taskKeys: [taskKey(sourceId, task)] }] } });
  return { ...data, practiceAttempts: { ...data.practiceAttempts, [id]: attempt } };
}
