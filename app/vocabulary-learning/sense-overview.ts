import type { OccurrenceContext, VocabEntry } from "../data";
import { normalizeMeaning, normalizePartOfSpeech, resolveMemorySense, resolveReviewedSense } from "./sense-registry";
import { getReviewedSenseAnnotation, getReviewedSenseGroups } from "./reviewed-senses";

export type VocabularySenseOverviewSource = OccurrenceContext & {
  sourceId: string;
  year: number;
  section: string;
  excerpt: string;
};

export type VocabularySenseOverviewRow = {
  id: string;
  meaning: string;
  partOfSpeech: string;
  /** Distinct annotated exam sources, never the lemma/family total or teaching examples. */
  count: number | null;
  current: boolean;
  sources: VocabularySenseOverviewSource[];
  use?: string;
  example?: { english: string; chinese: string };
  annotationReason?: string;
  dictionaryDetails?: Array<{ meaning: string; partOfSpeech: string; use?: string; example?: { english: string; chinese: string } }>;
};

const cache = new WeakMap<VocabEntry, Map<string, VocabularySenseOverviewRow[]>>();
const compare = (left: string, right: string) => left < right ? -1 : left > right ? 1 : 0;

function resolve(entry: VocabEntry, context: OccurrenceContext, sourceId: string, senseId?: string) {
  return resolveReviewedSense(entry.key, entry.kind, context.partOfSpeech, context.meaning, sourceId, context.expression) ?? resolveMemorySense({
    entry: { ...entry, partOfSpeech: context.partOfSpeech, contextualMeaning: context.meaning },
    context: { id: `overview:${sourceId}`, sourceId, articleId: "overview", year: 0, sourceType: "sentence", expression: context.expression },
    ...(senseId ? { senseId } : {}),
  });
}

function rowId(entry: VocabEntry, sense: { senseId: string; partOfSpeech: string }, meaning: string) {
  // These are display keys, never persisted memory IDs. Two unregistered uses
  // of the same spelling in one sentence can share a source anchor but differ
  // in meaning; keep both visible instead of allowing the anchor to hide one.
  const discriminator = sense.senseId.startsWith("source:") ? [normalizeMeaning(meaning)] : [];
  return [entry.kind, entry.key, sense.partOfSpeech, sense.senseId, ...discriminator].map(encodeURIComponent).join(":");
}

