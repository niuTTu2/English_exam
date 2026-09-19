import type { PracticeTask, GrammarConceptId, ErrorCategory } from "./learning-model";
const choice = (id: string, prompt: string, options: string[], answer: number, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[answer], evidence, feedback, conceptId, errorType, ...extra });
const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType, ...extra });
const link = (id: string, prompt: string, pairs: Array<[string, string]>, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "link", prompt, links: pairs.map(([source, target]) => ({ source, target })), options: [...new Set(pairs.map(([, target]) => target))], answer: JSON.stringify(pairs.map(([, target]) => target)), evidence, feedback, conceptId, errorType, ...extra });
const order = (id: string, prompt: string, blocks: string[], distractors: string[], evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "order", prompt, options: [...blocks, ...distractors], answer: JSON.stringify(blocks), evidence, feedback, conceptId, errorType, ...extra });

export const passage2001P1Practice: Record<string, PracticeTask[]> = {
  "2001-p1-s1": [
    link("nested-cause", "将两个介词补足语接到各自解释的名词。", [["to the problem", "response：针对什么的回应"], ["of an increasing accumulation", "problem：问题的内容"]], "a response to the problem of an increasing accumulation", "先读response，再问针对什么problem，最后解释problem是知识不断积累；不要把of短语直接挂到seen。", "modifier-prepositional", "attachment", { hintWords: ["response", "to", "of"] }),
    choice("cause-direction", "哪一种因果顺序符合本句？", ["科学知识积累推动专业化", "专业化是知识积累的唯一原因", "职业化直接导致专业化"], 0, "Specialisation can be seen as a response", "response给出应对方向：知识不断积累是需要解决的问题，专业化是应对。没有说它是唯一应对办法。", "lexical-context", "passage-logic", { hintWords: ["response", "accumulation"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s2": [
    range("continue-actions", "划出continue后的完整不定式补足语，保留两个并列动作。", "to handle the information and use it as the basis for further research", "handle与use共用to，第二项带宾语it和as用途补足；不能在and前截断。", "nonfinite-infinitive", "clause-boundary", { hintWords: ["to", "continue", "handle", "use"], leaksToTaskIds: ["use-complement"] }),
    link("use-complement", "把use后的对象和用途对应到结构。", [["it", "use的宾语：information"], ["as the basis for further research", "宾语补足语：把信息用作什么"]], "use it as the basis for further research", "it回指信息，as说明信息的用途；for research再补充basis。不是研究者被当作基础。", "object-complement", "attachment", { hintWords: ["it", "as", "basis", "use"] }),
  ],
  "2001-p1-s3": [
    choice("affecting-head", "affecting the process of communication后置说明谁？", ["related developments", "one man", "the process"], 0, "related developments in science affecting the process of communication", "affecting说明相关发展的作用；in science只限定领域，不能机械按最近名词判定修饰关系。", "nonfinite-participle", "attachment", { hintWords: ["affecting", "developments"] }),
  ],
  "2001-p1-s4": [
    choice("another-reference", "Another承接上一句的哪一类对象？", ["相关发展中的另一项", "另一位业余研究者", "另一份科学知识"], 0, "Another was the growing professionalisation", "上一句谈一系列related developments，本句补出professionalisation；专业化和职业化相关，但并非同一个概念。", "reference-pronoun", "reference", { hintWords: ["Another"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s5": [
    choice("bounded-negation", "No clear-cut distinction否定到什么程度？", ["没有绝对清晰的界线", "双方完全没有差别", "双方绝不可能竞争"], 0, "No clear-cut distinction can be drawn", "clear-cut保留限定，冒号后的例外说明边界并非绝对；不能把no扩大成所有方面都无差别。", "negation-contrast", "option-logic", { hintWords: ["No", "clear-cut", "distinction", "exceptions"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s6": [
    range("connotation-content", "划出connotation的完整内容从句，包括后半个并列谓语。", "that the person concerned is not fully integrated into the scientific community and, in particular, may not fully share its values", "that说明含义是什么；is integrated和may share共用the person concerned。its values属于科学共同体。", "complement-content", "clause-boundary", { hintWords: ["that", "connotation", "share"], leaksToTaskIds: ["qualified-meaning"] }),
    choice("qualified-meaning", "may not fully share its values最准确的理解是哪项？", ["可能并不完全认同科学共同体的价值观", "绝不认同任何科学价值", "科学共同体可能分享他的财产"], 0, "may not fully share its values", "may是可能，not fully是未完全；values是价值观，its指community。两层限制都不可丢。", "comparison-scope", "reference", { hintWords: ["may", "not", "fully", "its", "values", "share"] }),
  ],
  "2001-p1-s7": [
    order("growth-trunk", "移开with背景，拼出主句主谓宾。", ["The growth of specialisation", "implied", "greater problems"], ["with its consequent requirement", "a longer, more complex training"], "The growth of specialisation in the nineteenth century", "中心growth支配implied；with后是名词requirement，不是第二个有限谓语。困难来自随之增加的训练要求。", "basic-svo", "subject", { hintWords: ["growth", "implied", "with"] }),
  ],
  "2001-p1-s8": [
    link("training-example", "把训练范围和地质学案例分别接到正确功能。", [["based especially on a mathematical or laboratory training", "限定哪些科学领域"], ["in terms of the development of geology", "说明用什么案例举证"]], "can be illustrated in terms of the development of geology", "based是修饰areas的分词；illustrated才是共用The trend的第二个谓语部分。地质学服务于前面的趋势概括。", "nonfinite-participle", "attachment", { hintWords: ["based", "illustrated", "training"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s9": [
    link("what-svo", "识别what从句自己的主谓宾。", [["what", "主语：什么"], ["constitutes", "谓语：构成或算作"], ["an acceptable research paper", "宾语：合格研究论文"]], "what constitutes an acceptable research paper", "what承担从句主语；paper直接跟及物动词constitutes，是宾语。这里没有被paper补充说明的另一个宾语。", "clause-object", "attachment", { hintWords: ["what", "constitutes", "paper"] }),
    choice("two-findings", "reveals后not simply...but also连接哪两项？", ["研究首要地位受到强调，以及合格论文的定义变化", "十九世纪和二十世纪两位作者", "研究一定原创，以及论文全部失效"], 0, "not simply an increasing emphasis on the primacy of research", "reveals后是两组并列名词宾语；第二项才内嵌what从句。原文research没有被original限定。", "negation-contrast", "passage-logic", { hintWords: ["reveals", "not", "but", "primacy", "definition"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s10": [
    range("necessary-condition", "划出获得专业认可所需的完整条件，包含only。", "only if they incorporate, and reflect on, the wider geological picture", "only if把纳入并思考全局设为必要条件；两个谓语共享picture，但reflect on的on必须保留。", "clause-condition", "clause-boundary", { hintWords: ["only", "if", "incorporate", "reflect"], leaksToTaskIds: ["condition-strength"] }),
    choice("condition-strength", "only if是否保证满足这一条件就一定能发表？", ["没有，它表达必要条件", "是，满足后其他条件均无关", "它表示地方研究永远无价值"], 0, "acceptable to professionals only if", "只有满足才可能获认可，不等于满足就充分保证；十九世纪的in their own right与新标准形成对照。", "clause-condition", "option-logic", { hintWords: ["only", "if", "acceptable"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2001-p1-map", taskId: "standard-shift" }] }),
  ],
  "2001-p1-s11": [
    choice("contrast-target", "on the other hand对比的是哪两种发展？", ["专业认可标准改变，而业余者沿用旧研究方式", "业余者不再做任何研究", "两个地区的自然地貌不同"], 0, "have continued to pursue local studies in the old way", "本句接第10句的新认可条件；continued突出延续，不能额外补成only断言他们只做一类研究。", "paragraph-role", "passage-logic", { hintWords: ["continued", "old", "on the other hand"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s12": [
    link("make-result", "辨明to make内部的对象、状态和受影响者。", [["entrance to professional geological journals", "make的宾语"], ["harder", "宾语补足语"], ["for amateurs", "难度的受影响者"]], "to make entrance to professional geological journals harder for amateurs", "变难的是期刊准入；amateurs在for后说明对谁而言。to make全组是has been后的表语，说明结果是什么。", "object-complement", "attachment", { hintWords: ["make", "entrance", "harder", "for"] }),
    order("refereeing-order", "依原文排列审稿制度引入的先后。", ["十九世纪全国性期刊", "二十世纪若干地方地质学期刊"], ["二十世纪所有地方期刊"], "first by national journals in the nineteenth century", "first与then限定先后，several保留若干而不是所有。两个by补充introduction的引入者。", "time-reference", "tense", { hintWords: ["first", "then", "several"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s13": [
    choice("appeared-aimed", "have now appeared aimed...中哪一部分承担限定时态？", ["have appeared", "appeared aimed合成被动", "towards either professional"], 0, "have now appeared aimed mainly towards", "appear不及物，have appeared是完成时谓语；aimed过去分词后置修饰journals，不是这里的第二个限定谓语。", "finite-predicate", "predicate", { hintWords: ["have", "appeared", "aimed"] }),
  ],
  "2001-p1-s14": [
    link("two-to", "把两处to的性质对应起来。", [["led to professional geologists coming together", "介词to：后接动名词结构"], ["tended either to remain", "不定式to：后接动词原形"]], "has led to professional geologists coming together", "lead to以介词连接结果，geologists是coming的逻辑主语；tend to do以不定式补足倾向行为。", "nonfinite-subject", "attachment", { hintWords: ["to", "led", "coming", "tended"] }),
    choice("amateur-options", "whereas后是否说业余者没有地方学会？", ["不是：可留在地方，也可用不同方式全国联合", "是：只剩全国学会", "是：任何学会都不再存在"], 0, "either to remain in local societies or to come together nationally", "either/or保留两个选择；第22题D把地方学会否定掉，与remain in local societies直接冲突。", "negation-contrast", "option-logic", { hintWords: ["either", "or", "remain", "local"], mapRevealsAnswer: true }),
  ],
  "2001-p1-s15": [
    link("process-consequence-time", "分别给过程与完整后果匹配原文世纪。", [["过程已充分展开", "十九世纪"], ["完整后果较晚显现", "二十世纪"]], "its full consequences were thus delayed until the twentieth century", "Although承认过程早已展开，再突出后果较晚出现；不能把后果时间改写成过程才开始的时间。", "time-reference", "tense", { hintWords: ["Although", "under", "way", "consequences", "until"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2001-p1-map", taskId: "time-scope" }] }),
  ],
  "2001-p1-s16": [
    choice("general-scope", "本句十九世纪关键期判断与上句二十世纪是否矛盾？", ["不矛盾：总体关键期与地质学完整后果的范围和事件不同", "矛盾：作者把同一事件写了两个日期", "矛盾：however否定了全部地质学史"], 0, "In science generally", "generally从英国地质学扩到整个科学；must be reckoned表达历史地位评价，不能把它理解成一条法规要求。", "comparison-scope", "passage-logic", { hintWords: ["generally", "however", "reckoned"], mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: "2001-p1-map", taskId: "time-scope" }] }),
  ],
};
