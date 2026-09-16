import type { PhraseKnowledge } from "./knowledge-base";
import { passage2010P5CollocationNotes } from "./2010-passage-5-lexicon";
type Seed = [string, string, string, string, string, string, string, string];
const seeds: Seed[] = [
  ["both-a-and-b", "both A and B", "Both Boeing and Airbus", "A和B两者都", "并列同类成分，作主语时谓语一般用复数。", "Both birds and aircraft use moving air.", "鸟类和飞机都利用流动空气。", "不能混成both A or B。"],
  ["approach-to-doing", "an approach to doing something", "approach to cutting jet-fuel use", "做某事的方法", "to为介词，后接名词或动名词。", "They proposed an approach to saving fuel.", "他们提出一种节省燃油的方法。", "不能写approach to save来表示同样的名词补足关系。"],
  ["answer-lies-with", "the answer lies with somebody", "lies with birds", "答案在于某一方", "lie with表示答案或责任所在，with引来源或承担者。", "The answer lies with nature.", "答案要从自然中寻找。", "lie在此不是撒谎，也不是lay放置。"],
  ["fly-in-formation", "fly in formation", "flying in formation", "编队飞行", "in formation作方式状语；flying可作分词或动名词。", "The birds fly in formation.", "这些鸟编队飞行。", "formation是队形，不能仅译成形成过程。"],
  ["reduce-drag", "reduce drag", "reduced drag", "降低空气阻力", "drag为不可数阻力名词，reduced分词修饰较小的阻力。", "The design reduces drag.", "这种设计减小空气阻力。", "不要套用drag拖拉的动作义。"],
  ["spend-energy-doing", "spend energy doing something", "spend less energy propelling themselves", "做某事耗费能量", "doing说明能量耗费于什么活动，执行者与spend主语一致。", "Birds spend energy propelling themselves.", "鸟类耗费能量推进自身。", "本结构不使用spend energy to do。"],
  ["increase-of-percent", "an increase of a percentage", "a range increase of 71%", "增加某个百分比", "of引增幅，in通常引增加的指标；航程增加71%不是变为原来的71%。", "They observed an increase of ten percent.", "他们观察到10%的增幅。", "区分increase by增加了和increase to增加到。"],
  ["apply-principle-to", "apply something to something", "applied to aircraft", "把某物应用于某对象", "主动apply A to B；被动A be applied to B；本句为when省略结构。", "The principle is applied to aircraft.", "该原理被应用于飞机。", "applied的逻辑主语是principles，不是aircraft。"],
  ["have-a-turn", "have a turn", "have a turn", "轮到一次；得到一次机会", "turn为可数名词，指轮流参加的次序或机会。", "Each aircraft can have a turn.", "每架飞机都可以轮到一次。", "不是turn to求助或turn into变成。"],
  ["proceed-to-place", "proceed to a destination", "proceed to London", "继续前往某地", "to为方向介词，后接目的地；不是to do开始做另一件事。", "They proceed to London.", "它们继续飞往伦敦。", "目的地是London，前面的Utah为会合地。"],
  ["as-much-as-amount", "as much as an amount", "as much as 15%", "多达某数量", "在数值前突出幅度之大；与less连用仍表示比基准少。", "Fuel use fell by as much as fifteen percent.", "耗油量下降幅度多达15%。", "不要把15% less译成仅消耗15%。"],
  ["coupled-with", "be coupled with something", "coupled with a reduction", "与……伴随；结合", "过去分词短语可补充伴随现象，with接名词。", "The saving is coupled with lower emissions.", "节省伴随着较低排放。", "coupled不是完整的有限谓语，需区分分词补充与主句。"],
  ["fall-by-amount", "fall by an amount", "fell by around a quarter", "下降某个幅度", "by引下降幅度；around为约数，quarter为四分之一。", "Emissions fell by a quarter.", "排放量减少了四分之一。", "fall to a quarter才是降至四分之一。"],
  ["work-out-problem", "work out a problem", "to be worked out", "解决难题", "work out为可分短语动词；被动不定式to be worked out表示待解决。", "These problems must be worked out.", "这些问题必须解决。", "不是此处的健身或计算锻炼量。"],
  ["in-company", "in company", "in company", "结伴；有同伴", "介词短语作方式或情境状语，此处为飞机结伴飞行。", "They travel in company.", "他们结伴出行。", "company在此不是企业，不能译成在公司里。"],
  ["point-out-content", "point out that...", "points out", "指出……", "point out可接名词或that从句说明指出的内容。", "She points out that the plan needs testing.", "她指出该计划需要测试。", "point at偏指向某个对象，不能替换这里的说明内容。"],
  ["separated-by-distance", "be separated by a distance", "separated by several nautical miles", "相隔某个距离", "by引距离，several nautical miles为数海里。", "The aircraft are separated by several miles.", "飞机之间相隔数英里。", "此处by不是引被动动作的施动者。"],
  ["peer-out-of", "peer out of something", "peering out of the window", "从……向外仔细看", "out of表示视线从内部朝外；peering作乘客定语。", "She peered out of the window.", "她仔细向窗外看。", "peer为动词，不是同侪名词。"],
  ["another-matter", "be another matter", "is another matter", "是另一回事；另一个问题", "matter为问题名词，表明前一论点不足以回答后一问题。", "Whether it is allowed is another matter.", "是否获准是另一回事。", "不能把another matter译为另一种物质。"],
  ["blueprint-for", "a blueprint for something", "in a blueprint", "某项事务的规划蓝图", "for引规划对象，in说明纳入规划而非已经执行。", "The idea is in a blueprint for new rules.", "该想法被纳入新规则的规划蓝图。", "规划中的可能性不等于已获许可或已实施。"],
  ["remain-to-be-seen", "It remains to be seen + question clause", "remains to be seen", "某事仍有待确定", "It是形式主语，how/whether从句说明真正有待确定的问题。", "It remains to be seen how weather affects the plan.", "天气如何影响该计划仍有待确定。", "不是已经确定，也不强调视觉上看见。"],
  ["aircraft-wakes", "an aircraft's wake", "the planes' wakes", "飞机尾流", "planes为复数，所有格撇号置于s后；wake是空气动力名词。", "The aircraft's wake decays over time.", "飞机尾流随时间衰减。", "不能把wakes解释为醒来的动词。"],
  ["gain-from", "gain from something", "gain from formation flight", "从……获益", "from引受益来源；本句受益者为航空公司。", "Airlines may gain from formation flight.", "航空公司可能从编队飞行中受益。", "获益不等于已实现特定利润金额。"],
  ["in-contrast", "in contrast", "in contrast", "相比之下", "连接与前述情况不同的对照事物，此处货机对客机。", "Cargo flights, in contrast, may be easier to arrange.", "相比之下，货运航班可能更容易安排。", "对比不是说前句判断完全错误。"],
  ["as-it-happens", "as it happens", "As it happens", "碰巧；事实上", "固定评注从句引入与上下文相关的事实。", "As it happens, a study is already planned.", "事实上，一项研究已经列入计划。", "不能逐词译为随着它发生。"],
  ["armed-forces", "armed forces", "armed forces", "武装部队", "armed作定语，forces在该搭配中为军队。", "The armed forces are studying the idea.", "军方正在研究这个想法。", "不能只译成武装的力量数值。"],
  ["on-the-case", "be on the case", "on the case", "着手调查或处理某事", "on介词短语作表语，case为眼前待处理事务。", "The team is on the case.", "团队已在处理此事。", "case不是箱子，不必是司法案件。"],
  ["have-yet-to-do", "have yet to do something", "has yet to begin", "仍未做某事", "have/has yet to加原形，整体表达尚未完成。", "The programme has yet to begin.", "该项目尚未开始。", "不能因为has就译为已经开始。"],
  ["low-on-resource", "be low on something", "low on fuel", "某资源不足", "on引短缺资源，low形容存量低。", "The aircraft was low on fuel.", "那架飞机燃油不足。", "不是飞得低，也不是完全没有燃油。"],
  ["raf-pilot", "an RAF pilot", "an RAF pilot", "一名英国皇家空军飞行员", "冠词按读音选择；R读音开头是元音，故用an。", "His father was an RAF pilot.", "他的父亲曾是英国皇家空军飞行员。", "RAF不是美国空军；不能据家庭背景确定轶闻真实。"],
];
export const passage2010P5PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, canonical, , meaning, rule, english, chinese, pitfall]) => [key, { key, canonical, type: "航空与论证语篇搭配", meaning, summary: `${meaning}。${rule}`, grammarRole: rule, structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall] }]));
export const passage2010P5PhraseAliases: Record<string, string> = Object.fromEntries(seeds.flatMap(([key, canonical, source]) => [source, canonical].map(text => [text.toLowerCase(), key])));
Object.assign(passage2010P5PhraseAliases, { "make a difference": "almost-no-difference", "require them to buy new aircraft": "require-sb-to-do", "known as upwash": "2010-also-known-as-a-h1n1", "one of the areas": "one-of-series" });
export const passage2010P5CollocationGlosses = { ...passage2010P5CollocationNotes, ...Object.fromEntries(seeds.map(([, , source, meaning, note]) => [source.toLowerCase(), { meaning, note }])) };
