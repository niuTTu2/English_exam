import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2012P4Lexicon, passage2012P4CollocationGlosses, passage2012P4SentenceContexts } from "./2012-passage-4-lexicon";
const rows: PhraseRow[] = [
  ["era-of", "this era of high joblessness", "an era of + condition", "时代特征结构", "以某状况为特征的时期", "of限定era，区分高失业期和经济衰退期。", "An era of high unemployment began.", "高失业时期开始了。", "经济衰退结束不自动等于高失业结束。"],
  ["life-course", "the life course and character", "life course", "复合名词", "人生轨迹", "course在life后指发展过程，和character并列为改变对象。", "The event changed his life course.", "那件事改变了他的人生轨迹。", "不是生活课程，不能套用course的课堂义。"],
  ["likely-to", "is likely to reshape", "be likely to do", "可能性结构", "很可能会", "形容词likely后接不定式，表预测而非确定事实。", "The event is likely to change society.", "该事件很可能改变社会。", "不能漏likely变成毫无保留的必然判断。"],
  ["silver-lining", "find silver linings", "find a silver lining", "困境比喻", "找到逆境中的希望或好处", "源自阴云边缘的亮光意象，文中具体是生活观念的积极变化。", "She found a silver lining in the setback.", "她从挫折中看到了一线希望。", "不是寻求金属、政府补贴或从灾难牟利。"],
  ["in-some-ways", "in some ways", "in some ways", "范围限定", "在某些方面", "限制improved的范围，不表示失业总体上有益。", "The change helped in some ways.", "这项变化在某些方面有帮助。", "不能扩大成所有方面都改善。"],
  ["less-materialistic", "less materialistic", "less + adjective", "程度下降比较", "不那么物质至上", "less降低materialistic程度，并不表示彻底没有物质需求。", "They became less materialistic.", "他们变得不那么崇尚物质。", "less与后面的more prudent方向各自不同，不能一起译为更。"],
  ["financially-prudent", "more financially prudent", "financially prudent", "副词修饰形容词", "理财或消费更审慎", "financially限定谨慎所在领域，more强调程度上升。", "They are financially prudent.", "他们理财很谨慎。", "financially不是名词，也不等于必然收入更多。"],
  ["aware-of", "aware of the struggles of others", "be aware of + noun", "认知搭配", "意识到；体会到", "of后接认识对象，此处为他人艰难处境。", "We became aware of their struggles.", "我们开始了解他们的艰辛。", "他人的挣扎不是与他人争斗。"],
  ["in-respects", "In limited respects", "in + modifier + respects", "范围状语", "在有限方面", "respects为方面，limited严格限制好处范围。", "The policy helped in limited respects.", "政策只在有限方面有帮助。", "不可按尊敬的字面动词义翻译。"],
  ["better-off", "leave society better off", "leave A better off", "宾语结果补语", "使A境况更好", "leave后宾语A及状态better off，原文另用perhaps限制判断。", "The change left them better off.", "这项变化使他们处境更好。", "better off不必仅指收入增加，本文含价值观和社会认知。"],
  ["at-very-least", "At the very least", "at the very least", "最低限度评价", "至少；最低限度来说", "very加强the least，确定至少有一项后果。", "At the very least, we learned something.", "至少我们学到了一些东西。", "不是最多，与at most方向相反。"],
  ["awake-from", "awoken us from our national fever dream", "awake somebody from + dream", "唤醒结构", "把某人从梦中唤醒", "本篇比喻摆脱财富幻想，us为受事，from引原状态。", "The crisis awoke them from a dream.", "危机使他们从幻想中醒来。", "awake过去式awoke，分词awoken，保留正确屈折。"],
  ["put-end-to", "put a necessary end to", "put an end to + noun/doing", "终结习语", "结束；终止", "necessary修饰end，to是介词，后接时代或活动。", "They put an end to reckless spending.", "他们停止了鲁莽消费。", "end前可插入评价形容词，不能误把to当不定式标记。"],
  ["for-most-part", "for the most part", "for the most part", "总体范围", "总体上；大体而言", "由局部好处转向总体有限的判断。", "The benefits are uncertain for the most part.", "总体上这些好处还不确定。", "不是为了最大的那一部分，不逐字硬译。"],
  ["far-off", "far off", "far off", "距离或时间表语", "遥远的；尚需很久的", "文中评价益处在时间上遥远，非地理位置。", "Recovery still seems far off.", "复苏似乎仍遥遥无期。", "远期不代表绝不会发生。"],
  ["both-a-and-b", "both inside and outside the U.S.", "both A and B", "并列涵盖", "A与B两者都", "inside与outside平行，共用the U.S.补足范围。", "It matters both inside and outside the country.", "它在国内国外都重要。", "不能译成美国以外而漏掉国内。"],
  ["leave-object-complement", "left society more mean-spirited and less inclusive", "leave A + adjective", "宾语补足结构", "使A处于某种状态", "两个比较级形容词共同补充society的结果状态。", "The conflict left society divided.", "冲突使社会陷入分裂。", "leave在这里不是离开，more和less分别表两种变化方向。"],
  ["advance-rights", "the advance of rights and freedoms", "the advance of + value", "名词进步结构", "权利与自由的进步", "advance为单数名词，of引发展对象。", "The reform promoted the advance of rights.", "改革推动了权利的发展。", "原文前面的stop/reverse使作用方向变负，不能只看advance误选促进。"],
  ["anti-immigrant-sentiment", "Anti-immigrant sentiment", "anti-immigrant sentiment", "复合定语名词", "反移民情绪", "anti-表示反对，整组指对移民的敌意倾向。", "Anti-immigrant sentiment increased.", "反移民情绪加剧了。", "情绪增加与具体移民经济负担的命题不同。"],
  ["between-a-and-b", "between races and classes", "between A and B", "群体间关系", "种族与阶层之间", "在本文修饰conflict，说明冲突发生群体。", "Conflict grew between the groups.", "群体间冲突加剧。", "原型用and连接，不写between A to B。"],
  ["income-inequality", "Income inequality", "income inequality", "经济名词", "收入不平等；收入差距", "不平等是主语，falls/shrinks描述差距缩小，而非收入下降。", "Income inequality did not shrink.", "收入差距没有缩小。", "本文说这次没有缩小，不把一般规律当实际本次结果。"],
  ["class-divides", "class divides", "class divides", "社会分层名词", "阶层分野；阶层鸿沟", "divides为复数名词，指跨阶层流动面对的界限。", "The crisis reinforced class divides.", "危机加深了阶层分野。", "不是class divides主谓短语，divide在此不是动词。"],
  ["opportunity-to", "opportunities to cross them", "an opportunity to do", "名词不定式定语", "做某事的机会", "to cross解释机会内容，them指阶层分野。", "They lacked opportunities to advance.", "他们缺少发展的机会。", "不定式修饰opportunities，不是decrease的目的。"],
  ["not-all", "not all people", "not all + plural noun", "部分否定", "并非所有人都", "否定全称，不等于所有人都不受影响。", "Not all graduates suffer equally.", "并非所有毕业生都受到同等影响。", "none才是否定所有人，本句后文明确区分群体。"],
  ["catch-up", "catch up fairly quickly", "catch up (to/with ...)", "追赶习语", "赶上；弥补落差", "目标由to where反事实从句说明，是自身本可到达的水平。", "They caught up to the expected level.", "他们赶上了预期水平。", "本篇没有有经验雇员这一参照群体。"],
  ["it-is-that-emphasis", "it is the masses beneath them that are left behind", "it is A that ...", "强调句", "真正……的是A", "强调被落下的群体，去掉it is/that后masses are left behind仍成立。", "It is ordinary people that are left behind.", "真正被落下的是普通人。", "it不是指上文某个具体事物，that为强调结构标记。"],
  ["lean-times", "these lean times", "lean times", "比喻性时期表达", "经济困难时期", "lean由资源不足引申为经济拮据，与hard times相近。", "Jobs were scarce in lean times.", "经济困难时工作机会稀少。", "不是身体瘦弱的时间，也不是短暂时间。"],
  ["in-respects", "In many respects", "in + modifier + respects", "范围状语", "在许多方面", "many说明多个维度，仍不等于所有方面。", "The country changed in many respects.", "这个国家在许多方面发生了变化。", "respects在此是方面，不能沿用尊敬义。"],
  ["variety-of", "a variety of national polls", "a variety of + plural noun", "多样数量结构", "多种全国民调", "不仅一项调查；后文mixed表结果方向复杂。", "A variety of polls showed mixed results.", "多种民调显示结果不一致。", "不能凭多种调查就说结论一致。"],
  ["mixed-results", "mixed results", "mixed results", "结果评价", "不一致；好坏参杂的结果", "社会冲突的证据不单一，故具体变化需观察。", "The polls produced mixed results.", "民调得出了不一致的结果。", "mixed不等于没有结果，更不等于全负面。"],
  ["wait-and-see", "wait and see", "wait and see", "并列动词习语", "等待观察；拭目以待", "see后接how从句，关注改变方式而非是否改变。", "We must wait and see how it develops.", "我们须等待观察它如何发展。", "不是说作者否认影响存在。"],
  ["social-fabric", "our social fabric", "social fabric", "结构比喻", "社会结构和关系体系", "fabric由织物的交织结构比喻社会联系。", "Hard times reshape the social fabric.", "困难时期重塑社会结构。", "不能按字面译作社会布料。"],
  ["all-the-more", "all the more so", "all the more so", "程度递进及省略", "更是如此；程度更深", "so代替前面改变社会的结果，all加强more。", "It matters, and all the more so now.", "它很重要，现在尤其如此。", "so不是引出因果的新结论，而是代替前述状态。"],
  ["the-more-the-more", "the longer they extend", "the + comparative ..., the + comparative ...", "比例比较结构", "越……就越……", "原文后置the longer条件，与前面的all the more so对应。", "The longer they last, the deeper the effects become.", "持续越久，影响就越深。", "两组比较表联动，不是the longest最高级。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2012P4PhraseGuides = reviewed.guides;
export const passage2012P4PhraseAliases = reviewed.aliases;
export const passage2012P4PhraseGlosses = { ...passage2012P4CollocationGlosses, ...reviewed.glosses };
export function getPassage2012P4WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2012P4Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2012P4SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2012P4CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
