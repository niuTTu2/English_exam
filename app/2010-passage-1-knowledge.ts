import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";

type Seed = readonly [string, string, string, string, string];
const seeds: Seed[] = [
  ["the longest bull run", "the longest bull run", "持续时间最长的一轮牛市行情", "名词短语；句子主语", "bull run 是价格持续上涨期，不按‘公牛奔跑’直译。"],
  ["in a century of art-market history", "in + period + of history", "在艺术市场百年历史中", "最高级比较范围", "in 引出 longest 的比较范围。"],
  ["ended on a dramatic note", "end on a ... note", "以戏剧性、轰动性的方式结束", "谓语搭配 + 方式状语", "note 表结局的基调，不是音符。"],
  ["a sale of 56 works", "a sale of + items", "一场包含56件作品的拍卖", "with 后的名词中心", "sale 在拍卖语境指拍卖专场；of 引出拍品。"],
  ["at Sotheby's in London", "at + institution + in + city", "在伦敦苏富比拍卖行", "地点状语", "小地点用 at，大范围城市用 in。"],
  ["all but two", "all but + number", "除了两个以外全部", "数量限定结构", "but 在此是‘除……之外’，不是转折连词。"],
  ["fetching more than £70m", "fetch + price", "卖得七千多万英镑", "现在分词结果状语的核心搭配", "物作主语时 fetch 表成交取得某金额。"],
  ["a record for a sale", "a record for + category", "某类拍卖的一项纪录", "同位补充", "for 引出纪录所属类别。"],
  ["by a single artist", "by + creator", "由一位艺术家创作；属于单一艺术家专场", "后置定语", "by 在此标明作品创作者。"],
  ["a last victory", "a last victory", "衰退前最后一次胜利", "系动词后的表语", "last 要结合下一句危机爆发理解。"],
  ["called out bids", "call out + bids", "高声报出竞价", "从句中的动宾结构", "called out 是谓语，bids 是宾语；call out 表大声喊出，bid 是竞价。"],
  ["one of the oldest banks", "one of + the + superlative + plural noun", "最古老的银行之一", "主语名词组的核心", "one 为单数中心，of 后名词用复数；第4句后面的 Lehman Brothers 是点明银行名称的同位语。"],
  ["on Wall Street", "on Wall Street", "在华尔街；在美国金融界", "地点/领域后置定语", "语境中兼具实际地点和金融业象征。"],
  ["filed for bankruptcy", "file for + legal status", "申请破产", "谓语固定搭配", "file for 强调正式提交申请。"],
  ["the world art market", "the world art market", "全球艺术市场", "名词短语；主语", "world 与 art 共同前置限定 market。"],
  ["losing momentum", "lose momentum", "失去增长势头", "动宾搭配", "momentum 指继续发展、增长的动力。"],
  ["for a while", "for + duration", "持续一段时间", "时间状语", "for 接持续时段。"],
  ["after rising bewilderingly", "after + doing", "在令人眼花缭乱地上涨之后", "时间状语", "rising 的逻辑主语是 art market。"],
  ["since 2003", "since + starting point", "自2003年以来", "时间起点状语", "since 接时间起点。第5句中该短语位于 after 的内部，修饰 rising，标上涨的起点，不是 losing 的起点。"],
  ["at its peak", "at one's peak", "处于顶峰", "状态兼时间状语", "peak 指最高水平。"],
  ["was worth some $65 billion", "be worth + amount", "价值约650亿美元", "系表价值结构", "worth 后直接接金额；some 在数字前表示大约。"],
  ["a research firm", "a research firm", "一家研究公司", "同位语", "解释 Arts Economics 是何种机构。"],
  ["double the figure", "double + noun", "是该数字的两倍", "倍数补充", "double 在此直接限定 figure。"],
  ["five years earlier", "time + earlier", "五年前", "名词的时间限定", "第6句中限定 figure，指五年前的数字；以2007年回推，是2002年的比较数值。"],
  ["since then", "since then", "从那以后", "时间状语", "then 回指2007年峰值。"],
  ["may have come down to", "may have done + to level", "可能已经下降到", "情态完成式谓语", "to 表最终水平；by 才表变化幅度。"],
  ["generates interest", "generate + interest", "引起关注", "动宾搭配", "interest 在此是公众关注，不是利息。"],
  ["far beyond its size", "far beyond + benchmark", "远超其规模", "程度状语", "far 加强 beyond 的程度。"],
  ["brings together", "bring together + list", "把多种因素汇聚在一起", "原因从句谓语", "后可接多个并列宾语。"],
  ["in a way matched by few other industries", "in a way + past participle", "以鲜有其他行业能匹敌的方式", "方式状语 + 后置定语", "matched... 修饰 way，few 带否定意味。"],
  ["in the weeks and months that followed", "in the time + that followed", "在随后数周和数月里", "时间状语", "that 从句限定具体时间段。"],
  ["spending of any sort", "noun + of any sort", "任何形式的消费", "句子主语", "of any sort 后置限定 spending。"],
  ["became deeply unfashionable", "become + adverb + adjective", "变得极不受欢迎", "系表结构", "deeply 修饰 unfashionable。"],
  ["in the art world", "in + field", "在艺术界", "范围状语", "不是单指物理世界。"],
  ["stayed away from", "stay away from + place/activity", "避开；不再参与", "宾语从句谓语", "from 后接避开的地点或活动。"],
  ["galleries and salerooms", "galleries and salerooms", "画廊和拍卖场", "from 的并列宾语", "saleroom 在本文特指举行拍卖的场所。"],
  ["sales of contemporary art", "sales of + category", "当代艺术品销售额", "主语", "sales 在统计语境通常指销售额或销量。"],
  ["fell by two-thirds", "fall by + amount", "下降三分之二", "谓语 + 幅度状语", "by 表下降了多少。"],
  ["the most overheated sector", "the most overheated + sector", "投机最过热的细分市场", "范围状语中心", "overheated 比喻价格和投机过度。"],
  ["were down by nearly 90%", "be down by + amount", "下降近90%", "状态 + 幅度", "by 是降幅，不是最终数值。"],
  ["in the year to", "in the year to + date", "截至某时的一年内", "统计时间状语", "to 引出统计截止点。"],
  ["Within weeks", "within + duration", "短短数周内", "时间状语", "within 表不超过该时段。"],
  ["auction houses", "auction house", "拍卖行", "主语中心", "house 在此是商业机构，不是住宅。"],
  ["pay out", "pay out + amount", "支付、赔付大笔款项", "谓语短语", "常用于保险、担保或损失赔款。"],
  ["in guarantees", "amount + in guarantees", "以担保款形式；担保金额", "金额性质说明", "说明款项源于拍卖保证安排。"],
  ["placed works for sale with", "place + works + for sale + with agent", "把作品交给某机构代售", "定语从句谓语", "with 引出受托出售方。"],
  ["The current downturn", "the current downturn", "当前这轮市场低迷", "主语中心", "downturn 是经济活动或市场的下降期。"],
  ["the worst since", "the worst since + clause", "自……以来最严重的一次", "最高级 + 时间范围", "since 从句提供比较起点。"],
  ["stopped buying", "stop doing", "停止购买", "时间从句谓语", "stop doing 是停止原有行为；stop to do 是停下别的事去做。"],
  ["at the end of", "at the end of + period/text", "在……末尾", "时间或篇章位置状语", "接时期表时间末尾，接letter等文本表篇章末尾；不要与in the end‘最终’混淆。"],
  ["This time", "this time", "这一次；本轮", "情境状语", "对比1989年的上一轮低迷。"],
  ["reckon that", "reckon that + clause", "估计；认为……", "主句谓语", "that 从句给出判断内容。"],
  ["are about 40% down on their peak", "be down on + benchmark", "平均比峰值低约40%", "比较表语结构", "on 引出比较基准。"],
  ["on average", "on average", "平均来看", "统计口径状语", "只说明总体平均，不代表每个个体。"],
  ["far more fluctuant", "far + comparative", "波动大得多", "让步从句表语", "far 可加强比较级；原卷保留 fluctuant。"],
  ["chief executive", "chief executive", "首席执行官", "人物同位语中心", "相当于 CEO。"],
  ["I'm pretty confident", "be confident + clause", "我相当确信", "形容词表语", "pretty 作程度副词，较口语。"],
  ["we're at the bottom", "be at the bottom", "市场已经触底", "引语从句表语", "是价格周期隐喻。"],
  ["makes this slump different from the last", "make A different from B", "使本轮低迷不同于上一次", "make + 宾语 + 补足语", "different from B 是宾语补足语。"],
  ["this slump", "this slump", "本轮市场低迷", "主语从句宾语", "slump 是急剧或持续的市场下滑。"],
  ["there are still buyers", "there be + noun", "仍然有买家", "表语从句", "buyers 是存在句真正内容主语。"],
  ["in the market", "in the market", "在市场中；参与交易", "地点/领域状语", "语境指仍参与艺术品交易。"],
  ["was interviewed for", "be interviewed for + report", "为某报道接受采访", "被动定语从句", "for 引出采访服务的报道用途。"],
  ["at the moment", "at the moment", "目前；眼下", "时间状语", "指说话/调查时点。"],
  ["not a lack of demand but a lack of good work", "not A but B", "不是需求不足而是优质作品不足", "纠正型并列结构", "A、B 应保持语法平行。"],
  ["a lack of demand", "a lack of + noun", "需求不足", "表语名词短语", "lack 作名词时常接 of。"],
  ["good work to sell", "noun + to do", "可供出售的优质作品", "不定式后置定语", "work 在艺术语境可作可数类别概念，to sell 表用途/可供处理。"],
  ["The three Ds", "the three Ds", "三个D因素：死亡、债务和离婚", "句子主语", "后面的破折号内容为同位解释。"],
  ["works of art", "works of art", "艺术作品", "deliver 的宾语", "work 表具体作品时可数。"],
  ["deliver works of art to the market", "deliver A to B", "促使艺术品进入市场", "动宾 + 方向结构", "本文为拟人用法，指外部事件促成作品上市。"],
  ["have to sell", "have to + verb", "不得不出售", "定语从句谓语", "否定 do not have to 表‘不必’，不是‘禁止’。"],
  ["keeping away", "keep away (from)", "保持离场；暂不参与", "主句谓语", "省略对象时由上下文补出不进入市场出售。"],
  ["waiting for confidence to return", "wait for + noun + to do", "等待信心恢复", "伴随状语", "confidence 是 return 的逻辑主语。"],
];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const passage2010P1PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([source, canonical, meaning, grammarRole, rule]) => {
  const key = `2010-p1-${slug(source)}`;
  return [key, { key, sourceExpression: source, canonical, type: "真题词组/句法结构", meaning, summary: `${meaning}。${rule}`, grammarRole, structures: [{ pattern: canonical, meaning, rule, examples: [{ english: source, chinese: meaning }] }], pitfalls: [rule] }];
}));
export const passage2010P1PhraseAliases = Object.fromEntries(seeds.map(([source]) => [source.toLowerCase(), `2010-p1-${slug(source)}`]));
export const passage2010P1CollocationGlosses = Object.fromEntries(seeds.map(([source, , meaning, , rule]) => [source.toLowerCase(), { meaning, note: rule }]));

