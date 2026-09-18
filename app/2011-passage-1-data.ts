import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2011P1Reviewed } from "./2011-passage-1-reading";
import { passage2011P1Practice } from "./2011-passage-1-practice";
import { passage2011P1Reasoning } from "./2011-passage-1-evidence";
import { passage2011P1QuestionAnalysis } from "./2011-passage-1-question-analysis";
import type { Question, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2011-p1");
const originalSentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Ruth Simmons ", "subject", "人名", "第一分句主语", "joined的施事", "鲁思·西蒙斯是本文个案人物。"),
    segment("joined ", "predicate", "一般过去时动词", "第一分句谓语", "说明Simmons的任职变动", "join直接接组织，不加介词。"),
    segment("Goldman Sachs's board ", "object", "所有格加名词", "宾语", "joined的对象", "board是董事会，Goldman Sachs's说明所属公司。"),
    segment("as an outside director in January 2000; ", "modifier", "身份与时间介词短语", "身份、时间状语", "限定joined", "as表任职身份；in January 2000表时间；分号连接完整分句。"),
    segment("a year later ", "modifier", "时间名词短语", "时间状语", "限定became", "later以2000年1月为参照，表示一年之后。"),
    segment("she became ", "predicate", "主语加过去时系动词", "第二分句主谓", "she回指Simmons", "become强调身份改变，不作普通及物动词。"),
    segment("president of Brown University.", "object", "职务名词短语", "表语", "说明she的新身份", "独一职务作表语可不加冠词；of限定大学校长职位。"),
  ], "Ruth Simmons joined Goldman Sachs's board; she became president of Brown University.", "鲁思·西蒙斯于2000年1月以外部董事身份加入高盛董事会；一年后她成为布朗大学校长。", "鲁思·西蒙斯2000年1月出任高盛外部董事，一年后又成为布朗大学校长。", "建立身兼两职的背景，为后文职责与声誉冲突作铺垫。", ["as an outside director"]),
  sentence(2, [
    segment("For the rest of the decade ", "modifier", "for加时间范围", "持续时间状语", "限定managed", "rest指十年中余下的时段，不是休息。"),
    segment("she ", "subject", "人称代词", "主语", "回指Simmons", "仍谈同一人物两项职务。"),
    segment("apparently managed ", "predicate", "认识副词加过去时动词", "谓语及判断限制", "说明she处理两职的情况", "apparently表从外部看起来如此，非绝对肯定。"),
    segment("both roles ", "object", "both加复数名词", "宾语", "managed的对象", "both对应董事和校长两职。"),
    segment("without attracting much criticism.", "modifier", "without加动名词", "伴随否定状语", "修饰managed", "without后用attracting；much限定不可数criticism。"),
  ], "she managed both roles.", "在这十年的其余时间里，她显然处理着这两种角色，没有招致太多批评。", "随后几年，她似乎兼顾了这两个职位，未受到太多非议。", "表面平静与下句But引出的批评形成转折。", ["without attracting much criticism"]),
  sentence(3, [
    segment("But by the end of 2009 ", "modifier", "转折词加截止时间短语", "衔接、时间状语", "限定was under fire", "by表到某时为止，But转折此前少受批评。"),
    segment("Ms. Simmons ", "subject", "称谓加人名", "主语", "was的主语", "Ms.为女士称谓，不另切成一句。"),
    segment("was under fire ", "predicate", "系动词加习语表语", "主系表", "说明Simmons遭遇", "under fire比喻遭到抨击，不是遭枪击。"),
    segment("for having sat on Goldman's compensation committee; ", "modifier", "for加完成式动名词", "原因状语", "解释under fire", "having sat强调已在薪酬委员会任职，sat为sit过去分词；on表示委员会成员身份。"),
    segment("how could she have let ", "predicate", "疑问副词、情态完成式及主语", "反问分句主谓", "追问she既往失职", "could have let反问过去怎能放任；不是询问实际操作办法。"),
    segment("those enormous bonus payouts ", "object", "限定词加复数名词短语", "let的宾语", "指出被放行的事项", "指巨额奖金发放，未说Simmons自己拿到奖金。"),
    segment("pass unremarked?", "modifier", "不带to不定式加状态补足", "宾语补足语", "说明payouts被放任的情况", "let something do；unremarked表示未经评论或质疑地通过。"),
  ], "Ms. Simmons was under fire; how could she have let those enormous bonus payouts pass unremarked?", "但到2009年底，西蒙斯女士因曾任高盛薪酬委员会成员而遭到抨击；她怎么竟能让那些巨额奖金发放未经质疑就通过？", "但2009年底，担任高盛薪酬委员会成员的西蒙斯遭到批评：她怎能对巨额奖金的发放一言不发、听之任之？", "反问指出未尽监督职责，直接支撑21题，不能偷换为个人获利。", ["under fire", "having sat on Goldman's compensation committee", "pass unremarked"]),
  sentence(4, [
    segment("By February the next year ", "modifier", "by加时间名词短语", "截止时间状语", "限定had left", "the next year相对2009年为2010年。"),
    segment("Ms. Simmons ", "subject", "称谓加姓名", "主语", "had left的施事", "延续被批评的人物。"),
    segment("had left ", "predicate", "过去完成时", "谓语", "说明截止时间前完成的离职", "had加left，leave是不规则动词。"),
    segment("the board.", "object", "定冠词加名词", "宾语", "left的组织对象", "离开的是董事会，而非布朗大学。"),
  ], "Ms. Simmons had left the board.", "到次年2月，西蒙斯女士已经离开董事会。", "到2010年2月，西蒙斯已经辞去董事职务。", "交代批评后的离任，不把离任本身倒置成之前受批评的原因。", []),
  sentence(5, [
    segment("The position ", "subject", "特指职务名词短语", "引语主语", "was taking up的主语", "position指董事职位，不是空间位置。"),
    segment("was just taking up ", "predicate", "过去进行时加短语动词", "引语谓语", "说明职位占用资源", "take up表示占用；just强调给出的解释。"),
    segment("too much time, ", "object", "程度限定加不可数名词", "宾语", "taking up的对象", "too much表超出可承受的程度，不是中性many。"),
    segment("she said.", "modifier", "后置引述分句", "标明说话来源", "统领前面解释", "这是她给出的离职说法，不等于作者证明这是唯一真实原因。"),
  ], "The position was taking up too much time, she said.", "这个职位正占去太多时间，她说。", "她解释说，这个职务实在占用了太多时间。", "给出当事人的理由，与后文声誉保护的解释保留距离。", ["taking up too much time"]),
  sentence(6, [
    segment("Outside directors ", "subject", "形容词加复数名词", "主语", "are supposed的主语", "outside强调来自公司经营管理层外部。"),
    segment("are supposed to serve ", "predicate", "be supposed to加动词", "职责性谓语", "说明directors应履行什么", "表示应当而非已经做到；serve as后接职能身份。"),
    segment("as helpful, yet less biased, advisers ", "modifier", "as加带插入对比的名词短语", "身份补足", "补充serve的角色", "advisers为中心；helpful与less biased并列修饰，yet含对比。"),
    segment("on a firm's board.", "modifier", "on加所属机构短语", "任职范围状语", "限定serve", "on a board表示在董事会任职，不是物理表面。"),
  ], "Outside directors are supposed to serve as advisers.", "外部董事应在一家公司的董事会上充当有帮助、但偏见更少的顾问。", "外部董事本应在董事会中提供有用且相对公正的建议。", "提出规范性职责基准；supposed to不能省略成对现实表现的褒奖。", ["are supposed to serve", "on a firm's board"]),
  sentence(7, [
    segment("Having made their wealth and their reputations elsewhere, ", "modifier", "完成式现在分词短语", "原因状语", "逻辑主语为they", "已在别处获得财富声望被视作独立性的来源；Having made不是完整有限从句。"),
    segment("they ", "subject", "复数人称代词", "主语", "回指外部董事", "不指wealth或reputations。"),
    segment("presumably have ", "predicate", "推测副词加实义动词", "谓语", "陈述假定拥有的条件", "presumably保留推测，不是无条件保证。"),
    segment("enough independence ", "object", "enough加抽象名词", "宾语", "have的对象", "independence指不受管理层利益牵制的自主性。"),
    segment("to disagree with the chief executive's proposals.", "modifier", "to不定式短语", "程度结果补足", "说明enough independence使何事成为可能", "disagree with接意见或人；chief executive's是所有格，proposals为对象。"),
  ], "they have enough independence to disagree with the chief executive's proposals.", "既然已在别处获得财富和声誉，他们想必有足够独立性反对首席执行官的提议。", "他们的财富与声望来自公司之外，因此按说有足够的独立性对首席执行官的提案提出异议。", "说明外部身份应带来的独立判断，与22题independent advisers对应。", ["disagree with the chief executive's proposals"]),
  sentence(8, [
    segment("If the sky and the share price are falling, ", "condition", "if引导条件从句", "条件状语", "限定should be able to give", "sky falling比喻大难临头，and把它与股价下跌并列；共同谓语are falling。"),
    segment("outside directors ", "subject", "复数名词短语", "主句主语", "give的施事", "董事在危机中尤其应发挥作用。"),
    segment("should be able to give ", "predicate", "情态加能力结构", "主句谓语", "说明预期能力", "should表应当，be able to接动词原形。"),
    segment("advice ", "object", "不可数名词", "宾语", "give的对象", "advice是建议，不加复数s。"),
    segment("based on having weathered their own crises.", "modifier", "过去分词加介词动名词", "后置定语", "修饰advice", "based on引出建议依据；having weathered表过去成功渡过，crises为crisis复数。"),
  ], "outside directors should be able to give advice.", "如果天仿佛要塌、股价也在下跌，外部董事应能根据自己曾渡过危机的经历提出建议。", "若公司遭逢困境、股价下跌，外部董事理应凭借自己应对危机的经验献策。", "把独立顾问的应有贡献具体化；不是让他们预测股价。", ["having weathered their own crises"], [clause("If the sky and the share price are falling", "条件状语从句", "If", "限制应提供建议的场景", "the sky and the share price", "are falling", "无宾语；sky falling为比喻", "先译危机条件，再译应有应对。")]),
  sentence(9, [
    segment("The researchers from Ohio University ", "subject", "名词加来源定语", "主语", "used的施事", "from Ohio University限定研究人员所属机构。"),
    segment("used ", "predicate", "一般过去时动词", "谓语", "说明研究手段", "use后直接接数据库宾语。"),
    segment("a database ", "object", "冠词加名词", "宾语", "used的对象", "不是单个公司数据，而是大型资料库。"),
    segment("that covered more than 10,000 firms and more than 64,000 different directors between 1989 and 2004.", "modifier", "that引导定语从句", "后置定语", "修饰database", "that作主语，covered表示涵盖；两个数量名词为并列宾语，between限定年代。"),
  ], "The researchers used a database.", "来自俄亥俄大学的研究人员使用了一个数据库，该库涵盖1989至2004年间逾一万家公司及逾六万四千名不同董事。", "俄亥俄大学研究人员分析的数据库，收录了1989—2004年间一万多家公司和六万四千多名董事的资料。", "交代样本规模与观察范围，为下一段结果建立证据来源。", [], [clause("that covered more than 10,000 firms and more than 64,000 different directors between 1989 and 2004", "限制性定语从句", "that", "限定database的覆盖范围", "that", "covered", "more than 10,000 firms and more than 64,000 different directors", "先译数据库，再补充覆盖数量与年份。")]),
  sentence(10, [
    segment("Then ", "connector", "顺序副词", "步骤衔接", "连接数据库与核对行为", "说明研究下一步。"),
    segment("they ", "subject", "人称代词", "主语", "回指researchers", "不是数据库中的董事。"),
    segment("simply checked ", "predicate", "方式副词加过去时动词", "谓语", "说明核查动作", "simply强调方法直接。"),
    segment("which directors stayed from one proxy statement to the next.", "object", "which引导嵌入疑问句", "宾语从句", "作checked的宾语", "which限定directors共同作主语；stayed为谓语；跨两次委托投票说明书核对是否仍列名任职。"),
  ], "they checked which directors stayed.", "随后，他们只是核查从一份委托投票说明书到下一份仍留任的是哪些董事。", "接着，他们对照前后两份委托投票说明书，核查哪些董事仍在任。", "从连续披露材料识别董事去留，不武断说成任满两届。", ["from one proxy statement to the next"], [clause("which directors stayed from one proxy statement to the next", "嵌入疑问宾语从句", "which", "checked核查的内容", "which directors", "stayed", "from one proxy statement to the next（时间跨度）", "按‘核查哪些董事仍留任’顺译，which不是指代database的关系词。")]),
];

