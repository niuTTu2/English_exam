import type { Question, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2011-p2");
export const passage2011P2Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Whatever ", "subject", "强调疑问代词", "疑问主语", "happened的主语", "此处等于加强语气的what，不引无论什么的让步从句。"),
    segment("happened ", "predicate", "过去时不及物动词", "谓语", "追问原先预测的去向", "happen to引出所谈对象：报纸的所谓消亡。"),
    segment("to the death of newspapers?", "modifier", "to介词短语", "对象补足", "限定happened涉及何事", "death拟人化指报纸行业消亡；问句质疑之前预测而非断言已经消亡。"),
  ], "Whatever happened to the death of newspapers?", "报纸的消亡究竟怎么了？", "不是说报纸要消亡了吗？如今这说法怎么没了下文？", "反问开篇，对曾经流行的消亡预言提出疑问。", ["Whatever happened to the death of newspapers"]),
  sentence(2, [
    segment("A year ago ", "modifier", "名词加ago", "过去时间状语", "限定seemed", "从叙述时点回看一年前，不擅自添加具体年份。"),
    segment("the end ", "subject", "定冠词加名词", "主语", "seemed的主语", "end回指报业可能终结。"),
    segment("seemed near.", "predicate", "系动词加形容词", "系表谓语", "说明end看似临近", "seemed表示当时观感，并非已经发生。"),
  ], "the end seemed near.", "一年前，终结似乎已经很近。", "一年前，报业似乎已走到尽头。", "回顾悲观气氛，为后文恢复盈利制造反差。", []),
  sentence(3, [
    segment("The recession ", "subject", "特指经济名词", "主语", "threatened的主语", "指经济衰退，不是报纸自己主动撤销业务。"),
    segment("threatened to remove ", "predicate", "过去时动词加不定式", "谓语", "说明衰退可能造成的后果", "threaten to表示眼看要带来风险，非发出口头威胁。"),
    segment("the advertising and readers ", "object", "并列名词短语", "remove的宾语", "受威胁的收入和读者资源", "advertising指广告业务；与readers并列两项。"),
    segment("that had not already fled to the internet.", "modifier", "that定语从句", "后置定语", "限定剩余广告与读者", "that为主语，had not fled过去完成时；not already说明此前尚未转向互联网的部分。"),
  ], "The recession threatened to remove the advertising and readers.", "经济衰退威胁着要夺走那些尚未逃向互联网的广告业务和读者。", "那些尚未转向互联网的广告和读者，也可能因经济衰退而流失。", "交代既有互联网分流与新增衰退压力叠加的困境。", ["fled to the internet"], [clause("that had not already fled to the internet", "限制性定语从句", "that", "限定advertising and readers", "that", "had not already fled", "to the internet（去向）", "译成‘那些此前尚未转向互联网的’后接广告和读者。")]),
  sentence(4, [
    segment("Newspapers like the San Francisco Chronicle ", "subject", "名词加举例介词短语", "主语", "were chronicling的施事", "like引出报纸实例，San Francisco Chronicle为《旧金山纪事报》。"),
    segment("were chronicling ", "predicate", "过去进行时", "谓语", "说明报纸当时记述什么", "动词chronicle记述与报纸名Chronicle构成用词呼应。"),
    segment("their own doom.", "object", "所有格加抽象名词", "宾语", "chronicling的内容", "own强调记述的是自己的厄运，不是仅报道别的行业。"),
  ], "Newspapers were chronicling their own doom.", "像《旧金山纪事报》这样的报纸，正在记述它们自身的厄运。", "连《旧金山纪事报》这样的报纸，也开始报道自己濒临衰亡的处境。", "26题定位：自述厄运体现处境绝望，不是忽视危机。", ["chronicling their own doom"]),
  sentence(5, [
    segment("America's Federal Trade Commission ", "subject", "所有格加机构专名", "主语", "launched的施事", "美国联邦贸易委员会，下文It的指代对象。"),
    segment("launched ", "predicate", "过去时及物动词", "谓语", "说明委员会发起行动", "launch为启动，不是发射实体物体。"),
    segment("a round of talks ", "object", "量化名词短语", "宾语", "launched的对象", "a round of表示一轮；talks复数指会谈。"),
    segment("about how to save newspapers.", "modifier", "介词加疑问词不定式", "议题后置说明", "限定talks", "how to save为非限定嵌入疑问，说明讨论怎样挽救报纸，不是完整有限从句。"),
  ], "America's Federal Trade Commission launched a round of talks.", "美国联邦贸易委员会发起了一轮关于如何挽救报纸的会谈。", "美国联邦贸易委员会就如何挽救报业展开了一轮讨论。", "以政府机构介入说明当时忧虑之深。", ["a round of talks", "how to save newspapers"]),
  sentence(6, [
    segment("Should ", "predicate", "提前的情态助动词", "疑问谓语标记", "与become共同提问", "Should表是否应当采取某种对策。"),
    segment("they ", "subject", "复数代词", "主语", "回指newspapers", "不是委员会成员。"),
    segment("become charitable corporations?", "predicate", "系动词加名词表语", "谓语与表语", "说明拟议组织形式", "charitable corporations指慈善性质的法人组织，问句并未说已经转型。"),
  ], "Should they become charitable corporations?", "它们应该变成慈善性公司吗？", "报纸是否应转为慈善性质的机构？", "列举讨论中的救济方案，不当作现实既成事实。", []),
  sentence(7, [
    segment("Should ", "predicate", "疑问情态助动词", "疑问标记", "与subsidize共同构成谓语", "提问政府是否应提供经济支持。"),
    segment("the state ", "subject", "政治机构名词", "主语", "subsidize的施事", "state指国家或政府，不是某种状态。"),
    segment("subsidize them?", "predicate", "动词加代词宾语", "谓宾部分", "them指报纸", "subsidize为资金补助，不等于政府接管全部报社。"),
  ], "Should the state subsidize them?", "国家应该补贴它们吗？", "政府要不要为报业提供补贴？", "另一种救济设想；不能从问题推出补贴申请已失败。", []),
  sentence(8, [
    segment("It ", "subject", "单数代词", "主语", "回指Federal Trade Commission", "委员会是此前会谈的组织方，非复数报纸。"),
    segment("will hold ", "predicate", "将来时动词", "谓语", "说明委员会下一步行动", "hold a meeting为举行会议。"),
    segment("another meeting soon.", "object", "另一场会议加时间副词", "宾语及时间状语", "another承接之前talks", "soon修饰hold，说明不久会召开。"),
  ], "It will hold another meeting.", "它不久将再召开一次会议。", "委员会很快还会召开另一场会议。", "交代讨论仍在继续，为下句讨论已经过时作对照。", []),
  sentence(9, [
    segment("But the discussions ", "subject", "转折词加复数名词", "主语及衔接", "seem的主语", "But将视角从一年前危机转向当下现实。"),
    segment("now seem ", "predicate", "时间副词加系动词", "谓语", "说明当前观感", "now与A year ago形成时间对比。"),
    segment("out of date.", "object", "固定介词短语", "表语", "评价discussions", "out of date表示不合当前情况，不是日期印错。"),
  ], "the discussions seem out of date.", "但这些讨论现在似乎已经过时。", "然而，如今再作这些讨论，似乎已经不合时宜。", "核心转折：后文说明报业并未如预言般消亡。", ["out of date"]),
  sentence(10, [
    segment("In much of the world ", "modifier", "地点范围介词短语", "范围状语", "限定存在句", "much of表世界上很大一部分地区，非全世界。"),
    segment("there is ", "predicate", "there存在句结构", "存在谓语", "引出实义主语", "there不指具体那里；is按后面sign单数一致。"),
    segment("little sign of crisis.", "subject", "否定量词加名词短语", "存在句实义主语", "说明几乎不存在什么", "little为几乎没有，of crisis限定sign内容。"),
  ], "there is little sign of crisis.", "在世界很大一部分地区，几乎没有危机的迹象。", "世界许多地区的报业几乎看不到危机迹象。", "先用全球视野纠正美国式悲观，但不说没有任何危机。", ["little sign of crisis"]),
  sentence(11, [
    segment("German and Brazilian papers ", "subject", "国别形容词加复数名词", "主语", "have shrugged off的施事", "papers指报纸，不是学术论文。"),
    segment("have shrugged off ", "predicate", "现在完成时短语动词", "谓语", "说明已摆脱影响", "shrug off借耸肩甩开之意，强调未被衰退压垮。"),
    segment("the recession.", "object", "特指经济名词", "宾语", "shrugged off的对象", "回指经济衰退冲击。"),
  ], "German and Brazilian papers have shrugged off the recession.", "德国和巴西的报纸已经甩开了经济衰退。", "德国和巴西的报纸已经摆脱了经济衰退的冲击。", "以两个国家给出复苏例证。", ["shrugged off the recession"]),
  sentence(12, [
    segment("Even American newspapers, ", "subject", "强调副词加名词短语", "主语", "have survived/returned的主体", "Even强调连受创最重地区的报纸也如此。"),
    segment("which inhabit the most troubled corner of the global industry, ", "modifier", "which非限制性定语从句", "补充定语", "说明American newspapers的处境", "which作主语，inhabit为身处，corner比喻全球行业的一部分。"),
    segment("have not only survived but often returned ", "predicate", "完成时并列谓语", "主句谓语", "描述存活及恢复盈利", "not only...but...并列survived与returned，共用have，often不能漏译。"),
    segment("to profit.", "modifier", "to介词短语", "状态去向补足", "承接returned", "回到盈利状态，不是利润返还给某人。"),
  ], "American newspapers have not only survived but often returned to profit.", "即便处在全球报业最困难角落的美国报纸，也不只存活了下来，而且不少重新盈利。", "就连处境最艰难的美国报纸也挺了过来，其中不少甚至恢复了盈利。", "承认美国困境仍重，但否定全行业必然灭亡的断言。", ["not only survived but often returned to profit"], [clause("which inhabit the most troubled corner of the global industry", "非限制性定语从句", "which", "补充美国报纸在全球行业中的处境", "which", "inhabit", "the most troubled corner of the global industry", "先识别美国报纸，再插入处境最困难的说明。")]),
  sentence(13, [
    segment("Not the 20% profit margins ", "object", "省略主系结构的否定名词项", "对比前项", "限定恢复盈利的水平", "相当于承接前句补充说并非昔日高利润率，不补写原文未有主谓。"),
    segment("that were routine a few years ago, ", "modifier", "that定语从句", "后置定语", "限定20% profit margins", "that作主语，were routine为系表，ago定位几年前。"),
    segment("but profit all the same.", "object", "but并列名词项及让步短语", "对比后项", "强调仍然有利润", "all the same在这里是尽管如此仍然，不是利润数额相同。"),
  ], "Not the 20% profit margins, but profit all the same.", "不是几年前很常见的20%的利润率，但终究仍然是利润。", "利润率虽不再像几年前那样通常达到20%，但毕竟还是盈利了。", "限制乐观程度：有利润不等于恢复昔日高盈利。", ["profit margins", "all the same"], [clause("that were routine a few years ago", "限制性定语从句", "that", "限定profit margins的历史常态", "that", "were", "routine（表语）；a few years ago（时间）", "把几年前常见的移到20%利润率前理解。")]),
  sentence(14, [
    segment("It ", "subject", "回指代词", "主语", "回指报业生存复苏过程", "不是形式主语，后面没有真正主语从句。"),
    segment("has not been ", "predicate", "否定现在完成时系动词", "谓语", "评价此前经历", "否定轻松愉快，不否定已恢复利润。"),
    segment("much fun.", "object", "量词加不可数名词", "表语", "说明过程并不愉快", "用轻描淡写语气引出裁员代价。"),
  ], "It has not been much fun.", "这个过程没有多少乐趣。", "不过，报业这一路走得并不轻松。", "由经营复苏转向实现复苏所付出的代价。", []),
  sentence(15, [
    segment("Many papers ", "subject", "数量词加复数名词", "主语", "stayed的主语", "papers继续指报纸经营机构。"),
    segment("stayed afloat ", "predicate", "系动词加状态形容词", "谓语与表语", "说明报纸得以生存", "afloat借船漂浮比喻企业免于破产。"),
    segment("by pushing journalists overboard.", "modifier", "by加动名词与方向补足", "手段状语", "修饰stayed afloat", "把记者推下船比喻裁员；journalists为pushing宾语，overboard表被推出的方向。"),
  ], "Many papers stayed afloat.", "许多报纸靠把记者推下船而保持漂浮。", "许多报纸靠裁掉记者才勉强维持经营。", "船的比喻连写企业存活与员工牺牲，不能理解成真实溺水。", ["stayed afloat", "pushing journalists overboard"]),
  sentence(16, [
    segment("The American Society of News Editors ", "subject", "机构专名", "主语", "reckons的施事", "美国新闻编辑人协会是估计数据的来源。"),
    segment("reckons ", "predicate", "一般现在时动词", "谓语", "引出机构估计", "reckon此处估计而非确切审计结论。"),
    segment("that 13,500 newsroom jobs have gone since 2007.", "object", "that内容从句", "宾语从句", "作reckons宾语", "jobs作主语，have gone为完成时，since 2007给出累计起点。"),
  ], "The American Society of News Editors reckons that 13,500 newsroom jobs have gone.", "美国新闻编辑人协会估计，自2007年以来已有13,500个新闻编辑部职位消失。", "据美国新闻编辑人协会估计，自2007年起，新闻编辑部已有13,500个岗位被裁撤。", "量化裁员代价；是岗位数，不是裁撤报社数量。", ["newsroom jobs have gone"], [clause("that 13,500 newsroom jobs have gone since 2007", "宾语从句", "that", "作reckons宾语", "13,500 newsroom jobs", "have gone", "since 2007（起点时间状语）", "先译2007年以来，再译累计岗位减少。")]),
  sentence(17, [
    segment("Readers ", "subject", "复数名词", "主语", "are paying的施事", "转向读者承担的成本。"),
    segment("are paying more ", "predicate", "现在进行时加数量比较", "谓语及金额宾语", "说明读者支出增长", "more省略money，非更多的人付费。"),
    segment("for slimmer products.", "modifier", "for加比较级名词短语", "购买对象补足", "说明pay的交换对象", "slimmer比喻篇幅更少、报纸更薄，非健康身材。"),
  ], "Readers are paying more for slimmer products.", "读者为更薄的产品支付更多。", "报纸变薄了，读者却要付更多的钱。", "指出提价与内容收缩并存，反映节流增收策略。", ["paying more for slimmer products"]),
  sentence(18, [
    segment("Some papers ", "subject", "不定量词加复数名词", "主语", "had的主语", "Some说明部分报纸，不是整个行业一致行为。"),
    segment("even had the nerve ", "predicate", "强调副词加习语核心", "谓宾", "说明行动大胆甚至冒犯读者", "have the nerve带竟然敢的评价色彩。"),
    segment("to refuse delivery to distant suburbs.", "modifier", "不定式加名词和去向短语", "对nerve的行为说明", "说明敢做什么", "第一个to为不定式，第二个to引配送目的地；delivery为名词。"),
  ], "Some papers had the nerve to refuse delivery.", "有些报纸甚至敢拒绝向遥远郊区送报。", "有些报纸甚至不再向偏远郊区配送。", "27题节流措施定位，不能臆造读者投诉等原因。", ["had the nerve to refuse delivery"]),
  sentence(19, [
    segment("Yet these desperate measures ", "subject", "转折词加指示名词短语", "第一分句主语", "have proved的主语", "measures回指裁员、提价及削减配送等措施。"),
    segment("have proved the right ones ", "predicate", "完成时系动词加代词表语", "第一分句谓语", "评价措施效果", "prove在此证明是；ones替代measures，非具体某个人。"),
    segment("and, sadly for many journalists, ", "connector", "并列词加评价插入语", "连接及说话者评价", "限定后一句对记者的影响", "sadly承认记者付出的代价，不是说财务措施无效。"),
    segment("they can be pushed further.", "predicate", "代词主语加情态被动及程度副词", "第二分句主谓", "they回指measures", "push further指进一步推进措施，不是把记者再次推下船。"),
  ], "these desperate measures have proved the right ones and they can be pushed further.", "然而这些迫不得已的措施已被证明是正确的，而且，令许多记者难过的是，还可以推行得更远。", "然而，这些不得已的办法确实奏效了；遗憾的是，对许多记者而言，进一步的紧缩仍可能继续。", "兼顾企业效果与员工代价，排除过度乐观或绝望的标题。", ["have proved the right ones", "be pushed further"]),
  sentence(20, [
    segment("Newspapers ", "subject", "复数名词", "主语", "are becoming的主语", "从生存措施进入收入结构解释。"),
    segment("are becoming more balanced businesses, ", "predicate", "进行时系动词加名词表语", "主句谓语", "说明经营结构改变", "balanced是收入来源更均衡，不是报道立场中立。"),
    segment("with a healthier mix of revenues from readers and advertisers.", "modifier", "with加名词短语", "伴随状语", "解释balanced的具体内容", "mix为组合，of revenues为构成，from引读者与广告主两个来源。"),
  ], "Newspapers are becoming more balanced businesses.", "报纸正变成更加均衡的企业，拥有来自读者和广告主的更健康收入组合。", "报业收入结构正在改善，来自读者和广告主的收入搭配更加均衡。", "28题的比较基础，谈的是收入比例而非来源种类或编辑部人员。", ["a healthier mix of revenues"]),
  sentence(21, [
    segment("American papers ", "subject", "国别形容词加复数名词", "主语", "have been的主语", "美国报纸为比较对象，不能推广为所有国家。"),
    segment("have long been highly unusual ", "predicate", "完成时系表加时间、程度副词", "谓语", "说明长期特点", "long说明长期，highly说明明显不同寻常。"),
    segment("in their reliance on ads.", "modifier", "in加名词介词结构", "方面状语", "限定unusual体现何处", "reliance on为依赖，ads为advertisements缩写复数。"),
  ], "American papers have been unusual in their reliance on ads.", "美国报纸长期以来在对广告的依赖上极为不同寻常。", "美国报纸长期过分倚重广告收入，这在国际报业中很不寻常。", "下句87%及日本35%具体证明依赖程度的差异。", ["in their reliance on ads"]),
  sentence(22, [
    segment("Fully 87% of their revenues ", "subject", "强调副词加比例名词短语", "主语", "came的主语", "Fully表示足足，their指美国报纸，87%为收入构成比例。"),
    segment("came from advertising in 2008, ", "predicate", "来源动词短语加时间", "谓语及来源、时间状语", "说明收入来自何处", "from引来源，in 2008限定统计年份。"),
    segment("according to the Organization for Economic Cooperation & Development (OECD).", "modifier", "according to加机构专名", "信息来源状语", "限定统计依据", "保留原文&及缩写；该机构为经济合作与发展组织。"),
  ], "87% of their revenues came from advertising.", "根据经济合作与发展组织，2008年他们的收入中足足87%来自广告。", "经济合作与发展组织数据显示，2008年美国报纸的收入有高达87%来自广告。", "以高比例而非绝对金额证明美国报业广告依赖。", ["Fully 87% of their revenues"]),
  sentence(23, [
    segment("In Japan ", "modifier", "国家地点介词短语", "比较范围状语", "限定is 35%", "与前句美国数据形成地域对照。"),
    segment("the proportion ", "subject", "回指名词短语", "主语", "is的主语", "回指广告收入占全部收入的比例。"),
    segment("is 35%.", "predicate", "系动词加百分比", "谓语及表语", "说明比例大小", "不是日本拥有35%的世界报纸。"),
  ], "the proportion is 35%.", "在日本，这一比例是35%。", "日本报纸的广告收入占比则为35%。", "以相同指标比较广告依赖，不自行推算资料未给的来源类型。", []),
  sentence(24, [
    segment("Not surprisingly, ", "modifier", "否定加评价副词", "句子评价状语", "评价后续结果是否意外", "根据较低广告依赖，这种稳定并不令人惊讶。"),
    segment("Japanese newspapers ", "subject", "国别形容词加名词", "主语", "are的主语", "与American papers相比。"),
    segment("are much more stable.", "predicate", "系动词加程度修饰比较级", "谓语及表语", "说明经营稳定程度", "much加强more stable，不是把much直接放普通形容词前。"),
  ], "Japanese newspapers are more stable.", "不令人惊讶的是，日本报纸稳定得多。", "因此，日本报纸的经营稳定得多，也就不足为奇了。", "28题因果总结：广告依赖较低使其更稳，非不受读者数影响。", []),
  sentence(25, [
    segment("The whirlwind ", "subject", "比喻性名词", "第一分句主语", "harmed的主语", "whirlwind喻行业裁员重组风暴，非气象报道。"),
    segment("that swept through newsrooms ", "modifier", "that定语从句", "后置定语", "限定whirlwind", "that作主语，swept为sweep过去式，through为影响范围。"),
    segment("harmed everybody, ", "predicate", "动词加代词宾语", "第一分句谓宾", "说明行业冲击普遍性", "everybody指相关从业人员，非地球所有居民。"),
    segment("but much of the damage ", "subject", "转折词加部分量词结构", "第二分句主语", "has been concentrated的主语", "much of说明损害很大一部分的落点。"),
    segment("has been concentrated in areas ", "predicate", "现在完成时被动加范围短语", "第二分句谓语", "说明裁减集中领域", "areas在此指报道业务领域，非某些地理地区。"),
    segment("where newspapers are least distinctive.", "modifier", "where定语从句", "领域限定", "修饰areas", "where相当于in which，newspapers主语，are distinctive为系表，least表特色最弱。"),
  ], "The whirlwind harmed everybody, but much of the damage has been concentrated in areas.", "席卷新闻编辑部的旋风伤害了所有人，但很大一部分损害集中在报纸最缺乏特色的领域。", "报业重组风暴波及整个编辑部，但裁撤主要落在那些最体现不出报纸独特性的业务领域。", "29题中心：牺牲同质化内容，保住独特价值。", ["swept through newsrooms", "least distinctive"], [
    clause("that swept through newsrooms", "限制性定语从句", "that", "限定whirlwind", "that", "swept", "through newsrooms（范围状语）", "译为席卷新闻编辑部的风暴。"),
    clause("where newspapers are least distinctive", "限制性定语从句", "where", "限定报道领域areas", "newspapers", "are", "least distinctive（表语）", "译为报纸特色最弱的那些领域。"),
  ]),
  sentence(26, [
    segment("Car and film reviewers ", "subject", "并列名词定语加人员名词", "主语", "have gone的主体", "car与film修饰reviewers，指汽车和电影评论员。"),
    segment("have gone.", "predicate", "现在完成时不及物动词", "谓语", "说明人员已被裁减", "go语境为职位不再保留，不按旅游去了哪里理解。"),
  ], "Car and film reviewers have gone.", "汽车和电影评论员已经离开。", "汽车和电影评论员的岗位被裁掉了。", "举例哪些差异化不足的内容生产岗位遭到削减。", []),
  sentence(27, [
    segment("So ", "connector", "肯定承接副词", "相同情况标记", "承接have gone", "So+助动词+主语表示另一群体也一样。"),
    segment("have ", "predicate", "前置完成时助动词", "倒装谓语", "承接并省略gone", "使用have因为前句为现在完成时，非拥有的实义动词。"),
    segment("science and general business reporters.", "subject", "并列业务定语加人员名词", "倒装主语", "have的主语", "指科学记者和一般商业报道记者；共同省略gone。"),
  ], "So have science and general business reporters.", "科学和一般商业报道的记者也一样。", "科学记者和普通商业记者也遭到了裁减。", "用倒装避免重复have gone，并延续裁员范围。", ["So have science and general business reporters"], [clause("So have science and general business reporters", "省略谓语实义部分的倒装承接分句", "So", "与前句表达相同结果", "science and general business reporters", "have（省略gone）", "无宾语", "还原为这些记者也已经离开岗位；主干展示仍保留原文词序。")]),
  sentence(28, [
    segment("Foreign bureaus ", "subject", "形容词加机构名词", "主语", "have been cut off的受事", "指报社驻外新闻机构，而非外国政府部门。"),
    segment("have been savagely cut off.", "predicate", "完成时被动加程度副词", "谓语", "说明机构裁撤", "savagely强调削减猛烈，cut off整体为裁撤，不是切断身体。"),
  ], "Foreign bureaus have been cut off.", "驻外机构遭到了猛烈裁撤。", "驻外新闻机构也被大幅裁撤。", "补充昂贵的驻外采编资源削减，不代表作者主张其最重要。", ["have been savagely cut off"]),
  sentence(29, [
    segment("Newspapers ", "subject", "复数名词", "主语", "are的主语", "由岗位削减转向产品结果。"),
    segment("are less complete ", "predicate", "系动词加比较级形容词", "谓语及表语", "说明报道覆盖缩减", "complete指内容覆盖全面程度，非印刷是否缺页。"),
    segment("as a result.", "modifier", "固定结果短语", "结果状语", "承接前述裁员裁撤", "短语本身不带宾语，与as a result of不同。"),
  ], "Newspapers are less complete.", "报纸因此不那么全面了。", "结果，报纸的内容不如从前全面。", "承认削减导致覆盖不足，为末句价值判断作准备。", ["as a result"]),
  sentence(30, [
    segment("But completeness ", "subject", "转折词加抽象名词", "主语", "is的主语", "把前句complete性质名词化，仍属独立词条。"),
    segment("is no longer ", "predicate", "系动词加时间否定", "谓语", "说明优势的变化", "no longer否定如今仍是，不否认过去全面性的价值。"),
    segment("a virtue ", "object", "可数评价名词", "表语", "评价completeness", "virtue此处为优点、长处，不是品德是否高尚。"),
    segment("in the newspaper business.", "modifier", "in加行业名词短语", "适用领域状语", "限定判断范围", "business指报业，不是某一笔交易。"),
  ], "completeness is no longer a virtue.", "但全面性在报业中不再是一项优点。", "不过，对如今的报业而言，面面俱到已经不再是优势。", "主题落点是保留特色而非追求全面，并未说全面性就是失败唯一原因。", ["no longer a virtue"]),
];

