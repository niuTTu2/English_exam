import type { Question, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2011-p4");
export const passage2011P4Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Will the European Union ", "subject", "助动词倒装加专名主语", "疑问句主语", "make的主体", "will提前构成一般疑问句，European Union指欧盟。"),
    segment("make it?", "predicate", "动词习语", "谓语及固定宾语", "询问欧盟能否渡过危机", "make it为成功挺过难关，不按制造某物理解。"),
  ], "Will the European Union make it?", "欧盟会成功挺过来吗？", "欧盟能渡过难关吗？", "以生存前景设问，引出危机但不提前断言失败。", ["make it"]),
  sentence(2, [
    segment("The question ", "subject", "名词短语", "主语", "would have sounded的对象", "question回指上一句关于欧盟前途的疑问。"),
    segment("would have sounded strange ", "predicate", "情态完成式加系表", "谓语", "评价过去提出这个问题的效果", "sound为听起来，strange为表语；would have表示假设放回不久前会怎样。"),
    segment("not long ago.", "modifier", "否定程度加时间副词", "时间状语", "限定假想判断的时间", "not long ago为不久以前，非很久之前。"),
  ], "The question would have sounded strange.", "这个问题不久前提出，听起来本会很奇怪。", "若在不久前问这个问题，人们还会觉得奇怪。", "用过去的信心对照眼下的担忧。", ["not long ago"]),
  sentence(3, [
    segment("Now even the project's greatest cheerleaders ", "subject", "时间副词与受even强调的名词短语", "主语", "talk的主体", "cheerleaders比喻最热心支持者，project指欧洲一体化计划。"),
    segment("talk of ", "predicate", "动词介词搭配", "谓语", "说明支持者的言论", "talk of引谈论内容，不表示已经放弃欧盟。"),
    segment('a continent facing a "Bermuda triangle" of debt, population decline and lower growth.', "object", "名词加现在分词定语", "of的宾语", "facing修饰continent", "三角比喻债务、人口下降、增长走低三个相互困扰的问题；三项为并列名词。"),
  ], "the project's greatest cheerleaders talk of a continent facing a \"Bermuda triangle\".", "如今连这一计划最热心的支持者都谈论一个正面对债务、人口下降和增长放缓这片‘百慕大三角’的大陆。", "如今，连欧洲一体化最坚定的支持者也担忧：欧洲正陷入债务、人口减少和增长放缓的‘百慕大三角’。", "36题由even cheerleaders获得连支持者也担忧的依据。", ["talk of", 'a "Bermuda triangle" of debt, population decline and lower growth']),
  sentence(4, [
    segment("As well as those chronic problems, ", "modifier", "追加介词结构", "追加背景状语", "补充faces的背景", "除长期问题外还有短期危机，不能译成同样严重程度比较。"),
    segment("the EU faces ", "predicate", "专名主语加及物动词", "主句主谓", "faces意为面临", "EU是European Union缩写。"),
    segment("an acute crisis in its economic core, ", "object", "名词宾语与地点范围定语", "宾语", "危机发生于经济核心", "acute与chronic形成急性/长期对照。"),
    segment("the 16 countries that use the single currency.", "modifier", "同位名词短语内含定语从句", "core的同位说明", "说明当时欧元区范围", "16为原文写作时成员数，不用今日数目替换历史真题；that指countries。"),
  ], "the EU faces an acute crisis.", "除那些长期问题外，欧盟在其经济核心——使用单一货币的16个国家——面临一场急迫危机。", "除了长期隐患，欧盟的经济核心、当时使用统一货币的16国，还遭遇了迫在眉睫的危机。", "将广泛慢性问题聚焦为欧元区急迫危机。", ["As well as those chronic problems", "the single currency"], [
    clause("that use the single currency", "定语从句", "that", "限定16 countries", "that（countries）", "use", "the single currency", "先译使用统一货币的，再接16个国家。"),
  ]),
  sentence(5, [
    segment("Markets have lost ", "predicate", "名词主语加现在完成时", "主句主谓", "markets为金融市场参与者的集合表达", "have lost表示对协调趋同的信心已经丧失，不是欧盟对市场失去信心。"),
    segment("faith ", "object", "抽象名词", "宾语", "lost的对象", "that从句解释信心所针对的命题。"),
    segment("that the euro zone's economies, weaker or stronger, ", "subject", "内容从句主语与让步插入形容词", "从句主语", "economies为converge的主体", "weaker or stronger表示不论经济实力强弱，不是两个额外有限从句。"),
    segment("will one day converge thanks to the discipline of sharing a single currency, ", "predicate", "将来谓语与原因介词短语", "内容从句谓语", "说明市场不再相信的趋同机制", "thanks to这里解释趋同的预想原因；of sharing为纪律约束的来源。"),
    segment("which denies uncompetitive members the quick fix of devaluation.", "modifier", "非限制性定语从句", "解释统一货币的约束", "which回指single currency", "deny A B双宾语：不具竞争力成员是间接宾语，贬值捷径为直接宾语。"),
  ], "Markets have lost faith that the euro zone's economies will one day converge.", "市场已经失去这样的信心：欧元区各经济体，无论强弱，有朝一日会因共享单一货币的纪律而趋同；这种货币使缺乏竞争力的成员不能以贬值快速解困。", "市场已不再相信，统一货币的约束能让欧元区强弱不一的经济体最终趋同；使用同一货币，也使弱竞争力成员无法靠本币贬值迅速脱困。", "说明统一货币危机机制；36题A颠倒谁对什么丧失信心。", ["thanks to the discipline of sharing a single currency", "denies uncompetitive members the quick fix of devaluation"], [
    clause("that the euro zone's economies, weaker or stronger, will one day converge thanks to the discipline of sharing a single currency, which denies uncompetitive members the quick fix of devaluation", "同位内容从句", "that", "解释faith的命题", "the euro zone's economies", "will one day converge", "无宾语；thanks to引原因", "先译市场不再相信，再译经济体将趋同的命题，最后补充货币限制。"),
    clause("which denies uncompetitive members the quick fix of devaluation", "非限制性定语从句", "which", "补充single currency的作用", "which", "denies", "uncompetitive members（间接宾语）；the quick fix of devaluation（直接宾语）", "译成这使成员不能靠贬值解困，保留deny否定方向。"),
  ]),
  sentence(6, [
    segment("Yet the debate ", "subject", "转折词加名词", "主语", "is stuck的主体", "Yet转入挽救方案陷入僵局。"),
    segment("about how to save Europe's single currency from disintegration ", "modifier", "介词加疑问不定式", "后置定语", "限定debate的议题", "how to save不是带有限谓语的从句；save A from B保护A免于B。"),
    segment("is stuck.", "predicate", "系动词加状态分词", "谓语", "说明讨论状态", "stuck为陷入停滞而非货币物理卡住。"),
  ], "the debate is stuck.", "然而，关于如何挽救欧洲单一货币、使其免于瓦解的辩论卡住了。", "然而，如何挽救统一货币、避免其瓦解，讨论却陷入僵局。", "提出37题所问现象，下一句给原因。", ["save Europe's single currency from disintegration", "is stuck"]),
  sentence(7, [
    segment("It is stuck ", "predicate", "代词主语加系表", "主句主谓", "It回指debate", "不是指欧盟本身已经解体。"),
    segment("because the euro zone's dominant powers, France and Germany, ", "subject", "原因连词与同位语主语", "原因从句主语", "France and Germany说明dominant powers", "power在此为大国，不是抽象能力。"),
    segment("agree on the need for greater harmonisation within the euro zone, ", "predicate", "动词介词结构", "从句并列谓语第一项", "说明共同认可的原则", "agree on the need是同意有协调必要，不代表具体协调对象一致。"),
    segment("but disagree about what to harmonise.", "predicate", "转折并列与疑问不定式", "从句并列谓语第二项", "说明分歧内容", "what to harmonise为协调什么；与agree构成原则一致、内容不同。"),
  ], "It is stuck because the euro zone's dominant powers agree on the need but disagree about what to harmonise.", "讨论停滞，因为欧元区主导大国法国和德国同意需要加强区内协调，却不同意应协调什么。", "僵局源于德法：双方都认可欧元区需要更强的协调，却无法就协调内容达成共识。", "37题C概括具体协调分歧，不是争夺领导权或走向解体的步骤。", ["agree on the need for greater harmonisation", "disagree about what to harmonise"], [
    clause("because the euro zone's dominant powers, France and Germany, agree on the need for greater harmonisation within the euro zone, but disagree about what to harmonise", "原因状语从句", "because", "解释is stuck", "the euro zone's dominant powers", "agree；disagree", "on the need；about what to harmonise", "先译德法共同原则，再译具体分歧，回到僵局原因。"),
  ]),
  sentence(8, [
    segment("Germany thinks ", "predicate", "国家名转喻加认知动词", "主句主谓", "指德国方面的主张", "后接省略that的宾语从句。"),
    segment("the euro must be saved ", "predicate", "从句主语加情态被动", "宾语从句主谓", "must表示方案必要性", "be saved强调欧元为被挽救对象。"),
    segment("by stricter rules on borrowing, spending and competitiveness, ", "modifier", "by方式短语", "手段状语", "说明挽救方式", "on列规则涉及借贷、支出和竞争力。"),
    segment("backed by quasi-automatic sanctions for governments that do not obey.", "modifier", "过去分词短语内含定语从句", "规则的后置补充", "backed修饰rules", "用几近自动的惩罚支撑规则；that限定不遵守的政府。"),
  ], "Germany thinks the euro must be saved by stricter rules.", "德国认为，欧元必须借更严格的借贷、支出和竞争力规则来挽救，这些规则由对不遵守的政府实行近乎自动的制裁来支持。", "德国主张以更严格的借贷、支出和竞争力规则拯救欧元，并以近乎自动触发的制裁惩罚违规政府。", "38题B直接概括德国规则约束方案。", ["must be saved by stricter rules", "quasi-automatic sanctions"], [
    clause("the euro must be saved by stricter rules on borrowing, spending and competitiveness, backed by quasi-automatic sanctions for governments that do not obey", "宾语从句", "省略that", "作thinks宾语", "the euro", "must be saved", "by stricter rules（手段）", "先译德国认为，再译欧元须被严格规则挽救。"),
    clause("that do not obey", "定语从句", "that", "限定governments", "that（governments）", "do not obey", "省略语境明确的rules", "译为不遵守规则的政府，保留否定。"),
  ]),
  sentence(9, [
    segment("These might include ", "predicate", "指示代词加情态动词", "主句主谓", "These回指制裁措施", "might列可能的制裁，并非已经执行。"),
    segment("threats to freeze EU funds for poorer regions and EU mega-projects, ", "object", "名词宾语内含不定式", "制裁第一项", "to freeze解释threats内容", "冻结用于较贫困地区和大型项目的资金，而非增加援助。"),
    segment("and even the suspension of a country's voting rights in EU ministerial councils.", "object", "并列名词宾语", "制裁第二项", "even强调处罚加重", "suspension为暂停投票权，不是保障投票权；ministerial修饰councils。"),
  ], "These might include threats and even the suspension of a country's voting rights.", "这些措施可能包括威胁冻结面向较贫困地区和欧盟大型项目的资金，甚至暂停一国在欧盟部长理事会中的投票权。", "制裁可能包括威胁冻结贫困地区和大型项目的欧盟资金，甚至暂停违规国家在欧盟部长理事会的投票权。", "38题A、D分别把冻结改成增加、暂停改成保障。", ["threats to freeze EU funds", "the suspension of a country's voting rights"]),
  sentence(10, [
    segment("It insists ", "predicate", "代词加主张动词", "主句主谓", "It回指Germany", "国家观点延续，不能误指法国或欧盟。"),
    segment("that economic co-ordination should involve all 27 members of the EU club, ", "predicate", "that宾语从句", "insists的宾语", "should involve说明主张的参与范围", "27为当时欧盟全体，与前文16国货币核心区分。"),
    segment("among whom there is a small majority for free-market liberalism and economic rigour; ", "modifier", "介词前置的非限制性关系从句", "补充全体成员中的力量对比", "whom指27成员国", "there is为存在句；for表示支持自由市场与经济纪律。"),
    segment("in the inner core alone, ", "modifier", "介词短语与范围副词", "范围状语", "限定后半句a small majority", "alone排除核心以外成员，并非所有欧盟国家。"),
    segment("Germany fears, ", "modifier", "插入报告分句", "态度来源", "说明后半判断为德国担忧", "fears的语义内容是后面的多数偏向法国干预。"),
    segment("a small majority favour French interference.", "predicate", "名词主语加动宾", "分号后独立分句", "说明只看核心区时的倾向", "favour为动词支持，majority按成员集合用复数谓语。"),
  ], "It insists that economic co-ordination should involve all 27 members; a small majority favour French interference.", "德国坚持经济协调应涉及欧盟全部27个成员，其中略占多数者支持自由市场主义和经济纪律；德国担心，仅在核心区内，略占多数者却赞成法国式干预。", "德国坚持让当时欧盟27国全部参与经济协调，因为在全体成员中，自由市场和严格经济纪律略占上风；若只限核心区，德国担心法国式干预反而会获微弱多数支持。", "38题C把全部成员偷换成只有核心；两处小多数分属不同范围。", ["all 27 members of the EU club", "in the inner core alone"], [
    clause("that economic co-ordination should involve all 27 members of the EU club, among whom there is a small majority for free-market liberalism and economic rigour", "宾语从句", "that", "作insists宾语", "economic co-ordination", "should involve", "all 27 members of the EU club", "先译坚持全体参与，再补充全体内的多数取向。"),
    clause("among whom there is a small majority for free-market liberalism and economic rigour", "非限制性定语从句", "among whom", "修饰27 members", "a small majority（there为存在引导词）", "is", "for free-market liberalism and economic rigour（后置说明支持方向）", "译为在这些成员中，有微弱多数支持……。"),
    clause("Germany fears", "插入报告分句", "无连接词", "限定后一判断的来源", "Germany", "fears", "语义内容为后面的a small majority favour French interference", "作为‘德国担忧’插入，不能并入majority的主语。"),
  ]),
  sentence(11, [
    segment('A "southern" camp headed by France ', "subject", "名词与过去分词定语", "主语", "headed修饰camp", "head为领导，France是该阵营领头者。"),
    segment("wants something different: ", "predicate", "动词与不定代词宾语", "谓语及宾语", "冒号解释different", "形容词different后置修饰something。"),
    segment('"European economic government" within an inner core of euro-zone members.', "object", "冒号后名词短语", "宾语内容说明", "解释法国方案", "在欧元区核心内部建立欧洲经济治理机制，而非欧盟全体协调。"),
  ], "A \"southern\" camp wants something different.", "法国领导的‘南方’阵营想要不同的东西：欧元区成员核心内部的‘欧洲经济政府’。", "以法国为首的‘南方’阵营另有主张：在欧元区核心成员中建立‘欧洲经济政府’。", "由德国全欧盟规则方案转向法国核心区政府干预方案。", ["headed by France", "something different"]),
  sentence(12, [
    segment("Translated, ", "modifier", "过去分词省略结构", "解释方式状语", "把前述口号转成具体政策", "相当于用明白话解释，不是在讨论语言翻译考试。"),
    segment("that means ", "predicate", "指示代词加及物动词", "主句主谓", "that指法国经济政府方案", "means为mean动词的第三人称单数。"),
    segment("politicians intervening in monetary policy ", "object", "名词加现在分词复合结构", "means宾语第一项", "politicians为intervening逻辑主语", "intervene in为干预货币政策。"),
    segment("and a system of redistribution from richer to poorer members, ", "object", "并列名词短语", "means宾语第二项", "说明财富或资金重分配方向", "from富国to穷国不可倒置。"),
    segment("via cheaper borrowing for governments through common Eurobonds or complete fiscal transfers.", "modifier", "via方式短语与or并列名词", "实现手段状语", "说明redistribution的方式", "借联合欧元债券让政府更低成本借款，或直接财政转移；through限定borrowing。"),
  ], "that means politicians intervening in monetary policy and a system of redistribution.", "换成明白话，这意味着政客干预货币政策，以及通过联合欧元债券给政府提供更廉价借贷、或完全财政转移建立从富成员到穷成员的再分配体系。", "说白了，就是让政治家干预货币政策，并把资源由富国转向穷国：或用共同欧元债券降低政府借贷成本，或直接进行财政转移。", "39题A由富向贫的再分配推出穷国更易获得资金；未说富国易借款。", ["intervening in monetary policy", "from richer to poorer members", "through common Eurobonds"]),
  sentence(13, [
    segment("Finally, ", "modifier", "篇章副词", "列举末项", "引出协调的其他领域", "不是欧盟最终结局的宣判。"),
    segment("figures close to the French government have murmured, ", "modifier", "报告分句与形容词后置定语", "观点来源", "figures为政界人士，close修饰figures", "have murmured说明这类主张由亲近法国政府的人士低调提出。"),
    segment("euro-zone members should agree to some fiscal and social harmonisation: ", "predicate", "名词主语加情态动词", "被转述的主张", "说明建议协调范围", "agree to为同意某方案，fiscal与social并列修饰harmonisation。"),
    segment("e.g., curbing competition in corporate-tax rates or labour costs.", "modifier", "举例标记加动名词短语", "冒号解释实例", "说明harmonisation的具体做法", "curbing限制两类成本竞争，不能理解成鼓励竞相降低税率。"),
  ], "euro-zone members should agree to some fiscal and social harmonisation.", "最后，亲近法国政府的人士低声提出，欧元区成员应同意一些财政和社会协调，例如限制企业税率或劳动力成本的竞争。", "最后，法国政府身边的一些人士还低调倡议，欧元区应在财政和社会政策上适当协调，例如抑制企业税率和劳动力成本方面的竞争。", "补充法国偏重政策干预和协调而非德国严格纪律的方案。", ["close to the French government", "agree to some fiscal and social harmonisation"], [
    clause("figures close to the French government have murmured", "插入报告分句", "无连接词", "交代建议提出者", "figures close to the French government", "have murmured", "后续euro-zone members should agree...为报告内容", "译为相关人士低调提出，不把figures译成数字。"),
  ]),
  sentence(14, [
    segment("It is too soon ", "predicate", "形式主语加系表", "主句主谓", "评价做后述动作的时机", "too soon为过早，不等于马上要发生。"),
    segment("to write off the EU.", "object", "不定式短语", "真正被评价的动作", "解释什么做得太早", "write off为认定毫无希望，不是写一封信或财务核销。"),
  ], "It is too soon to write off the EU.", "现在就断定欧盟无可救药还太早。", "现在就给欧盟判‘死刑’，为时尚早。", "40题作者态度转折关键：承认危机，不认定前景绝望。", ["too soon to write off the EU"]),
  sentence(15, [
    segment("It ", "subject", "代词", "主语", "回指欧盟", "不是德国或欧元区单独16国。"),
    segment("remains ", "predicate", "系动词", "谓语", "强调在危机中仍保有优势", "remain后接名词表语。"),
    segment("the world's largest trading block.", "object", "名词表语", "表语", "说明经济联合体地位", "保留原卷block写法，不静默改成常见的bloc。"),
  ], "It remains the world's largest trading block.", "它仍是世界最大的贸易集团。", "欧盟仍然是世界最大的贸易集团。", "以原文时代背景下的优势支持不宜否定前途。", ["the world's largest trading block"]),
  sentence(16, [
    segment("At its best, ", "modifier", "介词习语", "评价范围状语", "限定对European project的正面判断", "强调最佳状态，不把优点说成任何时候都完美成立。"),
    segment("the European project is remarkably liberal: ", "predicate", "主语加系表", "主句主谓", "liberal强调经济开放", "remarkably为显著程度，冒号后提供解释。"),
    segment("built around a single market of 27 rich and poor countries, ", "modifier", "过去分词短语", "背景与结构说明", "说明欧洲一体化的共同市场基础", "27个贫富国家构成共同市场，非只有富国。"),
    segment("its internal borders are far more open to goods, capital and labour ", "predicate", "名词主语加比较系表", "冒号后解释分句主谓", "open to引可以跨境流动的对象", "far加强more；goods、capital、labour三项并列。"),
    segment("than any comparable trading area.", "modifier", "than比较省略", "比较标准", "限定more open的程度", "比较跨境开放程度，省略该贸易区的边界/开放谓语信息。"),
  ], "the European project is remarkably liberal: its internal borders are far more open.", "在其最佳状态下，欧洲一体化计划非常开放：它围绕27个贫富国家的共同市场建立，内部边界对商品、资本和劳动力的开放远超任何可比贸易区。", "欧洲一体化运转得好时，具有显著的开放性：27个贫富国家组成共同市场，区内商品、资本和劳动力流动的自由度，远高于其他可比贸易区。", "承认条件限制并列举共同市场价值，态度有希望而非自负。", ["At its best", "far more open to goods, capital and labour"], [
    clause("than any comparable trading area", "省略结构的比较从句", "than", "补充more open的比较标准", "any comparable trading area（语义上指其边界）", "省略重复的开放程度谓语", "省略goods, capital and labour相关开放对象", "按与其他可比贸易区的开放程度相比理解，不作商品与地区比较。"),
  ]),
  sentence(17, [
    segment("It is ", "predicate", "代词主语加系动词", "主句主谓", "It回指欧洲一体化计划", "后面的attempt为表语。"),
    segment("an ambitious attempt ", "object", "名词表语", "表语", "评价计划的目标", "attempt为尝试，不把目标当成已经完全实现的结果。"),
    segment("to blunt the sharpest edges of globalisation, ", "modifier", "不定式短语", "attempt的内容定语", "目标一：减轻全球化的最严重负面影响", "blunt动词比喻使锋芒钝化，sharpest edges不是实物刀刃。"),
    segment("and make capitalism benign.", "modifier", "与to blunt并列的不定式省略", "attempt的第二目标", "目标二：使资本主义温和", "make+宾语+形容词，benign为宾补，与blunt共用to。"),
  ], "It is an ambitious attempt to blunt the sharpest edges of globalisation, and make capitalism benign.", "这是一项雄心勃勃的尝试，旨在削弱全球化最锋利的边缘，并使资本主义变得温和。", "这项雄心勃勃的尝试，旨在缓和全球化最尖锐的弊端，让资本主义更加温和。", "结尾肯定共同目标，40题D有希望最符合，不是断言问题已解决。", ["blunt the sharpest edges of globalisation", "make capitalism benign"]),
];

