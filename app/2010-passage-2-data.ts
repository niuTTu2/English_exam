import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2010P2BlockTranslations } from "./2010-passage-2-guide";
import { passage2010P2Practice } from "./2010-passage-2-practice";
import { passage2010P2Reasoning } from "./2010-passage-2-evidence";
import { passage2010P2QuestionAnalysis } from "./2010-passage-2-question-analysis";
import { passage2010P2Reading } from "./2010-passage-2-reading";
import type { Question, SentenceAnalysis, SyntaxVisualRole } from "./data";

const passage2010P2Drafts: Omit<SentenceAnalysis, "chunks">[] = [
  {
    id: "2010-p2-s1", number: 1,
    text: "I was addressing a small gathering in a suburban Virginia living room – a women's group that had invited men to join them.",
    trunk: "I was addressing a gathering.",
    layers: [{ label: "主干", text: "I was addressing a small gathering：我正在向一小群聚会者讲话，address 在这里不是地址。" }, { label: "地点", text: "in a suburban Virginia living room：在弗吉尼亚州郊区一户人家的客厅里。" }, { label: "同位解释和限定", text: "a women's group 解释 gathering 是什么聚会；that had invited... 说明这群女性事先邀请了男性。" }],
    grammar: ["was addressing 是过去进行时，为后面的现场对话交代背景；address + 听众直接接宾语。", "破折号后的名词短语是同位说明，不是另一个完整句子；women's 是不规则复数 women 的所有格。", "that 引导定语从句并作从句主语；had invited 是过去完成时，邀请先于现场讲话；invite somebody to do something 中 to join them 说明邀请男性做什么。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s1"], components: [
      {
        "explanation": "叙述者是讲话的人。",
        "form": "人称代词",
        "function": "主语",
        "modifies": "was addressing",
        "text": "I"
      },
      {
        "explanation": "当时正在向听众讲话，address 直接带听众宾语。",
        "form": "was + 现在分词",
        "function": "谓语（过去进行时）",
        "modifies": "I",
        "text": "was addressing"
      },
      {
        "explanation": "中心 gathering 表聚会的人群；small 限定人数。",
        "form": "名词短语",
        "function": "宾语",
        "modifies": "addressing",
        "text": "a small gathering"
      },
      {
        "explanation": "交代讲话地点；living room 是名词组合‘客厅’，Virginia 说明地区。",
        "form": "in + 名词短语",
        "function": "地点状语",
        "modifies": "was addressing",
        "text": "in a suburban Virginia living room"
      },
      {
        "children": [
          {
            "explanation": "women's 为复数所有格，表示女性组成的团体。",
            "form": "名词短语",
            "function": "同位语中心",
            "modifies": "gathering",
            "text": "a women's group"
          },
          {
            "children": [
              {
                "explanation": "代替 group，不是没有句法作用的内容连接词。",
                "form": "关系代词",
                "function": "从句主语",
                "modifies": "had invited",
                "text": "that"
              },
              {
                "explanation": "过去完成时标先前已发出邀请。",
                "form": "had + 过去分词",
                "function": "从句谓语",
                "modifies": "that（group）",
                "text": "had invited"
              },
              {
                "explanation": "被邀请的人，也是不定式动作的执行者。",
                "form": "名词复数",
                "function": "从句宾语",
                "modifies": "had invited",
                "text": "men"
              },
              {
                "explanation": "join 的逻辑主语是 men，宾语 them 指女性团体。",
                "form": "to 不定式短语",
                "function": "宾语补足语",
                "modifies": "men",
                "text": "to join them"
              }
            ],
            "explanation": "that 指 group，作从句主语；邀请发生在讲话之前。",
            "form": "that + 完整从句",
            "function": "限制性定语从句",
            "modifies": "group",
            "text": "that had invited men to join them"
          }
        ],
        "explanation": "破折号后解释这群聚会者，并不解释客厅。",
        "form": "名词短语 + 定语从句",
        "function": "同位说明",
        "modifies": "a small gathering",
        "text": "a women's group that had invited men to join them"
      }
    ], clauses: [
      {
        "text": "that had invited men to join them",
        "type": "限制性定语从句",
        "marker": "that",
        "role": "修饰 group",
        "subject": "that（指 group）",
        "predicate": "had invited",
        "translationOrder": "先理解‘邀请男性加入她们的’，再回到‘女性团体’。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "men"
          },
          {
            "function": "宾语补足语",
            "text": "to join them"
          }
        ]
      }
    ] },
    literal: "我当时正在弗吉尼亚州郊区的一间客厅里向一个小型聚会讲话——那是一个邀请了男性加入她们的女性团体。",
    natural: "我当时在弗吉尼亚州郊区一户人家的客厅里，对一小群聚会者讲话。这是一个女性团体组织的聚会，她们也邀请了男性参加。",
    logic: "用亲历场景开篇，交代讨论发生的地点和听众，为夫妻在公开场合的表现作铺垫。",
    phrases: ["was addressing a small gathering", "had invited men to join them"],
  },
  {
    id: "2010-p2-s2", number: 2,
    text: "Throughout the evening, one man had been particularly talkative, frequently offering ideas and anecdotes, while his wife sat silently beside him on the couch.",
    trunk: "one man had been talkative, while his wife sat silently.",
    layers: [{ label: "男性的表现", text: "one man had been particularly talkative：一个男人一直特别健谈。" }, { label: "具体表现", text: "frequently offering ideas and anecdotes：他经常发表看法、讲述趣闻，offering 的逻辑主语仍是 one man。" }, { label: "夫妻对照", text: "while his wife sat silently...：而妻子默默坐在旁边；while 主要突出对照，也有同时发生的背景。" }],
    grammar: ["had been + 形容词是过去完成时的系表结构，不是过去完成进行时；后者需要 had been doing。", "offering... 是现在分词短语，补充说明男子健谈的表现，不是有独立时态的从句。", "while 连接对比的两个分句；sat 是 sit 的过去式，silently 是修饰 sat 的方式副词。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s2"], components: [
      {
        "explanation": "回看整晚的表现，throughout 表覆盖这一整段时间。",
        "form": "throughout + 时间名词",
        "function": "时间状语",
        "modifies": "had been talkative",
        "text": "Throughout the evening"
      },
      {
        "explanation": "one 在此是‘一位’，不是代替前文名词的代词。",
        "form": "数词 + 名词",
        "function": "主语",
        "modifies": "had been",
        "text": "one man"
      },
      {
        "explanation": "后面是形容词，不是进行时的 -ing 动词。",
        "form": "had + been",
        "function": "谓语（过去完成时系动词）",
        "modifies": "one man",
        "text": "had been"
      },
      {
        "children": [
          {
            "explanation": "格外地，修饰形容词，不表示说话频率。",
            "form": "程度副词",
            "function": "程度状语",
            "modifies": "talkative",
            "text": "particularly"
          },
          {
            "explanation": "健谈的；这才是 had been 连接的状态。",
            "form": "形容词",
            "function": "表语中心",
            "modifies": "had been",
            "text": "talkative"
          }
        ],
        "explanation": "描述男子健谈的性质。",
        "form": "副词 + 形容词",
        "function": "表语",
        "modifies": "one man",
        "text": "particularly talkative"
      },
      {
        "children": [
          {
            "explanation": "表示经常提出、讲述。",
            "form": "频率副词",
            "function": "频率状语",
            "modifies": "offering",
            "text": "frequently"
          },
          {
            "explanation": "这里不另立一个主句谓语。",
            "form": "现在分词",
            "function": "非谓语中心",
            "modifies": "one man",
            "text": "offering"
          },
          {
            "explanation": "想法和趣闻是他提供的内容。",
            "form": "两个并列名词",
            "function": "分词的宾语",
            "modifies": "offering",
            "text": "ideas and anecdotes"
          }
        ],
        "explanation": "逻辑主语是男子，具体说明他怎样表现得健谈。",
        "form": "现在分词短语",
        "function": "伴随状语",
        "modifies": "one man had been talkative",
        "text": "frequently offering ideas and anecdotes"
      },
      {
        "children": [
          {
            "explanation": "坐着的人是妻子。",
            "form": "名词短语",
            "function": "分句主语",
            "modifies": "sat",
            "text": "his wife"
          },
          {
            "explanation": "不及物动词，后面没有直接宾语。",
            "form": "sit 的过去式",
            "function": "分句谓语",
            "modifies": "his wife",
            "text": "sat"
          },
          {
            "explanation": "默不作声地坐着。",
            "form": "副词",
            "function": "方式状语",
            "modifies": "sat",
            "text": "silently"
          },
          {
            "explanation": "在丈夫旁边，him 回指男子。",
            "form": "beside + 宾格代词",
            "function": "地点状语",
            "modifies": "sat",
            "text": "beside him"
          },
          {
            "explanation": "在沙发上，补充坐的位置。",
            "form": "on + 名词短语",
            "function": "地点状语",
            "modifies": "sat",
            "text": "on the couch"
          }
        ],
        "explanation": "同一晚的同时场景，以妻子的沉默对照丈夫的话多。",
        "form": "while 引导的分句",
        "function": "对比关系分句",
        "modifies": "前面男子健谈的描述",
        "text": "while his wife sat silently beside him on the couch"
      }
    ], clauses: [
      {
        "text": "while his wife sat silently beside him on the couch",
        "type": "while 引导的对比分句",
        "marker": "while",
        "role": "与男子的健谈形成对照",
        "subject": "his wife",
        "predicate": "sat",
        "translationOrder": "先读男子不断说话，再用‘而’转到妻子的沉默。",
        "predicateDetails": []
      }
    ] },
    literal: "整个晚上，一个男人一直特别健谈，经常提出想法、讲述趣闻，而他的妻子默默地坐在沙发上他的旁边。",
    natural: "整个晚上，有个男人特别健谈，不断发表看法、讲些趣闻；他的妻子却默默坐在他身旁的沙发上。",
    logic: "先展示夫妻在公共场合的强烈反差，为男子稍后的自述制造反讽。",
    phrases: ["Throughout the evening", "offering ideas and anecdotes"],
  },
  {
    id: "2010-p2-s3", number: 3,
    text: "Toward the end of the evening, I commented that women frequently complain that their husbands don't talk to them.",
    trunk: "I commented that women complain that their husbands don't talk to them.",
    layers: [{ label: "叙述者的评论", text: "I commented that...：我谈到一个现象；第一个 that 后的完整内容是 commented 的宾语。" }, { label: "女性的抱怨", text: "women frequently complain that...：女性经常抱怨；第二个 that 后的内容是 complain 的宾语。" }, { label: "最内层命题", text: "their husbands don't talk to them：丈夫不和她们交谈，them 回指 women。" }],
    grammar: ["两个 that 都是内容从句的连接词，不在各自从句内部充当主语或宾语；不能当作两个定语从句。", "过去的 commented 引出一般现在时 complain 和 don't talk，因为叙述的是被认为反复出现的现象，并非所有时态机械后移。", "don't = do not；否定的是 talk to them，不是说丈夫完全不会说话。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s3"], components: [
      {
        "explanation": "toward 表接近；of the evening 限定 end，不把晚会尾声误当抱怨的频率。",
        "form": "toward + 时间名词短语",
        "function": "时间状语",
        "modifies": "commented",
        "text": "Toward the end of the evening"
      },
      {
        "explanation": "I 是作者。",
        "form": "人称代词",
        "function": "主语",
        "modifies": "commented",
        "text": "I"
      },
      {
        "explanation": "后接她评论的内容。",
        "form": "一般过去时动词",
        "function": "主句谓语",
        "modifies": "I",
        "text": "commented"
      },
      {
        "children": [
          {
            "explanation": "是抱怨者。",
            "form": "名词复数",
            "function": "外层从句主语",
            "modifies": "complain",
            "text": "women"
          },
          {
            "explanation": "经常发生的抱怨，不是当晚评论了很多次。",
            "form": "频率副词",
            "function": "状语",
            "modifies": "complain",
            "text": "frequently"
          },
          {
            "explanation": "概括一般现象，后接完整内容。",
            "form": "一般现在时动词",
            "function": "外层从句谓语",
            "modifies": "women",
            "text": "complain"
          },
          {
            "children": [
              {
                "explanation": "被抱怨的是丈夫们。",
                "form": "名词短语",
                "function": "内层从句主语",
                "modifies": "don't talk",
                "text": "their husbands"
              },
              {
                "explanation": "否定和时态由 don't 承担。",
                "form": "助动词否定 + 动词原形",
                "function": "内层从句谓语",
                "modifies": "their husbands",
                "text": "don't talk"
              },
              {
                "explanation": "them 指妻子们，不能当作丈夫们。",
                "form": "to + 宾格代词",
                "function": "交谈对象补足语",
                "modifies": "talk",
                "text": "to them"
              }
            ],
            "explanation": "that 不作从句成分，只把内容接到 complain 后。",
            "form": "that 引导的内容从句",
            "function": "内层宾语从句",
            "modifies": "complain",
            "text": "that their husbands don't talk to them"
          }
        ],
        "explanation": "外层说‘女性经常抱怨’，内层才说具体抱怨什么。",
        "form": "that 引导的内容从句",
        "function": "第一层宾语从句",
        "modifies": "commented",
        "text": "that women frequently complain that their husbands don't talk to them"
      }
    ], clauses: [
      {
        "text": "that women frequently complain that their husbands don't talk to them",
        "type": "宾语从句",
        "marker": "that",
        "role": "作 commented 的宾语",
        "subject": "women",
        "predicate": "complain",
        "translationOrder": "先译‘我谈到’，再译‘女性经常抱怨’，最后读出抱怨内容。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "that their husbands don't talk to them"
          }
        ]
      },
      {
        "text": "that their husbands don't talk to them",
        "type": "嵌套宾语从句",
        "marker": "that",
        "role": "作 complain 的宾语",
        "subject": "their husbands",
        "predicate": "don't talk",
        "translationOrder": "把 don't talk to them 整体读成‘不和她们交谈’。",
        "predicateDetails": []
      }
    ] },
    literal: "接近这个晚上的末尾时，我评论说，女性经常抱怨她们的丈夫不和她们说话。",
    natural: "快到聚会结束时，我谈到，女性常常抱怨丈夫不与自己交流。",
    logic: "把现场闲谈引向文章中心问题，触发男子的回应。",
    phrases: ["Toward the end of the evening", "talk to them"],
  },
  {
    id: "2010-p2-s4", number: 4,
    text: "This man quickly nodded in agreement.",
    trunk: "This man nodded.",
    layers: [{ label: "动作", text: "This man nodded：这位男士点了点头。" }, { label: "动作的方式和含义", text: "quickly 是迅速，in agreement 表示赞同前面的评论。" }],
    grammar: ["nod 是规则动词，但过去式 nodded 和现在分词 nodding 都要双写末尾 d。", "in agreement 是表示态度的介词短语，不是说‘在某份协议里面’；原卷用 nodded in agreement，不替换为网上转载的 concurred。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s4"], components: [
      {
        "text": "This man",
        "form": "指示限定词 + 名词",
        "function": "主语",
        "modifies": "nodded",
        "explanation": "This 回指前面一直健谈的那个男人。"
      },
      {
        "text": "quickly",
        "form": "副词",
        "function": "方式状语",
        "modifies": "nodded",
        "explanation": "修饰点头这一动作的速度。"
      },
      {
        "text": "nodded",
        "form": "一般过去时动词",
        "function": "谓语",
        "modifies": "This man",
        "explanation": "这里是不及物用法，不接宾语。"
      },
      {
        "text": "in agreement",
        "form": "in + 抽象名词",
        "function": "态度状语",
        "modifies": "nodded",
        "explanation": "指出点头表示认同，而不是任意动作。"
      }
    ], clauses: [] },
        literal: "这位男士迅速点头表示赞同。", natural: "这位男士立刻点头表示赞同。",
        logic: "男子认同女性的抱怨，却没有意识到自己刚才的健谈与接下来的家庭自述反差很大。",
        phrases: ["nodded in agreement"],
      },
      {
        id: "2010-p2-s5", number: 5,
        text: "He gestured toward his wife and said, \"She's the talker in our family.\"",
        trunk: "He gestured and said, \"She's the talker.\"",
        layers: [{ label: "两个动作", text: "He gestured... and said...：他示意了一下，又开口解释，两个谓语共用 He。" }, { label: "说话内容", text: "She's the talker in our family：她才是我们家爱说话的人；She's = She is，talker 是名词。" }],
        grammar: ["toward 引出手势的朝向，不能误作 gesture 的直接宾语。", "直接引语保留第一人称 our，our family 指该男士和妻子所属的家庭；in our family 给 talker 限定范围。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s5"], components: [
      {
        "text": "He",
        "form": "人称代词",
        "function": "主语",
        "modifies": "gestured和said共用的主语",
        "explanation": "指前文健谈的男士。"
      },
      {
        "text": "gestured",
        "form": "一般过去时动词",
        "function": "谓语",
        "modifies": "主语He",
        "explanation": "做手势，不是说话的内容。"
      },
      {
        "text": "toward his wife",
        "form": "介词短语",
        "function": "方向状语",
        "modifies": "gestured",
        "explanation": "手势朝向妻子；toward这里不表示时间临近。"
      },
      {
        "text": "and",
        "form": "并列连词",
        "function": "并列连接语",
        "modifies": "连接gestured与said",
        "explanation": "同一个人先示意，再说话。"
      },
      {
        "text": "said",
        "form": "一般过去时动词",
        "function": "并列谓语",
        "modifies": "主语He",
        "explanation": "引出直接引语，不与gestured合成一个时态。"
      },
      {
        "text": "She's the talker in our family",
        "form": "直接引语分句",
        "function": "引语内容",
        "modifies": "said",
        "explanation": "主系表：She是主语，is缩在She's里；the talker是表语。",
        "children": [
          {
            "text": "She's",
            "form": "She is的缩写",
            "function": "引语主语与系动词",
            "modifies": "连接She与the talker",
            "explanation": "指妻子；不是She has。"
          },
          {
            "text": "the talker",
            "form": "名词短语",
            "function": "引语表语",
            "modifies": "is",
            "explanation": "说明谁是家里爱说话的人，不是动作宾语。"
          },
          {
            "text": "in our family",
            "form": "介词短语",
            "function": "范围状语",
            "modifies": "限定the talker的家庭范围",
            "explanation": "our指这对夫妻所在的家庭，不是全体听众。"
          }
        ]
      }
    ], clauses: [
      {
        "text": "She's the talker in our family",
        "type": "直接引语内容分句",
        "marker": "引号；无从属连词",
        "role": "作为 said 的直接引语内容",
        "subject": "She",
        "predicate": "is（缩写在 She's 中）",
        "translationOrder": "先译她是爱说话的人，再交代‘在我们家’的范围。",
        "predicateDetails": [
          {
            "function": "表语",
            "text": "the talker"
          }
        ]
      }
    ] },
    literal: "他朝妻子示意，并说道：‘她是我们家爱说话的人。’", natural: "他朝妻子示意了一下，说：‘我们家爱说话的是她。’",
    logic: "点出男子自认为家中沉默的一方，与读者刚看到的现场表现形成反差。",
    phrases: ["gestured toward his wife"],
  },
  {
    id: "2010-p2-s6", number: 6,
    text: "The room burst into laughter; the man looked puzzled and hurt.",
    trunk: "The room burst into laughter; the man looked puzzled and hurt.",
    layers: [{ label: "众人的反应", text: "The room burst into laughter：满屋的人突然笑了起来，room 用地点代指在场的人。" }, { label: "男子的感受", text: "the man looked puzzled and hurt：男子显得困惑而委屈；looked 不是主动‘看’某个物体。" }],
    grammar: ["分号连接两个完整分句，没有从属连词；不能把第二句看成第一句的宾语从句。", "burst into laughter 是突然开始大笑；look + 形容词是系表结构，puzzled 和 hurt 并列作表语。", "hurt 在这里指情感受伤，不意味着身体受伤。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s6"], components: [
      {
        "explanation": "用房间代满屋听众，不是建筑在笑。",
        "form": "借代的名词短语",
        "function": "第一分句主语",
        "modifies": "burst",
        "text": "The room"
      },
      {
        "explanation": "burst 的过去式仍为 burst。",
        "form": "一般过去时不及物动词",
        "function": "第一分句谓语",
        "modifies": "The room",
        "text": "burst"
      },
      {
        "explanation": "burst into laughter是突然大笑；into引出进入的状态，不把laughter当burst的直接宾语。",
        "form": "into + 名词",
        "function": "状态补足语",
        "modifies": "burst",
        "text": "into laughter"
      },
      {
        "explanation": "分号开启另一套主谓，指刚才那位男士。",
        "form": "名词短语",
        "function": "第二分句主语",
        "modifies": "looked",
        "text": "the man"
      },
      {
        "explanation": "这里是‘显得’，不是看向某物的及物动作。",
        "form": "过去时系动词",
        "function": "第二分句谓语",
        "modifies": "the man",
        "text": "looked"
      },
      {
        "children": [
          {
            "explanation": "感到困惑的，不是令人困惑的 puzzling。",
            "form": "过去分词形容词",
            "function": "并列表语之一",
            "modifies": "the man",
            "text": "puzzled"
          },
          {
            "explanation": "感情受伤、委屈，不表示又做了一个伤害动作。",
            "form": "形容词",
            "function": "并列表语之二",
            "modifies": "the man",
            "text": "hurt"
          }
        ],
        "explanation": "描述同一人的两个感受。",
        "form": "两个并列形容词",
        "function": "表语",
        "modifies": "the man",
        "text": "puzzled and hurt"
      }
    ], clauses: [] },
        literal: "满屋的人突然大笑起来；那个男人看上去既困惑又受到伤害。", natural: "满屋的人哄堂大笑，男士却显得既不解又委屈。",
        logic: "借众人发笑和男子不解呈现他对自身两种谈话模式缺乏觉察。",
        phrases: ["burst into laughter", "looked puzzled and hurt"],
      },
      {
        id: "2010-p2-s7", number: 7,
        text: "\"It's true,\" he explained.",
        trunk: "\"It's true,\" he explained.",
        layers: [{ label: "引语", text: "It's true：这是真的；It 回指妻子才是家中话多的人这一说法。" }, { label: "报告分句", text: "he explained：他解释道，置于引语之后仍保持主语在谓语之前。" }],
        grammar: ["It's = It is，不是表示所属关系的 its；true 是形容词表语。", "前置直接引语与 he explained 一起构成完整叙述，逗号和引号保留原卷形式。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s7"], components: [
      {
        "text": "It's true",
        "form": "直接引语中的系表句",
        "function": "直接引语内容",
        "modifies": "explained",
        "explanation": "It 作主语，is 是系动词，true 作表语，表示前面的说法属实。",
        "children": [
          {
            "text": "It's",
            "form": "It is的缩写",
            "function": "引语主语与系动词",
            "modifies": "连接It与true",
            "explanation": "It指妻子在家话多这一说法。"
          },
          {
            "text": "true",
            "form": "形容词",
            "function": "引语表语",
            "modifies": "is",
            "explanation": "肯定自己的说法确实如此，不是宾语。"
          }
        ]
      },
      {
        "text": "he",
        "form": "人称代词",
        "function": "报告分句主语",
        "modifies": "explained",
        "explanation": "说明解释的人是这位男士。"
      },
      {
        "text": "explained",
        "form": "一般过去时动词",
        "function": "报告分句谓语",
        "modifies": "he",
        "explanation": "其说明内容放在前面的引号里。"
      }
    ], clauses: [
      {
        "text": "It's true",
        "type": "直接引语内容分句",
        "marker": "引号；无从属连词",
        "role": "作为 explained 的直接引语内容",
        "subject": "It",
        "predicate": "is（缩写在 It's 中）",
        "translationOrder": "先读‘这是真的’，再读叙述者补充的‘他解释道’。",
        "predicateDetails": [
          {
            "function": "表语",
            "text": "true"
          }
        ]
      }
    ] },
    literal: "‘这是真的，’他解释道。", natural: "‘确实如此，’他解释说。",
    logic: "男子坚持自己的说法，并引出下一句关于回家后的具体解释。",
    phrases: [],
  },
  {
    id: "2010-p2-s8", number: 8,
    text: "\"When I come home from work I have nothing to say.",
    trunk: "I have nothing to say.",
    layers: [{ label: "日常时间条件", text: "When I come home from work：当我下班回家时。" }, { label: "所说的情况", text: "I have nothing to say：我没有什么可说的；to say 限定 nothing，不是目的状语。" }],
    grammar: ["when 从句和主句都用一般现在时，描述反复发生的日常习惯。", "home 在 come home 中为方向副词，前面不用 to；from work 表示从工作的地方回来。", "to say 是后置修饰 nothing 的不定式；直接引语跨两句，闭引号在下一句末尾，不能擅自补入。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s8"], components: [
      {
        "children": [
          {
            "explanation": "这段引语中的我指男士。",
            "form": "人称代词",
            "function": "从句主语",
            "modifies": "come",
            "text": "I"
          },
          {
            "explanation": "指每次回家这一惯常事件。",
            "form": "一般现在时动词",
            "function": "从句谓语",
            "modifies": "I",
            "text": "come"
          },
          {
            "explanation": "回家；前面不需要 to。",
            "form": "方向副词",
            "function": "方向状语",
            "modifies": "come",
            "text": "home"
          },
          {
            "explanation": "从工作处回来，即下班。",
            "form": "from + 名词",
            "function": "来处状语",
            "modifies": "come",
            "text": "from work"
          }
        ],
        "explanation": "给‘无话可说’限定惯常发生的时机。",
        "form": "when 引导的从句",
        "function": "时间状语从句",
        "modifies": "I have nothing to say",
        "text": "When I come home from work"
      },
      {
        "explanation": "仍然是男士本人。",
        "form": "人称代词",
        "function": "主句主语",
        "modifies": "have",
        "text": "I"
      },
      {
        "explanation": "后接‘有没有可说的东西’。",
        "form": "一般现在时及物动词",
        "function": "主句谓语",
        "modifies": "I",
        "text": "have"
      },
      {
        "children": [
          {
            "explanation": "没有什么东西或事情。",
            "form": "否定不定代词",
            "function": "宾语中心",
            "modifies": "have",
            "text": "nothing"
          },
          {
            "explanation": "说明可说的内容；nothing 是 say 在意义上的宾语，不是目的状语。",
            "form": "to 不定式",
            "function": "后置定语",
            "modifies": "nothing",
            "text": "to say"
          }
        ],
        "explanation": "nothing 是中心；否定的是可说内容。",
        "form": "不定代词 + 不定式",
        "function": "宾语",
        "modifies": "have",
        "text": "nothing to say"
      }
    ], clauses: [
      {
        "text": "When I come home from work",
        "type": "时间状语从句",
        "marker": "When",
        "role": "修饰主句 have nothing to say",
        "subject": "I",
        "predicate": "come",
        "translationOrder": "先说‘当我下班回家时’，再说没有话可说。",
        "predicateDetails": []
      }
    ] },
    literal: "‘当我下班回到家时，我没有什么可说的。", natural: "‘下班回家后，我没什么话可说。",
    logic: "明确把公共场合的话多与家庭中的无话可说分开。",
    phrases: ["come home from work", "nothing to say"],
  },
  {
    id: "2010-p2-s9", number: 9,
    text: "If she didn't keep the conversation going, we'd spend the whole evening in silence.\"",
    trunk: "If she didn't keep the conversation going, we'd spend the evening in silence.",
    layers: [{ label: "假设条件", text: "If she didn't keep the conversation going：要不是她让谈话持续下去。" }, { label: "假设结果", text: "we'd spend the whole evening in silence：我们就会整晚沉默；we'd = we would，不是 we had。" }],
    grammar: ["if + 一般过去式，主句 would + 动词原形，表达与当下惯常情况相反的假设；didn't 不是把整段限定为某次过去的夜晚。", "keep + 宾语 + doing 表示让某事持续进行；the conversation 为宾语，going 为宾语补足语。", "spend + 时间 + in + 状态说明如何度过一段时间；in silence 是方式或状态状语。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s9"], components: [
      {
        "children": [
          {
            "explanation": "指男士的妻子。",
            "form": "人称代词",
            "function": "条件从句主语",
            "modifies": "didn't keep",
            "text": "she"
          },
          {
            "explanation": "keep 表使某种状态保持；过去式用于假设，不报告一次真实过去。",
            "form": "过去式助动词否定 + 原形",
            "function": "条件从句谓语",
            "modifies": "she",
            "text": "didn't keep"
          },
          {
            "explanation": "被维持的是谈话。",
            "form": "名词短语",
            "function": "从句宾语",
            "modifies": "keep",
            "text": "the conversation"
          },
          {
            "explanation": "持续进行，描述谈话的状态。",
            "form": "现在分词",
            "function": "宾语补足语",
            "modifies": "the conversation",
            "text": "going"
          }
        ],
        "explanation": "假设没有妻子的推动，用过去式表达与目前惯常情形相反的情况。",
        "form": "if + 假设分句",
        "function": "虚拟条件状语从句",
        "modifies": "we'd spend…",
        "text": "If she didn't keep the conversation going"
      },
      {
        "explanation": "we'd = we would；完整谓语是would spend，缩写保留为一个查词词块。",
        "form": "we + would 的缩写",
        "function": "主语与情态助动词（缩写）",
        "modifies": "spend",
        "text": "we'd"
      },
      {
        "explanation": "与 would 表假设结果。",
        "form": "动词原形",
        "function": "谓语实义部分",
        "modifies": "would",
        "text": "spend"
      },
      {
        "explanation": "表示要度过的整段时间，不是与 in silence 同类的介词短语。",
        "form": "名词短语",
        "function": "时间宾语",
        "modifies": "spend",
        "text": "the whole evening"
      },
      {
        "explanation": "整个晚上会以沉默的状态度过。",
        "form": "in + 抽象名词",
        "function": "状态状语",
        "modifies": "spend the whole evening",
        "text": "in silence"
      }
    ], clauses: [
      {
        "text": "If she didn't keep the conversation going",
        "type": "虚拟条件状语从句",
        "marker": "If",
        "role": "给 would spend 提供与现实相反的条件",
        "subject": "she",
        "predicate": "didn't keep",
        "translationOrder": "先译‘要不是她让谈话继续’，再译‘我们就会……’。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "the conversation"
          },
          {
            "function": "宾语补足语",
            "text": "going"
          }
        ]
      }
    ] },
    literal: "如果她不让谈话继续，我们就会在沉默中度过整个晚上。’", natural: "要不是她主动把话接下去，我们整个晚上都会默不作声。’",
    logic: "男子亲口说明妻子承担维持家庭交流的责任，完成开篇个案。",
    phrases: ["keep the conversation going", "in silence"],
  },
  {
    id: "2010-p2-s10", number: 10,
    text: "This episode crystallizes the irony that although American men tend to talk more than women in public situations, they often talk less at home.",
    trunk: "This episode crystallizes the irony.",
    layers: [{ label: "主干评价", text: "This episode crystallizes the irony：这个插曲把一种反差清楚地呈现出来。" }, { label: "反差的内容", text: "that...they often talk less at home：that 后的内容解释 irony，不是在限定‘哪一种’已经明确的反讽。" }, { label: "嵌套让步", text: "although American men tend to talk more than women in public situations：尽管美国男性在公开场合往往比女性话多。" }],
    grammar: ["that 引导同位语内容从句，解释 irony；that 本身不充当从句内的主语或宾语。", "although 引导让步状语从句，嵌在同位语从句中；they 回指 American men。", "tend to do 表倾向而非人人必然如此；more 和 less 都修饰 talk 的量，than women 省略了可由前文理解的 talk。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s10"], components: [
      {
        "explanation": "回指聚会里的整个小插曲。",
        "form": "名词短语",
        "function": "主语",
        "modifies": "crystallizes",
        "text": "This episode"
      },
      {
        "explanation": "比喻使抽象问题具体、清楚。",
        "form": "一般现在时及物动词",
        "function": "谓语",
        "modifies": "This episode",
        "text": "crystallizes"
      },
      {
        "children": [
          {
            "explanation": "不是单指讽刺口吻，而是意料之外的反差。",
            "form": "名词短语",
            "function": "宾语中心",
            "modifies": "crystallizes",
            "text": "the irony"
          },
          {
            "children": [
              {
                "children": [
                  {
                    "explanation": "是男性，不是后面的女性。",
                    "form": "名词短语",
                    "function": "让步从句主语",
                    "modifies": "tend",
                    "text": "American men"
                  },
                  {
                    "explanation": "tend to do 表倾向于做某事。",
                    "form": "一般现在时动词",
                    "function": "让步从句谓语",
                    "modifies": "American men",
                    "text": "tend"
                  },
                  {
                    "children": [
                      {
                        "explanation": "women 是比较方，可按省略的比较分句理解。",
                        "form": "数量副词 + 比较结构",
                        "function": "数量状语",
                        "modifies": "talk",
                        "text": "more than women"
                      },
                      {
                        "explanation": "在有其他人在场的公开场合。",
                        "form": "in + 名词短语",
                        "function": "场合状语",
                        "modifies": "talk",
                        "text": "in public situations"
                      }
                    ],
                    "explanation": "不是 tend 的目的；more 修饰说话量。",
                    "form": "不定式短语",
                    "function": "谓语补足语",
                    "modifies": "tend",
                    "text": "to talk more than women in public situations"
                  }
                ],
                "explanation": "先承认男人在公开场合更健谈。",
                "form": "although 引导的分句",
                "function": "让步状语从句",
                "modifies": "they often talk less at home",
                "text": "although American men tend to talk more than women in public situations"
              },
              {
                "children": [
                  {
                    "explanation": "回指 American men。",
                    "form": "人称代词",
                    "function": "分句主语",
                    "modifies": "talk",
                    "text": "they"
                  },
                  {
                    "explanation": "经常，不等于每一次。",
                    "form": "频率副词",
                    "function": "频率状语",
                    "modifies": "talk",
                    "text": "often"
                  },
                  {
                    "explanation": "不接 less 作宾语。",
                    "form": "不及物动词",
                    "function": "分句谓语",
                    "modifies": "they",
                    "text": "talk"
                  },
                  {
                    "explanation": "说得较少，与前面的 more 对照。",
                    "form": "数量副词",
                    "function": "数量状语",
                    "modifies": "talk",
                    "text": "less"
                  },
                  {
                    "explanation": "话少发生在家里，不修饰 irony。",
                    "form": "介词短语",
                    "function": "地点状语",
                    "modifies": "talk",
                    "text": "at home"
                  }
                ],
                "explanation": "转到男性在家中的相反表现。",
                "form": "陈述分句",
                "function": "内容从句的主要分句",
                "modifies": "that 引出的反差内容",
                "text": "they often talk less at home"
              }
            ],
            "explanation": "that 不在从句中作主语或宾语，内部是让步与主要结论两层。",
            "form": "that 引导的内容从句",
            "function": "同位语从句",
            "modifies": "irony",
            "text": "that although American men tend to talk more than women in public situations, they often talk less at home"
          }
        ],
        "explanation": "irony 是宾语中心，后面的内容从句解释反差。",
        "form": "名词 + 内容从句",
        "function": "宾语",
        "modifies": "crystallizes",
        "text": "the irony that although American men tend to talk more than women in public situations, they often talk less at home"
      }
    ], clauses: [
      {
        "text": "that although American men tend to talk more than women in public situations, they often talk less at home",
        "type": "同位语从句",
        "marker": "that",
        "role": "解释 irony 的内容",
        "subject": "they（American men）",
        "predicate": "talk",
        "translationOrder": "先读虽然在外话多，再读在家往往话少，合起来就是 irony。",
        "predicateDetails": []
      },
      {
        "text": "although American men tend to talk more than women in public situations",
        "type": "让步状语从句",
        "marker": "although",
        "role": "修饰 they often talk less at home",
        "subject": "American men",
        "predicate": "tend",
        "translationOrder": "译作‘尽管美国男性在公开场合往往比女性话多’。",
        "predicateDetails": [
          {
            "function": "不定式补足语",
            "text": "to talk more than women in public situations"
          }
        ]
      },
      {
        "text": "than women",
        "type": "省略的比较分句",
        "marker": "than",
        "role": "为 talk more 提供比较对象",
        "subject": "women",
        "predicate": "省略 talk，由前文补足理解",
        "translationOrder": "理解为‘比女性说得更多’，women 是比较方而非 talk 的宾语。",
        "predicateDetails": []
      }
    ] },
    literal: "这个插曲使这样一种反差清晰起来：尽管美国男性在公共场合往往比女性说得多，他们在家却常常说得少。",
    natural: "这个插曲鲜明地揭示了一种反差：美国男人在公共场合往往比女人健谈，回到家却常常寡言少语。",
    logic: "从个案提炼出全文主旨，即夫妻在不同场合的谈话模式存在差异。",
    phrases: ["tend to talk", "in public situations", "at home"],
  },
  {
    id: "2010-p2-s11", number: 11,
    text: "And this pattern is wreaking havoc with marriage.",
    trunk: "this pattern is wreaking havoc with marriage.",
    layers: [{ label: "核心作用", text: "this pattern is wreaking havoc：这种模式正在造成严重破坏。" }, { label: "受影响对象", text: "with marriage：受到破坏的是婚姻关系，不是抽象意义上的‘发生一些影响’。" }],
    grammar: ["wreak havoc with/on something 为固定搭配，havoc 是不可数名词；原卷用 with，不能擅自换成 on。", "this pattern 回指上一句描述的谈话模式；is wreaking 用现在进行时突出这种破坏正在发生。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s11"], components: [
      {
        "text": "And",
        "form": "并列连词",
        "function": "衔接语",
        "modifies": "本句与上句",
        "explanation": "在概括现象之后补充其后果。"
      },
      {
        "text": "this pattern",
        "form": "名词短语",
        "function": "主语",
        "modifies": "is wreaking",
        "explanation": "pattern 不是图案，而是公开场合与家中不同的谈话行为模式。"
      },
      {
        "text": "is wreaking",
        "form": "is + 现在分词",
        "function": "谓语",
        "modifies": "this pattern",
        "explanation": "wreak 表造成、引发，常与负面结果搭配。"
      },
      {
        "text": "havoc",
        "form": "不可数名词",
        "function": "宾语",
        "modifies": "wreaking",
        "explanation": "表示严重破坏，因此第27题应找强烈负面含义。"
      },
      {
        "text": "with marriage",
        "form": "with + 抽象名词",
        "function": "受影响对象补足语",
        "modifies": "wreaking havoc",
        "explanation": "指出婚姻承受这一后果。"
      }
    ], clauses: [] },
        literal: "而这种模式正在对婚姻造成严重破坏。", natural: "这种谈话模式正在严重损害婚姻关系。",
        logic: "从谈话差异转到婚姻后果，承接下一段的离婚研究，也是第27题定位句。",
        phrases: ["wreaking havoc with marriage"],
      },
      {
        id: "2010-p2-s12", number: 12,
        text: "The pattern was observed by political scientist Andrew Hacker in the late 1970s.",
        trunk: "The pattern was observed.",
        layers: [{ label: "被动主干", text: "The pattern was observed：这种模式曾被观察到。" }, { label: "观察者和时间", text: "by political scientist Andrew Hacker / in the late 1970s：观察者是政治学家安德鲁·哈克，时间是20世纪70年代后期。" }],
        grammar: ["was observed 是一般过去时被动语态；by 引出动作施事，不是位置‘在旁边’。", "political scientist 是 Andrew Hacker 的身份称谓；1970s 指1970—1979这一年代，late 限定其后期。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s12"], components: [
      {
        "text": "The pattern",
        "form": "名词短语",
        "function": "主语",
        "modifies": "was observed",
        "explanation": "承接上文已介绍的谈话模式。"
      },
      {
        "text": "was observed",
        "form": "was + 过去分词",
        "function": "被动谓语",
        "modifies": "The pattern",
        "explanation": "主语是被观察的对象，实际观察者在 by 后面。"
      },
      {
        "text": "by political scientist Andrew Hacker",
        "form": "by + 人物名词短语",
        "function": "施事状语",
        "modifies": "was observed",
        "explanation": "political scientist 表身份，Andrew Hacker 是姓名，不把 Hacker 当成计算机黑客。"
      },
      {
        "text": "in the late 1970s",
        "form": "in + 年代短语",
        "function": "时间状语",
        "modifies": "was observed",
        "explanation": "表示20世纪70年代后期，不是1970年某一天。"
      }
    ], clauses: [] },
        literal: "这种模式在20世纪70年代后期被政治学家安德鲁·哈克观察到了。", natural: "政治学家安德鲁·哈克在20世纪70年代后期就注意到了这种模式。",
        logic: "引入早期研究，说明这种现象并非作者凭一个聚会就新提出的猜想。",
        phrases: ["in the late 1970s"],
      },
      {
        id: "2010-p2-s13", number: 13,
        text: "Sociologist Catherine Kohler Riessman reports in her new book Divorce Talk that most of the women she interviewed – but only a few of the men – gave lack of communication as the reason for their divorces.",
        trunk: "Sociologist Catherine Kohler Riessman reports that most of the women gave lack of communication as the reason for their divorces.",
        layers: [{ label: "报告来源", text: "Sociologist Catherine Kohler Riessman reports...：社会学家凯瑟琳·科勒·里斯曼报告了一个发现。" }, { label: "主要发现", text: "that most of the women...gave lack of communication as the reason...：多数受访女性把缺少沟通列为离婚原因。" }, { label: "范围与对比", text: "she interviewed 限定 women；破折号中的 but only a few of the men 对照指出持同样说法的男性只有少数。" }],
        grammar: ["reports 后的 that 引导宾语从句；she interviewed 是省略关系代词 whom/that 的定语从句，women 是 interviewed 的逻辑宾语。", "but only a few of the men 是插入的名词短语对照，省略的谓语由 gave...理解；它没有独立写出的限定动词，不能伪造成完整原文从句。", "give A as B 在此为‘将A列作B’；这报告的是受访者陈述的原因，不是对所有美国离婚案例作出的因果统计。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s13"], components: [
      {
        "explanation": "社会学家是职业，后面是同一个人的完整姓名。",
        "form": "职业称谓 + 姓名",
        "function": "主语",
        "modifies": "reports",
        "text": "Sociologist Catherine Kohler Riessman"
      },
      {
        "explanation": "报道内容由后面的 that 引出。",
        "form": "一般现在时动词",
        "function": "主句谓语",
        "modifies": "Riessman",
        "text": "reports"
      },
      {
        "children": [
          {
            "explanation": "点明书名，不单独构成主谓。",
            "form": "书名",
            "function": "同位说明",
            "modifies": "book",
            "text": "Divorce Talk"
          }
        ],
        "explanation": "报告写在她的新书里。",
        "form": "介词 + 书籍名词短语",
        "function": "出处状语",
        "modifies": "reports",
        "text": "in her new book Divorce Talk"
      },
      {
        "children": [
          {
            "children": [
              {
                "explanation": "主语 she 指 Riessman，谓语 interviewed；省略的宾语关系词指 women。",
                "form": "省略关系词的从句",
                "function": "限制性定语从句",
                "modifies": "women",
                "text": "she interviewed"
              },
              {
                "explanation": "与前项共用 gave；only 限定 a few，突出少数。",
                "form": "并列对照名词短语",
                "function": "主语内的插入对照",
                "modifies": "most of the women",
                "text": "but only a few of the men"
              }
            ],
            "explanation": "多数受访女性，而男性只有少数。",
            "form": "数量名词组 + 插入对照",
            "function": "从句主语",
            "modifies": "gave",
            "text": "most of the women she interviewed – but only a few of the men –"
          },
          {
            "explanation": "give A as B 在此为‘把A列为B’。",
            "form": "一般过去时动词",
            "function": "从句谓语",
            "modifies": "女性与男性两个对照群体",
            "text": "gave"
          },
          {
            "explanation": "lack 是中心，of communication 说明缺少什么。",
            "form": "名词短语",
            "function": "从句宾语",
            "modifies": "gave",
            "text": "lack of communication"
          },
          {
            "children": [
              {
                "explanation": "说明是离婚的原因，不是离婚带来的沟通后果。",
                "form": "介词短语",
                "function": "后置定语",
                "modifies": "reason",
                "text": "for their divorces"
              }
            ],
            "explanation": "说明把沟通不足列为什么。",
            "form": "as + 名词短语",
            "function": "认定内容补足语",
            "modifies": "gave lack of communication",
            "text": "as the reason for their divorces"
          }
        ],
        "explanation": "内容中先比较答同一种原因的人数，再给出他们的回答。",
        "form": "that 引导的内容从句",
        "function": "宾语从句",
        "modifies": "reports",
        "text": "that most of the women she interviewed – but only a few of the men – gave lack of communication as the reason for their divorces"
      }
    ], clauses: [
      {
        "text": "that most of the women she interviewed – but only a few of the men – gave lack of communication as the reason for their divorces",
        "type": "宾语从句",
        "marker": "that",
        "role": "作 reports 的宾语",
        "subject": "most of the women she interviewed（并插入 only a few of the men 作对照）",
        "predicate": "gave",
        "translationOrder": "先译多数受访女性的回答，再加入男性只有少数这样回答的对照。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "lack of communication"
          },
          {
            "function": "认定内容补足语",
            "text": "as the reason for their divorces"
          }
        ]
      },
      {
        "text": "she interviewed",
        "type": "省略关系词的限制性定语从句",
        "marker": "省略 whom/that",
        "role": "修饰 women",
        "subject": "she",
        "predicate": "interviewed",
        "translationOrder": "先理解‘她访谈过的’，再接‘女性’。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "省略的关系代词whom/that，回指women；原文没有另写出该词"
          }
        ]
      }
    ] },
    literal: "社会学家凯瑟琳·科勒·里斯曼在新书《离婚谈话》中报告，她访谈的大多数女性——但只有少数男性——把缺少沟通作为他们离婚的原因。",
    natural: "社会学家凯瑟琳·科勒·里斯曼在新书《离婚谈话》中指出，多数受访女性将离婚归因于缺乏沟通，而受访男性中只有少数人这样认为。",
    logic: "用访谈研究支持沟通与婚姻危机的联系，并再次呈现男女认知差异。",
    phrases: ["only a few of the men", "lack of communication", "the reason for their divorces"],
  },
  {
    id: "2010-p2-s14", number: 14,
    text: "Given the current divorce rate of nearly 50 percent, that amounts to millions of cases in the United States every year – a virtual epidemic of failed conversation.",
    trunk: "that amounts to millions of cases.",
    layers: [{ label: "判断背景", text: "Given the current divorce rate of nearly 50 percent：考虑到目前接近50%的离婚率；这个比例本身并未说明离婚的具体原因。" }, { label: "规模判断", text: "that amounts to millions of cases...：上述情况涉及美国每年数百万个案例；amount to 为固定动词搭配。" }, { label: "比喻概括", text: "a virtual epidemic of failed conversation：沟通失败简直已像流行病一样普遍，不是医学诊断。" }],
    grammar: ["Given 在这里是‘考虑到、鉴于’的介词，后接名词短语，不是一个含主谓的完整条件从句。", "that 是回指前文情况的指示代词并作主语，与上一句引导宾语从句的 that 不同。", "nearly 50 percent 修饰 divorce rate；不能把分母偷换成‘所有离婚案例’，再断言其中近半由沟通失败造成。这正是第28题B项的问题。", "a virtual epidemic 是破折号后的同位性评价；virtual 在此为‘几乎等同于、事实上的’，不是计算机语境的‘虚拟的’。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s14"], components: [
      {
        "children": [
          {
            "explanation": "说明离婚率的数值；nearly 表接近，不能译成超过。",
            "form": "of + 数量短语",
            "function": "后置定语",
            "modifies": "divorce rate",
            "text": "of nearly 50 percent"
          }
        ],
        "explanation": "Given 是介词‘考虑到’，不是有限定时态的 give。",
        "form": "given + 名词短语",
        "function": "前提状语",
        "modifies": "that amounts to millions of cases",
        "text": "Given the current divorce rate of nearly 50 percent"
      },
      {
        "explanation": "承接沟通问题与离婚的上述情况。",
        "form": "指示代词",
        "function": "主语",
        "modifies": "amounts to",
        "text": "that"
      },
      {
        "explanation": "与 to 配合表示总计达到；不是名词复数 amounts。",
        "form": "一般现在时动词",
        "function": "谓语",
        "modifies": "that",
        "text": "amounts"
      },
      {
        "explanation": "说明数目达到数百万件，of cases 交代什么单位。",
        "form": "to + 数量名词短语",
        "function": "数量补足语",
        "modifies": "amounts",
        "text": "to millions of cases"
      },
      {
        "explanation": "这项数量推算限于美国。",
        "form": "地点介词短语",
        "function": "范围状语",
        "modifies": "amounts to millions of cases",
        "text": "in the United States"
      },
      {
        "explanation": "每年；名词短语也可以作时间状语，不一定都要介词。",
        "form": "限定词 + 时间名词",
        "function": "时间状语",
        "modifies": "amounts to millions of cases",
        "text": "every year"
      },
      {
        "explanation": "用流行病比喻交流失败之普遍，virtual 修饰 epidemic 表几乎可称为。",
        "form": "名词短语",
        "function": "同位评价",
        "modifies": "millions of cases",
        "text": "a virtual epidemic of failed conversation"
      }
    ], clauses: [] },
        literal: "考虑到目前接近50%的离婚率，那相当于美国每年数百万个案例——一场几乎可称为流行病的沟通失败。",
        natural: "鉴于目前接近50%的离婚率，美国每年涉及这类情况的案例多达数百万，沟通失败简直已成了一种流行病。",
        logic: "突出问题规模；这句话说明的是离婚率和大量案例，不能提供第28题B项声称的因果比例。",
        phrases: ["Given the current divorce rate", "amounts to millions of cases", "a virtual epidemic"],
      },
      {
        id: "2010-p2-s15", number: 15,
        text: "In my own research, complaints from women about their husbands most often focused not on tangible inequities such as having given up the chance for a career to accompany a husband to his, or doing far more than their share of daily life-support work like cleaning, cooking and social arrangements.",
        trunk: "complaints focused not on tangible inequities.",
        layers: [{ label: "主干与范围", text: "complaints from women about their husbands...focused not on tangible inequities：女性对丈夫的抱怨，其重点通常不在具体的不公平待遇。" }, { label: "第一个例子", text: "having given up the chance for a career to accompany a husband to his：自己曾放弃事业机会，陪丈夫去追求他的事业。his 代指 his career。" }, { label: "第二个例子", text: "doing far more than their share of daily life-support work：所做的维持日常生活的事务远远超过她们应分担的份额。" }, { label: "列举日常事务", text: "like cleaning, cooking and social arrangements：例如清洁、做饭和安排社交事务，只修饰就近的 work。" }],
        grammar: ["真正主语是 complaints，不是 women 或 husbands；from women 说明抱怨者，about their husbands 说明抱怨对象。", "focused not on... 与下一句 Instead 呼应，否定主要关注点，不是否认这些不公平存在。", "such as 后并列 having given up... 与 doing... 两个 -ing 结构；having given up 是完成形式，表示先前已作出的牺牲。", "to accompany... 表放弃事业机会的目的；to his 中 his 是名词性物主代词，替代 his career。", "far 加强 more 的比较程度；than their share 是比较短语，没有写出的独立主谓，不能凭空补成原文从句。life-support 在这里指维持日常生活，不是医院的生命支持设备。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s15"], components: [
      {
        "explanation": "限定为作者自己的研究，own 强调所属。",
        "form": "in + 名词短语",
        "function": "范围状语",
        "modifies": "全句研究结论",
        "text": "In my own research"
      },
      {
        "children": [
          {
            "explanation": "抱怨是叙述对象，不能找最近的 husbands 作主语。",
            "form": "名词复数",
            "function": "主语中心",
            "modifies": "focused",
            "text": "complaints"
          },
          {
            "explanation": "谁提出抱怨。",
            "form": "介词短语",
            "function": "来源定语",
            "modifies": "complaints",
            "text": "from women"
          },
          {
            "explanation": "针对谁的抱怨；their 指女性们的。",
            "form": "介词短语",
            "function": "对象定语",
            "modifies": "complaints",
            "text": "about their husbands"
          }
        ],
        "explanation": "中心是 complaints。",
        "form": "名词 + 介词修饰语",
        "function": "主语",
        "modifies": "focused",
        "text": "complaints from women about their husbands"
      },
      {
        "explanation": "most 修饰 often，表最常见；不是限定 women 的数量。",
        "form": "程度词 + 频率副词",
        "function": "频率状语",
        "modifies": "focused",
        "text": "most often"
      },
      {
        "explanation": "focus on 后面引关注重点。",
        "form": "一般过去时动词",
        "function": "谓语",
        "modifies": "complaints",
        "text": "focused"
      },
      {
        "children": [
          {
            "explanation": "否定重点在这些不公，并不否定不公存在。",
            "form": "否定词 + on 短语",
            "function": "关注对象中心",
            "modifies": "focused",
            "text": "not on tangible inequities"
          },
          {
            "children": [
              {
                "children": [
                  {
                    "explanation": "give up 表放弃；having 表相对于后续研究所谈处境先发生。",
                    "form": "having + 过去分词短语",
                    "function": "非谓语中心",
                    "modifies": "逻辑主语为女性",
                    "text": "having given up"
                  },
                  {
                    "explanation": "chance 是被放弃的机会；for a career 限定是哪种机会。",
                    "form": "名词 + 介词短语",
                    "function": "非谓语宾语",
                    "modifies": "given up",
                    "text": "the chance for a career"
                  },
                  {
                    "children": [
                      {
                        "explanation": "被陪同的人，不是下一个新主语。",
                        "form": "名词短语",
                        "function": "不定式宾语",
                        "modifies": "accompany",
                        "text": "a husband"
                      },
                      {
                        "explanation": "his 独立指 his career，即丈夫的事业；不把 career 补写回原文。",
                        "form": "介词 + 名词性物主代词",
                        "function": "方向补足语",
                        "modifies": "accompany",
                        "text": "to his"
                      }
                    ],
                    "explanation": "说明为什么放弃自己的机会。",
                    "form": "不定式短语",
                    "function": "目的状语",
                    "modifies": "having given up",
                    "text": "to accompany a husband to his"
                  }
                ],
                "explanation": "妻子此前放弃事业机会，非谓语完成式说明牺牲已作出。",
                "form": "完成式 -ing 短语",
                "function": "第一个举例项",
                "modifies": "inequities",
                "text": "having given up the chance for a career to accompany a husband to his"
              },
              {
                "children": [
                  {
                    "explanation": "与 having given up 同为 such as 后的名词性例子。",
                    "form": "现在分词/动名词",
                    "function": "非谓语中心",
                    "modifies": "逻辑主语为女性",
                    "text": "doing"
                  },
                  {
                    "children": [
                      {
                        "explanation": "加强比较级，不表示空间很远。",
                        "form": "程度副词",
                        "function": "程度状语",
                        "modifies": "more",
                        "text": "far"
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "explanation": "打扫、做饭、社交安排都是日常事务的例子；like 在此为介词‘例如’。",
                                "form": "like + 三个并列名词性成分",
                                "function": "举例说明",
                                "modifies": "work",
                                "text": "like cleaning, cooking and social arrangements"
                              }
                            ],
                            "explanation": "说明是哪类工作的份额。",
                            "form": "of + 名词短语",
                            "function": "后置定语",
                            "modifies": "share",
                            "text": "of daily life-support work like cleaning, cooking and social arrangements"
                          }
                        ],
                        "explanation": "拿实际承担量与她们的份额比较。",
                        "form": "比较短语",
                        "function": "比较基准",
                        "modifies": "more",
                        "text": "than their share of daily life-support work like cleaning, cooking and social arrangements"
                      }
                    ],
                    "explanation": "做的量远超应有份额。",
                    "form": "数量名词性结构",
                    "function": "非谓语宾语",
                    "modifies": "doing",
                    "text": "far more than their share of daily life-support work like cleaning, cooking and social arrangements"
                  }
                ],
                "explanation": "妻子承担过量日常事务，与牺牲事业机会并列。",
                "form": "-ing 非谓语短语",
                "function": "第二个举例项",
                "modifies": "inequities",
                "text": "doing far more than their share of daily life-support work like cleaning, cooking and social arrangements"
              }
            ],
            "explanation": "以 or 为界分两大例；内部的小例子留在第二项里。",
            "form": "such as + 两个并列非谓语结构",
            "function": "举例说明",
            "modifies": "inequities",
            "text": "such as having given up the chance for a career to accompany a husband to his, or doing far more than their share of daily life-support work like cleaning, cooking and social arrangements"
          }
        ],
        "explanation": "先看 not on tangible inequities，两个长例子都说明 inequities，不另起主句。",
        "form": "否定词 + 带举例的介词短语",
        "function": "被否定的关注对象",
        "modifies": "focused",
        "text": "not on tangible inequities such as having given up the chance for a career to accompany a husband to his, or doing far more than their share of daily life-support work like cleaning, cooking and social arrangements"
      }
    ], clauses: [] },
        literal: "在我自己的研究中，女性针对丈夫的抱怨，最常关注的并不是具体的不公，例如曾放弃自己的事业机会以陪丈夫追求他的事业，或承担远超自己份额的维持日常生活的工作，如清洁、做饭和安排社交事务。",
        natural: "在我自己的研究中，女性对丈夫的抱怨通常并不着重于那些具体的不公平，比如为陪丈夫发展事业而放弃自己的职业机会，或在打扫、做饭、安排社交等日常事务上，承担远超自己应有份额的工作。",
        logic: "排除容易想到的物质或分工不平等，为下一句揭示真正重点作对照；支持第26题排除C、D。",
        phrases: ["focused not on tangible inequities", "such as", "given up the chance", "far more than their share", "daily life-support work"],
      },
      {
        id: "2010-p2-s16", number: 16,
        text: "Instead, they focused on communication: \"He doesn't listen to me.\"",
        trunk: "they focused on communication.",
        layers: [{ label: "实际重点", text: "they focused on communication：这些抱怨集中在沟通上；they 承接前句 complaints，而不是丈夫们。" }, { label: "具体抱怨", text: "He doesn't listen to me：他不听我说话，直接引语用妻子的口吻举例。" }],
        grammar: ["Instead 是句子连接副词，与上一句 not on... 形成纠正或转向关系。", "冒号后是说明 communication 问题的独立直接引语，不是 communication 的定语从句。listen 为不及物动词，需要 to 引出倾听对象。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s16"], components: [
      {
        "explanation": "引出真正关注点：沟通。",
        "form": "连接副词",
        "function": "纠正前项的衔接语",
        "modifies": "前句 not on…与本句 on…",
        "text": "Instead"
      },
      {
        "explanation": "承接 complaints，即抱怨，不指丈夫们。",
        "form": "人称代词",
        "function": "主语",
        "modifies": "focused",
        "text": "they"
      },
      {
        "explanation": "与 on 引出的关注对象搭配。",
        "form": "一般过去时动词",
        "function": "谓语",
        "modifies": "they",
        "text": "focused"
      },
      {
        "explanation": "说明集中在沟通上。",
        "form": "介词短语",
        "function": "关注对象补足语",
        "modifies": "focused",
        "text": "on communication"
      },
      {
        "children": [
          {
            "explanation": "指丈夫。",
            "form": "人称代词",
            "function": "引语主语",
            "modifies": "doesn't listen",
            "text": "He"
          },
          {
            "explanation": "listen 为不及物动词，需要 to 接对象。",
            "form": "助动词否定 + 原形",
            "function": "引语谓语",
            "modifies": "He",
            "text": "doesn't listen"
          },
          {
            "explanation": "me 是说出抱怨的妻子。",
            "form": "to + 宾格代词",
            "function": "倾听对象补足语",
            "modifies": "listen",
            "text": "to me"
          }
        ],
        "explanation": "引语换到妻子的视角。",
        "form": "直接引语",
        "function": "冒号后的例示",
        "modifies": "communication 的问题",
        "text": "He doesn't listen to me"
      }
    ], clauses: [
      {
        "text": "He doesn't listen to me",
        "type": "直接引语中的内容分句",
        "marker": "冒号及引号；无从属连词",
        "role": "举例说明沟通抱怨",
        "subject": "He",
        "predicate": "doesn't listen",
        "translationOrder": "先译‘他不听’，再译对象‘我说话’。",
        "predicateDetails": []
      }
    ] },
    literal: "相反，这些抱怨集中在沟通上：‘他不听我说话。’", natural: "她们抱怨的重点其实是沟通：‘他不听我说话。’",
    logic: "直接点出研究发现的核心，支持女性重视沟通这一判断。",
    phrases: ["focused on communication", "listen to me"],
  },
  {
    id: "2010-p2-s17", number: 17,
    text: "\"He doesn't talk to me.\"",
    trunk: "He doesn't talk to me.",
    layers: [{ label: "第二种抱怨", text: "He doesn't talk to me：他不和我交谈，与前一句‘不倾听’并列说明沟通有来有往两个方面。" }],
    grammar: ["doesn't 后的实义动词 talk 用原形，不再加 -s。", "to me 指交谈对象，不能把否定范围扩大成丈夫不和任何人说话。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s17"], components: [
      {
        "text": "He",
        "form": "人称代词",
        "function": "主语",
        "modifies": "doesn't talk",
        "explanation": "在妻子的直接引语中指丈夫。"
      },
      {
        "text": "doesn't talk",
        "form": "助动词否定式 + 动词原形",
        "function": "谓语",
        "modifies": "He",
        "explanation": "描述惯常不交谈的情况，doesn't 承担第三人称单数变化。"
      },
      {
        "text": "to me",
        "form": "to + 宾格代词",
        "function": "交谈对象补足语",
        "modifies": "talk",
        "explanation": "me 是妻子，保留这一对象才能体现家庭沟通问题。"
      }
    ], clauses: [] },
        literal: "‘他不和我说话。’", natural: "‘他不跟我交流。’",
        logic: "与上一句并列列举女性的抱怨，进一步限定缺乏沟通的具体表现。",
        phrases: ["talk to me"],
      },
      {
        id: "2010-p2-s18", number: 18,
        text: "I found, as Hacker observed years before, that most wives want their husbands to be, first and foremost, conversational partners, but few husbands share this expectation of their wives.",
        trunk: "I found that most wives want their husbands to be conversational partners, but few husbands share this expectation.",
        layers: [{ label: "研究发现", text: "I found that...：作者发现两方面的差异，that 后用 but 连接妻子和丈夫的期待。" }, { label: "插入的前人研究", text: "as Hacker observed years before：正如哈克多年前观察到的，补充说明同一发现已有前例。" }, { label: "妻子的优先期待", text: "most wives want their husbands to be...conversational partners：多数妻子首先希望丈夫成为交谈伙伴。" }, { label: "丈夫的对照", text: "few husbands share this expectation of their wives：很少有丈夫也对妻子抱有这种期待，few 带否定意味。" }],
        grammar: ["as 引导评注性的非限制性定语从句，指向作者所述发现；as 在从句中对应 observed 的宾语，不能当作单纯时间连接词。", "want somebody to be something 中 somebody 是 want 的宾语，也是不定式 to be 的逻辑主语；conversational partners 是 to be 的表语。", "first and foremost 是插入的优先顺序状语；few 与 a few 不同，前者强调‘很少、几乎没有’。", "that 内容从句内部用 but 对比夫妻双方的期待；of their wives 指丈夫对妻子抱有什么期待，并不是说这个 expectation 属于妻子所有。"],
        beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s18"], components: [
      {
        "explanation": "指作者。",
        "form": "人称代词",
        "function": "主句主语",
        "modifies": "found",
        "text": "I"
      },
      {
        "explanation": "含义为研究发现，后接 that 内容。",
        "form": "find 的一般过去式",
        "function": "主句谓语",
        "modifies": "I",
        "text": "found"
      },
      {
        "children": [
          {
            "explanation": "观察者是哈克。",
            "form": "专有名词",
            "function": "评注从句主语",
            "modifies": "observed",
            "text": "Hacker"
          },
          {
            "explanation": "as 对应它所观察的内容，指向作者的发现。",
            "form": "一般过去时动词",
            "function": "评注从句谓语",
            "modifies": "Hacker",
            "text": "observed"
          },
          {
            "explanation": "更早若干年的观察，不能转而修饰 want。",
            "form": "时间名词 + 时间副词",
            "function": "时间状语",
            "modifies": "observed",
            "text": "years before"
          }
        ],
        "explanation": "正如哈克此前观察到的，不是 found 的发生时间。",
        "form": "as 引导的评注性从句",
        "function": "插入的非限制性定语从句",
        "modifies": "作者报告的整个发现",
        "text": "as Hacker observed years before"
      },
      {
        "children": [
          {
            "explanation": "多数妻子。",
            "form": "数量限定词 + 名词",
            "function": "第一分句主语",
            "modifies": "want",
            "text": "most wives"
          },
          {
            "explanation": "希望某人担当某种角色。",
            "form": "一般现在时动词",
            "function": "第一分句谓语",
            "modifies": "most wives",
            "text": "want"
          },
          {
            "explanation": "同时是不定式 to be 的逻辑主语。",
            "form": "名词短语",
            "function": "want 的宾语",
            "modifies": "want",
            "text": "their husbands"
          },
          {
            "children": [
              {
                "explanation": "逻辑主语是丈夫，不是妻子。",
                "form": "to + 系动词原形",
                "function": "不定式中心",
                "modifies": "their husbands",
                "text": "to be"
              },
              {
                "explanation": "表示这一角色优先，不等于唯一。",
                "form": "固定副词短语",
                "function": "优先顺序状语",
                "modifies": "to be conversational partners",
                "text": "first and foremost"
              },
              {
                "explanation": "partners 为中心，conversational 限定为交谈伙伴。",
                "form": "名词短语",
                "function": "不定式表语",
                "modifies": "to be",
                "text": "conversational partners"
              }
            ],
            "explanation": "交代希望丈夫成为什么。",
            "form": "带插入语的不定式短语",
            "function": "宾语补足语",
            "modifies": "their husbands",
            "text": "to be, first and foremost, conversational partners"
          },
          {
            "children": [
              {
                "explanation": "few 表很少，不能翻译成很多或一些。",
                "form": "否定数量限定词 + 名词",
                "function": "第二分句主语",
                "modifies": "share",
                "text": "few husbands"
              },
              {
                "explanation": "有同样的想法，非名词份额。",
                "form": "一般现在时及物动词",
                "function": "第二分句谓语",
                "modifies": "few husbands",
                "text": "share"
              },
              {
                "children": [
                  {
                    "explanation": "对妻子所抱的期待，不是妻子所拥有的期待。",
                    "form": "介词短语",
                    "function": "期待对象定语",
                    "modifies": "expectation",
                    "text": "of their wives"
                  }
                ],
                "explanation": "this 回指希望配偶成为交谈伙伴。",
                "form": "名词短语",
                "function": "第二分句宾语",
                "modifies": "share",
                "text": "this expectation of their wives"
              }
            ],
            "explanation": "丈夫这边的期待不同。",
            "form": "but + 对比分句",
            "function": "第二个并列内容分句",
            "modifies": "most wives want…",
            "text": "but few husbands share this expectation of their wives"
          }
        ],
        "explanation": "内部的 but 并列两个完整判断。",
        "form": "that 引导的内容从句",
        "function": "宾语从句",
        "modifies": "found",
        "text": "that most wives want their husbands to be, first and foremost, conversational partners, but few husbands share this expectation of their wives"
      }
    ], clauses: [
      {
        "text": "as Hacker observed years before",
        "type": "评注性的非限制性定语从句",
        "marker": "as",
        "role": "插入说明与作者发现相同的内容",
        "subject": "Hacker",
        "predicate": "observed",
        "translationOrder": "先可跳过找到 I found that...，再补‘正如哈克多年前观察到的’。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "as（代表作者发现的内容）"
          }
        ]
      },
      {
        "text": "that most wives want their husbands to be, first and foremost, conversational partners, but few husbands share this expectation of their wives",
        "type": "内部含并列分句的宾语从句",
        "marker": "that；内部由 but 连接",
        "role": "作 found 的宾语",
        "subject": "most wives；few husbands",
        "predicate": "want；share",
        "translationOrder": "先译多数妻子希望丈夫成为交谈伙伴，再用‘但’对照丈夫较少这样期待妻子。",
        "predicateDetails": [
          {
            "function": "第一分句宾语",
            "text": "their husbands"
          },
          {
            "function": "宾语补足语",
            "text": "to be, first and foremost, conversational partners"
          },
          {
            "function": "第二分句宾语",
            "text": "this expectation of their wives"
          }
        ]
      }
    ] },
    literal: "我发现，正如哈克多年前观察到的，多数妻子希望丈夫首先成为交谈伙伴，但很少有丈夫对妻子抱有这种相同的期待。",
    natural: "正如哈克多年前的观察，我也发现，多数妻子最希望丈夫能成为交谈的伙伴，可很少有丈夫对妻子抱有同样的期待。",
    logic: "直接回答第26题，并把交流差异概括为彼此期待不一致；仍须围绕‘交谈’理解，不能泛化为所有婚姻期待。",
    phrases: ["first and foremost", "conversational partners", "share this expectation"],
  },
  {
    id: "2010-p2-s19", number: 19,
    text: "In short, the image that best represents the current crisis is the stereotypical cartoon scene of a man sitting at the breakfast table with a newspaper held up in front of his face, while a woman glares at the back of it, wanting to talk.",
    trunk: "the image is the stereotypical cartoon scene.",
    layers: [{ label: "外层系表", text: "the image...is the stereotypical cartoon scene：最能代表问题的是那个老套的漫画场景。" }, { label: "限定主语", text: "that best represents the current crisis：修饰 image，指出是最能表现当下交流危机的形象。" }, { label: "男人这一侧", text: "of a man sitting...with a newspaper held up...：男人坐在早餐桌旁，报纸举在脸前；sitting 修饰 man，held up 是 with 结构中的被动补语。" }, { label: "女人这一侧", text: "while a woman glares at the back of it, wanting to talk：女人想说话，却瞪着报纸的背面；it 指 newspaper，不是 face。" }],
    grammar: ["that 是定语从句主语，先行词为 image；best 是副词，修饰 represents。", "of a man... 修饰 scene，交代画面内容；sitting 是后置修饰 man 的现在分词，不是主句谓语。", "with + 名词 + 过去分词构成伴随结构：a newspaper 与 held up 是被动关系；该结构没有独立限定动词，不应标成完整从句。", "while 引导对比分句，同时呈现夫妻两人的动作；wanting to talk 是 woman 的伴随状态，不能挂到 newspaper 或 man 上。"],
    beginnerSyntax: { reading: passage2010P2Reading["2010-p2-s19"], components: [
      {
        "explanation": "简言之，接下来用画面概括前文。",
        "form": "固定介词短语",
        "function": "总结衔接语",
        "modifies": "整句",
        "text": "In short"
      },
      {
        "children": [
          {
            "explanation": "形象是被判断为什么的对象。",
            "form": "名词短语",
            "function": "主语中心",
            "modifies": "is",
            "text": "the image"
          },
          {
            "children": [
              {
                "explanation": "最贴切地，不能把 best 当主语或名词。",
                "form": "程度副词最高级",
                "function": "方式/程度状语",
                "modifies": "represents",
                "text": "best"
              },
              {
                "explanation": "表现、代表某个问题。",
                "form": "一般现在时动词",
                "function": "定语从句谓语",
                "modifies": "that",
                "text": "represents"
              },
              {
                "explanation": "指当前夫妻沟通危机。",
                "form": "名词短语",
                "function": "定语从句宾语",
                "modifies": "represents",
                "text": "the current crisis"
              }
            ],
            "explanation": "that 指 image，作 represents 的主语。",
            "form": "that 引导的从句",
            "function": "限制性定语从句",
            "modifies": "image",
            "text": "that best represents the current crisis"
          }
        ],
        "explanation": "中心名词为 image。",
        "form": "名词 + 定语从句",
        "function": "主语",
        "modifies": "is",
        "text": "the image that best represents the current crisis"
      },
      {
        "explanation": "连接 image 与 scene，其他动词均在从句或非谓语结构中。",
        "form": "一般现在时系动词",
        "function": "主句谓语",
        "modifies": "the image",
        "text": "is"
      },
      {
        "children": [
          {
            "explanation": "stereotypical 修饰漫画场景，表示常见、老套。",
            "form": "名词短语",
            "function": "表语中心",
            "modifies": "is",
            "text": "the stereotypical cartoon scene"
          },
          {
            "children": [
              {
                "children": [
                  {
                    "explanation": "坐在早餐桌旁。",
                    "form": "地点介词短语",
                    "function": "地点状语",
                    "modifies": "sitting",
                    "text": "at the breakfast table"
                  },
                  {
                    "children": [
                      {
                        "explanation": "报纸是被举起的物。",
                        "form": "名词短语",
                        "function": "with 的对象",
                        "modifies": "with",
                        "text": "a newspaper"
                      },
                      {
                        "explanation": "报纸与举起之间为被动关系；不是主句过去时。",
                        "form": "过去分词短语",
                        "function": "宾语补足语",
                        "modifies": "a newspaper",
                        "text": "held up"
                      },
                      {
                        "explanation": "报纸举在男子脸前，his 指男子。",
                        "form": "复合介词短语",
                        "function": "位置状语",
                        "modifies": "held up",
                        "text": "in front of his face"
                      }
                    ],
                    "explanation": "带出男子举着报纸的姿态。",
                    "form": "with + 名词 + 分词补语",
                    "function": "伴随状语",
                    "modifies": "sitting 所描述的男子状态",
                    "text": "with a newspaper held up in front of his face"
                  }
                ],
                "explanation": "坐着的是男子，不是 image 在坐。",
                "form": "现在分词短语",
                "function": "后置定语",
                "modifies": "man",
                "text": "sitting at the breakfast table with a newspaper held up in front of his face"
              }
            ],
            "explanation": "说明什么样的画面，中心人物是 man。",
            "form": "of + 被修饰的名词短语",
            "function": "内容定语",
            "modifies": "scene",
            "text": "of a man sitting at the breakfast table with a newspaper held up in front of his face"
          }
        ],
        "explanation": "scene 是中心，of…说明画面中的男子。",
        "form": "名词 + 多层修饰",
        "function": "表语",
        "modifies": "the image",
        "text": "the stereotypical cartoon scene of a man sitting at the breakfast table with a newspaper held up in front of his face"
      },
      {
        "children": [
          {
            "explanation": "后续 wanting 的逻辑主语也是她。",
            "form": "名词短语",
            "function": "分句主语",
            "modifies": "glares",
            "text": "a woman"
          },
          {
            "explanation": "怒目瞪视，不是一般随意看。",
            "form": "一般现在时动词",
            "function": "分句谓语",
            "modifies": "a woman",
            "text": "glares"
          },
          {
            "explanation": "it 指 newspaper；女子看到报纸的背面。",
            "form": "介词短语",
            "function": "瞪视对象补足语",
            "modifies": "glares",
            "text": "at the back of it"
          },
          {
            "explanation": "说明她想交谈的状态，不能挂在报纸或男子下面。",
            "form": "现在分词短语",
            "function": "伴随状态状语",
            "modifies": "a woman",
            "text": "wanting to talk"
          }
        ],
        "explanation": "从画面中男子转向女子，兼有同时与对照关系。",
        "form": "while 引导的分句",
        "function": "画面中的对比分句",
        "modifies": "前面男子坐着读报的场景",
        "text": "while a woman glares at the back of it, wanting to talk"
      }
    ], clauses: [
      {
        "text": "that best represents the current crisis",
        "type": "限制性定语从句",
        "marker": "that",
        "role": "修饰 image",
        "subject": "that（指 image）",
        "predicate": "represents",
        "translationOrder": "把‘最能表现当前危机的’放在‘形象’之前理解。",
        "predicateDetails": [
          {
            "function": "宾语",
            "text": "the current crisis"
          }
        ]
      },
      {
        "text": "while a woman glares at the back of it, wanting to talk",
        "type": "while 引导的对比分句",
        "marker": "while",
        "role": "对照男人读报的画面",
        "subject": "a woman",
        "predicate": "glares",
        "translationOrder": "用‘而’转到女人瞪着报纸，再补出她想交谈的状态。",
        "predicateDetails": []
      }
    ] },
    literal: "简言之，最能表现当前危机的形象，就是那个老套的漫画场景：一个男人坐在早餐桌旁，一份报纸举在他的脸前，而一个女人瞪着它的背面，想要交谈。",
    natural: "简言之，最能体现当前交流危机的，是那个常见的漫画场景：男人坐在早餐桌旁，把报纸举在脸前；女人想和他说话，正瞪着报纸的背面。",
    logic: "用可视化场景收束全文，也为第30题推测紧接着细描这幅漫画提供最直接的承接对象；这只是续写推断，不是已知的后文事实。",
    phrases: ["In short", "at the breakfast table", "with a newspaper held up in front of his face", "in front of his face", "glares at the back of it"],
  },
];


