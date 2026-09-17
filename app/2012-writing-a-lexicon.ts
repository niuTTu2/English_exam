import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";
const rows: LexiconRow[] = [
  ["suppose", "supposes supposed supposing", "v.", "假设；设想", "祈使句Suppose引入写信情境，后接省略that的宾语从句。", "suppose that something is true（假设某事为真）", "assume也可设定前提；suppose此处不是无证据地猜测考试结果。"],
  ["word", "words", "n.", "词；单词", "100 words用于作文篇幅计数，不指100个汉字。", "about one hundred words（约一百词）", "word也可指话语、消息或诺言，如keep one's word信守诺言。"],
  ["answer", "answers", "n. used attributively", "答题；答案", "ANSWER SHEET整体为答题卡，answer以名词修饰sheet。", "an answer sheet（一张答题卡）", "answer亦可作动词回答；本题不是命令考生另写答案一词。"],
  ["sheet", "sheets", "n.", "纸页；表单", "ANSWER SHEET 2指原卷的答题卡2。", "ANSWER SHEET 2（答题卡2）", "sheet也可指床单、薄片，本文为答题用纸页。"],
  ["sign", "signs signed signing", "v.", "签名；署名", "Do not sign your own name禁止署考生自己的姓名。", "sign one's name（签署姓名）", "sign作名词可指迹象、标志、符号；sign a contract为签署合同。"],
  ["own", "", "adj.", "自己的", "your own name中own加强your，强调不要使用本人真名。", "one's own name（自己的名字）", "own作动词表示拥有；此处不是动词谓语。"],
  ["name", "names", "n.", "姓名", "与sign搭配，下一句指定以Zhang Wei替代。", "sign a name（署名）", "name也可作动词命名、说出名字；本题是签名对象。"],
  ["end", "ends", "n.", "末尾；结尾", "at the end of the letter定位到信件末尾，非时间截止日。", "at the end of the letter（在信的末尾）", "in the end表示最终，不能代替带of的具体位置结构。"],
  ["use", "uses used using", "v.", "使用；采用", "Use Zhang Wei为祈使句，要求用指定署名。", "use a specified name（使用指定姓名）", "use是及物动词，姓名可直接作宾语；此处不是used to曾经。"],
  ["wei", "", "proper noun", "伟（名）", "Zhang Wei整体为规定署名，拼写按题目保留。", "Yours, Zhang Wei（祝好，张伟）", "此处为专名组成，不是普通英文词根。"],
  ["instead", "", "adv.", "代替；改用", "承接上一句禁止真实署名，要求改用Zhang Wei。", "use another name instead（改用另一个名字）", "instead可单独放句末；instead of为介词短语，后面需要宾语。"],
  ["address", "addresses", "n.", "地址", "Do not write your address是格式限制，不需邮寄地址。", "write one's address（写下地址）", "address作动词可指向某人讲话、处理问题；address an issue为处理问题。"],
  ["point", "points", "n.", "分；分值", "10 points表本题总分，不是给定十条要点。", "ten points（十分）", "point另指观点、要点、地点；point out为指出，百分点用percentage point。"],
  ["about", "", "adv.", "大约", "about 100 words限定近似词数，不是至少。", "about one hundred（大约一百）", "about作介词可表关于；at least表示至少，不可混同。"],
  ["do", "does did done doing", "aux.", "否定祈使助动词", "Do not引出禁止指令，后面sign/write仍用动词原形。", "do not write（不要写）", "不同于翻译46中代替produce的do，本句帮助构成否定。"],
  ["should", "", "modal v.", "应当", "You should write规定写作要求，后接动词原形。", "should write（应当写）", "此处不是表猜测的应该已经；should不随主语变为单三。"],
  ["electronic", "", "adj.", "电子的", "修饰dictionary，限定投诉的产品类型。", "an electronic dictionary（电子词典）", "electric多与电力有关，electronic指电子技术，不把本题改成纸质词典。"],
  ["dictionary", "dictionaries", "n.", "词典", "前面electronic限定为网购电子词典。", "an electronic dictionary（电子词典）", "复数y变ies；不是diary日记。"],
  ["wrong", "", "adj.", "出故障的；有问题的", "something wrong with说明某物有问题，wrong在something之后。", "something wrong with a device（设备有问题）", "不定代词后置形容词，不写wrong something。"],
  ["buy", "buys bought buying", "v.", "购买", "bought为过去式，后接from说明购买渠道。", "buy from an online store（从网店购买）", "过去式和分词均bought，不是brought带来。"],
  ["online", "", "adj.", "网上的；在线的", "online store指网上商店。", "an online store（网店）", "不是online仅修饰买东西时间，本文限定商店渠道。"],
  ["store", "stores", "n.", "商店", "online store为购买商品的商家渠道。", "buy from a store（在商店购买）", "store作动词可储存，此处在冠词后为名词。"],
  ["day", "days", "n.", "天；日", "the other day为最近某一天、前几天的习语。", "the other day（前几天）", "不要按字面译成另外一天或第二天。"],
  ["other", "others", "det. / pron.", "其他的；另一个", "the other day与day组成过去时间习语。", "the other day（前几天）", "在此不能独立推断为两天中的另一日。"],
  ["email", "emails emailed emailing", "n.", "电子邮件", "Write的宾语，收件人为客服中心。", "write an email（写一封电子邮件）", "不把邮件内容当短信或论坛留言。"],
  ["customer", "customers", "n.", "顾客；客户", "customer service整体修饰center，指客户服务。", "customer service（客户服务）", "customer购买产品，consumer侧重最终使用消费，语义不完全相同。"],
  ["service", "services", "n.", "服务", "customer service center为客服中心的固定组合。", "a customer service center（客户服务中心）", "不是军旅服役义或礼拜仪式。"],
  ["center", "centers", "n.", "中心", "服务机构名称的一部分。", "customer service center（客服中心）", "centre为英式拼写，保留原卷center。"],
  ["complaint", "complaints", "n.", "投诉；抱怨", "make a complaint为提出投诉，名词在不定冠词之后。", "make a complaint（提出投诉）", "complain是动词，complaint是名词，不互换词性。"],
  ["complain", "complains complained complaining", "v.", "投诉；抱怨", "与make a complaint对应的动词表达，用于教学辨析。", "complain about a product（投诉某产品）", "可complain to客服，about后接问题，不写make a complain。"],
  ["demand", "demands demanded demanding", "v.", "要求", "demand a solution为提出明确补救要求，与make并列。", "demand a solution（要求解决办法）", "语义明确不等于写信必须粗暴；可用礼貌请求承载。"],
  ["prompt", "prompts prompted prompting", "adj.", "及时的；迅速的", "修饰solution，要求尽快解决故障。", "a prompt solution（及时的解决办法）", "prompt也可动词促使或名词提示，这里不是给AI的提示词。"],
  ["solution", "solutions", "n.", "解决办法", "要求针对商品故障提出处理方案。", "a solution to a problem（问题的解决办法）", "solution另可溶液；solve为派生动词，不合并统计。"],
  ["write", "writes wrote written writing", "v.", "写；撰写", "write an email to客服，后面两不定式说明写作目的。", "write an email to customer service（给客服写邮件）", "write过去式wrote、分词written，to在收件人前为介词。"],
  ["letter", "letters", "n.", "信；邮件书信文本", "题目先写email，再用the letter指同一文本，不另设第二封信。", "the end of the letter（信的末尾）", "letter另指字母，本文不是字母字符。"],
  ["zhang", "", "proper n.", "张（姓）", "与Wei组成指定署名Zhang Wei。", "Zhang Wei（张伟）", "不是客服人员姓名，也不换成自己的姓。"],
  ["you", "", "pron.", "你；考生", "写作指令面向考生，假设你购买过词典。", "you should write（你应当写）", "不是客服人员已经投诉商家。"],
  ["have", "has had having", "aux.", "完成时助动词", "have found表示已经发现问题，不是拥有found这个物品。", "have found a problem（已经发现问题）", "此处完成时连接过去发现和当前投诉情境。"],
];
const reviewed = reviewedLexicon(rows);
export const writing2012ALexicon = reviewed.entries;
export const writing2012ALemmaAliases = reviewed.aliases;
export const writing2012ACollocationGlosses = reviewed.glosses;
export const writing2012AFormPartOfSpeech: Record<string, string> = { own: "adj.", address: "n.", prompt: "adj.", points: "n.", about: "adv.", answer: "n.（作定语）", write: "v.", sign: "v.", do: "aux.", bought: "v.-ed（过去式）", found: "v.-ed（过去分词）", wrong: "adj." };
writing2012ALexicon.prompt.otherMeanings = ["v. 促使：prompt somebody to do促使某人做；提醒、提示。", "n. 提示、提词；计算机提示符或对话提示词。"];
writing2012ALexicon.address.otherMeanings = ["v. 处理问题；向听众讲话；在信封上写地址。", "n. 演说；网络地址。address a problem处理问题。"];
writing2012ALexicon.letter.otherMeanings = ["字母；字面条文。a capital letter大写字母，the letter of the law法律条文字面。"];
writing2012ALexicon.solution.otherMeanings = ["解答；数学题的解；化学溶液。a salt solution盐溶液。"];
export const writing2012ASentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2012-writing-a-s1": { with: { contextualMeaning: "……有问题", use: "wrong with引出发生故障的词典，非带有某种品质。" }, find: { contextualMeaning: "发现", use: "have found接有问题的事情，表示已察觉故障。" } },
  "2012-writing-a-s2": { make: { contextualMeaning: "提出", use: "make a complaint整体为投诉，不是制作物件。" }, to: { contextualMeaning: "给；为了", use: "email to客服中为收件对象介词；to make/demand为目的不定式。" } },
  "2012-writing-a-s3": { on: { contextualMeaning: "在……上", use: "on ANSWER SHEET 2给出纸笔考试书写位置。" } },
  "2012-writing-a-s4": { at: { contextualMeaning: "在……位置", use: "at the end of指邮件结尾。" } },
};
