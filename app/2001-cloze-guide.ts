import type { ArticleGuide } from "./article-teaching";
const sid = (n: number) => `2001-cloze-s${n}`;
const e = (n: number, quote: string, role: string) => ({ sentenceId: sid(n), quote, role });
export const cloze2001Guide: ArticleGuide = {
 route: ["提出禁令及两项法案内容", "报告依据与解释权争议", "说明权利并保证新闻自由", "回溯付费证人的司法风险"],
 mainIdea: "本文报道英国政府拟禁止媒体向证人付费并限制庭前报道，介绍自律不足的依据、法官解释权争议及大法官的保证，最后回溯证人付费可能影响证词和裁决的担忧。它是历史报道，不是现行法律指南。",
 paragraphs: [
  { paragraphId: "2001-cloze-paragraph-1", title: "拟禁止付费", summary: "提出政府拟禁止报纸买断重大案件证人独家讲述的措施。", relation: "开篇给出新闻事件。" },
  { paragraphId: "2001-cloze-paragraph-2", title: "法案两项措施", summary: "禁止证人付费，并严格控制庭前案件报道量。", relation: "把禁令展开为法律草案内容。" },
  { paragraphId: "2001-cloze-paragraph-3", title: "自律不足的依据", summary: "大法官在信中赞同委员会报告对自律不足的判断。", relation: "解释为什么加强外部监管。" },
  { paragraphId: "2001-cloze-paragraph-4", title: "公开信与抗议时序", summary: "信件公开于两天前的解释权表态引发抗议之后。", relation: "补充争议背景，回溯两天前。" },
  { paragraphId: "2001-cloze-paragraph-5", title: "权利与法律效力", summary: "大法官说明法案、公约的关系，以及隐私和诉讼保护。", relation: "解释前述法规安排的内容。" },
  { paragraphId: "2001-cloze-paragraph-6", title: "大法官的保证", summary: "以直接引语保证英国法官会妥善掌管新闻自由。", relation: "回应媒体担忧，保留说话者归属。" },
  { paragraphId: "2001-cloze-paragraph-7", title: "争议的案件背景", summary: "回到1995年案件及证人收款报道，说明夸大证词以促成有罪裁决的潜在风险。", relation: "末段解释禁令所回应的现实担忧。" },
 ],
 sentenceRoles: Object.fromEntries(["提出政府拟禁止的付款行为与案件例子。", "列出草案的付费禁令和庭前报道限制。", "报告自律不足的结论及Irvine的赞同。", "交代信件公开与媒体抗议的先后和解释权争议。", "说明公约效力、隐私权及公众人物的救济途径。", "引述大法官对法官可靠性的保证。", "回溯付费争议在1995年判决后的显现。", "报告证人此前收款的规模。", "说明担忧的可能证词失真与有罪裁决风险。"].map((t, i) => [sid(i+1), t])),
 references: [
  { expression: "chairman of the House of Commons media select committee", sentenceId: sid(3), referent: "Gerald Kaufman的职务", targetSentenceIds: [sid(3)], explanation: "同位语介绍收信人，不能归给Irvine。" },
  { expression: "he", sentenceId: sid(3), referent: "Lord Irvine", targetSentenceIds: [sid(3)], explanation: "said后内容中的发言人本人。" },
  { expression: "which", sentenceId: sid(3), referent: "committee report", targetSentenceIds: [sid(3)], explanation: "报告提出自律不足的结论，不是year发言。" },
  { expression: "the letter", sentenceId: sid(4), referent: "Irvine写给Kaufman的信", targetSentenceIds: [sid(3)], explanation: "公开事件接回上段介绍的信。" },
  { expression: "which", sentenceId: sid(5), referent: "the Human Rights Bill", targetSentenceIds: [sid(5)], explanation: "法案使公约在英国具有法律效力，两个文件不能混同。" },
  { expression: "themselves and their families", sentenceId: sid(5), referent: "公众人物本人及其家属", targetSentenceIds: [sid(5)], explanation: "protect执行者与themselves回指public figures。" },
  { expression: "he", sentenceId: sid(6), referent: "Lord Irvine / The Lord Chancellor", targetSentenceIds: [sid(5)], explanation: "直接保证属于大法官。" },
  { expression: "their stories", sentenceId: sid(8), referent: "证人所讲述的案情故事", targetSentenceIds: [sid(8)], explanation: "向媒体出售的叙述，与末句在法庭夸大内容形成担忧。" },
 ],
 timeline: [
  { label: "1995年的判决背景", event: "West被判刑后，证人付费成为争议；这不是写信或拟法案的精确年份。", evidence: [e(7,"was sentenced to 10 life sentences in 1995","历史事件")] },
  { label: "表态在前，公开信在后", event: "Irvine表态并引发抗议，两天后信件公开；two days不是抗议持续时间。", evidence: [e(4,"came two days after Lord Irvine caused a storm of media protest","相对时序")] },
  { label: "收款早于报道", event: "完成不定式to have received表示收款早于were said所指报道。", evidence: [e(8,"were said to have received payments","完成不定式")] },
  { label: "拟议与庭前边界", event: "政府拟提出措施；限制的是审判开始前的报道，不声称法案已通过或适用于现在。", evidence: [e(1,"is to ban","官方安排"),e(2,"will introduce a draft bill","拟提草案"),e(2,"before a trial begins","报道时间边界")] },
 ],
 voices: [
  { speaker: "委员会报告与赞同它的Irvine", claim: "行业自律没有提供充分监管。", boundary: "报告提出判断，大法官表示同意；不把委员会主席误认成大法官。", evidence: [e(3,"he agreed with a committee report","赞同关系"),e(3,"self regulation did not offer sufficient control","报告内容")] },
  { speaker: "Lord Irvine", claim: "法官应负责解释隐私法规，并能妥善掌管新闻自由。", boundary: "这是其表态和保证；文章也报道了媒体抗议，不把保证当作作者证实的普遍事实。", evidence: [e(4,"would be left to judges rather than to Parliament","解释权主张"),e(6,"Press freedoms will be in safe hands with our British judges","直接保证")] },
  { speaker: "报道中的担忧者（未具名）", claim: "证人可能受诱导夸大法庭讲述，以促成有罪裁决。", boundary: "might表示可能性，were raised未给出具体发言者，不能写成已经证实证词虚假。", evidence: [e(9,"Concerns were raised","未具名提出"),e(9,"might be encouraged exaggerate their stories","担忧与原卷字面异常")] },
 ],
 practice: [
  { id:"policy-actions", revision:1, kind:"link", prompt:"匹配政府拟议的两项措施及其对象。", links:[{source:"making payments to witnesses illegal",target:"证人收取媒体款项"},{source:"control the amount of publicity",target:"开庭前案件的报道量"}], options:["证人收取媒体款项","开庭前案件的报道量"], answer:JSON.stringify(["证人收取媒体款项","开庭前案件的报道量"]), evidence:"making payments to witnesses illegal", feedback:"两项措施并列写在bill的定语从句内；前者改变法律性质，后者限制庭前报道量，不等于禁止全部新闻自由。", conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:sid(2),taskId:"bill-two-actions"},{sentenceId:sid(2),taskId:"make-complement"},{sentenceId:sid(2),taskId:"pretrial-boundary"}] },
  { id:"event-order", revision:1, kind:"order",prompt:"还原信件公开与解释权表态的先后。",options:["Irvine发表解释权意见并引发媒体抗议","两天后信件公开","先公开信件才作解释权表态"],answer:JSON.stringify(["Irvine发表解释权意见并引发媒体抗议","两天后信件公开"]),evidence:"came two days after Lord Irvine caused a storm of media protest",feedback:"after把信件公开放在风波之后，two days给出相差时长。1995属于另一个回溯事件，不能混入这两天的排序。",conceptId:"time-reference",errorType:"tense",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:sid(4),taskId:"letter-timeline"},{sentenceId:sid(7),taskId:"sentence-time"}] },
  { id:"claim-boundaries", revision:1, kind:"link",prompt:"把三个命题按报道中的身份对应起来。",links:[{source:"自律监管不足",target:"委员会报告结论，Irvine赞同"},{source:"法官会可靠保护新闻自由",target:"Irvine的直接保证"},{source:"证人可能夸大法庭讲述",target:"未具名的担忧，非已证实事实"}],options:["委员会报告结论，Irvine赞同","Irvine的直接保证","未具名的担忧，非已证实事实"],answer:JSON.stringify(["委员会报告结论，Irvine赞同","Irvine的直接保证","未具名的担忧，非已证实事实"]),evidence:"Concerns were raised",feedback:"报道转述不同来源；said不等于作者认可全部内容，might保留担忧的可能性。",conceptId:"author-voice",errorType:"reference",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:sid(3),taskId:"voices-nesting"},{sentenceId:sid(6),taskId:"judges-voice"}] },
 ],
};
