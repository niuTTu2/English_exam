import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { translation2011Lexicon, translation2011CollocationGlosses, translation2011SentenceContexts } from "./2011-translation-lexicon";
const rows: PhraseRow[] = [
  ["same-volume-as", "the same volume of greenhouse gases as the world's airlines do", "the same + noun + as + comparison", "同等比较", "与全球航空业大致相同的温室气体量", "same限定volume，as从句do代替produce gases，外层about保留约数。", "The system uses the same amount of power as the old one does.", "这个系统的用电量与旧系统相同。", "do不是做某物，不将两个行业合计误当原文单一比较量。"],
  ["roughly-percent-of", "roughly 2 percent of all CO2 emissions", "roughly + percentage + of + total", "约数比例", "约占二氧化碳总排放量的2%", "roughly表示近似，of后为比例分母。", "It accounts for roughly 2 percent of emissions.", "它约占排放量的2%。", "原文历史估计非实时数据，不取消roughly。"],
  ["take-toll-on", "take a surprising toll on the environment", "take a toll on + affected object", "损害习语", "给环境带来意外的负担", "toll为损害或代价，on引受影响对象，surprising说明令人意外。", "Waste takes a toll on the environment.", "浪费会给环境造成损害。", "此toll不是收费站通行费。"],
  ["depend-on-2001p2", 'depending on how many attempts are needed to get the "right" answer', "depend on + factor/person", "依赖条件搭配", "取决于找到正确答案所需尝试次数", "depending分词作状语，on后接疑问从句而非单个名词。", "The result depends on how many attempts are made.", "结果取决于尝试多少次。", "复用depend-on-2001p2，不把不同年份另造同义原型。"],
  ["deliver-to", "deliver results to its users", "deliver A to B", "传递双对象", "向用户提供结果", "results为传递内容，to users为接收方，its指Google。", "The system delivers results to users.", "系统向用户返回结果。", "不将接收方与内容倒置。"],
  ["packed-with", "packed with powerful computers", "be packed with + contents", "装满搭配", "密集装有高性能计算机", "过去分词修饰centres，with引所装设备。", "The room is packed with computers.", "房间里装满计算机。", "powerful强调性能不等于能源效率高。"],
  ["large-quantities-of", "large quantities of CO2", "large quantities of + noun", "数量结构", "大量二氧化碳", "quantities表示大量，可接可数复数或不可数名词。", "The process produces large quantities of heat.", "这一过程产生大量热量。", "quantity数量与quality质量不混。"],
  ["great-deal-attention", "a great deal of heat", "a great deal of + uncountable noun", "不可数数量结构", "大量热量", "heat不可数，与a great deal of搭配；原型跨年份复用。", "The computers produce a great deal of heat.", "这些计算机产生大量热量。", "不要写a great deal of computers，可数复数另用many。"],
  ["well-air-conditioned", "well air-conditioned", "well + past participle/adjective", "程度修饰", "空调制冷充分的", "well修饰air-conditioned，说明机房冷却要求。", "The centre needs to be well air-conditioned.", "这个中心需要充分空调降温。", "well不是可能性副词，本句制冷导致额外耗能。"],
  ["monitor-closely", "monitor their efficiency closely", "monitor + object + closely", "严密监测", "密切监测自身效率", "closely是方式副词，说明持续细致跟踪。", "The firm monitors its efficiency closely.", "企业密切监测自身效率。", "不是仅在物理近距离观看。"],
  ["make-improvements", "make improvements", "make improvements", "改进搭配", "作出改进", "make为轻动词，improvements为具体改善行动。", "They monitored results and made improvements.", "他们监测结果并作出改进。", "改进不等于原问题已完全消失。"],
  ["first-step-road-to", "the first step on the road to reduction", "the first step on the road to + goal", "进程比喻", "迈向减排的第一步", "road比喻过程，to为介词引目标reduction。", "Monitoring is the first step on the road to improvement.", "监测是走向改进的第一步。", "第一步表明仍需后续行动，并非监测就已减排。"],
  ["more-to-be-done", "much more to be done", "more + to be + past participle", "不定式被动定语", "还有许多待完成的工作", "more为事情代词，to be done说明需被完成。", "There is much more to be done.", "还有许多事情需要做。", "there is是存在结构，不是地点那里。"],
  ["not-just-by", "not just by big companies", "not just by + agent", "施事范围扩展", "不应仅由大公司承担", "by依附前文be done，not just保留企业责任并扩大到其他主体。", "The work must be done, not just by big firms.", "这些工作必须完成，承担者不应仅是大企业。", "不只是不能译成完全不由大企业完成。"],
];
const reviewed = reviewedPhrases(rows);
export const translation2011PhraseGuides = reviewed.guides;
export const translation2011PhraseAliases = reviewed.aliases;
export const translation2011PhraseGlosses = { ...translation2011CollocationGlosses, ...reviewed.glosses };
export function getTranslation2011WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = translation2011Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? translation2011SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: translation2011CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
