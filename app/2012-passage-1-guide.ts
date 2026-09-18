import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `2012-p1-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });
export const passage2012P1Paragraphs = [[1,2,3], [4,5,6,7], [8,9,10,11,12], [13,14,15,16], [17,18]].map((numbers, index) => ({ id: `2012-p1-paragraph-${index + 1}`, sentenceIds: numbers.map(s) }));
export const passage2012P1Guide: ArticleGuide = {
  practice: [
    { id: "policy-target", revision: 1, kind: "choice", prompt: "首段10%政策直接限制什么？", options: ["作业在成绩中的权重", "学生每天做作业的时间", "高级课程布置作业的次数"], answer: "作业在成绩中的权重", evidence: "count for more than 10% of a student's academic grade", feedback: "count for接academic grade百分比；原文没有规定作业量，且部分高级课程是上限规则的例外。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(3), taskId: "weight-exception" }] },
    { id: "value-first", revision: 1, kind: "choice", prompt: "第4段两个相反的if共同要求先弄清什么？", options: ["作业是否具有教育价值", "作业应该由谁邮寄", "所有学生是否喜欢同一科目"], answer: "作业是否具有教育价值", evidence: "if homework matters", feedback: "无益则减量或取消，有益则赋予合理权重。两种建议的共同前提是教育价值，不是用已规定的分数比例代替价值判断。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(14), taskId: "value-condition" }, { sentenceId: s(15), taskId: "value-before-weight" }] },
    { id: "argument-route", revision: 1, kind: "order", prompt: "按原文顺序重建五段论证。", options: ["介绍批评背景与具体计分政策", "承认善意初衷并指出公平处理的风险", "检验低权重的激励和一刀切后果", "追问教育价值、质量与批改量", "建议暂缓、调查并保留改正空间"], answer: JSON.stringify(["介绍批评背景与具体计分政策", "承认善意初衷并指出公平处理的风险", "检验低权重的激励和一刀切后果", "追问教育价值、质量与批改量", "建议暂缓、调查并保留改正空间"]), evidence: "The homework rules should be put on hold", feedback: "中心始终是具体政策的缺陷：从政策介绍到批评依据，再提出改进。棘手问题只是其中一段，不能用局部代替全文标题。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["policy-target", "value-first"], leaksToTasks: [{ sentenceId: s(3), taskId: "weight-exception" }, { sentenceId: s(15), taskId: "value-before-weight" }, { sentenceId: s(17), taskId: "hold-not-cancel" }] },
  ],
  route: ["介绍批评背景与具体计分政策", "承认善意初衷并指出公平处理的风险", "检验低权重的激励和一刀切后果", "追问教育价值、质量与批改量", "建议暂缓、调查并保留改正空间"],
  mainIdea: "作者批评洛杉矶联合学区将作业权重一律压到10%以内的僵化办法：它可能削弱完成动力，忽视教育价值和质量判断，也未真正解决困难学生的公平问题。结尾主张暂缓调查并改正，不是取消一切作业。",
  paragraphs: [
    { paragraphId: "2012-p1-paragraph-1", title: "作业批评与新政策", summary: "先写近年来对作业的轻视，再介绍洛杉矶学区的计分上限；Unfortunately与inflexible明确作者立场。", relation: "从全国背景收束到具体政策，设定全文批评对象。" },
    { paragraphId: "2012-p1-paragraph-2", title: "初衷与标准不可混淆", summary: "政策想帮助家庭困难学生；作者承认不应布置难以独立完成的作业，却警惕把照顾困难变成降低要求。", relation: "先认可合理目标，再指出执行方式及其暗示的问题，不把贫困等同能力不足。" },
    { paragraphId: "2012-p1-paragraph-3", title: "允许布置不等于有动力完成", summary: "管理者称教师可自行布置数量；低权重使少做作业代价很小。作业仍可能有益，而统一规定又挤压具体教学判断。", relation: "用实际激励和学生差异检验政策辩护，展开一刀切的后果。" },
    { paragraphId: "2012-p1-paragraph-4", title: "先判断价值，再定数量和权重", summary: "无益则减少或取消，有益则给予合理权重；政策还未保障适宜、有意义且教师愿意批改的作业量。", relation: "从政策造成的后果转向它没有回答的实质问题。" },
    { paragraphId: "2012-p1-paragraph-5", title: "暂缓调查，仍可补救", summary: "建议先暂停规则，由董事会调查并公开听证；结尾保留把作业政策做好的机会。", relation: "在批评具体政策后提出程序性改进，而非宣告作业本身应被废除。" },
  ],
  sentenceRoles: Object.fromEntries([
    "指出近年来对作业的负面态度加重。", "由全国学区引入洛杉矶的最新例子。", "说明10%计分上限及例外，并直接表达负面评价。", "承认帮助困难学生的政策初衷。", "用模糊和矛盾概括政策缺陷。", "认可不应布置学生难以独立或低成本完成的作业。", "警惕以家庭贫困为由降低要求的政策暗示。", "转述管理者对作业地位和教师布置量的辩护。", "用少做一半而分数差很小说明激励不足。", "反问既做作业又考好的学生，反对片面推断。", "提出作业很可能有帮助的解释，保留可能性。", "批评未赋权教师因材判断而强推统一规定。", "提出政策遗漏实质问题的段落中心。", "在无教育价值的条件下建议减少或取消作业。", "在有教育价值的条件下要求合理计分权重。", "补充作业质量、适宜性及愿意批改量的保障缺口。", "建议暂停规则并调查听证。", "表示仍能补救，以do homework的双关收束。",
  ].map((role, index) => [s(index + 1), role])),
  references: [
    { expression: "it", sentenceId: s(1), referent: "Homework", targetSentenceIds: [s(1)], explanation: "后半句被轻视的对象仍是家庭作业。" },
    { expression: "this educational ritual", sentenceId: s(2), referent: "家庭作业这一惯例", targetSentenceIds: [s(1)], explanation: "重新思考惯例，不等于惯例已消失。" },
    { expression: "This rule", sentenceId: s(4), referent: "前句10%作业成绩权重上限", targetSentenceIds: [s(3)], explanation: "不是指不布置任何作业。" },
    { expression: "it", sentenceId: s(7), referent: "the district及其政策做法", targetSentenceIds: [s(7)], explanation: "学区的做法接近某种危险暗示，it不是贫困学生。" },
    { expression: "it", sentenceId: s(8), referent: "homework", targetSentenceIds: [s(8)], explanation: "不可数作业量用much，不能指学生人数。" },
    { expression: "they", sentenceId: s(8), referent: "teachers", targetSentenceIds: [s(8)], explanation: "教师想布置多少就可以布置多少。" },
    { expression: "It", sentenceId: s(11), referent: "形式主语，对应that the homework helped", targetSentenceIds: [s(11)], explanation: "不指一个实体；被评价的是作业有帮助这一命题。" },
    { expression: "it", sentenceId: s(14), referent: "the district", targetSentenceIds: [s(14)], explanation: "采取减量措施的施事是学区。" },
    { expression: "them", sentenceId: s(14), referent: "the assignments", targetSentenceIds: [s(14)], explanation: "make的宾语及count的逻辑主语都是作业，不是学生。" },
    { expression: "it", sentenceId: s(15), referent: "homework", targetSentenceIds: [s(15)], explanation: "应占较大成绩份额的是作业；与上句it不同。" },
    { expression: "their age", sentenceId: s(16), referent: "学生的年龄", targetSentenceIds: [s(16)], explanation: "适宜性评价针对接受作业的学生。" },
    { expression: "they", sentenceId: s(16), referent: "teachers", targetSentenceIds: [s(16)], explanation: "愿意检查批改的是教师；不要因同句their指学生就强行统一。" },
    { expression: "which", sentenceId: s(17), referent: "the school board", targetSentenceIds: [s(17)], explanation: "负责制定政策的职责属于董事会。" },
    { expression: "It", sentenceId: s(18), referent: "形式主语，对应for L.A. Unified to do homework right", targetSentenceIds: [s(18)], explanation: "评价学区补救的时机，不能译成某件物品太晚。" },
  ],
  timeline: [
    { label: "长期与近年", event: "前半句现在完成时概括作业一直不太受欢迎，in recent years只限定后半句轻视加重；文中没有给出具体起年。", evidence: [e(1, "has never been terribly popular", "长期状态"), e(1, "in recent years", "较近期范围")] },
    { label: "文中政策现在", event: "has produced表示政策已出台，are revising表示各学区正在重新考虑；这些是文章当时的状态，不能当作今天仍执行的规则。", evidence: [e(2, "are revising their thinking", "进行中的反思"), e(3, "has produced an inflexible policy", "已经出台的政策")] },
    { label: "建议的下一阶段", event: "作者建议在调查听证期间暂缓规则，并指出现在仍来得及改正；未给出调查日程或实施截止日。", evidence: [e(17, "should be put on hold", "建议暂缓"), e(17, "while the school board", "调查期间"), e(18, "not too late", "仍可补救")] },
  ],
  voices: [
    { speaker: "学区管理者", claim: "作业仍是学校教育的一部分，教师可自行决定布置量。", boundary: "say明确标出转述；作者下一句用But指出低计分权重造成的激励问题。", evidence: [e(8, "District administrators say", "说话者"), e(8, "teachers are allowed to assign as much of it as they want", "政策辩护")] },
    { speaker: "作者对初衷的承认", claim: "帮助家庭困难学生有合理目标，不应布置学生做不来或必须依赖昂贵设备的作业。", boundary: "承认目标与合理限制，不等于赞成以低权重处理所有学生，也不等于主张取消全部作业。", evidence: [e(4, "is meant to address the difficulty", "政策目的"), e(6, "that students cannot complete on their own", "合理限制")] },
    { speaker: "作者的批评与建议", claim: "政策僵化、自相矛盾，教育价值和保障措施未解决，应暂缓并调查。", boundary: "If两分支是假设论证；quite possible仍是可能解释；不能把它们当成已证实的必然因果。", evidence: [e(3, "Unfortunately", "评价"), e(5, "unclear and contradictory", "直接批评"), e(17, "should be put on hold", "改进建议")] },
  ],
};
