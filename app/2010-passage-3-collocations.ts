import { passage2010P3Lexicon } from "./2010-passage-3-lexicon";
import type { PhraseKnowledge } from "./knowledge-base";
import type { SentenceWordContext } from "./contextual-vocabulary";
// 原文表达、可迁移结构和中文解释共同审定；只决定当前来源的优先搭配，不覆盖旧文章。
type Row=[source:string,heads:string[],expression:string,canonical:string,meaning:string,rule:string];
const rows:Row[]=[
["s1",["over","past","decade"],"Over the past decade","over the past + period","在过去某段时间里","over覆盖一个时段；原卷had perfected的过去参照点没有给出具体日期。"],
["s1",["many"],"many companies","many + plural noun","许多公司","many限定可数复数companies，不包含两倍的比较。"],
["s1",["consumer"],"among consumers","among + group","在消费者群体中","among限定creating涉及的人群范围，不表示消费者电子产品。"],
["s2",["help","company","earn"],"have helped companies earn billions of dollars","help somebody (to) do something","帮助企业赚取数十亿美元","companies是help的宾语，也是earn的执行者；省略to，不把earn当主句谓语。"],
["s2",["dollar","billion"],"billions of dollars","billions of + plural noun","数十亿美元","billions of为概数，dollars是货币单位，不是贬值货币的评价。"],
["s2",["wipe","counter"],"wipe counters","wipe + surface","擦台面","wipe为动作，counters为宾语；没有wipe out彻底消除的小品词。"],
["s2",["response","in","to"],"in response to a carefully designed set of daily cues","in response to something","响应一套精心设计的日常提示","to引反应对象，这里是触发消费动作的提示。"],
["s3",["there","be","problem"],"There are fundamental public health problems","there be + noun phrase","存在根本性的公共卫生问题","存在句的实义主语是复数problems，不是there。"],
["s3",["public","health"],"public health problems","public health + issue","公共卫生问题","public health共同限定问题领域。"],
["s3",["like","hand"],"like dirty hands","like + example","例如脏手","like作举例介词，dirty hands是卫生问题的例子。"],
["s3",["we","figure","out","how","change"],"we can't figure out how to change people's habits","figure out how to do something","我们弄不清怎样改变人们的习惯","figure out接疑问不定式；how问方法，change的宾语是习惯。"],
["s3",["say"],"said Dr. Curtis","said + speaker (reporting inversion)","柯蒂斯博士说","引语后的报道语倒装，said在主语前，不是被动据说。"],
["s4",["we","want","learn","private","industry","from"],"wanted to learn from private industry","learn from somebody / an organization","想向企业界学习","学习来源是企业，所学内容后由how to create说明。"],
["s4",["how","create","new","behavior"],"how to create new behaviors that happen automatically","how to create + behavior","如何培养会自动发生的新行为","that从句限定行为；培养自动行为是学习目标。"],
["s5",["turn"],"turned to","turn to somebody for help","向某人求助","关系代词that代表求助对象companies，在从句开头。"],
["s5",["invest","dollar","find"],"had invested hundreds of millions of dollars finding the subtle cues","invest money (in) doing something","此前投入数亿美元寻找细微提示","finding说明投入用途，没有found oneself at a loss结构。"],
["s5",["consumer","life","in"],"in consumers' lives","in somebody's life","在消费者生活中","说明提示存在的生活场景，不是生活方式的固定短语。"],
["s5",["corporation","use","introduce"],"corporations could use to introduce new routines","use something to introduce a routine","公司可利用其引入新惯例","use宾语为前置that所指的cues，to introduce给用途。"],
["s6",["look","hard","enough"],"look hard enough","verb + adverb + enough","观察得足够仔细","hard修饰look，enough放在副词后限定程度，不是look as though系表。"],
["s6",["find"],"you'll find that","find that + content clause","你会发现……","that引发现的内容，不是found oneself结构。"],
["s6",["many"],"many of the products","many of + definite plural noun","这些产品中的许多种","many作数量代词，of限定产品范围，不含倍数比较。"],
["s6",["we","use","every","day"],"we use every day","use something every day","我们每天使用","关系从句省略宾语关系词，products为use的语义宾语。"],
["s6",["wipe","disinfect"],"disinfecting wipes","disinfecting + product","消毒湿巾","wipes是产品名词，disinfecting说明用途，不是wipe out动词短语。"],
["s6",["result","manufacture"],"results of manufactured habits","results of something","人为塑造习惯的产物","results是表语名词，of说明来源；不是As a result衔接语。"],
["s7",["ago","century"],"A century ago","a period + ago","一百年前","相对于原文叙述当时向前回溯一百年。"],
["s7",["few","people"],"few people","few + plural noun","很少有人","few带否定数量意味，但不是没有任何人。"],
["s7",["time","a","day"],"multiple times a day","multiple times a + period","每天多次","times为次数，a为每，不是几倍大小比较。"],
["s8",["public","health","campaign"],"public health campaigns","public health campaigns","公共卫生宣传活动","和广告并列构成刷牙习惯的原因。"],
["s8",["many","american"],"many Americans","many + nationality noun in plural","许多美国人","仅限定群体的一部分，不是企业所有权的回答。"],
["s8",["give","white","scrub"],"give their pearly whites a cavity-preventing scrub","give somebody/something a scrub","给牙齿做一次防蛀清洁","牙齿是间接宾语，scrub为清洁这一直接宾语。"],
["s8",["twice","day"],"twice a day","twice a + period","每天两次","频率表达，不是twice as many数量比较。"],
["s8",["with","one","brand"],"with Colgate, Crest or one of the other brands","with + product / tool","用高露洁、佳洁士或其他某种品牌产品","with表工具，one of在其他品牌中选择一种，没有with+doing复合结构。"],
["s9",["few","decade","ago"],"A few decades ago","a few + periods + ago","几十年前","a few为肯定的若干个，decade一个为十年。"],
["s9",["many","people"],"many people","many people","许多人","people是复数群体，不是特指the person concerned。"],
["s9",["do","drink"],"didn't drink water outside of a meal","do not + verb + range restriction","在用餐之外不喝水","did承担过去时，not否定限定时段的饮水，不是完全不喝水。"],
["s10",["production","spring"],"the production of far-off springs","the production of + source","远方泉眼产出的水","production在这里是产出物，由springs确定为泉水，不是农业生产。"],
["s11",["once","buy"],"once bought primarily by adolescent boys","once + past participle + by somebody","曾主要由青春期男孩购买","once为曾经，bought是修饰gum的分词；不是once again再次。"],
["s11",["for","use","after"],"for use after a meal","for use after + event","供饭后使用","use是名词，after接meal限制其时间，不涉及二战结束。"],
["s12",["between","brush","put","on"],"between hair brushing and putting on makeup","between A and B","在梳头与化妆之间","A和B都是名词性活动，说明程序顺序；put on makeup为化妆。"],
["s13",["succeed","become","pattern"],"products succeed when they become part of daily or weekly patterns","succeed when + condition","产品融入每天或每周惯例时成功","when限定成功条件，part of说明纳入已有生活程序。"],
["s13",["say"],"said Carol Berning","said + speaker (reporting inversion)","卡罗尔·伯宁说","引语后倒装报道语，主语为伯宁。"],
["s13",["consumer","psychologist"],"a consumer psychologist","consumer psychologist","消费心理学家","consumer作名词定语说明研究领域，不是consumer electronics。"],
["s13",["last","year"],"last year","last + time period","上一年","修饰公司销售，参照原文叙述当时，不自动更新为当前上一年。"],
["s14",["positive","create"],"Creating positive habits","create positive habits","培养积极有益的习惯","positive为企业受访者对习惯的评价，不能套用数字鸿沟话题。"],
["s14",["consumer","life","our"],"improving our consumers' lives","improve somebody's life","改善我们消费者的生活","our限定consumers，消费者所有格再限定lives。"],
["s14",["make","commercially","viable"],"making new products commercially viable","make + object + adjective complement","使新产品在商业上可行","products是宾语，viable是宾补，commercially修饰viable。"],
["s15",["like","scientist"],"social scientists like Dr. Berning","a class of people + like + example","伯宁博士这样的社会科学家","like为举例介词，不是外貌相像或喜欢。"],
["s15",["learn","have"],"have learned that there is power","learn that + content clause","已了解到这一机制有效","that引所获知识内容，不是learn to be quick-witted。"],
["s15",["there","be","power","in"],"there is power in tying certain behaviors to habitual cues","there is power in doing something","把某些行为与惯常提示绑定具有影响力","存在句的实义主语为power，in doing说明效力所在。"],
["s15",["certain"],"certain behaviors","certain + plural noun","某些特定行为","certain作不确定数量限定，不是almost certain death的确信程度。"],
["s16",["science","new","habit"],"this new science of habit","the science of + subject","这门新兴的习惯科学","of引出研究对象，science为单数学科名词。"],
["question-201031-prompt",["like","hand","wash","with"],"hand washing with soap","wash hands with soap","用肥皂洗手","hand限定washing，with说明工具材料。"],
["question-201031-option-A",["further","cultivate"],"should be further cultivated","should be further + past participle","应当得到进一步培养","should表示建议，be cultivated为被动，further表示程度推进。"],
["question-201031-option-B",["change"],"should be changed gradually","should be + past participle + adverb","应当被逐渐改变","changed是被动谓语的一部分，gradually限定改变进程。"],
["question-201031-option-C",["history","root"],"are deeply rooted in history","be rooted in something","深深植根于历史","in引出根基所在，不代表原文已认可该陈述。"],
["question-201031-option-D",["private","concern"],"private concerns","private concerns","私人事务","concerns为名词复数，private说明私人性质，不是企业私营。"],
["question-201032-prompt",["so","as","to"],"so as to","so as to do something","为了做某事","后接原形动词，问作者举例目的。"],
["question-201032-option-A",["impact"],"their impact on people's habits","impact on something","它们对人们习惯的影响","impact是名词，on引影响对象，their指三个产品。"],
["question-201032-option-B",["need"],"the urgent need of daily necessities","the need of something","对日用品的迫切需求","need作名词，被urgent修饰，不是不定式need to do。"],
["question-201032-option-C",["buy","power"],"people's buying power","buying power","人们的购买力","power在此为经济购买能力，与正文机制的影响力分开。"],
["question-201032-option-D",["good","habit"],"good habits","good habits","良好习惯","good是修饰habits的形容词，不是生活富裕better off。"],
["question-201033-prompt",["do","belong","to"],"does NOT belong to products","belong to a category","不属于产品类别","does承载疑问及否定，belong用原形，to为介词。"],
["question-201033-prompt",["help","create"],"help create people's habits","help (to) do something","有助形成人们的习惯","help后接省to不定式，没有help somebody do中的明示人物宾语。"],
["question-201034-prompt",["we","know"],"we know that","know that + content clause","我们知道……","that引陈述内容，we泛指读者。"],
["question-201034-prompt",["some","consumer"],"some of consumers' habits","some of + defined set","消费者的一部分习惯","保留some的范围限制，不是some of which关系结构。"],
["question-201034-prompt",["due","to"],"due to","due to + cause","由于某原因","to后接名词原因，区别be due to do预定做某事。"],
["question-201035-option-C",["positive"],"positive","positive attitude","正面态度","选项形容词补全题干is后表语，不修饰forces。"],
];
export const passage2010P3PreferredContexts:Record<string,Record<string,SentenceWordContext>>={};
export const passage2010P3SourcePhraseGuides:Record<string,PhraseKnowledge>={};
export const passage2010P3SourcePhraseAliases:Record<string,string>={};
export const passage2010P3SourceCollocationGlosses:Record<string,{meaning:string;note:string}>={};
for(const [shortSource,heads,expression,canonical,meaning,rule] of rows){
  const source=shortSource.startsWith("s")?`2010-p3-${shortSource}`:shortSource;
  const key=`habit-source-${expression.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`;
  passage2010P3SourcePhraseGuides[key]={key,canonical,type:"消费习惯语篇结构",meaning,summary:rule,grammarRole:rule,structures:[{pattern:canonical,meaning,rule,examples:[{english:expression,chinese:meaning}]}],pitfalls:[]};
  passage2010P3SourcePhraseAliases[expression.toLowerCase()]=key;
  passage2010P3SourceCollocationGlosses[expression.toLowerCase()]={meaning,note:rule};
  for(const head of heads){
    const entry=passage2010P3Lexicon[head];
    (passage2010P3PreferredContexts[source]??={})[head]={ ...(entry ? {partOfSpeech:entry.partOfSpeech,contextualMeaning:entry.contextualMeaning,use:rule}:{}), preferredCollocations:[expression] };
  }
}
