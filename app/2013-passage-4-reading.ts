import type { ArticleGuide } from "./article-teaching";
import type { SentenceAnalysis } from "./data";
import { createV2Sentence, type QuickReading } from "./article-v2/model";
import { reviewedBlocks } from "./2013-reading-helpers";
import { passage2013P4Texts as texts, passage2013P4ParagraphNumbers } from "./2013-passage-4-source";
import { passage2013P4Deep } from "./2013-passage-4-structure";
const quick: Array<[string, string, string, string[], QuickReading["keyReasons"], string[]]> = [
  [
    "欧洲并不是性别平等的天堂。",
    "not否定的是欧洲已成为理想平等之地，不是否认欧洲存在任何平等。",
    "开门见山指出现实仍有性别不平等。",
    [],
    [
      "main-line"
    ],
    []
  ],
  [
    "尤其是，除非女性参与高层管理决策，公司职场就绝不可能完全照顾家庭需要；而欧洲企业最高治理职位仍绝大多数由男性占据。",
    "never...until强调女性参与是实现家庭友好职场的必要条件；and后说眼下高层仍由男性主导。",
    "说明权力结构与家庭友好政策的关系。",
    [
      "will never be",
      "until women",
      "and Europe's"
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    [
      "In particular"
    ]
  ],
  [
    "事实上，欧洲公司董事会席位中女性只占14%。",
    "only强调比例很低；分母是董事会席位，不是所有雇员。",
    "以数字支持男性主导高层的判断。",
    [
      "only 14 per cent"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "欧盟目前正考虑立法，强制公司董事会保持一定女性比例，最高可达60%。",
    "up to是上限；原卷这里写60%，后文自愿倡议目标写40%，两处数字保留各自语境，不互相改写。",
    "介绍以强制立法取代单靠自愿的方案。",
    [
      "to compel",
      "to maintain",
      "up to"
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    [
      "up to"
    ]
  ],
  [
    "这项拟议中的强制规定源于此前努力受挫。",
    "was born of是源于，frustration指自愿倡议收效甚微带来的挫败。",
    "解释立法提议产生的原因。",
    [
      "was born"
    ],
    [
      "answer-evidence"
    ],
    [
      "was born of"
    ]
  ],
  [
    "去年，欧盟委员会副主席薇薇安·雷丁发出了采取自愿行动的呼吁。",
    "Vice President是职务，issued a call是发出呼吁，voluntary与前文compel形成对照。",
    "回顾先前自愿推进的尝试。",
    [
      "issued a call"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "雷丁邀请企业报名承诺实现性别平衡目标，使女性占董事会成员的40%。",
    "40 per cent限定女性席位占比；sign up for表示参与目标，而不是立法已经强制执行。",
    "交代自愿倡议的具体目标。",
    [
      "to sign up for",
      "of 40 per cent"
    ],
    [
      "answer-evidence"
    ],
    [
      "sign up for"
    ]
  ],
  [
    "但她的呼吁被认为失败了：只有24家公司响应。",
    "冒号后的only 24解释为什么被视为失败；took it up的it指参与倡议。",
    "用参与者很少说明自愿方式失败。",
    [
      "only 24 companies"
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    [
      "took it up"
    ]
  ],
  [
    "为了让女性兼顾工作与家庭时仍能公平地晋升企业高层，我们需要配额吗？",
    "ensure后的that从句是要保障的事情；as在此表示兼顾家庭工作的同时。",
    "用提问引出配额的必要性争论。",
    [
      "to ensure",
      "that women",
      "as they"
    ],
    [
      "main-line",
      "nested-clause"
    ],
    [
      "climb the corporate ladder"
    ]
  ],
  [
    "雷丁最近说：‘我个人不喜欢配额。’",
    "引语归雷丁，不能只摘这一句断言她最终反对配额。",
    "先承认配额本身令人抵触。",
    [
      "Reding said"
    ],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "‘但我喜欢配额所带来的效果。’",
    "But改变评价对象：不喜欢手段，但认可其作用；what指配额实现的事。",
    "把手段偏好与实际效果分开。",
    [],
    [
      "answer-evidence",
      "paragraph-turn"
    ],
    []
  ],
  [
    "雷丁认为，配额能促成行动，‘为平等开路，突破玻璃天花板’；法国等国对女性进入企业高层设有法律约束力的规定，已出现这种效果。",
    "they指quotas；glass ceiling是阻碍女性晋升的隐形障碍。a result补充指前面的平等与突破效果。",
    "用法律约束下的实际效果支持配额。",
    [
      "they \"open",
      "according to Reding,",
      "a result seen",
      "with legally binding"
    ],
    [
      "answer-evidence",
      "attachment"
    ],
    [
      "break through the glass ceiling"
    ]
  ],
  [
    "我理解雷丁的不情愿，也理解她的挫败感。",
    "I是作者，与前两句引用的雷丁声音分开；理解两种感受为后面的有条件支持铺垫。",
    "转入作者自身的立场。",
    [],
    [
      "answer-evidence"
    ],
    []
  ],
  [
    "我也不喜欢配额，因为它与我信奉的任人唯贤——由有能力者治理——相违背。",
    "governance by the capable解释meritocracy；run counter to表示相悖，yet/But后才是最终权衡。",
    "交代作者对配额的原则性保留。",
    [
      "they run counter",
      "governance by"
    ],
    [
      "answer-evidence"
    ],
    [
      "run counter to"
    ]
  ],
  [
    "但是，一旦考虑到实现任人唯贤理想所面临的障碍，就确实会觉得，一个更公平的世界必须暂时通过强制规定来建立。",
    "But标明权衡后的结论；does加强肯定，temporarily限定强制措施是临时手段。",
    "在现实障碍面前接受配额，形成有保留的支持。",
    [
      "when one considers",
      "it does look",
      "as if"
    ],
    [
      "answer-evidence",
      "nested-clause",
      "main-line"
    ],
    [
      "as if"
    ]
  ],
  [
    "毕竟，四十年的证据已经表明：欧洲和美国的公司一直回避按能力招聘女性并提拔她们到高层，不管对这些公司施加多少‘软性压力’。",
    "evidence是主句主语，所以原卷用has；that后corporations作are evading主语。no matter how much说明软性压力再多也未奏效。",
    "用长期证据解释为何不能只靠自愿和劝说。",
    [
      "has now shown",
      "that corporations",
      "are evading",
      "no matter how much"
    ],
    [
      "answer-evidence",
      "nested-clause"
    ],
    [
      "as well as",
      "no matter how much"
    ]
  ],
  [
    "当女性确实突破障碍登上企业权力顶峰时，例如谢丽尔·桑德伯格最近在脸书做到的那样，她们会引起极大关注，恰恰因为这仍是常态中的例外。",
    "do强调确实，did代替突破到高层的动作；because说明备受瞩目的原因是稀少，而非媒体平时不关注。",
    "以桑德伯格为例，指出成功女性仍不常见。",
    [
      "as, for example,",
      "they attract",
      "precisely because"
    ],
    [
      "answer-evidence",
      "reference-or-scope"
    ],
    [
      "the exception to the rule"
    ]
  ],
  [
    "如果有适当的公共政策来帮助所有女性——无论是首席执行官还是她们孩子的照护者——以及所有家庭，那么在一个更公正社会中，桑德伯格就不会比其他任何非常有能力的人更值得上新闻。",
    "If...were与would构成对现实的假设；no more...than表示并不更，而不是完全没有新闻价值。重点指向公共政策的缺位。",
    "提出制度支持应让女性成功成为正常现象。",
    [
      "whether CEOs",
      "and all families,",
      "Sandberg would",
      "than any other"
    ],
    [
      "answer-evidence",
      "nested-clause",
      "reference-or-scope"
    ],
    [
      "in place",
      "no more newsworthy than"
    ]
  ]
];
export const passage2013P4Sentences: SentenceAnalysis[] = texts.map((text,i)=>{ const [natural,obstacle,logic,starts,keyReasons,phrases]=quick[i]; return createV2Sentence({id:`2013-p4-s${i+1}`,number:i+1,text,natural,logic,phrases,quickReading:{blocks:reviewedBlocks(text,starts),obstacle,keyReasons},...passage2013P4Deep[i+1]}); });
export const passage2013P4Paragraphs=passage2013P4ParagraphNumbers.map((ns,i)=>({id:`2013-p4-para${i+1}`,sentenceIds:ns.map(n=>`2013-p4-s${n}`)}));
export const passage2013P4Guide:ArticleGuide = {
  "mainIdea": "女性进入企业高层仍受制度障碍限制；作者虽对配额有原则保留，但在自愿倡议和软性压力无效的现实下，支持暂时强制与普遍公共政策。",
  "route": [
    "指出高层性别失衡",
    "自愿倡议失败后提出立法",
    "询问配额是否必要",
    "雷丁肯定配额效果",
    "作者权衡后支持",
    "软性压力无效且成功者仍稀少",
    "呼吁普遍制度支持"
  ],
  "paragraphs": [
    {
      "paragraphId": "2013-p4-para1",
      "title": "高层失衡",
      "summary": "女性仅占欧洲公司董事会席位14%，男性仍主导决策。",
      "relation": "提出问题。"
    },
    {
      "paragraphId": "2013-p4-para2",
      "title": "由自愿到强制",
      "summary": "此前40%自愿目标参与极少，于是考虑最高60%的法律比例。",
      "relation": "说明拟议立法源于挫败。"
    },
    {
      "paragraphId": "2013-p4-para3",
      "title": "提出问题",
      "summary": "询问是否需要配额来保障公平晋升与家庭平衡。",
      "relation": "引出争论。"
    },
    {
      "paragraphId": "2013-p4-para4",
      "title": "手段与效果",
      "summary": "雷丁不喜欢配额本身，但认可其促进平等和突破晋升限制的效果。",
      "relation": "呈现被讨论的倡议及理由。"
    },
    {
      "paragraphId": "2013-p4-para5",
      "title": "有保留的支持",
      "summary": "作者信任任人唯贤，但认为现实障碍要求暂时强制。",
      "relation": "给出作者判断，转折后为重点。"
    },
    {
      "paragraphId": "2013-p4-para6",
      "title": "制度障碍",
      "summary": "数十年软性压力仍未促成公平，高层女性成功者仍是例外。",
      "relation": "补充现实依据。"
    },
    {
      "paragraphId": "2013-p4-para7",
      "title": "政策支持",
      "summary": "若所有女性与家庭获得适当政策支持，女性高管便不再格外稀奇。",
      "relation": "回到制度保障的目标。"
    }
  ],
  "references": [
    {
      "sentenceId": "2013-p4-s8",
      "expression": "it",
      "referent": "此前的自愿性别平衡倡议",
      "targetSentenceIds": [
        "2013-p4-s7"
      ],
      "explanation": "took it up为响应该倡议，不是拿起董事会。"
    },
    {
      "sentenceId": "2013-p4-s12",
      "expression": "they",
      "referent": "Quotas",
      "targetSentenceIds": [
        "2013-p4-s12"
      ],
      "explanation": "推动平等的是配额制度；不能把they当女性。"
    },
    {
      "sentenceId": "2013-p4-s16",
      "expression": "them",
      "referent": "欧洲以及美国的公司",
      "targetSentenceIds": [
        "2013-p4-s16"
      ],
      "explanation": "软性压力施加给回避公平招聘和晋升的公司。"
    }
  ],
  "timeline": [],
  "voices": [],
 sentenceRoles:Object.fromEntries(passage2013P4Sentences.map(s=>[s.id,s.logic]))
};
