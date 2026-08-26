import type { VocabEntry } from "./data";

type Structure = NonNullable<VocabEntry["structures"]>[number];
type ReferenceDetail = NonNullable<VocabEntry["collocationDetails"]>[number];

export type PhraseKnowledge = {
  key: string;
  canonical: string;
  type: string;
  meaning: string;
  summary: string;
  grammarRole: string;
  structures: Structure[];
  pitfalls?: string[];
};

export type WordKnowledge = {
  grammarRole: string;
  grammarSummary: string;
  structures: Structure[];
  pitfalls?: string[];
};

const s = (
  pattern: string,
  meaning: string,
  rule: string,
  examples?: Structure["examples"],
): Structure => ({ pattern, meaning, rule, examples });

const phraseGuides: Record<string, PhraseKnowledge> = {
  "between-a-and-b": {
    key: "between-a-and-b",
    canonical: "between A and B",
    type: "介词结构",
    meaning: "在 A 和 B 之间；连接两个对应端点、对象或范围",
    summary: "between 后先接 A，再用 and 引出 B。原句中整个介词短语后置修饰 gap。",
    grammarRole: "介词短语；本句作后置定语，说明 gap 存在于哪两项之间",
    structures: [
      s("between A and B", "在 A 和 B 之间", "A、B 必须是语法上平行的名词、代词或 -ing 结构。", [
        { english: "There is a gap between income and spending.", chinese: "收入与支出之间存在差距。" },
      ]),
      s("between + 复数名词 / 宾格代词", "在若干彼此区分的对象之间", "between 并非只能用于两者；重点是把对象看作相互独立的个体。", [
        { english: "The agreement was reached between the three countries.", chinese: "这三个国家之间达成了协议。" },
      ]),
      s("the difference / gap between A and B", "A 与 B 之间的差异 / 差距", "difference、gap 等名词后常接 between 结构说明比较双方。"),
    ],
    pitfalls: ["不能说 between A to B；应为 between A and B。", "among 常指未逐一区分的一群人或物；between 强调彼此独立的对象或两端。"],
  },
  "wish-to-do": {
    key: "wish-to-do",
    canonical: "wish to do sth",
    type: "动词搭配",
    meaning: "希望 / 想要做某事（较正式）",
    summary: "wish 后接 to do，表示主语本人想做某事；原句 wishes to succeed 是“想要成功”。",
    grammarRole: "谓语动词 + 不定式宾语",
    structures: [
      s("wish to do sth", "希望做某事", "语气较正式，主语与 do 的执行者相同。", [
        { english: "I wish to apply for the course.", chinese: "我希望申请这门课程。" },
      ]),
      s("wish sb to do sth", "希望某人做某事", "宾语 sb 是后面动作的执行者；hope 不能这样接。"),
      s("wish + that 从句", "希望与事实相反或难以实现的情况", "常配虚拟语气：对现在用过去式，对过去常用 had done。"),
    ],
    pitfalls: ["hope to do 强调未来仍可能实现；wish that 往往带有不现实或遗憾色彩。", "可以说 wish sb success，但不能说 hope sb success。"],
  },
  "wish-sb-to-do": {
    key: "wish-sb-to-do",
    canonical: "wish sb to do sth",
    type: "动词搭配",
    meaning: "希望某人做某事（较正式）",
    summary: "wish 后的 sb 是不定式动作的执行者；hope 不能使用 hope sb to do 结构。",
    grammarRole: "谓语动词 + 宾语 + 不定式宾补",
    structures: [
      s("wish sb to do sth", "希望某人做某事", "用于较正式表达；sb 与 to do 构成逻辑主谓关系。", [
        { english: "We wish you to attend the meeting.", chinese: "我们希望你参加会议。" },
      ]),
    ],
    pitfalls: ["不能类推为 hope sb to do；应说 hope that sb will do。"],
  },
  "wish-that": {
    key: "wish-that",
    canonical: "wish + that-clause",
    type: "从句结构",
    meaning: "希望某事成为现实；常表达与事实相反或难以实现的愿望",
    summary: "wish 后接 that 从句时常使用虚拟语气；具体时态取决于愿望与现在、过去或将来的关系。",
    grammarRole: "谓语动词 + 宾语从句",
    structures: [
      s("wish (that) + 过去式", "希望现在情况不同", "表达与现在事实相反的愿望。", [
        { english: "I wish I knew the answer.", chinese: "但愿我知道答案。" },
      ]),
      s("wish (that) + had done", "希望过去情况不同", "表达对过去事实的遗憾。"),
    ],
    pitfalls: ["仍可能实现的普通未来愿望通常用 hope that，而不是机械使用 wish that。"],
  },
  "wish-sb-sth": {
    key: "wish-sb-sth",
    canonical: "wish sb sth",
    type: "双宾语搭配",
    meaning: "祝愿某人得到某事",
    summary: "sb 是祝愿对象，sth 通常是 success、luck、happiness 等表示良好结果的名词。",
    grammarRole: "谓语动词 + 间接宾语 + 直接宾语",
    structures: [
      s("wish sb + success / luck / happiness", "祝某人成功 / 好运 / 幸福", "直接宾语通常是祝福内容。", [
        { english: "I wish you every success.", chinese: "祝你一切顺利。" },
      ]),
    ],
    pitfalls: ["不能说 hope sb success；hope 通常接 for、to do 或 that 从句。"],
  },
  "keep-a-gap": {
    key: "keep-a-gap",
    canonical: "keep a gap between A and B",
    type: "动词搭配",
    meaning: "使 A 与 B 之间保持差距 / 差额",
    summary: "keep 在这里是“维持”，gap 是宾语，between A and B 说明差距的两端。",
    grammarRole: "及物动词 + 宾语 + 后置修饰",
    structures: [s("keep + 名词 + between A and B", "保持 A 与 B 之间的某种距离或差异", "between 短语通常修饰前面的名词。")],
  },
  "large-quantity-of": {
    key: "large-quantity-of",
    canonical: "a large quantity of + n.",
    type: "数量结构",
    meaning: "大量的……",
    summary: "quantity 后必须有 of；可接可数名词复数或不可数名词，谓语通常由 quantity 的单复数决定。",
    grammarRole: "数量限定结构",
    structures: [
      s("a large quantity of + 不可数名词 / 可数名词复数", "大量的……", "a quantity of 作主语时，正式语法通常用单数谓语。"),
      s("large quantities of + n.", "大量的……", "quantities 为复数，作主语时通常接复数谓语。"),
    ],
    pitfalls: ["不要漏掉 of。", "amount of 主要接不可数名词；number of 主要接可数名词复数。"],
  },
  "instead-of": {
    key: "instead-of",
    canonical: "instead of + n. / pron. / doing",
    type: "介词结构",
    meaning: "而不是……；代替……",
    summary: "of 是介词，因此后接名词、代词或动名词，不能直接接动词原形。",
    grammarRole: "介词短语；表示替代或取舍",
    structures: [
      s("instead of + doing", "而不是做……", "doing 与被替代的动作保持语义对应。", [
        { english: "He stored the grain instead of consuming it.", chinese: "他把粮食储存起来，而不是把它吃掉。" },
      ]),
      s("use A instead of B", "用 A 代替 B", "A 是实际采用项，B 是被替代项。"),
    ],
    pitfalls: ["instead 可单独作副词；instead of 后必须带宾语。"],
  },
  "support-oneself-family": {
    key: "support-oneself-family",
    canonical: "support oneself / one's family",
    type: "动词搭配",
    meaning: "养活自己 / 家人",
    summary: "support 在生活和经济语境中常表示“供养”，不能一律翻译成“支持”。",
    grammarRole: "及物动词 + 宾语",
    structures: [s("support + oneself / family", "维持自己或家人的生活", "宾语是被供养的人。")],
  },
  "only-if": {
    key: "only-if",
    canonical: "only if + clause",
    type: "条件结构",
    meaning: "只有……才……",
    summary: "only if 引出必要条件：条件不满足，主句结果就不能成立。",
    grammarRole: "从属连词结构；引导条件状语从句",
    structures: [
      s("主句 + only if + 条件从句", "只有满足该条件，主句才成立", "正常语序。"),
      s("Only if + 条件从句 + 部分倒装主句", "只有……才……", "only if 置于句首时，主句通常部分倒装。", [
        { english: "Only if you work hard can you succeed.", chinese: "只有努力，你才能成功。" },
      ]),
    ],
    pitfalls: ["if only 的顺序相反，表示“要是……就好了”。"],
  },
  "as-noun": {
    key: "as-noun",
    canonical: "as + noun",
    type: "介词结构",
    meaning: "作为……；以……身份 / 用途",
    summary: "as 后接名词，说明身份、角色或用途；原句 as seed 表示“作为种子”。",
    grammarRole: "介词短语；说明用途",
    structures: [s("use A as B", "把 A 用作 B", "A 是被使用的对象，B 是其用途或身份。")],
    pitfalls: ["as 强调“作为”，like 强调“像”；两者不能机械互换。"],
  },
  "insurance-against": {
    key: "insurance-against",
    canonical: "insurance against + risk / loss",
    type: "名词搭配",
    meaning: "防范某种风险或损失的保险 / 保障",
    summary: "against 后接要防范的风险；insurance for 通常接被保险的人或物。",
    grammarRole: "名词 + 介词补足语",
    structures: [s("insurance against sth", "针对某风险的保险或保障", "sth 通常是 loss、damage、accident 等风险。")],
    pitfalls: ["insurance for a house 是“房屋保险”；insurance against fire 是“火灾险”。"],
  },
  "effects-of": {
    key: "effects-of",
    canonical: "the effect(s) of A on B",
    type: "名词结构",
    meaning: "A 对 B 的影响",
    summary: "of 引出影响的来源，on 可引出承受影响的对象；原句只出现 of 部分。",
    grammarRole: "名词中心语 + 介词补足语",
    structures: [s("the effect(s) of A on B", "A 对 B 的影响", "effect 是名词；affect 通常是动词。")],
  },
  "in-order-to": {
    key: "in-order-to",
    canonical: "in order (not) to do sth",
    type: "目的结构",
    meaning: "为了（不）做某事",
    summary: "to 后接动词原形，整个不定式结构说明目的；否定词 not 放在 to 前。",
    grammarRole: "不定式目的状语",
    structures: [
      s("in order to do", "为了做……", "比单独 to do 更明确、稍正式。"),
      s("in order not to do", "为了不做……", "not 必须放在 to 前。"),
    ],
  },
  "be-self-sufficient": {
    key: "be-self-sufficient",
    canonical: "be self-sufficient (in sth)",
    type: "系表结构",
    meaning: "（在某方面）自给自足",
    summary: "self-sufficient 是表语形容词；in 引出实现自给自足的领域。",
    grammarRole: "be + 表语形容词",
    structures: [s("be self-sufficient in + 领域", "在某方面自给自足", "领域常为 food、energy 等。")],
  },
  "either-or": {
    key: "either-or",
    canonical: "either A or B",
    type: "并列结构",
    meaning: "要么 A，要么 B；两者任一",
    summary: "A 与 B 必须保持词性和结构平行；原句连接两个谓语 sell 与 seek。",
    grammarRole: "相关并列连词",
    structures: [s("either + 同级成分 A + or + 同级成分 B", "要么 A，要么 B", "可连接名词、形容词、介词短语或谓语。")],
    pitfalls: ["连接两个主语时，谓语通常遵循就近原则。"],
  },
  "in-form-of": {
    key: "in-form-of",
    canonical: "in the form of + n.",
    type: "介词结构",
    meaning: "以……的形式",
    summary: "the 通常不能省略；of 后接说明具体形式的名词。",
    grammarRole: "介词短语；说明形式",
    structures: [s("in the form of + n.", "以……形式", "可后置修饰名词，也可作方式状语。")],
  },
  "borrow-from": {
    key: "borrow-from",
    canonical: "borrow sth from sb",
    type: "动词搭配",
    meaning: "向某人借入某物",
    summary: "borrow 的方向是“借入”；from 引出出借者。",
    grammarRole: "及物动词 + 宾语 + 来源介词短语",
    structures: [s("borrow sth from sb", "从某人处借入某物", "与 lend sth to sb 的方向相反。")],
    pitfalls: ["borrow 不表示“借出”；借出用 lend。"],
  },
  "rate-of-interest": {
    key: "rate-of-interest",
    canonical: "at a ... rate of interest",
    type: "金融搭配",
    meaning: "以……的利率",
    summary: "rate of interest 等于 interest rate；rate 不能换成 ratio 或 proportion。",
    grammarRole: "介词短语；说明借款利率",
    structures: [
      s("at a + 高低形容词 + rate of interest", "以某种利率", "常见形容词有 low、high、fixed。"),
      s("interest rate", "利率", "更常见的前置名词结构。"),
    ],
  },
  "of-this-kind": {
    key: "of-this-kind",
    canonical: "noun + of this kind",
    type: "后置修饰结构",
    meaning: "这种……；这一类的……",
    summary: "of this kind 后置修饰前面的名词；原句指前面提到的低息贷款。",
    grammarRole: "介词短语作后置定语",
    structures: [s("noun + of this / that kind", "这种 / 那种……", "kind 指代前文已经说明的类别。")],
  },
  "not-frequency-adjective": {
    key: "not-frequency-adjective",
    canonical: "be not + frequency adverb + adjective",
    type: "否定与频率结构",
    meaning: "并不经常处于某种状态",
    summary: "not frequently 表示“不常”，只否定频率，不等于 never。",
    grammarRole: "系表结构中的频率副词",
    structures: [s("be not frequently + adjective", "并不经常……", "频率副词修饰后面的状态形容词。")],
  },
  "simple-noun-phrase": {
    key: "simple-noun-phrase",
    canonical: "adjective + noun",
    type: "名词短语",
    meaning: "形容词修饰中心名词",
    summary: "先找中心名词，再把前面的形容词译为限定或性质。",
    grammarRole: "名词短语",
    structures: [s("adjective + noun", "……的某物", "中心词是最后的名词。")],
  },
};

