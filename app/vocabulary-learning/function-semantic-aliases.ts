/**
 * Exact, reviewed aliases for function-word roles in the imported exam corpus.
 * Referent/action descriptions stay on their original contexts; they do not create
 * a new lexical sense. Mixed legacy glosses are left unclassified when they span
 * genuinely different roles. No substring matching, guessing from a new sentence,
 * or unrestricted Chinese synonym expansion happens here.
 */
import { normalizeMeaning } from "./semantic-normalization";

export type FunctionSemanticAlias = { id: string; pos: string; meaning: string };
type ReviewedFunctionGroup = FunctionSemanticAlias & { forms: readonly (readonly [string, readonly string[]])[] };

const groups: Readonly<Record<string, readonly ReviewedFunctionGroup[]>> = {
  "to": [
    { id: "function-infinitive", pos: "infinitive marker", meaning: "不定式标记（引出动词原形）", forms: [
      ["infinitive marker", ["不定式标记", "引出说明可说内容的不定式", "不定式标记（引出动词原形）"]],
      ["不定式标记", ["为了", "引出动词原形", "引出继续从事的行为", "引出继续做的动作", "用于战胜", "用于进行该行为", "构成将来趋向表达", "为了；用于", "引出乐观的理由内容", "引出抱有希望的内容", "引出普及接入的行为", "引出希望做到的事", "引出用途", "引出改变动作", "引出学习或培养动作", "引出要求内容", "引出认定或命令内容", "引出所述性质", "引出代表的任务", "引出未实现的行为", "引出请求内容", "引待解决的动作", "引尚待确定的动作", "引出动作", "引出容易完成的活动", "引计划内容及研究任务", "引出不定式动作", "引出动词原形be", "引出shift", "引出待补动作", "引出倾向行为", "引出目的动作", "引出预期行为", "引出倾向的行为", "为了（引出目的动作）"]],
      ["情态性结构组成", ["引出义务行为", "引出应当具有的性质"]],
    ] },
    { id: "function-direction", pos: "prep", meaning: "向；到（方向或终点）", forms: [
      ["prep", ["到", "给；向", "向；到", "到；至", "回到……状态", "到；达到", "向；给（让位结构成分）", "回到；趋向", "到；退回到", "向；到（方向或终点）"]],
    ] },
    { id: "function-recipient", pos: "prep", meaning: "给；向（接收对象）", forms: [
      ["prep", ["给", "交给", "引出录取的机构", "给；向（接收对象）"]],
    ] },
    { id: "function-relation", pos: "prep", meaning: "对；对于（关联对象）", forms: [
      ["prep", ["对……而言", "对于", "对于；关于", "对；获得……的", "对于；针对", "对于；相对于", "与；对", "引出关联对象", "引出响应对象", "用于的对象", "关联到", "对……的", "对……来说", "对；对于", "对；引出贡献对象", "针对；涉及", "对于；以……为权利内容", "对……", "与……；对……", "对；给", "对；关于", "对；于", "与……关联", "对；对于（关联对象）"]],
    ] },
    { id: "function-association", pos: "prep", meaning: "与；同", forms: [
      ["prep", ["与；同", "比较的对象接口", "与", "与……相对"]],
    ] },
    { id: "function-according", pos: "prep", meaning: "根据；按照（according to）", forms: [
      ["prep", ["根据", "根据；按", "引出观点来源", "根据（according to）", "根据；按照", "根据；按照（according to）"]],
    ] },
    { id: "function-topic", pos: "prep", meaning: "关于（话题对象）", forms: [
      ["prep", ["关于（when it comes to）", "关于；引出坦承内容", "关于所及对象", "关于（话题对象）"]],
    ] },
    { id: "function-cause", pos: "prep", meaning: "引出原因对象", forms: [
      ["prep", ["由于的原因对象", "引出原因对象"]],
    ] },
  ],
  "that": [
    { id: "function-content-clause", pos: "conj", meaning: "引导内容从句，本身无独立词义", forms: [
      ["conj", ["引出内容", "引导内容，无独立词义", "引出担忧内容", "引出事实内容", "引出所知内容", "引出规定内容", "引出发现内容", "引出所发现的内容", "引出主张内容", "引出建议内容", "引出估计内容", "引出信念内容", "引出推断内容", "引出结论内容", "引出报告所说内容", "引出隐含义的内容", "引出原则内容", "引出要求内容", "引出指出的内容", "引出报道内容", "引出已知内容", "引出宾语内容", "引出被判断为清楚的内容", "引出主张内容或方式说明", "引出观点内容", "引出格言含义", "引出所相信的命题", "引出所想的内容", "引出被评价的命题", "引出确保的内容", "引出暗示的内容", "引出内容判断", "引出裁定内容", "引出保证内容", "引出调查内容", "引出所相信内容", "引导相信的内容", "引导主语内容，无独立词义", "引出所读到或发现的内容", "引出主张的具体内容", "引出发现的内容", "引出看来如此的内容", "引出已记录内容", "引出表明的内容", "引出密斯的看法", "引出得知的内容", "引出推知内容", "引出相信的内容", "引出意思内容", "引出认为的内容", "引出主语内容", "引导内容从句，本身无独立词义"]],
      ["pron", ["引出这一反差的具体内容", "引出研究报告的内容", "引出作者发现的内容", "引出评论或抱怨的内容"]],
    ] },
    { id: "function-relative", pos: "pron", meaning: "关系代词，回指先行词并引导定语从句", forms: [
      ["pron", ["引出报道的限定", "引出限定法案或报道的内容", "引出限定国家的从句", "引出修饰力量的从句", "引出限定女性团体的关系", "引出限定 image 的关系", "这个世界（关系指代）", "这个系统（关系指代）", "引出公司或系统的限定", "关系代词，指数据库", "那些利润率", "那场风暴", "指尚未转移的广告和读者", "这些材料", "关系代词，代指困难", "关系代词，代指作业", "关系代词，回指关联", "关系连接并回指先行词", "关系代词，回指电子词典", "这些词（关系指代）", "那些东西（关系指代）", "关系代词，回指先行词并引导定语从句"]],
      ["关系代词", ["回指公司", "回指卫生问题", "回指行为", "回指公司或提示", "这些气流", "这种方式", "回指产品", "所起的作用", "指随之而来的变化"]],
      ["conj/det/pron", ["关系代词，指文明生活的片段"]],
    ] },
    { id: "function-demonstrative-determiner", pos: "det", meaning: "那个；那种（指示限定）", forms: [
      ["det", ["那种", "那个", "那个；上述的", "那一方面", "那个；那种（指示限定）"]],
    ] },
    { id: "function-demonstrative-pronoun", pos: "pron", meaning: "那；那个（指代事物或情况）", forms: [
      ["conj/det/pron", ["前述一切行动"]],
      ["pron", ["那（美国当时资金不足）", "那（利用外资建设的主张）", "上述与沟通有关的情况", "法国的欧洲经济政府方案", "工作场所和酒吧禁烟", "这种问题", "那一人口", "那；那个（指代事物或情况）"]],
    ] },
    { id: "function-substitute", pos: "pron", meaning: "替代前文同类名词", forms: [
      ["pron", ["离婚率（替代同类名词）", "离婚率（替代名词）", "替代前文同类名词"]],
    ] },
    { id: "function-cleft", pos: "cleft marker", meaning: "强调句连接成分", forms: [
      ["强调句标记", ["引出被强调事件"]],
      ["强调结构连接成分", ["用于引出被强调时间对应的主句", "引出强调时间对应的主句"]],
      ["cleft marker", ["强调句连接成分"]],
    ] },
  ],
  "of": [
    { id: "function-relation", pos: "prep", meaning: "……的（所属或关联）", forms: [
      ["prep", ["……的", "……领域的", "属于", "的", "所属", "所属飞机", "为……的", "……的；所属的", "……的（经历者）", "由……所作的", "……的（被拆分对象）", "引出作用主体", "引出所属对象", "所属制度", "……的（所属或关联）"]],
    ] },
    { id: "function-partitive", pos: "prep", meaning: "……中的；……的一部分", forms: [
      ["prep", ["……中的", "……之中的", "所代表的群体", "引出整体", "引出整体活动", "所代表的整体", "代表范围；所属整体", "说明多数的范围", "范围中的", "……的一种", "引出选择范围", "引出部分所涉范围", "被遴选的对象", "……中的；……的一部分"]],
    ] },
    { id: "function-content", pos: "prep", meaning: "……的；关于（内容或对象）", forms: [
      ["prep", ["……的；内容为……", "关于……的", "关于；对于", "……的；以……为对象", "……的；关于", "引出内容", "对……的", "……的；关于……的", "对……的；……的", "对……所抱有的", "关于", "所属；说明内容", "的；说明内容", "感知的对象", "说明可能的事项", "对……；……的", "关于；涉及", "引出内容的连接成分", "引出类别的连接成分", "以……为对象", "……的；涉及……", "引出需求对象", "说明做法内容", "对于；针对", "关于；针对", "所表明的（内容）", "对……（容忍对象）", "……的；关于（内容或对象）"]],
    ] },
    { id: "function-quantity", pos: "prep", meaning: "引出数量所涉及的范围或对象", forms: [
      ["prep", ["……的；……的数量", "引出数量或内容范围", "引出数量范围", "一轮……", "引出数量所涉及的对象", "引出计量物质", "引出数量所计对象", "引出数量所指对象", "……的数量", "引出数量所涉及的范围或对象"]],
    ] },
    { id: "function-composition", pos: "prep", meaning: "由……组成", forms: [
      ["prep", ["……的；由……构成", "由……组成", "……的；由……组成的", "由……组成的"]],
    ] },
    { id: "function-quality", pos: "prep", meaning: "具有……性质或特征", forms: [
      ["prep", ["具有", "处于……状态", "以……为特征的", "具有……性质或特征"]],
    ] },
    { id: "function-lack", pos: "prep", meaning: "引出缺少或未达到的对象", forms: [
      ["prep", ["所缺少的对象", "说明不足的对象", "所未达到的标准", "引出缺少或未达到的对象"]],
    ] },
    { id: "function-use-object", pos: "prep", meaning: "引出利用的对象（make use of）", forms: [
      ["prep", ["以……为利用对象", "利用的对象接口", "引出利用的对象（make use of）"]],
    ] },
    { id: "function-source", pos: "prep", meaning: "来自；由……产生", forms: [
      ["prep", ["引出产物来源", "来自；属于", "引出影响来源", "来自；由……产生"]],
    ] },
  ],
  "be": [
    { id: "function-linking", pos: "v", meaning: "是；处于某种状态", forms: [
      ["v", ["是", "是；处于", "处于", "是；呈现状态", "处于……状态", "处于某状态", "是；呈现", "是；属于", "是；显得", "处于某种状态", "享有某种权利", "是；可能成为", "是（观点内容）", "成立；属实", "具有……程度的重要性", "是；处于……状态", "应当具有", "曾是", "曾在", "是；呈现特点", "是；为", "是；来自", "是；可呈现", "同样勇敢", "是；成为", "变得；是", "处于某权利状态", "负有", "怀有……态度", "是；具有某状态", "具有", "应受（与to blame连用）", "具有……关系", "是；处于某种状态"]],
      ["系动词", ["是；处于某种状态"]],
      ["aux/v", ["处于某种状态", "处于有关联的状态", "处于有关联状态"]],
    ] },
    { id: "function-existential", pos: "v", meaning: "有；存在", forms: [
      ["v", ["有；存在"]],
    ] },
    { id: "function-passive", pos: "aux", meaning: "构成被动语态", forms: [
      ["aux", ["构成被动", "被动标记", "被动助动词", "被……", "可被……", "将被……", "过去时被动标记", "据说", "构成被动：被……", "被（构成被动）", "构成被动语态", "构成被动不定式", "被动形式助动词", "构成报道被动", "构成被动期待表达", "构成过去时被动"]],
    ] },
    { id: "function-progressive", pos: "aux", meaning: "构成进行时", forms: [
      ["aux", ["进行时助动词", "过去进行时标记", "进行时助动词的过去分词", "构成过去正在进行", "现在进行时标记", "进行时标记", "构成进行时"]],
    ] },
  ],
  "it": [
    { id: "function-formal-subject", pos: "pron", meaning: "形式主语（实际内容在后）", forms: [
      ["pron", ["形式主语", "形式主语，无具体所指", "形式主语，本身不指具体事物", "形式主语（不单独翻译）", "形式主语（实际内容在后）"]],
      ["形式代词", ["形式主语"]],
      ["形式主语", ["主语占位，无实指", "主语占位，不指具体名词"]],
      ["formal subject", ["形式主语"]],
    ] },
    { id: "function-formal-object", pos: "pron", meaning: "形式宾语（实际内容在后）", forms: [
      ["形式代词", ["形式宾语"]],
      ["pron", ["形式宾语（不单独翻译）", "形式宾语（实际内容在后）"]],
    ] },
    { id: "function-cleft", pos: "pron", meaning: "强调句中的形式成分", forms: [
      ["形式代词", ["构成强调句"]],
      ["pron", ["强调句形式成分", "构成强调句的形式主语", "强调句中的形式成分"]],
    ] },
    { id: "function-referential", pos: "pron", meaning: "它；这件事（回指具体对象或情况）", forms: [
      ["pron", ["它（指家庭作业）", "它", "它（该国）", "它（美国）", "它（包豪斯）", "它（互联网）", "它（指学区）", "高失业时期", "它；这件事", "它（这些信息）", "它（利用外资建设的主张）", "报纸", "培养积极习惯这件事", "这种做法", "安全性", "该方法", "工作处境的发展", "这份工作的开展情况", "这个决定", "这项认证方案", "这种相关性", "这段求生复苏的经历", "它（联邦贸易委员会）", "德国", "欧盟", "欧洲一体化计划", "挽救欧元的讨论", "G.I. Joe过去的形象", "G.I.这个标记", "它；这一概念", "它；这种偏好", "收入不平等；收入差距", "社会结构与关系体系", "经济衰退", "史学偏好变化这一现象", "它（人才外流）", "它（成功经历）", "这种差异情形", "这一过程", "这种适应功能", "这种体重偏差", "它（这类诗行）", "它（未来主义诗歌）", "这种支持", "它（指政策）", "它；这件事（回指具体对象或情况）"]],
      ["pron/v", ["这一说法（妻子才是家中话多者）", "它；这件事"]],
    ] },
  ],
  "in": [
    { id: "function-location", pos: "prep", meaning: "在……中；在……内（位置或范围）", forms: [
      ["prep", ["在……中", "在", "在……范围内", "在……场合", "在……举措中", "在……里面", "在……作品中", "在……内", "在……中；在……内（位置或范围）"]],
    ] },
    { id: "function-field", pos: "prep", meaning: "在……方面；在……领域", forms: [
      ["prep", ["在……方面", "在……领域", "在……行业中", "在；体现于", "在特定方面", "在……方面；在……领域"]],
    ] },
    { id: "function-time", pos: "prep", meaning: "在……期间（时间）", forms: [
      ["prep", ["在……年", "在……期间", "在……时", "在（某一时段）", "在……年代或时期", "在……年代", "在（某年）", "在……期间（时间）"]],
    ] },
    { id: "function-state", pos: "prep", meaning: "处于……状态", forms: [
      ["prep", ["处于……反应关系中", "在……身份中", "处于", "处于……状态"]],
    ] },
  ],
  "for": [
    { id: "function-purpose", pos: "prep", meaning: "为了；供……使用（目的或受益对象）", forms: [
      ["prep", ["用于", "用于；适合", "为了", "供；用于", "为购买", "为；以……为宗旨", "关于；为……服务", "替；为", "供……的", "为；给", "为了；供……使用（目的或受益对象）"]],
    ] },
    { id: "function-reference", pos: "prep", meaning: "对于；针对（涉及对象）", forms: [
      ["prep", ["针对", "对于", "对……而言", "参与的事项", "对……的需要", "关于；针对", "对……的", "为；针对", "寻找的对象标记", "对……负责", "关于……的原因", "为……负责", "关于；就……对象", "对……（负责的对象）", "对于；针对（涉及对象）"]],
    ] },
    { id: "function-duration", pos: "prep", meaning: "持续（某段时间）", forms: [
      ["prep", ["在……期间", "持续", "持续（多久）", "持续（某段时间）"]],
    ] },
    { id: "function-reason-preposition", pos: "prep", meaning: "因为；出于（原因）", forms: [
      ["prep", ["因为", "因为；出于", "因为；出于（原因）"]],
    ] },
    { id: "function-reason-conjunction", pos: "conj", meaning: "因为（解释原因）", forms: [
      ["conj/prep", ["因为"]],
      ["conj", ["因为", "因为（解释原因）"]],
    ] },
    { id: "function-example", pos: "prep", meaning: "用于 for example 举例", forms: [
      ["prep", ["用于举例", "例如", "用于for example举例", "用以举例", "用于 for example 举例"]],
    ] },
    { id: "function-infinitive-subject", pos: "prep", meaning: "引出不定式的逻辑主语", forms: [
      ["不定式逻辑主语标记", ["标出动作执行者"]],
      ["infinitival subject marker", ["引出不定式逻辑主语"]],
      ["prep", ["对于；由", "引出不定式执行者", "引出不定式的逻辑主语"]],
    ] },
    { id: "function-consider-as", pos: "prep", meaning: "引出认定的状态（take for）", forms: [
      ["prep", ["视为（take for granted）", "引出被认定的状态", "引出认定的状态（take for）"]],
    ] },
  ],
  "as": [
    { id: "function-role", pos: "prep", meaning: "作为；视为", forms: [
      ["prep", ["作为", "作为；被视为", "作为；称为", "作为；看作", "称作", "作为；为", "作为；被当作", "作为；视为", "看作"]],
    ] },
    { id: "function-time", pos: "conj", meaning: "随着", forms: [
      ["conj", ["随着"]],
      ["adv/conj/prep", ["随着"]],
    ] },
    // The first as modifies degree; the second introduces the comparison.
    // Whole as...as annotations do not identify an isolated token's role.
    { id: "function-comparison-degree", pos: "adv", meaning: "同样地；一样地（程度）", forms: [
      ["adv", ["同样地", "同样地；一样地（程度）"]],
    ] },
    { id: "function-comparison", pos: "conj", meaning: "和……一样；如同（比较）", forms: [
      ["conj", ["与……一样", "和……一样；如同（比较）"]],
    ] },
    { id: "function-example", pos: "prep", meaning: "例如（such as）", forms: [
      ["prep", ["例如", "引出例子", "例如；像", "例如（such as）"]],
      ["举例结构成分", ["例如", "例如（与such连用）"]],
    ] },
    { id: "function-reference", pos: "conj", meaning: "正如；如……所述", forms: [
      ["conj", ["正如；如……所述"]],
      ["prep", ["正如"]],
    ] },
    { id: "function-parallel", pos: "conj", meaning: "……也同样如此", forms: [
      ["adv/conj/prep", ["……也同样如此"]],
      ["conj", ["也如此", "……也同样如此"]],
    ] },
    { id: "function-topic", pos: "prep", meaning: "关于；就……而言", forms: [
      ["prep", ["就……而言；从……考虑", "关于", "关于；就……而言"]],
    ] },
  ],
  "with": [
    { id: "function-accompany", pos: "prep", meaning: "与……一起；伴随着", forms: [
      ["prep", ["与", "伴随着", "伴随着……的状态", "与……相伴", "与；同", "伴随着（引独立结构）", "在……情况下", "随着", "与……", "伴随；连同", "与……一起；伴随着"]],
    ] },
    { id: "function-possess", pos: "prep", meaning: "带有；具有", forms: [
      ["prep", ["带有；充满", "带有", "伴随着；具有", "引出所装内容", "带有；具有", "充满……（搭配成分）", "具有"]],
    ] },
    { id: "function-instrument", pos: "prep", meaning: "用；借助（工具或材料）", forms: [
      ["prep", ["用", "用；借助", "用；以……为材料", "用；借助（工具或材料）"]],
    ] },
    { id: "function-comparison", pos: "prep", meaning: "与……相比", forms: [
      ["prep", ["与（比较对象）", "与……相比"]],
    ] },
    { id: "function-relation", pos: "prep", meaning: "对；与……有关", forms: [
      ["prep", ["关于；就……而言", "对（婚姻这一受损对象）", "与……有关", "对；对于", "引出有问题的对象", "对……（不满对象）", "对；与……有关"]],
    ] },
  ],
  "which": [
    { id: "function-relative", pos: "pron", meaning: "关系代词，回指先行词或前述情况", forms: [
      ["pron", ["引出法案的补充说明", "引出报告的结论", "引出基础设施的补充说明", "这些美国报纸", "统一货币", "麦当劳", "这（指前述制冷做法）", "关系代词，指董事会", "关系代词，指政策", "关系代词，回指红色", "关系代词，指诉讼", "关系代词，指大会", "关系代词，指半导体", "那座桥", "该理论", "这些后果（关系指代）", "这些场面（关系指代）", "关系代词，回指先行词或前述情况"]],
    ] },
    { id: "function-interrogative-pronoun", pos: "pron", meaning: "哪一个；哪一项（疑问）", forms: [
      ["pron", ["哪一个", "哪一项", "哪一个；哪一项（疑问）"]],
      ["疑问代词", ["哪一个"]],
    ] },
    { id: "function-interrogative-determiner", pos: "det", meaning: "哪个；哪些（疑问限定）", forms: [
      ["det", ["哪一个", "哪些", "哪个；哪些（疑问限定）"]],
    ] },
  ],
  "this": [
    { id: "function-demonstrative-determiner", pos: "det", meaning: "这；这个（指示限定）", forms: [
      ["det", ["这；这一", "这一", "这种", "这项", "这种；上述的", "这个；这一", "这个", "这篇", "这；这个（指示限定）"]],
    ] },
    { id: "function-demonstrative-pronoun", pos: "pron", meaning: "这；这件事（指代）", forms: [
      ["det/pron", ["全社会合作的公共健康新愿景", "上文所说的普通美国兵", "民众史及社会条件史观"]],
      ["pron", ["这一问题", "这；此次裁决", "这些情况", "这一变化（经济复苏）", "这（前述趋同变化）", "这（男婴存活改善）", "这（所举诗行及写法）", "这一问题（下文所问）", "这（下文的说法）", "这（承接政府前述行动前提）", "这（指前述效率）", "这；这件事（指代）"]],
    ] },
    { id: "function-demonstrative-general", pos: "det/pron", meaning: "这；这一（指示）", forms: [
      ["det/pron", ["这；这一点", "这；这个", "这；这一", "这个；这件事", "这；这一（指示）"]],
    ] },
  ],
  "the": [
    { id: "function-definite", pos: "art.", meaning: "定冠词，特指已知对象", forms: [
      ["art.", ["这个；特指已知对象", "特指已知对象", "这个/这些；特指已知对象", "这；该（定指）", "这份", "特定对象标记", "特指所给的", "特指这张", "这个", "习语中的限定词", "特定年代标记", "特指这轮", "特指或结构限定", "特指该类整体对象", "特定目标的限定词", "特指世界整体", "回指限定", "结构及特指限定", "特定类别标记", "特定界限标记", "特指或构成时间习语", "特指该", "定冠词，特指已知对象"]],
    ] },
  ],
  "a": [
    { id: "function-indefinite", pos: "art.", meaning: "一个；泛指一类事物", forms: [
      ["art.", ["一个；泛指一类事物", "一个；泛指一类", "不定冠词", "一个", "一段", "一", "一份；一家", "一个；一项", "一次", "一所（不特指）", "一封", "一个；一种", "一次；一个"]],
    ] },
  ],
  "he": [
    { id: "function-personal", pos: "pron", meaning: "他", forms: [
      ["pron", ["他", "他（密斯）", "他（Irvine）", "他（提出抱怨者的丈夫）", "利萨曼博士", "兰斯利", "他（Lord Irvine）", "他（大法官）", "他（沙发上的丈夫）", "他（赖特）", "斯蒂芬森", "布格拉", "G.I. Joe这一人物形象"]],
    ] },
  ],
  "they": [
    { id: "function-personal", pos: "pron", meaning: "他们；她们；它们", forms: [
      ["pron", ["他们；它们", "她们", "它们（这些公寓）", "它们（基础设施）", "航空公司", "他们（研究人员）", "他们（外部董事）", "它们（报纸）", "教师", "它们", "她们（妻子）", "它们（地方研究）", "他们（投资者）；它们（设施）", "它们（外国公司）", "她们（女性团体成员）", "美国男性", "这些抱怨", "她们（抱怨的女性）", "这些产品", "联邦陪审员", "公民们", "克鲁及团队", "军机；这些报道", "这些计算机安全专家", "这些董事", "他们（离任董事）", "它们（这些措施）", "这些食品广告", "医学界资深人士", "二战中服役的男女", "布置的作业", "他们（指学生）", "它们；这些商店", "他们", "阶层鸿沟", "精英大学毕业生", "艰难的经济时期", "这些失业者", "上述工程师、实业家和探险家", "马克思与恩格斯", "他们（发展中国家的人们）", "They：政策制定者；them：贫穷国家", "他们（美国人）", "他们（不懂进化者）", "他们（后代）", "他们（男孩）", "它们（这些原则）", "他们（两名军官）", "它们（声音）", "它们；那些马", "它们（日本报纸）", "他们；她们；它们"]],
    ] },
  ],
  "you": [
    { id: "function-personal", pos: "pron", meaning: "你；你们", forms: [
      ["pron", ["你；考生", "你；你们", "你；泛指读者", "你将……", "你；题设中的考生", "你；写作考生"]],
      ["pron/v", ["你；你们"]],
    ] },
  ],
  "we": [
    { id: "function-personal", pos: "pron", meaning: "我们", forms: [
      ["pron", ["我们；我们这一群体", "我们", "我们（读者）", "我们夫妻两人", "我们（一般读者）", "我们（今天的人们）", "卫生部门方面"]],
      ["aux/pron", ["我们；我们这一群体"]],
    ] },
  ],
  "she": [
    { id: "function-personal", pos: "pron", meaning: "她", forms: [
      ["pron", ["她（西蒙斯）", "她（社会学家里斯曼）", "她（维持谈话的妻子）", "她"]],
      ["pron/v", ["她（男士的妻子）"]],
    ] },
  ],
  "their": [
    { id: "function-possessive", pos: "det", meaning: "他们的；她们的；它们的", forms: [
      ["det", ["他们的；它们的", "他们的", "它们的", "他们的（证人的）", "他们的（美国人的）", "她们的", "它们的（美国报纸的）", "它们的（报纸的）", "儿童的", "学生的", "他们的（公众人物的）", "它们的（这些国家的）", "它们的（各政府所属国家的）", "这些新塔楼的", "这些公寓的", "它们的（指这些服务商的）", "上述国家民众的", "各学区的", "浪漫主义者", "古典英雄们", "他们的（本国的）", "这些贫穷国家的", "它们的（那些调查的）", "它们的（企业的）", "他们的（未来主义者的）", "它们的（日本报纸的）", "他们的（读者的）", "他们的；她们的；它们的"]],
      ["possessive determiner", ["他们的；她们的", "她们的", "他们的"]],
    ] },
  ],
  "my": [
    { id: "function-possessive", pos: "det", meaning: "我的", forms: [
      ["det", ["我的"]],
      ["possessive determiner", ["我的"]],
    ] },
  ],
  "our": [
    { id: "function-possessive", pos: "det", meaning: "我们的", forms: [
      ["det", ["我们的", "我们的（人类的）"]],
      ["possessive determiner", ["我们的"]],
    ] },
  ],
  "its": [
    { id: "function-possessive", pos: "det", meaning: "它的；其", forms: [
      ["det", ["它的；其", "它的", "它的（美国的）", "它的（这一过程的）", "它的（科学共同体的）", "欧洲一体化计划的", "它的（指谷歌的）", "它的；该学区的", "美国的", "它的（美国工业的）", "它的（自然选择的）", "它的（生活方式的）", "它的（婴儿的）", "它的（该国电视业的）", "它的（美国汽车业的）", "它的（新观念的）", "它的（包豪斯的）"]],
      ["物主限定词", ["它的（该国家的）"]],
    ] },
  ],
  "your": [
    { id: "function-possessive", pos: "det", meaning: "你的；你们的", forms: [
      ["possessive determiner", ["你的", "你的；考生的"]],
      ["det", ["你的；你们的"]],
    ] },
  ],
  "his": [
    { id: "function-possessive", pos: "det/pron", meaning: "他的；属于他的", forms: [
      ["det/pron", ["他的；属于他的", "派尔的"]],
      ["pron", ["他的；他的事业", "他的事业"]],
      ["det", ["他的", "他的（拉普森的）", "他的（看船者的）"]],
    ] },
  ],
  "her": [
    { id: "function-possessive", pos: "det", meaning: "她的", forms: [
      ["det", ["她的"]],
      ["possessive determiner", ["她的"]],
      ["pron", ["她的（社会学家 Riessman 的）"]],
    ] },
  ],
  "themselves": [
    { id: "function-reflexive", pos: "pron", meaning: "他们自己；它们自身", forms: [
      ["pron", ["他们自己", "鸟类自己", "网民他们自己", "这些士兵自己", "人们自己", "他们自己（美国人）", "他们自身", "它们自身；这些迁移运动本身", "他们自己；它们自身"]],
      ["反身代词", ["这些迁移本身"]],
    ] },
  ],
  "what": [
    { id: "function-interrogative", pos: "pron", meaning: "什么（询问内容）", forms: [
      ["pron", ["什么", "什么；怎样", "什么内容", "什么情况；哪种说法", "什么（询问内容）"]],
      ["疑问代词", ["会发生的情况"]],
    ] },
    { id: "function-fused-relative", pos: "pron", meaning: "所……的事物或内容", forms: [
      ["pron", ["所……的东西", "当时不太明显的事物", "……的做法；所……的事物", "所……的事物", "所说的内容", "……之处；……的事情", "所发生的事情", "所……的事物或内容"]],
      ["融合关系代词", ["所……的事情"]],
      ["det/pron", ["最终会形成的那种思维", "我们如今拥有的（禁烟现实）"]],
    ] },
  ],
  "there": [
    { id: "function-existential", pos: "existential marker", meaning: "存在句引导词（there be）", forms: [
      ["adv", ["有；存在句引导词"]],
      ["存在句引导词", ["引出存在的事物", "引出存在事物", "引出理由的存在", "引出技术性理由的存在", "有；存在", "有（存在句占位）", "引出存在情况"]],
      ["existential marker", ["存在句引导词", "引出存在结构", "存在句引导词（there be）"]],
    ] },
  ],
  "at": [
    { id: "function-place", pos: "prep", meaning: "在（位置或场所）", forms: [
      ["prep", ["在", "在（某一位置）", "在；隶属于", "在……中", "在（机构）", "在（位置或场所）"]],
    ] },
    { id: "function-time", pos: "prep", meaning: "在……时", forms: [
      ["prep", ["在……时", "用于At the same time", "在……时候"]],
    ] },
    { id: "function-target", pos: "prep", meaning: "朝；对着（对象）", forms: [
      ["prep", ["朝；对着", "观看的对象接口", "对……", "朝；对着（对象）"]],
    ] },
  ],
  "on": [
    { id: "function-location", pos: "prep", meaning: "在……上（位置）", forms: [
      ["prep", ["在……上", "在……街道上", "在", "在……上（位置）"]],
    ] },
    { id: "function-topic", pos: "prep", meaning: "关于；就……而言", forms: [
      ["prep", ["关于", "针对；关注于", "关于；就……内容", "关于；引出回顾对象", "引出回顾对象", "关于；在……方面", "围绕的主题", "关于；就……而言"]],
    ] },
    { id: "function-dependence", pos: "prep", meaning: "依靠；取决于；以……为依据", forms: [
      ["prep", ["以……为依据", "依托……运行", "借助……资助", "引出依赖因素", "取决于的对象", "依赖于（结构成分）", "取决于", "依赖于", "依靠；取决于；以……为依据"]],
    ] },
    { id: "function-target", pos: "prep", meaning: "对；针对（作用对象）", forms: [
      ["prep", ["对", "对……的", "引出受影响对象", "针对", "对……的重视对象", "对；针对（作用对象）"]],
    ] },
    { id: "function-membership", pos: "prep", meaning: "作为成员；在……任职", forms: [
      ["prep", ["在……任职", "作为成员", "作为成员；在……任职"]],
    ] },
    { id: "function-state", pos: "prep", meaning: "处于……状态", forms: [
      ["prep", ["在……进程中", "处于（围绳边的比喻）", "处于（节食状态）", "处于（状态结构成分）", "处于……状态"]],
    ] },
  ],
  "by": [
    { id: "function-agent", pos: "prep", meaning: "由；被（动作执行者或影响来源）", forms: [
      ["prep", ["由", "由；被", "由（观察者）", "由……作出的", "由；因", "由；由于", "由……进行", "受到……的影响", "受……作用", "受……影响；由", "由；被（动作执行者或影响来源）"]],
    ] },
    { id: "function-means", pos: "prep", meaning: "通过；借助", forms: [
      ["prep", ["通过", "凭借", "通过；靠", "通过；借助"]],
    ] },
    { id: "function-deadline", pos: "prep", meaning: "截至；到……为止", forms: [
      ["prep", ["到……为止", "截至；到……时", "截至；到……为止"]],
    ] },
    { id: "function-amount", pos: "prep", meaning: "相差或变化（某个幅度）", forms: [
      ["prep", ["变化幅度为", "幅度为", "增加了（某幅度）", "相差或变化（某个幅度）"]],
    ] },
  ],
  "from": [
    { id: "function-source", pos: "prep", meaning: "从；来自", forms: [
      ["prep", ["从；来自", "来自", "从", "从……中", "来自（抱怨者）", "向……征集；由……提供", "源自", "从；由……处", "从……", "从；来自；由……造成", "源于"]],
    ] },
    { id: "function-basis", pos: "prep", meaning: "根据；从……来看", forms: [
      ["prep", ["根据；从……中", "根据；从……来看", "根据", "依据", "根据；从"]],
    ] },
    { id: "function-exclusion", pos: "prep", meaning: "免除；免受的对象", forms: [
      ["prep", ["免除的事项", "免受的事物", "免除；免受的对象"]],
    ] },
  ],
  "when": [
    { id: "function-time", pos: "conj", meaning: "当……时；每当……时", forms: [
      ["conj", ["当……时", "每当……时", "当……时；每当……时"]],
      ["adv/conj/pron", ["当……时"]],
    ] },
    { id: "function-relative-time", pos: "adv", meaning: "在……的时候（关系副词）", forms: [
      ["adv", ["在那时", "在……的时候", "在……的时候（关系副词）"]],
    ] },
  ],
  "than": [
    { id: "function-comparison", pos: "conj/prep", meaning: "比（引出比较对象）", forms: [
      ["conj/prep", ["比；用于比较结构", "比", "比（引出比较对象）"]],
      ["conj", ["比", "与……相比"]],
      ["比较连接词", ["比"]],
      ["比较标记", ["引出比较基准"]],
      ["比较连接成分", ["比起；与其说"]],
      ["comparison marker", ["构成“超过”"]],
    ] },
    { id: "function-rather-than", pos: "conj", meaning: "而不是（rather than）", forms: [
      ["conj/prep", ["而不是"]],
      ["连接词", ["而不是"]],
      ["conj", ["而不是", "而不是（rather than）"]],
    ] },
  ],
  "so": [
    { id: "function-result", pos: "conj", meaning: "所以；因此", forms: [
      ["连接副词", ["因此"]],
      ["adv/conj", ["所以；因此"]],
      ["conj", ["因此", "所以", "所以；因此"]],
    ] },
    { id: "function-degree", pos: "adv", meaning: "如此；这么（程度）", forms: [
      ["adv", ["如此；这么", "如此；很", "如此；这么（程度）"]],
    ] },
    { id: "function-substitute", pos: "adv", meaning: "如此；那样（替代前述内容）", forms: [
      ["代替性副词", ["那样做（建设基础设施）"]],
      ["adv/conj", ["如此改变社会"]],
      ["adv", ["如此（发挥影响）", "如此", "如此；那样（替代前述内容）"]],
    ] },
    { id: "function-purpose", pos: "conj", meaning: "以便；为了（so that）", forms: [
      ["目的结构组成部分", ["引出目的"]],
      ["conj", ["以便", "以便；为了（so that）"]],
    ] },
  ],
  "do": [
    { id: "function-negation-question", pos: "aux", meaning: "助动词，用于疑问或否定", forms: [
      ["aux", ["构成否定", "构成否定祈使句", "构成否定祈使", "构成过去时否定", "没有（助动词否定）", "否定助动词", "过去时否定助动词", "用于构成否定", "构成一般过去时否定", "疑问助动词", "构成疑问与否定", "助动词，用于疑问或否定"]],
      ["aux/v", ["不（现在时否定助动词）", "不（构成一般现在时否定）"]],
    ] },
    { id: "function-emphasis", pos: "aux", meaning: "确实（强调）", forms: [
      ["aux", ["确实", "确实（强调）"]],
    ] },
    { id: "function-substitute", pos: "aux", meaning: "替代前述动作或谓语", forms: [
      ["代动词", ["代替survive"]],
      ["aux/v", ["代替increases，表示也增加"]],
      ["aux", ["代替前述实义谓语", "替代前述表达不满的动作", "替代前述动作或谓语"]],
    ] },
    { id: "function-perform", pos: "v", meaning: "做；完成；处理", forms: [
      ["v", ["完成；做", "做；采取行动", "做；处理", "做；完成；处理"]],
      ["动名词doing", ["从事；做"]],
    ] },
  ],
  "have": [
    { id: "function-perfect", pos: "aux", meaning: "构成完成时或完成式", forms: [
      ["aux", ["完成时助动词", "标记现在完成时", "现在完成时标记", "构成现在完成时", "过去完成时标记", "标记过去完成时", "完成式助动词", "构成此前已经……", "完成式标记", "构成过去完成时", "构成完成时", "标记完成时", "标记已完成", "已经（构成现在完成时）", "已经（构成完成时）", "完成结构标记", "承接完成时并省略gone", "标记完成式", "构成完成时或完成式"]],
      ["aux/v", ["构成先于讲话发生的过去完成时", "构成过去完成时"]],
    ] },
    { id: "function-possess", pos: "v", meaning: "有；拥有；具有", forms: [
      ["v", ["拥有", "具有；产生", "有；拥有", "具有", "获得", "拥有；提供", "有", "有（关系）", "持有；怀有", "有；拥有；具有"]],
      ["aux", ["曾经拥有"]],
      ["aux/v", ["有"]],
    ] },
    { id: "function-necessity", pos: "v", meaning: "必须；不得不（have to）", forms: [
      ["v", ["不得不（have to）", "必须", "必要性结构的组成", "必须；不得不（have to）"]],
      ["情态性结构组成", ["必须"]],
    ] },
    { id: "function-experience", pos: "v", meaning: "有过；经历；感到", forms: [
      ["v", ["有；遇到", "有；感到", "经历；处于", "有过；经历过", "曾有过", "拥有；受过", "有过；经历；感到"]],
    ] },
  ],
  "may": [
    { id: "function-possibility", pos: "v", meaning: "可能；也许", forms: [
      ["v", ["可能", "可能；也许", "可能；或许"]],
    ] },
    { id: "function-permission", pos: "v", meaning: "可以；获准", forms: [
      ["v", ["可以；被允许", "可以；获准"]],
    ] },
  ],
  "can": [
    { id: "function-ability", pos: "v", meaning: "能够；可以（能力）", forms: [
      ["v", ["能够；可以", "能够", "本来可以", "可以", "能够；可以（能力）"]],
    ] },
    { id: "function-possibility", pos: "v", meaning: "可能；有可能", forms: [
      ["v", ["可以；仍可能", "可能会", "可能；会", "可能；有可能"]],
    ] },
  ],
  "must": [
    { id: "function-obligation", pos: "v", meaning: "必须；应当", forms: [
      ["v", ["必须", "必须；应当（评价）", "必须；应当"]],
    ] },
  ],
  "should": [
    { id: "function-obligation", pos: "v", meaning: "应该；应当", forms: [
      ["v", ["应该；应当", "应当", "应该", "是否应当"]],
    ] },
    { id: "function-expectation", pos: "v", meaning: "按理应当；理应", forms: [
      ["v", ["按理应当", "理应", "按理应当；理应"]],
    ] },
  ],
  "will": [
    { id: "function-future", pos: "v", meaning: "将；会（将来或设想结果）", forms: [
      ["v", ["将；假设会", "会；将（设想中的结果）", "将会", "将", "将会（过去视角）", "是否会", "将；会", "假设过去提出会……", "会（反问语气）", "将；将会", "会；将是", "会是；可认为是", "将；会（将来或设想结果）"]],
    ] },
  ],
};

const indexes = new Map<string, Map<string, FunctionSemanticAlias>>();

/** The caller passes its normalized part of speech; only an exact reviewed pair matches. */
export function getFunctionSemanticAlias(termKey: string, pos: string, meaning: string): FunctionSemanticAlias | undefined {
  const reviewed = groups[termKey];
  if (!reviewed) return undefined;
  let index = indexes.get(termKey);
  if (!index) {
    index = new Map();
    for (const group of reviewed) {
      const alias = { id: group.id, pos: group.pos, meaning: group.meaning };
      for (const [sourcePos, meanings] of group.forms) {
        for (const sourceMeaning of meanings) index.set(`${sourcePos}\u0000${normalizeMeaning(sourceMeaning)}`, alias);
      }
    }
    indexes.set(termKey, index);
  }
  return index.get(`${pos}\u0000${normalizeMeaning(meaning)}`);
}
