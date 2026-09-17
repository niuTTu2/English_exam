import type { BeginnerSyntaxComponent, BeginnerClauseDetail, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const a = (id: string, text: string, trunk: string, components: BeginnerSyntaxComponent[], colors: SyntaxVisualRole[], meaning: string, focus: string, clauses: BeginnerClauseDetail[] = []): SentenceAnalysis => withReviewedSyntax({
  id, number: 0, text, trunk, beginnerSyntax: { components, clauses }, layers: [{ label: "读题关键", text: focus }], grammar: [focus], literal: meaning, natural: meaning, logic: "这里只解释题目用语的结构；是否符合原文须回到证据链判断。", phrases: [],
}, colors);

export const passage2010P1QuestionAnalysis: Record<number, QuestionAnalysis> = {
  21: {
    prompt: a("201021-prompt-analysis", 'In the first paragraph, Damien Hirst\'s sale was referred to as "a last victory" because________________.', 'Damien Hirst\'s sale was referred to as "a last victory".', [
      c("In the first paragraph", "介词短语", "篇章范围状语", "限定referred to的篇章出处", "先到第一段定位，不是事件发生的物理地点。"),
      c("Damien Hirst's sale", "名词短语", "主语", "说明被如何称呼的事件", "sale是中心，所有格说明是哪次拍卖。"),
      c("was referred to", "被动谓语", "谓语", "连接sale与称呼", "refer to A as B变为A is referred to as B，to保留在动词搭配中。"),
      c('as "a last victory"', "as介词短语", "身份补足语", "补充sale被称作什么", "这里as表示‘作为/称为’，不是时间从句。"),
      c("because________________", "待补原因从句", "原因状语", "给‘最后胜利’补出原因", "空格要求接原因判断，原题还没有给出该从句的主谓。"),
    ], ["modifier", "subject", "predicate", "complement", "modifier"], "第一段中，赫斯特的拍卖被称为‘最后的胜利’，是因为……。", "先识别被动搭配be referred to as，再找because要求的原因。"),
    options: {
      D: a("201021-D-analysis", "it was successfully made just before the world financial crisis", "it was made", [
        c("it", "代词", "主语", "回指拍卖", "判断的对象仍是拍卖。"), c("was successfully made", "被动谓语", "谓语", "说明拍卖成功完成", "was made表示被完成；successfully说明结果成功。", [c("successfully", "副词", "方式状语", "修饰was made", "不是新的谓语。")]), c("just before the world financial crisis", "时间介词短语", "时间状语", "修饰was made", "just收窄before的时间距离；crisis是介词before的宾语中心。"),
      ], ["subject", "predicate", "modifier"], "它恰在全球金融危机之前成功举行。", "successfully回应victory，just before…回应last的危机背景；以原文并置关系作语境概括。"),
    },
  },
  22: {
    prompt: a("201022-prompt-analysis", 'By saying "spending of any sort became deeply unfashionable" (Line 1-2, Para. 3), the author suggests that ________________.', "the author suggests that ________________.", [
      c('By saying "spending of any sort became deeply unfashionable" (Line 1-2, Para. 3)', "介词by加-ing结构及引文", "方式状语", "说明作者通过哪句话表达意思", "saying的逻辑主语是the author；括号只是定位行段，不属于引文句法。", [c("spending of any sort became deeply unfashionable", "引述完整句", "引语内容", "作saying的内容", "引文内部是主系表；deeply修饰unfashionable，不是形容spending的种类。")]),
      c("the author", "名词短语", "主语", "说明作出暗示的人", "不是引文中的spending。"), c("suggests", "动词", "谓语", "表示暗示", "这里不是提建议。"), c("that ________________", "待补内容从句", "宾语从句", "作suggests的内容宾语", "that只引出要填入的判断，不在从句中充当主语。"),
    ], ["modifier", "subject", "predicate", "object"], "作者说‘各种消费行为变得极不受推崇’，由此暗示……。", "主句是the author suggests；By saying…交代借哪句话表达意思。", [{ text: "spending of any sort became deeply unfashionable", type: "引述完整句", marker: "引号", role: "作saying的内容", subject: "spending of any sort", predicate: "became", predicateDetails: [{ function: "表语", text: "deeply unfashionable；deeply修饰unfashionable" }], translationOrder: "各种消费行为 → 变得 → 极不受推崇。" }]),
    options: {
      B: a("201022-B-analysis", "people stopped every kind of spending and stayed away from galleries", "people stopped spending and stayed away", [
        c("people", "名词", "主语", "两个动作共用的主语", "这里不是把画廊作主语。"), c("stopped", "动词", "谓语", "动作一", "后接名词组every kind of spending，表示停止消费。"), c("every kind of spending", "名词短语", "宾语", "作stopped的宾语", "every kind涵盖每一类，语义很绝对。"), c("and", "连词", "并列连接", "连接共用people的两个谓语", "不是第三个动作。"), c("stayed away", "动词短语", "谓语", "动作二", "与stopped并列。"), c("from galleries", "介词短语", "对象补足语", "补充stayed away远离哪里", "from接远离的场所。"),
      ], ["subject", "predicate", "object", "connector", "predicate", "complement"], "人们停止了各种消费，并远离画廊。", "该项结构可以成立，但stopped every kind把原文的评价扩大成了全部停止的事实。"),
      D: a("201022-D-analysis", "works of art in general had gone out of fashion so they were not worth buying", "works of art had gone out of fashion so they were not worth buying", [
        c("works of art in general", "名词短语", "第一分句主语", "被评价的艺术品总体", "in general限定整体范围。"), c("had gone", "过去完成时", "第一分句谓语", "表示状态已经发生变化", "had gone不能拆成have to的义务结构。"), c("out of fashion", "状态介词短语", "状态补足语", "补充gone后变化到的状态", "go out of fashion表示过时。"), c("so", "连词", "结果连接", "连接前后因果判断", "选项在这里添加了因果关系。"), c("they", "代词", "第二分句主语", "回指works of art", "不是收藏家。"), c("were", "系动词", "第二分句谓语", "连接they与价值判断", "后面不是动作宾语。"), c("not worth buying", "形容词短语", "表语", "说明they是否值得买", "worth buying表示值得被购买；not否定这个价值判断，买的人是泛指的买家。"),
      ], ["subject", "predicate", "complement", "connector", "subject", "predicate", "complement"], "艺术品总体已经过时，所以不值得购买。", "结构是两组主系/状态关系由so连接；原文既未说作品过时，也未据此推导购买价值。", [{ text: "they were not worth buying", type: "结果分句", marker: "so（位于分句前）", role: "承接前句作为其结果", subject: "they（works of art）", predicate: "were", predicateDetails: [{ function: "表语", text: "not worth buying" }], translationOrder: "所以 → 它们 → 不值得购买。" }]),
    },
  },
  23: {
    prompt: a("201023-prompt-analysis", "Which of the following statements is NOT true?", "Which is NOT true?", [c("Which of the following statements", "疑问代词及范围短语", "主语", "问以下陈述中的哪一个", "of…限定which的选择范围。"), c("is", "系动词", "谓语", "连接判断对象与真假", "不用把它理解为‘存在’。"), c("NOT true", "否定形容词短语", "表语", "说明要求找出的状态", "NOT为反向题关键：选不正确项。")], ["subject", "predicate", "complement"], "以下哪项陈述不正确？", "先圈NOT，再逐项核对，避免做成选正确项。"),
    options: { B: a("201023-B-analysis", "The art market surpassed many other industries in momentum.", "The art market surpassed many other industries.", [c("The art market", "名词短语", "主语", "比较的一方", "不是interest作主语。"), c("surpassed", "及物动词", "谓语", "表示超过", "要求接被超过的对象。"), c("many other industries", "名词短语", "宾语", "作surpassed的比较对象", "many表示许多。"), c("in momentum", "介词短语", "方面状语", "限定surpassed在哪方面超过", "恰是这个比较维度与原文不符。")], ["subject", "predicate", "object", "modifier"], "艺术市场在增长势头方面超过了许多其他行业。", "句子语法没错，错误在比较维度momentum；不能用语法通顺代替原文核验。") },
  },
  24: { prompt: a("201024-prompt-analysis", "The three Ds mentioned in the last paragraph are ________________.", "The three Ds are ________________.", [c("The three Ds mentioned in the last paragraph", "名词短语及分词修饰", "主语", "说明被归类的三个D", "中心是Ds；mentioned是过去分词后置修饰，意思是上一段中提到的，不是主句谓语。", [c("mentioned in the last paragraph", "过去分词短语", "后置定语", "修饰The three Ds", "有被提及的被动关系；in…交代提及的篇章位置。")]), c("are", "系动词", "谓语", "连接三个D与类别", "真正承担时态和主谓一致的动词是are。"), c("________________", "待选名词短语", "表语", "补充它们是什么", "选项要概括三个因素的作用。")], ["subject", "predicate", "complement"], "最后一段提到的三个D是……。", "不要把mentioned当主句谓语；主干是The three Ds are…。") },
  25: { prompt: a("201025-prompt-analysis", "The most appropriate title for this text could be ________________.", "The most appropriate title could be ________________.", [c("The most appropriate title for this text", "名词短语", "主语", "要确定的文章标题", "中心title；most appropriate选最贴切的，for this text限定它对应整篇文章。"), c("could be", "情态动词加系动词", "谓语", "把标题与候选内容相连", "could表达选择可能性，不是在叙述过去某件事。"), c("________________", "待选标题短语", "表语", "补充合适的标题", "需能覆盖全文。")], ["subject", "predicate", "complement"], "本文最恰当的标题可能是……。", "for this text提醒定位范围是全文，不能只用最后一句或某个数字作答。") },
};
