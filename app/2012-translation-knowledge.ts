import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { translation2012Lexicon, translation2012CollocationGlosses, translation2012SentenceContexts } from "./2012-translation-lexicon";
import { getTranslation2012ReviewedKnowledge } from "./2012-translation-contexts";
const rows: PhraseRow[] = [
  ["translation2012-departure-source-warning", "their best and brightest departure", "the departure of + person/group", "原卷瑕疵与规范表达对照", "语境上指本国优秀人才的离开", "原文连接不规范，不能把best and brightest硬讲成正常修饰departure，也无法断言唯一修补方式。canonical仅提供可迁移的规范表达，不是校正后的原文。", "The departure of their best and brightest worries them.", "他们最优秀、最聪明的人才的离开使他们忧虑。", "例句仅供学习，不能回填原文、主干或英文词块；原本拟用的英文形式无法由快照确定。"],
  ["silicon-valley", "Silicon Valley", "Silicon Valley", "地名整体", "硅谷", "Silicon与Valley共同构成地名，不能拆成两个目的地；句中由to引出人才去向。", "They moved to Silicon Valley.", "他们迁往硅谷。", "此处是地名，不等于所有科技人才都去同一个地点，也不要与silicone硅酮混淆。"],
  ["worry-about", "worry about migration", "worry about + noun/doing", "担忧对象结构", "担心人口迁移", "about接担忧对象，迁移在此尚未限定方向。", "They worry about losing skilled workers.", "他们担心失去专业人才。", "worry是不及物时需about，不直接加完整名词宾语。"],
  ["concerned-at-prospect", "concerned at the prospect", "be concerned at the prospect of + noun/doing", "担忧前景结构", "担心……的前景", "at引触发担忧的情况，of补充具体前景。", "They are concerned at the prospect of departure.", "他们担心人才将离开。", "本文best and brightest departure原卷连接有瑕疵，不作规范例句复用。"],
  ["developing-countries", "developing countries", "developing countries", "国家发展阶段搭配", "发展中国家", "现在分词developing作定语，描述仍在发展阶段。", "The study concerns developing countries.", "研究涉及发展中国家。", "developed countries为发达国家，不可混同。"],
  ["developed-world", "the developed world", "the developed world", "国家群体表达", "发达世界；发达国家", "world集合指一类国家，不限一个具体国家。", "Workers move to the developed world.", "人才流向发达国家。", "不是developing world发展中国家群体。"],
  ["try-to-do", "try to attract", "try to do", "尝试结构", "努力；设法做", "try to attract强调有意招揽，不保证一定成功。", "Countries try to attract graduates.", "各国设法吸引毕业生。", "try doing偏尝试某方法，不能所有语境互换。"],
  ["by-doing-method", "by using immigration rules", "by doing", "方式状语", "通过制定或使用移民规定", "by后用动名词，说明吸引人才的政策手段。", "They attract talent by offering opportunities.", "他们通过提供机会吸引人才。", "不是before doing在做之前，也非表示被动施事。"],
  ["privilege-graduates", "privilege college graduates", "privilege + beneficiary", "及物动词结构", "优待大学毕业生", "privilege直接带受优待对象，本句主语rules。", "The rules privilege skilled workers.", "这些规定优待专业人才。", "此处必须译出动词，不只写特权名词。"],
  ["lots-of", "Lots of studies", "lots of + plural/uncountable noun", "数量结构", "许多；大量", "studies复数作主语，谓语have不改为has。", "Lots of studies support the finding.", "许多研究支持该发现。", "不是一批研究的精确数量。"],
  ["be-likely-to-do", "particularly likely to emigrate", "be likely to do", "可能性结构", "尤其可能移居国外", "particularly修饰likely，to说明可能发生的行动。", "Graduates are likely to emigrate.", "毕业生很可能移居国外。", "可能不等于一定发生，不能丢掉概率。"],
  ["more-than-education", "more than a high-school education", "more than + level of education", "学历程度比较", "高于高中水平的教育", "比较受教育程度，不是上过多个高中。", "She has more than a high-school education.", "她的受教育程度超过高中。", "不能缩减为受过高中教育，也不指定一定是博士。"],
  ["compared-with", "compared with around 3.3%", "compared with + comparison", "过去分词比较", "与约3.3%相比", "比较相同学历条件在不同分母群体中的占比。", "The rate was forty percent, compared with three percent elsewhere.", "这一比例为百分之四十，而另一群体为百分之三。", "别把比较数字误当比例增加的百分点。"],
  ["over-age", "over the age 25", "over the age of + number", "年龄范围（原文连接有瑕疵）", "超过25岁", "原卷未写规范式中的of，连接不规范，来源保留原样；不能把25硬讲成正常同位语，规范结构只另供学习。", "The survey covers people over the age of twenty-five.", "调查覆盖超过25岁的人。", "over为严格高于年龄界限，不包括25岁整；规范式中的of不能静默补入原文。"],
  ["brain-drain", '"brain drain"', "brain drain", "人才迁移隐喻", "人才流失；人才外流", "brain借指技能与知识人才，drain为从原国家流失。", "Brain drain worries policymakers.", "人才外流令政策制定者担忧。", "不是脑部排水，不能逐字硬译。"],
  ["has-long-done", "has long bothered", "have/has long + past participle", "持续完成时", "长期以来一直……", "long在助动词与分词间表示持续时间已久。", "The problem has long bothered them.", "这个问题长期困扰着他们。", "has不是单独拥有，long不是形容词修饰问题。"],
  ["deprive-of", "depriving them of much-needed skilled workers", "deprive A of B", "剥夺结构", "使A失去B", "A为国家，B为所需专业人才；分词说明损害方式。", "Migration can deprive a country of skilled workers.", "移民外流可能使一国失去专业人才。", "别交换国家与人才的位置，也不把of误当所属。"],
  ["could-have-done", "could have taught", "could have + past participle", "过去可能或未实现贡献", "本来可以做", "后面三个过去分词共用could have，表示流失的贡献可能。", "They could have taught at local universities.", "他们本可在本地大学任教。", "本段不是肯定已经发生过的贡献，不译成已经教过。"],
  ["come-up-with", "come up with clever new products", "come up with + idea/solution", "创新想法习语", "想出；设计出", "产品构想为宾语，后面工厂负责制造。", "They came up with a new design.", "他们想出了一个新设计。", "不能与come across偶然遇见混用。"],
  ["for-subject-to-do", "for their factories to make", "for + subject + to do", "带逻辑主语的不定式", "供某主体去做", "factories为make逻辑主语，前置products为逻辑宾语。", "They designed products for factories to make.", "他们设计了供工厂生产的产品。", "for不引完整原因从句，不能把工厂译成产品的受赠者。"],
];
const reviewed = reviewedPhrases(rows);
export const translation2012PhraseGuides = reviewed.guides;
export const translation2012PhraseAliases = reviewed.aliases;
export const translation2012PhraseGlosses = { ...translation2012CollocationGlosses, ...reviewed.glosses };
export function getTranslation2012WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const reviewedKnowledge = getTranslation2012ReviewedKnowledge(headword, sentenceId);
  if (reviewedKnowledge) return reviewedKnowledge;
  const entry = translation2012Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? translation2012SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: translation2012CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
