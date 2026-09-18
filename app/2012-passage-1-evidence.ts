import type { QuestionReasoning } from "./article-teaching";
const ids = (...numbers: number[]) => numbers.map(n => `2012-p1-s${n}`);
const e = (id: string, n: number, quote: string, role: string, strength: "直接证据" | "上下文推断" | "全文概括" = "直接证据") => ({ id, sentenceId: `2012-p1-s${n}`, quote, role, strength });
export const passage2012P1Reasoning: Record<number, QuestionReasoning> = {
  21: {
    questionType: "段落推断：态度变化", scope: "paragraph", restatement: "首段暗示如今家庭作业受到怎样的评价？", keyInstruction: "保留nowadays并比较长期不受欢迎与近年来的更强负面评价，不把政策例外误作取消作业。",
    locationPolicy: { revision: 1, paths: [{ id: "opening-attitude", label: "首句态度变化，可补政策背景", groups: [ids(1)], supportingSentenceIds: ids(2,3), maxSentences: 3 }] },
    evidence: [e("earlier",1,"has never been terribly popular with students and even many parents","长期不太受欢迎"),e("recent",1,"in recent years it has been particularly scorned","近期负面程度加强"),e("ritual",2,"this educational ritual","仍将作业称为教育惯例"),e("exception",3,"with the exception of some advanced courses","高级课程是计分上限例外"),e("weight",3,"count for more than 10% of a student's academic grade","限制对象是成绩比重")],
    paraphrases: [{ evidenceIds:["recent","earlier"], meaning:"particularly scorned表示受到更强轻视，可概括为更多批评。", optionText:"is receiving more criticism", relation:"同义转换", limit:"是评价趋势，未断言所有人都批评，也未说明作业被取消。" }],
    options: {
      A:{judgment:"选入",evidenceIds:["earlier","recent"],reasoning:"负面态度由不很受欢迎加深到尤其受鄙视，more criticism保留这一变化。"},
      B:{judgment:"排除",errorType:"与原文相反",evidenceIds:["recent"],reasoning:"gaining more preferences表示得到更多喜爱，与scorned评价方向相反。"},
      C:{judgment:"排除",errorType:"与原文相反",evidenceIds:["ritual"],reasoning:"作者仍称作业为教育惯例，反思惯例不能推出惯例已经不存在。"},
      D:{judgment:"排除",errorType:"偷换对象",evidenceIds:["exception","weight"],reasoning:"高级课程不受10%计分上限约束，不能偷换成不需要布置作业。"},
    }, transfer:"推断态度变化先看程度词与时间范围；相邻政策细节不能替换被问的评价对象。",
  },
  22: {
    questionType:"细节题：政策初衷",scope:"sentence",restatement:"制定该规则与贫困学生的哪种困难有关？",keyInstruction:"找is meant to对应的设计目的；区别作者担忧的后果与学生实际提出的要求。",
    locationPolicy:{revision:1,paths:[{id:"stated-purpose",label:"第4句直接给出目的",groups:[ids(4)],supportingSentenceIds:ids(3,5,7),maxSentences:3}]},
    evidence:[e("purpose",4,"This rule is meant to address the difficulty","规则意图"),e("difficulty",4,"students from impoverished or chaotic homes might have in completing their homework","家庭困难学生可能难以完成作业"),e("risk",7,"the implication that standards need to be lowered for poor children","作者警惕的暗示而非学生要求")],
    paraphrases:[{evidenceIds:["purpose","difficulty"],meaning:"might have difficulty in completing与may have problems finishing对应，均保留可能性。",optionText:"may have problems finishing their homework",relation:"同义转换",limit:"谈家庭条件造成的完成困难，不推断学生能力、教育期望或是否投诉。"}],
    options:{
      A:{judgment:"排除",errorType:"无中生有",evidenceIds:["difficulty"],reasoning:"贫困或混乱家庭说明完成条件，不证明这些学生教育期望较低。"},
      B:{judgment:"排除",errorType:"观点归属错误",evidenceIds:["risk"],reasoning:"降低标准是作者警惕的政策暗示；不是贫困学生提出区别标准的要求。"},
      C:{judgment:"选入",evidenceIds:["purpose","difficulty"],reasoning:"may与might、problems与difficulty、finishing与completing分别对应。"},
      D:{judgment:"排除",errorType:"无中生有",evidenceIds:["purpose","difficulty"],reasoning:"原文说规则旨在解决困难，没有记述贫困学生曾通过投诉促成规则。"},
    },transfer:"目的题把设计意图、作者推论和行动者请求分开；不要把贫困外推成心理或能力特征。",
  },
  23: {
    questionType:"段落细节：政策后果",scope:"paragraph",restatement:"第三段指出政策可能带来哪项问题？",keyInstruction:"抓低权重→少做作业代价低→动力下降这一明确链条；C与段末有关，但范围更宽，需比较贴合程度。",
    locationPolicy:{revision:1,paths:[{id:"grade-incentive",label:"第9句的权重与行为后果",groups:[ids(9)],supportingSentenceIds:ids(8,10,11,12),maxSentences:4}]},
    evidence:[e("weight",9,"homework counting for no more than 10% of their grades","完成作业的成绩激励被压低"),e("skip",9,"students can easily skip half their homework and see very little difference on their report cards","少做一半而分数变化很小"),e("tests",10,"Some students might do well on state tests without completing their homework","部分学生的考试情形，未评论考试权威"),e("teacher",12,"rather than empowering teachers to find what works best for their students","未给教师具体判断空间"),e("uniform",12,"the policy imposes a flat, across-the-board rule","一刀切的实际做法")],
    paraphrases:[{evidenceIds:["weight","skip"],meaning:"少做作业仍几乎不损失成绩，意味着完成作业的激励可能减弱。",optionText:"discourage students from doing homework",relation:"同义转换",limit:"may保留可能性；不是已观察到所有学生都拒绝作业。"}],
    options:{
      A:{judgment:"排除",errorType:"偷换对象",evidenceIds:["skip"],reasoning:"成绩单差异小不等于学生不在乎成绩；恰可能因为比较成绩代价才减少作业。"},
      B:{judgment:"排除",errorType:"无中生有",evidenceIds:["tests"],reasoning:"州统考只是考察作业有无帮助的参照，作者没有说政策削弱考试权威。"},
      C:{judgment:"排除",errorType:"范围扩大",evidenceIds:["teacher","uniform","skip"],reasoning:"段末确实批评教师难以因学生差异决定做法，本项并非毫不相关；但power in education泛指教育权力，D更直接且准确对应段内明确展示的作业激励问题。"},
      D:{judgment:"选入",evidenceIds:["weight","skip"],reasoning:"低权重让少做作业的成绩代价很小，合理推知完成动力可能下降，且保留题干may。"},
    },transfer:"相近选项不能简单说一项‘完全没提到’；比较具体对象、范围和原文因果链的直接程度。",
  },
  24: {
    questionType:"段落概括：未解决的核心问题",scope:"paragraph",restatement:"第四段认为应先回答作业在学校教育中是否重要。",keyInstruction:"把If ... unimportant与Conversely, if ... matters配对；教育价值是前提，作业量与计分权重是随后决定。",
    locationPolicy:{revision:1,paths:[{id:"two-value-branches",label:"联合第14、15句的相反条件",groups:[ids(14),ids(15)],supportingSentenceIds:ids(13,16),maxSentences:4}]},
    evidence:[e("unanswered",13,"addresses none of the truly thorny questions about homework","段落总评"),e("no-value",14,"If the district finds homework to be unimportant to its students' academic achievement","无教育价值的条件"),e("remove",14,"it should move to reduce or eliminate the assignments","该条件下的数量建议"),e("value",15,"if homework matters","有教育价值的相反条件"),e("grade",15,"it should account for a significant portion of the grade","该条件下的权重建议"),e("review",16,"than they are willing to review and correct","后续批改量保障问题")],
    paraphrases:[{evidenceIds:["no-value","value"],meaning:"对学业成就是否重要，概括为在学校教育中是否有重要作用；counts不是数数。",optionText:"it counts much in schooling",relation:"同义转换",limit:"不把schooling缩窄为grades，也不把取消作业这一条件性结果当成根本前提。"}],
    options:{
      A:{judgment:"排除",errorType:"范围过窄",evidenceIds:["no-value","remove"],reasoning:"取消只是作业无益时的一种选择；还有有益时提高权重的另一分支，不能替代共同价值前提。"},
      B:{judgment:"选入",evidenceIds:["no-value","value"],reasoning:"counts much表示有重要作用，schooling概括教育层面，涵盖两种条件分支都尚未判定的价值问题。"},
      C:{judgment:"排除",errorType:"把局部当全文",evidenceIds:["review","no-value","value"],reasoning:"教师批改负担相关，但属后面的质量、数量保障问题，不能代替本段先展开的教育价值判断。"},
      D:{judgment:"排除",errorType:"偷换对象",evidenceIds:["grade","no-value"],reasoning:"总成绩权重已在政策里规定，作者追问作业本身对教育是否重要，再据此决定权重。"},
    },transfer:"看到两个相反条件，寻找它们共同尚待判定的变量；不要把条件后的措施当成问题本身。",
  },
  25: {
    questionType:"全文标题",scope:"whole-passage",restatement:"哪一标题同时覆盖全文对象与作者态度？",keyInstruction:"全文对象是具体作业政策的方法缺陷；标题应覆盖初衷、激励、价值与改进，不只抄一个段落关键词。",
    locationPolicy:{revision:1,paths:[{id:"policy-criticism-route",label:"政策提出、主体批评与结尾建议共同概括",groups:[ids(3),ids(5,7),ids(9,12),ids(13,14,15,16),ids(17,18)],supportingSentenceIds:[],maxSentences:7}]},
    evidence:[e("policy",3,"Unfortunately, L.A. Unified has produced an inflexible policy","首段明确对象与态度","全文概括"),e("contradiction",5,"the policy is unclear and contradictory","第二段总评","全文概括"),e("uniform",12,"the policy imposes a flat, across-the-board rule","第三段一刀切批评","全文概括"),e("questions",13,"the policy addresses none of the truly thorny questions about homework","第四段未解决实质问题","全文概括"),e("hold",17,"The homework rules should be put on hold","结尾要求暂缓","全文概括"),e("repair",18,"not too late for L.A. Unified to do homework right","仍可改进具体做法","全文概括")],
    paraphrases:[{evidenceIds:["policy","contradiction","uniform","questions","hold"],meaning:"各段从不同方面评议具体政策的缺陷，概括为一种有问题的作业处理办法。",optionText:"A Faulty Approach to Homework",relation:"同义转换",limit:"faulty指办法不完善，不表示家庭作业本身必然无用或所有教育政策都错误。"}],
    options:{
      A:{judgment:"选入",evidenceIds:["policy","contradiction","uniform","questions","hold"],reasoning:"approach保留处理办法这一对象，faulty保留作者贯穿全文的批评态度，并容纳结尾改进。"},
      B:{judgment:"排除",errorType:"与原文相反",evidenceIds:["policy","contradiction"],reasoning:"照顾贫困学生是初衷，不等于作者欢迎这种政策；全文重点是指出缺陷。"},
      C:{judgment:"排除",errorType:"把局部当全文",evidenceIds:["questions","policy","hold"],reasoning:"thorny questions仅对应第四段论据，遗漏全文集中评议洛杉矶具体政策及其处理办法的主线。"},
      D:{judgment:"排除",errorType:"偷换对象",evidenceIds:["policy","uniform","hold"],reasoning:"作者批评政策本身的设计，不是在纠正别人对本来合理政策的误读。"},
    },transfer:"标题用‘对象＋态度＋范围’检查：局部词语高度重合，也可能概括不了全文论证。",
  },
};
