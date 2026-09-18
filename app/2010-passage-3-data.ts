import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2010P3Syntax } from "./2010-passage-3-syntax";
import { passage2010P3Reading } from "./2010-passage-3-reading";
import { passage2010P3Practice } from "./2010-passage-3-practice";
import { passage2010P3Reasoning } from "./2010-passage-3-evidence";
import { passage2010P3QuestionAnalysis } from "./2010-passage-3-question-analysis";
import type { Question, SentenceAnalysis } from "./data";

const passage2010P3Drafts: Array<Omit<SentenceAnalysis, "chunks" | "beginnerSyntax">> = [
  {
    "id": "2010-p3-s1",
    "number": 1,
    "text": "Over the past decade, many companies had perfected the art of creating automatic behaviors – habits – among consumers.",
    "trunk": "many companies had perfected the art.",
    "layers": [
      {
        "label": "经营手法",
        "text": "companies had perfected the art：企业已把一套手法完善成熟；art 在这里不是美术。"
      },
      {
        "label": "手法内容",
        "text": "of creating automatic behaviors 说明什么手法；habits 插入解释 automatic behaviors，among consumers 限定习惯形成的人群。"
      }
    ],
    "grammar": [
      "had perfected 为原卷的过去完成时，不能因 Over the past decade 而擅改为 have perfected。",
      "of 后的 creating 是动名词；behaviors 是它的宾语，破折号中的 habits 是同位解释而非另一个谓语。"
    ],
    "literal": "在过去十年里，许多公司已完善了在消费者中创造自动行为——习惯——的手法。",
    "natural": "过去十年间，许多公司已熟练掌握让消费者养成不假思索的行为习惯的手法。",
    "logic": "提出全文主题：企业有意培养消费习惯，而非仅被动迎合既有需求。",
    "phrases": [
      "Over the past decade",
      "the art of creating automatic behaviors"
    ]
  },
  {
    "id": "2010-p3-s2",
    "number": 2,
    "text": "These habits have helped companies earn billions of dollars when customers eat snacks or wipe counters almost without thinking, often in response to a carefully designed set of daily cues.",
    "trunk": "These habits have helped companies earn billions of dollars.",
    "layers": [
      {
        "label": "习惯带来收益",
        "text": "help companies earn：使企业赚到钱，companies 同时是 earn 的逻辑主语。"
      },
      {
        "label": "消费行为",
        "text": "when 后 customers 共用主语，eat snacks 与 wipe counters 并列。"
      },
      {
        "label": "行为触发",
        "text": "without thinking 表几乎未经思考；in response to...cues 表行为常由精心设计的日常提示触发。"
      }
    ],
    "grammar": [
      "help somebody (to) do 中 to 可省略；earn 是宾语补足语，不是 helped 的并列谓语。",
      "carefully designed 为副词修饰过去分词，整体限定 set；of daily cues 说明这套提示的内容。"
    ],
    "literal": "当顾客几乎不假思索地吃零食或擦台面，常常是对一套精心设计的日常提示作出反应时，这些习惯已帮助公司赚取数十亿美元。",
    "natural": "消费者常受精心设计的日常提示驱动，不假思索地吃零食、擦台面；这些习惯已为企业带来数十亿美元收入。",
    "logic": "用行为与收益说明培养习惯的商业价值，引出公共卫生领域借鉴的动机。",
    "phrases": [
      "in response to",
      "billions of dollars",
      "without thinking"
    ]
  },
  {
    "id": "2010-p3-s3",
    "number": 3,
    "text": "\"There are fundamental public health problems, like dirty hands instead of a soap habit, that remain killers only because we can't figure out how to change people's habits,\" said Dr. Curtis, the director of the Hygiene Center at the London School of Hygiene & Tropical Medicine.",
    "trunk": "\"There are problems,\" said Dr. Curtis.",
    "layers": [
      {
        "label": "引述框架",
        "text": "There are 是存在句；said Dr. Curtis 为引语后倒装；姓名后 director 短语解释身份。"
      },
      {
        "label": "问题与原因",
        "text": "like 插入举例；that 越过举例回指 problems；because 说明这些问题仍会致命的原因。"
      }
    ],
    "grammar": [
      "there 为存在句引导成分；remain 为系动词，killers 为表语。",
      "how to change 是疑问不定式宾语，没有限定时态；不能凭空补成原文从句。",
      "Dr. 是称谓缩写；院校名中的 & 和原卷大小写保留。"
    ],
    "literal": "‘有些根本性的公共卫生问题，比如手脏而没有肥皂洗手习惯，仍是致命因素，只因为我们弄不清怎样改变人们的习惯。’伦敦卫生与热带医学院卫生中心主任柯蒂斯博士说。",
    "natural": "伦敦卫生与热带医学院卫生中心主任柯蒂斯博士说：‘脏手、不用肥皂洗手等根本性的公共卫生问题仍在夺人性命，仅仅是因为我们还不知道怎样改变人们的习惯。’",
    "logic": "转向公共卫生：需要培养肥皂洗手习惯，为31题提供依据。",
    "phrases": [
      "instead of",
      "figure out"
    ]
  },
  {
    "id": "2010-p3-s4",
    "number": 4,
    "text": "\"We wanted to learn from private industry how to create new behaviors that happen automatically.\"",
    "trunk": "We wanted to learn how to create new behaviors.",
    "layers": [
      {
        "label": "学习目的",
        "text": "wanted to learn 表想学习；from private industry 指向企业界学习，不是把健康看成私人问题。"
      },
      {
        "label": "学习内容",
        "text": "how to create 是 learn 的宾语；that happen automatically 限定 behaviors。"
      }
    ],
    "grammar": [
      "want to do 与 learn how to do 两层不定式嵌套，没有独立限定时态。",
      "that 在定语从句中作主语；automatically 为方式副词修饰 happen。"
    ],
    "literal": "我们想从私营企业界学习如何创造会自动发生的新行为。",
    "natural": "我们想向企业界学习，怎样让人们自然而然地养成新的行为习惯。",
    "logic": "承接卫生困境，明确研究者借鉴商业手法的目的。",
    "phrases": [
      "learn from private industry"
    ]
  },
  {
    "id": "2010-p3-s5",
    "number": 5,
    "text": "The companies that Dr. Curtis turned to – Procter & Gamble, Colgate-Palmolive and Unilever – had invested hundreds of millions of dollars finding the subtle cues in consumers' lives that corporations could use to introduce new routines.",
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
    "literal": "随后饮料公司开始把远方泉水的产出装瓶，而如今办公室职员整天不假思索地小口喝瓶装水。",
    "natural": "后来饮料公司开始灌装远方的泉水；如今，办公室职员已习惯一整天随手喝瓶装水。",
    "logic": "对照企业装瓶销售与当今消费行为，展示习惯的商业塑造。",
    "phrases": [
      "all day long",
      "bottled water"
    ]
  },
  {
    "id": "2010-p3-s11",
    "number": 11,
    "text": "Chewing gum, once bought primarily by adolescent boys, is now featured in commercials as a breath freshener and teeth cleanser for use after a meal.",
    "trunk": "Chewing gum is featured as a breath freshener and teeth cleanser.",
    "layers": [
      {
        "label": "插入与主句",
        "text": "once bought补充过去购买者；is featured是完整被动谓语。"
      },
      {
        "label": "新定位",
        "text": "as引出清新口气和清洁牙齿两项用途，for use after a meal限定饭后使用。"
      }
    ],
    "grammar": [
      "bought为buy的不规则过去分词，分词短语与gum有被动关系，没有独立限定时态。",
      "commercials为名词‘广告片’，不能按形容词commercial解读；use在for之后为名词。"
    ],
    "literal": "口香糖曾主要由青春期男孩购买，如今在广告中被展示为饭后使用的口气清新剂和牙齿清洁剂。",
    "natural": "口香糖过去主要卖给青春期男孩，如今广告把它包装成饭后清新口气、清洁牙齿的用品。",
    "logic": "第二个消费实例说明广告如何重塑产品定位与使用场景。",
    "phrases": [
      "as a breath freshener",
      "after a meal"
    ]
  },
  {
    "id": "2010-p3-s12",
    "number": 12,
    "text": "Skin moisturizers are advertised as part of morning beauty rituals, slipped in between hair brushing and putting on makeup.",
    "trunk": "Skin moisturizers are advertised as part of morning beauty rituals.",
    "layers": [
      {
        "label": "广告定位",
        "text": "be advertised as表示被宣传成；part of表晨间美容惯例的一部分。"
      },
      {
        "label": "嵌入流程",
        "text": "slipped in是补充性过去分词短语，与moisturizers有被动关系；between两端为梳头和化妆两个活动。"
      }
    ],
    "grammar": [
      "between A and B两端语法平行；hair brushing和putting on makeup均为名词性活动。",
      "slip in意为悄然插入，不是滑倒；put on makeup表示化妆。"
    ],
    "literal": "润肤品被宣传为早晨美容惯例的一部分，被悄然插入梳头与化妆之间。",
    "natural": "广告把润肤纳入晨间美容流程，让它悄然成为梳头之后、化妆之前的一道程序。",
    "logic": "第三个实例表明新消费行为依附既有生活程序形成习惯。",
    "phrases": [
      "as part of",
      "between hair brushing and putting on makeup",
      "putting on makeup"
    ]
  },
  {
    "id": "2010-p3-s13",
    "number": 13,
    "text": "\"Our products succeed when they become part of daily or weekly patterns,\" said Carol Berning, a consumer psychologist who recently retired from Procter & Gamble, the company that sold $76 billion of Tide, Crest and other products last year.",
    "trunk": "Our products succeed said Carol Berning.",
    "layers": [
      {
        "label": "产品成功条件",
        "text": "when从句说融入日常或每周惯例时成功；这是受访者的商业观点。"
      },
      {
        "label": "两层身份说明",
        "text": "psychologist同位解释Berning，who修饰心理学家；company同位解释宝洁，that修饰公司。"
      }
    ],
    "grammar": [
      "said Carol Berning是引语后的倒装引述框架。",
      "$76 billion是760亿美元；销售额归公司，不归个人。who与that的先行词不能混淆。"
    ],
    "literal": "‘当我们的产品成为日常或每周模式的一部分时，它们就成功了。’最近从宝洁退休的消费心理学家卡罗尔·伯宁说。该公司去年卖出了760亿美元的汰渍、佳洁士和其他产品。",
    "natural": "刚从宝洁退休的消费心理学家卡罗尔·伯宁说：‘我们的产品融入人们每天或每周的生活惯例，就算成功了。’宝洁上一年销售的汰渍、佳洁士等产品总额达760亿美元。",
    "logic": "以直接证言支持商业机制，并区分品牌与公司层级。",
    "phrases": [
      "retired from",
      "part of daily or weekly patterns"
    ]
  },
  {
    "id": "2010-p3-s14",
    "number": 14,
    "text": "\"Creating positive habits is a huge part of improving our consumers' lives, and it's essential to making new products commercially viable.\"",
    "trunk": "Creating positive habits is a huge part, and it's essential.",
    "layers": [
      {
        "label": "两项价值主张",
        "text": "Creating...动名词作主语，既是改善生活的重要部分，也是新产品商业可行的必要条件。"
      },
      {
        "label": "代词与补语",
        "text": "it回指培养积极习惯这件事；making new products commercially viable为make+宾语+形容词宾补。"
      }
    ],
    "grammar": [
      "essential to中的to为介词，后接making而非make。",
      "commercially是副词修饰viable，不直接修饰名词products；两分句并列，无从属从句。"
    ],
    "literal": "培养积极习惯是改善消费者生活的重要部分，而且对于使新产品在商业上可行是必不可少的。",
    "natural": "培养良好习惯既是改善消费者生活的重要一环，也是让新产品具备商业生存能力的关键。",
    "logic": "保留企业受访者的正面主张；不可把引语态度直接当作作者态度。",
    "phrases": [
      "essential to making new products commercially viable"
    ]
  },
  {
    "id": "2010-p3-s15",
    "number": 15,
    "text": "Through experiments and observation, social scientists like Dr. Berning have learned that there is power in tying certain behaviors to habitual cues through ruthless advertising.",
    "trunk": "social scientists have learned that there is power.",
    "layers": [
      {
        "label": "研究发现",
        "text": "Through...说明发现依据，like...举伯宁为社会科学家的例子。"
      },
      {
        "label": "有效机制",
        "text": "宾语从句为there is power存在句；in tying A to B说明把行为与习惯性提示绑定的作用，through advertising是绑定手段。"
      }
    ],
    "grammar": [
      "tie A to B把两者联系起来；tying是tie去ie加ying，不是tieing。",
      "ruthless带不顾后果、强硬无情的贬义色彩，为末句批评铺垫；不能仅译成广告很多。"
    ],
    "literal": "通过实验与观察，伯宁博士这样的社会科学家已经了解到，通过不顾后果的广告把某些行为与习惯性提示联系起来，是有力量的。",
    "natural": "伯宁博士等社会科学家通过实验和观察发现，利用强势而不顾后果的广告，将特定行为与日常提示绑定，确实能产生很大影响。",
    "logic": "总结习惯塑造机制，同时以ruthless显露作者的批评倾向。",
    "phrases": [
      "tying certain behaviors to habitual cues"
    ]
  },
  {
    "id": "2010-p3-s16",
    "number": 16,
    "text": "As this new science of habit has emerged, controversies have erupted when the tactics have been used to sell questionable beauty creams or unhealthy foods.",
    "trunk": "controversies have erupted.",
    "layers": [
      {
        "label": "时间背景",
        "text": "As...表示随着习惯科学出现；不是方式的按照。"
      },
      {
        "label": "争议触发",
        "text": "when...说明这些手段用于销售有问题的产品时引发争议；to sell是使用手段的目的。"
      }
    ],
    "grammar": [
      "have been used为现在完成时被动，与used to do过去常常不同。",
      "questionable修饰beauty creams，unhealthy修饰foods；or连接两类问题商品。"
    ],
    "literal": "随着这门关于习惯的新科学出现，当这些策略被用来销售有疑问的美容霜或不健康食品时，争议已经爆发。",
    "natural": "随着习惯科学兴起，这些策略被用于推销效果可疑的美容霜或不健康食品，也由此引发了争议。",
    "logic": "末句集中指出商业运用的负面后果，和ruthless共同支持35题的否定态度。",
    "phrases": [
      "have been used to sell"
    ]
  }
];

