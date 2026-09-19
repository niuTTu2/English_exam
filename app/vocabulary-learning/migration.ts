import { mergeCandidate, type VocabularyCandidate, type VocabularyMemory } from "./model";
import { isVocabularySnapshotFields, type VocabularyMigrationState, type VocabularySnapshotFields } from "./persistence";

export type LegacyVocabularyContext = { articleId: string; sourceId: string; headword: string; label: string; kind: "word" | "phrase" };
export type LegacyVocabularyState = VocabularySnapshotFields & {
  termRatings?: Record<string, "正确" | "模糊" | "错误">;
  reviewSchedule?: Record<string, { dueAt: number; intervalDays: number; repetitions: number }>;
  termContexts?: Record<string, LegacyVocabularyContext[]>;
  marks?: Record<string, string[]>;
  listItems?: Record<string, string[]>;
};
export type LegacyCandidateResolver = (key: string, contexts: LegacyVocabularyContext[]) => VocabularyCandidate[];

function savedContexts(snapshot: LegacyVocabularyState, key: string): LegacyVocabularyContext[] {
  const direct = snapshot.termContexts?.[JSON.stringify(["review", key])] ?? [];
  const result = [...direct];
  for (const [list, members] of Object.entries(snapshot.listItems ?? {})) {
    if (!members.includes(key)) continue;
    for (const context of snapshot.termContexts?.[JSON.stringify(["list", list, key])] ?? []) {
      if (!result.some(item => item.articleId === context.articleId && item.sourceId === context.sourceId && item.kind === context.kind)) result.push(context);
    }
  }
  return result;
}

/** Pure, all-or-nothing migration. The caller backs up the original envelope before writing the result. */
export function migrateLegacyVocabulary<Snapshot extends LegacyVocabularyState>(
  snapshot: Snapshot, resolve: LegacyCandidateResolver, now = Date.now(),
): { state: Snapshot & VocabularySnapshotFields; added: number; unresolvedKeys: string[]; changed: boolean } {
  if (!isVocabularySnapshotFields(snapshot as Record<string, unknown>)) throw new Error("词汇迁移校验失败，原记录已保留，已停止写回。");
  if (!Number.isSafeInteger(now) || now < 0) throw new Error("词汇迁移时间无效，原记录已保留。");
  const previous = snapshot.vocabularyMigration;
  const keys = new Set([
    ...Object.keys(snapshot.termRatings ?? {}), ...Object.keys(snapshot.reviewSchedule ?? {}),
    ...Object.entries(snapshot.marks ?? {}).filter(([, marks]) => marks.length > 0).map(([key]) => key),
    ...Object.values(snapshot.listItems ?? {}).flat(),
  ]);
  const memories = { ...(snapshot.vocabularyMemories ?? {}) };
  const migratedKeys = { ...(previous?.migratedKeys ?? {}) };
  const unresolved = new Set(previous?.unresolvedKeys ?? []);
  let added = 0;
  let changed = !previous;
  for (const key of keys) {
    if (Object.hasOwn(migratedKeys, key)) continue;
    const contexts = savedContexts(snapshot, key);
    const candidates = resolve(key, contexts);
    if (!candidates.length) {
      if (!unresolved.has(key)) changed = true;
      unresolved.add(key);
      continue;
    }
    const grouped: Record<string, VocabularyMemory> = { ...memories };
    const ids: string[] = [];
    const selectedIds: string[] = [];
    const mark = snapshot.marks?.[key]?.find(item => ["完全不会", "有些陌生", "不会搭配", "容易混淆"].includes(item)) as VocabularyCandidate["context"]["mark"];
    for (const candidate of candidates) {
      const saved = contexts.some(context => context.articleId === candidate.context.articleId && context.sourceId === candidate.context.sourceId);
      const memory = mergeCandidate(grouped, { ...candidate, context: { ...candidate.context, ...(saved && mark ? { mark } : {}) }, manual: true }, now);
      grouped[memory.id] = memory;
      if (!ids.includes(memory.id)) ids.push(memory.id);
      if (saved && !selectedIds.includes(memory.id)) selectedIds.push(memory.id);
    }
    const migrateIds = selectedIds.length ? selectedIds : ids.length === 1 ? ids : [];
    if (!migrateIds.length) {
      if (!unresolved.has(key)) changed = true;
      unresolved.add(key);
      continue;
    }
    for (const id of migrateIds) {
      if (!memories[id]) added += 1;
      memories[id] = grouped[id];
    }
    const selectedId = migrateIds[0];
    // Existing sense progress always wins; legacy word-level progress never overwrites it.
    if (!snapshot.vocabularyMemories?.[selectedId]) memories[selectedId] = applyLegacyProgress(memories[selectedId], snapshot, key, now);
    unresolved.delete(key);
    migratedKeys[key] = migrateIds;
    changed = true;
  }
  if (!changed) return { state: snapshot, added: 0, unresolvedKeys: [...unresolved], changed: false };
  const migration: VocabularyMigrationState = { version: 1, migratedKeys, unresolvedKeys: [...unresolved], completedAt: now };
  const state = { ...snapshot, vocabularyMemories: memories, vocabularyMigration: migration };
  if (!isVocabularySnapshotFields(state as Record<string, unknown>)) throw new Error("词汇迁移结果校验失败，原记录已保留，已停止写回。");
  return { state, added, unresolvedKeys: migration.unresolvedKeys, changed: true };
}

