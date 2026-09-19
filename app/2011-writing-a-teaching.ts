import type { BeginnerSyntaxComponent, BeginnerClauseDetail, SentenceAnalysis, SentenceReadingGuide, SyntaxVisualRole } from "./data";
import type { PracticeTask } from "./learning-model";
import { withReviewedSyntax } from "./reviewed-syntax";

const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
type Reviewed = { components: BeginnerSyntaxComponent[]; colors: SyntaxVisualRole[]; clauses: BeginnerClauseDetail[]; reading: SentenceReadingGuide; chinese: string[]; notes?: string[] };
const reviewed: Record<number, Reviewed> = {
  1: {
    components: [
      c("Suppose", "祈使动词原形", "谓语", "省略的指令执行者you", "要求考生设想一个写信情境；并非要论证这个事件是否发生。"),
      c("your cousin Li Ming has just been admitted to a university", "省略that的陈述性从句", "宾语从句", "Suppose", "整个从句给出假设情境：表亲刚被大学录取。", [
        c("your cousin Li Ming", "物主限定词、亲属名词与姓名", "主语", "has been admitted", "被录取的人是表亲李明，不是考生。", [c("Li Ming", "姓名", "同位语", "your cousin", "姓名说明表亲是谁；cousin和原题him/her都没有限定性别。")]),
        c("has just been admitted", "现在完成时被动语态", "谓语", "your cousin Li Ming", "has表示完成时，been admitted构成被动，just说明刚刚发生。", [c("just", "时间副词", "时间状语", "has been admitted", "此处是刚刚，不是仅仅。")]),
        c("to a university", "介词短语", "录取机构补足语", "admitted", "to后面是录取的院校，不是不定式。")
      ])
    ], colors: ["predicate", "object"],
    clauses: [{ text: "your cousin Li Ming has just been admitted to a university", type: "宾语从句", marker: "省略that", role: "作Suppose的宾语", subject: "your cousin Li Ming", predicate: "has just been admitted", predicateDetails: [{ function: "录取机构（介词补足语）", text: "to a university" }], translationOrder: "先译假设，再译表亲刚刚被大学录取；Li Ming随表亲译出。" }],
    reading: { focus: "把题设动作Suppose与从句中的被录取事件分开。", questions: [{ question: "谁被录取？has been admitted为何不是主动录取别人？", evidence: "your cousin Li Ming has just been admitted", answer: "your cousin Li Ming是被录取者。has + been + admitted是现在完成时被动，说明新近完成的录取；下一句据此提出祝贺任务。" }] },
    chinese: ["假设", "你的表亲李明刚刚被一所大学录取"],
  },
  2: {
    components: [
      c("Write", "祈使动词原形", "谓语", "省略的主语you", "核心指令是写信；后面明确接收者和所写内容。"),
      c("him/her", "宾格人称代词的两种可能", "间接宾语", "Write", "表示收信人，回指李明；斜线保留原题未限定性别的写法。"),
      c("a letter", "名词短语", "直接宾语", "Write", "写作的成品是一封信；不是把收信人当作书写内容。"),
      c("to 1)congratulate him/her, and 2)give him/her suggestions on how to get prepared for university life", "含两个并列动作的不定式短语", "目的状语", "Write", "祝贺与建议是写信的两个目的，两个动词共用前面的to。原卷编号不改变并列关系。", [
        c("congratulate him/her", "不定式的第一动作", "第一并列目的", "Write", "congratulate直接以人为宾语；喜事已由前一句说明。", [c("him/her", "宾格代词", "宾语", "congratulate", "这里是被祝贺的人，和write后的间接宾语功能不同。")]),
        c("and", "并列连词", "连接成分", "congratulate与give", "两个交际目的都要完成。"),
        c("give him/her suggestions on how to get prepared for university life", "共用to的不定式并列项", "第二并列目的", "Write", "give说明提出建议，建议主题继续由on引出。", [
          c("give", "动词原形", "非谓语动作中心", "共用前面的to", "并列的是congratulate与give；give不另起一个祈使句。"),
          c("him/her", "宾格代词", "间接宾语", "give", "建议的接收者是李明。"),
          c("suggestions on how to get prepared for university life", "带后置说明的名词短语", "直接宾语", "give", "给出的内容是有关大学生活准备的建议。", [
            c("on how to get prepared for university life", "介词加疑问词不定式", "后置定语", "suggestions", "限定建议的主题；不是说在某物表面写建议。", [
              c("how to get prepared for university life", "疑问词加不定式", "介词宾语", "on", "说明如何准备；没有显式主语和限定谓语，不计作新的有限从句。", [
                c("how", "疑问副词", "方式成分", "get prepared", "询问准备的方法。"),
                c("to get prepared for university life", "不定式短语", "疑问词后的动作内容", "how", "准备的人是收到建议的李明。", [
                  c("get", "系动词原形", "不定式的系动词中心", "prepared", "表示进入准备好的状态，不是得到某个物品。"),
                  c("prepared", "过去分词形容词化", "表语", "get", "说明准备好的状态。"),
                  c("for university life", "介词短语", "准备对象补足语", "prepared", "准备应对大学生活；university以名词限定life。")
                ])
              ])
            ])
          ])
        ])
      ])
    ], colors: ["predicate", "object", "object", "modifier"], clauses: [],
    reading: { focus: "先识别写信的双宾语，再把两个目的和建议的主题读完整。", questions: [
      { question: "Write him/her a letter与congratulate him/her中的him/her功能一样吗？", evidence: "Write him/her a letter to 1)congratulate him/her", answer: "人物相同，语法功能不同：write后him/her是间接宾语，a letter是直接宾语；congratulate后him/her直接作宾语。" },
      { question: "how to get prepared是否又构成一个完整从句？", evidence: "on how to get prepared for university life", answer: "这是疑问词加不定式，整体作on的宾语，说明建议的主题。get后prepared是表语，for引出准备应对的大学生活。" }
    ] }, chinese: ["写", "给他或她", "一封信", "以便1）祝贺他或她，并2）就如何为大学生活做好准备提出建议"],
    notes: ["原卷用换行和1)、2)列出两个目的；此处合成一个连续句保存，未改变指令、编号或动作顺序。"]
  },
  3: {
    components: [c("You", "人称代词", "主语", "should write", "指承担写作任务的考生。"), c("should write", "情态动词加动词原形", "谓语", "You", "should表达要求，write不加-s。"), c("about 100 words", "带近似数量的名词短语", "宾语", "write", "about限定100，表示约100词，不是至少100词。", [c("about", "近似数量副词", "数量修饰语", "100", "没有给出固定容差，也没有说明官方扣分区间。")]), c("on ANSWER SHEET 2", "介词短语", "书写位置状语", "write", "这是原纸笔试卷的作答位置，线上继续使用本题输入框。")],
    colors: ["subject", "predicate", "object", "modifier"], clauses: [],
    reading: { focus: "将字数要求和书写位置分开，保留about的近似意义。", questions: [{ question: "about 100 words能否改成at least 100 words？", evidence: "about 100 words", answer: "不能。about是约数，at least是下限；本题要求约100词，没有给出一个可以自行推定的允许区间。" }] }, chinese: ["你", "应当写", "约100词", "在答题卡2上"]
  },
  4: {
    components: [c("Do not sign", "否定祈使结构", "谓语", "省略的主语you", "Do not使sign成为禁止指令，不是一般现在时第三人称的does not。"), c("your own name", "带所有格和强调词的名词短语", "宾语", "sign", "own强调考生本人的名字；禁止真实署名，不是禁止一切署名。"), c("at the end of the letter", "介词短语", "位置状语", "sign", "说明信末署名的位置；of the letter修饰end。", [c("of the letter", "介词短语", "后置定语", "end", "是哪一文本的末尾，而不是泛指最终结果。")])],
    colors: ["predicate", "object", "modifier"], clauses: [],
    reading: { focus: "否定限制的是用自己的真名署名，下一句另给指定名字。", questions: [{ question: "是否可以据此完全省略信末署名？", evidence: "Do not sign your own name", answer: "不能只看not就理解为不用署名。宾语是your own name，禁止的是考生真名；下一句要求改用Zhang Wei。" }] }, chinese: ["不要签署", "你自己的姓名", "在信的末尾"]
  },
  5: {
    components: [c("Use", "祈使动词原形", "谓语", "省略的主语you", "直接提出应采用的署名。"), c("Zhang Wei", "姓名", "宾语", "Use", "作为规定署名；不是收信人的姓名Li Ming。"), c("instead", "替代副词", "替代方式状语", "Use", "回接上一句的真实姓名，表示改用指定名字。")], colors: ["predicate", "object", "modifier"], clauses: [],
    reading: { focus: "instead需要回读上一句，区分收信人和写信人署名。", questions: [{ question: "instead替代的是什么？", evidence: "Use “Zhang Wei” instead", answer: "用Zhang Wei替代上一句被禁止的考生真名。Li Ming是收信人，两个人名承担不同角色。" }] }, chinese: ["使用", "“张伟（Zhang Wei）”", "作为替代署名"]
  },
  6: {
    components: [c("Do not write", "否定祈使结构", "谓语", "省略的主语you", "禁止填写后面的内容，write保留原形。"), c("your address", "名词短语", "宾语", "write", "不要写考生地址；address此处是名词地址。"), c("(10 points)", "括号内分值说明", "分值信息", "整道写作题", "说明原卷本题总分为10分，不属于write的宾语，也不是要求写十个要点。")], colors: ["predicate", "object", "modifier"], clauses: [],
    reading: { focus: "把禁止写地址的要求与括号中的原卷分值区分。", questions: [{ question: "10 points是十条写作建议吗？", evidence: "(10 points)", answer: "不是，这里points表示分数，本题总分10分；上一部分给出的写作目的仍只有祝贺和入学准备建议。" }] }, chinese: ["不要写", "你的地址", "（本题10分）"]
  }
};

