import type { BeginnerClauseDetail, BeginnerSyntaxComponent, Question, SentenceAnalysis } from "./data";

const component = (text: string, form: string, fn: string, modifies: string, explanation: string): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation });
const clause = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, objectOrComplement: string, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, objectOrComplement, translationOrder });

export const passage2010P3Sentences: SentenceAnalysis[] = [
  {
    id: "2010-p3-s1", number: 1,
    text: "Over the past decade, many companies had perfected the art of creating automatic behaviors – habits – among consumers.",
    chunks: [{ text: "Over the past decade,", role: "modifier" }, { text: " many companies", role: "subject" }, { text: " had perfected", role: "predicate" }, { text: " the art", role: "object" }, { text: " of creating automatic behaviors – habits – among consumers.", role: "modifier" }],
    trunk: "many companies had perfected the art.",
    layers: [{ label: "经营手法", text: "companies had perfected the art：企业已把一套手法完善成熟；art 在这里不是美术。" }, { label: "手法内容", text: "of creating automatic behaviors 说明什么手法；habits 插入解释 automatic behaviors，among consumers 限定习惯形成的人群。" }],
    grammar: ["had perfected 为原卷的过去完成时，不能因 Over the past decade 而擅改为 have perfected。", "of 后的 creating 是动名词；behaviors 是它的宾语，破折号中的 habits 是同位解释而非另一个谓语。"],
    beginnerSyntax: { components: [component("Over the past decade", "介词 + 时间名词短语", "时间状语", "had perfected", "over 表覆盖所说的十年。"), component("many companies", "数量词 + 复数名词", "主语", "had perfected", "实施商业手法的主体是企业。"), component("had perfected the art", "过去完成时 + 名词宾语", "谓语与宾语", "many companies", "perfect 在这里是动词‘完善’，art 指技巧。"), component("of creating automatic behaviors", "of + 动名词短语", "后置定语", "the art", "说明手法是培养不假思索的行为。"), component("habits", "复数名词", "同位语", "automatic behaviors", "破折号中把这些自动行为解释为习惯。"), component("among consumers", "介词短语", "范围状语", "creating automatic behaviors", "说明在消费者群体中培养行为。")], clauses: [] },
    literal: "在过去十年里，许多公司已完善了在消费者中创造自动行为——习惯——的手法。",
    natural: "过去十年间，许多公司已熟练掌握让消费者养成不假思索的行为习惯的手法。",
    logic: "提出全文主题：企业有意培养消费习惯，而非仅被动迎合既有需求。", phrases: ["Over the past decade", "the art of creating automatic behaviors"],
  },
  {
    id: "2010-p3-s2", number: 2,
    text: "These habits have helped companies earn billions of dollars when customers eat snacks or wipe counters almost without thinking, often in response to a carefully designed set of daily cues.",
    chunks: [{ text: "These habits", role: "subject" }, { text: " have helped", role: "predicate" }, { text: " companies earn billions of dollars", role: "object" }, { text: " when customers eat snacks or wipe counters almost without thinking,", role: "condition" }, { text: " often in response to a carefully designed set of daily cues.", role: "modifier" }],
    trunk: "These habits have helped companies earn billions of dollars.",
    layers: [{ label: "习惯带来收益", text: "help companies earn：使企业赚到钱，companies 同时是 earn 的逻辑主语。" }, { label: "消费行为", text: "when 后 customers 共用主语，eat snacks 与 wipe counters 并列。" }, { label: "行为触发", text: "without thinking 表几乎未经思考；in response to...cues 表行为常由精心设计的日常提示触发。" }],
    grammar: ["help somebody (to) do 中 to 可省略；earn 是宾语补足语，不是 helped 的并列谓语。", "carefully designed 为副词修饰过去分词，整体限定 set；of daily cues 说明这套提示的内容。"],
    beginnerSyntax: { components: [component("These habits", "指示限定词 + 复数名词", "主语", "have helped", "these 回指上一句公司培养的习惯。"), component("have helped companies earn billions of dollars", "完成时 + 宾语 + 不带to的不定式", "谓语、宾语及宾补", "These habits", "companies 是被帮助者；earn 的宾语是 billions of dollars。"), component("when customers eat snacks or wipe counters almost without thinking", "when 引导的完整分句", "时间状语", "have helped companies earn", "用具体消费场景解释企业如何获利。"), component("almost without thinking", "副词 + without + 动名词", "方式状语", "eat snacks or wipe counters", "强调几乎不加思索，不是完全没有意识。"), component("often in response to a carefully designed set of daily cues", "频率副词 + 介词性结构", "触发原因状语", "customers 的日常行为", "提示经过设计；set 是中心词，不把 designed 当新谓语。")], clauses: [clause("when customers eat snacks or wipe counters almost without thinking", "时间状语从句", "when", "说明产生收益的消费场景", "customers", "eat / wipe", "snacks / counters（对应宾语）", "先读消费者做什么，再理解这些习惯使企业获利。") ] },
    literal: "当顾客几乎不假思索地吃零食或擦台面，常常是对一套精心设计的日常提示作出反应时，这些习惯已帮助公司赚取数十亿美元。",
    natural: "消费者常受精心设计的日常提示驱动，不假思索地吃零食、擦台面；这些习惯已为企业带来数十亿美元收入。",
    logic: "用行为与收益说明培养习惯的商业价值，引出公共卫生领域借鉴的动机。", phrases: ["in response to", "billions of dollars", "without thinking"],
  },
  {
    id: "2010-p3-s3", number: 3,
    text: "\"There are fundamental public health problems, like dirty hands instead of a soap habit, that remain killers only because we can't figure out how to change people's habits,\" said Dr. Curtis, the director of the Hygiene Center at the London School of Hygiene & Tropical Medicine.",
    chunks: [{ text: "\"There are", role: "predicate" }, { text: " fundamental public health problems,", role: "subject" }, { text: " like dirty hands instead of a soap habit,", role: "modifier" }, { text: " that remain killers", role: "modifier" }, { text: " only because we can't figure out how to change people's habits,\"", role: "condition" }, { text: " said", role: "predicate" }, { text: " Dr. Curtis,", role: "subject" }, { text: " the director of the Hygiene Center at the London School of Hygiene & Tropical Medicine.", role: "modifier" }],
    trunk: "\"There are problems,\" said Dr. Curtis.",
    layers: [{ label: "引述框架", text: "There are 是存在句；said Dr. Curtis 为引语后倒装；姓名后 director 短语解释身份。" }, { label: "问题与原因", text: "like 插入举例；that 越过举例回指 problems；because 说明这些问题仍会致命的原因。" }],
    grammar: ["there 为存在句引导成分；remain 为系动词，killers 为表语。", "how to change 是疑问不定式宾语，没有限定时态；不能凭空补成原文从句。", "Dr. 是称谓缩写；院校名中的 & 和原卷大小写保留。"],
    beginnerSyntax: { components: [component("There are fundamental public health problems", "there be + 名词", "引语主干", "整段引语", "problems 是存在的事物，public health 指公共卫生。"), component("like dirty hands instead of a soap habit", "like + 名词及替代结构", "举例说明", "problems", "有脏手而无肥皂洗手习惯，不是建议保留脏手。"), component("that remain killers only because we can't figure out how to change people's habits", "含原因从句的关系从句", "后置定语", "problems", "that 指问题；killers 指致命因素。"), component("how to change people's habits", "疑问词 + to不定式", "宾语", "figure out", "讨论怎样改变习惯，people's 限定 habits。"), component("said Dr. Curtis", "谓语 + 主语", "引述框架", "前面的直接引语", "博士说话；后面的名词短语补充其身份。"), component("the director of the Hygiene Center at the London School of Hygiene & Tropical Medicine", "名词及of、at短语", "同位语", "Dr. Curtis", "director 指主任，at 短语说明中心隶属的院校。")], clauses: [clause("that remain killers only because we can't figure out how to change people's habits", "定语从句", "that", "修饰 problems", "that（problems）", "remain", "killers（表语）", "先读问题仍会致命，再读内层原因。"), clause("because we can't figure out how to change people's habits", "原因状语从句", "because", "解释 remain killers", "we", "can't figure out", "how to change people's habits", "先读无法弄明白怎样改变习惯，再联系致命问题。") ] },
    literal: "‘有些根本性的公共卫生问题，比如手脏而没有肥皂洗手习惯，仍是致命因素，只因为我们弄不清怎样改变人们的习惯。’伦敦卫生与热带医学院卫生中心主任柯蒂斯博士说。",
    natural: "伦敦卫生与热带医学院卫生中心主任柯蒂斯博士说：‘脏手、不用肥皂洗手等根本性的公共卫生问题仍在夺人性命，仅仅是因为我们还不知道怎样改变人们的习惯。’",
    logic: "转向公共卫生：需要培养肥皂洗手习惯，为31题提供依据。", phrases: ["instead of", "figure out"],
  },
  {
    id: "2010-p3-s4", number: 4,
    text: "\"We wanted to learn from private industry how to create new behaviors that happen automatically.\"",
    chunks: [{ text: "\"We", role: "subject" }, { text: " wanted", role: "predicate" }, { text: " to learn from private industry how to create new behaviors", role: "object" }, { text: " that happen automatically.\"", role: "modifier" }],
    trunk: "We wanted to learn how to create new behaviors.",
    layers: [{ label: "学习目的", text: "wanted to learn 表想学习；from private industry 指向企业界学习，不是把健康看成私人问题。" }, { label: "学习内容", text: "how to create 是 learn 的宾语；that happen automatically 限定 behaviors。" }],
    grammar: ["want to do 与 learn how to do 两层不定式嵌套，没有独立限定时态。", "that 在定语从句中作主语；automatically 为方式副词修饰 happen。"],
    beginnerSyntax: { components: [component("We wanted to learn", "主语、谓语及不定式", "主干", "整句", "we 指研究者；wanted 的内容是学习。"), component("from private industry", "介词短语", "来源状语", "learn", "向私营企业界学习。"), component("how to create new behaviors", "疑问不定式", "宾语", "learn", "create 的宾语是 new behaviors。"), component("that happen automatically", "关系从句", "后置定语", "behaviors", "限定为自然发生而不需刻意思考的行为。")], clauses: [clause("that happen automatically", "定语从句", "that", "修饰 behaviors", "that（behaviors）", "happen", "无宾语；automatically为方式状语", "先理解自动发生的行为，再联系培养行为的方法。") ] },
    literal: "我们想从私营企业界学习如何创造会自动发生的新行为。",
    natural: "我们想向企业界学习，怎样让人们自然而然地养成新的行为习惯。",
    logic: "承接卫生困境，明确研究者借鉴商业手法的目的。", phrases: ["learn from private industry"],
  },
  {
    "id": "2010-p3-s5",
    "number": 5,
    "text": "The companies that Dr. Curtis turned to – Procter & Gamble, Colgate-Palmolive and Unilever – had invested hundreds of millions of dollars finding the subtle cues in consumers' lives that corporations could use to introduce new routines.",
    "chunks": [
      {
        "text": "The companies",
        "role": "subject"
      },
      {
        "text": " that Dr. Curtis turned to – Procter & Gamble, Colgate-Palmolive and Unilever –",
        "role": "modifier"
      },
      {
        "text": " had invested",
        "role": "predicate"
      },
      {
        "text": " hundreds of millions of dollars",
        "role": "object"
      },
      {
        "text": " finding the subtle cues in consumers' lives",
        "role": "modifier"
      },
      {
        "text": " that corporations could use to introduce new routines.",
        "role": "modifier"
      }
    ],
    "trunk": "The companies had invested hundreds of millions of dollars.",
    "layers": [
      {
        "label": "主干和企业名单",
        "text": "companies had invested：企业已投入资金；that Dr. Curtis turned to限定她求助的企业，破折号中列出三家公司。"
      },
      {
        "label": "投入用途与线索",
        "text": "finding...说明投入用来寻找提示；that corporations could use修饰cues，而非lives；to introduce说明利用提示的目的。"
      }
    ],
    "grammar": [
      "turn to somebody表示向某人求助；关系代词that是介词to的宾语。",
      "invest money (in) doing：投入资金做某事；finding不是had invested的并列限定谓语。",
      "could use的宾语是回指cues的that；consumers’ lives为消费者的日常生活，不是生命数量。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "The companies",
          "form": "冠词+名词",
          "function": "主语",
          "modifies": "had invested",
          "explanation": "公司是投资主体。"
        },
        {
          "text": "that Dr. Curtis turned to",
          "form": "关系从句",
          "function": "后置定语",
          "modifies": "companies",
          "explanation": "turn to表示求助；that对应to的对象。"
        },
        {
          "text": "Procter & Gamble, Colgate-Palmolive and Unilever",
          "form": "并列专有名词",
          "function": "同位说明",
          "modifies": "The companies",
          "explanation": "分别是宝洁、高露洁-棕榄和联合利华，均为公司名。"
        },
        {
          "text": "had invested hundreds of millions of dollars",
          "form": "过去完成时+金额",
          "function": "谓语及宾语",
          "modifies": "The companies",
          "explanation": "hundreds of millions为数亿美元，不是几百美元。"
        },
        {
          "text": "finding the subtle cues in consumers' lives",
          "form": "动名词短语",
          "function": "投资用途补足成分",
          "modifies": "had invested",
          "explanation": "寻找消费者生活中的微妙提示；in...限定提示出现的范围。"
        },
        {
          "text": "that corporations could use to introduce new routines",
          "form": "关系从句",
          "function": "后置定语",
          "modifies": "cues",
          "explanation": "公司可以利用提示引入新惯例。"
        },
        {
          "text": "to introduce new routines",
          "form": "to不定式",
          "function": "目的状语",
          "modifies": "could use",
          "explanation": "说明使用提示为的是建立新习惯。"
        }
      ],
      "clauses": [
        {
          "text": "that Dr. Curtis turned to",
          "type": "定语从句",
          "marker": "that",
          "role": "限定companies",
          "subject": "Dr. Curtis",
          "predicate": "turned to",
          "objectOrComplement": "that（companies，为to的宾语）",
          "translationOrder": "先理解柯蒂斯博士求助，再确定是哪几家公司。"
        },
        {
          "text": "that corporations could use to introduce new routines",
          "type": "定语从句",
          "marker": "that",
          "role": "限定cues",
          "subject": "corporations",
          "predicate": "could use",
          "objectOrComplement": "that（cues）；to introduce...为目的",
          "translationOrder": "先读公司可利用，再回到生活中的提示。"
        }
      ]
    },
    "literal": "柯蒂斯博士求助的公司——宝洁、高露洁-棕榄和联合利华——已经投入数亿美元，寻找消费者生活中公司能够用来引入新习惯的微妙提示。",
    "natural": "柯蒂斯博士求助的宝洁、高露洁-棕榄和联合利华等公司，早已投入数亿美元，寻找消费者日常生活中的细微线索，借此培养新的生活习惯。",
    "logic": "说明企业掌握培养习惯的方法，也为33题区分企业与产品提供直接证据。",
    "phrases": [
      "turned to",
      "hundreds of millions of dollars",
      "introduce new routines"
    ]
  },
  {
    "id": "2010-p3-s6",
    "number": 6,
    "text": "If you look hard enough, you'll find that many of the products we use every day – chewing gums, skin moisturizers, disinfecting wipes, air fresheners, water purifiers, health snacks, teeth whiteners, fabric softeners, vitamins – are results of manufactured habits.",
    "chunks": [
      {
        "text": "If you look hard enough,",
        "role": "condition"
      },
      {
        "text": " you'll",
        "role": "subject"
      },
      {
        "text": " find",
        "role": "predicate"
      },
      {
        "text": " that many of the products",
        "role": "object"
      },
      {
        "text": " we use every day",
        "role": "modifier"
      },
      {
        "text": " – chewing gums, skin moisturizers, disinfecting wipes, air fresheners, water purifiers, health snacks, teeth whiteners, fabric softeners, vitamins –",
        "role": "modifier"
      },
      {
        "text": " are",
        "role": "predicate"
      },
      {
        "text": " results of manufactured habits.",
        "role": "object"
      }
    ],
    "trunk": "you'll find that many of the products are results of manufactured habits.",
    "layers": [
      {
        "label": "观察条件",
        "text": "If...说明只要仔细观察，就会发现后面的命题；hard修饰look，enough后置修饰hard。"
      },
      {
        "label": "发现内容",
        "text": "find后that宾语从句以many of the products为主语，以are results为系表结构。"
      },
      {
        "label": "产品与例子",
        "text": "we use every day是省略关系词的定语从句；破折号内九类产品解释products，不打断主句结构。"
      }
    ],
    "grammar": [
      "many of+限定词+复数名词表示其中许多；manufactured为过去分词作定语，指人为塑造。",
      "we use every day中的use缺宾语，由先行词products补足；every day作时间状语。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "If you look hard enough",
          "form": "条件从句",
          "function": "条件状语",
          "modifies": "you’ll find",
          "explanation": "先仔细观察，才会发现这些产品背后的习惯。"
        },
        {
          "text": "you'll find",
          "form": "主语+情态式谓语",
          "function": "主句主干",
          "modifies": "整句",
          "explanation": "you是泛指读者；will缩写在you’ll中。"
        },
        {
          "text": "that many of the products we use every day – chewing gums, skin moisturizers, disinfecting wipes, air fresheners, water purifiers, health snacks, teeth whiteners, fabric softeners, vitamins – are results of manufactured habits",
          "form": "that内容从句",
          "function": "宾语",
          "modifies": "find",
          "explanation": "内容主干为many of the products are results。"
        },
        {
          "text": "we use every day",
          "form": "省略关系代词的从句",
          "function": "后置定语",
          "modifies": "products",
          "explanation": "限定我们日常使用的产品。"
        },
        {
          "text": "chewing gums, skin moisturizers, disinfecting wipes",
          "form": "三个并列名词短语",
          "function": "同位举例第一组",
          "modifies": "products",
          "explanation": "口香糖、润肤品、消毒湿巾；各修饰语分别限定自己的名词。"
        },
        {
          "text": "air fresheners, water purifiers, health snacks",
          "form": "三个并列名词短语",
          "function": "同位举例第二组",
          "modifies": "products",
          "explanation": "空气清新剂、净水器、健康零食。"
        },
        {
          "text": "teeth whiteners, fabric softeners, vitamins",
          "form": "三个并列名词短语",
          "function": "同位举例第三组",
          "modifies": "products",
          "explanation": "牙齿美白剂、织物柔顺剂、维生素。"
        },
        {
          "text": "results of manufactured habits",
          "form": "名词+of短语",
          "function": "表语",
          "modifies": "many of the products",
          "explanation": "结果来自人为培养的习惯，并非习惯由自然需要必然产生。"
        }
      ],
      "clauses": [
        {
          "text": "If you look hard enough",
          "type": "条件状语从句",
          "marker": "If",
          "role": "限定发现的条件",
          "subject": "you",
          "predicate": "look",
          "objectOrComplement": "无宾语；hard enough为程度/方式",
          "translationOrder": "先译观察条件，再译发现。"
        },
        {
          "text": "that many of the products we use every day – chewing gums, skin moisturizers, disinfecting wipes, air fresheners, water purifiers, health snacks, teeth whiteners, fabric softeners, vitamins – are results of manufactured habits",
          "type": "宾语从句",
          "marker": "that",
          "role": "作find的宾语",
          "subject": "many of the products we use every day",
          "predicate": "are",
          "objectOrComplement": "results of manufactured habits（表语）",
          "translationOrder": "先抓产品是结果，再插入日用范围与例子。"
        },
        {
          "text": "we use every day",
          "type": "定语从句",
          "marker": "省略that/which",
          "role": "修饰products",
          "subject": "we",
          "predicate": "use",
          "objectOrComplement": "省略的关系代词，指products",
          "translationOrder": "先译我们每天用的，再接产品。"
        }
      ]
    },
    "literal": "如果你观察得足够仔细，就会发现，我们每天使用的许多产品——口香糖、润肤品、消毒湿巾、空气清新剂、净水器、健康零食、牙齿美白剂、织物柔顺剂、维生素——都是人为塑造习惯的结果。",
    "natural": "仔细观察就会发现，口香糖、润肤品、消毒湿巾、空气清新剂、净水器、健康零食、牙齿美白剂、织物柔顺剂和维生素等许多日用品，背后都有被人为培养的消费习惯。",
    "logic": "列举日用品，点明人为培养习惯的广泛性；为后文三个详细实例搭桥。",
    "phrases": [
      "manufactured habits"
    ]
  },
  {
    "id": "2010-p3-s7",
    "number": 7,
    "text": "A century ago, few people regularly brushed their teeth multiple times a day.",
    "chunks": [
      {
        "text": "A century ago,",
        "role": "modifier"
      },
      {
        "text": " few people",
        "role": "subject"
      },
      {
        "text": " regularly",
        "role": "modifier"
      },
      {
        "text": " brushed",
        "role": "predicate"
      },
      {
        "text": " their teeth",
        "role": "object"
      },
      {
        "text": " multiple times a day.",
        "role": "modifier"
      }
    ],
    "trunk": "few people brushed their teeth.",
    "layers": [
      {
        "label": "过去的稀少行为",
        "text": "few people带否定倾向，指很少有人，不是a few所说的有一些人。"
      },
      {
        "label": "频次",
        "text": "regularly表示有规律；multiple times a day表示一天多次，两者分别说明习惯性和次数。"
      }
    ],
    "grammar": [
      "ago置于时段之后，常与一般过去时连用。",
      "their回指people；teeth为tooth的不规则复数。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "A century ago",
          "form": "时间名词+ago",
          "function": "时间状语",
          "modifies": "brushed",
          "explanation": "指一个世纪以前。"
        },
        {
          "text": "few people",
          "form": "数量限定词+名词",
          "function": "主语",
          "modifies": "brushed",
          "explanation": "few强调人数少，不能漏译。"
        },
        {
          "text": "regularly",
          "form": "副词",
          "function": "频率状语",
          "modifies": "brushed",
          "explanation": "有规律地刷牙。"
        },
        {
          "text": "brushed their teeth",
          "form": "动词+名词宾语",
          "function": "谓语及宾语",
          "modifies": "few people",
          "explanation": "刷自己的牙；brushed为过去式。"
        },
        {
          "text": "multiple times a day",
          "form": "次数短语",
          "function": "频率状语",
          "modifies": "brushed",
          "explanation": "a day相当于每一天，不是某一天。"
        }
      ],
      "clauses": []
    },
    "literal": "一个世纪以前，很少有人有规律地每天多次刷牙。",
    "natural": "一百年前，几乎没有人养成每天刷牙多次的习惯。",
    "logic": "建立历史基线，和下一句当今刷牙习惯作对照。",
    "phrases": [
      "brushed their teeth"
    ]
  },
  {
    "id": "2010-p3-s8",
    "number": 8,
    "text": "Today, because of shrewd advertising and public health campaigns, many Americans habitually give their pearly whites a cavity-preventing scrub twice a day, often with Colgate, Crest or one of the other brands.",
    "chunks": [
      {
        "text": "Today, because of shrewd advertising and public health campaigns,",
        "role": "modifier"
      },
      {
        "text": " many Americans",
        "role": "subject"
      },
      {
        "text": " habitually",
        "role": "modifier"
      },
      {
        "text": " give",
        "role": "predicate"
      },
      {
        "text": " their pearly whites a cavity-preventing scrub",
        "role": "object"
      },
      {
        "text": " twice a day, often with Colgate, Crest or one of the other brands.",
        "role": "modifier"
      }
    ],
    "trunk": "many Americans give their pearly whites a cavity-preventing scrub.",
    "layers": [
      {
        "label": "原因及结果",
        "text": "because of后为两个名词性成分，表示广告和公共卫生宣传带来今天的习惯。"
      },
      {
        "label": "刷牙的表达",
        "text": "give A a scrub是给A擦洗；their pearly whites借指洁白的牙齿，不是珍珠。"
      },
      {
        "label": "时间和产品",
        "text": "twice a day说明每日两次；with...列使用的牙膏品牌。"
      }
    ],
    "grammar": [
      "give为双宾语结构：间接宾语their pearly whites，直接宾语a cavity-preventing scrub。",
      "because of接名词短语，不是because引导从句；cavity-preventing为复合定语，表防蛀的。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "Today",
          "form": "时间副词",
          "function": "时间状语",
          "modifies": "give",
          "explanation": "与A century ago对照。"
        },
        {
          "text": "because of shrewd advertising and public health campaigns",
          "form": "介词性原因短语",
          "function": "原因状语",
          "modifies": "habitually give",
          "explanation": "说明习惯形成的推动因素。"
        },
        {
          "text": "many Americans",
          "form": "数量词+名词",
          "function": "主语",
          "modifies": "give",
          "explanation": "主体是许多美国人。"
        },
        {
          "text": "habitually",
          "form": "副词",
          "function": "方式状语",
          "modifies": "give",
          "explanation": "表示作为习惯来做。"
        },
        {
          "text": "give their pearly whites a cavity-preventing scrub",
          "form": "动词+双宾语",
          "function": "谓语及双宾语",
          "modifies": "many Americans",
          "explanation": "给牙齿做一次防蛀清洁，即刷牙。"
        },
        {
          "text": "twice a day",
          "form": "频次短语",
          "function": "频率状语",
          "modifies": "give",
          "explanation": "每天两次。"
        },
        {
          "text": "often with Colgate, Crest or one of the other brands",
          "form": "副词+介词短语",
          "function": "频率与工具状语",
          "modifies": "give...a scrub",
          "explanation": "with表示使用品牌产品，不是和公司一起。"
        }
      ],
      "clauses": []
    },
    "literal": "如今，由于精明的广告和公共卫生宣传，许多美国人习惯性地每天两次给洁白的牙齿做防蛀清洁，常用高露洁、佳洁士或其他某个品牌。",
    "natural": "如今，在巧妙广告和公共卫生宣传的推动下，许多美国人已习惯每天刷牙两次以预防龋齿，常使用高露洁、佳洁士等品牌。",
    "logic": "以刷牙习惯的今昔变化，证明宣传能塑造日常行为。",
    "phrases": [
      "because of",
      "twice a day",
      "pearly whites"
    ]
  },
  {
    "id": "2010-p3-s9",
    "number": 9,
    "text": "A few decades ago, many people didn't drink water outside of a meal.",
    "chunks": [
      {
        "text": "A few decades ago,",
        "role": "modifier"
      },
      {
        "text": " many people",
        "role": "subject"
      },
      {
        "text": " didn't drink",
        "role": "predicate"
      },
      {
        "text": " water",
        "role": "object"
      },
      {
        "text": " outside of a meal.",
        "role": "modifier"
      }
    ],
    "trunk": "many people didn't drink water.",
    "layers": [
      {
        "label": "过去习惯",
        "text": "didn’t drink为过去时否定；outside of a meal限定不是吃饭的时候。"
      },
      {
        "label": "数量限定",
        "text": "a few decades是几十年；many people表示许多人，不等于所有人。"
      }
    ],
    "grammar": [
      "did承担过去时，drink保持原形。",
      "outside of在此表示时间或活动范围之外，不是站到饭菜外面。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "A few decades ago",
          "form": "时段+ago",
          "function": "时间状语",
          "modifies": "didn’t drink",
          "explanation": "几十年前，与上文一百年前不是同一时点。"
        },
        {
          "text": "many people",
          "form": "数量词+名词",
          "function": "主语",
          "modifies": "didn’t drink",
          "explanation": "描述相当一部分人。"
        },
        {
          "text": "didn't drink water",
          "form": "过去时否定+宾语",
          "function": "谓语及宾语",
          "modifies": "many people",
          "explanation": "water是不可数名词；否定限定喝水行为。"
        },
        {
          "text": "outside of a meal",
          "form": "介词短语",
          "function": "时间范围状语",
          "modifies": "drink water",
          "explanation": "指用餐之外的时间，不否认人们就餐时饮水。"
        }
      ],
      "clauses": []
    },
    "literal": "几十年前，许多人不在用餐之外喝水。",
    "natural": "几十年前，许多人只有吃饭时才喝水。",
    "logic": "开启瓶装水例子，先描写商业推广之前的旧习惯。",
    "phrases": [
      "outside of a meal"
    ]
  },
  {
    "id": "2010-p3-s10",
    "number": 10,
    "text": "Then beverage companies started bottling the production of far-off springs, and now office workers unthinkingly sip bottled water all day long.",
    "chunks": [
      {
        "text": "Then",
        "role": "modifier"
      },
      {
        "text": " beverage companies",
        "role": "subject"
      },
      {
        "text": " started",
        "role": "predicate"
      },
      {
        "text": " bottling the production of far-off springs,",
        "role": "object"
      },
      {
        "text": " and",
        "role": "connector"
      },
      {
        "text": " now",
        "role": "modifier"
      },
      {
        "text": " office workers",
        "role": "subject"
      },
      {
        "text": " unthinkingly",
        "role": "modifier"
      },
      {
        "text": " sip",
        "role": "predicate"
      },
      {
        "text": " bottled water",
        "role": "object"
      },
      {
        "text": " all day long.",
        "role": "modifier"
      }
    ],
    "trunk": "beverage companies started bottling the production, and office workers sip bottled water.",
    "layers": [
      {
        "label": "先后两分句",
        "text": "Then...started与and now...sip按过去和现在呈现变化。"
      },
      {
        "label": "水源与饮水",
        "text": "bottling为动名词，production指泉水的产出；bottled是过去分词定语，sip是主句谓语。"
      }
    ],
    "grammar": [
      "start doing表示开始做；bottle在这里由名词转为动词。",
      "spring指泉而非春季；far-off修饰springs；long加强all day的持续性。"
    ],
    "beginnerSyntax": {
      "components": [
        {
          "text": "Then beverage companies started bottling the production of far-off springs",
          "form": "并列第一分句",
          "function": "前一事件",
          "modifies": "and连接的整句",
          "explanation": "饮料公司开始把远处泉水装瓶。"
        },
        {
          "text": "bottling the production of far-off springs",
          "form": "动名词及宾语",
          "function": "宾语",
          "modifies": "started",
          "explanation": "production作产出讲；of短语说明来源。"
        },
        {
          "text": "and",
          "form": "并列连词",
          "function": "连接分句",
          "modifies": "前后两个主谓结构",
          "explanation": "不是从句引导词。"
        },
        {
          "text": "now office workers unthinkingly sip bottled water all day long",
          "form": "并列第二分句",
          "function": "后一状态",
          "modifies": "and连接的整句",
          "explanation": "职员现已不假思索地全天喝瓶装水。"
        },
        {
          "text": "unthinkingly",
          "form": "副词",
          "function": "方式状语",
          "modifies": "sip",
          "explanation": "强调习惯化，不是责备智力不足。"
        },
        {
          "text": "bottled water",
          "form": "分词定语+名词",
          "function": "宾语",
          "modifies": "sip",
          "explanation": "bottled说明已装瓶，water不可数。"
        },
        {
          "text": "all day long",
          "form": "时间短语",
          "function": "持续时间状语",
          "modifies": "sip",
          "explanation": "表示一整天；不声称每秒都在喝。"
        }
      ],
      "clauses": []
    },
    "literal": "随后饮料公司开始把远方泉水的产出装瓶，而如今办公室职员整天不假思索地小口喝瓶装水。",
    "natural": "后来饮料公司开始灌装远方的泉水；如今，办公室职员已习惯一整天随手喝瓶装水。",
    "logic": "对照企业装瓶销售与当今消费行为，展示习惯的商业塑造。",
    "phrases": [
      "all day long",
      "bottled water"
    ]
  },
  {
    id: "2010-p3-s11", number: 11,
    text: "Chewing gum, once bought primarily by adolescent boys, is now featured in commercials as a breath freshener and teeth cleanser for use after a meal.",
    chunks: [{ text: "Chewing gum,", role: "subject" }, { text: " once bought primarily by adolescent boys,", role: "modifier" }, { text: " is now featured", role: "predicate" }, { text: " in commercials as a breath freshener and teeth cleanser for use after a meal.", role: "modifier" }],
    trunk: "Chewing gum is featured as a breath freshener and teeth cleanser.",
    layers: [{ label: "插入与主句", text: "once bought补充过去购买者；is featured是完整被动谓语。" }, { label: "新定位", text: "as引出清新口气和清洁牙齿两项用途，for use after a meal限定饭后使用。" }],
    grammar: ["bought为buy的不规则过去分词，分词短语与gum有被动关系，没有独立限定时态。", "commercials为名词‘广告片’，不能按形容词commercial解读；use在for之后为名词。"],
    beginnerSyntax: { components: [component("Chewing gum", "名词短语", "主语", "is featured", "整体指口香糖。"), component("once bought primarily by adolescent boys", "过去分词短语", "非限定性后置定语", "gum", "曾主要由青春期男孩购买；by引施事。"), component("is now featured", "被动谓语", "谓语", "Chewing gum", "now与once对照；被重点展示。"), component("in commercials", "介词短语", "呈现场合状语", "is featured", "在广告片中呈现。"), component("as a breath freshener and teeth cleanser", "as加并列名词", "身份用途补足语", "is featured", "广告强调清新口气和清洁牙齿。"), component("for use after a meal", "介词加名词及时间短语", "用途限定", "freshener and cleanser", "饭后使用，不是为了一顿饭而用。")], clauses: [] },
    literal: "口香糖曾主要由青春期男孩购买，如今在广告中被展示为饭后使用的口气清新剂和牙齿清洁剂。",
    natural: "口香糖过去主要卖给青春期男孩，如今广告把它包装成饭后清新口气、清洁牙齿的用品。",
    logic: "第二个消费实例说明广告如何重塑产品定位与使用场景。", phrases: ["as a breath freshener", "after a meal"],
  },
  {
    id: "2010-p3-s12", number: 12,
    text: "Skin moisturizers are advertised as part of morning beauty rituals, slipped in between hair brushing and putting on makeup.",
    chunks: [{ text: "Skin moisturizers", role: "subject" }, { text: " are advertised", role: "predicate" }, { text: " as part of morning beauty rituals,", role: "modifier" }, { text: " slipped in between hair brushing and putting on makeup.", role: "modifier" }],
    trunk: "Skin moisturizers are advertised as part of morning beauty rituals.",
    layers: [{ label: "广告定位", text: "be advertised as表示被宣传成；part of表晨间美容惯例的一部分。" }, { label: "嵌入流程", text: "slipped in是补充性过去分词短语，与moisturizers有被动关系；between两端为梳头和化妆两个活动。" }],
    grammar: ["between A and B两端语法平行；hair brushing和putting on makeup均为名词性活动。", "slip in意为悄然插入，不是滑倒；put on makeup表示化妆。"],
    beginnerSyntax: { components: [component("Skin moisturizers", "名词定语加复数名词", "主语", "are advertised", "skin限定润肤剂用途。"), component("are advertised as part of morning beauty rituals", "被动谓语加as短语", "谓语及定位补足语", "Skin moisturizers", "宣传为早晨美容流程的一环。"), component("slipped in between hair brushing and putting on makeup", "过去分词短语", "补充状态状语", "Skin moisturizers", "产品使用被插入已有动作链，不是新限定从句。"), component("between hair brushing and putting on makeup", "介词加并列活动", "位置顺序状语", "slipped in", "表示动作次序，不是实际空间。"), component("putting on makeup", "动名词短语", "介词的第二并列项", "between", "put on接makeup表示施用化妆品。")], clauses: [] },
    literal: "润肤品被宣传为早晨美容惯例的一部分，被悄然插入梳头与化妆之间。",
    natural: "广告把润肤纳入晨间美容流程，让它悄然成为梳头之后、化妆之前的一道程序。",
    logic: "第三个实例表明新消费行为依附既有生活程序形成习惯。", phrases: ["as part of", "between hair brushing and putting on makeup", "putting on makeup"],
  },
  {
    id: "2010-p3-s13", number: 13,
    text: "\"Our products succeed when they become part of daily or weekly patterns,\" said Carol Berning, a consumer psychologist who recently retired from Procter & Gamble, the company that sold $76 billion of Tide, Crest and other products last year.",
    chunks: [{ text: "\"Our products", role: "subject" }, { text: " succeed", role: "predicate" }, { text: " when they become part of daily or weekly patterns,\"", role: "condition" }, { text: " said", role: "predicate" }, { text: " Carol Berning,", role: "subject" }, { text: " a consumer psychologist who recently retired from Procter & Gamble,", role: "modifier" }, { text: " the company that sold $76 billion of Tide, Crest and other products last year.", role: "modifier" }],
    trunk: "Our products succeed said Carol Berning.",
    layers: [{ label: "产品成功条件", text: "when从句说融入日常或每周惯例时成功；这是受访者的商业观点。" }, { label: "两层身份说明", text: "psychologist同位解释Berning，who修饰心理学家；company同位解释宝洁，that修饰公司。" }],
    grammar: ["said Carol Berning是引语后的倒装引述框架。", "$76 billion是760亿美元；销售额归公司，不归个人。who与that的先行词不能混淆。"],
    beginnerSyntax: { components: [component("Our products succeed", "主谓结构", "直接引语主干", "引语", "our指企业一方；succeed为商业成功。"), component("when they become part of daily or weekly patterns", "when从句", "时间兼条件状语", "succeed", "they回指产品，融入惯例是成功条件。"), component("said Carol Berning", "倒装主谓", "引述框架", "直接引语", "说明这是谁的观点。"), component("a consumer psychologist who recently retired from Procter & Gamble", "名词加关系从句", "同位语", "Carol Berning", "解释职业及退休来源。"), component("the company that sold $76 billion of Tide, Crest and other products last year", "名词加关系从句", "同位语", "Procter & Gamble", "解释宝洁及销售额。"), component("last year", "时间名词短语", "时间状语", "sold", "相对文章叙述时间，不取读者当前年份。")], clauses: [clause("when they become part of daily or weekly patterns", "时间兼条件状语从句", "when", "限定succeed", "they（products）", "become", "part of daily or weekly patterns（表语）", "先译融入生活模式，再译成功。"), clause("who recently retired from Procter & Gamble", "定语从句", "who", "限定psychologist", "who（Berning）", "retired", "无宾语；from引退休来源", "先译刚从宝洁退休，再接心理学家。"), clause("that sold $76 billion of Tide, Crest and other products last year", "定语从句", "that", "限定company", "that（Procter & Gamble）", "sold", "$76 billion of Tide, Crest and other products", "先明确公司，再译上年的产品销售额。") ] },
    literal: "‘当我们的产品成为日常或每周模式的一部分时，它们就成功了。’最近从宝洁退休的消费心理学家卡罗尔·伯宁说。该公司去年卖出了760亿美元的汰渍、佳洁士和其他产品。",
    natural: "刚从宝洁退休的消费心理学家卡罗尔·伯宁说：‘我们的产品融入人们每天或每周的生活惯例，就算成功了。’宝洁上一年销售的汰渍、佳洁士等产品总额达760亿美元。",
    logic: "以直接证言支持商业机制，并区分品牌与公司层级。", phrases: ["retired from", "part of daily or weekly patterns"],
  },
  {
    id: "2010-p3-s14", number: 14,
    text: "\"Creating positive habits is a huge part of improving our consumers' lives, and it's essential to making new products commercially viable.\"",
    chunks: [{ text: "\"Creating positive habits", role: "subject" }, { text: " is", role: "predicate" }, { text: " a huge part of improving our consumers' lives,", role: "object" }, { text: " and", role: "connector" }, { text: " it's", role: "subject" }, { text: " essential to making new products commercially viable.\"", role: "object" }],
    trunk: "Creating positive habits is a huge part, and it's essential.",
    layers: [{ label: "两项价值主张", text: "Creating...动名词作主语，既是改善生活的重要部分，也是新产品商业可行的必要条件。" }, { label: "代词与补语", text: "it回指培养积极习惯这件事；making new products commercially viable为make+宾语+形容词宾补。" }],
    grammar: ["essential to中的to为介词，后接making而非make。", "commercially是副词修饰viable，不直接修饰名词products；两分句并列，无从属从句。"],
    beginnerSyntax: { components: [component("Creating positive habits", "动名词短语", "主语", "is", "创造习惯作为整件事，谓语用单数。"), component("a huge part of improving our consumers' lives", "名词加of动名词", "表语", "is", "改善生活是更大活动，培养习惯是其中一部分。"), component("and", "并列连词", "连接分句", "前后两个判断", "把改善生活与商业成功并列。"), component("it's essential", "代词加系表结构", "第二分句主干", "整句", "it不是产品，而是Creating positive habits。"), component("to making new products commercially viable", "介词to加动名词", "形容词补足语", "essential", "对使新产品商业可行来说不可缺少。"), component("making new products commercially viable", "make加宾语及形容词", "介词宾语", "to", "new products是宾语；viable是其状态宾补。")], clauses: [] },
    literal: "培养积极习惯是改善消费者生活的重要部分，而且对于使新产品在商业上可行是必不可少的。",
    natural: "培养良好习惯既是改善消费者生活的重要一环，也是让新产品具备商业生存能力的关键。",
    logic: "保留企业受访者的正面主张；不可把引语态度直接当作作者态度。", phrases: ["essential to making new products commercially viable"],
  },
  {
    id: "2010-p3-s15", number: 15,
    text: "Through experiments and observation, social scientists like Dr. Berning have learned that there is power in tying certain behaviors to habitual cues through ruthless advertising.",
    chunks: [{ text: "Through experiments and observation,", role: "modifier" }, { text: " social scientists", role: "subject" }, { text: " like Dr. Berning", role: "modifier" }, { text: " have learned", role: "predicate" }, { text: " that there is power in tying certain behaviors to habitual cues through ruthless advertising.", role: "object" }],
    trunk: "social scientists have learned that there is power.",
    layers: [{ label: "研究发现", text: "Through...说明发现依据，like...举伯宁为社会科学家的例子。" }, { label: "有效机制", text: "宾语从句为there is power存在句；in tying A to B说明把行为与习惯性提示绑定的作用，through advertising是绑定手段。" }],
    grammar: ["tie A to B把两者联系起来；tying是tie去ie加ying，不是tieing。", "ruthless带不顾后果、强硬无情的贬义色彩，为末句批评铺垫；不能仅译成广告很多。"],
    beginnerSyntax: { components: [component("Through experiments and observation", "介词加并列名词", "方式依据状语", "have learned", "结论来自实验与观察。"), component("social scientists like Dr. Berning", "名词加举例短语", "主语", "have learned", "like意为例如，不是喜欢。"), component("have learned", "现在完成时", "谓语", "social scientists", "强调已经得知，不是正在上课。"), component("that there is power in tying certain behaviors to habitual cues through ruthless advertising", "that内容从句", "宾语", "have learned", "描述绑定行为和提示的效力。"), component("in tying certain behaviors to habitual cues", "介词加动名词及to短语", "作用所在补足语", "power", "A是行为，B是日常提示。"), component("through ruthless advertising", "介词短语", "手段状语", "tying", "借助不顾后果的广告攻势。")], clauses: [clause("that there is power in tying certain behaviors to habitual cues through ruthless advertising", "宾语从句", "that", "作have learned的宾语", "power（存在句的实义主语）", "is", "无宾语；in...说明效力所在", "先译把行为与提示联系起来很有效，再接通过广告的方式。") ] },
    literal: "通过实验与观察，伯宁博士这样的社会科学家已经了解到，通过不顾后果的广告把某些行为与习惯性提示联系起来，是有力量的。",
    natural: "伯宁博士等社会科学家通过实验和观察发现，利用强势而不顾后果的广告，将特定行为与日常提示绑定，确实能产生很大影响。",
    logic: "总结习惯塑造机制，同时以ruthless显露作者的批评倾向。", phrases: ["tying certain behaviors to habitual cues"],
  },
  {
    id: "2010-p3-s16", number: 16,
    text: "As this new science of habit has emerged, controversies have erupted when the tactics have been used to sell questionable beauty creams or unhealthy foods.",
    chunks: [{ text: "As this new science of habit has emerged,", role: "condition" }, { text: " controversies", role: "subject" }, { text: " have erupted", role: "predicate" }, { text: " when the tactics have been used to sell questionable beauty creams or unhealthy foods.", role: "condition" }],
    trunk: "controversies have erupted.",
    layers: [{ label: "时间背景", text: "As...表示随着习惯科学出现；不是方式的按照。" }, { label: "争议触发", text: "when...说明这些手段用于销售有问题的产品时引发争议；to sell是使用手段的目的。" }],
    grammar: ["have been used为现在完成时被动，与used to do过去常常不同。", "questionable修饰beauty creams，unhealthy修饰foods；or连接两类问题商品。"],
    beginnerSyntax: { components: [component("As this new science of habit has emerged", "As从句", "时间背景状语", "have erupted", "随着新学科出现。"), component("controversies", "复数名词", "主语", "have erupted", "发生的是争议，不是产品爆炸。"), component("have erupted", "现在完成时", "谓语", "controversies", "erupt借喻争议突然爆发。"), component("when the tactics have been used to sell questionable beauty creams or unhealthy foods", "when从句", "时间兼条件状语", "have erupted", "指出引发争议的特定用途。"), component("to sell questionable beauty creams or unhealthy foods", "不定式加并列宾语", "目的状语", "have been used", "销售质量或效果可疑的美容霜，或不健康的食品。")], clauses: [clause("As this new science of habit has emerged", "时间状语从句", "As", "提供背景", "this new science of habit", "has emerged", "无宾语", "先译随着新科学兴起，再译争议。"), clause("when the tactics have been used to sell questionable beauty creams or unhealthy foods", "时间兼条件状语从句", "when", "说明争议出现的情形", "the tactics", "have been used", "无直接宾语；to sell...为目的", "先说明手段用于卖问题商品，再理解引发争议。") ] },
    literal: "随着这门关于习惯的新科学出现，当这些策略被用来销售有疑问的美容霜或不健康食品时，争议已经爆发。",
    natural: "随着习惯科学兴起，这些策略被用于推销效果可疑的美容霜或不健康食品，也由此引发了争议。",
    logic: "末句集中指出商业运用的负面后果，和ruthless共同支持35题的否定态度。", phrases: ["have been used to sell"],
  },
];

