"use client";

import { chunkVisualRole, chunkDescription, visualRoleLabels } from "./reviewed-syntax";
import { OriginalPassage } from "./original-passage";
import { ArticleGuidePanel } from "./article-guide-panel";
import { QuestionEvidencePanel } from "./question-evidence-panel";
import { SentencePracticePanel } from "./sentence-practice-panel";
import { trainingSources, articleMapSource } from "./training-sources";
import { TrainingReview } from "./training-review";
import { emptyReflection, latestTaskAttempt, practiceMetrics, activePracticeSession, continuePracticeSession, addPracticeHint, practiceHintTargets, makePracticeAttempt, type HintType, type PracticeSession, type PracticeSessions, type PracticeAttempts, type PracticeTask, type LearningReflection, type QuestionWork } from "./learning-model";
import { makeLocationAttempt, locationHistory, type LocationAttempts } from "./location-model";
import { QuestionLocationPractice } from "./question-location-practice";
import { vocabularyPriority } from "./vocabulary-priority";
import { AuthSessionError, readAuthSession } from "./auth-session";

import {
  ArrowLeft,
  BookOpenCheck,
  BookOpenText,
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Cloud,
  FileText,
  Flag,
  Layers3,
  ListChecks,
  LogIn,
  LogOut,
  LockKeyhole,
  Mail,
  NotebookPen,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
  WifiOff,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  aliasToVocab,
  allQuestions,
  allSentences,
  articleContents,
  availableYears,
  basicMeanings,
  sectionsByYear,
  vocab,
  type SentenceAnalysis,
  type AnyQuestion as Question,
  type QuestionOptionKey,
  questionExplanation,
  questionOptionSourceId,
  type SentenceChunk,
  type ArticleContent,
  type AnyQuestion,
  type TranslationTask,
  type WritingTask,
  translationTaskSentences,
  type VocabEntry,
  type OccurrenceContext,
} from "./data";
import { SentenceSyntaxPanel } from "./sentence-syntax-panel";
import {
  getCollocationDetails,
  getFamilyDetails,
  getPhraseKnowledge,
  getSynonymDetails,
  getWordKnowledge,
} from "./knowledge-base";
import { canonicalLemma, familyAliases, getLexicalGuide, type LexicalContext } from "./lexicon";
import { getVocabularySenseGuide } from "./vocabulary-senses";
import { getSentencePhraseContext } from "./contextual-vocabulary";
import {
  ACTIVE_ACCOUNT_KEY, LEGACY_STORAGE_KEY, hasStudyRecords, isStudySnapshot, prepareLocalSnapshot,
  preserveLocalStudyState, readLocalStudyState, readRemoteSnapshot, reconcileStudyState,
  sameStudySnapshot, saveLocalStudyState, studyStorageKey, type RemoteStudyState,
} from "./study-sync";

type AppView = "study" | "test" | "review" | "vocabulary";
type SentenceMode = "read" | "words" | "structure";
type ArticleId = keyof typeof articleContents;
type RevealTiming = "instant" | "sentence" | "article";
type TimerMode = "up" | "down";
type ReviewFilter = "all" | "word" | "phrase" | "sentence" | "question";
type ReviewScope = "due" | "overdue" | "all";
type VocabularyFilter = "word" | "phrase";
type MarkTag = "完全不会" | "有些陌生" | "不会搭配" | "容易混淆";
type Rating = "正确" | "模糊" | "错误";
type ReviewSchedule = { dueAt: number; intervalDays: number; repetitions: number };
type SavedTermContext = { articleId: string; sourceId: string; headword: string; label: string; kind: "word" | "phrase" };
type TermContexts = Record<string, SavedTermContext[]>;

type SelectedTerm = {
  key: string;
  label: string;
  entry: VocabEntry;
  sentenceId: string;
};

type ReferenceDetail = NonNullable<VocabEntry["collocationDetails"]>[number];

type YearWordContext = {
  sourceForm: string;
  sourceForms: string[];
  meaning: string;
  partOfSpeech: string;
  sentenceId: string;
};

type YearWordItem = YearWordContext & {
  headword: string;
  forms: string[];
  count: number;
  contexts: YearWordContext[];
};

type YearPhraseItem = {
  source: string;
  canonical: string;
  count: number;
  meaning: string;
  type: string;
  sentenceId: string;
};

type PersistedStudyState = {
  version: 1;
  updatedAt: number;
  expanded: string[];
  practiceAttempts: PracticeAttempts;
  practiceReveals: Record<string, number>; // 仅保留旧记录，不用于本次提示判断。
  practiceSessions: PracticeSessions;
  learningReflections: Record<string, LearningReflection>;
  questionWork: Record<string, QuestionWork>;
  locationAttempts: LocationAttempts;
  marks: Record<string, MarkTag[]>;
  termRatings: Record<string, Rating>;
  reviewSchedule: Record<string, ReviewSchedule>;
  termContexts?: TermContexts;
  termNotes: Record<string, string>;
  sentenceNotes: Record<string, string>;
  sentenceMarks: string[];
  answers: Record<number, string>;
  translationAnswers: Record<string, string>;
  submittedTranslationTasks: Record<string, boolean>;
  submitted: boolean;
  activeSection?: ArticleId;
  selectedYear?: number;
  submittedSections?: Record<string, boolean>;
  revealTiming: RevealTiming;
  timerMode: TimerMode;
  lists: string[];
  listItems: Record<string, string[]>;
  reviewFilter: ReviewFilter;
};

function emptyStudyState(): PersistedStudyState {
  return {
    version: 1, updatedAt: 0, expanded: ["cloze-s1"], marks: {}, termRatings: {}, reviewSchedule: {}, termContexts: {},
    practiceAttempts: {}, practiceReveals: {}, practiceSessions: {}, learningReflections: {}, questionWork: {}, locationAttempts: {},
    termNotes: {}, sentenceNotes: {}, sentenceMarks: [], answers: {}, translationAnswers: {}, submittedTranslationTasks: {},
    submitted: false, activeSection: "cloze", selectedYear: 2000, submittedSections: {}, revealTiming: "article", timerMode: "up",
    lists: ["本周重点"], listItems: { "本周重点": [] }, reviewFilter: "all",
  };
}

function normalizeStudyState(snapshot: Partial<PersistedStudyState>): PersistedStudyState {
  const section = snapshot.activeSection && snapshot.activeSection in articleContents ? snapshot.activeSection : "cloze";
  const sections = snapshot.submittedSections ?? (snapshot.submitted ? { cloze: true } : {});
  return { ...emptyStudyState(), ...snapshot, activeSection: section, selectedYear: articleContents[section].year,
    practiceReveals: snapshot.practiceReveals ?? {},
    termContexts: snapshot.termContexts ?? {}, submittedSections: sections, submitted: Boolean(sections.cloze) };
}

const markTags: MarkTag[] = ["完全不会", "有些陌生", "不会搭配", "容易混淆"];
const ratings: Rating[] = ["正确", "模糊", "错误"];


const phraseGlosses: Record<string, string> = {
  "other than": "除……之外；不同于",
  "as well as": "也；以及；除……之外还",
  "more than": "多于；不仅仅",
  "much as": "尽管；虽然（引导让步）",
  "long before": "早在……之前",
  "ever since": "自从……以来",
  "wishes to succeed": "希望成功；wish to do 为正式表达",
  "wish to do sth": "希望/想要做某事；较正式，主语本人去做",
  "hope to do sth": "希望做某事；强调未来结果仍可能实现",
  "wish sb to do sth": "希望某人做某事；正式表达，hope 不能这样接",
  "wish sb sth": "祝愿某人得到某事，如 wish you success",
  "keep a wide gap": "保持较大的差额",
  "between his consumption and his production": "在消费与生产之间",
  "a large quantity of": "大量的；可接可数或不可数名词",
  "support himself and his family": "养活自己和家人",
  "in three ways": "以三种方式",
  "as seed for sowing": "作为播种用的种子",
  "an insurance against": "防范……的一种保障",
  "the unpredictable effects of bad weather": "恶劣天气不可预测的影响",
  "agricultural implements": "农具；农业工具",
  "chemical fertilizers": "化肥",
  "feed the soil": "给土壤补充养分",
  "construct irrigation channels": "修建灌溉渠道",
  "in other ways": "以其他方式",
  "be self-sufficient": "自给自足",
  "either sell": "要么出售；与后面的 or seek 构成并列",
  "or seek": "或者寻求；与 either sell 构成并列",
  "extra funds": "额外资金",
  "borrow money": "借钱；borrow 表借入",
  "of this kind": "这种；修饰前面的 loans",
  "not frequently obtainable": "并不经常能够获得",
};

const corpusSources = Object.values(articleContents).flatMap((article) => [
  ...article.sentences.map((sentence) => ({ id: sentence.id, sentenceId: sentence.id, article, text: sentence.text, section: `${article.label}正文` })),
  ...article.questions.flatMap((question) => [
    { id: `question-${question.id}-prompt`, sentenceId: undefined, article, text: question.prompt, section: `${article.label}第 ${question.number ?? question.id} 题题干` },
    ...(question.format === "matching" && question.id !== question.sharedOptionsId ? [] : question.options.map((option) => ({ id: questionOptionSourceId(question, option.key), sentenceId: undefined, article, text: option.text, section: question.format === "matching" ? `${article.label}共用选项${option.key}` : `${article.label}第 ${question.number ?? question.id} 题选项${option.key}` }))),
  ]),
]);
const sourceById = new Map(corpusSources.map((source) => [source.id, source]));
const phraseAnnotations = Object.values(articleContents).flatMap((article) => [
  ...article.sentences.flatMap((sentence) => sentence.phrases.map((label) => ({ label, sourceId: sentence.id }))),
  ...article.questions.filter(question => question.format !== "matching" || question.id === question.sharedOptionsId).flatMap((question) => question.options
    .filter((option) => option.text.includes(" ") && getPhraseKnowledge(option.text))
    .map((option) => ({ label: option.text, sourceId: questionOptionSourceId(question, option.key) }))),
]).map((annotation) => ({ ...annotation, patternKey: getPhraseKnowledge(annotation.label)?.key }));
const phraseOccurrenceCache = new Map<string, Array<{ source: (typeof corpusSources)[number]; start: number; end: number; label: string }>>();
const termContextCache = new Map<string, SavedTermContext[]>();
const corpusTokens = corpusSources.flatMap((source) => tokenizeWords(source.text.toLowerCase()).map((form) => {
  const lemma = canonicalLemma(form, { articleId: source.article.id as LexicalContext["articleId"], sourceId: source.id, sentenceId: source.sentenceId });
  return { form, lemma, family: familyAliases[lemma] ?? lemma, sourceId: source.id, year: source.article.year };
}));

function tokenizeWords(text: string) {
  return text.match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];
}

const optionLookup = new Map(
  allQuestions.flatMap((question) => question.options.flatMap((option) => [question.sentenceId, `question-${question.id}-option-${option.key}`].map((sourceId) => [
    `${sourceId}:${option.text.toLowerCase()}`,
    {
      explanation: questionExplanation(question, option.key),
      correct: question.options.find((item) => item.key === question.answer)?.text ?? "",
      isCorrect: option.key === question.answer,
    },
  ] as const))),
);

const sentenceArticle = new Map(
  corpusSources.map((source) => [source.id, source.article] as const),
);

const questionArticle = new Map(
  Object.values(articleContents).flatMap((article) => article.questions.map((question) => [question.id, article] as const)),
);

function lexicalContextFor(sourceId?: string): LexicalContext {
  const source = sourceId ? sourceById.get(sourceId) : undefined;
  return {
    sourceId,
    sentenceId: source?.sentenceId,
    articleId: source?.article.id as LexicalContext["articleId"],
  };
}

function lemmaOf(token: string, sourceId?: string) {
  return canonicalLemma(token, lexicalContextFor(sourceId));
}

function normalizePhrase(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[‘’]/g, "'").replace(/[‐‑‒–—]/g, "-").replace(/\s+/g, " ").trim();
}

export function phraseMatchRanges(text: string, phrase: string) {
  const normalized = normalizePhrase(phrase);
  if (!normalized) return [];
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "gu");
  return Array.from(normalizePhrase(text).matchAll(pattern), (match) => ({ start: match.index, end: match.index + match[0].length }));
}

export function findPhraseOccurrences(label: string, includeStructure = false) {
  const normalized = normalizePhrase(label);
  const patternKey = includeStructure ? getPhraseKnowledge(label)?.key : undefined;
  const cacheKey = JSON.stringify([normalized, patternKey]);
  const cached = phraseOccurrenceCache.get(cacheKey);
  if (cached) return cached;
  const expressions = new Map([[normalized, label]]);
  if (patternKey) phraseAnnotations.filter((item) => item.patternKey === patternKey)
    .forEach((item) => expressions.set(normalizePhrase(item.label), item.label));
  const occurrences = corpusSources.flatMap((source) => {
    const matches = new Map<string, { source: typeof source; start: number; end: number; label: string }>();
    for (const expression of expressions.values()) {
      for (const range of phraseMatchRanges(source.text, expression)) {
        matches.set(`${range.start}:${range.end}`, { source, ...range, label: expression });
      }
    }
    return Array.from(matches.values());
  });
  phraseOccurrenceCache.set(cacheKey, occurrences);
  return occurrences;
}

export function currentCounts(label: string, isPhrase: boolean, sourceId?: string) {
  const normalized = label.toLowerCase();
  if (isPhrase) {
    const exact = findPhraseOccurrences(label).length;
    const pattern = findPhraseOccurrences(label, true).length;
    return { form: exact, lemma: pattern, family: pattern };
  }
  const lemma = lemmaOf(normalized, sourceId);
  const family = familyAliases[lemma] ?? lemma;
  return {
    form: corpusTokens.filter((token) => token.form === normalized).length,
    lemma: corpusTokens.filter((token) => token.lemma === lemma).length,
    family: corpusTokens.filter((token) => token.family === family).length,
  };
}

type ContextualOccurrence = VocabEntry["occurrences"][number] & { sourceId: string; contexts: OccurrenceContext[] };
const contextualOccurrenceCache = new Map<string, ContextualOccurrence[]>();

function phraseOccurrenceContext(expression: string, sourceId?: string): OccurrenceContext {
  const contextual = getSentencePhraseContext(sourceId, expression);
  const knowledgeExpression = contextual?.knowledgeExpression ?? expression;
  const knowledge = getPhraseKnowledge(knowledgeExpression);
  const detail = getCollocationDetails([knowledgeExpression])[0];
  return {
    expression,
    partOfSpeech: contextual?.partOfSpeech ?? knowledge?.type ?? "固定搭配",
    meaning: contextual?.contextualMeaning ?? phraseGlosses[knowledgeExpression.toLowerCase()] ?? (detail?.target ? detail.meaning : knowledge?.meaning) ?? "",
    use: contextual?.use ?? detail?.note ?? knowledge?.summary ?? "",
  };
}

export function currentOccurrences(label: string, isPhrase: boolean, sourceId?: string): ContextualOccurrence[] {
  const lemma = isPhrase ? undefined : lemmaOf(label.toLowerCase(), sourceId);
  const cacheKey = isPhrase ? JSON.stringify(["phrase", normalizePhrase(label), getPhraseKnowledge(label)?.key]) : `word:${lemma}`;
  const cached = contextualOccurrenceCache.get(cacheKey);
  if (cached) return cached;
  const grouped = new Map<string, ContextualOccurrence>();
  function addContext(source: (typeof corpusSources)[number], context: OccurrenceContext) {
    let occurrence = grouped.get(source.id);
    if (!occurrence) {
      occurrence = { sourceId: source.id, year: source.article.year, section: source.section, excerpt: source.text, contexts: [] };
      grouped.set(source.id, occurrence);
    }
    if (!occurrence.contexts.some((existing) => normalizePhrase(existing.expression) === normalizePhrase(context.expression))) {
      occurrence.contexts.push(context);
    }
  }
  if (isPhrase) {
    for (const { source, label: expression } of findPhraseOccurrences(label, true)) {
      addContext(source, phraseOccurrenceContext(expression, source.id));
    }
  } else {
    for (const token of corpusTokens) {
      if (token.lemma !== lemma) continue;
      const source = sourceById.get(token.sourceId)!;
      const guide = getLexicalGuide(token.form, lexicalContextFor(source.id));
      const seed = vocab[aliasToVocab[token.form] ?? guide.headword];
      addContext(source, {
        expression: token.form,
        partOfSpeech: guide.partOfSpeech,
        meaning: guide.contextualMeaning ?? seed?.contextualMeaning ?? basicMeanings[token.form] ?? "",
        use: guide.use ?? seed?.use ?? "",
      });
    }
  }
  const occurrences = Array.from(grouped.values());
  contextualOccurrenceCache.set(cacheKey, occurrences);
  return occurrences;
}

export function groupOccurrenceSenses(occurrences: VocabEntry["occurrences"]) {
  const grouped = new Map<string, { partOfSpeech: string; meaning: string; examples: Array<{ sourceId: string; expression: string; use: string }> }>();
  for (const occurrence of occurrences) {
    if (!occurrence.sourceId) continue;
    for (const context of occurrence.contexts ?? []) {
      const key = JSON.stringify([context.partOfSpeech, context.meaning]);
      let group = grouped.get(key);
      if (!group) {
        group = { partOfSpeech: context.partOfSpeech, meaning: context.meaning, examples: [] };
        grouped.set(key, group);
      }
      group.examples.push({ sourceId: occurrence.sourceId, expression: context.expression, use: context.use });
    }
  }
  return Array.from(grouped.values());
}

function makeFallbackEntry(label: string, isPhrase = false, sentenceId?: string): VocabEntry {
  const normalized = label.toLowerCase();
  const option = sentenceId ? optionLookup.get(`${sentenceId}:${normalized}`) : undefined;
  const phraseKnowledge = isPhrase ? getPhraseKnowledge(normalized) : undefined;
  const guide = isPhrase ? null : getLexicalGuide(normalized, lexicalContextFor(sentenceId));
  const wordKnowledge = guide ? getWordKnowledge(guide.headword, lexicalContextFor(sentenceId)) : undefined;
  const counts = currentCounts(label, isPhrase, sentenceId);
  if (phraseKnowledge) {
    return {
      key: `pattern:${phraseKnowledge.key}`,
      headword: phraseKnowledge.canonical,
      display: phraseKnowledge.canonical,
      kind: "phrase",
      partOfSpeech: phraseKnowledge.type,
      contextualMeaning: phraseGlosses[normalized] ?? phraseKnowledge.meaning,
      use: phraseKnowledge.summary,
      sourceExpression: label,
      canonicalForm: phraseKnowledge.canonical,
      grammarRole: phraseKnowledge.grammarRole,
      grammarSummary: phraseKnowledge.summary,
      structures: phraseKnowledge.structures,
      pitfalls: phraseKnowledge.pitfalls,
      specialForms: [],
      examSynonyms: [],
      collocations: [],
      collocationDetails: [],
      synonymDetails: [],
      familyDetails: [],
      otherMeanings: [],
      wordFamily: [],
      confusions: [],
      knowledgeLevel: "curated",
      counts,
      occurrences: currentOccurrences(label, true),
    };
  }
  return {
    key: isPhrase ? normalized : guide?.headword ?? lemmaOf(normalized),
    headword: isPhrase ? normalized : guide?.headword ?? lemmaOf(normalized),
    display: label,
    kind: isPhrase ? "phrase" : "word",
    partOfSpeech: isPhrase ? "固定搭配" : guide?.partOfSpeech ?? "词性待精审",
    contextualMeaning:
      (isPhrase ? phraseGlosses[normalized] : guide?.contextualMeaning ?? basicMeanings[normalized]) ??
      "该词未出现在当前精审语料中；释义会在它所属的真题文章精审时补全。",
    use: option
      ? `本题辨析：${option.explanation}`
      : isPhrase
        ? "这是 GPT 在本句中预先确认的整体表达，应优先整体理解。"
        : guide?.use ?? "结合本句成分理解；该词的详细用法会随对应真题精审持续补充。",
    grammarRole: wordKnowledge?.grammarRole,
    grammarSummary: wordKnowledge?.grammarSummary,
    structures: wordKnowledge?.structures,
    pitfalls: wordKnowledge?.pitfalls,
    specialForms: isPhrase ? ["固定搭配本身不作词形变化；内部单词可分别点击查看"] : guide?.specialForms ?? [],
    examSynonyms: isPhrase ? ["固定搭配优先整体记忆，不按单个中文意思随意替换"] : guide?.examSynonyms ?? [],
    collocations: guide?.collocations ?? [],
    collocationDetails: getCollocationDetails(guide?.collocations ?? []),
    synonymDetails: getSynonymDetails(guide?.examSynonyms ?? []),
    familyDetails: getFamilyDetails(guide?.wordFamily ?? []),
    otherMeanings: guide?.otherMeanings ?? [],
    wordFamily: guide?.wordFamily ?? [],
    confusions: [
      ...(guide?.confusions ?? []),
      ...(option
        ? [option.isCorrect ? "它是本题正确项，需结合定位句记忆。" : `本题正确项是 ${option.correct}，注意两者的语义和搭配差别。`]
        : []),
    ],
    contextualSubstitutions: guide?.contextualSubstitutions ?? [],
    counts,
    knowledgeLevel: guide?.use || wordKnowledge ? "curated" : "related",
    occurrences: currentOccurrences(label, isPhrase, sentenceId),
  };
}