/** Old dictionary extras may state their own POS, but never inherit the current sentence's POS. */
function extraMeaning(text: string) {
  const tags = text.match(/\b(?:n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g) ?? [];
  return {
    meaning: text.replace(/\b(?:n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g, "").replace(/^\s*[/／]\s*|\s*[/／]\s*$/g, "").trim(),
    partOfSpeech: tags.join(" / "),
  };
}

/**
 * Build only the opened term's display index. This never creates or rewrites a
 * memory: current-sense progress continues to use the existing sense registry.
 * Reviewed composite notes stay available as annotations. An exact source may
 * select one core sense; unclassified notes never lend their count to several senses.
 */
export function buildSenseOverview(entry: VocabEntry, currentSourceId?: string): VocabularySenseOverviewRow[] {
  const cacheKey = currentSourceId ?? "";
  const cached = cache.get(entry)?.get(cacheKey);
  if (cached) return cached;
  const rows = new Map<string, VocabularySenseOverviewRow>();

  function ensure(context: OccurrenceContext, sourceId: string, senseId?: string) {
    const annotation = entry.kind === "word" ? getReviewedSenseAnnotation(entry.key, context.partOfSpeech, context.meaning, sourceId, context.expression) : undefined;
    if (annotation) {
      const id = [entry.kind, entry.key, "annotation", normalizePartOfSpeech(context.partOfSpeech), normalizeMeaning(context.meaning)].map(encodeURIComponent).join(":");
      let row = rows.get(id);
      if (!row) {
        row = { id, meaning: context.meaning, partOfSpeech: context.partOfSpeech, count: null, current: false, sources: [], annotationReason: annotation.reason, ...(context.use ? { use: context.use } : {}) };
        rows.set(id, row);
      }
      return row;
    }
    const sense = resolve(entry, context, sourceId, senseId);
    const id = rowId(entry, sense, context.meaning);
    let row = rows.get(id) ?? (sense.senseId.startsWith("source:") ? [...rows.values()].find(item =>
      normalizePartOfSpeech(item.partOfSpeech) === sense.partOfSpeech && normalizeMeaning(item.meaning) === normalizeMeaning(context.meaning)) : undefined);
    if (!row) {
      // Keep descriptive POS annotations when they agree with the resolved POS.
      const partOfSpeech = !sense.meaning && normalizePartOfSpeech(context.partOfSpeech) === sense.partOfSpeech
        ? context.partOfSpeech : sense.partOfSpeech.split("/").map(pos => /^[a-z]+$/.test(pos) ? `${pos}.` : pos).join(" / ");
      row = { id, meaning: sense.meaning ?? context.meaning, partOfSpeech, count: null, current: false, sources: [], ...(context.use ? { use: context.use } : {}) };
      rows.set(id, row);
    }
    if (!row.use && context.use) row.use = context.use;
    return row;
  }

  // These are editorial identities linked to existing corpus/guide wording, not a second dictionary.
  // Include reviewed meanings from other sources even when this card's old extras omit them.
  for (const group of entry.kind === "word" ? getReviewedSenseGroups(entry.key) : []) {
    const sense = { senseId: `reviewed:${group.id}`, partOfSpeech: normalizePartOfSpeech(group.pos) };
    const id = rowId(entry, sense, group.meaning);
    if (!rows.has(id)) rows.set(id, { id, meaning: group.meaning, partOfSpeech: sense.partOfSpeech.split("/").map(pos => /^[a-z]+$/.test(pos) ? `${pos}.` : pos).join(" / "), count: null, current: false, sources: [] });
  }
  for (const sense of entry.senseGuide?.senses ?? []) {
    const row = ensure({ expression: entry.headword, partOfSpeech: sense.partOfSpeech, meaning: sense.meaning, use: sense.use }, `guide:${sense.id}`, `reviewed:${sense.id}`);
    row.example ??= sense.example;
    (row.dictionaryDetails ??= []).push({ meaning: sense.meaning, partOfSpeech: sense.partOfSpeech, use: sense.use, example: sense.example });
  }

  // Sorting makes labels, source order and unregistered source anchors independent
  // of the order in which article/option indexes happened to be constructed.
  const occurrences = [...entry.occurrences].sort((left, right) => compare(left.sourceId ?? "", right.sourceId ?? "") || compare(left.excerpt, right.excerpt));
  for (const occurrence of occurrences) {
    for (const context of occurrence.contexts ?? []) {
      if (!context.meaning.trim()) continue;
      const row = ensure(context, occurrence.sourceId ?? "unreferenced");
      if (!occurrence.sourceId || row.sources.some(source => source.sourceId === occurrence.sourceId
        && source.expression === context.expression && source.meaning === context.meaning && source.partOfSpeech === context.partOfSpeech && source.use === context.use)) continue;
      row.sources.push({ ...context, sourceId: occurrence.sourceId, year: occurrence.year, section: occurrence.section, excerpt: occurrence.excerpt });
      row.count = new Set(row.sources.map(source => source.sourceId)).size;
    }
  }

  // The current gloss is always represented, including terms without a sense guide
  // or without an annotated occurrence. Merely opening a card does not add a count.
  const currentContext = { expression: entry.sourceExpression ?? entry.display, partOfSpeech: entry.partOfSpeech, meaning: entry.contextualMeaning, use: entry.use };
  ensure(currentContext, currentSourceId ?? "current").current = true;

  for (const [index, text] of entry.otherMeanings.entries()) {
    const extra = extraMeaning(text);
    if (!extra.meaning) continue;
    const normalized = normalizeMeaning(extra.meaning);
    // A missing POS may reuse a uniquely identical existing gloss, but cannot
    // decide between noun/verb homographs or borrow this card's current POS.
    const exact = [...rows.values()].filter(row => normalizeMeaning(row.meaning) === normalized
      && (!extra.partOfSpeech || normalizePartOfSpeech(row.partOfSpeech) === normalizePartOfSpeech(extra.partOfSpeech)));
    if (exact.length === 1) continue;
    if (!extra.partOfSpeech) {
      // An untyped dictionary synonym may join one unambiguous existing sense.
      // Trying each known POS does not borrow the current card's POS or guess
      // between noun/verb homographs with the same Chinese wording.
      const matches = [...rows.values()].filter(row => {
        const context = { expression: entry.headword, meaning: extra.meaning, partOfSpeech: row.partOfSpeech, use: "" };
        const sense = resolve(entry, context, `other:${index}`);
        return !sense.senseId.startsWith("source:") && rowId(entry, sense, extra.meaning) === row.id;
      });
      if (matches.length === 1) continue;
    }
    const row = ensure({ expression: entry.headword, ...extra, use: "" }, `other:${index}`);
    if (row.meaning !== extra.meaning) (row.dictionaryDetails ??= []).push({ meaning: extra.meaning, partOfSpeech: extra.partOfSpeech });
  }

  const result = [...rows.values()].sort((left, right) => (right.count ?? -1) - (left.count ?? -1) || compare(left.id, right.id));
  const entryCache = cache.get(entry) ?? new Map<string, VocabularySenseOverviewRow[]>();
  entryCache.set(cacheKey, result);
  cache.set(entry, entryCache);
  return result;
}
