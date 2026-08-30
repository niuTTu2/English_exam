import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";

type PhraseSeed = [
  key: string,
  source: string,
  canonical: string,
  type: string,
  meaning: string,
  grammarRole: string,
  rule: string,
  exampleEnglish: string,
  exampleChinese: string,
  pitfall: string,
];

const seeds: PhraseSeed[] = [
  ["be-to-ban", "is to ban payments", "be to ban + n.", "be to do 结构", "将要禁止……；按安排禁止……", "主句谓语", "be to do 表示安排、命令或即将正式实施的措施；ban 后直接接被禁止对象。", "The agency is to ban secret payments.", "该机构将禁止秘密付款。", "不要把 be to do 拆成‘是 + 去做’；ban 是及物动词。"],
  ["payments-to-witnesses", "payments to witnesses", "payment(s) to + recipient", "名词介词搭配", "付给证人的款项", "ban 的宾语中心", "to 引出款项的接收者；若说明付款原因，另用 payment for + n./doing。", "Payments to witnesses may affect a trial.", "向证人付款可能影响审判。", "to 是接收方向；不要与 payments for services 的原因/交换内容混淆。"],
  ["seek-to-buy-up", "seeking to buy up people", "seek to buy up + source/story", "现在分词与短语动词", "试图花钱买断消息来源或独家讲述", "现在分词后置修饰 newspapers", "seek to do 表试图做；buy up 表大量买进或用钱取得独家控制。本句 people 是转喻，实指其故事和独家讲述。", "A paper sought to buy up every witness's story.", "一家报纸试图买断所有证人的故事。", "buy up people 不能机械理解为买卖人口；需结合新闻语境识别转喻。"],
  ["involved-in-cases", "involved in prominent cases", "be involved in + case/activity", "过去分词搭配", "卷入重大案件", "过去分词后置修饰 people", "involved 与所修饰的人是被动/状态关系；in 后接参与或卷入的事件。", "People involved in the case were questioned.", "涉案人员受到询问。", "involve in 主动用法通常需要宾语；描述人时常用 be involved in。"],
  ["such-as-example", "such as the trial of Rosemary West", "such as + example(s)", "举例介词结构", "例如 Rosemary West 一案的审判", "举例说明 prominent cases", "such as 后直接接名词、动名词或并列实例，把上位类别具体化。", "Prominent cases such as this trial attract attention.", "像这场审判这样的重大案件会引起关注。", "for instance 常作插入语；不能在所有位置与 such as 机械互换。"],
  ["for-instance", "for instance", "for instance", "插入性举例副词短语", "例如", "补充例子并连接说明", "for instance 通常用逗号与主句隔开，也可独立引出一个例子。", "For instance, this trial attracted the press.", "例如，这场审判吸引了媒体。", "不能在 cases ___ the trial 位置把它当作 such as 的介词替代。"],
  ["in-particular", "in particular", "in particular", "强调副词短语", "尤其；特别是", "强调前文范围内的特定对象", "in particular 可置于句中或句末强调某项，但不是直接连接类别与例子的介词。", "The press focused on this case in particular.", "媒体尤其关注这起案件。", "表示列举名词实例时，such as 的句法更合适。"],
  ["tightening-of-controls", "tightening of legal controls", "a tightening of + control/rule", "名词化结构", "法律管制的收紧", "in 介词短语的中心", "tightening 是可数事件名词；of 引出被收紧的规则或控制。", "The reform brought a tightening of media controls.", "改革导致媒体管制收紧。", "不要写 a tightening controls；of 不能省略。"],
  ["controls-over-press", "controls over the press", "control(s) over + field/person", "名词介词搭配", "对新闻界的管制", "legal controls 的后置范围说明", "over 引出被控制的对象或领域；press 在这里是集合意义的新闻界。", "Legal controls over the press remain controversial.", "对新闻界的法律管制仍有争议。", "control of 与 control over 都可用，但本句原文固定为 over。"],
  ["introduce-draft-bill", "introduce a draft bill", "introduce a draft bill", "法律动词搭配", "提出法案草案", "主句谓语 + 宾语", "introduce 在议会语境中是正式提交；draft bill 是尚未通过的法案文本。", "The minister introduced a draft bill.", "部长提交了一份法案草案。", "introduce 不译成‘介绍法案’；bill 在此不是账单。"],
  ["propose-making-illegal", "propose making payments to witnesses illegal", "propose making A illegal", "动名词宾语 + 宾补", "建议把 A 定为违法", "定语从句内第一项谓语内容", "propose 后接 doing；make 后接 A + adjective，形容词说明 A 被改变后的法律状态。", "They proposed making the payment illegal.", "他们建议将这项付款定为违法。", "不能说 propose to making；make 后不加 to be 也可接形容词宾补。"],
  ["control-amount-publicity", "control the amount of publicity", "control the amount of + uncountable noun", "动宾数量结构", "控制公开报道的数量", "定语从句内第二项谓语内容", "amount of 后接不可数名词；control 表限制其总量。", "The court controlled the amount of publicity.", "法院限制了公开报道的数量。", "可数名词通常用 number of；publicity 在此不可数。"],
  ["before-trial-begins", "before a trial begins", "before + subject + predicate", "时间状语从句", "在审判开始之前", "修饰 publicity can be given", "before 后接完整主谓结构，明确一件事早于开庭。", "Evidence should not be published before a trial begins.", "审判开始前不应公开证据。", "before 是从属连词时后面必须有主语和谓语。"],
  ["in-letter-to", "in a letter to Gerald Kaufman", "in a letter to + recipient", "信息来源介词短语", "在写给某人的信中", "修饰 said 的信息来源状语", "in a letter 说明信息载体；to 引出收信人。", "She explained the policy in a letter to the chairman.", "她在写给主席的信中解释了政策。", "不要用 for 替代收信人的 to。"],
  ["agree-with-report", "agreed with a committee report", "agree with + person/view/report", "动词介词搭配", "赞同委员会报告", "said 的宾语从句谓语", "agree with 表观点一致；报告在此代表其中的结论。", "The judge agreed with the report.", "法官赞同这份报告。", "comply with 是遵守要求，不等于赞同观点。"],
  ["self-regulation", "self regulation", "self-regulation", "复合名词", "行业自律；自我监管", "that 从句主语", "self- 表行为由同一主体对自身实施；规范现代拼写常加连字符。", "Self-regulation did not provide enough control.", "行业自律没有提供足够监管。", "原卷写作 self regulation；知识原型用 self-regulation，但不得改写原文展示。"],
  ["offer-sufficient-control", "offer sufficient control", "offer + sufficient/adequate control", "动宾搭配", "提供足够的监管作用", "that 从句谓语 + 宾语", "offer 可表示制度带来或提供某种效果；sufficient 修饰 control 的程度。", "The rules offer sufficient control.", "这些规则提供了足够的监管。", "present control 更像呈交控制，不表达制度产生监管效果。"],
  ["publication-letter", "publication of the letter", "publication of + document", "名词化结构", "信件的公开发表", "主句主语", "publication 指内容正式向公众发表；of 引出被发表的文本。", "Publication of the letter caused debate.", "这封信的发表引发了争论。", "printing 只指印刷；release 更强调放出或发行。"],
  ["storm-media-protest", "a storm of media protest", "a storm of + protest/criticism", "比喻性数量结构", "媒体的强烈抗议浪潮", "caused 的宾语", "storm 比喻反应突然、密集而强烈；of 引出抗议内容。", "The decision caused a storm of protest.", "这一决定引发了强烈抗议。", "不说 a rage/flare/flash of protest 表同样固定含义。"],
  ["privacy-controls-contained", "privacy controls contained in European legislation", "controls contained in + law/document", "过去分词后置定语", "欧洲法律中规定的隐私管制条款", "interpretation 的 of 宾语", "contained in... 是过去分词短语，修饰 controls，表示这些规定被写入法律。", "The safeguards contained in the law are binding.", "法律中的保障条款具有约束力。", "contained 修饰 controls，不修饰 interpretation。"],
  ["left-to-judges", "be left to judges", "leave A to + decision-maker", "被动责任归属结构", "交由法官处理或决定", "would be left 的补足对象", "主动式 leave A to B 把事务交给 B；被动式 A be left to B 保留 to。", "Interpretation was left to judges.", "解释工作交给了法官。", "不能漏掉 to；不要误解为‘把法官留下’。"],
  ["rather-than-parliament", "rather than to Parliament", "to A rather than to B", "取舍并列结构", "交给 A 而不是议会", "与 to judges 平行的排除项", "rather than 两侧保持介词结构平行；前者是选择项，后者是排除项。", "The matter was left to judges rather than to Parliament.", "此事交给法官而不是议会。", "不能用 better than 表责任选择；平行时两个 to 都可保留。"],
  ["introduction-human-rights-bill", "introduction of the Human Rights Bill", "introduction of + law/policy", "名词化主语", "《人权法案》的引入或实施", "said 后宾语从句的主语", "introduction 把 introduce 动作名词化；of 引出被引入的法案。", "Introduction of the bill changed the law.", "该法案的引入改变了法律。", "introduction 在此不是书籍‘导言’。"],
  ["make-convention-binding", "makes the European Convention on Human Rights legally binding", "make A legally binding", "宾语补足语结构", "使 A 在法律上具有约束力", "which 定语从句的谓语结构", "make 后接宾语 A 与形容词 binding；legally 修饰 binding。", "The act made the convention legally binding.", "该法案使公约具有法律约束力。", "不能说 make A legally bind；binding 在这里是形容词。"],
  ["lay-down-that", "laid down that", "lay down that + clause", "法律短语动词", "明文规定……", "宾语从句核心谓语", "lay down 在规则和法律语境表示正式规定；that 从句承载规定内容。", "The law lays down that everyone has equal rights.", "法律规定人人权利平等。", "不要按字面译为‘放下’；lay 的过去式是 laid。"],
  ["entitled-to-privacy", "was entitled to privacy", "be entitled to + right/benefit", "权利搭配", "有权享有隐私", "第一个 that 从句谓语补足", "entitled 表依法或按规则有权获得；to 是介词，后接名词或 doing。", "Everyone is entitled to privacy.", "人人都有权享有隐私。", "be authorized to do 的 to 是不定式标记，结构不同。"],
  ["go-to-court", "go to court", "go to court", "法律固定搭配", "诉诸法院；提起诉讼", "第二个 that 从句谓语", "零冠词 court 表法院制度或诉讼程序，而非去某栋法院建筑。", "Public figures can go to court.", "公众人物可以诉诸法院。", "表示诉诸司法通常不说 go to the court；具体建筑才可能用 the。"],
  ["protect-self-family", "protect themselves and their families", "protect oneself and one's family", "反身代词动宾结构", "保护自己和家人", "to do 目的状语的动作内容", "主语与 protect 的宾语同指时用反身代词；and 连接两个并列宾语。", "They went to court to protect themselves and their families.", "他们诉诸法院保护自己和家人。", "themselves 必须与复数主语 public figures 一致。"],
  ["public-figures", "public figures", "public figure(s)", "名词搭配", "公众人物；知名人士", "that 从句主语", "public 修饰 figure，指因职业、权力或知名度而持续受到公众关注的人。", "Public figures may seek legal protection.", "公众人物可能寻求法律保护。", "public figure 不是‘公共数字’；figure 在此指人物。"],
  ["press-freedoms", "press freedoms", "press freedom(s)", "复合名词", "新闻自由权", "直接引语主语", "press 作名词定语表示新闻界；复数 freedoms 可强调多项具体权利。", "Press freedoms require legal protection.", "新闻自由需要法律保护。", "press 在此不是‘按压’；press freedom 单数也常见。"],
  ["safe-hands", "be in safe hands", "be in safe hands", "习语", "由可靠的人妥善掌管", "引语内表语", "in safe hands 描述受到可靠照管的状态，负责者可用 with 引出。", "The case is in safe hands.", "这起案件由可靠的人妥善处理。", "不要逐字理解为物理上‘在安全的手中’。"],
  ["with-british-judges", "with our British judges", "be in safe hands with + person", "责任归属介词短语", "由英国法官妥善掌管", "补充 in safe hands 的负责人", "with 引出负责照管的人或机构。", "The matter is in safe hands with the judges.", "此事由法官妥善处理。", "固定状态搭配用 with，不用 by 机械套被动语态。"],
  ["witness-payments", "witness payments", "witness payment(s)", "名词复合结构", "向证人支付的款项", "主句主语", "前置名词 witness 说明 payment 的接收对象/相关领域。", "Witness payments became controversial.", "向证人付款变得有争议。", "不要误解为证人自己支付的款项；需由上下文确定关系。"],
  ["become-issue", "became an issue", "become an issue", "系表结构", "成为争议问题", "主句谓语 + 表语", "become 是系动词，issue 作名词表语，强调状态变化。", "The practice became an issue.", "这种做法成了争议问题。", "issue 在此不是‘发行’或‘期号’。"],
  ["have-impact-on", "have an impact on", "have an impact on + n.", "动宾介词搭配", "对……产生影响", "常见影响表达", "impact 作名词时常与 have 和 on 连用，on 引出受影响对象。", "Publicity may have an impact on a trial.", "公开报道可能影响审判。", "不能说 become an impact 表‘成为问题’；issue 与 impact 句法不同。"],
  ["sentenced-to-life", "was sentenced to 10 life sentences", "be sentenced to + punishment", "被动法律搭配", "被判处无期徒刑等刑罚", "after 从句谓语", "sentence 作动词时常用被动；to 引出判处的刑罚。", "He was sentenced to life imprisonment.", "他被判处无期徒刑。", "sentence to 后接刑罚；不要用 for 引出刑罚本身。"],
  ["up-to-number", "up to 19 witnesses", "up to + number", "数量上限结构", "多达 19 名证人", "句子主语的数量限定", "up to 在数字前表示最大可能数量，常带‘竟有这么多’的强调。", "Up to 20 witnesses may appear.", "可能有多达 20 名证人出庭。", "这里不是‘直到’的时间义或空间方向义。"],
  ["said-to-have-received", "were said to have received payments", "be said to have done", "被动报道结构", "据说已经收到款项", "主句被动谓语 + 主语补足", "be said to do 表消息来源不具体；完成不定式 have done 表动作早于说法。", "Several witnesses were said to have received money.", "据说几名证人已经收了钱。", "be told to do 表被告知/命令去做，不等于‘据说’。"],
  ["payments-for-telling", "payments for telling their stories", "payment(s) for + n./doing", "名词原因/交换搭配", "因讲述故事而得到的报酬", "received payments 的原因说明", "for 引出获得报酬所交换的行为；介词后用 telling。", "They received payments for telling their stories.", "他们因讲述故事而获得报酬。", "for 后不能用 tell 动词原形。"],
  ["tell-stories-to-newspapers", "telling their stories to newspapers", "tell a story to + listener", "双对象动词搭配", "把自己的故事讲给报纸媒体", "telling 的完整宾语与接收者", "story 是 tell 的直接宾语；to newspapers 引出信息接收者。", "Witnesses told their stories to newspapers.", "证人把自己的故事讲给报纸。", "tell newspapers their stories 也可，但本句采用 tell sth to sb。"],
  ["concerns-raised", "concerns were raised", "raise concerns / concerns be raised", "被动动宾搭配", "有人提出担忧", "主句被动谓语", "主动式不点明主体时可转为被动，that 从句常说明担忧内容。", "Concerns were raised that the rule was unfair.", "有人担心该规则不公平。", "raise 是‘提出/引起’，不是 rise 的不及物‘上升’。"],
  ["encouraged-source-typo", "might be encouraged exaggerate", "might be encouraged to do", "情态被动 + 不定式", "可能受到诱导去做某事", "that 从句谓语与动作补足", "规范结构是 encourage sb to do 的被动式 sb be encouraged to do；原卷在 encouraged 后漏印 to。", "Witnesses might be encouraged to exaggerate.", "证人可能受到诱导去夸大事实。", "原文展示必须保留漏印现象；学习和迁移时必须补回 to。"],
  ["exaggerate-in-court", "exaggerate their stories in court", "exaggerate + account/story + in court", "动宾 + 场合状语", "在法庭上夸大自己的说法", "被鼓励的动作内容", "exaggerate 直接接被夸大的叙述；in court 说明行为发生的司法场合。", "A witness must not exaggerate a story in court.", "证人不得在法庭上夸大陈述。", "exaggerate 已含‘夸大’，不再搭配 more 表同义。"],
  ["ensure-guilty-verdicts", "ensure guilty verdicts", "ensure + outcome", "动宾目的结构", "确保出现有罪裁决", "to do 目的状语的核心", "ensure 后直接接所确保的结果；与 assure sb、guarantee a promise 的焦点不同。", "False evidence may ensure a guilty verdict.", "虚假证据可能促成有罪裁决。", "assure 通常接人；confide 表吐露秘密。"],
];

