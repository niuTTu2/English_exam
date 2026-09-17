import { withReviewedSyntax } from "./reviewed-syntax";
import { passage2010P1Reading } from "./2010-passage-1-reading";
import type { BeginnerSyntaxComponent, Question, SentenceAnalysis, SyntaxVisualRole } from "./data";

const component = (text: string, form: string, fn: string, modifies: string, explanation: string): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation });


const passage2010P1Drafts: Omit<SentenceAnalysis, "chunks">[] = [
  {
    id: "2010-p1-s1", number: 1,
    text: "The longest bull run in a century of art-market history ended on a dramatic note with a sale of 56 works by Damien Hirst, Beautiful Inside My Head Forever, at Sotheby's in London on September 15th 2008.",

    trunk: "The longest bull run ended.",
    layers: [{ label: "主干", text: "The longest bull run ended：持续时间最长的一轮牛市结束了。" }, { label: "结束方式", text: "on a dramatic note / with a sale...：以一场轰动的专场拍卖收尾。" }, { label: "地点与时间", text: "at Sotheby's in London / on September 15th 2008：地点从拍卖行到城市，时间精确到日期。" }],
    grammar: ["bull run 借用金融市场术语，指价格长期上涨的行情。", "by Damien Hirst 后置修饰 works，说明作品作者；Beautiful Inside My Head Forever 是拍卖专场名称的同位语。", "多个状语按方式—地点—时间展开，找主干时可先全部拿掉。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s1"], components: [
        {
          "children": [
            {
              "explanation": "限定持续时间最长的一轮。",
              "form": "形容词最高级",
              "function": "前置定语",
              "modifies": "修饰 bull run",
              "text": "longest"
            },
            {
              "explanation": "在艺术市场百年历史这个范围内比较。",
              "form": "介词短语",
              "function": "比较范围",
              "modifies": "限定 longest 的比较范围",
              "text": "in a century of art-market history"
            }
          ],
          "explanation": "先抓住 bull run（牛市行情）：最长的一轮牛市结束了。",
          "form": "名词短语",
          "function": "主语",
          "modifies": "与 ended 组成主句",
          "text": "The longest bull run in a century of art-market history"
        },
        {
          "explanation": "不及物用法，本身不需要宾语。",
          "form": "一般过去时动词",
          "function": "谓语",
          "modifies": "主语是 The longest bull run",
          "text": "ended"
        },
        {
          "explanation": "说明以戏剧性的方式收尾；note 在这里不是音符。",
          "form": "介词短语",
          "function": "方式状语",
          "modifies": "修饰 ended",
          "text": "on a dramatic note"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "说明作品由谁创作，不是说明谁在拍卖行主持拍卖。",
                  "form": "介词短语",
                  "function": "后置定语",
                  "modifies": "修饰 works",
                  "text": "by Damien Hirst"
                }
              ],
              "explanation": "拍卖对象是56件赫斯特的作品。",
              "form": "介词短语",
              "function": "后置定语",
              "modifies": "修饰 sale",
              "text": "of 56 works by Damien Hirst"
            },
            {
              "explanation": "这是拍卖名称，不是新的主语或句子。",
              "form": "专有名称",
              "function": "同位说明",
              "modifies": "给 sale 补充专场名称",
              "text": "Beautiful Inside My Head Forever"
            }
          ],
          "explanation": "以这一场拍卖作为收尾事件。",
          "form": "介词短语，含同位说明",
          "function": "伴随状语",
          "modifies": "补充 ended 所伴随的事件",
          "text": "with a sale of 56 works by Damien Hirst, Beautiful Inside My Head Forever"
        },
        {
          "explanation": "at 给具体拍卖行，in London 进一步定位其所在城市。",
          "form": "地点介词短语",
          "function": "地点状语",
          "modifies": "说明这场收尾拍卖的地点",
          "text": "at Sotheby's in London"
        },
        {
          "explanation": "具体一天用 on。",
          "form": "日期介词短语",
          "function": "时间状语",
          "modifies": "说明 ended 所指事件的日期",
          "text": "on September 15th 2008"
        }
      ], clauses: [] },
    literal: "艺术市场百年历史中持续时间最长的一轮牛市，以达米恩·赫斯特的56件作品于2008年9月15日在伦敦苏富比拍卖行的一场拍卖，戏剧性地落幕了。",
    natural: "2008年9月15日，达米恩·赫斯特的56件作品在伦敦苏富比专场拍卖；艺术市场百年来最长的一轮牛市由此戏剧性收官。",
    logic: "以牛市终结的标志性事件开篇，同时埋下‘盛况即转折点’的伏笔。",
    phrases: ["the longest bull run", "in a century of art-market history", "ended on a dramatic note", "a sale of 56 works", "at Sotheby's in London"],
  },
  {
    id: "2010-p1-s2", number: 2,
    text: "All but two pieces sold, fetching more than £70m, a record for a sale by a single artist.",

    trunk: "All but two pieces sold.",
    layers: [{ label: "数量主干", text: "All but two pieces sold：除两件外，其余作品全部售出。" }, { label: "结果", text: "fetching more than £70m：并取得超过七千万英镑的成交额。" }, { label: "同位评价", text: "a record...：这一金额创下单一艺术家专场拍卖纪录。" }],
    grammar: ["all but two = 除了两个以外全部；but 在此是介词‘除……之外’。", "sold 是 sell 的主动形式表达‘卖出、售出’，主语为商品时不必使用被动。", "fetching... 是现在分词结果状语；a record 是对前面金额的同位补充。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s2"], components: [component("All but two pieces", "all but + 数量 + 复数名词", "主语", "是 sold 的对象性主语", "先读 but two‘除两件外’，再回到 all：其余全部。"), component("sold", "一般过去时不及物用法", "谓语", "说明作品成功成交", "这里不是‘作品卖别人’，而是商品以某价格售出。"), component("fetching more than £70m", "现在分词短语", "结果状语", "修饰整句成交结果", "fetch 在交易语境表示‘卖得、取得某金额’，逻辑主语仍是这批作品。"), component("a record for a sale by a single artist", "名词同位短语", "补充说明", "概括 £70m 的纪录性质", "原文是同位名词短语，不是一个省略式从句；for 说明哪类纪录，by 说明专场所属艺术家。")], clauses: [] },
    literal: "除两件作品外其余全部售出，取得超过七千万英镑，成为单一艺术家作品拍卖的纪录。",
    natural: "除两件流拍外，其余作品全部成交，总额超过7000万英镑，创下单一艺术家专场拍卖纪录。",
    logic: "用惊人成交结果证明上一句所谓的‘戏剧性’与市场最后的繁荣。",
    phrases: ["all but two", "fetching more than £70m", "a record for a sale", "by a single artist"],
  },
  {
    id: "2010-p1-s3", number: 3,
    text: "It was a last victory.",

    trunk: "It was a last victory.",
    layers: [{ label: "指代", text: "It 回指前两句的赫斯特拍卖成功。" }, { label: "关键判断", text: "a last victory：衰退到来前的最后一次胜利，而非普通的‘上一次胜利’。" }],
    grammar: ["last 放在名词前可表示‘最后的’，这里由下句雷曼破产解释为何是最后一次。", "短句在长句之间形成强烈转折和悬念，是第21题的直接定位句。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s3"], components: [component("It", "人称代词", "主语", "回指前述拍卖", "不要译成无具体内容的‘它’，应还原为‘这场拍卖的成功’。"), component("was", "一般过去时系动词", "谓语", "连接主语与评价", "系动词后不是动作宾语，而是表语。"), component("a last victory", "名词短语", "表语", "说明此次拍卖的历史位置", "last 表‘危机前最后的’，其含义需结合下一句推断。")], clauses: [] },
    literal: "这是最后一次胜利。", natural: "然而，这也成了市场转衰前最后的一场胜利。",
    logic: "用极短句把拍卖成功重新定义为繁荣终点，引出金融危机。", phrases: ["a last victory"],
  },
  {
    id: "2010-p1-s4", number: 4,
    text: "As the auctioneer called out bids, in New York one of the oldest banks on Wall Street, Lehman Brothers, filed for bankruptcy.",

    trunk: "one of the oldest banks filed for bankruptcy.",
    layers: [{ label: "同时背景", text: "As the auctioneer called out bids：就在拍卖师报出竞价时。" }, { label: "主句", text: "Lehman Brothers filed for bankruptcy：雷曼兄弟申请破产。" }, { label: "身份补充", text: "one of the oldest banks on Wall Street 是主语，Lehman Brothers 是点明名称的同位语。" }],
    grammar: ["as 引导时间/伴随状语从句，强调两件事同时发生。", "call out bids 表高声报出竞价；file for bankruptcy 是法律和商业固定搭配。", "one of + 复数名词构成主语，中心是 one；逗号中的 Lehman Brothers 是同位语，点明银行名称。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s4"], components: [
        {
          "explanation": "拍卖师喊价与银行申请破产同时发生；As 在此表示当……时。",
          "form": "As + 主语 + 谓语 + 宾语",
          "function": "时间状语从句",
          "modifies": "修饰主句 filed",
          "text": "As the auctioneer called out bids"
        },
        {
          "explanation": "指出申请破产发生在纽约，与伦敦的拍卖形成对照。",
          "form": "介词短语",
          "function": "地点状语",
          "modifies": "修饰 filed",
          "text": "in New York"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "指出这些银行所在的领域/地点。",
                  "form": "介词短语",
                  "function": "后置定语",
                  "modifies": "修饰 banks",
                  "text": "on Wall Street"
                }
              ],
              "explanation": "华尔街最古老的银行中的一家。",
              "form": "of + 复数名词短语",
              "function": "后置定语",
              "modifies": "限定 one 的所属范围",
              "text": "of the oldest banks on Wall Street"
            },
            {
              "explanation": "两部分说的是同一家银行，不是并列两家。",
              "form": "机构专名",
              "function": "同位语",
              "modifies": "解释 one of the oldest banks on Wall Street",
              "text": "Lehman Brothers"
            }
          ],
          "explanation": "中心是 one，Lehman Brothers 补充这家银行的名称。",
          "form": "名词短语，带同位语",
          "function": "主语",
          "modifies": "是 filed 的主体",
          "text": "one of the oldest banks on Wall Street, Lehman Brothers"
        },
        {
          "explanation": "filed 是谓语动词，for bankruptcy 补充申请的事项。",
          "form": "动词 + 介词补足语",
          "function": "谓语部分",
          "modifies": "主语是上述银行",
          "text": "filed for bankruptcy"
        }
      ], clauses: [{"text":"As the auctioneer called out bids","type":"时间/伴随状语从句","marker":"As","role":"为主句提供同步发生的背景","subject":"the auctioneer","predicate":"called out","translationOrder":"先译‘就在拍卖师报出竞价时’，再译纽约发生的主句。","predicateDetails":[{"function":"宾语","text":"bids：拍卖师叫出的价格"}]}] },
    literal: "当拍卖师报出竞价时，在纽约，华尔街最古老的银行之一——雷曼兄弟——申请了破产。",
    natural: "伦敦拍卖师仍在高声报出竞价之际，纽约的华尔街老牌银行雷曼兄弟却申请了破产。",
    logic: "把艺术市场最后的胜利与金融危机爆发并置，直接解释 last victory。",
    phrases: ["called out bids", "one of the oldest banks", "on Wall Street", "filed for bankruptcy"],
  },
  {
    id: "2010-p1-s5", number: 5,
    text: "The world art market had already been losing momentum for a while after rising bewilderingly since 2003.",

    trunk: "The world art market had been losing momentum.",
    layers: [{ label: "主干", text: "The world art market had been losing momentum：全球艺术市场此前一直在失去增长动力。" }, { label: "持续时长", text: "for a while：失去势头的状态已经持续一段时间。" }, { label: "先后关系", text: "after rising bewilderingly since 2003：失去势头发生在自2003年起的上涨之后；bewilderingly 与 since 2003 都修饰 rising。" }],
    grammar: ["had been losing 是过去完成进行时：以先前叙述的2008年事件为参照，失去势头的过程此前已持续；不能仅凭时态断言过程当时结束。", "already 是副词，强调到当时已经如此；for a while 是时间状语，修饰 had been losing，表示持续时长。", "after 后接 -ing 非谓语结构，传统学习语法可称动名词短语；rising 的逻辑主语是 art market。bewilderingly 修饰 rising，since 2003 也修饰 rising，标上涨的起点。", "lose momentum 是增长势头减弱，不单凭这个词组就断言价格已经持续下跌。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s5"], components: [
        {
          "children": [
            {
              "explanation": "world 说明全球范围，art 说明艺术品类别，合起来是全球艺术市场。",
              "form": "名词作前置修饰语",
              "function": "前置定语",
              "modifies": "限定 market 的范围与类别",
              "text": "world art"
            }
          ],
          "explanation": "中心词是 market（市场），不是 world 或 art。",
          "form": "名词短语",
          "function": "主语",
          "modifies": "与 had already been losing 构成主谓关系",
          "text": "The world art market"
        },
        {
          "children": [
            {
              "explanation": "强调到当时已经如此；它插在助动词之间，不是时态公式的一部分。",
              "form": "副词",
              "function": "时间/阶段状语",
              "modifies": "修饰 had been losing 所表达的过程",
              "text": "already"
            }
          ],
          "explanation": "had + been + losing 是时态骨架：在前文过去事件发生前，失去势头的过程已持续了一段时间。",
          "form": "过去完成进行时动词组",
          "function": "谓语",
          "modifies": "主语是 The world art market",
          "text": "had already been losing"
        },
        {
          "explanation": "lose momentum 整体指失去增长动力或势头，不能把 momentum 标进谓语。",
          "form": "不可数名词",
          "function": "宾语",
          "modifies": "作 losing 的宾语",
          "text": "momentum"
        },
        {
          "explanation": "回答失去势头持续了多久：已有一段时间。",
          "form": "for + 表时段的名词短语",
          "function": "时间状语（持续时长）",
          "modifies": "修饰 had been losing",
          "text": "for a while"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "上涨的是市场；rising 自身不带独立时态。",
                  "form": "rise 的 -ing 形式",
                  "function": "非谓语中心",
                  "modifies": "逻辑主语是 art market",
                  "text": "rising"
                },
                {
                  "explanation": "形容上涨令人眼花缭乱；不是说市场感到困惑。",
                  "form": "副词",
                  "function": "方式/程度状语",
                  "modifies": "修饰 rising",
                  "text": "bewilderingly"
                },
                {
                  "explanation": "指出上涨自2003年起；不表示从2003年就开始失去势头。",
                  "form": "since + 时间点",
                  "function": "时间状语（起点）",
                  "modifies": "修饰 rising",
                  "text": "since 2003"
                }
              ],
              "explanation": "传统学习语法常称动名词短语；里面还能保留动词自己的修饰语。",
              "form": "-ing 非谓语结构",
              "function": "介词 after 的补足成分",
              "modifies": "整体接在 after 后",
              "text": "rising bewilderingly since 2003"
            }
          ],
          "explanation": "整组是“在自2003年开始的那轮上涨之后”；rising 的逻辑主语也是 art market。",
          "form": "after + -ing 非谓语结构",
          "function": "时间状语（先后关系）",
          "modifies": "给 had been losing 提供此前的上涨背景",
          "text": "after rising bewilderingly since 2003"
        }
      ], clauses: [] },
    literal: "全球艺术市场在自2003年起令人眼花缭乱地上涨之后，早已有一段时间一直在失去增长势头。",
    natural: "自2003年起经历一轮令人眼花缭乱的上涨后，全球艺术市场其实早已持续一段时间显露颓势。",
    logic: "从象征事件转入整体市场走势，说明危机前市场已开始降温。",
    phrases: ["the world art market", "losing momentum", "for a while", "after rising bewilderingly", "since 2003"],
  },
  {
    id: "2010-p1-s6", number: 6,
    text: "At its peak in 2007 it was worth some $65 billion, reckons Clare McAndrew, founder of Arts Economics, a research firm – double the figure five years earlier.",

    trunk: "It was worth some $65 billion.",
    layers: [{ label: "峰值", text: "At its peak in 2007 / worth some $65 billion：2007年顶峰时规模约650亿美元。" }, { label: "消息来源", text: "reckons Clare McAndrew：克莱尔·麦克安德鲁估算。" }, { label: "比较", text: "double the figure five years earlier：是五年前数字的两倍。" }],
    grammar: ["be worth + 金额表示价值为；some 放在数字前约等于 approximately。", "reckons Clare McAndrew 是插入式倒装的报道语，不改变主句结构。", "founder... 与 a research firm 分别为人和机构补充同位信息；double... 是省略式比较说明。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s6"], components: [
        {
          "explanation": "说明处于峰值时的市场规模；2007年是峰值年份。",
          "form": "介词短语",
          "function": "时间/状态状语",
          "modifies": "修饰 was worth",
          "text": "At its peak in 2007"
        },
        {
          "explanation": "回指 world art market。",
          "form": "代词",
          "function": "主语",
          "modifies": "与 was 构成主谓关系",
          "text": "it"
        },
        {
          "explanation": "后面给市场规模的评价，不是一个动作宾语。",
          "form": "一般过去时系动词",
          "function": "谓语",
          "modifies": "连接 it 与 worth…",
          "text": "was"
        },
        {
          "explanation": "worth 是形容词，金额是其补足成分；some 在数额前意为大约。",
          "form": "形容词短语",
          "function": "表语",
          "modifies": "说明 it 的价值规模",
          "text": "worth some $65 billion"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "这是一家研究公司；本层说明机构，不是说明 Clare 是公司。",
                  "form": "名词短语",
                  "function": "同位语",
                  "modifies": "解释 Arts Economics",
                  "text": "a research firm"
                }
              ],
              "explanation": "她是 Arts Economics 的创始人。",
              "form": "名词短语",
              "function": "同位语",
              "modifies": "解释 Clare McAndrew",
              "text": "founder of Arts Economics, a research firm"
            }
          ],
          "explanation": "正常语序是 Clare McAndrew reckons；先括起来不会打断前面的估值主干。",
          "form": "报道语，含两层同位说明",
          "function": "插入分句",
          "modifies": "说明估值是谁提出的",
          "text": "reckons Clare McAndrew, founder of Arts Economics, a research firm"
        },
        {
          "children": [
            {
              "explanation": "以2007年回推到2002年，限定用于比较的是哪一年的数字。",
              "form": "时间名词短语",
              "function": "后置时间限定",
              "modifies": "修饰 figure",
              "text": "five years earlier"
            }
          ],
          "explanation": "是五年前数字的两倍。",
          "form": "倍数比较短语",
          "function": "补充说明",
          "modifies": "解释 some $65 billion 相当于多少",
          "text": "double the figure five years earlier"
        }
      ], clauses: [] },
    literal: "艺术市场在2007年的顶峰价值约650亿美元，艺术经济研究公司创始人克莱尔·麦克安德鲁估计——是五年前数字的两倍。",
    natural: "艺术经济研究公司创始人克莱尔·麦克安德鲁估算，2007年巅峰期全球艺术市场规模约650亿美元，足足是五年前的两倍。",
    logic: "用峰值与五年前对比量化此前上涨幅度。",
    phrases: ["at its peak", "was worth some $65 billion", "a research firm", "double the figure", "five years earlier"],
  },
  {
    id: "2010-p1-s7", number: 7,
    text: "Since then it may have come down to $50 billion.",

    trunk: "It may have come down.",
    layers: [{ label: "时间起点", text: "Since then：自2007年峰值以来。" }, { label: "谨慎估计", text: "may have come down to...：市场规模可能已经降至500亿美元。" }],
    grammar: ["may have done 表对过去到现在已发生情况的推测。", "come down to + 数字表示下降到某水平；to 是终点，不能误读为下降了多少。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s7"], components: [component("Since then", "since + 时间点", "时间状语", "修饰 may have come down", "then 回指2007年峰值，说明下降的起点。"), component("it", "代词", "主语", "回指 world art market 的规模", "结合上句金额理解为市场规模。"), component("may have come down", "情态动词 + 完成式", "谓语", "表示对已发生下降的非确定判断", "may 表可能；have come down 表下降已经发生。"), component("to $50 billion", "to + 数值", "结果状语", "修饰 come down", "回答‘降到多少’，不是‘下降了多少’。")], clauses: [] },
    literal: "从那以后，它可能已经降到500亿美元。", natural: "此后，市场规模可能已回落至500亿美元。", logic: "由峰值转向当前缩水，为衰退主题提供数字证据。", phrases: ["since then", "may have come down to"],
  },
  {
    id: "2010-p1-s8", number: 8,
    text: "But the market generates interest far beyond its size because it brings together great wealth, enormous egos, greed, passion and controversy in a way matched by few other industries.",

    trunk: "The market generates interest.",
    layers: [{ label: "转折主干", text: "the market generates interest far beyond its size：市场受关注度远超其规模。" }, { label: "原因", text: "because it brings together...：因为它汇聚财富、自负、贪婪、激情和争议。" }, { label: "比较方式", text: "in a way matched by few other industries：其汇聚方式很少有其他行业能比。" }],
    grammar: ["generate interest 表引发关注；far 修饰 beyond，加强‘远远超出’。", "because 引导原因状语从句，内部 bring together A, B and C 为并列宾语。", "matched by few other industries 是过去分词短语后置修饰 way，相当于 which is matched...；few 含否定意味。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s8"], components: [
        {
          "text": "But",
          "form": "并列连词",
          "function": "转折连接",
          "modifies": "连接上文规模下降与下文高度关注",
          "explanation": "转向说明这个市场为何仍值得关注。"
        },
        {
          "text": "the market",
          "form": "名词短语",
          "function": "主语",
          "modifies": "与 generates 构成主谓关系",
          "explanation": "指艺术市场。"
        },
        {
          "text": "generates",
          "form": "一般现在时动词",
          "function": "谓语",
          "modifies": "主语是 the market",
          "explanation": "这里是引起，不是发电。"
        },
        {
          "text": "interest",
          "form": "名词",
          "function": "宾语",
          "modifies": "作 generates 的宾语",
          "explanation": "在这里表示关注，不是利息。"
        },
        {
          "text": "far beyond its size",
          "form": "副词 + 介词短语",
          "function": "程度/比较状语",
          "modifies": "限定 generates interest 的程度",
          "explanation": "引起的关注远超市场自身规模。",
          "children": [
            {
              "text": "far",
              "form": "副词",
              "function": "程度状语",
              "modifies": "修饰 beyond",
              "explanation": "加强远远超过的程度。"
            }
          ]
        },
        {
          "text": "because it brings together great wealth, enormous egos, greed, passion and controversy in a way matched by few other industries",
          "form": "because 引导完整从句",
          "function": "原因状语从句",
          "modifies": "解释 generates interest far beyond its size",
          "explanation": "整块一直到句末，都在给出市场受关注的原因。",
          "children": [
            {
              "text": "it",
              "form": "代词",
              "function": "从句主语",
              "modifies": "与 brings together 构成主谓关系",
              "explanation": "回指艺术市场。"
            },
            {
              "text": "brings together",
              "form": "动词短语",
              "function": "从句谓语",
              "modifies": "主语是 it",
              "explanation": "表示把不同因素汇聚到一起。"
            },
            {
              "text": "great wealth, enormous egos, greed, passion and controversy",
              "form": "五组并列名词",
              "function": "从句宾语",
              "modifies": "作 brings together 的宾语",
              "explanation": "财富、自负、贪婪、激情和争议共同被汇聚。"
            },
            {
              "text": "in a way matched by few other industries",
              "form": "介词短语，含过去分词定语",
              "function": "方式状语",
              "modifies": "修饰 brings together",
              "explanation": "限定这些因素以怎样的方式汇聚。",
              "children": [
                {
                  "text": "matched by few other industries",
                  "form": "过去分词短语",
                  "function": "后置定语",
                  "modifies": "修饰 way",
                  "explanation": "这种汇聚方式很少有其他行业能匹敌；few 带有否定意义。"
                }
              ]
            }
          ]
        }
      ], clauses: [{"text":"because it brings together great wealth, enormous egos, greed, passion and controversy in a way matched by few other industries","type":"原因状语从句","marker":"because","role":"解释市场格外引人关注的原因","subject":"it（the market）","predicate":"brings together","translationOrder":"先译主句结论，再用‘因为’引出五项原因。","predicateDetails":[{"function":"并列宾语","text":"great wealth, enormous egos, greed, passion and controversy"},{"function":"方式状语","text":"in a way matched by few other industries：汇聚这些因素的方式"}]}] },
    literal: "但这个市场产生的兴趣远远超出其规模，因为它以一种很少有其他行业可匹敌的方式，把巨大财富、膨胀的自我、贪婪、激情和争议汇聚在一起。",
    natural: "不过，艺术市场吸引的关注远超其体量，因为它把巨额财富、强烈自负、贪婪、激情和争议熔于一炉，鲜有其他行业能与之相比。",
    logic: "解释文章为何聚焦一个体量有限的市场，并修正第23题B的偷换：超出的是关注度，不是增长势头。",
    phrases: ["generates interest", "far beyond its size", "brings together", "in a way matched by few other industries"],
  },
  {
    id: "2010-p1-s9", number: 9,
    text: "In the weeks and months that followed Mr. Hirst's sale, spending of any sort became deeply unfashionable.",

    trunk: "Spending became deeply unfashionable.",
    layers: [{ label: "时间范围", text: "In the weeks and months...：在赫斯特拍卖后的数周与数月。" }, { label: "核心判断", text: "spending of any sort became deeply unfashionable：任何形式的消费都变得很不得人心。" }],
    grammar: ["that followed... 是限制性定语从句，修饰 weeks and months；follow 表时间上紧随其后。", "of any sort 后置修饰 spending，表示任何种类。", "become + 形容词是系表结构；deeply 修饰 unfashionable，表示程度深。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s9"], components: [
        {
          "children": [
            {
              "explanation": "that 还作从句主语；followed 表时间上在拍卖之后。",
              "form": "关系词 + 有限谓语 + 宾语",
              "function": "限制性定语从句",
              "modifies": "修饰 weeks and months",
              "text": "that followed Mr. Hirst's sale"
            }
          ],
          "explanation": "外层 In + 时间名词，给主句提供时间范围。",
          "form": "介词短语，内含定语从句",
          "function": "时间状语",
          "modifies": "修饰 became",
          "text": "In the weeks and months that followed Mr. Hirst's sale"
        },
        {
          "children": [
            {
              "explanation": "说明任何类型的消费，不仅限于购买艺术品。",
              "form": "介词短语",
              "function": "后置定语",
              "modifies": "修饰 spending",
              "text": "of any sort"
            }
          ],
          "explanation": "spending 指消费行为。",
          "form": "名词性短语",
          "function": "主语",
          "modifies": "与 became 构成主谓关系",
          "text": "spending of any sort"
        },
        {
          "explanation": "说明消费行为的社会评价发生变化。",
          "form": "一般过去时系动词",
          "function": "谓语",
          "modifies": "连接 spending 与 unfashionable",
          "text": "became"
        },
        {
          "children": [
            {
              "explanation": "加强形容词的程度，不是单独修饰 became 这个变化动作。",
              "form": "副词",
              "function": "程度状语",
              "modifies": "修饰 unfashionable",
              "text": "deeply"
            }
          ],
          "explanation": "不再受推崇，显得极不合时宜。",
          "form": "副词 + 形容词",
          "function": "表语",
          "modifies": "说明 spending 变成的状态",
          "text": "deeply unfashionable"
        }
      ], clauses: [{"text":"that followed Mr. Hirst's sale","type":"限制性定语从句","marker":"that","role":"限定 weeks and months","subject":"that（= weeks and months）","predicate":"followed","translationOrder":"先译中心词‘数周和数月’，再前置为‘赫斯特拍卖之后的数周和数月’。","predicateDetails":[{"function":"宾语","text":"Mr. Hirst's sale：紧跟其后的那场拍卖"}]}] },
    literal: "在赫斯特先生拍卖之后的数周和数月里，任何种类的花钱行为都变得极不时髦。",
    natural: "赫斯特拍卖后的几周乃至几个月里，各种消费行为都变得极不合时宜、不再受人推崇。",
    logic: "从宏观危机落到消费行为，是第22题引用句；下一句给出艺术市场中的具体表现。",
    phrases: ["in the weeks and months that followed", "spending of any sort", "became deeply unfashionable"],
  },
  {
    id: "2010-p1-s10", number: 10,
    text: "In the art world that meant collectors stayed away from galleries and salerooms.",

    trunk: "That meant collectors stayed away.",
    layers: [{ label: "领域", text: "In the art world：落实到艺术界。" }, { label: "具体含义", text: "collectors stayed away...：收藏家不再去画廊和拍卖场。" }],
    grammar: ["that 回指上一句‘消费失宠’。", "meant 后接省略 that 的宾语从句。", "stay away from + 地点/事物表示避开、不参与，不只是物理上离得远。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s10"], components: [component("In the art world", "in + 领域名词", "范围状语", "修饰 meant", "限定上一句现象在艺术市场中的表现。"), component("that", "指示代词", "主语", "回指消费普遍降温", "要还原为上一整句事实，而不是译成‘那个’。"), component("meant", "一般过去时动词", "谓语", "引出具体结果", "mean 在此是‘意味着’，后面接一个完整事件。"), component("collectors stayed away from galleries and salerooms", "省略 that 的完整从句", "宾语从句", "作 meant 的宾语", "collectors 是从句主语，stayed away 是谓语，from...说明避开的地点。")], clauses: [{"text":"collectors stayed away from galleries and salerooms","type":"省略 that 的宾语从句","marker":"省略 that","role":"作 meant 的宾语，解释艺术界的具体表现","subject":"collectors","predicate":"stayed away","translationOrder":"先译‘这意味着’，再译‘收藏家远离画廊和拍卖场’。","predicateDetails":[{"function":"对象介词补足语","text":"from galleries and salerooms：远离哪些场所"}]}] },
    literal: "在艺术界，那意味着收藏家远离画廊和拍卖场。", natural: "具体到艺术界，就是收藏家不再积极光顾画廊和拍卖场。", logic: "直接解释上一句抽象表述，是第22题A的同义改写依据。", phrases: ["in the art world", "stayed away from", "galleries and salerooms"],
  },
  {
    id: "2010-p1-s11", number: 11,
    text: "Sales of contemporary art fell by two-thirds, and in the most overheated sector, they were down by nearly 90% in the year to November 2008.",

    trunk: "Sales fell, and they were down.",
    layers: [{ label: "总体降幅", text: "Sales of contemporary art fell by two-thirds：当代艺术品销售额下降三分之二。" }, { label: "过热板块", text: "in the most overheated sector...down by nearly 90%：最过热板块近乎暴跌九成。" }, { label: "统计区间", text: "in the year to November 2008：截至2008年11月的一年。" }],
    grammar: ["fall by + 数量表示下降了多少；若表示降到某数用 fall to。", "and 连接两个独立分句，they 回指 sales。", "the year to November 2008 表截至该月为止的十二个月统计期。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s11"], components: [
        {
          "text": "Sales of contemporary art",
          "form": "名词短语",
          "function": "第一分句主语",
          "modifies": "与 fell 构成主谓关系",
          "explanation": "sales 在本句指销售额，of contemporary art 限定销售的商品类别。"
        },
        {
          "text": "fell",
          "form": "一般过去时动词",
          "function": "第一分句谓语",
          "modifies": "主语是 Sales",
          "explanation": "说明销售额下降。"
        },
        {
          "text": "by two-thirds",
          "form": "by + 数量",
          "function": "幅度状语",
          "modifies": "修饰 fell",
          "explanation": "下降了三分之二，不是降到三分之二。"
        },
        {
          "text": "and",
          "form": "并列连词",
          "function": "分句连接",
          "modifies": "连接 Sales fell… 和 they were down…",
          "explanation": "把总体情况与最过热板块的情况并列起来。"
        },
        {
          "text": "in the most overheated sector",
          "form": "介词短语",
          "function": "范围状语",
          "modifies": "修饰第二分句 were down",
          "explanation": "后面的近90%降幅针对最过热板块。"
        },
        {
          "text": "they",
          "form": "代词",
          "function": "第二分句主语",
          "modifies": "与 were 构成主谓关系",
          "explanation": "回指 sales，结合前置范围短语理解为该板块的销售额。"
        },
        {
          "text": "were",
          "form": "一般过去时系动词",
          "function": "第二分句谓语",
          "modifies": "连接 they 与 down",
          "explanation": "后接下降状态。"
        },
        {
          "text": "down",
          "form": "表示状态的词",
          "function": "表语",
          "modifies": "说明 they 所处的下降状态",
          "explanation": "与 were 组成下降的系表表达。"
        },
        {
          "text": "by nearly 90%",
          "form": "by + 数量",
          "function": "幅度状语",
          "modifies": "限定 down 的下降幅度",
          "explanation": "下降近90%，并非剩余90%。"
        },
        {
          "text": "in the year to November 2008",
          "form": "介词短语",
          "function": "时间状语",
          "modifies": "修饰第二分句 were down",
          "explanation": "给近90%的降幅标统计时段。",
          "children": [
            {
              "text": "to November 2008",
              "form": "介词短语",
              "function": "后置时间限定",
              "modifies": "修饰 the year",
              "explanation": "指截至2008年11月的一年，to 标终点。"
            }
          ]
        }
      ], clauses: [] },
    literal: "当代艺术销售下降了三分之二，而在最过热的板块，截至2008年11月的一年里，它们下降了将近90%。",
    natural: "当代艺术品销售额缩水三分之二；最过热的细分市场在截至2008年11月的一年内更是暴跌近九成。",
    logic: "用两级降幅量化收藏家退场造成的后果。", phrases: ["sales of contemporary art", "fell by two-thirds", "the most overheated sector", "were down by nearly 90%", "in the year to"],
  },
  {
    id: "2010-p1-s12", number: 12,
    text: "Within weeks the world's two biggest auction houses, Sotheby's and Christie's, had to pay out nearly $200m in guarantees to clients who had placed works for sale with them.",

    trunk: "Sotheby's and Christie's had to pay out nearly $200m.",
    layers: [{ label: "时间", text: "Within weeks：短短几周内。" }, { label: "主干", text: "two biggest auction houses...had to pay out nearly $200m：两大拍卖行不得不赔付近两亿美元。" }, { label: "收款对象", text: "to clients who...：付给曾委托它们出售作品的客户。" }],
    grammar: ["Sotheby's and Christie's 是对 two biggest auction houses 的同位说明。", "pay out 表大额支付或赔付；in guarantees 说明款项性质。", "who 引导定语从句修饰 clients；had placed 是过去完成时，委托出售先于赔付。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s12"], components: [
        {
          "explanation": "短短几周之内便出现赔付后果。",
          "form": "within + 时段",
          "function": "时间状语",
          "modifies": "修饰 had to pay out",
          "text": "Within weeks"
        },
        {
          "explanation": "中心是 auction houses；两个专名说明具体是哪两家。",
          "form": "名词短语 + 同位语",
          "function": "主语",
          "modifies": "是 pay out 的付款方",
          "text": "the world's two biggest auction houses, Sotheby's and Christie's"
        },
        {
          "explanation": "had to 表当时不得不，pay out 表大笔支付；这里没有过去完成时。",
          "form": "have to 的过去式 + 动词短语",
          "function": "谓语部分",
          "modifies": "主语是 auction houses",
          "text": "had to pay out"
        },
        {
          "children": [
            {
              "explanation": "指依担保承担的支付，不宜只按日常押金来理解。",
              "form": "介词短语",
              "function": "款项性质说明",
              "modifies": "说明 nearly $200m 是什么款项",
              "text": "in guarantees"
            }
          ],
          "explanation": "赔付近2亿美元。",
          "form": "金额名词短语",
          "function": "宾语",
          "modifies": "作 pay out 的宾语",
          "text": "nearly $200m in guarantees"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "作品被交来是为了出售。",
                  "form": "介词短语",
                  "function": "用途/状态说明",
                  "modifies": "说明 works 的用途",
                  "text": "for sale"
                },
                {
                  "explanation": "them 回指两家拍卖行，不是客户自己。",
                  "form": "介词短语",
                  "function": "受托方补足语",
                  "modifies": "补足 had placed，指出委托给谁",
                  "text": "with them"
                }
              ],
              "explanation": "who 指客户；had placed 表委托售卖先于赔付。",
              "form": "who 引导完整从句",
              "function": "限制性定语从句",
              "modifies": "修饰 clients",
              "text": "who had placed works for sale with them"
            }
          ],
          "explanation": "先读付给客户，再限定是哪种客户。",
          "form": "介词短语，内含定语从句",
          "function": "收款对象补足语",
          "modifies": "补足 pay out，说明付给谁",
          "text": "to clients who had placed works for sale with them"
        }
      ], clauses: [{"text":"who had placed works for sale with them","type":"限制性定语从句","marker":"who","role":"修饰 clients","subject":"who（= clients）","predicate":"had placed","translationOrder":"先译成‘客户’，再前置为‘曾把作品交给两家拍卖行出售的客户’。","predicateDetails":[{"function":"宾语","text":"works：委托拍卖的作品"},{"function":"状态说明","text":"for sale：作品用于出售"},{"function":"受托方补足语","text":"with them：交由两家拍卖行处理"}]}] },
    literal: "几周内，世界最大的两家拍卖行苏富比和佳士得不得不向把作品交给它们出售的客户支付近2亿美元保证金。",
    natural: "短短数周，苏富比和佳士得两大拍卖行就被迫向委托售画的客户支付近2亿美元担保款。",
    logic: "从成交下降推进到拍卖行实际损失，显示危机迅速传导。", phrases: ["Within weeks", "auction houses", "pay out", "in guarantees", "placed works for sale with"],
  },
  {
    id: "2010-p1-s13", number: 13,
    text: "The current downturn in the art market is the worst since the Japanese stopped buying Impressionists at the end of 1989.",

    trunk: "The current downturn is the worst.",
    layers: [{ label: "主干评价", text: "The current downturn...is the worst：当前低迷是此后最严重的一次。" }, { label: "比较起点", text: "since the Japanese stopped buying...：自日本买家停止购买印象派作品以来。" }, { label: "具体时间", text: "at the end of 1989：1989年末。" }],
    grammar: ["downturn in + market 表某市场的低迷。", "最高级 the worst 后接 since 从句，表示从过去节点至今的比较范围。", "the Japanese 是 the + 国籍形容词，表示日本人这一群体；stop doing 表停止原先在做的事。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s13"], components: [
        {
          "explanation": "中心是 downturn；in the art market 限定哪个市场的低迷。",
          "form": "名词短语",
          "function": "主语",
          "modifies": "与 is 构成主谓关系",
          "text": "The current downturn in the art market"
        },
        {
          "explanation": "说明本轮低迷处于怎样的比较地位。",
          "form": "系动词",
          "function": "谓语",
          "modifies": "连接 downturn 和 the worst",
          "text": "is"
        },
        {
          "explanation": "理解为最严重的一次低迷。",
          "form": "形容词最高级",
          "function": "表语",
          "modifies": "评价 current downturn",
          "text": "the worst"
        },
        {
          "children": [
            {
              "explanation": "停止购买的是印象派作品；用画家群体借指其作品。",
              "form": "动名词短语",
              "function": "宾语",
              "modifies": "作 stopped 的宾语",
              "text": "buying Impressionists"
            },
            {
              "explanation": "标的是日本买家停止购买的时间，不是 current downturn 的发生时间。",
              "form": "介词短语",
              "function": "时间状语",
              "modifies": "修饰 stopped",
              "text": "at the end of 1989"
            }
          ],
          "explanation": "从1989年底那次事件以来作比较，不是原因从句。",
          "form": "since + 完整主谓结构",
          "function": "时间状语从句",
          "modifies": "限定 the worst 的比较时间范围",
          "text": "since the Japanese stopped buying Impressionists at the end of 1989"
        }
      ], clauses: [{"text":"since the Japanese stopped buying Impressionists at the end of 1989","type":"时间状语从句","marker":"since","role":"给最高级 worst 划定从1989年底至今的范围","subject":"the Japanese","predicate":"stopped","translationOrder":"先译主句‘是最严重的一次’，再补‘自1989年底……以来’。","predicateDetails":[{"function":"动名词宾语","text":"buying Impressionists：停止的活动；Impressionists 在 buying 内部是宾语"},{"function":"时间状语","text":"at the end of 1989：停止购买的时间"}]}] },
    literal: "当前艺术市场的低迷，是自日本人在1989年底停止购买印象派作品以来最严重的一次。",
    natural: "自1989年底日本买家退出印象派艺术品市场以来，本轮艺术市场下滑最为严重。",
    logic: "以历史比较界定本轮衰退的严重性，开启对当前阶段的判断。", phrases: ["The current downturn", "the worst since", "stopped buying", "at the end of"],
  },
  {
    id: "2010-p1-s14", number: 14,
    text: "This time experts reckon that prices are about 40% down on their peak on average, though some have been far more fluctuant.",

    trunk: "Experts reckon that prices are down.",
    layers: [{ label: "专家估计", text: "prices are about 40% down on their peak on average：价格平均比峰值低约40%。" }, { label: "让步例外", text: "though some have been far more fluctuant：不过部分价格波动大得多。" }],
    grammar: ["reckon 后的 that 从句是宾语；be down on + 基准表示低于该基准。", "on average 修饰40%的总体估计，不能套用到每件作品。", "though 引导让步状语从句；some 代指 some prices/works。原卷用 fluctuant，按所给试卷保留，含义为‘波动的’。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s14"], components: [
        {
          "text": "This time",
          "form": "指示词 + 时间名词",
          "function": "时间/情境状语",
          "modifies": "修饰 reckon 所述本轮情况",
          "explanation": "区分本轮低迷与1989年那次。"
        },
        {
          "text": "experts",
          "form": "复数名词",
          "function": "主语",
          "modifies": "与 reckon 构成主谓关系",
          "explanation": "作判断的是专家。"
        },
        {
          "text": "reckon",
          "form": "一般现在时动词",
          "function": "谓语",
          "modifies": "主语是 experts",
          "explanation": "表示估计，后接完整的判断内容。"
        },
        {
          "text": "that prices are about 40% down on their peak on average",
          "form": "that 引导完整从句",
          "function": "宾语从句",
          "modifies": "作 reckon 的宾语",
          "explanation": "整个价格判断都是专家估计的内容。",
          "children": [
            {
              "text": "prices",
              "form": "复数名词",
              "function": "从句主语",
              "modifies": "与 are 构成主谓关系",
              "explanation": "是艺术品价格。"
            },
            {
              "text": "are",
              "form": "系动词",
              "function": "从句谓语",
              "modifies": "连接 prices 与 down",
              "explanation": "后面的状态是价格低于峰值。"
            },
            {
              "text": "about 40% down on their peak",
              "form": "程度成分 + 表语及其比较基准",
              "function": "表语部分",
              "modifies": "说明 prices 低于峰值的程度",
              "explanation": "about 40% 给大约低了多少，on their peak 给比较基准；不是还剩40%。"
            },
            {
              "text": "on average",
              "form": "介词短语",
              "function": "统计范围状语",
              "modifies": "限定 prices are about 40% down 这一估计",
              "explanation": "平均降幅，不适用于每件作品。"
            }
          ]
        },
        {
          "text": "though some have been far more fluctuant",
          "form": "though 引导完整从句",
          "function": "让步状语从句",
          "modifies": "为前面的平均值说明个体差异",
          "explanation": "平均降幅不代表所有价格波动相同。",
          "children": [
            {
              "text": "some",
              "form": "代词",
              "function": "从句主语",
              "modifies": "与 have been 构成主谓关系",
              "explanation": "指部分价格。"
            },
            {
              "text": "have been",
              "form": "系动词的现在完成式",
              "function": "从句谓语",
              "modifies": "连接 some 与 more fluctuant",
              "explanation": "概括此前到当前的波动状况。"
            },
            {
              "text": "far more fluctuant",
              "form": "程度副词 + 形容词比较级",
              "function": "表语",
              "modifies": "说明 some 的波动状态",
              "explanation": "比平均情况波动大得多。",
              "children": [
                {
                  "text": "far",
                  "form": "副词",
                  "function": "程度状语",
                  "modifies": "修饰比较级 more",
                  "explanation": "不是表示空间距离远，而是大得多。"
                }
              ]
            }
          ]
        }
      ], clauses: [{"text":"that prices are about 40% down on their peak on average","type":"宾语从句","marker":"that","role":"作 reckon 的内容宾语","subject":"prices","predicate":"are","translationOrder":"先译‘专家估计’，再译完整判断‘价格平均比峰值低约40%’。","predicateDetails":[{"function":"表语","text":"about 40% down：价格比峰值低约40%"},{"function":"比较基准","text":"on their peak"},{"function":"统计范围状语","text":"on average：按平均值来说"}]},{"text":"though some have been far more fluctuant","type":"让步状语从句","marker":"though","role":"补充不受平均值完全概括的个别情况","subject":"some（prices）","predicate":"have been","translationOrder":"主句后补‘尽管有些价格的波动要大得多’。","predicateDetails":[{"function":"表语","text":"far more fluctuant：波动大得多；far 修饰 more"}]}] },
    literal: "这一次，专家估计价格平均比其峰值低约40%，尽管有些一直波动得更厉害。",
    natural: "专家估计，本轮市场价格平均已较峰值下跌约40%，但不同作品的波动幅度差别很大。",
    logic: "给出总体降幅，同时提醒平均值掩盖了个体差异。", phrases: ["This time", "reckon that", "are about 40% down on their peak", "on average", "far more fluctuant"],
  },
  {
    id: "2010-p1-s15", number: 15,
    text: "But Edward Dolman, Christie's chief executive, says: \"I'm pretty confident we're at the bottom.\"",

    trunk: "Edward Dolman says.",
    layers: [{ label: "转折来源", text: "Edward Dolman, Christie's chief executive：佳士得首席执行官爱德华·多尔曼。" }, { label: "判断", text: "I'm pretty confident we're at the bottom：他相当确信市场已经触底。" }],
    grammar: ["Christie's chief executive 是同位语，补充 Edward Dolman 的身份。", "形容词 confident 后接省略 that 的内容补足从句 we're at the bottom，不是动词后面的直接宾语。", "at the bottom 是市场隐喻，指跌至最低点，不是空间上的底部。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s15"], components: [component("But", "并列连词", "转折连接", "连接严重下跌与触底判断", "表示虽跌幅很大，但业内人士认为最坏阶段或已过去。"), component("Edward Dolman, Christie's chief executive", "专名 + 同位语", "主语", "是 says 的发出者", "逗号之间是身份说明，拿掉仍剩完整主干。"), component("says", "一般现在时动词", "谓语", "引出直接引语", "新闻写作常用现在时转述当前观点。"), component("I'm pretty confident we're at the bottom", "直接引语，内含从句", "宾语内容", "说明说了什么", "I am confident 是外层；we're at the bottom 是 confident 的具体内容。")], clauses: [{"text":"we're at the bottom","type":"省略 that 的内容从句","marker":"省略 that","role":"补充 confident 的确信内容","subject":"we（泛指艺术市场参与者/市场）","predicate":"are","translationOrder":"先译‘我相当确信’，再接‘市场已经触底’。","predicateDetails":[{"function":"表语","text":"at the bottom：处于市场低谷；整个从句补足 confident 的内容"}]}] },
    literal: "但佳士得首席执行官爱德华·多尔曼说：‘我相当有信心，我们正处于底部。’", natural: "不过，佳士得首席执行官爱德华·多尔曼表示：‘我很有把握，市场已经触底。’", logic: "在悲观数据后引入谨慎乐观判断，为末段分析本轮低迷的不同之处过渡。", phrases: ["chief executive", "I'm pretty confident", "we're at the bottom"],
  },
  {
    id: "2010-p1-s16", number: 16,
    text: "What makes this slump different from the last, he says, is that there are still buyers in the market.",

    trunk: "What makes this slump different is that there are still buyers.",
    layers: [{ label: "主语从句", text: "What makes this slump different from the last：使本轮低迷不同于上一次的因素。" }, { label: "插入来源", text: "he says：仍是多尔曼的判断。" }, { label: "表语从句", text: "that there are still buyers in the market：市场中仍有买家。" }],
    grammar: ["What 引导融合型关系主语从句，相当于 the thing that。", "make A different from B 是 make + 宾语 + 形容词补足语。", "is 后 that 引导表语从句；there be 表存在，真正内容是 buyers。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s16"], components: [
        {
          "children": [
            {
              "explanation": "兼有引导作用，指使两次低迷不同的因素。",
              "form": "融合型关系代词",
              "function": "从句主语",
              "modifies": "作 makes 的主语",
              "text": "What"
            },
            {
              "explanation": "后接宾语与宾语补足语。",
              "form": "一般现在时动词",
              "function": "从句谓语",
              "modifies": "主语是 What",
              "text": "makes"
            },
            {
              "explanation": "被说成不同的是本轮低迷。",
              "form": "名词短语",
              "function": "从句宾语",
              "modifies": "作 makes 的宾语",
              "text": "this slump"
            },
            {
              "explanation": "from the last 补足 different，last 后省略与上文相同的 slump。",
              "form": "形容词短语",
              "function": "宾语补足语",
              "modifies": "说明 this slump 的状态",
              "text": "different from the last"
            }
          ],
          "explanation": "把整块理解为使本次低迷不同的因素。",
          "form": "What 引导完整从句",
          "function": "主语从句",
          "modifies": "整体作主句 is 的主语",
          "text": "What makes this slump different from the last"
        },
        {
          "explanation": "先拿掉仍能读出 What…is that…；he 指前句 Dolman。",
          "form": "主谓结构",
          "function": "插入分句",
          "modifies": "说明整句观点的来源",
          "text": "he says"
        },
        {
          "explanation": "真正的主句骨架在这个 is 上。",
          "form": "系动词",
          "function": "主句谓语",
          "modifies": "连接 What 从句与 that 从句",
          "text": "is"
        },
        {
          "children": [
            {
              "explanation": "there 是存在句标记，实际存在的是 buyers；still 强调仍然有。",
              "form": "存在句",
              "function": "从句核心",
              "modifies": "说明仍有 buyers 存在",
              "text": "there are still buyers"
            },
            {
              "explanation": "买家仍在艺术市场中。",
              "form": "介词短语",
              "function": "地点/范围状语",
              "modifies": "修饰 there are 所表达的存在",
              "text": "in the market"
            }
          ],
          "explanation": "给出不同之处的具体内容。",
          "form": "that 引导完整从句",
          "function": "表语从句",
          "modifies": "作主句 is 的表语",
          "text": "that there are still buyers in the market"
        }
      ], clauses: [{"text":"What makes this slump different from the last","type":"融合型关系主语从句","marker":"What（= the thing that）","role":"整体作主句主语","subject":"What","predicate":"makes","translationOrder":"整体先译为‘使本轮低迷不同于上次的地方’，再接 is 后答案。","predicateDetails":[{"function":"宾语","text":"this slump：这次低迷"},{"function":"宾语补足语","text":"different from the last：说明 this slump 有何不同"}]},{"text":"that there are still buyers in the market","type":"表语从句","marker":"that","role":"作 is 的表语，给出差异内容","subject":"buyers（there be 的实际主语）","predicate":"are","translationOrder":"译为‘市场中仍然存在买家’。","predicateDetails":[{"function":"存在对象（实义主语）","text":"buyers：仍然存在的买家，不是 are 的宾语"},{"function":"时间状语","text":"still：仍然"},{"function":"地点/范围状语","text":"in the market：在市场中"}]}] },
    literal: "他说，使这次低迷与上次不同的是，市场中仍然有买家。", natural: "他认为，本轮低迷与上一次不同之处在于：市场需求方并未消失，买家仍在。", logic: "提出本轮低迷的核心特征：问题不在买家完全消失，为下句供给不足作铺垫。", phrases: ["makes this slump different from the last", "this slump", "there are still buyers", "in the market"],
  },
  {
    id: "2010-p1-s17", number: 17,
    text: "Almost everyone who was interviewed for this special report said that the biggest problem at the moment is not a lack of demand but a lack of good work to sell.",

    trunk: "Almost everyone said that the biggest problem is not a lack of demand but a lack of good work.",
    layers: [{ label: "调查来源", text: "Almost everyone who was interviewed...：本专题采访到的几乎所有人。" }, { label: "否定误判", text: "not a lack of demand：最大问题不是需求不足。" }, { label: "真正问题", text: "but a lack of good work to sell：而是缺少可供出售的优质作品。" }],
    grammar: ["who was interviewed... 是定语从句，修饰 everyone；for 表为了这份专题报道。", "said 后 that 引导宾语从句。", "not A but B 为纠正型并列‘不是A，而是B’；to sell 后置修饰 good work，逻辑上是供人出售。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s17"], components: [
        {
          "children": [
            {
              "explanation": "是几乎所有人，并非绝无例外。",
              "form": "副词",
              "function": "范围修饰",
              "modifies": "修饰 everyone",
              "text": "Almost"
            },
            {
              "explanation": "限定为接受本专题采访的人；who 自己也作 was interviewed 的主语。",
              "form": "who 引导完整从句",
              "function": "限制性定语从句",
              "modifies": "修饰 everyone",
              "text": "who was interviewed for this special report"
            }
          ],
          "explanation": "先抓 everyone，再看范围限定。",
          "form": "代词短语，含定语从句",
          "function": "主语",
          "modifies": "是 said 的说话者",
          "text": "Almost everyone who was interviewed for this special report"
        },
        {
          "explanation": "后面完整的 that 从句整体作宾语。",
          "form": "一般过去时动词",
          "function": "主句谓语",
          "modifies": "引出 everyone 所说的内容",
          "text": "said"
        },
        {
          "children": [
            {
              "explanation": "讨论的是最大的问题。",
              "form": "名词短语",
              "function": "从句主语",
              "modifies": "与 is 构成主谓关系",
              "text": "the biggest problem"
            },
            {
              "explanation": "指眼下的情况。",
              "form": "介词短语",
              "function": "时间状语",
              "modifies": "限定 is 所表达的当前判断",
              "text": "at the moment"
            },
            {
              "explanation": "不能把后面的 not…but…拆散。",
              "form": "系动词",
              "function": "从句谓语",
              "modifies": "连接 problem 与后面的表语",
              "text": "is"
            },
            {
              "children": [
                {
                  "explanation": "作品是供出售的；卖的人由语境理解，不是作品去卖别的东西。",
                  "form": "不定式",
                  "function": "后置定语",
                  "modifies": "修饰 good work",
                  "text": "to sell"
                }
              ],
              "explanation": "先排除需求不足，再指出优质作品不足。",
              "form": "not A but B 并列名词短语",
              "function": "表语",
              "modifies": "说明 biggest problem 究竟是什么",
              "text": "not a lack of demand but a lack of good work to sell"
            }
          ],
          "explanation": "外层回答说什么，内部再按主系表拆解。",
          "form": "that 引导完整从句",
          "function": "宾语从句",
          "modifies": "作 said 的宾语",
          "text": "that the biggest problem at the moment is not a lack of demand but a lack of good work to sell"
        }
      ], clauses: [{"text":"who was interviewed for this special report","type":"限制性定语从句","marker":"who","role":"修饰 everyone","subject":"who（= everyone）","predicate":"was interviewed","translationOrder":"译成‘为本专题报道接受采访的人’后放到 everyone 前。","predicateDetails":[{"function":"目的/用途状语","text":"for this special report：为撰写这篇特别报道"},{"function":"无直接宾语","text":"who 是被采访者，被动谓语 was interviewed 后不另带被采访对象"}]},{"text":"that the biggest problem at the moment is not a lack of demand but a lack of good work to sell","type":"宾语从句","marker":"that","role":"作 said 的内容宾语","subject":"the biggest problem","predicate":"is","translationOrder":"先译‘几乎所有人都说’，再按‘不是……而是……’译判断。","predicateDetails":[{"function":"否定与肯定对照的表语","text":"not a lack of demand but a lack of good work to sell：不是缺需求，而是缺好作品"}]}] },
    literal: "几乎每一个为本专题报道接受采访的人都说，目前最大的问题不是缺乏需求，而是缺乏可以出售的好作品。",
    natural: "本专题采访的业内人士几乎一致认为：眼下最大难题不是没人想买，而是没有足够优质的作品可卖。",
    logic: "用多方采访验证上句判断，把市场矛盾明确定位为供给不足。", phrases: ["was interviewed for", "at the moment", "not a lack of demand but a lack of good work", "a lack of demand", "good work to sell"],
  },
  {
    id: "2010-p1-s18", number: 18,
    text: "The three Ds – death, debt and divorce – still deliver works of art to the market.",

    trunk: "The three Ds deliver works of art to the market.",
    layers: [{ label: "三D解释", text: "death, debt and divorce 是 three Ds 的同位解释。" }, { label: "作用", text: "deliver works of art to the market：促使艺术品流入市场。" }],
    grammar: ["破折号之间不是插入句，而是列举 three Ds 的具体内容。", "deliver A to B 表把A送到B；这里是拟人化用法，三种人生事件迫使藏家出售作品。", "still 表尽管优质供给不足，这些传统因素仍在发挥作用。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s18"], components: [
        {
          "explanation": "三个以D开头的人生变故，被拟人化为让作品流入市场的推动者。",
          "form": "名词短语",
          "function": "主语",
          "modifies": "与 deliver 构成主谓关系",
          "text": "The three Ds"
        },
        {
          "explanation": "破折号之间给出具体内容；没有谓语，不是三个从句。",
          "form": "三个并列名词",
          "function": "同位语",
          "modifies": "解释 The three Ds",
          "text": "death, debt and divorce"
        },
        {
          "children": [
            {
              "explanation": "即使供给不足，这些因素仍在促使作品上市。",
              "form": "副词",
              "function": "延续状语",
              "modifies": "修饰 deliver",
              "text": "still"
            }
          ],
          "explanation": "deliver 在这里表促使流入市场。",
          "form": "副词 + 一般现在时动词",
          "function": "谓语部分",
          "modifies": "主语是 The three Ds",
          "text": "still deliver"
        },
        {
          "explanation": "流入市场的是艺术作品。",
          "form": "名词短语",
          "function": "宾语",
          "modifies": "作 deliver 的宾语",
          "text": "works of art"
        },
        {
          "explanation": "目的地是艺术市场；不是后置定语来形容作品。",
          "form": "介词短语",
          "function": "方向补足语",
          "modifies": "补足 deliver，说明流向",
          "text": "to the market"
        }
      ], clauses: [] },
    literal: "三个D——死亡、债务和离婚——仍然把艺术作品送到市场。", natural: "死亡、债务和离婚这三类变故，仍会迫使藏品进入市场流通。", logic: "解释市场尚存的一类被动供给，也是第24题‘促进艺术品流通的因素’的定位句。", phrases: ["The three Ds", "works of art", "deliver works of art to the market"],
  },
  {
    id: "2010-p1-s19", number: 19,
    text: "But anyone who does not have to sell is keeping away, waiting for confidence to return.",

    trunk: "anyone who does not have to sell is keeping away.",
    layers: [{ label: "主语限定", text: "anyone who does not have to sell：任何没有被迫出售压力的人。" }, { label: "当前行为", text: "is keeping away：都在离场观望。" }, { label: "等待目标", text: "waiting for confidence to return：等待市场信心恢复。" }],
    grammar: ["who 引导定语从句修饰 anyone；have to 表客观必要，否定后是‘不必卖’。", "keep away 在此是不参与市场、暂不出售，语义由上下文补足。", "waiting... 是现在分词伴随状语；for confidence to return 是 for + 名词 + to do 的复合结构，confidence 是 return 的逻辑主语。"],
    beginnerSyntax: { reading: passage2010P1Reading["2010-p1-s19"], components: [
        {
          "explanation": "承接上句三种促使出售的因素，本句改说没有出售压力的藏家。",
          "form": "并列连词",
          "function": "转折连接",
          "modifies": "连接被迫出售与主动观望两种情况",
          "text": "But"
        },
        {
          "children": [
            {
              "explanation": "not 否定 have to，意思是不必卖，不是禁止卖。",
              "form": "who 引导完整从句",
              "function": "限制性定语从句",
              "modifies": "修饰 anyone",
              "text": "who does not have to sell"
            }
          ],
          "explanation": "不能删掉限制而理解成所有人都不卖。",
          "form": "不定代词 + 定语从句",
          "function": "主语",
          "modifies": "与 is keeping away 构成主谓关系",
          "text": "anyone who does not have to sell"
        },
        {
          "explanation": "在市场语境中指暂不参与出售、保持观望。",
          "form": "现在进行时动词短语",
          "function": "谓语",
          "modifies": "主语是 anyone who does not have to sell",
          "text": "is keeping away"
        },
        {
          "children": [
            {
              "children": [
                {
                  "explanation": "恢复的是市场信心，不是人回到某个地点。",
                  "form": "名词",
                  "function": "不定式的逻辑主语",
                  "modifies": "是 return 的发出者",
                  "text": "confidence"
                },
                {
                  "explanation": "return 在这里指信心恢复。",
                  "form": "不定式",
                  "function": "非谓语",
                  "modifies": "逻辑主语是 confidence",
                  "text": "to return"
                }
              ],
              "explanation": "在 for + 名词 + to do 结构中，confidence 是 return 的逻辑主语。",
              "form": "for + 名词 + 不定式",
              "function": "等待内容",
              "modifies": "补足 waiting，说明所等的事情",
              "text": "for confidence to return"
            }
          ],
          "explanation": "正在观望的这些人，也在等待信心恢复。",
          "form": "现在分词短语",
          "function": "伴随状语",
          "modifies": "补充同一主语 anyone 的等待状态",
          "text": "waiting for confidence to return"
        }
      ], clauses: [{"text":"who does not have to sell","type":"限制性定语从句","marker":"who","role":"修饰 anyone","subject":"who（= anyone）","predicate":"does not have to sell","translationOrder":"译成‘不必非卖不可的人’放在 anyone 前。","predicateDetails":[{"function":"无直接宾语","text":"sell 在语境中指出售作品，原句没有写出作品宾语"}]}] },
    literal: "但任何不必出售的人都在避开，等待信心回来。", natural: "但凡没有迫切出售压力的藏家都选择继续观望，静待市场信心恢复。", logic: "以自愿卖家惜售收束全文，解释为何需求尚在却优质供给不足，并支撑市场仍处低迷期的主旨。", phrases: ["have to sell", "keeping away", "waiting for confidence to return"],
  },
];

