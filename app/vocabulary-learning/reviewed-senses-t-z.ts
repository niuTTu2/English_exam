import type { ReviewedSenseTable, ReviewedSenseAnnotations } from "./reviewed-sense-types";

/** T–Z and numeric lemmas: exact editorial links reviewed against every corpus source.
 * Frozen source text/glosses are retained; mixed old glosses use source-specific links.
 * Every multirow term is also recorded in the release audit ledger. */
export const reviewedSensesTZ: ReviewedSenseTable = {
  "1890s": [
    {
      "id": "decade-1890",
      "pos": "年代表达",
      "meaning": "19世纪90年代",
      "forms": [
        [
          "time expression",
          [
            "19世纪90年代"
          ]
        ],
        [
          "年代表达",
          [
            "1890—1899年这一年代"
          ]
        ]
      ]
    }
  ],
  "1930s": [
    {
      "id": "decade-1930",
      "pos": "年代表达",
      "meaning": "20世纪30年代",
      "forms": [
        [
          "time expression",
          [
            "20世纪30年代"
          ]
        ],
        [
          "年代表达",
          [
            "1930—1939年这一年代"
          ]
        ]
      ]
    }
  ],
  "1940s": [
    {
      "id": "decade-1940",
      "pos": "年代表达",
      "meaning": "20世纪40年代",
      "forms": [
        [
          "年代表达",
          [
            "20世纪40年代"
          ]
        ],
        [
          "time expression",
          [
            "20世纪40年代"
          ]
        ],
        [
          "年代表达",
          [
            "1940—1949年这一年代"
          ]
        ]
      ]
    }
  ],
  "1960s": [
    {
      "id": "decade-1960",
      "pos": "年代表达",
      "meaning": "20世纪60年代",
      "forms": [
        [
          "年代表达",
          [
            "20世纪60年代",
            "1960—1969年这一年代"
          ]
        ]
      ]
    }
  ],
  "table": [
    {
      "id": "data-table",
      "pos": "n",
      "meaning": "表格；统计图",
      "forms": [
        [
          "n.",
          [
            "表格；统计图"
          ]
        ],
        [
          "",
          [
            "数据表格"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "桌子；一览表。"
        ]
      ]
    },
    {
      "id": "furniture",
      "pos": "n",
      "meaning": "桌子",
      "forms": [
        [
          "n.",
          [
            "桌子"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "桌子；一览表。"
        ]
      ]
    },
    {
      "id": "submit-motion",
      "pos": "v",
      "meaning": "提交讨论（英式议会用法）",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "提交讨论（英式议会用法）；搁置讨论（美式用法），须看地域语境。"
        ]
      ]
    },
    {
      "id": "postpone-motion",
      "pos": "v",
      "meaning": "搁置讨论（美式用法）",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "提交讨论（英式议会用法）；搁置讨论（美式用法），须看地域语境。"
        ]
      ]
    }
  ],
  "take": [
    {
      "id": "granted",
      "pos": "v",
      "meaning": "视为（宾语补足结构中的动词）",
      "forms": [
        [
          "动名词taking",
          [
            "视为（固定结构中的动词）"
          ]
        ],
        [
          "v.",
          [
            "视为寻常（take for granted）"
          ]
        ]
      ]
    },
    {
      "id": "takeover",
      "pos": "v",
      "meaning": "接手（与over连用）",
      "forms": [
        [
          "v.（过去分词taken）",
          [
            "接管（与over连用）"
          ]
        ]
      ]
    },
    {
      "id": "exam",
      "pos": "v",
      "meaning": "参加（考试）",
      "forms": [
        [
          "v.（动名词）",
          [
            "参加（考试）"
          ]
        ]
      ]
    },
    {
      "id": "meal",
      "pos": "v",
      "meaning": "吃；用（餐）",
      "forms": [
        [
          "v.（第三人称单数）",
          [
            "吃；用（餐）"
          ]
        ]
      ]
    },
    {
      "id": "adopt",
      "pos": "v",
      "meaning": "采取",
      "forms": [
        [
          "v.",
          [
            "采取"
          ]
        ]
      ]
    },
    {
      "id": "occupy",
      "pos": "v",
      "meaning": "占用",
      "forms": [
        [
          "v.",
          [
            "占用（与up构成短语）"
          ]
        ]
      ]
    },
    {
      "id": "example",
      "pos": "v",
      "meaning": "取作例示",
      "forms": [
        [
          "v.",
          [
            "以……为例"
          ]
        ]
      ]
    },
    {
      "id": "accept-orders",
      "pos": "v",
      "meaning": "接受（订单）",
      "forms": [],
      "sources": [
        [
          "2010-cloze-s10",
          "v.-ing/gerund",
          "把……视为；接管"
        ]
      ]
    },
    {
      "id": "construction",
      "pos": "v",
      "meaning": "固定搭配中的动词成分",
      "forms": [
        [
          "v.",
          [
            "利用搭配中的动作词"
          ]
        ],
        [
          "v.",
          [
            "进行（搭配中）"
          ]
        ],
        [
          "v.（过去分词taken）",
          [
            "纳入（take into consideration）"
          ]
        ],
        [
          "v.",
          [
            "构成造成损害的习语"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s15",
          "v./n.",
          "把……视为；接管"
        ],
        [
          "2001-p2-s27",
          "v./n.",
          "把……视为；接管"
        ]
      ]
    },
    {
      "id": "post",
      "pos": "v",
      "meaning": "担任；承担",
      "forms": [
        [
          "v.（过去式took）",
          [
            "开始担任（take up）"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s9",
          "v./n.",
          "把……视为；接管"
        ]
      ]
    }
  ],
  "talk": [
    {
      "id": "talk",
      "pos": "n",
      "meaning": "谈话；交谈",
      "forms": [
        [
          "n.（书名组成）",
          [
            "谈话（书名 Divorce Talk 的组成部分）"
          ]
        ],
        [
          "n.（书名成分）",
          [
            "谈话；交谈"
          ]
        ],
        [
          "n.（复数）",
          [
            "会谈；讨论"
          ]
        ],
        [
          "n.",
          [
            "谈话；交谈"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "交谈；谈话"
        ]
      ]
    },
    {
      "id": "talk",
      "pos": "v",
      "meaning": "交谈；说话",
      "forms": [
        [
          "v.（动名词形式）",
          [
            "交谈；说话"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p2-s3",
          "v./n.",
          "交谈；谈话"
        ],
        [
          "2010-p2-s10",
          "v./n.",
          "交谈；谈话"
        ],
        [
          "2010-p2-s17",
          "v./n.",
          "交谈；谈话"
        ],
        [
          "2010-p2-s19",
          "v./n.",
          "交谈；谈话"
        ],
        [
          "question-201028-option-A",
          "v./n.",
          "交谈；谈话"
        ],
        [
          "2011-p4-s3",
          "v./n.",
          "交谈；谈话"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "交谈；谈话"
        ]
      ]
    }
  ],
  "tangible": [
    {
      "id": "tangible",
      "pos": "adj",
      "meaning": "具体可感的；明确可见的",
      "forms": [
        [
          "adj.",
          [
            "可以具体指出的"
          ]
        ],
        [
          "adj.",
          [
            "具体可感的；明确可见的"
          ]
        ]
      ]
    }
  ],
  "teach": [
    {
      "id": "teach",
      "pos": "v",
      "meaning": "教学；教给",
      "forms": [
        [
          "v.-ed（被动分词）",
          [
            "教给；教育"
          ]
        ],
        [
          "v.（过去分词taught）",
          [
            "教学；任教"
          ]
        ]
      ]
    }
  ],
  "technological": [
    {
      "id": "technology",
      "pos": "adj",
      "meaning": "技术的",
      "forms": [
        [
          "adj.",
          [
            "技术的",
            "技术方面的；技术发展的"
          ]
        ]
      ]
    }
  ],
  "tell": [
    {
      "id": "story",
      "pos": "v",
      "meaning": "讲述",
      "forms": [
        [
          "v.（动名词）",
          [
            "讲述"
          ]
        ],
        [
          "v.",
          [
            "讲述；告诉"
          ]
        ]
      ]
    },
    {
      "id": "effect",
      "pos": "v",
      "meaning": "产生影响；显出后果",
      "forms": [
        [
          "v.（不定式）",
          [
            "产生影响；显出后果"
          ]
        ]
      ]
    },
    {
      "id": "instruct",
      "pos": "v",
      "meaning": "告知；吩咐",
      "forms": [
        [
          "v.（过去分词）",
          [
            "告知；吩咐"
          ]
        ]
      ]
    }
  ],
  "tend": [
    {
      "id": "tendency",
      "pos": "v",
      "meaning": "往往；倾向于",
      "forms": [
        [
          "v.",
          [
            "往往；倾向于"
          ]
        ],
        [
          "v.（tend 的过去分词）",
          [
            "往往；倾向于"
          ]
        ],
        [
          "v.（第三人称单数）",
          [
            "往往；倾向于"
          ]
        ],
        [
          "v.（过去式）",
          [
            "倾向于",
            "往往"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s7",
          "v.（第三人称单数）",
          "倾向于；照料"
        ]
      ]
    }
  ],
  "term": [
    {
      "id": "word",
      "pos": "n",
      "meaning": "术语；措辞",
      "forms": [
        [
          "n.",
          [
            "购物者常用的术语",
            "术语；说法",
            "术语；措辞"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
        ],
        [
          "n. / v.",
          "学期；期限；条件； 把……称为。本文为购物者使用的术语。"
        ],
        [
          "n.",
          "方面；术语；条件"
        ]
      ]
    },
    {
      "id": "conditions",
      "pos": "n",
      "meaning": "条件；条款",
      "forms": [
        [
          "n.（常用复数）",
          [
            "条件；条款"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
        ],
        [
          "n. / v.",
          "学期；期限；条件； 把……称为。本文为购物者使用的术语。"
        ],
        [
          "n.",
          "方面；术语；条件"
        ]
      ]
    },
    {
      "id": "mathematics",
      "pos": "n",
      "meaning": "项（数学）",
      "forms": [
        [
          "n.",
          [
            "项（数学）"
          ]
        ]
      ]
    },
    {
      "id": "period",
      "pos": "n",
      "meaning": "期限；任期；学期",
      "forms": [
        [
          "n.",
          [
            "审期；开庭期",
            "期限；任期；学期"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
        ],
        [
          "n. / v.",
          "学期；期限；条件； 把……称为。本文为购物者使用的术语。"
        ]
      ]
    },
    {
      "id": "relationship",
      "pos": "n",
      "meaning": "关系；相处状态",
      "forms": [
        [
          "n.（固定表达）",
          [
            "关系；相处状态"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
        ]
      ]
    },
    {
      "id": "name",
      "pos": "v",
      "meaning": "称作；把……叫作",
      "forms": [
        [
          "v.",
          [
            "称作；把……叫作"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n. / v.",
          "学期；期限；条件； 把……称为。本文为购物者使用的术语。"
        ]
      ]
    },
    {
      "id": "aspect",
      "pos": "n",
      "meaning": "方面（in terms of）",
      "forms": [],
      "sources": [
        [
          "2001-p1-s8",
          "n.（term 的复数）",
          "方面；术语；条件"
        ]
      ],
      "fromNotes": [
        [
          "",
          "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
        ],
        [
          "n.",
          "方面；术语；条件"
        ]
      ]
    }
  ],
  "test": [
    {
      "id": "examination",
      "pos": "n",
      "meaning": "考试；测试",
      "forms": [
        [
          "n.",
          [
            "考试；测试"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s7",
          "n./v.",
          "考试；测试"
        ],
        [
          "p4-s8",
          "n./v.",
          "考试；测试"
        ],
        [
          "question-25-option-D",
          "n./v.",
          "考试；测试"
        ],
        [
          "2012-p1-s10",
          "n.",
          "考试；测试"
        ],
        [
          "question-201223-option-B",
          "n.",
          "考试；测试"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "考试；测试"
        ]
      ]
    },
    {
      "id": "medical-test",
      "pos": "n",
      "meaning": "检测；检验",
      "forms": [
        [
          "n.",
          [
            "检测；检验"
          ]
        ]
      ]
    },
    {
      "id": "test-verb",
      "pos": "v",
      "meaning": "检测；测试",
      "forms": [],
      "sources": [
        [
          "2010-cloze-s8",
          "v./n.（test 的本句变形）",
          "检测；测试"
        ],
        [
          "question-201012-prompt",
          "v./n.（test 的本句变形）",
          "检测；测试"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "考试；测试"
        ]
      ]
    }
  ],
  "textile": [
    {
      "id": "fabric",
      "pos": "n",
      "meaning": "纺织品",
      "forms": [
        [
          "n.（复数）",
          [
            "纺织品"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./adj.",
          "纺织品；纺织业的"
        ]
      ]
    },
    {
      "id": "textile-adjective",
      "pos": "adj",
      "meaning": "纺织业的",
      "forms": [],
      "fromNotes": [
        [
          "n./adj.",
          "纺织品；纺织业的"
        ]
      ]
    }
  ],
  "that's": [
    {
      "id": "that-is",
      "pos": "pron/v",
      "meaning": "那是",
      "forms": [
        [
          "pron. + linking v.",
          [
            "那是",
            "that is的缩写：那是"
          ]
        ]
      ]
    }
  ],
  "theory": [
    {
      "id": "theory",
      "pos": "n",
      "meaning": "理论；学说",
      "forms": [
        [
          "n.",
          [
            "理论"
          ]
        ],
        [
          "n.",
          [
            "理论；学说"
          ]
        ]
      ]
    }
  ],
  "thing": [
    {
      "id": "affair",
      "pos": "n",
      "meaning": "事情；情况",
      "forms": [
        [
          "n.（复数）",
          [
            "情况；形势",
            "事情；情况"
          ]
        ],
        [
          "n.",
          [
            "事情；情况"
          ]
        ]
      ]
    }
  ],
  "think": [
    {
      "id": "opinion",
      "pos": "v",
      "meaning": "认为；看作",
      "forms": [
        [
          "v.（过去分词）",
          [
            "认为；看作"
          ]
        ],
        [
          "v.",
          [
            "认为；看待",
            "认为；看作",
            "认为"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s16",
          "v.",
          "思考；认为"
        ],
        [
          "2011-p5-s13",
          "v.",
          "思考；认为"
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "思考；认为"
        ]
      ]
    },
    {
      "id": "reflection",
      "pos": "v",
      "meaning": "思考",
      "forms": [
        [
          "v.-ing（思考）",
          [
            "思考"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "思考；认为"
        ]
      ]
    },
    {
      "id": "thoughtful",
      "pos": "adj",
      "meaning": "会思考的；有思想的",
      "forms": [
        [
          "adj.（分词作定语）",
          [
            "会思考的；有思想的"
          ]
        ]
      ]
    },
    {
      "id": "imagine",
      "pos": "v",
      "meaning": "想到；预料",
      "forms": [
        [
          "v.（过去分词）",
          [
            "想到；预料"
          ]
        ]
      ]
    }
  ],
  "thinking": [
    {
      "id": "thinking",
      "pos": "n",
      "meaning": "想法；思路",
      "forms": [
        [
          "n.",
          [
            "想法；思路"
          ]
        ]
      ]
    }
  ],
  "third": [
    {
      "id": "ordinal-third",
      "pos": "num",
      "meaning": "第三的",
      "forms": [
        [
          "ordinal number/adj.",
          [
            "第三；第三次浪潮的"
          ]
        ],
        [
          "ordinal number（定语）",
          [
            "第三的"
          ]
        ]
      ]
    }
  ],
  "thought": [
    {
      "id": "idea",
      "pos": "n",
      "meaning": "思想；想法",
      "forms": [
        [
          "n.（复数）",
          [
            "思想；想法；think 的过去式"
          ]
        ]
      ]
    },
    {
      "id": "regard",
      "pos": "v",
      "meaning": "认为；视为",
      "forms": [
        [
          "v.-ed（被动分词）",
          [
            "认为；视为"
          ]
        ]
      ]
    }
  ],
  "threaten": [
    {
      "id": "risk",
      "pos": "v",
      "meaning": "有可能造成坏结果；威胁",
      "forms": [
        [
          "v.",
          [
            "有可能造成坏结果；威胁"
          ]
        ]
      ]
    },
    {
      "id": "threat",
      "pos": "v",
      "meaning": "威胁；扬言",
      "forms": [
        [
          "v.（过去式）",
          [
            "威胁；扬言"
          ]
        ]
      ]
    }
  ],
  "thrive": [
    {
      "id": "flourishing",
      "pos": "adj",
      "meaning": "兴旺；繁荣",
      "forms": [
        [
          "adj.（现在分词作定语）",
          [
            "兴旺；蓬勃发展"
          ]
        ],
        [
          "adj.（分词定语）",
          [
            "兴旺；繁荣"
          ]
        ]
      ]
    },
    {
      "id": "flourish-verb",
      "pos": "v",
      "meaning": "兴旺；蓬勃发展",
      "forms": [
        [
          "v.",
          [
            "兴旺；蓬勃发展"
          ]
        ]
      ]
    }
  ],
  "tide": [
    {
      "id": "brand",
      "pos": "n",
      "meaning": "汰渍",
      "forms": [
        [
          "n.（专名）",
          [
            "汰渍"
          ]
        ],
        [
          "专名",
          [
            "汰渍"
          ]
        ]
      ]
    }
  ],
  "tighten": [
    {
      "id": "tightening",
      "pos": "n",
      "meaning": "收紧",
      "forms": [
        [
          "n.（动词名词化）",
          [
            "收紧"
          ]
        ],
        [
          "n.（名词化）",
          [
            "收紧"
          ]
        ]
      ]
    },
    {
      "id": "tighten",
      "pos": "v",
      "meaning": "收紧；加强",
      "forms": [
        [
          "v.",
          [
            "收紧；加强"
          ]
        ]
      ]
    }
  ],
  "time": [
    {
      "id": "period",
      "pos": "n",
      "meaning": "时期；时代",
      "forms": [
        [
          "n.（times）",
          [
            "时期"
          ]
        ],
        [
          "n.",
          [
            "时期；时代",
            "时期；时候"
          ]
        ],
        [
          "n.（复数，倍数）",
          [
            "时期；日子"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p4-s13",
          "n.（复数，倍数）",
          "倍；时间"
        ],
        [
          "2012-p4-s17",
          "n.（复数，倍数）",
          "倍；时间"
        ],
        [
          "question-201240-prompt",
          "n.（复数，倍数）",
          "倍；时间"
        ]
      ]
    },
    {
      "id": "time",
      "pos": "n",
      "meaning": "时间",
      "forms": [
        [
          "n.（时刻，复数）",
          [
            "时间；时刻"
          ]
        ],
        [
          "n.",
          [
            "时间"
          ]
        ],
        [
          "n. uncountable",
          [
            "时间"
          ]
        ],
        [
          "n.（固定表达成分）",
          [
            "时间"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p4-s16",
          "n./v.",
          "倍；时间"
        ],
        [
          "2012-p5-s11",
          "n./v.",
          "时间；时代演进"
        ]
      ],
      "fromNotes": [
        [
          "n.",
          "经历；时点"
        ],
        [
          "n./v.",
          "倍；时间"
        ]
      ]
    },
    {
      "id": "times",
      "pos": "n",
      "meaning": "次数",
      "forms": [
        [
          "n.",
          [
            "次",
            "次数"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s14",
          "n./v.",
          "倍；时间"
        ]
      ]
    },
    {
      "id": "multiple",
      "pos": "n",
      "meaning": "倍",
      "forms": [
        [
          "n.（复数times）",
          [
            "倍"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "倍；时间"
        ]
      ]
    },
    {
      "id": "experience",
      "pos": "n",
      "meaning": "经历；感受",
      "forms": [],
      "fromNotes": [
        [
          "n.",
          "经历；时点"
        ]
      ]
    }
  ],
  "title": [
    {
      "id": "heading",
      "pos": "n",
      "meaning": "标题；题名",
      "forms": [
        [
          "n.",
          [
            "标题"
          ]
        ]
      ],
      "sources": [
        [
          "question-201225-prompt",
          "n./v.",
          "标题；题名"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "标题；题名"
        ]
      ]
    }
  ],
  "today": [
    {
      "id": "present-day",
      "pos": "adv",
      "meaning": "今天；如今",
      "forms": [
        [
          "adv.",
          [
            "如今；今天",
            "今天；如今"
          ]
        ]
      ],
      "sources": [
        [
          "p2-s9",
          "adv./n.",
          "今天；如今"
        ],
        [
          "p3-s1",
          "adv./n.",
          "今天；如今"
        ],
        [
          "p5-s7",
          "adv./n.",
          "今天；当今"
        ],
        [
          "2001-p2-s1",
          "adv./n.",
          "今天；当今"
        ],
        [
          "2001-p2-s2",
          "adv./n.",
          "今天；当今"
        ],
        [
          "2001-p2-s25",
          "adv./n.",
          "今天；当今"
        ],
        [
          "question-200125-option-D",
          "adv./n.",
          "今天；当今"
        ],
        [
          "2011-p5-s1",
          "adv./n.",
          "今天；当今"
        ],
        [
          "2012-p5-s5",
          "adv./n.",
          "今天；当今"
        ]
      ],
      "fromNotes": [
        [
          "adv./n.",
          "今天；当今"
        ]
      ]
    },
    {
      "id": "present-day",
      "pos": "n",
      "meaning": "如今；当今",
      "forms": [
        [
          "n.",
          [
            "如今；当今"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv./n.",
          "今天；当今"
        ]
      ]
    }
  ],
  "together": [
    {
      "id": "together",
      "pos": "adv",
      "meaning": "一起；共同",
      "forms": [
        [
          "adv.",
          [
            "共同；联合起来",
            "一起；相互连接"
          ]
        ]
      ]
    }
  ],
  "tolerant": [
    {
      "id": "tolerant",
      "pos": "adj",
      "meaning": "宽容的；能容忍的",
      "forms": [
        [
          "adj.",
          [
            "能容忍的",
            "宽容的；包容的"
          ]
        ],
        [
          "adj.",
          [
            "宽容的；能忍受的"
          ]
        ]
      ]
    }
  ],
  "toll": [
    {
      "id": "cost",
      "pos": "n",
      "meaning": "损害；代价",
      "forms": [
        [
          "n.",
          [
            "损害；代价"
          ]
        ]
      ]
    },
    {
      "id": "fee",
      "pos": "n",
      "meaning": "通行费",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "通行费；伤亡人数，如death toll死亡人数； 缓慢鸣钟。"
        ]
      ]
    },
    {
      "id": "casualties",
      "pos": "n",
      "meaning": "伤亡人数",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "通行费；伤亡人数，如death toll死亡人数； 缓慢鸣钟。"
        ]
      ]
    },
    {
      "id": "bell",
      "pos": "v",
      "meaning": "缓慢鸣钟",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "通行费；伤亡人数，如death toll死亡人数； 缓慢鸣钟。"
        ]
      ]
    }
  ],
  "toward": [
    {
      "id": "direction",
      "pos": "prep",
      "meaning": "朝向；趋向",
      "forms": [
        [
          "prep.",
          [
            "朝向",
            "朝着；接近",
            "朝向；趋向",
            "趋向"
          ]
        ]
      ]
    },
    {
      "id": "relation",
      "pos": "prep",
      "meaning": "对于；针对",
      "forms": [
        [
          "prep.",
          [
            "对于",
            "对于；针对"
          ]
        ]
      ]
    },
    {
      "id": "time-near",
      "pos": "prep",
      "meaning": "临近",
      "forms": [
        [
          "prep.（时间）",
          [
            "临近"
          ]
        ]
      ]
    }
  ],
  "towards": [
    {
      "id": "direction",
      "pos": "prep",
      "meaning": "朝着；为了",
      "forms": [
        [
          "prep.",
          [
            "朝着；为了"
          ]
        ]
      ],
      "sources": [
        [
          "question-201137-option-D",
          "prep.",
          "朝向；对于；接近"
        ]
      ]
    },
    {
      "id": "relation",
      "pos": "prep",
      "meaning": "针对；面向",
      "forms": [],
      "sources": [
        [
          "2001-p1-s13",
          "prep.",
          "朝向；对于；接近"
        ]
      ]
    }
  ],
  "trade": [
    {
      "id": "commerce",
      "pos": "n",
      "meaning": "贸易",
      "forms": [
        [
          "n.（专名组成）",
          [
            "贸易"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n. / v. / n.",
          "贸易、交易； 行业、手艺。trade A for B用A换B。"
        ]
      ]
    },
    {
      "id": "commerce-action",
      "pos": "v",
      "meaning": "开展贸易",
      "forms": [
        [
          "v.-ing（定语）",
          [
            "贸易；开展贸易"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n. / v. / n.",
          "贸易、交易； 行业、手艺。trade A for B用A换B。"
        ]
      ]
    },
    {
      "id": "industry",
      "pos": "n",
      "meaning": "行业",
      "forms": [
        [
          "n. used attributively",
          [
            "行业"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n. / v. / n.",
          "贸易、交易； 行业、手艺。trade A for B用A换B。"
        ]
      ]
    },
    {
      "id": "industry-adjective",
      "pos": "adj",
      "meaning": "行业的",
      "forms": [
        [
          "adj.",
          [
            "行业的"
          ]
        ]
      ]
    },
    {
      "id": "upgrade",
      "pos": "v",
      "meaning": "升级更换（与up连用）",
      "forms": [
        [
          "v.",
          [
            "升级更换（与up连用）"
          ]
        ]
      ]
    },
    {
      "id": "craft",
      "pos": "n",
      "meaning": "手艺",
      "forms": [],
      "fromNotes": [
        [
          "n. / v. / n.",
          "贸易、交易； 行业、手艺。trade A for B用A换B。"
        ]
      ]
    },
    {
      "id": "exchange",
      "pos": "v",
      "meaning": "用……换……",
      "forms": [],
      "fromNotes": [
        [
          "n. / v. / n.",
          "贸易、交易； 行业、手艺。trade A for B用A换B。"
        ]
      ]
    }
  ],
  "tradition": [
    {
      "id": "tradition",
      "pos": "n",
      "meaning": "传统；惯例",
      "forms": [
        [
          "n.",
          [
            "传统；惯例",
            "传统"
          ]
        ]
      ]
    }
  ],
  "training": [
    {
      "id": "training",
      "pos": "n",
      "meaning": "训练；专业培养",
      "forms": [
        [
          "n.",
          [
            "训练；专业培养"
          ]
        ]
      ]
    },
    {
      "id": "train-verb",
      "pos": "v",
      "meaning": "训练",
      "forms": [
        [
          "v.",
          [
            "训练"
          ]
        ]
      ]
    }
  ],
  "transient": [
    {
      "id": "transient",
      "pos": "adj",
      "meaning": "短暂的；转瞬即逝的",
      "forms": [
        [
          "adj.",
          [
            "短暂的"
          ]
        ],
        [
          "adj.",
          [
            "短暂的；转瞬即逝的"
          ]
        ]
      ]
    }
  ],
  "translate": [
    {
      "id": "transform",
      "pos": "v",
      "meaning": "转化；表现为",
      "forms": [
        [
          "v.",
          [
            "转化；表现为"
          ]
        ]
      ]
    },
    {
      "id": "rephrase",
      "pos": "v",
      "meaning": "换成明白话解释",
      "forms": [
        [
          "v.-ed（解释状语）",
          [
            "换成明白话解释"
          ]
        ]
      ]
    }
  ],
  "transport": [
    {
      "id": "transportation",
      "pos": "n",
      "meaning": "运输；交通",
      "forms": [
        [
          "n.",
          [
            "运输；交通"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "运输；交通；运送"
        ]
      ]
    },
    {
      "id": "carry",
      "pos": "v",
      "meaning": "运送",
      "forms": [],
      "fromNotes": [
        [
          "n./v.",
          "运输；交通；运送"
        ]
      ]
    }
  ],
  "travel": [
    {
      "id": "journey",
      "pos": "n",
      "meaning": "旅行；行程",
      "forms": [
        [
          "n.（复数）",
          [
            "往返路程"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s7",
          "v./n.",
          "旅行；行程"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "旅行；行程"
        ]
      ]
    },
    {
      "id": "travel",
      "pos": "v",
      "meaning": "出行",
      "forms": [
        [
          "v.-ing（分词）",
          [
            "出行"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "旅行；行程"
        ]
      ]
    }
  ],
  "treat": [
    {
      "id": "experience",
      "pos": "v",
      "meaning": "让……见识；使……领略",
      "forms": [
        [
          "v.（过去分词）",
          [
            "让……见识；使……领略"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "对待；款待；使体验"
        ]
      ]
    },
    {
      "id": "deal-with",
      "pos": "v",
      "meaning": "对待",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "对待；款待；使体验"
        ]
      ]
    },
    {
      "id": "entertain",
      "pos": "v",
      "meaning": "款待",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "对待；款待；使体验"
        ]
      ]
    }
  ],
  "trend": [
    {
      "id": "trend",
      "pos": "n",
      "meaning": "趋势；潮流",
      "forms": [
        [
          "n.",
          [
            "趋势",
            "趋势；潮流"
          ]
        ],
        [
          "n.（复数）",
          [
            "潮流；趋势",
            "趋势；潮流"
          ]
        ]
      ]
    }
  ],
  "trial": [
    {
      "id": "court-trial",
      "pos": "n",
      "meaning": "审判；庭审",
      "forms": [
        [
          "n.",
          [
            "审判；庭审",
            "审判"
          ]
        ]
      ]
    }
  ],
  "trick": [
    {
      "id": "trick",
      "pos": "n",
      "meaning": "花招；策略",
      "forms": [
        [
          "n.",
          [
            "营销花招"
          ]
        ],
        [
          "n.",
          [
            "花招；策略"
          ]
        ]
      ]
    }
  ],
  "troubled": [
    {
      "id": "troubled",
      "pos": "adj",
      "meaning": "陷入困境的",
      "forms": [
        [
          "adj.",
          [
            "陷入困境的"
          ]
        ]
      ]
    },
    {
      "id": "trouble-verb",
      "pos": "v",
      "meaning": "困扰；使忧虑",
      "forms": [
        [
          "v.",
          [
            "困扰；使忧虑"
          ]
        ]
      ]
    }
  ],
  "trust": [
    {
      "id": "trust",
      "pos": "v",
      "meaning": "信任；相信",
      "forms": [
        [
          "v.（动名词形式）",
          [
            "信任"
          ]
        ],
        [
          "v.-ing（现在分词）",
          [
            "信任；相信"
          ]
        ]
      ]
    },
    {
      "id": "trusted",
      "pos": "adj",
      "meaning": "受信任的",
      "forms": [
        [
          "adj.（过去分词作定语）",
          [
            "信任；相信"
          ]
        ]
      ]
    }
  ],
  "try": [
    {
      "id": "attempt",
      "pos": "v",
      "meaning": "努力；尝试",
      "forms": [
        [
          "v.（现在分词）",
          [
            "努力；尝试"
          ]
        ],
        [
          "v.",
          [
            "尝试",
            "设法；努力",
            "努力；尝试"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s1",
          "v./n.",
          "努力；尝试"
        ],
        [
          "cloze-s8",
          "v./n.",
          "努力；尝试"
        ],
        [
          "question-20-prompt",
          "v./n.",
          "努力；尝试"
        ],
        [
          "p5-s15",
          "v.（现在分词）",
          "努力；尝试"
        ],
        [
          "2012-p4-s4",
          "v./n.",
          "努力；尝试"
        ],
        [
          "question-201236-prompt",
          "v./n.",
          "努力；尝试"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "努力；尝试"
        ]
      ]
    },
    {
      "id": "attempt",
      "pos": "n",
      "meaning": "尝试；努力",
      "forms": [],
      "fromNotes": [
        [
          "v./n.",
          "努力；尝试"
        ]
      ]
    }
  ],
  "turn": [
    {
      "id": "change",
      "pos": "n",
      "meaning": "转向；转折",
      "forms": [
        [
          "n./gerund（转向）",
          [
            "转向；转折"
          ]
        ]
      ]
    },
    {
      "id": "turn",
      "pos": "n",
      "meaning": "轮次；轮到的机会",
      "forms": [
        [
          "n.（复数）",
          [
            "轮次"
          ]
        ],
        [
          "n.",
          [
            "轮到的机会"
          ]
        ]
      ]
    },
    {
      "id": "sequence",
      "pos": "n",
      "meaning": "次序中的一环",
      "forms": [
        [
          "n.（固定短语成分）",
          [
            "次序中的一环"
          ]
        ]
      ]
    },
    {
      "id": "seek-help",
      "pos": "v",
      "meaning": "转向（与to连用）",
      "forms": [
        [
          "v.",
          [
            "求助；转向"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "使变成；转向"
        ]
      ]
    },
    {
      "id": "improve",
      "pos": "v",
      "meaning": "转（turn the corner中的动词）",
      "forms": [
        [
          "v.",
          [
            "转；出现转机"
          ]
        ]
      ]
    },
    {
      "id": "change",
      "pos": "v",
      "meaning": "转变",
      "forms": [
        [
          "v.（第三人称单数）",
          [
            "转变"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "使变成；转向"
        ]
      ]
    },
    {
      "id": "construction",
      "pos": "v",
      "meaning": "固定搭配中的动词成分",
      "forms": [
        [
          "v.（第三人称单数）",
          [
            "结果是；结果发现"
          ]
        ],
        [
          "v.",
          [
            "转交；移交（turn over）"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s9",
          "v./n.",
          "彻底颠覆"
        ]
      ]
    }
  ],
  "twentieth": [
    {
      "id": "ordinal-twentieth",
      "pos": "num",
      "meaning": "第二十",
      "forms": [
        [
          "序数词",
          [
            "第20",
            "第二十"
          ]
        ],
        [
          "ordinal numeral",
          [
            "第二十的",
            "第二十（世纪）"
          ]
        ]
      ]
    }
  ],
  "twice": [
    {
      "id": "count-two",
      "pos": "adv",
      "meaning": "两次",
      "forms": [
        [
          "adv.",
          [
            "两次"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv.（两倍；两次）",
          "两倍；两次"
        ]
      ]
    },
    {
      "id": "multiple-two",
      "pos": "adv",
      "meaning": "两倍",
      "forms": [
        [
          "adv.",
          [
            "两倍"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv.（两倍；两次）",
          "两倍；两次"
        ]
      ]
    }
  ],
  "type": [
    {
      "id": "print",
      "pos": "n",
      "meaning": "印刷字体",
      "forms": [
        [
          "n.",
          [
            "印刷字体"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "字体；类型；打字"
        ]
      ]
    },
    {
      "id": "category",
      "pos": "n",
      "meaning": "类型",
      "forms": [],
      "sources": [
        [
          "2010-cloze-s12",
          "n./v.",
          "字体；类型；打字"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "字体；类型；打字"
        ]
      ]
    },
    {
      "id": "typing",
      "pos": "v",
      "meaning": "打字",
      "forms": [],
      "fromNotes": [
        [
          "n./v.",
          "字体；类型；打字"
        ]
      ]
    }
  ],
  "typical": [
    {
      "id": "typical",
      "pos": "adj",
      "meaning": "典型的；有代表性的",
      "forms": [
        [
          "adj.",
          [
            "典型的"
          ]
        ],
        [
          "adj.",
          [
            "典型的；有代表性的"
          ]
        ]
      ]
    }
  ],
  "unattractive": [
    {
      "id": "unattractive",
      "pos": "adj",
      "meaning": "不吸引人的；令人反感的",
      "forms": [
        [
          "adj.",
          [
            "令人反感的；缺乏吸引力的"
          ]
        ],
        [
          "adj.",
          [
            "不吸引人的；令人反感的"
          ]
        ]
      ]
    }
  ],
  "underground": [
    {
      "id": "hidden",
      "pos": "adv",
      "meaning": "隐秘地；在地下",
      "forms": [
        [
          "adv.",
          [
            "转入地下；进入隐蔽状态"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv./adj./n.",
          "地下；隐秘地；地下的"
        ]
      ]
    },
    {
      "id": "underground-adj",
      "pos": "adj",
      "meaning": "地下的",
      "forms": [],
      "fromNotes": [
        [
          "adv./adj./n.",
          "地下；隐秘地；地下的"
        ]
      ]
    },
    {
      "id": "underground-noun",
      "pos": "n",
      "meaning": "地下",
      "forms": [],
      "fromNotes": [
        [
          "adv./adj./n.",
          "地下；隐秘地；地下的"
        ]
      ]
    }
  ],
  "understand": [
    {
      "id": "understand",
      "pos": "v",
      "meaning": "理解；弄清",
      "forms": [
        [
          "v.-ed（被动）",
          [
            "理解；弄清"
          ]
        ],
        [
          "v.",
          [
            "理解"
          ]
        ]
      ]
    }
  ],
  "unfashionable": [
    {
      "id": "unfashionable",
      "pos": "adj",
      "meaning": "不时兴的；不合潮流的",
      "forms": [
        [
          "adj.",
          [
            "不时兴的；不合潮流的",
            "不合时尚的；不受推崇的"
          ]
        ],
        [
          "adj.",
          [
            "（花钱行为）变得不得人心"
          ]
        ]
      ]
    }
  ],
  "unhampered": [
    {
      "id": "unhampered",
      "pos": "adj",
      "meaning": "不受阻碍的；不受束缚的",
      "forms": [
        [
          "adj.（过去分词形式）",
          [
            "不受妨碍的"
          ]
        ],
        [
          "adj.",
          [
            "不受阻碍的；不受束缚的"
          ]
        ]
      ]
    }
  ],
  "unilever": [
    {
      "id": "company-name",
      "pos": "n",
      "meaning": "联合利华",
      "forms": [
        [
          "n.（专名）",
          [
            "联合利华公司"
          ]
        ],
        [
          "专名",
          [
            "联合利华"
          ]
        ]
      ]
    }
  ],
  "unit": [
    {
      "id": "unit",
      "pos": "n",
      "meaning": "单元；单位",
      "forms": [
        [
          "n.（unit 的复数）",
          [
            "单元；单位"
          ]
        ]
      ]
    },
    {
      "id": "housing",
      "pos": "n",
      "meaning": "住宅单元；一套住房",
      "forms": [
        [
          "n.",
          [
            "住宅单元；一套住房"
          ]
        ]
      ]
    }
  ],
  "united": [
    {
      "id": "united-name",
      "pos": "adj",
      "meaning": "联合的（国名组成）",
      "forms": [
        [
          "adj.（国名组成）",
          [
            "联合的",
            "联合的（美国名称组成）"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s2",
          "adj./v.（过去分词；专有国名组成）",
          "联合的；United States国名组成词"
        ],
        [
          "p1-s20",
          "adj./v.（过去分词；专有国名组成）",
          "联合的；United States国名组成词"
        ],
        [
          "p1-s25",
          "adj./v.（过去分词；专有国名组成）",
          "联合的；United States国名组成词"
        ],
        [
          "p4-s1",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "p4-s5",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "p4-s17",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "p5-s12",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2001-p1-s8",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2001-p2-s16",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2001-p2-s17",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "question-200127-prompt",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2010-cloze-s6",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2010-cloze-s7",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2010-p4-s6",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2010-p4-s11",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ],
        [
          "2012-cloze-s9",
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ]
      ],
      "fromNotes": [
        [
          "adj./v.（过去分词；专有国名组成）",
          "联合的（国名组成）"
        ]
      ]
    }
  ],
  "universal": [
    {
      "id": "universal-law",
      "pos": "n",
      "meaning": "普遍规律",
      "forms": [
        [
          "n.",
          [
            "普遍规律"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./adj.",
          "普遍规律；普遍的"
        ]
      ]
    },
    {
      "id": "worldwide",
      "pos": "adj",
      "meaning": "普遍的；全世界的",
      "forms": [
        [
          "adj.",
          [
            "世界范围的；全人类的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./adj.",
          "普遍规律；普遍的"
        ]
      ]
    }
  ],
  "unparalleled": [
    {
      "id": "unparalleled",
      "pos": "adj",
      "meaning": "无与伦比的；空前的",
      "forms": [
        [
          "adj.",
          [
            "无与伦比的；空前的",
            "无可比拟的"
          ]
        ]
      ]
    }
  ],
  "unsubstantiated": [
    {
      "id": "unsubstantiated",
      "pos": "adj",
      "meaning": "未经证实的；缺乏证据的",
      "forms": [
        [
          "adj.",
          [
            "未经证实的"
          ]
        ],
        [
          "adj.",
          [
            "未经证实的；缺乏证据的"
          ]
        ]
      ]
    }
  ],
  "up-to": [
    {
      "id": "compound-component",
      "pos": "复合形容词片段",
      "meaning": "up-to-date的组成部分",
      "forms": [
        [
          "复合形容词片段",
          [
            "up-to-date的前半部分"
          ]
        ],
        [
          "compound fragment",
          [
            "最新的（up-to-date结构组成）"
          ]
        ]
      ]
    }
  ],
  "upon": [
    {
      "id": "relation",
      "pos": "prep",
      "meaning": "对",
      "forms": [
        [
          "prep.",
          [
            "对"
          ]
        ]
      ]
    },
    {
      "id": "dependence",
      "pos": "prep",
      "meaning": "依靠的对象",
      "forms": [
        [
          "prep.",
          [
            "依靠的对象"
          ]
        ]
      ],
      "fromNotes": [
        [
          "prep.",
          "在……之上；依据；取决于"
        ]
      ]
    },
    {
      "id": "above",
      "pos": "prep",
      "meaning": "在……之上",
      "forms": [],
      "fromNotes": [
        [
          "prep.",
          "在……之上；依据；取决于"
        ]
      ]
    }
  ],
  "upset": [
    {
      "id": "upsetting",
      "pos": "adj",
      "meaning": "令人不适的",
      "forms": [
        [
          "adj.（现在分词形容词）",
          [
            "令人不适的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./adj.",
          "使不安；令人不适的"
        ]
      ]
    },
    {
      "id": "upset",
      "pos": "v",
      "meaning": "使不安",
      "forms": [],
      "fromNotes": [
        [
          "v./adj.",
          "使不安；令人不适的"
        ]
      ]
    }
  ],
  "urge": [
    {
      "id": "urge",
      "pos": "v",
      "meaning": "敦促；力劝",
      "forms": [
        [
          "v.",
          [
            "敦促；力劝",
            "敦促；呼吁"
          ]
        ]
      ]
    }
  ],
  "use": [
    {
      "id": "utilize",
      "pos": "v",
      "meaning": "使用；利用",
      "forms": [
        [
          "v.",
          [
            "使用",
            "利用",
            "使用；采用"
          ]
        ],
        [
          "v.（动名词）",
          [
            "使用"
          ]
        ],
        [
          "v.（过去式）",
          [
            "使用"
          ]
        ],
        [
          "v.（过去分词used）",
          [
            "使用"
          ]
        ],
        [
          "v.（第三人称单数）",
          [
            "消耗；使用"
          ]
        ],
        [
          "v.-ed（被动分词）",
          [
            "使用；利用"
          ]
        ],
        [
          "v.-ing（动名词using）",
          [
            "使用；运用"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "v./n.",
          "使用；用途"
        ],
        [
          "2001-p1-s2",
          "v./n.",
          "使用；用途"
        ],
        [
          "2010-p3-s6",
          "v./n.",
          "使用"
        ],
        [
          "2010-p3-s16",
          "v.-ed/adj.（过去式、过去分词或形容词）",
          "使用；运用"
        ],
        [
          "2011-cloze-s5",
          "v./n.",
          "使用；用途"
        ],
        [
          "2011-cloze-s9",
          "v./n.",
          "使用；用途"
        ],
        [
          "question-201111-prompt",
          "v./n.",
          "使用；用途"
        ],
        [
          "2011-p4-s4",
          "v./n.",
          "使用；用途"
        ],
        [
          "2011-p5-s21",
          "v./n.",
          "使用；用途"
        ],
        [
          "2012-translation-s2",
          "v.-ing（动名词using）",
          "使用；运用"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "使用；用途"
        ]
      ]
    },
    {
      "id": "usage",
      "pos": "n",
      "meaning": "使用；使用量",
      "forms": [
        [
          "n.",
          [
            "使用",
            "使用量；消耗"
          ]
        ]
      ]
    },
    {
      "id": "past-habit",
      "pos": "情态结构",
      "meaning": "过去常常；曾经",
      "forms": [
        [
          "过去惯常结构（used to）",
          [
            "过去常常"
          ]
        ],
        [
          "past-habit marker（used）",
          [
            "过去曾经"
          ]
        ],
        [
          "semi-modal construction",
          [
            "曾经"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s1",
          "v.-ed/adj.（过去式、过去分词或形容词）",
          "过去常常；过去曾经（used to）"
        ]
      ]
    },
    {
      "id": "purpose",
      "pos": "n",
      "meaning": "用途",
      "forms": [],
      "fromNotes": [
        [
          "v./n.",
          "使用；用途"
        ]
      ]
    }
  ],
  "user": [
    {
      "id": "user",
      "pos": "n",
      "meaning": "用户；使用者",
      "forms": [
        [
          "n.",
          [
            "用户；使用者"
          ]
        ],
        [
          "n.（复数）",
          [
            "用户"
          ]
        ]
      ]
    }
  ],
  "usher": [
    {
      "id": "usher",
      "pos": "v",
      "meaning": "引领进入；开创",
      "forms": [
        [
          "v.-ing（结果状语）",
          [
            "开创"
          ]
        ],
        [
          "v.",
          [
            "引领进入；开创"
          ]
        ]
      ]
    }
  ],
  "valley": [
    {
      "id": "place-element",
      "pos": "n",
      "meaning": "谷（地名组成）",
      "forms": [
        [
          "proper-name element",
          [
            "谷（地名组成）"
          ]
        ],
        [
          "n.",
          [
            "谷；硅谷地名的一部分"
          ]
        ]
      ]
    }
  ],
  "value": [
    {
      "id": "principles",
      "pos": "n",
      "meaning": "价值观；行为准则",
      "forms": [
        [
          "n.（复数）",
          [
            "价值观",
            "价值观；行为准则"
          ]
        ],
        [
          "n.",
          [
            "价值观；价值准则"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s16",
          "n.（复数）/v.（第三人称单数）",
          "价值；价值观；重视"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "价值；价值观；重视"
        ]
      ]
    },
    {
      "id": "number",
      "pos": "n",
      "meaning": "数值；值",
      "forms": [
        [
          "n.",
          [
            "数值；值"
          ]
        ]
      ]
    },
    {
      "id": "usefulness",
      "pos": "n",
      "meaning": "重要性；益处",
      "forms": [
        [
          "n.",
          [
            "重要性；益处"
          ]
        ]
      ]
    },
    {
      "id": "worth",
      "pos": "n",
      "meaning": "价值；价格",
      "forms": [
        [
          "n.",
          [
            "价值；价格"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "价值；价值观；重视"
        ]
      ]
    },
    {
      "id": "appreciate",
      "pos": "v",
      "meaning": "珍视；重视",
      "forms": [
        [
          "v.",
          [
            "珍视；重视"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "价值；价值观；重视"
        ]
      ]
    },
    {
      "id": "estimate",
      "pos": "v",
      "meaning": "估价",
      "forms": [
        [
          "v.",
          [
            "估价"
          ]
        ]
      ]
    }
  ],
  "variation": [
    {
      "id": "variation",
      "pos": "n",
      "meaning": "变异；差异",
      "forms": [
        [
          "n.",
          [
            "差异"
          ]
        ],
        [
          "n.",
          [
            "变异；差异"
          ]
        ]
      ]
    }
  ],
  "vary": [
    {
      "id": "vary",
      "pos": "v",
      "meaning": "变化；各不相同",
      "forms": [
        [
          "v.（现在分词作定语）",
          [
            "有差异；不一"
          ]
        ],
        [
          "v.",
          [
            "变化；各不相同"
          ]
        ]
      ]
    }
  ],
  "vast": [
    {
      "id": "vast",
      "pos": "adj",
      "meaning": "广大的；大量的",
      "forms": [
        [
          "adj.",
          [
            "庞大的"
          ]
        ],
        [
          "adj.",
          [
            "广大的；大量的"
          ]
        ]
      ]
    }
  ],
  "verbally": [
    {
      "id": "verbally",
      "pos": "adv",
      "meaning": "口头上；用言语",
      "forms": [
        [
          "adv.",
          [
            "口头地"
          ]
        ],
        [
          "adv.",
          [
            "口头上；用言语"
          ]
        ]
      ]
    }
  ],
  "verdict": [
    {
      "id": "verdict",
      "pos": "n",
      "meaning": "裁决；判决",
      "forms": [
        [
          "n.（verdict 的复数）",
          [
            "裁决；判决"
          ]
        ],
        [
          "n.",
          [
            "裁决；裁定"
          ]
        ]
      ]
    }
  ],
  "vessel": [
    {
      "id": "container",
      "pos": "n",
      "meaning": "容器",
      "forms": [],
      "fromNotes": [
        [
          "n.（复数）",
          "容器；船只；血管；vessel 的复数"
        ]
      ]
    },
    {
      "id": "ship",
      "pos": "n",
      "meaning": "船只",
      "forms": [],
      "fromNotes": [
        [
          "n.（复数）",
          "容器；船只；血管；vessel 的复数"
        ]
      ]
    },
    {
      "id": "blood-vessel",
      "pos": "n",
      "meaning": "血管",
      "forms": [],
      "fromNotes": [
        [
          "n.（复数）",
          "容器；船只；血管；vessel 的复数"
        ]
      ]
    }
  ],
  "victory": [
    {
      "id": "victory",
      "pos": "n",
      "meaning": "胜利；成功",
      "forms": [
        [
          "n.",
          [
            "胜利；成功"
          ]
        ],
        [
          "n.（复数）",
          [
            "胜利"
          ]
        ]
      ]
    }
  ],
  "view": [
    {
      "id": "sight",
      "pos": "n",
      "meaning": "视野；可见景观",
      "forms": [
        [
          "n.",
          [
            "视野；可见景观"
          ]
        ]
      ]
    },
    {
      "id": "opinion",
      "pos": "n",
      "meaning": "观点；看法",
      "forms": [
        [
          "n.",
          [
            "看法"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "观点、看法； 看待、观看；in view of鉴于。"
        ]
      ]
    },
    {
      "id": "regard",
      "pos": "v",
      "meaning": "看待",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "观点、看法； 看待、观看；in view of鉴于。"
        ]
      ]
    },
    {
      "id": "watch",
      "pos": "v",
      "meaning": "观看",
      "forms": [],
      "fromNotes": [
        [
          "v.",
          "观点、看法； 看待、观看；in view of鉴于。"
        ]
      ]
    }
  ],
  "vigorously": [
    {
      "id": "vigorously",
      "pos": "adv",
      "meaning": "有力地；积极地",
      "forms": [
        [
          "adv.",
          [
            "有力地；积极用力地"
          ]
        ],
        [
          "adv.",
          [
            "有力地；积极地"
          ]
        ]
      ]
    }
  ],
  "violence": [
    {
      "id": "violence",
      "pos": "n",
      "meaning": "暴力；暴力行为",
      "forms": [
        [
          "n.",
          [
            "暴力；剧烈冲突",
            "暴力；暴力行为"
          ]
        ]
      ]
    }
  ],
  "virtual": [
    {
      "id": "almost",
      "pos": "adj",
      "meaning": "简直可称为的；几乎等同于的",
      "forms": [
        [
          "adj.",
          [
            "简直可称为的；几乎等同于的"
          ]
        ],
        [
          "adj.",
          [
            "几乎可称为的；事实上的"
          ]
        ]
      ]
    },
    {
      "id": "digital",
      "pos": "adj",
      "meaning": "计算机模拟的；虚拟的",
      "forms": [
        [
          "",
          [
            "计算机模拟的；虚拟的，如 virtual reality（虚拟现实）"
          ]
        ]
      ]
    }
  ],
  "virtue": [
    {
      "id": "moral",
      "pos": "n",
      "meaning": "美德；德性",
      "forms": [
        [
          "n.",
          [
            "美德；德性"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "美德；德行。by virtue of凭借、由于，与a virtue一项优点分开。"
        ]
      ]
    },
    {
      "id": "advantage",
      "pos": "n",
      "meaning": "优点；长处",
      "forms": [
        [
          "n.",
          [
            "优点；长处"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "美德；德行。by virtue of凭借、由于，与a virtue一项优点分开。"
        ]
      ]
    }
  ],
  "visible": [
    {
      "id": "visible",
      "pos": "adj",
      "meaning": "明显的；可察觉的",
      "forms": [
        [
          "adj.",
          [
            "可见的；明显的"
          ]
        ],
        [
          "adj.",
          [
            "明显的；可察觉的"
          ]
        ]
      ]
    }
  ],
  "vision": [
    {
      "id": "future",
      "pos": "n",
      "meaning": "愿景；构想",
      "forms": [
        [
          "n.",
          [
            "愿景；构想"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "视力；视野；景象；想象中的画面。本文为未来愿景。"
        ]
      ]
    },
    {
      "id": "eyesight",
      "pos": "n",
      "meaning": "视力",
      "forms": [],
      "fromNotes": [
        [
          "",
          "视力；视野；景象；想象中的画面。本文为未来愿景。"
        ]
      ]
    },
    {
      "id": "field-of-vision",
      "pos": "n",
      "meaning": "视野",
      "forms": [],
      "fromNotes": [
        [
          "",
          "视力；视野；景象；想象中的画面。本文为未来愿景。"
        ]
      ]
    },
    {
      "id": "scene",
      "pos": "n",
      "meaning": "景象；想象中的画面",
      "forms": [],
      "fromNotes": [
        [
          "",
          "视力；视野；景象；想象中的画面。本文为未来愿景。"
        ]
      ]
    }
  ],
  "vivid": [
    {
      "id": "vivid",
      "pos": "adj",
      "meaning": "生动的；鲜明的",
      "forms": [
        [
          "adj.",
          [
            "生动的"
          ]
        ],
        [
          "adj.",
          [
            "生动的；鲜明的"
          ]
        ]
      ]
    }
  ],
  "volume": [
    {
      "id": "quantity",
      "pos": "n",
      "meaning": "量；总量",
      "forms": [
        [
          "n.",
          [
            "量；总量"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"
        ],
        [
          "",
          "体积；音量；数量"
        ]
      ]
    },
    {
      "id": "capacity",
      "pos": "n",
      "meaning": "体积",
      "forms": [],
      "fromNotes": [
        [
          "",
          "体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"
        ],
        [
          "",
          "体积；音量；数量"
        ]
      ]
    },
    {
      "id": "loudness",
      "pos": "n",
      "meaning": "音量",
      "forms": [],
      "fromNotes": [
        [
          "",
          "体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"
        ],
        [
          "",
          "体积；音量；数量"
        ]
      ]
    },
    {
      "id": "book",
      "pos": "n",
      "meaning": "书的一卷；一册",
      "forms": [
        [
          "n.",
          [
            "书卷；一册"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"
        ]
      ]
    }
  ],
  "vote": [
    {
      "id": "voting",
      "pos": "n",
      "meaning": "投票",
      "forms": [
        [
          "gerund（定语）",
          [
            "投票"
          ]
        ]
      ]
    },
    {
      "id": "vote",
      "pos": "v",
      "meaning": "投票",
      "forms": [
        [
          "v.",
          [
            "投票"
          ]
        ]
      ]
    }
  ],
  "wait": [
    {
      "id": "wait",
      "pos": "v",
      "meaning": "等待",
      "forms": [
        [
          "v.",
          [
            "等待"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s19",
          "v./n.（wait 的本句变形）",
          "等待"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "等待"
        ]
      ]
    },
    {
      "id": "wait-noun",
      "pos": "n",
      "meaning": "等待",
      "forms": [],
      "fromNotes": [
        [
          "v./n.",
          "等待"
        ]
      ]
    }
  ],
  "wake": [
    {
      "id": "air-wake",
      "pos": "n",
      "meaning": "尾流",
      "forms": [
        [
          "n.（复数）",
          [
            "尾流"
          ]
        ]
      ]
    },
    {
      "id": "awake",
      "pos": "v",
      "meaning": "醒来",
      "forms": [
        [
          "v.",
          [
            "醒来"
          ]
        ]
      ]
    }
  ],
  "wall": [
    {
      "id": "wall",
      "pos": "n",
      "meaning": "墙；墙面",
      "forms": [
        [
          "n.",
          [
            "墙；墙面"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n.",
          "墙；Wall Street专名组成"
        ]
      ]
    },
    {
      "id": "street-name",
      "pos": "n",
      "meaning": "Wall Street专名组成",
      "forms": [],
      "sources": [
        [
          "2010-p1-s4",
          "n.",
          "墙；Wall Street专名组成"
        ]
      ],
      "fromNotes": [
        [
          "n.",
          "墙；Wall Street专名组成"
        ]
      ]
    },
    {
      "id": "enclosed",
      "pos": "adj",
      "meaning": "用墙围住的",
      "forms": [
        [
          "adj.（过去分词作定语）",
          [
            "墙；用墙围住"
          ]
        ]
      ]
    }
  ],
  "want": [
    {
      "id": "want",
      "pos": "v",
      "meaning": "希望；想要",
      "forms": [
        [
          "v.",
          [
            "希望；想要",
            "想要",
            "希望"
          ]
        ],
        [
          "v.-ing（伴随分词）",
          [
            "想要"
          ]
        ]
      ],
      "sources": [
        [
          "question-29-option-D",
          "v./n.",
          "想要；需要（最普通、直接）"
        ],
        [
          "2001-p2-s8",
          "v./n.",
          "想要；需要（最普通、直接）"
        ],
        [
          "2011-p4-s11",
          "n.（复数）",
          "想要；需要（最普通、直接）"
        ],
        [
          "2011-p5-s3",
          "v./n.",
          "想要；需要（最普通、直接）"
        ],
        [
          "2011-p5-s9",
          "n.（复数）",
          "想要；需要（最普通、直接）"
        ],
        [
          "2012-p1-s8",
          "v./n.",
          "想要；需要（最普通、直接）"
        ],
        [
          "2012-p5-s5",
          "v./n.",
          "想要；需要（最普通、直接）"
        ],
        [
          "p3-s6",
          "v./n.",
          "想要；希望"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "想要；需要（最普通、直接）"
        ]
      ]
    },
    {
      "id": "need",
      "pos": "n",
      "meaning": "需求",
      "forms": [
        [
          "n.",
          [
            "需求"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "想要；需要（最普通、直接）"
        ]
      ]
    }
  ],
  "wash": [
    {
      "id": "washing",
      "pos": "n",
      "meaning": "洗涤",
      "forms": [
        [
          "n.（定语）",
          [
            "洗"
          ]
        ]
      ],
      "sources": [
        [
          "question-201031-prompt",
          "v.",
          "洗"
        ]
      ]
    },
    {
      "id": "wash-verb",
      "pos": "v",
      "meaning": "洗",
      "forms": [
        [
          "v.",
          [
            "洗"
          ]
        ]
      ]
    }
  ],
  "way": [
    {
      "id": "method",
      "pos": "n",
      "meaning": "方式；方法",
      "forms": [
        [
          "n.（复数）",
          [
            "方式；方法"
          ]
        ],
        [
          "n.",
          [
            "方式；方法",
            "方式",
            "办法"
          ]
        ],
        [
          "n.（复数Ways）",
          [
            "方法"
          ]
        ]
      ]
    },
    {
      "id": "progress",
      "pos": "n",
      "meaning": "进展；进行状态",
      "forms": [
        [
          "n.（固定表达中）",
          [
            "进展；进行状态"
          ]
        ]
      ]
    },
    {
      "id": "path",
      "pos": "n",
      "meaning": "道路",
      "forms": [
        [
          "n.（比喻结构组成）",
          [
            "道路"
          ]
        ]
      ]
    },
    {
      "id": "aspect",
      "pos": "n",
      "meaning": "方面；表现形式",
      "forms": [
        [
          "n.（复数）",
          [
            "方面；表现形式"
          ]
        ]
      ]
    }
  ],
  "weaken": [
    {
      "id": "weaken",
      "pos": "v",
      "meaning": "削弱；变弱",
      "forms": [
        [
          "v.",
          [
            "削弱；变弱"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s12",
          "v.-ed/adj.",
          "削弱；变弱"
        ]
      ]
    }
  ],
  "wealth": [
    {
      "id": "wealth",
      "pos": "n",
      "meaning": "财富；富裕",
      "forms": [
        [
          "n.",
          [
            "财富",
            "富裕；财富"
          ]
        ]
      ]
    }
  ],
  "wear": [
    {
      "id": "clothing",
      "pos": "n",
      "meaning": "服装",
      "forms": [
        [
          "n.",
          [
            "服装"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v. / n.",
          "穿；磨损； 服装、衣着。正文既有 wore white 的动词义，也有 infant wear 的服装名词义。"
        ],
        [
          "n./v.",
          "穿着；服装"
        ]
      ]
    },
    {
      "id": "wear",
      "pos": "v",
      "meaning": "穿；穿着",
      "forms": [
        [
          "v.（过去式）",
          [
            "穿；穿着"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v. / n.",
          "穿；磨损； 服装、衣着。正文既有 wore white 的动词义，也有 infant wear 的服装名词义。"
        ],
        [
          "n./v.",
          "穿着；服装"
        ]
      ]
    },
    {
      "id": "abrasion",
      "pos": "v",
      "meaning": "磨损",
      "forms": [],
      "fromNotes": [
        [
          "v. / n.",
          "穿；磨损； 服装、衣着。正文既有 wore white 的动词义，也有 infant wear 的服装名词义。"
        ]
      ]
    }
  ],
  "weather": [
    {
      "id": "weather",
      "pos": "n",
      "meaning": "天气",
      "forms": [
        [
          "n.",
          [
            "天气"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "n./v.",
          "天气；经受住"
        ],
        [
          "question-3-prompt",
          "n./v.",
          "天气；经受住"
        ],
        [
          "2010-cloze-s7",
          "n./v.",
          "天气；经受住"
        ],
        [
          "question-201010-prompt",
          "n./v.",
          "天气；经受住"
        ]
      ],
      "fromNotes": [
        [
          "n. / v.",
          "天气； 经受风化。本文weather a crisis为渡过危机。"
        ],
        [
          "n./v.",
          "天气；经受住"
        ]
      ]
    },
    {
      "id": "withstand",
      "pos": "v",
      "meaning": "经受住；渡过",
      "forms": [
        [
          "v.-ed（过去分词）",
          [
            "经受住；渡过"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n. / v.",
          "天气； 经受风化。本文weather a crisis为渡过危机。"
        ],
        [
          "n./v.",
          "天气；经受住"
        ]
      ]
    },
    {
      "id": "erosion",
      "pos": "v",
      "meaning": "经受风化",
      "forms": [],
      "fromNotes": [
        [
          "n. / v.",
          "天气； 经受风化。本文weather a crisis为渡过危机。"
        ]
      ]
    }
  ],
  "weight": [
    {
      "id": "mass",
      "pos": "n",
      "meaning": "重量；体重",
      "forms": [
        [
          "n.",
          [
            "体重"
          ]
        ],
        [
          "n.（复数）",
          [
            "体重"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "重量；体重；权重"
        ]
      ]
    },
    {
      "id": "importance",
      "pos": "n",
      "meaning": "权重",
      "forms": [],
      "fromNotes": [
        [
          "n./v.",
          "重量；体重；权重"
        ]
      ]
    }
  ],
  "welcome": [
    {
      "id": "welcome",
      "pos": "v",
      "meaning": "欢迎；接纳",
      "forms": [
        [
          "v.",
          [
            "欢迎；接纳"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./adj./n.",
          "欢迎；乐于接纳"
        ]
      ]
    },
    {
      "id": "welcome",
      "pos": "n",
      "meaning": "欢迎",
      "forms": [],
      "fromNotes": [
        [
          "v./adj./n.",
          "欢迎；乐于接纳"
        ]
      ]
    }
  ],
  "well": [
    {
      "id": "quality",
      "pos": "adv",
      "meaning": "好地；顺利地",
      "forms": [
        [
          "adv.",
          [
            "好地",
            "顺利地；好地",
            "好地；表现良好",
            "充分地；妥当地"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s1",
          "adv./adj./n.",
          "好地；顺利地"
        ],
        [
          "question-27-prompt",
          "adv./adj./n.",
          "好地；顺利地"
        ]
      ]
    },
    {
      "id": "degree",
      "pos": "adv",
      "meaning": "充分地；远远地",
      "forms": [
        [
          "adv.",
          [
            "远远地",
            "充分地",
            "充分地；良好地",
            "好地；充分地"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s15",
          "adv./adj./n.",
          "好地；顺利地"
        ]
      ]
    },
    {
      "id": "addition",
      "pos": "adv",
      "meaning": "固定添加表达中的副词成分",
      "forms": [
        [
          "固定副词短语成分",
          [
            "也（as well组成）"
          ]
        ],
        [
          "adv.（固定连接语成分）",
          [
            "构成补充并列的成分"
          ]
        ],
        [
          "adv.（搭配成分）",
          [
            "也（搭配中）"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s4",
          "adv./adj./n.",
          "好地；顺利地"
        ]
      ]
    },
    {
      "id": "probability",
      "pos": "adv",
      "meaning": "很可能",
      "forms": [
        [
          "adv.（可能性强调）",
          [
            "很可能"
          ]
        ]
      ]
    },
    {
      "id": "suggestion",
      "pos": "adv",
      "meaning": "不妨；大可以",
      "forms": [
        [
          "adv.（建议语气）",
          [
            "不妨；大可以"
          ]
        ]
      ]
    },
    {
      "id": "discourse",
      "pos": "话语标记",
      "meaning": "不过；那么",
      "forms": [
        [
          "discourse marker",
          [
            "不过；那么"
          ]
        ]
      ]
    }
  ],
  "west": [
    {
      "id": "surname",
      "pos": "n",
      "meaning": "韦斯特（姓）",
      "forms": [],
      "sources": [
        [
          "2001-cloze-s1",
          "proper n.",
          "西方；西部"
        ],
        [
          "2001-cloze-s7",
          "proper n.",
          "西方；西部"
        ],
        [
          "question-200101-prompt",
          "proper n.",
          "西方；西部"
        ]
      ]
    },
    {
      "id": "western-world",
      "pos": "n",
      "meaning": "西方",
      "forms": [
        [
          "proper n.",
          [
            "西方；西部"
          ]
        ]
      ],
      "sources": [
        [
          "question-23-option-C",
          "proper n.",
          "西方；西部"
        ]
      ]
    },
    {
      "id": "direction-name",
      "pos": "n",
      "meaning": "西（州名组成）",
      "forms": [
        [
          "专名组成",
          [
            "西（州名组成）"
          ]
        ]
      ]
    }
  ],
  "whereas": [
    {
      "id": "contrast",
      "pos": "conj",
      "meaning": "而；相比之下",
      "forms": [
        [
          "conj.",
          [
            "而；相比之下"
          ]
        ],
        [
          "conj.",
          [
            "而；然而（用于对比）"
          ]
        ]
      ]
    }
  ],
  "white": [
    {
      "id": "teeth",
      "pos": "n",
      "meaning": "洁白的牙齿",
      "forms": [],
      "sources": [
        [
          "2010-p3-s8",
          "n.",
          "洁白的牙齿"
        ]
      ]
    },
    {
      "id": "white-paper",
      "pos": "adj",
      "meaning": "白色的（white paper组成）",
      "forms": [],
      "sources": [
        [
          "2011-p5-s20",
          "n.",
          "洁白的牙齿"
        ]
      ]
    },
    {
      "id": "colour",
      "pos": "n",
      "meaning": "白色；白色衣物",
      "forms": [
        [
          "n.（颜色名词）",
          [
            "白色；白色衣物",
            "白色"
          ]
        ]
      ]
    }
  ],
  "whole": [
    {
      "id": "whole",
      "pos": "adj",
      "meaning": "整个的",
      "forms": [
        [
          "adj.",
          [
            "整个的"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s13",
          "adj./n.",
          "整个的；整体"
        ],
        [
          "2012-p3-s16",
          "adj./n.",
          "整个的；整体"
        ],
        [
          "2012-p5-s27",
          "adj./n.",
          "整个的；整体"
        ]
      ],
      "fromNotes": [
        [
          "adj./n.",
          "整个的；整体"
        ]
      ]
    },
    {
      "id": "whole-noun",
      "pos": "n",
      "meaning": "整体",
      "forms": [],
      "fromNotes": [
        [
          "adj./n.",
          "整个的；整体"
        ]
      ]
    }
  ],
  "wide": [
    {
      "id": "wide",
      "pos": "adj",
      "meaning": "宽的；范围大的",
      "forms": [
        [
          "adj.（wide 的比较级）",
          [
            "更广阔的；整体范围更大的"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s1",
          "adj./adv.",
          "更广阔的；整体范围更大的"
        ]
      ],
      "fromNotes": [
        [
          "adj./adv.",
          "更广阔的；整体范围更大的"
        ]
      ]
    },
    {
      "id": "widely",
      "pos": "adv",
      "meaning": "广泛地",
      "forms": [
        [
          "adv.",
          [
            "宽的；广泛的；程度大的"
          ]
        ],
        [
          "adv.",
          [
            "更广阔的；整体范围更大的"
          ]
        ]
      ]
    }
  ],
  "widely": [
    {
      "id": "widely",
      "pos": "adv",
      "meaning": "广泛地",
      "forms": [
        [
          "adv.",
          [
            "广泛地"
          ]
        ],
        [
          "adv.",
          [
            "更广阔的；整体范围更大的"
          ]
        ]
      ]
    }
  ],
  "wild": [
    {
      "id": "uncontrolled",
      "pos": "adj",
      "meaning": "失控的；不受约束的",
      "forms": [
        [
          "adj.",
          [
            "失控的；不受约束的"
          ]
        ],
        [
          "adj./adv./n.",
          [
            "失控的；狂野的"
          ]
        ]
      ]
    }
  ],
  "win": [
    {
      "id": "win",
      "pos": "v",
      "meaning": "赢得；取胜",
      "forms": [
        [
          "v.（过去式）",
          [
            "赢；取胜"
          ]
        ],
        [
          "v.（win 的本句变形）",
          [
            "取得；赢得"
          ]
        ],
        [
          "v.",
          [
            "取得；赢得",
            "赢得；胜过"
          ]
        ]
      ]
    }
  ],
  "wipe": [
    {
      "id": "wipe",
      "pos": "v",
      "meaning": "擦拭",
      "forms": [
        [
          "v.",
          [
            "擦拭"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "擦去；彻底消除"
        ]
      ]
    },
    {
      "id": "remove",
      "pos": "v",
      "meaning": "彻底消除（wipe out）",
      "forms": [],
      "sources": [
        [
          "question-200126-option-C",
          "v./n.",
          "擦去；彻底消除"
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "擦去；彻底消除"
        ]
      ]
    },
    {
      "id": "wipes",
      "pos": "n",
      "meaning": "湿巾",
      "forms": [],
      "sources": [
        [
          "2010-p3-s6",
          "v.",
          "湿巾"
        ]
      ]
    }
  ],
  "wish": [
    {
      "id": "desire",
      "pos": "v",
      "meaning": "希望；想要",
      "forms": [
        [
          "v.（第三人称单数）",
          [
            "希望；想要"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "希望；想要"
        ]
      ]
    },
    {
      "id": "unreal-wish",
      "pos": "v",
      "meaning": "对现实相反或难实现情况的愿望",
      "forms": [
        [
          "",
          [
            "wish that...：对现实相反或难实现情况的愿望"
          ]
        ]
      ]
    },
    {
      "id": "wish-noun",
      "pos": "n",
      "meaning": "愿望；祝愿",
      "forms": [
        [
          "n.",
          [
            "愿望；祝愿"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v./n.",
          "希望；想要"
        ]
      ]
    }
  ],
  "witness": [
    {
      "id": "person",
      "pos": "n",
      "meaning": "证人",
      "forms": [],
      "sources": [
        [
          "2001-cloze-s1",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "2001-cloze-s2",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "2001-cloze-s7",
          "n./v.",
          "证人；目击"
        ],
        [
          "2001-cloze-s8",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "2001-cloze-s9",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "question-200104-prompt",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "question-200117-prompt",
          "n./v.",
          "证人；目击"
        ],
        [
          "question-200118-prompt",
          "n.（witness 的复数）",
          "证人；目击"
        ],
        [
          "question-200119-prompt",
          "n.（witness 的复数）",
          "证人；目击"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "证人；目击"
        ]
      ]
    },
    {
      "id": "experience",
      "pos": "v",
      "meaning": "经历；见证",
      "forms": [
        [
          "v.（过去分词）",
          [
            "经历；见证"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "证人；目击"
        ]
      ]
    }
  ],
  "word": [
    {
      "id": "word",
      "pos": "n",
      "meaning": "词；词语；措辞",
      "forms": [
        [
          "n.（复数）",
          [
            "词；词语；措辞",
            "言辞"
          ]
        ],
        [
          "n.",
          [
            "词；用语",
            "词；单词",
            "单词；词",
            "词；词语；措辞"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s6",
          "n./v.",
          "词；词语；措辞"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "词；词语；措辞"
        ]
      ]
    },
    {
      "id": "phrase-verb",
      "pos": "v",
      "meaning": "措辞",
      "forms": [],
      "fromNotes": [
        [
          "n./v.",
          "词；词语；措辞"
        ]
      ]
    }
  ],
  "work": [
    {
      "id": "artwork",
      "pos": "n",
      "meaning": "艺术作品",
      "forms": [
        [
          "n.（复数）",
          [
            "作品"
          ]
        ],
        [
          "n.",
          [
            "艺术作品"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s1",
          "n./v.（work 的本句变形）",
          "艺术作品"
        ],
        [
          "2010-p1-s12",
          "n./v.（work 的本句变形）",
          "艺术作品"
        ],
        [
          "2010-p1-s18",
          "n./v.（work 的本句变形）",
          "艺术作品"
        ],
        [
          "2010-p1-s17",
          "n./v.",
          "艺术作品"
        ]
      ]
    },
    {
      "id": "employment",
      "pos": "n",
      "meaning": "工作；事务",
      "forms": [
        [
          "n.",
          [
            "工作；上班的地方",
            "工作；事务",
            "工作（通常不可数）"
          ]
        ],
        [
          "n.（动名词）",
          [
            "坚定不懈的努力"
          ]
        ],
        [
          "n. uncountable",
          [
            "工作"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s16",
          "n./v.",
          "工作；劳动；起作用"
        ],
        [
          "2012-p5-s7",
          "v. / n.",
          "有所作为；工作；创作"
        ]
      ]
    },
    {
      "id": "operate",
      "pos": "v",
      "meaning": "奏效；起作用",
      "forms": [
        [
          "v.（works）",
          [
            "起作用"
          ]
        ],
        [
          "v.（第三人称单数）",
          [
            "奏效；起作用"
          ]
        ],
        [
          "v./n.",
          [
            "起作用；发挥反向作用"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s4",
          "v./n.",
          "起作用；发挥反向作用"
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "工作；奏效"
        ]
      ]
    },
    {
      "id": "labour",
      "pos": "v",
      "meaning": "劳动；工作",
      "forms": [
        [
          "v.（过去分词worked）",
          [
            "工作"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s18",
          "n./v.（work 的本句变形）",
          "起作用；发挥反向作用"
        ],
        [
          "2012-p5-s1",
          "v. / n.",
          "有所作为；工作；创作"
        ]
      ],
      "fromNotes": [
        [
          "v.",
          "工作；奏效"
        ]
      ]
    },
    {
      "id": "solve",
      "pos": "v",
      "meaning": "work out中的动词成分",
      "forms": [
        [
          "v.（过去分词）",
          [
            "解决（搭配中）"
          ]
        ]
      ]
    },
    {
      "id": "working",
      "pos": "adj",
      "meaning": "工作的；劳动的",
      "forms": [
        [
          "v.-ing（定语）",
          [
            "工作的",
            "劳动；做工（working class）"
          ]
        ],
        [
          "adj.（分词）",
          [
            "劳动；工作"
          ]
        ]
      ]
    }
  ],
  "world": [
    {
      "id": "globe",
      "pos": "n",
      "meaning": "世界；全球",
      "forms": [
        [
          "n.（专名组成）",
          [
            "世界"
          ]
        ],
        [
          "n.（所有格）",
          [
            "世界",
            "世界；全球的",
            "世界；全球"
          ]
        ],
        [
          "名词作定语",
          [
            "世界"
          ]
        ],
        [
          "n.",
          [
            "世界；全球",
            "世界"
          ]
        ],
        [
          "n.（作定语）",
          [
            "世界"
          ]
        ],
        [
          "n.（名称组成）",
          [
            "世界"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s3",
          "n.",
          "世界；领域"
        ],
        [
          "2010-p1-s5",
          "n./adj.",
          "世界；全球的"
        ],
        [
          "question-201021-option-D",
          "n./adj.",
          "世界；全球的"
        ]
      ]
    },
    {
      "id": "sphere",
      "pos": "n",
      "meaning": "界；领域",
      "forms": [],
      "sources": [
        [
          "2010-p1-s10",
          "n./adj.",
          "世界；全球的"
        ]
      ]
    },
    {
      "id": "countries",
      "pos": "n",
      "meaning": "国家群体",
      "forms": [
        [
          "n.",
          [
            "世界；国家群体"
          ]
        ]
      ]
    }
  ],
  "worry": [
    {
      "id": "worry",
      "pos": "v",
      "meaning": "担心；担忧",
      "forms": [
        [
          "v.",
          [
            "担心"
          ]
        ]
      ],
      "sources": [
        [
          "2011-cloze-s15",
          "n./v.",
          "担忧；担心"
        ]
      ],
      "fromNotes": [
        [
          "n./v.",
          "担忧；担心"
        ]
      ]
    },
    {
      "id": "worry-noun",
      "pos": "n",
      "meaning": "担忧；担心",
      "forms": [],
      "fromNotes": [
        [
          "n./v.",
          "担忧；担心"
        ]
      ]
    }
  ],
  "worth": [
    {
      "id": "monetary-value",
      "pos": "adj",
      "meaning": "价值……",
      "forms": [],
      "sources": [
        [
          "2010-p1-s6",
          "adj./n.",
          "价值……；价值"
        ]
      ],
      "fromNotes": [
        [
          "adj./n.",
          "价值……；价值"
        ]
      ]
    },
    {
      "id": "worthwhile",
      "pos": "adj",
      "meaning": "值得的",
      "forms": [
        [
          "adj.",
          [
            "值得的"
          ]
        ]
      ]
    },
    {
      "id": "worth-noun",
      "pos": "n",
      "meaning": "价值",
      "forms": [],
      "fromNotes": [
        [
          "adj./n.",
          "价值……；价值"
        ]
      ]
    }
  ],
  "worthy": [
    {
      "id": "worthwhile",
      "pos": "adj",
      "meaning": "值得的",
      "forms": [
        [
          "adj.",
          [
            "值得的"
          ]
        ],
        [
          "adj.",
          [
            "值得的；配得上的"
          ]
        ]
      ]
    },
    {
      "id": "admirable",
      "pos": "adj",
      "meaning": "值得尊敬、效法的",
      "forms": [
        [
          "adj.",
          [
            "值得尊敬、效法的"
          ]
        ]
      ],
      "sources": [
        [
          "question-201241-option-G",
          "adj.",
          "值得的；配得上的"
        ]
      ]
    }
  ],
  "wreak": [
    {
      "id": "wreak",
      "pos": "v",
      "meaning": "造成；引发",
      "forms": [
        [
          "v.",
          [
            "造成；引发"
          ]
        ],
        [
          "v.（-ing形式）",
          [
            "造成（破坏等）"
          ]
        ],
        [
          "v.",
          [
            "造成；引发破坏"
          ]
        ]
      ]
    }
  ],
  "write": [
    {
      "id": "write",
      "pos": "v",
      "meaning": "写；撰写",
      "forms": [
        [
          "v.（第三人称单数）",
          [
            "写到；论述"
          ]
        ],
        [
          "v.",
          [
            "写；撰写",
            "写下；填写",
            "写道；撰写"
          ]
        ],
        [
          "v.-ing（分词）",
          [
            "写作；报道"
          ]
        ]
      ]
    },
    {
      "id": "write-off",
      "pos": "v",
      "meaning": "write off中的动词成分",
      "forms": [
        [
          "v.",
          [
            "认定无望（write off）"
          ]
        ]
      ]
    }
  ],
  "writing": [
    {
      "id": "text",
      "pos": "n",
      "meaning": "作文；所写文章",
      "forms": [
        [
          "n.",
          [
            "作文；写作内容",
            "著作；作品",
            "作文；所写文章"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "文字材料：in writing以书面形式；书写风格或笔迹：clear writing清晰的书写；writings常指作品或著述。"
        ]
      ]
    },
    {
      "id": "activity",
      "pos": "n",
      "meaning": "写作活动",
      "forms": [
        [
          "n.",
          [
            "历史写作活动"
          ]
        ]
      ]
    },
    {
      "id": "style",
      "pos": "n",
      "meaning": "书写风格；笔迹",
      "forms": [],
      "fromNotes": [
        [
          "",
          "文字材料：in writing以书面形式；书写风格或笔迹：clear writing清晰的书写；writings常指作品或著述。"
        ]
      ]
    }
  ],
  "wrong": [
    {
      "id": "incorrect",
      "pos": "adj",
      "meaning": "错误的",
      "forms": [
        [
          "adj.",
          [
            "错误的"
          ]
        ]
      ]
    },
    {
      "id": "faulty",
      "pos": "adj",
      "meaning": "出故障的；有问题的",
      "forms": [
        [
          "adj.",
          [
            "出故障的；有问题的"
          ]
        ]
      ]
    }
  ],
  "year-old": [
    {
      "id": "person-age",
      "pos": "n",
      "meaning": "年龄为……岁的人",
      "forms": [
        [
          "n.（复合名词复数）",
          [
            "……岁的；年龄为……岁的人"
          ]
        ]
      ],
      "fromNotes": [
        [
          "compound adj./n.",
          "……岁的；年龄为……岁的人"
        ]
      ]
    },
    {
      "id": "age",
      "pos": "adj",
      "meaning": "……岁的",
      "forms": [],
      "fromNotes": [
        [
          "compound adj./n.",
          "……岁的；年龄为……岁的人"
        ]
      ]
    }
  ],
  "yield": [
    {
      "id": "yield",
      "pos": "v",
      "meaning": "让位于；屈服于",
      "forms": [
        [
          "v.（过去分词）",
          [
            "让位于；屈服于"
          ]
        ],
        [
          "v./n.",
          [
            "让位于；屈服于"
          ]
        ]
      ]
    }
  ],
  "young": [
    {
      "id": "young",
      "pos": "adj",
      "meaning": "年轻的；年幼的",
      "forms": [
        [
          "adj.",
          [
            "年幼的"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s3",
          "adj./n.",
          "年轻的；年轻人"
        ],
        [
          "2010-cloze-s13",
          "adj./n.",
          "年轻的；年轻人"
        ],
        [
          "2011-p5-s15",
          "adj./n.",
          "年轻的；年轻人"
        ],
        [
          "2012-p4-s2",
          "adj./n.",
          "年轻的；年轻人"
        ],
        [
          "2012-p4-s12",
          "adj./n.",
          "年轻的；年轻人"
        ]
      ],
      "fromNotes": [
        [
          "adj./n.",
          "年轻的；年轻人"
        ]
      ]
    },
    {
      "id": "young-people",
      "pos": "n",
      "meaning": "年轻人",
      "forms": [
        [
          "adj.（名词化）",
          [
            "年轻人"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj./n.",
          "年轻的；年轻人"
        ]
      ]
    }
  ],
  "zenith": [
    {
      "id": "company",
      "pos": "n",
      "meaning": "Zenith公司",
      "forms": [
        [
          "proper n.",
          [
            "Zenith公司"
          ]
        ]
      ],
      "fromNotes": [
        [
          "proper n./n.",
          "Zenith公司；顶峰"
        ]
      ]
    },
    {
      "id": "peak",
      "pos": "n",
      "meaning": "顶峰",
      "forms": [],
      "fromNotes": [
        [
          "proper n./n.",
          "Zenith公司；顶峰"
        ]
      ]
    }
  ],
  "zhang": [
    {
      "id": "surname",
      "pos": "n",
      "meaning": "张（姓）",
      "forms": [
        [
          "proper noun",
          [
            "张（姓）"
          ]
        ],
        [
          "proper n.",
          [
            "张（姓）"
          ]
        ]
      ]
    }
  ]
};

export const reviewedAnnotationsTZ: ReviewedSenseAnnotations = {
  "toll": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "v.",
          [
            "通行费；伤亡人数，如death toll死亡人数； 缓慢鸣钟。"
          ]
        ]
      ]
    }
  ],
  "trade": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "n. / v. / n.",
          [
            "贸易、交易； 行业、手艺。trade A for B用A换B。"
          ]
        ]
      ]
    }
  ],
  "view": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "v.",
          [
            "观点、看法； 看待、观看；in view of鉴于。"
          ]
        ]
      ]
    }
  ],
  "virtue": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "美德；德行。by virtue of凭借、由于，与a virtue一项优点分开。"
          ]
        ]
      ]
    }
  ],
  "vision": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "视力；视野；景象；想象中的画面。本文为未来愿景。"
          ]
        ]
      ]
    }
  ],
  "volume": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"
          ]
        ]
      ]
    },
    {
      "reason": "默认词典的体积、音量、数量是已展示三义的概览，不重复作为新义。",
      "forms": [
        [
          "",
          [
            "体积；音量；数量"
          ]
        ]
      ]
    }
  ],
  "wear": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "v. / n.",
          [
            "穿；磨损； 服装、衣着。正文既有 wore white 的动词义，也有 infant wear 的服装名词义。"
          ]
        ]
      ]
    },
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "穿着；服装"
          ]
        ]
      ]
    }
  ],
  "work": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "v.",
          [
            "工作；奏效"
          ]
        ]
      ]
    }
  ],
  "writing": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "文字材料：in writing以书面形式；书写风格或笔迹：clear writing清晰的书写；writings常指作品或著述。"
          ]
        ]
      ]
    }
  ],
  "table": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "桌子；一览表。"
          ]
        ],
        [
          "v.",
          [
            "提交讨论（英式议会用法）；搁置讨论（美式用法），须看地域语境。"
          ]
        ]
      ]
    }
  ],
  "term": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "",
          [
            "术语；学期；任期；期限；复数terms条款、关系；in terms of就……而言。"
          ]
        ],
        [
          "n. / v.",
          [
            "学期；期限；条件； 把……称为。本文为购物者使用的术语。"
          ]
        ]
      ]
    },
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n.",
          [
            "方面；术语；条件"
          ]
        ]
      ]
    }
  ],
  "weather": [
    {
      "reason": "原释义同时列有多个词义或搭配说明；各义单列，完整说明保留，不把说明当作另一义项。",
      "forms": [
        [
          "n. / v.",
          [
            "天气； 经受风化。本文weather a crisis为渡过危机。"
          ]
        ]
      ]
    },
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "天气；经受住"
          ]
        ]
      ]
    }
  ],
  "take": [
    {
      "reason": "孤立taking选项没有宾语，原词典概览不强分配到接单或接管。",
      "sources": [
        [
          "question-201015-option-C",
          "v.-ing/gerund",
          "把……视为；接管"
        ]
      ]
    },
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "把……视为；接管"
          ]
        ]
      ]
    }
  ],
  "time": [
    {
      "reason": "本句an easier time和at the time有两次不同作用；保留原始语境，不把同句混合说明计为一个新义项。",
      "sources": [
        [
          "2011-p1-s17",
          "n.",
          "经历；时点"
        ]
      ]
    },
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "倍；时间"
          ]
        ]
      ]
    }
  ],
  "towards": [
    {
      "reason": "孤立介词选项缺少对象，原词典概览保留，不强猜方向或关系。",
      "sources": [
        [
          "question-3-option-D",
          "prep.",
          "朝向；对于；接近"
        ]
      ]
    }
  ],
  "well": [
    {
      "reason": "孤立as well as选项缺少完整比較/添加环境，保留原始说明。",
      "sources": [
        [
          "question-1-option-B",
          "adv./adj./n.",
          "好地；顺利地"
        ]
      ]
    }
  ],
  "textile": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./adj.",
          [
            "纺织品；纺织业的"
          ]
        ]
      ]
    }
  ],
  "transport": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "运输；交通；运送"
          ]
        ]
      ]
    }
  ],
  "upset": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./adj.",
          [
            "使不安；令人不适的"
          ]
        ]
      ]
    }
  ],
  "weight": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "重量；体重；权重"
          ]
        ]
      ]
    }
  ],
  "welcome": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./adj./n.",
          [
            "欢迎；乐于接纳"
          ]
        ]
      ]
    }
  ],
  "year-old": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "compound adj./n.",
          [
            "……岁的；年龄为……岁的人"
          ]
        ]
      ]
    }
  ],
  "zenith": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "proper n./n.",
          [
            "Zenith公司；顶峰"
          ]
        ]
      ]
    }
  ],
  "underground": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adv./adj./n.",
          [
            "地下；隐秘地；地下的"
          ]
        ]
      ]
    }
  ],
  "treat": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v.",
          [
            "对待；款待；使体验"
          ]
        ]
      ]
    }
  ],
  "talk": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "交谈；谈话"
          ]
        ]
      ]
    }
  ],
  "test": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "考试；测试"
          ]
        ]
      ]
    }
  ],
  "think": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v.",
          [
            "思考；认为"
          ]
        ]
      ]
    }
  ],
  "title": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "标题；题名"
          ]
        ]
      ]
    }
  ],
  "today": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adv./n.",
          [
            "今天；当今"
          ]
        ]
      ]
    }
  ],
  "travel": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "旅行；行程"
          ]
        ]
      ]
    }
  ],
  "try": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "努力；尝试"
          ]
        ]
      ]
    }
  ],
  "turn": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "使变成；转向"
          ]
        ]
      ]
    }
  ],
  "twice": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adv.（两倍；两次）",
          [
            "两倍；两次"
          ]
        ]
      ]
    }
  ],
  "type": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "字体；类型；打字"
          ]
        ]
      ]
    }
  ],
  "united": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adj./v.（过去分词；专有国名组成）",
          [
            "联合的（国名组成）"
          ]
        ]
      ]
    }
  ],
  "universal": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./adj.",
          [
            "普遍规律；普遍的"
          ]
        ]
      ]
    }
  ],
  "upon": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "prep.",
          [
            "在……之上；依据；取决于"
          ]
        ]
      ]
    }
  ],
  "use": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "使用；用途"
          ]
        ]
      ]
    }
  ],
  "value": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "价值；价值观；重视"
          ]
        ]
      ]
    }
  ],
  "wait": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "等待"
          ]
        ]
      ]
    }
  ],
  "wall": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n.",
          [
            "墙；Wall Street专名组成"
          ]
        ]
      ]
    }
  ],
  "want": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "想要；需要（最普通、直接）"
          ]
        ]
      ]
    }
  ],
  "whole": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adj./n.",
          [
            "整个的；整体"
          ]
        ]
      ]
    }
  ],
  "wide": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adj./adv.",
          [
            "更广阔的；整体范围更大的"
          ]
        ]
      ]
    }
  ],
  "wipe": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "擦去；彻底消除"
          ]
        ]
      ]
    }
  ],
  "wish": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "v./n.",
          [
            "希望；想要"
          ]
        ]
      ]
    }
  ],
  "witness": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "证人；目击"
          ]
        ]
      ]
    }
  ],
  "word": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "词；词语；措辞"
          ]
        ]
      ]
    }
  ],
  "worry": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "n./v.",
          [
            "担忧；担心"
          ]
        ]
      ]
    }
  ],
  "worth": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adj./n.",
          [
            "价值……；价值"
          ]
        ]
      ]
    }
  ],
  "young": [
    {
      "reason": "默认查词的原始概览同时列出词性/含义，不作为额外新义；实际各义保留，概览移入说明。",
      "forms": [
        [
          "adj./n.",
          [
            "年轻的；年轻人"
          ]
        ]
      ]
    }
  ],
  "vessel": [
    {
      "reason": "孤立vessels选项列出多个词义，不能将同一次出现分别归给容器、船或血管。",
      "forms": [
        [
          "n.（复数）",
          [
            "容器；船只；血管；vessel 的复数"
          ]
        ]
      ]
    }
  ]
};
