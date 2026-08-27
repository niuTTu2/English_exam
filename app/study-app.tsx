"use client";

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
import { useEffect, useMemo, useState } from "react";

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
  basicMeanings,
  sections,
  vocab,
  type SentenceAnalysis,
  type Question,
  type SyntaxRole,
  type VocabEntry,
} from "./data";
import {
  getCollocationDetails,
  getFamilyDetails,
  getPhraseKnowledge,
  getSynonymDetails,
  getWordKnowledge,
} from "./knowledge-base";
import { canonicalLemma, familyAliases, getLexicalGuide } from "./lexicon";

type AppView = "study" | "test" | "review" | "vocabulary";
type ArticleId = keyof typeof articleContents;
type RevealTiming = "instant" | "sentence" | "article";
type TimerMode = "up" | "down";
type ReviewFilter = "all" | "word" | "phrase" | "sentence" | "question";
type VocabularyFilter = "word" | "phrase";
type MarkTag = "完全不会" | "有些陌生" | "不会搭配" | "容易混淆";
type Rating = "正确" | "模糊" | "错误";
type ReviewSchedule = { dueAt: number; intervalDays: number; repetitions: number };

type SelectedTerm = {
  key: string;
  label: string;
  entry: VocabEntry;
  sentenceId: string;
};

type ReferenceDetail = NonNullable<VocabEntry["collocationDetails"]>[number];

type YearWordItem = {
  headword: string;
  sourceForm: string;
  forms: string[];
  count: number;
  meaning: string;
  partOfSpeech: string;
  sentenceId: string;
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
  marks: Record<string, MarkTag[]>;
  termRatings: Record<string, Rating>;
  reviewSchedule: Record<string, ReviewSchedule>;
  termNotes: Record<string, string>;
  sentenceNotes: Record<string, string>;
  sentenceMarks: string[];
  answers: Record<number, string>;
  submitted: boolean;
  activeSection?: ArticleId;
  submittedSections?: Record<string, boolean>;
  revealTiming: RevealTiming;
  timerMode: TimerMode;
  lists: string[];
  listItems: Record<string, string[]>;
  reviewFilter: ReviewFilter;
};

const STORAGE_KEY = "zhenti-judu-study-state-v1";

const markTags: MarkTag[] = ["完全不会", "有些陌生", "不会搭配", "容易混淆"];
const ratings: Rating[] = ["正确", "模糊", "错误"];

const roleLabels: Record<SyntaxRole, string> = {
  condition: "条件/目的",
  subject: "主语",
  predicate: "谓语",
  object: "宾语/表语",
  modifier: "修饰成分",
  connector: "逻辑连接",
};

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

const corpusText = [
  ...allSentences.map((sentence) => sentence.text.toLowerCase()),
  ...allQuestions.flatMap((question) => [question.prompt, ...question.options.map((option) => option.text)].map((text) => text.toLowerCase())),
].join(" ");
const corpusTokens = tokenizeWords(corpusText);

function tokenizeWords(text: string) {
  return text.match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:'[a-z]+)?/g) ?? [];
}

const optionLookup = new Map(
  allQuestions.flatMap((question) => question.options.map((option) => [
    option.text.toLowerCase(),
    {
      explanation: question.explanations[option.key],
      correct: question.options.find((item) => item.key === question.answer)?.text ?? "",
      isCorrect: option.key === question.answer,
    },
  ] as const)),
);

const sentenceArticle = new Map(
  Object.values(articleContents).flatMap((article) => article.sentences.map((sentence) => [sentence.id, article] as const)),
);

const questionArticle = new Map(
  Object.values(articleContents).flatMap((article) => article.questions.map((question) => [question.id, article] as const)),
);

function lemmaOf(token: string) {
  return canonicalLemma(token);
}

function familyOf(token: string) {
  const lemma = lemmaOf(token);
  return familyAliases[lemma] ?? lemma;
}

function countPhrase(phrase: string) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...corpusText.matchAll(new RegExp(`\\b${escaped}\\b`, "g"))].length;
}

function currentCounts(label: string, isPhrase: boolean) {
  const normalized = label.toLowerCase();
  if (isPhrase) {
    const exact = countPhrase(normalized);
    const patternKey = getPhraseKnowledge(normalized)?.key;
    const annotatedPhrases = [
      ...allSentences.flatMap((sentence) => sentence.phrases),
      ...allQuestions.flatMap((question) => question.options.map((option) => option.text).filter((text) => text.includes(" "))),
    ];
    const pattern = patternKey
      ? annotatedPhrases.filter((phrase) => getPhraseKnowledge(phrase)?.key === patternKey).length
      : exact;
    return { form: exact, lemma: pattern, family: pattern };
  }
  const lemma = lemmaOf(normalized);
  const family = familyOf(normalized);
  return {
    form: corpusTokens.filter((token) => token === normalized).length,
    lemma: corpusTokens.filter((token) => lemmaOf(token) === lemma).length,
    family: corpusTokens.filter((token) => familyOf(token) === family).length,
  };
}

