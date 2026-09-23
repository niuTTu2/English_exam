import {reviewedLexicon,reviewedPhrases,type LexiconRow,type PhraseRow} from './2011-content-helpers';
import type {SentenceWordContext} from './contextual-vocabulary';
const rows:LexiconRow[]=[
 [
  "versus",
  "",
  "prep.",
  "对；与……相对",
  "连接man和machine，表示两者之间的竞争或对立。",
  "man versus machine（人与机器对抗）",
  ""
 ],
 [
  "acutely",
  "",
  "adv.",
  "强烈地；尖锐地",
  "most acutely felt表示感受最为强烈。",
  "be acutely aware（强烈意识到）",
  ""
 ],
 [
  "downturn",
  "downturns",
  "n.",
  "衰退；下降期",
  "economic downturn指经济活动下滑的时期。",
  "an economic downturn（经济衰退）",
  ""
 ],
 [
  "fragile",
  "",
  "adj.",
  "脆弱的；不稳固的",
  "修饰recoveries，说明复苏尚不稳固。",
  "a fragile recovery（脆弱的复苏）",
  ""
 ],
 [
  "recovery",
  "recoveries",
  "n.",
  "复苏；恢复",
  "经济经历衰退后的恢复阶段。",
  "economic recovery（经济复苏）",
  ""
 ],
 [
  "mistake",
  "mistakes",
  "n.",
  "错误",
  "it would be a mistake to think表示这样想是错误的。",
  "make a mistake（犯错误）",
  ""
 ],
 [
  "bust",
  "busts",
  "n.",
  "萧条；崩溃",
  "boom and bust指经济繁荣与萧条交替。",
  "a boom and bust cycle（繁荣与萧条周期）",
  ""
 ],
 [
  "outmode",
  "outmodes outmoded outmoding",
  "v.",
  "使过时；淘汰",
  "outmoded by machines说明工作因机器而被淘汰。",
  "be outmoded by technology（被技术淘汰）",
  ""
 ],
 [
  "technology",
  "technologies",
  "n.",
  "技术",
  "全文指自动化和机器技术。",
  "advances in technology（技术进步）",
  ""
 ],
 [
  "appetite",
  "appetites",
  "n.",
  "欲望；胃口",
  "以胃口比喻技术不断吞噬岗位的趋势。",
  "an appetite for growth（对增长的强烈欲望）",
  ""
 ],
 [
  "foresee",
  "foresees foresaw foreseen foreseeing",
  "v.",
  "预见",
  "cannot immediately foresee说明无法马上预知重塑方式。",
  "foresee a change（预见变化）",
  ""
 ],
 [
  "automation",
  "",
  "n.",
  "自动化",
  "用机器或自动系统完成原由人承担的任务。",
  "immune from automation（不受自动化影响）",
  ""
 ],
 [
  "threaten",
  "threatens threatened threatening",
  "v.",
  "威胁；使面临危险",
  "become threatened说明岗位开始面临自动化威胁。",
  "threaten jobs（威胁就业）",
  ""
 ],
 [
  "attract",
  "attracts attracted attracting",
  "v.",
  "吸引",
  "attract attention表示引起关注。",
  "attract attention（引起关注）",
  ""
 ],
 [
  "erik",
  "",
  "proper n.",
  "埃里克",
  "作者Brynjolfsson的名字。",
  "Erik Brynjolfsson（埃里克·布林约尔松）",
  ""
 ],
 [
  "mcafee",
  "",
  "proper n.",
  "麦卡菲",
  "《与机器赛跑》的作者姓氏。",
  "Andrew McAfee（安德鲁·麦卡菲）",
  ""
 ],
 [
  "hail",
  "hails hailed hailing",
  "v.",
  "来自；出生于",
  "hail from说明两位作者来自MIT的研究中心。",
  "hail from a university（来自一所大学）",
  ""
 ],
 [
  "mit",
  "mit's",
  "proper n.",
  "麻省理工学院",
  "MIT是Massachusetts Institute of Technology的缩写。",
  "MIT's Center for Digital Business（麻省理工数字商业中心）",
  ""
 ],
 [
  "scary",
  "scarier scariest",
  "adj.",
  "令人害怕的",
  "形容技术淘汰岗位的论点令人担忧。",
  "a scary prospect（令人担忧的前景）",
  ""
 ],
 [
  "john",
  "",
  "proper n.",
  "约翰",
  "Hagel的名字。",
  "John Hagel（约翰·哈格尔）",
  ""
 ],
 [
  "hagel",
  "",
  "proper n.",
  "哈格尔",
  "文中提出岗位设计观点的作者姓氏。",
  "John Hagel（约翰·哈格尔）",
  ""
 ],
 [
  "pull",
  "",
  "n.",
  "拉力",
  "书名The Power of Pull中的名词。",
  "The Power of Pull（《拉力》）",
  ""
 ],
 [
  "miss",
  "misses missed missing",
  "v.",
  "没有抓住；错过",
  "miss the reason表示未抓住真正原因。",
  "miss the point（没有抓住要点）",
  ""
 ],
 [
  "tightly",
  "",
  "adv.",
  "严格地；紧密地",
  "tightly scripted指严格照预设脚本执行。",
  "tightly controlled（严格控制）",
  ""
 ],
 [
  "script",
  "scripts scripted scripting",
  "v.",
  "为……编写脚本；预先规定",
  "tightly scripted说明工作步骤被严格预设。",
  "a scripted task（按脚本执行的任务）",
  ""
 ],
 [
  "standardize",
  "standardizes standardized standardizing",
  "v.",
  "使标准化",
  "highly standardized说明工作流程高度统一。",
  "standardized procedures（标准化流程）",
  ""
 ],
 [
  "type",
  "types",
  "n.",
  "类型；种类",
  "the types of jobs指具有上述特点的工作类别。",
  "a type of job（一类工作）",
  ""
 ],
 [
  "being",
  "beings",
  "n.",
  "生物；人",
  "human beings表示人类个体，与machines比较。",
  "human beings（人类）",
  ""
 ],
 [
  "giant",
  "",
  "adj.",
  "巨大的",
  "修饰target sign，强化工人成为明显目标的比喻。",
  "a giant target（巨大的目标）",
  ""
 ],
 [
  "target",
  "targets",
  "n.",
  "目标；靶子",
  "target sign比喻工人成为机器替代的对象。",
  "a target for replacement（被替代的目标）",
  ""
 ],
 [
  "back",
  "backs",
  "n.",
  "背部；后背",
  "on the backs of workers构成靶标比喻。",
  "on one's back（在某人背上）",
  ""
 ],
 [
  "reinvent",
  "reinvents reinvented reinventing",
  "v.",
  "彻底改造；重新设计",
  "要求重新设计工作的开展模式。",
  "reinvent the workplace（重塑工作场所）",
  ""
 ],
 [
  "formula",
  "formulas formulae",
  "n.",
  "模式；方案",
  "本文指工作如何开展的既有模式，不是数学公式。",
  "a formula for success（成功模式）",
  ""
 ],
 [
  "conduct",
  "conducts conducted conducting",
  "v.",
  "开展；实施",
  "how work is conducted表示工作如何开展。",
  "conduct research（开展研究）",
  ""
 ],
 [
  "rely",
  "relies relied relying",
  "v.",
  "依赖；依靠",
  "rely on后接仍在沿用的20世纪工作观念。",
  "rely on an old model（依赖旧模式）",
  ""
 ],
 [
  "exercise",
  "exercises exercised exercising",
  "v.",
  "运用；发挥",
  "exercise imagination表示发挥想象力，不是锻炼身体。",
  "exercise judgment（运用判断力）",
  ""
 ],
 [
  "respond",
  "responds responded responding",
  "v.",
  "回应；应对",
  "respond to unexpected events表示应对意外事件。",
  "respond to change（应对变化）",
  ""
 ],
 [
  "unexpected",
  "",
  "adj.",
  "意外的；未预料的",
  "修饰events，与机器擅长的predictable活动对比。",
  "unexpected events（意外事件）",
  ""
 ],
 [
  "event",
  "events",
  "n.",
  "事件",
  "指工作中没有预先计划的情况。",
  "respond to events（应对事件）",
  ""
 ],
 [
  "predictable",
  "",
  "adj.",
  "可预测的",
  "机器被设计执行规律明确的活动。",
  "predictable activities（可预测的活动）",
  ""
 ],
 [
  "touch",
  "touches touched touching",
  "v.",
  "谈及；涉及",
  "touch on整体表示简要谈到某一点。",
  "touch on a topic（谈及一个话题）",
  ""
 ],
 [
  "reframe",
  "reframes reframed reframing",
  "v.",
  "重新表述；重新界定",
  "把against the machine重新界定为with the machine。",
  "reframe a problem（重新界定问题）",
  ""
 ],
 [
  "augment",
  "augments augmented augmenting",
  "v.",
  "增强；扩大",
  "机器应增强human labor的能力，而非取代人。",
  "augment human ability（增强人的能力）",
  ""
 ],
 [
  "innovate",
  "innovates innovated innovating",
  "v.",
  "创新；革新",
  "宾语是institutions和work practices。",
  "innovate work practices（革新工作实践）",
  ""
 ],
 [
  "institution",
  "institutions",
  "n.",
  "制度；机构",
  "本文指组织就业和工作的制度安排。",
  "social institutions（社会制度）",
  ""
 ],
 [
  "vs",
  "",
  "prep. abbreviation",
  "对；与……相对",
  "versus的缩写，用于题目选项中的man vs. machine。",
  "man vs. machine（人与机器对抗）",
  ""
 ],
 [
  "provoke",
  "provokes provoked provoking",
  "v.",
  "引发；激起",
  "选项声称衰退引发技术革命。",
  "provoke a crisis（引发危机）",
  ""
 ],
 [
  "accelerate",
  "accelerates accelerated accelerating",
  "v.",
  "加快；促进",
  "选项声称自动化加快技术发展。",
  "accelerate development（加快发展）",
  ""
 ],
 [
  "intact",
  "",
  "adj.",
  "完整无损的；未受影响的",
  "remain intact表示自动化后仍不受影响。",
  "remain intact（保持不变）",
  ""
 ],
 [
  "perform",
  "performs performed performing",
  "v.",
  "执行；完成",
  "机器或人完成工作和活动。",
  "perform a task（执行任务）",
  ""
 ],
 [
  "mind",
  "minds",
  "n.",
  "有才智的人；头脑",
  "innovative minds指具有创新思维的人。",
  "an innovative mind（有创新思维的人）",
  ""
 ],
 [
  "predictability",
  "",
  "n.",
  "可预测性",
  "题目选项概括机器行为是否可预测。",
  "the predictability of behavior（行为的可预测性）",
  ""
 ],
 [
  "efficiently",
  "",
  "adv.",
  "高效地",
  "题目选项给工作开展加上效率限定。",
  "work efficiently（高效工作）",
  ""
 ],
 [
  "stimulate",
  "stimulates stimulated stimulating",
  "v.",
  "刺激；促进",
  "选项声称经济衰退促进创新。",
  "stimulate innovation（促进创新）",
  ""
 ],
 [
  "insatiable",
  "",
  "adj.",
  "无法满足的；贪得无厌的",
  "修饰appetite，比喻技术持续吞噬岗位。",
  "an insatiable appetite（永不满足的胃口）",
  ""
 ],
 [
  "involvement",
  "",
  "n.",
  "参与；介入",
  "题目概括工作场所仍需人的参与。",
  "human involvement（人的参与）",
  ""
 ],
 [
  "brynjolfsson",
  "",
  "proper n.",
  "布林约尔松",
  "《与机器赛跑》的作者姓氏。",
  "Erik Brynjolfsson（埃里克·布林约尔松）",
  ""
 ]
];
const lex=reviewedLexicon(rows);export const lexicon=lex.entries;export const aliases=lex.aliases;
export const sentenceContexts:Record<string,Record<string,SentenceWordContext>>={};
export const formContexts:Record<string,Record<string,SentenceWordContext>>={};
Object.assign(aliases,{downturns:'downturn',recoveries:'recovery',outmoded:'outmode',threatened:'threaten',attracted:'attract',"mit's":'mit',scripted:'script',standardized:'standardize',types:'type',beings:'being',backs:'back',conducted:'conduct',relying:'rely',events:'event',touched:'touch',institutions:'institution',accelerating:'accelerate',performed:'perform',minds:'mind'});
const defaults:Record<string,SentenceWordContext>={
concept:{partOfSpeech:'n.',contextualMeaning:'观念；概念',use:'the concept of引出人机对抗这一观念。'},man:{partOfSpeech:'n.',contextualMeaning:'人类；人',use:'man versus machine中man泛指人类，不限男性。'},machine:{partOfSpeech:'n.',contextualMeaning:'机器',use:'全文作为自动化技术的执行主体，与human beings对比。'},industrial:{partOfSpeech:'adj.',contextualMeaning:'工业的',use:'industrial revolution指工业革命。'},revolution:{partOfSpeech:'n.',contextualMeaning:'革命；重大变革',use:'首句是工业革命，题目错误项是技术革命。'},phenomenon:{partOfSpeech:'n.',contextualMeaning:'现象',use:'回指人机竞争及技术淘汰岗位的现象。'},economic:{partOfSpeech:'adj.',contextualMeaning:'经济的',use:'修饰衰退、复苏和经济环境。'},cycle:{partOfSpeech:'n.',contextualMeaning:'周期',use:'boom and bust cycle指繁荣萧条交替。'},side:{partOfSpeech:'n.',contextualMeaning:'方面；一面',use:'the painful side指经济周期痛苦的一面。'},certain:{partOfSpeech:'adj.',contextualMeaning:'某些；特定的',use:'只限定部分岗位，不扩大到全部工作。'},go:{partOfSpeech:'v.',contextualMeaning:'消失（go away）',use:'have gone away说明岗位已经消失。'},good:{partOfSpeech:'n.',contextualMeaning:'for good中的组成作用',use:'for good整体表示永久，不表示好处。'},eat:{partOfSpeech:'v.',contextualMeaning:'吞噬；大量消耗',use:'eating up human jobs比喻技术消除人的岗位。'},human:{partOfSpeech:'adj.',contextualMeaning:'人类的',use:'修饰jobs、beings或labor，强调属于人的工作和劳动。'},job:{partOfSpeech:'n.',contextualMeaning:'工作；岗位',use:'全文核心对象是可能被机器淘汰或重塑的岗位。'},restructure:{partOfSpeech:'v.',contextualMeaning:'重塑；重组',use:'技术将继续改变经济结构。'},economy:{partOfSpeech:'n.',contextualMeaning:'经济；经济体系',use:'指就业和生产活动构成的经济。'},way:{partOfSpeech:'n.',contextualMeaning:'方式',use:'ways后由定语从句说明重塑或增强劳动的具体方式。'},price:{partOfSpeech:'n.',contextualMeaning:'价格；成本',use:'technology的price improvement指同等能力的成本更有利。'},performance:{partOfSpeech:'n.',contextualMeaning:'性能；表现',use:'technology的performance指技术完成任务的能力。'},immune:{partOfSpeech:'adj.',contextualMeaning:'不受影响的；免疫的',use:'be immune from automation表示被认为不会受到自动化影响。'},argument:{partOfSpeech:'n.',contextualMeaning:'论点；主张',use:'指技术正在淘汰岗位这一观点。'},attention:{partOfSpeech:'n.',contextualMeaning:'关注；注意',use:'attract attention表示引起广泛关注。'},via:{partOfSpeech:'prep.',contextualMeaning:'通过；凭借',use:'说明论点因该书成功而受关注的途径。'},success:{partOfSpeech:'n.',contextualMeaning:'成功',use:'the success of the book指该书取得成功。'},book:{partOfSpeech:'n.',contextualMeaning:'书；著作',use:'指两本讨论工作与机器的著作。'},center:{partOfSpeech:'n.',contextualMeaning:'中心；研究中心',use:'MIT的数字商业研究中心。'},digital:{partOfSpeech:'adj.',contextualMeaning:'数字化的',use:'修饰Business，是中心名称的一部分。'},business:{partOfSpeech:'n.',contextualMeaning:'商业；企业活动',use:'Center for Digital Business中的研究领域。'},powerful:{partOfSpeech:'adj.',contextualMeaning:'有力的；有说服力的',use:'评价论点影响力强。'},vulnerable:{partOfSpeech:'adj.',contextualMeaning:'易受伤害的；脆弱的',use:'vulnerable to technology说明岗位易被技术替代。'},reason:{partOfSpeech:'n.',contextualMeaning:'原因',use:'why从句说明Hagel认为被忽略的根本原因。'},first:{partOfSpeech:'adj./adv.',contextualMeaning:'最初；第一',use:'in the first place整体表示从一开始、究竟。'},design:{partOfSpeech:'v.',contextualMeaning:'设计',use:'have designed jobs说明人为塑造岗位结构。'},tend:{partOfSpeech:'v.',contextualMeaning:'往往；倾向于',use:'tend to be说明常见特征，不表示所有岗位都如此。'},highly:{partOfSpeech:'adv.',contextualMeaning:'高度地',use:'修饰standardized，强调标准化程度。'},one:{partOfSpeech:'pron.',contextualMeaning:'前述同类事物',use:'ones代替jobs；a scary one中的one代替argument。'},leave:{partOfSpeech:'v.',contextualMeaning:'留下',use:'leave no room for表示不给某能力留下空间。'},room:{partOfSpeech:'n.',contextualMeaning:'空间；余地',use:'no room for在抽象意义上表示没有发挥机会。'},individual:{partOfSpeech:'adj.',contextualMeaning:'个人的；个体的',use:'修饰initiative，强调个人主动性。'},initiative:{partOfSpeech:'n.',contextualMeaning:'主动性；主动行动',use:'leave no room for与take initiative分别表示压制和发挥主动性。'},creativity:{partOfSpeech:'n.',contextualMeaning:'创造力',use:'与initiative并列，构成人类工作的优势。'},short:{partOfSpeech:'adj.',contextualMeaning:'in short中的组成作用',use:'In short整体表示简言之，用于总结。'},better:{partOfSpeech:'adv.',contextualMeaning:'更好地',use:'much better at比较机器和人的任务表现。'},worker:{partOfSpeech:'n.',contextualMeaning:'工人；劳动者',use:'American workers是可能被机器替代的劳动者。'},time:{partOfSpeech:'n.',contextualMeaning:'时候；时机',use:"It's time to表示该做某事了。"},work:{partOfSpeech:'n.',contextualMeaning:'工作；工作方式',use:'how work is conducted及notion of work讨论工作制度。'},notion:{partOfSpeech:'n.',contextualMeaning:'观念；看法',use:'20th century notion of work指过时的工作观。'},rapidly:{partOfSpeech:'adv.',contextualMeaning:'迅速地',use:'修饰changing，说明经济变化速度。'},workplace:{partOfSpeech:'n.',contextualMeaning:'工作场所；职场',use:'需要能主动应对意外的人参与工作。'},imagination:{partOfSpeech:'n.',contextualMeaning:'想象力',use:'exercise imagination表示发挥想象力。'},note:{partOfSpeech:'v.',contextualMeaning:'指出；提到',use:'As Hagel notes引出Hagel的提示。'},indeed:{partOfSpeech:'adv.',contextualMeaning:'确实；的确',use:'承认两位作者实际上也谈到该点。'},point:{partOfSpeech:'n.',contextualMeaning:'要点；观点',use:'this point指人机应协作而非简单替代。'},race:{partOfSpeech:'n.',contextualMeaning:'竞赛；竞争',use:'比喻人与机器之间的竞争或协作关系。'},against:{partOfSpeech:'prep.',contextualMeaning:'与……对抗',use:'race against the machine强调竞争。'},with:{partOfSpeech:'prep.',contextualMeaning:'与……一起；同……协作',use:'race with the machine强调合作。'},labor:{partOfSpeech:'n.',contextualMeaning:'劳动；劳动力',use:'human labor指人的劳动和能力。'},replace:{partOfSpeech:'v.',contextualMeaning:'取代；替换',use:'rather than排除机器完全取代人类劳动。'},problem:{partOfSpeech:'n.',contextualMeaning:'问题',use:'末句重新界定真正需要解决的问题。'},rather:{partOfSpeech:'adv.',contextualMeaning:'而是；更确切地说',use:'but rather与rather than分别纠正焦点和排除替代。'},practice:{partOfSpeech:'n.',contextualMeaning:'实践；做法',use:'work practices指组织和开展工作的具体做法。'},
ease:{partOfSpeech:'v.',contextualMeaning:'缓和；减轻',use:'题目错误项声称衰退会缓和人机竞争。'},highlight:{partOfSpeech:'v.',contextualMeaning:'凸显；突出',use:'正确概括most acutely felt。'},painful:{partOfSpeech:'adj.',contextualMeaning:'痛苦的',use:'原文修饰经济周期的一面，错误项把它移到技术革命。'},current:{partOfSpeech:'adj.',contextualMeaning:'当前的',use:'错误项修饰economic structure。'},structure:{partOfSpeech:'n.',contextualMeaning:'结构',use:'current economic structure是题目选项表达。'},diminish:{partOfSpeech:'v.',contextualMeaning:'减少；削弱',use:'概括技术减少就业机会。'},opportunity:{partOfSpeech:'n.',contextualMeaning:'机会',use:'job opportunities指就业机会。'},remain:{partOfSpeech:'v.',contextualMeaning:'保持；仍然是',use:'remain intact表示保持不受影响。'},finally:{partOfSpeech:'adv.',contextualMeaning:'最终；终于',use:'错误项加入人最终获胜。'},innovative:{partOfSpeech:'adj.',contextualMeaning:'创新的',use:'innovative minds指具有创新思维的人。'},style:{partOfSpeech:'n.',contextualMeaning:'风格',use:'individual style与原文高度标准化相冲突。'},clear:{partOfSpeech:'adj.',contextualMeaning:'明确的；清楚的',use:'错误项给target增加明确这一限定。'},behavior:{partOfSpeech:'n.',contextualMeaning:'行为',use:'machine behavior指机器在实践中的行为。'},necessity:{partOfSpeech:'n.',contextualMeaning:'必要性',use:'the necessity of human involvement表示人的参与不可缺少。'},appropriate:{partOfSpeech:'adj.',contextualMeaning:'合适的；恰当的',use:'most appropriate title要求选择最能覆盖全文的标题。'},title:{partOfSpeech:'n.',contextualMeaning:'标题',use:'题目询问全文最佳标题。'},
};
for(const[key,value]of Object.entries(defaults))lexicon[key]={...(lexicon[key]??{specialForms:[],collocations:[],examSynonyms:[]}),...value};
const put=(id:string,key:string,pos:string,meaning:string,use:string)=>{(sentenceContexts[id]??={})[key]={partOfSpeech:pos,contextualMeaning:meaning,use};};
for(const[id,key,pos,meaning,use]of [
['2014-p3-s1','as','adv./conj.','和……一样（比较）','as old as连接同级比较，第二个as引出比较基准。'],
['2014-p3-s1','be','aux.','构成被动语态','be felt表示这种现象被人们感受到。'],
['2014-p3-s1','feel','v.','感受到','felt是过去分词，与be构成被动。'],
['2014-p3-s2','it','pron.','形式主语','真正主语是to think后的整件事。'],
['2014-p3-s2','right','adv.','正好；就在','right now整体强调眼下。'],
['2014-p3-s3','have','aux.','构成完成时','have gone说明岗位已经消失。'],
['2014-p3-s3','by','prep.','由；被','引出淘汰岗位的动作执行者machines。'],
['2014-p3-s4','since','conj.','因为；由于','引出技术持续重塑经济的原因。'],
['2014-p3-s4','such','det.','如此的；这样的','such an...结构强调胃口无法满足。'],
['2014-p3-s4','up','adv.','eat up中的组成作用','与eat构成吞噬、耗尽。'],
['2014-p3-s5','there','existential marker','有；存在','there is引出技术价格和性能的改善。'],
['2014-p3-s5','that','relative pron.','引导定语从句','回指jobs，在从句中作thought的主语。'],
['2014-p3-s5','be','aux./v.','构成被动或连接状态','were thought为被动，to be immune连接jobs与immune，become threatened也连接状态。'],
['2014-p3-s5','from','prep.','不受……影响（immune from）','immune from整体引出不受影响的对象automation。'],
['2014-p3-s6','by','prep.','由；被（作者关系）','by短语说明书的两位作者。'],
['2014-p3-s6','who','relative pron.','引导定语从句，指人','回指两位作者，作hail的主语。'],
['2014-p3-s7','one','pron.','一个同类事物','代替argument，表示也是一个令人害怕的论点。'],
['2014-p3-s8','why','relative adv.','为什么（修饰原因）','why从句说明reason的具体内容。'],
['2014-p3-s8','so','adv.','如此；这么','修饰vulnerable的程度。'],
['2014-p3-s8','to','prep.','对；受……影响','vulnerable to引出造成威胁的technology。'],
['2014-p3-s9','one','pron.','前述同类事物','ones代替jobs，两个that从句继续限定这些岗位。'],
['2014-p3-s9','that','relative pron.','引导定语从句','两处that均回指ones，即jobs。'],
['2014-p3-s10','at','prep.','在……方面','be better at引出机器更擅长完成的工作类型。'],
['2014-p3-s10','than','conj./prep.','比','引出比较对象human beings。'],
['2014-p3-s11','that','pron.','那；那种做法（指代）','回指前两句所说的脚本化、标准化岗位设计。'],
['2014-p3-s11','how','adv.','正是这样；以这种方式','说明工人成为靶标的形成方式。'],
['2014-p3-s12','it','pron.','形式主语','真正内容是to reinvent the formula。'],
['2014-p3-s12','how','relative adv.','如何；……的方式','how work is conducted说明formula的内容。'],
['2014-p3-s12','since','conj.','因为；由于','引出需要重新设计工作的原因。'],
['2014-p3-s12','on','prep.','依靠；依赖（rely on）','与rely构成依赖，引出旧工作观。'],
['2014-p3-s13','more','adv.','更加（more than ever）','与than ever共同修饰need。'],
['2014-p3-s13','who','relative pron.','引导定语从句，指人','回指people，说明所需员工能力。'],
['2014-p3-s13','take','v.','采取；发挥','take initiative整体表示主动行动。'],
['2014-p3-s13','to','infinitive marker','引出目的','to respond说明发挥想象力的目的。'],
['2014-p3-s14','that','pron.','那件事（指代）','回指运用主动性和想象力应对意外。'],
['2014-p3-s14','at','prep.','在……方面；对','be good at引出擅长的事情。'],
['2014-p3-s15','be','aux.','构成被动语态','are designed表示机器被设计用于某种任务。'],
['2014-p3-s16','as','conj.','正如','引出Hagel所指出的内容。'],
['2014-p3-s16','on','prep.','touch on中的组成作用','与touch构成谈及。'],
['2014-p3-s16','this','det.','这一；这个（指示限定）','限定point，回指人机协作观点。'],
['2014-p3-s17','as','prep.','作为；重新界定为','reframe A as B引出新的定义。'],
['2014-p3-s18','which','relative pron.','引导定语从句','与in连用修饰ways，在从句中作方式状语。'],
['2014-p3-s18','it','pron.','它；指代','回指human labor，作replace宾语。'],
['2014-p3-s19','how','interrogative adv.','如何','引出直接疑问，询问创新方法。'],
['question-201431-prompt','according','prep. phrase component','根据','according to整体引出判断依据。'],
['question-201435-prompt','which','interrogative pron.','哪一个；哪一项','询问四个标题选项中的哪一项。'],
] as string[][])put(id,key,pos,meaning,use);
const phraseRows:PhraseRow[]=[
['at-least-as-old-as','at least as old as','at least as + adjective + as','同级比较','至少和……一样古老','at least限定比较下限；两个as构成同级比较。','The idea is at least as old as the industrial revolution.','这一观念至少和工业革命一样古老。','不能把old as拆成先后关系。'],
['boom-and-bust-cycle','a boom and bust cycle','a boom and bust cycle','经济表达','繁荣与萧条周期','boom与bust表示经济扩张和收缩的交替。','The industry went through a boom and bust cycle.','这个行业经历了繁荣与萧条周期。','本文否定问题只是普通经济周期的一面。'],
['for-good','for good','for good','固定习语','永久地；一去不复返地','说明工作岗位已经永久消失。','Some jobs have disappeared for good.','有些工作岗位已经永久消失。','不能按good的“好”逐词理解。'],
['insatiable-appetite-for','an insatiable appetite for','an insatiable appetite for + noun/doing','比喻搭配','对……有永不满足的胃口','以食欲比喻技术不断吞噬岗位的趋势。','Automation has an insatiable appetite for routine tasks.','自动化对常规任务有永不满足的胃口。','语气强于普通的需求或兴趣。'],
['eat-up','eating up','eat up + noun','动词短语','吞噬；大量消耗','本文比喻技术不断消除人的工作岗位。','Automation is eating up routine jobs.','自动化正在吞噬常规岗位。','不是字面上的吃东西。'],
['immune-from','be immune from','be immune from + noun','形容词搭配','不受……影响','说明一些岗位曾被认为不会受到自动化影响。','No occupation is fully immune from change.','没有任何职业完全不受变化影响。','immune to也常见；原文使用from。'],
['attract-attention','attracted a lot of attention','attract attention','动词搭配','引起关注','主语是argument，书的成功使它广受关注。','The argument attracted widespread attention.','这一论点引起了广泛关注。','attention不是主动关注别人。'],
['hail-from','hail from','hail from + place/organization','动词短语','来自','说明两位作者来自麻省理工学院的研究中心。','Both researchers hail from MIT.','两位研究人员都来自麻省理工学院。','这里的hail不是欢呼或冰雹。'],
['in-the-first-place','in the first place','in the first place','固定表达','最初；究竟；根本上','放在why从句末，追问岗位容易受冲击的根本原因。','Why were the jobs vulnerable in the first place?','这些岗位最初为什么容易受冲击？','此处不是列举中的“第一”。'],
['leave-no-room-for','leave no room for','leave no room for + noun','动词搭配','不给……留下空间','说明脚本化岗位压制主动性和创造力。','Rigid rules leave no room for initiative.','僵化规则不给主动性留下空间。','room在此是抽象余地。'],
['in-short','In short','in short','总结表达','简言之','引出对脚本化、标准化岗位的总结。','In short, machines perform these tasks better.','简言之，机器更擅长这些任务。','不是描述长度很短。'],
['put-target-on-backs','put a giant target sign on the backs of','put a target on the back of somebody','比喻表达','使某人成为明显的攻击或替代目标','把工人背上的靶标比喻成易被机器替代的处境。','Rigid job design puts a target on workers\' backs.','僵化的岗位设计使劳动者成为明显的替代目标。','不是实际把标志放在人身上。'],
['it-is-time-to','It\'s time to','it is time to + verb','句型','该做……了','形式主语it引出现在应采取的行动。','It is time to redesign work.','现在该重新设计工作了。','表达行动时机，不只是钟表时间。'],
['rely-on','relying on','rely on + noun','动词短语','依赖；依靠','说明当前仍依赖20世纪的工作观。','Many firms still rely on old routines.','许多公司仍依赖旧惯例。','on不可省略。'],
['take-initiative','take initiative','take initiative','动词搭配','发挥主动性；主动行动','强调员工能自行判断并采取行动。','Employees should take initiative.','员工应当发挥主动性。','initiative在这里不可数，通常不加冠词。'],
['exercise-imagination','exercise their imagination','exercise one\'s imagination','动词搭配','发挥想象力','exercise作动词，表示运用一种能力。','Workers can exercise their imagination.','员工能够发挥想象力。','不是身体锻炼。'],
['respond-to','respond to','respond to + noun','动词搭配','应对；回应','引出员工需要应对的意外事件。','People must respond to unexpected events.','人们必须应对意外事件。','to是介词，后接名词或动名词。'],
['be-good-at','machines are good at','be good at + noun/doing','能力搭配','擅长……','说明机器并不擅长需要主动性和想象力的事。','Machines are good at predictable tasks.','机器擅长可预测的任务。','at后接擅长的领域。'],
['be-designed-to','are designed to','be designed to + verb','被动结构','被设计用来……','说明机器的设计用途是执行可预测活动。','Machines are designed to follow rules.','机器被设计用来遵循规则。','强调用途，不表示机器自行设计。'],
['touch-on','touched on','touch on + topic','动词短语','谈到；涉及','说明两位作者在书中也涉及了这一点。','The book touches on human creativity.','这本书谈到了人的创造力。','不是身体接触。'],
['reframe-race-with-machine','reframe race against the machine as race with the machine','reframe A as B','重构表达','把“与机器对抗”重新界定为“同机器协作”','against与with的替换体现全文解决方向。','We can reframe competition as cooperation.','我们可以把竞争重新界定为合作。','as后给出新的理解框架。'],
['in-other-words','In other words','in other words','解释表达','换句话说','用机器增强而非取代劳动来解释race with the machine。','In other words, technology should augment labor.','换句话说，技术应增强人的劳动。','引出同一意思的重述。'],
['rather-than','rather than','A rather than B','对比结构','而不是','连接augment和replace，明确保留前者、排除后者。','Machines should augment rather than replace labor.','机器应增强而不是取代人的劳动。','连接成分应保持同级。'],
['not-but-rather','not really about technology, but rather','not A, but rather B','纠正结构','并非真正关乎A，而是关乎B','否定把问题归于技术本身，转向制度和工作实践。','The issue is not technology, but rather job design.','问题不在技术，而在岗位设计。','but rather后给出作者真正强调的对象。'],
];
const phr=reviewedPhrases(phraseRows);
export const phraseGuides=phr.guides;
export const phraseAliases=phr.aliases;
export const phraseGlosses={...lex.glosses,...phr.glosses};
for(const entry of Object.values(lexicon))entry.examSynonyms=entry.examSynonyms.filter(Boolean);
put('2014-p3-s10','good','adj.','擅长的；表现好的','better是good的比较级，much better at表示在这些任务上擅长得多。');
put('2014-p3-s14','good','adj.','擅长的','be good at表示擅长某事；本句是否定机器擅长这种能力。');
for(const[id,key,pos,meaning,use]of [
['2014-p3-s1','at','prep. phrase component','at least中的组成作用','与least构成至少，限定同级比较的下限。'],
['2014-p3-s1','this','det.','这种；这一','限定phenomenon，回指人与机器对抗的现象。'],
['2014-p3-s1','to','infinitive marker','引出动词原形','tend to be表示往往会呈现某种情况。'],
['2014-p3-s3','for','prep. phrase component','for good中的组成作用','与good构成永久地这一固定表达。'],
['2014-p3-s4','have','v.','有；具有','主语technology具有一种比喻性的appetite。'],
['2014-p3-s4','for','prep.','对；对于','appetite for引出技术吞噬岗位的对象。'],
['2014-p3-s4','this','pron.','这种现象（指代）','回指技术吞噬并淘汰人的岗位。'],
['2014-p3-s4','to','infinitive marker','引出动词原形','continue to restructure表示将继续重塑。'],
['2014-p3-s6','this','det.','这一；这个','限定argument，回指自动化威胁岗位的论点。'],
['2014-p3-s6','have','aux.','构成完成时','has attracted表示该论点已经引起关注。'],
['2014-p3-s6','for','prep.','关于；所属领域','Center for Digital Business表示数字商业研究中心。'],
['2014-p3-s7','this','pron.','这个论点（指代）','回指前文自动化威胁岗位的argument。'],
['2014-p3-s8','first','phrase component','in the first place中的组成作用','整体追问岗位究竟为何脆弱，不表示列举第一点。'],
['2014-p3-s8','place','phrase component','in the first place中的组成作用','整体表示最初、究竟，不指具体地点。'],
['2014-p3-s9','have','aux.','构成完成时','have designed说明美国已经形成这种岗位设计。'],
['2014-p3-s9','to','infinitive marker','引出动词原形','tend to be表示往往是某种类型。'],
['2014-p3-s9','for','prep.','给；对','no room for引出没有发挥空间的能力。'],
['2014-p3-s10','that','relative pron.','引导定语从句','回指types of jobs，在从句中作perform的宾语。'],
['2014-p3-s11','have','aux.','构成完成时','have put说明这种岗位设计已经使工人成为目标。'],
['2014-p3-s11','put','v.','置于；使处于','put a target on...以比喻表示使工人处于易被替代的位置。'],
['2014-p3-s11','on','prep.','在……上','引出靶标被比喻性放置的位置the backs of workers。'],
['2014-p3-s12','to','infinitive marker','引出动词原形','It is time to reinvent说明现在该采取的行动。'],
['2014-p3-s12','for','prep.','用于；关于','formula for引出需要重新设计的工作模式。'],
['2014-p3-s15','to','infinitive marker','引出用途','be designed to perform表示被设计用来执行。'],
['2014-p3-s17','to','infinitive marker','引出动词原形','need to reframe说明需要采取的行动。'],
['2014-p3-s18','other','phrase component','in other words中的组成作用','与in、words构成换句话说这一重述信号。'],
['2014-p3-s18','to','infinitive marker','引出动词原形','need to look说明需要采取的研究行动。'],
['2014-p3-s18','at','prep.','考察；研究（look at）','与look构成考察，引出ways。'],
['2014-p3-s18','look','v.','考察；研究','look at the ways表示研究机器增强劳动的方式。'],
['2014-p3-s19','do','aux.','构成疑问句','how do we innovate中do帮助构成直接疑问。'],
['question-201431-prompt','to','prep. phrase component','according to中的组成作用','与according构成根据，引出第一段。'],
['question-201431-option-B','to','prep.','对；针对','threat to引出机器威胁的对象human jobs。'],
['question-201432-prompt','that','conj.','引导内容从句','引出两位作者所主张的具体内容。'],
['question-201433-prompt','that','conj.','引导内容从句','引出Hagel对美国岗位的判断。'],
['question-201433-option-B','with','prep.','以；带有','scripted with引出被错误选项声称的个人风格。'],
['question-201434-prompt','to','prep. phrase component','according to中的组成作用','与according构成根据，引出末段。'],
['question-201434-option-B','for','prep.','用于；关于','formula for引出工作如何开展。'],
['question-201434-option-C','time','n.','时代；时期','modern times表示现代时期。'],
['question-201435-prompt','for','prep.','对于；适合','引出标题所对应的文章。'],
['question-201435-option-A','to','infinitive marker','引出动词原形','How to innovate表示如何创新。'],
] as string[][])put(id,key,pos,meaning,use);
formContexts['2014-p3-s1']={is:{partOfSpeech:'v.',contextualMeaning:'是','use':'连接concept与历史比较表语。'},be:{partOfSpeech:'aux.',contextualMeaning:'构成被动语态',use:'be felt表示这种现象被人们感受到。'}};
formContexts['2014-p3-s5']={is:{partOfSpeech:'v.',contextualMeaning:'存在',use:'there is引出技术价格和性能的改善。'},were:{partOfSpeech:'aux.',contextualMeaning:'构成被动语态',use:'were thought表示这些工作曾被认为。'},thought:{partOfSpeech:'v. past participle',contextualMeaning:'被认为',use:'与were构成被动，后接to be immune作为主语补足说明。'}};