const question = (number: number, sentence: number, prompt: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D", locating: string, reasons: [string, string, string, string]): Question => ({
  id: 201000 + number, number, sentenceId: `2010-p3-s${sentence}`, prompt,
  options: (["A", "B", "C", "D"] as const).map((key, index) => ({ key, text: options[index] })),
  answer, locating, explanations: { A: reasons[0], B: reasons[1], C: reasons[2], D: reasons[3] },
});

export const passage2010P3Questions: Question[] = [
  question(31, 3, "According to Dr. Curtis, habits like hand washing with soap ________________.", ["should be further cultivated", "should be changed gradually", "are deeply rooted in history", "are basically private concerns"], "A", "第2段第3—4句：脏手和缺乏肥皂洗手习惯仍造成公共卫生问题，研究者想借企业经验培养自动发生的新行为。", ["正确：现有好习惯需要进一步培养普及，呼应how to create new behaviors。", "应改变的是不卫生的习惯，不是把肥皂洗手这种好习惯改掉；gradually也无依据。", "文章说尚未解决培养习惯的问题，没有说肥皂洗手深植历史。", "public health明确属于公共卫生；private industry是学习对象，不是健康问题的性质。"]),
  question(32, 10, "Bottled water, chewing gum and skin moisturizers are mentioned in Paragraph 5 so as to ________________.", ["reveal their impact on people's habits", "show the urgent need of daily necessities", "indicate their effect on people's buying power", "manifest the significant role of good habits"], "A", "第5段第9—12句以过去和如今对照，依次描述瓶装水、口香糖、润肤品如何进入日常惯例；联系第6句manufactured habits。", ["正确：三个例子共同揭示产品及其商业宣传对习惯的塑造作用。", "原文论证人为塑造需求，没有说这些日用品存在迫切短缺。", "企业收益不是消费者购买力；段中没有收入或支付能力比较。", "本段讲习惯如何被塑造，不是赞扬所有习惯都好或论证好习惯的重要性。"]),
  question(33, 5, "Which of the following does NOT belong to products that help create people's habits?", ["Tide.", "Crest.", "Colgate.", "Unilever."], "D", "第3段第5句将Unilever与宝洁、高露洁-棕榄并列为公司；第8及13句中的Tide、Crest、Colgate则是产品品牌。题干NOT要求选不属于产品的一项。", ["汰渍是第13句列出的产品品牌，不是答案。", "佳洁士是第8、13句列出的牙膏产品品牌，不是答案。", "高露洁是第8句的牙膏品牌；不要混同第5句的公司全称Colgate-Palmolive。", "正确：联合利华在第5句明确属于companies，而不是文中列举的具体产品品牌。"]),
  question(34, 8, "From the text we know that some of consumers' habits are developed due to ________________.", ["perfected art of products", "automatic behavior creation", "commercial promotions", "scientific experiments"], "C", "第8句直接列shrewd advertising，第11—12句是广告实例，第15句又明确through ruthless advertising；共同指向商业推广。", ["第1句完善的是培养习惯的手法，不是产品本身的艺术；偷换修饰对象。", "自动行为就是习惯的表述，用结果重述原因，遗漏推动它形成的商业宣传。", "正确：商业推广概括广告和产品宣传，是各实例共同的外部促成因素。", "实验和观察帮助研究者认识机制，不是文中消费者日常习惯形成的直接原因。"]),
  question(35, 16, "The author's attitude toward the influence of advertisement on people's habits is ________________.", ["indifferent", "negative", "positive", "biased"], "B", "第15句ruthless及末句questionable、unhealthy、controversies显示批评倾向。第14句正面说法属于企业受访者，不能移作作者立场。", ["indifferent表示漠不关心；作者明确指出负面用途和争议，并非不表态。", "正确：结尾对不顾后果的广告、问题商品和争议的强调，体现否定或批评倾向；不等于否认所有卫生习惯都有益。", "positive是受访者对商业策略的自我评价，不代表叙述者最终立场。", "biased表示偏见或不公正，需要缺乏依据的偏袒；提出具体负面例证并不等于偏见。"]),
];
