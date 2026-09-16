import type { PhraseKnowledge } from "./knowledge-base";
type Seed = [string, string, string, string, string, string, string, string];
const seeds: Seed[] = [
  ["regard-a-as-b", "regard A as B", "regard the jury system as a concrete expression", "把A视为B", "as引宾语补足语；A为被评价事物，B为评价。", "They regard fairness as a principle.", "他们把公平视为一项原则。", "不能省掉as直接接两个名词。"],
  ["serve-on-jury", "serve on a jury", "serve on juries", "担任陪审员", "on表示作为团体成员参与，serve在此不直接接jury。", "She served on a jury.", "她担任过陪审员。", "jury指团体，juror指个人。"],
  ["on-account-of", "on account of something", "on account of", "由于；因为", "介词性结构接名词或动名词，指出依据或原因。", "No one was excluded on account of age.", "没有人因为年龄被排除。", "account不是账户义，也不引完整主谓从句。"],
  ["letter-of-law", "the letter of the law", "the letter of the law", "法律的字面条文", "名词性固定表达；与法律精神或社会良知对照。", "The rule follows the letter of the law.", "这项规则遵循法律的字面条文。", "letter不是信件，law不是某一封信的内容。"],
  ["be-said-to-do", "be said to do something", "is also said to be", "据说……", "被动报道谓语后接不定式，动作主语仍是句首主体。", "The jury is said to represent the public.", "据说陪审团代表公众。", "be told to do为被要求做，含义不同。"],
  ["take-turns-doing", "take turns doing something", "take turns governing themselves", "轮流做某事", "turns用复数，后接动名词指出轮流进行的活动。", "They take turns speaking.", "他们轮流发言。", "take turns与turn to求助不同。"],
  ["conflict-with", "conflict with something", "conflicted with", "与……相冲突", "with引不相容的另一方；本文为程序与民主理想冲突。", "The practice conflicts with the principle.", "这种做法与原则相冲突。", "不能偷换成各民主理想互相冲突。"],
  ["be-limited-to", "be limited to something", "was limited to", "仅限于……", "to为介词，引出被限制的范围或人群。", "Membership was limited to adults.", "会员资格只限成年人。", "limited不是limit的主动过去式，此处有be构成被动。"],
  ["elite-juries", "elite / blue-ribbon juries", "so-called elite or blue-ribbon juries", "所谓精英陪审团", "两个定语用or并列，so-called对优越性评价保留距离。", "Elite juries may lack broad representation.", "精英陪审团可能缺乏广泛代表性。", "blue-ribbon是优秀精英之意，不是实际佩戴蓝带。"],
  ["way-around", "a way around something", "a convenient way around", "绕过某限制的办法", "around作后置介词短语修饰way，表达规避。", "They found a way around the rule.", "他们找到了规避规则的办法。", "不是改进规则本身，也不是地点导航。"],
  ["fail-to-do", "fail to do something", "failed to regularly include", "未能做某事", "fail后接to不定式；regularly可插入不定式中修饰include。", "The system failed to include all groups.", "该制度未能纳入所有群体。", "未能经常纳入不等于历史上从未有过个例。"],
  ["not-until-cleft", "it is / was not until ... that ...", "it was not until the 1940s", "直到……才……", "强调句突出时间边界，真正发生的事件在that之后。", "It was not until Monday that they met.", "他们直到星期一才见面。", "it无实义指代，not until不能误译为直到之前一直发生。"],
  ["eligible-for", "be eligible for something", "eligible for jury duty", "有资格参与……", "形容词eligible后用for接名词；资格不等于已实际参与。", "She is eligible for jury duty.", "她有资格担任陪审员。", "eligible与elected当选不同。"],
  ["exempt-from", "exempt somebody from something", "exempted women from jury duty", "免除某人的某项义务", "somebody为宾语，from引被豁免事务。", "The rule exempted him from the duty.", "该规则免除了他的这项义务。", "豁免不等于ban禁止，本文仍允许本人主动申请。"],
  ["have-object-done", "have something done", "have their names included", "使某事得到办理", "have加宾语和过去分词，宾语是被处理的对象。", "She had her name included on the list.", "她请人把自己的名字列入名单。", "不是have done完成时，中间存在宾语。"],
  ["keep-object-adjective", "keep somebody / something + adjective", "kept juries unrepresentative of women", "使……保持某状态", "形容词为宾补，说明宾语持续的状态。", "The rule kept the process fair.", "这项规则使程序保持公平。", "kept是keep的过去式，不是新词根。"],
  ["usher-in", "usher in something", "ushering in", "开创；迎来", "短语动词接新时代等抽象事物，本文分词表结果。", "The reform ushered in a new era.", "改革开启了新时代。", "ushering不是独立有限谓语。"],
  ["at-random", "at random", "at random", "随机地", "介词短语作方式状语，相当于randomly。", "Jurors were selected at random.", "陪审员以随机方式选出。", "随机不等于只从某个精英名单中挑选。"],
  ["cross-section", "a cross section of something", "a cross section of the entire community", "能代表整体各部分的样本", "名词短语；of引整体范围，强调多群体代表性。", "The sample is a cross section of society.", "这个样本代表社会各群体。", "这里不是实际切割物体得到的横截面。"],
  ["extend-a-to-b", "extend A to B", "extended the requirement", "把A扩展到B", "A是被扩展的要求，to B说明适用层级；中间可插内容从句。", "They extended the rule to all states.", "他们把该规则扩展到所有州。", "不能把句尾to the state level误接到内层community。"],
  ["representative-of", "be representative of something", "representative of all parts of the community", "能代表……的", "形容词加of补足语；of说明代表范围。", "The jury is representative of the community.", "该陪审团能代表社区各群体。", "不等于representative democracy中的代议制的。"],
  ["declare-a-to-be-b", "declare A to be B", "declared sex discrimination in jury selection to be unconstitutional", "宣布或认定A为B", "declare接宾语及不定式宾补，B说明宾语性质。", "The court declared the rule to be unconstitutional.", "法院认定该规则违宪。", "这项认定在本文属于1975年判决，不归到1968年法案。"],
];
export const passage2010P4PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, canonical, , meaning, rule, english, chinese, pitfall]) => [key, { key, canonical, type: "制度与代表性语篇搭配", meaning, summary: `${meaning}。${rule}`, grammarRole: rule, structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall] }]));
export const passage2010P4PhraseAliases: Record<string, string> = Object.fromEntries(seeds.flatMap(([key, canonical, source]) => [source, canonical].map(text => [text.toLowerCase(), key])));
passage2010P4PhraseAliases["entitled to trial"] = "entitled-to-privacy";
export const passage2010P4CollocationGlosses = Object.fromEntries(seeds.map(([, , source, meaning, note]) => [source.toLowerCase(), { meaning, note }]));
