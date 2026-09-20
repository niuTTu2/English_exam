import type { ArticleContent, QuestionOptionKey, SentenceAnalysis, VocabEntry } from "../data";
import { getPhraseKnowledge } from "../knowledge-base";
import { canonicalLemma, getLexicalGuide, type LexicalContext } from "../lexicon";
import { vocabularyPriority, type VocabularyPriority } from "../vocabulary-priority";
import type { VocabularyCandidate, VocabularyContext, VocabularyMemory } from "./model";
import { selectLegacyVocabularyCandidates } from "./legacy-selection";

/** Existing corpus references are injected by StudyApp; no second lexicon is created. */
export type CorpusSourceReference = {
  id: string;
  sentenceId?: string;
  article: ArticleContent;
  text: string;
  section: string;
};

export type LegacyVocabularyContext = {
  articleId: string;
  sourceId: string;
  headword: string;
  label: string;
  kind: "word" | "phrase";
};

export type VocabularySource = {
  sourceId: string;
  articleId: string;
  year: number;
  articleLabel: string;
  sourceLabel: string;
  sourceType: VocabularyContext["sourceType"];
  sentenceId?: string;
  questionId?: number;
  optionKey?: string;
  text: string;
  translation?: string;
};

/** Display-only content. Never serialize this object into a memory or a session. */
export type ResolvedVocabularyCandidate = VocabularyCandidate & {
  text: string;
  translation?: string;
  sourceLabel: string;
  articleLabel: string;
  canonicalInstance?: string;
};

export type VocabularyCorpusScope = {
  kind: "article" | "year" | "all" | "marked" | "list";
  articleId?: string;
  year?: number;
  keys?: string[];
  /** Explicitly selected senses, when the scope comes from new learning records. */
  contexts?: VocabularyContext[];
  /** Legacy keys must retain their selected source rather than recruiting every sense. */
  savedContexts?: Record<string, LegacyVocabularyContext[]>;
};

export type VocabularyCandidateOptions = {
  includeRecognition?: boolean;
  includeFunctionWords?: boolean;
  includeProperNames?: boolean;
  limit?: number;
  /** Applied lazily, so a caller can skip learned senses without materializing the corpus. */
  accept?: (candidate: ResolvedVocabularyCandidate) => boolean;
};

export type VocabularyCorpusBridge = {
  sources: readonly CorpusSourceReference[];
  phraseAnnotations: readonly { label: string; sourceId: string; patternKey?: string }[];
  resolveEntry: (label: string, isPhrase?: boolean, sourceId?: string) => VocabEntry;
  findTermContexts: (key: string) => LegacyVocabularyContext[];
  tokenizeWords: (text: string) => string[];
};

