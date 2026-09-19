import { withWriting2012ATeaching } from "./2012-writing-a-teaching";
import type { SentenceAnalysis, WritingTask } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2012-writing-a");
const originalWriting2012ASentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Suppose ", "predicate", "祈使假设动词", "设定写作情境", "省略主语you，后接假设内容", "Suppose相当于设想，不表示该故障已经真实发生在考生身上。"),
    segment("you have found something wrong with the electronic dictionary ", "object", "宾语从句及后置形容词", "设定发现问题", "something为found宾语，wrong with说明有何问题", "不定代词something后置wrong，with引发生故障的物品。"),
    segment("that  you bought from an online store the other day.", "modifier", "关系从句含时间状语", "限定dictionary", "that作bought宾语，you为主语", "bought为buy过去式；the other day是前几天，不是另一天的任意未来。保留原卷that后双空格。"),
  ], "Suppose you have found something wrong with the electronic dictionary.", "假设你发现前几天从一家网店购买的电子词典有些问题。", "假设你前几天在网店买了一部电子词典，现在发现它有问题。", "确定商品、购买渠道和投诉缘由；原题没有给出具体故障，应自行给合理简短细节，而不把示例当原卷事实。", ["something wrong with the electronic dictionary", "the other day"], [
    clause("you have found something wrong with the electronic dictionary that  you bought from an online store the other day", "宾语从句", "省略that", "作Suppose宾语", "you", "have found", "something wrong with the electronic dictionary（宾语及后置限定）", "先译设想发现问题，再补物品购买来源。"),
    clause("that  you bought from an online store the other day", "定语从句", "that", "限定dictionary", "you", "bought", "that（电子词典）；from引来源，the other day为时间", "译成前几天从网店买的电子词典。"),
  ]),
  sentence(2, [
    segment("Write an email to  the  customer service center ", "predicate", "祈使句和收件对象", "要求写电子邮件", "Write主语you省略，email为宾语", "to后是客服中心，不是写给同学朋友；保留原卷双空格。"),
    segment("to 1) make a complaint, ", "modifier", "目的不定式与列举第一项", "邮件目的第一项", "说明投诉商品问题", "make a complaint用名词结构，不能误写complaint作动词。"),
    segment("and 2) demand a prompt solution.", "connector", "并列动词及目的第二项", "邮件目的第二项", "与make共用to", "demand要求解决；prompt修饰solution为及时的，不是给出提示词。"),
  ], "Write an email to make a complaint, and demand a prompt solution.", "给客服中心写一封电子邮件，目的是：一，提出投诉；二，要求及时解决。", "写邮件给客服中心，投诉产品问题，并要求尽快解决。", "两个必写要点同等必要；只抱怨不提出明确解决要求属于漏项。", ["make a complaint", "demand a prompt solution"]),
  sentence(3, [
    segment("You should write about 100 words ", "predicate", "情态动词与数量宾语", "篇幅要求", "about修饰100，表示约数", "should在考试指令中为应当；原题为约100词，不自造精确允许区间。"),
    segment("on ANSWER SHEET 2.", "modifier", "书写位置介词短语", "答题位置要求", "修饰write", "ANSWER SHEET 2为第二张答题纸，数字不是题号或年级。"),
  ], "You should write about 100 words.", "你应在答题纸2上写大约100个词。", "请在答题纸2上写一封约100词的邮件。", "保留原考试篇幅与位置；网站字数仅为辅助，不宣称自动评分。", ["about 100 words", "on ANSWER SHEET 2"]),
  sentence(4, [
    segment("Do not sign your own name ", "predicate", "否定祈使句", "禁止真实姓名署名", "Do not支配sign，your own name为宾语", "own加强真实姓名所属，不是动词拥有。"),
    segment("at the end of the letter.", "modifier", "位置介词短语", "限定署名位置", "修饰sign", "尽管前面说email，此处原题使用letter泛指书信文本，按原文保留。"),
  ], "Do not sign your own name.", "不要在信的末尾签你自己的姓名。", "不要在邮件结尾署上你自己的真实姓名。", "为下一句规定署名作铺垫，不把文体改成另一封纸质信。", ["at the end of the letter"]),
  sentence(5, [
    segment("Use “Zhang Wei” ", "predicate", "祈使动宾", "规定代用姓名", "Use宾语为引号内姓名", "Zhang Wei按题目拼写，不替换为Li Ming。"),
    segment("instead.", "modifier", "替代副词", "取代上一句禁止的真实姓名", "修饰Use", "instead在此独立收尾，后面没有of宾语。"),
  ], "Use “Zhang Wei” instead.", "改用‘Zhang Wei’。", "请统一署名‘Zhang Wei’。", "明确结尾署名要求。", ["Use “Zhang Wei” instead"]),
  sentence(6, [
    segment("Do not write your address. ", "predicate", "否定祈使句", "禁止写地址", "write的宾语为address", "address在此是通信地址，不是演讲或处理问题。"),
    segment("(10 points)", "modifier", "括号评分说明", "整题分值", "修饰第47题整体", "10为整封邮件分值，不是只要10个要点，也不是范文自动得分。"),
  ], "Do not write your address.", "不要写你的地址。（10分）", "请勿填写地址，本题10分。", "保持原卷作答边界；线上不收集邮寄地址。", ["Do not write your address"]),
];
export const writing2012ASentences = originalWriting2012ASentences.map(withWriting2012ATeaching);

