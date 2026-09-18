import type { VocabEntry } from './data';
import type { VocabularyPriority } from './vocabulary-priority';
const core=new Set('director independence reputation compensation criticism proposal probability likelihood correlation incentive wrongdoing critical suggestive subsequent biased adviser executive departure restate fulfill'.split(' '));
const senses=new Set('board weather stock firm break decline name trade position rest share offer work mean time'.split(' '));
const names=new Set('ruth simmons goldman sachs brown ohio january february'.split(' '));
const functional=new Set('as that who what which by on in of to for but and not any it they she her their after before with than from if although otherwise through without may can should will have be do'.split(' '));
export function passage2011P1Priority(entry:Pick<VocabEntry,'headword'|'display'|'kind'|'canonicalForm'>):VocabularyPriority{
 const head=entry.headword.toLowerCase();
 if(names.has(head))return{id:'name',label:'背景专名 · 识别即可',reason:'用于人物、机构或时间定位；不必当普通核心词背，仍可自愿标记。',recommendedReview:false};
 if(entry.kind==='phrase')return{id:'structure',label:'必会结构',reason:'联系本句记清职责、概率、去向或条件关系，再迁移到同类公司议题。',recommendedReview:true};
 if(senses.has(head))return{id:'sense',label:'熟词语境义',reason:'区分公司治理语境中的实际义项与常见字面义，按当前句子记忆。',recommendedReview:true};
 if(functional.has(head))return{id:'function',label:'功能词 · 看句法作用',reason:'结合嵌套从句、修饰关系和时间任务复习，不脱离本句猜作用。',recommendedReview:false};
 if(core.has(head))return{id:'core',label:'核心迁移词',reason:'有助于阅读公司治理、研究结果及作者态度类文章。',recommendedReview:true};
 return{id:'recognition',label:'本句识别 · 按需记忆',reason:'先读懂本句；是否加入复习由你选择。',recommendedReview:false};
}