function currentOccurrences(label: string, isPhrase: boolean) {
  const normalized = label.toLowerCase();
  const lemma = lemmaOf(normalized);
  const phraseKey = isPhrase ? getPhraseKnowledge(normalized)?.key : undefined;
  const sentenceMatches = allSentences.filter((sentence) => {
    const lower = sentence.text.toLowerCase();
    if (isPhrase) {
      if (phraseKey) return sentence.phrases.some((phrase) => getPhraseKnowledge(phrase)?.key === phraseKey);
      return lower.includes(normalized);
    }
    const tokens = tokenizeWords(lower);
    return tokens.some((token) => lemmaOf(token) === lemma);
  });
  const optionMatches = allQuestions.flatMap((question) => question.options
    .filter((option) => {
      const lower = option.text.toLowerCase();
      if (isPhrase) {
        if (phraseKey) return getPhraseKnowledge(option.text)?.key === phraseKey;
        return lower === normalized;
      }
      const tokens = tokenizeWords(lower);
      return tokens.some((token) => lemmaOf(token) === lemma);
    })
    .map((option) => ({ questionId: question.id, text: option.text })));

  return [
    ...sentenceMatches.map((sentence) => ({
      year: 2000,
      section: `${sentenceArticle.get(sentence.id)?.label ?? "真题"}正文`,
      excerpt: sentence.text,
    })),
    ...optionMatches.map((option) => ({
      year: 2000,
      section: `${questionArticle.get(option.questionId)?.label ?? "真题"}第 ${option.questionId} 题选项`,
      excerpt: option.text,
    })),
  ];
}

function makeFallbackEntry(label: string, isPhrase = false): VocabEntry {
  const normalized = label.toLowerCase();
  const option = optionLookup.get(normalized);
  const phraseKnowledge = isPhrase ? getPhraseKnowledge(normalized) : undefined;
  const guide = isPhrase ? null : getLexicalGuide(normalized);
  const wordKnowledge = guide ? getWordKnowledge(guide.headword) : undefined;
  const counts = currentCounts(label, isPhrase);
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
      phraseGlosses[normalized] ??
      basicMeanings[normalized] ??
      guide?.contextualMeaning ??
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
    counts,
    knowledgeLevel: guide?.use || wordKnowledge ? "curated" : "related",
    occurrences: currentOccurrences(label, isPhrase),
  };
}

function resolveEntry(label: string, isPhrase = false): VocabEntry {
  const normalized = label.toLowerCase();
  const phraseKnowledge = isPhrase ? getPhraseKnowledge(normalized) : undefined;
  const guide = isPhrase ? null : getLexicalGuide(normalized);
  const wordKnowledge = guide ? getWordKnowledge(guide.headword) : undefined;
  const key = phraseKnowledge
    ? `pattern:${phraseKnowledge.key}`
    : isPhrase
      ? normalized
      : aliasToVocab[normalized] ?? guide?.headword ?? normalized;
  const entry = vocab[key] ?? makeFallbackEntry(label, isPhrase);
  if (phraseKnowledge) return entry;
  const mergedCollocations = Array.from(new Set([...(entry.collocations ?? []), ...(guide?.collocations ?? [])]));
  const mergedSynonyms = guide?.examSynonyms ?? entry.examSynonyms ?? [];
  const mergedFamily = Array.from(new Set([...(entry.wordFamily ?? []), ...(guide?.wordFamily ?? [])]));
  return {
    ...entry,
    key,
    display: label,
    headword: guide?.headword ?? entry.headword,
    partOfSpeech: guide?.partOfSpeech ?? entry.partOfSpeech,
    use: guide?.use ?? entry.use,
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
    wordFamily: mergedFamily,
    confusions: Array.from(new Set([...(entry.confusions ?? []), ...(guide?.confusions ?? [])])),
    counts: currentCounts(label, isPhrase),
    knowledgeLevel: entry.knowledgeLevel ?? (entry.use || guide?.use || wordKnowledge ? "curated" : "related"),
    occurrences: currentOccurrences(label, isPhrase),
  };
}

function sentenceIdForWord(headword: string) {
  const sentence = allSentences.find((item) => {
    const tokens = tokenizeWords(item.text.toLowerCase());
    return tokens.some((token) => lemmaOf(token) === headword);
  });
  if (sentence) return sentence.id;
  return allQuestions.find((question) => question.options.some((option) => {
    const tokens = tokenizeWords(option.text.toLowerCase());
    return tokens.some((token) => lemmaOf(token) === headword);
  }))?.sentenceId ?? "year-vocabulary";
}

function buildYearWordItems(): YearWordItem[] {
  const grouped = new Map<string, Map<string, number>>();
  corpusTokens.forEach((token) => {
    const headword = lemmaOf(token);
    const forms = grouped.get(headword) ?? new Map<string, number>();
    forms.set(token, (forms.get(token) ?? 0) + 1);
    grouped.set(headword, forms);
  });

  return Array.from(grouped.entries())
    .map(([headword, formCounts]) => {
      const entry = resolveEntry(headword, false);
      const rankedForms = Array.from(formCounts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "en"));
      return {
        headword,
        sourceForm: formCounts.has(headword) ? headword : rankedForms[0][0],
        forms: Array.from(formCounts.keys()).sort((a, b) => a.localeCompare(b, "en")),
        count: Array.from(formCounts.values()).reduce((sum, value) => sum + value, 0),
        meaning: entry.contextualMeaning,
        partOfSpeech: entry.partOfSpeech,
        sentenceId: sentenceIdForWord(headword),
      };
    })
    .sort((a, b) => a.headword.localeCompare(b.headword, "en"));
}

