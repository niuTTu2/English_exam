import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { writing2012BLexicon, writing2012BCollocationGlosses, writing2012BSentenceContexts } from "./2012-writing-b-lexicon";
const rows: PhraseRow[] = [
  ["based-on", "based on the following table", "be based on + evidence", "依据结构", "以下表为依据", "分词短语后置限定essay，on引参考表格。", "The essay is based on the table.", "这篇文章以下表为依据。", "不是没有依据地写个人经历；base与based的主动被动关系要分清。"],
  ["describe-table", "describe the table", "describe + object", "描述任务", "描述表格", "直接用表格作宾语，重点说明所含数据和差异。", "Describe the table accurately.", "准确描述表格。", "不写describe about，描述不等于证明原因。"],
  ["give-comments", "give your comments", "give comments on + topic", "发表评论", "提出看法", "give加名词comments，评论须与调查有关。", "Give comments on the survey.", "评论这项调查。", "不能把假设原因写成已被原表证明。"],
  ["p5-collocation-at-least", "at least 150 words", "at least + number", "数量下限", "至少150词", "包括150，不限制为恰好150。", "Write at least one hundred and fifty words.", "至少写一百五十词。", "不同于at most至多或about大约。"],
  ["on-answer-sheet", "on ANSWER SHEET 2", "on the answer sheet", "书写位置", "在答题纸上", "on指出文字书写的位置。", "Write on the answer sheet.", "在答题纸上作答。", "数字2是纸张编号，不是题目分值。"],
];
const reviewed = reviewedPhrases(rows);
export const writing2012BPhraseGuides = reviewed.guides;
export const writing2012BPhraseAliases = reviewed.aliases;
export const writing2012BPhraseGlosses: Record<string, { meaning: string; note: string }> = { ...writing2012BCollocationGlosses, ...reviewed.glosses };
export function getWriting2012BWordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = writing2012BLexicon[headword];
  const context = sentenceId ? writing2012BSentenceContexts[sentenceId]?.[headword] : undefined;
  const patterns = context?.preferredCollocations ?? entry?.collocations;
  if (!patterns?.length) return undefined;
  const rule = context?.use ?? entry?.use, grammarRole = context?.partOfSpeech ?? entry?.partOfSpeech;
  if (!rule || !grammarRole) throw new Error(`Missing table writing context: ${sentenceId}/${headword}`);
  return { grammarRole, grammarSummary: rule, structures: patterns.map(pattern => ({ pattern, meaning: writing2012BPhraseGlosses[pattern.toLowerCase()].meaning, rule })), pitfalls: entry?.examSynonyms ?? [] };
}
