import type { PracticeTask, GrammarConceptId, ErrorCategory } from './learning-model';
const range=(id:string,prompt:string,answer:string,feedback:string,conceptId:GrammarConceptId,errorType:ErrorCategory,hintWords:string[],extra:Partial<PracticeTask>={}):PracticeTask=>({id,revision:1,kind:'range',prompt,options:[],answer,evidence:answer,feedback,conceptId,errorType,hintWords,...extra});
const choice=(id:string,prompt:string,options:string[],answer:number,evidence:string,feedback:string,conceptId:GrammarConceptId,errorType:ErrorCategory,hintWords:string[],extra:Partial<PracticeTask>={}):PracticeTask=>({id,revision:1,kind:'choice',prompt,options,answer:options[answer],evidence,feedback,conceptId,errorType,hintWords,...extra});
const link=(id:string,prompt:string,pairs:Array<[string,string]>,evidence:string,feedback:string,conceptId:GrammarConceptId,errorType:ErrorCategory,hintWords:string[],extra:Partial<PracticeTask>={}):PracticeTask=>({id,revision:1,kind:'link',prompt,options:[...new Set(pairs.map(p=>p[1]))],links:pairs.map(([source,target])=>({source,target})),answer:JSON.stringify(pairs.map(p=>p[1])),evidence,feedback,conceptId,errorType,hintWords,...extra});
const order=(id:string,prompt:string,answer:string[],distractors:string[],evidence:string,feedback:string,conceptId:GrammarConceptId,errorType:ErrorCategory,hintWords:string[],extra:Partial<PracticeTask>={}):PracticeTask=>({id,revision:1,kind:'order',prompt,options:[...answer,...distractors],answer:JSON.stringify(answer),evidence,feedback,conceptId,errorType,hintWords,...extra});
export const passage2011P2Practice:Record<string,PracticeTask[]>={
'2011-p2-s1':[choice('opening-question','开头在追问什么？',['报纸消亡的预言为何没了下文','报纸已经全部消亡的确切日期','无论什么发生都不重要'],0,'Whatever happened to the death of newspapers','Whatever为强调疑问主语，后文存活与盈利使曾经的消亡预测受到质疑。','author-voice','passage-logic',['Whatever','happened','Whatever happened to the death of newspapers'],{mapRevealsAnswer:true})],
'2011-p2-s2':[order('seeming-state','排出主系表，把时间留在词块池。',['the end','seemed','near'],['A year ago'],'the end seemed near','seemed为系动词，near为表语；只能证明一年前似乎临近终结，不证明已终结。','basic-svc','predicate',['seemed','near'])],
'2011-p2-s3':[
 range('remaining-resources','划出限定广告与读者的整个定语从句。','that had not already fled to the internet','that作had fled主语，限定此前尚未转向互联网的那部分资源；过去完成时以衰退威胁时为参照。','clause-relative','clause-boundary',['that','had','fled'],{leaksToTaskIds:['two-pressures']}),
 choice('two-pressures','这句把两种压力怎样叠加？',['此前网络已分流，衰退又威胁尚余资源','衰退后读者首次见到互联网','所有广告此前都已消失'],0,'the advertising and readers that had not already fled to the internet','not already表示还没流走的部分，并不否认此前已经有资源流走。主句再说衰退威胁这些剩余资源。','time-reference','tense',['already','not'],{mapRevealsAnswer:true})],
'2011-p2-s4':[link('name-versus-verb','分别识别两个相近词形的身份。',[['Chronicle','报纸名称的一部分'],['chronicling','were之后的进行时动词']],'the San Francisco Chronicle were chronicling','前者是《旧金山纪事报》的专名，后者是记述；宾语their own doom说明正在报道自身危机。','lexical-context','vocabulary',['Chronicle','chronicling','chronicling their own doom'])],
'2011-p2-s5':[link('discussion-structure','把三组结构接回它说明的内容。',[['a round of talks','launched的宾语：一轮讨论'],['about how to save newspapers','说明talks的议题'],['how to save newspapers','about后的疑问词不定式内容']],'launched a round of talks about how to save newspapers','how to save没有独立主语和限定谓语，不把它改造成how do they save。只是讨论，并非已执行方案。','nonfinite-infinitive','attachment',['about','how','how to save newspapers','a round of talks'])],
'2011-p2-s6':[order('proposal-svc','按原句疑问顺序排出拟议的身份变化。',['Should','they','become','charitable corporations'],['the state'],'Should they become charitable corporations','情态词前置，主语they仍指报纸；charitable corporations为become表语，问句不等于已改制。','basic-svc','predicate',['Should','they','become'])],
'2011-p2-s7':[link('subsidy-actors','谁给补贴，谁收补贴？',[['the state','补贴的拟议提供者'],['them','拟获补贴的报纸']],'Should the state subsidize them','subsidize为及物动词，them是宾语；是否应当补贴仍是待议问题，不能推成已经遭拒。','basic-svo','reference',['state','subsidize','them'])],
'2011-p2-s8':[choice('meeting-organizer','It回指谁？',['联邦贸易委员会','报纸行业所有读者','报业救助方案'],0,'It will hold another meeting soon','委员会在第5句发起会谈，another延续其主办活动，单数It与Commission一致。','reference-pronoun','reference',['It','another'],{mapRevealsAnswer:true})],
'2011-p2-s9':[link('current-assessment','把now和out of date接回它们说明的对象。',[['now','seem的当前时间'],['out of date','discussions的表语评价']],'the discussions now seem out of date','过时的是此前救济讨论；now与一年前对照，下段的恢复情况解释为何讨论过时。','basic-svc','attachment',['now','seem','out of date'],{mapRevealsAnswer:true})],
'2011-p2-s10':[choice('limited-negation','little sign与much of the world共同允许哪项理解？',['世界很大一部分地区几乎看不到危机迹象','全世界绝对没有任何危机','所有国家都出现了少量明显危机'],0,'In much of the world there is little sign of crisis','little无a强调几乎没有；much of又限定地区范围，不能扩大到全体。','comparison-scope','option-logic',['much','little','there','little sign of crisis'])],
'2011-p2-s11':[choice('completed-recovery','have shrugged off主要强调什么？',['德、巴报纸已挺过衰退冲击的当前结果','两国报纸即将首次遭遇衰退','作者保证所有国家都已恢复'],0,'have shrugged off the recession','现在完成时把过去应对与当前存活相连；例子限定德国与巴西，不自动代表整个世界。','time-reference','tense',['have','shrugged','shrugged off the recession'])],
'2011-p2-s12':[
 range('us-relative','划出补充美国报纸处境的完整which从句。','which inhabit the most troubled corner of the global industry','which回指American newspapers并作inhabit主语；从句结束后have才开始主句完成时。','clause-relative','clause-boundary',['which','inhabit']),
 link('shared-perfect','给not only...but...两项匹配完整动词结构。',[['survived','与have组成现在完成时：已经存活'],['returned','与同一个have组成现在完成时：已经恢复盈利']],'have not only survived but often returned to profit','两个分词共用have，not only不否定存活；often只修饰returned，未说所有报纸都恢复盈利。','finite-predicate','predicate',['have','survived','returned','not only survived but often returned to profit'])],
'2011-p2-s13':[
 link('profit-limits','把否定与肯定各自保留的判断连起来。',[['Not the 20% profit margins','否定回到昔日高利润率'],['but profit all the same','肯定毕竟重新盈利']],'Not the 20% profit margins that were routine a few years ago, but profit all the same','外层是承前省略片段，不添is；20%是旧常态，当前利润率未给具体数字。','negation-contrast','option-logic',['Not','but','all the same'],{mapRevealsAnswer:true}),
 range('past-margin-relative','划出说明旧利润率历史常态的定语从句。','that were routine a few years ago','that作were主语，routine为表语；a few years ago给过去时间，不属于当前利润率。','clause-relative','clause-boundary',['that','were','routine'],{leaksToTaskIds:['profit-limits']})],
'2011-p2-s14':[choice('recovery-cost','It has not been much fun评价的是什么？',['报业存活复苏的过程不轻松','作者否认报纸已恢复任何盈利','读者不愿看娱乐内容'],0,'It has not been much fun','It回指前段报业经历；后面裁员、涨价与拒送解释“不轻松”的代价。','reference-pronoun','reference',['It','fun'],{mapRevealsAnswer:true})],
'2011-p2-s15':[link('boat-metaphor','把比喻中的两部分对应到经营现实。',[['stayed afloat','企业维持经营'],['pushing journalists overboard','牺牲记者岗位以裁减成本']],'Many papers stayed afloat by pushing journalists overboard','by引手段，pushing执行者为报社，记者为宾语；两个短语共同构成船的比喻。','nonfinite-subject','attachment',['by','afloat','pushing','overboard','stayed afloat','pushing journalists overboard'],{mapRevealsAnswer:true})],
'2011-p2-s16':[
 range('job-estimate','划出reckons后的完整统计内容。','that 13,500 newsroom jobs have gone since 2007','主语中心jobs是岗位，have gone为完成时；since短语仍在从句内，不能截掉统计起点。','clause-object','clause-boundary',['that','reckons'],{leaksToTaskIds:['since-period']}),
 choice('since-period','13,500个岗位是怎样统计的？',['自2007年起累计消失的岗位','仅2007年某一天消失的报社','预计未来2007个岗位将消失'],0,'13,500 newsroom jobs have gone since 2007','since给起点，完成时表截至叙述当下累计；数字修饰jobs，非公司或时间长度。','time-reference','tense',['since','jobs','have'],{mapRevealsAnswer:true})],
'2011-p2-s17':[link('pay-and-product','两个比较词分别比较什么？',[['more','读者支付的钱'],['slimmer','报纸产品的篇幅']],'Readers are paying more for slimmer products','more省略money，是金额宾语；for后是所购产品，slimmer说明变薄。不是更多读者正在付费。','comparison-scope','attachment',['more','for','slimmer','paying more for slimmer products'])],
'2011-p2-s18':[
 link('two-to-functions','区分两个to的功能。',[['to refuse','引动词原形的不定式'],['to distant suburbs','引配送目的地的介词短语']],'to refuse delivery to distant suburbs','第一个to接refuse动作，第二个接suburbs地点名词；had接the nerve为实义动词，不构成过去完成时。','nonfinite-infinitive','attachment',['to','had','delivery','had the nerve to refuse delivery']),
 choice('delivery-purpose','把拒送偏远郊区放回第三段，最合理的目的是？',['缩减经营成本以维持生存','回应原文明确记录的订户投诉','因为这些郊区已经没有居民'],0,'refuse delivery to distant suburbs','同段列出裁员、提价和缩减服务，最后评价措施奏效，构成节流增收的求生逻辑；不另造投诉事实。','paragraph-role','passage-logic',['refuse','delivery','had the nerve to refuse delivery'],{mapRevealsAnswer:true})],
'2011-p2-s19':[
 link('measures-references','两处替代词分别指什么？',[['the right ones','此前裁员、提价、缩配送等措施'],['they can be pushed further','同一组措施还可继续推行']],'these desperate measures have proved the right ones and, sadly for many journalists, they can be pushed further','ones和they都接回measures；journalists位于插入评注中，不是被进一步推的人。','reference-pronoun','reference',['ones','they','have proved the right ones','be pushed further'],{mapRevealsAnswer:true}),
 choice('qualified-evaluation','sadly为“这些措施奏效”补了什么？',['承认记者还会承受代价','否定所有财务措施都有效','作者为行业灭亡庆祝'],0,'sadly for many journalists','作者承认措施经营上奏效，同时遗憾记者受损；两面都保留才适合全文标题。','author-voice','passage-logic',['sadly','right'],{mapRevealsAnswer:true})],
'2011-p2-s20':[link('revenue-structure','把平衡与来源范围接回正确名词。',[['more balanced','说明businesses的经营结构'],['from readers and advertisers','说明revenues的来源']],'with a healthier mix of revenues from readers and advertisers','收入在读者与广告主间的搭配更均衡；未增加新来源类型，也不说编辑部人员更均衡。','modifier-prepositional','attachment',['balanced','with','from','mix','a healthier mix of revenues'])],
'2011-p2-s21':[link('time-degree-aspect','把三种限定对应到准确作用。',[['long','have been的持续时间'],['highly','unusual的程度'],['in their reliance on ads','不同寻常的具体方面']],'have long been highly unusual in their reliance on ads','long说长期，highly说显著，in短语限制到广告依赖；不能混成报道风格评价。','modifier-adverb','attachment',['long','highly','in','in their reliance on ads'])],
'2011-p2-s22':[choice('revenue-denominator','87%的分母是什么？',['2008年美国报纸的全部收入','世界所有报纸数量','美国报纸利润总额'],0,'Fully 87% of their revenues came from advertising in 2008','their承接American papers，of revenues给收入总体；fully强调足足，不把数值变成100%。','comparison-scope','option-logic',['Fully','their','revenues','Fully 87% of their revenues'],{mapRevealsAnswer:true})],
'2011-p2-s23':[choice('same-indicator','the proportion要从上一句补回哪个指标？',['广告收入占日本报纸总收入的比例','日本占世界报纸数量的比例','日本报纸有35种收入来源'],0,'In Japan the proportion is 35%','承接前句同一收入占比，改变国家不改变统计口径；种类数与比例不是一回事。','reference-pronoun','reference',['proportion'],{mapRevealsAnswer:true})],
'2011-p2-s24':[link('comparison-degree','区分评价与比较程度。',[['Not surprisingly','作者认为结果不意外'],['much','加强more stable的比较差距']],'Not surprisingly, Japanese newspapers are much more stable','日本广告依赖较低，稳定性更强因此不意外；much是程度副词，不限定报纸家数。','comparison-scope','attachment',['Not','surprisingly','much','more'],{mapRevealsAnswer:true})],
'2011-p2-s25':[
 link('two-relatives','给两个定语从句找先行词。',[['that swept through newsrooms','The whirlwind'],['where newspapers are least distinctive','areas']],'The whirlwind that swept through newsrooms harmed everybody, but much of the damage has been concentrated in areas where newspapers are least distinctive','第一处风暴席卷编辑部，第二处业务领域缺少特色；where相当于in which，不能接回偏远郊区。','clause-relative','attachment',['that','where','areas'],{leaksToTaskIds:['distinctive-focus']}),
 choice('distinctive-focus','裁撤重点落在哪里？',['报纸最难体现独特价值的业务领域','地理上离城市最远的所有地区','读者绝对不再感兴趣的一切内容'],0,'areas where newspapers are least distinctive','least降低特色程度；后续举评论和记者岗位。领域缺乏特色并不证明读者兴趣全无。','paragraph-role','passage-logic',['least','distinctive','areas','least distinctive'],{mapRevealsAnswer:true,leaksToTaskIds:['two-relatives']})],
'2011-p2-s26':[choice('reviewer-subject','have gone的主体是哪一组？',['汽车和电影评论员','汽车与电影本身','新闻的全部读者'],0,'Car and film reviewers have gone','reviewers为中心人员名词，car和film是评论领域定语；go语境指岗位裁撤。','subject-head','subject',['reviewers','gone'])],
'2011-p2-s27':[order('so-inversion','保留原文倒装顺序，不补入省略的gone。',['So','have','science and general business reporters'],['gone','therefore'],'So have science and general business reporters','So+助动词+主语肯定承接上一句have gone；have不是拥有，So也不是因果因此。','finite-predicate','predicate',['So','have','So have science and general business reporters'])],
'2011-p2-s28':[choice('perfect-passive','have been cut off是什么结构？',['现在完成时被动：机构已经被裁撤','主动：驻外机构去裁掉别人','一般将来时：尚未发生'],0,'have been savagely cut off','have been+过去分词构成完成被动，cut过去分词与原形同形；savagely加强裁撤力度。','passive-voice','predicate',['have','been','cut','have been savagely cut off'])],
'2011-p2-s29':[choice('reduced-coverage','less complete与as a result共同说明什么？',['上述裁撤使报道覆盖不如从前全面','纸张因运输损坏而缺页','报业已经完全消失'],0,'Newspapers are less complete as a result','complete在内容语境为全面；as a result承接人员和机构裁撤，下一句才作价值判断。','paragraph-role','passage-logic',['complete','less','as a result'],{mapRevealsAnswer:true})],
'2011-p2-s30':[choice('no-longer-limit','no longer a virtue能准确推出什么？',['全面性如今不再构成经营优势','全面性从来没有任何价值','全面性已被证明是所有失败的原因'],0,'completeness is no longer a virtue','no longer否定旧状态继续，不否定过去也不增加因果；联系least distinctive才能把焦点落到独特性。','negation-contrast','option-logic',['no','longer','virtue','no longer a virtue'],{mapRevealsAnswer:true})],
};

