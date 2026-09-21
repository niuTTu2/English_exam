import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow, type ReviewedEntry } from "./2011-content-helpers";

const rows: LexiconRow[] = [
  ["pick", "picks picked picking", "v.", "选择；挑出", "pick a date 表示从时间范围中任选一个日期。", "pick a date（选一个日期）", "choose 更中性；pick 常带从若干对象中随手选取之意。"],
  ["have", "has had having i've", "aux./v.", "已经；拥有", "I've been able to 是现在完成时，说明能力从四岁持续至今。", "have been able to（一直能够）", "本句 have 是完成时助动词，不是拥有某物。"],
  ["four", "", "number", "四；四岁", "I was four 中数词作年龄表语，意为我四岁时。", "be four years old（四岁）", "不是四个人；年龄语境可省略 years old。"],
  ["absorb", "absorbs absorbed absorbing", "v.", "吸收；接收", "my brain absorbs information 指大脑接收并记住信息。", "absorb information（吸收信息）", "take in 也可表示理解吸收；absorb 更正式。"],
  ["cope", "copes coped coping", "v.", "应付；处理", "mind is able to cope 指思维能应付庞大信息量。", "be able to cope（能够应付）", "manage 可接具体任务；cope 常强调在压力下应付。"],
  ["sad", "sadder saddest", "adj.", "悲伤的", "a sad memory 指会引发悲伤的一段记忆。", "a sad memory（悲伤的记忆）", "unhappy 更宽泛；sad 直接描述悲伤情绪。"],
  ["memory", "memories", "n.", "记忆；回忆", "既可指记忆能力，也可指一段具体往事，需按句区分。", "a clear memory（清晰的记忆）", "recollection 偏具体回忆；memory 也可表示整体记忆力。"],
  ["broadway", "", "proper n.", "百老汇", "on Broadway 指音乐剧在纽约百老汇商业剧场上演。", "open on Broadway（在百老汇开演）", "专名不按 broad 与 way 拆译。"],
  ["pop", "pops popped popping", "v.", "突然出现；跃入", "pop into my mind 指记忆突然浮现在脑海。", "pop into one's mind（突然浮现）", "appear 中性表示出现；pop 强调突然、自然地冒出。"],
  ["instantly", "", "adv.", "立刻；马上", "know instantly 强调能立即提取某天的信息。", "know instantly（立即知道）", "immediately 含义接近；instantly 更突出毫无延迟。"],
  ["overwhelm", "overwhelms overwhelmed overwhelming", "v.", "使不堪重负；压垮", "feel overwhelmed with information 表示因信息量过大而承受不住。", "feel overwhelmed（感到不堪重负）", "overload 侧重负荷过量；overwhelm 也包含强烈心理感受。"],
  ["store", "stores stored storing", "v.", "储存；保存", "information is stored away neatly 指信息被有条理地保存。", "store information（储存信息）", "save 可指避免丢失；store 强调收存。"],
  ["neatly", "", "adv.", "整齐地；有条理地", "比喻信息在记忆中被有序归档。", "be neatly stored（被整齐存放）", "tidily 多指外观整洁；neatly 也可指安排有序。"],
  ["clear", "clearer clearest", "adj.", "清晰的；清楚的", "memory is clearer 只说明回忆清晰度，不表示情绪更强。", "a clear memory（清晰的记忆）", "vivid 可描述鲜明体验；clear 更强调不模糊。"],
  ["grandfather", "grandfathers", "n.", "祖父；外祖父", "叙述者回忆祖父去世的那一天。", "my grandfather（我的祖父）", "原文不说明父系或母系，中文参考按祖父处理。"],
  ["die", "dies died dying", "v.", "去世；死亡", "my grandfather died 说明祖父去世的日期。", "the day someone died（某人去世的那天）", "pass away 更委婉；die 是中性直接表达。"],
  ["sadness", "", "n.", "悲伤；悲痛", "the sadness I felt 指去医院时的悲伤感受。", "feel sadness（感到悲伤）", "sad 是形容词；sadness 是抽象名词。"],
  ["musical", "musicals", "adj./n.", "音乐的；音乐剧", "the musical play Hair 指音乐剧《毛发》。", "a musical play（音乐剧）", "music 是音乐；musical 可作形容词，也可作名词指音乐剧。"],
  ["open", "opens opened opening", "v.", "开演；首演", "the musical play Hair opened on Broadway 表示该剧在百老汇首演。", "open on Broadway（在百老汇开演）", "这里不是打开门窗，而是演出开幕。"],
];

const reviewed = reviewedLexicon(rows);
export const translation2013Lexicon: Record<string, ReviewedEntry> = reviewed.entries;
export const translation2013LemmaAliases: Record<string, string> = { ...reviewed.aliases, "i've": "have" };
export const translation2013FormPartOfSpeech: Record<string, string> = Object.fromEntries(rows.flatMap(([headword, forms, pos]) => [[headword, pos], ...forms.split(" ").filter(Boolean).map(form => [form, pos])]));