const reviewedVisualRoles: Record<string, SyntaxVisualRole[]> = {
  "2010-p2-s1": [
    "subject",
    "predicate",
    "object",
    "modifier",
    "modifier"
  ],
  "2010-p2-s2": [
    "modifier",
    "subject",
    "predicate",
    "complement",
    "modifier",
    "modifier"
  ],
  "2010-p2-s3": [
    "modifier",
    "subject",
    "predicate",
    "object"
  ],
  "2010-p2-s4": [
    "subject",
    "modifier",
    "predicate",
    "modifier"
  ],
  "2010-p2-s5": [
    "subject",
    "predicate",
    "modifier",
    "connector",
    "predicate",
    "object"
  ],
  "2010-p2-s6": [
    "subject",
    "predicate",
    "complement",
    "subject",
    "predicate",
    "complement"
  ],
  "2010-p2-s7": [
    "object",
    "subject",
    "predicate"
  ],
  "2010-p2-s8": [
    "modifier",
    "subject",
    "predicate",
    "object"
  ],
  "2010-p2-s9": [
    "modifier",
    "subject",
    "predicate",
    "object",
    "modifier"
  ],
  "2010-p2-s10": [
    "subject",
    "predicate",
    "object"
  ],
  "2010-p2-s11": [
    "connector",
    "subject",
    "predicate",
    "object",
    "complement"
  ],
  "2010-p2-s12": [
    "subject",
    "predicate",
    "modifier",
    "modifier"
  ],
  "2010-p2-s13": [
    "subject",
    "predicate",
    "modifier",
    "object"
  ],
  "2010-p2-s14": [
    "modifier",
    "subject",
    "predicate",
    "complement",
    "modifier",
    "modifier",
    "modifier"
  ],
  "2010-p2-s15": [
    "modifier",
    "subject",
    "modifier",
    "predicate",
    "complement"
  ],
  "2010-p2-s16": [
    "connector",
    "subject",
    "predicate",
    "complement",
    "modifier"
  ],
  "2010-p2-s17": [
    "subject",
    "predicate",
    "complement"
  ],
  "2010-p2-s18": [
    "subject",
    "predicate",
    "modifier",
    "object"
  ],
  "2010-p2-s19": [
    "connector",
    "subject",
    "predicate",
    "complement",
    "modifier"
  ]
};
const translationNotes: Record<string, string[]> = {
  "2010-p2-s1": [
    "gathering在此指聚会的人群；通顺译文中的“组织的聚会”解释同位关系，不是原句另外给出的谓语。"
  ],
  "2010-p2-s6": [
    "The room借场所代指满屋听众；通顺译文的“却”呈现分号两边的反差，原文没有however。"
  ],
  "2010-p2-s8": [
    "本句开启的直接引语到第9句末才结束；I是男子，不是作者。have与nothing构成“没有”，词块中文需合起来理解，不能将否定算作have本身的词义。"
  ],
  "2010-p2-s9": [
    "we'd在此是we would；“要不是……就会……”呈现假设关系，不补成过去已发生的事实。"
  ],
  "2010-p2-s10": [
    "“却”对应although引出的让步反差；less保留较少的程度，不扩大为完全不说话。"
  ],
  "2010-p2-s12": [
    "通顺译文的“就”强调观察较早，原文没有only；具体时间仍只到20世纪70年代后期。"
  ],
  "2010-p2-s14": [
    "that接回前文离婚与沟通不足的情况；“数百万”是作者的规模概括，不是由本文给出的样本量和比例严格算得。50%限定离婚率，不能当作沟通失败所占比例。"
  ],
  "2010-p2-s15": [
    "to his中的his独立代替his career，中文补出“事业”以免指代不清；原文不补写career。两个举例都受not on的否定焦点统领，不等于作者否认不公平存在。"
  ],
  "2010-p2-s16": [
    "they在语法上承接complaints；通顺译文改说“她们抱怨的重点”以符合中文习惯，不能因此改判原句主语为women。"
  ],
  "2010-p2-s19": [
    "it指newspaper；中文直接译作“报纸”是还原指代。“把报纸举在脸前”对应with附带状态，不是另加一个原文中的限定谓语。"
  ]
};
export const passage2010P2Sentences: SentenceAnalysis[] = passage2010P2Drafts.map((sentence, index) => {
  const reviewed = withReviewedSyntax(sentence, reviewedVisualRoles[sentence.id]);
  const translations = passage2010P2BlockTranslations[index];
  if (translations.length !== reviewed.chunks.length) throw new Error(`${sentence.id}: 词块翻译未对齐`);
  return { ...reviewed, practice: passage2010P2Practice[sentence.id],
    translationAlignment: reviewed.chunks.map((chunk, i) => ({ english: chunk.text, chinese: translations[i] })),
    translationNotes: translationNotes[sentence.id],
  };
});

