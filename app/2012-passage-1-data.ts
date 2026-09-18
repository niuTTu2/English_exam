import type { Question } from "./data";
import { upgradePassage2012P1Sentence } from "./2012-passage-1-reading";
import { passage2012P1Reasoning } from "./2012-passage-1-evidence";
import { passage2012P1QuestionAnalysis } from "./2012-passage-1-question-analysis";
import { sentenceFactory, segment, clause } from "./2011-content-helpers";
const sentence = sentenceFactory("2012-p1");
const passage2012P1SentenceDrafts = [
  sentence(1, [
    segment("Homework has never been terribly popular with students and even many parents, ", "predicate", "主语加现在完成时系表结构", "第一分句", "评价作业受欢迎程度", "never否定一直以来的受欢迎程度，terribly加强popular；even把家长包括进来。"),
    segment("but in recent years ", "connector", "转折连词加时间介词短语", "转折与时间状语", "限定后面被鄙视的时期", "but将不太受欢迎推进到更强烈的鄙视，不是态度转好。"),
    segment("it has been particularly scorned.", "predicate", "主语加现在完成时被动", "第二分句", "it回指homework", "particularly说明程度突出；scorned是被轻视、鄙视，不是普通的缺少喜爱。"),
  ], "Homework has never been popular with students and even many parents, but it has been scorned.", "家庭作业从未很受学生甚至许多家长欢迎，但近年来尤其受到鄙视。", "家庭作业向来不怎么讨学生、甚至不少家长的喜欢，近些年更是备受轻视。", "介绍作业面临更强批评的背景，定位21题；并非说所有课程都已取消作业。", ["popular with students", "in recent years"]),
  sentence(2, [
    segment("School districts across the country, ", "subject", "名词短语加地域介词定语", "主语", "are revising的施事", "across the country限定全美各学区，不能把district译成学生宿舍。"),
    segment("most recently Los Angeles Unified, ", "modifier", "省略表达的插入举例", "补充列举", "说明school districts中的最新一例", "省略重复的school district，Los Angeles Unified是洛杉矶联合学区名称。"),
    segment("are revising their thinking on this educational ritual.", "predicate", "现在进行时及物结构", "谓语及宾语", "说明各学区正在做什么", "their指学区，on引思考对象；ritual把作业比作惯常执行的教育程序。"),
  ], "School districts are revising their thinking.", "全国各学区，最近的一例是洛杉矶联合学区，正在修正它们对这一教育惯例的看法。", "全美各学区都在重新思考布置作业这项教育惯例，最近采取行动的是洛杉矶联合学区。", "从普遍态度收束到本文要评议的具体政策。", ["thinking on this educational ritual"]),
  sentence(3, [
    segment("Unfortunately, L.A. Unified has produced an inflexible policy ", "predicate", "评注副词加主谓宾", "主句", "评价并介绍政策", "Unfortunately直接表明负面态度；inflexible是僵化，非执行严格的同义褒义。"),
    segment("which mandates ", "modifier", "关系代词加谓语", "定语从句起点", "which回指policy", "mandates是政策强制规定，其内容由that从句补充。"),
    segment("that with the exception of some advanced courses, ", "modifier", "that宾语从句引导部分加例外介词结构", "宾语从句与范围限定", "限定homework计分规则", "except范围为某些高级课程，并不等于高级课程没有作业。"),
    segment("homework may no longer count for more than 10% of a student's academic grade.", "object", "情态动词加否定及比例表达", "宾语从句主体", "规定作业在总成绩中的权重", "no longer表示不再；more than 10%是被禁止超过的上限，不是规定恰好10%。"),
  ], "L.A. Unified has produced an inflexible policy.", "不幸的是，洛杉矶联合学区制定了一项僵化政策，规定除某些高级课程外，作业在学生学业成绩中所占比例不得再超过10%。", "遗憾的是，洛杉矶联合学区出台了一个僵硬规定：除部分高级课程外，家庭作业计入总成绩的比重不得超过10%。", "明确政策内容和作者立场；10%限制的是成绩权重，不是作业量。", ["with the exception of", "no longer", "count for more than 10%"], [
    clause("which mandates that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "定语从句", "which", "修饰policy", "which", "mandates", "that引导的规定内容", "先译政策，再译它规定什么。"),
    clause("that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "宾语从句", "that", "作mandates宾语", "homework", "may no longer count", "for more than 10% of a student's academic grade为比例补足", "先放置例外范围，再译作业计分不得超过上限。"),
  ]),
  sentence(4, [
    segment("This rule is meant to address the difficulty ", "predicate", "主句含be meant to不定式", "主句", "说明规则的意图", "be meant to表示旨在，address是处理问题，不是地址或发表演说。"),
    segment("that students from impoverished or chaotic homes might have ", "modifier", "that定语从句", "定语", "修饰difficulty", "that是have的宾语，students为主语；家庭经济贫困或生活混乱，不是学生能力差。"),
    segment("in completing their homework.", "modifier", "in加动名词", "困难所涉事项", "与have difficulty构成搭配", "complete指完成作业，their回指这些学生；might保留可能性。"),
  ], "This rule is meant to address the difficulty.", "这条规则旨在处理贫困或生活混乱家庭的学生完成作业时可能遇到的困难。", "制定这项规定，是想帮助来自贫困或混乱家庭的学生应对可能难以完成作业的问题。", "承认政策初衷，对应22题；后文批评实现方式而非否认困难。", ["is meant to address", "difficulty that students from impoverished or chaotic homes might have in completing their homework"], [clause("that students from impoverished or chaotic homes might have in completing their homework", "定语从句", "that", "修饰difficulty", "students from impoverished or chaotic homes", "might have", "that指difficulty；in completing their homework说明困难领域", "把that还原为他们完成作业可能遇到的困难。")]),
  sentence(5, [segment("But the policy ", "subject", "转折连词加名词", "主语与衔接", "is的主语", "But由善意初衷转向政策缺陷。"), segment("is unclear and contradictory.", "predicate", "系动词加并列形容词", "系表结构", "评价policy", "unclear为模糊，contradictory为自相矛盾，两者都是明确批评。")], "the policy is unclear and contradictory.", "但是，这项政策模糊而且矛盾。", "但这项政策既含糊，又自相矛盾。", "直接提出第二段的评议中心。", []),
  sentence(6, [
    segment("Certainly, no homework should be assigned ", "predicate", "评注副词加否定情态被动", "主句", "说明不应布置哪类作业", "no否定homework，后面的两个定语从句共同限定被禁止的作业。"),
    segment("that students cannot complete on their own ", "modifier", "后置that定语从句", "定语", "修饰前面的homework", "从句隔着谓语后置；that作complete宾语，on their own表示独立完成。"),
    segment("or that they cannot do without expensive equipment.", "modifier", "or连接的并列定语从句", "定语", "同样修饰homework", "cannot do without表示没有昂贵设备就做不了，而不是作业应完全不使用设备。"),
  ], "no homework should be assigned.", "当然，不应布置学生无法独立完成或没有昂贵设备就无法做的作业。", "当然，不能给学生布置他们独立做不来、或必须依靠昂贵设备才能完成的作业。", "提出合理限制，承认公平问题；不能截去定语得出作者主张一律不布置作业。", ["on their own", "cannot do without expensive equipment"], [clause("that students cannot complete on their own", "定语从句", "that", "后置修饰homework", "students", "cannot complete", "that作宾语；on their own为方式状语", "译为不能独立完成的作业。"), clause("that they cannot do without expensive equipment", "定语从句", "that", "与前从句并列修饰homework", "they", "cannot do", "that作宾语；without expensive equipment为条件", "译为不靠昂贵设备就无法完成的作业。")]),
  sentence(7, [
    segment("But if the district is essentially giving a pass to students ", "condition", "if条件从句主谓宾部分", "条件状语", "限定主句is going的前提", "give a pass此处为放过、免于追究，不是发放通行证或直接给及格分。"),
    segment("who do not do their homework because of complicated family lives, ", "modifier", "who定语从句含原因介词短语", "定语", "修饰students", "第一个do为助动词，第二个do为完成；because of后是名词短语而非从句。"),
    segment("it is going riskily close to the implication ", "predicate", "主句现在进行时加程度副词", "主句", "说明学区政策接近的危险含义", "it回指district；close to表示接近某种立场，不是空间路线。"),
    segment("that standards need to be lowered for poor children.", "modifier", "that同位语从句", "内容说明", "解释implication的具体内容", "standards为主语，need to be lowered为需要被降低；that不充当从句成分。"),
  ], "it is going close to the implication.", "但如果学区实际上放过那些因家庭生活复杂而不做作业的学生，它就危险地接近这样一种含义：穷孩子的标准需要降低。", "但如果因为家庭情况复杂就允许学生不做作业，这项政策就很容易滑向一种危险暗示：对贫困儿童应当降低要求。", "批评把体谅困难变成降低教育标准，区分贫困与能力。", ["giving a pass to students", "because of complicated family lives", "close to the implication"], [
    clause("if the district is essentially giving a pass to students who do not do their homework because of complicated family lives", "条件状语从句", "if", "限定主句所批评的情形", "the district", "is giving", "a pass；to students为接受对象", "先译如果学区放过某类学生，再译危险后果。"),
    clause("who do not do their homework because of complicated family lives", "定语从句", "who", "修饰students", "who", "do not do", "their homework；because of短语为原因", "先说明因家庭复杂而不做作业的学生。"),
    clause("that standards need to be lowered for poor children", "同位语从句", "that", "解释implication内容", "standards", "need to be lowered", "for poor children为适用对象", "译为对贫困儿童需要降低标准这一暗示。"),
  ]),
  sentence(8, [
    segment("District administrators say ", "predicate", "主谓结构", "第一主句", "说明观点来源", "管理者是说法的提出者，不是作者直接赞同。"),
    segment("that homework will still be a part of schooling; ", "object", "that宾语从句", "say的宾语", "叙述管理者的承诺", "still表仍然；schooling是学校教育，不限于分数。"),
    segment("teachers are allowed to assign ", "predicate", "分号连接的被动主句", "第二主句", "说明教师被允许的行为", "are allowed to表示许可，不等于被迫必须布置很多。"),
    segment("as much of it as they want.", "object", "as much ... as比较数量结构", "assign的宾语", "限定可以布置的作业量", "it回指不可数homework；后一个as引比较从句，want后省略重复宾语。"),
  ], "District administrators say that homework will still be a part of schooling; teachers are allowed to assign as much of it as they want.", "学区管理人员说，作业仍将是学校教育的一部分；教师可以想布置多少就布置多少。", "学区管理者表示，家庭作业仍是学校教育的一环，教师想布置多少都可以。", "转述政策辩护，为下句揭示低权重削弱执行效果作铺垫。", ["a part of schooling", "are allowed to assign", "as much of it as they want"], [clause("that homework will still be a part of schooling", "宾语从句", "that", "作say宾语", "homework", "will still be", "a part of schooling为表语", "译清这是管理者说的内容。"), clause("as they want", "比较从句（宾语省略）", "as", "确定as much的数量范围", "they", "want", "省略想要布置的作业数量", "译为教师想布置多少就可以布置多少。")]),
  sentence(9, [
    segment("But with homework counting for no more than 10% of their grades, ", "condition", "with名词加现在分词独立结构", "背景状语", "为students的行为提供计分条件", "homework是counting的逻辑主语；no more than为不超过，非不少于。"),
    segment("students can easily skip half their homework ", "predicate", "主语加情态谓语和宾语", "主句第一谓语", "说明低权重下的选择", "skip为不做，half说明省掉一半，不是全部作业。"),
    segment("and see very little difference on their report cards.", "connector", "and并列谓语", "主句第二谓语", "与skip共用students和can", "very little表示差别极小，report cards为成绩单，不是新闻报告卡片。"),
  ], "students can skip half their homework and see very little difference.", "但由于作业在成绩中只占不超过10%，学生可以轻松少做一半作业，而成绩单上看不出多大差别。", "然而，既然作业所占比重最多只有10%，学生即使少做一半，成绩单也几乎不会有变化。", "具体说明做作业的动力受削弱，是23题D最直接的依据。", ["no more than 10%", "skip half their homework", "report cards"]),
  sentence(10, [
    segment("Some students might do well on state tests without completing their homework, ", "predicate", "主句情态谓语加方式条件状语", "让步性事实陈述", "仅讨论部分学生", "some与might都限制断言范围；without doing说明未完成作业的条件。"),
    segment("but what about the students ", "connector", "转折加what about省略问句", "反问", "转向另一类学生", "what about提出应考虑的另一人群，未在原文补出主谓。"),
    segment("who performed well on the tests and did their homework?", "modifier", "who定语从句含并列谓语", "定语", "修饰后一个students", "performed和did共同以who为主语，指考得好且做了作业的人。"),
  ], "Some students might do well on state tests, but what about the students?", "有些学生不完成作业也可能在州统考中取得好成绩，但那些考试表现好而且做了作业的学生又如何呢？", "一些学生或许不做完作业也能考好州统考；可对于既考得好、又认真完成了作业的学生，该怎么解释呢？", "指出不能拿少数人不做作业也考好，证明作业对所有人都无益。", ["do well on state tests", "what about the students"], [clause("who performed well on the tests and did their homework", "定语从句", "who", "修饰第二类students", "who", "performed / did", "on the tests为领域；their homework为did宾语", "译为考试表现好并且做作业的学生。")]),
  sentence(11, [segment("It is quite possible ", "predicate", "形式主语加系表评价", "主句", "评价后面命题的可能性", "It为形式主语，quite加强possible但不使可能变成必然。"), segment("that the homework helped.", "subject", "that主语从句后置", "真正主语", "说明什么事情可能", "helped省略可由上下文理解的受益者，指作业帮助了这些学生。")], "It is possible that the homework helped.", "作业起了帮助作用，这是很有可能的。", "这些学生考得好，很可能就有作业的功劳。", "提出合理解释而非证明严格因果；保留possible。", [], [clause("that the homework helped", "后置主语从句", "that", "对应形式主语It", "the homework", "helped", "未明示宾语，语境指学生学习", "先译作业有帮助，再带上很可能的评价。")]),
  sentence(12, [
    segment("Yet rather than empowering teachers to find ", "connector", "转折加rather than动名词结构", "对照状语", "对比政策本可采取的方式", "empower A to do是赋予A做事的权力，而非替教师做决定。"),
    segment("what works best for their students, ", "object", "what融合关系结构", "find的宾语", "表示最适合学生的做法", "what在内部作主语，works表示起作用；best修饰works。"),
    segment("the policy imposes a flat, across-the-board rule.", "predicate", "主谓宾", "主句", "说明政策实际做法", "flat和across-the-board共同强调统一僵化，不考虑差别。"),
  ], "the policy imposes a flat, across-the-board rule.", "然而，这项政策没有赋权教师寻找最适合学生的做法，而是强加一条一律适用的僵硬规定。", "可这项政策并未让教师自行判断什么最有益于学生，反而强推了一刀切的规定。", "批评限制专业判断；23题C泛称整个教育权力范围过大，D才直接对应作业激励问题。", ["rather than empowering teachers", "what works best for their students", "across-the-board rule"], [clause("what works best for their students", "融合关系名词性从句", "what", "作find宾语，相当于最有效的做法", "what", "works", "best为程度；for their students为受益对象", "译为对学生最奏效的做法，不译成直接问句。")]),
  sentence(13, [segment("At the same time, ", "connector", "时间介词短语用于篇章衔接", "补充论点", "连接对同一政策的另一批评", "此处相当于与此同时、此外，不是要求两个事件精确同时发生。"), segment("the policy addresses none of the truly thorny questions about homework.", "predicate", "主谓宾", "主句", "指出政策未处理的问题", "none否定所指棘手问题中的任何一个；thorny比喻难办，不指植物带刺。")], "the policy addresses none of the questions.", "与此同时，这项政策没有处理关于作业的任何真正棘手的问题。", "与此同时，关于家庭作业那些真正难解决的问题，这项政策一个也没回答。", "总领第四段关于教育价值、质量和教师负担的质疑。", ["At the same time", "thorny questions"]),
  sentence(14, [
    segment("If the district finds homework to be unimportant to its students' academic achievement, ", "condition", "if条件从句含复合宾语", "条件状语", "为should move提供假设", "find A to be B为认定A具有B性质；不是作者已认定作业无用。"),
    segment("it should move to reduce or eliminate the assignments, ", "predicate", "主句含情态动词及目的不定式", "主句正面建议", "it指学区", "move to do为着手采取行动；reduce与eliminate分别为减少和取消。"),
    segment("not make them count for almost nothing.", "connector", "否定并列动词结构", "排除另一做法", "与reduce or eliminate对照", "make them count为使作业计入，nothing指几乎零权重，不是作业内容空白。"),
  ], "it should move to reduce or eliminate the assignments, not make them count for almost nothing.", "如果学区认为作业对学生学业成就不重要，就应着手减少或取消作业，而不是让作业在成绩中几乎不占分量。", "如果作业对学习成效真不重要，学区就该少布置甚至不布置，而不是保留作业却让它几乎不计分。", "第一种条件分支：教育价值低则减量，不等于无条件支持取消作业。", ["finds homework to be unimportant", "count for almost nothing"], [clause("If the district finds homework to be unimportant to its students' academic achievement", "条件状语从句", "If", "限定主句建议成立的前提", "the district", "finds", "homework为宾语；to be unimportant为宾补", "先译如果认定无益，再译应采取的做法。")]),
  sentence(15, [segment("Conversely, if homework matters, ", "condition", "对照副词加if条件从句", "另一种假设", "与上句不重要的条件相对", "matter是不及物动词有重要性，不是名词事情。"), segment("it should account for a significant portion of the grade.", "predicate", "主句情态谓语", "主句建议", "it回指homework", "account for在比例结构中是占据，而非解释原因；significant为相当大的。")], "it should account for a significant portion of the grade.", "反过来，如果作业重要，它就应在成绩中占相当大的比重。", "反之，若作业确实有益，就应该让它在总成绩中占有足够分量。", "与上句构成完整两分论证，核心是作业对教育的价值，定位24题B。", ["account for a significant portion"], [clause("if homework matters", "条件状语从句", "if", "限定作业应占较大比重的前提", "homework", "matters", "不及物动词，无宾语", "先译如果重要，再译计分权重应该体现。")]),
  sentence(16, [
    segment("Meanwhile, this policy does nothing to ensure ", "predicate", "主谓宾加不定式目的", "主句", "指出另一缺口", "does nothing to ensure为没有做任何事来确保，不是已经确保反面命题。"),
    segment("that the homework students receive is meaningful or appropriate to their age and the subject, ", "object", "that宾语从句内嵌定语从句", "ensure的第一个宾语", "说明应该确保的作业质量", "students receive修饰homework；is的主语仍是homework；appropriate to连接年龄和学科。"),
    segment("or that teachers are not assigning more ", "object", "or并列第二个that从句", "ensure的第二个宾语", "说明作业量应受的约束", "not否定超过承受范围的布置量，而非不准布置。"),
    segment("than they are willing to review and correct.", "modifier", "than比较从句", "比较标准", "限定more的范围", "they指teachers；review与correct是并列不定式动词，省略已知的作业宾语。"),
  ], "this policy does nothing to ensure that the homework is meaningful or appropriate to their age and the subject, or that teachers are not assigning more than they are willing to review and correct.", "同时，这项政策没有采取措施确保学生收到的作业有意义或适合其年龄和学科，也未确保教师不会布置超出其愿意检查和批改数量的作业。", "而且，政策既不保证作业有意义、适合学生年龄和所学科目，也不保证教师布置的作业量在其愿意检查批改的范围内。", "把价值问题落实为作业质量和可批改的数量，不能把愿意批改偷换为实际能力。", ["does nothing to ensure", "appropriate to their age and the subject", "are willing to review and correct"], [
    clause("that the homework students receive is meaningful or appropriate to their age and the subject", "宾语从句", "that", "作ensure的第一个宾语", "the homework students receive", "is", "meaningful or appropriate ...为表语", "先找homework is，再嵌入学生收到的限定。"),
    clause("students receive", "省略宾语关系代词的定语从句", "省略that/which", "修饰homework", "students", "receive", "省略的关系代词指homework", "译为学生收到的作业。"),
    clause("that teachers are not assigning more than they are willing to review and correct", "宾语从句", "that", "作ensure的第二个宾语", "teachers", "are not assigning", "more（homework省略）", "译清确保教师不布置超量作业，而非确定教师目前必然超量。"),
    clause("than they are willing to review and correct", "比较从句", "than", "作为more的比较标准", "they", "are willing", "to review and correct为不定式补足，宾语省略", "译为超过他们愿意检查批改的数量。"),
  ]),
  sentence(17, [
    segment("The homework rules should be put on hold ", "predicate", "主语加情态被动", "主句建议", "说明规则应先暂停", "put on hold是暂缓，不是永久废除。"),
    segment("while the school board, ", "condition", "while时间从句起点", "时间状语", "说明暂缓期间应做什么", "while为在……期间，不是此处的让步尽管。"),
    segment("which is responsible for setting educational policy, ", "modifier", "which非限制性定语从句", "插入说明", "修饰school board", "which以单数指学校董事会，for后接动名词setting。"),
    segment("looks into the matter and conducts public hearings.", "predicate", "时间从句中的并列谓语", "从句谓语", "共用school board主语", "looks into为调查，conducts为举行；hearings为正式听证会，不是听觉。"),
  ], "The homework rules should be put on hold.", "这些作业规定应暂缓执行，在此期间负责制定教育政策的学校董事会应调查此事并举行公开听证。", "应该先暂停这些作业规定，让负责制定教育政策的学校董事会调查清楚，并举行公开听证会。", "提出有条件暂缓和调查的改进方案，非否定全部教育管理。", ["be put on hold", "is responsible for setting educational policy", "looks into the matter", "conducts public hearings"], [clause("while the school board, which is responsible for setting educational policy, looks into the matter and conducts public hearings", "时间状语从句", "while", "说明暂缓规则的期间", "the school board", "looks into / conducts", "the matter / public hearings", "先译暂停规则，再译董事会调查和听证的安排。"), clause("which is responsible for setting educational policy", "非限制性定语从句", "which", "补充school board的职责", "which", "is", "responsible for setting educational policy为表语", "作为学校董事会后的职责说明插入译文。")]),
  sentence(18, [segment("It is not too late ", "predicate", "形式主语加否定系表结构", "主句", "评价行动时机", "not too late意味着仍然来得及，不是已经太迟。"), segment("for L.A. Unified to do homework right.", "subject", "for逻辑主语加不定式", "真正主语", "说明谁采取什么行动", "right为副词正确地；do homework在语境中兼有认真研究作业政策的双关。")], "It is not too late for L.A. Unified to do homework right.", "对洛杉矶联合学区来说，正确处理家庭作业还不算太晚。", "洛杉矶联合学区现在把作业这件事做好，还来得及。", "批评中保留改正空间，以作业的双关收束全文。", ["not too late", "do homework right"]),
];
export const passage2012P1Sentences = passage2012P1SentenceDrafts.map(upgradePassage2012P1Sentence);
const question = (number: number, sentenceNumber: number, prompt: string, options: string[], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question => ({ id: 201200 + number, number, sentenceId: `2012-p1-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: "ABCD"[index] as Question["answer"], text })), answer, locating, explanations, reasoning: passage2012P1Reasoning[number], analysis: passage2012P1QuestionAnalysis[number] });
export const passage2012P1Questions = [
  question(21, 1, "It is implied in Paragraph 1 that nowadays homework____.", ["is receiving more criticism", "is gaining more preferences", "is no longer an educational ritual", "is not required for advanced courses"], "A", "首句由从未很受欢迎进一步转向近年particularly scorned，说明遭受更多负面评价。", { A: "more criticism概括近年尤其受到轻视的态度变化。", B: "更多喜爱与particularly scorned相反。", C: "第二句仍把作业称为educational ritual，重新思考不等于惯例已消失。", D: "高级课程是10%计分上限的例外，不是没有作业要求。" }),
  question(22, 4, "L.A. Unified has made the rule about homework mainly because poor students ____.", ["tend to have moderate expectations for their education", "have asked for a different educational standard", "may have problems finishing their homework", "have voiced their complaints about homework"], "C", "第二段首句明确说规则旨在解决贫困或混乱家庭学生完成作业可能遇到的困难。", { A: "原文没有贫困学生降低教育期望的描述。", B: "降低标准是作者警惕的政策含义，不是学生提出的要求。", C: "may have problems finishing对应might have difficulty in completing，保留可能性。", D: "首段一般态度不证明贫困学生曾投诉，更非政策的直接依据。" }),
  question(23, 9, "According to Paragraph 3, one problem with the policy is that it may____.", ["result in students' indifference to their report cards", "undermine the authority of state tests", "restrict teachers' power in education", "discourage students from doing homework"], "D", "第3段以作业最多占10%、少做一半几乎不影响成绩的因果链，指出做作业的激励被削弱；核验参考解析取D。", { A: "成绩差别小不等于学生不在乎成绩单，恰可能因在乎成绩而计算代价。", B: "州统考被用于讨论作业效果，没有说政策削弱考试权威。", C: "末句确实批评一刀切限制教师判断，但本项把具体作业决策泛化为整个教育权力；相较之下D直接对应段内明确的激励后果。", D: "少做作业几乎不损失成绩，会降低完成作业的动力，是原文直接展示的问题。" }),
  question(24, 15, "As mentioned in Paragraph 4, a key question unanswered about homework is whether____.", ["it should be eliminated", "it counts much in schooling", "it places extra burdens on teachers", "it is important for grades"], "B", "第4段以If ... unimportant和Conversely, if homework matters对照，先要判断作业对学业教育是否真正重要，再决定作业量和权重。", { A: "是否取消只是认定作业无教育价值后的一个条件性后果，不是更根本的问题。", B: "counts much in schooling意为在学校教育中是否重要，概括两个条件分支的共同前提。", C: "教师批改负担是后面的质量与数量问题，不能替代本段首要的教育价值判断。", D: "计分权重已由政策规定；作者追问的是教育意义，而非作业是否会影响分数这一事实。" }),
  question(25, 18, "A suitable title for this text could be____.", ["A Faulty Approach to Homework", "A Welcomed Policy for Poor Students", "Thorny Questions about Homework", "Wrong Interpretations of an Educational Policy"], "A", "全文围绕洛杉矶联合学区作业政策的僵化、自相矛盾与未解决的问题展开，最后建议暂停并改正。", { A: "Faulty Approach准确概括作者对具体作业处理方式的批评。", B: "政策初衷照顾贫困学生，不等于作者认为它广受欢迎；评价方向相反。", C: "棘手问题只是支撑政策批评的一段，遗漏全文针对具体政策的中心。", D: "作者批评政策本身，不是在纠正公众对政策的误解。" }),
];
