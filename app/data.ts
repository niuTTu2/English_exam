import { passage1Questions, passage1Sentences } from "./passage-1-data";
import { passage2Questions, passage2Sentences } from "./passage-2-data";
import { passage3Questions, passage3Sentences } from "./passage-3-data";
import { passage4Questions, passage4Sentences } from "./passage-4-data";
import { passage5Questions, passage5Sentences } from "./passage-5-data";
import { translationSentences, translationTasks } from "./translation-data";
import type { ContextualSubstitution } from "./contextual-vocabulary";

export type SyntaxRole =
  | "condition"
  | "subject"
  | "predicate"
  | "object"
  | "modifier"
  | "connector";

export type SentenceChunk = {
  text: string;
  role: SyntaxRole;
};

export type BeginnerSyntaxComponent = {
  text: string;
  form: string;
  function: string;
  modifies: string;
  explanation: string;
};

export type BeginnerClauseDetail = {
  text: string;
  type: string;
  marker: string;
  role: string;
  subject: string;
  predicate: string;
  objectOrComplement?: string;
  translationOrder: string;
};

export type BeginnerSyntax = {
  components: BeginnerSyntaxComponent[];
  clauses: BeginnerClauseDetail[];
};

export type SentenceAnalysis = {
  id: string;
  number: number;
  text: string;
  testText?: string;
  chunks: SentenceChunk[];
  trunk: string;
  layers: Array<{ label: string; text: string }>;
  grammar: string[];
  beginnerSyntax?: BeginnerSyntax;
  literal: string;
  natural: string;
  logic: string;
  phrases: string[];
  answerWords?: string[];
};

export type VocabEntry = {
  key: string;
  headword: string;
  display: string;
  kind: "word" | "phrase";
  partOfSpeech: string;
  contextualMeaning: string;
  use: string;
  sourceExpression?: string;
  canonicalForm?: string;
  grammarRole?: string;
  grammarSummary?: string;
  structures?: Array<{
    pattern: string;
    meaning: string;
    rule: string;
    examples?: Array<{ english: string; chinese: string }>;
  }>;
  pitfalls?: string[];
  relation?: { kind: string; source: string; note: string };
  contextualSubstitutions?: ContextualSubstitution[];
  collocationDetails?: Array<{ label: string; meaning: string; note?: string; target?: string }>;
  synonymDetails?: Array<{ label: string; meaning: string; note?: string; target?: string }>;
  familyDetails?: Array<{ label: string; meaning: string; note?: string; target?: string }>;
  knowledgeLevel?: "curated" | "related";
  specialForms?: string[];
  examSynonyms?: string[];
  collocations: string[];
  otherMeanings: string[];
  wordFamily: string[];
  confusions: string[];
  counts: { form: number; lemma: number; family: number };
  occurrences: Array<{ year: number; section: string; excerpt: string }>;
};

export type Question = {
  id: number;
  sentenceId: string;
  prompt: string;
  options: Array<{ key: "A" | "B" | "C" | "D"; text: string }>;
  answer: "A" | "B" | "C" | "D";
  locating: string;
  explanations: Record<"A" | "B" | "C" | "D", string>;
  analysis?: QuestionAnalysis;
};

export type QuestionAnalysis = {
  prompt?: SentenceAnalysis;
  options?: Partial<Record<"A" | "B" | "C" | "D", SentenceAnalysis>>;
  answer?: SentenceAnalysis;
};

export type TranslationTask = {
  id: number;
  sentenceId: string;
  prompt: string;
  source: string;
  answer: string;
  locating: string;
  analysis: SentenceAnalysis;
};

export type ArticleContent = {
  id: "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation";
  label: string;
  badge: string;
  title: string;
  description: string;
  kind: "cloze" | "reading" | "translation";
  sentences: SentenceAnalysis[];
  questions: Question[];
  translationTasks?: TranslationTask[];
};

export const sections = [
  { id: "cloze", label: "完形填空", meta: "8句 · 10题", status: "ready" },
  { id: "p1", label: "阅读 Passage 1", meta: "25句 · 4题", status: "ready" },
  { id: "p2", label: "阅读 Passage 2", meta: "27句 · 4题", status: "ready" },
  { id: "p3", label: "阅读 Passage 3", meta: "13句 · 4题", status: "ready" },
  { id: "p4", label: "阅读 Passage 4", meta: "17句 · 4题", status: "ready" },
  { id: "p5", label: "阅读 Passage 5", meta: "15句 · 4题", status: "ready" },
  { id: "translation", label: "英译汉", meta: "5句", status: "ready" },
] as const;

