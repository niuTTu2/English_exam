import type { VocabEntry } from "./data";
import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";

type Structure = NonNullable<VocabEntry["structures"]>[number];

const s = (
  pattern: string,
  meaning: string,
  rule: string,
  english: string,
  chinese: string,
): Structure => ({
  pattern,
  meaning,
  rule,
  examples: [{ english, chinese }],
});

type Definition = {
  key: string;
  source: string;
  canonical: string;
  type: string;
  meaning: string;
  grammarRole: string;
  rule: string;
  english: string;
  chinese: string;
  pitfalls: string[];
};

const d = (
  key: string,
  source: string,
  canonical: string,
  type: string,
  meaning: string,
  grammarRole: string,
  rule: string,
  english: string,
  chinese: string,
  pitfalls: string[],
): Definition => ({ key, source, canonical, type, meaning, grammarRole, rule, english, chinese, pitfalls });

const definitions: Definition[] = [
  d("new-movement-in-art", "a new movement in art", "a/an + movement in + field", "艺术名词短语", "一种新的艺术思潮", "名词短语；movement 的后置领域说明", "movement 是可数名词，in art 说明思潮所属领域；a new 修饰单数名词。", "A new movement in art soon attracted attention.", "一种新的艺术思潮很快引起了注意。", ["movement in art 指艺术流派或思潮，不是身体动作；a new 不能省略冠词。"]),
  d("attain-certain-fashion", "attain a certain fashion", "attain + a certain + noun", "动词搭配", "形成某种风尚 / 达到某种流行形式", "谓语动词 + 名词宾语", "attain 后接目标、水平或状态；certain 表示未具体说明但确定存在的一个对象。", "The style attained a certain fashion among young readers.", "这种风格在年轻读者中形成了某种风尚。", ["attain 强调经过发展达到，不等于 obtain（获得具体物品）；fashion 在此是风尚，不是服装。"]),
  d("advisable-to", "it is advisable to", "it is advisable to do sth", "形式主语结构", "最好 / 可取的是做某事", "it 作形式主语，不定式作真正主语", "advisable 是表语形容词，to do 是真正的主语；不要把 it 当具体事物翻译。", "It is advisable to check the evidence first.", "最好先核对证据。", ["advisable to do 表建议，不是强制命令；不能写成 *advisable doing。"]),
  d("find-out", "find out", "find out + fact / wh-clause", "动词短语", "查明；弄清", "及物短语动词", "out 是小品词，find out 后接事实、宾语从句或疑问词从句；与单纯 find 的‘找到’不同。", "We need to find out what the rule means.", "我们需要弄清这条规则是什么意思。", ["不要把 find out 拆成‘找到外面’；find out 后接宾语时不能漏掉 out。"]),
  d("aim-at", "aiming at", "aim at + noun / doing", "动词介词搭配", "以……为目标；旨在", "现在分词短语；aim at 的介词宾语", "aim at 后接名词或动名词；主语与 aim 的执行者一致时可用 aiming。", "The project is aimed at improving access.", "该项目旨在改善获取机会。", ["aim at doing 与 aim to do 都可表示‘旨在’，但 aim at 后不能接动词原形。"]),
  d("years-to-come", "in years to come", "in + period + to come", "时间介词短语", "在未来若干年里 / 多年以后", "时间状语", "to come 后置修饰 years，表示尚未来临的几年；in 引出时间范围。", "In years to come, the idea may seem normal.", "多年以后，这个想法可能会显得正常。", ["in years to come 指未来，不是 in years ago；不要把 to come 当成目的不定式。"]),
  d("regarded-as", "be regarded as normal", "be regarded as + complement", "被动分类结构", "被视为正常", "be + 过去分词 + as 补足语", "regard A as B 的被动式是 A be regarded as B；as 后接身份、类别或性质。", "The method is regarded as reliable.", "这种方法被视为可靠。", ["不能漏掉 as；be regarded 不等于‘被尊敬’，本句强调分类或看法。"]),
  d("with-regard-to", "with regard to", "with regard to + topic", "话题限定短语", "关于；就……而言", "介词短语作话题状语", "regard 在这里是名词，with regard to 后接讨论主题；语气正式。", "With regard to safety, the plan needs revision.", "就安全而言，这个计划需要修改。", ["with regard to 后必须接名词或动名词；不要与 as regards 的单词拼写混淆。"]),
  d("its-advocates", "its advocates", "its + plural noun", "所有格限定名词短语", "它的拥护者；该思潮的支持者", "名词短语；its 作限定词修饰 advocates", "its 后接名词，表示前文 movement 或 poetry 所属的拥护者；advocates 用复数表示一群人。", "Its advocates explained the theory clearly.", "它的拥护者清楚地解释了这套理论。", ["its 是物主限定词，不能单独作主语；advocates 在这里是名词‘拥护者’，不是动词‘提倡’。"]),
  d("rather-difficult", "rather difficult", "rather + adjective", "程度副词结构", "相当困难 / 颇为棘手", "rather 修饰形容词作表语", "rather 放在形容词前表示程度相当高，语气可带保留或负面色彩。", "The decision is rather difficult.", "这个决定颇为困难。", ["rather difficult 不是比较级；rather than 才表示‘而不是’，不要混读。"]),
  d("based-on", "be based on", "be based on + basis", "被动介词搭配", "以……为基础 / 依据", "系动词 + 过去分词形容词", "based 后固定接 on，on 后是依据或基础；主动形式为 base A on B。", "The conclusion is based on reliable data.", "这个结论以可靠数据为依据。", ["不能说 *based in 表‘依据’；based on 与 according to 都可引依据，但句法不同。"]),
  d("hardly-classed-as", "can hardly be classed as Literature", "can hardly be classed as + category", "情态被动与分类结构", "几乎不能被归为文学", "can + hardly + be + past participle", "hardly 是近否定副词，class A as B 表把 A 归入 B；被动后保留 as。", "The text can hardly be classed as fiction.", "这篇文字几乎不能归为小说。", ["hardly 不等于 hard；classed as 后接类别，不能改成 *classed to。"]),
  d("in-brief", "in brief", "in brief", "概括副词短语", "简言之；概括地说", "句子副词 / 插入语", "in brief 可置于句首或句中，压缩前后内容；brief 在这里不是‘简短的’定语。", "In brief, the proposal changes the format.", "简言之，这项提议改变了形式。", ["in brief 与 in short 意思接近；brief 不是 briefcase 的缩写。"]),
  d("conditions-of-life", "past conditions of life", "conditions of life", "名词 + of 结构", "过去的生活状况", "名词短语；of 引出所属范围", "conditions 用复数表示多方面状况，of life 说明这些状况涉及生活整体。", "Conditions of life improved after the reform.", "改革后生活状况有所改善。", ["condition of life 指生活状况，不是‘生命的条件’逐字拼接；conditions 是可数复数。"]),
  d("speeding-up", "conditionally speeding up", "speed up + object / speed up", "动词短语", "加速；加快", "现在完成进行时中的短语动词", "speed up 可不及物表示加速，也可接宾语表示使……加快；本句由 have been 构成持续进行。", "The process is speeding up.", "这个过程正在加速。", ["speed up 不是 speed quickly 的简单替换；有宾语时可说 speed up production。"]),
  d("till-now", "till now", "till now", "时间副词短语", "直到现在", "时间状语", "till now 把过去持续过程连接到现在；与现在完成时或一般现在时搭配。", "Till now, no answer has appeared.", "直到现在仍没有答案出现。", ["till now 与 until now 同义；不要误写成 *to now。"]),
  d("world-of-noise-violence-speed", "a world of noise and violence and speed", "a world of A and B and C", "并列名词短语", "充满噪音、暴力和速度的世界", "名词 + of 内容说明 + 并列", "of 后并列三个抽象名词，重复 and 保留原文节奏；world 是中心名词。", "They live in a world of information and change.", "他们生活在一个充满信息和变化的世界。", ["多个 and 连接的是并列名词，不要把 violence and speed 当成一个复合词。"]),
  d("corresponding-change", "have undergone a corresponding change", "undergo a corresponding change", "动词搭配", "经历相应的变化", "完成时谓语 + 宾语", "undergo 是及物动词，后接 change；corresponding 修饰 change，表示与前文相呼应。", "The system underwent a corresponding change.", "这个系统经历了相应的变化。", ["undergo 本身不接介词；过去式和过去分词都是 underwent / undergone，不要写 *undergoed。"]),
  d("emotional-life", "emotional life", "emotional + life", "形容词 + 名词短语", "情感生活", "名词短语；emotional 作前置定语", "emotional 限定 life 的内容范围，表示人的情感和感受领域；life 在这里是抽象不可数名词。", "Modern work can reshape emotional life.", "现代工作可能重塑情感生活。", ["emotional life 指情感领域，不是‘有情绪的生命’；不要把 emotional 与 sensible 混用。"]),
  d("change-of-expression", "a change of expression", "a change of + noun", "名词 + of 结构", "表达方式的改变", "名词短语；of 引出改变涉及的内容", "change 是中心名词，of expression 说明改变的对象或形式；a 限定一次具体变化。", "The new medium brought a change of expression.", "这种新媒介带来了表达方式的改变。", ["change of expression 表达方式发生变化；change in expression 更强调某个领域或状态中的变化，二者不能机械互换。"]),
  d("speeding-up-of-life", "speeding up of life", "the speeding up of + noun", "动名词名词化结构", "生活的加速", "of 短语作后置修饰", "speeding up 作名词中心语，of life 说明被加速的领域；可用 the 限定。", "The speeding up of life creates pressure.", "生活节奏加快会带来压力。", ["speeding up of life 是名词化结构，不要把 of 后的 life 当动作施事。"]),
  d("new-form-of-expression", "a new form of expression", "a new form of + noun", "名词短语", "新的表达形式", "名词中心语 + of 内容", "form 是中心名词，of expression 说明形式所承载的内容；a new 修饰 form。", "The medium created a new form of expression.", "这种媒介创造了新的表达形式。", ["form of expression 指表达方式，不是表格；expression 也可表示表情，需看语境。"]),
  d("speed-up-our-literature", "speed up our literature", "speed up + possessive + noun", "动词搭配", "加快我们的文学节奏 / 进程", "及物短语动词 + 宾语", "speed up 后接被加快的对象；our literature 中 literature 通常作不可数类别名词。", "New tools can speed up our work.", "新工具可以加快我们的工作。", ["speed up literature 不表示增加作品数量；文学语境中强调节奏或表达速度。"]),
  d("if-we-want-to", "if we want to", "if + subject + want to do", "条件从句", "如果我们想要……", "if 引导真实条件状语从句", "want to 后接动词原形；if 从句说明主句成立的条件，不是 wish 的虚拟愿望。", "If we want to improve, we must practise.", "如果我们想进步，就必须练习。", ["if we want to 后不能直接省略动作动词；不要把 if only 与 only if 混淆。"]),
  d("want-to-do", "want to do sth", "want to do sth", "动词不定式搭配", "想要做某事", "谓语动词 + 不定式宾语", "want 后接 to do，主语通常就是动作执行者；语气直接、日常。", "I want to understand the argument.", "我想理解这个论点。", ["want to do 后接动词原形；不要把 want doing 当作同义结构。"]),
  d("want-sb-to-do", "want sb to do sth", "want sb to do sth", "宾语 + 不定式宾补", "想要某人做某事", "谓语动词 + 宾语 + 不定式宾补", "sb 是 to do 的逻辑主语；与 want to do 的动作执行者不同。", "They want students to read carefully.", "他们希望学生认真阅读。", ["不能照搬 hope sb to do；want 的宾语必须明确写出动作执行者。"]),
  d("want-sth-done", "want sth done", "want sth done", "使役意愿结构", "想要某事被完成 / 处理", "谓语动词 + 宾语 + 过去分词宾补", "过去分词表示宾语承受动作；根据语境也可改用 want to have sth done。", "We want the report checked today.", "我们希望今天把报告检查完。", ["want sth done 不等于 want doing；sth 是被处理对象，不能误作动作执行者。"]),
  d("interpret-modern-stress", "interpret modern stress", "interpret + abstract noun", "动词搭配", "诠释现代生活的压力", "及物动词 + 抽象名词宾语", "interpret 可表示解释、诠释或表现；modern 修饰 stress，限定语境。", "Artists interpret social stress in different ways.", "艺术家以不同方式诠释社会压力。", ["interpret stress 是解释或表现压力，不等于 relieve stress（缓解压力）。"]),
  d("pour-out", "pour out", "pour out + words / feelings", "短语动词", "倾吐；大量涌出", "及物短语动词", "out 是方向和充分程度小品词；宾语可为 words、feelings 等抽象内容。", "She poured out her thoughts.", "她倾吐了自己的想法。", ["pour out 不只表示液体倒出；抽象宾语时常译为‘倾诉 / 涌出’。"]),
  d("large-stream-essential-words", "a large stream of essential words", "a stream of + plural noun", "数量比喻结构", "大量连续涌出的核心词语", "名词 + of 内容结构", "stream 是中心名词，of 后说明连续出现的内容；large 修饰数量规模。", "A stream of essential information arrived.", "大量关键资料连续传来。", ["a stream of 后接内容名词，不是河流地点；essential 在此指不可省的核心词。"]),
  d("unhampered-by", "unhampered by", "be unhampered by + noun", "过去分词形容词结构", "不受……阻碍", "be + 过去分词形容词 + by", "by 后接造成妨碍的因素；unhampered 是 hampered 的否定形式。", "The work continued unhampered by delays.", "工作没有受到延误的阻碍而继续。", ["unhampered by 强调不受阻碍，不等于 free from 所有限制；by 后接阻碍来源。"]),
  d("instead-of", "instead of describing", "instead of + doing", "介词动名词结构", "而不是描述", "介词短语作取舍状语", "of 是介词，后接 describing；前后被比较的动作应保持平行。", "Use an example instead of describing the rule.", "用例子，而不是描述规则。", ["instead of 后不能接动词原形；不要写 *instead describing 或 *instead to describe。"]),
  d("make-up-words", "make up words", "make up + noun", "短语动词", "创造词语", "及物短语动词", "make up 在此表示创造或编造，words 是宾语；另一个常见义是‘组成’。", "Children often make up new words.", "孩子们常常创造新词。", ["make up words 不是‘给词化妆’；make up 与 make out、make for 意义不同。"]),
  d("imitate-them", "that imitate them", "imitate + object pronoun", "定语从句片段", "模仿它们（声音）", "关系从句中的谓语 + 宾语", "imitate 是及物动词，them 作宾语并回指 sounds；关系代词 that 修饰 words。", "The recordings imitate them accurately.", "这些录音准确地模仿它们。", ["them 是宾格，不能作主语；这里 them 指声音，不指人。"]),
  d("on-same-page", "on the same page", "on the same + noun", "地点介词短语", "在同一页上", "地点状语 / 后置修饰", "on 表示页面接触，the same 表示同一；也可引申为观点一致。", "The two examples appear on the same page.", "两个例子出现在同一页上。", ["same 通常与 the 连用；on the same page 的引申义‘达成共识’需有语境支持。"]),
  d("at-will", "at will", "at will", "方式介词短语", "随意地；按照意愿", "方式状语", "will 在这里是名词，at will 表示不受限制地按意愿行动，不是将来时。", "Users may change the settings at will.", "用户可以随意更改设置。", ["at will 与 will do 的 will 词性不同；不要把它译成‘在将来’。"]),
  d("descriptions-of-battles", "descriptions of battles", "description(s) of + topic", "名词 + of 结构", "对战斗的描写", "名词短语；of 引出描写对象", "description 是中心名词，of 后接被描写的对象；battles 用复数表示一类场景。", "The book contains vivid descriptions of battles.", "这本书有生动的战斗描写。", ["description of battles 是‘对战斗的描写’，不是‘战斗描述某物’；中心词是 description。"]),
  d("little-upsetting", "a little upsetting", "a little + adjective", "程度结构", "有点令人不安", "it is + adjective 的表语部分", "a little 修饰形容词 upsetting，表示程度轻微；upsetting 描述事物造成的感受。", "The news was a little upsetting.", "这消息有点令人不安。", ["a little upsetting 与 a little upset 不同：前者使人不安，后者通常描述人的感受。"]),
  d("explanatory-notes", "in the explanatory notes", "explanatory + plural noun", "名词短语", "在说明性注释中", "介词短语中的名词短语", "explanatory 是 explain 的形容词，notes 是可数复数；in 指信息所在的文字范围。", "The answer appears in the explanatory notes.", "答案出现在说明性注释中。", ["explanatory 修饰 notes，不是 explain 的过去式；notes 在这里不是‘音符’。"]),
  d("fight-between-officers", "a fight between a Turkish and a Bulgarian officer", "a fight between A and B", "名词搭配", "一名土耳其军官与一名保加利亚军官之间的战斗", "名词中心语 + between 双方", "between 连接两个平行人物；第二个 officer 仍是单数，因为 each has a。", "The report describes a fight between two officers.", "报告描述了两名军官之间的一场战斗。", ["between 后连接双方，不要改成 *between a Turkish to a Bulgarian officer；国籍形容词首字母大写。"]),
  d("off-which", "off which", "off which + clause", "介词提前的定语从句", "从其上 / 从那里", "介词 + 关系代词引导定语从句", "off 与 which 一起指代 bridge；which 在从句中作介词宾语，不能换成 who。", "The bridge off which they fell was old.", "他们掉下去的那座桥很旧。", ["off which 不能拆成 *off that；介词提前时 which 指物，口语可说 which they fell off。"]),
  d("fall-into-river", "fall into the river", "fall into + place", "动词介词搭配", "掉进河里", "不及物动词 + 方向介词", "into 表示运动进入终点；fall 不需要宾语，地点由 into 短语补充。", "The leaves fell into the river.", "树叶掉进了河里。", ["fall into 表运动，静态位置用 be in；不要把 into 换成 *at。"]),
  d("consists-of", "consists of", "consist of + components", "动词介词搭配", "由……组成", "系动词性质的及物搭配", "consist of 后接组成部分，主语是整体；通常不使用被动 *be consisted of。", "The course consists of six units.", "这门课程由六个单元组成。", ["consist 后固定用 of；comprise 可直接接组成部分，不能机械套用 consist 的语序。"]),
  d("noise-of-falling", "the noise of their falling", "the noise of + gerund / possessive", "名词 + of 动名词结构", "他们坠落的声音", "名词中心语 + of 动名词复合结构", "of 后的 falling 是动名词，their 是逻辑主语；noise 是被听到的声音。", "We heard the noise of the machine starting.", "我们听到了机器启动的声音。", ["their falling 中 falling 是名词化动作，不是进行时；不要把 of 误当成简单所属。"]),
  d("weights-of-officers", "the weights of the officers", "the weight(s) of + person / thing", "名词 + of 所属结构", "军官们的体重", "名词短语；of 引出所属者", "weights 用复数表示两名军官各自的重量；the officers 指前文两人。", "The weights of the packages were recorded.", "包裹的重量被记录下来。", ["weight of officers 在此是体重，不是‘权重’；复数 weights 与两名军官对应。"]),
  d("fulfills-futurist-requirements", "fulfills the laws and requirements of Futurist poetry", "fulfill + laws / requirements of + field", "并列宾语搭配", "符合未来主义诗歌的规则和要求", "及物动词 + 并列宾语", "fulfill 可接 requirements、conditions 等；laws and requirements 由 and 平行连接。", "The design fulfills the safety requirements.", "这个设计符合安全要求。", ["fulfill 不只是‘履行承诺’，也可表示符合要求；requirements 前不要漏掉限定词。"]),
  d("all-the-same", "All the same", "all the same", "让步转折短语", "尽管如此；不过", "句子连接副词", "all the same 承接前文不利情况，提出仍然成立的判断；常置于句首并用逗号隔开。", "The task was difficult; all the same, we finished it.", "任务很难，不过我们还是完成了。", ["all the same 不是‘全部相同’的字面判断；表示转折时相当于 nevertheless。"]),
  d("refuse-to-accept", "refuse to accept", "refuse to do sth", "动词不定式搭配", "拒绝接受", "谓语动词 + 不定式", "refuse 后接 to do，不接 doing 表示同一结构；accept 的宾语可为观点或事实。", "She refused to accept the explanation.", "她拒绝接受这个解释。", ["不能说 *refuse accepting 表示拒绝某动作；reject 可直接接名词，句法不同。"]),
  d("great-change-emotional-life", "a great change in our emotional life", "a change in + domain", "抽象名词结构", "我们情感生活的巨大变化", "名词 + in 领域补足语", "change 是中心名词，in our emotional life 说明变化涉及的领域；great 强调幅度。", "A great change in public attitudes followed.", "公众态度发生了巨大变化。", ["change in 表领域，change of 常表所属或对象变化；emotional life 不是单纯‘情绪生命’。"]),
  d("calls-for-change-expression", "calls for a change of expression", "call for + noun", "动词介词搭配", "要求 / 需要表达方式的改变", "谓语短语 + 宾语", "call for 表示需要或要求，of expression 说明 change 的对象；主语为单数时用 calls。", "The situation calls for a change of plan.", "这种情况需要改变计划。", ["call for 不是 call somebody；表示‘需要’时不能漏掉 for。"]),
  d("whole-question", "The whole question", "the whole + noun", "名词短语", "整个问题；根本问题", "名词短语主语", "whole 修饰 question，the 表示当前讨论中唯一的整体问题。", "The whole question is whether we agree.", "整个问题在于我们是否同意。", ["whole question 不等于 question whole；whole 放在名词前，不能与 all 任意互换。"]),
  d("essentially-changed", "have we essentially changed", "essentially + past participle", "完成时疑问结构", "我们本质上是否已经改变", "现在完成时一般疑问句 + 程度副词", "have 提前构成疑问，essentially 修饰 changed，询问截至现在的根本变化。", "Have the priorities essentially changed?", "这些重点是否已经发生本质变化？", ["essentially 是副词，不是 essential 的比较级；完成时问的是截至现在的结果。"]),
];

