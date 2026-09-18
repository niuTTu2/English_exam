import type { ArticleGuide, PassageEvidence } from './article-teaching';
const s=(n:number)=>`2011-p1-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2011P1Paragraphs=[
 {id:'2011-p1-paragraph-1',sentenceIds:[1,2,3,4,5].map(s)},
 {id:'2011-p1-paragraph-2',sentenceIds:[6,7,8].map(s)},
 {id:'2011-p1-paragraph-3',sentenceIds:[9,10,11,12,13,14,15,16].map(s)},
 {id:'2011-p1-paragraph-4',sentenceIds:[17,18,19].map(s)},
];
export const passage2011P1Guide:ArticleGuide={
 practice:[
 {id:'role-and-reality',revision:1,kind:'choice',prompt:'第二段说外部董事本应做什么，为什么不能据此直接认定全文态度积极？',options:['独立提供建议；这是应有标准，后文还要检验现实去留','预测股价；作者证明他们全都预测准确','出资救企业；全文赞扬他们慷慨'],answer:'独立提供建议；这是应有标准，后文还要检验现实去留',evidence:'Outside directors are supposed to serve as helpful, yet less biased, advisers',feedback:'supposed to、presumably提出规范预期；首段失职反问与末段声誉/激励问题检验现实。这两层需要一起读。',conceptId:'author-voice',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['paragraph-route'],leaksToTasks:[{sentenceId:s(6),taskId:'standard-not-praise'}]},
 {id:'correlation-limit',revision:1,kind:'choice',prompt:'研究发现董事离任后风险上升，作者又用哪一点限制推断？',options:['并非每次都是逃离危机，也可能换去更好的公司','所有离职都证明董事本人违规','离任与公司之后表现绝无关联'],answer:'并非每次都是逃离危机，也可能换去更好的公司',evidence:'it does not mean that such directors are always jumping off a sinking ship',feedback:'第15句限制always这一全称判断，第16句补充trade up替代动机；既不否认相关性，也不把相关性当作每个个案动机的证明。',conceptId:'negation-contrast',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['paragraph-route'],leaksToTasks:[{sentenceId:s(15),taskId:'not-always'}]},
 {id:'paragraph-route',revision:1,kind:'order',prompt:'按原卷四段顺序重建全文论证。',options:['个案引出履职与离任争议','提出外部董事的应有独立顾问职责','调查离任后的风险关联并限制推断','解释声誉激励与留任难题，回扣个案'],answer:JSON.stringify(['个案引出履职与离任争议','提出外部董事的应有独立顾问职责','调查离任后的风险关联并限制推断','解释声誉激励与留任难题，回扣个案']),evidence:'Firms who want to keep their outside directors through tough times may have to create incentives',feedback:'个案→标准→研究及限制→声誉与激励。研究者的统计不是指控所有董事犯罪，第二段理想职责也不是全文现实评价。',conceptId:'passage-route',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['role-and-reality','correlation-limit']},
 ],
 route:['个案引出履职与离任争议','提出外部董事的应有独立顾问职责','调查离任后的风险关联并限制推断','解释声誉激励与留任难题，回扣个案'],
 mainIdea:'文章用西蒙斯的争议与离任引出外部董事的职责困境：理论上应保持独立并在危机中提供建议，现实中的提前离任却可能帮助其保护个人声誉。研究提示离任与公司后续风险相关，同时保留换更好平台等替代解释；末段指出困难时期留任可能需要额外激励。',
 paragraphs:[
 {paragraphId:'2011-p1-paragraph-1',title:'身兼两职到遭批评离任',summary:'西蒙斯任外部董事与校长，先少受非议，后因未质疑巨额奖金而受批评并离任；“太占时间”是她自己的解释。',relation:'以个人事例引入职责与去留问题；先受批评后离职，不能倒置因果。'},
 {paragraphId:'2011-p1-paragraph-2',title:'独立顾问的应有职责',summary:'董事在别处拥有财富声望，按说能独立质疑管理层，并在危机中凭经验提供建议。',relation:'提供评价现实行为的规范标准；supposed to与presumably表预期，不是已履职证明。'},
 {paragraphId:'2011-p1-paragraph-3',title:'风险关联与解释边界',summary:'研究追踪名单，聚焦未满70岁者的意外离任，发现其后财务、诉讼与股价风险；但相关性不证明每次离任都因预见危机，也可能换去更好公司。',relation:'以统计与限制共同推进论证；不能只摘风险或只摘trade up来概括整段。'},
 {paragraphId:'2011-p1-paragraph-4',title:'声誉保护与留任激励',summary:'坏消息公开前离开可能保全声誉，即使违规时仍在任；公司想留住董事或需提供激励，否则他人也会效仿西蒙斯。',relation:'给出去留的激励解释并首尾照应；校园受欢迎是个人人气，不代表作者肯定董事履职。'},
 ],
 sentenceRoles:Object.fromEntries([
 '建立双重任职身份，并给出两次任职先后。','描述此前表面平静，为But转折铺垫。','以反问指出监督巨额奖金时的失职。','交代受批评后的离任，不倒置为批评原因。','标明占用时间只是当事人的说法。','提出董事的应有顾问职责和相对公正标准。','解释外部财富声望为何按说支撑独立性。','以危机情境说明董事应发挥的经验作用。','说明数据库样本与资料年份。','说明从连续披露文件识别留任的方法。','解释为何聚焦70岁以下董事的非预期离任。','报告重述盈利数据概率上升的财务关联。','追加被诉风险与股票表现两种后果。','说明该关联在大公司中往往更明显。','限制由相关性推断所有离任动机的做法。','提供转去更好平台这一替代解释。','提出提前离任有助保全声誉的条件性判断。','由留人目标推出激励需要。','预测缺乏激励时的离任，回扣西蒙斯个案。',
 ].map((role,i)=>[s(i+1),role])),
 references:[
 {expression:'both roles',sentenceId:s(2),referent:'高盛外部董事和布朗大学校长',targetSentenceIds:[s(1)],explanation:'both只对应前一句两种身份，不扩展成薪酬委员会和股价顾问。'},
 {expression:'the next year',sentenceId:s(4),referent:'2009年之后的2010年',targetSentenceIds:[s(3)],explanation:'参照上一句2009年底；不是再从2000年加一年。'},
 {expression:'The position',sentenceId:s(5),referent:'高盛董事职位',targetSentenceIds:[s(4)],explanation:'她离开的是董事会，文中仍以校长身份在校园活动。'},
 {expression:'they',sentenceId:s(7),referent:'外部董事',targetSentenceIds:[s(6)],explanation:'财富声望与自主判断都属于这组人。'},
 {expression:'they',sentenceId:s(10),referent:'俄亥俄大学研究人员',targetSentenceIds:[s(9)],explanation:'执行核查动作的是研究人员，不能沿用上一段董事的they。'},
 {expression:'They',sentenceId:s(12),referent:'研究人员',targetSentenceIds:[s(11)],explanation:'found报告分析所得，不是董事自己的预测。'},
 {expression:'The effect',sentenceId:s(14),referent:'董事意外离任与后续风险上升、股价表现变差的关联',targetSentenceIds:[s(12),s(13)],explanation:'不是公司利润增长，也不是一定存在因果作用。'},
 {expression:'them',sentenceId:s(15),referent:'离任的董事',targetSentenceIds:[s(11),s(12)],explanation:'them leaving是介词结构中的动名词事件，them为其逻辑主语。'},
 {expression:'it',sentenceId:s(15),referent:'离任与其后公司表现之间的相关性',targetSentenceIds:[s(15)],explanation:'主句it承接让步从句correlation，不指公司。'},
 {expression:'they',sentenceId:s(16),referent:'离任的董事',targetSentenceIds:[s(15)],explanation:'转到更好公司是董事的选择，不是研究人员换工作。'},
 {expression:'they',sentenceId:s(17),referent:'外部董事',targetSentenceIds:[s(17)],explanation:'leave与were on the board两处they都指董事，时间状态不同。'},
 {expression:'Otherwise',sentenceId:s(19),referent:'没有提供足以留住董事的激励',targetSentenceIds:[s(18)],explanation:'否定条件衔接，不是另一个无关话题。'},
 ],
 timeline:[
 {label:'2000年1月与一年后',event:'先加入高盛董事会，一年后成为大学校长；原文未给校长任职的具体日。',evidence:[e(1,'in January 2000; a year later','两次任职参照')]},
 {label:'2009年底→到次年2月',event:'年底已经遭批评；到2010年2月已离任。原文没有将具体离职日期写出。',evidence:[e(3,'by the end of 2009','受批评时间'),e(4,'By February the next year Ms. Simmons had left the board','离任截止点')]},
 {label:'1989—2004资料范围',event:'这一时间段限定数据库覆盖的董事和公司资料，不等于研究实施时长。',evidence:[e(9,'between 1989 and 2004','观察资料范围')]},
 {label:'离任后风险关联',event:'surprise departure先发生，后续出现重述财报、被诉或股价变差的风险。先后关联本身不能确定每名董事的动机。',evidence:[e(12,'after a surprise departure','离任参照'),e(12,'subsequently have to restate earnings','后续事件'),e(15,'does not mean that such directors are always jumping off a sinking ship','推断边界')]},
 {label:'违规发生与消息公开分开',event:'董事可能在违规发生时仍任职，却在坏消息曝光前离开；后来的历史回顾再显示当时在任。',evidence:[e(17,'before bad news breaks','离职早于消息公开'),e(17,'they were on the board at the time any wrongdoing occurred','任职与违规同一时点')]},
 ],
 voices:[
 {speaker:'西蒙斯本人',claim:'董事职位太占时间。',boundary:'she said标明当事人说法；文章并未证明这是唯一离职原因。',evidence:[e(5,'The position was just taking up too much time, she said','引述来源')]},
 {speaker:'文章叙述者',claim:'外部董事理应独立提供建议，但现实激励可能推动其保护声誉而离开。',boundary:'区分应有职责与实际表现；对制度角色的批评不等于侮辱每位董事。',evidence:[e(6,'are supposed to serve','规范预期'),e(19,'Otherwise outside directors will follow the example of Ms. Simmons','现实预测')]},
 {speaker:'俄亥俄大学研究者',claim:'意外离任与后续公司风险存在关联，并认为提前离开可降低声誉受损。',boundary:'found报告统计，believe说明解释性判断；不推出所有董事明知违规且亲自参与。',evidence:[e(12,'They found that after a surprise departure','统计发现来源'),e(17,'the researchers believe','解释性观点来源')]},
 ],
};
