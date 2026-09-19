import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `p1-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });
export const passage2000P1Paragraphs = [[1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11, 12, 13], [14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25]].map((ns, i) => ({ id: `p1-paragraph-${i + 1}`, sentenceIds: ns.map(s) }));
export const passage2000P1Guide: ArticleGuide = {
  mainIdea: "美国战后的优势在外国竞争下缩小，引发反省，随后经济复苏；作者以成功可能成为包袱也可能成为动力统领全文，同时警惕复苏后的盲目自豪。不能把末尾三人的自我肯定全部当作作者的归因。",
  route: ["战后优势与成功的双重作用", "外国竞争造成工业失势", "经济危机引发信心与调查变化", "复苏及由自疑转向盲目自豪"],
  paragraphs: [
    { paragraphId: "p1-paragraph-1", title: "成功未必永远有利", summary: "开头提出成功可能是负担或动力，再介绍战后市场、科技、劳动力和竞争者受损带来的美国优势。", relation: "总论加历史起点，为下一段领先地位缩小作准备。" },
    { paragraphId: "p1-paragraph-2", title: "优势退却，行业受压", summary: "别国变富使美国优势不可避免地缩小；电子、汽车、纺织、机床和半导体展示压力的范围，时态区分已发生损失与当时预测。", relation: "从繁荣转入衰退，产业例证支撑下一段信心危机。" },
    { paragraphId: "p1-paragraph-3", title: "从习以为常到自我怀疑", summary: "行业失势引发信心危机，人们不再把繁荣视为当然，对经营方法和收入感到担忧，开展连续调查。", relation: "All of this总结前段事实，转向心理与反省。原卷此段跨页，分页不构成新段。" },
    { paragraphId: "p1-paragraph-4", title: "复苏之后的观点分歧", summary: "1995年回看美国增长，与日本困境对比；作者提及显然的经济因素并用blind pride批评心态，随后列出三人的工业和管理自豪。", relation: "How...!明确转折；经济变化呼应开头，后续引语体现需辨别的观点归属。" },
  ],
  sentenceRoles: Object.fromEntries([
    "提出总论：成功的作用取决于如何应对。", "交代战后市场规模带来的工业优势。", "补充科学家与技术工人的优势。", "以欧亚经济遭战乱破坏衬托美国繁荣。", "解释别国变富后美国领先幅度缩小的必然性。", "指出优势退却虽必然却很痛苦。", "概括到80年代中期的工业竞争焦虑。", "举出行业萎缩和消失的真实损失。", "将电视制造商缩减落实到数量和名称。", "括号补充作者写作时连最后一家也被外企收购。", "说明外国汽车和纺织品进入美国市场。", "以拳击比喻机床业的危境。", "再补半导体业当时看来可能受损的前景，区别预测与既成事实。", "概括前段行业危机并说明其信心后果。", "指出对繁荣的理所当然心态消退。", "呈现对经营方式和未来收入的担忧。", "介绍连续调查工业衰退原因的行动。", "说明调查警告海外竞争的增强。", "感叹式转折，把叙事从危机带到复苏。", "以美国增长和日本挣扎形成对照。", "提出美元和周期等经济因素，同时限制美国人的归因态度。", "由作者评价自疑已变成盲目自豪。", "引述Cavanaugh对工业结构、精简和敏捷性的肯定。", "引述Moore因企业生产率提升产生的国家自豪。", "引述Sahlman对管理黄金时代的将来评价。",
  ].map((role, i) => [s(i + 1), role])),
  references: [
    { sentenceId: s(1), expression: "it", referent: "长期轻易取得成功的经历", targetSentenceIds: [s(1)], explanation: "成为障碍和动力的是同一成功经历。" },
    { sentenceId: s(2), expression: "such", referent: "长期轻易获得成功的状态", targetSentenceIds: [s(1)], explanation: "such将历史例子接回总论。" },
    { sentenceId: s(5), expression: "this primacy", referent: "美国战后经济领先地位", targetSentenceIds: [s(2), s(3), s(4)], explanation: "this概括优势；句首It另是形式主语。" },
    { sentenceId: s(7), expression: "themselves", referent: "Americans", targetSentenceIds: [s(7)], explanation: "发现者和处于困惑状态者相同。" },
    { sentenceId: s(10), expression: "none", referent: "没有一家美国电视制造商", targetSentenceIds: [s(9)], explanation: "承接maker这一类别，不等于全球再无电视机。" },
    { sentenceId: s(13), expression: "which", referent: "semiconductors", targetSentenceIds: [s(13)], explanation: "两处关系词指相同对象，一处作宾语一处作主语。" },
    { sentenceId: s(14), expression: "All of this", referent: "前段工业竞争力衰退的整体情况", targetSentenceIds: [s(7), s(8), s(9), s(11), s(12), s(13)], explanation: "是概括事件的指代，不能只接最近名词casualty。" },
    { sentenceId: s(16), expression: "They", referent: "美国人", targetSentenceIds: [s(15)], explanation: "经营方式失效和收入下降都是他们开始相信的内容。" },
    { sentenceId: s(18), expression: "Their", referent: "一项又一项调查", targetSentenceIds: [s(17)], explanation: "findings是调查发现，不是‘工业的发现’。" },
    { sentenceId: s(21), expression: "this", referent: "美国经济的稳健增长与复苏", targetSentenceIds: [s(20)], explanation: "是attribute的被解释现象，不是原因。" },
    { sentenceId: s(24), expression: "me", referent: "Stephen Moore", targetSentenceIds: [s(24)], explanation: "直接引语中的我属于被引者，不是作者。" },
    { sentenceId: s(25), expression: "this period", referent: "作者所谈的近期经济复苏时期", targetSentenceIds: [s(19), s(20)], explanation: "将来的look back回看这一时期，不指战后优势的起点。" },
  ],
  timeline: [
    { label: "二战结束后", event: "美国拥有巨大的市场和科技劳动力优势；欧亚竞争者的经济此前被战争破坏。", evidence: [e(2, "after the end of the Second World War", "战后起点"), e(4, "the war had destroyed", "更早的破坏")] },
    { label: "到80年代中期与1987年", event: "竞争力焦虑、行业萎缩与连续调查相继呈现；1987电视制造商只剩一家。", evidence: [e(7, "By the mid-1980s", "焦虑时点"), e(9, "By 1987", "数量时点"), e(17, "The mid-1980s", "调查背景")] },
    { label: "当时的预测", event: "半导体制造业似乎将成为下一受害者，人们担心收入将下跌。两处未来判断不改成已经实现的事实。", evidence: [e(13, "was going to be the next casualty", "行业前景"), e(16, "would therefore shortly begin to fall", "过去视角的未来")] },
    { label: "1995年的回顾", event: "美国回顾五年稳健增长，日本则一直挣扎；这些现在时和完成时的参照是文中当前，不是读者今天。", evidence: [e(20, "In 1995", "明确观察点"), e(20, "five years of solid growth", "回顾区间")] },
    { label: "将来的回望", event: "Sahlman预测将来人们会将此时期看作管理黄金时代；原文没有提供这个评价将发生的具体年份。", evidence: [e(25, "people will look back on this period", "被引者预测")] },
  ],
  voices: [
    { speaker: "作者", claim: "成功可能成为障碍也可能成为动力；复苏有明显经济因素，当前心态已由自疑转为盲目自豪。", boundary: "if保留成功转成动力的条件；blind为作者批评。作者并未简单照收后续三人的自我肯定。", evidence: [e(1, "if properly handled", "条件"), e(21, "such obvious causes", "归因措辞"), e(22, "blind pride", "评价")] },
    { speaker: "80年代的美国人", claim: "担忧经营方式正在失效且收入将很快下降。", boundary: "believe报告一种看法，would描述未来担忧，不等于作者证实所有收入都下降。", evidence: [e(16, "They began to believe", "认知来源")] },
    { speaker: "Richard Cavanaugh", claim: "工业改变结构、瘦身并变得敏捷。", boundary: "according to明确引语来源；不能只见structure就当作作者的最终归因。", evidence: [e(23, "according to Richard Cavanaugh", "引语来源")] },
    { speaker: "Stephen Moore", claim: "看到企业提升生产率，使他为美国人身份自豪。", boundary: "me和our属于Moore的声音，think-tank解释其机构。", evidence: [e(24, "It makes me proud", "个人感受"), e(24, "says Stephen Moore", "报道来源")] },
    { speaker: "William Sahlman", claim: "预言该时期会被看成美国企业管理黄金时代。", boundary: "believes和will双重限定：被引者的判断与未来评价，不是作者既定结论。", evidence: [e(25, "believes that people will look back", "归属与时间")] },
  ],
  practice: [
    { id: "conditional-success", revision: 1, kind: "choice", prompt: "第一句如何限制‘成功会成为发展动力’这一说法？", options: ["处理得当才可能转为动力", "任何长期成功必定持续带来进步", "只要劳动力多就自动成功"], answer: "处理得当才可能转为动力", evidence: "if properly handled", feedback: "if引出条件，may保留可能性；原文从未保证成功自动带来下一次成功。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(1), taskId: "success-conditions" }] },
    { id: "author-voice", revision: 1, kind: "choice", prompt: "末段哪一表述最能显示作者与三位自豪者之间的距离？", options: ["blind pride", "a golden age", "makes me proud"], answer: "blind pride", evidence: "Self-doubt has yielded to blind pride", feedback: "blind是作者加在pride前的评价；黄金时代和个人自豪则有明确被引者。", conceptId: "author-voice", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(22), taskId: "yield-direction" }, { sentenceId: s(23), taskId: "cavanaugh-voice" }] },
    { id: "paragraph-route", revision: 1, kind: "order", prompt: "按原卷四段重建发展路线。", options: ["战后优势与成功的双重作用", "外国竞争造成工业失势", "经济危机引发信心与调查变化", "复苏及由自疑转向盲目自豪"], answer: JSON.stringify(["战后优势与成功的双重作用", "外国竞争造成工业失势", "经济危机引发信心与调查变化", "复苏及由自疑转向盲目自豪"]), evidence: "How things have changed!", feedback: "首段给总论与优势，次段写失势，第三段转信心与调查，末段回到复苏和评价。跨页的第三段仍是一段。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(14), taskId: "all-this" }, { sentenceId: s(19), taskId: "exclamation" }] },
  ],
};
