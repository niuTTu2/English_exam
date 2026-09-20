import type { BeginnerSyntaxComponent, BeginnerClauseDetail, SentenceAnalysis } from "./data";
import type { SentenceRelationKind } from "./article-v2/model";

const part = (text: string, relationKind: SentenceRelationKind, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, relationKind, form, function: fn, modifies, explanation, ...(children ? { children } : {}) });
const clause = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, predicateDetails: NonNullable<BeginnerClauseDetail["predicateDetails"]>, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails, translationOrder });

// Only actual reading obstacles receive depth. Ordinary sentences are intentionally absent.
export const passage2013P1Deep: Record<number, Partial<SentenceAnalysis>> = {
  1: { grammarPatches: [{ explanation: "先找到作者和讲笑话这件事；篇名、来源和自动化程度都围绕这个动作补充信息。冒号后是笑话本身。", relation: "entitled 跟着 essay；about 引出笑话讨论的内容；how much 询问自动化的程度。", term: "过去分词后置定语；介词后的宾语从句", transferRule: "句首出现长介词短语时，继续向后找带时态的主要动作；冒号常用来引出解释或例子。" }] },
  3: {
    trunk: "Davidson's article is one of a number of pieces",
    literal: "戴维森的文章是最近出现的若干文章之一，这些文章提出这个观点：我们如今失业率居高不下、中产阶级收入下降，其原因主要是大衰退引起的需求锐减，但也因为全球化与信息技术革命的进步；这些进步正比以往更快地用机器或外国工人替代劳动力。",
    beginnerSyntax: { components: [
      part("Davidson's article", "trunk", "名词短语", "主语", "is", "先确定本句谈的是戴维森的文章。"),
      part("is", "trunk", "系动词", "系语", "Davidson's article → one of a number of pieces", "把文章归入最近一组文章中。"),
      part("one of a number of pieces", "trunk", "名词短语", "表语", "Davidson's article", "说的是多篇中的一篇；pieces 在此指文章。"),
      part("that have recently appeared", "modifier", "定语从句", "限定哪些文章", "pieces", "这些文章是最近发表的；have 对应复数 pieces。"),
      part("making the point", "supplement", "现在分词短语", "补充文章表达的观点", "pieces", "提出观点的是这些文章；making 不是另一个带时态的主句谓语。"),
      part("the reason we have such stubbornly high unemployment and declining middle-class incomes today", "clause-internal", "含省略关系副词的名词短语", "观点内部的主语", "is largely because of", "长主语中先抓 the reason；we have 后列出失业和收入两个问题。", [
        part("we have such stubbornly high unemployment and declining middle-class incomes today", "modifier", "省略 why 的定语从句", "说明是哪一种原因", "the reason", "we 是主语，have 是谓语，两个并列名词短语说明当前局面。"),
      ]),
      part("because of the big drop in demand because of the Great Recession", "clause-internal", "嵌套原因介词短语", "说明主要原因", "is largely", "外层说原因是需求下降，内层说需求为何下降；不要把两个 because of 读成彼此无关。", [
        part("because of the Great Recession", "modifier", "介词短语", "解释需求下降的原因", "the big drop in demand", "大衰退导致需求锐减。"),
      ]),
      part("but it is also because of the advances in both globalization and the information technology revolution", "clause-internal", "并列分句", "增加另一类原因", "失业率高和收入下降的局面", "also 明确表示还有结构性原因，不撤销前面 largely 的主要原因。"),
      part("which are more rapidly than ever replacing labor with machines or foreign workers", "modifier", "非限制性定语从句", "解释进步的就业效应", "the advances", "which 指这些进步；被替代的是 labor，替代它的是机器或外国工人。"),
    ], clauses: [
      clause("that have recently appeared", "定语从句", "that", "修饰 pieces", "that（指 pieces）", "have appeared", [], "最近发表的 → 多篇文章"),
      clause("we have such stubbornly high unemployment and declining middle-class incomes today", "定语从句", "省略 why", "解释 the reason 所对应的局面", "we", "have", [{ function: "并列宾语", text: "such stubbornly high unemployment and declining middle-class incomes" }], "我们今天失业率高、收入下降 → 的原因"),
      clause("that the reason we have such stubbornly high unemployment and declining middle-class incomes today is largely because of the big drop in demand because of the Great Recession", "同位语从句", "that", "展开 point 的内容；后接 but 分句补充原因", "the reason we have such stubbornly high unemployment and declining middle-class incomes today", "is", [{ function: "表语", text: "largely because of the big drop in demand because of the Great Recession" }], "当前局面 → 原因主要是需求下降 → 需求下降源于衰退"),
      clause("which are more rapidly than ever replacing labor with machines or foreign workers", "非限制性定语从句", "which", "说明 advances 的结果", "which（指 the advances）", "are replacing", [{ function: "宾语：被替代者", text: "labor" }, { function: "替代来源", text: "with machines or foreign workers" }], "这些进步 → 用机器或外国工人 → 更快地替代劳动力"),
    ] },
    grammarPatches: [{ explanation: "大衰退解释主要的需求压力；also 提醒你作者还要加入技术与全球化的原因。", relation: "which 后的 are replacing 跟着复数 advances；replace A with B 中 A 是退出的位置，B 是接替者。", term: "并列原因；非限制性定语从句", transferRule: "长句先分清作者提出的观点，再在观点内部标出主要原因与补充原因；看到 replace 时核对替代方向。" }],
    practice: [{ id: "2013-p1-s3-replacement-link", revision: 1, kind: "link", prompt: "连接被替代者与替代来源。", options: ["labor", "machines or foreign workers"], links: [{ source: "被替代者", target: "labor" }, { source: "替代来源", target: "machines or foreign workers" }], answer: '["labor","machines or foreign workers"]', evidence: "replacing labor with machines or foreign workers", feedback: "replace labor with machines：机器等接替 labor；方向不能倒过来。", conceptId: "lexical-context", errorType: "attachment", purpose: "answer-scope" }],
  },
  6: { grammarPatches: [{ explanation: "这里比较的是同一件事在过去和现在能否带来回报，句末不重复写 earn you。", relation: "Being average 是主语，it 回指它；what 指过去能得到的回报，used to 后省略 earn you。", term: "动名词主语；what 名词性从句；used to 后的省略", transferRule: "遇到 used to 句末省略时，从前文找回动作；再看现在句有没有 not，别把过去能力当成当前事实。" }], translationNotes: ["used to 在这里表示过去如此；不同于 be used to doing（习惯做某事）。"] },
  7: { grammarPatches: [{ explanation: "开头两个词单独读不完整，要回到上一句补出：普通水平不能再带来过去的回报。", relation: "when 引出更多雇主能接触到廉价替代资源的局面；access to 后是一组并列对象。", term: "谓语省略；带情境原因意味的 when 从句", transferRule: "短句含 it/can't 等承接词时，先找前句动作和对象，再解释新句的理由；不要另造一个动作。" }] },
  8: {
    trunk: "everyone needs to find their extra",
    literal: "因此，每个人需要找到其额外之处——其独特的价值贡献，这种贡献使其在无论是什么的从业领域中脱颖而出。",
    beginnerSyntax: { components: [
      part("everyone", "trunk", "不定代词", "主语", "needs", "要求面向每个人。"),
      part("needs to find", "trunk", "谓语及不定式", "说明需要采取的行动", "everyone", "需要找到，而不是已经找到了。"),
      part("their extra", "trunk", "名词化表达", "find 的宾语", "find", "extra 指额外优势，后面马上解释。"),
      part("their unique value contribution that makes them stand out in whatever is their field of employment", "supplement", "同位说明", "解释 extra", "their extra", "整段回答怎样的优势：能使个人脱颖而出的独特贡献。", [
        part("that makes them stand out in whatever is their field of employment", "modifier", "定语从句", "限定贡献的作用", "contribution", "that 是 makes 的主语；makes them stand out 不是让贡献自己突出。"),
      ]),
      part("whatever is their field of employment", "clause-internal", "融合关系结构", "介词 in 的宾语", "stand out in", "无论这个人的从业领域是什么，都需要独特价值。"),
    ], clauses: [
      clause("that makes them stand out in whatever is their field of employment", "定语从句", "that", "修饰 contribution", "that（指 contribution）", "makes", [{ function: "宾语", text: "them" }, { function: "宾语补足语", text: "stand out in whatever is their field of employment" }], "能够使他们在自己的领域脱颖而出 → 的贡献"),
      clause("whatever is their field of employment", "名词性关系从句", "whatever", "作 in 的宾语", "whatever", "is", [{ function: "表语", text: "their field of employment" }], "无论从事什么领域"),
    ] },
    grammarPatches: [{ explanation: "先读完“每个人需要额外优势”，再把破折号后整段当作这种优势的解释。", relation: "that 说明 contribution 的作用，them 回指 everyone；make 后直接接 stand，不加 to。", term: "同位说明；定语从句；使役动词复合宾语", transferRule: "破折号后的解释可帮助确定前面的抽象词含义；先辨清是谁让谁做什么，再接后面的领域限制。" }],
  },
  11: {
    trunk: "factories shed workers; one out of every three manufacturing jobs disappeared",
    literal: "正如戴维森指出的，在截止2009年的十年里，美国工厂裁掉工人的速度如此之快，以至于几乎抹去了此前七十年的全部岗位增长；大约每三个制造业岗位中就有一个——总计约六百万个——消失了。",
    beginnerSyntax: { components: [
      part("factories", "trunk", "名词复数", "第一分句主语", "shed", "裁员的是工厂。"),
      part("shed workers", "trunk", "动宾结构", "第一分句的动作和对象", "factories", "shed 在此是裁掉，不是棚屋；过去式仍为 shed。"),
      part("so fast that they erased almost all the gains of the previous 70 years", "supplement", "程度与结果结构", "解释裁员速度及后果", "shed workers", "十年的损失几乎抵消此前七十年的增长，强调速度而非利润。"),
      part("ending in 2009", "modifier", "现在分词短语", "限定十年的终点", "the 10 years", "说的是截止2009年的十年，不是2009年之后十年。"),
      part("roughly one out of every three manufacturing jobs", "trunk", "带约数的比例名词短语", "第二分句主语", "disappeared", "每三个制造业岗位中的一个，约为三分之一。"),
      part("about 6 million in total", "supplement", "插入性数量说明", "说明消失岗位总量", "one out of every three manufacturing jobs", "六百万是上述消失岗位的总数，不是制造业岗位总数。"),
      part("disappeared", "trunk", "不及物动词过去式", "第二分句谓语", "one out of every three manufacturing jobs", "找回破折号之后的动作：岗位消失。"),
    ], clauses: [
      clause("As Davidson notes", "评注性状语从句", "As", "交代引文来源", "Davidson", "notes", [], "正如戴维森指出的 → 接引文内容"),
      clause("that they erased almost all the gains of the previous 70 years", "结果状语从句", "that（与 so fast 配合）", "说明快速裁员的结果", "they（工厂）", "erased", [{ function: "宾语", text: "almost all the gains of the previous 70 years" }], "如此快 → 以至于几乎抵消此前的岗位增长"),
    ], reading: { focus: "区分两个时间段和两个数字的范围。", questions: [{ question: "6 million 数的是什么？", answer: "这十年消失的制造业岗位；不是利润，也不是全部岗位。", evidence: "one out of every three manufacturing jobs – about 6 million in total – disappeared" }], timeline: [{ label: "此前70年", explanation: "积累就业岗位的增长。" }, { label: "截至2009年的10年", explanation: "快速裁员，几乎抵消上述增长。" }] } },
    grammarPatches: [{ explanation: "句末 disappeared 才是第二个主要动作，两个破折号之间只是对消失数量的解释。", relation: "so fast that 连接速度与结果；of the previous 70 years 只限定 gains 的时间范围。", term: "结果状语从句；插入性补充说明", transferRule: "数字句先找数字所数的名词和主动作，再读时间、比例与总量，避免把岗位数换成钱数。" }],
  },
  13: { grammarPatches: [{ explanation: "外层只说“我们确定的一点是”，核心信息在后面：好工作要求劳动者多受教育。", relation: "we know for sure 修饰 thing；that 引出表语；workers 同时是 have education 和 make themselves above average 的执行者。", term: "省略关系代词的定语从句；表语从句；不定式的逻辑主语", transferRule: "在 require somebody to do 中，真正执行 to do 的是 somebody；遇到 themselves 时回找这个人，别挂到主句的物。" }] },
  14: {
    trunk: "there are many things, but nothing would be more important than passing some kind of G. I. Bill",
    literal: "在一个普通水平已经不够的世界里，我们有许多事需要做来支持就业，但没有什么会比通过某种面向21世纪的《退伍军人权利法案》式法案更重要；这项法案确保每个美国人都能获得高中之后的教育机会。",
    beginnerSyntax: { components: [
      part("In a world where average is officially over", "supplement", "含定语从句的介词短语", "设定全句背景", "支持就业的必要性", "先承接文章中心：普通水平不再足够。"),
      part("there are many things", "trunk", "存在句", "承认有多种可做的事", "we need to do", "many things 为后面的最高优先级作铺垫。"),
      part("we need to do to support employment", "modifier", "省略关系词的定语从句", "限定 things", "many things", "we need to do 中 do 的宾语是前面的 things；支持就业说明做这些事的目的。"),
      part("but nothing would be more important than passing some kind of G. I. Bill for the 21st century", "trunk", "否定比较结构", "突出最重要的措施", "passing some kind of G. I. Bill", "没有更重要的，等于强调这件事最重要；不是说通过法案不重要。"),
      part("that ensures that every American has access to post-high school education", "modifier", "嵌套从句", "限定法案要实现的内容", "some kind of G. I. Bill", "作者不是主张任意多立法，必须看法案保证什么。", [
        part("that every American has access to post-high school education", "clause-internal", "宾语从句", "说明 ensures 的保证内容", "ensures", "每个人能接受高中后教育才是目标。"),
      ]),
    ], clauses: [
      clause("where average is officially over", "定语从句", "where", "说明 world 中的处境", "average", "is", [{ function: "表语", text: "officially over" }], "普通水平已不够 → 的世界"),
      clause("we need to do to support employment", "定语从句", "省略 that/which", "修饰 things", "we", "need to do", [{ function: "do 的省略宾语", text: "things（先行词）" }], "我们为支持就业需要做 → 的事"),
      clause("that ensures that every American has access to post-high school education", "定语从句", "that", "限定 Bill", "that（指 Bill）", "ensures", [{ function: "宾语从句", text: "that every American has access to post-high school education" }], "保证教育机会 → 的法案"),
      clause("that every American has access to post-high school education", "宾语从句", "that", "作 ensures 的宾语", "every American", "has", [{ function: "宾语", text: "access to post-high school education" }], "每个美国人 → 有机会 → 接受高中后教育"),
    ] },
    grammarPatches: [{ explanation: "“没有什么比它更重要”其实是在强调它最重要。判断它是什么时，要把法案后面的教育目标一起读完。", relation: "nothing 否定有其他措施更重要；第一个 that 跟着 Bill，第二个 that 说 ensures 的内容。", term: "否定词加比较级；定语从句嵌套宾语从句", transferRule: "nothing is more ... than 常表达最高程度；政策题要区分实施工具与政策要达到的目的。" }],
    practice: [{ id: "2013-p1-s14-education-range", revision: 1, kind: "range", prompt: "划出法案必须确保的完整内容（从 every 开始，不含句号）。", options: [], answer: "every American has access to post-high school education", evidence: "that ensures that every American has access to post-high school education", feedback: "every American 是受益者，has access to 表示获得机会，教育是目标。只选 Bill 会漏掉措施的实质。", conceptId: "clause-object", errorType: "clause-boundary", purpose: "answer-scope" }],
  },
};
