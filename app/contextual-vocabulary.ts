import { passage2013P3SentenceContexts } from "./2013-passage-3-vocabulary";
import { passage2013P2SentenceContexts } from "./2013-passage-2-vocabulary";
import { passage2013P1SentenceContexts } from "./2013-passage-1-vocabulary";
import { passage2011P3SourceContexts } from "./2011-passage-3-contexts";
import { passage2011P2SourceContexts } from "./2011-passage-2-contexts";
import { passage2011P1SourceContexts } from "./2011-passage-1-contexts";
import { translation2010ReviewedContexts } from "./2010-translation-contexts";
import { translation2000ReviewedContexts } from "./2000-translation-contexts";
import { translation2011TrainingContexts } from "./2011-translation-collocations";
import { translation2012ReviewedContexts } from "./2012-translation-contexts";
import { translation2010PreferredContexts } from "./2010-translation-collocations";
import { passage2010P5ReviewedContexts } from "./2010-passage-5-contexts";
import { passage2010P5PreferredContexts } from "./2010-passage-5-collocations";
import { passage2010P4PreferredContexts } from "./2010-passage-4-collocations";
import { passage2010P4ReviewedContexts } from "./2010-passage-4-contexts";
import { passage2010P3PreferredContexts } from "./2010-passage-3-collocations";
import { passage2010P3ReviewedContexts } from "./2010-passage-3-contexts";
import { cloze2001SourceContexts } from "./2001-cloze-contexts";
import { passage2001P2SourceContexts } from "./2001-passage-2-contexts";
import { passage2001P1SourceContexts } from "./2001-passage-1-contexts";
import { passage5Contexts } from "./passage-5-contexts";
import { passage4Contexts } from "./passage-4-contexts";
import { passage3Contexts } from "./passage-3-contexts";
import { passage2000P2Contexts } from "./2000-passage-2-contexts";
import { passage2000P1Contexts } from "./2000-passage-1-contexts";
import { writing2012BSentenceContexts } from "./2012-writing-b-lexicon";
import { writing2012ASentenceContexts } from "./2012-writing-a-lexicon";
import { translation2012SentenceContexts } from "./2012-translation-lexicon";
import { passage2012P5SentenceContexts } from "./2012-passage-5-lexicon";
import { passage2012P4SentenceContexts } from "./2012-passage-4-lexicon";
import { passage2012P3SentenceContexts } from "./2012-passage-3-lexicon";
import { passage2012P2SentenceContexts } from "./2012-passage-2-lexicon";
import { passage2012P1SentenceContexts } from "./2012-passage-1-lexicon";
import { cloze2012SentenceContexts } from "./2012-cloze-lexicon";
import { writing2011BSentenceContexts } from "./2011-writing-b-lexicon";
import { writing2011ASentenceContexts } from "./2011-writing-a-lexicon";
import { translation2011SentenceContexts } from "./2011-translation-lexicon";
import { passage2011P5SentenceContexts } from "./2011-passage-5-lexicon";
import { passage2011P4SentenceContexts } from "./2011-passage-4-lexicon";
import { passage2011P3SentenceContexts } from "./2011-passage-3-lexicon";
import { passage2011P2SentenceContexts } from "./2011-passage-2-lexicon";
import { passage2011P1SentenceContexts } from "./2011-passage-1-lexicon";
import { cloze2011SentenceContexts } from "./2011-cloze-lexicon";
import { translation2010SentenceContexts } from "./2010-translation-lexicon";
import { passage2010P5SentenceContexts } from "./2010-passage-5-lexicon";
import { passage2010P4SentenceContexts } from "./2010-passage-4-lexicon";
import { passage2010P3SentenceContexts } from "./2010-passage-3-lexicon";
import { passage2010P2SentenceContexts } from "./2010-passage-2-lexicon";
import { passage2010P1QuestionContexts } from "./2010-passage-1-question-contexts";
import { passage2010P2QuestionContexts } from "./2010-passage-2-question-contexts";
import { passage2010P2PreferredCollocations } from "./2010-passage-2-collocations";

export type ArticleLexiconId = "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation" | "2001-cloze" | "2001-p1" | "2001-p2" | "2010-cloze" | "2010-p1" | "2010-p2" | "2010-p3" | "2010-p4" | "2010-p5" | "2010-translation" | "2011-cloze" | "2011-p1" | "2011-p2" | "2011-p3" | "2011-p4" | "2011-p5" | "2011-translation" | "2011-writing-a" | "2011-writing-b" | "2012-cloze" | "2012-p1" | "2012-p2" | "2012-p3" | "2012-p4" | "2012-p5" | "2012-translation" | "2012-writing-a" | "2012-writing-b" | "2013-p1" | "2013-p2" | "2013-p3";

export type ContextualSubstitution = {
  label: string;
  chinese: string;
  fit: "direct" | "with-adjustment";
  rewrittenSentence: string;
  nuance: string;
  adjustment?: string;
  target: `word:${string}` | `phrase:${string}`;
};

export type SentenceWordContext = {
  partOfSpeech?: string;
  // 当前词形在此处的词义/语法作用，不能把修饰语、宾语或整句译文当成词义。
  // 代词可简要注明指代；习语中不能独立释义的小品词应注明作用，整体义留给 use。
  contextualMeaning?: string;
  use?: string;
  preferredCollocations?: string[];
  contextualSubstitutions?: ContextualSubstitution[];
};

/**
 * Sentence-scoped knowledge lives separately from the stable lemma entry.
 * The same headword may therefore keep one global knowledge page while showing
 * a different sense, use and replacement set in every source sentence.
 */
