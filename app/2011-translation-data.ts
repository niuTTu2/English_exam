import type { SentenceAnalysis, TranslationTask } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2011-translation");
export const translation2011Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Who would have thought ", "predicate", "疑问代词与情态完成式", "反问主干", "Who为thought主语", "反问表示出乎意料，不是在索取某个思考者姓名。"),
    segment("that, globally, the IT industry produces ", "predicate", "宾语从句与范围副词", "所想到命题的主谓", "IT industry为信息技术行业", "globally限定统计为全球，不是仅Google某家企业。"),
    segment("about the same volume of greenhouse gases ", "object", "数量名词短语", "produces的宾语", "about修饰same程度为大致相等", "volume在此为排放总量，不能误译成音量或卷册。"),
    segment("as the world's airlines do ", "modifier", "同等比较从句", "说明排放量比较对象", "do代替produce greenhouse gases", "airlines为航空公司整体，而非某一次航班。"),
    segment("– roughly 2 percent of all CO2 emissions?", "modifier", "破折号数量补充", "说明所比排放量的规模", "约占全部二氧化碳排放2%", "保留原文时代的数字和约数；不是两个行业各占排放总量一半。"),
  ], "Who would have thought that the IT industry produces the same volume of greenhouse gases as the world's airlines do?", "谁会想到，全球范围内，信息技术行业产生的温室气体量与世界各航空公司产生的量大致相同——约占所有二氧化碳排放的2%？", "谁能想到，全球信息技术业的温室气体排放量，竟与全球航空业大致相当，约占二氧化碳总排放量的2%？", "用意外的行业排放比较引入日常数字活动的环境代价。", ["the same volume of greenhouse gases as the world's airlines do", "roughly 2 percent of all CO2 emissions"], [
    clause("that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do", "宾语从句", "that", "作thought宾语", "the IT industry", "produces", "about the same volume of greenhouse gases", "先译谁能想到，再译信息技术业排放与航空业的比较。"),
    clause("as the world's airlines do", "比较从句", "as", "与the same volume配合", "the world's airlines", "do（代替produce）", "省略greenhouse gases", "译为与航空业排放量一样，do不能直接译成做。"),
  ]),
  sentence(2, [
    segment("Many everyday tasks ", "subject", "数量词与名词短语", "主语", "take的主体", "everyday形容日常的，区别every day每天的副词短语。"),
    segment("take a surprising toll on the environment.", "predicate", "动词习语与受影响对象", "谓语", "take a toll on表示造成损害或负担", "surprising修饰损害程度令人意外，不把toll当作收费站。"),
  ], "Many everyday tasks take a toll on the environment.", "许多日常任务给环境带来了令人惊讶的损害。", "许多日常活动对环境造成的负担，超乎人们的想象。", "由行业宏观比较转向日常操作的代价，为搜索例子铺垫。", ["take a surprising toll on the environment"]),
  sentence(3, [
    segment("A Google search can leak ", "predicate", "名词主语与情态动词", "主句主谓", "Google search为一次搜索行为", "can表示可能产生的排放，leak借指排放。"),
    segment("between 0.2 and 7.0 grams of CO2, ", "object", "范围数量结构", "leak的宾语", "0.2至7.0克二氧化碳", "单位是克，不是千克；between A and B两端完整保留。"),
    segment('depending on how many attempts are needed to get the "right" answer.', "modifier", "现在分词短语内嵌疑问从句", "条件依赖状语", "说明区间变化取决于尝试次数", "how many attempts为被动从句主语，to get为目的。"),
  ], "A Google search can leak between 0.2 and 7.0 grams of CO2.", "一次谷歌搜索可能排放0.2至7.0克二氧化碳，具体取决于需要尝试多少次才能得到‘正确’答案。", "一次谷歌搜索可能带来0.2至7.0克二氧化碳排放，具体多少，取决于为找到‘正确’答案要尝试几次。", "用排放区间和尝试次数说明差异，数字属于原文而非实时测量。", ['depending on how many attempts are needed to get the "right" answer'], [
    clause('how many attempts are needed to get the "right" answer', "介词宾语从句", "how many", "作depending on的宾语", "how many attempts", "are needed", 'to get the "right" answer为目的', "按需要尝试多少次才能找到答案来译，how many整体限定attempts。"),
  ]),
  sentence(4, [
    segment("To deliver results to its users quickly, then, ", "modifier", "目的不定式与推论副词", "目的状语和衔接", "说明维持设施的目的", "then在此为因此、那么，不是随后时间；quickly修饰deliver。"),
    segment("Google has to maintain ", "predicate", "主语与义务情态结构", "主句主谓", "has to整体表示必须", "不是完成时助动词have+过去分词。"),
    segment("vast data centres around the world, ", "object", "名词宾语与地点范围", "maintain的对象", "为全球多处庞大数据中心", "around the world限定设施分布，不是绕地球转动。"),
    segment("packed with powerful computers.", "modifier", "过去分词后置定语", "修饰data centres", "中心内装满高性能计算机", "packed为状态被动，非另一个主句谓语。"),
  ], "Google has to maintain vast data centres.", "因此，为了迅速把结果传递给用户，谷歌必须在全球维持庞大的数据中心，里面装满强大的计算机。", "为了迅速向用户返回搜索结果，谷歌必须在世界各地维护庞大的数据中心，部署大量高性能计算机。", "从搜索需求解释大规模基础设施及其能源负担。", ["deliver results to its users", "packed with powerful computers"]),
  sentence(5, [
    segment("While producing large quantities of CO2, ", "modifier", "while引省略主语的分词结构", "同时发生的时间伴随状语", "逻辑主语为these computers", "完整理解为while these computers are producing，不是转折尽管。"),
    segment("these computers emit a great deal of heat, ", "predicate", "主谓宾", "第一主句", "计算机同时排放与发热", "heat是不可数名词，a great deal of表大量。"),
    segment("so the centres need to be well air-conditioned, ", "predicate", "结果连词与被动不定式", "结果分句", "数据中心因此需要充分空调冷却", "need to be说明需求，air-conditioned为复合过去分词。"),
    segment("which uses even more energy.", "modifier", "非限制性定语从句", "补充空调冷却的进一步代价", "which回指空调降温这一做法", "uses单数与整体做法呼应，不以centres复数为主语。"),
  ], "these computers emit a great deal of heat, so the centres need to be well air-conditioned.", "这些计算机在产生大量二氧化碳的同时，还释放很多热量，所以数据中心需要充分使用空调，这又消耗更多能源。", "这些计算机在产生大量二氧化碳的同时，也散发大量热量，因此数据中心必须充分制冷，而制冷又会消耗更多能源。", "串起计算机排放、发热、制冷、额外耗能的因果链，不把which指向二氧化碳。", ["large quantities of CO2", "a great deal of heat", "well air-conditioned"], [
    clause("While producing large quantities of CO2", "省略主语和be的时间状语从句", "While", "补充emit同时发生的动作", "省略these computers", "省略are，保留producing", "large quantities of CO2", "译为这些计算机在产生二氧化碳的同时，再接发热主句。"),
    clause("which uses even more energy", "非限制性定语从句", "which", "补充前述空调制冷做法的结果", "which（为中心制冷这一做法）", "uses", "even more energy", "译为而这样又耗费更多能源，保留递进even。"),
  ]),
  sentence(6, [
    segment("However, Google and other big tech providers ", "subject", "转折副词与并列名词主语", "主语及逻辑连接", "monitor与make的共同主体", "However转向企业采取的改进行动，不是否认前文排放。"),
    segment("monitor their efficiency closely ", "predicate", "动词宾语与方式副词", "并列谓语第一项", "closely修饰monitor的严密程度", "efficiency为运作/能效表现，不单纯指搜索速度。"),
    segment("and make improvements.", "predicate", "并列动宾", "并列谓语第二项", "与monitor共用主语", "改进是持续行动，不表示已经消除所有排放。"),
  ], "Google and other big tech providers monitor their efficiency and make improvements.", "不过，谷歌及其他大型技术服务商密切监测自身效率并作改进。", "不过，谷歌和其他大型技术服务商也在密切监测运行效率，不断加以改进。", "平衡前文环境负担与已有改进努力，为最后人人参与铺垫。", ["monitor their efficiency closely", "make improvements"]),
  sentence(7, [
    segment("Monitoring is the first step on the road to reduction, ", "predicate", "动名词主语与系表", "第一分句", "monitoring为监测行动", "to reduction为介词宾语，road比喻减排进程。"),
    segment("but there is much more to be done, ", "predicate", "转折连词与存在句", "第二分句", "much more为待做事情", "to be done被动不定式修饰more，表示仍有大量工作。"),
    segment("and not just by big companies.", "modifier", "并列省略与部分排除", "补充工作执行者范围", "by big companies依附前面的be done", "不只是大公司，暗示其他主体也须行动，不是大公司不用行动。"),
  ], "Monitoring is the first step, but there is much more to be done.", "监测是通往减排之路的第一步，但还有更多工作需要完成，而且不只是由大公司来完成。", "监测只是迈向减排的第一步。我们还有许多工作要做，而承担这些工作的也不应只是大企业。", "从企业改进扩大到更广泛的行动责任，not just不能译成完全排除。", ["the first step on the road to reduction", "much more to be done", "not just by big companies"], [
    clause("and not just by big companies", "并列省略结构", "and", "补足被动动作的执行者范围", "省略前文much more工作", "省略is to be done", "not just by big companies（被动施事）", "译为不应仅由大企业承担，保留也需要其他人而非排除企业。"),
  ]),
];
export const translation2011Paragraphs = [translation2011Sentences.slice(0, 1), translation2011Sentences.slice(1, 5), translation2011Sentences.slice(5)];
export const translation2011Tasks: TranslationTask[] = [{
  id: 201146, number: 46, format: "passage", points: 15, sentenceId: "2011-translation-s1",
  prompt: "第46题：将以下三段英文完整译成中文，一次提交全文。本题15分；参考译文用于自行对照，不作自动评分。",
  source: translation2011Paragraphs.map(paragraph => paragraph.map(sentence => sentence.text).join(" ")).join("\n\n"),
  answer: translation2011Paragraphs.map(paragraph => paragraph.map(sentence => sentence.natural).join("")).join("\n\n"),
  locating: "依据用户原卷三段七句译写，不冒充官方评分细则。重点：首句反问和do比较省略；0.2—7.0克与2%的约数；take a toll on环境负担；While伴随与which指制冷行为；not just扩大责任范围。排放数字为历史真题原文，不用当前资料改写。",
  paragraphs: translation2011Paragraphs,
}];
