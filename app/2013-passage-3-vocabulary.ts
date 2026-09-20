import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, reviewedPhrases, type LexiconRow, type PhraseRow } from "./2011-content-helpers";
const rows:LexiconRow[] = [
  [
    "accuracy",
    "",
    "n.",
    "准确性",
    "判断是否准确，而不是反应有多快。",
    "the accuracy of a judgment（判断的准确性）",
    "accuracy是名词；accurate为形容词。"
  ],
  [
    "accurately",
    "",
    "adv.",
    "准确地",
    "修饰tell，说明判断社交性格的准确程度。",
    "judge accurately（准确判断）",
    "accurately强调正确，quickly强调速度。"
  ],
  [
    "act",
    "acts acted acting",
    "v.",
    "行动；做",
    "think before we act要求先思考再行动。",
    "act quickly（迅速行动）",
    "本题不是法案名词act。"
  ],
  [
    "adequate",
    "",
    "adj.",
    "充分的；足够的",
    "adequate information是可靠快判断的基础。",
    "adequate information（充分的信息）",
    "adequate是够用，不表示无限或绝对完备。"
  ],
  [
    "agent",
    "agents",
    "n.",
    "代理人；经纪人",
    "real estate agents指房产经纪人。",
    "real estate agents（房产经纪人）",
    "agent可指代理人，具体职业由修饰语限定。"
  ],
  [
    "animal",
    "animals",
    "n.",
    "动物",
    "与人类的反思能力作对照。",
    "humans and animals（人类与动物）",
    "这里只讨论文中比较的思考能力。"
  ],
  [
    "applicant",
    "applicants",
    "n.",
    "申请者",
    "female applicants指申请职位的女性。",
    "job applicants（求职者）",
    "applicant申请者，application申请或申请材料。"
  ],
  [
    "aspect",
    "aspects",
    "n.",
    "方面",
    "性格的不同方面，如神经质与开放性。",
    "aspects of personality（性格的各个方面）",
    "aspect指观察角度，不是完成一个动作的步骤。"
  ],
  [
    "assessment",
    "assessments",
    "n.",
    "评估；判断",
    "题目问判断需要的时间与依据。",
    "an accurate assessment（准确的评估）",
    "assess是评估动作，assessment是名词。"
  ],
  [
    "associative",
    "",
    "adj.",
    "联想性的",
    "快餐引起速度联想，并迁移到别的活动。",
    "associative thinking（联想性思维）",
    "对应associate，不是有意识或危险的同义词。"
  ],
  [
    "brain",
    "brains",
    "n.",
    "大脑",
    "大脑与身体一起迅速响应危险。",
    "the human brain（人的大脑）",
    "这里不是借指人才。"
  ],
  [
    "capacity",
    "capacities",
    "n.",
    "能力",
    "指超越诱惑、扭转趋势的能力。",
    "the capacity to change（改变的能力）",
    "本句不是容器的容量。"
  ],
  [
    "complexity",
    "complexities",
    "n.",
    "复杂性",
    "选项说脑反应复杂性，原文未据此下结论。",
    "the complexity of a problem（问题的复杂性）",
    "complex复杂的，complexity复杂性。"
  ],
  [
    "contemplate",
    "contemplates contemplated contemplating",
    "v.",
    "思考；沉思",
    "考虑较长远的未来。",
    "contemplate the future（思考未来）",
    "比快速一闪而过的反应更持续深入。"
  ],
  [
    "decision",
    "decisions",
    "n.",
    "决定；决策",
    "本文指日常判断和行动决定，不是法庭判决。",
    "make a decision（作决定）",
    "decision是决定，reaction是反应。"
  ],
  [
    "defense",
    "defenses",
    "n.",
    "防御；防卫",
    "快速判断危险可保护自身。",
    "defense mechanisms（防御机制）",
    "文中不是法庭上的辩护。"
  ],
  [
    "differentiate",
    "differentiates differentiated differentiating",
    "v.",
    "使不同；区分",
    "反思能力把人与动物区别开。",
    "differentiate A from B（把A与B区分开）",
    "different形容词，differentiate动词。"
  ],
  [
    "dog",
    "dogs",
    "n.",
    "狗",
    "作为动物思考未来能力的例子。",
    "a pet dog（宠物狗）",
    "不能将一个动物例子扩写为所有物种的精确统计。"
  ],
  [
    "estate",
    "estates",
    "n.",
    "地产；不动产",
    "real estate整体指房地产。",
    "real estate（房地产）",
    "estate不是state州；搭配需整体理解。"
  ],
  [
    "evaluation",
    "evaluations",
    "n.",
    "评估",
    "戈特曼对夫妻关系进行两天观察判断。",
    "a longer evaluation（更长时间的评估）",
    "与assessment都可表评估，这里强调所花观察时间。"
  ],
  [
    "exclusive",
    "",
    "adj.",
    "专有的；独有的",
    "not exclusive to否定仅限于人际领域。",
    "exclusive to a group（某群体特有的）",
    "否定exclusive不等于否定现象存在。"
  ],
  [
    "explain",
    "explains explained explaining",
    "v.",
    "解释；说明",
    "戈特曼说明可靠快判断的前提。",
    "explain a finding（解释一项发现）",
    "explain后可接that内容从句。"
  ],
  [
    "explanation",
    "explanations",
    "n.",
    "解释；说明",
    "选项的合理解释不同于原文要求的充分观察。",
    "a sensible explanation（合理的解释）",
    "解释的合理性不等于信息已充分。"
  ],
  [
    "fast",
    "faster fastest",
    "adj./adv.",
    "快的；快速地",
    "fast food中是形容词，read faster中是副词比较级。",
    "read faster（读得更快）",
    "faster既可能修饰名词，也可能修饰动作，按来源区分。"
  ],
  [
    "flash",
    "flashes flashed flashing",
    "n.",
    "闪现；短暂呈现",
    "fast-food flashes指快餐图像短暂呈现。",
    "brief flashes（短暂闪现）",
    "本文不是闪光灯器材。"
  ],
  [
    "gottman",
    "",
    "proper n.",
    "戈特曼",
    "John Gottman为本文引用的婚姻专家姓名。",
    "John Gottman（约翰·戈特曼）",
    "专名识别即可，不与普通名词造同义词。"
  ],
  [
    "ground",
    "grounds grounded grounding",
    "v.",
    "以……为基础",
    "ground reactions in study表示让反应建立在长期研究上。",
    "ground a judgment in evidence（使判断以证据为基础）",
    "本处不是地面名词。"
  ],
  [
    "happy",
    "happier happiest",
    "adj.",
    "快乐的；愉快的",
    "happy face指带笑意的脸，可能影响消费判断。",
    "a happy face（愉快的面容）",
    "快乐表情不是产品质量的证据。"
  ],
  [
    "hard-wired",
    "",
    "adj.",
    "先天设定的；本能的",
    "比喻大脑反应像预接好的线路，自动而快速。",
    "hard-wired responses（本能反应）",
    "不是字面说人的身体安装电线。"
  ],
  [
    "high-speed",
    "",
    "adj.",
    "高速的",
    "指不断追求快速反应的趋势。",
    "a high-speed trend（高速化趋势）",
    "连字符把两词组成整体定语。"
  ],
  [
    "hire",
    "hires hired hiring",
    "v.",
    "雇用",
    "另聘外部筛选人员可避免现有筛选中的偏见。",
    "hire outside screeners（雇用外部筛选人员）",
    "hire雇用，fire解雇。"
  ],
  [
    "historically",
    "",
    "adv.",
    "在历史上；以往",
    "以往的人类时间分配为长远思考能力作证。",
    "historically speaking（从历史来看）",
    "不表示某件事一定永远不变。"
  ],
  [
    "imaginative",
    "",
    "adj.",
    "有想象力的",
    "想象能力使人能考虑眼前以外的选择。",
    "imaginative capacity（想象能力）",
    "imaginary表示虚构的，两者不同。"
  ],
  [
    "impatience",
    "",
    "n.",
    "不耐烦；急躁",
    "快餐被联想到速度和急躁。",
    "show impatience（表现出不耐烦）",
    "patience耐心，impatience缺乏耐心。"
  ],
  [
    "impression",
    "impressions",
    "n.",
    "印象",
    "第一印象可能受外貌和笑脸误导。",
    "a first impression（第一印象）",
    "印象不必等于经核实的事实。"
  ],
  [
    "impulse",
    "impulses",
    "n.",
    "冲动",
    "速度和不耐烦引发的冲动被带入别的活动。",
    "act on impulse（凭冲动行动）",
    "本文指心理冲动，不是物理冲量。"
  ],
  [
    "impulsive",
    "",
    "adj.",
    "冲动的",
    "原文impulses对应题目impulsive。",
    "impulsive decisions（冲动的决定）",
    "impulsive强调未充分考虑，不单指速度快。"
  ],
  [
    "intermittently",
    "",
    "adv.",
    "间歇地；断断续续地",
    "限定狗思考未来的持续性。",
    "occur intermittently（间歇发生）",
    "不等于持续不断continuously。"
  ],
  [
    "invite",
    "invites invited inviting",
    "v.",
    "邀请",
    "戈特曼邀请夫妻到岛上接受观察。",
    "invite someone to a place（邀请某人到某地）",
    "to后这里是地点，不是不定式动词。"
  ],
  [
    "island",
    "islands",
    "n.",
    "岛；岛屿",
    "island修饰retreat，说明静居处的位置。",
    "an island retreat（岛上静居处）",
    "名词可作定语，不因此变成新原形。"
  ],
  [
    "john",
    "",
    "proper n.",
    "约翰",
    "与Gottman组成专家姓名。",
    "John Gottman（约翰·戈特曼）",
    "专名按原文识别即可。"
  ],
  [
    "last",
    "lasts lasted lasting",
    "v.",
    "持续",
    "被试觉得音乐持续过长。",
    "last too long（持续太久）",
    "本处不是最后的形容词last。"
  ],
  [
    "logo",
    "logos",
    "n.",
    "标志；标识",
    "快餐商标作为实验中的视觉刺激。",
    "a fast-food logo（快餐标志）",
    "logo是图形或文字标志，非食物本身。"
  ],
  [
    "long-term",
    "",
    "adj.",
    "长期的",
    "深入长期研究是可靠判断的基础。",
    "long-term study（长期研究）",
    "区别于瞬间thin slice判断。"
  ],
  [
    "mechanism",
    "mechanisms",
    "n.",
    "机制",
    "解释危险判断为何能迅速启动防御。",
    "a defense mechanism（防御机制）",
    "mechanism讲作用方式，不一定指实体机器。"
  ],
  [
    "millisecond",
    "milliseconds",
    "n.",
    "毫秒",
    "千分之一秒，说明刺激或反应时间极短。",
    "within milliseconds（在几毫秒内）",
    "不能与minute分钟混淆。"
  ],
  [
    "minute",
    "minutes",
    "n.",
    "分钟",
    "社交判断至少一分钟，较复杂判断需要更久。",
    "a few minutes（几分钟）",
    "这里不是读音不同的形容词minute微小的。"
  ],
  [
    "musical",
    "",
    "adj.",
    "音乐的",
    "musical piece指一段音乐作品。",
    "a musical piece（一段音乐作品）",
    "music是名词，musical修饰piece。"
  ],
  [
    "mute",
    "mutes muted muting",
    "v.",
    "减弱；抑制",
    "通过暂停压低本能反应的影响。",
    "mute a reaction（抑制反应）",
    "由让声音变小引申，非要求人完全不反应。"
  ],
  [
    "neuroticism",
    "",
    "n.",
    "神经质",
    "列举较复杂、需要时间了解的性格特征。",
    "a measure of neuroticism（神经质程度的测量）",
    "识别为性格特征，不译成神经科学。"
  ],
  [
    "open-mindedness",
    "",
    "n.",
    "思想开放；愿意接受新观念",
    "与神经质并列为性格特征。",
    "show open-mindedness（表现出开放的思想）",
    "不等于没有任何立场。"
  ],
  [
    "option",
    "options",
    "n.",
    "选择；可选项",
    "housing options指可选择的住房。",
    "housing options（住房选择）",
    "不是只在试题中才叫option。"
  ],
  [
    "outside",
    "",
    "adj.",
    "外部的",
    "修饰screeners，指另聘外部人员。",
    "outside screeners（外部筛选人员）",
    "本句在名词前作定语，不是介词带宾语。"
  ],
  [
    "overreact",
    "overreacts overreacted overreacting",
    "v.",
    "反应过度",
    "对笑脸和外貌作出超出证据的反应。",
    "overreact to a stimulus（对刺激反应过度）",
    "over-表示过度，react仅为反应。"
  ],
  [
    "overreaction",
    "overreactions",
    "n.",
    "过度反应",
    "指快速本能反应造成的偏差。",
    "a snap overreaction（突然的过度反应）",
    "名词overreaction不当作react的屈折词形。"
  ],
  [
    "pause",
    "pauses paused pausing",
    "v.",
    "停顿；暂停",
    "by pausing表示通过停顿来抑制本能反应。",
    "pause before acting（行动前停顿）",
    "pause暂时停一下，不等于永久停止。"
  ],
  [
    "predetermine",
    "predetermines predetermined predetermining",
    "v.",
    "预先决定",
    "选项说时间预先决定准确性，强于原文。",
    "predetermine an outcome（预先决定结果）",
    "不能把需要时间直接推成时间决定一切。"
  ],
  [
    "preferably",
    "",
    "adv.",
    "最好；更可取地",
    "preferably five指最好有五分钟。",
    "preferably five minutes（最好五分钟）",
    "at least给下限，preferably给更理想的选择。"
  ],
  [
    "prime",
    "primes primed priming",
    "v.",
    "使预先进入状态；诱发",
    "快餐标志使人随后阅读变快。",
    "prime someone to react（使某人准备作出反应）",
    "这里不是主要的形容词prime。"
  ],
  [
    "prone",
    "",
    "adj.",
    "易于……的；有……倾向的",
    "be prone to后跟容易出现的过度反应。",
    "be prone to errors（容易出错）",
    "to在这里是介词，不接动词原形。"
  ],
  [
    "rapid",
    "",
    "adj.",
    "迅速的；快速的",
    "rapid stimuli是快速呈现的刺激。",
    "rapid change（快速变化）",
    "rapid和quick都强调快，具体搭配依语境。"
  ],
  [
    "react",
    "reacts reacted reacting",
    "v.",
    "反应；作出反应",
    "对危险或消费刺激作反应。",
    "react to a stimulus（对刺激作出反应）",
    "react是动词，reaction是名词。"
  ],
  [
    "reaction",
    "reactions",
    "n.",
    "反应",
    "本文比较本能反应与反思后的判断。",
    "a quick reaction（快速反应）",
    "reaction不等于思考成熟后的决定。"
  ],
  [
    "read",
    "reads reading",
    "v.",
    "阅读",
    "阅读速度会受快餐图像影响。",
    "read a passage（阅读一篇文章）",
    "reading在句中可作动名词，不另建原形。"
  ],
  [
    "reject",
    "rejects rejected rejecting",
    "v.",
    "拒绝；排斥",
    "招聘人员可能因偏见拒绝申请者。",
    "reject an applicant（拒绝申请者）",
    "reject拒绝接受，不等于判断其能力确实不足。"
  ],
  [
    "reliably",
    "",
    "adv.",
    "可靠地",
    "修饰快速处理信息的准确可信程度。",
    "judge reliably（可靠地判断）",
    "可靠不等于总是最快。"
  ],
  [
    "response",
    "responses",
    "n.",
    "反应；回应",
    "指快速、天生的反应，而非写给别人的答复。",
    "hard-wired responses（本能反应）",
    "response和reaction在此都讲对刺激的反应。"
  ],
  [
    "retreat",
    "retreats",
    "n.",
    "静居处；休养地",
    "island retreat指岛上的僻静住所。",
    "an island retreat（岛上静居处）",
    "本处不是撤退动作。"
  ],
  [
    "reverse",
    "reverses reversed reversing",
    "v.",
    "逆转；扭转",
    "扭转快速刺激的负面影响或高速趋势。",
    "reverse a trend（扭转趋势）",
    "不是说影响已消失，而是能够主动改变。"
  ],
  [
    "screener",
    "screeners",
    "n.",
    "筛选人员",
    "在招聘中筛查求职者的人。",
    "job screeners（招聘筛选人员）",
    "screen筛查动词，screener实施者，不能合并为屈折词形。"
  ],
  [
    "second",
    "seconds",
    "n.",
    "秒",
    "two seconds与two days形成强烈时间对比。",
    "two seconds（两秒）",
    "这里不是第二的序数词。"
  ],
  [
    "sensible",
    "",
    "adj.",
    "合理的；明智的",
    "形容选项中的explanation。",
    "a sensible choice（明智的选择）",
    "sensitive是敏感的，不能混用。"
  ],
  [
    "slice",
    "slices sliced slicing",
    "v.",
    "切片；截取一小部分",
    "thin slice借喻凭少量信息迅速判断，thick sliced借喻深入研究。",
    "slice information into parts（把信息分成小部分）",
    "文中是切片比喻，不是实际切食物。"
  ],
  [
    "smile",
    "smiles smiled smiling",
    "v.",
    "微笑",
    "销售人员和房产经纪人常微笑。",
    "smile at someone（对某人微笑）",
    "表情友好不直接证明商品适合购买。"
  ],
  [
    "snap",
    "",
    "adj.",
    "突然作出的；仓促的",
    "snap限定decisions和reactions，强调即刻作出。",
    "snap decisions（仓促决定）",
    "本文不是折断或拍照的动词snap。"
  ],
  [
    "sociable",
    "",
    "adj.",
    "善于交际的；合群的",
    "判断一个人合群与否需要观察时间。",
    "a sociable person（合群的人）",
    "social是社会的或社交的，不等于sociable性格合群。"
  ],
  [
    "stimulus",
    "stimuli",
    "n.",
    "刺激",
    "rapid stimuli引发快反应；stimuli是复数。",
    "visual stimuli（视觉刺激）",
    "不能把stimuli另建为不明单词。"
  ],
  [
    "subject",
    "subjects",
    "n.",
    "被试；研究对象",
    "Subjects是快餐图像实验的参与者。",
    "experimental subjects（实验被试）",
    "不是学科或句子主语的含义。"
  ],
  [
    "technology",
    "technologies",
    "n.",
    "技术",
    "技术影响反应方式，却未改变人的本性。",
    "modern technology（现代技术）",
    "不可把技术影响夸大为人已失去反思能力。"
  ],
  [
    "temptation",
    "temptations",
    "n.",
    "诱惑",
    "人能超越眼前诱惑，改变冲动趋势。",
    "resist temptation（抵制诱惑）",
    "tempt引诱动词，temptation名词。"
  ],
  [
    "thick",
    "thicker thickest",
    "adj.",
    "厚的；深入的",
    "thick sliced比喻长期、深入研究。",
    "thick sliced study（深入的切片式研究）",
    "与thin slice的少量即时信息形成比喻对照。"
  ],
  [
    "toronto",
    "",
    "proper n.",
    "多伦多",
    "University of Toronto是研究者所属大学。",
    "the University of Toronto（多伦多大学）",
    "专名识别即可。"
  ],
  [
    "unconscious",
    "",
    "adj.",
    "无意识的",
    "not unconscious是干扰项，反转原文的无意识联想。",
    "unconscious associations（无意识的联想）",
    "not与un-一起读，不能漏掉其中的否定。"
  ],
  [
    "unconsciously",
    "",
    "adv.",
    "无意识地",
    "人未觉察就把快餐与速度联系起来。",
    "associate unconsciously（无意识地联想）",
    "此处不是昏迷，而是未觉察心理过程。"
  ],
  [
    "urgency",
    "",
    "n.",
    "紧迫性；紧急程度",
    "危险判断更紧迫，因此需要更快反应。",
    "the urgency of a situation（情境的紧迫性）",
    "urgency紧迫性，importance重要性，不能替换。"
  ],
  [
    "view",
    "views viewed viewing",
    "v.",
    "观看；看",
    "实验中观看快餐标志。",
    "view a logo（观看标志）",
    "本句不是观点名词view。"
  ],
  [
    "tell",
    "tells told telling",
    "v.",
    "辨别；判断",
    "tell whether询问能否判断某人合群。",
    "tell whether something is true（判断某事是否真实）",
    "不是对某人讲述故事的tell。"
  ],
  [
    "take",
    "takes took taken taking",
    "v.",
    "花费；用",
    "take a moment表示用一点时间，It takes...to...表示做事需要时间。",
    "take a moment（花一点时间）",
    "本篇不能用接管或看作替代时间义。"
  ],
  [
    "term",
    "terms",
    "n.",
    "时期；期限",
    "the longer term指较长远的未来。",
    "the long term（长期）",
    "本处不是术语或条款。"
  ],
  [
    "spend",
    "spends spent spending",
    "v.",
    "花费",
    "spent...days contemplating表示把时间用于思考。",
    "spend time doing something（花时间做某事）",
    "花费对象在这里是时间，不是钱。"
  ],
  [
    "see",
    "sees saw seen seeing",
    "v.",
    "看见",
    "看到笑脸，可能触发过度反应。",
    "see a happy face（看到笑脸）",
    "不是see A as B看作的结构。"
  ],
  [
    "good",
    "better best",
    "adj.",
    "好的；优秀的",
    "good sales representatives指优秀销售代表。",
    "a good representative（优秀的代表）",
    "本处不是经济上过得更好的比较义。"
  ],
  [
    "face",
    "faces",
    "n.",
    "脸；面容",
    "happy face是微笑的脸。",
    "a smiling face（微笑的脸）",
    "不是面对困难的动词face。"
  ],
  [
    "representative",
    "representatives",
    "n.",
    "代表",
    "sales representatives指销售代表。",
    "sales representatives（销售代表）",
    "本句复数名词表示人，不是有代表性的形容词。"
  ],
  [
    "sale",
    "sales",
    "n.",
    "销售",
    "sales作定语限定representatives。",
    "sales representatives（销售代表）",
    "不是艺术品拍卖专场。"
  ],
  [
    "make",
    "makes made making",
    "v.",
    "作出",
    "making decisions指作决定。",
    "make decisions（作决定）",
    "不要把此处误译为制造产品。"
  ],
  [
    "negative",
    "",
    "adj.",
    "负面的；不良的",
    "负面反应影响是可减轻和扭转的对象。",
    "negative effects（不良影响）",
    "不是语法否定句的negative用法。"
  ],
  [
    "need",
    "needs needed needing",
    "v.",
    "需要",
    "需要更多判断时间，needed作后置分词。",
    "need more time（需要更多时间）",
    "本篇need主要是实义动词，不是需求名词。"
  ],
  [
    "judge",
    "judges judged judging",
    "v.",
    "判断",
    "判断危险、社交性格和人格方面。",
    "judge personality（判断性格）",
    "本文不是法官名词。"
  ],
  [
    "want",
    "wants wanted wanting",
    "v.",
    "想要",
    "wants to assess指戈特曼想评估夫妻关系。",
    "want to assess（想要评估）",
    "不能把第三人称wants解释为需求复数。"
  ],
  [
    "while",
    "",
    "n.",
    "一段时间",
    "takes a while中的while是时间名词。",
    "take a while（花一段时间）",
    "此处不是转折或时间连词。"
  ],
  [
    "too",
    "",
    "adv.",
    "过于；太",
    "too long表示主观觉得音乐太长。",
    "last too long（持续太久）",
    "不能用也来解释本句too。"
  ],
  [
    "influence",
    "influences",
    "n.",
    "影响",
    "快速刺激对其他活动产生的心理影响。",
    "reverse an influence（扭转影响）",
    "本篇是影响名词，不是动词施加影响。"
  ],
  [
    "carry",
    "carries carried carrying",
    "v.",
    "携带；带入",
    "把快餐联想带来的冲动迁移到其他活动中。",
    "carry an impulse into another activity（把冲动带入另一活动）",
    "此处是心理影响的转移，不只携带实体物品。"
  ],
  [
    "judgment",
    "judgments",
    "n.",
    "判断",
    "评价一个人的危险性、性格等所形成的认识。",
    "the accuracy of judgment（判断的准确性）",
    "本题不是司法裁决。"
  ],
  [
    "critical",
    "",
    "adj.",
    "批判性的",
    "第34题A添加了原文未限定的批判性评估。",
    "critical assessment（批判性评估）",
    "critical也可表示关键的，但本选项指审慎批判性质。"
  ],
  [
    "doubtful",
    "",
    "adj.",
    "怀疑的；不确定的",
    "第35题D表示对能否扭转趋势有怀疑，与结尾信心相反。",
    "a doubtful attitude（怀疑的态度）",
    "doubtful怀疑，optimistic乐观，不能因正文有负面现象就选怀疑。"
  ],
  [
    "rise",
    "rises rose risen rising",
    "v.",
    "超越；摆脱影响",
    "rise above temptation表示不被诱惑控制。",
    "rise above temptation（克服诱惑）",
    "此处借向上超出的形象表达摆脱限制，不能译成数量上涨。"
  ]
];
const lex=reviewedLexicon(rows);
export const passage2013P3Lexicon=lex.entries;
export const passage2013P3LemmaAliases:Record<string,string>={...lex.aliases,"aren't":"be","hasn't":"have"};
export const passage2013P3SentenceContexts:Record<string,Record<string,SentenceWordContext>> = {
  "2013-p3-s1": {
    "prone": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "易于……的；有……倾向的",
      "use": "be prone to后跟容易出现的过度反应。",
      "preferredCollocations": [
        "be prone to errors"
      ]
    },
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "overreaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "过度反应",
      "use": "指快速本能反应造成的偏差。",
      "preferredCollocations": [
        "a snap overreaction"
      ]
    },
    "take": {
      "partOfSpeech": "v.",
      "contextualMeaning": "花费；用",
      "use": "take a moment表示用一点时间，It takes...to...表示做事需要时间。",
      "preferredCollocations": [
        "take a moment"
      ]
    },
    "react": {
      "partOfSpeech": "v.",
      "contextualMeaning": "反应；作出反应",
      "use": "对危险或消费刺激作反应。",
      "preferredCollocations": [
        "react to a stimulus"
      ]
    },
    "negative": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "负面的；不良的",
      "use": "负面反应影响是可减轻和扭转的对象。",
      "preferredCollocations": [
        "negative effects"
      ]
    },
    "hard-wired": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "先天设定的；本能的",
      "use": "比喻大脑反应像预接好的线路，自动而快速。",
      "preferredCollocations": [
        "hard-wired responses"
      ]
    },
    "response": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应；回应",
      "use": "指快速、天生的反应，而非写给别人的答复。",
      "preferredCollocations": [
        "hard-wired responses"
      ]
    }
  },
  "2013-p3-s2": {
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "本文指日常判断和行动决定，不是法庭判决。",
      "preferredCollocations": [
        "make a decision"
      ]
    },
    "defense": {
      "partOfSpeech": "n.",
      "contextualMeaning": "防御；防卫",
      "use": "快速判断危险可保护自身。",
      "preferredCollocations": [
        "defense mechanisms"
      ]
    },
    "mechanism": {
      "partOfSpeech": "n.",
      "contextualMeaning": "机制",
      "use": "解释危险判断为何能迅速启动防御。",
      "preferredCollocations": [
        "a defense mechanism"
      ]
    },
    "judge": {
      "partOfSpeech": "v.",
      "contextualMeaning": "判断",
      "use": "判断危险、社交性格和人格方面。",
      "preferredCollocations": [
        "judge personality"
      ]
    },
    "brain": {
      "partOfSpeech": "n.",
      "contextualMeaning": "大脑",
      "use": "大脑与身体一起迅速响应危险。",
      "preferredCollocations": [
        "the human brain"
      ]
    },
    "hard-wired": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "先天设定的；本能的",
      "use": "比喻大脑反应像预接好的线路，自动而快速。",
      "preferredCollocations": [
        "hard-wired responses"
      ]
    },
    "react": {
      "partOfSpeech": "v.",
      "contextualMeaning": "反应；作出反应",
      "use": "对危险或消费刺激作反应。",
      "preferredCollocations": [
        "react to a stimulus"
      ]
    },
    "millisecond": {
      "partOfSpeech": "n.",
      "contextualMeaning": "毫秒",
      "use": "千分之一秒，说明刺激或反应时间极短。",
      "preferredCollocations": [
        "within milliseconds"
      ]
    },
    "body": {
      "partOfSpeech": "n.",
      "contextualMeaning": "身体",
      "use": "大脑与身体共同响应危险。"
    }
  },
  "2013-p3-s3": {
    "need": {
      "partOfSpeech": "v.",
      "contextualMeaning": "需要",
      "use": "需要更多判断时间，needed作后置分词。",
      "preferredCollocations": [
        "need more time"
      ]
    }
  },
  "2013-p3-s4": {
    "accurately": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "准确地",
      "use": "修饰tell，说明判断社交性格的准确程度。",
      "preferredCollocations": [
        "judge accurately"
      ]
    },
    "tell": {
      "partOfSpeech": "v.",
      "contextualMeaning": "辨别；判断",
      "use": "tell whether询问能否判断某人合群。",
      "preferredCollocations": [
        "tell whether something is true"
      ]
    },
    "sociable": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "善于交际的；合群的",
      "use": "判断一个人合群与否需要观察时间。",
      "preferredCollocations": [
        "a sociable person"
      ]
    },
    "need": {
      "partOfSpeech": "v.",
      "contextualMeaning": "需要",
      "use": "需要更多判断时间，needed作后置分词。",
      "preferredCollocations": [
        "need more time"
      ]
    },
    "minute": {
      "partOfSpeech": "n.",
      "contextualMeaning": "分钟",
      "use": "社交判断至少一分钟，较复杂判断需要更久。",
      "preferredCollocations": [
        "a few minutes"
      ]
    },
    "preferably": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "最好；更可取地",
      "use": "preferably five指最好有五分钟。",
      "preferredCollocations": [
        "preferably five minutes"
      ]
    },
    "five": {
      "partOfSpeech": "num.",
      "contextualMeaning": "五",
      "use": "five省去minutes，表示最好五分钟。"
    },
    "study": {
      "partOfSpeech": "n.",
      "contextualMeaning": "研究",
      "use": "研究作为证据或长期了解的基础，不是正在学习的动词。"
    }
  },
  "2013-p3-s5": {
    "take": {
      "partOfSpeech": "v.",
      "contextualMeaning": "花费；用",
      "use": "take a moment表示用一点时间，It takes...to...表示做事需要时间。",
      "preferredCollocations": [
        "take a moment"
      ]
    },
    "while": {
      "partOfSpeech": "n.",
      "contextualMeaning": "一段时间",
      "use": "takes a while中的while是时间名词。",
      "preferredCollocations": [
        "take a while"
      ]
    },
    "judge": {
      "partOfSpeech": "v.",
      "contextualMeaning": "判断",
      "use": "判断危险、社交性格和人格方面。",
      "preferredCollocations": [
        "judge personality"
      ]
    },
    "aspect": {
      "partOfSpeech": "n.",
      "contextualMeaning": "方面",
      "use": "性格的不同方面，如神经质与开放性。",
      "preferredCollocations": [
        "aspects of personality"
      ]
    },
    "neuroticism": {
      "partOfSpeech": "n.",
      "contextualMeaning": "神经质",
      "use": "列举较复杂、需要时间了解的性格特征。",
      "preferredCollocations": [
        "a measure of neuroticism"
      ]
    },
    "open-mindedness": {
      "partOfSpeech": "n.",
      "contextualMeaning": "思想开放；愿意接受新观念",
      "use": "与神经质并列为性格特征。",
      "preferredCollocations": [
        "show open-mindedness"
      ]
    },
    "like": {
      "partOfSpeech": "prep.",
      "contextualMeaning": "例如；诸如",
      "use": "引出neuroticism和open-mindedness作为性格方面的例子。"
    }
  },
  "2013-p3-s6": {
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "本文指日常判断和行动决定，不是法庭判决。",
      "preferredCollocations": [
        "make a decision"
      ]
    },
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    },
    "rapid": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "迅速的；快速的",
      "use": "rapid stimuli是快速呈现的刺激。",
      "preferredCollocations": [
        "rapid change"
      ]
    },
    "stimulus": {
      "partOfSpeech": "n.",
      "contextualMeaning": "刺激",
      "use": "rapid stimuli引发快反应；stimuli是复数。",
      "preferredCollocations": [
        "visual stimuli"
      ]
    },
    "exclusive": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "专有的；独有的",
      "use": "not exclusive to否定仅限于人际领域。",
      "preferredCollocations": [
        "exclusive to a group"
      ]
    },
    "be": {
      "partOfSpeech": "v.",
      "contextualMeaning": "是；处于某种状态",
      "use": "aren't是are not，否定专属性，并非否定这些反应存在。"
    }
  },
  "2013-p3-s7": {
    "toronto": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "多伦多",
      "use": "University of Toronto是研究者所属大学。",
      "preferredCollocations": [
        "the University of Toronto"
      ]
    },
    "view": {
      "partOfSpeech": "v.",
      "contextualMeaning": "观看；看",
      "use": "实验中观看快餐标志。",
      "preferredCollocations": [
        "view a logo"
      ]
    },
    "logo": {
      "partOfSpeech": "n.",
      "contextualMeaning": "标志；标识",
      "use": "快餐商标作为实验中的视觉刺激。",
      "preferredCollocations": [
        "a fast-food logo"
      ]
    },
    "millisecond": {
      "partOfSpeech": "n.",
      "contextualMeaning": "毫秒",
      "use": "千分之一秒，说明刺激或反应时间极短。",
      "preferredCollocations": [
        "within milliseconds"
      ]
    },
    "prime": {
      "partOfSpeech": "v.",
      "contextualMeaning": "使预先进入状态；诱发",
      "use": "快餐标志使人随后阅读变快。",
      "preferredCollocations": [
        "prime someone to react"
      ]
    },
    "read": {
      "partOfSpeech": "v.-ing（动名词）",
      "contextualMeaning": "阅读",
      "use": "reading为动名词作让步从句主语；同句read为动词原形，均为阅读义。",
      "preferredCollocations": [
        "read a passage"
      ]
    },
    "fast": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "更快地",
      "use": "faster为副词比较级，修饰read；20 percent是增速幅度。",
      "preferredCollocations": [
        "read faster"
      ]
    }
  },
  "2013-p3-s8": {
    "unconsciously": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "无意识地",
      "use": "人未觉察就把快餐与速度联系起来。",
      "preferredCollocations": [
        "associate unconsciously"
      ]
    },
    "fast": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "快速的（fast food快餐组成）",
      "use": "fast food作为整体表示快餐，与速度和不耐烦联想。",
      "preferredCollocations": [
        "read faster"
      ]
    },
    "impatience": {
      "partOfSpeech": "n.",
      "contextualMeaning": "不耐烦；急躁",
      "use": "快餐被联想到速度和急躁。",
      "preferredCollocations": [
        "show impatience"
      ]
    },
    "carry": {
      "partOfSpeech": "v.",
      "contextualMeaning": "携带；带入",
      "use": "把快餐联想带来的冲动迁移到其他活动中。",
      "preferredCollocations": [
        "carry an impulse into another activity"
      ]
    },
    "impulse": {
      "partOfSpeech": "n.",
      "contextualMeaning": "冲动",
      "use": "速度和不耐烦引发的冲动被带入别的活动。",
      "preferredCollocations": [
        "act on impulse"
      ]
    },
    "subject": {
      "partOfSpeech": "n.",
      "contextualMeaning": "被试；研究对象",
      "use": "Subjects是快餐图像实验的参与者。",
      "preferredCollocations": [
        "experimental subjects"
      ]
    },
    "flash": {
      "partOfSpeech": "n.",
      "contextualMeaning": "闪现；短暂呈现",
      "use": "fast-food flashes指快餐图像短暂呈现。",
      "preferredCollocations": [
        "brief flashes"
      ]
    },
    "musical": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "音乐的",
      "use": "musical piece指一段音乐作品。",
      "preferredCollocations": [
        "a musical piece"
      ]
    },
    "last": {
      "partOfSpeech": "v.",
      "contextualMeaning": "持续",
      "use": "被试觉得音乐持续过长。",
      "preferredCollocations": [
        "last too long"
      ]
    },
    "too": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "过于；太",
      "use": "too long表示主观觉得音乐太长。",
      "preferredCollocations": [
        "last too long"
      ]
    },
    "piece": {
      "partOfSpeech": "n.",
      "contextualMeaning": "作品；一首（音乐）",
      "use": "musical piece指一段音乐作品，不是艺术拍卖品。"
    },
    "long": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "长久地；长时间地",
      "use": "too long说明音乐持续的时间过长。"
    },
    "speed": {
      "partOfSpeech": "n.",
      "contextualMeaning": "速度",
      "use": "快餐引发对速度的无意识联想。"
    }
  },
  "2013-p3-s9": {
    "reverse": {
      "partOfSpeech": "v.",
      "contextualMeaning": "逆转；扭转",
      "use": "扭转快速刺激的负面影响或高速趋势。",
      "preferredCollocations": [
        "reverse a trend"
      ]
    },
    "influence": {
      "partOfSpeech": "n.",
      "contextualMeaning": "影响",
      "use": "快速刺激对其他活动产生的心理影响。",
      "preferredCollocations": [
        "reverse an influence"
      ]
    }
  },
  "2013-p3-s10": {
    "overreact": {
      "partOfSpeech": "v.",
      "contextualMeaning": "反应过度",
      "use": "对笑脸和外貌作出超出证据的反应。",
      "preferredCollocations": [
        "overreact to a stimulus"
      ]
    },
    "option": {
      "partOfSpeech": "n.",
      "contextualMeaning": "选择；可选项",
      "use": "housing options指可选择的住房。",
      "preferredCollocations": [
        "housing options"
      ]
    },
    "see": {
      "partOfSpeech": "v.",
      "contextualMeaning": "看见",
      "use": "看到笑脸，可能触发过度反应。",
      "preferredCollocations": [
        "see a happy face"
      ]
    },
    "happy": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "快乐的；愉快的",
      "use": "happy face指带笑意的脸，可能影响消费判断。",
      "preferredCollocations": [
        "a happy face"
      ]
    },
    "face": {
      "partOfSpeech": "n.",
      "contextualMeaning": "脸；面容",
      "use": "happy face是微笑的脸。",
      "preferredCollocations": [
        "a smiling face"
      ]
    },
    "good": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "好的；优秀的",
      "use": "good sales representatives指优秀销售代表。",
      "preferredCollocations": [
        "a good representative"
      ]
    },
    "sale": {
      "partOfSpeech": "n.",
      "contextualMeaning": "销售",
      "use": "sales作定语限定representatives。",
      "preferredCollocations": [
        "sales representatives"
      ]
    },
    "representative": {
      "partOfSpeech": "n.",
      "contextualMeaning": "代表",
      "use": "sales representatives指销售代表。",
      "preferredCollocations": [
        "sales representatives"
      ]
    },
    "estate": {
      "partOfSpeech": "n.",
      "contextualMeaning": "地产；不动产",
      "use": "real estate整体指房地产。",
      "preferredCollocations": [
        "real estate"
      ]
    },
    "agent": {
      "partOfSpeech": "n.",
      "contextualMeaning": "代理人；经纪人",
      "use": "real estate agents指房产经纪人。",
      "preferredCollocations": [
        "real estate agents"
      ]
    },
    "smile": {
      "partOfSpeech": "v.",
      "contextualMeaning": "微笑",
      "use": "销售人员和房产经纪人常微笑。",
      "preferredCollocations": [
        "smile at someone"
      ]
    },
    "take": {
      "partOfSpeech": "v.",
      "contextualMeaning": "花费；用",
      "use": "take a moment表示用一点时间，It takes...to...表示做事需要时间。",
      "preferredCollocations": [
        "take a moment"
      ]
    },
    "one": {
      "partOfSpeech": "num.",
      "contextualMeaning": "一个；一",
      "use": "one reason指出销售人员微笑的一个原因，不说唯一原因。"
    },
    "buy": {
      "partOfSpeech": "v.",
      "contextualMeaning": "购买；收购",
      "use": "购买消费品或住房前先停顿考虑。"
    }
  },
  "2013-p3-s11": {
    "screener": {
      "partOfSpeech": "n.",
      "contextualMeaning": "筛选人员",
      "use": "在招聘中筛查求职者的人。",
      "preferredCollocations": [
        "job screeners"
      ]
    },
    "reject": {
      "partOfSpeech": "v.",
      "contextualMeaning": "拒绝；排斥",
      "use": "招聘人员可能因偏见拒绝申请者。",
      "preferredCollocations": [
        "reject an applicant"
      ]
    },
    "applicant": {
      "partOfSpeech": "n.",
      "contextualMeaning": "申请者",
      "use": "female applicants指申请职位的女性。",
      "preferredCollocations": [
        "job applicants"
      ]
    },
    "hire": {
      "partOfSpeech": "v.",
      "contextualMeaning": "雇用",
      "use": "另聘外部筛选人员可避免现有筛选中的偏见。",
      "preferredCollocations": [
        "hire outside screeners"
      ]
    },
    "outside": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "外部的",
      "use": "修饰screeners，指另聘外部人员。",
      "preferredCollocations": [
        "outside screeners"
      ]
    },
    "female": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "女性的；雌性的",
      "use": "两处female分别限定筛选人员与申请者。"
    }
  },
  "2013-p3-s12": {
    "john": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "约翰",
      "use": "与Gottman组成专家姓名。",
      "preferredCollocations": [
        "John Gottman"
      ]
    },
    "gottman": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "戈特曼",
      "use": "John Gottman为本文引用的婚姻专家姓名。",
      "preferredCollocations": [
        "John Gottman"
      ]
    },
    "explain": {
      "partOfSpeech": "v.",
      "contextualMeaning": "解释；说明",
      "use": "戈特曼说明可靠快判断的前提。",
      "preferredCollocations": [
        "explain a finding"
      ]
    },
    "slice": {
      "partOfSpeech": "v.",
      "contextualMeaning": "切片；截取一小部分",
      "use": "thin slice为谓语，thick sliced分词修饰研究；共用切片比喻，但信息深度相反。",
      "preferredCollocations": [
        "slice information into parts"
      ]
    },
    "reliably": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "可靠地",
      "use": "修饰快速处理信息的准确可信程度。",
      "preferredCollocations": [
        "judge reliably"
      ]
    },
    "ground": {
      "partOfSpeech": "v.",
      "contextualMeaning": "以……为基础",
      "use": "ground reactions in study表示让反应建立在长期研究上。",
      "preferredCollocations": [
        "ground a judgment in evidence"
      ]
    },
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    },
    "thick": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "厚的；深入的",
      "use": "thick sliced比喻长期、深入研究。",
      "preferredCollocations": [
        "thick sliced study"
      ]
    },
    "long-term": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "长期的",
      "use": "深入长期研究是可靠判断的基础。",
      "preferredCollocations": [
        "long-term study"
      ]
    },
    "thin": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "薄的；少量的",
      "use": "thin slice以薄切片比喻少量信息，只有深厚背景才可靠。"
    },
    "study": {
      "partOfSpeech": "n.",
      "contextualMeaning": "研究",
      "use": "研究作为证据或长期了解的基础，不是正在学习的动词。"
    },
    "expert": {
      "partOfSpeech": "n.",
      "contextualMeaning": "专家",
      "use": "John Gottman是婚姻研究专家。"
    }
  },
  "2013-p3-s13": {
    "gottman": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "戈特曼",
      "use": "John Gottman为本文引用的婚姻专家姓名。",
      "preferredCollocations": [
        "John Gottman"
      ]
    },
    "want": {
      "partOfSpeech": "v.",
      "contextualMeaning": "想要",
      "use": "wants to assess指戈特曼想评估夫妻关系。",
      "preferredCollocations": [
        "want to assess"
      ]
    },
    "invite": {
      "partOfSpeech": "v.",
      "contextualMeaning": "邀请",
      "use": "戈特曼邀请夫妻到岛上接受观察。",
      "preferredCollocations": [
        "invite someone to a place"
      ]
    },
    "island": {
      "partOfSpeech": "n.",
      "contextualMeaning": "岛；岛屿",
      "use": "island修饰retreat，说明静居处的位置。",
      "preferredCollocations": [
        "an island retreat"
      ]
    },
    "retreat": {
      "partOfSpeech": "n.",
      "contextualMeaning": "静居处；休养地",
      "use": "island retreat指岛上的僻静住所。",
      "preferredCollocations": [
        "an island retreat"
      ]
    },
    "evaluation": {
      "partOfSpeech": "n.",
      "contextualMeaning": "评估",
      "use": "戈特曼对夫妻关系进行两天观察判断。",
      "preferredCollocations": [
        "a longer evaluation"
      ]
    },
    "second": {
      "partOfSpeech": "n.",
      "contextualMeaning": "秒",
      "use": "two seconds与two days形成强烈时间对比。",
      "preferredCollocations": [
        "two seconds"
      ]
    },
    "long": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "更长的",
      "use": "longer修饰evaluation，指评估所用时间更长。"
    },
    "stay": {
      "partOfSpeech": "v.",
      "contextualMeaning": "保持（某种状态）",
      "use": "stay together指夫妻继续共同生活，不是暂时停留某地。"
    }
  },
  "2013-p3-s14": {
    "mute": {
      "partOfSpeech": "v.",
      "contextualMeaning": "减弱；抑制",
      "use": "通过暂停压低本能反应的影响。",
      "preferredCollocations": [
        "mute a reaction"
      ]
    },
    "hard-wired": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "先天设定的；本能的",
      "use": "比喻大脑反应像预接好的线路，自动而快速。",
      "preferredCollocations": [
        "hard-wired responses"
      ]
    },
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    },
    "pause": {
      "partOfSpeech": "v.",
      "contextualMeaning": "停顿；暂停",
      "use": "by pausing表示通过停顿来抑制本能反应。",
      "preferredCollocations": [
        "pause before acting"
      ]
    },
    "differentiate": {
      "partOfSpeech": "v.",
      "contextualMeaning": "使不同；区分",
      "use": "反思能力把人与动物区别开。",
      "preferredCollocations": [
        "differentiate A from B"
      ]
    },
    "animal": {
      "partOfSpeech": "n.",
      "contextualMeaning": "动物",
      "use": "与人类的反思能力作对照。",
      "preferredCollocations": [
        "humans and animals"
      ]
    },
    "dog": {
      "partOfSpeech": "n.",
      "contextualMeaning": "狗",
      "use": "作为动物思考未来能力的例子。",
      "preferredCollocations": [
        "a pet dog"
      ]
    },
    "intermittently": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "间歇地；断断续续地",
      "use": "限定狗思考未来的持续性。",
      "preferredCollocations": [
        "occur intermittently"
      ]
    },
    "minute": {
      "partOfSpeech": "n.",
      "contextualMeaning": "分钟",
      "use": "社交判断至少一分钟，较复杂判断需要更久。",
      "preferredCollocations": [
        "a few minutes"
      ]
    }
  },
  "2013-p3-s15": {
    "historically": {
      "partOfSpeech": "adv.",
      "contextualMeaning": "在历史上；以往",
      "use": "以往的人类时间分配为长远思考能力作证。",
      "preferredCollocations": [
        "historically speaking"
      ]
    },
    "spend": {
      "partOfSpeech": "v.",
      "contextualMeaning": "花费",
      "use": "spent...days contemplating表示把时间用于思考。",
      "preferredCollocations": [
        "spend time doing something"
      ]
    },
    "contemplate": {
      "partOfSpeech": "v.",
      "contextualMeaning": "思考；沉思",
      "use": "考虑较长远的未来。",
      "preferredCollocations": [
        "contemplate the future"
      ]
    },
    "term": {
      "partOfSpeech": "n.",
      "contextualMeaning": "时期；期限",
      "use": "the longer term指较长远的未来。",
      "preferredCollocations": [
        "the long term"
      ]
    },
    "long": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "较长远的",
      "use": "longer修饰term，指较远的未来时段。"
    }
  },
  "2013-p3-s16": {
    "technology": {
      "partOfSpeech": "n.",
      "contextualMeaning": "技术",
      "use": "技术影响反应方式，却未改变人的本性。",
      "preferredCollocations": [
        "modern technology"
      ]
    },
    "react": {
      "partOfSpeech": "v.",
      "contextualMeaning": "反应；作出反应",
      "use": "对危险或消费刺激作反应。",
      "preferredCollocations": [
        "react to a stimulus"
      ]
    },
    "have": {
      "partOfSpeech": "aux.",
      "contextualMeaning": "构成完成时",
      "use": "hasn't是has not，否定技术已经改变人性；不能漏掉not。"
    },
    "change": {
      "partOfSpeech": "v.",
      "contextualMeaning": "改变；变化",
      "use": "技术可能改变反应方式，却未改变人的本性。"
    }
  },
  "2013-p3-s17": {
    "imaginative": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "有想象力的",
      "use": "想象能力使人能考虑眼前以外的选择。",
      "preferredCollocations": [
        "imaginative capacity"
      ]
    },
    "capacity": {
      "partOfSpeech": "n.",
      "contextualMeaning": "能力",
      "use": "指超越诱惑、扭转趋势的能力。",
      "preferredCollocations": [
        "the capacity to change"
      ]
    },
    "rise": {
      "partOfSpeech": "v.",
      "contextualMeaning": "超越；摆脱影响",
      "use": "rise above temptation表示不被诱惑控制。",
      "preferredCollocations": [
        "rise above temptation"
      ]
    },
    "temptation": {
      "partOfSpeech": "n.",
      "contextualMeaning": "诱惑",
      "use": "人能超越眼前诱惑，改变冲动趋势。",
      "preferredCollocations": [
        "resist temptation"
      ]
    },
    "reverse": {
      "partOfSpeech": "v.",
      "contextualMeaning": "逆转；扭转",
      "use": "扭转快速刺激的负面影响或高速趋势。",
      "preferredCollocations": [
        "reverse a trend"
      ]
    },
    "high-speed": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "高速的",
      "use": "指不断追求快速反应的趋势。",
      "preferredCollocations": [
        "a high-speed trend"
      ]
    }
  },
  "question-201331-prompt": {
    "need": {
      "partOfSpeech": "v.",
      "contextualMeaning": "需要",
      "use": "需要更多判断时间，needed作后置分词。",
      "preferredCollocations": [
        "need more time"
      ]
    },
    "make": {
      "partOfSpeech": "v.",
      "contextualMeaning": "作出",
      "use": "making decisions指作决定。",
      "preferredCollocations": [
        "make decisions"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "本文指日常判断和行动决定，不是法庭判决。",
      "preferredCollocations": [
        "make a decision"
      ]
    }
  },
  "question-201331-option-A": {
    "predetermine": {
      "partOfSpeech": "v.",
      "contextualMeaning": "预先决定",
      "use": "选项说时间预先决定准确性，强于原文。",
      "preferredCollocations": [
        "predetermine an outcome"
      ]
    },
    "accuracy": {
      "partOfSpeech": "n.",
      "contextualMeaning": "准确性",
      "use": "判断是否准确，而不是反应有多快。",
      "preferredCollocations": [
        "the accuracy of a judgment"
      ]
    },
    "judgment": {
      "partOfSpeech": "n.",
      "contextualMeaning": "判断",
      "use": "评价一个人的危险性、性格等所形成的认识。",
      "preferredCollocations": [
        "the accuracy of judgment"
      ]
    }
  },
  "question-201331-option-B": {
    "complexity": {
      "partOfSpeech": "n.",
      "contextualMeaning": "复杂性",
      "use": "选项说脑反应复杂性，原文未据此下结论。",
      "preferredCollocations": [
        "the complexity of a problem"
      ]
    },
    "brain": {
      "partOfSpeech": "n.",
      "contextualMeaning": "大脑",
      "use": "大脑与身体一起迅速响应危险。",
      "preferredCollocations": [
        "the human brain"
      ]
    },
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    },
    "prove": {
      "partOfSpeech": "v.",
      "contextualMeaning": "证明",
      "use": "证明复杂性是选项所说，并非本段实际结论。"
    }
  },
  "question-201331-option-C": {
    "assessment": {
      "partOfSpeech": "n.",
      "contextualMeaning": "评估；判断",
      "use": "题目问判断需要的时间与依据。",
      "preferredCollocations": [
        "an accurate assessment"
      ]
    }
  },
  "question-201331-option-D": {
    "urgency": {
      "partOfSpeech": "n.",
      "contextualMeaning": "紧迫性；紧急程度",
      "use": "危险判断更紧迫，因此需要更快反应。",
      "preferredCollocations": [
        "the urgency of a situation"
      ]
    }
  },
  "question-201332-prompt": {
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    },
    "logo": {
      "partOfSpeech": "n.",
      "contextualMeaning": "标志；标识",
      "use": "快餐商标作为实验中的视觉刺激。",
      "preferredCollocations": [
        "a fast-food logo"
      ]
    },
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "本文指日常判断和行动决定，不是法庭判决。",
      "preferredCollocations": [
        "make a decision"
      ]
    }
  },
  "question-201332-option-A": {
    "associative": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "联想性的",
      "use": "快餐引起速度联想，并迁移到别的活动。",
      "preferredCollocations": [
        "associative thinking"
      ]
    }
  },
  "question-201332-option-B": {
    "unconscious": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "无意识的",
      "use": "not unconscious是干扰项，反转原文的无意识联想。",
      "preferredCollocations": [
        "unconscious associations"
      ]
    }
  },
  "question-201332-option-D": {
    "impulsive": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "冲动的",
      "use": "原文impulses对应题目impulsive。",
      "preferredCollocations": [
        "impulsive decisions"
      ]
    }
  },
  "question-201333-prompt": {
    "reverse": {
      "partOfSpeech": "v.",
      "contextualMeaning": "逆转；扭转",
      "use": "扭转快速刺激的负面影响或高速趋势。",
      "preferredCollocations": [
        "reverse a trend"
      ]
    },
    "negative": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "负面的；不良的",
      "use": "负面反应影响是可减轻和扭转的对象。",
      "preferredCollocations": [
        "negative effects"
      ]
    },
    "influence": {
      "partOfSpeech": "n.",
      "contextualMeaning": "影响",
      "use": "快速刺激对其他活动产生的心理影响。",
      "preferredCollocations": [
        "reverse an influence"
      ]
    },
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "decision": {
      "partOfSpeech": "n.",
      "contextualMeaning": "决定；决策",
      "use": "本文指日常判断和行动决定，不是法庭判决。",
      "preferredCollocations": [
        "make a decision"
      ]
    }
  },
  "question-201333-option-A": {
    "impression": {
      "partOfSpeech": "n.",
      "contextualMeaning": "印象",
      "use": "第一印象可能受外貌和笑脸误导。",
      "preferredCollocations": [
        "a first impression"
      ]
    }
  },
  "question-201333-option-B": {
    "act": {
      "partOfSpeech": "v.",
      "contextualMeaning": "行动；做",
      "use": "think before we act要求先思考再行动。",
      "preferredCollocations": [
        "act quickly"
      ]
    }
  },
  "question-201334-prompt": {
    "john": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "约翰",
      "use": "与Gottman组成专家姓名。",
      "preferredCollocations": [
        "John Gottman"
      ]
    },
    "gottman": {
      "partOfSpeech": "proper n.",
      "contextualMeaning": "戈特曼",
      "use": "John Gottman为本文引用的婚姻专家姓名。",
      "preferredCollocations": [
        "John Gottman"
      ]
    },
    "snap": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "突然作出的；仓促的",
      "use": "snap限定decisions和reactions，强调即刻作出。",
      "preferredCollocations": [
        "snap decisions"
      ]
    },
    "reaction": {
      "partOfSpeech": "n.",
      "contextualMeaning": "反应",
      "use": "本文比较本能反应与反思后的判断。",
      "preferredCollocations": [
        "a quick reaction"
      ]
    }
  },
  "question-201334-option-A": {
    "critical": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "批判性的",
      "use": "第34题A添加了原文未限定的批判性评估。",
      "preferredCollocations": [
        "critical assessment"
      ]
    },
    "assessment": {
      "partOfSpeech": "n.",
      "contextualMeaning": "评估；判断",
      "use": "题目问判断需要的时间与依据。",
      "preferredCollocations": [
        "an accurate assessment"
      ]
    }
  },
  "question-201334-option-B": {
    "slice": {
      "partOfSpeech": "v.",
      "contextualMeaning": "切片；截取一小部分",
      "use": "thin slice借喻凭少量信息迅速判断，thick sliced借喻深入研究。",
      "preferredCollocations": [
        "slice information into parts"
      ]
    },
    "study": {
      "partOfSpeech": "n.",
      "contextualMeaning": "研究",
      "use": "研究作为证据或长期了解的基础，不是正在学习的动词。"
    },
    "thin": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "薄的；少量的",
      "use": "thin slice以薄切片比喻少量信息，只有深厚背景才可靠。"
    }
  },
  "question-201334-option-C": {
    "adequate": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "充分的；足够的",
      "use": "adequate information是可靠快判断的基础。",
      "preferredCollocations": [
        "adequate information"
      ]
    }
  },
  "question-201334-option-D": {
    "sensible": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "合理的；明智的",
      "use": "形容选项中的explanation。",
      "preferredCollocations": [
        "a sensible choice"
      ]
    },
    "explanation": {
      "partOfSpeech": "n.",
      "contextualMeaning": "解释；说明",
      "use": "选项的合理解释不同于原文要求的充分观察。",
      "preferredCollocations": [
        "a sensible explanation"
      ]
    }
  },
  "question-201335-prompt": {
    "reverse": {
      "partOfSpeech": "v.",
      "contextualMeaning": "逆转；扭转",
      "use": "扭转快速刺激的负面影响或高速趋势。",
      "preferredCollocations": [
        "reverse a trend"
      ]
    },
    "high-speed": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "高速的",
      "use": "指不断追求快速反应的趋势。",
      "preferredCollocations": [
        "a high-speed trend"
      ]
    }
  },
  "question-201335-option-D": {
    "doubtful": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "怀疑的；不确定的",
      "use": "第35题D表示对能否扭转趋势有怀疑，与结尾信心相反。",
      "preferredCollocations": [
        "a doubtful attitude"
      ]
    }
  },
  "question-201333-option-D": {
    "expert": {
      "partOfSpeech": "adj.",
      "contextualMeaning": "专业的；专家的",
      "use": "expert限定advice，表示专家提供的建议。"
    }
  }
};
const phrases:PhraseRow[] = [
  [
    "2013-p3-prone-to",
    "are prone to",
    "be prone to + noun/doing",
    "形容词介词搭配",
    "容易……；倾向于……",
    "to是介词，后接名词或动名词，常说不利倾向。",
    "We are prone to errors.",
    "我们容易出错。",
    "prone本身不是动作动词。"
  ],
  [
    "be-likely-to-do",
    "are likely to",
    "be likely to do",
    "可能性结构",
    "可能做某事",
    "to引出可能发生的动作。",
    "They are likely to react.",
    "他们很可能作出反应。",
    "只是可能，不保证一定发生。"
  ],
  [
    "p5-collocation-at-least",
    "at least",
    "at least + noun/clause",
    "下限表达",
    "至少",
    "给出最低数量或程度。",
    "We need at least a minute.",
    "我们至少需要一分钟。",
    "与preferably给出的理想值分开。"
  ],
  [
    "2013-p3-reaction-to",
    "in reaction to",
    "in reaction to + noun",
    "介词搭配",
    "作为对……的反应",
    "to后接引发反应的刺激。",
    "He paused in reaction to the news.",
    "听到消息后他停顿了。",
    "to是介词，不是不定式标记。"
  ],
  [
    "2013-p3-exclusive-to",
    "exclusive to",
    "exclusive to + noun",
    "形容词介词搭配",
    "为……所独有",
    "否定时表示并非该范围专有。",
    "This behavior is not exclusive to humans.",
    "这种行为并非人类独有。",
    "not exclusive不表示这个群体没有这种行为。"
  ],
  [
    "2013-p3-little-to-do",
    "has little to do with",
    "have little to do with + noun/doing",
    "关联程度表达",
    "与……几乎无关",
    "little否定关联的程度。",
    "Reading has little to do with eating.",
    "阅读与吃东西几乎无关。",
    "不要译成只有一点事情要做。"
  ],
  [
    "2013-p3-associate-with",
    "associate fast food with speed and impatience",
    "associate A with B",
    "动词搭配",
    "把A与B联系起来",
    "A和B是被联系起来的两个对象。",
    "We associate summer with warmth.",
    "我们把夏天与温暖联系起来。",
    "联系不自动等于因果。"
  ],
  [
    "tend-to-do",
    "tend to",
    "tend to do something",
    "倾向结构",
    "往往；倾向于做某事",
    "描述常见倾向，不是普遍必然。",
    "People tend to hurry.",
    "人们往往会着急。",
    "不得把tend扩大为always。"
  ],
  [
    "2013-p3-real-estate",
    "real estate",
    "real estate",
    "复合名词",
    "房地产",
    "real estate整体限定agents的业务领域。",
    "She works in real estate.",
    "她从事房地产工作。",
    "不能分别译成真实和状态。"
  ],
  [
    "2013-p3-ground-in",
    "ground such snap reactions in \"thick sliced\" long-term study",
    "ground A in B",
    "动词搭配",
    "使A以B为基础",
    "A是判断或反应，B是依据。",
    "Ground your judgment in evidence.",
    "让判断建立在证据上。",
    "ground在这里是动词，不是地面。"
  ],
  [
    "2013-p3-differentiate-from",
    "differentiates us from animals",
    "differentiate A from B",
    "区分结构",
    "使A区别于B",
    "A与B是被区分的对象。",
    "This ability differentiates humans from animals.",
    "这种能力使人区别于动物。",
    "不能把from译成能力的来源。"
  ],
  [
    "2013-p3-rise-above",
    "rise above temptation",
    "rise above + noun",
    "引申动词搭配",
    "超越；克服",
    "表示不受诱惑或困境支配。",
    "She rose above temptation.",
    "她克服了诱惑。",
    "不是在空间上升到诱惑上方。"
  ]
];
const phr=reviewedPhrases(phrases);
export const passage2013P3PhraseGuides=phr.guides;
export const passage2013P3PhraseAliases:Record<string,string>={...phr.aliases,"are more likely to":"be-likely-to-do"};
export const passage2013P3PhraseGlosses={...lex.glosses,...phr.glosses};
