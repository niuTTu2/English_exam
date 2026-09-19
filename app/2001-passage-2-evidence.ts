import type { QuestionReasoning } from "./article-teaching";
const ids = (...ns: number[]) => ns.map(n => `2001-p2-s${n}`);
const e = (id: string, n: number, quote: string, role: string, strength: "直接证据" | "上下文推断" | "全文概括" = "直接证据") => ({ id, sentenceId: ids(n)[0], quote, role, strength });
export const passage2001P2Reasoning: Record<number, QuestionReasoning> = {
  25: {
    questionType: "概念评价与同义对应", scope: "adjacent-sentences", restatement: "作者认为数字鸿沟本身应受到何种对待？", keyInstruction: "把危险评价接回digital divide，区别positive修饰的积极力量。",
    locationPolicy: { revision: 1, paths: [{ id: "danger-reference", label: "第3句危险评价与概念指代", groups: [ids(3)], supportingSentenceIds: ids(1, 2, 4, 10), maxSentences: 3 }] },
    evidence: [e("definition", 1, "the division of the world into the info (information) rich and the info poor", "数字鸿沟所指"), e("danger", 3, "this looming danger", "逼近的危险评价"), e("forces", 4, "the new, positive forces that work against the digital divide", "积极修饰力量而非鸿沟"), e("direction", 10, "will narrow rather than widen", "作者预测方向")],
    paraphrases: [{ evidenceIds: ["danger", "definition"], meaning: "逼近的危险需要防范，guard against对应作者对鸿沟的态度。", optionText: "the world must guard against", relation: "同义转换", limit: "承认危险不等于预测它必然继续扩大；作者同时指出缩小它的积极力量。" }],
    options: {
      A: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["direction", "forces"], reasoning: "选项说因互联网而恶化，作者却认为推广接入等积极力量会使鸿沟缩小。" },
      B: { judgment: "排除", errorType: "无中生有", evidenceIds: ["definition", "danger"], reasoning: "原文定义并评价危险，没有将形成鸿沟的责任明确归给富国；选项增加责任主体。" },
      C: { judgment: "选入", evidenceIds: ["danger"], reasoning: "looming danger是需要警惕的危险，支持全世界应防范；关系从句修饰题干something，against对象即鸿沟。" },
      D: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["forces"], reasoning: "positive修饰对抗鸿沟的forces；选项把积极评价移到鸿沟本身，改变修饰对象。" },
    }, transfer: "评价题先查形容词究竟修饰谁；作者可以同时承认问题危险并乐观看待解决力量。",
  },
  26: {
    questionType: "相邻信息联合的原因推断", scope: "adjacent-sentences", restatement: "为什么政府重视并推广互联网？", keyInstruction: "将商业潜在顾客和政府怕掉队放在同一语境中理解；区分经济动机与连接功能。",
    locationPolicy: { revision: 1, paths: [{ id: "business-government", label: "商业利益与政府动机相邻联合", groups: [ids(7), ids(8)], supportingSentenceIds: ids(6, 9, 11, 14), maxSentences: 4 }] },
    evidence: [e("business", 7, "in the interest of business to universalize access", "普及符合商业利益"), e("customers", 7, "the more people online, the more potential customers there are", "经济机会的解释"), e("government", 8, "afraid their countries will be left behind", "政府担忧落后", "上下文推断"), e("potential", 14, "has enormous potential", "潜力而非保证"), e("tool", 11, "may well be the most powerful tool for combating world poverty", "工具潜力的限制"), e("capital", 15, "with respect to foreign investment", "后文讨论的基础设施资金条件")],
    paraphrases: [{ evidenceIds: ["business", "customers", "government"], meaning: "商业用户和顾客扩展提供经济机会，各国政府不愿错过这种发展潜力。", optionText: "offers economic potentials", relation: "同义转换", limit: "这是由相邻论证推出的经济动机，不宣称每一个政府实际政策都只有这一原因。" }],
    options: {
      A: { judgment: "选入", evidenceIds: ["business", "customers", "government"], reasoning: "经济潜力覆盖商业利益、潜在顾客和不愿落后的动机，是四项中最贴合政府推广原因的概括。" },
      B: { judgment: "排除", errorType: "因果倒置", evidenceIds: ["capital", "business"], reasoning: "末段用外资帮助建设电子设施；并未把网络带来外资写成政府重视互联网的直接原因，资金与设施关系被倒转。" },
      C: { judgment: "排除", errorType: "过度绝对", evidenceIds: ["tool", "potential"], reasoning: "may well和potential只谈强大可能作用，soon wipe out额外保证很快彻底消除贫困，时间和结果都被夸大。" },
      D: { judgment: "排除", errorType: "事实成立，非本题所求", evidenceIds: ["customers", "government"], reasoning: "连接全球是网络功能及推广结果，题目追问政府为什么重视；相邻句突出连接带来的经济机会，而非仅陈述功能。" },
    }, transfer: "原因题不只找文中出现过的事实，要区分功能、条件、结果和主体采取行动的动机。",
  },
  27: {
    questionType: "历史案例的政策论证作用", scope: "paragraph", restatement: "美国借外资建设设施的例子支持什么政策？", keyInstruction: "先读案例前的外资偏见，再分清融资、建造与最终所有权。",
    locationPolicy: { revision: 1, paths: [{ id: "policy-funding-ownership", label: "政策入口、外资融资与美国所有权", groups: [ids(15, 16), ids(18, 20), ids(23)], supportingSentenceIds: ids(17, 19, 21, 22, 24), maxSentences: 6 }] },
    evidence: [e("policy", 15, "get over their outdated anti-colonial prejudices with respect to foreign investment", "案例前的政策主张"), e("sovereignty", 16, "foreign investment is an invasion of their sovereignty", "作者回应的担忧"), e("shortage", 17, "it didn’t have the capital to do so", "接受资金的历史条件"), e("foreign", 18, "were built with foreign investment", "外资帮助建设"), e("finance", 20, "They financed them", "融资者"), e("build", 21, "Immigrant Americans built them", "建造者"), e("own-question", 22, "who owns them now", "所有权所问"), e("owners", 23, "The Americans", "当前所有者"), e("regulation", 26, "letting foreign corporations run uncontrolled", "后文所排除的失控误解")],
    paraphrases: [{ evidenceIds: ["policy", "shortage", "foreign", "owners"], meaning: "资金不足的美国曾接受外资建设，而设施后来仍归美国人；接受投资并不必然失去本国所有权。", optionText: "accepting foreign investment", relation: "同义转换", limit: "不等于作者主张所有外国公司均无须监管，也不保证一切外资合同都带来同一结果。" }],
    options: {
      A: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["foreign", "finance"], reasoning: "案例方向是欧洲资本投入美国，选项却把政策写为向海外提供资助，把资金接收方换成输出方。" },
      B: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["policy", "owners", "regulation"], reasoning: "避免失控是后文的边界，并非提美国史的主要政策目的。案例用本国所有权回应担忧，服务于接受外资，而非介绍阻止控制的操作方案。" },
      C: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["foreign", "policy"], reasoning: "工业基础设施是例子所述事实内容；题干to justify问用这个事实论证哪项政策，答案应回到外资主张。" },
      D: { judgment: "选入", evidenceIds: ["policy", "foreign", "owners"], reasoning: "接受外资帮助建设，与最后仍由美国人拥有并存，正好支持克服偏见、利用外国投资的论点。" },
    }, transfer: "例证题把论点和例子分开；问政策时，应返回案例前后的主张，而非挑一个例子里确实发生的动作。",
  },
  28: {
    questionType: "经济条件的概括推断", scope: "sentence", restatement: "在作者的当代发展论述中，国家经济尤其关联哪方面的发展程度？", keyInstruction: "把which解释的电子基础设施与the better off经济处境连接起来。",
    locationPolicy: { revision: 1, paths: [{ id: "electronic-and-better-off", label: "第25句电子设施与经济处境", groups: [ids(25)], supportingSentenceIds: ids(24, 26, 27), maxSentences: 3 }] },
    evidence: [e("building", 25, "foreign capital you have helping you build your Third Wave infrastructure", "外资用于设施建设"), e("electronic", 25, "which today is an electronic infrastructure", "当代设施领域"), e("prosperity", 25, "the better off you’re going to be", "经济处境联系"), e("prejudice", 15, "prejudices with respect to foreign investment", "偏见对象是投资"), e("immigrant", 21, "Immigrant Americans built them", "移民只在建设者说明中出现"), e("boundary", 26, "letting foreign corporations run uncontrolled", "被否定的失控解释"), e("energy", 27, "building the energy and telecom infrastructures", "末句补充必要设施")],
    paraphrases: [{ evidenceIds: ["building", "electronic", "prosperity"], meaning: "在这条论证中，电子基础设施建设与未来经济处境相联系，可概括为电子信息方面发展程度。", optionText: "how well-developed it is electronically", relation: "同义转换", limit: "题干seems和depends much并非断言经济只取决于这一因素，也没有说拒绝监管更有利。" }],
    options: {
      A: { judgment: "选入", evidenceIds: ["electronic", "prosperity", "energy"], reasoning: "保留当代电子信息设施这一领域，并连接better off的经济处境，概括最贴合。" },
      B: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["prejudice", "immigrant"], reasoning: "原文针对foreign investment的偏见，与移民作为建造者是两处不同信息；选项把偏见对象换成immigrants。" },
      C: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["building", "electronic"], reasoning: "美国工业史提供利用外资原则，作者并未要求其他国家复制全部美国工业模式；当代要讨论的是电子设施。" },
      D: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["boundary", "energy", "prosperity"], reasoning: "监管是接受外资的边界，不能据此把经济发展的主要关联项改成控制外企的程度；正面主线是必要设施建设。" },
    }, transfer: "概括推断保留核心领域和限定词；出现在文章中的附带条件不能取代真正与结果相连的因素。",
  },
};