export const sentences: SentenceAnalysis[] = [
  {
    id: "cloze-s1",
    number: 1,
    text: "If a farmer wishes to succeed, he must try to keep a wide gap between his consumption and his production.",
    chunks: [
      { text: "If a farmer wishes to succeed, ", role: "condition" },
      { text: "he", role: "subject" },
      { text: " must try to keep", role: "predicate" },
      { text: " a wide gap", role: "object" },
      { text: " between his consumption and his production.", role: "modifier" },
    ],
    trunk: "he must try to keep a wide gap",
    layers: [
      { label: "条件状语从句", text: "If a farmer wishes to succeed：如果一个农民想获得成功" },
      { label: "主句", text: "he must try to keep a wide gap：他必须设法保持较大的差额" },
      { label: "后置修饰", text: "between A and B 修饰 gap，说明差额存在于消费和生产之间" },
    ],
    grammar: [
      "if 引导真实条件句，主句使用 must 表示必要性。",
      "wish to do 是较正式的“希望做某事”。",
      "keep + 宾语表示“维持某种状态”，不是“保管”。",
      "consumption 与 production 是动词名词化，阅读中常形成抽象概念对比。",
    ],
    beginnerSyntax: {
      components: [
        {
          text: "If a farmer wishes to succeed",
          form: "If 引导的完整从句",
          function: "条件状语从句",
          modifies: "整体修饰主句 he must try to keep...，说明在什么条件下必须这样做",
          explanation: "这一整组词先看成“如果农民想成功”，不能把 If、farmer、wishes 分开逐词翻译。",
        },
        {
          text: "he",
          form: "人称代词",
          function: "主句主语",
          modifies: "与 must try 构成主句主干",
          explanation: "回答“谁必须设法这样做”：he 回指前面的 a farmer。",
        },
        {
          text: "must try to keep",
          form: "情态动词 + 动词原形 + to do 不定式",
          function: "主句谓语",
          modifies: "说明主语 he 必须做什么",
          explanation: "must 后用 try 原形；try 后接 to keep，合起来是“必须设法维持”。",
        },
        {
          text: "a wide gap",
          form: "冠词 + 形容词 + 名词",
          function: "宾语",
          modifies: "承接 keep，说明要维持什么",
          explanation: "中心词是 gap；a 和 wide 一起限定 gap，不能只把 wide 当成孤立的“宽”。",
        },
        {
          text: "between his consumption and his production",
          form: "between A and B 介词短语",
          function: "后置定语 / 范围说明",
          modifies: "修饰 gap，说明这个差额存在于哪两项之间",
          explanation: "his consumption 与 his production 是平行的两个名词短语，共同组成 between A and B。",
        },
      ],
      clauses: [
        {
          text: "If a farmer wishes to succeed",
          type: "条件状语从句",
          marker: "If",
          role: "给主句 he must try to keep... 设置条件",
          subject: "a farmer",
          predicate: "wishes",
          objectOrComplement: "to succeed（不定式作 wishes 的补足内容）",
          translationOrder: "先译条件“如果一个农民想成功”，再译主句“他必须……”。",
        },
      ],
    },
    literal: "如果一个农民希望成功，他必须努力在他的消费与生产之间保持一个很大的差额。",
    natural: "农民要想成功，就必须尽量让产出远高于消耗。",
    logic: "全文总论点：农业经营要先形成剩余，后文依次解释剩余的用途和没有剩余的后果。",
    phrases: ["wishes to succeed", "keep a wide gap", "between his consumption and his production"],
  },
  {
    id: "cloze-s2",
    number: 2,
    text: "He must store a large quantity of grain instead of consuming all his grain immediately.",
    testText: "He must store a large quantity of grain ___(1) consuming all his grain immediately.",
    chunks: [
      { text: "He", role: "subject" },
      { text: " must store", role: "predicate" },
      { text: " a large quantity of grain", role: "object" },
      { text: " instead of consuming all his grain immediately.", role: "modifier" },
    ],
    trunk: "He must store grain",
    layers: [
      { label: "主干", text: "He must store grain：他必须储存粮食" },
      { label: "数量修饰", text: "a large quantity of 修饰 grain，表示“大量”" },
      { label: "取舍关系", text: "instead of doing 表示“而不是做……”，与前面的 store 构成选择" },
    ],
    grammar: [
      "instead of 中的 of 是介词，所以后接 consuming，而不是 consume。",
      "grain 在此泛指粮食，是不可数用法；重复出现是为了保持指代清楚。",
      "immediately 修饰 consuming，表示“立即全部消耗”。",
    ],
    literal: "他必须储存大量粮食，而不是立即消耗掉他的全部粮食。",
    natural: "他必须把大量粮食储存起来，不能一收获就全部吃掉。",
    logic: "具体说明如何形成第一句所说的“生产与消费之间的差额”。",
    phrases: ["a large quantity of", "instead of"],
    answerWords: ["instead of"],
  },
  {
    id: "cloze-s3",
    number: 3,
    text: "He can continue to support himself and his family only if he produces a surplus.",
    testText: "He can continue to support himself and his family ___(2) he produces a surplus.",
    chunks: [
      { text: "He", role: "subject" },
      { text: " can continue to support", role: "predicate" },
      { text: " himself and his family", role: "object" },
      { text: " only if he produces a surplus.", role: "condition" },
    ],
    trunk: "He can continue to support himself and his family",
    layers: [
      { label: "主句", text: "He can continue to support himself and his family" },
      { label: "必要条件", text: "only if he produces a surplus：只有他产生剩余时才可以" },
    ],
    grammar: [
      "only if 引导必要条件：没有这个条件，主句结果就不能成立。",
      "support oneself/a family 在这里是“养活自己/家人”，不是“支持观点”。",
      "produce 在农业语境中可表示“生产并形成”。",
    ],
    literal: "只有在他生产出剩余的情况下，他才能继续供养自己和家人。",
    natural: "只有有了余粮，他才能持续养活自己和家人。",
    logic: "解释 surplus 是农民持续生存的必要条件。",
    phrases: ["support himself and his family", "only if"],
    answerWords: ["only if"],
  },
  {
    id: "cloze-s4",
    number: 4,
    text: "He must use this surplus in three ways: as seed for sowing, as an insurance against the unpredictable effects of bad weather and as a commodity which he must sell in order to replace old agricultural implements and obtain chemical fertilizers to feed the soil.",
    testText: "He must use this surplus in three ways: as seed for sowing, as an insurance ___(3) the unpredictable effects of bad weather and as a commodity which he must sell in order to ___(4) old agricultural implements and obtain chemical fertilizers to ___(5) the soil.",
    chunks: [
      { text: "He", role: "subject" },
      { text: " must use", role: "predicate" },
      { text: " this surplus", role: "object" },
      { text: " in three ways: ", role: "modifier" },
      { text: "as seed for sowing, as an insurance against the unpredictable effects of bad weather and as a commodity", role: "object" },
      { text: " which he must sell", role: "modifier" },
      { text: " in order to replace old agricultural implements and obtain chemical fertilizers", role: "condition" },
      { text: " to feed the soil.", role: "modifier" },
    ],
    trunk: "He must use this surplus in three ways",
    layers: [
      { label: "三项并列", text: "as seed... / as an insurance... / as a commodity... 三个 as 短语说明三种用途" },
      { label: "定语从句", text: "which he must sell 修饰 commodity；which 在从句中作 sell 的宾语" },
      { label: "目的①", text: "in order to replace... and obtain...：出售商品是为了更换农具并获得化肥" },
      { label: "目的②", text: "to feed the soil 修饰 obtain chemical fertilizers，说明获得化肥的目的" },
    ],
    grammar: [
      "冒号后的三个 as 结构严格并列，是拆长句的第一抓手。",
      "insurance against sth 是固定搭配，表示“防范某种风险的保障”。",
      "which 引导限制性定语从句，先行词是 commodity。",
      "in order to 与句末 to feed 都是不定式目的状语，但修饰层级不同。",
    ],
    literal: "他必须以三种方式使用这些剩余：作为播种的种子，作为抵御恶劣天气不可预测影响的一种保障，以及作为一种商品；他必须出售这种商品，以便更换旧农具并获得给土壤施肥的化肥。",
    natural: "这些余粮有三种用途：留作种子、防备坏天气造成的损失，以及拿去出售，用所得更换旧农具、购买化肥培肥土壤。",
    logic: "本段的信息中心。通过三项并列回答“剩余有什么用”，第三项内部又包含定语从句和两层目的。",
    phrases: [
      "in three ways",
      "as seed for sowing",
      "an insurance against",
      "the unpredictable effects of bad weather",
      "in order to",
      "agricultural implements",
      "chemical fertilizers",
      "feed the soil",
    ],
    answerWords: ["against", "replace", "feed"],
  },
  {
    id: "cloze-s5",
    number: 5,
    text: "He may also need money to construct irrigation channels and improve his farm in other ways.",
    testText: "He may also need money to construct irrigation ___(6) and improve his farm in other ways.",
    chunks: [
      { text: "He", role: "subject" },
      { text: " may also need", role: "predicate" },
      { text: " money", role: "object" },
      { text: " to construct irrigation channels and improve his farm", role: "condition" },
      { text: " in other ways.", role: "modifier" },
    ],
    trunk: "He may also need money",
    layers: [
      { label: "目的状语", text: "to construct... and improve... 说明需要钱的目的" },
      { label: "动词并列", text: "construct 与 improve 共用不定式符号 to" },
    ],
    grammar: [
      "may 在这里表示现实可能性，而不是请求许可。",
      "第二个并列动词 improve 前省略了 to，这是英语中的共用结构。",
    ],
    literal: "他也可能需要钱来修建灌溉渠道，并以其他方式改善他的农场。",
    natural: "他还可能需要资金修建灌溉渠，或用于农场的其他改良。",
    logic: "在前三种基本用途之外，补充农业再投资的需要。",
    phrases: ["construct irrigation channels", "in other ways"],
    answerWords: ["channels"],
  },
  {
    id: "cloze-s6",
    number: 6,
    text: "If no surplus is available, a farmer cannot be self-sufficient.",
    testText: "If no surplus is available, a farmer cannot be ___(7).",
    chunks: [
      { text: "If no surplus is available, ", role: "condition" },
      { text: "a farmer", role: "subject" },
      { text: " cannot be", role: "predicate" },
      { text: " self-sufficient.", role: "object" },
    ],
    trunk: "a farmer cannot be self-sufficient",
    layers: [
      { label: "条件", text: "If no surplus is available：如果没有可用的剩余" },
      { label: "结论", text: "a farmer cannot be self-sufficient：农民就无法自给自足" },
    ],
    grammar: [
      "available 是表语形容词，描述 surplus 处于“可供使用”的状态。",
      "self-sufficient 是复合形容词，self- 表“自身”，sufficient 表“足够”。",
    ],
    literal: "如果没有可用的剩余，一个农民就不能自给自足。",
    natural: "没有剩余，农民便无法自给自足。",
    logic: "从正面用途转到反面后果，开启末段的借贷逻辑。",
    phrases: ["be self-sufficient"],
    answerWords: ["self-sufficient"],
  },
  {
    id: "cloze-s7",
    number: 7,
    text: "He must either sell some of his property or seek extra funds in the form of loans.",
    testText: "He must either sell some of his property or ___(8) extra funds in the form of loans.",
    chunks: [
      { text: "He", role: "subject" },
      { text: " must either sell", role: "predicate" },
      { text: " some of his property", role: "object" },
      { text: " or seek", role: "connector" },
      { text: " extra funds", role: "object" },
      { text: " in the form of loans.", role: "modifier" },
    ],
    trunk: "He must either sell property or seek funds",
    layers: [
      { label: "选择并列", text: "either sell... or seek...：要么卖财产，要么寻求资金" },
      { label: "形式说明", text: "in the form of loans 修饰 funds，说明资金以贷款形式取得" },
    ],
    grammar: [
      "either...or... 连接两个同级谓语 sell 与 seek，结构必须平行。",
      "property 在此是“财产”，不是“性质”。",
      "seek 直接接宾语，不用 seek for extra funds。",
    ],
    literal: "他必须要么出售自己的一部分财产，要么以贷款的形式寻求额外资金。",
    natural: "他只能卖掉一部分财产，或者通过贷款筹集额外资金。",
    logic: "列出没有剩余时仅存的两种融资选择。",
    phrases: ["either sell", "or seek", "extra funds", "in the form of loans"],
    answerWords: ["seek"],
  },
  {
    id: "cloze-s8",
    number: 8,
    text: "Naturally he will try to borrow money at a low rate of interest, but loans of this kind are not frequently obtainable.",
    testText: "Naturally he will try to borrow money at a low ___(9) of interest, but loans of this kind are not ___(10) obtainable.",
    chunks: [
      { text: "Naturally ", role: "connector" },
      { text: "he", role: "subject" },
      { text: " will try to borrow", role: "predicate" },
      { text: " money", role: "object" },
      { text: " at a low rate of interest, ", role: "modifier" },
      { text: "but", role: "connector" },
      { text: " loans of this kind", role: "subject" },
      { text: " are not frequently obtainable.", role: "predicate" },
    ],
    trunk: "he will try to borrow money, but loans are not obtainable",
    layers: [
      { label: "前一分句", text: "he will try to borrow money at a low rate of interest" },
      { label: "转折连接", text: "but 把“想低息借款”转向“这种贷款并不常能获得”" },
      { label: "后置修饰", text: "of this kind 修饰 loans，指代前面所说的低息贷款" },
    ],
    grammar: [
      "at a ... rate of interest 是利率搭配，rate 不能替换为 ratio。",
      "obtainable 是 obtain + -able，表示“能够被获得的”。",
      "frequently 修饰 obtainable，not frequently 意为“并不常常”，不是“绝不”。",
    ],
    literal: "自然，他会努力以较低的利率借钱，但是这种贷款并不是经常可以获得的。",
    natural: "他当然会设法申请低息贷款，可这种贷款往往并不好借。",
    logic: "用 but 给出最终限制：最理想的借贷方案现实中并不容易得到。",
    phrases: ["borrow money", "at a low rate of interest", "of this kind", "not frequently obtainable"],
    answerWords: ["rate", "frequently"],
  },
];

