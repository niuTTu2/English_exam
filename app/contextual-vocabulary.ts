export type ArticleLexiconId = "cloze" | "p1" | "p2" | "p3" | "p4" | "p5" | "translation" | "2001-cloze" | "2001-p1";

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
};

export function getSentenceWordContext(sentenceId: string | undefined, headword: string) {
  if (!sentenceId) return undefined;
  return sentenceWordContexts[sentenceId]?.[headword];
}
