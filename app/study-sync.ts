import { isPracticeAttempt, isPracticeSession, errorCategories } from "./learning-model";
type TimedSnapshot = { updatedAt: number };
export type RemoteStudyState<Snapshot> = { state: Snapshot | null; updatedAt: number | null };
export type LocalStudyState<Snapshot> = { state: Snapshot; base: RemoteStudyState<Snapshot> | null };

export const LEGACY_STORAGE_KEY = "zhenti-judu-study-state-v1";
export const ACTIVE_ACCOUNT_KEY = "zhenti-judu-study-v2:active";

export function studyStorageKey(email: string | null) {
  return `zhenti-judu-study-v2:${email ? `account:${encodeURIComponent(email.trim().toLowerCase())}` : "guest"}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isStudySnapshot(value: unknown): value is TimedSnapshot & Record<string, unknown> {
  if (!isRecord(value) || value.version !== 1 || !Number.isSafeInteger(value.updatedAt) || Number(value.updatedAt) < 0) return false;
  const maps: Record<string, (entry: unknown) => boolean> = {
    practiceAttempts: isPracticeAttempt,
    practiceSessions: isPracticeSession,
    practiceReveals: entry => Number.isSafeInteger(entry) && Number(entry) >= 0,
    learningReflections: entry => isRecord(entry) && typeof entry.translation === "string" && ["", "correct", "unclear", "wrong"].includes(String(entry.translationRating)) && stringArray(entry.errors) && entry.errors.every(key => Object.hasOwn(errorCategories, key)),
    questionWork: entry => isRecord(entry) && ["", "sentence", "adjacent-sentences", "paragraph", "whole-passage"].includes(String(entry.scope)) && stringArray(entry.sentenceIds),
    termNotes: (entry) => typeof entry === "string",
    sentenceNotes: (entry) => typeof entry === "string",
    answers: (entry) => typeof entry === "string",
    translationAnswers: (entry) => typeof entry === "string",
    submittedSections: (entry) => typeof entry === "boolean",
    submittedTranslationTasks: (entry) => typeof entry === "boolean",
    marks: (entry) => stringArray(entry) && entry.every((tag) => ["完全不会", "有些陌生", "不会搭配", "容易混淆"].includes(tag)),
    termRatings: (entry) => ["正确", "模糊", "错误"].includes(String(entry)),
    listItems: stringArray,
    reviewSchedule: (entry) => isRecord(entry) && [entry.dueAt, entry.intervalDays, entry.repetitions].every((number) => typeof number === "number" && Number.isFinite(number) && number >= 0),
    termContexts: (entry) => Array.isArray(entry) && entry.every((context) => isRecord(context) && [context.articleId, context.sourceId, context.headword, context.label].every((text) => typeof text === "string") && ["word", "phrase"].includes(String(context.kind))),
  };
  for (const [key, valid] of Object.entries(maps)) {
    if (value[key] !== undefined && (!isRecord(value[key]) || !Object.values(value[key]).every(valid))) return false;
  }
  for (const key of ["expanded", "sentenceMarks", "lists"]) {
    if (value[key] !== undefined && !stringArray(value[key])) return false;
  }
  return (value.submitted === undefined || typeof value.submitted === "boolean")
    && (value.activeSection === undefined || typeof value.activeSection === "string")
    && (value.selectedYear === undefined || Number.isSafeInteger(value.selectedYear))
    && (value.revealTiming === undefined || ["instant", "sentence", "article"].includes(String(value.revealTiming)))
    && (value.timerMode === undefined || ["up", "down"].includes(String(value.timerMode)))
    && (value.reviewFilter === undefined || ["all", "word", "phrase", "sentence", "question"].includes(String(value.reviewFilter)));
}

export function hasStudyRecords(snapshot: unknown): boolean {
  if (!isRecord(snapshot)) return false;
  const nonempty = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.some(nonempty);
    if (isRecord(value)) return Object.values(value).some(nonempty);
    return typeof value === "string" ? Boolean(value.trim()) : typeof value === "number" || value === true;
  };
  return ["practiceAttempts", "learningReflections", "questionWork", "marks", "termRatings", "reviewSchedule", "termContexts", "termNotes", "sentenceNotes", "sentenceMarks", "answers", "translationAnswers", "submittedTranslationTasks", "submittedSections", "listItems", "submitted"].some((key) => nonempty(snapshot[key]))
    || (Array.isArray(snapshot.lists) && snapshot.lists.some((name) => name !== "本周重点"));
}

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isRecord(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
}

function sameValue(first: unknown, second: unknown) {
  return JSON.stringify(stableValue(first)) === JSON.stringify(stableValue(second));
}

export function sameStudySnapshot(first: TimedSnapshot | null, second: TimedSnapshot | null) {
  return sameValue(first && { ...first, updatedAt: 0 }, second && { ...second, updatedAt: 0 });
}

export function prepareLocalSnapshot<Snapshot extends TimedSnapshot>(
  current: Snapshot, previous: Snapshot | null, initialUpdatedAt = 0, now = Date.now(),
): Snapshot {
  return { ...current, updatedAt: previous ? sameStudySnapshot(current, previous) ? previous.updatedAt : now : initialUpdatedAt };
}

export function reconcileStudyState<Snapshot extends TimedSnapshot>(
  local: LocalStudyState<Snapshot>, remote: RemoteStudyState<Snapshot>,
): { state: Snapshot; conflicts: string[] } {
  if (!remote.state) return { state: local.state, conflicts: [] };
  if (!local.base) return { state: remote.state, conflicts: [] };
  const conflicts: string[] = [];
  function merge(base: unknown, current: unknown, cloud: unknown, path: string): unknown {
    if (sameValue(current, base)) return cloud;
    if (sameValue(cloud, base) || sameValue(current, cloud)) return current;
    if (isRecord(current) && isRecord(cloud) && (base === undefined || base === null || isRecord(base))) {
      const entries = new Set([...Object.keys(isRecord(base) ? base : {}), ...Object.keys(current), ...Object.keys(cloud)]);
      return Object.fromEntries([...entries].map((key) => [key, merge(isRecord(base) ? base[key] : undefined, current[key], cloud[key], path ? `${path}.${key}` : key)]).filter(([, value]) => value !== undefined));
    }
    if (Array.isArray(current) && Array.isArray(cloud) && (base === undefined || Array.isArray(base))) {
      const before = new Set((Array.isArray(base) ? base : []).map((value) => JSON.stringify(stableValue(value))));
      const localSet = new Set(current.map((value) => JSON.stringify(stableValue(value))));
      const remoteSet = new Set(cloud.map((value) => JSON.stringify(stableValue(value))));
      return [...new Set([...localSet, ...remoteSet])].filter((value) => !before.has(value) || (localSet.has(value) && remoteSet.has(value))).map((value) => JSON.parse(value));
    }
    if (["updatedAt", "expanded", "activeSection", "selectedYear", "revealTiming", "timerMode", "reviewFilter"].includes(path)) return current;
    conflicts.push(path);
    return current;
  }
  return { state: merge(local.base.state, local.state, remote.state, "") as Snapshot, conflicts };
}

export async function readRemoteSnapshot<Snapshot extends TimedSnapshot>(
  email: string, fetcher: typeof fetch = fetch,
): Promise<RemoteStudyState<Snapshot>> {
  const response = await fetcher("/api/study-state", { cache: "no-store" });
  if (!response.ok) throw new Error("云端记录暂时无法读取，本机记录已保留，暂不上传以免覆盖。请重试同步。");
  const remote: unknown = await response.json();
  if (!isRecord(remote) || remote.accountEmail !== email || !(remote.state === null || isStudySnapshot(remote.state))
    || !(remote.state === null ? remote.updatedAt === null : Number.isSafeInteger(remote.updatedAt) && Number(remote.updatedAt) >= 0)) {
    throw new Error("云端记录格式或账号异常，已暂停同步；请刷新后重新登录，本机记录不会上传。");
  }
  return { state: remote.state ? { ...remote.state, updatedAt: remote.updatedAt } as Snapshot : null, updatedAt: remote.updatedAt as number | null };
}

export function readLocalStudyState<Snapshot extends TimedSnapshot>(storage: Storage, email: string | null): LocalStudyState<Snapshot> | null {
  const saved = storage.getItem(studyStorageKey(email));
  if (!saved) return null;
  const record: unknown = JSON.parse(saved);
  if (!isRecord(record) || !isStudySnapshot(record.state) || !(record.base === null || (isRecord(record.base)
    && (record.base.state === null || isStudySnapshot(record.base.state))
    && (record.base.state === null ? record.base.updatedAt === null : Number.isSafeInteger(record.base.updatedAt))))) {
    throw new Error("本机记录格式异常，原文件已保留，请先导出备份。");
  }
  return record as LocalStudyState<Snapshot>;
}

export function saveLocalStudyState<Snapshot>(storage: Storage, email: string | null, record: LocalStudyState<Snapshot>) {
  storage.setItem(studyStorageKey(email), JSON.stringify(record));
}

export function preserveLocalStudyState<Snapshot>(storage: Storage, email: string | null, record: LocalStudyState<Snapshot>) {
  const prefix = `${studyStorageKey(email)}:backup:`;
  const serialized = JSON.stringify(record);
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith(prefix) && storage.getItem(key) === serialized) return;
  }
  storage.setItem(`${prefix}${crypto.randomUUID()}`, serialized);
}
