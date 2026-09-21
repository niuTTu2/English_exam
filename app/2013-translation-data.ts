import type { SentenceAnalysis, TranslationTask } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2013-translation");

export const translation2013Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("I ", "subject", "人称代词", "主语", "can pick与know的施事", "第一人称叙述记忆能力。"),
    segment("can pick a date from the past 53 years ", "predicate", "情态动词加动词原形", "第一谓语及宾语", "说明可任取的时间范围", "pick a date表示任选一个日期；from限定过去53年。"),
    segment("and know instantly ", "connector", "and连接并列谓语", "第二谓语", "与can pick共用主语和情态范围", "instantly表示无需检索便立刻知道。"),
    segment("where I was, what happened in the news and even the day of the week.", "object", "三个并列的间接疑问内容", "know的宾语", "where、what及the day并列", "where I was和what happened都是陈述语序；even强调连星期几也记得。"),
  ], "I can pick a date and know where I was, what happened and the day of the week.", "我可以从过去53年中随便挑一个日期，并立刻知道当时我在哪里、新闻中发生了什么，甚至那天是星期几。", "过去53年里的任何一天，我都能立刻说出自己当时身在何处、当天有什么新闻，甚至是星期几。", "开篇用三个并列信息维度展示异常清晰的自传体记忆。", [], [
    clause("where I was", "间接疑问宾语从句", "where", "作know的第一项宾语", "I", "was", "where所指地点", "译为我当时在哪里，保持陈述语序。"),
    clause("what happened in the news", "间接疑问宾语从句", "what", "作know的第二项宾语", "what", "happened", "in the news", "译为新闻中发生了什么。"),
  ]),
  sentence(2, [
    segment("I've been able to do this ", "predicate", "现在完成时结构", "主句", "I为省略显示的主语", "have been able to表示这种能力从过去持续至今；this回指上一句能力。"),
    segment("since I was four.", "condition", "since时间从句", "持续起点状语", "限定have been able", "was four表示四岁，不是四个人。"),
  ], "I've been able to do this since I was four.", "从四岁起，我就一直能够做到这一点。", "我从四岁开始就有这种能力。", "补充能力出现的时间起点，说明并非近期训练结果。", [], [
    clause("since I was four", "时间状语从句", "since", "说明能力持续的起点", "I", "was", "four（年龄表语）", "译为从我四岁起，并与主句现在完成时连读。"),
  ]),
  sentence(3, [
    segment("I ", "subject", "人称代词", "主语", "feel的感受者", "继续以第一人称说明体验。"),
    segment("never feel overwhelmed ", "predicate", "频率副词加系表结构", "谓语", "说明面对信息量时的感受", "overwhelmed表示不堪重负；never不能漏译。"),
    segment("with the amount of information ", "modifier", "with介词短语", "引出压力来源", "修饰overwhelmed", "the amount of后接不可数information。"),
    segment("my brain absorbs.", "modifier", "省略关系代词的定语从句", "限定information", "my brain为从句主语", "information是absorbs的宾语先行词；不能译成信息吸收大脑。"),
  ], "I never feel overwhelmed with the amount of information my brain absorbs.", "面对大脑所吸收的大量信息，我从不感到不堪重负。", "尽管大脑吸收的信息很多，我从不会因此觉得承受不了。", "先排除强大记忆带来的信息负荷问题。", [], [
    clause("my brain absorbs", "省略宾语关系代词的定语从句", "省略that/which", "限定information", "my brain", "absorbs", "省略关系代词，回指information", "先译大脑吸收的信息，再处理主句感受。"),
  ]),
  sentence(4, [
    segment("My mind ", "subject", "名词短语", "主语", "seems的主语", "mind指思维和记忆系统，不单指生理大脑。"),
    segment("seems to be able to cope ", "predicate", "seem加不定式及能力结构", "谓语", "评价处理信息的能力", "cope在此指应付信息量，常可接with；原句此处不带with宾语。"),
    segment("and the information ", "subject", "and连接第二分句主语", "并列分句主语", "is stored的承受者", "the information回指大脑吸收的信息。"),
    segment("is stored away neatly.", "predicate", "一般现在时被动语态", "第二分句谓语", "说明信息保存状态", "store away表示收存；neatly比喻有条理地归档。"),
  ], "My mind seems to be able to cope and the information is stored away neatly.", "我的思维似乎能够应付这些信息，而且信息会被整齐地储存起来。", "我的大脑似乎应付自如，所有信息都能有条理地存放好。", "以有序储存解释为何大量记忆没有造成压垮感。", []),
  sentence(5, [
    segment("When I think of a sad memory, ", "condition", "when时间从句", "情境状语", "限定主句的应对动作", "think of表示想起；sad限定memory。"),
    segment("I do what everybody does – ", "predicate", "主谓宾含what从句", "主句", "what everybody does作do的宾语", "第一个do是采取同样做法，what从句概括所有人通常的反应。"),
    segment("try to put it to one side.", "modifier", "破折号后省略主语的解释", "具体说明所做之事", "it回指sad memory", "put it to one side表示暂时搁置，不是把实体物品移到一旁。"),
  ], "When I think of a sad memory, I do what everybody does — try to put it to one side.", "当我想起一段悲伤的记忆时，我会像所有人一样——努力把它暂时搁在一边。", "想起伤心往事时，我和大家的做法一样：尽量先不去想它。", "说明记忆虽清晰，情绪调节方式仍与普通人相同。", [], [
    clause("When I think of a sad memory", "时间状语从句", "When", "限定主句发生情境", "I", "think of", "a sad memory", "先译想起悲伤记忆时，再译应对方式。"),
    clause("what everybody does", "融合关系代词what引导的宾语从句", "what", "作do的宾语", "everybody", "does", "what兼具所做之事的含义", "译为大家都会做的事。"),
  ]),
  sentence(6, [
    segment("I don't think ", "predicate", "否定主句谓语", "主句", "引出判断内容", "英语常把宾语从句的否定前移到think；中文宜按内容译为并不更难。"),
    segment("it's harder for me ", "object", "省略that的宾语从句", "think的内容", "it为情境性主语", "harder为比较级，但比较对象由语境中的其他人补足。"),
    segment("just because my memory is clearer.", "condition", "because原因从句受just限定", "被否定的单一理由", "my memory为从句主语", "作者否认仅因记忆更清晰就更难应对，并非否认记忆清晰。"),
  ], "I don't think it's harder for me just because my memory is clearer.", "我不认为仅仅因为我的记忆更清晰，这对我来说就更难。", "我并不觉得记得更清楚，就会让我更难承受这些往事。", "否定‘记忆清晰必然加重负担’这一推论。", [], [
    clause("it's harder for me just because my memory is clearer", "省略that的宾语从句", "省略that", "作think的宾语", "it", "is", "harder for me", "按否定前移理解为我不觉得这更难。"),
    clause("because my memory is clearer", "原因状语从句", "because", "说明被否定的单一原因", "my memory", "is", "clearer", "译为仅仅因为我的记忆更清晰。"),
  ]),
  sentence(7, [
    segment("Powerful memory ", "subject", "名词短语", "主语", "doesn't make的施事", "指强大的记忆能力，不是某一段具体记忆。"),
    segment("doesn't make ", "predicate", "助动词否定加动词原形", "谓语", "连接记忆与情绪变化", "make采用复合宾语结构。"),
    segment("my emotions ", "object", "名词短语", "宾语", "被评价是否改变的对象", "emotions为各种情绪感受。"),
    segment("any more acute or vivid.", "modifier", "比较级形容词并列", "宾语补足语", "说明emotions的强度与鲜明度", "any more在否定句中表示并不更；acute为强烈，vivid为鲜明。"),
  ], "Powerful memory doesn't make my emotions any more acute or vivid.", "强大的记忆力并不会使我的情绪变得更强烈或更鲜明。", "记忆力再强，也没有让我的情绪比别人更尖锐、更鲜活。", "进一步区分记忆清晰度与情绪强度。", []),
  sentence(8, [
    segment("I ", "subject", "人称代词", "主语", "can recall的施事", "叙述具体悲伤记忆。"),
    segment("can recall ", "predicate", "情态动词加动词原形", "谓语", "引出两项并列回忆", "recall表示回想起，不只是识别。"),
    segment("the day my grandfather died ", "object", "名词加省略when的定语从句", "第一宾语", "my grandfather died限定the day", "关系副词when省略，died为不及物动词。"),
    segment("and the sadness I felt ", "object", "并列名词加省略关系代词从句", "第二宾语", "I felt限定sadness", "sadness是felt的宾语先行词。"),
    segment("when we went to the hospital the day before.", "condition", "when时间从句及时间名词短语", "限定felt", "we为从句主语", "the day before指祖父去世前一天，不是说去医院后的第二天。"),
  ], "I can recall the day my grandfather died and the sadness I felt when we went to the hospital.", "我能回想起祖父去世的那一天，也记得前一天我们去医院时我感到的悲伤。", "祖父去世那天，以及此前一天我们去医院时的悲痛，我都记得清清楚楚。", "用家庭悲剧作为情感记忆的具体例子，并建立前一天与去世日的时间关系。", [], [
    clause("my grandfather died", "省略关系副词when的定语从句", "省略when", "限定the day", "my grandfather", "died", "无宾语", "译为祖父去世的那一天。"),
    clause("I felt", "省略宾语关系代词的定语从句", "省略that/which", "限定the sadness", "I", "felt", "省略关系代词，回指sadness", "译为我感到的悲伤。"),
    clause("when we went to the hospital the day before", "时间状语从句", "when", "限定felt", "we", "went", "to the hospital；the day before为时间", "译为此前一天我们去医院时。"),
  ]),
  sentence(9, [
    segment("I also remember ", "predicate", "主谓宾引导", "主句", "also把另一类记忆加入", "remember后接that内容从句。"),
    segment("that the musical play Hair opened on Broadway on the same day – ", "object", "that宾语从句", "remember的内容", "the musical play Hair为从句主语", "Hair是音乐剧名；opened表示首演开幕，两个on分别引地点和日期。"),
    segment("they both just pop into my mind in the same way.", "connector", "破折号后解释分句", "总结两类记忆出现方式", "they指祖父去世与音乐剧首演两件事", "pop into my mind表示突然浮现；both与in the same way强调并列方式相同。"),
  ], "I remember that the musical play Hair opened on Broadway on the same day — they both pop into my mind in the same way.", "我还记得，音乐剧《毛发》在同一天于百老汇首演——这两件事会以同样的方式突然浮现在我的脑海中。", "我也记得，音乐剧《毛发》恰好同一天在百老汇开演；这两段记忆会以同样方式一起跃入脑海。", "把私人悲剧与公共文化事件并置，显示记忆系统不按情感重要性筛选出现方式。", [], [
    clause("that the musical play Hair opened on Broadway on the same day", "宾语从句", "that", "作remember的宾语", "the musical play Hair", "opened", "on Broadway；on the same day", "先译记得的事件，再说明地点与同一天。"),
  ]),
];

