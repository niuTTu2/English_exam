import type { ArticleGuide } from "./article-teaching";
import type { SentenceAnalysis } from "./data";
import { createV2Sentence, type QuickReading } from "./article-v2/model";
import { passage2013P1Texts as texts, passage2013P1ParagraphNumbers } from "./2013-passage-1-source";
import { passage2013P1Deep } from "./2013-passage-1-structure";

// Each slash boundary is editorially chosen. Store ranges, never another copy of the sentence.
const quick: Array<[meaning: string, obstacle: string, role: string, starts: string[], reasons: QuickReading["keyReasons"], phrases: string[]]> = [
  ["亚当·戴维森在《在美国取得成功》一文中讲了一个棉纺地区的笑话，说明现代纺织厂的自动化程度：如今一家普通工厂只要两个雇员——一个人和一条狗。", "先抓作者 relates a joke（讲笑话），冒号后才是笑话内容；only two employees 用夸张说明自动化程度。", "用工厂笑话引出技术对用工需求的影响。", ["the author Adam Davidson", "relates a joke", "about just how much", "The average mill"], ["answer-evidence", "nested-clause"], []],
  ["人负责喂狗，狗负责让人远离机器。", "狗不是帮助人操作机器，而是让人别碰机器；笑点在于生产已无需人直接参与。", "补足笑话的反常安排，让自动化替代人工的意思具体可见。", ["and the dog"], [], ["keep the man away from"]],
  ["戴维森的文章和最近多篇文章都指出：失业率居高不下、中产收入下降，主要是大衰退使需求锐减，也因为全球化和信息技术的进步正以前所未有的速度让机器或外国工人替代劳动力。", "先把长句分成两层：文章提出一个观点；观点再解释两类原因。but it is also 增加原因，不是否定经济衰退的影响。", "从笑话转入现实，交代需求下降与结构性替代两类就业压力。", ["that have recently appeared", "that the reason", "is largely", "but it is also", "which are"], ["nested-clause", "reference-or-scope", "main-line"], ["making the point", "because of", "replacing labor with machines or foreign workers"]],
  ["过去，技能普通、做着普通工作的人，也能过上普通水平的生活。", "三个 average 分别说技能、工作和生活水平；could earn 说的是过去能做到。", "建立过去的参照，为下句的今昔转折作铺垫。", ["workers", "could earn"], [], ["In the past"]],
  ["但如今，靠一般水平就能过日子的时代确实结束了。", "average is over 不是平均数算完了，而是仅有普通能力已不够；officially 在这里起强调作用。", "直接提出全文反复出现的中心判断。", ["average"], ["paragraph-turn", "main-line"], []],
  ["仅仅达到普通水平，再也不能让你获得过去那样的回报。", "what it used to 后面省略了 earn you；先补出过去的回报，再与 won't 的现在否定相比较。", "解释“普通水平已不够”具体意味着什么。", ["just won't earn you", "what it used to."], ["reference-or-scope", "misreading"], ["used to"]],
  ["确实不能，因为如今更多雇主更容易获得大量水平高于一般、价格低廉的外国劳动力，以及廉价的机器人、软件、自动化技术和优秀人才。", "It can't 承接上一句：普通水平不能再换来旧回报。when 在这里说明这种局面下的原因；后面的清单都跟着 access to。", "说明普通劳动者为什么面临更强的替代竞争。", ["when so many more employers", "have so much more access to", "cheap robotics"], ["reference-or-scope", "inference-context"], ["access to"]],
  ["因此，每个人都得找到自己额外的优势——也就是能让自己在所从事领域脱颖而出的独特价值贡献。", "破折号后解释 extra 是什么；that 从句说明什么样的 contribution，whatever 表示无论从事什么领域。", "给个人提出对策，也是第22题的直接依据。", ["everyone needs to find their extra", "their unique value contribution", "that makes them stand out", "in whatever"], ["answer-evidence", "nested-clause"], ["stand out"]],
  ["是的，新技术一直在吞噬就业岗位，而且以后仍会如此。", "eating jobs 是挤掉岗位的比喻；always will 省去了重复的动作。", "承认技术替代工作不是新现象，为强调加速作让步。", ["and always will."], [], []],
  ["但这一过程已经加快了。", "an acceleration 承接技术取代工作的过程，重点是速度加快。", "提出第四段的中心判断，后面的数字用来证明它。", [], ["paragraph-turn", "answer-evidence"], []],
  ["戴维森指出，截至2009年的十年间，美国工厂裁员快到几乎抹去了此前七十年新增的就业岗位；大约每三个制造业岗位就有一个消失，总数约六百万。", "gains 指前文就业岗位的增加，不是技术成果或企业利润；so fast that 把速度与后果连接起来。", "用十年抵消七十年、约三分之一岗位消失的数字证明失业加速。", ["In the 10 years", "factories shed workers", "that they erased", "roughly one out", "– about 6 million", "– disappeared."], ["answer-evidence", "reference-or-scope", "attachment"], ["one out of every three", "in total"]],
  ["变化总会发生——会出现新工作、新产品、新服务。", "破折号后列举 change 包含什么，不是在宣布失业压力已经解决。", "承认新机会仍会产生，为下一句限定优质岗位的门槛作铺垫。", ["– new jobs"], [], []],
  ["但有一点可以肯定：全球化和信息技术每前进一步，最好的工作就会要求劳动者接受更多、更好的教育，使自己超出普通水平。", "先读 the one thing is that（确定的一点是）；真正的岗位要求在 that 后。make themselves 的执行者是劳动者。", "把个人独特优势与教育联系起来，承上启下导向公共对策。", ["is that", "with each advance", "the best jobs", "will require workers", "to make themselves"], ["main-line", "nonfinite-actor", "nested-clause"], ["for sure", "require workers to have"]],
  ["在普通水平已经不够的世界里，支持就业有很多事可做，但最重要的是通过某种面向21世纪的《退伍军人权利法案》式法案，确保每个美国人都有机会接受高中以后的教育。", "nothing would be more important than 表示后面这件事最重要；作者要的是保证教育机会，不能只记住“通过更多法案”。", "给出全文政策建议；教育机会是目的，立法是实现手段。", ["there are many things", "but nothing", "than passing", "that ensures", "that every American"], ["answer-evidence", "reference-or-scope", "nested-clause"], ["has access to", "post-high school education"]],
];

