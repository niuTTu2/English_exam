import { reviewedReadingQuestion as make } from "./2013-reading-helpers";
import { passage2013P3RawQuestions as raw } from "./2013-passage-3-source";
export const passage2013P3Questions = [
make("2013-p3",raw[0],{
  "answer": "D",
  "sentence": 2,
  "type": "概括推断",
  "scope": "paragraph",
  "instruction": "把紧急危险时的毫秒反应与社交判断的一至五分钟对照，概括情境紧迫性，而不是把所有决定一概而论。",
  "evidence": [
    {
      "id": "2013-p3-q31-danger",
      "sentenceId": "2013-p3-s2",
      "quote": "if we are judging whether someone is dangerous",
      "role": "危险判断可能关乎即时自保。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q31-speed",
      "sentenceId": "2013-p3-s2",
      "quote": "react very quickly, within milliseconds",
      "role": "防御反应发生得极快。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q31-other",
      "sentenceId": "2013-p3-s3",
      "quote": "we need more time to assess other factors",
      "role": "其他判断需要更多时间。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q31-social",
      "sentenceId": "2013-p3-s4",
      "quote": "we need at least a minute, preferably five",
      "role": "社交判断比危险判断耗时更久。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p3-q31-danger",
    "2013-p3-q31-speed",
    "2013-p3-q31-other"
  ],
  "paraphrase": "危险要立即反应，其他因素可慢慢评估 → 决策所需时间随情境的紧迫程度变化。",
  "limit": "不是说紧急性是唯一因素，也不是说花时间就必然准确。",
  "right": "D概括了防御性紧急情境与其他判断所需时间不同的对照。",
  "wrong": [
    [
      "A",
      "过度绝对",
      "A把花费时间说成预先决定准确率；原文只比较不同判断的耗时，没有保证时间与准确率的一一对应。",
      [
        "文中有没有说时间长短必定决定判断准确率？",
        [
          "有",
          "没有"
        ],
        "没有",
        "we need more time to assess other factors",
        "需要更多时间不等于时间是准确性的充分条件。"
      ]
    ],
    [
      "B",
      "偷换对象",
      "B换成证明大脑反应复杂；题目问决策所需时间，段落在比较危险与社交判断。",
      [
        "段落用毫秒和分钟比较的是哪一项？",
        [
          "判断所需时间",
          "脑部复杂程度"
        ],
        "判断所需时间",
        "within milliseconds",
        "时间数字不能直接证明脑部结构或反应机制复杂。"
      ]
    ],
    [
      "C",
      "偷换对象",
      "C把情境是否紧急换成评估是否重要；性格评估也可能重要，却不必立即作出。",
      [
        "是否危险最直接体现重要性还是紧迫性？",
        [
          "紧迫性",
          "仅重要性"
        ],
        "紧迫性",
        "whether someone is dangerous",
        "危险需要快速防御，其他重要判断仍可能从容进行。"
      ]
    ]
  ],
  "confirm": [
    "危险防御判断与社交判断的耗时相同吗？",
    [
      "不同",
      "相同"
    ],
    "不同",
    "within milliseconds",
    "社交判断至少一分钟，形成紧迫性与时间的对照。"
  ],
  "paths": [
    [
      2,
      3
    ],
    [
      2,
      4
    ]
  ],
  "language": [
    [
      "作决定所需的时间可能怎样？",
      "问时间如何变化，选项须概括对照。"
    ],
    [
      "预先决定判断的准确性",
      "predetermine把因果关系说得很强。"
    ],
    [
      "证明大脑反应的复杂性",
      "prove的宾语换成复杂性。"
    ],
    [
      "取决于评估的重要程度",
      "importance是重要性，不等同于紧急程度。"
    ],
    [
      "随情境的紧迫程度而变化",
      "vary according to表示随某条件变化。"
    ]
  ]
}),
make("2013-p3",raw[1],{
  "answer": "A",
  "sentence": 8,
  "type": "实验含义",
  "scope": "paragraph",
  "instruction": "先找快餐与速度、不耐烦的联系，再看这种冲动怎样迁移到阅读和音乐判断。",
  "evidence": [
    {
      "id": "2013-p3-q32-reading",
      "sentenceId": "2013-p3-s7",
      "quote": "primes us to read 20 percent faster",
      "role": "快餐标志影响阅读速度。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q32-association",
      "sentenceId": "2013-p3-s8",
      "quote": "We unconsciously associate fast food with speed and impatience",
      "role": "明说无意识地发生联想。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q32-carry",
      "sentenceId": "2013-p3-s8",
      "quote": "carry those impulses into whatever else we're doing",
      "role": "这种冲动迁移到其他活动。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p3-q32-association"
  ],
  "paraphrase": "associate fast food with speed and impatience → 反应带有联想性质 → associative。",
  "limit": "can表示可能具有此性质，不是所有快速决定都有害。",
  "right": "A把原文associate的动作转为associative性质形容词。",
  "wrong": [
    [
      "B",
      "与原文相反",
      "B说并非无意识，原文明说unconsciously。",
      [
        "unconsciously表示有意识还是无意识？",
        [
          "无意识",
          "有意识"
        ],
        "无意识",
        "unconsciously associate",
        "否定前缀un-不能漏掉，B正好反转。"
      ]
    ],
    [
      "C",
      "无中生有",
      "C说危险，但快餐实验只证明阅读变快、音乐显得漫长，并未报告危险后果。",
      [
        "快餐实验实际测到了哪项？",
        [
          "阅读速度变化",
          "发生危险事故"
        ],
        "阅读速度变化",
        "read 20 percent faster",
        "不能把前段判断别人是否危险移入这个实验结论。"
      ]
    ],
    [
      "D",
      "与原文相反",
      "D否认冲动性，原文却把带入其他活动的反应叫those impulses。",
      [
        "those impulses指什么？",
        [
          "速度与不耐烦的冲动",
          "经过深思的计划"
        ],
        "速度与不耐烦的冲动",
        "carry those impulses",
        "原文直接使用impulses，不能选否认冲动的D。"
      ]
    ]
  ],
  "confirm": [
    "associate的形容词associative在本题表示什么？",
    [
      "联想性的",
      "危险的"
    ],
    "联想性的",
    "associate fast food with speed and impatience",
    "这是同根词在选项中的同义转换。"
  ],
  "paths": [
    [
      8
    ],
    [
      7,
      8
    ]
  ],
  "language": [
    [
      "对快餐标志的反应表明快速决定具有怎样的特点？",
      "shows that后问实验结论，不是快餐本身的品质。"
    ],
    [
      "可能具有联想性",
      "associative对应associate。"
    ],
    [
      "并非无意识的",
      "not和un-双重否定为有意识方向。"
    ],
    [
      "可能有危险",
      "危险是此实验没有证明的属性。"
    ],
    [
      "并非冲动的",
      "not否定impulsive。"
    ]
  ]
}),
make("2013-p3",raw[2],{
  "answer": "B",
  "sentence": 10,
  "type": "方法建议",
  "scope": "paragraph",
  "instruction": "从Yet后的两种干预例子提炼共同做法：知道自己会偏，就在行动前停顿思考或改进筛选过程。",
  "evidence": [
    {
      "id": "2013-p3-q33-pause",
      "sentenceId": "2013-p3-s10",
      "quote": "we can take a moment before buying",
      "role": "购买前停顿而不是立即行动。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q33-bias",
      "sentenceId": "2013-p3-s11",
      "quote": "we can help screeners understand their biases",
      "role": "先认识判断偏差再干预。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p3-q33-pause"
  ],
  "paraphrase": "take a moment before buying → 行动之前先停下来想一想 → think before we act。",
  "limit": "例子没有要求事事咨询专家，也不是宣称停顿能保证任何选择正确。",
  "right": "B概括两种例子共同的主动反思，而不局限于购物。",
  "wrong": [
    [
      "A",
      "与原文相反",
      "A要相信第一印象，作者恰恰让人警惕笑脸或外貌引起的第一反应。",
      [
        "作者用笑脸的例子鼓励立即相信第一印象吗？",
        [
          "不鼓励",
          "鼓励"
        ],
        "不鼓励",
        "take a moment before buying",
        "暂停是在检查第一反应的偏差。"
      ]
    ],
    [
      "C",
      "无中生有",
      "C要求随大多数人做，原文提出的是认识自身偏见，没有拿常见做法作准则。",
      [
        "纠偏依据是认识偏见还是跟随常见做法？",
        [
          "认识偏见",
          "跟随常见做法"
        ],
        "认识偏见",
        "understand their biases",
        "通常的反应也可能带偏见。"
      ]
    ],
    [
      "D",
      "观点归属错误",
      "D把后文引用婚姻专家的论证换成每个人都应求助专家的行动建议。",
      [
        "购物例子的具体建议是什么？",
        [
          "买前停一下",
          "先找婚姻专家"
        ],
        "买前停一下",
        "before buying",
        "专家是作者引用的证据，不是这段推荐的必需步骤。"
      ]
    ]
  ],
  "confirm": [
    "before buying强调先停顿还是买完后再反省？",
    [
      "先停顿",
      "买完后反省"
    ],
    "先停顿",
    "take a moment before buying",
    "before决定了思考与行动的先后。"
  ],
  "paths": [
    [
      10
    ],
    [
      10,
      11
    ]
  ],
  "language": [
    [
      "要扭转快速决定的不良影响，我们应该怎样做？",
      "reverse改变影响方向，should询问建议。"
    ],
    [
      "相信第一印象",
      "trust是接受，不是检查。"
    ],
    [
      "三思而后行",
      "before说明先思考后行动。"
    ],
    [
      "按人们通常的方式做",
      "usually只说明常见，不保证正确。"
    ],
    [
      "寻求专家建议",
      "原文出现专家不等于建议人人咨询。"
    ]
  ]
}),
make("2013-p3",raw[3],{
  "answer": "C",
  "sentence": 12,
  "type": "前提条件",
  "scope": "paragraph",
  "instruction": "抓住only after，把快速判断本身与此前长期研究的基础区分开。",
  "evidence": [
    {
      "id": "2013-p3-q34-ground",
      "sentenceId": "2013-p3-s12",
      "quote": "only after we ground such snap reactions in \"thick sliced\" long-term study",
      "role": "长期深入研究是可靠快判断的前提。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q34-days",
      "sentenceId": "2013-p3-s13",
      "quote": "two days, not two seconds",
      "role": "两天观察说明充分了解需要时间。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p3-q34-ground"
  ],
  "paraphrase": "thick sliced long-term study为判断提供充分了解 → adequate information。",
  "limit": "充分信息是基础，不是只要信息多就保证判断永不出错。",
  "right": "C概括长期深入观察所积累的充分信息。",
  "wrong": [
    [
      "A",
      "无中生有",
      "A的critical assessment强调批判性评估；原文强调研究长期、深入和资料充分，没把critical列为必要条件。",
      [
        "only after后的核心限定是什么？",
        [
          "长期深入研究",
          "必须批判性评价"
        ],
        "长期深入研究",
        "long-term study",
        "不要把听起来合理的critical自动补成原文。"
      ]
    ],
    [
      "B",
      "偷换对象",
      "B把thin sliced的快判断当成基础；原文用作基础的恰是thick sliced长期研究。",
      [
        "可靠thin slice依赖哪种研究？",
        [
          "thick sliced长期研究",
          "thin sliced短时研究"
        ],
        "thick sliced长期研究",
        "ground such snap reactions in \"thick sliced\" long-term study",
        "thin与thick不能因只差一个词就混同。"
      ]
    ],
    [
      "D",
      "无中生有",
      "D说合理的解释，原文谈的是判断前掌握足够信息，并非事后解释得是否通顺。",
      [
        "长期研究积累的核心是什么？",
        [
          "对对象的充分了解",
          "仅一个合理解释"
        ],
        "对对象的充分了解",
        "two days, not two seconds",
        "两天观察服务于了解对象，不是只准备解释。"
      ]
    ]
  ],
  "confirm": [
    "only after标明的是可靠快判断的前提还是结果？",
    [
      "前提",
      "结果"
    ],
    "前提",
    "only after we ground such snap reactions",
    "先有深入研究，后有可靠快速判断。"
  ],
  "paths": [
    [
      12
    ],
    [
      12,
      13
    ]
  ],
  "language": [
    [
      "戈特曼说可靠的即时反应建立在什么基础上？",
      "be based on询问基础，不是反应的名称。"
    ],
    [
      "批判性的评估",
      "critical不可自行补入原文。"
    ],
    [
      "浅层切片式研究",
      "thin与原文作基础的thick相反。"
    ],
    [
      "充分的信息",
      "adequate强调足够，而非信息绝对完备。"
    ],
    [
      "合理的解释",
      "explanation不是对对象的长期观察。"
    ]
  ]
}),
make("2013-p3",raw[4],{
  "answer": "B",
  "sentence": 17,
  "type": "作者态度",
  "scope": "whole-passage",
  "instruction": "以结尾still have...capacity和reverse读作者对克服趋势的信心；不要把承认困难当成怀疑能否改变。",
  "evidence": [
    {
      "id": "2013-p3-q35-nature",
      "sentenceId": "2013-p3-s16",
      "quote": "it hasn't changed our nature",
      "role": "技术没有改变人能够反思的本性。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p3-q35-capacity",
      "sentenceId": "2013-p3-s17",
      "quote": "We still have the imaginative capacity to rise above temptation and reverse the high-speed trend",
      "role": "明确肯定克服诱惑、改变趋势的能力。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p3-q35-capacity"
  ],
  "paraphrase": "still have the capacity to reverse → 相信人有能力扭转趋势 → optimistic。",
  "limit": "乐观不等于断言趋势已被逆转或必然自动消失。",
  "right": "B准确表达结尾对人类反思与改变能力的肯定。",
  "wrong": [
    [
      "A",
      "偷换对象",
      "A的宽容是不反对某事；作者不是容忍高速趋势，而是相信人能够扭转它。",
      [
        "结尾重点是容忍趋势，还是有能力改变趋势？",
        [
          "有能力改变",
          "容忍趋势"
        ],
        "有能力改变",
        "reverse the high-speed trend",
        "宽容不等于乐观判断改变的可能。"
      ]
    ],
    [
      "C",
      "与原文相反",
      "C说不确定，结尾却用still have肯定能力仍然存在。",
      [
        "still have表达肯定存在还是无法确定？",
        [
          "肯定存在",
          "无法确定"
        ],
        "肯定存在",
        "We still have the imaginative capacity",
        "对能力的肯定支持乐观，而非悬而未决。"
      ]
    ],
    [
      "D",
      "与原文相反",
      "D说怀疑，作者的结尾没有否认或怀疑改变能力，而是明确肯定。",
      [
        "作者是否怀疑人能够克服诱惑？",
        [
          "没有，明确肯定能力",
          "是"
        ],
        "没有，明确肯定能力",
        "rise above temptation",
        "不要把前文负面效应直接当成最终态度。"
      ]
    ]
  ],
  "confirm": [
    "文末认为技术已经抹去人的反思本性吗？",
    [
      "没有",
      "已经抹去"
    ],
    "没有",
    "it hasn't changed our nature",
    "这个让步后的否定为乐观结论提供支持。"
  ],
  "paths": [
    [
      17
    ],
    [
      16,
      17
    ]
  ],
  "language": [
    [
      "作者对扭转高速趋势持什么态度？",
      "toward后是扭转趋势这一可能，不是对技术本身。"
    ],
    [
      "宽容的",
      "tolerant指容忍。"
    ],
    [
      "乐观的",
      "optimistic相信前景或改善可能。"
    ],
    [
      "不确定的",
      "uncertain缺乏确定判断。"
    ],
    [
      "怀疑的",
      "Doubtful是怀疑；保留原卷首字母大写。"
    ]
  ]
})
];
