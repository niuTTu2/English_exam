import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { translation2000Practice } from "./2000-translation-practice";

const component = (text: string, form: string, functionName: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: functionName, modifies, explanation, children });
type TranslationReview = { components: BeginnerSyntaxComponent[]; colors: SyntaxVisualRole[]; clauses: BeginnerClauseDetail[]; reading: SentenceReadingGuide; translations: string[]; notes: string[] };

const reviews: Record<number, TranslationReview> = {
  31: {
    components: [
      component("Under modern conditions", "介词短语", "条件状语", "requires所述需求", "先限定现代条件这个背景，不是具体空间位置。"),
      component("this", "指示代词", "主语", "requires", "承接未划线前文：政府以人民福祉依赖经济实力与财富为行动前提；不能从本句孤立猜成某个科学家。"),
      component("requires", "一般现在时动词", "谓语", "主语this", "一个requires同时支配后面的两项需求。"),
      component("varying measures of centralized control", "名词短语", "第一并列宾语", "requires", "中心是measures，varying说明程度不一，of说明控制的性质。", [
        component("varying", "现在分词作定语", "前置定语", "measures", "表示程度不一，不是本句的有限谓语。"),
        component("measures", "复数名词", "宾语中心", "requires", "在控制语境中指不同程度的措施，不是长度单位。"),
        component("of centralized control", "介词短语", "后置定语", "measures", "说明这些措施涉及集中控制。"),
      ]),
      component("and hence", "连词与结果副词", "并列与结果连接", "requires的两个宾语", "and连接两项需求，hence说明第二项由第一项引出；后面不另起独立谓语。"),
      component("the help of specialized scientists such as economists and operational research experts", "名词短语", "第二并列宾语", "requires", "中心是help；专家举例归属于scientists，不归属于control。", [
        component("the help", "名词短语", "宾语中心", "requires", "需要的第二项是帮助，scientists不是另一主语。"),
        component("of specialized scientists such as economists and operational research experts", "介词短语", "后置定语", "help", "交代谁提供帮助，并举出专业人员类别。", [
          component("specialized scientists", "名词短语", "介词宾语", "of", "指从事专门领域的科学家。"),
          component("such as economists and operational research experts", "举例短语", "举例说明", "specialized scientists", "economists和operational research experts都是scientists的具体类别。"),
        ]),
      ]),
    ],
    colors: ["modifier", "subject", "predicate", "object", "connector", "object"],
    clauses: [],
    reading: { focus: "一个requires带两项需求：集中控制，以及由此需要的专家帮助。", questions: [
      { question: "and hence后面是不是另一个完整句子？", evidence: "and hence the help of specialized scientists", answer: "不是。help是名词中心，和前面的measures同作requires的宾语；hence额外说明两项需求间的因果递进。" },
      { question: "such as列举的是谁？", evidence: "specialized scientists such as economists and operational research experts", answer: "列举专业科学家的类别，不是在给集中控制措施分类。中文可把举例前移为‘经济学家、运筹学专家等专业人员’。" },
    ] },
    translations: ["在现代条件下，", "这", "需要", "不同程度的集中控制措施", "因而也需要", "经济学家、运筹学专家等专业科学家的帮助。"],
    notes: ["中文在第二宾语前补出‘需要’，对应英语两项宾语共用的requires，不是新增另一项要求。", "this的前文依据为原卷第6页未划线首句；本模块仍只收录原卷指定的五个待译片段。"],
  },
  32: {
    components: [
      component("Furthermore", "连接副词", "递进衔接", "整个句子", "在前句基础上继续说明经济与科技的联系。"),
      component("it", "形式代词", "形式主语", "is obvious", "it先占主语位置，真正内容是后面两个并列that从句。"),
      component("is", "系动词", "谓语", "it", "把形式主语与形容词obvious连接。"),
      component("obvious", "形容词", "表语", "it所代表的两项判断", "意思是显而易见；它不是一个带宾语的动词。"),
      component("that the strength of a country’s economy is directly bound up with the efficiency of its agriculture and industry", "that引导的内容从句", "第一主语从句", "形式主语it", "真正主语的第一项：经济实力与产业效率相关。", [
        component("that", "从属连词", "主语从句引导词", "第一项判断", "只连接，不在从句中作主语或宾语。"),
        component("the strength of a country’s economy", "名词短语", "从句主语", "is bound up", "中心是strength，of说明哪一种实力。"),
        component("is directly bound up", "系动词与过去分词表达", "从句谓语部分", "the strength", "bound up表示紧密联系的状态，directly说明这种联系的直接性。"),
        component("with the efficiency of its agriculture and industry", "介词短语", "联系对象补足语", "bound up", "with引出联系另一端；its指该国家，agriculture和industry共同受efficiency限定。"),
      ]),
      component("and", "并列连词", "并列连接", "两个that主语从句", "连接同层级判断，不把第二个that从句放入第一个从句。"),
      component("that this in turn rests upon the efforts of scientists and technologists of all kinds", "that引导的内容从句", "第二主语从句", "形式主语it", "真正主语的第二项：上述效率又依赖科技人员的努力。", [
        component("that", "从属连词", "主语从句引导词", "第二项判断", "与前一个that保持并列。"),
        component("this", "指示代词", "从句主语", "rests upon", "回指前一分句中的农业和工业效率，不是形式主语it。"),
        component("in turn", "介词短语作状语", "递进状语", "rests upon", "表示依赖关系向下一环推进，不是轮流休息。"),
        component("rests", "一般现在时动词", "从句谓语", "this", "与upon构成依靠、取决于的抽象表达。"),
        component("upon the efforts of scientists and technologists of all kinds", "介词短语", "依赖对象补足语", "rests", "依靠的中心对象是efforts；of all kinds限定科技人员的类别。"),
      ]),
    ],
    colors: ["connector", "subject", "predicate", "complement", "subject", "connector", "subject"],
    clauses: [
      { text: "that the strength of a country’s economy is directly bound up with the efficiency of its agriculture and industry", type: "主语从句", marker: "that", role: "与后一个that从句共同充当真正主语，it为形式主语", subject: "the strength of a country’s economy", predicate: "is directly bound up", predicateDetails: [{ function: "联系对象补足语", text: "with the efficiency of its agriculture and industry" }], translationOrder: "先用‘显而易见’统领，再译经济实力与农业工业效率直接相关。" },
      { text: "that this in turn rests upon the efforts of scientists and technologists of all kinds", type: "主语从句", marker: "that", role: "与第一个that从句并列，不是其中的宾语", subject: "this", predicate: "rests", predicateDetails: [{ function: "依赖对象补足语", text: "upon the efforts of scientists and technologists of all kinds" }], translationOrder: "将this还原为前述效率，再译‘而这种效率又依赖各类科技人员的努力’。" },
    ],
    reading: { focus: "it是形式主语，两个that内容并列；this才有实际回指。", questions: [
      { question: "两个that是什么关系？", evidence: "and that this in turn rests upon the efforts of scientists and technologists of all kinds", answer: "and连接两个同层级的主语从句，二者共同说明什么显而易见；第二个并不作第一个从句的宾语。" },
      { question: "it和this能译成同一个‘它’吗？", evidence: "that this in turn rests upon", answer: "不能。it只占主句主语位置；this承接前面的农业和工业效率。中文宜明确译成‘而这种效率又取决于……’。" },
    ] },
    translations: ["此外，", "（形式主语，无独立实义）", "是", "显而易见的：", "一个国家的经济实力与其农业和工业效率直接相关，", "而且", "这种效率又依赖各类科学家和技术人员的努力。"],
    notes: ["通顺译文将形式主语结构合译为‘显而易见’，无需直译it；把this明确为‘这种效率’是指代还原。", "in turn表示链条递进；本句不是证明经济实力与科技人员之间双向循环的充分因果关系。"],
  },
  33: {
    components: [
      component("Owing to the remarkable development in mass-communications", "介词短语", "原因状语", "人们产生需求和接触观念的变化", "Owing to接名词development，不能按限定动词理解owing。", [
        component("the remarkable development", "名词短语", "介词宾语", "Owing to", "中心development表示显著发展。"),
        component("in mass-communications", "介词短语", "后置定语", "development", "限定大众传播领域，而不是人口迁移。"),
      ]),
      component("people everywhere", "名词与地点副词", "主语", "are feeling和are being exposed", "everywhere限定各地的人；后面的两个进行时结构共享主语。"),
      component("are feeling", "现在进行时", "第一并列谓语", "people", "feel为主动感受到，后面new wants才是宾语。"),
      component("new wants", "名词短语", "宾语", "are feeling", "wants为复数名词需求，不是want的谓语形式。"),
      component("and", "并列连词", "并列连接", "两个谓语部分", "同一群人既产生新需求，又接触新事物。"),
      component("are being exposed", "现在进行时被动", "第二并列谓语", "people", "are + being + exposed一起表达正在被置于接触新事物的环境，不是人主动暴露观念。"),
      component("to new customs and ideas", "介词短语", "接触对象补足语", "exposed", "to后接并列名词customs和ideas，不是to do不定式。"),
      component("while governments are often forced to introduce still further innovations for the reasons given above", "while引导的从句", "对照状语从句", "人们与政府的两方面变化", "while引出政府方面的应对，不必译成一个严格同时段。", [
        component("while", "从属连词", "对照引导词", "governments分句", "相当于‘而’或‘与此同时’，对照两个主体。"),
        component("governments", "复数名词", "从句主语", "are forced", "政府是被迫作出改革的主体。"),
        component("are often forced", "一般现在时被动与频率副词", "从句谓语", "governments", "often不是进行时标记，are forced与主句are being exposed不同。"),
        component("to introduce still further innovations", "不定式短语", "主语补足语", "governments are forced", "说明政府被迫做什么；innovations作introduce宾语。"),
        component("for the reasons given above", "介词短语", "原因状语", "are forced to introduce", "given above为过去分词后置限定reasons，above回指原文前文，不是‘在上空给出’。"),
      ]),
    ],
    colors: ["modifier", "subject", "predicate", "object", "connector", "predicate", "complement", "modifier"],
    clauses: [{ text: "while governments are often forced to introduce still further innovations for the reasons given above", type: "对照状语从句", marker: "while", role: "对照人们的新需求与政府继续改革", subject: "governments", predicate: "are often forced", predicateDetails: [{ function: "主语补足语", text: "to introduce still further innovations" }], translationOrder: "先译公众方面的两项变化，再用‘而政府’转到改革的必要性。" }],
    reading: { focus: "同一主语后既有主动进行时，又有被动进行时；while再换到政府。", questions: [
      { question: "are feeling和are being exposed为什么不能都译为主动？", evidence: "are feeling new wants and are being exposed to new customs and ideas", answer: "前者直接接宾语new wants；后者有being加过去分词exposed，是进行时被动。自然中文可译‘不断产生新需求，也不断接触新的习俗和观念’。" },
      { question: "to new customs和to introduce的to一样吗？", evidence: "to new customs and ideas, while governments are often forced to introduce", answer: "前者后接名词，是exposed的介词补足；后者后接动词原形，是说明政府被迫做什么的不定式。" },
    ] },
    translations: ["由于大众传播的显著发展，", "各地的人们", "正在感受到", "新的需求，", "并且", "正不断接触到", "新的习俗和观念，", "而政府出于上述原因，常常被迫推行更进一步的革新。"],
    notes: ["被动结构在自然中文中可译为‘接触到’，但句法仍保留being exposed的被动关系。", "for the reasons given above指原卷前文列出的政府干预原因，不把原因只缩成当前这一句话。"],
  },
  34: {
    components: [
      component("in the early industrialized countries of Europe", "介词短语", "地点与历史范围状语", "was spread", "early修饰industrialized：指较早实现工业化的欧洲国家，而非‘欧洲早期的所有国家’。"),
      component("the process of industrialization", "名词短语", "主语", "was spread", "中心process被插入语与谓语隔开，读完破折号后要接回was spread。"),
      component("with all the far-reaching changes in social patterns that followed", "with介词短语", "插入伴随说明", "the process of industrialization", "两道破折号围住工业化带来的社会变化；with后仍是名词短语。", [
        component("all the far-reaching changes in social patterns that followed", "名词短语", "介词宾语", "with", "中心是changes，后面的从句说明随工业化而来的变化。", [
          component("all the far-reaching changes", "名词短语", "中心名词及限定", "with的宾语", "far-reaching意为影响深远，不是空间距离。"),
          component("in social patterns", "介词短语", "后置定语", "changes", "限定变化发生在社会模式方面。"),
          component("that followed", "限制性定语从句", "后置定语", "changes", "that作followed主语，指随工业化而来的变化；followed不带明示宾语。"),
        ]),
      ]),
      component("was spread", "一般过去时被动", "谓语", "the process", "这里表达过程在时间上展开，不能译成被传播到很多国家。"),
      component("over nearly a century", "介词短语", "持续时间状语", "was spread", "nearly表示接近但不到一个世纪，over在此不是‘多于’。"),
      component("whereas nowadays a developing nation may undergo the same process in a decade or so", "whereas引导的从句", "对比状语从句", "早期欧洲工业化的时长", "以如今约十年的可能过程，对照早期欧洲近百年的过程。", [
        component("whereas", "从属连词", "对比引导词", "两种工业化历程", "专门引出差异，不表示地点。"),
        component("nowadays", "时间副词", "时间状语", "may undergo", "时间参照属于作者所说的当时，不擅自改成2026年的事实。"),
        component("a developing nation", "名词短语", "从句主语", "may undergo", "发展中国家与前文欧洲较早工业化国家对照。"),
        component("may undergo", "情态动词与动词原形", "从句谓语", "a developing nation", "may保留可能性，不承诺所有国家都能实现。"),
        component("the same process", "名词短语", "宾语", "undergo", "same process回指industrialization这个过程。"),
        component("in a decade or so", "介词短语", "时间跨度状语", "may undergo", "decade是十年，or so表示大约，不是十年以后才开始。"),
      ]),
    ],
    colors: ["modifier", "subject", "modifier", "predicate", "modifier", "modifier"],
    clauses: [
      { text: "that followed", type: "限制性定语从句", marker: "that", role: "限定changes，指随工业化而来的变化", subject: "that", predicate: "followed", predicateDetails: [], translationOrder: "译成‘随之而来的’，放在‘社会模式的深刻变化’之前。" },
      { text: "whereas nowadays a developing nation may undergo the same process in a decade or so", type: "对比状语从句", marker: "whereas", role: "对照两个历史背景下的工业化时长", subject: "a developing nation", predicate: "may undergo", predicateDetails: [{ function: "宾语", text: "the same process" }], translationOrder: "前半译近一个世纪，后半用‘而如今’引出可能只需十年左右。" },
    ],
    reading: { focus: "先跨过破折号找process—was spread，再比较近百年与约十年。", questions: [
      { question: "with插入语是否改变主句主语？", evidence: "the process of industrialization—with all the far-reaching changes in social patterns that followed—was spread", answer: "不改变。主语中心始终是process；复数changes只是with短语内部名词，后面的was与process对应。" },
      { question: "a decade or so是否表示十年后？", evidence: "may undergo the same process in a decade or so", answer: "不是。这里是经历同一过程所需的时间跨度，约十年；may表示可能，不能译成必然十年完成。" },
    ] },
    translations: ["在欧洲较早实现工业化的国家，", "工业化进程", "连同随之而来的社会模式的深刻变化", "在时间上展开，", "历时近一个世纪，", "而如今一个发展中国家可能在十年左右经历同样的过程。"],
    notes: ["原卷划线范围从小写in开始，前面的For example不属于本题待译原文，保持既有片段边界；自然译文的‘例如’来自这一未划线前文，属于有来源的补译。", "‘只需’是根据近百年与约十年的对比补出的语气，并非原句的独立英文词；正式译文仍保留may的可能性。"],
  },
  35: {
    components: [
      component("Additional social stresses", "名词短语", "主语", "may occur", "中心stresses指社会压力，additional承接前文已有的紧张与压力。"),
      component("may also occur", "情态谓语与副词", "谓语", "social stresses", "may表示可能，also表示在既有问题之外还会发生。"),
      component("because of the population explosion or problems arising from mass migration movements", "介词短语", "原因状语", "may also occur", "because of同时统领两项原因：人口爆炸，或迁移带来的问题。", [
        component("the population explosion", "名词短语", "第一并列介词宾语", "because of", "人口爆炸为第一项原因，并非迁移的必然结果。"),
        component("or", "并列连词", "备选原因连接", "population explosion与problems", "连接原因名词，不引出新的有限分句。"),
        component("problems arising from mass migration movements", "名词短语", "第二并列介词宾语", "because of", "第二项是迁移引发的问题，不是迁移本身必定构成社会压力。", [
          component("problems", "复数名词", "中心名词", "because of的第二宾语", "后面的现在分词说明问题来自哪里。"),
          component("arising from mass migration movements", "现在分词短语", "后置定语", "problems", "arising的逻辑主语是problems；mass migration movements是from后的来源。"),
        ]),
      ]),
      component("themselves made relatively easy nowadays by modern means of transport", "代词与过去分词独立结构", "补充说明", "mass migration movements", "themselves回指大规模迁移，而非社会压力或问题；made是非限定过去分词。", [
        component("themselves", "反身代词", "独立结构逻辑主语", "made", "这里强调这些迁移本身，不把它接到主句stresses。"),
        component("made", "过去分词", "非谓语被动关系", "themselves", "表达迁移被交通手段变得容易；原文没有are，不能假造一个完整被动分句。"),
        component("relatively easy", "副词与形容词", "结果补足语", "made的逻辑主语themselves", "relatively修饰easy，表示相对容易而非完全没有困难。"),
        component("nowadays", "时间副词", "时间状语", "made relatively easy", "限定迁移变得容易的时代背景。"),
        component("by modern means of transport", "介词短语", "施事与手段状语", "made", "现代交通手段使迁移容易；means是名词手段，单复数同形。"),
      ]),
    ],
    colors: ["subject", "predicate", "modifier", "modifier"],
    clauses: [],
    reading: { focus: "两层非谓语分清主语：问题arise，迁移被made easy。", questions: [
      { question: "arising修饰problems还是movements？", evidence: "problems arising from mass migration movements", answer: "修饰problems，意思是源于大规模迁移的问题。from后面的movements是问题来源，不是arising的逻辑主语。" },
      { question: "themselves具体回指谁？", evidence: "mass migration movements—themselves made relatively easy nowadays by modern means of transport", answer: "回指migration movements，交通使迁移容易；不是让社会压力变得容易。made没有有限助动词，属于独立的分词补充结构，不计为新从句。" },
    ] },
    translations: ["额外的社会压力", "还可能出现，", "原因是人口爆炸，或大规模人口迁移所带来的问题，", "而这些迁移本身如今因现代交通手段而相对容易。"],
    notes: ["中文用‘而这些迁移本身……’展开破折号后的非谓语说明，是语序调整，不在英文原句中补写are。", "because of后两项原因保持or的并列选择关系，不能擅自改成人口爆炸必然导致迁移的因果链。"],
  },
};

export function reviewTranslation2000(sentence: SentenceAnalysis): SentenceAnalysis {
  const review = reviews[sentence.number];
  const result = withReviewedSyntax({ ...sentence, beginnerSyntax: { components: review.components, clauses: review.clauses, reading: review.reading }, practice: translation2000Practice[sentence.number] }, review.colors);
  return { ...result, translationAlignment: result.chunks.map((chunk, index) => ({ english: chunk.text, chinese: review.translations[index] })), translationNotes: review.notes };
}
