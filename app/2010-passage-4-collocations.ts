import type { SentenceWordContext } from "./contextual-vocabulary";
import type { PhraseKnowledge } from "./knowledge-base";
import { passage2010P4Lexicon } from "./2010-passage-4-lexicon";
import { passage2010P4ReviewedContexts } from "./2010-passage-4-contexts";
type Row=[string,string[],string,string,string,string];
const rows:Row[]=[
["s1",["regard","as","system"],"regard the jury system as a concrete expression of crucial democratic values","regard A as B","把陪审制度视为重要民主价值的具体体现","regard接对象A，as引出对A的评价B。"],
["s1",["meet","minimal","qualification"],"meet minimal qualifications of age and literacy","meet qualifications","达到年龄和读写方面的最低资格","meet作及物动词，接qualifications；of限定资格项目。"],
["s1",["competent","serve"],"competent to serve on juries","be competent to do something","有能力担任陪审员","competent为表语，to serve补充具体能力。"],
["s1",["select","randomly","representative","cross","section"],"selected randomly from a representative cross section of the community","select somebody from a representative cross section","从社区有代表性的各群体样本中随机选出","随机说明选择方式，代表性说明来源样本。"],
["s1",["deny","right"],"denied the right to serve on a jury","deny somebody the right to do something","被剥夺担任陪审员的权利","被动句中citizen为权利被剥夺的人；right接to serve说明权利内容。"],
["s1",["on","account"],"on account of race, religion, sex, or national origin","on account of something","因种族、宗教、性别或民族出身","此结构引原因或依据，no citizen should be denied否定据此排除。"],
["s1",["entitle","trial","peer"],"entitled to trial by their peers","be entitled to something","有权接受同侪审判","to为介词，trial为名词，by their peers说明审判者。"],
["s1",["letter","law","just"],"not just the letter of the law","not just something","不只是法律字面条文","not just保留法律条文，同时要求裁决体现社会良知。"],
["s2",["be","say","to"],"is also said to be","be said to be something","也被认为是","被动报道谓语接不定式，jury同时为be的逻辑主语。"],
["s2",["direct","rather","than","representative","democracy"],"direct rather than representative democracy","A rather than B","直接民主而非代议民主","两个形容词平行，共同限定democracy。"],
["s3",["take","turn","govern","themselves"],"take turns governing themselves","take turns doing something","轮流治理自己","governing为动名词，themselves回指citizens并作宾语。"],
["s3",["elect","representative","for","they"],"electing representatives to govern for them","elect somebody to do something","选出代表替自己治理","representatives是electing宾语和to govern的逻辑主语，them指公民。"],
["s4",["as","recently"],"as recently as in 1968","as recently as + time","甚至迟至1968年","强调理想与程序的不符持续到很近的历史时间。"],
["s4",["conflict","with","ideal"],"conflicted with these democratic ideals","conflict with something","与这些民主理想冲突","相冲突的两方是selection procedures与ideals。"],
["s5",["be","limit","to","person"],"was limited to persons of supposedly superior intelligence, education, and moral character","be limited to somebody / something","仅限于被认为智力、教育和道德品格优越的人","to为介词；of引品质限定，supposedly标示声称的优越性。"],
["s6",["as","early","case"],"as early as the 1880 case of Strauder v. West Virginia","as early as + time / event","早在1880年斯特劳德诉西弗吉尼亚州案中","as early as强调已有禁令的时间之早。"],
["s6",["practice","select","elite","blue-ribbon"],"the practice of selecting so-called elite or blue-ribbon juries","the practice of doing something","挑选所谓精英陪审团的做法","of后接动名词；elite与blue-ribbon并列限定juries。"],
["s6",["way","around","convenient"],"a convenient way around this and other antidiscrimination laws","a way around something","规避这项及其他反歧视法律的便利办法","around修饰way，说明规避对象。"],
["s7",["fail","to","regularly","include"],"failed to regularly include women on juries","fail to do something","未能常态化纳入女性陪审员","regularly修饰include，fail to说明该要求此前未实现。"],
["s7",["until","century","twentieth"],"until the mid-20th century","until + time","直到20世纪中叶","结合failed的否定含义理解常态化纳入的迟延。"],
["s8",["it","be","until","1940s"],"it was not until the 1940s","it was not until ... that ...","直到20世纪40年代才……","强调时间迟延，不抹掉1898年个别州的先例。"],
["s8",["make","eligible","for"],"made women eligible for jury duty","make somebody eligible for something","使女性具备陪审资格","women为宾语，eligible为形容词宾补，for说明资格事项。"],
["s9",["exempt","from","duty"],"exempted women from jury duty","exempt somebody from something","免除女性的陪审义务","豁免与禁止不同，后面的unless保留主动申请例外。"],
["s9",["have","name","include","on"],"have their names included on the jury list","have something done","让自己的名字被列入陪审员名单","names承受included动作，have不是完成时助动词。"],
["s10",["justify","by","claim","that"],"justified by the claim that women were needed at home","justify something by a claim that ...","以家中需要女性这一主张为做法辩护","that解释claim内容；保留这是谁的辩护而非作者价值判断。"],
["s10",["keep","unrepresentative","of"],"kept juries unrepresentative of women","keep something + adjective","使陪审团持续缺乏女性代表性","juries为宾语，unrepresentative为宾补，of women限定代表对象。"],
["s10",["through","1960s"],"through the 1960s","through + period","贯穿20世纪60年代","through表示贯穿时段，不是仅到1960年。"],
["s11",["pass","act"],"passed the Jury Selection and Service Act","pass an Act","通过陪审员遴选与服务法","pass指立法通过，Act是专门法律名称的中心词。"],
["s11",["usher","era","reform"],"ushering in a new era of democratic reforms for the jury","usher in a new era","开启陪审制度民主改革新时代","分词短语补充通过法案产生的结果。"],
["s12",["special","educational","requirement","federal"],"special educational requirements for federal jurors","requirements for somebody","对联邦陪审员的特殊教育要求","for限定适用人群，federal不可扩大成所有州层级。"],
["s12",["require","they","to","be","select"],"required them to be selected at random","require somebody to be done","要求他们被随机选出","them指federal jurors，to be selected为被动不定式。"],
["s12",["at","random"],"at random","at random","随机地","介词短语整体作选择方式状语，相当于randomly。"],
["s12",["cross","section","entire","community"],"a cross section of the entire community","a cross section of something","能代表整个社区各群体的样本","cross section为代表性样本，of说明它所代表的整体。"],
["s13",["requirement","that","be","representative"],"the requirement that juries be representative of all parts of the community","the requirement that somebody be ...","陪审团应代表社区所有群体的要求","that引内容从句，be用要求类虚拟原形；从句到community结束。"],
["s13",["extend","to","level"],"to the state level","extend a requirement to a level","扩展到州一级","句末to短语补足主句extended，越过that内容从句。"],
["s14",["declare","unconstitutional"],"declared sex discrimination in jury selection to be unconstitutional","declare A to be B","认定陪审员遴选中的性别歧视违宪","discrimination为宾语，to be unconstitutional为宾补。"],
["s14",["order","state","use"],"ordered states to use the same procedures for selecting male and female jurors","order somebody to do something","命令各州采用相同程序遴选男女陪审员","states为宾语兼to use的逻辑主语；for selecting说明程序用途。"],
["question-201036-option-B",["immune","from"],"immune from trial by their peers","be immune from something","免受同侪审判","immune from表达免受，方向不同于原文entitled to享有权利。"],
["question-201036-option-C",["impose","limit"],"no age limit should be imposed","impose a limit","不应设任何年龄限制","no的否定范围覆盖年龄限制，should be imposed为被动。"],
["question-201037-prompt",["prior","to"],"prior to 1968","prior to + time","1968年之前","prior to整体引时间，to后不是动词。"],
["question-201037-option-B",["discrimination","against","certain"],"discrimination against certain races","discrimination against somebody","针对某些种族的歧视","against引受歧视的群体，certain表示某些。"],
["question-201037-option-C",["conflict","ideal"],"conflicting ideals","conflicting ideals","相互冲突的理想","conflicting修饰ideals；这与程序违背理想是不同命题。"],
["question-201037-option-D",["common","among","arrogance"],"arrogance common among the Supreme Court judges","something common among a group","最高法院法官中常见的傲慢","common后置修饰arrogance，among限定出现该性质的群体。"],
["question-201038-option-B",["fall","far","short","of"],"fell far short of the required qualifications","fall short of something","远未达到所需资格","fall short of整体表不足，far强化程度，不是空间跌落。"],
["question-201038-option-C",["be","suppose","to","domestic"],"were supposed to perform domestic duties","be supposed to do something","被认为应承担家庭职责","表达当时的角色预设，不直接证明女性主观意愿。"],
["question-201038-option-D",["tend","evade","public"],"tended to evade public engagement","tend to do something","倾向于逃避公共事务参与","tend to后接不定式，evade表示主动躲避。"],
["question-201039-option-A",["have","abolish"],"had to be abolished","have to be done","必须被废除","had to表义务，be abolished表被动，并非过去完成时。"],
["question-201039-option-B",["become","less","rigid"],"became less rigid","become less + adjective","变得不那么严格","less修饰rigid，降低的是教育要求的严苛程度。"],
["question-201039-option-C",["representative","of","entire"],"representative of the entire community","be representative of something","能代表整个社区","of补足代表范围，不能取代议制的含义。"],
["question-201039-option-D",["conform","to"],"conform to the federal court","conform to something","遵从联邦法院","conform to为动词加介词，to后接名词。"],
["question-201040-prompt",["center","on"],"centers on","center on something","以某事为中心","centers为第三人称单数谓语，on后接主题。"],
];
export const passage2010P4PreferredContexts:Record<string,Record<string,SentenceWordContext>>={};
export const passage2010P4SourcePhraseGuides:Record<string,PhraseKnowledge>={};
export const passage2010P4SourcePhraseAliases:Record<string,string>={};
export const passage2010P4SourceCollocationGlosses:Record<string,{meaning:string;note:string}>={};
for(const[shortSource,heads,expression,canonical,meaning,rule]of rows){
 const source=shortSource.startsWith("s")?`2010-p4-${shortSource}`:shortSource;
 const key=`jury-source-${expression.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`;
 passage2010P4SourcePhraseGuides[key]={key,canonical,type:"陪审制度语篇结构",meaning,summary:rule,grammarRole:rule,structures:[{pattern:canonical,meaning,rule,examples:[{english:expression,chinese:meaning}]}],pitfalls:[]};
 passage2010P4SourcePhraseAliases[expression.toLowerCase()]=key;
 passage2010P4SourceCollocationGlosses[expression.toLowerCase()]={meaning,note:rule};
 for(const head of heads){const entry=passage2010P4ReviewedContexts[source]?.[head]??passage2010P4Lexicon[head];(passage2010P4PreferredContexts[source]??={})[head]={...(entry?{partOfSpeech:entry.partOfSpeech,contextualMeaning:entry.contextualMeaning,use:entry.use}:{}),preferredCollocations:[expression]};}
}