export function resolveEntry(label: string, isPhrase = false, sentenceId?: string): VocabEntry {
  const normalized = label.toLowerCase();
  const phraseKnowledge = isPhrase ? getPhraseKnowledge(normalized) : undefined;
  const guide = isPhrase ? null : getLexicalGuide(normalized, lexicalContextFor(sentenceId));
  const wordKnowledge = guide ? getWordKnowledge(guide.headword, lexicalContextFor(sentenceId)) : undefined;
  const key = phraseKnowledge
    ? `pattern:${phraseKnowledge.key}`
    : isPhrase
      ? normalized
      : aliasToVocab[normalized] ?? guide?.headword ?? normalized;
  const seed = vocab[key];
  const entry = seed?.kind === (isPhrase ? "phrase" : "word")
    ? seed
    : makeFallbackEntry(label, isPhrase, sentenceId);
  if (phraseKnowledge) {
    const context = phraseOccurrenceContext(label, sentenceId);
    const knowledgeExpression = getSentencePhraseContext(sentenceId, label)?.knowledgeExpression;
    const contextualKnowledge = knowledgeExpression ? getPhraseKnowledge(knowledgeExpression) : undefined;
    return {
      ...entry,
      display: label,
      partOfSpeech: context.partOfSpeech,
      contextualMeaning: context.meaning,
      use: context.use,
      canonicalForm: contextualKnowledge?.canonical ?? entry.canonicalForm,
      grammarRole: contextualKnowledge?.grammarRole ?? entry.grammarRole,
      grammarSummary: contextualKnowledge?.summary ?? entry.grammarSummary,
      structures: contextualKnowledge?.structures ?? entry.structures,
      pitfalls: contextualKnowledge?.pitfalls ?? entry.pitfalls,
      senseGuide: getVocabularySenseGuide(entry.headword, phraseKnowledge.key),
      counts: currentCounts(label, true, sentenceId),
      occurrences: currentOccurrences(label, true, sentenceId),
    };
  }
  const mergedCollocations = Array.from(new Set([...(entry.collocations ?? []), ...(guide?.collocations ?? [])]));
  const mergedSynonyms = guide?.examSynonyms ?? entry.examSynonyms ?? [];
  const mergedFamily = Array.from(new Set([...(entry.wordFamily ?? []), ...(guide?.wordFamily ?? [])]));
  return {
    ...entry,
    key,
    kind: isPhrase ? "phrase" : "word",
    display: label,
    headword: guide?.headword ?? entry.headword,
    partOfSpeech: guide?.partOfSpeech ?? entry.partOfSpeech,
    contextualMeaning: guide?.contextualMeaning ?? entry.contextualMeaning,
    use: guide?.use ?? entry.use,
    contextualSubstitutions: guide?.contextualSubstitutions ?? entry.contextualSubstitutions ?? [],
    specialForms: guide?.specialForms ?? entry.specialForms ?? [],
    examSynonyms: guide?.examSynonyms ?? entry.examSynonyms ?? [],
    grammarRole: wordKnowledge?.grammarRole ?? entry.grammarRole,
    grammarSummary: wordKnowledge?.grammarSummary ?? entry.grammarSummary,
    structures: wordKnowledge?.structures ?? entry.structures,
    pitfalls: Array.from(new Set([...(entry.pitfalls ?? []), ...(wordKnowledge?.pitfalls ?? [])])),
    collocations: mergedCollocations,
    collocationDetails: getCollocationDetails(mergedCollocations),
    synonymDetails: getSynonymDetails(mergedSynonyms),
    familyDetails: getFamilyDetails(mergedFamily),
    otherMeanings: Array.from(new Set([...(entry.otherMeanings ?? []), ...(guide?.otherMeanings ?? [])])),
    senseGuide: isPhrase ? undefined : getVocabularySenseGuide(guide?.headword ?? entry.headword),
    wordFamily: mergedFamily,
    confusions: Array.from(new Set([...(entry.confusions ?? []), ...(guide?.confusions ?? [])])),
    counts: currentCounts(label, isPhrase, sentenceId),
    knowledgeLevel: entry.knowledgeLevel ?? (entry.use || guide?.use || wordKnowledge ? "curated" : "related"),
    occurrences: currentOccurrences(label, isPhrase, sentenceId),
  };
}

function corpusTokensForYear(year: number) {
  return corpusTokens.filter((token) => token.year === year);
}

export function buildYearWordItems(year: number): YearWordItem[] {
  const grouped = new Map<string, typeof corpusTokens>();
  corpusTokensForYear(year).forEach((token) => {
    const tokens = grouped.get(token.lemma) ?? [];
    tokens.push(token);
    grouped.set(token.lemma, tokens);
  });

  return Array.from(grouped.entries())
    .map(([headword, tokens]) => {
      const sources = new Map<string, YearWordContext>();
      for (const token of tokens) {
        const existing = sources.get(token.sourceId);
        if (existing) {
          if (!existing.sourceForms.includes(token.form)) existing.sourceForms.push(token.form);
          continue;
        }
        const guide = getLexicalGuide(token.form, lexicalContextFor(token.sourceId));
        const entry = guide?.contextualMeaning && guide.partOfSpeech
          ? { contextualMeaning: guide.contextualMeaning, partOfSpeech: guide.partOfSpeech }
          : resolveEntry(token.form, false, token.sourceId);
        sources.set(token.sourceId, {
          sourceForm: token.form,
          sourceForms: [token.form],
          meaning: entry.contextualMeaning,
          partOfSpeech: entry.partOfSpeech,
          sentenceId: token.sourceId,
        });
      }
      const contexts = Array.from(sources.values());
      return {
        ...contexts[0],
        headword,
        forms: Array.from(new Set(tokens.map((token) => token.form))).sort((left, right) => left.localeCompare(right, "en")),
        count: tokens.length,
        contexts,
      };
    })
    .sort((left, right) => left.headword.localeCompare(right.headword, "en"));
}

export function searchYearWordItems(words: YearWordItem[], search: string): YearWordItem[] {
  const query = search.trim().toLowerCase();
  if (!query) return words;
  return words.flatMap((item) => {
    const context = item.contexts.find((candidate) => candidate.sourceForms.includes(query))
      ?? item.contexts.find((candidate) => [...candidate.sourceForms, candidate.meaning, candidate.partOfSpeech].join(" ").toLowerCase().includes(query));
    if (!context && ![item.headword, ...item.forms].join(" ").toLowerCase().includes(query)) return [];
    const sourceForm = context?.sourceForms.find((form) => form === query) ?? context?.sourceForms.find((form) => form.includes(query));
    return [{ ...item, ...(context ?? item.contexts[0]), ...(sourceForm ? { sourceForm } : {}) }];
  });
}

export function sourceDestination(sourceId: string) {
  const source = sourceById.get(sourceId);
  if (!source) return undefined;
  return {
    articleId: source.article.id as ArticleId,
    year: source.article.year,
    view: source.sentenceId ? "study" as const : "test" as const,
    sentenceId: source.sentenceId,
    elementId: `source-${source.id}`,
  };
}

export function buildYearPhraseItems(year: number): YearPhraseItem[] {
  const sources = new Map<string, { source: string; sentenceId: string }>();
  phraseAnnotations.filter((item) => sourceById.get(item.sourceId)?.article.year === year).forEach((item) => {
    const key = normalizePhrase(item.label);
    if (!sources.has(key)) sources.set(key, { source: item.label, sentenceId: item.sourceId });
  });

  return Array.from(sources.values())
    .map(({ source, sentenceId }) => {
      const entry = resolveEntry(source, true, sentenceId);
      return {
        source,
        canonical: entry.canonicalForm ?? entry.headword,
        count: findPhraseOccurrences(source).filter((item) => item.source.article.year === year).length,
        meaning: entry.contextualMeaning,
        type: entry.partOfSpeech,
        sentenceId,
      };
    })
    .sort((a, b) => a.source.localeCompare(b.source, "en"));
}

export function termContextKey(key: string, list?: string) {
  return JSON.stringify(list === undefined ? ["review", key] : ["list", list, key]);
}

function termKind(key: string) {
  return vocab[key]?.kind ?? (key.startsWith("pattern:") || key.includes(" ") ? "phrase" : "word");
}

export function findTermContexts(key: string): SavedTermContext[] {
  const cached = termContextCache.get(key);
  if (cached) return cached;
  const contexts = new Map<string, SavedTermContext>();
  if (termKind(key) === "phrase") {
    const annotation = phraseAnnotations.find((item) => key === `pattern:${item.patternKey}` || normalizePhrase(item.label) === normalizePhrase(key));
    for (const occurrence of findPhraseOccurrences(annotation?.label ?? key, Boolean(annotation?.patternKey))) {
      contexts.set(occurrence.source.id, { articleId: occurrence.source.article.id, sourceId: occurrence.source.id,
        headword: getPhraseKnowledge(occurrence.label)?.canonical ?? occurrence.label, label: occurrence.label, kind: "phrase" });
    }
  } else {
    for (const token of corpusTokens.filter((item) => item.lemma === key || aliasToVocab[item.form] === key)) {
      const source = sourceById.get(token.sourceId);
      if (source && !contexts.has(source.id)) contexts.set(source.id, { articleId: source.article.id, sourceId: source.id,
        headword: token.lemma, label: token.form, kind: "word" });
    }
  }
  const options = Array.from(contexts.values());
  termContextCache.set(key, options);
  return options;
}

export function resolveSavedTermContext(key: string, saved: SavedTermContext[] = []) {
  const options = findTermContexts(key);
  const previous = Array.isArray(saved) ? saved : [];
  for (const context of previous) {
    const valid = options.find((option) => option.sourceId === context?.sourceId && option.articleId === context.articleId
      && option.headword === context.headword && option.kind === context.kind);
    if (valid) {
      const source = sourceById.get(valid.sourceId)!;
      const label = typeof context.label === "string" && phraseMatchRanges(source.text, context.label).length ? context.label : valid.label;
      return { options, selected: { ...valid, label } };
    }
  }
  return { options, selected: options.length === 1 ? options[0] : undefined };
}

export function rememberTermContext(current: TermContexts, key: string, context: SavedTermContext, list?: string): TermContexts {
  const storageKey = termContextKey(key, list);
  const previous = Array.isArray(current[storageKey]) ? current[storageKey] : [];
  return { ...current, [storageKey]: [context, ...previous.filter((item) => item.sourceId !== context.sourceId)] };
}

function sourceCaption(sourceId: string) {
  const source = sourceById.get(sourceId);
  if (!source) return "通用词条";
  const sentence = source.sentenceId ? allSentences.find((item) => item.id === source.sentenceId) : undefined;
  return `${source.article.year} · ${source.section}${sentence ? ` · 第 ${sentence.number} 句` : ""}`;
}

function dueTime(schedule?: ReviewSchedule) {
  return schedule && Number.isFinite(schedule.dueAt) ? schedule.dueAt : 0;
}

function startOfReviewDay(now: number) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function filterReviewKeys(keys: string[], schedules: Record<string, ReviewSchedule>, scope: ReviewScope, now: number) {
  return keys.filter((key) => scope === "all" || (scope === "overdue"
    ? Boolean(schedules[key]) && dueTime(schedules[key]) < startOfReviewDay(now)
    : dueTime(schedules[key]) <= now))
    .sort((left, right) => dueTime(schedules[left]) - dueTime(schedules[right]));
}

export function formatReviewDue(schedule: ReviewSchedule | undefined, now: number) {
  if (!schedule || !Number.isFinite(schedule.dueAt)) return "今天复习";
  const due = new Date(schedule.dueAt);
  const current = new Date(now);
  const days = Math.round((Date.UTC(due.getFullYear(), due.getMonth(), due.getDate())
    - Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())) / 86_400_000);
  if (days < 0) return `逾期 ${-days} 天`;
  if (days === 0) return schedule.dueAt <= now ? "今天复习" : `今天 ${String(due.getHours()).padStart(2, "0")}:${String(due.getMinutes()).padStart(2, "0")}`;
  if (days === 1) return "明天";
  return `${due.getFullYear() === current.getFullYear() ? "" : `${due.getFullYear()}年`}${due.getMonth() + 1}月${due.getDate()}日`;
}

export function nextReviewSchedule(previous: ReviewSchedule | undefined, rating: Rating, now: number): ReviewSchedule {
  const intervals = [1, 3, 7, 14, 30, 60];
  let repetitions = previous?.repetitions ?? 0;
  let intervalDays = 0;
  if (rating === "正确") {
    repetitions += 1;
    intervalDays = intervals[Math.min(repetitions - 1, intervals.length - 1)];
  } else if (rating === "模糊") {
    repetitions = Math.max(0, repetitions - 1);
    intervalDays = 1;
  } else repetitions = 0;
  const due = new Date(now);
  due.setDate(due.getDate() + intervalDays);
  return { repetitions, intervalDays, dueAt: due.getTime() };
}

export function questionNumberLabel(questions: Pick<Question, "id" | "number">[], unit = "题") {
  const numbers = Array.from(new Set(questions.map((question) => question.number ?? question.id))).sort((left, right) => left - right);
  if (numbers.length === 0) return "本篇题目";
  const ranges: string[] = [];
  let start = numbers[0];
  let end = start;
  for (const number of numbers.slice(1)) {
    if (number === end + 1) end = number;
    else {
      ranges.push(start === end ? String(start) : `${start}–${end}`);
      start = end = number;
    }
  }
  ranges.push(start === end ? String(start) : `${start}–${end}`);
  return `第 ${ranges.join("、")} ${unit}`;
}

