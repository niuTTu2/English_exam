import type { SentenceWordContext } from "./contextual-vocabulary";
import type { WordKnowledge } from "./knowledge-base";
type Entry = { context: SentenceWordContext; knowledge: WordKnowledge };
const w = (partOfSpeech: string, meaning: string, pattern: string, rule: string, preferredCollocations?: string[]): Entry => ({ context: { partOfSpeech, contextualMeaning: meaning, use: rule, preferredCollocations }, knowledge: { grammarRole: partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning, rule }] } });
// 每项由当前正文或题目来源逐项审定；保留共用词元，不跨来源替换用法。
const sources: Record<string, Record<string, Entry>> = {
"2001-cloze-s1": {
"be": w("aux./v.（安排结构）","计划；按安排将","is to ban","be to do表示官方拟采取的行动，不是普通系表判断。"),
"to": w("不定式标记／prep.","引出计划动作；给","is to ban / payments to witnesses / seeking to buy up","ban与buy前to引不定式，witnesses前to为介词说明付款对象。",["payments to witnesses"]),
"by": w("prep.（名词补足）","由","payments by newspapers","by说明付款施事是报纸媒体，补足payments，不修饰witnesses。"),
"seek": w("v.（现在分词）","寻求；试图","newspapers seeking to buy up people","seeking后置修饰newspapers，其执行者为媒体，不是主句政府。",["seeking to buy up people"]),
"involve": w("v.（过去分词）","涉及；卷入","people involved in prominent cases","involved后置限定people，不是有限谓语。",["involved in prominent cases"]),
"as": w("prep.（举例表达中）","例如","such as the trial","as与such共同引出案件例子，不是时间从句。",["such as the trial of Rosemary West"]),
},
"2001-cloze-s2": {
"in": w("prep.（背景）","在……举措中","In a significant tightening","介词短语给出收紧监管的背景，不说明物理地点。"),
"tighten": w("n.（动词名词化）","收紧","a significant tightening of legal controls","tightening受冠词和形容词限定，作名词中心，不是句子谓语。",["tightening of legal controls"]),
"over": w("prep.","对……","controls over the press","over补足controls对象新闻界，不是遍及某地。",["controls over the press"]),
"press": w("n.（集合）","新闻界；报界","the press","press在over后作名词，指新闻媒体，不是动词按压。",["controls over the press"]),
"that": w("pron.（关系代词）","引出限定法案或报道的内容","bill that will propose / publicity that can be given","两处that均为关系从句主语，分别承接bill和publicity；不是名词内容从句连接词。"),
"make": w("v.（动名词）","使；把……定为","making payments to witnesses illegal","making为propose的动名词宾语，payments为其宾语、illegal为其宾补。",["propose making payments to witnesses illegal"]),
"be": w("aux.（被动）","可被……","can be given to a case","be与given构成被动，publicity是给予案件的报道，不作系表分析。"),
"to": w("prep.","给；向","payments to witnesses / given to a case","两处to都引出接受对象，分别为证人与案件，不是不定式。"),
"before": w("conj.","在……之前","before a trial begins","before后有完整主谓，给出可报道的庭前时间边界。",["before a trial begins"]),
},
"2001-cloze-s3": {
"he": w("pron.","他（Irvine）","he agreed with a committee report","回指写信的大法官，不是收信人Kaufman。"),
"with": w("prep.","同意……","agreed with a committee report","with补足agree的观点来源报告，不是with宾语加分词结构。",["agreed with a committee report"]),
"which": w("pron.（关系代词）","引出报告的结论","report ... which said","which承接report作said主语，不回指距离更近的year。"),
"that": w("conj.（内容连接词）","引出报告所说内容","said that self regulation did not offer sufficient control","that不充当从句主宾语，self regulation为内部主语。"),
"do": w("aux.（过去时否定）","构成否定","did not offer","did承担过去时，offer保持原形，不是强调肯定句。"),
"control": w("n.","监管；控制力","offer sufficient control","control为offer的名词宾语，sufficient限制是否足够，不是动词。",["offer sufficient control"]),
"to": w("prep.","给","a letter to Gerald Kaufman","to说明信的收件人，不是不定式。",["in a letter to Gerald Kaufman"]),
},
"2001-cloze-s4": {
"come": w("v.（过去式）","发生","Publication ... came two days after","came说明公开事件发生的时间，不是信件自行走来。",["publication of the letter"]),
"after": w("conj.","在……之后","two days after Lord Irvine caused a storm","after引出完整事件从句，two days表示两个事件相隔时长，不是抗议持续时间。"),
"when": w("conj.","当……时","when he said","when给引发抗议的表态时间，其后said另带完整内容从句。"),
"contain": w("v.（过去分词）","载于；包含于","controls contained in European legislation","contained后置修饰controls，没有独立时态，不能替代would be left。",["privacy controls contained in European legislation"]),
"be": w("aux.（被动）","将被……","would be left","be left为被动，解释工作被交给法官，不是离开。",["be left to judges"]),
"leave": w("v.（过去分词）","交由；留给","would be left to judges","leave A to B表示把A交由B处理，此处为被动。",["be left to judges"]),
"to": w("prep.","交给","to judges rather than to Parliament","两个平行介词短语给出选择和排除的承接者，to后为名词。",["rather than to Parliament"]),
"rather": w("adv.（取舍表达中）","而是；而不是","rather than to Parliament","rather than排除议会，选定前面的法官，并非相当的程度副词。",["rather than to Parliament"]),
},
"2001-cloze-s5": {
"which": w("pron.（关系代词）","引出法案的补充说明","Bill, which makes ...","which回指Bill，作makes主语，不能回指Convention或introduction。"),
"make": w("v.（第三人称单数）","使","makes the Convention legally binding","makes接Convention宾语和binding宾补，与主句said、内层laid down分开。",["makes the European Convention on Human Rights legally binding"]),
"binding": w("adj.","有约束力的","legally binding","binding为宾补，说明Convention的法律效力，不是进行时分词谓语。",["makes the European Convention on Human Rights legally binding"]),
"lay": w("v.（过去式）","规定","laid down that ...","lay down在法律报道中指正式规定，不能按放下物品理解。",["laid down that"]),
"that": w("conj.（内容连接词）","引出规定内容","laid down that ... and that ...","两个that从句并列作laid down宾语，that不作内部主语。"),
"be": w("v.（系动词）","享有某种权利","everybody was entitled to privacy","was接entitled状态表语，to privacy给权利内容。"),
"to": w("prep.／不定式标记","对……；去往；为了","entitled to privacy / go to court / to protect","privacy和court前to为介词；protect前to引目的不定式。",["was entitled to privacy"]),
"figure": w("n.（复数）","人物","public figures","figures指公众人物，不是数据、体形或图示。",["public figures"]),
"right": w("n.（复数）","权利","Human Rights","法律文件名称中的rights指人的权利，不是正确或右侧。"),
"themselves": w("pron.（反身）","他们自己","protect themselves and their families","回指public figures，与their families并列作protect宾语。"),
},
"2001-cloze-s6": {
"be": w("v.（系动词）","处于","will be in safe hands","be接介词短语表语描述可靠掌管的状态，无被动分词。",["be in safe hands"]),
"with": w("prep.（负责者）","由；交由","in safe hands with our British judges","with说明掌管者，既不是with复合结构，也不是带宾语的被动施事。",["with our British judges"]),
"hand": w("n.（复数，习语）","掌管；照管","in safe hands","hands借代负责者的照管能力，整组表示获得可靠照管，不按手部器官直译。",["be in safe hands"]),
"he": w("pron.","他（大法官）","he said","引语后的he回指Lord Irvine，明确观点归属。"),
},
"2001-cloze-s7": {
"become": w("v.（系动词过去式）","成为","became an issue","become接名词表语说明付费做法变成争议，不是及物动词接宾语。",["became an issue"]),
"issue": w("n.","争议问题","an issue","issue为became表语，指需处理的问题，不是期刊期号或动词发布。",["became an issue"]),
"after": w("conj.","在……之后","after West was sentenced","时间从句说明付款引起争议的背景，不是未来计划。"),
"be": w("aux.（被动）","被……","was sentenced","was接sentenced为被动，不是系表状态。"),
"sentence": w("v.／n.（复数）","判刑；刑期","was sentenced to 10 life sentences","sentenced为动词过去分词，sentences为名词复数；同一词元按实际词位区别，不作语法句子义。",["was sentenced to 10 life sentences"]),
"to": w("prep.","判处","sentenced to 10 life sentences","to引出所判刑罚，为介词，不是不定式。",["was sentenced to 10 life sentences"]),
},
"2001-cloze-s8": {
"up": w("adv.（数量表达中）","达到某上限","Up to 19 witnesses","up to整体表示最多达到19，不是至少19，也不是向上方向。",["up to 19 witnesses"]),
"to": w("prep.／不定式标记","到；引出报道内容；给","up to 19 / said to have received / stories to newspapers","三处to分别为数量上限、完成不定式、故事接收者，不能一律按目的不定式。",["were said to have received payments"]),
"be": w("aux.（被动）","据说","were said to have received","were与said构成报道被动，不是证人被命令做事。",["were said to have received payments"]),
"say": w("v.（过去分词）","据说；报道","were said to have received","say的被动带完成不定式，叙述此前已收款的报道，保留据说这一来源限定。",["were said to have received payments"]),
"have": w("aux.（完成不定式）","构成此前已经……","to have received payments","have received属于完成不定式，无独立限定时态；收款早于报道。",["were said to have received payments"]),
"for": w("prep.（报酬缘由）","由于；作为……的报酬","payments for telling their stories","for接动名词，说明取得款项所交换的讲述。",["payments for telling their stories"]),
"tell": w("v.（动名词）","讲述","telling their stories to newspapers","telling接stories宾语、to newspapers听者，执行者为witnesses。",["telling their stories to newspapers"]),
"their": w("det.（物主限定词）","他们的（证人的）","their stories","回指收款的witnesses，不是报社自己的故事。"),
},
"2001-cloze-s9": {
"concern": w("n.（复数）","担忧","Concerns were raised","concerns为被提出的担忧，不是动词涉及。"),
"raise": w("v.（过去分词）","提出","Concerns were raised","raise concerns意为提出担忧，此处被动没有具名施事。",["concerns were raised"]),
"that": w("conj.（内容连接词）","引出担忧内容","Concerns were raised that ...","that从句补足Concerns命题，被谓语隔开；内部主语为witnesses，that不充当关系主语。"),
"be": w("aux.（被动）","被……","were raised / might be encouraged","两处be分别构成过去时被动和情态被动，后者仍保留might的可能性。"),
"encourage": w("v.（过去分词）","鼓励；诱导","might be encouraged exaggerate（原卷）","规范结构为be encouraged to exaggerate；原卷漏印to，保留文字而在教学中明确，不把裸动词当正确补足。",["might be encouraged exaggerate"]),
"may": w("modal v.","可能","might be encouraged","表示担忧中的可能风险，不表示证人一定已被诱导。"),
"to": w("不定式标记","为了","to ensure guilty verdicts","原文实际to位于ensure前，引出夸大讲述的目的；encouraged后缺的to仅在规范说明中补示。",["ensure guilty verdicts"]),
"ensure": w("v.","确保；促成","ensure guilty verdicts","ensure接结果名词，强调使有罪裁决发生，不是向人作口头保证。",["ensure guilty verdicts"]),
},
};
sources["question-200102-option-A"] = { "tighten": w("n.（名词化）","收紧","tightening","在本空为a significant后的名词中心，of接监管对象。") };
sources["question-200102-option-B"] = { "intensifying": w("v.-ing","加强；加剧","intensifying","intensifying表示加强；当前名词搭配更自然为a tightening of controls或intensification，不能说所有动名词都不能受冠词限定。") };
sources["question-200102-option-C"] = { "focusing": w("v.-ing/n.","聚焦","focusing","表示集中注意或焦点，常与on搭配，不表达监管收紧。") };
sources["question-200102-option-D"] = { "fastening": w("v.-ing/n.","扣紧；固定","fastening","通常关于扣紧固定物件，与legal controls的政策力度不合。") };
sources["question-200103-option-A"] = { "sketch": w("n.","草图；概略","sketch","候选名词可用于修饰某些名词，但本空正式法案草案用draft bill。") };
sources["question-200103-option-B"] = { "rough": w("adj.","粗略的；粗糙的","rough","候选形容词说明粗略程度，不是法案草案的规范名称。") };
sources["question-200103-option-C"] = { "preliminary": w("adj.","初步的；预备的","preliminary","可修饰名词表示初步性质，本题draft bill为惯用术语。") };
sources["question-200103-option-D"] = { "draft": w("n.（名词定语）","草案","draft bill","draft在bill前作名词定语，说明法案尚属草案阶段。") };
sources["question-200104-option-A"] = { "illogical": w("adj.","不合逻辑的","illogical","候选形容词可占宾补位置，但它评价逻辑，不是违法性质。") };
sources["question-200104-option-B"] = { "illegal": w("adj.","违法的","make payments illegal","作making的宾补，说明付款将被规定为违法。") };
sources["question-200104-option-C"] = { "improbable": w("adj.","不大可能的","improbable","评价可能性而非合法性，不能回答本法案的禁止目标。") };
sources["question-200104-option-D"] = { "improper": w("adj.","不适当的","improper","可作宾补，但不适当弱于illegal所给的法律禁止。") };
sources["question-200105-option-A"] = { "publicity": w("n.（不可数）","公开报道；曝光","amount of publicity","媒体给予案件的曝光量，与amount of和give to搭配。") };
sources["question-200105-option-B"] = { "penalty": w("n.","处罚","penalty","此词指惩罚，不是公开报道量，不能仅凭法律领域就选入。") };
sources["question-200105-option-C"] = { "popularity": w("n.（不可数）","受欢迎程度","popularity","受欢迎与媒体曝光是不同概念。") };
sources["question-200105-option-D"] = { "peculiarity": w("n.","特性；古怪之处","peculiarity","指独特性质，不是可给予案件的报道量。") };
sources["question-200106-option-A"] = { "since": w("conj.","自从；因为","since a trial begins","候选连词有时间或原因义，本题需要庭前边界。") };
sources["question-200106-option-B"] = { "if": w("conj.","如果","if a trial begins","会引条件而非开庭前这一时间限制。") };
sources["question-200106-option-C"] = { "before": w("conj.","在……之前","before a trial begins","接完整从句，限定被讨论报道处于开庭之前。") };
sources["question-200106-option-D"] = { "as": w("conj.","当……时；因为","as a trial begins","在候选位置可引时间等关系，不能沿用正文such as的举例义。") };
sources["question-200107-option-A"] = { "side": w("v.（过去式）","站在……一边","sided with","常接人或立场一方；本题report为观点文件，agree with更合适。") };
sources["question-200107-option-B"] = { "share": w("v.（过去式）","共享；认同","shared","认同观点通常直接接view/opinion；不能用shared with a report表达赞同报告。") };
sources["question-200107-option-C"] = { "comply": w("v.（过去式）","遵守","complied with","可接with，但对象通常规则或要求，区别同意观点。") };
sources["question-200107-option-D"] = { "agree": w("v.（过去式）","同意","agreed with a report","with接报告这一观点来源，不是与报告达成合同。") };
sources["question-200108-option-A"] = { "present": w("v.","呈现；呈交","present sufficient control","在did not后为候选动词原形，不是形容词在场的或名词礼物。") };
sources["question-200108-option-B"] = { "offer": w("v.","提供","offer sufficient control","实义动词接control，表示自律机制提供监管作用。") };
sources["question-200108-option-C"] = { "manifest": w("v.","显示；显露","manifest","候选位置为动词原形，不是形容词明显的；显示不等于提供效果。") };
sources["question-200108-option-D"] = { "indicate": w("v.","表明；指出","indicate","表示显示信息，不是提供监管能力。") };
sources["question-200109-option-A"] = { "release": w("n.","发布；公开","Release of the letter","选项首字母大写因处句首；名词release也可用于公开文件，不是绝对语法错误。") };
sources["question-200109-option-B"] = { "publication": w("n.","发表；公开","Publication of the letter","事件名词作came主语，说明信件内容被发表。") };
sources["question-200109-option-C"] = { "printing": w("n.","印刷","Printing of the letter","只表印制动作，不必然表示向公众发表。") };
sources["question-200109-option-D"] = { "exposure": w("n.","暴露；曝光","Exposure of the letter","公开问题或事物被暴露，与发表信件这一事件的惯常表达不同。") };
sources["question-200110-option-A"] = { "storm": w("n.（比喻）","一阵强烈反应","a storm of protest","比喻大量猛烈抗议，不是天气。") };
sources["question-200110-option-B"] = { "rage": w("n.","暴怒","rage","通常描述愤怒情绪，不是a storm of protest这一数量比喻。") };
sources["question-200110-option-C"] = { "flare": w("n.","火光；突发闪耀","flare","本空冠词后为名词候选，不能直接当动词爆发；惯常表达为a storm of protest。") };
sources["question-200110-option-D"] = { "flash": w("n.","闪光；一瞬","flash","短暂闪现不同于大规模强烈抗议。") };
sources["question-200111-option-A"] = { "translation": w("n.","翻译","translation","指语际转换，不是本题法规含义的司法解释。") };
sources["question-200111-option-B"] = { "interpretation": w("n.","解释；阐释","interpretation of privacy controls","法规条文的释义工作，交给法官处理。") };
sources["question-200111-option-C"] = { "exhibition": w("n.","展览；展示","exhibition","公开陈列的活动，不等于解释法规。") };
sources["question-200111-option-D"] = { "demonstration": w("n.","示范；证明；示威","demonstration","这些义项都不表达此处交由法官完成的法规解释。") };
sources["question-200113-option-A"] = { "change": w("v.（第三人称单数）","改变","changes","本空需要make宾语加形容词补语的自然组合，不能直接changes the Convention binding。") };
sources["question-200113-option-B"] = { "make": w("v.（第三人称单数）","使","makes the Convention legally binding","Convention为宾语，binding为宾补，which为makes主语。") };
sources["question-200113-option-C"] = { "set": w("v.（第三人称单数）","设置；使处于","sets","set可有某些固定宾补，如set free，但set a convention binding不是当前法律效力搭配。") };
sources["question-200113-option-D"] = { "turn": w("v.（第三人称单数）","转变","turns","本位置不是turn into结构，也不如make A binding自然。") };
sources["question-200114-option-A"] = { "binding": w("adj.","有约束力的","legally binding","形容词作宾补，不是进行时。") };
sources["question-200114-option-B"] = { "convincing": w("adj.","有说服力的","convincing","描述使人信服，不等于法律效力。") };
sources["question-200114-option-C"] = { "restraining": w("adj./分词","约束的；限制的","restraining","可表达限制作用，但本题法律约束力惯用binding。") };
sources["question-200114-option-D"] = { "sustain": w("adj./分词","维持的；支持的","sustaining","原词形sustaining作候选补足性质，不是在本空承担独立时态的谓语。") };
sources["question-200115-option-A"] = { "authorize": w("v./adj.（过去分词）","授权的；获准的","authorized","通常authorized to do说明获准行为；privacy为名词权利内容。") };
sources["question-200115-option-B"] = { "credit": w("v.（过去分词）","归功于；被认为具有","credited","常与with搭配，不能代替entitled to privacy的享有权利义。") };
sources["question-200115-option-C"] = { "entitle": w("adj./过去分词","有权享有的","entitled to privacy","was后的状态补足，to为介词并接名词privacy。") };
sources["question-200115-option-D"] = { "qualify": w("adj./过去分词","有资格的","qualified","强调具备条件或资格，不是everybody享有的普遍隐私权。") };
sources["question-200116-option-A"] = { "with": w("prep.","由；交由","in safe hands with judges","with说明负责照管者，无with宾语加分词复合结构。") };
sources["question-200116-option-B"] = { "to": w("prep.","向；给","to our British judges","后面是人名词组，若选to是介词而非不定式；与in safe hands的负责者表达不合。") };
sources["question-200116-option-C"] = { "from": w("prep.","从；来自","from our British judges","给来源方向，不能代替可靠掌管者的with。") };
sources["question-200116-option-D"] = { "by": w("prep.","由","by our British judges","本句没有被动分词，不能因will be就套用by引动作施事。") };
sources["question-200117-option-A"] = { "impact": w("n.","影响；冲击","impact","题干became an后需名词表语，impact不能自然概括付费做法成了争议。") };
sources["question-200117-option-B"] = { "incident": w("n.","事件","incident","指具体事件，区别本题一种做法成为公共问题。") };
sources["question-200117-option-C"] = { "inference": w("n.","推论","inference","指推理所得结论，不是付款问题。") };
sources["question-200117-option-D"] = { "issue": w("n.","争议问题","became an issue","issue作名词表语，不是期刊期号或动词发行。") };
sources["question-200118-option-A"] = { "state": w("v.（过去分词）","陈述；声明","were stated to have received","正式英语中该结构并非绝对不成立；当前普通新闻转述使用核验答案said。") };
sources["question-200118-option-B"] = { "remark": w("v.（过去分词）","评论；谈及","remarked","可引评论，但不是本题sb be said to have done这一惯常报道结构。") };
sources["question-200118-option-C"] = { "say": w("v.（过去分词）","据说；报道","were said to have received","与were构成报道被动，to have received给出先于报道的动作。") };
sources["question-200118-option-D"] = { "tell": w("v.（过去分词）","告知；吩咐","were told to have received","be told to do通常为受指令做事，不等于据说已经收到报酬。") };
sources["question-200119-option-A"] = { "what": w("pron./连接词","什么；所……的内容","what witnesses ...","what需要在名词性从句内承担成分，本空命题已有主语与动作对象。") };
sources["question-200119-option-B"] = { "when": w("conj./adv.","当……时；何时","when witnesses ...","时间连接不能给Concerns补出所担忧的命题内容。") };
sources["question-200119-option-C"] = { "which": w("pron.","哪一个；引出关系","which witnesses ...","which若作关系词须承担内部成分，本题需要不占成分的内容连接词that。") };
sources["question-200119-option-D"] = { "that": w("conj.（内容连接词）","引出担忧内容","Concerns were raised that ...","that解释concerns，内部witnesses为主语；不把原卷另一处缺to混成连接词问题。") };
sources["question-200120-option-A"] = { "assure": w("v.","向……保证","assure","常见结构assure somebody that...，本空直接给结果名词，更宜ensure。") };
sources["question-200120-option-B"] = { "confide": w("v.","吐露秘密；信赖","confide","表达向人倾诉或信赖，不是使裁决发生。") };
sources["question-200120-option-C"] = { "ensure": w("v.","确保；促成","ensure guilty verdicts","直接接结果名词，说明夸大讲述的目的。") };
sources["question-200120-option-D"] = { "guarantee": w("v.","保证；担保","guarantee guilty verdicts","guarantee可接结果名词，不是语法错误；此题突出促成结果，核验答案为ensure。") };
(sources["question-200101-option-A"] ??= {})["as"] = w("prep.（固定表达中）","关于","as to","as to整体表示关于；此处候选表达不是举例。");
(sources["question-200101-option-A"] ??= {})["to"] = w("prep.（固定表达中）","关于所及对象","as to","与as组成关于，不引不定式。");
(sources["question-200101-option-B"] ??= {})["for"] = w("prep.（固定表达中）","用以举例","for instance","for与instance组成例如这一插入表达，不是目的从句。");
(sources["question-200101-option-B"] ??= {})["instance"] = w("n.","例子","for instance","instance为例子，整体for instance通常作插入性举例。");
(sources["question-200101-option-C"] ??= {})["in"] = w("prep.（固定表达中）","在特定方面","in particular","整组表示尤其、特别是。");
(sources["question-200101-option-C"] ??= {})["particular"] = w("adj.（固定表达中）","特定的","in particular","particular与in组成尤其这一表达，不是此处独立定语。");
(sources["question-200101-option-D"] ??= {})["such"] = w("det.（举例表达中）","这样的","such as","与as共同引出前面类别的例子。");
(sources["question-200101-option-D"] ??= {})["as"] = w("prep.（举例表达中）","例如","such as","such as后直接接名词例子。");
(sources["question-200112-option-A"] ??= {})["good"] = w("adv./adj.（比较级）","更好","better than","better表示好坏比较，本空不是质量比较。");
(sources["question-200112-option-A"] ??= {})["than"] = w("比较连接词","比","better than","than接比较对象，与本题机构取舍不合。");
(sources["question-200112-option-B"] ??= {})["other"] = w("adj./pron.（固定表达中）","其他的","other than","other than常表示除……之外，不直接替代本句的rather than取舍。");
(sources["question-200112-option-B"] ??= {})["than"] = w("连接词（固定表达中）","除……之外","other than","与other组成例外表达，不是普通程度比较。");
(sources["question-200112-option-C"] ??= {})["rather"] = w("adv.（取舍表达中）","而不是","rather than","与than连接两个平行to介词组，选法官、排除议会。");
(sources["question-200112-option-C"] ??= {})["than"] = w("连接词（取舍表达中）","而不是","rather than","本题与rather组成取舍结构，不是数量比较。");
(sources["question-200112-option-D"] ??= {})["sooner"] = w("adv.（比较级）","更早；宁愿","sooner than","可以比较时间，也可在特定语境表示宁愿，当前be left to A rather than to B更直接自然。");
(sources["question-200112-option-D"] ??= {})["than"] = w("比较连接词","比","sooner than","与sooner构成比较表达，不能把所有sooner than都限定成时间用法。");
// 题干片段按实际出现的词位接入；不把被挖空的答案当作已给单词。
const promptUses: Array<[number, number, string[]]> = [
 [1,1,["as"]], [2,2,["tighten","over","press"]], [4,2,["make","to"]], [5,2,["that","be","to"]], [6,2,["that","be","to"]], [7,3,["he","with"]], [8,3,["do","control"]], [9,4,["come"]], [11,4,["contain"]], [12,4,["be","leave","to"]], [13,5,["which","right"]], [14,5,["make"]], [16,6,["be","hand"]], [17,7,["become"]], [18,8,["up","to","have"]], [19,9,["concern","raise","may","encourage","be"]], [20,9,["to"]],
];
for (const [question, sentence, words] of promptUses) {
 const entries: Record<string, Entry> = {};
 for (const word of words) entries[word] = sources[`2001-cloze-s${sentence}`][word];
 sources[`question-${200100+question}-prompt`] = entries;
}
// 第1/2题挖去的表达不产生虚构词条；保留其余真实功能词。
delete sources["question-200101-prompt"].as;
delete sources["question-200102-prompt"].tighten;
sources["question-200103-prompt"] = { introduce: w("v.", "提出；提交", "will introduce a ___ bill", "introduce的对象为法案，表示提出供审议，不是介绍某个人。") };
sources["question-200109-prompt"].after = w("conj.（片段中的时间连接词）", "在……之后", "came two days after...", "原题片段在after后省略后续内容；完整原句的参照事件为Irvine引发媒体抗议，先后关系为发表在后。");
sources["question-200110-prompt"] = { of: w("prep.", "……的；由……构成", "a ___ of media protest", "of把比喻数量名词与抗议反应连接，本空需与protest形成自然整体搭配。") };
sources["question-200115-prompt"] = { be: w("v.（系动词）", "处于某权利状态", "everybody was ___ to privacy", "was后待补表示资格或权利的性质，to后是名词privacy，不是动作。"), to: w("prep.", "对于；以……为权利内容", "___ to privacy", "privacy是名词，to在此为介词；判断候选词是否可带该名词补足。") };
sources["question-200118-prompt"].be = w("aux.（被动结构）", "构成报道被动", "witnesses were ___ to have received", "were后待补报道动词的过去分词，完成不定式说明更早收款，不把have看成该句有限谓语。");


