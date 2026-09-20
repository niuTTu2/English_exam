import type { VocabularyCandidate, VocabularyMemory } from "./model";
import { normalizeMeaning, normalizePartOfSpeech } from "./semantic-normalization";
import { getReviewedSemanticAlias } from "./semantic-aliases";
import { getFunctionSemanticAlias } from "./function-semantic-aliases";
import { getContentSemanticAlias } from "./content-semantic-aliases";
import { getReviewedSenseMapping, getReviewedSenseAnnotation } from "./reviewed-senses";

export { normalizeMeaning, normalizePartOfSpeech } from "./semantic-normalization";

/** Reviewed source mappings, not an inference from matching pieces of Chinese. */
const sourceSenses: Record<string, Record<string, [string, string]>> = {
  note: {
    "p3-s10": ["annotation", "n"], "p5-s5": ["tone", "n"],
    "2010-cloze-s5": ["notice", "v"], "2010-p1-s1": ["tone", "n"],
  },
  work: {
    "2010-p1-s1": ["artwork", "n"], "2010-p1-s12": ["artwork", "n"],
    "2010-p1-s17": ["artwork", "n"], "2010-p1-s18": ["artwork", "n"],
    "question-201022-option-D": ["artwork", "n"],
    "2010-p2-s8": ["employment", "n"], "2010-p2-s15": ["employment", "n"],
    "question-201124-option-C": ["employment", "n"],
  },
  company: { "2010-p5-s15": ["companionship", "n"] },
};

/** Exact reviewed aliases let synonymous wording share one stable semantic ID. */
const meaningAliases: Record<string, Array<{ id: string; pos: string; meanings: string[] }>> = {
  note: [
    { id: "tone", pos: "n", meanings: ["基调；意味", "意味；色彩", "基调", "意味", "调子；基调；意味；情感色彩"] },
    { id: "annotation", pos: "n", meanings: ["注释；说明性注释", "注释；附注", "注释"] },
    { id: "record", pos: "n", meanings: ["笔记；记录", "笔记"] },
    { id: "notice", pos: "v", meanings: ["注意到；记录", "注意；留意到", "注意到"] },
  ],
  work: [
    { id: "artwork", pos: "n", meanings: ["艺术作品", "作品", "（艺术）作品"] },
    { id: "employment", pos: "n", meanings: ["工作", "工作；事务", "工作；上班的地方"] },
    { id: "operate", pos: "v", meanings: ["起作用", "奏效", "起作用；奏效"] },
  ],
  company: [
    { id: "business", pos: "n", meanings: ["公司", "公司；企业", "公司；商号"] },
    { id: "companionship", pos: "n", meanings: ["结伴；同伴", "陪伴；同伴", "陪伴"] },
  ],
  momentum: [{ id: "impetus", pos: "n", meanings: ["动力；势头", "势头；动能", "势头", "动力；发展势头"] }],
};

/** Shared semantic identity for display, new cards and non-destructive legacy grouping. */
export function resolveReviewedSense(termKey: string, kind: "word" | "phrase", partOfSpeech: string, meaning: string, sourceId?: string, expression?: string): { senseId: string; partOfSpeech: string; meaning?: string } | undefined {
  if (kind !== "word") return undefined;
  const pos = normalizePartOfSpeech(partOfSpeech);
  const canonical = getReviewedSenseMapping(termKey, partOfSpeech, meaning, sourceId, expression);
  if (canonical) return { senseId: `reviewed:${canonical.id}`, partOfSpeech: normalizePartOfSpeech(canonical.pos), meaning: canonical.meaning };
  if (getReviewedSenseAnnotation(termKey, partOfSpeech, meaning, sourceId, expression)) return undefined;
  const mapped = sourceId ? sourceSenses[termKey]?.[sourceId] : undefined;
  const originalAlias = meaningAliases[termKey]?.find(item => item.meanings.some(alias => normalizeMeaning(alias) === normalizeMeaning(meaning)) && (pos.split("/").includes(item.pos) || mapped));
  if (mapped || originalAlias) return { senseId: `reviewed:${mapped?.[0] ?? originalAlias!.id}`, partOfSpeech: mapped?.[1] ?? originalAlias!.pos };
  const alias = getReviewedSemanticAlias(termKey, pos, meaning)
    ?? getFunctionSemanticAlias(termKey, pos, meaning)
    ?? getContentSemanticAlias(termKey, pos, meaning);
  return alias ? { senseId: `reviewed:${alias.id}`, partOfSpeech: alias.pos, meaning: alias.meaning } : undefined;
}

