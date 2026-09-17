import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2012P3Lexicon, passage2012P3CollocationGlosses, passage2012P3SentenceContexts } from "./2012-passage-3-lexicon";
const rows: PhraseRow[] = [
  ["to-ones-core", "to its core", "to one's core", "程度状语", "从根本上；深深地", "与shake搭配，强调影响触及基础，物主代词与受影响对象一致。", "The news shook the industry to its core.", "消息深深震动了整个行业。", "core是核心的比喻，不是生理器官。"],
  ["patent-for", "patents for isolated DNA", "a patent for + invention", "专利对象结构", "关于某项对象的专利", "for说明被保护的对象，不是取得专利的原因。", "The firm applied for a patent for a device.", "该公司为一种装置申请专利。", "申请、获得和持有是不同阶段，不可混译。"],
  ["for-decades", "for decades", "for + duration", "持续时间", "持续几十年", "for引时间长度，过去完成时表示在另一过去事件之前持续。", "They had worked there for decades.", "他们此前已在那里工作数十年。", "by 2005是截至时间，不是持续多久。"],
  ["trade-group", "a trade group", "a trade group", "行业组织名词", "行业团体", "trade在此为行业，group代表相关企业。", "A trade group defended its members.", "一个行业团体为其会员辩护。", "不是专门国际贸易代表团。"],
  ["assure-that", "assured members that this was just a \"preliminary step\" in a longer battle", "assure somebody that ...", "保证内容结构", "向某人保证……", "人作受事宾语，that从句作保证内容；报道保证不等于证实它必然兑现。", "They assured members that talks would continue.", "他们向会员保证谈判会继续。", "ensure一般接结果或that从句，assure常先接人。"],
  ["at-least-temporarily", "at least temporarily", "at least + adverb", "限度补充", "至少暂时如此", "至少确认短期宽慰，不许扩大成终局胜利。", "The problem was solved, at least temporarily.", "问题至少暂时解决了。", "temporarily不能漏译成永久。"],
  ["overturn-decision", "overturned the prior decision", "overturn a decision", "司法动宾搭配", "推翻先前裁决", "上诉法院改变原判，动词宾语为判决。", "The court overturned the decision.", "法院推翻了该裁决。", "不是维持判决，亦不是实体物品翻倒。"],
  ["hold-patent", "hold patents to two genes", "hold a patent to/for something", "权利持有结构", "持有某项专利", "hold表示拥有权利，two限制本案基因数量。", "The company holds a patent for the device.", "该公司持有这项装置专利。", "hold patents不等于file patents提出申请。"],
  ["alike-after-pair", "a blessing to firms and patients alike", "A and B alike", "共同适用范围", "A和B同样；A和B都", "alike后置，把企业和患者都包括在高管的受益判断中。", "The change affects firms and patients alike.", "这项变化同样影响企业和患者。", "必须保留said表明判断来源，不移作作者无条件支持。"],
  ["attempt-at", "attempts at personalised medicine", "an attempt at + noun/doing", "尝试对象搭配", "对……的尝试", "at引尝试领域，原文不是已经彻底成功的成果。", "This is an attempt at a new treatment.", "这是对一种新疗法的尝试。", "attempt to do也成立，但后续形式不同。"],
  ["product-of-nature", "a product of nature", "a product of nature", "来源名词结构", "自然产物", "在所转述论证中与人工创造相对。", "The fibre is a product of nature.", "这种纤维是自然产物。", "分离后的自然来源是文中一方论点，不当作今日所有法域法律判断。"],
  ["rather-than", "rather than reward it", "rather than + parallel element", "取舍对照", "而不是奖励它", "suppress与reward对比作用，it指innovation。", "The rule suppresses innovation rather than rewarding it.", "该规定抑制创新，而不是奖励创新。", "两个it在本句分别指基因与创新，不能全指同一对象。"],
  ["access-to", "access to genetic tests", "access to + service/resource", "可及性搭配", "获得检测的机会", "access作不可数名词，to引可获得的服务。", "Patients need access to tests.", "患者需要能够获得检测服务。", "access to不是参与某种考试的学业义。"],
  ["such-as-possessive", "such as Myriad's", "such as + possessive", "举例及名词省略", "例如某人或某机构的……", "Myriad's后省略前文tests，是检测服务举例。", "They offer services such as Myriad's.", "他们提供类似Myriad公司的服务。", "所有格后未写名词不代表残缺无义，应从前文补理解而非改原句。"],
  ["growing-number", "A growing number", "a growing number (of people)", "数量增长表达", "越来越多的人", "原文省略people，seem为复数谓语，表示人数增多。", "A growing number seem to agree.", "越来越多的人似乎认同。", "不能把省略对象具体化为原文未说的职业群体。"],
  ["related-to", "related to genetic tests", "be related to + noun", "关联结构", "与……有关", "分词短语限定patents；同模式也用于后文诉讼相关议题。", "The case is related to gene patents.", "该案与基因专利有关。", "related是关联，不自动等于因果。"],
  ["file-brief", "filed a brief", "file a brief", "法律提交搭配", "提交法律书面意见", "file表示正式提交，brief为法律文书。", "The department filed a brief.", "该部门提交了法律书面意见。", "brief不是简短的形容词，也不等于最终判决。"],
  ["no-less-than-comparison", "no less a product of nature…than are cotton fibres", "no less + description + than ...", "否定比较", "与……同样是", "否定较低程度，强调两者自然属性相同；than后因主语长而倒装。", "The molecule is no less natural than the fibre.", "这种分子与这种纤维同样是自然的。", "不能漏no译成不如，也不把倒装are读成提问。"],
  ["separate-from", "separated from cotton seeds", "separate A from B", "分离搭配", "把A从B中分离", "原文被动分词，fibres为分离对象，seeds为来源。", "The fibres were separated from the seeds.", "纤维被从种子中分离出来。", "分离不等同人工制造，这是所引类比的核心。"],
  ["remain-unanswered", "remain unanswered", "remain + adjective/participle", "持续状态", "仍未得到解答", "remain为系动词，后接问题仍处于何种状态。", "The question remains unanswered.", "这个问题仍未得到解答。", "unanswered不是已得到否定回答。"],
  ["sequencing-genome", "the sequencing of a whole genome", "the sequencing of + genome", "测序过程名词", "对整个基因组测序", "of引测序对象，整体作whether从句主语。", "The sequencing of the genome took time.", "对该基因组测序花了一些时间。", "whole必须保留，不能只译某一个基因的检测。"],
  ["have-impact", "have an even greater impact", "have an impact on + object", "影响搭配", "产生更大的影响", "even修饰greater，may保留潜在性。", "The ruling may have a greater impact.", "该判决可能产生更大影响。", "影响更大不表示一定更有利或更不利。"],
  ["file-patents", "file many more patents", "file a patent application", "申请专利表达", "提交更多专利申请", "原文以file patents简写申请，不把申请等同获批。", "The firm filed a patent application.", "该公司提交了一项专利申请。", "unlikely to file many more不等于绝无新增申请。"],
  ["public-domain", "in the public domain", "in the public domain", "权利范围表达", "处于公有领域", "原文与already patented对照，说明不再属于待申请的新对象。", "The information is in the public domain.", "这些信息属于公有领域。", "不是互联网域名，也不是对外公开就必然无专利。"],
  ["look-for", "looking for correlations", "look for + noun", "寻求结构", "寻找关联", "分词与studying共用firms为逻辑主语，解释研究所求。", "They are looking for correlations.", "他们正在寻找关联。", "look into是调查，look for强调寻找对象。"],
  ["drug-efficacy", "a drug's efficacy", "a drug's efficacy", "所有格名词", "药物疗效", "efficacy是预期治疗效力，不是生产效率。", "The study examines the drug's efficacy.", "该研究考察药物疗效。", "原文predict只是预测，未提供任何个人疗效保证。"],
  ["eager-to", "are eager to win", "be eager to do", "意愿结构", "急于；渴望", "说明企业申请专利的愿望，不表结果已成。", "They are eager to succeed.", "他们渴望成功。", "be able to为有能力，be eager to为意愿，不要混用。"],
  ["connect-dots", "connecting the dots", "connect the dots", "比喻习语", "把零散线索联系起来", "在本篇具体指发现基因互动关系。", "The researchers are connecting the dots.", "研究者在把线索串联起来。", "不能字面解成画图，须结合前句how genes interact。"],
  ["related-to", "related to this issue", "be related to + noun", "关联结构", "与此议题相关", "修饰suit，议题是企业欲为基因关联申请专利。", "The suit is related to this issue.", "这起诉讼与此议题相关。", "相关并不等同案件已决定结果。"],
  ["bring-suit", "brought by the Mayo Clinic", "bring a suit", "起诉搭配", "提起诉讼", "被动分词修饰suit，by引提起方。", "The clinic brought a suit.", "该诊所提起了诉讼。", "bring在这里不是搬运某件实体物品。"],
  ["next-court-term", "in its next term", "in the Court's next term", "司法时间表达", "在法院下一审期", "its回指Supreme Court，term为开庭周期。", "The Court will hear it in its next term.", "法院将在下一审期审理此案。", "相对时间依据文章时点，不是读者今年的下一季度。"],
  ["coach-on", "coach lawyers on the shifting landscape for patents", "coach somebody on + topic", "培训对象结构", "就某议题培训某人", "lawyers为接受指导者，on引专利环境的变化。", "They coach lawyers on new procedures.", "他们就新程序培训律师。", "landscape为形势比喻，coach不是公交车。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2012P3PhraseGuides = reviewed.guides;
export const passage2012P3PhraseAliases = reviewed.aliases;
export const passage2012P3PhraseGlosses = { ...passage2012P3CollocationGlosses, ...reviewed.glosses };
export function getPassage2012P3WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2012P3Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2012P3SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2012P3CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