export const passage2010P1FamilyGlosses: Record<string, string> = {
  auction: "拍卖", auctioneer: "拍卖师", bid: "竞价；投标", bidder: "竞价者；投标人",
  consume: "消费", consumption: "消费", collect: "收集；收藏", collector: "收藏家", collection: "收藏；藏品",
  economy: "经济", economic: "经济的", economics: "经济学", fluctuate: "波动", fluctuation: "波动", fluctuant: "波动的",
  guarantee: "保证；担保", guaranteed: "有保证的", confidence: "信心", confident: "有信心的", confidently: "自信地",
  impress: "使印象深刻", impression: "印象", Impressionist: "印象派画家/作品", controversy: "争议", controversial: "有争议的",
};

export const passage2010P1WordKnowledge: Record<string, WordKnowledge> = {
  as: { grammarRole: "从属连词；本篇引导时间/伴随状语从句", grammarSummary: "As the auctioneer called out bids 表两件事情同时发生，可译为‘就在……时’。", structures: [{ pattern: "As + subject + predicate, main clause", meaning: "当……时；随着……", rule: "根据两边动作关系判断时间、伴随或原因，本句为同步时间。" }], pitfalls: ["不要把 as 一律译成‘因为’。"] },
  that: { grammarRole: "关系代词、宾语从句引导词或指示代词", grammarSummary: "本篇 that 分别用于限定时间、引出宾语/表语内容以及回指上一句事实，必须先判断是否在从句中充当成分。", structures: [{ pattern: "noun + that + predicate / verb + that + clause", meaning: "……的名词 / 动词所陈述的内容", rule: "关系代词在定语从句中充当成分；连词 that 只连接，不充当成分。" }], pitfalls: ["不要看到 that 就一律判为宾语从句。"] },
  who: { grammarRole: "关系代词；引导限制性定语从句", grammarSummary: "who 回指表示人的 clients、everyone、anyone，并在从句中作主语。", structures: [{ pattern: "person + who + predicate", meaning: "……的人", rule: "who 的数与先行词一致，并承担从句主语。" }], pitfalls: ["先找人的先行词，再分析从句谓语和宾语。"] },
  since: { grammarRole: "介词或从属连词；表示时间起点", grammarSummary: "since 2003 后接时间点；since the Japanese stopped... 后接完整从句，两者都建立从过去到参照点的范围。", structures: [{ pattern: "since + time / since + clause", meaning: "自……以来", rule: "接名词时为介词，接主谓完整结构时为连词。" }], pitfalls: ["不要与 because 意义的 since 混淆，本篇均表时间。"] },
  though: { grammarRole: "从属连词；引导让步状语从句", grammarSummary: "though some... 对平均跌幅补充个体差异，表示主句成立但存在例外。", structures: [{ pattern: "main clause, though + clause", meaning: "……，不过/尽管……", rule: "从句补充与主句方向不同的限制事实。" }], pitfalls: ["与主句不能再机械叠加 but。"] },
  what: { grammarRole: "融合型关系词；引导主语从句", grammarSummary: "What makes this slump different... 整体作主语，相当于 the thing that makes...。", structures: [{ pattern: "What + predicate + ... + is + answer", meaning: "使……的因素是……", rule: "what 同时承担从句成分和连接作用。" }], pitfalls: ["陈述句中的 what 不一定是疑问词‘什么’。"] },
};
