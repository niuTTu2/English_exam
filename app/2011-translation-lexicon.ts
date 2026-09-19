import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";
const rows: LexiconRow[] = [
  ["think", "thinks thought thinking", "v.", "想到；预料", "thought在would have thought中是过去分词，后接that内容从句；不能沿用名词thought思想的词位。", "would have thought（本来会想到）", "expect偏预期某结果；本句think用反问表达出乎意料，不是名词思想。"],
  ["user", "users", "n.", "用户；使用者", "its users指使用谷歌搜索服务的人，to引结果接收方。", "deliver results to users（向用户返回结果）", "user为使用服务者，不必同时是付费客户customer。"],
  ["correct", "", "adj.", "正确的", "可在第3句替换right修饰answer，强调答案符合事实或要求。", "a correct answer（正确答案）", "correct偏客观无误，right也可强调恰当合需要。"],
  ["globally", "", "adv.", "在全球范围内", "限定IT行业与航空业排放比较的统计范围。", "globally comparable（全球范围内可比较的）", "global为形容词，globally副词独立词位。"],
  ["it", "", "abbreviation", "信息技术（IT）", "大写IT修饰industry，是information technology缩写而非代词它。", "the IT industry（信息技术行业）", "同形小写it常为代词；本句明确为行业缩写。"],
  ["produce", "produces produced producing", "v.", "产生；排放", "industry produces gases，computers producing CO2均指运行带来的排放。", "produce greenhouse gases（产生温室气体）", "本篇不是制作商品的狭义生产，也不是农产品名词。"],
  ["volume", "volumes", "n.", "总量；数量", "same volume of gases比较气体排放量。", "the volume of emissions（排放总量）", "其他义体积、音量、书卷；此处不是已收录旧篇的卷册。"],
  ["greenhouse", "greenhouses", "n. used attributively", "温室（温室气体的组成）", "greenhouse gases整体表示温室气体。", "greenhouse gases（温室气体）", "字面为温室，本文不是从某座玻璃房漏出的气体。"],
  ["gas", "gases", "n.", "气体", "greenhouse gases为一类气体，CO2为所给排放计量。", "greenhouse gases（温室气体）", "gas也可指天然气、美式汽油；此处复数为气体类别。"],
  ["airline", "airlines", "n.", "航空公司", "world's airlines合起来与IT业比较排放。", "the world's airlines（全球航空公司）", "airline公司与aircraft飞机不合并成同义词位。"],
  ["do", "does did done doing", "v. / auxiliary substitute", "做；代替重复谓语", "第1句do代替produce gases；第7句done为完成工作。", "work to be done（待完成的工作）", "do—did—done不规则；比较句中的do需还原动作而非译做。"],
  ["co2", "", "chemical formula", "二氧化碳", "化学式CO2整体保存，数字2不拆成独立词。", "CO2 emissions（二氧化碳排放）", "不等于所有温室气体都只有二氧化碳，按原文叙述保留。"],
  ["emission", "emissions", "n.", "排放；排放量", "all CO2 emissions为2%比例的总量分母。", "carbon emissions（碳排放）", "emission名词与emit动词分开，不能并入同一原形。"],
  ["task", "tasks", "n.", "活动；任务", "everyday tasks指搜索等日常数字操作。", "everyday tasks（日常任务）", "不只指考试习题exercise。"],
  ["surprising", "", "adj.", "令人意外的", "修饰toll，损害超出通常预期。", "a surprising cost（令人意外的代价）", "surprised用于感到惊讶的人，surprising用于引发惊讶的事。"],
  ["toll", "tolls", "n.", "损害；代价", "take a toll on表示给环境造成负担或伤害。", "take a toll on something（损害某物）", "另可指通行费、伤亡人数、钟声，本篇非收费。"],
  ["environment", "environments", "n.", "环境；自然环境", "受到日常活动排放带来的负担。", "protect the environment（保护环境）", "也可指工作学习环境，本句为生态环境。"],
  ["search", "searches", "n.", "搜索", "A Google search指一次谷歌搜索行为。", "a Google search（一次谷歌搜索）", "search for为动词寻找，本文此处为单次动作名词。"],
  ["leak", "leaks leaked leaking", "v.", "排放；泄漏", "搜索活动can leak CO2用泄漏比喻间接排放。", "leak carbon dioxide（泄出二氧化碳）", "也可指泄露信息；此处非用户隐私泄露。"],
  ["gram", "grams", "n.", "克", "0.2到7.0克为一次搜索可能排放区间。", "grams of CO2（以克计的二氧化碳）", "不能误换成千克或毫克。"],
  ["depend", "depends depended depending", "v.", "取决于", "depending on说明排放多少由找到答案所需次数决定。", "depend on attempts（取决于尝试次数）", "不能漏介词on；此处非依赖他人支持。"],
  ["attempt", "attempts", "n.", "尝试次数", "how many attempts作are needed主语。", "several attempts（几次尝试）", "不等于一次搜索结果的数量。"],
  ["get", "gets got getting gotten", "v.", "获得；找到", "get the right answer为搜索的目标。", "get an answer（得到答案）", "不是旧语境get over克服；get含义随后接成分确定。"],
  ["right", "", "adj.", "正确的；符合需要的", "right answer带引号，指用户期望找到的答案。", "the right answer（正确答案）", "名词权利、方位右侧不是本句义。"],
  ["deliver", "delivers delivered delivering", "v.", "提供；传递", "deliver results to users为快速返回搜索结果。", "deliver results to users（向用户返回结果）", "不是送实体包裹，也不是分娩义。"],
  ["maintain", "maintains maintained maintaining", "v.", "维护；维持运行", "Google为快速响应需维护全球数据中心。", "maintain data centres（维护数据中心）", "还可表示坚持某主张；本篇不是maintain that认为。"],
  ["data", "", "n.", "数据", "data centres为计算服务设施的名称。", "data centres（数据中心）", "传统为datum复数，现代也作集合，不当作date日期的复数。"],
  ["centre", "centres", "n.", "中心", "本篇为装有大量服务器的数据中心，保留英式拼写。", "a data centre（数据中心）", "不是Text2的权威组织等其他机构义。"],
  ["pack", "packs packed packing", "v.", "装满；密集配置", "packed with为分词定语，说明数据中心设备密集。", "be packed with computers（装满计算机）", "pack也可为包裹或一群，本文状态被动。"],
  ["computer", "computers", "n.", "计算机", "数据中心内的大量高性能设备，运行发热并耗能。", "powerful computers（高性能计算机）", "不把高性能直接译成低耗能。"],
  ["quantity", "quantities", "n.", "量；数量", "large quantities of CO2说明大量排放。", "large quantities of something（大量某物）", "quantity量与quality质量别混淆；y变ies。"],
  ["emit", "emits emitted emitting", "v.", "散发；释放", "emit heat指计算机散热，同时另有CO2产生。", "emit heat（散发热量）", "过去式emitted、ing双写t；emission为派生名词。"],
  ["heat", "", "n.", "热量", "a great deal of heat为不可数名词结构。", "a great deal of heat（大量热量）", "也可动词加热，本句为emit宾语。"],
  ["air-conditioned", "", "adj. / past participle", "由空调制冷的", "need to be well air-conditioned说明需要充分散热降温。", "well air-conditioned（空调制冷充分的）", "air-conditioning为名词，不把条件condition普通义硬套进来。"],
  ["tech", "", "n. used attributively", "技术；科技", "big tech providers为大型技术服务商。", "tech providers（技术服务商）", "technology的常用缩略，不是教师teacher。"],
  ["provider", "providers", "n.", "提供商；服务商", "Google与其他企业作为提供数字服务者。", "service providers（服务提供商）", "provider与provide动词为派生关联，不并原形次数。"],
  ["monitor", "monitors monitored monitoring", "v.", "监测；持续观察", "monitor efficiency为关注运行效率，第7句Monitoring名词化为监测行动。", "monitor efficiency（监测效率）", "名词monitor可指显示器、监控设备或班长。"],
  ["efficiency", "", "n.", "效率；运行能效", "企业监测设备和服务的运行效率以作改进。", "improve efficiency（提高效率）", "efficiency投入产出效率与effectiveness达到目标的有效性区分。"],
  ["improvement", "improvements", "n.", "改进", "make improvements说明监测之后实施优化。", "make improvements（作出改进）", "改进不等于原文保证彻底消除排放。"],
  ["reduction", "reductions", "n.", "减排；减少", "语境省略emissions，road to reduction指减排进程。", "emission reduction（减排）", "不是裁员或打折语境；reduce动词独立原形。"],
];
const reviewed = reviewedLexicon(rows);
export const translation2011Lexicon = reviewed.entries;
export const translation2011LemmaAliases: Record<string, string> = { ...reviewed.aliases, data: "data", co2: "co2", surprising: "surprising", "air-conditioned": "air-conditioned" };
export const translation2011CollocationGlosses = reviewed.glosses;
export const translation2011FormPartOfSpeech: Record<string, string> = { it: "abbreviation", produces: "v.", producing: "v.-ing（伴随动作）", search: "n.", depending: "v.-ing", packed: "v.-ed（分词定语）", right: "adj.", data: "n.", monitoring: "gerund", done: "v.-ed（被动分词）", "air-conditioned": "adj." };
translation2011Lexicon.volume.otherMeanings = ["体积；音量；书的一卷、一册；交易量。本文为气体排放总量。"];
translation2011Lexicon.toll.otherMeanings = ["通行费；伤亡人数，如death toll死亡人数；v. 缓慢鸣钟。"];
translation2011Lexicon.monitor.otherMeanings = ["n. 显示器；监控器；班长；v. 监测。本文为持续跟踪效率。"];
export const translation2011SentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2011-translation-s1": { who: { contextualMeaning: "谁能（反问表示出乎意料）", use: "Who would have thought不是真的询问人名。" }, do: { partOfSpeech: "auxiliary substitute", contextualMeaning: "排放温室气体（代替前述动作）", use: "do代替produce greenhouse gases，避免比较句重复。" }, as: { contextualMeaning: "与……相同", use: "the same...as构成排放量同等比较。" }, have: { partOfSpeech: "aux.", contextualMeaning: "完成式助动词", use: "would have thought为出乎预料的回顾性反问。" } },
  "2011-translation-s2": { take: { contextualMeaning: "造成损害（take a toll on）", use: "习语整体指对环境产生负面影响，不取拿或接管。" } },
  "2011-translation-s3": { right: { contextualSubstitutions: [{ label: "correct", chinese: "正确的", fit: "direct", rewrittenSentence: 'A Google search can leak between 0.2 and 7.0 grams of CO2, depending on how many attempts are needed to get the "correct" answer.', nuance: "correct较客观地强调答案正确；right还略有正合需要意味，两者在本句均指搜索者所求答案。", target: "word:correct" }] } },
  "2011-translation-s4": { then: { contextualMeaning: "因此；那么", use: "句中then承接搜索需求推导设备要求，不是下一时间点。" }, have: { contextualMeaning: "不得不；必须（has to）", use: "has to maintain为必要性结构，不是完成时。" }, its: { contextualMeaning: "谷歌的", use: "its users指谷歌用户。" } },
  "2011-translation-s5": { while: { contextualMeaning: "在……的同时", use: "While producing与emit heat同时发生，不表尽管。" }, which: { contextualMeaning: "给数据中心空调制冷这一做法", use: "回指前一分句中的制冷做法，uses单数；不是computers或CO2。" }, well: { contextualMeaning: "充分地；良好地", use: "修饰air-conditioned，说明制冷充足。" }, even: { contextualMeaning: "还要；更", use: "even more energy强调制冷带来额外耗能。" }, these: { contextualMeaning: "数据中心中的计算机", use: "回指上一句powerful computers。" } },
  "2011-translation-s6": { their: { contextualMeaning: "谷歌和其他技术服务商的", use: "their efficiency指这些公司的运行效率。" }, make: { contextualMeaning: "作出；实施", use: "make improvements为实施改进，不是使某物成为。" } },
  "2011-translation-s7": { road: { contextualMeaning: "过程；道路（比喻）", use: "road to reduction为走向减排的过程，不是实体公路。" }, more: { partOfSpeech: "pron.", contextualMeaning: "更多待做的工作", use: "much more作there is的实际主语，to be done后置限定。" }, just: { contextualMeaning: "仅仅（not just不只是）", use: "不只是大公司要做，也包括其他主体，不能译成大公司不必做。" }, do: { contextualMeaning: "完成（工作）", use: "to be done被动不定式修饰more，区别第1句比较助动词do。" } },
};
