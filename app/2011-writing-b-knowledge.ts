import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { writing2011BLexicon, writing2011BCollocationGlosses, writing2011BSentenceContexts } from "./2011-writing-b-lexicon";

const rows: PhraseRow[] = [
  ["give-comments", "give your comments", "give comments on + topic", "发表评论", "提出你的评论", "give接comments作宾语，your标明考生自己的意见；评论须关联图表但不能把假设当数据事实。", "Give your comments on the changes.", "请评论这些变化。", "comment可数名词，若作动词用comment on，不写comment something表示对此评论。"],
];
const reviewed = reviewedPhrases(rows);
export const writing2011BPhraseGuides = reviewed.guides;
export const writing2011BPhraseAliases: Record<string, string> = { ...reviewed.aliases, "based on the following chart": "based-on", "at least 150 words": "p5-collocation-at-least" };
export const writing2011BPhraseGlosses = {
  ...writing2011BCollocationGlosses, ...reviewed.glosses,
  "based on the following chart": { meaning: "以下图为依据", note: "based on过去分词短语后置修饰essay，复用be based on规范结构；图表给出的是部分品牌份额。" },
  "at least 150 words": { meaning: "至少150词", note: "at least表示最低数量，150符合要求，少于150未达到题目下限；不是约150或至多150。" },
};
export function getWriting2011BWordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = writing2011BLexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? writing2011BSentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: writing2011BCollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
