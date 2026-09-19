import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";
import { translation2012ReviewedContexts } from "./2012-translation-contexts";
const rows: LexiconRow[] = [
  ["migration", "migrations", "n.", "人口迁移", "引出发展中国家对人才流动的担忧，是中性方向总称。", "worry about migration（担心人口迁移）", "immigration移入，emigration移出；migration本身不定方向。"],
  ["develop", "develops developed developing", "v.", "发展", "developing countries为发展中国家，developed world为发达国家群体。", "developing countries（发展中国家）", "-ing表示发展中，-ed表示已达到较高发展水平，不能对调。"],
  ["concern", "concerns concerned concerning", "v.", "使担忧", "be concerned at the prospect表示为某种前景担忧。", "be concerned at the prospect（为某种前景担忧）", "此处不是关心学术主题的concerned with。"],
  ["prospect", "prospects", "n.", "前景；可能发生的情形", "of说明所担心的人才离开情形。", "the prospect of departure（离开的前景）", "这里不保证迁移一定发生，不能抹去前景性。"],
  ["good", "better best", "adj.", "优秀的", "the best名词化指最优秀的人，与brightest并列。", "the best and brightest（最优秀聪明的人才）", "best为good最高级，不是基本形容词big的比较级。"],
  ["bright", "brighter brightest", "adj.", "聪明的；才华出众的", "brightest与best一起指人才，非照明亮度。", "the brightest people（最聪明的人）", "bright另可明亮的、鲜艳的、有希望的。"],
  ["departure", "departures", "n.", "离开；离境", "后接to指出迁移目的地；原卷前置所有格连接不规范，保留原文。", "departure to another country（前往别国）", "depart from离开某地；departure也可偏离惯例，本文不是。"],
  ["silicon", "", "proper n. / n.", "硅；硅谷名称的一部分", "Silicon Valley为人才流向的地点名称。", "Silicon Valley（硅谷）", "silicon硅与silicone硅酮不同，不按单词拆成另一地名。"],
  ["valley", "valleys", "n.", "谷；硅谷地名的一部分", "与Silicon构成完整地名。", "Silicon Valley（硅谷）", "普通义为山谷，本句应整体理解专名。"],
  ["hospital", "hospitals", "n.", "医院", "首段为发达国家医院，末句为人才本国医院，需看所属语境。", "work in hospitals（在医院工作）", "不是hospitality好客或hotel旅馆。"],
  ["university", "universities", "n.", "大学", "作为人才流向的教育机构及本国可能贡献的场所。", "teach at a university（在大学任教）", "复数y变ies，college也可学院，并非所有语境完全等同。"],
  ["attract", "attracts attracted attracting", "v.", "吸引；招揽", "接收国使用移民规则招揽高学历人才。", "attract skilled workers（吸引专业人才）", "这里不特指外貌吸引。"],
  ["immigration", "", "n.", "移民入境；移入", "immigration rules从英国等接收国视角命名政策。", "immigration rules（移民入境规定）", "emigration从输出国看移出，两者可能描述同一迁移的不同视角。"],
  ["rule", "rules", "n.", "规定；政策规则", "immigration rules为招揽大学毕业生的制度安排。", "immigration rules（移民规定）", "本篇为名词，不是法院裁定rule动词。"],
  ["privilege", "privileges privileged privileging", "v.", "优待；给予优先待遇", "关系从句谓语，宾语college graduates。", "privilege college graduates（优待大学毕业生）", "名词privilege为特权或荣幸；此处不能遗漏动词关系。"],
  ["graduate", "graduates", "n.", "毕业生", "college graduates指大学毕业生，为优惠移民对象。", "college graduates（大学毕业生）", "graduate作动词可表示毕业；本句是复数名词。"],
  ["canada", "", "proper n.", "加拿大", "与英国澳大利亚并列，举例接收国。", "Britain, Canada and Australia（英国、加拿大和澳大利亚）", "加拿大专名不推断所有国家政策完全一致。"],
  ["australia", "", "proper n.", "澳大利亚", "作为吸引大学毕业生的接收国例子。", "immigration to Australia（移民澳大利亚）", "Australia澳大利亚与Austria奥地利不同。"],
  ["well-educated", "", "adj.", "受过良好教育的", "修饰people，限定研究中更易外流的群体。", "well-educated people（受过良好教育的人）", "well修饰educated，连字符连接前置复合形容词。"],
  ["emigrate", "emigrates emigrated emigrating", "v.", "移居国外；移出", "从发展中国家本国视角谈向外移民。", "emigrate from a country（从某国移居国外）", "immigrate into为移入；不是国内迁徙就一概emigrate。"],
  ["emigrant", "emigrants", "n.", "移居国外者", "近40%分母为已经移居国外的人群。", "Indian emigrants（印度移居国外者）", "emigrant为人，emigrate为动作，派生词分开计数。"],
  ["indian", "indians", "adj. / n.", "印度的；印度人", "Indian households为印度家庭，all Indians为全体印度人。", "Indian households（印度家庭）", "本句地理语境为印度，不指美洲原住民旧称。"],
  ["household", "households", "n.", "家庭；住户", "survey of Indian households说明调查单位。", "a survey of households（住户调查）", "不是房屋建筑本身，family更偏亲属关系。"],
  ["high-school", "", "adj.", "高中的", "修饰education；more than表示教育程度高于高中。", "a high-school education（高中教育）", "连字符作为前置定语保留，不少译more than。"],
  ["education", "", "n.", "教育；受教育程度", "had more than...谈所受教育水平，不是拥有一所学校。", "a high-school education（高中教育）", "education通常不可数，此处a...education表示一种程度或经历。"],
  ["nearly", "", "adv.", "将近；近乎", "nearly 40%接近但未达40%，保留约量限定。", "nearly forty percent（近百分之四十）", "不改写为准确40%或超过40%。"],
  ["around", "", "adv. / prep.", "大约", "around 3.3%为约量数字，不是环绕位置。", "around three percent（约百分之三）", "数值前通常为大约，不把around译成周围。"],
  ["brain", "brains", "n.", "头脑；人才", "brain drain用大脑借指知识和专业人才。", "brain drain（人才外流）", "单独可指大脑；本文不是神经系统疾病。"],
  ["drain", "drains drained draining", "n. / v.", "流失；外流", "brain drain为名词短语，表示人才资源流失。", "brain drain（人才流失）", "还可排水沟、耗尽或排走液体；语境中非管道。"],
  ["long", "longer longest", "adv.", "长期以来；长久地", "has long bothered中修饰持续时间。", "has long bothered officials（长期困扰官员）", "不是long for渴望的动词，也非形容物体长。"],
  ["bother", "bothers bothered bothering", "v.", "困扰；使烦恼", "人才外流给政策制定者带来长期困扰。", "bother policymakers（困扰政策制定者）", "trouble也可困扰，但本文不是主动骚扰他人。"],
  ["policymaker", "policymakers", "n.", "政策制定者", "They在下一句回指这些贫穷国家决策者。", "policymakers in poor countries（贫穷国家的政策制定者）", "不是一项政策本身，-maker为制定者。"],
  ["hurt", "hurts hurt hurting", "v.", "损害；伤害", "hurts economies为对经济造成不利影响。", "hurt an economy（损害经济）", "过去式和分词仍hurt，此处第三人称为hurts。"],
  ["economy", "economies", "n.", "经济；经济体", "their economies指这些贫穷国家的经济。", "hurt their economies（损害它们的经济）", "economics为经济学，不是economy复数。"],
  ["deprive", "deprives deprived depriving", "v.", "使失去；剥夺", "deprive countries of workers使国家失去人才。", "deprive somebody of something（使某人失去某物）", "of引被失去资源，不能将国家与人才调换位置。"],
  ["much-needed", "", "adj.", "急需的；非常需要的", "修饰skilled workers，说明输出国对人才的需求。", "much-needed workers（急需的人才）", "much加强needed程度，不是工人数很多这一数量判断。"],
  ["skilled", "", "adj.", "有专业技能的；熟练的", "修饰workers，后面举教学、医院和产品创新。", "skilled workers（专业人才）", "此处不限工厂体力技工，应与后面三类工作一致。"],
  ["teach", "teaches taught teaching", "v.", "教学；任教", "could have taught表示本可以在本国大学任教。", "teach at a university（在大学任教）", "过去式和分词taught；could have不同于已发生事实。"],
  ["clever", "cleverer cleverest", "adj.", "巧妙的；聪明的", "clever new products指设计巧妙的新产品。", "clever new products（巧妙的新产品）", "不是只有人能用clever修饰，物品可表示设计巧妙。"],
  ["factory", "factories", "n.", "工厂", "for their factories to make中是make逻辑主语。", "products for factories to make（供工厂生产的产品）", "products是被制造对象，factories是制造主体。"],
  ["come", "comes came come coming", "v.", "想出；来到", "come up with是想出，could have come中come为分词。", "come up with new products（想出新产品）", "不能把come up with翻成带着产品走上来。"],
  ["lot", "lots", "n.", "许多；大量", "lots of studies为数量结构，lots不单独译作地块。", "lots of studies（许多研究）", "lot也可批次、地块、抽签结果；本处为lots of。"],
  ["worker", "workers", "n.", "工作者；专业人才", "本篇包括大学教师、医务人员和创新人才，不限于体力工人。", "skilled workers（专业人才）", "按后面的工作类型理解，不把医院大学工作者排除在外。"],
  ["with", "", "prep.", "与……相比；引出所想出的内容", "compared with引比较对象；come up with引想出的产品。", "compared with another group（与另一群体相比）", "需结合前面动词短语理解，不一概译成带有或充满。"],
  ["trouble", "troubles troubled troubling", "v.", "困扰；使忧虑", "作为bother在人才流失句的可靠近义替换，主语为令人忧虑的事情。", "trouble policymakers（令政策制定者忧虑）", "动词侧重带来忧虑；名词trouble可为麻烦，不能随意作名词替换。"],
];
const reviewed = reviewedLexicon(rows);
export const translation2012Lexicon = reviewed.entries;
export const translation2012LemmaAliases = reviewed.aliases;
export const translation2012CollocationGlosses = reviewed.glosses;
export const translation2012FormPartOfSpeech: Record<string, string> = { rules: "n.", graduates: "n.", privilege: "v.", developing: "adj.（分词）", developed: "adj.（分词）", educated: "adj.（分词）", indian: "adj.", indians: "n.", skilled: "adj.", long: "adv.", using: "v.-ing", compared: "v.-ed（比较状语）", taught: "v.-ed（过去分词）", best: "adj.（名词化最高级）", brightest: "adj.（名词化最高级）", drain: "n.", concerned: "adj.（分词）", survey: "n.", fear: "v.", worry: "v." };
Object.assign(translation2012LemmaAliases, { skilled: "skilled" });
translation2012Lexicon.privilege.otherMeanings = ["n. 特权；特殊待遇；荣幸。It is a privilege to do有幸做某事。", "privileged可指享特权的；贫困议题中underprivileged指弱势的。"];
translation2012Lexicon.bright.otherMeanings = ["明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"];
translation2012Lexicon.drain.otherMeanings = ["n. 排水沟；持续的消耗，如a drain on resources资源消耗。", "v. 排干；耗尽精力或资金。drain away逐渐流失。"];
translation2012Lexicon.departure.otherMeanings = ["出发、启程；偏离惯例。a departure from tradition对传统的偏离。"];
const translation2012OriginalContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2012-translation-s1": { develop: { contextualMeaning: "发展中的；发达的", use: "developing countries是发展中国家，developed world是发达世界；同句必须按词形辨方向。" }, they: { contextualMeaning: "发展中国家的人们", use: "they承接从句people。" } },
  "2012-translation-s2": { these: { contextualMeaning: "上述最优秀的人才", use: "回指best and brightest，非医院大学。" }, like: { contextualMeaning: "例如", use: "介词引英国、加拿大、澳大利亚三国例子。", partOfSpeech: "prep." } },
  "2012-translation-s3": { particularly: { contextualMeaning: "尤其；特别", use: "修饰likely的可能程度，不意味着所有受教育者都会移民。" } },
  "2012-translation-s4": { have: { contextualMeaning: "拥有；受过", use: "had a high-school education指受教育程度，并非完成时助动词。" }, over: { contextualMeaning: "超过；以上", use: "年龄边界25，非围绕某个议题。" }, compare: { contextualMeaning: "相比", use: "compared with在句中为比较参照，引另一人群占比。" } },
  "2012-translation-s5": { bother: { contextualSubstitutions: [{ label: "troubled", chinese: "困扰", fit: "direct", rewrittenSentence: 'This "brain drain" has long troubled policymakers in poor countries.', nuance: "bother突出持续造成烦恼，trouble同样表达令人忧虑，对人才外流的担忧命题不变。", target: "word:trouble" }] }, poor: { contextualMeaning: "贫穷的", use: "poor countries为经济较贫穷的国家，非质量低劣的国家。" } },
  "2012-translation-s6": { they: { contextualMeaning: "政策制定者；贫穷国家", use: "主语They回指policymakers；宾格them在depriving them中指他们的国家，两处须依句法区分。" }, their: { contextualMeaning: "这些贫穷国家的", use: "economies、universities、hospitals、factories均属于人才流出国。" }, it: { contextualMeaning: "人才外流", use: "宾语从句it承接brain drain。" }, can: { contextualMeaning: "本来可以", use: "could have统领taught、worked和come，保留未实现的贡献。" }, make: { contextualMeaning: "制造；生产", use: "工厂制造新产品，非使某人变成。" }, work: { contextualMeaning: "工作", use: "could have worked in hospitals指本可在医院工作。" }, for: { contextualMeaning: "供……；引出不定式的逻辑主语", use: "for their factories to make修饰products，非because。" } },
};
export const translation2012SentenceContexts: Record<string, Record<string, SentenceWordContext>> = Object.fromEntries(
  Object.entries(translation2012ReviewedContexts).map(([sourceId, entries]) => [sourceId, Object.fromEntries(
    [...new Set([...Object.keys(translation2012OriginalContexts[sourceId] ?? {}), ...Object.keys(entries)])].map(headword => [headword, {
      ...translation2012OriginalContexts[sourceId]?.[headword], ...entries[headword],
    }]),
  )]),
);
