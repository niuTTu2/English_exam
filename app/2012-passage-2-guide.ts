import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s=(n:number)=>`2012-p2-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2012P2Paragraphs=[[1,2,3,4],[5,6,7,8,9,10],[11,12,13,14],[15,16,17,18]].map((nums,i)=>({id:`2012-p2-paragraph-${i+1}`,sentenceIds:nums.map(s)}));
export const passage2012P2Guide:ArticleGuide={
 practice:[
 {id:"pink-criticism",revision:1,kind:"choice",prompt:"作者真正批评粉色的哪种作用？",options:["垄断女孩形象并把身份绑定到外貌","颜色本身在任何场合都不好","女孩自己完全没有想象力"],answer:"垄断女孩形象并把身份绑定到外貌",evidence:"such a tiny slice of the rainbow",feedback:"首段先排除颜色本身不好，再指出代表性狭窄和身份绑定；缺乏想象力是对社会设想的批评。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(2),taskId:"tiny-slice"}]},
 {id:"toddler-order",revision:1,kind:"order",prompt:"按原文还原toddler概念的历史，而不是作者起初误以为的路径。",options:["服装制造商用营销手段推广术语","成为购物者常用称谓","被普遍接受为发展阶段","专家长期研究后先提出阶段"],answer:JSON.stringify(["服装制造商用营销手段推广术语","成为购物者常用称谓","被普遍接受为发展阶段"]),evidence:'only after "toddler" became a common shoppers\' term',feedback:"1930年代推广的是营销分类；作者原先相信的专家研究路径被wrong否定。only after明确消费术语先于被广泛认可的发展阶段。",conceptId:"time-reference",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(13),taskId:"wrong-scope"},{sentenceId:s(16),taskId:"term-before-stage"}]},
 {id:"argument-route",revision:1,kind:"order",prompt:"重建四段从现象到机制的论证。",options:["批评粉色成为女孩生活的狭窄标签","以颜色历史反驳天生说","用幼儿概念追溯营销对认知的影响","解释市场细分与制造差异的利润动机"],answer:JSON.stringify(["批评粉色成为女孩生活的狭窄标签","以颜色历史反驳天生说","用幼儿概念追溯营销对认知的影响","解释市场细分与制造差异的利润动机"]),evidence:"a sure-fire way to boost profits",feedback:"颜色关联可变、发展概念可被营销塑造，最后归到商家靠细分类别获利。不能只凭DNA字样就认定作者支持天生说。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["pink-criticism","toddler-order"]},
 ],
 route:["批评粉色成为女孩生活的狭窄标签","以颜色历史反驳天生说","用幼儿概念追溯营销对认知的影响","解释市场细分与制造差异的利润动机"],
 mainIdea:"女孩喜爱粉色看似天生，作者却用颜色象征的变迁和幼儿消费分类的历史，说明营销如何塑造我们认为自然的偏好和发展阶段；按年龄和性别细分乃至制造差异，服务于商家的利润。作者批评狭窄的女孩形象，不是断言所有性别差异都不存在。",
 paragraphs:[
 {paragraphId:"2012-p2-paragraph-1",title:"颜色本身与狭窄形象",summary:"成人回忆与女孩当下生活形成反差；粉色本身不坏，却被用来把女孩身份绑到外貌并包装成纯真。",relation:"提出需要解释的现象与作者的批评对象。"},
 {paragraphId:"2012-p2-paragraph-2",title:"历史反证与营销转向",summary:"早期白衣出于洗涤实用，男女裙装曾不分性别，粉红曾象征男性、蓝色象征女性。到80年代中期突出年龄性别的营销盛行，粉色才显得天然吸引女孩。",relation:"颜色含义可变，反驳偏好必然写在DNA中的说法。"},
 {paragraphId:"2012-p2-paragraph-3",title:"幼儿概念并非研究先行",summary:"作者承认原先低估营销影响，继而纠正自己对toddler阶段源自专家长期研究的假设：制造商曾把它当营销手段推广。",relation:"从颜色偏好扩展到心理发展认知，用另一个案例解释营销塑造作用。"},
 {paragraphId:"2012-p2-paragraph-4",title:"细分类别的利润动机",summary:"行业建议在婴儿装和大童装之间增加中间层，购物术语后来才成为公认的发展阶段。不断细分市场能增利，放大乃至制造性别差异是其中一种办法。",relation:"把个案提升为逐利机制，并回扣开头的粉色现象。"},
 ],
 sentenceRoles:Object.fromEntries([
 "以成年女性回忆与当前女孩生活形成代际反差。","排除颜色本身有错的误解，提出代表性过窄与身份外貌绑定的批评。","承接身份绑定，指出它被包装成无害乃至纯真证据。","作者直接表达对社会想象女孩生活过于单调的失望。","以研究者的否定开启对天生偏好说的历史检验。","说明早期并未按颜色分性别，白衣来自实际洗涤条件。","补充男女都穿被视为性别中性的裙装。","以粉红曾偏男性化反驳固定的颜色性别关联。","以蓝色曾象征女性气质构成另一历史对照。","指出80年代中期营销策略与粉色兴盛及天生印象相联系。","作者回顾自己低估营销塑造自然认知的程度。","用祈使式举例引入toddler概念。","摆出并否定自己以为概念来自专家研究的假设。","引述历史学者，说明服装商在1930年代把概念当营销手段推广。","展示行业对新增中间消费层级的具体建议。","强调购物术语先行、普遍认可发展阶段在后的顺序。","概括越细分类越能增利的营销机制。","将性别差异列为细分市场的方便维度并回扣主旨。"
 ].map((role,i)=>[s(i+1),role])),
 references:[
 {expression:"it",sentenceId:s(1),referent:"pink这一颜色及其文化呈现",targetSentenceIds:[s(1)],explanation:"无处不在的是粉色，不是成年女性的回忆。"},
 {expression:"It",sentenceId:s(2),referent:"句首It用于It is not that结构；后续三个it回指pink",targetSentenceIds:[s(1),s(2)],explanation:"同一表面词形在句首结构与后面实指用法不同，不能全部说指粉色。"},
 {expression:"that connection",sentenceId:s(3),referent:"前句女孩身份与外貌的绑定",targetSentenceIds:[s(2)],explanation:"原卷between girls搭配不完整；只采用明确的回指，不补造另一关系对象。"},
 {expression:"it",sentenceId:s(5),referent:"Girls' attraction to pink",targetSentenceIds:[s(5)],explanation:"is not否定前面看似不可避免、写入DNA的判断；不是否认喜爱现象存在。"},
 {expression:"them",sentenceId:s(6),referent:"clothes",targetSentenceIds:[s(6)],explanation:"要煮的是衣服，不能按较近的babies误译成煮婴儿。"},
 {expression:"which",sentenceId:s(8),referent:"red",targetSentenceIds:[s(8)],explanation:"红色与力量相联系；粉色则是红色的柔淡版本。"},
 {expression:"its",sentenceId:s(9),referent:"Blue",targetSentenceIds:[s(9)],explanation:"蓝色带有圣母玛利亚、坚定与忠贞的联想。"},
 {expression:"it",sentenceId:s(10),referent:"began前it指pink；defined后的them指girls",targetSentenceIds:[s(10)],explanation:"句首It属于时间强调结构，另一个it才实指粉色；them不是营销商。"},
 {expression:"that phase",sentenceId:s(13),referent:"toddler所指的幼儿发展阶段",targetSentenceIds:[s(12)],explanation:"that限定phase，是指示词；assumed后的内容连接词实际省略。"},
 {expression:"it",sentenceId:s(14),referent:"toddler这一术语或分类概念",targetSentenceIds:[s(12),s(13)],explanation:"被制造商推广的是概念，并非推广某个孩子。"},
 {expression:"they",sentenceId:s(15),referent:"department stores",targetSentenceIds:[s(15)],explanation:"被建议新增消费层级的是商店，非发出建议的行业刊物。"},
 {expression:"it",sentenceId:s(16),referent:"第二个it指toddler概念；句首It为强调结构成分",targetSentenceIds:[s(14),s(16)],explanation:"强调only after的先后限制。"},
 {expression:"them",sentenceId:s(18),referent:"gender differences",targetSentenceIds:[s(18)],explanation:"制造的是差异；where限定原先没有这些差异的情形。"},
 ],
 timeline:[
 {label:"20世纪早期以前及早期",event:"按颜色区分儿童性别并非一直存在；白衣先出于洗涤便利，后来出现育儿配色时粉色还曾较男性化。原文未给每一次颜色转变的准确年份。",evidence:[e(6,"not colour-coded at all until the early 20th century","原文时间界限"),e(8,"When nursery colours were introduced","后来的配色阶段"),e(9,"symbolised femininity","蓝色过去的象征")]},
 {label:"1930年代",event:"服装制造商把幼儿概念作为营销手段推广；购物术语先普及，之后才被广泛认作发展阶段。叙述在后，时间却早于粉色80年代兴盛。",evidence:[e(14,"in the 1930s","概念推广年代"),e(16,'only after "toddler" became a common shoppers\' term',"阶段接受的先后前提")]},
 {label:"1980年代中期",event:"强调年龄、性别差异成为主导营销策略，粉色才真正兴盛并显得天生吸引女孩。至少最初几个关键年份是保守范围，未说终身。",evidence:[e(10,"not until the mid-1980s","粉色兴盛时间界限"),e(10,"at least for the first few critical years","限定偏好呈现的年龄范围")]},
 ],
 voices:[
 {speaker:"作者",claim:"并不认为粉色本身不好，但批评其几乎垄断女孩想象，并承认过去低估营销对认知的塑造。",boundary:"not that、may、seem与wrong各有作用：颜色评价、可能性、表象和自我纠正不能混成绝对科学结论。",evidence:[e(2,"It is not that pink is intrinsically bad","排除误解"),e(11,"I had not realised","自我回顾"),e(13,"wrong","推翻原先假设")]},
 {speaker:"Jo Paoletti",claim:"女孩偏爱粉色并非文中看似写进DNA的必然事实，历史颜色关联变化支持这一否定。",boundary:"according to归属学者；不把文中历史材料扩大为所有生物因素均被排除。",evidence:[e(5,"according to Jo Paoletti","信息归属"),e(5,"it is not","对看似天生的否定")]},
 {speaker:"Daniel Cook与行业刊物",claim:"历史学者提供营销来源说明；行业刊物建议商店创造第三层消费类别以增销。",boundary:"历史学者是信息提供者，行业刊物是建议发出者，制造商/商店才是实际营销方，不可互换角色。",evidence:[e(14,"according to Daniel Cook","历史信息来源"),e(15,"Trade publications counselled department stores","建议人与接受者")]},
 ],
};
