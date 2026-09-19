import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { translation2012Practice } from "./2012-translation-practice";

const component = (text: string, form: string, grammaticalFunction: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent =>
  ({ text, form, function: grammaticalFunction, modifies, explanation, ...(children ? { children } : {}) });
const detail = (grammaticalFunction: string, text: string) => ({ function: grammaticalFunction, text });
const question = (prompt: string, evidence: string, answer: string) => ({ question: prompt, evidence, answer });
type Review = {
  components: BeginnerSyntaxComponent[];
  colors: SyntaxVisualRole[];
  translations: string[];
  clauses: BeginnerClauseDetail[];
  reading: SentenceReadingGuide;
  notes: string[];
};

const timeClause = "When people in developing countries worry about migration";
const workersClause = "that countries like Britain, Canada and Australia try to attract by using immigration rules that privilege college graduates";
const rulesClause = "that privilege college graduates";
const studyClause = "that well-educated people from developing countries are particularly likely to emigrate";
const comparison = "compared with around 3.3% of all Indians over the age 25";
const surveyClause = `that nearly 40% of emigrants had more than a high-school education, ${comparison}`;
const contributionClause = "who could have taught at their universities, worked in their hospitals and come up with clever new products for their factories to make";
const deprivation = `depriving them of much-needed skilled workers ${contributionClause}`;
const fearClause = `that it hurts their economies, ${deprivation}`;

const reviews: Record<number, Review> = {
  1: {
    components: [
      component(timeClause, "when引导的有限从句", "时间状语从句", "they are usually concerned", "先设定人们谈到迁移时的背景，不是提出一个待满足的假设条件。", [
        component("When", "从属连词", "时间连接", "整个时间从句", "表示当……时。"),
        component("people in developing countries", "名词及介词短语", "从句主语", "worry", "主体是发展中国家的人们。", [
          component("people", "复数名词", "主语中心", "worry", "担忧的人。"),
          component("in developing countries", "介词短语", "后置定语", "people", "限定人们所在的国家。", [
            component("developing", "分词形容词", "前置定语", "countries", "表示发展中的，与句末developed区别。"),
          ]),
        ]),
        component("worry", "一般现在时动词", "从句谓语", "people", "不及物用法，担忧对象由about引出。"),
        component("about migration", "介词短语", "担忧对象补足语", "worry", "migration只说迁移，方向要继续看后文。"),
      ]),
      component("they", "人称代词", "主语", "are", "回指people in developing countries。"),
      component("are", "系动词", "谓语", "they", "连接人们与担忧的心理状态，不把整段主系表叫作谓语。"),
      component("usually", "频度副词", "频度状语", "are concerned", "表示通常，并非毫无例外。"),
      component("concerned", "分词形容词", "表语", "are", "表示担忧的，不是把所有后续内容都看成被动谓语。"),
      component("at the prospect of their best and brightest departure to Silicon Valley or to hospitals and universities in the developed world", "介词短语，内部含原卷瑕疵", "担忧对象补足语", "concerned", "at引起担忧的前景；of之后只按语境解释人才外流，不将异常连接冒充规范语法。", [
        component("the prospect", "名词短语", "介词at的宾语中心", "at", "表示可能发生的情形，不保证它一定发生。"),
        component("of their best and brightest departure to Silicon Valley or to hospitals and universities in the developed world", "of引出的内容，内部连接存疑", "前景内容补足语", "prospect", "全文workers和brain drain支持人才离开的语境，但无法据此恢复原本拟用的英文形式。", [
          component("their best and brightest departure", "原卷非规范片段", "语境上指向人才离开，内部连接存疑", "prospect的内容", "不能把best and brightest硬讲成正常修饰departure，也不能断言原文一定漏了所有格；本段保留可见文字。"),
          component("to Silicon Valley", "介词短语", "第一项去向补足语", "departure", "前往硅谷。"),
          component("or", "并列连词", "目的地选择连接", "两个to短语", "连接两类去向，不表示先后顺序。"),
          component("to hospitals and universities in the developed world", "介词及并列名词短语", "第二项去向补足语", "departure", "前往发达国家的医院和大学。", [
            component("hospitals and universities", "并列名词", "介词to的宾语", "to", "医院和大学是并列机构。"),
            component("in the developed world", "介词短语", "后置定语", "hospitals and universities", "限定这两类机构所在的发达国家群体。"),
          ]),
        ]),
      ]),
    ],
    colors: ["modifier", "subject", "predicate", "modifier", "complement", "modifier"],
    translations: ["当发展中国家的人们担心人口迁移时", "他们", "处于", "通常", "担忧的状态", "担忧本国最优秀、最聪明的人才将离开，前往硅谷或发达国家的医院与大学（依语境解释原文瑕疵）"],
    clauses: [{ text: timeClause, type: "时间状语从句", marker: "When", role: "为主句的通常担忧设定时间背景", subject: "people in developing countries", predicate: "worry", predicateDetails: [detail("担忧对象介词补足语", "about migration")], translationOrder: "先译当人们担心迁移时，再译他们具体担心哪种前景。" }],
    reading: { focus: "先辨迁移方向，再把原卷不规范连接与可靠语境分开。", questions: [
      question("best and brightest departure能当作规范搭配学习吗？", "their best and brightest departure", "不能。后文workers和brain drain使人才离开的语境可辨，但现有连接不规范；不确定原本拟用所有格还是另一种形式，不能给它硬造正常句法。"),
      question("migration已经确定是移入本国吗？", "departure to Silicon Valley or to hospitals and universities in the developed world", "没有。migration泛指迁移；departure及两组to目的地显示本段担忧的是人才从发展中国家流出。"),
      question("两个发展阶段能互换吗？", "in the developed world", "不能。开头developing countries为人们所在的发展中国家，结尾developed world为人才目的地所属的发达国家群体。"),
    ] },
    notes: ["原文their best and brightest departure原样保留；中文的‘人才离开’依据后文workers、brain drain补足语义，不是已校正的英文。", "仅供学习的规范表述：the departure of their best and brightest（他们最优秀、最聪明的人才的离开）。这只是表达相同语境的一种规范方式，不断言原卷应当如何改写，也不进入原文、主干或词块英文。"],
  },
  2: {
    components: [
      component("These", "指示代词", "主语", "are", "回指前句的人才，不指目的地医院和大学。"),
      component("are", "系动词", "谓语", "These", "连接这类人才与下文身份说明。"),
      component(`the kind of workers ${workersClause}`, "名词短语及嵌套定语从句", "表语", "are", "保留原卷These are the kind，不改成kinds；表语不是are的宾语。", [
        component("the kind of workers", "名词短语", "表语中心及类别限定", "are", "表示那一类人才。", [component("of workers", "介词短语", "类别补足语", "kind", "指出所说的是人才类别。")]),
        component(workersClause, "有限关系从句", "定语从句", "workers", "整个从句直到graduates才结束，内含另一条修饰rules的从句。", [
          component("that", "关系代词", "attract的宾语", "workers", "被吸引的就是workers；attract后不另补them。"),
          component("countries like Britain, Canada and Australia", "名词及举例短语", "从句主语", "try", "这些国家负责尝试招揽。", [component("like Britain, Canada and Australia", "介词及并列国名", "举例定语", "countries", "like意为例如，不是喜欢。")]),
          component("try", "一般现在时动词", "从句谓语", "countries", "表示设法，不保证一定吸引成功。"),
          component("to attract", "不定式", "try的宾语", "try", "逻辑主语为countries，逻辑宾语由关系代词that承担。"),
          component(`by using immigration rules ${rulesClause}`, "by加动名词短语", "方式状语", "attract", "各国通过使用移民规定招揽人才。", [
            component("using", "动名词", "介词by的宾语核心", "by", "执行者是这些接收国。"),
            component(`immigration rules ${rulesClause}`, "名词及定语从句", "using的宾语", "using", "接收国以移入视角制定政策。", [
              component("immigration rules", "名词短语", "宾语中心", "using", "immigration作名词定语，限定规定类型。"),
              component(rulesClause, "有限关系从句", "定语从句", "rules", "规定给予大学毕业生优先待遇。", [
                component("that", "关系代词", "内层从句主语", "privilege", "回指rules，不是前一个that所指的workers。"),
                component("privilege", "及物动词", "内层从句谓语", "that", "意为优待，不能误作特权名词。"),
                component("college graduates", "名词短语", "内层从句宾语", "privilege", "受优待者是大学毕业生。"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "complement"],
    translations: ["这些人才", "是", "英国、加拿大、澳大利亚等国试图通过优待大学毕业生的移民规定来吸引的那类人才"],
    clauses: [
      { text: workersClause, type: "定语从句", marker: "that", role: "限定workers，包含招揽手段及内层rules从句", subject: "countries like Britain, Canada and Australia", predicate: "try", predicateDetails: [detail("宾语（不定式）", "to attract"), detail("attract的宾语（关系代词）", "that")], translationOrder: "先读哪些国家设法吸引人才，再把by方式和内层规则补入；中文可将整个限定前置。" },
      { text: rulesClause, type: "定语从句", marker: "that", role: "限定immigration rules", subject: "that", predicate: "privilege", predicateDetails: [detail("宾语", "college graduates")], translationOrder: "译成优待大学毕业生的规定，再回到各国使用规定招揽人才。" },
    ],
    reading: { focus: "两个that分别指人才和规则，身份不同，修饰层级也不同。", questions: [
      question("两个that为什么不能都当主语？", workersClause, "第一个从句已有countries作主语，that填attract的宾语位置；第二个that直接接privilege，是rules所对应的主语。"),
      question("immigration从谁的角度说？", "by using immigration rules", "从英国等接收国看，是移入本国；与第三句从人才原国家看emigrate移居国外方向相反，不是两次不同的迁移。"),
    ] },
    notes: ["中文可先译招揽手段，再强调‘正是这类人才’；‘正是’体现These回指与表语确认，不是新增一次招揽事件。"],
  },
  3: {
    components: [
      component("Lots of studies", "数量结构及复数名词", "主语", "have found", "数量核心是多项研究，不是一次确定数量的实验。", [
        component("Lots of", "数量短语", "数量限定", "studies", "表示许多；of之后studies为复数。"),
        component("studies", "复数名词", "主语语义中心", "have found", "研究作发现这一动作的主体。"),
      ]),
      component("have found", "现在完成时", "谓语", "Lots of studies", "概括研究累积的发现，不据此说所有情况都已获证明。"),
      component(studyClause, "that引导的有限内容从句", "宾语从句", "have found", "发现内容是某类人尤其可能移居国外。", [
        component("that", "从属连词", "内容连接", "have found", "引出发现，不指代某个人。"),
        component("well-educated people from developing countries", "名词及前后定语", "从句主语", "are", "同时限定教育程度与来源国家。", [
          component("well-educated", "复合形容词", "前置定语", "people", "受过良好教育的。"),
          component("people", "复数名词", "主语中心", "are", "移居国外这一行动的潜在执行者。"),
          component("from developing countries", "介词短语", "后置定语", "people", "说明来源，不是迁入目的地。"),
        ]),
        component("are", "系动词", "从句谓语", "people", "连接人们与可能性判断。"),
        component("particularly likely to emigrate", "形容词及程度、不定式补足语", "表语", "are", "表示尤其可能移出，不是已经移出的事实。", [
          component("particularly", "程度副词", "程度状语", "likely", "强调可能性尤其高。"),
          component("likely", "形容词", "表语中心", "are", "表达概率而非必然。"),
          component("to emigrate", "不定式", "形容词补足语", "likely", "补充可能发生的行动，逻辑主语为people；不是新的有限从句。"),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "object"],
    translations: ["许多研究", "已经发现", "来自发展中国家的受过良好教育的人尤其可能移居国外"],
    clauses: [{ text: studyClause, type: "宾语从句", marker: "that", role: "作have found的宾语", subject: "well-educated people from developing countries", predicate: "are", predicateDetails: [detail("表语", "particularly likely to emigrate")], translationOrder: "先译研究发现，再译受教育群体和来源，最后译尤其可能移出。" }],
    reading: { focus: "把研究发现与可能性判断分开，emigrate从来源国看向外移居。", questions: [
      question("have found意味着这些人都已经出国了吗？", "are particularly likely to emigrate", "没有。研究发现的是较高可能性，likely不是事实完成标记；have found的完成时属于研究的发现。"),
      question("from developing countries修饰什么？", "well-educated people from developing countries", "修饰people，交代人才来自发展中国家；to emigrate补充likely的内容，不是from所引的国家将移民。"),
    ] },
    notes: ["‘尤其容易选择移民海外’是likely的自然表达，仍表示可能性；不得升级成全部已经移民或一定移民。"],
  },
  4: {
    components: [
      component("A big survey of Indian households in 2004", "名词及两层限定", "主语", "found", "主体是2004年针对印度家庭的大型调查。", [
        component("A big survey", "名词短语", "主语中心", "found", "big指调查规模大。"),
        component("of Indian households", "介词短语", "调查对象补足语", "survey", "调查单位是印度家庭，不是移民个人总数。"),
        component("in 2004", "时间介词短语", "调查时间限定", "survey", "调查发生于2004年，不表示所有人都在这一年移民。"),
      ]),
      component("found", "一般过去时动词", "谓语", "survey", "报告一次具体调查的发现。"),
      component(surveyClause, "that引导的有限内容从句", "宾语从句", "found", "整个比例发现含句末比较参照，不能在education处丢掉比较层。", [
        component("that", "从属连词", "内容连接", "found", "引出调查发现。"),
        component("nearly 40% of emigrants", "百分比及of限定", "从句主语", "had", "近40%的分母为移居国外者。", [
          component("nearly 40%", "约量副词及百分比", "数量中心", "of emigrants", "nearly表示接近但未达到40%，不等于精确40%。"),
          component("of emigrants", "介词短语", "分母范围", "40%", "不能倒置为受过高等教育的人中有40%移民。"),
        ]),
        component("had", "实义动词过去式", "从句谓语", "nearly 40% of emigrants", "表示拥有或受过，后接教育程度；不是完成时助动词。"),
        component("more than a high-school education", "程度比较名词短语", "宾语", "had", "教育程度超过高中，不保证每人都取得同一种大学学位。", [
          component("more than", "比较结构", "程度界限", "a high-school education", "表示高于该教育水平，不是读过多所高中。"),
          component("a high-school education", "名词短语", "比较基准", "more than", "高中教育水平。"),
        ]),
        component(comparison, "过去分词比较短语", "比较状语", "近40%达到上述教育水平这一比例判断", "比较同一教育条件在两个不同人群中的比例；不是增加了多少个百分点。", [
          component("compared", "过去分词", "非谓语比较核心", "两项比例", "不作另一个有限谓语，也不虚构省略的完整从句。"),
          component("with around 3.3% of all Indians over the age 25", "介词短语", "比较对象补足语", "compared", "约3.3%以全部超过25岁的印度人为分母。", [
            component("around 3.3%", "约量副词及百分比", "比较比例", "with", "around保留大约的限定。"),
            component("of all Indians over the age 25", "of限定及原卷非标准年龄表达", "分母范围", "3.3%", "不是所有印度人，也不是25岁以上的移民。", [
              component("all Indians", "限定词及复数名词", "分母群体中心", "of", "全体印度人还要接受后面的年龄限定。"),
              component("over the age 25", "原卷非规范年龄片段", "语境中的年龄限定", "all Indians", "over和25支持超过25岁的理解；age与25间缺常见of，不硬讲25为规范同位语，也不向原文补字。"),
            ]),
          ]),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "object"],
    translations: ["2004年一项针对印度家庭的大型调查", "发现", "近40%的移居国外者受教育程度超过高中，而全部超过25岁的印度人中达到这一水平的约占3.3%"],
    clauses: [{ text: surveyClause, type: "宾语从句", marker: "that", role: "作found的宾语，包含句末比较参照", subject: "nearly 40% of emigrants", predicate: "had", predicateDetails: [detail("宾语", "more than a high-school education")], translationOrder: "先译调查，再译移居国外者中近40%达到该学历，最后用相比之下引出另一分母的3.3%。" }],
    reading: { focus: "两项百分比共享教育条件，却各有不同分母；年龄原文不补字。", questions: [
      question("40%和3.3%分别除以哪一群人？", surveyClause, "近40%的分母是移居国外者；约3.3%的分母是全部超过25岁的印度人。共同统计条件是受教育程度超过高中，不能说40%的高学历者出国，也不能说3.3%的印度人移民。"),
      question("over the age 25是可照搬的规范写法吗？", "over the age 25", "不是。原文保留，语境上按超过25岁理解；学习时另列规范形式over the age of 25，不把缺少的of说成原卷可见文字。"),
      question("compared with是否新开一个有限从句？", comparison, "不是，compared是非谓语过去分词，with引比较参照；‘其中达到这一水平的’为中文补出共享比较条件，不对应原文另一套主谓。"),
    ] },
    notes: ["原文over the age 25保留不动；仅供学习的规范表述是over the age of 25（超过25岁），of不进入原文及英文对译块。", "‘相比之下’对应compared with；‘达到这一水平的／其中这一比例’为避免分母误读而补出的共同教育条件，不能伪造第二个英文有限从句。", "严格边界为超过25岁；原译‘25岁以上’沿用汉语常见表达，不据此把25岁整纳入统计口径。"],
  },
  5: {
    components: [
      component('This "brain drain"', "指示限定词及名词隐喻", "主语", "has bothered", "This回指前文高学历人才较易移出的现象。", [
        component("This", "指示限定词", "回指限定", "brain drain", "把前面的迁移现象概括为这一种。"),
        component('"brain drain"', "名词短语及术语引号", "主语中心", "has bothered", "brain借指人才和智力资源，drain为外流。"),
      ]),
      component("has long bothered", "现在完成时及持续副词", "谓语", "This brain drain", "表达长期困扰，不是人才执行了骚扰。", [
        component("has", "助动词", "完成时标记", "bothered", "与过去分词构成现在完成时。"),
        component("long", "时间副词", "持续时间状语", "has bothered", "很久以来，不是形容物体长。"),
        component("bothered", "过去分词", "实义谓语核心", "has", "表示使烦恼。"),
      ]),
      component("policymakers in poor countries", "名词及介词短语", "宾语", "has bothered", "受困扰的是贫穷国家的决策者。", [
        component("policymakers", "复数名词", "宾语中心", "bothered", "政策制定者，下一句They所指。"),
        component("in poor countries", "介词短语", "后置定语", "policymakers", "限定决策者所属国家，不是质量低劣的政策。"),
      ]),
    ],
    colors: ["subject", "predicate", "object"],
    translations: ["这种人才外流", "长期以来一直困扰着", "贫穷国家的政策制定者"],
    clauses: [],
    reading: { focus: "把长期困扰的对象读准，下一句They回指决策者。", questions: [
      question("是人才外流困扰政策制定者，还是反过来？", 'This "brain drain" has long bothered policymakers in poor countries', "brain drain作主语，policymakers作宾语；long修饰困扰持续已久，不是另一个形容词或动作。"),
    ] },
    notes: ["引号标出brain drain的隐喻称谓，不是政策制定者的一段直接引语。"],
  },
  6: {
    components: [
      component("They", "人称代词", "主语", "fear", "回指上句policymakers，不指外流人才。"),
      component("fear", "及物动词", "谓语", "They", "引出政策制定者的担忧，不等于作者证明一切后果必然发生。"),
      component(fearClause, "that引导的有限内容从句", "宾语从句", "fear", "从经济损害延伸到损害方式及失去的潜在贡献。", [
        component("that", "从属连词", "内容连接", "fear", "引出担忧内容，不充当hurts的主语。"),
        component("it", "人称代词", "从句主语", "hurts", "回指brain drain。"),
        component("hurts", "一般现在时动词", "从句谓语", "it", "损害，宾语另列。"),
        component("their economies", "名词短语", "从句宾语", "hurts", "指贫穷国家的经济，不是个人财产。"),
        component(deprivation, "现在分词短语", "方式兼结果状语", "it hurts their economies", "人才外流使这些国家失去急需人才；逻辑施事为brain drain，不是policymakers。", [
          component("depriving", "现在分词", "非谓语核心", "hurts所述经济损害", "deprive A of B中的剥夺动作。"),
          component("them", "人称代词宾格", "depriving的宾语", "depriving", "语境指贫穷国家，与主句They所指的政策制定者不可机械等同。"),
          component(`of much-needed skilled workers ${contributionClause}`, "介词及带定语的名词短语", "被剥夺资源补足语", "depriving", "of后为失去的资源，不是所有关系。", [
            component("much-needed skilled workers", "名词及前置定语", "介词of的宾语中心", "of", "急需的专业人才，不限于工厂体力工人。", [
              component("much-needed", "复合形容词", "需求程度定语", "skilled workers", "说非常需要，不是说工人数量多。"),
              component("skilled", "形容词", "技能定语", "workers", "有专业技能，后文列出教学、医疗与创新。"),
            ]),
            component(contributionClause, "有限关系从句", "定语从句", "workers", "who从句直到make；could have统领三个过去分词，列举本可留在本国的贡献。", [
              component("who", "关系代词", "关系从句主语", "三个并列谓语", "回指skilled workers。"),
              component("could have", "情态动词及完成体助动词", "并列谓语共同助动词", "taught、worked、come", "三项都在本来可能的范围内，worked和come前省去共同助动词。"),
              component("taught at their universities", "过去分词及地点短语", "第一项谓语部分", "could have", "本可在本国大学任教。", [
                component("taught", "过去分词", "第一项实义谓语", "could have", "teach的不规则过去分词，没有直接宾语。"),
                component("at their universities", "介词短语", "地点状语", "taught", "不是taught的宾语，their指贫穷国家。"),
              ]),
              component("worked in their hospitals", "过去分词及地点短语", "第二项谓语部分", "could have", "同样本可发生，不因形式像过去式就当已经工作。", [
                component("worked", "过去分词", "第二项实义谓语", "could have", "共用who与could have。"),
                component("in their hospitals", "介词短语", "地点状语", "worked", "人才来源国的医院。"),
              ]),
              component("and", "并列连词", "第三项连接", "三个谓语部分", "仍在who从句中，不另开主句。"),
              component("come up with clever new products for their factories to make", "短语动词及名词宾语", "第三项谓语部分", "could have", "先构想新产品，工厂再负责生产；come是过去分词。", [
                component("come up with", "短语动词", "第三项实义谓语", "could have", "整体指想出，不把come误读成已经来到。"),
                component("clever new products for their factories to make", "名词及不定式后置定语", "短语动词宾语", "come up with", "构想的是设计巧妙的新产品。", [
                  component("clever new products", "名词短语", "宾语中心", "come up with", "clever指设计巧妙，new指新。"),
                  component("for their factories to make", "for加逻辑主语的不定式", "后置定语", "products", "不是有限从句；工厂为make的逻辑主语，products填逻辑宾语空位。", [
                    component("for", "不定式逻辑主语引导词", "逻辑主语标记", "their factories to make", "不表示因为，不引原因有限从句。"),
                    component("their factories", "名词短语", "不定式逻辑主语", "to make", "工厂生产产品，不是人才制造工厂。"),
                    component("to make", "不定式", "非谓语核心", "products的用途", "make的逻辑宾语回指products，不向原文插入它。"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ],
    colors: ["subject", "predicate", "object"],
    translations: ["他们（政策制定者）", "担心", "人才外流损害本国经济，使国家失去急需的专业人才，而这些人才本可以在本国大学任教、在医院工作，并构想新产品供本国工厂生产"],
    clauses: [
      { text: fearClause, type: "宾语从句", marker: "that", role: "作fear的宾语，内含分词补充及workers关系从句", subject: "it", predicate: "hurts", predicateDetails: [detail("宾语", "their economies")], translationOrder: "先译担忧经济受损，再译失去人才，最后另起中文分句说明人才本可提供的贡献。" },
      { text: contributionClause, type: "定语从句", marker: "who", role: "限定skilled workers", subject: "who", predicate: "could have taught；worked；come up with（后两项共用could have）", predicateDetails: [detail("come up with的宾语", "clever new products for their factories to make")], translationOrder: "先译这些人才本可以，再平行译任教、医院工作、产品创新；最后将供工厂生产附在产品后。" },
    ],
    reading: { focus: "沿着担忧→损害→失去人才→三项潜在贡献读，别把不定式误算有限从句。", questions: [
      question("could have只管taught吗？", "could have taught at their universities, worked in their hospitals and come up with clever new products", "还管worked和come up with，三项都说本可在来源国提供的贡献。come是过去分词，不是新主句的现在时；不能把后两项改译成已经发生的事实。"),
      question("谁制造什么，for是否表示原因？", "clever new products for their factories to make", "their factories是make的逻辑主语，products是逻辑宾语；for引出不定式的逻辑主语，不是带有限谓语的原因从句。"),
      question("They、it、them是否都指同一对象？", "They fear that it hurts their economies, depriving them", "They指政策制定者，it指人才外流，them在deprive结构中指贫穷国家；their economies等所属关系也落在这些国家上。"),
    ] },
    notes: ["‘这些人才本可以’可在中文另起一句承接who；‘而／还／也’服务并列和语序，不添加新事件。", "could have在人才外流语境中表达来源国失去的贡献可能，不表示三项工作已经实现；也不据此断言这些人在任何国家都从未任教、行医或创新。", "depriving解释经济损害的方式兼结果；for their factories to make为非有限不定式结构，不额外虚构第三个有限从句。"],
  },
};

const alignmentBlocks: Record<number, Array<[string, string]>> = {
  1: [["When people in developing countries worry about migration, ", "当发展中国家的人们担心人口迁移时"], ["they are usually concerned ", "他们通常感到担忧"], ["at the prospect ", "担忧的是这种前景"], ["of their best and brightest departure ", "即本国最优秀、最聪明的人才将离开（依语境解释原卷瑕疵）"], ["to Silicon Valley ", "前往硅谷"], ["or to hospitals and universities ", "或前往医院与大学"], ["in the developed world.", "这些机构位于发达国家"]],
  2: [["These are the kind of workers ", "这些正是那类人才"], ["that countries like Britain, Canada and Australia try to attract ", "英国、加拿大和澳大利亚等国力图吸引他们"], ["by using immigration rules ", "办法是运用移民规定"], ["that privilege college graduates.", "这些规定优待大学毕业生"]],
  3: [["Lots of studies have found ", "许多研究已经发现"], ["that well-educated people ", "受过良好教育的人"], ["from developing countries ", "来自发展中国家"], ["are particularly likely to emigrate.", "尤其可能移居国外"]],
  4: [["A big survey of Indian households in 2004 ", "2004年一项针对印度家庭的大型调查"], ["found that ", "发现"], ["nearly 40% of emigrants ", "移居国外者中近40%的人"], ["had more than a high-school education, ", "受教育程度超过高中"], ["compared with around 3.3% ", "相比之下，达到这一教育水平的约占3.3%（共享条件补译）"], ["of all Indians ", "分母为全体印度人"], ["over the age 25.", "且年龄超过25岁（原卷非规范表达）"]],
  6: [["They fear that ", "政策制定者担心"], ["it hurts their economies, ", "人才外流损害本国经济"], ["depriving them of much-needed skilled workers ", "使国家失去急需的专业人才"], ["who could have taught at their universities, ", "这些人才本可以在本国大学任教"], ["worked in their hospitals ", "本可以在本国医院工作（共用could have）"], ["and come up with clever new products ", "并本可以构想巧妙的新产品（共用could have）"], ["for their factories to make.", "供本国工厂生产"]],
};

export function reviewTranslation2012(sentence: SentenceAnalysis): SentenceAnalysis {
  const review = reviews[sentence.number];
  const reviewed = withReviewedSyntax({
    ...sentence,
    beginnerSyntax: { components: review.components, clauses: review.clauses, reading: review.reading },
    practice: translation2012Practice[sentence.number],
  }, review.colors);
  return {
    ...reviewed,
    translationAlignment: alignmentBlocks[sentence.number]?.map(([english, chinese]) => ({ english, chinese }))
      ?? reviewed.chunks.map((chunk, index) => ({ english: chunk.text, chinese: review.translations[index] })),
    translationNotes: ["词块按英文原序对齐；中文语序重组见结构直译和通顺译文。参考译文不作自动评分。", ...review.notes],
  };
}
