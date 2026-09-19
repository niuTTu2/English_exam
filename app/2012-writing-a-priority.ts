import type { VocabEntry } from "./data";
import type { VocabularyPriority } from "./vocabulary-priority";
export function writing2012APriority(entry: Pick<VocabEntry,"headword"|"display"|"kind"|"canonicalForm">): VocabularyPriority {
  const head=entry.headword.toLowerCase();
  if(["zhang","wei"].includes(head))return {id:"name",label:"指定署名 · 识别即可",reason:"保留题目要求的姓名拼写，分清它与客服收件对象。",recommendedReview:false};
  if(entry.kind==="phrase")return {id:"structure",label:"投诉邮件常用结构",reason:"结合问题说明、投诉目的与解决要求学习完整关系。",recommendedReview:true};
  if(["prompt","find","store","make","address","point","about","other"].includes(head))return {id:"sense",label:"审题关键义",reason:"回到实际指令分清及时、发现、商店、时间、格式与分值等义项。",recommendedReview:true};
  if(["a","an","the","with","that","from","to","and","on","at","of","you","your","do","not","have","should","instead"].includes(head))return {id:"function",label:"功能词 · 回到指令",reason:"结合本句确认关系从句、目的、位置和禁止要求。",recommendedReview:false};
  if(["suppose","electronic","dictionary","buy","email","customer","service","complaint","complain","demand","solution","wrong","write"].includes(head))return {id:"core",label:"投诉写作迁移词",reason:"可迁移到商品问题与沟通解决类书信，复习时带上对象和搭配。",recommendedReview:true};
  return {id:"recognition",label:"本句识别 · 按需记忆",reason:"先读清当前要求，再决定是否复习扩展。",recommendedReview:false};
}
