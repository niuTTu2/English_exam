import type {VocabEntry} from './data';
import type {VocabularyPriority} from './vocabulary-priority';
const core=new Set('restraint confidence efficient efficiency stimulus exert influence elegance abundance sophisticated proportion equivalent aesthetic inevitable self-sufficiency infer reliance'.split(' '));
const senses=new Set('course signature employ mask view modest abstract commission afford impact less more post drive story'.split(' '));
const names=new Set('mies ludwig van der rohe bauhaus frank lloyd wright ralph rapson chicago lake shore gold coast california g i ii german united state 1940s 1930s 1890s twentieth'.split(' '));
const functional=new Set('as that who what which by on in of to for but and not it they their his with from though yet so than have be can may will none these both less more'.split(' '));
export function passage2011P3Priority(entry:Pick<VocabEntry,'headword'|'display'|'kind'|'canonicalForm'>):VocabularyPriority{
 const head=entry.headword.toLowerCase();
 if(names.has(head))return{id:'name',label:'背景专名 · 识别即可',reason:'识别人名、学校、地区和年代，以便追踪设计理念的来源与传播。',recommendedReview:false};
 if(entry.kind==='phrase')return{id:'structure',label:'必会结构',reason:'结合比较对象、否定范围和委托关系复习，再迁移到同类观点说明文章。',recommendedReview:true};
 if(senses.has(head))return{id:'sense',label:'熟词语境义',reason:'辨认建筑设计语境中的具体义项，联系本句完整搭配记忆。',recommendedReview:true};
 if(functional.has(head))return{id:'function',label:'功能词 · 看句法作用',reason:'结合从句、指代和比较任务理解当前作用，不脱离句子背单一译法。',recommendedReview:false};
 if(core.has(head))return{id:'core',label:'核心迁移词',reason:'适用于设计、历史影响和观点推断等阅读主题，建议结合本句复习。',recommendedReview:true};
 return{id:'recognition',label:'本句识别 · 按需记忆',reason:'先读懂本句，再按自己的掌握情况决定是否加入复习。',recommendedReview:false};
}
