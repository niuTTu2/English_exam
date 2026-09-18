import type { BeginnerClauseDetail, BeginnerSyntaxComponent, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
const c = (text: string, color: SyntaxVisualRole, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]) => ({ component: { text, form, function: fn, modifies, explanation, children }, color });
const child = (text: string, form: string, fn: string, modifies: string, explanation: string): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation });
const cl = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, details: Array<[string,string]>, translationOrder: string): BeginnerClauseDetail => ({ text,type,marker,role,subject,predicate,predicateDetails:details.map(([fn,value])=>({function:fn,text:value})),translationOrder });
const a = (id: string, text: string, trunk: string, parts: ReturnType<typeof c>[], meaning: string, focus: string, clauses: BeginnerClauseDetail[] = [], textKind: "sentence" | "phrase" = "sentence"): SentenceAnalysis => withReviewedSyntax({ id,number:0,text,trunk,textKind,beginnerSyntax:{components:parts.map(p=>p.component),clauses},layers:[{label:"读题关键",text:focus}],grammar:[focus],literal:meaning,natural:meaning,logic:"先确定本项实际命题；选入与否另看原文证据，语言成立不等于答案成立。",phrases:[] },parts.map(p=>p.color));
const p = (id: string,text: string,trunk: string,parts: ReturnType<typeof c>[],meaning: string,focus: string) => a(id,text,trunk,parts,meaning,focus,[],"phrase");

