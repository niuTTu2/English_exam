import type { QuestionReasoning } from "./article-teaching";
const ids = (...ns: number[]) => ns.map(n => `2001-p1-s${n}`);
const e = (id: string, n: number, quote: string, role: string, strength: "直接证据" | "上下文推断" | "全文概括" = "直接证据") => ({ id, sentenceId: ids(n)[0], quote, role, strength });
export const passage2001P1Reasoning: Record<number, QuestionReasoning> = {
  21: {
    questionType: "细节对应与实例推断", scope: "sentence", restatement: "哪些学科最典型地体现数学或实验室训练要求？", keyInstruction: "锁定more clearly和原文most obvious，再核对选项两门学科的完整组合。",
    locationPolicy: { revision: 1, paths: [{ id: "training-fields", label: "第8句训练范围", groups: [ids(8)], supportingSentenceIds: ids(7), maxSentences: 2 }] },
    evidence: [e("training", 8, "based especially on a mathematical or laboratory training", "两种典型训练要求"), e("obvious", 8, "naturally most obvious", "题干more clearly的对应限定"), e("demands", 7, "a longer, more complex training", "困难增加的训练背景")],
    paraphrases: [{ evidenceIds: ["training", "obvious"], meaning: "物理与化学最典型地对应数学和实验室训练，构成四项中的最佳组合。", optionText: "physics and chemistry", relation: "同义转换", limit: "这是题目四个组合间的最佳对应，不能推成心理学没有实验或社会学不使用数学。" }],
    options: {
      A: { judgment: "排除", errorType: "范围过窄", evidenceIds: ["training"], reasoning: "chemistry符合实验室训练的典型特征，但整个组合没有D那样鲜明地覆盖题目强调的两类训练；不是说社会学绝无数学方法。" },
      B: { judgment: "排除", errorType: "范围过窄", evidenceIds: ["training"], reasoning: "physics对应数学训练；与四项相比较，psychology不是此题实验室训练的最佳典型，不能仅凭物理这一项就选整组。" },
      C: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["training", "obvious"], reasoning: "社会学和心理学没有像D那样典型对应文中所说最明显的专门训练领域；问的是趋势最明显处，而非两门学科是否属于科学。" },
      D: { judgment: "选入", evidenceIds: ["training", "obvious"], reasoning: "physics典型依赖数学，chemistry典型依赖实验室训练，是所给组合中对原文分类线索最贴切的实例。" },
    }, transfer: "such as实例题既核对类别特征，也核对more clearly、most等比较限定；一个组合中一项符合还不够。",
  },
  22: {
    questionType: "有边界的推断", scope: "adjacent-sentences", restatement: "业余者是否仍可能在部分科学领域与专业者竞争？", keyInstruction: "保留can和some的限制，利用界线有例外这一原则，并用训练范围校准。",
    locationPolicy: { revision: 1, paths: [{ id: "exceptions", label: "第5句界线与例外", groups: [ids(5)], supportingSentenceIds: ids(6, 7, 8), maxSentences: 4 }, { id: "principle-and-fields", label: "界线原则与训练领域联合", groups: [ids(5), ids(8)], supportingSentenceIds: ids(7, 14), maxSentences: 4 }] },
    evidence: [e("exceptions", 5, "No clear-cut distinction can be drawn between professionals and amateurs in science", "界线不是绝对"), e("rule", 5, "exceptions can be found to any rule", "允许例外"), e("fields", 8, "in those areas of science based especially on a mathematical or laboratory training", "困难最明显的领域受限定", "上下文推断"), e("another", 4, "Another was the growing professionalisation", "两个相关过程并列"), e("harder", 12, "harder for amateurs", "准入困难增加"), e("local", 14, "either to remain in local societies or to come together nationally", "业余者的两种组织选择")],
    paraphrases: [{ evidenceIds: ["exceptions", "rule", "fields"], meaning: "既非绝对界线，又并非所有领域同等依赖专门训练，因此业余者在某些领域保留竞争空间。", optionText: "amateurs can compete with professionals in some areas of science", relation: "同义转换", limit: "推断只到can和some，不意味着业余者普遍胜过专业者，也没有保证某一个人的研究水平。" }],
    options: {
      A: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["exceptions", "another"], reasoning: "无绝对界线讲专业者和业余者；选项换成专业化和职业化两个过程，原文只说两者相关，未说几乎无区别。" },
      B: { judgment: "选入", evidenceIds: ["exceptions", "rule", "fields"], reasoning: "can与some保留例外和领域范围，可从原文合理推得，而非额外声称完全平等。" },
      C: { judgment: "排除", errorType: "无中生有", evidenceIds: ["harder"], reasoning: "文章说明门槛增加，没有提供专业者通常欢迎业余者的态度依据；不能把存在例外等同于普遍欢迎。" },
      D: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["local"], reasoning: "remain in local societies直接说明可留在地方学会，选项no local ones与之冲突。" },
    }, transfer: "推断题优先比较量词、情态和对象：原文允许例外，通常只能支持有限可能，不支持无条件普遍结论。",
  },
  23: {
    questionType: "例证的论证作用", scope: "whole-passage", restatement: "地质学例子要说明哪一条贯穿全文的过程？", keyInstruction: "回到例证入口can be illustrated和首段两个过程，再检验细节是否都被概括。",
    locationPolicy: { revision: 1, paths: [{ id: "thesis-and-example", label: "首段两个过程及例证入口", groups: [ids(3), ids(4), ids(8)], supportingSentenceIds: ids(12, 14, 15, 16), maxSentences: 5 }, { id: "example-and-conclusion", label: "例证入口及结尾明确命名", groups: [ids(8), ids(15)], supportingSentenceIds: ids(9, 12, 14, 16), maxSentences: 4 }] },
    evidence: [e("specialisation", 3, "specialisation was only one of a series of related developments", "首段相关过程之一", "全文概括"), e("professionalisation", 4, "the growing professionalisation of scientific activity", "首段另一过程", "全文概括"), e("illustration", 8, "can be illustrated in terms of the development of geology", "明确例证关系"), e("journals", 12, "the widespread introduction of refereeing", "发表制度这一环节"), e("societies", 14, "A rather similar process of differentiation", "由期刊到学会的分化"), e("named-process", 15, "the process of professionalisation and specialisation", "结尾明确命名例证过程", "全文概括")],
    paraphrases: [{ evidenceIds: ["specialisation", "professionalisation", "illustration", "named-process"], meaning: "地质学案例具体展示专业化和职业化从研究要求到组织制度的发展过程。", optionText: "the process of specialisation and professionalisation", relation: "同义转换", limit: "包括业余者困难和出版变化，但总作用不能缩成任一环节。" }],
    options: {
      A: { judgment: "选入", evidenceIds: ["illustration", "specialisation", "professionalisation", "named-process"], reasoning: "首段提出两过程，第8句引入实例，第15句用相同概念总结地质学，覆盖完整论证。" },
      B: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["journals", "named-process"], reasoning: "业余者困难是过程中的后果，不能涵盖研究标准、专业者组织及科学结构变化的整体过程。" },
      C: { judgment: "排除", errorType: "范围过窄", evidenceIds: ["journals", "societies"], reasoning: "出版变化确实出现，但实例还包含训练要求和学会组织，出版政策概括过窄。" },
      D: { judgment: "排除", errorType: "无中生有", evidenceIds: ["societies", "named-process"], reasoning: "结构分化与门槛提高不自动证明专业者主观歧视；选项加入作者未提出的动机和态度判断。" },
    }, transfer: "例证作用题用‘此例证明哪条论点’提问；局部事实成立，并不等于它是举整个例子的目的。",
  },
  24: {
    questionType: "直接原因与同义转换", scope: "sentence", restatement: "专业化最直接回应的是什么问题？", keyInstruction: "先找response to引出的原因，再保留知识这一对象，区分原因、方法与后果。",
    locationPolicy: { revision: 1, paths: [{ id: "opening-cause", label: "首句原因", groups: [ids(1)], supportingSentenceIds: ids(2, 3, 4), maxSentences: 2 }] },
    evidence: [e("cause", 1, "a response to the problem of an increasing accumulation of scientific knowledge", "明确原因与应对方向"), e("method", 2, "splitting up the subject matter into smaller units", "应对方法及实际拆分对象"), e("effect", 3, "affecting the process of communication", "交流受到影响而非直接原因"), e("parallel", 4, "Another was the growing professionalisation", "职业化是另一相关发展")],
    paraphrases: [{ evidenceIds: ["cause"], meaning: "科学知识不断积累，即知识的增长；expansion保留增加含义和scientific knowledge对象。", optionText: "the expansion of scientific knowledge", relation: "同义转换", limit: "原句说可视为一种应对，不额外断言知识增长是历史上唯一因素。" }],
    options: {
      A: { judgment: "排除", errorType: "因果倒置", evidenceIds: ["cause", "effect"], reasoning: "科学交流是这些发展影响的过程，将其发展换成专业化的直接原因，逆转文中关系。" },
      B: { judgment: "排除", errorType: "无中生有", evidenceIds: ["parallel"], reasoning: "职业化作为Another与专业化并列，相关不等于直接因果。" },
      C: { judgment: "选入", evidenceIds: ["cause"], reasoning: "expansion准确改写increasing accumulation，且保留科学知识这一增长对象。" },
      D: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["method"], reasoning: "第二句被拆分的是subject matter研究内容，不是academic societies；而拆分还是应对方法，非首句直接原因。" },
    }, transfer: "因果题先锁定关系词和箭头方向，再比对对象；共享某个动词不足以构成同义改写。",
  },
};