export const sentenceWordContexts: Record<string, Record<string, SentenceWordContext>> = {
  ...passage2013P1SentenceContexts,
  ...passage2013P2SentenceContexts,
  ...passage2013P3SentenceContexts,
  ...passage2010P1QuestionContexts,
  ...passage2010P2QuestionContexts,
  ...writing2011BSentenceContexts,
  ...writing2011ASentenceContexts,
  ...translation2011SentenceContexts,
  ...passage2011P5SentenceContexts,
  ...passage2011P4SentenceContexts,
  ...passage2011P3SentenceContexts,
  ...passage2011P2SentenceContexts,
  ...passage2011P1SentenceContexts,
  ...cloze2012SentenceContexts,
  ...passage2012P1SentenceContexts,
  ...passage2012P2SentenceContexts,
  ...passage2012P3SentenceContexts,
  ...passage2012P4SentenceContexts,
  ...passage2012P5SentenceContexts,
  ...translation2012SentenceContexts,
  ...writing2012ASentenceContexts,
  ...writing2012BSentenceContexts,
  ...cloze2011SentenceContexts,
  ...Object.fromEntries([...new Set([...Object.keys(translation2010SentenceContexts), ...Object.keys(translation2010ReviewedContexts), ...Object.keys(translation2010PreferredContexts)])].map(id => [id,
    Object.fromEntries([...new Set([...Object.keys(translation2010SentenceContexts[id] ?? {}), ...Object.keys(translation2010ReviewedContexts[id] ?? {}), ...Object.keys(translation2010PreferredContexts[id] ?? {})])].map(head => [head, {
      ...translation2010PreferredContexts[id]?.[head], ...translation2010SentenceContexts[id]?.[head], ...translation2010ReviewedContexts[id]?.[head],
    }])),
  ])),
  ...passage2010P2SentenceContexts,
  ...Object.fromEntries([...new Set([...Object.keys(passage2010P3SentenceContexts), ...Object.keys(passage2010P3ReviewedContexts), ...Object.keys(passage2010P3PreferredContexts)])].map(id => [id,
    Object.fromEntries([...new Set([...Object.keys(passage2010P3SentenceContexts[id] ?? {}), ...Object.keys(passage2010P3ReviewedContexts[id] ?? {}), ...Object.keys(passage2010P3PreferredContexts[id] ?? {})])].map(head => [head, {
      ...passage2010P3PreferredContexts[id]?.[head], ...passage2010P3SentenceContexts[id]?.[head], ...passage2010P3ReviewedContexts[id]?.[head],
    }])),
  ])),
  ...Object.fromEntries([...new Set([...Object.keys(passage2010P4SentenceContexts), ...Object.keys(passage2010P4ReviewedContexts), ...Object.keys(passage2010P4PreferredContexts)])].map(id => [id,
    Object.fromEntries([...new Set([...Object.keys(passage2010P4SentenceContexts[id] ?? {}), ...Object.keys(passage2010P4ReviewedContexts[id] ?? {}), ...Object.keys(passage2010P4PreferredContexts[id] ?? {})])].map(head => [head, {
      ...passage2010P4PreferredContexts[id]?.[head], ...passage2010P4SentenceContexts[id]?.[head], ...passage2010P4ReviewedContexts[id]?.[head],
    }])),
  ])),
  ...Object.fromEntries([...new Set([...Object.keys(passage2010P5SentenceContexts), ...Object.keys(passage2010P5ReviewedContexts), ...Object.keys(passage2010P5PreferredContexts)])].map(id => [id,
    Object.fromEntries([...new Set([...Object.keys(passage2010P5SentenceContexts[id] ?? {}), ...Object.keys(passage2010P5ReviewedContexts[id] ?? {}), ...Object.keys(passage2010P5PreferredContexts[id] ?? {})])].map(head => [head, {
      ...passage2010P5PreferredContexts[id]?.[head], ...passage2010P5SentenceContexts[id]?.[head], ...passage2010P5ReviewedContexts[id]?.[head],
    }])),
  ])),
  "p3-s10": { note: { partOfSpeech: "n.", contextualMeaning: "注释；说明性注释", use: "in the explanatory notes 中 notes 是 note 的复数，指解释译文的说明性注释；不是音符，也不是动词‘注意’。" } },
  "p5-s5": { note: { partOfSpeech: "n.", contextualMeaning: "意味；色彩", use: "a heavy note of hypocrisy 中 note 表态度或表达的意味，heavy 强调程度，of hypocrisy 说明这种意味是虚伪；不是笔记或注释。" } },
  "p2-s5": { mean: { contextualMeaning: "意味着", use: "This means that... 中 means 为第三人称单数，that从句解释男女数量差异会导致择偶年龄段的男性过剩。" } },
  "p2-s19": { mean: { contextualMeaning: "意味着；表明", use: "主语 The grand mediocrity of today 对应单数谓语 means，that从句说明自然选择作用减弱；不是名词‘手段’。" } },
  "p2-s20": { mean: { contextualMeaning: "意味着", use: "this means that... 引出作者对进化状态的结论，that内容从句充当宾语，不是mean doing结构。" } },
  "translation-s35": { means: { contextualMeaning: "手段；工具", use: "by modern means of transport 中 means 为名词，of transport说明运输用途；means单复数同形，不计入动词mean。" } },
  "cloze-s1": {
    wish: {
      contextualSubstitutions: [
        {
          label: "hope",
          chinese: "希望（某个仍可能实现的结果）",
          fit: "direct",
          rewrittenSentence: "If a farmer hopes to succeed, he must try to keep a wide gap between his consumption and his production.",
          nuance: "hope 更突出对未来成功的期待；原文 wish to do 更正式，也更接近“想要做”。",
          target: "word:hope",
        },
      ],
    },
    succeed: {
      contextualSubstitutions: [
        {
          label: "prosper",
          chinese: "兴旺；获得经营上的成功",
          fit: "direct",
          rewrittenSentence: "If a farmer wishes to prosper, he must try to keep a wide gap between his consumption and his production.",
          nuance: "prosper 特别适合农业或商业经营兴旺；succeed 的适用范围更广。",
          target: "word:prosper",
        },
      ],
    },
    keep: {
      contextualSubstitutions: [
        {
          label: "maintain",
          chinese: "维持（某种水平或状态）",
          fit: "direct",
          rewrittenSentence: "If a farmer wishes to succeed, he must try to maintain a wide gap between his consumption and his production.",
          nuance: "maintain 比 keep 更正式，并准确保留“持续维持差额”的意思。",
          target: "word:maintain",
        },
      ],
    },
    wide: {
      contextualSubstitutions: [
        {
          label: "large",
          chinese: "大的（差距、差额）",
          fit: "direct",
          rewrittenSentence: "If a farmer wishes to succeed, he must try to keep a large gap between his consumption and his production.",
          nuance: "large gap 与 wide gap 都可表示差距大；wide 更强调两端相隔较远。",
          target: "word:large",
        },
      ],
    },
  },
  "p1-s1": {
    dreadful: {
      contextualSubstitutions: [
        {
          label: "serious",
          chinese: "严重的",
          fit: "direct",
          rewrittenSentence: "A history of long and effortless success can be a serious handicap, but, if properly handled, it may become a driving force.",
          nuance: "serious 强调后果严重；dreadful 还带有强烈的负面评价和令人担忧的语气。",
          target: "word:serious",
        },
      ],
    },
    handicap: {
      contextualSubstitutions: [
        {
          label: "disadvantage",
          chinese: "不利条件；劣势",
          fit: "with-adjustment",
          rewrittenSentence: "A history of long and effortless success can be a serious disadvantage, but, if properly handled, it may become a driving force.",
          nuance: "disadvantage 是一般劣势；handicap 更突出妨碍后续发展的障碍作用。",
          adjustment: "替换 handicap 时宜同时把 dreadful 调整为 serious，使搭配更自然。",
          target: "word:disadvantage",
        },
      ],
    },
  },
  "p2-s16": {
    diminish: {
      contextualSubstitutions: [
        {
          label: "decrease",
          chinese: "减少；降低",
          fit: "direct",
          rewrittenSentence: "Again, differences between people and the opportunity for natural selection to take advantage of it have decreased.",
          nuance: "decrease 是中性数量变化；diminish 还强调作用、机会或重要性逐渐减弱。",
          target: "word:decrease",
        },
      ],
    },
  },
  "p3-s1": {
    advisable: {
      contextualSubstitutions: [
        {
          label: "wise",
          chinese: "明智的",
          fit: "direct",
          rewrittenSentence: "When a new movement in art attains a certain fashion, it is wise to find out what its advocates are aiming at, for, however farfetched and unreasonable their principles may seem today, it is possible that in years to come they may be regarded as normal.",
          nuance: "wise 强调判断明智；advisable 更客观地表示某种做法值得采取。",
          target: "word:wise",
        },
      ],
    },
    regard: {
      contextualMeaning: "把……视为；认为",
      use: "本句使用 may be regarded as normal，即“可能被视为正常”；regard A as B 的被动式保留 as 补足语。",
      contextualSubstitutions: [
        {
          label: "consider",
          chinese: "认为；把……看作",
          fit: "with-adjustment",
          rewrittenSentence: "When a new movement in art attains a certain fashion, it is advisable to find out what its advocates are aiming at, for, however farfetched and unreasonable their principles may seem today, it is possible that in years to come they may be considered normal.",
          nuance: "consider A + 补语时通常不用 as；因此替换后需删去原句的 as。",
          adjustment: "把 be regarded as normal 改为 be considered normal，不能保留 as。",
          target: "word:consider",
        },
      ],
    },
  },
  "p3-s5": {
    require: {
      contextualMeaning: "要求；使……成为必要",
      use: "生活节奏的加快是无生命主语，requires 表示这种变化客观上要求一种新的表达形式。",
      contextualSubstitutions: [
        {
          label: "call for",
          chinese: "需要；要求",
          fit: "with-adjustment",
          rewrittenSentence: "This speeding up of life, says the Futurist, calls for a new form of expression.",
          nuance: "call for 在这里与 require 同义，但谓语要随单数主语改成 calls for。",
          adjustment: "require 是单个及物动词；call for 是短语动词，不能漏掉 for。",
          target: "word:call",
        },
      ],
    },
  },
  "p4-s1": {
    typical: {
      contextualSubstitutions: [
        {
          label: "characteristic",
          chinese: "典型的；具有特征的",
          fit: "direct",
          rewrittenSentence: "Aimlessness has hardly been characteristic of the postwar Japan whose productivity and social harmony are the envy of the United States and Europe.",
          nuance: "characteristic of 更突出某种稳定特征；typical of 更强调具有代表性。",
          target: "word:characteristic",
        },
      ],
    },
  },
  "p5-s1": {
    regard: {
      contextualMeaning: "看待；评价",
      use: "be well regarded 在本句讨论 ambition 能否获得社会认可，重点是评价正面，不是“认为……是某物”的 regard A as B。",
      contextualSubstitutions: [
        {
          label: "respect",
          chinese: "尊重；认可",
          fit: "with-adjustment",
          rewrittenSentence: "If ambition is to be respected, the rewards of ambition—wealth, distinction, control over one's destiny—must be deemed worthy of the sacrifices made on ambition's behalf.",
          nuance: "respect 比 regard 的正面程度更明确；替换后不再需要 well。",
          adjustment: "把 be well regarded 整体改为 be respected，而不是只替换 regarded。",
          target: "word:respect",
        },
      ],
    },
  },
  "p5-s2": {
    regard: {
      contextualMeaning: "重视；推崇",
      use: "must be highly regarded by 表示抱负传统必须受到受人敬仰者的高度重视，highly 说明评价程度。",
      contextualSubstitutions: [
        {
          label: "value",
          chinese: "重视；珍视",
          fit: "direct",
          rewrittenSentence: "If the tradition of ambition is to have vitality, it must be widely shared; and it especially must be highly valued by people who are themselves admired, the educated not least among them.",
          nuance: "value 强调认定其价值；regard 更宽泛地表示给予某种评价。",
          target: "word:value",
        },
      ],
    },
  },
  "translation-s31": {
    require: {
      contextualMeaning: "需要",
      use: "requires 后并列两个宾语：varying measures of centralized control 与 the help of specialized scientists。",
      contextualSubstitutions: [
        {
          label: "need",
          chinese: "需要",
          fit: "direct",
          rewrittenSentence: "Under modern conditions, this needs varying measures of centralized control and hence the help of specialized scientists such as economists and operational research experts.",
          nuance: "need 更常用直接；require 更正式，并突出客观条件所提出的必要性。",
          target: "word:need",
        },
      ],
    },
  },
  "2001-cloze-s1": {
    ban: {
      contextualMeaning: "禁止",
      use: "is to ban payments 中 ban 直接接名词宾语 payments，表示政府将通过规则禁止这种付款。",
      contextualSubstitutions: [{
        label: "prohibit",
        chinese: "正式禁止",
        fit: "direct",
        rewrittenSentence: "The government is to prohibit payments to witnesses by newspapers seeking to buy up people involved in prominent cases such as the trial of Rosemary West.",
        nuance: "prohibit 比 ban 更正式、更常见于法规文本；ban 更简洁，并强调形成禁令。",
        target: "word:prohibit",
      }],
    },
    prominent: {
      contextualMeaning: "引人注目的；显著的",
      use: "prominent cases 修饰受到媒体和公众高度关注的重大案件，不是‘位置突出的案件’。",
      contextualSubstitutions: [{
        label: "high-profile",
        chinese: "高关注度的；备受瞩目的",
        fit: "direct",
        rewrittenSentence: "The government is to ban payments to witnesses by newspapers seeking to buy up people involved in high-profile cases such as the trial of Rosemary West.",
        nuance: "high-profile 更直接突出媒体曝光度；prominent 还可强调重要性和显著地位。",
        target: "word:high-profile",
      }],
    },
  },
  "2001-cloze-s2": {
    significant: {
      contextualMeaning: "显著的；重要的",
      use: "significant 修饰 tightening，既表示收紧幅度可观，也表示这一变化具有制度重要性。",
      contextualSubstitutions: [{
        label: "substantial",
        chinese: "实质性的；大幅的",
        fit: "direct",
        rewrittenSentence: "In a substantial tightening of legal controls over the press, Lord Irvine, the Lord Chancellor, will introduce a draft bill that will propose making payments to witnesses illegal and will strictly control the amount of publicity that can be given to a case before a trial begins.",
        nuance: "substantial 更突出幅度大、内容实在；significant 还强调值得注意或意义重大。",
        target: "word:substantial",
      }],
    },
    control: {
      contextualMeaning: "控制；限制",
      use: "will strictly control 后直接接 the amount of publicity，表示用规则限制庭前曝光。",
      contextualSubstitutions: [{
        label: "limit",
        chinese: "限制",
        fit: "direct",
        rewrittenSentence: "In a significant tightening of legal controls over the press, Lord Irvine, the Lord Chancellor, will introduce a draft bill that will propose making payments to witnesses illegal and will strictly limit the amount of publicity that can be given to a case before a trial begins.",
        nuance: "limit 直接强调设定上限；control 范围更广，还包括管理和调节。",
        target: "word:limit",
      }],
    },
  },
  "2001-cloze-s3": {
    offer: {
      contextualMeaning: "提供；给予",
      use: "self regulation did not offer sufficient control 中 offer 的主语是制度，宾语是制度能提供的监管作用。",
      contextualSubstitutions: [{
        label: "provide",
        chinese: "提供",
        fit: "direct",
        rewrittenSentence: "In a letter to Gerald Kaufman, chairman of the House of Commons media select committee, Lord Irvine said he agreed with a committee report this year which said that self regulation did not provide sufficient control.",
        nuance: "provide 更中性直接；offer 常带‘可供使用’或‘能够给予’的意味。",
        target: "word:provide",
      }],
    },
  },
  "2001-cloze-s4": {
    publication: {
      contextualMeaning: "公开发表；公布",
      use: "Publication of the letter 是主句主语，重点不是印刷，而是公众能够看到信件内容。",
      contextualSubstitutions: [{
        label: "release",
        chinese: "发布；公开放出",
        fit: "direct",
        rewrittenSentence: "Release of the letter came two days after Lord Irvine caused a storm of media protest when he said the interpretation of privacy controls contained in European legislation would be left to judges rather than to Parliament.",
        nuance: "release 也能表达发布，但更强调信息从保密或控制状态被放出；publication 更突出正式公之于众。",
        target: "word:release",
      }],
    },
    interpretation: {
      contextualMeaning: "解释；诠释",
      use: "interpretation of privacy controls 是长宾语从句的主语，指法官对法律条文进行释义。",
      contextualSubstitutions: [{
        label: "construction",
        chinese: "对法律文本的解释",
        fit: "direct",
        rewrittenSentence: "Publication of the letter came two days after Lord Irvine caused a storm of media protest when he said the construction of privacy controls contained in European legislation would be left to judges rather than to Parliament.",
        nuance: "construction 是法律英语中的专业释法义；普通学习场景中 interpretation 更清楚、更通用。",
        target: "word:construction",
      }],
    },
  },
  "2001-cloze-s5": {
    binding: {
      contextualMeaning: "有约束力的",
      use: "make A legally binding 中 binding 是形容词宾补，说明《欧洲人权公约》在英国获得法律效力。",
      contextualSubstitutions: [{
        label: "enforceable",
        chinese: "可依法执行的",
        fit: "direct",
        rewrittenSentence: "The Lord Chancellor said introduction of the Human Rights Bill, which makes the European Convention on Human Rights legally enforceable in Britain, laid down that everybody was entitled to privacy and that public figures could go to court to protect themselves and their families.",
        nuance: "enforceable 强调能够通过法院强制执行；binding 强调当事人负有遵守义务。",
        target: "word:enforceable",
      }],
    },
  },
  "2001-cloze-s7": {
    issue: {
      contextualMeaning: "问题；争议事项",
      use: "became an issue 是系表结构，说明证人收款从一种做法演变成司法与媒体争议。",
      contextualSubstitutions: [{
        label: "controversy",
        chinese: "争议",
        fit: "with-adjustment",
        rewrittenSentence: "Witness payments became a controversy after West was sentenced to 10 life sentences in 1995.",
        nuance: "controversy 直接强调意见冲突；issue 可中性地指需要处理的问题。替换后冠词从 an 改为 a。",
        adjustment: "issue 前用 an；controversy 前必须改用 a。",
        target: "word:controversy",
      }],
    },
  },
  "2001-cloze-s9": {
    concern: {
      contextualMeaning: "担忧；顾虑",
      use: "Concerns were raised 是被动报道表达，that 同位语从句给出担忧的完整内容。",
      contextualSubstitutions: [{
        label: "fear",
        chinese: "担忧；恐怕发生某事",
        fit: "with-adjustment",
        rewrittenSentence: "Fears were expressed that witnesses might be encouraged exaggerate their stories in court to ensure guilty verdicts.",
        nuance: "fear 情绪强度更高；concern 更正式、中性，适合政策讨论。",
        adjustment: "把 Concerns were raised 整体改为 Fears were expressed，不能只替换单个名词后保留所有搭配。",
        target: "word:fear",
      }],
    },
  },
  "2001-p1-s1": {
    accumulation: {
      contextualMeaning: "积累；累积",
      use: "accumulation of scientific knowledge 是 problem 的内容，increasing 表示这种积累持续扩大。",
      contextualSubstitutions: [{
        label: "expansion",
        chinese: "扩展；增长",
        fit: "with-adjustment",
        rewrittenSentence: "Specialisation can be seen as a response to the continuing expansion of scientific knowledge.",
        nuance: "expansion 强调知识范围和总量扩张；accumulation 更强调知识一点点累积起来。",
        adjustment: "把 the problem of an increasing accumulation 整体压缩为 the continuing expansion，避免出现生硬的 expansion accumulation。",
        target: "word:expansion",
      }],
    },
  },
  "2001-p1-s2": {
    split: {
      contextualMeaning: "分割；拆分",
      use: "split up A into B 中 A 是 subject matter，B 是 smaller units；By doing 整体作方式状语。",
      contextualSubstitutions: [{
        label: "separate",
        chinese: "把……分成若干部分",
        fit: "direct",
        rewrittenSentence: "By separating the subject matter into smaller units, one man could continue to handle the information and use it as the basis for further research.",
        nuance: "separate 强调把整体分开；split up 更突出拆成便于处理的小块。",
        target: "word:separate",
      }],
    },
  },
  "2001-p1-s3": {
    development: {
      contextualMeaning: "发展；新变化",
      use: "developments 是复数，专业化只是其中之一；affecting... 后置修饰这些变化。",
      contextualSubstitutions: [{
        label: "changes",
        chinese: "变化",
        fit: "direct",
        rewrittenSentence: "But specialisation was only one of a series of related changes in science affecting the process of communication.",
        nuance: "changes 是一般变化；developments 更强调这些变化构成逐步发展的历史进程。",
        target: "word:change",
      }],
    },
  },
  "2001-p1-s4": {
    grow: {
      contextualMeaning: "日益增长的",
      use: "growing 作前置定语修饰 professionalisation，不是句子的谓语。",
      contextualSubstitutions: [{
        label: "increasing",
        chinese: "日益增强的",
        fit: "direct",
        rewrittenSentence: "Another was the increasing professionalisation of scientific activity.",
        nuance: "increasing 直接强调程度上升；growing 更自然地表现一种逐步发展的历史趋势。",
        target: "word:increase",
      }],
    },
  },
  "2001-p1-s5": {
    distinction: {
      contextualMeaning: "区别；区分",
      use: "draw a distinction between A and B 是固定搭配，本句使用被动 can be drawn。",
      contextualSubstitutions: [{
        label: "separation",
        chinese: "分界；区隔",
        fit: "with-adjustment",
        rewrittenSentence: "No clear-cut separation can be made between professionals and amateurs in science: exceptions can be found to any rule.",
        nuance: "separation 更像两个群体被分开；distinction 更强调概念和标准上的区别。",
        adjustment: "搭配需由 draw a distinction 改为 make a separation，不能只替换名词后保留 draw。",
        target: "word:separate",
      }],
    },
  },
  "2001-p1-s6": {
    connotation: {
      contextualMeaning: "隐含义；联想色彩",
      use: "that 同位语从句解释 connotation 的全部内容；does carry 用来强调这种含义确实存在。",
      contextualSubstitutions: [{
        label: "implication",
        chinese: "暗含的意思",
        fit: "direct",
        rewrittenSentence: "Nevertheless, the word “amateur” does carry an implication that the person concerned is not fully integrated into the scientific community and, in particular, may not fully share its values.",
        nuance: "implication 可表示话语暗示或潜在后果；connotation 更专门指一个词附带的联想色彩。",
        target: "word:implication",
      }],
    },
  },
  "2001-p1-s7": {
    imply: {
      contextualMeaning: "意味着；暗含",
      use: "implied 的主语是专业化增长，宾语是 greater problems，不是某个人含蓄表达观点。",
      contextualSubstitutions: [{
        label: "meant",
        chinese: "意味着",
        fit: "direct",
        rewrittenSentence: "The growth of specialisation in the nineteenth century, with its consequent requirement of a longer, more complex training, meant greater problems for amateur participation in science.",
        nuance: "mean 是最直接的‘意味着’；imply 更正式，强调前一变化逻辑上包含后一结果。",
        target: "word:mean",
      }],
    },
  },
  "2001-p1-s8": {
    obvious: {
      contextualMeaning: "明显的；显而易见的",
      use: "most obvious 是形容词最高级表语；in those areas 引出表现范围。",
      contextualSubstitutions: [{
        label: "clearest",
        chinese: "最清楚的；最明显的",
        fit: "with-adjustment",
        rewrittenSentence: "The trend was naturally clearest in those areas of science based especially on a mathematical or laboratory training, and can be illustrated in terms of the development of geology in the United Kingdom.",
        nuance: "clearest 强调最容易辨认；most obvious 语气更强，表示现象非常显眼。",
        adjustment: "obvious 用 more/most 构成比较等级；clear 改用屈折最高级 clearest。",
        target: "word:clear",
      }],
    },
  },
  "2001-p1-s9": {
    reveal: {
      contextualMeaning: "揭示；显示",
      use: "reveals 的主语中心词 comparison 是单数，后接 not simply A but also B 两个宾语。",
      contextualSubstitutions: [{
        label: "shows",
        chinese: "显示；表明",
        fit: "direct",
        rewrittenSentence: "A comparison of British geological publications over the last century and a half shows not simply an increasing emphasis on the primacy of research, but also a changing definition of what constitutes an acceptable research paper.",
        nuance: "show 更普通直接；reveal 强调通过分析把原先不明显的变化揭示出来。",
        target: "word:show",
      }],
    },
  },
  "2001-p1-s10": {
    acceptable: {
      contextualMeaning: "可接受的",
      use: "become acceptable to professionals 后接 only if 必要条件，说明认可不是无条件的。",
      contextualSubstitutions: [{
        label: "accepted",
        chinese: "被专业人士接受",
        fit: "with-adjustment",
        rewrittenSentence: "Thus, in the nineteenth century, local geological studies represented worthwhile research in their own right; but, in the twentieth century, local studies have increasingly been accepted by professionals only if they incorporate, and reflect on, the wider geological picture.",
        nuance: "be accepted by 强调实际被接纳；become acceptable to 强调逐渐达到可接受的资格标准。",
        adjustment: "把系表结构 have become acceptable to 改为被动结构 have been accepted by。",
        target: "word:accept",
      }],
    },
  },
  "2001-p1-s11": {
    pursue: {
      contextualMeaning: "从事；开展",
      use: "pursue 直接接 local studies；与 in the old way 共同说明业余者仍沿用旧研究模式。",
      contextualSubstitutions: [{
        label: "study",
        chinese: "研究",
        fit: "with-adjustment",
        rewrittenSentence: "Amateurs, on the other hand, have continued to study local geology in the old way.",
        nuance: "study local geology 直接描述研究对象；pursue local studies 更正式，突出长期从事一类研究项目。",
        adjustment: "pursue 的宾语 local studies 改写为 study 的宾语 local geology，避免不自然的 study studies。",
        target: "word:study",
      }],
    },
  },
  "2001-p1-s12": {
    reinforce: {
      contextualMeaning: "加强；强化",
      use: "has been reinforced 是现在完成时被动，by 引出同行评审制度这一强化因素。",
      contextualSubstitutions: [{
        label: "strengthened",
        chinese: "加强；强化",
        fit: "direct",
        rewrittenSentence: "The overall result has been to make entrance to professional geological journals harder for amateurs, a result that has been strengthened by the widespread introduction of refereeing, first by national journals in the nineteenth century and then by several local geological journals in the twentieth century.",
        nuance: "strengthen 是一般‘加强’；reinforce 更像在已有结果或结构上再加一层力量。",
        target: "word:strengthen",
      }],
    },
  },
  "2001-p1-s13": {
    appear: {
      contextualMeaning: "出现",
      use: "have appeared 是不及物现在完成时，不使用被动；aimed... 后置修饰 journals。",
      contextualSubstitutions: [{
        label: "emerged",
        chinese: "逐渐出现；形成",
        fit: "direct",
        rewrittenSentence: "As a logical consequence of this development, separate journals have now emerged aimed mainly towards either professional or amateur readership.",
        nuance: "emerge 更突出在分化过程中逐渐形成；appear 只陈述已经出现这一事实。",
        target: "word:emerge",
      }],
    },
  },
  "2001-p1-s14": {
    differentiation: {
      contextualMeaning: "分化；差异化",
      use: "process of differentiation 是长主语，has led to 引出专业地质学家联合的结果。",
      contextualSubstitutions: [{
        label: "separation",
        chinese: "分离；分流",
        fit: "direct",
        rewrittenSentence: "A rather similar process of separation has led to professional geologists coming together nationally within one or two specific societies, whereas the amateurs have tended either to remain in local societies or to come together nationally in a different way.",
        nuance: "separation 强调群体被分开；differentiation 更强调群体逐渐形成不同特征、规范和组织方式。",
        target: "word:separate",
      }],
    },
  },
  "2001-p1-s15": {
    consequence: {
      contextualMeaning: "后果；影响",
      use: "its full consequences 是主句主语，its 回指前面的 process；were delayed 表后果较晚完全显现。",
      contextualSubstitutions: [{
        label: "effects",
        chinese: "影响；效果",
        fit: "direct",
        rewrittenSentence: "Although the process of professionalisation and specialisation was already well under way in British geology during the nineteenth century, its full effects were thus delayed until the twentieth century.",
        nuance: "effects 中性表示产生的影响；consequences 更突出从前述过程推导出的后果，因果色彩更强。",
        target: "word:effect",
      }],
    },
  },
  "2001-p1-s16": {
    crucial: {
      contextualMeaning: "至关重要的",
      use: "the crucial period 是 reckon...as 后的主语补足语，评价十九世纪的历史地位。",
      contextualSubstitutions: [{
        label: "decisive",
        chinese: "决定性的",
        fit: "direct",
        rewrittenSentence: "In science generally, however, the nineteenth century must be reckoned as the decisive period for this change in the structure of science.",
        nuance: "decisive 更强调决定最终走向；crucial 强调这一时期极其关键，但未必单独决定全部结果。",
        target: "word:decisive",
      }],
    },
  },
  "2001-p2-s1": {
    attention: {
      contextualMeaning: "关注；注意",
      use: "A great deal of attention 是进行时被动 is being paid 的主语；pay attention to 的对象是 digital divide。",
      contextualSubstitutions: [{
        label: "focus",
        chinese: "关注；注意力焦点",
        fit: "with-adjustment",
        rewrittenSentence: "Today, a great deal of focus is being directed to the so-called digital divide—the division of the world into the info (information) rich and the info poor.",
        nuance: "focus 更强调注意力集中到一个焦点；attention 是更普通的关注。",
        adjustment: "把 attention is being paid to 改为 focus is being directed to，并把 today 移到句首使表达自然。",
        target: "word:focus",
      }],
    },
  },
  "2001-p2-s2": {
    exist: {
      contextualMeaning: "存在",
      use: "does exist 是肯定句的强调谓语，does 后使用 exist 原形。",
      contextualSubstitutions: [{
        label: "remain",
        chinese: "仍然存在",
        fit: "direct",
        rewrittenSentence: "And that divide remains today.",
        nuance: "remain 额外强调从过去延续到现在；does exist 强调当前确实存在。",
        target: "word:remain",
      }],
    },
  },
  "2001-p2-s3": {
    lecture: {
      contextualMeaning: "演讲；讲授",
      use: "lectured about 后接演讲主题，twenty years ago 要求一般过去时。",
      contextualSubstitutions: [{
        label: "spoke",
        chinese: "谈论；发表讲话",
        fit: "with-adjustment",
        rewrittenSentence: "My wife and I spoke about this looming danger twenty years ago.",
        nuance: "spoke about 只表示谈到；lectured about 更明确地表示以演讲或授课形式系统阐述。",
        adjustment: "speak 使用不规则过去式 spoke；其余结构不变。",
        target: "word:speak",
      }],
    },
  },
  "2001-p2-s4": {
    visible: {
      contextualMeaning: "可见的；明显的",
      use: "less visible 是 What 主语从句中的表语，then 是时间状语。",
      contextualSubstitutions: [{
        label: "apparent",
        chinese: "明显的；显而易见的",
        fit: "direct",
        rewrittenSentence: "What was less apparent then, however, were the new, positive forces that work against the digital divide.",
        nuance: "apparent 更强调在认识和判断上明显；visible 可由物理可见引申为容易察觉。",
        target: "word:apparent",
      }],
    },
  },
  "2001-p2-s5": {
    optimistic: {
      contextualMeaning: "乐观的",
      use: "to be optimistic 后置修饰 reasons，表示‘保持乐观的理由’。",
      contextualSubstitutions: [{
        label: "hopeful",
        chinese: "抱有希望的",
        fit: "direct",
        rewrittenSentence: "There are reasons to be hopeful.",
        nuance: "hopeful 强调内心抱有希望；optimistic 更强调对未来结果作出积极判断。",
        target: "word:hopeful",
      }],
    },
  },
  "2001-p2-s6": {
    narrow: {
      contextualMeaning: "缩小；变窄",
      use: "will narrow 是不及物用法，主语 the digital divide 自身发生变化。",
      contextualSubstitutions: [{
        label: "shrink",
        chinese: "缩小；收缩",
        fit: "direct",
        rewrittenSentence: "There are technological reasons to hope the digital divide will shrink.",
        nuance: "shrink 更形象地表现总体尺寸收缩；narrow 更准确强调鸿沟两端的距离变小。",
        target: "word:shrink",
      }],
    },
  },
  "2001-p2-s7": {
    interest: {
      contextualMeaning: "利益",
      use: "in the interest of business 是介词表语，表示普及网络接入符合商业利益；不是‘兴趣’或‘利息’。",
      contextualSubstitutions: [{
        label: "benefit",
        chinese: "使商业界受益",
        fit: "with-adjustment",
        rewrittenSentence: "As the Internet becomes more and more commercialized, it benefits business to universalize access—after all, the more people online, the more potential customers there are.",
        nuance: "benefit 直接说某行动使企业受益；in the interest of 更正式，强调行动与商业利益一致。",
        adjustment: "把系表结构 is in the interest of business 改为及物结构 benefits business。",
        target: "word:benefit",
      }],
    },
  },
  "2001-p2-s8": {
    spread: {
      contextualMeaning: "传播；推广",
      use: "spread 作及物动词，Internet access 是宾语；want to spread 表政府希望扩大覆盖。",
      contextualSubstitutions: [{
        label: "expand",
        chinese: "扩大；扩展覆盖",
        fit: "direct",
        rewrittenSentence: "More and more governments, afraid their countries will be left behind, want to expand Internet access.",
        nuance: "expand 更强调接入规模和覆盖范围增大；spread 更强调向外传播、普及的过程。",
        target: "word:expand",
      }],
    },
  },
  "2001-p2-s9": {
    net: {
      contextualMeaning: "联网连接",
      use: "原卷will he netted中he疑似be误排；按规范将来被动will be netted理解人被联网连接。",
      contextualSubstitutions: [{
        label: "connected",
        chinese: "连接起来",
        fit: "with-adjustment",
        rewrittenSentence: "Within the next decade or two, one to two billion people on the planet will be connected together.",
        adjustment: "先将原卷疑似误排的he校读为be，再将netted换为connected；改写句展示规范英语，原文仍保留he。",
        nuance: "connected 是普通‘连接’；netted 更形象地突出人们被同一网络覆盖。",
        target: "word:connect",
      }],
    },
  },
  "2001-p2-s10": {
    narrow: {
      contextualMeaning: "缩小；变窄",
      use: "narrow 与 widen 由 rather than 并列，共用 will。",
      contextualSubstitutions: [{
        label: "shrink",
        chinese: "缩小；收缩",
        fit: "direct",
        rewrittenSentence: "As a result, I now believe the digital divide will shrink rather than widen in the years ahead.",
        nuance: "shrink 更形象；narrow 与 widen 构成更工整、准确的反义对照。",
        target: "word:shrink",
      }],
    },
  },
  "2001-p2-s11": {
    powerful: {
      contextualMeaning: "强有力的",
      use: "the most powerful 是最高级，修饰 tool；for combating... 说明工具用途。",
      contextualSubstitutions: [{
        label: "effective",
        chinese: "有效的；能产生预期效果的",
        fit: "direct",
        rewrittenSentence: "And that is very good news because the Internet may well be the most effective tool for combating world poverty that we’ve ever had.",
        nuance: "effective 侧重实际效果；powerful 侧重工具可能产生的巨大力量和影响。",
        target: "word:effective",
      }],
    },
  },
  "2001-p2-s12": {
    defeat: {
      contextualMeaning: "战胜；克服",
      use: "to defeat poverty 后置修饰 way，说明这种办法的目标。",
      contextualSubstitutions: [{
        label: "combat",
        chinese: "抗击；与……斗争",
        fit: "direct",
        rewrittenSentence: "Of course, the use of the Internet isn’t the only way to combat poverty.",
        nuance: "combat 强调持续抗击过程；defeat 更强调最终战胜这一结果。",
        target: "word:combat",
      }],
    },
  },
  "2001-p2-s13": {
    tool: {
      contextualMeaning: "工具；手段",
      use: "the only tool we have 中 we have 是省略关系代词的定语从句。",
      contextualSubstitutions: [{
        label: "means",
        chinese: "手段；方法",
        fit: "direct",
        rewrittenSentence: "And the Internet is not the only means we have.",
        nuance: "means 完全抽象地表示解决手段；tool 保留了工具隐喻，语气更形象。",
        target: "word:means",
      }],
    },
  },
  "2001-p2-s14": {
    enormous: {
      contextualMeaning: "巨大的",
      use: "enormous 修饰不可数名词 potential，强调互联网尚待释放的巨大潜力。",
      contextualSubstitutions: [{
        label: "tremendous",
        chinese: "巨大的；惊人的",
        fit: "direct",
        rewrittenSentence: "But it has tremendous potential.",
        nuance: "tremendous 带更强的赞叹感；enormous 更中性地强调规模巨大。",
        target: "word:tremendous",
      }],
    },
  },
  "2001-p2-s15": {
    impoverished: {
      contextualMeaning: "贫困的；贫穷的",
      use: "作形容词前置修饰 countries，比普通 poor 更正式，并带有陷入贫困状态的意味。",
      contextualSubstitutions: [{
        label: "poor",
        chinese: "贫困的",
        fit: "direct",
        rewrittenSentence: "To take advantage of this tool, some poor countries will have to get over their outdated anti-colonial prejudices with respect to foreign investment.",
        nuance: "poor 是最普通的贫困描述；impoverished 更正式，常暗示资源被削弱或长期匮乏。",
        target: "word:poor",
      }],
    },
  },
  "2001-p2-s16": {
    study: {
      contextualMeaning: "研究；考察",
      use: "might well study 是委婉建议；study 直接接 the history of infrastructure 作宾语。",
      contextualSubstitutions: [{
        label: "examine",
        chinese: "仔细考察；研究",
        fit: "direct",
        rewrittenSentence: "Countries that still think foreign investment is an invasion of their sovereignty might well examine the history of infrastructure (the basic structural foundations of a society) in the United States.",
        nuance: "examine 更强调仔细分析证据；study 既可表示系统研究，也可表示学习。",
        target: "word:examine",
      }],
    },
  },
  "2001-p2-s17": {
    capital: {
      contextualMeaning: "资本；资金",
      use: "the capital to do so 中不定式说明资本用途；do so 回指 build its industrial infrastructure。",
      contextualSubstitutions: [{
        label: "funds",
        chinese: "资金",
        fit: "with-adjustment",
        rewrittenSentence: "When the United States built its industrial infrastructure, it didn’t have the funds to do so.",
        nuance: "funds 强调可直接使用的款项；capital 更强调能够投入建设并带来长期产出的资本。",
        adjustment: "capital 通常不可数；fund 在资金义下常用复数 funds。",
        target: "word:fund",
      }],
    },
  },
  "2001-p2-s18": {
    include: {
      contextualMeaning: "包括",
      use: "including 引出道路、港湾、高速公路和港口等非穷尽列举，插入成分两侧用破折号隔开。",
      contextualSubstitutions: [{
        label: "comprising",
        chinese: "包括；由……构成",
        fit: "direct",
        rewrittenSentence: "And that is why America’s Second Wave infrastructure—comprising roads, harbors, highways, ports and so on—were built with foreign investment.",
        nuance: "comprising 更正式，强调所包含的构成项目；including 更普通地引出若干例子。",
        target: "word:comprise",
      }],
    },
  },
  "2001-p2-s19": {
    invest: {
      contextualMeaning: "投资",
      use: "were investing in 是过去进行时；invest 后必须用 in 引出地区或项目。",
      contextualSubstitutions: [{
        label: "financing",
        chinese: "为……提供资金",
        fit: "with-adjustment",
        rewrittenSentence: "The English, the Germans, the Dutch and the French were financing development in Britain’s former colony.",
        nuance: "finance 直接强调提供建设资金；invest in 还包含以获取回报为目的的投资关系。",
        adjustment: "finance 通常直接接被资助项目，因此补出 development，并把原来的 in 保留为地点介词。",
        target: "word:finance",
      }],
    },
  },
  "2001-p2-s20": {
    finance: {
      contextualMeaning: "资助；为……提供资金",
      use: "finance 作及物动词，They 指欧洲投资者，them 指基础设施。",
      contextualSubstitutions: [{
        label: "funded",
        chinese: "为……出资",
        fit: "direct",
        rewrittenSentence: "They funded them.",
        nuance: "fund 更直接指提供所需款项；finance 还可包含组织融资、安排资金的过程。",
        target: "word:fund",
      }],
    },
  },
  "2001-p2-s21": {
    build: {
      contextualMeaning: "建造；修建",
      use: "built 是 build 的不规则过去式，them 回指道路、港口等设施。",
      contextualSubstitutions: [{
        label: "constructed",
        chinese: "建造；修建",
        fit: "direct",
        rewrittenSentence: "Immigrant Americans constructed them.",
        nuance: "construct 更正式，常用于大型工程；build 是最普通的建造用词。",
        target: "word:construct",
      }],
    },
  },
  "2001-p2-s22": {
    own: {
      contextualMeaning: "拥有",
      use: "who owns them now 中 who 作从句主语，them 回指基础设施。",
      contextualSubstitutions: [{
        label: "possesses",
        chinese: "拥有；持有",
        fit: "direct",
        rewrittenSentence: "Guess who possesses them now?",
        nuance: "possess 更正式，强调持有；own 更明确地强调法律或实际所有权。",
        target: "word:possess",
      }],
    },
  },
  "2001-p2-s23": {
    american: {
      contextualMeaning: "美国人",
      use: "The Americans 是省略回答，完整意思为 The Americans own them now。",
      contextualSubstitutions: [{
        label: "U.S. citizens",
        chinese: "美国公民",
        fit: "with-adjustment",
        rewrittenSentence: "U.S. citizens.",
        nuance: "U.S. citizens 明确强调法律公民身份；the Americans 是更自然的国籍群体称呼。",
        adjustment: "把 the + 国籍复数名词改为 U.S. + citizens，并保留省略回答形式。",
        target: "word:citizen",
      }],
    },
  },
  "2001-p2-s24": {
    true: {
      contextualMeaning: "成立的；符合事实的",
      use: "would be true 是 believe 宾语从句的谓语和表语；would 表基于美国案例的类比推断。",
      contextualSubstitutions: [{
        label: "apply",
        chinese: "适用；同样成立",
        fit: "with-adjustment",
        rewrittenSentence: "I believe the same thing would apply in places like Brazil or anywhere else for that matter.",
        nuance: "apply 更直接说明一条原则适用于其他地方；be true 强调同样事实或规律成立。",
        adjustment: "把系表结构 would be true 改为不及物谓语 would apply。",
        target: "word:apply",
      }],
    },
  },
  "2001-p2-s25": {
    good: {
      contextualMeaning: "更好的（better 为比较级）",
      use: "better off 是固定比较级表语，在 the more..., the better... 结构中被提前；不是普通的‘更好地离开’。",
      contextualSubstitutions: [{
        label: "prosperous",
        chinese: "繁荣的；富裕的",
        fit: "direct",
        rewrittenSentence: "The more foreign capital you have helping you build your Third Wave infrastructure, which today is an electronic infrastructure, the more prosperous you’re going to be.",
        nuance: "prosperous 明确强调经济繁荣；better off 还可泛指生活、健康或处境改善。",
        target: "word:prosperous",
      }],
    },
  },
  "2001-p2-s26": {
    mean: {
      contextualMeaning: "意味着",
      use: "doesn't mean 后接 lying、becoming、letting 三个动名词内容；否定的是对接受外资的错误理解。",
      contextualSubstitutions: [{
        label: "imply",
        chinese: "意味着；暗含",
        fit: "direct",
        rewrittenSentence: "That doesn't imply lying down and becoming fooled, or letting foreign corporations run uncontrolled.",
        nuance: "imply 更强调从一种主张逻辑上推导出的含义；mean 是最直接的‘意味着’。",
        target: "word:imply",
      }],
    },
  },
  "2001-p2-s27": {
    important: {
      contextualMeaning: "重要的",
      use: "how important they can be 是 recognize 的宾语从句；how 把 important 程度提前。",
      contextualSubstitutions: [{
        label: "crucial",
        chinese: "关键的；至关重要的",
        fit: "direct",
        rewrittenSentence: "But it does mean recognizing how crucial they can be in building the energy and telecom infrastructures needed to take full advantage of the Internet.",
        nuance: "crucial 比 important 更强，暗示这些外企可能是建设过程中不可或缺的关键力量。",
        target: "word:crucial",
      }],
    },
  },
  "2010-cloze-s1": { detect: { contextualMeaning: "发现；检测到", use: "was first detected 是一般过去时被动；in Mexico 为发现地点。", contextualSubstitutions: [{ label: "discover", chinese: "发现", fit: "direct", rewrittenSentence: "The outbreak of swine flu that was first discovered in Mexico was declared a global epidemic on June 11, 2009.", nuance: "discover 是一般性的首次发现；detect 更突出通过监测、检验识别出原本不易察觉的事物。", target: "word:discover" }] } },
  "2010-cloze-s2": { designate: { contextualMeaning: "指定；认定", use: "designated by WHO 是过去分词短语，后置修饰 epidemic。", contextualSubstitutions: [{ label: "classify", chinese: "归类；划定等级", fit: "with-adjustment", rewrittenSentence: "It is the first worldwide epidemic classified as such by WHO in 41 years.", nuance: "classify 强调按类别归档，需补 as such；designate 更突出机构正式赋予名称或地位。", adjustment: "classify 后补 as such，保留‘认定为全球性疫情’的类别信息。", target: "word:classify" }] } },
  "2010-cloze-s3": { rise: { contextualMeaning: "增加；上升", use: "a sharp rise in cases 中 rise 是可数名词，in 引出上升对象。", contextualSubstitutions: [{ label: "increase", chinese: "增加；上升", fit: "direct", rewrittenSentence: "The heightened alert followed an emergency meeting with flu experts in Geneva that assembled after a sharp increase in cases in Australia, and rising numbers in Britain, Japan, Chile and elsewhere.", nuance: "increase 是中性数量增加；rise 更自然地描写统计数值向上变化。", target: "word:increase" }] } },
  "2010-cloze-s4": { overwhelming: { contextualMeaning: "占压倒性比例的；绝大多数的", use: "the overwhelming majority of 表比例大到几乎没有相反部分。", contextualSubstitutions: [{ label: "vast", chinese: "绝大部分的", fit: "direct", rewrittenSentence: "But the epidemic is \"moderate\" in severity, according to Margaret Chan, the organization's director general, with the vast majority of patients experiencing only mild symptoms and a full recovery, often in the absence of any medical treatment.", nuance: "vast majority 是常见中性表达；overwhelming majority 更强调比例具有压倒性。", target: "word:vast" }] } },
  "2010-cloze-s5": { note: { partOfSpeech: "v.", contextualMeaning: "注意到；记录", use: "authorities noted 后接异常住院及死亡数量作宾语。", contextualSubstitutions: [{ label: "observe", chinese: "观察到", fit: "direct", rewrittenSentence: "The outbreak came to global notice in late April 2009, when Mexican authorities observed an unusually large number of hospitalizations and deaths among healthy adults.", nuance: "observe 更突出通过观察发现；note 还暗含认为这一现象值得记录和关注。", target: "word:observe" }] } },
  "2010-cloze-s6": { crop: { contextualMeaning: "突然出现（crop up 中的动词）", use: "crop up 是不及物短语，cases 作主语，地点由 in... 引出。", contextualSubstitutions: [{ label: "emerge", chinese: "出现；显现", fit: "direct", rewrittenSentence: "As much of Mexico City shut down at the height of a panic, cases began to emerge in New York City, the southwestern United States and around the world.", nuance: "emerge 较正式、中性；crop up 常暗示未预料到地在多处冒出。", target: "word:emerge" }] } },
  "2010-cloze-s7": { fade: { contextualMeaning: "逐渐减弱", use: "seem to fade 表依据当时迹象作出的不确定判断。", contextualSubstitutions: [{ label: "subside", chinese: "逐渐平息；减弱", fit: "direct", rewrittenSentence: "In the United States, new cases seemed to subside as warmer weather arrived.", nuance: "subside 常用于疫情、风暴、疼痛等强度减弱；fade 更形象地强调渐渐淡去。", target: "word:subside" }] } },
  "2010-cloze-s8": { significant: { contextualMeaning: "显著的", use: "significant flu activity 作 there be 句的实际主语。", contextualSubstitutions: [{ label: "substantial", chinese: "大量的；显著的", fit: "direct", rewrittenSentence: "But in late September 2009, officials reported that there was substantial flu activity in almost every state and that virtually all the samples tested are the new swine flu, also known as (A) H1N1, not seasonal flu.", nuance: "substantial 更强调活动量相当大；significant 同时强调统计上或公共卫生上的重要程度。", target: "word:substantial" }] } },
  "2010-cloze-s9": { cause: { contextualMeaning: "造成；引起", use: "has caused 与 has infected 并列，共用主语 it。", contextualSubstitutions: [{ label: "lead to", chinese: "导致", fit: "with-adjustment", rewrittenSentence: "In the U.S., it has infected more than one million people and led to more than 600 deaths and more than 6,000 hospitalizations.", nuance: "lead to 侧重因果结果，后接名词；cause 可直接以结果作宾语，结构更紧凑。", adjustment: "把及物结构 caused + 结果改为不及物短语 led to + 结果。", target: "phrase:lead to" }] } },
  "2010-cloze-s10": { release: { contextualMeaning: "释放；投放", use: "released Tamiflu from the national stockpile 构成‘从储备投放’。", contextualSubstitutions: [{ label: "distribute", chinese: "分发；调配", fit: "with-adjustment", rewrittenSentence: "Federal health officials distributed Tamiflu for children from the national stockpile and began taking orders from the states for the new swine flu vaccine.", nuance: "distribute 强调把物资分配给多方；release 强调解除储存状态并投入使用。", adjustment: "改写保留 from the national stockpile 表明物资来源；实际分发对象由语境理解。", target: "word:distribute" }] } },
  "2010-cloze-s11": { available: { contextualMeaning: "可获得的；可使用的", use: "is available 是形容词表语；ahead of expectations 说明供应早于预期。", contextualSubstitutions: [{ label: "obtainable", chinese: "可获得的", fit: "direct", rewrittenSentence: "The new vaccine, which is different from the annual flu vaccine, is obtainable ahead of expectations.", nuance: "obtainable 只强调能够取得；available 更自然地表示产品已进入供应状态。", target: "word:obtainable" }] } },
  "2010-cloze-s12": { initial: { contextualMeaning: "最初的", use: "initial 修饰 doses，与 in early October 的首批供应相呼应。", contextualSubstitutions: [{ label: "first", chinese: "第一批的", fit: "direct", rewrittenSentence: "More than three million doses were to be made available in early October 2009, though most of those first doses were of the FluMist nasal spray type, which is not recommended for pregnant women, people over 50 or those with breathing difficulties, heart disease or several other problems.", nuance: "first 更直白地按顺序说明首批；initial 更正式，强调供应开始阶段。", target: "word:first" }] } },
  "2010-cloze-s13": { care: { contextualMeaning: "照料；照顾", use: "caring for infants 是现在分词短语，后置修饰 people。", contextualSubstitutions: [{ label: "look after", chinese: "照料；照顾", fit: "direct", rewrittenSentence: "But it was still possible to vaccinate people in other high-risk groups: health care workers, people looking after infants and healthy young people.", nuance: "look after 更口语；care for 更正式，并常见于医疗和照护语境。", target: "phrase:look after" }] } },
  "2010-p1-s1": {
    note: { partOfSpeech: "n.", contextualMeaning: "基调；意味", use: "ended on a dramatic note 中 note 是事件收尾的基调；dramatic 指这场高价拍卖使牛市以轰动、富有戏剧性的方式结束，不是奏出音符。" },
    dramatic: { contextualMeaning: "戏剧性的；引人注目的", use: "dramatic 修饰 note，描述牛市收尾的效果。", contextualSubstitutions: [{ label: "striking", chinese: "引人注目的", fit: "direct", rewrittenSentence: "The longest bull run in a century of art-market history ended on a striking note with a sale of 56 works by Damien Hirst, Beautiful Inside My Head Forever, at Sotheby's in London on September 15th 2008.", nuance: "striking 强调引人注目；dramatic 还暗含变化突然、结局富有戏剧性。", target: "word:striking" }] },
  },
  "2010-p1-s2": { fetch: { contextualMeaning: "售得；卖得", use: "fetching... 是现在分词结果状语，逻辑主语为作品。", contextualSubstitutions: [{ label: "bring in", chinese: "带来（收入）", fit: "direct", rewrittenSentence: "All but two pieces sold, bringing in more than £70m, a record for a sale by a single artist.", nuance: "bring in 更直接强调收入；fetch 是拍卖和商品成交报道中的凝练用词。", target: "phrase:bring in" }] } },
  "2010-p1-s3": { last: { contextualMeaning: "最后的", use: "last 修饰 victory，其依据在下一句雷曼破产。", contextualSubstitutions: [{ label: "final", chinese: "最后的", fit: "direct", rewrittenSentence: "It was a final victory.", nuance: "final 直接强调序列终点；last 在叙事中更自然地连接此前牛市与随后危机。", target: "word:final" }] } },
  "2010-p1-s4": { file: { contextualMeaning: "提出；提交（申请）", use: "file for bankruptcy 是法律和商业固定搭配。", contextualSubstitutions: [{ label: "apply for", chinese: "申请", fit: "direct", rewrittenSentence: "As the auctioneer called out bids, in New York one of the oldest banks on Wall Street, Lehman Brothers, applied for bankruptcy.", nuance: "apply for 是一般申请；file for 强调依法正式提交文件。", target: "phrase:apply for" }] } },
  "2010-p1-s5": { momentum: { contextualMeaning: "动力；势头", use: "lose momentum 是过去完成进行时中的动宾搭配。", contextualSubstitutions: [{ label: "impetus", chinese: "推动力；发展动力", fit: "with-adjustment", rewrittenSentence: "The world art market had already been losing its impetus for a while after rising bewilderingly since 2003.", nuance: "impetus 更强调推动变化的力量，通常带物主限定；momentum 还强调已形成并持续的运动势头。", adjustment: "在 impetus 前补 its，使名词短语自然。", target: "word:impetus" }] } },
  "2010-p1-s6": { reckon: { contextualMeaning: "估计；估算", use: "reckons Clare McAndrew 是插入式倒装报道语。", contextualSubstitutions: [{ label: "estimate", chinese: "估算", fit: "with-adjustment", rewrittenSentence: "At its peak in 2007 it was worth some $65 billion, according to Clare McAndrew's estimate, founder of Arts Economics, a research firm – double the figure five years earlier.", nuance: "estimate 更明确强调数值估算，但改为名词结构后需调整报道语；reckon 保留新闻叙述的简洁口吻。", adjustment: "将倒装谓语 reckons Clare 改为 according to...estimate。", target: "word:estimate" }] } },
  "2010-p1-s7": { down: { contextualMeaning: "向下；降低", use: "come down to 中 to 引出下降终点。", contextualSubstitutions: [{ label: "fall", chinese: "下降", fit: "direct", rewrittenSentence: "Since then it may have fallen to $50 billion.", nuance: "fall to 是直接的数量下降；come down to 语气稍口语并突出从高位回落。", target: "word:fall" }] } },
  "2010-p1-s8": { generate: { contextualMeaning: "产生；引发", use: "generate interest 是主句谓语和宾语。", contextualSubstitutions: [{ label: "attract", chinese: "吸引", fit: "direct", rewrittenSentence: "But the market attracts interest far beyond its size because it brings together great wealth, enormous egos, greed, passion and controversy in a way matched by few other industries.", nuance: "attract 强调把既有注意力吸引过来；generate 强调这种市场特性产生了关注。", target: "word:attract" }] } },
  "2010-p1-s9": { unfashionable: { contextualMeaning: "不时兴的；不合潮流的", use: "became deeply unfashionable 为系表结构。", contextualSubstitutions: [{ label: "unpopular", chinese: "不受欢迎的", fit: "direct", rewrittenSentence: "In the weeks and months that followed Mr. Hirst's sale, spending of any sort became deeply unpopular.", nuance: "unpopular 是一般的不受欢迎；unfashionable 更贴合消费风气突然逆转。", target: "word:unpopular" }] } },
  "2010-p1-s10": { mean: { contextualMeaning: "意味着", use: "meant 是mean的过去式；前面的that是指示代词主语，宾语内容为collectors stayed away from galleries and salerooms，连接词that省略。不是动名词宾语或否定对照。" }, away: { contextualMeaning: "远离；不在场", use: "stay away from galleries and salerooms 是整体谓语搭配。", contextualSubstitutions: [{ label: "avoid", chinese: "避开", fit: "with-adjustment", rewrittenSentence: "In the art world that meant collectors avoided galleries and salerooms.", nuance: "avoid 可直接接地点作宾语；stay away from 更强调持续不露面、不参与。", adjustment: "删除 stay 和介词 from，改为及物动词 avoided。", target: "word:avoid" }] } },
  "2010-p1-s11": { fall: { contextualMeaning: "下降", use: "fell by two-thirds 中 by 引出降幅。", contextualSubstitutions: [{ label: "decline", chinese: "下降", fit: "with-adjustment", rewrittenSentence: "Sales of contemporary art declined by two-thirds, and in the most overheated sector, they were down by nearly 90% in the year to November 2008.", nuance: "decline 更正式、中性；fall 更直观地呈现快速下落。", adjustment: "将 fell 改为一般过去时 declined。", target: "word:decline" }] } },
  "2010-p1-s12": { pay: { contextualMeaning: "支付；付出", use: "pay out nearly $200m 是 had to 后的动词短语。", contextualSubstitutions: [{ label: "disburse", chinese: "支付；拨付", fit: "with-adjustment", rewrittenSentence: "Within weeks the world's two biggest auction houses, Sotheby's and Christie's, had to disburse nearly $200m in guarantees to clients who had placed works for sale with them.", nuance: "disburse 是正式财务用语；pay out 更自然地暗示因责任、索赔或担保而付出大笔款项。", adjustment: "disburse 为及物动词，不保留 out。", target: "word:disburse" }] } },
  "2010-p1-s13": { downturn: { contextualMeaning: "低迷；衰退", use: "downturn in the art market 是主语中心。", contextualSubstitutions: [{ label: "decline", chinese: "衰退；下降", fit: "direct", rewrittenSentence: "The current decline in the art market is the worst since the Japanese stopped buying Impressionists at the end of 1989.", nuance: "decline 泛指下降过程；downturn 更像经济周期中的下行阶段。", target: "word:decline" }] } },
  "2010-p1-s14": { fluctuant: { contextualMeaning: "波动的；起伏不定的", use: "far 修饰 more fluctuant，加强比较级。", contextualSubstitutions: [{ label: "volatile", chinese: "波动剧烈的", fit: "direct", rewrittenSentence: "This time experts reckon that prices are about 40% down on their peak on average, though some have been far more volatile.", nuance: "volatile 是现代财经英语中更常见的‘价格易剧烈波动’；fluctuant 为原卷保留用词。", target: "word:volatile" }] } },
  "2010-p1-s15": { confident: { contextualMeaning: "确信的；有信心的", use: "confident 后接省略 that 的内容从句。", contextualSubstitutions: [{ label: "certain", chinese: "确信的", fit: "direct", rewrittenSentence: "But Edward Dolman, Christie's chief executive, says: \"I'm pretty certain we're at the bottom.\"", nuance: "certain 更强调判断确定；confident 还包含基于经验形成的信心。", target: "word:certain" }] } },
  "2010-p1-s16": { different: { contextualMeaning: "不同的", use: "make A different from B 为宾语补足结构。", contextualSubstitutions: [{ label: "distinguish", chinese: "使区别于", fit: "with-adjustment", rewrittenSentence: "What distinguishes this slump from the last, he says, is that there are still buyers in the market.", nuance: "distinguish A from B 用一个动词概括差异；make A different 更便于展示宾补结构。", adjustment: "把 make + 宾语 + different from 改为 distinguish + 宾语 + from。", target: "word:distinguish" }] } },
  "2010-p1-s17": { lack: { contextualMeaning: "缺少；不足", use: "not a lack of A but a lack of B 为平行表语。", contextualSubstitutions: [{ label: "shortage", chinese: "短缺", fit: "with-adjustment", rewrittenSentence: "Almost everyone who was interviewed for this special report said that the biggest problem at the moment is not weak demand but a shortage of good work to sell.", nuance: "shortage 更适合可供市场使用的资源不足；lack 可同时与 demand 和 work 平行搭配。", adjustment: "为保持自然搭配，把 a lack of demand 改写为 weak demand。", target: "word:shortage" }] } },
  "2010-p1-s18": { deliver: { contextualMeaning: "送达；输送", use: "deliver A to B 为拟人化动宾方向结构。", contextualSubstitutions: [{ label: "bring", chinese: "带来；使进入", fit: "direct", rewrittenSentence: "The three Ds – death, debt and divorce – still bring works of art to the market.", nuance: "bring 是中性带来；deliver 更形象地把三种变故写成向市场输送作品的力量。", target: "word:bring" }] } },
  "2010-p1-s19": { away: { contextualMeaning: "远离；不在场", use: "is keeping away 是现在进行时，省略了 from the market。", contextualSubstitutions: [{ label: "hold back", chinese: "暂不行动；观望", fit: "direct", rewrittenSentence: "But anyone who does not have to sell is holding back, waiting for confidence to return.", nuance: "hold back 直接突出暂缓出售；keep away 强调从市场离场。", target: "phrase:hold back" }] } },
};