export const translation2013Paragraphs = [translation2013Sentences.slice(0, 2), translation2013Sentences.slice(2)];
export const translation2013ArticleParagraphs = translation2013Paragraphs.map((paragraph, index) => ({
  id: `2013-translation-p${index + 1}`,
  sentenceIds: paragraph.map(item => item.id),
}));

export const translation2013Tasks: TranslationTask[] = [{
  id: 201346,
  number: 46,
  format: "passage",
  points: 15,
  sentenceId: "2013-translation-s1",
  prompt: "第46题：把两段英文完整译成中文，整篇一次作答，15分。参考译文仅供对照学习，不作自动评分。",
  source: translation2013Paragraphs.map(paragraph => paragraph.map(item => item.text).join(" ")).join("\n\n"),
  answer: translation2013Paragraphs.map(paragraph => paragraph.map(item => item.natural).join("")).join("\n\n"),
  locating: "两段九句。第一段概括可按任意日期提取地点、新闻与星期信息的能力；第二段说明信息不会造成过载，并用祖父去世与音乐剧《Hair》首演同日的并列记忆说明：记忆清晰并不会自动加强情绪。注意don't think的否定前移、any more的比较否定、the day before的时间指向，以及they both回指两件事。",
  paragraphs: translation2013Paragraphs,
}];
