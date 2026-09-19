import type {ArticleGuide,PassageEvidence} from "./article-teaching";
const s=(n:number)=>`2012-p3-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2012P3Paragraphs=[[1,2,3,4,5],[6,7,8],[9,10,11,12,13,14],[15,16,17],[18,19,20,21],[22,23,24]].map((ns,i)=>({id:`2012-p3-paragraph-${i+1}`,sentenceIds:ns.map(s)}));
export const passage2012P3Guide:ArticleGuide={
practice:[
{id:"argument-voices",revision:1,kind:"link",prompt:"把专利争议中的说话者与观点配对。",options:["称裁决对企业和患者都是福音","主张自然产物不可专利、专利抑制创新及限制检测","提交DNA与棉纤维同为自然产物的类比"],answer:JSON.stringify(["称裁决对企业和患者都是福音","主张自然产物不可专利、专利抑制创新及限制检测","提交DNA与棉纤维同为自然产物的类比"]),links:[{source:"Myriad首席执行官",target:"称裁决对企业和患者都是福音"},{source:"Critics",target:"主张自然产物不可专利、专利抑制创新及限制检测"},{source:"Department of Justice",target:"提交DNA与棉纤维同为自然产物的类比"}],evidence:"Critics make three main arguments against gene patents",feedback:"这些观点有明确引述来源；作者报道争论与不确定性，不能把其中一方直接归为作者个人支持或批评。",conceptId:"author-voice",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(8),taskId:"company-and-voice"},{sentenceId:s(11),taskId:"critics-position"}]},
{id:"research-shift",revision:1,kind:"choice",prompt:"后两段研究与申请的重点发生什么变化？",options:["从单个DNA分子转向基因如何互动及其关联用途","从检测转向绘制基因图片","已经放弃全部专利申请"],answer:"从单个DNA分子转向基因如何互动及其关联用途",evidence:"Firms are now studying how genes interact",feedback:"原有DNA多数已受专利保护或在公有领域；新重心是基因关系，疾病原因和药效是可能用途，connecting the dots不是画图。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(20),taskId:"research-and-use"},{sentenceId:s(21),taskId:"reporting-inversion"}]},
{id:"historical-route",revision:1,kind:"order",prompt:"重建六段从旧争议到新焦点的路线。",options:["不可专利裁决震动产业","上诉推翻判决带来暂时宽慰","反对论点与政府改革意见","具体适用边界仍未明确","关联研究带来新专利焦点","其他诉讼与会议热度显示持续关切"],answer:JSON.stringify(["不可专利裁决震动产业","上诉推翻判决带来暂时宽慰","反对论点与政府改革意见","具体适用边界仍未明确","关联研究带来新专利焦点","其他诉讼与会议热度显示持续关切"]),evidence:"Each meeting was packed",feedback:"全文跟踪产业、法院和批评方的不同声音，结尾展示关注并非宣判哪方必胜；历史事件、相对日期和未来可能要分别看。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["argument-voices","research-shift"]},
],
route:["不可专利裁决震动产业","上诉推翻判决带来暂时宽慰","反对论点与政府改革意见","具体适用边界仍未明确","关联研究带来新专利焦点","其他诉讼与会议热度显示持续关切"],
mainIdea:"文章追踪基因专利历史争议：产业因不利裁决震动、因上诉结果暂宽慰，而自然属性、创新与检测可及性的反对意见和具体适用边界仍在；研究转向基因互动又带来新的诉讼与行业关切。多方观点均有归属，整体为客观报道而非作者替一方定论。",
paragraphs:[
{paragraphId:"2012-p3-paragraph-1",title:"不利判决与产业震动",summary:"长期为分离DNA授予专利的背景下，2010年3月一项不可专利裁决使企业高管不安；BIO将其称为长期较量中的初步阶段。",relation:"设定争议及企业期望，不把组织安抚当作者保证。"},
{paragraphId:"2012-p3-paragraph-2",title:"暂时逆转与企业评价",summary:"7月29日上诉法院推翻原判，允许Myriad持有两个基因专利；高管称其为企业和患者的福音。",relation:"给出暂时宽慰的原因，并保留发言来源与temporarily。"},
{paragraphId:"2012-p3-paragraph-3",title:"三项反对理由与改革声音",summary:"法院仍会忙碌，批评者从自然产物、创新及检测可及性三方面反对专利；联邦工作组促改革，司法部用棉纤维类比说明分离不改变自然属性。",relation:"展开与产业利益相对的论证，未把被引观点冒作作者表态。"},
{paragraphId:"2012-p3-paragraph-4",title:"裁决之后边界未明",summary:"整体基因组测序是否侵犯其中单个基因专利仍未解；该案还可能进入最高法院。",relation:"说明一次上诉裁决未终结所有适用疑问。"},
{paragraphId:"2012-p3-paragraph-5",title:"从单个分子转向互动关联",summary:"大量分子已获专利或处于公有领域，企业研究重心转向基因互动以及可能的查病因、预测药效用途，并希望为串联线索获专利。",relation:"从旧对象的争议推进到新研究与新申请空间。"},
{paragraphId:"2012-p3-paragraph-6",title:"关键诉讼与持续关注",summary:"梅奥诊所的相关诉讼可能影响申请成败；BIO关于专利环境变化的律师培训场次满座。",relation:"未来裁决的不确定与参与热度共同收束广受关注的争议。"},
],
sentenceRoles:Object.fromEntries([
"以2010年法官裁决给产业重大冲击开篇。","回顾此前数十年获专利实践，并给2005年约数。","明确2010年3月不可专利判决造成转折。","呈现企业高管不安而非积极活跃。","引BIO安抚，说明行业仍期待继续争取。","报告7月29日暂时宽慰，不补年份或最终胜利。","说明上诉法院推翻原判及两个基因的用途。","引高管对企业与患者受益的评价。","以医疗持续探索说明法院还会忙碌。","指出Myriad案很可能未结束。","独立列出批评者的自然属性、创新、可及性三论点。","提示认同批评者的人数似乎增加。","举联邦工作组敦促改革为制度回应。","引司法部以棉纤维说明分离仍属自然产物。","强调上诉裁决后仍有未答大问题。","用整体测序是否侵权举例界定未决疑问。","保留该案今后进入最高法院的可能。","过渡到其他诉讼可能更大的影响。","解释大量新DNA分子申请空间受限的背景。","明确新研究对象和关联的两类潜在用途。","引BIO律师用串联线索比喻新申请目标。","指出相关诉讼可能影响企业成败及下一审期安排。","报告律师培训会议及专利环境变化主题。","以满座细节显示对具体专利议题的高度关注。"
].map((role,i)=>[s(i+1),role])),
references:[
{expression:"its",sentenceId:s(1),referent:"America's biotech industry",targetSentenceIds:[s(1)],explanation:"被震动根基的是产业，不是法官。"},
{expression:"this",sentenceId:s(5),referent:"2010年3月不利判决",targetSentenceIds:[s(3)],explanation:"BIO把它放到更长争议中的初步位置。"},
{expression:"they",sentenceId:s(6),referent:"前段企业高管及行业一方",targetSentenceIds:[s(4),s(5)],explanation:"由先前不安到暂时宽慰，不指作判决的法官。"},
{expression:"the prior decision",sentenceId:s(7),referent:"基因不具备可专利性的先前裁决",targetSentenceIds:[s(3)],explanation:"推翻对象是裁决，不是两个基因本身。"},
{expression:"a company in Utah",sentenceId:s(8),referent:"Myriad",targetSentenceIds:[s(8)],explanation:"同位语解释公司，不把首席执行官当公司。"},
{expression:"it",sentenceId:s(11),referent:"第一处为gene，第二处为innovation",targetSentenceIds:[s(11)],explanation:"may not be patented与reward分句分别决定回指，不能一律解释同一对象。"},
{expression:"Myriad's",sentenceId:s(11),referent:"Myriad公司的genetic tests",targetSentenceIds:[s(11)],explanation:"所有格省略检测服务名词，不是说一个公司的基因。"},
{expression:"it",sentenceId:s(16),referent:"前者为形式主语，within it指whole genome",targetSentenceIds:[s(16)],explanation:"whether命题对应句首it，末尾介词宾语则实指整体基因组。"},
{expression:"most",sentenceId:s(19),referent:"human DNA molecules",targetSentenceIds:[s(19)],explanation:"多数分子已有专利或属于公有领域，不是多数公司。"},
{expression:"Their",sentenceId:s(22),referent:"希望取得关联专利的企业",targetSentenceIds:[s(20),s(21)],explanation:"申请成功不是律师个人案件胜利的泛称。"},
{expression:"which",sentenceId:s(22),referent:"a suit",targetSentenceIds:[s(22)],explanation:"最高法院hear审理的是诉讼，不能按距离误指Mayo Clinic。"},
{expression:"its",sentenceId:s(22),referent:"the Supreme Court",targetSentenceIds:[s(22)],explanation:"法院的next term为下一审期，不是基因术语。"},
{expression:"Each meeting",sentenceId:s(24),referent:"前句大会中介绍专利环境变化的专题场次",targetSentenceIds:[s(23)],explanation:"每场满座的对象有明确主题，不能泛化为所有律师大会。"},
],
timeline:[
{label:"裁决前背景",event:"过去完成时had won描述2010争议之前几十年的实践；by 2005给约20%这一数据的截止。两个时间范围不同，均不外推今天。",evidence:[e(2,"had won patents for isolated DNA for decades","此前长期实践"),e(2,"by 2005 some 20%","历史数据截止与约数")]},
{label:"2010年3月与7月29日",event:"March 2010原文给完整年月，July 29th只给月日；按文中叙事先不安后宽慰，但不自行添7月日期的年份。宽慰仅暂时。",evidence:[e(3,"in March 2010","明确年月"),e(6,"On July 29th","原文月日"),e(6,"at least temporarily","短时限定")]},
{label:"相对日期与后续可能",event:"Last year、October、now、recently、next term均按原文时点读，不改成读者今天；may yet可能与will hear报道安排分开。",evidence:[e(13,"Last year","相对过去"),e(14,"In October","未写年份的月份"),e(17,"may yet reach","后续可能"),e(22,"will hear in its next term","文中未来审理安排")]},
],
voices:[
{speaker:"企业与BIO",claim:"希望保有基因专利；BIO安抚败诉只是初步，高管认为有利裁决是福音。",boundary:"assured与said明确归属，不把企业受益判断视为作者证明。",evidence:[e(5,"assured members","组织安抚"),e(8,"said the ruling was a blessing","高管评价")]},
{speaker:"一审法官与上诉法院",claim:"文中前者否认可专利性，后者推翻原判并认可两个基因的专利。",boundary:"是不同时间、层级的裁决报道，不泛化成今天所有法域现行规则。",evidence:[e(3,"ruled that genes were unpatentable","初审裁定"),e(7,"overturned the prior decision","上诉逆转")]},
{speaker:"批评者与司法部",claim:"反对者提出三项理由；司法部用分离棉纤维类比说明DNA仍是自然产物。",boundary:"Critics与arguing标明来源。only man-made为题内必要条件概括，不说一切人造物都自动获专利。",evidence:[e(11,"Critics make three main arguments","批评来源"),e(14,"the Department of Justice filed a brief","法律书面意见来源")]},
{speaker:"Hans Sauer",claim:"企业急切希望为串联线索、发现基因关联获得专利。",boundary:"explains标出律师信息来源；比喻由前句how genes interact界定，不是画图。",evidence:[e(21,"explains Hans Sauer","引述来源"),e(20,"how genes interact","比喻的实质对象")]},
{speaker:"报道者",claim:"争议、边界和后续案件仍值得持续观察，行业对此关注很高。",boundary:"暂时、很可能、尚未清楚、可能等限制贯穿行文；没有以支持者或反对者身份作最终判决。",evidence:[e(10,"probably not over","未终局"),e(16,"it is unclear whether","边界未明"),e(24,"Each meeting was packed","具体关注细节")]},
],
};