const coreVocab: VocabEntry[] = [
  {
    key: "succeed",
    headword: "succeed",
    display: "succeed",
    kind: "word",
    partOfSpeech: "v.",
    contextualMeaning: "成功；达到经营目标",
    use: "succeed in doing sth；succeed to sth 表示继承职位或权利。原句为 wish to succeed。",
    collocations: ["succeed in business", "succeed in doing", "succeed to the throne"],
    otherMeanings: ["接替；继承", "随后发生（正式）"],
    wordFamily: ["success n.", "successful adj.", "successfully adv."],
    confusions: ["success 是名词；successful 是形容词，不能直接作谓语"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "If a farmer wishes to succeed..." }],
  },
  {
    key: "gap",
    headword: "gap",
    display: "gap",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "差额；差距",
    use: "a gap between A and B；narrow/bridge/close the gap。",
    collocations: ["a wide gap", "the gap between A and B", "bridge the gap"],
    otherMeanings: ["缺口", "空白", "间隔"],
    wordFamily: [],
    confusions: ["interval 更强调时间或空间间隔；gap 常强调差异或缺口"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "keep a wide gap between..." }],
  },
  {
    key: "consumption",
    headword: "consumption",
    display: "consumption",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "消费；消耗量",
    use: "多作不可数名词；原文与 production 对举，指农民消耗掉的产出。",
    collocations: ["energy consumption", "household consumption", "consumption and production"],
    otherMeanings: ["食用", "肺痨（旧义）"],
    wordFamily: ["consume v.", "consumer n.", "consumerism n."],
    confusions: ["consume 是动词；consumer 是消费者"],
    counts: { form: 1, lemma: 1, family: 2 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "between his consumption and his production" }],
  },
  {
    key: "production",
    headword: "production",
    display: "production",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "生产；产出",
    use: "不可数表示生产活动；可数时也可指影视或舞台作品。",
    collocations: ["agricultural production", "mass production", "production costs"],
    otherMeanings: ["产量", "制作", "演出作品"],
    wordFamily: ["produce v./n.", "product n.", "productive adj.", "productivity n."],
    confusions: ["product 是产品；produce 作名词时常指农产品；production 是生产过程或产量"],
    counts: { form: 1, lemma: 1, family: 2 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "his consumption and his production" }],
  },
  {
    key: "store",
    headword: "store",
    display: "store",
    kind: "word",
    partOfSpeech: "v.",
    contextualMeaning: "储存；储备",
    use: "store sth for later；store up food/energy。原句是储存粮食。",
    collocations: ["store grain", "store energy", "store up supplies"],
    otherMeanings: ["商店 n.", "大量；储备 n.", "存储数据 v."],
    wordFamily: ["storage n."],
    confusions: ["restore 是“恢复”，不是“重新储存”"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "He must store a large quantity of grain" }],
  },
  {
    key: "quantity",
    headword: "quantity",
    display: "quantity",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "数量",
    use: "a large quantity of 可接可数或不可数名词；quantities of 表大量。",
    collocations: ["a large quantity of", "in large quantities", "quantity and quality"],
    otherMeanings: ["量；定量"],
    wordFamily: ["quantitative adj.", "quantify v."],
    confusions: ["quantity 数量；quality 质量"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "a large quantity of grain" }],
  },
  {
    key: "grain",
    headword: "grain",
    display: "grain",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "谷物；粮食",
    use: "不可数时泛指粮食；a grain of rice 表一粒米。",
    collocations: ["store grain", "grain production", "a grain of truth"],
    otherMeanings: ["颗粒", "纹理", "少量"],
    wordFamily: [],
    confusions: ["corn 在美式英语常指玉米，grain 是谷物总称"],
    counts: { form: 2, lemma: 2, family: 2 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "a large quantity of grain" }],
  },
  {
    key: "surplus",
    headword: "surplus",
    display: "surplus",
    kind: "word",
    partOfSpeech: "n./adj.",
    contextualMeaning: "剩余；余粮",
    use: "produce a surplus；a surplus of sth；trade/budget surplus。",
    collocations: ["produce a surplus", "surplus grain", "trade surplus"],
    otherMeanings: ["盈余", "过剩的"],
    wordFamily: [],
    confusions: ["deficit 表赤字或不足，与 surplus 相反"],
    counts: { form: 3, lemma: 3, family: 3 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "only if he produces a surplus" }],
  },
  {
    key: "insurance",
    headword: "insurance",
    display: "insurance",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "保障；防范风险的储备",
    use: "insurance against sth；insurance for people/property。原文是比喻用法。",
    collocations: ["insurance against loss", "health insurance", "insurance policy"],
    otherMeanings: ["保险", "保险费", "保险业"],
    wordFamily: ["insure v.", "insured adj./n.", "insurer n."],
    confusions: ["assurance 可表示保证；insurance 更强调风险保障"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "an insurance against... bad weather" }],
  },
  {
    key: "commodity",
    headword: "commodity",
    display: "commodity",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "商品；可出售的农产品",
    use: "可数名词；经济文章中常指可交易的原材料或农产品。",
    collocations: ["basic commodities", "commodity prices", "commodity market"],
    otherMeanings: ["有价值或有用之物"],
    wordFamily: [],
    confusions: ["commodity 商品；community 社区，拼写相近"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "as a commodity which he must sell" }],
  },
  {
    key: "implement",
    headword: "implement",
    display: "implements",
    kind: "word",
    partOfSpeech: "n./v.",
    contextualMeaning: "工具；农具",
    use: "原文为可数名词 agricultural implements；作动词时表示实施政策或计划。",
    collocations: ["agricultural implements", "implement a policy", "implement reforms"],
    otherMeanings: ["实施；执行 v."],
    wordFamily: ["implementation n."],
    confusions: ["equipment 通常不可数；implement 作“工具”时可数"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "replace old agricultural implements" }],
  },
  {
    key: "fertilizer",
    headword: "fertilizer",
    display: "fertilizers",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "肥料；化肥",
    use: "chemical fertilizer；apply fertilizer to soil。",
    collocations: ["chemical fertilizers", "organic fertilizer", "apply fertilizer"],
    otherMeanings: [],
    wordFamily: ["fertile adj.", "fertility n.", "fertilize v."],
    confusions: ["fertile 可表示土壤肥沃，也可表示有生育能力"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "obtain chemical fertilizers" }],
  },
  {
    key: "self-sufficient",
    headword: "self-sufficient",
    display: "self-sufficient",
    kind: "word",
    partOfSpeech: "adj.",
    contextualMeaning: "自给自足的",
    use: "be self-sufficient in food/energy；self-sufficiency 是名词。",
    collocations: ["be self-sufficient", "self-sufficient in food", "economic self-sufficiency"],
    otherMeanings: ["能够独立生活的"],
    wordFamily: ["self-sufficiency n.", "sufficient adj.", "sufficiency n."],
    confusions: ["self-confident 自信的；self-satisfied 自满的；self-restrained 克制的"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "a farmer cannot be self-sufficient" }],
  },
  {
    key: "property",
    headword: "property",
    display: "property",
    kind: "word",
    partOfSpeech: "n.",
    contextualMeaning: "财产",
    use: "不可数泛指财产；可数时可指一处房产或一种性质。",
    collocations: ["private property", "sell property", "intellectual property"],
    otherMeanings: ["房地产", "性质；特性"],
    wordFamily: [],
    confusions: ["proper 是“合适的”；property 是“财产/性质”"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "sell some of his property" }],
  },
  {
    key: "seek",
    headword: "seek",
    display: "seek",
    kind: "word",
    partOfSpeech: "v.",
    contextualMeaning: "寻求；设法获得",
    use: "seek-sought-sought；seek sth / seek to do，通常不说 seek for。",
    collocations: ["seek funds", "seek help", "seek to improve"],
    otherMeanings: ["寻找", "试图"],
    wordFamily: ["seeker n."],
    confusions: ["search for 强调搜寻过程；seek 更正式，直接接目标"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "seek extra funds" }],
  },
  {
    key: "fund",
    headword: "fund",
    display: "funds",
    kind: "word",
    partOfSpeech: "n./v.",
    contextualMeaning: "资金",
    use: "funds 复数常指可用资金；作动词表示为项目提供资金。",
    collocations: ["extra funds", "public funds", "fund a project"],
    otherMeanings: ["基金", "储备", "资助 v."],
    wordFamily: ["funding n.", "funded adj."],
    confusions: ["foundation 是基金会或基础，不等于 funds"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "seek extra funds" }],
  },
  {
    key: "loan",
    headword: "loan",
    display: "loans",
    kind: "word",
    partOfSpeech: "n./v.",
    contextualMeaning: "贷款",
    use: "take out a loan；a loan from a bank；loan sth to sb。",
    collocations: ["bank loan", "low-interest loan", "take out a loan"],
    otherMeanings: ["借出的物品", "借出 v."],
    wordFamily: [],
    confusions: ["borrow 是借入的动作；lend/loan 是借出"],
    counts: { form: 2, lemma: 2, family: 2 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "funds in the form of loans" }],
  },
  {
    key: "rate",
    headword: "rate",
    display: "rate",
    kind: "word",
    partOfSpeech: "n./v.",
    contextualMeaning: "利率；比率",
    use: "at a rate of；interest/birth/growth rate；作动词表示评价或收费。",
    collocations: ["rate of interest", "birth rate", "at a rate of"],
    otherMeanings: ["速度", "价格；费用", "评价 v."],
    wordFamily: ["rating n."],
    confusions: ["ratio 强调两个量之比；proportion 强调整体中的份额；percentage 是百分数"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "at a low rate of interest" }],
  },
  {
    key: "obtainable",
    headword: "obtainable",
    display: "obtainable",
    kind: "word",
    partOfSpeech: "adj.",
    contextualMeaning: "可以获得的",
    use: "be obtainable from；readily/easily obtainable。",
    collocations: ["readily obtainable", "obtainable from", "not obtainable"],
    otherMeanings: ["可达到的"],
    wordFamily: ["obtain v.", "obtained adj.", "obtainability n."],
    confusions: ["available 更常用且还能表示“有空的”；obtainable 强调能否取得"],
    counts: { form: 1, lemma: 1, family: 2 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "not frequently obtainable" }],
  },
  {
    key: "instead of",
    headword: "instead of",
    display: "instead of",
    kind: "phrase",
    partOfSpeech: "prep. phrase",
    contextualMeaning: "而不是；代替",
    use: "of 是介词，后接名词、代词或 doing。",
    collocations: ["instead of doing", "use A instead of B"],
    otherMeanings: [],
    wordFamily: ["instead adv."],
    confusions: ["instead 可单独作副词；instead of 后面必须有宾语"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "instead of consuming all his grain" }],
  },
  {
    key: "only if",
    headword: "only if",
    display: "only if",
    kind: "phrase",
    partOfSpeech: "conj. phrase",
    contextualMeaning: "只有在……条件下",
    use: "引出必要条件；置于句首时主句常部分倒装。",
    collocations: ["only if necessary", "only if you agree"],
    otherMeanings: [],
    wordFamily: [],
    confusions: ["if only 表“要是……就好了”，顺序不同，意思完全不同"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "only if he produces a surplus" }],
  },
  {
    key: "in order to",
    headword: "in order to",
    display: "in order to",
    kind: "phrase",
    partOfSpeech: "purpose phrase",
    contextualMeaning: "为了；以便",
    use: "后接动词原形；否定形式为 in order not to do。",
    collocations: ["in order to improve", "in order not to lose"],
    otherMeanings: [],
    wordFamily: ["order n./v."],
    confusions: ["此处 order 不是“命令/顺序”，整个结构只表达目的"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "in order to replace old agricultural implements" }],
  },
  {
    key: "in the form of",
    headword: "in the form of",
    display: "in the form of",
    kind: "phrase",
    partOfSpeech: "prep. phrase",
    contextualMeaning: "以……的形式",
    use: "the 通常不能省略；后接名词。",
    collocations: ["in the form of loans", "in written form"],
    otherMeanings: [],
    wordFamily: ["form n./v.", "formation n."],
    confusions: ["form 还可表示表格、形态或形成"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "funds in the form of loans" }],
  },
  {
    key: "at a low rate of interest",
    headword: "at a low rate of interest",
    display: "at a low rate of interest",
    kind: "phrase",
    partOfSpeech: "prep. phrase",
    contextualMeaning: "以较低的利率",
    use: "at a rate of + 数值/名词；interest 在这里是利息。",
    collocations: ["at a low interest rate", "rate of interest"],
    otherMeanings: [],
    wordFamily: ["rate n./v.", "interest n./v."],
    confusions: ["interest 在此不是“兴趣”；rate 不是 ratio"],
    counts: { form: 1, lemma: 1, family: 1 },
    occurrences: [{ year: 2000, section: "完形", excerpt: "borrow money at a low rate of interest" }],
  },
];

