import { getPassage2011P1SourceKnowledge, passage2011P1ContextGlosses } from "./2011-passage-1-contexts";
import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2011P1Lexicon, passage2011P1CollocationGlosses, passage2011P1SentenceContexts } from "./2011-passage-1-lexicon";

const rows: PhraseRow[] = [
  ["as-role", "as an outside director", "as + role", "身份介词短语", "以外部董事身份", "as引身份而非时间，作joined的身份状语。", "She joined the board as an adviser.", "她以顾问身份加入董事会。", "as在此不引完整从句。"],
  ["without-attracting-criticism", "without attracting much criticism", "without + doing", "否定伴随状语", "未招致太多批评", "without后接动名词，逻辑主语与she一致。", "He left without attracting attention.", "他离开时没有引起注意。", "without后不能直接接动词原形。"],
  ["under-fire", "under fire", "be under fire for + noun/doing", "比喻性习语", "因……遭到抨击", "for引遭批评的原因，under fire整体作表语。", "The board was under fire for its decision.", "董事会因其决定受到抨击。", "商业评论中不按字面译成遭枪击。"],
  ["sit-on-committee", "having sat on Goldman's compensation committee", "sit on a committee", "组织任职搭配", "曾任高盛薪酬委员会成员", "having sat为完成式动名词，先于受批评发生；sit on表示成员身份。", "She sits on the compensation committee.", "她是薪酬委员会成员。", "sat是不规则过去分词，不是seat的词形。"],
  ["pass-unremarked", "pass unremarked", "pass + adjective", "状态补足结构", "未经评论或质疑就通过", "pass后形容词说明通过时的状态；原句受let支配用原形。", "The change did not pass unremarked.", "这项变化并没有悄无声息地过去。", "unremarked不等于unremarkable平平无奇。"],
  ["take-up-time", "taking up too much time", "take up + time/space", "短语动词", "占用太多时间", "up为动词小品词，time为占用的资源。", "The role takes up too much time.", "这项职务占用了太多时间。", "too much修饰不可数名词，不能写too many time。"],
  ["be-supposed-to-do", "are supposed to serve", "be supposed to do", "规范预期结构", "理应发挥作用", "描述职责或期待，并不保证现实中已经实现。", "Directors are supposed to question proposals.", "董事理应质询提案。", "态度题不能把应有职责读成现实表扬。"],
  ["on-a-board", "on a firm's board", "be/serve on a board", "任职介词搭配", "在公司董事会任职", "on表成员身份；firm's说明董事会所属。", "She serves on two boards.", "她在两个董事会任职。", "不同于on board交通工具上的表达。"],
  ["disagree-with", "disagree with the chief executive's proposals", "disagree with + person/opinion", "动词介词搭配", "不同意首席执行官的提案", "with引出不同意的人或观点，不能省略后直接接提案。", "The adviser disagreed with the proposal.", "顾问不赞同这份提案。", "不同意不等于已经正式否决。"],
  ["weather-a-crisis", "having weathered their own crises", "weather a crisis", "动词熟词义", "曾经渡过各自的危机", "weather及物表经受住；having weathered作on的动名词宾语。", "The firm weathered the crisis.", "这家公司渡过了危机。", "crisis的复数是crises；weather此处非天气名词。"],
  ["from-one-to-next", "from one proxy statement to the next", "from one + noun + to the next", "连续跨度结构", "从一份委托投票说明书到下一份", "the next省略重复名词statement，通过前后披露判断董事是否仍任职。", "The name remained from one report to the next.", "前后两份报告都保留了这个名字。", "不擅自将披露间隔解释为两个完整任期。"],
  ["under-age-of", "under the age of 70", "under the age of + number", "年龄限定", "未满70岁", "under表示严格小于该年龄，后置限定directors。", "The study focused on people under the age of 70.", "研究重点考察70岁以下的人。", "不能包含已满70岁，也不是职位等级。"],
  ["restate-earnings", "restate earnings", "restate earnings", "财务搭配", "重述盈利数据", "restate为重新披露或修订原来报告的信息，不等于利润上升。", "The company had to restate earnings.", "这家公司不得不重述盈利数据。", "增加的是重述的概率，不是盈利金额。"],
  ["increase-by-amount", "increases by nearly 20%", "increase by + amount", "幅度介词搭配", "增加近20%", "by说明相对变化幅度，to才说明达到的水平。", "The probability increased by 20%.", "这一概率增加了20%。", "不要自行译成上升20个百分点。"],
  ["named-in-lawsuit", "being named in a federal class-action lawsuit", "be named in a lawsuit", "被动诉讼搭配", "被列入联邦集体诉讼", "being named为被动动名词，作of宾语。", "The firm was named in a lawsuit.", "该公司被列入一宗诉讼。", "被起诉不等于已经败诉。"],
  ["be-likely-to-do", "is likely to perform worse", "be likely to do", "可能性系表结构", "可能表现更差", "likely形容词与be连用，to后为具体事件。", "The stock is likely to recover.", "这只股票可能回升。", "likely不等于certain，不删除概率限制。"],
  ["tend-to-do", "tended to be larger", "tend to do", "趋势搭配", "往往更大", "tend描述总体趋势，原文过去时对应研究观察。", "The effect tends to be larger in big firms.", "这种效应在大公司中往往更大。", "趋势不是对每一案例的绝对断言。"],
  ["jump-off-sinking-ship", "jumping off a sinking ship", "jump off a sinking ship", "比喻性动词短语", "从前景不妙的公司提前脱身", "sinking分词修饰ship，比喻陷入危机的组织。", "Leaving early can look like jumping off a sinking ship.", "提前离开可能显得像是在危机前脱身。", "本文not always否定一概而论，不否认任何逃避动机。"],
  ["trade-up", '"trade up,"', "trade up", "短语动词比喻", "升级换岗；另谋高就", "通常表换成更好的物品，本文指选择更稳、更大的公司。", "Some directors trade up to larger firms.", "有些董事转到更大的公司谋求更好职位。", "不是单指股票买卖；原文引号属于表达本身的标点。"],
  ["leave-a-for-b", "leaving riskier, smaller firms for larger and more stable firms", "leave A for B", "去向结构", "离开风险较高的小公司，转去更大更稳的公司", "A为离开的组织，for后的B为去向，两个比较层次保持对应。", "She left a small firm for a larger one.", "她离开一家小公司，转到了一家大公司。", "不能把B的稳定属性套到离开的A。"],
  ["have-easier-time-doing", "have an easier time of avoiding a blow to their reputations", "have an easier time of doing", "难易程度搭配", "更容易避免声誉受损", "of后接doing说明哪项行动比较容易，time不指次数。", "Early leavers have an easier time of protecting their reputations.", "提前离职者较容易保护自己的声誉。", "a blow to引受打击对象，不要译成声誉发出的打击。"],
  ["news-breaks", "before bad news breaks", "news breaks", "消息公开搭配", "在坏消息曝光之前", "before引时间从句；news不可数按单数配breaks。", "The director left before the news broke.", "董事在消息传出前离职了。", "break是传出消息，不是打破新闻。"],
  ["through-tough-times", "through tough times", "through tough times", "时间过程状语", "度过艰难时期", "through强调贯穿困难过程，修饰keep的持续范围。", "The advisers stayed through tough times.", "这些顾问在艰难时期仍然留任。", "times是时期复数，不表示倍数。"],
  ["follow-example-of", "follow the example of Ms. Simmons", "follow the example of somebody", "仿效搭配", "效仿西蒙斯的做法", "of引出被效仿者，例子指前文离任选择。", "Others followed the example of the first director.", "其他人效仿了第一位董事的做法。", "follow不按物理跟随理解。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2011P1PhraseGuides = reviewed.guides;
export const passage2011P1PhraseAliases = reviewed.aliases;
export const passage2011P1PhraseGlosses = { ...passage2011P1CollocationGlosses, ...reviewed.glosses, ...passage2011P1ContextGlosses };

export function getPassage2011P1WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const sourceKnowledge = getPassage2011P1SourceKnowledge(headword, sentenceId);
  if (sourceKnowledge) return sourceKnowledge;
  const entry = passage2011P1Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2011P1SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2011P1CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}

Object.assign(passage2011P1PhraseGlosses, {
  "she said": { meaning: "她说道", note: "后置的主动引述语：she为说话者，said标明前面解释的来源。" },
  "their own crises": { meaning: "他们自己的危机", note: "own强调董事亲自经历的危机，不是动词拥有。" },
  "does not mean that": { meaning: "并不意味着……", note: "mean接完整内容从句；本篇否定由相关性推出总是逃避危机的推断。" },
  "do less well": { meaning: "表现较差", note: "do为实义动词表现，less well为副词比较结构，与perform worse对应。" },
  "a positive attitude": { meaning: "积极肯定的态度", note: "positive在态度题中表示积极肯定；应结合全文证据判断该评价是否成立。" },
  "a critical attitude": { meaning: "批评的态度", note: "critical在此指出问题，不是关键的或危急的；与scornful的强烈轻蔑有别。" },
});
