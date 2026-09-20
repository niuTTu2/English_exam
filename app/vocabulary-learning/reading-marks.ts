import type { ArticleV2Mark } from "../article-v2/model";
import type { VocabularyCorpus } from "./corpus";
import { mergeCandidate, type VocabularyLearningData, type VocabularyMemory } from "./model";
import { enrollVocabulary } from "./study-bridge";

type ReadingMarks = { articleV2Marks?: Record<string, ArticleV2Mark> };

/** Exact original range only; sentences/options and unreviewed free phrases are not dictionary entries. */
export function readingMarkCandidate(mark: Pick<ArticleV2Mark, "articleId" | "sourceId" | "kind" | "start" | "end">, corpus: VocabularyCorpus) {
  if (mark.kind !== "word" && mark.kind !== "phrase") return undefined;
  const source = corpus.getSource(mark.sourceId);
  if (!source || source.articleId !== mark.articleId || mark.start < 0 || mark.end > source.text.length || mark.end <= mark.start) return undefined;
  const expression = source.text.slice(mark.start, mark.end);
  if (!/[a-z]/i.test(expression)) return undefined;
  const candidate = corpus.resolveCandidate(expression, mark.kind === "phrase", mark.sourceId, true);
  return candidate && { ...candidate, context: { ...candidate.context, mark: "完全不会" as const } };
}

/** Reuses the existing sense/phrase merge. Never resets a learned or paused memory. */
export function enrollReadingMark<T extends VocabularyLearningData>(data: T, mark: Parameters<typeof readingMarkCandidate>[0], corpus: VocabularyCorpus, now: number, explicit = false): T {
  const candidate = readingMarkCandidate(mark, corpus);
  if (!candidate) return data;
  if (explicit) return { ...data, ...enrollVocabulary(data, candidate, now, "完全不会") };
  const memories = data.vocabularyMemories ?? {};
  const memory = mergeCandidate(memories, candidate, now);
  return memories[memory.id] === memory ? data : { ...data, vocabularyMemories: { ...memories, [memory.id]: memory } };
}

/** Older range marks are picked up on entering learning, including after cloud restore. */
export function enrollSavedReadingMarks<T extends VocabularyLearningData & ReadingMarks>(data: T, corpus: VocabularyCorpus, now: number): T {
  let next = data;
  for (const mark of Object.values(data.articleV2Marks ?? {})) if (mark.active) next = enrollReadingMark(next, mark, corpus, now);
  return next;
}

export function isMarkedVocabulary(memory: VocabularyMemory, legacyMarks: Record<string, string[]>) {
  return Boolean(legacyMarks[memory.termKey]?.length || memory.contexts.some(context => context.mark));
}

/** Undo only this action's untouched enrollment. Keep tombstones and any later learning. */
export function undoReadingEnrollment<T extends VocabularyLearningData & ReadingMarks>(data: T, before: VocabularyLearningData["vocabularyMemories"], after: VocabularyLearningData["vocabularyMemories"], corpus: VocabularyCorpus, now: number): T {
  const memories = { ...data.vocabularyMemories };
  let changed = false;
  for (const [id, enrolled] of Object.entries(after ?? {})) {
    if (before?.[id] === enrolled || JSON.stringify(memories[id]) !== JSON.stringify(enrolled)) continue;
    const stillMarked = Object.values(data.articleV2Marks ?? {}).some(mark => {
      const candidate = mark.active && readingMarkCandidate(mark, corpus);
      return candidate && enrolled.contexts.some(context => context.id === candidate.context.id);
    });
    if (stillMarked) continue;
    // A new memory is paused rather than deleted; old devices cannot resurrect a deletion.
    memories[id] = before?.[id] ? { ...before[id], updatedAt: now } : { ...enrolled, paused: true, status: "paused", updatedAt: now };
    changed = true;
  }
  return changed ? { ...data, vocabularyMemories: memories } : data;
}
