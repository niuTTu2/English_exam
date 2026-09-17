export type PassageEvidence = { sentenceId: string; quote: string; role: string };
export type QuestionScope = "sentence" | "adjacent-sentences" | "paragraph" | "whole-passage";
export const scopeLabels: Record<QuestionScope, string> = { sentence: "单句定位", "adjacent-sentences": "前后句联合定位", paragraph: "段落范围", "whole-passage": "全文范围" };
export type DistractorType = "无中生有" | "偷换对象" | "范围扩大" | "范围过窄" | "因果倒置" | "时间错位" | "过度绝对" | "把局部当全文" | "观点归属错误" | "与原文相反" | "事实成立，非本题所求";
export type QuestionReasoning = {
  questionType: string;
  scope: QuestionScope;
  restatement: string;
  keyInstruction: string;
  /** 每组至少命中一句；用于提示学生是否选中了关键定位，并非自动语义评分。 */
  locatingGroups?: string[][];
  evidence: Array<PassageEvidence & { id: string; strength: "直接证据" | "上下文推断" | "全文概括" }>;
  paraphrases: Array<{ evidenceIds: string[]; meaning: string; optionText: string; relation: "同义转换" | "矛盾对照"; limit: string }>;
  options: Record<string, { judgment: "选入" | "排除"; errorType?: DistractorType; evidenceIds: string[]; reasoning: string }>;
  transfer: string;
  wordingNotes?: Array<{ sourceId: string; text: string; explanation: string }>;
};
export type ArticleGuide = {
  route: string[];
  mainIdea: string;
  paragraphs: Array<{ paragraphId: string; title: string; summary: string; relation: string }>;
  sentenceRoles: Record<string, string>;
  references: Array<{ expression: string; sentenceId: string; referent: string; targetSentenceIds: string[]; explanation: string }>;
  timeline: Array<{ label: string; event: string; evidence: PassageEvidence[] }>;
  voices: Array<{ speaker: string; claim: string; boundary: string; evidence: PassageEvidence[] }>;
};
