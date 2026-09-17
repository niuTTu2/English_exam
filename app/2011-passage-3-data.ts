import type { Question, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";

const sentence = sentenceFactory("2011-p3");
export const passage2011P3Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("We ", "subject", "第一人称复数代词", "主语", "think的主体", "包含作者与一般读者，提出通常的历史印象。"),
    segment("tend to think of ", "predicate", "倾向动词加认知搭配", "谓语", "说明惯常理解方式", "think of A as B把A看作B；tend保留倾向而非绝对断言。"),
    segment("the decades immediately following World War II ", "object", "名词加现在分词后置定语", "of的宾语", "说明被回顾的时期", "following修饰decades，immediately表示紧接二战之后。"),
    segment("as a time of prosperity and growth, ", "modifier", "as加名词短语", "身份评价补足", "说明怎样看待decades", "prosperity与growth并列说明繁荣和发展。"),
    segment("with soldiers returning home by the millions, ", "modifier", "with独立结构", "伴随背景", "补充战后社会场景", "soldiers是returning的逻辑主语，by the millions表示数以百万计。"),
    segment("going off to college on the G. I. Bill ", "modifier", "并列现在分词短语", "独立结构第二项", "逻辑主语仍为soldiers", "going off与returning并列；on表示借助退伍军人法案资助上大学。"),
    segment("and lining up at the marriage bureaus.", "modifier", "并列现在分词短语", "独立结构第三项", "逻辑主语仍为soldiers", "line up表示排队，at引婚姻登记机构，不把三项误作三个有限从句。"),
  ], "We tend to think of the decades as a time of prosperity and growth.", "我们往往把紧接二战的几十年看作繁荣和增长的时期，其间数以百万计的士兵返乡，借助退伍军人法案上大学，并在婚姻登记机构排队。", "说起二战后那几十年，我们通常想到繁荣与发展：数百万士兵回乡，靠退伍军人法案的资助上大学，纷纷排队登记结婚。", "先呈现战后富足扩张的总体印象，下一句转向住宅设计的节制。", ["think of the decades immediately following World War II as a time of prosperity and growth", "by the millions", "lining up at the marriage bureaus"]),
  sentence(2, [
    segment("But when it came to their houses, ", "condition", "when从句内含话题习语", "话题转折状语", "限定后面判断的领域", "when it comes to...表示谈到……时；their指战后美国人，非空间到达房屋。"),
    segment("it was ", "predicate", "代词主语加系动词", "主句主谓", "it回指战后这段时期", "与when从句中的习语it用途不同。"),
    segment("a time of common sense and a belief ", "object", "名词表语与并列of宾语", "主句表语", "说明该时期的住宅观念", "common sense和a belief共同受of支配，强调理性节制。"),
    segment("that less could truly be more.", "modifier", "that内容从句", "同位内容补足", "解释belief", "less作主语，could be为谓语，more为表语；在设计中指更少装饰可带来更好效果。"),
  ], "it was a time of common sense and a belief that less could truly be more.", "但谈到他们的住宅，这是一个讲求常识并相信少确实能成为多的时期。", "但在住宅设计上，当时的人们更讲求理性，信奉‘少即是多’。", "31题不能只用首段繁荣作答，要看But之后的住宅取向。", ["when it came to their houses", "less could truly be more"], [
    clause("when it came to their houses", "话题限定状语从句", "when", "转入住宅领域", "it（习语形式主语）", "came to", "their houses", "按‘但说到住宅’整体前置翻译。"),
    clause("that less could truly be more", "同位内容从句", "that", "解释belief的内容", "less", "could truly be", "more（表语）", "译出‘相信少即是多’，more指效果而非数量简单算术。"),
  ]),
  sentence(3, [
    segment("During the Depression and the war, ", "modifier", "during加并列时段", "时间状语", "限定had learned", "指经济大萧条与战争时期，Depression不是心理抑郁。"),
    segment("Americans had learned ", "predicate", "主语加过去完成时动词", "第一分句主谓", "说明已形成的经验", "had learned先于战后住宅风尚。"),
    segment("to live with less, ", "object", "不定式短语", "learned的补足", "说明学会什么", "with less指用更少物质条件生活。"),
    segment("and that restraint, ", "subject", "连词加回指名词短语", "第二分句主语", "made的主语", "that是限定词，restraint将节俭克制的经验名词化。"),
    segment("in combination with the postwar confidence in the future, ", "modifier", "插入介词短语", "共同因素状语", "补充restraint的伴随条件", "in the future修饰confidence，表示对未来的信心。"),
    segment("made small, efficient housing positively stylish.", "predicate", "使役动词加宾语补足语", "第二分句谓宾补", "说明两种心态对housing的作用", "housing为宾语，stylish为宾补，positively为程度副词而非政治正面。"),
  ], "Americans had learned to live with less, and that restraint made housing stylish.", "在大萧条和战争期间，美国人已学会用更少的东西生活，而这种节制与战后对未来的信心结合，使小而高效的住宅非常时髦。", "大萧条和战争让美国人习惯节俭；这种克制，加上战后对未来的信心，使小巧实用的住宅成为时尚。", "31题直接证据：restraint与confidence共同塑造住宅风格。", ["in combination with the postwar confidence in the future", "made small, efficient housing positively stylish"]),
  sentence(4, [
    segment("Economic condition ", "subject", "形容词加名词", "主语", "was的主语", "原卷condition用单数，保留来源，不自行改复数。"),
    segment("was only ", "predicate", "系动词加限制副词", "谓语", "限定经济因素作用", "only说明只是原因之一，非全部解释。"),
    segment("a stimulus ", "object", "可数名词", "表语", "说明economic condition性质", "stimulus意为推动因素。"),
    segment("for the trend toward efficient living.", "modifier", "for与toward嵌套介词短语", "后置补足", "for补充stimulus对象；toward限定trend", "living动名词为生活方式，efficient指空间与资源利用。"),
  ], "Economic condition was a stimulus.", "经济状况只是追求高效生活趋势的一项刺激因素。", "经济条件只是推动高效生活方式的因素之一。", "从经济背景转向设计理念传播，避免单因解释。", ["the trend toward efficient living"]),
  sentence(5, [
    segment('The phrase "less is more" ', "subject", "名词加引语同位说明", "主语", "was popularized的受事", "引语解释phrase内容，原文未说此人首次创造格言。"),
    segment("was actually first popularized ", "predicate", "过去时被动加副词", "主句谓语", "说明理念的推广", "popularize意为使广为人知，first仅限定推广过程。"),
    segment("by a German, the architect Ludwig Mies van der Rohe, ", "modifier", "by施事短语加同位语", "施事状语", "说明推广者身份", "architect与完整人名同位解释a German。"),
    segment("who like other people associated with the Bauhaus, a school of design, ", "modifier", "关系代词加比较插入语", "定语从句主语及背景", "who指建筑师Mies", "associated with为people的分词定语；a school of design解释Bauhaus。"),
    segment("emigrated to the United States before World War II ", "predicate", "定语从句第一谓语及时地状语", "关系从句谓语", "说明Mies迁居", "to引目的地，before限定移居发生于二战前。"),
    segment("and took up posts at American architecture schools.", "predicate", "并列过去时谓语及宾语", "关系从句第二谓语", "与emigrated共用who", "take up posts指开始任职，不是占用工作岗位的物理空间。"),
  ], 'The phrase "less is more" was popularized by a German.', "‘少即是多’这个说法最初实际上是由德国建筑师路德维希·密斯·凡·德·罗推广的；他像其他与设计学校包豪斯有关的人一样，在二战前移居美国，并在美国建筑院校任职。", "最早将‘少即是多’广为传播的是德国建筑师路德维希·密斯·凡·德·罗。和其他与包豪斯设计学校有关的人一样，他在二战前移居美国，到当地建筑院校任职。", "介绍包豪斯相关设计师将理念带往美国，但不证明Mies创立了包豪斯。", ["associated with the Bauhaus", "took up posts"], [clause("who like other people associated with the Bauhaus, a school of design, emigrated to the United States before World War II and took up posts at American architecture schools", "非限制性定语从句", "who", "补充建筑师Mies的经历", "who", "emigrated；took up（并列）", "to the United States（去向）；posts（took up宾语）", "先识别人，再译移居与任职两个动作，将like短语作为背景。")]),
  sentence(6, [
    segment("These designers ", "subject", "回指限定词加人员名词", "主语", "came的主体", "指前文移居美国的相关设计师。"),
    segment("came to exert ", "predicate", "过去时come加不定式", "谓语", "表示逐渐产生作用", "come to do表发展到某种结果，不是为发挥影响而到达某地。"),
    segment("enormous influence ", "object", "形容词加抽象名词", "宾语", "exert的对象", "exert influence为施加或产生影响。"),
    segment("on the course of American architecture, ", "modifier", "on加发展进程名词短语", "影响对象补足", "限定influence作用领域", "course为发展进程，不是建筑学校的一门课程。"),
    segment("but none more so than Mies.", "connector", "并列省略比较分句", "比较补充", "突出Mies影响最大", "none指其他设计师；more so省略发挥影响，than Mies为比较项。"),
  ], "These designers came to exert enormous influence, but none more so than Mies.", "这些设计师后来对美国建筑的发展进程产生了巨大影响，但没有谁的影响比密斯更大。", "他们深刻影响了美国建筑的发展，其中以密斯的影响最为突出。", "32题直接支撑包豪斯相关理念影响美国，不支持多数美国建筑师都有该校经历。", ["exert enormous influence", "none more so than Mies"], [clause("none more so than Mies", "并列省略比较分句", "but；than", "突出Mies的影响", "none（这些设计师中无人）", "省略exerted influence", "more so than Mies（比较程度）", "译为没有谁的影响比密斯更大，保留否定比较方向。")]),
  sentence(7, [
    segment("Mies's signature phrase ", "subject", "所有格加名词短语", "主语", "means的主语", "signature意为标志性的，phrase回指少即是多。"),
    segment("means ", "predicate", "一般现在时动词", "谓语", "解释格言含义", "means是mean第三人称单数，不是名词手段。"),
    segment("that less decoration, ", "subject", "内容连词加数量名词", "宾语从句主语", "has的主语", "less限定decoration，说明装饰少而非空间必小。"),
    segment("properly organized, ", "modifier", "过去分词插入短语", "条件性状态说明", "修饰less decoration", "装饰经过恰当组织是效果更强的重要限制。"),
    segment("has more impact than a lot.", "predicate", "及物动词加比较结构", "宾语从句谓宾", "比较装饰带来的效果", "a lot省略of decoration，than后还省略has impact，不与大量房屋作比较。"),
  ], "Mies's signature phrase means that less decoration has more impact than a lot.", "密斯的标志性格言意味着，较少的装饰若组织得当，比大量装饰更有冲击力。", "密斯所谓‘少即是多’，是说装饰不必多，只要安排得当，反而更能产生美感与表现力。", "33题依据：优雅不依赖装饰数量，并非主张完全空无。", ["properly organized", "more impact than a lot"], [
    clause("that less decoration, properly organized, has more impact than a lot", "宾语从句", "that", "作means宾语", "less decoration", "has", "more impact than a lot", "先译装饰较少，再补组织得当条件与效果比较。"),
    clause("than a lot", "省略比较从句", "than", "补充more的比较对象", "a lot（省略of decoration）", "省略has", "省略impact", "将a lot理解为大量装饰，避免比较对象偷换。"),
  ]),
  sentence(8, [
    segment("Elegance, ", "subject", "抽象名词", "主语", "derive的主语", "讨论建筑形式的优雅。"),
    segment("he believed, ", "modifier", "插入引述分句", "观点来源补充", "说明后面判断属于Mies", "he为主语，believed为谓语，不是elegance的定语。"),
    segment("did not derive ", "predicate", "过去时否定结构", "主句谓语", "否定优雅的来源", "did后derive用原形。"),
    segment("from abundance.", "modifier", "from介词短语", "来源补足", "与derive构成来源关系", "abundance指数量充裕，结合前句为装饰丰繁。"),
  ], "Elegance did not derive from abundance.", "他认为，优雅并不来自丰盛繁多。", "在他看来，优雅不靠堆砌。", "用简短判断强化少而精的设计哲学。", ["derive from abundance"]),
  sentence(9, [
    segment("Like other modern architects, ", "modifier", "like加人员名词短语", "比较状语", "说明he与其他建筑师共同点", "like为介词像，不是喜欢的动词。"),
    segment("he employed ", "predicate", "代词主语加过去时动词", "主句主谓", "he指Mies", "employ用于材料时意为采用，不是招聘雇员。"),
    segment("metal, glass and laminated wood ", "object", "三个并列材料名词", "宾语", "employed的对象", "laminated为wood前置定语，表示层压加工。"),
    segment("– materials ", "modifier", "破折号引同位名词", "同位解释", "概括前三种材料", "后面两个that从句都修饰materials。"),
    segment("that we take for granted today ", "modifier", "that定语从句", "第一后置定语", "修饰materials", "we为主语，take为谓语，that为宾语，for granted为固定补足。"),
    segment("but that in the 1940s symbolized the future.", "modifier", "but连接第二定语从句", "并列后置定语", "同样修饰materials", "第二个that本身作symbolized主语，时间与today对比。"),
  ], "he employed metal, glass and laminated wood.", "像其他现代建筑师一样，他采用金属、玻璃和层压木材——这些材料今天我们视为理所当然，但在20世纪40年代却象征着未来。", "与其他现代建筑师一样，密斯采用金属、玻璃和层压木材。这些材料如今司空见惯，在20世纪40年代却代表着未来。", "区分今天常见与当年新潮，不能说材料在当时已经普遍流行。", ["take for granted"], [
    clause("that we take for granted today", "限制性定语从句", "that", "限定materials今天的地位", "we", "take", "that（宾语）；for granted（补足）", "译为如今习以为常的材料。"),
    clause("that in the 1940s symbolized the future", "并列限制性定语从句", "that", "说明相同材料当年的意义", "that", "symbolized", "the future", "转折译出当年却象征未来；that在此是主语。"),
  ]),
  sentence(10, [
    segment("Mies's sophisticated presentation ", "subject", "所有格加名词短语", "主语", "masked的施事", "presentation为精巧的建筑呈现方式，不指课堂幻灯演示。"),
    segment("masked ", "predicate", "过去时动词", "谓语", "说明外观掩盖某事实", "mask比喻遮住认知焦点，不是佩戴口罩。"),
    segment("the fact ", "object", "名词短语", "宾语", "masked的对象", "后接that说明事实的具体内容。"),
    segment("that the spaces he designed ", "subject", "内容连词加带省略关系词的主语", "同位从句主语", "were的主语", "the spaces为主语，he designed是限定spaces的关系从句，省略宾语关系词that。"),
    segment("were small and efficient, rather than big and often empty.", "predicate", "系动词加两组对比形容词", "同位从句谓语", "说明真实空间特点", "small/efficient与big/empty平行对照，rather than否定后者。"),
  ], "Mies's sophisticated presentation masked the fact that the spaces were small and efficient.", "密斯精巧的呈现掩盖了一个事实：他设计的空间小而高效，而不是大而经常空荡。", "密斯巧妙的设计让人不易察觉：这些空间其实小巧高效，并非宽大却常显空洞。", "解释审美效果使实用小空间不显局促，驳斥优雅必须宽大的看法。", ["rather than big and often empty"], [
    clause("that the spaces he designed were small and efficient, rather than big and often empty", "同位内容从句", "that", "解释fact内容", "the spaces he designed", "were", "small and efficient, rather than big and often empty", "先译小巧高效事实，再译并非宽大空洞的对比。"),
    clause("he designed", "省略关系词的定语从句", "省略that/which", "限定spaces", "he", "designed", "省略的宾语关系词，指spaces", "译为‘他设计的空间’，he不是spaces的同位语。"),
  ]),
];