/** Explicit user choice resolves ambiguous historical progress without changing other senses. */
export function resolveLegacyVocabularySource<Snapshot extends LegacyVocabularyState>(snapshot: Snapshot, key: string, candidate: VocabularyCandidate, now = Date.now()): Snapshot {
  const migration = snapshot.vocabularyMigration;
  if (!migration?.unresolvedKeys.includes(key)) return snapshot;
  if (!isVocabularySnapshotFields(snapshot as Record<string, unknown>)) throw new Error("词汇记录格式异常，原记录未修改。");
  if (candidate.entry.key !== key) throw new Error("所选语境不属于此旧词条，原记录未修改。");
  const mark = snapshot.marks?.[key]?.find(item => ["完全不会", "有些陌生", "不会搭配", "容易混淆"].includes(item)) as VocabularyCandidate["context"]["mark"];
  const memory = mergeCandidate(snapshot.vocabularyMemories ?? {}, { ...candidate, context: { ...candidate.context, ...(mark ? { mark } : {}) }, manual: true }, now);
  const contextId = candidate.context.id;
  const hasAttempts = Object.values(snapshot.vocabularyAttempts ?? {}).some(attempt => attempt.memoryId === memory.id);
  const nextMemory = hasAttempts ? { ...memory, primaryContextId: contextId, updatedAt: now }
    : applyLegacyProgress({ ...memory, primaryContextId: contextId }, snapshot, key, now);
  const state = { ...snapshot, vocabularyMemories: { ...snapshot.vocabularyMemories, [memory.id]: nextMemory },
    vocabularyMigration: { ...migration, migratedKeys: { ...migration.migratedKeys, [key]: [memory.id] }, unresolvedKeys: migration.unresolvedKeys.filter(item => item !== key), completedAt: now } };
  if (!isVocabularySnapshotFields(state as Record<string, unknown>)) throw new Error("词汇迁移结果校验失败，原记录未修改。");
  return state;
}

function applyLegacyProgress(memory: VocabularyMemory, snapshot: LegacyVocabularyState, key: string, now: number): VocabularyMemory {
  const schedule = snapshot.reviewSchedule?.[key];
  const legacyRating = snapshot.termRatings?.[key];
  const marks = snapshot.marks?.[key] ?? [];
  const lastRating = legacyRating === "正确" ? "known" : legacyRating === "模糊" ? "fuzzy" : legacyRating === "错误" ? "forgot" : undefined;
  return {
    ...memory,
    status: schedule ? "review" : legacyRating || marks.includes("有些陌生") || marks.includes("容易混淆") ? "learning" : "unseen",
    // The original due time is retained, including overdue and future dates.
    dueAt: schedule?.dueAt ?? now,
    intervalDays: schedule?.intervalDays ?? 0,
    // A historical self-rating proves no independent reading streak.
    consecutiveKnown: 0,
    ...(lastRating ? { lastRating } : {}),
    updatedAt: now,
  };
}