const choice = (id: string, prompt: string, options: string[], evidence: string, feedback: string, conceptId: PracticeTask["conceptId"], hintWords: string[], extra: Partial<PracticeTask> = {}): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer: options[0], evidence, feedback, conceptId, errorType: "translation", hintWords, ...extra });
export const writing2011APractice: Record<string, PracticeTask[]> = {
  "2011-writing-a-s1": [{ id: "completed-passive", revision: 1, kind: "range", prompt: "划出说明李明刚被录取的完整谓语，保留just。", options: [], answer: "has just been admitted", evidence: "has just been admitted", feedback: "has + been + admitted组成现在完成时被动，just是其中的时间副词；to a university另说明录取院校。", conceptId: "passive-voice", errorType: "predicate", hintWords: ["has", "been", "admitted", "just", "has just been admitted to a university"] }],
  "2011-writing-a-s2": [
    { id: "verb-object-roles", revision: 1, kind: "link", prompt: "把三处动作和各自的宾语关系对应起来。", links: [{ source: "Write him/her a letter", target: "人是收信对象，信是所写内容" }, { source: "congratulate him/her", target: "人直接作为被祝贺的对象" }, { source: "give him/her suggestions", target: "人是接收者，建议是给予的内容" }], options: ["人是收信对象，信是所写内容", "人直接作为被祝贺的对象", "人是接收者，建议是给予的内容"], answer: JSON.stringify(["人是收信对象，信是所写内容", "人直接作为被祝贺的对象", "人是接收者，建议是给予的内容"]), evidence: "Write him/her a letter to 1)congratulate him/her, and 2)give him/her suggestions", feedback: "write与give都有人和内容两个宾语；congratulate直接以被祝贺的人为宾语。指代相同，不表示语法功能也相同。", conceptId: "basic-svo", errorType: "attachment", hintWords: ["Write", "give", "congratulate", "him", "her", "letter", "suggestions", "congratulate him/her"] },
    { id: "two-purposes", revision: 1, kind: "range", prompt: "从to开始划出写信的完整目的，两个编号和建议主题都保留。", options: [], answer: "to 1)congratulate him/her, and 2)give him/her suggestions on how to get prepared for university life", evidence: "to 1)congratulate him/her, and 2)give him/her suggestions on how to get prepared for university life", feedback: "congratulate与give共用to，构成两个并列目的；建议的主题一直延伸到university life，不能在suggestions处提前停止。", conceptId: "nonfinite-infinitive", errorType: "attachment", hintWords: ["to", "and", "on", "suggestions", "how", "congratulate", "give", "get prepared for university life"] }
  ],
  "2011-writing-a-s3": [choice("word-limit", "本题对篇幅的要求是什么？", ["约100词", "至少100词", "100字且不多不少"], "about 100 words", "about表示约数；words按英文词数理解，不换成汉字数，也不虚构官方允许区间。", "comparison-scope", ["about", "words", "about 100 words"])],
  "2011-writing-a-s4": [{ id: "forbidden-name", revision: 1, kind: "range", prompt: "题目禁止署什么名字？只划出sign的完整宾语。", options: [], answer: "your own name", evidence: "Do not sign your own name", feedback: "宾语your own name指考生本人的真名；at the end of the letter说明位置，不属于宾语。", conceptId: "basic-svo", errorType: "attachment", hintWords: ["your", "own", "name", "sign"], leaksToTasks: [{ sentenceId: "2011-writing-a-s5", taskId: "replacement-signature" }] }],
  "2011-writing-a-s5": [choice("replacement-signature", "instead要求怎样处理署名？", ["以Zhang Wei替代考生真名", "以Li Ming作为写信人署名", "省略一切署名"], "Use “Zhang Wei” instead", "instead回接上一句禁止的考生真名；Zhang Wei是指定署名，Li Ming是收信人。", "lexical-context", ["Use", "Zhang", "Wei", "instead"], { leaksToTasks: [{ sentenceId: "2011-writing-a-s4", taskId: "forbidden-name" }] })],
  "2011-writing-a-s6": [choice("address-and-score", "这句还补充了哪项要求和信息？", ["不写地址；本题总分10分", "不写署名；提出10条建议", "可以写地址；范文自动得10分"], "Do not write your address. (10 points)", "address作名词是地址，Do not write表示禁止填写；points标原卷分值，与教学练习的独立掌握状态分开。", "negation-contrast", ["Do", "not", "write", "address", "points"])]
};

export function withWriting2011ATeaching(sentence: SentenceAnalysis): SentenceAnalysis {
  const entry = reviewed[sentence.number];
  if (!entry) throw new Error(`Missing writing teaching: ${sentence.id}`);
  const result = withReviewedSyntax({ ...sentence, beginnerSyntax: { components: entry.components, clauses: entry.clauses, reading: entry.reading }, layers: entry.components.map(component => ({ label: component.function, text: component.explanation })), grammar: entry.components.map(component => `${component.text}：${component.form}；${component.explanation}`), translationNotes: entry.notes, practice: writing2011APractice[sentence.id] }, entry.colors);
  if (result.chunks.length !== entry.chinese.length) throw new Error(`${sentence.id}: 词块译文不匹配`);
  return { ...result, translationAlignment: result.chunks.map((chunk, index) => ({ english: chunk.text, chinese: entry.chinese[index] })) };
}