const phraseAliases: Record<string, string> = {
  "between a and b": "between-a-and-b",
  "between his consumption and his production": "between-a-and-b",
  "the difference between a and b": "between-a-and-b",
  "choose between a and b": "between-a-and-b",
  "between the ages of a and b": "between-a-and-b",
  "wishes to succeed": "wish-to-do",
  "wish to do sth": "wish-to-do",
  "wish sb to do sth": "wish-sb-to-do",
  "wish + that 从句": "wish-that",
  "wish + that-clause": "wish-that",
  "wish that": "wish-that",
  "wish sb sth": "wish-sb-sth",
  "keep a wide gap": "keep-a-gap",
  "a large quantity of": "large-quantity-of",
  "instead of": "instead-of",
  "instead of doing": "instead-of",
  "support himself and his family": "support-oneself-family",
  "only if": "only-if",
  "only if necessary": "only-if",
  "only if you agree": "only-if",
  "as seed for sowing": "as-noun",
  "an insurance against": "insurance-against",
  "insurance against loss": "insurance-against",
  "the unpredictable effects of bad weather": "effects-of",
  "in order to": "in-order-to",
  "in order to improve": "in-order-to",
  "in order not to lose": "in-order-to",
  "be self-sufficient": "be-self-sufficient",
  "self-sufficient in food": "be-self-sufficient",
  "either sell": "either-or",
  "or seek": "either-or",
  "in the form of loans": "in-form-of",
  "in written form": "in-form-of",
  "borrow money": "borrow-from",
  "at a low rate of interest": "rate-of-interest",
  "at a low interest rate": "rate-of-interest",
  "rate of interest": "rate-of-interest",
  "of this kind": "of-this-kind",
  "not frequently obtainable": "not-frequency-adjective",
  "agricultural implements": "simple-noun-phrase",
  "chemical fertilizers": "simple-noun-phrase",
  "extra funds": "simple-noun-phrase",
};