function question(number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question {
  return { id: 201100 + number, number, sentenceId: `2011-p2-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: (["A", "B", "C", "D"] as const)[index], text })), answer, locating, explanations };
}
export const passage2011P2Questions: Question[] = [
  question(26, 4, 'By saying "Newspapers like … their own doom" (Lines3-4, Para. 1), the author indicates that newspapers____.', ["neglected the sign of crisis", "failed to get state subsidies", "were not charitable corporations", "were in a desperate situation"], "D", "第一段回忆一年前危机：报纸已在记述自身doom，衰退还可能夺走剩余广告和读者。", { A: "正在报道自身厄运，说明察觉危机而非忽视迹象。", B: "政府是否应补贴仍是讨论问题，未说申请补贴失败。", C: "慈善组织是救济设想，不是这句话直接表达的重点。", D: "自述衰亡体现当时困境深重、前景悲观，与desperate situation对应。" }),
  question(27, 18, "Some newspapers refused delivery to distant suburbs probably because____.", ["readers threatened to pay less", "newspapers wanted to reduce costs", "journalists reported little about these areas", "subscribers complained about slimmer products"], "B", "第三段并列裁员、提价、缩减配送等求生措施，偏远配送成本高，缩减配送属于节流。", { A: "原文实际说读者正在付更多的钱，没说威胁少付。", B: "与段内削减成本、维持经营的措施逻辑一致，解释配送范围收缩。", C: "没有说减少报道这些地理区域导致拒送。", D: "slimmer products确实出现，但没有订户投诉导致拒送的因果。" }),
  question(28, 23, "Compared with their American counterparts, Japanese newspapers are much more stable because they____.", ["have more sources of revenue", "have more balanced newsrooms", "are less dependent on advertising", "are less affected by readership"], "C", "第四段美国广告占收入87%，日本35%，随后指出日本更稳。", { A: "文章比较现有读者与广告收入的比例，未说日本收入来源种类更多。", B: "balanced修饰businesses的收入结构，不是编辑部人员或报道配比。", C: "广告收入占比较低，依赖程度更低，与比例数据和结论直接相连。", D: "读者收入仍是收入一部分，原文没有说日本不易受读者数量影响。" }),
  question(29, 25, "What can be inferred from the last paragraph about the current newspaper business?", ["Distinctiveness is an essential feature of newspapers.", "Completeness is to blame for the failure of newspaper.", "Foreign bureaus play a crucial role in the newspaper business.", "Readers have lost their interest in car and film reviews."], "A", "末段削减集中在least distinctive领域，结尾又说completeness不再是优势，重心转向独特价值。", { A: "从裁减同质化领域、放弃全面覆盖可推出独特性至关重要。", B: "不再是优势不等于应为报纸失败承担因果责任，原文也未说全部失败。", C: "驻外机构被大幅裁撤是例子，不能据此推出其在当前策略中最关键。", D: "评论岗位被裁不等于读者不再感兴趣，文中强调特色不足而非兴趣消失。" }),
  question(30, 19, "The most appropriate title for this text would be____.", ["American Newspapers: Struggling for Survival", "American Newspapers: Gone with the Wind", "American Newspapers: A Thriving Business", "American Newspapers: A Hopeless Story"], "A", "全文由濒临消亡的预测，转向存活、低水平盈利、裁员紧缩、改善收入结构与突出特色的求生过程。", { A: "概括危机下艰难求生，兼顾有所恢复与付出代价。", B: "Gone with the Wind暗示消失，忽视存活和重新盈利。", C: "Thriving夸大繁荣，忽视利润率下降、裁员和内容收缩。", D: "Hopeless否认转机，与已恢复盈利及策略奏效相反。" }),
];
