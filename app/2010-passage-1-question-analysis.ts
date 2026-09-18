import type { BeginnerSyntaxComponent, BeginnerClauseDetail, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const a = (id: string, text: string, trunk: string, components: BeginnerSyntaxComponent[], colors: SyntaxVisualRole[], meaning: string, focus: string, clauses: BeginnerClauseDetail[] = []): SentenceAnalysis => withReviewedSyntax({
  id, number: 0, text, trunk, beginnerSyntax: { components, clauses }, layers: [{ label: "读题关键", text: focus }], grammar: [focus], literal: meaning, natural: meaning, logic: "这里只解释题目用语的结构；是否符合原文须回到证据链判断。", phrases: [],
}, colors);
const p = (...args: Parameters<typeof a>): SentenceAnalysis => ({ ...a(...args), textKind: "phrase" });

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
      A: a("201021-A-analysis", "the art market had witnessed a succession of victories", "the art market had witnessed a succession of victories", [
        c("the art market", "名词短语", "主语", "说明经历了什么的市场", "中心词是market；art说明市场的类别。"),
        c("had witnessed", "过去完成时动词短语", "谓语", "说明在过去参照点之前经历的事情", "had + witnessed表示过去的过去；witness在这里是‘经历、见证’，不是名词‘证人’。时态成立不代表所述事实有原文依据。"),
        c("a succession of victories", "名词短语", "宾语", "说明市场经历了什么", "a succession of + 复数名词表示接连的一系列；victories是一场场胜利，不等于一轮牛市持续了很久。", [
          c("of victories", "介词短语", "后置定语", "补充succession包含的事件", "说明接连发生的是胜利；victories是victory的复数，辅音字母加y结尾变为-ies。"),
        ]),
      ], ["subject", "predicate", "object"], "艺术市场此前接连取得了一系列胜利。", "had witnessed只给出过去参照关系；a succession of victories添加了连续多场胜利，原文并未这样说，也没有解释为何是last。"),
      B: a("201021-B-analysis", "the auctioneer finally got the two pieces at the highest bids", "the auctioneer got the two pieces", [
        c("the auctioneer", "名词短语", "主语", "作出got这个动作的人", "auctioneer是拍卖师，不是auction（拍卖活动），也不是竞拍买家。"),
        c("finally", "副词", "时间状语", "修饰got", "说明最终发生，不是给two加数量范围。"),
        c("got", "一般过去时动词", "谓语", "说明拍卖师取得了什么", "got是get的过去式，字面是‘得到、取得’；不能因为有拍卖语境就把got自动改成‘售出’。"),
        c("the two pieces", "名词短语", "宾语", "作got的宾语", "pieces在艺术品语境指两件作品；the把这两件作品特指出来。"),
        c("at the highest bids", "介词短语", "价格状语", "说明got所对应的出价", "at + 价格/出价表示以某价格；highest是high的最高级，bids是‘出价’这个名词的复数。"),
      ], ["subject", "modifier", "predicate", "object", "modifier"], "拍卖师最终以最高出价得到了那两件作品。", "本项把焦点放在the two pieces，但原文all but two恰好把那两件排除在已售出的作品之外；也没有拍卖师取得它们的事实。"),
      C: a("201021-C-analysis", "Beautiful Inside My Head Forever won over all masterpieces", "Beautiful Inside My Head Forever won over all masterpieces", [
        c("Beautiful Inside My Head Forever", "专有名称", "主语", "被说成赢过其他作品的对象", "五个词合起来是拍卖会名称；Inside不是本句新开出的介词状语。"),
        c("won", "一般过去时动词", "谓语", "表示赢得胜利", "won是win的过去式；选项试图表达‘胜过’，不是原文已经给出的比较。"),
        c("over all masterpieces", "介词短语", "比较对象", "补充won所指向的比较范围", "选项意图是‘胜过所有杰作’，但这个措辞生硬。常见win over somebody是‘说服某人、赢得某人的支持’，不能把所有杰作当成被说服的人。all又把比较范围扩大到全部。"),
      ], ["subject", "predicate", "complement"], "《Beautiful Inside My Head Forever》胜过了所有杰作。", "先认出主语是拍卖会名称；原文没有它与all masterpieces比较的内容。排除依据是对象与证据不符，不是仅凭搭配生硬猜答案。"),
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
      A: a("201022-A-analysis", "collectors were no longer actively involved in art-market auctions", "collectors were no longer involved in art-market auctions", [
        c("collectors", "复数名词", "主语", "说明参与程度发生变化的人", "collector是收藏家；不是作品本身失去了价值。"),
        c("were", "一般过去时系动词", "谓语", "把collectors与参与状态相连", "与复数主语collectors搭配；这里重点是当时是否参与，并非另有一个人强迫他们参与。"),
        c("no longer actively involved in art-market auctions", "形容词化分词短语", "表语", "说明收藏家的参与状态", "be involved in表示参与某活动。involved虽有-ed形式，此处按状态理解；不是进行时，进行时需要be + -ing。", [
          c("no longer", "副词短语", "时间状语", "修饰参与状态were involved", "表示‘不再’，否定的是继续参与，不能只看longer译成‘更长’。"),
          c("actively", "副词", "方式状语", "修饰involved", "表示积极地；no longer actively involved不必扩大为从此绝无任何参与。"),
          c("in art-market auctions", "介词短语", "形容词补足语", "补充involved所涉及的活动", "in后接活动名词auctions；art-market说明是艺术市场的拍卖。"),
        ]),
      ], ["subject", "predicate", "complement"], "收藏家不再积极参与艺术市场的拍卖。", "be involved in讲参与状态；no longer actively involved对应原文stayed away from galleries and salerooms，不能扩成所有消费都停止。"),
      B: a("201022-B-analysis", "people stopped every kind of spending and stayed away from galleries", "people stopped spending and stayed away", [
        c("people", "名词", "主语", "两个动作共用的主语", "这里不是把画廊作主语。"), c("stopped", "动词", "谓语", "动作一", "后接名词组every kind of spending，表示停止消费。"), c("every kind of spending", "名词短语", "宾语", "作stopped的宾语", "every kind涵盖每一类，语义很绝对。"), c("and", "连词", "并列连接", "连接共用people的两个谓语", "不是第三个动作。"), c("stayed away", "动词短语", "谓语", "动作二", "与stopped并列。"), c("from galleries", "介词短语", "对象补足语", "补充stayed away远离哪里", "from接远离的场所。"),
      ], ["subject", "predicate", "object", "connector", "predicate", "complement"], "人们停止了各种消费，并远离画廊。", "该项结构可以成立，但stopped every kind把原文的评价扩大成了全部停止的事实。"),
      C: a("201022-C-analysis", "art collection as a fashion had lost its appeal to a great extent", "art collection had lost its appeal", [
        c("art collection as a fashion", "名词短语", "主语", "被说成失去吸引力的事物", "collection在这里是‘收藏活动’，不是某一组藏品；整个主语把艺术收藏当成一种时尚。", [
          c("as a fashion", "介词短语", "后置补充说明", "限定art collection被看待的角度", "as表示‘作为’，不是引出‘当……时’的从句，因为后面没有主谓。"),
        ]),
        c("had lost", "过去完成时动词短语", "谓语", "表示在过去参照点之前已经失去", "had + lost；lost是lose的不规则过去分词。过去完成时只编码时间关系，不证明原文真的说过这件事。"),
        c("its appeal", "名词短语", "宾语", "说明失去了什么", "its回指art collection；appeal在这里是‘吸引力’，不是‘呼吁’或‘上诉’。lose its appeal表示失去吸引力。"),
        c("to a great extent", "介词短语", "程度状语", "修饰had lost its appeal", "to…extent表示达到某种程度；great说明程度很大，不能把to误认成不定式标记。"),
      ], ["subject", "predicate", "object", "modifier"], "艺术收藏作为一种时尚，已经在很大程度上失去了吸引力。", "选项的主语是art collection，原文被评价的却是spending；had lost its appeal的时态和搭配通顺，仍不能消除评价对象的偷换。"),
      D: a("201022-D-analysis", "works of art in general had gone out of fashion so they were not worth buying", "works of art had gone out of fashion so they were not worth buying", [
        c("works of art in general", "名词短语", "第一分句主语", "被评价的艺术品总体", "in general限定整体范围。"), c("had gone", "过去完成时", "第一分句谓语", "表示状态已经发生变化", "had gone不能拆成have to的义务结构。"), c("out of fashion", "状态介词短语", "状态补足语", "补充gone后变化到的状态", "go out of fashion表示过时。"), c("so", "连词", "结果连接", "连接前后因果判断", "选项在这里添加了因果关系。"), c("they", "代词", "第二分句主语", "回指works of art", "不是收藏家。"), c("were", "系动词", "第二分句谓语", "连接they与价值判断", "后面不是动作宾语。"), c("not worth buying", "形容词短语", "表语", "说明they是否值得买", "worth buying表示值得被购买；not否定这个价值判断，买的人是泛指的买家。"),
      ], ["subject", "predicate", "complement", "connector", "subject", "predicate", "complement"], "艺术品总体已经过时，所以不值得购买。", "结构是两组主系/状态关系由so连接；原文既未说作品过时，也未据此推导购买价值。", [{ text: "they were not worth buying", type: "结果分句", marker: "so（位于分句前）", role: "承接前句作为其结果", subject: "they（works of art）", predicate: "were", predicateDetails: [{ function: "表语", text: "not worth buying" }], translationOrder: "所以 → 它们 → 不值得购买。" }]),
    },
  },
  23: {
    prompt: a("201023-prompt-analysis", "Which of the following statements is NOT true?", "Which is NOT true?", [c("Which of the following statements", "疑问代词及范围短语", "主语", "问以下陈述中的哪一个", "of…限定which的选择范围。"), c("is", "系动词", "谓语", "连接判断对象与真假", "不用把它理解为‘存在’。"), c("NOT true", "否定形容词短语", "表语", "说明要求找出的状态", "NOT为反向题关键：选不正确项。")], ["subject", "predicate", "complement"], "以下哪项陈述不正确？", "先圈NOT，再逐项核对，避免做成选正确项。"),
    options: {
      A: a("201023-A-analysis", "Sales of contemporary art fell dramatically from 2007 to 2008.", "Sales fell", [
        c("Sales of contemporary art", "名词短语", "主语", "说明下降的是哪一类销售", "中心是Sales，of contemporary art说明卖的是当代艺术作品；contemporary是‘当代的’，不能只凭art把范围扩成全部艺术。", [
          c("of contemporary art", "介词短语", "后置定语", "限定Sales的销售对象", "of把艺术品与其销售联系起来，不是fall下降到的终点。"),
        ]),
        c("fell", "一般过去时动词", "谓语", "说明Sales发生的变化", "fell是fall的不规则过去式，表示下跌，不是feel的过去式felt；在这里不接动作宾语。"),
        c("dramatically", "副词", "程度状语", "修饰fell", "在销量语境中表示‘大幅地、显著地’，不是‘戏剧性地表演’。"),
        c("from 2007 to 2008", "介词短语", "时间状语", "限定fell所描述的统计时期", "from A to B表示从起点A到终点B；这是年份范围，不是fall from某个数值to另一个数值。"),
      ], ["subject", "predicate", "modifier", "modifier"], "从2007年到2008年，当代艺术的销售大幅下跌。", "fell dramatically对应原文fell by two-thirds；截至2008年11月的一年支持2007—2008这个统计背景。本项符合原文，但NOT题应排除它。"),
      B: a("201023-B-analysis", "The art market surpassed many other industries in momentum.", "The art market surpassed many other industries.", [c("The art market", "名词短语", "主语", "比较的一方", "不是interest作主语。"), c("surpassed", "一般过去时及物动词", "谓语", "表示超过", "surpass的过去式加-ed，直接接被超过的对象；不能按more…than…结构再补than。"), c("many other industries", "名词短语", "宾语", "作surpassed的比较对象", "many表示许多。"), c("in momentum", "介词短语", "方面状语", "限定surpassed在哪方面超过", "恰是这个比较维度与原文不符。")], ["subject", "predicate", "object", "modifier"], "艺术市场在增长势头方面超过了许多其他行业。", "句子语法没错，错误在比较维度momentum；不能用语法通顺代替原文核验。"),
      C: a("201023-C-analysis", "The art market generally went downward in various ways.", "The art market went downward", [
        c("The art market", "名词短语", "主语", "概括发生变化的市场", "不是只说某一件艺术品的价格。"),
        c("generally", "副词", "概括性状语", "限定went downward这一总体判断", "表示‘总体上’，不是声称每一项交易、每一位买家都如此。"),
        c("went", "一般过去时动词", "谓语", "表示发展方向", "went是go的不规则过去式；go在这里说市场走势，并非人走路。"),
        c("downward", "副词", "方向状语", "补充went的变化方向", "表示向下；go downward合起来是走低、下滑，不是把downward当作被影响的宾语。"),
        c("in various ways", "介词短语", "方面状语", "限定市场在哪些方面走低", "本题的ways指多种表现或方面，结合文中势头、规模、销量、价格理解，不是市场主动采用几种手段。"),
      ], ["subject", "modifier", "predicate", "modifier", "modifier"], "艺术市场总体上在多个方面走低。", "generally和various ways概括多个下降证据，不是说每项数据毫无例外地下跌；本项事实成立，NOT题不能选它。"),
      D: a("201023-D-analysis", "Some art dealers were awaiting better chances to come.", "Some art dealers were awaiting better chances", [
        c("Some art dealers", "名词短语", "主语", "正在等待的人", "some限定部分艺术品经营者，不能改成所有买卖双方；dealer在这里是交易商、经营者。"),
        c("were awaiting", "过去进行时动词短语", "谓语", "说明当时持续的等待状态", "were + awaiting是过去进行时；await是及物动词，直接接等待对象，不再加for。wait则常用wait for something。"),
        c("better chances to come", "名词短语及不定式修饰", "宾语", "说明在等待什么", "better是good的比较级，chances是机会；不是说这些经营者将要come到某个地方。", [
          c("to come", "不定式短语", "后置定语", "修饰better chances", "来临的是chances，所以come的逻辑主语是chances；这里不是dealers为某目的而来的目的状语。"),
        ]),
      ], ["subject", "predicate", "object"], "一些艺术品经营者当时正在等待更好的机会到来。", "were awaiting表示等待正在持续，to come修饰机会；它概括原文部分卖方等待信心恢复，因此事实成立，但不应选作NOT题答案。"),
    },
  },
  24: {
    prompt: a("201024-prompt-analysis", "The three Ds mentioned in the last paragraph are ________________.", "The three Ds are ________________.", [c("The three Ds mentioned in the last paragraph", "名词短语及分词修饰", "主语", "说明被归类的三个D", "中心是Ds；mentioned是过去分词后置修饰，意思是最后一段中提到的，不是主句谓语。", [c("mentioned in the last paragraph", "过去分词短语", "后置定语", "修饰The three Ds", "有被提及的被动关系；in…交代提及的篇章位置。")]), c("are", "系动词", "谓语", "连接三个D与类别", "真正承担时态和主谓一致的动词是are。"), c("________________", "待选名词短语", "表语", "补充它们是什么", "选项要概括三个因素的作用。")], ["subject", "predicate", "complement"], "最后一段提到的三个D是……。", "不要把mentioned当主句谓语；主干是The three Ds are…。"),
    options: {
      A: p("201024-A-analysis", "auction houses' favorites", "auction houses' favorites", [
        c("auction houses' favorites", "名词短语", "表语（填入题干后）", "填入are后，说明三个D是什么", "中心词favorites是复数名词‘偏爱的事物’，不是形容词；整个选项没有谓语。", [
          c("auction houses'", "名词所有格短语", "前置限定语", "说明favorites是谁偏爱的", "auction house是拍卖行；houses是复数，以s结尾的复数所有格在末尾加撇号，写作houses'，不是house's。"),
        ]),
      ], ["complement"], "拍卖行所偏爱的事物", "所有格回答‘谁的偏好’。原文只说三个D推动作品上市，没有说拍卖行喜欢死亡、债务或离婚等变故。"),
      B: p("201024-B-analysis", "contemporary trends", "contemporary trends", [
        c("contemporary trends", "名词短语", "表语（填入题干后）", "填入are后，给三个D分类", "trends是中心词‘潮流、趋势’，contemporary是前置形容词‘当代的’；这是短语，不具有独立时态或谓语。", [
          c("contemporary", "形容词", "前置定语", "修饰trends", "这里是‘当代的’，不能把contemporary art中的‘艺术’含义算进contemporary这个单词。"),
        ]),
      ], ["complement"], "当代潮流", "三个D指death、debt、divorce这三类变故，不能因文章讨论当代艺术，就把它们归成艺术潮流。"),
      C: p("201024-C-analysis", "factors promoting artwork circulation", "factors", [
        c("factors promoting artwork circulation", "名词短语及现在分词修饰", "表语（填入题干后）", "填入are后，概括三个D的作用", "中心词factors是‘因素’；promoting没有独立承担主句时态，这个选项本身不是完整句。", [
          c("promoting artwork circulation", "现在分词短语", "后置定语", "修饰factors", "说明这些因素会促成什么：factors是promoting的逻辑主语，artwork circulation是其宾语。", [
            c("promoting", "现在分词", "非谓语动词中心", "说明factors造成的作用", "promote在这里是‘促进’，不是职位晋升或商业促销；不能看到-ing就认定是进行时。"),
            c("artwork circulation", "名词短语", "宾语", "作promoting的宾语", "中心circulation是‘流通’；artwork说明流通的对象是艺术作品，整个短语才是‘艺术品流通’。"),
          ]),
        ]),
      ], ["complement"], "促进艺术品流通的因素", "factors概括三个D，promoting artwork circulation把原文deliver works of art to the market换成名词加分词结构，保留了促使作品进入市场的因果作用。"),
      D: p("201024-D-analysis", "styles representing Impressionists", "styles", [
        c("styles representing Impressionists", "名词短语及现在分词修饰", "表语（填入题干后）", "填入are后，给三个D分类", "中心词styles是‘风格’，不是作品供给的原因；选项没有限定谓语。", [
          c("representing Impressionists", "现在分词短语", "后置定语", "修饰styles", "表示这些风格代表印象派画家；styles是representing的逻辑主语，Impressionists是宾语。", [
            c("Impressionists", "复数名词", "宾语", "作representing的宾语", "指印象派画家，不是Impressionism（印象主义）或impression（印象）。"),
          ]),
        ]),
      ], ["complement"], "代表印象派画家的风格", "representing是分词修饰，不是正在进行的动作；原文上一段提到印象派，并不支持把三个D解释为印象派风格。"),
    },
  },
  25: {
    prompt: a("201025-prompt-analysis", "The most appropriate title for this text could be ________________.", "The most appropriate title could be ________________.", [c("The most appropriate title for this text", "名词短语", "主语", "要确定的文章标题", "中心title；most appropriate选最贴切的，for this text限定它对应整篇文章。"), c("could be", "情态动词加系动词", "谓语", "把标题与候选内容相连", "could表达选择可能性，不是在叙述过去某件事。"), c("________________", "待选标题短语", "表语", "补充合适的标题", "需能覆盖全文。")], ["subject", "predicate", "complement"], "本文最恰当的标题可能是……。", "for this text提醒定位范围是全文，不能只用最后一句或某个数字作答。"),
    options: {
      A: p("201025-A-analysis", "Fluctuation of Art Prices", "Fluctuation", [
        c("Fluctuation of Art Prices", "标题名词短语", "标题内容（填入题干后作表语）", "概括候选标题讨论的对象", "中心Fluctuation是名词‘波动’，不是动词fluctuate；标题可以只用名词短语，不必有谓语。", [
          c("of Art Prices", "介词短语", "后置定语", "说明Fluctuation是什么的波动", "Prices是中心名词‘价格’，Art在前面限定是艺术品价格；of连接波动与其对象。"),
        ]),
      ], ["complement"], "艺术品价格的波动", "标题只讨论价格，还把方向概括成可升可降的波动；全文还包括销量、拍卖行损失和卖方观望，不能被价格一项覆盖。"),
      B: p("201025-B-analysis", "Up-to-date Art Auctions", "Art Auctions", [
        c("Up-to-date Art Auctions", "标题名词短语", "标题内容（填入题干后作表语）", "概括候选标题讨论的对象", "中心Auctions是‘拍卖活动’，Art限定拍卖的是艺术品；这里没有动词或时态。", [
          c("Up-to-date", "复合形容词", "前置定语", "修饰Art Auctions", "整体表示‘最新的’，连字符把几个词组成一个形容词；不能拆成动作up加目的to date，也不等于out-of-date（过时的）。"),
        ]),
      ], ["complement"], "最新艺术品拍卖", "Up-to-date强调新近资讯，Auctions把中心定在拍卖活动；原文用拍卖引出市场转衰，并非介绍最新拍卖动态。"),
      C: p("201025-C-analysis", "Art Market in Decline", "Art Market", [
        c("Art Market in Decline", "标题名词短语", "标题内容（填入题干后作表语）", "概括全文共同讨论的市场状态", "中心是Market，Art说明是哪一类市场；没有is，不能把标题硬拆成一个省写了谓语的主系表句。", [
          c("in Decline", "介词短语", "后置定语", "修饰Art Market", "in + 状态名词表示处于某状态；decline在这里是名词‘衰退’，不是动词‘拒绝’。整个短语表示‘处于衰退中的’。"),
        ]),
      ], ["complement"], "衰退中的艺术市场", "in Decline同时容纳牛市结束、势头减弱、销量和价格下降及卖方观望；概括整体下滑，不要求市场完全没有买家。"),
      D: p("201025-D-analysis", "Shifted Interest in Arts", "Interest", [
        c("Shifted Interest in Arts", "标题名词短语", "标题内容（填入题干后作表语）", "概括候选标题讨论的兴趣变化", "中心Interest是‘兴趣’，不是利息或利益；整个选项没有限定谓语。", [
          c("Shifted", "过去分词作修饰语", "前置定语", "修饰Interest", "表示已发生转移的；-ed放在名词前不等于这个标题有一般过去时，标题也没说明兴趣具体转向何处。"),
          c("in Arts", "介词短语", "后置定语", "补充Interest所涉及的领域", "interest in something表示对某事物的兴趣；in Arts不是说转移到Arts，不能把in读成表示终点的into。"),
        ]),
      ], ["complement"], "发生转移的艺术兴趣", "选项把主线定为艺术兴趣转移；原文讨论的是衰退中的交易、消费与供给，未说明人们的艺术兴趣转向了别处。"),
    },
  },
};
