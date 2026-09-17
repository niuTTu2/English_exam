import type { SentenceAnalysis, WritingTask } from "./data";
import { segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2012-writing-b");
export const writing2012BSentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Write an essay ", "predicate", "祈使句动宾", "要求写文章", "省略主语you，essay为宾语", "不是给客服的邮件，不能沿用第47题称呼署名。"),
    segment("based on the following table.", "modifier", "过去分词定语", "限定essay依据", "based on修饰essay", "table为下方统计表，不是餐桌；following是随后给出的。"),
  ], "Write an essay.", "写一篇以下列表格为依据的文章。", "请根据下表写一篇文章。", "确定表格作文文体和数据来源，不能改为上一年的双年份折线或柱状趋势。", ["based on the following table"]),
  sentence(2, [
    segment("In your writing, ", "modifier", "范围介词短语", "限定任务范围", "修饰should describe/give", "writing指这篇作文，不是所有写作的一般规定。"),
    segment("you should 1) describe the table, ", "predicate", "情态动宾及列举", "任务第一项", "describe直接带table宾语", "写出对象、年龄组与主要数值差异，而非逐字抄表不归纳。"),
    segment("and 2) give your comments.", "connector", "并列谓语", "任务第二项", "give与describe共用you should", "comments为与调查相关的评论或建议，不是没有根据的因果结论。"),
  ], "you should describe the table, and give your comments.", "在作文中，你应该一，描述表格；二，给出评论。", "文章须包含图表描述和你的评论。", "描述与评论均不可缺；区分原图事实、可能解释和建议。", ["describe the table", "give your comments"]),
  sentence(3, [
    segment("You should write ", "predicate", "情态动词结构", "篇幅要求", "write后接数量宾语", "should在题目中提出明确作答要求。"),
    segment("at least 150 words.", "object", "最低数量结构", "词数下限", "at least限定150", "至少150词，不是约150，也不自行设定最高词数。"),
  ], "You should write at least 150 words.", "你应当写至少150个词。", "篇幅不少于150词。", "保留原卷最低要求，网站字数提示不代替阅卷。", ["at least 150 words"]),
  sentence(4, [
    segment("Write your essay ", "predicate", "祈使动宾", "指定作答内容", "essay为整篇文章", "your为所属，essay不是列点答题清单。"),
    segment("on ANSWER SHEET 2. ", "modifier", "位置介词短语", "答题位置", "修饰Write", "原卷规定答题纸2，线上保留考试说明。"),
    segment("(15 points)", "modifier", "括号分值说明", "整题分值", "对应第48题", "15是满分信息，不是页面自动评分。"),
  ], "Write your essay on ANSWER SHEET 2.", "在答题纸2上写你的文章。（15分）", "请在答题纸2上作答，本题15分。", "保持原卷位置及分值要求。", ["on ANSWER SHEET 2"]),
];
export const writing2012BTasks: WritingTask[] = [{
  id: 201248, number: 48, genre: "chart-essay", points: 15, wordLimit: { mode: "at-least", count: 150 }, instructions: writing2012BSentences,
  requirements: ["主题：某公司员工工作满意度调查；按年龄组比较满意、不清楚和不满意三类比例。", "≤40岁：16.7%、50.0%、33.3%；41—50岁：0.0%、36.0%、64.0%；>50岁：40.0%、50.0%、10.0%。数值按原图逐格读取，不是估计值。", "描述表格并给出评论，至少150词，15分；不用书信称呼署名。", "没有年份轴、调查人数或原因数据；不能写成逐年变化、年龄必然导致态度变化或某类绝对人数最多。"],
  outline: [
    { title: "首段：调查对象与关键对比", content: "点明某公司、工作满意度及三个年龄组；中间组不满意率64.0%最高且满意率0.0%，年长组满意率40.0%最高、不满意率10.0%最低。补充不清楚一列，避免把它当满意。" },
    { title: "中段：谨慎解释差异", content: "可以提出职业期待、工作量、支持程度等可能原因，但须用may/might或possible；原表不能证明具体原因，也不能推广到所有公司。" },
    { title: "末段：提出针对性建议", content: "建议公司倾听不同年龄员工意见，优先查明高不满意群体的实际问题，再调整环境、发展机会并回访。把行动建议与已经发生的事实分开。" },
  ],
  sample: {
    english: [
      "The table reports employees' job satisfaction in a company by age group. Among those aged 40 or below, 16.7 percent are satisfied, 50.0 percent are unsure and 33.3 percent are dissatisfied. For the 41–50 group, the corresponding figures are 0.0, 36.0 and 64.0 percent. Among employees over 50, 40.0 percent are satisfied, 50.0 percent are unsure and 10.0 percent are dissatisfied. Thus, the middle group has the highest dissatisfaction rate, while the oldest group has the highest satisfaction rate.",
      "These differences deserve attention, but the table does not tell us why they exist. Career expectations, workload or workplace support might play a role. Such explanations would need further investigation, and the results from one company should not be treated as a description of all workers.",
      "In my view, managers should listen carefully to employees in each age group, especially those reporting dissatisfaction. Confidential interviews and clear channels for feedback could help identify specific problems. The company could then improve working conditions and development opportunities where needed, and use a follow-up survey to assess whether those changes help.",
    ],
    chinese: [
      "该表按年龄组呈现某公司员工的工作满意度。40岁及以下员工中，16.7%表示满意，50.0%不清楚，33.3%不满意。41至50岁组的对应比例为0.0%、36.0%和64.0%。50岁以上员工中，40.0%满意，50.0%不清楚，10.0%不满意。因此，中间年龄组不满意率最高，而最年长组满意率最高。",
      "这些差异值得关注，但表格并未说明差异产生的原因。职业期待、工作量或工作场所支持可能起到作用。这些解释需要进一步调查，一家公司的结果也不应被当成所有劳动者状况的写照。",
      "在我看来，管理者应认真听取各年龄组员工的意见，尤其是那些表达不满的员工。保密访谈和清晰的反馈渠道可以帮助识别具体问题。公司随后可根据需要改善工作条件和发展机会，再用后续调查评估这些改变是否有效。",
    ],
    notes: ["原图九个百分数完整保留；40 or below包括40岁，over 50不包括50岁。corresponding figures的顺序与满意/不清楚/不满意一致。while比较两个群体，而非时间趋势。40.0%是最高比例，仍未过半。", "why为嵌入疑问从句；might和would保留解释的假设性，明确单公司数据的适用边界，不编造样本数或因果关系。", "建议用should/could；those reporting dissatisfaction中分词限定员工，where needed为省略状语，whether从句表示评估是否有效。建议不是表格记录的已实施政策。"],
  },
  languageTips: [
    { english: "Among employees aged 40 or below, 16.7 percent are satisfied.", chinese: "40岁及以下员工中，16.7%表示满意。", usage: "aged作分词定语；or below包括40岁，不能写under 40遗漏边界。比例分母为该年龄组。" },
    { english: "The 41–50 group has the highest dissatisfaction rate, at 64.0 percent.", chinese: "41至50岁组的不满意率最高，为64.0%。", usage: "highest比较原表三组比例；没有各组人数，不能直接说这一组不满人数最多。" },
    { english: "No respondents in the middle group report being satisfied.", chinese: "中间年龄组没有受访员工表示满意。", usage: "只陈述表中0.0%满意；并不代表100%不满意，因为另有36.0%不清楚。" },
    { english: "Workload might help explain the difference, but more evidence is needed.", chinese: "工作量可能有助于解释差异，但还需要更多证据。", usage: "might表假设，不能写the table proves workload causes dissatisfaction，原表无工作量数据。" },
  ],
  checklist: ["是否点明某公司、员工、工作满意度和三个年龄组？", "是否准确区分≤40、41—50和>50的年龄边界？", "是否写出中间组64.0%不满最高、年长组40.0%满意最高，并涵盖不清楚一列？", "是否保留精确数值，不把本表当年份变化趋势？", "是否区分比例与人数，未把0%满意译成100%不满意？", "是否有评论与可执行建议，并将可能原因标为假设？", "是否至少150词，无书信称呼署名和自动得分宣称？"],
  pitfalls: ["将原图不清楚一列混入满意或不满意。", "把≤40写成under 40、把>50写成50 and above，错改边界。", "说员工随着年龄增长满意度持续上升：表格是分组截面，且中间组满意率为0。", "把40.0%写成多数年长员工满意，或把0.0%满意写成全员不满意。", "没有组人数却比较绝对人数，没有年份却编造年度增长。", "将工作压力、薪酬、家庭负担等说成原表已经证明的原因。", "为所有公司下结论，或把教学范文当唯一标准答案与真题词频。"],
  chart: {
    format: "table", src: "/exams/2012-writing-b-original.jpg", width: 644, height: 329,
    alt: "原卷表格：某公司员工工作满意度调查。列依次为满意、不清楚、不满意。≤40岁为16.7%、50.0%、33.3%；41—50岁为0.0%、36.0%、64.0%；>50岁为40.0%、50.0%、10.0%。",
    note: "用户原卷图片原样保留；表中年龄边界与九个百分数均清晰可读，文字说明采用原图精确值，不涉及年份轴。",
    caption: "某公司员工工作满意度调查（原图精确百分数）",
    columns: ["年龄组", "满意", "不清楚", "不满意"],
    rows: [ { label: "≤40岁", values: ["16.7%", "50.0%", "33.3%"] }, { label: "41—50岁", values: ["0.0%", "36.0%", "64.0%"] }, { label: ">50岁", values: ["40.0%", "50.0%", "10.0%"] } ],
  },
}];
