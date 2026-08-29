import type { BeginnerClauseDetail } from "./data";

/**
 * 2000 年人工复核后的主干。只收录旧数据中曾使用释义改写、补词或换词的项目。
 * 每一条必须由原句词序删减得到；题干/选项若本身是片段，则保留原片段。
 */
export const verifiedTrunks2000: Record<string, string> = {
  "p1-s3": "Its scientists were the world's best; its workers the most skilled",
  "p1-s17": "The mid-1980s brought one inquiry after another",
  "p2-s2": "There are about 105 males born, but this ratio drops to near balance, and there are twice as many women as men",
  "p2-s25": "Darwin had a phrase; they look at an organic being as a savage looks at a ship",
  "p3-s1": "it is advisable to find out what its advocates are aiming at; it is possible that they may be regarded as normal",
  "p3-s2": "the case is rather difficult; it can hardly be classed as Literature",
  "p3-s3": "This is what the Futurist says: past conditions of life have been conditionally speeding up, till now we live in a world of noise and violence and speed",
  "p3-s8": "we must make up words that imitate them; we must use many sizes of type and different colored inks, and shorten or lengthen words at will",
  "p3-s10": "it is a little upsetting to read and then to find",
  "p3-s11": "This can hardly be classed as Literature",
  "p3-s12": "no thinking man can refuse to accept their first proposition: that a great change in our emotional life calls for a change of expression",
  "p3-s13": "The whole question is really this: have we essentially changed",
  "p4-s2": "the Japanese are seeing a decline of the traditional work-moral values",
  "p4-s3": "young people were hardworking and saw their jobs as their primary reason for being, but Japan has largely fulfilled its economic needs, and young people don't know where they should go next",
  "p4-s4": "The coming of age of the postwar baby boom and an entry of women into the male-dominated job market have limited the opportunities of teen-agers",
  "p4-s5": "it was found that only 24.5 percent of Japanese students were fully satisfied with school life",
  "p4-s6": "far more Japanese workers expressed dissatisfaction with their jobs than did their counterparts",
  "p4-s8": "Those things are completely ignored",
  "p4-s10": "Japan experienced 2,125 incidents of school violence",
  "p4-s12": "Mitsuo Setoyama raised eyebrows when he argued that liberal reforms had weakened the Japanese morality of respect for parents",
  "p4-s14": "it's never a question of whether you enjoy your job and your life, but only how much you can endure",
  "p4-s15": "With economic growth has come centralization; fully 76 percent of Japan's 119 million citizens live in cities",
  "p4-s16": "Urban Japanese have long endured lengthy commutes and crowded living conditions, but the discomfort is beginning to tell",
  "p4-s17": "the Japanese divorce rate has increased by more than 50 percent, and suicides have increased by nearly one-quarter",
  "p5-s3": "it is the educated who have claimed to have given up on ambition as an ideal",
  "p5-s4": "What is odd is that they have perhaps most benefited from ambition",
  "p5-s5": "There is a heavy note of hypocrisy in this",
  "p5-s6": "people do not seem less interested in success and its signs now than formerly",
  "p5-s7": "the locations, place names and name brands may change, but such items do not seem less in demand today than a decade or two years ago",
  "p5-s8": "What has happened is that people cannot confess fully to their dreams",
  "p5-s10": "the proper formulation is Succeed at all costs but avoid appearing ambitious",
  "p5-s11": "The attacks on ambition are many and come from various angles; its public defenders are few and unimpressive",
  "p5-s12": "the support for ambition as a healthy impulse is probably lower than it has ever been in the United States",
  "p5-s13": "This does not mean that ambition is at an end, that people no longer feel its stirrings and promptings, but only that it is less openly professed",
  "p5-s14": "Consequences follow from this, some of which are that ambition is driven underground, or made sly",
  "p5-s15": "Such is the way things stand",
  "translation-s32": "it is obvious that the strength of a country’s economy is directly bound up with the efficiency of its agriculture and industry, and that this in turn rests upon the efforts of scientists and technologists of all kinds",
  "translation-s34": "the process of industrialization was spread over nearly a century, whereas a developing nation may undergo the same process in a decade or so",
  "translation-s35": "Additional social stresses may also occur because of the population explosion or problems arising from mass migration movements",

  "p3-q20-prompt": "When a novel literary idea appears, people should try to",
  "p3-q22-option-a": "based on reasonable principles",
  "p3-q22-option-b": "new and acceptable to ordinary people",
  "p3-q22-option-c": "indicative of a basic change in human nature",
  "p3-q22-option-d": "more of a transient phenomenon than literature",
  "p4-q23-prompt": "In the Westerners' eyes, the postwar Japan was",
  "p4-q23-option-a": "under aimless development",
  "p4-q23-option-b": "a positive example",
  "p4-q23-option-c": "a rival to the West",
  "p4-q23-option-d": "on the decline",
  "p4-q23-answer": "In the Westerners' eyes, the postwar Japan was a positive example",
  "p4-q24-prompt": "According to the author, what may chiefly be responsible for the moral decline of Japanese society",
  "p4-q25-prompt": "Which of the following is true according to the author",
  "p4-q25-option-b": "Japanese education is characterized by mechanical learning as well as creativity",
  "p4-q25-option-c": "More stress should be placed on the cultivation of creativity",
  "p4-q25-answer": "According to the author, more stress should be placed on the cultivation of creativity",
  "p4-q26-prompt": "The change in Japanese life-style is revealed in the fact that",
  "p5-q28-option-a": "customary of the educated to discard ambition in words",
  "p5-q28-option-b": "too late to check ambition once it has been let out",
  "p5-q28-option-c": "dishonest to deny ambition after the fulfillment of the goal",
  "p5-q28-option-d": "impractical for the educated to enjoy benefits from ambition",
  "p5-q28-answer": "It is dishonest to deny ambition after the fulfillment of the goal",
  "p5-q29-prompt": "Some people do not openly admit they have ambition because",
  "p5-q29-option-a": "they think of it as immoral",
  "p5-q30-prompt": "From the last paragraph the conclusion can be drawn that ambition should be maintained",
  "p5-q30-option-a": "secretly and vigorously",
  "p5-q30-option-b": "openly and enthusiastically",
  "p5-q30-option-c": "easily and momentarily",
  "p5-q30-option-d": "verbally and spiritually",
};

