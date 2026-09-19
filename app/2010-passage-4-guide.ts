import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s=(n:number)=>`2010-p4-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2010P4Paragraphs=[[1,2,3],[4,5,6],[7,8,9,10],[11,12,13,14]].map((numbers,i)=>({id:`2010-p4-paragraph-${i+1}`,sentenceIds:numbers.map(s)}));
export const passage2010P4Guide:ArticleGuide={
practice:[
 {id:"ideal-practice-gap",revision:1,kind:"choice",prompt:"第2段But把哪两层内容对照起来？",options:["首段的民主理想与历史上的遴选程序","美国和英国两套不同的民主理想","1968年法案与1975年判决相互矛盾"],answer:"首段的民主理想与历史上的遴选程序",evidence:"jury selection procedures conflicted with these democratic ideals",feedback:"首段提出平等资格、代表性等价值，第二段指出实际程序仍采用精英标准，已有反歧视规则仍可被规避。冲突双方不是理想彼此。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["historical-route"],leaksToTasks:[{sentenceId:s(4),taskId:"conflict-sides"},{sentenceId:s(6),taskId:"law-gap"}]},
 {id:"two-reform-levels",revision:1,kind:"link",prompt:"把1968与1975的改革层级区分开。",links:[{source:"1968年国会法案",target:"联邦陪审员取消特殊教育门槛并随机遴选"},{source:"1975年最高法院Taylor判决",target:"代表性要求扩至州一级，并裁定性别歧视违宪"}],options:["联邦陪审员取消特殊教育门槛并随机遴选","代表性要求扩至州一级，并裁定性别歧视违宪"],answer:JSON.stringify(["联邦陪审员取消特殊教育门槛并随机遴选","代表性要求扩至州一级，并裁定性别歧视违宪"]),evidence:"to the state level",feedback:"国会法案与最高法院判决分属不同时间、机构和适用层级。相近的民主改革目的不等于所有内容都属于同一次法律变化。",conceptId:"time-reference",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["historical-route"],leaksToTasks:[{sentenceId:s(12),taskId:"federal-scope"},{sentenceId:s(13),taskId:"extend-layers"}]},
 {id:"historical-route",revision:1,kind:"order",prompt:"把四段推进路线排回原文顺序。",options:["民主价值与直接民主传统","精英遴选违背理想并规避禁令","女性资格及代表性长期不足","1968与1975年的制度改革"],answer:JSON.stringify(["民主价值与直接民主传统","精英遴选违背理想并规避禁令","女性资格及代表性长期不足","1968与1975年的制度改革"]),evidence:"ushering in a new era of democratic reforms for the jury",feedback:"首段有制度传统与价值，随后按历史落差和改革发展推进。只说问题与解决会遗漏首段传统，只说性质特点又漏掉改革。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["ideal-practice-gap","two-reform-levels"],leaksToTasks:[{sentenceId:s(4),taskId:"conflict-sides"}]},
],
route:["民主价值与直接民主传统","历史上的精英遴选落差","女性资格及代表性缺口","联邦与州层级的改革发展"],
mainIdea:"文章先说明陪审制度体现的民主价值和直接民主传统，再回顾精英筛选与女性排除等历史落差，最后介绍1968年法案与1975年判决推动的改革发展。全文兼有传统与发展，不能只把它概括为静态性质或孤立问题的解决。",
paragraphs:[
{paragraphId:"2010-p4-paragraph-1",title:"制度的民主传统",summary:"提出合格公民平等任职、随机代表性、反身份歧视、同侪审判和社会良知五项原则，再解释直接民主区别于代议民主。",relation:"建立后文审视遴选现实的价值基准；最低年龄与读写条件仍保留。"},
{paragraphId:"2010-p4-paragraph-2",title:"精英标准与法律漏洞",summary:"直到1968年，实际程序仍可能只选所谓品质优越者；虽然1880年已有种族禁歧视规则，精英筛选仍可绕开它。",relation:"But由价值转入现实落差，although承认已有法律并突出其约束不足。"},
{paragraphId:"2010-p4-paragraph-3",title:"女性代表性迟迟不足",summary:"1898年单州出现女性先例，1940年代多数州才承认资格；一些州仍默认豁免，以家中需要女性作辩护，使代表性不足持续贯穿1960年代。",relation:"also补充另一类历史偏离；资格、默认豁免和实际代表性是不同层，不能互相替代。"},
{paragraphId:"2010-p4-paragraph-4",title:"两次改革的适用层级",summary:"1968年法案取消联邦特殊教育门槛并要求随机遴选；1975年Taylor案把代表性要求扩至州一级，并裁定性别歧视违宪、要求同样程序。",relation:"承接历史问题说明制度发展，逐项记录法案与判决，不能把1975内容倒挪到1968法案。"},
],
sentenceRoles:Object.fromEntries(["用五项原则明确陪审制度的民主价值和权利边界。","称陪审制度为直接民主存续的范例。","解释直接自治与选举代表治理的区别。","But转入理想与实际遴选程序的冲突。","以所谓素质优越者的精英资格为例。","用早已有禁令却仍可规避的让步结构，指出法律约束不足。","补充女性在相当长时期内未获常态化纳入。","对照1898单州先例与1940年代多数州资格改革。","说明默认豁免与主动申请这一例外。","指出家庭角色主张被用来辩护，产生女性代表性不足的持续后果。","引入1968年国会法案作为新改革阶段。","列明联邦教育门槛与随机代表性两项改革。","介绍1975年判决将代表性要求扩至州一级。","补充同一判决对性别歧视及男女遴选程序的要求。"].map((role,i)=>[s(i+1),role])),
references:[
{expression:"who",sentenceId:s(1),referent:"all citizens中的公民",targetSentenceIds:[s(1)],explanation:"who限定满足最低年龄和读写条件的人，在内层作meet主语。"},
{expression:"their peers",sentenceId:s(1),referent:"被告的同侪",targetSentenceIds:[s(1)],explanation:"their回指defendants；并非陪审员免受审判。"},
{expression:"themselves",sentenceId:s(3),referent:"citizens自己",targetSentenceIds:[s(3)],explanation:"直接民主下治理者与被治理者相同。"},
{expression:"them",sentenceId:s(3),referent:"citizens",targetSentenceIds:[s(3)],explanation:"选出的代表替公民治理，不是替代表自己治理。"},
{expression:"these democratic ideals",sentenceId:s(4),referent:"首段的民主价值和原则",targetSentenceIds:[s(1),s(2),s(3)],explanation:"与实际程序冲突的是这些理想，不是不同理想彼此矛盾。"},
{expression:"this",sentenceId:s(6),referent:"前述1880年禁止故意种族歧视的规则",targetSentenceIds:[s(6)],explanation:"与other antidiscrimination laws并列，强调已存在的法律仍可被规避。"},
{expression:"The system",sentenceId:s(7),referent:"陪审制度",targetSentenceIds:[s(1)],explanation:"转入同一制度对女性的常态化纳入问题。"},
{expression:"Even then",sentenceId:s(9),referent:"多数州承认女性陪审资格之后的阶段",targetSentenceIds:[s(8)],explanation:"获得资格不等于自动进入陪审名单，制度仍默认豁免。"},
{expression:"they",sentenceId:s(9),referent:"women",targetSentenceIds:[s(9)],explanation:"亲自提出申请的是女性，不是那些州。"},
{expression:"This practice",sentenceId:s(10),referent:"女性默认被豁免、需主动申请列名的做法",targetSentenceIds:[s(9)],explanation:"不能概括成女性自愿逃避职责。"},
{expression:"it",sentenceId:s(10),referent:"This practice",targetSentenceIds:[s(9),s(10)],explanation:"造成代表性不足的是该制度做法，不是home或claim单词。"},
{expression:"This law",sentenceId:s(12),referent:"1968年Jury Selection and Service Act",targetSentenceIds:[s(11)],explanation:"法案细则沿着同一时间节点，不包括下一句1975裁判。"},
{expression:"them",sentenceId:s(12),referent:"federal jurors",targetSentenceIds:[s(12)],explanation:"被随机遴选的是人，不是educational requirements。"},
{expression:"The Taylor decision",sentenceId:s(14),referent:"1975年Taylor v. Louisiana判决",targetSentenceIds:[s(13)],explanation:"两句共有这一司法判决，不能回指1968年国会法案。"},
],
timeline:[
{label:"1880年",event:"最高法院在Strauder案禁止遴选中的故意种族歧视；后文说明精英做法仍可规避，并非该时点已实现全面公平。",evidence:[e(6,"as early as the 1880 case of Strauder v. West Virginia","较早禁令")]},
{label:"1898年",event:"女性首次参加犹他州州陪审团，这是单州先例，不等于各州已普遍承认资格。",evidence:[e(8,"women first served on state juries in Utah in 1898","女性个别先例")]},
{label:"1940年代与20世纪中叶",event:"多数州直到1940年代才使女性合格，和前句常态化纳入较晚相接；多数州仍不等于全部州。",evidence:[e(7,"until the mid-20th century","常态化迟延界限"),e(8,"not until the 1940s","多数州改革时间")]},
{label:"贯穿1960年代",event:"默认豁免加家庭角色辩护使女性代表性持续不足，through不是止于1960年。",evidence:[e(10,"through the 1960s","持续整个年代")]},
{label:"1968年法案",event:"国会法案针对联邦陪审员取消特殊教育要求并要求随机、代表性来源。",evidence:[e(11,"In 1968","立法年份"),e(12,"special educational requirements for federal jurors","联邦门槛改革")]},
{label:"1975年判决",event:"Taylor案将代表性要求扩到州一级，并就性别歧视违宪与男女相同遴选程序作出要求。",evidence:[e(13,"the landmark 1975 decision Taylor v. Louisiana","司法判决年份"),e(13,"to the state level","适用层级扩展"),e(14,"declared sex discrimination in jury selection to be unconstitutional","性别歧视裁判")]},
],
voices:[
{speaker:"许多美国人的制度评价",claim:"陪审制度被视为民主价值的具体体现和直接民主存续范例。",boundary:"首句regard和第二句is said是被表达的制度理想；后文将理想与真实历史相比较。",evidence:[e(1,"Many Americans regard the jury system as a concrete expression of crucial democratic values","价值评价"),e(2,"is also said to be the best surviving example","被认为的制度范例")]},
{speaker:"旧制度的辩护者",claim:"以家中需要女性为理由，为默认豁免女性任职的做法辩护。",boundary:"claim及was justified标记被援引的说法；不能把它当作作者主张女性应被排除。",evidence:[e(10,"by the claim that women were needed at home","辩护理由")]},
{speaker:"作者的历史叙述",claim:"遴选程序长期偏离民主理想，随后法律与判决推动代表性改革。",boundary:"叙述的是不同历史节点和适用层级，说明文中所述历史时期的制度变化，也不声称单次改革彻底解决一切问题。",evidence:[e(4,"conflicted with these democratic ideals","理想现实落差"),e(6,"a convenient way around this and other antidiscrimination laws","约束漏洞"),e(11,"ushering in a new era of democratic reforms for the jury","改革发展")]},
],
};
