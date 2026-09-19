import type { Question, SentenceAnalysis } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2010P4Syntax } from "./2010-passage-4-syntax";
import { passage2010P4Practice } from "./2010-passage-4-practice";
import { passage2010P4Reasoning } from "./2010-passage-4-evidence";
import { passage2010P4QuestionAnalysis } from "./2010-passage-4-question-analysis";
const drafts: Array<Omit<SentenceAnalysis,"chunks"|"beginnerSyntax">> = [
  {
    "id": "2010-p4-s1",
    "number": 1,
    "text": "Many Americans regard the jury system as a concrete expression of crucial democratic values, including the principles that all citizens who meet minimal qualifications of age and literacy are equally competent to serve on juries; that jurors should be selected randomly from a representative cross section of the community; that no citizen should be denied the right to serve on a jury on account of race, religion, sex, or national origin; that defendants are entitled to trial by their peers; and that verdicts should represent the conscience of the community and not just the letter of the law.",
    "trunk": "Many Americans regard the jury system as a concrete expression of crucial democratic values.",
    "layers": [
      {
        "label": "总干",
        "text": "regard A as B：把陪审制度视为民主价值的具体体现。"
      },
      {
        "label": "五项内容",
        "text": "五个that内容从句依次说明资格、抽选、公平参与、同侪审判及裁决依据，彼此并列而非层层嵌套。"
      },
      {
        "label": "内层限定",
        "text": "只有第一项中的who从句限定citizens；其余各项有自己的主语与谓语。"
      }
    ],
    "grammar": [
      "principles后的五个that均不在从句内充当成分，是同位内容从句；who在定语从句中作主语。",
      "deny somebody something变被动后citizen升为主语，the right仍是保留宾语。",
      "be entitled to trial中的to为介词；right to serve中的to为不定式。"
    ],
    "literal": "许多美国人把陪审团制度看作重要民主价值的具体体现，包括这些原则：符合年龄与读写最低资格的所有公民同等有能力担任陪审员；陪审员应从有代表性的社区横截面中随机选出；不得因种族、宗教、性别或民族出身剥夺任何公民的陪审权；被告有权由同侪审判；裁决应体现社区良知，而不只是法律条文字面。",
    "natural": "许多美国人认为，陪审团制度具体体现了重要的民主价值：凡符合基本年龄与读写条件的公民，都同样有资格参与陪审；人选应随机产生并代表社会各群体；种族、宗教、性别或民族出身不应成为剥夺陪审权的理由；被告有权接受同侪审判；裁决须体现社会良知，不能只拘泥于法条。",
    "logic": "先建立制度的民主理想，作为后文历史实践偏离与改革发展的衡量基准。",
    "phrases": [
      "regard the jury system as a concrete expression",
      "serve on juries",
      "on account of",
      "entitled to trial",
      "the letter of the law"
    ]
  },
  {
    "id": "2010-p4-s2",
    "number": 2,
    "text": "The jury is also said to be the best surviving example of direct rather than representative democracy.",
    "trunk": "The jury is said to be the best surviving example.",
    "layers": [
      {
        "label": "被动报道结构",
        "text": "be said to be表示据说是，不是陪审团自己说话。"
      },
      {
        "label": "概念对照",
        "text": "rather than排除representative democracy，把制度归为direct democracy。"
      }
    ],
    "grammar": [
      "surviving是现在分词定语，指仍存续的。",
      "rather than连接两个平行修饰概念，不引导限定从句。"
    ],
    "literal": "陪审团还被称为直接民主而非代议民主的现存最佳实例。",
    "natural": "陪审团也被视为直接民主而非代议民主至今保留的最佳范例。",
    "logic": "补充制度性质，为下一句解释直接民主作铺垫。",
    "phrases": [
      "is also said to be",
      "rather than"
    ]
  },
  {
    "id": "2010-p4-s3",
    "number": 3,
    "text": "In a direct democracy, citizens take turns governing themselves, rather than electing representatives to govern for them.",
    "trunk": "citizens take turns governing themselves.",
    "layers": [
      {
        "label": "轮流自治",
        "text": "take turns governing强调直接参与。"
      },
      {
        "label": "排除代议",
        "text": "rather than后对照选举代表，for them说明代表替谁治理。"
      }
    ],
    "grammar": [
      "themselves是反身宾语，them是介词for后的宾格，都回指citizens。",
      "两个-ing活动平行；to govern不是新的限定从句。"
    ],
    "literal": "在直接民主中，公民轮流治理自己，而不是选出代表来替他们治理。",
    "natural": "直接民主意味着公民轮流参与自治，而非选举代表代为治理。",
    "logic": "解释直接民主，完成首段制度传统与价值基线的介绍。",
    "phrases": [
      "take turns governing themselves"
    ]
  },
  {
    "id": "2010-p4-s4",
    "number": 4,
    "text": "But as recently as in 1968, jury selection procedures conflicted with these democratic ideals.",
    "trunk": "jury selection procedures conflicted with these democratic ideals.",
    "layers": [
      {
        "label": "转折",
        "text": "But推翻理想已经充分实现的印象。"
      },
      {
        "label": "冲突双方",
        "text": "procedures与ideals是两方；不是不同民主理想互相冲突。"
      }
    ],
    "grammar": [
      "as recently as是强调时间的短语，没有从句主谓。",
      "conflict with后接冲突对象。"
    ],
    "literal": "但甚至在1968年，陪审员遴选程序还与这些民主理想相冲突。",
    "natural": "然而，直到1968年，陪审员的遴选程序仍有悖于这些民主理想。",
    "logic": "引入历史实践的落差，是37题排除‘理想彼此冲突’的依据。",
    "phrases": [
      "conflicted with"
    ]
  },
  {
    "id": "2010-p4-s5",
    "number": 5,
    "text": "In some states, for example, jury duty was limited to persons of supposedly superior intelligence, education, and moral character.",
    "trunk": "jury duty was limited to persons.",
    "layers": [
      {
        "label": "范围限制",
        "text": "be limited to只允许一类人参与。"
      },
      {
        "label": "所谓优越",
        "text": "of...限定persons，列智力、教育、品德；supposedly说明是被假定而非作者证实。"
      }
    ],
    "grammar": [
      "of+抽象性质名词可以后置描述人的特征。",
      "superior修饰并列属性；不能漏掉supposedly的保留语气。"
    ],
    "literal": "例如在一些州，陪审职责仅限于据称在智力、教育和道德品格方面更优越的人。",
    "natural": "比如，有些州只让那些被认为智力更高、教育更好、品德更优的人担任陪审员。",
    "logic": "举精英筛选实例，说明代表性受到扭曲。",
    "phrases": [
      "was limited to"
    ]
  },
  {
    "id": "2010-p4-s6",
    "number": 6,
    "text": "Although the Supreme Court of the United States had prohibited intentional racial discrimination in jury selection as early as the 1880 case of Strauder v. West Virginia, the practice of selecting so-called elite or blue-ribbon juries provided a convenient way around this and other antidiscrimination laws.",
    "trunk": "the practice provided a convenient way around this and other antidiscrimination laws.",
    "layers": [
      {
        "label": "已有禁令",
        "text": "Although完整从句截至Virginia，先交代1880年已禁止故意种族歧视。"
      },
      {
        "label": "仍能规避",
        "text": "实践却以所谓精英标准绕开禁令，说明法律未充分消除歧视。"
      }
    ],
    "grammar": [
      "had prohibited为相对过去的先行事件；provided为叙述主句过去时。",
      "selecting是of后的动名词，so-called和blue-ribbon修饰juries；around是介词，不是关系从句。"
    ],
    "literal": "尽管美国最高法院早在1880年的斯特劳德诉西弗吉尼亚州案中就已禁止陪审员遴选中的故意种族歧视，挑选所谓精英或蓝带陪审团的做法，却提供了绕过这项及其他反歧视法律的便捷途径。",
    "natural": "美国最高法院早在1880年斯特劳德诉西弗吉尼亚州案中，就禁止遴选陪审员时故意实施种族歧视；但以‘精英’或‘蓝带’为名挑选陪审员，仍成了规避这类反歧视法律的方便办法。",
    "logic": "指出法律与执行效果的落差，直接支撑37题法律不充分而非仅存在种族歧视。",
    "phrases": [
      "so-called elite or blue-ribbon juries",
      "a convenient way around"
    ]
  },
  {
    "id": "2010-p4-s7",
    "number": 7,
    "text": "The system also failed to regularly include women on juries until the mid-20th century.",
    "trunk": "The system failed to include women on juries.",
    "layers": [
      {
        "label": "未能常态纳入",
        "text": "failed to regularly include有频率限制，下一句早期个例不与之矛盾。"
      },
      {
        "label": "延续时间",
        "text": "until说明此前状态持续至20世纪中叶。"
      }
    ],
    "grammar": [
      "to regularly include是不定式中插入副词，regularly修饰include。",
      "on juries表作为陪审团成员，不是物理站在上面。"
    ],
    "literal": "这一制度直到20世纪中叶也仍未能经常将女性纳入陪审团。",
    "natural": "此外，直到20世纪中叶，陪审团制度仍未做到常态化地吸纳女性。",
    "logic": "引入性别代表性问题，后文按1898年、1940年代和1960年代展开。",
    "phrases": [
      "failed to regularly include"
    ]
  },
  {
    "id": "2010-p4-s8",
    "number": 8,
    "text": "Although women first served on state juries in Utah in 1898, it was not until the 1940s that a majority of states made women eligible for jury duty.",
    "trunk": "a majority of states made women eligible for jury duty.",
    "layers": [
      {
        "label": "先例与普及",
        "text": "1898年犹他州的先例不等于多数州同步开放。"
      },
      {
        "label": "强调迟到",
        "text": "it was not until...that把到1940年代才普遍取得资格作为重点。"
      }
    ],
    "grammar": [
      "a majority of states是多数州，不是全部州；eligible为资格状态。",
      "made women eligible中women是宾语，eligible为宾补，for引资格适用事务。"
    ],
    "literal": "尽管女性1898年首次在犹他州担任州陪审员，但直到1940年代，多数州才让女性有资格承担陪审职责。",
    "natural": "女性虽早在1898年就首次进入犹他州的州陪审团，但直到20世纪40年代，多数州才承认她们的陪审资格。",
    "logic": "区分首例与普及，避免把1898年错看成全国改革节点。",
    "phrases": [
      "it was not until the 1940s",
      "eligible for jury duty"
    ]
  },
  {
    "id": "2010-p4-s9",
    "number": 9,
    "text": "Even then several states automatically exempted women from jury duty unless they personally asked to have their names included on the jury list.",
    "trunk": "several states exempted women from jury duty.",
    "layers": [
      {
        "label": "默认豁免",
        "text": "automatically不需要女性主动申请就免除职责。"
      },
      {
        "label": "可申请的例外",
        "text": "unless保留主动参与渠道，排除38A的绝对禁令说法。"
      }
    ],
    "grammar": [
      "exempt A from B免除A的B义务；unless相当于if not。",
      "have their names included为have+宾语+过去分词宾补，names是被列入对象。"
    ],
    "literal": "即便那时，若干州仍自动免除女性陪审职责，除非她们亲自请求让自己的名字列入陪审名单。",
    "natural": "即便如此，有些州仍默认女性免任陪审员，只有本人主动提出申请，才把她们列入名单。",
    "logic": "说明形式资格不等于实际代表性，女性参与仍需额外主动手续。",
    "phrases": [
      "exempted women from jury duty",
      "have their names included"
    ]
  },
  {
    "id": "2010-p4-s10",
    "number": 10,
    "text": "This practice was justified by the claim that women were needed at home, and it kept juries unrepresentative of women through the 1960s.",
    "trunk": "This practice was justified by the claim, and it kept juries unrepresentative of women.",
    "layers": [
      {
        "label": "辩护理由",
        "text": "claim的内容是women were needed at home，明确体现传统家庭分工观念。"
      },
      {
        "label": "实际后果",
        "text": "keep+宾语+形容词表示使陪审团一直缺乏女性代表性。"
      }
    ],
    "grammar": [
      "that从句解释claim内容，不是修饰缺失成分的关系从句。",
      "through不只是到1960年开始，而是贯穿整个年代。"
    ],
    "literal": "这种做法被‘家里需要女性’的说法正当化，并使陪审团在整个1960年代都缺乏女性代表性。",
    "natural": "人们以女性应留在家中为由替这一做法辩护，结果直到20世纪60年代，陪审团仍不能充分代表女性。",
    "logic": "直接解释38题：女性被预设承担家务，而非资格差或不愿参与。",
    "phrases": [
      "kept juries unrepresentative of women"
    ]
  },
  {
    "id": "2010-p4-s11",
    "number": 11,
    "text": "In 1968, the Congress of the United States passed the Jury Selection and Service Act, ushering in a new era of democratic reforms for the jury.",
    "trunk": "the Congress of the United States passed the Jury Selection and Service Act.",
    "layers": [
      {
        "label": "立法转折",
        "text": "1968年国会通过法案，制度开始改革。"
      },
      {
        "label": "结果",
        "text": "ushering in补充这一事件开启新时代的结果，不是另一个限定谓语。"
      }
    ],
    "grammar": [
      "pass法案表示通过；Act为法律名称而非普通动作。",
      "for the jury限定改革对象，of democratic reforms说明新时代的内容。"
    ],
    "literal": "1968年，美国国会通过《陪审员遴选与任职法》，由此迎来陪审团民主改革的新时代。",
    "natural": "1968年，美国国会通过《陪审员遴选与任职法》，开启了陪审团民主改革的新时期。",
    "logic": "从前文历史缺陷转向改革发展，提供39题精确时间锚点。",
    "phrases": [
      "ushering in"
    ]
  },
  {
    "id": "2010-p4-s12",
    "number": 12,
    "text": "This law abolished special educational requirements for federal jurors and required them to be selected at random from a cross section of the entire community.",
    "trunk": "This law abolished special educational requirements and required them to be selected.",
    "layers": [
      {
        "label": "废除特定门槛",
        "text": "abolished针对special educational requirements，保留special和federal范围。"
      },
      {
        "label": "选取方式",
        "text": "require somebody to be done以被动不定式说明选人方式。"
      }
    ],
    "grammar": [
      "at random与randomly同义，表示随机抽选。",
      "from a cross section强调代表全体社会群体；不是只抽某一精英阶层。"
    ],
    "literal": "该法废除了对联邦陪审员的特殊教育要求，并要求他们从整个社区的横截面中随机选取。",
    "natural": "这部法律取消了联邦陪审员的特殊教育门槛，要求从代表整个社会各群体的人群中随机遴选。",
    "logic": "39B对应门槛放宽；本句没有把改革扩展到州层级或宣布性别歧视违宪。",
    "phrases": [
      "at random",
      "a cross section of the entire community"
    ]
  },
  {
    "id": "2010-p4-s13",
    "number": 13,
    "text": "In the landmark 1975 decision Taylor v. Louisiana, the Supreme Court extended the requirement that juries be representative of all parts of the community to the state level.",
    "trunk": "the Supreme Court extended the requirement to the state level.",
    "layers": [
      {
        "label": "主干目标",
        "text": "extended the requirement to the state level：把要求推至州层级。"
      },
      {
        "label": "要求内容",
        "text": "that juries be representative说明陪审团应有全面代表性；不是叙述已经代表所有人。"
      }
    ],
    "grammar": [
      "要求类名词后that从句用原形be，不能擅改为are。",
      "长宾语后的to the state level与主句extended搭配，不能错误连接到内层代表对象。"
    ],
    "literal": "在具有里程碑意义的1975年泰勒诉路易斯安那州案判决中，最高法院把陪审团应代表社区所有部分的要求扩展到了州层级。",
    "natural": "1975年的泰勒诉路易斯安那州案具有里程碑意义：最高法院把陪审团须代表社会各群体的要求，扩展到了州一级。",
    "logic": "补充1975年的层级扩展，防止把39C错归1968年法案的直接变化。",
    "phrases": [
      "extended the requirement",
      "representative of all parts of the community"
    ]
  },
  {
    "id": "2010-p4-s14",
    "number": 14,
    "text": "The Taylor decision also declared sex discrimination in jury selection to be unconstitutional and ordered states to use the same procedures for selecting male and female jurors.",
    "trunk": "The Taylor decision declared sex discrimination to be unconstitutional and ordered states to use the same procedures.",
    "layers": [
      {
        "label": "违宪判断",
        "text": "declare A to be B以不定式作宾补，认定性别歧视违宪。"
      },
      {
        "label": "执行要求",
        "text": "order states to use要求各州采用相同程序；for selecting说明程序用途。"
      }
    ],
    "grammar": [
      "两个及物谓语均有宾语和不定式宾补，不能把to be或to use误作新从句。",
      "male and female平行限定jurors，不是只改善女性选拔而取消男性程序。"
    ],
    "literal": "泰勒案判决还宣布陪审员遴选中的性别歧视违宪，并命令各州对男性与女性陪审员采用相同的遴选程序。",
    "natural": "泰勒案还认定，遴选陪审员时实施性别歧视违反宪法，要求各州以相同程序选拔男女陪审员。",
    "logic": "以1975年制度改革收束历史发展，支撑全文传统与演进的主旨。",
    "phrases": [
      "declared sex discrimination in jury selection to be unconstitutional"
    ]
  }
];
export const passage2010P4Sentences: SentenceAnalysis[] = drafts.map(sentence => {
 const reviewed=passage2010P4Syntax[sentence.number];
 const result=withReviewedSyntax({...sentence, beginnerSyntax:{components:reviewed.components,clauses:reviewed.clauses,reading:reviewed.reading},practice:passage2010P4Practice[sentence.number].map(task=>task.kind==="range"?{...task,rangeText:sentence.text}:task)},reviewed.colors);
 result.translationAlignment=result.chunks.map((chunk,i)=>({english:chunk.text,chinese:reviewed.translations[i]}));
 return result;
});
const question = (number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D", locating: string, reasons: [string, string, string, string]): Question => ({ id: 201000 + number, number, sentenceId: `2010-p4-s${sentenceNumber}`, prompt, options: (["A", "B", "C", "D"] as const).map((key, index) => ({ key, text: options[index] })), answer, locating, explanations: { A: reasons[0], B: reasons[1], C: reasons[2], D: reasons[3] }, reasoning: passage2010P4Reasoning[number], analysis: passage2010P4QuestionAnalysis[number] });
export const passage2010P4Questions: Question[] = [
  question(36, 1, "From the principles of the US jury system, we learn that ________________.", ["both literate and illiterate people can serve on juries", "defendants are immune from trial by their peers", "no age limit should be imposed for jury service", "judgment should consider the opinion of the public"], "D", "首句五项原则中，末项要求裁决体现the conscience of the community而不只拘泥法条；前几项仍保留年龄和读写基本要求，并赋予同侪审判权。", ["识字能力是最低资格之一，不能推出不识字者也一律有资格。", "entitled to是有权接受，immune from是免受，意义反向。", "原文有minimal qualifications of age，并未取消一切年龄限制。", "正确：公众的意见概括社区的良知这一判断维度；不是以民意取代全部法律。"]),
  question(37, 6, "The practice of selecting so-called elite jurors prior to 1968 showed ________________.", ["the inadequacy of antidiscrimination laws", "the prevalent discrimination against certain races", "the conflicting ideals in jury selection procedures", "the arrogance common among the Supreme Court judges"], "A", "第6句although已有禁令，精英筛选仍提供a convenient way around反歧视法律；让步结构突出法律未充分落实公平原则。", ["正确：所谓精英标准仍能绕开已有法律，体现法律保障或实际约束不足；不等于从未立法。", "种族歧视是相关背景，但问题借精英做法要说明的是禁令可被规避，不只是某些种族受歧视。", "第4句是程序与民主理想冲突，不是不同理想之间彼此冲突。", "文章未评价法官傲慢，反而说最高法院早已禁止故意歧视；人物态度属无据添加。"]),
  question(38, 10, "Even in the 1960s, women were seldom on the jury list in some states because ________________.", ["they were automatically banned by state laws", "they fell far short of the required qualifications", "they were supposed to perform domestic duties", "they tended to evade public engagement"], "C", "第9—10句：默认豁免女性的理由是women were needed at home，结果整个1960年代代表性不足；unless仍允许女性主动申请。", ["自动豁免不等于禁止；女性可以主动申请列入名单，ban过度绝对化。", "第8句说多数州已经认可资格，后文没有说女性能力达不到要求。", "正确：家中需要女性的主张，就是预设女性应承担家庭事务。", "被制度默认排除不等于女性主动逃避公共参与，偷换责任主体。"]),
  question(39, 12, "After the Jury Selection and Service Act was passed, ________________.", ["sex discrimination in jury selection was unconstitutional and had to be abolished", "educational requirements became less rigid in the selection of federal jurors", "jurors at the state level ought to be representative of the entire community", "states ought to conform to the federal court in reforming the jury system"], "B", "题干锁定第11—12句1968年法案的直接改革：废除联邦陪审员特殊教育要求并实行代表性随机选取；第13—14句1975年判决的内容不可倒置归因。", ["性别歧视违宪是第14句1975年泰勒案的明确裁判内容，不是第12句所述1968年法案。", "正确：取消special educational requirements使联邦遴选教育门槛不再那么严苛，且保留federal范围。", "州层级代表性要求明确由1975年判决扩展，不能挪到1968年这一节点。", "原文写具体改革与最高法院判决，不概括为各州应一律遵从联邦法院进行所有改革。"]),
  question(40, 11, "In discussing the US jury system, the text centers on ________________.", ["its nature and problems", "its characteristics and tradition", "its problems and their solutions", "its tradition and development"], "D", "全文先介绍民主价值及直接民主传统，再按1880、1898、1940年代、1968、1975等时间节点叙述代表性问题和制度改革的发展。答案表独立核对为D。", ["涉及制度性质和问题，但未覆盖末段改革演进，概括不完整。", "涉及特点与传统，却漏掉时间线推进的制度变化。", "问题与改革是重要内容，但首段民主传统和整体历史发展不只是针对问题开解决方案；此项范围偏窄。", "正确：传统涵盖首段价值与民主形式，发展涵盖历史缺陷、法律变化及1975年改革，覆盖全文。"]),
];
