import type { SentenceAnalysis, WritingTask } from "./data";
import { segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2011-writing-b");
export const writing2011BSentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Write ", "predicate", "祈使动词原形", "写作要求谓语", "省略考生you为主语", "命令考生撰写，不是过去式wrote。"),
    segment("an essay ", "object", "不定冠词与单数名词", "Write的直接宾语", "说明要写的体裁", "essay为短文，与Part A书信不同；essay以元音音素起首，用an。"),
    segment("based on the following chart.", "modifier", "过去分词加介词短语", "essay的后置定语", "限定作文的材料依据", "based on说明以图表为依据，following为下面所给的；不是另造完整定语从句。"),
  ], "Write an essay.", "写一篇以下面图表为依据的短文。", "请根据下图写一篇短文。", "作文必须回应所给市场份额图，不能换成销量或别的年份。", ["based on the following chart"]),
  sentence(2, [
    segment("In your writing, ", "modifier", "介词与名词短语", "写作范围状语", "限定后面的两项任务", "writing在此为所写作文内容，不是正在写的进行时动词。"),
    segment("you ", "subject", "人称代词", "主语", "指考生", "不是图中消费者或汽车厂商。"),
    segment("should ", "predicate", "情态动词", "并列谓语共用的情态成分", "同时约束interpret与give", "两个任务都应完成，and不表示二选一。"),
    segment("1)interpret ", "predicate", "编号与动词原形", "第一并列谓语", "与should组成要求", "interpret要求说明图表呈现的比较与变化，不能只复述标题。"),
    segment("the chart ", "object", "定冠词名词短语", "interpret的宾语", "回指所给柱状图", "统计对象是国内轿车市场部分品牌的份额，不是全球全部汽车销量。"),
    segment("and ", "connector", "并列连词", "连接两个谓语", "interpret与give并列", "共同受should约束；第二项不再重复should。"),
    segment("2)give ", "predicate", "编号与动词原形", "第二并列谓语", "与interpret并列", "give在此为提出或发表，不是给某人实物。"),
    segment("your comments.", "object", "物主限定词与复数名词", "give的宾语", "说明需要考生的评论", "comments为对此现象的看法，应与图表相关并区分事实和推测。"),
  ], "you should interpret the chart and give your comments.", "在你的作文中，你应当一、解读图表；二、提出你的评论。", "作文应包括图表解读和你的评论。", "描述图表与评价现象是两个任务；图表本身不能证明变化原因。", ["give your comments"]),
  sentence(3, [
    segment("You ", "subject", "人称代词", "主语", "指考生", "规定作答篇幅。"),
    segment("should write ", "predicate", "情态动词加动词原形", "谓语", "与You搭配", "should表示任务要求。"),
    segment("at least 150 words.", "object", "最低数量限定与复数名词", "write的宾语", "限定所写英文词数", "at least是至少，包含150并允许更多，不能译成约150或至多150。"),
  ], "You should write at least 150 words.", "你应至少写150词。", "短文不少于150词。", "原题给出最低字数，不编造最高字数或评分容差。", ["at least 150 words"]),
  sentence(4, [
    segment("Write ", "predicate", "祈使动词原形", "答题位置指令谓语", "省略you", "重申需要正式写入答题区域。"),
    segment("your essay ", "object", "物主限定词与名词", "Write的宾语", "指考生所写短文", "不另指第二篇作文。"),
    segment("on ANSWER SHEET 2. ", "modifier", "介词地点短语", "书写位置状语", "修饰Write", "指定原纸笔试卷答题卡2；线上使用同一道题的输入框。"),
    segment("(15 points)", "modifier", "括号分值", "题目信息补充", "标明第48题分值", "本题15分，不是系统可以自动判断的得分。"),
  ], "Write your essay.", "把你的短文写在答题卡2上。（15分）", "请在答题卡2上作答。本题15分。", "保留分值和作答位置，不创造选择题。", []),
];

