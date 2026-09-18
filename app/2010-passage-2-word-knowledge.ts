import type { WordKnowledge } from "./knowledge-base";

const k = (pattern: string, meaning: string, grammarRole: string, rule: string): WordKnowledge => ({
  grammarRole,
  grammarSummary: rule,
  structures: [{ pattern, meaning, rule }],
});

// 这些关系经逐个来源确认；题干/选项不能借用其兼容定位句的词条结构。
export const passage2010P2SourceWordKnowledge: Record<string, Record<string, WordKnowledge>> = {
  "2010-p2-s1": {
    be: k("was + addressing", "当时正在讲话", "过去进行时助动词", "was 与 addressing 构成过去进行时；a small gathering 是 address 的宾语，不是系表结构。"),
    have: k("had + invited", "事先已经邀请", "过去完成时助动词", "had invited 表邀请先于叙述者讲话；had 不是拥有，invited 是过去分词。"),
    that: k("group that had invited men to join them", "邀请男性加入的团体", "作主语的关系代词", "that 回指 group，在定语从句中作 had invited 的主语；不能把它当作不充当成分的内容连接词。"),
    to: k("invite somebody to do something", "邀请某人做某事", "不定式标记", "to join them 是 invited 的宾语补足语；men 同时是 join 的逻辑主语。"),
  },
  "2010-p2-s2": {
    have: k("had been + adjective", "此前一直处于某状态", "过去完成时助动词", "had been particularly talkative 中 been 是 be 的过去分词，talkative 是形容词表语；没有 been doing，不是过去完成进行时。"),
    be: k("had been particularly talkative", "此前格外健谈", "完成时中的系动词", "been 后接形容词 talkative；particularly 修饰健谈的程度。"),
    and: k("ideas and anecdotes", "看法与趣闻", "连接并列宾语", "and 连接两个名词，两者都作 offering 的宾语。"),
    while: k("one man had been ... while his wife sat ...", "男子很健谈，而妻子沉默地坐着", "对照兼同时关系的连接词", "while 连接两个有主谓的分句，突出同一场合下夫妻表现相反，不表示让步。"),
  },
  "2010-p2-s3": {
    of: k("the end of the evening", "晚间聚会接近结束的时段", "限定时间范围的介词", "of the evening 后置限定 end；整个 Toward the end of the evening 修饰 commented 的发生时间。"),
    that: k("comment that ... complain that ...", "谈到女性抱怨的内容", "嵌套内容从句的连接词", "第一个 that 从句作 commented 的宾语；第二个作 complain 的宾语。两处 that 都不在从句内部充当主语或宾语。"),
    to: k("talk to somebody", "与某人交谈", "引出交谈对象的介词", "to them 后接宾格代词 them，指妻子们；不含不定式。don't talk to them 否定与妻子交谈，不等于完全不说话。"),
  },
  "2010-p2-s5": {
    and: k("gestured ... and said ...", "做手势并说道", "连接共用主语的并列谓语", "gestured 与 said 都由 He 发出，并同用一般过去时；said 后的引语有自己的主系表。"),
  },
  "2010-p2-s6": {
    and: k("puzzled and hurt", "困惑而且委屈的", "连接并列表语", "两个形容词性成分共同放在系动词 looked 后；不是 and 连接两个新动作。"),
  },
  "2010-p2-s7": {
    it: k("It is true", "这一说法确实如此", "回指前述命题的主语", "It's 是 It is；It 回指妻子才是家中话多者的说法，不是形式主语，后面也没有后置真正主语。"),
  },
  "2010-p2-s8": {
    have: k("have nothing to say", "没有什么可说的", "实义动词与宾语", "have 后接 nothing 作宾语；to say 后置修饰 nothing，不构成完成时。"),
    to: k("nothing to say", "没有可说的内容", "后置修饰语中的不定式标记", "nothing 是 say 的逻辑宾语；to say 说明有什么可说，不表示回家的目的。"),
  },
  "2010-p2-s9": {
    if: k("If + past simple, ... would + verb", "要不是……就会……", "虚拟条件从句的连接词", "didn't keep 与 we'd spend 配合，假设妻子没有维持交谈；这与她实际持续发起谈话的情况相反，不是叙述某个已发生的过去晚上。"),
    keep: k("keep + object + doing", "使某事持续进行", "动词、宾语和宾语补足语", "the conversation 是宾语，going 是宾语补足语，conversation 与 go 构成主动关系。"),
  },
  "2010-p2-s10": {
    that: k("the irony that + content clause", "这一反差的具体内容是……", "同位语内容从句的连接词", "that 解释 irony 的内容，不代指 irony 作从句主语；内部 although 从句让步，they talk less at home 是内容从句主干。"),
    although: k("although A, B", "尽管 A，B 却成立", "让步从句的连接词", "让步范围是男性在公开场合往往比女性话多；后面的他们在家话少构成反差，原文没有另加 but。"),
    to: k("tend to talk", "往往交谈", "tend 补足语中的不定式标记", "to 后接 talk 原形；tend to 表倾向，不表示绝无例外。"),
    more: k("talk more than women", "比女性说得更多", "修饰动词的比较级副词", "more 修饰 talk，than women 给出比较对象；没有 the more..., the more... 的关联比较结构。"),
  },
  "2010-p2-s11": {
    and: k("And + this pattern ...", "接着说明这一模式的后果", "承接前文的句间连接词", "And 将公共场合与家中谈话反差，推进到该模式对婚姻的破坏，不是连接两个名词。"),
    be: k("is + wreaking", "正在造成破坏", "现在进行时助动词", "is 与 wreaking 构成谓语；havoc 是 wreak 的宾语。"),
    with: k("wreak havoc with something", "对某事造成严重破坏", "引出受损对象的介词", "with marriage 说明婚姻是受到破坏的对象；这里不是 with + 名词 + 分词的复合结构。"),
  },
  "2010-p2-s12": {
    be: k("was observed by somebody", "由某人观察到", "一般过去时被动助动词", "was observed 构成被动谓语；This pattern 是被观察的模式，by 引出观察者 Andrew Hacker。"),
  },
  "2010-p2-s13": {
    that: k("reports that + clause", "报告称……", "引出报告内容的连接词", "that 从句作 reports 的宾语；真正的内部主语是 most of the women，gave 是主要谓语。"),
    of: k("most / a few of + definite plural noun", "特定群体中的大多数／少数", "引出数量范围的介词", "most of the women 与 only a few of the men 都限定在研究涉及的人群中；不是全体女性与男性的人口比例。"),
    only: k("only a few of the men", "这些男性中只有少数", "限制数量短语的副词", "only 修饰 a few，突出数量少；原句没有 if，不能讲成 only if 条件结构。"),
    few: k("a few of the men", "这些男性中的少数人", "名词性数量表达", "a few 肯定有一些，only 再强调少；不同于没有 a 的 few 所突出的几乎没有。"),
    as: k("give A as the reason for B", "把 A 列为 B 的原因", "说明归因身份的介词", "gave 的宾语是 lack of communication，as the reason 说明其被列为什么；as 后没有主谓，不是时间从句。"),
    for: k("the reason for their divorces", "他们离婚的原因", "引出被解释事件的介词", "for their divorces 补足 reason，说明什么事件的原因；不是目的或持续时长。"),
    talk: k("the book Divorce Talk", "《离婚谈话》这本书", "书名中的名词", "Talk 是书名组成部分，整体补充说明 book；这里不接交谈对象，也不是动词谓语。"),
  },
  "2010-p2-s14": {
    of: k("rate of nearly 50% / millions of cases / epidemic of failed conversation", "近百分之五十的比率／数百万案例／沟通失败的泛滥", "分别限定数值、数量范围与内容", "三个 of 所接名词分别补足 rate、millions、epidemic；不能把离婚率的百分比改成沟通失败在离婚原因中的占比。"),
    nearly: k("nearly + percentage", "接近某百分比", "修饰数值的程度副词", "nearly 限定 50%，表示接近而非精确等于；该数值属于 divorce rate。"),
    that: k("that amounts to ...", "上述情况意味着数量达到……", "指示代词作主语", "that 承接前文与沟通有关的离婚归因情况，直接作 amounts 的主语；不是从句引导词。"),
    to: k("amount to + quantity", "数量达到……", "数量补足语中的介词", "amounts 是不及物动词，to 引出 millions of cases；不是 to 加动词的不定式。"),
    give: k("Given + noun phrase", "鉴于某项情况", "依据状语中的介词", "Given 后接 the current divorce rate，提出判断背景；此处不是 give 的被动谓语，也没有完成时。"),
  },
  "2010-p2-s15": {
    research: k("in my own research", "在我自己的研究中", "范围状语的名词中心", "research 表研究活动，通常不可数；my own 限定作者自己的研究，不能擅自加复数。"),
    such: k("such as + doing A or doing B", "例如做 A 或做 B 这样的情形", "举例表达的组成部分", "such as 后列举事业牺牲与家务分担不公，两个例子都属于 tangible inequities；不是完整从句。"),
    as: k("such as + examples", "例如……", "举例介词表达的组成部分", "as 与 such 组成整体，引出 having given up ... 和 doing ... 两个并列实例；不取当……时或作为义。"),
    have: k("having + past participle", "此前已经做过……", "非谓语完成式助动词", "having given up 是主动完成式，表示放弃先于所述抱怨语境；它没有独立主语与限定时态，不是过去完成时从句。"),
    chance: k("the chance for a career", "发展事业的机会", "带介词补足语的名词", "for a career 说明哪方面的机会；这里不是 chance of doing 所表示的概率。"),
    for: k("a chance for a career", "发展事业的机会", "限定机会内容的介词", "for a career 后置限定 chance，career 是名词；不要换成持续多久或种子用途的解释。"),
    to: k("to accompany a husband to his", "为了陪伴丈夫发展他的事业", "先为不定式标记，后为介词", "第一个 to 接 accompany，表放弃事业机会的目的；第二个 to 接名词性物主代词 his，省略的内容是 career。"),
    far: k("far + comparative", "远远更……", "加强比较程度的副词", "far 加强 more，表示所承担家务远超应有份额；原文不是 far-reaching 复合形容词。"),
    more: k("far more than their share", "远超过他们应承担的份额", "名词性比较数量表达", "more 是 doing 的数量性宾语中心，than their share 提供比较基准；不是越……越……的双分句。"),
    of: k("their share of daily life-support work", "他们应分担的日常生活事务份额", "引出份额所属整体的介词", "of work 补足 share；like 后的清洁、做饭和社交安排又具体举例说明 work。"),
    and: k("cleaning, cooking and social arrangements", "清洁、做饭和社交安排", "连接并列举例项", "三个名词性表达共同作 like 的宾语，and 连接最后一项；不要让 social arrangements 变成新谓语。"),
    social: k("social arrangements", "社交活动的安排", "修饰 arrangements 的形容词", "social 指与他人来往的社交事务，与清洁和做饭一起列为日常生活工作；不是宏观社会压力。"),
    share: k("one's share of work", "某人应承担的工作份额", "比较基准中的名词", "their share 作 than 的比较基准；这里 share 不表示分享动作，也不是股票。"),
  },
  "2010-p2-s16": {
    instead: k("not on A. Instead, ... on B", "重点不在 A，而在 B", "跨句纠正焦点的副词", "Instead 独立位于句首，把上一句排除的具体不公转向交流问题；原文没有 instead of 短语。"),
    to: k("listen to somebody", "听某人说话", "引出倾听对象的介词", "listen 为不及物动词；to 后接 me，指提出抱怨的妻子，不是不定式。"),
  },
  "2010-p2-s17": {
    to: k("talk to somebody", "与某人交谈", "引出交谈对象的介词", "to me 指与这位妻子交谈；doesn't 否定的是该关系，不能扩大成丈夫不与任何人说话。"),
  },
  "2010-p2-s18": {
    as: k("as + subject + observed + time", "正如某人以前观察到的", "评注性非限制性关系从句", "as 回指与作者发现相同的内容，并对应 observed 的宾语；插入的 as Hacker observed years before 不表示拍卖同时发生的时间。"),
    that: k("found that A, but B", "发现 A，但 B", "引出发现内容的连接词", "that 后两部分在宾语从句内部由 but 并列：多数妻子有此期待，极少丈夫也如此；不是 that 只管前半句。"),
    to: k("want somebody to be + complement", "希望某人成为……", "不定式宾语补足语标记", "their husbands 是 want 的宾语，也是 to be 的逻辑主语；conversational partners 是 be 的表语。"),
    be: k("to be conversational partners", "成为交谈伙伴", "不定式中的系动词", "be 后接名词性表语 conversational partners，说明丈夫被期望承担的角色；不是被动语态。"),
    and: k("first and foremost", "首先；最重要的是", "固定优先顺序表达中的连接词", "first 与 foremost 共同强调最重要的角色，不是两个不同名次，也不分开解释为两个事件。"),
    few: k("few + plural noun", "很少有……", "数量限定词", "few husbands 无 a，突出持有同一期待的丈夫很少；与 most wives 形成数量反差。"),
    of: k("an expectation of somebody", "对某人抱有的期待", "引出期待对象的介词", "of their wives 指丈夫对妻子抱有何种期待；不能按所属义改成妻子提出的期待。"),
    share: k("share an expectation", "持有同样的期待", "及物动词", "share 后接 this expectation 作宾语；不是第15句 their share 中的名词份额。"),
  },
  "2010-p2-s19": {
    that: k("the image that best represents ...", "最能代表该情形的形象", "作主语的关系代词", "that 回指 image，并在定语从句中作 represents 的主语；真正主句谓语是后面的 is。"),
    be: k("the image is the stereotypical cartoon", "该形象就是那幅惯常漫画", "主句系动词", "is 连接主语 image 与名词表语 cartoon；不是与 sitting 构成进行时，sitting 在后面修饰 man。"),
    of: k("a cartoon of a man / the back of it", "画着男人的漫画／报纸的背面", "分别引出画面内容与所属对象", "of a man 补充 cartoon 画着谁；of it 限定 back 属于哪件东西，it 指 newspaper。"),
    with: k("with + noun + past participle", "伴随着某物被……的状态", "with 复合结构", "a newspaper 是 with 的宾语，held up 是过去分词宾补；报纸与举起构成被动关系，不能讲成 with + noun + doing。"),
    while: k("a man sitting ... while a woman glares ...", "男人坐着读报，而女人瞪着报纸", "同时画面对照的连接词", "while 引出有主谓的女人场景，并与男人场景对照；后面的 wanting to talk 仍由 woman 发出。"),
    it: k("the back of it", "报纸的背面", "介词 of 的代词宾语", "it 回指 a newspaper，不是男人、脸或整幅漫画；此处不存在形式主语。"),
    to: k("want to do something", "想要做某事", "want 补足语中的不定式标记", "to talk 补足 wanting 的内容；wanting 的逻辑主语是 woman，不能让报纸执行交谈。"),
  },
  "question-201026-prompt": {
    what: k("What is + subject?", "某事物是什么？", "前置的疑问表语", "What 问期待的内容；主语中心是 main expectation，is 与该单数中心一致，不是 what 引导主语从句。"),
    be: k("What is most wives' main expectation?", "多数妻子的主要期待是什么？", "疑问句中的系动词", "is 连接 expectation 与疑问表语 What；妻子为复数不改变 expectation 这个单数主语中心。"),
    of: k("an expectation of somebody", "对某人的期待", "引出期待对象的介词", "of their husbands 说明妻子对丈夫的期待；wives' 才标明期待的提出者。"),
  },
  "question-201026-option-A": {
    to: k("talk to somebody", "与某人交谈", "交谈对象介词", "Talking 是动名词，to them 是介词补足语；them 承接题干中的妻子们。"),
  },
  "question-201026-option-B": {
    trust: k("trust somebody", "信任某人", "及物动词的动名词形式", "Trusting 直接接宾语 them；该选项表达信任妻子，不因其不是正确项就改译为交谈。"),
  },
  "question-201026-option-C": {
    support: k("support somebody's career", "支持某人的事业", "及物动词的动名词形式", "Supporting 直接接 their careers，their 指妻子们；不是名词 support for 的结构。"),
  },
  "question-201026-option-D": {
    share: k("share housework", "分担家务", "及物动词的动名词形式", "Sharing 后接 housework 作宾语，表示分担劳动；不是名词 share 的份额义。"),
  },
  "question-201027-prompt": {
    judge: k("judging from + evidence", "根据某依据判断", "固定评注表达", "Judging from the context 提示读者依据语境判断；不把 phrase 当作 judging 的动作发出者，也不是法官这个名词。"),
    mean: k("an expression means + meaning", "某表达意为……", "第三人称单数谓语", "means 的主语是 the phrase；空格给出词组含义，不是 means 作名词表示手段，也不是 mean to do 的打算。"),
  },
  "question-201027-option-A": {
    generate: k("generate motivation", "产生动力", "动名词与名词宾语", "generating 后接 motivation；结构本身不表示进行时，词义须与 wreaking havoc 的负面含义区别。"),
  },
  "question-201027-option-B": {
    exert: k("exert influence", "施加影响", "动名词与名词宾语", "exerting 直接接 influence，后者为名词；影响本身未限定好坏，不自动等于破坏。"),
  },
  "question-201027-option-C": {
    cause: k("cause damage", "造成损害", "动名词与不可数名词宾语", "causing 后接 damage，保留原短语造成负面损害的含义；damage 不是 damages 的赔偿金义。"),
  },
  "question-201027-option-D": {
    create: k("create pressure", "造成压力", "动名词与名词宾语", "creating 直接接 pressure；有压力与已造成严重损害并不完全等同。"),
  },
  "question-201028-prompt": {
    all: k("All of the following ... except ...", "下列各项中除……外全部……", "数量代词主语及排除范围", "All 是主语，of the following 限定下列各项，EXCEPT 要求排除一项；不是 all the + 普通复数名词的原句。"),
    of: k("all of the following", "下列所有各项", "限定全部所指范围的介词", "the following 为名词性表达，指接下来的选项；of 不是表达所属人物。"),
    be: k("All ... are true", "所有各项均符合事实", "复数主语后的系动词", "are 后接形容词 true 作表语；EXCEPT 随后排除一个例外，不是被动结构。"),
  },
  "question-201028-option-A": {
    to: k("tend to talk", "往往交谈", "不定式标记", "to 后接 talk 原形，补足 tend 的倾向内容；不引出谈话对象。"),
    more: k("talk more ... than women", "比女性说得更多", "修饰 talk 的比较级副词", "more 比较说话量，in public 限定公开场合，than women 给出比较方；不是 the more..., the more...。"),
  },
  "question-201028-option-B": {
    nearly: k("nearly 50 percent", "接近百分之五十", "修饰数值的程度副词", "nearly 不等于精确50%；整个百分比的统计总体由 of recent divorces 限定。"),
    of: k("50 percent of recent divorces", "近期离婚案例中的百分之五十", "限定百分比统计总体的介词", "of recent divorces 指出分母是近期离婚案例；正文的近50%是 divorce rate，不能将两个统计对象混同。"),
    be: k("are caused by + cause", "由某原因造成", "被动语态助动词", "are caused 构成被动谓语，by 引出选项所断言的原因；这不证明原文支持其比例。"),
  },
  "question-201028-option-C": {
    to: k("attach importance to something", "重视某事", "引出所重视对象的介词", "to communication 后接名词；不能把 to 解释为不定式标记。"),
    between: k("between + plural noun", "在所述各方之间", "后置限定 communication 的介词", "原项为 between couples，直接接复数名词；在婚姻语境说明夫妻之间的交流，不能补造原文中没有的 A and B。"),
  },
  "question-201028-option-D": {
    to: k("tend to be + adjective", "往往较为……", "不定式标记", "to be 补足 tends，more talkative 是 be 的表语；tends 表倾向而非绝对规律。"),
    be: k("be more talkative", "更加健谈", "不定式中的系动词", "be 后接形容词比较表达 more talkative，at home 限定在家的场合；不是被动或进行时。"),
    more: k("more + adjective + than ...", "比……更……", "形容词比较级的程度副词", "more 与 talkative 组成比较级；than her spouse 给出比较方，不是比较家庭数量。"),
  },
  "question-201029-prompt": {
    which: k("Which of the following can ...?", "下列哪一项能……？", "疑问代词作主语", "Which 作 can summarize 的主语，of the following 限定候选范围；不回指某个先行词，也不引导定语从句。"),
    of: k("which of the following", "下列各项中的哪一个", "限定选择范围的介词", "of 后的 the following 指真实选项；它不说明主旨属于哪个人物。"),
  },
  "question-201029-option-A": {
    more: k("more + uncountable noun", "更多的……", "修饰 research 的数量限定词", "more 限定不可数名词 research；不是修饰 deserves 的副词，也不是 the more..., the more...。"),
    research: k("deserve more research by somebody", "值得某人进一步研究", "动词宾语中的不可数名词", "research 作 deserves 的宾语，by sociologists 说明研究者；选项并未把社会学家当作道德衰败的原因。"),
  },
  "question-201029-option-B": {
    stem: k("stem from + cause", "源于某原因", "谓语与来源补足语", "stems from 断言婚姻破裂源于性别不平等；stem 是动词，from 引出原因，不是植物茎。"),
  },
  "question-201029-option-C": {
    and: k("Husband and wife", "丈夫和妻子", "连接并列主语", "and 连接两方，后面的 have 用复数形式；不是复合名词所指的一个人。"),
    have: k("have expectations from something", "期待从某事中得到某些东西", "实义动词与名词宾语", "have 接 different expectations，不构成完成时；选项范围是婚姻期待，尚未限定为交谈期待。"),
  },
  "question-201029-option-D": {
    between: k("between A and B", "在 A 和 B 之间", "后置限定 patterns 的介词", "man 与 wife 是 and 连接的两个平行名词，整组限定交谈模式所涉及的夫妻双方。"),
    and: k("between man and wife", "在丈夫与妻子之间", "连接 between 的两方", "and 两边名词平行；整个介词短语限定 patterns，而不是连接两套主句谓语。"),
    be: k("patterns are different", "模式不同", "复数主语后的系动词", "are 与复数主语 patterns 一致，different 为形容词表语。"),
  },
  "question-201030-prompt": {
    author: k("the author will probably focus on ...", "作者接下来很可能着重于……", "预测句的名词主语", "author 指本文作者；will most probably 表对紧接后文的推断，并非作者在原文明确主张某个结论。"),
  },
  "question-201030-option-A": {
    of: k("an account of something", "对某事物的介绍", "引出叙述对象的介词", "of the new book 补足 account，说明介绍哪本书；Divorce Talk 再点明书名。"),
    talk: k("the book Divorce Talk", "《离婚谈话》这本书", "书名中的名词", "Talk 与 Divorce 组成书名，作 book 的同位说明；不讲动词 talk to somebody。"),
  },
  "question-201030-option-B": {
    of: k("a description of something", "对某事物的描述", "引出描述对象的介词", "of the stereotypical cartoon 补足 description，指定末段的漫画；整项是名词短语，没有限定谓语。"),
  },
  "question-201030-option-C": {
    for: k("reasons for + event / state", "某事件或情况的原因", "引出被解释现象的介词", "for a high divorce rate 补足 reasons；讨论为何离婚率高，不表示用途或持续时长。"),
  },
  "question-201030-option-D": {
    to: k("an introduction to somebody", "对某人的介绍", "引出介绍对象的介词", "to 后接 the political scientist Andrew Hacker 这个名词短语，不是不定式；Andrew Hacker 为姓名同位说明。"),
  },
};

export function getPassage2010P2WordKnowledge(headword: string, sourceId?: string): WordKnowledge | undefined {
  return sourceId ? passage2010P2SourceWordKnowledge[sourceId]?.[headword] : undefined;
}
