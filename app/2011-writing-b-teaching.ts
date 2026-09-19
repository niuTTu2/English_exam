import type { BeginnerSyntaxComponent, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import type { PracticeTask } from "./learning-model";
import { withReviewedSyntax } from "./reviewed-syntax";

const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const reviewed: Record<number, { components: BeginnerSyntaxComponent[]; colors: SyntaxVisualRole[]; reading: SentenceReadingGuide; chinese: string[] }> = {
  1: {
    components: [c("Write", "祈使动词原形", "谓语", "省略的主语you", "要求考生撰写一篇短文。"), c("an essay", "不定冠词与名词", "宾语", "Write", "所写成品是一篇essay，后面的分词短语进一步限定材料依据。"), c("based on the following chart", "过去分词短语", "后置定语", "essay", "说明短文以所给图表为依据；没有关系词和限定谓语，不另算完整定语从句。", [c("based", "过去分词", "非谓语中心", "essay", "短文以图表为依据，essay与base构成被动关系；主句谓语仍是Write。"), c("on the following chart", "介词短语", "依据补足语", "based", "on引出作为写作材料的图表。", [c("the following chart", "名词短语", "介词宾语", "on", "following是形容词，表示下面给出的；图表来自题目，不由考生另选。")])])],
    colors: ["predicate", "object", "modifier"], chinese: ["写", "一篇短文", "以下面给出的图表为依据"],
    reading: { focus: "先找Write与宾语essay，再读清作文依据的后置限定。", questions: [{ question: "based是否与Write并列作主句谓语？", evidence: "an essay based on the following chart", answer: "不是。based on...为过去分词短语，后置修饰essay；主句要求写作文，后置部分规定材料依据。" }] },
  },
  2: {
    components: [c("In your writing", "介词短语", "范围状语", "两项写作要求", "限定考生作文中的内容；writing是名词。"), c("you", "人称代词", "主语", "should interpret / give", "执行两项任务的人都是考生。"), c("should", "情态动词", "共享情态成分", "interpret与give", "表达应当，后面两个动作共用should。"), c("1)interpret", "编号与动词原形", "第一谓语动词", "主语you与情态动词should", "解读图表，说明呈现的趋势和比较；并不意味着可以凭图证明原因。"), c("the chart", "名词短语", "宾语", "interpret", "所给图反映2008、2009年国内轿车市场部分品牌的市场份额。"), c("and", "并列连词", "连接成分", "interpret与give", "要求两项都完成，不表示任选其一。"), c("2)give", "编号与动词原形", "第二谓语动词", "共用主语you与情态动词should", "提出评论；give后只有评论这个直接宾语，不照搬给某人某物的双宾语结构。"), c("your comments", "物主限定词与名词", "宾语", "give", "考生对图示现象的评论，须区别可观察趋势与可能原因。")],
    colors: ["modifier", "subject", "predicate", "predicate", "object", "connector", "predicate", "object"], chinese: ["在你的作文中", "你", "应当", "1）解读", "图表", "并且", "2）提出", "你的评论"],
    reading: { focus: "一个主语与情态动词统领两项动作，图表事实与评论的依据各有边界。", questions: [{ question: "and后的give为什么仍用原形？两个要求能否只选一个？", evidence: "you should 1)interpret the chart and 2)give your comments", answer: "interpret与give并列，共用you should，两个动词都用原形。and要求同时完成图表解读和个人评论。" }, { question: "图表显示份额变化，是否也证明了销量变化或变化原因？", evidence: "the chart", answer: "没有总销量，不能由份额推绝对销量；图中没有因果证据。评论可提出有边界的可能解释，不能冒充图表直接证明的事实。" }] },
  },
  3: {
    components: [c("You", "人称代词", "主语", "should write", "指写作考生。"), c("should write", "情态动词加动词原形", "谓语", "You", "提出篇幅要求。"), c("at least 150 words", "带最低数量限定的名词短语", "宾语", "write", "at least限定150，表示不少于150词；原题未给上限。", [c("at least", "最低限度副词性短语", "数量修饰语", "150", "包括150和更多，不等于约数about或上限at most。")])],
    colors: ["subject", "predicate", "object"], chinese: ["你", "应当写", "至少150词"],
    reading: { focus: "保留最低词数条件，不自行补容差或最高篇幅。", questions: [{ question: "150词是否符合原题字数条件？", evidence: "at least 150 words", answer: "符合。at least包括下限150；少于150没有达到原题要求，但原题未给出自动扣分方式。" }] },
  },
  4: {
    components: [c("Write", "祈使动词原形", "谓语", "省略的主语you", "重申作答位置。"), c("your essay", "名词短语", "宾语", "Write", "指前面要求的同一篇短文，不是第二篇任务。"), c("on ANSWER SHEET 2", "介词短语", "书写位置状语", "Write", "规定原纸笔试卷答题卡2，线上仍在同题作答框写作。"), c("(15 points)", "括号分值说明", "分值信息", "第48题", "原卷本题15分，既不是十五个写作要点，也不表示系统能自动给分。")],
    colors: ["predicate", "object", "modifier", "modifier"], chinese: ["写", "你的短文", "在答题卡2上", "（本题15分）"],
    reading: { focus: "把答题位置、写作内容与原卷分值分开。", questions: [{ question: "on ANSWER SHEET 2与based on的on功能相同吗？", evidence: "on ANSWER SHEET 2", answer: "此处on引书写位置，第一句based on中的on引依据；两者都是介词，但关系不同。" }] },
  },
};
export const writing2011BPractice: Record<string, PracticeTask[]> = {
  "2011-writing-b-s1": [{ id: "essay-basis", revision: 1, kind: "range", prompt: "划出限定作文材料依据的完整后置定语。", options: [], answer: "based on the following chart", evidence: "based on the following chart", feedback: "based on the following chart整体修饰essay，指出依据；Write才是主句谓语，based是非谓语分词。", conceptId: "nonfinite-participle", errorType: "attachment", hintWords: ["based", "on", "following", "chart", "based on the following chart"] }],
  "2011-writing-b-s2": [
    { id: "two-instructions", revision: 1, kind: "link", prompt: "对应两个动作、连接关系与各自要求。", links: [{ source: "interpret the chart", target: "解读所给图表的比较与趋势" }, { source: "give your comments", target: "提出与图示现象相关的评论" }, { source: "and", target: "两项都做并共用you should" }], options: ["解读所给图表的比较与趋势", "提出与图示现象相关的评论", "两项都做并共用you should"], answer: JSON.stringify(["解读所给图表的比较与趋势", "提出与图示现象相关的评论", "两项都做并共用you should"]), evidence: "you should 1)interpret the chart and 2)give your comments", feedback: "interpret与give是并列动词，共用主语和should；各自以the chart与your comments为宾语。and表示两项都要完成。", conceptId: "basic-svo", errorType: "attachment", hintWords: ["should", "interpret", "chart", "and", "give", "comments", "give your comments"] },
    { id: "chart-scope", revision: 1, kind: "choice", prompt: "结合所给市场份额图，哪种解读与评论符合证据范围？", options: ["比较份额变化，可能原因另外说明为推测", "份额上升足以证明绝对销量上升", "图表已经证明价格变化是唯一原因"], answer: "比较份额变化，可能原因另外说明为推测", evidence: "interpret the chart and 2)give your comments", feedback: "图示的是部分品牌市场份额，既无总销量，也无因果验证。先准确比较趋势，再把原因作为可能解释。", conceptId: "comparison-scope", errorType: "translation", hintWords: ["interpret", "chart", "comments", "give your comments"] }
  ],
  "2011-writing-b-s3": [{ id: "minimum-length", revision: 1, kind: "range", prompt: "划出完整的最低篇幅要求，保留下限限定。", options: [], answer: "at least 150 words", evidence: "at least 150 words", feedback: "at least与150 words一起给出不少于150词的要求，包括150；原题没有规定上限，也没有给扣分容差。", conceptId: "comparison-scope", errorType: "translation", hintWords: ["at", "least", "words", "at least 150 words"] }],
  "2011-writing-b-s4": [{ id: "place-score", revision: 1, kind: "choice", prompt: "末句的两个信息分别是什么？", options: ["原卷作答位置是答题卡2，本题满分15分", "另写第二篇作文并提出15个观点", "线上提交后系统自动判为15分"], answer: "原卷作答位置是答题卡2，本题满分15分", evidence: "on ANSWER SHEET 2. (15 points)", feedback: "on引书写位置，括号说明原卷分值；线上作文仍由用户独立写作与自查，句子训练完成不等于作文得分。", conceptId: "lexical-context", errorType: "translation", hintWords: ["on", "ANSWER", "SHEET", "points"] }],
};
export function withWriting2011BTeaching(sentence: SentenceAnalysis): SentenceAnalysis {
  const entry = reviewed[sentence.number];
  if (!entry) throw new Error(`Missing writing teaching: ${sentence.id}`);
  const result = withReviewedSyntax({ ...sentence, beginnerSyntax: { components: entry.components, clauses: [], reading: entry.reading }, layers: entry.components.map(component => ({ label: component.function, text: component.explanation })), grammar: entry.components.map(component => `${component.text}：${component.form}；${component.explanation}`), practice: writing2011BPractice[sentence.id] }, entry.colors);
  if (result.chunks.length !== entry.chinese.length) throw new Error(`${sentence.id}: 词块译文不匹配`);
  return { ...result, translationAlignment: result.chunks.map((chunk, index) => ({ english: chunk.text, chinese: entry.chinese[index] })) };
}
