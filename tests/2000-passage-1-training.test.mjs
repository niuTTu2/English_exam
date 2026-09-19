import assert from "node:assert/strict";
import test, {after} from "node:test";
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
const {passage2000P1Contexts}=await vite.ssrLoadModule("/app/2000-passage-1-contexts.ts");
const {canonicalLemma}=await vite.ssrLoadModule("/app/lexicon.ts");
const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
const m=await vite.ssrLoadModule("/app/learning-model.ts");
const {assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");
const article=articleContents.p1;
const fixture=JSON.parse(readFileSync(new URL("./fixtures/2000-passage-1-source.json",import.meta.url),"utf8"));
const pick=(object,keys)=>Object.fromEntries(keys.map(key=>[key,object[key]]));
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("2000 Text1原卷句序、跨页段落、题干选项与答案稳定",()=>{
  assert.deepEqual(article.sentences.map(s=>pick(s,["id","number","text"])),fixture.sentences);
  assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds),fixture.paragraphs);
  assert.deepEqual(article.questions.map(q=>pick(q,["id","sentenceId","prompt","options","answer"])),fixture.questions);
  assert.deepEqual(article.teachingStatus,{syntax:true,vocabulary:true,evidence:true,practice:true});
});
test("复杂句保留真正边界与不同句法功能，简单句不补造从句",()=>{
  const sentence=n=>article.sentences[n-1];
  const full=sentence(5).beginnerSyntax.clauses.find(c=>c.type==="主语从句");
  assert.ok(full.text.endsWith("as other countries grew richer"));
  assert.deepEqual(sentence(5).beginnerSyntax.clauses.find(c=>c.marker==="as").predicateDetails,[{function:"表语",text:"richer"}]);
  const relatives=sentence(13).beginnerSyntax.clauses.filter(c=>c.marker==="which");
  assert.deepEqual(relatives.map(c=>c.subject),["America","which（semiconductors）"]);
  assert.deepEqual(relatives[0].predicateDetails,[{function:"宾语",text:"which"}]);
  const pieces=sentence(24).beginnerSyntax.components;
  assert.equal(pieces.find(c=>c.text==="proud to be an American").function,"宾语补足语");
  assert.equal(pieces.find(c=>c.text.startsWith("just to see")).function,"后置真正主语");
  assert.equal(pieces.find(c=>c.text.startsWith("Stephen Moore")).children.at(-1).modifies,"the Cato Institute");
  for(const n of [3,6,12,14,19,22])assert.equal(sentence(n).beginnerSyntax.clauses.length,0);
  for(const n of [3,16,23])assert.doesNotMatch(sentence(n).trunk,/\.\.\.|\(were\)/);
});
const decode=text=>text.replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
test("全部提示来自真实SSR入口，真实词形记辅助且无关人名不影响任务",()=>{
  const sources=trainingSources(article);
  for(const s of article.sentences){
    const html=renderToStaticMarkup(React.createElement(StudySentence,{sentence:s,mode:"words",showPhrases:true,isExpanded:false,isMarked:false,note:"",onToggle(){},onMark(){},onTerm(){},onNote(){}}));
    const labels=new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(match=>decode(match[1]).toLowerCase()));
    for(const task of s.practice)for(const label of task.hintWords??[]){
      assert.ok(labels.has(label.toLowerCase()),`${s.id}/${task.id}: ${label}`);
      const affected=m.practiceHintTargets(sources,"word",label,s.id);
      assert.ok(affected.includes(m.taskKey(s.id,task)));
      const session=m.addPracticeHint({id:"current",startedAt:1,lastActiveAt:1,hints:[]},{id:"lookup",type:"word",source:label,at:2,taskKeys:affected});
      const attempt=m.makePracticeAttempt({id:"attempt",articleId:article.id,sentenceId:s.id,task,answer:task.answer,at:3,session});
      assert.equal(attempt.assisted,true);
      assert.equal(m.independentAttempt(attempt),false);
    }
  }
  for(const [id,name]of[["p1-s23","Richard"],["p1-s24","Moore"],["p1-s25","Harvard"]])assert.deepEqual(m.practiceHintTargets(sources,"word",name,id),[]);
  const s13=article.sentences[12];
  assert.ok(!m.practiceHintTargets(sources,"word","invented",s13.id).includes(m.taskKey(s13.id,s13.practice.find(t=>t.id==="forecast-boundary"))));
});
test("正文、题干及各选项词卡按自身来源解析，结构与本句义不串用",()=>{
  const cases=[
    ["p1-s7","themselves",/美国人/],["p1-s13","sat",/处于|位于/],
    ["p1-s13","while",/一段时间/],["p1-s20","while",/而|然而/],
    ["p1-s2","economies",/节约|效益/],["p1-s4","economies",/^经济$/],
    ["p1-s16","business",/经营活动/],["p1-s24","businesses",/^企业$/],
    ["question-11-option-A","made",/作出|付出/],["question-12-option-B","over",/接管/],
    ["question-12-prompt","loss",/^丧失$/],["question-13-option-D","way",/^道路$/],
    ["question-14-option-C","improved",/已改进/],
  ];
  for(const[id,token,meaning]of cases){const entry=resolveEntry(token,false,id);assert.match(entry.contextualMeaning,meaning,`${id}/${token}`);const knowledge=getWordKnowledge(entry.headword,{articleId:"p1",sourceId:id});assert.equal(knowledge.grammarSummary,entry.use);}
  const sources=[...article.sentences,...article.questions.flatMap(q=>[{id:`question-${q.id}-prompt`,text:q.prompt},...q.options.map(o=>({id:`question-${q.id}-option-${o.key}`,text:o.text}))])];
  for(const s of sources){const heads=new Set(tokens(s.text).map(token=>canonicalLemma(token,{articleId:"p1",sourceId:s.id})));
    for(const head of Object.keys(passage2000P1Contexts[s.id]??{}))assert.ok(heads.has(head),`${s.id}/${head}`);
  }
  for(const q of article.questions)for(const analysis of[q.analysis.prompt,...Object.values(q.analysis.options)])for(const phrase of analysis.phrases){assert.ok(analysis.text.includes(phrase));assert.ok(getPhraseKnowledge(phrase));}
  const name=resolveEntry("Richard",false,"p1-s23");assert.equal(vocabularyPriority(name,"p1-s23","p1").recommendedReview,false);
});
test("多证据定位能接受声明路径，拒绝全文与缺少作者评价的归属捷径",()=>{
  const passageIds=article.sentences.map(s=>s.id);
  for(const q of article.questions){for(const path of q.reasoning.locationPolicy.paths){const r={...q.reasoning,locationPolicy:{revision:1,paths:[path]}};assert.equal(assessLocation(r,{scope:r.scope,sentenceIds:path.groups.map(g=>g[0])},passageIds).passed,true);}
    assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:passageIds},passageIds).passed,false);
  }
  const q=article.questions.find(q=>q.id===14);assert.equal(assessLocation(q.reasoning,{scope:"paragraph",sentenceIds:["p1-s23","p1-s24","p1-s25"]},passageIds).passed,false);
});