export const writing2011BTasks: WritingTask[] = [{
  id: 201148, number: 48, genre: "chart-essay", points: 15, wordLimit: { mode: "at-least", count: 150 },
  instructions: writing2011BSentences,
  requirements: ["根据2008、2009年国内轿车市场部分品牌的市场份额柱状图写短文，至少150词，本题15分。", "同时完成图表解读和个人评论，不能只描述或只议论。", "比较国产、日系、美系三个类别；国产份额上升并超过日系，日系下降，美系基本稳定。", "柱顶数字在用户原卷中被遮挡，只按刻度写近似值；不能把份额变化写成绝对销量变化。", "图表只覆盖部分品牌，不能要求三类相加为100%，也不能据图断言变化原因。", "不沿用书信称呼署名；在原卷答题卡2或本页作答框完成。"],
  outline: [
    { title: "第一段：说明图表并比较趋势", content: "先交代地区、年份和市场份额，再对比国产上升、日系下降与美系稳定；点出国产超过日系，避免流水账。" },
    { title: "第二段：提出有边界的解释", content: "可讨论产品与需求适配、服务等可能因素，用possible、might等说明是假设；明确还需要价格、质量和偏好资料才能验证。" },
    { title: "第三段：评论与建议", content: "从份额优势不等于长期成功切入，提出质量与服务建议；消费者按实际需求选择，回应而不夸大图表。" },
  ],
  sample: {
    english: [
      "The chart compares the market shares of selected car brands in China in 2008 and 2009. Domestic brands rose from just over a quarter to a little over 30 percent, while Japanese brands fell from roughly a third to just over a quarter. American brands remained stable at around 10 percent. Thus, domestic brands overtook Japanese brands among the categories shown.",
      "These changes suggest a shift in consumers' choices, but the chart alone does not explain its causes. One possible explanation is that domestic manufacturers offered products that better suited some buyers' needs and budgets. Improvements in service might also have encouraged buyers to consider these brands. However, information about prices, product quality and customer preferences would be needed to assess these ideas.",
      "In my view, a larger share is an opportunity rather than a guarantee of lasting success. Car makers should keep improving quality and service instead of relying only on low prices. Consumers, meanwhile, should compare their options carefully and choose cars that meet their actual needs.",
    ],
    chinese: [
      "该图比较了2008年和2009年中国市场部分汽车品牌的市场份额。国产品牌的份额从略高于四分之一升至略高于30%，日系品牌则从约三分之一降至略高于四分之一。美系品牌基本稳定在约10%。因此，在图中所列类别里，国产品牌的份额超过了日系品牌。",
      "这些变化显示消费者的选择发生了转变，但单凭图表不能解释其原因。一种可能的解释是，国产厂商提供的产品更适合一些购买者的需求和预算。服务的改善也可能促使买家考虑这些品牌。不过，要检验这些看法，还需要价格、产品质量和顾客偏好等信息。",
      "在我看来，份额扩大带来的是机会，而非长久成功的保证。汽车厂商应不断提升质量和服务，而不只是依靠低价。与此同时，消费者应仔细比较不同选择，购买符合实际需要的汽车。",
    ],
    notes: [
      "share是份额而非绝对销量；用just over、roughly、around表达原图可辨认精度。while对比两条相反趋势，among the categories shown限制结论范围。",
      "possible和might保留推测边界，第二句that为表语从句，products后的that为定语从句；末句明确所需补充证据，不把服务或价格因素说成图表已证明。",
      "rather than区别机会与保证；keep后接doing，instead of后接动名词。建议属于作者评论，不是柱状图中直接记录的事实。",
    ],
  },
  languageTips: [
    { english: "The share rose from just over a quarter to a little over 30 percent.", chinese: "份额从略高于四分之一升至略高于30%。", usage: "from...to...分别写起点和终点；rise by写增量。未知精确标签时不计算精确百分点。" },
    { english: "American brands remained stable at around 10 percent.", chinese: "美系品牌的份额基本稳定在约10%。", usage: "remain接形容词stable，at引水平，around保留约数；不把稳定改写成销售量完全未变。" },
    { english: "One possible explanation is that the products better suited buyers' needs.", chinese: "一种可能的解释是产品更符合购买者需求。", usage: "that引表语从句，possible明确假设性质，不能省略后宣称图表已经证明原因。" },
    { english: "A larger share is an opportunity rather than a guarantee of lasting success.", chinese: "更大份额意味着机会，而不是长期成功的保证。", usage: "rather than连接同层级名词短语；用于谨慎评论，不可把份额增长说成今后必然持续。" },
  ],
  checklist: ["是否写明2008和2009、中国轿车市场及市场份额？", "是否描述国产上升、日系下降、美系大致稳定，并比较前两者名次？", "是否使用近似值而未补造被遮住的标签？", "是否同时有图表描述和相关评论？", "是否把原因标成可能解释，并避免把份额当销量？", "是否至少150词，没有书信称呼署名？", "是否检查过去时、比较结构、from/to/by和主谓一致？"],
  pitfalls: ["将份额变化写成绝对销量增加或减少：没有总销量就不能推出该结论。", "把部分品牌三组柱形相加补足100%，或自行编造其他品牌占比。", "从遮挡柱顶猜出精确百分比、精确差额或统计显著性。", "把价格下降、政策扶持、技术提高等当作图表已证实的原因。", "漏掉美系的相对稳定，或误称国产在全部市场必然占绝对多数。", "写成约150词或给出虚构自动得分；原题只要求至少150词，范文仅作教学参考。"],
  chart: {
    src: "/exams/2011-writing-b-original.jpg",
    alt: "原卷柱状图：2008、2009年国内轿车市场部分品牌市场份额。国产从略高于25%升至略高于30%，日系从接近35%降至略高于25%，美系两年约10%。柱顶标签被遮挡，数值仅为刻度估读。",
    note: "用户原卷图片原样保留。柱顶数字被白块遮挡，下列文字说明按纵轴刻度读取近似值，不是精确数据；统计的是部分品牌市场份额。",
    rows: [{ brand: "国产品牌", before: "略高于25%", after: "略高于30%" }, { brand: "日系品牌", before: "接近35%", after: "略高于25%" }, { brand: "美系品牌", before: "约10%", after: "约10%" }],
  },
}];