passage2011P3Sentences.push(
  sentence(11, [
    segment("The apartments in the elegant towers ", "subject", "名词加地点后置定语", "主语中心及位置", "were的主语", "apartments为主语，in the elegant towers说明所在建筑。"),
    segment("Mies built on Chicago's Lake Shore Drive, ", "modifier", "省略宾语关系词的定语从句", "后置定语", "修饰towers", "Mies主语，built谓语，省略宾语that/which指towers，on引建造位置。"),
    segment("for example, ", "modifier", "举例插入语", "篇章功能状语", "将公寓作为小而高效的实例", "不参与主句主谓宾。"),
    segment("were smaller ", "predicate", "系动词加比较级", "主句谓语", "说明apartments的面积", "smaller与后面的than those配合。"),
    segment("– two-bedroom units under 1,000 square feet – ", "modifier", "破折号同位名词短语", "大小补充说明", "补充apartments", "two-bedroom有两间卧室，under 1,000为面积上限，不是长度。"),
    segment("than those in their older neighbors along the city's Gold Coast.", "modifier", "than比较结构", "比较对象补足", "补充smaller", "those替代apartments，older neighbors指邻近较早建成的楼宇，不是年长住户。"),
  ], "The apartments were smaller than those in their older neighbors.", "例如，密斯在芝加哥湖滨大道建造的优雅高楼中的公寓，比沿城市黄金海岸区的较老邻楼中的公寓更小——这些两居室单元不足1,000平方英尺。", "例如，密斯在芝加哥湖滨大道设计的高层公寓楼十分优雅，但其中的两居室还不到1,000平方英尺，比附近黄金海岸区老楼里的公寓更小。", "用真实面积与同类住房比较，明确34题更宽敞的说法与原文相反。", ["two-bedroom units under 1,000 square feet", "than those in their older neighbors"], [
    clause("Mies built on Chicago's Lake Shore Drive", "省略关系词的定语从句", "省略that/which", "限定towers", "Mies", "built", "省略关系代词，指towers", "译为密斯在芝加哥湖滨大道建造的那些高楼。"),
    clause("than those in their older neighbors along the city's Gold Coast", "省略谓语的比较从句", "than", "限定smaller的比较标准", "those in their older neighbors along the city's Gold Coast", "省略were", "省略面积大小比较信息", "those必须还原成公寓，进行同类比较。"),
  ]),
  sentence(12, [
    segment("But they were popular ", "predicate", "转折词、代词及系表", "主句主谓", "they指这些公寓", "popular为受欢迎，不是建筑材料普及率。"),
    segment("because of their airy glass walls, ", "modifier", "because of加名词短语", "原因状语第一项", "解释popular", "airy形容通透感，玻璃墙是第一项原因。"),
    segment("the views they afforded ", "modifier", "名词加省略关系词从句", "并列原因第二项", "共同受because of支配", "they afforded修饰views，they指公寓，views为其提供的视野。"),
    segment("and the elegance of the buildings' details and proportions, ", "modifier", "and加名词及of短语", "并列原因第三项", "解释popular", "细部和比例的优雅同属建筑审美，不是被忽略的装饰。"),
    segment("the architectural equivalent of the abstract art so popular at the time.", "modifier", "名词同位说明加形容词后置定语", "审美类比补充", "概括上述建筑形式", "equivalent是建筑中相应的表现；so popular修饰abstract art，at the time为当时时间。"),
  ], "they were popular because of their airy glass walls, the views they afforded and the elegance of the buildings' details and proportions.", "但它们因通透的玻璃墙、所提供的视野以及建筑细部和比例的优雅而受欢迎，这相当于当时十分流行的抽象艺术在建筑中的表现。", "不过，这些公寓依然很受欢迎：玻璃墙通透，视野开阔，建筑的细部与比例优雅，呼应了当时流行的抽象艺术。", "34题D以equivalent对应共有某些抽象艺术特点；不把art的流行转给材料。", ["the views they afforded", "the architectural equivalent of the abstract art"], [clause("they afforded", "省略关系词的定语从句", "省略that/which", "限定views", "they", "afforded", "省略宾语关系词，指views", "译为公寓所提供的视野。")]),
  sentence(13, [
    segment('The trend toward "less" ', "subject", "名词加方向介词定语", "主语", "was的主语", "less加引号表示简约取向，非简单收入变少。"),
    segment("was not entirely ", "predicate", "系动词加部分否定", "谓语", "限制foreign的程度", "not entirely并非完全，承认有外来影响也有本土来源。"),
    segment("foreign.", "object", "形容词", "表语", "说明trend来源", "foreign相对美国本土而言。"),
  ], 'The trend toward "less" was not entirely foreign.', "趋向‘更少’的潮流并不完全是外来的。", "这股追求简约的风潮，也有美国本土的根源。", "从欧洲影响转向本土例证，不能译成全然本土或全然外来。", ["not entirely foreign"]),
  sentence(14, [
    segment("In the 1930s ", "modifier", "in加年代表达", "时间状语", "限定started", "1930s为20世纪30年代，数字与s整体理解。"),
    segment("Frank Lloyd Wright started building ", "predicate", "人名主语加动词与动名词", "主句主谓", "Wright为建筑师", "start building为开始建造，不把building误作楼房名词。"),
    segment("more modest and efficient houses ", "object", "比较级并列定语加名词", "building的宾语", "说明新住宅风格", "more同时支持modest与efficient比较，房屋更朴素、更高效。"),
    segment("– usually around 1,200 square feet – ", "modifier", "面积插入短语", "规模补充说明", "说明houses典型面积", "around表示约数，usually限制为通常情况。"),
    segment("than the spreading two-story ones ", "modifier", "than加比较名词短语", "比较标准", "与新式houses比较", "ones替代houses，spreading表示占地铺展，two-story为两层。"),
    segment("he had designed in the 1890s and the early 20th century.", "modifier", "省略关系词的定语从句", "后置定语", "限定ones", "he指Wright，had designed在30年代之前，1890s与20世纪初并列时间。"),
  ], "Frank Lloyd Wright started building more modest and efficient houses than the spreading two-story ones.", "20世纪30年代，弗兰克·劳埃德·赖特开始建造比他在19世纪90年代和20世纪初设计的铺展开来的两层住宅更朴素高效的房屋，通常约1,200平方英尺。", "到了20世纪30年代，赖特开始设计更朴素实用的住宅，面积通常约1,200平方英尺；相比他在19世纪90年代和20世纪初设计的那些占地宽阔的两层住宅，这是一种转变。", "第一项本土源流来自Wright自身风格变化，而非Mies的所有作品。", ["more modest and efficient houses", "the spreading two-story ones"], [
    clause("he had designed in the 1890s and the early 20th century", "省略关系词的定语从句", "省略that/which", "限定ones所指的旧住宅", "he", "had designed", "省略宾语关系词，指ones/houses", "先译他早先设计的旧住宅，再作新旧比较。"),
    clause("than the spreading two-story ones he had designed in the 1890s and the early 20th century", "省略谓语的比较从句", "than", "补充more modest and efficient的比较对象", "the spreading two-story ones he had designed in the 1890s and the early 20th century", "省略were", "省略比较性质", "还原ones为houses，比较同一建筑师前后设计。"),
  ]),
  sentence(15, [
    segment('The "Case Study Houses" ', "subject", "带引号的项目名称", "主语中心", "were的主语", "指‘案例研究住宅’设计项目，不是问卷调查对象。"),
    segment("commissioned from talented modern architects ", "modifier", "过去分词后置定语", "委托来源限定", "修饰Case Study Houses", "commissioned为被动意义，from引受托提供设计的建筑师。"),
    segment("by California Arts & Architecture magazine between 1945 and 1962 ", "modifier", "by施事与between时间短语", "委托者、时间状语", "限定commissioned", "by引杂志这一委托方，不能把建筑师与委托方对调。"),
    segment("were yet another homegrown influence ", "predicate", "系动词加名词表语", "主句谓语", "说明该项目作用", "yet another为又一项，homegrown表美国本土产生。"),
    segment('on the "less is more" trend.', "modifier", "on加名词短语", "影响对象补足", "限定influence", "影响的是简约设计趋势。"),
  ], 'The "Case Study Houses" were another homegrown influence on the "less is more" trend.', "加利福尼亚《艺术与建筑》杂志在1945至1962年间向有才华的现代建筑师委托设计的‘案例研究住宅’，是‘少即是多’趋势的又一项本土影响。", "1945至1962年，加利福尼亚《艺术与建筑》杂志委托优秀现代建筑师设计‘案例研究住宅’，为‘少即是多’提供了另一股美国本土推动力。", "第二个本土源流承接前句Wright，非欧洲传播的重复例证。", ["commissioned from talented modern architects", "yet another homegrown influence"]),
  sentence(16, [
    segment("Aesthetic effect ", "subject", "形容词加抽象名词", "主语", "came的主语", "指案例住宅的审美效果。"),
    segment("came from ", "predicate", "过去时来源搭配", "谓语", "说明效果来源", "from统领三个并列名词项。"),
    segment("the landscape, new materials and forthright detailing.", "object", "三个并列名词短语", "from的并列宾语", "列举审美来源", "landscape为景观，detailing为细部处理，forthright在设计中指直白、不遮掩的表达。"),
  ], "Aesthetic effect came from the landscape, new materials and forthright detailing.", "审美效果来自景观、新材料和直白的细部处理。", "这些住宅的美感来自周边景观、新型材料，以及简洁直白的细部设计。", "35题B直接由landscape推出；新材料不等于环保材料，细节也未被牺牲。", ["forthright detailing"]),
  sentence(17, [
    segment("In his Case Study House, ", "modifier", "in加项目名词短语", "作品范围状语", "限定mispredicted的体现", "his指Ralph Rapson，说明讨论其案例住宅设计。"),
    segment("Ralph Rapson may have mispredicted ", "predicate", "人名主语加情态完成式", "第一分句主谓", "对已过去的预测作保留判断", "may have表示可能作出过错误预测，不是现在能够预测。"),
    segment("just how the mechanical revolution would impact everyday life ", "object", "how嵌入疑问从句", "宾语从句", "说明预测的具体内容", "mechanical revolution为主语，would impact谓语，everyday life宾语，just强调究竟怎样。"),
    segment("– few American families acquired helicopters, ", "modifier", "破折号内解释分句", "插入举例第一项", "举例预测与现实落差", "few为几乎没有，families主语，acquired谓语，helicopters宾语。"),
    segment("though most eventually got clothes dryers – ", "condition", "though让步从句", "插入举例第二项", "让步承认某类技术普及", "most省略American families，eventually最终；got为获得，不是have got现在结构。"),
    segment("but his belief ", "subject", "转折词加名词短语", "第二主分句主语", "was shared的受事", "从技术细节预测转向更广泛的理念。"),
    segment("that self-sufficiency was both desirable and inevitable ", "modifier", "that同位内容从句", "解释belief", "说明信念内容", "self-sufficiency主语，was谓语，both...and...连接两个表语形容词。"),
    segment("was widely shared.", "predicate", "过去时被动加范围副词", "第二主分句谓语", "说明belief广受认同", "shared是被共同认可，不是分摊一件实物。"),
  ], "Ralph Rapson may have mispredicted how the mechanical revolution would impact everyday life but his belief was widely shared.", "在他的案例研究住宅中，拉尔夫·拉普森可能错估了机械革命究竟会如何影响日常生活——几乎没有美国家庭购得直升机，尽管大多数最终有了干衣机——但他认为自给自足既令人向往又不可避免的信念，却广受认同。", "拉尔夫·拉普森在自己的案例住宅中，或许没有准确预见机械革命会怎样改变生活：家庭直升机并未普及，干衣机倒是最终走进了多数家庭。但人们普遍认同他的理念——自给自足既值得追求，也势在必行。", "区分技术预测细节可能失准与总体理念广受接受，不能推断所有新设备普及。", ["may have mispredicted", "both desirable and inevitable", "was widely shared"], [
    clause("how the mechanical revolution would impact everyday life", "嵌入疑问宾语从句", "how", "作mispredicted宾语", "the mechanical revolution", "would impact", "everyday life", "译为机械革命究竟将怎样影响日常生活。"),
    clause("few American families acquired helicopters", "插入解释分句", "破折号引出", "说明预测与现实差异", "few American families", "acquired", "helicopters", "强调几乎没有家庭买直升机，few的否定不可丢。"),
    clause("though most eventually got clothes dryers", "让步状语从句", "though", "对直升机未普及作对照补充", "most（American families）", "eventually got", "clothes dryers", "译成虽然多数家庭最终有了干衣机。"),
    clause("that self-sufficiency was both desirable and inevitable", "同位内容从句", "that", "解释belief", "self-sufficiency", "was", "both desirable and inevitable", "先译人们认同的信念，再译自给自足的两种评价。"),
  ]),
);

