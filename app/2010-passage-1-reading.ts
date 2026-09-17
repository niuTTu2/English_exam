import type { SentenceReadingGuide } from "./data";

// 阅读难点逐句编写。不得用词性或连接词匹配批量生成这些解释。
export const passage2010P1Reading: Record<string, SentenceReadingGuide> = {
  "2010-p1-s1": {
    focus: "先找到 ended：结束的是一轮牛市。后面很长的拍卖、地点和日期，都在交代这轮牛市怎样收尾。",
    questions: [
      { question: "主语为什么一直读到 history？", evidence: "The longest bull run in a century of art-market history", answer: "中心是 bull run（牛市行情），longest 说明持续最久；in a century of art-market history 限定比较范围：艺术市场百年历史中。不要把 history 当主语。" },
      { question: "几个介词短语是在同一层吗？", evidence: "with a sale of 56 works by Damien Hirst", answer: "外层 with a sale 补充结束所伴随的拍卖事件；里面 of 56 works 说明拍卖什么，by Damien Hirst 再说明作品是谁创作的。不能把每个介词短语都直接挂到 ended 上。" },
      { question: "那串大写词和地点怎么放回去？", evidence: "Beautiful Inside My Head Forever", answer: "这是专场拍卖的名称，补充说明 sale；不是另一个句子的主语。最后补上 at Sotheby's in London（伦敦苏富比）和 on September 15th 2008（具体日期）。" },
    ],
  },
  "2010-p1-s2": {
    focus: "all but two 是“除两件外全部”，不是“只有两件”；fetching 交代卖出了多少钱，a record 再评价这个金额。",
    questions: [
      { question: "作品为什么能作 sold 的主语？", evidence: "All but two pieces sold", answer: "sell 可以不带宾语，表示商品售出。这里 sold 是一般过去时，主语是作品，不必补成被动；but 在数量短语中表示“除……之外”。" },
      { question: "逗号后的两块是什么关系？", evidence: "fetching more than £70m, a record for a sale by a single artist", answer: "fetching 是非谓语，接着说明这些作品卖得的金额；a record 是名词短语，补充评价这笔成交额。后者可以释义为“这创下了纪录”，但原文没有关系从句，不应凭空登记一个 which 从句。" },
    ],
  },
  "2010-p1-s3": {
    focus: "a last victory 是表语：评价这场成功拍卖是繁荣落幕前的最后一次胜利。短句本身是主系表结构。",
    questions: [
      { question: "It 指什么，last 为什么重要？", evidence: "It was a last victory", answer: "It 回指前面的拍卖成功；was 连接这件事与评价 a last victory。结合下句雷曼破产，last 应读成“最后的”，不是“上一次的”。" },
    ],
  },
  "2010-p1-s4": {
    focus: "As 把两件同时发生的事并在一起：伦敦还在喊价，纽约的雷曼兄弟却申请破产。这里不是因果关系。",
    questions: [
      { question: "为什么 As 这一块是从句？", evidence: "As the auctioneer called out bids", answer: "里面有自己的主语 the auctioneer、谓语 called out 和宾语 bids；As 给这整个事件加上“当……时”的关系，再去修饰主句 filed。" },
      { question: "one of… 和 Lehman Brothers 谁解释谁？", evidence: "one of the oldest banks on Wall Street, Lehman Brothers", answer: "按原文结构，one of the oldest banks on Wall Street 是主语名词组，中心是 one；逗号后的 Lehman Brothers 是同位语，点明这家银行的名称。两块指同一家银行，不是两个并列主语。" },
    ],
  },
  "2010-p1-s5": {
    focus: "两个时间短语管不同的动作：for a while 说失去势头持续了多久；since 2003 说上涨从何时开始。",
    questions: [
      { question: "had already been losing 究竟讲哪个时间？", evidence: "had already been losing", answer: "去掉副词 already，结构是 had + been + losing，即过去完成进行时。站在前文2008年拍卖与破产这一过去节点回看：市场在那之前就已持续一段时间失去势头。already 强调“当时早已如此”；这个时态本身不说明减弱过程在当天结束。" },
      { question: "after 后面为什么还能装进两个修饰语？", evidence: "after rising bewilderingly since 2003", answer: "先把整组读成“在上涨之后”。after 后接 rising 这个 -ing 非谓语结构，上涨的仍是 art market。组内 bewilderingly 是副词，说明上涨令人眼花缭乱；since 2003 是时间介词短语，给 rising 标起点。这两项都在解释 rising，而不是 losing。" },
      { question: "这句话最容易误读成什么？", evidence: "losing momentum for a while", answer: "不要读成“从2003年就开始衰退”。2003属于前面的上涨阶段；for a while 才给失去势头标持续时长。此外，lose momentum 是增长势头减弱，仅凭这个短语还不能断言价格已经连续下跌。" },
    ],
    timeline: [
      { label: "2003年起", explanation: "rising：先有一轮令人眼花缭乱的上涨。" },
      { label: "上涨之后", explanation: "losing momentum for a while：势头已减弱一段时间，具体从哪天开始未交代。" },
      { label: "前文2008年事件", explanation: "作为回看的过去参照点；到那时市场早已显出疲态。" },
    ],
  },
  "2010-p1-s6": {
    focus: "先读 it was worth some $65 billion。中间插入的是估算者及其身份，破折号后才补上与五年前的比较。",
    questions: [
      { question: "was worth 是动宾结构吗？", evidence: "it was worth some $65 billion", answer: "不是。was 是系动词，worth 是形容词；worth some $65 billion 整体是表语，金额补足 worth 的含义。some 在数字前表示“大约”。" },
      { question: "两个身份说明分别跟着谁？", evidence: "reckons Clare McAndrew, founder of Arts Economics, a research firm", answer: "reckons Clare McAndrew 是报道语倒装，正常语序为 Clare McAndrew reckons。founder of Arts Economics 解释 Clare 的身份；a research firm 再解释 Arts Economics 是什么机构，不能把公司身份挂到人身上。" },
      { question: "double 和 five years earlier 修饰什么？", evidence: "double the figure five years earlier", answer: "整块补充前面650亿美元这个金额：是五年前数字的两倍。five years earlier 限定 figure，即哪一年的数字；以2007年回推，是2002年，不是把市场达到峰值的时间改成五年前。" },
    ],
  },
  "2010-p1-s7": {
    focus: "may 表示估计，to 表示降到的终点：作者说规模可能已降至500亿美元，并没有说减少了500亿美元。",
    questions: [
      { question: "have come down 和 Since then 怎么配合？", evidence: "Since then it may have come down to $50 billion", answer: "then 回指上一句2007年峰值。may + have done 推测此前已经发生的变化；Since then 给这次回落标起点，to $50 billion 给它标终点数值。" },
    ],
  },
  "2010-p1-s8": {
    focus: "先分结论和原因：市场引起的关注远超其体量；because 后解释原因。matched…只修饰 way，不是主句谓语。",
    questions: [
      { question: "far beyond its size 到底什么超出什么？", evidence: "generates interest far beyond its size", answer: "产生的是 interest（关注）；关注度远超这个市场的体量，far 加强 beyond 的程度。原文没有说市场的规模或增长势头超过别的行业。" },
      { question: "原因从句在哪里结束？", evidence: "because it brings together great wealth, enormous egos, greed, passion and controversy in a way matched by few other industries", answer: "一直到句末。it 是市场，brings together 是谓语，五个并列名词是宾语；in a way…是这个汇聚动作的方式状语，也属于原因从句内部。" },
      { question: "matched 为什么不用当作第二个谓语？", evidence: "matched by few other industries", answer: "它紧跟名词 way，作过去分词后置定语，表示这种方式很少能被其他行业匹敌。可用 which is matched 来帮助理解被动关系，但原文只有分词短语；few 的否定意味使全句成为“鲜有行业可比”。" },
    ],
  },
  "2010-p1-s9": {
    focus: "外层 In… 是时间状语，里面 that followed… 是定语从句，专门限定 weeks and months；两层不能混成一个从句。",
    questions: [
      { question: "that 在从句里不是可以直接丢掉的标签吗？", evidence: "that followed Mr. Hirst's sale", answer: "that 不只引导从句，还作 followed 的主语，指 weeks and months；Mr. Hirst's sale 是宾语。这里 follow 是时间上“在……之后”，并不是那些月份主动跟随某个人。" },
      { question: "deeply 修饰动作还是状态？", evidence: "became deeply unfashionable", answer: "became 是系动词，unfashionable 是表语形容词；deeply 修饰这个形容词，加强程度。说的是消费变得极不合时宜、不受推崇，不能直接改写成所有人都失去了购买兴趣。" },
    ],
  },
  "2010-p1-s10": {
    focus: "meant 前的 that 是主语代词，指上一句的现象；真正的宾语从句从 collectors 开始，其引导词 that 被省略了。",
    questions: [
      { question: "怎样看出这里有两套主谓？", evidence: "that meant collectors stayed away from galleries and salerooms", answer: "外层是 that meant（这意味着）；里面是 collectors stayed away（收藏家避开）。from galleries and salerooms 补充避开的场所，and 连接两个场所，没有开启第三个分句。" },
    ],
  },
  "2010-p1-s11": {
    focus: "and 连接两组主谓：总体销售下降三分之二，最过热板块下降近九成。两个 by 都表示降幅。",
    questions: [
      { question: "they 与 in the most overheated sector 怎么配合？", evidence: "in the most overheated sector, they were down by nearly 90%", answer: "they 仍指 sales；前置的 in…把讨论范围收窄到最过热的板块。were 是系动词，down 表示下降状态，by nearly 90% 是下降幅度，不能译成还剩90%。" },
      { question: "to November 2008 是终点还是起点？", evidence: "in the year to November 2008", answer: "外层 in 给下降情况标统计时段；里面 to November 2008 限定 the year，指截至2008年11月的一年。不是从该月起往后的一年。" },
    ],
  },
  "2010-p1-s12": {
    focus: "别把两个 had 混为一种时态：had to pay 是当时不得不赔付；had placed 是在赔付之前已经委托售卖。",
    questions: [
      { question: "主句里谁付钱、付多少、付给谁？", evidence: "had to pay out nearly $200m in guarantees to clients", answer: "两家 auction houses 是付款方；had to pay out 是谓语部分；nearly $200m 是宾语金额；in guarantees 说明这是担保赔付款，to clients 指收款客户。宾语金额不能统统标成谓语。" },
      { question: "who 从句为什么在 to 短语里面？", evidence: "to clients who had placed works for sale with them", answer: "to clients 先确定收款人，who 从句再限定是哪类客户。里面 who 指客户，had placed 是谓语，works 是宾语；for sale 说明作品用于出售，with them 指委托给上述两家拍卖行，them 不是客户自己。" },
    ],
  },
  "2010-p1-s13": {
    focus: "这里 since 后面有完整主谓，构成时间从句；第5句的 since 2003 只有时间点，是介词短语。判断结构要看后接什么。",
    questions: [
      { question: "since 从句给哪一部分划范围？", evidence: "since the Japanese stopped buying Impressionists at the end of 1989", answer: "它给 the worst 划定比较的时间范围：自日本买家1989年底停止购买以来。at the end of 1989 放在这个从句里，修饰 stopped，不是说本轮低迷发生在1989年。" },
      { question: "buying 和 Impressionists 怎样理解？", evidence: "stopped buying Impressionists", answer: "stop doing 是停止做原来的事；buying Impressionists 是 stopped 的动名词宾语。Impressionists 字面是印象派画家，交易语境借指其作品。不能读成 stop to do（停下别的事去做）。" },
    ],
  },
  "2010-p1-s14": {
    focus: "40% 是专家估计的平均降幅，不是每件作品的固定降幅；though 后面用部分价格波动更大来作补充。",
    questions: [
      { question: "宾语从句中几个小短语分别做什么？", evidence: "that prices are about 40% down on their peak on average", answer: "prices 是主语，are 是系动词，down 是表语；about 40% 表大约低了多少，on their peak 给出比较基准，on average 表统计口径是平均。that 只作引导词，不充当从句主语。" },
      { question: "some 和 far more 应该挂到哪里？", evidence: "though some have been far more fluctuant", answer: "some 在这里代指部分价格；have been 是系动词的完成式，more fluctuant 是表语；far 修饰比较级 more，把“更加波动”加强成“波动大得多”。" },
    ],
  },
  "2010-p1-s15": {
    focus: "引语里先有 I am confident，再用 we're at the bottom 交代确信的内容。pretty 修饰 confident，意为“相当”。",
    questions: [
      { question: "confident 后面的句子是怎样接上的？", evidence: "I'm pretty confident we're at the bottom", answer: "confident 是形容词表语；后面的内容从句省略了 that，为这个形容词补足确信的内容。不要把它叫作 confident 这个动词的宾语，因为 confident 不是动词。" },
      { question: "底部是哪个底部？", evidence: "we're at the bottom", answer: "从句内部 we 是主语，are 是系动词，at the bottom 作表语。说话者把自己放在艺术市场之中，bottom 指市场低谷；这是业内人士的判断，不是作者已证明触底。" },
    ],
  },
  "2010-p1-s16": {
    focus: "主句只有一条连接：What…整块作主语，is 作系动词，that…整块作表语；中间 he says 可先括起来。",
    questions: [
      { question: "What 从句内部谁使什么变得不同？", evidence: "What makes this slump different from the last", answer: "What 自己就是 makes 的主语；this slump 是宾语；different from the last 是宾语补足语，说明 this slump 的状态。整体是“使本次低迷有别于上次的因素”，不是在提问“什么？”。" },
      { question: "两个引导词的工作一样吗？", evidence: "that there are still buyers in the market", answer: "不一样。前面的 What 在从句内还作主语；这里 that 只引导表语从句。there are 是存在句，存在的是 buyers；still 强调仍然有买家，in the market 说明存在范围。" },
    ],
  },
  "2010-p1-s17": {
    focus: "先读 everyone said，再看“谁说的”和“说什么”。最重要的是保留 not A but B：问题不是需求少，而是好作品供给少。",
    questions: [
      { question: "who 与 that 为什么是不同从句？", evidence: "who was interviewed for this special report", answer: "who 从句修饰 everyone，回答哪些人，还由 who 充当从句主语。said 后的 that 从句则整体作宾语，回答这些人说了什么；that 只引导，内部真正主语是 the biggest problem。" },
      { question: "表语内部还有哪层修饰？", evidence: "not a lack of demand but a lack of good work to sell", answer: "not 与 but 连接两组 a lack of…，共同作 is 后的表语；to sell 只限定 good work，表示可供出售的作品。删主干时也不能丢掉 not…but…，否则就看不出作者在纠正哪个误判。" },
    ],
  },
  "2010-p1-s18": {
    focus: "两个破折号之间解释 three Ds 是什么。读完这块，要回到 still deliver，才接上主句谓语。",
    questions: [
      { question: "death、debt、divorce 是三个从句吗？", evidence: "death, debt and divorce", answer: "它们是三个并列名词，分别为死亡、债务、离婚；整体作 the three Ds 的同位说明，没有自己的谓语，因此不是从句。" },
      { question: "作品怎样被“送到”市场？", evidence: "still deliver works of art to the market", answer: "still 修饰 deliver，强调这些因素仍在起作用；works of art 是宾语，to the market 指流向。这里用拟人表达：这三类人生变故促使藏家出售作品。" },
    ],
  },
  "2010-p1-s19": {
    focus: "who 从句限定哪些人选择观望；waiting 补充同一批人在等待。return 的逻辑主语却是 confidence，不能混为一层。",
    questions: [
      { question: "does not have to sell 是禁止出售吗？", evidence: "anyone who does not have to sell", answer: "不是。not 否定的是 have to（有必要），所以是“不必卖”，而非 must not sell（不准卖）。who 指 anyone；这个限定关系决定了本句说的是没有被迫出售压力的人。" },
      { question: "waiting 与 to return 各自是谁在做？", evidence: "waiting for confidence to return", answer: "waiting 是伴随的现在分词，逻辑主语承接 anyone，即藏家在等；for confidence to return 给出所等的事情，其中 confidence 是 return 的逻辑主语。中文合成“等待市场信心恢复”，不能让信心去等待。" },
    ],
  },
};
