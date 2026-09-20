/**
 * Reviewed equivalences within a lemma and part of speech. These identify an
 * existing meaning; they are not replacement translations or a parallel lexicon.
 * Keep the source gloss/use in the source detail. In particular, shared Chinese
 * fragments are not sufficient evidence (社会的 ≠ 社交的; 发现 ≠ 认为).
 * IDs shared with vocabulary-senses.ts deliberately retain that guide's ID.
 */
import { normalizeMeaning } from "./semantic-normalization";

export type ReviewedSemanticAlias = { id: string; pos: string; meaning: string; aliases: readonly string[] };
const group = (pos: string, id: string, meaning: string, ...aliases: string[]): ReviewedSemanticAlias => ({ pos, id, meaning, aliases: [meaning, ...aliases] });

export const reviewedSemanticAliases: Readonly<Record<string, readonly ReviewedSemanticAlias[]>> = {
  and: [group("conj", "coordination", "和；并且", "和", "并且", "而且", "而且；而", "而；并且", "又；而且", "而且；并且", "和；且", "和（时间界点）", "又；并且", "连接范围的两端", "并且；还", "和；而")],
  or: [group("conj", "alternative", "或者；或是", "或者", "或", "或者；或至少", "或者；还是；并且（否定并列）"), group("conj", "reformulation", "也就是；换言之")],
  but: [group("conj", "contrast", "但是；然而", "但是", "但是；却", "但是；而", "但")],
  although: [group("conj", "concession", "尽管；虽然", "尽管")],
  if: [group("conj", "condition", "如果；若", "如果", "假如", "如果；要不是")],
  since: [group("conj", "reason", "因为", "由于"), group("prep", "time-start", "自……以来", "自从")],
  while: [group("conj", "concession", "虽然；尽管", "虽然"), group("conj", "simultaneous", "在……的同时", "在……期间"), group("conj", "contrast", "而；然而", "而（画面中的夫妻对照）", "而（同时形成对照）", "而；与此同时")],
  also: [group("adv", "addition", "也；还", "也")],
  however: [group("adv", "contrast", "然而；不过", "不过；然而"), group("adv", "concessive-degree", "无论多么")],
  yet: [group("conj", "contrast", "然而", "然而；可是", "但又"), group("adv", "not-yet", "尚；还")],
  not: [group("adv", "negation", "不；否定", "不", "不；不要", "并非", "没有", "不；并非", "不；不是", "不是", "尚未（与already连用）")],
  only: [group("adv", "restriction", "只有；仅仅", "仅仅", "只有", "仅仅；只是", "只有；仅在", "只；仅仅", "只有；仅有"), group("adj", "sole", "唯一的")],
  even: [group("adv", "emphasis", "甚至", "甚至；就连", "连……都", "还要；甚至", "甚至；还", "甚至；连……都")],
  often: [group("adv", "frequency", "经常；常常", "经常；往往", "经常", "常常；不少情况下", "常常", "常常；往往")],
  then: [group("adv", "subsequent", "然后；接着", "后来", "然后"), group("adv", "at-that-time", "那时", "当时", "进入此次衰退的那时")],
  once: [group("adv", "formerly", "曾经；一度", "曾经")],
  about: [group("prep", "topic", "关于", "关于；围绕", "针对；关于", "关于；在……方面", "关于；就……而言", "对；关于"), group("adv", "approximate", "大约", "大约；大致")],
  like: [group("prep", "example", "例如；诸如", "例如", "像；例如", "例如；像……这样的"), group("prep", "similarity", "像……一样", "像")],
  into: [group("prep", "entry", "进入；到……里面", "进入"), group("prep", "change-state", "成为；进入某种状态", "进入某种状态", "成为（结果）"), group("prep", "division", "分成", "分成；归入")],
  toward: [group("prep", "direction", "朝向；趋向", "朝向", "趋向", "朝着；接近"), group("prep", "relation", "对于；针对", "对于")],
  under: [group("prep", "less-than", "不到；小于", "小于；未满"), group("prep", "condition", "处于……状态", "处于", "在……条件下")],
  off: [group("prep", "separation", "从……上离开", "从……离开")],
  new: [group("adj", "new", "新的；新出现的", "新的", "新的；最新的", "新出的", "新兴的", "新的；新型的", "新的；新近的")],
  important: [group("adj", "importance", "重要的", "重要的；作用重大的")],
  significant: [group("adj", "notable", "显著的；重要的", "显著的", "相当大的；显著的", "重大的；显著的", "显著且值得关注的", "重要的")],
  large: [group("adj", "size", "大的；大量的", "更大的", "规模大的", "大的", "大的；宽大的")],
  low: [group("adj", "low", "低的", "较低的", "更低的", "不足的；少的")],
  high: [group("adj", "high", "高的；程度高的", "高的", "高的；更高层级的")],
  bad: [group("adj", "bad", "糟糕的", "不佳的", "不好的", "更糟的", "坏的；严重的")],
  poor: [group("adj", "poverty", "贫困的", "贫穷的", "贫苦的", "贫困的；经济较弱的")],
  rich: [group("adj", "wealth", "富裕的", "更富裕的")],
  foreign: [group("adj", "foreign", "外国的；外来的", "外来的；来自外国的", "外国的；国外的", "外国的"), group("adj", "abroad", "驻外的", "驻外的；国外的")],
  true: [group("adj", "truth", "真实的；符合事实的", "成立的；符合事实的", "确实如此的", "属实的；正确的", "成立的；适用的", "符合事实或文意的", "符合原文的")],
  same: [group("adj", "same", "相同的", "相同的；同样的规律", "相同的；同一的", "同样的")],
  positive: [group("adj", "favourable", "积极的；有利的", "积极的；有益的", "正面的；积极的")],
  right: [group("adj", "correct", "正确的", "正确的；合适的", "正确的；有效的")],
  great: [group("adj", "large-degree", "巨大的", "大的", "更大的", "更大的；更严重的", "程度高的；强的"), group("adj", "importance", "重大的；重要的", "普遍重大的")],
  art: [group("n", "art", "艺术", "艺术；艺术品领域", "艺术；艺术创作", "艺术（各门类）"), group("n", "skill", "技巧；手法", "技艺；手法")],
  way: [group("n", "method", "方式；方法", "方式", "办法", "方法")],
  pattern: [group("n", "pattern", "模式；行为方式", "行为模式", "模式；惯例", "模式", "模式；样式", "模式；方式", "模式；惯常形态")],
  problem: [group("n", "difficulty", "问题；难题", "问题", "问题；困难", "问题；缺陷", "健康问题；疾病状况")],
  government: [group("n", "government", "政府", "政府；政府机构")],
  information: [group("n", "information", "信息；资讯", "信息；资料")],
  economy: [group("n", "economy", "经济；经济体系", "经济", "经济；经济状况", "经济；经济体")],
  development: [group("n", "development", "发展", "发展；成长过程", "发展；演变", "发展；发展过程", "发展；变化；进程")],
  industry: [group("n", "industry", "工业；行业", "行业", "产业；行业", "工业", "行业；报业", "各工业部门；行业", "工业；产业")],
  worker: [group("n", "worker", "工人；工作人员", "工作者", "职员；工作人员", "工作者；人才", "工作者；专业人才", "工人；劳动者")],
  school: [group("n", "school", "学校；院校", "学院；学校", "学校；上学", "学校；学校教育的", "学院")],
  group: [group("n", "group", "群体；小组", "群体；组", "团体；一群人")],
  name: [group("n", "name", "名称；名字", "姓名", "名字")],
  class: [group("n", "social-class", "阶级；阶层", "阶层", "阶级")],
  part: [group("n", "part", "部分", "部分；环节", "一部分", "组成部分；群体")],
  result: [group("n", "result", "结果", "结果；产物")],
  difference: [group("n", "difference", "差异；差别", "差异", "差别")],
  nature: [group("n", "character", "本性；本质", "本性", "性质")],
  chance: [group("n", "opportunity", "机会", "机会；时机", "人生机会；发展前景")],
  time: [group("n", "period", "时期；时代", "时期", "时期；日子", "时期；时候"), group("n", "time", "时间", "时间；时刻"), group("n", "times", "次数", "次")],
  end: [group("n", "end", "末尾；结尾", "末尾；结束时", "末尾")],
  home: [group("n", "home", "家", "家；住宅；在家", "家庭；家庭环境"), group("adv", "homeward", "回家；到家", "回家")],
  power: [group("n", "authority", "权力；权限", "权力"), group("n", "ability", "力量；能力", "能力", "效力；作用能力")],
  control: [group("n", "control", "监管；控制", "监管；控制力", "控制；限制", "管制；控制", "掌控", "控制", "控制权", "控制；协调管理")],
  market: [group("n", "market", "市场", "市场；艺术品交易市场", "市场；金融市场参与者")],
  research: [group("n", "research", "研究；调查", "研究"), group("v", "research", "研究；调查", "研究")],
  study: [group("n", "research", "研究", "研究；研究工作", "研究；考察"), group("v", "study", "研究", "研究；考察")],
  support: [group("n", "support", "支持", "支持；资助", "资金支持；援助"), group("v", "support", "支持")],
  influence: [group("n", "influence", "影响；影响力", "影响", "影响；推动力"), group("v", "influence", "影响", "影响；影响力")],
  effect: [group("n", "effect", "影响；结果", "效果", "影响", "气流带来的有益效应", "效应；关联程度")],
  become: [group("v", "change-state", "变得；成为", "变得；进入某状态", "成为", "变得", "变成；成为")],
  seem: [group("v", "seem", "似乎；看起来", "似乎；看来", "似乎")],
  need: [group("v", "need", "需要", "需要；必需", "所需要的"), group("n", "need", "需求", "需要；必需")],
  require: [group("v", "require", "要求；需要", "要求", "要求；使……成为必要", "需要")],
  find: [group("v", "discover", "发现；查明", "发现", "通过研究发现"), group("v", "locate", "寻找；找出", "寻找")],
  see: [group("v", "regard", "看作；视为", "看作；认为", "把……看作"), group("v", "perceive", "看到；观察到", "看见")],
  show: [group("v", "indicate", "显示；表明", "显示", "显现", "表明")],
  say: [group("v", "say", "说；表示", "说", "说；据说", "据说；报道", "说；谈", "说；认为", "说；劝慰", "说；表明", "说；主张", "说；表述")],
  think: [group("v", "opinion", "认为；看作", "认为", "认为；看待")],
  learn: [group("v", "learn-fact", "得知", "得知；推知", "了解到"), group("v", "acquire", "学会；逐渐掌握", "学习")],
  help: [group("v", "help", "帮助；有助于", "帮助；促成", "有帮助；起促进作用", "有助于", "帮助"), group("n", "help", "帮助")],
  increase: [group("v", "increase", "增加；增长", "增加", "增强", "增加了的"), group("n", "increase", "增幅", "增加；增长")],
  fail: [group("v", "not-achieve", "未能；没有做到", "未能", "未能做到")],
  include: [group("v", "include", "包括；纳入", "包括", "纳入")],
  involve: [group("v", "involve", "涉及；包含", "涉及", "涉及；卷入", "涉及；使参与")],
  introduce: [group("v", "introduce", "引入；开始采用", "引入；提出；使开始接触", "引入；推行", "引入")],
  improve: [group("v", "improve", "改善", "提高；改进")],
  cause: [group("v", "cause", "造成；导致", "造成；引起", "导致"), group("n", "cause", "原因", "病因；原因")],
  lead: [group("v", "cause", "导致；促成", "促使；导致", "导致")],
  fall: [group("v", "decrease", "下降；下跌", "下降", "下降；缩小"), group("v", "drop", "掉落；坠落", "坠落")],
  get: [group("v", "obtain", "得到；取得", "获得", "获得；拥有", "获得；找到"), group("v", "become", "变得；进入某状态", "变得"), group("v", "overcome", "克服", "克服（与 over 连用）")],
  leave: [group("v", "leave-state", "使……处于某状态", "使……仍处于某状态", "使……变得")],
  look: [group("v", "appear", "看起来", "显得；看起来"), group("v", "look", "看；观察", "观察"), group("v", "look-back", "回看（搭配中的动作）", "看；回看（搭配中的动作）")],
  hold: [group("v", "organise", "举行；召开", "举办；召开")],
  remain: [group("v", "remain", "仍然是；保持", "仍然；保持", "仍然是", "仍然存在；保持")],
  pay: [group("v", "pay", "支付；付费", "支付", "支付；付给报酬")],
  report: [group("v", "report", "报告；报道", "报告", "报道")],
  want: [group("v", "want", "希望；想要", "想要", "希望", "想要；希望")],
  seek: [group("v", "seek", "寻找；寻求", "寻求", "寻找")],
  write: [group("v", "write", "写；撰写", "写道；撰写", "写下；填写", "写作；报道", "写到；论述")],
  share: [group("v", "hold-in-common", "认同；共同持有", "共有；持有同样的", "共享；认同", "共有；具有相同的", "共同认同"), group("n", "stock", "股票；股份", "股票")],
  // Existing curated guides define these stable IDs; aliases absorb wording only.
  address: [group("v", "deal-with", "处理；着手解决", "处理问题，如 address a problem")],
  state: [group("v", "say", "陈述；明确说明", "陈述；声明"), group("n", "region", "州；邦", "州（国名组成）", "州（美国名称组成）", "州；州级的", "州；国家（国名组成）", "州；国家（United States组成词）")],
  mean: [group("v", "signify", "意指；意思是", "意思是；表示", "意为；意思是", "意指；表示"), group("v", "intend", "打算；有意", "意在；打算")],
  issue: [group("n", "topic", "议题；问题；争论点", "争议问题", "争议问题；议题"), group("v", "announce", "发布；颁布", "发布；发出"), group("v", "provide", "发给；供给；签发", "签发；颁发")],
  figure: [group("n", "person", "人物", "人士；人物"), group("n", "number", "数字；数量", "数字；统计数值")],
  account: [group("n", "description", "叙述；描述；报道", "叙述；介绍")],
  matter: [group("n", "affair", "事情；问题", "这件事；作业政策问题", "事情；情况"), group("v", "importance", "要紧；有影响；重要", "有重要性；有价值")],
  term: [group("n", "word", "术语；措辞", "购物者常用的术语", "术语；说法")],
  move: [group("n", "action", "行动；举措；一步棋", "决定；举措", "限制快餐广告与赞助的举措", "举措；措施")],
  value: [group("n", "principles", "价值观；行为准则", "价值观；价值准则")],
  observe: [group("v", "notice", "注意到；察觉", "观察到", "观察到；注意到")],
};

const indexes = new Map<string, Map<string, ReviewedSemanticAlias[]>>();

/** Unknown/mixed POS can resolve only if the complete gloss has one reviewed match. */
export function getReviewedSemanticAlias(termKey: string, pos: string, meaning: string): ReviewedSemanticAlias | undefined {
  const groups = reviewedSemanticAliases[termKey];
  if (!groups) return undefined;
  let index = indexes.get(termKey);
  if (!index) {
    index = new Map();
    for (const group of groups) for (const alias of group.aliases) {
      const key = normalizeMeaning(alias);
      const matches = index.get(key) ?? [];
      if (!matches.includes(group)) matches.push(group);
      index.set(key, matches);
    }
    indexes.set(termKey, index);
  }
  const matches = (index.get(normalizeMeaning(meaning)) ?? []).filter(group => !pos || pos.split("/").includes(group.pos));
  return matches.length === 1 ? matches[0] : undefined;
}
