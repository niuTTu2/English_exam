import type { ArticleGuide } from "./article-teaching";
import type { SentenceAnalysis } from "./data";
import { createV2Sentence, type QuickReading } from "./article-v2/model";
import { reviewedBlocks } from "./2013-reading-helpers";
import { passage2013P3Texts as texts, passage2013P3ParagraphNumbers } from "./2013-passage-3-source";
import { passage2013P3Deep } from "./2013-passage-3-structure";
const quick: Array<[string, string, string, string[], QuickReading["keyReasons"], string[]]> = [
  [
    "科学家发现，虽然我们容易作出突然的过度反应，但如果稍停片刻、想想自己可能怎样反应，就能减轻甚至消除快速本能反应的不良影响。",
    "先读Scientists have found that，再在that里面找we can reduce；although表让步，if表可采取的条件。",
    "总论：暂停思考能够改变本能反应。",
    [
      "that although",
      "if we take",
      "we can reduce"
    ],
    [
      "main-line",
      "nested-clause"
    ],
    [
      "are prone to",
      "are likely to"
    ]
  ],
  [
    "迅速作出的决定可能是重要的防御机制；判断一个人是否危险时，大脑和身体天生会在几毫秒内迅速反应。",
    "分号后解释为什么快反应有用：危险情境需要立即自保，并非所有判断都越快越好。",
    "说明紧急危险下快速判断的价值。",
    [
      "if we are judging",
      "our brains and bodies"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "但评估其他因素，我们就需要更多时间。",
    "But把紧急危险判断与其他判断区分开。",
    "转折：另一些判断需要较长时间。",
    [
      "to assess"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "研究表明，要准确判断一个人是否善于交际，至少需要一分钟，最好有五分钟。",
    "studies show是插入说明；主干仍是we need，To...说明需要时间的目的。",
    "举例说明非紧急社交判断耗时更长。",
    [
      "studies show,",
      "we need"
    ],
    [
      "answer-evidence"
    ],
    [
      "at least"
    ]
  ],
  [
    "判断性格的复杂方面，例如神经质或思想开放程度，需要花一些时间。",
    "It takes...to...中真正要花时间的是judge；like后为性格特征的例子。",
    "补充复杂性格判断不能一瞬完成。",
    [
      "to judge",
      "like neuroticism"
    ],
    [],
    []
  ],
  [
    "然而，针对快速刺激作出的仓促决定并非只发生在人际领域。",
    "aren't exclusive to否定的是专属于某个领域，不是否定人际判断本身存在。",
    "把讨论从人际关系扩展到日常刺激。",
    [
      "aren't exclusive"
    ],
    [
      "paragraph-turn"
    ],
    [
      "in reaction to",
      "exclusive to"
    ]
  ],
  [
    "多伦多大学的心理学家发现，只看几毫秒快餐标志，就会使我们随后阅读的速度提高20%，尽管阅读与吃东西几乎无关。",
    "viewing...整个行为作primes的主语；20 percent faster是阅读速度增幅，不能误读为吃饭速度。",
    "用快餐标志实验说明无意识联想效应。",
    [
      "found that",
      "primes us",
      "even though"
    ],
    [
      "answer-evidence",
      "misreading"
    ],
    [
      "has little to do with"
    ]
  ],
  [
    "我们无意识地把快餐与速度和不耐烦联系起来，并将这些冲动带入其他正在做的事情；看过快餐图像的被试还容易觉得一段音乐持续得太久。",
    "原卷在doing后用逗号连接大写Subjects，保留这一标点。阅读时分清两组主语：We与Subjects；exposed to...说明被试看过什么。",
    "用阅读和音乐的迁移共同解释联想带来的冲动。",
    [
      "and carry",
      "Subjects exposed",
      "also tend"
    ],
    [
      "answer-evidence",
      "attachment"
    ],
    [
      "associate fast food with speed and impatience",
      "tend to"
    ]
  ],
  [
    "不过，我们能扭转这些影响。",
    "Yet是全文方向的转折，can肯定改变的可能。",
    "从说明问题转向如何克服。",
    [],
    [
      "paragraph-turn"
    ],
    []
  ],
  [
    "如果我们知道，看到笑脸时自己会对消费品或住房选择反应过度——这也是优秀销售代表和房产经纪人总是微笑的一个原因——就可以在购买前稍停片刻。",
    "If管到括号结束，主句在we can take...；微笑是影响判断的诱因，停一下才是应对方法。",
    "用消费情境说明行动前先停顿。",
    [
      "when we see",
      "(one reason",
      "we can take"
    ],
    [
      "answer-evidence",
      "nested-clause"
    ],
    [
      "real estate"
    ]
  ],
  [
    "如果知道女性招聘筛选人员更可能拒绝有吸引力的女性求职者，就可以帮助筛选人员认识自己的偏见，或者另聘外部筛选人员。",
    "两个female分别限定筛选人员和申请者；主张是识别并纠正偏见，不是认可这种拒绝。",
    "说明认清偏见后可以主动干预。",
    [
      "are more likely",
      "we can help",
      "or hire"
    ],
    [
      "answer-evidence"
    ],
    [
      "are more likely to"
    ]
  ],
  [
    "婚姻专家约翰·戈特曼解释说，只有先用长期深入研究为这类即时反应打好基础，我们才能快速而可靠地从少量信息中作判断。",
    "only after限制可靠快判断的前提；thin slice是少量信息的快速判断，thick sliced才是此前深入研究。",
    "强调可靠直觉以充分长期了解为基础。",
    [
      "explains that",
      "only after",
      "in \"thick sliced\""
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    [
      "ground such snap reactions in \"thick sliced\" long-term study"
    ]
  ],
  [
    "戈特曼博士真想判断一对夫妻能否继续共同生活时，会邀他们去自己的岛上静居处接受更长时间的评估：是两天，而不是两秒。",
    "two days, not two seconds把研究时间对比说实；whether从句是assess要判断的内容。",
    "用两天评估印证充分信息的重要性。",
    [
      "he invites",
      "two days"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "我们能通过停顿抑制本能反应，这种能力使人区别于动物：狗只会断断续续地想未来，或者只想几分钟后的事情。",
    "主语是Our ability...，is后what从句说明这是什么；冒号后以狗的有限远虑作对比。",
    "从人类能力层面解释改变为什么可行。",
    [
      "is what",
      "dogs can think",
      "only intermittently"
    ],
    [
      "main-line",
      "nested-clause"
    ],
    [
      "differentiates us from animals"
    ]
  ],
  [
    "而在人类以往的生活中，我们每天大约有12%的时间在考虑较长远的事情。",
    "But延续人与狗的对照；contemplating是花时间做的事，12%修饰时间占比。",
    "用时间比例说明人有较强的长远思考能力。",
    [
      "contemplating"
    ],
    [],
    []
  ],
  [
    "技术也许会改变我们反应的方式，却没有改变人的本性。",
    "although让步后，重点是hasn't changed our nature；it指technology。",
    "承认技术影响，同时保留对人的信心。",
    [
      "it hasn't"
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    []
  ],
  [
    "我们仍有想象能力，能够克服诱惑，扭转追求高速反应的趋势。",
    "still have肯定能力仍在；rise above和reverse并列说明能力可以用来做什么。",
    "以肯定性的结论收束全文，表现乐观态度。",
    [
      "to rise above",
      "and reverse"
    ],
    [
      "answer-evidence",
      "main-line"
    ],
    [
      "rise above temptation"
    ]
  ]
];
export const passage2013P3Sentences: SentenceAnalysis[] = texts.map((text,i)=>{ const [natural,obstacle,logic,starts,keyReasons,phrases]=quick[i]; return createV2Sentence({id:`2013-p3-s${i+1}`,number:i+1,text,natural,logic,phrases,quickReading:{blocks:reviewedBlocks(text,starts),obstacle,keyReasons},...passage2013P3Deep[i+1]}); });
export const passage2013P3Paragraphs=passage2013P3ParagraphNumbers.map((ns,i)=>({id:`2013-p3-para${i+1}`,sentenceIds:ns.map(n=>`2013-p3-s${n}`)}));
export const passage2013P3Guide:ArticleGuide = {
  "mainIdea": "人容易受快速刺激和本能反应影响，但通过暂停思考、识别偏见和积累深入信息，能够作出更可靠判断并扭转高速反应趋势。",
  "route": [
    "总论：暂停可以纠偏",
    "比较：紧急性影响判断时间",
    "实验：快餐刺激引发联想迁移",
    "方法：行动前停顿和识别偏见",
    "基础：可靠直觉依赖长期了解",
    "结论：人仍有改变能力"
  ],
  "paragraphs": [
    {
      "paragraphId": "2013-p3-para1",
      "title": "本能可以修正",
      "summary": "承认过度反应倾向，同时提出暂停思考的方法。",
      "relation": "总领全文的现象与应对。"
    },
    {
      "paragraphId": "2013-p3-para2",
      "title": "不同判断需要不同时间",
      "summary": "危险需快速防御，复杂性格判断需更多观察。",
      "relation": "区分有价值的快速反应与不宜急断的情形。"
    },
    {
      "paragraphId": "2013-p3-para3",
      "title": "无意识联想",
      "summary": "快餐图像影响阅读速度和对音乐时长的感受。",
      "relation": "证明刺激影响会跨活动迁移。"
    },
    {
      "paragraphId": "2013-p3-para4",
      "title": "主动干预",
      "summary": "购买前停顿，帮助招聘人员认识偏见。",
      "relation": "由问题转向可执行的纠偏方法。"
    },
    {
      "paragraphId": "2013-p3-para5",
      "title": "深入了解作为基础",
      "summary": "长期研究使快速判断更可靠，夫妻评估耗时两天。",
      "relation": "补充可靠直觉的前提。"
    },
    {
      "paragraphId": "2013-p3-para6",
      "title": "对改变保持信心",
      "summary": "人有较长远思考能力，技术未改变这种本性。",
      "relation": "以乐观态度回应全文问题。"
    }
  ],
  "references": [
    {
      "sentenceId": "2013-p3-s8",
      "expression": "those impulses",
      "referent": "与快餐联想相连的速度和不耐烦冲动",
      "targetSentenceIds": [
        "2013-p3-s8"
      ],
      "explanation": "those回指本句前半的心理联想，并被carry带入其他活动。"
    },
    {
      "sentenceId": "2013-p3-s9",
      "expression": "such influences",
      "referent": "前段快速刺激经联想影响其他活动的现象",
      "targetSentenceIds": [
        "2013-p3-s7",
        "2013-p3-s8"
      ],
      "explanation": "Yet开始讲这些影响可以被逆转。"
    },
    {
      "sentenceId": "2013-p3-s16",
      "expression": "it",
      "referent": "technology",
      "targetSentenceIds": [
        "2013-p3-s16"
      ],
      "explanation": "两部分谈的都是技术，不能把it理解为人性。"
    }
  ],
  "timeline": [],
  "voices": [],
  sentenceRoles:Object.fromEntries(passage2013P3Sentences.map(s=>[s.id,s.logic]))
};
