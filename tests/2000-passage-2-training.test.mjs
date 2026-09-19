import assert from "node:assert/strict";
import test,{after} from "node:test";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {createServer} from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const {StudySentence,resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
const {getWordKnowledge,getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
const {vocabularyPriority}=await vite.ssrLoadModule("/app/vocabulary-priority.ts");
const {passage2000P2Contexts}=await vite.ssrLoadModule("/app/2000-passage-2-contexts.ts");
const {canonicalLemma}=await vite.ssrLoadModule("/app/lexicon.ts");
const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
const m=await vite.ssrLoadModule("/app/learning-model.ts");
const {assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");
const article=articleContents.p2;
const fixture=JSON.parse(readFileSync(new URL("./fixtures/2000-passage-2-source.json",import.meta.url),"utf8"));
const pick=(object,keys)=>Object.fromEntries(keys.map(key=>[key,object[key]]));
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("2000 Text2保持原卷27句、3段、15—18题与C/B/A/D答案",()=>{
 assert.deepEqual(article.sentences.map(s=>pick(s,["id","number","text"])),fixture.sentences);
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds),fixture.paragraphs);
 assert.deepEqual(article.questions.map(q=>pick(q,["id","sentenceId","prompt","options","answer"])),fixture.questions);
 assert.deepEqual(article.teachingStatus,{syntax:true,vocabulary:true,evidence:true,practice:true});
});
test("复杂句明确非谓语执行者、并列主语、独立主格与嵌套边界",()=>{
 const s=n=>article.sentences[n-1];
 assert.equal(s(7).beginnerSyntax.components[1].children[0].children[0].function,"动名词逻辑主语");
 assert.equal(s(7).beginnerSyntax.components[2].text,"depended");
 assert.equal(s(16).beginnerSyntax.components[1].children.length,2);
 assert.equal(s(19).beginnerSyntax.components[1].children[0].text,"everyone");
 assert.deepEqual(s(19).beginnerSyntax.clauses[0].predicateDetails,[{function:"宾语",text:"80% of its power"}]);
 assert.equal(s(25).beginnerSyntax.clauses[0].subject,"a savage");
 assert.match(getPhraseKnowledge("look at an organic being as a savage looks at a ship").canonical,/subject/);
 assert.equal(s(27).beginnerSyntax.clauses[1].subject,"we");
 assert.deepEqual(s(27).beginnerSyntax.clauses[1].predicateDetails,[{function:"前置表语",text:"how far from Utopia"}]);
 assert.equal(s(20).beginnerSyntax.clauses[0].text,"that evolution is over");
 assert.doesNotMatch(s(20).natural,/似乎/);
 assert.match(s(26).natural,/我们/);assert.doesNotMatch(s(26).natural,/后人/);
 for(const n of[1,2,3,6,7,8,9,11,12,13,14,15,16,18,21,22,23,26])assert.equal(s(n).beginnerSyntax.clauses.length,0);
 for(const n of[2,16,19,23,25,27])assert.doesNotMatch(s(n).trunk,/\.\.\.|\(been transformed\)/);
 assert.equal(s(25).trunk,"Darwin had a phrase; they look at an organic being as a savage looks at a ship.");
 const q17=article.questions.find(q=>q.id===17).analysis.prompt;
 assert.equal(q17.beginnerSyntax.clauses[0].text,"that our bodies have stopped evolving because");
});
const decode=text=>text.replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
test("正文全部词形和词组提示是实际SSR入口，无关专名不污染任务",()=>{
 const sources=trainingSources(article);
 for(const s of article.sentences){
  const html=renderToStaticMarkup(React.createElement(StudySentence,{sentence:s,mode:"words",showPhrases:true,isExpanded:false,isMarked:false,note:"",onToggle(){},onMark(){},onTerm(){},onNote(){}}));
  const labels=new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(match=>decode(match[1]).toLowerCase()));
  for(const task of s.practice)for(const label of task.hintWords??[]){
   assert.ok(labels.has(label.toLowerCase()),`${s.id}/${task.id}: ${label}`);
   const affected=m.practiceHintTargets(sources,"word",label,s.id);
   assert.ok(affected.includes(m.taskKey(s.id,task)));
   const session=m.addPracticeHint({id:"current",startedAt:1,lastActiveAt:1,hints:[]},{id:"lookup",type:"word",source:label,at:2,taskKeys:affected});
   assert.equal(m.independentAttempt(m.makePracticeAttempt({id:"attempt",articleId:article.id,sentenceId:s.id,task,answer:task.answer,at:3,session})),false);
  }
 }
 for(const[id,term]of[["p2-s19","India"],["p2-s25","Darwin"],["p2-s27","Utopia"]])assert.deepEqual(m.practiceHintTargets(sources,"word",term,id),[]);
 const s19=article.sentences[18];const absolute=s19.practice.find(t=>t.id==="absolute-explanation");
 assert.ok(!m.practiceHintTargets(sources,"word","power",s19.id).includes(m.taskKey(s19.id,absolute)));
});
test("题目与正文词卡保留自己的词性、意义与结构，全部新语境对应实际原形",()=>{
 const cases=[["p2-s1","Being",/作为/],["p2-s3","being",/被动/],["p2-s19","being",/是/],["p2-s25","being",/生物/],["p2-s2","age",/^年龄$/],["p2-s5","means",/意味着/],["p2-s9","makes",/产生/],["p2-s14","births",/生育/],["p2-s16","between",/之间/],["p2-s18","peoples",/民族/],["p2-s20","over",/结束/],["p2-s27","look",/看起来/],["question-16-option-A","wealthy",/富裕/],["question-16-option-C","that",/人口/],["question-17-prompt","evolving",/进化/],["question-17-option-B","declining",/下降/],["question-18-option-B","Man’s",/^人类$/],["question-18-option-D","Going",/发展/]];
 for(const[id,token,meaning]of cases){const entry=resolveEntry(token,false,id);assert.match(entry.contextualMeaning,meaning,`${id}/${token}`);const knowledge=getWordKnowledge(entry.headword,{articleId:"p2",sourceId:id});assert.equal(knowledge.grammarSummary,entry.use);}
 assert.equal(canonicalLemma("people",{articleId:"p2",sourceId:"p2-s18"}),"people");
 assert.equal(canonicalLemma("people",{articleId:"p2",sourceId:"p2-s16"}),"person");
 assert.doesNotMatch(resolveEntry("wealthy",false,"question-16-option-A").use,/正确选项/);
 assert.match(resolveEntry("means",false,"p2-s5").partOfSpeech,/v\./);
 assert.match(resolveEntry("evolving",false,"question-17-prompt").partOfSpeech,/gerund/);
 const all=[...article.sentences,...article.questions.flatMap(q=>[{id:`question-${q.id}-prompt`,text:q.prompt},...q.options.map(o=>({id:`question-${q.id}-option-${o.key}`,text:o.text}))])];
 for(const source of all){const heads=new Set(tokens(source.text).map(token=>canonicalLemma(token,{articleId:"p2",sourceId:source.id})));for(const head of Object.keys(passage2000P2Contexts[source.id]??{}))assert.ok(heads.has(head),`${source.id}/${head}`);}
 for(const q of article.questions)for(const analysis of[q.analysis.prompt,...Object.values(q.analysis.options)])for(const phrase of analysis.phrases){assert.ok(analysis.text.toLowerCase().includes(phrase.toLowerCase()));assert.ok(getPhraseKnowledge(phrase));}
 assert.equal(vocabularyPriority(resolveEntry("Darwin",false,"p2-s25"),"p2-s25","p2").recommendedReview,false);
});
test("证据定位接受各条声明路径，拒绝全文与统计对象被偷换的捷径",()=>{
 const all=article.sentences.map(s=>s.id);
 for(const q of article.questions){for(const path of q.reasoning.locationPolicy.paths){const r={...q.reasoning,locationPolicy:{revision:1,paths:[path]}};assert.equal(assessLocation(r,{scope:r.scope,sentenceIds:path.groups.map(g=>g[0])},all).passed,true);}assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:all},all).passed,false);}
 const india=article.questions.find(q=>q.id===16);
 assert.equal(assessLocation(india.reasoning,{scope:"paragraph",sentenceIds:["p2-s18"]},all).passed,false);
 assert.match(india.reasoning.paraphrases[0].limit,/中上阶层.*部落/);
 assert.match(india.reasoning.wordingNotes[0].explanation,/最佳概括/);
 const title=article.questions.find(q=>q.id===18);
 assert.equal(assessLocation(title.reasoning,{scope:"whole-passage",sentenceIds:["p2-s2","p2-s4","p2-s5"]},all).passed,false);
});
