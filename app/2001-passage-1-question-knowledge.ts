import type { PhraseKnowledge } from "./knowledge-base";
// 每项均有当前题目连续原文；原型用于稳定归并，释义不靠答案字母生成。
const entries: Array<[string, string, string, string, string]> = [
  ["between specialisation and professionalisation", "between A and B", "在专业化与职业化之间", "两个对象的平行比较", "between用and连接两种发展概念，不能混为专业与业余两类研究者。"],
  ["the development of geology", "the development of + discipline", "地质学的发展", "名词与发展对象补足", "of说明发展的是地质学，整个名词组作writes of的论述对象。"],
  ["more clearly seen", "be more clearly seen", "更清楚地被看出", "比较级副词修饰被动谓语", "more修饰clearly，整组修饰seen；比较观察的显著程度，不是增加被看的东西数量。"],
  ["infer from the passage", "infer from + evidence", "根据文章推断", "动词与依据介词", "infer的内容在后面that从句中，from引出依据；推断必须受原文限制。"],
  ["little distinction", "little + abstract noun", "几乎没有差别", "否定倾向的数量限定", "little没有a，强调差别少；本题比较两个发展概念，不能换成两类研究者。"],
  ["compete with professionals", "compete with somebody", "与专业人士竞争", "动词加对象介词", "compete不直接接对手宾语，以with引出；竞争不等于必定获胜。"],
  ["in some areas of science", "in some areas of + field", "在某些科学领域", "领域范围状语", "some只说部分范围；of science补足areas，不能抹去some改成全体。"],
  ["tend to welcome", "tend to do", "往往欢迎", "动词不定式补足", "tend带to welcome补足一般倾向；to do不是为了某事的目的状语。"],
  ["welcome amateurs into the scientific community", "welcome somebody into a group", "欢迎业余者进入科学共同体", "动宾与目标介词结构", "amateurs是受欢迎对象，into引出进入哪个群体；不把welcome当形容词。"],
  ["national academic societies", "national academic societies", "全国性学术团体", "名词及范围性质修饰", "national和academic共同修饰societies；national给出全国层面，区别local。"],
  ["no local ones", "no + adjective + ones", "没有地方的同类组织", "否定限定与名词替代", "ones替代前面societies，no否定地方学会的存在；不是指一人。"],
  ["writes of", "write of something", "写到；论述某事", "动词加主题介词", "of引出写作主题；区别write to somebody写信给某人。"],
  ["to demonstrate", "to demonstrate + object", "为了说明", "目的不定式", "在writes后说明论述地质学的目的；对象由选项补充。"],
  ["the process of specialisation and professionalisation", "the process of A and B", "专业化与职业化的过程", "抽象名词与内容补足", "of后and连接两个相关发展，共同限定process；不表示它们完全同义。"],
  ["the hardship of amateurs", "the hardship of + experiencer", "业余者的困难", "名词与经历者补足", "of amateurs说明谁遭遇困难，不说明谁造成困难。"],
  ["in scientific study", "in scientific study", "在科学研究中", "活动范围介词短语", "study是名词，scientific修饰研究性质，整个in组限定困难所在活动。"],
  ["the change of policies", "the change of policies", "政策或规则的变化", "名词与变化内容补足", "of引出发生变化的policies；change作名词，不能读作命令动词。"],
  ["in scientific publications", "in scientific publications", "在科学出版领域", "领域介词短语", "此题限定policies所属领域，不能扩大到所有科学结构变化。"],
  ["discrimination of professionals against amateurs", "discrimination by A against B", "专业者对业余者的歧视", "抽象名词的施事与对象", "原文of professionals为施事，against amateurs为对象；用by A展示原型角色，但不把by补写回原选项。"],
  ["direct reason for specialisation", "a direct reason for + event", "专业化的直接原因", "原因名词与事件补足", "for说明被解释的事件；direct要求直接起因，不能用并列发展或后果替代。"],
  ["the development in communication", "development in + field", "交流方面的发展", "名词与领域限定", "in引出发展变化所在领域，词组本身不表达谁导致谁。"],
  ["the growth of professionalisation", "the growth of + process", "职业化的发展", "名词化过程", "growth是中心，of说明职业化发展；professionalisation不能换成specialisation。"],
  ["the expansion of scientific knowledge", "the expansion of + knowledge", "科学知识的增长", "名词与扩展对象", "expansion强调总量或范围扩大，可对应原文increasing accumulation，保留知识这一对象。"],
  ["the splitting up of academic societies", "the splitting up of + object", "学术团体的分裂", "名词化动词短语", "the与of使splitting up整体名词化；societies是拆分对象，区别正文subject matter。"],
  ["one man", "one + singular noun", "一个人；单个研究者", "数量限定名词短语", "one在man前作数量限定，不是代替前述同类名词的one。"],
  ["acceptable to professionals", "acceptable to somebody", "能为专业人士接受的", "形容词与接受者补足", "to是介词，后接接受或认可这一事物的人；整组在become后作表语。"],
  ["local geological studies", "local geological studies", "地方地质研究", "名词与学科地域修饰", "studies是复数名词，local限定地区，geological限定学科；不是第三人称单数谓语。"],
];
export const passage2001P1QuestionPhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(entries.map(([source, canonical, meaning, role, rule], i) => {
  const key = `2001p1-question-expression-${i + 1}`;
  return [key, { key, sourceExpression: source, canonical, type: role, meaning, summary: `${meaning}。${rule}`, grammarRole: role, structures: [{ pattern: canonical, meaning, rule }], pitfalls: [rule] }];
}));
export const passage2001P1QuestionPhraseAliases: Record<string, string> = {
  ...Object.fromEntries(entries.map(([source], i) => [source.toLowerCase(), `2001p1-question-expression-${i + 1}`])),
};
export const passage2001P1QuestionCollocationGlosses = Object.fromEntries(entries.map(([source, , meaning, , rule]) => [source.toLowerCase(), { meaning, note: rule }]));