export const passage2012P1QuestionAnalysis: Record<number,QuestionAnalysis> = {
  21:{
    prompt:a("201221-prompt-analysis","It is implied in Paragraph 1 that nowadays homework____.","It is implied that nowadays homework____.",[
      c("It","subject","形式主语","主语","对应后置that内容","不指段落本身；要判断的是后面的命题。"),c("is implied","predicate","一般现在时被动","谓语","说明命题由原文暗示","imply是文本暗示，读者据此infer推断。"),c("in Paragraph 1","modifier","介词短语","来源范围状语","is implied","把证据限定在第一段。"),c("that nowadays homework____","subject","待选项补足的that内容从句","主语从句","对应It","nowadays限定当前评价，homework是内部主语；空格由选项提供谓语，不自行补写。")
    ],"第一段暗示，如今家庭作业……。","同时保留Paragraph 1和nowadays，寻找首段相较过去的态度变化。",[cl("that nowadays homework____","后置主语从句（待补全）","that","对应形式主语It","homework","____（由原卷选项补足）",[],"先理解第一段暗示，再判断如今作业受到什么评价。")]),
    options:{
      A:p("201221-A-analysis","is receiving more criticism","is receiving more criticism",[c("is receiving","predicate","现在进行时动词短语","待接主语的谓语部分","接题干homework","选项没有单独写主语；receive criticism是受到批评。"),c("more criticism","object","数量限定名词短语","宾语","receiving","more表示较多，criticism为批评而非偏爱。")],"正在受到更多批评。","more修饰批评数量或程度；receive不表示主动认可批评。"),
      B:p("201221-B-analysis","is gaining more preferences","is gaining more preferences",[c("is gaining","predicate","现在进行时动词短语","待接主语的谓语部分","接题干homework","gain表示获得。"),c("more preferences","object","名词短语","宾语","gaining","preference是偏爱喜好；原卷复数保留，不静默改写表达。")],"正在获得更多偏爱。","preference评价方向与criticism不同；语法阅读与证据判断分开。"),
      C:p("201221-C-analysis","is no longer an educational ritual","is no longer an educational ritual",[c("is no longer","predicate","系动词加否定时间表达","待接主语的系动结构","接homework","no longer表示以前是而现在不再。"),c("an educational ritual","complement","名词短语","表语","is","ritual在教育语境表示惯常执行的程序，并非只指宗教仪式。")],"不再是一项教育惯例。","no longer断言状态已经终止，比重新思考惯例强得多。"),
      D:p("201221-D-analysis","is not required for advanced courses","is not required",[c("is not required","predicate","否定被动动词短语","待接主语的谓语部分","接homework","表示不被要求，不是对计分比例设置例外。"),c("for advanced courses","modifier","介词短语","适用范围状语","is not required","在高级课程范围内无需作业。")],"在高级课程中不作要求。","for限定课程范围；required涉及作业要求，不能与权重限制混同。"),
    },
  },
  22:{
    prompt:a("201222-prompt-analysis","L.A. Unified has made the rule about homework mainly because poor students ____.","L.A. Unified has made the rule because poor students ____.",[
      c("L.A. Unified","subject","学区专名","主语","has made的施事","缩写对应洛杉矶联合学区。"),c("has made","predicate","现在完成时","谓语","说明已制定规则","不是还在建议。"),c("the rule about homework","object","名词短语","宾语","has made","about homework限定规则内容。",[child("about homework","介词短语","后置定语","rule","是关于作业的规则。")]),c("mainly","modifier","副词","重点范围状语","because原因","问主要原因，不是所有可能原因。"),c("because poor students ____","modifier","待补全原因从句","原因状语从句","has made","poor修饰学生经济处境，空格待选项补出实际情况。")
    ],"洛杉矶联合学区制定作业规则，主要因为贫困学生……。","mainly because要求找政策初衷，poor不表示智力或学习能力差。",[cl("because poor students ____","原因状语从句（待补全）","because","说明制定规则的主要原因","poor students","____（由选项补足）",[],"先理解谁制定什么，再补贫困学生面临的情况。")]),
    options:{
      A:p("201222-A-analysis","tend to have moderate expectations for their education","tend to have moderate expectations",[c("tend to have","predicate","tend加不定式","待接主语的动词结构","接poor students","tend to表示倾向，后接have的原形。"),c("moderate expectations for their education","object","名词短语","have的宾语","to have","moderate限定期望水平，for引期望对象。",[child("for their education","介词短语","期望对象补足语","expectations","their指贫困学生自己的教育。")])],"往往对自己的教育抱有不高的期望。","经济困难与期望水平是不同命题，不能凭常识替换。"),
      B:p("201222-B-analysis","have asked for a different educational standard","have asked for a different educational standard",[c("have asked","predicate","现在完成时动词短语","待接主语的谓语部分","接poor students","断言学生已经提出请求。"),c("for a different educational standard","complement","介词短语","请求对象补足语","asked","ask for表示要求获得，different为有别的标准，不只是困难不同。")],"已经要求采用不同的教育标准。","既包含请求行为，也包含标准不同；不能省掉行动者是谁。"),
      C:p("201222-C-analysis","may have problems finishing their homework","may have problems",[c("may have","predicate","情态动词结构","待接主语的谓语部分","接poor students","may保留可能，have problems是遇到困难。"),c("problems finishing their homework","object","名词短语含动名词补充","宾语","may have","finishing说明困难领域，执行者仍是学生。",[child("finishing their homework","动名词短语","困难领域补足语","problems","have problems doing表示做某事有困难。")])],"可能在完成作业方面遇到困难。","finishing与原文completing都表示完成；may与might保留非绝对范围。"),
      D:p("201222-D-analysis","have voiced their complaints about homework","have voiced their complaints",[c("have voiced","predicate","现在完成时动词短语","待接主语的谓语部分","接poor students","voiced为voice的动词形式：表达，不是嗓音名词。"),c("their complaints about homework","object","名词短语","宾语","have voiced","about homework限定抱怨内容，their指学生。")],"已经表达了对作业的不满。","作出投诉是实际行为命题，不等于客观存在完成困难。"),
    },
  },
  23:{
    prompt:a("201223-prompt-analysis","According to Paragraph 3, one problem with the policy is that it may____.","one problem is that it may____.",[
      c("According to Paragraph 3","modifier","介词性短语","证据来源状语","整句判断","将证据限定第三段。"),c("one problem with the policy","subject","名词短语","主语","is的主语","with说明问题属于政策，one只问其中一项。",[child("with the policy","介词短语","后置定语","problem","这里with表示关于或存在于，不是with独立结构。")]),c("is","predicate","系动词","谓语","连接问题与内容","表语为后面的that从句。"),c("that it may____","complement","待补全that从句","表语从句","说明one problem是什么","it指policy，may保留可能后果。")
    ],"按第三段，这项政策的一个问题在于它可能……。","may表达可能后果；选择必须保留政策造成的具体影响对象。",[cl("that it may____","表语从句（待补全）","that","说明问题的内容","it","may____（由选项补全）",[],"先译一个问题是，再补政策可能带来的影响。")]),
    options:{
      A:p("201223-A-analysis","result in students' indifference to their report cards","result in students' indifference",[c("result","predicate","动词原形","接情态动词的动作中心","接may","result in表示导致，结果放在in后。"),c("in students' indifference to their report cards","complement","介词短语含名词补足","结果补足语","result","indifference是冷漠；students'是所有格。",[child("to their report cards","介词短语","态度对象补足语","indifference","不关心的对象为学生自己的成绩单。")])],"导致学生漠不关心自己的成绩单。","indifference不是difference：前者态度冷淡，后者客观差异。"),
      B:p("201223-B-analysis","undermine the authority of state tests","undermine the authority",[c("undermine","predicate","动词原形","接情态动词的动作中心","接may","及物动词削弱，必须看受损对象。"),c("the authority of state tests","object","名词短语","宾语","undermine","authority为权威而非考试分数，of引所属对象。")],"削弱州统考的权威。","undermine之后明确是考试权威，不能换成作业激励。"),
      C:p("201223-C-analysis","restrict teachers' power in education","restrict teachers' power",[c("restrict","predicate","动词原形","接情态动词的动作中心","接may","restrict表示限制，不必是彻底取消。"),c("teachers' power in education","object","名词短语","宾语","restrict","power是教师在教育中的权力，范围比某个作业决策更宽。",[child("in education","介词短语","范围限定","power","限定到教育领域，未进一步限制作业判断。")])],"限制教师在教育中的权力。","原文确涉及教师判断；应比较此项范围与直接因果，不能说完全没有关联。"),
      D:p("201223-D-analysis","discourage students from doing homework","discourage students",[c("discourage","predicate","动词原形","接情态动词的动作中心","接may","削弱积极性，不等于正式禁止。"),c("students","object","复数名词","宾语","discourage","受到影响的人。"),c("from doing homework","complement","介词加动名词","行动领域补足语","discourage students","学生是doing的逻辑主语，from doing说明不愿做什么。")],"使学生不愿做作业。","discourage somebody from doing保持人、行为和激励下降三层关系。"),
    },
  },
  24:{
    prompt:a("201224-prompt-analysis","As mentioned in Paragraph 4, a key question unanswered about homework is whether____.","a key question is whether____.",[
      c("As mentioned in Paragraph 4","modifier","省略的as评注从句","引述范围状语","整句命题","原文省去可理解的主语与be，不补回英文；按第四段提到的内容判断。"),c("a key question unanswered about homework","subject","名词短语含后置修饰","主语","is的主语","中心question；unanswered表示尚未回答，about homework给主题。",[child("unanswered","过去分词性形容词","后置定语","question","没有回答不等于答案错误。"),child("about homework","介词短语","主题限定","question","疑问围绕作业。")]),c("is","predicate","系动词","谓语","连接问题与具体内容","whether引表语内容。"),c("whether____","complement","待补全whether从句","表语从句","说明未解决问题","whether表示是否，不能译成条件假设‘如果’。")
    ],"如第四段所述，关于作业尚未回答的一个关键问题是是否……。","whether引待判断的问题；a key question要求找段落核心变量。",[cl("As mentioned in Paragraph 4","省略的评注从句","As","说明判断来源","原文省略","mentioned（省略be）",[],"译作如第四段所述，不补造原文主语。"),cl("whether____","表语从句（待补全）","whether","说明问题内容","由选项提供","由选项提供",[],"译为是否，再接选项完整命题。")]),
    options:{
      A:a("201224-A-analysis","it should be eliminated","it should be eliminated",[c("it","subject","代词","主语","回指homework","对象是作业。"),c("should be eliminated","predicate","情态动词被动","谓语","说明作业是否应取消","eliminate为取消，不是减少一点。")],"作业是否应该被取消。","作为whether后的命题理解，should讨论应然而非已发生。"),
      B:a("201224-B-analysis","it counts much in schooling","it counts",[c("it","subject","代词","主语","回指homework","并非schooling本身。"),c("counts","predicate","一般现在时不及物动词","谓语","说明作业有无重要作用","count在这里为重要，不是数数或count for占比。"),c("much","modifier","程度副词","程度状语","counts","强调重要程度，不修饰一个名词宾语。"),c("in schooling","modifier","介词短语","领域状语","counts much","schooling是学校教育，不只考试分数。")],"作业在学校教育中是否有重要作用。","counts much与正文homework matters对应，须与计分权重义区别。"),
      C:a("201224-C-analysis","it places extra burdens on teachers","it places extra burdens",[c("it","subject","代词","主语","回指homework","作业作为带来负担的因素。"),c("places","predicate","一般现在时及物动词","谓语","说明施加负担","place ... on ...在此为把负担加于某人。"),c("extra burdens","object","名词短语","宾语","places","extra说明额外的，burdens为负担而非任何中性任务。"),c("on teachers","complement","介词短语","负担承受对象补足语","places extra burdens","受负担影响者是教师。")],"作业是否给教师带来额外负担。","问题涉及教师，而不是学生的家庭设备条件。"),
      D:a("201224-D-analysis","it is important for grades","it is important",[c("it","subject","代词","主语","回指homework","问作业的分数作用。"),c("is","predicate","系动词","谓语","连接it和important","主系表关系。"),c("important for grades","complement","形容词短语","表语","说明作业对成绩的重要性","for grades将范围限为成绩，不能等同全部教育意义。")],"作业对成绩是否重要。","grades与schooling的范围不同，是两个选项需对照的关键。"),
    },
  },
  25:{
    prompt:a("201225-prompt-analysis","A suitable title for this text could be____.","A suitable title could be____.",[
      c("A suitable title for this text","subject","名词短语","主语","could be的主语","中心title，suitable要求恰当概括，for this text限定全文。",[child("for this text","介词短语","后置定语","title","不是给单个段落取标题。")]),c("could be","predicate","情态动词加系动词","谓语","引出候选标题","could表示可采用的恰当标题。"),c("____","complement","待补标题","表语","由四个名词短语选项补足","标题本身无须包含主谓结构。")
    ],"本文一个恰当的标题可以是……。","全文标题同时核对对象、态度、覆盖范围，不只找重复原词。"),
    options:{
      A:p("201225-A-analysis","A Faulty Approach to Homework","A Faulty Approach",[c("A Faulty Approach","object","名词短语","标题中心","供could be后作表语","approach是处理办法，faulty评价有缺陷。"),c("to Homework","modifier","介词短语","处理对象补足语","Approach","to是介词，后接homework，不是不定式。")],"一种有缺陷的作业处理办法。","批评的是approach，而非断言homework本身毫无价值。"),
      B:p("201225-B-analysis","A Welcomed Policy for Poor Students","A Welcomed Policy",[c("A Welcomed Policy","object","名词短语","标题中心","供could be后作表语","Welcomed作过去分词性定语，表示受到欢迎；保留原卷拼写。"),c("for Poor Students","modifier","介词短语","服务对象限定","Policy","Poor说经济处境，不能读成能力差。")],"一项为贫困学生制定的受欢迎政策。","Welcomed带正面接受态度，与政策照顾谁是两项不同信息。"),
      C:p("201225-C-analysis","Thorny Questions about Homework","Thorny Questions",[c("Thorny Questions","object","名词短语","标题中心","供could be后作表语","thorny比喻棘手难解决，不是带刺的问卷。"),c("about Homework","modifier","介词短语","主题定语","Questions","限定讨论对象为作业。")],"关于家庭作业的棘手问题。","名词短语没有谓语；词语对应第四段，不自动代表全文中心。"),
      D:p("201225-D-analysis","Wrong Interpretations of an Educational Policy","Wrong Interpretations",[c("Wrong Interpretations","object","名词短语","标题中心","供could be后作表语","Wrong修饰Interpretations，错误落在解读而不是政策本身。"),c("of an Educational Policy","modifier","介词短语","被解读对象补足语","Interpretations","对象是一项教育政策。")],"对一项教育政策的错误解读。","要分清有问题的是政策还是别人的解读，形容词修饰对象决定标题命题。"),
    },
  },
};
