import type { QuestionReasoning } from "./article-teaching";
const s = (n: number) => `p3-s${n}`;
const ids = (...n: number[]) => n.map(s);
const e = (id: string, n: number, quote: string, role: string, strength: "直接证据" | "上下文推断" | "全文概括" = "直接证据") => ({ id, sentenceId: s(n), quote, role, strength });

export const passage3Reasoning: Record<number, QuestionReasoning> = {
  19: {
    questionType: "全文主旨与文章性质", scope: "whole-passage", restatement: "文章主要在做什么、围绕什么对象？", keyInstruction: "mainly要求涵盖介绍、例证和评价，不能只摘某段的关键词。",
    locationPolicy: { revision: 1, paths: [{ id: "four-paragraph-review", label: "四段共同形成评论", groups: [ids(1, 2), ids(3, 5, 8), ids(9, 10), ids(11, 12, 13)], supportingSentenceIds: [], maxSentences: 6 }] },
    evidence: [e("object", 2, "With regard to Futurist poetry", "明确评论对象"), e("theory", 5, "requires a new form of expression", "转述理论"), e("example", 10, "the line consists of the noise of their falling and the weights of the officers", "作品例证"), e("judgment", 11, "can hardly be classed as Literature", "批评判断"), e("qualification", 12, "no thinking man can refuse to accept their first proposition", "保留合理原则"), e("question", 13, "have we essentially changed?", "追问前提")],
    paraphrases: [{ evidenceIds: ["object", "theory", "example", "judgment", "qualification"], meaning: "介绍对象、展示例子并作出有保留的评价，构成评论。", optionText: "a review of Futurist poetry", relation: "同义转换", limit: "review并不要求作者完全赞同，也不把对诗歌的评论扩大到所有艺术运动。" }],
    options: {
      A: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["object"], reasoning: "全文只聚焦未来主义诗歌，没有系统调查多种艺术新方法。" },
      B: { judgment: "选入", evidenceIds: ["object", "theory", "example", "judgment", "qualification"], reasoning: "review既包括理论和形式介绍，也包括作品批评与结尾保留，覆盖四段主线。" },
      C: { judgment: "排除", errorType: "范围过窄", evidenceIds: ["judgment", "qualification"], reasoning: "merits只说优点；全文明确质疑文学性，不能将整体评论改成优点赞扬。" },
      D: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["object", "judgment"], reasoning: "流派的规则只用于评价诗歌，不是全文系统讨论文学一般规则的主题。" },
    }, transfer: "主旨题同时检查对象范围和作者在做的事情：评论不等于赞扬，局部规则不等于全文主题。",
  },
  20: {
    questionType: "细节同义转换", scope: "sentence", restatement: "新文学观念出现时，应先采取什么态度或行动？", keyInstruction: "try to对应可取的行动，find out后的内容才是行动目标。",
    locationPolicy: { revision: 1, paths: [{ id: "aim-first", label: "首句了解目标", groups: [ids(1)], supportingSentenceIds: ids(2), maxSentences: 2 }] },
    evidence: [e("advice", 1, "it is advisable to find out what its advocates are aiming at", "可取行动与所查目标"), e("future", 1, "they may be regarded as normal", "不宜只凭当前观感否定的理由")],
    paraphrases: [{ evidenceIds: ["advice"], meaning: "查明倡导者旨在达到什么，就是查明该观念的目的。", optionText: "determine its purposes", relation: "同义转换", limit: "determine在这里是查明，不是替观念制定目的；了解不等于接受。" }],
    options: {
      A: { judgment: "选入", evidenceIds: ["advice"], reasoning: "find out对应determine，what advocates aim at对应purposes。" },
      B: { judgment: "排除", errorType: "无中生有", evidenceIds: ["advice", "future"], reasoning: "未来可能认可不等于现在应忽略缺陷；作者要求先了解目标。" },
      C: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["advice"], reasoning: "新风潮出现是背景，作者没有要求随潮流而走。" },
      D: { judgment: "排除", errorType: "过度绝对", evidenceIds: ["advice", "future"], reasoning: "了解目标和保留未来可能性，都没有推出直接接受这些原则。" },
    }, transfer: "将行动动词与其宾语一起匹配：了解目标、忽略缺陷、追随风潮、接受原则是四种不同动作。",
  },
  21: {
    questionType: "转述观点概括", scope: "paragraph", restatement: "未来主义者主张我们必须怎样更新文学表达？", keyInstruction: "claim标出观点来源，概括应保留原文的表达形式及限定范围。",
    locationPolicy: { revision: 1, paths: [{ id: "new-form", label: "新形式主张与具体方法", groups: [ids(5)], supportingSentenceIds: ids(3, 4, 6, 7, 8), maxSentences: 4 }] },
    evidence: [e("form", 5, "requires a new form of expression", "概括性主张"), e("interpret", 6, "if we want to interpret modern stress", "目标是表现压力"), e("limits", 7, "qualifying adjectives, or finite verbs", "原文对词类有限定"), e("methods", 8, "make up words that imitate them", "新表达的具体方法")],
    paraphrases: [{ evidenceIds: ["form", "methods"], meaning: "a new form与new modes都指新的表达形式、方式。", optionText: "develop new modes of expression", relation: "同义转换", limit: "创新表达不等于增加作品数量；不从具体形式规则推成不用任何形容词或动词。" }],
    options: {
      A: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["form"], reasoning: "原文说表达形式更新，选项改成文学产量增加。" },
      B: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["interpret"], reasoning: "interpret是表现、阐释压力，relieve是缓解，改变了写作目标。" },
      C: { judgment: "选入", evidenceIds: ["form", "methods"], reasoning: "概括了新表达形式的明确主张，也能涵盖后文造词和排版实验。" },
      D: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["limits"], reasoning: "原文限定qualifying adjectives与finite verbs，选项删去限定扩大为所有形容词和动词，也不能概括整个段落。" },
    }, transfer: "概括被转述者观点时先找总括句，再用具体例子验证；留意干扰项删去限定词或替换目标动词。",
  },
  22: {
    questionType: "作者态度与分类推断", scope: "whole-passage", restatement: "综合作者的批评、让步与末句追问，怎样理解他对未来主义诗歌的评价？", keyInstruction: "区分作者、未来主义者和让步假设；不要把原则可能正确当作作品必然成立。",
    locationPolicy: { revision: 1, paths: [{ id: "work-principle-premise", label: "作品评价、例子与原则边界", groups: [ids(2, 11), ids(10), ids(12, 13)], supportingSentenceIds: ids(9), maxSentences: 4 }, { id: "opening-ending", label: "首尾评价与最后追问", groups: [ids(2), ids(11), ids(13)], supportingSentenceIds: ids(12), maxSentences: 4 }] },
    evidence: [e("concession", 2, "even admitting that the theory on which it is based may be right", "理论合理只是让步可能"), e("classification", 2, "it can hardly be classed as Literature", "作品难算文学"), e("example", 10, "the line consists of the noise of their falling and the weights of the officers", "具体诗行支持批评"), e("return", 11, "can hardly be classed as Literature", "末段重申评价"), e("principle", 12, "their first proposition", "认可范围限于第一原则"), e("premise", 13, "have we essentially changed?", "人性变化仍被追问")],
    paraphrases: [{ evidenceIds: ["classification", "example", "return", "premise"], meaning: "作者把这种实验视为时代中的现象，却对将它称为文学持明显保留。", optionText: "more of a transient phenomenon than literature", relation: "同义转换", limit: "D是四项中的综合概括；transient不是原文直接给出的持续时间判断，不可编造作品消失的年份或断言作者预测具体寿命。" }],
    options: {
      A: { judgment: "排除", errorType: "过度绝对", evidenceIds: ["concession", "principle"], reasoning: "may be right处在even admitting让步假设中；认可一项一般原则不等于明确认定所有基础原则合理。" },
      B: { judgment: "排除", errorType: "无中生有", evidenceIds: ["classification", "example"], reasoning: "没有普通人接受这种诗歌的证据，混乱的作品示例反而显示理解困难。" },
      C: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["premise"], reasoning: "末句追问人是否本质改变，选项却把诗歌当作人性已根本改变的指示，跨过了作者未确认的前提。" },
      D: { judgment: "选入", evidenceIds: ["classification", "example", "return", "premise"], reasoning: "more of A than B保留类别上的侧重：作者讨论这种时代现象，反复质疑其文学性；‘短暂现象’是选项概括，不能扩写成原文明说的寿命预测。" },
    }, transfer: "态度推断保留原文语气和认可边界；当答案含概括性措辞时明确哪部分是直接证据、哪部分是推断。",
  },
};
