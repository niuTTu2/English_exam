import { withWriting2011ATeaching } from "./2011-writing-a-teaching";
import type { SentenceAnalysis, WritingTask } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2011-writing-a");
const originalWriting2011ASentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Suppose ", "predicate", "祈使动词原形", "题设指令", "省略考生you为主语", "suppose引入假定写信情境，不是要求讨论真假。"),
    segment("your cousin Li Ming ", "subject", "所有格名词与姓名同位语", "宾语从句主语", "说明收信人身份", "cousin可为表/堂兄弟姐妹，姓名Li Ming不强行指定性别。"),
    segment("has just been admitted to a university.", "predicate", "现在完成时被动", "宾语从句谓语", "说明刚发生的录取事件", "has been admitted为已经被录取，just表示刚刚；不是已经大学毕业。"),
  ], "Suppose your cousin Li Ming has been admitted to a university.", "假设你的表亲李明刚被一所大学录取。", "假设你的表亲李明刚刚考上大学。", "确立祝贺事件、收信人和亲属关系，决定信件语气亲切。", ["has just been admitted to a university"], [
    clause("your cousin Li Ming has just been admitted to a university", "宾语从句", "省略that", "作Suppose宾语", "your cousin Li Ming", "has just been admitted", "to a university为录取去向", "先译假设，再译表亲刚获大学录取。"),
  ]),
  sentence(2, [
    segment("Write ", "predicate", "祈使动词原形", "写作指令谓语", "省略主语you", "命令考生写信；write后可接人和信件两个宾语。"),
    segment("him/her a letter ", "object", "人称宾格与名词短语", "间接宾语与直接宾语", "接在Write后", "him/her为收信人，a letter为所写内容，不是两个并列宾语。"),
    segment("to 1)congratulate him/her, and ", "modifier", "第一目的不定式", "写信目的状语之一", "修饰Write", "to引写信目的，下列两个动词共用to；congratulate直接以人为宾语。"),
    segment("2)give him/her suggestions ", "modifier", "省略to的并列不定式", "写信目的状语之二", "与congratulate并列修饰Write", "give双宾语：him/her是建议接收者，suggestions是给予的内容。"),
    segment("on how to get prepared for university life.", "modifier", "介词加疑问词不定式", "suggestions的后置定语", "限定建议主题", "on后接how to...；get prepared表做好准备，for引准备事项，非完整主谓从句。"),
  ], "Write him/her a letter to congratulate him/her, and give him/her suggestions.", "写信给他/她，祝贺他/她，并就如何为大学生活作准备提出建议。", "请给李明写信，祝贺其被大学录取，并建议如何做好大学生活的准备。", "祝贺和建议两个交际任务都必须完成，建议要切合入学准备。", ["congratulate him/her", "get prepared for university life"]),
  sentence(3, [
    segment("You ", "subject", "人称代词", "字数指令主语", "指考生", "You在此不是收信人，而是执行写作任务的人。"),
    segment("should write ", "predicate", "情态动词加原形", "字数指令谓语", "与主语You搭配", "should表示题目要求，不是未来预测。"),
    segment("about 100 words ", "object", "约数数量短语", "write的宾语", "限定篇幅", "about表示约100，不把它擅改为至少100。"),
    segment("on ANSWER SHEET 2.", "modifier", "介词地点短语", "书写位置", "修饰write", "为原纸笔试卷答题位置，线上使用本题作答框。"),
  ], "You should write about 100 words.", "你应在答题卡2上写约100词。", "请在答题卡2上写一封约100词的信。", "保留约数要求，不冒造官方扣分区间。", ["about 100 words"]),
  sentence(4, [
    segment("Do not sign your own name ", "predicate", "否定祈使句与宾语", "禁止事项", "省略you为主语", "sign为签署姓名，own强调不能使用考生真实姓名。"),
    segment("at the end of the letter.", "modifier", "位置介词短语", "署名位置状语", "限定sign", "at the end of为在信末，非最终结果的in the end。"),
  ], "Do not sign your own name.", "不要在信的末尾签你自己的名字。", "信末不要署真实姓名。", "避免身份信息不合题意，下一句指定替代署名。", ["at the end of the letter"]),
  sentence(5, [
    segment("Use “Zhang Wei” ", "predicate", "祈使动词与专名宾语", "署名指令", "省略you", "Zhang Wei是写信人署名，不是收信人Li Ming。"),
    segment("instead.", "modifier", "替代副词", "方式状语", "修饰Use", "instead单独使用说明用指定名代替真实姓名。"),
  ], "Use “Zhang Wei” instead.", "改用‘Zhang Wei’。", "请署名‘Zhang Wei’。", "收信人和署名不能颠倒。", []),
  sentence(6, [
    segment("Do not write your address. ", "predicate", "否定祈使句", "版式禁止事项", "省略you", "不写地址，不套用完整商业信函邮寄地址模板。"),
    segment("(10 points)", "modifier", "括号分值说明", "题目信息", "说明第47题总分", "分值不是自动评分承诺。"),
  ], "Do not write your address.", "不要写你的地址。（10分）", "不要写地址。本题10分。", "保留原卷分值与格式限制。", []),
];
export const writing2011ASentences = originalWriting2011ASentences.map(withWriting2011ATeaching);
export const writing2011ATasks: WritingTask[] = [{
  id: 201147, number: 47, genre: "letter", points: 10, wordLimit: { mode: "about", count: 100 }, instructions: writing2011ASentences,
  requirements: ["收信人：表亲Li Ming；写信人署名：Zhang Wei。", "两个任务：祝贺被大学录取；给出大学生活准备建议。", "篇幅约100词，语气自然亲切；不写地址，不使用真实姓名。"],
  outline: [
    { title: "开头：祝贺与回应喜讯", content: "直接点明大学录取，表达高兴；一两句即可，不绕写收到信件的虚构时间。" },
    { title: "主体：准备建议与理由", content: "选两三项可执行建议，如了解课程、安排时间和生活开支、参加合适社团；每项补一个简短目的。" },
    { title: "结尾：祝愿与署名", content: "祝福新的大学生活，用自然书信结束语，署Zhang Wei；不再重复整段建议。" },
  ],
  sample: {
    english: ["Dear Li Ming,", "Congratulations on your admission to university! I am delighted that your hard work has paid off.", "Before the term begins, you could learn about your courses and make a realistic study plan. It would also help to practise managing your time and money, since you will soon be living more independently. Once you arrive, try joining a club that interests you. This is a good way to make friends and become part of campus life.", "I hope these suggestions will help you get ready for this exciting new stage. Enjoy your university years!", "Yours,\nZhang Wei"],
    chinese: ["亲爱的李明：", "祝贺你被大学录取！你的努力有了回报，我真为你高兴。", "开学前，你可以了解课程，制订切实可行的学习计划。你也可以练习安排时间和开支，因为你很快就要过更独立的生活。入学后，不妨参加一个感兴趣的社团，这有助于交朋友并融入校园生活。", "希望这些建议能帮助你为令人期待的新阶段做好准备。愿你享受大学时光！", "祝好！\n张伟"],
    notes: ["称呼用题目给定的Li Ming，不凭空改成朋友或老师。", "Congratulations on + 名词为祝贺结构；has paid off表达努力见到回报。", "could、It would help to与try doing语气适合亲属建议；学习、生活、交友各给一条，不把命令堆满。", "hope that从句自然表达祝愿；没有添加图表数据或不相关经历。", "结束语与Zhang Wei分行，按题目不写地址。"],
  },
  languageTips: [
    { english: "Congratulations on your admission to university!", chinese: "祝贺你被大学录取！", usage: "congratulations用复数；on后接被祝贺事件，不写congratulate for。" },
    { english: "It would help to practise managing your time.", chinese: "练习安排时间会有所帮助。", usage: "It作形式主语，to practise是真正动作；practise后接doing，不接to manage。" },
    { english: "Try joining a club that interests you.", chinese: "试着加入感兴趣的社团。", usage: "try doing为尝试一种办法；that作定语从句主语，修饰单数club，interests用单三。" },
  ],
  checklist: ["是否明确祝贺大学录取？", "是否给出具体准备建议，而非只说努力学习？", "建议是否与大学学习、生活或适应相关？", "是否以Li Ming称呼、以Zhang Wei署名，且未写地址？", "篇幅是否接近100词，称呼、段落和结束语是否清楚？", "是否检查主谓一致、动词形式与介词搭配？"],
  pitfalls: ["把收信人Li Ming写成署名，或使用考生自己的姓名。", "只祝贺却不给建议，或只给建议而忘了祝贺。", "将约100词当作官方允许区间；页面字数只是辅助统计，不替代阅卷规则。", "参考范文为教学示例，不是原卷正文或唯一标准答案，也不计入真题词频。"],
}];
