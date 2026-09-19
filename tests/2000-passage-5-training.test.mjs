import assert from "node:assert/strict";
import test,{after} from "node:test";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {createServer} from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const {resolveEntry,StudySentence}=await vite.ssrLoadModule("/app/study-app.tsx");
const {getWordKnowledge,getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
const {practiceHintTargets,taskKey}=await vite.ssrLoadModule("/app/learning-model.ts");
const {assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");
const article=articleContents.p5,s=n=>article.sentences[n-1],q=n=>article.questions.find(q=>q.id===n),card=(w,id)=>resolveEntry(w,false,id);
const fixture=JSON.parse(readFileSync(new URL("fixtures/2000-passage-5-source.json",import.meta.url),"utf8"));
const decode=t=>t.replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
test("Text5保留原卷15句三段、27—30题和双引号，时间异常不擅改",()=>{
 assert.deepEqual(article.sentences.map(({id,text})=>({id,text})),fixture.sentences);
 assert.deepEqual(article.questions.map(({id,prompt,options,answer})=>({id,prompt,options,answer})),fixture.questions);
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds.map(id=>Number(id.replace("p5-s","")))),[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]);
 assert.match(s(7).text,/a decade or two years ago/);assert.match(s(7).natural,/疑点/);assert.match(s(7).literal,/疑点/);
 assert.match(getPhraseKnowledge("a decade or two years ago").summary,/疑点/);assert.match(card("two","p5-s7").use,/无法确认/);
 assert.ok(s(10).text.includes("“Succeed")&&s(10).text.endsWith("ambitious.”"));
 assert.equal(article.sentences.reduce((n,s)=>n+s.practice.length,0),27);assert.equal(article.guide.practice.length,3);
});
test("有限谓语、嵌套从句、非谓语和否定范围按实际语义重拆",()=>{
 assert.equal(s(3).beginnerSyntax.clauses[0].predicate,"have claimed");assert.match(s(3).beginnerSyntax.clauses[0].predicateDetails[0].text,/to have given up/);
 assert.deepEqual(s(4).beginnerSyntax.clauses.map(c=>c.type),["主语从句","表语从句"]);
 assert.equal(s(9).trunk,"we are treated to fine hypocritical spectacles");assert.deepEqual(s(9).beginnerSyntax.clauses.map(c=>c.marker),["which","who","whose"]);
 assert.deepEqual(s(9).beginnerSyntax.clauses[1].predicateDetails,[{function:"宾语",text:"his meals"}]);
 assert.match(s(11).beginnerSyntax.clauses[0].type,/情境/);assert.match(s(11).natural,/不至于/);
 assert.equal(s(13).beginnerSyntax.clauses.length,3);assert.match(s(13).natural,/较少/);assert.doesNotMatch(s(13).natural,/不再公开承认/);
 assert.equal(s(14).beginnerSyntax.clauses[0].subject,"some of which");assert.equal(s(14).beginnerSyntax.clauses[1].type,"表语从句");
 assert.equal(s(15).beginnerSyntax.components[0].function,"前置表语");assert.match(s(15).beginnerSyntax.components[3].function,/主语/);
 assert.equal(q(28).analysis.options.B.textKind,"phrase");assert.equal(q(28).analysis.options.B.beginnerSyntax.clauses[0].marker,"once");
 assert.equal(q(30).analysis.prompt.beginnerSyntax.clauses[0].type,"同位语从句");assert.ok(Object.values(q(30).analysis.options).every(o=>o.textKind==="phrase"&&o.beginnerSyntax.clauses.length===0));
});
test("讽刺口号不当作者建议，评价主体与末段方向保留证据边界",()=>{
 assert.match(article.guide.voices.find(v=>v.speaker==="被讽刺人物的行为逻辑").boundary,/并非作者/);
 assert.match(q(28).reasoning.paraphrases[0].limit,/受益后否认/);assert.match(q(29).explanations.A,/被别人评价/);
 assert.match(q(30).reasoning.paraphrases[0].limit,/推断/);assert.equal(q(30).answer,"B");
 const ids=article.sentences.map(s=>s.id),r=q(30).reasoning;
 assert.equal(assessLocation(r,{scope:r.scope,sentenceIds:["p5-s12","p5-s13","p5-s15"]},ids).passed,true);
 assert.equal(assessLocation(r,{scope:r.scope,sentenceIds:["p5-s10"]},ids).passed,false);
 assert.equal(assessLocation(r,{scope:r.scope,sentenceIds:ids.slice(10)},ids).passed,false);
});
test("27任务提示均来自实际SSR入口，答案依赖有向且不扩散",()=>{
 for(const item of article.sentences){const html=renderToStaticMarkup(React.createElement(StudySentence,{sentence:item,mode:"words",showPhrases:true,isExpanded:false,isMarked:false,note:"",onToggle(){},onMark(){},onTerm(){},onNote(){}}));const labels=new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(m=>decode(m[1]).toLowerCase()));for(const t of item.practice)for(const hint of t.hintWords??[])assert.ok(labels.has(hint.toLowerCase()),`${item.id}/${t.id}: ${hint}`);}
 const sources=trainingSources(article),a=s(8).practice[0],b=s(8).practice[1];
 assert.ok(practiceHintTargets(sources,"previous-answer",a.id,s(8).id,a).includes(taskKey(s(8).id,b)));
 assert.ok(!practiceHintTargets(sources,"previous-answer",b.id,s(8).id,b).includes(taskKey(s(8).id,a)));
 const unrelated=s(9).practice[0];assert.ok(!practiceHintTargets(sources,"previous-answer",a.id,s(8).id,a).includes(taskKey(s(9).id,unrelated)));
});
test("词与词组义分离，词形和来源决定reward/once/after/appear的角色",()=>{
 assert.equal(card("note","p5-s5").contextualMeaning,"意味；色彩");assert.match(resolveEntry("a heavy note of hypocrisy",true,"p5-s5").contextualMeaning,/浓重的虚伪/);
 assert.match(card("rewards","p5-s1").partOfSpeech,/^n\./);assert.match(card("rewarded","question-27-option-B").partOfSpeech,/^v\./);
 assert.match(card("once","p5-s8").partOfSpeech,/adv/);assert.match(card("once","question-28-option-B").partOfSpeech,/conj/);
 assert.match(card("after","p5-s5").partOfSpeech,/conj/);assert.match(card("after","question-28-option-C").partOfSpeech,/prep/);
 assert.equal(card("thought","p5-s8").headword,"think");assert.equal(card("left","p5-s15").headword,"left");
 assert.match(card("educated","p5-s2").partOfSpeech,/名词化/);assert.match(card("pushing","p5-s8").partOfSpeech,/^adj\./);assert.match(card("stirrings","p5-s13").partOfSpeech,/^n\./);
 assert.match(card("appearing","p5-s10").partOfSpeech,/动名词/);assert.match(card("appear","question-29-option-D").partOfSpeech,/不定式/);
 assert.match(getWordKnowledge("that",{articleId:"p5",sourceId:"question-30-prompt"}).grammarRole,/同位语/);
 assert.match(getWordKnowledge("stand",{articleId:"p5",sourceId:"p5-s15"}).structures[0].rule,/不能写成the way how/);
});
