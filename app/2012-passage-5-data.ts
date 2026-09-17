import type { MatchingQuestion, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2012-p5");
export const passage2012P5Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment('"Universal history, ', "subject", "引语中的名词短语", "被引用句的主语", "is的主体", "universal history指人类总体历史，不限某国或某人。"),
    segment("the history of what man has accomplished in this world, ", "modifier", "同位名词短语内含名词性从句", "解释Universal history", "of后的what从句说明历史内容", "what同时引导从句并作accomplished的宾语，man在这里泛指人类。"),
    segment("is at bottom the History of the Great Men ", "predicate", "系表结构加插入习语", "引语的谓语和表语", "把总体历史等同伟人历史", "at bottom为归根到底，不是历史的底部。"),
    segment('who have worked here," ', "modifier", "关系从句", "限定Great Men", "who指伟人", "现在完成时概括在世间建功立业的伟人，here回指这个世界。"),
    segment("wrote the Victorian sage Thomas Carlyle.", "connector", "引语后的报道倒装", "交代引语作者", "wrote的主语为Thomas Carlyle", "名词主语位于wrote后；sage是智者、思想家，不是植物鼠尾草。"),
  ], '"Universal history is the History of the Great Men," wrote Thomas Carlyle.', "‘世界历史，也就是人类在这世上已成就之事的历史，归根到底是曾在这里有所作为的伟人们的历史。’维多利亚时代思想家托马斯·卡莱尔写道。", "维多利亚时代思想家托马斯·卡莱尔写道：‘世界历史，即人类在世间取得成就的历史，归根到底就是在这里建功立业的伟人们的历史。’", "以伟人史观开篇，后文追溯并对照民众史观。", ["at bottom"], [
    clause("what man has accomplished in this world", "介词宾语从句（融合关系结构）", "what", "作of宾语", "man", "has accomplished", "what（所成就的事情）", "先读人类成就了什么，再整体译作人类成就之事。"),
    clause("who have worked here", "定语从句", "who", "限定Great Men", "who", "have worked", "无宾语；here为地点状语", "先译在世间有所作为，再接伟人们。"),
  ]),
  sentence(2, [
    segment("Well, ", "connector", "话语标记", "引出反驳", "修正上句判断", "Well在此不是健康或好地，而是转换语气的那么、不过。"),
    segment("not any more ", "modifier", "否定时间副词短语", "前置突出今昔变化", "限定上句伟人史观仍占主导的状态", "not any more表示不再，口语上与句尾否定呼应。"),
    segment("it is not.", "predicate", "代词主语与省略系表", "口语重述否定", "it指上句关于历史的判断", "表语省去前述定义，否定重复用来加强反驳，不按双重否定算成肯定。"),
  ], "it is not.", "不过，现在不再是了——确实不再是。", "不过，如今已不再如此了。", "突然转折，提示伟人史观的主导地位已变。", ["not any more"]),
  sentence(3, [
    segment("Suddenly, ", "modifier", "副词", "变化发生方式状语", "修饰looks", "强调观察到的转变之突然。"),
    segment("Britain looks ", "predicate", "主语与表象动词", "主句主谓", "Britain借指英国社会的史学偏好", "looks在此为似乎而非主动观看。"),
    segment("to have fallen out with its favorite historical form.", "object", "完成式不定式与动词习语", "looks的补足内容", "fallen out with的对象为historical form", "to have done表所观察到的变化已发生；fall out with本义闹翻，这里喻不再青睐伟人传记。"),
  ], "Britain looks to have fallen out with its favorite historical form.", "突然间，英国似乎已经与其最偏爱的历史写作形式闹翻了。", "英国似乎突然不再青睐它一向喜爱的那种历史写作方式了。", "把抽象史观变化具象为英国与伟人传记的疏离。", ["fallen out with its favorite historical form"]),
  sentence(4, [
    segment("This could be no more than a passing literary craze, ", "predicate", "情态系表与限定短语", "第一分句", "This指史学偏好改变", "could保留可能性，no more than把影响限定为一时风潮。"),
    segment("but it also points to a broader truth ", "connector", "转折并列分句", "第二分句的主谓宾", "it仍指这一变化", "points to表示指向、表明，broader扩大解释层次。"),
    segment("about how we now approach the past: ", "modifier", "介词与嵌入疑问从句", "限定truth涉及的问题", "how表示看待过去的方式", "approach是及物动词，the past为历史，不译作走近某个地点。"),
    segment("less concerned with learning from our forefathers ", "modifier", "冒号后省略主语系词的形容词结构", "解释we approach the past的变化", "concerned描述we的关注点", "语义补出we are用于理解，不把补词写回原句。"),
    segment("and more interested in feeling their pain.", "connector", "并列形容词结构", "对照关注点", "their指forefathers", "less...more...比较关注程度；feeling pain指体会前人的苦难。"),
  ], "This could be a craze, but it also points to a truth about how we approach the past.", "这也许只是一阵短暂的文学热潮，却也指向我们如今如何看待过去的更广泛事实：较少关注向先人学习，更多兴趣在于感受他们的痛苦。", "这可能只是一时的文学风潮，却也反映出我们看待历史的更深层变化：我们不再那么重视向先人学习，而更想体会他们的苦痛。", "解释从榜样激励转向情感共鸣的变化，不等于完全不学历史。", ["no more than", "points to a broader truth", "concerned with learning from our forefathers"], [
    clause("how we now approach the past", "介词宾语从句（嵌入疑问句）", "how", "作about宾语", "we", "approach", "the past", "按我们如今怎样看待历史理解，疑问词后保持陈述语序。"),
  ]),
  sentence(5, [
    segment("Today, ", "modifier", "时间副词", "时间状语", "修饰want", "将当下诉求与过去求取伟人启迪对照。"),
    segment("we want empathy, ", "predicate", "主谓宾", "肯定当下需要", "empathy作want宾语", "empathy指设身处地的共情，不等于崇拜。"),
    segment("not inspiration.", "connector", "否定并列宾语", "排除另一诉求", "与empathy对照", "只把激励作为当前不优先寻求的东西，不是在否定历史价值。"),
  ], "we want empathy, not inspiration.", "如今，我们想要的是共情，而不是激励。", "如今，我们追求的是感同身受，而非从伟人身上获得激励。", "简洁点明全文对比主线。", ["empathy, not inspiration"]),
  sentence(6, [
    segment("From the earliest days of the Renaissance, ", "modifier", "起始时间介词短语", "时间状语", "修饰meant", "from指出追溯起点，Renaissance为文艺复兴。"),
    segment("the writing of history meant ", "predicate", "动名词名词化主语与谓语", "主句主谓", "writing是写史活动", "mean doing表示意味着做，不是mean to do打算做。"),
    segment("recounting the exemplary lives of great men.", "object", "动名词短语", "meant的宾语", "recounting的宾语为lives", "exemplary强调堪作榜样，lives指生平而非复数的生活状态。"),
  ], "the writing of history meant recounting the lives of great men.", "从文艺复兴最早的时期起，历史写作就意味着讲述伟人的典范生平。", "早在文艺复兴初期，写历史就是讲述伟人值得效仿的生平。", "开始按历史顺序追溯传记传统。", ["the exemplary lives of great men"]),
  sentence(7, [
    segment("In 1337, ", "modifier", "时间介词短语", "时间状语", "修饰began", "保留原卷具体年份，不把写作开始误当出版。"),
    segment("Petrarch began work on his rambling writing De Viris Illustribus – On Famous Men, ", "predicate", "主谓宾与书名解释", "主句及作品名", "work on说明开始创作的对象", "破折号后是拉丁书名的英文译名；rambling形容铺陈较散漫。"),
    segment("highlighting the virtus (or virtue) of classical heroes.", "modifier", "现在分词短语", "补充写作内容", "逻辑主语Petrarch", "括号or virtue为virtus的文中释义，强调古典英雄美德。"),
  ], "Petrarch began work on his writing, highlighting the virtus of classical heroes.", "1337年，彼特拉克开始写作其铺陈散漫的《名人传》，突出古典英雄的virtus，即美德。", "1337年，彼特拉克开始撰写篇章较为散漫的《名人传》，着重彰显古典英雄的美德。", "41题定位句，A对应highlighting...virtue。", ["began work on his rambling writing"]),
  sentence(8, [
    segment("Petrarch celebrated their greatness ", "predicate", "主谓宾", "赞颂对象", "their指classical heroes", "celebrate在此为歌颂，不是举办庆典。"),
    segment("in conquering fortune and rising to the top.", "modifier", "介词后并列动名词", "限定greatness体现的方面", "conquering与rising平行", "fortune在此是命运际遇；英雄克服命运、登上巅峰，不是征服财富。"),
  ], "Petrarch celebrated their greatness.", "彼特拉克歌颂他们在征服命运和登上顶峰方面的伟大。", "彼特拉克赞颂他们战胜命运、攀上巅峰的伟大成就。", "补充彼特拉克选择英雄榜样的价值标准。", ["rising to the top"]),
  sentence(9, [
    segment("This was the biographical tradition ", "predicate", "指示主语与系表", "主句", "This承接歌颂英雄美德的传统", "biographical修饰tradition，表示传记写作传统。"),
    segment("which Niccolò Machiavelli turned on its head.", "modifier", "关系从句与颠倒习语", "限定tradition", "which作turned的宾语", "its指tradition；turn something on its head表示彻底颠倒其原则。"),
  ], "This was the biographical tradition.", "这就是尼科洛·马基雅维利后来将其彻底颠倒的传记传统。", "马基雅维利却把这种传记传统彻底颠倒了。", "从颂扬道德转向权术标准；顺译突出转折但不添加具体主张。", ["turned on its head"], [
    clause("which Niccolò Machiavelli turned on its head", "定语从句", "which", "限定tradition", "Niccolò Machiavelli", "turned", "which（宾语）；on its head（结果方向）", "先理解他颠倒了这种传统，再接下一句怎样颠倒。"),
  ]),
  sentence(10, [
    segment("In The Prince, ", "modifier", "介词与书名", "出处状语", "修饰championed", "书名指《君主论》，不是在王子体内。"),
    segment("he championed cunning, ruthlessness, and boldness, ", "predicate", "主谓与三项并列宾语", "被推崇的品质", "he指Machiavelli", "champion作动词为推崇，cunning为狡黠、谋略。"),
    segment("rather than virtue, mercy and justice, ", "connector", "替代对照结构", "排除传统美德三项", "与前述三品质对照", "rather than意为而不是，不能把两组三项一同当推崇对象。"),
    segment("as the skills of successful leaders.", "modifier", "as补足结构", "说明这些品质的角色", "把cunning等视为成功领袖的技能", "as不是因为，leaders泛指领导者。"),
  ], "he championed cunning, ruthlessness, and boldness, as the skills of successful leaders.", "在《君主论》中，他推崇狡黠、无情和果敢，而非美德、仁慈和正义，将前者视为成功领导者的本领。", "他在《君主论》中认为，成功的领导者靠的是权谋、冷酷与胆识，而不是美德、仁慈和正义。", "42题F对应不把美德当成功必要条件，D不是本人的主张。", ["rather than virtue, mercy and justice"]),
  sentence(11, [
    segment("Over time, ", "modifier", "时间介词短语", "渐变时间状语", "修饰shifted", "over time表示随着时间推移，不等于加班overtime。"),
    segment("the attributes of greatness shifted.", "predicate", "主谓结构", "变化概述", "attributes为衡量伟大的特质", "shift是不及物的转变，未具体给出转向。"),
  ], "the attributes shifted.", "随着时间推移，伟大的特质发生了变化。", "随着时代变迁，人们衡量伟大的标准也变了。", "衔接浪漫主义和维多利亚时代的不同标准。", ["Over time"]),
  sentence(12, [
    segment("The Romantics commemorated the leading painters and authors of their day, ", "predicate", "主谓宾与所属时代限定", "纪念对象", "Romantics指浪漫主义者", "of their day意为他们那个时代的，不是一天内的作家。"),
    segment("stressing the uniqueness of the artist's personal experience ", "modifier", "现在分词短语", "说明纪念的着重点", "逻辑主语The Romantics", "artist's为单数类指所有格，uniqueness强调个人经历独特。"),
    segment("rather than public glory.", "connector", "对照结构", "排除另一着重点", "与uniqueness对照", "不是强调公众荣耀；B故意颠倒rather than两端。"),
  ], "The Romantics commemorated the painters and authors, stressing the uniqueness rather than public glory.", "浪漫主义者纪念其时代的杰出画家和作家，强调艺术家个人经历的独特性，而非公众荣耀。", "浪漫主义者纪念当时杰出的画家与作家，看重的是艺术家个人经历的独特性，而不是他们在公众中的荣光。", "多余选项B把被排除内容改成了被强调内容。", ["of their day", "rather than public glory"]),
  sentence(13, [
    segment("By contrast, ", "connector", "对比连接短语", "引入另一标准", "对照浪漫主义者", "不是比较同一人的前后态度。"),
    segment("the Victorian author Samuel Smiles wrote Self-Help ", "predicate", "主谓宾含书名", "作者与著作", "Self-Help是《自助》", "wrote为write过去式，Smiles是姓名不是微笑动词。"),
    segment("as a catalogue of the worthy lives of engineers, industrialists and explorers.", "modifier", "as角色补语与多层of短语", "说明作品性质", "catalogue罗列值得效法的人生", "三类人物都是lives的所属者，worthy强调值得尊重。"),
  ], "Samuel Smiles wrote Self-Help as a catalogue of the worthy lives.", "相比之下，维多利亚时代作家塞缪尔·斯迈尔斯将《自助》写成了工程师、实业家和探险家值得称道的生平汇录。", "相比之下，维多利亚时代作家塞缪尔·斯迈尔斯在《自助》中汇集了工程师、实业家和探险家值得效法的人生事迹。", "43题G的人物类别和worthy lives均直接定位。", ["By contrast"]),
  sentence(14, [
    segment('"The valuable examples ', "subject", "带评价形容词的名词短语", "引语主语", "exhibit的主语", "主语一直延伸到character，但核心仅为examples。"),
    segment("which they furnish of the power of self-help, of patient purpose, resolute working, and steadfast integrity, ", "modifier", "关系从句及并列of短语", "限定examples并说明例证内容", "they指前句三类人物", "which作furnish宾语；of短语表示例证所展现的力量，不是furnish of固定搭配。"),
    segment("issuing in the formation of truly noble and manly character, ", "modifier", "现在分词结果短语", "补充前述品格力量的结果", "自助、坚韧目标、踏实工作和正直带来人格形成", "issue in意为导致，非发行到；不是把examples当有生命的发出者。"),
    segment('exhibit," wrote Smiles, ', "predicate", "引语谓语与插入报道句", "主句谓语及作者", "exhibit与The valuable examples配对", "wrote Smiles只是插入，不打断exhibit与后面宾语从句关系。"),
    segment('"what it is in the power of each to accomplish for himself."', "object", "名词性从句内含形式主语结构", "exhibit的宾语", "what作accomplish的宾语", "it占据从句主语位，真正内容是to accomplish；不是it is...that强调句。"),
  ], '"The valuable examples exhibit what it is in the power of each to accomplish for himself."', "‘他们提供的珍贵实例，显示了自助、耐心坚定的目标、坚决的努力和始终正直的力量；这些力量造就真正高尚而刚毅的品格，’斯迈尔斯写道，‘这些实例展示了每个人凭自身能力能为自己成就什么。’", "斯迈尔斯写道：‘这些人的宝贵事例展现了自助、持之以恒的志向、踏实努力与坚定正直的力量，这些力量能塑造真正高尚、刚毅的品格；这些事例也让我们看到，每个人都能凭自己的能力有所成就。’", "说明普通人为何能从传记得到自助榜样，不将个人可为夸大为人人都能成为伟人。", ["issuing in the formation", "in the power of each"], [
    clause("which they furnish of the power of self-help, of patient purpose, resolute working, and steadfast integrity", "定语从句", "which", "限定examples", "they", "furnish", "which（例证）；of短语说明例证内容", "先找他们提供什么，再看例证呈现哪些力量。"),
    clause("what it is in the power of each to accomplish for himself", "宾语从句（融合关系结构）", "what", "作exhibit宾语", "it（形式主语）；to accomplish for himself为真实内容", "is", "in the power of each（表语）；what为accomplish的宾语", "先还原每个人有能力为自己成就什么，再作展示的内容。"),
  ]),
  sentence(15, [
    segment("His biographies of James Watt, Richard Arkwright and Josiah Wedgwood ", "subject", "主语名词短语和传主清单", "被动句主语", "His指Smiles", "of后的三人是被写传者，不是三人合写传记。"),
    segment("were held up as beacons ", "predicate", "被动动词习语加角色补语", "主句谓语", "传记被作为指路明灯", "hold up在此为树立榜样，不是抢劫、耽搁或举高实物。"),
    segment("to guide the working man through his difficult life.", "modifier", "不定式目的或功能短语", "说明beacons的引导作用", "the working man泛指劳动者", "through表示帮助度过艰难人生，his不指Smiles。"),
  ], "His biographies were held up as beacons.", "他为詹姆斯·瓦特、理查德·阿克赖特和乔赛亚·韦奇伍德写的传记，被树为引导劳动者度过艰难人生的明灯。", "他笔下瓦特、阿克赖特和韦奇伍德的传记被奉为灯塔，为生活艰难的劳动者指引方向。", "延伸斯迈尔斯传记的榜样与实践功能。", ["were held up as beacons"]),
  sentence(16, [
    segment("This was all a bit bourgeois for Thomas Carlyle, ", "predicate", "系表句含程度与评价者", "卡莱尔对前述传统的评价", "This指Smiles那类传记", "a bit缓和语气，bourgeois在此带庸常市民气的批评色彩。"),
    segment("who focused his biographies on the truly heroic lives of Martin Luther, Oliver Cromwell and Napoleon Bonaparte.", "modifier", "非限制性关系从句", "说明Carlyle的不同取向", "who指Carlyle", "focus A on B把传记关注点放在三位非凡人物生平上。"),
  ], "This was bourgeois for Thomas Carlyle.", "在托马斯·卡莱尔看来，这些都有点资产阶级市民气；他的传记聚焦马丁·路德、奥利弗·克伦威尔和拿破仑·波拿巴真正英雄式的人生。", "卡莱尔觉得这些传记多少有些庸常的市民气。他把目光投向了路德、克伦威尔和拿破仑这类真正的英雄人物。", "对比可效法的劳动者榜样与难企及的时代英雄。", ["focused his biographies on"], [
    clause("who focused his biographies on the truly heroic lives of Martin Luther, Oliver Cromwell and Napoleon Bonaparte", "非限制性定语从句", "who", "补充Carlyle的传记选材", "who", "focused", "his biographies；on后的三位英雄生平为关注对象", "先识别卡莱尔，再译他关注谁的人生。"),
  ]),
  sentence(17, [
    segment("These epochal figures represented lives ", "predicate", "主谓宾", "时代人物及其人生", "These回指上句三位英雄", "figures在此为人物，不是数字或图形；epochal为影响时代的。"),
    segment("hard to imitate, ", "modifier", "形容词加不定式", "后置限定lives", "lives是imitate的逻辑宾语", "相当于这些人生很难效仿，不是人物很难模仿别人。"),
    segment("but to be acknowledged as possessing higher authority than mere mortals.", "connector", "转折被动不定式", "转而强调承认其权威", "语义上承认的是这些英雄的地位", "原句紧缩并列从难以效仿的人生转回人物权威；possessing的逻辑主体是时代人物，不是普通人。"),
  ], "These epochal figures represented lives hard to imitate.", "这些划时代人物所体现的人生难以效仿，却应承认他们拥有比普通人更高的权威。", "这些划时代人物的人生固然难以效仿，但人们应当承认，他们拥有超越凡人的权威。", "44题C只概括epochal和hard to imitate，不能把难以模仿误成应普遍复制。", ["hard to imitate", "higher authority than mere mortals"]),
  sentence(18, [
    segment("Not everyone ", "subject", "否定词加全称代词", "部分否定主语", "否定所有人都认同", "not everyone是不全都，不是everyone...not的每人都不。"),
    segment("was convinced by such bombast.", "predicate", "被动语态与施事短语", "被说服状态", "by后的bombast指英雄史观的夸大论调", "such回指把伟人放到高于凡人的权威地位。"),
  ], "Not everyone was convinced.", "并非每个人都被这种夸夸其谈说服。", "并不是所有人都信服这种夸大的论调。", "引出马克思与恩格斯的反对立场。", ["Not everyone"]),
  sentence(19, [
    segment('"The history of all hitherto existing society ', "subject", "引语主语名词短语", "被定义的历史", "hitherto existing共同限定society", "hitherto为迄今、到那时为止，保留引文自身的历史视角。"),
    segment('is the history of class struggles," ', "predicate", "系表结构", "史观定义", "class struggles为阶级斗争", "class不是课堂；复数struggles指持续的社会斗争。"),
    segment("wrote Marx and Engels in The Communist Manifesto.", "connector", "引语报道倒装及书名", "作者与出处", "Marx and Engels为wrote的主语", "in指出《共产党宣言》这一文本出处。"),
  ], '"The history of society is the history of class struggles," wrote Marx and Engels.', "‘迄今一切现存社会的历史，都是阶级斗争的历史，’马克思与恩格斯在《共产党宣言》中写道。", "马克思和恩格斯在《共产党宣言》中写道：‘至今一切社会的历史都是阶级斗争的历史。’", "以阶级斗争而不是英雄个人作为解释历史的中心。", ["class struggles"]),
  sentence(20, [
    segment("For them, ", "modifier", "观点介词短语", "标记观点归属", "them指Marx and Engels", "译作在他们看来，不是为他们做事。"),
    segment("history did nothing, it possessed no immense wealth nor waged battles: ", "predicate", "两主句及否定并列谓语", "否定抽象历史自行行动", "history与it同指抽象历史", "nor承接no的否定：不拥有财富，也不进行战争；不在原文增添did not。"),
    segment('"It is man, real, living man who does all that."', "object", "强调句及同位说明", "给出真正行动者", "real, living man解释man", "It is...who强调人；who does all that把前述行动重新归给现实的人。"),
  ], "history did nothing, it possessed no wealth nor waged battles.", "在他们看来，历史没有做任何事，它不拥有巨额财富，也不进行战争：‘做这一切的是人，是现实的、活生生的人。’", "他们认为，抽象的历史本身一事无成，既不拥有巨额财富，也不发动战争；‘这一切都是由人，由现实中活生生的人来完成的。’", "强调历史主体是现实的人，而非人格化的历史。", ["waged battles", "It is man, real, living man who does all that"], [
    clause("who does all that", "强调句中的关系分句", "who", "与It is共同突出主语man", "who（现实的人）", "does", "all that（所有这些事）", "译作正是现实的人做了一切，不把it当另一个行动者。"),
  ]),
  sentence(21, [
    segment("And history should be ", "predicate", "连接词及情态系表", "推进规范性主张", "should be为应该成为", "不是断言当时一切历史著作已如此。"),
    segment("the story of the masses and their record of struggle.", "object", "并列表语名词结构", "说明历史应书写的内容", "their指the masses", "masses为普通民众；struggle为抗争、奋斗，不是物理质量。"),
  ], "history should be the story of the masses and their record of struggle.", "而历史应该是民众的故事和他们斗争的记录。", "历史应当讲述广大民众的故事，记录他们的抗争。", "45题E与本句几乎逐字对应。", ["the masses"]),
  sentence(22, [
    segment("As such, ", "connector", "承接性短语", "依据前述定位推出要求", "such承接民众史的性质", "这里意为既然如此，不译成作为这样的某个人。"),
    segment("it needed to appreciate ", "predicate", "主谓及不定式", "研究要求", "it指这种历史书写", "appreciate是充分理解、考察，不是感谢或价格上涨。"),
    segment("the economic realities, the social contexts and power relations ", "object", "三个并列名词宾语", "需要理解的背景", "都是appreciate的对象", "power为社会权力关系，不是电力。"),
    segment("in which each epoch stood.", "modifier", "介词前置关系从句", "限定历史背景诸要素", "in which说明各时代处于的环境", "stood在此为所处，不是身体站立。"),
  ], "it needed to appreciate the realities, the contexts and power relations.", "既然如此，它需要理解各个时代所处的经济现实、社会背景和权力关系。", "因此，历史研究必须理解每个时代所处的经济现实、社会背景与权力关系。", "为民众史引入时代条件，而非孤立谈个人意志。", ["As such", "power relations"], [
    clause("in which each epoch stood", "定语从句", "in which", "说明realities、contexts和relations所构成的环境", "each epoch", "stood", "无宾语；in which为所处环境", "先读每个时代处于怎样环境，再前置为那些背景。"),
  ]),
  sentence(23, [
    segment('For: "Men make their own history, ', "connector", "因果衔接与引语主句", "解释时代条件的重要性", "For承接上句给出理由", "保留原卷For冒号格式；make history指创造历史。"),
    segment("but they do not make it just as they please; ", "predicate", "转折主句含方式从句", "限制自由创造的程度", "it指their own history", "just as不是举例正如，而是完全按自己的意愿。"),
    segment("they do not make it under circumstances chosen by themselves, ", "predicate", "否定主句与分词定语", "否定自行选择条件", "chosen修饰circumstances", "by themselves是选择条件的施事，不是没有他人帮助的方式。"),
    segment('but under circumstances directly found, given and transmitted from the past."', "connector", "省略重复主谓的对照结构", "肯定真实历史条件", "found、given、transmitted都修饰circumstances", "but替换前面的条件状语，不是否定历史继承条件。"),
  ], "Men make their own history, but they do not make it just as they please; they do not make it under circumstances chosen by themselves, but under circumstances found, given and transmitted from the past.", "因为：‘人们创造自己的历史，但并不完全依自己所愿来创造；他们不是在自己选择的条件下创造，而是在直接遇到的、既定的、从过去传承下来的条件下创造。’", "因为，‘人们创造自己的历史，但并不是随心所欲地创造；他们不能任意选择条件，而是在直接面对的、既定的、由过去传承而来的条件下创造历史。’", "兼顾人的能动性与历史条件，不可只截取前半句理解为个人可任意塑造时代。", ["as they please", "under circumstances chosen by themselves"], [
    clause("as they please", "方式状语从句", "as", "说明make it的方式", "they", "please", "此处please不及物，意为意愿、选择", "连同not just译成并非完全随心所欲。"),
  ]),
  sentence(24, [
    segment("This was the tradition ", "predicate", "主语与系表", "指认改变史学的传统", "This指民众与社会背景史观", "不可误回指卡莱尔英雄传记。"),
    segment("which revolutionised our appreciation of the past.", "modifier", "关系从句", "限定tradition", "which为revolutionised主语", "appreciation为认识、理解；revolutionised表示彻底改变。"),
  ], "This was the tradition.", "这就是彻底改变了我们对过去的理解的传统。", "正是这一传统彻底改变了我们理解历史的方式。", "由思想源流转向英国史学成果。", ["our appreciation of the past"], [
    clause("which revolutionised our appreciation of the past", "定语从句", "which", "限定tradition", "which", "revolutionised", "our appreciation of the past", "译成彻底改变历史认识的这一传统。"),
  ]),
  sentence(25, [
    segment("In place of Thomas Carlyle, ", "modifier", "替代介词短语", "引出继起史学代表", "以三位新历史学者对照Carlyle", "是史学传统替代，不是三人接替卡莱尔的具体职务。"),
    segment("Britain nurtured Christopher Hill, EP Thompson and Eric Hobsbawm.", "predicate", "主谓与三项人物宾语", "英国培养新历史学者", "Britain借指其学术社会环境", "nurture比喻培养、孕育，保留原卷EP不改写姓名格式。"),
  ], "Britain nurtured Christopher Hill, EP Thompson and Eric Hobsbawm.", "取代托马斯·卡莱尔，英国孕育了克里斯托弗·希尔、E.P.汤普森和埃里克·霍布斯鲍姆。", "英国史坛不再只有卡莱尔式人物，也孕育出了希尔、汤普森和霍布斯鲍姆这样的史家。", "列举新传统的代表，不据此添加各人未在原文陈述的具体主张。", ["In place of Thomas Carlyle"]),
  sentence(26, [
    segment("History from below ", "subject", "名词与后置来源短语", "主语", "below比喻社会下层视角", "history from below即从普通民众出发书写历史。"),
    segment("stood alongside biographies of great men.", "predicate", "不及物谓语与方位比喻", "并存关系", "alongside连接民众史与伟人传记", "stood alongside表示并列存在，不是伟人传记被完全消灭。"),
  ], "History stood alongside biographies.", "来自下层的历史与伟人传记并肩而立。", "从普通民众出发的历史书写，与伟人传记并存。", "限定所谓替代：新传统获得地位，不等于旧体裁绝迹。", ["History from below", "stood alongside"]),
  sentence(27, [
    segment("Whole new realms of understanding – from gender to race to cultural studies – ", "subject", "主语及破折号举例", "新研究领域", "from...to...to...列举范围", "gender、race、cultural studies为具体视角，非三段时间。"),
    segment("were opened up ", "predicate", "被动动词短语", "被开拓的状态", "主语realms是研究领域", "open up不是让great men理解新领域。"),
    segment("as scholars unpicked the multiplicity of lost societies.", "modifier", "as状语从句", "伴随研究推进的背景", "unpicked为细致拆解研究", "lost societies指已消逝的社会，multiplicity为众多或多样，不是数学乘法。"),
  ], "Whole new realms of understanding were opened up.", "随着学者细致梳理已消逝社会的多样性，从性别到种族再到文化研究，许多全新的认识领域被开拓出来。", "学者们深入剖析以往社会的复杂多样性，开辟了性别、种族和文化研究等全新的认识领域。", "D借用了opened up realms，却偷换为伟人研究并错配人物。", ["were opened up", "from gender to race to cultural studies"], [
    clause("as scholars unpicked the multiplicity of lost societies", "时间背景状语从句", "as", "说明新领域随什么研究而产生", "scholars", "unpicked", "the multiplicity of lost societies", "先译随着学者研究，再译领域被开拓；带有促成作用但不武断限定为唯一原因。"),
  ]),
  sentence(28, [
    segment("And it transformed public history too: ", "predicate", "承接主句与冒号", "扩展到公众历史呈现", "it承接新的史学传统", "too表示不只学术研究，也改变面向公众的历史叙述。"),
    segment("downstairs became just as fascinating as upstairs.", "predicate", "比较系表句", "具体说明社会阶层关注变化", "downstairs与upstairs借指仆役平民和上层主人", "just as...as为同等程度，不是楼层装潢一样迷人。"),
  ], "it transformed public history: downstairs became as fascinating as upstairs.", "它也改变了公众历史：楼下变得和楼上一样引人入胜。", "这种史观也改变了面向公众的历史叙述：普通人的生活开始与上层人物的生活一样引人关注。", "用上下楼的阶层隐喻回扣民众史，不把比较扩大为史料完全相同。", ["just as fascinating as upstairs"], [
    clause("as upstairs", "比较省略从句", "as", "提供fascinating的同级比较参照", "upstairs（上层人物的生活）", "省略became/was", "省略fascinating，与前项比较相同程度", "把楼上同样引人入胜的省略关系还原理解，不补入真题文本。"),
  ]),
];
const options: MatchingQuestion["options"] = [
  { key: "A", text: "emphasized the virtue of classical heroes." },
  { key: "B", text: "highlighted the public glory of the leading artists." },
  { key: "C", text: "focused on epochal figures whose lives were hard to imitate." },
  { key: "D", text: "opened up new realms of understanding the great men in history." },
  { key: "E", text: "held that history should be the story of the masses and their record of struggle." },
  { key: "F", text: "dismissed virtue as unnecessary for successful leaders." },
  { key: "G", text: "depicted the worthy lives of engineers, industrialists and explorers." },
];
function question(number: number, sentenceNumber: number, prompt: string, answer: MatchingQuestion["answer"], locating: string, explanations: MatchingQuestion["explanations"]): MatchingQuestion {
  return { id: 201200 + number, number, sentenceId: `2012-p5-s${sentenceNumber}`, format: "matching", sharedOptionsId: 201241, prompt, options, answer, locating, explanations };
}
export const passage2012P5Questions: MatchingQuestion[] = [
  question(41, 7, "Petrarch", "A", "第7句highlighting the virtus (or virtue) of classical heroes直接对应A；第8句补充战胜命运、登上巅峰。", { A: "virtus括注为virtue，highlighting同义于emphasized，人物和内容完全对应。", B: "第12句Romantics的讨论，且public glory是rather than后被排除的对象。", C: "epochal figures、hard to imitate在第16—17句对应Carlyle。", D: "新领域在第27句由后来的社会史研究开辟，不属于Petrarch，也不限伟人研究。", E: "第21句民众史观属于Marx和Engels。", F: "Petrarch赞美美德而不是摒弃美德；F对应Machiavelli。", G: "三类职业与worthy lives在第13句属于Smiles。" }),
  question(42, 10, "Niccolò Machiavelli", "F", "第9句turned on its head转向相反标准，第10句以权谋、无情、果敢而非virtue等作为成功领袖技能。", { A: "赞扬古典英雄美德是Petrarch，其传统被Machiavelli颠倒。", B: "Machiavelli论成功领袖，不论领先艺术家的公众荣耀。", C: "难模仿的划时代人物是Carlyle的选择标准。", D: "借用末段opened up new realms并错配人物；原文未说他开辟伟人史研究新领域。", E: "大众与斗争记录对应Marx和Engels，不是君主成功术。", F: "rather than virtue说明不将美德视为成功必要技能；F准确概括本段，不扩大为所有情境下道德毫无价值。", G: "工程师、实业家、探险家为Smiles的传记对象。" }),
  question(43, 13, "Samuel Smiles", "G", "第13句Self-Help是a catalogue of the worthy lives of engineers, industrialists and explorers；15句说明榜样作用。", { A: "古典英雄和美德的直接提法对应Petrarch，非Smiles。", B: "浪漫主义者强调个人经历而非public glory，且主体不同。", C: "Smiles提供可借鉴的自助榜样，Carlyle才突出难以模仿的时代英雄。", D: "后世学者开拓性别等领域，不是《自助》的伟人理解范围。", E: "虽然Smiles希望帮助劳动者，但民众斗争史观的明确主张来自Marx和Engels。", F: "自助、正直等品格是Smiles强调的内容，非摒弃美德的领袖技能说。", G: "depicted概括catalogue，worthy lives和三种职业逐项吻合。" }),
  question(44, 17, "Thomas Carlyle", "C", "第16句who明确回指Carlyle，第17句These epochal figures和lives hard to imitate对应C。", { A: "强调古典英雄美德是Petrarch；Carlyle例举的是Luther、Cromwell和Napoleon。", B: "艺术家公众荣耀不是Carlyle的传记选择原则。", C: "epochal figures原词复现，whose lives were hard to imitate准确重述第17句。", D: "末段社会史新领域属于与Carlyle对照的后继传统，且研究不限伟人。", E: "Carlyle突出超越凡人的英雄，民众抗争记录与其路线不同。", F: "把德性排除于成功技能之外的是Machiavelli。", G: "工程师等劳动成就型榜样来自Smiles，被Carlyle视为有些bourgeois。" }),
  question(45, 21, "Marx and Engels", "E", "第19句点出两人，第20句For them延续其立场，第21句history should be the story of the masses and their record of struggle对应E。", { A: "不是古典英雄美德史，而是现实民众和阶级斗争史。", B: "艺术家的public glory并非本段论题，且原文对浪漫主义者也是排除它。", C: "超越凡人、难以模仿的英雄史观是两人不认同的夸大论调。", D: "新领域在末段是这一传统后来的发展，D又把普通社会研究偷换为伟人研究。", E: "history、the masses及record of struggle都与第21句对应，归属由For them保持一致。", F: "领袖的权谋技能说属于Machiavelli，不是这两人的民众史观。", G: "Smiles的三类职业传记不能替代两人对整个民众及历史条件的讨论。" }),
];