function blocks(text: string, starts: string[]) {
  const cuts = [0];
  for (const start of starts) {
    const at = text.indexOf(start, cuts[cuts.length - 1] + 1);
    if (at < 0) throw new Error(`2013 Text 1: missing reviewed boundary ${start}`);
    cuts.push(at);
  }
  return cuts.map((start, i) => ({ start, end: cuts[i + 1] ?? text.length }));
}
export const passage2013P1Sentences: SentenceAnalysis[] = texts.map((text, i) => {
  const [natural, obstacle, logic, starts, keyReasons, phrases] = quick[i];
  return createV2Sentence({ id: `2013-p1-s${i + 1}`, number: i + 1, text, natural, logic, phrases,
    quickReading: { blocks: blocks(text, starts), obstacle, keyReasons }, ...passage2013P1Deep[i + 1] });
});
export const passage2013P1Paragraphs = passage2013P1ParagraphNumbers.map((numbers, i) => ({ id: `2013-p1-para${i + 1}`, sentenceIds: numbers.map(n => `2013-p1-s${n}`) }));
export const passage2013P1Guide: ArticleGuide = {
  mainIdea: "技术和全球化使普通水平越来越不够用；劳动者要提供独特价值，社会要扩大高中后教育的机会。",
  route: ["工厂笑话：自动化改变用工", "现实原因：需求下降，加上技术和全球化替代", "个人处境：从普通水平走向独特贡献", "数据证明：替代工作正在加速", "岗位要求：更多、更好的教育", "政策对策：保障高中后教育机会"],
  paragraphs: [
    ["自动化的笑话", "人只喂狗，狗防止人碰机器，夸张呈现用工变化。", "用具体例子引出问题。"],
    ["两类就业压力", "衰退导致需求减少，全球化与技术又加速替代劳动。", "把开头例子扩大为社会问题的解释。"],
    ["普通水平已不够", "比较过去与今天，指出个人需要独特贡献。", "提出中心判断和个人对策。"],
    ["变化还在加速", "十年间大量岗位消失，抵消此前长期增长。", "用数量证据强化问题的紧迫性。"],
    ["教育成为门槛", "新工作会出现，但优质岗位要求更高教育水平。", "从诊断问题转向解决方向。"],
    ["保障教育机会", "主张通过法案保证每个人能接受高中后教育。", "以公共对策收束全文。"],
  ].map(([title, summary, relation], i) => ({ paragraphId: passage2013P1Paragraphs[i].id, title, summary, relation })),
  sentenceRoles: Object.fromEntries(passage2013P1Sentences.map(s => [s.id, s.logic])),
  references: [
    { sentenceId: "2013-p1-s3", expression: "it", referent: "失业率高、中产收入下降这一局面", targetSentenceIds: ["2013-p1-s3"], explanation: "it is also because of 接着补充这种局面的原因，不是说明文章为什么发表。" },
    { sentenceId: "2013-p1-s3", expression: "which", referent: "全球化与信息技术革命的进步", targetSentenceIds: ["2013-p1-s3"], explanation: "与复数 are 呼应；这些进步加快机器或外国工人替代劳动力。" },
    { sentenceId: "2013-p1-s6", expression: "it", referent: "Being average（仅达到普通水平）", targetSentenceIds: ["2013-p1-s6"], explanation: "过去普通水平能带来一定回报，如今不再能。" },
    { sentenceId: "2013-p1-s7", expression: "It", referent: "仅靠普通水平获得旧有回报这件事", targetSentenceIds: ["2013-p1-s6"], explanation: "can't 后省去 earn you what it used to；不能脱离上一句翻译。" },
    { sentenceId: "2013-p1-s8", expression: "them", referent: "everyone 所指的每一位劳动者", targetSentenceIds: ["2013-p1-s8"], explanation: "their、them 用复数形式回指不限定性别的每个人。" },
    { sentenceId: "2013-p1-s11", expression: "they", referent: "美国工厂", targetSentenceIds: ["2013-p1-s11"], explanation: "形式上承接 factories；抹去岗位增长是这些工厂裁员的后果。" },
    { sentenceId: "2013-p1-s13", expression: "themselves", referent: "workers（劳动者）", targetSentenceIds: ["2013-p1-s13"], explanation: "接受教育、让自己超出平均水平的是劳动者，不是工作岗位。" },
  ], timeline: [], voices: [],
};