const question = (number: number, sentenceId: string, prompt: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D", locating: string, explanations: Question["explanations"]): Question => ({
  id: 201000 + number, number, sentenceId, prompt,
  options: (["A", "B", "C", "D"] as const).map((key, index) => ({ key, text: options[index] })),
  answer, locating, explanations, reasoning: passage2010P2Reasoning[number], analysis: passage2010P2QuestionAnalysis[number],
});

export const passage2010P2Questions: Question[] = [
  question(26, "2010-p2-s18", "What is most wives' main expectation of their husbands?", ["Talking to them.", "Trusting them.", "Supporting their careers.", "Sharing housework."], "A", "第4段末句（第18句）直接说 most wives want their husbands to be, first and foremost, conversational partners。first and foremost 对应 main expectation，conversational partners 对应 Talking to them。", { A: "正确。多数妻子首先期待丈夫成为交谈伙伴，即愿意和她们说话。", B: "文中没有把夫妻信任列为这一主要期待；不能把常识中的婚姻需求代入原文。", C: "第15句提到为丈夫事业放弃自己的机会，但这属于作者明确排除的主要抱怨焦点，不是本题所问的首要期待。", D: "第15句将承担过多家务作为具体不公平的例子；下一句 Instead 明确把主要关注点转到交流。" }),
  question(27, "2010-p2-s11", "Judging from the context, the phrase \"wreaking havoc\" (Line 3, Para. 2) most probably means ________________.", ["generating motivation", "exerting influence", "causing damage", "creating pressure"], "C", "第2段末句（第11句）说这种谈话模式对婚姻产生后果；第13—14句紧接着提到沟通不足、离婚及大量案例，限定其为严重负面破坏。wreak havoc 是固定搭配，不能只理解为一般影响。", { A: "motivation 是动力、动机；产生动力偏正面，和后文离婚及沟通失败的后果相反。", B: "exerting influence 仅表示施加影响，既可能正面也可能负面，遗漏 havoc 的强烈破坏性。", C: "正确。causing damage 表示造成损害，与 wreaking havoc 的负面性质和婚姻危机语境一致。", D: "creating pressure 是造成压力；压力可能是影响的一种，但没有准确表达这里已经造成的严重损害。" }),
  question(28, "2010-p2-s14", "All of the following are true EXCEPT ________________.", ["men tend to talk more in public than women", "nearly 50 percent of recent divorces are caused by failed conversation", "women attach much importance to communication between couples", "a female tends to be more talkative at home than her spouse"], "B", "题目要求选不成立的一项。第14句的 nearly 50 percent 修饰 divorce rate，是离婚率，不是‘离婚案例中因沟通失败所占的比例’；第13句的受访女性多数这样归因，也不能推算所有近期离婚的比例。研招网2010年旧转载答案列28D，与这一文本区别及华慧逐题解析不一致；本篇按用户原文和明确解析取B，差异见交付报告。", { A: "符合第10句：American men tend to talk more than women in public situations，且保留 tend to 的倾向含义。", B: "错误，故为答案。它把总体离婚率偷换成特定离婚原因在离婚案例中的占比，还增添 recent 和确定因果；原文没有给出这一统计。", C: "符合第16—18句：女性的抱怨集中于交流，多数妻子最希望丈夫成为交谈伙伴。", D: "符合作者概括的家庭谈话倾向：开篇由妻子维持交谈，第10句把男性在公开场合较健谈与在家话少对照起来。tends to 表一般倾向，不是在断言所有夫妻都如此。" }),
  question(29, "2010-p2-s10", "Which of the following can best summarize the main idea of this text?", ["The moral decay deserves more research by sociologists.", "Marriage break-up stems from sex inequalities.", "Husband and wife have different expectations from their marriage.", "Conversational patterns between man and wife are different."], "D", "首段聚会个案、第2段的 this pattern、第4段对交谈伙伴的不同期待和末段漫画，都围绕夫妻交谈模式的差异展开。选择能同时覆盖这些段落且不扩大话题的D。", { A: "moral decay（道德衰败）未被提出；提到社会学家的研究不等于主旨是道德问题。", B: "把婚姻破裂归结为性别不平等，是第15句所排除的主要关注点，还把有关联的现象改成单一确定因果。", C: "第18句确实涉及期待差异，但原文具体谈的是交谈方面的期待；本项泛化为对整个婚姻的期待，概括范围过宽且不够具体。", D: "正确。夫妻交谈模式不同贯穿个案、研究和漫画，既保留全文范围，也点明核心讨论对象。" }),
  question(30, "2010-p2-s19", "In the following part immediately after this text, the author will most probably focus on ________________.", ["a vivid account of the new book Divorce Talk", "a detailed description of the stereotypical cartoon", "other possible reasons for a high divorce rate in the U.S.", "a brief introduction to the political scientist Andrew Hacker"], "B", "这是相邻段落的续写推断，不是要求检索已给出的后文。最后一段刚引入最能概括交流危机的漫画场景，最自然的紧接内容是继续描写这个场景、展开夫妻交谈的反差。四项中B与末句的焦点衔接最直接。", { A: "Divorce Talk 是第3段用于支持论点的研究来源，末段没有把话题转回这本书；续写书的介绍会跳开刚引出的漫画。", B: "正确的最可能推断。它延续末段已引入的 cartoon scene，保持相邻段落的话题连贯；不表示原卷实际包含这一后续段落。", C: "高离婚率用于说明问题规模，但全文焦点仍是交流差异；突然罗列其他原因会偏离末段场景，也扩大论题。", D: "Hacker 的身份和观察已经交代，他不是末段焦点；接着写人物简介缺乏承接提示。" }),
];
