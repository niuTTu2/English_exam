import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s=(n:number)=>`2010-p3-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2010P3Paragraphs = [[1,2],[3,4],[5],[6,7,8],[9,10,11,12],[13,14],[15,16]].map((numbers,i)=>({id:`2010-p3-paragraph-${i+1}`,sentenceIds:numbers.map(s)}));
export const passage2010P3Guide: ArticleGuide = {
  practice:[
    {id:"health-commercial-transfer",revision:1,kind:"choice",prompt:"公共卫生研究者为什么向私营企业学习？",options:["学习企业培养自动行为的方法，以改善卫生习惯","证明洗手是私人问题，不需公共卫生干预","帮助企业区分牙膏品牌和公司名称"],answer:"学习企业培养自动行为的方法，以改善卫生习惯",evidence:"We wanted to learn from private industry how to create new behaviors that happen automatically",feedback:"第2段先指出习惯难以改变导致卫生问题，再说向企业学习。学习来源是企业，目标仍是公共卫生。",conceptId:"paragraph-role",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["whole-route"],leaksToTasks:[{sentenceId:s(4),taskId:"industry-role"}]},
    {id:"voice-boundary",revision:1,kind:"choice",prompt:"企业说培养习惯有益，为什么不能据此认定作者态度也完全正面？",options:["后两句回到叙述层，用ruthless和问题商品、争议呈现批评","后两句声称所有消费习惯都有害","企业引语并未在原文出现"],answer:"后两句回到叙述层，用ruthless和问题商品、争议呈现批评",evidence:"through ruthless advertising",feedback:"第13—14句是Berning的商业立场，第15—16句的叙述评价强调手段的负面用途。判断作者态度要区分谁在说话，同时保留卫生习惯有益这一背景。",conceptId:"author-voice",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["whole-route"],leaksToTasks:[{sentenceId:s(15),taskId:"ruthless-voice"}]},
    {id:"whole-route",revision:1,kind:"order",prompt:"按原文排列七段的论述路线。",options:["企业培养习惯并获利","卫生研究者借鉴企业经验","公司投资寻找触发提示","提出人为习惯并以刷牙说明","饮水、口香糖和润肤品的变化","企业受访者的正面商业主张","总结机制并指出负面用途争议"],answer:JSON.stringify(["企业培养习惯并获利","卫生研究者借鉴企业经验","公司投资寻找触发提示","提出人为习惯并以刷牙说明","饮水、口香糖和润肤品的变化","企业受访者的正面商业主张","总结机制并指出负面用途争议"]),evidence:"controversies have erupted",feedback:"由企业能力与卫生需求进入商业机制和生活实例，再对照企业自述与作者结尾的批评。产品清单、销售额都服务于习惯被塑造的主题。",conceptId:"passage-route",errorType:"passage-logic",mapRevealsAnswer:true,leaksToTaskIds:["health-commercial-transfer","voice-boundary"],leaksToTasks:[{sentenceId:s(4),taskId:"industry-role"},{sentenceId:s(6),taskId:"products-predicate"},{sentenceId:s(15),taskId:"ruthless-voice"}]},
  ],
  route:["企业培养习惯并获利","卫生研究者借鉴企业经验","公司投资寻找触发提示","人为习惯与刷牙例证","三种产品进入日常程序","企业对机制的正面评价","作者总结并指出争议"],
  mainIdea:"企业借助日常提示和商业宣传培养消费习惯；这些方法可供卫生工作借鉴，也可能被用于推销有问题的商品。文章由机制和实例推进到企业自述与作者的批评，不能把研究方法、消费者行为和公司利益混成同一因果层。",
  paragraphs:[
    {paragraphId:"2010-p3-paragraph-1",title:"企业的习惯塑造手法",summary:"企业已熟悉如何让消费者形成自动行为，并从提示触发的反复消费中获利。",relation:"提出全文机制和商业背景，不是说企业只是迎合自然存在的需求。"},
    {paragraphId:"2010-p3-paragraph-2",title:"卫生工作为什么借鉴企业",summary:"Curtis指出不良卫生习惯仍会致命，研究者希望学习培养自动行为的方法。",relation:"把商业能力接到公共卫生需要；private industry指学习对象，未改变public health的问题性质。"},
    {paragraphId:"2010-p3-paragraph-3",title:"投入与提示线索",summary:"三家公司投入大量资金寻找生活中的细微提示，利用提示引入新的日常程序。",relation:"落实企业如何塑造习惯，同时明确这里列举的是公司名称。"},
    {paragraphId:"2010-p3-paragraph-4",title:"人为习惯与刷牙变化",summary:"列举日用品后指出它们与人为塑造的习惯有关，以百年前和如今的刷牙频率作对照。",relation:"由概括转入实例；广告和公共卫生宣传都在刷牙例子中起作用，不能只保留一方。"},
    {paragraphId:"2010-p3-paragraph-5",title:"三种产品进入日常生活",summary:"瓶装水改变饮水时机；口香糖被赋予饭后清洁用途；润肤品被插入晨间美容程序。",relation:"继续以具体产品说明习惯怎样被商业行为塑造，不是在比较购买力或证明所有习惯都好。"},
    {paragraphId:"2010-p3-paragraph-6",title:"企业的正面自述",summary:"Berning以产品融入日常惯例定义成功，并将培养积极习惯解释为改善生活和商业生存的关键。",relation:"企业受访者为商业策略作正面说明；引语身份必须与作者评价区分。"},
    {paragraphId:"2010-p3-paragraph-7",title:"机制效力与负面用途",summary:"研究发现广告能绑定行为与提示；作者以ruthless及问题美容霜、不健康食品和争议指出风险。",relation:"总结机制后把评价落到其商业用途；批评不等于否认所有卫生习惯的益处。"},
  ],
  sentenceRoles:Object.fromEntries([
    "提出企业已掌握培养自动消费习惯的手法。","说明提示触发的消费行为为企业带来收入。","用公共卫生困境解释改变习惯的必要性。","明确卫生研究者向企业学习培养自动行为。","说明公司投资寻找可利用的生活提示。","概括多种日用品与人为塑造的习惯相关。","回顾百年前规律地每天刷牙多次者很少。","与如今对照，指出广告和卫生宣传共同推动刷牙习惯。","回顾几十年前常在用餐时才饮水的习惯。","以装瓶销售和如今随手喝水展示变化。","说明广告把口香糖重塑为饭后清洁用品。","说明润肤品使用被嵌入已有晨间程序。","引出企业受访者的成功标准与机构背景。","延续企业对习惯培养的正面价值主张。","总结提示绑定的有效性，并用ruthless显露批评。","以问题商品与争议收束作者的负面评价。",
  ].map((role,i)=>[s(i+1),role])),
  references:[
    {expression:"These habits",sentenceId:s(2),referent:"公司培养的自动消费行为",targetSentenceIds:[s(1)],explanation:"承接automatic behaviors与habits，不是尚未养成的卫生习惯。"},
    {expression:"that",sentenceId:s(3),referent:"fundamental public health problems",targetSentenceIds:[s(3)],explanation:"关系词越过like插入例子，problems才是remain的主语。"},
    {expression:"We",sentenceId:s(4),referent:"Curtis及其公共卫生研究一方",targetSentenceIds:[s(3)],explanation:"延续Curtis的直接引语，不改成企业员工的自述。"},
    {expression:"that Dr. Curtis turned to",sentenceId:s(5),referent:"The companies",targetSentenceIds:[s(5)],explanation:"that对应to的宾语，博士求助这些公司。"},
    {expression:"that corporations could use",sentenceId:s(5),referent:"the subtle cues",targetSentenceIds:[s(5)],explanation:"that对应use的宾语，企业利用的是提示，不是消费者的生命。"},
    {expression:"their teeth",sentenceId:s(7),referent:"few people的牙齿",targetSentenceIds:[s(7)],explanation:"their与主语people一致，刷的是自己的牙齿。"},
    {expression:"their pearly whites",sentenceId:s(8),referent:"many Americans的牙齿",targetSentenceIds:[s(8)],explanation:"pearly whites借洁白形象指牙齿，不指品牌。"},
    {expression:"Our",sentenceId:s(13),referent:"Berning所代表的企业一方",targetSentenceIds:[s(13)],explanation:"引号内our不是作者与所有读者。"},
    {expression:"they",sentenceId:s(13),referent:"Our products",targetSentenceIds:[s(13)],explanation:"产品成为日常模式的一部分，并非消费者退休。"},
    {expression:"the company",sentenceId:s(13),referent:"Procter & Gamble",targetSentenceIds:[s(13)],explanation:"公司同位语解释宝洁，销售额不归Berning个人。"},
    {expression:"it",sentenceId:s(14),referent:"Creating positive habits这件事",targetSentenceIds:[s(14)],explanation:"整个动作回指，不能把it译为新产品本身。"},
    {expression:"the tactics",sentenceId:s(16),referent:"通过广告把行为与习惯性提示绑定的手段",targetSentenceIds:[s(15)],explanation:"指商业习惯塑造方法，不能偷换为科研实验本身。"},
  ],
  timeline:[
    {label:"过去十年及此前投入",event:"首句had perfected与第5句had invested表示在过去叙述参照之前已完成或发生的经营努力；原文没有写出确切参照日期。",evidence:[e(1,"Over the past decade","过程覆盖时段"),e(1,"had perfected","原卷过去完成时"),e(5,"had invested","此前资金投入")]},
    {label:"百年前与如今刷牙习惯",event:"比较的是规律地每天刷牙多次的人数倾向；few与many均不是全称判断。Today属于文章叙述当时。",evidence:[e(7,"A century ago","过去参照"),e(7,"few people regularly brushed their teeth multiple times a day","旧习惯"),e(8,"Today","如今对照")]},
    {label:"饮水时机的变化",event:"几十年前常只在餐时饮水，后来企业装瓶销售，如今职员全天随手小口饮用；then与now连接两套主谓。",evidence:[e(9,"A few decades ago","较早习惯"),e(10,"Then beverage companies started bottling","后来的经营行动"),e(10,"now office workers unthinkingly sip bottled water all day long","文中当前习惯")]},
    {label:"口香糖的旧市场与新定位",event:"once限定过去购买者，now限定广告宣传，after a meal限定建议使用时机，三者不能互换。",evidence:[e(11,"once bought primarily by adolescent boys","旧购买群体"),e(11,"is now featured in commercials","如今宣传"),e(11,"for use after a meal","使用时机")]},
    {label:"退休与销售的不同参照",event:"recently修饰Berning退休，last year修饰公司销售，不能由此推算读者当前年份的财务数据。",evidence:[e(13,"recently retired","个人退休"),e(13,"last year","公司上一年销售")]},
  ],
  voices:[
    {speaker:"Curtis（公共卫生研究者）",claim:"不良卫生习惯仍致命，因此希望向企业学习培养自动行为。",boundary:"这是借鉴方法的卫生目标，不是将卫生问题归为私人领域，也不表示所有企业产品都健康。",evidence:[e(3,"fundamental public health problems","公共问题"),e(4,"learn from private industry","借鉴对象")]},
    {speaker:"Berning（企业背景的消费心理学家）",claim:"产品融入日常惯例即可商业成功；她把培养积极习惯说成改善生活和产品生存的重要条件。",boundary:"两句直接引语属于受访者，不能替代作者在结尾的评价。",evidence:[e(13,"Our products succeed when they become part of daily or weekly patterns","成功标准"),e(14,"Creating positive habits is a huge part of improving our consumers' lives","正面主张")]},
    {speaker:"作者的叙述与评价",claim:"广告塑造习惯确有效力，但不顾后果的商业使用会把问题商品推给消费者并引发争议。",boundary:"negative评价指广告对习惯的影响及其负面用途；不是宣称刷牙洗手本身有害，也不是凭空指控偏见。",evidence:[e(15,"ruthless advertising","负面用词"),e(16,"questionable beauty creams or unhealthy foods","问题用途"),e(16,"controversies have erupted","争议后果")]},
  ],
};