export const vocab = Object.fromEntries(coreVocab.map((entry) => [entry.key, entry])) as Record<string, VocabEntry>;

export const aliasToVocab: Record<string, string> = {
  wish: "wish",
  wishes: "wish",
  hope: "hope",
  want: "want",
  desire: "desire",
  expect: "expect",
  succeed: "succeed",
  gap: "gap",
  consumption: "consumption",
  production: "production",
  store: "store",
  quantity: "quantity",
  grain: "grain",
  grains: "grain",
  surplus: "surplus",
  insurance: "insurance",
  commodity: "commodity",
  commodities: "commodity",
  implement: "implement",
  implements: "implement",
  fertilizer: "fertilizer",
  fertilizers: "fertilizer",
  "self-sufficient": "self-sufficient",
  property: "property",
  seek: "seek",
  funds: "fund",
  fund: "fund",
  loan: "loan",
  loans: "loan",
  rate: "rate",
  obtainable: "obtainable",
};

export const basicMeanings: Record<string, string> = {
  a: "一个；泛指某类事物（不定冠词）",
  against: "抵御；防范；反对；紧靠",
  agricultural: "农业的；农用的",
  all: "全部；所有",
  also: "也；此外",
  an: "一个（用于元音音素前）",
  and: "和；并且；连接并列成分",
  are: "是；be 的现在时复数形式",
  as: "作为；像；当……时；因为",
  at: "在；以（某种速度、价格或比率）",
  available: "可获得的；可使用的；有空的",
  bad: "坏的；恶劣的",
  be: "是；处于某种状态",
  before: "在……之前；以前",
  between: "在两者之间",
  borrow: "借入",
  but: "但是；表示转折",
  can: "能够；可以",
  cannot: "不能；can not 的合写形式",
  channels: "渠道；水渠；channel 的复数",
  chemical: "化学的；化学品",
  construct: "建造；构建",
  consuming: "消耗；consume 的 -ing 形式",
  continue: "继续",
  desire: "渴望；愿望",
  dispose: "处理；布置；dispose of 表‘处理掉’",
  effects: "影响；结果；effect 的复数",
  enhance: "提高；增强；增进",
  either: "两者中的任一；either...or... 要么……要么……",
  ever: "曾经；在任何时候；不断地",
  expect: "预料；期待",
  extra: "额外的",
  family: "家庭；家人",
  farm: "农场；经营农场",
  farmer: "农民；农场主",
  feed: "给……提供养分；喂养",
  for: "为了；给；对于；持续（时间）",
  form: "形式；形态；形成",
  frequently: "频繁地；经常",
  genuinely: "真正地；真诚地",
  he: "他",
  himself: "他自己",
  his: "他的",
  hope: "希望某件仍可能实现的事发生",
  if: "如果；引导条件从句",
  immediately: "立即；马上",
  improve: "改善；提高",
  in: "在……中；以……方式",
  instead: "代替；反而；instead of 表‘而不是’",
  interest: "利息；兴趣；利益",
  irrigation: "灌溉",
  is: "是；be 的第三人称单数现在时",
  keep: "保持；保存；继续；遵守",
  kind: "种类；友善的",
  large: "大的；大量的",
  long: "长的；长久地",
  low: "低的；低水平的",
  may: "可能；也许",
  mix: "混合；混合物",
  money: "钱；资金",
  more: "更多；更大程度地",
  much: "许多；非常",
  must: "必须；表示必要性",
  naturally: "自然地；当然",
  need: "需要",
  no: "没有；不允许",
  not: "不；否定副词",
  obtain: "获得；取得",
  of: "……的；表示所属、构成或数量关系",
  old: "旧的；年老的",
  obviously: "显然地；明显地",
  offer: "提供；提出；出价",
  only: "只有；仅仅；唯一的",
  or: "或者；连接选择关系",
  order: "顺序；命令；订购；in order to 表‘为了’",
  other: "其他的；另一个",
  paths: "小路；路径；path 的复数",
  percentage: "百分比；百分率",
  presumably: "据推测；大概",
  proportion: "比例；部分；相称",
  purchase: "购买；购买物",
  produces: "生产；形成；produce 的第三人称单数",
  raise: "提高；筹集；养育；举起",
  ratio: "比率；两个量之间的比",
  replace: "更换；取代",
  routes: "路线；途径；route 的复数",
  save: "节省；保存；挽救",
  search: "搜寻；搜索；搜查",
  seed: "种子",
  sell: "出售",
  "self-confident": "自信的",
  "self-restrained": "自我克制的",
  "self-satisfied": "自满的；沾沾自喜的",
  soil: "土壤",
  some: "一些；一部分",
  since: "自从；因为；从……以后",
  sowing: "播种；sow 的 -ing 形式",
  support: "供养；支持；支撑",
  supplement: "补充；补充物",
  the: "这个/这些；特指已知事物",
  than: "比；用于比较结构",
  this: "这个；指代前文内容",
  three: "三个",
  to: "向；到；不定式标记",
  try: "努力；尝试",
  towards: "朝向；对于；接近",
  unpredictable: "不可预测的",
  use: "使用；用途",
  vessels: "容器；船只；血管；vessel 的复数",
  ways: "方式；方法",
  weather: "天气",
  well: "好地；良好地；健康的",
  which: "哪一个；引导定语从句并指代先行词",
  wide: "宽的；差距大的",
  will: "将；表示预测或意愿",
  want: "想要；需要",
  wish: "希望；愿望；祝愿",
  wishes: "希望；wish 的第三人称单数",
};