const collocationGlosses: Record<string, { meaning: string; note?: string }> = {
  "a grain of truth": { meaning: "一点真实性；一丝真相" },
  "a great success": { meaning: "一次巨大的成功；很成功的人或事", note: "success 在这里是可数名词。" },
  "a large quantity of": { meaning: "大量的……", note: "后接可数名词复数或不可数名词。" },
  "a wide gap": { meaning: "很大的差距 / 差额" },
  "agricultural implements": { meaning: "农具；农业工具" },
  "agricultural production": { meaning: "农业生产" },
  "achieve success": { meaning: "取得成功", note: "achieve 是及物动词，success 是名词。" },
  "an excess of": { meaning: "过量的……；过多的……", note: "of 后接名词。" },
  "apply fertilizer": { meaning: "施肥；施用肥料" },
  "at a low interest rate": { meaning: "以低利率" },
  "at a rate of": { meaning: "以……的速度 / 比率" },
  "as well as": { meaning: "也；以及；除……之外还", note: "连接主语时，谓语通常与 as well as 前面的主语一致。" },
  "bank loan": { meaning: "银行贷款" },
  "basic commodities": { meaning: "基本商品；生活必需品" },
  "be self-sufficient": { meaning: "自给自足" },
  "be successful in doing": { meaning: "成功做成某事", note: "successful 是形容词，前面需要 be；in 后接 doing。" },
  "between a and b": { meaning: "在 A 与 B 之间", note: "A、B 要保持语法结构平行。" },
  "between the ages of a and b": { meaning: "在 A 岁至 B 岁之间" },
  "birth rate": { meaning: "出生率" },
  "bridge the gap": { meaning: "弥合差距" },
  "chemical fertilizers": { meaning: "化肥" },
  "choose between a and b": { meaning: "在 A 与 B 之间作选择" },
  "commodity market": { meaning: "商品市场" },
  "commodity prices": { meaning: "商品价格" },
  "consumption and production": { meaning: "消费与生产" },
  "economic self-sufficiency": { meaning: "经济上的自给自足" },
  "energy consumption": { meaning: "能源消耗" },
  "excess baggage": { meaning: "超重行李；超额行李" },
  "excess demand": { meaning: "超额需求；需求过剩" },
  "extra funds": { meaning: "额外资金" },
  "ever since": { meaning: "自从……以来", note: "常与完成时连用。" },
  "feed the soil": { meaning: "给土壤补充养分；培肥土壤" },
  "fund a project": { meaning: "为项目提供资金" },
  "grain production": { meaning: "粮食生产 / 产量" },
  "health insurance": { meaning: "健康保险" },
  "household consumption": { meaning: "家庭消费" },
  "implement a policy": { meaning: "实施一项政策", note: "implement 在这里是动词。" },
  "implement reforms": { meaning: "推行改革", note: "implement 在这里是动词。" },
  "in large quantities": { meaning: "大量地；成批地" },
  "in excess of": { meaning: "超过……；多于……" },
  "in other ways": { meaning: "以其他方式" },
  "in order not to lose": { meaning: "为了不失去……" },
  "in order to improve": { meaning: "为了改善……" },
  "in the form of loans": { meaning: "以贷款的形式" },
  "in written form": { meaning: "以书面形式" },
  "in three ways": { meaning: "以三种方式" },
  "instead of doing": { meaning: "而不是做……" },
  "insurance against loss": { meaning: "防范损失的保险 / 保障" },
  "insurance policy": { meaning: "保险单；保单" },
  "intellectual property": { meaning: "知识产权" },
  "low-interest loan": { meaning: "低息贷款" },
  "long before": { meaning: "早在……之前", note: "不要与 before long（不久以后）混淆。" },
  "mass production": { meaning: "大规模生产；批量生产" },
  "more than": { meaning: "多于；超过；不仅仅" },
  "much as": { meaning: "尽管；虽然", note: "可引导让步从句。" },
  "not obtainable": { meaning: "无法获得的" },
  "obtainable from": { meaning: "可从……获得" },
  "only if necessary": { meaning: "只有必要时" },
  "only if you agree": { meaning: "只有你同意才……" },
  "organic fertilizer": { meaning: "有机肥" },
  "other than": { meaning: "除……之外；不同于" },
  "private property": { meaning: "私有财产" },
  "produce a surplus": { meaning: "产生盈余 / 余粮" },
  "production costs": { meaning: "生产成本" },
  "public funds": { meaning: "公共资金；公款" },
  "quantity and quality": { meaning: "数量与质量" },
  "rate of interest": { meaning: "利率" },
  "readily obtainable": { meaning: "容易获得的" },
  "seek funds": { meaning: "寻求 / 筹集资金" },
  "seek help": { meaning: "求助；寻求帮助" },
  "seek to improve": { meaning: "力图改善" },
  "self-sufficient in food": { meaning: "粮食自给" },
  "sell property": { meaning: "出售财产" },
  "store energy": { meaning: "储存能量" },
  "store grain": { meaning: "储存粮食" },
  "store up supplies": { meaning: "储备物资" },
  "succeed in business": { meaning: "事业 / 生意成功" },
  "succeed in doing": { meaning: "成功做成某事", note: "固定用 succeed in doing，不说 succeed to do 表“成功做成”。" },
  "succeed to the throne": { meaning: "继承王位", note: "此处 succeed 是“继承”，不是“成功”。" },
  "success in doing": { meaning: "做成某事；在某事上的成功", note: "in 后接 doing。" },
  "a successful attempt": { meaning: "一次成功的尝试" },
  "highly successful": { meaning: "非常成功的" },
  "successfully apply": { meaning: "成功申请；成功应用", note: "具体意思由 apply 的宾语决定。" },
  "successfully complete": { meaning: "成功完成……" },
  "surplus grain": { meaning: "余粮" },
  "take out a loan": { meaning: "申请 / 办理贷款" },
  "the gap between a and b": { meaning: "A 与 B 之间的差距" },
  "the difference between a and b": { meaning: "A 与 B 之间的区别" },
  "trade surplus": { meaning: "贸易顺差" },
  "use a instead of b": { meaning: "用 A 代替 B" },
  "construct irrigation channels": { meaning: "修建灌溉渠道" },
};