export const passage2010P3Sentences: SentenceAnalysis[] = passage2010P3Drafts.map(sentence => {
  const reviewed = passage2010P3Syntax[sentence.number];
  const result = withReviewedSyntax({ ...sentence,
    trunk: sentence.number === 13 ? '"Our products succeed," said Carol Berning.' : sentence.trunk,
    beginnerSyntax: { components: reviewed.components, clauses: reviewed.clauses, reading: passage2010P3Reading[sentence.id] },
    practice: passage2010P3Practice[sentence.number].map(task => task.kind === "range" ? { ...task, rangeText: sentence.text } : task),
  }, reviewed.colors);
  result.translationAlignment = result.chunks.map((chunk, i) => ({ english: chunk.text, chinese: reviewed.translations[i] }));
  return result;
});

const question = (number: number, sentence: number, prompt: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D", locating: string, reasons: [string, string, string, string]): Question => ({
  id: 201000 + number, number, sentenceId: `2010-p3-s${sentence}`, prompt,
  options: (["A", "B", "C", "D"] as const).map((key, index) => ({ key, text: options[index] })),
  answer, locating, explanations: { A: reasons[0], B: reasons[1], C: reasons[2], D: reasons[3] },
  reasoning: passage2010P3Reasoning[number], analysis: passage2010P3QuestionAnalysis[number],
});