function formatSeconds(value: number) {
  const safe = Math.max(0, value);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function roleClass(chunk: SentenceChunk) {
  return `syntax-chunk syntax-${chunkVisualRole(chunk)}`;
}

function translationAnswerKey(articleId: ArticleId, taskId: number) {
  return `${articleId}:${taskId}`;
}

export default function StudyApp() {
  const [view, setView] = useState<AppView>("test");
  const [sentenceMode, setSentenceMode] = useState<SentenceMode>("read");
  const [studyPart, setStudyPart] = useState<"passage" | "questions">("passage");
  const [showPhrases, setShowPhrases] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [activeSection, setActiveSection] = useState<ArticleId>("cloze");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["cloze-s1"]));
  const [practiceAttempts, setPracticeAttempts] = useState<PracticeAttempts>({});
  const [practiceReveals, setPracticeReveals] = useState<Record<string, number>>({});
  const [practiceSessions, setPracticeSessions] = useState<PracticeSessions>({});
  const practiceSessionsRef = useRef<PracticeSessions>({});
  const [learningReflections, setLearningReflections] = useState<Record<string, LearningReflection>>({});
  const [locationAttempts, setLocationAttempts] = useState<LocationAttempts>({});
  const [practiceTarget, setPracticeTarget] = useState<{ sentenceId: string; taskId?: string } | null>(null);
  const [evidenceOrigin, setEvidenceOrigin] = useState<{ questionId: number; articleId: string; number: number; option?: string; scrollY: number; view: "study" | "test" } | null>(null);
  const [evidenceSections, setEvidenceSections] = useState<Record<number, string[]>>({});
  const [locatingQuestionId, setLocatingQuestionId] = useState<number | null>(null);
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null);
  const [questionWork, setQuestionWork] = useState<Record<string, QuestionWork>>({});
  const [selectedTerm, setSelectedTerm] = useState<SelectedTerm | null>(null);
  const [termHistory, setTermHistory] = useState<SelectedTerm[]>([]);
  const [marks, setMarks] = useState<Record<string, MarkTag[]>>({});
  const [termRatings, setTermRatings] = useState<Record<string, Rating>>({});
  const [reviewSchedule, setReviewSchedule] = useState<Record<string, ReviewSchedule>>({});
  const [termContexts, setTermContexts] = useState<TermContexts>({});
  const [contextPicker, setContextPicker] = useState<{ key: string; list?: string; options: SavedTermContext[]; remember?: boolean } | null>(null);
  const firstContextOption = useRef<HTMLButtonElement | null>(null);
  const sourceNavigation = useRef<string | null>(null);
  const [reviewContextTarget, setReviewContextTarget] = useState<{ key: string; list?: string } | null>(null);
  const [reviewScope, setReviewScope] = useState<ReviewScope>("due");
  const [reviewNow, setReviewNow] = useState(Date.now);
  const [termNotes, setTermNotes] = useState<Record<string, string>>({});
  const [sentenceNotes, setSentenceNotes] = useState<Record<string, string>>({});
  const [sentenceMarks, setSentenceMarks] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [translationAnswers, setTranslationAnswers] = useState<Record<string, string>>({});
  const [submittedTranslationTasks, setSubmittedTranslationTasks] = useState<Record<string, boolean>>({});
  const [submittedSections, setSubmittedSections] = useState<Record<string, boolean>>({});
  const [revealTiming, setRevealTiming] = useState<RevealTiming>("article");
  const [unlockedTerms, setUnlockedTerms] = useState<Set<string>>(new Set());
  const [timerMode, setTimerMode] = useState<TimerMode>("up");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [countdownStart] = useState(12 * 60);
  const [lists, setLists] = useState<string[]>(["本周重点"]);
  const [listItems, setListItems] = useState<Record<string, string[]>>({ "本周重点": [] });
  const [newListName, setNewListName] = useState("");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const [vocabularyFilter, setVocabularyFilter] = useState<VocabularyFilter>("word");
  const [vocabularySearch, setVocabularySearch] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [online, setOnline] = useState(true);
  const [offlineReady, setOfflineReady] = useState(false);
  const [syncState, setSyncState] = useState<"local" | "saving" | "synced" | "offline">("local");
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [passwordConfigured, setPasswordConfigured] = useState(false);
  const [passwordUnavailable, setPasswordUnavailable] = useState(false);
  const [sessionCheckState, setSessionCheckState] = useState<"loading" | "ready" | "error">("loading");
  const [sessionCheckError, setSessionCheckError] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "code">("password");
  const [loginPassword, setLoginPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [syncError, setSyncError] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [remoteReady, setRemoteReady] = useState(false);
  const snapshotRef = useRef<PersistedStudyState | null>(null);
  const initialUpdatedAt = useRef(0);
  const snapshotOwner = useRef<string | null>(null);
  const remoteBase = useRef<RemoteStudyState<PersistedStudyState> | null>(null);
  const readyToUpload = useRef(false);
  const [conflictingRemote, setConflictingRemote] = useState<RemoteStudyState<PersistedStudyState> | null>(null);
  const [hasLegacyBackup, setHasLegacyBackup] = useState(false);
  const syncGeneration = useRef(0);
  const sessionCheckGeneration = useRef(0);
  const sessionCheckController = useRef<AbortController | null>(null);
  const restoringAccount = useRef(false);
  const uploadController = useRef<AbortController | null>(null);
  const previousOnline = useRef(true);
  const activeArticle = articleContents[activeSection];
  const sentences = activeArticle.sentences;
  const questions = activeArticle.questions;
  const translationTasks = activeArticle.translationTasks ?? [];
  const writingTasks = activeArticle.writingTasks ?? [];
  const writtenTasks = [...translationTasks, ...writingTasks];
  const isPassageTranslation = translationTasks.some((task) => task.format === "passage");
  const submitted = Boolean(submittedSections[activeSection]);
  const selectedTermSource = selectedTerm ? sourceById.get(selectedTerm.sentenceId) : undefined;
  const selectedTermPriority = selectedTerm ? vocabularyPriority(selectedTerm.entry, selectedTerm.sentenceId, selectedTermSource?.article.id) : undefined;
  // Building the complete vocabulary resolves every word and occurrence across
  // the imported corpus. Keep the first study render lightweight and only do
  // that work when the vocabulary view is actually opened.
  const yearWordCount = useMemo(() => new Set(corpusTokensForYear(selectedYear).map((token) => token.lemma)).size, [selectedYear]);
  const yearPhraseCount = useMemo(() => {
    return new Set(phraseAnnotations.filter((item) => sourceById.get(item.sourceId)?.article.year === selectedYear)
      .map((item) => normalizePhrase(item.label))).size;
  }, [selectedYear]);
  const yearWordItems = useMemo(() => (view === "vocabulary" ? buildYearWordItems(selectedYear) : []), [view, selectedYear]);
  const yearPhraseItems = useMemo(() => (view === "vocabulary" ? buildYearPhraseItems(selectedYear) : []), [view, selectedYear]);
  const visibleYearWordCount = view === "vocabulary" ? yearWordItems.length : yearWordCount;
  const visibleYearPhraseCount = view === "vocabulary" ? yearPhraseItems.length : yearPhraseCount;

  const applySnapshot = useCallback((snapshot: Partial<PersistedStudyState>) => {
    snapshot = normalizeStudyState(snapshot);
    snapshotRef.current = snapshot as PersistedStudyState;
    initialUpdatedAt.current = snapshot.updatedAt ?? 0;
    if (Array.isArray(snapshot.expanded)) setExpanded(new Set(snapshot.expanded));
    setPracticeAttempts(snapshot.practiceAttempts ?? {});
    setPracticeReveals(snapshot.practiceReveals ?? {});
    practiceSessionsRef.current = snapshot.practiceSessions ?? {};
    setPracticeSessions(practiceSessionsRef.current);
    setLearningReflections(snapshot.learningReflections ?? {});
    setQuestionWork(snapshot.questionWork ?? {});
    setLocationAttempts(snapshot.locationAttempts ?? {});
    if (snapshot.marks) setMarks(snapshot.marks);
    if (snapshot.termRatings) setTermRatings(snapshot.termRatings);
    if (snapshot.reviewSchedule) setReviewSchedule(snapshot.reviewSchedule);
    setTermContexts(snapshot.termContexts && typeof snapshot.termContexts === "object" && !Array.isArray(snapshot.termContexts) ? snapshot.termContexts : {});
    if (snapshot.termNotes) setTermNotes(snapshot.termNotes);
    if (snapshot.sentenceNotes) setSentenceNotes(snapshot.sentenceNotes);
    if (Array.isArray(snapshot.sentenceMarks)) setSentenceMarks(new Set(snapshot.sentenceMarks));
    if (snapshot.answers) setAnswers(snapshot.answers);
    if (snapshot.translationAnswers) setTranslationAnswers(snapshot.translationAnswers);
    if (snapshot.submittedTranslationTasks) setSubmittedTranslationTasks(snapshot.submittedTranslationTasks);
    if (snapshot.activeSection && snapshot.activeSection in articleContents) {
      setActiveSection(snapshot.activeSection);
      setSelectedYear(articleContents[snapshot.activeSection].year);
    } else if (snapshot.selectedYear && availableYears.includes(snapshot.selectedYear as (typeof availableYears)[number])) {
      setSelectedYear(snapshot.selectedYear);
    }
    if (snapshot.submittedSections) setSubmittedSections(snapshot.submittedSections);
    else if (snapshot.submitted) setSubmittedSections({ cloze: true });
    if (snapshot.revealTiming) setRevealTiming(snapshot.revealTiming);
    if (snapshot.timerMode) setTimerMode(snapshot.timerMode);
    if (Array.isArray(snapshot.lists)) setLists(snapshot.lists);
    if (snapshot.listItems) setListItems(snapshot.listItems);
    if (snapshot.reviewFilter) setReviewFilter(snapshot.reviewFilter);
  }, []);

  const restoreAccount = useCallback(async (email: string) => {
    if (restoringAccount.current) return false;
    restoringAccount.current = true;
    const generation = ++syncGeneration.current;
    uploadController.current?.abort();
    uploadController.current = null;
    readyToUpload.current = false;
    setUserEmail(email);
    setAccountEmail(email);
    setRemoteReady(false);
    setSyncError("");
    setSyncState("saving");
    try {
      if (snapshotRef.current) saveLocalStudyState(window.localStorage, snapshotOwner.current, { state: snapshotRef.current, base: remoteBase.current });
      if (snapshotOwner.current !== email) {
        const saved = readLocalStudyState<PersistedStudyState>(window.localStorage, email);
        snapshotOwner.current = email;
        remoteBase.current = saved?.base ?? null;
        applySnapshot(saved?.state ?? emptyStudyState());
        setSelectedTerm(null);
        setTermHistory([]);
        setContextPicker(null);
        setTimerRunning(false);
      }
      window.localStorage.setItem(ACTIVE_ACCOUNT_KEY, email);
      const received = await readRemoteSnapshot<PersistedStudyState>(email);
      if (generation !== syncGeneration.current) return false;
      const remote = { ...received, state: received.state ? normalizeStudyState(received.state) : null };
      const local = { state: snapshotRef.current ?? emptyStudyState(), base: remoteBase.current };
      const base = local.base ? { ...local.base, state: local.base.state ? normalizeStudyState(local.base.state) : null } : { state: emptyStudyState(), updatedAt: null };
      const reconciled = reconcileStudyState({ ...local, base }, remote);
      if (reconciled.conflicts.length) {
        preserveLocalStudyState(window.localStorage, email, local);
        setConflictingRemote(remote);
        setSyncError(`有 ${reconciled.conflicts.length} 处记录在两台设备分别修改，已暂停上传并保留双方记录。可先导出本机备份，再使用云端记录；或保留本机继续离线学习。`);
        setSyncState("local");
        return false;
      }
      if (hasStudyRecords(local.state) && !sameStudySnapshot(local.state, base.state) && !sameStudySnapshot(local.state, reconciled.state)) preserveLocalStudyState(window.localStorage, email, local);
      remoteBase.current = remote;
      applySnapshot(reconciled.state);
      saveLocalStudyState(window.localStorage, email, { state: snapshotRef.current!, base: remote });
      setConflictingRemote(null);
      readyToUpload.current = true;
      setRemoteReady(true);
      setSyncState(sameStudySnapshot(snapshotRef.current, remote.state) || (!remote.state && !hasStudyRecords(snapshotRef.current)) ? "synced" : "local");
      return true;
    } catch (error) {
      if (generation === syncGeneration.current) {
        setSyncError(error instanceof Error ? error.message : "同步暂不可用，请重试；本机记录已保留。");
        setSyncState(navigator.onLine ? "local" : "offline");
      }
      return false;
    } finally {
      if (generation === syncGeneration.current) restoringAccount.current = false;
    }
  }, [applySnapshot]);

  const cancelSessionCheck = useCallback(() => {
    sessionCheckGeneration.current += 1;
    sessionCheckController.current?.abort();
    sessionCheckController.current = null;
  }, []);

  const checkSession = useCallback(async () => {
    cancelSessionCheck();
    const checkGeneration = sessionCheckGeneration.current;
    const accountGeneration = syncGeneration.current;
    const controller = new AbortController();
    sessionCheckController.current = controller;
    const isCurrent = () => !controller.signal.aborted
      && checkGeneration === sessionCheckGeneration.current && accountGeneration === syncGeneration.current;
    setSessionCheckState("loading");
    setSessionCheckError("");
    try {
      const session = await readAuthSession({ signal: controller.signal });
      if (!isCurrent()) return;
      setEmailConfigured(session.configured);
      setPasswordConfigured(session.passwordConfigured);
      setPasswordUnavailable(Boolean(session.passwordUnavailable));
      setAuthMode(current => current === "code" && session.configured ? "code" : session.passwordConfigured ? "password" : "code");
      // Only a validated, successful response may enter the existing account restoration path.
      if (!session.user) {
        if (snapshotOwner.current) {
          const guest = readLocalStudyState<PersistedStudyState>(window.localStorage, null);
          snapshotOwner.current = null;
          remoteBase.current = guest?.base ?? null;
          applySnapshot(guest?.state ?? emptyStudyState());
          window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
        }
        setSessionCheckState("ready");
        return;
      }
      setHasPassword(Boolean(session.user.hasPassword));
      setSessionCheckState("ready");
      await restoreAccount(session.user.email);
    } catch (error) {
      if (!isCurrent()) return;
      setSessionCheckError(error instanceof AuthSessionError ? error.message : "登录状态暂时无法读取，请重试。本机记录已保留。");
      setSessionCheckState("error");
    } finally {
      if (sessionCheckController.current === controller) sessionCheckController.current = null;
    }
  }, [applySnapshot, cancelSessionCheck, restoreAccount]);

  useEffect(() => {
    let active = true;
    const handleOnline = () => { setOnline(true); };
    const handleOffline = () => { setOnline(false); setSyncState("offline"); };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    queueMicrotask(() => {
      if (!active) return;
      setOnline(navigator.onLine);
      try {
        setHasLegacyBackup(Boolean(window.localStorage.getItem(LEGACY_STORAGE_KEY)));
        const owner = window.localStorage.getItem(ACTIVE_ACCOUNT_KEY);
        const saved = readLocalStudyState<PersistedStudyState>(window.localStorage, owner);
        snapshotOwner.current = owner;
        remoteBase.current = saved?.base ?? null;
        applySnapshot(saved?.state ?? emptyStudyState());
        setHydrated(true);
      } catch {
        setSyncError("本机记录暂时无法读取，已停止自动保存。请先导出备份，不要清理浏览器数据。");
      }
    });

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => setOfflineReady(true))
        .catch(() => undefined);
    }

    queueMicrotask(() => { if (active) void checkSession(); });

    return () => {
      active = false;
      cancelSessionCheck();
      syncGeneration.current += 1;
      restoringAccount.current = false;
      readyToUpload.current = false;
      uploadController.current?.abort();
      uploadController.current = null;
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // The initial load intentionally runs once; later saves are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const reconnected = online && !previousOnline.current;
    if (reconnected && authBusy) return;
    if (!reconnected) {
      previousOnline.current = online;
      return;
    }
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      previousOnline.current = online;
      if (userEmail) void restoreAccount(userEmail);
      else void checkSession();
    });
    return () => { active = false; };
  }, [online, userEmail, authBusy, checkSession, restoreAccount]);

  const persistedState = useMemo<PersistedStudyState>(() => ({
    version: 1,
    updatedAt: 0,
    expanded: Array.from(expanded),
    practiceAttempts, practiceReveals, practiceSessions, learningReflections, questionWork, locationAttempts,
    marks,
    termRatings,
    reviewSchedule,
    termContexts,
    termNotes,
    sentenceNotes,
    sentenceMarks: Array.from(sentenceMarks),
    answers,
    translationAnswers,
    submittedTranslationTasks,
    submitted: Boolean(submittedSections.cloze),
    activeSection,
    selectedYear,
    submittedSections,
    revealTiming,
    timerMode,
    lists,
    listItems,
    reviewFilter,
  }), [activeSection, answers, expanded, listItems, lists, marks, revealTiming, reviewFilter, reviewSchedule, selectedYear, sentenceMarks, sentenceNotes, submittedSections, submittedTranslationTasks, termContexts, termNotes, termRatings, timerMode, translationAnswers, practiceAttempts, practiceReveals, practiceSessions, learningReflections, questionWork, locationAttempts]);

  useEffect(() => {
    if (contextPicker) firstContextOption.current?.focus();
  }, [contextPicker]);

  useEffect(() => {
    const refreshReviewClock = () => setReviewNow(Date.now());
    const interval = window.setInterval(refreshReviewClock, 30_000);
    window.addEventListener("focus", refreshReviewClock);
    document.addEventListener("visibilitychange", refreshReviewClock);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshReviewClock);
      document.removeEventListener("visibilitychange", refreshReviewClock);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const snapshot = prepareLocalSnapshot(persistedState, snapshotRef.current, initialUpdatedAt.current);
    snapshotRef.current = snapshot;
    const generation = syncGeneration.current;
    try {
      saveLocalStudyState(window.localStorage, snapshotOwner.current, { state: snapshot, base: remoteBase.current });
    } catch {
      readyToUpload.current = false;
      queueMicrotask(() => {
        setRemoteReady(false);
        setSyncState("local");
        setSyncError("本机备份空间不足或不可写，已暂停上传。请先导出备份，不要清理浏览器数据。");
      });
      return;
    }
    const id = window.setTimeout(() => {
      if (!userEmail || snapshotOwner.current !== userEmail || !remoteReady || !readyToUpload.current || restoringAccount.current || generation !== syncGeneration.current || !navigator.onLine) {
        setSyncState(navigator.onLine ? "local" : "offline");
        return;
      }
      if (uploadController.current) return;
      const controller = new AbortController();
      uploadController.current = controller;
      void (async () => {
        try {
          while (readyToUpload.current && generation === syncGeneration.current && navigator.onLine) {
            const latest = snapshotRef.current;
            const base = remoteBase.current;
            if (!latest || !base) return;
            if (sameStudySnapshot(latest, base.state) || (!base.state && !hasStudyRecords(latest))) {
              setSyncState("synced");
              setSyncError("");
              return;
            }
            setSyncState("saving");
            const response = await fetch("/api/study-state", {
              method: "PUT", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ state: latest, expectedUpdatedAt: base.updatedAt, accountEmail: userEmail }),
              signal: controller.signal,
            });
            const result = await response.json() as { updatedAt?: number; error?: string };
            if (generation !== syncGeneration.current) return;
            if (!response.ok || !Number.isSafeInteger(result.updatedAt) || Number(result.updatedAt) <= Number(base.updatedAt ?? 0)) {
              if (response.status === 401) setUserEmail(null);
              throw new Error(result.error || "同步回执异常，已停止上传；本机记录已保留，请重试同步。");
            }
            remoteBase.current = { state: latest, updatedAt: result.updatedAt! };
            saveLocalStudyState(window.localStorage, userEmail, { state: snapshotRef.current ?? latest, base: remoteBase.current });
          }
        } catch (error) {
          if (!controller.signal.aborted && generation === syncGeneration.current) {
            readyToUpload.current = false;
            setRemoteReady(false);
            setSyncState(navigator.onLine ? "local" : "offline");
            setSyncError(error instanceof Error ? error.message : "网络暂不可用，本机记录已保留。请重试同步。");
          }
        } finally {
          if (uploadController.current === controller) uploadController.current = null;
        }
      })();
    }, 450);
    return () => window.clearTimeout(id);
  }, [hydrated, persistedState, remoteReady, userEmail]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setTimerSeconds((current) => {
        if (timerMode === "down" && current >= countdownStart) {
          setTimerRunning(false);
          return current;
        }
        return current + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [countdownStart, timerMode, timerRunning]);

  const studiedCount = sentences.filter((sentence) => expanded.has(sentence.id)).length;
  const hasPractice = sentences.some(sentence => sentence.practice?.length);
  const trainingMetrics = practiceMetrics(sentences, practiceAttempts, reviewNow);
  const trainingDue = practiceMetrics(trainingSources(activeArticle), practiceAttempts, reviewNow).due;
  const studiedProgress = Math.round(((hasPractice ? trainingMetrics.completed : studiedCount) / sentences.length) * 100);
  function savePracticeSession(articleId: string, session: PracticeSession) {
    practiceSessionsRef.current = { ...practiceSessionsRef.current, [articleId]: session };
    setPracticeSessions(practiceSessionsRef.current);
  }
  function beginPractice(articleId: string, at: number) {
    const session = continuePracticeSession(practiceSessionsRef.current[articleId], at, crypto.randomUUID());
    savePracticeSession(articleId, session);
    setReviewNow(at);
    return session;
  }
  function recordPracticeHint(article: ArticleContent, type: HintType, source: string, at: number, sentenceId?: string, feedbackTask?: PracticeTask) {
    const session = beginPractice(article.id, at);
    const affected = practiceHintTargets(trainingSources(article), type, source, sentenceId, feedbackTask);
    savePracticeSession(article.id, addPracticeHint(session, { id: crypto.randomUUID(), type, source, at, taskKeys: affected }));
  }
  function recordPractice(sentence: { id: string }, task: PracticeTask, answer: string, id: string, at: number) {
    const session = beginPractice(activeArticle.id, at);
    const attempt = makePracticeAttempt({ id, at, articleId: activeArticle.id, sentenceId: sentence.id, task, answer, session });
    setPracticeAttempts(current => ({ ...current, [id]: attempt }));
    recordPracticeHint(activeArticle, "previous-answer", `${sentence.id}/${task.id}`, at, sentence.id, task);
  }
  function openPracticeSentence(id: string, at: number, taskId?: string) {
    const article = sentenceArticle.get(id) ?? Object.values(articleContents).find(article => `${article.id}-map` === id);
    if (!article) return;
    beginPractice(article.id, at);
    setPracticeTarget({ sentenceId: id, taskId });
    setActiveSection(article.id); setSelectedYear(article.year); setView("study"); setStudyPart("passage"); setExpanded(current => new Set(current).add(id));
    window.setTimeout(() => { const element = document.getElementById(`source-${id}`); if (element instanceof HTMLDetailsElement) element.open = true; element?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 0);
  }
  function visitQuestionEvidence(question: AnyQuestion, sentenceId: string, at: number, option?: string) {
    setEvidenceOrigin({ questionId: question.id, articleId: activeArticle.id, number: question.number ?? question.id, option, scrollY: window.scrollY, view: view === "study" ? "study" : "test" });
    openPracticeSentence(sentenceId, at);
  }
  function openQuestionStudy(questionId?: number) {
    setView("study"); setStudyPart("questions");
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(questionId ? `source-question-${questionId}-prompt` : "question-study-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }
  function returnToQuestion() {
    if (!evidenceOrigin) return;
    const origin = evidenceOrigin, article = articleContents[origin.articleId];
    setActiveSection(article.id); setSelectedYear(article.year); setView(origin.view); setStudyPart("questions"); setEvidenceOrigin(null);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(`source-question-${origin.questionId}-prompt`)?.focus({ preventScroll: true });
      window.scrollTo({ top: origin.scrollY, behavior: "instant" });
    }));
  }
  function saveLocation(question: AnyQuestion, stage: "initial" | "review" | "legacy", at: number) {
    if (!question.reasoning) return;
    const owner = questionArticle.get(question.id) ?? activeArticle;
    const attempt = makeLocationAttempt({ id: crypto.randomUUID(), articleId: owner.id, questionId: question.id, at, stage, work: questionWork[question.id] ?? { scope: "", sentenceIds: [] } }, question.reasoning, owner.sentences.map(s => s.id));
    if (attempt) setLocationAttempts(current => ({ ...current, [attempt.id]: attempt }));
  }
  function startLocationReview(questionId: number, at: number) {
    const question = allQuestions.find(q => q.id === questionId);
    if (question && !locationHistory(locationAttempts, questionId).length) saveLocation(question, "legacy", at);
    setEditingLocationId(questionId);
    setQuestionWork(current => ({ ...current, [questionId]: { scope: "", sentenceIds: [] } }));
  }
  function selectLocationInPassage(questionId: number) {
    setLocatingQuestionId(questionId);
    document.getElementById("original-passage")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function finishLocationSelection() {
    const id = locatingQuestionId;
    setLocatingQuestionId(null);
    window.setTimeout(() => document.getElementById(`source-question-${id}-prompt`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }
  const selectedAnswers = questions.filter((question) => Boolean(answers[question.id])).length;
  const submittedTranslationCount = translationTasks.filter((task) => (
    submittedTranslationTasks[translationAnswerKey(activeArticle.id, task.id)]
  )).length;
  const correctAnswers = submitted
    ? questions.filter((question) => answers[question.id] === question.answer).length
    : 0;
  const markedKeys = Object.keys(marks).filter((key) => marks[key]?.length);
  const wrongQuestions = allQuestions.filter((question) => {
    const article = questionArticle.get(question.id);
    return Boolean(article && submittedSections[article.id] && answers[question.id] !== question.answer);
  });
  const markedSentenceIds = Array.from(sentenceMarks).filter((id) => sourceById.get(id)?.sentenceId === id);
  const dueKeys = filterReviewKeys(markedKeys, reviewSchedule, "due", reviewNow);
  const overdueKeys = filterReviewKeys(markedKeys, reviewSchedule, "overdue", reviewNow);
  const reviewCount = dueKeys.length + markedSentenceIds.length + wrongQuestions.length;
  const allReviewCount = markedKeys.length + markedSentenceIds.length + wrongQuestions.length;
  const visibleMarkedKeys = filterReviewKeys(markedKeys, reviewSchedule, reviewScope, reviewNow).filter((key) => {
    if (reviewFilter === "all") return true;
    return reviewFilter === termKind(key);
  });
  const visibleSentenceMarks = reviewScope !== "overdue" && (reviewFilter === "all" || reviewFilter === "sentence")
    ? markedSentenceIds
    : [];
  const visibleWrongQuestions = reviewScope !== "overdue" && (reviewFilter === "all" || reviewFilter === "question")
    ? wrongQuestions
    : [];
  const visibleReviewCount = visibleMarkedKeys.length + visibleSentenceMarks.length + visibleWrongQuestions.length;
  const syncLabel = !online || syncState === "offline"
    ? "离线可用"
    : syncState === "synced"
      ? "云端已同步"
      : syncState === "saving"
        ? "正在同步"
        : "本机已保存";

  const timerDisplay =
    timerMode === "up"
      ? formatSeconds(timerSeconds)
      : formatSeconds(countdownStart - timerSeconds);

  function toggleSentence(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openTerm(label: string, sentenceId: string, isPhrase = false) {
    setReviewContextTarget(null);
    const entry = resolveEntry(label, isPhrase, sentenceId);
    if (selectedTerm) setTermHistory((current) => [...current, selectedTerm].slice(-8));
    setSelectedTerm({ key: entry.key, label, entry, sentenceId });
  }

  function rememberSelectedContext(key: string, list?: string) {
    if (!selectedTerm || selectedTerm.key !== key) return;
    const context = findTermContexts(key).find((item) => item.sourceId === selectedTerm.sentenceId);
    if (context) setTermContexts((current) => rememberTermContext(current, key, { ...context, label: selectedTerm.label }, list));
  }

  function openSavedTerm(key: string, list?: string) {
    const resolution = resolveSavedTermContext(key, termContexts[termContextKey(key, list)]);
    setTermHistory([]);
    if (!resolution.selected && resolution.options.length > 1) {
      setContextPicker({ key, list, options: resolution.options, remember: true });
      return;
    }
    const context = resolution.selected;
    openTerm(context?.label ?? vocab[key]?.headword ?? key, context?.sourceId ?? "", context?.kind === "phrase" || termKind(key) === "phrase");
    setReviewContextTarget({ key, list });
  }

  function chooseTermContext(context: SavedTermContext) {
    if (!contextPicker) return;
    const target = { key: contextPicker.key, list: contextPicker.list };
    const remember = contextPicker.remember;
    if (remember) setTermContexts((current) => rememberTermContext(current, target.key, context, target.list));
    setContextPicker(null);
    openTerm(context.label, context.sourceId, context.kind === "phrase");
    if (remember) setReviewContextTarget(target);
  }

  function goToSource(sourceId: string) {
    const target = sourceDestination(sourceId);
    if (!target) return;
    sourceNavigation.current = target.elementId;
    setActiveSection(target.articleId);
    setSelectedYear(target.year);
    setView(target.view);
    const sentenceId = target.sentenceId;
    if (sentenceId) setExpanded((current) => new Set(current).add(sentenceId));
    if (target.articleId !== activeSection) {
      setTimerSeconds(0);
      setUnlockedTerms(new Set());
    }
    setTimerRunning(false);
    setContextPicker(null);
    setSelectedTerm(null);
    setTermHistory([]);
    setReviewContextTarget(null);
  }

  function openReference(detail: ReferenceDetail, source: VocabEntry, sentenceId: string) {
    if (!detail.target) return;
    if (detail.target.startsWith("phrase:")) {
      openTerm(detail.target.slice("phrase:".length), sentenceId, true);
      return;
    }
    const label = detail.target.startsWith("word:")
      ? detail.target.slice("word:".length)
      : detail.label;
    const base = resolveEntry(label, false, sentenceId);
    const isFamilyLink = source.familyDetails?.some(
      (item) => item.label === detail.label && item.target === detail.target,
    );
    const relationKind = isFamilyLink ? "同源词" : "近义 / 关联词";
    const missingMeaning = base.contextualMeaning.startsWith("该词未出现在");
    const missingUse = base.use.startsWith("结合本句成分理解");
    const genericPos = base.partOfSpeech.startsWith("word（");
    const entry: VocabEntry = {
      ...base,
      display: label,
      contextualMeaning: missingMeaning ? detail.meaning : base.contextualMeaning,
      partOfSpeech: genericPos ? source.partOfSpeech : base.partOfSpeech,
      use: missingUse
        ? `${detail.note ?? detail.meaning}。它由“${source.headword}”词条关联进入；尚未在当前精审正文中出现。`
        : base.use,
      relation: {
        kind: relationKind,
        source: source.headword,
        note: detail.note ?? `${label} 与 ${source.headword} 存在需要一起辨析的词义关系。`,
      },
      knowledgeLevel: base.counts.lemma > 0 || base.grammarSummary ? "curated" : "related",
    };
    if (selectedTerm) setTermHistory((current) => [...current, selectedTerm].slice(-8));
    setSelectedTerm({ key: entry.key, label, entry, sentenceId });
  }

  function goBackTerm() {
    setTermHistory((current) => {
      const previous = current.at(-1);
      if (previous) setSelectedTerm(previous);
      return current.slice(0, -1);
    });
  }

  function toggleMark(key: string, tag: MarkTag, now: number) {
    const existing = marks[key] ?? [];
    const next = existing.includes(tag)
      ? existing.filter((item) => item !== tag)
      : [...existing, tag];
    setMarks((current) => ({ ...current, [key]: next }));
    if (next.length > 0) {
      setReviewNow(now);
      if (!existing.includes(tag)) rememberSelectedContext(key);
      setReviewSchedule((schedule) => schedule[key]
        ? schedule
        : { ...schedule, [key]: { dueAt: now, intervalDays: 0, repetitions: 0 } });
    }
  }

  function rateTerm(key: string, rating: Rating, now: number) {
    setReviewNow(now);
    if (marks[key]?.length) rememberSelectedContext(key);
    setTermRatings((current) => ({ ...current, [key]: rating }));
    setReviewSchedule((current) => ({ ...current, [key]: nextReviewSchedule(current[key], rating, now) }));
  }

  function resetTest() {
    if (activeArticle.kind === "translation" || activeArticle.kind === "writing") {
      setTranslationAnswers((current) => {
        const next = { ...current };
        writtenTasks.forEach((task) => delete next[translationAnswerKey(activeArticle.id, task.id)]);
        return next;
      });
      setSubmittedTranslationTasks((current) => {
        const next = { ...current };
        writtenTasks.forEach((task) => delete next[translationAnswerKey(activeArticle.id, task.id)]);
        return next;
      });
    } else {
      setAnswers((current) => {
        const next = { ...current };
        questions.forEach((question) => delete next[question.id]);
        return next;
      });
    }
    setSubmittedSections((current) => ({ ...current, [activeSection]: false }));
    setTimerSeconds(0);
    setTimerRunning(false);
    setUnlockedTerms(new Set());
  }

  function submitTranslationTask(task: TranslationTask | WritingTask) {
    const taskKey = translationAnswerKey(activeArticle.id, task.id);
    const completesArticle = writtenTasks.every((item) => (
      item.id === task.id || submittedTranslationTasks[translationAnswerKey(activeArticle.id, item.id)]
    ));
    setSubmittedTranslationTasks((current) => ({ ...current, [taskKey]: true }));
    if (completesArticle) {
      setSubmittedSections((current) => ({ ...current, [activeSection]: true }));
      setTimerRunning(false);
    }
  }

  function selectArticle(id: ArticleId) {
    setActiveSection(id);
    setSelectedYear(articleContents[id].year);
    setView("test");
    setSelectedTerm(null);
    setTermHistory([]);
    setTimerRunning(false);
    setTimerSeconds(0);
    setUnlockedTerms(new Set());
  }

  function selectYear(year: number) {
    const nextSection = sectionsByYear[year as keyof typeof sectionsByYear].find((section) => (
      section.status === "ready" && section.id in articleContents
    ));
    if (!nextSection) return;
    setSelectedYear(year);
    selectArticle(nextSection.id);
  }

  function createList() {
    const value = newListName.trim();
    if (!value || lists.includes(value)) return;
    setLists((current) => [...current, value]);
    setListItems((current) => ({ ...current, [value]: [] }));
    setNewListName("");
  }

  function removeList(name: string) {
    setLists((current) => current.filter((item) => item !== name));
    setListItems((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    setTermContexts((current) => {
      const next = { ...current };
      for (const key of listItems[name] ?? []) delete next[termContextKey(key, name)];
      return next;
    });
  }

  function toggleListItem(list: string, key: string) {
    if (!listItems[list]?.includes(key)) rememberSelectedContext(key, list);
    setListItems((current) => {
      const existing = current[list] ?? [];
      const next = existing.includes(key)
        ? existing.filter((item) => item !== key)
        : [...existing, key];
      return { ...current, [list]: next };
    });
  }

  async function requestLoginCode() {
    if (authBusy) return;
    cancelSessionCheck();
    setAuthBusy(true);
    setAuthError("");
    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: accountEmail }),
      });
      const result = await response.json() as { requestId?: string; error?: string };
      if (!response.ok || !result.requestId) throw new Error(result.error ?? "验证码发送失败。");
      setRequestId(result.requestId);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "验证码发送失败。");
    } finally {
      setAuthBusy(false);
    }
  }

  async function verifyLoginCode() {
    if (!requestId || authBusy) return;
    cancelSessionCheck();
    setAuthBusy(true);
    setAuthError("");
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: accountEmail, requestId, code: otpCode }),
      });
      const result = await response.json() as { user?: { email: string }; error?: string };
      if (!response.ok || !result.user) throw new Error(result.error ?? "登录失败。");
      const restored = await restoreAccount(result.user.email);
      setAccountOpen(!restored);
      setOtpCode("");
      setRequestId(null);
      setHasPassword(false);
      const session = await fetch("/api/auth/session")
        .then((response) => response.ok ? response.json() as Promise<{ user?: { hasPassword?: boolean } }> : null)
        .catch(() => null);
      if (session) {
        setHasPassword(Boolean(session.user?.hasPassword));
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "登录失败。");
    } finally {
      setAuthBusy(false);
    }
  }

  async function loginWithPassword() {
    if (authBusy) return;
    cancelSessionCheck();
    setAuthBusy(true);
    setAuthError("");
    setAuthMessage("");
    try {
      const response = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: accountEmail, password: loginPassword }),
      });
      const result = await response.json() as { user?: { email: string }; error?: string };
      if (!response.ok || !result.user) throw new Error(result.error ?? "登录失败，请稍后重试。");
      setLoginPassword("");
      setHasPassword(true);
      const restored = await restoreAccount(result.user.email);
      setAccountOpen(!restored);
    } catch (error) {
      setAuthError(error instanceof Error && !(error instanceof TypeError) && !(error instanceof SyntaxError) ? error.message : "暂时无法连接，请检查网络后重试。");
    } finally {
      setAuthBusy(false);
    }
  }

  async function saveAccountPassword() {
    if (authBusy) return;
    setAuthError("");
    setAuthMessage("");
    if (newPassword.length < 8 || newPassword.length > 128) {
      setAuthError("密码长度须为 8—128 个字符。");
      return;
    }
    if (newPassword !== passwordConfirmation) {
      setAuthError("两次输入的密码不一致。");
      return;
    }
    setAuthBusy(true);
    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword, confirmation: passwordConfirmation }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "密码保存失败，请重试。");
      setHasPassword(true);
      setNewPassword("");
      setPasswordConfirmation("");
      setAuthMessage("密码已保存。下次可直接使用邮箱和密码登录。");
    } catch (error) {
      setAuthError(error instanceof Error && !(error instanceof TypeError) && !(error instanceof SyntaxError) ? error.message : "密码保存失败，请检查网络。");
    } finally {
      setAuthBusy(false);
    }
  }

  function changeAuthMode(mode: "password" | "code") {
    setAuthMode(mode);
    setLoginPassword("");
    setOtpCode("");
    setRequestId(null);
    setAuthError("");
    setAuthMessage("");
  }

  async function signOut() {
    if (authBusy) return;
    cancelSessionCheck();
    setAuthBusy(true);
    syncGeneration.current += 1;
    restoringAccount.current = false;
    uploadController.current?.abort();
    uploadController.current = null;
    readyToUpload.current = false;
    setRemoteReady(false);
    try {
      if (snapshotRef.current) saveLocalStudyState(window.localStorage, snapshotOwner.current, { state: snapshotRef.current, base: remoteBase.current });
      const guest = readLocalStudyState<PersistedStudyState>(window.localStorage, null);
      const response = await fetch("/api/auth/session", { method: "DELETE" });
      if (!response.ok) throw new Error("退出未成功，请重试。");
      snapshotOwner.current = null;
      remoteBase.current = guest?.base ?? null;
      window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
      applySnapshot(guest?.state ?? emptyStudyState());
      setSelectedTerm(null);
      setTermHistory([]);
      setContextPicker(null);
      setTimerRunning(false);
      setConflictingRemote(null);
      setUserEmail(null);
      setHasPassword(false);
      setNewPassword("");
      setPasswordConfirmation("");
      setLoginPassword("");
      setAuthError("");
      setAuthMessage("");
      setSyncError("");
      setSyncState(navigator.onLine ? "local" : "offline");
      setAccountOpen(false);
    } catch {
      setAuthError("退出未成功，请联网后重试。");
    } finally {
      setAuthBusy(false);
    }
  }

  function exportLocalBackup() {
    try {
      const records: Record<string, string> = {};
      const accountKey = studyStorageKey(snapshotOwner.current);
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (key && (key === LEGACY_STORAGE_KEY || key === studyStorageKey(null) || key === accountKey || key.startsWith(`${accountKey}:backup:`))) {
          records[key] = window.localStorage.getItem(key)!;
        }
      }
      const backup = { format: "zhenti-judu-recovery-v1", exportedAt: new Date().toISOString(), records,
        current: { state: snapshotRef.current, base: remoteBase.current } };
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `真题句读-学习记录备份-${Date.now()}.json`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setAuthMessage("备份文件已生成，请妥善保存；其中可能含有私人笔记，请勿公开上传。");
    } catch {
      setSyncError("备份导出失败，请保留当前页面和浏览器数据，不要清理缓存。");
    }
  }

  function useCloudRecords() {
    if (!userEmail || !conflictingRemote?.state || snapshotOwner.current !== userEmail) return;
    try {
      preserveLocalStudyState(window.localStorage, userEmail, { state: snapshotRef.current!, base: remoteBase.current });
      saveLocalStudyState(window.localStorage, userEmail, { state: conflictingRemote.state, base: conflictingRemote });
      remoteBase.current = conflictingRemote;
      applySnapshot(conflictingRemote.state);
      setConflictingRemote(null);
      setSyncError("");
      readyToUpload.current = true;
      setRemoteReady(true);
      setSyncState("synced");
    } catch {
      setSyncError("本机备份未成功，未切换记录。请先导出备份。");
    }
  }

  function restoreLegacyRecords() {
    if (!userEmail || !remoteReady || !readyToUpload.current || uploadController.current || restoringAccount.current || snapshotOwner.current !== userEmail) return;
    try {
      const legacy: unknown = JSON.parse(window.localStorage.getItem(LEGACY_STORAGE_KEY) ?? "null");
      if (!isStudySnapshot(legacy)) throw new Error("旧版本机记录格式异常，未导入；请先导出备份。");
      if (!hasStudyRecords(legacy)) throw new Error("本浏览器的旧副本没有可恢复的学习记录，请到原来使用的设备导出备份。");
      const current = snapshotRef.current!;
      const merged = reconcileStudyState({ state: normalizeStudyState(legacy as PersistedStudyState), base: { state: emptyStudyState(), updatedAt: null } }, { state: current, updatedAt: remoteBase.current?.updatedAt ?? null });
      if (merged.conflicts.length) throw new Error("旧副本与当前记录有冲突，本次未导入也未覆盖；请先导出备份核对。");
      preserveLocalStudyState(window.localStorage, userEmail, { state: current, base: remoteBase.current });
      saveLocalStudyState(window.localStorage, userEmail, { state: merged.state, base: remoteBase.current });
      applySnapshot(merged.state);
      setSyncError("");
      setAuthMessage("旧记录已合并到本机，联网后会按版本校验上传；原始旧副本仍保留。请查看同步状态确认云端保存结果。");
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "旧记录未导入，请先导出备份。");
    }
  }

  const termIsLocked = (() => {
    if (!selectedTerm || view !== "test") return false;
    if (revealTiming === "instant") return false;
    const submittedTranslationSentence = activeArticle.kind === "translation" && (activeArticle.translationTasks ?? []).some((task) => (
      translationTaskSentences(task).some((sentence) => sentence.id === selectedTerm.sentenceId) && submittedTranslationTasks[translationAnswerKey(activeArticle.id, task.id)]
    ));
    if (submitted || submittedTranslationSentence) return false;
    if (revealTiming === "sentence" && unlockedTerms.has(selectedTerm.key)) return false;
    return true;
  })();

  return (
    <div className="study-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">句</div>
          <div>
            <p className="eyebrow">考研英语真题精读</p>
            <h1>真题句读</h1>
          </div>
        </div>
        <div className="topbar-status">
          <Badge variant="outline" className="status-badge">
            {online ? <Cloud /> : <WifiOff />} {syncLabel}
          </Badge>
          <button type="button" className="avatar-chip" aria-label="打开个人账号" onClick={() => {
            setAccountOpen(true);
            if (!userEmail && sessionCheckState === "error" && !authBusy) void checkSession();
          }}>
            {userEmail ? userEmail.slice(0, 1).toUpperCase() : <LogIn />}
          </button>
        </div>
      </header>

      <div className="workspace-grid">
        <aside className="paper-nav" aria-label="试卷目录">
          <div className="year-card">
            <span className="year-label">当前试卷</span>
            <Select value={String(selectedYear)} onValueChange={(value) => selectYear(Number(value))}>
              <SelectTrigger size="sm" aria-label="选择真题年份"><SelectValue /></SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
              </SelectContent>
            </Select>
            <span>全国硕士研究生入学考试英语</span>
          </div>

          <nav className="section-list">
            {sectionsByYear[selectedYear as keyof typeof sectionsByYear].map((section) => {
              const isReady = section.status === "ready" && section.id in articleContents;
              const isActive = isReady && section.id === activeSection && view !== "vocabulary";
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`section-row ${isReady ? isActive ? "is-active" : "is-ready" : "is-pending"}`}
                  disabled={!isReady}
                  onClick={() => isReady && selectArticle(section.id as ArticleId)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="section-icon">
                    {isReady ? <FileText /> : <LockKeyhole />}
                  </span>
                  <span className="section-copy">
                    <strong>{section.label}</strong>
                    <small>{section.meta}</small>
                  </span>
                  {isReady ? <ChevronRight /> : <span className="pending-dot">待精审</span>}
                </button>
              );
            })}
          </nav>

          <div className="review-summary">
            <div className="review-summary-title">
              <Brain />
              <span>今日待复习</span>
              <strong>{reviewCount}</strong>
            </div>
            <p>标记后会自动进入间隔复习，也可以加入自定义清单。</p>
          </div>

          <button
            type="button"
            className={`year-vocabulary-link ${view === "vocabulary" ? "is-active" : ""}`}
            onClick={() => setView("vocabulary")}
            aria-current={view === "vocabulary" ? "page" : undefined}
          >
            <span className="section-icon"><BookOpenText /></span>
            <span className="section-copy">
              <strong>本年词汇总表</strong>
              <small>{visibleYearWordCount} 个单词 · {visibleYearPhraseCount} 个词组</small>
            </span>
            <ChevronRight />
          </button>
        </aside>

        <main className="study-main">
          {evidenceOrigin && view === "study" && evidenceOrigin.articleId === activeArticle.id && <aside className="evidence-return-bar" aria-label="返回原题"><span>正在核对：第{evidenceOrigin.number}题{evidenceOrigin.option ? ` ${evidenceOrigin.option}项` : ""}</span><button type="button" onClick={returnToQuestion}>返回第{evidenceOrigin.number}题</button><button type="button" aria-label="关闭返回条" onClick={() => setEvidenceOrigin(null)}>×</button></aside>}
          <section className="paper-heading">
            {view === "vocabulary" ? (
              <>
                <div>
                  <div className="heading-meta">
                    <Badge className="paper-badge">{selectedYear} · 年度词表</Badge>
                    <span>随精审进度更新</span>
                  </div>
                  <h2>本年单词与词组总表</h2>
                  <p>覆盖当前已导入的正文、题干与选项；点击任一词条即可查看本句义、用法和历年统计。</p>
                </div>
                <div className="vocabulary-heading-stat">
                  <span>当前已收录</span>
                  <strong>{visibleYearWordCount + visibleYearPhraseCount}</strong>
                  <small>{visibleYearWordCount} 词 · {visibleYearPhraseCount} 词组</small>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="heading-meta">
                    <Badge className="paper-badge">{activeArticle.badge}</Badge>
                    <span>{activeArticle.teachingStatus
                      ? [activeArticle.teachingStatus.syntax ? "句法已复核" : "句法待升级", activeArticle.teachingStatus.vocabulary ? "语境词义已复核" : "词义待复核", activeArticle.teachingStatus.evidence ? "题目证据已完成" : "证据待升级", activeArticle.teachingStatus.practice ? "主动练习已接入" : "练习待接入"].join(" · ")
                      : sentences.every(sentence => sentence.beginnerSyntax?.reading) ? "逐句阅读关系已补充 · 完整训练模板尚未升级" : "既有精审 · 新版训练模板尚未升级"}</span>
                  </div>
                  <h2>{view === "test" ? `${activeArticle.year} · ${activeArticle.label}` : activeArticle.title}</h2>
                  <p>{view === "test" ? "先独立阅读、作答，再进入精读与复盘。" : activeArticle.description}</p>
                </div>
                <div className="paper-progress">
                  <div><span>{hasPractice ? "训练完成" : "已查看（不代表掌握）"}</span><strong>{hasPractice ? trainingMetrics.completed : studiedCount}/{sentences.length} 句</strong></div>
                  {hasPractice && <><div><span>独立掌握（最近作答）</span><strong>{trainingMetrics.independent}/{trainingMetrics.total}句</strong></div><div><span>今日待复习</span><strong>{trainingDue}项</strong></div></>}
                  <Progress value={studiedProgress} />
                </div>
              </>
            )}
          </section>

          <Tabs value={view} onValueChange={(value) => setView(value as AppView)} className="mode-tabs">
            <div className="mode-toolbar">
              <TabsList className="mode-list">
                <TabsTrigger value="test"><Clock3 />考场初读</TabsTrigger>
                <TabsTrigger value="study"><BookOpenCheck />初学精读</TabsTrigger>
                <TabsTrigger value="review"><Brain />错题复盘</TabsTrigger>
              </TabsList>
              <Badge variant="outline" className="offline-badge">{offlineReady ? "离线内容已缓存" : "正在准备离线内容"}</Badge>
            </div>

            <TabsContent value="study" className="mode-content">
              {questions.length > 0 && <nav className="study-section-nav" aria-label="精读内容">
                <Button variant={studyPart === "passage" ? "default" : "outline"} aria-pressed={studyPart === "passage"} onClick={() => setStudyPart("passage")}><BookOpenText />正文精读</Button>
                <Button variant={studyPart === "questions" ? "default" : "outline"} aria-pressed={studyPart === "questions"} onClick={() => setStudyPart("questions")}><ListChecks />题目与选项（{questions.length}题）</Button>
              </nav>}
              <div hidden={questions.length > 0 && studyPart === "questions"}>
              <ArticleGuidePanel key={`${activeArticle.id}-${practiceTarget?.sentenceId === `${activeArticle.id}-map` ? practiceTarget.taskId ?? "" : ""}`} initialTaskId={practiceTarget?.sentenceId === `${activeArticle.id}-map` ? practiceTarget.taskId : undefined} article={activeArticle} onSentence={openPracticeSentence} onOpen={at => { recordPracticeHint(activeArticle, "article-map", "article-map", at); }}
                attempts={practiceAttempts} session={activePracticeSession(practiceSessions[activeArticle.id], reviewNow)} onBegin={at => beginPractice(activeArticle.id, at)}
                onAttempt={(task, answer, at) => recordPractice(articleMapSource(activeArticle), task, answer, crypto.randomUUID(), at)}
                onPreviousAnswer={(task, at) => recordPracticeHint(activeArticle, "previous-answer", `${articleMapSource(activeArticle).id}/${task.id}`, at, articleMapSource(activeArticle).id, task)} />
              <div className="sentence-mode-controls" aria-label="原句交互方式">
                {([["read", "纯净原句"], ["words", "查词"], ["structure", "看结构"]] as const).map(([mode, label]) => <Button key={mode} variant={sentenceMode === mode ? "default" : "outline"} aria-pressed={sentenceMode === mode} onClick={() => setSentenceMode(mode)}>{label}</Button>)}
                {sentenceMode === "words" && <label><input type="checkbox" checked={showPhrases} onChange={event => setShowPhrases(event.target.checked)} />显示词组入口</label>}
                <p>{sentenceMode === "read" ? "先读原句，点右侧箭头进入学习。" : sentenceMode === "words" ? "点原句中的单词查词；整组表达在句子下方单独选择。" : "按完整词块看句法关系，点词块查看它的作用。"}</p>
              </div>
              {writingTasks.map(task => <section key={task.id}><WritingPromptChart task={task} /><WritingStudyGuide task={task} /></section>)}
              {sentenceMode === "structure" && <div className="legend-row" aria-label="句子颜色图例">
                {sentences.every(sentence => sentence.chunks.every(chunk => chunk.visualRole))
                  ? Object.entries(visualRoleLabels).map(([role, label]) => (
                    <span key={role}><i className={`legend-dot legend-${role}`} />{label}</span>
                  ))
                  : <span>本篇配色区分词块，具体语法作用请看成分讲解。</span>}
              </div>}
              <div className="sentence-stack">
                {sentences.map((sentence) => (
                  <StudySentence
                    key={`${sentence.id}-${practiceTarget?.sentenceId === sentence.id ? practiceTarget.taskId ?? "" : ""}`}
                    initialTaskId={practiceTarget?.sentenceId === sentence.id ? practiceTarget.taskId : undefined}
                    sentence={sentence}
                    mode={sentenceMode}
                    showPhrases={showPhrases}
                    passageRole={activeArticle.guide?.sentenceRoles[sentence.id]}
                    attempts={practiceAttempts}
                    session={activePracticeSession(practiceSessions[activeArticle.id], reviewNow)}
                    onBegin={() => beginPractice(activeArticle.id, Date.now())}
                    onPreviousAnswer={task => recordPracticeHint(activeArticle, "previous-answer", `${sentence.id}/${task.id}`, Date.now(), sentence.id, task)}
                    reflection={learningReflections[sentence.id] ?? emptyReflection()}
                    onAttempt={(task, answer) => recordPractice(sentence, task, answer, crypto.randomUUID(), Date.now())}
                    onReveal={() => { const at = Date.now(); recordPracticeHint(activeArticle, "syntax", sentence.id, at, sentence.id); recordPracticeHint(activeArticle, "translation", sentence.id, at, sentence.id); }}
                    onReflection={value => setLearningReflections(current => ({ ...current, [sentence.id]: value }))}
                    isExpanded={expanded.has(sentence.id)}
                    isMarked={sentenceMarks.has(sentence.id)}
                    note={sentenceNotes[sentence.id] ?? ""}
                    onToggle={() => { beginPractice(activeArticle.id, Date.now()); toggleSentence(sentence.id); }}
                    onMark={() => setSentenceMarks((current) => {
                      const next = new Set(current);
                      if (next.has(sentence.id)) next.delete(sentence.id);
                      else next.add(sentence.id);
                      return next;
                    })}
                    onTerm={(label, id, isPhrase) => { if (sentence.practice) recordPracticeHint(activeArticle, "word", label, Date.now(), sentence.id); openTerm(label, id, isPhrase); }}
                    onNote={(value) => setSentenceNotes((current) => ({ ...current, [sentence.id]: value }))}
                  />
                ))}
              </div>
              </div>
              {questions.length > 0 && <div hidden={studyPart !== "questions"}>
                <section className="question-study-section" aria-label="题目与选项精读">
                  <h3 id="question-study-heading">题目与选项精读</h3>
                  <p>无需交卷。点英文查词；在各选项下展开选择依据或语言讲解。查看解析不会替你作答或计为掌握。</p>
                  {questions.map(question => <QuestionStudyCard key={question.id} question={question} onTerm={openTerm} onSentence={(id, option) => visitQuestionEvidence(question, id, Date.now(), option)} />)}
                </section>
              </div>}
            </TabsContent>

            <TabsContent value="test" className="mode-content">
              <section className="test-toolbar">
                <div className="timer-card">
                  <div className="timer-mode">
                    <Button
                      size="sm"
                      variant={timerMode === "up" ? "default" : "ghost"}
                      onClick={() => { setTimerMode("up"); resetTest(); }}
                    >正计时</Button>
                    <Button
                      size="sm"
                      variant={timerMode === "down" ? "default" : "ghost"}
                      onClick={() => { setTimerMode("down"); resetTest(); }}
                    >12分钟倒计时</Button>
                  </div>
                  <strong className="timer-value">{timerDisplay}</strong>
                  <div className="timer-actions">
                    <Button size="icon-sm" variant="outline" onClick={() => setTimerRunning((value) => !value)} aria-label={timerRunning ? "暂停" : "开始"}>
                      {timerRunning ? <Pause /> : <Play />}
                    </Button>
                    <Button size="icon-sm" variant="ghost" onClick={resetTest} aria-label="重置"><RotateCcw /></Button>
                  </div>
                </div>
                {!activeArticle.paragraphs && <div className="reveal-setting">
                  <Settings2 />
                  <div>
                    <span>讲解解锁</span>
                    <Select value={revealTiming} onValueChange={(value) => setRevealTiming(value as RevealTiming)}>
                      <SelectTrigger size="sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">标记后立即</SelectItem>
                        <SelectItem value="sentence">完成当前句后</SelectItem>
                        <SelectItem value="article">完成全文后</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>}
              </section>

              <div className="test-instruction">
                <Flag />
                <p><strong>模拟考场：</strong>{activeArticle.kind === "cloze"
                  ? `正文只保留真正的${questionNumberLabel(questions, "空")}，不再显示额外句子序号。点选项字母作答；词汇讲解按你的设置解锁。`
                  : activeArticle.kind === "writing"
                    ? "按原题要求独立写作，草稿沿用现有学习记录保存。提交后可对照教学范文和自查清单；不自动评分。需要修改时选择继续修改，保留原草稿。"
                  : activeArticle.kind === "translation"
                    ? isPassageTranslation
                      ? "按原卷整篇完成英译汉，一次提交全文。提交后对照参考译文，并按需展开逐句解析；不作自动评分。"
                      : `逐句完成英译汉。提交本句后即可对照参考译文与完整句读，全部 ${translationTasks.length} 句提交后本篇完成。`
                    : activeArticle.paragraphs ? `按原卷段落限时默读，再完成${questionNumberLabel(questions)}。初读不提供查词提示；可在文末标记难句，提交后查看解析。` : `先限时默读全文，再完成${questionNumberLabel(questions)}；不提前显示逐句讲解。点选项字母作答；词汇讲解按你的设置解锁。`}</p>
              </div>

              {questions.length > 0 && <nav className="study-section-nav" aria-label="题目快捷入口">
                <Button variant="outline" onClick={() => document.getElementById("test-questions")?.scrollIntoView({ behavior: "smooth", block: "start" })}>直接查看题目（{questions.length}题）</Button>
                <Button variant="outline" onClick={() => openQuestionStudy()}>学习题目与选项解析</Button>
              </nav>}
              {activeArticle.kind === "writing" ? (
                <section className="writing-test-section">
                  {writingTasks.map(task => {
                    const taskKey = translationAnswerKey(activeArticle.id, task.id);
                    return <WritingTestTask key={taskKey} task={task} answer={translationAnswers[taskKey] ?? ""} submitted={Boolean(submittedTranslationTasks[taskKey])}
                      onAnswer={value => setTranslationAnswers(current => ({ ...current, [taskKey]: value }))}
                      onSubmit={() => submitTranslationTask(task)}
                      onEdit={() => {
                        setSubmittedTranslationTasks(current => ({ ...current, [taskKey]: false }));
                        setSubmittedSections(current => ({ ...current, [activeSection]: false }));
                      }} onTerm={openTerm} />;
                  })}
                </section>
              ) : activeArticle.kind === "translation" ? (
                <section className="translation-test-section">
                  <div className="translation-test-heading">
                    <div><span>英译汉</span><strong>{submittedTranslationCount}/{translationTasks.length} {isPassageTranslation ? "题" : "句"}已提交</strong></div>
                    {submitted && <Badge className="score-badge">本篇已完成</Badge>}
                  </div>
                  <div className="translation-task-list">
                    {translationTasks.map((task) => {
                      const taskKey = translationAnswerKey(activeArticle.id, task.id);
                      return (
                        <TranslationTestTask
                          key={taskKey}
                          task={task}
                          answer={translationAnswers[taskKey] ?? ""}
                          submitted={Boolean(submittedTranslationTasks[taskKey])}
                          onAnswer={(value) => setTranslationAnswers((current) => ({ ...current, [taskKey]: value }))}
                          onSubmit={() => submitTranslationTask(task)}
                          onTerm={openTerm}
                        />
                      );
                    })}
                  </div>
                </section>
              ) : (
                <>
                  {activeArticle.paragraphs ? <OriginalPassage selection={locatingQuestionId && questions.some(q => q.id === locatingQuestionId) ? {
                    questionNumber: questions.find(q => q.id === locatingQuestionId)!.number ?? locatingQuestionId,
                    ids: questionWork[locatingQuestionId]?.sentenceIds ?? [],
                    onToggle: id => setQuestionWork(current => { const work = current[locatingQuestionId] ?? { scope: "", sentenceIds: [] }; return { ...current, [locatingQuestionId]: { ...work, sentenceIds: work.sentenceIds.includes(id) ? work.sentenceIds.filter(s => s !== id) : [...work.sentenceIds, id] } }; }),
                    onDone: finishLocationSelection,
                  } : undefined} article={activeArticle} marked={sentenceMarks} onMark={id => setSentenceMarks(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; })} /> : <div className="test-passage">
                    {sentences.map((sentence) => (
                      <article key={sentence.id} className="test-sentence" aria-label={`原文第 ${sentence.number} 句`}>
                        <p>{renderInteractiveText(sentence.testText ?? sentence.text, sentence.phrases, sentence.id, openTerm, false)}</p>
                      </article>
                    ))}
                  </div>}

                  <section className="question-section" id="test-questions">
                    <div className="question-heading">
                      <div><span>{activeArticle.kind === "cloze" ? "完形选择" : questions.every(question => question.format === "true-false") ? "阅读判断（T / F）" : questions.every(question => question.format === "matching") ? "人物观点匹配（A—G）" : "阅读选择"}</span><strong>{selectedAnswers}/{questions.length} 已作答</strong></div>
                      {submitted && <Badge className="score-badge">{correctAnswers}/{questions.length}</Badge>}
                    </div>
                    {questions.filter(question => question.format === "matching" && question.id === question.sharedOptionsId).map(question => <MatchingOptionBank key={question.id} question={question} onTerm={openTerm} />)}
                    <div className="question-grid">
                      {questions.map((question) => (
                        <article key={question.id} className="question-card">
                          <div className="question-prompt" id={`source-question-${question.id}-prompt`} tabIndex={-1} data-source-location>
                            <span>{question.number ?? question.id}</span>
                            <p>{activeArticle.paragraphs && !submitted ? question.prompt : renderWords(question.prompt, `question-${question.id}-prompt`, openTerm, `question-${question.id}`)}</p>
                          </div>
                          <div className={`option-list ${question.format === "matching" ? "matching-choices" : ""}`}>
                            {question.options.map((option) => {
                              const selected = answers[question.id] === option.key;
                              const correct = submitted && option.key === question.answer;
                              const wrong = submitted && selected && option.key !== question.answer;
                              return (
                                <div key={option.key} className={`option-row ${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`} id={question.format === "matching" ? undefined : `source-question-${question.id}-option-${option.key}`} tabIndex={-1} data-source-location={question.format === "matching" ? undefined : true}>
                                  <button
                                    type="button"
                                    className="option-choice"
                                    onClick={() => !submitted && setAnswers((current) => ({ ...current, [question.id]: option.key }))}
                                    aria-label={`选择 ${option.key} ${option.text}`}
                                    aria-pressed={selected}
                                  >
                                    <span>{option.key}</span>{correct && <Check />}
                                  </button>
                                  {question.format !== "matching" && <div className="option-terms">
                                    {activeArticle.paragraphs && !submitted ? <button className="plain-option-text" type="button" onClick={() => setAnswers(current => ({ ...current, [question.id]: option.key }))}>{option.text}</button> : renderWords(option.text, `question-${question.id}-option-${option.key}`, openTerm, `option-${question.id}-${option.key}`)}
                                    {(!activeArticle.paragraphs || submitted) && option.text.includes(" ") && getPhraseKnowledge(option.text) && (
                                      <button
                                        type="button"
                                        className="phrase-action option-phrase-action"
                                        onClick={() => openTerm(option.text, `question-${question.id}-option-${option.key}`, true)}
                                        aria-label={`查看词组 ${option.text}`}
                                      >词组</button>
                                    )}
                                  </div>}
                                </div>
                              );
                            })}
                          </div>
                          {question.format === "matching" && answers[question.id] && <p className="matching-selected">已选 {answers[question.id]}：{question.options.find(option => option.key === answers[question.id])?.text}</p>}
                          {submitted && editingLocationId !== question.id && (question.reasoning ? <QuestionEvidencePanel question={question} openSections={evidenceSections[question.id] ?? []} onSectionToggle={(id, open) => setEvidenceSections(current => { const sections = current[question.id] ?? []; return sections.includes(id) === open ? current : { ...current, [question.id]: open ? [...sections, id] : sections.filter(value => value !== id) }; })} onSentence={(id, option) => visitQuestionEvidence(question, id, Date.now(), option)} /> : (
                            <div className="answer-analysis">
                              <p className="locating"><Layers3 /><span>{renderWords(question.locating, question.sentenceId, openTerm, `locating-${question.id}`)}</span></p>
                              {question.options.map((option) => (
                                <p key={option.key}>
                                  <strong>{option.key}</strong>
                                  {renderWords(questionExplanation(question, option.key), question.sentenceId, openTerm, `explanation-${question.id}-${option.key}`)}
                                </p>
                              ))}
                            </div>
                          ))}
                          {question.reasoning && <QuestionLocationPractice question={question} sentences={sentences} work={questionWork[question.id] ?? { scope: "", sentenceIds: [] }} submitted={submitted} editing={editingLocationId === question.id} history={locationHistory(locationAttempts, question.id)}
                            onChange={work => setQuestionWork(current => ({ ...current, [question.id]: work }))} onSelect={() => selectLocationInPassage(question.id)} onRetry={() => startLocationReview(question.id, Date.now())} onSave={() => { saveLocation(question, "review", Date.now()); setEditingLocationId(null); setLocatingQuestionId(null); }} />}
                          {submitted && editingLocationId !== question.id && question.analysis && (
                            <QuestionAnalysisPanel question={question} onTerm={openTerm} />
                          )}
                          <Button className="question-study-link" variant="outline" onClick={() => openQuestionStudy(question.id)}>进入第{question.number ?? question.id}题精读 · 查看解析与用法</Button>
                        </article>
                      ))}
                    </div>
                    <Button
                      size="lg"
                      className="submit-test"
                      disabled={selectedAnswers !== questions.length || submitted}
                      onClick={() => {
                        const at = Date.now();
                        questions.forEach(question => saveLocation(question, "initial", at));
                        setSubmittedSections((current) => ({ ...current, [activeSection]: true }));
                        setTimerRunning(false);
                      }}
                    >
                      <CircleCheck />{submitted ? "已提交" : `提交答案（${selectedAnswers}/${questions.length}）`}
                    </Button>
                  </section>
                </>
              )}
            </TabsContent>

            <TabsContent value="review" className="mode-content">
              <TrainingReview articles={Object.values(articleContents)} attempts={practiceAttempts} reflections={learningReflections} questionWork={questionWork} locationAttempts={locationAttempts} submitted={submittedSections} now={reviewNow} onSentence={(id, taskId) => { openPracticeSentence(id, Date.now(), taskId); }} onQuestion={id => { const article = questionArticle.get(id); if (article) { startLocationReview(id, Date.now()); setActiveSection(article.id); setSelectedYear(article.year); setView("test"); window.setTimeout(() => document.getElementById(`source-question-${id}-prompt`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); } }} />
              <section className="review-board">
                <div className="review-board-heading">
                  <div>
                    <Badge className="paper-badge">个人复习库</Badge>
                    <h3>把今天暴露的问题留到明天解决</h3>
                    <p>按实际到期时间安排复习；整句与错题未设间隔，列入已到期。同一词可保留多个语境。</p>
                  </div>
                  <div className="review-stat"><span>今日待复习</span><strong>{reviewCount}</strong></div>
                </div>

                <div className="review-columns">
                  <div className="review-panel">
                    <div className="panel-heading"><ListChecks /><strong>自动复习队列</strong></div>
                    <div className="review-filters" aria-label="选择复习时间">
                      {([
                        ["due", `已到期 ${reviewCount}`],
                        ["overdue", `逾期 ${overdueKeys.length}`],
                        ["all", `全部 ${allReviewCount}`],
                      ] as Array<[ReviewScope, string]>).map(([value, label]) => (
                        <Button key={value} size="sm" aria-pressed={reviewScope === value} variant={reviewScope === value ? "default" : "outline"} onClick={() => setReviewScope(value)}>{label}</Button>
                      ))}
                    </div>
                    <div className="review-filters" aria-label="选择复习范围">
                      {([
                        ["all", "全部类型"],
                        ["word", "单词"],
                        ["phrase", "词组"],
                        ["sentence", "整句"],
                        ["question", "错题"],
                      ] as Array<[ReviewFilter, string]>).map(([value, label]) => (
                        <Button key={value} size="sm" aria-pressed={reviewFilter === value} variant={reviewFilter === value ? "default" : "outline"} onClick={() => setReviewFilter(value)}>{label}</Button>
                      ))}
                    </div>
                    {visibleReviewCount === 0 ? (
                      <div className="empty-review"><Sparkles /><p>{allReviewCount === 0 ? "还没有标记内容。去自测模式点一个陌生词试试。"
                        : reviewScope === "due" && reviewCount === 0 ? "暂无到期项目，可在“全部”查看后续复习安排。"
                          : "这个复习范围里暂时没有项目。"}</p></div>
                    ) : (
                      <div className="marked-list">
                        {visibleMarkedKeys.map((key) => {
                          const dueLabel = formatReviewDue(reviewSchedule[key], reviewNow);
                          const context = resolveSavedTermContext(key, termContexts[termContextKey(key)]);
                          return (
                            <button key={key} type="button" onClick={() => openSavedTerm(key)}>
                              <span><strong>{context.selected?.headword ?? context.options[0]?.headword ?? key}</strong><small>{marks[key].join(" · ")}</small>
                                <small>{context.selected ? sourceCaption(context.selected.sourceId) : context.options.length > 1 ? `${context.options.length} 个出处 · 点击选择复习语境` : "通用词条"}</small></span>
                              <Badge variant="outline">{dueLabel}</Badge>
                            </button>
                          );
                        })}
                        {visibleSentenceMarks.map((sentenceId) => {
                          const sentence = allSentences.find((item) => item.id === sentenceId);
                          if (!sentence) return null;
                          const article = sentenceArticle.get(sentenceId);
                          return (
                            <button key={sentenceId} type="button" onClick={() => {
                              if (article) {
                                setActiveSection(article.id);
                                setSelectedYear(article.year);
                              }
                              setExpanded((current) => new Set(current).add(sentenceId));
                              setView("study");
                            }}>
                              <span><strong>{article?.label ?? "真题"} · 第 {sentence.number} 句</strong><small>{sentence.text.slice(0, 62)}…</small></span>
                              <Badge variant="outline">整句</Badge>
                            </button>
                          );
                        })}
                        {visibleWrongQuestions.map((question) => (
                          <button key={`wrong-${question.id}`} type="button" onClick={() => {
                            const article = questionArticle.get(question.id);
                            if (article) {
                              setActiveSection(article.id);
                              setSelectedYear(article.year);
                            }
                            setView("test");
                          }}>
                            <span><strong>第 {question.number ?? question.id} 题</strong><small>{questionArticle.get(question.id)?.label ?? "真题"} · 已自动收录错题与错误选项</small></span>
                            <Badge variant="outline">错题</Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="review-panel">
                    <div className="panel-heading"><NotebookPen /><strong>自定义清单</strong></div>
                    <div className="list-create">
                      <Input value={newListName} onChange={(event) => setNewListName(event.target.value)} placeholder="例如：完形易混词" />
                      <Button size="icon" onClick={createList} aria-label="创建清单"><Plus /></Button>
                    </div>
                    <div className="custom-lists">
                      {lists.map((list) => (
                        <div key={list} className="custom-list-card">
                          <div className="custom-list-heading">
                            <span><strong>{list}</strong><small>{listItems[list]?.length ?? 0} 个项目</small></span>
                            <Button size="icon-sm" variant="ghost" onClick={() => removeList(list)} aria-label={`删除${list}`}><Trash2 /></Button>
                          </div>
                          {(listItems[list]?.length ?? 0) > 0 && (
                            <div className="custom-list-items">
                              {listItems[list].map((key) => (
                                <button key={key} type="button" onClick={() => openSavedTerm(key, list)}>{vocab[key]?.headword ?? findTermContexts(key)[0]?.headword ?? key}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="vocabulary" className="mode-content">
              <YearVocabularyPanel
                year={selectedYear}
                words={yearWordItems}
                phrases={yearPhraseItems}
                filter={vocabularyFilter}
                search={vocabularySearch}
                onFilter={setVocabularyFilter}
                onSearch={setVocabularySearch}
                onTerm={openTerm}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Sheet
        open={Boolean(selectedTerm || contextPicker)}
        onOpenChange={(open) => {
          if (!open) {
            setContextPicker(null);
            setSelectedTerm(null);
            setTermHistory([]);
            setReviewContextTarget(null);
          }
        }}
      >
        <SheetContent className="term-sheet sm:max-w-lg" onCloseAutoFocus={(event) => {
          if (!sourceNavigation.current) return;
          event.preventDefault();
          const target = document.getElementById(sourceNavigation.current);
          sourceNavigation.current = null;
          target?.focus({ preventScroll: true });
          target?.scrollIntoView({ block: "start" });
        }}>
          {contextPicker ? (
            <>
              <SheetHeader className="term-sheet-header">
                <SheetTitle>{contextPicker.remember ? "选择复习语境" : "选择词条语境"}</SheetTitle>
                <SheetDescription>{contextPicker.remember
                  ? "选择要复习的真实出处；此选择只影响当前复习项或清单，不改动词条和笔记。"
                  : "查看同一词条在不同原句中的含义；浏览切换不会改动已保存的复习语境或笔记。"}</SheetDescription>
              </SheetHeader>
              <div className="term-context-options">
                {contextPicker.options.map((context, index) => (
                  <button type="button" key={context.sourceId} ref={index === 0 ? firstContextOption : undefined} onClick={() => chooseTermContext(context)}>
                    <strong>{sourceCaption(context.sourceId)}</strong>
                    <span>{sourceById.get(context.sourceId)?.text}</span>
                    <small>{resolveEntry(context.label, context.kind === "phrase", context.sourceId).contextualMeaning}</small>
                  </button>
                ))}
              </div>
            </>
          ) : selectedTerm && (
            <>
              <SheetHeader className="term-sheet-header">
                <div className="term-header-row">
                  <div className="term-kicker">
                    <Badge variant="outline">{termIsLocked ? "自测标记" : selectedTerm.entry.kind === "phrase" ? "语法 / 搭配" : selectedTerm.entry.partOfSpeech}</Badge>
                    <span>{selectedTermSource?.article.badge ?? "通用词条"}</span>
                  </div>
                  {termHistory.length > 0 && (
                    <button type="button" className="term-back" onClick={goBackTerm}>
                      <ArrowLeft />返回上一词条
                    </button>
                  )}
                </div>
                <SheetTitle className="term-title">{selectedTerm.entry.display}</SheetTitle>
                <SheetDescription>
                  {termIsLocked
                    ? "先标记问题；讲解会按你的自测设置解锁。"
                    : selectedTerm.entry.kind === "phrase"
                      ? "先看原文实例和规范结构，再按层展开语法。"
                      : "先看本句义，再展开其他义项、用法和各年份的语境中文义。"}
                </SheetDescription>
              </SheetHeader>

              <div className="term-sheet-scroll">
                {!termIsLocked && (
                  <>
                    {selectedTermSource && (
                      <section className="term-source-context" aria-label="当前词条出处">
                        <strong>{sourceCaption(selectedTermSource.id)}</strong>
                        <p>{selectedTermSource.text}</p>
                        <Button size="sm" variant="outline" onClick={() => goToSource(selectedTermSource.id)}>
                          {selectedTermSource.sentenceId ? "回到原句精读" : "回到题目出处"}
                        </Button>
                        {findTermContexts(selectedTerm.key).length > 1 && (
                          <Button size="sm" variant="outline" onClick={() => {
                            const target = reviewContextTarget?.key === selectedTerm.key ? reviewContextTarget : undefined;
                            setContextPicker({ key: selectedTerm.key, list: target?.list, options: findTermContexts(selectedTerm.key), remember: Boolean(target) });
                            setSelectedTerm(null);
                            setTermHistory([]);
                          }}>{reviewContextTarget?.key === selectedTerm.key ? "切换复习语境" : "切换词条语境"}</Button>
                        )}
                      </section>
                    )}
                    <section className="term-facts" aria-label="词条基本信息">
                      {selectedTerm.entry.kind === "phrase" ? (
                        <>
                          <div><span>原文实例</span><strong>{selectedTerm.label}</strong></div>
                          <div><span>规范结构</span><strong>{selectedTerm.entry.canonicalForm ?? selectedTerm.entry.headword}</strong></div>
                          <div><span>类型</span><strong>{selectedTerm.entry.partOfSpeech}</strong></div>
                        </>
                      ) : (
                        <>
                          <div><span>当前词形</span><strong>{selectedTerm.label}</strong></div>
                          <div><span>原形</span><strong>{selectedTerm.entry.headword}</strong></div>
                          <div><span>词性</span><strong>{selectedTerm.entry.partOfSpeech}</strong></div>
                        </>
                      )}
                    </section>

                    <section className="term-meaning">
                      <span>{selectedTermSource ? "本句义" : "词条释义"}</span>
                      <strong>{selectedTerm.entry.contextualMeaning}</strong>
                      <p>{selectedTerm.entry.use}</p>
                    </section>
                    {selectedTermPriority && <section className="term-priority"><Badge variant="outline">{selectedTermPriority.label}</Badge><p>{selectedTermPriority.reason}</p><small>本篇学习建议，不是官方词频排名。</small></section>}
                    {selectedTerm.entry.collocationDetails?.[0] && <p className="term-key-collocation"><b>先记一个搭配：</b>{selectedTerm.entry.collocationDetails[0].label} · {selectedTerm.entry.collocationDetails[0].meaning}</p>}

                    <TermSenses entry={selectedTerm.entry} onSource={goToSource} />

                    {(selectedTerm.entry.contextualSubstitutions?.length ?? 0) > 0 && (<details className="term-extra"><summary>本句可替换表达</summary>
                      <ContextualSubstitutions
                        entry={selectedTerm.entry}
                        sentenceId={selectedTerm.sentenceId}
                        onReference={openReference}
                      />
                    </details>)}

                    {(selectedTerm.entry.grammarSummary || selectedTerm.entry.grammarRole) && (<details className="term-extra"><summary>词条语法与结构</summary>
                      <section className="knowledge-overview">
                        <div>
                          <span>{selectedTerm.entry.kind === "phrase" ? "规范结构" : "核心句法"}</span>
                          <strong>{selectedTerm.entry.canonicalForm ?? selectedTerm.entry.structures?.[0]?.pattern ?? selectedTerm.entry.grammarRole}</strong>
                        </div>
                        <p>{selectedTerm.entry.grammarSummary ?? selectedTerm.entry.grammarRole}</p>
                      </section>
                    </details>)}

                    <TermDetails
                      entry={selectedTerm.entry}
                      sentenceId={selectedTerm.sentenceId}
                      onReference={openReference}
                      onSource={goToSource}
                    />
                  </>
                )}

                <section className="mark-section">
                  <span>这次遇到了什么问题？</span>
                  <div className="mark-buttons">
                    {markTags.map((tag) => (
                      <Button
                        key={tag}
                        size="sm"
                        variant={marks[selectedTerm.key]?.includes(tag) ? "default" : "outline"}
                        onClick={() => toggleMark(selectedTerm.key, tag, Date.now())}
                      >{tag}</Button>
                    ))}
                  </div>
                </section>

                {lists.length > 0 && (
                  <section className="list-membership">
                    <span>加入自定义清单</span>
                    <div>
                      {lists.map((list) => {
                        const included = listItems[list]?.includes(selectedTerm.key);
                        return (
                          <Button
                            key={list}
                            size="sm"
                            variant={included ? "default" : "outline"}
                            onClick={() => toggleListItem(list, selectedTerm.key)}
                          >{included ? <Check /> : <Plus />}{list}</Button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {termIsLocked ? (
                  <section className="locked-explanation">
                    <LockKeyhole />
                    <h3>讲解暂时隐藏</h3>
                    <p>{revealTiming === "article" ? "完成整篇并提交答案后统一解锁。" : "先在心中完成本句翻译，再主动解锁。"}</p>
                    {revealTiming === "sentence" && (
                      <Button onClick={() => setUnlockedTerms((current) => new Set(current).add(selectedTerm.key))}>我已完成本句，查看讲解</Button>
                    )}
                  </section>
                ) : null}

                {!termIsLocked && (
                  <section className="rating-section">
                    <span>本次掌握情况</span>
                    <div>
                      {ratings.map((rating) => (
                        <Button
                          key={rating}
                          size="sm"
                          variant={termRatings[selectedTerm.key] === rating ? "default" : "ghost"}
                          onClick={() => rateTerm(selectedTerm.key, rating, Date.now())}
                        >{rating}</Button>
                      ))}
                    </div>
                  </section>
                )}

                <section className="note-section">
                  <label htmlFor="term-note"><NotebookPen />个人笔记</label>
                  <Textarea
                    id="term-note"
                    value={termNotes[selectedTerm.key] ?? ""}
                    onChange={(event) => setTermNotes((current) => ({ ...current, [selectedTerm.key]: event.target.value }))}
                    placeholder="例如：rate 是利率，容易和 ratio 混淆……"
                  />
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={accountOpen} onOpenChange={(open) => {
        setAccountOpen(open);
        if (!open) {
          setLoginPassword("");
          setNewPassword("");
          setPasswordConfirmation("");
          setAuthError("");
          setAuthMessage("");
        }
      }}>
        <SheetContent className="account-sheet sm:max-w-md">
          <SheetHeader>
            <div className="account-icon"><Mail /></div>
            <SheetTitle>个人账号与同步</SheetTitle>
            <SheetDescription>邮箱密码快捷登录，验证码用于首次登录或重设密码。本机记录仍可离线使用。</SheetDescription>
          </SheetHeader>

          <div className="account-status-list">
            <Button type="button" variant="outline" onClick={exportLocalBackup}>导出本机备份</Button>
            {hasLegacyBackup && <p>旧版本机记录已单独保留，可导出备份；不会自动覆盖登录账号。</p>}
            {!userEmail && syncError && <p className="auth-error" role="alert">{syncError}</p>}
            {!userEmail && authMessage && <p className="auth-success" role="status">{authMessage}</p>}
          </div>

          {!userEmail && sessionCheckState === "loading" && <div className="account-content" role="status">正在检查登录服务…</div>}
          {!userEmail && sessionCheckState === "error" && <div className="account-content">
            <p className="auth-error" role="alert">{sessionCheckError}</p>
            <Button type="button" variant="outline" disabled={authBusy} onClick={() => void checkSession()}>重试检查登录服务</Button>
          </div>}

          {userEmail ? (
            <div className="account-content">
              <div className="signed-in-card">
                <CircleCheck />
                <div><span>已登录</span><strong>{userEmail}</strong></div>
              </div>
              <div className="account-status-list">
                <p><Cloud /><span>手机与电脑联网后自动同步学习记录</span></p>
                <p><WifiOff /><span>离线时继续学习，恢复网络后补传</span></p>
              </div>
              {syncError && <p className="auth-error" role="alert">{syncError}</p>}
              {(syncError || !remoteReady) && <Button type="button" variant="outline" disabled={authBusy || syncState === "saving"} onClick={() => void restoreAccount(userEmail)}>重试同步</Button>}
              {conflictingRemote?.state && <Button type="button" variant="outline" disabled={authBusy || syncState === "saving"} onClick={useCloudRecords}>使用云端记录（本机另存备份）</Button>}
              {hasLegacyBackup && <Button type="button" variant="outline" disabled={authBusy || !remoteReady || syncState === "saving"} onClick={restoreLegacyRecords}>恢复本机旧记录到当前账号</Button>}
              {passwordConfigured ? (
                <form className="account-form" onSubmit={(event) => { event.preventDefault(); void saveAccountPassword(); }}>
                  <h3>{hasPassword ? "更新密码" : "设置密码"}</h3>
                  <label htmlFor="new-account-password">新密码</label>
                  <Input id="new-account-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required disabled={authBusy} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                  <label htmlFor="confirm-account-password">确认新密码</label>
                  <Input id="confirm-account-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required disabled={authBusy} value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
                  <small>8—128 个字符即可，无需组合大小写或特殊符号。忘记密码时可使用邮箱验证码登录后重设。</small>
                  <Button type="submit" disabled={authBusy || !newPassword || !passwordConfirmation}>{authBusy ? "正在保存…" : "保存密码"}</Button>
                </form>
              ) : <small>密码服务暂不可用，暂时无法设置或修改密码。</small>}
              {authError && <p className="auth-error" role="alert">{authError}</p>}
              {authMessage && <p className="auth-success" role="status">{authMessage}</p>}
              <Button type="button" variant="outline" disabled={authBusy} onClick={signOut}><LogOut />退出账号</Button>
            </div>
          ) : sessionCheckState !== "ready" ? null : emailConfigured || passwordConfigured ? (
            <form className="account-content" onSubmit={(event) => {
              event.preventDefault();
              if (authMode === "password") void loginWithPassword();
              else if (requestId) void verifyLoginCode();
              else void requestLoginCode();
            }}>
              <div className="account-methods" role="group" aria-label="登录方式">
                <Button type="button" variant={authMode === "password" ? "default" : "outline"} aria-pressed={authMode === "password"} disabled={authBusy || !passwordConfigured} onClick={() => changeAuthMode("password")}>密码登录</Button>
                <Button type="button" variant={authMode === "code" ? "default" : "outline"} aria-pressed={authMode === "code"} disabled={authBusy || !emailConfigured} onClick={() => changeAuthMode("code")}>验证码登录</Button>
              </div>
              <label htmlFor="account-email">邮箱</label>
              <Input
                id="account-email"
                type="email"
                autoComplete="username"
                required
                value={accountEmail}
                onChange={(event) => setAccountEmail(event.target.value)}
                placeholder="name@example.com"
                disabled={authBusy || Boolean(requestId)}
              />
              {authMode === "password" ? (
                <>
                  <label htmlFor="account-password">密码</label>
                  <Input id="account-password" type="password" autoComplete="current-password" minLength={8} maxLength={128} required disabled={authBusy} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
                </>
              ) : requestId && (
                <>
                  <label htmlFor="otp-code">6 位验证码</label>
                  <Input
                    id="otp-code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    disabled={authBusy}
                    value={otpCode}
                    onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="otp-field"
                  />
                </>
              )}
              {authError && <p className="auth-error" role="alert">{authError}</p>}
              {authMode === "password" ? (
                <>
                  <Button type="submit" disabled={authBusy || !accountEmail.trim() || loginPassword.length < 8}>{authBusy ? "正在登录…" : "登录"}</Button>
                  <Button type="button" variant="ghost" disabled={authBusy || !emailConfigured} onClick={() => changeAuthMode("code")}>首次使用 / 忘记密码？用验证码登录</Button>
                </>
              ) : requestId ? (
                <>
                  <Button type="submit" disabled={authBusy || otpCode.length !== 6}>{authBusy ? "正在验证…" : "验证并登录"}</Button>
                  <Button type="button" variant="ghost" disabled={authBusy} onClick={() => { setRequestId(null); setOtpCode(""); setAuthError(""); }}>更换邮箱 / 重新获取</Button>
                </>
              ) : (
                <Button type="submit" disabled={authBusy || !accountEmail.trim()}>{authBusy ? "正在发送…" : "发送验证码"}</Button>
              )}
              <small>{authMode === "code" ? "验证码有效期 10 分钟。首次登录后，可在此面板设置密码，下次直接登录。" : "已有验证码账号仍是同一个账号，学习记录不变。首次使用需先通过验证码登录并设置密码。"}</small>
              {!emailConfigured && <small>邮件服务暂不可用，已设置密码的账号仍可登录。</small>}
              {passwordUnavailable && emailConfigured && <small>密码服务暂不可用，可使用邮箱验证码登录。</small>}
            </form>
          ) : (
            <div className="account-content">
              <div className="provider-pending">
                <LockKeyhole />
                <h3>登录服务暂不可用</h3>
                <p>暂时无法使用账号登录，请稍后重试。本机学习记录仍保留在当前设备。</p>
              </div>
              <Button type="button" variant="outline" disabled={authBusy} onClick={() => void checkSession()}>重试检查登录服务</Button>
              <div className="account-status-list">
                <p><CircleCheck /><span>当前设备自动保存</span></p>
                <p><CircleCheck /><span>已缓存内容可离线打开</span></p>
                <p><Clock3 /><span>登录服务恢复后可使用账号同步</span></p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function groupByInitial<T>(items: T[], labelOf: (item: T) => string) {
  const groups = new Map<string, T[]>();
  items.forEach((item) => {
    const initial = labelOf(item).trim().charAt(0).toUpperCase() || "#";
    groups.set(initial, [...(groups.get(initial) ?? []), item]);
  });
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b, "en"));
}

function YearVocabularyPanel({
  year,
  words,
  phrases,
  filter,
  search,
  onFilter,
  onSearch,
  onTerm,
}: {
  year: number;
  words: YearWordItem[];
  phrases: YearPhraseItem[];
  filter: VocabularyFilter;
  search: string;
  onFilter: (filter: VocabularyFilter) => void;
  onSearch: (value: string) => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  const query = search.trim().toLowerCase();
  const visibleWords = searchYearWordItems(words, search);
  const visiblePhrases = phrases.filter((item) => !query || [
    item.source,
    item.canonical,
    item.meaning,
    item.type,
  ].join(" ").toLowerCase().includes(query));
  const resultCount = filter === "word" ? visibleWords.length : visiblePhrases.length;

  return (
    <section className="year-vocabulary-board">
      <div className="vocabulary-controls">
        <div className="vocabulary-switch" aria-label="选择年度词表类型">
          <Button size="sm" variant={filter === "word" ? "default" : "outline"} onClick={() => onFilter("word")}>
            单词 <span>{words.length}</span>
          </Button>
          <Button size="sm" variant={filter === "phrase" ? "default" : "outline"} onClick={() => onFilter("phrase")}>
            词组 <span>{phrases.length}</span>
          </Button>
        </div>
        <Input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="搜索英文、中文释义或词性"
          aria-label="搜索本年词汇"
          className="vocabulary-search"
        />
      </div>

      <div className="vocabulary-scope-note">
        <Badge variant="outline">{year} · 已精审内容</Badge>
        <p>当前覆盖已导入文章的正文、题干、选项和英译汉句子；新增精审内容会自动加入本表。</p>
        <strong>{resultCount} 个结果</strong>
      </div>

      {resultCount === 0 ? (
        <div className="vocabulary-empty"><BookOpenText /><p>没有找到匹配词条，请换一个英文或中文关键词。</p></div>
      ) : filter === "word" ? (
        <div className="vocabulary-groups">
          {groupByInitial(visibleWords, (item) => item.headword).map(([initial, items]) => (
            <section key={initial} className="vocabulary-letter-group">
              <div className="vocabulary-letter"><strong>{initial}</strong><span>{items.length}</span></div>
              <div className="vocabulary-entry-grid">
                {items.map((item) => (
                  <button
                    type="button"
                    key={item.headword}
                    className="vocabulary-entry"
                    onClick={() => onTerm(item.sourceForm, item.sentenceId, false)}
                  >
                    <span className="vocabulary-entry-heading">
                      <strong>{item.headword}</strong>
                      <small>{item.partOfSpeech}</small>
                    </span>
                    <span className="vocabulary-entry-meaning">{item.meaning}</span>
                    <span className="vocabulary-entry-meta">
                      <span>{item.forms.length > 1 ? `原文词形：${item.forms.join(" / ")}` : `原文词形：${item.forms[0]}`}</span>
                      <span>{item.contexts.length} 处语境</span>
                      <b>{item.count} 次</b>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="vocabulary-groups">
          {groupByInitial(visiblePhrases, (item) => item.source).map(([initial, items]) => (
            <section key={initial} className="vocabulary-letter-group">
              <div className="vocabulary-letter"><strong>{initial}</strong><span>{items.length}</span></div>
              <div className="vocabulary-entry-grid phrase-grid">
                {items.map((item) => (
                  <button
                    type="button"
                    key={item.source}
                    className="vocabulary-entry phrase-entry"
                    onClick={() => onTerm(item.source, item.sentenceId, true)}
                  >
                    <span className="vocabulary-entry-heading">
                      <strong>{item.source}</strong>
                      <small>{item.type}</small>
                    </span>
                    {item.canonical.toLowerCase() !== item.source.toLowerCase() && (
                      <span className="canonical-pattern">规范结构：{item.canonical}</span>
                    )}
                    <span className="vocabulary-entry-meaning">{item.meaning}</span>
                    <span className="vocabulary-entry-meta"><span>本年度原文表达次数</span><b>{item.count} 次</b></span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}

const knownAnalysisPhrases = Array.from(new Set([
  ...allSentences.flatMap((sentence) => sentence.phrases),
  ...allQuestions.flatMap((question) => question.options
    .map((option) => option.text)
    .filter((text) => text.includes(" ") && Boolean(getPhraseKnowledge(text)))),
]));

function analysisPhrases(analysis: SentenceAnalysis) {
  const candidates = [...analysis.phrases, ...knownAnalysisPhrases];
  const lower = analysis.text.toLowerCase();
  return Array.from(new Set(candidates.filter((phrase) => lower.includes(phrase.toLowerCase()))));
}

export function MatchingOptionBank({ question, onTerm }: { question: Question; onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void }) {
  if (question.format !== "matching") return null;
  return <section className="matching-option-bank" aria-label="共用七选项">
    <h3>共用选项 A—G</h3>
    <p>将五个人物与观点对应，有两项多余。先阅读共用选项，再在各题选择字母；点击选项中的单词可查词。</p>
    {question.options.map(option => <div key={option.key} className="option-row" id={`source-${questionOptionSourceId(question, option.key)}`} tabIndex={-1} data-source-location>
      <strong>{option.key}</strong><p>{renderWords(option.text, questionOptionSourceId(question, option.key), onTerm, `shared-${option.key}`)}</p>
    </div>)}
  </section>;
}

/** 精读入口与作答状态分离；所有题型复用原题及稳定的词汇来源 ID。 */
export function QuestionStudyCard({ question, onTerm, onSentence }: {
  question: Question;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
  onSentence: (id: string, option?: string) => void;
}) {
  const optionAnalyses: Partial<Record<QuestionOptionKey, SentenceAnalysis>> = question.analysis?.options ?? {};
  return <article className="question-card question-study-card" aria-label={`第${question.number ?? question.id}题精读`}>
    <div className="question-prompt" id={`source-question-${question.id}-prompt`} tabIndex={-1} data-source-location>
      <span>{question.number ?? question.id}</span>
      <p>{renderWords(question.prompt, `question-${question.id}-prompt`, onTerm, `study-prompt-${question.id}`)}</p>
    </div>
    {question.analysis?.prompt && <QuestionAnalysisBlock label="题干怎么读 · 结构与用法" analysis={question.analysis.prompt} sentenceId={`question-${question.id}-prompt`} onTerm={onTerm} />}
    <div className="study-option-list">
      {question.options.map(option => {
        const sourceId = questionOptionSourceId(question, option.key);
        const judgment = question.reasoning?.options[option.key];
        const analysis = optionAnalyses[option.key];
        const ownsSource = question.format !== "matching" || question.id === question.sharedOptionsId;
        return <section key={option.key} className="study-option" aria-label={`${option.key}项精读`}>
          <div className="study-option-text" id={ownsSource ? `source-${sourceId}` : undefined} tabIndex={-1} data-source-location={ownsSource || undefined}>
            <strong>{option.key}</strong><p>{renderWords(option.text, sourceId, onTerm, `study-${question.id}-${option.key}`)}</p>
          </div>
          {option.text.includes(" ") && getPhraseKnowledge(option.text) && <button type="button" className="guide-source-link" onClick={() => onTerm(option.text, sourceId, true)}>查看整组表达的含义与搭配</button>}
          <details className="study-option-reason">
            <summary>{option.key}项 · 为什么选／不选</summary>
            <p><strong>{judgment ? judgment.judgment : option.key === question.answer ? "本题应选" : "本题不选"}{judgment?.errorType ? ` · ${judgment.errorType}` : ""}</strong></p>
            <p>{renderWords(judgment?.reasoning ?? questionExplanation(question, option.key), sourceId, onTerm, `study-reason-${question.id}-${option.key}`)}</p>
            {judgment ? judgment.evidenceIds.map(id => {
              const evidence = question.reasoning?.evidence.find(item => item.id === id);
              return evidence && <button type="button" key={id} className="guide-source-link" onClick={() => onSentence(evidence.sentenceId, option.key)}>{evidence.role} · 回原文</button>;
            }) : <><p>{question.locating}</p><button type="button" className="guide-source-link" onClick={() => onSentence(question.sentenceId, option.key)}>回原文核对</button></>}
          </details>
          {analysis && <QuestionAnalysisBlock label={`${option.key}项 · 句意、时态与搭配用法`} analysis={analysis} sentenceId={sourceId} onTerm={onTerm} />}
        </section>;
      })}
    </div>
    {question.reasoning && <details className="study-question-reasoning"><summary>整题思路与原文证据</summary><QuestionEvidencePanel question={question} onSentence={onSentence} showOptionDetails={false} /></details>}
    {question.analysis?.answer && <QuestionAnalysisBlock label="答案放回原句怎么读" analysis={question.analysis.answer} sentenceId={question.sentenceId} onTerm={onTerm} />}
    {question.options.some(option => !optionAnalyses[option.key] && option.text.trim().includes(" ")) && <p className="question-analysis-coverage">本题部分选项的整句拆解尚待补充；现有选择依据均可展开，单词和已收录词组可点击查看。</p>}
  </article>;
}

function QuestionAnalysisPanel({
  question,
  onTerm,
}: {
  question: Question;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  const analysis = question.analysis;
  if (!analysis) return null;

  const analysisByOption: Partial<Record<QuestionOptionKey, SentenceAnalysis>> | undefined = analysis.options;
  const optionAnalyses = question.options
    .map((option) => ({ option, analysis: analysisByOption?.[option.key] }))
    .filter((item): item is { option: Question["options"][number]; analysis: SentenceAnalysis } => Boolean(item.analysis));

  return (
    <details className="question-analysis-panel" aria-label={`第 ${question.number ?? question.id} 题语言讲解`}>
      <summary className="question-analysis-heading">
        <BookOpenCheck />
        <strong>题干与选项的结构、时态与搭配</strong>
        <span>按需查看各项语言用法</span>
      </summary>
      {analysis.prompt && (
        <QuestionAnalysisBlock
          label="题干"
          analysis={analysis.prompt}
          sentenceId={`question-${question.id}-prompt`}
          onTerm={onTerm}
        />
      )}
      {optionAnalyses.map(({ option, analysis: optionAnalysis }) => (
        <QuestionAnalysisBlock
          key={`${question.id}-${option.key}`}
          label={`${option.key} 选项`}
          analysis={optionAnalysis}
          sentenceId={questionOptionSourceId(question, option.key)}
          onTerm={onTerm}
        />
      ))}
      {analysis.answer && (
        <QuestionAnalysisBlock
          label={`正确答案：${question.answer}`}
          analysis={analysis.answer}
          sentenceId={question.sentenceId}
          onTerm={onTerm}
          answer
        />
      )}
    </details>
  );
}

export function writingWordCount(text: string): number {
  return (text.match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g) ?? []).length;
}

export function WritingPromptChart({ task }: { task: WritingTask }) {
  const chart = task.chart;
  if (!chart) return null;
  const columns = chart.format === "table" ? chart.columns : ["品牌", "2008年", "2009年"];
  const caption = chart.format === "table" ? chart.caption : "按用户原图刻度读取的近似值，不是精确标签";
  const rows = chart.format === "table" ? chart.rows : chart.rows.map(row => ({ label: row.brand, values: [row.before, row.after] }));
  return <figure className="writing-chart">
    <img src={chart.src} alt={chart.alt} width={chart.width ?? 833} height={chart.height ?? 553} loading="lazy" />
    <figcaption>{chart.note}</figcaption>
    <details><summary>查看图表文字说明</summary><table><caption>{caption}</caption><thead><tr>{columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></details>
  </figure>;
}

export function WritingStudyGuide({ task }: { task: WritingTask }) {
  return <section className="writing-guide" aria-label={`第${task.number}题写作指导`}>
    <p>教学参考，不是唯一标准答案，不作自动评分；范文与教学表达不计入真题词频。</p>
    <details><summary>审题与行文结构</summary>
      <ul>{task.requirements.map(requirement => <li key={requirement}>{requirement}</li>)}</ul>
      {task.outline.map(item => <p key={item.title}><strong>{item.title}：</strong>{item.content}</p>)}
    </details>
    <details><summary>参考范文与逐段说明 · {writingWordCount(task.sample.english.join(" "))}词</summary>
      {task.sample.english.map((paragraph, index) => <div className="writing-sample-paragraph" key={index}>
        <p lang="en">{paragraph}</p><p>{task.sample.chinese[index]}</p><p className="writing-note">{task.sample.notes[index]}</p>
      </div>)}
    </details>
    <details><summary>可迁移表达与使用规则</summary>{task.languageTips.map(tip => <div className="writing-sample-paragraph" key={tip.english}><p lang="en">{tip.english}</p><p>{tip.chinese}</p><p className="writing-note">{tip.usage}</p></div>)}</details>
    <details><summary>自查清单与易错提醒</summary><ul>{task.checklist.map(item => <li key={item}>{item}</li>)}</ul><ul>{task.pitfalls.map(item => <li key={item}>{item}</li>)}</ul></details>
  </section>;
}

export function WritingTestTask({ task, answer, submitted, onAnswer, onSubmit, onEdit, onTerm }: {
  task: WritingTask; answer: string; submitted: boolean;
  onAnswer: (value: string) => void; onSubmit: () => void; onEdit: () => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  const count = writingWordCount(answer);
  const short = task.wordLimit.mode === "at-least" && count < task.wordLimit.count;
  return <article className="writing-task" aria-label={`第${task.number}题写作`}>
    <h2>第{task.number}题 · {task.genre === "letter" ? "应用文书信" : "图表作文"} · {task.points}分</h2>
    <div className="writing-source">{task.instructions.map(sentence => <p key={sentence.id} data-sentence-id={sentence.id}>{renderInteractiveText(sentence.text, sentence.phrases, sentence.id, onTerm, false)}</p>)}</div>
    <WritingPromptChart task={task} />
    <label className="translation-answer-label" htmlFor={`writing-answer-${task.id}`}><span>我的英文作文</span>
      <Textarea id={`writing-answer-${task.id}`} lang="en" value={answer} onChange={event => onAnswer(event.target.value)} disabled={submitted} rows={10} placeholder="在这里独立完成英文写作……" aria-describedby={`writing-count-${task.id}`} />
    </label>
    <p id={`writing-count-${task.id}`} className="writing-count" aria-live="polite">当前{count}词 · 原题要求{task.wordLimit.mode === "about" ? "约" : "至少"}{task.wordLimit.count}词{short ? " · 尚未达到原题最低字数，可先提交自查" : ""}</p>
    <p className="writing-note">按英文单词和数字辅助计数，包含称呼与署名；连字符和缩写按一词计，不作为官方阅卷算法。</p>
    <div className="translation-task-actions"><Button type="button" size="sm" onClick={onSubmit} disabled={!answer.trim() || submitted}>{submitted ? "作文已提交" : "提交作文并自查"}</Button>{submitted && <Button type="button" variant="outline" size="sm" onClick={onEdit}>继续修改（保留草稿）</Button>}</div>
    {submitted && <WritingStudyGuide task={task} />}
  </article>;
}

export function TranslationTestTask({
  task,
  answer,
  submitted,
  onAnswer,
  onSubmit,
  onTerm,
}: {
  task: TranslationTask;
  answer: string;
  submitted: boolean;
  onAnswer: (value: string) => void;
  onSubmit: () => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  return (
    <article className={`translation-task ${submitted ? "is-submitted" : ""}`}>
      {task.format === "passage" && <p className="translation-task-prompt">{task.prompt}</p>}
      <div className="translation-task-source">
        <span className="translation-task-number">{task.number ?? task.id}</span>
        <div className="translation-source-paragraphs">
          {(task.format === "passage" ? task.paragraphs : [[task.analysis]]).map((paragraph) => (
            <p key={paragraph[0].id}>
              {paragraph.map((sentence, index) => (
                <span key={sentence.id} data-sentence-id={sentence.id}>
                  {index > 0 ? " " : ""}{renderInteractiveText(sentence.text, sentence.phrases, sentence.id, onTerm, false)}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <label className="translation-answer-label" htmlFor={`translation-answer-${task.id}`}>
        <span>我的译文</span>
        <Textarea
          id={`translation-answer-${task.id}`}
          value={answer}
          onChange={(event) => onAnswer(event.target.value)}
          placeholder="输入你的中文译文……"
          disabled={submitted}
          rows={task.format === "passage" ? 8 : 3}
        />
      </label>
      <div className="translation-task-actions">
        <Button
          type="button"
          size="sm"
          onClick={onSubmit}
          disabled={!answer.trim() || submitted}
        >
          <CircleCheck />{task.format === "passage" ? submitted ? "全文已提交" : "提交全文" : submitted ? "本句已提交" : "提交本句"}
        </Button>
      </div>
      {submitted && (
        <div className="translation-result">
          <div className="translation-answer-comparison">
            <span>你的译文</span>
            <p>{answer}</p>
          </div>
          <div className="translation-answer-comparison is-reference">
            <span>参考译文</span>
            <p>{task.answer}</p>
          </div>
          <div className="translation-locating"><Layers3 /><p>{task.locating}</p></div>
          {translationTaskSentences(task).map((analysis) => (
          <details key={analysis.id} className="translation-analysis" open={task.format !== "passage"}>
            <summary>{task.format === "passage" ? `第${analysis.number}句 · 查看句读` : "查看完整句读"} <ChevronDown /></summary>
            <div className="translation-analysis-body">
              <div className="question-colored-sentence">
                {analysis.chunks.map((chunk, index) => (
                  <span key={`${analysis.id}-translation-chunk-${index}`} className={roleClass(chunk)} title={chunkDescription(chunk)} data-grammar-function={chunk.grammarFunction}>
                    {renderInteractiveText(chunk.text, analysis.phrases, analysis.id, onTerm, true)}
                    {chunk.visualRole && <small className="syntax-role-caption">{chunk.grammarFunction}</small>}
                  </span>
                ))}
              </div>
              <BeginnerSyntaxPanel analysis={analysis} sentenceId={analysis.id} onTerm={onTerm} compact />
              <details className="advanced-analysis">
                <summary>补充：原精审层级与语法规则 <ChevronDown /></summary>
                <div className="question-analysis-columns">
                  <section>
                    <h4><Layers3 />逐层拆解</h4>
                    <ol className="question-layer-list">
                      {analysis.layers.map((layer, index) => (
                        <li key={`${analysis.id}-translation-layer-${index}`}><span>{index + 1}</span><p><strong>{layer.label}</strong>{renderWords(layer.text, analysis.id, onTerm, `${analysis.id}-translation-layer-${index}`)}</p></li>
                      ))}
                    </ol>
                  </section>
                  <section>
                    <h4><Sparkles />语法提醒</h4>
                    <ul className="question-grammar-list">
                      {analysis.grammar.map((item, index) => <li key={`${analysis.id}-translation-grammar-${index}`}>{renderWords(item, analysis.id, onTerm, `${analysis.id}-translation-grammar-${index}`)}</li>)}
                    </ul>
                  </section>
                </div>
              </details>
              <div className="question-translation-block"><div><span>结构直译</span><p>{analysis.literal}</p></div><div><span>通顺译文</span><p>{analysis.natural}</p></div></div>
              <div className="question-logic-note"><Brain /><p><strong>句间逻辑</strong>{renderWords(analysis.logic, analysis.id, onTerm, `${analysis.id}-translation-logic`)}</p></div>
            </div>
          </details>
          ))}
        </div>
      )}
    </article>
  );
}

function QuestionAnalysisBlock({
  label,
  analysis,
  sentenceId,
  onTerm,
  defaultOpen = false,
  answer = false,
}: {
  label: string;
  analysis: SentenceAnalysis;
  sentenceId: string;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
  defaultOpen?: boolean;
  answer?: boolean;
}) {
  const phrases = analysisPhrases(analysis);
  return (
    <details className={`question-analysis-block ${answer ? "is-answer" : ""}`} open={defaultOpen}>
      <summary>
        <span>{label}</span>
        <ChevronDown />
      </summary>
      <div className="question-analysis-body">
        <p className="question-language-meaning"><strong>这句话／词组的意思：</strong>{analysis.natural}</p>
        {analysis.layers.find(layer => layer.label === "读题关键") && <p className="question-language-focus"><strong>读题关键：</strong>{renderWords(analysis.layers.find(layer => layer.label === "读题关键")!.text, sentenceId, onTerm, `${analysis.id}-reading-key`)}</p>}
        <p className="question-analysis-text">
          {renderInteractiveText(analysis.text, phrases, sentenceId, onTerm, true)}
        </p>
        <div className="question-colored-sentence">
          {analysis.chunks.map((chunk, index) => (
            <span key={`${analysis.id}-chunk-${index}`} className={roleClass(chunk)} title={chunkDescription(chunk)} data-grammar-function={chunk.grammarFunction}>
              {renderInteractiveText(chunk.text, phrases, sentenceId, onTerm, true)}
              {chunk.visualRole && <small className="syntax-role-caption">{chunk.grammarFunction}</small>}
            </span>
          ))}
        </div>
        <BeginnerSyntaxPanel analysis={analysis} sentenceId={sentenceId} onTerm={onTerm} compact />
        <details className="advanced-analysis">
          <summary>补充：原精审层级与语法规则 <ChevronDown /></summary>
          <div className="question-analysis-columns">
            <section>
              <h4><Layers3 />逐层拆解</h4>
              <ol className="question-layer-list">
                {analysis.layers.map((layer, index) => (
                  <li key={`${analysis.id}-layer-${index}`}>
                    <span>{index + 1}</span>
                    <p><strong>{layer.label}</strong>{renderWords(layer.text, sentenceId, onTerm, `${analysis.id}-layer-${index}`)}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h4><Sparkles />语法提醒</h4>
              <ul className="question-grammar-list">
                {analysis.grammar.map((item, index) => (
                  <li key={`${analysis.id}-grammar-${index}`}>{renderWords(item, sentenceId, onTerm, `${analysis.id}-grammar-${index}`)}</li>
                ))}
              </ul>
            </section>
          </div>
        </details>
        {analysis.literal !== analysis.natural && <div className="question-translation-block">
          <div><span>结构直译</span><p>{analysis.literal}</p></div>
          <div><span>通顺译文</span><p>{analysis.natural}</p></div>
        </div>}
        <div className="question-logic-note"><Brain /><p><strong>句间逻辑</strong>{renderWords(analysis.logic, sentenceId, onTerm, `${analysis.id}-logic`)}</p></div>
      </div>
    </details>
  );
}

function BeginnerSyntaxPanel({
  analysis,
  sentenceId,
  onTerm,
  compact = false,
}: {
  analysis: SentenceAnalysis;
  sentenceId: string;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
  compact?: boolean;
}) {
  return <SentenceSyntaxPanel analysis={analysis} compact={compact} renderText={(text, key) => renderWords(text, sentenceId, onTerm, key)} />;
}

export function StudySentence({
  sentence,
  initialTaskId,
  mode = "read",
  showPhrases = true,
  passageRole,
  attempts = {},
  session,
  onBegin = () => {},
  onPreviousAnswer = () => {},
  reflection = emptyReflection(),
  onAttempt = () => {},
  onReveal = () => {},
  onReflection = () => {},
  isExpanded,
  isMarked,
  note,
  onToggle,
  onMark,
  onTerm,
  onNote,
}: {
  sentence: SentenceAnalysis;
  initialTaskId?: string;
  mode?: SentenceMode;
  showPhrases?: boolean;
  passageRole?: string;
  attempts?: PracticeAttempts;
  session?: PracticeSession;
  onBegin?: () => void;
  onPreviousAnswer?: (task: PracticeTask) => void;
  reflection?: LearningReflection;
  onAttempt?: (task: PracticeTask, answer: string) => void;
  onReveal?: () => void;
  onReflection?: (value: LearningReflection) => void;
  isExpanded: boolean;
  isMarked: boolean;
  note: string;
  onToggle: () => void;
  onMark: () => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
  onNote: (value: string) => void;
}) {
  const [selectedChunk, setSelectedChunk] = useState<number | null>(null);
  const [teachingSession, setTeachingSession] = useState<string | null>(null);
  const hasAttempt = sentence.practice?.some(task => session && latestTaskAttempt(attempts, task, sentence.id)?.sessionId === session.id);
  const teachingVisible = !sentence.practice?.length || (session && teachingSession === session.id && hasAttempt);
  const detailText = (text: string, key: string) => mode === "words" ? renderWords(text, sentence.id, onTerm, key) : text;
  return (
    <article className={`sentence-card ${isExpanded ? "is-open" : ""}`} id={`source-${sentence.id}`} tabIndex={-1} data-source-location>
      <div className="sentence-toggle">
        <span className="sentence-number">{sentence.number}</span>
        <p>{mode === "words" ? renderWords(sentence.text, sentence.id, onTerm, `${sentence.id}-words`) : sentence.text}</p>
        <button
          type="button"
          className="expand-icon"
          onClick={(event) => { event.stopPropagation(); onToggle(); }}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? `收起第 ${sentence.number} 句讲解` : `展开第 ${sentence.number} 句讲解`}
        >{isExpanded ? <ChevronDown /> : <ChevronRight />}</button>
      </div>
      {mode === "words" && showPhrases && sentence.phrases.length > 0 && <details className="sentence-phrase-picker"><summary>本句词组（{sentence.phrases.length}）</summary><div>{sentence.phrases.map(phrase => <button key={phrase} type="button" onClick={() => onTerm(phrase, sentence.id, true)}>{phrase}</button>)}</div></details>}

      {isExpanded && (
        <div className="sentence-analysis">
          {sentence.practice?.length && <SentencePracticePanel initialTaskId={initialTaskId} sentence={sentence} attempts={attempts} session={session} onBegin={onBegin} onPreviousAnswer={onPreviousAnswer} reflection={reflection} revealed={Boolean(teachingVisible)} onAttempt={onAttempt} onReveal={() => { setTeachingSession(session?.id ?? null); onReveal(); }} onRetry={() => setTeachingSession(null)} onReflection={onReflection} />}
          {teachingVisible && <>
          {mode === "structure" && <div className="colored-sentence" aria-label="按词块查看语法作用">
            {sentence.chunks.map((chunk, index) => (
              <button type="button" key={`${sentence.id}-${index}`} className={roleClass(chunk)} title={chunkDescription(chunk)} data-grammar-function={chunk.grammarFunction} aria-pressed={selectedChunk === index} onClick={() => setSelectedChunk(selectedChunk === index ? null : index)}>
                {chunk.text}
                {chunk.visualRole && <small className="syntax-role-caption">{chunk.grammarFunction}</small>}
              </button>
            ))}
            {selectedChunk !== null && <p className="selected-chunk-relation">{sentence.chunks[selectedChunk]?.visualRole ? <>{sentence.chunks[selectedChunk].relation}。{sentence.chunks[selectedChunk].explanation}</> : "该篇第一层仍采用旧词块分类，精确关系见下方原精审讲解。"}</p>}
          </div>}

          <SentenceSyntaxPanel analysis={sentence} renderText={detailText} />
          <p className="sentence-meaning"><b>这句话的意思：</b>{sentence.natural}</p>

          <details className="advanced-analysis">
            <summary>完整语法资料（原精审） <ChevronDown /></summary>
            <div className="analysis-grid">
              <section>
                <h3><Layers3 />逐层拆解</h3>
                <ol className="layer-list">
                  {sentence.layers.map((layer, index) => (
                    <li key={layer.label}>
                      <span>{index + 1}</span>
                      <p><strong>{layer.label}</strong>{detailText(layer.text, `layer-${sentence.id}-${index}`)}</p>
                    </li>
                  ))}
                </ol>
              </section>
              <section>
                <h3><Sparkles />语法提醒</h3>
                <ul className="grammar-list">
                  {sentence.grammar.map((item, index) => (
                    <li key={item}>{detailText(item, `grammar-${sentence.id}-${index}`)}</li>
                  ))}
                </ul>
              </section>
            </div>
          </details>

          <details className="sentence-translation"><summary>词块对应 · 翻译与篇章作用</summary>
          {sentence.translationAlignment && <dl className="translation-alignment">{sentence.translationAlignment.map((block, index) => <div key={index}><dt>{block.english}</dt><dd>{block.chinese}</dd></div>)}</dl>}
          <div className="translation-block">
            <div><span>结构直译</span><p>{sentence.literal}</p></div>
            <div className="natural-translation"><span>通顺译文</span><p>{sentence.natural}</p></div>
          </div>

          {sentence.translationNotes?.map(note => <p className="translation-note" key={note}>{note}</p>)}
          <div className="logic-note"><Brain /><p><strong>{passageRole ? "本句在段落中的作用" : "句间逻辑"}</strong>{passageRole ?? sentence.logic}</p></div></details>

          </>}
          <div className="sentence-note">
            <div className="sentence-note-heading">
              <label htmlFor={`note-${sentence.id}`}><NotebookPen />这句话的笔记</label>
              <Button size="sm" variant={isMarked ? "default" : "outline"} onClick={onMark}>
                <Flag />{isMarked ? "已加入整句复习" : "标记没读懂"}
              </Button>
            </div>
            <Textarea
              id={`note-${sentence.id}`}
              value={note}
              onChange={(event) => onNote(event.target.value)}
              placeholder="记下你没看出的结构、翻译卡点或自己的理解……"
            />
          </div>
        </div>
      )}
    </article>
  );
}

function ContextualSubstitutions({
  entry,
  sentenceId,
  onReference,
}: {
  entry: VocabEntry;
  sentenceId: string;
  onReference: (detail: ReferenceDetail, source: VocabEntry, sentenceId: string) => void;
}) {
  const substitutions = entry.contextualSubstitutions ?? [];

  return (
    <section className="contextual-substitutions" aria-label="本句可替换表达">
      <header>
        <div>
          <span>本句可替换</span>
          <strong>只列在当前原句中成立的同义改写</strong>
        </div>
        <Badge variant="outline">{substitutions.length} 项</Badge>
      </header>
      <div className="substitution-list">
        {substitutions.map((item) => (
          <article key={`${item.label}-${item.rewrittenSentence}`} className="substitution-card">
            <div className="substitution-heading">
              <Button
                type="button"
                variant="link"
                onClick={() => onReference({
                  label: item.label,
                  meaning: item.chinese,
                  note: item.nuance,
                  target: item.target,
                }, entry, sentenceId)}
              >
                {item.label}
                <ChevronRight />
              </Button>
              <Badge variant={item.fit === "direct" ? "secondary" : "outline"}>
                {item.fit === "direct" ? "可直接替换" : "需调整结构"}
              </Badge>
            </div>
            <p className="substitution-chinese">{item.chinese}</p>
            <blockquote>{item.rewrittenSentence}</blockquote>
            <p>{item.nuance}</p>
            {item.adjustment && <small>改写提醒：{item.adjustment}</small>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function TermSenses({ entry, onSource }: { entry: VocabEntry; onSource: (sourceId: string) => void }) {
  const guide = entry.senseGuide;
  const corpusSenses = groupOccurrenceSenses(entry.occurrences);
  if (!guide && !corpusSenses.length && !entry.otherMeanings.length) return null;
  return (
    <div className="term-details term-senses">
      <details>
        <summary>其他义项与用法 <span>{guide ? `${guide.senses.length} 个常见义项` : "跨语境汇总"}</span></summary>
        <div className="detail-body">
          {guide && (
            <section aria-label="已核验常见义项">
              <h3>{guide.label} · 常见义项</h3>
              <p className="sense-scope">按词典核对的常见义项，不限于本句；点击义项查看搭配与双语例句。教学例句不计入真题年份和频次，不代表每项都已考过或已穷尽考义。</p>
              <div className="sense-list">
                {guide.senses.map((sense) => (
                  <details key={sense.id} className="sense-card">
                    <summary><b>{sense.partOfSpeech}</b> · {sense.meaning}</summary>
                    <div className="detail-body">
                      <p>{sense.use}</p>
                      <div className="structure-example">
                        <small>教学例句（非真题）</small>
                        <b>{sense.example.english}</b>
                        <span>{sense.example.chinese}</span>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
          {entry.otherMeanings.length > 0 && (
            <section className="sense-section" aria-label="原有多义补充">
              <h3>熟词僻义与一词多义补充</h3>
              <ul>{entry.otherMeanings.map((meaning) => <li key={meaning}>{meaning}</li>)}</ul>
            </section>
          )}
          {corpusSenses.length > 0 && (
            <section className="sense-section" aria-label="已导入真题用法">
              <h3>已导入真题用法</h3>
              <p className="sense-scope">保留各出处的具体中文义和用法；相同释义合并展示，不把相近中文表述当作新的词典义项。</p>
              <div className="sense-list">
                {corpusSenses.map((sense) => (
                  <details key={`${sense.partOfSpeech}:${sense.meaning}`} className="sense-card">
                    <summary><b>{sense.partOfSpeech}</b> · {sense.meaning}</summary>
                    <div className="detail-body sense-source-list">
                      {sense.examples.map((example) => (
                        <div key={`${example.sourceId}:${example.expression}`}>
                          <strong>{example.expression}</strong>
                          <p>{example.use}</p>
                          <button type="button" className="sense-source-link" onClick={() => onSource(example.sourceId)} aria-label={`回到出处：${sourceCaption(example.sourceId)}`}>{sourceCaption(example.sourceId)} →</button>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </details>
    </div>
  );
}

export function TermDetails({
  entry,
  sentenceId,
  onReference,
  onSource,
}: {
  entry: VocabEntry;
  sentenceId: string;
  onReference: (detail: ReferenceDetail, source: VocabEntry, sentenceId: string) => void;
  onSource: (sourceId: string) => void;
}) {
  const structures = entry.structures ?? [];
  const collocations = (entry.collocationDetails ?? []).filter((item) => !item.meaning.includes("将在所属真题"));
  const synonyms = entry.synonymDetails ?? [];
  const family = entry.familyDetails ?? [];
  const specialForms = (entry.specialForms ?? []).filter(
    (item) => !item.startsWith("无需要") && !item.startsWith("结构词：") && !/特殊变形另行列出|按本句词性识别规则词形/.test(item),
  );

  return (
    <div className="term-details">
      {entry.relation && (
        <section className="relation-card">
          <Badge variant="outline">{entry.relation.kind}</Badge>
          <div>
            <strong>由 {entry.relation.source} 关联进入</strong>
            <p>{entry.relation.note}</p>
          </div>
        </section>
      )}

      {structures.length > 0 && (
        <details>
          <summary>语法与规范结构 <span>{structures.length}</span></summary>
          <div className="detail-body structure-list">
            {entry.grammarRole && <p className="grammar-role">本句作用：{entry.grammarRole}</p>}
            {structures.map((structure) => (
              <article key={structure.pattern} className="structure-card">
                <strong className="structure-pattern">{structure.pattern}</strong>
                <span className="structure-meaning">{structure.meaning}</span>
                <p>{structure.rule}</p>
                {structure.examples?.map((example) => (
                  <div key={example.english} className="structure-example">
                    <b>{example.english}</b>
                    <span>{example.chinese}</span>
                  </div>
                ))}
              </article>
            ))}
            {(entry.pitfalls?.length ?? 0) > 0 && (
              <div className="pitfall-box">
                <strong>易错提醒</strong>
                {entry.pitfalls?.map((item) => <p key={item}>{item}</p>)}
              </div>
            )}
          </div>
        </details>
      )}

      {collocations.length > 0 && (
        <details>
          <summary>常用搭配 <span>{collocations.length}</span></summary>
          <div className="detail-body">
            <ReferenceRows items={collocations} entry={entry} sentenceId={sentenceId} onReference={onReference} />
          </div>
        </details>
      )}

      {specialForms.length > 0 && (
        <details>
          <summary>特殊变形 <span>{specialForms.length}</span></summary>
          <div className="detail-body"><InfoChips items={specialForms} /></div>
        </details>
      )}
      {entry.kind === "word" && specialForms.length === 0 && <p className="regular-forms">本用法无特殊变形需要单独记忆；按词性使用规则变化。</p>}

      {synonyms.length > 0 && (
        <details>
          <summary>考研近义词与区别 <span>{synonyms.length}</span></summary>
          <div className="detail-body">
            <ReferenceRows items={synonyms} entry={entry} sentenceId={sentenceId} onReference={onReference} />
          </div>
        </details>
      )}

      {(family.length > 0 || entry.confusions.length > 0) && (
        <details>
          <summary>同源词与易混辨析 <span>{family.length + entry.confusions.length}</span></summary>
          <div className="detail-body">
            {family.length > 0 && (
              <ReferenceRows items={family} entry={entry} sentenceId={sentenceId} onReference={onReference} />
            )}
            {entry.confusions.length > 0 && (
              <div className="confusion-list">
                {entry.confusions.map((item) => <p key={item} className="confusion-line">{item}</p>)}
              </div>
            )}
          </div>
        </details>
      )}

      <details>
        <summary>出现次数与年份</summary>
        <div className="detail-body">
          <p className="count-scope">当前范围：全部已精审导入年份的正文、题干和选项；年度词表仍按所选年份单独统计</p>
          <div className="count-grid">
            {entry.kind === "phrase" ? (
              <>
                <div><span>原文表达</span><strong>{entry.counts.form}</strong></div>
                <div><span>同一结构</span><strong>{entry.counts.lemma}</strong></div>
                <div><span>结构实例</span><strong>{entry.counts.family}</strong></div>
              </>
            ) : (
              <>
                <div><span>当前词形</span><strong>{entry.counts.form}</strong></div>
                <div><span>原形合并</span><strong>{entry.counts.lemma}</strong></div>
                <div><span>整个词族</span><strong>{entry.counts.family}</strong></div>
              </>
            )}
          </div>
          {entry.occurrences.map((item) => item.sourceId ? (
            <button type="button" key={item.sourceId} className="occurrence occurrence-link" onClick={() => onSource(item.sourceId!)} aria-label={`回到出处：${sourceCaption(item.sourceId)}`}>
              <strong>{sourceCaption(item.sourceId)}</strong>
              <span className="occurrence-copy">
                {item.contexts?.map((context) => (
                  <span key={context.expression} className="occurrence-meaning"><b>{context.expression}</b> · {context.partOfSpeech} · 本处义：{context.meaning}</span>
                ))}
                <span className="occurrence-excerpt">{item.excerpt}</span>
              </span>
            </button>
          ) : (
            <p key={`${item.year}-${item.section}-${item.excerpt}`} className="occurrence"><strong>{item.year} · {item.section}</strong>{item.excerpt}</p>
          ))}
          {entry.occurrences.length === 0 && <p className="no-occurrence">当前已精审语料中尚未出现；它来自近义词或同源词关联。</p>}
          <small>每加入一篇通过质量门禁的真题，词形、原形和词族统计都会随语料更新。</small>
        </div>
      </details>
    </div>
  );
}

function ReferenceRows({
  items,
  entry,
  sentenceId,
  onReference,
}: {
  items: ReferenceDetail[];
  entry: VocabEntry;
  sentenceId: string;
  onReference: (detail: ReferenceDetail, source: VocabEntry, sentenceId: string) => void;
}) {
  return (
    <div className="reference-list">
      {items.map((item) => (
        item.target ? (
          <button
            type="button"
            key={`${item.label}-${item.meaning}`}
            className="reference-row is-linked"
            onClick={() => onReference(item, entry, sentenceId)}
          >
            <span className="reference-copy">
              <strong>{item.label}</strong>
              <span className="reference-meaning">{item.meaning}</span>
              {item.note && <small>{item.note}</small>}
            </span>
            <ChevronRight />
          </button>
        ) : (
          <div key={`${item.label}-${item.meaning}`} className="reference-row">
            <span className="reference-copy">
              <strong>{item.label}</strong>
              <span className="reference-meaning">{item.meaning}</span>
              {item.note && <small>{item.note}</small>}
            </span>
          </div>
        )
      ))}
    </div>
  );
}

function InfoChips({ items }: { items: string[] }) {
  return <div className="chip-list">{items.map((item) => <span key={item} className="info-chip">{item}</span>)}</div>;
}

function renderInteractiveText(
  text: string,
  phrases: string[],
  sentenceId: string,
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void,
  emphasizePhrases: boolean,
) {
  const matches: Array<{ start: number; end: number; label: string }> = [];
  const occupied = new Set<number>();

  [...phrases].sort((a, b) => b.length - a.length).forEach((phrase) => {
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    let cursor = 0;
    while (cursor < lowerText.length) {
      const start = lowerText.indexOf(lowerPhrase, cursor);
      if (start < 0) break;
      const end = start + phrase.length;
      const overlaps = Array.from({ length: end - start }, (_, index) => start + index).some((index) => occupied.has(index));
      if (!overlaps) {
        matches.push({ start, end, label: text.slice(start, end) });
        for (let index = start; index < end; index += 1) occupied.add(index);
      }
      cursor = start + 1;
    }
  });

  matches.sort((a, b) => a.start - b.start);
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start > cursor) {
      nodes.push(...renderWords(text.slice(cursor, match.start), sentenceId, onTerm, `before-${index}`));
    }
    const phraseKnowledge = getPhraseKnowledge(match.label);
    nodes.push(
      <span
        key={`phrase-${sentenceId}-${match.start}`}
        className={`phrase-group ${emphasizePhrases ? "is-emphasized" : ""}`}
      >
        {renderWords(match.label, sentenceId, onTerm, `phrase-${match.start}`)}
        {phraseKnowledge && (
          <button
            type="button"
            className="phrase-action"
            onClick={(event) => { event.stopPropagation(); onTerm(match.label, sentenceId, true); }}
            aria-label={`查看词组 ${phraseKnowledge.canonical}`}
          >结构</button>
        )}
      </span>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) nodes.push(...renderWords(text.slice(cursor), sentenceId, onTerm, "after"));
  return nodes;
}

function renderWords(
  text: string,
  sentenceId: string,
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void,
  keyPrefix: string,
) {
  const segments = text.split(/(___\(\d+\))/g);
  return segments.flatMap((segment, segmentIndex) => {
    const blank = segment.match(/^___\((\d+)\)$/);
    if (blank) {
      return [
        <span key={`${keyPrefix}-blank-${blank[1]}`} className="cloze-blank" aria-label={`第 ${blank[1]} 空`}>
          <span className="cloze-blank-number">{blank[1]}</span>
          <i aria-hidden="true" />
        </span>,
      ];
    }

    const parts = segment.split(/([A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?)/g);
    return parts.map((part, index) => {
      if (!/^[A-Za-z]+(?:\d+[A-Za-z]*)+$|^\d+(?:st|nd|rd|th)$|^\d{4}s$|^(?:[A-Za-z]\.){2,}$|^[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?$/.test(part)) return part;
      return (
        <button
          type="button"
          key={`${keyPrefix}-${segmentIndex}-${index}-${part}`}
          className="term-token"
          onClick={(event) => { event.stopPropagation(); onTerm(part, sentenceId, false); }}
        >{part}</button>
      );
    });
  });
}
