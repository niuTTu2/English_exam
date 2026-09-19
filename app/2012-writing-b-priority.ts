import type { VocabEntry } from "./data";
import type { VocabularyPriority } from "./vocabulary-priority";
export function writing2012BPriority(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm">): VocabularyPriority {
  const head = entry.headword.toLowerCase();
  if (entry.kind === "phrase") return { id: "structure", label: "表格写作结构", reason: "把依据、评论或数量限定作为完整表达学习，并确认适用关系。", recommendedReview: true };
  if (["base", "following", "writing", "give", "least", "point"].includes(head)) return { id: "sense", label: "审题关键义", reason: "先分清分词、名词写作内容、最低要求及分值，避免混用体裁和数量条件。", recommendedReview: true };
  if (["an", "the", "on", "in", "at", "your", "you", "should", "and"].includes(head)) return { id: "function", label: "功能词 · 回到指令", reason: "结合当前要求辨认依据、位置、范围和并列关系。", recommendedReview: false };
  if (["write", "essay", "describe", "table", "comment", "word"].includes(head)) return { id: "core", label: "表格作文常用词", reason: "连同表格解读与评论任务学习用法，再迁移到其他表格作文。", recommendedReview: true };
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先理解当前指令，再决定是否复习扩展。", recommendedReview: false };
}
