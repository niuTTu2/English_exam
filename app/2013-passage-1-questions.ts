import type { Question, SentenceAnalysis } from "./data";
import type { QuestionReasoning, DistractorType } from "./article-teaching";
import type { PracticeTask } from "./learning-model";
import { createV2Sentence } from "./article-v2/model";
import { passage2013P1RawQuestions } from "./2013-passage-1-source";

type Check = [prompt: string, options: string[], answer: string, evidence: string, feedback: string];
type Wrong = [key: "A" | "B" | "C" | "D", error: DistractorType, difference: string, check: Check];
const check = (id: string, [prompt, options, answer, evidence, feedback]: Check): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer, evidence, feedback, conceptId: "lexical-context", errorType: "option-logic", purpose: "question-relation" });
const e = (id: string, n: number, quote: string, role: string, strength: QuestionReasoning["evidence"][number]["strength"] = "直接证据") => ({ id, sentenceId: `2013-p1-s${n}`, quote, role, strength });
const language: Array<Array<[meaning: string, reading: string, phrases?: string[]]>> = [
  [
    ["第一段的笑话用来说明什么？", "问 illustrate 的论证作用。不要仅复述笑话人物，也不要跳到第二段其他问题。"],
    ["技术进步带来的影响", "impact 是影响，of 后面是影响的来源；advances 在这里是进步。"],
    ["就业压力的缓解", "alleviation 是减轻；方向与原文的劳动替代压力相反。"],
    ["纺织厂的萎缩", "shrinkage 指规模或数量收缩；减少雇员不等于工厂数量或产出收缩。"],
    ["中产阶级收入的下降", "decline 是下降，of 后说明下降的指标；这是下一段话题，非本段笑话的直接作用。"],
  ],
  [
    ["根据第三段，要成为成功的雇员，必须怎样做？", "to be a successful employee 表示目标；one 泛指人，has to 是必须。", ["has to"]],
    ["从事廉价软件相关的工作", "work on 指从事或处理；正文将软件列为可替代普通劳动的资源，没有把它作为个人成功的特定职业。", ["work on"]],
    ["要求适中的薪酬", "ask for 表示要求，moderate 限定 salary；原文 cheap 描述竞争资源，不是给求职者的薪酬建议。", ["ask for"]],
    ["采取普通水平的生活方式", "adopt 在此是采用，不是收养；an average lifestyle 是过去能获得的生活。"],
    ["作出独特的贡献", "something 后接 unique 作修饰；对应 unique value contribution。"],
  ],
  [
    ["第四段的引文说明什么？", "quotation 指戴维森给出的数字；读前一句 acceleration 确定数字在证明什么。"],
    ["技术成果已经被抹去", "have been erased 是现在完成时被动；问题在 gains of technology 偷换了原文岗位增长的对象。"],
    ["就业机会正在迅速消失", "are disappearing 表持续发生，at a high speed 限定速度；对应 shed workers so fast。", ["at a high speed"]],
    ["工厂比以前赚的钱少得多", "much 加强 less 的差距；比较的是 money，而原文数据数的是 jobs。"],
    ["新的工作和服务已经被提供", "have been offered 表示已经发生；原文第五段是未来总会有变化，既错段又换了时间。"],
  ],
  [
    ["作者认为，减少失业最重要的是什么？", "to reduce unemployment 说目标，the most important 指最重要的措施；与末段的否定比较结构对应。"],
    ["加速信息技术革命", "accelerate 是使加速；文章提出的是如何应对技术变化，不是靠加速替代来减少失业。"],
    ["确保人们接受更多教育", "ensure 是保障；for people 指受益者，more education 对应获得高中后教育。"],
    ["推进经济全球化", "advance 作动词，表示推进；不是正文名词 advances 的词性。"],
    ["在21世纪通过更多法案", "pass a bill 是通过法案；more bills 只强调数量，漏掉必须保障教育的内容。"],
  ],
  [
    ["以下哪项最适合作为文章标题？", "most appropriate 要求覆盖全文中心；following 指后列选项，不能仅凭原文出现过某个词判断。"],
    ["新法律生效", "takes effect 是开始生效；正文仍在提建议，没有报道新法已经生效。", ["Takes Effect"]],
    ["技术变廉价", "goes cheap 描写价格低，是第三段的局部背景；没覆盖劳动者与教育对策。"],
    ["普通水平已不够", "Average Is Over 是作者的核心判断，贯穿个人贡献和教育要求；不是统计平均数消失。"],
    ["经济衰退很糟糕", "recession 是经济衰退；第二段仅将其列为一个原因，后文重心是结构变化及应对。"],
  ],
];
const makeLanguage = (id: string, text: string, row: [string, string, string[]?]): SentenceAnalysis => createV2Sentence({ id, number: 0, text, natural: row[0], logic: row[1], phrases: row[2] ?? [], quickReading: { blocks: [{ start: 0, end: text.length }], obstacle: row[1], keyReasons: [] } });
function question(index: number, answer: Question["answer"], n: number, type: string, scope: QuestionReasoning["scope"], instruction: string, evidence: QuestionReasoning["evidence"], minimal: string[], paraphrase: string, limit: string, right: string, wrong: Wrong[], confirm: Check, paths: number[][]): Question {
  const raw = passage2013P1RawQuestions[index];
  const options = raw.options.map(o => ({ ...o }));
  const evidenceIds = evidence.map(x => x.id);
  const reasoning: QuestionReasoning = { questionType: type, scope, restatement: language[index][0][0], keyInstruction: instruction, evidence,
    paraphrases: [{ evidenceIds: minimal, meaning: paraphrase, optionText: options.find(o => o.key === answer)!.text, relation: "同义转换", limit }],
    options: Object.fromEntries(options.map(o => { const item = wrong.find(w => w[0] === o.key); return [o.key, { judgment: o.key === answer ? "选入" : "排除", evidenceIds, reasoning: o.key === answer ? right : item![2], ...(item ? { errorType: item[1] } : {}) }]; })),
    transfer: instruction,
    locationPolicy: { revision: 1, paths: paths.map((numbers, i) => ({ id: `2013-q${raw.number}-path${i + 1}`, label: numbers.map(v => `第${v}句`).join(" + "), groups: numbers.map(v => [`2013-p1-s${v}`]), supportingSentenceIds: evidence.map(x => x.sentenceId), maxSentences: new Set([...numbers.map(v => `2013-p1-s${v}`), ...evidence.map(x => x.sentenceId)]).size })) },
    correction: { minimalEvidenceIds: minimal, paraphraseIndexes: [0], byWrongOption: Object.fromEntries(wrong.map(([key, , difference, task]) => [key, { difference, recheck: check(`2013-q${raw.number}-${key}-check`, task) }])), correctCheck: check(`2013-q${raw.number}-correct-check`, confirm) },
  };
  return { ...raw, options, answer, sentenceId: `2013-p1-s${n}`, locating: instruction, reasoning,
    explanations: Object.fromEntries(options.map(o => [o.key, reasoning.options[o.key].reasoning])) as Question["explanations"],
    analysis: { prompt: makeLanguage(`question-${raw.id}-prompt`, raw.prompt, language[index][0]), options: Object.fromEntries(options.map((o, i) => [o.key, makeLanguage(`question-${raw.id}-option-${o.key}`, o.text, language[index][i + 1])])) },
  };
}
export const passage2013P1Questions: Question[] = [
  question(0, "A", 1, "例证作用", "paragraph", "读第一段的自动化程度和人狗分工，问它们共同说明的影响，不把后段的收入问题搬进来。", [
    e("q21-automation", 1, "how much a modern textile mill has been automated: The average mill has only two employees today", "自动化让普通纺织厂几乎不再需要生产工人；这是笑话要凸显的变化。"),
    e("q21-joke", 2, "the dog is there to keep the man away from the machines", "连碰机器都不需要，夸张解释自动化的用工影响。"),
    e("q21-context", 3, "replacing labor with machines or foreign workers", "下一段明确说出替代劳动力的社会背景。", "上下文推断"),
  ], ["q21-automation"], "has been automated + only two employees → 自动化大幅改变用工 → the impact of technological advances", "说明技术对用工的影响，不推断纺织厂数量或产量。", "A 概括自动化使工厂几乎不需人工生产的影响，能解释笑话为何放在开头。", [
    ["B", "与原文相反", "B 说就业压力缓解；笑话说明机器替代人工，劳动者需要面对新的就业压力。", ["“人要远离机器”突出人更容易找到工作吗？", ["是，就业更轻松", "否，是生产更少依赖人工"], "否，是生产更少依赖人工", "keep the man away from the machines", "笑点是机器已能运作，不是岗位增加。"]],
    ["C", "偷换对象", "C 把一家工厂所需雇员变少，偷换成纺织厂本身规模或数量萎缩；原文没有给出后一结论。", ["only two employees 直接数的是哪一项？", ["雇员", "工厂数量"], "雇员", "only two employees", "employees 是员工，不能换成 mills 的数量或产出。"]],
    ["D", "事实成立，非本题所求", "D 抓了第二段中产收入下降，但第一段笑话直接展示的是自动化对工厂用工的影响。", ["第一段笑话直接描绘了工资数字，还是人和机器的分工？", ["工资数字", "人和机器的分工"], "人和机器的分工", "The man is there to feed the dog", "第一段没有工资数据；判断例子作用先看例子描绘的对象。"]],
  ], ["自动化与只有两个雇员合起来支持哪个判断？", ["技术改变用工需求", "工厂已全部倒闭"], "技术改变用工需求", "has been automated", "例子是用工被技术改变，未说工厂倒闭。"], [[1, 2], [1, 3]]),
  question(1, "D", 8, "细节理解", "sentence", "第三段 Therefore 后是给个人的建议；把 extra 和破折号后的解释连读。", [
    e("q22-unique", 8, "their unique value contribution that makes them stand out", "能使自己突出的是独特的价值贡献。"),
    e("q22-past", 4, "could earn an average lifestyle", "普通生活属于过去的对照，不是今天的成功建议。", "上下文推断"),
    e("q22-resources", 7, "cheap foreign labor, cheap robotics, cheap software", "廉价资源说明雇主的替代选择，并未要求雇员只从事软件工作。", "上下文推断"),
  ], ["q22-unique"], "unique value contribution → 把名词 contribution 换为动词 contribute，保留 unique → contribute something unique", "要求独特价值，不等于人人必须进入某种行业。", "D 保留独特贡献这一核心条件，是原文名词表达的动词改写。", [
    ["A", "偷换对象", "A 把雇主能获得的廉价软件，改成雇员应当从事的工作；建议真正落在个人独特贡献上。", ["原文把 cheap software 列为谁的可用资源？", ["雇主", "成功雇员必须选择的职业"], "雇主", "employers have so much more access", "资源清单不是职业建议清单。"]],
    ["B", "无中生有", "B 将廉价劳动力的背景扩大为主动要求适中工资的建议；作者并没有这样要求雇员。", ["Therefore 后作者要求找的是哪一项？", ["独特价值贡献", "适中的薪酬"], "独特价值贡献", "everyone needs to find their extra", "extra 随即被解释为 unique value contribution。"]],
    ["C", "时间错位", "C 把过去的普通生活方式当作如今成功的条件；原文用 But 明确转到普通水平已不够。", ["average lifestyle 所在句给出的时间是？", ["过去", "今天"], "过去", "In the past", "今昔对比不能交换时间。"]],
  ], ["contribution → contribute 的改写是否保留独特价值这个条件？", ["保留", "取消"], "保留", "unique value contribution", "名词变动词，命题不变。"], [[8]]),
  question(2, "B", 11, "引文作用", "adjacent-sentences", "先读 acceleration 确定论点，再把十年与此前七十年的岗位数字作为证据。", [
    e("q23-speed", 11, "factories shed workers so fast that they erased almost all the gains of the previous 70 years", "裁员速度快，短期损失几乎抵消长期岗位增长。"),
    e("q23-thesis", 10, "there's been an acceleration", "数据紧接加速这一判断，是对它的证明。"),
    e("q23-count", 11, "roughly one out of every three manufacturing jobs – about 6 million in total – disappeared", "数的是消失的制造业岗位，约三分之一。"),
  ], ["q23-speed", "q23-count"], "shed workers so fast + jobs disappeared → job opportunities are disappearing at a high speed", "引用的数据范围是美国制造业；选项概括其就业损失速度，不能扩展为所有工作都会消失。", "B 保留“就业岗位消失得快”，与 acceleration 及数据证明的重点一致。", [
    ["A", "偷换对象", "A 把被抹去的“就业岗位增长”换成“技术成果”；gains 必须由裁员和 jobs 的上下文确定。", ["这段中 gains 的增长对象是什么？", ["就业岗位", "技术成果"], "就业岗位", "manufacturing jobs", "上下文围绕裁员和岗位消失，不是在说技术倒退。"]],
    ["C", "偷换对象", "C 把工厂裁员的数量偷换成赚钱变少；shed workers 和六百万统计的是岗位，不是收入。", ["about 6 million 的单位是岗位还是货币？", ["岗位", "货币"], "岗位", "manufacturing jobs – about 6 million in total", "六百万是消失的制造业岗位数。"]],
    ["D", "时间错位", "D 把下一段对未来变化的承认改成已经提供新工作和服务；第四段引文正在证明旧岗位快速流失。", ["引文的主要动词是 disappeared 还是 offered？", ["disappeared", "offered"], "disappeared", "– disappeared.", "不要用下一段的未来新机会替换本段已经发生的损失。"]],
  ], ["十年几乎抵消此前七十年增长，强调什么？", ["岗位流失速度快", "新技术全部失效"], "岗位流失速度快", "so fast", "so fast 与 acceleration 呼应。"], [[10, 11], [11]]),
  question(3, "B", 14, "措施与目的", "adjacent-sentences", "定位末段 nothing would be more important than，并继续读完 Bill 后确保教育机会的限定。", [
    e("q24-priority", 14, "nothing would be more important than passing some kind of G. I. Bill", "否定比较强调立法措施的优先级。"),
    e("q24-education", 14, "that ensures that every American has access to post-high school education", "法案的实质目标是保证高中后教育机会。"),
    e("q24-job", 13, "the best jobs will require workers to have more and better education", "前段解释为什么更多教育对就业有用。"),
  ], ["q24-priority", "q24-education"], "ensures + every American has access to post-high school education → ensure more education for people", "高中后教育不只指某一种大学学位；也不能把实质目标丢掉，只说法案越多越好。", "B 保留法案要达到的教育目标，与前段岗位门槛共同支持作者的建议。", [
    ["A", "因果倒置", "A 将加快信息技术这一就业替代压力，误当成作者首要提出的补救；首要建议是保障更多教育。", ["末段 ensures 后被保证的是技术加速，还是教育机会？", ["技术加速", "教育机会"], "教育机会", "has access to post-high school education", "法案保障的是人的受教育机会。"]],
    ["C", "因果倒置", "C 把全球化推进这一提高岗位门槛的背景，当成减少失业的首要措施；文章给出的应对是教育。", ["面对全球化进步，优质岗位要求劳动者增加什么？", ["更多更好的教育", "更多全球化"], "更多更好的教育", "have more and better education", "主语岗位提出的是对劳动者教育的要求。"]],
    ["D", "范围扩大", "D 只说多通过法案，丢掉“确保每个人接受高中后教育”的必要内容；作者并未主张任意增加法案数量。", ["任意多通过法案，是否等于保证教育机会？", ["等于", "不等于"], "不等于", "that ensures that every American", "that 限定法案内容；目标不能被工具数量代替。"]],
  ], ["nothing would be more important than 表示该措施不重要吗？", ["不重要", "它最重要"], "它最重要", "nothing would be more important than", "没有别的更重要，就是最高优先级。"], [[14], [13, 14]]),
  question(4, "C", 5, "全文标题", "whole-passage", "把第三段中心判断、个人独特贡献和末段教育对策串起来，选能覆盖三者的标题。", [
    e("q25-center", 5, "average is officially over", "中心判断：仅靠普通水平已不够。", "全文概括"),
    e("q25-person", 8, "everyone needs to find their extra", "个人需要独特优势，回应中心判断。", "全文概括"),
    e("q25-close", 14, "In a world where average is officially over", "结尾重新以同一判断为教育对策的前提。", "全文概括"),
    e("q25-education", 13, "more and better education to make themselves above average", "教育建议服务于超越普通水平。", "全文概括"),
  ], ["q25-center", "q25-person", "q25-education"], "average is officially over → Average Is Over；独特贡献和提高教育都围绕超越普通水平展开", "标题覆盖的是技术与全球化下的个人处境及教育对策，不是所有普通人注定失败。", "C 是贯穿全文的问题判断，能统摄工厂例子、个人建议和教育对策。", [
    ["A", "无中生有", "A 将作者建议通过的教育法案说成已生效的新法律；文中没有法律已经实施这一事实。", ["passing some kind of Bill 在末段是建议还是既成事实报道？", ["建议", "既成事实报道"], "建议", "nothing would be more important than passing", "作者评价应做什么，不是在宣布法律生效。"]],
    ["B", "把局部当全文", "B 只概括廉价技术这一局部背景，无法解释为什么全文还讨论独特贡献和更多教育。", ["“技术便宜”能覆盖末段的教育对策吗？", ["能完整覆盖", "只能覆盖局部背景"], "只能覆盖局部背景", "more and better education", "标题必须能串起问题和对策。"]],
    ["D", "把局部当全文", "D 只取经济衰退这个原因，漏掉技术、全球化造成的长期门槛变化，以及全文的应对建议。", ["第二段 but it is also 是否说明原因只有经济衰退？", ["只有衰退", "还有技术与全球化"], "还有技术与全球化", "but it is also because of the advances", "also 明确增加原因；后文继续讨论这些结构变化。"]],
  ], ["哪个标题能同时串起独特贡献和更多教育？", ["普通水平已不够", "工厂利润下滑"], "普通水平已不够", "make themselves above average", "两种应对都为让劳动者超出普通水平。"], [[5, 8, 13], [8, 14]]),
];
