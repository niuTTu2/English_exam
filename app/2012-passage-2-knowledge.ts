import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2012P2Lexicon, passage2012P2CollocationGlosses, passage2012P2SentenceContexts } from "./2012-passage-2-lexicon";

const rows: PhraseRow[] = [
  ["obsessed-with", "being so obsessed with the colour", "be obsessed with + noun", "形容词介词搭配", "痴迷于……", "obsessed 为过去分词形容词，with 引出痴迷对象。", "She is obsessed with fashion.", "她痴迷于时尚。", "be interested in 只是感兴趣，be obsessed with 的投入与程度更强。"],
  ["pervasive-in", "pervasive in our young girls' lives", "be pervasive in + range", "形容词范围搭配", "在……中无处不在", "in 后说明渗透的范围，本文是女孩生活。", "Advertising is pervasive in daily life.", "广告在日常生活中无处不在。", "popular with 说受欢迎，pervasive in 说覆盖/渗透范围。"],
  ["slice-rainbow", "a tiny slice of the rainbow", "a slice of + whole", "部分整体比喻", "……中的一小部分", "slice 的核心是整体中的小份额；rainbow 代表完整色谱。", "Blue is only a slice of the spectrum.", "蓝色只是色谱中的一部分。", "不能把 tiny slice 误推为毫无影响，作者批评的是单一代表性。"],
  ["celebrate-girlhood", "celebrate girlhood in one way", "celebrate + abstract noun", "动宾搭配", "以一种方式赞美女孩时期", "may 保留可能性，虽然让步承认一种正面作用，主句仍提出批评。", "The story celebrates childhood in its own way.", "这个故事以自己的方式赞美童年。", "celebrate 不必总是庆祝活动，也可指正面颂扬。"],
  ["fuse-identity-appearance", "fuses girls' identity to appearance", "fuse A to B", "动宾介词搭配", "把 A 与 B 紧密绑定", "fuses 强调牢固融合，A 为身份，B 为外表。", "The campaign fuses success to appearance.", "这场宣传把成功与外表紧密绑定。", "link A to B 较中性；fuse 更突出难以拆开的捆绑。"],
  ["not-only-evidence", "not only innocent but as evidence of innocence", "not only A but (also) B", "并列递进结构", "不仅是 A，甚至被当作 B", "原卷保留 but as 的形式；语义上把“无害”递进到“纯真的证据”，不能擅自改写正文。", "It was presented not only as harmless but as proof of purity.", "它被呈现得不仅无害，而且像纯洁的证明。", "通常并列可写 but also；这里必须保留原卷 as evidence of 的呈现结构。"],
  ["despair-lack-imagination", "despaired at the singular lack of imagination", "despair at + noun", "动词介词搭配", "因……深感绝望/失望", "at 后接作者失望的对象；singular 加强 lack 的程度。", "They despaired at the lack of options.", "他们因选择太少而感到绝望。", "despair at 比 dislike 强烈得多，不应弱化成普通“不喜欢”。"],
  ["attraction-pink", "Girls' attraction to pink", "attraction to + noun", "名词介词搭配", "对……的吸引/喜爱", "to 后接所被喜爱的对象 pink。", "Her attraction to music began early.", "她对音乐的喜爱很早就开始了。", "attractive to 是形容词结构；attraction to 是名词结构。"],
  ["encoded-dna", "encoded in their DNA", "be encoded in + carrier", "被动比喻结构", "仿佛被写入……", "本文用 DNA 表示天生论，随后明确否定 it is not。", "The habit seems encoded in their DNA.", "这种习惯仿佛写进了他们的 DNA。", "此说法可为比喻，不能据此把文章当作遗传学结论。"],
  ["according-paoletti", "according to Jo Paoletti", "according to + source", "信息来源结构", "按……的说法", "只标示信息来源和责任归属，不等于作者无条件认定为事实。", "According to the report, the policy changed.", "按报告所说，政策改变了。", "according to 不等于 because of，前者不表达原因。"],
  ["colour-coded", "were not colour-coded at all", "be colour-coded", "被动分类结构", "按颜色编码/分类", "not ... at all 强调儿童当时完全未按颜色区分性别。", "The folders are colour-coded by topic.", "这些文件夹按主题用颜色分类。", "coded 可指密码编码；colour-coded 特指用颜色做分类标记。"],
  ["practical-matter", "as a practical matter", "as a practical matter", "评注介词结构", "出于实际考虑", "说明白色衣服是由清洗条件决定，而非婴儿喜好。", "As a practical matter, white is easier to clean.", "从实际考虑看，白色更容易清洗。", "不是“作为一件实物”，而是就实际情况而言。"],
  ["only-way-clean", "the only way of getting clothes clean", "the only way of doing", "名词后置动名词结构", "做……的唯一办法", "of getting clothes clean 中 getting 为动名词，clothes 为其宾语，clean 为宾补。", "The only way of keeping it clean is to wash it.", "保持它干净的唯一办法是清洗。", "way 后可接 to do 或 of doing；原句用 of getting。"],
  ["what-thought-dresses", "what were thought of as gender-neutral dresses", "what be thought of as B", "名词性从句", "被认为是 B 的东西", "what 从句整体作 wore 的宾语；as 后补足它被看作什么。", "They wore what were thought of as neutral clothes.", "他们穿着被认为中性的衣服。", "what 不是疑问“什么”，也不能遗漏它在从句中的指代作用。"],
  ["gender-neutral-dresses", "gender-neutral dresses", "gender-neutral + noun", "复合形容词", "不分性别的……", "gender-neutral 整体修饰 dresses，表示不按男孩女孩分。", "They sell gender-neutral toys.", "他们销售不分性别的玩具。", "neutral 在本文不指政治中立。"],
  ["considered-masculine", "was actually considered the more masculine colour", "be considered + complement", "被动宾补结构", "被认为是……", "considered 后的 the more masculine colour 是 pink 的补足说明。", "Pink was considered the stronger colour.", "粉色被认为是更强势的颜色。", "more masculine 是两者比较，不能按最高级译。"],
  ["pastel-red", "a pastel version of red", "a version of + noun", "同位语名词短语", "……的一种浅色版本", "pastel 限定颜色柔和浅淡，version of red 解释 pink 的来源。", "It is a lighter version of red.", "它是红色较浅的一种版本。", "version 不等于完全相同的 red。"],
  ["associated-strength", "was associated with strength", "be associated with + noun", "被动关联结构", "与……联系在一起", "which 回指 red，with 后是当时的力量联想。", "Red is associated with energy.", "红色与活力联系在一起。", "associated with 表文化关联，不表示必然因果。"],
  ["intimations-virgin", "intimations of the Virgin Mary", "intimations of + noun", "名词介词搭配", "对……的暗示/联想", "蓝色引起的宗教与品格联想构成其女性象征。", "The image carries intimations of faith.", "这个形象带有信仰的暗示。", "intimation 不是 intimacy，前者强调含蓄暗示。"],
  ["symbolised-femininity", "symbolised femininity", "symbolise + abstract noun", "动宾搭配", "象征……", "这里讲历史文化符号，不把色彩解释为性别天性。", "White symbolised purity.", "白色象征纯洁。", "symbolise 是文化代表，不等于科学证明。"],
  ["not-until-mid", "It was not until the mid-1980s", "It is/was not until + time + that ...", "强调时间结构", "直到……才……", "必须把 not until 与 that 后内容一起译出时间强调。", "It was not until 1980 that the idea spread.", "直到 1980 年这个想法才传播开。", "不能把 not 单独否定后文，也不能漏掉“才”。"],
  ["amplifying-differences", "amplifying age and sex differences", "amplify + differences", "动名词主语", "放大年龄和性别差异", "整段把这一做法称为儿童营销策略，非对自然差异的中性描述。", "Amplifying small differences can sell more products.", "放大细小差异能卖出更多产品。", "amplify 可指声音放大，本文为社会差异的夸张。"],
  ["come-own", "came into its own", "come into one's own", "习语", "真正兴盛；充分发挥作用", "its own 指粉色自身应有的位置，不按字面拆解。", "The idea came into its own after 1980.", "这个想法在 1980 年后真正流行起来。", "不是“来到它自己的物品里”。"],
  ["attractive-girls", "attractive to girls", "be attractive to + person", "形容词对象搭配", "对……有吸引力", "began to seem 限定为“开始显得”，不是作者断定天生事实。", "The design seems attractive to children.", "这个设计看起来吸引儿童。", "attracted by 是被吸引，attractive to 说明事物有吸引力。"],
  ["at-least-first-years", "at least for the first few critical years", "at least for + period", "范围限定", "至少在……期间", "at least 限制强制性标记的时间范围，不能推到一生。", "The rule matters at least for the first years.", "至少在最初几年这条规则很重要。", "at least 是最低范围，不是“至多”。"],
  ["marketing-trends", "marketing trends", "marketing trends", "名词定语搭配", "营销趋势", "trends 是左右儿童“自然”观念的商业潮流。", "Marketing trends change quickly.", "营销趋势变化很快。", "trend 不是单次广告，指一段时期的走向。"],
  ["dictated-perception", "dictated our perception", "dictate + perception", "动宾搭配", "强力左右看法", "dictated 强调外部营销对社会观念的控制力。", "Advertising can dictate public perception.", "广告会强力左右公众看法。", "dictate 不是本文的“口述给秘书写”。"],
  ["core-beliefs", "core beliefs", "core + noun", "名词定语搭配", "核心信念", "包括我们对儿童心理发展的基本看法。", "Core beliefs shape decisions.", "核心信念塑造决定。", "core 在此不是核心部件的物理意义。"],
  ["psychological-development", "psychological development", "psychological development", "名词搭配", "心理发展", "作者说这一看法受营销趋势影响。", "Children's psychological development changes over time.", "儿童心理发展随时间变化。", "不是 physical development 的身体成长。"],
  ["take-toddler-example", "Take the toddler", "take + noun as an example", "祈使举例结构", "以……为例", "Take 后直接接所举的对象，句中省略主语 you；这里不是要求读者带走幼儿。", "Take the toddler as an example.", "就以幼儿为例。", "take 在本文不是普通的“拿走”，要整体识别为引出例子。"],
  ["assumed-phase", "assumed that phase was something", "assume that + clause", "宾语从句", "假定……", "assumed 的内容随后被 wrong 推翻，须保留其未证实性。", "I assumed that the phase was natural.", "我假定那个阶段是自然形成的。", "assume 不是 prove，不能把作者原先假设当结论。"],
  ["research-behaviour", "research into children's behaviour", "research into + topic", "名词介词搭配", "对……的研究", "作者原以为 toddler 概念来自这类研究，随后被修正。", "Research into behaviour takes time.", "对行为的研究需要时间。", "research 常不可数；into 说明研究对象。"],
  ["turns-out", "Turns out", "turn out (that) + clause", "省略引出结构", "结果发现……", "省略 that，连接前面的错误假设与实际历史。", "Turns out, the label was commercial.", "结果发现，这个标签是商业性的。", "turn out 不是“转身出去”，在此为结果揭示。"],
  ["according-cook", "according to Daniel Cook", "according to + source", "信息来源结构", "按……的说法", "Daniel Cook 的身份是儿童消费主义历史学家，语法上是插入来源。", "According to Cook, the label spread through marketing.", "按库克所说，这个标签靠营销传播。", "来源归属不等于作者把所有细节绝对化。"],
  ["marketing-trick", "a marketing trick", "a marketing trick", "名词短语", "营销花招", "说明 toddler 标签被商业性地推广，而非中性自然发现。", "The slogan was a marketing trick.", "这句口号是个营销花招。", "trick 有批评色彩，不要弱化为普通“方法”。"],
  ["order-increase-sales", "in order to increase sales", "in order to + verb", "目的不定式", "为了做……", "说明贸易刊物建议的商业目的为增加销售额。", "They split products in order to increase sales.", "他们细分产品以增加销售额。", "in order to 说明目的，不能译作已经实现的结果。"],
  ["third-stepping-stone", "a \"third stepping stone\"", "a stepping stone", "比喻性名词短语", "过渡跳板；中间层级", "引号标出行业创造的市场分类，不指真正石头。", "A toddler line became a stepping stone between ranges.", "幼儿产品线成了两类商品之间的过渡层。", "第三层级是人为创造的销售分类，不是自然发展阶段。"],
  ["between-infant-older", "between infant wear and older kids' clothes", "between A and B", "范围/两端结构", "在 A 和 B 之间", "two endpoints 分别是婴儿装与大童装，中间层就是被造出的 toddler 市场。", "There is a gap between infant and older-child products.", "婴儿产品与大童产品之间有空档。", "between 要同时保留两个端点，不能只译一端。"],
  ["only-after-term", "only after \"toddler\" became a common shoppers' term", "only after + clause + that ...", "强调时间结构", "只有在……之后才……", "先是购物用语普及，随后才演变为发展阶段。", "Only after the term spread did the idea become common.", "只有在这个术语传播后，该概念才变得常见。", "only 放句首可倒装；原句用 It was only after...that... 强调。"],
  ["evolved-stage", "evolved into a broadly accepted developmental stage", "evolve into + result", "动词结果结构", "逐渐演变成……", "it 回指 toddler 术语，broadly accepted 说明社会认可而非自然实证。", "The label evolved into a formal stage.", "这个标签逐渐演变为正式阶段。", "evolve 强调渐变，不能误作一次专家命名。"],
  ["ever-tinier-categories", "into ever-tinier categories", "into + comparative categories", "分类结果结构", "分成越来越细的类别", "ever 加比较级，说明细分持续强化。", "The market was split into ever-smaller groups.", "市场被分成越来越小的群体。", "categories 是分类，不是消费者天然不变的本质。"],
  ["sure-fire-profits", "a sure-fire way to boost profits", "a sure-fire way to do", "评价不定式结构", "几乎必定奏效的做法", "to boost profits 说明这种分类的商业目的。", "It is a sure-fire way to boost profits.", "这是提高利润的万全办法。", "sales 是销售额，profits 是利润；两者不要混淆。"],
  ["segment-market", "one of the easiest ways to segment a market", "segment a market", "市场营销动宾搭配", "细分市场", "one of 后面最高级 eaiest ways 为复数，谓语仍由 one 决定。", "Brands segment a market by age.", "品牌按年龄细分市场。", "segment 在本文不是几何线段，而是市场分类动作。"],
  ["magnify-gender", "magnify gender differences", "magnify + differences", "动宾搭配", "夸大性别差异", "作者把它写作最容易的市场细分方法之一。", "Advertising may magnify gender differences.", "广告可能夸大性别差异。", "magnify 不表示客观测量变大，而是有意强化。"],
  ["where-differences", "where they did not previously exist", "where + clause", "情形性定语从句", "在原先并不存在的情形中", "they 回指 gender differences；where 不一定是地理地点。", "The campaign invented divisions where none existed.", "这场宣传在原本没有分界的地方制造了分界。", "invent 与 discover 相反，强调人为制造。"],
];

const reviewed = reviewedPhrases(rows);

export const passage2012P2PhraseGuides = reviewed.guides;
export const passage2012P2PhraseAliases = reviewed.aliases;
export const passage2012P2PhraseGlosses = { ...passage2012P2CollocationGlosses, ...reviewed.glosses };

export function getPassage2012P2WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2012P2Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2012P2SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return {
    grammarRole: context?.partOfSpeech ?? entry.partOfSpeech,
    grammarSummary: rule,
    structures: [{ pattern, meaning: passage2012P2CollocationGlosses[pattern.toLowerCase()]?.meaning ?? entry.contextualMeaning, rule }],
    pitfalls: entry.examSynonyms,
  };
}