const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[‘’]/g, "'").replace(/[‐‑‒–—]/g, "-").replace(/\s+/g, " ").trim();
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function actualExpression(text: string, label: string) {
  const pattern = escapeRegex(label.trim()).replace(/['’‘]/g, "['’‘]").replace(/\s+/g, "\\s+");
  if (!pattern) return undefined;
  return text.match(new RegExp(`(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`, "iu"))?.[0];
}

function lexicalContext(source: CorpusSourceReference): LexicalContext {
  return { articleId: source.article.id as LexicalContext["articleId"], sourceId: source.id, sentenceId: source.sentenceId };
}

/** An editorial recommendation is reused; unspecified entries remain opt-in. */
function priorityFor(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm" | "partOfSpeech">, source: CorpusSourceReference): VocabularyPriority {
  if (source.article.experienceVersion === 2) {
    const focus = source.article.vocabularyFocus?.find(f => f.sourceId === source.id && f.kind === entry.kind && normalize(f.expression) === normalize(entry.display));
    if (focus) {
      const categories = focus.categories;
      const id = categories.includes("recognition") ? "recognition" : categories.includes("sense") ? "sense" : entry.kind === "phrase" ? "structure" : "core";
      return { id, label: { recognition: "识别即可", sense: "熟词生义", structure: "必会固定搭配", core: "本篇核心词" }[id], reason: "来自本篇精审词汇分类；保留当前出处与语境义。", recommendedReview: id !== "recognition" };
    }
  }
  const recommendation = vocabularyPriority(entry, source.id, source.article.id);
  // Some older articles have no priority table, but their reviewed POS still identifies names.
  if (/proper\s*n\.|专有名词|专名|人名|地名/.test(entry.partOfSpeech)) {
    return { id: "name", label: "背景专名 · 识别即可", reason: "先在原句中识别名称及其角色；可以自行加入学习。", recommendedReview: false };
  }
  if (recommendation) return recommendation;
  if (/^(?:prep\.|pron\.|conj\.|art\.|det\.|aux\.)/.test(entry.partOfSpeech)) {
    return { id: "function", label: "功能词 · 看句法作用", reason: "结合原句理解连接、指代和限定关系；可以自行加入学习。", recommendedReview: false };
  }
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先理解当前语境，再按需要加入学习。", recommendedReview: false };
}

export function vocabularyCandidateAllowed(priority: VocabularyPriority | undefined, options: VocabularyCandidateOptions = {}, manual = false) {
  if (manual) return true;
  switch (priority?.id) {
    case "name": return Boolean(options.includeProperNames);
    case "function": return Boolean(options.includeFunctionWords);
    case "recognition": return Boolean(options.includeRecognition);
    case "core": case "sense": case "structure": return true;
    default: return Boolean(options.includeRecognition);
  }
}

export function createVocabularyCorpus(bridge: VocabularyCorpusBridge) {
  // These indexes are built on first use, never on a vocabulary-home render.
  let sourceIndex: Map<string, CorpusSourceReference> | undefined;
  let articleIndex: Map<string, CorpusSourceReference[]> | undefined;
  let phraseIndex: Map<string, string[]> | undefined;
  const sourceCache = new Map<string, VocabularySource>();
  const candidateCache = new Map<string, ResolvedVocabularyCandidate | null>();
  const termCache = new Map<string, ResolvedVocabularyCandidate[]>();

  function references() {
    if (!sourceIndex) {
      sourceIndex = new Map();
      articleIndex = new Map();
      for (const source of bridge.sources) {
        sourceIndex.set(source.id, source);
        const rows = articleIndex.get(source.article.id) ?? [];
        rows.push(source);
        articleIndex.set(source.article.id, rows);
      }
    }
    return sourceIndex;
  }

  function phrases() {
    if (!phraseIndex) {
      phraseIndex = new Map();
      for (const annotation of bridge.phraseAnnotations) {
        const rows = phraseIndex.get(annotation.sourceId) ?? [];
        if (!rows.some(label => normalize(label) === normalize(annotation.label))) rows.push(annotation.label);
        phraseIndex.set(annotation.sourceId, rows);
      }
    }
    return phraseIndex;
  }

  function getSource(sourceId: string): VocabularySource | undefined {
    const cached = sourceCache.get(sourceId);
    if (cached) return cached;
    const source = references().get(sourceId);
    if (!source) return undefined;
    const questionMatch = sourceId.match(/^question-(\d+)-(prompt|option-([A-GTF]))$/);
    const questionId = questionMatch ? Number(questionMatch[1]) : undefined;
    const optionKey = questionMatch?.[3];
    const question = questionId === undefined ? undefined : source.article.questions.find(item =>
      item.id === questionId || (item.format === "matching" && item.sharedOptionsId === questionId));
    const sourceType = source.sentenceId ? "sentence" : optionKey ? "option" : "prompt";
    const analysis = source.sentenceId
      ? source.article.sentences.find(sentence => sentence.id === source.sentenceId)
      : optionKey
        ? (question?.analysis?.options as Partial<Record<QuestionOptionKey, SentenceAnalysis>> | undefined)?.[optionKey as QuestionOptionKey]
        : question?.analysis?.prompt;
    // A question explanation is NOT a translation. Only the actual source's reviewed
    // language analysis may supply the Chinese sentence; never use its answer evidence.
    const translation = analysis && normalize(analysis.text) === normalize(source.text)
      ? analysis.natural || analysis.literal || undefined : undefined;
    const result: VocabularySource = {
      sourceId, articleId: source.article.id, year: source.article.year,
      articleLabel: source.article.label, sourceLabel: source.section, sourceType,
      ...(source.sentenceId ? { sentenceId: source.sentenceId } : {}),
      ...(questionId === undefined ? {} : { questionId }), ...(optionKey ? { optionKey } : {}),
      text: source.text, ...(translation ? { translation } : {}),
    };
    sourceCache.set(sourceId, result);
    return result;
  }

  function resolveCandidate(label: string, isPhrase: boolean, sourceId: string, manual = false): ResolvedVocabularyCandidate | undefined {
    const cacheKey = JSON.stringify([sourceId, isPhrase, normalize(label)]);
    if (candidateCache.has(cacheKey)) {
      const cached = candidateCache.get(cacheKey);
      return cached ? { ...cached, manual } : undefined;
    }
    const reference = references().get(sourceId);
    const source = getSource(sourceId);
    const expression = source && actualExpression(source.text, label);
    if (!source || !reference || !expression) return undefined;
    // Only existing annotated expressions or reviewed canonical structures are eligible.
    // A manual mark never manufactures phrases out of adjacent words.
    if (isPhrase && !phrases().get(sourceId)?.some(item => normalize(item) === normalize(expression)) && !getPhraseKnowledge(expression, { articleId: source.articleId })) {
      candidateCache.set(cacheKey, null);
      return undefined;
    }
    const resolved = bridge.resolveEntry(expression, isPhrase, sourceId);
    if (!resolved.contextualMeaning || !resolved.use || /待精审|后续补充|该词未出现在|随对应真题精审持续补充/.test(`${resolved.partOfSpeech} ${resolved.contextualMeaning} ${resolved.use}`)) {
      candidateCache.set(cacheKey, null);
      return undefined;
    }
    // Preserve the legacy stable key; the current surface is never copied from a seed.
    const entry = isPhrase ? { ...resolved, sourceExpression: expression, display: expression } : resolved;
    const context: VocabularyContext = {
      // Several annotated expressions may share a structural key in one sentence
      // (e.g. agricultural implements / chemical fertilizers). Keep each real
      // expression addressable so an existing memory cannot absorb another sense.
      id: `${sourceId}:${entry.kind}:${encodeURIComponent(entry.key)}${isPhrase ? `:${encodeURIComponent(normalize(expression))}` : ""}`,
      sourceId, articleId: source.articleId, year: source.year, sourceType: source.sourceType,
      ...(source.sentenceId ? { sentenceId: source.sentenceId } : {}),
      ...(source.questionId === undefined ? {} : { questionId: source.questionId }),
      ...(source.optionKey ? { optionKey: source.optionKey } : {}), expression,
    };
    // The existing reviewed slot is "file for + legal status". This is its inflected
    // source instance normalized for practice, not a new pattern or a new sense.
    const canonicalInstance = isPhrase && /^file for\b/i.test(entry.canonicalForm ?? "") && /^filed for /i.test(expression)
      ? `${canonicalLemma(expression.split(/\s+/)[0], lexicalContext(reference))}${expression.slice(expression.indexOf(" "))}` : undefined;
    const candidate: ResolvedVocabularyCandidate = {
      entry, context, priority: priorityFor(entry, reference), manual: false,
      text: source.text, translation: source.translation,
      articleLabel: source.articleLabel, sourceLabel: source.sourceLabel,
      ...(canonicalInstance ? { canonicalInstance } : {}),
    };
    candidateCache.set(cacheKey, candidate);
    return { ...candidate, manual };
  }

  function getCandidate(context: VocabularyContext, kind: "word" | "phrase" = context.id.includes(":phrase:") ? "phrase" : "word") {
    const candidate = resolveCandidate(context.expression, kind === "phrase", context.sourceId);
    return candidate ? { ...candidate, context: { ...candidate.context, ...context } } : undefined;
  }

  function resolveLegacyCandidates(key: string, savedContexts: LegacyVocabularyContext[] = []): ResolvedVocabularyCandidate[] {
    let known = termCache.get(key);
    if (!known) {
      known = bridge.findTermContexts(key).flatMap(context => {
        const candidate = resolveCandidate(context.label, context.kind === "phrase", context.sourceId);
        return candidate && candidate.entry.key === key ? [candidate] : [];
      });
      termCache.set(key, known);
    }
    const saved = savedContexts.flatMap(context => {
      const candidate = resolveCandidate(context.label, context.kind === "phrase", context.sourceId);
      return candidate && candidate.entry.key === key && candidate.context.articleId === context.articleId ? [candidate] : [];
    });
    const unique = new Map<string, ResolvedVocabularyCandidate>();
    for (const candidate of [...saved, ...known]) if (!unique.has(candidate.context.id)) unique.set(candidate.context.id, candidate);
    return [...unique.values()];
  }

  function* iterateCandidatesForScope(scope: VocabularyCorpusScope, options: VocabularyCandidateOptions = {}): Generator<ResolvedVocabularyCandidate> {
    let count = 0;
    const limit = options.limit ?? Infinity;
    if (limit <= 0) return;
    if (scope.kind === "marked" || scope.kind === "list") {
      if (scope.contexts) {
        for (const context of scope.contexts) {
          const item = getCandidate(context);
          if (!item || (scope.keys && !scope.keys.includes(item.entry.key))) continue;
          const candidate = { ...item, manual: true };
          if (options.accept && !options.accept(candidate)) continue;
          yield candidate;
          if (++count >= limit) return;
        }
        return;
      }
      for (const key of new Set(scope.keys ?? [])) {
        // Deliberately selected list/mark membership overrides editorial defaults.
        const saved = scope.savedContexts?.[key] ?? [];
        const selected = selectLegacyVocabularyCandidates(resolveLegacyCandidates(key, saved), saved);
        for (const item of selected) {
          const candidate = { ...item, manual: true };
          if (options.accept && !options.accept(candidate)) continue;
          yield candidate;
          if (++count >= limit) return;
        }
      }
      return;
    }
    references();
    const sources = scope.kind === "article" ? articleIndex!.get(scope.articleId ?? "") ?? [] : bridge.sources;
    for (const source of sources) {
      if (scope.kind === "year" && source.article.year !== scope.year) continue;
      const lexContext = lexicalContext(source);
      for (const label of new Set(bridge.tokenizeWords(source.text.toLowerCase()))) {
        const guide = getLexicalGuide(label, lexContext);
        const preliminary = priorityFor({ headword: guide.headword, display: label, kind: "word", partOfSpeech: guide.partOfSpeech }, source);
        if (!vocabularyCandidateAllowed(preliminary, options)) continue;
        const candidate = resolveCandidate(label, false, source.id);
        if (!candidate || !vocabularyCandidateAllowed(candidate.priority, options) || (options.accept && !options.accept(candidate))) continue;
        yield candidate;
        if (++count >= limit) return;
      }
      for (const label of phrases().get(source.id) ?? []) {
        const knowledge = getPhraseKnowledge(label, { articleId: source.article.id });
        const preliminary = priorityFor({ headword: knowledge?.canonical ?? label, display: label, canonicalForm: knowledge?.canonical, kind: "phrase", partOfSpeech: knowledge?.type ?? "固定搭配" }, source);
        if (!vocabularyCandidateAllowed(preliminary, options)) continue;
        const candidate = resolveCandidate(label, true, source.id);
        if (!candidate || !vocabularyCandidateAllowed(candidate.priority, options) || (options.accept && !options.accept(candidate))) continue;
        yield candidate;
        if (++count >= limit) return;
      }
    }
  }

  function candidatesForScope(scope: VocabularyCorpusScope, options: VocabularyCandidateOptions = {}) {
    return Array.from(iterateCandidatesForScope(scope, options));
  }

  function candidatesForMemory(memory: Pick<VocabularyMemory, "contexts" | "kind">) {
    return memory.contexts.flatMap(context => {
      const candidate = getCandidate(context, memory.kind);
      return candidate ? [candidate] : [];
    });
  }

  function phraseCandidatesForWord(label: string, sourceId: string) {
    return (phrases().get(sourceId) ?? []).filter(phrase => actualExpression(phrase, label)).flatMap(phrase => {
      const candidate = resolveCandidate(phrase, true, sourceId, true);
      return candidate ? [candidate] : [];
    }).sort((left, right) => left.context.expression.length - right.context.expression.length);
  }

  return { getSource, resolveCandidate, getCandidate, resolveLegacyCandidates, candidatesForScope, iterateCandidatesForScope, candidatesForMemory, phraseCandidatesForWord };
}

export type VocabularyCorpus = ReturnType<typeof createVocabularyCorpus>;
