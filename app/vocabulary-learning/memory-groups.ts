import type { VocabularyMemory } from "./model";
import { normalizeMeaning, normalizePartOfSpeech, resolveReviewedSense } from "./sense-registry";
import { getReviewedSenseAnnotation } from "./reviewed-senses";

/** A derived identity, never a replacement for a saved memory/attempt ID. */
export function memorySemanticKey(memory: VocabularyMemory) {
  const source = memory.contexts.find(context => context.id === memory.primaryContextId) ?? memory.contexts[0];
  const annotation = memory.kind === "word" && getReviewedSenseAnnotation(memory.termKey, memory.partOfSpeech, memory.meaning, source?.sourceId, source?.expression);
  const reviewed = resolveReviewedSense(memory.termKey, memory.kind, memory.partOfSpeech, memory.meaning, source?.sourceId, source?.expression);
  const sense = annotation ? `annotation:${source?.sourceId ?? memory.id}|${source?.expression ?? ""}`
    : reviewed?.senseId ?? (memory.senseId.startsWith("reviewed:") ? memory.senseId : `meaning:${normalizeMeaning(memory.meaning)}`);
  return [memory.kind, memory.termKey, reviewed?.partOfSpeech ?? normalizePartOfSpeech(memory.partOfSpeech), sense].map(encodeURIComponent).join(":");
}

type Groups = { groups: VocabularyMemory[][]; byId: Map<string, VocabularyMemory[]>; keys: Map<string, string> };
/** Scans saved memories only; no corpus construction during home renders. */
export function memoryGroups(memories: Record<string, VocabularyMemory>): Groups {
  const grouped = new Map<string, VocabularyMemory[]>();
  const keys = new Map<string, string>();
  for (const memory of Object.values(memories)) {
    const key = memorySemanticKey(memory);
    keys.set(memory.id, key);
    const group = grouped.get(key) ?? [];
    group.push(memory); grouped.set(key, group);
  }
  const groups = [...grouped.values()];
  const byId = new Map<string, VocabularyMemory[]>();
  for (const group of groups) for (const memory of group) byId.set(memory.id, group);
  return { groups, byId, keys };
}

export function memoryGroup(memories: Record<string, VocabularyMemory>, id: string) {
  return memoryGroups(memories).byId.get(id) ?? [];
}

export function activeMemory(memory: VocabularyMemory) { return !memory.paused && memory.status !== "paused"; }

/** Existing overdue work wins over future plans and duplicate never-learned records. */
export function representativeMemory(group: VocabularyMemory[]) {
  const active = group.filter(activeMemory);
  const learned = active.filter(memory => memory.status !== "unseen");
  return (learned.length ? learned : active).slice().sort((a, b) => a.dueAt - b.dueAt || a.createdAt - b.createdAt || a.id.localeCompare(b.id))[0];
}

export function withGroupContexts(memory: VocabularyMemory, group: VocabularyMemory[]): VocabularyMemory {
  const ids = new Set(memory.contexts.map(context => context.id));
  const extra = group.flatMap(member => member.contexts).filter(context => {
    if (ids.has(context.id)) return false;
    ids.add(context.id); return true;
  });
  return extra.length ? { ...memory, contexts: [...memory.contexts, ...extra] } : memory;
}

/** The selected ID and its primary source remain intact while other real contexts are available. */
export function vocabularyMemoryView(memories: Record<string, VocabularyMemory>, id: string) {
  const memory = memories[id];
  if (!memory) return undefined;
  const group = memoryGroup(memories, id);
  const view = withGroupContexts(memory, group);
  return !view.spelling.enabled && group.some(member => member.spelling.enabled)
    ? { ...view, spelling: { ...view.spelling, enabled: true } } : view;
}

export function distinctMemoryKeys(ids: Iterable<string>, memories: Record<string, VocabularyMemory>) {
  const keys = memoryGroups(memories).keys;
  return new Set(Array.from(ids, id => keys.get(id) ?? id));
}

/** A scope admits the sense if any of its saved sources belongs to that scope. */
export function memoriesInSemanticScope(memories: Record<string, VocabularyMemory>, ids: Iterable<string>) {
  const grouping = memoryGroups(memories);
  const selected = new Set(Array.from(ids, id => grouping.keys.get(id) ?? id));
  return Object.fromEntries(grouping.groups.filter(group => selected.has(grouping.keys.get(group[0].id)!))
    .flatMap(group => group.map(memory => [memory.id, memory] as const)));
}

/** Pausing/restoring a semantic item applies to its aliases without deleting old records. */
export function setMemoryGroupPaused(memories: Record<string, VocabularyMemory>, id: string, paused: boolean, now: number) {
  const next = { ...memories };
  for (const memory of memoryGroup(memories, id)) next[memory.id] = { ...memory, paused,
    status: paused ? "paused" : memory.lastReviewedAt ? "review" : "unseen", updatedAt: now };
  return next;
}