export const translation2013SentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2013-translation-s1": {
    pick: { partOfSpeech: "v.", contextualMeaning: "任选；挑出", use: "pick a date from the past 53 years 表示从过去53年中任取一天。" },
    date: { partOfSpeech: "n.", contextualMeaning: "日期", use: "与where、news、day of the week共同限定具体某一天，不是约会。" },
    instantly: { partOfSpeech: "adv.", contextualMeaning: "立刻；马上", use: "修饰know，强调无需费力检索便能提取记忆。" },
    news: { partOfSpeech: "n. uncountable", contextualMeaning: "新闻；新闻事件", use: "what happened in the news 指当天新闻报道的事件。" },
  },
  "2013-translation-s2": {
    have: { partOfSpeech: "aux.（I've）", contextualMeaning: "标记现在完成时", use: "I've been able to 与since连用，表示能力从四岁起持续到现在。" },
    since: { partOfSpeech: "conj.", contextualMeaning: "自从……以来", use: "引出持续能力的时间起点。" },
    four: { partOfSpeech: "number used as complement", contextualMeaning: "四岁", use: "was four 是年龄表达，完整义为四岁时。" },
  },
  "2013-translation-s3": {
    overwhelm: { partOfSpeech: "v.-ed（表语形容词）", contextualMeaning: "使不堪重负；压垮", use: "feel overwhelmed with information 表示因信息量太大而难以承受。" },
    amount: { partOfSpeech: "n.", contextualMeaning: "数量", use: "the amount of information 搭配不可数information。" },
    brain: { partOfSpeech: "n.", contextualMeaning: "大脑", use: "作absorbs的主语，说明信息进入记忆系统。" },
    absorb: { partOfSpeech: "v.（absorbs）", contextualMeaning: "吸收；接收", use: "my brain absorbs information 指大脑接收并记住信息。" },
  },
  "2013-translation-s4": {
    mind: { partOfSpeech: "n.", contextualMeaning: "思维；头脑", use: "与information的储存能力相连，不只指一条想法。" },
    cope: { partOfSpeech: "v.", contextualMeaning: "应付；处理", use: "seems to be able to cope 指能处理前句所说的大量信息。" },
    store: { partOfSpeech: "v.-ed（被动）", contextualMeaning: "储存；保存", use: "is stored away 表示信息被收存起来。" },
    neatly: { partOfSpeech: "adv.", contextualMeaning: "有条理地；整齐地", use: "比喻信息在记忆中被有序归档。" },
  },
  "2013-translation-s5": {
    memory: { partOfSpeech: "n.", contextualMeaning: "一段回忆；往事", use: "a sad memory 是某一具体悲伤往事，不是整体记忆力。" },
    do: { partOfSpeech: "v.", contextualMeaning: "采取同样做法", use: "I do what everybody does 中第二个does代替通常的应对动作。" },
    it: { partOfSpeech: "pron.", contextualMeaning: "这段悲伤回忆", use: "put it to one side 中it回指a sad memory。" },
    side: { partOfSpeech: "n.", contextualMeaning: "一旁（习语组成）", use: "put something to one side 整体表示暂时搁置、不去想。" },
  },
  "2013-translation-s6": {
    think: { partOfSpeech: "v.", contextualMeaning: "认为；觉得", use: "don't think 是否定前移，中文按从句内容译为不觉得更难。" },
    hard: { partOfSpeech: "adj.（比较级harder）", contextualMeaning: "更难承受的", use: "harder for me 说处理悲伤记忆是否更困难。" },
    clear: { partOfSpeech: "adj.（比较级clearer）", contextualMeaning: "更清晰的", use: "修饰memory的清晰程度，不等于情绪更强烈。" },
  },
  "2013-translation-s7": {
    powerful: { partOfSpeech: "adj.", contextualMeaning: "强大的；出色的", use: "修饰整体记忆能力。" },
    memory: { partOfSpeech: "n. uncountable", contextualMeaning: "记忆力", use: "本句指能力，不是某段往事。" },
    acute: { partOfSpeech: "adj.", contextualMeaning: "强烈的；敏锐的", use: "与vivid并列作emotions的宾语补足语，描述情绪强度。" },
    vivid: { partOfSpeech: "adj.", contextualMeaning: "鲜明的；生动的", use: "说明情绪体验是否更鲜活，不是记忆画面本身。" },
  },
  "2013-translation-s8": {
    recall: { partOfSpeech: "v.", contextualMeaning: "回想起；记起", use: "接去世日期与当时悲伤两项并列宾语。" },
    day: { partOfSpeech: "n.", contextualMeaning: "那一天；日期", use: "第一处为祖父去世日，the day before为其前一天。" },
    before: { partOfSpeech: "adv.", contextualMeaning: "前一天；此前", use: "the day before 以祖父去世那一天为参照。" },
    hospital: { partOfSpeech: "n.", contextualMeaning: "医院", use: "went to the hospital 是前一天发生的行动。" },
  },
  "2013-translation-s9": {
    hair: { partOfSpeech: "proper n.", contextualMeaning: "《毛发》（音乐剧名）", use: "Hair 是音乐剧名称，不按普通名词头发理解。" },
    open: { partOfSpeech: "v.-ed（opened）", contextualMeaning: "首演；开幕", use: "a musical play opened on Broadway 表示作品在百老汇开演。" },
    broadway: { partOfSpeech: "proper n.", contextualMeaning: "百老汇", use: "on Broadway 指百老汇商业剧场体系。" },
    they: { partOfSpeech: "pron.", contextualMeaning: "这两件事", use: "they both 回指祖父去世与音乐剧同日首演。" },
    pop: { partOfSpeech: "v.", contextualMeaning: "突然浮现", use: "pop into my mind 表示两件事以同样方式自动跃入脑海。" },
  },
};
