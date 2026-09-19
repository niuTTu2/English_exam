import type { SentenceWordContext } from "./contextual-vocabulary";
import type { PhraseKnowledge } from "./knowledge-base";
import { translation2011ReviewedContexts } from "./2011-translation-contexts";
import { translation2011SentenceContexts } from "./2011-translation-lexicon";
import { translation2011PhraseGuides } from "./2011-translation-knowledge";

type SourcePhrase = [sentence: number, heads: string[], expression: string, key: string, canonical: string, meaning: string, rule: string];
const rows: SourcePhrase[] = [
  [1, ["who", "will", "have", "think"], "Who would have thought", "who-would-have-thought", "Who would have thought + that-clause", "谁会想到……", "反问主语为Who，would have thought为情态完成式，后接所想到的内容。"],
  [1, ["that", "globally"], "that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do", "think-that-content", "think + that-clause", "想到全球信息技术业的排放量与航空业大致相同", "that引出thought的内容，globally插入限定全球范围，内部包含as比较从句。"],
  [1, ["the", "it", "industry", "produce"], "the IT industry produces", "it-industry-produces", "the IT industry + singular predicate", "信息技术业产生", "IT为信息技术缩写；单数主语中心industry与produces一致。"],
  [1, ["about"], "about the same volume", "about-the-same", "about the same + noun", "大致相同的量", "about为近似程度副词，不是表示关于某主题的介词。"],
  [1, ["same", "volume", "of", "greenhouse", "gas", "as", "world", "airline", "do"], "the same volume of greenhouse gases as the world's airlines do", "same-volume-as", "the same + noun + as + comparison", "与全球航空业相同的温室气体量", "same与as配合，do替代排放动作；此片段外的about保留近似程度。"],
  [1, ["roughly", "percent", "all", "co2", "emission"], "roughly 2 percent of all CO2 emissions", "roughly-percent-of", "roughly + percentage + of + total", "约占全部二氧化碳排放的2%", "roughly修饰比例，of引出分母；保留原文历史约数。"],
  [2, ["many", "everyday", "task"], "Many everyday tasks", "many-everyday-tasks", "many + adjective + plural noun", "许多日常活动", "many限定可数复数tasks，everyday是合写的形容词，不是every day时间状语。"],
  [2, ["take", "a", "surprising", "toll", "on", "the", "environment"], "take a surprising toll on the environment", "take-toll-on", "take a toll on + affected object", "给环境造成令人意外的损害", "toll为损害，on引出受影响对象；surprising修饰损害令人意外。"],
  [3, ["a", "google", "search"], "A Google search", "a-google-search", "a + service name + search", "一次谷歌搜索", "search作可数行为名词，A表示一次，Google作来源定语。"],
  [3, ["can", "leak"], "can leak between 0.2 and 7.0 grams of CO2", "can-leak-quantity", "can leak + quantity", "可能排放0.2至7.0克二氧化碳", "can保留可能性；leak借指数字活动带来的排放，单位为克。"],
  [3, ["between", "and"], "between 0.2 and 7.0", "between-a-and-b", "between A and B", "在0.2与7.0之间", "复用既有between A and B规范键，此处两端是数值，不是两数相加。"],
  [3, ["gram", "of", "co2"], "grams of CO2", "grams-of-substance", "grams of + substance", "以克计的二氧化碳", "grams是单位，of引出被计量物质；不能擅换单位。"],
  [3, ["depend", "on", "how", "many", "attempt", "be", "need"], 'depending on how many attempts are needed to get the "right" answer', "depend-on-2001p2", "depend on + factor/person", "取决于找到正确答案所需的尝试次数", "depending on后接疑问内容从句；how many attempts为are needed主语，to get表目的。"],
  [3, ["to", "get", "the", "right", "answer"], 'to get the "right" answer', "get-the-right-answer", "to get the right answer", "为了找到正确答案", "目的不定式接名词宾语answer，保留原卷right两侧引号。"],
  [4, ["to", "deliver", "result", "its", "user"], "deliver results to its users", "deliver-to", "deliver A to B", "向用户提供结果", "results是交付内容，to its users为接收方；its指Google。"],
  [4, ["quickly"], "deliver results to its users quickly", "deliver-quickly", "deliver + object + to somebody + quickly", "迅速向用户提供结果", "quickly修饰deliver，不描述数据中心维护速度。"],
  [4, ["then"], "then, Google has to maintain", "then-inference", "then, + inferred statement", "因此谷歌必须维护", "then在此标推论，不构造前后时间顺序。"],
  [4, ["google", "have", "maintain"], "Google has to maintain", "have-to-do", "have to + verb", "谷歌必须维护", "has to表必要性，maintain使用原形，不能误判为完成时。"],
  [4, ["vast", "data", "centre"], "vast data centres around the world", "data-centres-around-world", "data centres around the world", "分布在世界各地的庞大数据中心", "centres为宾语中心，around the world限定设施分布，vast说明规模。"],
  [4, ["around", "the", "world"], "around the world", "around-the-world", "around the world", "世界各地", "此处是地点分布，不表示绕地球运动。"],
  [4, ["pack", "with", "powerful", "computer"], "packed with powerful computers", "packed-with", "be packed with + contents", "密集装有高性能计算机", "packed为修饰data centres的过去分词，with引所装设备。"],
  [5, ["while", "produce"], "While producing large quantities of CO2", "while-doing-time", "while + present participle", "在产生大量二氧化碳的同时", "省略与主句相同的these computers和be，表同时而非让步。"],
  [5, ["large", "quantity", "co2"], "large quantities of CO2", "large-quantities-of", "large quantities of + noun", "大量二氧化碳", "quantities是数量中心，CO2是产生的物质，不等于后面的热量。"],
  [5, ["these", "computer"], "these computers", "these-computers-reference", "these + plural noun", "这些计算机", "指示限定词these回指上一句数据中心中的高性能设备。"],
  [5, ["emit"], "emit a great deal of heat", "emit-heat", "emit heat", "释放大量热量", "emit在本主句接heat作宾语，CO2在前面的分词结构中。"],
  [5, ["a", "great", "deal", "of", "heat"], "a great deal of heat", "great-deal-attention", "a great deal of + uncountable noun", "大量热量", "沿用既有数量规范键，heat是不可数名词。"],
  [5, ["so", "the", "centre", "need", "to", "be"], "so the centres need to be well air-conditioned", "need-to-be-passive", "need to be + past participle", "所以这些中心需要得到充分空调制冷", "so连接发热与制冷需求，need为实义动词，后接被动不定式。"],
  [5, ["well", "air-conditioned"], "well air-conditioned", "well-air-conditioned", "well + past participle/adjective", "空调制冷充分的", "well修饰制冷程度或效果，不是健康的形容词。"],
  [5, ["which", "use"], "which uses even more energy", "which-clause-action-reference", "which + singular predicate", "而这又消耗更多能源", "which概括前述制冷做法，uses为单数，不指复数centres。"],
  [5, ["even", "more", "energy"], "even more energy", "even-more-quantity", "even more + uncountable noun", "还要更多的能源", "even加强more的比较，more限定energy；不是独立代表工作的代词。"],
  [6, ["however"], "However, Google and other big tech providers", "however-transition", "However, + statement", "不过，谷歌和其他大型技术服务商", "However把话题转向改进措施，不否定已述环境负担。"],
  [6, ["google", "and", "other", "big", "tech", "provider"], "Google and other big tech providers", "company-and-other-providers", "a company and other providers", "谷歌和其他大型技术服务商", "第一个and连接主语两部分，整个主语共同支配monitor与make。"],
  [6, ["monitor", "their", "efficiency", "closely"], "monitor their efficiency closely", "monitor-closely", "monitor + object + closely", "密切监测自身效率", "their回指共同主语，closely限定monitor的方式，不是空间距离。"],
  [6, ["make", "improvement"], "make improvements", "make-improvements", "make improvements", "作出改进", "make为实义动词，与monitor共享主体；改进不等于完全消除问题。"],
  [7, ["monitor", "be"], "Monitoring is the first step", "monitoring-first-step", "gerund + be + predicative noun", "监测是第一步", "Monitoring动名词作主语，is为系动词，the first step为表语。"],
  [7, ["the", "first", "step", "on", "road", "reduction"], "the first step on the road to reduction", "first-step-road-to", "the first step on the road to + goal", "迈向减排的第一步", "road比喻进程，to reduction为目标修饰；第一步不等于完成目标。"],
  [7, ["but", "there"], "but there is much more to be done", "there-is-more-to-do", "there is + something + to be done", "但还有许多事情有待完成", "but表示转折，there is为存在句，there不是地点副词。"],
  [7, ["much", "more", "to", "do"], "much more to be done", "more-to-be-done", "more + to be + past participle", "更多有待完成的事情", "more指事情，much加强比较程度，to be done是被动不定式定语。"],
  [7, ["and", "not", "just", "by", "big", "company"], "not just by big companies", "not-just-by", "not just by + agent", "不只是由大公司承担", "and把这项施事范围补充接回前文；not just扩大而非排除企业责任。"],
];

