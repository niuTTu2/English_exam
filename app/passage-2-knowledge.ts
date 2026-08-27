import type { VocabEntry } from "./data";
import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";

type Structure = NonNullable<VocabEntry["structures"]>[number];

const s = (
  pattern: string,
  meaning: string,
  rule: string,
  examples: Structure["examples"],
): Structure => ({ pattern, meaning, rule, examples });

type PhraseDefinition = {
  key: string;
  sourceExpression: string;
  canonical: string;
  type: string;
  meaning: string;
  summary: string;
  grammarRole: string;
  rule: string;
  example: { english: string; chinese: string };
  pitfalls?: string[];
};

const p = (
  key: string,
  sourceExpression: string,
  canonical: string,
  type: string,
  meaning: string,
  grammarRole: string,
  rule: string,
  example: { english: string; chinese: string },
  pitfalls: string[] = [],
): PhraseDefinition => ({
  key,
  sourceExpression,
  canonical,
  type,
  meaning,
  summary: `原文表达“${sourceExpression}”；规范结构为“${canonical}”。${meaning}`,
  grammarRole,
  rule,
  example,
  pitfalls,
});

const definitions: PhraseDefinition[] = [
  p("being-a-man", "being a man", "being + noun", "动名词主语", "成为男性这一事实", "动名词短语作主语", "being 后接名词或形容词，整体把一个状态名词化。", { english: "Being a parent requires patience.", chinese: "成为父母需要耐心。" }, ["being a man 不是进行时；being 在这里是动名词。"]),
  p("has-always-been", "has always been", "have/has always been + complement", "完成时系表结构", "一直处于某种状态", "现在完成时谓语", "主语为第三人称单数时用 has，其他人称用 have；always 放在助动词后。", { english: "The rule has always been important.", chinese: "这条规律一直很重要。" }),
  p("for-every", "for every", "for every A, B", "数量对应结构", "每一个 A 对应一个 B", "介词短语；建立数量基准", "for every 后接单数可数名词或数词，常用于比例、交换和对应关系。", { english: "There is one nurse for every ten patients.", chinese: "每十名病人配一名护士。" }, ["不要把 for every 误读成“为了每一个”；比例语境中是“每……对应”。"]),
  p("drop-to-near-balance", "drops to near balance", "drop to + result", "变化动词搭配", "降至接近平衡的状态", "谓语 + 结果补语", "drop to 后接数值、水平或状态，to 表示变化后的终点。", { english: "The rate dropped to near balance after a decade.", chinese: "十年后该比例降至接近平衡。" }, ["drop to 表示降到某终点；drop by 表示下降幅度。"]),
  p("at-age-of-maturity", "at the age of maturity", "at the age of + noun", "时间介词结构", "在成熟年龄", "时间状语", "at the age of 后接具体年龄或阶段名词。", { english: "She left home at the age of maturity.", chinese: "她在成熟年龄离开了家。" }, ["at the age of 后面接年龄或阶段名词；此处 maturity 指成熟阶段，不是一个具体数字。"]),
  p("twice-as-many", "twice as many women as men", "twice as many + plural noun + as", "倍数比较", "女性数量是男性的两倍", "数量比较结构", "many 修饰可数名词复数；倍数词置于 as many 前。", { english: "The city has twice as many buses as before.", chinese: "这座城市的公交车数量是以前的两倍。" }, ["可数名词用 as many；不可数名词用 as much。"]),
  p("universal-of", "the universal of", "the universal of + field", "名词 + of 结构", "某领域的普遍规律", "名词短语中的后置介词补足语", "of 引出 universal 所涉及的领域或对象。", { english: "The universal of supply and demand guides prices.", chinese: "供求规律指导价格。" }),
  p("male-mortality", "male mortality", "male + abstract noun", "学术名词短语", "男性死亡率 / 男性死亡现象", "名词短语", "male 作前置定语修饰 mortality；mortality 通常为不可数名词。", { english: "Male mortality falls when medical care improves.", chinese: "医疗改善时男性死亡率会下降。" }, ["mortality 在此指群体死亡率或死亡现象，不是某一个人的死亡；不要写成 males mortality。"]),
  p("being-changed", "is being changed", "be being + past participle", "进行时被动", "正在被改变", "现在进行时被动谓语", "be 的时态承载时态信息，being 后接过去分词表示动作正在作用于主语。", { english: "The policy is being changed this year.", chinese: "这项政策今年正在被修改。" }, ["is changed 是一般现在时被动；is being changed 强调正在发生。"]),
  p("survive-as-well-as", "almost as well as", "as well as + comparison", "同级比较", "几乎和……一样好", "副词比较结构", "as well as 比较动作完成的程度，almost 修饰整个比较，第二个主语后的 do 可代替重复动词。", { english: "The seedlings survived almost as well as the older plants did.", chinese: "这些幼苗的存活情况几乎和老植株一样好。" }, ["本句 as well as 是同级比较“和……一样好”，不是表示并列添加的“以及”；句末 do 代替 survive。"]),
  p("for-first-time", "for the first time", "for the first time", "时间副词短语", "第一次", "句子或谓语的时间状语", "通常置于句首或句末，强调某事此前未发生。", { english: "For the first time, the two groups agreed.", chinese: "两个群体第一次达成了一致。" }, ["for the first time 表示首次发生，和 at first（起初）不是同义表达。"]),
  p("excess-of", "an excess of", "an excess of + noun", "数量名词结构", "过量的；超过需要的数量", "名词短语", "excess 是中心名词，of 后接过量的对象。", { english: "An excess of sugar can harm health.", chinese: "糖分过量会损害健康。" }, ["excess 强调超过需要或限度；surplus 更常指可利用的盈余。"]),
  p("searching-for-mate", "searching for a mate", "search for + noun", "动词短语", "寻找配偶", "现在分词短语 / 定语从句谓语", "search for 后接寻找的对象；search a place 表示搜查地点，结构不同。", { english: "The birds are searching for a mate.", chinese: "这些鸟正在寻找配偶。" }, ["search for 后必须保留介词 for；search + 地点则是“搜查某地”，不能混用。"]),
  p("natural-selection", "natural selection", "natural selection", "生物学术语", "自然选择", "名词短语", "natural 作前置定语，selection 指保留适应者的过程。", { english: "Natural selection changes a population over time.", chinese: "自然选择会随时间改变种群。" }, ["natural selection 是一个不可数的进化过程术语；此处不是日常语境的 natural choice（自然的选择）。"]),
  p("removed", "has been removed", "have/has been removed", "完成时被动", "已经被移除 / 消除", "现在完成时被动谓语", "has been + 过去分词强调动作已完成且结果仍相关。", { english: "The barrier has been removed.", chinese: "障碍已经被清除。" }),
  p("fifty-years-ago", "fifty years ago", "number + years ago", "过去时间结构", "五十年前", "时间状语", "years ago 以现在为参照说明过去时间，数词前不加介词。", { english: "The village looked different fifty years ago.", chinese: "五十年前这个村庄面貌不同。" }),
  p("chance-of-surviving", "the chance of a baby (particularly a boy baby) surviving", "the chance of sb doing sth", "动名词复合结构", "某人做某事的可能性", "chance 后的 of + 动名词复合结构", "of 后可用名词 + doing，名词是动名词动作的逻辑主语。", { english: "The chance of the patient recovering is high.", chinese: "病人康复的可能性很高。" }, ["不能把 surviving 改成不定式 to survive 而仍保留 of；可说 the chance for sb to do sth。"]),
  p("depended-on", "depended on", "depend on + factor", "动词搭配", "取决于；依赖", "过去时谓语 + 介词补足语", "depend 必须与 on 连用，on 后接决定因素或依赖对象。", { english: "Success depends on preparation.", chinese: "成功取决于准备。" }, ["depend 后不能直接接宾语；不要漏掉 on。"]),
  p("too-light-or-heavy", "too light or too heavy", "too + adjective + or + adjective", "程度对举结构", "过轻或过重", "并列表语 / 后置修饰", "too 修饰形容词表示超过适宜范围，or 连接两个平行形容词。", { english: "The package is too light or too heavy for the scale.", chinese: "这个包裹对秤来说要么太轻要么太重。" }, ["too + 形容词表示超出适宜范围，不是中性的 very；or 两边要保持平行。"]),
  p("almost-certain-death", "almost certain death", "almost + adjective + noun", "程度修饰结构", "几乎确定的死亡", "名词短语", "almost 修饰 certain 的程度，整体表示接近必然的结果。", { english: "Without treatment, the injury meant almost certain death.", chinese: "不治疗的话，这种伤势几乎必死。" }, ["almost 修饰 certain 的确定程度，不能理解成“差不多的 death”；death 在这里是抽象不可数名词。"]),
  p("almost-no-difference", "makes almost no difference", "make (almost) no difference", "动词搭配", "几乎没有影响 / 差别", "make 的宾语结构", "make a/no difference 表示造成 / 不造成影响；almost 放在 no 前加强“几乎”。", { english: "A small delay makes almost no difference.", chinese: "稍有延迟几乎没有影响。" }, ["make a difference 与 make difference 不同；通常需要冠词 a 或限定词。"]),
  p("due-to", "is due to", "be due to + cause", "原因结构", "由……造成；归因于……", "系表结构中的原因补足语", "due to 后接名词或动名词，说明结果的原因。", { english: "The delay was due to heavy rain.", chinese: "延误是由大雨造成的。" }, ["due to 不等于 be due to do；表示计划时间时 due to 还可意为“预定”。"]),
  p("agent-of-evolution", "agent of evolution", "agent of + process", "名词 + of 结构", "进化过程中的作用因素", "名词短语", "agent 在此指产生作用的因素，不是执行行政工作的代理人。", { english: "Selection is an agent of adaptation.", chinese: "选择是适应过程中的一个作用因素。" }, ["agent 在 agent of evolution 中是“作用因素”，不要只按 agent=代理人理解；of 后接过程名词。"]),
  p("evolutionary-suicide", "commit evolutionary suicide", "commit + abstract noun", "比喻动词搭配", "实施进化意义上的自我毁灭", "动词 + 抽象名词宾语", "commit 通常接 crime、suicide 等名词；evolutionary 限定 suicide 的比喻范围。", { english: "A species may commit evolutionary suicide by losing its habitat.", chinese: "一个物种可能因失去栖息地而走向进化意义上的自我毁灭。" }, ["固定搭配是 commit suicide，不能用 do suicide；evolutionary suicide 在本文是群体繁殖过少的比喻。"]),
  p("stay-alive", "stay alive", "stay + adjective", "系动词结构", "保持活着", "系动词 + 表语形容词", "stay 表示状态持续，后接形容词而不是副词。", { english: "The hikers stayed alive through the storm.", chinese: "徒步者熬过了暴风雨而活了下来。" }, ["stay 后接形容词 alive 表示保持某状态，不要写成副词 *alive-ly；alive 与 live 的词性和位置也不同。"]),
  p("fewer-children", "have fewer children", "fewer + plural countable noun", "数量比较结构", "生育较少的孩子", "动词 + 数量宾语", "fewer 修饰可数名词复数；不可数名词应使用 less。", { english: "Many couples choose to have fewer children.", chinese: "许多夫妇选择少生孩子。" }, ["fewer 只修饰可数名词复数；修饰不可数名词应使用 less，且比较级通常暗含参照对象。"]),
  p("as-fertile-as", "as fertile as", "as + adjective + as", "同级比较", "像……一样有生育力 / 多产", "形容词比较结构", "第二个 as 后接比较对象或省略的从句成分。", { english: "The soil is as fertile as it was before.", chinese: "土壤和以前一样肥沃。" }, ["同级比较使用 as + 形容词原级 + as，不能把 fertile 改成比较级再保留这套结构；fertile 可指土地肥沃，也可指生育力强。"]),
  p("except-in", "except in", "except in + place/group", "例外介词结构", "除了在……之外", "范围状语", "except 表排除，in 引出被排除的地点或群体。", { english: "The rule applies everywhere except in remote areas.", chinese: "这条规则适用于各地，偏远地区除外。" }, ["except in 后接地点或群体；except for + 名词通常表示“除……这一点外”，两者功能不要混淆。"]),
  p("very-few-women", "very few women", "very few + plural noun", "数量限定结构", "极少数女性", "主语名词短语", "few 修饰可数名词复数并带否定倾向，very 加强程度。", { english: "Very few workers opposed the change.", chinese: "极少数工人反对这项变化。" }, ["few 几乎没有；a few 有一些，意义相反。"]),
  p("number-of", "the number of", "the number of + plural noun", "数量名词结构", "……的数量", "名词短语主语", "the number of 作主语时谓语用单数；不要与 a number of 混淆。", { english: "The number of births is falling.", chinese: "出生人数正在下降。" }, ["a number of + 复数名词表示“许多”，谓语通常用复数。"]),
  p("like-age-of-death", "like the age of death", "like + noun", "介词比较结构", "像死亡年龄一样", "插入比较状语", "like 后接名词或代词表示“像”；它不是引导完整从句的连词。", { english: "Like the age of death, the birth rate became stable.", chinese: "和死亡年龄一样，出生率也趋于稳定。" }, ["like 在这里是介词，后接名词短语；要引导完整从句应使用 as，不能把 like 当连词硬接主谓结构。"]),
  p("become-average", "become average", "become + adjective", "系动词结构", "变得平均 / 趋于平均", "系动词 + 表语", "become 后接形容词说明变化后的状态。", { english: "The scores became average after practice.", chinese: "练习后分数趋于平均。" }, ["become 后接形容词作表语；average 在此表示趋于平均的状态，不是要求计算平均值的动词。"]),
  p("same-number-offspring", "roughly the same number of offspring", "(roughly) the same number of + plural noun", "数量比较结构", "大致相同数量的后代", "名词短语宾语", "the same number of 修饰可数名词复数；roughly 表近似。", { english: "The two farms produce roughly the same number of seedlings.", chinese: "两个农场培育出大致相同数量的幼苗。" }, ["the same number of 后接可数名词复数；不可数名词的数量要用 the same amount of。"]),
  p("take-advantage-of", "take advantage of", "take advantage of + noun", "动词短语", "利用；趁机利用", "不定式中的动词短语", "of 后接可利用的机会、条件或对象；可带 possessive 表示占便宜。", { english: "We should take advantage of the available data.", chinese: "我们应该利用现有数据。" }, ["take advantage of sb 也可表示“占某人便宜”，需看宾语和语境。"]),
  p("have-diminished", "have diminished", "diminish (over time)", "完成时变化结构", "已经减少 / 减弱", "现在完成时谓语", "diminish 可作不及物动词，表示数量、影响或程度逐渐变小。", { english: "The differences have diminished over time.", chinese: "差异随时间已经缩小。" }),
  p("show-what-happening", "shows what is happening", "show what + clause", "宾语从句结构", "显示正在发生的事情", "及物动词 + what 宾语从句", "what 引导的从句整体作 show 的宾语，并保持陈述语序。", { english: "The graph shows what is happening to prices.", chinese: "图表显示价格正在发生什么变化。" }),
  p("for-a-few", "for a few", "for a few + plural noun", "介词数量结构", "供少数人享有 / 仅对少数人", "介词短语", "for 引出受益或适用对象，a few 修饰可数名词复数。", { english: "The new service is available for a few customers first.", chinese: "这项新服务先供少数顾客使用。" }),
  p("remaining-tribal-peoples", "the remaining tribal peoples", "the remaining + plural noun", "名词短语", "其余的部落民族", "名词短语主语或宾语", "remaining 是现在分词形容词，表示在排除前述部分后留下的。", { english: "The remaining villagers moved to safer ground.", chinese: "其余村民搬到了更安全的地方。" }),
  p("same-in", "the same in", "be the same in + aspect", "比较系表结构", "在某方面相同", "be + 表语 + 介词补足语", "in 后接比较维度，如 size、survival 或 quality。", { english: "The two methods are the same in cost.", chinese: "这两种方法在成本上相同。" }, ["same in 后接比较维度；same as 后接比较对象，不能省略介词或把两种结构混为一谈。"]),
  p("compared-to", "compared to", "compared to/with + noun", "比较介词结构", "与……相比", "过去分词短语作比较状语", "compared to 后接比较对象，常置于句末或句首。", { english: "The new model is light compared to the old one.", chinese: "与旧型号相比，新型号很轻。" }, ["compared to/with 后必须有明确的比较对象；放在句首时要确保逻辑主语就是被比较的对象。"]),
  p("for-us", "for us", "for + pronoun", "介词对象结构", "对我们而言；替我们", "介词短语", "for 的含义由动词决定，可表示受益对象、评价对象或替代关系。", { english: "This decision matters for us.", chinese: "这个决定对我们很重要。" }, ["for us 既可表示“对我们而言”，也可表示“替我们”；要根据前面的动词判断，不能一律翻成“为了我们”。"]),
  p("evolution-over", "evolution is over", "be over", "状态系表结构", "进化已经结束", "be + 表语形容词", "over 作表语表示某过程终止；此处是作者的概括性判断。", { english: "The experiment is over.", chinese: "实验结束了。" }, ["be over 在此表示“结束”，不是空间上的“在……上方”；over 作表语时指过程终止。"]),
  p("little-physical-change", "involved little physical change", "involve little + uncountable noun", "动词 + 数量结构", "只涉及很少的身体变化", "及物动词 + 不可数名词宾语", "little 修饰不可数名词，表示数量少；involve 表包含或牵涉。", { english: "The treatment involved little physical discomfort.", chinese: "这种治疗几乎没有身体不适。" }),
  p("fill-places-in-nature", "fill so many places in nature", "fill + places in + domain", "动词搭配", "占据自然界如此多的生态位置", "及物动词 + 宾语 + 介词补足语", "fill 可指占据空间、职位或生态位；so many 修饰可数名词复数。", { english: "One species cannot fill every place in nature.", chinese: "一个物种不可能占据自然界的每个位置。" }),
  p("past-years", "in the past 100, 000 years", "in the past + period", "时间介词结构", "在过去……年中", "时间状语", "in the past + 时间段常与现在完成时连用；原卷保留数字中的空格写法。", { english: "In the past ten years, the city has changed.", chinese: "过去十年里，这座城市发生了变化。" }, ["in the past + 时间段常与现在完成时连用；和 fifty years ago 这种以现在为参照的点状表达不要混用。"]),
  p("been-transformed", "have been transformed", "have/has been transformed", "完成时被动", "已经被彻底改变", "现在完成时被动谓语", "transform 表示彻底改变形式或性质；被动结构突出生活是受影响对象。", { english: "The region has been transformed by technology.", chinese: "这个地区已被技术彻底改变。" }, ["完成时被动必须是 have/has been + 过去分词 transformed；不要遗漏 been 或把 transformed 写成原形。"]),
  p("did-not-evolve", "did not evolve", "did not + verb", "一般过去时否定", "没有发生进化", "过去时否定谓语", "did not 后接动词原形；不要写成 did not evolved。", { english: "The species did not evolve in isolation.", chinese: "该物种并未在隔绝状态下进化。" }),
  p("did-it-for-us", "did it for us", "do it for sb", "代动词替代结构", "替某人完成某事", "do + it + for 短语", "it 代替前文动作，for us 表示替代对象或受益者。", { english: "Automation did the routine work for us.", chinese: "自动化替我们完成了日常工作。" }, ["do it for sb 中 it 必须有明确的前文指代；for us 表示替我们完成，而不是单纯的目的“为了我们”。"]),
  p("phrase-to-describe", "a phrase to describe", "a noun + to do", "不定式后置定语", "用来描述……的一句话 / 表达", "名词 + 不定式定语", "to describe 修饰 phrase，说明该表达的用途。", { english: "She found a phrase to describe the feeling.", chinese: "她找到了一句话来描述这种感受。" }),
  p("ignorant-of", "ignorant of", "be ignorant of + noun", "形容词介词搭配", "不了解；对……无知", "形容词 + 介词补足语", "ignorant 后用 of 引出不了解的对象。", { english: "He was ignorant of the risks.", chinese: "他不了解这些风险。" }, ["ignorant of 表示缺乏知识，不等于 insulting 地称人为“愚蠢”。"]),
  p("look-at-as", "look at an organic being as", "look at A as B", "看待结构", "把 A 看作 B", "动词短语 + as 补足语", "look at 引出观察对象，as 后说明把对象理解成什么。", { english: "They look at the device as a useful tool.", chinese: "他们把这个装置看作有用工具。" }, ["结构是 look at A as B，不能省略 at；as 后接把 A 理解成的身份或性质，不等同于 look like。"]),
  p("beyond-his-comprehension", "beyond his comprehension", "beyond one's comprehension", "介词评价结构", "超出某人的理解力", "介词短语作后置修饰", "beyond 表示超出范围，comprehension 是理解能力。", { english: "The result was beyond her comprehension.", chinese: "这个结果超出了她的理解力。" }, ["beyond one's comprehension 中 one's 要随所属者变化（his、her、my 等）；comprehension 是名词，不能换成动词 comprehend。"]),
  p("no-doubt", "no doubt", "no doubt + clause", "句子副词", "毫无疑问", "句子层面的确定语气", "no doubt 可置于句首或句中，表示说话者高度确信。", { english: "No doubt the policy will change.", chinese: "毫无疑问，这项政策会改变。" }, ["句首 no doubt 是句子副词，通常与后面的完整分句连用；不要把它误写成一个词 nodoubt。"]),
  p("way-of-life", "way of life", "way of life", "名词短语", "生活方式", "名词 + of 后置修饰", "way 表方式，of life 说明这种方式涉及生活整体。", { english: "Technology has changed our way of life.", chinese: "技术改变了我们的生活方式。" }, ["way of life 是固定名词短语，of 不能随意省略；它指整体生活方式，不只是某一次生活活动。"]),
  p("beyond-comprehension", "beyond comprehension", "beyond + abstract noun", "介词短语", "难以理解；超出理解范围", "后置介词短语", "省略物主限定词时表示一般人的理解范围；具体所属关系可用 beyond one's comprehension。", { english: "The scale of the disaster was beyond comprehension.", chinese: "灾难的规模令人难以理解。" }, ["省略物主词时表示一般意义的“超出理解范围”；若强调具体某人的理解力，应写 beyond his/her comprehension。"]),
  p("for-its-ugliness", "for its ugliness", "for + reason noun", "原因介词结构", "因为它的丑陋", "原因状语", "for 后接名词说明记忆、评价或行动的原因；its 指前面的 way of life。", { english: "The building is remembered for its ugliness.", chinese: "这座建筑因丑陋而被人记住。" }),
  p("amazed-at", "however amazed our descendants may be at", "however + adjective + subject + may be", "让步结构", "无论后代对……多么惊讶", "让步状语从句", "however 修饰形容词，may be 保持情态语气；at 后接惊讶的对象。", { english: "However surprised she may be at the news, she will stay calm.", chinese: "无论她对消息多么惊讶，她都会保持冷静。" }, ["however amazed 不是 however + 副词；amazed 在这里是形容词。"]),
  p("far-from", "far from", "be far from + noun/adjective", "介词评价结构", "远离；远非", "系表结构中的介词短语", "far from 可表示空间距离，也可表示与某状态相差很远。", { english: "The result is far from perfect.", chinese: "结果远非完美。" }, ["far from 后可接名词或形容词；far from perfect 是抽象评价“远非完美”，不一定表示空间距离。"]),
  p("look-just-like", "look just like", "look like + noun", "系动词比较结构", "看起来和……一模一样", "look + 表语介词短语", "look like 后接名词或代词；just 加强相似程度。", { english: "The child looks just like her mother.", chinese: "这个孩子看起来和她母亲一模一样。" }, ["look like 后接名词或代词作表语；just 只加强相似程度，不要把 like 换成 as 而破坏结构。"]),
];

