import {reviewedLexicon,reviewedPhrases,type LexiconRow,type PhraseRow} from "./2011-content-helpers";
import type {SentenceWordContext} from "./contextual-vocabulary";
const rows:LexiconRow[]=[
  [
    "m",
    "",
    "abbr.",
    "百万",
    "$590m中的m是million的缩写，表示金额为5.9亿美元。",
    "$590m（5.9亿美元）",
    ""
  ],
  [
    "gloria",
    "",
    "proper n.",
    "格洛丽亚",
    "中奖者的名字，与MacKenzie构成人名。",
    "Gloria MacKenzie（格洛丽亚·麦肯齐）",
    ""
  ],
  [
    "mackenzie",
    "",
    "proper n.",
    "麦肯齐",
    "中奖者的姓氏，不把姓氏当一般背诵词。",
    "Gloria MacKenzie（格洛丽亚·麦肯齐）",
    ""
  ],
  [
    "widow",
    "widows",
    "n.",
    "寡妇",
    "an 84-year-old widow说明中奖者的身份。",
    "an elderly widow（一位年老的寡妇）",
    ""
  ],
  [
    "tin-roofed",
    "",
    "adj.",
    "铁皮屋顶的",
    "修饰house，描述房子屋顶的材料。",
    "a tin-roofed house（铁皮屋顶房屋）",
    ""
  ],
  [
    "florida",
    "",
    "proper n.",
    "佛罗里达州",
    "美国州名，in Florida说明房屋所在地。",
    "in Florida（在佛罗里达州）",
    ""
  ],
  [
    "undivided",
    "",
    "adj.",
    "未分割的；独得的",
    "undivided jackpot表示头奖由一人独得，不与其他赢家分享。",
    "an undivided jackpot（一人独得的头奖）",
    ""
  ],
  [
    "lottery",
    "lotteries",
    "n.",
    "彩票；抽奖",
    "lottery修饰jackpot或winners，指彩票活动。",
    "win the lottery（中彩票）",
    ""
  ],
  [
    "jackpot",
    "jackpots",
    "n.",
    "头奖；累积大奖",
    "lottery jackpot是彩票最高奖项。",
    "a lottery jackpot（彩票头奖）",
    ""
  ],
  [
    "hope",
    "hopes hoped hoping",
    "v.",
    "希望",
    "hopes后接省略that的宾语从句，内容是财富带来满足。",
    "hope for happiness（期盼幸福）",
    ""
  ],
  [
    "new-found",
    "",
    "adj.",
    "新近获得的",
    "修饰fortune，指刚赢得的财富。",
    "new-found wealth（新近获得的财富）",
    ""
  ],
  [
    "fortune",
    "fortunes",
    "n.",
    "财富；巨款",
    "new-found fortune指彩票赢得的钱，不是命运。",
    "a large fortune（一大笔财富）",
    ""
  ],
  [
    "yield",
    "yields yielded yielding",
    "v.",
    "产生；带来",
    "财富是主语，lasting feelings是产生的结果。",
    "yield benefits（带来益处）",
    ""
  ],
  [
    "lasting",
    "",
    "adj.",
    "持久的",
    "修饰feelings或satisfaction，强调幸福回报的持续性。",
    "lasting satisfaction（持久满足）",
    ""
  ],
  [
    "happy",
    "happier happiest",
    "adj.",
    "快乐的；幸福的",
    "Happy Money为书名组成；happier比较人们的幸福感。",
    "a happy life（幸福生活）",
    ""
  ],
  [
    "elizabeth",
    "",
    "proper n.",
    "伊丽莎白",
    "本书作者Elizabeth Dunn的名字。",
    "Elizabeth Dunn（伊丽莎白·邓恩）",
    ""
  ],
  [
    "dunn",
    "",
    "proper n.",
    "邓恩",
    "本书作者的姓氏，与Norton并列。",
    "Ms Dunn（邓恩女士）",
    ""
  ],
  [
    "michael",
    "",
    "proper n.",
    "迈克尔",
    "本书作者Michael Norton的名字。",
    "Michael Norton（迈克尔·诺顿）",
    ""
  ],
  [
    "norton",
    "",
    "proper n.",
    "诺顿",
    "本书另一位作者的姓氏。",
    "Mr Norton（诺顿先生）",
    ""
  ],
  [
    "academic",
    "academics",
    "n.",
    "学者",
    "two academics指本书的两位作者，不是形容词学术的。",
    "two academics（两位学者）",
    ""
  ],
  [
    "array",
    "arrays",
    "n.",
    "一系列；大量",
    "an array of修饰研究，表示一系列研究。",
    "an array of studies（一系列研究）",
    ""
  ],
  [
    "behavioral",
    "",
    "adj.",
    "行为的",
    "修饰research，表示研究人类行为。",
    "behavioral research（行为研究）",
    ""
  ],
  [
    "rewarding",
    "",
    "adj.",
    "令人满足的；有益的",
    "most rewarding评价花钱带来的幸福回报，不指盈利。",
    "a rewarding experience（令人满足的经历）",
    ""
  ],
  [
    "counterintuitive",
    "",
    "adj.",
    "与直觉相反的",
    "作表语，说明高幸福回报的花钱方式可能出乎意料。",
    "a counterintuitive finding（与直觉相反的发现）",
    ""
  ],
  [
    "fantasy",
    "fantasies",
    "n.",
    "幻想；想象",
    "fantasies of great wealth指对巨额财富的幻想。",
    "fantasies of wealth（对财富的幻想）",
    ""
  ],
  [
    "vision",
    "visions",
    "n.",
    "想象中的景象",
    "visions of cars and homes指脑海中浮现的消费画面。",
    "a vision of luxury（奢华生活的想象）",
    ""
  ],
  [
    "fancy",
    "",
    "adj.",
    "豪华的；精致的",
    "修饰cars，描绘对物质财富的幻想。",
    "fancy cars（豪车）",
    ""
  ],
  [
    "extravagant",
    "",
    "adj.",
    "奢华的；奢侈的",
    "修饰homes，强调豪宅的奢华。",
    "extravagant homes（奢华住宅）",
    ""
  ],
  [
    "satisfaction",
    "",
    "n.",
    "满足；满意",
    "with引出满足的来源，wears off说明这种感受消退。",
    "satisfaction with a purchase（对一次购买的满足）",
    ""
  ],
  [
    "purchase",
    "purchases purchased purchasing",
    "n.",
    "购买；购买物",
    "material purchases指买来的物品，These purchases回指购买体验。",
    "material purchases（物质消费）",
    ""
  ],
  [
    "wear",
    "wears wore worn wearing",
    "v.",
    "消退（与off连用）",
    "wear off描述满足感逐渐消失，不是穿衣。",
    "wear off（逐渐消退）",
    ""
  ],
  [
    "exciting",
    "",
    "adj.",
    "令人兴奋的",
    "was exciting说明事物带来的感觉，不是人自己感到兴奋。",
    "an exciting trip（令人兴奋的旅行）",
    ""
  ],
  [
    "old-hat",
    "",
    "adj.",
    "陈旧乏味的；过时的",
    "在becomes后作表语，表示新鲜感消失。",
    "become old-hat（变得陈旧乏味）",
    ""
  ],
  [
    "regret",
    "regrets",
    "n.",
    "后悔；遗憾",
    "regret作creeps in的主语，指消费后滋生的后悔。",
    "feel regret（感到后悔）",
    ""
  ],
  [
    "creep",
    "creeps crept creeping",
    "v.",
    "悄悄出现；缓慢进入",
    "creep in比喻后悔不知不觉出现。",
    "regret creeps in（后悔悄悄滋生）",
    ""
  ],
  [
    "interesting",
    "",
    "adj.",
    "有趣的",
    "修饰trips，强调体验吸引人而非价格昂贵。",
    "interesting trips（有趣的旅行）",
    ""
  ],
  [
    "trip",
    "trips",
    "n.",
    "旅行",
    "interesting trips是体验型消费的例子。",
    "take a trip（去旅行）",
    ""
  ],
  [
    "unique",
    "",
    "adj.",
    "独特的",
    "修饰meals，重点是独特用餐体验，不是食物丰盛。",
    "a unique experience（独特体验）",
    ""
  ],
  [
    "memory",
    "memories",
    "n.",
    "回忆；记忆",
    "as memories说明体验会沉淀为值得回味的记忆。",
    "happy memories（美好回忆）",
    ""
  ],
  [
    "connected",
    "",
    "adj.",
    "有联系的；亲近的",
    "feel connected to others表示感觉与他人更亲近。",
    "feel connected to others（感觉与他人相联结）",
    ""
  ],
  [
    "other",
    "others",
    "pron.",
    "其他人",
    "others单独用作宾语，指自己以外的人。",
    "help others（帮助他人）",
    ""
  ],
  [
    "slim",
    "slimmer slimmest",
    "adj.",
    "薄的",
    "slim volume表示薄薄的一本书，不表示内容价值低。",
    "a slim volume（一本薄书）",
    ""
  ],
  [
    "pack",
    "packs packed packing",
    "v.",
    "装满",
    "is packed with表示充满，主语是书。",
    "be packed with tips（满是建议）",
    ""
  ],
  [
    "tip",
    "tips",
    "n.",
    "实用建议；窍门",
    "书中帮助读者获得幸福回报的建议，不是小费。",
    "useful tips（实用建议）",
    ""
  ],
  [
    "wage",
    "wages",
    "n.",
    "工资",
    "wage修饰slaves，合起来调侃依赖工资生活的工薪族。",
    "earn a wage（挣工资）",
    ""
  ],
  [
    "slave",
    "slaves",
    "n.",
    "奴隶；受束缚者",
    "wage slaves整体比喻为工资奔忙的工薪族，并非真实奴役。",
    "wage slaves（工薪族，略带调侃）",
    ""
  ],
  [
    "winner",
    "winners",
    "n.",
    "获胜者；中奖者",
    "lottery winners指彩票中奖者。",
    "lottery winners（彩票中奖者）",
    ""
  ],
  [
    "happiness",
    "",
    "n.",
    "幸福；快乐",
    "happiness bang for your buck表示每一分钱换来的幸福回报。",
    "lasting happiness（持久幸福）",
    ""
  ],
  [
    "bang",
    "",
    "n.",
    "效益；回报",
    "bang for your buck习语中的bang表示效益，不是爆炸声。",
    "bang for your buck（花钱所获回报）",
    ""
  ],
  [
    "buck",
    "bucks",
    "n.",
    "美元；钱",
    "口语中指美元，在习语中泛指花的钱。",
    "a few bucks（几美元）",
    ""
  ],
  [
    "friend",
    "friends",
    "n.",
    "朋友",
    "spend time with friends表示花时间陪朋友。",
    "close friends（亲密朋友）",
    ""
  ],
  [
    "watch",
    "watches watched watching",
    "v.",
    "观看",
    "watch television表示看电视；watching在spend time doing结构中。",
    "watch television（看电视）",
    ""
  ],
  [
    "whopping",
    "",
    "adj.",
    "极大的；惊人的",
    "修饰two months，体现作者认为耗时惊人。",
    "a whopping amount（惊人的数量）",
    ""
  ],
  [
    "jolly",
    "jollier jolliest",
    "adj.",
    "快乐的",
    "hardly jollier表示几乎没有变得更快乐，不能漏掉hardly。",
    "feel jollier（感觉更快乐）",
    ""
  ],
  [
    "gift",
    "gifts",
    "n.",
    "礼物",
    "buying gifts指买礼物送人。",
    "buy gifts（买礼物）",
    ""
  ],
  [
    "charity",
    "charities",
    "n.",
    "慈善；慈善机构",
    "give to charity表示捐钱行善。",
    "give to charity（捐款行善）",
    ""
  ],
  [
    "pleasurable",
    "",
    "adj.",
    "令人愉快的",
    "比较为别人花钱和为自己买东西的快乐程度。",
    "a pleasurable activity（令人愉快的活动）",
    ""
  ],
  [
    "oneself",
    "",
    "pron.",
    "自己",
    "for oneself指为自己，而不是为别人。",
    "buy for oneself（为自己购买）",
    ""
  ],
  [
    "luxury",
    "luxuries",
    "n.",
    "奢侈品",
    "luxuries作主语，讨论适量享用带来的快乐。",
    "enjoy luxuries（享用奢侈品）",
    ""
  ],
  [
    "enjoyable",
    "",
    "adj.",
    "令人愉快的",
    "most enjoyable是最高级，说明何时最让人快乐。",
    "an enjoyable experience（愉快的体验）",
    ""
  ],
  [
    "sparingly",
    "",
    "adv.",
    "节制地；少量地",
    "修饰consumed，强调适量、偶尔享用。",
    "consume sparingly（有节制地消费）",
    ""
  ],
  [
    "restrict",
    "restricts restricted restricting",
    "v.",
    "限制",
    "restrict availability表示限制产品供应。",
    "restrict supply（限制供应）",
    ""
  ],
  [
    "availability",
    "",
    "n.",
    "可获得性；供应",
    "McRib的供应受限制，使其较难买到。",
    "limited availability（有限供应）",
    ""
  ],
  [
    "mcrib",
    "",
    "proper n.",
    "麦肋猪排堡",
    "麦当劳的一款猪肉三明治，是限量供应的例子。",
    "the McRib（麦肋猪排堡）",
    ""
  ],
  [
    "pork",
    "",
    "n.",
    "猪肉",
    "修饰sandwich，说明食物的原料。",
    "a pork sandwich（猪肉三明治）",
    ""
  ],
  [
    "sandwich",
    "sandwiches",
    "n.",
    "三明治",
    "本句指McRib，不涉及动词夹在中间的用法。",
    "a pork sandwich（猪肉三明治）",
    ""
  ],
  [
    "object",
    "objects",
    "n.",
    "对象",
    "an object of obsession表示痴迷追逐的对象。",
    "an object of desire（渴望的对象）",
    ""
  ],
  [
    "obsession",
    "obsessions",
    "n.",
    "痴迷；迷恋",
    "说明限量供应激发消费者的强烈欲望。",
    "an obsession with something（对某物的痴迷）",
    ""
  ],
  [
    "reader",
    "readers",
    "n.",
    "读者",
    "Happy Money的读者是本文书评讨论的受众。",
    "book readers（书籍读者）",
    ""
  ],
  [
    "clearly",
    "",
    "adv.",
    "显然；清楚地",
    "本句评价读者群体的经济状况，用副词表达判断。",
    "clearly privileged（显然生活优裕）",
    ""
  ],
  [
    "privileged",
    "",
    "adj.",
    "享有优越条件的",
    "说明读者无需担忧饥饿，有条件追求满足感。",
    "a privileged group（处境优越的群体）",
    ""
  ],
  [
    "lot",
    "lots",
    "n.",
    "一群人",
    "a privileged lot指处境优越的一群读者，不是数量短语a lot of。",
    "a cheerful lot（一群快乐的人）",
    ""
  ],
  [
    "anxious",
    "",
    "adj.",
    "担忧的；挂心的",
    "anxious about说明读者操心满足感而非饥饿。",
    "anxious about the future（担忧未来）",
    ""
  ],
  [
    "fulfillment",
    "fulfilment",
    "n.",
    "满足；满足感",
    "fulfilment是英式拼写，fulfillment为美式拼写；本卷两种拼写都保留。",
    "feelings of fulfillment（满足感）",
    ""
  ],
  [
    "hunger",
    "",
    "n.",
    "饥饿",
    "not hunger与fulfilment对照，区分基本需求与更高追求。",
    "suffer from hunger（挨饿）",
    ""
  ],
  [
    "wealthy",
    "wealthier wealthiest",
    "adj.",
    "富裕的",
    "比较国家财富水平，不是比较个人道德。",
    "wealthy countries（富裕国家）",
    ""
  ],
  [
    "scarcity",
    "",
    "n.",
    "稀缺；不足",
    "scarcity作主语，说明稀缺提升愉悦。",
    "scarcity of goods（商品稀缺）",
    ""
  ],
  [
    "enhance",
    "enhances enhanced enhancing",
    "v.",
    "增强；提高",
    "enhances the pleasure表示增强愉悦感。",
    "enhance pleasure（增加愉悦）",
    ""
  ],
  [
    "pleasure",
    "pleasures",
    "n.",
    "愉悦；乐趣",
    "指事物或消费带来的愉快感受。",
    "bring pleasure（带来愉悦）",
    ""
  ],
  [
    "mandate",
    "mandates mandated mandating",
    "v.",
    "强制规定",
    "mandating more holiday time是政策建议，不是已实行的事实。",
    "mandate paid leave（强制规定带薪休假）",
    ""
  ],
  [
    "holiday",
    "holidays",
    "n.",
    "假期；休假",
    "holiday time指可用于休假的时间。",
    "holiday time（休假时间）",
    ""
  ],
  [
    "incentive",
    "incentives",
    "n.",
    "激励；优惠",
    "tax incentives是通过税收减免鼓励购房的优惠。",
    "tax incentives（税收优惠）",
    ""
  ],
  [
    "homebuyer",
    "homebuyers",
    "n.",
    "购房者",
    "American homebuyers是住房税收优惠的对象。",
    "first-time homebuyers（首次购房者）",
    ""
  ],
  [
    "believe",
    "believes believed believing",
    "v.",
    "认为；相信",
    "believing后接it was money well spent，表达读者的评价。",
    "believe something is worthwhile（认为某事值得）",
    ""
  ],
  [
    "tour",
    "tours",
    "n.",
    "旅行；游览",
    "a special tour是特别的旅行体验。",
    "a special tour（一次特别的旅行）",
    ""
  ],
  [
    "sympathetic",
    "",
    "adj.",
    "同情的",
    "态度选项，指理解并同情他人的处境。",
    "a sympathetic attitude（同情的态度）",
    ""
  ],
  [
    "ambiguous",
    "",
    "adj.",
    "模糊不明确的",
    "态度选项，表示无法明确判断立场。",
    "an ambiguous statement（含糊的陈述）",
    ""
  ],
  [
    "irrational",
    "",
    "adj.",
    "不理性的",
    "态度选项将消费者说成不理性，原文没有作这一概括。",
    "irrational behavior（不理性行为）",
    ""
  ],
  [
    "come",
    "comes came coming",
    "v.",
    "到来；出现",
    "comes after指在……之后；come away from指读完后带着某种感受离开。",
    "come after（在……之后出现）",
    ""
  ],
  [
    "trick",
    "tricks",
    "n.",
    "技巧；手法",
    "marketing tricks指营销手法，本文的具体手法是限量供应。",
    "marketing tricks（营销手法）",
    ""
  ],
  [
    "rarity",
    "rarities",
    "n.",
    "稀少；稀缺",
    "第23题中对应正文scarcity。",
    "rarity increases pleasure（稀缺增加愉悦）",
    ""
  ],
  [
    "predict",
    "predicts predicted predicting",
    "v.",
    "预测",
    "has predicted是现在完成时，声称书已经作出某预测；这是干扰项。",
    "predict a trend（预测趋势）",
    ""
  ],
  [
    "us",
    "",
    "proper n.",
    "美国",
    "选项中的大写US指United States，不是代词us。",
    "in the US（在美国）",
    ""
  ],
  [
    "room",
    "",
    "n.",
    "余地；空间",
    "room for criticism指可以批评的余地，不是房间。",
    "room for improvement（改进余地）",
    ""
  ],
  [
    "range",
    "ranges ranged ranging",
    "v.",
    "范围涵盖；从……到……",
    "range from A to B列出政策建议涉及的范围。",
    "range from A to B（范围从A到B）",
    ""
  ],
  [
    "link",
    "links",
    "n.",
    "联系；关联",
    "the link between A and B指愉悦与为他人花钱之间的联系。",
    "a link between A and B（A与B的联系）",
    ""
  ],
  [
    "work",
    "",
    "n.",
    "工作；上班的地方",
    "commutes to work指上下班通勤，不是动词起作用。",
    "go to work（去上班）",
    ""
  ],
  [
    "get",
    "gets got gotten getting",
    "v.",
    "获得；得到",
    "get the most happiness表示获得最大幸福回报。",
    "get satisfaction（获得满足）",
    ""
  ],
  [
    "poor",
    "poorer poorest",
    "adj.",
    "贫穷的",
    "poor countries和poor people都指经济上贫困。",
    "poor countries（贫穷国家）",
    ""
  ],
  [
    "rich",
    "richer richest",
    "adj.",
    "富裕的",
    "rich people指经济上富有的人，不指信息资源。",
    "rich people（富人）",
    ""
  ],
  [
    "special",
    "",
    "adj.",
    "特别的；特殊的",
    "a special tour指特别的旅行体验，不是电视特别节目。",
    "a special experience（特别的体验）",
    ""
  ],
  [
    "house",
    "houses",
    "n.",
    "房屋；住宅",
    "小房屋和大房子都指住房，不是议院。",
    "a small house（一间小房屋）",
    ""
  ],
  [
    "great",
    "greater greatest",
    "adj.",
    "巨大的；很多的",
    "great wealth指巨额财富，不是比较级更大。",
    "great wealth（巨额财富）",
    ""
  ],
  [
    "see",
    "sees saw seen seeing",
    "v.",
    "看到；观察到",
    "can be seen表示某种联系能够被观察到。",
    "see a connection（看出联系）",
    ""
  ],
  [
    "fulfilling",
    "",
    "adj.",
    "令人满足的",
    "用于辨析fulfillment，形容体验带来的满足。",
    "a fulfilling life（充实的人生）",
    ""
  ]
];
const lex=reviewedLexicon(rows);
export const lexicon=lex.entries;
export const aliases=lex.aliases;
Object.assign(aliases,{clearly:'clearly',us:'us',others:'other',better:'good',worse:'bad'});
const contexts: Record<string,SentenceWordContext>={
 will:{partOfSpeech:'modal v.',contextualMeaning:'将；会',use:'will表示预期结果；would在假设条件中表示可能的做法或结果。'},
 with:{partOfSpeech:'prep.',contextualMeaning:'用；与；对',use:'with依搭配引出所用资源、陪伴对象或评价对象。'},
 do:{partOfSpeech:'v.',contextualMeaning:'做',use:'do表示所采取的行为；could do worse than整体为委婉推荐。'},
 be:{partOfSpeech:'v.',contextualMeaning:'是；处于某种状态',use:'be连接主语与表语；与过去分词相连时构成被动语态。'},
 for:{partOfSpeech:'prep.',contextualMeaning:'对；为了',use:'for引出涉及对象、受益者或原因，需结合本句搭配。'},
 question:{partOfSpeech:'n.',contextualMeaning:'问题',use:'a question指需要考虑如何花钱的问题。'},
 who:{partOfSpeech:'relative pron.',contextualMeaning:'引导定语从句，指人',use:'who指代widow，在定语从句中作emerged的主语。'},
 collect:{partOfSpeech:'v.',contextualMeaning:'领取',use:'collect the jackpot表示领取头奖奖金。'},
 emerge:{partOfSpeech:'v.',contextualMeaning:'走出；出现',use:'emerged from her house表示从房子中走出来。'},
 big:{partOfSpeech:'adj.',contextualMeaning:'大的',use:'biggest修饰jackpot，表示奖金金额最大；big house表示面积大的住宅。'},
 bad:{partOfSpeech:'adv.',contextualMeaning:'糟糕地',use:'worse为比较级；could do worse than整体表示某建议不失为好选择。'},
 use:{partOfSpeech:'v.',contextualMeaning:'使用；运用',use:'use research to show表示运用研究来说明观点。'},
 research:{partOfSpeech:'n.',contextualMeaning:'研究',use:'behavioral research是行为研究，在这里是不可数名词。'},
 show:{partOfSpeech:'v.',contextualMeaning:'表明；说明',use:'show that后接研究要证明的内容。'},
 material:{partOfSpeech:'adj.',contextualMeaning:'物质的',use:'修饰purchases，与experiences形成对比。'},
 good:{partOfSpeech:'adj.',contextualMeaning:'好的；令人愉快的',use:'better比较消费方式的好坏；feel good指感到愉悦。'},
 spend:{partOfSpeech:'v.',contextualMeaning:'花费',use:'spend money on后接消费对象；spend time doing表示花时间做某事。'},
 experience:{partOfSpeech:'n.',contextualMeaning:'经历；体验',use:'on experiences指花钱购买亲身经历而非实体物品。'},
 like:{partOfSpeech:'prep.',contextualMeaning:'例如；像',use:'like引出旅行、独特用餐等体验的例子，不是谓语喜欢。'},
 go:{partOfSpeech:'v.',contextualMeaning:'去',use:'going to the cinema指去电影院，going不是将来时助动表达。'},
 time:{partOfSpeech:'n.',contextualMeaning:'时间',use:'with time指随着时间推移；spend time说明时间分配。'},
 feel:{partOfSpeech:'v.',contextualMeaning:'感觉；感到',use:'feeling more connected或feeling good说明体验带来的感受。'},
 help:{partOfSpeech:'v.',contextualMeaning:'帮助',use:'help后接人，再接省略to的get。'},
 commute:{partOfSpeech:'n.',contextualMeaning:'通勤',use:'their commutes指人们上下班往返的行程，作shorten的宾语。'},
 buy:{partOfSpeech:'v.',contextualMeaning:'购买',use:'Buying gifts是动名词主语；buy happiness将幸福视为可购买对象作比喻。'},
 give:{partOfSpeech:'v.',contextualMeaning:'给予；捐赠',use:'giving to charity表示给慈善事业捐款；give readers a sense表示使读者获得感受。'},
 turn:{partOfSpeech:'v.',contextualMeaning:'使变成',use:'turn A into B中A为sandwich，B为痴迷的对象。'},
 have:{partOfSpeech:'aux.',contextualMeaning:'构成完成时',use:'has后接turned、left或predicted，构成现在完成时。'},
 quite:{partOfSpeech:'adv.',contextualMeaning:'完全',use:'not quite表示不完全，保留判断余地。'},
 balance:{partOfSpeech:'v.',contextualMeaning:'平衡',use:'how to后接balance原形，两个并列宾语是feeling good与spending money。'},
 following:{partOfSpeech:'adj.',contextualMeaning:'下列的',use:'the following指随后列出的选项。'},
 toward:{partOfSpeech:'prep.',contextualMeaning:'对；对于',use:'attitude toward引出评价对象，不表示空间接近。'},
 consumer:{partOfSpeech:'n.',contextualMeaning:'消费者',use:'consumers指购买产品的人。'},
 increase:{partOfSpeech:'v.',contextualMeaning:'增加',use:'increases pleasure表示使愉悦感增强。'},
 leave:{partOfSpeech:'v.',contextualMeaning:'留下',use:'has left room表示留下余地，不是使落后。'},
 last:{partOfSpeech:'adj.',contextualMeaning:'最后的',use:'the last paragraph指文章最后一段。'},
 sum:{partOfSpeech:'n.',contextualMeaning:'金额',use:'large sums of money指大笔钱。'},
 achievement:{partOfSpeech:'n.',contextualMeaning:'成就',use:'a sense of achievement是成就感；不等于购书物有所值。'},
};
for(const [key,value] of Object.entries(contexts)) lexicon[key]={...(lexicon[key]??{specialForms:[],collocations:[],examSynonyms:[]}),...value};
export const sentenceContexts:Record<string,Record<string,SentenceWordContext>>={
 '2014-p1-s1':{will:{partOfSpeech:'modal v.',contextualMeaning:'会（假设）',use:'would表示假设拥有这笔钱时会做什么。'},with:{partOfSpeech:'prep.',contextualMeaning:'用',use:'do with money询问如何使用这笔钱。'}},
 '2014-p1-s3':{can:{partOfSpeech:'modal v.',contextualMeaning:'可以',use:'could用于委婉推荐，不表示过去能力。'}},
 '2014-p1-s6':{with:{partOfSpeech:'prep.',contextualMeaning:'对',use:'satisfaction with引出满足的对象。'},off:{partOfSpeech:'adv.',contextualMeaning:'消退（wear off组成）',use:'off与wear共同表示感觉逐渐消失。'}},
 '2014-p1-s7':{what:{partOfSpeech:'pron.',contextualMeaning:'……的事物',use:'what相当于the thing that，引出整个主语从句。'},in:{partOfSpeech:'adv.',contextualMeaning:'出现（creep in组成）',use:'creep in整体指感情渐渐滋生，不单独作介词。'}},
 '2014-p1-s8':{far:{partOfSpeech:'adv.',contextualMeaning:'……得多',use:'far修饰比较级better，强调好得多。'},it:{partOfSpeech:'pron.',contextualMeaning:'形式主语',use:'真正主语是to spend money on experiences。'}},
 '2014-p1-s10':{well:{partOfSpeech:'adv.',contextualMeaning:'as well as中的组成作用',use:'as well as整体连接工薪族和中奖者，不能把well单独译成好。'},as:{partOfSpeech:'conj.',contextualMeaning:'as well as中的组成作用',use:'与well as组成并列结构，表示也、以及。'}},
 '2014-p1-s11':{good:{partOfSpeech:'adj.',contextualMeaning:'境况更好的',use:'better off指幸福状况改善，不只指钱更多。'},off:{partOfSpeech:'adv.',contextualMeaning:'境况（better off组成）',use:'better off整体表示状况更好。'},american:{partOfSpeech:'n.',contextualMeaning:'美国人',use:'the average American指一般美国人。'},for:{partOfSpeech:'prep.',contextualMeaning:'因为',use:'jollier for it指因看电视而更快乐，hardly否定这种增加。'}},
 '2014-p1-s12':{purchase:{partOfSpeech:'v.',contextualMeaning:'购买',use:'purchasing things是动名词短语，与Buying或giving所带来的快乐比较。'}},
 '2014-p1-s13':{this:{partOfSpeech:'pron.',contextualMeaning:'这；这一点',use:'回指前一句少量享用奢侈品会更愉快。'},that:{partOfSpeech:'relative pron.',contextualMeaning:'引导定语从句',use:'指marketing trick，在从句中作has turned的主语。'}},
 '2014-p1-s14':{happy:{partOfSpeech:'adj.',contextualMeaning:'快乐的；幸福的',use:'书名Happy Money中的形容词。'}},
 '2014-p1-s15':{one:{partOfSpeech:'pron.',contextualMeaning:'前面提到的同类事物',use:'ones代指countries，避免重复。'}},
 '2014-p1-s17':{which:{partOfSpeech:'relative pron.',contextualMeaning:'引导定语从句',use:'回指policy ideas，并作range的主语。'},american:{partOfSpeech:'adj.',contextualMeaning:'美国的',use:'修饰homebuyers。'}},
 'question-201421-option-D':{rich:{partOfSpeech:'adj.',contextualMeaning:'丰盛的',use:'rich meal指丰盛的一餐，不等于unique meals的独特体验。'}},
 'question-201422-prompt':{american:{partOfSpeech:'n.',contextualMeaning:'美国人',use:'Americans作watching TV的逻辑主体；原卷保留该写法。'},watch:{partOfSpeech:'v.',contextualMeaning:'观看',use:'watching TV是看电视，不是手表。'}},
};
const phraseRows:PhraseRow[]=[
 ['in-history','in history','in history','时间范围','历史上','限定最高级纪录的比较范围。','It was the largest prize in history.','这是历史上最大的奖项。','不是in the history of后接具体领域的结构。'],
 ['could-do-worse-than','could do worse than','could do worse than + do','委婉建议','做……不失为好选择','以“还有更糟选择”委婉推荐than后的行为。','You could do worse than read this book.','读读这本书是个不错的选择。','不能字面译为读书更糟。'],
 ['an-array-of','an array of','an array of + noun','数量表达','一系列；大量','后接可数复数或不可数名词。','They reviewed an array of studies.','他们审阅了一系列研究。','array在此不是计算机数组。'],
 ['wear-off','wears off','wear off','动词短语','逐渐消退','描述感觉、效果或影响随时间消失。','The excitement wears off quickly.','兴奋感很快消退。','不等于wear out使磨损。'],
 ['creep-in','creeps in','creep in','动词短语','悄悄出现；渐渐滋生','以缓慢进入比喻感情或问题不知不觉出现。','Doubt crept in.','疑虑悄悄滋生。','creep的过去式是crept。'],
 ['spend-on','spend money on','spend + money + on + noun','消费搭配','把钱花在……上','on后接购买对象，动作用spend time doing。','Spend money on experiences.','把钱花在体验上。','不可写spend money to experiences。'],
 ['packed-with','is packed with','be packed with','状态搭配','充满；满是','强调容纳很多事物，本文是书中包含很多建议。','The book is packed with tips.','这本书满是实用建议。','不是把建议打包寄送。'],
 ['bang-for-buck','bang for your buck','bang for one\'s buck','习语','花钱所得的效益；性价比','bang比喻回报，buck口语指钱。','This trip offers more bang for your buck.','这次旅行更物有所值。','本文效益是幸福感而非金钱收益。'],
 ['better-off','better off','be better off','状态搭配','境况更好','可指经济、生活或幸福状况，按上下文确定。','People may be better off with shorter commutes.','通勤更短，人们可能过得更好。','不必局限于更有钱。'],
 ['turn-into','turned the pork sandwich into','turn A into B','结果搭配','把A变成B','A是发生变化的对象，B是结果身份。','The trick turned the product into an obsession.','这个手法让产品成为人们痴迷的对象。','不能交换变化对象与结果。'],
 ['between-and','between feeling good and spending money on others','between A and B','介词结构','在A和B之间','本句连接两个动名词短语，说明两者之间的联系。','There is a link between giving and happiness.','给予与幸福之间有联系。','连接词必须用and，不能用to。'],
 ['range-from-to','range from mandating more holiday time to reducing tax incentives','range from A to B','范围表达','范围从A到B','from与to都是介词；两端保持名词或动名词平行。','Ideas range from adding holidays to cutting taxes.','想法从增加假期到减税不等。','这里的to不是不定式标记。'],
];
const phr=reviewedPhrases(phraseRows);
export const phraseGuides=phr.guides;
export const phraseAliases=phr.aliases;
export const phraseGlosses={...lex.glosses,...phr.glosses};
// Precise article defaults; per-source overrides below separate changing roles.
Object.assign(lexicon,{
 follow:{...lexicon.follow,partOfSpeech:'adj.',contextualMeaning:'下列的；下面列出的',use:'the following指题干后列出的选项。',specialForms:[],collocations:[],examSynonyms:[]},
 book:{partOfSpeech:'n.',contextualMeaning:'书；著作',use:'指本文评介的Happy Money。',specialForms:[],collocations:[],examSynonyms:[]},
 critical:{partOfSpeech:'adj.',contextualMeaning:'批评的',use:'态度选项，表示作者不赞同大量看电视。',specialForms:[],collocations:[],examSynonyms:[]},
 average:{partOfSpeech:'adj.',contextualMeaning:'普通的；一般的',use:'the average American指一般美国人。',specialForms:[],collocations:[],examSynonyms:[]},
 well:{partOfSpeech:'adv.',contextualMeaning:'好地；妥当地',use:'well spent说明钱花得值得；as well as的语境另行解析。',specialForms:[],collocations:[],examSynonyms:[]},
});
const put=(id:string,key:string,pos:string,meaning:string,use:string)=>{(sentenceContexts[id]??={})[key]={partOfSpeech:pos,contextualMeaning:meaning,use};};
put('2014-p1-s2','for','prep.','对于','中奖让如何花钱成为她需要面对的问题。');
put('2014-p1-s10','for','prep.','换取；对应','bang for your buck中表示每一分钱对应的回报。');
put('2014-p1-s12','for','prep.','为了','for oneself说明购买的受益者是自己。');
put('2014-p1-s16','for','prep.','对于','for most people限定规律适用的人群。');
put('2014-p1-s17','for','prep.','为了','税收优惠的受益对象为购房者。');
put('question-201424-option-A','for','prep.','供……使用','room for criticism表示可供批评的余地。');
put('2014-p1-s9','with','prep.','随着','with time说明价值随时间变化。');
put('2014-p1-s10','with','prep.','装有；含有','packed with中引出书里装满的建议。');
put('2014-p1-s11','with','prep.','与……一起','spend time with指花时间陪伴亲友。');
put('2014-p1-s17','with','prep.','对；与……有关','agree with引出赞同的主张。');
for(const [id,key,pos,meaning,use] of [
 ['2014-p1-s2','this','pron.','这；这件事（指代）','回指如何使用巨额奖金的问题。'],
 ['2014-p1-s10','this','det.','这；这个（指示限定）','限定volume，指眼前讨论的书。'],
 ['2014-p1-s18','this','det.','这；这个（指示限定）','限定book，指Happy Money。'],
 ['2014-p1-s4','these','det.','这些','限定two academics，回指两位作者。'],
 ['2014-p1-s6','these','det.','这些','限定material purchases，回指车和住宅。'],
 ['2014-p1-s9','these','det.','这些','限定purchases，回指购买体验。'],
 ['2014-p1-s4','that','conj.','引导内容从句，本身无独立词义','引出show要说明的内容。'],
 ['2014-p1-s9','as','prep.','作为；视为','体验以故事或记忆形式留存。'],
 ['2014-p1-s10','be','aux.','构成被动语态','is packed with表示书里充满建议。'],
 ['2014-p1-s12','be','aux.','构成被动语态','are consumed表示奢侈品被消费；同句are most enjoyable为系表结构，按词形另分。'],
 ['2014-p1-s16','be','aux.','构成被动语态','be seen表示联系能够被观察到。'],
 ['2014-p1-s2','year-old','adj.','……岁的','84-year-old修饰widow，说明年龄。'],
 ['2014-p1-s3','by','prep.','由；被（动作执行者或影响来源）','by后列书的两位作者。'],
 ['2014-p1-s15','those','pron.','那些人或事物','代指贫穷国家的人。'],
 ['2014-p1-s12','when','conj.','当……时；每当……时','说明在有节制享用时最快乐。'],
 ['2014-p1-s11','a','art.','每一（按单位计量）','a year表示每年。'],
 ['2014-p1-s16','around','prep.','遍及；在各处','around the world表示全世界各地。'],
 ['2014-p1-s14','about','prep.','关于','anxious about表示为某事挂心。'],
 ['question-201421-prompt','which','pron.','哪一个；哪一项（疑问）','询问下列选项中的哪一项。'],
 ['question-201421-prompt','be','v.','是；处于某种状态','is连接选项和评价。'],
 ['question-201423-prompt','be','aux.','构成被动语态','is mentioned表示被提及。'],
 ['question-201423-option-B','after','prep.','在……之后','after引出quality，说明选项声称的先后顺序。'],
 ['2014-p1-s6','yet','conj.','然而','转折指出满足消退。'],
 ['2014-p1-s16','yet','conj.','然而','转折说明相关规律也适用于穷人。'],
 ['2014-p1-s16','good','adj.','好的；令人愉快的','feeling good表示心情愉悦，不是财富更多。'],
] as string[][])put(id,key,pos,meaning,use);
// In sentence 12 are occurs twice with different roles: preserve the combined
// structural explanation rather than claiming both occurrences are passive.
put('2014-p1-s12','be','v./aux.','系动词或被动助动词','are most enjoyable连接表语；are consumed与过去分词构成被动，分别说明状态与消费动作。');
// Helpers must not render an empty distinction line.
for(const entry of Object.values(lexicon)) entry.examSynonyms=entry.examSynonyms.filter(Boolean);
