import type { BeginnerSyntaxComponent, BeginnerClauseDetail, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";

// 只保存题干/选项真实连续片段；规范原型由词组知识层提供。
const questionPhrases: Record<string, string[]> = {
  "201026-prompt-analysis": ["main expectation of their husbands"],
  "201026-A-analysis": ["Talking to them"],
  "201026-B-analysis": ["Trusting them"],
  "201026-C-analysis": ["Supporting their careers"],
  "201026-D-analysis": ["Sharing housework"],
  "201027-prompt-analysis": ["Judging from the context", "wreaking havoc"],
  "201027-A-analysis": ["generating motivation"],
  "201027-B-analysis": ["exerting influence"],
  "201027-C-analysis": ["causing damage"],
  "201027-D-analysis": ["creating pressure"],
  "201028-prompt-analysis": ["All of the following"],
  "201028-A-analysis": ["tend to talk", "in public"],
  "201028-B-analysis": ["nearly 50 percent of recent divorces", "are caused by failed conversation"],
  "201028-C-analysis": ["attach much importance to communication", "between couples"],
  "201028-D-analysis": ["tends to be more talkative", "at home"],
  "201029-prompt-analysis": ["Which of the following"],
  "201029-A-analysis": ["more research"],
  "201029-B-analysis": ["stems from sex inequalities"],
  "201029-C-analysis": ["different expectations from their marriage"],
  "201029-D-analysis": ["between man and wife"],
  "201030-prompt-analysis": ["immediately after this text", "focus on"],
  "201030-A-analysis": ["a vivid account of the new book Divorce Talk", "Divorce Talk"],
  "201030-B-analysis": ["a detailed description of the stereotypical cartoon"],
  "201030-C-analysis": ["reasons for a high divorce rate"],
  "201030-D-analysis": ["a brief introduction to the political scientist Andrew Hacker"],
};

const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const a = (id: string, text: string, trunk: string, components: BeginnerSyntaxComponent[], colors: SyntaxVisualRole[], meaning: string, focus: string, clauses: BeginnerClauseDetail[] = []): SentenceAnalysis => withReviewedSyntax({
  id, number: 0, text, trunk, beginnerSyntax: { components, clauses }, layers: [{ label: "读题关键", text: focus }], grammar: [focus], literal: meaning, natural: meaning, logic: "先理解本项实际说了什么；是否选入须另看题目证据，不能用答案替代语言理解。", phrases: questionPhrases[id] ?? [],
}, colors);
const p = (...args: Parameters<typeof a>): SentenceAnalysis => ({ ...a(...args), textKind: "phrase" });
const comparison = (text: string, subject: string, predicate: string): BeginnerClauseDetail => ({ text, type: "省略的比较分句", marker: "than", role: "限定比较对象；解释中的省略内容不补写回原文", subject, predicate, predicateDetails: [], translationOrder: "先理解被比较的性质或行为，再用‘比……’接上比较方。" });

export const passage2010P2QuestionAnalysis: Record<number, QuestionAnalysis> = {
  26: {
    prompt: a("201026-prompt-analysis", "What is most wives' main expectation of their husbands?", "What is most wives' main expectation?", [
      c("What", "疑问代词", "疑问表语", "询问expectation的具体内容", "这里问期待是什么，不是问谁提出期待。陈述顺序可理解为主语expectation接is再接期待内容，原文仍保留疑问顺序。"),
      c("is", "一般现在时系动词", "谓语", "连接expectation与What", "单数is跟中心名词expectation一致，不跟复数wives一致。"),
      c("most wives' main expectation of their husbands", "名词短语", "主语", "所询问的期待", "中心expectation；most wives'说明多数妻子的，main限定首要，of their husbands表示对丈夫的期待。", [c("most wives'", "数量限定词与复数所有格", "前置限定语", "expectation", "wives是wife的不规则复数；以s结尾的复数所有格在末尾加撇号。"), c("of their husbands", "介词短语", "期待对象补足语", "expectation", "是对丈夫的期待，不是丈夫提出的期待。")]),
    ], ["complement", "predicate", "subject"], "多数妻子对丈夫的首要期待是什么？", "问的是main expectation，范围是most wives；不能只选婚姻中看起来合理的需要。"),
    options: {
      A: p("201026-A-analysis", "Talking to them.", "Talking", [c("Talking", "动名词", "期待内容的动作中心", "说明期待丈夫做什么", "-ing形式把动作作为期待的内容，不是有时态的完整句；执行者承接题干中的丈夫。"), c("to them", "介词短语", "交谈对象补足语", "Talking", "them回指妻子，talk to somebody表示与某人说话；to后是宾格代词。")], ["complement", "modifier"], "与她们交谈。", "Talking说明行为，to them说明对象；them不是丈夫自己。"),
      B: p("201026-B-analysis", "Trusting them.", "Trusting them", [c("Trusting", "动名词", "期待内容的动作中心", "说明期待丈夫做什么", "trust是及物动词，直接接人，不需要加to。"), c("them", "宾格代词", "宾语", "Trusting", "指妻子；这里是信任，不是交谈。")], ["complement", "object"], "信任她们。", "trust somebody直接接宾语；语法成立与是否有原文证据要分别判断。"),
      C: p("201026-C-analysis", "Supporting their careers.", "Supporting their careers", [c("Supporting", "动名词", "期待内容的动作中心", "说明期待丈夫做什么", "support直接接支持的对象；本项没有独立谓语。"), c("their careers", "名词短语", "宾语", "Supporting", "their回指妻子，careers是职业发展、事业，不是工作地点。")], ["complement", "object"], "支持她们的事业。", "their说明事业属于妻子。原文出现事业牺牲，不自动等于这一项是首要期待。"),
      D: p("201026-D-analysis", "Sharing housework.", "Sharing housework", [c("Sharing", "动名词", "期待内容的动作中心", "说明期待丈夫做什么", "share在这里是动词‘分担’，与原文their share中的名词‘份额’不同。"), c("housework", "不可数名词", "宾语", "Sharing", "指家务劳动，通常不加复数s。")], ["complement", "object"], "分担家务。", "share housework是分担劳动；不能把share只背成‘分享消息’。"),
    },
  },
  27: {
    prompt: a("201027-prompt-analysis", 'Judging from the context, the phrase "wreaking havoc" (Line 3, Para. 2) most probably means ________________.', "the phrase means ________________.", [
      c("Judging from the context", "固定评注性-ing结构", "判断依据状语", "限定整个释义判断", "表示根据上下文判断；理解为读者作判断，不是说phrase这个短语在思考。"),
      c('the phrase "wreaking havoc" (Line 3, Para. 2)', "名词短语、引文及位置标注", "主语", "means", "中心phrase；引号给出被解释的词组，括号是行段定位，不是词组内部的语法。"),
      c("most probably", "程度词加副词", "可能性状语", "means", "最可能，不是要求脱离语境列出词典的全部释义。"),
      c("means", "一般现在时及物动词", "谓语", "主语the phrase", "mean表示‘意思是’，第三人称单数加s；不是名词‘手段’。"),
      c("________________", "待选释义", "宾语", "means", "四个选项均用-ing短语表达被解释的行为。"),
    ], ["modifier", "subject", "modifier", "predicate", "object"], "根据上下文，第二段第三行的wreaking havoc最可能是什么意思？", "从上下文判断词组的负面程度；Judging from是评注，真正主语是the phrase。"),
    options: {
      A: p("201027-A-analysis", "generating motivation", "generating motivation", [c("generating", "动名词", "释义动作中心", "接在means后说明词组含义", "generate表示产生、带来；不是带be的进行时。"), c("motivation", "名词", "宾语", "generating", "动力、动机，是产生的东西。")], ["complement", "object"], "产生动力。", "generate motivation整体表达产生动力；motivation不能误读为破坏。"),
      B: p("201027-B-analysis", "exerting influence", "exerting influence", [c("exerting", "动名词", "释义动作中心", "接在means后解释词组", "exert表示施加、运用，直接带宾语。"), c("influence", "名词", "宾语", "exerting", "影响；这个名词本身不保证正面或负面。")], ["complement", "object"], "施加影响。", "exert influence比造成严重损害宽泛；判断近义表达要保留原词的方向与程度。"),
      C: p("201027-C-analysis", "causing damage", "causing damage", [c("causing", "动名词", "释义动作中心", "接在means后解释词组", "cause表示导致、造成；这里不是名词原因。"), c("damage", "不可数名词", "宾语", "causing", "损害、破坏，不是复数damages的法律赔偿义。")], ["complement", "object"], "造成损害。", "cause damage是动词加宾语，damage明确保留负面后果。"),
      D: p("201027-D-analysis", "creating pressure", "creating pressure", [c("creating", "动名词", "释义动作中心", "接在means后解释词组", "create在这里是造成、形成某种状态。"), c("pressure", "名词", "宾语", "creating", "压力，不是损害程度已经确定的damage。")], ["complement", "object"], "造成压力。", "压力与损害相关，但两个名词并不等义，需回到婚姻危机的后果比较。"),
    },
  },
  28: {
    prompt: a("201028-prompt-analysis", "All of the following are true EXCEPT ________________.", "All are true EXCEPT ________________.", [
      c("All of the following", "代词及of限定", "主语", "are", "All指下列说法全体，following在the following中名词化表示下列各项，不是新的谓语。"),
      c("are", "系动词", "谓语", "连接All与true", "复数主语对应are。"), c("true", "形容词", "表语", "are", "表示符合原文事实。"),
      c("EXCEPT ________________", "except介词结构", "排除范围补充语", "限定All are true", "除了待选的那一项；大写强调反向任务，不应选一个符合原文的说法。"),
    ], ["subject", "predicate", "complement", "modifier"], "下列各项都符合原文，除了……。", "先看到EXCEPT再判断选入：事实成立的三项应排除，缺乏依据的一项才是答案。"),
    options: {
      A: a("201028-A-analysis", "men tend to talk more in public than women", "men tend to talk more", [c("men", "复数名词", "主语", "tend", "泛指男性群体，结合tend理解为倾向。"), c("tend", "一般现在时动词", "谓语", "men", "tend to do表示往往做某事，不是无例外的规律。"), c("to talk more in public than women", "不定式短语", "不定式补足语", "tend", "to do补足倾向的行为，不是目的状语。", [c("more", "数量副词比较级", "数量状语", "talk", "比较说话量，不是人口数量。"), c("in public", "介词短语", "场合状语", "talk", "在公开场合，不能丢掉这个限制。"), c("than women", "省略比较分句", "比较基准", "more", "与女性的说话量比较，women不是talk的宾语。")])], ["subject", "predicate", "complement"], "男性在公开场合往往比女性话多。", "more比较talk的量；in public与tend都限制这项概括。", [comparison("than women", "women", "省略talk，表示女性说话的量")]),
      B: a("201028-B-analysis", "nearly 50 percent of recent divorces are caused by failed conversation", "nearly 50 percent of recent divorces are caused by failed conversation", [c("nearly 50 percent of recent divorces", "比例名词短语", "主语", "are caused", "of recent divorces明确把近期离婚案例作为比例总体；这与原文的divorce rate不是同一指标。", [c("nearly", "副词", "程度状语", "50 percent", "接近，不是精确等于。"), c("of recent divorces", "介词短语", "比例总体限定", "50 percent", "选项提出的分母范围：近期离婚案例。")]), c("are caused", "一般现在时被动语态", "谓语", "主语为所占比例的离婚案例", "被导致；是确定的因果表述，不是受访者认为某事是原因。"), c("by failed conversation", "介词短语", "原因来源补足语", "are caused", "by引出所声称的原因；failed修饰conversation，意为失败的沟通，不是另一个谓语。")], ["subject", "predicate", "modifier"], "近期近50%的离婚是沟通失败造成的。", "先把选项完整读成它提出的因果统计，再与原文比较；不能把50%看见两次就认为同义。"),
      C: a("201028-C-analysis", "women attach much importance to communication between couples", "women attach much importance to communication", [c("women", "复数名词", "主语", "attach", "女性是重视交流的人。"), c("attach", "一般现在时动词", "谓语", "women", "在attach importance to中表示赋予、给予，不按实物贴附理解。"), c("much importance", "不可数名词短语", "宾语", "attach", "importance是重要性，much强调程度；并不是many importances。"), c("to communication between couples", "to介词短语", "重视对象补足语", "attach importance", "to后接名词communication，不是不定式；between couples限定夫妻之间。", [c("between couples", "介词短语", "后置定语", "communication", "限定交流发生于夫妻之间，不是作者与研究者之间。")])], ["subject", "predicate", "object", "complement"], "女性很重视夫妻之间的交流。", "attach importance to something整体表示重视；to是介词，不能误拆成接动词的to do。"),
      D: a("201028-D-analysis", "a female tends to be more talkative at home than her spouse", "a female tends to be more talkative", [c("a female", "泛指单数名词短语", "主语", "tends", "female在这里作名词，表示一名女性，泛指女性这一方。"), c("tends", "一般现在时动词", "谓语", "a female", "泛指单数搭配tends；仍表示倾向，不保证每对夫妻如此。"), c("to be more talkative at home than her spouse", "不定式及内部主系表", "不定式补足语", "tends", "to be的逻辑主语是a female，talkative是其表语；比较发生在家中。", [c("more talkative", "形容词比较级", "不定式表语", "be", "比较健谈程度，more修饰talkative。"), c("at home", "介词短语", "场合状语", "be more talkative", "限定在家这一场合。"), c("than her spouse", "省略的比较分句", "比较基准", "more talkative", "spouse是配偶，her回指女性。")])], ["subject", "predicate", "complement"], "女性在家往往比配偶更健谈。", "a female是泛指，tends to保留倾向；不能把此项解释为所有夫妻绝无例外。", [comparison("than her spouse", "her spouse", "省略is，比较健谈程度")]),
    },
  },
  29: {
    prompt: a("201029-prompt-analysis", "Which of the following can best summarize the main idea of this text?", "Which can summarize the main idea?", [c("Which of the following", "疑问代词及范围限定", "主语", "can summarize", "哪一个选项；of the following限定选择范围。"), c("can best summarize", "情态动词及实义动词", "谓语", "Which", "can后summarize用原形；best是副词，表示最准确地概括。", [c("best", "副词最高级", "方式程度状语", "summarize", "比较概括是否准确完整，不是best这个选项名称。")]), c("the main idea of this text", "名词短语", "宾语", "summarize", "中心idea，main和of this text共同限定全文主旨，不是某一个细节。")], ["subject", "predicate", "object"], "下面哪一项最能概括本文主旨？", "best要求在相近选项中比较概括的准确性，全文主旨须覆盖首段、研究和结尾。"),
    options: {
      A: a("201029-A-analysis", "The moral decay deserves more research by sociologists.", "The moral decay deserves research.", [c("The moral decay", "名词短语", "主语", "deserves", "decay指衰败，moral限定道德方面；这是选项引入的话题。"), c("deserves", "一般现在时及物动词", "谓语", "The moral decay", "值得得到、应受到，直接接研究这一名词宾语。"), c("more research by sociologists", "名词短语及施事修饰", "宾语", "deserves", "research是不可数名词，by sociologists说明研究由谁进行。", [c("by sociologists", "介词短语", "后置定语", "research", "修饰研究的执行者，不是说道德衰败由社会学家造成。")])], ["subject", "predicate", "object"], "道德衰败值得社会学家做更多研究。", "by sociologists附着research。选项句法自然，仍需判断moral decay是否是全文议题。"),
      B: a("201029-B-analysis", "Marriage break-up stems from sex inequalities.", "Marriage break-up stems from sex inequalities.", [c("Marriage break-up", "名词短语", "主语", "stems", "break-up是名词‘破裂’，Marriage限定婚姻方面。"), c("stems", "一般现在时动词", "谓语", "Marriage break-up", "stem from整体表示源于；不是名词植物茎。"), c("from sex inequalities", "介词短语", "原因来源补足语", "stems", "inequalities为不平等现象，sex在此指性别。")], ["subject", "predicate", "complement"], "婚姻破裂源于性别不平等。", "stem from表达因果来源，比指出某种抱怨或相关现象更强；不能把二者混同。"),
      C: a("201029-C-analysis", "Husband and wife have different expectations from their marriage.", "Husband and wife have different expectations.", [c("Husband and wife", "and连接的并列名词", "主语", "have", "夫妻双方，组成复数意义的并列主语，所以用have。"), c("have", "一般现在时及物动词", "谓语", "Husband and wife", "持有、怀有某种期待，后面没有过去分词，不是完成时。"), c("different expectations from their marriage", "名词短语", "宾语", "have", "expectations是复数期待，from their marriage说明期待从婚姻中得到什么。", [c("from their marriage", "介词短语", "期待来源与范围补充", "expectations", "泛指对婚姻所得的期待，未限定为交谈伙伴。")])], ["subject", "predicate", "object"], "夫妻双方对婚姻抱有不同期待。", "这项比原文的交流期待更宽；语言讲解保留它实际说的范围，不偷偷补入conversation。"),
      D: a("201029-D-analysis", "Conversational patterns between man and wife are different.", "Conversational patterns are different.", [c("Conversational patterns between man and wife", "名词短语及介词修饰", "主语", "are", "中心patterns，Conversational限定交谈方面，between说明夫妻双方。", [c("between man and wife", "between A and B结构", "后置定语", "patterns", "man与wife是成对比较的双方；between与and须一起识别。")]), c("are", "一般现在时系动词", "谓语", "patterns", "复数patterns对应are。"), c("different", "形容词", "表语", "are", "说明模式不同，不是动作宾语。")], ["subject", "predicate", "complement"], "夫妻之间的谈话模式不同。", "主系表核心是patterns are different，Conversational保留全文的交谈范围。"),
    },
  },
  30: {
    prompt: a("201030-prompt-analysis", "In the following part immediately after this text, the author will most probably focus on ________________.", "the author will focus on ________________.", [c("In the following part immediately after this text", "介词短语及内部位置修饰", "篇章范围状语", "限定focus所处的后续部分", "following是后续的，immediately after this text限定紧接本文，而非未来任意位置。", [c("immediately after this text", "副词加介词短语", "后置限定语", "the following part", "immediately加强紧接关系；after后是名词短语，不是完整时间从句。")]), c("the author", "名词短语", "主语", "will focus", "要推断的是作者接下来展开的话题。"), c("will most probably focus", "will加实义动词及副词", "谓语", "the author", "will focus表示后续写作；most probably明确只是最可能的推断。", [c("most probably", "程度词加副词", "可能性状语", "will focus", "不能译成作者肯定会这样写。")]), c("on ________________", "on介词结构", "关注对象补足语", "focus", "focus on something中on后由选项的名词短语补出对象。")], ["modifier", "subject", "predicate", "complement"], "在紧接本文的下一部分，作者最可能着重写什么？", "同时保留immediately after和most probably：推断末段之后的最直接承接，不虚构实际后文。"),
    options: {
      A: p("201030-A-analysis", "a vivid account of the new book Divorce Talk", "a vivid account", [c("a vivid account", "名词短语", "选项核心", "填入focus on后充当介词宾语", "account在这里是叙述、介绍，不是账户或账目；vivid修饰介绍的生动程度。"), c("of the new book Divorce Talk", "介词短语及书名同位说明", "后置定语", "account", "介绍的对象是这本新书；Divorce Talk是书名，不能读成新的主谓。")], ["object", "modifier"], "对新书《Divorce Talk》的生动介绍。", "中心是account，of引出介绍对象；整个选项是名词短语，没有谓语。"),
      B: p("201030-B-analysis", "a detailed description of the stereotypical cartoon", "a detailed description", [c("a detailed description", "名词短语", "选项核心", "填入focus on后充当介词宾语", "description是描写，detailed说明详细；不是动词describe。"), c("of the stereotypical cartoon", "介词短语", "后置定语", "description", "被描写的对象是前文那幅常见模式的漫画，the表示已知对象。")], ["object", "modifier"], "对那幅常见漫画的详细描写。", "description of把描写与对象连接起来；the cartoon回到结尾的具体场景。"),
      C: p("201030-C-analysis", "other possible reasons for a high divorce rate in the U.S.", "other possible reasons", [c("other possible reasons", "名词短语", "选项核心", "填入focus on后充当介词宾语", "other另一些，possible可能的，共同修饰reasons；不是确定列出的全部原因。"), c("for a high divorce rate in the U.S.", "介词短语", "后置定语", "reasons", "for引出要解释的高离婚率，in the U.S.限定这一指标所在国家。", [c("in the U.S.", "介词短语", "地域限定", "a high divorce rate", "美国的高离婚率；不是作者所在的写作地点。")])], ["object", "modifier"], "美国高离婚率的其他可能原因。", "reasons for表示某现象的原因；possible仍保留推测，other会将话题扩展到交流之外。"),
      D: p("201030-D-analysis", "a brief introduction to the political scientist Andrew Hacker", "a brief introduction", [c("a brief introduction", "名词短语", "选项核心", "填入focus on后充当介词宾语", "introduction是介绍，brief是简短的；不是一般过去时动词。"), c("to the political scientist Andrew Hacker", "介词短语及姓名同位说明", "介绍对象补足语", "introduction", "to后接名词短语，意为对政治学家Hacker的介绍，不是不定式。")], ["object", "modifier"], "对政治学家安德鲁·哈克的简要介绍。", "introduction to somebody中的to为介词；姓名是介绍对象，不能仅因出现过就推成结尾后的主线。"),
    },
  },
};