const extraDefinitions: PhraseDefinition[] = [
  p("according-to", "according to", "according to + source", "信息来源结构", "根据；按照（某信息来源）", "介词短语；引出依据或来源", "according to 后接人、资料、段落或规则，说明信息来自哪里。", { english: "According to the report, the rate has fallen.", chinese: "根据报告，该比例已经下降。" }),
  p("male-babies", "male babies", "male + plural noun", "性别名词短语", "男婴；男性婴儿", "名词短语", "male 作前置定语，babies 用复数表示一类人。", { english: "Male babies were monitored closely.", chinese: "男婴受到了密切监测。" }),
  p("female-babies", "female babies", "female + plural noun", "性别名词短语", "女婴；女性婴儿", "名词短语", "female 作前置定语修饰复数名词 babies。", { english: "Female babies had a similar survival rate.", chinese: "女婴的存活率相近。" }),
  p("survival-rate", "survival rate", "survival rate", "统计术语", "存活率", "名词短语", "survival 作前置定语修饰 rate，说明统计的是存活比例。", { english: "The survival rate rose sharply.", chinese: "存活率大幅上升。" }),
  p("birth-rate", "birth rate", "birth rate", "人口统计术语", "出生率", "名词短语", "birth 作前置定语修饰 rate；常与 high、low 搭配。", { english: "The birth rate is falling.", chinese: "出生率正在下降。" }),
  p("technological-advance", "technological advance", "technological + noun", "科技名词短语", "技术进步", "名词短语", "technological 是 technology 的形容词形式，修饰 advance。", { english: "Technological advance changed medical care.", chinese: "技术进步改变了医疗服务。" }),
  p("physical-change", "physical change", "physical + uncountable noun", "生物学名词短语", "身体变化", "名词短语", "physical 修饰 change，强调身体层面的变化而非社会变化。", { english: "The treatment caused little physical change.", chinese: "这种治疗造成的身体变化很小。" }),
  p("human-evolution", "human evolution", "human + abstract noun", "生物学名词短语", "人类进化", "名词短语", "human 作前置定语限定 evolution 的对象。", { english: "Human evolution is still debated.", chinese: "人类进化仍有争议。" }),
  p("fierce-competition", "fierce competition", "adjective + uncountable noun", "竞争名词短语", "激烈竞争", "名词短语", "fierce 修饰不可数名词 competition，表示程度强。", { english: "Fierce competition lowered prices.", chinese: "激烈竞争压低了价格。" }),
  p("lack-of-mates", "lack of mates", "a lack of + plural noun", "缺乏结构", "缺少配偶", "名词 + of 结构", "lack of 表示缺乏，of 后接缺少的对象。", { english: "A lack of mates can reduce reproduction.", chinese: "缺少配偶会降低繁殖率。" }),
  p("lower-survival-rate", "lower survival rate", "comparative adjective + noun", "比较名词短语", "较低的存活率", "名词短语", "lower 是 low 的比较级，用于与另一组数据比较。", { english: "The group had a lower survival rate.", chinese: "该群体的存活率较低。" }),
  p("defective-gene", "defective gene", "adjective + countable noun", "遗传学名词短语", "有缺陷的基因", "名词短语", "defective 表示功能异常；gene 是可数名词。", { english: "A defective gene may affect development.", chinese: "有缺陷的基因可能影响发育。" }),
  p("wealthy-people", "wealthy people", "adjective + plural noun", "社会阶层名词短语", "富裕人群", "名词短语", "wealthy 作前置定语，people 是复数集合名词。", { english: "Wealthy people often have more choices.", chinese: "富裕人群通常有更多选择。" }),
  p("poor-people", "poor people", "adjective + plural noun", "社会阶层名词短语", "贫困人群", "名词短语", "poor 作前置定语，表示经济状况而非道德评价。", { english: "Poor people may face higher risks.", chinese: "贫困人群可能面临更高风险。" }),
  p("rich-and-poor", "the rich and the poor", "the + adjective (group noun)", "群体名词化结构", "富人和穷人", "名词化形容词并列", "the + 形容词表示一类人；and 连接两个平行群体。", { english: "The policy affects the rich and the poor.", chinese: "这项政策影响富人和穷人。" }),
  p("upper-middle-class", "upper-middle-class", "upper-middle-class + noun", "复合形容词", "中上阶层的", "复合前置定语", "多个形容词用连字符连接，整体修饰名词。", { english: "The study focused on upper-middle-class families.", chinese: "研究聚焦于中上阶层家庭。" }),
  p("middle-class-population", "middle class population", "middle-class + population", "社会统计短语", "中产阶层人口", "名词短语", "middle-class 通常加连字符作前置定语。", { english: "The middle-class population is growing.", chinese: "中产阶层人口正在增长。" }),
  p("tribal-peoples", "tribal peoples", "tribal + plural noun", "人群名词短语", "部落民族", "名词短语", "tribal 作前置定语；peoples 强调多个民族群体。", { english: "The remaining tribal peoples retain distinct customs.", chinese: "其余部落民族保留着独特习俗。" }),
  p("highest-stage-evolution", "highest stage of evolution", "the highest stage of + noun", "评价性名词短语", "进化的最高阶段", "名词 + of 结构", "最高级 highest 修饰 stage，of 后说明所属过程。", { english: "No species has reached the highest stage of evolution.", chinese: "没有物种达到进化的最高阶段。" }),
  p("difference-wealth-poverty", "difference between wealth and poverty", "the difference between A and B", "比较名词结构", "财富与贫困之间的差异", "名词 + between 结构", "between 连接两个平行抽象名词。", { english: "The difference between wealth and poverty remains visible.", chinese: "财富与贫困之间的差异仍然明显。" }),
  p("evolutionary-future", "evolutionary future", "adjective + noun", "生物学名词短语", "进化的未来", "名词短语", "evolutionary 作前置定语限定 future 的领域。", { english: "The evolutionary future of the species is uncertain.", chinese: "该物种的进化未来并不确定。" }),
  p("going-nowhere", "going nowhere", "go nowhere", "习语 / 结果结构", "没有进展；走向停滞", "进行时或习语谓语", "nowhere 作副词表示没有任何进展方向。", { english: "The debate is going nowhere.", chinese: "这场争论没有进展。" }),
  p("look-at", "look at", "look at + object", "动词短语", "看；看待", "及物动词短语", "look at 后接观察对象；与 look for（寻找）不同。", { english: "Look at the evidence carefully.", chinese: "仔细看看证据。" }),
];

