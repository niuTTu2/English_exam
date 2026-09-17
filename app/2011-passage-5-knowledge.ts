import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2011P5Lexicon, passage2011P5CollocationGlosses, passage2011P5SentenceContexts } from "./2011-passage-5-lexicon";
const rows: PhraseRow[] = [
  ["weigh-in-on", "weigh in on the debate", "weigh in on + issue", "发表意见搭配", "参与这场辩论", "weigh in为加入发表观点，on引讨论事项。", "Doctors weighed in on the debate.", "医生加入了这场讨论。", "不是测量辩论重量。"],
  ["impose-tax-on", 'impose "fat taxes" on unhealthy food', "impose taxes on + object", "征税搭配", "对不健康食品征脂肪税", "税是impose宾语，on引征收对象。", "They proposed imposing taxes on unhealthy food.", "他们提议对不健康食品征税。", "食品与生产企业两个征税对象不能随意调换。"],
  ["cigarette-style-warning", "cigarette-style warnings", "cigarette-style + warning", "类比警示", "类似香烟包装的风险警示", "style说明方式相似，warning针对饮食危害。", "The proposal includes cigarette-style warnings.", "提议包括香烟式警示。", "不是教儿童认识香烟品牌。"],
  ["force-person-to", "force people to make healthy choices", "force somebody to do", "强制宾补结构", "强迫民众作健康选择", "people为force宾语，to make为宾补；原句could not是否定。", "The policy cannot force people to agree.", "这项政策不能强迫人们同意。", "与被动be forced to do同义结构相关，原句否定不能漏掉。"],
  ["free-from", "free businesses from public health regulations", "free A from B", "解除约束搭配", "使企业摆脱公共健康法规约束", "free为动词，from引被解除的限制。", "The proposal would free firms from restrictions.", "该提案会解除企业所受限制。", "free不是免费，也不等于加强监管。"],
  ["stop-object-doing", "stop fast-food outlets opening near schools", "stop A (from) doing", "阻止动作结构", "阻止快餐店在学校附近开业", "outlets为宾语及opening逻辑主语，from可省略。", "They stopped shops opening nearby.", "他们阻止商店在附近开业。", "不把outlets opening误作两个独立主谓句。"],
  ["high-in", "high in fat, salt or sugar", "high in + substance", "含量搭配", "脂肪、盐或糖含量高", "形容词短语后置修饰foods/products，in引所含成分。", "The food is high in sugar.", "这种食品糖含量高。", "不是价格高，也不是食品位置高。"],
  ["such-as", "such as McDonald's", "such as + examples", "举例结构", "例如麦当劳", "麦当劳属于前面的食品企业类别，复用既有举例结构。", "Firms such as this one sponsor events.", "像这家这样的企业赞助活动。", "such as不是结果连词so that。"],
  ["addiction-to", "addiction to unhealthy food", "addiction to + noun/doing", "依赖搭配", "对不健康食品的依赖", "to为介词，引成瘾对象；Britain's转喻英国人。", "They want to curb addiction to unhealthy food.", "他们希望抑制对不健康食品的依赖。", "不把to误读成后接动词原形的不定式。"],
  ["help-halt", "help halt spiraling rates", "help (to) do", "帮助动作", "帮助遏止比例攀升", "help后halt为省略to的原形，spiraling修饰rates。", "The policy may help halt the increase.", "这项政策可能帮助遏制增长。", "停止上升不自动等于已经降到零。"],
  ["as-damaging-as", "just as damaging as smoking or excessive drinking", "just as + adjective + as", "同级比较", "与吸烟或过量饮酒同样有害", "第一个as修饰damaging程度，第二个as引比较标准。", "This habit can be as damaging as smoking.", "这种习惯可能与吸烟同样有害。", "原文医学类比归属于说话者，不另造诊疗结论。"],
  ["ban-on", "a ban on smoking", "a ban on + noun/doing", "禁止搭配", "禁烟令", "ban名词后on引被禁行为，smoking为动名词。", "They introduced a ban on smoking.", "他们实行了禁烟令。", "不能将ban on smoking译成吸烟的许可。"],
  ["and-yet", "and yet", "and yet", "转折连接", "然而却", "and连接分句，yet表达超出前述预期的反差。", "It seemed impossible, and yet it happened.", "这看似不可能，却发生了。", "yet在此不是还没有的时间副词。"],
  ["in-respect-of", "in respect of obesity", "in respect of + noun", "方面介词结构", "在应对肥胖方面", "限定采取同样勇气的议题。", "We need action in respect of health.", "在健康问题上我们需要行动。", "不是对肥胖表达尊敬。"],
  ["modal-be-ellipsis", "we should be", "subject + modal + be + omitted complement", "表语省略", "我们应当同样勇敢", "be后的性质从上一问just as courageous恢复。", "Are we ready? We should be.", "我们准备好了吗？我们应该准备好了。", "省略表语不能直译成我们应该存在。"],
  ["rather-than", "industry rather than government", "rather than + parallel element", "取舍连接", "行业而非政府", "连接两个平行主体，二者处于want的宾语位置。", "Industry rather than government would lead.", "将由行业而不是政府主导。", "不能反转主导者。"],
  ["take-the-lead", "take the lead", "take the lead", "带头搭配", "发挥主导作用", "lead为名词，整体表示领先或带头。", "Businesses should take the lead.", "企业应发挥带头作用。", "lead不是金属铅。"],
  ["play-central-role", "play a central role in the Change4Life campaign", "play a role in + noun/doing", "作用搭配", "在健康倡议中发挥核心作用", "central强调重要程度，与significantly同义呼应。", "Schools play a role in health education.", "学校在健康教育中发挥作用。", "不是戏剧角色，也不表示活动只靠企业。"],
  ["lecture-people", '"lecturing" people', "lecture somebody", "训导表达", "对民众说教", "动名词短语作how从句主语，引号提示批评标签。", "Lecturing people may not change habits.", "对人说教未必能改变习惯。", "这是否最佳办法是Lansley评价，不是Oliver自我否定。"],
  ["way-to-change", "the best way to change their behaviour", "a way to do", "方法补足", "改变行为的最佳方法", "to change修饰way，原句was not否定其最佳地位。", "They sought a way to change habits.", "他们寻找改变习惯的方法。", "not the best不必然等于完全无效。"],
  ["before-nine-pm", "before 9 p.m.", "before + clock time", "时间界限", "晚九点以前", "修饰禁播广告的时间范围，p.m.标下午或晚上。", "The rule applies before 9 p.m.", "这条规则适用于晚九点以前。", "不是早上九点，原文没有全天禁播。"],
  ["limit-adverts-places", "limiting them on billboards or in cinemas", "limit adverts on/in + medium", "投放限制", "限制广告牌或影院上的广告", "them回指广告，on与in分别搭配载体。", "They limited adverts in cinemas.", "他们限制影院广告。", "them不是儿童，更不是禁止儿童入影院。"],
  ["same-way-as", "in the same way as cigarettes", "in the same way as + comparison", "方式比较", "像对待香烟那样", "比较管控方式而非说两种商品完全相同。", "They treated the products in the same way as cigarettes.", "他们像对待香烟那样对待这些产品。", "as后认知谓语由前文省略。"],
  ["set-limits-on", "setting strict limits on advertising", "set limits on + noun/doing", "限制搭配", "严格限制广告", "limits为名词宾语，on引被限制对象。", "They set limits on advertising.", "他们限制广告。", "set—set—set同形，setting双写t。"],
  ["youth-coaching", "the youth coaching scheme", "a youth coaching scheme", "项目名词结构", "青少年训练计划", "youth限定人群，coaching说明训练性质。", "The firm sponsored a youth coaching scheme.", "企业赞助了一项青少年训练计划。", "不把scheme一律译为阴谋。"],
  ["scheme-run-by", "run by the Football Association", "scheme run by + organiser", "分词定语", "由足球协会开展", "run为过去分词，by引运营者，修饰scheme。", "The scheme is run by an association.", "该计划由一家协会开展。", "不是由足球协会跑步。"],
  ["stop-offering", 'stop offering "inducements"', "stop doing", "停止原动作", "停止提供诱因", "doing为停止的原有动作，与stop to do停下去做另一事区分。", "The firm stopped offering gifts.", "企业停止赠送礼物。", "不要反读为停下来提供礼物。"],
  ["mobile-phone-credit", "mobile phone credit", "mobile phone credit", "话费搭配", "手机话费额度", "credit指预付可用通话费用，非信用或学分。", "The offer included mobile phone credit.", "优惠中包含手机话费。", "原文不是赠送整部手机。"],
  ["impact-on-growth", "the impact that food has on their growth", "have an impact on + noun", "影响搭配", "食物对儿童成长的影响", "impact被关系代词that提到前面，that作has宾语。", "Food has an impact on growth.", "食物会影响成长。", "此that是关系代词，后面and that为内容连词。"],
  ["available-up-front", "available up front", "available up front", "提前获取", "事先可以获得", "up front为时间方式习语，强调在作选择前知晓信息。", "The information is available up front.", "信息可提前获得。", "有信息不等于行为保证改变。"],
  ["fast-food-free-zone", '"fast-food-free zones"', "fast-food-free zones", "禁止区域", "快餐禁入区", "-free后缀表示没有或禁止某物，范围围绕学校医院。", "The council proposed fast-food-free zones.", "地方议会提议设立快餐禁入区。", "不是免费提供快餐的区域。"],
  ["within-which", "within which takeaways cannot open", "within which + clause", "介词前置定语从句", "快餐店不得开业的区域", "which作within宾语，先行词areas，takeaways才是主语。", "They defined areas within which shops cannot open.", "他们划定了商店不得开业的区域。", "within which不是主语，也不是一般疑问词。"],
  ["work-together", "all of society works together", "work together", "协作搭配", "全社会共同努力", "society作为整体单数，works与其一致。", "All of society works together.", "全社会共同努力。", "不是某一个企业单独承担所有工作。"],
  ["built-on-responsibility", "built on social responsibility, not state regulation", "be built on A, not B", "基础与否定对照", "以社会责任而非国家监管为基础", "过去分词修饰deal，两个名词短语对举。", "The deal is built on responsibility, not regulation.", "协议建立在责任而非监管之上。", "不能把否定改为加强国家监管。"],
  ["white-paper", "a white paper", "a white paper", "政策文件术语", "白皮书", "政府发布的政策阐述文件，white与paper整体识别。", "The department published a white paper.", "该部门发布了一份白皮书。", "不是一张白纸，也不是报纸。"],
  ["set-out-how", "setting out exactly how we will achieve this", "set out + content", "阐述搭配", "详细说明如何实现目标", "setting out为现在分词定语，how从句作其宾语。", "The paper sets out how the plan will work.", "该文件阐述计划如何运作。", "set out还可表示出发，本篇为写清内容。"],
  ["back-radical-moves", "back such radical moves", "back + proposal/action", "支持措施", "支持如此强硬的举措", "back为及物动词，医生主语、举措宾语。", "Doctors backed the proposal.", "医生支持了这一提案。", "不是背后的地点back。"],
  ["over-last-decade", "over the last decade", "over the last + period", "延续时段", "过去十年间", "修饰完成时have been deployed，表示至报道时的时段。", "The tactics have changed over the last decade.", "过去十年间这些策略发生了变化。", "不是未来十年，也不是今天倒推的十年。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2011P5PhraseGuides = reviewed.guides;
export const passage2011P5PhraseAliases = reviewed.aliases;
export const passage2011P5PhraseGlosses = { ...passage2011P5CollocationGlosses, ...reviewed.glosses };
export function getPassage2011P5WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2011P5Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2011P5SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2011P5CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