for (const [sourceId, contexts] of Object.entries({...passage2011P1SourceContexts, ...passage2011P2SourceContexts, ...passage2011P3SourceContexts})) {
  sentenceWordContexts[sourceId] = { ...sentenceWordContexts[sourceId], ...contexts };
}
for (const [sourceId, contexts] of Object.entries({ ...passage3Contexts, ...passage4Contexts, ...passage5Contexts })) {
  const target = sentenceWordContexts[sourceId] ??= {};
  for (const [headword, context] of Object.entries(contexts)) target[headword] = { ...target[headword], ...context };
}
for (const [sourceId, words] of Object.entries(passage2000P1Contexts)) {
  const existing = sentenceWordContexts[sourceId] ?? {};
  sentenceWordContexts[sourceId] = { ...existing, ...Object.fromEntries(Object.entries(words).map(([headword, context]) => [headword, { ...existing[headword], ...context }])) };
}

for (const [sourceId, words] of Object.entries(passage2000P2Contexts)) {
  const existing = sentenceWordContexts[sourceId] ?? {};
  sentenceWordContexts[sourceId] = { ...existing, ...Object.fromEntries(Object.entries(words).map(([headword, context]) => [headword, { ...existing[headword], ...context }])) };
}

export function getSentenceWordContext(sentenceId: string | undefined, headword: string) {
  if (!sentenceId) return undefined;
  const base = sentenceWordContexts[sentenceId]?.[headword];
  const override = translation2000ReviewedContexts[sentenceId]?.[headword] ?? translation2011TrainingContexts[sentenceId]?.[headword] ?? translation2012ReviewedContexts[sentenceId]?.[headword] ?? passage2001P1SourceContexts[sentenceId]?.[headword] ?? passage2001P2SourceContexts[sentenceId]?.[headword] ?? cloze2001SourceContexts[sentenceId]?.[headword];
  const context = override ? { ...base, ...override } : base;
  const preferredCollocations = passage2010P2PreferredCollocations[sentenceId]?.[headword];
  return preferredCollocations ? { ...context, preferredCollocations } : context;
}

type SentencePhraseContext = Pick<SentenceWordContext, "contextualMeaning" | "use" | "partOfSpeech"> & { knowledgeExpression?: string };

const sentencePhraseContexts: Record<string, Record<string, SentencePhraseContext>> = {
  "question-201028-option-C": {
    "communication between couples": { knowledgeExpression: "between + plural noun", contextualMeaning: "夫妻双方之间的沟通", use: "between后直接接复数名词couples，不把原文补成A and B；整组修饰communication。" },
  },
  "p2-s4": {
    "as well as": { knowledgeExpression: "almost as well as", contextualMeaning: "和……一样好（almost 表示几乎）" },
  },
  "2010-translation-s6": {
    "a lack of sales": { contextualMeaning: "销售不足" },
  },
};

export function getSentencePhraseContext(sourceId: string | undefined, expression: string) {
  return sourceId ? sentencePhraseContexts[sourceId]?.[expression.trim().toLowerCase()] : undefined;
}