const familyGlosses: Record<string, string> = {
  consume: "消耗；消费",
  consumer: "消费者",
  consumerism: "消费主义",
  excessive: "过度的；过量的",
  excessively: "过度地；过分地",
  fertile: "肥沃的；有生育能力的",
  fertility: "肥沃；生育能力",
  fertilize: "施肥；使受精",
  form: "形式；形成",
  formation: "形成；构成",
  funded: "获得资助的",
  funding: "资金；资助",
  implementation: "实施；执行",
  instead: "代替；反而",
  insure: "投保；确保",
  insured: "被保险的；被保险人",
  insurer: "保险公司；承保人",
  interest: "利息；兴趣；利益",
  obtain: "获得；取得",
  obtainability: "可获得性",
  obtained: "已获得的",
  order: "顺序；命令；订购",
  produce: "生产；农产品",
  product: "产品；产物",
  productive: "高产的；富有成效的",
  productivity: "生产率；生产力",
  quantify: "量化",
  quantitative: "数量的；定量的",
  rate: "比率；速度；评价",
  rating: "等级；评分",
  seeker: "寻找者；寻求者",
  "self-sufficiency": "自给自足",
  storage: "储存；存储空间",
  wish: "愿望；祝愿；希望",
  wishful: "一厢情愿的；充满愿望的",
  wishfully: "一厢情愿地；满怀希望地",
  success: "成功",
  successful: "成功的",
  successfully: "成功地",
  sufficiency: "充足；足量",
  sufficient: "足够的；充分的",
};

