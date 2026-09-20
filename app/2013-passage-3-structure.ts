import type { SentenceAnalysis } from "./data";
export const passage2013P3Deep: Record<number,Partial<SentenceAnalysis>> = {
  "1": {
    "grammarPatches": [
      {
        "explanation": "先找到科学家的发现是什么：we can reduce...；中间插入的although承认倾向，if提出改变条件。",
        "relation": "found带that宾语从句，从句中although和if各自限定后面的we can reduce。",
        "term": "宾语从句内嵌让步和条件从句",
        "transferRule": "多重连接词先按层级找各自主句，不把if后的动作误当最终结论。"
      }
    ],
    "trunk": "Scientists have found that we can reduce or even eliminate the negative effects",
    "literal": "科学家发现，虽然我们容易作出突然的过度反应，但如果稍停片刻、想想自己可能怎样反应，就能减轻甚至消除快速本能反应的不良影响。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "Scientists",
          "form": "名词复数",
          "function": "主语",
          "modifies": "have found",
          "explanation": "发现结论的是科学家。",
          "relationKind": "trunk"
        },
        {
          "text": "have found",
          "form": "现在完成时动词",
          "function": "谓语",
          "modifies": "Scientists",
          "explanation": "把研究结果引出。",
          "relationKind": "trunk"
        },
        {
          "text": "that although we are prone to snap overreactions, if we take a moment and think about how we are likely to react, we can reduce or even eliminate the negative effects of our quick, hard-wired responses",
          "form": "that宾语从句",
          "function": "宾语",
          "modifies": "have found",
          "explanation": "整个让步、条件和结果都属于科学家的发现。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "although we are prone to snap overreactions",
              "form": "although从句",
              "function": "让步状语",
              "modifies": "we can reduce or even eliminate",
              "explanation": "承认本能的过度反应倾向。",
              "relationKind": "modifier"
            },
            {
              "text": "if we take a moment and think about how we are likely to react",
              "form": "if从句",
              "function": "条件状语",
              "modifies": "we can reduce or even eliminate",
              "explanation": "先停顿并想想反应方式，才可能减少影响。",
              "relationKind": "modifier"
            },
            {
              "text": "we can reduce or even eliminate the negative effects of our quick, hard-wired responses",
              "form": "主句",
              "function": "宾语从句的主句",
              "modifies": "that",
              "explanation": "核心结果是我们能减少甚至消除不良影响。",
              "relationKind": "clause-internal"
            }
          ]
        }
      ],
      "clauses": [
        {
          "text": "that although we are prone to snap overreactions, if we take a moment and think about how we are likely to react, we can reduce or even eliminate the negative effects of our quick, hard-wired responses",
          "type": "宾语从句",
          "marker": "that",
          "role": "作found宾语",
          "subject": "we",
          "predicate": "can reduce / eliminate",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "the negative effects of our quick, hard-wired responses"
            }
          ],
          "translationOrder": "先抓能减少影响，再补尽管容易过度反应、如果先停顿的限制。"
        },
        {
          "text": "although we are prone to snap overreactions",
          "type": "让步状语从句",
          "marker": "although",
          "role": "说明即使有这种倾向仍可改变",
          "subject": "we",
          "predicate": "are",
          "predicateDetails": [
            {
              "function": "表语",
              "text": "prone to snap overreactions"
            }
          ],
          "translationOrder": "虽然容易过度反应。"
        },
        {
          "text": "if we take a moment and think about how we are likely to react",
          "type": "条件状语从句",
          "marker": "if",
          "role": "限定减轻影响的条件",
          "subject": "we",
          "predicate": "take / think",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "a moment"
            },
            {
              "function": "介词宾语",
              "text": "how we are likely to react"
            }
          ],
          "translationOrder": "如果花点时间并思考可能如何反应。"
        },
        {
          "text": "how we are likely to react",
          "type": "宾语从句",
          "marker": "how",
          "role": "作about的宾语",
          "subject": "we",
          "predicate": "are",
          "predicateDetails": [
            {
              "function": "表语",
              "text": "likely to react"
            }
          ],
          "translationOrder": "考虑我们可能怎样反应。"
        }
      ]
    }
  },
  "4": {
    "grammarPatches": [
      {
        "explanation": "studies show只是说明研究是信息来源，拿掉它仍能读出we need...。",
        "relation": "To accurately tell...表示目的；studies show是插入语；we need是主干。",
        "term": "不定式目的状语与插入语",
        "transferRule": "被逗号隔开的来源说明常可暂时跳过，再回到完整主干。"
      }
    ]
  },
  "7": {
    "grammarPatches": [
      {
        "explanation": "不是心理学家让我们读快，而是短暂看标志这件事诱发阅读变快。",
        "relation": "viewing...整组作primes的主语；us是受影响的人；to read说明诱发的行为。",
        "term": "动名词主语与宾语补足语",
        "transferRule": "动词前一大串以doing开头时，先检查整个行为是否作主语。"
      }
    ]
  },
  "8": {
    "grammarPatches": [
      {
        "explanation": "Subjects是研究被试，exposed to...说他们接触过图像，被试才是tend的主语。",
        "relation": "exposed to fast-food flashes限定Subjects，被试是接触刺激的一方。",
        "term": "过去分词短语作后置定语",
        "transferRule": "找有时态的主谓，不要把名词后的过去分词定语另算为句子谓语。"
      }
    ]
  },
  "10": {
    "grammarPatches": [
      {
        "explanation": "购买前先停顿是建议；笑脸影响以及括号解释都位于条件部分。",
        "relation": "If we know...一直到括号结束才接主句we can take；when说明发生影响的时间。",
        "term": "条件从句内嵌宾语与时间从句",
        "transferRule": "长条件读完后仍要等主句；括号信息不改变主句的动作主体。"
      }
    ]
  },
  "12": {
    "grammarPatches": [
      {
        "explanation": "可靠的快速判断不是凭空出现，必须先以长期深入了解为基础。",
        "relation": "only after限定thin slice reliably成立的时间前提；ground A in B说明A以B为基础。",
        "term": "only after引导时间状语从句",
        "transferRule": "only before/after要保留先后和限制，不能只摘出快速而漏掉前提。"
      }
    ],
    "trunk": "John Gottman explains that we \"thin slice\" information",
    "literal": "婚姻专家约翰·戈特曼解释说，只有先用长期深入研究为这类即时反应打好基础，我们才能快速而可靠地从少量信息中作判断。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "John Gottman",
          "form": "专有名词",
          "function": "主语",
          "modifies": "explains",
          "explanation": "提供解释的专家。",
          "relationKind": "trunk"
        },
        {
          "text": "the marriage expert",
          "form": "名词短语",
          "function": "同位语",
          "modifies": "John Gottman",
          "explanation": "补充专家的研究领域。",
          "relationKind": "supplement"
        },
        {
          "text": "explains",
          "form": "动词",
          "function": "谓语",
          "modifies": "John Gottman",
          "explanation": "引出他解释的内容。",
          "relationKind": "trunk"
        },
        {
          "text": "that we quickly \"thin slice\" information reliably only after we ground such snap reactions in \"thick sliced\" long-term study",
          "form": "that宾语从句",
          "function": "宾语",
          "modifies": "explains",
          "explanation": "可靠快判断需要长期研究打底。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "we quickly \"thin slice\" information reliably",
              "form": "主谓宾结构",
              "function": "宾语从句主句",
              "modifies": "that",
              "explanation": "我们快速截取少量信息作出可靠判断。",
              "relationKind": "clause-internal"
            },
            {
              "text": "only after we ground such snap reactions in \"thick sliced\" long-term study",
              "form": "时间限制从句",
              "function": "时间状语",
              "modifies": "\"thin slice\" information reliably",
              "explanation": "只有在长期深入研究之后，可靠性才有基础。",
              "relationKind": "modifier"
            }
          ]
        }
      ],
      "clauses": [
        {
          "text": "that we quickly \"thin slice\" information reliably only after we ground such snap reactions in \"thick sliced\" long-term study",
          "type": "宾语从句",
          "marker": "that",
          "role": "作explains的宾语",
          "subject": "we",
          "predicate": "\"thin slice\"",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "information"
            }
          ],
          "translationOrder": "我们能快速可靠判断，但须保留only after条件。"
        },
        {
          "text": "after we ground such snap reactions in \"thick sliced\" long-term study",
          "type": "时间状语从句",
          "marker": "after",
          "role": "限定可靠判断之前须完成的基础工作",
          "subject": "we",
          "predicate": "ground",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "such snap reactions"
            },
            {
              "function": "介词补足",
              "text": "in \"thick sliced\" long-term study"
            }
          ],
          "translationOrder": "先使反应建立在深入长期研究上。"
        }
      ]
    },
    "practice": [
      {
        "id": "2013-p3-s12-premise",
        "revision": 1,
        "kind": "range",
        "prompt": "划出可靠快速判断成立的完整时间前提，从only开始。",
        "options": [],
        "answer": "only after we ground such snap reactions in \"thick sliced\" long-term study",
        "evidence": "only after",
        "feedback": "only after后是必须先完成的长期深入研究，不是thin slice快判断本身。",
        "conceptId": "lexical-context",
        "errorType": "option-logic",
        "purpose": "answer-scope"
      }
    ]
  },
  "14": {
    "grammarPatches": [
      {
        "explanation": "前面讲人的一种能力，is后解释正是这种能力让人区别于动物。",
        "relation": "Our ability...作主语，what differentiates...作表语；what在从句内也作主语。",
        "term": "what引导表语从句",
        "transferRule": "what从句可以整体当一个成分，内部仍须辨认what担任的角色。"
      }
    ],
    "trunk": "Our ability is what differentiates us from animals",
    "literal": "我们能通过停顿抑制本能反应，这种能力使人区别于动物：狗只会断断续续地想未来，或者只想几分钟后的事情。",
    "beginnerSyntax": {
      "components": [
        {
          "text": "Our ability to mute our hard-wired reactions by pausing",
          "form": "名词与不定式结构",
          "function": "主语",
          "modifies": "is",
          "explanation": "谈论的不是动物，而是人的一种能力。",
          "relationKind": "trunk",
          "children": [
            {
              "text": "to mute our hard-wired reactions by pausing",
              "form": "不定式短语",
              "function": "后置定语",
              "modifies": "ability",
              "explanation": "说明能力的具体内容；暂停的是我们。",
              "relationKind": "modifier"
            }
          ]
        },
        {
          "text": "is",
          "form": "系动词",
          "function": "谓语",
          "modifies": "Our ability",
          "explanation": "把能力与区分人和动物的因素联系起来。",
          "relationKind": "trunk"
        },
        {
          "text": "what differentiates us from animals",
          "form": "what从句",
          "function": "表语",
          "modifies": "is",
          "explanation": "what代表使两者不同的因素，并在从句内作主语。",
          "relationKind": "trunk"
        },
        {
          "text": "dogs can think about the future only intermittently or for a few minutes",
          "form": "独立说明句",
          "function": "冒号后说明",
          "modifies": "人类与动物的区别",
          "explanation": "狗只能短暂或间歇考虑未来，说明对比。",
          "relationKind": "supplement"
        }
      ],
      "clauses": [
        {
          "text": "what differentiates us from animals",
          "type": "表语从句",
          "marker": "what",
          "role": "作is的表语",
          "subject": "what",
          "predicate": "differentiates",
          "predicateDetails": [
            {
              "function": "宾语",
              "text": "us"
            },
            {
              "function": "介词补足",
              "text": "from animals"
            }
          ],
          "translationOrder": "这正是使我们区别于动物的东西。"
        }
      ]
    }
  }
};