// 人工核对的跨句/地图反馈依赖：仅连向反馈已给出关键判断的任务。
const feedbackEdges:Array<[number,string,string,string]>=[
 [1,'opening-question','2011-p2-map','turning-point'],
 [9,'current-assessment','2011-p2-map','turning-point'],
 [12,'shared-perfect','2011-p2-map','turning-point'],
 [13,'profit-limits','2011-p2-map','turning-point'],
 [13,'profit-limits','2011-p2-map','paragraph-route'],
 [14,'recovery-cost','2011-p2-map','paragraph-route'],
 [18,'delivery-purpose','2011-p2-map','paragraph-route'],
 [19,'qualified-evaluation','2011-p2-map','paragraph-route'],
 [20,'revenue-structure','2011-p2-map','paragraph-route'],
 [22,'revenue-denominator','2011-p2-s23','same-indicator'],
 [22,'revenue-denominator','2011-p2-map','same-revenue-basis'],
 [23,'same-indicator','2011-p2-map','same-revenue-basis'],
 [25,'distinctive-focus','2011-p2-map','paragraph-route'],
 [30,'no-longer-limit','2011-p2-map','paragraph-route'],
];
for(const [n,id,sentenceId,taskId] of feedbackEdges){
 const task=passage2011P2Practice[`2011-p2-s${n}`].find(task=>task.id===id)!;
 task.leaksToTasks=[...(task.leaksToTasks??[]),{sentenceId,taskId}];
}
