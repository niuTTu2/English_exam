import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2011P4Lexicon, passage2011P4CollocationGlosses, passage2011P4SentenceContexts } from "./2011-passage-4-lexicon";
const rows: PhraseRow[] = [
  ["make-it", "make it", "make it", "成功习语", "渡过难关；成功", "make与it整体表示成功达到目标，此处目标为渡过欧盟危机。", "Despite the crisis, they made it.", "尽管遭遇危机，他们还是挺过来了。", "不是make it+形容词的形式宾语结构。"],
  ["not-long-ago", "not long ago", "not long ago", "时间短语", "不久前", "否定long程度，定位到相距现在不远的过去。", "The idea sounded strange not long ago.", "这个想法不久前听起来还很奇怪。", "不能漏掉not译成很久以前。"],
  ["talk-of", "talk of", "talk of + noun/doing", "谈论搭配", "谈到；谈论", "of后引谈论的危机内容，不表示决定采取行动。", "Even supporters talk of risks.", "连支持者也谈论风险。", "谈论风险不等于正式退出。"],
  ["triangle-of-problems", 'a "Bermuda triangle" of debt, population decline and lower growth', "a triangle of A, B and C", "三项比喻", "债务、人口下降和低增长的三重困境", "三项并列构成triangle所喻的危机，不把地理传闻写作经济事实。", "The economy faces a triangle of debt, decline and slow growth.", "经济面临债务、衰退和缓慢增长的三重困境。", "growth lower为增长走低，未必负增长。"],
  ["as-well-as-addition", "As well as those chronic problems", "as well as + noun", "追加结构", "除那些长期问题外", "在已有问题外增加急迫危机，与同级比较as well as做得一样好区分。", "As well as old problems, we face a new crisis.", "除老问题外，我们还面对新危机。", "此处well不表示做得好。"],
  ["single-currency", "the single currency", "a single currency", "经济名词搭配", "统一货币", "不同成员共用一种货币，本文指欧元。", "The members share a single currency.", "成员国共用一种货币。", "原卷成员数是历史资料，不以今日数字改卷。"],
  ["thanks-to", "thanks to the discipline of sharing a single currency", "thanks to + noun/doing", "原因介词结构", "由于共用货币的纪律约束", "修饰converge解释预想原因，但这一预想处于lost faith否定范围。", "The plan worked thanks to cooperation.", "这个计划因合作而奏效。", "本篇不宣称各经济体实际已经趋同。"],
  ["deny-double-object", "denies uncompetitive members the quick fix of devaluation", "deny somebody something", "双宾语结构", "不让缺乏竞争力成员靠贬值迅速解困", "间接宾语是成员，直接宾语是快速补救手段。", "The rule denies members an easy solution.", "这条规则使成员无法获得简单的解决办法。", "deny that否认命题与deny A B不让A得到B不同。"],
  ["save-from", "save Europe's single currency from disintegration", "save A from B", "动词介词搭配", "挽救欧洲统一货币免于瓦解", "A为被挽救对象，B为希望避免的后果。", "They tried to save the union from collapse.", "他们试图挽救联盟免于崩溃。", "保存货币不等于节省货币。"],
  ["be-stuck", "is stuck", "be stuck", "状态表达", "陷入僵局", "stuck为stick的不规则过去分词，形容讨论进展受阻。", "The debate is stuck.", "讨论陷入僵局。", "不能由讨论僵持推出欧盟已经解体。"],
  ["agree-on-need", "agree on the need for greater harmonisation", "agree on + issue", "共识搭配", "同意有必要加强协调", "on引达成共识的事项，for说明need所需内容。", "They agree on the need for reform.", "他们同意有必要改革。", "赞同有必要不等于对改革每一项都一致。"],
  ["disagree-about", "disagree about what to harmonise", "disagree about + issue", "分歧搭配", "对协调什么有分歧", "what to harmonise为疑问不定式短语，作about宾语。", "They disagree about what to change.", "他们对改变什么存在分歧。", "此处讨论内容不是how的方式，也不是瓦解步骤。"],
  ["saved-by-rules", "must be saved by stricter rules", "must be + past participle + by", "情态被动", "必须靠更严格规则挽救", "must表主张的必要性，by引实现手段。", "The system must be saved by reform.", "这个体系必须通过改革来挽救。", "主张不等于措施已实施。"],
  ["quasi-automatic-sanctions", "quasi-automatic sanctions", "quasi-automatic + noun", "复合定语", "近乎自动触发的制裁", "quasi-弱化完全自动的含义，sanctions为惩罚不是许可。", "The proposal includes quasi-automatic sanctions.", "提案包含近乎自动触发的制裁。", "不要漏掉近乎这一限定。"],
  ["threats-to-freeze", "threats to freeze EU funds", "threats to do", "名词不定式补足", "冻结欧盟资金的威胁", "to freeze说明威胁要做什么，资金为其宾语。", "They faced threats to freeze funds.", "他们面临冻结资金的威胁。", "威胁停资不等于承诺增加资金。"],
  ["suspension-of-rights", "the suspension of a country's voting rights", "the suspension of + right/activity", "名词介词搭配", "暂停一国投票权", "of引被暂停权利，不表权利受到保障。", "The sanction includes suspension of voting rights.", "制裁包括暂停投票权。", "暂停不必然等于永久取消。"],
  ["all-eu-members", "all 27 members of the EU club", "all + number + plural noun", "全称数量结构", "欧盟当时全部27个成员国", "all限定全体，原文借此与货币核心形成对照。", "All members should be involved.", "所有成员都应参与。", "不能偷换成only core members。"],
  ["inner-core-alone", "in the inner core alone", "in + scope + alone", "范围限定", "仅在内部核心中", "alone强调只在较小范围内计算多数。", "In the core alone, views differ.", "仅看核心内部，观点就不同。", "不是孤立无援的情绪alone。"],
  ["headed-by", "headed by France", "be headed by + leader", "被动领导搭配", "由法国领导", "分词短语修饰camp，by引领导者。", "The group is headed by France.", "这个集团由法国领导。", "不是朝法国方向前进的head for。"],
  ["something-adjective", "something different", "something + adjective", "不定代词后置定语", "不同的方案", "形容词放something后，冒号具体说明这个不同方案。", "They want something different.", "他们想要不同的东西。", "不能照普通名词前置定语写成different something。"],
  ["intervene-in", "intervening in monetary policy", "intervene in + issue", "动词介词搭配", "干预货币政策", "politicians为分词逻辑主语，in引介入的领域。", "Politicians intervene in monetary policy.", "政治家干预货币政策。", "干预未限定为紧缩，不自动取strict。"],
  ["redistribute-from-to", "from richer to poorer members", "from A to B", "转移方向", "从富成员向贫成员", "修饰redistribution，from起点to终点不能颠倒。", "Funds move from richer to poorer regions.", "资金从富裕地区转向贫困地区。", "这是39题推论的方向依据。"],
  ["through-eurobonds", "through common Eurobonds", "through + financial instrument", "手段介词短语", "通过共同欧元债券", "解释如何降低政府借款成本。", "Funds could be raised through common bonds.", "可以通过共同债券筹集资金。", "共同债券本身不证明富国实际控制。"],
  ["close-to-people", "close to the French government", "be close to + person/group", "关系形容词搭配", "与法国政府关系密切", "修饰figures相关人士，不仅表示空间距离。", "Figures close to the government suggested reform.", "与政府关系密切的人士提出了改革建议。", "close形容词与close关闭动词区分。"],
  ["agree-to-policy", "agree to some fiscal and social harmonisation", "agree to + proposal", "同意方案", "同意一定财政和社会政策协调", "to为介词，后接名词方案，不是to do的不定式。", "They agreed to fiscal coordination.", "他们同意进行财政协调。", "与agree with somebody赞同某人分清。"],
  ["too-soon-to", "too soon to write off the EU", "too soon to do", "时机评价结构", "现在认定欧盟无望为时尚早", "too表示超过合适程度，否定此时做该判断。", "It is too soon to write off the plan.", "现在就认定这个计划无望还太早。", "不等于计划保证成功，而是不能过早否定。"],
  ["largest-trading-block", "the world's largest trading block", "the world's largest + noun", "最高级结构", "世界最大的贸易集团", "world's限定比较范围，largest为large最高级。", "It remains the largest trading block.", "它仍是最大的贸易集团。", "保留原卷block；此处集团义，非阻挡动作。"],
  ["at-its-best", "At its best", "at one's best", "状态范围习语", "在最佳状态下", "限定对欧洲计划的开放性评价，非无条件赞扬。", "At its best, the system encourages cooperation.", "这一体系运转得好时，能促进合作。", "不能把条件范围删掉而读成任何时候都完美。"],
  ["far-more-open", "far more open to goods, capital and labour", "far + comparative + to + noun", "比较与对象", "对商品、资本、劳动力开放得多", "far加强比较，to引允许跨境流动的三类要素。", "The market is far more open to trade.", "这个市场对贸易开放得多。", "比较自由流动程度，不是土地面积。"],
  ["blunt-edges", "blunt the sharpest edges of globalisation", "blunt the edges of + noun", "动词比喻", "缓和全球化最尖锐的弊端", "blunt使锋芒变钝，比喻减弱负面影响。", "Cooperation can blunt the edges of competition.", "合作可以缓和竞争最尖锐的一面。", "不是消除一切全球化，更不是削弱优势义的edge。"],
  ["make-object-adjective", "make capitalism benign", "make + object + adjective", "使役宾补", "使资本主义趋于温和", "capitalism为宾语，benign为宾补，整体为attempt的目标。", "Rules can make competition fairer.", "规则可使竞争更公平。", "复用make宾补规范结构；与make it成功不同。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2011P4PhraseGuides = reviewed.guides;
export const passage2011P4PhraseAliases = reviewed.aliases;
export const passage2011P4PhraseGlosses = { ...passage2011P4CollocationGlosses, ...reviewed.glosses };
export function getPassage2011P4WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2011P4Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2011P4SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2011P4CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
