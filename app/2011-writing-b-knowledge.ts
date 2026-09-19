import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { writing2011BLexicon, writing2011BCollocationGlosses, writing2011BSentenceContexts } from "./2011-writing-b-lexicon";

const rows: PhraseRow[] = [
  ["give-comments", "give your comments", "give comments on + topic", "发表评论", "提出你的评论", "give接comments作宾语，your标明考生自己的意见；评论须关联图表但不能把假设当数据事实。", "Give your comments on the changes.", "请评论这些变化。", "comment可数名词，若作动词用comment on，不写comment something表示对此评论。"],
];
const reviewed = reviewedPhrases(rows);
export const writing2011BPhraseGuides = reviewed.guides;
export const writing2011BPhraseAliases: Record<string, string> = { ...reviewed.aliases, "based on the following chart": "based-on", "at least 150 words": "p5-collocation-at-least" };
export const writing2011BPhraseGlosses: Record<string, { meaning: string; note: string }> = {
  ...writing2011BCollocationGlosses, ...reviewed.glosses,
  "based on the following chart": { meaning: "以下图为依据", note: "based on过去分词短语后置修饰essay，复用be based on规范结构；图表给出的是部分品牌份额。" },
  "at least 150 words": { meaning: "至少150词", note: "at least表示最低数量，150符合要求，少于150未达到题目下限；不是约150或至多150。" },
};
export function getWriting2011BWordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = writing2011BLexicon[headword];
  const context = sentenceId ? writing2011BSentenceContexts[sentenceId]?.[headword] : undefined;
  const patterns = context?.preferredCollocations ?? entry?.collocations;
  if (!patterns?.length) return undefined;
  const rule = context?.use ?? entry?.use, grammarRole = context?.partOfSpeech ?? entry?.partOfSpeech;
  if (!rule || !grammarRole) throw new Error(`Missing chart writing context: ${sentenceId}/${headword}`);
  return { grammarRole, grammarSummary: rule, structures: patterns.map(pattern => ({ pattern, meaning: writing2011BPhraseGlosses[pattern.toLowerCase()].meaning, rule })), pitfalls: entry?.examSynonyms ?? [] };
}
