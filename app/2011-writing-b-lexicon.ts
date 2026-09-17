import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";
import { writing2011ALexicon, writing2011ACollocationGlosses } from "./2011-writing-a-lexicon";

const rows: LexiconRow[] = [
  ["write", "writes wrote written", "v.", "写；撰写", "Write an essay要求根据图表写短文；与Part A写信体裁区分。", "write an essay（写一篇短文）", "write—wrote—written不规则；writing在第2句为名词写作内容，另存词位。"],
  ["essay", "essays", "n.", "短文；文章", "本题所写短文要有图表解读与评论，不加书信称呼署名。", "an essay based on a chart（根据图表写的短文）", "essay是较完整文章，comment通常为评论意见；不等于letter书信。"],
  ["base", "bases based basing", "v.", "以……为依据", "based on过去分词短语后置修饰essay，on引材料依据。", "base an essay on a chart（依据图表写短文）", "base A on B为主动，A is based on B为被动；不要写base A to B。"],
  ["following", "", "adj.", "下面的；下列的", "the following chart指题目下面给出的图，非following作正在跟随。", "the following chart（下图）", "following还可作介词表示在……之后；词性与句法须依实际来源判断。"],
  ["chart", "charts", "n.", "图表；统计图", "following chart为2008和2009年部分品牌市场份额柱状图。", "interpret a chart（解读图表）", "chart是图表，table通常指数据表；不要把图中比例当总销量。"],
  ["writing", "", "n.", "作文；写作内容", "In your writing说明在所写短文中，your限定名词writing。", "in your writing（在你的作文中）", "此处不是be writing进行时；本篇名词写作内容与write动词分开。"],
  ["interpret", "interprets interpreted interpreting", "v.", "解读；说明", "interpret the chart要求解释图表趋势和比较关系。", "interpret the chart（解读图表）", "describe侧重描述看到什么，interpret侧重说明图表表达的意义；不凭数据断言原因。"],
  ["give", "gives gave given giving", "v.", "提出；发表", "give your comments要求发表对现象的评论，不是给出一件实物。", "give comments on something（对某事发表评论）", "本句可用offer提出，语气稍正式；give—gave—given不规则。"],
  ["offer", "offers offered offering", "v.", "提出；提供", "可替换give your comments，指提出个人评论。", "offer comments（提出评论）", "offer亦可指提供工作机会或报价，本句的对象是评论。"],
  ["comment", "comments", "n.", "评论；意见", "your comments是give的宾语，为考生对图示现象的看法。", "comments on a trend（对一种趋势的评论）", "comment可作动词，用comment on；不是command命令或commit承诺。"],
  ["least", "", "adv.", "至少（at least中的最低限度）", "at least 150 words表示不少于150词，不是本年Text2的最缺乏特色。", "at least one hundred and fifty words（至少一百五十词）", "least为little的最高级形式；固定at least表示下限，at most表示上限。"],
  ["word", "words", "n.", "单词；词", "150 words是英文作文词数最低要求，不是150个字母或汉字。", "write at least 150 words（写至少150词）", "不同于47题about 100 words约100词，不能混用字数条件。"],
  ["point", "points", "n.", "分；分值", "15 points说明第48题分值，并不是要求写十五条观点。", "fifteen points（十五分）", "point另可指论点、意义、位置；percentage point为百分点，不能混作本题得分。"],
];
const reviewed = reviewedLexicon(rows);
const sharedHeadwords = ["answer", "sheet", "should", "you", "your"];
export const writing2011BLexicon = { ...Object.fromEntries(sharedHeadwords.map(headword => [headword, writing2011ALexicon[headword]])), ...reviewed.entries };
export const writing2011BLemmaAliases: Record<string, string> = { ...reviewed.aliases, following: "following", writing: "writing", your: "your", least: "least", answers: "answer", sheets: "sheet" };
export const writing2011BCollocationGlosses = { ...writing2011ACollocationGlosses, ...reviewed.glosses };
export const writing2011BFormPartOfSpeech: Record<string, string> = { based: "v.-ed（后置分词定语）", following: "adj.", writing: "n.", comments: "n.", least: "adv.", points: "n.", answer: "n. used attributively" };
writing2011BLexicon.base.otherMeanings = ["n. 基础：a knowledge base知识库；基地：a military base军事基地；v. 以某地为基地：be based in a city。"];
writing2011BLexicon.chart.otherMeanings = ["n. 海图：a nautical chart航海图；排行榜：the music charts音乐排行榜；v. 绘制或记录：chart changes记录变化。"];
writing2011BLexicon.interpret.otherMeanings = ["口译：interpret for somebody为某人口译；理解为：interpret A as B把A理解为B；艺术表现：interpret a role诠释角色。"];
writing2011BLexicon.following.otherMeanings = ["prep. 在……之后：following the meeting会后；n. 追随者群体：a large following众多拥护者。"];
writing2011BLexicon.writing.otherMeanings = ["文字材料：in writing以书面形式；书写风格或笔迹：clear writing清晰的书写；writings常指作品或著述。"];
export const writing2011BSentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2011-writing-b-s1": { on: { contextualMeaning: "以……为依据", use: "based on引作文依据，不取纸张表面上的位置义。" }, an: { contextualMeaning: "一篇；不定冠词", use: "essay以元音音素开头，因此用an。" } },
  "2011-writing-b-s2": { in: { contextualMeaning: "在……中", use: "In your writing说明作文内容范围，不是某个国家范围。" }, and: { contextualMeaning: "并且", use: "连接interpret和give两项都必须完成的任务。" }, give: { contextualSubstitutions: [{ label: "offer", chinese: "提出；发表", fit: "direct", rewrittenSentence: "In your writing, you should 1)interpret the chart and 2)offer your comments.", nuance: "offer在这里略正式，但仍要求考生提出评论；不改成仅仅复述图表。", target: "word:offer" }] } },
  "2011-writing-b-s3": { at: { contextualMeaning: "至少结构的一部分", use: "与least整体限定最低词数，不单独取在某处义。" } },
  "2011-writing-b-s4": { on: { contextualMeaning: "在……上", use: "on ANSWER SHEET 2给出书写位置，不同于第1句based on表示依据。" } },
};
