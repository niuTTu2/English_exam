export type VocabularySense = {
  id: string;
  partOfSpeech: string;
  meaning: string;
  use: string;
  example: { english: string; chinese: string };
};

export type VocabularySenseGuide = {
  label: string;
  senses: VocabularySense[];
};

function sense(id: string, partOfSpeech: string, meaning: string, use: string, english: string, chinese: string): VocabularySense {
  return { id, partOfSpeech, meaning, use, example: { english, chinese } };
}

const phraseSenseGuides: Record<string, VocabularySense[]> = {
  "make up": [
    sense("invent", "短语动词", "编造；创造", "make up a story / excuse / word；可分开，代词放中间，如 make it up。创造词语不一定含欺骗意味。", "The child made up a story about the moon.", "孩子编了一个关于月亮的故事。"),
    sense("constitute", "短语动词", "组成；占", "部分 + make up + 整体；整体 + be made up of + 部分。两个结构的主语不同。", "Women make up half of the team.", "女性占团队成员的一半。"),
    sense("complete", "短语动词", "补足；补回", "make up the difference / lost time 表示补足差额、补回损失的时间；不要与 make up a story 混淆。", "We worked late to make up the lost time.", "我们工作到很晚，以补回损失的时间。"),
    sense("prepare", "短语动词", "配制；整理；准备", "make up a bed 是铺床；make up a package 是把物品组合成包裹。", "They made up a bed for the guest.", "他们为客人铺好了一张床。"),
    sense("reconcile", "短语动词", "和好；言归于好", "make up with somebody 表示与某人和好；不接编造义的事物宾语。", "The two friends made up after the argument.", "两个朋友争吵后和好了。"),
    sense("cosmetics", "短语动词", "化妆；给……化妆", "make somebody up 表示给某人化妆；名词 make-up / makeup 指化妆品或妆容，词性不同。", "The actors were made up before filming.", "演员们在拍摄前化了妆。"),
  ],
  "in turn": [
    sense("sequence", "副词短语", "依次；轮流", "each / one after another 的顺序语境；take turns doing something 另是‘轮流做’的动词结构。", "Each student read a paragraph in turn.", "每个学生依次读了一段。"),
    sense("consequence", "衔接短语", "转而；相应地；继而；反过来", "连接前因与后续影响，不必有轮流动作；中文‘反过来’也不必表示相反结果。", "Higher costs raised prices, which in turn reduced demand.", "成本上升推高了价格，继而使需求减少。"),
  ],
  "as well as": [
    sense("addition", "添加结构", "以及；除……之外还", "A as well as B 强调 A 并补充 B；连接主语时谓语通常与 A 一致，不能直接套用 and 的复数规则。", "She studies history as well as economics.", "她除了经济学，还学习历史。"),
    sense("comparison", "同级比较结构", "和……一样好", "as + 副词 well + as 比较动作完成程度；前可加 almost，后可用助动词代替重复动词。此时不是‘以及’。", "The young plants survived almost as well as the older ones did.", "幼苗的存活情况几乎和较老的植株一样好。"),
  ],
  "rather than": [
    sense("contrast", "取舍连接结构", "而不是；而非", "连接平行的名词、形容词、介词短语或动词结构；说明实际选择或准确描述，不作程度比较。", "The change affects quality rather than quantity.", "这一变化影响的是质量，而不是数量。"),
    sense("preference", "取舍连接结构", "宁可……而不……", "would / prefer to ... rather than ... 表达偏好；rather than 后的形式依平行结构确定，不机械地全部改成 doing。", "She would walk rather than wait for another bus.", "她宁愿步行，也不愿再等一班公交车。"),
  ],
  "a note of": [
    sense("tone", "名词搭配", "一丝……的意味；……的语气或色彩", "a note of + 情绪 / 态度名词；heavy / faint 等描述程度。hypocrisy 是虚伪意味，hope 是希望的色彩，不能都译为注释。", "His reply contained a note of optimism.", "他的回答带着一丝乐观的意味。"),
    sense("record", "名词搭配", "……的记录", "make / keep a note of + 信息表示记下信息；与 a note of irony 的情绪义由搭配和宾语区分。", "Make a note of the reference number.", "记下这个参考编号。"),
  ],
  "on a ... note": [
    sense("tone", "方式状语", "以……的基调；带着……的情绪色彩", "begin / end on a positive / sad / dramatic note 描述开头或结尾的基调；不能固定译成某一种情绪。", "The meeting ended on a positive note.", "会议在积极的气氛中结束。"),
    sense("transition", "话题衔接语", "说到……；换一个……的话题", "on a different / lighter note 用于转到不同或较轻松的话题；并非真的谈论音符。", "On a lighter note, the team celebrated its anniversary.", "再说件轻松些的事，团队庆祝了成立周年。"),
  ],
  "in company": [
    sense("together", "介词短语", "结伴；有同伴；在人群中", "in company 与 alone 相对，company 是陪伴；不能因为 company 常指公司而误译。", "The birds travel in company rather than alone.", "这些鸟结伴迁徙，而不是独自行动。"),
    sense("accompanied", "介词短语", "与……一起；由……陪同", "in company with + 人，明确同行者；keep somebody company 则是陪伴某人的动词搭配。", "She arrived in company with two colleagues.", "她与两名同事一同到达。"),
  ],
};

