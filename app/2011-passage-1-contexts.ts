import type { SentenceWordContext } from './contextual-vocabulary';
import type { WordKnowledge } from './knowledge-base';
type Context=SentenceWordContext & { pattern:string; patternMeaning:string };
const w=(partOfSpeech:string,contextualMeaning:string,pattern:string,patternMeaning:string,use:string,preferredCollocations?:string[]):Context=>({partOfSpeech,contextualMeaning,pattern,patternMeaning,use,preferredCollocations:preferredCollocations??[pattern]});
export const passage2011P1SourceContexts:Record<string,Record<string,Context>>={
'2011-p1-s1':{
 as:w('prep.','作为','as an outside director','以外部董事身份','as后接身份名词，修饰joined，不引时间从句。',['as an outside director']),
 in:w('prep.','在','in January 2000','在2000年1月','时间短语限定joined，不把它直接挂给后面的became。'),
 of:w('prep.','……的','president of Brown University','布朗大学校长','of限定president属于哪所大学，不指大学拥有董事会。'),
 she:w('pron.','她（西蒙斯）','she became president','她成为校长','回指同句Ruth Simmons，成为校长的动作与先前加入董事会分开。'),
},
'2011-p1-s2':{
 for:w('prep.','在……期间','For the rest of the decade','在这十年的余下时段','for限定managed的持续时间，不表用途或批评原因。'),
 of:w('prep.','……的','the rest of the decade','这十年余下的部分','of说明rest所取的整体是decade。'),
 she:w('pron.','她（西蒙斯）','she apparently managed both roles','她似乎兼顾两个角色','承接前句西蒙斯，说明她兼顾董事与大学校长两个角色。'),
 both:w('det.','两个都','both roles','两项职务','both限定roles，指外部董事和大学校长。'),
 much:w('det.','很多的','much criticism','大量批评','much限定不可数criticism；without attracting much不是没有任何批评。'),
 without:w('prep.','没有；未','without attracting much criticism','未招致太多批评','without后接动名词attracting，逻辑主语为she。',['without attracting much criticism']),
},
'2011-p1-s3':{
 but:w('conj.','但是','But ... was under fire','但她遭到抨击','转折上一句少受批评的情形。'),
 by:w('prep.','到……为止','by the end of 2009','到2009年底','给出遭到抨击的过去时间边界，不表示施事。'),
 of:w('prep.','……的','the end of 2009','2009年的年底','of限定end所对应的年份。'),
 be:w('linking v.','处于','was under fire','处于遭抨击的境地','was是系动词，under fire作表语；没有后接被动分词。',['under fire']),
 for:w('prep.','因为','for having sat on a committee','因曾任委员会成员','for引遭抨击的原因，后接完成式动名词；并不是用途。',['having sat on Goldman\'s compensation committee']),
 have:w('aux.','完成结构标记','having sat / could have let','此前已任职／怎能放任了','having sat和could have let都回看先前情况；have不表示拥有。'),
 on:w('prep.','在……任职','sit on a committee','担任委员会成员','on在sit on中引组织，不是物理表面。',["having sat on Goldman's compensation committee"]),
 can:w('modal v.（could）','怎么竟能','how could she have let','她怎么竟能放任','could have let是针对已发生行为的反问，表达批评，不问一般能力。'),
 she:w('pron.','她（西蒙斯）','could she have let','她竟能放任','she作let的主语，bonus payouts才是pass的逻辑主语。'),
 how:w('interrogative adv.','怎么','how could she have let','她怎么竟能放任','how配合情态完成式反问，质疑她为何未尽监督职责。'),
 those:w('det.','那些','those enormous bonus payouts','那些巨额奖金发放','特指引起争议的奖金发放，不说她本人领取。'),
},
'2011-p1-s4':{
 by:w('prep.','到……为止','By February the next year','到次年2月','给had left过去完成时提供过去参照点。'),
 next:w('adj.','下一年的','the next year','次年','接上句2009年底，指2010年；不是未来十年的一般说明。'),
 have:w('aux.','过去完成时标记','had left the board','已经离开董事会','had+left表到过去参照点已离任，没有确切离职日。'),
},
'2011-p1-s5':{
 be:w('aux.','过去进行时标记','was taking up time','当时占用时间','was与taking组成进行时，不是后接名词表语。'),
 up:w('particle','构成take up','taking up too much time','占用太多时间','up是take up的小品词；此句不含trade up换到更好平台。',['taking up too much time']),
 time:w('n. uncountable','时间','taking up too much time','占用太多时间','time是占用的资源；不可数，前用much。',['taking up too much time']),
 much:w('det.','很多的','too much time','太多时间','much限定time，too增加过量含义。',['taking up too much time']),
 just:w('adv.','实在；只是','was just taking up too much time','实在太占时间','强化当事人的解释，不表示公正或刚刚。'),
 she:w('pron.','她（西蒙斯）','she said','她说道','she said标明“太占时间”这一解释来自西蒙斯本人。'),
 say:w('v.（said）','说','she said','她解释说','过去时主动引述语放在内容之后，不是were said to的被动报道。',['she said']),
},
'2011-p1-s6':{
 be:w('aux.','构成职责预期结构','are supposed to serve','理应充当','are supposed to do整体表达职责期待，不证明现实已做到。',['are supposed to serve']),
 to:w('infinitive marker','不定式标记','supposed to serve','理应发挥作用','to后serve为动词原形，接在supposed后补足应有行为。',['are supposed to serve']),
 as:w('prep.','作为','serve as advisers','充当顾问','as引角色名词advisers，不是时间从句。'),
 less:w('adv.（比较级）','较少地；较不','less biased','偏见较少的','less修饰形容词biased的程度，不限定顾问人数。'),
 yet:w('conj.','但又','helpful, yet less biased','有帮助却较少偏见的','连接两个共同修饰advisers的品质；不表尚未。'),
 on:w('prep.','在……任职','on a firm\'s board','在公司董事会内','说明董事的任职组织，不是on which关系结构。',["on a firm's board"]),
},
'2011-p1-s7':{
 have:w('aux. / v.','完成标记；拥有','Having made ... they have independence','已积累……他们拥有独立性','Having made为完成式分词；主句have是实义动词。两种用法按词形与位置区分。'),
 their:w('possessive det.','他们的','their wealth and their reputations','他们的财富与声誉','两处their均指外部董事，不指执行官的提案。'),
 and:w('conj.','和','their wealth and their reputations','他们的财富和声誉','连接两个名词宾语，都受made支配。'),
 they:w('pron.','他们（外部董事）','they presumably have enough independence','他们按说拥有足够独立性','指上一句外部董事，不指财富或声誉。'),
 enough:w('det.','足够的','enough independence to disagree','足以提出异议的独立性','enough位于名词前；to disagree补足程度所容许的行为。',['enough independence to disagree']),
 to:w('infinitive marker','不定式标记','enough independence to disagree','足够独立，能够提出异议','to disagree是程度补足，逻辑主语为they，不是目的状语。'),
 with:w('prep.','对……；与……意见相左','disagree with proposals','不赞同提案','with引不同意的对象，不是with名词doing伴随结构。',["disagree with the chief executive's proposals"]),
},
'2011-p1-s8':{
 if:w('conj.','如果','If the sky and the share price are falling','如果危机来临且股价下跌','引条件状语从句，限定董事应提供建议的情境。'),
 and:w('conj.','和','the sky and the share price','天空与股价','连接并列主语，共用are falling；sky falling为夸张危机比喻。'),
 be:w('aux. / linking v.','进行标记；处于','are falling / be able to give','正在下跌／能够提出','are与falling构成进行体；be在able前为系动词，不把两处合为被动。'),
 should:w('modal v.','理应','should be able to give advice','理应能给出建议','表达危机中预期的能力；这里不是should have done或语气虚拟。'),
 to:w('infinitive marker','不定式标记','be able to give advice','能够提出建议','to give补足able，后接动词原形。'),
 on:w('prep.','以……为依据','based on having weathered their own crises','以曾渡过危机的经历为依据','on受based支配，后接动名词经历，不是任职on a board。',['having weathered their own crises']),
 have:w('aux.','完成式标记','having weathered their own crises','曾渡过各自危机','having+weathered构成完成式动名词，作on宾语。'),
 their:w('possessive det.','他们的','their own crises','他们自己的危机','指外部董事各自以前应对的危机。'),
 own:w('emphatic det.','自己的','their own crises','他们自己的危机','own强化所属，与动词owns拥有的用法不同。',['their own crises']),
},
'2011-p1-s9':{
 from:w('prep.','来自','researchers from Ohio University','来自俄亥俄大学的研究人员','from后置修饰researchers的机构所属。'),
 that:w('relative pron.','关系代词，指数据库','a database that covered','涵盖资料的数据库','that作covered主语，限定database，并非不充当成分的内容连接词。'),
 more:w('adv.','超过（more than）','more than 10,000 firms','一万多家公司','more与than及数量组合，两处都表示超出给定数字。'),
 than:w('comparison marker','构成“超过”','more than 64,000 different directors','六万四千多名不同董事','than跟在more后引数量界限，不比较两名董事。'),
 and:w('conj.','和','firms and more than 64,000 different directors','公司以及六万四千多名董事','连接covered的两个名词宾语，两项计数对象不同。'),
 between:w('prep.','在……之间','between 1989 and 2004','1989至2004年之间','between与and连接两个时间端点，限定数据库覆盖年份。'),
},
'2011-p1-s10':{
 then:w('adv.','然后','Then they simply checked','然后他们只是核查','表研究方法的下一步骤，不是then to find两个不定式。'),
 they:w('pron.','他们（研究人员）','they simply checked','研究者只是核查','承接前句Ohio University的研究人员。'),
 which:w('interrogative det.','哪些','which directors stayed','哪些董事仍留任','which限定directors共同作stayed主语；整个疑问内容作checked的宾语。'),
 from:w('prep.','从','from one proxy statement to the next','从一份披露文件到下一份','from与to给出核查跨度。',['from one proxy statement to the next']),
 to:w('prep.','到','from one proxy statement to the next','从一份披露文件到下一份','to后为省略名词的the next，不是不定式。',['from one proxy statement to the next']),
 next:w('adj.（名词省略）','下一份的','the next','下一份委托投票说明书','省略重复的proxy statement，不代表完整任期。',['from one proxy statement to the next']),
},
'2011-p1-s11':{
 most:w('adv.','最','The most likely reason','最可能的原因','most与likely组成最高级修饰reason，不表示大多数董事。'),
 for:w('prep.','关于；针对','reason for departing a board','离开董事会的原因','for后接动名词事件，说明reason解释什么。'),
 be:w('linking v.','是','The most likely reason ... was age','最可能的原因是年龄','was后名词age为表语，不是宾语。'),
 on:w('prep.','针对；关注于','concentrated on disappearances','重点关注退出','on受concentrated支配，后接研究对象。'),
 by:w('prep.','由……作出的','disappearances by directors','董事的退出','by引出退出这一名词事件的行为者，不是截止时间。'),
 of:w('prep.','为……的','the age of 70','70岁的年龄','of引出age的具体数值。',['under the age of 70']),
 those:w('det.','那些','those "surprise" disappearances','那些意外退出','限定研究聚焦的特定非预期离任。'),
 under:w('prep.','小于；未满','under the age of 70','未满70岁','后置限定directors，不含已满70岁的董事。',['under the age of 70']),
},
'2011-p1-s12':{
 they:w('pron.','他们（研究人员）','They found','研究人员发现','found报告研究发现，不是董事自己的判断。'),
 that:w('conj.','引出内容','found that ... probability that ...','发现……的概率……','外层that引found宾语，内层that补足probability事件，两处都不作从句主宾。'),
 after:w('prep.','在……之后','after a surprise departure','意外离任之后','after后接名词短语departure，给风险变化时间背景。',['after a departure']),
 will:w('modal v.','将会','will subsequently have to restate','此后将不得不重述','给离任后续事件的时间前景，不指人的意愿。'),
 have:w('semi-modal v.','不得不（have to）','will have to restate earnings','将不得不重述盈利数据','have to表示必要性，后面restate原形；不是have+过去分词完成时。'),
 to:w('infinitive marker','不定式标记','have to restate earnings','不得不重述盈利数据','to后为restate动词原形，构成必要性结构。'),
 by:w('prep.','幅度为','increases by nearly 20%','增加近20%','by表示变化幅度，不是增加到该水平，不自行改写成百分点。',['increases by nearly 20%']),
},
'2011-p1-s13':{
 of:w('prep.','关于……的','likelihood of being named','被列入诉讼的可能性','of补足likelihood所涉及的事件。',['being named in a federal class-action lawsuit']),
 be:w('aux. / linking v.','被；处于','being named / is likely','被列名／可能','being+named构成被动动名词；is接likely形容词为系表，两处不能都标成被动。'),
 in:w('prep.','在……中','in a federal class-action lawsuit','在联邦集体诉讼中','说明被列入哪种诉讼，不交代诉讼胜负。',['being named in a federal class-action lawsuit']),
 and:w('conj.','而且','increases, and the stock is likely to perform worse','概率上升，而且股票可能表现更差','连接两个完整分句，后者主语转为stock。'),
 to:w('infinitive marker','不定式标记','likely to perform worse','可能表现更差','to perform补足likely的具体内容。',['is likely to perform worse']),
},
'2011-p1-s14':{
 to:w('infinitive marker','不定式标记','tended to be larger','往往更大','to be补足tended的趋势内容，不是目的。',['tended to be larger']),
 be:w('linking v.','是；呈现','to be larger','呈现更大的幅度','be后larger形容词为表语，说明effect。'),
 for:w('prep.','对于','for larger firms','对较大的公司而言','限定关联效应在哪种公司更明显，不是原因或用途。'),
},
'2011-p1-s15':{
 although:w('conj.','尽管','Although a correlation ... is suggestive','虽然相关性颇有暗示意味','让步部分承认相关性，主句限制从中推断每个动机。'),
 they:w('pron.（宾格them）','这些董事','them leaving','他们离任','them是leaving的逻辑主语，指董事，不是研究人员。'),
 and:w('conj.','和','between them leaving and subsequent bad performance','离任与随后表现不佳之间','between A and B的两项为事件及表现，不是主句并列谓语。'),
 at:w('prep.','在……中','bad performance at the firm','公司中的不佳表现','限定performance发生范围，不表示比率。'),
 be:w('linking v. / aux.','是；进行标记','is suggestive / are always jumping','颇有暗示意味／总是在跳离','is后suggestive为表语；are+jumping为进行体。'),
 it:w('pron.','这种相关性','it does not mean','这种相关性并不意味着','回指让步从句中的correlation；这里有具体所指，不是形式主语。'),
 do:w('aux.（does）','否定助动词','does not mean','并不意味着','does承载现在时第三人称单数，与not构成否定，mean保持原形。'),
 mean:w('v.','意味着','does not mean that ... always ...','并不意味着总是如此','后接that内容从句，否定从关联推出一概动机，非mean doing原文结构。',['does not mean that']),
 that:w('conj.','引出内容','mean that such directors are always jumping','意味着这些董事总在跳离','that引mean的宾语从句，不在内部充当主语。'),
 always:w('adv.','总是','does not mean ... always','并不意味着总是','always位于被否定的完整命题内，不能译成从不。'),
 off:w('prep.','从……离开','jumping off a sinking ship','跳离正在下沉的船','off引离开对象ship；没有介词前置定语从句。',['jumping off a sinking ship']),
 between:w('prep.','在……之间','between them leaving and subsequent bad performance','离任与后续差表现之间','and连接两个相关的现象；them leaving为带逻辑主语的动名词结构。'),
},
'2011-p1-s16':{
 they:w('pron.','他们（离任董事）','they "trade up"','他们另谋高就','主体是董事，而非研究人员。'),
 up:w('particle','构成升级义','trade up','另谋更好职位','up与trade合成升级更换的比喻，不是占用时间。',['"trade up,"']),
 for:w('prep.','转向；以……为去向','leave A for B','离开A转去B','for后的公司是新去向，不能将更稳定移给原公司。',['leaving riskier, smaller firms for larger and more stable firms']),
 and:w('conj.','和','larger and more stable firms','更大且更稳定的公司','连接两组共同修饰firms的比较级定语。'),
 more:w('adv.','更加','more stable firms','更稳定的公司','more修饰stable程度，组成形容词比较级，不表更多公司。'),
},
'2011-p1-s17':{
 but:w('conj.','但是','But the researchers believe','但研究者认为','从另谋高就的替代解释转回提前离任的声誉收益。'),
 that:w('conj.','引出观点内容','believe that outside directors have','认为外部董事有','that引believe后的完整判断，不是关系代词。'),
 have:w('v.','经历；处于','have an easier time of doing','较容易做到','have为实义动词，宾语中心time，非完成助动词。',['have an easier time of avoiding a blow to their reputations']),
 time:w('n.','经历；时点','an easier time / at the time','较容易的经历／在那个时点','第一处time配easier表行动难易，第二处指违规发生时；两处均非次数倍数。',['have an easier time of avoiding a blow to their reputations']),
 of:w('prep.','引出内容','time of avoiding / review of history','避免损害的经历／对历史的回顾','第一处of补足time的行动，第二处引review回顾对象，不是所有关系都逐字译成的。'),
 to:w('prep.','对……的','a blow to their reputations','对他们声誉的打击','to后为名词reputations，引受损对象，不是不定式。'),
 their:w('possessive det.','他们的','their reputations','董事们的声誉','指外部董事自己的声誉。'),
 if:w('conj.','如果；即使（even if）','if they leave / even if a review shows','如果他们离开／即使回顾显示','第一处if给条件；第二处与even合成让步条件，不能把二者都译成原因。'),
 they:w('pron.','他们（外部董事）','they leave / they were on the board','他们离开／他们仍在任','同一批董事的不同时间状态，并非同一时点两个相反动作。'),
 before:w('conj.','在……之前','before bad news breaks','在坏消息曝光之前','before引主语bad news与谓语breaks的时间从句，限定leave。',['before bad news breaks']),
 be:w('linking v.（were）','处于','were on the board','当时在董事会任职','were为过去时系动词，on the board表任职状态，无被动分词。'),
 on:w('prep.','在……任职','on the board','在董事会任职','作were的表语，不是on which关系结构。'),
 at:w('prep.','在……时','at the time any wrongdoing occurred','在违规行为发生时','at引时点，后面的省略when从句限定time。'),
 any:w('det.','任一的；任何的','any wrongdoing','任何不当行为','限定公司发生的不当行为，不把董事在任等同于亲自违规。'),
},
'2011-p1-s18':{
 who:w('relative pron.','关系代词，指公司','Firms who want to keep','希望留住董事的公司','原卷who指Firms并作want主语，保留原文而不改成which。'),
 to:w('infinitive marker','不定式标记','want to keep / have to create','希望留住／不得不提供','两处to后均为动词原形，分别接want和have。'),
 their:w('possessive det.','它们的','their outside directors','这些公司的外部董事','指主语Firms所聘董事，不指董事拥有其他董事。'),
 through:w('prep.','贯穿；度过','through tough times','贯穿困难时期','限定keep留住董事的时间范围。',['through tough times']),
 time:w('n.（times）','时期','tough times','困难时期','复数times表示阶段，不是次数或倍数。',['through tough times']),
 may:w('modal v.','可能','may have to create incentives','可能不得不提供激励','保留可能性，不保证一定需要，也不是询问许可。'),
 have:w('semi-modal v.','不得不（have to）','may have to create incentives','可能不得不提供激励','have to+原形表示实际必要性；不是have done完成时。'),
},
'2011-p1-s19':{
 otherwise:w('adv.','否则','Otherwise outside directors will follow','否则董事会效仿','承接未提供留任激励的情况。'),
 will:w('modal v.','将会','will follow the example','将会效仿这个例子','根据前文条件预测董事选择，不是名词意愿。'),
 of:w('prep.','……的','the example of Ms. Simmons','西蒙斯的例子','指定所效仿人物，回扣开篇离任个案。',['follow the example of Ms. Simmons']),
 once:w('adv.','再一次（once again）','once again very popular','又一次很受欢迎','once与again表示再度，不是连词一旦。',['once again']),
 very:w('adv.','很','very popular on campus','在校园里很受欢迎','very作为程度副词修饰popular，说明西蒙斯在校园里很受欢迎。',['popular on campus']),
 on:w('prep.','在','on campus','在校园内','限定popular发生的社会环境，不是董事会任职介词义。',['popular on campus']),
},
'question-201121-prompt':{
 according:w('fixed-expression component','根据','According to Paragraph 1','根据第一段','according to引出本题要求依据的段落，不指其他文章人物的引语。',['according to']),
 to:w('prep.','根据（according to）','According to Paragraph 1','根据第一段','to属于复合介词according to，后接段落名，不是不定式。',['according to']),
 be:w('aux.（was）','被动标记','was criticized','受到批评','was+criticized为过去时被动，西蒙斯是被批评者。'),
 for:w('prep.','因为','be criticized for doing','因某行为受到批评','for后由动名词选项补出原因，不表示持续时间。'),
},
'question-201121-option-A':{gain:w('v.-ing（gerund）','获得','gaining excessive profits','获取过高利润','gaining在题干for后作动名词，主语承接西蒙斯；此选项声称本人获利。'),profit:w('n.（复数）','利润','excessive profits','过高利润','profits为gaining的宾语，不是动词获利。',['excessive profits'])},
'question-201121-option-B':{fail:w('v.-ing（gerund）','未能做到','failing to fulfill her duty','未尽职责','fail to do表示没有做到后续行为；动名词接在for后。'),to:w('infinitive marker','不定式标记','fail to fulfill','未能履行','to后fulfill是动词原形，补足failing。'),her:w('possessive det.','她的','her duty','她的职责','her指西蒙斯并限定duty，不是fulfill的单独宾语。')},
'question-201121-option-C':{to:w('infinitive marker','不定式标记','refuse to make compromises','拒绝妥协','to make作refusing的宾语，make后再接compromises。'),make:w('v.','作出','make compromises','作出妥协','make与compromises构成固定搭配，不是make wealth积累财富。')},
'question-201121-option-D':{in:w('prep.','在……期间','in tough times','在困难时期','限定leaving何时发生。'),time:w('n.（times）','时期','tough times','困难时期','times为时期复数，不是时间的若干倍。',['through tough times'])},
'question-201122-prompt':{we:w('pron.','我们（读者）','We learn from Paragraph 2','读者从第二段得知','题干读者主体，不是正文研究者we。'),learn:w('v.','得知','learn that','得知某事','后接that内容从句，不是课堂学习技能。'),from:w('prep.','从','from Paragraph 2','从第二段','限定信息来源。'),that:w('conj.','引出所知内容','learn that outside directors ...','得知外部董事……','that从句作learn宾语，内部有独立主语outside directors。'),be:w('aux. / linking v.','职责标记；是','are supposed to be','本应是','are supposed to表达职责预期；末尾be将接角色名词作表语。'),to:w('infinitive marker','不定式标记','supposed to be','本应是','to后be为原形，不是介词。')},
'question-201122-option-A':{generous:w('adj.','慷慨的','generous investors','慷慨的投资者','修饰investors；有财富并不自动等于慷慨。',['generous investors']),investor:w('n.（复数）','投资者','generous investors','慷慨的投资者','投资者是出资身份，不等于外部董事顾问角色。')},
'question-201122-option-B':{unbiased:w('adj.','公正的；无偏见的','unbiased executives','公正的经营管理人员','修饰executives，不能因形容词相近忽略角色变化。'),executive:w('n.（复数）','经营管理人员','unbiased executives','公正的经营管理人员','这里是复数角色executives，不是chief executive所有格修饰提案。')},
'question-201122-option-C':{share:w('n.（前置修饰）','股票','share price forecasters','股价预测者','share修饰price，两者共同限定forecasters，不是分享动词。',['share price']),price:w('n.','价格','share price','股票价格','作forecasters的预测对象定语，不是股票数量。',['share price'])},
'question-201122-option-D':{independent:w('adj.','独立的','independent advisers','独立顾问','修饰提供建议者，表达自主判断而非完全不合作。',['independent advisers']),adviser:w('n.（复数）','顾问','independent advisers','独立顾问','给建议的角色，不是执行管理人员。',['independent advisers'])},
'question-201123-prompt':{according:w('fixed-expression component','根据','According to the researchers','根据研究人员','信息来源为俄亥俄大学研究者，需要回到他们报告的研究结果。',['according to']),to:w('prep. / infinitive marker','根据（according to）；不定式标记','According to ... is likely to ...','根据……可能……','首处to属于according to，末尾to用于接选项动词原形；按位置分辨。'),from:w('prep.','来自','researchers from Ohio University','俄亥俄大学的研究人员','限定研究人员的机构所属。'),after:w('prep.','在……之后',"after an outside director's surprise departure",'在外部董事意外离任之后','after后接名词departure，说明推断以董事意外离任之后为时间背景。',['after a departure']),be:w('linking v.（is）','是；处于','the firm is likely to','公司可能……','is与likely构成系表，后面to接待选行为。')},
'question-201123-option-A':{more:w('adv.','更加','more stable','更稳定','修饰stable程度，不是more than数量界限。'),become:w('linking v.','变得','become more stable','变得更稳定','接在题干to后为原形；stable作表语。')},
'question-201123-option-B':{report:w('v.','报告','report increased earnings','报告更高的盈利','动词接earnings宾语，increased前置修饰盈利。'),increase:w('v.-ed（adjectival）','增加了的','increased earnings','增长了的盈利','increased修饰earnings，不是此短语有限谓语；该项说盈利上涨。')},
'question-201123-option-C':{do:w('v.','表现','do less well','表现较差','do是实义动词表示表现如何，不是否定助动词。',['do less well']),less:w('adv.','较不','less well','较不理想地','less降低well程度，修饰do，不表示更少公司。',['do less well']),well:w('adv.','好地','do less well','表现不那么好','well为方式副词；没有as well as或may well be结构。',['do less well']),in:w('prep.','在……领域','in the stock market','在股票市场上','限定表现领域为股市。'),market:w('n.','市场','stock market','股票市场','指股票交易市场，不是动词推销。')},
'question-201123-option-D':{in:w('prep.','在……中','in lawsuits','在诉讼中','把perform worse的领域限定为诉讼，原文只说被诉风险增加。'),perform:w('v.','表现','perform worse in lawsuits','在诉讼中表现更差','此选项将表现领域换成诉讼；不是正文以股票为主语。'),badly:w('adv.（worse）','更差地','perform worse in lawsuits','在官司中表现更差','worse修饰perform，来自badly，不能归形容词bad。')},
'question-201124-prompt':{it:w('formal subject','形式主语','It can be inferred that','可以推断……','It先占主语位置，真正推断内容为后置that从句；这里没有具体的指代对象。'),can:w('modal v.','可以','can be inferred','可以推断','can后be原形，表示在证据允许下的推断可能。'),be:w('aux.','被动标记','be inferred','被推断出','be与inferred组成被动，受can支配用原形。'),from:w('prep.','从','from the last paragraph','从最后一段','限定推断依据。'),that:w('conj.','引出推断内容','It can be inferred ... that','可以推断……','that从句是与It对应的外置内容，不在内部作主语。')},
'question-201124-option-A':{may:w('modal v.','可能','may stay','可能留任','保留可能性，不承诺所有人一定留下。'),for:w('prep.','因为；为了','stay for the attractive offers','因有吸引力的条件而留下','for引出可能促成留任的条件：公司提供有吸引力的待遇。',["attractive offers from a firm"]),from:w('prep.','来自','offers from the firm','来自公司的条件','后置限定offers来源，不修饰董事来源。'),offer:w('n.（复数）','给予的条件','attractive offers from the firm','公司提供的优厚条件','offers在for后为名词复数，不是第三人称单数动词。',["attractive offers from a firm"])},
'question-201124-option-B':{have:w('aux. / v.','完成标记；有','have often had records','经常有过记录','have为现在完成时助动词，had是实义have过去分词；这里不能说had是一般过去时。'),of:w('prep.','关于……的','records of wrongdoings','违规行为记录','说明记录的内容，非董事名单。'),in:w('prep.','在……中','wrongdoings in the firm','公司中的违规','限定行为所在组织，并非仅证明董事当时任职。')},
'question-201124-option-C':{be:w('linking v.（are）','是；处于','are accustomed to','习惯于','are接形容词accustomed作表语。'),to:w('prep.','对于','accustomed to stress-free work','习惯于无压力的工作','to后work是受stress-free修饰的名词；不是to work不定式。'),in:w('prep.','在……中','work in the firm','公司中的工作','限定工作的场所组织。'),work:w('n. uncountable','工作','stress-free work','没有压力的工作','work为介词to的名词宾语，不是起作用动词。')},
'question-201124-option-D':{will:w('modal v.','将会','will decline incentives','将拒绝激励','后接decline原形，作未来选择预测。'),from:w('prep.','来自','incentives from the firm','公司提供的激励','限定incentives来源。'),decline:w('v.','拒绝','decline incentives','拒绝激励条件','decline直接接宾语，取婉拒义，不是激励下降。',['decline an offer'])},
'question-201125-prompt':{toward:w('prep.','对于','attitude toward the role','对角色的态度','toward引态度对象，不是朝方向或接近时间末尾。'),of:w('prep.','……的','the role of outside directors','外部董事的角色','限定role所属对象。'),be:w('linking v.（is）','是','The author\'s attitude ... is','作者态度是','is与单数attitude一致，后接形容词表语。')},
'question-201125-option-A':{permissive:w('adj.','宽容放任的','a permissive attitude','放任的态度','容许行为、少加限制的态度，不等于中立分析。',['a permissive attitude'])},
'question-201125-option-B':{positive:w('adj.','积极肯定的','a positive attitude','积极的态度','这个选项表示作者持肯定态度；是否符合全文，须另查证据。',['a positive attitude'])},
'question-201125-option-C':{scornful:w('adj.','轻蔑的','a scornful response','轻蔑的回应','带看不起的情绪，比分析性批评更强。',['a scornful response'])},
'question-201125-option-D':{critical:w('adj.','批评的','a critical attitude','批评的态度','态度语境取指出问题义，不取关键、危急的含义。',['a critical attitude'])},
};
const add=(sourceId:string,words:Record<string,Context>)=>Object.assign(passage2011P1SourceContexts[sourceId],words);
add('2011-p1-s1',{
 year:w('n.','年','a year later','一年之后','year表示从前述2000年1月向后推移一年的时长。'),become:w('linking v.（became）','成为','became president','成为校长','became为过去时系动词，president是表明新身份的表语。'),university:w('n.（专名组成）','大学','Brown University','布朗大学','大写University属于机构专名Brown University，即布朗大学。')});
