import type { SentenceWordContext } from "./contextual-vocabulary";
import type { WordKnowledge } from "./knowledge-base";
type Entry = { context: SentenceWordContext; knowledge: WordKnowledge };
const w = (partOfSpeech: string, meaning: string, pattern: string, rule: string, preferredCollocations?: string[]): Entry => ({ context: { partOfSpeech, contextualMeaning: meaning, use: rule, preferredCollocations }, knowledge: { grammarRole: partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning, rule }] } });
// 每项由当前正文或题目来源逐项审定；保留共用词元，不跨来源替换用法。
const sources: Record<string, Record<string, Entry>> = {
  "2001-p2-s1": {
    "be": w("aux.（进行时与被动）", "构成正在被……", "is being paid to", "is与being paid共同构成现在进行时被动，attention是受到重视的对象。", ["is being paid today to"]),
    "rich": w("adj.（名词化结构中）", "信息丰富的", "the info rich", "rich修饰信息资源充足这一特征，the info rich整体指信息富有者，与the info poor对照。", ["the so-called digital divide"]),
    "of": w("prep.", "大量；……的", "a great deal of attention / division of the world", "首处of属于数量表达a great deal of，后两处分别说明关注内容与划分对象，不能一律按数量结构分析。"),
  },
  "2001-p2-s2": {
    "that": w("det.（指示限定词）", "那个；上述的", "that divide", "that限定divide，回指上一句数字鸿沟，不引导从句。"),
    "do": w("aux.（强调助动词）", "确实", "does exist", "does使肯定判断加强，exist保持原形。", ["does exist today"]),
  },
  "2001-p2-s3": {
    "this": w("det.", "这种；上述的", "this looming danger", "this限定danger，把数字鸿沟概括为迫近的危险。"),
    "about": w("prep.", "关于", "lecture about this looming danger", "about引出讲话或讲授的主题，不表示大约。", ["lectured about this looming danger"]),
  },
  "2001-p2-s4": {
    "what": w("pron.（融合型关系代词）", "当时不太明显的事物", "What was less visible then", "what本身作was的主语，整个what从句作外层were的主语，不是疑问提问。", ["less visible then"]),
    "that": w("pron.（关系代词）", "引出修饰力量的从句", "forces that work against the digital divide", "that回指forces，在定语从句内作work主语。", ["work against the digital divide"]),
    "against": w("prep.", "抵制；抑制", "work against the digital divide", "against引出这些力量所抑制的对象数字鸿沟。", ["work against the digital divide"]),
    "be": w("v.（系动词）", "是；处于……状态", "What was less visible ... were the forces", "内层was接visible形容词表语；外层were接forces名词表语。外层复数与表语forces呼应，保留原文。"),
  },
  "2001-p2-s5": {
    "there": w("存在句引导词", "引出理由的存在", "There are reasons to be optimistic", "there无地点所指，reasons为存在主体；to be optimistic补足reasons。", ["reasons to be optimistic"]),
    "be": w("v.（存在句／系动词）", "有；处于", "There are reasons / to be optimistic", "are用于存在句，be接optimistic作系动词，同一词元承担两个位置的功能。"),
    "to": w("不定式标记", "引出乐观的理由内容", "reasons to be optimistic", "to接be原形补足reasons，不是介词接名词。", ["reasons to be optimistic"]),
  },
  "2001-p2-s6": {
    "there": w("存在句引导词", "引出技术性理由的存在", "there are technological reasons to hope", "there与are构成存在句，不指某个地点。", ["technological reasons to hope"]),
    "be": w("v.（存在句）", "有；存在", "there are technological reasons", "are与复数reasons呼应，不构成被动或进行时。"),
    "to": w("不定式标记", "引出抱有希望的内容", "reasons to hope", "to hope补足reasons，后面省略that的内容从句补足hope。", ["technological reasons to hope"]),
  },
  "2001-p2-s7": {
    "as": w("conj.（随时间发展）", "随着", "As the Internet becomes more and more commercialized", "as引出完整主谓，说明商业化发展与企业动机的关系。", ["more and more commercialized"]),
    "it": w("pron.（形式主语）", "形式主语，本身不指具体事物", "it is in the interest of business to universalize access", "真正讨论的行为是后置不定式to universalize access；it不能回指Internet。", ["in the interest of business"]),
    "more": w("adv.／det.（比较级）", "越来越；更多", "more and more commercialized / the more people ... the more potential customers", "前两次more修饰commercialized程度，后两次限定people与customers数量；比较数量的两个分句相互关联。", ["the more people online, the more potential customers there are"]),
    "there": w("存在句引导词", "有；存在", "the more potential customers there are", "存在主体potential customers因比较结构提前，there并非地点副词。", ["the more people online, the more potential customers there are"]),
    "be": w("v.（系动词／存在句）", "符合；存在", "it is in the interest ... / customers there are", "is接介词短语表语，are属于后面的存在句；两处不是同一种结构。"),
    "to": w("不定式标记", "引出普及接入的行为", "to universalize access", "不定式是真正主语，与前面的形式主语it对应。", ["to universalize access"]),
    "interest": w("n.", "利益", "in the interest of business", "interest指企业的商业利益，不是兴趣或利息。", ["in the interest of business"]),
  },
  "2001-p2-s8": {
    "more": w("det.（比较级）", "越来越多的", "More and more governments", "限定governments的数量增加，并非两个the more分句。", ["More and more governments"]),
    "be": w("aux.（被动）", "被……", "will be left behind", "be与left构成将来被动，behind是动词短语粒子。", ["be left behind"]),
    "to": w("不定式标记", "引出希望做到的事", "want to spread Internet access", "to spread补足want，省略的执行者为governments。", ["spread Internet access"]),
    "their": w("det.（物主限定词）", "它们的（各政府所属国家的）", "their countries", "their承接governments，说明各国政府希望本国免于落后。"),
  },
  "2001-p2-s9": {
    "he": w("原卷异常字形", "疑似误排，见用法", "will he netted together（原卷）", "原卷此处印he，按句法疑似应校读为be；规范式will be netted together为将来被动，he不能在此充当人称代词主语。", ["will he netted together"]),
    "net": w("v.（过去分词）", "连接成网络", "will he netted together（原卷）", "netted表示把人连接成网络。原卷he疑似be误排；按规范式be netted分析被动，不能把he教为助动词。", ["will he netted together"]),
    "to": w("prep.（数值区间）", "到；至", "one to two billion people", "to连接数量范围十亿至二十亿，不是不定式标记。"),
  },
  "2001-p2-s10": {
    "as": w("prep.（固定表达中）", "作为；由此", "As a result", "整组为结果连接表达，因此；不带时间状语从句。", ["As a result"]),
    "narrow": w("v.", "缩小", "will narrow rather than widen", "narrow与widen并列共用will，rather than排除相反趋势。", ["narrow rather than widen"]),
  },
  "2001-p2-s11": {
    "that": w("pron.（指示／关系）", "那种趋势；引出工具的限定", "That is ... / tool ... that we’ve ever had", "句首That回指鸿沟将缩小这一预测；末处that回指tool，在we’ve ever had内作宾语。"),
    "be": w("v.（系动词）", "是；可能成为", "is very good news / may well be the most powerful tool", "is与be后均为名词性表语；may well表达可能性较大，不保证必然。", ["may well be"]),
    "well": w("adv.（可能性强调）", "很可能", "may well be", "well加强may表达的可能性，不能按健康或做得好理解。", ["may well be"]),
    "for": w("prep.（用途）", "用于", "a tool for combating world poverty", "for接动名词combating，说明工具用途。", ["the most powerful tool for combating world poverty"]),
    "have": w("aux.及v.（完成时与实义）", "曾经拥有", "we’ve ever had", "we’ve含完成时助动词have，had是实义have的过去分词，宾语由关系词that承接tool。", ["that we’ve ever had"]),
  },
  "2001-p2-s12": {
    "of": w("prep.（固定表达／名词补足）", "当然；……的", "Of course / the use of the Internet", "Of course整体表示当然；use of说明使用的对象，不是数量of。", ["Of course"]),
    "be": w("v.（系动词）", "是", "isn’t the only way", "isn’t接名词表语way，否定唯一性，不否定互联网能帮助减贫。"),
    "only": w("adj.（限定）", "唯一的", "the only way to defeat poverty", "only修饰way，isn’t否定唯一性；本句没有if条件。", ["the only way to defeat poverty"]),
    "to": w("不定式标记", "用于战胜", "way to defeat poverty", "to defeat poverty后置补足way，说明什么途径。", ["the only way to defeat poverty"]),
    "use": w("n.", "使用", "the use of the Internet", "use为主语中心名词，of说明使用对象，不是动词谓语。", ["the use of the Internet"]),
  },
  "2001-p2-s13": {
    "be": w("v.（系动词）", "是", "the Internet is not the only tool", "否定系表判断，the only tool为名词表语。"),
    "only": w("adj.（限定）", "唯一的", "the only tool we have", "only修饰tool，we have是省略宾语关系代词的定语从句。", ["the only tool we have"]),
    "have": w("v.（实义动词）", "拥有", "the only tool we have", "have后缺的宾语是tool，由省略的关系代词承接；这里没有过去分词，不是完成时。", ["the only tool we have"]),
  },
  "2001-p2-s14": {
    "it": w("pron.", "它（互联网）", "it has enormous potential", "it回指Internet，充当实在主语，不是形式主语。", ["has enormous potential"]),
    "have": w("v.（实义动词）", "具有", "has enormous potential", "has接potential名词宾语，没有完成时分词。", ["has enormous potential"]),
  },
  "2001-p2-s15": {
    "to": w("不定式标记／prep.", "为了；引出必要行为；关于", "To take advantage / have to get over / with respect to", "句首To引出目的；have to中的to引出必须做的行为；with respect to末尾to是介词。", ["To take advantage of this tool"]),
    "have": w("v.（必要性结构）", "必须", "have to get over", "have to表示必须，get over意为克服；不是拥有或完成时。", ["get over their outdated anti-colonial prejudices"]),
    "with": w("prep.（固定表达中）", "关于；就……而言", "with respect to foreign investment", "with respect to整体引出偏见针对的领域，无宾语加分词的复合结构。", ["with respect to foreign investment"]),
    "get": w("v.（短语动词）", "克服", "get over their outdated anti-colonial prejudices", "get over的宾语是过时偏见，意为摆脱，不是康复或收到。", ["get over their outdated anti-colonial prejudices"]),
    "of": w("prep.（固定搭配中）", "以……为利用对象", "take advantage of this tool", "of引出工具Internet，整组表示利用，不是数量结构。", ["To take advantage of this tool"]),
  },
  "2001-p2-s16": {
    "that": w("pron.（关系代词）", "引出限定国家的从句", "Countries that still think ...", "that作think的主语，回指Countries；think后另有省略that的内容从句。"),
    "well": w("adv.（建议语气）", "不妨；大可以", "might well study", "这里might well提出有理由采取的做法，劝这些国家研究历史，并非断言它们很可能正在研究。", ["might well study"]),
    "be": w("v.（系动词）", "是（观点内容）", "foreign investment is an invasion", "is位于think的内容中，呈现某些国家的看法，不等于作者认可该判断。", ["an invasion of their sovereignty"]),
    "of": w("prep.（名词补足）", "对……的；……的", "invasion of sovereignty / history of infrastructure / foundations of a society", "分别补足侵犯对象、历史对象与基础所属，按三个中心名词分析。"),
    "their": w("det.（物主限定词）", "它们的（这些国家的）", "their sovereignty", "their回指Countries，sovereignty指国家主权。", ["an invasion of their sovereignty"]),
  },
  "2001-p2-s17": {
    "it": w("pron.", "它（美国）", "it didn’t have the capital", "it承接the United States，说明早期美国缺乏建设所需资金。"),
    "have": w("v.（实义动词）", "拥有", "didn’t have the capital", "didn’t承担过去时否定，have接资金名词宾语，不是完成时。", ["have the capital to do so"]),
    "capital": w("n.", "资金；资本", "the capital to do so", "capital是have的宾语，后面的不定式说明用于建设基础设施，不是首都或大写字母。", ["have the capital to do so"]),
    "so": w("代替性副词", "那样做（建设基础设施）", "do so", "so代替build its industrial infrastructure这一行为，没有因此的因果义。", ["do so"]),
    "to": w("不定式标记", "用于进行该行为", "capital to do so", "to do so限定资金用途，其逻辑执行者为美国。", ["have the capital to do so"]),
  },
  "2001-p2-s18": {
    "that": w("pron.（指示代词）", "那（美国当时资金不足）", "that is why", "that概括前句缺乏资本的情况，充当主语。", ["that is why"]),
    "why": w("关系副词（表语从句）", "……的原因；所以", "that is why ... were built with foreign investment", "why引出缺资金所导致的结果，不是美国缺资金的原因。", ["that is why"]),
    "be": w("v.／aux.（系动词与被动）", "是；被……", "that is why / infrastructure ... were built", "is为系动词；原卷were built为被动，中心词infrastructure与were数不一致，按原卷保留，不据此教授主谓一致。"),
    "so": w("adv.（固定表达中）", "等等", "and so on", "so与and、on组成列举未尽的表达，不表示因此。"),
    "with": w("prep.（资源／手段）", "用；借助", "built with foreign investment", "with说明建设所用资金来源，不是独立主格式的with复合结构。", ["were built with foreign investment"]),
  },
  "2001-p2-s19": {
    "be": w("aux.（进行时）", "构成过去正在进行", "were investing", "were接现在分词investing，构成过去进行时，没有被动。", ["were investing in"]),
    "in": w("prep.（投资对象）", "向……投资", "invest in Britain’s former colony", "in补足invest，投资对象是当时已经独立的美国。", ["were investing in"]),
    "colony": w("n.", "殖民地", "Britain’s former colony", "former表曾经，美国在所举时期不再是英国殖民地。", ["Britain’s former colony"]),
  },
  "2001-p2-s20": {
    "they": w("pron.（主格／宾格）", "他们（投资者）；它们（设施）", "They financed them", "They承接英、德、荷、法投资者作主语；them是同一词元的宾格形式，回指设施作宾语。须按词位区分出资者与出资对象。", ["financed them"]),
    "finance": w("v.（过去式）", "为……提供资金", "financed them", "financed只说明出资，不自动等于建造或取得当前所有权。", ["financed them"]),
  },
  "2001-p2-s21": {
    "they": w("pron.", "它们（基础设施）", "built them", "them承接基础设施；主语Immigrant Americans负责建造，区别上一句出资者。", ["built them"]),
    "immigrant": w("adj./n.（名词前修饰）", "移民的；移民", "Immigrant Americans", "Immigrant修饰Americans，整个主语指美国移民群体，不是本句动词。", ["Immigrant Americans"]),
  },
  "2001-p2-s22": {
    "who": w("pron.（疑问代词）", "谁", "Guess who owns them now", "who引出嵌入疑问并作owns的主语，不是修饰前面某个人的关系代词。", ["Guess who owns them now"]),
    "own": w("v.（第三人称单数）", "拥有", "who owns them now", "owns问当前所有权，不是形容词自己的；所有权与历史出资者有别。", ["Guess who owns them now"]),
    "they": w("pron.", "它们（基础设施）", "owns them", "them回指前述美国基础设施，下一句The Americans回答拥有者。"),
  },
  "2001-p2-s24": {
    "be": w("v.（系动词）", "成立；属实", "the same thing would be true", "be接true作表语，would为推测或设想，并非被动。", ["the same thing would be true"]),
    "else": w("adv.（后置修饰）", "其他；别的", "anywhere else", "else修饰anywhere，表示其他任何地方，不与who组成谁还。", ["anywhere else for that matter"]),
    "for": w("prep.（固定表达中）", "就此而言；说起来", "for that matter", "整组扩展例证适用范围，不能按为了某物直译。", ["anywhere else for that matter"]),
    "that": w("det.（固定表达中）", "那一方面", "for that matter", "that修饰matter，整组用于把案例推广到其他地方，不引导从句。"),
    "like": w("prep.（举例）", "像；例如", "in places like Brazil", "like接Brazil举例，不是喜欢这一动作。", ["in places like Brazil"]),
  },
  "2001-p2-s25": {
    "more": w("det.（比较级）", "越多的", "The more foreign capital ... the better off", "more限定不可数capital数量，与后面better off构成越……越……。", ["The more foreign capital"]),
    "capital": w("n.", "资金；资本", "foreign capital you have helping you build", "capital为have的宾语，也为helping的逻辑主语，资金帮助建设，不是国家首都。", ["The more foreign capital"]),
    "have": w("v.（实义动词，带宾补）", "拥有；使……处于某状态", "have foreign capital helping you build", "宾语capital后接helping宾补，you为build的执行者；这里没有完成时过去分词。"),
    "which": w("pron.（关系代词）", "引出基础设施的补充说明", "which is an electronic infrastructure", "which回指Third Wave infrastructure，补充其电子信息性质。", ["an electronic infrastructure"]),
    "be": w("v.（系动词）", "是；处于", "which is ... / you’re going to be better off", "is接名词表语；are参与be going to，末尾be接提前的better off状态表语。"),
    "to": w("不定式标记", "构成将来趋向表达", "be going to be better off", "to属于be going to do，后接系动词be，不是目的介词。", ["the better off you’re going to be"]),
    "off": w("adv.（状态表达中）", "处于某种境况", "better off", "better off整体表示境况更好，并非离开或关闭。", ["the better off you’re going to be"]),
  },
  "2001-p2-s26": {
    "that": w("pron.（指示代词）", "那（利用外资建设的主张）", "That doesn’t mean ...", "That回指前句建设建议，不指某个国家，不引导从句。"),
    "mean": w("v.", "意味着", "doesn’t mean lying down ... or letting ...", "mean后两个并列动名词组，否定无需抵抗欺骗或任由企业失控的推论。", ["doesn't mean lying down"]),
    "lie": w("v.（动名词形式）", "躺下；消极顺从", "lying down and becoming fooled", "lying down为mean的动名词宾语，与becoming fooled并列，语境喻指消极任人摆布。", ["doesn't mean lying down"]),
    "let": w("v.（动名词形式）", "让；任由", "letting foreign corporations run uncontrolled", "letting接宾语foreign corporations，再接无to的run宾补，uncontrolled说明经营状态。", ["letting foreign corporations run uncontrolled"]),
    "run": w("v.（不带to的不定式）", "运营；经营", "foreign corporations run uncontrolled", "run由let支配，逻辑主语为foreign corporations，不是作者运营这些公司。", ["letting foreign corporations run uncontrolled"]),
  },
  "2001-p2-s27": {
    "it": w("pron.", "它（利用外资建设的主张）", "It does mean recognizing ...", "It与上一句That指向同一主张，先否定放任，再肯定认识其作用。"),
    "do": w("aux.（强调助动词）", "确实", "does mean", "does用于肯定强调，mean保持原形，与前句doesn’t形成论点边界。", ["does mean recognizing"]),
    "mean": w("v.", "意味着", "does mean recognizing how important they can be", "mean接动名词recognizing，后接how引出的认识内容。", ["does mean recognizing"]),
    "they": w("pron.", "它们（外国公司）", "how important they can be", "they承接foreign corporations，不能直接换成设施或国家。"),
    "be": w("v.（系动词）", "具有……程度的重要性", "how important they can be", "be接前置的important表语，can表示潜在作用，不是被动。"),
    "in": w("prep.（活动领域）", "在……方面", "important in building the energy and telecom infrastructures", "in接building动名词，界定外国公司可发挥作用的领域。", ["in building the energy and telecom infrastructures"]),
    "need": w("v.（过去分词，后置）", "所需要的", "infrastructures needed to take full advantage", "needed后置限定设施，没有独立时态，说明充分利用互联网需要的设施。", ["needed to take full advantage of the Internet"]),
    "to": w("不定式标记", "为了；用于", "needed to take full advantage of the Internet", "不定式解释设施所满足的用途或需要，不能接成外国公司需要的宾语。", ["needed to take full advantage of the Internet"]),
    "of": w("prep.（固定搭配中）", "以……为利用对象", "take full advantage of the Internet", "of接Internet，take full advantage整体表示充分利用。", ["take full advantage of the Internet"]),
  },
  "question-200125-prompt": {
    "be": w("v.（系动词）", "是", "Digital divide is something", "is后为something表语，选项继续限定该名词。"),
  },
  "question-200125-option-A": {
    "get": w("v.（系动词，分词形式）", "变得", "getting worse", "getting接形容词比较级worse作表语，整组补充something的变化，不能解为获得。", ["getting worse"]),
    "bad": w("adj.（比较级）", "更糟的", "getting worse", "worse是bad的比较级，作getting的表语；这里不是副词well的比较级。", ["getting worse"]),
    "of": w("prep.（固定表达中）", "由于", "because of the Internet", "because of后接名词Internet，整组表原因，不是because加完整从句。", ["because of the Internet"]),
  },
  "question-200125-option-B": {
    "rich": w("adj.（名词化结构中）", "富裕的", "the rich countries", "rich修饰countries，指经济富裕的国家，不能自动改成正文信息资源丰富的群体。", ["are responsible for"]),
    "be": w("v.（系动词）", "负有", "the rich countries are responsible for", "are接responsible形容词表语；关系从句缺的介词宾语由题干something承接。", ["are responsible for"]),
    "for": w("prep.（形容词补足）", "对……负责", "be responsible for something", "for的宾语为关系结构中的something，选项末尾介词悬置，并非目的状语。", ["are responsible for"]),
  },
  "question-200125-option-C": {
    "must": w("modal v.", "必须", "the world must guard against", "must强调防范的必要性，guard保持原形。", ["must guard against"]),
    "against": w("prep.", "防范；抵御", "guard against something", "against后缺的宾语由题干something承接，整组意为提防。", ["must guard against"]),
  },
  "question-200125-option-D": {
    "consider": w("v.（过去分词）", "被认为", "something considered positive today", "considered短语后置修饰something，positive说明被认为的性质；该选项本身没有限定时态的谓语。", ["considered positive today"]),
    "positive": w("adj.", "积极的；有益的", "considered positive", "positive为对something的评价，不可把数字鸿沟与正文抗衡鸿沟的积极力量混同。", ["considered positive today"]),
  },
  "question-200126-prompt": {
    "to": w("prep.", "对……", "attach importance to the Internet", "to接重视的对象Internet，不是不定式。", ["attach importance to the Internet"]),
    "attach": w("v.", "给予；赋予", "attach importance to the Internet", "importance作宾语，to引出受到重视的对象；整组表示重视。", ["attach importance to the Internet"]),
    "it": w("pron.", "它（互联网）", "because it ...", "it承接Internet作原因从句主语，后续谓语由选项补全。"),
  },
  "question-200126-option-A": {
    "potential": w("n.（复数）", "潜力；潜在机会", "offers economic potentials", "potentials为offers宾语，economic限定经济方面；保留原卷复数形式。", ["economic potentials"]),
  },
  "question-200126-option-B": {
    "fund": w("n.（复数）", "资金", "bring foreign funds", "funds为bring的宾语，foreign限定来自国外，不是动词资助。", ["bring foreign funds"]),
  },
  "question-200126-option-C": {
    "out": w("adv.（短语动词粒子）", "彻底清除", "wipe out world poverty", "out与wipe组成消除这一动作，world poverty为对象，soon另给时间承诺。", ["wipe out world poverty"]),
  },
  "question-200126-option-D": {
    "over": w("prep.（范围表达中）", "遍及", "all over the world", "all over整体表示世界各地，不指控制权高于他人。", ["all over the world"]),
  },
  "question-200127-prompt": {
    "case": w("n.", "事例；案例", "the case of the United States", "case指美国基础设施建设这一论证实例，不是法律案件。", ["the case of the United States"]),
    "to": w("不定式标记", "为了", "to justify the policy", "to justify说明提出美国案例的论证目的，具体政策由选项补全。", ["to justify the policy"]),
    "justify": w("v.", "为……提供理由", "justify the policy", "justify的宾语为policy，即用案例支持一项政策的合理性，不表示纠正政策。", ["to justify the policy"]),
  },
  "question-200127-option-A": {
    "provide": w("v.（动名词）", "提供", "providing financial support overseas", "providing引出政策的行为内容，不作独立限定谓语。", ["providing financial support overseas"]),
    "support": w("n.", "支持；资助", "financial support", "support作providing的宾语，financial限定经济资助，不是动词。", ["providing financial support overseas"]),
    "overseas": w("adv.", "向海外；在海外", "providing financial support overseas", "overseas修饰提供支持这一行为，此选项说向外资助，不是接受外资。", ["providing financial support overseas"]),
  },
  "question-200127-option-B": {
    "capital": w("n.（所有格）", "资本；资金", "foreign capital’s control", "capital’s修饰control，表示外资实施的控制；不是本国对外资的控制。", ["foreign capital’s control"]),
    "control": w("n.", "控制", "preventing foreign capital’s control", "control为preventing的宾语，capital’s给出控制施事，方向不能倒置。", ["foreign capital’s control"]),
    "prevent": w("v.（动名词）", "防止", "preventing foreign capital’s control", "preventing是政策行为的动名词形式，没有独立主语和时态。"),
  },
  "question-200127-option-C": {
    "build": w("v.（动名词）", "建造", "building industrial infrastructure", "building接infrastructure为宾语，表示建设行动，不是名词建筑物。", ["building industrial infrastructure"]),
  },
  "question-200127-option-D": {
    "accept": w("v.（动名词）", "接受", "accepting foreign investment", "accepting引出政策行为，investment为宾语，不是独立限定谓语。", ["accepting foreign investment"]),
  },
  "question-200128-prompt": {
    "it": w("pron.（形式主语）", "形式主语", "It seems that ...", "it用于It seems that句式，判断内容在后面的that从句中，不回指Internet。"),
    "that": w("conj.（内容连接词）", "引出看来如此的内容", "It seems that ...", "that引出判断内容，句内主语为the development of a country’s economy。"),
    "much": w("adv.", "很大程度上", "depends much on", "much修饰depends的程度，不限定后面某个名词数量。", ["depends much on"]),
    "on": w("prep.（动词补足）", "取决于", "depend on + clause", "on后接选项给出的名词性从句，说明经济发展所依赖的方面。", ["depends much on"]),
  },
  "question-200128-option-A": {
    "how": w("adv.（程度）", "多么；达到怎样的程度", "how well-developed it is electronically", "how修饰well-developed程度，整句作题干on的宾语，不是提问方式如何做。"),
    "it": w("pron.", "它（该国）", "it is well-developed electronically", "it回指题干a country，判断该国在电子信息方面的发展。"),
    "be": w("v.（系动词）", "处于……状态", "how well-developed it is electronically", "is接前置的well-developed形容词表语，没有倒装问句。"),
    "electronically": w("adv.", "在电子信息方面", "well-developed electronically", "限定发达的领域，不是通过电子方式实施某个动作。", ["how well-developed it is electronically"]),
  },
  "question-200128-option-B": {
    "whether": w("conj.（名词性从句）", "是否", "whether it is prejudiced against immigrants", "whether引出on所接的内容，不是如果的条件状语。"),
    "it": w("pron.", "它（该国）", "it is prejudiced against immigrants", "it回指country，选项转向对移民的偏见。"),
    "be": w("v.（系动词）", "怀有……态度", "is prejudiced against immigrants", "is接prejudiced作形容词表语，against引出偏见对象。", ["prejudiced against immigrants"]),
    "against": w("prep.", "对……（有偏见）", "prejudiced against immigrants", "against补足prejudiced，对象是移民，而正文讨论对外资的偏见。", ["prejudiced against immigrants"]),
  },
  "question-200128-option-C": {
    "whether": w("conj.（名词性从句）", "是否", "whether it adopts America’s industrial pattern", "whether引出依赖的事项，不是条件状语。"),
    "it": w("pron.", "它（该国）", "it adopts America’s industrial pattern", "it回指country，是adopts的主语。"),
    "adopt": w("v.", "采用", "adopts America’s industrial pattern", "adopt接模式作宾语，表示采用，不是adapt适应或改编。", ["adopts America’s industrial pattern"]),
    "pattern": w("n.", "模式", "America’s industrial pattern", "pattern为adopts的宾语，America’s限定所属国家，不等于某种电子技术发展程度。", ["adopts America’s industrial pattern"]),
  },
  "question-200128-option-D": {
    "much": w("det.（数量）", "多少", "how much control", "much限定不可数名词control，与题干修饰depends的副词much不同。", ["control over foreign corporations"]),
    "have": w("v.（实义动词）", "拥有", "how much control it has", "has的宾语how much control前置，未带完成时过去分词。"),
    "it": w("pron.", "它（该国）", "it has control", "it回指country，控制的施事是国家，不是外国公司。"),
    "over": w("prep.（控制对象）", "对……", "control over foreign corporations", "over引出受控制的外国公司，不是遍及各地的范围义。", ["control over foreign corporations"]),
    "control": w("n.", "控制权", "control over foreign corporations", "国家拥有的control指对外国公司的监管或控制，方向与foreign capital’s control相反。", ["control over foreign corporations"]),
  },
};
export const passage2001P2SourceContexts = Object.fromEntries(Object.entries(sources).map(([id, entries]) => [id, Object.fromEntries(Object.entries(entries).map(([word, entry]) => [word, entry.context]))]));
export function getPassage2001P2SourceKnowledge(headword: string, sourceId?: string): WordKnowledge | undefined { return sourceId ? sources[sourceId]?.[headword]?.knowledge : undefined; }
