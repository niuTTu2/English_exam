import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, reviewedPhrases, type LexiconRow, type PhraseRow } from "./2011-content-helpers";
const rows:LexiconRow[] = [
  [
    "achieve",
    "achieves achieved achieving",
    "v.",
    "实现；达到",
    "achieving the ideal指实现任人唯贤的理想。",
    "achieve an ideal（实现理想）",
    "achievement是名词，achieve是动作。"
  ],
  [
    "anticipate",
    "anticipates anticipated anticipating",
    "v.",
    "预料；预见",
    "选项说预见法律结果，并非雷丁说配额的作用。",
    "anticipate a result（预见结果）",
    "anticipate不等于实际实现。"
  ],
  [
    "appeal",
    "appeals appealed appealing",
    "n.",
    "呼吁；倡议",
    "her appeal指雷丁要求企业自愿增加女性董事的呼吁。",
    "make an appeal（发出呼吁）",
    "本处不是吸引力，也不是上诉。"
  ],
  [
    "approval",
    "",
    "n.",
    "赞成；认可",
    "作者虽有保留，仍支持现实中的临时强制安排。",
    "express approval（表示赞成）",
    "approval名词，approve动词。"
  ],
  [
    "balance",
    "balances balanced balancing",
    "v./n.",
    "平衡；使平衡",
    "gender balance是名词，balance work and family是动词。",
    "balance work and family（平衡工作和家庭）",
    "按当前来源分别辨明动作和状态。"
  ],
  [
    "bear",
    "bears bore born borne bearing",
    "v.",
    "产生；使诞生",
    "was born of frustration整体表示源于受挫。",
    "be born of frustration（源于挫败感）",
    "born为bear的过去分词，在此作被动引申表达。"
  ],
  [
    "board",
    "boards",
    "n.",
    "董事会",
    "企业最高治理机构，本文讨论女性席位占比。",
    "corporate boards（公司董事会）",
    "不是木板或登机的意思。"
  ],
  [
    "break",
    "breaks broke broken breaking",
    "v.",
    "突破；打破",
    "break through搭配说明突破女性晋升障碍。",
    "break through a barrier（突破障碍）",
    "本处不是坏消息传出或物品摔碎。"
  ],
  [
    "business",
    "businesses",
    "n.",
    "商业；企业",
    "top business positions指企业高层职位。",
    "business positions（企业职位）",
    "business可指企业活动，本句与高层职位相连。"
  ],
  [
    "call",
    "calls called calling",
    "n.",
    "呼吁",
    "a call to voluntary action是采取自愿行动的呼吁。",
    "a call to action（行动号召）",
    "call名词后说明呼吁做什么，不是电话。"
  ],
  [
    "capable",
    "",
    "adj.",
    "有能力的",
    "the capable指有能力的人，meritocracy主张由他们治理。",
    "a capable person（有能力的人）",
    "the加形容词可指一类人，不表示只有一个人。"
  ],
  [
    "caregiver",
    "caregivers",
    "n.",
    "照护者",
    "帮助照看高管子女的人，也应得到公共政策支持。",
    "children's caregivers（儿童照护者）",
    "caregiver是照护的人，不是被照护者。"
  ],
  [
    "cent",
    "cents",
    "n.",
    "百分之一（per cent组成）",
    "per cent为百分比写法，14 per cent就是14%。",
    "per cent（百分之……）",
    "不能在比例中按货币分理解。"
  ],
  [
    "ceo",
    "ceos",
    "n.（职务缩写）",
    "首席执行官",
    "CEOs与caregivers并列，说明政策应覆盖不同职业女性。",
    "company CEOs（公司首席执行官）",
    "CEO为chief executive officer的缩写；复数CEOs仍回到CEO。"
  ],
  [
    "child",
    "children child's children's",
    "n.",
    "孩子",
    "their children's caregivers指她们孩子的照护者。",
    "children's caregivers（孩子们的照护者）",
    "children是不规则复数，children's是其所有格。"
  ],
  [
    "climb",
    "climbs climbed climbing",
    "v.",
    "攀登；逐步晋升",
    "climb the corporate ladder比喻在公司逐级晋升。",
    "climb the corporate ladder（在企业逐级晋升）",
    "此处不是实际爬梯子。"
  ],
  [
    "compel",
    "compels compelled compelling",
    "v.",
    "强迫；迫使",
    "通过法律强制企业维持女性董事比例。",
    "compel someone to act（迫使某人行动）",
    "compel强调强制，与voluntary相反。"
  ],
  [
    "consider",
    "considers considered considering",
    "v.",
    "考虑；认为",
    "consider legislation是考虑立法；appeal considered a failure是认为失败。",
    "consider a proposal（考虑一项提议）",
    "consider doing而非consider to do；被动后可接宾补留下的表语式信息。"
  ],
  [
    "corporate",
    "",
    "adj.",
    "公司的；企业的",
    "修饰workplace、boards和power。",
    "corporate governance（公司治理）",
    "corporate为形容词，corporation是公司名词。"
  ],
  [
    "corporate-governance",
    "",
    "复合定语",
    "公司治理的",
    "整体修饰positions，指企业治理层职位。",
    "corporate-governance positions（公司治理职位）",
    "保留原卷连字符，不另译成管辖政府。"
  ],
  [
    "counter",
    "",
    "adv.",
    "相反地；背道而驰地",
    "run counter to说明配额与任人唯贤理念冲突。",
    "run counter to a belief（与信念相悖）",
    "此处不是柜台名词。"
  ],
  [
    "decision",
    "decisions",
    "n.",
    "决定；决策",
    "senior management decisions指企业高层作出的决策。",
    "management decisions（管理决策）",
    "不是法院裁决。"
  ],
  [
    "either",
    "",
    "adv.",
    "也（用于否定句）",
    "I don't like quotas either表示作者也不喜欢配额。",
    "not like it either（也不喜欢它）",
    "不是两者任一个的代词用法。"
  ],
  [
    "enter",
    "enters entered entering",
    "v.",
    "进入",
    "entering top management说明女性进入高层。",
    "enter management（进入管理层）",
    "enter作及物动词时通常不再加into表示进入地点。"
  ],
  [
    "equality",
    "",
    "n.",
    "平等",
    "配额希望促进性别平等。",
    "gender equality（性别平等）",
    "equality平等，equity常强调公平和公正。"
  ],
  [
    "europe",
    "europe's",
    "proper n.",
    "欧洲",
    "Europe's为欧洲的所有格，不能另建原形。",
    "Europe's companies（欧洲的公司）",
    "专名保留来源大小写，词表按统一规范检索。"
  ],
  [
    "european",
    "",
    "adj.",
    "欧洲的",
    "修饰企业董事会及欧盟机构名称。",
    "European companies（欧洲公司）",
    "European作定语时不是欧洲人名词。"
  ],
  [
    "facebook",
    "",
    "proper n.",
    "脸书",
    "原文提到桑德伯格在Facebook担任高管的例子。",
    "at Facebook（在脸书公司）",
    "专名只作历史文章语境识别。"
  ],
  [
    "fair",
    "fairer fairest",
    "adj.",
    "公平的；公正的",
    "a fairer world指比现实更公平的世界。",
    "a fairer world（更公平的世界）",
    "fairer是比较级，不另作词条原形。"
  ],
  [
    "fairly",
    "",
    "adv.",
    "公平地",
    "公平晋升，不是相当程度的副词义。",
    "compete fairly（公平竞争）",
    "fairly也可表相当，本句修饰晋升方式。"
  ],
  [
    "family-friendly",
    "",
    "adj.",
    "有利于家庭的",
    "职场安排照顾员工的家庭责任。",
    "a family-friendly workplace（照顾家庭需要的职场）",
    "连字符整体作形容词，不是副词。"
  ],
  [
    "female",
    "",
    "adj.",
    "女性的",
    "女性董事席位在本文比例低。",
    "female board members（女性董事）",
    "作名词定语，不能简单理解为女性总人数。"
  ],
  [
    "final",
    "",
    "adj.",
    "最后的；最终的",
    "have the final say指拥有最终决定权。",
    "the final say（最终决定权）",
    "say在搭配中为名词，不是说话动作。"
  ],
  [
    "four",
    "",
    "num.",
    "四",
    "four decades指四十年。",
    "four decades（四十年）",
    "decade每个是十年，不能当四年。"
  ],
  [
    "gender-equality",
    "",
    "复合定语",
    "性别平等的",
    "与heaven组成理想平等环境的比喻。",
    "gender-equality policies（性别平等政策）",
    "连字符连接名词成整体修饰语。"
  ],
  [
    "get",
    "gets got gotten getting",
    "v.",
    "获得；促成",
    "get action是促成行动；get positions是获得职位。",
    "get action（促成行动）",
    "不是get over克服的结构。"
  ],
  [
    "governance",
    "",
    "n.",
    "治理",
    "公司治理包括高层决策与董事会安排。",
    "corporate governance（公司治理）",
    "government通常指政府，governance指治理过程。"
  ],
  [
    "headline",
    "headlines",
    "n.",
    "新闻标题；头条",
    "女性进入高层会成为引人关注的新闻。",
    "make headlines（成为头条新闻）",
    "不是个人的头衔title。"
  ],
  [
    "heaven",
    "heavens",
    "n.",
    "天堂；理想之地",
    "gender-equality heaven比喻性别已完全平等的理想环境。",
    "a heaven for equality（平等的理想之地）",
    "开篇是否定这一理想状态，不能忽略not。"
  ],
  [
    "highly",
    "",
    "adv.",
    "高度地；非常",
    "修饰capable，表示能力很强。",
    "highly capable（非常有能力的）",
    "highly是副词，不把派生词强并为high的屈折变化。"
  ],
  [
    "hire",
    "hires hired hiring",
    "v.",
    "雇用；招聘",
    "hiring women说明招聘女性，文章反对回避任人唯贤。",
    "hire capable people（雇用有能力的人）",
    "hiring是动名词形式，仍保留动作内容。"
  ],
  [
    "hold",
    "holds held holding",
    "v.",
    "占有；担任",
    "women hold positions指女性占据董事席位。",
    "hold a position（担任职位）",
    "不是手里举着某物。"
  ],
  [
    "ideal",
    "ideals",
    "n.",
    "理想",
    "meritocratic ideal指任人唯贤的理想制度。",
    "achieve an ideal（实现理想）",
    "本处是名词，非理想的形容词。"
  ],
  [
    "intend",
    "intends intended intending",
    "v.",
    "打算；计划",
    "intended legislation表示计划中的立法。",
    "intend to act（打算行动）",
    "planned不是已完成。"
  ],
  [
    "issue",
    "issues issued issuing",
    "v.",
    "发布；发出",
    "issued a call是发出呼吁。",
    "issue a call（发出呼吁）",
    "不是问题名词issue。"
  ],
  [
    "just",
    "",
    "adj.",
    "公正的；公平的",
    "a more just society指更公正的社会。",
    "a just society（公正的社会）",
    "此处不是仅仅的副词just。"
  ],
  [
    "justice",
    "",
    "n.",
    "公正；正义",
    "more social justice为选项中的社会公平概括。",
    "social justice（社会公正）",
    "本选项不是司法机关。"
  ],
  [
    "lack",
    "lacks lacked lacking",
    "n.",
    "缺乏；不足",
    "due to the lack of询问缺少什么条件。",
    "a lack of support（缺乏支持）",
    "有of连接缺少的对象，这里是名词。"
  ],
  [
    "lead",
    "",
    "n.",
    "领先；主导地位",
    "take the lead指带头或起主导作用。",
    "take the lead（起主导作用）",
    "不是导致的动词lead。"
  ],
  [
    "like",
    "likes liked liking",
    "v.",
    "喜欢",
    "作者和雷丁不喜欢配额本身但认可其效果。",
    "like the result（喜欢结果）",
    "本处不是像的介词。"
  ],
  [
    "live",
    "lives lived living",
    "v.",
    "生活；居住",
    "living in a more just society说明能干的人生活的社会环境。",
    "live in a just society（生活在公正社会中）",
    "分词限定person，不是主句谓语。"
  ],
  [
    "look",
    "looks looked looking",
    "v.",
    "看起来；显得",
    "it does look as if引出作者的判断，does强调。",
    "look as if something is true（看起来仿佛某事属实）",
    "不是回顾或寻找的动词义。"
  ],
  [
    "male",
    "",
    "adj.",
    "男性的",
    "positions remain male指任职者仍大多为男性。",
    "male-dominated management（男性主导的管理层）",
    "不是把职位本身当男性生物。"
  ],
  [
    "mandate",
    "mandates",
    "n.",
    "强制规定；命令",
    "proposed mandate指拟议的法律强制措施。",
    "a legal mandate（法律强制规定）",
    "这里有this修饰作名词，不是动词要求。"
  ],
  [
    "massive",
    "",
    "adj.",
    "大量的；巨大的",
    "massive attention形容关注很多。",
    "massive attention（大量关注）",
    "不能把已很多的关注说成缺少关注。"
  ],
  [
    "membership",
    "",
    "n.",
    "成员身份；成员席位",
    "female board membership表示女性在董事会成员中的占比。",
    "board membership（董事会成员席位）",
    "百分比所说的是成员构成，不是全体员工。"
  ],
  [
    "meritocracy",
    "meritocracies",
    "n.",
    "任人唯贤；能者治理的制度",
    "原文用governance by the capable直接解释。",
    "belief in meritocracy（信奉任人唯贤）",
    "merit看能力与才干，不是按性别机械分配。"
  ],
  [
    "meritocratic",
    "",
    "adj.",
    "任人唯贤的；按才能选拔的",
    "修饰理想及招聘晋升方式。",
    "meritocratic promotion（按才能晋升）",
    "是meritocracy的派生词，不计作它的屈折变化。"
  ],
  [
    "newsworthy",
    "",
    "adj.",
    "有新闻价值的",
    "no more newsworthy than指不比别人更值得报道。",
    "a newsworthy event（有新闻价值的事件）",
    "不是说完全没有新闻价值。"
  ],
  [
    "objectiveness",
    "",
    "n.",
    "客观性",
    "态度题干扰项，作者实际表达了支持判断。",
    "objectiveness of a report（报道的客观性）",
    "保留原卷objectiveness写法，不换成objectivity。"
  ],
  [
    "obstacle",
    "obstacles",
    "n.",
    "障碍",
    "阻碍任人唯贤理想实现的现实制度问题。",
    "obstacles to equality（平等的障碍）",
    "to是介词，后接名词或doing。"
  ],
  [
    "open",
    "opens opened opening",
    "v.",
    "打开；开辟",
    "open the way表示为平等开路。",
    "open the way to equality（为平等开路）",
    "不是开放的形容词。"
  ],
  [
    "order",
    "orders ordered ordering",
    "v.",
    "命令；强制安排",
    "ordered说通过暂时的强制措施建立公平条件。",
    "order a change（下令改变）",
    "不是订单名词，也不是餐馆点菜。"
  ],
  [
    "overwhelm",
    "overwhelms overwhelmed overwhelming",
    "v.",
    "压倒；使不堪重负",
    "第36题C的overwhelmed改变了原文overwhelmingly male的意思。",
    "be overwhelmed（不堪重负）",
    "overwhelmingly是副词，不能与被动overwhelmed互换。"
  ],
  [
    "overwhelmingly",
    "",
    "adv.",
    "压倒性地；绝大多数地",
    "修饰male，说明男性比例非常高。",
    "overwhelmingly male（绝大多数为男性）",
    "副词本身不表示公司治理已被压垮。"
  ],
  [
    "per",
    "",
    "prep.",
    "每；按每单位",
    "per cent为每一百份中的若干份。",
    "per cent（百分之……）",
    "原卷分写per cent，与percent同为百分比表达。"
  ],
  [
    "personally",
    "",
    "adv.",
    "就个人而言",
    "雷丁强调个人对配额的偏好，与对效果的判断区分。",
    "personally speaking（就个人而言）",
    "这里不是亲自去做某动作。"
  ],
  [
    "place",
    "places placed placing",
    "v./n.",
    "安排；位置",
    "placing women说明安排女性任职；in place说明政策到位。",
    "place someone in a position（安排某人任职）",
    "按来源区分动词安排与名词位置。"
  ],
  [
    "position",
    "positions",
    "n.",
    "职位；地位",
    "全文讨论企业高层职位和董事会席位。",
    "top positions（高层职位）",
    "不是地理位置或个人观点。"
  ],
  [
    "power",
    "powers",
    "n.",
    "权力",
    "corporate power指企业决策权力。",
    "corporate power（企业权力）",
    "不是电力，也不只是体力。"
  ],
  [
    "president",
    "presidents",
    "n.",
    "主席",
    "Vice President指欧盟委员会副主席。",
    "Vice President（副主席）",
    "不是大学校长的语境。"
  ],
  [
    "promotion",
    "promotions",
    "n.",
    "晋升；提拔",
    "women to top positions说明女性向高层晋升。",
    "promotion to management（晋升管理层）",
    "不是产品的商业推广。"
  ],
  [
    "provision",
    "provisions",
    "n.",
    "规定；条款",
    "legally binding provisions是具有法律约束力的规定。",
    "binding provisions（有约束力的条款）",
    "本处不是提供物资的供应义。"
  ],
  [
    "put",
    "puts putting",
    "v.",
    "施加",
    "put pressure upon companies说明对企业施压。",
    "put pressure on someone（向某人施压）",
    "不能译成涂抹或摆放具体物件。"
  ],
  [
    "quota",
    "quotas",
    "n.",
    "配额；定额",
    "这里为董事会中女性席位设定比例要求。",
    "gender quotas（性别配额）",
    "quota是制度性名额要求，不是当前实际占比。"
  ],
  [
    "reding",
    "reding's",
    "proper n.",
    "雷丁",
    "Viviane Reding为原文引用的欧盟官员姓氏。",
    "Reding's appeal（雷丁的呼吁）",
    "所有格不另建词条，不将姓氏当动词reading。"
  ],
  [
    "reflection",
    "reflections",
    "n.",
    "反映；体现",
    "选项说立法体现性别平衡，现实却仍失衡。",
    "a reflection of reality（现实的反映）",
    "此处不是镜面倒影。"
  ],
  [
    "reluctance",
    "",
    "n.",
    "不情愿；勉强",
    "理解雷丁对强制配额本身的保留。",
    "show reluctance（表现出不情愿）",
    "保留态度不自动等于反对最后的措施。"
  ],
  [
    "reluctant",
    "",
    "adj.",
    "不情愿的；勉强的",
    "自愿倡议失败后，不得不考虑强制方案。",
    "a reluctant choice（不情愿的选择）",
    "reluctant描述主观犹豫，并不否认采取行动。"
  ],
  [
    "rule",
    "rules",
    "n.",
    "常态；通常情况",
    "the exception to the rule表示偏离常态的例外。",
    "the exception to the rule（常态中的例外）",
    "这里不是法院作出裁决的动词rule。"
  ],
  [
    "run",
    "runs ran running",
    "v.",
    "处于；沿某方向发展",
    "run counter to整体说与信念相悖。",
    "run counter to a principle（与原则背道而驰）",
    "不是经营公司或跑步。"
  ],
  [
    "sandberg",
    "",
    "proper n.",
    "桑德伯格",
    "Sheryl Sandberg是文中女性高管的例子。",
    "Sheryl Sandberg（谢丽尔·桑德伯格）",
    "专名用于定位，不由个人例子推出所有女性情况。"
  ],
  [
    "say",
    "says said saying",
    "n.",
    "发言权；决定权",
    "have the final say表示能作最终决定。",
    "have the final say（拥有最终决定权）",
    "与said recently的说动词按来源区分。"
  ],
  [
    "see",
    "sees saw seen seeing",
    "v.",
    "看到；见到",
    "result seen in France是观察到的效果；see through出现在错项中。",
    "a result seen in practice（实践中看到的结果）",
    "see through看透不等于break through突破。"
  ],
  [
    "sheryl",
    "",
    "proper n.",
    "谢丽尔",
    "与Sandberg组成女性高管姓名。",
    "Sheryl Sandberg（谢丽尔·桑德伯格）",
    "专名只需识别。"
  ],
  [
    "sign",
    "signs signed signing",
    "v.",
    "签署；报名",
    "sign up for表示承诺参与性别平衡目标。",
    "sign up for a goal（报名承诺一个目标）",
    "不是标志名词。"
  ],
  [
    "soft",
    "",
    "adj.",
    "温和的；非强制性的",
    "soft pressure指劝说等缺乏强制约束的压力。",
    "soft pressure（软性压力）",
    "不是物体触感柔软。"
  ],
  [
    "summit",
    "summits",
    "n.",
    "顶峰",
    "the summit of corporate power比喻企业权力最高层。",
    "the summit of power（权力顶峰）",
    "这里不是国家领导人峰会。"
  ],
  [
    "union",
    "union's",
    "n.",
    "联盟",
    "European Union指欧盟。",
    "the European Union（欧洲联盟）",
    "Union's为所有格，不另算原形。"
  ],
  [
    "vice",
    "",
    "职务前缀",
    "副",
    "Vice President作为职务表示副主席。",
    "Vice President（副主席）",
    "不是恶习或罪恶名词vice。"
  ],
  [
    "viviane",
    "",
    "proper n.",
    "薇薇安",
    "与Reding组成官员姓名。",
    "Viviane Reding（薇薇安·雷丁）",
    "专名保留原文识别。"
  ],
  [
    "work",
    "works worked working",
    "n.",
    "工作",
    "balance work and family中的工作与家庭并列。",
    "balance work and family（平衡工作和家庭）",
    "不是奏效或艺术作品义。"
  ],
  [
    "binding",
    "",
    "adj.",
    "有约束力的",
    "legally binding指规定具有法律约束力。",
    "legally binding provisions（有法律约束力的规定）",
    "不是把纸张装订起来。"
  ],
  [
    "top",
    "",
    "adj.",
    "最高层的",
    "top positions指企业最高层职位。",
    "top positions（高层职位）",
    "作定语限定职位等级，不指顶端这一名词。"
  ],
  [
    "us",
    "",
    "proper n.",
    "美国",
    "the US是United States的缩写。",
    "the US（美国）",
    "此处不是代词us我们。"
  ]
];
const lex=reviewedLexicon(rows);
export const passage2013P4Lexicon=lex.entries;
export const passage2013P4LemmaAliases:Record<string,string>={...lex.aliases,...{
  "achieve": "achieve",
  "achieves": "achieve",
  "achieved": "achieve",
  "achieving": "achieve",
  "anticipate": "anticipate",
  "anticipates": "anticipate",
  "anticipated": "anticipate",
  "anticipating": "anticipate",
  "appeal": "appeal",
  "appeals": "appeal",
  "appealed": "appeal",
  "appealing": "appeal",
  "approval": "approval",
  "balance": "balance",
  "balances": "balance",
  "balanced": "balance",
  "balancing": "balance",
  "bear": "bear",
  "bears": "bear",
  "bore": "bear",
  "born": "bear",
  "borne": "bear",
  "bearing": "bear",
  "board": "board",
  "boards": "board",
  "break": "break",
  "breaks": "break",
  "broke": "break",
  "broken": "break",
  "breaking": "break",
  "business": "business",
  "businesses": "business",
  "call": "call",
  "calls": "call",
  "called": "call",
  "calling": "call",
  "capable": "capable",
  "caregiver": "caregiver",
  "caregivers": "caregiver",
  "cent": "cent",
  "cents": "cent",
  "ceo": "ceo",
  "ceos": "ceo",
  "child": "child",
  "children": "child",
  "child's": "child",
  "children's": "child",
  "climb": "climb",
  "climbs": "climb",
  "climbed": "climb",
  "climbing": "climb",
  "compel": "compel",
  "compels": "compel",
  "compelled": "compel",
  "compelling": "compel",
  "consider": "consider",
  "considers": "consider",
  "considered": "consider",
  "considering": "consider",
  "corporate": "corporate",
  "corporate-governance": "corporate-governance",
  "counter": "counter",
  "decision": "decision",
  "decisions": "decision",
  "either": "either",
  "enter": "enter",
  "enters": "enter",
  "entered": "enter",
  "entering": "enter",
  "equality": "equality",
  "europe": "europe",
  "europe's": "europe",
  "european": "european",
  "facebook": "facebook",
  "fair": "fair",
  "fairer": "fair",
  "fairest": "fair",
  "fairly": "fairly",
  "family-friendly": "family-friendly",
  "female": "female",
  "final": "final",
  "four": "four",
  "gender-equality": "gender-equality",
  "get": "get",
  "gets": "get",
  "got": "get",
  "gotten": "get",
  "getting": "get",
  "governance": "governance",
  "headline": "headline",
  "headlines": "headline",
  "heaven": "heaven",
  "heavens": "heaven",
  "highly": "highly",
  "hire": "hire",
  "hires": "hire",
  "hired": "hire",
  "hiring": "hire",
  "hold": "hold",
  "holds": "hold",
  "held": "hold",
  "holding": "hold",
  "ideal": "ideal",
  "ideals": "ideal",
  "intend": "intend",
  "intends": "intend",
  "intended": "intend",
  "intending": "intend",
  "issue": "issue",
  "issues": "issue",
  "issued": "issue",
  "issuing": "issue",
  "just": "just",
  "justice": "justice",
  "lack": "lack",
  "lacks": "lack",
  "lacked": "lack",
  "lacking": "lack",
  "lead": "lead",
  "like": "like",
  "likes": "like",
  "liked": "like",
  "liking": "like",
  "live": "live",
  "lives": "live",
  "lived": "live",
  "living": "live",
  "look": "look",
  "looks": "look",
  "looked": "look",
  "looking": "look",
  "male": "male",
  "mandate": "mandate",
  "mandates": "mandate",
  "massive": "massive",
  "membership": "membership",
  "meritocracy": "meritocracy",
  "meritocracies": "meritocracy",
  "meritocratic": "meritocratic",
  "newsworthy": "newsworthy",
  "objectiveness": "objectiveness",
  "obstacle": "obstacle",
  "obstacles": "obstacle",
  "open": "open",
  "opens": "open",
  "opened": "open",
  "opening": "open",
  "order": "order",
  "orders": "order",
  "ordered": "order",
  "ordering": "order",
  "overwhelm": "overwhelm",
  "overwhelms": "overwhelm",
  "overwhelmed": "overwhelm",
  "overwhelming": "overwhelm",
  "overwhelmingly": "overwhelmingly",
  "per": "per",
  "personally": "personally",
  "place": "place",
  "places": "place",
  "placed": "place",
  "placing": "place",
  "position": "position",
  "positions": "position",
  "power": "power",
  "powers": "power",
  "president": "president",
  "presidents": "president",
  "promotion": "promotion",
  "promotions": "promotion",
  "provision": "provision",
  "provisions": "provision",
  "put": "put",
  "puts": "put",
  "putting": "put",
  "quota": "quota",
  "quotas": "quota",
  "reding": "reding",
  "reding's": "reding",
  "reflection": "reflection",
  "reflections": "reflection",
  "reluctance": "reluctance",
  "reluctant": "reluctant",
  "rule": "rule",
  "rules": "rule",
  "run": "run",
  "runs": "run",
  "ran": "run",
  "running": "run",
  "sandberg": "sandberg",
  "say": "say",
  "says": "say",
  "said": "say",
  "saying": "say",
  "see": "see",
  "sees": "see",
  "saw": "see",
  "seen": "see",
  "seeing": "see",
  "sheryl": "sheryl",
  "sign": "sign",
  "signs": "sign",
  "signed": "sign",
  "signing": "sign",
  "soft": "soft",
  "summit": "summit",
  "summits": "summit",
  "union": "union",
  "union's": "union",
  "vice": "vice",
  "viviane": "viviane",
  "work": "work",
  "works": "work",
  "worked": "work",
  "working": "work",
  "binding": "binding",
  "top": "top",
  "us": "us",
  "don't": "do"
}};
export const passage2013P4SentenceContexts:Record<string,Record<string,SentenceWordContext>> = {
  "2013-p4-s1": {
    "europe": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "欧洲",
      "use": "Europe's为欧洲的所有格，不能另建原形。",
      "preferredCollocations": [
        "Europe's companies"
      ]
    },
    "gender-equality": {
      "partOfSpeech": "复合定语",
      "contextualMeaning": "性别平等的",
      "use": "与heaven组成理想平等环境的比喻。",
      "preferredCollocations": [
        "gender-equality policies"
      ]
    },
    "heaven": {
      "partOfSpeech": "n.",
      "contextualMeaning": "天堂；理想之地",
      "use": "gender-equality heaven比喻性别已完全平等的理想环境。",
      "preferredCollocations": [
        "a heaven for equality"
      ]
    }
  },
  "2013-p4-s2": {
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "family-friendly": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有利于家庭的",
      "use": "职场安排照顾员工的家庭责任。",
      "preferredCollocations": [
        "a family-friendly workplace"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "senior management decisions指企业高层作出的决策。",
      "preferredCollocations": [
        "management decisions"
      ]
    },
    "europe": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "欧洲",
      "use": "Europe's为欧洲的所有格，不能另建原形。",
      "preferredCollocations": [
        "Europe's companies"
      ]
    },
    "top": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最高层的",
      "use": "top positions指企业最高层职位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "corporate-governance": {
      "partOfSpeech": "复合定语",
      "contextualMeaning": "公司治理的",
      "use": "整体修饰positions，指企业治理层职位。",
      "preferredCollocations": [
        "corporate-governance positions"
      ]
    },
    "position": {
      "partOfSpeech": "n.",
      "contextualMeaning": "职位；地位",
      "use": "全文讨论企业高层职位和董事会席位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "overwhelmingly": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "压倒性地；绝大多数地",
      "use": "修饰male，说明男性比例非常高。",
      "preferredCollocations": [
        "overwhelmingly male"
      ]
    },
    "male": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "男性的",
      "use": "positions remain male指任职者仍大多为男性。",
      "preferredCollocations": [
        "male-dominated management"
      ]
    },
    "until": {
      "partOfSpeech": "conj.",
      "contextualMeaning": "直到……才（与否定主句连用）",
      "use": "never...until把女性参与高层决策作为实现家庭友好职场的必要条件，until后是完整主谓。"
    }
  },
  "2013-p4-s3": {
    "hold": {
      "partOfSpeech": "v.",
      "contextualMeaning": "占有；担任",
      "use": "women hold positions指女性占据董事席位。",
      "preferredCollocations": [
        "hold a position"
      ]
    },
    "per": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "每；按每单位",
      "use": "per cent为每一百份中的若干份。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "cent": {
      "partOfSpeech": "n.",
      "contextualMeaning": "百分之一（per cent组成）",
      "use": "per cent为百分比写法，14 per cent就是14%。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "position": {
      "partOfSpeech": "n.",
      "contextualMeaning": "职位；地位",
      "use": "全文讨论企业高层职位和董事会席位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "european": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "欧洲的",
      "use": "修饰企业董事会及欧盟机构名称。",
      "preferredCollocations": [
        "European companies"
      ]
    },
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "board": {
      "partOfSpeech": "n.",
      "contextualMeaning": "董事会",
      "use": "企业最高治理机构，本文讨论女性席位占比。",
      "preferredCollocations": [
        "corporate boards"
      ]
    }
  },
  "2013-p4-s4": {
    "european": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "欧洲的",
      "use": "修饰企业董事会及欧盟机构名称。",
      "preferredCollocations": [
        "European companies"
      ]
    },
    "union": {
      "partOfSpeech": "n.",
      "contextualMeaning": "联盟",
      "use": "European Union指欧盟。",
      "preferredCollocations": [
        "the European Union"
      ]
    },
    "consider": {
      "partOfSpeech": "v.",
      "contextualMeaning": "考虑",
      "use": "把提议或现实障碍纳入考虑，不是把某物认定为某种性质。",
      "preferredCollocations": [
        "consider a proposal"
      ]
    },
    "compel": {
      "partOfSpeech": "v.",
      "contextualMeaning": "强迫；迫使",
      "use": "通过法律强制企业维持女性董事比例。",
      "preferredCollocations": [
        "compel someone to act"
      ]
    },
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "board": {
      "partOfSpeech": "n.",
      "contextualMeaning": "董事会",
      "use": "企业最高治理机构，本文讨论女性席位占比。",
      "preferredCollocations": [
        "corporate boards"
      ]
    },
    "per": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "每；按每单位",
      "use": "per cent为每一百份中的若干份。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "cent": {
      "partOfSpeech": "n.",
      "contextualMeaning": "百分之一（per cent组成）",
      "use": "per cent为百分比写法，14 per cent就是14%。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "certain": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "某一；某种",
      "use": "a certain proportion是一定比例，不是确信。"
    }
  },
  "2013-p4-s5": {
    "mandate": {
      "partOfSpeech": "n.",
      "contextualMeaning": "强制规定；命令",
      "use": "proposed mandate指拟议的法律强制措施。",
      "preferredCollocations": [
        "a legal mandate"
      ]
    },
    "bear": {
      "partOfSpeech": "v.",
      "contextualMeaning": "产生；使诞生",
      "use": "was born of frustration整体表示源于受挫。",
      "preferredCollocations": [
        "be born of frustration"
      ]
    }
  },
  "2013-p4-s6": {
    "european": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "欧洲的",
      "use": "修饰企业董事会及欧盟机构名称。",
      "preferredCollocations": [
        "European companies"
      ]
    },
    "vice": {
      "partOfSpeech": "职务前缀",
      "contextualMeaning": "副",
      "use": "Vice President作为职务表示副主席。",
      "preferredCollocations": [
        "Vice President"
      ]
    },
    "president": {
      "partOfSpeech": "n.",
      "contextualMeaning": "主席",
      "use": "Vice President指欧盟委员会副主席。",
      "preferredCollocations": [
        "Vice President"
      ]
    },
    "viviane": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "薇薇安",
      "use": "与Reding组成官员姓名。",
      "preferredCollocations": [
        "Viviane Reding"
      ]
    },
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "issue": {
      "partOfSpeech": "v.",
      "contextualMeaning": "发布；发出",
      "use": "issued a call是发出呼吁。",
      "preferredCollocations": [
        "issue a call"
      ]
    },
    "call": {
      "partOfSpeech": "n.",
      "contextualMeaning": "呼吁",
      "use": "a call to voluntary action是采取自愿行动的呼吁。",
      "preferredCollocations": [
        "a call to action"
      ]
    },
    "last": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "上一个的",
      "use": "Last year是上一年，不是最后一个年份。"
    }
  },
  "2013-p4-s7": {
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "sign": {
      "partOfSpeech": "v.",
      "contextualMeaning": "签署；报名",
      "use": "sign up for表示承诺参与性别平衡目标。",
      "preferredCollocations": [
        "sign up for a goal"
      ]
    },
    "balance": {
      "partOfSpeech": "n.",
      "contextualMeaning": "平衡",
      "use": "gender balance是两性构成上的平衡。",
      "preferredCollocations": [
        "balance work and family"
      ]
    },
    "per": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "每；按每单位",
      "use": "per cent为每一百份中的若干份。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "cent": {
      "partOfSpeech": "n.",
      "contextualMeaning": "百分之一（per cent组成）",
      "use": "per cent为百分比写法，14 per cent就是14%。",
      "preferredCollocations": [
        "per cent"
      ]
    },
    "female": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "女性的",
      "use": "女性董事席位在本文比例低。",
      "preferredCollocations": [
        "female board members"
      ]
    },
    "board": {
      "partOfSpeech": "n.",
      "contextualMeaning": "董事会",
      "use": "企业最高治理机构，本文讨论女性席位占比。",
      "preferredCollocations": [
        "corporate boards"
      ]
    },
    "membership": {
      "partOfSpeech": "n.",
      "contextualMeaning": "成员身份；成员席位",
      "use": "female board membership表示女性在董事会成员中的占比。",
      "preferredCollocations": [
        "board membership"
      ]
    }
  },
  "2013-p4-s8": {
    "appeal": {
      "partOfSpeech": "n.",
      "contextualMeaning": "呼吁；倡议",
      "use": "her appeal指雷丁要求企业自愿增加女性董事的呼吁。",
      "preferredCollocations": [
        "make an appeal"
      ]
    },
    "consider": {
      "partOfSpeech": "v.",
      "contextualMeaning": "认为；视为",
      "use": "被动was considered后a failure说明这项呼吁被认为失败。",
      "preferredCollocations": [
        "consider a proposal"
      ]
    },
    "take": {
      "partOfSpeech": "v.",
      "contextualMeaning": "接受；响应",
      "use": "took it up指响应自愿倡议，不能套用take up占用时间。"
    }
  },
  "2013-p4-s9": {
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    },
    "climb": {
      "partOfSpeech": "v.",
      "contextualMeaning": "攀登；逐步晋升",
      "use": "climb the corporate ladder比喻在公司逐级晋升。",
      "preferredCollocations": [
        "climb the corporate ladder"
      ]
    },
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "fairly": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "公平地",
      "use": "公平晋升，不是相当程度的副词义。",
      "preferredCollocations": [
        "compete fairly"
      ]
    },
    "balance": {
      "partOfSpeech": "v.",
      "contextualMeaning": "平衡；兼顾",
      "use": "balance work and family是同时兼顾两者。",
      "preferredCollocations": [
        "balance work and family"
      ]
    },
    "work": {
      "partOfSpeech": "n.",
      "contextualMeaning": "工作",
      "use": "work与family是需要平衡的两方面。",
      "preferredCollocations": [
        "balance work and family"
      ]
    },
    "do": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "构成一般疑问句",
      "use": "Do放在主语we之前，need仍为实义动词。"
    },
    "as": {
      "partOfSpeech": "conj.",
      "contextualMeaning": "当……时；在……的同时",
      "use": "女性兼顾家庭工作时应能公平晋升。"
    }
  },
  "2013-p4-s10": {
    "personally": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "就个人而言",
      "use": "雷丁强调个人对配额的偏好，与对效果的判断区分。",
      "preferredCollocations": [
        "personally speaking"
      ]
    },
    "like": {
      "partOfSpeech": "v.",
      "contextualMeaning": "喜欢",
      "use": "作者和雷丁不喜欢配额本身但认可其效果。",
      "preferredCollocations": [
        "like the result"
      ]
    },
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    },
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "say": {
      "partOfSpeech": "v.",
      "contextualMeaning": "说",
      "use": "said引出雷丁的原话，是say的过去式。",
      "preferredCollocations": [
        "have the final say"
      ]
    },
    "do": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "构成否定",
      "use": "don't是do not，否定like；不能丢掉not。"
    }
  },
  "2013-p4-s11": {
    "like": {
      "partOfSpeech": "v.",
      "contextualMeaning": "喜欢",
      "use": "作者和雷丁不喜欢配额本身但认可其效果。",
      "preferredCollocations": [
        "like the result"
      ]
    },
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    },
    "do": {
      "partOfSpeech": "v.",
      "contextualMeaning": "做；产生作用",
      "use": "what the quotas do指配额所起的作用。"
    }
  },
  "2013-p4-s12": {
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    },
    "get": {
      "partOfSpeech": "v.",
      "contextualMeaning": "促成；使发生",
      "use": "get action指配额促成实际行动。",
      "preferredCollocations": [
        "get action"
      ]
    },
    "open": {
      "partOfSpeech": "v.",
      "contextualMeaning": "打开；开辟",
      "use": "open the way表示为平等开路。",
      "preferredCollocations": [
        "open the way to equality"
      ]
    },
    "equality": {
      "partOfSpeech": "n.",
      "contextualMeaning": "平等",
      "use": "配额希望促进性别平等。",
      "preferredCollocations": [
        "gender equality"
      ]
    },
    "break": {
      "partOfSpeech": "v.",
      "contextualMeaning": "突破；打破",
      "use": "break through搭配说明突破女性晋升障碍。",
      "preferredCollocations": [
        "break through a barrier"
      ]
    },
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "see": {
      "partOfSpeech": "v.",
      "contextualMeaning": "看到；见到",
      "use": "result seen in France是观察到的效果；see through出现在错项中。",
      "preferredCollocations": [
        "a result seen in practice"
      ]
    },
    "binding": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有约束力的",
      "use": "legally binding指规定具有法律约束力。",
      "preferredCollocations": [
        "legally binding provisions"
      ]
    },
    "provision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "规定；条款",
      "use": "legally binding provisions是具有法律约束力的规定。",
      "preferredCollocations": [
        "binding provisions"
      ]
    },
    "place": {
      "partOfSpeech": "v.",
      "contextualMeaning": "安排；安置",
      "use": "placing women in top positions为安排女性进入高层。",
      "preferredCollocations": [
        "place someone in a position"
      ]
    },
    "top": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最高层的",
      "use": "top positions指企业最高层职位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "business": {
      "partOfSpeech": "n.",
      "contextualMeaning": "商业；企业",
      "use": "top business positions指企业高层职位。",
      "preferredCollocations": [
        "business positions"
      ]
    },
    "position": {
      "partOfSpeech": "n.",
      "contextualMeaning": "职位；地位",
      "use": "全文讨论企业高层职位和董事会席位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "way": {
      "partOfSpeech": "n.",
      "contextualMeaning": "道路；途径",
      "use": "open the way to equality比喻为实现平等开路。"
    },
    "according": {
      "partOfSpeech": "介词短语组成",
      "contextualMeaning": "根据；按照",
      "use": "according to作为整体说明观点来自雷丁。"
    }
  },
  "2013-p4-s13": {
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "reluctance": {
      "partOfSpeech": "n.",
      "contextualMeaning": "不情愿；勉强",
      "use": "理解雷丁对强制配额本身的保留。",
      "preferredCollocations": [
        "show reluctance"
      ]
    }
  },
  "2013-p4-s14": {
    "like": {
      "partOfSpeech": "v.",
      "contextualMeaning": "喜欢",
      "use": "作者和雷丁不喜欢配额本身但认可其效果。",
      "preferredCollocations": [
        "like the result"
      ]
    },
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    },
    "either": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "也（用于否定句）",
      "use": "I don't like quotas either表示作者也不喜欢配额。",
      "preferredCollocations": [
        "not like it either"
      ]
    },
    "run": {
      "partOfSpeech": "v.",
      "contextualMeaning": "处于；沿某方向发展",
      "use": "run counter to整体说与信念相悖。",
      "preferredCollocations": [
        "run counter to a principle"
      ]
    },
    "counter": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "相反地；背道而驰地",
      "use": "run counter to说明配额与任人唯贤理念冲突。",
      "preferredCollocations": [
        "run counter to a belief"
      ]
    },
    "meritocracy": {
      "partOfSpeech": "n.",
      "contextualMeaning": "任人唯贤；能者治理的制度",
      "use": "原文用governance by the capable直接解释。",
      "preferredCollocations": [
        "belief in meritocracy"
      ]
    },
    "governance": {
      "partOfSpeech": "n.",
      "contextualMeaning": "治理",
      "use": "公司治理包括高层决策与董事会安排。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "capable": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有能力的",
      "use": "the capable指有能力的人，meritocracy主张由他们治理。",
      "preferredCollocations": [
        "a capable person"
      ]
    },
    "do": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "构成否定",
      "use": "don't是do not，否定like；不能丢掉not。"
    }
  },
  "2013-p4-s15": {
    "consider": {
      "partOfSpeech": "v.",
      "contextualMeaning": "考虑",
      "use": "把提议或现实障碍纳入考虑，不是把某物认定为某种性质。",
      "preferredCollocations": [
        "consider a proposal"
      ]
    },
    "obstacle": {
      "partOfSpeech": "n.",
      "contextualMeaning": "障碍",
      "use": "阻碍任人唯贤理想实现的现实制度问题。",
      "preferredCollocations": [
        "obstacles to equality"
      ]
    },
    "achieve": {
      "partOfSpeech": "v.",
      "contextualMeaning": "实现；达到",
      "use": "achieving the ideal指实现任人唯贤的理想。",
      "preferredCollocations": [
        "achieve an ideal"
      ]
    },
    "meritocratic": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "任人唯贤的；按才能选拔的",
      "use": "修饰理想及招聘晋升方式。",
      "preferredCollocations": [
        "meritocratic promotion"
      ]
    },
    "ideal": {
      "partOfSpeech": "n.",
      "contextualMeaning": "理想",
      "use": "meritocratic ideal指任人唯贤的理想制度。",
      "preferredCollocations": [
        "achieve an ideal"
      ]
    },
    "look": {
      "partOfSpeech": "v.",
      "contextualMeaning": "看起来；显得",
      "use": "it does look as if引出作者的判断，does强调。",
      "preferredCollocations": [
        "look as if something is true"
      ]
    },
    "fair": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公平的；公正的",
      "use": "a fairer world指比现实更公平的世界。",
      "preferredCollocations": [
        "a fairer world"
      ]
    },
    "order": {
      "partOfSpeech": "v.",
      "contextualMeaning": "命令；强制安排",
      "use": "ordered说通过暂时的强制措施建立公平条件。",
      "preferredCollocations": [
        "order a change"
      ]
    },
    "one": {
      "partOfSpeech": "pron.",
      "contextualMeaning": "一个人；任何人",
      "use": "one是泛指思考这些现实的人，不表示数目一。"
    },
    "do": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "强调确实如此",
      "use": "does look强调确实看起来，实义谓语仍为look。"
    },
    "as": {
      "partOfSpeech": "固定连接结构组成",
      "contextualMeaning": "as if中的组成作用",
      "use": "as if整体引出look后的判断内容，表示看起来好像；不按作为理解单独的as。"
    },
    "if": {
      "partOfSpeech": "固定连接结构组成",
      "contextualMeaning": "as if中的组成作用",
      "use": "与as组成as if，表示仿佛；此处不是独立引出如果条件。"
    },
    "it": {
      "partOfSpeech": "pron.",
      "contextualMeaning": "情境占位，不指具体实体",
      "use": "it does look as if用于表达对局势的判断，it不回指某一个障碍，也不把as if表语从句改称真实主语。"
    }
  },
  "2013-p4-s16": {
    "four": {
      "partOfSpeech": "num.",
      "contextualMeaning": "四",
      "use": "four decades指四十年。",
      "preferredCollocations": [
        "four decades"
      ]
    },
    "europe": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "欧洲",
      "use": "Europe's为欧洲的所有格，不能另建原形。",
      "preferredCollocations": [
        "Europe's companies"
      ]
    },
    "us": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "美国",
      "use": "the US是United States的缩写。",
      "preferredCollocations": [
        "the US"
      ]
    },
    "meritocratic": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "任人唯贤的；按才能选拔的",
      "use": "修饰理想及招聘晋升方式。",
      "preferredCollocations": [
        "meritocratic promotion"
      ]
    },
    "hire": {
      "partOfSpeech": "v.",
      "contextualMeaning": "雇用；招聘",
      "use": "hiring women说明招聘女性，文章反对回避任人唯贤。",
      "preferredCollocations": [
        "hire capable people"
      ]
    },
    "promotion": {
      "partOfSpeech": "n.",
      "contextualMeaning": "晋升；提拔",
      "use": "women to top positions说明女性向高层晋升。",
      "preferredCollocations": [
        "promotion to management"
      ]
    },
    "top": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最高层的",
      "use": "top positions指企业最高层职位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "position": {
      "partOfSpeech": "n.",
      "contextualMeaning": "职位；地位",
      "use": "全文讨论企业高层职位和董事会席位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "soft": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "温和的；非强制性的",
      "use": "soft pressure指劝说等缺乏强制约束的压力。",
      "preferredCollocations": [
        "soft pressure"
      ]
    },
    "put": {
      "partOfSpeech": "v.",
      "contextualMeaning": "施加",
      "use": "put pressure upon companies说明对企业施压。",
      "preferredCollocations": [
        "put pressure on someone"
      ]
    },
    "have": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "构成完成时",
      "use": "has与shown构成现在完成时，不表拥有。"
    },
    "after": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "after all搭配组成",
      "use": "After all整体为毕竟，不表达四十年之后的时间。"
    },
    "all": {
      "partOfSpeech": "pron.",
      "contextualMeaning": "all在after all中的组成作用",
      "use": "after all整体表示毕竟，不拆成所有证据的定语。"
    },
    "well": {
      "partOfSpeech": "固定搭配组成",
      "contextualMeaning": "as well as中的组成作用",
      "use": "as well as连接欧洲和美国，整体为以及，不比较好坏。"
    },
    "as": {
      "partOfSpeech": "固定搭配组成",
      "contextualMeaning": "as well as中的组成作用",
      "use": "as well as整体表示以及，两次as共同构成添加结构。"
    },
    "matter": {
      "partOfSpeech": "v.（让步搭配组成）",
      "contextualMeaning": "重要；要紧",
      "use": "no matter how much整体表示不管压力多大；不能逐字译为没有事情。"
    },
    "upon": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "向……；在……上",
      "use": "put pressure upon them向这些公司施压。"
    },
    "no": {
      "partOfSpeech": "固定让步结构组成",
      "contextualMeaning": "no matter中的组成作用",
      "use": "no matter how much整体表示无论有多少，no不是说完全没有软性压力。"
    }
  },
  "2013-p4-s17": {
    "break": {
      "partOfSpeech": "v.",
      "contextualMeaning": "突破；打破",
      "use": "break through搭配说明突破女性晋升障碍。",
      "preferredCollocations": [
        "break through a barrier"
      ]
    },
    "summit": {
      "partOfSpeech": "n.",
      "contextualMeaning": "顶峰",
      "use": "the summit of corporate power比喻企业权力最高层。",
      "preferredCollocations": [
        "the summit of power"
      ]
    },
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "power": {
      "partOfSpeech": "n.",
      "contextualMeaning": "权力",
      "use": "corporate power指企业决策权力。",
      "preferredCollocations": [
        "corporate power"
      ]
    },
    "sheryl": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "谢丽尔",
      "use": "与Sandberg组成女性高管姓名。",
      "preferredCollocations": [
        "Sheryl Sandberg"
      ]
    },
    "sandberg": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "桑德伯格",
      "use": "Sheryl Sandberg是文中女性高管的例子。",
      "preferredCollocations": [
        "Sheryl Sandberg"
      ]
    },
    "facebook": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "脸书",
      "use": "原文提到桑德伯格在Facebook担任高管的例子。",
      "preferredCollocations": [
        "at Facebook"
      ]
    },
    "massive": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "大量的；巨大的",
      "use": "massive attention形容关注很多。",
      "preferredCollocations": [
        "massive attention"
      ]
    },
    "rule": {
      "partOfSpeech": "n.",
      "contextualMeaning": "常态；通常情况",
      "use": "the exception to the rule表示偏离常态的例外。",
      "preferredCollocations": [
        "the exception to the rule"
      ]
    },
    "do": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "确实（强调）",
      "use": "do后仍有break through，强调女性确实突破到企业高层。"
    },
    "as": {
      "partOfSpeech": "conj.",
      "contextualMeaning": "正如；如同",
      "use": "as引入桑德伯格这一例子，did替代前面的突破。"
    },
    "precisely": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "恰恰；正是",
      "use": "precisely because强调受到关注的确切原因就是女性高管仍是例外，不是说报道或测量很精确。"
    }
  },
  "2013-p4-s18": {
    "place": {
      "partOfSpeech": "n.",
      "contextualMeaning": "位置（in place搭配组成）",
      "use": "in place整体表示政策到位，不单独创造一个名词到位义。",
      "preferredCollocations": [
        "place someone in a position"
      ]
    },
    "ceo": {
      "partOfSpeech": "n.（职务缩写）",
      "contextualMeaning": "首席执行官",
      "use": "CEOs与caregivers并列，说明政策应覆盖不同职业女性。",
      "preferredCollocations": [
        "company CEOs"
      ]
    },
    "child": {
      "partOfSpeech": "n.",
      "contextualMeaning": "孩子",
      "use": "their children's caregivers指她们孩子的照护者。",
      "preferredCollocations": [
        "children's caregivers"
      ]
    },
    "caregiver": {
      "partOfSpeech": "n.",
      "contextualMeaning": "照护者",
      "use": "帮助照看高管子女的人，也应得到公共政策支持。",
      "preferredCollocations": [
        "children's caregivers"
      ]
    },
    "sandberg": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "桑德伯格",
      "use": "Sheryl Sandberg是文中女性高管的例子。",
      "preferredCollocations": [
        "Sheryl Sandberg"
      ]
    },
    "newsworthy": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有新闻价值的",
      "use": "no more newsworthy than指不比别人更值得报道。",
      "preferredCollocations": [
        "a newsworthy event"
      ]
    },
    "highly": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "高度地；非常",
      "use": "修饰capable，表示能力很强。",
      "preferredCollocations": [
        "highly capable"
      ]
    },
    "capable": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有能力的",
      "use": "the capable指有能力的人，meritocracy主张由他们治理。",
      "preferredCollocations": [
        "a capable person"
      ]
    },
    "live": {
      "partOfSpeech": "v.",
      "contextualMeaning": "生活；居住",
      "use": "living in a more just society说明能干的人生活的社会环境。",
      "preferredCollocations": [
        "live in a just society"
      ]
    },
    "just": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公正的；公平的",
      "use": "a more just society指更公正的社会。",
      "preferredCollocations": [
        "a just society"
      ]
    },
    "will": {
      "partOfSpeech": "modal v.",
      "contextualMeaning": "非现实条件下会",
      "use": "would呼应If...were的假设，不是单纯过去将来时。"
    },
    "public": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公共的；面向公众的",
      "use": "public policies是公共政策，不仅表示内容被公开。"
    },
    "no": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "不（否定比较）",
      "use": "no more newsworthy than否定比别人更突出，不表示完全没有新闻价值。"
    }
  },
  "question-201336-prompt": {
    "european": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "欧洲的",
      "use": "修饰企业董事会及欧盟机构名称。",
      "preferredCollocations": [
        "European companies"
      ]
    },
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    }
  },
  "question-201336-option-A": {
    "lead": {
      "partOfSpeech": "n.",
      "contextualMeaning": "领先；主导地位",
      "use": "take the lead指带头或起主导作用。",
      "preferredCollocations": [
        "take the lead"
      ]
    },
    "take": {
      "partOfSpeech": "v.",
      "contextualMeaning": "担任；承担",
      "use": "take the lead整体表示起主导作用。"
    }
  },
  "question-201336-option-B": {
    "final": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最后的；最终的",
      "use": "have the final say指拥有最终决定权。",
      "preferredCollocations": [
        "the final say"
      ]
    },
    "say": {
      "partOfSpeech": "n.",
      "contextualMeaning": "发言权；决定权",
      "use": "have the final say表示能作最终决定。",
      "preferredCollocations": [
        "have the final say"
      ]
    },
    "have": {
      "partOfSpeech": "v.",
      "contextualMeaning": "拥有",
      "use": "have the final say整体表示有最终决定权。"
    }
  },
  "question-201336-option-C": {
    "corporate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "公司的；企业的",
      "use": "修饰workplace、boards和power。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "governance": {
      "partOfSpeech": "n.",
      "contextualMeaning": "治理",
      "use": "公司治理包括高层决策与董事会安排。",
      "preferredCollocations": [
        "corporate governance"
      ]
    },
    "overwhelm": {
      "partOfSpeech": "v.",
      "contextualMeaning": "压倒；使不堪重负",
      "use": "第36题C的overwhelmed改变了原文overwhelmingly male的意思。",
      "preferredCollocations": [
        "be overwhelmed"
      ]
    }
  },
  "question-201336-option-D": {
    "family-friendly": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有利于家庭的",
      "use": "职场安排照顾员工的家庭责任。",
      "preferredCollocations": [
        "a family-friendly workplace"
      ]
    }
  },
  "question-201337-prompt": {
    "european": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "欧洲的",
      "use": "修饰企业董事会及欧盟机构名称。",
      "preferredCollocations": [
        "European companies"
      ]
    },
    "union": {
      "partOfSpeech": "n.",
      "contextualMeaning": "联盟",
      "use": "European Union指欧盟。",
      "preferredCollocations": [
        "the European Union"
      ]
    },
    "intend": {
      "partOfSpeech": "v.",
      "contextualMeaning": "打算；计划",
      "use": "intended legislation表示计划中的立法。",
      "preferredCollocations": [
        "intend to act"
      ]
    }
  },
  "question-201337-option-A": {
    "reflection": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反映；体现",
      "use": "选项说立法体现性别平衡，现实却仍失衡。",
      "preferredCollocations": [
        "a reflection of reality"
      ]
    },
    "balance": {
      "partOfSpeech": "n.",
      "contextualMeaning": "平衡",
      "use": "gender balance在of后作名词，表示性别比例的平衡。",
      "preferredCollocations": [
        "balance work and family"
      ]
    }
  },
  "question-201337-option-B": {
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "call": {
      "partOfSpeech": "n.",
      "contextualMeaning": "呼吁",
      "use": "a call to voluntary action是采取自愿行动的呼吁。",
      "preferredCollocations": [
        "a call to action"
      ]
    }
  },
  "question-201337-option-C": {
    "reluctant": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "不情愿的；勉强的",
      "use": "自愿倡议失败后，不得不考虑强制方案。",
      "preferredCollocations": [
        "a reluctant choice"
      ]
    }
  },
  "question-201338-prompt": {
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "quota": {
      "partOfSpeech": "n.",
      "contextualMeaning": "配额；定额",
      "use": "这里为董事会中女性席位设定比例要求。",
      "preferredCollocations": [
        "gender quotas"
      ]
    }
  },
  "question-201338-option-A": {
    "get": {
      "partOfSpeech": "v.",
      "contextualMeaning": "获得",
      "use": "get positions指获得企业高层职位。",
      "preferredCollocations": [
        "get action"
      ]
    },
    "top": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最高层的",
      "use": "top positions指企业最高层职位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "business": {
      "partOfSpeech": "n.",
      "contextualMeaning": "商业；企业",
      "use": "top business positions指企业高层职位。",
      "preferredCollocations": [
        "business positions"
      ]
    },
    "position": {
      "partOfSpeech": "n.",
      "contextualMeaning": "职位；地位",
      "use": "全文讨论企业高层职位和董事会席位。",
      "preferredCollocations": [
        "top positions"
      ]
    }
  },
  "question-201338-option-B": {
    "see": {
      "partOfSpeech": "v.",
      "contextualMeaning": "看到；见到",
      "use": "result seen in France是观察到的效果；see through出现在错项中。",
      "preferredCollocations": [
        "a result seen in practice"
      ]
    }
  },
  "question-201338-option-C": {
    "balance": {
      "partOfSpeech": "v.",
      "contextualMeaning": "平衡；兼顾",
      "use": "同时兼顾工作与家庭。",
      "preferredCollocations": [
        "balance work and family"
      ]
    },
    "work": {
      "partOfSpeech": "n.",
      "contextualMeaning": "工作",
      "use": "工作与家庭相平衡。",
      "preferredCollocations": [
        "balance work and family"
      ]
    }
  },
  "question-201338-option-D": {
    "anticipate": {
      "partOfSpeech": "v.",
      "contextualMeaning": "预料；预见",
      "use": "选项说预见法律结果，并非雷丁说配额的作用。",
      "preferredCollocations": [
        "anticipate a result"
      ]
    }
  },
  "question-201339-prompt": {
    "reding": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "雷丁",
      "use": "Viviane Reding为原文引用的欧盟官员姓氏。",
      "preferredCollocations": [
        "Reding's appeal"
      ]
    },
    "appeal": {
      "partOfSpeech": "n.",
      "contextualMeaning": "呼吁；倡议",
      "use": "her appeal指雷丁要求企业自愿增加女性董事的呼吁。",
      "preferredCollocations": [
        "make an appeal"
      ]
    },
    "one": {
      "partOfSpeech": "pron.",
      "contextualMeaning": "一种；某一种",
      "use": "one of选取一种态度，不指人。"
    }
  },
  "question-201339-option-B": {
    "objectiveness": {
      "partOfSpeech": "n.",
      "contextualMeaning": "客观性",
      "use": "态度题干扰项，作者实际表达了支持判断。",
      "preferredCollocations": [
        "objectiveness of a report"
      ]
    }
  },
  "question-201339-option-D": {
    "approval": {
      "partOfSpeech": "n.",
      "contextualMeaning": "赞成；认可",
      "use": "作者虽有保留，仍支持现实中的临时强制安排。",
      "preferredCollocations": [
        "express approval"
      ]
    }
  },
  "question-201340-prompt": {
    "enter": {
      "partOfSpeech": "v.",
      "contextualMeaning": "进入",
      "use": "entering top management说明女性进入高层。",
      "preferredCollocations": [
        "enter management"
      ]
    },
    "top": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "最高层的",
      "use": "top positions指企业最高层职位。",
      "preferredCollocations": [
        "top positions"
      ]
    },
    "headline": {
      "partOfSpeech": "n.",
      "contextualMeaning": "新闻标题；头条",
      "use": "女性进入高层会成为引人关注的新闻。",
      "preferredCollocations": [
        "make headlines"
      ]
    },
    "lack": {
      "partOfSpeech": "n.",
      "contextualMeaning": "缺乏；不足",
      "use": "due to the lack of询问缺少什么条件。",
      "preferredCollocations": [
        "a lack of support"
      ]
    }
  },
  "question-201340-option-A": {
    "justice": {
      "partOfSpeech": "n.",
      "contextualMeaning": "公正；正义",
      "use": "more social justice为选项中的社会公平概括。",
      "preferredCollocations": [
        "social justice"
      ]
    },
    "social": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "社会的",
      "use": "social justice为社会公正，不是社交活动。"
    }
  },
  "question-201340-option-B": {
    "massive": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "大量的；巨大的",
      "use": "massive attention形容关注很多。",
      "preferredCollocations": [
        "massive attention"
      ]
    }
  },
  "question-201340-option-D": {
    "soft": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "温和的；非强制性的",
      "use": "soft pressure指劝说等缺乏强制约束的压力。",
      "preferredCollocations": [
        "soft pressure"
      ]
    },
    "great": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "更大的",
      "use": "greater修饰压力的程度，不是更严重的事故。"
    }
  }
};
const phrases:PhraseRow[] = [
  [
    "in-particular-2001p1",
    "In particular",
    "in particular",
    "强调搭配",
    "尤其；特别是",
    "从一般判断进入具体的职场问题。",
    "In particular, women need fair opportunities.",
    "尤其是，女性需要公平机会。",
    "不是单指某一个人。"
  ],
  [
    "2013-p4-up-to",
    "up to",
    "up to + number",
    "数量上限",
    "最高可达",
    "后接可能达到的上限，不表示当前实际比例。",
    "The share may rise up to 60 per cent.",
    "该比例最高可能达到百分之六十。",
    "与当前14%和自愿目标40%区分。"
  ],
  [
    "2013-p4-born-of",
    "was born of",
    "be born of + noun",
    "来源搭配",
    "源于；由……产生",
    "说明计划产生的原因。",
    "The proposal was born of frustration.",
    "这项提议源于挫败。",
    "不用出生的字面义翻译抽象提议。"
  ],
  [
    "2013-p4-sign-up",
    "sign up for",
    "sign up for + noun",
    "参与搭配",
    "报名参加；承诺参与",
    "参与某项行动或目标。",
    "Companies signed up for the plan.",
    "公司报名参与该计划。",
    "报名自愿目标不等于法律强制。"
  ],
  [
    "2013-p4-take-up",
    "took it up",
    "take something up",
    "响应倡议",
    "接受；响应",
    "it代替前面的倡议。",
    "Few companies took the proposal up.",
    "很少公司响应这项提议。",
    "不是占用时间或接任职位。"
  ],
  [
    "2013-p4-climb-ladder",
    "climb the corporate ladder",
    "climb the corporate ladder",
    "晋升比喻",
    "在企业逐级晋升",
    "把职位等级比喻为梯子的阶梯。",
    "She climbed the corporate ladder.",
    "她在企业逐级晋升。",
    "不是物理爬梯。"
  ],
  [
    "2013-p4-glass-ceiling",
    "break through the glass ceiling",
    "break through the glass ceiling",
    "晋升比喻",
    "突破晋升的隐形障碍",
    "玻璃天花板表示看不见但实际存在的高层晋升限制。",
    "Quotas can help break through the glass ceiling.",
    "配额有助于突破晋升的隐形障碍。",
    "break through是突破，不能换成see through看穿。"
  ],
  [
    "2013-p4-counter-to",
    "run counter to",
    "run counter to + noun",
    "冲突搭配",
    "与……背道而驰",
    "指出两种原则或安排相冲突。",
    "The rule runs counter to my belief.",
    "这项规则与我的信念相悖。",
    "counter在此不是柜台。"
  ],
  [
    "2013-p4-as-if",
    "as if",
    "as if + clause",
    "判断结构",
    "仿佛；似乎",
    "后接看起来成立的情形。",
    "It looks as if a change is needed.",
    "看起来似乎需要改变。",
    "本句作者是在权衡后作判断，并非断言绝无可能。"
  ],
  [
    "collocation:as well as",
    "as well as",
    "as well as + noun",
    "并列补充",
    "以及；也包括",
    "欧洲以及美国都是企业所在区域。",
    "This happens in Europe as well as the US.",
    "这在欧洲以及美国都会发生。",
    "不只包括欧洲。"
  ],
  [
    "2013-p4-no-matter",
    "no matter how much",
    "no matter how much + noun + clause",
    "让步结构",
    "不管多少……",
    "数量改变也不能改变后面的结论。",
    "No matter how much pressure is applied, the problem remains.",
    "不管施加多少压力，问题仍然存在。",
    "不是说完全没有压力。"
  ],
  [
    "2013-p4-exception",
    "the exception to the rule",
    "the exception to the rule",
    "常态与例外",
    "常态中的例外",
    "女性高管仍不常见，所以引人关注。",
    "Her success is still the exception to the rule.",
    "她的成功仍是常态中的例外。",
    "rule不是某条成文法律。"
  ],
  [
    "2013-p4-in-place",
    "in place",
    "be in place",
    "状态搭配",
    "到位；落实",
    "政策已经建立且能提供支持。",
    "Supportive policies should be in place.",
    "支持性政策应当落实到位。",
    "不是仅把文件放在某处。"
  ],
  [
    "2013-p4-no-more-than",
    "no more newsworthy than",
    "no more + adjective + than",
    "否定比较",
    "并不比……更……",
    "比较双方的同一属性，否定更高程度。",
    "She is no more newsworthy than another capable person.",
    "她并不比另一个能干的人更有新闻价值。",
    "不等于两人都没有新闻价值。"
  ]
];
const phr=reviewedPhrases(phrases);
export const passage2013P4PhraseGuides=phr.guides;
export const passage2013P4PhraseAliases=phr.aliases;
export const passage2013P4PhraseGlosses={...lex.glosses,...phr.glosses};

/** The same sentence uses do for emphasis and did to substitute an earlier action. */
export const passage2013P4FormContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2013-p4-s17": {
    do: { partOfSpeech: "aux.", contextualMeaning: "确实（强调）", use: "do后仍有break through，强调女性确实突破到企业高层。" },
    did: { partOfSpeech: "aux.", contextualMeaning: "替代前述动作或谓语", use: "did代替broke through to the summit of corporate power，说明桑德伯格做到了前述突破。" },
  },
};
