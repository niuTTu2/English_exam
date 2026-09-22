import {reviewedLexicon,reviewedPhrases,type LexiconRow,type PhraseRow} from "./2011-content-helpers";
import type {SentenceWordContext} from "./contextual-vocabulary";
const rows:LexiconRow[]=[
 [
  "article",
  "",
  "n.",
  "文章",
  "指刊物发表的研究介绍文章。",
  "an article in a magazine（杂志中的一篇文章）",
  ""
 ],
 [
  "empirical",
  "",
  "adj.",
  "实证的",
  "研究依靠观察或实验所得的证据。",
  "empirical research（实证研究）",
  ""
 ],
 [
  "deep-seated",
  "",
  "adj.",
  "根深蒂固的",
  "修饰need，说明心理需要由来很深。",
  "a deep-seated need（深层需要）",
  ""
 ],
 [
  "ourselves",
  "",
  "reflexive pron.",
  "我们自己",
  "与主语we同指，作介词或动词的宾语。",
  "feel good about ourselves（自我感觉良好）",
  ""
 ],
 [
  "self-enhance",
  "self-enhances self-enhanced self-enhancing",
  "v.",
  "美化自我评价",
  "不是实际能力提升；s2中self-enhancing作形容词另给语境。",
  "self-enhance in a study（在研究中表现出自我美化）",
  ""
 ],
 [
  "strategy",
  "strategies",
  "n.",
  "策略",
  "指为了自我感觉良好而采用的心理方法。",
  "self-enhancing strategies（自我美化策略）",
  ""
 ],
 [
  "amass",
  "amasses amassed amassing",
  "v.",
  "积累；聚集",
  "have amassed说明已经积累大量研究。",
  "amass evidence（积累证据）",
  ""
 ],
 [
  "ocean",
  "oceans",
  "n.",
  "大量（比喻）",
  "oceans of整体夸张表示数量极多，这里不是海洋研究。",
  "oceans of research（大量研究）",
  ""
 ],
 [
  "illusory",
  "",
  "adj.",
  "虚幻的",
  "优越感并不符合实际，不是否定心理效应本身存在。",
  "illusory superiority（虚幻优越感）",
  ""
 ],
 [
  "superiority",
  "",
  "n.",
  "优越；优势",
  "指自认高于平均的优势。",
  "a sense of superiority（优越感）",
  ""
 ],
 [
  "leadership",
  "",
  "n.",
  "领导能力",
  "in leadership限定自我评分涉及的能力领域。",
  "leadership ability（领导能力）",
  ""
 ],
 [
  "drive",
  "drives drove driven driving",
  "v.",
  "驾驶",
  "driving在in后作动名词，指驾驶这一技能领域。",
  "skill in driving（驾驶技能）",
  ""
 ],
 [
  "statistical",
  "",
  "adj.",
  "统计上的",
  "修饰impossibilities，对多数人均自认高于平均作评价。",
  "statistical evidence（统计证据）",
  ""
 ],
 [
  "impossibility",
  "impossibilities",
  "n.",
  "不可能的事",
  "指这些自我估计在统计意义上不可能同时成立。",
  "a statistical impossibility（统计上不可能的情况）",
  ""
 ],
 [
  "rose-tint",
  "rose-tints rose-tinted rose-tinting",
  "v.",
  "美化",
  "以玫瑰色滤镜比喻给记忆加上美好色彩。",
  "rose-tint memories（美化记忆）",
  ""
 ],
 [
  "memory",
  "memories",
  "n.",
  "记忆；回忆",
  "rose-tint的宾语，指个人记得的往事。",
  "pleasant memories（美好的回忆）",
  ""
 ],
 [
  "self-affirming",
  "",
  "adj.",
  "肯定自我的",
  "修饰situations，指能让人觉得自己很好、很有价值的情境。",
  "self-affirming situations（能肯定自我的情境）",
  ""
 ],
 [
  "defensive",
  "",
  "adj.",
  "自我防卫的",
  "受到批评时进入保护自我、不愿接受批评的状态。",
  "become defensive（变得有防卫心理）",
  ""
 ],
 [
  "criticize",
  "criticizes criticized criticizing criticise criticises criticised criticising",
  "v.",
  "批评",
  "原文criticised是英式拼写；when criticised指受到批评时。",
  "criticize a decision（批评一项决定）",
  ""
 ],
 [
  "stereotype",
  "stereotypes",
  "n.",
  "刻板印象",
  "指把固定的负面看法套到他人身上。",
  "negative stereotypes（负面刻板印象）",
  ""
 ],
 [
  "esteem",
  "",
  "n.",
  "尊重；自尊",
  "our own esteem指对自己的价值评价。",
  "boost one's esteem（增强自尊）",
  ""
 ],
 [
  "stalk",
  "stalks stalked stalking",
  "v.",
  "昂首阔步地走",
  "stalk around指带着自负态度走来走去，不是跟踪。",
  "stalk around（趾高气扬地走来走去）",
  ""
 ],
 [
  "hot",
  "",
  "adj.",
  "出色的（习语成分）",
  "hot stuff整体表示了不起的人，hot在此突出出色。",
  "hot stuff（了不起的人）",
  ""
 ],
 [
  "stuff",
  "",
  "n.",
  "人或事物（非正式）",
  "hot stuff中指自认为了不起的人；不能按材料译。",
  "hot stuff（了不起的人）",
  ""
 ],
 [
  "behavioral",
  "behavioural",
  "adj.",
  "行为的",
  "英美拼写不同，修饰scientist，说明学科领域。",
  "a behavioural scientist（行为科学家）",
  ""
 ],
 [
  "nicholas",
  "",
  "proper n.",
  "尼古拉斯",
  "Epley的名字。",
  "Nicholas Epley（尼古拉斯·埃普利）",
  ""
 ],
 [
  "epley",
  "epley's",
  "proper n.",
  "埃普利",
  "心理学家的姓；所有格指他的研究。",
  "Epley's study（埃普利的研究）",
  ""
 ],
 [
  "oversee",
  "oversees oversaw overseen overseeing",
  "v.",
  "监督；主持",
  "oversaw是过去式，说明负责这项研究。",
  "oversee a study（主持一项研究）",
  ""
 ],
 [
  "key",
  "",
  "adj.",
  "关键的；重要的",
  "修饰study，强调研究重要，不是钥匙。",
  "a key study（一项重要研究）",
  ""
 ],
 [
  "self-enhancement",
  "",
  "n.",
  "自我美化",
  "在本文指对自身形象与能力持偏好的评价。",
  "a study of self-enhancement（自我美化研究）",
  ""
 ],
 [
  "attractiveness",
  "",
  "n.",
  "吸引力",
  "本文主要指外表的吸引力，与beauty相关。",
  "physical attractiveness（外貌吸引力）",
  ""
 ],
 [
  "photograph",
  "photographs",
  "n.",
  "照片",
  "原始照片与修改后的版本对照。",
  "an original photograph（一张原始照片）",
  ""
 ],
 [
  "lineup",
  "lineups",
  "n.",
  "一排；一组排列",
  "指供受试者辨认的一组照片。",
  "a lineup of photographs（一排照片）",
  ""
 ],
 [
  "version",
  "versions",
  "n.",
  "版本",
  "不同照片是同一受试者形象的不同修改版本。",
  "an altered version（修改过的版本）",
  ""
 ],
 [
  "alter",
  "alters altered altering",
  "v.",
  "修改；改变",
  "被动had been altered说明照片已被修饰。",
  "alter a photograph（修改照片）",
  ""
 ],
 [
  "visual",
  "",
  "adj.",
  "视觉的",
  "修饰recognition，说明辨认依靠视觉。",
  "visual recognition（视觉辨认）",
  ""
 ],
 [
  "recognition",
  "",
  "n.",
  "辨认；识别",
  "研究中迅速认出自己的照片，不是得到表彰。",
  "visual recognition（视觉辨认）",
  ""
 ],
 [
  "read",
  "reads reading",
  "v.",
  "写着；内容是",
  "reads the study表示研究报告如此写道。",
  "The report reads as follows（报告内容如下）",
  ""
 ],
 [
  "occur",
  "occurs occurred occurring",
  "v.",
  "发生",
  "现在分词补充过程发生的速度和方式。",
  "occur rapidly（迅速发生）",
  ""
 ],
 [
  "intuitively",
  "",
  "adv.",
  "凭直觉地",
  "修饰occurring，与有意识思考相对。",
  "respond intuitively（凭直觉回应）",
  ""
 ],
 [
  "conscious",
  "",
  "adj.",
  "有意识的",
  "修饰deliberation，指主动思考后的认知。",
  "conscious deliberation（有意识的思考）",
  ""
 ],
 [
  "deliberation",
  "deliberations",
  "n.",
  "仔细考虑；思考",
  "little or no说明这种主动思考很少或没有。",
  "careful deliberation（仔细考虑）",
  ""
 ],
 [
  "subject",
  "subjects",
  "n.",
  "受试者",
  "实验中的参与者，不是学科或句子主语。",
  "experimental subjects（实验受试者）",
  ""
 ],
 [
  "falsely",
  "",
  "adv.",
  "不真实地",
  "修饰flattering，表示照片美化得不符合实际。",
  "a falsely flattering image（一张不真实地美化人的照片）",
  ""
 ],
 [
  "flattering",
  "",
  "adj.",
  "使人显得更好的",
  "形容照片使拍摄对象看上去更有吸引力，不必指刻意奉承。",
  "a flattering photograph（一张把人拍得很好看的照片）",
  ""
 ],
 [
  "genuinely",
  "",
  "adv.",
  "真心地；确实地",
  "修饰believed，表明受试者真正相信照片是真实的。",
  "genuinely believe（真心相信）",
  ""
 ],
 [
  "response",
  "responses",
  "n.",
  "反应；回应",
  "指受试者在照片辨认实验中的反应。",
  "an intuitive response（直觉反应）",
  ""
 ],
 [
  "participant",
  "participants",
  "n.",
  "参与者",
  "特指参加研究的人，对应subjects。",
  "study participants（研究参与者）",
  ""
 ],
 [
  "positively",
  "",
  "adv.",
  "正向地；向好的方向",
  "修饰doctored，指把照片朝更美好的方向修改，不是“肯定地”相信。",
  "positively doctored pictures（被美化过的照片）",
  ""
 ],
 [
  "doctor",
  "doctors doctored doctoring",
  "v.",
  "篡改；修饰",
  "熟词生义，指修改照片外貌，不是医生。",
  "doctor a photograph（修饰一张照片）",
  ""
 ],
 [
  "picture",
  "pictures",
  "n.",
  "照片；图像",
  "此处是供辨认的个人照片，不是整体局面。",
  "a picture of oneself（自己的照片）",
  ""
 ],
 [
  "profound",
  "",
  "adj.",
  "深刻的；深深的",
  "修饰insecurities，强调内在不安的程度。",
  "profound insecurity（深深的不安全感）",
  ""
 ],
 [
  "insecurity",
  "insecurities",
  "n.",
  "不安全感",
  "心理上的不自信或不安，不是信息安全漏洞。",
  "personal insecurity（个人内心的不安全感）",
  ""
 ],
 [
  "image",
  "images",
  "n.",
  "图像；照片",
  "指展示受试者面貌的影像。",
  "a flattering image（一张美化形象的照片）",
  ""
 ],
 [
  "high",
  "higher highest",
  "adj.",
  "高的",
  "higher修饰等级或自尊程度。",
  "higher self-esteem（较高的自尊）",
  ""
 ],
 [
  "scale",
  "scales",
  "n.",
  "等级；量表",
  "attractiveness scale按吸引力程度排列，不指研究规模。",
  "an attractiveness scale（吸引力等级量表）",
  ""
 ],
 [
  "correspond",
  "corresponds corresponded corresponding",
  "v.",
  "相对应；相一致",
  "将相信美化照片的一组人与自尊较高的一组人对应起来。",
  "correspond with the evidence（与证据相符）",
  ""
 ],
 [
  "marker",
  "markers",
  "n.",
  "标志；指标",
  "可据以判断自尊水平的表现，不是记号笔。",
  "markers of self-esteem（自尊水平的指标）",
  ""
 ],
 [
  "self-esteem",
  "",
  "n.",
  "自尊；自我价值感",
  "指对自己价值的肯定程度。",
  "high self-esteem（较高的自尊）",
  ""
 ],
 [
  "delusion",
  "delusions",
  "n.",
  "妄想；错觉",
  "Epley不把一般积极自评当作个人妄想的证据。",
  "personal delusion（个人妄想）",
  ""
 ],
 [
  "reflection",
  "reflections",
  "n.",
  "反映；表现",
  "研究结果反映人们对自己评价良好，不是光学反射。",
  "a reflection of confidence（信心的反映）",
  ""
 ],
 [
  "depressed",
  "",
  "adj.",
  "情绪低落的；抑郁的",
  "If从句提出低落状态；文章没有据此诊断受试者。",
  "feel depressed（感到情绪低落）",
  ""
 ],
 [
  "hate",
  "hates hated hating",
  "v.",
  "讨厌；厌恶",
  "宾语是自己的照片。",
  "hate a photograph（讨厌一张照片）",
  ""
 ],
 [
  "viscerally",
  "",
  "adv.",
  "本能地；发自内心地",
  "说明反感是一种直接心理反应。",
  "react viscerally（本能地作出反应）",
  ""
 ],
 [
  "recognize",
  "recognizes recognized recognizing recognise recognises recognised recognising",
  "v.",
  "认出；识别",
  "recognise A as B表示把照片中的人认作自己。",
  "recognize a face（认出一张脸）",
  ""
 ],
 [
  "facebook",
  "",
  "proper n.",
  "脸书",
  "本文提到的社交平台名称。",
  "a Facebook profile（脸书个人资料）",
  ""
 ],
 [
  "self-enhancer",
  "self-enhancers self-enhancer's",
  "n.",
  "自我美化者",
  "指倾向于把自己看得更好的人；所有格修饰paradise。",
  "a self-enhancer's paradise（自我美化者的天堂）",
  ""
 ],
 [
  "paradise",
  "paradises",
  "n.",
  "天堂；理想场所",
  "比喻社交平台便利自我美化。",
  "a paradise for readers（读者的天堂）",
  ""
 ],
 [
  "photo",
  "photos",
  "n.",
  "照片",
  "photograph的常见简写，本文指分享的个人照片。",
  "share photos（分享照片）",
  ""
 ],
 [
  "cream",
  "",
  "n.",
  "精华；最佳部分",
  "the cream of比喻各方面最出色的部分，不是乳霜。",
  "the cream of the crop（精英；最出色的一部分）",
  ""
 ],
 [
  "wit",
  "",
  "n.",
  "机智；风趣",
  "与style、beauty并列，属于展示的个人长处。",
  "a display of wit（机智的表现）",
  ""
 ],
 [
  "intellect",
  "intellects",
  "n.",
  "才智；智力",
  "指个人思考与理解的能力。",
  "a keen intellect（敏锐的才智）",
  ""
 ],
 [
  "lifestyle",
  "lifestyles",
  "n.",
  "生活方式",
  "指可以通过照片和资料呈现的生活面貌。",
  "an idealised lifestyle（理想化的生活方式）",
  ""
 ],
 [
  "profile",
  "profiles",
  "n.",
  "个人资料；简介",
  "本文指社交平台上的个人介绍。",
  "an online profile（网上个人资料）",
  ""
 ],
 [
  "catalina",
  "",
  "proper n.",
  "卡塔利娜",
  "学者Toma的名字。",
  "Catalina Toma（卡塔利娜·托马）",
  ""
 ],
 [
  "toma",
  "",
  "proper n.",
  "托马",
  "文中被引用学者的姓。",
  "Catalina Toma（卡塔利娜·托马）",
  ""
 ],
 [
  "wisconsin-madison",
  "",
  "proper n.",
  "威斯康星大学麦迪逊分校",
  "与University组成原卷中的校名写法。",
  "Wisconsin-Madison University（威斯康星大学麦迪逊分校）",
  ""
 ],
 [
  "idealize",
  "idealizes idealized idealizing idealise idealises idealised idealising",
  "v.",
  "理想化；美化",
  "idealised作分词修饰version，表示经过理想化的形象。",
  "idealize oneself（把自己理想化）",
  ""
 ],
 [
  "self-rating",
  "self-ratings",
  "n.",
  "自我评分；自我评价",
  "指个人对自身能力或美貌作出的评估。",
  "high self-ratings（偏高的自我评分）",
  ""
 ],
 [
  "unrealistically",
  "",
  "adv.",
  "不切实际地",
  "修饰high，评价自评分数与现实不符。",
  "unrealistically high expectations（不切实际的高期望）",
  ""
 ],
 [
  "baseless",
  "",
  "adj.",
  "无根据的",
  "选项声称效应没有依据，不能与illusory混同。",
  "a baseless claim（无根据的说法）",
  ""
 ],
 [
  "ineffective",
  "",
  "adj.",
  "无效的",
  "选项否定自我美化策略的效果。",
  "an ineffective strategy（一种无效策略）",
  ""
 ],
 [
  "rapid",
  "",
  "adj.",
  "迅速的",
  "修饰matching，只说明速度，不说明是否凭直觉。",
  "a rapid response（迅速的反应）",
  ""
 ],
 [
  "match",
  "matches matched matching",
  "v.",
  "匹配；配对",
  "matching为动名词，rapid matching表示快速匹配。",
  "match images（匹配图像）",
  ""
 ],
 [
  "intuitive",
  "",
  "adj.",
  "凭直觉的",
  "修饰response，来自intuitively的同根转换。",
  "an intuitive response（直觉反应）",
  ""
 ],
 [
  "self-defence",
  "",
  "n.",
  "自我防卫",
  "题目选项概念，不与视觉辨认自动等同。",
  "automatic self-defence（自动自我防卫）",
  ""
 ],
 [
  "underestimate",
  "underestimates underestimated underestimating",
  "v.",
  "低估",
  "指估计程度过低；选项对象是不安全感。",
  "underestimate a risk（低估风险）",
  ""
 ],
 [
  "depression",
  "depressions",
  "n.",
  "抑郁；低落情绪",
  "本选项指情绪状态，不是经济萧条。",
  "a period of depression（一段情绪低落时期）",
  ""
 ],
 [
  "oversimplify",
  "oversimplifies oversimplified oversimplifying",
  "v.",
  "过度简化",
  "over-表示过度，原文没有作此判断。",
  "oversimplify a problem（把问题过度简化）",
  ""
 ],
 [
  "illusion",
  "illusions",
  "n.",
  "错觉；幻想",
  "选项中的不实认知，与illusory同源。",
  "an illusion of superiority（优越感幻觉）",
  ""
 ],
 [
  "close",
  "closer closest",
  "adj.",
  "接近的",
  "closest in meaning指语义最接近，不是关闭。",
  "close in meaning（意思接近）",
  ""
 ],
 [
  "instinctively",
  "",
  "adv.",
  "本能地",
  "对应viscerally的心理反应义。",
  "respond instinctively（本能地回应）",
  ""
 ],
 [
  "aggressively",
  "",
  "adv.",
  "带攻击性地",
  "语义比强烈的内心反应多出攻击意味。",
  "behave aggressively（表现得有攻击性）",
  ""
 ],
 [
  "intellectual",
  "",
  "adj.",
  "智力的；学术的",
  "修饰pursuits，指智力活动或学术追求。",
  "intellectual pursuits（智力活动；学术追求）",
  ""
 ],
 [
  "withhold",
  "withholds withheld withholding",
  "v.",
  "不公开；保留",
  "宾语是不讨喜的一面，指选择不展示。",
  "withhold information（不披露信息）",
  ""
 ],
 [
  "unflattering",
  "",
  "adj.",
  "不讨喜的；不美化人的",
  "与flattering相反，指不够好看的面貌或不理想的一面。",
  "an unflattering photo（一张把人拍得不好看的照片）",
  ""
 ],
 [
  "side",
  "sides",
  "n.",
  "方面；一面",
  "unflattering sides指人的不讨喜之处，不是物体侧边。",
  "show another side（展示另一面）",
  ""
 ]
];
const lex=reviewedLexicon(rows);
export const lexicon=lex.entries;
export const aliases=lex.aliases;
export const sentenceContexts:Record<string,Record<string,SentenceWordContext>>={};
Object.assign(aliases,{others:'other',thought:'think',"people's":'person',"we're":'we',"won't":'will',include:'include',including:'include'});
const defaults:Record<string,SentenceWordContext>={
article:{partOfSpeech:'n.',contextualMeaning:'文章',use:'指Scientific American中的文章。'},
scientific:{partOfSpeech:'adj.',contextualMeaning:'科学的',use:'在Scientific American刊名中使用。'},
american:{partOfSpeech:'adj.',contextualMeaning:'美国的',use:'刊名Scientific American通常译为《科学美国人》。'},
research:{partOfSpeech:'n.',contextualMeaning:'研究',use:'指关于自我评价的实证研究，是不可数名词。'},
point:{partOfSpeech:'v.',contextualMeaning:'指出',use:'point out后接that从句说明所指出的内容。'},
need:{partOfSpeech:'n.',contextualMeaning:'需要',use:'a need to do或need for引出所需要的事物或行动。'},
good:{partOfSpeech:'adj.',contextualMeaning:'好的；令人愉快的',use:'feel good about oneself表示自我感觉良好，不是经济更富裕。'},
number:{partOfSpeech:'n.',contextualMeaning:'数量',use:'a number of整体表示若干、许多，不是编号。'},
call:{partOfSpeech:'v.',contextualMeaning:'称为',use:'call后把研究现象命名为above average effect。'},
effect:{partOfSpeech:'n.',contextualMeaning:'效应',use:'心理学研究中反复出现的倾向或现象。'},
average:{partOfSpeech:'n.',contextualMeaning:'平均水平',use:'above average表示高于平均，不是普通的。'},
rate:{partOfSpeech:'v.',contextualMeaning:'评价；评定',use:'rate ourselves as表示把自己评为某个水平。'},
get:{partOfSpeech:'v.',contextualMeaning:'相处（get on组成）',use:'get on well with整体说明与人相处融洽，不是克服。'},
put:{partOfSpeech:'v.',contextualMeaning:'置于；放入',use:'put ourselves into后接让自己身处的情境。'},
apply:{partOfSpeech:'v.',contextualMeaning:'应用；施加',use:'apply A to B表示把刻板印象套在别人身上。'},
negative:{partOfSpeech:'adj.',contextualMeaning:'负面的',use:'修饰stereotypes，指贬低他人的固定看法。'},
own:{partOfSpeech:'adj.',contextualMeaning:'自己的',use:'our own强调属于我们自己，不是动词拥有。'},
study:{partOfSpeech:'n.',contextualMeaning:'研究',use:'指Epley主持的照片辨认实验及其报告。'},
beauty:{partOfSpeech:'n.',contextualMeaning:'美貌；美丽',use:'对外貌吸引力的评价，不是美容行业。'},
ask:{partOfSpeech:'v.',contextualMeaning:'要求；请',use:'ask somebody to do要求参与者辨认原图。'},
identify:{partOfSpeech:'v.',contextualMeaning:'辨认；识别',use:'从多张照片里认出未经修改的原始照片。'},
original:{partOfSpeech:'adj.',contextualMeaning:'原始的；最初的',use:'修饰photograph，与altered versions相对。'},
themselves:{partOfSpeech:'reflexive pron.',contextualMeaning:'他们自己',use:'回指参加研究或展示个人资料的人，不沿用其他文章的事物指代。'},
appear:{partOfSpeech:'v.',contextualMeaning:'显得；看起来',use:'appear后接attractive，表示照片中显出的样貌。'},
look:{partOfSpeech:'v.',contextualMeaning:'看起来',use:'how they looked说明他们自认为的外貌。'},
find:{partOfSpeech:'v.',contextualMeaning:'发现',use:'found引出研究发现，不是建立。'},
significant:{partOfSpeech:'adj.',contextualMeaning:'显著的',use:'no significant gender difference否定明显性别差异。'},
think:{partOfSpeech:'v.',contextualMeaning:'认为',use:'thought是think过去式；后接相信照片真实或对自己评价的内容。'},
scale:{partOfSpeech:'n.',contextualMeaning:'等级；量表',use:'按吸引力高低分级，不是研究规模。'},
show:{partOfSpeech:'v.',contextualMeaning:'显示；表明',use:'研究表明结果，或受试者表现出自尊指标。'},
sense:{partOfSpeech:'n.',contextualMeaning:'道理；合理性',use:'make sense整体表示有道理、说得通。'},
result:{partOfSpeech:'n.',contextualMeaning:'结果',use:'Epley研究得出的结果。'},
level:{partOfSpeech:'n.',contextualMeaning:'层面',use:'on one level限制解释的角度，不指海拔。'},
one:{partOfSpeech:'num.',contextualMeaning:'一',use:'one level指某一个解释层面。'},
share:{partOfSpeech:'v.',contextualMeaning:'分享',use:'在社交平台分享照片或展示生活。'},
portray:{partOfSpeech:'v.',contextualMeaning:'描绘；呈现',use:'个人资料呈现理想化的自我形象。'},
present:{partOfSpeech:'v.',contextualMeaning:'呈现；展示',use:'题目选项中present profiles指展示个人资料，不是形容词现在的。'},
cover:{partOfSpeech:'v.',contextualMeaning:'掩盖',use:'cover up后接试图隐瞒的情绪状态。'},
line:{partOfSpeech:'n.',contextualMeaning:'行',use:'原卷词义题按排版标示的行号，不是诗行。'},
word:{partOfSpeech:'n.',contextualMeaning:'词',use:'指题目询问的副词viscerally。'},
meaning:{partOfSpeech:'n.',contextualMeaning:'意思；含义',use:'closest in meaning要求比较语义接近程度。'},
first:{partOfSpeech:'adj.',contextualMeaning:'第一的',use:'first paragraph定位第一段。'},
other:{partOfSpeech:'det./pron.',contextualMeaning:'其他的；其他人',use:'other markers修饰指标；others独立指其他人。'},
will:{partOfSpeech:'modal v.',contextualMeaning:'将；会',use:'won\'t是will not，表示不会出现某种行为。'},
we:{partOfSpeech:'pron.',contextualMeaning:'我们',use:'we为主格，us为宾格，we\'re为we are缩写。'},
be:{partOfSpeech:'v.',contextualMeaning:'是；处于某种状态',use:'连接主语与其性质；句内被动或进行时另给准确说明。'},
have:{partOfSpeech:'aux.',contextualMeaning:'构成完成时',use:'has/have/had与过去分词连用，表示完成时关系。'},
that:{partOfSpeech:'conj.',contextualMeaning:'引导内容从句，本身无独立词义',use:'引出研究、判断或证据的内容；定语从句及that is另给来源。'},
who:{partOfSpeech:'relative pron.',contextualMeaning:'引导定语从句，指人',use:'who在定语从句中作主语，限定those或participants。'},
};
for(const[key,value]of Object.entries(defaults))lexicon[key]={...(lexicon[key]??{specialForms:[],collocations:[],examSynonyms:[]}),...value};
const put=(id:string,key:string,pos:string,meaning:string,use:string)=>{(sentenceContexts[id]??={})[key]={partOfSpeech:pos,contextualMeaning:meaning,use};};
for(const[id,key,pos,meaning,use]of [
['2014-p2-s2','have','v.','有；拥有','宾语是a deep-seated need，表示具有需要，不是完成时助动词。'],
['2014-p2-s2','self-enhance','adj.','美化自我评价的','self-enhancing修饰strategies，表示策略的作用。'],
['2014-p2-s2','this','pron.','这；这件事（指代）','回指自我感觉良好的目标。'],
['2014-p2-s3','what','pron.','……的事物','what they call整体指他们所称的心理现象。'],
['2014-p2-s3','above','prep.','高于','引出比较基准average。'],
['2014-p2-s3','drive','v.','驾驶','driving在介词in后作动名词，指驾驶活动。'],
['2014-p2-s3','on','adv.','get on中的组成作用','get on well with表示相处融洽；on不是在表面上。'],
['2014-p2-s3','with','prep.','与……一起；伴随着','引出相处的对象others。'],
['2014-p2-s3','into','prep.','关于；针对','research into引出研究对象，不表示进入空间。'],
['2014-p2-s3','as','prep.','作为；视为','rate ourselves as给出自我评定的等级。'],
['2014-p2-s3','in','prep.','在……方面','限定领导或驾驶技能领域。'],
['2014-p2-s3','at','prep.','在……方面','引出与人相处这一技能领域。'],
['2014-p2-s4','into','prep.','进入；到……里面','put ourselves into表示置身某种情境。'],
['2014-p2-s5','when','conj.','当……时；每当……时','when criticised省略we are，说明受到批评时。'],
['2014-p2-s6','around','adv.','到处；四处','修饰stalk，表示走来走去。'],
['2014-p2-s7','into','prep.','关于；针对','study into引出研究的两个主题。'],
['2014-p2-s8','have','v.','使；让','have people rate让人们评价；had been altered中的had为完成时助动词，需按原词形区别。'],
['2014-p2-s8','be','aux.','构成被动语态','been altered说明照片被修改。'],
['2014-p2-s8','that','relative pron.','引导定语从句','that回指versions，作had been altered的主语。'],
['2014-p2-s8','include','prep.','包括','including引出照片组包含的修改版本。'],
['2014-p2-s8','with','prep.','与……比较','compared with引出比较的其他人。'],
['2014-p2-s9','with','prep.','带有；具有','表示视觉辨认伴随很少或没有有意识思考。'],
['2014-p2-s9','little','det.','很少；几乎没有','限定不可数名词deliberation；没有a，语气偏否定。'],
['2014-p2-s10','which','relative pron.','引导定语从句','回指选择美化照片这件事，不是询问哪一张。'],
['2014-p2-s10','do','aux.','代替前述动作','did代替chose a falsely flattering image。'],
['2014-p2-s10','how','adv.','如何；怎样','引导表语从句，表示他们的真实样貌。'],
['2014-p2-s10','most','pron.','大多数','指大多数受试者，作did主语。'],
['2014-p2-s12','be','v./aux.','系动词或进行时助动词','was there表示存在，were real连接表语，were doing构成过去进行时。'],
['2014-p2-s12','that','conj./pron.','内容从句引导词或指示代词','首个that引出evidence内容；that is中的that回指先前表述，须按位置区分。'],
['2014-p2-s12','do','v.','做','doing so指自我美化这一行为。'],
['2014-p2-s12','so','adv.','这样；如此','回指美化自己、把修饰照片当真的行为。'],
['2014-p2-s12','make','v.','make up for中的组成作用','与up for整体表示弥补，不单独译为制作。'],
['2014-p2-s12','up','adv.','make up for中的组成作用','与make和for构成弥补这一固定表达。'],
['2014-p2-s12','for','prep.','make up for中的组成作用','引出要弥补的不安全感，整体意义在词组卡解释。'],
['2014-p2-s13','have','v.','有；拥有','having higher self-esteem指具有较高自尊。'],
['2014-p2-s13','with','prep.','对；与……有关','corresponded with连接两组相对应的人。'],
['2014-p2-s13','up','prep.','在……较高位置','higher up the scale说明在等级量表上的位置更高。'],
['2014-p2-s13','for','prep.','表明；指示','markers for引出指标所显示的自尊水平。'],
['2014-p2-s14','have','v.','有；拥有','findings that we have指已经获得的研究发现。'],
['2014-p2-s14','that','relative pron.','引导定语从句','回指findings，在从句中作have宾语。'],
['2014-p2-s14','do','aux.','构成否定','don\'t think用于否定判断，不是实义动词做。'],
['2014-p2-s15','of','prep.','对；对于','thinking well of引出评价对象；reflection of中的of引出所反映的内容。'],
['2014-p2-s16','be','aux.','构成进行时','be self-enhancing与现在分词连用；are depressed中的are连接状态，按词形区分。'],
['2014-p2-s17','make','v.','make sense中的组成作用','与sense组成说得通、有道理，不是创造感觉。'],
['2014-p2-s17','do','aux.','构成否定','don\'t recognise否定认出动作。'],
['2014-p2-s17','as','prep.','作为；视为','recognise A as B说明把照片中的人认作自己。'],
['2014-p2-s18','where','relative adv.','在其中（引导定语从句）','回指作为paradise的Facebook，说明人们在那里能做什么。'],
['2014-p2-s19','they','pron.','它们','回指people\'s profiles，指资料描绘形象。'],
['question-201426-option-D','self-enhance','adj.','美化自我评价的','self-enhancing修饰strategies。'],
['question-201427-prompt','be','aux.','构成被动语态','is believed表示被认为；to be连接视觉辨认的性质。'],
['question-201428-option-B','in','prep.','对……的信任','believe in引出相信的自身吸引力。'],
['question-201428-option-C','up','adv.','cover up中的组成作用','与cover共同表示掩盖。'],
['question-201429-prompt','in','prep.','在……方面','in meaning限定比较的是含义。'],
['question-201430-prompt','be','aux.','构成被动语态','be inferred表示可以被推断；is a paradise中的is为系动词，需按词形区分。'],
] as string[][])put(id,key,pos,meaning,use);
const phraseRows:PhraseRow[]=[
['point-out','pointed out','point out','动词短语','指出','out与point共同引出值得注意的事实。','The study points out a bias.','研究指出一种偏差。','不是用手指向空间中的外面。'],
['a-number-of','a number of','a number of + plural noun','数量表达','若干；许多','a number of接复数名词；the number of则强调数量本身。','We use a number of strategies.','我们使用多种策略。','不能与the number of混为一谈。'],
['oceans-of','oceans of','oceans of + noun','比喻数量','大量','以海洋比喻数量极多。','They collected oceans of data.','他们收集了大量数据。','此处不是研究海洋。'],
['get-on-with','getting on well with others','get on well with somebody','动词搭配','与某人相处融洽','well说明相处状况；with引出相处对象。','She gets on well with her colleagues.','她与同事相处融洽。','不把get解释为获得。'],
['apply-to','apply negative stereotypes to others','apply A to B','动词搭配','把A应用于B','本文把负面刻板印象套在别人身上。','Do not apply stereotypes to individuals.','不要把刻板印象套在个人身上。','apply to a school表示申请，须分清结构。'],
['hot-stuff','hot stuff','hot stuff','非正式习语','了不起的人或事物','本文指自认为出色的人，带调侃语气。','He thinks he is hot stuff.','他觉得自己了不起。','不能译成热的材料。'],
['rather-than','Rather than','rather than + do','对比结构','而不是','本句对比让受试者打分与让他们辨认照片两种方法。','Rather than guess, she checked the facts.','她没有猜测，而是查证了事实。','rather than后结构取决于所比较成分，本文接动词原形。'],
['compare-with','compared with others','compare A with B','比较结构','把A与B比较','compared with说明比较参照。','He rated his skill compared with others.','他与别人比较来评价自己的技能。','不要把被比较的对象和参照互换。'],
['that-is','that is','that is','解释插入语','也就是说','引出对前述人群的具体解释。','Some people, that is, the volunteers, stayed.','有些人，也就是那些志愿者，留了下来。','不表示因果关系。'],
['make-up-for','make up for','make up for + noun','动词短语','弥补；补偿','for后接不足或缺失。','Rest can make up for lost sleep.','休息可以补回缺失的睡眠。','make up还有编造等义，须保留for。'],
['think-well-of','thinking well of themselves','think well of somebody','评价搭配','对某人评价好','well表示评价积极；of引出对象。','She thinks well of her team.','她对自己的团队评价很高。','不等于认真思考某人。'],
['make-sense','makes sense','make sense','动词搭配','有道理；说得通','it makes sense that引出可以理解的现象。','It makes sense that they prefer flattering photos.','他们偏爱美化自己的照片是可以理解的。','不能译为制造感官。'],
['recognize-as','recognise the person in the picture as themselves','recognize A as B','识别结构','认出A是B','as后给出认出的身份。','She recognized the figure as her friend.','她认出那个人影是她的朋友。','recognise是recognize的英式拼写。'],
];
const phr=reviewedPhrases(phraseRows);
export const phraseGuides=phr.guides;
export const phraseAliases=phr.aliases;
export const phraseGlosses={...lex.glosses,...phr.glosses};
for(const entry of Object.values(lexicon))entry.examSynonyms=entry.examSynonyms.filter(Boolean);
export const formContexts:Record<string,Record<string,SentenceWordContext>>={
 '2014-p2-s8':{had:{partOfSpeech:'aux.',contextualMeaning:'构成完成时',use:'had been altered是过去完成时被动，照片的修改先于辨认。'}},
 '2014-p2-s12':{was:{partOfSpeech:'v.',contextualMeaning:'存在',use:'Nor was there倒装表示也没有证据。'},is:{partOfSpeech:'v.',contextualMeaning:'是',use:'that is作为插入语引出解释。'}},
 '2014-p2-s16':{are:{partOfSpeech:'v.',contextualMeaning:'处于某种状态',use:'are depressed为系表结构，表示情绪低落。'}},
 'question-201427-prompt':{be:{partOfSpeech:'v.',contextualMeaning:'是；处于某种状态',use:'to be引出视觉辨认被认为具有的性质。'}},
 'question-201430-prompt':{is:{partOfSpeech:'v.',contextualMeaning:'是；处于某种状态',use:'is a paradise为系表结构，说明Facebook的比喻性质。'}},
};
for(const[id,key,pos,meaning,use]of [
['2014-p2-s1','in','prep.','在……中','说明文章发表于哪本刊物。'],
['2014-p2-s1','out','adv.','point out中的组成作用','与point组成指出这一动词短语。'],
['2014-p2-s2','to','infinitive marker','引出动词原形','to feel说明需要的内容，to achieve说明运用策略的目的。'],
['2014-p2-s2','about','prep.','关于','feel good about引出自我评价所针对的对象。'],
['2014-p2-s3','for','prep.','for example中的组成作用','for example整体用来引出例子。'],
['2014-p2-s5','to','prep./infinitive marker','目标介词或不定式标记','to others指应用对象；to boost指目的，两处作用不同。'],
['2014-p2-s8','to','infinitive marker','引出动词原形','to identify是要求做的事，to appear说明修改造成的效果。'],
['2014-p2-s10','it','pron.','它','指受试者选中的照片所呈现的形象。'],
['2014-p2-s11','in','prep.','在……中','在实验回应中考察有无性别差异。'],
['2014-p2-s12','to','infinitive marker','引出动词原形','to make up for说明假设的行为目的；整项解释被否定证据支持。'],
['2014-p2-s12','those','pron.','那些人','指自我美化程度最高的受试者。'],
['2014-p2-s13','those','pron.','那些人','前后两处均指特定一组受试者。'],
['2014-p2-s13','in','prep.','in fact中的组成作用','in fact整体表示事实上，引出更准确说明。'],
['2014-p2-s17','it','pron.','形式主语','that从句说明说得通的具体情况。'],
['2014-p2-s17','on','prep.','从……角度','on one level限定解释层面。'],
['2014-p2-s17','in','prep.','在……中','in the picture修饰person，指照片中的人。'],
['question-201426-prompt','to','prep.','according to中的组成作用','according to引出判断依据，即第一段。'],
['question-201426-option-C','for','prep.','对于；针对','need for后接所需要的对象。'],
['question-201427-prompt','to','infinitive marker','引出动词原形','to be说明被认为具有什么性质。'],
['question-201428-prompt','with','prep.','带有；具有','修饰people，说明这些人的自尊水平。'],
['question-201428-prompt','to','infinitive marker','引出动词原形','tend to后接通常会做的动作。'],
['question-201429-prompt','to','prep.','与……相比','closest to引出词义接近的比较对象。'],
['question-201430-prompt','it','pron.','形式主语','that从句是真正被推断的内容。'],
] as string[][])put(id,key,pos,meaning,use);
for(const[key,pos,meaning,use]of [
['more','adv.','更；更加','与beautiful或attractive构成比较级，强调程度增加。'],
['less','adv.','较少地；不那么','修饰attractive，表示吸引力较低。'],
['well','adv.','好地；顺利地','get on well表示相处好；think well of表示评价好。'],
['any','det.','任何一个','在否定结构中限定evidence，表示没有任何证据。'],
['most','adv.','最','修饰美化程度或flattering；独立指多数人的来源另列。'],
['no','det.','没有任何','限定名词，否定有意识思考或性别差异。'],
['social','adj.','社会的','social psychologists指社会心理学家，不是善交际的人。'],
['only','adv.','仅仅；只','限定分享内容为最讨喜的照片。'],
['choice','n.','选择','conscious choice指有意识作出的选择行为。'],
['many','det.','许多','限定people的人数。'],
['of','prep.','……的；关于','引出所属、内容或涉及对象；各结构整体依搭配理解。'],
['believe','v.','相信；认为','believed是过去式或被动分词，不是形容词。'],
] as string[][])lexicon[key]={...(lexicon[key]??{specialForms:[],collocations:[],examSynonyms:[]}),partOfSpeech:pos,contextualMeaning:meaning,use};
put('2014-p2-s3','all','pron.','全部；所有各项','回指前面的三组高估比例，作补充说明的主语。');
put('2014-p2-s13','other','det.','其他的','修饰markers，指照片选择之外的自尊指标。');
for(const n of [3,5,8])put(`2014-p2-s${n}`,'other','pron.','其他的人或事物','others在这里独立指其他人，不修饰后面的名词。');
put('2014-p2-s8','rather','adv.','rather than中的组成作用','与than组成而不是，引出未采用的研究方法。');
put('2014-p2-s8','than','conj.','rather than中的组成作用','rather than对比两种方法，不表示数量比较。');
put('2014-p2-s15','it','pron.','它；这件事','回指实验发现所表现的自我美化现象。');
put('2014-p2-s19','it','pron.','情境占位','It\'s not that用于否定一种解释，后面but给出更准确的解释。');
put('question-201428-prompt','tend','v.','倾向于；往往会','tended为过去式，tend to表示行为倾向。');
// The prompt has both is (passive) and be (linking): each form has its own role.
formContexts['question-201427-prompt'].is=sentenceContexts['question-201427-prompt'].be;
delete sentenceContexts['question-201427-prompt'].be;
