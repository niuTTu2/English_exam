import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";
const rows: LexiconRow[] = [
  ["word", "words", "n.", "词；单词", "100 words用于作文篇幅计数，不指100个汉字。", "about one hundred words（约一百词）", "word也可指话语、消息或诺言，如keep one's word信守诺言。"],
  ["answer", "answers", "n. used attributively", "答题；答案", "ANSWER SHEET整体为答题卡，answer以名词修饰sheet。", "an answer sheet（一张答题卡）", "answer亦可作动词回答；本题不是命令考生另写答案一词。"],
  ["sheet", "sheets", "n.", "纸页；表单", "ANSWER SHEET 2指原卷的答题卡2。", "ANSWER SHEET 2（答题卡2）", "sheet也可指床单、薄片，本文为答题用纸页。"],
  ["point", "points", "n.", "分；分值", "15 points表示本题总分，不是十五个要点。", "fifteen points（十五分）", "point另指观点、要点、地点；point out为指出，百分点用percentage point。"],
  ["should", "", "modal v.", "应当", "You should write规定写作要求，后接动词原形。", "should write（应当写）", "此处不是表猜测的应该已经；should不随主语变为单三。"],
  ["you", "", "pron.", "你；考生", "写作指令面向考生，要求根据表格写文章。", "you should write（你应当写）", "不是被调查的每一位员工都要写作文。"],
  ["write", "writes wrote written", "v.", "写；撰写", "Write an essay要求写文章，不用书信称呼署名。", "write an essay（写一篇文章）", "write过去式wrote、分词written；writing本篇为名词另存。"],
  ["essay", "essays", "n.", "文章；短文", "以表格为材料，含描述与评论两部分。", "an essay based on a table（根据表格写的文章）", "不是邮件letter，也不是只填数字的答题表。"],
  ["base", "bases based basing", "v.", "以……为依据", "based on作分词定语，后置限定essay。", "base an essay on data（依据数据写文章）", "base A on B主动，A is based on B被动，不把on改成to。"],
  ["following", "", "adj.", "下列的；随后给出的", "the following table指原卷下方满意度表。", "the following table（下表）", "此处不是follow动词的进行时；也非following介词在……之后。"],
  ["table", "tables", "n.", "表格；统计表", "三年龄组三态度百分数，是截面比较而非年份趋势。", "describe the table（描述表格）", "table另可桌子或动词提交议案，本文为统计表名词。"],
  ["writing", "", "n.", "作文；所写文章", "In your writing限定本篇作文内容。", "in your writing（在你的作文中）", "不是be writing进行时；名词与write动词分开计数。"],
  ["describe", "describes described describing", "v.", "描述", "直接以table为宾语，概述数据及对比。", "describe a table（描述表格）", "不需describe about；interpret更侧重解读意义。"],
  ["give", "gives gave given giving", "v.", "提出；发表", "give comments要求发表相关看法。", "give comments（发表评论）", "此处不是递给实物；可在本句改为offer而不改任务。"],
  ["offer", "offers offered offering", "v.", "提出；提供", "可用offer comments表达提出评论，比give略正式。", "offer comments（提出评论）", "不取工作邀约或报价名词义。"],
  ["comment", "comments", "n.", "评论；意见", "your comments为give宾语，是考生对调查的看法。", "comments on a survey（对调查的评论）", "动词comment后常接on，不能与command命令混淆。"],
  ["least", "", "adv.", "至少结构中的最低限度", "at least 150 words为不少于150词。", "at least one hundred and fifty words（至少一百五十词）", "不同于about大约、at most至多，不擅设上限。"],
];
const reviewed = reviewedLexicon(rows);
export const writing2012BLexicon = reviewed.entries;
export const writing2012BLemmaAliases = { ...reviewed.aliases, writing: "writing", following: "following" };
export const writing2012BCollocationGlosses = reviewed.glosses;
export const writing2012BFormPartOfSpeech: Record<string, string> = { writing: "n.", following: "adj.", table: "n.", comments: "n.", words: "n.", points: "n.", based: "v.-ed（分词定语）", answer: "n.（作定语）" };
writing2012BLexicon.table.otherMeanings = ["桌子；一览表。", "v. 提交讨论（英式议会用法）；搁置讨论（美式用法），须看地域语境。"];
writing2012BLexicon.base.otherMeanings = ["n. 基础、底部、基地；v. 以……为据、把总部设于。base A on B把A建立在B之上。"];
export const writing2012BSentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2012-writing-b-s1": { on: { contextualMeaning: "以……为依据", use: "based on引材料依据，不是纸张表面位置。" }, an: { contextualMeaning: "一篇", use: "essay以元音音素开头，用an。" } },
  "2012-writing-b-s2": { give: { contextualSubstitutions: [{ label: "offer", chinese: "提出", fit: "direct", rewrittenSentence: "In your writing, you should 1) describe the table, and 2) offer your comments.", nuance: "offer略正式，仍要求发表与表格有关的评论，不改为重复数据。", target: "word:offer" }] } },
  "2012-writing-b-s3": { at: { contextualMeaning: "至少结构的一部分", use: "at least共同限定最低词数150。" } },
  "2012-writing-b-s4": { on: { contextualMeaning: "在……上", use: "on ANSWER SHEET 2为作答位置，不同于第1句依据。" } },
};
