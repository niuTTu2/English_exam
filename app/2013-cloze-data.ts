import type { Question, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2013-cloze");

export const cloze2013Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Given the advantages of electronic money, ", "condition", "过去分词短语", "背景状语", "限定后面的推测", "given表示考虑到；advantages说明电子货币的有利条件。"),
    segment("you might think ", "predicate", "主语加情态谓语", "主句", "引出think的内容", "might表示自然推测，不等于事实已经发生。"),
    segment("that we would move quickly to the cashless society ", "object", "that宾语从句", "think的宾语", "we为从句主语", "move to表示迈向；would表示从设想角度看的结果。"),
    segment("in which all payments are made electronically.", "modifier", "介词前置的定语从句", "限定cashless society", "which回指society", "all payments为被动句主语，electronically说明支付方式。"),
  ], "you might think that we would move to the cashless society.", "考虑到电子货币的优势，你也许会认为我们会迅速迈向所有支付都以电子方式完成的无现金社会。", "电子货币优势明显，人们自然会以为无现金社会很快就会到来。", "先提出直觉预期，为下一句转折和全文四项阻碍作铺垫。", [], [
    clause("that we would move quickly to the cashless society in which all payments are made electronically", "宾语从句", "that", "作think的宾语", "we", "would move", "to the cashless society", "先译人们的推测，再补无现金社会的定义。"),
    clause("in which all payments are made electronically", "限制性定语从句", "in which", "限定cashless society", "all payments", "are made", "electronically", "译为所有支付都以电子方式完成的社会。"),
  ]),
  sentence(2, [
    segment("However, ", "connector", "转折副词", "篇章转折", "否定上一句的快速预期", "however后有逗号，表示然而，不是递进。"),
    segment("a true cashless society ", "subject", "名词短语", "主语", "is的主语", "true强调真正完全无现金。"),
    segment("is probably not around the corner.", "predicate", "系表结构及否定", "谓语", "说明到来时间", "around the corner在此比喻即将到来；not否定这一临近性。"),
  ], "a true cashless society is not around the corner.", "然而，一个真正的无现金社会很可能并非近在眼前。", "然而，真正的无现金社会恐怕不会很快到来。", "明确全文立场：无现金化受到现实阻力。", []),
  sentence(3, [
    segment("Indeed, ", "connector", "确认性副词", "承接说明", "加强上一句判断", "indeed表示事实上，用过去预测未实现作证。"),
    segment("predictions have been around for two decades ", "predicate", "现在完成时及时间短语", "第一分句", "predictions为主语", "have been around表示预测存在已久；for two decades说明持续二十年。"),
    segment("but have not yet come to fruition.", "connector", "but连接省略主语的并列谓语", "转折结果", "共用主语predictions", "come to fruition表示成为现实，not yet说明至今未实现。"),
  ], "predictions have been around but have not come to fruition.", "事实上，这类预测已经存在了二十年，却至今没有成为现实。", "实际上，无现金社会的预测说了二十年，仍未实现。", "用长期存在而未兑现的预测证明进展缓慢。", []),
  sentence(4, [
    segment("For example, ", "connector", "举例连接语", "例证标记", "引出Business Week的预测", "该例具体说明预测如何落空。"),
    segment("Business Week predicted in 1975 ", "predicate", "专名主语加过去式谓语", "主句", "交代预测者与时间", "in 1975限定predicted，不是革命发生年份。"),
    segment('that electronic means of payment would soon "revolutionize the very concept of money itself," ', "object", "that宾语从句", "predicted的内容", "electronic means of payment为从句主语", "very和itself共同强调货币概念本身；would soon为当时的未来判断。"),
    segment("only to reverse itself several years later.", "modifier", "only to do结果结构", "意外结果", "逻辑主语为Business Week", "only to表示结果出乎原先预期；reverse itself为后来改变原有预测立场。"),
  ], "Business Week predicted that electronic means would revolutionize the concept of money, only to reverse itself.", "例如，《商业周刊》1975年预测电子支付手段很快会‘彻底改变货币概念本身’，结果几年后却自行推翻了这一判断。", "例如，《商业周刊》曾预言电子支付会很快革新货币本身，但几年后又改口。", "以媒体预测反转显示技术预言与落地之间存在差距。", [], [
    clause('that electronic means of payment would soon "revolutionize the very concept of money itself,"', "宾语从句", "that", "作predicted的宾语", "electronic means of payment", "would revolutionize", "the very concept of money itself", "先译预测，再译电子支付将如何改变货币概念。"),
  ]),
  sentence(5, [
    segment("Why ", "connector", "疑问副词", "原因提问", "修饰has been", "why询问进展迟缓的原因，引出下文四点。"),
    segment("has the movement to a cashless society ", "subject", "完成时倒装问句", "主语及助动词", "movement为主语中心", "to a cashless society说明运动方向。"),
    segment("been so slow in coming?", "predicate", "系表结构及介词补足", "谓语", "评价movement的速度", "slow in coming表示迟迟未到，不是运动速度慢的物理描写。"),
  ], "has the movement to a cashless society been slow in coming?", "为什么迈向无现金社会的进程来得如此缓慢？", "无现金社会为何迟迟没有到来？", "设问统领后文成本、收据与浮存、安全隐私四类原因。", []),
  sentence(6, [
    segment("Although electronic means of payment may be more efficient than a payments system based on paper, ", "condition", "although让步从句", "让步背景", "与主句阻碍因素形成反差", "more efficient than比较效率；based on paper为过去分词定语。"),
    segment("several factors ", "subject", "数量名词短语", "主语", "work against的施事", "factors指随后列举的多个现实因素。"),
    segment("work against the disappearance of the paper system.", "predicate", "动词短语", "谓语", "说明因素的作用方向", "work against表示阻碍；disappearance是消失而不是外观。"),
  ], "several factors work against the disappearance of the paper system.", "尽管电子支付可能比纸质支付体系更高效，但若干因素阻碍着纸质体系的消失。", "电子支付虽然更高效，现实中仍有多种因素使纸质支付难以退出。", "总括下文：效率优势不足以自动淘汰纸质支付。", [], [
    clause("Although electronic means of payment may be more efficient than a payments system based on paper", "让步状语从句", "Although", "让步于主句", "electronic means of payment", "may be", "more efficient than a payments system based on paper", "先译虽然电子支付更高效，再译纸质体系仍受保护。"),
  ]),
  sentence(7, [
    segment("First, ", "connector", "列举副词", "第一项原因", "引出基础设施成本", "First与后文Second、Third、Fourth对应。"),
    segment("it is very expensive ", "predicate", "形式主语结构", "主句", "it代替后置不定式", "expensive说明建设成本高，不是设备富有想象力。"),
    segment("to set up the computer, card reader, and telecommunications networks ", "object", "不定式真主语", "说明昂贵的事项", "并列三类基础设施", "set up表示建立和配置；networks与前两项共同受the语境限定。"),
    segment("necessary to make electronic money the dominant form of payment.", "modifier", "形容词短语含不定式", "限定networks并说明目的", "necessary说明成为主导形式所需条件", "make A B为使电子货币成为主导支付形式。"),
  ], "it is expensive to set up the networks necessary to make electronic money the dominant form of payment.", "第一，建立使电子货币成为主导支付形式所必需的计算机、读卡器和通信网络，成本很高。", "首先，要让电子货币成为主要支付方式，必须建设计算机、读卡器和通信网络，费用十分高昂。", "第一项阻碍是全国性电子支付基础设施的固定成本。", []),
  sentence(8, [
    segment("Second, ", "connector", "列举副词", "第二项原因", "引出纸质支票优势", "Second承接成本原因。"),
    segment("paper checks have the advantage ", "predicate", "主谓宾", "主句", "checks为主语", "advantage后由that从句说明具体优势。"),
    segment("that they provide receipts, ", "object", "同位内容从句", "解释advantage", "they回指paper checks", "provide receipts表示支票本身留下收据凭证。"),
    segment("something that many consumers are unwilling to give up.", "modifier", "同位概括加定语从句", "评价收据优势", "something指保留收据这一好处", "that在从句中作give up的宾语；unwilling表示不愿意。"),
  ], "paper checks have the advantage that they provide receipts, something consumers are unwilling to give up.", "第二，纸质支票有一个优势：它们能提供收据，而许多消费者不愿放弃这一点。", "其次，纸质支票能够留下收据凭证，这项好处许多消费者舍不得放弃。", "第二项阻碍是纸质支票可见、可保存的凭证功能。", [], [
    clause("that they provide receipts", "同位内容从句", "that", "说明advantage的内容", "they", "provide", "receipts", "译为支票能提供收据这一优势。"),
    clause("that many consumers are unwilling to give up", "限制性定语从句", "that", "限定something", "many consumers", "are unwilling", "to give up；that为give up宾语", "先译许多消费者不愿放弃，再明确放弃对象是收据优势。"),
  ]),
  sentence(9, [
    segment('Third, the use of paper checks gives consumers several days of "float" – ', "predicate", "主谓宾及破折号解释", "第三项原因的主句", "the use为主语", "float是资金尚未扣走的时间差，不是漂浮动作。"),
    segment("it takes several days before a check is cashed and funds are withdrawn from the issuer's account, ", "modifier", "it takes时间结构含before从句", "解释float", "before连接兑现与扣款发生前的间隔", "a check is cashed与funds are withdrawn为并列被动谓语。"),
    segment("which means ", "connector", "非限制性定语从句开头", "承接前述时间差", "which回指整件事", "means表示意味着，引出消费者获得的结果。"),
    segment("that the writer of the check can earn interest on the funds in the meantime.", "object", "that宾语从句", "means的内容", "writer为从句主语", "in the meantime表示在这几天中；interest为利息。"),
  ], "the use of paper checks gives consumers float, which means that the writer can earn interest.", "第三，使用纸质支票会给消费者几天的‘浮存期’——支票兑现、资金从出票人账户中扣除要过几天，这意味着出票人期间仍能用这笔资金赚取利息。", "再次，支票从开出到兑现扣款有几天时间差，开票人这期间还能获得利息。", "第三项阻碍是纸质支票给付款人带来的资金时间价值。", [], [
    clause("before a check is cashed and funds are withdrawn from the issuer's account", "时间状语从句", "before", "说明several days终点之前发生的等待", "a check / funds", "is cashed / are withdrawn", "from the issuer's account", "译为支票兑现并从出票人账户扣款之前要等几天。"),
    clause("which means that the writer of the check can earn interest on the funds in the meantime", "非限制性定语从句", "which", "概括前述时间差的结果", "which", "means", "that宾语从句", "译为这意味着出票人在此期间可获得利息。"),
    clause("that the writer of the check can earn interest on the funds in the meantime", "宾语从句", "that", "作means的宾语", "the writer of the check", "can earn", "interest on the funds", "先译出票人，再译期间用资金赚取利息。"),
  ]),
  sentence(10, [
    segment("Because electronic payments are immediate, ", "condition", "because原因从句", "原因状语", "解释为何浮存期消失", "immediate表示即时到账，不等于重要。"),
    segment("they ", "subject", "代词", "主语", "回指electronic payments", "they不是消费者或纸质支票。"),
    segment("eliminate the float for the consumer.", "predicate", "及物动词谓语", "谓语宾语", "说明即时支付后果", "eliminate为消除；for the consumer指出失去浮存利益的一方。"),
  ], "they eliminate the float for the consumer.", "由于电子支付即时完成，它们会消除消费者的浮存期。", "电子支付立即扣款，因此消费者不再享有这段资金时间差。", "即时性对系统是效率，对消费者却意味着失去浮存收益。", [], [
    clause("Because electronic payments are immediate", "原因状语从句", "Because", "说明消除float的原因", "electronic payments", "are", "immediate", "先译电子支付即时完成，再译浮存期被消除。"),
  ]),
  sentence(11, [
    segment("Fourth, ", "connector", "列举副词", "第四项原因", "引出安全与隐私", "最后一类阻碍随后展开黑客、欺诈与数据轨迹。"),
    segment("electronic means of payment ", "subject", "名词短语", "主语", "may raise的施事", "means在此是手段，虽以s结尾仍可作复数或同形名词。"),
    segment("may raise security and privacy concerns.", "predicate", "情态谓语及并列宾语", "谓语", "说明潜在问题", "raise concerns表示引发担忧，不是隐藏或减轻担忧。"),
  ], "electronic means of payment may raise security and privacy concerns.", "第四，电子支付手段可能引发安全与隐私方面的担忧。", "最后，电子支付还会带来安全和隐私问题。", "从经济便利转向电子系统的风险成本。", []),
  sentence(12, [
    segment("We often hear media reports ", "predicate", "主谓宾", "主句", "reports为hear的宾语", "media reports指媒体报道，不是亲耳听见黑客。"),
    segment("that an unauthorized hacker has been able to access a computer database ", "object", "that同位内容从句", "说明reports内容", "hacker为从句主语", "unauthorized表示未经授权；has been able to说明已经能够进入。"),
    segment("and to alter information stored there.", "connector", "and连接两个不定式", "第二项黑客行为", "共用has been able", "stored there为过去分词定语，there指数据库。"),
  ], "We hear reports that an unauthorized hacker has been able to access a database and to alter information stored there.", "我们经常从媒体报道中听说，未经授权的黑客能够进入计算机数据库，并篡改其中存储的信息。", "媒体常报道黑客非法进入数据库、修改其中保存的信息。", "以实际报道说明电子支付系统可能遭受未授权访问。", [], [
    clause("that an unauthorized hacker has been able to access a computer database and to alter information stored there", "同位内容从句", "that", "说明reports内容", "an unauthorized hacker", "has been able", "to access... and to alter...", "译为报道说黑客已能访问数据库并修改其中信息。"),
  ]),
  sentence(13, [
    segment("The fact ", "subject", "名词短语", "主语中心", "means的主语", "fact的具体内容由that同位从句补足。"),
    segment("that this is not an uncommon occurrence ", "modifier", "that同位从句及双重否定", "说明fact内容", "this回指黑客入侵篡改", "not uncommon表示并不少见，不能误译为不常见。"),
    segment("means ", "predicate", "一般现在时谓语", "主句谓语", "引出风险推论", "means在此为动词意味着。"),
    segment("that dishonest persons might be able to access bank accounts in electronic payments systems ", "object", "that宾语从句", "means的内容", "dishonest persons为从句主语", "might表示风险可能性，不说所有账户必然被入侵。"),
    segment("and steal from someone else's accounts.", "connector", "and连接并列动词", "第二项可能行为", "共用might be able to的语义范围", "steal from表示从账户盗取资金。"),
  ], "The fact means that dishonest persons might access bank accounts and steal from someone else's accounts.", "这类事情并不少见，意味着不诚实的人可能进入电子支付系统中的银行账户，并从他人的账户中盗取钱财。", "黑客入侵并非罕见，因此不法分子可能侵入电子支付账户并盗取资金。", "由数据库入侵事实推导支付账户欺诈风险。", [], [
    clause("that this is not an uncommon occurrence", "同位内容从句", "that", "说明The fact的内容", "this", "is not", "an uncommon occurrence", "用并不少见还原双重否定。"),
    clause("that dishonest persons might be able to access bank accounts in electronic payments systems and steal from someone else's accounts", "宾语从句", "that", "作means的宾语", "dishonest persons", "might be able to access / steal", "bank accounts / from someone else's accounts", "先译可能侵入账户，再译从他人账户盗取。"),
  ]),
  sentence(14, [
    segment("The prevention of this type of fraud ", "subject", "名词及of限定", "主语", "is的主语", "prevention指防止欺诈，不是考虑或操纵欺诈。"),
    segment("is no easy task, ", "predicate", "系表结构", "第一分句", "评价预防难度", "no easy task表示绝非易事。"),
    segment("and a new field of computer science ", "subject", "and连接的新分句主语", "第二分句主语", "is developing的主语", "a new field指计算机科学的新领域。"),
    segment("is developing to cope with security issues.", "predicate", "现在进行时及目的不定式", "第二分句谓语", "说明新领域发展目的", "cope with表示应对，issues为问题而非发行物。"),
  ], "The prevention is no easy task, and a new field is developing to cope with security issues.", "防止这类欺诈绝非易事，计算机科学的一个新领域正在发展，以应对安全问题。", "防范这种欺诈并不容易，计算机科学正发展出新领域来处理安全问题。", "说明安全风险需要新的技术领域持续治理，并非自然消失。", []),
  sentence(15, [
    segment("A further concern ", "subject", "限定名词短语", "主语", "is的主语", "further表示另一项担忧，转入隐私。"),
    segment("is ", "predicate", "系动词", "谓语", "连接concern与that内容", "后面的that从句说明担忧本身。"),
    segment("that the use of electronic means of payment leaves an electronic trail ", "object", "that表语从句", "说明担忧内容", "the use为从句主语", "electronic trail是可追踪记录，不是实体道路。"),
    segment("that contains a large amount of personal data.", "modifier", "that定语从句", "限定electronic trail", "that为从句主语", "a large amount of修饰不可数data的整体数量。"),
  ], "A further concern is that the use of electronic means leaves an electronic trail.", "另一个担忧是，使用电子支付手段会留下包含大量个人数据的电子轨迹。", "此外，电子支付会留下记录，其中含有大量个人数据。", "由账户安全进一步转向支付数据可追踪带来的隐私风险。", [], [
    clause("that the use of electronic means of payment leaves an electronic trail that contains a large amount of personal data", "表语从句", "that", "作is后的表语", "the use of electronic means of payment", "leaves", "an electronic trail", "先译另一项担忧，再译电子支付留下数据轨迹。"),
    clause("that contains a large amount of personal data", "限制性定语从句", "that", "限定electronic trail", "that", "contains", "a large amount of personal data", "译为包含大量个人数据的电子轨迹。"),
  ]),
  sentence(16, [
    segment("There are concerns ", "predicate", "there be存在句", "主句", "concerns为实际存在内容", "复数concerns与are一致。"),
    segment("that government, employers, and marketers might be able to access these data, ", "object", "that同位内容从句", "说明concerns内容", "三类主体并列", "might表示可能风险；these data回指支付轨迹中的个人数据。"),
    segment("thereby violating our privacy.", "modifier", "thereby加现在分词", "结果状语", "逻辑主语为前述访问者", "thereby表示由此，violating说明访问可能造成的隐私侵害。"),
  ], "There are concerns that government, employers, and marketers might access these data, thereby violating our privacy.", "人们担心政府、雇主和营销人员可能获取这些数据，从而侵犯我们的隐私。", "这些数据若被政府、雇主或营销机构读取，就可能侵犯个人隐私。", "落到全文最后的制度问题：便利留下的数据可能被多方滥用。", [], [
    clause("that government, employers, and marketers might be able to access these data", "同位内容从句", "that", "说明concerns内容", "government, employers, and marketers", "might be able to access", "these data", "先译担忧，再列出可能访问数据的三类主体。"),
  ]),
];

