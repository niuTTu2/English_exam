import type { PracticeTask, GrammarConceptId, ErrorCategory } from "./learning-model";

const choice = (id: string, prompt: string, options: string[], answer: number, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[answer], evidence, feedback, conceptId, errorType, ...extra });
const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType, ...extra });
const link = (id: string, prompt: string, pairs: Array<[string, string]>, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "link", prompt, links: pairs.map(([source, target]) => ({ source, target })), options: [...new Set(pairs.map(([, target]) => target))], answer: JSON.stringify(pairs.map(([, target]) => target)), evidence, feedback, conceptId, errorType, ...extra });
const order = (id: string, prompt: string, blocks: string[], distractors: string[], evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "order", prompt, options: [...blocks, ...distractors], answer: JSON.stringify(blocks), evidence, feedback, conceptId, errorType, ...extra });

export const passage2010P2Practice: Record<string, PracticeTask[]> = {
  "2010-p2-s1": [
    range("group-clause", "划出限定group的完整定语从句，含关系词that。", "that had invited men to join them", "that代替group并作had invited的主语；men是宾语，to join them说明邀请男性做什么，必须一起保留在从句里。", "clause-relative", "clause-boundary", { hintWords: ["that", "invite"], leaksToTaskIds: ["invitation-actors"] }),
    link("invitation-actors", "把邀请结构中的三组角色对应起来。", [["had invited的执行者", "女性团体group"], ["to join的执行者", "男性men"], ["them的所指", "女性团体group"]], "a women's group that had invited men to join them", "女性邀请男性加入她们；invite的宾语men也是to join的逻辑主语。不同动词不能机械共用最近的名词。", "nonfinite-subject", "reference", { hintWords: ["invite", "they"] }),
  ],
  "2010-p2-s2": [
    order("perfect-state", "拼出男子这半句的主系表，留下伴随动作和地点。", ["one man", "had been", "talkative"], ["frequently offering", "on the couch"], "one man had been particularly talkative", "had been后接形容词talkative，是过去完成时的主系表。offering在逗号后补充行为，没有构成had been offering。", "basic-svc", "predicate", { hintWords: ["have", "be", "talkative"] }),
    link("adverb-attachment", "把三个副词连到各自直接修饰的词。", [["particularly", "talkative"], ["frequently", "offering"], ["silently", "sat"]], "particularly talkative, frequently offering ideas and anecdotes, while his wife sat silently", "程度给形容词talkative，频率给offering，沉默状态给sat。先找被说明的词，再给状语名称。", "modifier-adverb", "attachment", { hintWords: ["particularly", "frequently", "silently"], leaksToTaskIds: ["public-contrast"] }),
    choice("public-contrast", "while在这句话里主要连接什么？", ["丈夫健谈与妻子沉默的对照", "妻子沉默导致丈夫失业", "过去与未来两次聚会"], 0, "while his wife sat silently beside him on the couch", "两人的表现同时发生并形成对照；这里用‘而’最清楚，不要机械把while全译成‘当……时’。", "negation-contrast", "passage-logic", { hintWords: ["while"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s3": [
    range("comment-content", "划出commented所接的完整内容，从第一个that开始。", "that women frequently complain that their husbands don't talk to them", "外层是我谈到什么；内层是女性抱怨什么。两个that各有自己的谓语，不能只截到complain。", "clause-object", "clause-boundary", { hintWords: ["that", "comment"], leaksToTaskIds: ["nested-that"] }),
    link("nested-that", "按从外到内的顺序，匹配两层内容与支配它的动词。", [["女性经常抱怨这一情况", "commented"], ["丈夫不和她们讲话这一内容", "complain"]], "I commented that women frequently complain that their husbands don't talk to them", "commented带第一层that从句，complain在其中再带第二层。引导词that本身不作这两个内容从句的主语。", "clause-object", "clause-boundary", { hintWords: ["that", "complain"], leaksToTaskIds: ["comment-content"] }),
  ],
  "2010-p2-s4": [
    { id: "finite-nodded", revision: 1, kind: "token", prompt: "点出本句承担过去时的谓语动词。", options: ["This", "man", "quickly", "nodded", "in", "agreement"], answer: "nodded", evidence: "quickly nodded in agreement", feedback: "nodded是动作和过去时；quickly说明速度，in agreement说明点头所表达的赞同，均不是另一个谓语。", conceptId: "finite-predicate", errorType: "predicate", hintWords: ["nod"] },
  ],
  "2010-p2-s5": [
    link("gesture-and-quote", "把三个片段分别连到它直接说明的动作或内容。", [["toward his wife", "gestured的方向"], ["She's the talker in our family", "said的引语"], ["in our family", "the talker的家庭范围"]], "He gestured toward his wife and said, \"She's the talker in our family.\"", "He共用gestured和said两个谓语；引语里She's是She is，the talker是表语。手势方向不是说话内容。", "modifier-prepositional", "attachment", { hintWords: ["toward", "say", "she"] }),
  ],
  "2010-p2-s6": [
    order("two-reactions", "按原顺序重建两组主谓关系，保留男子的表语。", ["The room", "burst into laughter", "the man", "looked", "puzzled and hurt"], ["looked at"], "The room burst into laughter; the man looked puzzled and hurt", "分号分开听众和男子的反应；The room借房间指听众。looked后是感受形容词，意为‘显得’，不是look at看某物。", "basic-svc", "predicate", { hintWords: ["room", "look", "puzzle", "hurt"] }),
  ],
  "2010-p2-s7": [
    link("quote-reference", "辨清引语里的It和引语外的he。", [["It", "妻子在家话多这一说法"], ["he", "正在解释的男子"]], "\"It's true,\" he explained", "It是一个说法，不是房间；he explained是作者的报道语。引语主系表与报道语主谓要分开。", "reference-pronoun", "reference", { hintWords: ["it", "he"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s8": [
    range("when-clause", "划出完整时间状语从句，含When。", "When I come home from work", "从句到work结束，后面的I have是新的主谓。男子用一般现在时说明平常回家的习惯，不是预告未来。", "clause-time", "clause-boundary", { hintWords: ["when", "come", "home"] }),
    choice("nothing-to-say", "to say在nothing后起什么作用？", ["修饰nothing，说明没有什么可说", "作come的目的，表示为了演讲而回家", "表示男子无法发音"], 0, "I have nothing to say", "to say后置修饰nothing：没有可说的内容。I仍是说话的逻辑主语，不能将‘没话说’扩大为生理上不会发声。", "nonfinite-infinitive", "attachment", { hintWords: ["nothing", "say", "to"] }),
  ],
  "2010-p2-s9": [
    range("if-condition", "划出与we'd spend对应的完整假设条件。", "If she didn't keep the conversation going", "If从句用过去式形式表达假设，we'd是we would。按丈夫的解释，现实中妻子确实在维持谈话，不是回忆一个她没有说话的晚上。", "clause-condition", "tense", { hintWords: ["if", "keep"], mapRevealsAnswer: true }),
    link("keep-object-complement", "把keep后面的两部分连到实际功能。", [["the conversation", "宾语：被维持的谈话"], ["going", "宾语补足语：继续进行的状态"]], "keep the conversation going", "keep A doing表示让A保持某种动作状态。going不是与didn't keep并列的限定谓语，也不是妻子离开。", "object-complement", "attachment", { hintWords: ["keep", "go", "conversation"] }),
  ],
  "2010-p2-s10": [
    order("outer-trunk", "先去掉irony的内容解释，重建外层主谓宾。", ["This episode", "crystallizes", "the irony"], ["American men", "talk less"], "This episode crystallizes the irony", "外层是插曲使反差清晰；talk属于里面的内容，不是This episode的谓语。", "basic-svo", "predicate", { hintWords: ["crystallize", "irony"] }),
    range("content-clause", "划出完整的同位语从句，含that及其中的让步部分。", "that although American men tend to talk more than women in public situations, they often talk less at home", "that解释irony是什么，内部先有although让步，再有they talk这一主要陈述；不能把although从句当作与that从句无关的平行层。", "apposition", "clause-boundary", { hintWords: ["that", "although"], leaksToTaskIds: ["irony-content"] }),
    choice("irony-content", "这句所说的反差是哪一种？", ["男性在公开场合话较多，在家常话较少", "所有男性始终比所有女性话少", "作者认为男性从来不说话"], 0, "they often talk less at home", "they仍指American men；tend与often限定一般倾向，less是较少，不是绝对沉默。", "comparison-scope", "passage-logic", { hintWords: ["they", "less", "often"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2010-p2-map", taskId: "opening-contrast" }] }),
  ],
  "2010-p2-s11": [
    choice("havoc-direction", "havoc让‘影响婚姻’具有怎样的方向和程度？", ["强烈负面损害", "不分好坏的一般影响", "积极提供动力"], 0, "is wreaking havoc with marriage", "havoc表示严重破坏，wreak havoc with整体是对……造成严重损害；不能只记成中性的have an influence。", "lexical-context", "vocabulary", { hintWords: ["havoc", "wreak"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s12": [
    order("passive-trunk", "保留主语和被动谓语，暂时去掉观察者与时间。", ["The pattern", "was observed"], ["by political scientist Andrew Hacker", "in the late 1970s"], "The pattern was observed", "模式是被观察的对象，was observed是被动谓语；by短语引出观察者，in短语限定观察时间。", "passive-voice", "predicate", { hintWords: ["observe", "by"] }),
  ],
  "2010-p2-s13": [
    range("interview-relative", "划出修饰women的定语从句，只选原文实际出现的词。", "she interviewed", "she是Riessman，interviewed是谓语；宾语关系词whom/that被省略，回指women。不能把she当成受访女性。", "clause-relative", "clause-boundary", { hintWords: ["she", "interview"] }),
    link("give-as", "把gave A as B中的A、B连到句法作用。", [["lack of communication", "宾语：被列出的原因内容"], ["as the reason for their divorces", "补足说明：将它列作什么"]], "gave lack of communication as the reason for their divorces", "这里give不是把实物递给某人；受访者把沟通不足列为离婚原因。归因报告不自动证明所有离婚只有这一原因。", "object-complement", "collocation", { hintWords: ["give", "as", "reason"] }),
    choice("sample-contrast", "most与only a few比较的是哪些人？", ["受访女性与受访男性中这样归因的人", "全部美国女性与全部美国男性", "近期所有离婚案件的原因比例"], 0, "most of the women she interviewed – but only a few of the men –", "范围是访谈中的男女，不是总体男女，也没有提供样本量来推出原因在所有离婚中的百分比。", "comparison-scope", "option-logic", { hintWords: ["most", "few", "interview"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s14": [
    range("given-premise", "划出Given引出的完整前提，停止在第一个逗号之前。", "Given the current divorce rate of nearly 50 percent", "Given后接名词短语，意为鉴于；这里没有主谓组合，不是given up的完成式，也不是完整条件从句。", "modifier-prepositional", "clause-boundary", { hintWords: ["given", "give"], leaksToTaskIds: ["rate-denominator"] }),
    choice("rate-denominator", "nearly 50 percent在原句中限定哪项指标？", ["总体离婚率", "离婚案件中由沟通失败造成的比例", "受访男性中愿意交谈的比例"], 0, "the current divorce rate of nearly 50 percent", "50%直接跟在divorce rate后，限定的是离婚率；没有说50%的离婚由沟通失败造成。改变统计对象就改变了命题。", "comparison-scope", "option-logic", { hintWords: ["rate", "percent"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s15": [
    range("complaint-subject", "划出focused的完整主语，含来源和对象修饰。", "complaints from women about their husbands", "中心是complaints；from women说明谁抱怨，about their husbands说明抱怨谁。离focused近的husbands不是主语。", "subject-head", "subject", { hintWords: ["complaint", "from", "about"] }),
    order("negated-focus", "用词块重建主要判断，保留否定；把举例留在词块池里。", ["complaints", "focused", "not on tangible inequities"], ["having given up", "doing far more"], "focused not on tangible inequities", "主句谓语只有focused；not否定主要关注点在具体不公平，而非否认这些不公平存在。第16句Instead再给出真正重点。", "negation-contrast", "passage-logic", { hintWords: ["not", "focus", "tangible", "inequity"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2010-p2-map", taskId: "research-focus" }, { sentenceId: "2010-p2-s16", taskId: "instead-reference" }] }),
    link("nested-examples", "把目的、替代和举例关系接回正确对象。", [["to accompany a husband to his", "说明放弃机会的目的"], ["to his中的his", "丈夫的career"], ["like cleaning, cooking and social arrangements", "第二个例子中的daily life-support work"]], "having given up the chance for a career to accompany a husband to his, or doing far more than their share of daily life-support work like cleaning, cooking and social arrangements", "such as下有放弃事业和多做事务两大例子；like的小例子只在第二项里。having given up是完成式非谓语，to accompany表示目的，执行者是女性。", "nonfinite-subject", "attachment", { hintWords: ["his", "like", "accompany", "give"] }),
  ],
  "2010-p2-s16": [
    link("instead-reference", "把衔接和指代关系接回原文。", [["they", "上一句的complaints"], ["Instead", "由具体不公转到沟通焦点"], ["He doesn't listen to me", "不被倾听这一沟通抱怨的例子"]], "Instead, they focused on communication", "原句主语承接complaints，中文可以说她们抱怨的重点。Instead是纠正关注方向，引语举例，不是给整段重新增加一个主语。", "reference-pronoun", "reference", { hintWords: ["they", "instead"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2010-p2-map", taskId: "research-focus" }, { sentenceId: "2010-p2-s15", taskId: "negated-focus" }] }),
  ],
  "2010-p2-s17": [
    choice("talk-to", "to me中的to是什么？", ["引出交谈对象的介词", "后接动词原形的不定式标记", "一般将来时标记"], 0, "talk to me", "me是代词宾格，接在介词to后；to talk才是不定式。talk to somebody不能因为看到to就按不定式分析。", "modifier-prepositional", "collocation", { hintWords: ["to", "talk"] }),
  ],
  "2010-p2-s18": [
    order("reported-contrast", "略去插入语，保留外层报告及内部的两组对照。", ["I found", "that most wives want their husbands to be conversational partners", "but few husbands share this expectation"], ["as Hacker observed years before"], "that most wives want their husbands to be, first and foremost, conversational partners, but few husbands share this expectation", "外层是I found；that的内容里用but连接妻子和丈夫的期待。as从句是插入评注，不是found的宾语，也不让but跳出报告内容。", "clause-object", "clause-boundary", { hintWords: ["as", "that", "but"], leaksToTaskIds: ["want-complement"] }),
    link("want-complement", "把希望者、被期待者和角色对应起来。", [["want的主语", "most wives"], ["to be的逻辑主语", "their husbands"], ["conversational partners", "to be后的表语角色"]], "most wives want their husbands to be, first and foremost, conversational partners", "want somebody to be…中somebody既是want的宾语，又是to be的逻辑主语；不要把成为交谈伙伴的角色挂回wives。", "object-complement", "attachment", { hintWords: ["want", "partner"], leaksToTaskIds: ["reported-contrast"] }),
    choice("few-and-first", "first and foremost与few分别保留什么限制？", ["首要但非唯一；丈夫中很少有人", "唯一要求；全部丈夫", "最后考虑；多数丈夫"], 0, "first and foremost, conversational partners, but few husbands", "first and foremost给优先顺序，不是only；few有数量上的否定倾向，不等于a few的‘有一些’。", "comparison-scope", "option-logic", { hintWords: ["first", "foremost", "few"], mapRevealsAnswer: true }),
  ],
  "2010-p2-s19": [
    range("image-subject", "划出主句is的完整主语，包含定语从句。", "the image that best represents the current crisis", "主语中心是image，that从句修饰它；represents在从句内部，外层主句谓语是is，后接漫画场景作表语。", "subject-head", "subject", { hintWords: ["image", "that", "represent"] }),
    link("scene-actors", "分别确定三个非谓语所说明的人或物。", [["sitting at the breakfast table", "a man"], ["held up in front of his face", "a newspaper"], ["wanting to talk", "a woman"]], "a man sitting at the breakfast table with a newspaper held up in front of his face, while a woman glares at the back of it, wanting to talk", "sitting修饰男子，with结构中的held up补充报纸状态，wanting的逻辑主语是女子。it也是报纸，不是男子的脸。", "nonfinite-subject", "attachment", { hintWords: ["sit", "hold", "want", "it"], mapRevealsAnswer: true }),
  ],
};
