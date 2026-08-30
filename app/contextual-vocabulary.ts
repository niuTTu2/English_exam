export type ArticleLexiconId = "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation" | "2001-cloze";

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
  contextualMeaning?: string;
  use?: string;
  contextualSubstitutions?: ContextualSubstitution[];
};

/**
 * Sentence-scoped knowledge lives separately from the stable lemma entry.
 * The same headword may therefore keep one global knowledge page while showing
 * a different sense, use and replacement set in every source sentence.
 */
export const sentenceWordContexts: Record<string, Record<string, SentenceWordContext>> = {
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
          fit: "direct",
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
      contextualMeaning: "认可；正面看待",
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
      contextualMeaning: "需要（措施与专业帮助）",
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
      contextualMeaning: "以政府措施正式禁止",
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
      contextualMeaning: "引人注目、社会关注度高的",
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
      contextualMeaning: "幅度和政策意义都明显的",
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
      contextualMeaning: "严格限制公开报道的总量",
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
      contextualMeaning: "由制度提供、产生足够监管效果",
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
      contextualMeaning: "信件内容被正式公开发表这一事件",
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
      contextualMeaning: "对法律规定含义和适用方式的解释",
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
      contextualMeaning: "在法律上必须遵守、具有约束力的",
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
      contextualMeaning: "需要公共讨论和处理的争议问题",
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
      contextualMeaning: "对证词可能受金钱影响的担忧",
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
};

export function getSentenceWordContext(sentenceId: string | undefined, headword: string) {
  if (!sentenceId) return undefined;
  return sentenceWordContexts[sentenceId]?.[headword];
}
