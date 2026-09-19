import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { writing2012ALexicon, writing2012ACollocationGlosses, writing2012ASentenceContexts } from "./2012-writing-a-lexicon";
const rows: PhraseRow[] = [
  ["something-wrong-with", "something wrong with the electronic dictionary", "something wrong with + item", "不定代词后置形容词", "某物有问题", "wrong在something之后，with接出故障的物品。", "There is something wrong with the dictionary.", "这部词典有问题。", "不写wrong something，也不把with译成和词典一起。"],
  ["the-other-day", "the other day", "the other day", "过去时间习语", "前几天；最近某一天", "通常配合过去时，说明近期发生的事情。", "I bought it the other day.", "我是前几天买的。", "不是the next day第二天，也不是另一个未来日期。"],
  ["make-complaint", "make a complaint", "make a complaint about something", "投诉搭配", "提出投诉", "complaint为可数名词，前面用a；about引投诉事项。", "I would like to make a complaint about the product.", "我想投诉这件产品。", "动词complain不加t，不写make a complain。"],
  ["demand-solution", "demand a prompt solution", "demand a prompt solution", "处理要求", "要求及时解决", "prompt为及时的，solution为方案；态度明确仍可礼貌表述。", "Customers demand a prompt solution.", "顾客要求及时解决。", "不是demand somebody do的完整从句，也不把prompt当提示。"],
  ["about-number-words", "about 100 words", "about + number + words", "近似词数结构", "约100词", "about表大约，不替换为至少或精确值。", "Write about one hundred words.", "写约一百词。", "原题不提供具体容差，不自造扣分区间。"],
  ["on-answer-sheet", "on ANSWER SHEET 2", "on the answer sheet", "书写位置", "在答题纸上", "on说明书写载体，数字2为答题纸编号。", "Write your answer on the answer sheet.", "请在答题纸上作答。", "网站保留原试卷说明，不要求用户填写纸质地址。"],
  ["2010-p1-at-the-end-of", "at the end of the letter", "at the end of + noun", "位置结构", "在……的末尾", "of引书信文本，定位署名位置。", "Sign at the end of the letter.", "在信的末尾署名。", "in the end是最终，不带这一of所属宾语。"],
  ["use-instead", "Use “Zhang Wei” instead", "use A instead", "代用结构", "改用A", "instead单独作副词，替代上文不应使用的真实姓名。", "Use the given name instead.", "请改用给定姓名。", "instead of后必须接被替代对象，不能只机械加of。"],
  ["do-not-write-address", "Do not write your address", "do not + verb", "否定祈使", "不要做……", "do not后接动词原形，本题宾语为住址。", "Do not write your real address.", "不要写你的真实地址。", "do为助动词，不译成做，也不将write改成writes。"],
];
const reviewed = reviewedPhrases(rows);
export const writing2012APhraseGuides = reviewed.guides;
export const writing2012APhraseAliases = reviewed.aliases;
export const writing2012APhraseGlosses: Record<string, { meaning: string; note: string }> = { ...writing2012ACollocationGlosses, ...reviewed.glosses };
export function getWriting2012AWordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = writing2012ALexicon[headword];
  const context = sentenceId ? writing2012ASentenceContexts[sentenceId]?.[headword] : undefined;
  const patterns = context?.preferredCollocations ?? entry?.collocations;
  if (!patterns?.length) return undefined;
  const rule = context?.use ?? entry?.use, grammarRole = context?.partOfSpeech ?? entry?.partOfSpeech;
  if (!rule || !grammarRole) throw new Error(`Missing complaint writing context: ${sentenceId}/${headword}`);
  return { grammarRole, grammarSummary: rule, structures: patterns.map(pattern => ({ pattern, meaning: writing2012APhraseGlosses[pattern.toLowerCase()].meaning, rule })), pitfalls: entry?.examSynonyms ?? [] };
}
