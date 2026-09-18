import type { QuestionReasoning } from "./article-teaching";

const ids = (...numbers: number[]) => numbers.map(n => `2010-p2-s${n}`);
const e = (id: string, n: number, quote: string, role: string, strength: "直接证据" | "上下文推断" | "全文概括" = "直接证据") => ({ id, sentenceId: `2010-p2-s${n}`, quote, role, strength });

export const passage2010P2Reasoning: Record<number, QuestionReasoning> = {
  26: {
    questionType: "细节题：首要期待", scope: "sentence",
    restatement: "多数妻子最希望丈夫做什么？", keyInstruction: "保留most和main，找明确说明首要角色的句子。不是问婚姻里有哪些合理需求。",
    locationPolicy: { revision: 1, paths: [{ id: "first-and-foremost", label: "第18句直接对应首要期待", groups: [ids(18)], supportingSentenceIds: ids(15, 16, 17), maxSentences: 4 }] },
    evidence: [
      e("expectation", 18, "most wives want their husbands to be, first and foremost, conversational partners", "main expectation的直接对应"),
      e("not-inequities", 15, "focused not on tangible inequities", "具体不公平并非主要焦点"),
      e("career", 15, "having given up the chance for a career to accompany a husband to his", "事业例子所属层次"),
      e("housework", 15, "doing far more than their share of daily life-support work", "家务分担例子所属层次"),
      e("communication", 16, "Instead, they focused on communication", "纠正关注方向"),
    ],
    paraphrases: [{ evidenceIds: ["expectation", "communication"], meaning: "first and foremost对应main；成为交谈伙伴，落实为与妻子说话。", optionText: "Talking to them.", relation: "同义转换", limit: "首要不等于唯一；原文没有否认事业支持和家务分担有价值。" }],
    options: {
      A: { judgment: "选入", evidenceIds: ["expectation"], reasoning: "conversational partners与Talking to them对应；them指妻子，动作由丈夫完成，符合题干问的期待。" },
      B: { judgment: "排除", errorType: "无中生有", evidenceIds: ["expectation", "communication"], reasoning: "信任可能是日常常识中的婚姻需求，但这一段明确说首要期待是交流，没有将trust列为答案依据。" },
      C: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["career", "not-inequities", "communication"], reasoning: "事业牺牲确实被提到，但位于not on所统领的不公平例子里；把被提及的事业问题换成main expectation，忽略了作者随后强调的交流。" },
      D: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["housework", "not-inequities", "communication"], reasoning: "家务负担确实是例子；作者用not on和Instead把主要焦点转向沟通，不能把家务分担换成题干问的首要期待。" },
    },
    transfer: "细节题先抓题干的限定词，再找原文同义表达；被提及的例子与作者强调的重点可能不同。",
  },
  27: {
    questionType: "词组含义推断", scope: "adjacent-sentences",
    restatement: "wreaking havoc在婚姻语境中表示什么后果？", keyInstruction: "先判断影响的正负，再判断程度；用后面的离婚、沟通失败证据校准。",
    locationPolicy: { revision: 1, paths: [{ id: "phrase-and-consequence", label: "第11句加离婚或沟通失败后果", groups: [ids(11), ids(13, 14)], supportingSentenceIds: ids(10, 12), maxSentences: 4 }] },
    evidence: [
      e("havoc", 11, "is wreaking havoc with marriage", "待解释的词组及受影响对象"),
      e("divorces", 13, "gave lack of communication as the reason for their divorces", "后文严重负面后果"),
      e("epidemic", 14, "a virtual epidemic of failed conversation", "作者对问题规模的强烈评价"),
    ],
    paraphrases: [{ evidenceIds: ["havoc", "divorces", "epidemic"], meaning: "对婚姻造成严重破坏，可概括为causing damage。", optionText: "causing damage", relation: "同义转换", limit: "不是任意好坏的一般影响；也不意味着所有离婚都只由沟通造成。" }],
    options: {
      A: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["divorces", "epidemic"], reasoning: "generating motivation意为产生动力；不能保留后文离婚和沟通失败的负面方向。" },
      B: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["havoc", "divorces"], reasoning: "exerting influence只说施加影响，可正可负，范围太宽，丢失havoc明确的严重破坏性。" },
      C: { judgment: "选入", evidenceIds: ["havoc", "divorces", "epidemic"], reasoning: "causing damage同时保留负面方向和损害含义，与上下文一致。" },
      D: { judgment: "排除", errorType: "范围过窄", evidenceIds: ["havoc", "divorces"], reasoning: "creating pressure仅指形成压力，不能准确概括此处已经谈到的婚姻关系受损；在四项中C更贴合。" },
    },
    transfer: "猜词时不要停在大致相关，继续核对感情色彩、程度和受影响对象。",
  },
  28: {
    questionType: "事实核对：EXCEPT反向题", scope: "whole-passage",
    restatement: "哪一项不能由原文支持？", keyInstruction: "EXCEPT要求找不成立的一项。尤其保留统计对象、样本范围和因果强度。",
    locationPolicy: { revision: 1, paths: [
      { id: "rate-mismatch", label: "直接核对B的比例与前句样本", groups: [ids(13), ids(14)], supportingSentenceIds: ids(9, 10, 16, 18), maxSentences: 5 },
      { id: "four-option-check", label: "逐项核对公开场合、统计和家庭交流", groups: [ids(10), ids(13), ids(14), ids(16, 18), ids(9)], supportingSentenceIds: ids(5, 8, 17), maxSentences: 7 },
    ] },
    evidence: [
      e("public", 10, "American men tend to talk more than women in public situations", "A的直接依据"),
      e("home", 10, "they often talk less at home", "家庭场合的反差"),
      e("wife-keeps", 9, "If she didn't keep the conversation going, we'd spend the whole evening in silence", "妻子维持家庭谈话的个案", "上下文推断"),
      e("sample", 13, "most of the women she interviewed – but only a few of the men –", "受访者的范围与性别对照"),
      e("attribution", 13, "gave lack of communication as the reason for their divorces", "访谈中的原因归属"),
      e("rate", 14, "the current divorce rate of nearly 50 percent", "50%实际限定离婚率"),
      e("wives", 18, "most wives want their husbands to be, first and foremost, conversational partners", "C的交流期待依据"),
    ],
    paraphrases: [{ evidenceIds: ["rate", "sample", "attribution"], meaning: "原文给出总体离婚率和访谈归因；B却声称近期离婚中近50%由沟通失败造成，统计对象和因果口径都发生变化。", optionText: "nearly 50 percent of recent divorces are caused by failed conversation", relation: "矛盾对照", limit: "矛盾对照标示命题被偷换，不表示原文提供了另一个原因占比。不能从没有该数字推算出真实占比。" }],
    options: {
      A: { judgment: "排除", errorType: "事实成立，非本题所求", evidenceIds: ["public"], reasoning: "准确保留男性、女性、公开场合和tend to的一般倾向，符合原文，所以不选。" },
      B: { judgment: "选入", errorType: "偷换对象", evidenceIds: ["rate", "sample", "attribution"], reasoning: "50%修饰离婚率，不是离婚原因占比；访谈女性的多数归因也不能推成全部近期离婚的确定因果。B是本题唯一应选的EXCEPT项。" },
      C: { judgment: "排除", errorType: "事实成立，非本题所求", evidenceIds: ["wives"], reasoning: "多数妻子首先期待交谈伙伴，支持女性重视夫妻交流这一概括，不等于所有女性完全相同。" },
      D: { judgment: "排除", errorType: "事实成立，非本题所求", evidenceIds: ["wife-keeps", "home"], reasoning: "首段妻子维持谈话的说明与男性在家话少的概括共同支持家庭中女性较健谈的倾向；保留tends to，不扩大成每对夫妻的绝对规律。" },
    },
    transfer: "看到百分数，要连同它修饰的指标一起读；总体比率、样本中某类人的比例、某原因占比不能互换。",
  },
  29: {
    questionType: "全文主旨", scope: "whole-passage",
    restatement: "哪项最准确概括全文持续讨论的问题？", keyInstruction: "看故事、概括、研究和结尾是否能归到同一话题；不能只抓第18句的expectations。",
    locationPolicy: { revision: 1, paths: [{ id: "passage-thread", label: "首段个案、模式概括、研究焦点和结尾", groups: [ids(2, 5, 9), ids(10, 11), ids(13, 14), ids(16, 18), ids(19)], supportingSentenceIds: [], maxSentences: 7 }] },
    evidence: [
      e("anecdote", 2, "while his wife sat silently beside him on the couch", "首段男女表现对照", "全文概括"),
      e("pattern", 10, "they often talk less at home", "第二段概括谈话模式", "全文概括"),
      e("research", 13, "gave lack of communication as the reason for their divorces", "第三段研究仍围绕沟通", "全文概括"),
      e("not-inequities", 15, "focused not on tangible inequities", "排除把具体不公当主要焦点"),
      e("focus", 16, "Instead, they focused on communication", "第四段明确研究焦点"),
      e("expectation", 18, "conversational partners, but few husbands share this expectation", "期待差异限于交流角色"),
      e("cartoon", 19, "while a woman glares at the back of it, wanting to talk", "末段形象呈现交谈反差", "全文概括"),
    ],
    paraphrases: [{ evidenceIds: ["anecdote", "pattern", "research", "focus", "expectation", "cartoon"], meaning: "全文由场合中的话多话少谈到夫妻交流期待不同，贯穿对象是夫妻交谈模式。", optionText: "Conversational patterns between man and wife are different.", relation: "同义转换", limit: "这是作者讨论的倾向性差异，不是在证明每一对夫妻必然如此。" }],
    options: {
      A: { judgment: "排除", errorType: "无中生有", evidenceIds: ["research", "focus"], reasoning: "文章引用社会学研究，不等于主旨是道德衰败；moral decay没有成为讨论对象。" },
      B: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["not-inequities", "focus"], reasoning: "把婚姻破裂概括为性别不平等所致，扩大了本文的因果结论，也偏离作者用Instead强调的沟通焦点。" },
      C: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["expectation", "pattern", "cartoon"], reasoning: "期待差异确实出现，但文中具体指交谈伙伴角色；本项泛称对婚姻的期待，没有保留全文最关键的交流限定，D更准确。" },
      D: { judgment: "选入", evidenceIds: ["anecdote", "pattern", "research", "focus", "cartoon"], reasoning: "把故事、研究和漫画串成同一谈话模式差异主题，既覆盖全篇，又保留具体讨论对象。" },
    },
    transfer: "相近主旨选项比较‘对象＋范围’：能概括一句话的选项，未必最准确概括全篇。",
  },
  30: {
    questionType: "相邻段落续写推断", scope: "sentence",
    restatement: "紧接本文的下一部分最可能继续写什么？", keyInstruction: "immediately after要求承接末段当前焦点。选择最可能衔接的方向，不把推断写成原卷已有后文。",
    locationPolicy: { revision: 1, paths: [{ id: "ending-scene", label: "末句漫画焦点，前句可补主题", groups: [ids(19)], supportingSentenceIds: ids(18), maxSentences: 2 }] },
    evidence: [
      e("ending", 19, "the stereotypical cartoon scene", "末段刚引入的描写对象"),
      e("detail", 19, "a man sitting at the breakfast table with a newspaper held up in front of his face", "已开始的场景描写"),
      e("woman", 19, "while a woman glares at the back of it, wanting to talk", "场景中的交流矛盾"),
      e("book", 13, "in her new book Divorce Talk", "前文研究来源，非末段焦点"),
      e("rate", 14, "the current divorce rate of nearly 50 percent", "前文规模说明，非末段转向"),
      e("hacker", 12, "political scientist Andrew Hacker", "前文研究者，非续写人物主线"),
    ],
    paraphrases: [{ evidenceIds: ["ending", "detail", "woman"], meaning: "继续细写这幅漫画最直接承接末段的场景与沟通矛盾。", optionText: "a detailed description of the stereotypical cartoon", relation: "同义转换", limit: "在四项中判断最可能承接；原卷并未提供真实后文，不能宣称已经核实作者实际续写内容。" }],
    options: {
      A: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["book", "ending"], reasoning: "书名只是第3段引用研究的来源；末段没有提示转回介绍该书，不能仅因出现过就当作紧接话题。" },
      B: { judgment: "选入", evidenceIds: ["ending", "detail", "woman"], reasoning: "保留末段刚引出的漫画对象，可继续展开夫妻交流反差，是四项中最直接的承接。" },
      C: { judgment: "排除", errorType: "范围扩大", evidenceIds: ["rate", "woman"], reasoning: "罗列其他离婚原因会把当前的漫画和交流焦点扩展为离婚原因综述，结尾没有这样的转向信号。" },
      D: { judgment: "排除", errorType: "把局部当全文", evidenceIds: ["hacker", "ending"], reasoning: "Hacker已作为研究来源出现，不是末段人物；此时转写其简介缺乏承接依据。" },
    },
    transfer: "续写题首先看末段新引入、仍可展开的对象，再用全文主题限制范围；‘可能’不能改写成‘已证实’。",
  },
};
