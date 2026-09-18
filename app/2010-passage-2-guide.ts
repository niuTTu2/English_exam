import type { ArticleGuide, PassageEvidence } from "./article-teaching";

const s = (n: number) => `2010-p2-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });

export const passage2010P2Guide: ArticleGuide = {
  practice: [
    { id: "opening-contrast", revision: 1, kind: "choice", prompt: "聚会上男士的话为什么引来笑声，而他自己却觉得委屈？", options: ["现场他健谈、妻子沉默，他却说家里妻子话多", "他指责所有听众没有礼貌", "妻子当场否认自己认识他"], answer: "现场他健谈、妻子沉默，他却说家里妻子话多", evidence: "She's the talker in our family.", feedback: "把第2句的现场表现与第5、8—9句的家庭自述放在一起看：两个场合相反，听众看到反差，男子仍在解释自己在家的真实情况。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["paragraph-route"], leaksToTasks: [{ sentenceId: s(2), taskId: "public-contrast" }, { sentenceId: s(10), taskId: "irony-content" }] },
    { id: "research-focus", revision: 1, kind: "choice", prompt: "第4段把女性主要抱怨的焦点，从什么转到了什么？", options: ["从具体不公平转到沟通不足", "从交流不足转到道德衰败", "从男女差异转到书籍销量"], answer: "从具体不公平转到沟通不足", evidence: "Instead, they focused on communication", feedback: "第15句not on先否定主要焦点在事业或家务分配，第16句Instead再指出communication；不是否认不公平存在，也不是声称所有离婚只有一个原因。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["paragraph-route"], leaksToTasks: [{ sentenceId: s(15), taskId: "negated-focus" }, { sentenceId: s(16), taskId: "instead-reference" }] },
    { id: "paragraph-route", revision: 1, kind: "order", prompt: "把五段的作用排回原文顺序。", options: ["聚会个案呈现反差", "概括谈话模式及婚姻后果", "引用研究说明问题规模", "作者研究聚焦交流期待", "漫画形象收束沟通危机"], answer: JSON.stringify(["聚会个案呈现反差", "概括谈话模式及婚姻后果", "引用研究说明问题规模", "作者研究聚焦交流期待", "漫画形象收束沟通危机"]), evidence: "This episode crystallizes the irony", feedback: "先讲现场故事，再概括模式、引用研究、补作者发现，最后用漫画把差异具体化。研究者、离婚率和家务例子都服务于交流差异这条主线。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["opening-contrast", "research-focus"], leaksToTasks: [{ sentenceId: s(10), taskId: "irony-content" }, { sentenceId: s(16), taskId: "instead-reference" }] },
  ],
  route: ["聚会个案呈现反差", "概括谈话模式及婚姻后果", "引用研究说明问题规模", "作者研究聚焦交流期待", "漫画形象收束沟通危机"],
  mainIdea: "文章以聚会中的夫妻反差引出男女谈话模式不同，再借研究和漫画说明夫妻对交流的不同期待如何损害婚姻。讨论对象始终是交谈与沟通，不泛化为婚姻中的所有期待，也不把离婚都归因于同一原因。",
  paragraphs: [
    { paragraphId: "2010-p2-paragraph-1", title: "外面健谈，在家沉默", summary: "聚会上丈夫健谈、妻子安静；丈夫却说在家全靠妻子维持谈话，构成引人发笑的反差。", relation: "具体个案引入全文问题；男子的家庭自述解释笑点，不推翻作者对现场的观察。" },
    { paragraphId: "2010-p2-paragraph-2", title: "由插曲概括模式", summary: "作者明确概括男性在公众场合话多、在家话少的倾向，并指出其对婚姻的破坏。", relation: "This episode接首段故事，this pattern承接概括；从现象转向后果，引出下一段研究。" },
    { paragraphId: "2010-p2-paragraph-3", title: "研究与规模说明", summary: "Hacker的早期观察和Riessman访谈提供支持；男女对离婚原因的归因不同，作者再用总体离婚率强调问题规模。", relation: "为上一段的严重后果补充依据；50%是离婚率，不是某种原因在离婚案例中的占比。" },
    { paragraphId: "2010-p2-paragraph-4", title: "真正期待的是交流", summary: "作者自己的研究指出，主要抱怨并非事业和家务上的具体不公，而是缺少沟通；多数妻子首先期待交谈伙伴，丈夫较少持相同期待。", relation: "not on与Instead构成纠正，突出交流焦点；期待差异限定在谈话领域，呼应全文模式。" },
    { paragraphId: "2010-p2-paragraph-5", title: "用早餐桌漫画收束", summary: "男子隔着报纸沉默，女子想交谈却只能瞪着报纸背面，形象地呈现沟通危机。", relation: "In short收束主线，并把末段焦点落到漫画场景；续写推断应优先承接它，不跳回书籍或人物介绍。" },
  ],
  sentenceRoles: Object.fromEntries([
    "交代聚会地点与参加者，建立叙述现场。", "把丈夫健谈与妻子沉默并置，为后面的笑声设置背景。", "作者提出女性普遍抱怨丈夫不与自己交谈的话题。", "丈夫立刻赞同，引出他的自家例子。", "丈夫说妻子才是家里的话多者，与现场形成反差。", "以听众的笑声和男子的委屈呈现双方理解的落差。", "男子坚持自述属实，接着作解释。", "男子描述自己回家后的沉默；I已经换成引语中的男子。", "以假设说明妻子实际承担着维持谈话的角色。", "从首段个案提炼公众场合与家庭中的谈话反差。", "把谈话模式与婚姻受损联系起来，转向问题后果。", "交代这一模式在较早研究中已经被观察到。", "引用访谈，比较男女将离婚归因于沟通不足的不同倾向。", "用总体离婚率强调问题规模，不能反推出具体原因比例。", "列举具体不公平，但用not限定它们并非主要抱怨重点。", "Instead纠正关注方向，用不被倾听的抱怨说明沟通焦点。", "第二句抱怨进一步落实不交谈的问题。", "概括夫妻对交谈伙伴角色的不同期待，呼应Hacker。", "以报纸隔开的漫画画面总结交流危机，形成鲜明结尾。",
  ].map((role, i) => [s(i + 1), role])),
  references: [
    { expression: "them", sentenceId: s(1), referent: "女性团体的成员", targetSentenceIds: [s(1)], explanation: "男性被邀请加入女性的聚会；不是男性邀请自己。" },
    { expression: "him", sentenceId: s(2), referent: "当晚健谈的男子", targetSentenceIds: [s(2)], explanation: "妻子坐在这位男子旁边，不能把beside him连到offering。" },
    { expression: "It", sentenceId: s(7), referent: "妻子在家是话多者这一说法", targetSentenceIds: [s(5)], explanation: "It代替一个命题，不指房间或笑声。" },
    { expression: "I", sentenceId: s(8), referent: "直接引语中的丈夫", targetSentenceIds: [s(5), s(7)], explanation: "引号改变说话者：第1句的I是作者，第8句的I是男子。" },
    { expression: "This episode", sentenceId: s(10), referent: "前一段聚会上发生的整件小插曲", targetSentenceIds: [s(2), s(5), s(6), s(9)], explanation: "不是只指妻子沉默，也不是后文的离婚研究。" },
    { expression: "they", sentenceId: s(10), referent: "American men", targetSentenceIds: [s(10)], explanation: "同一群男性在不同场合说话量不同；不要因women更近就错接。" },
    { expression: "this pattern", sentenceId: s(11), referent: "男性在公开场合话多、在家话少的谈话模式", targetSentenceIds: [s(10)], explanation: "将模式接到婚姻后果；pattern不是针织图案。" },
    { expression: "she", sentenceId: s(13), referent: "Catherine Kohler Riessman", targetSentenceIds: [s(13)], explanation: "她是采访者，women是受访对象；省略的关系词承担interviewed的宾语。" },
    { expression: "that", sentenceId: s(14), referent: "前文所述离婚与沟通不足相关的情况", targetSentenceIds: [s(13)], explanation: "回指前述情况并谈规模，不提供将总体离婚率换成原因占比的依据。" },
    { expression: "his", sentenceId: s(15), referent: "丈夫的career（事业）", targetSentenceIds: [s(15)], explanation: "to his中的his独立使用，代替his career；中文可补‘事业’，原文不能擅自补词。" },
    { expression: "they", sentenceId: s(16), referent: "女性对丈夫的抱怨complaints", targetSentenceIds: [s(15)], explanation: "两句共用focused这个动作，原句主语延续complaints；中文可自然转为‘她们抱怨的重点’。" },
    { expression: "this expectation", sentenceId: s(18), referent: "把配偶首先当作交谈伙伴的期待", targetSentenceIds: [s(18)], explanation: "of their wives表示对妻子的期待，不能误成妻子提出的所有婚姻要求。" },
    { expression: "it", sentenceId: s(19), referent: "newspaper（报纸）", targetSentenceIds: [s(19)], explanation: "女人瞪着报纸背面，想说话的是女人；不能把wanting挂到报纸。" },
  ],
  timeline: [
    { label: "聚会之前", event: "女性团体先邀请男性；had invited以当晚讲话为过去参照点。原文没有邀请日期。", evidence: [e(1, "had invited men to join them", "先发生的邀请")] },
    { label: "聚会整晚到临近结束", event: "男子在那一晚持续健谈；Toward the end转到作者发言和现场对话。had been talkative是完成时系表结构，不是完成进行时。", evidence: [e(2, "Throughout the evening", "持续范围"), e(2, "had been particularly talkative", "状态"), e(3, "Toward the end of the evening", "临近结束")] },
    { label: "平日在家（习惯自述）", event: "男子用现在时描述下班回家的惯常状态，再用虚拟条件解释妻子如何维持谈话；不是记录那个聚会晚上回家后的事件。", evidence: [e(8, "When I come home from work", "习惯场景"), e(9, "If she didn't keep the conversation going", "假设条件")] },
    { label: "20世纪70年代后期", event: "Hacker已经观察到这一模式；第18句years before回指较早的研究，不据此算出作者研究的确切年份。", evidence: [e(12, "in the late 1970s", "明确年代"), e(18, "as Hacker observed years before", "较早观察")] },
    { label: "作者写作时的当前", event: "current与every year属于文中观察和年度概括，不能把旧文数字当成今天的离婚率，也不能换算出近期离婚原因比例。", evidence: [e(14, "the current divorce rate of nearly 50 percent", "当时的离婚率"), e(14, "every year", "年度口径")] },
  ],
  voices: [
    { speaker: "聚会上的丈夫", claim: "妻子在家话多，自己下班后沉默，需要妻子维持交流。", boundary: "个人家庭自述与当晚表现并不互相否定；不是作者说自己在家沉默。", evidence: [e(5, "She's the talker in our family", "家庭自述"), e(8, "I have nothing to say", "男子的解释")] },
    { speaker: "Riessman及其受访者", claim: "多数受访女性、只有少数男性把缺乏沟通列为离婚原因。", boundary: "是受访者的原因归属和性别对照，不是对全部离婚案例的随机统计，不能推出第28题B的50%因果比例。", evidence: [e(13, "most of the women she interviewed", "样本范围"), e(13, "but only a few of the men", "数量对比"), e(13, "gave lack of communication as the reason", "受访者的归因")] },
    { speaker: "作者的研究与概括", claim: "谈话模式的差异损害婚姻；主要抱怨与期待集中于沟通。", boundary: "most、often、few保留倾向和数量限制；作者没有说所有男女一律如此，也没有说具体不公平完全不存在。", evidence: [e(11, "is wreaking havoc with marriage", "作者判断"), e(16, "they focused on communication", "研究焦点"), e(18, "few husbands share this expectation", "期待差异")] },
    { speaker: "Hacker的早期观察", claim: "较早研究已注意到有关谈话模式，作者称自己的发现与其一致。", boundary: "人物与年代提供研究背景；文章主旨和紧接末段的话题都不是人物传记。", evidence: [e(12, "was observed by political scientist Andrew Hacker", "研究来源"), e(18, "as Hacker observed years before", "呼应早期观察")] },
  ],
};

export const passage2010P2BlockTranslations: string[][] = [
  [
    "我",
    "当时正在向……讲话",
    "一小群聚会者",
    "在弗吉尼亚州郊区一间客厅里",
    "也就是一个事先邀请了男性加入的女性团体"
  ],
  [
    "整个晚上",
    "一名男子",
    "一直是",
    "格外健谈的",
    "频繁发表看法、讲趣闻",
    "而他的妻子默默地坐在他旁边的沙发上"
  ],
  [
    "快到那天晚上结束时",
    "我",
    "谈到",
    "女性常常抱怨丈夫不与她们交谈"
  ],
  [
    "这位男子",
    "迅速地",
    "点了点头",
    "表示赞同"
  ],
  [
    "他",
    "做了个手势",
    "朝着妻子",
    "并且",
    "说道",
    "她是我们家爱说话的那个人"
  ],
  [
    "满屋的人",
    "突然爆发出",
    "笑声",
    "那位男子",
    "显得",
    "既困惑又委屈"
  ],
  [
    "这是真的",
    "他",
    "解释道"
  ],
  [
    "当我下班回家时",
    "我",
    "没有（have与nothing合起来表示没有）",
    "什么可说的内容"
  ],
  [
    "要是她不让谈话继续下去",
    "我们就会（we would的缩写）",
    "度过",
    "一整个晚上",
    "在沉默中"
  ],
  [
    "这个小插曲",
    "清楚地揭示了",
    "这样一种反差：美国男性在公开场合往往比女性话多，在家却常常话少"
  ],
  [
    "而且",
    "这种谈话模式",
    "正在造成",
    "严重破坏",
    "对婚姻关系"
  ],
  [
    "这种模式",
    "曾被观察到",
    "由政治学家安德鲁·哈克",
    "在20世纪70年代后期"
  ],
  [
    "社会学家凯瑟琳·科勒·里斯曼",
    "报告说",
    "在她的新书《Divorce Talk》中",
    "她访谈的大多数女性——但只有少数男性——把缺乏沟通列为离婚原因"
  ],
  [
    "鉴于目前接近50%的离婚率",
    "这种情况",
    "相当于",
    "数百万个案例",
    "在美国",
    "每年",
    "简直是一场沟通失败的流行病"
  ],
  [
    "在我自己的研究中",
    "女性对丈夫的抱怨",
    "最常",
    "集中",
    "并不是在具体不公平上，例如为丈夫放弃事业机会，或承担过多的日常生活事务"
  ],
  [
    "相反",
    "这些抱怨",
    "集中",
    "在沟通上",
    "他不听我说话"
  ],
  [
    "他",
    "不交谈",
    "与我"
  ],
  [
    "我",
    "发现",
    "正如哈克多年前观察到的",
    "多数妻子最希望丈夫成为交谈伙伴，但很少有丈夫对妻子抱有同样的期待"
  ],
  [
    "简言之",
    "最能体现当前危机的形象",
    "是",
    "那个常见的漫画场景：一名男子坐在早餐桌旁，报纸举在他脸前",
    "而一名女子瞪着报纸背面，想要交谈"
  ]
];
