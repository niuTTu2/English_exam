import type { WordKnowledge } from "./knowledge-base";
import { reviewedPhrases, type PhraseRow } from "./2011-content-helpers";
import { passage2011P3Lexicon, passage2011P3CollocationGlosses, passage2011P3SentenceContexts } from "./2011-passage-3-lexicon";

const rows: PhraseRow[] = [
  ["think-of-it-as", "think of the decades immediately following World War II as a time of prosperity and growth", "think of A as B", "认知搭配", "把战后几十年看作繁荣发展时期", "of后为被评价对象，as后为评价身份，不能只取think思考。", "We think of the period as a time of growth.", "我们把这一时期看作发展阶段。", "复用think of A as B规范词组，不与think about考虑混淆。"],
  ["by-the-millions", "by the millions", "by the + plural number", "数量方式状语", "数以百万计地", "by引成群出现的数量规模，修饰士兵返乡。", "People returned by the millions.", "数以百万计的人返回。", "不是返乡者的具体精确人数。"],
  ["line-up-at", "lining up at the marriage bureaus", "line up at + place", "动词短语", "在婚姻登记处排队", "line up作排队，at引地点；lining与returning、going平行。", "They lined up at the office.", "他们在办公室外排队。", "line此处是动词，不是报纸文本行。"],
  ["when-it-comes-to", "when it came to their houses", "when it comes to + noun/doing", "话题习语", "说到他们的住宅", "to为介词，引要讨论的方面，came保留原文过去时。", "When it comes to design, space matters.", "谈到设计，空间很重要。", "不是‘当它来到房屋’，不把to后接原形动词。"],
  ["less-is-more", "less could truly be more", "less is more", "设计理念", "少即是多；少而精", "less指较少装饰，more指更强审美效果，二者并非同一数量。", "In good design, less can be more.", "在优秀设计中，少可以胜过多。", "不等于否认住宅实用功能。"],
  ["in-combination-with", "in combination with the postwar confidence in the future", "in combination with + noun", "共同因素状语", "与战后对未来的信心结合", "此短语补充restraint共同起作用的因素。", "Restraint, in combination with confidence, shaped the style.", "节制与信心共同塑造了这种风格。", "with中的名词不是独立并列的主句主语。"],
  ["make-object-adjective", "made small, efficient housing positively stylish", "make + object + adjective", "使役宾补结构", "使小而高效的住宅十分时髦", "housing为宾语，stylish为宾补，positively修饰stylish。", "Good proportions make small rooms elegant.", "恰当比例使小房间显得优雅。", "不能将stylish误认为修饰made的副词。"],
  ["trend-toward", "the trend toward efficient living", "a trend toward + noun/doing", "名词介词搭配", "高效生活的趋势", "toward引发展方向，living为动名词。", "There is a trend toward simpler living.", "生活有趋向简朴的趋势。", "不将趋势说成已普遍完成的事实。"],
  ["associated-with", "associated with the Bauhaus", "be associated with + noun", "联系搭配", "与包豪斯有关", "过去分词短语修饰designers，省略关系代词与be。", "The designers were associated with the school.", "这些设计师与该学派有关联。", "有关联不等于创办该学校。"],
  ["take-up-posts", "took up posts", "take up a post", "任职搭配", "开始任职", "took up的宾语是posts岗位，随后at限定教学机构。", "She took up a post at a university.", "她开始在一所大学任职。", "与take up time占用时间分清。"],
  ["exert-influence", "exert enormous influence", "exert influence on + noun", "影响搭配", "产生巨大影响", "exert后接不可数影响名词，on引受影响对象。", "The school exerted influence on architecture.", "这个学派对建筑产生了影响。", "不是施加体力，也不意味着每位建筑师均属该校。"],
  ["none-more-so-than", "none more so than Mies", "none more so than + noun", "比较省略", "没有谁比密斯的影响更大", "none指前述设计师，so代替产生影响，省略重复谓语。", "Many helped, none more so than her.", "许多人出了力，没有谁比她贡献更大。", "none的否定与比较合起来突出最大程度，而非说无人有影响。"],
  ["properly-organized", "properly organized", "adverb + past participle", "分词修饰", "经过恰当组织安排的", "过去分词补充decoration的安排方式；不是新的有限谓语。", "Simple elements, properly organized, create elegance.", "简单元素经过合理安排也能创造优雅。", "少装饰仍须组织得当，不能漏掉条件。"],
  ["more-impact-than", "more impact than a lot", "more + noun + than + comparison", "比较结构", "比大量装饰更有表现力", "a lot省略of decoration，比较相同维度的效果。", "A little detail can have more impact than a lot.", "少量细节可能比大量堆砌更有效果。", "不能把more误译成更多装饰。"],
  ["derive-from", "derive from abundance", "derive from + source", "来源搭配", "源于大量堆砌", "原句did not否定这一来源，强调优雅并非来自数量。", "Elegance need not derive from abundance.", "优雅不一定来自大量堆砌。", "译文必须保留原句否定。"],
  ["take-for-granted", "take for granted", "take A for granted", "固定搭配", "把某物视为寻常；习以为常", "A在定语从句中由that代替前置，take与for granted之间省略原位宾语。", "We take glass walls for granted today.", "今天我们对玻璃墙习以为常。", "不是批准，也不是材料被免费赠予。"],
  ["rather-than", "rather than big and often empty", "rather than + parallel element", "取舍连接", "而不是宽大且常常空洞", "与small and efficient平行，是对空间质量的两种描述。", "The room is efficient rather than empty.", "房间实用而非空洞。", "复用既有rather-than，不当作比较级better than。"],
  ["units-under-area", "two-bedroom units under 1,000 square feet", "units under + area", "名词后置定语", "面积不足一千平方英尺的两居室", "two-bedroom作复合定语，under引面积上限。", "The units are under 1,000 square feet.", "这些住宅单元不足一千平方英尺。", "不是每间卧室面积一千，也不是米制单位。"],
  ["than-those-in", "than those in their older neighbors", "than those in + place", "同类比较", "比邻近老楼中的公寓", "those替代apartments，neighbors借指附近楼房。", "These apartments are smaller than those nearby.", "这些公寓比附近那些小。", "比较公寓与公寓，而非公寓与整栋楼。"],
  ["views-afforded", "the views they afforded", "the views + subject + afford", "省略关系词的定语结构", "公寓所提供的景观视野", "they指公寓，afford为提供；views作从句中省略的宾语。", "We enjoyed the views the windows afforded.", "我们欣赏窗户带来的景观。", "afford在此不表示有钱支付。"],
  ["equivalent-of", "the architectural equivalent of the abstract art", "the equivalent of + noun", "对应物搭配", "抽象艺术在建筑中的对应表现", "architectural限定对应物所属领域；of引所对应的艺术。", "The building is the architectural equivalent of a painting.", "这座建筑仿佛是绘画在建筑领域的对应作品。", "不意味着建筑与画作是同一件实体。"],
  ["not-entirely", "not entirely foreign", "not entirely + adjective", "部分否定", "并非完全来自国外", "否定完全程度，引出美国本土设计先例。", "The idea is not entirely new.", "这个想法并非完全新颖。", "并非全是外来不等于完全没有外来影响。"],
  ["more-modest-efficient", "more modest and efficient houses", "more + parallel adjectives + noun", "比较定语", "更适度、更高效的住宅", "与同一建筑师早年铺展的住宅比较，modest说明尺度。", "They built more modest and efficient houses.", "他们建造了更适度高效的住宅。", "modest不是说房子性格谦虚。"],
  ["two-story-ones", "the spreading two-story ones", "adjectives + ones", "代词替代", "铺展开来的两层住宅", "ones替代houses，two-story为复合形容词，story在此是楼层。", "The small houses replaced the spreading ones.", "小住宅取代了铺展开来的大住宅。", "ones为复数代词，不是数字一；story非故事。"],
  ["commission-from-by", "commissioned from talented modern architects", "commission work from A by B", "委托被动结构", "由杂志向现代建筑师委托设计", "from引提供设计者，by引委托者；原文分词修饰Case Study Houses。", "The designs were commissioned from architects by a magazine.", "这些设计由杂志委托建筑师完成。", "不能倒置委托关系，commission此处不是委员会名词。"],
  ["yet-another", "yet another homegrown influence", "yet another + noun", "追加强调", "又一个本土影响", "yet加强another，承接前文赖特的本土例子。", "This was yet another local influence.", "这又是一个本土影响。", "yet不表示转折然而或时间尚未。"],
  ["forthright-detailing", "forthright detailing", "adjective + detailing", "设计术语搭配", "直率明快的细部处理", "detailing为不可数名词，说明处理细节的方式。", "The house uses forthright detailing.", "这座住宅采用明快直接的细部处理。", "强调细部设计，不能推论牺牲细节。"],
  ["may-have-done", "may have mispredicted", "may have + past participle", "对过去的推测", "可能预测失准", "may表示可能，完成式将预测置于过去。", "He may have mispredicted the change.", "他可能误判了这一变化。", "不能译成确定必然预测错误。"],
  ["both-a-and-b", "both desirable and inevitable", "both A and B", "并列结构", "既值得向往又不可避免", "连接两个形容词作表语，评价self-sufficiency。", "The change is both desirable and inevitable.", "这一变化既值得期待又不可避免。", "复用both-a-and-b，保留双重评价。"],
  ["widely-shared", "was widely shared", "be widely shared", "被动认同", "广受认同", "belief为主语，shared在此指多人持有同一信念。", "The belief was widely shared.", "这种信念广受认同。", "不是现代社交平台上的转发次数。"],
];
const reviewed = reviewedPhrases(rows);
export const passage2011P3PhraseGuides = reviewed.guides;
export const passage2011P3PhraseAliases = reviewed.aliases;
export const passage2011P3PhraseGlosses = { ...passage2011P3CollocationGlosses, ...reviewed.glosses };
export function getPassage2011P3WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = passage2011P3Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? passage2011P3SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning: passage2011P3CollocationGlosses[pattern.toLowerCase()].meaning, rule }], pitfalls: entry.examSynonyms };
}
