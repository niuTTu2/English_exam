import type { ArticleContent, QuestionOptionKey, SentenceAnalysis } from "../data";
import type { PracticeTask } from "../learning-model";

/** UTF-16 half-open ranges into the ONE authoritative source text. */
export type TextRange = { start: number; end: number };
export const keySentenceReasons = ["answer-evidence", "inference-context", "paragraph-turn", "nested-clause", "attachment", "nonfinite-actor", "reference-or-scope", "misreading", "main-line"] as const;
export type QuickReading = {
  blocks: TextRange[];
  obstacle: string;
  keyReasons: Array<typeof keySentenceReasons[number]>;
};
export type SentenceRelationKind = "trunk" | "modifier" | "supplement" | "clause-internal";
export type GrammarPatch = { explanation: string; relation: string; term: string; transferRule: string };
export type PracticePurpose = "find-trunk" | "attachment-risk" | "question-relation" | "answer-scope" | "transfer";
export type QuestionCorrection = {
  /** References into this question's existing reasoning; no copied evidence or answer. */
  minimalEvidenceIds: string[];
  paraphraseIndexes: number[];
  byWrongOption: Partial<Record<QuestionOptionKey, { difference: string; recheck: PracticeTask }>>;
  correctCheck: PracticeTask;
};
export const vocabularyCategories = {
  core: "本篇核心词", sense: "熟词生义", collocation: "必会固定搭配", paraphrase: "题目同义替换", recognition: "识别即可",
} as const;
export type ArticleVocabularyFocus = {
  sourceId: string; expression: string; kind: "word" | "phrase";
  categories: Array<keyof typeof vocabularyCategories>;
  /** If listed as a question paraphrase, reference its reviewed chain. */
  questionLink?: { questionId: number; paraphraseIndex: number };
};
export const v2Pages = { exam: "做题", read: "快速读懂", analysis: "题目解析", vocabulary: "词汇搭配" } as const;
export type V2Page = keyof typeof v2Pages;
export function isV2Article(article: Pick<ArticleContent, "experienceVersion">): boolean { return article.experienceVersion === 2; }

/** Ordinary V2 sentences have no fabricated syntax. V1's required fields keep their types. */
export function createV2Sentence(input: Pick<SentenceAnalysis, "id" | "number" | "text" | "natural" | "logic" | "phrases"> & { quickReading: QuickReading } & Partial<SentenceAnalysis>): SentenceAnalysis {
  return { chunks: [], trunk: "", layers: [], grammar: [], literal: "", ...input };
}

export const followUpIntents = {
  sentence: "问这句话", option: "为什么不是这个选项", trunk: "我找不到主干", attachment: "这部分修饰谁", translation: "单词都认识但翻不通", simpler: "用更简单的话讲一次",
} as const;
export type FollowUpRequest = { articleId: string; sourceId: string; intent: keyof typeof followUpIntents; question: string };
/** Reserved adapter contract: answers are personal notes, never patches to official content. */
export type FollowUpAnswer = { requestId: string; text: string; destination: "personal-note" };
export type FollowUpProvider = { available: boolean; answer?: (request: FollowUpRequest & { id: string }) => Promise<FollowUpAnswer> };
export const personalNotesOnly: FollowUpProvider = { available: false };

export type ArticleV2Progress = { articleId: string; page: V2Page; elapsedMs: number; timerStartedAt?: number; updatedAt: number };
export type ArticleV2Mark = TextRange & { id: string; articleId: string; sourceId: string; kind: "word" | "phrase" | "sentence" | "option"; active: boolean; createdAt: number; updatedAt: number };
export type ArticleV2FollowUp = FollowUpRequest & { id: string; note: string; createdAt: number; updatedAt: number };
export type ArticleV2Data = {
  articleV2Progress?: Record<string, ArticleV2Progress>;
  articleV2Marks?: Record<string, ArticleV2Mark>;
  articleV2FollowUps?: Record<string, ArticleV2FollowUp>;
};
