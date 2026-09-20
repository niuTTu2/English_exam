import type { ArticleContent } from "./data";
import { passage2013P2Sentences, passage2013P2Paragraphs, passage2013P2Guide } from "./2013-passage-2-reading";
import { passage2013P2Questions } from "./2013-passage-2-questions";
export { passage2013P2Sentences, passage2013P2Questions };
export const passage2013P2Article:ArticleContent={
 id:"2013-p2",year:2013,sectionId:"p2",label:"阅读 Text 2",badge:"2013 · 英语二 · Text 2",title:"2013 英语二 · Text 2",description:"原卷5段22句，26—30题。先独立做题，再快速读懂、分析错因与学习词汇。",kind:"reading",experienceVersion:2,
 sentences:passage2013P2Sentences,questions:passage2013P2Questions,paragraphs:passage2013P2Paragraphs,guide:passage2013P2Guide,
 vocabularyFocus:[
 ...[[1,"immigrants"],[2,"permanent"],[6,"rigid"],[7,"categories"],[9,"framework"],[10,"change"],[13,"challenges"],[15,"participants"],[16,"opportunity"],[19,"productive"],[21,"Accommodating"],[22,"multiple"]].map(([n,expression])=>({sourceId:`2013-p2-s${n}`,expression:String(expression),kind:"word" as const,categories:["core" as const]})),
 ...[[8,"hail"],[8,"brand"],[9,"paralysis"],[15,"driven"],[18,"straddle"],[22,"means"]].map(([n,expression])=>({sourceId:`2013-p2-s${n}`,expression:String(expression),kind:"word" as const,categories:["sense" as const]})),
 ...passage2013P2Sentences.flatMap(s=>s.phrases.map(expression=>({sourceId:s.id,expression,kind:"phrase" as const,categories:["collocation" as const]}))),
 ...[[201326,"A","temporarily"],[201327,"C","adapted"],[201328,"C","freedom"],[201329,"B","tolerance"],[201330,"D","Mistake"]].map(([questionId,key,expression])=>({sourceId:`question-${questionId}-option-${key}`,expression:String(expression),kind:"word" as const,categories:["paraphrase" as const],questionLink:{questionId:Number(questionId),paraphraseIndex:0}})),
 ...[[1,"sojourners"],[1,"Atlantic"],[4,"Italy"],[5,"uccelli"],[5,"di"],[5,"passaggio"],[14,"violinists"],[18,"jurisdictions"]].map(([n,expression])=>({sourceId:`2013-p2-s${n}`,expression:String(expression),kind:"word" as const,categories:["recognition" as const]})),
 ],
};
