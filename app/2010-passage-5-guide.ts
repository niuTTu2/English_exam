import type {ArticleGuide,PassageEvidence} from "./article-teaching";
const s=(n:number)=>`2010-p5-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2010P5Paragraphs=[[1,2,3],[4,5,6,7,8],[9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23],[24,25,26,27,28]].map((ns,i)=>({id:`2010-p5-paragraph-${i+1}`,sentenceIds:ns.map(s)}));
export const passage2010P5Guide:ArticleGuide={
 practice:[
 {id:"new-path",revision:1,kind:"choice",prompt:"首段研究者的新路径与厂商宣传有何关系？",options:["承认新机有效，同时提出不必购新机的编队思路","否认新机设计与材料存在任何作用","以研究成果保证新机销量增加"],answer:"承认新机有效，同时提出不必购新机的编队思路",evidence:"it would not require them to buy new aircraft",feedback:"certainly承认设计材料有益，But提出无需购新机的自然启发方案；研究提出方案不能改成促进销量。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(2),taskId:"concession-before-but"},{sentenceId:s(3),taskId:"approach-airline-roles"}]},
 {id:"evidence-levels",revision:1,kind:"link",prompt:"把不同信息接到它在文中的证据层级。",links:[{source:"三架客机油耗最多降低15%",target:"研究团队的模型发现"},{source:"客机间隔和法规是否相容",target:"仍需确认的问题"},{source:"二战缺油军机编队飞行",target:"被专家指出未经证实的报道"}],options:["研究团队的模型发现","仍需确认的问题","被专家指出未经证实的报道"],answer:JSON.stringify(["研究团队的模型发现","仍需确认的问题","被专家指出未经证实的报道"]),evidence:"they are unsubstantiated",feedback:"模型收益、待解约束和战争传闻属于不同证据层级；美国军方当年的研究计划不能给二战传闻补证。",conceptId:"author-voice",errorType:"evidence",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(11),taskId:"less-fuel"},{sentenceId:s(18),taskId:"blueprint-limit"},{sentenceId:s(26),taskId:"two-they"}]},
 {id:"argument-route",revision:1,kind:"order",prompt:"按全文推进，把四个阶段排回去。",options:["从新机技术转入仿自然节能方案","解释鸟类原理并用客机模型展示收益","提出安全法规、天气和调度约束","补充军方计划并限定战争报道可信度"],answer:JSON.stringify(["从新机技术转入仿自然节能方案","解释鸟类原理并用客机模型展示收益","提出安全法规、天气和调度约束","补充军方计划并限定战争报道可信度"]),evidence:"There are, of course, knots to be worked out",feedback:"全文先提方案及依据，再展示模型结果，随后讲待解条件，末段区分当前计划与旧传闻。它不是已经全面商用的成果宣布。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true},
 ],
 route:["承认新机优势，另提仿自然方案","鸟类编队原理及航程估计","三机客运模型与节能减排结果","安全感和法规约束","天气作用与客货军航调度差别","军方计划与未证实的二战报道"],
 mainIdea:"文章介绍模仿鸟类编队飞行可能帮助飞机节油的原理与模型收益，同时逐项讨论安全法规、天气和调度等未解条件，最后区分军方新研究计划与未经证实的旧报道。核心是有依据的可能性及应用限制，未宣布客运全面实施。",
 paragraphs:[
 {paragraphId:"2010-p5-paragraph-1",title:"新方案不以购新机为前提",summary:"先承认最新机型设计和材料有效，再引入斯坦福团队无需购买新飞机的仿自然节油设想。",relation:"certainly承认传统路径，But转换研究思路，为41题销量判断定边界。"},
 {paragraphId:"2010-p5-paragraph-2",title:"从鸟类寻找原理",summary:"编队鸟类利用翼后上洗气流减阻、节约推进能量，专家提出25只鸟编队可能增加航程。",relation:"回答方案如何起效，并区分鸟类航程估计与后面的飞机油耗模型。"},
 {paragraphId:"2010-p5-paragraph-3",title:"把原理用于客机模型",summary:"三架飞机分别出发、会合、倒V编队、轮换位置再赴伦敦；模拟发现燃油和两类排放减少。",relation:"从自然原理移到飞机应用，并用量化结果支持潜在收益；仍属模型。"},
 {paragraphId:"2010-p5-paragraph-4",title:"安全感与法规问题",summary:"提出乘客是否安心，说明飞机可隔数海里，但间距是否满足空管规定仍有疑问，列入蓝图不等于已合规。",relation:"knots转向实践限制，疑问与情态词不能改成已经更舒适的结论。"},
 {paragraphId:"2010-p5-paragraph-5",title:"天气和调度约束",summary:"天气怎样影响气流仍待研究；湍流会削弱效果，客运时间和目的地难协调，货运及例行军航可能较易调度。",relation:"继续列约束，同时比较不同航空用途的适用难度。"},
 {paragraphId:"2010-p5-paragraph-6",title:"计划与报道的证据等级",summary:"美国军方已宣布付费研究计划但项目尚未开始；二战军机缺油时编队的报道未经证实，专家家庭背景说明知情性。",relation:"以新动向收束，并再次保留实施进度和历史报道的限度，未替传闻确证。"},
 ],
 sentenceRoles:Object.fromEntries(["引出厂商对新机效率的宣传，型号分别对应。","承认设计与材料的实际作用。","转向无需买新机的仿自然研究方案。","用专家插话点出鸟类启示。","交代1914以来对鸟类编队耗能的认识。","解释上洗气流的物理现象。","指出减阻和节省推进能量两项效果。","补专家背景与25鸟编队航程增幅估计。","把同样原理过渡到飞机。","描述三客机路线与编队模型假设。","报告模型燃油降幅及二氧化碳减少。","另述巡航氮氧化物排放的减幅。","转入有待解决的应用难题。","首先提出安全或至少安全感。","用问句保持乘客是否安心的开放性。","说明飞机可保持较大间距，不必像表演队紧密。","举乘客可能看不到其他飞机的视角。","保留间隔是否满足法规的问题，承认规划进展。","提出天气对气流影响尚待确定。","举湍流增强削弱尾流和收益的例子。","标明这一领域还将继续研究。","指出协调客运时间目的地可能困难。","对比货运和军用例行航班可能较易调度。","引入美国军方当前行动。","说明付费研究计划已宣布但项目尚未启动。","区分二战报道内容与未经证实的判断。","专家补家庭航空背景，省略与修饰范围要保留。","作者据此推断专家应当了解情况。"].map((role,i)=>[s(i+1),role])),
 references:[
 {expression:"their",sentenceId:s(1),referent:"Boeing与Airbus",targetSentenceIds:[s(1)],explanation:"两家公司各自最新的飞机，型号按respectively顺序对应。"},
 {expression:"Their",sentenceId:s(2),referent:"前句两家制造商的最新飞机",targetSentenceIds:[s(1)],explanation:"指这些飞机的设计和轻质材料，不是研究团队。"},
 {expression:"it",sentenceId:s(3),referent:"a more naturalistic approach",targetSentenceIds:[s(3)],explanation:"不要求购新机的是该方法；them另指airlines。"},
 {expression:"them",sentenceId:s(3),referent:"airlines",targetSentenceIds:[s(3)],explanation:"购买动作的潜在执行者是航空公司。"},
 {expression:"the principles",sentenceId:s(9),referent:"鸟类编队利用上洗气流减阻省能的原理",targetSentenceIds:[s(5),s(6),s(7)],explanation:"也是When applied省去的逻辑主语。"},
 {expression:"all",sentenceId:s(10),referent:"three passenger jets",targetSentenceIds:[s(10)],explanation:"三架通过换位轮流取得有利位置。"},
 {expression:"They",sentenceId:s(11),referent:"Dr. Kroo and his team",targetSentenceIds:[s(10)],explanation:"模拟和发现由同一团队作出。"},
 {expression:"it",sentenceId:s(14),referent:"safety",targetSentenceIds:[s(14)],explanation:"the perception of it是对安全性的主观感受。"},
 {expression:"It",sentenceId:s(19),referent:"后置how天气影响从句所表达的问题",targetSentenceIds:[s(19)],explanation:"形式主语，不直接指天气或某架飞机。"},
 {expression:"this",sentenceId:s(21),referent:"天气及湍流如何影响编队气流与收益的问题",targetSentenceIds:[s(19),s(20)],explanation:"团队尚将进一步研究，不是已完成全部结论。"},
 {expression:"It",sentenceId:s(22),referent:"后置协调出发时间及目的地的不定式内容",targetSentenceIds:[s(22)],explanation:"形式主语；for airlines说明真正行动者。"},
 {expression:"them",sentenceId:s(22),referent:"airlines",targetSentenceIds:[s(22)],explanation:"从编队获益的是航空公司，不是destinations。"},
 {expression:"the country's",sentenceId:s(25),referent:"America",targetSentenceIds:[s(24)],explanation:"机构所属国家承接上一句美国军方。"},
 {expression:"they were low on fuel",sentenceId:s(26),referent:"some military aircraft",targetSentenceIds:[s(26)],explanation:"第一处they指燃油不足的军机。"},
 {expression:"they are unsubstantiated",sentenceId:s(26),referent:"reports",targetSentenceIds:[s(26)],explanation:"第二处they指未经证实的报道，而非飞机。"},
 {expression:"he",sentenceId:s(28),referent:"Dr. Lissaman",targetSentenceIds:[s(26),s(27)],explanation:"作者推断专家应当了解，未改传闻证据等级。"},
 ],
 timeline:[
 {label:"1914年以来",event:"科学家已知道鸟类编队消耗较少能量，属于原理认识的历史起点。",evidence:[e(5,"Since 1914","认识起点")]},
 {label:"研究模型",event:"三架客机在假定路线中编队、轮换；模型给出燃油与排放下降，并非客运商用时间线。",evidence:[e(10,"modeled what would happen","模型研究"),e(11,"as much as 15% less fuel","模型燃油结果")]},
 {label:"文章当年较早时候",event:"美国机构宣布付费研究计划，但项目尚未启动；this year按文章叙述时间解释。",evidence:[e(25,"Earlier this year","文章内时间"),e(25,"though the programme has yet to begin","实施进度限制")]},
 {label:"二战报道",event:"有军机缺油时编队的报道；原文明确未经证实，不受当前研究计划反向确认。",evidence:[e(26,"during the Second World War","报道所述时期"),e(26,"they are unsubstantiated","证据等级限制")]},
 ],
 voices:[
 {speaker:"波音与空客",claim:"大力宣传最新机型效率。",boundary:"厂商宣传为话题引入，不能挪作斯坦福成果将促进销售的结论。",evidence:[e(1,"have trumpeted the efficiency of their newest aircraft","厂商宣传")]},
 {speaker:"克鲁及研究团队",claim:"仿自然方法无需新机，模型显示节能收益，同时承认法规、天气和协调问题。",boundary:"suggested、modeled、might和待解问题保留设想及研究阶段，不声称客运已全面实施。",evidence:[e(3,"has suggested that airlines could take a more naturalistic approach","方案设想"),e(10,"modeled what would happen","模型身份"),e(21,"his team will investigate further","继续研究")]},
 {speaker:"利萨曼",claim:"估计鸟类编队航程收益，并指出二战相关报道未经证实。",boundary:"专业及家庭背景支持知情性，不能把unsubstantiated改成documented。",evidence:[e(8,"might enjoy a range increase of 71%","估计的可能性"),e(26,"Dr. Lissaman says they are unsubstantiated","对报道的保留")]},
 {speaker:"作者",claim:"呈现潜在收益与实现条件，末句推断专家应当知情。",boundary:"疑问句未给乘客更舒适的肯定结论，So he should know是推断而非研究任务指令。",evidence:[e(15,"Would passengers feel comfortable travelling in company?","开放疑问"),e(28,"So he should know","知情推断")]},
 ],
};