const reviewedVisualRoles: Record<string, SyntaxVisualRole[]> = {
  "2010-p1-s1": [
    "subject",
    "predicate",
    "modifier",
    "modifier",
    "modifier",
    "modifier"
  ],
  "2010-p1-s2": [
    "subject",
    "predicate",
    "modifier",
    "modifier"
  ],
  "2010-p1-s3": [
    "subject",
    "predicate",
    "complement"
  ],
  "2010-p1-s4": [
    "modifier",
    "modifier",
    "subject",
    "predicate"
  ],
  "2010-p1-s5": [
    "subject",
    "predicate",
    "object",
    "modifier",
    "modifier"
  ],
  "2010-p1-s6": [
    "modifier",
    "subject",
    "predicate",
    "complement",
    "modifier",
    "modifier"
  ],
  "2010-p1-s7": [
    "modifier",
    "subject",
    "predicate",
    "modifier"
  ],
  "2010-p1-s8": [
    "connector",
    "subject",
    "predicate",
    "object",
    "modifier",
    "modifier"
  ],
  "2010-p1-s9": [
    "modifier",
    "subject",
    "predicate",
    "complement"
  ],
  "2010-p1-s10": [
    "modifier",
    "subject",
    "predicate",
    "object"
  ],
  "2010-p1-s11": [
    "subject",
    "predicate",
    "modifier",
    "connector",
    "modifier",
    "subject",
    "predicate",
    "complement",
    "modifier",
    "modifier"
  ],
  "2010-p1-s12": [
    "modifier",
    "subject",
    "predicate",
    "object",
    "complement"
  ],
  "2010-p1-s13": [
    "subject",
    "predicate",
    "complement",
    "modifier"
  ],
  "2010-p1-s14": [
    "modifier",
    "subject",
    "predicate",
    "object",
    "modifier"
  ],
  "2010-p1-s15": [
    "connector",
    "subject",
    "predicate",
    "object"
  ],
  "2010-p1-s16": [
    "subject",
    "modifier",
    "predicate",
    "complement"
  ],
  "2010-p1-s17": [
    "subject",
    "predicate",
    "object"
  ],
  "2010-p1-s18": [
    "subject",
    "modifier",
    "predicate",
    "object",
    "complement"
  ],
  "2010-p1-s19": [
    "connector",
    "subject",
    "predicate",
    "modifier"
  ]
};

