export type ArticleLexiconId = "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation";

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
};

export function getSentenceWordContext(sentenceId: string | undefined, headword: string) {
  if (!sentenceId) return undefined;
  return sentenceWordContexts[sentenceId]?.[headword];
}
