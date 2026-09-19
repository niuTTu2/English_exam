import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `2001-p2-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });
const route = ["承认鸿沟与危险，转向积极力量", "以商业和政府动力说明缩小趋势", "承认非唯一工具，保留巨大潜力", "借美国史论证利用外资并坚持监管"];
export const passage2001P2Guide: ArticleGuide = {
  practice: [
    { id: "optimistic-forces", revision: 1, kind: "link", prompt: "匹配第二段支持接入普及的两种动力。", links: [{ source: "商业利益", target: "更多用户意味着更多潜在顾客" }, { source: "政府担忧", target: "避免本国在发展中落后" }], options: ["更多用户意味着更多潜在顾客", "避免本国在发展中落后"], answer: JSON.stringify(["更多用户意味着更多潜在顾客", "避免本国在发展中落后"]), evidence: "the more people online, the more potential customers there are", feedback: "第7句解释企业扩大用户的利益，第8句解释政府的推广动机；共同支持作者第10句的缩小预测，不等于鸿沟已消失。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(7), taskId: "customer-correlation" }, { sentenceId: s(8), taskId: "fear-content" }] },
    { id: "fund-build-own", revision: 1, kind: "link", prompt: "将美国历史案例的资金、建设和当前所有权分别匹配。", links: [{ source: "提供资金", target: "前述欧洲投资者" }, { source: "建造设施", target: "移民出身的美国人" }, { source: "叙述时拥有设施", target: "美国人" }], options: ["前述欧洲投资者", "移民出身的美国人", "美国人"], answer: JSON.stringify(["前述欧洲投资者", "移民出身的美国人", "美国人"]), evidence: "They financed them.", feedback: "financed、built和owns依次分清角色与时间；借外资不自动等于永久失去所有权，例子服务于接受外资的政策。", conceptId: "passage-route", errorType: "reference", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(18), taskId: "funding-not-ownership" }, { sentenceId: s(20), taskId: "finance-roles" }, { sentenceId: s(21), taskId: "builders" }, { sentenceId: s(23), taskId: "answer-focus" }] },
    { id: "paragraph-route", revision: 1, kind: "order", prompt: "把原卷四段论证排回顺序。", options: route, answer: JSON.stringify(route), evidence: "There are reasons to be optimistic", feedback: "先定义并承认问题，再说明乐观依据；第三段限制唯一性，末段转到如何利用工具，通过外资案例并用监管边界收束。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(14), taskId: "potential-limit" }, { sentenceId: s(26), taskId: "regulation-boundary" }] },
  ],
  route,
  mainIdea: "作者承认数字鸿沟及其危险，但认为商业利益和政府推广提供缩小差距的积极力量。互联网并非唯一扶贫工具，却有巨大潜力；贫困国家应克服外资偏见、利用投资建设电子基础设施，同时保持必要监管。",
  paragraphs: [
    { paragraphId: "2001-p2-paragraph-1", title: "危险之外看积极力量", summary: "定义信息资源贫富差距，承认其确实存在并曾被预警；随后转向早先不够明显的积极力量，提出乐观理由。", relation: "however由风险转入积极变化；positive修饰缩小鸿沟的力量，不评价鸿沟本身。" },
    { paragraphId: "2001-p2-paragraph-2", title: "普及接入的两种动力", summary: "企业希望扩大潜在顾客，政府希望避免掉队；作者由此预测接入增加、鸿沟缩小，并将互联网视为很有潜力的扶贫工具。", relation: "展开上一段的乐观理由，再用As a result给出作者预测，用because说明为何是好消息。" },
    { paragraphId: "2001-p2-paragraph-3", title: "承认限制，继续肯定", summary: "互联网不是消除贫困的唯一方法，也非唯一工具，但仍具有巨大潜力。", relation: "Of course承认非唯一性，But转回潜力；此限制不能被读成互联网毫无作用。" },
    { paragraphId: "2001-p2-paragraph-4", title: "利用外资与监管边界", summary: "针对外资侵犯主权的担忧，作者用美国工业设施由外资融资、美国人建设和拥有的历史支持接受投资，再推广到电子基础设施，并明确反对无监管经营。", relation: "从工具价值转到使用条件；美国案例为政策论点服务，末尾doesn't mean/does mean区分误解与正面主张。" },
  ],
  sentenceRoles: Object.fromEntries(["界定数字鸿沟并说明受到关注。", "强调鸿沟当前确实存在。", "回顾作者与妻子曾经预警危险。", "转向当时不明显、如今发挥作用的积极力量。", "明确提出乐观的立场。", "引入技术相关的缩小理由。", "用商业利益和潜在顾客数量解释普及动力。", "补充政府因担忧落后而推广接入的动机。", "预测未来联网人数与期限，不作为现今统计。", "由前述动力作出鸿沟缩小而非扩大的判断。", "用互联网的扶贫潜力解释为何是好消息。", "承认使用互联网不是唯一扶贫方法。", "进一步承认互联网不是唯一工具。", "转回肯定其巨大潜力，形成限定中的支持。", "提出贫困国家需克服针对外资的过时偏见。", "把侵犯主权的看法归给某些国家，并建议考察美国史。", "说明美国建设时本国资本不足这一前因。", "说明因此借外国投资建设工业基础设施。", "交代四国投资者及资金流向。", "明确前述投资者承担融资角色。", "明确移民美国人承担建设角色。", "用设问把焦点转到现在的所有权。", "以美国人这一短答说明最终本国拥有。", "提出美国经验原则可推广到其他国家。", "把论证推进到外资帮助电子基础设施与经济处境。", "排除受骗和放任外企失控的误解。", "肯定外企对必要能源和电信设施建设的重要作用。"].map((role, i) => [s(i + 1), role])),
  references: [
    { expression: "that divide", sentenceId: s(2), referent: "数字鸿沟", targetSentenceIds: [s(1)], explanation: "that为名词前的指示限定词。" },
    { expression: "this looming danger", sentenceId: s(3), referent: "信息资源差距带来的数字鸿沟危险", targetSentenceIds: [s(1), s(2)], explanation: "危险评价落在divide，成为第25题防范态度的依据。" },
    { expression: "then", sentenceId: s(4), referent: "作者夫妇演讲的二十年前", targetSentenceIds: [s(3)], explanation: "与目前逐渐显现的积极力量对照。" },
    { expression: "it", sentenceId: s(7), referent: "后置的to universalize access（形式主语占位）", targetSentenceIds: [s(7)], explanation: "不回指Internet；真正被评价的是普及接入。" },
    { expression: "that", sentenceId: s(11), referent: "数字鸿沟将缩小这一预测", targetSentenceIds: [s(10)], explanation: "这是好消息，而不是鸿沟本身是好消息。" },
    { expression: "it", sentenceId: s(14), referent: "互联网", targetSentenceIds: [s(12), s(13)], explanation: "承认不是唯一工具后，仍肯定同一工具的潜力。" },
    { expression: "this tool", sentenceId: s(15), referent: "互联网", targetSentenceIds: [s(11), s(13)], explanation: "引入外资建设，是为利用此前谈到的工具。" },
    { expression: "their sovereignty", sentenceId: s(16), referent: "持有外资偏见的国家的主权", targetSentenceIds: [s(16)], explanation: "这是这些国家所担忧的内容，非作者认可的结论。" },
    { expression: "to do so", sentenceId: s(17), referent: "建设美国工业基础设施", targetSentenceIds: [s(17)], explanation: "do so代替前述动作，不是因果连词。" },
    { expression: "that", sentenceId: s(18), referent: "美国缺少本国建设资本这一事实", targetSentenceIds: [s(17)], explanation: "that is why由已知原因接后续结果。" },
    { expression: "Britain’s former colony", sentenceId: s(19), referent: "美国", targetSentenceIds: [s(17), s(18)], explanation: "former表示过去的殖民地，不表示当时仍在殖民统治下。" },
    { expression: "They", sentenceId: s(20), referent: "前句四国投资者", targetSentenceIds: [s(19)], explanation: "融资者与下一句的建造者在叙述中分开。" },
    { expression: "them", sentenceId: s(20), referent: "美国工业时代的基础设施", targetSentenceIds: [s(18)], explanation: "financed的对象是设施。第21、22句them延续同一所指。" },
    { expression: "the same thing", sentenceId: s(24), referent: "借外资建设而不必失去本国所有权的经验原则", targetSentenceIds: [s(18), s(20), s(23)], explanation: "不是复制美国全部工业模式。" },
    { expression: "which", sentenceId: s(25), referent: "Third Wave infrastructure", targetSentenceIds: [s(25)], explanation: "解释第三次浪潮设施在作者时代是电子基础设施，非指资本。" },
    { expression: "That", sentenceId: s(26), referent: "利用外资建设电子基础设施的主张", targetSentenceIds: [s(25)], explanation: "否定误解不等于撤回引资建议。" },
    { expression: "they", sentenceId: s(27), referent: "外国公司", targetSentenceIds: [s(26)], explanation: "公司能帮助建设；后置needed修饰设施，不修饰they。" },
  ],
  timeline: [
    { label: "二十年前的预警", event: "作者和妻子曾就数字鸿沟危险演讲；当时积极力量较不明显。具体年份不能仅从考试年份倒推。", evidence: [e(3, "twenty years ago", "过去参照"), e(4, "less visible then", "对应过去状态")] },
    { label: "作者写作时的现状与未来预测", event: "鸿沟仍存在，作者因商业和政府动力预测未来一二十年联网人数增加、差距缩小。该预测不是现今已验证的数据。", evidence: [e(2, "does exist today", "当前承认"), e(9, "Within the next decade or two", "预测期限"), e(10, "in the years ahead", "预测方向的时间")] },
    { label: "工业时代与当前所有权", event: "先有本国资金不足，再借欧洲投资建设；叙述时设施归美国人。出资者、建造者与拥有者不机械合一。", evidence: [e(17, "didn’t have the capital", "历史资金条件"), e(19, "were investing", "当时投资"), e(22, "owns them now", "叙述时所有权")] },
    { label: "第三次浪潮的类比", event: "从历史工业基础设施类推当时的电子基础设施，属于作者对未来经济处境的政策判断。", evidence: [e(25, "which today is an electronic infrastructure", "当时的新设施"), e(25, "you’re going to be", "未来处境")] },
  ],
  voices: [
    { speaker: "作者", claim: "承认鸿沟，但对其缩小及互联网扶贫潜力乐观。", boundary: "believe与may well保留判断性质；not the only否定唯一性，不保证很快消灭贫困。", evidence: [e(10, "I now believe", "预测归属"), e(11, "may well be", "可能性"), e(12, "isn’t the only way", "工具边界")] },
    { speaker: "部分国家的看法", claim: "仍认为外资侵犯本国主权。", boundary: "被置于Countries that think内部，是作者要回应的偏见，不能当作作者赞成拒绝外资的立场。", evidence: [e(16, "Countries that still think foreign investment is an invasion of their sovereignty", "观点持有者")] },
    { speaker: "作者的引资建议", claim: "外资可帮助建设必要基础设施，但不能放任外企不受监管。", boundary: "美国史是论证例子；doesn't mean/does mean形成限制与肯定，不提供每个项目收益的保证。", evidence: [e(26, "doesn't mean", "否定误解"), e(27, "does mean recognizing", "正面主张")] },
  ],
};