export const questions: Question[] = [
  {
    id: 1,
    sentenceId: "cloze-s2",
    prompt: "He must store a large quantity of grain ___ consuming all his grain immediately.",
    options: [
      { key: "A", text: "other than" },
      { key: "B", text: "as well as" },
      { key: "C", text: "instead of" },
      { key: "D", text: "more than" },
    ],
    answer: "C",
    locating: "第2句：store 与 consuming 构成明确的取舍关系——储存，而不是立即全部消耗。",
    explanations: {
      A: "other than 表“除……之外”，不表达两种行为之间的替代。",
      B: "as well as 表“以及”，会变成既储存又全部消耗，逻辑矛盾。",
      C: "instead of doing 表“而不是做……”，语法和语义都成立。",
      D: "more than 表“超过/不仅仅”，不能建立 store 与 consuming 的选择关系。",
    },
  },
  {
    id: 2,
    sentenceId: "cloze-s3",
    prompt: "He can continue to support himself and his family ___ he produces a surplus.",
    options: [
      { key: "A", text: "only if" },
      { key: "B", text: "much as" },
      { key: "C", text: "long before" },
      { key: "D", text: "ever since" },
    ],
    answer: "A",
    locating: "第3句说明 surplus 是持续养活家庭的必要条件。",
    explanations: {
      A: "only if 表“只有……才”，准确表达必要条件。",
      B: "much as 表“尽管”，需要让步逻辑，原文没有。",
      C: "long before 表“早在……之前”，与一般事实不符。",
      D: "ever since 表“自从……以来”，通常配合完成时。",
    },
  },
  {
    id: 3,
    sentenceId: "cloze-s4",
    prompt: "as an insurance ___ the unpredictable effects of bad weather",
    options: [
      { key: "A", text: "for" },
      { key: "B", text: "against" },
      { key: "C", text: "of" },
      { key: "D", text: "towards" },
    ],
    answer: "B",
    locating: "第4句固定搭配 insurance against sth，表示对某种风险的保障。",
    explanations: {
      A: "insurance for 通常接被保险的人或物，不接要防范的风险。",
      B: "insurance against + 风险/损失，是正确固定搭配。",
      C: "insurance of 不能表达“防范影响”。",
      D: "towards 表方向或态度，不符合保险搭配。",
    },
  },
  {
    id: 4,
    sentenceId: "cloze-s4",
    prompt: "sell in order to ___ old agricultural implements",
    options: [
      { key: "A", text: "replace" },
      { key: "B", text: "purchase" },
      { key: "C", text: "supplement" },
      { key: "D", text: "dispose" },
    ],
    answer: "A",
    locating: "old 表明旧农具需要被新农具替换，replace 与语境最吻合。",
    explanations: {
      A: "replace old implements 表“更换旧农具”，搭配自然。",
      B: "purchase old implements 会变成购买旧农具，不合经营逻辑。",
      C: "supplement 表补充，不能直接表达淘汰旧设备。",
      D: "dispose 必须接 of，且只表示处理掉，没有“换新”含义。",
    },
  },
  {
    id: 5,
    sentenceId: "cloze-s4",
    prompt: "obtain chemical fertilizers to ___ the soil",
    options: [
      { key: "A", text: "enhance" },
      { key: "B", text: "mix" },
      { key: "C", text: "feed" },
      { key: "D", text: "raise" },
    ],
    answer: "C",
    locating: "化肥的功能是为土壤补充养分，英语用 feed the soil。",
    explanations: {
      A: "enhance 通常提升质量、价值或能力，不与 soil 形成这里最自然的搭配。",
      B: "mix the soil 只是混合土壤，不能说明使用化肥的目的。",
      C: "feed the soil 表“给土壤补充养分”，语义准确。",
      D: "raise 可提高数值或抚养，不说 raise the soil。",
    },
  },
  {
    id: 6,
    sentenceId: "cloze-s5",
    prompt: "construct irrigation ___",
    options: [
      { key: "A", text: "vessels" },
      { key: "B", text: "routes" },
      { key: "C", text: "paths" },
      { key: "D", text: "channels" },
    ],
    answer: "D",
    locating: "irrigation channels 是“灌溉渠道”的固定农业搭配。",
    explanations: {
      A: "vessels 是船、容器或血管，不是灌溉设施。",
      B: "routes 是规划路线，不强调输水的沟渠。",
      C: "paths 是小路或抽象途径，不能输送灌溉水。",
      D: "channels 可指水渠，irrigation channels 搭配正确。",
    },
  },
  {
    id: 7,
    sentenceId: "cloze-s6",
    prompt: "a farmer cannot be ___",
    options: [
      { key: "A", text: "self-confident" },
      { key: "B", text: "self-sufficient" },
      { key: "C", text: "self-satisfied" },
      { key: "D", text: "self-restrained" },
    ],
    answer: "B",
    locating: "全文讨论农民能否靠自身产出维持生活，因此需要“自给自足”。",
    explanations: {
      A: "self-confident 是自信的，与农业剩余没有直接因果。",
      B: "self-sufficient 是自给自足的，符合全文经济逻辑。",
      C: "self-satisfied 是自满的，带贬义。",
      D: "self-restrained 是克制的，与资金来源无关。",
    },
  },
  {
    id: 8,
    sentenceId: "cloze-s7",
    prompt: "or ___ extra funds in the form of loans",
    options: [
      { key: "A", text: "search" },
      { key: "B", text: "save" },
      { key: "C", text: "offer" },
      { key: "D", text: "seek" },
    ],
    answer: "D",
    locating: "seek funds 是正式固定搭配，表示设法获得资金。",
    explanations: {
      A: "search 通常接地点或用 search for funds，不能直接接 funds 表寻求。",
      B: "save funds 是节省或储蓄资金，不是借款筹资。",
      C: "offer funds 是提供资金，方向与农民需要资金相反。",
      D: "seek funds 表寻求资金，可直接接宾语。",
    },
  },
  {
    id: 9,
    sentenceId: "cloze-s8",
    prompt: "at a low ___ of interest",
    options: [
      { key: "A", text: "proportion" },
      { key: "B", text: "percentage" },
      { key: "C", text: "rate" },
      { key: "D", text: "ratio" },
    ],
    answer: "C",
    locating: "rate of interest / interest rate 是“利率”的固定表达。",
    explanations: {
      A: "proportion 指整体中所占份额，不与 interest 构成利率搭配。",
      B: "percentage 指具体百分比，但不说 percentage of interest 表利率。",
      C: "rate of interest 是固定搭配。",
      D: "ratio 强调两个量之比，如 ratio of men to women。",
    },
  },
  {
    id: 10,
    sentenceId: "cloze-s8",
    prompt: "loans of this kind are not ___ obtainable",
    options: [
      { key: "A", text: "genuinely" },
      { key: "B", text: "obviously" },
      { key: "C", text: "presumably" },
      { key: "D", text: "frequently" },
    ],
    answer: "D",
    locating: "前文说农民自然想借低息贷款，but 后说明这种贷款并不常能得到。",
    explanations: {
      A: "genuinely obtainable 表“真正可获得”，与 but 后的现实频率不匹配。",
      B: "obviously obtainable 表“显然可获得”，反而削弱转折。",
      C: "presumably obtainable 表“推测可获得”，逻辑不如频率限制准确。",
      D: "not frequently obtainable 表“并不经常能够获得”，与现实限制吻合。",
    },
  },
];