export const passage3PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(
  definitions.map((item) => [
    item.key,
    {
      key: item.key,
      sourceExpression: item.source,
      canonical: item.canonical,
      type: item.type,
      meaning: item.meaning,
      summary: `原文表达“${item.source}”；规范结构为“${item.canonical}”。${item.meaning}`,
      grammarRole: item.grammarRole,
      structures: [s(item.canonical, item.meaning, item.rule, item.english, item.chinese)],
      pitfalls: item.pitfalls,
    },
  ]),
);

export const passage3PhraseAliases: Record<string, string> = Object.fromEntries(
  definitions.map((item) => [item.source.toLowerCase(), item.key]),
);

Object.assign(passage3PhraseAliases, {
  "want to do sth": "want-to-do",
  "want sb to do sth": "want-sb-to-do",
  "want sth done": "want-sth-done",
});

// Inflected or shortened forms used by lexical entries must resolve to the same page.
Object.assign(passage3PhraseAliases, {
  "attains a certain fashion": "attain-certain-fashion",
  "it is advisable to": "advisable-to",
  "what its advocates are aiming at": "aim-at",
  "its advocates": "its-advocates",
  "be regarded as normal": "regarded-as",
  "is based on": "based-on",
  "on which it is based": "based-on",
  "can hardly be classed as literature": "hardly-classed-as",
  "speeding up": "speeding-up",
  "speed up": "speeding-up",
  "a new form of expression": "new-form-of-expression",
  "in order to": "in-order-to",
  "instead of": "instead-of",
  "instead of doing": "instead-of",
  "consist of": "consists-of",
  "conditions of life": "conditions-of-life",
  "emotional life": "emotional-life",
  "a change of expression": "change-of-expression",
  "imitate them": "imitate-them",
  "explanatory notes": "explanatory-notes",
  "essentially changed": "essentially-changed",
  "fall into the river": "fall-into-river",
  "refuse to accept": "refuse-to-accept",
});

