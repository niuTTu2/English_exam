/**
 * Full N–S inventory review, 2026-09-20. Links only existing corpus meanings.
 * Complete glosses and exact source+form overrides are reviewed explicitly;
 * no fuzzy matching, source deletion, or inferred corpus frequency.
 */
import type { ReviewedSenseTable, ReviewedSenseAnnotations } from "./reviewed-sense-types";

export const reviewedSensesNS: ReviewedSenseTable = {
  "narrow": [
    {
      "id": "narrow",
      "pos": "v",
      "meaning": "缩小；变窄",
      "forms": [
        [
          "v",
          [
            "缩小；变窄",
            "缩小"
          ]
        ],
        [
          "adj/v",
          [
            "缩小；变窄",
            "缩小"
          ]
        ]
      ]
    }
  ],
  "nation": [
    {
      "id": "nation",
      "pos": "n",
      "meaning": "国家；民族共同体",
      "forms": [
        [
          "n",
          [
            "国家；民族共同体",
            "国家"
          ]
        ]
      ]
    }
  ],
  "national": [
    {
      "id": "national",
      "pos": "adj",
      "meaning": "民族或国家的；全国性的",
      "forms": [
        [
          "adj",
          [
            "民族或国家的；全国性的",
            "全国性的；国家级的",
            "民族或国家的"
          ]
        ]
      ]
    }
  ],
  "natural": [
    {
      "id": "natural",
      "pos": "adj",
      "meaning": "自然的",
      "forms": [
        [
          "adj",
          [
            "自然的",
            "对儿童而言自然的"
          ]
        ]
      ]
    }
  ],
  "name": [
    {
      "id": "name",
      "pos": "n",
      "meaning": "名称；名字",
      "forms": [
        [
          "n",
          [
            "名称；名字"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s4",
          "n/v",
          "名称；名声；命名"
        ],
        [
          "2012-cloze-s7",
          "n/v",
          "名称；名声；命名"
        ],
        [
          "2012-cloze-s8",
          "n/v",
          "名称；名声；命名"
        ]
      ]
    }
  ],
  "nature": [
    {
      "id": "character",
      "pos": "n",
      "meaning": "本性；本质",
      "forms": [
        [
          "n",
          [
            "本性；本质"
          ]
        ]
      ],
      "sources": [
        [
          "question-201228-option-A",
          "n",
          "本性；自然"
        ],
        [
          "question-201238-option-B",
          "n",
          "本性；自然"
        ]
      ],
      "fromNotes": [
        [
          "n",
          "本性；自然"
        ]
      ]
    },
    {
      "id": "natural-world",
      "pos": "n",
      "meaning": "自然界",
      "forms": [
        [
          "n",
          [
            "自然界"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "本性；自然"
        ]
      ]
    }
  ],
  "near": [
    {
      "id": "proximity",
      "pos": "prep",
      "meaning": "在……附近",
      "forms": [
        [
          "prep",
          [
            "在……附近"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s3",
          "adj/adv/prep",
          "接近；附近的"
        ]
      ]
    }
  ],
  "necessity": [
    {
      "id": "essential",
      "pos": "n",
      "meaning": "必需品；必要条件",
      "forms": [
        [
          "n",
          [
            "必需品；必要条件",
            "必需品"
          ]
        ]
      ]
    }
  ],
  "neglect": [
    {
      "id": "neglect",
      "pos": "v",
      "meaning": "忽视；疏于照料",
      "forms": [
        [
          "v",
          [
            "忽视；疏于照料",
            "忽视；未加关注"
          ]
        ]
      ]
    }
  ],
  "news": [
    {
      "id": "news",
      "pos": "n",
      "meaning": "消息；新闻",
      "forms": [
        [
          "n",
          [
            "消息；新闻",
            "消息",
            "新闻"
          ]
        ]
      ]
    }
  ],
  "newspaper": [
    {
      "id": "newspaper",
      "pos": "n",
      "meaning": "报纸；报社",
      "forms": [
        [
          "n",
          [
            "报纸；报社",
            "报纸"
          ]
        ]
      ]
    }
  ],
  "next": [
    {
      "id": "next",
      "pos": "adj",
      "meaning": "下一个的",
      "forms": [
        [
          "adj",
          [
            "下一个的"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s13",
          "adj/adv/n",
          "下一个"
        ],
        [
          "2001-p2-s9",
          "adj/adv/n",
          "接下来的；未来的"
        ],
        [
          "2012-p3-s22",
          "adj/adv/n",
          "接下来的；未来的"
        ]
      ]
    },
    {
      "id": "following",
      "pos": "adv",
      "meaning": "接下来",
      "forms": [
        [
          "adv",
          [
            "接下来"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s3",
          "adj/adv/n",
          "下一个；接下来"
        ]
      ]
    }
  ],
  "noise": [
    {
      "id": "noise",
      "pos": "n",
      "meaning": "噪音；声响",
      "forms": [
        [
          "n",
          [
            "噪音；声响",
            "噪声；喧闹"
          ]
        ],
        [
          "n/v",
          [
            "噪音；声响",
            "噪声；喧闹"
          ]
        ]
      ]
    }
  ],
  "normal": [
    {
      "id": "normal",
      "pos": "adj",
      "meaning": "正常的；通常的",
      "forms": [
        [
          "adj",
          [
            "正常的；通常的"
          ]
        ]
      ],
      "sources": [
        [
          "question-201004-option-B",
          "adj/n",
          "正常的；常态"
        ]
      ]
    }
  ],
  "nothing": [
    {
      "id": "absence",
      "pos": "pron",
      "meaning": "没有什么；没有任何事情",
      "forms": [
        [
          "pron",
          [
            "没有什么；没有任何事情",
            "没有任何事情；没有任何措施"
          ]
        ]
      ]
    }
  ],
  "now": [
    {
      "id": "present-time",
      "pos": "adv",
      "meaning": "现在；如今",
      "forms": [
        [
          "adv",
          [
            "现在；如今",
            "如今（文中当前）",
            "如今",
            "如今；现在"
          ]
        ],
        [
          "adv/n",
          [
            "现在；如今",
            "如今",
            "如今；现在",
            "如今（文中当前）"
          ]
        ]
      ]
    }
  ],
  "number": [
    {
      "id": "quantity",
      "pos": "n",
      "meaning": "数量；数目",
      "forms": [
        [
          "n",
          [
            "数量；数目",
            "数量",
            "人数；一批人"
          ]
        ],
        [
          "n/v",
          [
            "数量；数目",
            "人数；一批人",
            "数量"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "数量；编号"
        ]
      ]
    },
    {
      "id": "label",
      "pos": "v",
      "meaning": "编号",
      "forms": [
        [
          "v",
          [
            "编号"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "数量；编号"
        ]
      ]
    }
  ],
  "obtainable": [
    {
      "id": "obtainable",
      "pos": "adj",
      "meaning": "可获得的",
      "forms": [
        [
          "adj",
          [
            "可获得的"
          ]
        ],
        [
          "",
          [
            "可达到的"
          ]
        ]
      ]
    }
  ],
  "occur": [
    {
      "id": "occur",
      "pos": "v",
      "meaning": "发生；出现",
      "forms": [
        [
          "v",
          [
            "发生；出现",
            "发生"
          ]
        ]
      ]
    }
  ],
  "offer": [
    {
      "id": "provide",
      "pos": "v",
      "meaning": "提供；提出",
      "forms": [
        [
          "v",
          [
            "提供；提出",
            "提供；呈现",
            "提供",
            "提供；带来",
            "提供；给予"
          ]
        ],
        [
          "n/v",
          [
            "提供；带来",
            "提供；给予",
            "提供",
            "提供；提出",
            "提供；呈现"
          ]
        ],
        [
          "gerund",
          [
            "提供；带来",
            "提供；给予",
            "提供",
            "提供；提出",
            "提供；呈现"
          ]
        ]
      ]
    }
  ],
  "old": [
    {
      "id": "long-existing",
      "pos": "adj",
      "meaning": "旧的；存在已久的",
      "forms": [
        [
          "adj",
          [
            "旧的；存在已久的",
            "较早建成的；旧的"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "adj",
          "古老的；年长的"
        ],
        [
          "question-4-prompt",
          "adj",
          "古老的；年长的"
        ],
        [
          "p4-s16",
          "adj",
          "古老的；年长的"
        ],
        [
          "2001-p1-s11",
          "adj",
          "古老的；年长的"
        ],
        [
          "2010-p1-s4",
          "adj",
          "古老的；年长的"
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "古老的；年长的"
        ]
      ]
    },
    {
      "id": "age",
      "pos": "adj",
      "meaning": "年长的；年龄较大的",
      "forms": [
        [
          "adj",
          [
            "年长的；年龄较大的",
            "年长的；较大的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "古老的；年长的"
        ]
      ]
    }
  ],
  "online": [
    {
      "id": "online",
      "pos": "adj",
      "meaning": "网上的；在线的",
      "forms": [
        [
          "adj",
          [
            "网上的；在线的",
            "在线；已接入网络"
          ]
        ],
        [
          "adj/adv",
          [
            "在线；已接入网络",
            "网上的；在线的"
          ]
        ]
      ]
    }
  ],
  "openly": [
    {
      "id": "openly",
      "pos": "adv",
      "meaning": "公开地；坦率地",
      "forms": [
        [
          "adv",
          [
            "公开地；坦率地",
            "公开地"
          ]
        ]
      ]
    }
  ],
  "operational": [
    {
      "id": "operation",
      "pos": "adj",
      "meaning": "运作的；运行方面的",
      "forms": [
        [
          "adj",
          [
            "运作的；运行方面的",
            "运筹的；运作方面的",
            "操作的；运行的"
          ]
        ]
      ]
    }
  ],
  "order": [
    {
      "id": "purpose-structure",
      "pos": "n",
      "meaning": "用于in order to表达目的",
      "forms": [
        [
          "n",
          [
            "用于in order to表达目的"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s4",
          "n/v",
          "订单；订购；命令"
        ],
        [
          "question-4-prompt",
          "n/v",
          "订单；订购；命令"
        ]
      ]
    },
    {
      "id": "purchase-order",
      "pos": "n",
      "meaning": "订单",
      "forms": [
        [
          "n",
          [
            "订单"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s10",
          "n/v",
          "订单；订购；命令"
        ],
        [
          "question-201015-prompt",
          "n/v",
          "订单；订购；命令"
        ]
      ]
    }
  ],
  "organization": [
    {
      "id": "organization",
      "pos": "n",
      "meaning": "组织；机构",
      "forms": [
        [
          "n",
          [
            "组织；机构",
            "组织"
          ]
        ]
      ]
    }
  ],
  "overall": [
    {
      "id": "overall",
      "pos": "adj",
      "meaning": "总体的；综合的",
      "forms": [
        [
          "adj",
          [
            "总体的；综合的",
            "整体的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s12",
          "adj/adv/n",
          "总体的；综合的"
        ]
      ]
    }
  ],
  "overseas": [
    {
      "id": "overseas",
      "pos": "adv",
      "meaning": "向海外；在海外",
      "forms": [
        [
          "adv",
          [
            "向海外；在海外",
            "向海外；海外的"
          ]
        ],
        [
          "adj/adv",
          [
            "向海外；海外的",
            "向海外；在海外"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s18",
          "adj/adv",
          "来自海外；海外的"
        ]
      ]
    }
  ],
  "overwhelming": [
    {
      "id": "overwhelming",
      "pos": "adj",
      "meaning": "压倒性的；占绝大多数的",
      "forms": [
        [
          "adj",
          [
            "压倒性的；占绝大多数的",
            "占压倒性比例的；绝大多数的"
          ]
        ]
      ]
    }
  ],
  "own": [
    {
      "id": "own",
      "pos": "adj",
      "meaning": "自己的",
      "forms": [
        [
          "adj",
          [
            "自己的",
            "自己的；拥有"
          ]
        ],
        [
          "adj/pron/v",
          [
            "自己的；拥有",
            "自己的"
          ]
        ],
        [
          "det",
          [
            "自己的",
            "自己的；拥有"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s10",
          "adj/pron/v",
          "拥有；归……所有"
        ],
        [
          "question-201137-option-B",
          "adj/pron/v",
          "拥有；归……所有"
        ],
        [
          "2012-p5-s23",
          "adj/pron/v",
          "拥有；归……所有"
        ]
      ]
    }
  ],
  "pack": [
    {
      "id": "full",
      "pos": "adj",
      "meaning": "挤满的；装满的",
      "forms": [
        [
          "adj",
          [
            "挤满的；装满的",
            "挤满人的；满座的",
            "挤满；装满"
          ]
        ]
      ]
    }
  ],
  "painful": [
    {
      "id": "painful",
      "pos": "adj",
      "meaning": "痛苦的；艰难的",
      "forms": [
        [
          "adj",
          [
            "痛苦的；艰难的",
            "痛苦的"
          ]
        ]
      ]
    }
  ],
  "para": [
    {
      "id": "paragraph",
      "pos": "n",
      "meaning": "段落（paragraph的缩写）",
      "forms": [
        [
          "n",
          [
            "段落（paragraph的缩写）",
            "段落 paragraph 的缩写",
            "段（paragraph的缩写）"
          ]
        ],
        [
          "abbreviation",
          [
            "段落（paragraph的缩写）",
            "段落 paragraph 的缩写",
            "段（paragraph的缩写）"
          ]
        ]
      ]
    }
  ],
  "parent": [
    {
      "id": "parent",
      "pos": "n",
      "meaning": "父母；家长",
      "forms": [
        [
          "n",
          [
            "父母；家长",
            "父母中的一方；家长",
            "家长；父母"
          ]
        ]
      ]
    }
  ],
  "participation": [
    {
      "id": "participation",
      "pos": "n",
      "meaning": "参加；参与",
      "forms": [
        [
          "n",
          [
            "参加；参与",
            "参与"
          ]
        ]
      ]
    }
  ],
  "particular": [
    {
      "id": "particular",
      "pos": "adj",
      "meaning": "特定的",
      "forms": [
        [
          "adj",
          [
            "特定的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s6",
          "adj/n",
          "特定的；特别之处"
        ]
      ]
    }
  ],
  "particularly": [
    {
      "id": "particularly",
      "pos": "adv",
      "meaning": "尤其；特别",
      "forms": [
        [
          "adv",
          [
            "尤其；特别",
            "格外地"
          ]
        ]
      ]
    }
  ],
  "passage": [
    {
      "id": "passage",
      "pos": "n",
      "meaning": "文章；篇章",
      "forms": [
        [
          "n",
          [
            "文章；篇章",
            "文章；段落",
            "文章"
          ]
        ]
      ]
    }
  ],
  "passion": [
    {
      "id": "passion",
      "pos": "n",
      "meaning": "激情；强烈爱好",
      "forms": [
        [
          "n",
          [
            "激情；强烈爱好",
            "热爱的事情；强烈兴趣"
          ]
        ]
      ]
    }
  ],
  "past": [
    {
      "id": "past-time",
      "pos": "n",
      "meaning": "过去",
      "forms": [
        [
          "n",
          [
            "过去"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s4",
          "adj/n/prep",
          "过去的；过去"
        ],
        [
          "2012-p5-s23",
          "adj/n/prep",
          "过去的；过去"
        ],
        [
          "2012-p5-s24",
          "adj/n/prep",
          "过去的；过去"
        ]
      ]
    },
    {
      "id": "past",
      "pos": "adj",
      "meaning": "过去的",
      "forms": [
        [
          "adj",
          [
            "过去的"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s17",
          "adj/n/prep",
          "过去的；经过；超过"
        ]
      ]
    }
  ],
  "patient": [
    {
      "id": "patient",
      "pos": "n",
      "meaning": "患者",
      "forms": [
        [
          "n",
          [
            "患者"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s4",
          "adj/n",
          "患者；耐心的"
        ],
        [
          "question-201005-prompt",
          "adj/n",
          "患者；耐心的"
        ]
      ]
    }
  ],
  "pay": [
    {
      "id": "pay",
      "pos": "v",
      "meaning": "支付；付费",
      "forms": [
        [
          "v",
          [
            "支付；付费"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s12",
          "n/v",
          "支付；付出"
        ]
      ],
      "fromNotes": [
        [
          "",
          "支付；工资"
        ]
      ]
    },
    {
      "id": "salary",
      "pos": "n",
      "meaning": "工资",
      "forms": [],
      "fromNotes": [
        [
          "",
          "支付；工资"
        ]
      ]
    },
    {
      "id": "give-attention",
      "pos": "v",
      "meaning": "给予；投入（注意力）",
      "forms": [
        [
          "v",
          [
            "给予；投入（注意力）"
          ]
        ],
        [
          "n/v",
          [
            "给予；投入（注意力）"
          ]
        ]
      ]
    }
  ],
  "percent": [
    {
      "id": "percent",
      "pos": "n",
      "meaning": "百分之……",
      "forms": [
        [
          "n",
          [
            "百分之……",
            "百分比；百分之……"
          ]
        ],
        [
          "adv/n",
          [
            "百分之……",
            "百分比；百分之……"
          ]
        ]
      ]
    }
  ],
  "perception": [
    {
      "id": "perception",
      "pos": "n",
      "meaning": "看法；感知",
      "forms": [
        [
          "n",
          [
            "看法；感知",
            "感受；认知",
            "看法；感知方式"
          ]
        ]
      ]
    }
  ],
  "personal": [
    {
      "id": "personal",
      "pos": "adj",
      "meaning": "个人的；私人的",
      "forms": [
        [
          "adj",
          [
            "个人的；私人的",
            "个人的；切身的"
          ]
        ]
      ]
    }
  ],
  "personality": [
    {
      "id": "personality",
      "pos": "n",
      "meaning": "个性；性格",
      "forms": [
        [
          "n",
          [
            "个性；性格",
            "个性；人格"
          ]
        ]
      ]
    }
  ],
  "phase": [
    {
      "id": "phase",
      "pos": "n",
      "meaning": "阶段；时期",
      "forms": [
        [
          "n",
          [
            "阶段；时期",
            "阶段"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s9",
          "n/v",
          "阶段；时期；分阶段进行"
        ]
      ]
    }
  ],
  "phrase": [
    {
      "id": "phrase",
      "pos": "n",
      "meaning": "短语；措辞；表达",
      "forms": [
        [
          "n",
          [
            "短语；措辞；表达",
            "词组；短语",
            "说法；格言"
          ]
        ]
      ]
    }
  ],
  "piece": [
    {
      "id": "artwork-unit",
      "pos": "n",
      "meaning": "一件作品",
      "forms": [
        [
          "n",
          [
            "一件作品",
            "一件艺术作品",
            "件（作品）"
          ]
        ]
      ]
    }
  ],
  "place": [
    {
      "id": "location",
      "pos": "n",
      "meaning": "地方；位置",
      "forms": [
        [
          "n",
          [
            "地方；位置",
            "位置；环境",
            "地方；国家或地区",
            "位置"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s7",
          "n/v",
          "地方；国家或地区"
        ],
        [
          "2011-cloze-s4",
          "n/v",
          "地方；国家或地区"
        ],
        [
          "question-201104-prompt",
          "n/v",
          "地方；国家或地区"
        ]
      ]
    },
    {
      "id": "in-place-of",
      "pos": "n",
      "meaning": "替代位置（in place of）",
      "forms": [
        [
          "n",
          [
            "替代位置（in place of）"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s25",
          "n/v",
          "地方；国家或地区"
        ]
      ]
    },
    {
      "id": "impose",
      "pos": "v",
      "meaning": "施加；置于",
      "forms": [
        [
          "v",
          [
            "施加；置于",
            "给予；施加"
          ]
        ]
      ]
    },
    {
      "id": "entrust",
      "pos": "v",
      "meaning": "委托出售",
      "forms": [
        [
          "v",
          [
            "委托出售"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s12",
          "n/v",
          "放置；委托"
        ]
      ]
    },
    {
      "id": "place-order",
      "pos": "v",
      "meaning": "下订单",
      "forms": [
        [
          "v",
          [
            "下订单"
          ]
        ]
      ],
      "sources": [
        [
          "question-201015-option-A",
          "n/v",
          "放置；下订单"
        ]
      ]
    }
  ],
  "plan": [
    {
      "id": "plan",
      "pos": "n",
      "meaning": "计划；规划",
      "forms": [
        [
          "n",
          [
            "计划；规划",
            "计划"
          ]
        ]
      ],
      "sources": [
        [
          "2011-cloze-s12",
          "n/v",
          "计划；规划"
        ],
        [
          "2011-cloze-s15",
          "n/v",
          "计划；规划"
        ],
        [
          "question-201116-prompt",
          "n/v",
          "计划；规划"
        ]
      ]
    },
    {
      "id": "plan",
      "pos": "v",
      "meaning": "计划；打算",
      "forms": [
        [
          "v",
          [
            "计划；打算"
          ]
        ]
      ],
      "sources": [
        [
          "question-201136-option-C",
          "n/v",
          "计划；规划"
        ]
      ]
    }
  ],
  "play": [
    {
      "id": "role",
      "pos": "v",
      "meaning": "发挥；起（作用）",
      "forms": [
        [
          "v",
          [
            "发挥；起（作用）",
            "起作用；扮演"
          ]
        ]
      ]
    }
  ],
  "policy": [
    {
      "id": "policy",
      "pos": "n",
      "meaning": "政策；方针",
      "forms": [
        [
          "n",
          [
            "政策；方针",
            "政策"
          ]
        ]
      ]
    }
  ],
  "population": [
    {
      "id": "population",
      "pos": "n",
      "meaning": "人口；种群",
      "forms": [
        [
          "n",
          [
            "人口；种群",
            "人口"
          ]
        ]
      ]
    }
  ],
  "portion": [
    {
      "id": "portion",
      "pos": "n",
      "meaning": "部分；份额",
      "forms": [
        [
          "n",
          [
            "部分；份额",
            "部分；阶段",
            "一部分；一份"
          ]
        ]
      ]
    }
  ],
  "positive": [
    {
      "id": "favourable",
      "pos": "adj",
      "meaning": "积极的；有利的",
      "forms": [
        [
          "adj",
          [
            "积极的；有利的",
            "正面的；肯定的",
            "积极肯定的"
          ]
        ]
      ]
    }
  ],
  "possible": [
    {
      "id": "possible",
      "pos": "adj",
      "meaning": "可能的；可行的",
      "forms": [
        [
          "adj",
          [
            "可能的；可行的",
            "可能的"
          ]
        ]
      ]
    }
  ],
  "potential": [
    {
      "id": "potential",
      "pos": "adj",
      "meaning": "潜在的；可能的",
      "forms": [
        [
          "adj",
          [
            "潜在的；可能的"
          ]
        ]
      ],
      "sources": [
        [
          "question-11-option-C",
          "adj/n",
          "潜在的；可能的"
        ],
        [
          "2001-p2-s7",
          "adj/n",
          "潜在的；潜力"
        ],
        [
          "2011-p5-s12",
          "adj/n",
          "潜在的；潜力"
        ]
      ]
    },
    {
      "id": "capacity",
      "pos": "n",
      "meaning": "潜力",
      "forms": [
        [
          "n",
          [
            "潜力",
            "潜力；潜在机会"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s14",
          "adj/n",
          "潜在的；潜力"
        ]
      ]
    }
  ],
  "power": [
    {
      "id": "authority",
      "pos": "n",
      "meaning": "权力；权限",
      "forms": [
        [
          "n",
          [
            "权力；权限"
          ]
        ]
      ],
      "sources": [
        [
          "question-27-option-B",
          "n/v",
          "力量；能力；供能"
        ]
      ],
      "fromNotes": [
        [
          "v",
          "能力；权力；电力；数学中的幂； 为……提供动力。"
        ]
      ]
    },
    {
      "id": "ability",
      "pos": "n",
      "meaning": "力量；能力",
      "forms": [
        [
          "n",
          [
            "力量；能力",
            "力量；影响力"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "能力；权力；电力；数学中的幂； 为……提供动力。"
        ]
      ]
    },
    {
      "id": "electricity",
      "pos": "n",
      "meaning": "电力",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "能力；权力；电力；数学中的幂； 为……提供动力。"
        ]
      ]
    },
    {
      "id": "exponent",
      "pos": "n",
      "meaning": "幂",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "能力；权力；电力；数学中的幂； 为……提供动力。"
        ]
      ]
    },
    {
      "id": "energize",
      "pos": "v",
      "meaning": "为……提供动力",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "能力；权力；电力；数学中的幂； 为……提供动力。"
        ]
      ]
    }
  ],
  "powerful": [
    {
      "id": "powerful",
      "pos": "adj",
      "meaning": "强有力的；强大的",
      "forms": [
        [
          "adj",
          [
            "强有力的；强大的",
            "强有力的",
            "高性能的；强大的",
            "强有力的；作用巨大的"
          ]
        ]
      ]
    }
  ],
  "presumably": [
    {
      "id": "presumably",
      "pos": "adv",
      "meaning": "想必；大概",
      "forms": [
        [
          "adv",
          [
            "想必；大概",
            "据推测；大概",
            "想必；按说"
          ]
        ]
      ]
    }
  ],
  "prevalent": [
    {
      "id": "prevalent",
      "pos": "adj",
      "meaning": "流行的；普遍的",
      "forms": [
        [
          "adj",
          [
            "流行的；普遍的",
            "普遍存在的"
          ]
        ]
      ]
    }
  ],
  "price": [
    {
      "id": "price",
      "pos": "n",
      "meaning": "价格",
      "forms": [
        [
          "n",
          [
            "价格"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s14",
          "n/v",
          "价格；定价"
        ]
      ]
    }
  ],
  "pride": [
    {
      "id": "pride",
      "pos": "n",
      "meaning": "自豪；自负",
      "forms": [
        [
          "n",
          [
            "自豪；自负",
            "自豪"
          ]
        ],
        [
          "n/v",
          [
            "自豪；自负",
            "自豪"
          ]
        ]
      ]
    }
  ],
  "principle": [
    {
      "id": "principle",
      "pos": "n",
      "meaning": "原则；基本主张",
      "forms": [
        [
          "n",
          [
            "原则；基本主张",
            "原则"
          ]
        ]
      ]
    }
  ],
  "probably": [
    {
      "id": "probably",
      "pos": "adv",
      "meaning": "很可能；大概",
      "forms": [
        [
          "adv",
          [
            "很可能；大概",
            "很可能"
          ]
        ]
      ]
    }
  ],
  "proceed": [
    {
      "id": "proceed",
      "pos": "v",
      "meaning": "继续；前进",
      "forms": [
        [
          "v",
          [
            "继续；前进",
            "继续前往"
          ]
        ]
      ]
    }
  ],
  "produce": [
    {
      "id": "produce",
      "pos": "v",
      "meaning": "产生；生产",
      "forms": [
        [
          "v",
          [
            "产生；生产",
            "产生；排放",
            "制定；推出"
          ]
        ]
      ]
    }
  ],
  "product": [
    {
      "id": "product",
      "pos": "n",
      "meaning": "产品",
      "forms": [
        [
          "n",
          [
            "产品",
            "产品；报纸产品"
          ]
        ]
      ]
    }
  ],
  "productivity": [
    {
      "id": "productivity",
      "pos": "n",
      "meaning": "生产率；生产效率",
      "forms": [
        [
          "n",
          [
            "生产率；生产效率",
            "生产率；生产力"
          ]
        ]
      ]
    }
  ],
  "profit": [
    {
      "id": "profit",
      "pos": "n",
      "meaning": "利润；盈利",
      "forms": [
        [
          "n",
          [
            "利润；盈利",
            "利润",
            "利润；收益",
            "利润；获利"
          ]
        ]
      ]
    }
  ],
  "progress": [
    {
      "id": "progress",
      "pos": "n",
      "meaning": "进步；发展",
      "forms": [
        [
          "n",
          [
            "进步；发展"
          ]
        ],
        [
          "不可数名词",
          [
            "进步；发展"
          ]
        ]
      ],
      "sources": [
        [
          "question-201006-option-A",
          "n/v",
          "进步；发展"
        ]
      ]
    }
  ],
  "project": [
    {
      "id": "project",
      "pos": "n",
      "meaning": "项目；计划",
      "forms": [
        [
          "n",
          [
            "项目；计划",
            "欧洲一体化计划"
          ]
        ]
      ]
    }
  ],
  "prominent": [
    {
      "id": "prominent",
      "pos": "adj",
      "meaning": "引人注目的；显著的",
      "forms": [
        [
          "adj",
          [
            "引人注目的；显著的",
            "重要而引人注目的"
          ]
        ]
      ]
    }
  ],
  "properly": [
    {
      "id": "properly",
      "pos": "adv",
      "meaning": "恰当地；妥善地",
      "forms": [
        [
          "adv",
          [
            "恰当地；妥善地",
            "恰当地；合理地"
          ]
        ]
      ]
    }
  ],
  "proposal": [
    {
      "id": "proposal",
      "pos": "n",
      "meaning": "提案；建议；方案",
      "forms": [
        [
          "n",
          [
            "提案；建议；方案",
            "提案；建议"
          ]
        ]
      ]
    }
  ],
  "prosperity": [
    {
      "id": "prosperity",
      "pos": "n",
      "meaning": "繁荣；富裕",
      "forms": [
        [
          "n",
          [
            "繁荣；富裕",
            "繁荣"
          ]
        ]
      ]
    }
  ],
  "prove": [
    {
      "id": "prove",
      "pos": "v",
      "meaning": "证明是；结果表明是",
      "forms": [
        [
          "v",
          [
            "证明是；结果表明是",
            "结果显得；证明是"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "结果表明是；证明"
        ]
      ]
    },
    {
      "id": "demonstrate",
      "pos": "v",
      "meaning": "证明",
      "forms": [
        [
          "v",
          [
            "证明"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "结果表明是；证明"
        ]
      ]
    }
  ],
  "publicity": [
    {
      "id": "publicity",
      "pos": "n",
      "meaning": "公开报道；媒体曝光",
      "forms": [
        [
          "n",
          [
            "公开报道；媒体曝光",
            "公开报道；曝光"
          ]
        ]
      ]
    }
  ],
  "purpose": [
    {
      "id": "purpose",
      "pos": "n",
      "meaning": "目的；目标",
      "forms": [
        [
          "n",
          [
            "目的；目标",
            "志向；目标",
            "目的；用途"
          ]
        ]
      ]
    }
  ],
  "put": [
    {
      "id": "state",
      "pos": "v",
      "meaning": "置于；使处于",
      "forms": [
        [
          "v",
          [
            "置于；使处于",
            "使处于；造成"
          ]
        ]
      ]
    }
  ],
  "quantity": [
    {
      "id": "quantity",
      "pos": "n",
      "meaning": "量；数量",
      "forms": [
        [
          "n",
          [
            "量；数量"
          ]
        ],
        [
          "",
          [
            "量；定量"
          ]
        ]
      ]
    }
  ],
  "quickly": [
    {
      "id": "quickly",
      "pos": "adv",
      "meaning": "迅速地；立刻",
      "forms": [
        [
          "adv",
          [
            "迅速地；立刻",
            "迅速地"
          ]
        ]
      ]
    }
  ],
  "race": [
    {
      "id": "race",
      "pos": "n",
      "meaning": "种族；族群",
      "forms": [
        [
          "n",
          [
            "种族；族群",
            "种族"
          ]
        ]
      ]
    }
  ],
  "ratio": [
    {
      "id": "ratio",
      "pos": "n",
      "meaning": "比率；比例",
      "forms": [
        [
          "n",
          [
            "比率；比例",
            "比率"
          ]
        ]
      ]
    }
  ],
  "reach": [
    {
      "id": "reach",
      "pos": "v",
      "meaning": "达到；到达",
      "forms": [
        [
          "v",
          [
            "达到；到达",
            "到达；达到"
          ]
        ],
        [
          "past participle",
          [
            "到达；达到",
            "达到；到达"
          ]
        ],
        [
          "n/v",
          [
            "达到；到达",
            "到达；达到"
          ]
        ]
      ]
    }
  ],
  "readership": [
    {
      "id": "readership",
      "pos": "n",
      "meaning": "读者群；读者数量",
      "forms": [
        [
          "n",
          [
            "读者群；读者数量",
            "读者群"
          ]
        ]
      ]
    }
  ],
  "reality": [
    {
      "id": "reality",
      "pos": "n",
      "meaning": "现实",
      "forms": [
        [
          "n",
          [
            "现实",
            "现实情况"
          ]
        ]
      ]
    }
  ],
  "reason": [
    {
      "id": "reason",
      "pos": "n",
      "meaning": "理由；原因",
      "forms": [
        [
          "n",
          [
            "理由；原因"
          ]
        ],
        [
          "n/v",
          [
            "理由；原因"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s3",
          "n/v",
          "理由；原因；推理"
        ]
      ]
    }
  ],
  "receive": [
    {
      "id": "receive",
      "pos": "v",
      "meaning": "收到；受到",
      "forms": [
        [
          "v",
          [
            "收到；受到",
            "收到；获得",
            "受到"
          ]
        ]
      ]
    }
  ],
  "reckon": [
    {
      "id": "estimate",
      "pos": "v",
      "meaning": "估计；估算",
      "forms": [
        [
          "v",
          [
            "估计；估算",
            "估计；认为",
            "估计；判断"
          ]
        ]
      ]
    },
    {
      "id": "consider",
      "pos": "v",
      "meaning": "认为；视为",
      "forms": [
        [
          "v",
          [
            "认为；视为"
          ]
        ]
      ]
    }
  ],
  "record": [
    {
      "id": "record",
      "pos": "n",
      "meaning": "记录；记载",
      "forms": [
        [
          "n",
          [
            "记录；记载",
            "记录；过往行为记录",
            "记录"
          ]
        ]
      ],
      "sources": [
        [
          "question-201241-option-E",
          "n/v",
          "纪录；记录"
        ]
      ]
    },
    {
      "id": "best-ever",
      "pos": "n",
      "meaning": "最高纪录",
      "forms": [
        [
          "n",
          [
            "最高纪录"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s2",
          "n/v",
          "纪录；记录"
        ]
      ]
    }
  ],
  "reduce": [
    {
      "id": "reduce",
      "pos": "v",
      "meaning": "降低；减少",
      "forms": [
        [
          "v",
          [
            "降低；减少",
            "降低",
            "减少"
          ]
        ]
      ]
    }
  ],
  "reduction": [
    {
      "id": "reduction",
      "pos": "n",
      "meaning": "减少；下降",
      "forms": [
        [
          "n",
          [
            "减少；下降",
            "减少；减排"
          ]
        ]
      ]
    }
  ],
  "regard": [
    {
      "id": "esteem",
      "pos": "v",
      "meaning": "重视；评价",
      "forms": [
        [
          "v",
          [
            "重视；评价"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s1",
          "v",
          "看待；评价"
        ],
        [
          "question-27-prompt",
          "v",
          "评价；看待"
        ]
      ]
    },
    {
      "id": "consider",
      "pos": "v",
      "meaning": "看待；评价",
      "forms": [
        [
          "v",
          [
            "看待；评价"
          ]
        ]
      ],
      "sources": [
        [
          "question-201227-option-B",
          "v",
          "把……视为；看待；关心"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "把……视为；看待；关心"
        ]
      ]
    },
    {
      "id": "care",
      "pos": "v",
      "meaning": "关心",
      "forms": [
        [
          "v",
          [
            "关心"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "把……视为；看待；关心"
        ]
      ]
    }
  ],
  "regularly": [
    {
      "id": "regularly",
      "pos": "adv",
      "meaning": "有规律地；经常",
      "forms": [
        [
          "adv",
          [
            "有规律地；经常",
            "经常地；常态化地"
          ]
        ]
      ]
    }
  ],
  "reinforce": [
    {
      "id": "reinforce",
      "pos": "v",
      "meaning": "加强；强化",
      "forms": [
        [
          "v",
          [
            "加强；强化",
            "强化；加深",
            "加强；进一步巩固"
          ]
        ]
      ]
    }
  ],
  "remember": [
    {
      "id": "remember",
      "pos": "v",
      "meaning": "记得；回忆起",
      "forms": [
        [
          "v",
          [
            "记得；回忆起",
            "记住；记得"
          ]
        ]
      ]
    }
  ],
  "remove": [
    {
      "id": "remove",
      "pos": "v",
      "meaning": "移除；消除",
      "forms": [
        [
          "v",
          [
            "移除；消除",
            "夺走；使流失"
          ]
        ]
      ]
    }
  ],
  "represent": [
    {
      "id": "represent",
      "pos": "v",
      "meaning": "体现；代表",
      "forms": [
        [
          "v",
          [
            "体现；代表",
            "表现；代表"
          ]
        ]
      ]
    }
  ],
  "requirement": [
    {
      "id": "requirement",
      "pos": "n",
      "meaning": "要求；必要条件",
      "forms": [
        [
          "n",
          [
            "要求；必要条件",
            "要求"
          ]
        ]
      ]
    }
  ],
  "respect": [
    {
      "id": "aspect",
      "pos": "n",
      "meaning": "方面",
      "forms": [
        [
          "n",
          [
            "方面",
            "方面；关于"
          ]
        ],
        [
          "n/v",
          [
            "方面；关于",
            "方面"
          ]
        ]
      ]
    },
    {
      "id": "esteem",
      "pos": "n",
      "meaning": "尊重；敬意",
      "forms": [
        [
          "n",
          [
            "尊重；敬意",
            "尊重"
          ]
        ],
        [
          "",
          [
            "尊重；敬意"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "尊敬、尊重（名词/动词）；顾及、遵守（respect rules）。in respect of关于。"
        ],
        [
          "",
          "尊重；敬意"
        ]
      ]
    },
    {
      "id": "esteem",
      "pos": "v",
      "meaning": "尊敬；尊重",
      "forms": [],
      "fromNotes": [
        [
          "",
          "尊敬、尊重（名词/动词）；顾及、遵守（respect rules）。in respect of关于。"
        ]
      ]
    },
    {
      "id": "observe",
      "pos": "v",
      "meaning": "顾及；遵守",
      "forms": [],
      "fromNotes": [
        [
          "",
          "尊敬、尊重（名词/动词）；顾及、遵守（respect rules）。in respect of关于。"
        ]
      ]
    }
  ],
  "response": [
    {
      "id": "response",
      "pos": "n",
      "meaning": "反应；回应",
      "forms": [
        [
          "n",
          [
            "反应；回应",
            "回应；应对办法",
            "反应"
          ]
        ]
      ]
    }
  ],
  "return": [
    {
      "id": "reward",
      "pos": "n",
      "meaning": "回报；回应",
      "forms": [
        [
          "n",
          [
            "回报；回应",
            "回报"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "返回；回归；回报"
        ]
      ]
    },
    {
      "id": "go-back",
      "pos": "v",
      "meaning": "返回",
      "forms": [
        [
          "v",
          [
            "返回"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s19",
          "n/v",
          "恢复；返回"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "返回；回归；回报"
        ]
      ]
    },
    {
      "id": "return",
      "pos": "n",
      "meaning": "回归；恢复",
      "forms": [
        [
          "n",
          [
            "回归；恢复"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "返回；回归；回报"
        ]
      ]
    }
  ],
  "richard": [
    {
      "id": "name",
      "pos": "n",
      "meaning": "理查德",
      "forms": [
        [
          "n",
          [
            "理查德",
            "理查德（人名）"
          ]
        ]
      ]
    }
  ],
  "ride": [
    {
      "id": "ride",
      "pos": "v",
      "meaning": "骑乘；乘坐",
      "forms": [
        [
          "v",
          [
            "骑乘；乘坐",
            "骑乘",
            "骑；乘坐"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "骑；乘坐；依靠"
        ]
      ]
    },
    {
      "id": "depend",
      "pos": "v",
      "meaning": "依靠",
      "forms": [
        [
          "v",
          [
            "依靠"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "骑；乘坐；依靠"
        ]
      ]
    }
  ],
  "right": [
    {
      "id": "entitlement",
      "pos": "n",
      "meaning": "权利",
      "forms": [
        [
          "n",
          [
            "权利",
            "权利；正确的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/adv/n",
          "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
        ],
        [
          "adj/adv/n",
          "权利；正确的"
        ]
      ]
    },
    {
      "id": "correct",
      "pos": "adj",
      "meaning": "正确的",
      "forms": [],
      "fromNotes": [
        [
          "adj/adv/n",
          "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
        ],
        [
          "adj/adv/n",
          "权利；正确的"
        ]
      ]
    },
    {
      "id": "right-side",
      "pos": "adj",
      "meaning": "右边的",
      "forms": [],
      "fromNotes": [
        [
          "adj/adv/n",
          "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
        ]
      ]
    },
    {
      "id": "right-side",
      "pos": "n",
      "meaning": "右侧",
      "forms": [
        [
          "n",
          [
            "右侧"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/adv/n",
          "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
        ]
      ]
    },
    {
      "id": "exactly",
      "pos": "adv",
      "meaning": "恰好；完全",
      "forms": [],
      "fromNotes": [
        [
          "adj/adv/n",
          "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
        ]
      ]
    }
  ],
  "rigid": [
    {
      "id": "rigid",
      "pos": "adj",
      "meaning": "僵化的；严格的",
      "forms": [
        [
          "adj",
          [
            "僵化的；严格的",
            "严苛的；僵硬的"
          ]
        ]
      ]
    }
  ],
  "ritual": [
    {
      "id": "ritual",
      "pos": "n",
      "meaning": "惯例；仪式性程序",
      "forms": [
        [
          "n",
          [
            "惯例；仪式性程序",
            "固定程序；惯常行为"
          ]
        ]
      ]
    }
  ],
  "role": [
    {
      "id": "role",
      "pos": "n",
      "meaning": "角色；职责；作用",
      "forms": [
        [
          "n",
          [
            "角色；职责；作用",
            "作用",
            "角色；职责",
            "职责；作用"
          ]
        ]
      ]
    }
  ],
  "roughly": [
    {
      "id": "roughly",
      "pos": "adv",
      "meaning": "大约；大致",
      "forms": [
        [
          "adv",
          [
            "大约；大致",
            "大致；粗略地",
            "大约"
          ]
        ]
      ]
    }
  ],
  "routine": [
    {
      "id": "routine",
      "pos": "adj",
      "meaning": "例行的；惯常的",
      "forms": [
        [
          "adj",
          [
            "例行的；惯常的",
            "例行的",
            "常见的；惯常的"
          ]
        ]
      ]
    }
  ],
  "rule": [
    {
      "id": "rule",
      "pos": "n",
      "meaning": "规则；规定",
      "forms": [
        [
          "n",
          [
            "规则；规定",
            "规定"
          ]
        ]
      ]
    },
    {
      "id": "judge",
      "pos": "v",
      "meaning": "裁定；判决",
      "forms": [
        [
          "v",
          [
            "裁定；判决",
            "裁定"
          ]
        ]
      ]
    }
  ],
  "safe": [
    {
      "id": "safe",
      "pos": "adj",
      "meaning": "安全的；可靠的",
      "forms": [
        [
          "adj",
          [
            "安全的；可靠的",
            "安全可靠的",
            "安全的"
          ]
        ]
      ]
    }
  ],
  "san": [
    {
      "id": "name-part",
      "pos": "proper-name part",
      "meaning": "圣（地名组成部分）",
      "forms": [
        [
          "proper-name part",
          [
            "圣（地名组成部分）",
            "旧金山名称的组成部分"
          ]
        ]
      ]
    }
  ],
  "science": [
    {
      "id": "science",
      "pos": "n",
      "meaning": "科学；学科",
      "forms": [
        [
          "n",
          [
            "科学；学科",
            "科学；科学学科",
            "科学"
          ]
        ]
      ]
    }
  ],
  "scientist": [
    {
      "id": "scientist",
      "pos": "n",
      "meaning": "科学家；研究者",
      "forms": [
        [
          "n",
          [
            "科学家；研究者",
            "科学家",
            "科学家；本句为政治学研究者",
            "研究者；学者"
          ]
        ]
      ]
    }
  ],
  "scornful": [
    {
      "id": "scornful",
      "pos": "adj",
      "meaning": "轻蔑的；鄙视的",
      "forms": [
        [
          "adj",
          [
            "轻蔑的；鄙视的",
            "轻蔑的"
          ]
        ]
      ]
    }
  ],
  "second": [
    {
      "id": "ordinal",
      "pos": "num",
      "meaning": "第二",
      "forms": [
        [
          "num",
          [
            "第二"
          ]
        ],
        [
          "adj/n",
          [
            "第二"
          ]
        ],
        [
          "ordinal numeral",
          [
            "第二"
          ]
        ]
      ]
    }
  ],
  "secretary": [
    {
      "id": "minister",
      "pos": "n",
      "meaning": "大臣；部长",
      "forms": [
        [
          "n",
          [
            "大臣；部长",
            "部长；大臣（此处国务卿）"
          ]
        ]
      ]
    }
  ],
  "selection": [
    {
      "id": "selection",
      "pos": "n",
      "meaning": "选择；选拔",
      "forms": [
        [
          "n",
          [
            "选择；选拔",
            "选择；筛选",
            "遴选；选拔"
          ]
        ]
      ]
    }
  ],
  "self-sufficient": [
    {
      "id": "self-sufficient",
      "pos": "adj",
      "meaning": "自给自足的",
      "forms": [
        [
          "adj",
          [
            "自给自足的"
          ]
        ],
        [
          "",
          [
            "能够独立生活的"
          ]
        ]
      ]
    }
  ],
  "sell": [
    {
      "id": "sell",
      "pos": "v",
      "meaning": "售出；出售",
      "forms": [
        [
          "v",
          [
            "售出；出售",
            "销售；卖"
          ]
        ]
      ]
    }
  ],
  "semiconductor": [
    {
      "id": "semiconductor",
      "pos": "n",
      "meaning": "半导体",
      "forms": [
        [
          "n",
          [
            "半导体",
            "半导体；半导体的"
          ]
        ],
        [
          "名词作定语",
          [
            "半导体"
          ]
        ],
        [
          "adj/n",
          [
            "半导体",
            "半导体；半导体的"
          ]
        ]
      ]
    }
  ],
  "separate": [
    {
      "id": "separate",
      "pos": "v",
      "meaning": "分离；分开",
      "forms": [
        [
          "v",
          [
            "分离；分开",
            "分隔；使相距"
          ]
        ]
      ]
    }
  ],
  "service": [
    {
      "id": "service",
      "pos": "n",
      "meaning": "服务",
      "forms": [
        [
          "n",
          [
            "服务",
            "服务；在线功能"
          ]
        ]
      ]
    }
  ],
  "shift": [
    {
      "id": "change",
      "pos": "v",
      "meaning": "变化；转变",
      "forms": [
        [
          "v",
          [
            "变化；转变",
            "转变；在……之间转换"
          ]
        ],
        [
          "n/v",
          [
            "转变；在……之间转换",
            "变化；转变"
          ]
        ]
      ]
    }
  ],
  "shrink": [
    {
      "id": "shrink",
      "pos": "v",
      "meaning": "缩小；收缩",
      "forms": [
        [
          "v",
          [
            "缩小；收缩",
            "萎缩；缩小"
          ]
        ]
      ]
    }
  ],
  "sign": [
    {
      "id": "indication",
      "pos": "n",
      "meaning": "迹象；标志",
      "forms": [
        [
          "n",
          [
            "迹象；标志",
            "标志",
            "迹象"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "标志；迹象；签名"
        ]
      ]
    },
    {
      "id": "sign",
      "pos": "v",
      "meaning": "签名；署名",
      "forms": [
        [
          "v",
          [
            "签名；署名"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "标志；迹象；签名"
        ]
      ]
    }
  ],
  "simply": [
    {
      "id": "restriction",
      "pos": "adv",
      "meaning": "仅仅；只是",
      "forms": [
        [
          "adv",
          [
            "仅仅；只是",
            "只是"
          ]
        ]
      ]
    }
  ],
  "situation": [
    {
      "id": "situation",
      "pos": "n",
      "meaning": "情况；情境",
      "forms": [
        [
          "n",
          [
            "情况；情境",
            "场合；情境",
            "处境；局面"
          ]
        ]
      ]
    }
  ],
  "size": [
    {
      "id": "size",
      "pos": "n",
      "meaning": "规模；大小",
      "forms": [
        [
          "n",
          [
            "规模；大小",
            "大小；尺寸",
            "规模；体量"
          ]
        ],
        [
          "n/v",
          [
            "规模；大小",
            "规模；体量",
            "大小；尺寸"
          ]
        ]
      ]
    }
  ],
  "skilled": [
    {
      "id": "skilled",
      "pos": "adj",
      "meaning": "技术娴熟的；有专业技能的",
      "forms": [
        [
          "adj",
          [
            "技术娴熟的；有专业技能的",
            "技术娴熟的",
            "有专业技能的",
            "熟练的；有技能的"
          ]
        ]
      ]
    }
  ],
  "so-called": [
    {
      "id": "so-called",
      "pos": "adj",
      "meaning": "所谓的",
      "forms": [
        [
          "adj",
          [
            "所谓的",
            "所谓的；通常所称的"
          ]
        ]
      ]
    }
  ],
  "something": [
    {
      "id": "something",
      "pos": "pron",
      "meaning": "某事；某物",
      "forms": [
        [
          "pron",
          [
            "某事；某物",
            "某些事情；某些问题"
          ]
        ]
      ]
    }
  ],
  "special": [
    {
      "id": "special",
      "pos": "adj",
      "meaning": "特殊的；特别的",
      "forms": [
        [
          "adj",
          [
            "特殊的；特别的",
            "特殊的"
          ]
        ]
      ]
    }
  ],
  "species": [
    {
      "id": "species",
      "pos": "n",
      "meaning": "物种；种类",
      "forms": [
        [
          "n",
          [
            "物种；种类",
            "物种"
          ]
        ]
      ]
    }
  ],
  "split": [
    {
      "id": "split",
      "pos": "v",
      "meaning": "分割；拆分",
      "forms": [
        [
          "v",
          [
            "分割；拆分",
            "划分；分开",
            "拆分；分割"
          ]
        ],
        [
          "n/v",
          [
            "拆分；分割",
            "分割；拆分"
          ]
        ]
      ]
    }
  ],
  "spread": [
    {
      "id": "extend",
      "pos": "v",
      "meaning": "铺展；伸展开",
      "forms": [
        [
          "v",
          [
            "铺展；伸展开",
            "延展；持续展开"
          ]
        ]
      ]
    },
    {
      "id": "spread",
      "pos": "v",
      "meaning": "传播；推广",
      "forms": [
        [
          "v",
          [
            "传播；推广",
            "推广；扩大覆盖"
          ]
        ]
      ]
    }
  ],
  "stage": [
    {
      "id": "stage",
      "pos": "n",
      "meaning": "阶段",
      "forms": [
        [
          "n",
          [
            "阶段",
            "发展阶段"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "阶段；上演"
        ]
      ]
    },
    {
      "id": "perform",
      "pos": "v",
      "meaning": "上演",
      "forms": [
        [
          "v",
          [
            "上演"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "阶段；上演"
        ]
      ]
    }
  ],
  "step": [
    {
      "id": "step",
      "pos": "n",
      "meaning": "步骤；措施",
      "forms": [
        [
          "n",
          [
            "步骤；措施",
            "步骤"
          ]
        ]
      ]
    }
  ],
  "stereotypical": [
    {
      "id": "stereotypical",
      "pos": "adj",
      "meaning": "老套的；刻板印象式的",
      "forms": [
        [
          "adj",
          [
            "老套的；刻板印象式的",
            "模式化的；惯常形象的"
          ]
        ]
      ]
    }
  ],
  "story": [
    {
      "id": "story",
      "pos": "n",
      "meaning": "故事；讲述",
      "forms": [
        [
          "n",
          [
            "故事；讲述",
            "讲述；故事",
            "故事；经历"
          ]
        ]
      ]
    }
  ],
  "strength": [
    {
      "id": "strength",
      "pos": "n",
      "meaning": "实力；力量；强度",
      "forms": [
        [
          "n",
          [
            "实力；力量；强度",
            "实力"
          ]
        ]
      ]
    }
  ],
  "subsidy": [
    {
      "id": "subsidy",
      "pos": "n",
      "meaning": "补贴；津贴",
      "forms": [
        [
          "n",
          [
            "补贴；津贴",
            "补贴",
            "补贴；资助"
          ]
        ]
      ]
    }
  ],
  "suicide": [
    {
      "id": "suicide",
      "pos": "n",
      "meaning": "自杀；自我毁灭",
      "forms": [
        [
          "n",
          [
            "自杀；自我毁灭",
            "自我毁灭；自杀",
            "自杀事件"
          ]
        ]
      ]
    }
  ],
  "survival": [
    {
      "id": "survival",
      "pos": "n",
      "meaning": "生存；存活",
      "forms": [
        [
          "n",
          [
            "生存；存活",
            "存活",
            "生存"
          ]
        ]
      ]
    }
  ],
  "survive": [
    {
      "id": "survive",
      "pos": "v",
      "meaning": "存活",
      "forms": [
        [
          "v",
          [
            "存活",
            "生存；幸存"
          ]
        ],
        [
          "gerund",
          [
            "存活"
          ]
        ]
      ]
    }
  ],
  "one": [
    {
      "id": "single",
      "pos": "num",
      "meaning": "一个；一",
      "forms": [
        [
          "num",
          [
            "一个；一"
          ]
        ]
      ],
      "sources": [
        [
          "p1-s9",
          "det/pron",
          "一个；某一个",
          "one"
        ],
        [
          "p1-s17",
          "det/pron",
          "一个；某一个",
          "one"
        ],
        [
          "p2-s10",
          "numeral",
          "一个",
          "one"
        ],
        [
          "2001-p1-s2",
          "det",
          "一个；单个",
          "one"
        ],
        [
          "2001-p1-s14",
          "number",
          "一（个）",
          "one"
        ],
        [
          "2001-p2-s9",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "2010-cloze-s9",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "question-201013-prompt",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "2010-p2-s2",
          "det",
          "一位（男子）",
          "one"
        ],
        [
          "2010-p5-s14",
          "pron",
          "一个；之一",
          "one"
        ],
        [
          "2011-cloze-s4",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "question-201106-prompt",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "2011-p1-s10",
          "determiner",
          "一份",
          "one"
        ],
        [
          "2011-p4-s5",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "question-201223-prompt",
          "det",
          "一个；一项",
          "one"
        ],
        [
          "2012-p2-s2",
          "det/num",
          "一个；一种",
          "one"
        ]
      ]
    },
    {
      "id": "substitute",
      "pos": "pron",
      "meaning": "同类中的一个；替代前述事物",
      "forms": [
        [
          "pron",
          [
            "同类中的一个；替代前述事物",
            "那些同类事物（地方学会）",
            "那些措施",
            "那些住宅",
            "另一种方案",
            "这一次衰退"
          ]
        ]
      ],
      "sources": [
        [
          "question-200122-option-D",
          "pron",
          "那些同类事物（地方学会）",
          "ones"
        ],
        [
          "2011-cloze-s8",
          "det/pron",
          "另一种方案",
          "one"
        ],
        [
          "2011-p2-s19",
          "pron",
          "那些措施",
          "ones"
        ],
        [
          "2011-p3-s14",
          "pron",
          "那些住宅",
          "ones"
        ],
        [
          "2012-p4-s11",
          "det/pron",
          "这一次衰退",
          "one"
        ]
      ]
    },
    {
      "id": "one-of",
      "pos": "pron",
      "meaning": "其中一个",
      "forms": [
        [
          "pron",
          [
            "其中一个"
          ]
        ]
      ],
      "sources": [
        [
          "question-16-option-D",
          "pron",
          "一个",
          "one"
        ],
        [
          "2001-p1-s3",
          "pron",
          "一项；其中之一",
          "one"
        ],
        [
          "2010-p1-s4",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ],
        [
          "2010-p3-s8",
          "pron",
          "一种",
          "one"
        ],
        [
          "2010-p5-s21",
          "pron",
          "一个；之一",
          "one"
        ],
        [
          "2012-p2-s18",
          "num/pron",
          "一个；其中之一",
          "one"
        ]
      ]
    },
    {
      "id": "indefinite-person",
      "pos": "pron",
      "meaning": "一个人；任何人",
      "forms": [
        [
          "pron",
          [
            "一个人；任何人"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s1",
          "possessive determiner form",
          "前面提到的那一类/那些",
          "one's"
        ],
        [
          "2012-p4-s4",
          "det/pron",
          "前面提到的那一类/那些",
          "one"
        ]
      ]
    }
  ],
  "patent": [
    {
      "id": "patent",
      "pos": "n",
      "meaning": "专利",
      "forms": [
        [
          "n",
          [
            "专利"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p3-s2",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s7",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s11",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s13",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s16",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s19",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s21",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "2012-p3-s23",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "question-201232-prompt",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "question-201232-option-C",
          "n/v",
          "专利；授予专利",
          "patents"
        ],
        [
          "question-201233-prompt",
          "n/v",
          "专利；授予专利",
          "patents"
        ]
      ]
    },
    {
      "id": "grant-patent",
      "pos": "v",
      "meaning": "授予专利",
      "forms": [
        [
          "v",
          [
            "授予专利"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p3-s2",
          "n/v",
          "专利；授予专利",
          "patented"
        ],
        [
          "2012-p3-s11",
          "v",
          "专利；授予专利",
          "patented"
        ],
        [
          "2012-p3-s19",
          "v",
          "专利；授予专利",
          "patented"
        ],
        [
          "question-201231-option-D",
          "gerund",
          "专利；授予专利",
          "patenting"
        ],
        [
          "question-201234-option-C",
          "gerund",
          "专利；授予专利",
          "patenting"
        ],
        [
          "question-201235-prompt",
          "gerund",
          "专利；授予专利",
          "patenting"
        ]
      ]
    }
  ],
  "perfect": [
    {
      "id": "perfect",
      "pos": "v",
      "meaning": "使完善；熟练掌握",
      "forms": [
        [
          "v",
          [
            "使完善；熟练掌握"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p3-s1",
          "v",
          "使完善；熟练掌握"
        ],
        [
          "question-201034-option-A",
          "过去分词作定语",
          "完善的"
        ]
      ]
    }
  ],
  "picture": [
    {
      "id": "overview",
      "pos": "n",
      "meaning": "整体图景；全局",
      "forms": [
        [
          "n",
          [
            "整体图景；全局"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s10",
          "n/v",
          "整体图景；全局"
        ]
      ]
    }
  ],
  "poor": [
    {
      "id": "poverty",
      "pos": "adj",
      "meaning": "贫困的",
      "forms": [
        [
          "adj",
          [
            "贫困的"
          ]
        ]
      ],
      "sources": [
        [
          "question-16-option-B",
          "名词化形容词",
          "穷人"
        ]
      ]
    },
    {
      "id": "lack-information",
      "pos": "adj",
      "meaning": "信息匮乏的",
      "forms": [
        [
          "adj",
          [
            "信息匮乏的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s1",
          "adj/n",
          "信息资源匮乏的；贫困的"
        ]
      ]
    }
  ],
  "present": [
    {
      "id": "show",
      "pos": "v",
      "meaning": "展示；陈述",
      "forms": [
        [
          "v",
          [
            "展示；陈述",
            "把……呈现为"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p2-s3",
          "v",
          "把……呈现为"
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "礼物； 在场的、目前的； 提交、颁发。present A as B 在本文为“把 A 呈现为 B”。"
        ],
        [
          "adj/n/v",
          "呈现；在场的；礼物"
        ],
        [
          "adj/n/v",
          "当前的；现在；呈现"
        ]
      ]
    },
    {
      "id": "give",
      "pos": "v",
      "meaning": "授予；呈交；赠送",
      "forms": [
        [
          "v",
          [
            "授予；呈交；赠送",
            "呈现；呈交"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "礼物； 在场的、目前的； 提交、颁发。present A as B 在本文为“把 A 呈现为 B”。"
        ],
        [
          "adj/n/v",
          "呈现；在场的；礼物"
        ]
      ],
      "sources": []
    },
    {
      "id": "now",
      "pos": "adj",
      "meaning": "当前的",
      "forms": [
        [
          "adj",
          [
            "当前的"
          ]
        ]
      ],
      "sources": [],
      "fromNotes": [
        [
          "adj/n",
          "现在；当前的"
        ],
        [
          "adj/n/v",
          "当前的；现在；呈现"
        ]
      ]
    },
    {
      "id": "gift",
      "pos": "n",
      "meaning": "礼物",
      "forms": [],
      "fromNotes": [
        [
          "adj/n/v",
          "礼物； 在场的、目前的； 提交、颁发。present A as B 在本文为“把 A 呈现为 B”。"
        ]
      ],
      "sources": []
    },
    {
      "id": "attendance",
      "pos": "adj",
      "meaning": "在场的；存在的",
      "forms": [],
      "fromNotes": [
        [
          "adj/n/v",
          "礼物； 在场的、目前的； 提交、颁发。present A as B 在本文为“把 A 呈现为 B”。"
        ]
      ],
      "sources": []
    },
    {
      "id": "now",
      "pos": "n",
      "meaning": "现在",
      "forms": [],
      "fromNotes": [
        [
          "adj/n",
          "现在；当前的"
        ],
        [
          "adj/n/v",
          "当前的；现在；呈现"
        ]
      ]
    }
  ],
  "press": [
    {
      "id": "news-media",
      "pos": "n",
      "meaning": "新闻界；报界",
      "forms": [
        [
          "n",
          [
            "新闻界；报界",
            "新闻界；报刊"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s2",
          "n",
          "新闻界；报界"
        ],
        [
          "2001-cloze-s6",
          "n/v",
          "新闻界；报刊"
        ],
        [
          "question-200102-prompt",
          "n",
          "新闻界；报界"
        ],
        [
          "question-200116-prompt",
          "n/v",
          "新闻界；报刊"
        ]
      ]
    }
  ],
  "pretty": [
    {
      "id": "degree",
      "pos": "adv",
      "meaning": "相当；颇",
      "forms": [
        [
          "adv",
          [
            "相当；颇"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s15",
          "adj/adv",
          "相当；漂亮的"
        ]
      ]
    },
    {
      "id": "attractive",
      "pos": "adj",
      "meaning": "漂亮的",
      "forms": [
        [
          "adj",
          [
            "漂亮的",
            "漂亮的；这里题目式地指粉红审美"
          ]
        ]
      ]
    }
  ],
  "private": [
    {
      "id": "non-state",
      "pos": "adj",
      "meaning": "私营的；非政府的",
      "forms": [
        [
          "adj",
          [
            "私营的；非政府的"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s9",
          "adj",
          "私人的；私立的"
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "私人的；私立的"
        ]
      ]
    },
    {
      "id": "personal",
      "pos": "adj",
      "meaning": "私人的",
      "forms": [
        [
          "adj",
          [
            "私人的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "私人的；私立的"
        ]
      ]
    }
  ],
  "production": [
    {
      "id": "production",
      "pos": "n",
      "meaning": "生产；产出",
      "forms": [
        [
          "n",
          [
            "生产；产出",
            "生产；产量",
            "产出；生产",
            "产出；产物"
          ]
        ],
        [
          "",
          [
            "产量",
            "制作"
          ]
        ]
      ]
    }
  ],
  "professional": [
    {
      "id": "professional-person",
      "pos": "n",
      "meaning": "专业人士",
      "forms": [
        [
          "n",
          [
            "专业人士"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s5",
          "n",
          "专业人士；专业的"
        ],
        [
          "2001-p1-s10",
          "n",
          "专业人士；专业的"
        ],
        [
          "question-200122-option-B",
          "n",
          "专业人士；专业的"
        ],
        [
          "question-200122-option-C",
          "n",
          "专业人士；专业的"
        ],
        [
          "question-200123-option-D",
          "n",
          "专业人士；专业的"
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "专业人士；专业的"
        ]
      ]
    },
    {
      "id": "professional",
      "pos": "adj",
      "meaning": "专业的",
      "forms": [
        [
          "adj",
          [
            "专业的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "专业人士；专业的"
        ]
      ]
    }
  ],
  "prompt": [
    {
      "id": "cause",
      "pos": "v",
      "meaning": "促使",
      "forms": [
        [
          "v",
          [
            "促使"
          ]
        ]
      ],
      "sources": [
        [
          "question-201002-option-D",
          "adj/n/v",
          "促使；迅速的；提示"
        ]
      ],
      "fromNotes": [
        [
          "v",
          "促使：prompt somebody to do促使某人做；提醒、提示。"
        ]
      ]
    },
    {
      "id": "hint",
      "pos": "n",
      "meaning": "提示；提词；提示符",
      "forms": [],
      "fromNotes": [
        [
          "n",
          "提示、提词；计算机提示符或对话提示词。"
        ]
      ]
    },
    {
      "id": "remind",
      "pos": "v",
      "meaning": "提醒；提示",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "促使：prompt somebody to do促使某人做；提醒、提示。"
        ]
      ]
    }
  ],
  "property": [
    {
      "id": "possession",
      "pos": "n",
      "meaning": "财产",
      "forms": [
        [
          "n",
          [
            "财产"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s7",
          "n",
          "财产；性质"
        ]
      ],
      "fromNotes": [
        [
          "n",
          "财产；特性"
        ],
        [
          "n",
          "财产；性质"
        ]
      ]
    },
    {
      "id": "quality",
      "pos": "n",
      "meaning": "性质；特性",
      "forms": [
        [
          "n",
          [
            "性质；特性"
          ]
        ],
        [
          "",
          [
            "性质；特性"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "财产；特性"
        ],
        [
          "n",
          "财产；性质"
        ]
      ]
    }
  ],
  "public": [
    {
      "id": "public",
      "pos": "adj",
      "meaning": "公共的；公众的",
      "forms": [
        [
          "adj",
          [
            "公共的；公众的",
            "公开的",
            "公共场合的",
            "公共的",
            "公开的；面向公众的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s5",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2011-cloze-s16",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2011-p5-s1",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2011-p5-s2",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2011-p5-s18",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2012-p5-s12",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "2012-p5-s28",
          "adj/n",
          "公开的；公众的"
        ],
        [
          "question-201241-option-B",
          "adj/n",
          "公开的；公众的"
        ]
      ]
    }
  ],
  "publication": [
    {
      "id": "publication",
      "pos": "n",
      "meaning": "出版物；刊物",
      "forms": [
        [
          "n",
          [
            "出版物；刊物",
            "出版物；发表"
          ]
        ]
      ]
    }
  ],
  "question": [
    {
      "id": "question",
      "pos": "n",
      "meaning": "问题；疑问",
      "forms": [
        [
          "n",
          [
            "问题；疑问"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s13",
          "n/v",
          "问题；疑问；质疑"
        ],
        [
          "2011-p4-s2",
          "n/v",
          "问题；疑问；质疑"
        ]
      ]
    },
    {
      "id": "inquire",
      "pos": "v",
      "meaning": "询问；审问",
      "forms": [
        [
          "v",
          [
            "询问；审问"
          ]
        ]
      ],
      "sources": [
        [
          "question-201213-option-D",
          "v",
          "询问；审问；质疑"
        ]
      ]
    }
  ],
  "rate": [
    {
      "id": "ratio",
      "pos": "n",
      "meaning": "比率",
      "forms": [
        [
          "n",
          [
            "比率"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s8",
          "n/v",
          "比率；速度；评价"
        ],
        [
          "p4-s17",
          "n/v",
          "比率；速度；评价"
        ],
        [
          "2011-p4-s13",
          "n",
          "比率；速度；评价"
        ],
        [
          "2011-p5-s4",
          "n",
          "比率；速度；评价"
        ],
        [
          "question-9-option-C",
          "n/v",
          "比率；速度；评价"
        ]
      ]
    }
  ],
  "regulation": [
    {
      "id": "rules",
      "pos": "n",
      "meaning": "规章；规定",
      "forms": [
        [
          "n",
          [
            "规章；规定"
          ]
        ]
      ],
      "sources": [
        [
          "question-201138-option-B",
          "n",
          "监管；规章"
        ],
        [
          "2011-p5-s2",
          "n",
          "监管；规章"
        ]
      ],
      "fromNotes": [
        [
          "n",
          "监管；规章"
        ]
      ]
    },
    {
      "id": "regulation",
      "pos": "n",
      "meaning": "监管",
      "forms": [
        [
          "n",
          [
            "监管"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s3",
          "n",
          "监管；规章"
        ],
        [
          "question-200108-prompt",
          "n",
          "监管；规章"
        ],
        [
          "2011-p5-s19",
          "n",
          "监管；规章"
        ]
      ],
      "fromNotes": [
        [
          "n",
          "监管；规章"
        ]
      ]
    }
  ],
  "relate": [
    {
      "id": "connect",
      "pos": "v",
      "meaning": "相关的；有关联的",
      "forms": [
        [
          "v",
          [
            "相关的；有关联的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s3",
          "adj/v",
          "关联；联系；讲述"
        ],
        [
          "2012-p3-s22",
          "adj/v",
          "关联；联系；讲述"
        ]
      ],
      "fromNotes": [
        [
          "v",
          "关联；联系；讲述"
        ]
      ]
    },
    {
      "id": "narrate",
      "pos": "v",
      "meaning": "讲述",
      "forms": [
        [
          "v",
          [
            "讲述"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "关联；联系；讲述"
        ]
      ]
    }
  ],
  "release": [
    {
      "id": "release",
      "pos": "v",
      "meaning": "调拨；投放",
      "forms": [
        [
          "v",
          [
            "调拨；投放"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s10",
          "n/v",
          "释放；投放"
        ],
        [
          "question-201014-option-A",
          "n/v",
          "从储备中调拨、投放"
        ]
      ]
    },
    {
      "id": "publish",
      "pos": "v",
      "meaning": "发布",
      "forms": [
        [
          "v",
          [
            "发布"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "发布；释放"
        ]
      ]
    },
    {
      "id": "free",
      "pos": "v",
      "meaning": "释放",
      "forms": [
        [
          "v",
          [
            "释放"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "发布；释放"
        ]
      ]
    }
  ],
  "research": [
    {
      "id": "research",
      "pos": "n",
      "meaning": "研究；调查",
      "forms": [
        [
          "n",
          [
            "研究；调查"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s10",
          "n/v",
          "研究；调查"
        ],
        [
          "2010-p1-s6",
          "n/v",
          "研究"
        ],
        [
          "2012-p4-s13",
          "n/v",
          "研究；调查"
        ],
        [
          "question-201239-prompt",
          "n/v",
          "研究；调查"
        ]
      ]
    }
  ],
  "result": [
    {
      "id": "result",
      "pos": "n",
      "meaning": "结果",
      "forms": [
        [
          "n",
          [
            "结果"
          ]
        ]
      ],
      "sources": [
        [
          "p5-s12",
          "n/v",
          "结果；后果；导致"
        ]
      ]
    }
  ],
  "rich": [
    {
      "id": "wealth",
      "pos": "adj",
      "meaning": "富裕的",
      "forms": [
        [
          "adj",
          [
            "富裕的"
          ]
        ]
      ],
      "sources": [
        [
          "question-16-option-B",
          "名词化形容词",
          "富人"
        ],
        [
          "question-27-option-D",
          "adj",
          "富人"
        ]
      ]
    },
    {
      "id": "information-rich",
      "pos": "adj",
      "meaning": "信息丰富的",
      "forms": [
        [
          "adj",
          [
            "信息丰富的",
            "信息资源丰富的群体"
          ]
        ],
        [
          "adj/n",
          [
            "信息资源丰富的群体",
            "信息丰富的"
          ]
        ]
      ]
    }
  ],
  "rise": [
    {
      "id": "increase",
      "pos": "n",
      "meaning": "增加；上升",
      "forms": [
        [
          "n",
          [
            "增加；上升"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s3",
          "n/v",
          "增加；上升",
          "rise"
        ]
      ]
    },
    {
      "id": "increase",
      "pos": "v",
      "meaning": "上涨；上升",
      "forms": [
        [
          "v",
          [
            "上涨；上升"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s3",
          "n/v",
          "增加；上升",
          "rising"
        ],
        [
          "question-201003-prompt",
          "n/v",
          "上升；增加",
          "rising"
        ],
        [
          "2010-p1-s5",
          "n/v",
          "上涨；上升",
          "rising"
        ]
      ]
    },
    {
      "id": "achieve-success",
      "pos": "v",
      "meaning": "攀上巅峰；取得成功",
      "forms": [
        [
          "v",
          [
            "攀上巅峰；取得成功"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s8",
          "n/v",
          "攀上巅峰；取得成功",
          "rising"
        ]
      ]
    }
  ],
  "run": [
    {
      "id": "continued-period",
      "pos": "n",
      "meaning": "一段持续行情",
      "forms": [
        [
          "n",
          [
            "一段持续行情"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s1",
          "n/v",
          "一段持续行情"
        ]
      ]
    },
    {
      "id": "run",
      "pos": "v",
      "meaning": "跑",
      "forms": [],
      "fromNotes": [
        [
          "",
          "跑；延伸；竞选"
        ]
      ]
    },
    {
      "id": "extend",
      "pos": "v",
      "meaning": "延伸",
      "forms": [],
      "fromNotes": [
        [
          "",
          "跑；延伸；竞选"
        ]
      ]
    },
    {
      "id": "campaign",
      "pos": "v",
      "meaning": "竞选",
      "forms": [],
      "fromNotes": [
        [
          "",
          "跑；延伸；竞选"
        ]
      ]
    },
    {
      "id": "manage",
      "pos": "v",
      "meaning": "运营；经营",
      "forms": [
        [
          "v",
          [
            "运营；经营"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "经营；运作"
        ]
      ]
    },
    {
      "id": "operate",
      "pos": "v",
      "meaning": "运行；运转",
      "forms": [
        [
          "v",
          [
            "运行；运转"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "经营；运作"
        ]
      ]
    }
  ],
  "sale": [
    {
      "id": "auction",
      "pos": "n",
      "meaning": "拍卖",
      "forms": [
        [
          "n",
          [
            "拍卖"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s1",
          "n",
          "拍卖专场；销售情况"
        ],
        [
          "2010-p1-s2",
          "n",
          "拍卖专场；销售情况"
        ],
        [
          "2010-p1-s9",
          "n",
          "拍卖专场；销售情况"
        ]
      ]
    },
    {
      "id": "sales",
      "pos": "n",
      "meaning": "销售；销售额",
      "forms": [
        [
          "n",
          [
            "销售；销售额"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s11",
          "n",
          "拍卖专场；销售情况"
        ],
        [
          "2010-p1-s12",
          "n",
          "拍卖专场；销售情况"
        ]
      ]
    }
  ],
  "search": [
    {
      "id": "search",
      "pos": "v",
      "meaning": "寻找；搜索",
      "forms": [
        [
          "v",
          [
            "寻找；搜索"
          ]
        ]
      ],
      "sources": [
        [
          "question-8-option-A",
          "n/v",
          "寻找；搜索"
        ]
      ]
    }
  ],
  "see": [
    {
      "id": "perceive",
      "pos": "v",
      "meaning": "看到；观察到",
      "forms": [
        [
          "v",
          [
            "看到；观察到",
            "看到；了解",
            "看到；经历"
          ]
        ]
      ]
    }
  ],
  "seek": [
    {
      "id": "attempt",
      "pos": "v",
      "meaning": "试图",
      "forms": [
        [
          "v",
          [
            "试图",
            "寻求；试图"
          ]
        ],
        [
          "",
          [
            "试图"
          ]
        ]
      ]
    }
  ],
  "select": [
    {
      "id": "selected",
      "pos": "adj",
      "meaning": "特别选定的",
      "forms": [
        [
          "adj",
          [
            "特别选定的"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s3",
          "adj/v",
          "特别选定的；挑选"
        ]
      ]
    }
  ],
  "sentence": [
    {
      "id": "text-sentence",
      "pos": "n",
      "meaning": "句子",
      "forms": [
        [
          "n",
          [
            "句子"
          ]
        ]
      ],
      "sources": [
        [
          "question-28-prompt",
          "n/v",
          "句子；判决；宣判"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "刑罚；判刑；句子"
        ]
      ]
    },
    {
      "id": "penalty",
      "pos": "n",
      "meaning": "刑期",
      "forms": [
        [
          "n",
          [
            "刑期"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s7",
          "n/v",
          "判刑；刑期",
          "sentences"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "刑罚；判刑；句子"
        ]
      ]
    },
    {
      "id": "condemn",
      "pos": "v",
      "meaning": "判刑",
      "forms": [
        [
          "v",
          [
            "判刑"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s7",
          "n/v",
          "判刑；刑期",
          "sentenced"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "刑罚；判刑；句子"
        ]
      ]
    }
  ],
  "serve": [
    {
      "id": "service",
      "pos": "v",
      "meaning": "任职；服务",
      "forms": [
        [
          "v",
          [
            "任职；服务",
            "服役"
          ]
        ]
      ]
    }
  ],
  "set": [
    {
      "id": "establish",
      "pos": "v",
      "meaning": "制定；确立",
      "forms": [
        [
          "v",
          [
            "制定；确立"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s13",
          "v",
          "设定；阐明"
        ],
        [
          "question-201141-option-F",
          "v",
          "设定；阐明"
        ],
        [
          "2012-p1-s17",
          "gerund",
          "制定；确立"
        ]
      ]
    },
    {
      "id": "place",
      "pos": "v",
      "meaning": "设置；使处于",
      "forms": [
        [
          "v",
          [
            "设置；使处于"
          ]
        ],
        [
          "n/v",
          [
            "设置；使处于"
          ]
        ]
      ]
    }
  ],
  "several": [
    {
      "id": "several",
      "pos": "det",
      "meaning": "若干；几个",
      "forms": [
        [
          "det",
          [
            "若干；几个",
            "数个；若干"
          ]
        ],
        [
          "det/pron",
          [
            "若干；几个",
            "数个；若干"
          ]
        ]
      ]
    }
  ],
  "share": [
    {
      "id": "hold-in-common",
      "pos": "v",
      "meaning": "认同；共同持有",
      "forms": [
        [
          "v",
          [
            "认同；共同持有"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p4-s5",
          "n/v",
          "共同使用"
        ],
        [
          "2012-cloze-s15",
          "adj/v",
          "分享；共同拥有；份额"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "分享；共同拥有；份额"
        ]
      ]
    },
    {
      "id": "share",
      "pos": "n",
      "meaning": "份额",
      "forms": [
        [
          "n",
          [
            "份额",
            "应当分担的份额"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "分享；共同拥有；份额"
        ]
      ]
    }
  ],
  "sharp": [
    {
      "id": "sudden",
      "pos": "adj",
      "meaning": "急剧的",
      "forms": [
        [
          "adj",
          [
            "急剧的"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s3",
          "adj/adv",
          "急剧的；尖锐的"
        ]
      ]
    }
  ],
  "sleep": [
    {
      "id": "sleep",
      "pos": "v",
      "meaning": "睡觉；睡眠",
      "forms": [
        [
          "v",
          [
            "睡觉；睡眠"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s2",
          "n/v",
          "睡觉；睡眠"
        ]
      ]
    }
  ],
  "social": [
    {
      "id": "societal",
      "pos": "adj",
      "meaning": "社会的",
      "forms": [
        [
          "adj",
          [
            "社会的"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s1",
          "adj",
          "社会的；社交的"
        ],
        [
          "p4-s4",
          "adj",
          "社会的；社交的"
        ],
        [
          "question-25-option-A",
          "adj",
          "社会的；社交的"
        ],
        [
          "2011-p4-s13",
          "adj",
          "社会的；社交的"
        ],
        [
          "2011-p5-s19",
          "adj",
          "社会的；社交的"
        ],
        [
          "2012-p4-s16",
          "adj",
          "社会的；社交的"
        ],
        [
          "2012-p4-s17",
          "adj",
          "社会的；社交的"
        ],
        [
          "2012-p5-s22",
          "adj",
          "社会的；社交的"
        ],
        [
          "question-24-option-A",
          "adj",
          "社会的；社交的"
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "社会的；社交的"
        ]
      ]
    },
    {
      "id": "interpersonal",
      "pos": "adj",
      "meaning": "社交的",
      "forms": [
        [
          "adj",
          [
            "社交的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "社会的；社交的"
        ]
      ]
    }
  ],
  "sort": [
    {
      "id": "kind",
      "pos": "n",
      "meaning": "种类",
      "forms": [
        [
          "n",
          [
            "种类"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s9",
          "n/v",
          "种类；分类"
        ]
      ]
    }
  ],
  "sound": [
    {
      "id": "sound",
      "pos": "n",
      "meaning": "声音",
      "forms": [
        [
          "n",
          [
            "声音"
          ]
        ]
      ],
      "sources": [
        [
          "p3-s8",
          "n",
          "声音；听起来"
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "声音；听起来"
        ]
      ]
    },
    {
      "id": "seem",
      "pos": "v",
      "meaning": "听起来",
      "forms": [
        [
          "v",
          [
            "听起来"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "声音；听起来"
        ]
      ]
    }
  ],
  "spend": [
    {
      "id": "expenditure",
      "pos": "n",
      "meaning": "花费；支出",
      "forms": [
        [
          "n",
          [
            "花费；支出"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s9",
          "n/v",
          "花钱；消费"
        ],
        [
          "2011-p4-s8",
          "gerund",
          "花钱；消费"
        ]
      ]
    },
    {
      "id": "time",
      "pos": "v",
      "meaning": "度过",
      "forms": [
        [
          "v",
          [
            "度过"
          ]
        ]
      ],
      "sources": [
        [
          "2010-translation-s3",
          "v",
          "花费；度过"
        ]
      ]
    }
  ],
  "state": [
    {
      "id": "region",
      "pos": "n",
      "meaning": "州；邦",
      "forms": [
        [
          "n",
          [
            "州；邦",
            "州；国家（国名组成）"
          ]
        ],
        [
          "n/v",
          [
            "州；国家（国名组成）",
            "州；邦"
          ]
        ]
      ],
      "sources": [
        [
          "2010-cloze-s6",
          "n",
          "州；状态"
        ],
        [
          "2010-cloze-s7",
          "n",
          "州；状态"
        ],
        [
          "2010-cloze-s8",
          "n",
          "州；状态"
        ],
        [
          "2010-cloze-s10",
          "n",
          "州；状态"
        ],
        [
          "question-201011-prompt",
          "n",
          "州；状态"
        ],
        [
          "question-201015-prompt",
          "n",
          "州；状态"
        ],
        [
          "2012-cloze-s9",
          "n",
          "国家事务（secretary of state）",
          "states"
        ]
      ]
    },
    {
      "id": "affairs",
      "pos": "n",
      "meaning": "国家事务",
      "forms": [
        [
          "n",
          [
            "国家事务"
          ]
        ]
      ],
      "sources": [
        [
          "2012-cloze-s9",
          "n/v",
          "国家事务（secretary of state）",
          "state"
        ]
      ]
    }
  ],
  "stay": [
    {
      "id": "remain",
      "pos": "v",
      "meaning": "保持（某种状态）",
      "forms": [
        [
          "v",
          [
            "保持（某种状态）",
            "保持"
          ]
        ]
      ],
      "sources": [
        [
          "question-201009-option-A",
          "n/v",
          "停留；保持"
        ],
        [
          "2010-p1-s10",
          "v",
          "保持；停留"
        ],
        [
          "question-201022-option-B",
          "v",
          "保持（某种状态）；停留"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "保持；停留"
        ]
      ]
    },
    {
      "id": "stay",
      "pos": "v",
      "meaning": "停留",
      "forms": [
        [
          "v",
          [
            "停留"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "保持；停留"
        ]
      ]
    }
  ],
  "stop": [
    {
      "id": "stop",
      "pos": "v",
      "meaning": "停止",
      "forms": [
        [
          "v",
          [
            "停止"
          ]
        ]
      ],
      "sources": [
        [
          "2010-p1-s13",
          "n/v",
          "停止"
        ],
        [
          "2011-p5-s3",
          "n/v",
          "句号；停止"
        ],
        [
          "2011-p5-s15",
          "n/v",
          "句号；停止"
        ],
        [
          "2012-p4-s9",
          "n/v",
          "句号；停止"
        ]
      ]
    }
  ],
  "storm": [
    {
      "id": "outburst",
      "pos": "n",
      "meaning": "一阵强烈反应",
      "forms": [
        [
          "n",
          [
            "一阵强烈反应"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s4",
          "n/v",
          "风暴；强烈爆发"
        ]
      ]
    }
  ],
  "structure": [
    {
      "id": "structure",
      "pos": "n",
      "meaning": "结构",
      "forms": [
        [
          "n",
          [
            "结构"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s16",
          "n/v",
          "结构；调整结构"
        ]
      ]
    }
  ],
  "struggle": [
    {
      "id": "struggle",
      "pos": "n",
      "meaning": "斗争；抗争",
      "forms": [
        [
          "n",
          [
            "斗争；抗争"
          ]
        ]
      ],
      "sources": [
        [
          "2012-p5-s21",
          "n/v",
          "斗争；抗争"
        ],
        [
          "question-201241-option-E",
          "n/v",
          "斗争；抗争"
        ]
      ]
    },
    {
      "id": "struggle",
      "pos": "v",
      "meaning": "艰难挣扎；苦苦应对",
      "forms": [
        [
          "v",
          [
            "艰难挣扎；苦苦应对"
          ]
        ],
        [
          "n/v",
          [
            "艰难挣扎；苦苦应对"
          ]
        ]
      ]
    }
  ],
  "study": [
    {
      "id": "study",
      "pos": "v",
      "meaning": "研究",
      "forms": [
        [
          "v",
          [
            "研究"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p2-s16",
          "n/v",
          "研究；考察"
        ]
      ]
    }
  ],
  "subject": [
    {
      "id": "topic",
      "pos": "n",
      "meaning": "主题；话题；研究对象",
      "forms": [
        [
          "n",
          [
            "主题；话题；研究对象"
          ]
        ]
      ],
      "sources": [
        [
          "2001-p1-s2",
          "adj/n/v",
          "主题；学科内容"
        ]
      ],
      "fromNotes": [
        [
          "adj/v",
          "主题；语法主语；实验对象。 subject to受……影响、取决于； subject A to B使A遭受B。"
        ]
      ]
    },
    {
      "id": "grammar",
      "pos": "n",
      "meaning": "主语",
      "forms": [],
      "fromNotes": [
        [
          "adj/v",
          "主题；语法主语；实验对象。 subject to受……影响、取决于； subject A to B使A遭受B。"
        ]
      ]
    },
    {
      "id": "participant",
      "pos": "n",
      "meaning": "实验对象",
      "forms": [],
      "fromNotes": [
        [
          "adj/v",
          "主题；语法主语；实验对象。 subject to受……影响、取决于； subject A to B使A遭受B。"
        ]
      ]
    },
    {
      "id": "expose",
      "pos": "v",
      "meaning": "使遭受；使经受",
      "forms": [],
      "fromNotes": [
        [
          "adj/v",
          "主题；语法主语；实验对象。 subject to受……影响、取决于； subject A to B使A遭受B。"
        ]
      ]
    }
  ],
  "suppose": [
    {
      "id": "obligation",
      "pos": "v",
      "meaning": "按职责应当（be supposed to）",
      "forms": [
        [
          "v",
          [
            "按职责应当（be supposed to）"
          ]
        ]
      ],
      "sources": [
        [
          "question-201038-option-C",
          "v",
          "认为；预设"
        ]
      ]
    }
  ],
  "surplus": [
    {
      "id": "surplus",
      "pos": "n",
      "meaning": "剩余；余粮",
      "forms": [
        [
          "n",
          [
            "剩余；余粮"
          ]
        ],
        [
          "",
          [
            "盈余"
          ]
        ]
      ],
      "sources": [
        [
          "cloze-s3",
          "adj/n",
          "剩余；余粮"
        ],
        [
          "cloze-s4",
          "adj/n",
          "剩余；余粮"
        ],
        [
          "cloze-s6",
          "adj/n",
          "剩余；余粮"
        ],
        [
          "question-2-prompt",
          "adj/n",
          "剩余；余粮"
        ]
      ]
    }
  ],
  "survey": [
    {
      "id": "survey",
      "pos": "n",
      "meaning": "调查",
      "forms": [
        [
          "n",
          [
            "调查"
          ]
        ]
      ],
      "sources": [
        [
          "p4-s5",
          "n/v",
          "调查；调查研究"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "调查；概览"
        ]
      ]
    },
    {
      "id": "overview",
      "pos": "n",
      "meaning": "概览",
      "forms": [
        [
          "n",
          [
            "概览"
          ]
        ]
      ],
      "sources": [
        [
          "question-19-option-A",
          "n",
          "调查；概览"
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "调查；概览"
        ]
      ]
    },
    {
      "id": "survey",
      "pos": "v",
      "meaning": "调查",
      "forms": [
        [
          "v",
          [
            "调查"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "调查；概览"
        ]
      ]
    }
  ],
  "report": [
    {
      "id": "report",
      "pos": "n",
      "meaning": "报告；报道",
      "forms": [
        [
          "n",
          [
            "报告；报道",
            "报道；传闻",
            "报告；此处report card为成绩单"
          ]
        ]
      ],
      "sources": [
        [
          "2001-cloze-s3",
          "n/v",
          "报告；报道"
        ],
        [
          "question-200107-prompt",
          "n/v",
          "报告；报道"
        ],
        [
          "2010-p1-s17",
          "n/v",
          "报道；报告"
        ],
        [
          "2012-cloze-s14",
          "n/v",
          "报告；报道"
        ]
      ]
    }
  ],
  "register": [
    {
      "id": "register",
      "pos": "v",
      "meaning": "注册；登记",
      "forms": [
        [
          "v",
          [
            "注册；登记"
          ]
        ]
      ],
      "sources": [
        [
          "2011-cloze-s7",
          "adj",
          "注册；登记"
        ]
      ]
    }
  ],
  "success": [
    {
      "id": "success",
      "pos": "n",
      "meaning": "成功",
      "forms": [
        [
          "n",
          [
            "成功"
          ]
        ],
        [
          "",
          [
            "a success：成功的人或事",
            "可数复数 successes：多次成功 / 成功案例"
          ]
        ]
      ]
    }
  ],
  "nerve": [
    {
      "id": "anatomical-nerve",
      "pos": "n",
      "meaning": "神经",
      "forms": [],
      "fromNotes": [
        [
          "",
          "神经；紧张不安（常用nerves）；冷静的勇气，如lose one's nerve失去勇气。"
        ]
      ]
    },
    {
      "id": "nervousness",
      "pos": "n",
      "meaning": "紧张不安",
      "forms": [],
      "fromNotes": [
        [
          "",
          "神经；紧张不安（常用nerves）；冷静的勇气，如lose one's nerve失去勇气。"
        ]
      ]
    },
    {
      "id": "courage",
      "pos": "n",
      "meaning": "胆量；勇气",
      "forms": [
        [
          "n",
          [
            "胆量；勇气",
            "胆量；冒失的勇气"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "神经；紧张不安（常用nerves）；冷静的勇气，如lose one's nerve失去勇气。"
        ]
      ]
    }
  ],
  "net": [
    {
      "id": "net",
      "pos": "n",
      "meaning": "网",
      "forms": [],
      "fromNotes": [
        [
          "",
          "网；净得"
        ]
      ]
    },
    {
      "id": "earn-net",
      "pos": "v",
      "meaning": "净得",
      "forms": [],
      "fromNotes": [
        [
          "",
          "网；净得"
        ]
      ]
    },
    {
      "id": "connect",
      "pos": "v",
      "meaning": "连接成网络",
      "forms": [
        [
          "v",
          [
            "连接成网络",
            "把……连接成网络"
          ]
        ],
        [
          "n/v",
          [
            "把……连接成网络",
            "连接成网络"
          ]
        ]
      ]
    }
  ],
  "outlet": [
    {
      "id": "opening",
      "pos": "n",
      "meaning": "出口；排水口",
      "forms": [],
      "fromNotes": [
        [
          "",
          "出口、排水口；电源插座；情绪宣泄途径，如an outlet for creativity发挥创造力的途径。"
        ]
      ]
    },
    {
      "id": "socket",
      "pos": "n",
      "meaning": "电源插座",
      "forms": [],
      "fromNotes": [
        [
          "",
          "出口、排水口；电源插座；情绪宣泄途径，如an outlet for creativity发挥创造力的途径。"
        ]
      ]
    },
    {
      "id": "expression",
      "pos": "n",
      "meaning": "情绪或创造力的表达途径",
      "forms": [],
      "fromNotes": [
        [
          "",
          "出口、排水口；电源插座；情绪宣泄途径，如an outlet for creativity发挥创造力的途径。"
        ]
      ]
    }
  ],
  "parallel": [
    {
      "id": "parallel",
      "pos": "adj",
      "meaning": "平行的；同时发生的",
      "forms": [],
      "fromNotes": [
        [
          "adj/n",
          "平行的；同时发生的； 相似之处、对应事物。draw a parallel作类比。"
        ]
      ]
    },
    {
      "id": "similarity",
      "pos": "n",
      "meaning": "相似之处；对应事物",
      "forms": [],
      "fromNotes": [
        [
          "adj/n",
          "平行的；同时发生的； 相似之处、对应事物。draw a parallel作类比。"
        ]
      ]
    }
  ],
  "partner": [
    {
      "id": "business-partner",
      "pos": "n",
      "meaning": "合伙人",
      "forms": [],
      "fromNotes": [
        [
          "",
          "合伙人；伴侣；搭档"
        ]
      ]
    },
    {
      "id": "companion",
      "pos": "n",
      "meaning": "伴侣",
      "forms": [],
      "fromNotes": [
        [
          "",
          "合伙人；伴侣；搭档"
        ]
      ]
    },
    {
      "id": "partner",
      "pos": "n",
      "meaning": "伙伴；搭档",
      "forms": [
        [
          "n",
          [
            "伙伴；搭档",
            "伙伴"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "合伙人；伴侣；搭档"
        ]
      ]
    }
  ],
  "paper": [
    {
      "id": "material",
      "pos": "n",
      "meaning": "纸张",
      "forms": [],
      "fromNotes": [
        [
          "n",
          "不可数 纸张；可数 论文、试卷、文件。语境不同不要一律译成报纸。"
        ]
      ]
    },
    {
      "id": "research",
      "pos": "n",
      "meaning": "论文",
      "forms": [
        [
          "n",
          [
            "论文",
            "研究论文"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "不可数 纸张；可数 论文、试卷、文件。语境不同不要一律译成报纸。"
        ]
      ]
    },
    {
      "id": "exam",
      "pos": "n",
      "meaning": "试卷",
      "forms": [],
      "fromNotes": [
        [
          "n",
          "不可数 纸张；可数 论文、试卷、文件。语境不同不要一律译成报纸。"
        ]
      ]
    },
    {
      "id": "document",
      "pos": "n",
      "meaning": "文件",
      "forms": [
        [
          "n",
          [
            "文件",
            "政府白皮书"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "不可数 纸张；可数 论文、试卷、文件。语境不同不要一律译成报纸。"
        ]
      ]
    }
  ],
  "point": [
    {
      "id": "argument",
      "pos": "n",
      "meaning": "要点；观点",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "要点或观点：the main point主要论点；意义：the point of doing做某事的意义； 指向：point to指向；指出：point out。"
        ]
      ]
    },
    {
      "id": "purpose",
      "pos": "n",
      "meaning": "意义",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "要点或观点：the main point主要论点；意义：the point of doing做某事的意义； 指向：point to指向；指出：point out。"
        ]
      ]
    },
    {
      "id": "indicate",
      "pos": "v",
      "meaning": "指向；指出",
      "forms": [
        [
          "v",
          [
            "指向；指出",
            "指出",
            "表明；指向"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "要点或观点：the main point主要论点；意义：the point of doing做某事的意义； 指向：point to指向；指出：point out。"
        ]
      ]
    }
  ],
  "position": [
    {
      "id": "location",
      "pos": "n",
      "meaning": "位置",
      "forms": [
        [
          "n",
          [
            "位置"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "位置；姿势；立场。take a position on就某事表明立场。"
        ]
      ]
    },
    {
      "id": "posture",
      "pos": "n",
      "meaning": "姿势",
      "forms": [],
      "fromNotes": [
        [
          "",
          "位置；姿势；立场。take a position on就某事表明立场。"
        ]
      ]
    },
    {
      "id": "stance",
      "pos": "n",
      "meaning": "立场",
      "forms": [],
      "fromNotes": [
        [
          "",
          "位置；姿势；立场。take a position on就某事表明立场。"
        ]
      ]
    }
  ],
  "post": [
    {
      "id": "position",
      "pos": "n",
      "meaning": "职位；岗位",
      "forms": [
        [
          "n",
          [
            "职位；岗位",
            "职位；职务"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
        ]
      ]
    },
    {
      "id": "mail",
      "pos": "n",
      "meaning": "邮政",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
        ]
      ]
    },
    {
      "id": "pole",
      "pos": "n",
      "meaning": "柱子",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
        ]
      ]
    },
    {
      "id": "message",
      "pos": "n",
      "meaning": "网络帖子",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
        ]
      ]
    },
    {
      "id": "send",
      "pos": "v",
      "meaning": "邮寄；发布",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
        ]
      ]
    }
  ],
  "privilege": [
    {
      "id": "privilege",
      "pos": "n",
      "meaning": "特权；特殊待遇",
      "forms": [],
      "fromNotes": [
        [
          "n",
          "特权；特殊待遇；荣幸。It is a privilege to do有幸做某事。"
        ]
      ]
    },
    {
      "id": "honour",
      "pos": "n",
      "meaning": "荣幸",
      "forms": [],
      "fromNotes": [
        [
          "n",
          "特权；特殊待遇；荣幸。It is a privilege to do有幸做某事。"
        ]
      ]
    }
  ],
  "rest": [
    {
      "id": "rest",
      "pos": "n",
      "meaning": "休息；休息时间",
      "forms": [],
      "fromNotes": [
        [
          "",
          "休息；休息时间。rest on以……为基础，与the rest of余下部分不同。"
        ]
      ]
    },
    {
      "id": "depend",
      "pos": "v",
      "meaning": "依靠；以……为基础（rest on）",
      "forms": [
        [
          "v",
          [
            "依靠；以……为基础（rest on）",
            "依靠；建立在……基础上"
          ]
        ],
        [
          "n/v",
          [
            "依靠；建立在……基础上",
            "依靠；以……为基础（rest on）"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "休息；休息时间。rest on以……为基础，与the rest of余下部分不同。"
        ]
      ]
    }
  ],
  "room": [
    {
      "id": "space",
      "pos": "n",
      "meaning": "余地；空间",
      "forms": [],
      "fromNotes": [
        [
          "",
          "不可数名词：余地、空间，如 room for improvement（改进空间）"
        ]
      ]
    },
    {
      "id": "room",
      "pos": "n",
      "meaning": "房间；室",
      "forms": [
        [
          "n",
          [
            "房间；室"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "房间；客厅；满屋的人"
        ]
      ]
    },
    {
      "id": "occupants",
      "pos": "n",
      "meaning": "满屋的人",
      "forms": [
        [
          "n",
          [
            "满屋的人"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "房间；客厅；满屋的人"
        ]
      ]
    }
  ],
  "sanction": [
    {
      "id": "approval",
      "pos": "n",
      "meaning": "正式批准；认可",
      "forms": [],
      "fromNotes": [
        [
          "",
          "正式批准；认可（可作名词或动词）。本文为制裁，不能套用批准义。"
        ]
      ]
    },
    {
      "id": "approve",
      "pos": "v",
      "meaning": "正式批准；认可",
      "forms": [],
      "fromNotes": [
        [
          "",
          "正式批准；认可（可作名词或动词）。本文为制裁，不能套用批准义。"
        ]
      ]
    }
  ],
  "save": [
    {
      "id": "economize",
      "pos": "v",
      "meaning": "节省金钱或时间",
      "forms": [
        [
          "v",
          [
            "节省金钱或时间",
            "节省"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "节省金钱或时间；保存文件；保留。本文save newspapers为挽救报业。"
        ]
      ]
    },
    {
      "id": "store",
      "pos": "v",
      "meaning": "保存文件",
      "forms": [],
      "fromNotes": [
        [
          "",
          "节省金钱或时间；保存文件；保留。本文save newspapers为挽救报业。"
        ]
      ]
    },
    {
      "id": "reserve",
      "pos": "v",
      "meaning": "保留",
      "forms": [],
      "fromNotes": [
        [
          "",
          "节省金钱或时间；保存文件；保留。本文save newspapers为挽救报业。"
        ]
      ]
    },
    {
      "id": "rescue",
      "pos": "v",
      "meaning": "挽救；使免于毁坏",
      "forms": [],
      "fromNotes": [
        [
          "",
          "节省金钱或时间；保存文件；保留。本文save newspapers为挽救报业。"
        ]
      ]
    }
  ],
  "sense": [
    {
      "id": "meaning",
      "pos": "n",
      "meaning": "词语的含义",
      "forms": [],
      "fromNotes": [
        [
          "",
          "词语的含义；判断力；感官。a sense of security表示安全感，不是词义或感觉器官。"
        ]
      ]
    },
    {
      "id": "judgment",
      "pos": "n",
      "meaning": "判断力；常识",
      "forms": [
        [
          "n",
          [
            "判断力；常识",
            "理性判断；常识"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "词语的含义；判断力；感官。a sense of security表示安全感，不是词义或感觉器官。"
        ]
      ]
    },
    {
      "id": "faculty",
      "pos": "n",
      "meaning": "感官",
      "forms": [],
      "fromNotes": [
        [
          "",
          "词语的含义；判断力；感官。a sense of security表示安全感，不是词义或感觉器官。"
        ]
      ]
    }
  ],
  "signature": [
    {
      "id": "signature",
      "pos": "n",
      "meaning": "签名",
      "forms": [],
      "fromNotes": [
        [
          "",
          "签名；特有标志。signature作名词定语可表示标志性的。"
        ]
      ]
    },
    {
      "id": "characteristic",
      "pos": "n",
      "meaning": "特有标志",
      "forms": [
        [
          "n",
          [
            "特有标志",
            "标志性的；代表性的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "",
          "签名；特有标志。signature作名词定语可表示标志性的。"
        ]
      ]
    }
  ],
  "solution": [
    {
      "id": "answer",
      "pos": "n",
      "meaning": "解答；数学题的解",
      "forms": [],
      "fromNotes": [
        [
          "",
          "解答；数学题的解；化学溶液。a salt solution盐溶液。"
        ]
      ]
    },
    {
      "id": "mixture",
      "pos": "n",
      "meaning": "化学溶液",
      "forms": [],
      "fromNotes": [
        [
          "",
          "解答；数学题的解；化学溶液。a salt solution盐溶液。"
        ]
      ]
    }
  ],
  "stock": [
    {
      "id": "stock",
      "pos": "v",
      "meaning": "储备；备有货品",
      "forms": [],
      "fromNotes": [
        [
          "v",
          "储备、备有货品；股票义与库存义不要混读。"
        ]
      ]
    },
    {
      "id": "inventory",
      "pos": "n",
      "meaning": "库存；储备",
      "forms": [],
      "fromNotes": [
        [
          "",
          "库存；储备，如out of stock缺货。"
        ]
      ]
    }
  ],
  "suit": [
    {
      "id": "clothes",
      "pos": "n",
      "meaning": "一套衣服",
      "forms": [],
      "fromNotes": [
        [
          "n/v",
          "一套衣服； 适合、使满意（suit one's needs满足需要）。"
        ]
      ]
    },
    {
      "id": "fit",
      "pos": "v",
      "meaning": "适合；使满意",
      "forms": [],
      "fromNotes": [
        [
          "n/v",
          "一套衣服； 适合、使满意（suit one's needs满足需要）。"
        ]
      ]
    }
  ],
  "raise": [
    {
      "id": "increase",
      "pos": "v",
      "meaning": "提高",
      "forms": [
        [
          "v",
          [
            "提高"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "提高；提出；筹集；养育"
        ]
      ]
    },
    {
      "id": "propose",
      "pos": "v",
      "meaning": "提出",
      "forms": [
        [
          "v",
          [
            "提出"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "提高；提出；筹集；养育"
        ]
      ]
    },
    {
      "id": "collect",
      "pos": "v",
      "meaning": "筹集",
      "forms": [
        [
          "v",
          [
            "筹集"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "提高；提出；筹集；养育"
        ]
      ]
    },
    {
      "id": "rear",
      "pos": "v",
      "meaning": "养育",
      "forms": [
        [
          "v",
          [
            "养育"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "提高；提出；筹集；养育"
        ]
      ]
    }
  ],
  "perform": [
    {
      "id": "execute",
      "pos": "v",
      "meaning": "执行；做",
      "forms": [
        [
          "v",
          [
            "执行；做"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "履行；表演"
        ]
      ]
    },
    {
      "id": "entertain",
      "pos": "v",
      "meaning": "表演",
      "forms": [
        [
          "v",
          [
            "表演"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "履行；表演"
        ]
      ]
    }
  ],
  "skip": [
    {
      "id": "omit",
      "pos": "v",
      "meaning": "略过；不做",
      "forms": [
        [
          "v",
          [
            "略过；不做"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "跳过；蹦跳"
        ]
      ]
    },
    {
      "id": "hop",
      "pos": "v",
      "meaning": "蹦跳",
      "forms": [
        [
          "v",
          [
            "蹦跳"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "跳过；蹦跳"
        ]
      ]
    }
  ],
  "negative": [
    {
      "id": "negative",
      "pos": "adj",
      "meaning": "负面的；否定的",
      "forms": [
        [
          "adj",
          [
            "负面的；否定的",
            "否定的；批评的"
          ]
        ]
      ]
    }
  ],
  "ordinary": [
    {
      "id": "ordinary",
      "pos": "adj",
      "meaning": "普通的；平常的",
      "forms": [
        [
          "adj",
          [
            "普通的；平常的",
            "普通的"
          ]
        ]
      ]
    }
  ],
  "output": [
    {
      "id": "output",
      "pos": "n",
      "meaning": "产出；产量",
      "forms": [
        [
          "n",
          [
            "产出；产量",
            "排出量；排放量"
          ]
        ]
      ]
    }
  ],
  "owing": [
    {
      "id": "cause",
      "pos": "prep",
      "meaning": "由于；因为",
      "forms": [
        [
          "prep",
          [
            "由于；因为",
            "引出原因"
          ]
        ],
        [
          "介词结构成分",
          [
            "引出原因",
            "由于；因为"
          ]
        ]
      ]
    }
  ],
  "pastel": [
    {
      "id": "pastel",
      "pos": "adj",
      "meaning": "柔和的浅色；粉彩色",
      "forms": [
        [
          "adj",
          [
            "柔和的浅色；粉彩色"
          ]
        ],
        [
          "adj/n",
          [
            "柔和的浅色；粉彩色"
          ]
        ]
      ]
    }
  ],
  "pattern": [
    {
      "id": "pattern",
      "pos": "n",
      "meaning": "模式；行为方式",
      "forms": [
        [
          "n",
          [
            "模式；行为方式",
            "模式；范式"
          ]
        ]
      ]
    }
  ],
  "peculiarity": [
    {
      "id": "peculiarity",
      "pos": "n",
      "meaning": "特性；古怪之处",
      "forms": [
        [
          "n",
          [
            "特性；古怪之处",
            "特性；怪异之处"
          ]
        ]
      ]
    }
  ],
  "penalty": [
    {
      "id": "penalty",
      "pos": "n",
      "meaning": "处罚；罚金",
      "forms": [
        [
          "n",
          [
            "处罚；罚金",
            "处罚"
          ]
        ]
      ]
    }
  ],
  "people": [
    {
      "id": "people",
      "pos": "n",
      "meaning": "人们",
      "forms": [
        [
          "n",
          [
            "人们",
            "人；个人"
          ]
        ]
      ]
    }
  ],
  "permissive": [
    {
      "id": "permissive",
      "pos": "adj",
      "meaning": "宽容放任的；纵容的",
      "forms": [
        [
          "adj",
          [
            "宽容放任的；纵容的",
            "宽容放任的"
          ]
        ]
      ]
    }
  ],
  "phenomenon": [
    {
      "id": "phenomenon",
      "pos": "n",
      "meaning": "现象；事件",
      "forms": [
        [
          "n",
          [
            "现象；事件",
            "现象"
          ]
        ]
      ]
    }
  ],
  "possess": [
    {
      "id": "possess",
      "pos": "v",
      "meaning": "拥有；具有",
      "forms": [
        [
          "v",
          [
            "拥有；具有",
            "拥有；持有"
          ]
        ]
      ]
    }
  ],
  "prejudice": [
    {
      "id": "prejudice",
      "pos": "n",
      "meaning": "偏见；成见",
      "forms": [
        [
          "n",
          [
            "偏见；成见"
          ]
        ],
        [
          "n/v",
          [
            "偏见；成见"
          ]
        ]
      ]
    }
  ],
  "prevent": [
    {
      "id": "prevent",
      "pos": "v",
      "meaning": "防止；阻止",
      "forms": [
        [
          "v",
          [
            "防止；阻止",
            "防止"
          ]
        ]
      ]
    }
  ],
  "primarily": [
    {
      "id": "primarily",
      "pos": "adv",
      "meaning": "主要地；首要地",
      "forms": [
        [
          "adv",
          [
            "主要地；首要地",
            "主要地"
          ]
        ]
      ]
    }
  ],
  "profess": [
    {
      "id": "profess",
      "pos": "v",
      "meaning": "公开宣称；表明",
      "forms": [
        [
          "v",
          [
            "公开宣称；表明",
            "公开宣称；自称"
          ]
        ]
      ]
    }
  ],
  "prohibit": [
    {
      "id": "prohibit",
      "pos": "v",
      "meaning": "禁止",
      "forms": [
        [
          "v",
          [
            "禁止",
            "正式禁止"
          ]
        ]
      ]
    }
  ],
  "promotion": [
    {
      "id": "promotion",
      "pos": "n",
      "meaning": "商业推广",
      "forms": [
        [
          "n",
          [
            "商业推广",
            "推广"
          ]
        ]
      ]
    }
  ],
  "proper": [
    {
      "id": "proper",
      "pos": "adj",
      "meaning": "恰当的；正确的",
      "forms": [
        [
          "adj",
          [
            "恰当的；正确的",
            "恰当的；准确的",
            "恰当的；适当的；正确的"
          ]
        ]
      ]
    }
  ],
  "pursuit": [
    {
      "id": "pursuit",
      "pos": "n",
      "meaning": "追求；从事的活动",
      "forms": [
        [
          "n",
          [
            "追求；从事的活动",
            "追求的东西"
          ]
        ]
      ]
    }
  ],
  "quality": [
    {
      "id": "quality",
      "pos": "n",
      "meaning": "品质；质量",
      "forms": [
        [
          "n",
          [
            "品质；质量",
            "品质"
          ]
        ]
      ]
    }
  ],
  "reasonable": [
    {
      "id": "reasonable",
      "pos": "adj",
      "meaning": "合理的；理性的",
      "forms": [
        [
          "adj",
          [
            "合理的；理性的",
            "合理的"
          ]
        ]
      ]
    }
  ],
  "reflect": [
    {
      "id": "reflect",
      "pos": "v",
      "meaning": "思考；评述",
      "forms": [
        [
          "v",
          [
            "思考；评述",
            "认真思考；评述"
          ]
        ]
      ]
    }
  ],
  "relatively": [
    {
      "id": "relatively",
      "pos": "adv",
      "meaning": "相对地；比较而言",
      "forms": [
        [
          "adv",
          [
            "相对地；比较而言",
            "相对地"
          ]
        ]
      ]
    }
  ],
  "researcher": [
    {
      "id": "researcher",
      "pos": "n",
      "meaning": "研究者；研究人员",
      "forms": [
        [
          "n",
          [
            "研究者；研究人员",
            "研究人员",
            "研究者"
          ]
        ]
      ]
    }
  ],
  "restraining": [
    {
      "id": "restraining",
      "pos": "adj",
      "meaning": "约束的；限制的",
      "forms": [
        [
          "adj",
          [
            "约束的；限制的",
            "限制的；克制的"
          ]
        ],
        [
          "adj/v",
          [
            "约束的；限制的",
            "限制的；克制的"
          ]
        ]
      ]
    }
  ],
  "restructure": [
    {
      "id": "restructure",
      "pos": "v",
      "meaning": "重组；调整结构",
      "forms": [
        [
          "v",
          [
            "重组；调整结构"
          ]
        ],
        [
          "n/v",
          [
            "重组；调整结构"
          ]
        ]
      ]
    }
  ],
  "rests": [
    {
      "id": "depend",
      "pos": "v",
      "meaning": "依赖；取决于",
      "forms": [
        [
          "v",
          [
            "依赖；取决于",
            "取决于；建立在……基础上"
          ]
        ]
      ]
    }
  ],
  "satisfied": [
    {
      "id": "satisfied",
      "pos": "adj",
      "meaning": "满意的",
      "forms": [
        [
          "adj",
          [
            "满意的",
            "满足"
          ]
        ],
        [
          "adj/v",
          [
            "满足",
            "满意的"
          ]
        ]
      ]
    }
  ],
  "satisfy": [
    {
      "id": "satisfy",
      "pos": "v",
      "meaning": "符合；满足",
      "forms": [
        [
          "v",
          [
            "符合；满足",
            "满足"
          ]
        ]
      ]
    }
  ],
  "secretly": [
    {
      "id": "secretly",
      "pos": "adv",
      "meaning": "秘密地；暗中",
      "forms": [
        [
          "adv",
          [
            "秘密地；暗中",
            "秘密地"
          ]
        ]
      ]
    }
  ],
  "silicon": [
    {
      "id": "silicon",
      "pos": "n",
      "meaning": "硅",
      "forms": [
        [
          "n",
          [
            "硅",
            "硅；硅谷名称的一部分",
            "硅（地名组成）"
          ]
        ],
        [
          "proper-name element",
          [
            "硅（地名组成）",
            "硅",
            "硅；硅谷名称的一部分"
          ]
        ]
      ]
    }
  ],
  "sit": [
    {
      "id": "sit",
      "pos": "v",
      "meaning": "坐着",
      "forms": [
        [
          "v",
          [
            "坐着",
            "坐"
          ]
        ]
      ]
    }
  ],
  "skill": [
    {
      "id": "skill",
      "pos": "n",
      "meaning": "技能；技巧",
      "forms": [
        [
          "n",
          [
            "技能；技巧",
            "技能；本领"
          ]
        ]
      ]
    }
  ],
  "slice": [
    {
      "id": "slice",
      "pos": "n",
      "meaning": "薄片；一小部分",
      "forms": [
        [
          "n",
          [
            "薄片；一小部分",
            "一小片；一部分"
          ]
        ]
      ]
    }
  ],
  "sly": [
    {
      "id": "sly",
      "pos": "adj",
      "meaning": "狡猾的；鬼祟的",
      "forms": [
        [
          "adj",
          [
            "狡猾的；鬼祟的",
            "隐秘狡黠的"
          ]
        ],
        [
          "adj/adv",
          [
            "狡猾的；鬼祟的",
            "隐秘狡黠的"
          ]
        ]
      ]
    }
  ],
  "smoke": [
    {
      "id": "smoke",
      "pos": "v",
      "meaning": "吸烟",
      "forms": [
        [
          "v",
          [
            "吸烟"
          ]
        ],
        [
          "gerund",
          [
            "吸烟"
          ]
        ]
      ]
    }
  ],
  "source": [
    {
      "id": "source",
      "pos": "n",
      "meaning": "来源；源头",
      "forms": [
        [
          "n",
          [
            "来源；源头",
            "来源"
          ]
        ]
      ]
    }
  ],
  "space": [
    {
      "id": "space",
      "pos": "n",
      "meaning": "空间；余地",
      "forms": [
        [
          "n",
          [
            "空间；余地",
            "空间"
          ]
        ]
      ]
    }
  ],
  "speak": [
    {
      "id": "speak",
      "pos": "v",
      "meaning": "讲话；谈论",
      "forms": [
        [
          "v",
          [
            "讲话；谈论",
            "说；而言"
          ]
        ]
      ]
    }
  ],
  "specialized": [
    {
      "id": "specialized",
      "pos": "adj",
      "meaning": "专业的；专门的",
      "forms": [
        [
          "adj",
          [
            "专业的；专门的",
            "专业的"
          ]
        ],
        [
          "adj/v",
          [
            "专业的",
            "专业的；专门的"
          ]
        ]
      ]
    }
  ],
  "spending": [
    {
      "id": "spending",
      "pos": "n",
      "meaning": "消费；支出",
      "forms": [
        [
          "n",
          [
            "消费；支出",
            "花钱；消费"
          ]
        ],
        [
          "n/v",
          [
            "花钱；消费",
            "消费；支出"
          ]
        ]
      ]
    }
  ],
  "spiritual": [
    {
      "id": "spiritual",
      "pos": "adj",
      "meaning": "精神的；心灵的",
      "forms": [
        [
          "adj",
          [
            "精神的；心灵的",
            "精神上的"
          ]
        ]
      ]
    }
  ],
  "spiritually": [
    {
      "id": "spiritually",
      "pos": "adv",
      "meaning": "在精神上；心灵上",
      "forms": [
        [
          "adv",
          [
            "在精神上；心灵上",
            "精神层面地"
          ]
        ]
      ]
    }
  ],
  "star": [
    {
      "id": "star",
      "pos": "n",
      "meaning": "星（报纸名的一部分）",
      "forms": [
        [
          "n",
          [
            "星（报纸名的一部分）",
            "星（Stars and Stripes报纸名的一部分）"
          ]
        ]
      ]
    }
  ],
  "statement": [
    {
      "id": "statement",
      "pos": "n",
      "meaning": "陈述；说法；声明",
      "forms": [
        [
          "n",
          [
            "陈述；说法；声明",
            "陈述；说法"
          ]
        ]
      ]
    }
  ],
  "stem": [
    {
      "id": "originate",
      "pos": "v",
      "meaning": "源于；由……引起",
      "forms": [
        [
          "v",
          [
            "源于；由……引起",
            "起源；由……产生"
          ]
        ]
      ]
    }
  ],
  "stepping": [
    {
      "id": "stepping",
      "pos": "v",
      "meaning": "踩踏；跨步（合成词成分）",
      "forms": [
        [
          "v",
          [
            "踩踏；跨步（合成词成分）",
            "踏步的；起过渡作用的"
          ]
        ]
      ]
    }
  ],
  "stream": [
    {
      "id": "stream",
      "pos": "n",
      "meaning": "流；连续的一股",
      "forms": [
        [
          "n",
          [
            "流；连续的一股"
          ]
        ],
        [
          "n/v",
          [
            "流；连续的一股"
          ]
        ]
      ]
    }
  ],
  "style": [
    {
      "id": "style",
      "pos": "n",
      "meaning": "风格；样式",
      "forms": [
        [
          "n",
          [
            "风格；样式",
            "风格"
          ]
        ]
      ]
    }
  ],
  "successfully": [
    {
      "id": "successfully",
      "pos": "adv",
      "meaning": "成功地；顺利地",
      "forms": [
        [
          "adv",
          [
            "成功地；顺利地",
            "成功地"
          ]
        ]
      ]
    }
  ],
  "succession": [
    {
      "id": "succession",
      "pos": "n",
      "meaning": "一连串；连续",
      "forms": [
        [
          "n",
          [
            "一连串；连续",
            "接连；连续的一系列"
          ]
        ]
      ]
    }
  ],
  "sweep": [
    {
      "id": "sweep",
      "pos": "v",
      "meaning": "席卷",
      "forms": [
        [
          "v",
          [
            "席卷",
            "席卷；大举涌入"
          ]
        ],
        [
          "n/v",
          [
            "席卷",
            "席卷；大举涌入"
          ]
        ]
      ]
    }
  ],
  "note": [
    {
      "id": "annotation",
      "pos": "n",
      "meaning": "注释；附注",
      "forms": [
        [
          "n",
          [
            "注释；附注"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "注释；注意到"
        ]
      ]
    },
    {
      "id": "notice",
      "pos": "v",
      "meaning": "注意；留意到",
      "forms": [
        [
          "v",
          [
            "注意；留意到"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "注释；注意到"
        ]
      ]
    }
  ],
  "novel": [
    {
      "id": "novel",
      "pos": "adj",
      "meaning": "新颖的",
      "forms": [
        [
          "adj",
          [
            "新颖的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "新颖的；小说"
        ]
      ]
    },
    {
      "id": "fiction",
      "pos": "n",
      "meaning": "小说",
      "forms": [
        [
          "n",
          [
            "小说"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "新颖的；小说"
        ]
      ]
    }
  ],
  "nursery": [
    {
      "id": "room",
      "pos": "n",
      "meaning": "婴幼儿房",
      "forms": [
        [
          "n",
          [
            "婴幼儿房"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "婴幼儿房；婴幼儿用品的"
        ]
      ]
    },
    {
      "id": "nursery",
      "pos": "adj",
      "meaning": "婴幼儿用品的",
      "forms": [
        [
          "adj",
          [
            "婴幼儿用品的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "婴幼儿房；婴幼儿用品的"
        ]
      ]
    }
  ],
  "observe": [
    {
      "id": "notice",
      "pos": "v",
      "meaning": "注意到；察觉",
      "forms": [
        [
          "v",
          [
            "注意到；察觉"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "观察到；遵守"
        ]
      ]
    },
    {
      "id": "obey",
      "pos": "v",
      "meaning": "遵守；奉行",
      "forms": [
        [
          "v",
          [
            "遵守；奉行"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "观察到；遵守"
        ]
      ]
    }
  ],
  "organic": [
    {
      "id": "organic",
      "pos": "adj",
      "meaning": "有机体的；生物的",
      "forms": [
        [
          "adj",
          [
            "有机体的；生物的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "有机的；有机体的"
        ]
      ]
    }
  ],
  "physical": [
    {
      "id": "body",
      "pos": "adj",
      "meaning": "身体的",
      "forms": [
        [
          "adj",
          [
            "身体的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "身体的；物理的"
        ]
      ]
    },
    {
      "id": "material",
      "pos": "adj",
      "meaning": "实体的；物质的",
      "forms": [
        [
          "adj",
          [
            "实体的；物质的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "身体的；物理的"
        ]
      ]
    }
  ],
  "pink": [
    {
      "id": "colour",
      "pos": "n",
      "meaning": "粉色",
      "forms": [
        [
          "n",
          [
            "粉色",
            "粉色；粉色的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "粉色；粉色的"
        ]
      ]
    },
    {
      "id": "pink",
      "pos": "adj",
      "meaning": "粉色的",
      "forms": [
        [
          "adj",
          [
            "粉色的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "粉色；粉色的"
        ]
      ]
    }
  ],
  "praise": [
    {
      "id": "praise",
      "pos": "n",
      "meaning": "赞扬；赞美",
      "forms": [
        [
          "n",
          [
            "赞扬；赞美"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "赞扬；赞美"
        ]
      ]
    },
    {
      "id": "praise",
      "pos": "v",
      "meaning": "称赞",
      "forms": [
        [
          "v",
          [
            "称赞"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "赞扬；赞美"
        ]
      ]
    }
  ],
  "preliminary": [
    {
      "id": "preliminary",
      "pos": "adj",
      "meaning": "初步的；预备的",
      "forms": [
        [
          "adj",
          [
            "初步的；预备的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "初步的；预备步骤"
        ]
      ]
    },
    {
      "id": "step",
      "pos": "n",
      "meaning": "预备步骤",
      "forms": [
        [
          "n",
          [
            "预备步骤"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "初步的；预备步骤"
        ]
      ]
    }
  ],
  "primary": [
    {
      "id": "main",
      "pos": "adj",
      "meaning": "首要的；主要的",
      "forms": [
        [
          "adj",
          [
            "首要的；主要的",
            "首要的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "首要的；主要的；初级的"
        ]
      ]
    },
    {
      "id": "basic",
      "pos": "adj",
      "meaning": "初级的",
      "forms": [
        [
          "adj",
          [
            "初级的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj",
          "首要的；主要的；初级的"
        ]
      ]
    }
  ],
  "printing": [
    {
      "id": "printing",
      "pos": "n",
      "meaning": "印刷；打印",
      "forms": [
        [
          "n",
          [
            "印刷；打印",
            "印刷"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "印刷；打印"
        ]
      ]
    }
  ],
  "push": [
    {
      "id": "push",
      "pos": "v",
      "meaning": "推；推动",
      "forms": [
        [
          "v",
          [
            "推；推动"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "推；咄咄逼人地要求"
        ]
      ]
    },
    {
      "id": "demand",
      "pos": "v",
      "meaning": "坚持要求",
      "forms": [
        [
          "v",
          [
            "坚持要求"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "推；咄咄逼人地要求"
        ]
      ]
    }
  ],
  "puzzle": [
    {
      "id": "confuse",
      "pos": "v",
      "meaning": "使困惑",
      "forms": [
        [
          "v",
          [
            "使困惑"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "使困惑；本句 puzzled 为感到困惑的"
        ]
      ]
    },
    {
      "id": "puzzled",
      "pos": "adj",
      "meaning": "感到困惑的",
      "forms": [
        [
          "adj",
          [
            "感到困惑的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "使困惑；本句 puzzled 为感到困惑的"
        ]
      ]
    }
  ],
  "qualify": [
    {
      "id": "eligibility",
      "pos": "v",
      "meaning": "使具备资格",
      "forms": [
        [
          "v",
          [
            "使具备资格"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "使具备资格；限定"
        ]
      ]
    },
    {
      "id": "limit",
      "pos": "v",
      "meaning": "修饰；限定",
      "forms": [
        [
          "v",
          [
            "修饰；限定"
          ]
        ]
      ],
      "fromNotes": [
        [
          "v",
          "使具备资格；限定"
        ]
      ]
    }
  ],
  "rage": [
    {
      "id": "rage",
      "pos": "n",
      "meaning": "暴怒",
      "forms": [
        [
          "n",
          [
            "暴怒"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "暴怒；肆虐"
        ]
      ]
    },
    {
      "id": "rage",
      "pos": "v",
      "meaning": "肆虐",
      "forms": [
        [
          "v",
          [
            "肆虐"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "暴怒；肆虐"
        ]
      ]
    }
  ],
  "random": [
    {
      "id": "random",
      "pos": "adj",
      "meaning": "随机的",
      "forms": [
        [
          "adj",
          [
            "随机的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "随机的；随机方式"
        ]
      ]
    },
    {
      "id": "random",
      "pos": "n",
      "meaning": "随机",
      "forms": [
        [
          "n",
          [
            "随机"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "随机的；随机方式"
        ]
      ]
    }
  ],
  "reform": [
    {
      "id": "reform",
      "pos": "n",
      "meaning": "改革",
      "forms": [
        [
          "n",
          [
            "改革"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "改革；改良"
        ]
      ]
    },
    {
      "id": "reform",
      "pos": "v",
      "meaning": "改革",
      "forms": [
        [
          "v",
          [
            "改革"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "改革；改良"
        ]
      ]
    }
  ],
  "remark": [
    {
      "id": "remark",
      "pos": "n",
      "meaning": "评论；话语",
      "forms": [
        [
          "n",
          [
            "评论；话语"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "评论；话语"
        ]
      ]
    },
    {
      "id": "remark",
      "pos": "v",
      "meaning": "评论；谈及",
      "forms": [
        [
          "v",
          [
            "评论；谈及"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "评论；话语"
        ]
      ]
    }
  ],
  "representative": [
    {
      "id": "representative",
      "pos": "adj",
      "meaning": "有代表性的",
      "forms": [
        [
          "adj",
          [
            "有代表性的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "有代表性的；代表"
        ]
      ]
    },
    {
      "id": "person",
      "pos": "n",
      "meaning": "代表",
      "forms": [
        [
          "n",
          [
            "代表"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "有代表性的；代表"
        ]
      ]
    }
  ],
  "retreat": [
    {
      "id": "retreat",
      "pos": "n",
      "meaning": "退却；退离",
      "forms": [
        [
          "n",
          [
            "退却；退离"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "退却；退出"
        ]
      ]
    },
    {
      "id": "retreat",
      "pos": "v",
      "meaning": "退却；退出",
      "forms": [
        [
          "v",
          [
            "退却；退出"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "退却；退出"
        ]
      ]
    }
  ],
  "review": [
    {
      "id": "critique",
      "pos": "n",
      "meaning": "评论；评述",
      "forms": [
        [
          "n",
          [
            "评论；评述"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "评论；复习；评述"
        ]
      ]
    },
    {
      "id": "revise",
      "pos": "v",
      "meaning": "复习",
      "forms": [
        [
          "v",
          [
            "复习"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "评论；复习；评述"
        ]
      ]
    }
  ],
  "reward": [
    {
      "id": "reward",
      "pos": "n",
      "meaning": "回报",
      "forms": [
        [
          "n",
          [
            "回报"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "回报；奖励；报偿"
        ]
      ]
    },
    {
      "id": "reward",
      "pos": "v",
      "meaning": "奖励；回报",
      "forms": [
        [
          "v",
          [
            "奖励；回报"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "回报；奖励；报偿"
        ]
      ]
    }
  ],
  "rival": [
    {
      "id": "competitor",
      "pos": "n",
      "meaning": "竞争对手",
      "forms": [
        [
          "n",
          [
            "竞争对手"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "竞争对手；竞争"
        ]
      ]
    },
    {
      "id": "compete",
      "pos": "v",
      "meaning": "竞争",
      "forms": [
        [
          "v",
          [
            "竞争"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n/v",
          "竞争对手；竞争"
        ]
      ]
    }
  ],
  "rope": [
    {
      "id": "rope",
      "pos": "n",
      "meaning": "绳索；围绳",
      "forms": [
        [
          "n",
          [
            "绳索；围绳",
            "围绳"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "绳索；困境（习语中）"
        ]
      ]
    },
    {
      "id": "on-the-ropes",
      "pos": "n",
      "meaning": "困境（on the ropes）",
      "forms": [
        [
          "n",
          [
            "困境（on the ropes）"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "绳索；困境（习语中）"
        ]
      ]
    }
  ],
  "sacrifice": [
    {
      "id": "sacrifice",
      "pos": "n",
      "meaning": "牺牲",
      "forms": [
        [
          "n",
          [
            "牺牲",
            "牺牲；牺牲掉"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "牺牲；牺牲掉"
        ]
      ]
    },
    {
      "id": "sacrifice",
      "pos": "v",
      "meaning": "牺牲；舍弃",
      "forms": [
        [
          "v",
          [
            "牺牲；舍弃"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "牺牲；牺牲掉"
        ]
      ]
    }
  ],
  "savage": [
    {
      "id": "person",
      "pos": "n",
      "meaning": "蛮族人（原引语称谓）",
      "forms": [
        [
          "n",
          [
            "蛮族人（原引语称谓）"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "野蛮人；野蛮的"
        ]
      ]
    },
    {
      "id": "savage",
      "pos": "adj",
      "meaning": "野蛮的",
      "forms": [
        [
          "adj",
          [
            "野蛮的"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adj/n",
          "野蛮人；野蛮的"
        ]
      ]
    }
  ],
  "score": [
    {
      "id": "score",
      "pos": "n",
      "meaning": "分数",
      "forms": [
        [
          "n",
          [
            "分数"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "分数；得分"
        ]
      ]
    },
    {
      "id": "score",
      "pos": "v",
      "meaning": "得分",
      "forms": [
        [
          "v",
          [
            "得分"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "分数；得分"
        ]
      ]
    }
  ],
  "section": [
    {
      "id": "part",
      "pos": "n",
      "meaning": "部分；截面",
      "forms": [
        [
          "n",
          [
            "部分；截面"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "部分；章节"
        ]
      ]
    },
    {
      "id": "chapter",
      "pos": "n",
      "meaning": "章节",
      "forms": [
        [
          "n",
          [
            "章节"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n",
          "部分；章节"
        ]
      ]
    }
  ],
  "segment": [
    {
      "id": "segment",
      "pos": "v",
      "meaning": "细分",
      "forms": [
        [
          "v",
          [
            "细分"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "细分；市场细分"
        ]
      ]
    },
    {
      "id": "segmentation",
      "pos": "n",
      "meaning": "市场细分",
      "forms": [
        [
          "n",
          [
            "市场细分"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "细分；市场细分"
        ]
      ]
    }
  ],
  "sex": [
    {
      "id": "sex",
      "pos": "n",
      "meaning": "性别",
      "forms": [
        [
          "n",
          [
            "性别"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "性别；性行为"
        ]
      ]
    },
    {
      "id": "intercourse",
      "pos": "n",
      "meaning": "性行为",
      "forms": [
        [
          "n",
          [
            "性行为"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "性别；性行为"
        ]
      ]
    }
  ],
  "ship": [
    {
      "id": "ship",
      "pos": "n",
      "meaning": "船",
      "forms": [
        [
          "n",
          [
            "船"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "船；运输"
        ]
      ]
    },
    {
      "id": "ship",
      "pos": "v",
      "meaning": "运输",
      "forms": [
        [
          "v",
          [
            "运输"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "船；运输"
        ]
      ]
    }
  ],
  "short": [
    {
      "id": "brief",
      "pos": "adj",
      "meaning": "简短的",
      "forms": [
        [
          "adj",
          [
            "简短的",
            "简言之结构中的成分",
            "简短的；简言之结构中的成分"
          ]
        ]
      ]
    }
  ],
  "side": [
    {
      "id": "support",
      "pos": "v",
      "meaning": "站在……一边",
      "forms": [
        [
          "v",
          [
            "站在……一边"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "站在……一边；一方"
        ]
      ]
    },
    {
      "id": "side",
      "pos": "n",
      "meaning": "方面；一面",
      "forms": [
        [
          "n",
          [
            "方面；一面"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "站在……一边；一方"
        ]
      ]
    }
  ],
  "sketch": [
    {
      "id": "sketch",
      "pos": "n",
      "meaning": "草图；概略",
      "forms": [
        [
          "n",
          [
            "草图；概略"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "草图；概述"
        ]
      ]
    },
    {
      "id": "summarize",
      "pos": "v",
      "meaning": "概述",
      "forms": [
        [
          "v",
          [
            "概述"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "草图；概述"
        ]
      ]
    }
  ],
  "sooner": [
    {
      "id": "sooner",
      "pos": "adv",
      "meaning": "更早；宁愿",
      "forms": [
        [
          "adv",
          [
            "更早；宁愿",
            "更早；宁可"
          ]
        ]
      ]
    }
  ],
  "speed": [
    {
      "id": "accelerate",
      "pos": "v",
      "meaning": "加速",
      "forms": [
        [
          "v",
          [
            "加速"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "加速；速度"
        ]
      ]
    },
    {
      "id": "speed",
      "pos": "n",
      "meaning": "速度",
      "forms": [
        [
          "n",
          [
            "速度"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "加速；速度"
        ]
      ]
    }
  ],
  "stand": [
    {
      "id": "stand",
      "pos": "v",
      "meaning": "站立",
      "forms": [
        [
          "v",
          [
            "站立"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "站立；处于某种状况"
        ]
      ]
    },
    {
      "id": "state",
      "pos": "v",
      "meaning": "处于某状况",
      "forms": [
        [
          "v",
          [
            "处于某状况"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "站立；处于某种状况"
        ]
      ]
    }
  ],
  "stirring": [
    {
      "id": "feeling",
      "pos": "n",
      "meaning": "萌动；初起的感觉",
      "forms": [
        [
          "n",
          [
            "萌动；初起的感觉"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "萌动；激发；搅动"
        ]
      ]
    },
    {
      "id": "stimulate",
      "pos": "v",
      "meaning": "激发",
      "forms": [
        [
          "v",
          [
            "激发"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "萌动；激发；搅动"
        ]
      ]
    },
    {
      "id": "stir",
      "pos": "v",
      "meaning": "搅动",
      "forms": [
        [
          "v",
          [
            "搅动"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "萌动；激发；搅动"
        ]
      ]
    }
  ],
  "stress": [
    {
      "id": "pressure",
      "pos": "n",
      "meaning": "压力",
      "forms": [
        [
          "n",
          [
            "压力"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "压力；强调"
        ]
      ]
    },
    {
      "id": "emphasize",
      "pos": "v",
      "meaning": "强调",
      "forms": [
        [
          "v",
          [
            "强调"
          ]
        ]
      ],
      "fromNotes": [
        [
          "n/v",
          "压力；强调"
        ]
      ]
    }
  ],
  "neutral": [
    {
      "id": "neutral",
      "pos": "adj",
      "meaning": "中立的；中性的",
      "forms": [
        [
          "adj",
          [
            "中立的；中性的",
            "中性的；不分性别的",
            "中立的"
          ]
        ]
      ]
    }
  ],
  "nowhere": [
    {
      "id": "no-place",
      "pos": "adv",
      "meaning": "无处；任何地方都不",
      "forms": [
        [
          "adv",
          [
            "无处；任何地方都不"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv",
          "无处；没有进展"
        ]
      ]
    },
    {
      "id": "no-progress",
      "pos": "adv",
      "meaning": "没有进展（go nowhere）",
      "forms": [
        [
          "adv",
          [
            "没有进展（go nowhere）"
          ]
        ]
      ],
      "fromNotes": [
        [
          "adv",
          "无处；没有进展"
        ]
      ],
      "sources": [
        [
          "question-18-option-D",
          "adv",
          "无处；没有进展"
        ]
      ]
    }
  ],
  "suggest": [
    {
      "id": "propose",
      "pos": "v",
      "meaning": "建议；提出看法",
      "forms": [
        [
          "v",
          [
            "建议；提出看法",
            "提出；指出可能性",
            "建议；提出"
          ]
        ]
      ],
      "sources": [
        [
          "2011-p5-s8",
          "v",
          "表明；暗示"
        ],
        [
          "2011-p5-s12",
          "v",
          "表明；暗示"
        ],
        [
          "question-201144-prompt",
          "v",
          "表明；暗示"
        ]
      ]
    },
    {
      "id": "indicate",
      "pos": "v",
      "meaning": "表明；暗示",
      "forms": [
        [
          "v",
          [
            "表明；暗示",
            "暗示；表明"
          ]
        ]
      ]
    }
  ]
};

export const reviewedAnnotationsNS: ReviewedSenseAnnotations = {
  "nerve": [
    {
      "reason": "原说明把神经、紧张和勇气连写；以下按所指意义分开，用法说明保留。",
      "forms": [
        [
          "",
          [
            "神经；紧张不安（常用nerves）；冷静的勇气，如lose one's nerve失去勇气。"
          ]
        ]
      ]
    }
  ],
  "net": [
    {
      "reason": "原词典注释混合名词与动词；网、净得与连接成网络分别保留。",
      "forms": [
        [
          "",
          [
            "网；净得"
          ]
        ]
      ]
    }
  ],
  "outlet": [
    {
      "reason": "原说明列举三个不同事物并附例句，不能整体再作为第四个词义。",
      "forms": [
        [
          "",
          [
            "出口、排水口；电源插座；情绪宣泄途径，如an outlet for creativity发挥创造力的途径。"
          ]
        ]
      ]
    }
  ],
  "parallel": [
    {
      "reason": "原注释连写形容词和名词，并附 draw a parallel 用法；按词性保留。",
      "forms": [
        [
          "adj/n",
          [
            "平行的；同时发生的； 相似之处、对应事物。draw a parallel作类比。"
          ]
        ]
      ]
    }
  ],
  "partner": [
    {
      "reason": "合伙人、伴侣和普通搭档所指关系不同；保留各义，避免同一说明成为额外义。",
      "forms": [
        [
          "",
          [
            "合伙人；伴侣；搭档"
          ]
        ]
      ]
    }
  ],
  "pay": [
    {
      "reason": "原补充把支付动作和工资名词连写，工资单独列义。",
      "forms": [
        [
          "",
          [
            "支付；工资"
          ]
        ]
      ]
    }
  ],
  "paper": [
    {
      "reason": "原说明是可数性与多义辨析；保留纸张、论文、试卷、文件各义及原说明。",
      "forms": [
        [
          "n",
          [
            "不可数 纸张；可数 论文、试卷、文件。语境不同不要一律译成报纸。"
          ]
        ]
      ]
    }
  ],
  "point": [
    {
      "reason": "原说明混写名词含义、动词搭配与例句，按已有各义归类。",
      "forms": [
        [
          "v",
          [
            "要点或观点：the main point主要论点；意义：the point of doing做某事的意义； 指向：point to指向；指出：point out。"
          ]
        ]
      ]
    }
  ],
  "position": [
    {
      "reason": "原补充的例句说明立场，不应另生一个含位置和姿势的复合义项。",
      "forms": [
        [
          "",
          [
            "位置；姿势；立场。take a position on就某事表明立场。"
          ]
        ]
      ]
    }
  ],
  "post": [
    {
      "reason": "原说明跨名词和动词；保留岗位、邮政、柱子、帖子及邮寄发布动作。",
      "forms": [
        [
          "v",
          [
            "邮政；岗位；柱子；网络帖子； 邮寄或发布。"
          ]
        ]
      ]
    }
  ],
  "power": [
    {
      "reason": "原补充把能力、权力、电力、幂及供能动词连写；不合并这些真多义。",
      "forms": [
        [
          "v",
          [
            "能力；权力；电力；数学中的幂； 为……提供动力。"
          ]
        ]
      ]
    }
  ],
  "present": [
    {
      "reason": "已有义项指南覆盖原注释；名词礼物、现在，形容词在场，动词展示和授予分别保留。",
      "forms": [
        [
          "adj/n/v",
          [
            "礼物； 在场的、目前的； 提交、颁发。present A as B 在本文为“把 A 呈现为 B”。"
          ]
        ]
      ]
    },
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-201018-option-A",
          "adj/n/v",
          "呈现；在场的；礼物",
          "presented"
        ]
      ]
    },
    {
      "reason": "旧指南将名词现在与形容词当前的连写；两种词性分列，原指南用法和例句保留。",
      "forms": [
        [
          "adj/n",
          [
            "现在；当前的"
          ]
        ]
      ]
    },
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n/v",
          [
            "当前的；现在；呈现"
          ]
        ]
      ]
    }
  ],
  "privilege": [
    {
      "reason": "特权、荣幸和派生词辨析分开；underprivileged 是派生词说明而非 privilege 的另一个义项。",
      "forms": [
        [
          "n",
          [
            "特权；特殊待遇；荣幸。It is a privilege to do有幸做某事。"
          ]
        ],
        [
          "",
          [
            "privileged可指享特权的；贫困议题中underprivileged指弱势的。"
          ]
        ]
      ]
    }
  ],
  "probably": [
    {
      "reason": "说明副词在句中的位置，是用法而非新的中文义项。",
      "forms": [
        [
          "",
          [
            "probably 用于推测，通常置于实义动词前、be 后或助动词后。"
          ]
        ]
      ]
    }
  ],
  "prompt": [
    {
      "reason": "提示名词、促使动作与提醒动作分别列义；搭配解释留在原补充中。",
      "forms": [
        [
          "n",
          [
            "提示、提词；计算机提示符或对话提示词。"
          ]
        ],
        [
          "v",
          [
            "促使：prompt somebody to do促使某人做；提醒、提示。"
          ]
        ]
      ]
    }
  ],
  "respect": [
    {
      "reason": "原补充混合名词尊重、动词尊重和遵守，还重述介词结构；分别归类。",
      "forms": [
        [
          "",
          [
            "尊敬、尊重（名词/动词）；顾及、遵守（respect rules）。in respect of关于。"
          ]
        ],
        [
          "",
          [
            "尊重；敬意"
          ]
        ]
      ]
    }
  ],
  "right": [
    {
      "reason": "原补充跨词性并附搭配，正确、右方、权利、副词程度分别保留。",
      "forms": [
        [
          "adj/adv/n",
          [
            "正确的、右边的、合适的； 权利、右方； 恰好、完全。right away立即。"
          ]
        ]
      ]
    },
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/adv/n",
          [
            "权利；正确的"
          ]
        ]
      ]
    }
  ],
  "rest": [
    {
      "reason": "原说明比较休息、剩余和 rest on 结构，不能作为一个额外复合义项。",
      "forms": [
        [
          "",
          [
            "休息；休息时间。rest on以……为基础，与the rest of余下部分不同。"
          ]
        ]
      ]
    }
  ],
  "room": [
    {
      "reason": "不可数性与搭配例句解释同一个空间义；不另列例句为义项。",
      "forms": [
        [
          "",
          [
            "不可数名词：余地、空间，如 room for improvement（改进空间）"
          ]
        ]
      ]
    },
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n",
          [
            "房间；客厅；满屋的人"
          ]
        ]
      ]
    }
  ],
  "run": [
    {
      "reason": "原补充列举跑、延伸、竞选三个不同动作，各义保留。",
      "forms": [
        [
          "",
          [
            "跑；延伸；竞选"
          ]
        ]
      ]
    },
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "经营；运作"
          ]
        ]
      ]
    }
  ],
  "sanction": [
    {
      "reason": "原说明提示与制裁相反的批准义；按名词和动词保留，不误并到制裁。",
      "forms": [
        [
          "",
          [
            "正式批准；认可（可作名词或动词）。本文为制裁，不能套用批准义。"
          ]
        ]
      ]
    }
  ],
  "save": [
    {
      "reason": "原补充含节省、保存、保留及挽救辨析；同义提示归入对应现有义。",
      "forms": [
        [
          "",
          [
            "节省金钱或时间；保存文件；保留。本文save newspapers为挽救报业。"
          ]
        ]
      ]
    }
  ],
  "sense": [
    {
      "reason": "原补充比较词义、判断力、感官和感觉，真实不同义项分别保留。",
      "forms": [
        [
          "",
          [
            "词语的含义；判断力；感官。a sense of security表示安全感，不是词义或感觉器官。"
          ]
        ]
      ]
    }
  ],
  "signature": [
    {
      "reason": "名词的签名义与特有标志义分开，名词定语用法归入标志义。",
      "forms": [
        [
          "",
          [
            "签名；特有标志。signature作名词定语可表示标志性的。"
          ]
        ]
      ]
    }
  ],
  "solution": [
    {
      "reason": "数学解答与化学溶液不同，保留数学解答及化学义，例句留作补充。",
      "forms": [
        [
          "",
          [
            "解答；数学题的解；化学溶液。a salt solution盐溶液。"
          ]
        ]
      ]
    }
  ],
  "stock": [
    {
      "reason": "原注释比较股票与库存，并含动词；库存和储备动作各自列义。",
      "forms": [
        [
          "v",
          [
            "储备、备有货品；股票义与库存义不要混读。"
          ]
        ],
        [
          "",
          [
            "库存；储备，如out of stock缺货。"
          ]
        ]
      ]
    }
  ],
  "subject": [
    {
      "reason": "原补充对照名词、subject to 和使遭受结构；不合成新混合义。",
      "forms": [
        [
          "adj/v",
          [
            "主题；语法主语；实验对象。 subject to受……影响、取决于； subject A to B使A遭受B。"
          ]
        ]
      ]
    }
  ],
  "suit": [
    {
      "reason": "原补充跨名词衣服和动词适合，诉讼义独立。",
      "forms": [
        [
          "n/v",
          [
            "一套衣服； 适合、使满意（suit one's needs满足需要）。"
          ]
        ]
      ]
    }
  ],
  "property": [
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-201204-option-D",
          "n",
          "财产；特性",
          "properties"
        ]
      ]
    },
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n",
          [
            "财产；性质"
          ]
        ]
      ]
    }
  ],
  "raise": [
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-5-option-D",
          "n/v",
          "提高；提出；筹集；养育",
          "raise"
        ]
      ]
    }
  ],
  "rate": [],
  "perform": [
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-201201-option-B",
          "v",
          "履行；表演",
          "performed"
        ]
      ]
    }
  ],
  "question": [],
  "release": [
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-201110-option-A",
          "n/v",
          "发布；释放",
          "released"
        ]
      ]
    }
  ],
  "skip": [
    {
      "reason": "原选项释义及解析列举了不同用法，不能认定只有一个意义；各明确词义分别显示，原混合来源次数不分摊。",
      "sources": [
        [
          "question-201101-option-B",
          "v",
          "跳过；蹦跳",
          "skipped"
        ]
      ]
    }
  ],
  "social": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj",
          [
            "社会的；社交的"
          ]
        ]
      ]
    }
  ],
  "progress": [],
  "note": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "注释；注意到"
          ]
        ]
      ]
    }
  ],
  "novel": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "新颖的；小说"
          ]
        ]
      ]
    }
  ],
  "number": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "数量；编号"
          ]
        ]
      ]
    }
  ],
  "nursery": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "婴幼儿房；婴幼儿用品的"
          ]
        ]
      ]
    }
  ],
  "observe": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "观察到；遵守"
          ]
        ]
      ]
    }
  ],
  "organic": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "有机的；有机体的"
          ]
        ]
      ]
    }
  ],
  "physical": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj",
          [
            "身体的；物理的"
          ]
        ]
      ]
    }
  ],
  "pink": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "粉色；粉色的"
          ]
        ]
      ]
    }
  ],
  "praise": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "赞扬；赞美"
          ]
        ]
      ]
    }
  ],
  "preliminary": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "初步的；预备步骤"
          ]
        ]
      ]
    }
  ],
  "primary": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj",
          [
            "首要的；主要的；初级的"
          ]
        ]
      ]
    }
  ],
  "printing": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "印刷；打印"
          ]
        ]
      ]
    }
  ],
  "professional": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "专业人士；专业的"
          ]
        ]
      ]
    }
  ],
  "prove": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "结果表明是；证明"
          ]
        ]
      ]
    }
  ],
  "push": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "推；咄咄逼人地要求"
          ]
        ]
      ]
    }
  ],
  "puzzle": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "使困惑；本句 puzzled 为感到困惑的"
          ]
        ]
      ]
    }
  ],
  "qualify": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "使具备资格；限定"
          ]
        ]
      ]
    }
  ],
  "rage": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "暴怒；肆虐"
          ]
        ]
      ]
    }
  ],
  "random": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "随机的；随机方式"
          ]
        ]
      ]
    }
  ],
  "reform": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "改革；改良"
          ]
        ]
      ]
    }
  ],
  "regard": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "把……视为；看待；关心"
          ]
        ]
      ]
    }
  ],
  "relate": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "v",
          [
            "关联；联系；讲述"
          ]
        ]
      ]
    }
  ],
  "remark": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "评论；话语"
          ]
        ]
      ]
    }
  ],
  "representative": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "有代表性的；代表"
          ]
        ]
      ]
    }
  ],
  "retreat": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "退却；退出"
          ]
        ]
      ]
    }
  ],
  "return": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "返回；回归；回报"
          ]
        ]
      ]
    }
  ],
  "review": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "评论；复习；评述"
          ]
        ]
      ]
    }
  ],
  "reward": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "回报；奖励；报偿"
          ]
        ]
      ]
    }
  ],
  "ride": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "骑；乘坐；依靠"
          ]
        ]
      ]
    }
  ],
  "rival": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n/v",
          [
            "竞争对手；竞争"
          ]
        ]
      ]
    }
  ],
  "rope": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "绳索；困境（习语中）"
          ]
        ]
      ]
    }
  ],
  "sacrifice": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "牺牲；牺牲掉"
          ]
        ]
      ]
    }
  ],
  "savage": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n",
          [
            "野蛮人；野蛮的"
          ]
        ]
      ]
    }
  ],
  "score": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "分数；得分"
          ]
        ]
      ]
    }
  ],
  "section": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n",
          [
            "部分；章节"
          ]
        ]
      ]
    }
  ],
  "segment": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "细分；市场细分"
          ]
        ]
      ]
    }
  ],
  "sentence": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "刑罚；判刑；句子"
          ]
        ]
      ]
    }
  ],
  "sex": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "性别；性行为"
          ]
        ]
      ]
    }
  ],
  "share": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "分享；共同拥有；份额"
          ]
        ]
      ]
    }
  ],
  "ship": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "船；运输"
          ]
        ]
      ]
    }
  ],
  "side": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "站在……一边；一方"
          ]
        ]
      ]
    }
  ],
  "sign": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "标志；迹象；签名"
          ]
        ]
      ]
    }
  ],
  "sketch": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "草图；概述"
          ]
        ]
      ]
    }
  ],
  "sound": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj/n/v",
          [
            "声音；听起来"
          ]
        ]
      ]
    }
  ],
  "speed": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "加速；速度"
          ]
        ]
      ]
    }
  ],
  "stage": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "阶段；上演"
          ]
        ]
      ]
    }
  ],
  "stand": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "站立；处于某种状况"
          ]
        ]
      ]
    }
  ],
  "stay": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "保持；停留"
          ]
        ]
      ]
    }
  ],
  "stirring": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "萌动；激发；搅动"
          ]
        ]
      ]
    }
  ],
  "stress": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "压力；强调"
          ]
        ]
      ]
    }
  ],
  "survey": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n/v",
          [
            "调查；概览"
          ]
        ]
      ]
    }
  ],
  "nature": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n",
          [
            "本性；自然"
          ]
        ]
      ]
    }
  ],
  "old": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj",
          [
            "古老的；年长的"
          ]
        ]
      ]
    }
  ],
  "private": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adj",
          [
            "私人的；私立的"
          ]
        ]
      ]
    }
  ],
  "regulation": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "n",
          [
            "监管；规章"
          ]
        ]
      ]
    }
  ],
  "nowhere": [
    {
      "reason": "默认词典摘要混合不同词义或词性；各明确义项分列，原摘要保留，不增加真题次数。",
      "forms": [
        [
          "adv",
          [
            "无处；没有进展"
          ]
        ]
      ]
    }
  ]
};
