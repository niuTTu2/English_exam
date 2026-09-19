import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s=(n:number)=>`p2-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2000P2Paragraphs=[[1,2,3,4,5,6,7,8,9,10],[11,12,13,14,15,16,17,18,19],[20,21,22,23,24,25,26,27]].map((ns,i)=>({id:`p2-paragraph-${i+1}`,sentenceIds:ns.map(s)}));
export const passage2000P2Guide:ArticleGuide={
mainIdea:"作者从存活与生育差异的减小，论述自然选择机会的减少；机器和社会替人承担适应环境的功能，使生活剧变而身体变化很少，结尾以生活观念与外貌的反差收束。文中的进化结束是作者的论述结论，不能把局部80%统计扩大成所有人群的作用归零。",
route:["存活差异缩小：死亡筛选机会减少","生育差异趋同：以印度说明自然选择减弱","技术社会承担适应：生活改变而身体相似"],
paragraphs:[{paragraphId:"p2-paragraph-1",title:"存活差异减少",summary:"过去男性尤其男婴较难存活；存活改善后，出生偏多的男孩会带来择偶期过剩。同时，体重差异不再像从前那样筛选存活，进化失去一个作用因素。",relation:"提出第一条机制；More important把人口比例现象转向自然选择这一核心主题。"},{paragraphId:"p2-paragraph-2",title:"生育趋同与印度例证",summary:"人们后代数量趋同，差异及可利用的机会减少。印度的城市富裕与部落贫困仍有差别，但中上阶层的自然选择效力相对部落群体已降低80%。",relation:"another way与Again添加第二条机制；印度是例证，不是讨论全国人口或提出生育政策。"},{paragraphId:"p2-paragraph-3",title:"生活巨变，身体依旧",summary:"作者据此称进化结束、乌托邦到来，却指出身体变化很少。机器与社会替人适应环境，达尔文比喻和后代设想进一步对照认知与外貌。",relation:"For us作推论，Strangely及两个But形成反差；末句回扣人类身体进化停滞。原卷跨页不另分段。"}],
sentenceRoles:Object.fromEntries(["以男性的危险引出存活差异。","用出生、成年和70岁性别比例说明旧死亡格局。","转向男性死亡规律正在改变。","指出男婴存活接近女婴。","推论择偶年龄的男孩可能过剩。","把重点转向自然选择失去机会。","回顾存活曾取决于体重。","量化体重偏差曾带来的危险。","对照如今体重偏差影响很小。","由基因相关性解释失去进化筛选因素。","新增生育这一进化维度。","概括现代生育水平与过去的差别。","用15个孩子及宗教例外说明生育规模。","将生育数量与死亡年龄的趋同类比。","说明多数人的后代数量大致相同。","概括差异及利用差异的机会均减少。","引出印度实例。","交代城市少数人与部落群体的贫富差别。","比较两群体中的自然选择效力，明确80%的对象。","给出作者进化结束的推论与乌托邦比喻。","提出身体变化很少的反差。","强调人类占据自然环境位置的广泛性。","将生活巨变与身体未变直接对照。","以机器和社会替代适应功能解释原因。","引用达尔文关于不理解进化者的比喻。","预测回顾20世纪生活方式时会觉得其丑陋难解。","以让步对比后代生活评价与相似外貌，收束全文。"].map((role,i)=>[s(i+1),role])),
references:[
{sentenceId:s(2),expression:"this ratio",referent:"出生时约105名男性对应100名女性的比例",targetSentenceIds:[s(2)],explanation:"随后下降到成年时接近均衡。"},
{sentenceId:s(5),expression:"This",referent:"男婴存活率接近女婴的变化",targetSentenceIds:[s(4)],explanation:"结合出生时男婴偏多，形成择偶年龄过剩的推断。"},
{sentenceId:s(5),expression:"they",referent:"boys",targetSentenceIds:[s(5)],explanation:"寻找配偶的男孩，不是years。"},
{sentenceId:s(7),expression:"its",referent:"a baby",targetSentenceIds:[s(7)],explanation:"有体重的是婴儿；chance不具备重量。"},
{sentenceId:s(9),expression:"it",referent:"体重过轻或过重的偏差",targetSentenceIds:[s(8)],explanation:"概括前句情形，谈其对存活的影响。"},
{sentenceId:s(16),expression:"it",referent:"人与人存在差异这一情况",targetSentenceIds:[s(15),s(16)],explanation:"保留原文单数，中文依语义解释为这种差异；不是机会利用自身。"},
{sentenceId:s(18),expression:"The country",referent:"India",targetSentenceIds:[s(17)],explanation:"同一个国家内部的城市与部落比较。"},
{sentenceId:s(19),expression:"its",referent:"natural selection",targetSentenceIds:[s(19)],explanation:"power属于自然选择机制，80%不是人口统计。"},
{sentenceId:s(20),expression:"this",referent:"存活和后代数量趋同、自然选择机会减少",targetSentenceIds:[s(10),s(16),s(19)],explanation:"概括两条机制后作进化停止的推论。"},
{sentenceId:s(21),expression:"it",referent:"前述生存、生育趋同的过程",targetSentenceIds:[s(19),s(20)],explanation:"过程包含很少身体变化，不是Utopia这个地点。"},
{sentenceId:s(24),expression:"it",referent:"进化本可承担的适应环境功能",targetSentenceIds:[s(23),s(24)],explanation:"机器和社会改变生活，使适应不依赖相同程度的身体变化。"},
{sentenceId:s(25),expression:"they",referent:"those ignorant of evolution",targetSentenceIds:[s(25)],explanation:"引语说不理解进化的人怎样看待生物。"},
{sentenceId:s(26),expression:"its",referent:"a 20th century way of life",targetSentenceIds:[s(26)],explanation:"生活方式的丑陋使其令人难以理解。"},
{sentenceId:s(27),expression:"they",referent:"our descendants",targetSentenceIds:[s(27)],explanation:"后代与我们外貌相似，尽管他们会惊讶于我们的生活。"}],
timeline:[{label:"五十年前",event:"婴儿存活与体重密切相关，偏差一公斤几乎意味着死亡；相对于作者写作时间。",evidence:[e(7,"Fifty years ago","回顾时间"),e(8,"almost certain death","过去后果")]},{label:"作者所说的如今",event:"男婴存活改善，体重影响缩小，生育数量趋同；不是今天的实时人口数据。",evidence:[e(4,"Now","存活变化"),e(9,"Today","体重对照"),e(14,"Nowadays","生育趋同")]},{label:"十万年，甚至一百年",event:"缩短观察尺度仍见生活显著变化，与身体未有同样变化对照；两个时段不相加。",evidence:[e(23,"in the past 100, 000 years—even the past 100 years","嵌套时间尺度")]},{label:"后代回望",event:"后代可能惊讶于我们远离理想生活，但作者预计外貌仍像我们。",evidence:[e(27,"our descendants may be","未来视角"),e(27,"we were","从后代回看作者时代"),e(27,"they will look just like us","预测结论")]}],
voices:[{speaker:"作者",claim:"存活、生育差异缩小，使自然选择机会减少；机器和社会让生活改变而身体变化有限。",boundary:"这是本文论证，应保留almost、roughly、little等程度词；80%明确限定印度中上阶层相对部落群体，不扩大至所有群体。",evidence:[e(10,"one more agent of evolution has gone","机制判断"),e(19,"in upper-middle-class India compared to the tribes","统计范围"),e(24,"machines and society did it for us","原因解释")]},{speaker:"Darwin（达尔文）",claim:"不懂进化者看待生物，如同引语中的人把船看作无法理解之物。",boundary:"冒号与引号标示借来的比喻；第26—27句未来生活评价属于作者的延伸，并非达尔文原话。",evidence:[e(25,"Darwin had a phrase","引语来源"),e(25,"those ignorant of evolution","比喻对象")]},{speaker:"作者设想中的后代",claim:"可能惊讶于作者时代远离乌托邦的生活状态。",boundary:"may与however属于假设让步，不是实际采访后代的记录；外貌像我们是作者主句结论。",evidence:[e(27,"however amazed our descendants may be","假设边界")]}],
practice:[
{id:"selection-route",revision:1,kind:"order",prompt:"按文章论证顺序排列三条路线。",options:["存活差异缩小","生育差异趋同","技术社会承担适应"],answer:JSON.stringify(["存活差异缩小","生育差异趋同","技术社会承担适应"]),evidence:"one more agent of evolution has gone",feedback:"第一段讲死亡筛选，第二段讲后代差异，第三段解释生活已变而身体未变。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true},
{id:"india-percent",revision:1,kind:"choice",prompt:"印度实例中80%的正确对象与比较范围是什么？",options:["中上阶层相对部落群体的自然选择效力损失","中产人口比部落人口少80%","印度所有人口出生率下降80%"],answer:"中上阶层相对部落群体的自然选择效力损失",evidence:"natural selection has lost 80% of its power in upper-middle-class India compared to the tribes",feedback:"power是百分比对象，中上阶层是限定群体，tribes是比较基准；不能推成所有阶层的自然选择都归零。",conceptId:"comparison-scope",errorType:"evidence",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(19),taskId:"power-comparison"}]},
{id:"voice-boundary",revision:1,kind:"link",prompt:"对应文中比喻与预测的来源。",links:[{source:"把生物比作无法理解的船",target:"达尔文的引语"},{source:"后代外貌仍将像我们",target:"作者的预测"}],options:["达尔文的引语","作者的预测"],answer:JSON.stringify(["达尔文的引语","作者的预测"]),evidence:"they will look just like us",feedback:"第25句的引号限定达尔文比喻；第27句是作者用后代设想回扣身体变化很少。",conceptId:"author-voice",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(27),taskId:"two-levels"}]}
]
};