const phrase = (seed: PhraseSeed): PhraseKnowledge => {
  const [key, source, canonical, type, meaning, grammarRole, rule, exampleEnglish, exampleChinese, pitfall] = seed;
  return {
    key,
    sourceExpression: source,
    canonical,
    type,
    meaning,
    summary: `${meaning}。${rule}`,
    grammarRole,
    structures: [{
      pattern: canonical,
      meaning,
      rule,
      examples: [{ english: exampleEnglish, chinese: exampleChinese }],
    }],
    pitfalls: [pitfall],
  };
};

export const cloze2001PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(
  seeds.map((seed) => [seed[0], phrase(seed)]),
);

export const cloze2001PhraseAliases: Record<string, string> = {
  ...Object.fromEntries(seeds.flatMap((seed) => [[seed[1].toLowerCase(), seed[0]], [seed[2].toLowerCase(), seed[0]]])),
  "make the european convention on human rights legally binding": "make-convention-binding",
  "a tightening of legal controls": "tightening-of-controls",
  "be entitled to privacy": "entitled-to-privacy",
  "lay down that": "lay-down-that",
  "be sentenced to life sentences": "sentenced-to-life",
  "be said to have received payments": "said-to-have-received",
  "tell their stories to newspapers": "tell-stories-to-newspapers",
};