const phraseSenseFamilies: Record<string, string> = {
  "make-up-words": "make up",
  "in-turn": "in turn",
  "collocation:as well as": "as well as",
  "survive-as-well-as": "as well as",
  "rather-than": "rather than",
  "rather-than-parliament": "rather than",
  "narrow-rather-widen": "rather than",
  "a-heavy-note-of-hypocrisy": "a note of",
  "2010-p1-ended-on-a-dramatic-note": "on a ... note",
  "in-company": "in company",
};

export function getVocabularySenseGuide(headword: string, phraseKey?: string): VocabularySenseGuide | undefined {
  const label = phraseKey ? phraseSenseFamilies[phraseKey] : headword.toLowerCase();
  if (!label) return undefined;
  const senses = phraseKey ? phraseSenseGuides[label] : wordSenseGuides[label];
  return senses ? { label, senses } : undefined;
}

export const wordSenseGuides: Record<string, VocabularySense[]> = {
  note: [
    sense("record", "n.", "笔记；记录", "take / make notes 表示做笔记；lecture notes 是课堂笔记。复数 notes 常指成组记录。", "She took notes during the lecture.", "她在讲座中做了笔记。"),
    sense("message", "n.", "便条；简短留言", "leave / write a note 表示留便条、写短笺；a note to somebody 指给某人的留言。", "He left a note on the kitchen table.", "他在厨房桌上留了一张便条。"),
    sense("annotation", "n.", "注释；附注", "explanatory notes 是说明性注释；notes to a chapter 指某章的注释，不是听课笔记。", "The notes explain several technical terms.", "这些注释解释了几个专业术语。"),
    sense("music", "n.", "音符；单音；音高", "play / sing a note 表示奏出或唱出一个音；a high / low note 是高音或低音。", "The singer held the final note for several seconds.", "歌手把最后一个音延长了几秒。"),
    sense("tone", "n.", "调子；基调；意味；情感色彩", "a note of + 情绪名词指某种意味；on a ... note 描述讲话、事件开头或结尾的基调，不一定涉及音乐。", "There was a note of doubt in her voice.", "她的声音里带着一丝怀疑。"),
    sense("notice", "v.", "注意；留意到", "note + 名词 / that 从句表示注意到某事；Please note that... 可译为‘请注意……’。", "Please note that the library closes at six.", "请注意，图书馆六点关门。"),
    sense("write-down", "v.", "记录；记下", "note / note down + 信息；代词放中间，如 note it down，不能写成 note down it。", "She noted down the date of the interview.", "她记下了面试日期。"),
    sense("mention", "v.", "指出；提到；特别说明", "note that... 或 as somebody notes 常用于引述作者、报告的论述；此时是‘指出’，不只是‘察觉’。", "The report notes that demand has fallen.", "报告指出需求已经下降。"),
    sense("banknote", "n.", "纸币（尤英式英语）", "a ten-pound note 是一张十英镑纸币；美式常用 bill。", "He paid with a twenty-pound note.", "他用一张二十英镑纸币付款。"),
    sense("importance", "n.（固定表达）", "重要性；显著性；名望", "of note 表示值得注意的、有名的；take note of 是‘注意到’，两个结构不能混同。", "The town produced several writers of note.", "这个小镇出了几位知名作家。"),
    sense("formal-document", "n.", "简短正式文书；照会", "a diplomatic note 指外交照会，强调正式书面沟通；不是一般的私人留言。", "The embassy sent a diplomatic note.", "大使馆发出了一份外交照会。"),
    sense("debt", "n.（金融语境）", "票据；书面支付承诺", "promissory note 指本票，即书面承诺支付约定款项；不能一律译成纸币。", "The company issued a promissory note.", "这家公司出具了一张本票。"),
  ],
  company: [
    sense("business", "n.", "公司；商号", "work for / run a company 表示为公司工作、经营公司；复数 companies。", "The company opened a new office.", "这家公司开设了一间新办事处。"),
    sense("companionship", "n.", "陪伴；同伴", "keep somebody company 表示陪伴某人；in company 指有伴、结伴。此义通常不可数，不能译成公司。", "She stayed to keep her father company.", "她留下来陪伴父亲。"),
    sense("performers", "n.", "剧团；演出团体", "a theatre / dance company 指共同演出的团体，与商业公司的侧重点不同。", "The dance company performed in three cities.", "这个舞蹈团在三个城市进行了演出。"),
    sense("military", "n.", "连；连队", "a company of soldiers 指军事编制中的一个连，结合军事语境判断。", "A company of soldiers guarded the bridge.", "一个连的士兵守卫着这座桥。"),
  ],
  address: [
    sense("location", "n.", "地址；通信地址", "home / email address 分别是住址、电子邮箱地址；此处是可数名词。", "Please check the delivery address.", "请核对收货地址。"),
    sense("speech", "n.", "正式讲话；演说", "give / deliver an address to + 听众，表示向某群体发表正式讲话。", "She gave an address to the graduates.", "她向毕业生发表了讲话。"),
    sense("speak", "v.", "向……讲话；致辞", "address + 人 / 听众，直接接宾语；不能套成 address to the audience。", "The chair addressed the audience.", "主席向听众致辞。"),
    sense("deal-with", "v.", "处理；着手解决", "address a problem / issue / concern 表示正面处理问题或关切，但不保证已经解决。", "The policy addresses unequal access to education.", "这项政策着手处理教育机会不平等的问题。"),
    sense("call", "v.", "称呼", "address somebody as + 称谓，表示以某种称号称呼某人。", "The students addressed her as Professor Li.", "学生们称她为李教授。"),
    sense("write-address", "v.", "在……上写地址；寄给", "address a letter to somebody 指在信上写明收信人；与演说义区别。", "The envelope was addressed to the editor.", "信封上写的收信人是编辑。"),
  ],
  interest: [
    sense("curiosity", "n.", "兴趣；关注", "show / take an interest in + 名词 / doing，表示对某事感兴趣；in 是介词。", "The course increased her interest in history.", "这门课增强了她对历史的兴趣。"),
    sense("hobby", "n.", "爱好；感兴趣的活动", "interests 常用复数，指一个人的不同爱好；不等于经济利益。", "His interests include gardening and photography.", "他的爱好包括园艺和摄影。"),
    sense("benefit", "n.", "利益；利害关系", "in somebody's interest(s) 表示符合某人的利益；public interest 是公共利益。", "The decision protects consumers' interests.", "这项决定保护消费者的利益。"),
    sense("finance", "n.", "利息", "pay / earn interest 表示支付、获得利息；interest rate 是利率，此义通常不可数。", "The bank pays interest on savings.", "银行向储蓄存款支付利息。"),
    sense("stake", "n.", "权益；股份", "an interest in a business 可指企业中的产权份额；根据投资语境判断，不译为爱好。", "She sold her interest in the business.", "她出售了自己在这家企业中的股份。"),
    sense("attract", "v.", "使感兴趣", "something interests somebody；interested 描述人感兴趣，interesting 描述事物有趣。", "The discovery interested many researchers.", "这项发现引起了许多研究人员的兴趣。"),
  ],
  subject: [
    sense("topic", "n.", "主题；话题；研究对象", "the subject of discussion 是讨论主题；实验中的 subject 也可指受试对象。", "The subject of the debate was public transport.", "辩论的主题是公共交通。"),
    sense("discipline", "n.", "学科；科目", "study / teach a subject 表示学习、教授某门学科。", "Physics is her favourite subject.", "物理是她最喜欢的学科。"),
    sense("grammar", "n.", "主语", "the subject of a sentence 指句法上的主语；不一定是动作实施者，如被动句。", "In this sentence, the subject is a long noun phrase.", "这个句子的主语是一个较长的名词短语。"),
    sense("citizen", "n.", "臣民；国民（君主制语境）", "a subject of a monarch 指受君主统治的人，不能机械译成主题。", "The king promised to protect his subjects.", "国王承诺保护他的臣民。"),
    sense("conditional", "adj.（subject to）", "受……影响的；取决于；须经", "be subject to change 是可能变更；subject to approval 是须经批准，to 为介词。", "The plan is subject to approval.", "这项计划须经批准。"),
    sense("expose", "v.", "使遭受；使经受", "subject somebody / something to + 名词；被动式 be subjected to，注意区别形容词 subject to。", "The materials were subjected to extreme heat.", "这些材料经受了极高温度的测试。"),
  ],
  state: [
    sense("condition", "n.", "状态；状况", "in a ... state 表示处于某种状态；state of mind 是心态。", "The building is in a poor state.", "这栋楼的状况很差。"),
    sense("country", "n.", "国家；政府", "the state 可指国家机器或政府；a member state 是成员国。", "The state funds basic education.", "国家为基础教育提供资金。"),
    sense("region", "n.", "州；邦", "a US state 指美国的一个州；与主权国家义通过上下文区分。", "The law differs from state to state.", "法律因州而异。"),
    sense("say", "v.", "陈述；明确说明", "state + 名词 / that 从句；state reasons 是说明理由，语气比普通 say 正式。", "The report states that costs have risen.", "报告明确指出成本已经上升。"),
    sense("government", "adj.", "国家的；政府的；国有的", "state schools / state ownership 分别指公立学校、国有制；修饰后面的名词。", "She attended a state school.", "她曾在一所公立学校就读。"),
  ],
  issue: [
    sense("topic", "n.", "议题；问题；争论点", "a political / social issue 指值得讨论的议题，不一定意味着故障；at issue 表示争议中的。", "Access to clean water is a global issue.", "获得清洁用水是一个全球性问题。"),
    sense("publication", "n.", "（报刊的）一期；期号", "the latest issue of a journal 指期刊最新一期，区别于某一篇 article。", "The article appeared in the May issue.", "这篇文章刊登在五月号上。"),
    sense("release", "n.", "发行；发放", "the issue of shares 指股票发行；on general issue 指普遍发放。", "The issue of new shares raised funds.", "新股发行筹集了资金。"),
    sense("announce", "v.", "发布；颁布", "issue a statement / warning 表示发布声明或警告，常见于正式书面语。", "The agency issued a warning about the storm.", "该机构发布了风暴预警。"),
    sense("provide", "v.", "发给；供给；签发", "issue somebody with something 或 issue something to somebody；如签发护照、发放设备。", "Each worker was issued with protective clothing.", "每名工人都领到了防护服。"),
  ],
  account: [
    sense("bank", "n.", "账户；账号", "open a bank account 是开立银行账户；an online account 是网络账号。", "She opened a savings account.", "她开立了一个储蓄账户。"),
    sense("description", "n.", "叙述；描述；报道", "give an account of something 表示叙述某事；eyewitness account 是目击者的描述。", "The witness gave a detailed account of the event.", "目击者详细叙述了事情的经过。"),
    sense("finance", "n.", "账目；财务记录", "accounts 常用复数；keep / audit accounts 分别是记账、审计账目。", "The accountant checked the annual accounts.", "会计核查了年度账目。"),
    sense("client", "n.", "客户；业务往来关系", "a major account 在商业语境中可指大客户，不能总译为账号。", "The agency won a major account.", "这家代理机构赢得了一个大客户。"),
    sense("consider", "短语（take account of）", "考虑到；把……纳入考虑", "take account of something = take something into account；不是简单地数账目。", "The model takes account of seasonal changes.", "这个模型考虑了季节变化。"),
    sense("reason", "短语（on account of）", "因为；由于", "on account of 后接名词或动名词；on no account 表示‘绝不’，不能漏掉否定。", "The flight was cancelled on account of fog.", "航班因雾而取消。"),
    sense("explain", "短语（account for）", "解释；说明原因", "account for + 现象，回答为什么发生；区别于表示比例的 account for。", "The theory cannot account for this result.", "这个理论无法解释这一结果。"),
    sense("proportion", "短语（account for）", "占（数量或比例）", "account for + 比例 / 份额，不表示算出；主语是构成总量的一部分。", "Transport accounts for a third of the cost.", "运输占总成本的三分之一。"),
  ],
  mean: [
    sense("signify", "v.", "意指；意思是", "What does ... mean? 询问含义；mean by ... 询问某一说法的意思。", "What does this symbol mean?", "这个符号是什么意思？"),
    sense("consequence", "v.", "意味着；必然涉及", "mean doing something 表示意味着要做某事；mean that... 引出结果或含义。", "Accepting the job means moving to another city.", "接受这份工作意味着要搬到另一个城市。"),
    sense("intend", "v.", "打算；有意", "mean to do something 是打算做某事，与 mean doing 的‘意味着’不同。", "I meant to reply yesterday.", "我本打算昨天回复。"),
    sense("importance", "v.", "对……重要；对……有意义", "mean a lot / little to somebody 表示对某人很重要或不重要。", "Your support means a lot to us.", "你的支持对我们非常重要。"),
    sense("unkind", "adj.", "刻薄的；吝啬的", "be mean to somebody 是对某人刻薄；be mean with money 是花钱吝啬。", "It was mean of him to laugh at her mistake.", "他嘲笑她的错误，实在刻薄。"),
    sense("average", "n. / adj.", "平均数；平均的", "the mean 是平均数；mean temperature 是平均温度；不与表示手段的名词 means 合并。", "The mean temperature increased this year.", "今年的平均温度上升了。"),
  ],
  figure: [
    sense("number", "n.", "数字；数量", "sales / unemployment figures 是销售额、失业数据；figures 常用复数。", "The latest figures show a decline in sales.", "最新数据表明销售额下降了。"),
    sense("person", "n.", "人物", "a leading / public figure 表示重要人物、公众人物，不译为数字。", "She became a leading figure in the movement.", "她成为这场运动中的一位重要人物。"),
    sense("shape", "n.", "身影；体形；轮廓", "a figure in the distance 是远处的人影；a slim figure 是苗条的身材。", "A dark figure stood near the gate.", "一个黑色人影站在大门附近。"),
    sense("diagram", "n.", "图；图表", "Figure 2 是图2；论文中用图号指向插图，区别于 table 表格。", "Figure 2 shows the main stages of the process.", "图2展示了这一过程的主要阶段。"),
    sense("think", "v.", "认为；估计", "figure that... 表示认为或估计，较口语化；figure something out 才是弄清楚、算出。", "We figured that the trip would take two hours.", "我们估计这趟行程要花两小时。"),
    sense("calculate", "v.", "计算", "figure the cost 表示计算费用；figure out a solution 是想出解决办法。", "They figured the total cost before ordering.", "他们在订购前算了总费用。"),
    sense("participate", "v.", "出现；占有地位；起作用", "figure in something 表示在某事中出现或起作用；figure prominently in 是占显著地位。", "Climate change figures prominently in the report.", "气候变化在报告中占据显著位置。"),
  ],
  term: [
    sense("word", "n.", "术语；措辞", "a technical term 是专业术语；in simple terms 表示用通俗的话说。", "The article explains several legal terms.", "这篇文章解释了几个法律术语。"),
    sense("period", "n.", "期限；任期；学期", "a term of office 是任期；school term 是学期；long-term 作定语表示长期的。", "Her term of office ends next year.", "她的任期明年结束。"),
    sense("conditions", "n.（常用复数）", "条件；条款", "terms of an agreement 是协议条款；on these terms 表示按这些条件。", "Both parties accepted the terms of the contract.", "双方都接受了合同条款。"),
    sense("relationship", "n.（固定表达）", "关系；相处状态", "be on good / bad terms with somebody 是与某人关系好或不好，不能按期限理解。", "She is on good terms with her neighbours.", "她与邻居关系很好。"),
    sense("mathematics", "n.", "项（数学）", "a term in an equation 是方程中的一项；不是方程的题目或术语名称。", "The equation contains three terms.", "这个方程包含三项。"),
    sense("name", "v.", "称作；把……叫作", "term something + 名词 / 形容词；be termed... 表示被称为，常用于学术描述。", "Researchers termed the effect a feedback loop.", "研究人员把这种效应称为反馈回路。"),
  ],
  matter: [
    sense("affair", "n.", "事情；问题", "a matter of concern 是令人关切的事；a matter of time 是时间问题。", "The committee discussed the matter at length.", "委员会详细讨论了这件事。"),
    sense("substance", "n.", "物质", "organic matter 是有机物；此义不可数，不等于单个事务。", "The soil contains organic matter.", "土壤中含有有机物。"),
    sense("material", "n.", "材料；内容", "reading matter 是阅读材料；printed matter 是印刷品。", "The waiting room provides plenty of reading matter.", "候诊室提供了许多阅读材料。"),
    sense("importance", "v.", "要紧；有影响；重要", "something matters / it matters whether...；通常不直接接人作宾语，可用 matter to somebody。", "What matters most is the quality of the evidence.", "最重要的是证据的质量。"),
    sense("concession", "短语（no matter）", "无论；不管", "no matter + 疑问词引导让步，如 no matter how / what；不是普通的‘没有事情’。", "We will continue no matter how difficult it becomes.", "无论变得多么困难，我们都会继续。"),
  ],
  present: [
    sense("gift", "n.", "礼物", "give somebody a present 表示送礼物；与动词‘呈现’区分词性。", "They gave her a farewell present.", "他们送给她一份告别礼物。"),
    sense("now", "n. / adj.", "现在；当前的", "at present 是目前；the present situation 是当前形势；不能与 presence（出席）混用。", "The present system needs improvement.", "现行制度需要改进。"),
    sense("attendance", "adj.", "在场的；存在的", "be present at a meeting 是出席会议；those present 是在场的人，形容词后置。", "All members were present at the meeting.", "全体成员都出席了会议。"),
    sense("give", "v.", "授予；呈交；赠送", "present somebody with something / present something to somebody，表示正式交付或赠予。", "The mayor presented her with an award.", "市长向她颁了奖。"),
    sense("show", "v.", "展示；陈述", "present evidence / findings 表示展示证据、报告研究结果；不是‘现在证据’。", "The team presented its findings to the committee.", "团队向委员会报告了研究结果。"),
    sense("pose", "v.", "造成；带来（问题、机会等）", "present a challenge / opportunity 表示带来挑战、机会，主语可以是事件或形势。", "The change presents a challenge for small firms.", "这一变化给小企业带来了挑战。"),
    sense("host", "v.", "主持（节目）", "present a programme 常见于英式英语，指担任节目主持，不是赠送节目。", "She presents a weekly science programme.", "她主持一档每周播出的科学节目。"),
  ],
  value: [
    sense("worth", "n.", "价值；价格", "market value 是市场价值；value for money 表示花钱值得，常用于评价性价比。", "The market value of the building has risen.", "这栋楼的市场价值上升了。"),
    sense("usefulness", "n.", "重要性；益处", "be of value to somebody 是对某人有价值；the value of education 指教育的意义。", "The data are of great value to researchers.", "这些数据对研究人员很有价值。"),
    sense("number", "n.", "数值；值", "the value of a variable 指变量的值；positive / negative value 是正值、负值。", "The variable can take any positive value.", "这个变量可以取任何正值。"),
    sense("principles", "n.（复数）", "价值观；行为准则", "social / moral values 是社会价值观、道德准则，不是商品价格的复数。", "The debate reflects different social values.", "这场辩论反映了不同的社会价值观。"),
    sense("appreciate", "v.", "珍视；重视", "value somebody / something 表示认为有价值；value something highly 是高度重视。", "We value your experience and advice.", "我们重视你的经验和建议。"),
    sense("estimate", "v.", "估价", "value something at + 金额；被动式 be valued at 表示估价为。", "The painting was valued at two million pounds.", "这幅画被估价为两百万英镑。"),
  ],
  move: [
    sense("motion", "v.", "移动；搬动；搬家", "move something 表示移动某物；move to a city 是搬到某城市。", "They moved the desk closer to the window.", "他们把书桌移得更靠近窗户。"),
    sense("develop", "v.", "推进；发展；改变立场", "move towards + 目标表示朝某方向发展；move on to another topic 是转到另一个话题。", "The talks moved towards an agreement.", "谈判朝着达成协议的方向推进。"),
    sense("emotion", "v.", "感动；触动", "be moved by something 表示被感动；a moving story 是感人的故事。", "We were deeply moved by her courage.", "我们被她的勇气深深感动。"),
    sense("prompt", "v.", "促使；使采取行动", "move somebody to do something 表示促使某人做某事，并非把人搬走。", "The evidence moved officials to reconsider the plan.", "这些证据促使官员重新考虑该计划。"),
    sense("propose", "v.", "正式提议；提出动议", "move that + 从句用于会议中正式提出建议；区别于普通移动义。", "She moved that the meeting be postponed.", "她正式提议推迟会议。"),
    sense("action", "n.", "行动；举措；一步棋", "make a move 是采取行动或走一步棋；a policy move 是政策举措。", "The new policy is a move towards greater equality.", "新政策是迈向更加平等的一项举措。"),
  ],
  practice: [
    sense("training", "n.", "练习；训练", "practice in doing something 是做某事的练习；此义一般不可数。", "Regular practice improves reading speed.", "经常练习能提高阅读速度。"),
    sense("application", "n.", "实践；实际运用", "in practice 是在实际中；put something into practice 是把某事付诸实践，与 in theory 相对。", "The method works well in practice.", "这种方法在实际中效果很好。"),
    sense("custom", "n.", "做法；惯例；习惯", "common practice 是通常做法；business practices 指经营方式，可用复数。", "It is common practice to review the results twice.", "把结果复核两遍是通常的做法。"),
    sense("profession", "n.", "（医师、律师的）执业；诊所；事务所", "a medical / legal practice 是诊所、律师事务所或相应执业活动。", "She joined a legal practice after graduation.", "她毕业后进入了一家律师事务所。"),
    sense("verb-training", "v.（美式）", "练习；实行", "美式动词 practice，英式通常拼作 practise；practice doing，不用 practice to do。", "He practices speaking English every day.", "他每天练习说英语。"),
    sense("verb-profession", "v.（美式）", "从事（医疗、法律等职业）", "practice medicine / law 是行医、从事法律工作；不是练习医学术语。英式常作 practise。", "She has practiced medicine for ten years.", "她已经行医十年了。"),
  ],
  observe: [
    sense("watch", "v.", "观察；监测", "observe somebody / something；observe somebody doing 强调正在发生的过程。", "The team observed birds flying in formation.", "团队观察了鸟群编队飞行的过程。"),
    sense("notice", "v.", "注意到；察觉", "observe that... 表示发现某种情况，不一定是长时间的科学观察。", "She observed that the room had become quiet.", "她注意到房间里安静了下来。"),
    sense("remark", "v.", "评论；指出", "somebody observes that... 在引述中常译为‘某人指出’，而非用眼睛观察。", "The author observes that the evidence is limited.", "作者指出证据有限。"),
    sense("obey", "v.", "遵守；奉行", "observe a law / rule / custom 表示遵守法律、规则或习俗。", "All visitors must observe the safety rules.", "所有访客都必须遵守安全规则。"),
    sense("celebrate", "v.", "庆祝；纪念；按习俗过节", "observe a holiday / festival 表示按规定或习俗庆祝、纪念，不是观看节日。", "The community observes the festival every spring.", "这个社区每年春天都庆祝该节日。"),
  ],
  charge: [
    sense("fee", "n. / v.", "费用；收费", "a charge for something 是某项费用；charge somebody money for something 是向某人收费。", "The museum charges visitors five pounds.", "博物馆向每位访客收取五英镑。"),
    sense("accusation", "n. / v.", "指控；控告", "charge somebody with + 罪名 / doing；face a charge of... 是面临……指控，不等于已经定罪。", "He was charged with theft.", "他被指控盗窃。"),
    sense("responsibility", "n.", "负责；掌管；照管", "in charge of 是负责；in the charge of 是由……负责。注意一个 the 会改变关系。", "She is in charge of the project.", "她负责这个项目。"),
    sense("assign", "v.", "赋予职责；委以任务", "charge somebody with a task / doing something 表示委托任务；宾语是职责时不是刑事指控。", "The team was charged with reviewing the evidence.", "团队受命审查这些证据。"),
    sense("electricity", "n. / v.", "电荷；充电", "electric charge 是电荷；charge a battery 是给电池充电。", "Please charge the battery before use.", "使用前请给电池充电。"),
    sense("rush", "n. / v.", "冲锋；冲向", "charge at / towards somebody 表示向某人猛冲；a charge 可指一次冲锋。", "The bull charged towards the gate.", "公牛向大门猛冲过去。"),
  ],
  case: [
    sense("situation", "n.", "情况；事例", "in some cases 是在某些情况下；be the case 表示情况属实。", "In some cases, the treatment takes longer.", "在某些情况下，治疗需要更长时间。"),
    sense("law-medicine", "n.", "案件；病例", "a court case 是诉讼案件；a case of flu 是一例流感。根据法律或医学语境选义。", "The hospital reported three new cases of flu.", "医院报告了三例新增流感病例。"),
    sense("argument", "n.", "论据；理由", "make a case for / against + 名词，表示提出支持或反对的理由；不是制造案件。", "The report makes a strong case for reform.", "报告提出了有力的改革理由。"),
    sense("container", "n.", "箱；盒；套", "a case for glasses 是眼镜盒；a display case 是陈列柜。", "Keep the camera in its case.", "把相机放在相机套里。"),
    sense("grammar", "n.", "格（语法）", "the possessive case 指所有格；格表示名词或代词在句中的语法关系。", "The ending marks the possessive case.", "这个词尾标示所有格。"),
    sense("letters", "n.", "字母的大小写", "upper case / lower case 分别是大写、小写；case-sensitive 指区分大小写的。", "Write your name in upper case.", "请用大写字母写下姓名。"),
    sense("precaution", "短语（in case）", "以防；万一", "in case + 从句表示预防；in case of + 名词表示如果发生；不要把预防结构一律当作 if。", "Take an umbrella in case it rains.", "带把伞，以防下雨。"),
  ],
};