originalSentences.push(
  sentence(11, [
    segment("The most likely reason for departing a board ", "subject", "含动名词补足的名词短语", "第一分句主语", "was的主语", "中心词reason；for departing说明离任这件事的原因，most likely保留概率判断。"),
    segment("was age, ", "predicate", "系动词加名词表语", "第一分句谓语及表语", "解释reason", "age指年龄因素，并非所有离职都因年老。"),
    segment("so ", "connector", "因果并列连词", "结果连接", "连接原因与研究取样", "最常见原因是年龄，因此排除常规退休干扰。"),
    segment("the researchers concentrated ", "predicate", "主语加过去时动词", "第二分句主谓", "说明研究关注点", "concentrate on后接关注对象。"),
    segment('on those "surprise" disappearances by directors under the age of 70.', "object", "介词加带后置定语的名词", "介词宾语", "承接concentrated on", "by directors说明谁离任，under the age of 70限定董事年龄；surprise加引号指研究所关注的非预期离职。"),
  ], "The most likely reason was age, so the researchers concentrated on those disappearances.", "离开董事会最可能的原因是年龄，所以研究人员集中考察70岁以下董事那些‘意外’的消失。", "董事离任最常见的原因是年龄，因此研究人员重点关注70岁以下董事的意外离职。", "解释样本筛选，避免把正常退休误当作公司风险信号。", ["under the age of 70"]),
  sentence(12, [
    segment("They found ", "predicate", "代词主语加过去时动词", "主句主谓", "报告研究人员发现", "They指researchers；found后接that内容从句。"),
    segment("that after a surprise departure, ", "modifier", "内容连词加时间短语", "宾语从句引导及时间状语", "限定increases发生的背景", "after a surprise departure位于宾语从句开头。"),
    segment("the probability ", "subject", "抽象名词短语", "宾语从句主语", "increases的主语中心", "增长的是概率，而非利润额。"),
    segment("that the company will subsequently have to restate earnings ", "modifier", "that引导同位内容从句", "解释probability的内容", "补足probability", "company作主语，will have to restate作谓语，earnings为宾语；重述财报不等于盈利增加。"),
    segment("increases by nearly 20%.", "predicate", "动词加增幅介词短语", "外层宾语从句谓语", "说明probability的变化", "by表增加幅度，非增加到20%；原文未说20个百分点。"),
  ], "They found that the probability increases by nearly 20%.", "他们发现，在一次意外离职后，公司随后不得不重述盈利数据的概率增加近20%。", "研究发现，董事意外离任后，公司此后被迫重述盈利数据的可能性上升了近20%。", "提供财务风险关联，不把概率增加错解成利润增长。", ["restate earnings", "increases by nearly 20%"], [
    clause("that after a surprise departure, the probability that the company will subsequently have to restate earnings increases by nearly 20%", "宾语从句", "that", "作found的宾语", "the probability that the company will subsequently have to restate earnings", "increases", "by nearly 20%（增幅）", "先译离任背景，再译某种概率上升；拆出嵌套内容。"),
    clause("that the company will subsequently have to restate earnings", "同位内容从句", "that", "解释probability所指的事件", "the company", "will subsequently have to restate", "earnings", "先理解公司将不得不重述盈利数据，再把整个事件放入‘……的概率’。"),
  ]),
  sentence(13, [
    segment("The likelihood of being named in a federal class-action lawsuit ", "subject", "名词加被动动名词介词结构", "第一分句主语", "increases的主语", "being named指被列为诉讼当事人，未说明败诉；of补足likelihood的事件。"),
    segment("also increases, ", "predicate", "添加副词加动词", "第一分句谓语", "说明likelihood增加", "also承接财务风险，另加法律风险。"),
    segment("and the stock ", "subject", "并列连词加名词主语", "第二分句主语", "is的主语", "the stock指该公司的股票。"),
    segment("is likely to perform worse.", "predicate", "系表加不定式", "第二分句谓语", "说明stock预期表现", "likely保留概率，worse是badly比较级，不是确定必然下跌。"),
  ], "The likelihood also increases, and the stock is likely to perform worse.", "在联邦集体诉讼中被点名的可能性也增加了，而且股票可能表现得更差。", "公司卷入联邦集体诉讼的风险也会上升，股票表现则可能变差。", "23题直接对应股票表现；卷入诉讼与诉讼结果差不能等同。", ["being named in a federal class-action lawsuit", "is likely to perform worse"]),
  sentence(14, [
    segment("The effect ", "subject", "定冠词加抽象名词", "主语", "tended的主语", "回指上述离任与后续风险关联效应。"),
    segment("tended to be ", "predicate", "过去时动词加不定式", "谓语", "表示总体趋势", "tend to并非每家公司一概如此。"),
    segment("larger ", "object", "比较级形容词", "表语", "说明effect大小", "较大的指效应幅度，不能误为利润规模。"),
    segment("for larger firms.", "modifier", "for加比较级名词短语", "适用对象状语", "限定tended to be larger", "大公司中的关联效应往往更明显。"),
  ], "The effect tended to be larger.", "对于更大的公司，这种效应往往更大。", "公司越大，这种关联效应往往越明显。", "限定样本差异，不将总体趋势绝对化。", ["tended to be larger"]),
  sentence(15, [
    segment("Although a correlation between them leaving and subsequent bad performance at the firm is suggestive, ", "condition", "although让步从句", "让步状语", "限定主句结论", "主语中心correlation；between并列them leaving与bad performance，is suggestive表示关联耐人寻味。"),
    segment("it ", "subject", "回指代词", "主句主语", "回指这种关联", "it不指firm或某个董事。"),
    segment("does not mean ", "predicate", "助动词否定加动词", "主句谓语", "否定推断必然性", "not否定mean，不否定离职与差表现有关联。"),
    segment("that such directors are always jumping off a sinking ship.", "object", "that内容从句", "宾语从句", "作mean宾语", "such directors为主语，are jumping为进行体，always处于否定范围；sinking ship比喻前景不妙的公司。"),
  ], "it does not mean that such directors are always jumping off a sinking ship.", "尽管他们离开与公司随后表现不佳之间的相关性颇有意味，这并不意味着这类董事总是在跳离一艘下沉的船。", "董事离职与公司此后业绩不佳虽有关联，但不能因此认定他们每次都是预见危机而提前脱身。", "限制因果和动机推断；not always是并非总是，不是从不。", ["jumping off a sinking ship"], [
    clause("Although a correlation between them leaving and subsequent bad performance at the firm is suggestive", "让步状语从句", "Although", "承认关联但限制推断", "a correlation between them leaving and subsequent bad performance at the firm", "is", "suggestive（表语）", "先译关联耐人寻味，再译不能一概推断。"),
    clause("that such directors are always jumping off a sinking ship", "宾语从句", "that", "作mean宾语", "such directors", "are always jumping off", "a sinking ship", "整段放在‘并不意味着’后，always不能漏译。"),
  ]),
  sentence(16, [
    segment("Often ", "modifier", "频率副词", "频率状语", "限定trade up", "说明常见的另一动机，不是每次都如此。"),
    segment("they ", "subject", "人称代词", "主语", "指离任董事", "从researchers的叙述转为董事的选择。"),
    segment('"trade up," ', "predicate", "带引号的短语动词", "谓语", "说明董事跳槽改善平台", "借用换购更高档物品的表达，比喻职位升级。"),
    segment("leaving riskier, smaller firms ", "modifier", "现在分词短语", "解释性伴随状语", "说明trade up的实现", "逻辑主语they；riskier和smaller同时修饰离开的公司。"),
    segment("for larger and more stable firms.", "modifier", "for加目标名词短语", "去向补足", "与leaving构成leave A for B", "B是较大、更稳定的公司；不是因为公司稳定而离开。"),
  ], 'they "trade up," leaving riskier, smaller firms for larger and more stable firms.', "他们常常‘换到更高档的’，离开风险较大、规模较小的公司，转向更大更稳定的公司。", "他们往往只是另谋高就，从风险较高的小公司跳槽到规模更大、经营更稳的企业。", "提供并非逃离沉船的替代解释，但仍体现个人利益驱动。", ['"trade up,"', "leaving riskier, smaller firms for larger and more stable firms"]),
  sentence(17, [
    segment("But the researchers believe ", "predicate", "转折词、主语及认知动词", "主句主谓", "引出研究者的进一步判断", "But转回声誉动机；believe后接完整内容从句。"),
    segment("that outside directors have an easier time of avoiding a blow to their reputations ", "object", "that内容从句主干", "宾语从句", "说明believe的内容", "主语outside directors；have an easier time of doing表示较易做到；to引出声誉受损的对象。"),
    segment("if they leave a firm before bad news breaks, ", "condition", "if条件从句内嵌before时间从句", "条件状语", "限定较容易避免声誉打击", "leave主语they为董事；breaks主语bad news，意为坏消息曝光。"),
    segment("even if a review of history shows ", "condition", "even if让步条件从句主干", "让步条件状语", "说明结论即使在哪种情况下仍成立", "review为主语，shows为谓语，of history限定回顾内容。"),
    segment("they were on the board ", "object", "省略that的内容从句主干", "shows的宾语从句", "说明历史回顾显示的事实", "they为主语，were on the board为系表。"),
    segment("at the time any wrongdoing occurred.", "modifier", "时间短语内嵌省略关系词的限定从句", "时间状语", "限定were on the board", "any wrongdoing occurred说明哪个时点；any在此为任一不当行为，不是董事本人已被证明犯罪。"),
  ], "the researchers believe that outside directors have an easier time of avoiding a blow to their reputations.", "但研究者认为，如果外部董事在坏消息曝光前离职，即使历史回顾显示任何不当行为发生时他们仍在董事会，他们也更容易避免声誉受损。", "不过研究者认为，只要外部董事在坏消息曝光前离开公司，就较容易保全声誉，即使事后回顾表明，违规行为发生时他们仍是董事。", "揭示提前离任的声誉利益；不能把在任推成亲自实施违规。", ["have an easier time of avoiding a blow to their reputations", "before bad news breaks"], [
    clause("that outside directors have an easier time of avoiding a blow to their reputations if they leave a firm before bad news breaks, even if a review of history shows they were on the board at the time any wrongdoing occurred", "宾语从句", "that", "作believe宾语", "outside directors", "have", "an easier time of avoiding a blow to their reputations", "先译董事较易保全声誉，再补条件和让步。"),
    clause("if they leave a firm before bad news breaks", "条件状语从句", "if", "限定避免声誉打击的条件", "they", "leave", "a firm", "译为如果在坏消息曝光前离职。"),
    clause("before bad news breaks", "时间状语从句", "before", "限定leave的时间", "bad news", "breaks", "无宾语，break为消息传出", "放到离职前译出‘坏消息曝光之前’。"),
    clause("even if a review of history shows they were on the board at the time any wrongdoing occurred", "让步条件状语从句", "even if", "说明在任事实未必损害离任者声誉", "a review of history", "shows", "they were on the board at the time any wrongdoing occurred", "先译即使回顾显示，再嵌入在任事实。"),
    clause("they were on the board at the time any wrongdoing occurred", "省略that的宾语从句", "省略that", "作shows宾语", "they", "were", "on the board（任职状态）", "译为他们在违规发生时仍是董事。"),
    clause("any wrongdoing occurred", "省略when的时间限定从句", "省略when", "修饰the time", "any wrongdoing", "occurred", "无宾语", "将不当行为发生置于时间之前，译成‘违规发生之时’。"),
  ]),
  sentence(18, [
    segment("Firms ", "subject", "复数名词", "主语中心", "may have to create的施事", "firms指聘任外部董事的公司。"),
    segment("who want to keep their outside directors through tough times ", "modifier", "who定语从句", "后置定语", "限定Firms", "原文以who指公司，原样保留；want后接to keep，through说明渡过困难时期。"),
    segment("may have to create ", "predicate", "可能性情态加必要性结构", "主句谓语", "说明公司可能需采取的措施", "may保留可能，have to强调实际需要。"),
    segment("incentives.", "object", "复数名词", "宾语", "create的对象", "是留任激励，不等于一律强制加薪。"),
  ], "Firms may have to create incentives.", "想在艰难时期留住外部董事的公司，可能不得不创造激励。", "公司若希望外部董事在困难时期继续留任，可能得提供足够的激励。", "24题推论：有吸引力的条件可能让董事留下，并非他们必定拒绝。", ["through tough times"], [clause("who want to keep their outside directors through tough times", "限制性定语从句", "who", "限定Firms", "who", "want", "to keep their outside directors through tough times", "先理解公司希望留人，再译主句可能需要激励。")]),
  sentence(19, [
    segment("Otherwise ", "connector", "条件性衔接副词", "否定条件连接", "承接未提供激励的情况", "相当于不这样做的话，不是单纯的另一方面。"),
    segment("outside directors ", "subject", "复数名词短语", "主语", "will follow的施事", "从Simmons个案回到普遍激励问题。"),
    segment("will follow ", "predicate", "将来时动词", "谓语", "预测董事选择", "follow an example意为仿效，不是物理跟随。"),
    segment("the example of Ms. Simmons, ", "object", "名词加of后置定语", "宾语", "follow的榜样对象", "指辞去董事职务而避开公司争议的例子。"),
    segment("once again very popular on campus.", "modifier", "省略系动词的形容词补充", "人物状态补充", "修饰Ms. Simmons", "popular形容Simmons；once again表示再度，on campus为地点。并非董事角色本身受到作者赞许。"),
  ], "outside directors will follow the example of Ms. Simmons.", "否则，外部董事会仿效西蒙斯女士，她在校园中又一次很受欢迎。", "否则，外部董事就会效仿西蒙斯离职——她如今在校园里又重新赢得了欢迎。", "首尾照应，以个人声誉恢复反衬董事职责困境，结尾带批评意味。", ["follow the example of Ms. Simmons", "once again"], [clause("once again very popular on campus", "省略式补充说明", "无显式引导词；可展开为who is", "补充Ms. Simmons的状态", "省略Ms. Simmons / who", "省略is", "very popular on campus", "先译董事效仿离职，再补充她已重新受到欢迎。")]),
);

