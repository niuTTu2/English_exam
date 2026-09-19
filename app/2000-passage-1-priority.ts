import type { VocabEntry } from "./data";
import type { VocabularyPriority } from "./vocabulary-priority";
const core = new Set("handicap primacy predominance inevitable competitiveness shrink vanish casualty prosperity inquiry decline confidence attribute solely productivity revival manifest cooperation impetus".split(" "));
const senses = new Set("prove look sit make economy business yield loss face rope diet".split(" "));
const functional = new Set("be have can may should will it they themselves their its this that whose which as while when if but and or to of in on at by from for than just few most only there none".split(" "));
const names = new Set("zenith lg korea japan richard cavanaugh harvard kennedy stephen moore cato washington dc william sahlman".split(" "));
const namesAt: Record<string,string[]> = { "p1-s23": ["school", "government"], "p1-s24": ["institute"], "p1-s25": ["school"] };
const structures = new Set(["if properly handled", "giving its industries unparalleled economies of scale", "whose economies the war had destroyed", "It was inevitable that", "as other countries grew richer", "proved painful", "found themselves at a loss over", "had shrunk or vanished", "in the face of foreign competition", "it looked as though", "sat at the heart of", "stopped taking prosperity for granted", "one inquiry after another", "look back on", "attribute this solely to", "yielded to blind pride", "has gone on a diet", "makes me proud to be an American", "look back on this period as"].map(x=>x.toLowerCase()));
export function passage2000P1Priority(entry: Pick<VocabEntry,"headword"|"display"|"kind"|"canonicalForm">, sourceId: string): VocabularyPriority {
  const head=entry.headword.toLowerCase();
  if(names.has(head)||namesAt[sourceId]?.includes(head))return {id:"name",label:"背景专名 · 识别即可",reason:"用于人物、机构或地点身份，识别观点来源即可；仍可自愿标记。",recommendedReview:false};
  if(entry.kind==="phrase")return structures.has(entry.display.toLowerCase())?{id:"structure",label:"必会结构",reason:"按整体关系复习，再辨认本句的主语、补足对象或修饰范围。",recommendedReview:true}:{id:"recognition",label:"本句表达 · 按需记忆",reason:"先理解本句组合；是否加入复习由你选择。",recommendedReview:false};
  if(senses.has(head))return {id:"sense",label:"熟词语境义",reason:"关注本句词性与义项，区分同词在其他结构中的用法。",recommendedReview:true};
  if(functional.has(head))return {id:"function",label:"功能词 · 看句法作用",reason:"回到句子练习连接、指代、时态和范围，不只记孤立中文词义。",recommendedReview:false};
  if(core.has(head))return {id:"core",label:"核心迁移词",reason:"适合结合经济议论文语境及关键搭配复习。",recommendedReview:true};
  return {id:"recognition",label:"本句识别 · 按需记忆",reason:"先保证读懂当前语境，按个人需要加入复习。",recommendedReview:false};
}
