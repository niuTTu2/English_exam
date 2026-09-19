import type { VocabEntry } from './data';
import type { VocabularyPriority } from './vocabulary-priority';
const core=new Set('recession revenue reliance distinctive distinctiveness completeness subsidize subsidy margin survive survival threaten dependent crisis crucial concentrate'.split(' '));
const senses=new Set('paper chronicle nerve delivery virtue industry state profit business go cut balanced complete'.split(' '));
const names=new Set('san francisco america american german brazilian japan japanese oecd'.split(' '));
const functional=new Set('as that what which by on in of to for but and not it they their with from where yet since so should will have be can'.split(' '));
export function passage2011P2Priority(entry:Pick<VocabEntry,'headword'|'display'|'kind'|'canonicalForm'>):VocabularyPriority{
 const head=entry.headword.toLowerCase();
 if(names.has(head))return{id:'name',label:'背景专名 · 识别即可',reason:'用于人物、机构或时间定位；不必当普通核心词背，仍可自愿标记。',recommendedReview:false};
 if(entry.kind==='phrase')return{id:'structure',label:'必会结构',reason:'联系本句记清比较、收入来源、时间或省略关系，再迁移到同类行业经营议题。',recommendedReview:true};
 if(senses.has(head))return{id:'sense',label:'熟词语境义',reason:'区分报业经营语境中的实际义项与常见字面义，按当前句子记忆。',recommendedReview:true};
 if(functional.has(head))return{id:'function',label:'功能词 · 看句法作用',reason:'结合定语从句、比较范围和时间任务复习，不脱离本句猜作用。',recommendedReview:false};
 if(core.has(head))return{id:'core',label:'核心迁移词',reason:'有助于阅读行业转型、因果推断及标题概括类文章。',recommendedReview:true};
 return{id:'recognition',label:'本句识别 · 按需记忆',reason:'先读懂本句；是否加入复习由你选择。',recommendedReview:false};
}
