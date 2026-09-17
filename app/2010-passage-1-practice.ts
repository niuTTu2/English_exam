import type { PracticeTask, GrammarConceptId, ErrorCategory } from "./learning-model";
const q = (id: string, prompt: string, options: string[], answer: number, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[answer], evidence, feedback, conceptId, errorType });
export const passage2010P1Practice: Record<string, PracticeTask[]> = {
  "2010-p1-s1": [
    { id: "main-predicate", revision: 1, kind: "token", prompt: "点出全句唯一承担主句时态的动词。", options: [], answer: "ended", evidence: "ended", feedback: "ended承担过去时，是主句谓语。其余主要是名词组和介词短语；先抓The longest bull run ended，再把修饰放回去。", conceptId: "finite-predicate", errorType: "predicate" },
    q("subject-head", "主语的核心是哪一组？", ["history", "bull run", "century"], 1, "The longest bull run", "bull run是中心；history在介词短语内，给longest限定比较范围。找主语不要选离谓语最近的名词。", "subject-head", "subject"),
    q("by-attachment", "by Damien Hirst直接说明谁？", ["sale", "ended", "works"], 2, "works by Damien Hirst", "它说明作品是谁创作的，直接跟works；拍卖不是由by这组来说明主办者。", "modifier-prepositional", "attachment"),
  ],
  "2010-p1-s2": [
    q("finite-versus-ing", "sold和fetching中，哪个是主句谓语？", ["fetching", "sold", "两个都是"], 1, "pieces sold, fetching", "sold承担过去时；fetching是-ing补充说明成交所得，没有开启第二个有限主句。", "finite-predicate", "predicate"),
    q("all-but", "All but two pieces售出的数量关系是？", ["只有两件售出", "全部售出", "除两件外都售出"], 2, "All but two pieces sold", "but在这里表示除外；先理解数量关系，不能按普通转折‘但是’读。", "comparison-scope", "collocation"),
  ],
  "2010-p1-s3": [q("predicative", "a last victory在说明什么？", ["这次拍卖是什么——表语", "was的动作承受者——宾语", "时间——状语"], 0, "It was a last victory", "was连接事件与评价，是主系表；a last victory不是被was作用的对象。", "basic-svc", "predicate")],
  "2010-p1-s4": [
    q("as-time", "As把拍卖与破产连成什么关系？", ["因为拍卖所以破产", "两事同时发生", "假如拍卖就会破产"], 1, "As the auctioneer called out bids", "As从句有the auctioneer / called out / bids，在这里交代主句事件发生时的背景。不能单凭as猜原因。", "clause-time", "clause-boundary"),
    q("main-subject", "主句one of the oldest banks的中心是？", ["Wall Street", "banks", "one"], 2, "one of the oldest banks on Wall Street", "one是‘其中一家’，of…限定范围；Lehman Brothers同位说明这家银行的名称。", "subject-head", "subject"),
  ],
  "2010-p1-s5": [
    q("since-attachment", "since 2003给哪一个动作标起点？", ["losing", "rising", "二者同时"], 1, "after rising bewilderingly since 2003", "since 2003在after内部修饰rising；不能读成从2003年就开始失去势头。", "modifier-prepositional", "attachment"),
    q("duration", "for a while说明什么持续了一段时间？", ["拍卖举行", "rising", "had been losing momentum"], 2, "had already been losing momentum for a while", "它跟主句失去势头的过程；先认修饰的动作，再认‘时间状语’这个名称。", "time-reference", "attachment"),
    q("tense-reference", "had been losing从哪个角度回看？", ["前文2008年事件之前已持续一段时间", "2003年之前的某一刻", "一定在2008年当天结束"], 0, "had already been losing", "过去完成进行时从前文的过去节点回看持续过程，本身不保证过程在该节点结束。", "tense-past-perfect-progressive", "tense"),
  ],
  "2010-p1-s6": [
    q("worth-complement", "worth some $65 billion与was是什么关系？", ["动词加宾语", "系动词后的表语", "时间从句"], 1, "was worth some $65 billion", "worth是形容词，金额补足worth；整体说明it的价值，不是was的宾语。", "basic-svc", "predicate"),
    q("firm-apposition", "a research firm解释谁？", ["Arts Economics", "Clare McAndrew", "the figure"], 0, "Arts Economics, a research firm", "研究机构这个身份属于Arts Economics；founder…才说明Clare的身份。逐层挂回，别把所有逗号片段并列处理。", "apposition", "attachment"),
  ],
  "2010-p1-s7": [q("to-endpoint", "to $50 billion给出的是？", ["减少了500亿美元", "从500亿美元开始", "可能降到的规模"], 2, "may have come down to $50 billion", "to给终点，by才常给变化量；may还保留估计语气。then回到上句2007年峰值。", "comparison-scope", "collocation")],
  "2010-p1-s8": [
    q("comparison-dimension", "far beyond its size说哪方面超出体量？", ["关注度interest", "增长势头momentum", "拍卖次数"], 0, "generates interest far beyond its size", "读比较必须保留维度。作者比较关注度与市场体量，不是说增长势头超过其他行业。", "comparison-scope", "option-logic"),
    q("matched-role", "matched by few other industries挂在哪里？", ["作主句第二个谓语", "修饰way，说明方式", "修饰wealth，说明金额"], 1, "in a way matched by few other industries", "matched是过去分词后置修饰，way带被动关系；从句中的有限谓语仍是brings together。", "nonfinite-participle", "attachment"),
  ],
  "2010-p1-s9": [
    q("that-subject", "that followed…中的that指谁并作什么？", ["sale，作宾语", "spending，作表语", "weeks and months，作从句主语"], 2, "weeks and months that followed Mr. Hirst's sale", "that不是可随意丢掉的标签，它作followed的主语；sale是宾语。整个从句在时间介词短语内部。", "clause-relative", "reference"),
    q("deeply", "deeply直接加强哪个词？", ["unfashionable", "spending", "followed"], 0, "deeply unfashionable", "它说明‘多么不合时宜’，修饰形容词表语；became是系动词。", "modifier-adverb", "attachment"),
  ],
  "2010-p1-s10": [q("that-reference", "meant前的that在做什么？", ["引导定语从句", "代指上句现象，作meant主语", "作collectors的宾语"], 1, "that meant collectors stayed away", "外层that meant与内层collectors stayed away是两组主谓；宾语从句前的引导词that才是省略的。", "reference-pronoun", "reference")],
  "2010-p1-s11": [
    q("by-percentage", "down by nearly 90%表示？", ["降幅近90%", "还剩原来的近90%", "升至近90%"], 0, "down by nearly 90%", "by表示变化幅度，不能与表示终点的to互换。", "comparison-scope", "collocation"),
    q("year-to", "in the year to November 2008是哪段时间？", ["从2008年11月起的一年", "2008年11月当天", "截至2008年11月的一年"], 2, "in the year to November 2008", "to标出the year的结束点；要从终点向前看统计区间。", "time-reference", "tense"),
  ],
  "2010-p1-s12": [
    q("two-hads", "had to pay与had placed怎么区分？", ["两者都是过去完成时", "前者表当时不得不，后者表先前已委托", "前者表先前完成，后者表义务"], 1, "had to pay out nearly $200m in guarantees to clients who had placed", "had to接原形pay是义务；had接过去分词placed是过去完成时，委托先于赔付。", "modal-obligation", "tense"),
    q("them-reference", "with them中的them指谁？", ["clients", "works", "Sotheby's and Christie's"], 2, "clients who had placed works for sale with them", "把作品委托给的是前面的两家拍卖行；不能机械选最近的名词clients。", "reference-pronoun", "reference"),
  ],
  "2010-p1-s13": [q("since-clause", "本句since后为什么是从句？", ["后面有the Japanese / stopped这组主谓", "since后永远是从句", "因为有1989这个年份"], 0, "since the Japanese stopped buying Impressionists at the end of 1989", "看后接结构：这里有完整主谓；第5句since 2003只有时间点，是介词短语。", "clause-time", "clause-boundary")],
  "2010-p1-s14": [
    q("average", "平均跌约40%能推出每件作品都跌40%吗？", ["能，因为有experts", "不能，平均值不等于每个个体", "能，因为on their peak"], 1, "about 40% down on their peak on average", "about保留近似，on average限定平均口径；though还补充了部分价格波动更大。", "comparison-scope", "option-logic"),
    q("far-more", "far在far more fluctuant里直接加强什么？", ["some", "have been", "比较级more"], 2, "far more fluctuant", "far修饰比较级，表示波动大得多，不是距离远。", "modifier-adverb", "attachment"),
  ],
  "2010-p1-s15": [q("confident-content", "we're at the bottom在confident后做什么？", ["补足形容词所确信的内容", "作confident这个动词的宾语", "证明作者保证市场已恢复"], 0, "I'm pretty confident we're at the bottom", "confident是形容词表语；后句是省略that的内容补足从句。这是Dolman的信心，不能变成作者保证。", "complement-content", "clause-boundary")],
  "2010-p1-s16": [
    q("outer-predicate", "整句外层连接主语和表语的动词是？", ["makes", "says", "is"], 2, "he says, is that", "What…整块作主语，is连接它与that…表语；makes在主语从句里，he says是插入报道语。", "clause-subject", "predicate"),
    q("different", "different from the last在What从句里说明谁？", ["What", "this slump", "buyers"], 1, "makes this slump different from the last", "makes后this slump是宾语，different…补充宾语状态，是宾语补足语。", "object-complement", "attachment"),
    q("that-role", "that there are still buyers…在外层作什么？", ["表语从句", "定语从句", "主语从句"], 0, "is that there are still buyers in the market", "系动词is后交代使两次低迷不同的具体内容；that不作内部主语，存在对象是buyers。", "clause-predicative", "clause-boundary"),
  ],
  "2010-p1-s17": [
    q("not-but", "not A but B否定和强调的分别是？", ["否定作品少，强调没人想买", "两者都否定", "否定需求不足，强调好作品供给不足"], 2, "not a lack of demand but a lack of good work to sell", "要把not和but成对保留；只抓lack就会把段落结论读反。", "negation-contrast", "passage-logic"),
    q("who-that", "who从句与said后的that从句分别管什么？", ["who限定受访的人；that给出所说内容", "两者都修饰everyone", "两者都是问句"], 0, "everyone who was interviewed for this special report said that", "who作定语从句主语并回指everyone；that只引导said的内容，内部另有主语the biggest problem。", "clause-object", "clause-boundary"),
  ],
  "2010-p1-s18": [q("dash-predicate", "略过两个破折号间的解释，主句谓语在哪？", ["death", "still deliver", "to the market"], 1, "still deliver works of art", "death、debt、divorce是同位说明的三个名词；回来接The three Ds still deliver…，不要在插入内容里找主句动词。", "finite-predicate", "predicate")],
  "2010-p1-s19": [
    q("waiting-subject", "是谁在waiting？", ["confidence", "the market", "anyone who does not have to sell"], 2, "anyone who does not have to sell is keeping away, waiting", "waiting与is keeping away共用执行者：不必出售的人。它是分词补充状态，不是新的有限谓语。", "nonfinite-subject", "attachment"),
    q("return-subject", "谁执行to return中的return？", ["confidence", "卖家anyone", "两者同时"], 0, "waiting for confidence to return", "wait for A to do里A执行do，恢复的是信心。不要把外层waiting的逻辑主语套给内层return。", "nonfinite-subject", "attachment"),
  ],
};