const allDefinitions = [...definitions, ...extraDefinitions];

export const passage2PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(
  allDefinitions.map((item) => [
    item.key,
    {
      key: item.key,
      sourceExpression: item.sourceExpression,
      canonical: item.canonical,
      type: item.type,
      meaning: item.meaning,
      summary: item.summary,
      grammarRole: item.grammarRole,
      structures: [s(item.canonical, item.meaning, item.rule, [item.example])],
      pitfalls: item.pitfalls,
    },
  ]),
);

export const passage2PhraseAliases: Record<string, string> = Object.fromEntries(
  allDefinitions.map((item) => [item.sourceExpression.toLowerCase(), item.key]),
);

export const passage2CollocationGlosses: Record<string, { meaning: string; note?: string }> = Object.fromEntries(
  allDefinitions.map((item) => [
    item.sourceExpression.toLowerCase(),
    { meaning: item.meaning, note: item.summary },
  ]),
);

export const passage2FamilyGlosses: Record<string, string> = {
  amaze: "使惊讶；使吃惊",
  amazed: "感到惊讶的",
  average: "平均的；平均数",
  biological: "生物学的",
  biology: "生物学",
  biologist: "生物学家",
  birth: "出生；诞生",
  body: "身体；主体",
  chance: "机会；可能性",
  change: "变化；改变",
  child: "孩子",
  compare: "比较",
  comprehension: "理解；理解力",
  competition: "竞争",
  danger: "危险",
  describe: "描述",
  defect: "缺陷；缺点",
  difference: "差异；不同",
  diminish: "减少；减弱",
  evolve: "进化；发展",
  evolution: "进化；演变",
  evolutionary: "进化的",
  fertile: "肥沃的；多产的",
  improve: "改善；提高",
  involve: "涉及；包含",
  life: "生命；生活",
  live: "生活；活着",
  mortality: "死亡率",
  nature: "自然；本性",
  offspring: "后代",
  opportunity: "机会",
  population: "人口；种群",
  poverty: "贫困",
  survive: "生存；幸存",
  survival: "生存；存活",
  transform: "改变；使转化",
  technology: "技术；工艺",
  technologist: "技术专家；技术人员",
  variation: "变化；变异",
  wealth: "财富",
  wealthy: "富裕的",
  weight: "重量；体重",
  survivor: "幸存者；生还者",
  ugly: "丑陋的；难看的",
};

