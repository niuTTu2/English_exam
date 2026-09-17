import type { Question } from "./data";
import { sentenceFactory, segment, clause } from "./2011-content-helpers";

const sentence = sentenceFactory("2012-p2");

export const passage2012P2Sentences = [
  sentence(1, [
    segment("Pretty in pink: ", "modifier", "题目式前置短语", "引题", "概括下文讨论的粉色文化", "Pretty in pink 是带评论色彩的题目式短语；不另当作完整谓语句。"),
    segment("adult women ", "subject", "名词短语", "主语", "do not remember 的施事", "adult 限定 women，表示成年女性，不是成人课程。"),
    segment("do not remember being so obsessed with the colour, ", "predicate", "助动词否定加 remember doing", "谓语及宾语补足", "说明成年女性对过去经验的回忆", "remember doing 指记得曾经发生/持续的事；being obsessed with 表示痴迷于。"),
    segment("yet ", "connector", "转折并列连词", "连接两个对照事实", "把成年女性回忆与当下女孩生活对照", "yet 相当于 but，强调反差而非时间上的“尚未”。"),
    segment("it is pervasive in our young girls' lives.", "predicate", "系动词加表语形容词和介词范围", "第二分句谓语", "it 回指粉色文化/粉色的无处不在", "pervasive 表示广泛渗透到生活中，不是简单“受欢迎”。"),
  ], "adult women do not remember being obsessed with the colour, yet it is pervasive in girls' lives.", "“粉红至上”：成年女性不记得自己曾如此痴迷这种颜色，但它如今却无处不在于年幼女孩的生活中。", "成年女性不记得自己也曾这么迷粉色，可粉色现在却渗透在小女孩生活的各处。", "以代际对比引出批评：粉色的普遍性不是女孩天然偏好的既定事实。", ["being so obsessed with the colour", "pervasive in our young girls' lives"]),
  sentence(2, [
    segment("It is not that pink is intrinsically bad, ", "predicate", "否定评价结构加 that 内容", "先排除一种误解", "说明作者并非把粉色本身判为坏", "It is not that... 表示“并不是因为/并非认为……”，不能只按形式主语机械翻译。"),
    segment("but ", "connector", "转折连词", "引出真正批评", "把颜色本身与其文化占比区分", "but 后才是作者要强调的核心理由。"),
    segment("it is such a tiny slice of the rainbow ", "predicate", "系表结构加 of 短语", "说明粉色在色彩中的份额", "it 仍指 pink", "tiny slice 比喻粉色只是彩虹中的很小一部分，不能推出粉色没有影响。"),
    segment("and, ", "connector", "并列连词加逗号", "连接两项批评", "把单一颜色问题连到身份塑造问题", "and 后的主语仍是 pink。"),
    segment("though it may celebrate girlhood in one way, ", "condition", "though 让步状语从句", "让步限定", "承认粉色可能表达一种女孩气质", "may 表示可能；让步不等于作者认同粉色应垄断女孩形象。"),
    segment("it also repeatedly and firmly fuses girls' identity to appearance.", "predicate", "主谓宾加 fuses A to B", "主句谓语", "批评粉色把女孩身份反复绑定到外表", "fuse A to B 表示紧密焊接/绑定；repeatedly and firmly 加强持续性和牢固性。"),
  ], "It is not that pink is bad, but it is a slice of the rainbow and it fuses girls' identity to appearance.", "并不是说粉色天生不好；但它只是彩虹中极小的一块，而且尽管它或许以一种方式赞美女孩时期，它也反复而牢固地把女孩的身份同外貌捆绑在一起。", "问题不在粉色本身，而在它被当成女孩形象的极小却几乎唯一的色彩标签，并不断把“女孩”与“外表”绑死。", "给出 26 题的核心：作者反对粉色成为女孩时期的唯一代表，而非否认粉色会影响生活。", ["a tiny slice of the rainbow", "celebrate girlhood in one way", "fuses girls' identity to appearance"], [
    clause("that pink is intrinsically bad", "内容从句", "that", "补足 It is not that 的被否定判断", "pink", "is", "intrinsically bad", "先译“并不是认为”，再译粉色本身不好。"),
    clause("though it may celebrate girlhood in one way", "让步状语从句", "though", "对主句提出让步", "it", "may celebrate", "girlhood in one way", "先让一步承认其可能作用，再译作者的转折批评。"),
  ]),
  sentence(3, [
    segment("Then ", "connector", "时间顺承副词", "推进批评", "承接上一句的身份—外貌连接", "Then 指进一步的结果或呈现方式，不是严格的时间点。"),
    segment("it presents ", "predicate", "及物动词", "主句谓语", "it 指粉色文化/营销呈现", "present 在此为“把……呈现为”，不是礼物名词。"),
    segment("that connection, ", "object", "指示限定名词短语", "present 的宾语", "回指 girls' identity to appearance 的连接", "that 指上一句已说的身份与外表之间的绑定。"),
    segment("even among two-year-olds, ", "modifier", "介词短语加 even", "范围强调", "说明这种呈现连两岁儿童也涉及", "among 表示在某群体中；even 加强“连这么小的孩子也如此”。"),
    segment("between girls as not only innocent but as evidence of innocence.", "object", "原卷保留的介词片段加 as 补语", "原文后置说明", "说明该连接被包装成无害乃至纯真的证据", "用户原卷及多份公开真题转录均为 between girls as...；该处搭配不完整，但不得擅自补入 and pink 等文字。依前句语境，理解为把既有的“女孩—外表/粉色”连接包装为无害、甚至证明纯真。"),
  ], "it presents that connection as not only innocent but as evidence of innocence.", "接着，它把那种联系——甚至在两岁儿童中——呈现得不仅无害，而且仿佛是纯真的证据。", "接下来，这种把女孩同外表捆在一起的做法，连对两岁孩子也被包装成“天真无害”，甚至成了“纯真”的证明。", "原卷搭配异常须原样保留；语义根据紧邻前句的 connection 回指，不据猜测补写正文。", ["not only innocent but as evidence of innocence"]),
  sentence(4, [
    segment("Looking around, ", "modifier", "现在分词短语", "伴随观察的状语", "说明 despaired 的触发动作", "逻辑主语是 I；不能误作“周围正在看”。"),
    segment("I ", "subject", "第一人称代词", "主语", "despaired 的施事", "作者直接介入，表明评价态度。"),
    segment("despaired at ", "predicate", "过去时动词加 at", "谓语", "表达对现象的失望", "despair at sth 表示因某事绝望/深感失望，不是“在……处绝望”。"),
    segment("the singular lack of imagination ", "object", "名词短语", "介词宾语中心", "批评想象力单调贫乏", "singular 在此是“异常突出的、极其的”，不是“单数”。"),
    segment("about girls' lives and interests.", "modifier", "about 介词短语", "限定 lack of imagination 的内容", "说明贫乏涉及女孩生活与兴趣", "lives 与 interests 并列，不等于只批评女孩个人缺乏想象力。"),
  ], "I despaired at the lack of imagination about girls' lives and interests.", "环顾四周，我对关于女孩生活和兴趣的想象力如此单调匮乏感到绝望。", "看一看周围，关于女孩能过怎样的生活、能喜欢什么，想象贫乏得让我失望。", "用作者态度收束第一段，排除 26 题 A 的错误归因：作者没有说粉色解释女孩缺乏想象力。", ["despaired at the singular lack of imagination"]),
  sentence(5, [
    segment("Girls' attraction to pink ", "subject", "所有格名词短语", "主语", "may seem 的内容", "attraction to 表示对……的吸引/喜爱，不是物体自身的吸引力。"),
    segment("may seem unavoidable, ", "predicate", "情态动词加系表结构", "主句谓语", "描述表面印象", "may seem 只说“看似”，不给出事实结论；unavoidable 是难以避免。"),
    segment("somehow encoded in their DNA, ", "modifier", "过去分词短语", "对 seeming 的假定性补充", "说明一种“天生写进基因”的想象", "encoded 是被编码；somehow 表示说不清地/仿佛，非科学事实断言。"),
    segment("but according to Jo Paoletti, an associate professor of American Studies, ", "connector", "转折连接加来源插入语和同位语", "引入反证来源", "把通俗直觉转为学者说明", "according to 只标明信息归属；an associate professor 是 Jo Paoletti 的同位语。"),
    segment("it is not.", "predicate", "省略重复成分的系表否定", "第二分句谓语", "it 回指 Girls' attraction... being unavoidable/encoded", "is not 省略 unavoidable / encoded in DNA 的重复内容，明确否定天生论。"),
  ], "Girls' attraction to pink may seem unavoidable, but according to Jo Paoletti, it is not.", "女孩对粉色的喜爱似乎不可避免，仿佛被写进她们的 DNA；但按美国研究副教授乔·保莱蒂的说法，并非如此。", "女孩爱粉色看上去像是天生的，但研究者说这不是事实。", "由“看似天生”转入历史证据，支撑 30 题反对内在倾向的选项。", ["Girls' attraction to pink", "encoded in their DNA", "according to Jo Paoletti"]),
  sentence(6, [
    segment("Children were not colour-coded at all until the early 20th century: ", "predicate", "被动否定加 until 时间界限", "主句", "说明按颜色分性别是较晚出现的做法", "not ... at all 强否定；until 表示到 20 世纪初之前都没有，不是从那时起一直没有。"),
    segment("in the era before domestic washing machines ", "modifier", "时间名词短语", "补充时代背景", "限定 all babies wore white 的时期", "before domestic washing machines 修饰 era，说明家用洗衣机出现前。"),
    segment("all babies wore white ", "predicate", "主谓宾补/颜色表语式用法", "冒号后的事实说明", "说明婴儿普遍穿白色", "wear + colour 表示穿着某种颜色；all babies 是概括性历史描述。"),
    segment("as a practical matter, ", "modifier", "as 短语", "原因性说明", "解释穿白色出于实用", "as a practical matter 意为出于实际考虑，不是法律事项。"),
    segment("since the only way of getting clothes clean was to boil them.", "condition", "since 原因状语从句加不定式表语", "解释实用原因", "说明当时洗净衣服的唯一方法", "since 为“因为”，the only way of doing 的中心是 way；them 回指 clothes。"),
  ], "Children were not colour-coded until the early 20th century: all babies wore white since the only way of getting clothes clean was to boil them.", "直到 20 世纪初，儿童都没有按颜色编码；在家用洗衣机出现前，所有婴儿出于实际考虑都穿白色，因为洗干净衣服的唯一办法是把它们煮沸。", "按颜色分男孩女孩是后来才有的。没有洗衣机时，婴儿都穿白色，因为衣服只能靠煮来洗净。", "用服装清洗条件解释早期并没有粉蓝的性别编码，定位 27 题。", ["were not colour-coded at all", "as a practical matter", "the only way of getting clothes clean"]),
  sentence(7, [
    segment("What's more, ", "connector", "递进连接语", "补充另一历史事实", "加强前句的反例", "What's more 用于进一步补充，不等于“更重要的是”必然表示价值排序。"),
    segment("both boys and girls ", "subject", "both A and B 并列主语", "主语", "wore 的施事", "both...and... 表示两类儿童都包括在内。"),
    segment("wore ", "predicate", "过去时及物动词", "谓语", "说明过去的服装穿着", "wore 是 wear 的过去式，不是 wore out 的“磨损”。"),
    segment("what were thought of as gender-neutral dresses.", "object", "what 名词性从句", "wore 的宾语", "说明所穿的是被认为中性的连衣裙", "what 同时引导名词性从句并作 were thought of 的主语；gender-neutral 修饰 dresses。"),
  ], "both boys and girls wore what were thought of as gender-neutral dresses.", "而且，男孩和女孩都穿被认为是不分性别的连衣裙。", "更进一步，当时男孩女孩穿的都是被看作不分性别的衣服。", "补足 27 题背景：并非粉色昔日中性，而是衣服整体没有用颜色严格标性别。", ["what were thought of as gender-neutral dresses", "gender-neutral dresses"], [
    clause("what were thought of as gender-neutral dresses", "名词性从句", "what", "作 wore 的宾语", "what", "were thought of", "as gender-neutral dresses", "整体译为“被看作中性连衣裙的东西”，不要拆成一个无指代的 what。"),
  ]),
  sentence(8, [
    segment("When nursery colours were introduced, ", "condition", "when 时间状语从句加被动", "说明历史时点", "限定粉蓝颜色进入婴幼儿用品的时期", "nursery 指婴幼儿房/用品语境；were introduced 表示被引入。"),
    segment("pink was actually considered ", "predicate", "被动语态加 consider A B", "主句谓语", "说明粉色曾被看作男性化", "actually 纠正读者的现代直觉；considered 后接宾补 the more masculine colour。"),
    segment("the more masculine colour, ", "object", "比较级形容词名词短语", "consider 的宾语补足", "与蓝色相较更男性化", "more masculine 是两者比较，不能译成“最男性化”。"),
    segment("a pastel version of red, ", "modifier", "同位语名词短语", "解释 pink 的色彩来源", "说明粉色是红色的浅淡版本", "pastel 是柔和浅色；version of red 不等于红色的完全同义词。"),
    segment("which was associated with strength.", "modifier", "which 定语从句", "补充修饰 red", "说明红色当时联想到力量", "which 回指 red，而非整个 colour；be associated with 表示与……联系在一起。"),
  ], "pink was considered the more masculine colour, a pastel version of red, which was associated with strength.", "婴幼儿色彩被引入时，粉色实际上被认为是更男性化的颜色，是与力量相联系的红色的一种浅淡版本。", "粉色刚被用在婴幼儿用品时，反而被认为比蓝色更男性化，因为它是带力量象征的红色的浅色版。", "与 27 题 B 对照：本句不是说蓝色代表女孩，而是粉色曾较男性化。", ["was actually considered the more masculine colour", "a pastel version of red", "was associated with strength"], [
    clause("which was associated with strength", "定语从句", "which", "补充说明 red", "which", "was associated", "with strength", "先译红色，再补“它当时与力量联系在一起”。"),
  ]),
  sentence(9, [
    segment("Blue, ", "subject", "颜色名词", "主语", "symbolised 的施事", "Blue 是单数颜色名词，后面的 with 短语为插入修饰。"),
    segment("with its intimations of the Virgin Mary, constancy and faithfulness, ", "modifier", "with 伴随/特征介词短语", "补充蓝色带来的联想", "解释蓝色为何被赋予女性气质", "intimations 是暗示、联想；constancy 和 faithfulness 与 Virgin Mary 并列为联想内容。"),
    segment("symbolised femininity.", "predicate", "过去时及物动词", "谓语及宾语", "说明蓝色当时象征女性气质", "symbolise 是象征，不是事实证明女性的本质。"),
  ], "Blue symbolised femininity.", "蓝色因使人想到圣母玛丽亚、坚定和忠贞，而象征女性气质。", "当时蓝色才是象征女性气质的颜色。", "直接定位 27 题 B：过去蓝色被视为代表女孩/女性气质的颜色。", ["intimations of the Virgin Mary", "symbolised femininity"]),
  sentence(10, [
    segment("It was not until the mid-1980s, ", "predicate", "not until 强调句框架", "主句框架", "强调粉色成为女孩标记的较晚时间", "It was not until...that... 要整体译为“直到……才……”，不能把 not 单独否定后文。"),
    segment("when amplifying age and sex differences became a dominant children's marketing strategy, ", "modifier", "when 定语从句", "补充 mid-1980s 的时代特征", "说明营销策略变化", "when 修饰 mid-1980s；amplifying 为动名词作主语，age and sex differences 是被放大的差异。"),
    segment("that pink fully came into its own, ", "predicate", "that 后强调内容加习语", "说明粉色取得主导位置", "pink 成为显著的儿童市场符号", "come into its own 表示充分发挥作用/真正流行起来，不是“进入自己的东西”。"),
    segment("when it began to seem inherently attractive to girls, ", "modifier", "when 时间定语从句", "说明成为主导时的表象", "it 指 pink", "seem inherently attractive 表示“开始显得天生吸引女孩”，仍是被营造的印象。"),
    segment("part of what defined them as female, ", "modifier", "名词短语加 what 从句", "补充粉色被赋予的身份作用", "them 指 girls", "what defined them as female 是“把她们界定为女性的东西”；不是 girl 的生理定义。"),
    segment("at least for the first few critical years.", "modifier", "at least 范围限定短语", "限制时间跨度", "说明这种强制性主要发生在最初几年", "at least 表示最低范围/保守限定，不能推成贯穿一生。"),
  ], "It was not until the mid-1980s that pink came into its own, when it began to seem attractive to girls.", "直到 20 世纪 80 年代中期，当放大年龄和性别差异成为主导的儿童营销策略时，粉色才真正兴盛；它开始显得天生吸引女孩，并在最初几个关键年份里成为界定她们为女性的一部分。", "直到 80 年代中期，营销开始刻意放大年龄和性别差异，粉色才被包装成“女孩天生喜欢”的颜色。", "时间、营销策略和“看起来天生”共同支持 30 题 C，否定内在 DNA 解释。", ["It was not until the mid-1980s", "amplifying age and sex differences", "came into its own", "attractive to girls", "at least for the first few critical years"], [
    clause("when amplifying age and sex differences became a dominant children's marketing strategy", "定语从句", "when", "修饰 the mid-1980s", "amplifying age and sex differences", "became", "a dominant children's marketing strategy", "先交代 80 年代中期的市场策略，再译粉色的变化。"),
    clause("that pink fully came into its own", "强调句内容从句", "that", "与 It was not until 构成强调结构", "pink", "came", "into its own", "按“直到……粉色才真正兴盛”译出强调。"),
    clause("when it began to seem inherently attractive to girls", "定语从句", "when", "补充 pink 兴盛时出现的表象", "it", "began to seem", "inherently attractive to girls", "后译“开始显得天生吸引女孩”，保留 seem 的不确定。"),
    clause("what defined them as female", "名词性从句", "what", "作 of 的宾语中心", "what", "defined", "them as female", "译为“界定她们为女性的事物”，them 指 girls。"),
  ]),
  sentence(11, [
    segment("I had not realised ", "predicate", "过去完成时否定", "主句谓语", "说明作者此前未意识到", "过去完成时相对叙述时点表示更早之前没有认识到。"),
    segment("how profoundly marketing trends dictated ", "object", "how 引导感叹式宾语从句", "realised 的宾语从句起点", "说明营销趋势影响程度", "how profoundly 修饰 dictated；dictate 在此为强力左右/规定，不是口述。"),
    segment("our perception ", "object", "名词短语", "dictated 的宾语", "指人们的看法", "perception 是感知、理解方式，不是生理视力。"),
    segment("of what is natural to kids, ", "modifier", "of 加 what 名词性从句", "限定 perception 的对象", "说明对儿童“自然”的判断", "what is natural to kids 整体作 of 宾语，to kids 表示“对孩子而言”。"),
    segment("including our core beliefs ", "modifier", "including 介词/分词短语", "补充所含内容", "把心理发展观念列为其中一部分", "including 表举例包含，不表示只有这一项。"),
    segment("about their psychological development.", "modifier", "about 介词短语", "修饰 beliefs", "their 指 kids", "psychological development 指心理发展，不是市场发展。"),
  ], "I had not realised how profoundly marketing trends dictated our perception of what is natural to kids.", "我此前没有意识到，营销趋势竟如此深刻地左右了我们对什么对儿童来说是自然的看法，其中包括我们对他们心理发展的核心信念。", "我以前没意识到，营销能多么深地决定我们觉得孩子“天生该怎样”，连对儿童心理发展的基本看法都会被影响。", "直接定位 28 题：作者说对儿童心理发展的看法深受营销趋势影响。", ["marketing trends", "dictated our perception", "core beliefs", "psychological development"], [
    clause("how profoundly marketing trends dictated our perception of what is natural to kids", "宾语从句", "how", "作 realised 的宾语", "marketing trends", "dictated", "our perception of what is natural to kids", "先译“营销趋势多么深刻地左右”，再译被左右的看法。"),
    clause("what is natural to kids", "名词性从句", "what", "作 of 的宾语", "what", "is", "natural to kids", "译为“什么对儿童来说是自然的”，不用补具体行为。"),
  ]),
  sentence(12, [
    segment("Take ", "predicate", "祈使动词", "谓语", "要求读者把注意力放到例子上", "Take 在此为“以……为例”，主语 you 省略，不是抱起幼儿。"),
    segment("the toddler.", "object", "名词短语", "Take 的宾语", "作为例子的 toddler 称谓", "the toddler 是祈使动词 Take 所举的对象，整体引出下一句对该术语来源的说明。"),
  ], "Take the toddler.", "就拿 toddler（幼儿）这个说法为例。", "举个例子：toddler 这个“幼儿”阶段。", "用一个极短祈使句转入“幼儿阶段是被营销塑造”的例证。", ["Take the toddler"]),
  sentence(13, [
    segment("I assumed ", "predicate", "过去时及物动词", "主句谓语", "说明作者原先的推断", "assume 表未经充分证明的设想，为后面的 wrong 埋下反转。"),
    segment("that phase ", "subject", "that 内容从句中的主语", "assumed 的宾语从句主语", "指 toddler 阶段", "that phase 回指上一句 toddler，不是抽象的任一阶段。"),
    segment("was something ", "predicate", "系表结构", "宾语从句谓语", "说明作者以为其来源", "something 后由省略关系词的定语从句限定。"),
    segment("experts developed ", "modifier", "省略关系代词的定语从句", "修饰 something", "说明作者以为专家发展出该阶段概念", "experts 是 developed 的主语；省略的 that/which 在从句中作 developed 宾语。"),
    segment("after years of research into children's behaviour: ", "modifier", "时间介词短语", "限定 developed 的过程", "说明作者以为有长期研究依据", "research into 指针对……的研究；children's behaviour 不等于儿童消费行为。"),
    segment("wrong.", "predicate", "省略句/评注词", "推翻前述假设", "作者明确否定原先判断", "冒号后的 wrong 省略 That assumption was，语气简短有力。"),
  ], "I assumed that phase was something experts developed after years of research: wrong.", "我原以为那个阶段是专家经过多年研究儿童行为后提出的概念：错了。", "我原以为“幼儿期”是专家研究儿童很多年后提出的阶段，但这想法错了。", "用作者自我纠正突出 28、30 题的论证：发展阶段并非只由观察儿童天性得出。", ["assumed that phase was something", "research into children's behaviour"], [
    clause("that phase was something experts developed after years of research into children's behaviour", "宾语从句", "that", "作 assumed 的宾语", "that phase", "was", "something experts developed after years of research into children's behaviour", "先译“我原以为那个阶段是……”，再补专家研究的来源。"),
    clause("experts developed after years of research into children's behaviour", "省略关系词的定语从句", "省略 that/which", "修饰 something", "experts", "developed", "省略关系代词作 developed 宾语", "译为“专家经多年研究后提出的东西”，不用把 experts 误作 research 的宾语。"),
  ]),
  sentence(14, [
    segment("Turns out, ", "connector", "口语化省略表达", "引出实际结果", "对应上一句错误的假设", "Turns out (that) 省略形式主语和 that，表示“结果发现”。"),
    segment("according to Daniel Cook, a historian of childhood consumerism, ", "modifier", "来源插入语加同位语", "标注观点来源", "Daniel Cook 身份为儿童消费史研究者", "a historian... 是 Daniel Cook 同位语；according to 不把作者观点混同为已证明事实。"),
    segment("it was popularised ", "predicate", "过去时被动", "主句谓语", "it 指 toddler 这个称谓/阶段概念", "popularise 表推广使流行，强调外部推动；被动说明推手另有其人。"),
    segment("as a marketing trick ", "modifier", "as 介词短语", "说明推广方式/性质", "把 toddler 说法定性为营销技巧", "trick 在此带策略/花招的批评色彩，不是儿童魔术表演。"),
    segment("by clothing manufacturers ", "modifier", "by 动作施事短语", "说明被动句施事", "指出服装制造商是推广者", "manufacturers 为制造商；by 与被动 was popularised 对应。"),
    segment("in the 1930s.", "modifier", "时间介词短语", "限定推广时间", "说明推广发生在 20 世纪 30 年代", "the 1930s 表 1930—1939 年间，不是一九三十年某一天。"),
  ], "Turns out it was popularised as a marketing trick by clothing manufacturers in the 1930s.", "结果发现，按儿童消费史学家丹尼尔·库克的说法，它在 20 世纪 30 年代是被服装制造商作为一种营销花招推广开来的。", "结果是，toddler 这个说法在 30 年代是服装制造商为了卖货而推广起来的。", "给出营销而非儿童天性的直接证据，支撑 28 题 B 与 30 题 C。", ["Turns out", "according to Daniel Cook", "a marketing trick"], []),
  sentence(15, [
    segment("Trade publications ", "subject", "复数名词短语", "主语", "counselled 的施事", "trade publications 是行业刊物，不是贸易出版这一动作。"),
    segment("counselled ", "predicate", "过去时及物动词", "谓语", "表示向百货商店提出建议", "counsel 这里为建议/劝告，英式拼写 counselled 双写 l。"),
    segment("department stores ", "object", "复数名词短语", "counselled 的宾语", "接受行业建议的百货商店", "department store 指百货商店，不是部门仓库。"),
    segment("that, ", "connector", "that 内容从句起点", "引出建议内容", "说明建议的具体做法", "that 从句为 counselled 的内容；不能把 it 当关系代词。"),
    segment("in order to increase sales, ", "condition", "目的不定式短语", "说明建议目的", "提高销售额", "in order to 后接动词原形，表示目的，不等于已增加销量。"),
    segment("they should create ", "predicate", "情态动词 should 加动词原形", "内容从句谓语", "they 指 department stores", "should 表建议；create 是建立一个市场分类，不是自然发现。"),
    segment("a \"third stepping stone\" ", "object", "引号中的比喻性名词短语", "create 的宾语", "指婴儿装与大童装之间的人为市场阶段", "stepping stone 比喻通向下一阶段的台阶；third 不是第三件商品的字面编号。"),
    segment("between infant wear and older kids' clothes.", "modifier", "between A and B 范围结构", "限定 stepping stone 所在两类之间", "连接婴儿装和更大孩子服装", "between 必须同时带出 infant wear 和 older kids' clothes；这里是市场分类的中间层。"),
  ], "Trade publications counselled department stores that they should create a third stepping stone between infant wear and older kids' clothes.", "行业刊物建议百货商店，为了增加销售额，应当在婴儿服装和较大孩子的衣服之间创造一个“第三块踏脚石”。", "行业刊物建议百货商店：为了多卖货，在婴儿装和大童装之间再造出一个“幼儿装”的市场层级。", "直接服务 29 题：建议的核心是把消费者/商品阶段继续细分。", ["in order to increase sales", "a \"third stepping stone\"", "between infant wear and older kids' clothes"]),
  sentence(16, [
    segment("It was only after \"toddler\" became a common shoppers' term ", "predicate", "only after 强调结构", "主句框架", "强调名称先普及，阶段概念后被接受", "only after...that... 表“只有在……之后才……”；shoppers' 为 shoppers 的所有格。"),
    segment("that it evolved ", "predicate", "that 后强调内容加不及物动词", "说明概念发展结果", "it 指 toddler 一词/称谓", "evolve 是逐渐演变，不是人为一次性制定。"),
    segment("into a broadly accepted developmental stage.", "modifier", "into 结果介词短语", "说明演变结果", "描述社会认可的“发展阶段”", "broadly accepted 是被广泛接受；developmental 修饰 stage，不能把它当市场增长。"),
  ], "It was only after toddler became a common shoppers' term that it evolved into a broadly accepted developmental stage.", "只有在 toddler 成为购物者常用的术语之后，它才演变成一个被广泛接受的发展阶段。", "“toddler”先成了买衣服时常用的说法，后来才被普遍当成儿童发展的一个阶段。", "揭示消费术语如何反过来塑造心理发展认知，直接支持 28 题 B。", ["only after \"toddler\" became a common shoppers' term", "evolved into a broadly accepted developmental stage"]),
  sentence(17, [
    segment("Splitting kids, or adults, ", "subject", "动名词短语加插入并列", "主语", "has proved 的行为", "Splitting 是动名词；or adults 补充同一做法也适用于成人。"),
    segment("into ever-tinier categories ", "modifier", "into 结果/分类介词短语", "说明 split 的方式", "不断把人群划成更小类别", "ever-tinier 是 ever 加比较级，表示越来越小；category 为类别。"),
    segment("has proved ", "predicate", "现在完成时", "谓语", "说明实践已显示其结果", "has proved 表经验已证明，主语为动名词短语。"),
    segment("a sure-fire way ", "object", "名词短语", "proved 的表语补足", "评价这种细分为可靠办法", "sure-fire 是几乎必定奏效的，带营销话语色彩，不是实际火器。"),
    segment("to boost profits.", "modifier", "不定式后置定语", "说明 way 的目的", "提高利润", "boost 作动词为提升、推动；profits 是利润，非销售额本身。"),
  ], "Splitting kids or adults into ever-tinier categories has proved a sure-fire way to boost profits.", "把儿童或成人划分为越来越细小的类别，已经证明是提高利润的万全办法。", "无论孩子还是成人，越细地分组越好卖货、越能增加利润。", "直接定位 29 题 A，说明商店建议的市场逻辑是细分群体。", ["into ever-tinier categories", "a sure-fire way to boost profits"]),
  sentence(18, [
    segment("And ", "connector", "并列连接词", "补充一个容易细分的维度", "承接按年龄细分的盈利逻辑", "And 不仅连接句子，也把性别分化列为一种市场办法。"),
    segment("one of the easiest ways ", "subject", "one of + 最高级复数名词", "主语", "is 的主语", "表示最容易的办法之一", "one of 后名词用复数 ways；easiest 不是唯一最容易。"),
    segment("to segment a market ", "modifier", "不定式后置定语", "说明 ways 的具体内容", "按群体切分市场", "segment 作动词为细分，market 为消费者市场，不是市场地点。"),
    segment("is ", "predicate", "系动词", "主句谓语", "连接方法与具体做法", "主语中心为 one，不受 ways 复数影响。"),
    segment("to magnify gender differences ", "object", "不定式表语", "说明一种做法", "夸大性别差异", "magnify 不只是放大图像，此处是夸张、强化差异。"),
    segment("– or invent them ", "connector", "破折号加选择性补充", "提出更强的替代可能", "them 回指 gender differences", "– 引出更尖锐补充：甚至在原本没有差异时发明差异。"),
    segment("where they did not previously exist.", "modifier", "where 地点/情形定语从句", "限定 invent 的位置/情形", "说明原先并不存在这些差异的场合", "where 不是具体地理地点，表示“在原先不存在差异的地方/情形中”。"),
  ], "one of the easiest ways to segment a market is to magnify gender differences – or invent them where they did not previously exist.", "而细分市场最容易的办法之一，就是夸大性别差异——或者在这些差异原先并不存在的地方把它们创造出来。", "市场最容易的细分方法之一，就是把性别差异夸大，甚至凭空造出来。", "全文结论：女孩喜欢粉色主要由逐利的市场细分塑造，支持 30 题 C。", ["one of the easiest ways to segment a market", "magnify gender differences", "where they did not previously exist"] , [
    clause("to segment a market", "不定式短语", "to", "修饰 ways，说明何种办法", "省略逻辑主语", "segment", "a market", "译为“细分市场的办法”，不把 to 译成方向。"),
    clause("where they did not previously exist", "地点/情形定语从句", "where", "修饰原先不存在差异的情形", "they", "did not exist", "previously", "them 指 gender differences；译为“原先并不存在这些差异的地方/情形”。"),
  ]),
];

