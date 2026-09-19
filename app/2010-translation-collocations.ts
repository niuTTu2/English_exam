import type {SentenceWordContext} from "./contextual-vocabulary";
import type {PhraseKnowledge} from "./knowledge-base";
import {translation2010Lexicon,translation2010SentenceContexts} from "./2010-translation-lexicon";
import {translation2010ReviewedContexts} from "./2010-translation-contexts";
const rows:[number,string[],string,string,string,string][]=[
[1,["sustainability","become","a","popular","word"],"has become a popular word","become a popular word","已经成为一个流行词","become为系动词，名词短语作表语。"],
[1,["these","day"],"these days","these days","如今；近来","复数时间名词短语，整体作时间状语。"],
[1,["to","ted","ning"],"to Ted Ning","to somebody（观点）","对特德·宁而言","观点状语，限定后面的个人意义。"],
[1,["the","concept"],"the concept","the concept","这个概念","定冠词回指开头可持续性。"],
[1,["will","always","have","personal","meaning"],"will always have personal meaning","have personal meaning (to somebody)","始终会有切身意义","have为实义动词，personal meaning是宾语。"],
[2,["have","endure","a","painful","period","of","unsustainability"],"Having endured a painful period of unsustainability","having done something（动名词完成式）","曾经历一段生活难以为继的痛苦时期","完成式动名词与后面的生活范围一起构成长主语。"],
[2,["in","his","own","life"],"in his own life","in one's own life","在他自己的生活中","his指宁，own加强亲身生活的所属意义。"],
[2,["make","it","clear","to","he","that"],"made it clear to him that sustainability-oriented values must be expressed through everyday action and choice","make it clear (to somebody) that + clause","使他明白价值观必须通过日常行动和选择体现","it为形式宾语，clear为宾补，that给后置内容。"],
[2,["sustainability-oriented","value"],"sustainability-oriented values","sustainability-oriented values","以可持续性为导向的价值观","复合形容词作values的定语。"],
[2,["must","be","express"],"must be expressed","must be done","必须得到体现","情态被动表示必要性，不是已经落实的事实。"],
[2,["through","everyday","action","and","choice"],"through everyday action and choice","through action and choice","通过日常行动和选择","途径介词接并列名词，everyday作定语。"],
[3,["ning","recall"],"Ning recalls spending","recall doing something","宁回忆曾花费时间","recall接动名词，叙述以往经历。"],
[3,["spend","a","confusing","year"],"spending a confusing year in the late 1990s selling insurance","spend time doing something","在20世纪90年代末卖保险，度过困惑的一年","时间状语位于时间宾语year与活动selling之间。"],
[3,["in","the","late","1990s"],"in the late 1990s","in the late + decade","在20世纪90年代末","late限定年代后期，不是1990年年底。"],
[3,["sell","insurance"],"selling insurance","sell insurance","销售保险","selling为spend time doing中的活动，insurance不可数。"],
[4,["he'd","be","through"],"He'd been through the dot-com boom and burst","be through something","他经历过互联网行业兴衰","He'd为He had，be through在此表示经历。"],
[4,["the","dot-com","boom","burst","and"],"the dot-com boom and burst","the dot-com boom and burst","互联网行业的繁荣与泡沫破裂","and连接两个名词，原卷burst保持不变。"],
[4,["desperate","for","job"],"desperate for a job","be desperate for something","急需工作","形容词短语补充宁的状态，兼说明求职动机。"],
[4,["sign","on","with","a","boulder","agency"],"signed on with a Boulder agency","sign on with an organization","与博尔德一家机构签约入职","on为短语动词小品词，with引签约机构。"],
[5,["it","do","go","well"],"It didn't go well","go well","这份工作进展不顺利","实际表达含didn't否定；It回指工作开展情况。"],
[6,["it","be","a","really","bad","move"],"It was a really bad move","a bad move","这个决定实在很糟","move为决定，a bad move在was后作表语。"],
[6,["because","that's","not","my","passion"],"because that's not my passion","because + clause","因为那不是我热爱的事情","that是回指工作的代词，与is缩写；原因从句在引号内。"],
[6,["say","ning"],"says Ning","say + direct quotation","宁说","报道语序倒装，Ning为主语，引语为内容。"],
[6,["whose","dilemma","about","the","job"],"whose dilemma about the job","whose + noun + predicate","他在工作上的两难处境","whose先行词Ning，限定dilemma，整组为关系从句主语。"],
[6,["translate","predictably","into"],"translated, predictably, into a lack of sales","translate into something","不出所料地表现为销售不足","predictably为插入评注，translate into引结果。"],
[6,["lack","of","sale"],"a lack of sales","a lack of + noun","销售不足","lack为名词，of引缺少对象，不断言销量绝对为零。"],
[7,["i","be","miserable"],"I was miserable","be miserable","我当时很痛苦","miserable为形容词表语，不是was的动作宾语。"],
[8,["i","have","so","much","anxiety","that"],"so much anxiety that I would wake up in the middle of the night and stare at the ceiling","so much + uncountable noun + that + clause","如此焦虑以至于常半夜醒来并凝视天花板","结果从句含两个共用would的动作。"],
[8,["would","wake","up"],"would wake up","would do（过去习惯）","过去常常醒来","would表示过去反复行为，wake up不及物。"],
[8,["in","the","middle","of","night"],"in the middle of the night","in the middle of the night","在半夜","of the night限定middle，整体作醒来的时间状语。"],
[8,["and","stare","at","ceiling"],"and stare at the ceiling","stare at something","并盯着天花板","stare与wake共用I和would，at引注视对象。"],
[9,["i","have","no","money","and"],"I had no money and needed the job","have no money and need a job","我没有钱又需要这份工作","had与needed共享I，no限定不可数money。"],
[9,["need","the","job"],"needed the job","need a/the job","需要这份工作","needed为实义动词，后接名词宾语。"],
[10,["everyone","say"],"Everyone said","say + direct quotation","大家都说","said以过去时报道周围人的劝慰。"],
[10,["just","wait"],"Just wait","just wait","再等等吧","Just缓和建议，wait为省略you的祈使动词。"],
[10,["you","turn","the","corner"],"you'll turn the corner","turn the corner","你会迎来转机","比喻开始好转，来自他人的鼓励，不证实后来成功。"],
[10,["give","it","some","time"],"give it some time","give somebody/something (some) time","给这件事一些时间","祈使句含双宾语it和some time，it指工作处境发展。"],
];
export const translation2010PreferredContexts:Record<string,Record<string,SentenceWordContext>>={};
export const translation2010SourcePhraseGuides:Record<string,PhraseKnowledge>={};
export const translation2010SourcePhraseAliases:Record<string,string>={};
export const translation2010SourceCollocationGlosses:Record<string,{meaning:string;note:string}>={};
for(const[n,heads,expression,canonical,meaning,rule]of rows){const source=`2010-translation-s${n}`;const key=`sustainability-source-${expression.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`;translation2010SourcePhraseGuides[key]={key,canonical,type:"个人经历语篇结构",meaning,summary:rule,grammarRole:rule,structures:[{pattern:canonical,meaning,rule,examples:[{english:expression,chinese:meaning}]}],pitfalls:[]};translation2010SourcePhraseAliases[expression.toLowerCase()]=key;translation2010SourceCollocationGlosses[expression.toLowerCase()]={meaning,note:rule};for(const head of heads){const entry={...translation2010Lexicon[head],...translation2010SentenceContexts[source]?.[head],...translation2010ReviewedContexts[source]?.[head]};(translation2010PreferredContexts[source]??={})[head]={partOfSpeech:entry.partOfSpeech,contextualMeaning:entry.contextualMeaning,use:entry.use,preferredCollocations:[expression]};}}
