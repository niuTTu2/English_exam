import { reviewedReadingQuestion as make } from "./2013-reading-helpers";
import { passage2013P4RawQuestions as raw } from "./2013-passage-4-source";
export const passage2013P4Questions = [
make("2013-p4",raw[0],{
  "answer": "B",
  "sentence": 2,
  "type": "事实概括",
  "scope": "paragraph",
  "instruction": "先找top corporate-governance positions的性别构成，再用女性董事占14%确认高层权力由谁主导。",
  "evidence": [
    {
      "id": "2013-p4-q36-male",
      "sentenceId": "2013-p4-s2",
      "quote": "Europe's top corporate-governance positions remain overwhelmingly male",
      "role": "企业高层治理职位绝大部分由男性占据。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q36-share",
      "sentenceId": "2013-p4-s3",
      "quote": "women hold only 14 per cent of positions",
      "role": "女性席位比例很低。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p4-q36-male"
  ],
  "paraphrase": "最高治理职位绝大多数是男性 → 高层决策主要由男性掌握 → men have the final say。",
  "limit": "generally是总体概括，不表示没有任何女性高管。",
  "right": "B概括男性主导企业高层决策的现状。",
  "wrong": [
    [
      "A",
      "与原文相反",
      "A说女性居主导地位，与overwhelmingly male及女性14%相反。",
      [
        "女性董事席位14%支持谁占多数？",
        [
          "男性",
          "女性"
        ],
        "男性",
        "women hold only 14 per cent",
        "女性占少数，不能推出女性主导。"
      ]
    ],
    [
      "C",
      "偷换对象",
      "C把overwhelmingly male的数量压倒性换成governance被压垮，主语与词义都变了。",
      [
        "overwhelmingly修饰male说明什么？",
        [
          "男性占绝大多数",
          "治理已崩溃"
        ],
        "男性占绝大多数",
        "remain overwhelmingly male",
        "副词表示比例极高，不是overwhelmed的被压垮。"
      ]
    ],
    [
      "D",
      "与原文相反",
      "D把家庭友好说成当前事实；原文never...until说明女性参与决策前尚不能实现。",
      [
        "family-friendly在原文中是已实现还是有待条件满足？",
        [
          "有待条件满足",
          "已实现"
        ],
        "有待条件满足",
        "will never be completely family-friendly until",
        "until后的女性参与是不可漏掉的条件。"
      ]
    ]
  ],
  "confirm": [
    "men have the final say是在概括高层决策权还是所有普通岗位？",
    [
      "高层决策权",
      "所有普通岗位"
    ],
    "高层决策权",
    "top corporate-governance positions",
    "不要把董事会比例扩展到整个劳动力市场。"
  ],
  "paths": [
    [
      2
    ],
    [
      2,
      3
    ]
  ],
  "language": [
    [
      "欧洲企业职场总体上是什么情况？",
      "generally要求总体判断，不用个案代替。"
    ],
    [
      "女性起主导作用",
      "take the lead是领导。"
    ],
    [
      "男性有最后决定权",
      "have the final say是决定权的习语。"
    ],
    [
      "公司治理不堪重负",
      "overwhelmed不是overwhelmingly male。"
    ],
    [
      "高层管理有利于家庭",
      "原文把家庭友好放在尚待实现的条件中。"
    ]
  ]
}),
make("2013-p4",raw[1],{
  "answer": "C",
  "sentence": 5,
  "type": "因果推断",
  "scope": "paragraph",
  "instruction": "联读拟议强制规定源于受挫与自愿倡议只有24家响应，判断为什么转向立法。",
  "evidence": [
    {
      "id": "2013-p4-q37-cause",
      "sentenceId": "2013-p4-s5",
      "quote": "This proposed mandate was born of frustration.",
      "role": "强制规定是自愿方式受挫后的选择。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q37-failure",
      "sentenceId": "2013-p4-s8",
      "quote": "her appeal was considered a failure: only 24 companies took it up",
      "role": "参与企业极少，解释受挫。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p4-q37-cause",
    "2013-p4-q37-failure"
  ],
  "paraphrase": "自愿行动失败、倡议者受挫 → 不得已考虑强制立法 → a reluctant choice。",
  "limit": "这是措施产生背景的概括，不等于立法已经通过或执行。",
  "right": "C把受挫后求助强制手段概括为不情愿但现实所迫的选择。",
  "wrong": [
    [
      "A",
      "与原文相反",
      "A说反映性别已平衡，原文女性董事占比低，立法正是为改变失衡。",
      [
        "立法要应对已平衡还是仍失衡的现状？",
        [
          "仍失衡",
          "已平衡"
        ],
        "仍失衡",
        "women hold only 14 per cent",
        "低比例是问题，不能倒说成平衡已实现。"
      ]
    ],
    [
      "B",
      "偷换对象",
      "B把拟议立法直接当作对自愿行动号召的响应，忽略号召先失败、才改用强制手段这一转折。",
      [
        "转向立法前，自愿倡议被认为怎样？",
        [
          "失败",
          "已成功实现目标"
        ],
        "失败",
        "her appeal was considered a failure",
        "立法是失败后的补救，不是自愿号召本身的成功落实。"
      ]
    ],
    [
      "D",
      "与原文相反",
      "D说自愿行动，legislation与compel恰好是法律强制。",
      [
        "compel更接近自愿参加还是强制要求？",
        [
          "强制要求",
          "自愿参加"
        ],
        "强制要求",
        "legislation to compel corporate boards",
        "不要把前一年voluntary action套到新立法。"
      ]
    ]
  ],
  "confirm": [
    "was born of frustration说明提议的结果还是起因？",
    [
      "起因",
      "结果"
    ],
    "起因",
    "was born of frustration",
    "先有受挫，才有强制方案。"
  ],
  "paths": [
    [
      5,
      8
    ],
    [
      4,
      5,
      8
    ]
  ],
  "language": [
    [
      "欧盟拟议的立法属于什么样的选择？",
      "intended是计划中的，不等于已生效。"
    ],
    [
      "性别平衡的体现",
      "reflection假定现实已平衡。"
    ],
    [
      "对雷丁呼吁的响应",
      "需分清此前呼吁是自愿行动。"
    ],
    [
      "不情愿但不得不作的选择",
      "reluctant呼应frustration和自愿方式失效。"
    ],
    [
      "自愿行动",
      "与compel法律强制相反。"
    ]
  ]
}),
make("2013-p4",raw[2],{
  "answer": "A",
  "sentence": 12,
  "type": "比喻释义",
  "scope": "sentence",
  "instruction": "把glass ceiling理解为女性晋升高层的隐形障碍，再用同句top business positions验证。",
  "evidence": [
    {
      "id": "2013-p4-q38-ceiling",
      "sentenceId": "2013-p4-s12",
      "quote": "they break through the glass ceiling",
      "role": "配额帮助打破晋升障碍。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q38-positions",
      "sentenceId": "2013-p4-s12",
      "quote": "placing women in top business positions",
      "role": "同句明确结果是女性进入企业高层。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p4-q38-positions"
  ],
  "paraphrase": "placing women in top business positions → 女性获得高层职位 → get top business positions。",
  "limit": "配额促成机会，不等于所有女性都自动获得职位。",
  "right": "A把突破玻璃天花板落实为进入企业高层。",
  "wrong": [
    [
      "B",
      "偷换对象",
      "B用see through替换break through，把突破晋升障碍偷换为看穿或看透。",
      [
        "break through强调突破障碍还是看透事物？",
        [
          "突破障碍",
          "看透事物"
        ],
        "突破障碍",
        "break through the glass ceiling",
        "比喻重点是获得晋升通道，不是观察能力。"
      ]
    ],
    [
      "C",
      "事实成立，非本题所求",
      "C的兼顾工作家庭是全文背景目标，但雷丁此处直接说配额帮助女性进入高层。",
      [
        "雷丁这句话直接点出的职位层级是什么？",
        [
          "企业高层",
          "家庭照护岗位"
        ],
        "企业高层",
        "top business positions",
        "不能用另一段背景替代当前效果。"
      ]
    ],
    [
      "D",
      "偷换对象",
      "D把具法律约束力的规定产生效果，改成女性预见法律结果；原文没有anticipate的行为。",
      [
        "legally binding说的是规定的约束力还是女性的预见能力？",
        [
          "规定的约束力",
          "女性的预见能力"
        ],
        "规定的约束力",
        "legally binding provisions",
        "法律属性不等于预测结果。"
      ]
    ]
  ],
  "confirm": [
    "glass ceiling在本文是建筑天花板还是隐形晋升障碍？",
    [
      "隐形晋升障碍",
      "建筑天花板"
    ],
    "隐形晋升障碍",
    "placing women in top business positions",
    "后文职位说明限定了比喻含义。"
  ],
  "paths": [
    [
      12
    ]
  ],
  "language": [
    [
      "依照雷丁的看法，配额可能帮助女性怎样？",
      "According to限定观点属于雷丁。"
    ],
    [
      "获得企业高层职位",
      "top business positions对应原文。"
    ],
    [
      "看穿玻璃天花板",
      "see through与break through动作不同。"
    ],
    [
      "平衡工作和家庭",
      "这是别段讨论的目标，不是当前直接效果。"
    ],
    [
      "预见法律结果",
      "anticipate是预见，不是遵守具有约束力的规定。"
    ]
  ]
}),
make("2013-p4",raw[3],{
  "answer": "D",
  "sentence": 15,
  "type": "作者态度",
  "scope": "whole-passage",
  "instruction": "先分清作者与雷丁的声音，再保留But后的现实权衡；作者不喜欢配额但认可暂时强制的必要。",
  "evidence": [
    {
      "id": "2013-p4-q39-reservation",
      "sentenceId": "2013-p4-s14",
      "quote": "I don't like quotas either; they run counter to my belief in meritocracy",
      "role": "作者承认原则上的保留。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q39-support",
      "sentenceId": "2013-p4-s15",
      "quote": "it does look as if a fairer world must be temporarily ordered",
      "role": "现实障碍使作者接受暂时强制。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q39-obstacle",
      "sentenceId": "2013-p4-s16",
      "quote": "no matter how much \"soft pressure\" is put upon them",
      "role": "长期软性压力无效支持采取实质政策。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p4-q39-support"
  ],
  "paraphrase": "承认阻碍并肯定必须暂时强制建立公平 → 支持雷丁的配额主张 → approval。",
  "limit": "支持是有保留、考虑现实的支持，不是无条件热爱配额或主张永久施行。",
  "right": "D抓住But后的结论；前面的不喜欢是让步，不是最终反对。",
  "wrong": [
    [
      "A",
      "把局部当全文",
      "A只抓不喜欢和不情愿，漏掉But后肯定暂时强制必要的判断。",
      [
        "作者权衡后的转折落在哪个方向？",
        [
          "接受暂时强制",
          "否认配额一切作用"
        ],
        "接受暂时强制",
        "a fairer world must be temporarily ordered",
        "前面的保留不能盖过最后的政策判断。"
      ]
    ],
    [
      "B",
      "偷换对象",
      "B说只是客观描述，作者却用my belief和must明确提出自身立场与判断。",
      [
        "my belief和must表明作者是否表达个人立场？",
        [
          "表达了",
          "完全未表达"
        ],
        "表达了",
        "my belief in meritocracy",
        "能理解双方考虑，不等于没有支持立场。"
      ]
    ],
    [
      "C",
      "与原文相反",
      "C说漠不关心，但作者讨论原则、现实障碍和公共政策，显然在认真回应。",
      [
        "文章是否只是对配额漠然不理？",
        [
          "不是",
          "是"
        ],
        "不是",
        "I understand Reding's reluctance",
        "认真权衡并提出判断，不是冷漠。"
      ]
    ]
  ],
  "confirm": [
    "temporarily把作者支持的强制安排限定为怎样？",
    [
      "暂时的",
      "永久无条件的"
    ],
    "暂时的",
    "temporarily ordered",
    "态度题保留限定，但有限定仍可属于支持。"
  ],
  "paths": [
    [
      14,
      15
    ],
    [
      15,
      16
    ]
  ],
  "language": [
    [
      "作者对雷丁倡议持怎样的态度？",
      "author不是单指引用的雷丁本人。"
    ],
    [
      "怀疑",
      "skepticism强调不相信或质疑。"
    ],
    [
      "客观中立",
      "objectiveness指客观性，此处不能代替实际支持立场。"
    ],
    [
      "漠不关心",
      "indifference是不在意。"
    ],
    [
      "赞成；支持",
      "approval允许包含现实权衡和保留。"
    ]
  ]
}),
make("2013-p4",raw[4],{
  "answer": "C",
  "sentence": 18,
  "type": "虚拟条件推断",
  "scope": "paragraph",
  "instruction": "从If公共政策到位→桑德伯格不再比别人更有新闻价值，反推现实中政策不足使女性高管仍显特殊。",
  "evidence": [
    {
      "id": "2013-p4-q40-exception",
      "sentenceId": "2013-p4-s17",
      "quote": "they attract massive attention precisely because they remain the exception to the rule",
      "role": "受到关注是因为女性高管依然是例外。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q40-policy",
      "sentenceId": "2013-p4-s18",
      "quote": "If appropriate public policies were in place to help all women",
      "role": "提出与现实相反或尚未实现的政策条件。",
      "strength": "直接证据"
    },
    {
      "id": "2013-p4-q40-news",
      "sentenceId": "2013-p4-s18",
      "quote": "Sandberg would be no more newsworthy than any other highly capable person",
      "role": "条件实现后就不比其他能干者更值得报道。",
      "strength": "直接证据"
    }
  ],
  "minimal": [
    "2013-p4-q40-policy",
    "2013-p4-q40-news"
  ],
  "paraphrase": "appropriate public policies若到位便不再异常受关注 → 现实缺少合适政策 → lack of suitable public policies。",
  "limit": "并不是女性缺乏能力，也不是完全没有新闻价值，而是不再因性别稀少而格外显眼。",
  "right": "C与最后一句if条件中的appropriate public policies直接对应。",
  "wrong": [
    [
      "A",
      "范围扩大",
      "A的社会公正是较宽泛目标，题目所问的直接缺失条件是适当公共政策。",
      [
        "If直接提出哪一个条件？",
        [
          "适当公共政策到位",
          "笼统增加媒体报道"
        ],
        "适当公共政策到位",
        "If appropriate public policies were in place",
        "社会更公正是期待的环境，最精确原因在政策条件。"
      ]
    ],
    [
      "B",
      "与原文相反",
      "B说缺乏大量媒体关注，但第17句明说她们已吸引massive attention。",
      [
        "原文对媒体关注说多还是少？",
        [
          "多",
          "少"
        ],
        "多",
        "they attract massive attention",
        "不能把已经存在的关注当作缺失原因。"
      ]
    ],
    [
      "D",
      "与原文相反",
      "D说只缺更大的软性压力，前句说明无论多少软性压力都未有效改变企业做法。",
      [
        "作者认为再多软性压力就一定有效吗？",
        [
          "没有这样说",
          "是"
        ],
        "没有这样说",
        "no matter how much \"soft pressure\"",
        "原文把软性压力失效作为改用公共政策的理由。"
      ]
    ]
  ],
  "confirm": [
    "no more newsworthy than表示完全没新闻价值吗？",
    [
      "不是，只是不比别人更突出",
      "是"
    ],
    "不是，只是不比别人更突出",
    "no more newsworthy than any other highly capable person",
    "比较否定不能扩大为绝对否定。"
  ],
  "paths": [
    [
      18
    ],
    [
      17,
      18
    ]
  ],
  "language": [
    [
      "女性进入高层成为新闻头条，是由于缺少什么？",
      "lack of是缺失原因，选项须与虚拟条件对应。"
    ],
    [
      "更多社会公正",
      "范围比明确的公共政策宽。"
    ],
    [
      "大量媒体关注",
      "原文说已有大量关注。"
    ],
    [
      "适当的公共政策",
      "suitable对应appropriate。"
    ],
    [
      "更大的软性压力",
      "原文表明软性压力不足以奏效。"
    ]
  ]
})
];
