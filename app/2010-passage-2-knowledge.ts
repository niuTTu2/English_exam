import type { PhraseKnowledge } from "./knowledge-base";

type PhraseSeed = [key: string, canonical: string, sources: string[], meaning: string, role: string, rule: string, english: string, chinese: string, pitfall: string];

const seeds: PhraseSeed[] = [
  ["address-audience", "address + audience", ["was addressing a small gathering"], "向听众讲话", "动宾结构；本句为过去进行时谓语与宾语", "address 是及物动词，直接接听众，不加 to；进行时使用 be addressing。", "She addressed a small gathering.", "她向一小群聚会者讲话。", "不能把 address 机械译为地址，也不要说 address to an audience 表向听众讲话。"],
  ["invite-somebody-to-do", "invite somebody to do something", ["had invited men to join them"], "邀请某人做某事", "定语从句内的谓语、宾语和宾语补足语", "somebody 是 invite 的宾语，也是 to do 的逻辑主语。", "They invited us to join the discussion.", "他们邀请我们参加讨论。", "这里用 to join，不用 invite somebody doing；join them 不加 to。"],
  ["throughout-period", "throughout + period", ["Throughout the evening"], "在整个时段内", "时间状语", "throughout 强调整段时间；后接名词时为介词，不直接引导完整主谓句。", "He remained silent throughout the meeting.", "他在整场会议期间一直沉默。", "during 只说明在某期间，不必然与 throughout 的全过程意味相同。"],
  ["offer-ideas", "offer + ideas / anecdotes", ["offering ideas and anecdotes"], "发表看法、讲述趣闻", "现在分词伴随状语中的动宾结构", "offer 接 ideas 与 anecdotes 两个并列宾语，逻辑主语与男子一致。", "She offered ideas and anecdotes during the discussion.", "她在讨论中发表看法并讲述趣闻。", "offering 本身没有限定时态，不能将其单独标为新从句。"],
  ["toward-end", "toward the end of + period", ["Toward the end of the evening"], "接近某时段结束时", "时间状语", "toward 表接近，end 后的 of 短语指出是哪一段时间的末尾。", "They reached an agreement toward the end of the meeting.", "快到会议结束时，他们达成了共识。", "toward the end 是接近结尾，不等于 throughout 所表示的全过程。"],
  ["talk-to-somebody", "talk to somebody", ["talk to them", "talk to me"], "与某人交谈", "谓语中的动词和交谈对象补足语", "talk 通常不及物，to 或 with 引出交谈对象；本句的对象不可省掉，否则改变否定范围。", "He does not talk to me at home.", "他在家不与我交谈。", "talk to me 不表示告诉我某件具体事情；tell 通常另需内容宾语。"],
  ["nod-in-agreement", "nod in agreement", ["nodded in agreement"], "点头表示赞同", "谓语和态度状语", "nod 描述动作，in agreement 说明动作表达的态度；过去式双写 d。", "She nodded in agreement.", "她点头表示赞同。", "agreement 此处为认同状态，不是协议文本。"],
  ["gesture-toward", "gesture toward somebody", ["gestured toward his wife"], "朝某人做手势示意", "谓语及方向状语", "toward 引方向；手势的具体含义需由上下文判断。", "He gestured toward the door.", "他朝门的方向示意了一下。", "gesture 不自动表示指责或愤怒，不应在译文中补入。"],
  ["burst-into-laughter", "burst into laughter", ["burst into laughter"], "突然大笑起来", "不及物动词固定搭配", "burst 的过去式仍为 burst；into 后接 laughter 这种表示突然出现行为状态的名词。", "The audience burst into laughter.", "听众突然大笑起来。", "laughter 不可数；不要写 burst into laugh 或 a laughter。"],
  ["look-adjective", "look + adjective", ["looked puzzled and hurt"], "显得处于某种状态", "系动词与表语", "look 后接形容词作表语，本句用 and 连接 puzzled 与 hurt 两种感受。", "He looked puzzled and hurt.", "他显得既困惑又委屈。", "系动词后的状态用形容词，不能因中文有‘地’而误用副词。"],
  ["come-home-from-work", "come home from work", ["come home from work"], "下班回家", "时间从句中的谓语和方向、来源状语", "home 在 come home 中为方向副词，前面不加 to；from work 说明来处。", "I usually come home from work at six.", "我通常六点下班回家。", "不能写 come to home；work 此处是工作场所或上班状态，不是艺术作品。"],
  ["nothing-to-say", "nothing to say", ["nothing to say"], "没有什么可说的", "不定代词与后置不定式", "nothing 为中心词，to say 后置修饰，nothing 是 say 的逻辑宾语。", "I have nothing to say.", "我没有什么可说的。", "nothing 已含否定，不再加 not 构成无意的双重否定。"],
  ["keep-object-doing", "keep something doing", ["keep the conversation going"], "使某事持续进行", "动词、宾语和现在分词宾语补足语", "宾语与 doing 构成主动关系：conversation 在继续进行。", "Her questions kept the conversation going.", "她提出的问题让谈话继续了下去。", "keep doing 是主语自己持续做，keep something doing 是让宾语所指的事情持续。"],
  ["in-silence", "in silence", ["in silence"], "沉默地；在沉默中", "状态或方式状语", "in 后接名词 silence；相应副词为 silently，两者是不同句法形式。", "They spent the evening in silence.", "他们默默地度过了那个晚上。", "不要写 in silent，silent 是形容词。"],
  ["tend-to-do", "tend to do something", ["tend to talk"], "往往会；倾向于做某事", "动词与不定式补足语", "tend 表一般倾向而非没有例外的规律；to 后用动词原形。", "People tend to talk more when they feel comfortable.", "人们感到自在时往往说得更多。", "不能把 tend to 加强为 always；题目选项须保留倾向性。"],
  ["in-public-situations", "in public situations", ["in public situations"], "在公共或有外人在场的场合", "场合状语", "public situations 与 at home 构成范围对照，分别限制交谈表现。", "He is talkative in public situations.", "他在公共场合很健谈。", "公开场合不等于仅在政府机构，也包括本文的社交聚会。"],
  ["wreak-havoc", "wreak havoc with / on something", ["wreaking havoc with marriage"], "对某事造成严重破坏", "谓语固定搭配及受影响对象", "wreak 是及物动词，havoc 是不可数宾语；with/on 引受损对象，原文用 with。", "The storm wreaked havoc with transport.", "风暴严重扰乱了交通。", "不能只解释为一般的施加影响，必须保留 havoc 的强烈负面意义。"],
  ["in-late-decade", "in the late + decade", ["in the late 1970s"], "在某年代后期", "时间状语", "1970s 表1970—1979这一年代，late 缩小到后期；年代前用 in。", "The change began in the late 1970s.", "这一变化始于20世纪70年代后期。", "不要把1970s读成1970年，也不要在普通复数年代中加入所有格撇号。"],
  ["only-a-few-of", "only a few of + definite plural noun", ["only a few of the men"], "这些人中只有少数", "数量名词短语；本句为插入对照成分", "a few 表有一些，only 强调数量少；of 后用有明确范围的复数名词。", "Only a few of the men agreed.", "这些男性中只有少数赞同。", "few 强调几乎没有；a few 则肯定仍有一些，不应混同。"],
  ["lack-of-something", "lack of something", ["lack of communication"], "缺乏某事物", "名词与 of 补足语", "lack 作名词时常接 of；作及物动词时直接接宾语。", "Lack of communication can damage a relationship.", "缺乏沟通可能损害一段关系。", "不能把名词 lack of 与动词 lack 的句法直接混用。"],
  ["reason-for-something", "the reason for something", ["the reason for their divorces"], "某事发生的原因", "名词与后置补足语", "for 后接被解释的事件；give A as the reason for B 是将A列为B的原因。", "She gave stress as the reason for leaving.", "她把压力列为离开的原因。", "当事人陈述的原因不自动等于已统计证实的全部原因占比。"],
  ["given-fact", "given + noun phrase", ["Given the current divorce rate"], "考虑到；鉴于", "依据状语", "given 在此为介词，后接作为判断背景的名词短语，不需要为其补主语。", "Given the limited time, we must focus.", "鉴于时间有限，我们必须集中精力。", "此处不是 give 的被动谓语，也不是一个已有主谓的条件从句。"],
  ["amount-to-number", "amount to + quantity", ["amounts to millions of cases"], "总计为；相当于某数量", "动词和介词数量补足语", "amount 作不及物动词，通过 to 引数量；millions of 表概数。", "The cost amounts to a million dollars.", "费用总计一百万美元。", "amount 在本句不是名词‘数量’，也不能漏掉 to。"],
  ["virtual-epidemic", "a virtual epidemic of something", ["a virtual epidemic"], "几乎达到流行病程度的普遍现象", "名词短语；本句作比喻性同位评价", "virtual 这里是‘几乎等同于’，epidemic 用于比喻频繁发生的问题。", "The region faced a virtual epidemic of theft.", "这一地区的盗窃现象几乎泛滥成灾。", "不要当作虚拟现实，也不能把修辞比喻报道成医学流行病。"],
  ["focus-on-object", "focus on something", ["focused not on tangible inequities", "focused on communication"], "集中关注某事", "谓语和关注对象补足语", "on 引对象；not on A 与后句 Instead...on B 表示焦点不在A而在B。", "Their complaints focused on communication.", "他们的抱怨集中在沟通问题上。", "排除主要关注点不等于否认事业牺牲或家务不公平存在。"],
  ["give-up-opportunity", "give up + opportunity", ["given up the chance"], "放弃机会", "完成形式非谓语内部的动宾搭配", "give up 可接名词或动名词；having given up 表放弃发生在比较研究发现之前。", "She gave up the chance to study abroad.", "她放弃了出国学习的机会。", "不能把 given up 当成被动，因为前面有 having 构成主动完成形式。"],
  ["more-than-share", "far more than one's share", ["far more than their share"], "远超过某人应承担的份额", "数量比较结构", "far 加强比较级 more，one's share 为比较基准；本句是家务分工份额。", "She did far more than her share of the work.", "她做的工作远超过自己应承担的份额。", "这里 share 是名词，不是动词分享，也不是股票。"],
  ["daily-life-work", "daily life-support work", ["daily life-support work"], "维持日常生活的事务", "名词短语", "daily 与 life-support 共同修饰 work，下文用清洁、做饭、社交安排作例子。", "They shared daily life-support work such as cooking.", "他们分担做饭等维持日常生活的事务。", "本句无医疗设备语境，不应译为医院生命支持工作。"],
  ["listen-to-somebody", "listen to somebody", ["listen to me"], "听某人说话", "不及物动词和对象补足语", "listen 强调主动倾听，介词 to 引出被倾听的人。", "Please listen to me.", "请听我说。", "hear 重感知结果；listen 重主动行为，不能机械互换。"],
  ["first-and-foremost", "first and foremost", ["first and foremost"], "首先；最重要的是", "优先顺序状语", "作为整体强调最重要的事项，可插入句中；不意味着其他角色都不存在。", "A partner should be, first and foremost, a good listener.", "伴侣首先应该是一个好的倾听者。", "不是两个不同的名次，也不应只按时间先后理解。"],
  ["conversational-partner", "conversational partner", ["conversational partners"], "交谈伙伴", "名词短语；本句为不定式中的表语", "conversational 为形容词修饰 partner；复数 partners 对应复数 husbands。", "They want to be conversational partners.", "他们希望成为能够相互交谈的伙伴。", "此处不是商业合伙人，也不是要求另找伴侣。"],
  ["share-expectation", "share an expectation", ["share this expectation"], "持有同样的期待", "动宾搭配", "share 表共同持有同一想法，不是把期待分成若干份；of somebody 说明期望对象。", "Few husbands share this expectation.", "很少有丈夫持有同样的期待。", "不要套用 their share of work 中名词‘份额’的意思。"],
  ["in-short-summary", "in short", ["In short"], "简言之", "总结衔接语", "用于概括前文，通常用逗号与主句隔开。", "In short, communication matters.", "简言之，沟通很重要。", "与 in the short term（短期内）不同，本结构不限定时间。"],
  ["at-meal-table", "at the breakfast table", ["at the breakfast table"], "在早餐桌旁", "地点状语", "at 描述人在桌旁的位置或用餐情境，on 则通常表示物体在桌面上。", "He sat at the breakfast table.", "他坐在早餐桌旁。", "不能译成人坐在早餐桌面上。"],
  ["with-noun-participle", "with + noun + past participle", ["with a newspaper held up in front of his face"], "某物处于被……的伴随状态", "with 复合结构；伴随状语", "a newspaper 是 with 的宾语，held up 是过去分词宾补，两者为被动关系。", "He sat with a newspaper held up in front of his face.", "他坐着，报纸举在脸前。", "没有独立的限定动词，不能把 with 结构标成完整从句。"],
  ["in-front-of-object", "in front of something", ["in front of his face"], "在某物前面", "位置状语", "in front of 为整体位置表达；his face 是参照物，报纸位于其前面。", "She stood in front of the house.", "她站在房屋前面。", "in front of 指外部前方，in the front of 常指某空间内部前部。"],
  ["glare-at-object", "glare at somebody / something", ["glares at the back of it"], "怒视；瞪着某人或某物", "谓语与目光对象补足语", "at 引目光所向；the back of it 指报纸背面，it 必须回指 newspaper。", "She glared at the back of the newspaper.", "她瞪着报纸的背面。", "glare 比 look 更带不满或怒意；不能把 it 错指为男人的脸。"],
];