export const passage3CollocationGlosses: Record<string, { meaning: string; note?: string }> = Object.fromEntries(
  definitions.map((item) => [item.source.toLowerCase(), { meaning: item.meaning, note: item.rule }]),
);

export const passage3FamilyGlosses: Record<string, string> = {
  advise: "建议；劝告",
  advisable: "可取的；明智的",
  aim: "目标；旨在",
  attain: "达到；获得",
  class: "类别；把……归类",
  color: "颜色；给……着色",
  confuse: "使混乱；使困惑",
  correspond: "相对应；符合",
  describe: "描述；描写",
  emotion: "情感；情绪",
  essence: "本质；精髓",
  express: "表达；表示",
  explain: "解释；说明",
  literature: "文学；文献",
  reason: "理由；理性",
  regard: "看待；认为",
  require: "需要；要求",
  speed: "速度；加速",
  upset: "使不安；不安的",
  use: "使用；用途",
  advisability: "可取性；明智程度",
  reasonably: "合理地；适度地",
  literary: "文学的；文学性的",
  literate: "有读写能力的；有文化的",
  interpretation: "解释；诠释",
  interpreter: "口译员；解释者",
};

const ws = (pattern: string, meaning: string, rule: string, english: string, chinese: string): Structure[] => [
  s(pattern, meaning, rule, english, chinese),
];

