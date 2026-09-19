import type { PhraseKnowledge } from "./knowledge-base";
// 连续原文与规范原型分开保存；每条规则按当前题目语境审定。
const entries: Array<[string, string, string, string, string]> = [
["how much control", "how much + uncountable noun", "多大控制力", "程度疑问名词短语", "how much限定不可数control，整个名词组作has的前置宾语，不是倒装问句。"],
["over foreign corporations", "control over somebody/something", "对外国公司（的控制）", "名词的对象介词补足", "over接受控制的对象，补足前面的control；中间插入it has不改变名词与介词的关系。"],
  [
    "Digital divide",
    "digital divide",
    "数字鸿沟",
    "概念名词",
    "指信息富有者与信息贫乏者之间的差距，题干something由选项进一步限定。"
  ],
  [
    "getting worse",
    "get worse",
    "变得更糟",
    "系动词与比较级表语",
    "getting为分词形式，worse为形容词表语，表示状况恶化，不是得到坏东西。"
  ],
  [
    "because of the Internet",
    "because of + noun",
    "因为互联网",
    "原因介词短语",
    "because of接名词而非完整主谓句，选项把互联网说成恶化原因。"
  ],
  [
    "are responsible for",
    "be responsible for something",
    "对……负责",
    "形容词与介词补足",
    "for的宾语由题干something承接，省略的宾语关系词不取消从句内部are这一限定谓语。"
  ],
  [
    "must guard against",
    "guard against something",
    "必须防范",
    "情态动词与介词动词",
    "against的对象是题干something，the world为从句主语，不能把本选项当无谓语短语。"
  ],
  [
    "considered positive today",
    "be considered positive",
    "如今被认为是积极的",
    "过去分词后置限定",
    "considered本身无独立时态，positive为评价内容，today限定评价发生时间。"
  ],
  [
    "attach importance to the Internet",
    "attach importance to something",
    "重视互联网",
    "动宾与介词补足",
    "importance为宾语，to接受到重视的对象，不是不定式标记。"
  ],
  [
    "economic potentials",
    "economic potential",
    "经济潜力",
    "名词与领域修饰",
    "economic限定潜力所属领域；保留选项potentials复数，不擅改原文。"
  ],
  [
    "bring foreign funds",
    "bring foreign funds",
    "带来外国资金",
    "动宾结构",
    "funds为复数名词，foreign标明资金来源，选项提出引资而非所有经济机会。"
  ],
  [
    "wipe out world poverty",
    "wipe out something",
    "消除世界贫困",
    "短语动词与宾语",
    "wipe out表示彻底消除，world poverty为对象；选项soon进一步加强时间承诺。"
  ],
  [
    "all over the world",
    "all over the world",
    "世界各地",
    "范围介词短语",
    "all over整体给出连接涉及的地域范围，不等于经济动机本身。"
  ],
  [
    "the case of the United States",
    "the case of + example",
    "美国这个案例",
    "案例名词与例证对象",
    "case在此是论证实例，of说明哪个国家的经历，不能理解为诉讼案件。"
  ],
  [
    "to justify the policy",
    "justify a policy",
    "为了论证政策合理性",
    "目的不定式",
    "to justify修饰giving the case所表达的举例行为，政策内容由选项补全。"
  ],
  [
    "providing financial support overseas",
    "provide financial support overseas",
    "向海外提供资金支持",
    "动名词宾语内容",
    "providing为行为名词化，support是名词宾语，overseas说明资助流向，与接受外资方向相反。"
  ],
  [
    "foreign capital’s control",
    "foreign capital’s control",
    "外国资本实施的控制",
    "所有格名词短语",
    "capital’s给出控制的施事，control为preventing的宾语，不是本国监管外国企业。"
  ],
  [
    "building industrial infrastructure",
    "build industrial infrastructure",
    "建设工业基础设施",
    "动名词宾语内容",
    "building接infrastructure为宾语，不是建筑物名词；这只是案例中的建设行为。"
  ],
  [
    "accepting foreign investment",
    "accept foreign investment",
    "接受外国投资",
    "动名词宾语内容",
    "accepting表示政策行为，foreign investment为接受对象，不等于让企业不受监管。"
  ],
  [
    "a country’s economy",
    "a country’s economy",
    "一国的经济",
    "所有格名词短语",
    "country’s说明经济所属国家，题干讨论其发展依赖何种条件。"
  ],
  [
    "depends much on",
    "depend on something",
    "很大程度上取决于",
    "动词与介词补足",
    "much修饰depends程度，on后接选项的名词性从句，不是时间介词。"
  ],
  [
    "how well-developed it is electronically",
    "how + adjective + subject + be",
    "该国在电子信息方面发达到什么程度",
    "程度内容从句",
    "how修饰well-developed程度，it回指country，electronically限定发展领域；整句作on宾语。"
  ],
  [
    "prejudiced against immigrants",
    "be prejudiced against somebody",
    "对移民有偏见的",
    "形容词与对象补足",
    "against引出偏见对象immigrants，不能把移民与正文foreign investment互换。"
  ],
  [
    "adopts America’s industrial pattern",
    "adopt a pattern",
    "采用美国的工业模式",
    "动宾结构",
    "adopts意为采用，选项把例证扩展成全面采用工业模式，非原文电子基础设施这一条件。"
  ],
  [
    "control over foreign corporations",
    "control over somebody/something",
    "对外国公司的控制或监管",
    "名词与对象介词",
    "over引出被控制对象外国公司，施事是拥有这种控制权的country。"
  ]
];
export const passage2001P2QuestionPhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(entries.map(([source, canonical, meaning, role, rule], i) => {
  const key = `2001p2-question-expression-${i + 1}`;
  return [key, { key, sourceExpression: source, canonical, type: role, meaning, summary: `${meaning}。${rule}`, grammarRole: role, structures: [{ pattern: canonical, meaning, rule }], pitfalls: [rule] }];
}));
export const passage2001P2QuestionPhraseAliases: Record<string, string> = {
  ...Object.fromEntries(entries.map(([source], i) => [source.toLowerCase(), `2001p2-question-expression-${i + 1}`])),
};
export const passage2001P2QuestionCollocationGlosses = Object.fromEntries(entries.map(([source, , meaning, , rule]) => [source.toLowerCase(), { meaning, note: rule }]));