const question = (number: number, sentenceNumber: number, prompt: string, options: string[], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question => ({
  id: 201200 + number,
  number,
  sentenceId: `2012-p2-s${sentenceNumber}`,
  prompt,
  options: options.map((text, index) => ({ key: "ABCD"[index] as Question["answer"], text })),
  answer,
  locating,
  explanations,
});

export const passage2012P2Questions = [
  question(26, 2, "By saying \"it is… the rainbow\" (Line 3, Para. 1), the author means pink ____.", ["cannot explain girls' lack of imagination", "should not be associated with girls' innocence", "should not be the sole representation of girlhood", "cannot influence girls' lives and interests"], "C", "第1段第2句先说粉色本身不坏，随后把它比作彩虹中极小的一片，并批评它把女孩身份锁定在外表；因此反对把粉色当作女孩时期的唯一代表。", {
    A: "第4句确实批评关于女孩生活与兴趣的想象力贫乏，但没有说粉色“不能解释”这一贫乏，属于无中生有。",
    B: "原文说粉色文化把既有连接包装成纯真的证据，作者批评这种包装；并非主张粉色不应与任何女孩纯真感关联。",
    C: "tiny slice of the rainbow 加上 girlhood 的限制，准确概括“粉色只是女孩时期的一小部分，不能垄断其代表性”。",
    D: "原文恰说粉色文化 pervasive 并且 firmly fuses 身份与外表，明确承认它会影响女孩生活与身份想象。",
  }),
  question(27, 9, "According to Paragraph 2, which of the following is true of colours?", ["Colours are encoded in girls' DNA.", "Blue used to be regarded as the colour for girls.", "White is preferred by babies.", "Pink used to be a neutral colour in symbolising genders."], "B", "第2段明确说蓝色因圣母玛丽亚、坚定和忠贞的联想而象征女性气质；粉色反而一度被看作更男性化。", {
    A: "第2段开头只是说这种说法看似被写进 DNA，随后 Jo Paoletti 明确否定 it is not。",
    B: "Blue symbolised femininity 直接说明蓝色过去被赋予女性/女孩的象征意义。",
    C: "婴儿穿白色是家用洗衣机出现前出于能把衣服煮干净的实用原因，不是婴儿偏好。",
    D: "原文称男女都穿 gender-neutral dresses；粉色则被认为更 masculine，不是象征性别时的中性颜色。",
  }),
  question(28, 11, "The author suggests that our perception of children's psychological development was much influenced by ____.", ["the observation of children's nature", "the marketing of products for children", "researches into children's behaviour", "studies of childhood consumption"], "B", "第3段首句直接说 marketing trends dictated our perception，随后 toddler 例子说明服装制造商的营销手段如何变成被广泛接受的发展阶段。", {
    A: "作者反而批评“自然”观念被营销左右，未说儿童天性观察是主要影响。",
    B: "marketing trends 直接定位，clothing manufacturers 又是 toddler 被推广的施事，准确对应儿童产品营销。",
    C: "作者原先误以为专家长期研究儿童行为才形成 toddler 阶段，冒号后的 wrong 明确否定这一路径。",
    D: "Daniel Cook 的职业是 childhood consumerism historian，是信息来源；题目问的是实际影响来源，原文答案是营销而非研究这一学科。",
  }),
  question(29, 17, "We may learn from Paragraph 4 that department stores were advised to _____.", ["classify consumers into smaller groups", "attach equal importance to different genders", "focus on infant wear and older kids' clothes", "create some common shoppers' terms"], "A", "第4段建议百货商店在婴儿装与大童装之间创造第三层级，接着说明把儿童或成人分成越来越细的类别能提升利润。", {
    A: "third stepping stone 与 ever-tinier categories 均指不断细分消费人群/市场，正确概括建议。",
    B: "原文说的是 magnify gender differences，正是放大而非同等对待性别差异。",
    C: "建议是要在 infant wear 与 older kids' clothes 之间增加一个层级，不是只聚焦这两端。",
    D: "common shoppers' term 描述 toddler 后来如何演变为发展阶段，非行业刊物给百货商店的直接建议。",
  }),
  question(30, 18, "It can be concluded that girls' attraction to pink seems to be ___.", ["fully understood by clothing manufacturers", "clearly explained by their inborn tendency", "mainly imposed by profit-driven businessmen", "well interpreted by psychological experts"], "C", "全文从“并非写进 DNA”出发，追溯 20 世纪 80 年代儿童营销、1930 年代服装制造商推广 toddler，以及按年龄和性别细分市场以提高利润，结论指向逐利营销的塑造。", {
    A: "制造商会利用并推广分类，不等于他们已完全理解女孩喜好形成的全部机制。",
    B: "according to Jo Paoletti, it is not 直接排除天生 DNA 的解释。",
    C: "marketing strategy、clothing manufacturers、boost profits 和 invent differences 连成完整因果链，说明喜好主要被逐利商家塑造。",
    D: "专家研究儿童行为的原先假设被 wrong 推翻，心理学专家并未被写成提供完整解释的人。",
  }),
];