const questionRows: Array<[number, number, string[], Question["answer"], string, string[]]> = [
  [1, 2, ["Moreover", "However", "Therefore", "Otherwise"], "B", "前句说似乎会迅速无现金化，本句说真正的无现金社会并不临近，逻辑为转折。", ["Moreover表示递进，不能连接相反判断。", "However表示然而，准确引出反预期结论。", "Therefore表示因果结果，与语义方向相反。", "Otherwise表示否则，需要前置条件。"]],
  [2, 3, ["off", "back", "over", "around"], "D", "for two decades说明预测已经存在二十年；be around表示存在。", ["be off表示离开或取消。", "be back表示回来。", "be over表示结束，与仍未实现不符。", "be around表示存在、出现已久。"]],
  [3, 4, ["power", "concept", "history", "role"], "B", "引文谈电子支付将改变人们对货币本身的理解。", ["power是力量，不与货币本身的定义对应。", "concept of money表示货币概念。", "history是历史，原句未谈时间沿革。", "role是作用，范围比货币本身的观念更窄。"]],
  [4, 4, ["reverse", "resist", "resume", "reward"], "A", "only to说明杂志几年后改变了先前预测。", ["reverse itself表示转向相反立场。", "resist itself不表达撤回预测。", "resume表示恢复，不说明改口。", "reward表示奖励，与预测无关。"]],
  [5, 5, ["silent", "sudden", "slow", "steady"], "C", "二十年预测未实现，设问的是无现金化为何迟迟到来。", ["silent描述无声，不修饰进程到来。", "sudden表示突然，与长期未实现矛盾。", "slow in coming表示迟迟未到。", "steady表示稳定，不能突出延迟。"]],
  [6, 6, ["for", "against", "with", "on"], "B", "下文四点都阻碍纸质支付消失。", ["work for表示支持。", "work against表示阻碍。", "work with表示与……合作。", "work on表示从事或努力改善。"]],
  [7, 7, ["expensive", "imaginative", "sensitive", "productive"], "A", "建设计算机、读卡器和通信网络首先涉及高昂成本。", ["expensive与基础设施建设成本吻合。", "imaginative表示富有想象力，不能说明阻碍。", "sensitive表示敏感，后文未谈设备敏感性。", "productive表示高产，与成本障碍无关。"]],
  [8, 7, ["similar", "original", "temporary", "dominant"], "D", "这些网络的目标是让电子货币成为主要支付形式。", ["similar需要明确比较对象。", "original表示最初的，不是普及目标。", "temporary表示临时的，与社会转型不符。", "dominant表示占主导地位的。"]],
  [9, 8, ["collect", "copy", "provide", "print"], "C", "支票的优势在于它们能给消费者留下收据。", ["collect receipts是收集，不是支票自身功能。", "copy receipts需要另有原件。", "provide receipts表示提供收据凭证。", "print receipts强调打印设备，纸质支票不一定现场打印。"]],
  [10, 8, ["give up", "take over", "bring back", "pass down"], "A", "消费者不愿失去纸质收据的便利。", ["give up表示放弃。", "take over表示接管。", "bring back表示带回或恢复。", "pass down表示传给后代。"]],
  [11, 9, ["before", "after", "since", "when"], "A", "浮存期是支票兑现和资金扣除之前的几天。", ["before准确标出扣款前的等待期。", "after会把时间关系颠倒。", "since需要起点或原因，不适合takes several days结构。", "when只表示发生时，不能表达间隔。"]],
  [12, 9, ["kept", "borrowed", "withdrawn", "released"], "C", "资金从出票人账户中被扣走。", ["kept from表示阻止，不是账户扣款。", "borrowed from表示借出，主体关系不符。", "withdrawn from an account表示从账户提取、扣除。", "released from表示释放，不是银行账户惯用搭配。"]],
  [13, 10, ["Unless", "Because", "Until", "Though"], "B", "电子支付的即时性正是它消除浮存期的原因。", ["Unless表示除非，需条件关系。", "Because引出直接原因。", "Until表示直到，时间关系不合。", "Though表示让步，不能说明因果。"]],
  [14, 11, ["hide", "express", "ease", "raise"], "D", "电子支付会引发而非减轻安全和隐私担忧。", ["hide concerns是隐藏担忧。", "express concerns通常以人为主语表达担忧。", "ease concerns是缓解，方向相反。", "raise concerns表示引发担忧。"]],
  [15, 12, ["analyzed", "shared", "stored", "displayed"], "C", "there指数据库，信息是存储在其中后被黑客篡改。", ["analyzed表示分析，不能概括数据库中的全部信息。", "shared表示共享，原文无共享关系。", "stored表示存储，符合数据库功能。", "displayed表示显示，不一定说明数据库保存。"]],
  [16, 13, ["unsafe", "unnatural", "unclear", "uncommon"], "D", "not与uncommon构成双重否定，表示这种入侵并不少见。", ["not unsafe表示并非不安全，逻辑不合。", "not unnatural表示并非不自然，不说明频率。", "not unclear表示清楚，与occurrence搭配不当。", "not uncommon表示并不少见。"]],
  [17, 13, ["steal", "choose", "benefit", "return"], "A", "不法分子进入他人账户的风险是盗取资金。", ["steal from an account表示从账户盗取。", "choose from表示选择，非欺诈行为。", "benefit from表示受益，弱化了违法风险。", "return from表示返回，语义不合。"]],
  [18, 14, ["consideration", "prevention", "manipulation", "justification"], "B", "下文no easy task及安全技术领域说的是防范欺诈。", ["consideration是考虑，不能直接解决欺诈。", "prevention of fraud表示防止欺诈。", "manipulation是操纵，可能属于欺诈而非防范。", "justification是正当理由，与治理无关。"]],
  [19, 14, ["call for", "fight against", "adapt to", "cope with"], "D", "新领域发展的目的在于处理安全问题。", ["call for表示需要或呼吁，主语通常不是技术领域处理问题。", "fight against强调斗争，security issues范围更广。", "adapt to表示适应，不能涵盖解决安全风险。", "cope with表示应对、处理问题。"]],
  [20, 15, ["chunk", "chip", "trail", "path"], "C", "电子支付留下可追踪并含个人数据的记录链。", ["chunk是一大块数据或物体，不强调追踪。", "chip是芯片，支付不会留下实体芯片。", "electronic trail表示电子轨迹、记录链。", "path是路径，缺少留下记录供追踪的惯用含义。"]],
];

export const cloze2013Questions: Question[] = questionRows.map(([number, sentenceNumber, options, answer, locating, reasons]) => ({
  id: 201300 + number, number, sentenceId: `2013-cloze-s${sentenceNumber}`, prompt: `第${number}空`, answer, locating,
  options: options.map((text, index) => ({ key: "ABCD"[index] as Question["answer"], text })),
  explanations: { A: reasons[0], B: reasons[1], C: reasons[2], D: reasons[3] },
}));

for (const item of cloze2013Sentences) {
  let testText = item.text;
  const questions = cloze2013Questions.filter(question => question.sentenceId === item.id);
  item.answerWords = questions.map(question => question.options.find(option => option.key === question.answer)!.text);
  for (const question of questions) {
    const answer = question.options.find(option => option.key === question.answer)!.text;
    const start = testText.indexOf(answer);
    testText = `${testText.slice(0, start)}___(${question.number})${testText.slice(start + answer.length)}`;
  }
  if (questions.length) item.testText = testText;
}
