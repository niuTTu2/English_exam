import type { PhraseKnowledge } from "./knowledge-base";

type Seed = [string, string, string[], string, string, string, string, string];
const seeds: Seed[] = [
  ["over-past-period", "over the past + period", ["Over the past decade"], "在过去某段时间里", "时间状语；over后接完整时段，时态仍须尊重原句叙述视角。", "Sales have risen over the past decade.", "过去十年销售额有所增长。", "原卷had perfected不因例句用现在完成时而改写。"],
  ["art-of-doing", "the art of doing something", ["the art of creating automatic behaviors"], "做某事的技巧", "名词结构；of后接动名词，说明技巧的内容。", "She mastered the art of listening.", "她掌握了倾听的技巧。", "art在这一结构中不一定指艺术作品。"],
  ["in-response-to", "in response to something", ["in response to"], "对……作出反应", "原因或反应触发状语；to为介词，接名词或动名词。", "He smiled in response to the greeting.", "他以微笑回应问候。", "不要把to当作不定式标记。"],
  ["large-amounts-of", "hundreds / billions of + noun", ["billions of dollars", "hundreds of millions of dollars"], "数十亿；数亿", "不确定大数量；数词加s并接of；确数后的数词不加s。", "They invested hundreds of millions of dollars.", "他们投入了数亿美元。", "hundreds of millions为数亿，不是几百万；billion为十亿。"],
  ["without-doing", "without doing something", ["without thinking"], "不做某事；没有经过某过程", "介词短语作方式状语；without之后用名词性形式。", "She answered without thinking.", "她不假思索地作了回答。", "不能直接接有独立时态的谓语。"],
  ["figure-out", "figure out something / how to do", ["figure out"], "弄清；想出办法", "动词短语；可接名词或疑问不定式作宾语。", "We must figure out how to help.", "我们必须想出怎样提供帮助。", "figure单独的数字或人物义不适用于此搭配。"],
  ["learn-from", "learn from somebody", ["learn from private industry"], "向……学习", "来源状语；from引出知识或经验的来源。", "We can learn from other companies.", "我们可以向其他公司学习。", "learn from说来源；learn how to说学习内容。"],
  ["turn-to-help", "turn to somebody", ["turned to"], "向……求助", "动词加介词；to引求助对象。", "She turned to a teacher for help.", "她向老师求助。", "关系从句中to可以留在句末，宾语由关系代词承担。"],
  ["introduce-routine", "introduce a new routine", ["introduce new routines"], "引入新的惯常程序", "动宾搭配；introduce表示使某做法开始采用。", "They introduced a new cleaning routine.", "他们引入了新的清洁程序。", "不是把习惯介绍给人认识的社交用法。"],
  ["manufactured-habits", "manufactured habits", ["manufactured habits"], "人为塑造的习惯", "过去分词作前置定语；habit是被塑造的对象。", "Advertising can encourage manufactured habits.", "广告能够助长人为塑造的习惯。", "manufactured不一定是实体工厂制造，本文用于行为。"],
  ["brush-teeth", "brush one's teeth", ["brushed their teeth"], "刷牙", "动宾结构；物主代词与动作主体对应，teeth为复数。", "He brushes his teeth twice a day.", "他每天刷牙两次。", "tooth的复数是teeth，不是tooths。"],
  ["twice-a-day", "twice a day", ["twice a day"], "每天两次", "频率状语；a表示每一，不是特定某一天。", "Use it twice a day.", "每天使用两次。", "twice已含两次，不再加times。"],
  ["pearly-whites", "pearly whites", ["pearly whites"], "洁白的牙齿", "形象性名词短语；whites指牙齿，pearly形容珍珠般洁白。", "She showed her pearly whites when she smiled.", "她微笑时露出洁白的牙齿。", "不是珍珠，也不是族群称呼。"],
  ["outside-of", "outside of something", ["outside of a meal"], "在……之外", "时间或范围状语；本文指用餐以外的时段。", "They rarely meet outside of work.", "他们很少在工作之外见面。", "根据宾语辨别抽象范围，不机械理解为空间。"],
  ["all-day-long", "all day long", ["all day long"], "一整天", "持续时间状语；long后置加强持续意味。", "It rained all day long.", "雨下了一整天。", "不是每天，every day才强调日复一日。"],
  ["bottled-water", "bottled water", ["bottled water"], "瓶装水", "过去分词定语加名词；水是被装瓶的对象。", "She bought bottled water.", "她买了瓶装水。", "bottling为装瓶动作，bottled为已经装瓶的状态。"],
  ["feature-as", "feature something as something", ["as a breath freshener"], "将……重点宣传为……", "as引角色或产品定位；本文位于被动谓语is featured之后。", "The product is featured as a breath freshener.", "该产品被重点宣传为口气清新用品。", "广告赋予的定位不等于作者独立证实的效果。"],
  ["after-meal", "after a meal", ["after a meal"], "饭后", "时间状语；after后接名词。", "They walked after a meal.", "他们饭后散步。", "此处没有独立主谓，不当成时间从句。"],
  ["part-of-whole", "(as) part of something", ["as part of", "part of daily or weekly patterns"], "（作为）……的一部分", "part为中心名词；of引整体，as可引身份或角色。", "Exercise is part of her daily routine.", "运动是她日常生活的一部分。", "part与whole表示部分整体关系，不是part from离别。"],
  ["put-on-makeup", "put on makeup", ["putting on makeup"], "化妆", "动词短语接名词宾语；putting用于名词性活动。", "She put on makeup before leaving.", "她出门前化了妆。", "put on clothing为穿衣，makeup决定此处为化妆。"],
  ["retire-from", "retire from an organization", ["retired from"], "从某机构退休", "不及物动词加来源短语；from引原工作单位。", "He retired from the company last year.", "他去年从公司退休。", "retire不直接接公司作宾语。"],
  ["essential-to-doing", "be essential to doing something", ["essential to making new products commercially viable"], "对做某事至关重要", "形容词补足语；to为介词，接动名词。", "Trust is essential to building a team.", "信任对建立团队至关重要。", "不要把介词to后面的动名词改成原形动词。"],
  ["tie-a-to-b", "tie A to B", ["tying certain behaviors to habitual cues"], "把A与B联系起来", "动词宾语及介词补足语；A是行为，B是提示。", "The campaign ties exercise to a daily cue.", "这项宣传把运动与一个日常提示关联起来。", "tying保留ie变y的拼写，不能写tieing。"],
  ["be-used-to-do", "be used to do something", ["have been used to sell"], "被用来做某事", "被动谓语加目的不定式；have been使其成为完成时被动。", "The method has been used to save time.", "这种方法已被用来节省时间。", "区别used to do过去常常与be used to doing习惯于。"],
];
export const passage2010P3PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, canonical, , meaning, rule, english, chinese, pitfall]) => [key, { key, canonical, type: "消费习惯语篇搭配", meaning, summary: `${meaning}。${rule}`, grammarRole: rule, structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall] }]));
export const passage2010P3PhraseAliases: Record<string, string> = Object.fromEntries(seeds.flatMap(([key, canonical, sources]) => [...sources, canonical].map(source => [source.toLowerCase(), key])));
passage2010P3PhraseAliases["between hair brushing and putting on makeup"] = "between-a-and-b";
export const passage2010P3CollocationGlosses = Object.fromEntries(seeds.flatMap(([, , sources, meaning, note]) => sources.map(source => [source.toLowerCase(), { meaning, note }])));
