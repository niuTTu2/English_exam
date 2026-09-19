import { writing2012BPriority } from "./2012-writing-b-priority";
import { writing2012APriority } from "./2012-writing-a-priority";
import { writing2011BPriority } from "./2011-writing-b-priority";
import { passage2011P2Priority } from "./2011-passage-2-priority";
import { writing2011APriority } from "./2011-writing-a-priority";
import { passage2011P1Priority } from "./2011-passage-1-priority";
import { passage2000P2Priority } from "./2000-passage-2-priority";
import { passage2000P1Priority } from "./2000-passage-1-priority";
import type { VocabEntry } from "./data";
export type VocabularyPriority = { id: "core" | "sense" | "structure" | "function" | "recognition" | "name"; label: string; reason: string; recommendedReview: boolean };
const core = new Set("momentum bankruptcy controversy downturn demand fluctuate guarantee sector confidence debt decline lack wealth greed passion supply price peak average interview promote circulation surpass appropriate".split(" "));
const familiar = new Set(["note", "fetch", "figure", "work", "interest", "run", "deliver"]);
const functions = new Set("as that who what which since though by on in of to for but and not all any it they them its there after before with than from".split(" "));
const names = new Set(["damien", "hirst", "sotheby", "christie", "lehman", "clare", "mcandrew", "edward", "dolman", "london", "york"]);
const sourceNames: Record<string, string[]> = {
  "2010-p1-s1": ["beautiful", "inside", "my", "head", "forever"],
  "2010-p1-s4": ["wall", "street", "new", "brother"],
  "2010-p1-s6": ["art", "economics"],
  "question-201021-option-C": ["beautiful", "inside", "my", "head", "forever"],
};
const structures = new Set(["all but two", "all but two pieces", "file for bankruptcy", "filed for bankruptcy", "fall by", "fell by two-thirds", "be down by", "down by nearly 90%", "not a but b", "not a lack of demand but a lack of good work to sell", "have to do", "had to pay out", "wait for a to do", "waiting for confidence to return", "for a while", "since 2003"]);
const text2Core = new Set("communication conversation expectation spouse inequality tangible complaint divorce pattern context havoc trust support attach motivation exert damage pressure stem vivid brief epidemic tend crystallize irony represent focus".split(" "));
const text2Senses = new Set(["address", "room", "look", "give", "share", "mean", "account", "figure", "work", "given"]);
const text2Names = new Set(["virginia", "andrew", "hacker", "catherine", "kohler", "riessman"]);
const text2SourceNames: Record<string, string[]> = { "2010-p2-s13": ["talk"], "question-201030-option-A": ["divorce", "talk"] };
const text2Functions = new Set([...functions, "if", "although", "while", "when", "except", "throughout", "instead"]);
const text2Structures = new Set(["invite somebody to do something", "invite sb to do sth", "invite A to do B", "had invited men to join them", "keep the conversation going", "keep A doing", "keep somebody/something doing", "tend to do", "tend to talk", "tend to talk more than women", "wreak havoc with", "is wreaking havoc with marriage", "give A as B", "gave lack of communication as the reason", "amount to", "amounts to", "such as", "first and foremost", "attach importance to", "stem from", "stems from", "between A and B", "between man and wife", "in short"].map(value => value.toLowerCase()));
const homeworkCore = new Set("scorn inflexible mandate impoverished chaotic contradictory implication standard empower impose eliminate significant appropriate meaningful authority restrict discourage faulty".split(" "));
const homeworkSenses = new Set("count address pass close matter work flat review correct hold right place key approach".split(" "));
const homeworkNames = new Set(["los", "angeles", "l.a.", "l.a", "unified"]);
const homeworkStructures = new Set(["with the exception of", "is meant to address", "on their own", "giving a pass to students", "as much of it as they want", "no more than 10%", "rather than empowering teachers", "finds homework to be unimportant", "account for a significant portion", "does nothing to ensure", "are willing to review and correct", "be put on hold", "looks into the matter", "not too late", "do homework right"]);
const text3Core = new Set("habit behavior consumer cue routine cultivate subtle invest influence impact campaign promote promotion controversy essential viable observe observation".split(" "));
const text3Senses = new Set("art perfect figure turn spring production feature ritual manufacture scrub white power concern private commercial".split(" "));
const text3Names = new Set("dr curtis london procter gamble colgate-palmolive unilever colgate crest tide carol berning".split(" "));
const text3Structures = new Set(["figure out", "turn to somebody for help", "help somebody (to) do something", "help (to) do something", "in response to something", "invest money (in) doing something", "between A and B", "be essential to doing something", "tie A to B", "be used to do something", "so as to do something", "due to + cause", "belong to a category"].map(value => value.toLowerCase()));
const text4Core = new Set("jury juror qualification competent select selection representative discrimination prohibit exempt eligible abolish require requirement conscience verdict principle reform tradition development inadequacy conform".split(" "));
const text4Senses = new Set("letter regard trial peer pass act serve duty practice character case cross section immune rigid".split(" "));
const text4Names = new Set("strauder virginia utah taylor louisiana united us v".split(" "));
const text4SourceNames:Record<string,string[]>={"2010-p4-s6":["state","west"],"2010-p4-s11":["state"]};
const text4Structures = new Set(["regard A as B","serve on a jury","on account of something","be entitled to something","the letter of the law","be said to do something","take turns doing something","conflict with something","be limited to something","a way around something","fail to do something","it is / was not until ... that ...","it was not until ... that ...","make somebody eligible for something","exempt somebody from something","have something done","keep somebody / something + adjective","usher in something","at random","a cross section of something","extend A to B","be representative of something","declare A to be B","fall short of something","be supposed to do something","center on something"].map(value=>value.toLowerCase()));
const text5Core = new Set("efficiency formation energy expend propel drag range reduction emission separation regulation perception investigate co-ordinate destination reschedule substantiate unsubstantiated document resistance approach".split(" "));
const text5Senses = new Set("trumpet company peer wake assume range knot case turn enjoy satisfy flight force".split(" "));
const text5Names = new Set("boeing airbus a350 stanford ilan kroo dr peter lissaman caltech southern california los angeles san francisco las vegas utah london america raf lancaster berlin".split(" "));
const text5SourceNames:Record<string,string[]>={"2010-p5-s16":["red","arrow"],"2010-p5-s18":["international","civil","aviation","organisation"],"2010-p5-s25":["defence","advanced","research","project","agency"]};
const text5Structures = new Set(["both A and B","make a difference","an approach to doing something","the answer lies with somebody","fly in formation","spend energy doing something","an increase of a percentage","apply something to something","have a turn","proceed to a destination","as much as an amount","be coupled with something","fall by an amount","work out a problem","travel in company","be separated by a distance","it remains to be seen how ...","allow somebody to do something","be easier to do something","as it happens","be on the case","have yet to do something","be low on something"].map(x=>x.toLowerCase()));
/** 编辑建议按本篇语境给出；不是官方考试词频排名，也不改变词义。 */
export function vocabularyPriority(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm">, sourceId: string, articleId?: string): VocabularyPriority | undefined {
  if (articleId === "2012-writing-b") return writing2012BPriority(entry);
  if (articleId === "2012-writing-a") return writing2012APriority(entry);
  if (articleId === "2011-writing-b") return writing2011BPriority(entry);
  if (articleId === "2011-writing-a") return writing2011APriority(entry);
  if (articleId === "p2") return passage2000P2Priority(entry);
  if (articleId === "p1") return passage2000P1Priority(entry, sourceId);
  if (articleId === "p4") {
    const head = entry.headword.toLowerCase();
    if (entry.kind === "phrase") return { id: "structure", label: "本句结构", reason: "记住本句完整关系，特别是介词补足、比较、倒装和取舍方向。", recommendedReview: true };
    if (new Set("japan japanese europe american toshiki kaifu mitsuo setoyama yoko muro liberal democratic party".split(" ")).has(head)) return { id: "name", label: "背景名称 · 识别即可", reason: "识别国别、人物和机构背景，并把说法接回对应人物。", recommendedReview: false };
    if (new Set("see question stress tell return come basic present envy experience".split(" ")).has(head)) return { id: "sense", label: "熟词语境义", reason: "重点区分本来源的词性和义项，再读回当前句子。", recommendedReview: true };
    if (new Set([...functions, "whose", "whether", "while", "more", "less", "how"]).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "结合当前句法辨认指代、比较、连接和省略。", recommendedReview: false };
    if (new Set("productivity harmony decline fulfill opportunity sacrifice rigid satisfaction dissatisfaction creativity frustration violence conservative reform morality centralization abandon discomfort endure tolerant cultivation emphasis".split(" ")).has(head)) return { id: "core", label: "核心迁移词", reason: "结合本句意义与常用结构复习，帮助阅读教育及社会变化类文章。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先读懂本句，再决定是否加入复习。", recommendedReview: false };
  }
  if (articleId === "p3") {
    const head = entry.headword.toLowerCase();
    if (entry.kind === "phrase") return { id: "structure", label: "本句结构", reason: "结合本句确认搭配的范围、修饰对象及可接成分。", recommendedReview: true };
    if (new Set("turkish bulgarian".split(" ")).has(head)) return { id: "name", label: "背景名称 · 识别即可", reason: "此处交代军官的国籍，识别故事人物即可。", recommendedReview: false };
    if (new Set("note type will class fashion novel review approach speed".split(" ")).has(head)) return { id: "sense", label: "熟词语境义", reason: "结合当前来源区分词性与义项，再读回所在结构。", recommendedReview: true };
    if (new Set([...functions, "however", "whatever", "till", "when", "if"]).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "在当前句中辨认连接、指代及从句内部作用。", recommendedReview: false };
    if (new Set("advocate advisable principle unreasonable corresponding require interpret stress essential qualify finite imitate confuse explanatory fulfill proposition expression indicative transient phenomenon".split(" ")).has(head)) return { id: "core", label: "核心迁移词", reason: "建议结合本句义和常用结构复习，帮助阅读观点评论类文章。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先理解当前句意，再选择是否单独复习。", recommendedReview: false };
  }
  if (articleId === "2001-cloze") {
    const head = entry.headword.toLowerCase();
    if (["rosemary","west","lord","irvine","gerald","kaufman","british","britain","european","parliament"].includes(head)) return { id:"name",label:"背景专名 · 识别即可",reason:"识别案件、人物和机构；判断观点归属时仍需分清其角色。",recommendedReview:false };
    if (entry.kind === "phrase") return {id:"structure",label:"完形搭配与结构",reason:"复习当前空格的连接、动词补足及报道用法，并保留可替换表达的限制。",recommendedReview:true};
    if (["press","control","make","lay","hand","sentence","issue","figure","come"].includes(head)) return {id:"sense",label:"熟词语境义",reason:"新闻司法语境中的词性和意义会影响空格判断。",recommendedReview:true};
    if (new Set([...functions,"whether","before","after","when","be","have","do","may","rather"]).has(head)) return {id:"function",label:"功能词 · 看关系",reason:"区分当前片段的介词对象、内容连接、时间与补足关系。",recommendedReview:false};
    if (["ban","witness","tighten","draft","illegal","publicity","regulation","privacy","interpretation","legislation","binding","entitle","exaggerate","ensure","verdict","sufficient"].includes(head)) return {id:"core",label:"核心迁移词",reason:"有助于理解法律新闻、监管和结果保证类议论；不等同于官方词频。",recommendedReview:true};
    return {id:"recognition",label:"本题识别 · 按需记忆",reason:"先分清本题候选词的实际意义和搭配，再决定是否复习。",recommendedReview:false};
  }
  if (articleId === "2001-p2") {
    const head = entry.headword.toLowerCase();
    if (["united", "states", "america", "american", "brazil", "india", "britain", "english", "german", "dutch", "french"].includes(head)) return { id: "name", label: "背景专名 · 识别即可", reason: "识别美国历史案例与其他国家例证，重点区分投资、建设及拥有者。", recommendedReview: false };
    if (entry.kind === "phrase") return { id: "structure", label: "本篇结构与搭配", reason: "把比较、因果、政策行为和对象关系连同当前表达一起复习。", recommendedReview: true };
    if (["interest", "capital", "finance", "own", "net", "mean", "run", "case", "control", "positive", "narrow"].includes(head)) return { id: "sense", label: "熟词语境义", reason: "结合信息差距与经济建设语境辨明具体词义及词性。", recommendedReview: true };
    if (new Set([...functions, "whether", "how", "only", "more", "much", "well", "so", "be", "have", "do", "must", "he"]).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "按实际来源辨明从句、比较、指代与助动词作用；原卷异常字形另看用法说明。", recommendedReview: false };
    if (["divide", "commercialize", "universalize", "access", "potential", "combat", "poverty", "impoverished", "prejudice", "sovereignty", "infrastructure", "investment", "corporation", "recognize", "justify"].includes(head)) return { id: "core", label: "核心迁移词", reason: "有助于理解技术普及、经济发展与外资政策的议论。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先读清当前命题与论证对象，再按需要复习扩展。", recommendedReview: false };
  }
  if (articleId === "2001-p1") {
    const head = entry.headword.toLowerCase(), form = (entry.canonicalForm ?? entry.display).toLowerCase();
    if (["british", "united", "kingdom"].includes(head)) return { id: "name", label: "背景专名 · 识别即可", reason: "本篇限定英国地质学的历史案例，识别地域即可。", recommendedReview: false };
    if (entry.kind === "phrase") return /^(?:only if|use a as b|lead to|be reckoned as|draw a distinction|by doing|one of|not simply|in .*own right|tend to|infer from|discrimination by|a direct reason)/.test(form) ? { id: "structure", label: "必会结构", reason: "在本篇中承担因果、限制、补足或指代关系，适合连同完整表达复习。", recommendedReview: true } : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先读清当前学术讨论的对象，再按需要加入复习。", recommendedReview: false };
    if (new Set(["draw", "concern", "share", "value", "right", "represent", "constitute", "referee", "reckon"]).has(head)) return { id: "sense", label: "熟词语境义", reason: "本篇用法易与基本义混淆，结合科学研究语境复习。", recommendedReview: true };
    if (new Set([...functions, "whereas", "although", "only", "another", "one", "little", "must", "have", "be"]).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "辨明它在当前来源中的比较、从句、介词或时态关系。", recommendedReview: false };
    if (new Set(["specialisation", "professionalisation", "accumulation", "distinction", "connotation", "integrate", "consequent", "requirement", "participation", "primacy", "acceptable", "incorporate", "reinforce", "differentiate", "differentiation", "crucial", "infer", "discrimination"]).has(head)) return { id: "core", label: "核心迁移词", reason: "有助于理解知识发展、制度分化与学术参与类议论。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先保证读懂当前句子，无需把所有扩展一并背诵。", recommendedReview: false };
  }
  if (articleId === "2012-p3") {
    const head=entry.headword.toLowerCase();
    if (["myriad","genetics","utah","hans","sauer","mayo","bio"].includes(head)) return {id:"name",label:"背景专名 · 识别即可",reason:"识别争议当事方与发言来源即可，仍可自行标记。",recommendedReview:false};
    if (entry.kind === "phrase") return {id:"structure",label:"本篇关键表达",reason:"结合观点归属、比较关系与研究对象复习。",recommendedReview:true};
    if (["file","brief","suit","term","hear","hold","ruling","rule","coach","landscape","pack","critical","issue"].includes(head)) return {id:"sense",label:"熟词语境义",reason:"当前法律报道、会议或题目用法需要连句辨认词义词性。",recommendedReview:true};
    if (functions.has(head) || ["whether","only","may","yet"].includes(head)) return {id:"function",label:"功能词 · 看句法作用",reason:"注意观点内容、历史时间、指代和可能性限制。",recommendedReview:false};
    if (["patent","patentable","unpatentable","overturn","preliminary","suppress","innovation","monopoly","restrict","access","violate","correlation","efficacy","objective"].includes(head)) return {id:"core",label:"核心迁移词",reason:"这些词支撑科技、制度和争议报道的理解，适合按本句搭配复习。",recommendedReview:true};
    return {id:"recognition",label:"本句识别 · 按需记忆",reason:"先理解本句，再决定是否加入复习。",recommendedReview:false};
  }
  if (articleId === "2012-p2") {
    const head=entry.headword.toLowerCase();
    if (["jo","paoletti","daniel","cook","virgin","mary"].includes(head)) return {id:"name",label:"背景专名 · 识别即可",reason:"识别研究者姓名或文化象征出处，辅助分清观点来源。",recommendedReview:false};
    if (entry.kind === "phrase") return {id:"structure",label:"本篇关键表达",reason:"结合颜色历史、营销机制及当前句法关系复习。",recommendedReview:true};
    if (["present","associate","matter","take","turn","trade","wear","term","prove","mean","means","consumption"].includes(head)) return {id:"sense",label:"熟词语境义",reason:"当前词义或词性与常见用法不同，应连同所在句辨认。",recommendedReview:true};
    if (functions.has(head) || ["only","one","when","where","until"].includes(head)) return {id:"function",label:"功能词 · 看句法作用",reason:"重点辨明真实指代、时间、让步、原因与范围。",recommendedReview:false};
    if (["pervasive","intrinsically","identity","unavoidable","masculine","femininity","amplify","dictate","perception","assume","counsel","evolve","segment","magnify","invent","impose"].includes(head)) return {id:"core",label:"核心迁移词",reason:"适合结合社会认知与营销影响的议论语境复习。",recommendedReview:true};
    return {id:"recognition",label:"本句识别 · 按需记忆",reason:"先理解当前句，再决定是否加入复习。",recommendedReview:false};
  }
  if (articleId === "2012-p1") {
    const head = entry.headword.toLowerCase(), surface = entry.display.toLowerCase();
    if (homeworkNames.has(head)) return { id: "name", label: "背景专名 · 识别即可", reason: "这里是洛杉矶联合学区的名称或组成部分；识别本文政策制定者即可。", recommendedReview: false };
    if (entry.kind === "phrase") return homeworkStructures.has(surface) ? { id: "structure", label: "必会结构", reason: "这组结构决定政策的对象、条件或建议范围，适合连同本句复习。", recommendedReview: true } : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先理解当前关系，再自行决定是否加入复习。", recommendedReview: false };
    if (homeworkSenses.has(head)) return { id: "sense", label: "熟词语境义", reason: "本篇用法容易与常见名词、动作或数量义混淆，应连同当前来源区分。", recommendedReview: true };
    if (functions.has(head) || ["if", "while", "whether", "because", "no", "none"].includes(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "回到本句辨明指代、条件、否定和从句层级，不用其他篇的关系代替。", recommendedReview: false };
    if (homeworkCore.has(head)) return { id: "core", label: "核心迁移词", reason: "这些词有助于理解政策评价、教育价值与措施，适合结合本句搭配复习。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先读懂当前语境，是否标记由你决定。", recommendedReview: false };
  }
  if (articleId === "2011-p2") return passage2011P2Priority(entry);
  if (articleId === "2011-p1") return passage2011P1Priority(entry);
  if (articleId !== "2010-p1" && articleId !== "2010-p2" && articleId !== "2010-p3" && articleId !== "2010-p4" && articleId !== "2010-p5") return undefined;
  const text2 = articleId === "2010-p2", text3 = articleId === "2010-p3", text4 = articleId === "2010-p4", text5 = articleId === "2010-p5";
  const articleNames = text5 ? text5Names : text4 ? text4Names : text3 ? text3Names : text2 ? text2Names : names;
  const articleSourceNames: Record<string, string[]> = text5 ? text5SourceNames : text4 ? text4SourceNames : text3 ? {} : text2 ? text2SourceNames : sourceNames;
  const articleStructures = text5 ? text5Structures : text4 ? text4Structures : text3 ? text3Structures : text2 ? text2Structures : structures;
  const articleSenses = text5 ? text5Senses : text4 ? text4Senses : text3 ? text3Senses : text2 ? text2Senses : familiar;
  const articleCore = text5 ? text5Core : text4 ? text4Core : text3 ? text3Core : text2 ? text2Core : core;
  const head = entry.headword.toLowerCase(), surface = entry.display.toLowerCase();
  if (articleNames.has(head) || articleSourceNames[sourceId]?.includes(head)) return { id: "name", label: "背景专名 · 识别即可", reason: text5 ? "此处用于公司、机型、专家、地名或机构名称；先识别角色与对应关系，不必单独背专名。" : text4 ? "此处是国名、州名或案件名称的组成；识别历史节点即可，仍可自行标记。" : text3 ? "此处用于研究者、院校、公司或品牌名称；先分清文中的层级，不必单独背专名。" : text2 ? "此处用于人名、地名或书名；识别出处即可，仍可自愿标记。" : "此处用于人名、地名、机构名或拍卖名称；建议不加入单独背词复习，仍可自行标记。", recommendedReview: false };
  if (entry.kind === "phrase") return articleStructures.has(surface) || articleStructures.has((entry.canonicalForm ?? head).toLowerCase())
    ? { id: "structure", label: "必会结构", reason: "重点记完整关系和可接成分，再回到本句确认修饰对象。", recommendedReview: true }
    : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先理解本句组合；是否加入复习由你选择。", recommendedReview: false };
  if (articleSenses.has(head)) return { id: "sense", label: "熟词语境义", reason: "重点区分本句义与最熟悉的基本义，不能把整个词组的意思塞给这个单词。", recommendedReview: true };
  if ((text2 || text3 || text4 || text5 ? text2Functions : functions).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "建议在句法任务中复习它连接或引出的成分，不脱离句子单独背词。", recommendedReview: false };
  if (articleCore.has(head)) return { id: "core", label: "核心迁移词", reason: "适合结合本句用法与关键搭配复习，能帮助理解同类议论文章。", recommendedReview: true };
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先保证读懂当前语境，不必把每张词卡的所有扩展都背下来。", recommendedReview: false };
}
