import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { cloze2012Lexicon, cloze2012CollocationGlosses, cloze2012SentenceContexts } from "./2012-cloze-lexicon";
const rows: PhraseRow[] = [
  ["see-as", "see G.I. Joe as a mindless war toy", "see A as B", "复合宾语结构", "把A看作B", "see后接宾语A，as B说明所认定的身份或性质。", "They see him as a hero.", "他们把他视为英雄。", "这里see不是视觉上的看见，as也不是时间连词。"],
  ["used-to", "used to be", "used to do", "过去习惯或状态", "过去常常；过去曾经", "used to后接动词原形，本句be说明过去的状态。", "It used to be different.", "以前的情况不一样。", "be used to doing为习惯于，不与used to do混淆。"],
  ["grow-into", "grown into hero", "grow into + noun", "变化搭配", "成长为", "grown是不规则过去分词，原文作man的后置定语。", "The child grew into a leader.", "那个孩子成长为一位领导者。", "grow into不表示向某处移动；原卷hero前无冠词，例句采用常规冠词。"],
  ["tear-away-from", "torn away from his home", "tear A away from B", "动词介词结构", "强行使A离开B", "被动分词torn away说明孩子被迫离乡。", "He was torn away from his family.", "他被迫离开家人。", "tear的过去式tore、分词torn，不写teared。"],
  ["go-without", "went without", "go without + noun", "动词介词搭配", "没有……而勉强维持", "without后接名词或动名词，表示缺少必需条件。", "They went without food.", "他们忍饥挨饿。", "不是go走向某个没有东西的地点。"],
  ["stick-it-out", "stuck it out", "stick it out", "动词习语", "坚持到底；撑过去", "it置于动词与副词之间，stuck是不规则过去式。", "She decided to stick it out.", "她决定坚持到底。", "不能拆成把某个物品粘在外面。"],
  ["drive-back", "drove back", "drive back + enemy", "动词短语", "击退；迫使后退", "本文宾语为敌人的残暴统治，使用过去式drove。", "They drove back the attackers.", "他们击退了进攻者。", "drive back也可指开车返回，本句由敌军宾语确定击退义。"],
  ["not-but", "not a volunteer soldier, not someone well paid, but an average guy", "not A but B", "并列纠正结构", "不是A而是B", "否定前面的身份，确认but后的普通人身份，A和B应平行。", "He is not a general but a soldier.", "他不是将军，而是一名士兵。", "not only ... but also ...才是‘不仅而且’，这里没有only和also。"],
  ["up-against", "up against", "be up against + difficulty/opponent", "处境习语", "面对；遭遇（困难或强敌）", "本句省略重复的系词，用补充短语描述普通人所面对的敌军。", "They are up against strong opposition.", "他们面临强烈反对。", "up不是实际方向，against也不是支持。"],
  ["hand-out", "handed out to soldiers", "hand out A to B", "动词配发结构", "把A分发给B", "本句分词短语修饰articles，物品为被配发对象。", "They handed out food to soldiers.", "他们给士兵分发食物。", "hand down为传承；hand over为移交，不能脱离语境互换。"],
  ["make-it-to-the-top", "made it to the top", "make it to the top", "成功习语", "取得成功；跻身上层", "make it表示成功到达，to the top说明到达最高地位。", "She finally made it to the top.", "她终于跻身顶层。", "不是制作一个物件；it不能按get to的结构随意删除或替换动词。"],
  ["working-class", "working class", "working class", "社会群体名词", "工人阶级；劳动者阶层", "working限定class，整组在本句修饰name。", "The story concerns working class life.", "这个故事讲述工人阶级的生活。", "class不是班级；这是社会背景描述。"],
  ["secretary-of-state", "secretary of state", "secretary of state", "职务名词", "国务卿", "在美国政府职位列举中整体理解，of state限定职务领域。", "The secretary of state gave a speech.", "国务卿发表了讲话。", "不能按一般secretary译成州里的秘书。"],
  ["distinguished-career", "a distinguished career", "a distinguished career", "形容词名词搭配", "卓越的生涯", "distinguished评价经历杰出，不表示经历受到争议。", "He had a distinguished career.", "他有过卓越的职业生涯。", "distinguished与disguised、disputed意义不同。"],
  ["collection-of", "a collection of American personalities", "a collection of + plural noun", "集合名词结构", "一系列……的集合", "中心词collection为单数，of后说明所包含的多种性格。", "The book contains a collection of stories.", "这本书收录了一组故事。", "本句为性格综合体，而不是收藏家身份。"],
  ["based-on", "based on", "be based on + source", "被动来源结构", "以……为依据", "原文省去be，以过去分词短语补充电影的创作素材。", "The film is based on a true story.", "电影根据真实故事改编。", "分词逻辑对象是movie，不是记者被建立在某物上。"],
  ["portray-oneself", "portrayed themselves", "portray oneself", "动词反身结构", "扮演自己；本色出演", "反身代词与主语一致，本文士兵本人参加表演。", "The soldiers portrayed themselves.", "这些士兵在影片中扮演自己。", "反身代词不可换成普通them，否则可能指别的人。"],
  ["be-famous-for", "was famous for", "be famous for + noun/doing", "形容词原因搭配", "以……而著名", "for引出成名原因，动词必须用动名词。", "She is famous for writing novels.", "她以写小说闻名。", "be famous as引身份，be famous for引成名原因。"],
  ["human-side", "the human side of the war", "the human side of + event", "名词侧面结构", "事件中与人的生活感受有关的一面", "human侧重普通人处境，与军事进展数字对照。", "The report shows the human side of the crisis.", "报道展现了危机中人的处境。", "不是伦理学方面，也不是身体侧面。"],
  ["stars-and-stripes", "Stars and Stripes", "Stars and Stripes", "专有报刊名", "《星条旗报》", "在artist前说明画家所属报刊，整组作为名称。", "He drew cartoons for Stars and Stripes.", "他为《星条旗报》画漫画。", "不逐词转成明星和条纹的无关词义。"],
  ["share-with", "shared with each other and the civilians", "share A with B", "分享搭配", "与B分享A", "that指被分享的文明生活片段，with连接战友和平民。", "They shared coffee with civilians.", "他们与平民分享咖啡。", "share的宾语在从句中由that承担，不是缺宾语。"],
  ["each-other", "each other", "each other", "相互代词", "彼此；互相", "本句接在with之后表示士兵相互之间。", "They helped each other.", "他们互相帮助。", "themselves强调自身，each other强调人与人之间的互动。"],
  ["dozen-more", "a dozen more countries", "a dozen more + plural noun", "数量结构", "另外十二个；约另外十多个", "more处于数量与名词之间，表示额外增加的数量。", "A dozen more people arrived.", "又来了十二个人。", "a dozen不写a dozens，dozens of才用复数。"],
  ["at-that-point", "at that point", "at that point", "时间状语", "在那个时候；在那一阶段", "限定当时的评价，不能推广为从始至终。", "At that point, help was essential.", "在那个时刻，援助至关重要。", "from the outset是从开端起，和某个特定时点不同。"],
];
const reviewed = reviewedPhrases(rows);
export const cloze2012PhraseGuides = reviewed.guides;
export const cloze2012PhraseAliases = reviewed.aliases;
export const cloze2012PhraseGlosses = { ...cloze2012CollocationGlosses, ...reviewed.glosses };
export function getCloze2012WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = cloze2012Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? cloze2012SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: cloze2012CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
