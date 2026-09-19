import type { ArticleGuide, PassageEvidence } from './article-teaching';
const s=(n:number)=>`2011-p2-s${n}`;
const e=(n:number,quote:string,role:string):PassageEvidence=>({sentenceId:s(n),quote,role});
export const passage2011P2Paragraphs=[
 {id:'2011-p2-paragraph-1',sentenceIds:[1,2,3,4,5,6,7,8,9].map(s)},
 {id:'2011-p2-paragraph-2',sentenceIds:[10,11,12,13].map(s)},
 {id:'2011-p2-paragraph-3',sentenceIds:[14,15,16,17,18,19].map(s)},
 {id:'2011-p2-paragraph-4',sentenceIds:[20,21,22,23,24].map(s)},
 {id:'2011-p2-paragraph-5',sentenceIds:[25,26,27,28,29,30].map(s)},
];
export const passage2011P2Guide:ArticleGuide={
 practice:[
 {id:'turning-point',revision:1,kind:'choice',prompt:'第一、二段怎样处理“报纸即将消亡”的预测？',options:['先回顾危机，再用存活与低水平盈利修正消亡预测','先否认危机存在，再证明报纸已全面繁荣','宣布报业消亡，继而讨论过去的利润'],answer:'先回顾危机，再用存活与低水平盈利修正消亡预测',evidence:'have not only survived but often returned to profit',feedback:'A year ago与now划开时间；第二段承认利润率不及从前，但仍有利润。修正的是必然消亡的预测，并未宣告全面繁荣。',conceptId:'passage-route',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['paragraph-route'],leaksToTasks:[{sentenceId:s(9),taskId:'current-assessment'},{sentenceId:s(13),taskId:'profit-limits'}]},
 {id:'same-revenue-basis',revision:1,kind:'choice',prompt:'87%与35%是按什么共同口径比较的？',options:['美国、日本各自广告收入占报纸全部收入的比例','两国报纸在世界市场的份额','两国扣除成本后的利润率'],answer:'美国、日本各自广告收入占报纸全部收入的比例',evidence:'Fully 87% of their revenues came from advertising in 2008',feedback:'下一句the proportion沿用广告收入占总收入这一指标；美国87%、日本35%，由此推得日本广告依赖较低。不能把它换成利润率或来源种类数。',conceptId:'reference-pronoun',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTasks:[{sentenceId:s(22),taskId:'revenue-denominator'},{sentenceId:s(23),taskId:'same-indicator'}]},
 {id:'paragraph-route',revision:1,kind:'order',prompt:'依原卷五段重建论证顺序。',options:['回顾危机与救济讨论，转向当下','确认报业存活、部分恢复盈利','说明裁员和紧缩的代价与效果','比较收入结构，解释稳定性','说明裁撤范围，强调特色胜于全面'],answer:JSON.stringify(['回顾危机与救济讨论，转向当下','确认报业存活、部分恢复盈利','说明裁员和紧缩的代价与效果','比较收入结构，解释稳定性','说明裁撤范围，强调特色胜于全面']),evidence:'But completeness is no longer a virtue in the newspaper business',feedback:'全文围绕艰难求生：危机预测被修正，复苏伴随代价，再解释收入结构与内容取舍。只读危机或只读恢复盈利，都会漏掉另一半。',conceptId:'passage-route',errorType:'passage-logic',mapRevealsAnswer:true,leaksToTaskIds:['turning-point'],leaksToTasks:[{sentenceId:s(14),taskId:'recovery-cost'},{sentenceId:s(19),taskId:'qualified-evaluation'},{sentenceId:s(30),taskId:'no-longer-limit'}]},
 ],
 route:['回顾危机与救济讨论，转向当下','确认报业存活、部分恢复盈利','说明裁员和紧缩的代价与效果','比较收入结构，解释稳定性','说明裁撤范围，强调特色胜于全面'],
 mainIdea:'曾被预言即将消亡的报业正在艰难求生：一些报纸已恢复盈利，却要付出裁员、涨价、缩小服务和内容范围的代价。更均衡的收入结构有助稳定经营，而有特色的内容比面面俱到更重要。文章既承认转机，也没有把生存说成繁荣。',
 paragraphs:[
 {paragraphId:'2011-p2-paragraph-1',title:'消亡预言与当前转折',summary:'回忆一年前的衰退、网络分流和报纸自述厄运，介绍政府讨论的救济方案；最后指出这些讨论如今似乎过时。',relation:'以反问引入旧预测，用But和now转向当前观察；是否补贴是提议，不是已发生的结果。'},
 {paragraphId:'2011-p2-paragraph-2',title:'有利润，但未恢复昔日水平',summary:'德国、巴西与美国的例子表明报纸存活且部分恢复盈利；利润率虽未回到曾常见的20%，仍然有利润。',relation:'为第一段转折提供事实，同时给乐观判断加上利润水平的限制。'},
 {paragraphId:'2011-p2-paragraph-3',title:'紧缩奏效，也带来代价',summary:'裁员、读者付更多钱买更薄报纸、减少偏远配送共同构成求生措施；这些措施奏效，却可能继续伤害记者利益。',relation:'由复苏结果转入实现方式；经营有效与员工受损可以同时成立。'},
 {paragraphId:'2011-p2-paragraph-4',title:'收入比例影响稳定性',summary:'收入结构正在改善；美国广告收入占比87%，日本35%，日本较少依赖广告而更加稳定。',relation:'从节流转向收入结构，比较同一指标的比例，不能据此断言来源种类更多。'},
 {paragraphId:'2011-p2-paragraph-5',title:'收缩全面覆盖，保留独特价值',summary:'裁撤集中在独特性较弱的报道领域，包括评论员、部分记者及驻外机构；报纸变得不全面，但全面性如今不再是优势。',relation:'解释内容取舍并形成结尾判断，强调特色；并未宣称全面性导致失败或读者失去所有兴趣。'},
 ],
 sentenceRoles:Object.fromEntries([
 '反问消亡预言如今为何没有下文。','回到一年前悲观判断的时间点。','交代互联网分流与衰退的双重压力。','以报纸报道自身厄运凸显困境。','交代联邦贸易委员会讨论救济。','列出慈善机构改制的提议。','列出政府补贴的提议。','说明政府机构仍计划继续开会。','用当前判断否定旧救济讨论的时效。','从世界多数地区纠正全面危机的印象。','给出德国、巴西报业挺过衰退的实例。','说明最受困的美国报纸也存活且部分盈利。','限制恢复程度：利润率不及从前，但仍有利润。','以轻描淡写引出复苏的不轻松。','用航船比喻说明靠裁员维持经营。','用岗位数字量化员工付出的代价。','指出读者支出增加而内容减少。','补充收缩偏远配送的紧缩措施。','肯定措施效果，同时承认进一步收缩的代价。','把更均衡的收入组合引入论证。','说明美国长期过于依赖广告的特点。','以87%广告收入比例量化美国情况。','以同一比例35%给出日本对照。','点明较少广告依赖与稳定经营的联系。','说明裁撤普遍冲击及其主要集中领域。','列举汽车与电影评论员岗位削减。','用承接倒装追加科学及一般商业记者。','追加驻外机构遭大幅裁撤。','承认内容覆盖因裁撤而变得不全面。','指出全面性不再构成优势，回扣特色的重要。',
 ].map((role,i)=>[s(i+1),role])),
 references:[
 {expression:'the end',sentenceId:s(2),referent:'报纸行业的消亡',targetSentenceIds:[s(1)],explanation:'承接death of newspapers，是一年前的观感而非已经发生的终结。'},
 {expression:'their own',sentenceId:s(4),referent:'正在报道的那些报纸自身',targetSentenceIds:[s(4)],explanation:'主语newspapers与厄运拥有者相同。'},
 {expression:'they',sentenceId:s(6),referent:'报纸或报社',targetSentenceIds:[s(5)],explanation:'接受改制方案的是报社，不是贸易委员会。'},
 {expression:'them',sentenceId:s(7),referent:'报纸或报社',targetSentenceIds:[s(5),s(6)],explanation:'补贴的接受者，作subsidize宾语。'},
 {expression:'It',sentenceId:s(8),referent:'美国联邦贸易委员会',targetSentenceIds:[s(5)],explanation:'单数机构是此前会谈的组织者，也是继续举行会议的主体。'},
 {expression:'the discussions',sentenceId:s(9),referent:'挽救报纸及改制、补贴的讨论',targetSentenceIds:[s(5),s(6),s(7)],explanation:'讨论尚在进行，但作者认为它不再切合当前处境。'},
 {expression:'It',sentenceId:s(14),referent:'报业存活并恢复盈利的经历',targetSentenceIds:[s(11),s(12),s(13)],explanation:'评价前段所述过程，不是指委员会，也不是形式主语。'},
 {expression:'these desperate measures',sentenceId:s(19),referent:'裁员、提高读者负担及缩减配送等求生措施',targetSentenceIds:[s(15),s(17),s(18)],explanation:'这些具体措施共同构成回指内容。'},
 {expression:'ones',sentenceId:s(19),referent:'这些求生措施',targetSentenceIds:[s(19)],explanation:'ones替代measures；they can be pushed further的主语仍是措施，不是记者。'},
 {expression:'their',sentenceId:s(22),referent:'美国报纸',targetSentenceIds:[s(21)],explanation:'87%以美国报纸全部收入为基数。'},
 {expression:'the proportion',sentenceId:s(23),referent:'广告收入占全部报纸收入的比例',targetSentenceIds:[s(22)],explanation:'同指标用于日本，国别改变而分母含义不变。'},
 {expression:'So',sentenceId:s(27),referent:'上一句have gone所述同样被裁减的情况',targetSentenceIds:[s(26)],explanation:'肯定承接倒装，have之后省略gone，原句不另加该词。'},
 {expression:'as a result',sentenceId:s(29),referent:'上述岗位和驻外机构裁撤造成的后果',targetSentenceIds:[s(25),s(26),s(27),s(28)],explanation:'结果是报道覆盖缩小，而非报纸已经完全消亡。'},
 ],
 timeline:[
 {label:'一年前与如今',event:'一年前终结似乎临近；如今讨论被认为过时，后文用存活和盈利说明改变。没有把相对时间擅自换成具体年。',evidence:[e(2,'A year ago','过去参照'),e(9,'now seem out of date','当前判断')]},
 {label:'此前已经转向互联网',event:'had not already fled限定在经济衰退压力到来前仍未转向互联网的剩余广告和读者。',evidence:[e(3,'that had not already fled to the internet','过去完成时与剩余范围')]},
 {label:'几年前与当前利润',event:'20%是几年前常见的利润率；现在利润未到旧水平，但盈利仍存在。',evidence:[e(13,'were routine a few years ago','过去常态'),e(13,'but profit all the same','当前有限复苏')]},
 {label:'自2007年以来',event:'新闻编辑人协会估计从2007年起累计流失13,500个岗位；since给起点，不能译成2007年一年内。',evidence:[e(16,'13,500 newsroom jobs have gone since 2007','累计结果与起点')]},
 {label:'2008年收入数据',event:'美国87%数据明示2008年；日本35%用于同指标比较，原文没有单独再标年份。',evidence:[e(22,'came from advertising in 2008','明确统计年份'),e(23,'the proportion is 35%','相同指标比较')]},
 ],
 voices:[
 {speaker:'一年前的悲观预期与报纸自述',claim:'报业似乎接近消亡，报纸也报道自身厄运。',boundary:'这是回顾的危机判断；开篇反问与now转折要求继续核查当前状况。',evidence:[e(2,'the end seemed near','观感而非已成事实'),e(4,'were chronicling their own doom','危机中的自述')]},
 {speaker:'美国联邦贸易委员会的讨论',claim:'讨论报纸改制、政府补贴等挽救方案。',boundary:'问句表提议，未确认改制或补贴已经发生，也未说申请失败。',evidence:[e(5,'launched a round of talks','行动来源'),e(6,'Should they become charitable corporations','提议一'),e(7,'Should the state subsidize them','提议二')]},
 {speaker:'新闻编辑人协会与经合组织',claim:'分别提供岗位流失估计与广告收入比例。',boundary:'两个机构各自对应不同数据，不能把岗位数当报社数、收入占比当利润率。',evidence:[e(16,'The American Society of News Editors reckons','岗位估计来源'),e(22,'according to the Organization for Economic Cooperation & Development (OECD)','收入数据来源')]},
 {speaker:'文章叙述者',claim:'报业尚在艰难求生，紧缩有效但有代价，收入结构与内容特色影响出路。',boundary:'sadly承认记者损失；承认存活并不等于宣布繁荣，指出不全面也不等于宣告失败。',evidence:[e(19,'have proved the right ones','经营效果'),e(19,'sadly for many journalists','员工代价'),e(30,'completeness is no longer a virtue','结尾判断')]},
 ],
};
