import { passage2011P1Priority } from "./2011-passage-1-priority";
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
/** 编辑建议按本篇语境给出；不是官方考试词频排名，也不改变词义。 */
export function vocabularyPriority(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm">, sourceId: string, articleId?: string): VocabularyPriority | undefined {
  if (articleId === "2012-p1") {
    const head = entry.headword.toLowerCase(), surface = entry.display.toLowerCase();
    if (homeworkNames.has(head)) return { id: "name", label: "背景专名 · 识别即可", reason: "这里是洛杉矶联合学区的名称或组成部分；识别本文政策制定者即可。", recommendedReview: false };
    if (entry.kind === "phrase") return homeworkStructures.has(surface) ? { id: "structure", label: "必会结构", reason: "这组结构决定政策的对象、条件或建议范围，适合连同本句复习。", recommendedReview: true } : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先理解当前关系，再自行决定是否加入复习。", recommendedReview: false };
    if (homeworkSenses.has(head)) return { id: "sense", label: "熟词语境义", reason: "本篇用法容易与常见名词、动作或数量义混淆，应连同当前来源区分。", recommendedReview: true };
    if (functions.has(head) || ["if", "while", "whether", "because", "no", "none"].includes(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "回到本句辨明指代、条件、否定和从句层级，不用其他篇的关系代替。", recommendedReview: false };
    if (homeworkCore.has(head)) return { id: "core", label: "核心迁移词", reason: "这些词有助于理解政策评价、教育价值与措施，适合结合本句搭配复习。", recommendedReview: true };
    return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先读懂当前语境，是否标记由你决定。", recommendedReview: false };
  }
  if (articleId === "2011-p1") return passage2011P1Priority(entry);
  if (articleId !== "2010-p1" && articleId !== "2010-p2" && articleId !== "2010-p3") return undefined;
  const text2 = articleId === "2010-p2", text3 = articleId === "2010-p3";
  const articleNames = text3 ? text3Names : text2 ? text2Names : names;
  const articleSourceNames: Record<string, string[]> = text3 ? {} : text2 ? text2SourceNames : sourceNames;
  const articleStructures = text3 ? text3Structures : text2 ? text2Structures : structures;
  const articleSenses = text3 ? text3Senses : text2 ? text2Senses : familiar;
  const articleCore = text3 ? text3Core : text2 ? text2Core : core;
  const head = entry.headword.toLowerCase(), surface = entry.display.toLowerCase();
  if (articleNames.has(head) || articleSourceNames[sourceId]?.includes(head)) return { id: "name", label: "背景专名 · 识别即可", reason: text3 ? "此处用于研究者、院校、公司或品牌名称；先分清文中的层级，不必单独背专名。" : text2 ? "此处用于人名、地名或书名；识别出处即可，仍可自愿标记。" : "此处用于人名、地名、机构名或拍卖名称；建议不加入单独背词复习，仍可自行标记。", recommendedReview: false };
  if (entry.kind === "phrase") return articleStructures.has(surface) || articleStructures.has((entry.canonicalForm ?? head).toLowerCase())
    ? { id: "structure", label: "必会结构", reason: "重点记完整关系和可接成分，再回到本句确认修饰对象。", recommendedReview: true }
    : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先理解本句组合；是否加入复习由你选择。", recommendedReview: false };
  if (articleSenses.has(head)) return { id: "sense", label: "熟词语境义", reason: "重点区分本句义与最熟悉的基本义，不能把整个词组的意思塞给这个单词。", recommendedReview: true };
  if ((text2 || text3 ? text2Functions : functions).has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "建议在句法任务中复习它连接或引出的成分，不脱离句子单独背词。", recommendedReview: false };
  if (articleCore.has(head)) return { id: "core", label: "核心迁移词", reason: "适合结合本句用法与关键搭配复习，能帮助理解同类议论文章。", recommendedReview: true };
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先保证读懂当前语境，不必把每张词卡的所有扩展都背下来。", recommendedReview: false };
}