export const writing2012ATasks: WritingTask[] = [{
  id: 201247, number: 47, genre: "letter", points: 10, wordLimit: { mode: "about", count: 100 }, instructions: writing2012ASentences,
  requirements: ["收件人：网店客服中心；商品：前几天购买的电子词典。", "两个必写任务：投诉问题；要求及时解决。可合理具体化故障及换货或退款方案，但不能说这些细节是原卷给定。", "约100词，态度明确且礼貌；署名Zhang Wei，不写真实姓名或地址。"],
  outline: [
    { title: "开头：直接说明投诉对象", content: "使用正式称呼，指出近期在该网店购买电子词典，开门见山表明写信目的。" },
    { title: "主体：故障、影响与解决要求", content: "选择一个具体且可信的故障，简述对学习的影响；明确提出换货或退款，并询问退回流程。不要虚构法律结论或写成长篇经历。" },
    { title: "结尾：请求及时回复", content: "礼貌要求尽快回应并给出解决办法，用正式结束语署Zhang Wei。不写地址。" },
  ],
  sample: {
    english: ["Dear Sir or Madam,", "I am writing to complain about the electronic dictionary I bought from your online store a few days ago.", "Unfortunately, it often switches off while I am looking up words, even after the battery has been fully charged. This makes it difficult to use the dictionary for study. I would therefore like you to replace it with a properly functioning one or arrange a refund. Please also let me know how to return the faulty item.", "I would appreciate a prompt response and a clear solution to this problem.", "Yours faithfully,\nZhang Wei"],
    chinese: ["尊敬的先生或女士：", "我写信是想投诉几天前从贵网店购买的电子词典。", "很遗憾，查词时它经常自动关机，即使电池已经充满电也如此。这让我很难用它学习。因此，我希望贵方为我换一部功能正常的词典，或者安排退款。也请告知如何退回故障商品。", "希望贵方能尽快回复，并明确解决这一问题。", "此致，\n张伟"],
    notes: ["不知道客服姓名时使用正式通用称呼；并非原题要求必须采用唯一称呼。", "complain about直接点出投诉事项；dictionary后的关系从句省略宾语关系词。", "自动关机和电量细节为教学示例自行补充，不是原卷已知事实。while说明故障时机，even after增强问题说明；replace A with B和refund提出具体方案而非辱骂威胁。", "would appreciate礼貌而明确；prompt强调及时处理，不虚构必须几天内回复的法定期限。", "按题目用Zhang Wei，结束语与署名分行，不添加地址或真实联系方式。"],
  },
  languageTips: [
    { english: "I am writing to complain about the electronic dictionary.", chinese: "我写信是要投诉这部电子词典。", usage: "complain为动词，complaint为名词；make a complaint about也成立，不写make a complain。" },
    { english: "It switches off while I am looking up words.", chinese: "它在我查词时自动关机。", usage: "while连接故障发生时的背景动作；look up查阅，不能写look for表示已经查到词义。" },
    { english: "Please replace it with a properly functioning one or arrange a refund.", chinese: "请换成一部功能正常的词典，或安排退款。", usage: "replace A with B中A为旧物B为替代物；one指代dictionary，不重复堆砌名词。" },
    { english: "I would appreciate a prompt response.", chinese: "如能尽快回复，我将不胜感激。", usage: "appreciate后直接接response名词；礼貌不等于回避提出明确要求。" },
  ],
  checklist: ["是否说明电子词典和近期网购背景？", "是否写出可信、简短的故障及影响？", "是否明确提出及时解决要求，而非只有抱怨？", "是否礼貌、正式，没有威胁辱骂或虚构法律规定？", "是否约100词，以Zhang Wei署名且不写地址？", "是否检查complain/complaint、replace A with B及动词时态？"],
  pitfalls: ["把收件人写成朋友、把商品换成纸质词典或其他产品。", "只说很失望，没有说明问题，也没有要求解决。", "范文故障为可选教学设定，不当作真题给定事实；没有唯一标准范文。", "不杜撰订单号、真实地址、商家身份或自动评分。", "把prompt译成提示词，或把the other day理解成未来的另一天。", "约100词不是官方允许区间；页面统计仅帮助控制篇幅，范文不计入真题词频。"],
}];
