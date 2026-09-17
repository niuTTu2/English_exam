import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2011P2Lexicon, passage2011P2CollocationGlosses, passage2011P2SentenceContexts } from "./2011-passage-2-lexicon";

const rows: PhraseRow[] = [
  ["whatever-happened-to", "Whatever happened to the death of newspapers", "Whatever happened to + noun?", "强调疑问结构", "报纸消亡的说法究竟怎么样了", "whatever为主语，happened为谓语，to引所谈对象，常追问原以为会发生之事。", "Whatever happened to that plan?", "那个计划究竟怎么样了？", "不是无论发生什么的让步从句。"],
  ["flee-to", "fled to the internet", "flee to + place", "去向搭配", "转向互联网", "fled为flee过去分词，原句had not fled是过去完成时否定。", "Readers fled to online sources.", "读者转向了网络信息来源。", "to引去向，from才引离开的地点。"],
  ["chronicle-own-doom", "chronicling their own doom", "chronicle one's own doom", "报道自我困境", "记述自身厄运", "own使doom回指报道者本身，动词与Chronicle报纸名形成呼应。", "The paper was chronicling its own decline.", "这家报纸正在记述自身的衰落。", "从这句话可知危机严重，不是报纸没发现危机。"],
  ["round-of-talks", "a round of talks", "a round of + plural noun", "轮次数量结构", "一轮会谈", "round作可数名词，of后接复数会谈而非动词。", "A new round of talks began.", "新一轮会谈开始了。", "不要把round误译成圆形。"],
  ["how-to-save", "how to save newspapers", "how to do", "疑问词不定式", "如何挽救报纸", "how to do可整体作介词about的宾语，不含有限谓语。", "They discussed how to save the paper.", "他们讨论如何挽救这家报纸。", "不是直接疑问句，不倒装成how do to。"],
  ["out-of-date", "out of date", "out of date", "固定表语短语", "过时的；不合时宜的", "作seem表语说明讨论不再符合当下现实。", "The proposal now seems out of date.", "这项提议如今似乎过时了。", "与up to date最新的相反，非日期缺失。"],
  ["little-sign-of", "little sign of crisis", "little sign of + noun", "否定数量结构", "几乎没有危机迹象", "little不带a表达几乎没有，of引迹象所关涉事件。", "There is little sign of recovery.", "几乎看不到复苏迹象。", "little与a little的肯否语气不同。"],
  ["shrug-off", "shrugged off the recession", "shrug off + difficulty", "短语动词", "摆脱衰退冲击", "借耸肩甩开表示不被困难压垮，原句使用现在完成时。", "The industry shrugged off the recession.", "这个行业摆脱了经济衰退的冲击。", "不是文中所有国家都已完全不受影响。"],
  ["not-only-but-verbs", "not only survived but often returned to profit", "not only do A but (also) do B", "递进并列", "不仅存活，而且不少恢复盈利", "survived和returned共用前面的have，often限定后项而非所有报纸。", "The paper has not only survived but returned to profit.", "这家报纸不仅存活下来，还恢复了盈利。", "两个并列项要语法平行，不擅自删掉often。"],
  ["profit-margin", "profit margins", "profit margin", "财务名词搭配", "利润率", "以百分比描述盈利相对于收入的水平，非利润绝对金额。", "The profit margin fell to 5%.", "利润率降到了5%。", "20%是旧常态，本文没有说现在仍有此水平。"],
  ["stay-afloat", "stayed afloat", "stay afloat", "比喻性系表", "维持经营；免于破产", "stay保持状态，afloat从漂浮引申为企业得以存活。", "The paper cut costs to stay afloat.", "这家报纸通过削减成本维持经营。", "这里不是实体漂在水面上。"],
  ["push-overboard", "pushing journalists overboard", "push somebody overboard", "比喻性动词结构", "裁减记者岗位", "字面推下船与stay afloat呼应，比喻企业牺牲员工维持生存。", "In the metaphor, workers are pushed overboard.", "在这个比喻中，员工被牺牲了。", "语境是裁员，不描述真实暴力事件。"],
  ["jobs-have-gone", "newsroom jobs have gone", "jobs have gone", "岗位流失表达", "新闻编辑部岗位已被裁撤", "go用于岗位消失，have gone表截至现在的结果。", "Thousands of jobs have gone since 2007.", "自2007年以来，数千个岗位已消失。", "数量是岗位而不是公司数。"],
  ["pay-for-products", "paying more for slimmer products", "pay + amount + for + product", "支付搭配", "为更薄的产品支付更多", "more省略money，for引所购产品，slimmer说明报纸内容减少。", "Readers pay more for thinner papers.", "读者花更多钱买更薄的报纸。", "不能译成更多读者付费。"],
  ["have-nerve-to-do", "had the nerve to refuse delivery", "have the nerve to do", "态度色彩习语", "竟敢拒绝送报", "nerve在此为胆量，常带说话者不满或惊讶；had为实义过去式。", "They had the nerve to raise prices again.", "他们竟然敢再次涨价。", "不是神经疾病，也不是完成时had done。"],
  ["prove-right", "have proved the right ones", "prove + noun/adjective complement", "结果系表结构", "已证明是正确的措施", "prove可作系动词，ones替代measures；表语不必用to be。", "The measures proved effective.", "这些措施证明是有效的。", "ones不是指被证明正确的记者。"],
  ["push-further", "be pushed further", "push something further", "推进程度搭配", "进一步推行", "原文情态被动can be pushed，主语they为measures。", "The reforms can be pushed further.", "改革可以进一步推进。", "不要把they误指记者并译成推得更远。"],
  ["mix-of-revenues", "a healthier mix of revenues", "a mix of + sources", "组合结构", "更稳健的收入组合", "mix是名词，of后说明组成，来自读者与广告的比例更均衡。", "A balanced mix of revenues reduces risk.", "均衡的收入组合可降低风险。", "比例更健康不等于来源种类增加。"],
  ["reliance-on", "in their reliance on ads", "reliance on + noun", "名词介词搭配", "在依赖广告方面", "reliance为名词，on引依赖对象，外层in限定unusual的方面。", "Their reliance on ads is high.", "他们对广告的依赖很高。", "rely on是动词结构，不能与reliance混算原形。"],
  ["fully-percentage", "Fully 87% of their revenues", "fully + number/percentage", "数量强调", "收入中高达87%的部分", "fully数字前表足足，并不改变后面的百分比数值。", "Fully 80% of the revenue came from ads.", "收入中足足80%来自广告。", "此句例数为教学例句，真题数据仍为87%。"],
  ["sweep-through", "swept through newsrooms", "sweep through + place", "扩散比喻", "席卷新闻编辑部", "swept为sweep过去式，与whirlwind风暴比喻配合。", "The changes swept through newsrooms.", "这些变化席卷了新闻编辑部。", "不是日常清扫动作。"],
  ["least-distinctive", "least distinctive", "least + adjective", "最低程度最高级", "最缺乏特色的", "least修饰distinctive，说明区别于其他来源的独特性最低。", "Cuts fell on the least distinctive sections.", "削减落在最缺乏特色的栏目上。", "least不是at least至少，不能漏读否定方向。"],
  ["so-aux-subject", "So have science and general business reporters", "So + auxiliary + subject", "肯定承接倒装", "科学和普通商业记者也一样", "have承接前句have gone，省略gone；谓语助动词置于主语前。", "The reviewers have gone. So have the reporters.", "评论员被裁掉了，记者也一样。", "So在这里不是因果因此；否定承接则常用Neither。"],
  ["cut-off-bureaus", "have been savagely cut off", "be cut off", "被动裁撤搭配", "已遭大幅裁撤", "have been cut构成现在完成时被动，savagely说明削减强度。", "Several foreign bureaus have been cut off.", "几家驻外新闻机构已被裁撤。", "cut过去式和过去分词同形；不改写原卷为cut back。"],
  ["no-longer-state", "no longer a virtue", "no longer + state/action", "时间否定", "不再是优势", "no longer否定从前状态现在继续，不等于从来不是。", "Completeness is no longer enough.", "面面俱到已经不再足够。", "不再有优势不能直接推出它造成失败。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2011P2PhraseGuides = reviewed.guides;
export const passage2011P2PhraseAliases = reviewed.aliases;
export const passage2011P2PhraseGlosses = { ...passage2011P2CollocationGlosses, ...reviewed.glosses };

export function getPassage2011P2WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2011P2Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2011P2SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2011P2CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
