import type { OccurrenceContext, VocabEntry } from "../data";
import { normalizeMeaning, normalizePartOfSpeech, resolveMemorySense } from "./sense-registry";

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
};

const cache = new WeakMap<VocabEntry, Map<string, VocabularySenseOverviewRow[]>>();
const compare = (left: string, right: string) => left < right ? -1 : left > right ? 1 : 0;

function resolve(entry: VocabEntry, context: OccurrenceContext, sourceId: string, senseId?: string) {
  return resolveMemorySense({
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
 * A source with a broad old gloss remains one broad row; its count is not
 * distributed to each component meaning or each part of speech.
 */
export function buildSenseOverview(entry: VocabEntry, currentSourceId?: string): VocabularySenseOverviewRow[] {
  const cacheKey = currentSourceId ?? "";
  const cached = cache.get(entry)?.get(cacheKey);
  if (cached) return cached;
  const rows = new Map<string, VocabularySenseOverviewRow>();

  function ensure(context: OccurrenceContext, sourceId: string, senseId?: string) {
    const sense = resolve(entry, context, sourceId, senseId);
    const id = rowId(entry, sense, context.meaning);
    let row = rows.get(id) ?? (sense.senseId.startsWith("source:") ? [...rows.values()].find(item =>
      normalizePartOfSpeech(item.partOfSpeech) === sense.partOfSpeech && normalizeMeaning(item.meaning) === normalizeMeaning(context.meaning)) : undefined);
    if (!row) {
      // Keep descriptive POS annotations when they agree with the resolved POS.
      const partOfSpeech = normalizePartOfSpeech(context.partOfSpeech) === sense.partOfSpeech
        ? context.partOfSpeech : sense.partOfSpeech.split("/").map(pos => /^[a-z]+$/.test(pos) ? `${pos}.` : pos).join(" / ");
      row = { id, meaning: context.meaning, partOfSpeech, count: null, current: false, sources: [], ...(context.use ? { use: context.use } : {}) };
      rows.set(id, row);
    }
    return row;
  }

  for (const sense of entry.senseGuide?.senses ?? []) {
    const row = ensure({ expression: entry.headword, partOfSpeech: sense.partOfSpeech, meaning: sense.meaning, use: sense.use }, `guide:${sense.id}`, `reviewed:${sense.id}`);
    row.example = sense.example;
  }

  // Sorting makes labels, source order and unregistered source anchors independent
  // of the order in which article/option indexes happened to be constructed.
  const occurrences = [...entry.occurrences].sort((left, right) => compare(left.sourceId ?? "", right.sourceId ?? "") || compare(left.excerpt, right.excerpt));
  for (const occurrence of occurrences) {
    for (const context of occurrence.contexts ?? []) {
      if (!context.meaning.trim()) continue;
      const row = ensure(context, occurrence.sourceId ?? "unreferenced");
      if (!occurrence.sourceId || row.sources.some(source => source.sourceId === occurrence.sourceId)) continue;
      row.sources.push({ ...context, sourceId: occurrence.sourceId, year: occurrence.year, section: occurrence.section, excerpt: occurrence.excerpt });
      row.count = row.sources.length;
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
    ensure({ expression: entry.headword, ...extra, use: "" }, `other:${index}`);
  }

  const result = [...rows.values()].sort((left, right) => (right.count ?? -1) - (left.count ?? -1) || compare(left.id, right.id));
  const entryCache = cache.get(entry) ?? new Map<string, VocabularySenseOverviewRow[]>();
  entryCache.set(cacheKey, result);
  cache.set(entry, entryCache);
  return result;
}
