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
  ["least", "", "adv.", "最少；最低限度（用于at least）", "least在at least整体中表示最低限度；整组限定150，要求不少于150词。", "at least one hundred and fifty words（至少一百五十词）", "least为little的最高级形式；固定at least表示下限，at most表示上限。"],
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

// 按实际指令来源手工复核；保留既有give→offer完整改写。
Object.assign(writing2011BSentenceContexts["2011-writing-b-s1"], {
  an: { partOfSpeech: "art.", contextualMeaning: "一篇", use: "an限定单数可数名词essay；essay以元音音素开头。", preferredCollocations: ["an essay"] },
  on: { partOfSpeech: "prep.", contextualMeaning: "以……为依据", use: "based on中on引写作依据，后接the following chart，整个分词短语修饰essay。", preferredCollocations: ["based on the following chart"] },
  the: { partOfSpeech: "art.", contextualMeaning: "特指所给的", use: "the限定following chart，指题目随附的那张柱状图。", preferredCollocations: ["the following chart"] },
  chart: { partOfSpeech: "n.", contextualMeaning: "图表；统计图", use: "on后的chart是作文依据；本图只反映部分品牌的市场份额。", preferredCollocations: ["the following chart"] }
});
Object.assign(writing2011BSentenceContexts["2011-writing-b-s2"], {
  in: { partOfSpeech: "prep.", contextualMeaning: "在……中", use: "In your writing说明作文内容范围，整个介词短语修饰后面两项要求。", preferredCollocations: ["in your writing"] },
  your: { partOfSpeech: "possessive determiner", contextualMeaning: "你的；考生的", use: "两处your分别限定writing与comments，指考生的作文和考生提出的评论。", preferredCollocations: ["your writing", "your comments"] },
  you: { partOfSpeech: "pron.", contextualMeaning: "你；考生", use: "you是两个并列动作interpret与give共同的主语。", preferredCollocations: ["you should interpret"] },
  should: { partOfSpeech: "modal v.", contextualMeaning: "应当", use: "should由interpret与give共用，两项要求都要完成，两个动词都用原形。", preferredCollocations: ["should interpret and give"] },
  the: { partOfSpeech: "art.", contextualMeaning: "特指这张", use: "the chart回指上一句随题给出的图表，不是考生任意选择的图。", preferredCollocations: ["interpret the chart"] },
  chart: { partOfSpeech: "n.", contextualMeaning: "图表；统计图", use: "the chart作interpret的宾语，要求解读图示趋势和比较关系。", preferredCollocations: ["interpret the chart"] },
  and: { partOfSpeech: "conj.", contextualMeaning: "并且", use: "连接interpret与give，两个并列动词共用you should；不是二选一。", preferredCollocations: ["interpret and give"] },
  give: { ...writing2011BSentenceContexts["2011-writing-b-s2"].give, partOfSpeech: "v.", contextualMeaning: "提出；发表", use: "give后直接接your comments作宾语，表示提出评论；句中没有另一个人的间接宾语。", preferredCollocations: ["give your comments"] },
  comment: { partOfSpeech: "n.", contextualMeaning: "评论；意见", use: "comments是复数名词，作give的宾语；your限定考生对图示现象的看法。", preferredCollocations: ["give your comments"] }
});
Object.assign(writing2011BSentenceContexts["2011-writing-b-s3"], {
  you: { partOfSpeech: "pron.", contextualMeaning: "你；考生", use: "you指需要达到最低篇幅要求的写作考生。", preferredCollocations: ["you should write"] },
  should: { partOfSpeech: "modal v.", contextualMeaning: "应当", use: "should后接write原形，后面的数量短语规定最低篇幅。", preferredCollocations: ["should write"] },
  write: { partOfSpeech: "v.", contextualMeaning: "写；撰写", use: "write以at least 150 words为宾语，表达至少写150个英文词的要求。", preferredCollocations: ["write at least 150 words"] },
  at: { partOfSpeech: "prep.（固定表达中）", contextualMeaning: "构成最低限度表达", use: "at与least组成at least，整体限定最低词数；不能单独按地点解释。", preferredCollocations: ["at least 150 words"] },
  least: { partOfSpeech: "adv.（at least固定表达中）", contextualMeaning: "最少；最低限度", use: "least在at least中表最低限度；整组作用于150，包含150及以上。", preferredCollocations: ["at least 150 words"] }
});
Object.assign(writing2011BSentenceContexts["2011-writing-b-s4"], {
  write: { partOfSpeech: "v.", contextualMeaning: "写；撰写", use: "Write为祈使谓语，以your essay为宾语，on说明原卷作答位置。", preferredCollocations: ["write your essay"] },
  your: { partOfSpeech: "possessive determiner", contextualMeaning: "你的；考生的", use: "your限定essay，指考生按前面要求所写的同一篇短文。", preferredCollocations: ["your essay"] },
  essay: { partOfSpeech: "n.", contextualMeaning: "短文；文章", use: "your essay作Write的宾语，回指题设图表作文，不要求另写一篇。", preferredCollocations: ["write your essay"] },
  on: { partOfSpeech: "prep.", contextualMeaning: "在……上", use: "on ANSWER SHEET 2是书写位置状语，修饰Write。", preferredCollocations: ["on ANSWER SHEET 2"] }
});
Object.assign(writing2011BCollocationGlosses, {
  "an essay": { meaning: "一篇短文", note: "essay为单数可数名词，以元音音素开头，用an。" },
  "your writing": { meaning: "你的作文", note: "your限定名词writing，此处不表示进行时动作。" },
  "your comments": { meaning: "你的评论", note: "comments为复数名词，作give的宾语。" },
  "you should interpret": { meaning: "你应当解读", note: "you作主语，should后interpret用原形。" },
  "should interpret and give": { meaning: "应当解读并提出", note: "两个并列动词共用should，分别接各自宾语。" },
  "interpret and give": { meaning: "解读并提出", note: "and连接两个同级动作，都受should约束；宾语分别是图表与评论。" },
  "write your essay": { meaning: "撰写你的短文", note: "write后直接接名词短语your essay。" },
  "your essay": { meaning: "你的短文", note: "your为所有格限定词，essay回指同一篇图表作文。" }
});
