import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `p4-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });
export const passage4Paragraphs = [[1,2,3],[4,5,6],[7,8,9,10,11,12],[13,14,15,16,17]].map((group, i) => ({ id: `p4-paragraph-${i + 1}`, sentenceIds: group.map(s) }));
export const passage4Guide: ArticleGuide = {
 mainIdea: "文章从战后日本令人羡慕的勤奋与和谐，转向年轻人、学生和工人的不满；讨论教育偏重考试和保守派的解释，再将重点移到城市化、家庭结构和生活压力。作者区分他人主张与自己的有保留归因。",
 route: ["昔日典范与当前方向迷失", "机会减少与调查中的不满", "教育问题、社会反应与被引归因", "生活方式变化及其后果"],
 paragraphs: [
  { paragraphId: "p4-paragraph-1", title: "旧形象与新问题", summary: "战后日本曾令欧美羡慕，现在工作价值观衰退；经济目标基本满足后，年轻人失去方向。", relation: "先建立正面背景，再用转折提出全文解释的问题。" },
  { paragraphId: "p4-paragraph-2", title: "机会压力与不满证据", summary: "人口及职场参与变化挤压青年机会；学生满意度调查与工人不满对比显示问题。", relation: "从抽象价值观衰退转到机会结构及可观察调查现象。" },
  { paragraphId: "p4-paragraph-3", title: "教育批评与不同主张", summary: "应试与机械学习压过创造力，引语说明忽视素质和挫败感，暴力数据引出保守派回归道德教育及部长对自由化改革的归因。", relation: "提出教育层面的机制，同时标明多位说话者，最后留下供下一段转折的归因。" },
  { paragraphId: "p4-paragraph-4", title: "生活方式的解释", summary: "作者转向生活方式；教育者谈忍耐，城市集中化使社区和大家庭让位于小家庭，传统价值弱化后通勤和拥挤显出后果，离婚与自杀增加。", relation: "用But从部长的解释转向作者更侧重的社会生活变化，并给出过程和后果。" },
 ],
 sentenceRoles: Object.fromEntries([
  "交代战后日本在欧美眼中的正面形象，反衬后文。", "用But提出工作道德价值观衰退的趋势。", "对照十年前勤奋与当下经济满足后的方向迷失。", "说明人口及职场结构变化如何限制青少年机会。", "用各国学生的学校满意比例作比较证据。", "补充工人表达工作不满的人数对照。", "让步承认重基础受赞，指出应试和机械学习的偏重。", "引述海部俊树，列举分数无法体现而被忽视的素质。", "延续引语，指出挫败感导致辍学与失控的方向。", "用校园暴力及其袭击教师子类的数字展现问题。", "报道保守派领导人寻求恢复战前道德教育。", "引述部长对自由化改革的归因，并说明引起惊讶。", "作者转折，提出生活方式可能更加相关。", "引述教育者对重忍耐而轻快乐的观察。", "解释经济增长、城市集中化与家庭结构替换。", "连接价值观弱化与原本长期忍受的不适开始显效。", "列出离婚率和自杀事件的自身增幅，并保留国家间水平差异。",
 ].map((role, i) => [s(i+1), role])),
 references: [
  { expression: "whose", sentenceId: s(1), referent: "the postwar Japan", targetSentenceIds: [s(1)], explanation: "说明生产力与社会和谐属于日本。" },
  { expression: "its", sentenceId: s(3), referent: "Japan", targetSentenceIds: [s(3)], explanation: "economic needs是国家的经济需求。" },
  { expression: "who", sentenceId: s(4), referent: "teen-agers", targetSentenceIds: [s(4)], explanation: "青少年在质疑牺牲，不是机会在质疑。" },
  { expression: "their counterparts", sentenceId: s(6), referent: "其他受调查国家与日本工人相对应的工人", targetSentenceIds: [s(6)], explanation: "对应相同群体作数量比较，非日本学生。" },
  { expression: "its", sentenceId: s(7), referent: "Japanese education", targetSentenceIds: [s(7)], explanation: "重视基础的主体是日本教育。" },
  { expression: "this kind of thing", sentenceId: s(9), referent: "应试教育中忽视非分数素质的做法", targetSentenceIds: [s(7),s(8)], explanation: "把挫败感接回前面被批评的教育取舍。" },
  { expression: "he", sentenceId: s(12), referent: "Mitsuo Setoyama", targetSentenceIds: [s(12)], explanation: "改革削弱道德是部长argued的内容。" },
  { expression: "that", sentenceId: s(13), referent: "前文讨论的道德衰退与不满问题", targetSentenceIds: [s(2),s(9),s(12)], explanation: "概括问题后提出更侧重生活方式的解释，不把that指成改革这一主张已获证实。" },
  { expression: "the discomfort", sentenceId: s(16), referent: "漫长通勤和拥挤生活条件造成的不适", targetSentenceIds: [s(16)], explanation: "不适长期存在，传统支持弱化后影响更明显。" },
  { expression: "that of the United States", sentenceId: s(17), referent: "美国的离婚率", targetSentenceIds: [s(17)], explanation: "that替代divorce rate，保留国家间相同指标。" },
 ],
 timeline: [
  { label: "过去与当前青年状态", event: "十年前工作是人生目标，如今经济需求大体满足后方向感减弱；均是原文相对时间。", evidence: [e(3,"Ten years ago young people were hardworking","过去状态"),e(3,"but now Japan has largely fulfilled its economic needs","当前背景")] },
  { label: "战后改革与去年部长表态", event: "二战后引入改革，其被声称的道德影响早于部长去年表态；两者属于不同叙事层。", evidence: [e(12,"after World War II","改革时期"),e(12,"had weakened","被转述的先前影响"),e(12,"Last year Mitsuo Setoyama","表态时间")] },
  { label: "长期承受与近十年变化", event: "长期承受并不代表没有痛苦；末句统计近十年的变化，未给出绝对人数。", evidence: [e(16,"have long endured","持续承受"),e(17,"In the past decade","统计时间范围")] },
 ],
 voices: [
  { speaker: "海部俊树", claim: "考试分数之外的素质被忽视，挫败感使孩子辍学失控。", boundary: "引语是对教育取舍的批评；第9句因果不能倒置。", evidence: [e(8,"says Toshiki Kaifu","发言来源"),e(9,"Frustration against this kind of thing leads kids to drop out and run wild","因果主张")] },
  { speaker: "保守派领导人与部长", claim: "主张恢复战前道德教育；部长认为美国占领当局引入的自由化改革削弱尊重父母的道德。", boundary: "这些是被报道的主张；raised eyebrows显示引发反应，作者随后用But转向生活方式，不直接认证部长因果。", evidence: [e(11,"many conservative leaders are seeking a return","群体主张"),e(12,"he argued that liberal reforms","个人归因")] },
  { speaker: "教育家Yoko Muro", claim: "日本人考虑的是能忍受多少，而非是否享受工作与生活。", boundary: "用never与but only构成尖锐对照，是被引观察，不据此给全人口统计结论。", evidence: [e(14,"says educator Yoko Muro","发言来源"),e(14,"but only how much you can endure","对照重点")] },
  { speaker: "作者", claim: "问题可能更多与生活方式、城市集中化和传统家庭支持弱化有关。", boundary: "may和more保留相对、可能判断；Western values是第24题选项的较间接概括，并非作者在该句直接措辞。", evidence: [e(13,"may have more to do with Japanese life-styles","作者转向"),e(15,"in favor of isolated, two-generation households","结构变化"),e(16,"the discomfort is beginning to tell","不适后果")] },
 ],
 practice: [
  { id: "four-stage-route", revision:1, kind:"order", prompt:"把原卷四段的作用排回顺序。", options:["昔日形象与当下迷惘","机会变化和调查不满","教育批评与被引归因","生活方式解释与后果"], answer: JSON.stringify(["昔日形象与当下迷惘","机会变化和调查不满","教育批评与被引归因","生活方式解释与后果"]), evidence:"But that may have more to do with Japanese life-styles", feedback:"先提出今昔反差，再给机会和调查现象；第三段讨论教育及他人归因，第四段But转向生活方式。", conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["author-turn"] },
  { id:"author-turn",revision:1,kind:"choice",prompt:"作者用But把解释重心转到哪里？",options:["日本生活方式与社会结构变化","无条件同意部长的唯一归因","日本离婚率已经超过美国"],answer:"日本生活方式与社会结构变化",evidence:"But that may have more to do with Japanese life-styles",feedback:"部长说改革削弱道德，作者则以may have more to do with转向生活方式，后文补城市化、家庭变化与长期不适的后果。",conceptId:"author-voice",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(12),taskId:"minister-claim"},{sentenceId:s(13),taskId:"qualified-cause"}]},
  { id:"cause-evidence",revision:1,kind:"choice",prompt:"末段怎样支撑生活方式的解释？",options:["结构变化、价值观弱化与不适后果形成一条线","只用美国离婚率超过日本说明日本更幸福","直接证明女性不参加社会活动"],answer:"结构变化、价值观弱化与不适后果形成一条线",evidence:"as the old group and family values weaken, the discomfort is beginning to tell",feedback:"城市集中化让旧社区和大家庭让位于小家庭，传统支持弱化后不适显效；离婚率虽仍低于美国却有自身增长。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(15),taskId:"replacement-direction"},{sentenceId:s(16),taskId:"tell-effect"},{sentenceId:s(17),taskId:"level-growth"}]},
 ],
};
