import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2012P1Practice } from "./2012-passage-1-practice";

type Part = { component: BeginnerSyntaxComponent; color: SyntaxVisualRole; chinese: string };
const c = (text: string, color: SyntaxVisualRole, form: string, fn: string, modifies: string, explanation: string, chinese: string, children?: BeginnerSyntaxComponent[]): Part => ({ component: { text, form, function: fn, modifies, explanation, children }, color, chinese });
const child = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const cl = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, details: Array<[string, string]>, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails: details.map(([fn, value]) => ({ function: fn, text: value })), translationOrder });
type Review = { parts: Part[]; clauses: BeginnerClauseDetail[]; focus: string; question: string; evidence: string; answer: string; notes?: string[] };

// 每项边界、关系与中文对译均按本篇实际原文人工编写，不从关键词推断句法。
const reviewed: Record<number, Review> = {
  1: {
    parts: [
      c("Homework", "subject", "不可数名词", "第一分句主语", "has been的主语", "作业是被评价受欢迎程度的对象。", "家庭作业"),
      c("has never been", "predicate", "现在完成时的否定系动词", "第一分句谓语", "连接Homework与popular", "never否定截至文中现在的一贯情况；been后接形容词，不是这里的被动。", "向来都不曾是"),
      c("terribly popular with students and even many parents", "complement", "形容词短语", "表语", "说明Homework的受欢迎程度", "terribly加强popular；with引出学生及甚至许多家长这些评价者。", "很受学生、甚至许多家长欢迎的", [child("terribly", "副词", "程度状语", "popular", "这里意为非常，不是以可怕的方式。"), child("with students and even many parents", "介词短语", "评价人群补足语", "popular", "and连接students与parents，even突出家长也包括在内。")]),
      c("but", "connector", "并列连词", "转折连接", "连接前后态度描述", "从不受欢迎推进到更强的鄙视，评价没有转正。", "但是"),
      c("in recent years", "modifier", "介词短语", "时间状语", "has been scorned", "只限定后半句近年来的变化。", "近年来"),
      c("it", "subject", "代词", "第二分句主语", "回指Homework", "不是指家长或学区。", "它"),
      c("has been particularly scorned", "predicate", "现在完成时被动", "第二分句谓语", "说明Homework受到的态度", "scorned是分词，与has been构成被动；particularly修饰被鄙视的突出程度。", "尤其受到鄙视", [child("particularly", "副词", "程度状语", "scorned", "突出近年的轻视程度。")]),
    ], clauses: [], focus: "两个has been不能一概当被动：前接形容词评价状态，后接分词说受到轻视。", question: "两处has been为什么分别译为‘一直不受欢迎’和‘受到鄙视’？", evidence: "has never been terribly popular with students and even many parents, but in recent years it has been particularly scorned", answer: "popular是形容词，构成系表；scorned是scorn的过去分词，作业是被轻视的一方。but说明负面态度进一步加重，近年来只限定后一变化。",
  },
  2: {
    parts: [
      c("School districts across the country", "subject", "名词短语", "主语", "are revising的施事", "中心为districts，across the country限定地域范围。", "全国各学区", [child("across the country", "介词短语", "后置定语", "School districts", "说明是遍布全国的学区。")]),
      c("most recently Los Angeles Unified", "modifier", "省略结构的插入举例", "补充举例", "School districts", "列出最近的一例；学区全名省略了后续的学区称呼，不添加缺失词到原文。", "最近的一例是洛杉矶联合学区"),
      c("are revising", "predicate", "现在进行时", "谓语", "School districts的行动", "重新考虑和修正仍在进行。", "正在修正"),
      c("their thinking on this educational ritual", "object", "名词短语", "宾语", "are revising", "中心thinking是名词；this educational ritual指前句家庭作业惯例。", "对这项教育惯例的看法", [child("on this educational ritual", "介词短语", "内容定语", "thinking", "on引思考的对象，this承接作业。")]),
    ], clauses: [], focus: "插入的学区名称只是最新例子，真正主语仍是全国各学区。", question: "are revising的主语是Los Angeles Unified吗？", evidence: "School districts across the country, most recently Los Angeles Unified, are revising", answer: "逗号内给出最近的一例；去掉插入语后，School districts与复数are直接相连。作者由全国背景引入洛杉矶这项具体政策。",
  },
  3: {
    parts: [
      c("Unfortunately", "modifier", "评注副词", "评价状语", "整句政策事实", "直接传达作者的遗憾和负面判断。", "遗憾的是"),
      c("L.A. Unified", "subject", "学区专名", "主语", "has produced的施事", "与上一句Los Angeles Unified为同一学区。", "洛杉矶联合学区"),
      c("has produced", "predicate", "现在完成时", "谓语", "说明学区已推出政策", "produce在这里是制定、推出。", "已经出台了"),
      c("an inflexible policy which mandates that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "object", "名词短语含嵌套从句", "宾语", "has produced", "中心policy；which先说明政策规定什么，再由that引出规定内容。", "一项僵化政策，规定除某些高级课程外，作业在学生学业成绩中所占比重不得再超过10%", [child("which mandates that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "定语从句", "后置定语", "policy", "which作mandates的主语，that内容从句是mandates的宾语。", [child("that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "宾语从句", "规定内容", "mandates", "homework为主语；may no longer count for限定计分权重，不限定作业数量。", [child("with the exception of some advanced courses", "介词短语", "例外范围状语", "homework may no longer count", "高级课程排除在这条10%上限规则之外，并非不布置作业。")])])]),
    ], clauses: [
      cl("which mandates that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "定语从句", "which", "修饰policy", "which", "mandates", [["宾语", "that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade"]], "先找政策，再解释它规定的内容。"),
      cl("that with the exception of some advanced courses, homework may no longer count for more than 10% of a student's academic grade", "宾语从句", "that", "作mandates宾语", "homework", "may no longer count", [["占比补足语", "for more than 10% of a student's academic grade"]], "先给例外范围，再说作业权重不得超过10%。"),
    ], focus: "10%限制成绩权重，高级课程例外也只针对这项上限。", question: "规则是减少90%的作业，还是改变成绩计算？", evidence: "homework may no longer count for more than 10% of a student's academic grade", answer: "count for后接成绩百分比，规定的是作业成绩在总成绩中的比重。may no longer禁止超过10%，没有规定恰好10%，也没有说明作业量减少多少。",
  },
  4: {
    parts: [
      c("This rule", "subject", "指示限定词加名词", "主语", "is meant的对象", "This回指前句10%权重上限。", "这项规则"),
      c("is meant", "predicate", "一般现在时被动", "谓语", "说明规则的设计意图", "be meant to表示被设计为、旨在；不是规则已经产生效果。", "旨在"),
      c("to address the difficulty that students from impoverished or chaotic homes might have in completing their homework", "complement", "不定式短语", "意图内容补足语", "is meant", "address接difficulty，that从句限定这种困难。", "处理来自贫困或混乱家庭的学生完成作业时可能遇到的困难", [child("the difficulty that students from impoverished or chaotic homes might have in completing their homework", "名词短语", "不定式动词宾语", "address", "difficulty是被处理的问题。", [child("that students from impoverished or chaotic homes might have in completing their homework", "定语从句", "后置定语", "difficulty", "that作have宾语，不能因为that出现就当内容从句。", [child("from impoverished or chaotic homes", "介词短语", "后置定语", "students", "说明学生的家庭处境，不描述其学习能力。"), child("in completing their homework", "介词加动名词", "困难领域补足语", "have difficulty", "在完成作业方面有困难，completing的执行者是students。")])])]),
    ], clauses: [cl("that students from impoverished or chaotic homes might have in completing their homework", "定语从句", "that", "修饰difficulty；that作have的宾语", "students from impoverished or chaotic homes", "might have", [["宾语", "that"], ["困难领域补足语", "in completing their homework"]], "把从句放在困难前：这些学生完成作业可能有的困难。")], focus: "that代回difficulty作have的宾语；政策意图不等于政策效果。", question: "might have后看不到宾语，是否句子不完整？", evidence: "the difficulty that students from impoverished or chaotic homes might have in completing their homework", answer: "宾语已由前面的关系词that承担，回指difficulty。might仍保留可能性；作者承认帮助困难学生的初衷，下一句才评价办法有缺陷。",
  },
  5: {
    parts: [c("But", "connector", "并列连词", "转折连接", "由政策意图转向政策评价", "照顾困难的目的不能直接证明办法正确。", "但"), c("the policy", "subject", "名词短语", "主语", "is的主语", "仍指10%规则。", "这项政策"), c("is", "predicate", "一般现在时系动词", "谓语", "连接政策与性质", "不是被动助动词。", "是"), c("unclear and contradictory", "complement", "并列形容词", "表语", "评价policy", "两项共同批评政策模糊且相互矛盾。", "含糊且自相矛盾的")], clauses: [], focus: "两个形容词都是政策的表语，明确传达作者批评。", question: "unclear and contradictory在说明谁？", evidence: "the policy is unclear and contradictory", answer: "is把policy与两个性质相连；不是说学生不明白或家长互相矛盾。这一句是后续具体论证的总评。",
  },
  6: {
    parts: [
      c("Certainly", "modifier", "评注副词", "认同评价状语", "整句合理限制", "作者承认确有不适宜布置的作业。", "当然"),
      c("no homework", "subject", "否定限定词加名词", "主语", "should be assigned的承受者", "no的实际范围要连同后置定语看，不能删去后文就理解为所有作业。", "任何这类家庭作业（范围见后面的定语）"),
      c("should be assigned", "predicate", "情态动词加被动", "谓语", "说明是否应该布置作业", "homework是被布置的对象；结合no译作不应布置。", "都不应布置（否定来自no）"),
      c("that students cannot complete on their own or that they cannot do without expensive equipment", "modifier", "并列定语从句", "后置定语", "homework", "两个that均为宾语关系词；从句后移到谓语之后，仍修饰homework。", "即学生无法独立完成，或不借助昂贵设备就无法完成的作业", [child("that students cannot complete on their own", "定语从句", "第一类作业限定", "homework", "on their own说明独立完成。"), child("that they cannot do without expensive equipment", "定语从句", "第二类作业限定", "homework", "without说明缺少设备的条件；不能丢掉cannot的否定。")]),
    ], clauses: [
      cl("that students cannot complete on their own", "后置定语从句", "that", "修饰homework", "students", "cannot complete", [["宾语", "that"]], "译为学生无法独立完成的作业，纳入不应布置的范围。"),
      cl("that they cannot do without expensive equipment", "并列定语从句", "that", "修饰homework", "they", "cannot do", [["宾语", "that"]], "译为没有昂贵设备就无法完成的作业。"),
    ], focus: "否定针对后面限定的两类作业，不是主张一律取消家庭作业。", question: "只读no homework should be assigned，会漏掉什么限制？", evidence: "that students cannot complete on their own or that they cannot do without expensive equipment", answer: "后置的两个定语把homework限制为独立做不来或依赖昂贵设备的作业。no与这个完整名词范围一起理解；删除定语会把作者的有条件限制误读为全面禁止。", notes: ["词块中‘这类’及末尾重复的‘作业’用于展示后置定语关系，不对应原文新增英文。no与should be assigned合译为‘不应布置’。"],
  },
  7: {
    parts: [
      c("But", "connector", "转折连词", "转折连接", "由合理限制转向免责隐患", "作者并未推翻前句对公平的认同。", "但是"),
      c("if the district is essentially giving a pass to students who do not do their homework because of complicated family lives", "modifier", "条件从句内含定语从句", "条件状语从句", "限定主句评价成立的情形", "条件主语是district；who从句只限定students；because of引出未做作业的家庭原因。", "如果学区实质上放过那些因家庭生活复杂而不做作业的学生", [child("the district", "名词短语", "条件从句主语", "is giving", "不是学生主动发放许可。"), child("a pass", "名词短语", "条件从句宾语", "is giving", "比喻放过、免于追究，不是给及格分。"), child("who do not do their homework because of complicated family lives", "定语从句", "后置定语", "students", "who是两个do所构成否定谓语的主语。", [child("because of complicated family lives", "介词短语", "原因状语", "do not do their homework", "because of后接名词，不另立从句。")])]),
      c("it", "subject", "代词", "主句主语", "回指the district", "代指学区及其政策做法。", "它"),
      c("is going", "predicate", "现在进行时", "主句谓语", "说明政策趋近的方向", "going后是close，不是be going to的将来结构。", "正在走向"),
      c("riskily close to the implication that standards need to be lowered for poor children", "modifier", "程度副词加方向表达", "趋近方向及程度状语", "is going", "接近的是一种危险暗示；that说明暗示的内容，不是作者已认可的教育原则。", "危险地接近这样一种暗示：对贫困儿童需要降低标准", [child("that standards need to be lowered for poor children", "同位语从句", "内容说明", "implication", "that不作内部主宾语，完整解释暗示是什么。", [child("for poor children", "介词短语", "适用对象状语", "need to be lowered", "poor说经济处境，不等于能力差。")])]),
    ], clauses: [
      cl("if the district is essentially giving a pass to students who do not do their homework because of complicated family lives", "条件状语从句", "if", "限定主句所批评的政策做法", "the district", "is giving", [["宾语", "a pass"], ["接受对象补足语", "to students who do not do their homework because of complicated family lives"]], "先理解如果学区放过这类学生，再读接近的危险暗示。"),
      cl("who do not do their homework because of complicated family lives", "定语从句", "who", "修饰students", "who", "do not do", [["宾语", "their homework"]], "译作因家庭复杂而不做作业的学生。"),
      cl("that standards need to be lowered for poor children", "同位语从句", "that", "解释implication内容", "standards", "need", [["不定式补足语", "to be lowered for poor children"]], "译出暗示的内容，同时保留它只是作者警惕的政策含义。"),
    ], focus: "条件、学生定语和暗示内容分属三层；降低标准是作者担忧的推论。", question: "作者是否直接主张standards need to be lowered？", evidence: "riskily close to the implication that standards need to be lowered for poor children", answer: "没有。整个that从句处在the implication内部，riskily表明作者警惕这一暗示。更外层if限定了被批评的政策做法，不能把嵌套内容摘成作者建议。",
  },
  8: {
    parts: [
      c("District administrators", "subject", "名词短语", "第一分句主语", "say的说话者", "标明辩护意见来自管理者。", "学区管理者"), c("say", "predicate", "一般现在时", "第一分句谓语", "引述管理者观点", "观点归属先保留，不直接归给作者。", "说"),
      c("that homework will still be a part of schooling", "object", "that宾语从句", "宾语从句", "say的内容", "still保留仍然；a part为表语。", "家庭作业仍将是学校教育的一部分", [child("a part of schooling", "名词短语", "从句表语", "will be", "schooling指教育过程，不仅是成绩。")]),
      c("teachers", "subject", "复数名词", "第二分句主语", "are allowed的许可对象", "分号后另起主句。", "教师"), c("are allowed", "predicate", "一般现在时被动", "第二分句谓语", "说明教师获得许可", "许可不等于被强制布置。", "可以"),
      c("to assign as much of it as they want", "complement", "不定式含比较数量结构", "获准行动补足语", "are allowed", "as much of it是assign宾语，it为homework；后一个as引比较分句。", "想布置多少作业就布置多少", [child("as much of it", "数量名词短语", "不定式动词宾语", "assign", "much用于不可数homework，不能解释为家长人数。"), child("as they want", "比较从句", "数量标准", "as much", "they指teachers，want后省略重复的作业量。")]),
    ], clauses: [cl("that homework will still be a part of schooling", "宾语从句", "that", "作say宾语", "homework", "will be", [["表语", "a part of schooling"]], "先译管理者表示，再译作业仍属于教育。"), cl("as they want", "比较从句（宾语省略）", "as", "限定as much的数量", "they", "want", [], "按教师想布置多少来理解数量，省略内容不补进英文。")], focus: "管理者允许的作业量不变，与下一句低计分权重构成矛盾。", question: "as much of it as they want中的it与they分别是谁？", evidence: "teachers are allowed to assign as much of it as they want", answer: "it指不可数homework，they指teachers；比较结构说教师可以自行决定数量，没有说明学生因此会认真完成。下一句才说明计分激励。",
  },
  9: {
    parts: [
      c("But", "connector", "转折连词", "转折连接", "对照许可与实际激励", "教师可以布置，不等于学生愿意完成。", "然而"),
      c("with homework counting for no more than 10% of their grades", "modifier", "with名词加现在分词结构", "计分背景状语", "后面skip和see的前提", "homework是counting的逻辑主语；counting不是学生的新谓语。", "在家庭作业最多只占学生成绩10%的情况下", [child("homework", "名词", "分词逻辑主语", "counting", "计入成绩的是作业。"), child("counting for no more than 10% of their grades", "现在分词短语", "with结构补足语", "homework", "no more than是最多，不是至少。")]),
      c("students", "subject", "复数名词", "主语", "can skip及see的施事", "同一主语统领两个并列动作。", "学生"), c("can easily skip", "predicate", "情态动词及副词", "第一并列谓语", "students", "easily说明省掉作业并不难；skip为不做。", "可以轻易少做"), c("half their homework", "object", "数量名词短语", "宾语", "skip", "half限定一半，不是全部。", "一半作业"), c("and", "connector", "并列连词", "谓语连接", "连接skip与see", "后项共享students和can。", "并且"), c("see", "predicate", "动词原形", "第二并列谓语", "students can", "与skip并列，不再另补主语。", "看到"), c("very little difference", "object", "名词短语", "宾语", "see", "little为几乎没有，very加强极少的程度。", "极小的差异"), c("on their report cards", "modifier", "介词短语", "差异呈现位置状语", "see very little difference", "report cards为学生成绩单；不表示他们不在意它。", "在他们的成绩单上"),
    ], clauses: [], focus: "with结构提供低权重前提；主句用少做一半而分数差很小说明激励不足。", question: "counting是否与skip、see并列？", evidence: "with homework counting for no more than 10% of their grades", answer: "counting由with结构内部的homework统领，是非谓语。主句才以students为主语，can共享给skip和see。数量说分数损失小，并未说学生不重视成绩单。",
  },
  10: {
    parts: [
      c("Some students", "subject", "数量限定名词短语", "主语", "might do的施事", "some只说部分学生。", "有些学生"), c("might do", "predicate", "情态动词结构", "谓语", "Some students", "might表示可能，不是所有人都已经如此。", "可能表现得"), c("well", "modifier", "副词", "方式评价状语", "do", "do well表示表现好。", "很好"), c("on state tests", "modifier", "介词短语", "表现领域状语", "do well", "限定为州统考。", "在州统考中"), c("without completing their homework", "modifier", "介词加动名词", "条件状语", "might do well", "完成作业的逻辑主语仍为Some students。", "即使没有完成作业"), c("but", "connector", "转折连词", "转折连接", "切换讨论人群", "前一种可能不能概括所有学生。", "但是"),
      c("what about the students who performed well on the tests and did their homework", "complement", "what about省略问句", "反问内容", "要求考虑另一类学生", "原文没有给what about补出谓语；后面who限定既考好又做作业者。", "那些考得好且做了作业的学生又该如何看待呢", [child("who performed well on the tests and did their homework", "定语从句", "后置定语", "第二个students", "performed和did共用who主语，不能误把did当强调助动词。")]),
    ], clauses: [cl("who performed well on the tests and did their homework", "定语从句", "who", "修饰第二个students", "who", "performed / did", [["did的宾语", "their homework"]], "把考得好且完成作业作为同一群人的两个特点。")], focus: "两个students指不同考察组；部分人不做作业也考好，不能证明作业都无用。", question: "第二组学生比第一种情形多了什么条件？", evidence: "who performed well on the tests and did their homework", answer: "这组学生既考试表现好又做了作业。作者用反问保留作业可能帮助他们的解释，没有断言作业是每次好成绩的唯一原因。",
  },
  11: {
    parts: [c("It", "subject", "形式主语", "主语", "占据主语位置", "不回指作业；真正被评价的是后面命题。", "这（形式主语，不另译实体）"), c("is", "predicate", "一般现在时系动词", "谓语", "连接命题与可能性评价", "不是被动。", "是"), c("quite possible", "complement", "程度副词加形容词", "表语", "评价that命题", "quite加强possible但仍只表示可能。", "很有可能的"), c("that the homework helped", "subject", "后置that主语从句", "主语从句", "对应形式主语It", "helped独立使用，帮助谁由前句学生提供。", "即作业起到了帮助作用")], clauses: [cl("that the homework helped", "后置主语从句", "that", "真正主语，对应It", "the homework", "helped", [], "先理解作业有帮助，再保留很可能这一评价。")], focus: "It是形式主语，possible不能译成已经证实的因果。", question: "quite是否把possible变成了肯定事实？", evidence: "quite possible that the homework helped", answer: "没有。quite使可能性的语气更强，仍不是确定。that后面的命题才是被评价内容，不能把It误接到某个学生。",
  },
  12: {
    parts: [
      c("Yet", "connector", "转折副词", "转折连接", "承接作业可能有益的解释", "转回政策没有给教师判断空间的缺陷。", "然而"),
      c("rather than empowering teachers to find what works best for their students", "modifier", "rather than加动名词结构", "被排除做法的对照状语", "与主句实际做法对比", "empowering的施事为policy所代表的制度安排；teachers是find的逻辑主语。", "这项政策没有授权教师寻找对学生最有效的做法", [child("teachers", "名词", "empowering的宾语兼不定式逻辑主语", "empowering / to find", "寻找有效做法的是教师。"), child("to find what works best for their students", "不定式短语", "宾语补足语", "teachers", "说明被授权做的事情。", [child("what works best for their students", "融合关系名词性从句", "宾语从句", "find", "what既连接又作works主语，意为最有效的做法。")])]),
      c("the policy", "subject", "名词短语", "主语", "imposes的施事", "政策是被批评对象。", "这项政策"), c("imposes", "predicate", "一般现在时", "谓语", "说明实际做法", "impose强调强推。", "而是强加"), c("a flat, across-the-board rule", "object", "名词短语", "宾语", "imposes", "flat和across-the-board都限定rule，批评不顾差异。", "一条一刀切的规定"),
    ], clauses: [cl("what works best for their students", "融合关系名词性从句", "what", "作find的宾语，what同时为内部主语", "what", "works", [], "译为对其学生最有效的做法，不译成直接提问。")], focus: "rather than排除赋权方式，实际主句只说政策强推统一规定。", question: "to find的执行者是policy还是teachers？", evidence: "empowering teachers to find what works best for their students", answer: "empower somebody to do中somebody是受权者，也是后续动作执行者；这里由教师寻找有效做法。what在从句内作works主语，不是另外一个疑问句。", notes: ["词块译文的‘而是’表达rather than与主句的对照；原文imposes本身只表示强加。"],
  },
  13: {
    parts: [c("At the same time", "connector", "介词短语用作篇章连接", "补充论点", "接前段另一项批评", "这里不要求精确同步的两个时刻。", "与此同时"), c("the policy", "subject", "名词短语", "主语", "addresses的施事", "仍指计分政策。", "这项政策"), c("addresses", "predicate", "一般现在时", "谓语", "说明处理问题", "address此处是处理，不是地址。", "没有处理（否定来自none）"), c("none of the truly thorny questions about homework", "object", "否定数量名词短语", "宾语", "addresses", "none把所指问题全部排除；about限定问题主题。", "关于作业的任何真正棘手的问题", [child("truly thorny", "副词加形容词", "前置定语", "questions", "truly修饰thorny，强调实质难题。"), child("about homework", "介词短语", "后置定语", "questions", "只涉及作业问题，不泛称政策一无是处。")])], clauses: [], focus: "none否定处理过任何一个实质问题，后文两个if展开核心教育价值判断。", question: "否定词在何处，中文怎样连起来？", evidence: "addresses none of the truly thorny questions about homework", answer: "none位于宾语中，使addresses none合起来成为‘一个也没处理’。不能只翻addresses为解决、漏掉none；about homework限定了批评对象。",
  },
  14: {
    parts: [
      c("If the district finds homework to be unimportant to its students' academic achievement", "modifier", "if条件从句含复合宾语", "条件状语从句", "限定主句建议", "finds的宾语homework后接不定式宾补；只是假设认定无益。", "如果学区认为作业对学生的学业成就不重要", [child("homework", "名词", "条件从句宾语", "finds", "被评价是否重要的对象。"), child("to be unimportant to its students' academic achievement", "不定式短语", "宾语补足语", "homework", "to be的逻辑主语为homework，后一个to引适用领域。")]),
      c("it", "subject", "代词", "主语", "回指the district", "着手行动的是学区。", "它"), c("should move", "predicate", "情态动词结构", "谓语", "说明应采取行动", "move to do是着手，不是搬迁。", "就应着手"),
      c("to reduce or eliminate the assignments", "complement", "不定式短语含并列动词", "行动内容补足语", "should move", "reduce和eliminate分别为减少与取消。", "减少或取消作业", [child("the assignments", "名词短语", "并列动词共有宾语", "reduce or eliminate", "这里具体指布置的任务。")]),
      c("not make them count for almost nothing", "complement", "否定的并列动词短语", "被排除的行动", "与前面减少或取消作业对照", "them作make宾语并充当count逻辑主语，原文省略重复的助动或不定式标记，不补入英文。", "而不是使作业在成绩中几乎不占分量", [child("them", "宾格代词", "make的宾语", "make", "回指assignments，不是学生。"), child("count for almost nothing", "不带to的不定式短语", "宾语补足语", "them", "make A do结构；count for是占比。")]),
    ], clauses: [cl("If the district finds homework to be unimportant to its students' academic achievement", "条件状语从句", "If", "限定主句建议成立前提", "the district", "finds", [["宾语", "homework"], ["宾语补足语", "to be unimportant to its students' academic achievement"]], "先保留如果判断无益，再译减少或取消这一后果。")], focus: "先保留If，才能区分条件性取消建议与一律取消作业。", question: "them代指谁，count的执行者又是谁？", evidence: "not make them count for almost nothing", answer: "them承接assignments，既是make宾语，也是不带to的不定式count的逻辑主语。不是让学生变得毫无价值，而是让作业的计分权重近乎为零。",
  },
  15: {
    parts: [c("Conversely", "connector", "对照副词", "相反条件连接", "与上句无益假设对照", "翻转判断前提，不是转到无关话题。", "反过来"), c("if homework matters", "modifier", "if条件从句", "条件状语从句", "限定较高权重建议", "matters为不及物动词，意为有价值、重要。", "如果作业重要"), c("it", "subject", "代词", "主语", "回指homework", "与上句主句it指学区不同。", "它"), c("should account", "predicate", "情态动词结构", "谓语", "说明应占权重", "account与for构成占比搭配。", "就应该占"), c("for a significant portion of the grade", "complement", "介词短语", "占比补足语", "account", "portion指所占份额，significant是相当大的。", "总成绩中相当大的比重")], clauses: [cl("if homework matters", "条件状语从句", "if", "限定主句建议", "homework", "matters", [], "先译如果有教育价值，再译权重应体现这种价值。")], focus: "与前句合读，作者先要求判断教育价值，再决定作业量与计分。", question: "matters与the grade分别属于哪个判断层？", evidence: "if homework matters, it should account for a significant portion of the grade", answer: "matters是条件中的教育价值判断；在成绩中占较大比例是建议的结果。不能反过来把分数权重本身当作是否有教育价值的答案。",
  },
  16: {
    parts: [
      c("Meanwhile", "connector", "篇章副词", "补充连接", "引入质量和作业量保障问题", "补充同一政策尚未处理的内容。", "同时"), c("this policy", "subject", "名词短语", "主语", "does的施事", "仍为计分上限政策。", "这项政策"), c("does", "predicate", "一般现在时", "谓语", "this policy", "这里do是实义动词，宾语为nothing。", "没有采取（否定来自nothing）"), c("nothing", "object", "否定不定代词", "宾语", "does", "与does合译为没有采取任何措施。", "任何措施"),
      c("to ensure that the homework students receive is meaningful or appropriate to their age and the subject, or that teachers are not assigning more than they are willing to review and correct", "modifier", "不定式含两并列宾语从句", "目的状语", "does nothing", "to ensure说未实现的保障目标；两个that均由ensure支配。", "来确保学生收到的作业有意义或适合其年龄和科目，或确保教师不布置超出其愿意检查批改数量的作业", [child("that the homework students receive is meaningful or appropriate to their age and the subject", "宾语从句", "第一保障内容", "ensure", "外层主语为homework，students receive只是其定语。", [child("students receive", "省略关系词的定语从句", "后置定语", "homework", "students是receive主语，宾语关系词省略。")]), child("that teachers are not assigning more than they are willing to review and correct", "宾语从句", "第二保障内容", "ensure", "not限定不应布置超量，不是禁止布置任何作业。", [child("than they are willing to review and correct", "比较从句", "数量标准", "more", "they指teachers，willing说意愿，不能换成能力。")])]),
    ], clauses: [
      cl("that the homework students receive is meaningful or appropriate to their age and the subject", "宾语从句", "that", "ensure的第一个宾语", "the homework students receive", "is", [["表语", "meaningful or appropriate to their age and the subject"]], "先找作业是什么样，再加入学生收到的限定。"),
      cl("students receive", "省略关系代词的定语从句", "省略that/which", "修饰homework；省略成分作receive宾语", "students", "receive", [], "译为学生收到的作业；不把省略词补进原文。"),
      cl("that teachers are not assigning more than they are willing to review and correct", "宾语从句", "that", "ensure的第二个宾语", "teachers", "are not assigning", [["宾语", "more than they are willing to review and correct"]], "译为确保教师布置量不超过愿意批改量，不能写成已证实教师超量。"),
      cl("than they are willing to review and correct", "比较从句", "than", "确定more的比较标准", "they", "are", [["表语", "willing to review and correct"]], "先理解教师愿意检查批改多少，再与布置量比较。"),
    ], focus: "确保的内容有两层并列；第一层内嵌定语，第二层内嵌数量比较。", question: "students receive、is、are willing各自的主语是什么？", evidence: "the homework students receive is meaningful or appropriate to their age and the subject, or that teachers are not assigning more than they are willing to review and correct", answer: "students统领receive；homework统领is；比较从句they指teachers，统领are。their age中的their却指学生。两个that是ensure的并列内容，不是is的并列谓语。",
  },
  17: {
    parts: [
      c("The homework rules", "subject", "名词短语", "主语", "should be put的承受者", "暂停的是规则，并非所有教育活动。", "这些作业规定"), c("should be put", "predicate", "情态动词加被动", "谓语", "说明规定应如何处理", "put的过去分词仍为put。", "应被置于"), c("on hold", "complement", "固定介词短语", "状态补足语", "The homework rules", "put on hold整体是暂缓，不等于永久取消。", "暂缓执行的状态"),
      c("while the school board, which is responsible for setting educational policy, looks into the matter and conducts public hearings", "modifier", "时间从句含非限制性定语", "时间状语从句", "限定暂缓期间", "主语school board共享looks into与conducts；中间which只补充其职责。", "在负责制定教育政策的学校董事会调查此事并举行公开听证会期间", [child("which is responsible for setting educational policy", "非限制性定语从句", "补充定语", "the school board", "并非修饰homework rules。"), child("looks into the matter", "动词加介词结构", "时间从句第一谓语部分", "the school board", "look into为调查，the matter是政策问题。"), child("conducts public hearings", "动宾短语", "时间从句第二谓语部分", "the school board", "conduct为举行，hearings为听证会。")]),
    ], clauses: [cl("while the school board, which is responsible for setting educational policy, looks into the matter and conducts public hearings", "时间状语从句", "while", "说明规则暂缓的期间", "the school board", "looks into / conducts", [["looks into的对象", "the matter"], ["conducts的宾语", "public hearings"]], "先译暂缓，再交代期间董事会的两项行动。"), cl("which is responsible for setting educational policy", "非限制性定语从句", "which", "补充school board职责", "which", "is", [["表语", "responsible for setting educational policy"]], "插入解释负责制定教育政策的董事会。")], focus: "while是调查听证期间，逗号中职责说明不能打断董事会的两项行动。", question: "which从句去掉以后，谁负责looks into和conducts？", evidence: "while the school board, which is responsible for setting educational policy, looks into the matter and conducts public hearings", answer: "都是the school board。which从句只补充董事会职责；while说明暂缓执行与调查听证同时展开，不是让步‘尽管’，也没有规定精确截止日期。",
  },
  18: {
    parts: [c("It", "subject", "形式主语", "主语", "占据评价句主语位置", "不回指某项规则，真正行动在后面的不定式。", "这（形式主语，不另译实体）"), c("is", "predicate", "一般现在时系动词", "谓语", "连接行动时机与评价", "主系表结构。", "是"), c("not too late", "complement", "否定程度形容词短语", "表语", "评价补救时机", "not否定太迟，合起来表示来得及。", "还不算太晚的"), c("for L.A. Unified to do homework right", "subject", "带逻辑主语的不定式", "后置真正主语", "对应It", "for引不定式执行者；right修饰do，不能当权利名词。", "对于洛杉矶联合学区把作业问题妥善处理这件事", [child("for L.A. Unified", "for加专名", "不定式逻辑主语", "to do", "采取补救行动的是学区。"), child("right", "副词", "方式状语", "do", "do homework right既呼应家庭作业，又含认真做好政策准备之意。")])], clauses: [], focus: "否定太晚意味着仍可补救，结尾批评具体做法而未否定全部作业。", question: "right是名词‘权利’吗？", evidence: "to do homework right", answer: "这里right是副词，说明把作业这件事做对、做好。它修饰do；真正主语是不定式，It只占主语位置，not too late保留改正余地。",
  },
};

export function upgradePassage2012P1Sentence(source: SentenceAnalysis): SentenceAnalysis {
  const review = reviewed[source.number];
  if (!review) throw new Error(`2012 Text 1未逐句审阅：${source.id}`);
  const components = review.parts.map(part => part.component);
  const { chunks: _legacyChunks, ...draft } = source;
  const sentence = withReviewedSyntax({
    ...draft,
    beginnerSyntax: { components, clauses: review.clauses, reading: { focus: review.focus, questions: [{ question: review.question, evidence: review.evidence, answer: review.answer }] } },
    layers: components.map(component => ({ label: component.function, text: `${component.text}：${component.explanation}` })),
    grammar: components.map(component => `${component.form}；${component.explanation}`),
    translationNotes: review.notes,
    practice: passage2012P1Practice[source.id],
  }, review.parts.map(part => part.color));
  return { ...sentence, translationAlignment: sentence.chunks.map((chunk, index) => ({ english: chunk.text, chinese: review.parts[index].chinese })) };
}
