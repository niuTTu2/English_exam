import type {VocabEntry} from "./data";
import type {VocabularyPriority} from "./vocabulary-priority";
const core=new Set("mortality maturity survive survival excess crucial mate variation gene evolution evolutionary fertile offspring diminish opportunity mediocrity tribe tribal comprehension descendant defective selection poverty wealth".split(" "));
const senses=new Set("being universal mean agent average power work look offer over fill place age change".split(" "));
const functional=new Set("be have do will may it they we our its his this that those which what when however as since because for of to in on at among between from than but and or no not few fewer most roughly almost little same twice".split(" "));
const names=new Set(["darwin","india","utopia"]);
export function passage2000P2Priority(entry:Pick<VocabEntry,"headword"|"display"|"kind"|"canonicalForm">):VocabularyPriority{
 const head=entry.headword.toLowerCase();
 if(names.has(head))return{id:"name",label:"背景名称 · 识别即可",reason:"识别人名、例证国家或理想社会标签，服务文章理解；可按个人需要标记。",recommendedReview:false};
 if(entry.kind==="phrase")return{id:"structure",label:"关键组合 · 连句复习",reason:"辨认本句的比较、指代、非谓语或补足关系，再迁移到同类句。",recommendedReview:true};
 if(senses.has(head))return{id:"sense",label:"熟词语境义",reason:"结合本句词性和结构区分义项，避免只记常见词义。",recommendedReview:true};
 if(functional.has(head))return{id:"function",label:"功能词 · 看句法作用",reason:"关注本句的时间、数量、连接和指代范围。",recommendedReview:false};
 if(core.has(head))return{id:"core",label:"核心迁移词",reason:"结合自然选择、存活与生育主题学习，可迁移到科学议论文。",recommendedReview:true};
 return{id:"recognition",label:"本句识别 · 按需记忆",reason:"先读懂当前句的词义与位置，按个人需要加入复习。",recommendedReview:false};
}
