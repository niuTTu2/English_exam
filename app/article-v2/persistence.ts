import { followUpIntents, v2Pages } from "./model";

const record = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown) => typeof v === "string" && Boolean(v.trim());
const time = (v: unknown): v is number => Number.isSafeInteger(v) && Number(v) >= 0;
const fields = ["articleV2Progress", "articleV2Marks", "articleV2FollowUps"] as const;

export function isArticleV2Snapshot(value: Record<string, unknown>): boolean {
  for (const field of fields) {
    const map = value[field];
    if (map === undefined) continue;
    if (!record(map)) return false;
    for (const [id, item] of Object.entries(map)) {
      if (!record(item) || !text(item.articleId) || !time(item.updatedAt)) return false;
      if (field === "articleV2Progress") {
        if (id !== item.articleId || !Object.hasOwn(v2Pages, String(item.page)) || !time(item.elapsedMs)
          || (item.timerStartedAt !== undefined && !time(item.timerStartedAt))) return false;
      } else {
        if (item.id !== id || !text(item.sourceId) || !time(item.createdAt) || item.updatedAt < item.createdAt) return false;
        if (field === "articleV2Marks") {
          if (!["word", "phrase", "sentence", "option"].includes(String(item.kind)) || typeof item.active !== "boolean"
            || !time(item.start) || !time(item.end) || item.end <= item.start) return false;
        } else if (!Object.hasOwn(followUpIntents, String(item.intent)) || !text(item.question) || typeof item.note !== "string") return false;
      }
    }
  }
  return true;
}

/** No deletion API. Marks use an active tombstone; omitted maps/records must survive old clients. */
export function preserveArticleV2Records(previous: Record<string, unknown>, incoming: Record<string, unknown>) {
  const next = { ...incoming };
  for (const field of fields) {
    if (record(previous[field])) next[field] = { ...previous[field], ...(record(incoming[field]) ? incoming[field] : {}) };
  }
  return next;
}
export function isAtomicArticleV2Path(path: string) { return /^articleV2(Progress|Marks|FollowUps)\..+$/.test(path); }
export function hasArticleV2Records(value: Record<string, unknown>) { return fields.some(field => record(value[field]) && Object.keys(value[field]).length > 0); }