function question(number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question {
  return { id: 201100 + number, number, sentenceId: `2011-p3-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: (["A", "B", "C", "D"] as const)[index], text })), answer, locating, explanations };
}
export const passage2011P3Questions: Question[] = [
  question(31, 3, "The postwar American housing style largely reflected the Americans'____.", ["prosperity and growth", "efficiency and practicality", "restraint and confidence", "pride and faithfulness"], "C", "第二段that restraint与postwar confidence共同使small, efficient housing变得时髦。", { A: "第一段的繁荣发展是总体时代印象，But后转入住宅，不能跨过转折取答案。", B: "效率实用是住宅特征，不是题干所问美国人的两种心理取向。", C: "直接对应原文restraint与confidence这对共同原因。", D: "原文没有自豪与忠诚共同塑造住宅风格的说法。" }),
  question(32, 6, "Which of the following can be inferred from Paragraph 3 about the Bauhaus?", ["It was founded by Ludwig Mies van der Rohe.", "Its designing concept was affected by World War II.", "Most American architects used to be associated with it.", "It had a great influence upon American architecture."], "D", "第三段包豪斯相关设计师移居美国并任教，随后说These designers产生enormous influence。", { A: "first popularized说明推广格言，不是创立包豪斯，文中无该校创办者信息。", B: "before World War II限定移居时间，不是说设计理念由二战改变。", C: "some相关设计师赴美不等于大多数美国建筑师都有包豪斯背景。", D: "理念通过相关设计师传入美国并产生巨大影响，属于有依据的概括。" }),
  question(33, 8, "Mies held that elegance of architectural design____.", ["was related to large space", "was identified with emptiness", "was not reliant on abundant decoration", "was not associated with efficiency"], "C", "第四段less decoration properly organized效果更强，Elegance did not derive from abundance。", { A: "他的小而高效空间依然优雅，并非优雅依靠大空间。", B: "rather than big and often empty否定宽大空洞，不能把空无当作优雅本身。", C: "较少装饰经过合理组织即可产生优雅，不依赖大量堆砌。", D: "small and efficient与优雅同时成立，否认效率关联与文意相反。" }),
  question(34, 12, "What is true about the apartments Mies built on Chicago's Lake Shore Drive?", ["They ignored details and proportions.", "They were built with materials popular at that time.", "They were more spacious than neighboring buildings.", "They shared some characteristics of abstract art."], "D", "第五段细部与比例优雅，是当时流行的abstract art在建筑中的equivalent。", { A: "原文强调细部和比例的优雅，不是忽略。", B: "当时popular修饰抽象艺术；材料是今天司空见惯、当年象征未来，不能偷换时间和修饰对象。", C: "原文明确公寓smaller，比邻近老楼公寓小；也须用公寓对公寓比较。", D: "architectural equivalent说明与抽象艺术有相应的形式特征。" }),
  question(35, 16, 'What can we learn about the design of the "Case Study Houses"?', ["Mechanical devices were widely used.", "Natural scenes were taken into consideration.", "Details were sacrificed for the overall effect.", "Eco-friendly materials were employed."], "B", "末段Aesthetic effect came from the landscape，明确景观是审美来源。", { A: "末句谈对机械革命的预测并举直升机未普及，不能概括所有机械设备广泛应用于这些住宅。", B: "landscape表明设计将自然景观纳入审美考虑。", C: "forthright detailing是效果来源之一，不是牺牲细节。", D: "new materials只表示新材料，没有提供其环保属性的证据。" }),
];
