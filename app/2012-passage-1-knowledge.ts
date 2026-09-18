import { passage2012P1ReviewedContexts, passage2012P1ContextGlosses } from "./2012-passage-1-contexts";
import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2012P1Lexicon, passage2012P1CollocationGlosses, passage2012P1SentenceContexts } from "./2012-passage-1-lexicon";
const rows: PhraseRow[] = [
  ["popular-with", "popular with students", "be popular with somebody", "形容词对象搭配", "受某人欢迎", "with后接持喜爱态度的人群，不表示共同完成动作。", "The game is popular with children.", "这个游戏很受孩子们欢迎。", "populous指人口多，不等于popular受欢迎。"],
  ["in-recent-years", "in recent years", "in recent years", "时间状语", "近年来", "常与现在完成时连用，表示过去一段时间延伸到现在。", "Demand has grown in recent years.", "近年来需求增长了。", "不能把近年来的变化推成永远不变的事实。"],
  ["thinking-on", "thinking on this educational ritual", "thinking on + issue", "名词介词结构", "对某问题的思考", "on限定thinking所针对的议题，中心词是名词thinking。", "They revised their thinking on homework.", "他们修正了对家庭作业的看法。", "on不是物理位置；revise比review多修正意味。"],
  ["with-exception-of", "with the exception of", "with the exception of + noun", "例外范围结构", "除……之外", "从一般规则适用对象中排除指定对象。", "All courses follow the rule with the exception of two.", "除两门课外，所有课程都遵守该规则。", "部分课程不适用上限，不意味着这些课程无作业。"],
  ["no-longer", "no longer", "no longer + verb", "时间否定", "不再", "否定某状态继续存在，在may之后修饰count。", "It may no longer be required.", "它可能不再是必需的。", "not any longer同义；不能译成从来没有。"],
  ["count-for", "count for more than 10%", "count for + proportion", "比例结构", "占……比重", "本句比例受no longer否定，要求不再超过10%。", "Homework counts for ten percent.", "作业占成绩的百分之十。", "count on是依靠，count for这里是计分权重。"],
  ["be-meant-to", "is meant to address", "be meant to do", "被动意图结构", "旨在；目的是", "不定式说明预期目的，不保证实际达成。", "The rule is meant to help students.", "该规定旨在帮助学生。", "mean doing表示意味着，mean to do表示打算，需区分结构。"],
  ["have-difficulty-in", "difficulty that students from impoverished or chaotic homes might have in completing their homework", "have difficulty (in) doing", "困难搭配", "做某事有困难", "原文把difficulty提前为先行词，that在从句中作have宾语。", "They have difficulty completing homework.", "他们完成作业有困难。", "不能因名词提前而遗漏that宾语关系，也不用difficulty to do替代这里的搭配。"],
  ["on-ones-own", "on their own", "on one's own", "方式状语", "独立地；靠自己", "物主代词随动作主语变化，此处their指学生。", "She completed it on her own.", "她独立完成了它。", "of one's own为属于自己的，on one's own为独立做。"],
  ["cannot-do-without", "cannot do without expensive equipment", "cannot do something without + noun", "否定条件结构", "没有……就做不了", "do的宾语由关系代词that承担，without说明缺少的条件。", "They cannot do the task without equipment.", "没有设备他们就做不了这项任务。", "本句do为完成任务，不能误成不需要设备。"],
  ["give-a-pass", "giving a pass to students", "give a pass to somebody", "比喻性放行结构", "放过；不予追究", "对某类未完成作业学生免责，pass并非此处的具体考试分数。", "The rule gives a pass to absent members.", "该规定不追究缺席成员。", "语境不是派发公交卡或自动给及格分。"],
  ["because-of", "because of complicated family lives", "because of + noun/doing", "原因介词结构", "因为；由于", "后接名词短语，解释不做作业的原因。", "He was absent because of family problems.", "他因家庭问题缺席。", "because后接从句，because of后接名词性成分。"],
  ["close-to", "close to the implication", "close to + noun", "程度接近结构", "接近；近乎", "to为介词，后接一种含义，而不是行动方向。", "The policy comes close to discrimination.", "这项政策近乎歧视。", "close to这里非空间距离；原文说危险接近，不是已明文规定。"],
  ["part-of", "a part of schooling", "a part of + noun", "部分整体关系", "……的一部分", "schooling为整体，homework为其中一项。", "Practice is a part of learning.", "练习是学习的一部分。", "一部分不等于全部，也不预设唯一重要部分。"],
  ["be-allowed-to", "are allowed to assign", "be allowed to do", "许可被动", "被允许做", "说明教师拥有布置作业的许可，不等于必须布置。", "Teachers are allowed to choose.", "教师可以自行选择。", "allow someone to do的被动把someone变为主语。"],
  ["as-much-as", "as much of it as they want", "as much of A as somebody wants", "数量比较", "想要多少A就多少", "much适配不可数homework，后一个as从句省略重复宾语。", "Take as much of it as you need.", "你需要多少就拿多少。", "可数复数用as many，不把homework当可数。"],
  ["no-more-than", "no more than 10%", "no more than + quantity", "数量上限", "不超过；至多", "本文明确规定成绩权重上限，并非恰好等于该值。", "It takes no more than ten minutes.", "这至多需要十分钟。", "no less than至少，与no more than方向相反。"],
  ["skip-half", "skip half their homework", "skip half + noun phrase", "动宾数量结构", "少做一半；略过一半", "half限定省略量，homework仍为不可数。", "They skipped half the work.", "他们少做了一半工作。", "不能把half译成全部，否则扩大政策后果。"],
  ["report-card", "report cards", "report card", "复合名词", "成绩单", "report修饰card，整体为学校记录成绩的单据。", "Her report card shows progress.", "她的成绩单显示她取得了进步。", "不是记者证，也不是新闻卡片。"],
  ["do-well-on", "do well on state tests", "do well on a test", "表现搭配", "在考试中表现好", "well为副词，on限定表现领域。", "She did well on the test.", "她这次考试考得很好。", "do good指做好事，不能替换do well。"],
  ["what-about", "what about the students", "what about + noun/doing", "省略疑问结构", "那……又如何", "引出需要考虑的另一类学生，是反问而非完整陈述句。", "What about the other students?", "其他学生又怎么样呢？", "不能把问句预先当成对所有学生的肯定结论。"],
  ["rather-than", "rather than empowering teachers", "rather than + doing", "对照结构", "不是……而是；而非", "原文对比赋予教师判断权与强推统一规则。", "They impose rules rather than asking teachers.", "他们强加规则，而不征求教师意见。", "rather than后的未选方案不能译成实际已经实施。"],
  ["work-best-for", "what works best for their students", "what works best for somebody", "名词性关系结构", "对某人最奏效的做法", "what兼作连接成分和works主语，整体为find的宾语。", "Find what works best for you.", "找到最适合你的做法。", "work为奏效，best副词修饰它，不是最好的工作职位。"],
  ["across-the-board-rule", "across-the-board rule", "an across-the-board rule", "复合定语搭配", "全面统一、一刀切的规定", "across-the-board整体修饰rule，不按各对象差异调整。", "They rejected an across-the-board rule.", "他们拒绝了一刀切规定。", "board不是此短语中单独的学校董事会。"],
  ["at-same-time", "At the same time", "at the same time", "篇章衔接", "与此同时；此外", "在本篇引出关于作业本质问题的另一批评。", "The plan is cheap; at the same time, it is risky.", "该计划成本低，但同时也有风险。", "可连接不同方面，不必都译成精确时间同步。"],
  ["thorny-question", "thorny questions", "a thorny question", "比喻性定语", "棘手问题", "thorny从带刺引申为难处理，修饰questions。", "This is a thorny question.", "这是个棘手问题。", "不要按字面译带刺的提问。"],
  ["find-to-be", "finds homework to be unimportant", "find A to be B", "复合宾语", "认为A是B", "A为宾语，to be B为宾语补足语。", "They found the rule to be useful.", "他们认为这条规则有用。", "if条件中的认定不是作者已经证明的事实。"],
  ["count-for-nothing", "count for almost nothing", "count for (almost) nothing", "价值权重搭配", "几乎不起作用；几乎不占比重", "本文特指作业计入成绩的权重极小。", "Homework counts for almost nothing.", "作业在成绩中几乎不占比重。", "不是作业本身空无一物，亦非论证其教育价值必然为零。"],
  ["account-for", "account for a significant portion", "account for + proportion", "占比结构", "占据；构成", "以份额作宾语，强调计分分量。", "Homework accounts for a quarter of the grade.", "家庭作业占成绩的四分之一。", "account for a failure才可能为解释失败，本句是占比。"],
  ["do-nothing-to", "does nothing to ensure", "do nothing to do", "否定行动结构", "没有采取任何措施来", "不定式说明尚未采取行动的目标，不推论目标反面必然发生。", "The policy does nothing to improve quality.", "该政策未采取措施提高质量。", "缺乏保障不等于所有作业实际都毫无意义。"],
  ["appropriate-to", "appropriate to their age and the subject", "appropriate to + noun", "适配对象结构", "适合于", "age与subject共同作to的宾语，说明两个适配维度。", "The task is appropriate to their age.", "这项任务适合他们的年龄。", "their回指学生，不是教师年龄。"],
  ["be-willing-to", "are willing to review and correct", "be willing to do", "意愿结构", "愿意做", "review和correct共用to，表示教师愿意承担的检查批改量。", "They are willing to review the work.", "他们愿意检查这份作业。", "willing为愿意，able为能够，不能把意愿换成能力。"],
  ["put-on-hold", "be put on hold", "put A on hold", "暂缓习语", "暂停；暂缓", "被动结构说明政策先搁置，等待调查。", "The rule was put on hold.", "该规则被暂缓执行。", "暂停不等于永久废除或彻底否定。"],
  ["responsible-for", "is responsible for setting educational policy", "be responsible for + noun/doing", "职责搭配", "负责", "for后接动名词，说明董事会职责。", "The board is responsible for setting policy.", "董事会负责制定政策。", "responsible for有负责或承担责任义，此处明确职责而非责备。"],
  ["look-into", "looks into the matter", "look into + issue", "调查短语", "调查；研究", "into与look组成整体，对象为政策问题。", "The board will look into the matter.", "董事会将调查此事。", "look at可只看或考虑，look into强调调查。"],
  ["conduct-hearing", "conducts public hearings", "conduct a public hearing", "动宾搭配", "举行公开听证会", "conduct为组织主持，hearing为正式听取意见的会议。", "They conducted a public hearing.", "他们举行了一次公开听证会。", "hearing不是此处的听觉能力。"],
  ["not-too-late", "not too late", "not too late for somebody to do", "时机评价", "某人做某事还来得及", "It为形式主语，for指出采取行动的人。", "It is not too late to change.", "现在改变还来得及。", "not否定太晚，不能漏否定译成来不及。"],
  ["do-homework-right", "do homework right", "do something right", "动词副词结构", "把某事做好", "right副词修饰do，文章用作业比喻学区本身的政策研究。", "They need to do the work right.", "他们需要把这项工作做好。", "right不是权利名词，也不是右边的位置。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2012P1PhraseGuides = reviewed.guides;
export const passage2012P1PhraseAliases = reviewed.aliases;
export const passage2012P1PhraseGlosses = { ...passage2012P1CollocationGlosses, ...reviewed.glosses, ...passage2012P1ContextGlosses };
export function getPassage2012P1WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const sourceContext = sentenceId ? passage2012P1ReviewedContexts[sentenceId]?.[headword] : undefined;
  if (sourceContext) return { grammarRole: sourceContext.partOfSpeech!, grammarSummary: sourceContext.use!, structures: [{ pattern: sourceContext.pattern, meaning: sourceContext.patternMeaning, rule: sourceContext.use! }], pitfalls: [] };
  const entry = passage2012P1Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2012P1SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2012P1CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
