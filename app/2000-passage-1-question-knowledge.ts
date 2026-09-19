import type { PhraseKnowledge } from "./knowledge-base";
type Seed = [string,string,string[],string,string,string,string];
const seeds: Seed[] = [
  ["make-efforts","make efforts towards a goal",["had made painstaking efforts towards this goal"],"为目标付出努力","make接efforts作宾语，towards引出努力目标；had made为过去完成时。","They made great efforts towards their goal.","他们为目标付出了很大努力。"],
  ["give-impetus","give an impetus to something",["had given an impetus to its economy"],"给某事带来推动力","an impetus为given的宾语，to引出受到推动的事物；不能把to解释为不定式。","The new policy gave an impetus to trade.","新政策推动了贸易。"],
  ["withdraw-to","withdraw to a place",["had withdrawn to its domestic market"],"退回某个地方","to表示退回终点；withdrawn是withdraw的过去分词，和had构成主动完成时。","The company withdrew to its domestic market.","该公司退回了国内市场。"],
  ["take-over-passive","be taken over by somebody",["had been taken over by foreign enterprises"],"被某方接管","take over整体是接管，by引施事；had been taken over断言过去之前已完成的被动事件。","The firm was taken over by a rival.","这家公司被竞争对手接管了。"],
  ["lose-part","lose part of something",["had lost part of its domestic market"],"失去某物的一部分","part是lost的宾语中心，of引出整体；不能将部分损失扩大为全部消失。","The company lost part of its market.","这家公司失去了部分市场。"],
  ["infer-from","infer a conclusion from evidence",["be inferred from the passage"],"根据证据作出推断","主动语序infer A from B；被动A be inferred from B把推断内容放主语位置。","A conclusion can be inferred from these facts.","可以从这些事实推出一个结论。"],
  ["shift-between","shift between A and B",["shift between self-doubt and blind pride"],"在两种状态之间转换","between A and B列出两端，A与B须为平行成分；不表示其中一方必然带来另一方。","Her attitude shifted between hope and fear.","她的心态在希望与恐惧之间摇摆。"],
  ["contribute-to","contribute to something",["contribute to economic progress"],"有助于某种结果","to是介词，接名词或动名词；contribute只说明贡献，不保证是唯一原因。","Competition may contribute to innovation.","竞争可能有助于创新。"],
  ["pave-way","pave the way for something",["pave the way for further development"],"为某事创造有利条件","pave the way为铺路的比喻，for引出后来发展的事项。","The discovery paved the way for further research.","这一发现为后续研究铺平了道路。"],
  ["attribute-passive","A be attributed to B",["can be attributed to"],"A被归因于B","被动结构把结果A放在主语位置，to后的B为原因，不能倒置因果。","The recovery can be attributed to several factors.","复苏可以归因于多个因素。"],
];
export const passage2000P1QuestionPhraseGuides: Record<string,PhraseKnowledge> = Object.fromEntries(seeds.map(([key,canonical,,meaning,rule,english,chinese])=>[`2000-p1-${key}`,{key:`2000-p1-${key}`,canonical,type:"题干与选项中的可迁移结构",meaning,summary:rule,grammarRole:"名词、动词及其补足关系",structures:[{pattern:canonical,meaning,rule,examples:[{english,chinese}]}]}]));
export const passage2000P1QuestionPhraseAliases = Object.fromEntries(seeds.flatMap(([key,,sources])=>sources.map(source=>[source.toLowerCase(),`2000-p1-${key}`])));
export const passage2000P1QuestionCollocationGlosses = Object.fromEntries(seeds.flatMap(([, ,sources,meaning,rule])=>sources.map(source=>[source.toLowerCase(),{meaning,note:rule}])));

passage2000P1QuestionPhraseAliases["depends on international cooperation"] = "depend-on-2001p2";
passage2000P1QuestionCollocationGlosses["depends on international cooperation"] = { meaning: "依赖国际合作", note: "depends与单数revival对应，on引出依赖对象。" };
