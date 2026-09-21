/**
 * Source-reviewed function-word identities. Frozen corpus wording is untouched.
 * Equivalent translations share a core sense; actual POS/role differences remain.
 * Mixed source summaries and whole-phrase explanations stay as source annotations.
 */
import type { ReviewedSenseAnnotations, ReviewedSenseTable } from "./reviewed-sense-types";

export const reviewedSensesFunction: ReviewedSenseTable = {
  "a": [
    {
      "id": "rate",
      "pos": "art.",
      "meaning": "每一（按单位计量）",
      "forms": [],
      "fromNotes": [
        [
          "art.",
          "一；每一"
        ],
        [
          "art.",
          "一次；每一"
        ]
      ]
    }
  ],
  "about": [
    {
      "id": "topic",
      "pos": "prep",
      "meaning": "关于",
      "forms": [
        [
          "prep",
          [
            "关于"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s6",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2011-p4-s7",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2011-p5-s1",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2011-p5-s16",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "question-201141-option-D",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2012-cloze-s13",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2012-p1-s10",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2012-p1-s13",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "question-201222-prompt",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "question-201222-option-D",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "question-201224-prompt",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "question-201225-option-C",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2012-p2-s11",
          "adv/prep",
          "关于；大约",
          "about"
        ],
        [
          "2012-p5-s4",
          "adv/prep",
          "关于；大约",
          "about"
        ]
      ]
    },
    {
      "id": "approximate",
      "pos": "adv",
      "meaning": "大约",
      "forms": [
        [
          "adv",
          [
            "大约"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s14",
          "adv/prep",
          "关于；大约",
          "about"
        ]
      ]
    }
  ],
  "across": [
    {
      "id": "range",
      "pos": "prep",
      "meaning": "遍及；遍布",
      "forms": [
        [
          "prep",
          [
            "遍及；横越",
            "遍及；遍布"
          ]
        ]
      ]
    }
  ],
  "after": [
    {
      "id": "time-after",
      "pos": "prep",
      "meaning": "在……之后",
      "forms": [
        [
          "prep",
          [
            "在……之后"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s2",
          "adv/conj/prep",
          "在……之后",
          "after"
        ],
        [
          "p4-s12",
          "adv/conj/prep",
          "在……之后",
          "after"
        ],
        [
          "2010-cloze-s3",
          "adv/conj/prep",
          "在……之后",
          "after"
        ],
        [
          "2010-p1-s5",
          "adv/conj/prep",
          "在……之后",
          "after"
        ],
        [
          "2012-p2-s13",
          "adv/conj/prep",
          "在……之后",
          "after"
        ]
      ]
    },
    {
      "id": "time-after",
      "pos": "conj",
      "meaning": "在……之后",
      "forms": [
        [
          "conj",
          [
            "在……之后"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p2-s16",
          "adv/conj/prep",
          "在……之后",
          "after"
        ]
      ]
    }
  ],
  "against": [
    {
      "id": "opposition",
      "pos": "prep",
      "meaning": "反对；针对",
      "forms": [
        [
          "prep",
          [
            "反对",
            "反对；针对",
            "对……（有偏见）",
            "抵制；抑制",
            "针对",
            "针对；不利于"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s9",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ],
        [
          "question-25-option-D",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ],
        [
          "2011-p5-s21",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ],
        [
          "2012-cloze-s3",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ],
        [
          "question-201237-option-A",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ]
      ]
    },
    {
      "id": "protection",
      "pos": "prep",
      "meaning": "防范；抵御",
      "forms": [
        [
          "prep",
          [
            "防范；抵御"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "prep",
          "反对；针对；以……为背景",
          "against"
        ]
      ]
    },
    {
      "id": "background",
      "pos": "prep",
      "meaning": "以……为背景",
      "forms": [],
      "fromNotes": [
        [
          "prep",
          "反对；针对；以……为背景"
        ]
      ]
    }
  ],
  "all": [
    {
      "id": "quantity-all",
      "pos": "det",
      "meaning": "所有的；全部的",
      "forms": [
        [
          "det",
          [
            "全部的",
            "所有",
            "所有的；全体的",
            "所有的；全部的",
            "整个"
          ]
        ],
        [
          "det/pron",
          [
            "所有；各种各样的"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s2",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "question-1-prompt",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "p5-s9",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "p5-s10",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "2010-cloze-s8",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "question-201012-prompt",
          "adv/det/pron",
          "全部；所有",
          "all"
        ],
        [
          "question-201021-option-C",
          "adv/det/pron",
          "全部；所有",
          "all"
        ]
      ]
    },
    {
      "id": "quantity-all",
      "pos": "pron",
      "meaning": "全部；所有各项",
      "forms": [
        [
          "pron",
          [
            "全部三架飞机",
            "全部；所有各项",
            "所有的一切"
          ]
        ]
      ]
    }
  ],
  "almost": [
    {
      "id": "approximation",
      "pos": "adv",
      "meaning": "几乎；差不多",
      "forms": [
        [
          "adv",
          [
            "几乎",
            "几乎；差不多"
          ]
        ]
      ]
    }
  ],
  "among": [
    {
      "id": "within-group",
      "pos": "prep",
      "meaning": "在……之中",
      "forms": [
        [
          "prep",
          [
            "在……中",
            "在……之中",
            "在……群体中"
          ]
        ]
      ]
    }
  ],
  "an": [
    {
      "id": "function-indefinite",
      "pos": "art.",
      "meaning": "一个；泛指一类事物",
      "forms": [
        [
          "art.",
          [
            "一个（元音音素前）",
            "一个；泛指一类事物",
            "一个；用于元音音素前",
            "一家",
            "一封",
            "一篇"
          ]
        ]
      ]
    }
  ],
  "another": [
    {
      "id": "additional",
      "pos": "det",
      "meaning": "另一个；又一个",
      "forms": [
        [
          "det",
          [
            "又一个",
            "又一个；另一个",
            "另一个",
            "另一个；又一个",
            "另一场；再一场",
            "另一种"
          ]
        ]
      ]
    },
    {
      "id": "additional",
      "pos": "pron",
      "meaning": "另一个",
      "forms": [
        [
          "pron",
          [
            "另一个",
            "另一项（发展）"
          ]
        ]
      ]
    }
  ],
  "any": [
    {
      "id": "unrestricted",
      "pos": "det",
      "meaning": "任何一个",
      "forms": [
        [
          "det",
          [
            "任一的；任何的",
            "任何一个"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s2",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2001-p1-s5",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2010-cloze-s4",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "question-201006-prompt",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2010-p1-s9",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "question-201022-prompt",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2011-p4-s16",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2012-cloze-s16",
          "adv/det/pron",
          "任何一个",
          "any"
        ],
        [
          "2012-p4-s16",
          "adv/det/pron",
          "任何一个",
          "any"
        ]
      ]
    }
  ],
  "around": [
    {
      "id": "approximation",
      "pos": "adv",
      "meaning": "大约",
      "forms": [
        [
          "adv",
          [
            "大约"
          ]
        ]
      ]
    },
    {
      "id": "circumvention",
      "pos": "prep",
      "meaning": "绕过",
      "forms": [
        [
          "prep",
          [
            "绕过"
          ]
        ]
      ]
    },
    {
      "id": "distribution",
      "pos": "prep",
      "meaning": "遍及；在各处",
      "forms": [
        [
          "prep",
          [
            "遍及；在各处"
          ]
        ]
      ]
    },
    {
      "id": "surrounding",
      "pos": "prep",
      "meaning": "围绕",
      "forms": [],
      "fromNotes": [
        [
          "adv/prep",
          "在……各处；围绕"
        ]
      ]
    }
  ],
  "as": [
    {
      "id": "function-comparison",
      "pos": "conj",
      "meaning": "和……一样；如同（比较）",
      "forms": [
        [
          "conj",
          [
            "和……一样；如同（比较）"
          ]
        ],
        [
          "比较连接词",
          [
            "如同"
          ]
        ]
      ]
    },
    {
      "id": "function-role",
      "pos": "prep",
      "meaning": "作为；视为",
      "forms": [
        [
          "prep",
          [
            "作为；视为"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-3-prompt",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p3-s1",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p3-s2",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p3-s11",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p4-s3",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p5-s3",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2010-cloze-s8",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-201022-option-C",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2011-p5-s11",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-cloze-s1",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-cloze-s11",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-p5-s10",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-p5-s13",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-p5-s15",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-p5-s17",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-201241-option-F",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "id": "function-time",
      "pos": "conj",
      "meaning": "当……时；随着",
      "forms": [
        [
          "conj",
          [
            "当……时；随着"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s6",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2010-cloze-s7",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2010-p1-s4",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "id": "function-example",
      "pos": "prep",
      "meaning": "例如（such as）",
      "forms": [
        [
          "prep",
          [
            "例如（such as）"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s3",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2011-p5-s14",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2011-p5-s15",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-201141-option-A",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "id": "function-comparison-degree",
      "pos": "adv",
      "meaning": "同样地；一样地（程度）",
      "forms": [
        [
          "adv",
          [
            "同样地；一样地（程度）"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s7",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "id": "manner",
      "pos": "conj",
      "meaning": "按照；如同……那样",
      "forms": [
        [
          "conj",
          [
            "按照；如同……那样"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s23",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "id": "reason",
      "pos": "conj",
      "meaning": "因为",
      "forms": [],
      "fromNotes": [
        [
          "conj",
          "当……时；因为"
        ]
      ]
    }
  ],
  "at": [
    {
      "id": "function-target",
      "pos": "prep",
      "meaning": "朝；对着（对象）",
      "forms": [
        [
          "prep",
          [
            "朝；对着（对象）",
            "针对；在……方面"
          ]
        ]
      ]
    },
    {
      "id": "manner",
      "pos": "prep",
      "meaning": "以……方式",
      "forms": [],
      "fromNotes": [
        [
          "prep",
          "在；针对；以某种方式"
        ]
      ]
    }
  ],
  "before": [
    {
      "id": "earlier",
      "pos": "adv",
      "meaning": "在……之前；以前",
      "forms": [
        [
          "adv",
          [
            "以前",
            "在……之前",
            "在……之前；以前"
          ]
        ]
      ]
    }
  ],
  "beyond": [
    {
      "id": "excess",
      "pos": "prep",
      "meaning": "超出；超过",
      "forms": [
        [
          "prep",
          [
            "超出",
            "超出；超过"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s4",
          "adv/prep",
          "超出；超过",
          "beyond"
        ],
        [
          "2010-p1-s8",
          "adv/prep",
          "超出；在……之外",
          "beyond"
        ]
      ]
    }
  ],
  "both": [
    {
      "id": "two",
      "pos": "det",
      "meaning": "两者都；双方",
      "forms": [
        [
          "det",
          [
            "两个都",
            "两者都；双方"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s15",
          "det/pron",
          "两位都",
          "both"
        ]
      ]
    },
    {
      "id": "two",
      "pos": "pron",
      "meaning": "两者都",
      "forms": [
        [
          "pron",
          [
            "两者都"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s10",
          "det/pron",
          "两者都；双方",
          "both"
        ]
      ]
    }
  ],
  "by": [
    {
      "id": "distribution",
      "pos": "prep",
      "meaning": "按……规模；成群地",
      "forms": [
        [
          "prep",
          [
            "按……规模；成群地"
          ]
        ]
      ]
    }
  ],
  "can": [
    {
      "id": "function-permission",
      "pos": "v",
      "meaning": "可以；获准",
      "forms": [
        [
          "v",
          [
            "可以；获准"
          ]
        ]
      ]
    },
    {
      "id": "rhetorical-possibility",
      "pos": "v",
      "meaning": "怎么竟能",
      "forms": [
        [
          "v",
          [
            "怎么竟能"
          ]
        ]
      ]
    }
  ],
  "do": [
    {
      "id": "performance",
      "pos": "v",
      "meaning": "表现",
      "forms": [
        [
          "v",
          [
            "做；表现",
            "表现"
          ]
        ]
      ]
    }
  ],
  "down": [
    {
      "id": "lower",
      "pos": "adv",
      "meaning": "向下；下降",
      "forms": [
        [
          "adv",
          [
            "向下；下降"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s7",
          "adj/adv/prep",
          "向下；降低",
          "down"
        ]
      ]
    },
    {
      "id": "lower",
      "pos": "adj",
      "meaning": "下降的；处于较低水平",
      "forms": [
        [
          "adj",
          [
            "下降的；处于较低水平"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s11",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ],
        [
          "2010-p1-s14",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ]
      ]
    }
  ],
  "each": [
    {
      "id": "individual",
      "pos": "det",
      "meaning": "每一个",
      "forms": [
        [
          "det",
          [
            "每一个"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p3-s24",
          "det/pron",
          "每一个",
          "each"
        ],
        [
          "question-201234-prompt",
          "det/pron",
          "每一个",
          "each"
        ],
        [
          "2012-p5-s22",
          "det/pron",
          "每一个",
          "each"
        ]
      ]
    },
    {
      "id": "individual",
      "pos": "pron",
      "meaning": "每一个；每个人",
      "forms": [
        [
          "pron",
          [
            "每一个；每个人"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s14",
          "det/pron",
          "每个人",
          "each"
        ]
      ]
    }
  ],
  "even": [
    {
      "id": "emphasis",
      "pos": "adv",
      "meaning": "甚至",
      "forms": [
        [
          "adv",
          [
            "甚至"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s9",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "question-201136-option-B",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "2011-p5-s13",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "2012-p2-s3",
          "adv",
          "甚至；即使",
          "even"
        ]
      ]
    }
  ],
  "ever": [
    {
      "id": "any-time",
      "pos": "adv",
      "meaning": "曾经；在任何时候",
      "forms": [
        [
          "adv",
          [
            "以往任何时候",
            "曾经；在任何时候",
            "曾经；迄今任何时候"
          ]
        ]
      ]
    }
  ],
  "every": [
    {
      "id": "individual",
      "pos": "det",
      "meaning": "每一个；每逢",
      "forms": [
        [
          "det",
          [
            "每一",
            "每一个；每逢"
          ]
        ]
      ],
      "sources": [
        [
          "p2-s2",
          "det/pron",
          "每一个；每隔",
          "every"
        ],
        [
          "2010-cloze-s8",
          "det/pron",
          "每一个；每隔",
          "every"
        ],
        [
          "question-201011-prompt",
          "det/pron",
          "每一个；每隔",
          "every"
        ],
        [
          "question-201022-option-B",
          "det/pron",
          "每一个；每隔",
          "every"
        ]
      ]
    }
  ],
  "few": [
    {
      "id": "scarcity",
      "pos": "det",
      "meaning": "很少的；几乎没有的",
      "forms": [
        [
          "det",
          [
            "几乎没有几个",
            "很少",
            "很少的",
            "很少的；几乎没有的",
            "极少的"
          ]
        ],
        [
          "determiner",
          [
            "很少的；几乎没有的"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s8",
          "adj/det/pron",
          "几乎没有；很少",
          "few"
        ]
      ]
    },
    {
      "id": "some",
      "pos": "det",
      "meaning": "几个；少数几个",
      "forms": [
        [
          "det",
          [
            "几个",
            "几个（a few）",
            "几个；少数几个"
          ]
        ]
      ]
    },
    {
      "id": "some",
      "pos": "pron",
      "meaning": "少数；一些",
      "forms": [
        [
          "pron",
          [
            "少数",
            "少数一些人",
            "少数；一些"
          ]
        ]
      ]
    }
  ],
  "for": [
    {
      "id": "function-reason-preposition",
      "pos": "prep",
      "meaning": "因为；出于（原因）",
      "forms": [
        [
          "prep",
          [
            "因为；出于（原因）",
            "由于；作为……的报酬"
          ]
        ]
      ]
    },
    {
      "id": "representation",
      "pos": "prep",
      "meaning": "替；代表",
      "forms": [
        [
          "prep",
          [
            "替；代表"
          ]
        ]
      ]
    },
    {
      "id": "destination",
      "pos": "prep",
      "meaning": "转向；以……为去向",
      "forms": [
        [
          "prep",
          [
            "转向；以……为去向"
          ]
        ]
      ]
    },
    {
      "id": "ratio",
      "pos": "prep",
      "meaning": "每……对应",
      "forms": [
        [
          "prep",
          [
            "每……对应"
          ]
        ]
      ]
    }
  ],
  "from": [
    {
      "id": "function-source",
      "pos": "prep",
      "meaning": "从；来自",
      "forms": [
        [
          "prep",
          [
            "从；来自",
            "向；从"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p1-s4",
          "prep",
          "来自；用于阻止或劝阻结构",
          "from"
        ]
      ]
    },
    {
      "id": "prevention",
      "pos": "prep",
      "meaning": "阻止；劝阻的对象",
      "forms": [
        [
          "prep",
          [
            "阻止；劝阻的对象"
          ]
        ]
      ],
      "sources": [
        [
          "question-201223-option-D",
          "prep",
          "来自；用于阻止或劝阻结构",
          "from"
        ]
      ]
    }
  ],
  "have": [
    {
      "id": "childbirth",
      "pos": "v",
      "meaning": "生育；有",
      "forms": [
        [
          "v",
          [
            "生育；有"
          ]
        ]
      ]
    },
    {
      "id": "causative",
      "pos": "v",
      "meaning": "使……得到办理",
      "forms": [
        [
          "v",
          [
            "使……得到办理"
          ]
        ]
      ]
    },
    {
      "id": "function-possess",
      "pos": "v",
      "meaning": "有；拥有；具有",
      "forms": [
        [
          "v",
          [
            "有；拥有；具有"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s11",
          "aux/v",
          "曾经拥有",
          "had"
        ]
      ]
    },
    {
      "id": "function-perfect",
      "pos": "aux",
      "meaning": "构成完成时或完成式",
      "forms": [
        [
          "aux",
          [
            "构成完成时或完成式"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p4-s7",
          "v",
          "拥有；完成时助动词",
          "has"
        ]
      ]
    }
  ],
  "hence": [
    {
      "id": "result",
      "pos": "adv",
      "meaning": "因此；由此",
      "forms": [
        [
          "adv",
          [
            "因此",
            "因此；由此"
          ]
        ]
      ]
    }
  ],
  "him": [
    {
      "id": "personal-object",
      "pos": "pron",
      "meaning": "他（宾格）",
      "forms": [
        [
          "pron",
          [
            "他（宾格）"
          ]
        ],
        [
          "pron",
          [
            "他"
          ]
        ]
      ]
    }
  ],
  "how": [
    {
      "id": "manner",
      "pos": "adv",
      "meaning": "如何；怎样",
      "forms": [
        [
          "adv",
          [
            "如何",
            "如何；怎样",
            "怎么",
            "怎样"
          ]
        ],
        [
          "interrogative adverb",
          [
            "如何；怎样"
          ]
        ],
        [
          "内容从句引导词",
          [
            "怎样"
          ]
        ],
        [
          "疑问副词",
          [
            "如何",
            "怎样"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s6",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2011-p5-s11",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2011-p5-s20",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2012-cloze-s1",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2012-p4-s15",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2012-p4-s17",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2012-p5-s4",
          "adv/conj",
          "多么；怎样",
          "how"
        ]
      ]
    },
    {
      "id": "degree",
      "pos": "adv",
      "meaning": "多么；达到怎样的程度",
      "forms": [
        [
          "adv",
          [
            "多么；程度如何",
            "多么；达到怎样的程度",
            "多少（与many配合）",
            "多少（与much组合）"
          ]
        ],
        [
          "感叹副词",
          [
            "多么"
          ]
        ],
        [
          "程度疑问副词",
          [
            "多么"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s27",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "question-200128-option-D",
          "adv/conj",
          "多么；怎样",
          "how"
        ],
        [
          "2012-cloze-s13",
          "adv/conj",
          "多么；怎样",
          "how"
        ]
      ]
    }
  ],
  "however": [
    {
      "id": "concessive-degree",
      "pos": "adv",
      "meaning": "无论多么",
      "forms": [
        [
          "adv",
          [
            "无论多么"
          ]
        ],
        [
          "程度词及让步连接词",
          [
            "无论多么"
          ]
        ]
      ]
    }
  ],
  "i": [
    {
      "id": "personal",
      "pos": "pron",
      "meaning": "我",
      "forms": [
        [
          "pron",
          [
            "我",
            "我（文章叙述者）",
            "我（正在解释的丈夫）"
          ]
        ]
      ]
    }
  ],
  "in": [
    {
      "id": "function-field",
      "pos": "prep",
      "meaning": "在……方面；在……领域",
      "forms": [
        [
          "prep",
          [
            "向……投资",
            "在……方面；在……领域",
            "对……的"
          ]
        ]
      ]
    },
    {
      "id": "manner",
      "pos": "prep",
      "meaning": "以……方式",
      "forms": [
        [
          "prep",
          [
            "以……方式"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv/prep",
          "在……中；在……方面；以……方式"
        ],
        [
          "adv/prep",
          "在……中；在……方面；以……形式"
        ]
      ]
    }
  ],
  "into": [
    {
      "id": "investigation-object",
      "pos": "prep",
      "meaning": "针对；关于",
      "forms": [
        [
          "prep",
          [
            "用于look into，表示调查对象",
            "针对；关于"
          ]
        ]
      ]
    },
    {
      "id": "entry",
      "pos": "prep",
      "meaning": "进入；到……里面",
      "forms": [
        [
          "prep",
          [
            "进入；到……里面"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s4",
          "prep",
          "进入；转变为",
          "into"
        ]
      ]
    }
  ],
  "it": [
    {
      "id": "situational",
      "pos": "pron",
      "meaning": "情境占位，不指具体实体",
      "forms": [
        [
          "pron",
          [
            "情境占位，不指具体实体",
            "无具体实体指代"
          ]
        ],
        [
          "情境代词",
          [
            "形势如此（情境占位）"
          ]
        ]
      ]
    }
  ],
  "itself": [
    {
      "id": "emphatic-self",
      "pos": "pron",
      "meaning": "它本身",
      "forms": [
        [
          "pron",
          [
            "它本身",
            "案件本身"
          ]
        ],
        [
          "pron",
          [
            "它本身"
          ]
        ]
      ]
    }
  ],
  "just": [
    {
      "id": "restriction",
      "pos": "adv",
      "meaning": "仅仅；不过",
      "forms": [
        [
          "adj/adv",
          [
            "不过；仅仅",
            "仅仅；不过"
          ]
        ],
        [
          "adv",
          [
            "仅仅",
            "仅仅；不过",
            "仅仅；只要"
          ]
        ]
      ],
      "sources": [
        [
          "2011-cloze-s9",
          "adj/adv",
          "正是；仅仅",
          "just"
        ],
        [
          "question-201111-prompt",
          "adj/adv",
          "正是；仅仅",
          "just"
        ]
      ]
    },
    {
      "id": "exactness",
      "pos": "adv",
      "meaning": "正是；恰好",
      "forms": [
        [
          "adj/adv",
          [
            "恰恰；同样地",
            "恰恰；同样程度地"
          ]
        ],
        [
          "adv",
          [
            "恰好；同样",
            "恰好；就在",
            "正好；完全",
            "正是",
            "正是；恰好",
            "究竟；具体"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s7",
          "adj/adv",
          "正是；仅仅",
          "just"
        ],
        [
          "2012-p5-s23",
          "adj/adv",
          "正是；仅仅",
          "just"
        ]
      ]
    }
  ],
  "least": [
    {
      "id": "minimum",
      "pos": "adv",
      "meaning": "最少；最低限度",
      "forms": [
        [
          "adv",
          [
            "最少；最低限度",
            "至少",
            "至少（at least中）"
          ]
        ]
      ]
    }
  ],
  "less": [
    {
      "id": "lower-degree",
      "pos": "adv",
      "meaning": "较少地；不那么",
      "forms": [
        [
          "adv",
          [
            "不那么",
            "更少；较低程度",
            "较不",
            "较不；不如以前",
            "较少地",
            "较少地（交谈）",
            "较少地；不那么",
            "较少地；较不"
          ]
        ]
      ]
    },
    {
      "id": "smaller-quantity",
      "pos": "det",
      "meaning": "较少的；更少的",
      "forms": [
        [
          "det",
          [
            "更少的",
            "较少的",
            "较少的；更少的"
          ]
        ]
      ]
    },
    {
      "id": "smaller-quantity",
      "pos": "pron",
      "meaning": "较少的量",
      "forms": [
        [
          "nominalized comparison",
          [
            "更少；少而精"
          ]
        ],
        [
          "pron",
          [
            "更少的装饰或规模",
            "更少的钱",
            "较少的投入或装饰",
            "较少的物质资源",
            "较少的装饰",
            "较少的量"
          ]
        ]
      ]
    }
  ],
  "little": [
    {
      "id": "scarcity",
      "pos": "det",
      "meaning": "很少的；几乎没有",
      "forms": [
        [
          "det",
          [
            "几乎没有",
            "几乎没有；很少",
            "几乎没有；极少",
            "很少的",
            "很少的；几乎没有"
          ]
        ]
      ]
    }
  ],
  "many": [
    {
      "id": "quantity-many",
      "pos": "det",
      "meaning": "许多",
      "forms": [
        [
          "det",
          [
            "多的",
            "许多",
            "许多；多少中的数量成分"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s8",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "p4-s11",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "question-201023-option-B",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2010-p4-s1",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2011-cloze-s9",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "question-201111-prompt",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "question-201136-prompt",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2012-cloze-s13",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2012-p3-s19",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2012-p4-s16",
          "det/pron",
          "许多；数量多",
          "many"
        ]
      ]
    },
    {
      "id": "quantity-many",
      "pos": "pron",
      "meaning": "许多",
      "forms": [
        [
          "pron",
          [
            "许多"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s10",
          "det/pron",
          "许多；数量多",
          "many"
        ],
        [
          "2012-p4-s5",
          "det/pron",
          "许多失业者",
          "many"
        ]
      ]
    },
    {
      "id": "quantity-many",
      "pos": "adj",
      "meaning": "许多；数量多",
      "forms": [
        [
          "adj",
          [
            "许多；数量多"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s11",
          "det/pron",
          "许多；数量多",
          "many"
        ]
      ]
    }
  ],
  "may": [
    {
      "id": "function-possibility",
      "pos": "v",
      "meaning": "可能；也许",
      "forms": [
        [
          "v",
          [
            "可能；也许"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s5",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "p5-s7",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "question-27-prompt",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "question-200121-prompt",
          "v",
          "可能；可以",
          "might"
        ],
        [
          "2001-p2-s11",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2010-p1-s7",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2011-p4-s9",
          "v",
          "可能；可以",
          "might"
        ],
        [
          "2012-p2-s5",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "question-201229-prompt",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2012-p3-s18",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2012-p3-s22",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2012-p4-s1",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "2012-p4-s12",
          "v",
          "可能；可以",
          "may"
        ],
        [
          "question-201238-prompt",
          "v",
          "可能；可以",
          "may"
        ]
      ]
    }
  ],
  "me": [
    {
      "id": "personal-object",
      "pos": "pron",
      "meaning": "我（宾格）",
      "forms": [
        [
          "pron",
          [
            "我",
            "我（宾格）",
            "我（希望交谈的妻子）",
            "我（抱怨丈夫不倾听的妻子）"
          ]
        ]
      ]
    }
  ],
  "more": [
    {
      "id": "greater-degree",
      "pos": "adv",
      "meaning": "更；更加",
      "forms": [
        [
          "adv",
          [
            "更",
            "更为；程度更高",
            "更像；更大程度上",
            "更加",
            "更多地",
            "更多地（说话量）",
            "更大程度地",
            "更；更加"
          ]
        ]
      ]
    },
    {
      "id": "greater-quantity",
      "pos": "det",
      "meaning": "更多的",
      "forms": [
        [
          "det",
          [
            "又一；再一",
            "更多的",
            "更多的；额外的",
            "更强的；更多的",
            "越多的",
            "越来越多的"
          ]
        ],
        [
          "determiner",
          [
            "更多的"
          ]
        ]
      ]
    },
    {
      "id": "greater-quantity",
      "pos": "pron",
      "meaning": "更多的量",
      "forms": [
        [
          "pron",
          [
            "更多人",
            "更多的事情",
            "更多的作业量",
            "更多的量",
            "更多的钱",
            "更多（所承受的事）",
            "更强的效果"
          ]
        ]
      ]
    }
  ],
  "most": [
    {
      "id": "highest-degree",
      "pos": "adv",
      "meaning": "最",
      "forms": [
        [
          "adv",
          [
            "最",
            "最（常见的关注重点）"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s4",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "question-28-prompt",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "2001-p1-s8",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "2001-p2-s11",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "2010-p1-s11",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "question-201025-prompt",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "2012-cloze-s3",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "2012-cloze-s16",
          "adv/det/pron",
          "最；大多数",
          "most"
        ]
      ]
    },
    {
      "id": "majority",
      "pos": "det",
      "meaning": "大多数的",
      "forms": [
        [
          "det",
          [
            "大多数",
            "大多数的"
          ]
        ],
        [
          "determiner",
          [
            "大多数的"
          ]
        ]
      ]
    },
    {
      "id": "majority",
      "pos": "pron",
      "meaning": "大多数",
      "forms": [
        [
          "pron",
          [
            "大多数",
            "大多数美国家庭"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s12",
          "adv/det/pron",
          "最；大多数",
          "most"
        ],
        [
          "question-201017-prompt",
          "adv/det/pron",
          "最；大多数",
          "most"
        ]
      ]
    }
  ],
  "much": [
    {
      "id": "degree",
      "pos": "adv",
      "meaning": "很大程度地；……得多",
      "forms": [
        [
          "adv",
          [
            "……得多",
            "很大程度上",
            "很大程度地",
            "很大程度地；……得多",
            "很；程度大"
          ]
        ]
      ]
    },
    {
      "id": "quantity",
      "pos": "det",
      "meaning": "很多的；大量的",
      "forms": [
        [
          "det",
          [
            "多少",
            "很多的",
            "很多的；大量的",
            "很多；大量的"
          ]
        ],
        [
          "determiner",
          [
            "大量的；很大程度的"
          ]
        ]
      ]
    },
    {
      "id": "quantity",
      "pos": "pron",
      "meaning": "很多；大量",
      "forms": [
        [
          "pron",
          [
            "多；大量",
            "很多；大量",
            "很大一部分"
          ]
        ]
      ]
    }
  ],
  "must": [
    {
      "id": "function-obligation",
      "pos": "v",
      "meaning": "必须；应当",
      "forms": [
        [
          "v",
          [
            "必须；应当"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s1",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "cloze-s2",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "cloze-s4",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "cloze-s7",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "question-1-prompt",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "p3-s6",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "p3-s7",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "p3-s8",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "p5-s1",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "p5-s2",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "2011-cloze-s16",
          "n/v",
          "必须；必然",
          "must"
        ],
        [
          "2011-p4-s8",
          "n/v",
          "必须；必然",
          "must"
        ]
      ]
    },
    {
      "id": "function-deduction",
      "pos": "v",
      "meaning": "一定；必然（推断）",
      "forms": [],
      "fromNotes": [
        [
          "modal v./n.",
          "必须；必然"
        ]
      ]
    }
  ],
  "nearly": [
    {
      "id": "approximation",
      "pos": "adv",
      "meaning": "将近；几乎",
      "forms": [
        [
          "adv",
          [
            "将近",
            "将近；几乎",
            "将近；接近"
          ]
        ]
      ]
    }
  ],
  "need": [
    {
      "id": "need",
      "pos": "v",
      "meaning": "需要",
      "forms": [
        [
          "v",
          [
            "需要"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s5",
          "n/v",
          "需要；必需",
          "need"
        ],
        [
          "2011-p5-s18",
          "n/v",
          "需要；必需",
          "need"
        ]
      ]
    },
    {
      "id": "need",
      "pos": "n",
      "meaning": "需求",
      "forms": [
        [
          "n",
          [
            "需求"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s7",
          "n/v",
          "需要；必需",
          "need"
        ]
      ]
    }
  ],
  "no": [
    {
      "id": "negative-quantity",
      "pos": "det",
      "meaning": "没有任何",
      "forms": [
        [
          "det",
          [
            "没有",
            "没有任何",
            "没有；无"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s6",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "2001-p1-s5",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "question-201036-option-C",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "2012-p1-s6",
          "adv/det",
          "没有；不",
          "no"
        ],
        [
          "2012-p4-s4",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "2012-p5-s20",
          "adv/det",
          "没有任何；不",
          "no"
        ]
      ]
    }
  ],
  "none": [
    {
      "id": "negative-pronoun",
      "pos": "pron",
      "meaning": "一个也没有",
      "forms": [
        [
          "pron",
          [
            "一个也没有",
            "没有一位设计师"
          ]
        ]
      ]
    }
  ],
  "not": [
    {
      "id": "negation",
      "pos": "adv",
      "meaning": "不；否定",
      "forms": [
        [
          "adv",
          [
            "不",
            "不；否定"
          ]
        ],
        [
          "negator",
          [
            "不"
          ]
        ]
      ]
    }
  ],
  "of": [
    {
      "id": "function-content",
      "pos": "prep",
      "meaning": "……的；关于（内容或对象）",
      "forms": [
        [
          "prep",
          [
            "……的；关于（内容或对象）",
            "不了解的对象接口"
          ]
        ]
      ]
    },
    {
      "id": "function-lack",
      "pos": "prep",
      "meaning": "引出缺少或未达到的对象",
      "forms": [
        [
          "prep",
          [
            "引出缺少或未达到的对象",
            "引出被剥夺的资源"
          ]
        ]
      ]
    }
  ],
  "off": [
    {
      "id": "nearby",
      "pos": "prep",
      "meaning": "在……旁边",
      "forms": [],
      "fromNotes": [
        [
          "adv/prep",
          "从……上离开；离开；在……旁边"
        ]
      ]
    }
  ],
  "on": [
    {
      "id": "time",
      "pos": "prep",
      "meaning": "在（某日）",
      "forms": [
        [
          "prep",
          [
            "在（某日）"
          ]
        ]
      ]
    }
  ],
  "once": [
    {
      "id": "frequency",
      "pos": "adv",
      "meaning": "一次",
      "forms": [
        [
          "adv",
          [
            "一次",
            "再一次（once again）"
          ]
        ]
      ]
    }
  ],
  "other": [
    {
      "id": "additional",
      "pos": "det",
      "meaning": "其他的",
      "forms": [
        [
          "adj/det",
          [
            "其他的"
          ]
        ],
        [
          "det",
          [
            "其他的"
          ]
        ],
        [
          "determiner",
          [
            "其他的"
          ]
        ]
      ]
    },
    {
      "id": "additional",
      "pos": "pron",
      "meaning": "其他的人或事物",
      "forms": [
        [
          "pron",
          [
            "其他的人或事物",
            "其他的；其他人"
          ]
        ]
      ]
    }
  ],
  "otherwise": [
    {
      "id": "condition-alternative",
      "pos": "adv",
      "meaning": "否则；在另一种条件下",
      "forms": [
        [
          "adv",
          [
            "否则",
            "否则；在另一种条件下"
          ]
        ],
        [
          "adv",
          [
            "否则；在另一种条件下"
          ]
        ],
        [
          "adv",
          [
            "否则；若不如此"
          ]
        ]
      ]
    }
  ],
  "over": [
    {
      "id": "exceed",
      "pos": "prep",
      "meaning": "超过",
      "forms": [
        [
          "prep",
          [
            "超过",
            "超过（选项所设的比较关系）"
          ]
        ],
        [
          "prep",
          [
            "超过"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s12",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ]
      ]
    },
    {
      "id": "topic",
      "pos": "prep",
      "meaning": "对……；关于",
      "forms": [
        [
          "prep",
          [
            "对……"
          ]
        ],
        [
          "prep",
          [
            "对……；关于"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s7",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ],
        [
          "p5-s1",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ],
        [
          "question-201137-prompt",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ],
        [
          "2011-p5-s1",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ]
      ]
    },
    {
      "id": "above",
      "pos": "prep",
      "meaning": "越过；在……上方",
      "forms": [
        [
          "prep",
          [
            "越过；在……上方"
          ]
        ]
      ]
    },
    {
      "id": "duration",
      "pos": "prep",
      "meaning": "在……期间",
      "forms": [
        [
          "prep",
          [
            "在……期间"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s9",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ],
        [
          "2010-p3-s1",
          "adv/prep",
          "在……期间",
          "over"
        ],
        [
          "2011-p5-s21",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ],
        [
          "2012-p5-s11",
          "adv/prep",
          "随着……推移",
          "over"
        ]
      ]
    },
    {
      "id": "finished",
      "pos": "adv",
      "meaning": "结束的",
      "forms": [
        [
          "adj/adv",
          [
            "结束的"
          ]
        ],
        [
          "adv",
          [
            "结束的"
          ]
        ],
        [
          "adv/prep",
          [
            "结束"
          ]
        ],
        [
          "表语性副词",
          [
            "结束的"
          ]
        ]
      ]
    }
  ],
  "perhaps": [
    {
      "id": "possibility",
      "pos": "adv",
      "meaning": "或许；可能",
      "forms": [
        [
          "adv",
          [
            "或许",
            "或许；可能"
          ]
        ]
      ]
    }
  ],
  "since": [
    {
      "id": "time-start",
      "pos": "prep",
      "meaning": "自……以来",
      "forms": [
        [
          "prep",
          [
            "自……以来"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s5",
          "prep",
          "自从；因为；从……以后",
          "since"
        ],
        [
          "2010-p1-s7",
          "prep",
          "自从；因为；从……以后",
          "since"
        ],
        [
          "2012-p4-s16",
          "prep",
          "自从；因为；从……以后",
          "since"
        ]
      ]
    },
    {
      "id": "time-start",
      "pos": "conj",
      "meaning": "自从……以来",
      "forms": [
        [
          "conj",
          [
            "自从……以来"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s13",
          "prep",
          "自从；因为；从……以后",
          "since"
        ]
      ]
    },
    {
      "id": "time-start",
      "pos": "adv",
      "meaning": "此后；自那时以来",
      "forms": [
        [
          "adv",
          [
            "此后；自那时以来"
          ]
        ]
      ],
      "sources": [
        [
          "question-2-option-D",
          "prep",
          "自从；因为；从……以后",
          "since"
        ]
      ]
    }
  ],
  "so": [
    {
      "id": "function-degree",
      "pos": "adv",
      "meaning": "如此；这么（程度）",
      "forms": [
        [
          "adv",
          [
            "如此；这么（程度）"
          ]
        ]
      ],
      "sources": [
        [
          "p2-s22",
          "adv",
          "如此",
          "so"
        ]
      ]
    }
  ],
  "some": [
    {
      "id": "quantity",
      "pos": "det",
      "meaning": "一些",
      "forms": [
        [
          "det",
          [
            "一些"
          ]
        ]
      ],
      "sources": [
        [
          "p2-s13",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-29-prompt",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-200122-option-B",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2001-p2-s15",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-201023-option-D",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2010-p4-s5",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-201038-prompt",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2011-cloze-s15",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-201118-prompt",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2011-p4-s13",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2011-p5-s16",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2012-p1-s3",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2012-p1-s10",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-201229-option-D",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2012-p4-s5",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ]
      ]
    },
    {
      "id": "quantity",
      "pos": "pron",
      "meaning": "一些；一部分",
      "forms": [
        [
          "pron",
          [
            "一些隐私权倡导者",
            "一些；一部分"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s7",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "p5-s14",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2010-p1-s14",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "question-201136-option-C",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2011-p5-s21",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ],
        [
          "2012-cloze-s12",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ]
      ]
    },
    {
      "id": "approximation",
      "pos": "adv",
      "meaning": "大约",
      "forms": [
        [
          "adv",
          [
            "大约"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s6",
          "adv/det/pron",
          "一些；其中一部分",
          "some"
        ]
      ]
    }
  ],
  "still": [
    {
      "id": "continuation",
      "pos": "adv",
      "meaning": "仍然；还",
      "forms": [
        [
          "adv",
          [
            "仍然",
            "仍然；还"
          ]
        ]
      ]
    }
  ],
  "such": [
    {
      "id": "demonstrative",
      "pos": "det",
      "meaning": "这样的",
      "forms": [
        [
          "det",
          [
            "如此的；这样的",
            "这样的",
            "这类的"
          ]
        ]
      ]
    },
    {
      "id": "demonstrative",
      "pos": "pron",
      "meaning": "这样的；如此的",
      "forms": [
        [
          "pron",
          [
            "这样的；如此的"
          ]
        ]
      ]
    }
  ],
  "these": [
    {
      "id": "demonstrative",
      "pos": "det",
      "meaning": "这些",
      "forms": [
        [
          "det",
          [
            "这些",
            "这些（回指前句计算机）"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p3-s2",
          "det/pron",
          "这些",
          "these"
        ],
        [
          "2011-cloze-s9",
          "det/pron",
          "这些",
          "these"
        ],
        [
          "2012-p4-s8",
          "det/pron",
          "这些",
          "these"
        ],
        [
          "2012-p4-s15",
          "det/pron",
          "这些",
          "these"
        ],
        [
          "2012-p4-s17",
          "det/pron",
          "这些",
          "these"
        ],
        [
          "2012-p5-s17",
          "det/pron",
          "这些",
          "these"
        ]
      ]
    },
    {
      "id": "demonstrative",
      "pos": "pron",
      "meaning": "这些",
      "forms": [
        [
          "pron",
          [
            "这些",
            "这些（前述人才）"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s9",
          "det/pron",
          "这些制裁",
          "these"
        ]
      ]
    }
  ],
  "those": [
    {
      "id": "demonstrative",
      "pos": "det",
      "meaning": "那些",
      "forms": [
        [
          "det",
          [
            "那些"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s8",
          "det/pron",
          "那些；那些人/事",
          "those"
        ],
        [
          "2001-p1-s8",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ],
        [
          "question-201017-prompt",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ],
        [
          "2011-cloze-s7",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ],
        [
          "2011-p4-s4",
          "det/pron",
          "前述长期问题",
          "those"
        ]
      ]
    },
    {
      "id": "demonstrative",
      "pos": "pron",
      "meaning": "那些人或事物",
      "forms": [
        [
          "pron",
          [
            "那些人",
            "那些人或事物",
            "那些公寓"
          ]
        ]
      ],
      "sources": [
        [
          "question-201232-prompt",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ],
        [
          "2012-p4-s13",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ]
      ]
    }
  ],
  "though": [
    {
      "id": "concession",
      "pos": "conj",
      "meaning": "虽然；尽管",
      "forms": [
        [
          "conj",
          [
            "不过；尽管",
            "尽管",
            "虽然；尽管"
          ]
        ]
      ]
    }
  ],
  "through": [
    {
      "id": "means",
      "pos": "prep",
      "meaning": "通过；借助",
      "forms": [
        [
          "prep",
          [
            "通过",
            "通过；借助"
          ]
        ],
        [
          "prep",
          [
            "通过；借助"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s12",
          "prep",
          "通过；穿过",
          "through"
        ]
      ]
    },
    {
      "id": "duration",
      "pos": "prep",
      "meaning": "贯穿整个时期",
      "forms": [
        [
          "prep",
          [
            "贯穿整个时期",
            "贯穿；度过"
          ]
        ],
        [
          "prep",
          [
            "贯穿整个时期"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s15",
          "prep",
          "通过；穿过",
          "through"
        ]
      ]
    },
    {
      "id": "traversal",
      "pos": "prep",
      "meaning": "穿过；遍及",
      "forms": [
        [
          "prep",
          [
            "穿过；遍及"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p2-s25",
          "prep",
          "遍及；穿过",
          "through"
        ]
      ]
    }
  ],
  "to": [
    {
      "id": "function-direction",
      "pos": "prep",
      "meaning": "向；到（方向或终点）",
      "forms": [
        [
          "prep",
          [
            "向；到（方向或终点）",
            "导致（引出结果）"
          ]
        ]
      ]
    },
    {
      "id": "function-relation",
      "pos": "prep",
      "meaning": "对；对于（关联对象）",
      "forms": [
        [
          "prep",
          [
            "仅限的范围",
            "对；对于（关联对象）",
            "引出归属类别"
          ]
        ]
      ]
    }
  ],
  "too": [
    {
      "id": "excess",
      "pos": "adv",
      "meaning": "过于；太",
      "forms": [
        [
          "adv",
          [
            "过于",
            "过于；太"
          ]
        ]
      ]
    }
  ],
  "under": [
    {
      "id": "condition",
      "pos": "prep",
      "meaning": "处于……状态",
      "forms": [
        [
          "prep",
          [
            "在……之中",
            "处于……状态"
          ]
        ]
      ]
    }
  ],
  "until": [
    {
      "id": "time-limit",
      "pos": "prep/conj",
      "meaning": "直到……为止",
      "forms": [
        [
          "prep",
          [
            "直到",
            "直到……为止"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s15",
          "conj/prep",
          "直到……为止",
          "until"
        ],
        [
          "2012-p2-s6",
          "conj/prep",
          "直到……为止",
          "until"
        ],
        [
          "2012-p2-s10",
          "conj/prep",
          "直到……为止",
          "until"
        ]
      ]
    }
  ],
  "very": [
    {
      "id": "degree",
      "pos": "adv",
      "meaning": "非常；很；极其",
      "forms": [
        [
          "adv",
          [
            "很",
            "很；极其",
            "极其",
            "非常；很；极其"
          ]
        ]
      ]
    }
  ],
  "what": [
    {
      "id": "function-interrogative",
      "pos": "pron",
      "meaning": "什么（询问内容）",
      "forms": [
        [
          "pron",
          [
            "什么（询问内容）"
          ]
        ]
      ],
      "sources": [
        [
          "question-13-prompt",
          "det/pron",
          "什么；所……的事",
          "what"
        ],
        [
          "p3-s1",
          "pron",
          "什么；所追求的目标",
          "what"
        ],
        [
          "2011-p4-s7",
          "det/pron",
          "什么；……的事情",
          "what"
        ]
      ]
    },
    {
      "id": "function-fused-relative",
      "pos": "pron",
      "meaning": "所……的事物或内容",
      "forms": [
        [
          "pron",
          [
            "所……的事物或内容"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s9",
          "pron",
          "什么；……的内容",
          "what"
        ],
        [
          "2010-p1-s16",
          "det/pron",
          "什么；……的事情",
          "what"
        ],
        [
          "question-201117-prompt",
          "det/pron",
          "什么；……的事情",
          "what"
        ],
        [
          "2012-p5-s1",
          "det/pron",
          "什么；……的事情",
          "what"
        ],
        [
          "2012-p5-s14",
          "det/pron",
          "什么；……的事情",
          "what"
        ]
      ]
    },
    {
      "id": "interrogative-determiner",
      "pos": "det",
      "meaning": "什么；哪些（疑问限定）",
      "forms": [
        [
          "det",
          [
            "什么；哪些（疑问限定）"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s13",
          "det/pron",
          "什么；……的事情",
          "what"
        ]
      ]
    }
  ],
  "where": [
    {
      "id": "relative-place",
      "pos": "adv",
      "meaning": "在……的地方或情形中",
      "forms": [
        [
          "adv",
          [
            "在……的地方或情形中",
            "在这一健康愿景中",
            "在这些领域里",
            "在那里（关系连接）"
          ]
        ]
      ]
    },
    {
      "id": "interrogative",
      "pos": "adv",
      "meaning": "哪里；往哪里",
      "forms": [
        [
          "adv",
          [
            "哪里；往哪里",
            "往哪里"
          ]
        ]
      ]
    }
  ],
  "whether": [
    {
      "id": "interrogative-content",
      "pos": "conj",
      "meaning": "是否",
      "forms": [
        [
          "conj",
          [
            "是否"
          ]
        ]
      ]
    },
    {
      "id": "concessive-alternatives",
      "pos": "conj",
      "meaning": "不论（whether ... or ...）",
      "forms": [],
      "fromNotes": [
        [
          "conj.",
          "是否；不论"
        ]
      ]
    }
  ],
  "which": [
    {
      "id": "function-relative",
      "pos": "pron",
      "meaning": "关系代词，回指先行词或前述情况",
      "forms": [
        [
          "pron",
          [
            "关系代词，回指先行词或前述情况"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2010-cloze-s11",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2010-cloze-s12",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "question-201018-prompt",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2011-cloze-s11",
          "det/pron",
          "哪一个；该……",
          "which"
        ],
        [
          "question-201115-prompt",
          "det/pron",
          "哪一个；该……",
          "which"
        ],
        [
          "2011-p5-s17",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2012-p5-s9",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2012-p5-s14",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2012-p5-s22",
          "pron",
          "哪一个；关系代词",
          "which"
        ],
        [
          "2012-p5-s24",
          "pron",
          "哪一个；关系代词",
          "which"
        ]
      ]
    },
    {
      "id": "function-interrogative-pronoun",
      "pos": "pron",
      "meaning": "哪一个；哪一项（疑问）",
      "forms": [
        [
          "pron",
          [
            "哪一个；哪一项（疑问）"
          ]
        ]
      ],
      "sources": [
        [
          "question-201023-prompt",
          "pron",
          "哪一个；关系代词",
          "which"
        ]
      ]
    },
    {
      "id": "function-interrogative-determiner",
      "pos": "det",
      "meaning": "哪个；哪些（疑问限定）",
      "forms": [
        [
          "det",
          [
            "哪个；哪些（疑问限定）"
          ]
        ]
      ],
      "sources": [
        [
          "question-201109-prompt",
          "det/pron",
          "哪一个；该……",
          "which"
        ]
      ]
    }
  ],
  "while": [
    {
      "id": "contrast",
      "pos": "conj",
      "meaning": "而；然而",
      "forms": [
        [
          "conj",
          [
            "而；然而"
          ]
        ],
        [
          "conj/n/v",
          [
            "而；然而"
          ]
        ]
      ]
    }
  ],
  "who": [
    {
      "id": "relative",
      "pos": "pron",
      "meaning": "关系代词，回指人或拟人主体",
      "forms": [
        [
          "pron",
          [
            "他们（关系指代）",
            "他（关系指代）",
            "他（密斯）",
            "关系代词，回指人或拟人主体",
            "关系代词，指公司",
            "关系代词，指反对者",
            "关系代词，指学生",
            "指人的关系代词",
            "指兰斯利",
            "该出版商（关系指代）",
            "这些专家"
          ]
        ],
        [
          "关系代词",
          [
            "回指心理学家",
            "符合条件的那些人",
            "这位专家"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s4",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2010-p1-s12",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2010-p1-s17",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2010-p1-s19",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2012-cloze-s2",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2012-cloze-s7",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2012-p5-s1",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2012-p5-s16",
          "pron",
          "谁；……的人",
          "who"
        ]
      ]
    },
    {
      "id": "interrogative",
      "pos": "pron",
      "meaning": "谁",
      "forms": [
        [
          "pron",
          [
            "谁"
          ]
        ]
      ]
    }
  ],
  "whose": [
    {
      "id": "relative-possessive",
      "pos": "det",
      "meaning": "其……的",
      "forms": [
        [
          "det",
          [
            "他的",
            "其……的"
          ]
        ],
        [
          "pron",
          [
            "其……的；……的",
            "这些用户的"
          ]
        ],
        [
          "关系限定词",
          [
            "其……的"
          ]
        ]
      ]
    }
  ],
  "why": [
    {
      "id": "relative-reason",
      "pos": "adv",
      "meaning": "……的原因；所以",
      "forms": [
        [
          "adv",
          [
            "……的原因；所以"
          ]
        ],
        [
          "关系副词",
          [
            "……的原因；所以"
          ]
        ]
      ]
    },
    {
      "id": "interrogative-reason",
      "pos": "adv",
      "meaning": "为什么",
      "forms": [],
      "fromNotes": [
        [
          "conj./adv.",
          "为什么；……的原因"
        ]
      ]
    }
  ],
  "will": [
    {
      "id": "function-future",
      "pos": "v",
      "meaning": "将；会（将来或设想结果）",
      "forms": [
        [
          "v",
          [
            "将；会（将来或设想结果）"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s8",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-cloze-s2",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-cloze-s4",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "2001-cloze-s6",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "question-200103-prompt",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "question-200112-prompt",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "question-200116-prompt",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s6",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s8",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s9",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s10",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s15",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2001-p2-s24",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "2011-p4-s1",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2011-p4-s5",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "question-201139-option-B",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "question-201139-option-C",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "question-201139-option-D",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2011-p5-s6",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "2011-p5-s20",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2011-p5-s21",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p3-s9",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p3-s22",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p4-s2",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p4-s6",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p4-s13",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "2012-p4-s17",
          "n/v",
          "将；意愿；随意",
          "will"
        ],
        [
          "2012-p4-s18",
          "n/v",
          "将；意愿；随意",
          "will"
        ]
      ]
    }
  ],
  "with": [
    {
      "id": "function-accompany",
      "pos": "prep",
      "meaning": "与……一起；伴随着",
      "forms": [
        [
          "prep",
          [
            "与……一起；伴随着",
            "在……一方"
          ]
        ]
      ]
    },
    {
      "id": "function-relation",
      "pos": "prep",
      "meaning": "对；与……有关",
      "forms": [
        [
          "prep",
          [
            "与……等同",
            "与……（竞争）",
            "同意……",
            "对；与……有关"
          ]
        ]
      ]
    },
    {
      "id": "manner",
      "pos": "prep",
      "meaning": "以……态度",
      "forms": [
        [
          "prep",
          [
            "以……态度",
            "以怀疑的态度"
          ]
        ]
      ]
    },
    {
      "id": "responsibility",
      "pos": "prep",
      "meaning": "由；交由",
      "forms": [
        [
          "prep",
          [
            "由；交由"
          ]
        ]
      ]
    }
  ],
  "within": [
    {
      "id": "inside",
      "pos": "prep",
      "meaning": "在……之内",
      "forms": [
        [
          "prep",
          [
            "在……之内",
            "在……内部"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s14",
          "adv/prep",
          "在……内部；在……范围内",
          "within"
        ],
        [
          "2001-p2-s9",
          "adv/prep",
          "在……之内",
          "within"
        ],
        [
          "2010-p1-s12",
          "adv/prep",
          "在……之内",
          "within"
        ],
        [
          "2011-p4-s7",
          "adv/prep",
          "在……之内",
          "within"
        ],
        [
          "2011-p4-s11",
          "adv/prep",
          "在……之内",
          "within"
        ],
        [
          "2012-p4-s14",
          "adv/prep",
          "在……之内",
          "within"
        ]
      ]
    }
  ],
  "without": [
    {
      "id": "absence",
      "pos": "prep",
      "meaning": "没有；不借助",
      "forms": [
        [
          "prep",
          [
            "没有；不借助",
            "没有；不经",
            "没有；未",
            "没有；未曾"
          ]
        ]
      ]
    }
  ],
  "would": [
    {
      "id": "past-habit",
      "pos": "v",
      "meaning": "过去常常会",
      "forms": [
        [
          "v",
          [
            "过去常常会"
          ]
        ]
      ]
    }
  ],
  "yet": [
    {
      "id": "contrast",
      "pos": "conj",
      "meaning": "然而",
      "forms": [
        [
          "conj",
          [
            "然而"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s6",
          "adv/conj",
          "然而；还；尚",
          "yet"
        ],
        [
          "2011-p5-s6",
          "adv/conj",
          "然而；还；尚",
          "yet"
        ]
      ]
    },
    {
      "id": "not-yet",
      "pos": "adv",
      "meaning": "尚；还",
      "forms": [
        [
          "adv",
          [
            "仍；以后还可能",
            "尚；还"
          ]
        ]
      ]
    }
  ]
};

export const reviewedAnnotationsFunction: ReviewedSenseAnnotations = {
  "a": [
    {
      "reason": "同句 a 同时表示不定指和每单位计量；原记录保留两种用法，不归入单一新义项。",
      "forms": [
        [
          "art.",
          [
            "一次；每一",
            "一；每一"
          ]
        ]
      ]
    }
  ],
  "about": [
    {
      "reason": "默认词卡合写话题介词与约数副词；这两种已分别保留，概要不再另算一个词义。",
      "forms": [
        [
          "adv/prep",
          [
            "关于；大约"
          ]
        ]
      ]
    }
  ],
  "after": [
    {
      "reason": "after all、one ... after another 是固定表达；保留完整出处和搭配解释，不将整体译义当作 after 的新义。",
      "sources": [
        [
          "2001-p2-s7",
          "adv/conj/prep",
          "在……之后",
          "after"
        ],
        [
          "p1-s17",
          "prep",
          "一个接一个地（结构组成）",
          "after"
        ]
      ]
    },
    {
      "reason": "概要未区分介词补语、时间从句及单独副词；保留原说明，具体语境按已核对词性归类。",
      "forms": [
        [
          "adv/conj/prep",
          [
            "在……之后"
          ]
        ]
      ]
    }
  ],
  "against": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "反对；针对；以……为背景"
          ]
        ]
      ]
    }
  ],
  "all": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "仍然（all the same）",
            "加强让步连接的成分"
          ]
        ]
      ]
    },
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/det",
          [
            "完全；所有"
          ]
        ],
        [
          "adv/det/pron",
          [
            "全部；所有"
          ]
        ]
      ]
    }
  ],
  "another": [
    {
      "reason": "原记录同时标 det./pron.；限定词与代词的共同意思仍保留，词性未定的概要作为用法补充，不另成第三个词义。",
      "forms": [
        [
          "det/pron",
          [
            "另一个；又一个"
          ]
        ]
      ]
    }
  ],
  "any": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "2012-p5-s2",
          "adv/det/pron",
          "任何一个",
          "any"
        ]
      ]
    },
    {
      "reason": "旧概要合写任意限定与代指功能，无法由孤立释义确认词性；具体原句已有精确限定词归类。",
      "forms": [
        [
          "adv/det/pron",
          [
            "任何一个"
          ]
        ]
      ]
    }
  ],
  "around": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "在……各处；围绕"
          ]
        ]
      ]
    }
  ],
  "as": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv",
          [
            "和……一样"
          ]
        ],
        [
          "adv/conj",
          [
            "和……一样",
            "构成数量比较的as…as"
          ]
        ],
        [
          "adv/conj/prep",
          [
            "作为；被视为；像"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "多达（搭配中）",
            "早至（搭配中）",
            "迟至（搭配中）"
          ]
        ],
        [
          "adv/conj/prep",
          [
            "除……之外还（as well as）"
          ]
        ],
        [
          "conj",
          [
            "恰好（搭配中）"
          ]
        ],
        [
          "prep",
          [
            "作为；由此",
            "因此（as a result）"
          ]
        ],
        [
          "从句连接结构成分",
          [
            "仿佛（与though连用）"
          ]
        ],
        [
          "固定副词短语成分",
          [
            "也（与well连用）"
          ]
        ],
        [
          "复合连接结构成分",
          [
            "以及（搭配中）"
          ]
        ],
        [
          "目的结构组成部分",
          [
            "引出目的"
          ]
        ]
      ]
    },
    {
      "reason": "as well as、much as、as usual、as such 的整体解释保留在原始搭配说明，不按组成词另造同义小条。",
      "sources": [
        [
          "question-1-option-B",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-2-option-B",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "question-25-option-B",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "p5-s15",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ],
        [
          "2012-p5-s22",
          "adv/conj/prep",
          "作为；被视为；像",
          "as"
        ]
      ]
    },
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj",
          [
            "当……时；因为"
          ]
        ]
      ]
    }
  ],
  "at": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "在；朝向",
            "在；针对；以某种方式"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "以……方式",
            "在；至少（搭配中）",
            "处于（习语成分）",
            "构成最低限度表达"
          ]
        ]
      ]
    }
  ],
  "be": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/v",
          [
            "是；处于某种状态；被……"
          ]
        ],
        [
          "aux",
          [
            "构成进行时或被动"
          ]
        ],
        [
          "aux/v",
          [
            "be为系动词；are组成进行时",
            "is表存在；was构成被动",
            "was组成将来表达；be是成为",
            "处于；构成被动",
            "存在；构成被动",
            "存在；进行时助动词",
            "是；处于；构成被动",
            "是；存在；构成被动",
            "是；构成被动",
            "是；被……",
            "是；进行标记",
            "系动词或时态语态助动词",
            "职责标记；是",
            "被动标记；是",
            "被；处于",
            "进行标记；处于"
          ]
        ],
        [
          "v",
          [
            "存在；处于",
            "是；处于某种状态；构成被动或完成结构",
            "是；处于某种状态；被……",
            "是；构成时态或被动",
            "有；处于",
            "符合；存在"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "aux",
          [
            "构成职责预期结构"
          ]
        ],
        [
          "aux/v",
          [
            "计划；按安排将"
          ]
        ],
        [
          "v",
          [
            "假定要",
            "构成强调句",
            "经历（搭配中）"
          ]
        ]
      ]
    }
  ],
  "because": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "因为（because of）",
            "因为；由于"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "介词结构成分",
          [
            "因为"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "复合介词组成部分",
          [
            "因为"
          ]
        ]
      ]
    }
  ],
  "beyond": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "超出；在……之外",
            "超出；超过"
          ]
        ]
      ]
    }
  ],
  "both": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "question-201036-option-A",
          "并列限定成分",
          "两者都",
          "both"
        ],
        [
          "2010-p5-s1",
          "det/pron",
          "两者都",
          "both"
        ],
        [
          "2011-p3-s17",
          "correlative marker",
          "既……又……",
          "both"
        ],
        [
          "2012-p4-s9",
          "det/pron",
          "两者都；双方",
          "both"
        ]
      ]
    },
    {
      "reason": "限定双方与代指两者的总括，不额外造一个混合词性义项。",
      "forms": [
        [
          "det/pron",
          [
            "两者都；双方"
          ]
        ]
      ]
    },
    {
      "reason": "旧词卡未分限定词与代词；具体用法在真实出处保留，不把概要当第三种意思。",
      "forms": [
        [
          "det/pron",
          [
            "两者都"
          ]
        ]
      ]
    },
    {
      "reason": "“两位”是原句所指，不是 both 新词义；未明词性概要作为来源说明保留。",
      "forms": [
        [
          "det/pron",
          [
            "两位都"
          ]
        ]
      ]
    }
  ],
  "but": [
    {
      "reason": "此处属于 not only ... but (also) ... 的递进结构；整体的“而且”保留在搭配说明，不与普通转折义混成一项。",
      "sources": [
        [
          "2011-p2-s12",
          "conj",
          "而且",
          "but"
        ]
      ]
    },
    {
      "reason": "not simply/only ... but ... 与 all but ... 是成组结构；保留递进或排除用法，不计入普通转折 but 的频次。",
      "sources": [
        [
          "2001-p1-s9",
          "conj/prep",
          "但是；然而",
          "but"
        ],
        [
          "2010-p1-s2",
          "conj/prep",
          "但是；然而",
          "but"
        ],
        [
          "2012-p2-s3",
          "conj/prep",
          "但是；然而",
          "but"
        ]
      ]
    }
  ],
  "by": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "借助；由",
            "由；通过",
            "相隔；由",
            "被；由；通过",
            "通过；由；到某时间；按某幅度"
          ]
        ]
      ]
    }
  ],
  "can": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "v",
          [
            "可以；可能",
            "能够；可能",
            "能；有可能"
          ]
        ]
      ]
    }
  ],
  "do": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/aux",
          [
            "做；经营"
          ]
        ],
        [
          "aux",
          [
            "过去时助动词；做"
          ]
        ],
        [
          "aux/v",
          [
            "做；构成否定或疑问",
            "做；经营",
            "否定助动词；做",
            "构成否定；做"
          ]
        ]
      ]
    }
  ],
  "down": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "2001-cloze-s5",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ],
        [
          "2001-p2-s26",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ],
        [
          "2010-cloze-s6",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ],
        [
          "question-201208-option-D",
          "adj/adv/prep",
          "向下；处于较低状态",
          "down"
        ]
      ]
    },
    {
      "reason": "方向副词与处于较低水平的表语用法合写；真实来源已分别归类，概要不另造混合义。",
      "forms": [
        [
          "adj/adv/prep",
          [
            "向下；处于较低状态"
          ]
        ]
      ]
    }
  ],
  "each": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "2011-cloze-s11",
          "det/pron",
          "每一个",
          "each"
        ],
        [
          "2012-cloze-s15",
          "det/pron",
          "每一个",
          "each"
        ],
        [
          "question-201237-option-A",
          "det/pron",
          "每一个",
          "each"
        ]
      ]
    },
    {
      "reason": "each 的限定和独立代指用法共用每一之义；旧未分词性的概要单独保留为说明。",
      "forms": [
        [
          "det/pron",
          [
            "每一个"
          ]
        ]
      ]
    },
    {
      "reason": "“人”来自所指对象，不是新的词义；旧未分词性概要归入原始用法说明。",
      "forms": [
        [
          "det/pron",
          [
            "每个人"
          ]
        ]
      ]
    }
  ],
  "even": [
    {
      "reason": "让步结构中 even 起强调作用，原句“即使/连那时也”等组合译法保留在用法说明，不另造每个搭配的单词义。",
      "sources": [
        [
          "p3-s2",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "2010-p4-s9",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "question-201038-prompt",
          "adv",
          "甚至；即使",
          "even"
        ],
        [
          "2011-p1-s17",
          "adv",
          "即使（even if）",
          "even"
        ]
      ]
    },
    {
      "reason": "旧概要同时给出单词强调义与 even if/though 让步组合译法；实际强调义和组合说明分别保留。",
      "forms": [
        [
          "adv",
          [
            "甚至；即使"
          ]
        ]
      ]
    }
  ],
  "every": [
    {
      "reason": "每一个与每隔属于数量/频率语境；已核对实际限定词出处，不额外建立混合词性总括义项。",
      "forms": [
        [
          "det/pron",
          [
            "每一个；每隔"
          ]
        ]
      ]
    }
  ],
  "few": [
    {
      "reason": "同一稀少概念的限定、代指和表语总括，具体已知词性继续保留，概要不再作为新义项。",
      "forms": [
        [
          "adj/det/pron",
          [
            "几乎没有；很少"
          ]
        ]
      ]
    }
  ],
  "for": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj/prep",
          [
            "为了；对于；持续；因为",
            "因为；对于；持续"
          ]
        ],
        [
          "prep",
          [
            "关于；导致……的",
            "关于；持续",
            "因为；为了",
            "对于；为了；……的原因",
            "引出范围、对象或比例",
            "表示首次时间；引出寻找对象"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "就此而言；说起来"
          ]
        ]
      ]
    }
  ],
  "have": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "aux/v",
          [
            "完成时助动词；有",
            "完成标记；拥有",
            "完成标记；有",
            "已经；有",
            "拥有；完成时助动词",
            "构成完成时；拥有",
            "标记完成时；具有"
          ]
        ],
        [
          "v",
          [
            "拥有；使……处于某状态",
            "拥有；完成时助动词"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "v",
          [
            "尚待（搭配中）",
            "有胆量；竟敢"
          ]
        ]
      ]
    }
  ],
  "he": [
    {
      "reason": "原卷将 will be 疑似误排为 will he；保留原文字形疑点，不把错误字形另造为代词义项。",
      "sources": [
        [
          "2001-p2-s9",
          "原卷异常字形",
          "疑似误排，见用法",
          "he"
        ]
      ]
    }
  ],
  "her": [
    {
      "reason": "默认词卡合写物主限定词与宾格代词；两种真实语法角色保留，概要不算第三个词义。",
      "forms": [
        [
          "pron",
          [
            "她的；她"
          ]
        ]
      ]
    }
  ],
  "how": [
    {
      "reason": "默认总括同时列程度与方式；两种已分别归类，不以合写概要生成额外词义。",
      "forms": [
        [
          "adv/conj",
          [
            "多么；怎样"
          ]
        ]
      ]
    }
  ],
  "i": [
    {
      "reason": "G.I. 中字母 I 属于缩写，不是代词 I 的一个词义；原文与缩写解释仍可查看。",
      "forms": [
        [
          "abbreviation part",
          [
            "G. I.缩写中的字母"
          ]
        ]
      ]
    }
  ],
  "if": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "conj",
          [
            "如果；即使（even if）"
          ]
        ]
      ]
    }
  ],
  "in": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "在……中；在……方面；以……形式",
            "在……中；在……方面；以……方式"
          ]
        ],
        [
          "prep",
          [
            "在……中；以……方式",
            "在……中；以……状态",
            "在……中；在……时间内",
            "在……内；在……方面",
            "在……方面；在……群体中",
            "在……时；在……方面",
            "在结合中；对",
            "在；进入",
            "涉及；在……中"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "particle",
          [
            "表示加入的小品词"
          ]
        ],
        [
          "prep",
          [
            "在……面前",
            "处于……掌管之下",
            "构成递进表达"
          ]
        ]
      ]
    }
  ],
  "into": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "纳入"
          ]
        ]
      ]
    }
  ],
  "it": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "pron",
          [
            "习语形式主语；那个战后时期",
            "它；强调结构成分",
            "它；形式主语",
            "它；结构占位词"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "pron",
          [
            "make it习语组成",
            "stick it out中的习语宾语"
          ]
        ]
      ]
    },
    {
      "reason": "IT 是信息技术缩写，保留字母大小写和来源，不能作为代词 it 的新义项。",
      "forms": [
        [
          "abbreviation",
          [
            "信息技术"
          ]
        ]
      ]
    }
  ],
  "just": [
    {
      "reason": "这里是祈使或解释中的语气加强，保留具体用法，不与刚刚的时间义或仅仅的范围义混合。",
      "forms": [
        [
          "adv",
          [
            "只要；且再",
            "实在；只是"
          ]
        ]
      ]
    },
    {
      "reason": "默认总括合写强调准确性与限制范围两个作用，分别保留，不增加混合义项。",
      "forms": [
        [
          "adj/adv",
          [
            "正是；仅仅"
          ]
        ]
      ]
    }
  ],
  "least": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/det/n",
          [
            "最少；至少；尤其（not least）"
          ]
        ]
      ]
    }
  ],
  "less": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adj/adv/det",
          [
            "较少；不那么"
          ]
        ],
        [
          "adv/det",
          [
            "更少（的）"
          ]
        ]
      ]
    }
  ],
  "little": [
    {
      "reason": "默认词卡合写少量数量与稍微程度；保留各真实作用，概要仅作补充。",
      "forms": [
        [
          "adj/adv/det",
          [
            "一点；少量；稍微"
          ]
        ]
      ]
    }
  ],
  "many": [
    {
      "reason": "概述数量多的限定与独立代指两种角色；真实词性已分别归类，不额外显示混合行。",
      "forms": [
        [
          "det/pron",
          [
            "许多；数量多"
          ]
        ]
      ]
    }
  ],
  "may": [
    {
      "reason": "might 在本句还带委婉建议或设想语气；保留原句说明，不仅按旧“可能；可以”概要倒推权限义。",
      "sources": [
        [
          "2001-p2-s16",
          "v",
          "可能；可以",
          "might"
        ],
        [
          "2011-p5-s13",
          "v",
          "可能；可以",
          "might"
        ]
      ]
    },
    {
      "reason": "旧概要未区分可能性和许可，两种真实情态意义都保留；不将概要另作第三义。",
      "forms": [
        [
          "v",
          [
            "可能；可以"
          ]
        ]
      ]
    }
  ],
  "more": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/det",
          [
            "越来越；更多"
          ]
        ],
        [
          "adv/det/pron",
          [
            "更多",
            "更多；更大程度；超过"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "更；另外",
            "超过",
            "超过（more than）"
          ]
        ],
        [
          "比较程度成分",
          [
            "更高；超过（搭配中）"
          ]
        ]
      ]
    }
  ],
  "most": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "2012-p4-s8",
          "adv/det/pron",
          "最；大多数",
          "most"
        ]
      ]
    }
  ],
  "much": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/det/pron",
          [
            "很多；大量",
            "许多；很大程度"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "多（搭配中）"
          ]
        ],
        [
          "adv/det/pron",
          [
            "了不起的东西；特别之处"
          ]
        ]
      ]
    }
  ],
  "must": [
    {
      "reason": "默认概要同时列义务必须和推断必然；真实来源可确认者归入义务，推断义不虚分出处频次。",
      "forms": [
        [
          "n/v",
          [
            "必须；必然"
          ]
        ]
      ]
    }
  ],
  "need": [
    {
      "reason": "动词需要与名词需求的合写概要；两种词性与原始说明均保留，不重复计义。",
      "forms": [
        [
          "n/v",
          [
            "需要；必需"
          ]
        ]
      ]
    }
  ],
  "no": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "p5-s13",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "question-201022-option-A",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "2011-p2-s30",
          "adv",
          "不再（no longer）",
          "no"
        ],
        [
          "2012-p1-s3",
          "adv/det",
          "没有；不",
          "no"
        ],
        [
          "2012-p1-s9",
          "adv/det",
          "没有；不",
          "no"
        ],
        [
          "question-201221-option-C",
          "adv/det",
          "没有；不",
          "no"
        ],
        [
          "2012-p3-s14",
          "adv/det",
          "没有任何；不",
          "no"
        ],
        [
          "2012-p5-s4",
          "adv/det",
          "没有任何；不",
          "no"
        ]
      ]
    },
    {
      "reason": "限定数量的 no 与否定/比较短语中的 no 合写概要；实际用法各自保留，概要不另作词义。",
      "forms": [
        [
          "adv/det",
          [
            "没有任何；不"
          ]
        ]
      ]
    }
  ],
  "not": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "不仅（not only）"
          ]
        ]
      ]
    }
  ],
  "of": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "……中的全部；……的",
            "……中的；……的",
            "……中的；对于",
            "……的；……之中的",
            "……的；从……方面",
            "……的；关于；由……构成",
            "关于；所属类别",
            "因为；……的；与……相应的",
            "大量；……的",
            "引出原因或范围",
            "引出对象或范围",
            "引出整体或金额涉及的商品",
            "引出替代项或所属",
            "引出范围或来源",
            "当然；……的",
            "所属；数量；增幅",
            "所属；销售对象",
            "的；说明内容或范围",
            "表示所属、内容或部分关系"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "从……里面向外",
            "引出所面对对象",
            "构成评注短语",
            "用于think of，表示看待",
            "由于",
            "组成out of date"
          ]
        ],
        [
          "复合介词组成部分",
          [
            "引出范围"
          ]
        ]
      ]
    }
  ],
  "off": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "从……上离开；离开；在……旁边"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "处于某种境况"
          ]
        ],
        [
          "particle",
          [
            "摆脱（shrug off）",
            "离开；前往（go off）",
            "裁撤（cut off）"
          ]
        ]
      ]
    }
  ],
  "on": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "在……上；关于；依据",
            "在……上；关于；处于某状态"
          ]
        ],
        [
          "prep",
          [
            "作为成员；由于（搭配中）",
            "关于；取决于的对象标记",
            "关于；在……上；用于固定表达",
            "在……上；关于",
            "在……平台上；构成动词短语",
            "在；关于（搭配中）",
            "对；依赖于"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "particle",
          [
            "表示施用的小品词"
          ]
        ],
        [
          "prep",
          [
            "所缺少的物资"
          ]
        ],
        [
          "动词短语小品词",
          [
            "加入（搭配中）"
          ]
        ]
      ]
    }
  ],
  "once": [
    {
      "reason": "默认词卡同时概括过去时间副词和条件连词；曾经与一旦保留独立义项，原概要作说明。",
      "forms": [
        [
          "adv/conj",
          [
            "曾经；一旦；从前"
          ]
        ]
      ]
    }
  ],
  "or": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "conj",
          [
            "表示约数"
          ]
        ]
      ]
    }
  ],
  "other": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adj/det/pron",
          [
            "其他的；另一个"
          ]
        ],
        [
          "det/pron",
          [
            "其他人；其他的"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "det",
          [
            "另一个（用于固定时间表达）"
          ]
        ],
        [
          "det/pron",
          [
            "彼此（each other整体）"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "question-1-option-A",
          "adj/det/pron",
          "其他的；另一个",
          "other"
        ],
        [
          "question-200112-option-B",
          "adj/pron",
          "其他的",
          "other"
        ],
        [
          "2001-p1-s11",
          "adj/det/pron",
          "其他的；另一个",
          "other"
        ],
        [
          "2012-cloze-s15",
          "adj/det/pron",
          "其他的；另一个",
          "other"
        ],
        [
          "question-201237-option-A",
          "det/pron",
          "其他人；其他的",
          "other"
        ]
      ]
    }
  ],
  "out": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv",
          [
            "出来；彻底；结果",
            "出来；短语动词小品词"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "不合时宜（out of date）",
            "向外（构成倾吐义）",
            "彻底清除",
            "结果；显露出来"
          ]
        ],
        [
          "particle",
          [
            "构成弄清之义的小品词",
            "用于rule out，表示排除"
          ]
        ]
      ]
    }
  ],
  "over": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/prep",
          [
            "关于；因……；在……上方",
            "随着……推移"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "交出；转交（turn over的一部分）"
          ]
        ],
        [
          "短语动词小品词",
          [
            "接管结构成分"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "2001-p2-s15",
          "adv/prep",
          "关于；因……；在……上方",
          "over"
        ]
      ]
    }
  ],
  "rather": [
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "用于rather than，表示而非",
            "而不是",
            "而不是；宁可",
            "而是；而不是",
            "而非"
          ]
        ]
      ]
    },
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv",
          [
            "相当；宁可；而不是"
          ]
        ]
      ]
    }
  ],
  "since": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj",
          [
            "自从；因为"
          ]
        ],
        [
          "prep",
          [
            "自从；因为；从……以后"
          ]
        ]
      ]
    }
  ],
  "so": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/conj",
          [
            "如此；这么；因此"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "也一样",
            "大约",
            "等等"
          ]
        ]
      ]
    }
  ],
  "some": [
    {
      "reason": "数量限定与独立代指合写概要；实际来源已分角色，不额外增加混合词性义项。",
      "forms": [
        [
          "adv/det/pron",
          [
            "一些；其中一部分"
          ]
        ]
      ]
    }
  ],
  "such": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "det",
          [
            "这样的；诸如"
          ]
        ],
        [
          "det/pron",
          [
            "这样的；诸如"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "举例结构成分",
          [
            "例如（与as连用）"
          ]
        ],
        [
          "限定表达",
          [
            "这样的（用于举例结构）"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "sources": [
        [
          "question-200101-option-D",
          "det",
          "这样的",
          "such"
        ]
      ]
    }
  ],
  "than": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj/prep",
          [
            "比；用于比较或rather than结构",
            "比；而不是"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "连接词",
          [
            "除……之外"
          ]
        ]
      ]
    }
  ],
  "that": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj/det/pron",
          [
            "那一；引出限定或命题",
            "那个；引导从句",
            "那种；引出定语"
          ]
        ],
        [
          "conj/pron",
          [
            "从句引导词或关系代词",
            "内容连接词；关系代词",
            "内容连接词；替代抱负的代词",
            "指食物影响；引出教育内容",
            "那个；引导从句"
          ]
        ],
        [
          "pron",
          [
            "那种趋势；引出工具的限定"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "conj",
          [
            "以至于（结果）"
          ]
        ]
      ]
    }
  ],
  "the": [
    {
      "reason": "定冠词与形容词构成一类人的表达，属于既有定指功能的结构用法。",
      "forms": [
        [
          "art.",
          [
            "使形容词指一类人"
          ]
        ]
      ]
    }
  ],
  "these": [
    {
      "reason": "指示限定词与独立代指的合写概要；已知出处分别归类，概要不增加第三项。",
      "forms": [
        [
          "det/pron",
          [
            "这些"
          ]
        ]
      ]
    },
    {
      "reason": "制裁是原句所指对象，不是这些之外的新词义；保留所指说明。",
      "forms": [
        [
          "det/pron",
          [
            "这些制裁"
          ]
        ]
      ]
    }
  ],
  "this": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "det/pron",
          [
            "这；这一点",
            "这；这个",
            "这；这一",
            "这个；这件事"
          ]
        ]
      ]
    }
  ],
  "those": [
    {
      "reason": "同句those分别限定初批疫苗及代指有疾病的人，保留两种用法的来源记录，不强选一种词性。",
      "sources": [
        [
          "2010-cloze-s12",
          "det/pron",
          "那些；那些人/事物",
          "those"
        ]
      ]
    },
    {
      "reason": "指示限定与代指人的总括；实际语法位置可核对者已分开归类。",
      "forms": [
        [
          "det/pron",
          [
            "那些；那些人/事物"
          ]
        ]
      ]
    },
    {
      "reason": "概述限定和代指角色，语义与已有指示义一致；原来源继续保留。",
      "forms": [
        [
          "det/pron",
          [
            "那些；那些人/事"
          ]
        ]
      ]
    },
    {
      "reason": "长期问题是回指内容，不是 those 的新词义；保留具体回指说明。",
      "forms": [
        [
          "det/pron",
          [
            "前述长期问题"
          ]
        ]
      ]
    }
  ],
  "though": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/conj",
          [
            "仿佛；尽管"
          ]
        ]
      ]
    }
  ],
  "through": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "通过；穿过",
            "遍及；穿过"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "历经（搭配中）"
          ]
        ]
      ]
    }
  ],
  "till": [
    {
      "reason": "默认时间界限概要没有确定补语类型；真实 until 连词义与 Till 人名分别保留，概要不另造第三项。",
      "forms": [
        [
          "conj/prep",
          [
            "直到；直至"
          ]
        ]
      ]
    }
  ],
  "to": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "不定式标记；到",
            "不定式标记；去向",
            "不定式标记；向",
            "不定式标记；对",
            "与；到",
            "为了；引出必要行为；关于",
            "介词或不定式标记",
            "介词连接；不定式标记",
            "到；引出报道内容；给",
            "向；到；不定式标记",
            "向；对……有利",
            "对……；去往；为了",
            "对；根据结构的组成",
            "导致；引出倾向行为",
            "引假定动作；到",
            "引出活动或权利内容",
            "引出结果内容；通向",
            "引出行为；引出遵从对象",
            "引出计划动作；给",
            "引方法内容或行为",
            "根据的组成；不定式标记",
            "根据（according to）；不定式标记",
            "给；关于",
            "给；关联到；引出动作",
            "给；引出目的动作",
            "达到上限；引出此前动作",
            "通向；不定式标记"
          ]
        ],
        [
          "不定式标记／介词",
          [
            "to believe引动作；to the引原因",
            "to be为不定式；according to表来源"
          ]
        ],
        [
          "介词/不定式标记",
          [
            "引出求助对象或用途"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "判处",
            "归于（搭配成分）"
          ]
        ],
        [
          "semi-modal construction component",
          [
            "用于used to，表示过去曾经"
          ]
        ]
      ]
    }
  ],
  "under": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "在……之下；处于……状态"
          ]
        ]
      ]
    }
  ],
  "until": [
    {
      "reason": "旧概要不能区分介词与连词补语；已核对真实介词原句归类，孤立选项说明保留。",
      "forms": [
        [
          "conj/prep",
          [
            "直到……为止"
          ]
        ]
      ]
    }
  ],
  "up": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv",
          [
            "向上；加快；完成"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "adv",
          [
            "构成创造、编造义的小品词",
            "构成紧密关联表达",
            "达到某上限",
            "面对；遭遇（up against）"
          ]
        ],
        [
          "particle",
          [
            "开始担任（take up）",
            "构成take up",
            "构成“放弃”义的短语动词成分",
            "构成升级义",
            "组成line up排队"
          ]
        ],
        [
          "phrasal-verb particle",
          [
            "短语动词小品词"
          ]
        ],
        [
          "动词短语小品词",
          [
            "醒来（搭配中）"
          ]
        ]
      ]
    }
  ],
  "very": [
    {
      "reason": "这段旧其他义项是 very 程度副词与强调形容词的教学辨析，完整保留为说明，不能把整段另造一个副词新义。",
      "forms": [
        [
          "adv",
          [
            "非常，如very safe很安全；副词义不能覆盖that very anonymity中的形容词强调义。"
          ]
        ]
      ]
    },
    {
      "reason": "at the very least 是强调最低限度的整体表达；保留搭配说明，不将旧“非常”的通用释义机械计入程度频次。",
      "sources": [
        [
          "2012-p4-s7",
          "adv",
          "非常；很；极其",
          "very"
        ]
      ]
    }
  ],
  "what": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "det/pron",
          [
            "什么；……的事情",
            "什么；所……的事"
          ]
        ],
        [
          "pron",
          [
            "什么；……的内容",
            "什么；所……的内容",
            "什么；所追求的目标"
          ]
        ]
      ]
    }
  ],
  "whatever": [
    {
      "reason": "默认词卡概括让步关系，真实“无论什么”与疑问强调已各自保留；混合角色概要作补充。",
      "forms": [
        [
          "conj/pron",
          [
            "无论什么；不管怎样"
          ]
        ]
      ]
    }
  ],
  "when": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/conj",
          [
            "何时；当……时"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "conj",
          [
            "当谈到；说起"
          ]
        ]
      ]
    }
  ],
  "where": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "adv/conj",
          [
            "哪里；……的地方；在哪里"
          ]
        ]
      ]
    }
  ],
  "whether": [
    {
      "reason": "间接疑问“是否”与 whether ... or ... 的“不论”让步作用不同；真实六个出处均为是否，默认合写原文保留为说明，不向让步义分摊次数。",
      "forms": [
        [
          "conj",
          [
            "是否；不论"
          ]
        ]
      ]
    }
  ],
  "which": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "det/pron",
          [
            "哪一个；该……"
          ]
        ],
        [
          "pron",
          [
            "哪一个；关系代词",
            "哪一个；引出关系"
          ]
        ]
      ]
    }
  ],
  "while": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "conj/n",
          [
            "一段时间；而"
          ]
        ]
      ]
    }
  ],
  "who": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "pron",
          [
            "谁；……的人"
          ]
        ]
      ]
    },
    {
      "reason": "本句 who 用于 it is ... who ... 强调结构，保持完整结构解释，不误并成疑问词“谁”。",
      "sources": [
        [
          "p5-s3",
          "pron",
          "谁；……的人",
          "who"
        ],
        [
          "2012-p5-s20",
          "pron",
          "谁；……的人",
          "who"
        ]
      ]
    }
  ],
  "why": [
    {
      "reason": "默认总括合写询问原因与关系副词指引结果；真实 that is why 原句归关系副词，原默认说明仍保留，不作额外混合义。",
      "forms": [
        [
          "adv/conj",
          [
            "为什么；……的原因"
          ]
        ]
      ]
    }
  ],
  "will": [
    {
      "reason": "would suggest / would like 表示委婉表达；保留结构说明，与名词意愿或普通将来叙述区分。",
      "sources": [
        [
          "2011-p5-s8",
          "v",
          "将；意愿；随意",
          "would"
        ],
        [
          "question-201231-prompt",
          "v",
          "用于would like表达愿望",
          "would"
        ]
      ]
    },
    {
      "reason": "旧概要混写将来助动词与意愿/随意搭配；真实将来和名词意愿保留，概要不成为第三个词义。",
      "forms": [
        [
          "n/v",
          [
            "将；意愿；随意"
          ]
        ]
      ]
    },
    {
      "reason": "过去视角中的 would 原词卡沿用多义概要；具体句意可确认者按真实来源归类，其余保留说明。",
      "forms": [
        [
          "v",
          [
            "将；意愿；随意"
          ]
        ]
      ]
    }
  ],
  "with": [
    {
      "reason": "旧记录在一条释义中合写不同词义或语法作用；保留原始用法与全部出处，不另造一个混合义项，也不把次数分摊到多个义项。",
      "forms": [
        [
          "prep",
          [
            "依靠；与……结合",
            "关于；存在于",
            "和；带有；随着；用",
            "对……；与……意见相左",
            "对……；在……人群中",
            "带有；以；和……相比"
          ]
        ]
      ]
    },
    {
      "reason": "这里说明固定表达的整体作用；作为原句用法补充保留，不能把整个词组的意思另造为组成词的新义项。",
      "forms": [
        [
          "prep",
          [
            "引出构想内容",
            "用于例外范围表达"
          ]
        ]
      ]
    }
  ],
  "within": [
    {
      "reason": "介词与无补语副词的范围概要；真实介词出处已归类，孤立选项保留未定词性说明。",
      "forms": [
        [
          "adv/prep",
          [
            "在……之内"
          ]
        ]
      ]
    },
    {
      "reason": "同一以内概念的未定词性概要，不把内部/范围换词另立新义项。",
      "forms": [
        [
          "adv/prep",
          [
            "在……内部；在……范围内"
          ]
        ]
      ]
    }
  ],
  "would": [
    {
      "reason": "真实 would wake ... and stare ... 表过去习惯，区别于过去将来与委婉意愿；原默认沿用 will 的混合概要保留说明，不把“随意”误作此处独立动词义。",
      "forms": [
        [
          "v",
          [
            "将；意愿；随意"
          ]
        ]
      ]
    }
  ],
  "yet": [
    {
      "reason": "默认词卡合写转折连词与时间副词；两种真实意义保留，不增加混合总括项。",
      "forms": [
        [
          "adv/conj",
          [
            "然而；还；尚"
          ]
        ]
      ]
    }
  ]
};