export const passage2010P2PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, canonical, , meaning, grammarRole, rule, english, chinese, pitfall]) => [key, {
  key, canonical, type: "交谈与婚姻语篇中的词组/句法结构", meaning, summary: `${meaning}。${rule}`, grammarRole,
  structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall],
}]));

export const passage2010P2PhraseAliases: Record<string, string> = Object.fromEntries(seeds.flatMap(([key, canonical, sources]) => [...sources, canonical].map(source => [source.toLowerCase(), key])));
export const passage2010P2CollocationGlosses = Object.fromEntries(seeds.flatMap(([, , sources, meaning, , rule]) => sources.map(source => [source.toLowerCase(), { meaning, note: rule }])));
Object.assign(passage2010P2PhraseAliases, {
  "communication between couples": "between-a-and-b",
  "between man and wife": "between-a-and-b",
});
Object.assign(passage2010P2CollocationGlosses, {
  "communication between couples": { meaning: "夫妻双方之间的沟通", note: "本题 couples 指夫妻关系中的双方；不能脱离婚姻语境读成多对夫妻彼此聊天。" },
  "between man and wife": { meaning: "在丈夫和妻子之间", note: "man 与 wife 用 and 平行连接，between 短语限定所比较的交谈模式属于哪两方。" },
});
export const passage2010P2FamilyGlosses: Record<string, string> = {
  talk: "交谈", talker: "爱说话的人", talkative: "健谈的", conversation: "交谈", conversational: "交谈的",
  complain: "抱怨", complaint: "抱怨；不满意见",
};
