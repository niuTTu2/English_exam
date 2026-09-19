import type { PracticeTask, GrammarConceptId, ErrorCategory } from "./learning-model";
type Hints = Pick<PracticeTask, "hintWords" | "mapRevealsAnswer" | "leaksToTaskIds" | "leaksToTasks">;
const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hints: Hints): PracticeTask => ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType, ...hints });
const choice = (id: string, prompt: string, options: string[], answer: number, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hints: Hints): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[answer], evidence, feedback, conceptId, errorType, ...hints });
const link = (id: string, prompt: string, pairs: Array<[string,string]>, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hints: Hints): PracticeTask => ({ id, revision: 1, kind: "link", prompt, options: pairs.map(pair => pair[1]), answer: JSON.stringify(pairs.map(pair => pair[1])), links: pairs.map(([source,target]) => ({ source,target })), evidence, feedback, conceptId, errorType, ...hints });
const order = (id: string, prompt: string, answer: string[], extras: string[], evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hints: Hints): PracticeTask => ({ id, revision: 1, kind: "order", prompt, options: [...answer,...extras], answer: JSON.stringify(answer), evidence, feedback, conceptId, errorType, ...hints });
const s=(n:number)=>`2012-p2-s${n}`;
export const passage2012P2Practice:Record<string,PracticeTask[]>={
  [s(1)]:[
    range("remember-object","划出remember所接的完整动名词宾语。","being so obsessed with the colour","remember doing回忆曾经的经验，being没有另立一个有时态的主句；with引痴迷对象。","nonfinite-participle","attachment",{hintWords:["remember","being","obsessed","being so obsessed with the colour"]}),
    choice("generational-contrast","yet连接哪两种情况？",["成年女性不记得如此痴迷，与当前女孩生活中粉色无处不在","女孩基因已经发生变化，与所有成人都爱蓝色","作者昨天与今天的衣服颜色"],0,"yet it is pervasive in our young girls' lives","原文只呈现代际反差，为后面追问历史和营销原因铺垫，不能补成基因结论。","negation-contrast","passage-logic",{hintWords:["yet","pervasive"],mapRevealsAnswer:true}),
  ],
  [s(2)]:[
    range("though-concession","划出完整though让步从句，在逗号前停止。","though it may celebrate girlhood in one way","让步仅承认粉色可能以一种方式赞美女孩时期，主句仍批评把身份绑到外貌。","clause-concession","clause-boundary",{hintWords:["though","may","celebrate","celebrate girlhood in one way"]}),
    link("fuse-relations","把绑定结构的三个角色配对。",[["it","施事：粉色及其文化作用"],["girls' identity","宾语：被绑定的身份"],["to appearance","绑定对象：外貌"]],"it also repeatedly and firmly fuses girls' identity to appearance","fuse A to B中A为宾语，to B说明绑定到什么；不能把appearance当作施事。","basic-svo","attachment",{hintWords:["it","fuses","identity","appearance","fuses girls' identity to appearance"]}),
    choice("tiny-slice","tiny slice的批评重点是什么？",["单一颜色不足以代表女孩时期的丰富可能","粉色没有任何社会影响","粉色是一种本质上坏的颜色"],0,"such a tiny slice of the rainbow","前面否定颜色本身不好，后面又明确其绑定作用；小片彩虹批评代表性太窄，不是否认影响。","comparison-scope","option-logic",{hintWords:["tiny","slice","rainbow","a tiny slice of the rainbow"],mapRevealsAnswer:true,leaksToTasks:[{sentenceId:"2012-p2-map",taskId:"pink-criticism"}]}),
  ],
  [s(3)]:[
    link("confirmed-relations","只匹配原文能确认的回指与评价，不补全异常片段。",[["that connection","前句女孩身份与外貌的绑定"],["even among two-year-olds","连两岁儿童也涉及"],["not only innocent but as evidence of innocence","由无害推进到纯真证据"]],"that connection, even among two-year-olds, between girls as not only innocent but as evidence of innocence","between girls缺少可确认的另一对象，不能补造pink或and；回指和评价递进仍有原文依据。","reference-pronoun","reference",{hintWords:["connection","that","innocent","innocence","not only innocent but as evidence of innocence"],mapRevealsAnswer:true}),
  ],
  [s(4)]:[
    link("observer-and-topic","把观察者与想象内容配对。",[["Looking around的逻辑主语","I，即作者"],["about girls' lives and interests修饰的对象","imagination，即对女孩生活兴趣的设想"]],"Looking around, I despaired at the singular lack of imagination about girls' lives and interests","不是周围事物在观察，也不是指责女孩自身缺乏想象力；分词施事与介词修饰对象要分别还原。","nonfinite-subject","attachment",{hintWords:["Looking","I","about","imagination","despaired at the singular lack of imagination"]}),
  ],
  [s(5)]:[
    order("appearance-and-denial","去掉人物身份与DNA补充，重建前后两组主系表，保留否定。",["Girls' attraction to pink","may seem","unavoidable","but","it","is not"],["encoded in their DNA"],"Girls' attraction to pink may seem unavoidable","may seem给表面印象，but后的is not纠正；即使DNA字样出现也不能当成作者已证明的事实。","basic-svc","predicate",{hintWords:["may","seem","unavoidable","not","encoded in their DNA"]}),
    choice("researcher-role","according to Jo Paoletti标出什么？",["否定天生论的信息来源","女孩吸引粉色的生物机制","被服装商制造出的颜色名称"],0,"according to Jo Paoletti","according to给观点来源，教授身份补充她是谁；后面的历史才是支持这种看法的证据。","author-voice","passage-logic",{hintWords:["according","according to Jo Paoletti"],mapRevealsAnswer:true}),
  ],
  [s(6)]:[
    range("since-cause","划出解释穿白色原因的完整since从句。","since the only way of getting clothes clean was to boil them","since在此意为因为；way作主语，to boil them作表语，them指衣服，不能译成煮婴儿。","clause-cause","clause-boundary",{hintWords:["since","way","boil","them","the only way of getting clothes clean"]}),
    link("washing-complement","匹配getting clothes clean中的对象与状态。",[["clothes","getting的宾语：衣服"],["clean","宾语补足语：衣服变干净"]],"getting clothes clean","get A adjective表示使A处于某状态；clean为形容词，不是与getting平列的新谓语。","object-complement","attachment",{hintWords:["getting","clothes","clean"]}),
    choice("white-reason","婴儿都穿白色的直接原因是什么？",["当时清洗靠煮的实际条件","婴儿已经表达出对白色的偏爱","白色天然属于男性"],0,"as a practical matter, since the only way of getting clothes clean was to boil them","实用理由由since明确给出；不能把照护者的清洗条件偷换成婴儿自身偏好。","paragraph-role","option-logic",{hintWords:["practical","since","boil","as a practical matter"],mapRevealsAnswer:true}),
  ],
  [s(7)]:[
    range("wore-object","划出wore的整个what宾语从句。","what were thought of as gender-neutral dresses","what兼任从句主语，整体指被视为不分性别的裙装；中性修饰衣物，不能换到粉色颜色上。","clause-object","clause-boundary",{hintWords:["what","thought","gender-neutral","what were thought of as gender-neutral dresses"]}),
  ],
  [s(8)]:[
    link("passive-reference","把主句补足语和which回指接到正确对象。",[["the more masculine colour","说明被动主语pink被视为什么"],["which","回指red，说明红色与力量有关"]],"pink was actually considered the more masculine colour, a pastel version of red, which was associated with strength","被动句的pink已经是主语，后面的身份补充不是第二个宾语；which补充紧邻red。","passive-voice","attachment",{hintWords:["considered","which","red","was actually considered the more masculine colour","was associated with strength"]}),
  ],
  [s(9)]:[
    order("blue-trunk","拿掉with插入联想，重建主谓宾。",["Blue","symbolised","femininity"],["with its intimations","the Virgin Mary"],"symbolised femininity","with短语提供蓝色的宗教与品格联想，主句仍是蓝色象征女性气质。","basic-svo","predicate",{hintWords:["Blue","symbolised","femininity","symbolised femininity"]}),
  ],
  [s(10)]:[
    link("nested-times","匹配强调结构与两个when中的内容。",[["It was not until ... that ...","直到80年代中期才兴盛的时间强调"],["when amplifying ... became ...","补充那个时代的营销策略"],["when it began to seem ...","补充当时呈现的天生吸引印象"]],"when amplifying age and sex differences became a dominant children's marketing strategy","第一个when说明时代，第二个when说明粉色兴盛时的表象；seem不可删成确证天性。","time-reference","clause-boundary",{hintWords:["until","when","that","seem","It was not until the mid-1980s"],mapRevealsAnswer:true}),
    range("definition-what","划出of后完整的what名词性从句。","what defined them as female","what兼作defined主语，them指女孩，as female给分类身份；不是不定式，也不是直接疑问句。","clause-object","clause-boundary",{hintWords:["what","defined","them","female"]}),
    choice("least-years","at least for the first few critical years保留了什么限制？",["至少在最初几个关键年份，并未断言一生","只在某一年且之后必然完全消失","对所有年龄段永远没有例外"],0,"at least for the first few critical years","at least是保守下限，for给持续范围，原文没有写精确截止年龄，也没有扩大到终身。","time-reference","option-logic",{hintWords:["least","first","few","years","at least for the first few critical years"]}),
  ],
  [s(11)]:[
    range("perception-what","只划出of后解释认知对象的完整what从句。","what is natural to kids","what为is主语，natural to kids为表语；外层被dictated左右的是our perception，不是DNA。","clause-object","clause-boundary",{hintWords:["what","natural","to"]}),
    link("marketing-claim","把外层认识、影响施事与被影响对象连起来。",[["I had not realised","作者过去尚未认识到"],["marketing trends","dictated的施事"],["our perception","dictated的宾语"]],"I had not realised how profoundly marketing trends dictated our perception","how profoundly说明影响深度；including把心理发展信念纳入被左右的认知范围。","basic-svo","attachment",{hintWords:["realised","marketing","dictated","perception","dictated our perception"],mapRevealsAnswer:true}),
  ],
  [s(12)]:[choice("take-example","Take the toddler在段落中执行什么任务？",["引出幼儿概念的来源这个例子","要求把一名幼儿抱走","给幼儿安排一项实验"],0,"Take the toddler","祈使句省略you，take在这里整体用来举例；看后文phase和marketing trick就能确认。","paragraph-role","passage-logic",{hintWords:["Take","toddler","Take the toddler"],mapRevealsAnswer:true})],
  [s(13)]:[
    link("two-omissions","分清明写的that与实际省略的连接成分。",[["that phase中的that","指示限定词：那个阶段"],["assumed与that phase之间","宾语从句连接词被省略"],["experts developed前","定语从句宾语关系词被省略"]],"I assumed that phase was something experts developed","that phase整体是was主语；不要一见assumed that就把that当连接词。experts是developed主语，省略的关系词指something。","clause-object","clause-boundary",{hintWords:["that","phase","assumed","experts","developed","assumed that phase was something"]}),
    choice("wrong-scope","冒号后的wrong推翻什么？",["作者以为幼儿阶段来自专家多年研究的原先设想","儿童的所有行为","所有专家的人格"],0,"research into children's behaviour: wrong","wrong是作者对自己先前assumption的纠正，不能摘下来变成对儿童或研究者的人身评价。","author-voice","passage-logic",{hintWords:["wrong","assumed"],mapRevealsAnswer:true,leaksToTasks:[{sentenceId:"2012-p2-map",taskId:"toddler-order"}]}),
  ],
  [s(14)]:[
    link("source-and-agent","把研究者、制造商和年代配回其角色。",[["according to Daniel Cook","信息来源"],["by clothing manufacturers","推广概念的实际施事"],["in the 1930s","推广发生的年代"]],"it was popularised as a marketing trick by clothing manufacturers in the 1930s","according to不是被动施事，by才连接推广者；it承接toddler术语，1930s是十年范围。","passive-voice","attachment",{hintWords:["according","by","popularised","1930s","according to Daniel Cook"],mapRevealsAnswer:true}),
  ],
  [s(15)]:[
    range("advice-content","划出that开始的完整建议内容，含目的短语。","that, in order to increase sales, they should create a \"third stepping stone\" between infant wear and older kids' clothes","that从句给出counselled的内容；in order to说明增销目的，they指department stores。","clause-object","clause-boundary",{hintWords:["that","they","counselled","in order to increase sales"]}),
    choice("third-layer","third stepping stone的建议是什么？",["在已有两类之间新增市场层级","只保留婴儿装与大童装两类","制造第三块真石头"],0,"a \"third stepping stone\" between infant wear and older kids' clothes","between给出两端，third比喻新增中间层；不是让商店只关注两端。","paragraph-role","option-logic",{hintWords:["third","stepping","between","a \"third stepping stone\"","between infant wear and older kids' clothes"],mapRevealsAnswer:true}),
  ],
  [s(16)]:[
    order("term-before-stage","按论证先后重建两阶段，保留先后关系。",["\"toddler\" became a common shoppers' term","it evolved into a broadly accepted developmental stage"],["科学先证明固定阶段"],"only after \"toddler\" became a common shoppers' term","only after强调购物术语先普及，之后才被普遍当作发展阶段；顺序不能倒置成科学定义先于市场称谓。","time-reference","passage-logic",{hintWords:["only","after","that","evolved","term","only after \"toddler\" became a common shoppers' term"],mapRevealsAnswer:true,leaksToTasks:[{sentenceId:"2012-p2-map",taskId:"toddler-order"}]}),
  ],
  [s(17)]:[
    range("splitting-subject","划出has proved的完整动名词主语。","Splitting kids, or adults, into ever-tinier categories","主语是整个分类行为，kids/adults只在其中作宾语；单数has不跟最近的categories变化。","subject-head","subject",{hintWords:["Splitting","has","categories","into ever-tinier categories"]}),
    choice("proved-role","a sure-fire way在has proved后是什么？",["说明分类行为结果的表语","被证明的动作对象宾语","独立的新主语"],0,"has proved a sure-fire way to boost profits","prove此处为结果表明是，名词短语说明行为的性质；boost profits说利润，不能改写成销量必定增加。","basic-svc","predicate",{hintWords:["proved","way","profits","a sure-fire way to boost profits"]}),
  ],
  [s(18)]:[
    range("where-circumstance","划出限定invent情形的完整where从句。","where they did not previously exist","where前没有名词先行词，直接限定invent发生的情形；they回指gender differences。","clause-place","clause-boundary",{hintWords:["where","they","previously","where they did not previously exist"]}),
    choice("claim-boundary","invent them where they did not previously exist允许推出哪一项？",["商家会在原本没有差异的情形中制造差异","所有性别差异都已被证明不存在","本文已排除一切生物因素"],0,"invent them where they did not previously exist","作者批评营销放大乃至制造差异，不把局部情形扩大为所有性别差异的科学结论。","comparison-scope","option-logic",{hintWords:["invent","where","them"],mapRevealsAnswer:true}),
  ],
};