function buildYearPhraseItems(): YearPhraseItem[] {
  const sources = new Map<string, { source: string; sentenceId: string }>();
  allSentences.forEach((sentence) => sentence.phrases.forEach((source) => {
    sources.set(source.toLowerCase(), { source, sentenceId: sentence.id });
  }));
  allQuestions.forEach((question) => question.options.forEach((option) => {
    if (option.text.includes(" ") && getPhraseKnowledge(option.text)) {
      sources.set(option.text.toLowerCase(), { source: option.text, sentenceId: question.sentenceId });
    }
  }));

  return Array.from(sources.values())
    .map(({ source, sentenceId }) => {
      const entry = resolveEntry(source, true);
      return {
        source,
        canonical: entry.canonicalForm ?? entry.headword,
        count: currentCounts(source, true).form,
        meaning: entry.contextualMeaning,
        type: entry.partOfSpeech,
        sentenceId,
      };
    })
    .sort((a, b) => a.source.localeCompare(b.source, "en"));
}

function formatSeconds(value: number) {
  const safe = Math.max(0, value);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function roleClass(role: SyntaxRole) {
  return `syntax-chunk syntax-${role}`;
}

export default function StudyApp() {
  const [view, setView] = useState<AppView>("study");
  const [activeSection, setActiveSection] = useState<ArticleId>("cloze");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["cloze-s1"]));
  const [selectedTerm, setSelectedTerm] = useState<SelectedTerm | null>(null);
  const [termHistory, setTermHistory] = useState<SelectedTerm[]>([]);
  const [marks, setMarks] = useState<Record<string, MarkTag[]>>({});
  const [termRatings, setTermRatings] = useState<Record<string, Rating>>({});
  const [reviewSchedule, setReviewSchedule] = useState<Record<string, ReviewSchedule>>({});
  const [termNotes, setTermNotes] = useState<Record<string, string>>({});
  const [sentenceNotes, setSentenceNotes] = useState<Record<string, string>>({});
  const [sentenceMarks, setSentenceMarks] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<number, string>>({});
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
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [remoteReady, setRemoteReady] = useState(false);
  const activeArticle = articleContents[activeSection];
  const sentences = activeArticle.sentences;
  const questions = activeArticle.questions;
  const submitted = Boolean(submittedSections[activeSection]);
  const selectedTermArticle = selectedTerm
    ? sentenceArticle.get(selectedTerm.sentenceId) ?? activeArticle
    : activeArticle;
  const yearWordItems = useMemo(() => buildYearWordItems(), []);
  const yearPhraseItems = useMemo(() => buildYearPhraseItems(), []);

  function applySnapshot(snapshot: Partial<PersistedStudyState>) {
    if (Array.isArray(snapshot.expanded)) setExpanded(new Set(snapshot.expanded));
    if (snapshot.marks) setMarks(snapshot.marks);
    if (snapshot.termRatings) setTermRatings(snapshot.termRatings);
    if (snapshot.reviewSchedule) setReviewSchedule(snapshot.reviewSchedule);
    if (snapshot.termNotes) setTermNotes(snapshot.termNotes);
    if (snapshot.sentenceNotes) setSentenceNotes(snapshot.sentenceNotes);
    if (Array.isArray(snapshot.sentenceMarks)) setSentenceMarks(new Set(snapshot.sentenceMarks));
    if (snapshot.answers) setAnswers(snapshot.answers);
    if (snapshot.activeSection && snapshot.activeSection in articleContents) setActiveSection(snapshot.activeSection);
    if (snapshot.submittedSections) setSubmittedSections(snapshot.submittedSections);
    else if (snapshot.submitted) setSubmittedSections({ cloze: true });
    if (snapshot.revealTiming) setRevealTiming(snapshot.revealTiming);
    if (snapshot.timerMode) setTimerMode(snapshot.timerMode);
    if (Array.isArray(snapshot.lists)) setLists(snapshot.lists);
    if (snapshot.listItems) setListItems(snapshot.listItems);
    if (snapshot.reviewFilter) setReviewFilter(snapshot.reviewFilter);
  }

  useEffect(() => {
    const handleOnline = () => { setOnline(true); setSyncState(userEmail ? "saving" : "local"); };
    const handleOffline = () => { setOnline(false); setSyncState("offline"); };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let savedSnapshot: PersistedStudyState | null = null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) savedSnapshot = JSON.parse(saved) as PersistedStudyState;
    } catch {
      // A damaged local snapshot should not prevent the paper from opening.
    }
    queueMicrotask(() => {
      setOnline(navigator.onLine);
      if (savedSnapshot) applySnapshot(savedSnapshot);
      setHydrated(true);
    });

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => setOfflineReady(true))
        .catch(() => undefined);
    }

    void fetch("/api/auth/session")
      .then((response) => response.json() as Promise<{ configured?: boolean; user?: { email: string } | null }>)
      .then(async (session) => {
        setEmailConfigured(Boolean(session.configured));
        if (!session.user) return;
        setUserEmail(session.user.email);
        setAccountEmail(session.user.email);
        const response = await fetch("/api/study-state");
        if (response.ok) {
          const remote = await response.json() as { state?: PersistedStudyState | null; updatedAt?: number | null };
          const localRaw = window.localStorage.getItem(STORAGE_KEY);
          const local = localRaw ? JSON.parse(localRaw) as PersistedStudyState : null;
          if (remote.state && (remote.updatedAt ?? 0) > (local?.updatedAt ?? 0)) {
            applySnapshot(remote.state);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remote.state));
          }
        }
        setRemoteReady(true);
        setSyncState("synced");
      })
      .catch(() => undefined);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // The initial load intentionally runs once; later saves are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistedState = useMemo<PersistedStudyState>(() => ({
    version: 1,
    updatedAt: 0,
    expanded: Array.from(expanded),
    marks,
    termRatings,
    reviewSchedule,
    termNotes,
    sentenceNotes,
    sentenceMarks: Array.from(sentenceMarks),
    answers,
    submitted: Boolean(submittedSections.cloze),
    activeSection,
    submittedSections,
    revealTiming,
    timerMode,
    lists,
    listItems,
    reviewFilter,
  }), [activeSection, answers, expanded, listItems, lists, marks, revealTiming, reviewFilter, reviewSchedule, sentenceMarks, sentenceNotes, submittedSections, termNotes, termRatings, timerMode]);

  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      const snapshot = { ...persistedState, updatedAt: Date.now() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      if (!userEmail || !remoteReady || !navigator.onLine) {
        setSyncState(navigator.onLine ? "local" : "offline");
        return;
      }
      setSyncState("saving");
      void fetch("/api/study-state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: snapshot }),
      }).then((response) => setSyncState(response.ok ? "synced" : "local"))
        .catch(() => setSyncState("offline"));
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
  const studiedProgress = Math.round((studiedCount / sentences.length) * 100);
  const selectedAnswers = questions.filter((question) => Boolean(answers[question.id])).length;
  const correctAnswers = submitted
    ? questions.filter((question) => answers[question.id] === question.answer).length
    : 0;
  const markedKeys = Object.keys(marks).filter((key) => marks[key]?.length);
  const wrongQuestions = allQuestions.filter((question) => {
    const article = questionArticle.get(question.id);
    return Boolean(article && submittedSections[article.id] && answers[question.id] !== question.answer);
  });
  const reviewCount = markedKeys.length + sentenceMarks.size + wrongQuestions.length;
  const visibleMarkedKeys = markedKeys.filter((key) => {
    if (reviewFilter === "all") return true;
    const kind = vocab[key]?.kind ?? (key.includes(" ") ? "phrase" : "word");
    return reviewFilter === kind;
  });
  const visibleSentenceMarks = reviewFilter === "all" || reviewFilter === "sentence"
    ? Array.from(sentenceMarks)
    : [];
  const visibleWrongQuestions = reviewFilter === "all" || reviewFilter === "question"
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
    const entry = resolveEntry(label, isPhrase);
    if (selectedTerm) setTermHistory((current) => [...current, selectedTerm].slice(-8));
    setSelectedTerm({ key: entry.key, label, entry, sentenceId });
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
    const base = resolveEntry(label, false);
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

  function toggleMark(key: string, tag: MarkTag) {
    const existing = marks[key] ?? [];
    const next = existing.includes(tag)
      ? existing.filter((item) => item !== tag)
      : [...existing, tag];
    setMarks((current) => ({ ...current, [key]: next }));
    if (next.length > 0) {
      setReviewSchedule((schedule) => schedule[key]
        ? schedule
        : { ...schedule, [key]: { dueAt: Date.now(), intervalDays: 0, repetitions: 0 } });
    }
  }

  function rateTerm(key: string, rating: Rating) {
    setTermRatings((current) => ({ ...current, [key]: rating }));
    setReviewSchedule((current) => {
      const previous = current[key] ?? { dueAt: Date.now(), intervalDays: 0, repetitions: 0 };
      const intervals = [1, 3, 7, 14, 30, 60];
      let repetitions = previous.repetitions;
      let intervalDays = 0;
      if (rating === "正确") {
        repetitions += 1;
        intervalDays = intervals[Math.min(repetitions - 1, intervals.length - 1)];
      } else if (rating === "模糊") {
        repetitions = Math.max(0, repetitions - 1);
        intervalDays = 1;
      } else {
        repetitions = 0;
      }
      return {
        ...current,
        [key]: {
          repetitions,
          intervalDays,
          dueAt: Date.now() + intervalDays * 24 * 60 * 60_000,
        },
      };
    });
  }

  function resetTest() {
    setAnswers((current) => {
      const next = { ...current };
      questions.forEach((question) => delete next[question.id]);
      return next;
    });
    setSubmittedSections((current) => ({ ...current, [activeSection]: false }));
    setTimerSeconds(0);
    setTimerRunning(false);
    setUnlockedTerms(new Set());
  }

  function selectArticle(id: ArticleId) {
    setActiveSection(id);
    setView("study");
    setSelectedTerm(null);
    setTermHistory([]);
    setTimerRunning(false);
    setTimerSeconds(0);
    setUnlockedTerms(new Set());
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
  }

  function toggleListItem(list: string, key: string) {
    setListItems((current) => {
      const existing = current[list] ?? [];
      const next = existing.includes(key)
        ? existing.filter((item) => item !== key)
        : [...existing, key];
      return { ...current, [list]: next };
    });
  }

  async function requestLoginCode() {
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
    if (!requestId) return;
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
      setUserEmail(result.user.email);
      setRemoteReady(true);
      setSyncState("saving");
      setAccountOpen(false);
      setOtpCode("");
      setRequestId(null);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "登录失败。");
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
    setUserEmail(null);
    setRemoteReady(false);
    setSyncState(navigator.onLine ? "local" : "offline");
    setAccountOpen(false);
  }

  const termIsLocked = useMemo(() => {
    if (!selectedTerm || view !== "test") return false;
    if (revealTiming === "instant") return false;
    if (submitted) return false;
    if (revealTiming === "sentence" && unlockedTerms.has(selectedTerm.key)) return false;
    return true;
  }, [revealTiming, selectedTerm, submitted, unlockedTerms, view]);

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
          <button type="button" className="avatar-chip" aria-label="打开个人账号" onClick={() => setAccountOpen(true)}>
            {userEmail ? userEmail.slice(0, 1).toUpperCase() : <LogIn />}
          </button>
        </div>
      </header>

      <div className="workspace-grid">
        <aside className="paper-nav" aria-label="试卷目录">
          <div className="year-card">
            <span className="year-label">当前试卷</span>
            <strong>2000</strong>
            <span>全国硕士研究生入学考试英语</span>
          </div>

          <nav className="section-list">
            {sections.map((section) => {
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
              <small>{yearWordItems.length} 个单词 · {yearPhraseItems.length} 个词组</small>
            </span>
            <ChevronRight />
          </button>
        </aside>

        <main className="study-main">
          <section className="paper-heading">
            {view === "vocabulary" ? (
              <>
                <div>
                  <div className="heading-meta">
                    <Badge className="paper-badge">2000 · 年度词表</Badge>
                    <span>随精审进度更新</span>
                  </div>
                  <h2>本年单词与词组总表</h2>
                  <p>覆盖当前已导入的正文、题干与选项；点击任一词条即可查看本句义、用法和历年统计。</p>
                </div>
                <div className="vocabulary-heading-stat">
                  <span>当前已收录</span>
                  <strong>{yearWordItems.length + yearPhraseItems.length}</strong>
                  <small>{yearWordItems.length} 词 · {yearPhraseItems.length} 词组</small>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="heading-meta">
                    <Badge className="paper-badge">{activeArticle.badge}</Badge>
                    <span>精审完成</span>
                  </div>
                  <h2>{activeArticle.title}</h2>
                  <p>{activeArticle.description}</p>
                </div>
                <div className="paper-progress">
                  <div><span>学习进度</span><strong>{studiedCount}/{sentences.length} 句</strong></div>
                  <Progress value={studiedProgress} />
                </div>
              </>
            )}
          </section>

          <Tabs value={view} onValueChange={(value) => setView(value as AppView)} className="mode-tabs">
            <div className="mode-toolbar">
              <TabsList className="mode-list">
                <TabsTrigger value="study"><BookOpenCheck />学习模式</TabsTrigger>
                <TabsTrigger value="test"><Clock3 />自测模式</TabsTrigger>
                <TabsTrigger value="review"><Brain />复习清单</TabsTrigger>
              </TabsList>
              <Badge variant="outline" className="offline-badge">{offlineReady ? "离线内容已缓存" : "正在准备离线内容"}</Badge>
            </div>

            <TabsContent value="study" className="mode-content">
              <div className="legend-row" aria-label="句子颜色图例">
                {(Object.keys(roleLabels) as SyntaxRole[]).map((role) => (
                  <span key={role}><i className={`legend-dot legend-${role}`} />{roleLabels[role]}</span>
                ))}
              </div>
              <div className="sentence-stack">
                {sentences.map((sentence) => (
                  <StudySentence
                    key={sentence.id}
                    sentence={sentence}
                    isExpanded={expanded.has(sentence.id)}
                    isMarked={sentenceMarks.has(sentence.id)}
                    note={sentenceNotes[sentence.id] ?? ""}
                    onToggle={() => toggleSentence(sentence.id)}
                    onMark={() => setSentenceMarks((current) => {
                      const next = new Set(current);
                      if (next.has(sentence.id)) next.delete(sentence.id);
                      else next.add(sentence.id);
                      return next;
                    })}
                    onTerm={openTerm}
                    onNote={(value) => setSentenceNotes((current) => ({ ...current, [sentence.id]: value }))}
                  />
                ))}
              </div>
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
                <div className="reveal-setting">
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
                </div>
              </section>

              <div className="test-instruction">
                <Flag />
                <p><strong>模拟考场：</strong>{activeArticle.kind === "cloze"
                  ? "正文只保留真正的第 1–10 空，不再显示额外句子序号。"
                  : "先限时默读全文，再完成第 11–14 题；不提前显示逐句讲解。"} 点选项字母作答；词汇讲解按你的设置解锁。</p>
              </div>

              <div className="test-passage">
                {sentences.map((sentence) => (
                  <article key={sentence.id} className="test-sentence" aria-label={`原文第 ${sentence.number} 句`}>
                    <p>{renderInteractiveText(sentence.testText ?? sentence.text, sentence.phrases, sentence.id, openTerm, false)}</p>
                  </article>
                ))}
              </div>

              <section className="question-section">
                <div className="question-heading">
                  <div><span>{activeArticle.kind === "cloze" ? "完形选择" : "阅读选择"}</span><strong>{selectedAnswers}/{questions.length} 已作答</strong></div>
                  {submitted && <Badge className="score-badge">{correctAnswers}/{questions.length}</Badge>}
                </div>
                <div className="question-grid">
                  {questions.map((question) => (
                    <article key={question.id} className="question-card">
                      <div className="question-prompt">
                        <span>{question.id}</span>
                        <p>{renderWords(question.prompt, question.sentenceId, openTerm, `question-${question.id}`)}</p>
                      </div>
                      <div className="option-list">
                        {question.options.map((option) => {
                          const selected = answers[question.id] === option.key;
                          const correct = submitted && option.key === question.answer;
                          const wrong = submitted && selected && option.key !== question.answer;
                          return (
                            <div key={option.key} className={`option-row ${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`}>
                              <button
                                type="button"
                                className="option-choice"
                                onClick={() => !submitted && setAnswers((current) => ({ ...current, [question.id]: option.key }))}
                                aria-label={`选择 ${option.key} ${option.text}`}
                              >
                                <span>{option.key}</span>{correct && <Check />}
                              </button>
                              <div className="option-terms">
                                {renderWords(option.text, question.sentenceId, openTerm, `option-${question.id}-${option.key}`)}
                                {option.text.includes(" ") && getPhraseKnowledge(option.text) && (
                                  <button
                                    type="button"
                                    className="phrase-action option-phrase-action"
                                    onClick={() => openTerm(option.text, question.sentenceId, true)}
                                    aria-label={`查看词组 ${option.text}`}
                                  >词组</button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {submitted && (
                        <div className="answer-analysis">
                          <p className="locating"><Layers3 /><span>{renderWords(question.locating, question.sentenceId, openTerm, `locating-${question.id}`)}</span></p>
                          {question.options.map((option) => (
                            <p key={option.key}>
                              <strong>{option.key}</strong>
                              {renderWords(question.explanations[option.key], question.sentenceId, openTerm, `explanation-${question.id}-${option.key}`)}
                            </p>
                          ))}
                        </div>
                      )}
                      {submitted && question.analysis && (
                        <QuestionAnalysisPanel question={question} onTerm={openTerm} />
                      )}
                    </article>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="submit-test"
                  disabled={selectedAnswers !== questions.length || submitted}
                  onClick={() => {
                    setSubmittedSections((current) => ({ ...current, [activeSection]: true }));
                    setTimerRunning(false);
                  }}
                >
                  <CircleCheck />{submitted ? "已提交" : `提交答案（${selectedAnswers}/${questions.length}）`}
                </Button>
              </section>
            </TabsContent>

            <TabsContent value="review" className="mode-content">
              <section className="review-board">
                <div className="review-board-heading">
                  <div>
                    <Badge className="paper-badge">个人复习库</Badge>
                    <h3>把今天暴露的问题留到明天解决</h3>
                    <p>自动间隔复习与自定义清单并行；同一词可以同时拥有多个问题标签。</p>
                  </div>
                  <div className="review-stat"><span>待复习</span><strong>{reviewCount}</strong></div>
                </div>

                <div className="review-columns">
                  <div className="review-panel">
                    <div className="panel-heading"><ListChecks /><strong>自动复习队列</strong></div>
                    <div className="review-filters" aria-label="选择复习范围">
                      {([
                        ["all", "全部"],
                        ["word", "单词"],
                        ["phrase", "词组"],
                        ["sentence", "整句"],
                        ["question", "错题"],
                      ] as Array<[ReviewFilter, string]>).map(([value, label]) => (
                        <Button key={value} size="sm" variant={reviewFilter === value ? "default" : "outline"} onClick={() => setReviewFilter(value)}>{label}</Button>
                      ))}
                    </div>
                    {visibleReviewCount === 0 ? (
                      <div className="empty-review"><Sparkles /><p>{reviewCount === 0 ? "还没有标记内容。去自测模式点一个陌生词试试。" : "这个复习范围里暂时没有项目。"}</p></div>
                    ) : (
                      <div className="marked-list">
                        {visibleMarkedKeys.map((key) => {
                          const schedule = reviewSchedule[key];
                          const dueLabel = !schedule || schedule.intervalDays === 0
                            ? "今天复习"
                            : `${schedule.intervalDays} 天后`;
                          return (
                            <button key={key} type="button" onClick={() => openTerm(key, "review", key.includes(" "))}>
                              <span><strong>{key}</strong><small>{marks[key].join(" · ")}</small></span>
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
                              if (article) setActiveSection(article.id);
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
                            if (article) setActiveSection(article.id);
                            setView("test");
                          }}>
                            <span><strong>第 {question.id} 题</strong><small>{questionArticle.get(question.id)?.label ?? "真题"} · 已自动收录错题与错误选项</small></span>
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
                                <button key={key} type="button" onClick={() => openTerm(key, "review", key.includes(" "))}>{key}</button>
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
        open={Boolean(selectedTerm)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTerm(null);
            setTermHistory([]);
          }
        }}
      >
        <SheetContent className="term-sheet sm:max-w-lg">
          {selectedTerm && (
            <>
              <SheetHeader className="term-sheet-header">
                <div className="term-header-row">
                  <div className="term-kicker">
                    <Badge variant="outline">{termIsLocked ? "自测标记" : selectedTerm.entry.kind === "phrase" ? "语法 / 搭配" : selectedTerm.entry.partOfSpeech}</Badge>
                    <span>{selectedTermArticle.badge}</span>
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
                      : "先看本句义和核心句法，再按需展开搭配、变形与关联词。"}
                </SheetDescription>
              </SheetHeader>

              <div className="term-sheet-scroll">
                {!termIsLocked && (
                  <>
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
                      <span>本句义</span>
                      <strong>{selectedTerm.entry.contextualMeaning}</strong>
                      <p>{selectedTerm.entry.use}</p>
                    </section>

                    {(selectedTerm.entry.grammarSummary || selectedTerm.entry.grammarRole) && (
                      <section className="knowledge-overview">
                        <div>
                          <span>{selectedTerm.entry.kind === "phrase" ? "规范结构" : "核心句法"}</span>
                          <strong>{selectedTerm.entry.canonicalForm ?? selectedTerm.entry.structures?.[0]?.pattern ?? selectedTerm.entry.grammarRole}</strong>
                        </div>
                        <p>{selectedTerm.entry.grammarSummary ?? selectedTerm.entry.grammarRole}</p>
                      </section>
                    )}

                    <TermDetails
                      entry={selectedTerm.entry}
                      sentenceId={selectedTerm.sentenceId}
                      onReference={openReference}
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
                        onClick={() => toggleMark(selectedTerm.key, tag)}
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
                          onClick={() => rateTerm(selectedTerm.key, rating)}
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

      <Sheet open={accountOpen} onOpenChange={setAccountOpen}>
        <SheetContent className="account-sheet sm:max-w-md">
          <SheetHeader>
            <div className="account-icon"><Mail /></div>
            <SheetTitle>个人账号与同步</SheetTitle>
            <SheetDescription>最终采用独立邮箱验证码登录；本机数据始终可以离线使用。</SheetDescription>
          </SheetHeader>

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
              <Button variant="outline" onClick={signOut}><LogOut />退出账号</Button>
            </div>
          ) : emailConfigured ? (
            <div className="account-content">
              <label htmlFor="account-email">邮箱</label>
              <Input
                id="account-email"
                type="email"
                autoComplete="email"
                value={accountEmail}
                onChange={(event) => setAccountEmail(event.target.value)}
                placeholder="name@example.com"
                disabled={Boolean(requestId)}
              />
              {requestId && (
                <>
                  <label htmlFor="otp-code">6 位验证码</label>
                  <Input
                    id="otp-code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otpCode}
                    onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="otp-field"
                  />
                </>
              )}
              {authError && <p className="auth-error">{authError}</p>}
              {requestId ? (
                <>
                  <Button onClick={verifyLoginCode} disabled={authBusy || otpCode.length !== 6}>{authBusy ? "正在验证…" : "验证并登录"}</Button>
                  <Button variant="ghost" onClick={() => { setRequestId(null); setOtpCode(""); setAuthError(""); }}>更换邮箱</Button>
                </>
              ) : (
                <Button onClick={requestLoginCode} disabled={authBusy || !accountEmail.trim()}>{authBusy ? "正在发送…" : "发送验证码"}</Button>
              )}
              <small>验证码有效期 10 分钟。登录成功后，不需要设置密码。</small>
            </div>
          ) : (
            <div className="account-content">
              <div className="provider-pending">
                <LockKeyhole />
                <h3>邮件服务待接入</h3>
                <p>登录流程和云端数据结构已经预留。接入邮件服务前，你仍可用本机模式完整学习，所有记录会保存在当前设备。</p>
              </div>
              <div className="account-status-list">
                <p><CircleCheck /><span>当前设备自动保存</span></p>
                <p><CircleCheck /><span>已缓存内容可离线打开</span></p>
                <p><Clock3 /><span>接入邮件服务后启用跨设备同步</span></p>
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
  words,
  phrases,
  filter,
  search,
  onFilter,
  onSearch,
  onTerm,
}: {
  words: YearWordItem[];
  phrases: YearPhraseItem[];
  filter: VocabularyFilter;
  search: string;
  onFilter: (filter: VocabularyFilter) => void;
  onSearch: (value: string) => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  const query = search.trim().toLowerCase();
  const visibleWords = words.filter((item) => !query || [
    item.headword,
    item.forms.join(" "),
    item.meaning,
    item.partOfSpeech,
  ].join(" ").toLowerCase().includes(query));
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
        <Badge variant="outline">2000 · 已精审内容</Badge>
        <p>当前覆盖完形与阅读 Passage 1 的正文、题干和选项；其余文章精审导入后会自动加入本表。</p>
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
                    <span className="vocabulary-entry-meta"><span>点击查看完整语法与搭配</span><b>{item.count} 次</b></span>
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

function QuestionAnalysisPanel({
  question,
  onTerm,
}: {
  question: Question;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
}) {
  const analysis = question.analysis;
  if (!analysis) return null;

  const optionAnalyses = question.options
    .map((option) => ({ option, analysis: analysis.options?.[option.key] }))
    .filter((item): item is { option: Question["options"][number]; analysis: SentenceAnalysis } => Boolean(item.analysis));

  return (
    <section className="question-analysis-panel" aria-label={`第 ${question.id} 题提交后句读`}>
      <div className="question-analysis-heading">
        <BookOpenCheck />
        <strong>提交后句读</strong>
        <span>题干、选项与正确答案的结构对照</span>
      </div>
      {analysis.prompt && (
        <QuestionAnalysisBlock
          label="题干"
          analysis={analysis.prompt}
          sentenceId={question.sentenceId}
          onTerm={onTerm}
          defaultOpen
        />
      )}
      {optionAnalyses.map(({ option, analysis: optionAnalysis }) => (
        <QuestionAnalysisBlock
          key={`${question.id}-${option.key}`}
          label={`${option.key} 选项`}
          analysis={optionAnalysis}
          sentenceId={question.sentenceId}
          onTerm={onTerm}
        />
      ))}
      {analysis.answer && (
        <QuestionAnalysisBlock
          label={`正确答案：${question.answer}`}
          analysis={analysis.answer}
          sentenceId={question.sentenceId}
          onTerm={onTerm}
          defaultOpen
          answer
        />
      )}
    </section>
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
        <p className="question-analysis-text">
          {renderInteractiveText(analysis.text, phrases, sentenceId, onTerm, true)}
        </p>
        <div className="question-colored-sentence">
          {analysis.chunks.map((chunk, index) => (
            <span key={`${analysis.id}-chunk-${index}`} className={roleClass(chunk.role)}>
              {renderInteractiveText(chunk.text, phrases, sentenceId, onTerm, true)}
            </span>
          ))}
        </div>
        <div className="question-trunk-row">
          <span>主干</span>
          <strong>{renderWords(analysis.trunk, sentenceId, onTerm, `${analysis.id}-trunk`)}</strong>
        </div>
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
        <div className="question-translation-block">
          <div><span>结构直译</span><p>{analysis.literal}</p></div>
          <div><span>通顺译文</span><p>{analysis.natural}</p></div>
        </div>
        <div className="question-logic-note"><Brain /><p><strong>句间逻辑</strong>{renderWords(analysis.logic, sentenceId, onTerm, `${analysis.id}-logic`)}</p></div>
      </div>
    </details>
  );
}

function StudySentence({
  sentence,
  isExpanded,
  isMarked,
  note,
  onToggle,
  onMark,
  onTerm,
  onNote,
}: {
  sentence: SentenceAnalysis;
  isExpanded: boolean;
  isMarked: boolean;
  note: string;
  onToggle: () => void;
  onMark: () => void;
  onTerm: (label: string, sentenceId: string, isPhrase?: boolean) => void;
  onNote: (value: string) => void;
}) {
  return (
    <article className={`sentence-card ${isExpanded ? "is-open" : ""}`}>
      <div className="sentence-toggle" onClick={onToggle}>
        <span className="sentence-number">{sentence.number}</span>
        <p>{renderInteractiveText(sentence.text, sentence.phrases, sentence.id, onTerm, false)}</p>
        <button
          type="button"
          className="expand-icon"
          onClick={(event) => { event.stopPropagation(); onToggle(); }}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? `收起第 ${sentence.number} 句讲解` : `展开第 ${sentence.number} 句讲解`}
        >{isExpanded ? <ChevronDown /> : <ChevronRight />}</button>
      </div>

      {isExpanded && (
        <div className="sentence-analysis">
          <div className="colored-sentence">
            {sentence.chunks.map((chunk, index) => (
              <span key={`${sentence.id}-${index}`} className={roleClass(chunk.role)}>
                {renderInteractiveText(chunk.text, sentence.phrases, sentence.id, onTerm, true)}
              </span>
            ))}
          </div>

          <div className="trunk-row">
            <span>主干</span>
            <strong>{renderWords(sentence.trunk, sentence.id, onTerm, `trunk-${sentence.id}`)}</strong>
          </div>

          <div className="analysis-grid">
            <section>
              <h3><Layers3 />逐层拆解</h3>
              <ol className="layer-list">
                {sentence.layers.map((layer, index) => (
                  <li key={layer.label}>
                    <span>{index + 1}</span>
                    <p><strong>{layer.label}</strong>{renderWords(layer.text, sentence.id, onTerm, `layer-${sentence.id}-${index}`)}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h3><Sparkles />语法提醒</h3>
              <ul className="grammar-list">
                {sentence.grammar.map((item, index) => (
                  <li key={item}>{renderWords(item, sentence.id, onTerm, `grammar-${sentence.id}-${index}`)}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="translation-block">
            <div><span>结构直译</span><p>{sentence.literal}</p></div>
            <div className="natural-translation"><span>通顺译文</span><p>{sentence.natural}</p></div>
          </div>

          <div className="logic-note"><Brain /><p><strong>句间逻辑</strong>{sentence.logic}</p></div>

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

function TermDetails({
  entry,
  sentenceId,
  onReference,
}: {
  entry: VocabEntry;
  sentenceId: string;
  onReference: (detail: ReferenceDetail, source: VocabEntry, sentenceId: string) => void;
}) {
  const structures = entry.structures ?? [];
  const collocations = (entry.collocationDetails ?? []).filter((item) => !item.meaning.includes("将在所属真题"));
  const synonyms = entry.synonymDetails ?? [];
  const family = entry.familyDetails ?? [];
  const specialForms = (entry.specialForms ?? []).filter(
    (item) => !item.startsWith("无需要") && !item.startsWith("结构词："),
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
        <details open>
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
        <details open={structures.length === 0}>
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

      {synonyms.length > 0 && (
        <details>
          <summary>考研近义词与区别 <span>{synonyms.length}</span></summary>
          <div className="detail-body">
            <ReferenceRows items={synonyms} entry={entry} sentenceId={sentenceId} onReference={onReference} />
          </div>
        </details>
      )}

      {entry.otherMeanings.length > 0 && (
        <details>
          <summary>熟词僻义与一词多义 <span>{entry.otherMeanings.length}</span></summary>
          <div className="detail-body"><ul>{entry.otherMeanings.map((item) => <li key={item}>{item}</li>)}</ul></div>
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
          <p className="count-scope">当前范围：已精审导入的 2000 年完形与阅读 Passage 1 正文、题干和选项</p>
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
          {entry.occurrences.map((item) => (
            <p key={`${item.year}-${item.excerpt}`} className="occurrence"><strong>{item.year} · {item.section}</strong>{item.excerpt}</p>
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

    const parts = segment.split(/((?:[A-Za-z]\.){2,}|(?<![0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:'[A-Za-z]+)?)/g);
    return parts.map((part, index) => {
      if (!/^(?:[A-Za-z]\.){2,}$|^[A-Za-z]+(?:-[A-Za-z]+)?(?:'[A-Za-z]+)?$/.test(part)) return part;
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
