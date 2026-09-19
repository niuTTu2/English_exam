import type {ArticleGuide,PassageEvidence} from './article-teaching';
const s=(n:number)=>`2011-p3-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2011P3Paragraphs=[
 {id:'2011-p3-paragraph-1',sentenceIds:[1].map(s)},
 {id:'2011-p3-paragraph-2',sentenceIds:[2,3].map(s)},
 {id:'2011-p3-paragraph-3',sentenceIds:[4,5,6].map(s)},
 {id:'2011-p3-paragraph-4',sentenceIds:[7,8,9,10].map(s)},
 {id:'2011-p3-paragraph-5',sentenceIds:[11,12].map(s)},
 {id:'2011-p3-paragraph-6',sentenceIds:[13,14].map(s)},
 {id:'2011-p3-paragraph-7',sentenceIds:[15,16,17].map(s)},
];
export const passage2011P3Guide:ArticleGuide={
 practice:[
 {id:'mindset-and-style',revision:1,kind:'choice',prompt:'战后时代的繁荣印象与住宅设计中的“少即是多”怎样连接？',options:['节俭经验与未来信心共同让小巧高效的住宅成为时尚','繁荣使所有住宅必须扩大面积','作者认为住宅仅由经济条件决定'],answer:'节俭经验与未来信心共同让小巧高效的住宅成为时尚',evidence:'that restraint, in combination with the postwar confidence in the future',feedback:'第一段给时代总体背景，But后转向住宅观念。restraint与confidence是心理原因，small, efficient housing是受影响的住宅特征，不能互换问题对象。',conceptId:'paragraph-role',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(3),taskId:'mindset-versus-feature'}],leaksToTaskIds:['paragraph-route']},
 {id:'less-with-conditions',revision:1,kind:'choice',prompt:'“少即是多”的设计判断必须保留哪项限定？',options:['较少装饰需合理安排，优雅可与小巧高效及精细比例并存','完全取消所有细节就必然优雅','面积越小、装饰越少，效果就无条件越好'],answer:'较少装饰需合理安排，优雅可与小巧高效及精细比例并存',evidence:'less decoration, properly organized, has more impact than a lot',feedback:'properly organized限定安排得当；公寓的细部与比例也是美感来源。原文比较装饰数量与审美效果，并未主张完全空无或牺牲细节。',conceptId:'comparison-scope',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(7),taskId:'two-comparison-dimensions'},{sentenceId:s(7),taskId:'organized-receiver'},{sentenceId:s(16),taskId:'aesthetic-sources'}]},
 {id:'paragraph-route',revision:1,kind:'order',prompt:'按七个原段重建全文发展路线。',options:['战后繁荣的通常印象','住宅观念中的节制与信心','包豪斯相关设计师的传播影响','解释密斯少而精的设计理念','以芝加哥小公寓说明审美效果','补充赖特的美国本土源流','案例住宅的本土影响、美感与技术愿景'],answer:JSON.stringify(['战后繁荣的通常印象','住宅观念中的节制与信心','包豪斯相关设计师的传播影响','解释密斯少而精的设计理念','以芝加哥小公寓说明审美效果','补充赖特的美国本土源流','案例住宅的本土影响、美感与技术愿景']),evidence:'were yet another homegrown influence',feedback:'时代背景→住宅心态→欧洲理念传播→密斯的理念与实例→美国本土设计先例和案例住宅。经济推动只是一个因素，外来与本土两条源流共同成立。',conceptId:'passage-route',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['mindset-and-style'],leaksToTasks:[{sentenceId:s(4),taskId:'limited-economic-cause'},{sentenceId:s(13),taskId:'partial-negation'},{sentenceId:s(15),taskId:'another-local-example'}]},
 ],
 route:['战后繁荣的通常印象','住宅观念中的节制与信心','包豪斯相关设计师的传播影响','解释密斯少而精的设计理念','以芝加哥小公寓说明审美效果','补充赖特的美国本土源流','案例住宅的本土影响、美感与技术愿景'],
 mainIdea:'战后美国住宅设计中的“少即是多”，既源于节制经验与未来信心，也受包豪斯相关设计师和美国本土设计实践共同影响。密斯的小型高效空间及案例住宅说明：美感可以来自合理安排、材料、景观和细部比例，未必依赖面积或装饰数量。具体技术预测可能失准，并不抹去当时广受认同的自给自足理想。',
 paragraphs:[
 {paragraphId:'2011-p3-paragraph-1',title:'战后繁荣的时代印象',summary:'返乡、大学教育与婚姻登记的场景构成通常的繁荣发展印象。',relation:'提供宏观背景，下一段But转入住宅的不同取向。'},
 {paragraphId:'2011-p3-paragraph-2',title:'节制与信心塑造小型住宅',summary:'大萧条和战争留下节俭经验，战后又有未来信心，两者让小巧高效住宅成为时尚。',relation:'说明住宅风格反映的心理原因；与第一段繁荣背景、房屋的实用特征分开。'},
 {paragraphId:'2011-p3-paragraph-3',title:'欧洲设计理念在美国传播',summary:'经济只是一项刺激；密斯等包豪斯相关设计师战前赴美任教，深刻影响美国建筑，其中密斯尤为突出。',relation:'从经济解释转向思想传播，区分推广格言与创办学校。'},
 {paragraphId:'2011-p3-paragraph-4',title:'少而精的理念与材料表达',summary:'装饰少但安排得当也可更有表现力；当年象征未来的材料与精巧呈现让小空间保持优雅。',relation:'解释理念，不将少装饰等同完全空无，也不把当年新潮误读为早已普遍。'},
 {paragraphId:'2011-p3-paragraph-5',title:'芝加哥公寓的具体例证',summary:'密斯两居室面积不足一千平方英尺、比邻楼同类公寓小，却因玻璃墙、景观和细部比例受欢迎，并呼应抽象艺术。',relation:'用可核对面积和审美来源证明小与优雅可以并存。'},
 {paragraphId:'2011-p3-paragraph-6',title:'赖特提供美国本土源流',summary:'简约风潮并非全为外来；赖特30年代住宅比自己的早期设计更适度高效。',relation:'not entirely作部分否定，补充本土例证而非取消欧洲影响。'},
 {paragraphId:'2011-p3-paragraph-7',title:'案例住宅、美感与技术愿景',summary:'杂志委托的案例住宅再提供本土推动力，依靠景观、新材料及细部获得美感；家庭技术预测不尽准确，自给自足信念仍广受接受。',relation:'延续本土源流并区分技术细节与总体理想，结尾不把所有设备一概说成普及。'},
 ],
 sentenceRoles:Object.fromEntries([
 '以三项士兵活动描绘战后繁荣印象。','But把总体时代印象转入住宅的理性简约观念。','说明节制与信心共同塑造时髦的小型高效住宅。','限制经济因素解释，为设计理念传播铺垫。','介绍密斯推广格言及相关设计师赴美任教。','概括设计师影响，并突出密斯程度最大。','定义装饰少而精、效果更强的格言含义。','将不靠堆砌获得优雅的观点归于密斯。','对比相同材料如今寻常与当年象征未来。','说明精巧呈现使空间小而高效的事实不显眼。','以同类公寓面积比较提供具体实例。','列三项受欢迎原因，并类比抽象艺术形式。','部分否定全外来，转向美国本土根源。','以赖特自身不同时期住宅变化作本土例子。','以案例住宅项目追加一项美国本土影响。','列景观、材料及细部三项美感来源。','承认技术预测差异，保留广受认同的自给自足理想。',
 ].map((role,i)=>[s(i+1),role])),
 references:[
 {expression:'their houses',sentenceId:s(2),referent:'战后美国人的住宅',targetSentenceIds:[s(1),s(3)],explanation:'话题从总体社会繁荣转入这些人的居住设计。'},
 {expression:'that restraint',sentenceId:s(3),referent:'此前学会以较少物质资源生活的节制',targetSentenceIds:[s(3)],explanation:'that是名词前限定词，回指to live with less的生活经验。'},
 {expression:'who',sentenceId:s(5),referent:'密斯',targetSentenceIds:[s(5)],explanation:'关系代词跨过like背景，共同作emigrated和took up主语。'},
 {expression:'These designers',sentenceId:s(6),referent:'前文与包豪斯有关并移居美国的设计师',targetSentenceIds:[s(5)],explanation:'不能扩为所有美国建筑师，更不能推出多数都曾就读包豪斯。'},
 {expression:'none',sentenceId:s(6),referent:'这些设计师中没有其他人',targetSentenceIds:[s(5),s(6)],explanation:'与more so than Mies共同突出密斯影响最大，不否认群体影响。'},
 {expression:'a lot',sentenceId:s(7),referent:'大量装饰',targetSentenceIds:[s(7)],explanation:'承接less decoration省略装饰名词，不能改为大房屋。'},
 {expression:'he',sentenceId:s(8),referent:'密斯',targetSentenceIds:[s(7)],explanation:'插入引述语标明优雅观点的持有人。'},
 {expression:'that',sentenceId:s(9),referent:'金属、玻璃和层压木材这些材料',targetSentenceIds:[s(9)],explanation:'两处that同回指materials，但前为宾语、后为主语。'},
 {expression:'those',sentenceId:s(11),referent:'公寓',targetSentenceIds:[s(11)],explanation:'与apartments作同类面积比较；older neighbors为附近旧楼。'},
 {expression:'they',sentenceId:s(12),referent:'前段所述密斯公寓',targetSentenceIds:[s(11)],explanation:'主句were popular与定语从句afforded的主体都为公寓。'},
 {expression:'ones',sentenceId:s(14),referent:'赖特早年设计的住宅',targetSentenceIds:[s(14)],explanation:'代替houses，he指赖特，不沿用之前密斯。'},
 {expression:'yet another',sentenceId:s(15),referent:'在赖特之外追加的另一项本土影响',targetSentenceIds:[s(13),s(14)],explanation:'yet加强another，连接两段本土实例。'},
 {expression:'his',sentenceId:s(17),referent:'拉尔夫·拉普森',targetSentenceIds:[s(17)],explanation:'句首作品与后面的belief均属于Rapson。'},
 {expression:'most',sentenceId:s(17),referent:'大多数美国家庭',targetSentenceIds:[s(17)],explanation:'承接American families，得到的是干衣机，不是直升机。'},
 ],
 timeline:[
 {label:'战前节制→战后住宅风尚',event:'大萧条和战争时期已学会节俭，战后的信心与这种经验共同塑造住宅风格。',evidence:[e(3,'During the Depression and the war, Americans had learned to live with less','过去完成时的先行经验'),e(3,'the postwar confidence in the future','后来的时代心态')]},
 {label:'密斯等人在二战前移居',event:'before World War II限定移居美国，随后叙述任教和设计影响；未说二战改变包豪斯理念。',evidence:[e(5,'emigrated to the United States before World War II','明确移居时点')]},
 {label:'当年新潮与如今寻常',event:'同一批建筑材料在1940年代象征未来，到叙述当下已成为习以为常的材料。',evidence:[e(9,'we take for granted today','当前常态'),e(9,'in the 1940s symbolized the future','过去的新颖性')]},
 {label:'赖特的旧设计与1930年代变化',event:'1890年代和20世纪初的住宅先出现；1930年代开始建造更适度高效的住宅，通常约1200平方英尺。',evidence:[e(14,'In the 1930s','新阶段'),e(14,'he had designed in the 1890s and the early 20th century','较早设计'),e(14,'usually around 1,200 square feet','典型近似面积')]},
 {label:'1945—1962年案例住宅委托',event:'这一时间区间限定杂志向建筑师委托项目，不是某个人完整职业生涯。',evidence:[e(15,'between 1945 and 1962','委托时段')]},
 {label:'过去预测与后来实际普及',event:'Rapson对日常技术影响的预测可能有误；最终干衣机普及，直升机却没有成为普通家庭常用设备。',evidence:[e(17,'may have mispredicted','对过去预测的判断'),e(17,'few American families acquired helicopters','一种现实结果'),e(17,'most eventually got clothes dryers','另一种后来结果')]},
 ],
 voices:[
 {speaker:'作者与一般读者的通常印象',claim:'战后几十年常被看作繁荣与发展时期。',boundary:'We tend to think是通常看法，不能直接代替住宅设计背后的心理解释。',evidence:[e(1,'We tend to think of the decades','印象来源')]},
 {speaker:'密斯',claim:'装饰较少但安排得当可更有表现力，优雅并非来自大量堆砌。',boundary:'不等于完全无装饰、没有细节或无限缩小面积；properly organized是实际条件。',evidence:[e(7,"Mies's signature phrase means",'理念归属'),e(8,'he believed','明确观点标记')]},
 {speaker:'Rapson及认同其理想的人们',claim:'自给自足既可取又不可避免。',boundary:'技术预测可能失准与总体信念广受接受是不同层级；不能由干衣机推广到所有设备。',evidence:[e(17,'his belief that self-sufficiency was both desirable and inevitable was widely shared','理念与认同范围')]},
 {speaker:'文章叙述者',claim:'美国简约住宅既有欧洲设计师影响，也有赖特和案例住宅的本土源流。',boundary:'not entirely不消除外来影响，yet another追加本土例子；没有给任何人创办包豪斯的事实。',evidence:[e(13,'was not entirely foreign','来源判断的边界'),e(15,'yet another homegrown influence','追加本土证据')]},
 ],
};