function question(number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question {
  return { id: 201100 + number, number, sentenceId: `2011-p4-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: (["A", "B", "C", "D"] as const)[index], text })), answer, locating, explanations };
}
export const passage2011P4Questions: Question[] = [
  question(36, 3, "The EU is faced with so many problems that____.", ["it has more or less lost faith in markets", "even its supporters begin to feel concerned", "some of its member countries plan to abandon euro", "it intends to deny the possibility of devaluation"], "B", "第一段even...greatest cheerleaders也谈危机；第二段lost faith的主语是Markets。", { A: "颠倒主宾：市场不再相信货币纪律能促使经济趋同，非欧盟不信市场。", B: "even支持者都谈债务、人口与增长危机，说明他们也开始担忧。", C: "文章谈货币瓦解风险及挽救方案，没有成员国计划退出的事实。", D: "统一货币使成员无法以本币贬值解困，是制度约束，不是欧盟主观打算否认可能性。" }),
  question(37, 7, "The debate over the EU's single currency is stuck because the dominant powers ____.", ["are competing for the leading position", "are busy handling their own crises", "fail to reach an agreement on harmonisation", "disagree on the steps towards disintegration"], "C", "第三段agree on the need...but disagree about what to harmonise说明原则一致但内容不同。", { A: "dominant powers只是说明德法地位，未把争夺领导权说成原因。", B: "文中没有因忙于各自国内危机而停止谈判的因果链。", C: "双方对协调什么存在分歧，不能达成具体协调共识。", D: "讨论目标是避免解体，不是就走向解体步骤产生分歧，方向相反。" }),
  question(38, 8, "To solve the euro problem, Germany proposed that ____.", ["EU funds for poor regions be increased", "stricter regulations be imposed", "only core members be involved in economic co-ordination", "voting rights of the EU members be guaranteed"], "B", "第四段开头stricter rules；其后列冻结资金、暂停投票权以及全部27国参与。", { A: "德国可能威胁freeze资金，而不是increased增加，方向反转。", B: "更严格规则辅以制裁，正是德国的核心方案。", C: "德国坚持all 27 members，only core与其主张相反。", D: "制裁包括suspension暂停投票权，不是保证权利。" }),
  question(39, 12, "The French proposal of handling the crisis implies that____.", ["poor countries are more likely to get funds", "strict monetary policy will be applied to poor countries", "loans will be readily available to rich countries", "rich countries will basically control Eurobonds"], "A", "第五段redistribution from richer to poorer members，并列更廉价政府借贷或财政转移。", { A: "再分配由富向贫，贫穷成员更有机会取得资金，可由方向合理推出。", B: "干预货币政策不等于对穷国实施紧缩政策，原文未给该限定。", C: "把受益重心偷换为富国，忽略from richer to poorer方向。", D: "common Eurobonds只说明共同债券，没有富国控制债券的证据。" }),
  question(40, 17, "Regarding the future of the EU, the author seems to feel____.", ["pessimistic", "desperate", "conceited", "hopeful"], "D", "末段too soon to write off后列贸易集团和共同市场优势，并肯定缓和全球化弊端的目标。", { A: "前文揭示危机，但最后明确不宜断定失败，不能以问题篇幅代替结尾态度。", B: "desperate绝望过强，作者仍看到价值与前途。", C: "conceited自负是人的傲慢评价，作者的有条件肯定不等于盲目自大。", D: "承认危机仍肯定发展价值与目标，符合抱有希望而非保证成功。" }),
];
