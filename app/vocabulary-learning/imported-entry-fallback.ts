import type { VocabEntry } from "../data";

/** A bare lemma may lack an old dictionary entry while its inflected form is already imported. */
export function importedEntryContext(occurrences: VocabEntry["occurrences"], sourceId?: string) {
  for (const occurrence of occurrences) {
    if (sourceId && occurrence.sourceId !== sourceId) continue;
    const context = occurrence.contexts?.find(item => item.meaning.trim() && item.partOfSpeech.trim());
    if (context) return context;
  }
  return undefined;
}