export const passage2010P3Questions: Question[] = [
  question(31, 3, "According to Dr. Curtis, habits like hand washing with soap ________________.", ["should be further cultivated", "should be changed gradually", "are deeply rooted in history", "are basically private concerns"], "A", "第2段第3—4句：脏手和缺乏肥皂洗手习惯仍造成公共卫生问题，研究者想借企业经验培养自动发生的新行为。", ["正确：现有好习惯需要进一步培养普及，呼应how to create new behaviors。", "应改变的是不卫生的习惯，不是把肥皂洗手这种好习惯改掉；gradually也无依据。", "文章说尚未解决培养习惯的问题，没有说肥皂洗手深植历史。", "public health明确属于公共卫生；private industry是学习对象，不是健康问题的性质。"]),
  question(32, 10, "Bottled water, chewing gum and skin moisturizers are mentioned in Paragraph 5 so as to ________________.", ["reveal their impact on people's habits", "show the urgent need of daily necessities", "indicate their effect on people's buying power", "manifest the significant role of good habits"], "A", "第5段第9—12句以过去和如今对照，依次描述瓶装水、口香糖、润肤品如何进入日常惯例；联系第6句manufactured habits。", ["正确：三个例子共同揭示产品及其商业宣传对习惯的塑造作用。", "原文论证人为塑造需求，没有说这些日用品存在迫切短缺。", "企业收益不是消费者购买力；段中没有收入或支付能力比较。", "本段讲习惯如何被塑造，不是赞扬所有习惯都好或论证好习惯的重要性。"]),
  question(33, 5, "Which of the following does NOT belong to products that help create people's habits?", ["Tide.", "Crest.", "Colgate.", "Unilever."], "D", "第3段第5句将Unilever与宝洁、高露洁-棕榄并列为公司；第8及13句中的Tide、Crest、Colgate则是产品品牌。题干NOT要求选不属于产品的一项。", ["汰渍是第13句列出的产品品牌，不是答案。", "佳洁士是第8、13句列出的牙膏产品品牌，不是答案。", "高露洁是第8句的牙膏品牌；不要混同第5句的公司全称Colgate-Palmolive。", "正确：联合利华在第5句明确属于companies，而不是文中列举的具体产品品牌。"]),
  question(34, 8, "From the text we know that some of consumers' habits are developed due to ________________.", ["perfected art of products", "automatic behavior creation", "commercial promotions", "scientific experiments"], "C", "第8句直接列shrewd advertising，第11—12句是广告实例，第15句又明确through ruthless advertising；共同指向商业推广。", ["第1句完善的是培养习惯的手法，不是产品本身的艺术；偷换修饰对象。", "自动行为就是习惯的表述，用结果重述原因，遗漏推动它形成的商业宣传。", "正确：商业推广概括广告和产品宣传，是各实例共同的外部促成因素。", "实验和观察帮助研究者认识机制，不是文中消费者日常习惯形成的直接原因。"]),
  question(35, 16, "The author's attitude toward the influence of advertisement on people's habits is ________________.", ["indifferent", "negative", "positive", "biased"], "B", "第15句ruthless及末句questionable、unhealthy、controversies显示批评倾向。第14句正面说法属于企业受访者，不能移作作者立场。", ["indifferent表示漠不关心；作者明确指出负面用途和争议，并非不表态。", "正确：结尾对不顾后果的广告、问题商品和争议的强调，体现否定或批评倾向；不等于否认所有卫生习惯都有益。", "positive是受访者对商业策略的自我评价，不代表叙述者最终立场。", "biased表示偏见或不公正，需要缺乏依据的偏袒；提出具体负面例证并不等于偏见。"]),
];