export const passage3WordKnowledge: Record<string, WordKnowledge> = {
  advisable: { grammarRole: "形容词表语", grammarSummary: "it is advisable to do 使用形式主语 it，真正主语是不定式。", structures: ws("it is advisable to do", "最好做……", "advisable 是表语形容词，to do 是真正主语。", "It is advisable to verify the source.", "最好核对来源。") },
  aim: { grammarRole: "动词 + 介词", grammarSummary: "aim at 后接名词或动名词表示目标。", structures: ws("aim at doing", "旨在做……", "at 是固定介词，不能直接接动词原形。", "The plan aims at reducing waste.", "计划旨在减少浪费。") },
  base: { grammarRole: "被动介词搭配", grammarSummary: "be based on 表示依据；base A on B 是主动形式。", structures: ws("be based on + noun", "以……为依据", "based 后固定接 on。", "The claim is based on evidence.", "这一主张以证据为依据。") },
  class: { grammarRole: "分类动词", grammarSummary: "class A as B 表示把 A 归入 B，被动式为 be classed as。", structures: ws("class A as B", "把 A 归为 B", "as 后接类别或性质补足语。", "They classed the work as poetry.", "他们把这部作品归为诗歌。") },
  consist: { grammarRole: "组成关系动词", grammarSummary: "consist of 后接组成部分，不能使用 be consisted of。", structures: ws("consist of + parts", "由……组成", "主语是整体，of 后是部分。", "The set consists of four pieces.", "这套东西由四件组成。") },
  regard: { grammarRole: "看待与分类", grammarSummary: "regard A as B 与 be regarded as B 是主动和被动对应结构。", structures: ws("regard A as B", "把 A 看作 B", "as 引出补足语。", "Many regard the idea as useful.", "许多人认为这个想法有用。") },
  upset: { grammarRole: "分词形容词", grammarSummary: "upsetting 描述引起不安的事物，upset 描述人的感受。", structures: ws("be upsetting / be upset", "令人不安 / 感到不安", "-ing 表示施加感受，-ed 表示承受感受。", "The result was upsetting.", "这个结果令人不安。") },
};
