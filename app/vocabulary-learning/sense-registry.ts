import type { VocabularyCandidate, VocabularyMemory } from "./model";

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

export function normalizeMeaning(meaning: string) {
  return meaning.normalize("NFKC").replace(/\s/g, "").split(/[;；]/).filter(Boolean).sort().join(";");
}

export function normalizePartOfSpeech(pos: string) {
  const matches = Array.from(pos.matchAll(/\b(n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g), match => match[1] === "vt" || match[1] === "vi" ? "v" : match[1]);
  return matches.length ? Array.from(new Set(matches)).sort().join("/") : pos.replace(/[（(].*?[）)]/g, "").trim();
}

export function resolveMemorySense(candidate: VocabularyCandidate, existing: VocabularyMemory[] = []) {
  const entry = candidate.entry;
  let pos = normalizePartOfSpeech(entry.partOfSpeech);
  const mapped = entry.kind === "word" ? sourceSenses[entry.key]?.[candidate.context.sourceId] : undefined;
  const alias = entry.kind === "word" ? meaningAliases[entry.key]?.find(item => item.meanings.some(meaning => normalizeMeaning(meaning) === normalizeMeaning(entry.contextualMeaning)) && (pos.split("/").includes(item.pos) || mapped)) : undefined;
  if (mapped) pos = mapped[1];
  else if (alias) pos = alias.pos;
  // Once a source belongs to a saved sense, minor editorial wording changes cannot rename its key.
  const saved = existing.find(memory => memory.termKey === entry.key && memory.kind === entry.kind && memory.contexts.some(context => context.id === candidate.context.id));
  if (saved) return { senseId: saved.senseId, partOfSpeech: saved.partOfSpeech };
  if (candidate.senseId) return { senseId: candidate.senseId, partOfSpeech: pos };
  if (mapped || alias) return { senseId: `reviewed:${mapped?.[0] ?? alias!.id}`, partOfSpeech: pos };
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
