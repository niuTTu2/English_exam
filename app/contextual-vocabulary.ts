export type ArticleLexiconId = "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation" | "2001-cloze" | "2001-p1" | "2001-p2";

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
  "2001-p1-s1": {
    accumulation: {
      contextualMeaning: "科学知识不断增加并聚集形成的总量",
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
      contextualMeaning: "把学科内容细分成较小单元",
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
      contextualMeaning: "科学交流方式中相互关联的制度变化",
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
      contextualMeaning: "职业化程度不断增强的",
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
      contextualMeaning: "专业人士与业余者之间可明确划定的界线",
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
      contextualMeaning: "amateur 一词附带的、超出字面定义的联想义",
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
      contextualMeaning: "客观上意味着并带来更大的参与困难",
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
      contextualMeaning: "最容易被观察到、表现最突出的",
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
      contextualMeaning: "通过跨时期比较揭示出两项变化",
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
      contextualMeaning: "达到专业人士认可和专业期刊准入标准的",
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
      contextualMeaning: "持续从事、开展地方性研究",
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
      contextualMeaning: "使业余者发表更难这一结果进一步加强",
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
      contextualMeaning: "专业与业余读者各自的期刊已经形成并出现",
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
      contextualMeaning: "专业群体与业余群体在组织形式上逐渐分流",
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
      contextualMeaning: "专业化与职业化造成的全部结构性影响",
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
      contextualMeaning: "对科学结构转变起决定作用的",
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
      contextualMeaning: "社会对数字鸿沟问题投入的关注",
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
      contextualMeaning: "数字鸿沟作为现实问题确实存在",
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
      contextualMeaning: "就数字鸿沟这一危险发表演讲",
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
      contextualMeaning: "在当时容易被观察、认识到的",
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
      contextualMeaning: "对数字鸿沟未来缩小持乐观判断",
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
      contextualMeaning: "数字鸿沟的差距逐渐缩小",
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
      contextualMeaning: "企业和商业界能够获得的经济利益",
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
      contextualMeaning: "把互联网接入推广到更多地区和人群",
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
      contextualMeaning: "通过互联网把全球人口连接起来",
      use: "will be netted together 是将来时被动语态；原卷 he 为排印错误，正确助动词为 be。",
      contextualSubstitutions: [{
        label: "connected",
        chinese: "连接起来",
        fit: "direct",
        rewrittenSentence: "Within the next decade or two, one to two billion people on the planet will be connected together.",
        nuance: "connected 是普通‘连接’；netted 更形象地突出人们被同一网络覆盖。",
        target: "word:connect",
      }],
    },
  },
  "2001-p2-s10": {
    narrow: {
      contextualMeaning: "数字鸿沟在未来变小而非扩大",
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
      contextualMeaning: "在抗击全球贫困方面作用非常强大",
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
      contextualMeaning: "战胜并减少贫困问题",
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
      contextualMeaning: "解决贫困问题的一种手段",
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
      contextualMeaning: "程度极大的",
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
      contextualMeaning: "经济贫困、缺乏建设资本的",
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
      contextualMeaning: "考察并分析美国基础设施建设史",
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
      contextualMeaning: "建设工业基础设施所需的资金资本",
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
      contextualMeaning: "列举第二次浪潮基础设施的实例",
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
      contextualMeaning: "把资本投入英国的前殖民地美国",
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
      contextualMeaning: "为美国道路、港口等基础设施提供资金",
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
      contextualMeaning: "实际建造这些基础设施",
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
      contextualMeaning: "拥有这些基础设施的所有权",
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
      contextualMeaning: "最终拥有这些基础设施的美国人",
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
      contextualMeaning: "同样规律在其他国家也成立、适用",
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
      contextualMeaning: "经济和生活境况更好、更富裕",
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
      contextualMeaning: "意味着接受外资会带来某种行为或后果",
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
      contextualMeaning: "外国公司在建设能源和电信基础设施方面作用重大",
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
};

export function getSentenceWordContext(sentenceId: string | undefined, headword: string) {
  if (!sentenceId) return undefined;
  return sentenceWordContexts[sentenceId]?.[headword];
}
