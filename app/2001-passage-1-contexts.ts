import type { SentenceWordContext } from "./contextual-vocabulary";
import type { WordKnowledge } from "./knowledge-base";
type Entry = { context: SentenceWordContext; knowledge: WordKnowledge };
const w = (partOfSpeech: string, meaning: string, pattern: string, rule: string, preferredCollocations?: string[]): Entry => ({ context: { partOfSpeech, contextualMeaning: meaning, use: rule, preferredCollocations }, knowledge: { grammarRole: partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning, rule }] } });
// 来源逐项审定；同一词元在题干、选项与正文中可以承担不同结构。
const sources: Record<string, Record<string, Entry>> = {
  "2001-p1-s1": {
    be: w("aux.（被动助动词）", "构成被动：被……", "can be seen as", "be与seen构成被动，专业化是被看待的对象；as后为身份补足。"),
    as: w("prep.", "作为；被视为", "be seen as a response", "as后是名词response，补充Specialisation被视为什么，不是时间从句。", ["be seen as a response"]),
    to: w("prep.", "对于；针对", "a response to the problem", "to接problem名词，补足response的对象，不是不定式。", ["a response to the problem"]),
    of: w("prep.", "……的；内容为……", "the problem of an accumulation of knowledge", "第一个of解释problem的内容，第二个of说明积累的是knowledge；均不是数量词加of结构。"),
  },
  "2001-p1-s2": {
    by: w("prep.", "通过", "by doing", "By接splitting动名词表示方式，执行者为主句one man；不是被动句施事。", ["by splitting up the subject matter"]),
    one: w("number/det.", "一个；单个", "one man", "one限定man，强调单个研究者；不是替代前述同类事物的代词。", ["one man"]),
    to: w("不定式标记", "引出继续做的动作", "continue to handle ... and use ...", "handle与use共用to，是continue的并列不定式补足语，不各自承担时态。", ["continue to handle the information"]),
    as: w("prep.", "作为", "use it as the basis", "as名词组作it的宾语补足，说明信息被用作研究基础。", ["use it as the basis for further research"]),
    research: w("n.（不可数）", "研究", "the basis for further research", "research在for后作名词，further说明进一步研究；并不是本句的动作谓语。", ["use it as the basis for further research"]),
    it: w("pron.", "它（这些信息）", "use it as the basis", "it回指the information，不能接回one man。"),
  },
  "2001-p1-s3": {
    be: w("v.（系动词过去时）", "是", "specialisation was one of ...", "was接名词性表语one，说明专业化在系列发展中的地位；不是被动。"),
    only: w("adv.", "仅仅", "only one of a series", "only限制数量one，表示只是其中之一；本句没有if条件从句。", ["one of a series of related developments"]),
    one: w("pron.（数量代词）", "一项；其中之一", "one of a series of related developments", "one作表语中心，of引出所属系列，指其中一项发展。", ["one of a series of related developments"]),
    of: w("prep.", "……中的；……的", "one of a series / the process of communication", "首处of引出系列范围，末处of解释process涉及的交流活动；按各自中心词附着。"),
  },
  "2001-p1-s4": {
    another: w("pron.", "另一项（发展）", "Another was professionalisation", "Another回指related developments中的另一项；此处不是another person。", ["the growing professionalisation of scientific activity"]),
    be: w("v.（系动词过去时）", "是", "Another was professionalisation", "was把另一项发展与职业化相联系；growing为名词前的修饰语，不与was组成进行时。"),
    of: w("prep.", "……的；以……为对象", "professionalisation of scientific activity", "of引出走向职业化的活动，不是数量范围。"),
  },
  "2001-p1-s5": {
    draw: w("v.（过去分词）", "作出；划出", "draw a distinction between A and B", "draw在被动can be drawn中与distinction搭配，是划分界线，不是画图或得出结论。", ["draw a clear-cut distinction"]),
    be: w("aux.（被动助动词）", "构成被动", "can be drawn / can be found", "两个独立分句各有情态被动，分别说界线可被划出、例外可被找到。"),
    to: w("prep.", "对于；相对于", "exceptions to any rule", "to补足exceptions，表示针对规则的例外，不引出动作。", ["exceptions to any rule"]),
  },
  "2001-p1-s6": {
    do: w("aux.（强调助动词）", "确实（强调）", "does carry", "does用于肯定句强调，后面carry用原形；不是第三人称carries叠加。", ["does carry a connotation"]),
    that: w("conj.（内容从句连接词）", "引出隐含义的内容", "a connotation that + clause", "that解释connotation，内部主语是the person concerned；that不作关系代词替代connotation。"),
    concern: w("adj./过去分词（后置）", "所涉及的；所说的", "the person concerned", "concerned后置限定person，表示相关者，不能读作担忧的。", ["the person concerned"]),
    share: w("v.", "认同；共同持有", "share its values", "share直接接values，表示持有相同价值观；may not fully限制可能性和程度。", ["share its values"]),
    value: w("n.（复数）", "价值观", "the scientific community's values", "values是share的宾语，不是动词重视或数值；its指scientific community。", ["share its values"]),
    may: w("modal v.", "可能", "may not fully share", "这里may表可能性，不是授予许可；not fully表示未完全认同。"),
    its: w("det.（物主限定词）", "它的（科学共同体的）", "its values", "its回指scientific community，不能理解为相关人员自己的价值观。"),
  },
  "2001-p1-s7": {
    with: w("prep.", "伴随着", "with its consequent requirement", "with后仅为名词短语，补充随专业化产生的训练要求；没有宾语加分词的with复合结构。", ["with its consequent requirement"]),
    more: w("adv.（比较级）", "更", "more complex training", "more修饰形容词complex，表示训练更复杂；不是更多训练数量，也不是the more...the more...。", ["a longer, more complex training"]),
    of: w("prep.", "……的；内容为……", "growth of specialisation / requirement of training", "两处of分别补足growth与requirement，说明何种发展、何种要求；不是数量词结构。"),
  },
  "2001-p1-s8": {
    be: w("v./aux.（系动词及被动助动词）", "是；构成被动", "was obvious / can be illustrated", "同句was接obvious作系动词，be接illustrated构成情态被动；不能把两处一概当系表。"),
    base: w("v.（过去分词，后置定语）", "以……为基础", "areas based on training", "based后置限定areas of science，没有独立时态；on引出数学或实验室训练。", ["based especially on a mathematical or laboratory training"]),
    of: w("prep.", "……的；从……方面", "areas of science / in terms of the development of geology", "areas of限定科学领域；in terms of是整体例证表达；development of再补足地质学发展。"),
  },
  "2001-p1-s9": {
    of: w("prep.", "……的；关于", "comparison of publications / definition of what ...", "of分别补足comparison、primacy及definition；最后of接what名词性从句，不是数量限定。"),
    what: w("pron.（融合型关系代词）", "什么；……的内容", "what constitutes an acceptable research paper", "what自身作constitutes主语；整个从句作of的宾语。paper直接作constitutes的宾语，不是宾补。", ["what constitutes an acceptable research paper"]),
    constitute: w("v.（第三人称单数）", "构成；算作", "what constitutes an acceptable research paper", "constitutes是及物谓语，what为主语，paper为宾语；句子没有第二个对象可供paper补足。", ["what constitutes an acceptable research paper"]),
    research: w("n.（不可数；亦作名词定语）", "研究", "primacy of research / research paper", "第一处research在of后，第二处修饰paper；原文没有original，不应补成原创性才是研究。", ["what constitutes an acceptable research paper"]),
  },
  "2001-p1-s10": {
    study: w("n.（复数）", "研究；研究工作", "local geological studies", "studies作两分句主语，均为名词；不是动词学习或研究。", ["local geological studies"]),
    right: w("n.（固定表达中）", "自身资格；自身条件", "in their own right", "整组表示凭自身即可成立；right不是形容词正确的，也不是政治权利。", ["in their own right"]),
    have: w("aux.（完成时）", "构成现在完成时", "have increasingly become acceptable", "have接过去分词become，increasingly插入说明逐渐，不是have加名词的拥有义。"),
    to: w("prep.", "对……而言", "acceptable to professionals", "to接专业人士，补足acceptable，说明被谁认可；不是不定式。", ["acceptable to professionals"]),
    only: w("adv.", "只有", "only if + clause", "only限制if条件；认可必须满足纳入全局的条件，但不保证满足后其他要求自动满足。", ["only if"]),
    reflect: w("v.", "思考；评述", "reflect on the wider geological picture", "reflect on在此是思考、反思全局；on后对象与incorporate共享，不能删介词。", ["reflect on the wider geological picture"]),
    they: w("pron.", "它们（地方研究）", "they incorporate and reflect on", "they承接local studies，而非更靠近的professionals。"),
  },
  "2001-p1-s11": {
    have: w("aux.（完成时）", "构成现在完成时", "have continued to pursue", "have接continued过去分词，突出旧方式延续至叙述时，不是拥有。"),
    to: w("不定式标记", "引出继续从事的行为", "continue to pursue local studies", "to pursue补足continued，执行者为Amateurs；不是目的状语。", ["continue to pursue local studies"]),
    study: w("n.（复数）", "研究；研究工作", "pursue local studies", "studies是pursue的名词宾语；pursue是从事，不是追赶研究。", ["continue to pursue local studies"]),
  },
  "2001-p1-s12": {
    have: w("aux.（完成时）", "构成现在完成时", "has been to make / has been reinforced", "前处has been是完成时系动词，后处has been reinforced为完成时被动；两处均非拥有义。"),
    be: w("v./aux.（系动词及被动助动词）", "是；构成被动", "result has been to make / result has been reinforced", "首个been接不定式表语说明结果；第二个been接reinforced构成被动。"),
    to: w("不定式标记／prep.", "引出结果内容；通向", "to make entrance to professional journals harder", "to make引出表语不定式，entrance to中的to为介词，接进入对象journals。"),
    by: w("prep.", "由；通过", "reinforced by introduction / introduction by journals", "首处by引出强化因素审稿制度引入，后两处by补充由哪些期刊先后引入；附着层级不同。"),
    professional: w("adj.", "专业的；面向专业者的", "professional geological journals", "professional修饰journals，不是独立名词专业人士。", ["make entrance to professional geological journals harder for amateurs"]),
    hard: w("adj.（比较级）", "更困难的", "make entrance harder", "harder对entrance作宾补，说明准入更难，不是修饰make的副词。", ["make entrance to professional geological journals harder for amateurs"]),
  },
  "2001-p1-s13": {
    as: w("prep.", "作为", "as a logical consequence of", "as后接名词consequence，整组作结果背景；不是as引导时间从句。", ["as a logical consequence of"]),
    have: w("aux.（完成时）", "构成现在完成时", "journals have now appeared", "have接appeared，appear是不及物动词，后面aimed为后置定语，不能拼成被动have appeared aimed。", ["separate journals have now appeared"]),
    professional: w("adj.", "专业的；专业人士的", "professional readership", "professional限定readership，与amateur平行划分两类读者群。", ["either professional or amateur readership"]),
    amateur: w("adj.（名词作定语）", "业余的；业余者的", "amateur readership", "amateur在readership前限定读者群，并非这一名词短语的中心。", ["either professional or amateur readership"]),
  },
  "2001-p1-s14": {
    have: w("aux.（完成时）", "构成现在完成时", "has led / have tended", "has led与have tended各自构成完成时，前者主语process为单数，后者amateurs为复数。"),
    to: w("prep.／不定式标记", "导致；引出倾向行为", "lead to somebody doing / tend to do", "lead to中的to为介词，接geologists coming；tended后的to remain、to come是不定式标记。", ["led to professional geologists coming together nationally"]),
    one: w("number", "一（个）", "one or two specific societies", "one与two并列限定societies数量，不是替代名词的one。", ["within one or two specific societies"]),
    professional: w("adj.", "专业的", "professional geologists", "修饰geologists；这些人是coming的逻辑主语，不是外层has led的主语。", ["led to professional geologists coming together nationally"]),
    whereas: w("conj.", "而；相比之下", "professionals ... whereas the amateurs ...", "whereas引出有完整主谓的对照从句，非疑问地点where；业余者有两种组织选择。"),
    of: w("prep.", "……的；内容为……", "a process of differentiation", "of补足process，说明分化过程，不是数量词加of。", ["process of differentiation"]),
  },
  "2001-p1-s15": {
    be: w("v./aux.（系动词及被动助动词）", "处于；构成被动", "was under way / were delayed", "was接under way表进展状态，were接delayed为被动；过程已展开与完整后果较晚显现分别对应。"),
    of: w("prep.", "……的；内容为……", "the process of professionalisation and specialisation", "of后两个并列名词补足process，不是划分数量。"),
    under: w("prep.（固定表达中）", "在……之中", "under way", "under way整体表示正在进行、已展开，不是道路下方。", ["well under way"]),
    way: w("n.（固定表达中）", "进展；进行状态", "well under way", "way与under组成在进行中，well加强进展程度，不能逐字译成一条很好的路。", ["well under way"]),
    its: w("det.（物主限定词）", "它的（这一过程的）", "its full consequences", "its回指专业化与职业化过程，不是British geology这个学科的所有后果。"),
  },
  "2001-p1-s16": {
    must: w("modal v.", "必须；应当（评价）", "must be reckoned as", "must强调历史判断的必要性，不是对人的法律义务或工作规定。", ["be reckoned as"]),
    be: w("aux.（被动助动词）", "构成被动", "must be reckoned as", "被评价者为the nineteenth century，be接reckoned构成情态被动。"),
    as: w("prep.", "作为；被视为", "be reckoned as the crucial period", "as名词组补充这一世纪的地位，不是同时发生的as时间从句。", ["be reckoned as"]),
    of: w("prep.", "……的", "the structure of science", "of限定结构属于科学领域，不是数量范围。"),
  },
  "question-200121-prompt": {
    more: w("adv.（比较级）", "更", "more clearly seen", "more修饰副词clearly，比较观察趋势的清晰程度，不是数量，也不含越……越……句型。", ["more clearly seen"]),
    be: w("aux.（被动助动词）", "构成被动", "might be seen", "might后be seen为被动，growth是被观察的对象。"),
    as: w("prep.（举例表达中）", "例如", "such as + sciences", "as与such组成举例表达，后接学科名称，不是作为某身份。", ["such as"]),
    of: w("prep.", "……的", "the growth of specialisation", "of引出发展内容specialisation（专业化），不是数量词结构。", ["the growth of specialisation"]),
  },
  "question-200122-prompt": {
    that: w("conj.（内容连接词）", "引出推断内容", "infer that + clause", "that后空白由选项提供完整命题；不是形容词后的that内容从句或指示词。"),
    from: w("prep.", "根据；从……中", "infer from the passage", "from给推断证据来源，不能以生活常识代替原文。", ["infer from the passage"]),
  },
  "question-200122-option-A": {
    there: w("存在句引导词", "引出存在情况", "there is little distinction", "there没有地点所指，little distinction为存在主体，并非指某个地点。", ["little distinction"]),
    be: w("v.（存在句）", "存在；有", "there is little distinction", "is与单数distinction一致，不接形容词表语或过去分词被动。"),
    little: w("det.", "几乎没有；很少", "little distinction", "little无a，否定倾向为差别很小，不是a little的有一些。", ["little distinction"]),
  },
  "question-200122-option-B": {
    with: w("prep.", "与……（竞争）", "compete with professionals", "with接竞争对手，说明竞争对手，不是伴随结构。", ["compete with professionals"]),
    can: w("modal v.", "能；有可能", "can compete in some areas", "can加some把命题限定为部分领域有竞争可能，不表示必定取胜。"),
    of: w("prep.", "……的", "some areas of science", "of引出科学领域，some限制部分而非全体。", ["in some areas of science"]),
  },
  "question-200122-option-C": {
    to: w("不定式标记", "引出倾向行为", "tend to welcome", "to接welcome原形，补足tend，不是欢迎动作的目的状语。", ["tend to welcome"]),
    welcome: w("v.", "欢迎；接纳", "welcome somebody into the community", "welcome后amateurs为宾语，into引出接纳进入的群体，不是形容词受欢迎的。", ["welcome amateurs into the scientific community"]),
  },
  "question-200122-option-D": {
    have: w("v.（实义动词）", "有；拥有", "have societies but no local ones", "have接名词societies，是拥有义，没有过去分词，不能教成完成时。", ["national academic societies"]),
    one: w("pron.（复数替代词）", "那些同类事物（地方学会）", "no local ones", "ones替代societies；no否定地方学会，这里不是数量词one。", ["no local ones"]),
    no: w("det.", "没有；无", "no local ones", "no限定local ones，提出没有地方学会的绝对否定。", ["no local ones"]),
  },
  "question-200123-prompt": {
    write: w("v.（第三人称单数）", "写到；论述", "write of something", "writes of接论述内容development，不是写给某个收件人。", ["writes of"]),
    of: w("prep.", "关于；……的", "writes of the development of geology", "第一处of引出写作对象，第二处of说明地质学的发展；不属于数量词of。", ["writes of"]),
    to: w("不定式标记", "为了", "to demonstrate", "to demonstrate作writes的目的状语，询问案例的论证用意。", ["to demonstrate"]),
  },
  "question-200123-option-A": { of: w("prep.", "……的；内容为……", "the process of specialisation and professionalisation", "of后并列两种相关发展，共同说明过程内容；不能把and理解为两个同义词。", ["the process of specialisation and professionalisation"]) },
  "question-200123-option-B": {
    of: w("prep.", "……的（经历者）", "the hardship of amateurs", "of引出经历困难的业余者，不是困难的施加者。", ["the hardship of amateurs"]),
    study: w("n.", "研究", "in scientific study", "study在in后作名词，scientific修饰它；在介词宾语位置不作谓语。", ["in scientific study"]),
  },
  "question-200123-option-C": { of: w("prep.", "……的；涉及……", "the change of policies", "of接发生变化的政策，in scientific publications再限定政策所属领域。", ["the change of policies"]) },
  "question-200123-option-D": {
    of: w("prep.", "由……所作的", "discrimination of professionals against amateurs", "of引出歧视行为的施事professionals，against另引出被针对者amateurs，不能颠倒。", ["discrimination of professionals against amateurs"]),
    against: w("prep.", "针对；不利于", "discrimination against amateurs", "against接被歧视对象，说明行为针对谁，双方角色不能颠倒。", ["discrimination of professionals against amateurs"]),
  },
  "question-200124-prompt": {
    for: w("prep.", "关于；导致……的", "the direct reason for specialisation", "for补足reason，说明为何产生专业化，不表示持续时长或供某人使用。", ["direct reason for specialisation"]),
    be: w("v.（系动词）", "是", "The direct reason is ...", "is连接reason与待选原因表语，不构成被动。"),
  },
  "question-200124-option-A": { in: w("prep.", "在……方面", "the development in communication", "in限定发展发生在交流领域，不表示交流是专业化的直接原因。", ["the development in communication"]) },
  "question-200124-option-B": { of: w("prep.", "……的", "the growth of professionalisation", "of说明增长的是职业化，与specialisation概念不同。", ["the growth of professionalisation"]) },
  "question-200124-option-C": { of: w("prep.", "……的", "the expansion of scientific knowledge", "of说明增长对象是科学知识，保留首句accumulation的对象。", ["the expansion of scientific knowledge"]) },
  "question-200124-option-D": { of: w("prep.", "……的（被拆分对象）", "the splitting up of academic societies", "of接拆分的对象学术团体；原文By splitting up的对象是研究内容，不能混同。", ["the splitting up of academic societies"]) },
};
export const passage2001P1SourceContexts = Object.fromEntries(Object.entries(sources).map(([id, entries]) => [id, Object.fromEntries(Object.entries(entries).map(([word, entry]) => [word, entry.context]))]));
export function getPassage2001P1SourceKnowledge(headword: string, sourceId?: string): WordKnowledge | undefined { return sourceId ? sources[sourceId]?.[headword]?.knowledge : undefined; }
