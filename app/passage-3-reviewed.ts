import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { passage3Reading } from "./passage-3-reading";
import { passage3Practice } from "./passage-3-practice";

const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const b = (text: string, form: string, fn: string, modifies: string, explanation: string, color: SyntaxVisualRole, chinese: string, children?: BeginnerSyntaxComponent[]) => ({ component: c(text, form, fn, modifies, explanation, children), color, chinese });
const cl = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, details: Array<[string, string]>, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails: details.map(([fn, text]) => ({ function: fn, text })), translationOrder });
type Review = { trunk: string; blocks: ReturnType<typeof b>[]; clauses: BeginnerClauseDetail[]; grammar?: string[]; literal?: string; natural?: string; notes?: string[] };

const reviewed: Record<number, Review> = {
  1: {
    trunk: "it is advisable to find out what its advocates are aiming at; it is possible that they may be regarded as normal",
    blocks: [
      b("When a new movement in art attains a certain fashion", "when时间从句", "时间状语从句", "it is advisable", "说明何时应了解艺术运动的目标。", "modifier", "当一种新的艺术运动形成一定风潮时", [c("a new movement in art", "名词短语", "从句主语", "attains", "中心movement；in art限定艺术领域。", [c("in art", "介词短语", "后置定语", "movement", "这是艺术领域中的运动。")]), c("attains", "一般现在时动词", "从句谓语", "a new movement", "达到某种流行程度。"), c("a certain fashion", "名词短语", "宾语", "attains", "某种程度的风尚，不是服装款式。")]),
      b("it", "代词", "形式主语", "is advisable", "先占主语位置，真正评价对象是不定式。", "subject", "这"),
      b("is", "系动词", "谓语", "it", "连接被评价之事和advisable。", "predicate", "是"),
      b("advisable", "形容词", "表语", "is", "说明了解目标这件事是可取的。", "complement", "可取的"),
      b("to find out what its advocates are aiming at", "不定式及宾语从句", "真正主语", "it is advisable", "说明什么事情可取，不是advisable的宾语。", "subject", "去弄清其倡导者究竟想达到什么目标", [c("to find out", "不定式", "真正主语的动作中心", "is advisable", "find out表示查明；执行者为一般了解新艺术的人。"), c("what its advocates are aiming at", "what内容从句", "宾语从句", "find out", "what承担at的宾语，整个从句是find out的宾语。", [c("what", "疑问代词", "前置的介词宾语", "at", "询问目标，原句at仍留在从句末尾。"), c("its advocates", "名词短语", "从句主语", "are aiming", "its指新艺术运动。"), c("are aiming at", "进行时及介词", "从句谓语及目标介词", "its advocates", "are aiming是谓语，at引出目标。")])]),
      b("for", "并列连词", "原因连接", "前面的建议与后面的可能性", "给为什么应先了解目标补充理由。", "connector", "因为"),
      b("however farfetched and unreasonable their principles may seem today", "however让步从句", "让步状语从句", "it is possible", "今天看起来不合理，仍不排除未来认可。", "modifier", "无论其原则今天显得多么牵强、不合理", [c("however farfetched and unreasonable", "程度词及并列形容词", "前置表语及让步程度", "may seem", "farfetched和unreasonable都是principles呈现的性质。"), c("their principles", "名词短语", "从句主语", "may seem", "被评价的是这些原则，不是倡导者本人。"), c("may seem", "情态动词及系动词", "从句谓语", "their principles", "似乎如何，保留可能语气。"), c("today", "时间副词", "时间状语", "may seem", "限定今天的观感。")]),
      b("it", "代词", "形式主语", "is possible", "对应后置that主语从句。", "subject", "这"),
      b("is", "系动词", "谓语", "it", "连接主语和可能性评价。", "predicate", "是"),
      b("possible", "形容词", "表语", "is", "仅说明可能，不保证发生。", "complement", "有可能的"),
      b("that in years to come they may be regarded as normal", "that内容从句", "主语从句", "it is possible", "后置真正主语，解释哪种情况可能发生。", "subject", "即在未来若干年，这些原则可能被视为正常", [c("in years to come", "介词短语", "时间状语", "may be regarded", "to come后置限定years，表示将来的年份。"), c("they", "代词", "从句主语", "may be regarded", "回指their principles。"), c("may be regarded", "情态动词加被动语态", "从句谓语", "they", "表示可能被人看待。"), c("as normal", "as补足结构", "主语补足语", "they", "normal说明这些原则会被视作怎样。")]),
    ],
    clauses: [
      cl("When a new movement in art attains a certain fashion", "时间状语从句", "When", "限定建议适用的时间或情境", "a new movement in art", "attains", [["宾语", "a certain fashion"]], "先译新运动形成风潮的背景，再译建议。"),
      cl("what its advocates are aiming at", "宾语从句", "what", "作find out的宾语；what又作at的宾语", "its advocates", "are aiming", [["介词at的宾语", "what"]], "译为其倡导者想达到什么目标。"),
      cl("however farfetched and unreasonable their principles may seem today", "让步状语从句", "however", "让步说明今天的观感并不排除未来认可", "their principles", "may seem", [["表语", "farfetched and unreasonable"]], "先译无论今天多么不合理，再接未来可能性。"),
      cl("that in years to come they may be regarded as normal", "主语从句", "that", "后置真正主语，it为形式主语", "they", "may be regarded", [["主语补足语", "as normal"]], "把未来被视为正常这一内容接到有可能后。"),
    ],
  },
  2: {
    trunk: "the case is rather difficult; it can hardly be classed as Literature",
    blocks: [
      b("With regard to Futurist poetry", "介词短语", "话题范围状语", "the case is rather difficult", "把话题限定到未来主义诗歌。", "modifier", "就未来主义诗歌而言"),
      b("however", "连接副词", "转折连接", "前句一般建议与本句具体评价", "从普遍原则转到这类诗歌的困难。", "connector", "不过"),
      b("the case", "名词短语", "主语", "is", "指评价未来主义诗歌这一情况。", "subject", "情况"),
      b("is", "系动词", "谓语", "the case", "连接主语和性质。", "predicate", "是"),
      b("rather difficult", "副词加形容词", "表语", "is", "rather修饰difficult，表示程度。", "complement", "相当棘手的"),
      b("for", "并列连词", "原因连接", "棘手判断与后文说明", "解释为何评价困难。", "connector", "因为"),
      b("whatever Futurist poetry may be", "whatever让步从句", "让步状语从句", "it can hardly be classed", "整组是让步；只有whatever在内部作表语。", "modifier", "无论未来主义诗歌究竟算什么"),
      b("even admitting that the theory on which it is based may be right", "-ing非谓语及内容从句", "让步插入语", "it can hardly be classed as Literature", "即使退一步承认理论可能正确，结论仍保留。", "modifier", "即使承认其所依据的理论也许正确", [c("even admitting", "强调词加现在分词", "让步动作中心", "后面的分类判断", "从评价者立场暂且承认，不是诗歌自己在承认。"), c("that the theory on which it is based may be right", "that内容从句", "宾语从句", "admitting", "承认的内容是理论可能正确。", [c("the theory on which it is based", "名词及定语从句", "从句主语", "may be", "中心theory，定语说明诗歌以它为基础。", [c("on which it is based", "介词提前的定语从句", "后置定语", "theory", "which回指theory；it是Futurist poetry。")]), c("may be", "情态动词及系动词", "从句谓语", "the theory", "may保留不确定性。"), c("right", "形容词", "表语", "may be", "正确，只在让步假设中提出。")])]),
      b("it", "代词", "主语", "can hardly be classed", "指未来主义诗歌。", "subject", "它"),
      b("can hardly be classed", "情态动词加被动语态", "谓语", "it", "hardly是近否定程度词。", "predicate", "几乎不能被归类"),
      b("as Literature", "as补足结构", "主语补足语", "it", "说明归入文学这一类别。", "complement", "为文学"),
    ],
    clauses: [
      cl("whatever Futurist poetry may be", "让步状语从句", "whatever", "让步限定后面的文学性判断", "Futurist poetry", "may be", [["表语", "whatever"]], "先译无论诗歌是什么，再译仍然很难算文学。"),
      cl("that the theory on which it is based may be right", "宾语从句", "that", "admitting的内容", "the theory on which it is based", "may be", [["表语", "right"]], "先理解理论的修饰，再译理论也许正确。"),
      cl("on which it is based", "限制性定语从句", "on which", "修饰theory", "it", "is based", [["介词on的宾语", "which"]], "译作诗歌所依据的理论。"),
    ],
    grammar: ["With regard to限定话题，however标转折，for连接解释理由。", "whatever从句在外层作让步状语；whatever在从句内部作be的表语，不能混称‘让步表语从句’。", "even admitting是让步插入的非谓语结构，that为其内容，on which再嵌套修饰theory。", "hardly保留近否定，may be right只是退一步的可能假设，不等于作者断言全部原则正确。"],
  },
  3: {
    trunk: "This is what the Futurist says: past conditions of life have been conditionally speeding up, till now we live in a world of noise and violence and speed",
    blocks: [
      b("This", "指示代词", "主语", "is", "向后预告冒号后的说法。", "subject", "这"),
      b("in brief", "介词短语", "概括方式状语", "整段转述", "标明下面是简要概述。", "modifier", "简言之"),
      b("is", "系动词", "谓语", "This", "连接This和说话内容。", "predicate", "就是"),
      b("what the Futurist says", "what内容从句", "表语从句", "is", "what同时充当says的宾语。", "complement", "未来主义者的说法"),
      b("for a century", "介词短语", "持续时间状语", "have been conditionally speeding up", "说明一个世纪的持续范围。", "modifier", "一个世纪以来"),
      b("past conditions of life", "名词短语", "主语", "have been conditionally speeding up", "past与of life限定conditions；保留原卷措辞。", "subject", "过去的生活状况", [c("of life", "介词短语", "后置定语", "conditions", "说明生活方面的状况。")]),
      b("have been conditionally speeding up", "现在完成进行时及副词", "谓语", "past conditions of life", "have been speeding up标延续过程；conditionally修饰加速方式。", "predicate", "一直有条件地加速变化", [c("conditionally", "副词", "方式限定状语", "speeding up", "原卷确为conditionally，并未给出具体条件，不能擅改成continually。")]),
      b("till now we live in a world of noise and violence and speed", "till时间从句", "时间状语从句", "前面的加速过程", "用如今所处的状态交代加速发展到何处。", "modifier", "直到如今，我们生活在充满噪声、暴力和速度的世界里", [c("now", "时间副词", "从句时间状语", "live", "指转述语境中的如今。"), c("we", "人称代词", "从句主语", "live", "未来主义者所概括的现代人。"), c("live", "一般现在时动词", "从句谓语", "we", "说明所生活的状态。"), c("in a world of noise and violence and speed", "介词短语", "处所状语", "live", "of后只有一组由and连接的三个名词，共同修饰world。")]),
    ],
    clauses: [cl("what the Futurist says", "表语从句", "what", "is后解释This的内容", "the Futurist", "says", [["宾语", "what"]], "译为未来主义者所说的内容。"), cl("till now we live in a world of noise and violence and speed", "时间状语从句", "till", "说明加速发展至如今的生活状态", "we", "live", [], "先译一直加速，再用直到如今接现在状态。")],
    grammar: ["This向后指向冒号后的转述；what从句作表语，不是另一个孤立主句。", "have been speeding up是现在完成进行时；conditionally是插入谓语中的方式副词，原卷措辞保留。", "till引出含we live的时间从句；now限定live，in a world...说明生活环境。", "of noise and violence and speed是一个介词结构，of后并列三个名词，不是多个of短语。"],
    literal: "简言之，这就是未来主义者的说法：一个世纪以来，过去的生活状况一直在有条件地加速变化，直到如今我们生活在充满噪声、暴力和速度的世界里。",
    natural: "未来主义者的说法概括起来是：过去一个世纪里，生活状况一直在有条件地加速变化，如今人们生活在一个充满噪声、暴力和速度的世界中。",
    notes: ["用户原卷写作past conditions和conditionally，正文逐字保留。conditionally按‘有条件地’呈现；原文没有说明具体条件，不擅自改为continually，也不据猜测补足条件。全文中的加速主张属于未来主义者的转述。"],
  },
  4: {
    trunk: "our feelings, thoughts and emotions have undergone a corresponding change",
    blocks: [b("Consequently", "连接副词", "因果连接", "生活变化与感受变化", "继续转述未来主义者的推理。", "connector", "因此"), b("our feelings, thoughts and emotions", "并列名词短语", "主语", "have undergone", "三类内在体验组成复数主语。", "subject", "我们的感受、思想和情绪"), b("have undergone", "现在完成时", "谓语", "并列主语", "undergo直接带所经历的变化。", "predicate", "已经经历了"), b("a corresponding change", "名词短语", "宾语", "have undergone", "corresponding把变化接回生活状况的加速。", "object", "相应的变化")], clauses: [],
  },
  5: {
    trunk: "This speeding up of life requires a new form of expression",
    blocks: [b("This speeding up of life", "动名词名词化结构", "主语", "requires", "整体把生活加速作为一件事，按单数接requires。", "subject", "生活的这种加速", [c("of life", "介词短语", "内容限定", "speeding up", "说明加速的是生活。")]), b("says the Futurist", "倒装报道语", "观点来源插入语", "前后的整个主张", "says的主语是the Futurist；插入语不是requires的主干。", "connector", "未来主义者说"), b("requires", "一般现在时动词", "谓语", "This speeding up of life", "表示客观需要、要求。", "predicate", "要求"), b("a new form of expression", "名词短语", "宾语", "requires", "中心form，of expression说明是表达的形式。", "object", "一种新的表达形式", [c("of expression", "介词短语", "后置定语", "form", "不是新增加表达总量，而是改变形式。")])], clauses: [],
  },
  6: {
    trunk: "We must speed up our literature if we want to interpret modern stress",
    blocks: [b("We", "人称代词", "主语", "must speed up", "未来主义者立场中的我们。", "subject", "我们"), b("must speed up", "情态动词及短语动词", "谓语", "We", "must表示所主张的必要性，speed up为及物用法。", "predicate", "必须加快"), b("our literature", "名词短语", "宾语", "speed up", "被要求改变节奏的是文学。", "object", "我们的文学节奏"), b("too", "副词", "递进状语", "must speed up", "承接生活也在加快。", "modifier", "也"), b("if we want to interpret modern stress", "if条件从句", "条件状语从句", "must speed up", "给上述要求一个条件。", "modifier", "如果我们想表现现代生活的紧张压力", [c("we", "代词", "从句主语", "want", "想要表现的人。"), c("want", "一般现在时动词", "从句谓语", "we", "从句的限定动词。"), c("to interpret modern stress", "不定式短语", "不定式补足语", "want", "补足想做什么；interpret直接支配modern stress。")])],
    clauses: [cl("if we want to interpret modern stress", "条件状语从句", "if", "限定加快文学节奏的要求", "we", "want", [["不定式补足语", "to interpret modern stress"]], "中文先译如果要表现现代压力，再译文学也须加快。")],
  },
  7: {
    trunk: "We must pour out a large stream of essential words",
    blocks: [b("We", "代词", "主语", "must pour out", "指采用此写法的人。", "subject", "我们"), b("must pour out", "情态动词及短语动词", "谓语", "We", "pour out比普通say更强调大量连续倾吐。", "predicate", "必须倾泻出"), b("a large stream of essential words", "名词短语", "宾语", "pour out", "stream比喻连续流；of引出词语内容。", "object", "一大股关键语词", [c("of essential words", "介词短语", "内容限定", "stream", "essential修饰words，说明关键、不可缺的词。")]), b("unhampered by stops, or qualifying adjectives, or finite verbs", "过去分词补充结构", "伴随状态说明", "倾吐词语时的写作者与过程", "表示写作不受这些形式束缚，不是另一项过去时动作。", "modifier", "不受标点、修饰性形容词或限定动词的束缚", [c("by stops, or qualifying adjectives, or finite verbs", "by加并列名词", "限制来源补足语", "unhampered", "三个名词组同级，分别是标点、修饰性形容词和限定动词。", [c("qualifying adjectives", "分词修饰名词", "并列的介词宾语", "by", "qualifying在这里表示修饰、限定性质，不是说形容词参加资格考试。"), c("finite verbs", "形容词加名词", "并列的介词宾语", "by", "finite限定verbs，不能扩大为不用任何动词。")])])], clauses: [],
    grammar: ["must pour out是有限谓语，a large stream of essential words是宾语。", "unhampered是过去分词补充状态，说明倾吐词语时不受这些表达形式妨碍。", "by后并列三组名词；qualifying修饰adjectives，finite修饰verbs，不是并列的三个从句。"],
    literal: "我们必须倾泻出一大股关键语词，不受标点、修饰性形容词或限定动词的束缚。", natural: "我们必须连续倾吐大量关键语词，摆脱标点、修饰性形容词和限定动词的束缚。",
  },
  8: {
    trunk: "we must make up words that imitate them; we must use many sizes of type and different colored inks, and shorten or lengthen words at will",
    blocks: [b("Instead of describing sounds", "介词加动名词", "替代方式状语", "must make up words", "不是描述声音，而是创造拟声词。", "modifier", "我们不应只描述声音"), b("we", "代词", "第一分句主语", "must make up", "造词的人。", "subject", "而是我们"), b("must make up", "情态动词及短语动词", "第一分句谓语", "we", "make up在此表示创造。", "predicate", "必须创造"), b("words that imitate them", "名词及定语从句", "宾语", "make up", "定语从句限定所造词语的作用。", "object", "能模仿这些声音的词", [c("that imitate them", "关系从句", "后置定语", "words", "that代words作主语，them代sounds作宾语。")]), b("we", "代词", "第二分句主语", "must use", "分号后另起主干。", "subject", "我们"), b("must use", "情态动词及动词", "第二分句谓语", "we", "use的宾语包括字体大小和墨水。", "predicate", "必须使用"), b("many sizes of type and different colored inks", "并列名词短语", "宾语", "use", "两组同级宾语；type在此是印刷字体。", "object", "多种字号和不同颜色的墨水", [c("many sizes of type", "名词及of结构", "第一并列宾语", "use", "size是大小、字号，type是印刷字体。"), c("different colored inks", "带修饰语的名词短语", "第二并列宾语", "use", "中心inks，表示不同颜色的墨水。")]), b("on the same page", "介词短语", "处所状语", "use", "限定这些印刷实验出现于同一页。", "modifier", "在同一页上"), b("and", "并列连词", "动作连接", "use与shorten or lengthen", "后两项动作共用we must。", "connector", "并且"), b("shorten or lengthen", "并列动词原形", "并列谓语", "共用we must", "or连接两个相反的长度调整动作。", "predicate", "缩短或拉长"), b("words", "复数名词", "宾语", "shorten or lengthen", "两动词共用的对象。", "object", "词语"), b("at will", "介词短语", "方式状语", "shorten or lengthen", "will为名词意愿，整个短语表示随意。", "modifier", "随心所欲地")],
    clauses: [cl("that imitate them", "限制性定语从句", "that", "修饰words", "that", "imitate", [["宾语", "them"]], "先理解模仿声音，再接词语。")],
  },
  9: { trunk: "their descriptions of battles are confused", blocks: [b("Certainly", "评价副词", "观点状语", "整句判断", "作者明确承认作品混乱。", "modifier", "的确"), b("their descriptions of battles", "名词短语", "主语", "are", "descriptions是中心，their指未来主义者。", "subject", "他们对战斗的描写", [c("of battles", "介词短语", "对象限定", "descriptions", "说明被描写的内容。")]), b("are", "系动词", "谓语", "descriptions", "复数主语对应are。", "predicate", "是"), b("confused", "分词形容词", "表语", "are", "描述文字的混乱状态。", "complement", "混乱的")], clauses: [] },
  10: {
    trunk: "it is a little upsetting to read and then to find",
    blocks: [
      b("But", "并列连词", "转折连接", "前句概括与本句具体体验", "从承认混乱转到读者体验。", "connector", "但是"), b("it", "代词", "形式主语", "is upsetting", "真正被评价的是两个不定式动作内容。", "subject", "这"), b("is", "系动词", "谓语", "it", "连接形式主语和评价。", "predicate", "是"), b("a little upsetting", "程度词加形容词", "表语", "is", "a little修饰upsetting，事物使读者不适。", "complement", "有点令人不适的"),
      b("to read in the explanatory notes that a certain line describes a fight between a Turkish and a Bulgarian officer on a bridge off which they both fall into the river", "不定式及嵌套从句", "第一并列真正主语", "it is a little upsetting", "第一项体验：在注释中读到怎样的故事。", "subject", "在注释中读到某行诗描写一名土耳其军官与一名保加利亚军官在桥上打斗、双双坠河", [c("to read", "不定式", "动作中心", "第一真正主语", "读者阅读注释。"), c("in the explanatory notes", "介词短语", "信息来源状语", "read", "信息出自注释，不是诗行原文。"), c("that a certain line describes a fight between a Turkish and a Bulgarian officer on a bridge off which they both fall into the river", "that内容从句", "宾语从句", "read", "整体是注释交代的内容。", [c("a certain line", "名词短语", "从句主语", "describes", "line指一行诗。"), c("describes", "动词", "从句谓语", "a certain line", "说明诗行据称描写什么。"), c("a fight between a Turkish and a Bulgarian officer", "名词短语", "宾语", "describes", "中心fight；between引出双方。", [c("between a Turkish and a Bulgarian officer", "介词及并列人物", "参与者限定", "fight", "两个a分别限定两名军官；前项省略officer。")]), c("on a bridge off which they both fall into the river", "介词短语及定语从句", "故事地点状语", "fight所表达的打斗事件", "地点是桥，定语从句说明后来从桥上落水。", [c("off which they both fall into the river", "介词提前的关系从句", "后置定语", "bridge", "off which为起点，into the river为终点，they both指两名军官。")])])]),
      b("and then", "连词加时间副词", "体验顺序连接", "to read与to find", "随后再发现诗行实际内容。", "connector", "然后又"),
      b("to find that the line consists of the noise of their falling and the weights of the officers", "不定式及内容从句", "第二并列真正主语", "it is a little upsetting", "与to read并列，不是read内容从句内部的新动作。", "subject", "发现诗行只有他们落水的声音和军官们的体重", [c("to find", "不定式", "动作中心", "第二真正主语", "读者发现，与前面的阅读构成落差。"), c("that the line consists of the noise of their falling and the weights of the officers", "that内容从句", "宾语从句", "find", "说明诗行实际由什么构成。", [c("the line", "名词短语", "从句主语", "consists", "同一行诗。"), c("consists of", "动词加介词", "从句谓语及组成介词", "the line", "consist不及物，of引出组成部分；不用于被动。"), c("the noise of their falling and the weights of the officers", "并列名词短语", "介词宾语", "of", "声音与体重同级，不把weights挂到falling内。", [c("of their falling", "介词加动名词复合结构", "声音来源限定", "noise", "their是falling的逻辑主语，指两名军官。"), c("of the officers", "介词短语", "所属限定", "weights", "说明是军官的体重。")])])]),
      b("“Pluff! Pluff! A hundred and eighty-five kilograms.”", "拟声和数量引文", "诗行内容举例", "the line及其组成部分", "拟声词和数字展示诗行，不是完整的主谓句。", "modifier", "“扑通！扑通！一百八十五公斤。”"),
    ],
    clauses: [cl("that a certain line describes a fight between a Turkish and a Bulgarian officer on a bridge off which they both fall into the river", "宾语从句", "that", "read的内容", "a certain line", "describes", [["宾语", "a fight between a Turkish and a Bulgarian officer"]], "先理解诗行描写打斗，再补双方、桥和坠河。"), cl("off which they both fall into the river", "限制性定语从句", "off which", "修饰bridge", "they both", "fall", [["介词off的宾语", "which"], ["介词into的宾语", "the river"]], "从桥上掉进河里；桥是起点、河是终点。"), cl("that the line consists of the noise of their falling and the weights of the officers", "宾语从句", "that", "find的内容", "the line", "consists", [["介词of的宾语", "the noise of their falling and the weights of the officers"]], "诗行由声音和体重组成，再读冒号后的示例。")],
    notes: ["中文的‘却’用来表达先读注释、再看诗行的落差，原文没有额外的but放在to find之前。数字只按原文呈现，不断言它一定是某一人或两人的合计体重。"],
  },
  11: { trunk: "This can hardly be classed as Literature", blocks: [b("This", "指示代词", "主语", "can hardly be classed", "回指所举的诗行与写法。", "subject", "这样的诗行"), b("though it fulfills the laws and requirements of Futurist poetry", "though让步从句", "让步状语从句", "主句的文学性判断", "承认符合内部规则，不等于接受文学性。", "modifier", "尽管符合未来主义诗歌的规则和要求", [c("it", "代词", "从句主语", "fulfills", "同样回指示例。"), c("fulfills", "及物动词", "从句谓语", "it", "满足、符合某要求。"), c("the laws and requirements of Futurist poetry", "并列名词及of限定", "宾语", "fulfills", "laws与requirements并列，of限定二者所属的流派。")]), b("can hardly be classed", "情态动词及被动语态", "谓语", "This", "hardly保留近否定。", "predicate", "仍几乎不能被归类"), b("as Literature", "as补足结构", "主语补足语", "This", "归类为文学。", "complement", "为文学")], clauses: [cl("though it fulfills the laws and requirements of Futurist poetry", "让步状语从句", "though", "承认符合流派规则，主句仍否定文学性", "it", "fulfills", [["宾语", "the laws and requirements of Futurist poetry"]], "先译尽管符合规则，再译仍难算文学。")], literal: "尽管这符合未来主义诗歌的规则和要求，它仍几乎不能被归为文学。", notes: ["中文‘仍’呈现though的让步关系，原文没有另一个still；laws在此按流派规则理解，不译成国家法律。"] },
  12: { trunk: "no thinking man can refuse to accept their first proposition: that a great change in our emotional life calls for a change of expression", blocks: [b("All the same", "连接短语", "让步转折连接", "批评作品与认可原则", "尽管作品难称文学，原则仍有合理处。", "connector", "尽管如此"), b("no thinking man", "带否定限定的名词短语", "主语", "can refuse", "no限定任何有思考能力的人，thinking修饰man。", "subject", "没有一个有思考能力的人"), b("can refuse", "情态动词及动词", "谓语", "no thinking man", "no与refuse结合为不能拒绝。", "predicate", "能够拒绝"), b("to accept their first proposition", "不定式短语", "不定式补足语", "refuse", "说明拒绝做什么；proposition是accept的宾语。", "complement", "接受他们的第一项主张", [c("their first proposition", "名词短语", "宾语", "accept", "their指未来主义者，内容由冒号后解释。")]), b("that a great change in our emotional life calls for a change of expression", "that内容从句", "同位语从句", "proposition", "直接说出主张，不是that作主语的定语从句。", "modifier", "即情感生活的巨大变化需要表达方式的变化", [c("a great change in our emotional life", "名词短语", "从句主语", "calls", "in限定变化所在的领域。"), c("calls for", "动词及介词", "从句谓语及要求介词", "a great change", "call for表示需要。"), c("a change of expression", "名词短语", "介词宾语", "for", "of限定变化对象为表达。")])], clauses: [cl("that a great change in our emotional life calls for a change of expression", "同位语从句", "that", "解释proposition的内容", "a great change in our emotional life", "calls", [["介词for的宾语", "a change of expression"]], "译出主张后接其具体内容，保留变化与表达变化的条件联系。")], notes: ["这是对一般关系的认可：情感若有巨大变化，需要表达变化。不能据此补出作者已确认人类情感发生本质变化；末句恰好追问这一前提。"] },
  13: { trunk: "The whole question is really this: have we essentially changed", blocks: [b("The whole question", "名词短语", "主语", "is", "whole把全文争点收束到一个问题。", "subject", "整个问题"), b("is", "系动词", "谓语", "The whole question", "连接问题与this。", "predicate", "是"), b("really", "副词", "强调状语", "is this", "强调真正争点。", "modifier", "实际上"), b("this", "指示代词", "表语", "is", "预告冒号后的直接问题。", "complement", "这一点"), b("have we essentially changed", "现在完成时直接疑问句", "表语内容解释", "this", "直接疑问保持have在we前，不是whether间接从句。", "modifier", "我们是否已发生本质变化", [c("have", "完成时助动词", "前置助动词", "changed", "因直接疑问而移到主语前。"), c("we", "代词", "问句主语", "have changed", "指人们。"), c("essentially", "副词", "变化层面状语", "changed", "询问本质上，而非单纯表面。"), c("changed", "过去分词", "问句实义动词", "have", "与have组成完成时，不能理解为过去时另起句。")])], clauses: [] },
};

export function withPassage3Teaching(sentence: SentenceAnalysis): SentenceAnalysis {
  const data = reviewed[sentence.number];
  if (!data) throw new Error(`${sentence.id}: 缺人工复核数据`);
  const result = withReviewedSyntax({ ...sentence, trunk: data.trunk,
    grammar: data.grammar ?? sentence.grammar, literal: data.literal ?? sentence.literal, natural: data.natural ?? sentence.natural,
    beginnerSyntax: { components: data.blocks.map(block => block.component), clauses: data.clauses, reading: passage3Reading[sentence.id] },
  }, data.blocks.map(block => block.color));
  return { ...result, translationAlignment: result.chunks.map((chunk, index) => ({ english: chunk.text, chinese: data.blocks[index].chinese })), translationNotes: data.notes, practice: passage3Practice[sentence.id] };
}