export function resolveMemorySense(candidate: VocabularyCandidate, existing: VocabularyMemory[] = []) {
  const entry = candidate.entry;
  let pos = normalizePartOfSpeech(entry.partOfSpeech);
  const reviewed = resolveReviewedSense(entry.key, entry.kind, entry.partOfSpeech, entry.contextualMeaning, candidate.context.sourceId, candidate.context.expression);
  if (reviewed) pos = reviewed.partOfSpeech;
  // Once a source belongs to a saved sense, minor editorial wording changes cannot rename its key.
  // Old word context IDs omit the inflected expression. Two forms in the same
  // sentence (patents/patented, health/healthy) may therefore have the same ID.
  // Keep historical IDs intact, but never reuse one merely because that ID matches.
  const saved = existing.find(memory => memory.termKey === entry.key && memory.kind === entry.kind && memory.contexts.some(context =>
    context.id === candidate.context.id && context.expression.normalize("NFKC").toLowerCase() === candidate.context.expression.normalize("NFKC").toLowerCase()));
  if (saved) return { senseId: saved.senseId, partOfSpeech: saved.partOfSpeech };
  if (candidate.senseId) return { senseId: candidate.senseId, partOfSpeech: pos };
  if (reviewed) {
    // Reuse a saved identity for equivalent wording, without renaming or deleting old records.
    const prior = existing.filter(memory => memory.termKey === entry.key && memory.kind === entry.kind && (
      memory.senseId === reviewed.senseId && memory.partOfSpeech === pos ||
      (() => {
        const context = memory.contexts.find(item => item.id === memory.primaryContextId) ?? memory.contexts[0];
        const resolved = resolveReviewedSense(memory.termKey, memory.kind, memory.partOfSpeech, memory.meaning, context?.sourceId, context?.expression);
        return resolved?.senseId === reviewed.senseId && resolved?.partOfSpeech === pos;
      })()
    )).sort((left, right) => left.createdAt - right.createdAt || left.id.localeCompare(right.id))[0];
    if (prior) return { senseId: prior.senseId, partOfSpeech: prior.partOfSpeech };
    return reviewed;
  }
  const same = existing.find(memory => memory.termKey === entry.key && memory.kind === entry.kind && memory.partOfSpeech === pos && normalizeMeaning(memory.meaning) === normalizeMeaning(entry.contextualMeaning));
  if (same) return { senseId: same.senseId, partOfSpeech: same.partOfSpeech };
  // Reuse a dictionary sense only for an unambiguous exact set of its reviewed synonyms.
  // Substring similarity is deliberately insufficient (e.g. “国家” versus “国家的”).
  const meaningParts = normalizeMeaning(entry.contextualMeaning).split(";");
  const guideMatches = entry.kind === "word" ? (entry.senseGuide?.senses ?? []).filter(sense => {
    const guidePos = normalizePartOfSpeech(sense.partOfSpeech);
    const synonyms = normalizeMeaning(sense.meaning).split(";");
    return pos.split("/").some(part => guidePos.split("/").includes(part)) && meaningParts.every(part => synonyms.includes(part));
  }) : [];
  if (guideMatches.length === 1) {
    const guide = guideMatches[0];
    const matchingPos = pos.split("/").filter(part => normalizePartOfSpeech(guide.partOfSpeech).split("/").includes(part)).join("/");
    return { senseId: `reviewed:${guide.id}`, partOfSpeech: matchingPos };
  }
  // Exact same meaning/part of speech can reuse a corpus source anchor. This is independent
  // of candidate order, and Chinese wording is never a persistent primary key.
  const anchors = entry.occurrences.flatMap(occurrence => !occurrence.sourceId ? [] : (occurrence.contexts ?? []).filter(context =>
    normalizePartOfSpeech(context.partOfSpeech) === pos && normalizeMeaning(context.meaning) === normalizeMeaning(entry.contextualMeaning))
    .map(context => `${occurrence.sourceId}|${context.expression.toLowerCase()}`));
  anchors.push(`${candidate.context.sourceId}|${candidate.context.expression.toLowerCase()}`);
  return { senseId: `source:${anchors.sort()[0]}`, partOfSpeech: pos };
}