const ws = (pattern: string, meaning: string, rule: string, english: string, chinese: string): Structure[] => [
  s(pattern, meaning, rule, [{ english, chinese }]),
];

export const passage2WordKnowledge: Record<string, WordKnowledge> = {
  be: { grammarRole: "系动词 / 助动词", grammarSummary: "be 可构成系表、进行时和被动语态；本篇同时出现 has been、is being changed、be amazed 等结构。", structures: ws("be + adjective / past participle", "处于某状态；被……", "根据后接成分判断是系表、进行时还是被动。", "The rule is being changed.", "这条规则正在被改变。") },
  being: { grammarRole: "动名词或现在分词", grammarSummary: "Being a man 中 being 是动名词；everyone being the same 中是独立主格或插入分词结构。", structures: ws("being + noun/adjective", "成为……；处于……状态", "动名词作主语或分词短语补充说明。", "Being honest builds trust.", "诚实会建立信任。") },
  have: { grammarRole: "实义动词 / 助动词", grammarSummary: "have 可表示拥有、生育，也可与过去分词构成现在完成时。", structures: ws("have + noun", "拥有；经历；生育", "具体义由宾语决定。", "They have three children.", "他们有三个孩子。") },
  chance: { grammarRole: "名词；可数", grammarSummary: "chance of doing 表示做某事的可能性；chance to do 表示做某事的机会。", structures: ws("the chance of sb doing", "某人做某事的可能性", "of 后可接动名词复合结构。", "There is a chance of rain.", "有下雨的可能。") },
  depend: { grammarRole: "不及物动词", grammarSummary: "depend on 表示取决于或依赖；on 后必须有因素或对象。", structures: ws("depend on + noun", "取决于；依赖", "depend 不能直接带宾语。", "Results depend on evidence.", "结果取决于证据。") },
  difference: { grammarRole: "名词", grammarSummary: "make a/no difference 表示产生 / 不产生影响；difference between A and B 表示两者差异。", structures: ws("make a difference", "产生影响", "difference 前通常需要 a、no 或 other 限定词。", "Small choices make a difference.", "小选择也会产生影响。") },
  due: { grammarRole: "形容词", grammarSummary: "be due to 表示原因；be due to do 还可表示预定要做。", structures: ws("be due to + cause", "由……造成", "to 是介词，后接名词或动名词。", "The error was due to noise.", "错误是由噪声造成的。") },
  evolution: { grammarRole: "不可数名词", grammarSummary: "evolution 指生物或事物逐步演变；evolutionary 是其形容词形式。", structures: ws("the evolution of + noun", "……的演变 / 进化", "of 后接演变对象。", "The evolution of language is complex.", "语言的演变很复杂。") },
  evolve: { grammarRole: "不及物动词", grammarSummary: "evolve 可表示生物进化，也可表示制度、思想逐渐发展。", structures: ws("evolve over time", "随时间进化 / 发展", "通常不直接接表示“进化对象”的宾语。", "Cultures evolve over time.", "文化会随时间发展。") },
  fertile: { grammarRole: "形容词", grammarSummary: "fertile 可描述土地肥沃或人、动物具有较强生育力；as fertile as 是同级比较。", structures: ws("be fertile / as fertile as", "肥沃；多产；有生育力", "比较结构中使用形容词原级。", "The valley is fertile.", "这片山谷很肥沃。") },
  diminish: { grammarRole: "不及物 / 及物动词", grammarSummary: "diminish 表示数量、影响或程度逐渐减少；have diminished 是现在完成时。", structures: ws("diminish over time", "随时间减少", "可不带宾语，也可带表示影响的宾语。", "The risk diminished.", "风险降低了。") },
  involve: { grammarRole: "及物动词", grammarSummary: "involve 表示包含、牵涉；involve little physical change 中 little 修饰不可数名词。", structures: ws("involve + noun", "包含；涉及", "直接接宾语，不需介词。", "The job involves travel.", "这份工作需要出差。") },
  transform: { grammarRole: "及物动词", grammarSummary: "transform 表示彻底改变；be transformed 是被动结构。", structures: ws("transform A into B", "把 A 转变成 B", "into 引出变化后的形式。", "Technology transformed the city.", "技术改变了这座城市。") },
  comprehension: { grammarRole: "不可数名词", grammarSummary: "comprehension 指理解能力；beyond one's comprehension 表示超出理解范围。", structures: ws("beyond one's comprehension", "超出某人的理解力", "beyond 后接抽象能力名词。", "The theory is beyond my comprehension.", "这个理论超出我的理解力。") },
  offspring: { grammarRole: "名词；单复数同形", grammarSummary: "offspring 可指一个或多个后代，形式不随单复数改变。", structures: ws("the offspring of + noun", "……的后代", "数量可由限定词或上下文判断。", "The birds protect their offspring.", "鸟类保护自己的后代。") },
  survival: { grammarRole: "不可数名词", grammarSummary: "survival 表示生存或存活结果；survive 是动词。", structures: ws("survival rate", "存活率", "rate 修饰 survival，构成统计术语。", "The survival rate improved.", "存活率提高了。") },
  wealthy: { grammarRole: "形容词", grammarSummary: "wealthy 表示富裕的；wealth 是名词，poverty 是其反义概念。", structures: ws("wealthy people", "富裕的人", "形容词作前置定语。", "Wealthy families often invest.", "富裕家庭通常会投资。") },
  population: { grammarRole: "可数 / 集合名词", grammarSummary: "population 可指人口总量或生物种群；population is 80% smaller 中谓语用单数。", structures: ws("the population of + place", "某地人口 / 种群", "中心名词 population 决定谓语单复数。", "The population is growing.", "人口正在增长。") },
  lower: { grammarRole: "形容词比较级", grammarSummary: "lower 是 low 的比较级，可修饰 survival rate、cost、level 等。", structures: ws("lower than + comparison", "比……低", "比较对象由 than 引出。", "The rate is lower than before.", "这个比例比以前低。") },
  hardly: { grammarRole: "频度副词", grammarSummary: "hardly 表示几乎不，具有近似否定意义；hardly works 比 works slowly 否定程度更强。", structures: ws("hardly + verb", "几乎不……", "通常置于实义动词前或助动词后。", "The method hardly works.", "这种方法几乎不起作用。") },
  nowhere: { grammarRole: "副词", grammarSummary: "nowhere 表示任何地方都不；可置于句首引起部分倒装。", structures: ws("nowhere + auxiliary + subject", "任何地方都没有 / 无处", "句首 nowhere 后常用部分倒装。", "The answer is nowhere to be found.", "到处都找不到答案。") },
  advantage: { grammarRole: "名词", grammarSummary: "take advantage of 表示利用机会或占便宜；advantage 本身是可数名词。", structures: ws("take advantage of + noun", "利用……", "of 后接机会、条件或对象。", "Take advantage of the offer.", "利用这项优惠。") },
  author: { grammarRole: "名词", grammarSummary: "author 指文章作者；题目中的 The author argues that 引出作者明确论点。", structures: ws("the author argues that + clause", "作者主张……", "that 从句是 argue 的宾语。", "The author argues that tools shape behavior.", "作者主张工具会塑造行为。") },
  according: { grammarRole: "介词短语组成成分", grammarSummary: "according to 引出信息来源；本篇题干的 according to the first paragraph 要求回到原文定位。", structures: ws("according to + source", "根据……", "according to 后接人、资料或段落。", "According to the report, risks fell.", "根据报告，风险下降了。") },
};
