import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2012P5Lexicon, passage2012P5CollocationGlosses, passage2012P5SentenceContexts } from "./2012-passage-5-lexicon";
const rows: PhraseRow[] = [
  ["at-bottom", "at bottom", "at bottom", "本质判断习语", "归根到底；实质上", "修饰is整个判断，概括本质而非位置。", "History is at bottom about people.", "历史归根到底关乎人。", "不要逐字译为在底部。"],
  ["not-any-more", "not any more", "not ... any more", "否定时间结构", "不再", "表示从过去持续状态转为不再成立。", "It is not popular any more.", "它不再流行。", "不是从来没有，而是今昔变化。"],
  ["fall-out-with", "fallen out with its favorite historical form", "fall out with somebody/something", "动词习语", "与……闹翻；不再青睐", "本文以人际闹翻比喻不再热衷某种写史方式。", "They fell out with their former allies.", "他们与昔日盟友闹翻了。", "fall过去式fell、分词fallen，不是掉出一个容器。"],
  ["no-more-than-mere", "no more than", "no more than + noun phrase", "轻量限定结构", "仅仅；不过是", "本句后接craze而非数量，限制现象的重要程度。", "It is no more than a passing fashion.", "这不过是一时风尚。", "区别no more than ten至多十个的数量上限义。"],
  ["point-to", "points to a broader truth", "point to + evidence/conclusion", "指示论据结构", "表明；指向", "现象作为线索指向更深事实，非手指指物。", "The change points to a broader truth.", "这种变化表明了更广泛的事实。", "point out强调说出指出，point to强调成为指示证据。"],
  ["concerned-with", "concerned with learning from our forefathers", "be concerned with doing/something", "关注对象结构", "关心；注重", "with后动名词指关心的活动，less降低关注程度。", "We are concerned with learning from history.", "我们注重向历史学习。", "不必表示担忧，担心常用concerned about。"],
  ["noun-not-noun", "empathy, not inspiration", "A, not B", "肯定否定对照", "要A，而非B", "两项共享want，否定仅落在B。", "We want empathy, not admiration.", "我们要的是共情，而非仰慕。", "不能把两项都当作者并列追求的东西。"],
  ["exemplary-life", "the exemplary lives of great men", "an exemplary life", "榜样评价搭配", "堪为典范的人生", "exemplary修饰life，of说明传主。", "The biography describes an exemplary life.", "这部传记描写了堪为典范的一生。", "lives是life复数，非live动词。"],
  ["begin-work-on", "began work on his rambling writing", "begin work on something", "着手工作结构", "开始从事；着手创作", "work是不可数名词，on引创作对象。", "She began work on a biography.", "她开始撰写一部传记。", "只表示开始，不表示已经出版完成。"],
  ["rise-to-top", "rising to the top", "rise to the top", "成功比喻", "登上巅峰；出人头地", "与conquering fortune共作介词in宾语。", "He rose to the top through effort.", "他通过努力登上巅峰。", "rise是不及物，不能照搬raise的宾语结构。"],
  ["turn-on-head", "turned on its head", "turn something on its head", "颠覆习语", "彻底颠倒；颠覆", "which提前作宾语，its回指被颠覆的传统。", "The argument turned the theory on its head.", "该论证把那套理论彻底颠覆了。", "不是让某个人倒立的字面意思。"],
  ["rather-than", "rather than virtue, mercy and justice", "rather than + parallel element", "取舍连接", "而不是", "连接政治技能与传统美德两组并列项。", "He valued cunning rather than mercy.", "他看重权谋而非仁慈。", "后项是被排除的重点，不是同样推崇的内容。"],
  ["rather-than", "rather than public glory", "rather than + parallel element", "取舍连接", "而不是", "艺术家个人经历与公众荣耀构成对照。", "They stressed experience rather than glory.", "他们强调经历而非荣耀。", "B选项反转了否定对照方向。"],
  ["over-time", "Over time", "over time", "时间渐变", "随着时间推移", "描述跨时代逐步变化，不限某个固定时段。", "Values change over time.", "价值标准随时间而变化。", "不是overtime加班。"],
  ["of-ones-day", "of their day", "of one's day", "时代归属结构", "某人所处时代的", "限定leading painters and authors的时代范围。", "She was a leading artist of her day.", "她是当时杰出的艺术家。", "day指时代，不是只有一天。"],
  ["by-contrast", "By contrast", "by contrast", "篇章对照连接", "相比之下", "用来引出Smiles与Romantics不同的评价标准。", "By contrast, the book praises engineers.", "相比之下，该书赞颂工程师。", "不表因果，不译作因此。"],
  ["issue-in", "issuing in the formation", "issue in + result", "结果结构", "导致；产生……结果", "分词描述品格力量带来高尚人格的形成。", "Patient work issued in success.", "持久努力最终取得成功。", "issue in与issue from源自的方向不同。"],
  ["in-ones-power", "in the power of each", "in somebody's power", "能力范围结构", "在某人能力范围内", "each指每个人，说明自身可以做到什么。", "It is in our power to help.", "帮助别人是我们力所能及的。", "不是in power执政，不能混淆有无the和所有者。"],
  ["hold-up-as", "were held up as beacons", "hold somebody/something up as + model", "榜样评价结构", "把……树为榜样", "本篇为被动语态，传记被树为指路明灯。", "Her life was held up as an example.", "她的人生被树为榜样。", "hold up的抢劫、耽误义不适用。"],
  ["focus-object-on", "focused his biographies on", "focus A on B", "注意范围结构", "把A聚焦于B", "A是传记，B是英雄人物的生平。", "He focused his book on ordinary people.", "他的书聚焦普通人。", "区别focus on B无显式宾语A的结构。"],
  ["hard-to-do", "hard to imitate", "be hard to do", "形容词不定式结构", "难以做", "名词lives是imitate的逻辑宾语，主动不定式含被动关系。", "Such a life is hard to imitate.", "这样的人生难以效仿。", "不是这些人生难以去模仿别的东西。"],
  ["higher-than", "higher authority than mere mortals", "higher + noun + than + comparison", "比较结构", "比……更高的", "比较英雄的权威与凡人的权威，后项省略所有关系。", "They claimed higher authority than ordinary people.", "他们声称拥有高于普通人的权威。", "比较authority，不是比较身高。"],
  ["not-everyone", "Not everyone", "not everyone + predicate", "部分否定", "并非人人都", "否定所有人均认同，不等于无人认同。", "Not everyone agreed.", "并非人人都同意。", "no one agreed才是没有人同意。"],
  ["class-struggle", "class struggles", "class struggle", "社会史术语", "阶级斗争", "讨论社会阶级关系的冲突，class限定struggle。", "The text discusses class struggle.", "该文讨论阶级斗争。", "不是教室里的争吵。"],
  ["wage-battle", "waged battles", "wage a battle/war", "动宾搭配", "进行战斗；发动战争", "wage作动词，本文在否定结构中。", "They waged a battle.", "他们进行了一场战斗。", "wage不取工资名词义。"],
  ["it-is-who-emphasis", "It is man, real, living man who does all that", "It is + person + who + predicate", "强调句", "正是某人做……", "强调真正行动者，删去强调框架仍有man does all that。", "It is people who make history.", "正是人们创造历史。", "it不另指一个行动者；who分句需单独拆解。"],
  ["the-masses", "the masses", "the masses", "群体名词", "广大民众", "定冠词与复数mass组合表示普通人群。", "History should tell the story of the masses.", "历史应讲述民众的故事。", "不是质量或若干物块。"],
  ["as-such", "As such", "as such", "承接评价结构", "既然如此；因此", "承接历史应为民众史这一性质。", "It is social history; as such, context matters.", "这是社会史，因此背景很重要。", "需看such所承接内容，不机械译成作为这样的。"],
  ["power-relations", "power relations", "power relations", "社会研究搭配", "权力关系", "描述社会中权力的分布和互动。", "The study examines power relations.", "该研究考察权力关系。", "power不是电力供应。"],
  ["as-please", "as they please", "as somebody pleases", "方式状语从句", "随某人的意愿", "please在此不及物，原句受not just限制。", "People cannot always act as they please.", "人不能总是随心所欲地行事。", "不是请求别人高兴，也不是礼貌用语请。"],
  ["under-circumstances", "under circumstances chosen by themselves", "under + circumstances + modifier", "条件背景结构", "在……条件下", "chosen by说明条件选择者，后文改为历史既定条件。", "We work under given circumstances.", "我们在既定条件下工作。", "原文否定任意选择条件，不否定人的能动性。"],
  ["appreciation-of", "our appreciation of the past", "appreciation of + object", "认知名词搭配", "对……的理解", "of引认识对象the past，非表示感激过去给予恩惠。", "Research deepens our appreciation of history.", "研究加深我们对历史的理解。", "不能套用货币升值义。"],
  ["in-place-of", "In place of Thomas Carlyle", "in place of + noun", "替代结构", "代替；取而代之", "比喻史学代表与传统的变化，不指具体岗位交接。", "New methods arose in place of old ones.", "新方法取代了旧方法。", "后句alongside说明并存，不据此绝对化为旧传统消失。"],
  ["history-from-below", "History from below", "history from below", "史学视角", "从民众或下层视角书写历史", "below为社会位置比喻，与伟人传记相对。", "History from below studies ordinary lives.", "民众史研究普通人的生活。", "不是从楼下观看历史。"],
  ["stand-alongside", "stood alongside", "stand alongside + noun", "并存比喻", "与……并列存在", "两种史学写作获得并列地位。", "Social history stood alongside biography.", "社会史与传记并存。", "不是支持某位人物的政治立场。"],
  ["open-up", "were opened up", "open up + field/opportunity", "开拓结构", "开辟；开拓", "被动结构主语为领域，强调研究视野扩展。", "Research opened up new fields.", "研究开辟了新领域。", "D偷换为great men，不能只靠短语复现选答案。"],
  ["from-to-range", "from gender to race to cultural studies", "from A to B to C", "范围列举", "从A到B再到C", "列举研究视角，不表示必须按时间顺序发生。", "Topics range from gender to race to culture.", "话题涵盖性别、种族和文化。", "三项应作为完整列举，不少译末项。"],
  ["just-as-adjective-as", "just as fascinating as upstairs", "just as + adjective + as + comparison", "同级比较", "和……同样……", "just加强程度相同，比较两类生活的吸引力。", "Ordinary lives are just as fascinating as heroic ones.", "普通人的生活和英雄人生同样引人入胜。", "不是more...than的优劣比较。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2012P5PhraseGuides = reviewed.guides;
export const passage2012P5PhraseAliases = reviewed.aliases;
export const passage2012P5PhraseGlosses = { ...reviewed.glosses, ...passage2012P5CollocationGlosses };
export function getPassage2012P5WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2012P5Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2012P5SentenceContexts[sentenceId]?.[headword] : undefined;
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: entry.collocations.map(pattern => ({ pattern, meaning: passage2012P5CollocationGlosses[pattern.toLowerCase()].meaning, rule })), pitfalls: entry.examSynonyms };
}
