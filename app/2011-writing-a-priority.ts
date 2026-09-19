import type { VocabEntry } from "./data";
import type { VocabularyPriority } from "./vocabulary-priority";

export function writing2011APriority(entry: Pick<VocabEntry, "headword" | "display" | "kind" | "canonicalForm">): VocabularyPriority {
  const head = entry.headword.toLowerCase();
  if (["li", "ming", "zhang", "wei"].includes(head)) return { id: "name", label: "题设姓名 · 分清角色", reason: "分清收信人与规定署名；保留原拼写，无需作为普通词汇背诵。", recommendedReview: false };
  if (entry.kind === "phrase") return { id: "structure", label: "写作常用结构", reason: "结合祝贺、建议与格式要求学习完整搭配，写作时再确认对象和语气。", recommendedReview: true };
  if (["address", "sign", "prepare", "about", "point"].includes(head)) return { id: "sense", label: "审题关键义", reason: "这些词关系到准备状态、字数、格式与分值，先读准当前指令。", recommendedReview: true };
  if (["a", "the", "to", "on", "for", "at", "of", "and", "not", "do", "have", "be", "should", "your", "you", "him", "her", "instead"].includes(head)) return { id: "function", label: "功能词 · 回到指令", reason: "结合当前句辨认对象、目的、禁止要求与指代，不孤立背所有义项。", recommendedReview: false };
  if (["suppose", "admit", "congratulate", "suggestion", "write", "letter"].includes(head)) return { id: "core", label: "书信迁移词", reason: "可用于设定情境、祝贺和提出建议，适合连同自然搭配复习。", recommendedReview: true };
  return { id: "recognition", label: "本句识别 · 按需记忆", reason: "先读懂题目要求，再决定是否单独复习。", recommendedReview: false };
}
