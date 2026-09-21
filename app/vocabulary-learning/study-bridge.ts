import { mergeCandidate, type VocabularyCandidate, type VocabularyLearningData, type VocabularyMark } from "./model";

/** Keep vocabulary additions optional in the existing account snapshot. */
export function vocabularyDataFrom(snapshot: VocabularyLearningData): VocabularyLearningData {
  return Object.fromEntries(Object.entries(snapshot).filter(([key]) => [
    "vocabularyMemories", "vocabularyAttempts", "vocabularySessions", "vocabularySettings", "vocabularyQueueState", "vocabularyMigration",
  ].includes(key))) as VocabularyLearningData;
}

/** A deliberate mark enrolls this source/sense, never every sense of the same lemma. */
export function enrollVocabulary(data: VocabularyLearningData, source: VocabularyCandidate, now: number, mark?: VocabularyMark, originKey = source.entry.key): VocabularyLearningData {
  const candidate = { ...source, manual: true, context: { ...source.context, ...(mark ? { mark } : {}) } };
  const memories = data.vocabularyMemories ?? {};
  let memory = mergeCandidate(memories, candidate, now);
  if (mark && memories[memory.id]) {
    memory = { ...memory, paused: false, status: "review",
      dueAt: Math.min(memory.dueAt, now), updatedAt: now };
  }
  const migration = data.vocabularyMigration;
  return { ...data, vocabularyMemories: { ...memories, [memory.id]: memory },
    ...(migration ? { vocabularyMigration: { ...migration,
      migratedKeys: { ...migration.migratedKeys, [originKey]: Array.from(new Set([...(migration.migratedKeys[originKey] ?? []), memory.id])) },
      unresolvedKeys: migration.unresolvedKeys.filter(key => key !== originKey), completedAt: now,
    } } : {}) };
}