function question(number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question {
  return { id: 201100 + number, number, sentenceId: `2011-p1-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: (["A", "B", "C", "D"] as const)[index], text })), answer, locating, explanations };
}
const originalQuestions: Question[] = [
  question(21, 3, "According to Paragraph 1, Ms. Simmons was criticized for____.", ["gaining excessive profits", "failing to fulfill her duty", "refusing to make compromises", "leaving the board in tough times"], "B", "第一段第3句：任薪酬委员会成员却让巨额奖金未经质疑通过，批评针对监督失职。", { A: "奖金发放是监督对象，原文没说Simmons本人获取暴利。", B: "未就巨额奖金尽到监督、质疑职责，正是反问的指向。", C: "原文没有她拒绝妥协的情节，反而是未加质疑。", D: "先受到批评，后在次年2月离职；选项把后续行为偷换成先前批评原因。" }),
  question(22, 6, "We learn from Paragraph 2 that outside directors are supposed to be____.", ["generous investors", "unbiased executives", "share price forecasters", "independent advisers"], "D", "第二段less biased advisers、enough independence共同说明应有的独立顾问角色。", { A: "财富来自别处是保持独立的条件，不是要求慷慨投资。", B: "unbiased方向接近，但executives管理者偷换了advisers顾问的角色。", C: "股价下跌是应提供建议的情境，不代表职责是预测价格。", D: "independent对应enough independence，advisers直接复现应有角色。" }),
  question(23, 13, "According to the researchers from Ohio University, after an outside director's surprise departure, the firm is likely to____.", ["become more stable", "report increased earnings", "do less well in the stock market", "perform worse in lawsuits"], "C", "第三段明确说the stock is likely to perform worse。", { A: "更稳定的是部分董事转去的新公司，不是意外离任后的原公司。", B: "增加的是重述盈利数据的概率，不是盈利水平。", C: "do less well in the stock market与股票perform worse同义对应，且保留likely。", D: "被列入集体诉讼的风险上升，不等于诉讼中的表现或胜败更差。" }),
  question(24, 18, "It can be inferred from the last paragraph that outside directors____.", ["may stay for the attractive offers from the firm", "have often had records of wrongdoings in the firm", "are accustomed to stress-free work in the firm", "will decline incentives from the firm"], "A", "末段公司想留住董事就可能必须create incentives，说明有吸引力的条件可能促成留任。", { A: "由留任需要激励合理推出，may保留不确定性。", B: "违规发生时在董事会不等于本人实施违规或有违规记录。", C: "原文讨论困难时期去留，没有证明他们习惯无压力工作。", D: "与为留任创造激励的逻辑相反，原文没有一概拒绝激励。" }),
  question(25, 19, "The author's attitude toward the role of outside directors is____.", ["permissive", "positive", "scornful", "critical"], "D", "首段反问失职，第二段以supposed to、presumably提出应有标准，末段揭示提前离任可保全声誉并需要留任激励。全文对实际履职提出批评。中国教育在线阅卷标准答案取D；部分解析转载取B，已在交付报告登记分歧。", { A: "permissive是纵容或宽容，原文没有为失职开脱或表示放任。", B: "第二段肯定的是应有的独立顾问职责，不能据此判定全文对实际角色持积极态度。个别旧解析取此项，未采用。", C: "scornful是蔑视嘲弄，语气过强；作者仍以研究和条件分析问题。", D: "critical最能概括用应有职责对照离任行为、声誉利益与激励缺陷的批评立场。" }),
];

export const passage2011P1Sentences: SentenceAnalysis[] = originalSentences.map((sentence) => {
  const reviewed = passage2011P1Reviewed[sentence.number];
  const result = withReviewedSyntax({ ...sentence, beginnerSyntax: { components: reviewed.components, clauses: reviewed.clauses, reading: reviewed.reading }, layers: reviewed.components.map(c => ({label:c.function,text:c.explanation})), grammar: reviewed.components.map(c => `${c.text}：${c.form}；${c.explanation}`), translationNotes: reviewed.translationNotes, practice: passage2011P1Practice[sentence.id] }, reviewed.colors);
  if (result.chunks.length !== reviewed.chinese.length) throw new Error(`${sentence.id}: 词块译文数量不匹配`);
  return { ...result, translationAlignment: result.chunks.map((chunk, i) => ({ english: chunk.text, chinese: reviewed.chinese[i] })) };
});
export const passage2011P1Questions: Question[] = originalQuestions.map(question => ({ ...question, reasoning: passage2011P1Reasoning[question.number!], analysis: passage2011P1QuestionAnalysis[question.number!] }));