const wordKnowledge: Record<string, WordKnowledge> = {
  between: {
    grammarRole: "介词；原句构成 between ... and ...，后置修饰 gap",
    grammarSummary: "between 的核心不是孤立的“在两者之间”，而是结构 between A and B。先识别 A，再找 and 后与 A 平行的 B。",
    structures: phraseGuides["between-a-and-b"].structures,
    pitfalls: phraseGuides["between-a-and-b"].pitfalls,
  },
  against: {
    grammarRole: "介词；可表示反对、抵御、倚靠或以……为背景",
    grammarSummary: "具体意思由前面的中心词决定；本句 insurance against 表“针对风险的保障”。",
    structures: [
      s("insurance / protection against sth", "防范某事的保险 / 保护", "sth 是风险或损失。"),
      s("be against sth / doing", "反对某事 / 做某事", "against 后接名词或动名词。"),
      s("lean against sth", "倚靠在……上", "表示接触和支撑。"),
    ],
  },
  as: {
    grammarRole: "介词 / 连词 / 副词；必须根据后接成分判断",
    grammarSummary: "as + 名词常是“作为”；as + 从句可能是“当、因为、随着、正如”；比较结构 as...as 表“和……一样”。",
    structures: [
      s("as + noun", "作为……", "后接身份或用途。"),
      s("as + clause", "当 / 因为 / 随着 / 正如……", "必须结合上下文逻辑判断。"),
      s("as + adj./adv. + as", "和……一样……", "中间放形容词或副词原级。"),
    ],
  },
  if: {
    grammarRole: "从属连词；引导条件从句，也可引导“是否”宾语从句",
    grammarSummary: "if + 条件表示“如果”；动词 ask / know / wonder 后的 if 常表示“是否”。",
    structures: [
      s("if + 条件从句, 主句", "如果……，就……", "真实条件句通常不用 will 表示条件本身。"),
      s("verb + if / whether + clause", "……是否……", "此时 if 不表示条件。"),
    ],
  },
  to: {
    grammarRole: "不定式标记或介词；判断后面接动词原形还是名词 / doing",
    grammarSummary: "to + 动词原形是不定式；look forward to、object to 等结构中的 to 是介词，后接名词或 doing。",
    structures: [
      s("to + 动词原形", "去做 / 要做……", "不定式可作宾语、目的状语、定语等。"),
      s("介词 to + n. / doing", "向 / 对 / 对于……", "需整体记忆前面的固定搭配。"),
    ],
  },
  which: {
    grammarRole: "疑问限定词 / 代词，或引导定语从句的关系代词",
    grammarSummary: "定语从句中 which 指代物，并在从句内充当主语或宾语；原句 which 指 commodity，作 sell 的宾语。",
    structures: [s("noun + which + clause", "……的某物 / 该物……", "先找 which 前面的先行词，再判断 which 在从句中缺什么成分。")],
  },
  either: {
    grammarRole: "限定词 / 代词 / 副词；与 or 构成相关并列结构",
    grammarSummary: "either A or B 要求 A、B 结构平行；单独 either 可表示“两者任一”。",
    structures: phraseGuides["either-or"].structures,
    pitfalls: phraseGuides["either-or"].pitfalls,
  },
  instead: {
    grammarRole: "副词；instead of 中与 of 共同构成介词结构",
    grammarSummary: "instead 可单独放在句末或句首；instead of 后必须接名词、代词或 doing。",
    structures: phraseGuides["instead-of"].structures,
    pitfalls: phraseGuides["instead-of"].pitfalls,
  },
  only: {
    grammarRole: "副词 / 形容词 / 连词成分；限制范围",
    grammarSummary: "only 修饰谁，就只限制谁；only if 表必要条件，置于句首时主句常部分倒装。",
    structures: phraseGuides["only-if"].structures,
    pitfalls: phraseGuides["only-if"].pitfalls,
  },
  may: {
    grammarRole: "情态动词；后接动词原形",
    grammarSummary: "may 可表示可能性或许可；原句 may need 是“可能需要”。",
    structures: [s("may + 动词原形", "可能 / 可以做……", "may 没有人称变化。"), s("may have done", "可能已经做了……", "表示对过去的推测。")],
  },
  must: {
    grammarRole: "情态动词；后接动词原形",
    grammarSummary: "must 表必要性时是“必须”；must be / must have done 还可表示把握较大的肯定推测。",
    structures: [s("must + 动词原形", "必须做……", "表示义务或必要。"), s("must have done", "一定已经做了……", "表示对过去的肯定推测。")],
  },
  of: {
    grammarRole: "介词；连接中心词与所属、构成、数量、内容等补足信息",
    grammarSummary: "不要把 of 一律逐字译成“的”；先判断整体结构，如 quantity of、effects of、in the form of。",
    structures: [s("数量词 + of + n.", "……数量的……", "如 a quantity of。"), s("noun + of + n.", "所属 / 内容 / 构成关系", "翻译顺序常需前置。")],
  },
  for: {
    grammarRole: "介词 / 连词；可表示目的、对象、原因、交换或持续时间",
    grammarSummary: "本篇 as seed for sowing 中 for 表用途；insurance for 与 insurance against 的宾语类型不同。",
    structures: [s("for + n. / doing", "为了 / 用于……", "for 是介词，后接名词或 doing。"), s("for + 时间段", "持续……", "常与完成时等搭配。")],
  },
};

