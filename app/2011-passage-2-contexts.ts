import type { SentenceWordContext } from './contextual-vocabulary';
import type { WordKnowledge } from './knowledge-base';
type Context=SentenceWordContext & {pattern:string;patternMeaning:string};
const w=(partOfSpeech:string,contextualMeaning:string,pattern:string,patternMeaning:string,use:string):Context=>({partOfSpeech,contextualMeaning,pattern,patternMeaning,use,preferredCollocations:[pattern]});
export const passage2011P2SourceContexts:Record<string,Record<string,Context>>={
'2011-p2-s1':{
 to:w('prep.','对于；关于','happened to the death of newspapers','报纸消亡的说法后来怎样','to引happened所谈对象，后面death为名词，不是不定式。'),
 of:w('prep.','……的','the death of newspapers','报纸的消亡','of限定消亡的是报业，开头仍在质疑这一预测。'),
},
'2011-p2-s2':{
 seem:w('linking v.（过去式）','似乎','the end seemed near','终结似乎临近','seemed接形容词near作表语，限于一年前的观感。'),
},
'2011-p2-s3':{
 to:w('infinitive marker / prep.','不定式标记；去向','to remove ... fled to the internet','将夺走……已转向互联网','to remove补足threatened；to the internet为fled的去向，两处按所接词区分。'),
 and:w('conj.','和','the advertising and readers','广告业务与读者','并列remove的两项宾语，后面的that从句共同限定剩余部分。'),
 that:w('relative pron.','指尚未转移的广告和读者','that had not already fled','此前尚未离开的那部分','关系代词作had fled主语，限定advertising and readers。'),
 have:w('aux.（had）','过去完成时标记','had not already fled','此前还未离开','had与fled构成过去完成时否定，以衰退威胁时为参照。'),
 not:w('adv.','尚未（与already连用）','had not already fled','此前尚未转走','否定剩余资源此前已经离开，不否认其他部分已被网络分流。'),
 already:w('adv.','已经','not already fled','尚未已经转走','配合not限定到当时还未转网的部分；already以过去参照为界。'),
},
'2011-p2-s4':{
 like:w('prep.','例如；像','Newspapers like the San Francisco Chronicle','像《旧金山纪事报》这样的报纸','like后接报纸实例，整组修饰Newspapers，不是喜欢的谓语。'),
 be:w('aux.（were）','过去进行时标记','were chronicling their own doom','正在记述自身厄运','were与chronicling构成过去进行时，主语是复数Newspapers。'),
 their:w('possessive det.','它们的（报纸的）','their own doom','报纸自身的厄运','their回指主语Newspapers，own强调报道者与厄运主体相同。'),
 own:w('emphatic det.','自己的','their own doom','它们自身的厄运','强化their的所属关系，不能作拥有的动词。'),
},
'2011-p2-s5':{
 of:w('prep.','一轮……','a round of talks','一轮会谈','of说明round所量化的活动，talks为复数名词。'),
 about:w('prep.','关于','about how to save newspapers','关于如何挽救报纸','引talks的议题，宾语为疑问词不定式how to save。'),
 how:w('interrogative adv.','如何','how to save newspapers','如何挽救报纸','与不定式组成嵌入的疑问内容，作about宾语，没有独立有限谓语。'),
 to:w('infinitive marker','不定式标记','how to save newspapers','如何挽救报纸','to后接原形save，组成疑问词不定式，不倒装为直接问句。'),
 trade:w('n.（专名组成）','贸易','Federal Trade Commission','联邦贸易委员会','在机构名称中限定委员会的贸易监管职能，整体识别。'),
},
'2011-p2-s6':{
 should:w('modal v.','是否应当','Should they become charitable corporations','它们是否应成为慈善机构','疑问中提出救济建议；become用原形，并未说已经改制。'),
 they:w('pron.','它们（报纸）','they become charitable corporations','报纸转为慈善性质机构','they回指待挽救的报社，是转型设想的主体。'),
 become:w('linking v.','成为','become charitable corporations','成为慈善性质机构','become后名词短语作身份表语；Should保留提议语气。'),
},
'2011-p2-s7':{
 should:w('modal v.','是否应当','Should the state subsidize them','政府是否应补贴报纸','疑问提出补贴方案，不能据此推定已申请或已失败。'),
 they:w('pron.（宾格them）','它们（报纸）','subsidize them','补贴这些报纸','them作subsidize宾语；the state才是补贴提供方。'),
},
'2011-p2-s8':{
 it:w('pron.','它（联邦贸易委员会）','It will hold another meeting','委员会将再举行会议','回指第5句的单数组织者Commission，不指复数报纸。'),
 will:w('modal v.','将','will hold another meeting soon','不久将再举行会议','will后接hold原形，说明下一步计划。'),
},
'2011-p2-s9':{
 but:w('conj.','但是','But the discussions now seem out of date','但是这些讨论如今似乎过时','将一年前的救济讨论与当前处境转折对照。'),
 out:w('adv.（习语组成）','不合时宜（out of date）','out of date','过时的','与of date组成seem的表语，描述讨论时效。'),
 of:w('prep.（习语组成）','组成out of date','out of date','过时的','of date不单独按所属关系翻译，整组作seem表语。'),
},
'2011-p2-s10':{
 in:w('prep.','在……范围内','In much of the world','在世界很大一部分地区','范围限定存在句，未说全世界都没有危机。'),
 much:w('pron.','很大一部分','much of the world','世界很大一部分地区','much取world的部分范围，of后为整体。'),
 of:w('prep.','……中的','much of the world','世界的大部分地区','部分与整体关系，不能漏掉限定范围。'),
 there:w('existential marker','存在句引导词','there is little sign of crisis','几乎没有危机迹象','there不表示那里，引出实义主语little sign。'),
 be:w('v.（存在句is）','存在；有','there is little sign of crisis','几乎没有危机迹象','is与单数sign一致，little使存在量近于没有。'),
},
'2011-p2-s11':{
 and:w('conj.','和','German and Brazilian papers','德国和巴西的报纸','并列国别定语，共同限定papers。'),
 have:w('aux.','现在完成时标记','have shrugged off the recession','已摆脱衰退冲击','have与shrugged构成完成时，强调已渡过冲击的结果。'),
 off:w('particle','摆脱（shrug off）','shrugged off the recession','甩开衰退冲击','off为短语动词shrug off的小品词，不单独表示地点。'),
},
'2011-p2-s12':{
 even:w('adv.','甚至；就连','Even American newspapers','就连美国报纸','突出最受困地区的报纸也恢复生存，不引even if让步从句。'),
 which:w('relative pron.','这些美国报纸','which inhabit the most troubled corner','身处最困难角落的美国报纸','非限制性定语从句的主语，回指American newspapers。'),
 most:w('adv.','最','the most troubled corner','最困难的角落','most修饰troubled组成最高级，不是大多数报纸。'),
 of:w('prep.','……中的','corner of the global industry','全球报业中的一个角落','说明corner属于整个行业，表达局部与整体。'),
 have:w('aux.','现在完成时标记','have not only survived but often returned to profit','不仅存活且不少已恢复盈利','survived与returned并列，共用have；often限定后一项。'),
 not:w('adv.（关联结构组成）','不仅（not only）','not only survived but often returned to profit','不仅存活，而且不少恢复盈利','not only不否认survived，与but后项形成递进。'),
 only:w('adv.','仅仅','not only survived','不只是存活','与not构成递进前项，把恢复盈利放到进一步结果。'),
 but:w('conj.','而且','not only survived but often returned to profit','不仅存活，而且不少恢复盈利','与not only呼应，并列两个共用have的分词。'),
 often:w('adv.','常常；不少情况下','often returned to profit','不少又恢复盈利','限制恢复盈利的普遍程度，不声称每家都已盈利。'),
 to:w('prep.','回到……状态','returned to profit','恢复盈利','profit为名词，to引恢复到的状态，不是不定式。'),
},
'2011-p2-s13':{
 not:w('adv.','并非','Not the 20% profit margins','并非20%的利润率','否定恢复到旧水平，后面but仍肯定盈利存在。'),
 that:w('relative pron.','那些利润率','that were routine a few years ago','几年前常见的那些利润率','关系代词作were主语，限定profit margins。'),
 be:w('linking v.（were）','是；属于','were routine a few years ago','几年前是常态','were只在定语从句中连接routine，外层是省略式对比名词项。'),
 few:w('det.','几个（a few）','a few years ago','几年前','a few表有几个，不取few单独的几乎没有义。'),
 but:w('conj.','但是','but profit all the same','但终究仍然是盈利','连接被否定的高利润率与被肯定的仍有利润。'),
 all:w('adv.（习语组成）','仍然（all the same）','all the same','尽管如此仍然','整组表达让步，不说利润数额全部相同。'),
 same:w('adj.（习语组成）','依然（all the same）','profit all the same','终究还是盈利','all the same在这里为尽管如此，而不是利润数量一样。'),
 profit:w('n.','利润；盈利','profit margins / profit all the same','利润率／终究仍有利润','第一处profit限定margins，第二处为对比名词中心；有盈利不保证旧利润率。'),
},
'2011-p2-s14':{
 it:w('pron.','这段求生复苏的经历','It has not been much fun','这个过程并不好受','回指前段报业存活复苏，不是形式主语或贸易委员会。'),
 have:w('aux.（has）','现在完成时标记','has not been much fun','这个过程一直并不轻松','has与been构成完成时，评价至今的经历。'),
 be:w('linking v.（been）','是；呈现状态','been much fun','是轻松愉快的经历','been为系动词分词，接名词表语fun，不构成被动。'),
 not:w('adv.','不','has not been much fun','并非轻松愉快','否定much fun，以轻描淡写引出裁员代价。'),
 much:w('det.','很多的','not much fun','没有多少乐趣','much限定不可数fun，不修饰比较级。'),
},
'2011-p2-s15':{
 many:w('det.','许多','Many papers stayed afloat','许多报纸维持了经营','限定复数papers，没有声称全部报纸都如此。'),
 by:w('prep.','通过；靠','by pushing journalists overboard','通过裁员','by后动名词表手段，逻辑主语Many papers。'),
},
'2011-p2-s16':{
 of:w('prep.','……的；由……组成的','Society of News Editors','新闻编辑人协会','of说明协会成员性质，作为组织名称整体识别。'),
 that:w('conj.','引出估计内容','reckons that jobs have gone','估计岗位已流失','that引内容从句，不在从句内充当主语或宾语。'),
 have:w('aux.','现在完成时标记','jobs have gone since 2007','自2007年起岗位已流失','have gone表截至当前累计结果，主语为复数jobs。'),
 since:w('prep.','自……以来','since 2007','自2007年以来','后接年份作时间起点，不引原因从句。'),
},
'2011-p2-s17':{
 be:w('aux.（are）','现在进行时标记','are paying more','正在付更多钱','are与paying构成进行体，不把more当人数。'),
 more:w('pron.（数量比较）','更多的钱','paying more for slimmer products','为更薄的报纸支付更多','more省略money，作paying的金额宾语。'),
 for:w('prep.','为购买','paying more for slimmer products','为买更薄报纸付更多钱','for引付钱购买的对象，不表示持续时间。'),
},
'2011-p2-s18':{
 some:w('det.','一些','Some papers','部分报纸','限定措施只涉及一部分报纸，不泛化为全行业一致行动。'),
 even:w('adv.','甚至','even had the nerve','甚至竟然敢','加强对拒送行为的惊讶评价，不引让步从句。'),
 have:w('v.（had）','有胆量；竟敢','had the nerve to refuse delivery','竟敢拒绝配送','had为实义过去式，宾语the nerve；to refuse说明所敢做的行为。'),
 to:w('infinitive marker / prep.','不定式标记；到','to refuse delivery to distant suburbs','拒绝向偏远郊区配送','第一处to接动词refuse；第二处接地点名词suburbs作配送目的地。'),
},
'2011-p2-s19':{
 yet:w('conj.','然而','Yet these desperate measures have proved the right ones','然而这些措施证明有效','转折读者与记者付出代价的描写，转向经营效果。'),
 these:w('det.','这些','these desperate measures','这些迫不得已的措施','回指裁员、涨价、缩减配送等求生办法。'),
 have:w('aux.','现在完成时标记','have proved the right ones','已证明是正确的办法','have与proved构成完成时，ones作prove表语。'),
 one:w('pron.（ones）','那些措施','the right ones','正确有效的那些措施','ones替代复数measures，前有the right修饰。'),
 and:w('conj.','而且；并且','and ... they can be pushed further','而且措施可进一步推进','连接两个完整主谓分句；插入语评价对记者的代价。'),
 for:w('prep.','对于','sadly for many journalists','对许多记者而言遗憾的是','for引受进一步紧缩影响的记者，不表动作施事。'),
 many:w('det.','许多','many journalists','许多记者','修饰复数journalists，说明损失涉及的群体。'),
 they:w('pron.','它们（这些措施）','they can be pushed further','这些措施可以进一步实施','回指measures，记者只是插入语中的受影响者。'),
 can:w('modal v.','可以；仍可能','can be pushed further','可以进一步推进','情态动词接被动结构，说明措施继续实施的可能。'),
 be:w('aux.','被动标记','be pushed further','被进一步推进','be与pushed组成被动，主语措施为被推进对象。'),
},
'2011-p2-s20':{
 be:w('aux.（are）','进行时标记','are becoming more balanced businesses','正在变成收入结构更均衡的企业','are与becoming组成进行体，become后接名词表语。'),
 more:w('adv.','更加','more balanced businesses','更加均衡的企业','more修饰balanced的程度，不表示企业数量更多。'),
 with:w('prep.','伴随着；具有','with a healthier mix of revenues','具有更健康的收入组合','补充经营均衡的具体内容，不是with宾语分词独立结构。'),
 of:w('prep.','由……组成的','a mix of revenues','收入的组合','说明mix的组成内容，下层from再给收入来源。'),
 from:w('prep.','来自','revenues from readers and advertisers','来自读者和广告主的收入','限定revenues的两个来源，未说明新增来源种类。'),
 and:w('conj.','和','readers and advertisers','读者和广告主','并列from的两个来源对象。'),
},
'2011-p2-s21':{
 have:w('aux.','现在完成时标记','have long been highly unusual','长期以来极不寻常','have been把长期特征连到现在，后面为形容词表语。'),
 long:w('adv.','长期以来','have long been','长期以来一直是','long修饰状态持续时间，不是形容词长的。'),
 be:w('linking v.（been）','是；呈现特点','been highly unusual','极不寻常','been连接形容词unusual，不是被动助动词。'),
 in:w('prep.','在……方面','in their reliance on ads','在依赖广告方面','限定unusual体现的具体方面。'),
 their:w('possessive det.','它们的（美国报纸的）','their reliance on ads','美国报纸对广告的依赖','回指同句American papers，限定reliance。'),
 on:w('prep.','对；依赖于','reliance on ads','对广告的依赖','reliance固定接on引依赖对象。'),
},
'2011-p2-s22':{
 of:w('prep.','……中的','87% of their revenues','它们收入中的87%','of后给比例分母，即美国报纸全部收入。'),
 their:w('possessive det.','它们的（美国报纸的）','their revenues','美国报纸的收入','承接前句American papers，不指经合组织。'),
 from:w('prep.','来自','came from advertising','来自广告业务','from给收入来源，与比例分母分别识别。'),
 in:w('prep.','在……年','in 2008','在2008年','限定收入比例的统计时间。'),
 to:w('prep.（according to组成）','根据','according to the OECD','根据经合组织的数据','to后接机构，和according组成信息来源结构。'),
 for:w('prep.','为；以……为宗旨','Organization for Economic Cooperation & Development','经济合作与发展组织','在机构全名中引组织宗旨，不是保费对象或原因题。'),
},
'2011-p2-s23':{
 in:w('prep.','在','In Japan','在日本','给出比较国家；the proportion沿用上一句收入指标。'),
 be:w('linking v.（is）','是；为','the proportion is 35%','这一比例为35%','35%是表语，主语proportion单数，不是利润额。'),
},
'2011-p2-s24':{
 not:w('adv.','不','Not surprisingly','不足为奇地','否定surprisingly，说明作者认为较稳定的结果符合预期。'),
 be:w('linking v.（are）','是；处于','are much more stable','稳定得多','are连接比较级表语，主语日本报纸。'),
 much:w('adv.','……得多','much more stable','稳定得多','much加强比较级more stable，不限定报纸数量。'),
 more:w('adv.','更加','more stable','更加稳定','more和stable组成比较级，与美国报纸比较。'),
},
'2011-p2-s25':{
 that:w('relative pron.','那场风暴','that swept through newsrooms','席卷编辑部的风暴','定语从句主语，回指whirlwind。'),
 through:w('prep.','遍及；穿过','swept through newsrooms','席卷编辑部','给swept的波及范围，与风暴比喻相连。'),
 everybody:w('indefinite pron.','所有相关从业者','harmed everybody','波及所有相关人员','作harmed宾语；在报业语境内理解，不扩为全世界所有人。'),
 but:w('conj.','但是','but much of the damage','但很大一部分损害','从普遍冲击转向集中落点，连接两个主谓分句。'),
 much:w('pron.','很大一部分','much of the damage','很大一部分损害','much为部分数量主语中心，damage不可数，与has一致。'),
 of:w('prep.','……中的','much of the damage','损害中的很大部分','连接部分与整体，不是动作所属人。'),
 have:w('aux.（has）','现在完成时标记','has been concentrated','已经集中','has与been构成完成时，concentrated为被动分词。'),
 be:w('aux.（been） / linking v.（are）','被动标记；是','been concentrated / are least distinctive','已经集中／最缺乏特色','been接concentrated为被动；where从句are接distinctive为系表，两处按词形区分。'),
 in:w('prep.','在……领域','concentrated in areas','集中在若干领域','in引裁撤主要落点，areas再由where从句限定。'),
 where:w('relative adv.','在这些领域里','where newspapers are least distinctive','报纸最缺乏特色的领域','相当于in which，先行词areas为报道业务领域。'),
 least:w('adv.','最不；程度最低','least distinctive','最缺乏特色的','least修饰distinctive，不能读成at least至少。'),
},
'2011-p2-s26':{
 and:w('conj.','和','Car and film reviewers','汽车与电影评论员','连接两个评论领域定语，人员中心是reviewers。'),
 have:w('aux.','现在完成时标记','reviewers have gone','评论员岗位已被裁','have与gone构成完成时，主语评论员承受岗位裁撤。'),
},
'2011-p2-s27':{
 so:w('adv.（肯定承接）','也一样','So have science and general business reporters','科学和一般商业记者也如此','承接上句have gone，结构为So加助动词加主语，不表示因此。'),
 have:w('aux.','承接完成时并省略gone','So have the reporters','记者也同样被裁','前置助动词have承接上一句，实义分词gone省略，不是拥有。'),
 and:w('conj.','和','science and general business reporters','科学记者和一般商业记者','连接报道领域，reporters为共同人员中心。'),
 business:w('n.（前置定语）','商业新闻','general business reporters','一般商业报道记者','与science并列界定报道岗位类别，不指报社企业数量。'),
},
'2011-p2-s28':{
 have:w('aux.','现在完成时标记','have been savagely cut off','已遭大幅裁撤','have been加cut构成现在完成时被动，主语为bureaus。'),
 be:w('aux.（been）','被动标记','been cut off','被裁撤','been与过去分词cut构成被动部分，前面have给完成时。'),
 off:w('particle','裁撤（cut off）','cut off foreign bureaus','裁撤驻外机构','off与cut整体表示撤除机构，不独立作介词引来源。'),
},
'2011-p2-s29':{
 be:w('linking v.（are）','是；呈现状态','are less complete','不如以前全面','are接形容词比较表语，complete指报道覆盖。'),
 less:w('adv.','较不；不如以前','less complete','不那么全面','less降低complete的程度，非全部内容消失。'),
 as:w('prep.（习语组成）','因此（as a result）','as a result','作为结果；因此','整组作结果状语，承接裁员与机构裁撤。'),
},
'2011-p2-s30':{
 but:w('conj.','但是','But completeness is no longer a virtue','但全面性不再是优势','转折上一句不全面的结果，再评其当前经营价值。'),
 be:w('linking v.（is）','是','is no longer a virtue','不再是一项优点','连接主语completeness与名词表语a virtue。'),
 no:w('adv.（程度否定）','不再（no longer）','no longer a virtue','不再是一项优点','no与longer构成时间否定，不直接限定virtue为no virtue。'),
 long:w('adv.（比较级longer）','再继续（no longer）','no longer a virtue','不再构成优势','否定过去状态延续至今，不表示从来没有价值。'),
 in:w('prep.','在……行业中','in the newspaper business','在报业经营中','限定判断适用领域，不能推广到所有产品的全面性。'),
},
};
const add=(id:string,words:Record<string,Context>)=>{passage2011P2SourceContexts[id]={...passage2011P2SourceContexts[id],...words};};
add('question-201126-prompt',{
 by:w('prep.','通过','By saying','通过说出这句话','by后动名词给表达手段，询问作者的引句意图。'),
 like:w('prep.','例如','Newspapers like','像……这样的报纸','引文用like举报纸实例，省略号照录，不把like改成喜欢。'),
 their:w('possessive det.','它们的（报纸的）','their own doom','报纸自身的厄运','与own共同说明报道对象是主语报纸自身。'),
 own:w('emphatic det.','自己的','their own doom','它们自己的厄运','强调同一主体，own为限定成分而非拥有的谓语。'),
 that:w('conj.','引出表明的内容','indicates that newspapers','表明报纸……','that引indicates宾语从句，newspapers后由选项补谓语。'),
});
add('question-201126-option-A',{of:w('prep.','……的','the sign of crisis','危机迹象','of说明sign所表现的内容。')});
add('question-201126-option-B',{
 to:w('infinitive marker','不定式标记','failed to get state subsidies','未能获得国家补贴','to接get原形，补足fail未能做到的行为。'),
 state:w('n.（前置定语）','国家；政府','state subsidies','政府补贴','state限定补贴来源，不是主句的施事。'),
});
add('question-201126-option-C',{
 be:w('linking v.（were）','是','were not charitable corporations','不是慈善性质机构','were接名词表语，not否定机构身份。'),
 not:w('adv.','不是','not charitable corporations','并非慈善性质机构','否定身份；是否切合引句重点另查题目证据。'),
});
add('question-201126-option-D',{
 be:w('linking v.（were）','处于','were in a desperate situation','处于严重困境','were接介词短语作表语，描述过去状态。'),
 in:w('prep.','处于','in a desperate situation','处于严重困境','与situation组成状态表语。'),
});
add('question-201127-prompt',{
 some:w('det.','一些','Some newspapers','一些报纸','限定不是所有报纸都拒送，保持题干范围。'),
 to:w('prep.','到；向','delivery to distant suburbs','向偏远郊区配送','to引delivery目的地，后接名词，不是不定式。'),
 because:w('conj.','因为','probably because','很可能因为','引待补全原因从句，选项各自提供主语和谓语。'),
});
add('question-201127-option-A',{
 threaten:w('v.（过去式）','威胁；扬言','readers threatened to pay less','读者威胁要少付钱','主语为人，此选项声称读者扬言采取行动，原文未报告这一行为。'),
 to:w('infinitive marker','不定式标记','to pay less','少付钱','补足threatened所威胁采取的行为，pay用原形。'),
 less:w('pron.（数量比较）','更少的钱','pay less','少付钱','less作支付金额宾语，省略money；不是更少的读者。'),
});
add('question-201127-option-B',{to:w('infinitive marker','不定式标记','wanted to reduce costs','想降低成本','to reduce作wanted宾语，表达目的意愿。')});
add('question-201127-option-C',{
 little:w('indefinite pron.','很少的内容','reported little','很少报道相关内容','little作reported宾语，不是little sign中的名词限定词。'),
 about:w('prep.','关于','about these areas','关于这些地区','引报道话题；these areas承接题干偏远郊区。'),
 these:w('det.','这些','these areas','这些地区','回指题干distant suburbs，不能接到正文末段业务领域。'),
 area:w('n.（复数）','地区','these areas','这些偏远郊区','本选项回指地理配送区域，不是末段的报道业务领域。'),
});
add('question-201127-option-D',{about:w('prep.','对；关于','complained about slimmer products','抱怨报纸变薄','about引投诉对象；产品变薄不自动证明投诉存在。')});
add('question-201128-prompt',{
 with:w('prep.','与……相比','Compared with their American counterparts','与美国同类报纸相比','with引compare的比较对象，不表示充满或伴随。'),
 their:w('possessive det.','它们的（日本报纸的）','their American counterparts','日本报纸在美国的同类','联系后面的Japanese newspapers，counterparts保证同类比较。'),
 be:w('linking v.（are）','是；呈现状态','are much more stable','稳定得多','are接比较级表语，不是被动结构。'),
 much:w('adv.','……得多','much more stable','稳定得多','加强more stable的比较差距，不限定报纸数量。'),
 more:w('adv.','更加','more stable','更加稳定','修饰stable，比较日本与美国报纸的经营稳定性。'),
 because:w('conj.','因为','because they','因为日本报纸……','引稳定程度不同的原因，they指日本报纸。'),
 they:w('pron.','它们（日本报纸）','because they','因为日本报纸……','原因从句主语回指Japanese newspapers，选项补谓语。'),
});
add('question-201128-option-A',{
 have:w('v.','拥有','have more sources of revenue','拥有更多收入来源','have后接名词宾语，是实义动词，不是完成时助动词。'),
 more:w('det.','更多的','more sources of revenue','更多种收入来源','more限定sources数量，不是各来源占比的平衡程度。'),
 of:w('prep.','……的','sources of revenue','收入来源','限定sources是哪种来源。'),
});
add('question-201128-option-B',{
 have:w('v.','拥有','have more balanced newsrooms','拥有更均衡的编辑部','后接newsrooms作宾语，是实义动词。'),
 more:w('adv.','更加','more balanced newsrooms','更加均衡的编辑部','more修饰balanced的程度，不是增加编辑部数量。'),
 balanced:w('adj.','配置更均衡的','more balanced newsrooms','配置更加均衡的编辑部','本选项形容newsrooms；正文均衡的是经营收入结构，两者对象不同。'),
});
add('question-201128-option-C',{
 be:w('linking v.（are）','是；处于','are less dependent on advertising','对广告依赖较低','are接形容词dependent作表语。'),
 less:w('adv.','较少地','less dependent on advertising','较少依赖广告','less降低dependent程度，不等于完全无依赖。'),
 on:w('prep.','依赖于；对','dependent on advertising','依赖广告','on引dependent的依赖对象。'),
});
add('question-201128-option-D',{
 be:w('aux.（are）','被动标记','are less affected by readership','受读者规模影响较小','are与affected构成被动，主语承接日本报纸。'),
 less:w('adv.','较少地','less affected','受影响程度较低','less比较影响程度，没有说明完全不受影响。'),
 by:w('prep.','受到……的影响','affected by readership','受到读者数量影响','被动结构中引影响来源，不是by doing手段。'),
});
add('question-201129-prompt',{
 what:w('interrogative pron.','什么内容','What can be inferred','能够推断出什么','What直接作被动谓语主语，是疑问句而非what名词性从句。'),
 can:w('modal v.','能够；可以','can be inferred','可以推断','情态动词后接be原形，推断必须有末段依据。'),
 be:w('aux.','被动标记','be inferred from the last paragraph','从末段被推断出','be与inferred构成被动，What为待推断内容。'),
 from:w('prep.','根据；从','from the last paragraph','根据最后一段','引推断的信息依据，不是物理去向。'),
 about:w('prep.','关于','about the current newspaper business','关于当前报业','限定所问话题，和from标出的依据区分。'),
});
add('question-201129-option-A',{
 be:w('linking v.（is）','是','Distinctiveness is an essential feature','独特性是一项必要特点','is与单数抽象主语一致，后接名词表语。'),
 of:w('prep.','……的','feature of newspapers','报纸的特点','of说明特点所属对象。'),
});
add('question-201129-option-B',{
 be:w('linking v.（is）','应受（与to blame连用）','is to blame for the failure','应为失败负责','is to blame为责任习语，不是将来计划。'),
 to:w('infinitive marker','不定式标记','to blame for the failure','应为失败受责','to blame形式主动但表达可归责，与be构成习语。'),
 for:w('prep.','为……负责','to blame for the failure','应为失败负责','for引被归责的后果，体现选项的因果命题。'),
 of:w('prep.','……的','the failure of newspaper','报纸的失败','of限定失败主体，保留原卷单数措辞，不自行补词。'),
});
add('question-201129-option-C',{in:w('prep.','在……中','in the newspaper business','在报业中','限定play a crucial role的作用领域。')});
add('question-201129-option-D',{
 have:w('aux.','现在完成时标记','have lost their interest','已经失去兴趣','have与lost构成完成时，强调选项声称的当前结果。'),
 their:w('possessive det.','他们的（读者的）','their interest','读者的兴趣','回指主语Readers，不能指评论员的兴趣。'),
 in:w('prep.','对……的','interest in car and film reviews','对汽车评测和影评的兴趣','in引interest对象，不是地点范围。'),
 and:w('conj.','和','car and film reviews','汽车评测与影评','连接评论的两个主题，共同限定reviews。'),
});
add('question-201130-prompt',{
 most:w('adv.','最','the most appropriate title','最合适的标题','修饰appropriate组成最高级，要求从给定标题中选最贴合者。'),
 for:w('prep.','用于；适合','title for this text','适合本文的标题','for限定标题对应文章，不表示原因或持续时间。'),
 this:w('det.','这篇','this text','这篇文章','限定text，范围为当前报业全文。'),
 will:w('modal v.（would）','会是；可认为是','would be','会是；可选作','would表达在给定条件下的判断，不是过去叙述中的将来。'),
 be:w('linking v.','是','title would be','标题会是','be连接title与待填的标题名词短语。'),
});
add('question-201130-option-A',{
 for:w('prep.','为了','Struggling for Survival','为生存而努力','for引struggle的目标，是报业保持经营。'),
 struggle:w('v.-ing（现在分词）','艰难努力','Struggling for Survival','艰难求生','标题以现在分词补充说明报纸状态，省略可理解的are，不是动名词主语。'),
});
add('question-201130-option-B',{
 go:w('v.（过去分词gone）','消逝；不复存在','Gone with the Wind','随风而逝','标题借消散意象暗示报业已消亡，不是正文岗位被裁这一具体动作。'),
 with:w('prep.','随着','Gone with the Wind','随风而逝','与Wind构成伴随消逝的意象，不是be filled with结构。'),
});
add('question-201130-option-C',{business:w('n.','行业','A Thriving Business','兴旺的行业','标题把美国报业评价为繁荣行业，需核对全文对复苏程度的限定。')});
add('2011-p2-s15',{push:w('v.-ing（动名词）','推下（比喻裁员）','pushing journalists overboard','把记者推下船（裁员）','by后动名词引手段；journalists为宾语，overboard表方向，与stay afloat构成航船比喻。')});
add('2011-p2-s16',{american:w('adj.（专名组成）','美国的','American Society of News Editors','美国新闻编辑人协会','在机构名称中限定Society，不把该词脱离名称理解成美国报纸。')});
add('2011-p2-s13',{year:w('n.（复数）','年','a few years ago','几年前','复数years受a few限定，说明旧利润率曾经常见的时期。')});
add('question-201126-option-B',{subsidy:w('n.（复数）','补贴','state subsidies','国家补贴','作get的宾语，选项声称未能获得；正文只讨论是否应补贴。')});
add('question-201127-option-A',{pay:w('v.','支付','pay less','少付钱','接在threatened to之后，less为省略money的金额宾语，原文未报告该威胁。')});
add('question-201128-option-A',{source:w('n.（复数）','来源','more sources of revenue','更多收入来源','more限定来源数量，与正文比较两类来源的比例不同。')});
add('question-201128-option-B',{newsroom:w('n.（复数）','新闻编辑部','more balanced newsrooms','配置更均衡的编辑部','是have的宾语，more balanced修饰它；正文更均衡描述经营收入，非编辑部。')});
add('question-201129-option-C',{bureau:w('n.（复数）','新闻机构；办事处','Foreign bureaus','驻外新闻机构','本选项以驻外机构作play主语并声称作用关键，需要从正文另找支持。')});
add('question-201129-option-D',{review:w('n.（复数）','评论；评测','car and film reviews','汽车评测和影评','作为interest in的对象，指评论内容；失去兴趣为选项命题，非裁员事实的直接同义表达。')});
const chronicleForms:Record<string,Context>={
 chronicle:w('proper n.（报纸名称）','《纪事报》（报纸名组成）','San Francisco Chronicle','《旧金山纪事报》','与San Francisco组成报纸全名，位于举例介词like之后，不是本句谓语。'),
 chronicling:w('v.-ing（进行时分词）','记述；报道','chronicling their own doom','记述自身厄运','接在were之后构成过去进行时，宾语为their own doom；与同句报纸名形成用词呼应。'),
};
export function getPassage2011P2FormContext(form:string,sourceId?:string):Context|undefined{return sourceId==='2011-p2-s4'?chronicleForms[form]:undefined;}
// 每一组映射均按本句人工填写；下列循环只提供搭配入口，不推断词义或语法。
export const passage2011P2ContextGlosses:Record<string,{meaning:string;note:string}>={};
for(const words of [...Object.values(passage2011P2SourceContexts),chronicleForms])for(const context of Object.values(words))passage2011P2ContextGlosses[context.pattern.toLowerCase()]={meaning:context.patternMeaning,note:context.use!};
export function getPassage2011P2SourceKnowledge(headword:string,sourceId?:string):WordKnowledge|undefined{
 const context=sourceId?passage2011P2SourceContexts[sourceId]?.[headword]:undefined;
 if(!context)return undefined;
 return{grammarRole:context.partOfSpeech!,grammarSummary:context.use!,structures:[{pattern:context.pattern,meaning:context.patternMeaning,rule:context.use!}]};
}