sources["question-200104-prompt"].to = w("prep.", "给", "payments to witnesses", "to补足付款的接受者，witnesses为名词，不是不定式。");
for (const question of [200105, 200106]) {
 sources[`question-${question}-prompt`].that = w("pron.（关系代词）", "引出报道的限定", "publicity that can be given to a case", "此片段只有这一处that，承接报道publicity作can be given的主语。");
 sources[`question-${question}-prompt`].to = w("prep.", "给；关于", "given to a case", "to引出报道所涉及的案件，不是动词原形前的不定式。");
}
sources["question-200118-prompt"].to = w("prep.／不定式标记", "达到上限；引出此前动作", "Up to 19 / to have received payments", "第一处to属于数量上限up to；第二处to引完成不定式，说明收款先于报道。");
sources["question-200120-prompt"].to = w("不定式标记", "为了", "in court to ___ guilty verdicts", "to后待补动词原形，整组说明夸大讲述的目的；guilty verdicts为该动词的结果宾语。");

// 再审基础介词：of并非在所有名词后都表示数量。
sources["2001-cloze-s1"].of = w("prep.", "……的；关于……的", "the trial of Rosemary West", "of引出受审者姓名，补足trial，不是数量词结构。", ["such as the trial of Rosemary West"]);
sources["2001-cloze-s2"].of = w("prep.", "……的；……的数量", "tightening of controls / amount of publicity", "第一处of补足被收紧的监管制度，第二处of在amount of中引出报道这一不可数对象；两处功能不能合并成一种。", ["tightening of legal controls", "control the amount of publicity"]);
sources["2001-cloze-s3"].of = w("prep.", "……的", "chairman of the House of Commons media select committee", "of补足主席所属委员会；House of Commons是英国下议院名称，均不是数量范围。");
sources["2001-cloze-s4"].of = w("prep.", "……的；由……构成", "Publication of the letter / a storm of media protest / interpretation of privacy controls", "三处of分别给发表对象、抗议浪潮的内容和解释对象；只有storm一组涉及比喻数量。", ["publication of the letter", "a storm of media protest"]);
sources["2001-cloze-s5"].of = w("prep.", "……的", "introduction of the Human Rights Bill", "of引出被引入的法案，不是数量结构。", ["introduction of the Human Rights Bill"]);
sources["2001-cloze-s1"].in = w("prep.", "涉及；在……中", "people involved in prominent cases", "in补足involved涉及的案件，people为被限定对象。", ["involved in prominent cases"]);
sources["2001-cloze-s3"].in = w("prep.", "在……中", "In a letter to Gerald Kaufman", "in说明表达观点的载体是一封信，to则引出收件人。", ["in a letter to Gerald Kaufman"]);
sources["2001-cloze-s4"].in = w("prep.", "在……中", "contained in European legislation", "in补足contained，法规中载有隐私规定，不是主句事件发生的地点。", ["privacy controls contained in European legislation"]);
sources["2001-cloze-s4"].he = w("pron.", "他（Lord Irvine）", "when he said", "he回指引发媒体抗议的大法官，是when从句said的主语。");
sources["2001-cloze-s5"].on = w("prep.", "关于", "the European Convention on Human Rights", "on引出公约的主题人权，属于文件名称，不表示在物体表面。");
sources["2001-cloze-s5"].in = w("prep.", "在……范围内", "legally binding in Britain", "in Britain限定法律效力的地域，不能接成公约的制定地点。");
sources["2001-cloze-s5"].their = w("det.（物主限定词）", "他们的（公众人物的）", "their families", "their与themselves均回指public figures，区别前句报告中的人名。");
sources["2001-cloze-s6"].in = w("prep.（习语）", "处于……掌管之下", "in safe hands", "整组为will be的状态表语，hands不是实际双手的空间位置。", ["be in safe hands"]);
sources["2001-cloze-s7"].in = w("prep.（时间）", "在……年", "in 1995", "直接限定被判刑的年份，不能据此认定其他信件或法案事件都发生在1995年。");
sources["2001-cloze-s9"].in = w("prep.（场合）", "在……场合", "in court", "in court说明可能夸大讲述的法庭场合，修饰exaggerate，不修饰提出担忧。", ["exaggerate their stories in court"]);
sources["2001-cloze-s9"].their = w("det.（物主限定词）", "他们的（证人的）", "their stories", "their指witnesses，表示证人在法庭讲述的内容，担忧是内容可能受诱导夸大。");
sources["2001-cloze-s3"].do.context.preferredCollocations = ["offer sufficient control"];
sources["2001-cloze-s4"].after.context.preferredCollocations = ["publication of the letter"];
sources["2001-cloze-s7"].after.context.preferredCollocations = ["was sentenced to 10 life sentences"];
sources["2001-cloze-s1"].be.context.preferredCollocations = ["is to ban payments"];
sources["2001-cloze-s5"].be.context.preferredCollocations = ["was entitled to privacy"];
sources["2001-cloze-s7"].be.context.preferredCollocations = ["was sentenced to 10 life sentences"];
sources["2001-cloze-s9"].be.context.preferredCollocations = ["concerns were raised", "might be encouraged exaggerate"];
for (const [q, sentence] of [[1,1],[2,2],[5,2],[9,4],[11,4]] as const) sources[`question-${200100+q}-prompt`].of = sources[`2001-cloze-s${sentence}`].of;
sources["question-200101-prompt"].of = w("prep.", "……的", "the trial of Rosemary West", "of引出受审者，补足trial，不是数量结构。");
sources["question-200102-prompt"].of = w("prep.", "……的；以……为对象", "a significant ___ of legal controls", "of补足被加强或收紧的监管对象，前面并非数量词。");
sources["question-200105-prompt"].of = w("prep.（数量表达中）", "……的数量", "the amount of ___", "of在amount of中引出被衡量总量的名词，需按给案件的报道语境选择。");
sources["question-200109-prompt"].of = w("prep.", "……的", "___ of the letter", "of接动作或事件所涉及的信件，不是数量结构。");
sources["question-200111-prompt"].of = w("prep.", "以……为对象", "the ___ of privacy controls", "of给解释对象隐私法规，不是数量。");
sources["question-200111-prompt"].in = sources["2001-cloze-s4"].in;
sources["question-200113-prompt"].on = sources["2001-cloze-s5"].on;
sources["question-200114-prompt"].in = sources["2001-cloze-s5"].in;
sources["question-200116-prompt"].in = sources["2001-cloze-s6"].in;
sources["question-200120-prompt"].their = sources["2001-cloze-s9"].their;
sources["question-200120-prompt"].in = sources["2001-cloze-s9"].in;

export const cloze2001SourceContexts = Object.fromEntries(Object.entries(sources).map(([id, entries]) => [id, Object.fromEntries(Object.entries(entries).map(([word, entry]) => [word, entry.context]))]));
export function getCloze2001SourceKnowledge(headword: string, sourceId?: string): WordKnowledge | undefined { return sourceId ? sources[sourceId]?.[headword]?.knowledge : undefined; }