function clause(
  text: string,
  type: string,
  marker: string,
  role: string,
  subject: string,
  predicate: string,
  objectOrComplement: string,
  translationOrder: string,
): BeginnerClauseDetail {
  return { text, type, marker, role, subject, predicate, objectOrComplement, translationOrder };
}

/**
 * 2000 年人工复核后的完整从句表。
 *
 * 这里不使用“看到引导词就自动猜”的结果：每个边界都必须是原文中的连续片段，
 * 主语、谓语、宾语/补语和它在主句中的作用均按本句语境填写。
 */
export const verifiedClauses2000: Record<string, BeginnerClauseDetail[]> = {
  "cloze-s3": [
    clause("only if he produces a surplus", "必要条件状语从句", "only if（只有……才）", "限制主句 can continue to support 成立的必要条件", "he", "produces", "a surplus（宾语）", "先译“只有他产生了剩余”，再译主句“他才能继续养活自己和家人”。"),
  ],
  "cloze-s4": [
    clause("which he must sell", "限制性定语从句", "which（指代 commodity，作 sell 的宾语）", "修饰 commodity，说明这种商品必须拿去出售", "he", "must sell", "which（= the commodity，宾语前置）", "先译先行词 commodity，再把从句处理成“他必须出售的商品”。"),
  ],
  "cloze-s6": [
    clause("If no surplus is available", "条件状语从句", "If（如果）", "给主句 a farmer cannot be self-sufficient 设置条件", "no surplus", "is", "available（表语）", "先译“如果没有可用的剩余”，再译主句结果。"),
  ],

  "p1-s1": [
    clause("if properly handled", "条件状语从句省略", "if（如果）", "给 it may become a driving force 设置条件", "it（承接前文 a history，原文省略）", "is properly handled（原文省略 it is）", "properly 是方式副词，修饰 handled", "先补全为 if it is properly handled，再译“如果处理得当”。"),
  ],
  "p1-s2": [
    clause("When the United States entered just such a glowing period after the end of the Second World War", "时间状语从句", "When（当……时）", "说明主句 had a market 发生的时间背景", "the United States", "entered", "just such a glowing period（宾语）；after...（时间状语）", "先交代二战结束后的时间背景，再译美国所拥有的市场优势。"),
  ],
  "p1-s4": [
    clause("whose economies the war had destroyed", "限制性定语从句", "whose（表示 Europeans and Asians 与 economies 的所属关系）", "修饰 the Europeans and Asians，说明他们的经济遭战争破坏", "the war", "had destroyed", "whose economies（= their economies，宾语前置）", "先找先行词 Europeans and Asians，再译成“其经济已被战争摧毁的欧洲人和亚洲人”。"),
  ],
  "p1-s5": [
    clause("that this primacy should have narrowed", "主语从句", "that（只连接，不作成分）", "是真正主语；句首 It 是形式主语", "this primacy", "should have narrowed", "不及物；should 表示事理上的必然，不译“应该”", "先把 that 从句译成“这种优势会缩小这件事”，再接“是不可避免的”。"),
    clause("as other countries grew richer", "时间兼原因状语从句", "as（随着；也暗含因为）", "修饰 should have narrowed，说明优势缩小的进程与原因", "other countries", "grew", "richer（表语补足语）", "译为“随着其他国家变得更加富裕”，再说明美国优势相应缩小。"),
  ],
  "p1-s13": [
    clause("as though the making of semiconductors, which America had invented and which sat at the heart of the new computer age, was going to be the next casualty", "表语性比较从句", "as though（仿佛）", "放在 looked 后，说明当时看起来是什么情况", "the making of semiconductors", "was going to be", "the next casualty（表语）", "先暂时跳过两个 which 插入从句，读成“半导体制造业仿佛会成为下一个受害者”。"),
    clause("which America had invented", "非限制性定语从句", "which（指代 semiconductors，作 invented 的宾语）", "补充说明 semiconductors 是美国发明的", "America", "had invented", "which（= semiconductors，宾语前置）", "紧跟先行词译为“美国发明的半导体”。"),
    clause("which sat at the heart of the new computer age", "非限制性定语从句", "which（指代 semiconductors，作主语）", "与前一个 which 从句并列，补充半导体的核心地位", "which（= semiconductors）", "sat", "at the heart of the new computer age（地点/地位状语）", "接着补译“并且处在新计算机时代的核心”。"),
  ],
  "p1-s16": [
    clause("that their way of doing business was failing", "宾语从句", "that（只连接，不作成分）", "作 began to believe 的第一个宾语", "their way of doing business", "was failing", "不及物；doing business 后置修饰 way", "先译“他们开始相信”，再译相信的第一项内容。"),
    clause("that their incomes would therefore shortly begin to fall as well", "宾语从句", "that（只连接，不作成分）", "与前一个 that 从句并列，作 believe 的第二个宾语", "their incomes", "would shortly begin to fall", "therefore（因此）与 as well（也）是副词性修饰", "承接第一项原因，译成“因此他们的收入也很快会开始下降”。"),
  ],
  "p1-s20": [
    clause("while Japan has been struggling", "对比状语从句", "while（而；与此同时）", "把美国的持续增长与日本的艰难处境作对比", "Japan", "has been struggling", "不及物；现在完成进行时强调持续至今", "先译美国情况，再用“而日本一直举步维艰”形成对照。"),
  ],
  "p1-s24": [
    clause("how our businesses are improving their productivity", "宾语从句", "how（表示方式/程度）", "作 see 的宾语，说明“看到”的具体内容", "our businesses", "are improving", "their productivity（宾语）", "把整个 how 从句译成“我们的企业如何提高生产率”，接在 see 后。"),
  ],
  "p1-s25": [
    clause("that people will look back on this period as \"a golden age of business management in the United States.\"", "宾语从句", "that（只连接，不作成分）", "作 believes 的宾语", "people", "will look back on", "this period（宾语）；as...（把该时期看作什么）", "先译 William Sahlman 的判断，再完整译出 that 后的内容。"),
  ],

  "p2-s5": [
    clause("that, for the first time, there will be an excess of boys in those crucial years when they are searching for a mate", "宾语从句", "that（只连接，不作成分）", "作 means 的宾语，解释这一变化意味着什么", "there（形式主语；真正主语为 an excess of boys）", "will be", "an excess of boys（真正主语）；for the first time（时间状语）", "先略过插入的 for the first time，读成“这意味着将会出现男孩过剩”。"),
    clause("when they are searching for a mate", "限制性定语从句", "when（关系副词，= during which years）", "修饰 those crucial years，说明是哪一段关键年龄", "they（= boys）", "are searching for", "a mate（介词 for 的宾语）", "放到 years 后译成“在他们寻找配偶的那些关键年份”。"),
  ],
  "p2-s4": [
    clause("as girls do", "比较状语从句", "as（与前一个 as 构成 as...as）", "给 almost as well 提供比较对象", "girls", "do（代替 survive）", "well 被省略，避免重复", "补出重复内容，译成“男婴如今几乎和女婴存活得一样好”。"),
  ],
  "p2-s10": [
    clause("Since much of the variation is due to genes", "原因状语从句", "Since（由于）", "说明 one more agent of evolution has gone 的原因", "much of the variation", "is", "due to genes（表语）", "先译原因“由于许多差异源自基因”，再译主句结论。"),
  ],
  "p2-s17": [
    clause("what is happening", "宾语从句", "what（= the thing that，在从句中作主语）", "作 shows 的宾语，说明印度展示了什么", "what", "is happening", "不及物；what 本身兼具连接词和主语作用", "译为“正在发生的事情”，放在 shows 后理解。"),
  ],
  "p2-s19": [
    clause("that natural selection has lost 80% of its power in upper-middle-class India compared to the tribes", "宾语从句", "that（只连接，不作成分）", "作 means 的宾语，说明当今平庸化意味着什么", "natural selection", "has lost", "80% of its power（宾语）；compared to the tribes（比较状语）", "先译主句 means，再译“自然选择已经失去其 80% 的作用”。"),
  ],
  "p2-s20": [
    clause("that evolution is over", "宾语从句", "that（只连接，不作成分）", "作 means 的宾语", "evolution", "is", "over（表语）", "译为“对我们来说，这意味着进化已经结束”。"),
  ],
  "p2-s24": [
    clause("because machines and society did it for us", "原因状语从句", "because（因为）", "说明人类身体没有自行进化的原因", "machines and society", "did", "it（宾语，代指 evolve 所完成的适应）；for us（受益对象）", "先译主句“我们没有进化”，再用“因为”补充原因。"),
  ],
  "p2-s25": [
    clause("as a savage looks at a ship", "比较状语从句", "as（正如）", "说明 ignorant people 看待生物的方式", "a savage", "looks at", "a ship（介词 at 的宾语）", "译为“正如一个野蛮人看一艘船那样”，与 look at an organic being 对照。"),
  ],
  "p2-s27": [
    clause("however amazed our descendants may be at how far from Utopia we were", "让步状语从句", "however + 形容词（无论多么……）", "给主句 they will look just like us 设置让步背景", "our descendants", "may be", "amazed（表语）；at how far...（感到惊讶的内容）", "先译“无论我们的后代对……多么惊讶”，再突出主句仍成立。"),
    clause("how far from Utopia we were", "间接疑问从句", "how far（离……多远）", "作介词 at 的宾语，说明后代惊讶的具体内容", "we", "were", "how far from Utopia（表语，表示离乌托邦有多远）", "按陈述语序译成“我们当时离乌托邦有多远”，不要倒装。"),
  ],

  "p3-s1": [
    clause("When a new movement in art attains a certain fashion", "时间状语从句", "When（当……时）", "说明 it is advisable... 适用的时间/情境", "a new movement in art", "attains", "a certain fashion（宾语，意为获得一定流行度）", "先译“当一种新的艺术运动流行起来时”，再译主句建议。"),
    clause("what its advocates are aiming at", "宾语从句", "what（作 aim at 的宾语）", "作 find out 的宾语，说明要弄清什么", "its advocates", "are aiming at", "what（介词 at 的宾语前置）", "译成“其倡导者的目标是什么”，使用陈述语序。"),
    clause("however farfetched and unreasonable their principles may seem today", "让步状语从句", "however + 形容词（无论多么……）", "让步说明：即使这些原则今天看起来不合理，后面的可能性仍存在", "their principles", "may seem", "farfetched and unreasonable（并列表语）；today（时间状语）", "先译“无论这些原则今天显得多么牵强和不合理”，再译后文判断。"),
    clause("that in years to come they may be regarded as normal", "主语从句", "that（只连接，不作成分）", "是真正主语；it is possible 中 it 为形式主语", "they（= their principles）", "may be regarded", "as normal（主语补足语）；in years to come（时间状语）", "先把从句理解为“未来它们可能被视为正常”，再接“这是可能的”。"),
  ],
  "p3-s2": [
    clause("whatever Futurist poetry may be", "让步状语从句", "whatever（无论……是什么）", "让步限定 it can hardly be classed as Literature", "Futurist poetry", "may be", "whatever（表语，表示无论它属于什么）", "先译“无论未来主义诗歌究竟是什么”，再译主句否定判断。"),
    clause("that the theory on which it is based may be right", "宾语从句", "that（只连接，不作成分）", "作 admitting 的宾语，说明即使承认什么", "the theory on which it is based", "may be", "right（表语）", "先处理内嵌的 on which 定语从句，再译“承认其理论也许正确”。"),
    clause("on which it is based", "限制性定语从句", "on which（= on the theory）", "修饰 theory，说明未来主义诗歌以什么为基础", "it（= Futurist poetry）", "is based", "on which（介词宾语前置）", "译为“未来主义诗歌所依据的理论”。"),
  ],
  "p3-s3": [
    clause("what the Futurist says", "表语从句", "what（在从句中作 says 的宾语）", "放在 is 后说明 This 的具体内容", "the Futurist", "says", "what（宾语前置）", "译成“这简而言之就是未来主义者所说的内容”。"),
  ],
  "p3-s6": [
    clause("if we want to interpret modern stress", "条件状语从句", "if（如果）", "给 We must speed up our literature 设置条件/目的背景", "we", "want", "to interpret modern stress（不定式作 want 的补足内容）", "先译“如果我们想表现现代压力”，再译主句要求。"),
  ],
  "p3-s8": [
    clause("that imitate them", "限制性定语从句", "that（指代 words，作主语）", "修饰 words，限定要创造哪一类词", "that（= words）", "imitate", "them（宾语，指 sounds）", "译为“模仿这些声音的词”。"),
  ],
  "p3-s10": [
    clause("that a certain line describes a fight between a Turkish and a Bulgarian officer on a bridge off which they both fall into the river", "宾语从句", "that（只连接，不作成分）", "作 read 的宾语，说明注释写了什么", "a certain line", "describes", "a fight...（宾语）；between...（fight 的参与者）；on a bridge...（地点）", "先读主干“某一行描写一场打斗”，再逐层补参与者、桥和落水信息。"),
    clause("off which they both fall into the river", "限制性定语从句", "off which（= off the bridge）", "修饰 bridge，说明两名军官从桥上掉下去", "they both", "fall", "off which（起点）；into the river（方向）", "译为“他们两人都从上面掉进河里的那座桥”。"),
    clause("that the line consists of the noise of their falling and the weights of the officers", "宾语从句", "that（只连接，不作成分）", "作 find 的宾语，说明后来发现的内容", "the line", "consists of", "the noise... and the weights...（of 后两个并列宾语）", "先译“却发现这一行只由……构成”，再列出两个并列内容。"),
  ],
  "p3-s11": [
    clause("though it fulfills the laws and requirements of Futurist poetry", "让步状语从句", "though（尽管）", "让步说明：即使符合规则，主句仍否认其文学性", "it（= This）", "fulfills", "the laws and requirements of Futurist poetry（宾语）", "先译“尽管它符合未来主义诗歌的规律和要求”，再译主句。"),
  ],
  "p3-s12": [
    clause("that a great change in our emotional life calls for a change of expression", "同位语从句", "that（只连接，不作成分）", "解释 proposition 的具体内容", "a great change in our emotional life", "calls for", "a change of expression（宾语）", "先译“他们的第一个主张”，再用冒号后的从句说明主张内容。"),
  ],

  "p4-s1": [
    clause("whose productivity and social harmony are the envy of the United States and Europe", "限制性定语从句", "whose（表示 Japan 与 productivity/social harmony 的所属关系）", "修饰 the postwar Japan", "whose productivity and social harmony", "are", "the envy of the United States and Europe（表语）", "译成“其生产率和社会和谐令美欧羡慕的战后日本”。"),
  ],
  "p4-s3": [
    clause("where they should go next", "宾语从句", "where（去哪里）", "作 don't know 的宾语", "they（= young people）", "should go", "where / next（地点与顺序信息）", "按陈述语序译成“他们下一步该往哪里走”。"),
  ],
  "p4-s4": [
    clause("who are already questioning the heavy personal sacrifices involved in climbing Japan's rigid social ladder to good schools and jobs", "限制性定语从句", "who（指代 teen-agers，作主语）", "修饰 teen-agers，说明哪些青少年受到机会限制", "who（= teen-agers）", "are already questioning", "the heavy personal sacrifices...（宾语）；involved in...（后置修饰 sacrifices）", "先抓“正在质疑巨大个人牺牲”，再补充这种牺牲来自攀爬社会阶梯。"),
  ],
  "p4-s5": [
    clause("that only 24.5 percent of Japanese students were fully satisfied with school life", "主语从句", "that（只连接，不作成分）", "是真正主语；it was found 中 it 为形式主语", "only 24.5 percent of Japanese students", "were", "fully satisfied with school life（表语）", "先译调查发现这一动作，再译真正发现的内容。"),
  ],
  "p4-s6": [
    clause("than did their counterparts in the 10 other countries surveyed", "比较状语从句", "than（比）", "给 far more...dissatisfaction 提供比较对象", "their counterparts in the 10 other countries surveyed", "did（代替 expressed dissatisfaction）", "surveyed 是过去分词，后置修饰 countries", "把倒装还原为 their counterparts did，再译“比其他十国的同行更多”。"),
  ],
  "p4-s7": [
    clause("While often praised by foreigners for its emphasis on the basics", "让步状语从句省略", "While（虽然）", "让步说明：虽受称赞，主句仍指出日本教育的问题", "Japanese education（与主句同主语，原文省略）", "is often praised（原文省略主语和 is）", "by foreigners（执行者）；for...（称赞原因）", "先补全 Japanese education is，再译“尽管日本教育常因重基础而受外国人称赞”。"),
  ],
  "p4-s8": [
    clause("that do not show up in the test scores", "限制性定语从句", "that（指代 Those things，作主语）", "修饰 Those things，限定被忽视的内容", "that（= Those things）", "do not show up", "in the test scores（范围/地点状语）", "译为“那些无法在考试分数中显示出来的东西”。"),
  ],
  "p4-s12": [
    clause("who was then education minister", "非限制性定语从句", "who（指代 Mitsuo Setoyama，作主语）", "补充 Setoyama 当时的身份", "who（= Mitsuo Setoyama）", "was", "then education minister（表语）", "作为插入信息译成“当时任教育大臣的濑户山三男”。"),
    clause("when he argued that liberal reforms introduced by the American occupation authorities after World War II had weakened the \"Japanese morality of respect for parents.\"", "时间状语从句", "when（当……时）", "说明 raised eyebrows 发生在何时/因何发生", "he", "argued", "that...（宾语从句，说明其主张内容）", "先译“当他声称……时”，再回到主句“引起震动”。"),
    clause("that liberal reforms introduced by the American occupation authorities after World War II had weakened the \"Japanese morality of respect for parents.\"", "宾语从句", "that（只连接，不作成分）", "作 argued 的宾语", "liberal reforms introduced by the American occupation authorities after World War II", "had weakened", "the \"Japanese morality of respect for parents\"（宾语）", "先识别 introduced... 是修饰 reforms 的分词短语，再译改革削弱了什么。"),
  ],
  "p4-s14": [
    clause("whether you enjoy your job and your life", "间接疑问从句", "whether（是否）", "作介词 of 的宾语，说明“不问”的内容", "you", "enjoy", "your job and your life（并列宾语）", "译为“你是否享受工作和生活”，保持陈述语序。"),
    clause("how much you can endure", "间接疑问从句", "how much（多少）", "与 whether 从句对比，说明唯一在意的是能忍受多少", "you", "can endure", "how much（宾语前置）", "译为“而只在于你能忍受多少”。"),
  ],
  "p4-s15": [
    clause("where community and the extended family have been abandoned in favor of isolated, two-generation households", "限制性定语从句", "where（= in the cities）", "修饰 cities，说明城市里的社会结构变化", "community and the extended family", "have been abandoned", "in favor of isolated, two-generation households（取舍/替代状语）", "放到 cities 后译成“在那里，社区和大家庭已让位于孤立的两代家庭”。"),
  ],
  "p4-s16": [
    clause("as the old group and family values weaken", "时间兼原因状语从句", "as（随着）", "说明 the discomfort is beginning to tell 的过程与背景", "the old group and family values", "weaken", "不及物；old 同时修饰 group and family values", "先译“随着旧有群体与家庭价值观削弱”，再译不适开始显现后果。"),
  ],
  "p4-s17": [
    clause("while still well below that of the United States", "让步状语从句省略", "while（虽然）", "让步说明：日本离婚率虽仍低于美国，却已经明显上升", "the Japanese divorce rate（与主句同主语，原文省略）", "is still well below（原文省略主语和 is）", "that of the United States（比较对象；that 代替 divorce rate）", "补全后译为“日本离婚率虽然仍远低于美国”。"),
  ],

  "p5-s1": [
    clause("If ambition is to be well regarded", "条件状语从句", "If（如果）", "给主句 rewards... must be deemed worthy 设置条件", "ambition", "is to be well regarded", "be to do 表示要想达到的状态；well 修饰 regarded", "先译“如果抱负要得到正面评价”，再译主句所需条件。"),
  ],
  "p5-s2": [
    clause("If the tradition of ambition is to have vitality", "条件状语从句", "If（如果）", "给后面两个 must 判断设置条件", "the tradition of ambition", "is to have", "vitality（宾语）", "先译“如果崇尚抱负的传统要保持生命力”，再译主句。"),
    clause("who are themselves admired", "限制性定语从句", "who（指代 people，作主语）", "修饰 people，说明哪些人的认可能使抱负受重视", "who（= people）", "are admired", "themselves（强调这些人本人也受敬仰）", "译成“那些本身也受人敬仰的人”。"),
  ],
  "p5-s3": [
    clause("who have claimed to have given up on ambition as an ideal", "强调句中的定语式从句", "who（指代 the educated，作主语）", "与 it is the educated 构成强调句，突出声称放弃抱负的是受教育者", "who（= the educated）", "have claimed", "to have given up on ambition as an ideal（完成不定式作 claim 的内容）", "先还原为 the educated have claimed...，再突出“恰恰是受教育者”。"),
  ],
  "p5-s4": [
    clause("What is odd", "主语从句", "What（= the thing that，在从句中作主语）", "作全句主语", "What", "is", "odd（表语）", "把整个从句译成“奇怪之处”，再接系动词后的说明。"),
    clause("that they have perhaps most benefited from ambition", "表语从句", "that（只连接，不作成分）", "放在 is 后解释奇怪之处是什么", "they（= the educated）", "have benefited", "from ambition（来源）；perhaps/most（程度副词）", "译成“他们也许正是从抱负中获益最多的人”。"),
  ],
  "p5-s5": [
    clause("after the horses have escaped", "时间状语从句", "after（在……之后）", "修饰 closing the barn door，说明关门发生得太晚", "the horses", "have escaped", "不及物；完成时强调马已经跑掉", "译成“马已经逃走之后才关谷仓门”，体现事后补救。"),
  ],
  "p5-s6": [
    clause("than formerly", "比较状语从句省略", "than（比）", "给 less interested 提供过去的比较基准", "people（原文省略）", "were interested（原文省略）", "formerly（从前，时间状语）", "补全为 than people were formerly，理解成“如今并不比从前更不关心成功”。"),
  ],
  "p5-s7": [
    clause("than a decade or two years ago", "比较状语从句省略", "than（比）", "给 less in demand today 提供过去的比较基准", "such items（原文省略）", "were in demand（原文省略）", "a decade or two years ago（时间状语）", "补出重复成分，译成“这些东西如今的需求并不比十年或二十年前少”。"),
  ],
  "p5-s8": [
    clause("What has happened", "主语从句", "What（= the thing that，在从句中作主语）", "作全句主语", "What", "has happened", "不及物", "译成“已经发生的变化”，再接 is 后的具体解释。"),
    clause("that people cannot confess fully to their dreams", "表语从句", "that（只连接，不作成分）", "放在 is 后说明发生了什么变化", "people", "cannot confess", "fully to their dreams（fully 修饰 confess；to 引出承认的内容）", "译成“人们不能再完全坦率地承认自己的梦想”。"),
    clause("as once they could", "比较状语从句", "as（像……一样）", "与前面的 as easily and openly 构成同级比较", "they", "could（后省略 confess to their dreams）", "once（从前，时间状语）", "补出重复动作，译成“不再像从前那样轻易而公开地承认”。"),
    clause("lest they be thought pushing, acquisitive and vulgar", "预防性目的状语从句", "lest（唯恐，以免）", "说明人们不敢公开承认梦想的顾虑", "they", "be thought", "pushing, acquisitive and vulgar（三个并列主语补足语）", "译为“唯恐被认为咄咄逼人、贪得无厌而且庸俗”。"),
  ],
  "p5-s11": [
    clause("where they are not extremely unattractive", "让步性关系从句", "where（在……的情况下；此处不表示地点）", "补充评价 defenders：即便不至于令人反感，也仍乏善可陈", "they（= its public defenders）", "are not", "extremely unattractive（表语）", "按让步译成“即使他们还不至于极其令人反感”。"),
  ],
  "p5-s12": [
    clause("than it has ever been in the United States", "比较状语从句", "than（比）", "给 lower 提供比较基准", "it（= the support for ambition）", "has ever been", "lower 的比较内容被省略；in the United States（范围状语）", "补足“比它在美国以往任何时候都低”，中文译成“降到前所未有的低点”。"),
  ],
  "p5-s13": [
    clause("that ambition is at an end", "宾语从句", "that（只连接，不作成分）", "作 does not mean 的第一个否定宾语", "ambition", "is", "at an end（表语）", "置于 not mean 后译成“这并不意味着抱负已经终结”。"),
    clause("that people no longer feel its stirrings and promptings", "宾语从句", "that（只连接，不作成分）", "与前一从句并列，作 does not mean 的第二个否定宾语", "people", "no longer feel", "its stirrings and promptings（并列宾语）", "继续译成“也不意味着人们不再感到它的冲动和驱策”。"),
    clause("that, no longer openly honored, it is less openly professed", "宾语从句", "that（只连接，不作成分）", "在 but only 后作 mean 的真正肯定内容", "it（= ambition）", "is less openly professed", "no longer openly honored（插入的过去分词短语）", "先处理插入语“不再被公开尊崇”，再译“它也较少被公开承认”。"),
  ],
  "p5-s14": [
    clause("some of which are that ambition is driven underground, or made sly", "非限制性定语从句", "some of which（其中一些）", "补充说明 consequences 中的一些具体后果", "some of which（= some of the consequences）", "are", "that ambition is driven underground, or made sly（表语从句）", "先译“这会产生一些后果”，再译“其中一些是……”。"),
    clause("that ambition is driven underground, or made sly", "表语从句", "that（只连接，不作成分）", "放在 are 后说明后果的具体内容", "ambition", "is driven / (is) made", "underground / sly（两个并列主语补足语，第二个 is 省略）", "译成“抱负被迫转入地下，或者变得隐秘鬼祟”。"),
  ],
  "p5-s15": [
    clause("things stand", "省略关系词的定语从句", "省略 how / in which", "修饰 the way，说明事情所处的状态", "things", "stand", "不及物；stand 表示“处于某种状态”", "把 the way things stand 整体译成“事情目前的状况”。"),
  ],

  "translation-s32": [
    clause("that the strength of a country’s economy is directly bound up with the efficiency of its agriculture and industry", "主语从句", "that（只连接，不作成分）", "与下一个 that 从句共同作真正主语；it is obvious 中 it 为形式主语", "the strength of a country’s economy", "is directly bound up with", "the efficiency of its agriculture and industry（介词 with 的宾语）", "先译“一个国家的经济实力与其农业和工业效率直接相关”。"),
    clause("that this in turn rests upon the efforts of scientists and technologists of all kinds", "主语从句", "that（只连接，不作成分）", "由 and 连接，与前一个 that 从句并列作真正主语", "this（指前述农业和工业效率）", "rests upon", "the efforts of scientists and technologists of all kinds（介词 upon 的宾语）", "接着译“而这种效率又依靠各类科学家和技术人员的努力”。"),
  ],
  "translation-s33": [
    clause("while governments are often forced to introduce still further innovations for the reasons given above", "对照状语从句", "while（而；与此同时）", "把人们的新需求与政府被迫继续创新两方面并列对照", "governments", "are often forced", "to introduce still further innovations（主语补足语）；for...（原因状语）", "先译 people 分句，再用“与此同时/而”引出政府方面。"),
  ],
  "translation-s34": [
    clause("that followed", "限制性定语从句", "that（指代 changes，作主语）", "修饰 changes in social patterns，说明这些变化随工业化而来", "that（= changes）", "followed", "不及物；含义为“随后发生/随之而来”", "译成“随之而来的社会模式深远变化”。"),
    clause("whereas nowadays a developing nation may undergo the same process in a decade or so", "对比状语从句", "whereas（然而；相比之下）", "把早期欧洲近百年的过程与发展中国家约十年的过程对比", "a developing nation", "may undergo", "the same process（宾语）；in a decade or so（时间状语）", "先译前半句近一个世纪，再用“而如今”引出十年左右的鲜明对比。"),
  ],

  "p3-q20-prompt": [
    clause("When a novel literary idea appears", "时间状语从句", "When（当……时）", "说明 people should try to... 的情境", "a novel literary idea", "appears", "不及物", "先译“当一种新的文学思想出现时”，选项补全主句动作。"),
  ],
  "p3-q20-answer": [
    clause("When a novel literary idea appears", "时间状语从句", "When（当……时）", "说明 people should try to determine... 的情境", "a novel literary idea", "appears", "不及物", "先译时间从句，再译完整答案“人们应设法确定其目的”。"),
  ],
  "p3-q21-prompt": [
    clause("that we must", "宾语从句（由选项补全）", "that（只连接，不作成分）", "作 claim 的宾语；must 后的主要动词留给选项补全", "we", "must + 选项动词", "题干在 must 后留空，单独看不是完整句子", "先读“未来主义者声称我们必须……”，再代入每个选项。"),
  ],
  "p3-q21-answer": [
    clause("that we must develop new modes of expression", "宾语从句", "that（只连接，不作成分）", "作 claim 的宾语", "we", "must develop", "new modes of expression（宾语）", "译为“未来主义者声称我们必须发展新的表达方式”。"),
  ],
  "p3-q22-prompt": [
    clause("that Futurist poetry is", "宾语从句（由选项补全）", "that（只连接，不作成分）", "作 believes 的宾语；is 后的表语留给选项补全", "Futurist poetry", "is", "表语由 A—D 选项补全", "先读“作者认为未来主义诗歌是……”，再逐项代入。"),
  ],
  "p3-q22-answer": [
    clause("that Futurist poetry is more of a transient phenomenon than literature", "宾语从句", "that（只连接，不作成分）", "作 believes 的宾语", "Futurist poetry", "is", "more of a transient phenomenon than literature（表语和比较结构）", "译为“作者认为，与其说它是文学，不如说它是一种短暂现象”。"),
  ],
  "p4-q26-answer": [
    clause("that the young are less tolerant of discomforts in life", "同位语从句", "that（只连接，不作成分）", "解释 the fact 的具体内容", "the young", "are", "less tolerant of discomforts in life（表语）", "先译“这一事实”，再补充“年轻人更不能忍受生活中的不适”。"),
  ],
  "p5-q27-answer": [
    clause("if its returns well compensate for the sacrifices", "条件状语从句", "if（如果）", "说明 ambition may be well regarded 的条件", "its returns", "compensate for", "the sacrifices（介词 for 的宾语）；well（程度副词）", "先译主句判断，再译“如果它的回报足以补偿牺牲”。"),
  ],
  "p5-q28-prompt": [
    clause("that it is", "宾语从句（由选项补全）", "that（只连接，不作成分）", "作 implies 的宾语；is 后的表语由选项补全", "it", "is", "表语由 A—D 选项补全", "先读“末句很可能暗示……是……的”，再代入选项。"),
  ],
  "p5-q29-prompt": [
    clause("they have ambition", "省略 that 的宾语从句", "省略 that", "作 admit 的宾语；句末 because 等待选项补充原因", "they", "have", "ambition（宾语）", "先读“有些人不公开承认自己有抱负，因为……”，再代入原因选项。"),
  ],
  "p5-q30-prompt": [
    clause("that ambition should be maintained", "宾语从句", "that（只连接，不作成分）", "作 can be drawn 的内容，说明可得出什么结论", "ambition", "should be maintained", "方式由选项补全", "先译“可得出抱负应当以……方式保持”，再代入选项副词。"),
  ],
};

/** UI 对 2000 年不再回退到自动从句推导；表中没有键即表示人工确认“无完整从句”。 */
export function verifiedClausesFor2000(id: string) {
  return Object.prototype.hasOwnProperty.call(verifiedClauses2000, id)
    ? verifiedClauses2000[id]
    : [];
}