export const passage2010P1Sentences: SentenceAnalysis[] = passage2010P1Drafts.map(sentence => withReviewedSyntax(sentence, reviewedVisualRoles[sentence.id]));

const q = (number: number, sentenceId: string, prompt: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D", locating: string, explanations: Question["explanations"]): Question => ({
  id: 201000 + number, number, sentenceId, prompt,
  options: (["A", "B", "C", "D"] as const).map((key, index) => ({ key, text: options[index] })),
  answer, locating, explanations,
});

export const passage2010P1Questions: Question[] = [
  q(21, "2010-p1-s3", "In the first paragraph, Damien Hirst's sale was referred to as \"a last victory\" because________________.", ["the art market had witnessed a succession of victories", "the auctioneer finally got the two pieces at the highest bids", "Beautiful Inside My Head Forever won over all masterpieces", "it was successfully made just before the world financial crisis"], "D", "第3句称其为‘最后的胜利’，第4句立即把伦敦拍卖的叫价与雷曼兄弟申请破产并置：拍卖成功恰好发生在金融危机全面冲击市场之前。", { A: "文中只回顾一轮长期牛市，没有说艺术市场连续取得多场‘胜利’；succession 属无依据扩展。", B: "第2句说除两件外其余售出，未说拍卖师以最高价卖出那两件；事实方向相反。", C: "Beautiful Inside My Head Forever 是专场名称，文中没有与所有杰作比较。", D: "正确。拍卖成交盛况与雷曼破产同步，成为金融危机前最后一次显著成功。" }),
  q(22, "2010-p1-s10", "By saying \"spending of any sort became deeply unfashionable\" (Line 1-2, Para. 3), the author suggests that ________________.", ["collectors were no longer actively involved in art-market auctions", "people stopped every kind of spending and stayed away from galleries", "art collection as a fashion had lost its appeal to a great extent", "works of art in general had gone out of fashion so they were not worth buying"], "A", "引用句后的第10句给出作者自己的解释：在艺术界，这意味着收藏家远离画廊和拍卖场，即不再积极参与交易。", { A: "正确。collectors stayed away from galleries and salerooms 正是‘不再积极参与艺术市场拍卖’的同义表达。", B: "every kind of spending 是将强调性的 any sort 绝对化；原文重点落在艺术市场中的具体表现。", C: "失宠的是 spending（花钱行为），不是把 art collection 作为一种时尚本身。", D: "文中没有说艺术品本身不再时髦或不值得购买，后文反而说市场仍有买家。" }),
  q(23, "2010-p1-s8", "Which of the following statements is NOT true?", ["Sales of contemporary art fell dramatically from 2007 to 2008.", "The art market surpassed many other industries in momentum.", "The art market generally went downward in various ways.", "Some art dealers were awaiting better chances to come."], "B", "第8句说艺术市场因汇聚财富、欲望和争议而获得远超体量的关注，few other industries 能匹敌的是这种汇聚方式，并非市场增长 momentum。", { A: "符合第11句：当代艺术销售下跌三分之二，过热板块近九成。", B: "不正确，故为答案。原文的比较项是关注度及其汇聚财富、激情与争议的方式，不是增长势头。", C: "符合第5、7、11、14句：势头、市场规模、销量和价格均出现下降。", D: "与第19句一致：没有出售压力的人离场等待信心恢复，即等待更好时机。" }),
  q(24, "2010-p1-s18", "The three Ds mentioned in the last paragraph are ________________.", ["auction houses' favorites", "contemporary trends", "factors promoting artwork circulation", "styles representing Impressionists"], "C", "第18句使用 deliver A to B：死亡、债务和离婚会迫使持有人出售，从而把艺术品带入市场流通。", { A: "文中没有说拍卖行偏爱这些事件；它们只是造成被迫出售的外部因素。", B: "three Ds 是三类人生变故，不是当代艺术潮流。", C: "正确。deliver works of art to the market 即推动艺术品进入市场、促进流通。", D: "它们与印象派风格无关；Impressionists 只出现在上一段的历史比较中。" }),
  q(25, "2010-p1-s19", "The most appropriate title for this text could be ________________.", ["Fluctuation of Art Prices", "Up-to-date Art Auctions", "Art Market in Decline", "Shifted Interest in Arts"], "C", "全文从赫斯特拍卖这场‘最后的胜利’写到销量、价格下跌以及卖家惜售，中心是金融危机背景下艺术市场的衰退。", { A: "价格波动只是第四段的一项数据，范围过窄，不能覆盖销量、拍卖行赔付与供给问题。", B: "文章不是介绍最新拍卖动态，而是借一场拍卖标志市场转折。", C: "正确。Art Market in Decline 准确概括全文持续讨论的艺术市场下滑。", D: "文中变化的是消费与交易行为，并未把重点放在人们艺术兴趣转移到别处。" }),
];
