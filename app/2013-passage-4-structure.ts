import type { SentenceAnalysis } from "./data";
export const passage2013P4Deep:Record<number,Partial<SentenceAnalysis>> = {
  "2": {
    "grammarPatches": [
      {
        "explanation": "先看到never，再等到until后的必要条件；女性参与决策前，不能称职场完全照顾家庭。",
        "relation": "never be family-friendly的成立界限由until women are part of...给出。",
        "term": "否定主句与until时间从句",
        "transferRule": "not/never...until常读作直到……才；先找此前不能成立的事。"
      }
    ]
  },
  "9": {
    "grammarPatches": [
      {
        "explanation": "保证的内容是一整件事：女性能公平晋升；兼顾家庭工作是同时面对的处境。",
        "relation": "ensure带that宾语从句，其中as they balance...交代同时发生的活动。",
        "term": "宾语从句内含时间状语从句",
        "transferRule": "嵌套结构先找最外层动作，再把从句主谓单独读完整。"
      }
    ]
  },
  "12": {
    "grammarPatches": [
      {
        "explanation": "结果指前面配额促进平等、突破晋升障碍的作用，并非雷丁这个人。",
        "relation": "a result seen...补充前面的行动效果；with legally binding provisions限定countries。",
        "term": "同位补充、过去分词与介词短语后置修饰",
        "transferRule": "先确认被解释的是人、事物还是整件事，再决定中文承接词。"
      }
    ]
  },
  "15": {
    "grammarPatches": [
      {
        "explanation": "作者先权衡现实障碍，再承认临时强制的必要；does是强调，不是又一个动作。",
        "relation": "when交代情形，it does look as if引出判断，temporarily限制时间。",
        "term": "强调助动词与as if表语从句",
        "transferRule": "判断作者态度须同时读转折后的立场和范围限制。"
      }
    ],
    "trunk": "it does look as if a fairer world must be temporarily ordered",
    "literal": "但当人考虑到实现任人唯贤理想的障碍时，确实看起来，好像一个更公平的世界必须暂时被强制安排出来。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "when one considers the obstacles to achieving the meritocratic ideal",
          "form": "when从句",
          "function": "时间/情境状语",
          "modifies": "it does look",
          "explanation": "先把现实障碍放进考虑，再作后面的权衡。",
          "relationKind": "modifier"
        },
        {
          "text": "it",
          "form": "非指称代词",
          "function": "主语",
          "modifies": "does look",
          "explanation": "it指示当前情境，不回指某个具体障碍；as if从句补足look，不是真实主语。",
          "relationKind": "trunk"
        },
        {
          "text": "does look",
          "form": "强调助动词与系动词",
          "function": "谓语",
          "modifies": "it",
          "explanation": "does强调确实如此，look不是用眼睛看。",
          "relationKind": "trunk"
        },
        {
          "text": "as if a fairer world must be temporarily ordered",
          "form": "as if从句",
          "function": "表语",
          "modifies": "look",
          "explanation": "具体说明看起来怎样；temporarily限制强制规定持续的时间。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "a fairer world",
              "form": "名词短语",
              "function": "从句主语",
              "modifies": "must be temporarily ordered",
              "explanation": "更公平的世界是被强制安排建立的对象。",
              "relationKind": "clause-internal"
            },
            {
              "text": "must be temporarily ordered",
              "form": "情态动词被动结构",
              "function": "从句谓语",
              "modifies": "a fairer world",
              "explanation": "must表示在现实障碍下有必要；temporarily不是永远。",
              "relationKind": "clause-internal"
            }
          ]
        }
      ],
      "clauses": [
        {
          "text": "when one considers the obstacles to achieving the meritocratic ideal",
          "type": "时间状语从句",
          "marker": "when",
          "role": "限定作判断时考虑的情形",
          "subject": "one",
          "predicate": "considers",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "the obstacles to achieving the meritocratic ideal"
            }
          ],
          "translationOrder": "当人考虑到实现该理想的障碍时"
        },
        {
          "text": "as if a fairer world must be temporarily ordered",
          "type": "表语从句",
          "marker": "as if",
          "role": "补充look的判断内容",
          "subject": "a fairer world",
          "predicate": "must be temporarily ordered",
          "predicateDetails": [],
          "translationOrder": "似乎更公平的世界必须暂时靠强制规定建立"
        }
      ]
    }
  },
  "16": {
    "grammarPatches": [
      {
        "explanation": "证据显示公司仍在回避任人唯贤，软性压力再多也没改变这一点。",
        "relation": "shown的that宾语从句里，corporations是are evading的主语；them回指公司。",
        "term": "宾语从句与no matter how much让步从句",
        "transferRule": "主句和宾语从句各找一次主谓，别把地点或数量误认作动作主体。"
      }
    ],
    "trunk": "evidence has now shown that corporations are evading the meritocratic hiring and promotion",
    "literal": "毕竟，四十年的证据已经表明，公司——在欧洲以及美国的——正在回避女性的任人唯贤式招聘与向高层的晋升，不论有多少软性压力被施加在它们身上。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "four decades of evidence",
          "form": "数量结构修饰不可数名词",
          "function": "主语",
          "modifies": "has now shown",
          "explanation": "重点是四十年来积累的evidence，原卷因此接has。",
          "relationKind": "trunk"
        },
        {
          "text": "has now shown",
          "form": "现在完成时",
          "function": "谓语",
          "modifies": "evidence",
          "explanation": "证据到现在已经显示这一事实。",
          "relationKind": "trunk"
        },
        {
          "text": "that corporations in Europe as well as the US are evading the meritocratic hiring and promotion of women to top positions",
          "form": "that从句",
          "function": "宾语",
          "modifies": "shown",
          "explanation": "所显示的是公司回避按能力选人的事实。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "corporations in Europe as well as the US",
              "form": "名词及地点定语",
              "function": "从句主语",
              "modifies": "are evading",
              "explanation": "地点同时包含欧洲和美国；as well as连接地点。",
              "relationKind": "clause-internal"
            },
            {
              "text": "are evading",
              "form": "现在进行时",
              "function": "从句谓语",
              "modifies": "corporations",
              "explanation": "公司是回避行为的执行者。",
              "relationKind": "clause-internal"
            },
            {
              "text": "the meritocratic hiring and promotion of women to top positions",
              "form": "并列名词短语",
              "function": "从句宾语",
              "modifies": "are evading",
              "explanation": "hiring招聘与promotion晋升并列，women为两种动作的对象。",
              "relationKind": "clause-internal"
            }
          ]
        },
        {
          "text": "no matter how much \"soft pressure\" is put upon them",
          "form": "no matter how much让步结构",
          "function": "让步状语",
          "modifies": "are evading",
          "explanation": "不管劝说压力多大，公司仍回避；them指公司。",
          "relationKind": "modifier"
        }
      ],
      "clauses": [
        {
          "text": "that corporations in Europe as well as the US are evading the meritocratic hiring and promotion of women to top positions",
          "type": "宾语从句",
          "marker": "that",
          "role": "作shown宾语",
          "subject": "corporations in Europe as well as the US",
          "predicate": "are evading",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "the meritocratic hiring and promotion of women to top positions"
            }
          ],
          "translationOrder": "公司仍在回避按能力招聘和晋升女性"
        },
        {
          "text": "no matter how much \"soft pressure\" is put upon them",
          "type": "让步状语从句",
          "marker": "no matter how much",
          "role": "补充软性压力无法改变的情形",
          "subject": "\"soft pressure\"",
          "predicate": "is put",
          "predicateDetails": [
            {
              "function": "方向状语",
              "text": "upon them"
            }
          ],
          "translationOrder": "不论多少软性压力被施加在公司身上"
        }
      ]
    }
  },
  "17": {
    "grammarPatches": [
      {
        "explanation": "确实突破的是女性，Sandberg是一个例子；受到关注是因为这种成功仍少见。",
        "relation": "do强调break through；did省去相同动作；because指向她们是例外。",
        "term": "强调、动词替代与原因从句",
        "transferRule": "do/did既能强调也能替代，先看后面是否还有实义动词。"
      }
    ]
  },
  "18": {
    "grammarPatches": [
      {
        "explanation": "如果制度支持普遍到位，她就不比其他能人更稀奇；原文没有说她不优秀。",
        "relation": "If...were与would be构成假设；no more newsworthy than否定比较优势。",
        "term": "非现实条件句与否定比较",
        "transferRule": "no more A than B表示并不比B更A，不要偷换成完全不A。"
      }
    ],
    "trunk": "Sandberg would be no more newsworthy than any other highly capable person",
    "literal": "如果合适的公共政策已经就位，来帮助所有女性——无论首席执行官还是孩子的照护者——以及所有家庭，那么桑德伯格的新闻价值就不会比在更公正社会生活的任何其他能人更多。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "If appropriate public policies were in place to help all women – whether CEOs or their children's caregivers – and all families",
          "form": "if非现实条件从句",
          "function": "条件状语",
          "modifies": "Sandberg would be no more newsworthy",
          "explanation": "先假设政策能普遍帮助女性与家庭，现实尚未充分做到。",
          "relationKind": "modifier",
          "children": [
            {
              "text": "to help all women – whether CEOs or their children's caregivers – and all families",
              "form": "目的不定式",
              "function": "目的状语",
              "modifies": "were in place",
              "explanation": "政策要帮助女性及家庭；whether插入说明女性身份可以不同。",
              "relationKind": "modifier"
            },
            {
              "text": "whether CEOs or their children's caregivers",
              "form": "whether...or省略结构",
              "function": "插入补充",
              "modifies": "all women",
              "explanation": "两个身份是对women的举例，caregivers不是另一个被排除的群体。",
              "relationKind": "supplement"
            }
          ]
        },
        {
          "text": "Sandberg",
          "form": "专有名词",
          "function": "主语",
          "modifies": "would be",
          "explanation": "新闻关注度比较的对象。",
          "relationKind": "trunk"
        },
        {
          "text": "would be",
          "form": "条件结果中的系动词",
          "function": "谓语",
          "modifies": "Sandberg",
          "explanation": "would呼应前面的非现实if假设。",
          "relationKind": "trunk"
        },
        {
          "text": "no more newsworthy than any other highly capable person living in a more just society",
          "form": "否定比较形容词短语",
          "function": "表语",
          "modifies": "would be",
          "explanation": "并不比其他能人更有新闻价值，不是毫无新闻价值。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "living in a more just society",
              "form": "现在分词短语",
              "function": "后置定语",
              "modifies": "person",
              "explanation": "living的执行者为person；just形容公正而非副词仅仅。",
              "relationKind": "modifier"
            }
          ]
        }
      ],
      "clauses": [
        {
          "text": "If appropriate public policies were in place to help all women – whether CEOs or their children's caregivers – and all families",
          "type": "条件状语从句（非现实假设）",
          "marker": "If",
          "role": "限定后面比较成立的政策条件",
          "subject": "appropriate public policies",
          "predicate": "were",
          "predicateDetails": [
            {
              "function": "表语",
              "text": "in place"
            },
            {
              "function": "目的状语",
              "text": "to help all women – whether CEOs or their children's caregivers – and all families"
            }
          ],
          "translationOrder": "如果政策已经就位且能帮助所有女性与家庭"
        },
        {
          "text": "whether CEOs or their children's caregivers",
          "type": "让步省略结构",
          "marker": "whether...or",
          "role": "补充all women的不同身份",
          "subject": "省略的女性",
          "predicate": "省略的are",
          "predicateDetails": [
            {
              "function": "表语",
              "text": "CEOs or their children's caregivers"
            }
          ],
          "translationOrder": "不管是首席执行官还是孩子的照护者"
        }
      ]
    },
    "practice": [
      {
        "id": "2013-p4-s18-scope",
        "revision": 1,
        "kind": "range",
        "prompt": "划出否定比较的完整表语，从no more开始，到society结束。",
        "options": [],
        "answer": "no more newsworthy than any other highly capable person living in a more just society",
        "evidence": "no more newsworthy than",
        "feedback": "否定的是比其他能人更有新闻价值；不等于完全没新闻价值。",
        "conceptId": "lexical-context",
        "errorType": "option-logic",
        "purpose": "answer-scope"
      }
    ]
  }
};
