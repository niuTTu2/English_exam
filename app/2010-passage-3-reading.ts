import type { SentenceReadingGuide } from "./data";

export const passage2010P3Reading: Record<string, SentenceReadingGuide> = {
  "2010-p3-s1": {
    focus: "perfected 是动词，art 是宾语‘手法’；后面 of creating…才说明这个手法的内容，habits 只是插入解释。",
    questions: [
      { question: "破折号前后怎样接回去？", evidence: "the art of creating automatic behaviors – habits – among consumers", answer: "先读 art of creating behaviors：培养行为的手法。automatic 修饰 behaviors；两个破折号之间的 habits 为同位解释。among consumers 修饰 creating 的人群范围，不是让 consumers 变成主句主语。" },
      { question: "Over the past decade 一定要改用现在完成时吗？", evidence: "Over the past decade, many companies had perfected", answer: "保留原卷 had perfected。had + 过去分词是过去完成时，表达在一个过去参照点之前已做到；开头时间短语限定过程覆盖的十年，本句没有把参照点写成某个具体日期，不凭模板改成 have。" },
    ],
  },
  "2010-p3-s2": {
    focus: "help 后有两层动作：习惯帮助企业，企业赚到钱。when 后才进入消费者吃零食、擦台面的场景。",
    questions: [
      { question: "earn 是与 helped 并列的谓语吗？", evidence: "have helped companies earn billions of dollars", answer: "不是。have helped 为主句谓语，companies 是宾语，earn…是省略 to 的不定式宾补；赚钱的是 companies。billions of dollars 是 earn 的宾语，不是 helped 的第二个宾语。" },
      { question: "几乎不思考和经常响应提示，修饰什么？", evidence: "almost without thinking, often in response to a carefully designed set of daily cues", answer: "两组都补充前面消费者的日常动作。almost 修饰 without thinking，often 限定响应提示的频率；carefully 修饰过去分词 designed，carefully designed 整体修饰 set。daily 修饰 cues，不能把 carefully 直接当 eat 或 wipe 的方式。" },
    ],
  },
  "2010-p3-s3": {
    focus: "that 越过脏手的例子回头修饰 problems；because 又嵌在这个定语从句里，解释问题为什么仍然致命。",
    questions: [
      { question: "There、that、we 分别属于哪一层？", evidence: "that remain killers only because we can't figure out how to change people's habits", answer: "外面 There are problems 是存在句；that 代 problems 作 remain 的主语，killers 为表语；再里面 we 是 because 原因从句主语，can't figure out 是谓语。only 加强这个原因，不能错把 soap habit 作为 remain 的主语。" },
      { question: "how to change 是完整宾语从句吗？", evidence: "how to change people's habits", answer: "这是疑问词 + 不定式，作 figure out 的宾语，意为‘怎样改变人们的习惯’。change 接 people's habits 为宾语，没有另外写出的主语或限定时态；可以解释含义，不能凭空添加一条有限定谓语的原文从句。" },
      { question: "引号后的长名词组是在解释问题吗？", evidence: "the director of the Hygiene Center at the London School of Hygiene & Tropical Medicine", answer: "不是。said Dr. Curtis 是报道语；the director…解释 Curtis 的身份，of the Hygiene Center 说明哪个中心的主任，at the London School…说明中心所在院校。人、中心、学校依次从属。" },
    ],
  },
  "2010-p3-s4": {
    focus: "wanted 后套着 learn，learn 后又套着 how to create；真正的定语从句只在 behaviors 后面。",
    questions: [
      { question: "from private industry 和 automatically 各修饰谁？", evidence: "learn from private industry how to create new behaviors that happen automatically", answer: "from private industry 说明向谁学习，接 learn；how to create…是学习内容。that 从句修饰 behaviors，that 自己作 happen 的主语；automatically 是 happen 的方式状语，不是 wanted 的程度。" },
    ],
  },
  "2010-p3-s5": {
    focus: "先锁定 companies had invested money；两处 that 都是关系词，但第一处代公司，第二处代提示。",
    questions: [
      { question: "that 在两处分别缺哪个位置？", evidence: "that Dr. Curtis turned to", answer: "第一处 Dr. Curtis 是主语、turned to 是求助，that 对应介词 to 的对象，回指 companies。第二处 corporations could use…已有主语 corporations，that 对应 use 的宾语，回指 cues；不能看到 that 就自动标成从句主语。" },
      { question: "finding 后为什么不能在 lives 就停？", evidence: "finding the subtle cues in consumers' lives that corporations could use to introduce new routines", answer: "finding 交代投资寻找什么，不是与 invested 并列的限定谓语。它的宾语中心为 cues；in consumers' lives 限定提示所在场景，that 从句进一步说明这些提示能用来做什么，需一起保留在 finding 里面。引入惯例的是 corporations，不是 cues 自己行动。" },
    ],
  },
  "2010-p3-s6": {
    focus: "长产品清单可以先跳过：你会发现，许多产品是人为塑造习惯的结果；清单没有改变主谓关系。",
    questions: [
      { question: "If、that 与 we use 分别是什么？", evidence: "If you look hard enough, you'll find that many of the products we use every day", answer: "If you look…给 find 设条件；that 引出发现的内容；we use every day 是修饰 products 的定语从句，宾语关系词省略，products 是 use 的语义宾语。hard 修饰 look，enough 后置修饰 hard，every day 则修饰 use。" },
      { question: "are 要和哪一个名词一致？", evidence: "are results of manufactured habits", answer: "与前面 many of the products 这一复数主语一致，不跟清单最后的 vitamins 单独建立主谓。results 是表语，of manufactured habits 说明结果来自什么；manufactured 是修饰 habits 的分词，强调习惯被人为塑造。" },
    ],
  },
  "2010-p3-s7": {
    focus: "主句是 few people brushed their teeth；few 带否定意味，频率信息不能掩盖‘当时很少有人这样做’。",
    questions: [
      { question: "三个时间相关成分一样吗？", evidence: "A century ago, few people regularly brushed their teeth multiple times a day", answer: "A century ago 标明什么时候，regularly 表有规律地做，multiple times a day 说明每天多次的频率，均围绕 brushed。few people 为主语，their teeth 为宾语；不是说没有人刷牙，而是很少有人规律地每天刷多次。" },
    ],
  },
  "2010-p3-s8": {
    focus: "give 有两个宾语：给牙齿一次清洁。原因、频率、所用品牌都围绕这个刷牙动作。",
    questions: [
      { question: "pearly whites 和 scrub 怎样分工？", evidence: "give their pearly whites a cavity-preventing scrub", answer: "their pearly whites 借‘珍珠般洁白之物’指牙齿，是间接宾语；a cavity-preventing scrub 是直接宾语，表一次防蛀清洁。cavity-preventing 修饰 scrub，give 在这里不译成把牙齿送给别人。" },
      { question: "because of 和 with 后有从句吗？", evidence: "because of shrewd advertising and public health campaigns", answer: "这里 because of 接两项并列名词，整体作原因状语，没有从句主谓。末尾 with 接使用的品牌，表工具；twice a day 是频率，often 限定使用这些品牌的频率，各自的信息不要并成一个笼统‘修饰语’。" },
    ],
  },
  "2010-p3-s9": {
    focus: "outside of a meal 限定喝水的时机，不是人在餐食的外面；否定的是非就餐时喝水这一行为。",
    questions: [
      { question: "主句的否定和时间怎么组合？", evidence: "many people didn't drink water outside of a meal", answer: "many people 为主语，didn't drink 为过去时否定谓语，water 为宾语；outside of a meal 是时间/活动范围状语。结合开头 A few decades ago，意思是几十年前很多人吃饭之外不喝水，不是那些人完全不喝水。" },
    ],
  },
  "2010-p3-s10": {
    focus: "and 连接两套主谓，then 与 now 对照：企业开始装瓶销售，后来职员养成随手喝瓶装水的习惯。",
    questions: [
      { question: "bottling、bottled 为什么不是同一种成分？", evidence: "started bottling the production of far-off springs", answer: "bottling 是 start 后的 -ing 补足结构，bottle 在此作动词；the production 是它的宾语，of far-off springs 限定水的来源。后半句 bottled 修饰 water，是过去分词定语；真正谓语是 sip。" },
      { question: "unthinkingly 与 all day long 各指什么？", evidence: "office workers unthinkingly sip bottled water all day long", answer: "unthinkingly 是方式副词，修饰 sip，说明没有刻意思考；all day long 是持续时间状语，long 加强整天之久。不能把 far-off 当成喝水时的距离状语，它只修饰 springs。" },
    ],
  },
  "2010-p3-s11": {
    focus: "主干是口香糖现在被宣传成某种用品；once bought…回顾旧消费者，与 now 形成对照。",
    questions: [
      { question: "bought 和 featured 谁是句子谓语？", evidence: "Chewing gum, once bought primarily by adolescent boys, is now featured", answer: "谓语为 is featured，now 修饰它；bought 是补充修饰 gum 的过去分词，与 gum 为被动关系。once 和 primarily 分别说明曾经、主要，by adolescent boys 引购买者；这段没有另一个带时态的谓语。" },
      { question: "for use after a meal 怎样一层层接？", evidence: "as a breath freshener and teeth cleanser for use after a meal", answer: "as 引被宣传的两种用途；for use…再限定饭后使用这一用途。use 在介词 for 后是名词，after a meal 限定使用时间；不是不定式，也不是名叫 use 的人做了什么。" },
    ],
  },
  "2010-p3-s12": {
    focus: "slipped in 用分词补充产品如何被塞进惯例；between 两端是梳头和化妆两项活动。",
    questions: [
      { question: "为什么 putting 不是主句进行时？", evidence: "slipped in between hair brushing and putting on makeup", answer: "主句谓语在前面的 are advertised；slipped 是被动含义的过去分词。between 接 hair brushing 与 putting on makeup 两个并列名词性活动，makeup 是 put on 的宾语。这里说顺序上的插入，不是空间夹缝。" },
    ],
  },
  "2010-p3-s13": {
    focus: "先分引语与报道语，再分两个人物/机构说明：心理学家解释 Berning，公司解释宝洁。",
    questions: [
      { question: "when 和两个关系从句各接在哪里？", evidence: "when they become part of daily or weekly patterns", answer: "when 从句限定引语内 succeed 的时间兼条件，they 指产品。who recently retired…修饰 psychologist；that sold…修饰 company。不是心理学家个人销售了760亿美元产品，也不是产品退休。" },
      { question: "recently 与 last year 分别修饰哪件事？", evidence: "who recently retired from Procter & Gamble, the company that sold $76 billion of Tide, Crest and other products last year", answer: "recently 修饰退休 retired；last year 在更内层修饰公司销售 sold。the company…解释 Procter & Gamble，整块留在其所属的机构说明里；last year 按原文写作时点理解，不能自动换成读者打开网站时的上一年。" },
    ],
  },
  "2010-p3-s14": {
    focus: "两个判断都在评价‘培养习惯’；essential to 中的 to 是介词，making 后又有宾语和形容词宾补。",
    questions: [
      { question: "it 指产品，还是培养习惯这件事？", evidence: "Creating positive habits is a huge part of improving our consumers' lives, and it's essential", answer: "it 回指 Creating positive habits 整件事。前半句动名词短语作主语，所以 is 用单数；a huge part…为表语，of improving…说明属于哪项活动。后半句 essential 继续评价同一件事，不是夸产品本身不可或缺。" },
      { question: "commercially 修饰 making 还是 viable？", evidence: "to making new products commercially viable", answer: "to 是 essential 需要的介词，所以接 making。making 的宾语是 new products，宾补是 viable，表示使产品可行；commercially 修饰 viable，限定为商业上可行，不是修饰 products 的形容词。" },
    ],
  },
  "2010-p3-s15": {
    focus: "两个 through 管不同的动作：实验观察是得知结论的依据，广告则是绑定行为与提示的手段。",
    questions: [
      { question: "哪里是方法，哪里是学到的内容？", evidence: "Through experiments and observation, social scientists like Dr. Berning have learned", answer: "句首 Through…修饰 have learned；like Dr. Berning 是主语中的举例定语，说明哪些社会科学家。have learned 才是主句谓语，that 后整个存在句是所学到的内容。" },
      { question: "tie A to B 内部怎样分？", evidence: "in tying certain behaviors to habitual cues through ruthless advertising", answer: "in 接 -ing 结构，说明效力所在。tying 接 certain behaviors 为宾语，to habitual cues 给绑定目标，through ruthless advertising 修饰 tying 的手段；不能把这里的 to 当作不定式，也不能把广告当 have learned 的研究方法。" },
    ],
  },
  "2010-p3-s16": {
    focus: "As 交代新学科兴起的背景，when 缩小到有争议的用法；不是说这门科学的一切应用都必然引发争议。",
    questions: [
      { question: "have been used to sell 是‘过去常卖’吗？", evidence: "when the tactics have been used to sell questionable beauty creams or unhealthy foods", answer: "不是。have been used 是现在完成时被动，主语 tactics 是被使用的手段；to sell 是目的不定式。used to + 原形才是另一种‘过去常常’结构，这里不能省掉 have been。" },
      { question: "questionable 和 unhealthy 各管哪一项？", evidence: "questionable beauty creams or unhealthy foods", answer: "or 并列 beauty creams 与 foods，分别由 questionable、unhealthy 修饰。两项都是 sell 的宾语；当这些手段用于问题商品时争议爆发，As 从句提供时间背景，不能自动改成唯一原因。" },
    ],
  },
};