export const articleContents: Record<"cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation", ArticleContent> = {
  cloze: {
    id: "cloze",
    label: "完形填空",
    badge: "2000 · 完形填空",
    title: "从“生产剩余”读懂一段经济逻辑",
    description: "先读原句。展开句子看结构，再点带下划线的单词或词组。",
    kind: "cloze",
    sentences,
    questions,
  },
  p1: {
    id: "p1",
    label: "阅读 Passage 1",
    badge: "2000 · 阅读 Passage 1",
    title: "成功、危机与美国工业的重新调整",
    description: "沿着“战后优势—竞争冲击—信心危机—经济复苏”的主线逐句精读。",
    kind: "reading",
    sentences: passage1Sentences,
    questions: passage1Questions,
  },
  p2: {
    id: "p2",
    label: "阅读 Passage 2",
    badge: "2000 · 阅读 Passage 2",
    title: "人类进化为何走向停滞",
    description: "沿着生存率、生育差异和技术替代自然选择的线索，逐句理解人类身体为何几乎没有改变。",
    kind: "reading",
    sentences: passage2Sentences,
    questions: passage2Questions,
  },
  p3: {
    id: "p3",
    label: "阅读 Passage 3",
    badge: "2000 · 阅读 Passage 3",
    title: "未来主义诗歌与新的表达方式",
    description: "沿着未来主义者的理论、形式实验及作者的保留评价，逐句理解这篇评论。",
    kind: "reading",
    sentences: passage3Sentences,
    questions: passage3Questions,
  },
  p4: {
    id: "p4",
    label: "阅读 Passage 4",
    badge: "2000 · 阅读 Passage 4",
    title: "日本社会工作伦理的变化与生活压力",
    description: "沿着工作价值、教育方式和城市生活压力的线索，逐句理解日本社会观念的转变。",
    kind: "reading",
    sentences: passage4Sentences,
    questions: passage4Questions,
  },
  p5: {
    id: "p5",
    label: "阅读 Passage 5",
    badge: "2000 · 阅读 Passage 5",
    title: "抱负被隐藏之后的社会讽刺",
    description: "沿着抱负的回报、受教育者的虚伪和公开表达的收缩，逐句理解作者的批评。",
    kind: "reading",
    sentences: passage5Sentences,
    questions: passage5Questions,
  },
  translation: {
    id: "translation",
    label: "英译汉",
    badge: "2000 · 英译汉",
    title: "现代化进程中的经济与社会压力",
    description: "逐句拆解英译汉长句，先看结构，再提交自己的译文并对照完整分析。",
    kind: "translation",
    sentences: translationSentences,
    questions: [],
    translationTasks,
  },
};

export const allSentences = [...sentences, ...passage1Sentences, ...passage2Sentences, ...passage3Sentences, ...passage4Sentences, ...passage5Sentences, ...translationSentences];
export const allQuestions = [...questions, ...passage1Questions, ...passage2Questions, ...passage3Questions, ...passage4Questions, ...passage5Questions];