function normalized(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getPhraseKnowledge(source: string): PhraseKnowledge | undefined {
  const clean = normalized(source);
  const alias = phraseAliases[clean];
  if (alias) return phraseGuides[alias];
  const gloss = collocationGlosses[clean];
  if (!gloss) return undefined;
  return {
    key: `collocation:${clean}`,
    canonical: source.trim(),
    type: "常用搭配",
    meaning: gloss.meaning,
    summary: gloss.note ?? "这是需要整体识别的常用搭配；先记整体意思，再分析内部单词。",
    grammarRole: "固定或高频词语搭配",
    structures: [s(source.trim(), gloss.meaning, gloss.note ?? "按整体搭配记忆；在不同句子中再判断其具体句法成分。")],
  };
}

export function getWordKnowledge(headword: string) {
  return wordKnowledge[normalized(headword)];
}

export function getCollocationDetails(items: string[]): ReferenceDetail[] {
  return items.map((item) => {
    const info = collocationGlosses[normalized(item)];
    const phrase = getPhraseKnowledge(item);
    return {
      label: item,
      meaning: info?.meaning ?? phrase?.meaning ?? "该搭配将在所属真题精审时补充译义",
      note: info?.note ?? phrase?.summary,
      target: info || phrase ? `phrase:${item}` : undefined,
    };
  });
}

function parseGlossedReference(item: string) {
  const match = item.match(/^([^（(]+)[（(]([^）)]+)[）)]$/);
  if (!match) return { label: item.trim(), meaning: "与当前词相关的考研词汇", note: undefined };
  return { label: match[1].trim(), meaning: match[2].trim(), note: `与当前词近义；括号内容是本组最重要的区别提示。` };
}

export function getSynonymDetails(items: string[]): ReferenceDetail[] {
  return items
    .filter((item) => !item.startsWith("本词暂无") && !item.startsWith("结构词通常"))
    .map((item) => {
      const parsed = parseGlossedReference(item);
      const phrase = parsed.label.includes(" ");
      return {
        ...parsed,
        target: phrase ? (getPhraseKnowledge(parsed.label) ? `phrase:${parsed.label}` : undefined) : `word:${parsed.label}`,
      };
    });
}

function familyHeadword(item: string) {
  return item.match(/^[A-Za-z]+(?:-[A-Za-z]+)?/)?.[0] ?? item;
}

export function getFamilyDetails(items: string[]): ReferenceDetail[] {
  return items.map((item) => {
    const headword = familyHeadword(item);
    const pos = item.match(/\b(n|v|adj|adv)\./)?.[0];
    return {
      label: headword,
      meaning: familyGlosses[headword] ?? "与当前词同源",
      note: pos ? `同源词；词性 ${pos}` : "同源词",
      target: `word:${headword}`,
    };
  });
}

export function getFamilyGloss(headword: string) {
  return familyGlosses[normalized(headword)];
}