export const translation2011PreferredContexts: Record<string, Record<string, SentenceWordContext>> = {};
export const translation2011SourcePhraseGuides: Record<string, PhraseKnowledge> = {};
export const translation2011SourcePhraseAliases: Record<string, string> = {};
export const translation2011SourceCollocationGlosses: Record<string, { meaning: string; note: string }> = {};
const sharedKeys = new Set(["between-a-and-b"]);

for (const [number, heads, expression, key, canonical, meaning, rule] of rows) {
  const sourceId = `2011-translation-s${number}`;
  if (!translation2011PhraseGuides[key] && !sharedKeys.has(key)) {
    translation2011SourcePhraseGuides[key] = { key, canonical, type: "句内搭配与结构", meaning, summary: rule, grammarRole: rule, structures: [{ pattern: canonical, meaning, rule, examples: [{ english: expression, chinese: meaning }] }], pitfalls: [] };
  }
  translation2011SourcePhraseAliases[expression.toLowerCase()] = key;
  translation2011SourceCollocationGlosses[expression.toLowerCase()] = { meaning, note: rule };
  for (const head of heads) {
    if (!translation2011ReviewedContexts[sourceId]?.[head]) throw new Error(`${sourceId}/${head}: 搭配缺少本句词卡`);
    if (translation2011PreferredContexts[sourceId]?.[head]) throw new Error(`${sourceId}/${head}: 重复指定首选搭配`);
    (translation2011PreferredContexts[sourceId] ??= {})[head] = { preferredCollocations: [expression] };
  }
}

export const translation2011TrainingContexts: Record<string, Record<string, SentenceWordContext>> = Object.fromEntries(Object.entries(translation2011ReviewedContexts).map(([sourceId, words]) => [sourceId, Object.fromEntries(Object.entries(words).map(([head, context]) => [head, { ...translation2011SentenceContexts[sourceId]?.[head], ...context, ...translation2011PreferredContexts[sourceId]?.[head] }]))]));
