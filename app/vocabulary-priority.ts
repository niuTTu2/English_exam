import type { VocabEntry } from "./data";
export type VocabularyPriority = { id: "core" | "sense" | "structure" | "function" | "recognition" | "name"; label: string; reason: string; defaultReview: boolean };
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
/** 编辑建议按本篇语境给出；不是官方考试词频排名，也不改变词义。 */
export function vocabularyPriority(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm">, sourceId: string, articleId?: string): VocabularyPriority | undefined {
  if (articleId !== "2010-p1") return undefined;
  const head = entry.headword.toLowerCase(), surface = entry.display.toLowerCase();
  if (names.has(head) || sourceNames[sourceId]?.includes(head)) return { id: "name", label: "背景专名 · 识别即可", reason: "此处用于人名、地名、机构名或拍卖名称；默认不安排背诵，仍可自行标记。", defaultReview: false };
  if (entry.kind === "phrase") return structures.has(surface) || structures.has((entry.canonicalForm ?? head).toLowerCase())
    ? { id: "structure", label: "必会结构", reason: "重点记完整关系和可接成分，再回到本句确认修饰对象。", defaultReview: true }
    : { id: "recognition", label: "本句表达 · 按需记忆", reason: "先理解本句组合；是否加入复习由你选择。", defaultReview: false };
  if (familiar.has(head)) return { id: "sense", label: "熟词语境义", reason: "重点区分本句义与最熟悉的基本义，不能把整个词组的意思塞给这个单词。", defaultReview: true };
  if (functions.has(head)) return { id: "function", label: "功能词 · 看句法作用", reason: "先看它连接或引出什么成分，再记当前语境的作用。", defaultReview: true };
  if (core.has(head)) return { id: "core", label: "核心迁移词", reason: "适合结合本句用法与关键搭配复习，能帮助理解同类议论文章。", defaultReview: true };
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先保证读懂当前语境，不必把每张词卡的所有扩展都背下来。", defaultReview: false };
}
