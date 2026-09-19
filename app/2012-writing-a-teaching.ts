import type { BeginnerSyntaxComponent, BeginnerClauseDetail, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import type { PracticeTask } from "./learning-model";
import { withReviewedSyntax } from "./reviewed-syntax";
const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const reviewed: Record<number, { components: BeginnerSyntaxComponent[]; colors: SyntaxVisualRole[]; clauses: BeginnerClauseDetail[]; reading: SentenceReadingGuide; chinese: string[] }> = {
  1: {
    components: [c("Suppose", "祈使动词原形", "谓语", "省略的主语you", "要求考生设想一个投诉情境，不表示考生现实中确实买了故障产品。"), c("you have found something wrong with the electronic dictionary that  you bought from an online store the other day", "省略that的陈述性从句", "宾语从句", "Suppose", "整个从句是需要设想的情境，其内部还嵌有修饰dictionary的定语从句。", [
      c("you", "人称代词", "主语", "have found", "题设中的考生发现产品问题。"),
      c("have found", "现在完成时动词短语", "谓语", "you", "have为完成助动词，found为find的过去分词；已经发现的问题构成当前投诉理由。"),
      c("something wrong with the electronic dictionary that  you bought from an online store the other day", "带后置限定的不定代词短语", "宾语", "have found", "发现电子词典有些问题；具体故障尚未给出，不把范文自动关机当题设事实。", [
        c("something", "不定代词", "宾语中心", "have found", "表示发现的某些问题，具体内容由后面说明。"),
        c("wrong with the electronic dictionary that  you bought from an online store the other day", "形容词短语", "后置定语", "something", "wrong放在不定代词something后，with引出现问题的物品。", [
          c("with the electronic dictionary that  you bought from an online store the other day", "介词短语", "对象补足语", "wrong", "with引出有问题的电子词典，不是陪同关系。", [
            c("the electronic dictionary", "名词短语", "介词宾语中心", "with", "electronic为形容词修饰dictionary，产品是电子词典。"),
            c("that  you bought from an online store the other day", "关系从句", "定语从句", "dictionary", "限定为前几天从网店购买的那部词典，that在从句中作bought的宾语。", [c("that", "关系代词", "宾语", "bought", "回指dictionary；并非省略that的外层宾语从句标记。"), c("you", "人称代词", "主语", "bought", "购买者仍是题设考生。"), c("bought", "一般过去时动词", "谓语", "you", "buy的过去式，宾语由前置的that承担。"), c("from an online store", "介词短语", "来源状语", "bought", "说明在哪种商店购买，online为形容词限定store。"), c("the other day", "过去时间习语", "时间状语", "bought", "表示前几天或最近某天，不能据此编造精确购买日期。")])
          ])
        ])
      ])
    ])], colors: ["predicate", "object"],
    clauses: [
      { text: "you have found something wrong with the electronic dictionary that  you bought from an online store the other day", type: "宾语从句", marker: "省略that", role: "作Suppose的宾语", subject: "you", predicate: "have found", predicateDetails: [{ function: "宾语", text: "something wrong with the electronic dictionary that  you bought from an online store the other day" }], translationOrder: "先译假设，再译发现问题；购买信息嵌入电子词典之前。" },
      { text: "that  you bought from an online store the other day", type: "定语从句", marker: "that", role: "后置限定dictionary", subject: "you", predicate: "bought", predicateDetails: [{ function: "宾语（关系代词）", text: "that" }, { function: "来源状语", text: "from an online store" }, { function: "时间状语", text: "the other day" }], translationOrder: "译成前几天从网店购买的，放在电子词典之前。" }
    ], chinese: ["假设", "你发现前几天从一家网店购买的电子词典有些问题"],
    reading: { focus: "先读发现问题的情境，再把词典的购买经历放回嵌套定语。", questions: [{ question: "that在本句出现在哪一层，作什么成分？", evidence: "that  you bought from an online store the other day", answer: "原文显式that引导修饰dictionary的定语从句，并作bought的宾语；Suppose后的外层宾语从句省略了that，两层不能混为一个。" }, { question: "原题有没有说明故障就是自动关机？", evidence: "something wrong with the electronic dictionary", answer: "没有。原题只说电子词典有问题，具体故障可以在写作中合理补充，但不能当作已给事实。" }] },
  },
  2: {
    components: [c("Write", "祈使动词原形", "谓语", "省略的主语you", "要求撰写电子邮件。"), c("an email", "名词短语", "宾语", "Write", "体裁为电子邮件，后文letter仍指同一文本。"), c("to  the  customer service center", "介词短语", "收件对象", "Write an email", "第一个to后接名词短语，说明写给客服中心，不是目的不定式。", [c("the  customer service center", "带名词前置修饰的名词短语", "介词宾语", "to", "center为中心词，customer service说明客户服务机构；保留原卷双空格。")]), c("to 1) make a complaint, and 2) demand a prompt solution", "含两个并列动作的不定式短语", "目的状语", "Write", "第二个to引出两个邮件目的，make与demand共用这个to。", [c("make a complaint", "动词加名词宾语", "第一并列目的", "Write", "提出投诉，complaint是名词。"), c("and", "并列连词", "连接成分", "make与demand", "两个目的均要完成，不能只选一个。"), c("demand a prompt solution", "动词加名词宾语", "第二并列目的", "Write", "要求及时解决，prompt是形容词修饰solution，不是提示。", [c("a prompt solution", "名词短语", "宾语", "demand", "方案需及时，原题未给法定期限或指定补偿金额。")])])], colors: ["predicate", "object", "modifier", "modifier"], clauses: [], chinese: ["写", "一封电子邮件", "给客服中心", "以便1）提出投诉，并2）要求及时解决"],
    reading: { focus: "区分两个to，保留邮件的收件对象和两个目的。", questions: [{ question: "两个to都表示为了吗？", evidence: "Write an email to  the  customer service center to 1) make a complaint", answer: "不是。第一个to为介词，引出收件对象客服中心；第二个to是不定式标记，make与demand两个目的动作共用它。" }] },
  },
  3: {
    components: [c("You", "人称代词", "主语", "should write", "指写作考生。"), c("should write", "情态动词加动词原形", "谓语", "You", "should表示任务要求。"), c("about 100 words", "带近似数量的名词短语", "宾语", "write", "about限定100，表示约100词，不是最低100词。"), c("on ANSWER SHEET 2", "介词短语", "书写位置状语", "write", "原卷要求在答题卡2作答；线上在同题输入框完成。")], colors: ["subject", "predicate", "object", "modifier"], clauses: [], chinese: ["你", "应当写", "约100词", "在答题卡2上"],
    reading: { focus: "数量和位置分开，不给约数添加原题没有的容差。", questions: [{ question: "about能否理解为至少？", evidence: "about 100 words", answer: "不能。about表示大约，at least才表示至少；题目没有给出精确允许区间。" }] },
  },
  4: {
    components: [c("Do not sign", "否定祈使结构", "谓语", "省略的主语you", "禁止后面的真实署名，sign保持原形。"), c("your own name", "带所有格和强调词的名词短语", "宾语", "sign", "own强调考生本人的姓名；不是一概取消署名。"), c("at the end of the letter", "介词短语", "位置状语", "sign", "the letter回指前面的同一封email，不另要求纸质信。", [c("of the letter", "介词短语", "后置定语", "end", "限定是哪一文本的末尾。")])], colors: ["predicate", "object", "modifier"], clauses: [], chinese: ["不要签署", "你自己的姓名", "在邮件末尾"],
    reading: { focus: "禁用真实姓名与指定代用署名是相邻两项要求。", questions: [{ question: "letter是否说明又要另写一封信？", evidence: "at the end of the letter", answer: "不是，letter在这里泛指前面要求的电子邮件文本；保留原卷用词，不增加第二份作答。" }] },
  },
  5: {
    components: [c("Use", "祈使动词原形", "谓语", "省略的主语you", "直接要求采用指定署名。"), c("Zhang Wei", "姓名", "宾语", "Use", "这是考生应使用的署名，不是客服人员姓名。"), c("instead", "替代副词", "替代方式状语", "Use", "承接上一句被禁止的真实姓名，表示改用。")], colors: ["predicate", "object", "modifier"], clauses: [], chinese: ["使用", "“张伟（Zhang Wei）”", "作为替代署名"],
    reading: { focus: "回读上一句才能确定instead替代什么。", questions: [{ question: "instead替代的对象是什么？", evidence: "Use “Zhang Wei” instead", answer: "替代上一句所说的考生真实姓名；仍需署名，但统一用Zhang Wei。" }] },
  },
  6: {
    components: [c("Do not write", "否定祈使结构", "谓语", "省略的主语you", "不要填写后面指定的内容。"), c("your address", "名词短语", "宾语", "write", "指考生的通信地址，不是要求处理问题。"), c("(10 points)", "括号分值说明", "分值信息", "整道写作题", "原卷本题10分，不是写十条要点或系统自动评分。")], colors: ["predicate", "object", "modifier"], clauses: [], chinese: ["不要写", "你的地址", "（本题10分）"],
    reading: { focus: "把不写地址的格式要求和原卷分值分开。", questions: [{ question: "10 points说明什么？", evidence: "(10 points)", answer: "说明原卷第47题的分值；作文仍需完成投诉和及时解决两个目的，指令练习的掌握状态不等于作文得分。" }] },
  },
};
const choice = (id: string, prompt: string, options: string[], evidence: string, feedback: string, conceptId: PracticeTask["conceptId"], hintWords: string[], extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[0], evidence, feedback, conceptId, errorType: "translation", hintWords, ...extra });
export const writing2012APractice: Record<string, PracticeTask[]> = {
  "2012-writing-a-s1": [{ id: "dictionary-clause", revision: 1, kind: "range", prompt: "划出限定电子词典的完整定语从句，保留购买来源和时间。", options: [], answer: "that  you bought from an online store the other day", evidence: "that  you bought from an online store the other day", feedback: "that从句修饰dictionary，其中that作bought的宾语，from说明购买来源，the other day说明购买时间。", conceptId: "clause-relative", errorType: "clause-boundary", hintWords: ["that", "bought", "from", "day", "the other day"] }, choice("given-and-added", "哪项信息是原题给定的？", ["网购电子词典有问题，具体故障尚未给出", "电池充满后仍必然自动关机", "商家已拒绝退款且违反了某项法律"], "something wrong with the electronic dictionary", "题设只给出商品、渠道、近期购买与发现问题；自动关机等属于可自行选择的写作细节，不能当作原卷已知事实。", "lexical-context", ["something", "wrong", "electronic", "dictionary", "something wrong with the electronic dictionary"])],
  "2012-writing-a-s2": [{ id: "two-to-roles", revision: 1, kind: "link", prompt: "把两个to及并列关系接回各自作用。", links: [{source:"to  the  customer service center",target:"介词，引出客服收件对象"},{source:"to 1) make a complaint",target:"不定式标记，引出写邮件目的"},{source:"and 2) demand a prompt solution",target:"第二目的动作，共用前面的to"}], options:["介词，引出客服收件对象","不定式标记，引出写邮件目的","第二目的动作，共用前面的to"], answer:JSON.stringify(["介词，引出客服收件对象","不定式标记，引出写邮件目的","第二目的动作，共用前面的to"]), evidence:"to  the  customer service center to 1) make a complaint, and 2) demand a prompt solution", feedback:"第一个to后接客服中心名词短语；第二个to后接make原形，demand与make并列，两项都是邮件目的。", conceptId:"nonfinite-infinitive", errorType:"attachment", hintWords:["to","make","and","demand","center"] }],
  "2012-writing-a-s3": [choice("word-limit", "这封邮件的原题篇幅要求是什么？", ["约100词", "至少100词", "恰好100个汉字"], "about 100 words", "about表示大约，words是英文词数；原题未给固定容差或自动扣分区间。", "comparison-scope", ["about", "words", "about 100 words"])],
  "2012-writing-a-s4": [{id:"forbidden-name",revision:1,kind:"range",prompt:"只划出sign的完整宾语，确认禁止署什么名字。",options:[],answer:"your own name",evidence:"Do not sign your own name",feedback:"your own name是考生本人的姓名，禁止的是用真名署名；末尾位置短语不属于宾语。",conceptId:"basic-svo",errorType:"attachment",hintWords:["sign","your","own","name"],leaksToTasks:[{sentenceId:"2012-writing-a-s5",taskId:"replacement-signature"}]}],
  "2012-writing-a-s5": [choice("replacement-signature", "instead要求采用什么署名？", ["Zhang Wei替代考生真名", "客服人员的真实姓名", "不保留任何署名"], "Use “Zhang Wei” instead", "instead回接上一句禁止的真实姓名；Zhang Wei是题目指定的代用署名。", "lexical-context", ["Use","Zhang","Wei","instead","Use “Zhang Wei” instead"], {leaksToTasks:[{sentenceId:"2012-writing-a-s4",taskId:"forbidden-name"}]})],
  "2012-writing-a-s6": [choice("address-and-score", "末句补充的要求与信息是什么？", ["不写地址，本题满分10分", "写十条建议并署真实地址", "提交后系统自动判作文10分"], "Do not write your address. (10 points)", "address此处是名词地址；括号标原卷分值，不计作文要点数，也不代表系统自动给分。", "negation-contrast", ["Do","not","write","address","points","Do not write your address"])],
};
export function withWriting2012ATeaching(sentence: SentenceAnalysis): SentenceAnalysis {
  const entry=reviewed[sentence.number];if(!entry)throw new Error(`Missing writing teaching: ${sentence.id}`);
  const result=withReviewedSyntax({...sentence,beginnerSyntax:{components:entry.components,clauses:entry.clauses,reading:entry.reading},layers:entry.components.map(c=>({label:c.function,text:c.explanation})),grammar:entry.components.map(c=>`${c.text}：${c.form}；${c.explanation}`),practice:writing2012APractice[sentence.id]},entry.colors);
  if(result.chunks.length!==entry.chinese.length)throw new Error(`${sentence.id}: 词块译文不匹配`);
  return {...result,translationAlignment:result.chunks.map((chunk,index)=>({english:chunk.text,chinese:entry.chinese[index]}))};
}
