import { mergeCandidate, type VocabularyCandidate, type VocabularyMemory } from "./model";
import { memorySemanticKey } from "./memory-groups";

type SavedContext = { articleId: string; sourceId: string; label: string; kind: "word" | "phrase" };
const compare = (left: string, right: string) => left < right ? -1 : left > right ? 1 : 0;
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();

/**
 * Pick one practice sense for a legacy word-level record. An available saved
 * expression wins; otherwise use the sense with the most distinct real sources.
 * This selects a learning example, not an assertion about the user's past sense.
 */
export function selectLegacyVocabularyCandidates<Candidate extends VocabularyCandidate>(
  candidates: readonly Candidate[], savedContexts: readonly SavedContext[] = [], existing: Record<string, VocabularyMemory> = {},
): Candidate[] {
  const ordered = [...new Map(candidates.map(candidate => [candidate.context.id, candidate])).values()]
    .sort((left, right) => compare(left.context.sourceId, right.context.sourceId) || compare(left.context.id, right.context.id));
  // Group with the same stable-sense rules used by real enrollment. These temporary
  // memories never leave this function: no timestamps, source choices, or progress
  // are written back, and mergeCandidate does not mutate the supplied memories.
  const staged = { ...existing };
  const groups = new Map<string, { senseKey: string; candidates: Candidate[]; sources: Set<string> }>();
  const memberships = new Map<string, string>();
  for (const candidate of ordered) {
    const memory = mergeCandidate(staged, candidate, 0);
    staged[memory.id] = memory;
    const key = memorySemanticKey(memory);
    const group = groups.get(key) ?? { senseKey: key, candidates: [], sources: new Set<string>() };
    group.candidates.push(candidate);
    group.sources.add(candidate.context.sourceId);
    groups.set(key, group);
    memberships.set(candidate.context.id, key);
  }
  const saved = savedContexts.map(context => {
    const atSource = ordered.filter(candidate => candidate.context.articleId === context.articleId
      && candidate.context.sourceId === context.sourceId && candidate.entry.kind === context.kind);
    // An old label may use the lemma. A unique real occurrence is still a valid
    // source, but different phrases sharing one structural key must stay separate.
    return atSource.find(candidate => normalize(candidate.context.expression) === normalize(context.label))
      ?? (atSource.length === 1 ? atSource[0] : undefined);
  }).find(Boolean);
  const selected = saved ? groups.get(memberships.get(saved.context.id)!) : [...groups.values()]
    .sort((left, right) => right.sources.size - left.sources.size || compare(left.senseKey, right.senseKey)
      || compare(left.candidates[0].context.id, right.candidates[0].context.id))[0];
  if (!selected) return [];
  return saved ? [saved, ...selected.candidates.filter(candidate => candidate.context.id !== saved.context.id)] : selected.candidates;
}
