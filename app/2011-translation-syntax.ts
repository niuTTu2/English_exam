import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { translation2011Practice } from "./2011-translation-practice";

const component = (text: string, form: string, grammarFunction: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: grammarFunction, modifies, explanation, children });
const clause = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, predicateDetails: NonNullable<BeginnerClauseDetail["predicateDetails"]>, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails, translationOrder });
const detail = (grammarFunction: string, text: string) => ({ function: grammarFunction, text });
const question = (question: string, evidence: string, answer: string) => ({ question, evidence, answer });
type Reviewed = { components: BeginnerSyntaxComponent[]; colors: SyntaxVisualRole[]; translations: string[]; clauses: BeginnerClauseDetail[]; reading: SentenceReadingGuide; notes: string[] };

const comparison = "as the world's airlines do";
const emissionQuantity = "about the same volume of greenhouse gases as the world's airlines do";
const thoughtContent = `that, globally, the IT industry produces ${emissionQuantity} – roughly 2 percent of all CO2 emissions`;
const attempts = 'how many attempts are needed to get the "right" answer';
const coolingResult = "which uses even more energy";

const reviewed: Record<number, Reviewed> = {
  1: {
    components: [
      component("Who", "疑问代词", "主语", "would have thought", "询问的是设想者；全句是表示出乎意料的反问，不要求回答人名。"),
      component("would have thought", "情态动词＋完成式", "谓语", "Who", "would have后接thought，回顾本来未曾预料的事实；不是三个独立动作。"),
      component(thoughtContent, "that引导的内容从句", "宾语从句", "thought", "从that一直到emissions都是被设想的内容；破折号后的比例补充内部排放数量。", [
        component("that", "从属连词", "宾语从句引导词", "thought后的命题", "不在从句中作主语或宾语，也不指某个事物。"),
        component("globally", "副词", "范围状语", "行业排放量的比较", "把比较范围限定在全球，不只限定谷歌。"),
        component("the IT industry", "名词短语", "从句主语", "produces", "中心词industry为单数；IT是信息技术缩写，不是代词it。"),
        component("produces", "一般现在时动词", "从句谓语", "the IT industry", "表示行业产生排放，不能把其宾语也叫谓语。"),
        component(emissionQuantity, "带比较结构的数量名词短语", "宾语", "produces", "比较的是温室气体的排放量，about保留近似程度。", [
          component("about", "副词", "近似程度状语", "the same volume", "表示大致相等，而非精确相等。"),
          component("the same volume", "限定词＋形容词＋名词", "宾语中心部分", "produces", "volume在本句是数量；the same与后面的as配合。"),
          component("of greenhouse gases", "介词短语", "名词补足成分", "volume", "说明计量的是温室气体。"),
          component(comparison, "as引导的比较从句", "比较标准", "the same volume", "航空业是比较方，do避免重复排放动作。", [
            component("as", "比较连接词", "比较从句引导词", "the same volume", "与same搭配，不是原因或时间连接词。"),
            component("the world's airlines", "带所有格限定的名词短语", "从句主语", "do", "中心词airlines为复数，指全球各航空公司。"),
            component("do", "替代性助动词", "从句谓语", "the world's airlines", "替代前面的produce greenhouse gases，排放量由比较关系补足；原文不重复这些词。"),
          ]),
        ]),
        component("roughly 2 percent of all CO2 emissions", "约数比例名词短语", "数量补充说明", "前述行业排放数量", "约占全部二氧化碳排放的2%；不是两行业合计的比例。", [
          component("roughly", "副词", "约数状语", "2 percent", "保留约数，不把2%写成精确测量。"),
          component("2 percent", "数词＋比例名词", "比例中心", "排放量补充说明", "百分之二。"),
          component("of all CO2 emissions", "介词短语", "比例分母", "2 percent", "all限定排放总量，CO2化学式整体保留。"),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "object"],
    translations: ["谁", "会想到", "在全球范围内，信息技术业产生的温室气体量竟与全球航空业大致相同——约占二氧化碳总排放量的2%"],
    clauses: [
      clause(thoughtContent, "宾语从句", "that", "作thought的宾语，含比较与数量补充", "the IT industry", "produces", [detail("宾语", emissionQuantity)], "先译谁能想到，再译全球行业比较，最后补充约2%的比例。"),
      clause(comparison, "比较从句", "as，与same呼应", "给volume提供比较标准", "the world's airlines", "do", [], "把do理解为前述排放动作，译成与全球航空业大致相同，不译为做。"),
    ],
    reading: { focus: "先把反问与that内容分开，再辨认排放数量的比较和破折号补充。", questions: [
      question("Who是在问哪家企业吗？", "Who would have thought", "不是。Who作thought的主语，反问表达难以预料；真正的信息在that从句中。"),
      question("do替代什么，2%又以什么为分母？", "as the world's airlines do – roughly 2 percent of all CO2 emissions", "do替代航空业产生温室气体的动作；2%以全部CO2排放为分母。保留roughly，不把它误算成两个行业合计的比例。"),
    ] },
    notes: ["自然译文的‘竟’表达反问的意外语气，不对应额外英文词。原卷将温室气体比较与CO2比例并述，保持原叙述，不据此断言所有温室气体都是CO2。"],
  },
  2: {
    components: [
      component("Many everyday tasks", "名词短语", "主语", "take", "tasks是中心词，everyday为形容词日常的，不是every day每天。"),
      component("take", "一般现在时动词", "谓语", "Many everyday tasks", "与a toll on整体构成造成损害的习语。"),
      component("a surprising toll", "名词短语", "宾语", "take", "toll指损害或代价，surprising说明这种负担出人意料。", [
        component("surprising", "形容词", "前置定语", "toll", "是损害令人意外，不是环境自己感到吃惊。"),
      ]),
      component("on the environment", "介词短语", "受影响对象补足语", "take a toll", "指出受损的是环境，不表示在环境表面。"),
    ],
    colors: ["subject", "predicate", "object", "modifier"],
    translations: ["许多日常活动", "造成", "令人意外的损害", "其承受者是环境"],
    clauses: [],
    reading: { focus: "把take a toll on整体理解为造成损害，再确定受影响对象。", questions: [question("为什么toll不是通行费？", "take a surprising toll on the environment", "受影响对象是自然环境，take a toll on在这里说的是损害；surprising形容损害令人意外。后文用搜索排放解释这种负担。") ] },
    notes: ["词块中的‘其承受者’用于显示on的关系；完整中文采用‘给环境造成损害’，不逐字译成‘拿取通行费’。"],
  },
  3: {
    components: [
      component("A Google search", "名词短语", "主语", "can leak", "search在这里为一次搜索行为的名词，不是动词。"),
      component("can leak", "情态动词＋动词原形", "谓语", "A Google search", "can保留可能性，leak借指搜索带来的排放。"),
      component("between 0.2 and 7.0 grams of CO2", "范围数量名词短语", "宾语", "leak", "between...and...限定gram数量，单位为克。", [
        component("between 0.2 and 7.0", "两端范围结构", "数量范围限定", "grams", "上下限为0.2与7.0，不能丢掉小数或换成千克。"),
        component("grams", "复数计量名词", "数量中心", "leak的宾语", "以克计量排放。"),
        component("of CO2", "介词短语", "计量对象", "grams", "指出所计量的物质为二氧化碳。"),
      ]),
      component(`depending on ${attempts}`, "现在分词短语", "条件依赖状语", "排放量在区间内的变化", "说明排放多少取决于尝试次数，不是搜索行为在寻求他人帮助。", [
        component("depending", "现在分词", "分词结构核心", "排放量与次数的依赖关系", "与on构成depend on，补充排放量变化的条件。"),
        component(`on ${attempts}`, "介词＋疑问内容从句", "依赖因素补足语", "depending", "on的宾语是需要多少次尝试这一问题。", [
          component(attempts, "嵌入式疑问从句", "介词宾语从句", "on", "how many限定主语attempts，从句保持陈述语序。", [
            component("how many attempts", "疑问数量名词短语", "从句主语", "are needed", "问需要几次尝试，不是问有几个答案。"),
            component("are needed", "一般现在时被动语态", "从句谓语", "how many attempts", "尝试是被需要的；are与复数attempts一致。"),
            component('to get the "right" answer', "不定式短语", "目的状语", "尝试这一行为", "尝试的目的在于得到所需答案，不把不定式叫宾语。", [
              component("to get", "不定式标记＋动词", "不定式核心", "尝试的目的", "get表示获得，执行者是搜索者，原文未明写人称。"),
              component('the "right" answer', "名词短语", "宾语", "get", "保留right两侧原卷双引号。"),
            ]),
          ]),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "object", "modifier"],
    translations: ["一次谷歌搜索", "可能排放", "0.2至7.0克二氧化碳", "具体取决于为了得到‘正确’答案需要尝试多少次"],
    clauses: [clause(attempts, "介词宾语从句（疑问内容）", "how many（限定attempts）", "作on的宾语，交代决定排放量的因素", "how many attempts", "are needed", [], "先译排放量区间，再译需要几次尝试才能找到答案；to get表目的，不是are needed的宾语。")],
    reading: { focus: "排放量随尝试次数变化；how many attempts整体是被动从句的主语。", questions: [
      question("how many问的是克数还是尝试次数？", attempts, "问尝试次数。attempts为are needed的主语；克数已经在主句宾语中给出。to get说明尝试的目的。"),
      question("0.2到7.0是每次搜索必定排放的固定值吗？", "can leak between 0.2 and 7.0 grams of CO2", "不是。can和between...and...给出可能的区间，后面的depending解释区间变化；不能改译为每次必定排放7克。"),
    ] },
    notes: ["自然译文的‘具体多少’承接前面的排放数量，属于中文衔接补译。数值只是历史试卷陈述，不作为当今服务排放的事实核验。"],
  },
  4: {
    components: [
      component("To deliver results to its users quickly", "不定式短语", "目的状语", "Google has to maintain", "说明维持数据中心的目的；动作执行者是主句的Google。", [
        component("To deliver", "不定式标记＋动词", "不定式核心", "维持数据中心的目的", "deliver在此是提供搜索结果。"),
        component("results", "复数名词", "宾语", "deliver", "提供的是结果，不是用户。"),
        component("to its users", "介词短语", "接收方补足语", "deliver", "to引出接收者，its指Google。"),
        component("quickly", "副词", "方式状语", "deliver", "限定结果交付速度，不限定maintain的速度。"),
      ]),
      component("then", "推论副词", "逻辑衔接", "搜索需求与设施要求之间的推导", "承接前文，表示因此，而不是时间上的随后。"),
      component("Google", "专有名词", "主语", "has to maintain", "同时是不定式deliver的逻辑主语。"),
      component("has to maintain", "必要性结构＋动词原形", "谓语", "Google", "has to整体表客观需要；不是has构成完成时。"),
      component("vast data centres around the world", "带地点修饰的名词短语", "宾语", "maintain", "中心词centres，说明所维护设施的规模与全球分布。", [
        component("vast", "形容词", "规模定语", "data centres", "说明数据中心庞大。"),
        component("data centres", "名词复合结构", "宾语中心", "maintain", "data限定centre类型，保留英式复数centres。"),
        component("around the world", "介词短语", "地点后置定语", "data centres", "说明数据中心分布于世界各地，不是环绕地球移动。"),
      ]),
      component("packed with powerful computers", "过去分词短语", "补充性后置定语", "data centres", "修饰数据中心，表示其中密集装有计算机，不是修饰Google或users。", [
        component("packed", "过去分词", "分词核心", "data centres", "设施处于装满设备的状态；不是主句第二个有限谓语。"),
        component("with powerful computers", "介词短语", "所装内容补足语", "packed", "powerful说明设备性能强，不等于低耗能。"),
      ]),
    ],
    colors: ["modifier", "connector", "subject", "predicate", "object", "modifier"],
    translations: ["为了迅速把结果提供给用户", "因此", "谷歌", "必须维护", "遍布世界各地的庞大数据中心", "其中密集装有高性能计算机"],
    clauses: [],
    reading: { focus: "目的不定式解释维护原因，packed只补充中心的设备配置，then表推论。", questions: [
      question("quickly与packed分别说明什么？", "To deliver results to its users quickly, then, Google has to maintain vast data centres around the world, packed with powerful computers", "quickly修饰deliver，表示迅速提供结果；packed修饰data centres，表示中心装满计算机。不能译成迅速维护用户或用户装有计算机。"),
      question("then是否说明先搜索、后来才建数据中心？", "then, Google has to maintain", "没有这样的时间顺序。then是在推导：为迅速提供结果，就必须维持设施；has to也不是完成时。"),
    ] },
    notes: ["‘其中’把英语的分词后置定语转成中文分句，所指为数据中心；原文没有新增第二个建造动作。"],
  },
  5: {
    components: [
      component("While producing large quantities of CO2", "while＋省略主语和be的分词结构", "时间状语从句", "these computers emit", "说明同一批计算机同时产生CO2和热量，不是让步。", [
        component("While", "时间连词", "时间从句引导词", "producing与emit的同时关系", "可理解为while these computers are producing；补出的主语与be不写入原文。"),
        component("producing", "现在分词", "省略从句的动词核心", "省略的these computers", "与主句emit共用逻辑主语。"),
        component("large quantities of CO2", "数量名词短语", "宾语", "producing", "CO2是大量产生的物质，不是后面emit的heat。"),
      ]),
      component("these computers", "指示限定名词短语", "第一分句主语", "emit", "these回指上一句数据中心中的计算机。"),
      component("emit", "一般现在时动词", "第一分句谓语", "these computers", "这里释放的对象是heat。"),
      component("a great deal of heat", "不可数数量名词短语", "宾语", "emit", "a great deal of限定不可数heat，表示大量热量。"),
      component("so", "结果并列连词", "结果连接", "发热与制冷需求", "热量大，所以中心需要制冷；不是so...that程度结构。"),
      component("the centres", "名词短语", "第二分句主语", "need", "回指前句的data centres，不是计算机用户。"),
      component("need", "实义动词", "第二分句谓语", "the centres", "need后接被动不定式，表示数据中心需要接受制冷。"),
      component("to be well air-conditioned", "被动不定式短语", "宾语内容", "need", "被制冷的是centres，执行者没有明写。", [
        component("to be", "不定式标记＋被动助动词", "被动不定式组成", "air-conditioned", "与过去分词组成to be air-conditioned。"),
        component("well", "副词", "程度及效果状语", "air-conditioned", "表示制冷充分，不是形容中心身体健康。"),
        component("air-conditioned", "复合过去分词", "被动不定式实义核心", "the centres", "表示中心得到空调制冷，保留连字符。"),
      ]),
      component(coolingResult, "which引导的非限制性关系从句", "非限制性定语从句", "为数据中心制冷这一做法", "which概括前述制冷措施，uses为单数，不指复数centres。", [
        component("which", "关系代词", "从句主语", "uses", "回指给中心制冷的做法，而非computers或CO2。"),
        component("uses", "一般现在时动词", "从句谓语", "which", "交代制冷还会耗能。"),
        component("even more energy", "带程度副词的名词短语", "宾语", "uses", "more限定能源数量，even加强比较。", [
          component("even", "副词", "比较强调状语", "more", "突出进一步增加。"),
          component("more", "比较数量限定词", "数量定语", "energy", "更多的能源，区别第7句独立使用的more。"),
          component("energy", "不可数名词", "宾语中心", "uses", "这里是能源，不是人的精力。"),
        ]),
      ]),
    ],
    colors: ["modifier", "subject", "predicate", "object", "connector", "subject", "predicate", "object", "modifier"],
    translations: ["在产生大量二氧化碳的同时", "这些计算机", "还散发", "大量热量", "所以", "这些中心", "需要", "得到充分的空调制冷", "而这又会消耗更多能源"],
    clauses: [
      clause("While producing large quantities of CO2", "省略式时间状语从句", "While", "交代与emit同时发生的动作", "省略these computers", "producing（省略are）", [detail("宾语", "large quantities of CO2")], "先译计算机在产生CO2的同时，再译它们还散发热量；补出的主语和are只用于讲解。"),
      clause(coolingResult, "非限制性定语从句", "which", "补充前述空调制冷做法的耗能后果", "which", "uses", [detail("宾语", "even more energy")], "先译中心需要制冷，再译而这又耗费更多能源。"),
    ],
    reading: { focus: "发热导致制冷，制冷又耗能；which指做法，不指最近的复数名词。", questions: [
      question("While从句是谁在产生CO2？", "While producing large quantities of CO2, these computers emit", "与主句emit共用these computers这一主语；While表示同时，不译为虽然，也不补成数据中心用户。"),
      question("which为什么不指centres？", "the centres need to be well air-conditioned, which uses even more energy", "uses为单数，语义上耗费额外能源的是空调制冷这一做法。复数centres只是接受制冷的设施，不能按就近名词机械配对。"),
    ] },
    notes: ["词块译文的‘还’帮助表达While的同时关系，不对应另一个独立英文副词；which译成‘而这’，‘这’指制冷做法。原文未说明电力来源，不补写燃煤或某种发电方式。"],
  },
  6: {
    components: [
      component("However", "转折副词", "转折衔接", "前文负担与本句改进行动", "转向企业的应对措施，并不否认前面的排放。"),
      component("Google and other big tech providers", "并列名词短语", "主语", "monitor和make", "Google与其他大型技术服务商是两个动作的共同主体。", [
        component("Google", "专有名词", "第一并列主语", "monitor和make", "谷歌属于技术服务商，other表示此外的同类。"),
        component("and", "并列连词", "主语连接", "Google与other big tech providers", "连接主体，不是连接动作。"),
        component("other big tech providers", "名词短语", "第二并列主语", "monitor和make", "providers是中心词，other、big和tech说明类别与规模。"),
      ]),
      component("monitor", "一般现在时动词", "第一分句谓语", "Google and other big tech providers", "表示监测，不是名词显示器。"),
      component("their efficiency", "所属限定名词短语", "宾语", "monitor", "their指共同主语；这里关注运行效率与能耗表现。"),
      component("closely", "副词", "方式状语", "monitor", "表示密切监测，不是空间距离近。"),
      component("and", "并列连词", "谓语连接", "monitor与make", "与主语内部的第一个and作用不同。"),
      component("make", "一般现在时动词", "第二分句谓语", "与monitor共用前面的主语", "make与improvements搭配表示作出改进，不是使役结构。"),
      component("improvements", "复数名词", "宾语", "make", "监测之外还实施改进；不表示已经解决全部问题。"),
    ],
    colors: ["connector", "subject", "predicate", "object", "modifier", "connector", "predicate", "object"],
    translations: ["不过", "谷歌和其他大型技术服务商", "监测", "自身运行效率", "密切地", "并且", "作出", "改进"],
    clauses: [],
    reading: { focus: "两个and一处连接主语、一处连接谓语，their回指这些服务商。", questions: [question("谁在make improvements，是否换了执行者？", "Google and other big tech providers monitor their efficiency closely and make improvements", "没有。第一个and连接Google和其他服务商；第二个连接monitor与make，两动词共享同一主语。their也回指这些服务商。") ] },
    notes: ["closely在原文宾语之后，中文自然语序放在‘监测’之前。一般现在时陈述企业措施，不添加某次改进完成的时间或效果承诺。"],
  },
  7: {
    components: [
      component("Monitoring", "动名词", "主语", "is", "把监测这一行为作为谈论对象；不是进行时谓语。"),
      component("is", "系动词", "谓语", "Monitoring", "把监测与第一步这一身份连接起来。"),
      component("the first step on the road to reduction", "带嵌套后置修饰的名词短语", "表语", "is", "说明监测是迈向减排的第一步，不是已经完成减排。", [
        component("the first step", "名词短语", "表语中心", "is", "first保留步骤顺序。"),
        component("on the road to reduction", "介词短语", "后置定语", "step", "说明这一步处于减排进程中，road是比喻。", [
          component("to reduction", "介词短语", "目标后置定语", "road", "to后面是名词reduction，所以to是介词，不是不定式标记。"),
        ]),
      ]),
      component("but", "转折连词", "分句连接", "第一步与仍需更多行动", "肯定第一步的价值，同时强调尚未完成。"),
      component("there", "存在句引导词", "存在结构引导", "there is", "不指地点那里。"),
      component("is", "存在结构动词", "第二分句谓语", "there存在句", "与后面的不可数工作量表达much more相应。"),
      component("much more to be done", "代词性数量结构＋不定式定语", "存在句的实际主语", "there is", "more指更多事情；to be done说明这些事情仍需完成。", [
        component("much", "程度副词", "比较程度状语", "more", "加强更多的程度，不是单独的一件任务。"),
        component("more", "代词性比较数量词", "实际主语中心", "there is", "独立指更多的事情，原文没有写work这个名词。"),
        component("to be done", "被动不定式", "后置定语", "more", "待完成的是事情，执行者在句末by短语中补充。"),
      ]),
      component("and not just by big companies", "并列补充的省略结构", "被动施事范围补充", "to be done", "not just只否定‘仅限企业’，不排除企业，也不新增原文没有的完整分句。", [
        component("and", "并列连词", "补充连接", "前面的待做事项", "继续补充由谁来做。"),
        component("not just", "否定词＋焦点副词", "范围限定", "by big companies", "不只是；责任还涉及其他主体。"),
        component("by big companies", "介词短语", "被动施事", "be done", "by引出执行工作的人或机构；不修饰road或reduction。"),
      ]),
    ],
    colors: ["subject", "predicate", "complement", "connector", "modifier", "predicate", "subject", "modifier"],
    translations: ["监测", "是", "通往减排之路的第一步", "但", "有（存在句引导）", "（与there合起来表示存在）", "更多尚待完成的事情", "而且不只是由大公司来做"],
    clauses: [],
    reading: { focus: "区分两处to，并让句末by短语回接be done；不只是企业不等于排除企业。", questions: [
      question("两处to的身份一样吗？", "the first step on the road to reduction, but there is much more to be done", "不同。to reduction中to是介词，后接名词；to be done中to引出被动不定式，修饰more。is后的first step是表语，不能标为宾语。"),
      question("not just by big companies是否表示企业不必行动？", "much more to be done, and not just by big companies", "不是。by引出be done的执行者，not just只否定主体范围限于大公司，企业仍在范围内。句末没有独立主谓，不另造定语从句。"),
    ] },
    notes: ["there与is合起来译成‘有’，词块分开仅为显示结构，不在自然译文重复翻译。reduction译‘减排’借助全文排放语境；‘事情／工作’是more的中文补足，不声称原文出现work。"],
  },
};

const detailedAlignments: Record<number, NonNullable<SentenceAnalysis["translationAlignment"]>> = {
  1: [
    { english: "Who would have thought ", chinese: "谁会想到" },
    { english: "that, globally, ", chinese: "在全球范围内（that引出所想到的内容）" },
    { english: "the IT industry ", chinese: "信息技术行业" },
    { english: "produces ", chinese: "产生" },
    { english: "about the same volume of greenhouse gases ", chinese: "大致相同数量的温室气体" },
    { english: "as the world's airlines do ", chinese: "与全球航空业的排放量相比" },
    { english: "– roughly 2 percent of all CO2 emissions?", chinese: "——约占全部二氧化碳排放量的2%" },
  ],
  3: [
    { english: "A Google search ", chinese: "一次谷歌搜索" },
    { english: "can leak ", chinese: "可能排放" },
    { english: "between 0.2 and 7.0 grams of CO2, ", chinese: "0.2至7.0克二氧化碳" },
    { english: "depending on ", chinese: "具体取决于" },
    { english: "how many attempts ", chinese: "多少次尝试" },
    { english: "are needed ", chinese: "是需要的" },
    { english: 'to get the "right" answer.', chinese: "为了得到‘正确’答案" },
  ],
  7: [
    { english: "Monitoring ", chinese: "监测" },
    { english: "is ", chinese: "是" },
    { english: "the first step ", chinese: "第一步" },
    { english: "on the road to reduction, ", chinese: "在迈向减排的道路上" },
    { english: "but ", chinese: "但" },
    { english: "there is much more ", chinese: "还有更多的事情" },
    { english: "to be done, ", chinese: "有待完成" },
    { english: "and not just by big companies.", chinese: "而且不只是由大公司来做" },
  ],
};

export function reviewTranslation2011(sentence: SentenceAnalysis): SentenceAnalysis {
  const value = reviewed[sentence.number];
  if (!value) throw new Error(`${sentence.id}: 缺少人工句法审查`);
  if (value.translations.length !== value.components.length) throw new Error(`${sentence.id}: 词块对译数量不一致`);
  const result = withReviewedSyntax({ ...sentence, beginnerSyntax: { components: value.components, clauses: value.clauses, reading: value.reading }, practice: translation2011Practice[sentence.number] }, value.colors);
  return { ...result, translationAlignment: detailedAlignments[sentence.number] ?? result.chunks.map((chunk, index) => ({ english: chunk.text, chinese: value.translations[index] })), translationNotes: value.notes };
}