add('2011-p1-s2',{decade:w('n.','十年','the rest of the decade','这十年的剩余时间','decade指2000年开始的这个十年，rest限定其中余下的时段。')});
add('2011-p1-s3',{
 end:w('n.','末尾','the end of 2009','2009年底','end为时间名词，受by限定为截止点。'),under:w('prep.','处于……状态','under fire','遭到抨击','under fire整体用作was的表语，表示受到抨击的处境。',['under fire']),committee:w('n.','委员会',"Goldman's compensation committee",'高盛薪酬委员会','committee为中心词，compensation限定该委员会负责薪酬事务。',["Goldman's compensation committee"]),let:w('v.（过去分词）','让；放任','let those enormous bonus payouts pass unremarked','让巨额奖金未经质疑通过','have let中的let是过去分词；宾语payouts同时是pass的逻辑主语。'),enormous:w('adj.','巨大的','enormous bonus payouts','巨额奖金发放','修饰bonus payouts的规模，强调奖金发放金额巨大。')});
add('2011-p1-s4',{year:w('n.','年','the next year','次年','由前一句2009年推出2010年，配合2月作截止点。')});
add('2011-p1-s6',{serve:w('v.','充当；发挥作用','serve as advisers','充当顾问','as后接advisers说明所担角色，on另补任职机构。'),biased:w('adj.','有偏见的','less biased advisers','偏见较少的顾问','less降低偏见程度；不能改成全然没有任何偏向。')});
add('2011-p1-s7',{wealth:w('n.','财富','their wealth and their reputations','他们的财富与声誉','wealth和reputations共同作made的宾语，表示董事已积累的财富与声誉。'),elsewhere:w('adv.','在别处','made their wealth and their reputations elsewhere','在别处积累财富与声誉','elsewhere修饰made，说明不依赖当前公司积累这些资源。'),presumably:w('adv.','想必；按说','presumably have enough independence','按说有足够独立性','按财富声望来源推测，不无条件保证。'),chief:w('adj.','首席的','chief executive','首席执行官','chief前置修饰executive，为经营管理层最高主管职衔。')});
add('2011-p1-s8',{price:w('n.','价格','the share price','股价','share为名词定语，说明股票价格，与天空并列为falling主语。',['share price']),fall:w('v.-ing（present participle）','下跌；坠落','are falling','正在下跌','falling与are构成进行时，非动名词；股价下跌为实义，天塌为比喻。'),able:w('adj.','能够的','be able to give advice','能够给出建议','able为be表语，to give补足具体能力。'),give:w('v.','提出；给予','give advice','提出建议','give直接带不可数名词advice作宾语，说明危机中应提出建议。',['give advice']),base:w('v.-ed（past participle）','以……为依据','advice based on having weathered their own crises','基于自身危机经验的建议','based on整组后置修饰advice；此处没有显式be，不另造主句谓语。')});
add('2011-p1-s9',{researcher:w('n.（复数）','研究人员','researchers from Ohio University','俄亥俄大学研究人员','这组人使用数据库研究董事去留及公司随后的表现。'),university:w('n.（专名组成）','大学','Ohio University','俄亥俄大学','University属于Ohio University机构名。',['Ohio University']),use:w('v.（过去式）','使用','used a database','使用了数据库','used为主动过去时谓语，非形容词习惯于。'),different:w('adj.','不同的','different directors','不同的董事','限定人数为不同个体，不是同一人重复出现的记录数。')});
add('2011-p1-s10',{simply:w('adv.','只是','simply checked','只是核查','修饰checked，强调研究方法只是对照前后披露名单。'),stay:w('v.（过去式）','留任','which directors stayed','哪些董事仍任职','stayed为不及物过去时，表示前后两次披露间仍在任。'),one:w('determiner（数词）','一份','one proxy statement','一份委托投票说明书','one限定statement，与the next对应前后两份披露文件。')});
add('2011-p1-s11',{likely:w('adj.','可能的','the most likely reason','最可能的原因','likely作reason定语，most组成最高级；不是修饰整句的副词。'),reason:w('n.','原因','reason for departing a board','离开董事会的原因','中心reason与was age主系表对应；for说明被解释的事件。'),so:w('conj.','因此','so the researchers concentrated','因此研究人员集中关注','连接年龄为常见原因与聚焦年轻董事意外离任，不是so many程度。'),researcher:w('n.（复数）','研究人员','the researchers concentrated','研究人员集中关注','承接俄亥俄大学团队，他们选择观察样本。')});
add('2011-p1-s12',{find:w('v.（found）','发现','They found that','他们发现……','found为find过去式，后接that从句报告研究人员发现的统计关联。'),company:w('n.','公司','the company will subsequently have to restate earnings','公司之后不得不重述盈利数据','指董事意外离任的原公司，后续可能需要重述其盈利数据。'),increase:w('v.（第三人称单数）','增加','the probability ... increases','该概率增加','increases为外层从句谓语，与主语中心probability对应。'),nearly:w('adv.','将近','nearly 20%','接近20%','修饰概率的相对增幅；原文并未将该幅度表述为20个百分点。',['increases by nearly 20%'])});
add('2011-p1-s13',{federal:w('adj.','联邦的','a federal class-action lawsuit','联邦集体诉讼','federal限定class-action lawsuit，说明是联邦层面的集体诉讼。'),also:w('adv.','也','also increases','也增加','在财报重述风险之外再添被诉风险；位于实义动词increases前。'),increase:w('v.（第三人称单数）','增加','The likelihood ... also increases','该可能性也增加','主语likelihood说明被列入诉讼的概率，并非诉讼赔偿额。'),likely:w('adj.','可能的','is likely to perform worse','可能表现更差','likely作is表语，不定式补足具体可能事件。',['is likely to perform worse'])});
add('2011-p1-s14',{effect:w('n.','效应；关联程度','The effect tended to be larger','这种效应往往更大','承接离任与后续风险关联，不把相关性直接升级为确定因果。'),tend:w('v.（过去式）','往往','tended to be larger','往往更大','tended为一般过去时谓语，不是have tended中的过去分词。',['tended to be larger']),large:w('adj.（larger）','更大的','larger for larger firms','在更大公司中幅度更大','第一处larger作be表语说明效应，第二处限定公司规模；不能一律解释数量。')});
add('2011-p1-s15',{bad:w('adj.','不佳的','subsequent bad performance','随后不佳的表现','bad修饰performance，说明公司随后的表现不佳。'),not:w('adv.','不','does not mean ... always','不意味着总是','否定把相关性推成一概而论的命题，并不否定存在关联。'),such:w('det.','这类的','such directors','这类董事','回指前文意外离任董事；这里没有such as举例。'),ship:w('n.','船','a sinking ship','正在下沉的船','与sinking一起构成比喻，用正在下沉的船形容前景不妙的公司。',['jumping off a sinking ship'])});
add('2011-p1-s16',{often:w('adv.','往往；经常','Often they "trade up"','他们往往另谋高就','修饰trade up频率，提供常见替代动机，不是每次。'),small:w('adj.（smaller）','更小的','riskier, smaller firms','风险更高、规模更小的公司','限定被离开的原公司；与新公司的larger对比。'),large:w('adj.（larger）','更大的','larger and more stable firms','更大更稳定的公司','限定转去的新公司规模，不是数量增加。')});
add('2011-p1-s17',{researcher:w('n.（复数）','研究人员','the researchers believe','研究人员认为','明确后续解释来自研究者；不是作者第一人称观点。'),believe:w('v.','认为','believe that outside directors have','认为外部董事较容易……','后面的that引完整宾语内容，报告研究者关于声誉保护的判断。'),easy:w('adj.（easier）','较容易的','an easier time of avoiding','避免某事较容易','easier修饰time，说明避免声誉损害这一行动较容易。',['have an easier time of avoiding a blow to their reputations']),bad:w('adj.','不好的','bad news','坏消息','bad修饰news，指对公司不利的消息。'),news:w('n. uncountable','消息','bad news breaks','坏消息传出','news不可数，结尾s不是复数标记，所以谓语breaks单数。',['before bad news breaks']),even:w('adv.','即使（even if）','even if a review of history shows','即使历史回顾显示','even与if组成让步条件，说明即使查明过去在任也不改变前面的判断。'),history:w('n.','历史；过去情况','a review of history','对过去情况的回顾','指回顾公司的过去情况，核对董事任职与违规发生的时间。'),show:w('v.（shows）','显示','shows they were on the board','显示他们当时在董事会','后接省略that的内容从句，显示违规发生时他们仍在董事会任职。')});
add('2011-p1-s18',{want:w('v.','希望','want to keep their outside directors','希望留住外部董事','want后接to keep作宾语；公司的留任目标与激励手段分开。'),create:w('v.','提供；建立','create incentives','提供激励条件','create的宾语为incentives，不是pressure压力。',['create incentives'])});
add('2011-p1-s19',{example:w('n.','例子；做法','the example of Ms. Simmons','西蒙斯的做法','指开篇西蒙斯离任的做法，结尾借此回扣开头个案。',['follow the example of Ms. Simmons']),again:w('adv.','再度','once again','又一次','与once共同修饰popular，表明西蒙斯个人在校园里重新受到欢迎。',['once again'])});
add('question-201121-prompt',{paragraph:w('n.','段落','Paragraph 1','第一段','题干限定从第一段查找批评原因。'),criticize:w('v.-ed（被动分词）','批评','was criticized','受到批评','过去时被动，主语为受批评的西蒙斯；不是未采用的干扰项。')});
add('question-201121-option-A',{excessive:w('adj.','过多的；过度的','excessive profits','过高利润','excessive限定profits，说明这个选项声称利润过高。')});
add('question-201121-option-B',{fulfill:w('v.','履行','fulfill her duty','履行她的职责','直接接duty宾语，题干逻辑主语为西蒙斯。'),duty:w('n.','职责','her duty','她的职责','指西蒙斯担任董事时应履行的监督责任。')});
add('question-201122-prompt',{paragraph:w('n.','段落','Paragraph 2','第二段','限定应有角色的信息来自第二段。')});
add('question-201123-prompt',{researcher:w('n.（复数）','研究人员','the researchers from Ohio University','俄亥俄大学的研究人员','指正文研究团队，其结果是本题依据。'),university:w('n.（专名组成）','大学','Ohio University','俄亥俄大学','机构专名Ohio University的组成部分，即俄亥俄大学。',['Ohio University']),likely:w('adj.','可能的','is likely to','可能……','likely作is表语，不定式由选项补全，非副词。')});
add('question-201124-prompt',{infer:w('v.-ed（被动分词）','推断','can be inferred','可以推断','与be构成被动，推断的证据范围由from the last paragraph限定。'),last:w('adj.','最后的','the last paragraph','最后一段','限定段落顺序，不是去年或持续的动词。'),paragraph:w('n.','段落','the last paragraph','末段','本题推断依据为全文第四段，而非第一段。')});
add('question-201124-option-A',{stay:w('v.','留任','may stay','可能留下','在公司继续担任董事，不是stay alive的系表状态。')});
add('question-201124-option-B',{often:w('adv.','经常','have often had records','经常有过记录','修饰现在完成时行为频率；often这一范围没有原文依据。')});
add('question-201125-prompt',{author:w('n.（所有格）','作者','The author\'s attitude','作者的态度','author的所有格限定attitude，需识别叙述者对外部董事角色的评价。'),attitude:w('n.','态度','attitude toward the role','对角色的态度','中心attitude与is单数一致，toward说明评价对象。')});

// 上列人工模式同时提供可打开的双语搭配；不会用词形去推断语法关系。
export const passage2011P1ContextGlosses:Record<string,{meaning:string;note:string}>={};
for(const words of Object.values(passage2011P1SourceContexts)) for(const context of Object.values(words)) {
 passage2011P1ContextGlosses[context.pattern.toLowerCase()]={meaning:context.patternMeaning,note:context.use!};
}
export function getPassage2011P1SourceKnowledge(headword:string,sourceId?:string):WordKnowledge|undefined {
 const context=sourceId?passage2011P1SourceContexts[sourceId]?.[headword]:undefined;
 if(!context)return undefined;
 return {grammarRole:context.partOfSpeech!,grammarSummary:context.use!,structures:[{pattern:context.pattern,meaning:context.patternMeaning,rule:context.use!}]};
}
