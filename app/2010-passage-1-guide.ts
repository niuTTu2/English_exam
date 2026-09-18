import type { ArticleGuide, PassageEvidence } from "./article-teaching";

const s = (number: number) => `2010-p1-s${number}`;
const e = (number: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(number), quote, role });

export const passage2010P1Guide: ArticleGuide = {
  practice: [
    { id: "opening-turn", leaksToTaskIds: ["paragraph-route"], revision: 1, kind: "choice", prompt: "第一段在全文中主要起什么作用？", options: ["只展示繁荣", "用拍卖成功引出市场转折", "证明艺术市场已复苏"], answer: "用拍卖成功引出市场转折", evidence: "It was a last victory.", feedback: "成功不是首段终点：last与随后雷曼破产并置，把拍卖变成繁荣结束的标志。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true },
    { id: "supply-demand", leaksToTaskIds: ["paragraph-route"], leaksToTasks: [{ sentenceId: "2010-p1-s17", taskId: "not-but" }], revision: 1, kind: "choice", prompt: "第五段怎样解释本轮市场困境？", options: ["完全没有买家", "仍有买家，但缺少可卖的好作品", "作品太多所以卖不掉"], answer: "仍有买家，但缺少可卖的好作品", evidence: "not a lack of demand but a lack of good work to sell", feedback: "not A but B否定需求不足、强调优质供给不足；没有出售压力的人选择等待。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true },
    { id: "paragraph-route", leaksToTaskIds: ["opening-turn", "supply-demand"], revision: 1, kind: "order", prompt: "回想原文，把五段的功能排回作者展开的顺序。", options: ["繁荣的最后时刻", "此前已转弱的背景", "危机冲击的证据", "低谷中的判断", "本轮低迷的供给特点"], answer: JSON.stringify(["繁荣的最后时刻", "此前已转弱的背景", "危机冲击的证据", "低谷中的判断", "本轮低迷的供给特点"]), evidence: "The current downturn in the art market is the worst", feedback: "开头的转折事件之后，补此前背景，再写冲击证据和业内判断，最后解释本轮低迷的供需特点。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true },
  ],
  route: ["繁荣的最后时刻", "此前已转弱的背景", "危机冲击的证据", "低谷中的判断", "本轮低迷的供给特点"],
  mainIdea: "文章描述艺术市场由繁荣转入低迷，再解释本轮低迷仍有买家、但优质作品供给不足的特点。销量、价格、拍卖行赔付和卖家观望共同支撑主线，不能只用价格或某场拍卖概括全文。",
  paragraphs: [
    { paragraphId: "2010-p1-paragraph-1", title: "繁荣的最后时刻", summary: "赫斯特拍卖创纪录，却与雷曼申请破产并置。a last victory把成功拍卖变成牛市终点的标志。", relation: "用具体事件引出市场转折；胜利与危机形成反差。" },
    { paragraphId: "2010-p1-paragraph-2", title: "市场此前已经转弱", summary: "回顾2003年起的上涨、2007年峰值和之后的规模回落，并解释这一行业为何格外引人关注。", relation: "回到前一段事件之前交代背景，补充体量与关注度；并非继续列举拍卖成功。" },
    { paragraphId: "2010-p1-paragraph-3", title: "危机冲击的具体证据", summary: "消费不受推崇，收藏家退场，销售下滑，两家拍卖行承担高额担保赔付。", relation: "回到拍卖之后，以行为和数字说明衰退已产生实际影响。" },
    { paragraphId: "2010-p1-paragraph-4", title: "严重低迷与触底判断", summary: "与1989年后的低迷比较，给出平均价格跌幅；佳士得负责人则表示有信心市场已经触底。", relation: "先说明严重程度，再引入业内人士较乐观的判断。乐观判断不等于已证实复苏。" },
    { paragraphId: "2010-p1-paragraph-5", title: "买家仍在，卖家惜售", summary: "受访者认为问题是缺少可卖的好作品。人生变故仍促使一些作品上市，没有出售压力的持有人则等待信心恢复。", relation: "解释本轮低迷与上次的差别，纠正“完全没人想买”的误读；仍属于衰退中的市场状态。" },
  ],
  sentenceRoles: Object.fromEntries([
    "交代拍卖事件，同时点明长期牛市结束。", "用成交比例和金额说明拍卖的成功。", "用last把成功转为衰退前的最后胜利，是首段转折点。", "并置雷曼破产，解释为什么胜利会是最后一次。",
    "回顾拍卖前已出现的势头减弱。", "用2007年峰值及五年前比较展示繁荣规模。", "补充峰值后的估计回落。", "转而解释行业关注度为何超出其体量。",
    "从拍卖后的消费氛围引入危机影响。", "把消费氛围落实为收藏家退场，解释上一句。", "给出整体与过热板块的销售跌幅证据。", "以担保赔付说明拍卖行也受冲击。",
    "把本轮低迷放在1989年以来的历史范围中比较。", "补充价格的平均跌幅及个别波动。", "转述业内负责人关于触底的信心，语气转折。",
    "延续Dolman的解释，提出买家仍在这一差别。", "用更广泛的采访支持供给不足的判断。", "举出仍能促使作品上市的三类变故。", "与被迫出售形成对照，以卖家观望收束全文。",
  ].map((role, index) => [s(index + 1), role])),
  references: [
    { expression: "It", sentenceId: s(3), referent: "前两句赫斯特拍卖的成功", targetSentenceIds: [s(1), s(2)], explanation: "不是任意一件作品；was a last victory评价的是这次事件。" },
    { expression: "it", sentenceId: s(6), referent: "全球艺术市场", targetSentenceIds: [s(5)], explanation: "650亿美元估值属于市场，不属于单场赫斯特拍卖。" },
    { expression: "then", sentenceId: s(7), referent: "2007年峰值", targetSentenceIds: [s(6)], explanation: "Since then从这一时间点向后看。" },
    { expression: "that", sentenceId: s(10), referent: "消费行为变得不受推崇这一现象", targetSentenceIds: [s(9)], explanation: "这是meant的主语代词；后面的collectors stayed away才是宾语从句内容。" },
    { expression: "they", sentenceId: s(11), referent: "当代艺术品的销售", targetSentenceIds: [s(11)], explanation: "第二分句将范围收窄到最过热板块，不能理解为艺术家或收藏家。" },
    { expression: "them", sentenceId: s(12), referent: "苏富比与佳士得两家拍卖行", targetSentenceIds: [s(12)], explanation: "客户把作品委托给拍卖行；不是委托给客户自己。" },
    { expression: "This time", sentenceId: s(14), referent: "当前这一轮艺术市场低迷", targetSentenceIds: [s(13)], explanation: "与1989年后的上一轮低迷对照。" },
    { expression: "some", sentenceId: s(14), referent: "部分艺术品的价格", targetSentenceIds: [s(14)], explanation: "承接prices；平均跌幅不能套到每一件作品上。" },
    { expression: "he", sentenceId: s(16), referent: "Edward Dolman", targetSentenceIds: [s(15)], explanation: "第16句仍延续业内人士的观点，不要改说成作者保证。" },
    { expression: "this slump", sentenceId: s(16), referent: "当前这一轮低迷", targetSentenceIds: [s(13)], explanation: "与current downturn同指本轮市场状态。" },
    { expression: "the last", sentenceId: s(16), referent: "前文提到的1989年之后的上一轮低迷", targetSentenceIds: [s(13)], explanation: "last后省略slump；与第3句last victory中的“最后一次”要区分。" },
  ],
  timeline: [
    { label: "1989年底（历史对照）", event: "日本买家停止购买印象派作品，作为本轮低迷的比较背景。", evidence: [e(13, "at the end of 1989", "上一轮背景")] },
    { label: "2003年起", event: "艺术市场经历迅速上涨；since 2003限定rising，不是衰退起点。", evidence: [e(5, "rising bewilderingly since 2003", "上涨起点")] },
    { label: "2007年", event: "市场规模达到文中峰值，估值约650亿美元。", evidence: [e(6, "At its peak in 2007", "峰值"), e(6, "worth some $65 billion", "估值")] },
    { label: "2008年9月15日", event: "赫斯特拍卖与雷曼破产并置。到这一过去参照点，市场早已减弱一段时间；原文没有给出减弱的确切起止日。", evidence: [e(1, "on September 15th 2008", "拍卖日期"), e(4, "filed for bankruptcy", "同一时刻的反差"), e(5, "had already been losing momentum for a while", "先前已持续的状态")] },
    { label: "拍卖之后的数周、数月", event: "消费冷却、收藏家退场，拍卖行承担担保赔付。", evidence: [e(9, "In the weeks and months that followed Mr. Hirst's sale", "后续影响"), e(12, "Within weeks", "赔付时间")] },
    { label: "截至2008年11月的一年（统计区间）", event: "最过热板块销售下降近90%；这是重叠的统计区间，不能放成“数月以后才开始”的独立事件。", evidence: [e(11, "in the year to November 2008", "统计终点")] },
    { label: "文章观察的当前", event: "本轮低迷仍在持续。触底是受访者的判断，卖家则等待市场信心恢复；原文未提供观察当天的日期。", evidence: [e(15, "I'm pretty confident we're at the bottom", "引述判断"), e(19, "waiting for confidence to return", "当下观望")] },
  ],
  voices: [
    { speaker: "作者的组织与叙述", claim: "以繁荣终点、销售下降、赔付款与观望说明市场衰退，再讨论其特点。", boundary: "主线是低迷；不可只抓结尾仍有买家就推断作者认为市场已经恢复。", evidence: [e(1, "ended", "主线开端"), e(11, "fell by two-thirds", "衰退证据"), e(19, "is keeping away", "观望状态")] },
    { speaker: "Clare McAndrew与专家估计", claim: "峰值估值约650亿美元，价格平均较峰值下降约40%。", boundary: "reckons / reckon、some / about都保留估计性质；平均不等于每件作品都如此。", evidence: [e(6, "reckons Clare McAndrew", "估值来源"), e(14, "experts reckon that prices are about 40% down on their peak on average", "跌幅来源")] },
    { speaker: "Edward Dolman", claim: "有信心市场处于底部，认为本轮仍有买家。", boundary: "是业内负责人被引述的观点，既不等于作者保证，也不等于价格将立即回升。", evidence: [e(15, "I'm pretty confident we're at the bottom", "触底信心"), e(16, "he says", "延续同一说话者")] },
    { speaker: "本专题的受访者", claim: "眼下主要问题是可卖的好作品不足，而非需求不足。", boundary: "Almost everyone不是毫无例外的所有人；也不能据此说市场从未受需求下滑影响。", evidence: [e(17, "Almost everyone who was interviewed for this special report", "观点范围"), e(17, "not a lack of demand but a lack of good work to sell", "判断内容")] },
  ],
};

/** 与人工精审的顶层词块逐项对应；中文不是从标签模板生成。 */
export const passage2010P1BlockTranslations: string[][] = [
  ["艺术市场百年历史中持续最久的一轮牛市", "结束了", "以戏剧性的方式", "以一场名为《Beautiful Inside My Head Forever》的达米恩·赫斯特56件作品拍卖", "在伦敦苏富比拍卖行", "于2008年9月15日"],
  ["除两件之外的所有作品", "都售出了", "卖得超过7000万英镑", "创下单一艺术家专场拍卖的纪录"],
  ["这次成功的拍卖", "是", "最后的一场胜利"],
  ["当拍卖师报出竞价时", "在纽约", "华尔街历史最悠久的银行之一——雷曼兄弟", "申请了破产"],
  ["全球艺术市场", "早已持续在失去", "增长势头", "有一段时间了", "在经历自2003年起的惊人上涨之后"],
  ["在2007年的峰值时", "这个市场", "是", "约650亿美元的规模", "据研究机构Arts Economics创始人克莱尔·麦克安德鲁估计", "是五年前数字的两倍"],
  ["自那以后", "市场规模", "可能已回落", "至500亿美元"],
  ["但是", "这个市场", "引起", "关注", "远超其自身的体量", "因为它以鲜有其他行业可比的方式汇聚了巨额财富、强烈自负、贪婪、激情与争议"],
  ["在赫斯特拍卖之后的数周、数月里", "各种消费行为", "变得", "极不受推崇"],
  ["在艺术界", "这种现象", "意味着", "收藏家远离画廊与拍卖场"],
  ["当代艺术品销售", "下降", "了三分之二", "而且", "在最过热的板块", "这些销售", "处于", "下降状态", "降幅将近90%", "在截至2008年11月的一年里"],
  ["短短几周内", "全球最大的两家拍卖行——苏富比和佳士得", "不得不支付", "近2亿美元的担保赔付款", "给那些把作品委托给它们出售的客户"],
  ["当前艺术市场的低迷", "是", "最严重的一次", "自日本买家在1989年底停止购买印象派作品以来"],
  ["这一次", "专家", "估计", "价格平均比峰值低约40%", "尽管部分价格的波动大得多"],
  ["但是", "佳士得首席执行官爱德华·多尔曼", "说", "我相当确信，我们正处在市场底部"],
  ["使本次低迷有别于上次的因素", "他说", "是", "市场里仍有买家"],
  ["为本专题接受采访的几乎所有人", "都说", "眼下最大的问题不是缺少需求，而是缺少可卖的好作品"],
  ["三个D", "死亡、债务和离婚", "仍然促使……进入", "艺术作品", "市场"],
  ["但是", "那些不必出售的人", "正在远离市场", "等待信心恢复"],
];
