import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { writing2011ALexicon, writing2011ACollocationGlosses, writing2011ASentenceContexts } from "./2011-writing-a-lexicon";

const rows: PhraseRow[] = [
  ["be-admitted-to", "has just been admitted to a university", "be admitted to + institution", "录取搭配", "刚刚被大学录取", "has been admitted为完成时被动，to后接录取机构；admit过去式/分词双写t。", "She has been admitted to a university.", "她已被一所大学录取。", "不是承认一所大学；admit doing才常表示承认做过某事。"],
  ["congratulate-on", "congratulate him/her", "congratulate somebody on something", "祝贺搭配", "祝贺他或她", "congratulate直接接被祝贺的人，若写喜事用on引出；本题事件由上句提供。", "I congratulate you on your admission.", "我祝贺你被录取。", "不写congratulate somebody for；名词congratulations常用复数。"],
  ["get-prepared-for", "get prepared for university life", "get prepared for + event", "准备状态结构", "为大学生活做好准备", "get加分词描述进入准备好的状态，for后接事项或名词短语。", "We should get prepared for university life.", "我们应为大学生活做好准备。", "for为介词；若用动词目的可写prepare to do。"],
  ["about-number-words", "about 100 words", "about + number + words", "近似数量", "约100词", "about限定数量，原卷没有给出硬性的容差或扣分标准。", "Write a letter of about one hundred words.", "写一封约一百词的信。", "不要将about改成at least至少或at most至多。"],
];
const reviewed = reviewedPhrases(rows);
export const writing2011APhraseGuides = reviewed.guides;
export const writing2011APhraseAliases: Record<string, string> = { ...reviewed.aliases, "at the end of the letter": "2010-p1-at-the-end-of" };
export const writing2011APhraseGlosses: Record<string, { meaning: string; note: string }> = { ...writing2011ACollocationGlosses, ...reviewed.glosses, "at the end of the letter": { meaning: "在信的末尾", note: "空间/篇章位置，不是最终结果的in the end；复用既有at the end of结构。" } };
export function getWriting2011AWordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = writing2011ALexicon[headword];
  const context = sentenceId ? writing2011ASentenceContexts[sentenceId]?.[headword] : undefined;
  const patterns = context?.preferredCollocations ?? entry?.collocations;
  if (!patterns?.length) return undefined;
  const rule = context?.use ?? entry?.use;
  const grammarRole = context?.partOfSpeech ?? entry?.partOfSpeech;
  if (!rule || !grammarRole) throw new Error(`Missing writing word context: ${sentenceId}/${headword}`);
  return { grammarRole, grammarSummary: rule, structures: patterns.map(pattern => ({ pattern, meaning: writing2011APhraseGlosses[pattern.toLowerCase()].meaning, rule })), pitfalls: entry?.examSynonyms ?? [] };
}