export const cloze2001CollocationGlosses: Record<string, { meaning: string; note?: string }> = Object.fromEntries(
  seeds.map((seed) => [seed[1].toLowerCase(), { meaning: seed[4], note: seed[6] }]),
);

export const cloze2001FamilyGlosses: Record<string, string> = {
  authorization: "授权；批准",
  binding: "有约束力的",
  encouragement: "鼓励；促使",
  entitlement: "应得权利；法定资格",
  interpretation: "解释；阐释",
  publication: "发表；出版",
  regulation: "监管；规章",
};

export const cloze2001WordKnowledge: Record<string, WordKnowledge> = {
  ensure: {
    grammarRole: "及物动词；本句接结果名词 guilty verdicts",
    grammarSummary: "ensure + outcome 表确保某个结果发生；assure 通常先接被安慰或被保证的人。",
    structures: [{ pattern: "ensure + noun / that-clause", meaning: "确保某结果或确保……", rule: "ensure 后直接接结果；不使用 assure sb 的人际保证结构。", examples: [{ english: "The rule ensures a fair trial.", chinese: "该规则确保审判公平。" }] }],
    pitfalls: ["不能说 assure guilty verdicts 表本句义；assure 通常接人。"],
  },
  publication: {
    grammarRole: "名词化主语；表示信件被公开发表这一事件",
    grammarSummary: "publication of + document 强调内容正式公之于众，区别于单纯 printing。",
    structures: [{ pattern: "publication of + document", meaning: "文件的发表", rule: "of 后接被发表的内容。", examples: [{ english: "Publication of the report caused debate.", chinese: "报告的发表引发了争论。" }] }],
  },
  entitle: {
    grammarRole: "被动权利结构 be entitled to + noun",
    grammarSummary: "entitle 使某人按法律、规则或身份有权获得某物。",
    structures: [{ pattern: "be entitled to + noun / doing", meaning: "有权享有……", rule: "to 是介词，后接名词或动名词。", examples: [{ english: "Everyone is entitled to privacy.", chinese: "人人都有权享有隐私。" }] }],
    pitfalls: ["不要写 be entitled to do 来机械表达所有权利；具体结构需看 entitle 的宾语补足关系。"],
  },
};
