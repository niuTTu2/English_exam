import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const {resolveEntry,StudySentence}=await vite.ssrLoadModule("/app/study-app.tsx");
const {getWordKnowledge,getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
const {canonicalLemma}=await vite.ssrLoadModule("/app/lexicon.ts");
const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
const {practiceHintTargets,taskKey}=await vite.ssrLoadModule("/app/learning-model.ts");
const article=articleContents.p4,s=n=>article.sentences[n-1],card=(w,id)=>resolveEntry(w,false,id),fixture=JSON.parse(readFileSync(new URL("fixtures/2000-passage-4-source.json",import.meta.url),"utf8"));
const decode=t=>t.replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
test("Text4保持原卷17句四段及23—26题，恢复报道引语边界",()=>{
 assert.deepEqual(article.sentences.map(({id,text})=>({id,text})),fixture.sentences);
 assert.deepEqual(article.questions.map(({id,prompt,options,answer})=>({id,prompt,options,answer})),fixture.questions);
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds.map(id=>Number(id.replace("p4-s","")))),[[1,2,3],[4,5,6],[7,8,9,10,11,12],[13,14,15,16,17]]);
 assert.ok(s(8).text.startsWith("“Those things")&&s(8).text.includes("ignored,” says"));assert.ok(s(9).text.startsWith("“Frustration")&&s(9).text.endsWith("wild.”"));
 assert.equal(article.sentences.reduce((n,s)=>n+s.practice.length,0),29);
 assert.equal(article.guide.practice.length,3);
});
test("精确拆解倒装、宾语补足、比较省略，翻译不增加比例或习惯",()=>{
 assert.equal(s(4).beginnerSyntax.components[0].function,"主语");
 assert.match(s(5).beginnerSyntax.clauses[0].type,/主语/);
 assert.match(s(6).beginnerSyntax.clauses[0].type,/比较/);assert.doesNotMatch(s(6).natural,/比例/);
 assert.ok(s(9).beginnerSyntax.components.some(c=>c.text==="kids"&&c.function==="宾语"));
 assert.ok(s(9).beginnerSyntax.components.some(c=>c.text==="to drop out and run wild"&&c.function==="宾语补足语"));
 const inverse=s(15).beginnerSyntax.components.find(c=>c.text==="centralization");assert.match(inverse.function,/主语/);
 assert.match(getPhraseKnowledge("has come centralization").grammarRole,/完全倒装/);
 assert.doesNotMatch(s(16).natural,/习惯/);assert.match(s(17).natural,/自杀事件/);
 assert.equal(article.questions.find(q=>q.id===26).analysis.prompt.beginnerSyntax.clauses.length,0);
 assert.equal(article.questions.find(q=>q.id===26).analysis.answer.beginnerSyntax.clauses[0].type,"同位语从句");
});
test("24题作者与部长观点分开，26题限定青年推断的范围",()=>{
 const q24=article.questions.find(q=>q.id===24),q26=article.questions.find(q=>q.id===26);
 assert.equal(q24.answer,"D");assert.match(q24.reasoning.paraphrases[0].limit,/间接/);assert.match(q24.explanations.D,/不单独证明作者立场/);
 assert.ok(q24.reasoning.locationPolicy.paths[0].groups.flat().includes("p4-s13"));assert.ok(!q24.reasoning.locationPolicy.paths[0].groups.flat().includes("p4-s12"));
 assert.match(q26.reasoning.paraphrases[0].limit,/Urban Japanese/);assert.match(q26.reasoning.options.B.reasoning,/自身增幅/);
});
test("29任务的hint来自真正SSR入口，反馈只作用于已披露内容",()=>{
 for(const item of article.sentences){const html=renderToStaticMarkup(React.createElement(StudySentence,{sentence:item,mode:"words",showPhrases:true,isExpanded:false,isMarked:false,note:"",onToggle(){},onMark(){},onTerm(){},onNote(){}}));const labels=new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(m=>decode(m[1]).toLowerCase()));for(const t of item.practice)for(const hint of t.hintWords??[])assert.ok(labels.has(hint.toLowerCase()),`${item.id}/${t.id}: ${hint}`);}
 const sources=trainingSources(article),find=(n,id)=>s(n).practice.find(t=>t.id===id),first=find(17,"level-growth"),second=find(17,"by-increase");
 assert.ok(practiceHintTargets(sources,"previous-answer",first.id,s(17).id,first).includes(taskKey(s(17).id,second)));
 const more=find(6,"more-workers"),did=find(6,"did-substitute");assert.ok(!practiceHintTargets(sources,"previous-answer",more.id,s(6).id,more).includes(taskKey(s(6).id,did)));
});
test("词卡按来源区分stress/more/that/to，实际屈折词形进入正确词条",()=>{
 assert.match(card("stress","p4-s7").partOfSpeech,/^v\./);assert.match(card("stress","question-25-option-C").partOfSpeech,/^n\./);assert.equal(card("stress","question-25-option-C").contextualMeaning,"重视；强调");
 assert.match(card("more","p4-s6").partOfSpeech,/det/);assert.match(card("more","question-26-option-C").partOfSpeech,/pron/);
 assert.match(card("that","question-26-prompt").partOfSpeech,/conj/);assert.match(card("that","question-26-option-B").partOfSpeech,/pron/);
 assert.match(card("to","question-25-option-D").partOfSpeech,/prep/);
 assert.equal(canonicalLemma("beginning",{articleId:"p4",sourceId:"p4-s16"}),"begin");assert.equal(card("beginning","p4-s16").headword,"begin");
 assert.equal(card("abandoned","p4-s15").headword,"abandon");assert.equal(article.questions.find(q=>q.id===26).analysis.options.C.natural,"日本人比以往任何时候承受得更多。");assert.equal(card("being","p4-s3").contextualMeaning,"存在");assert.match(card("were","p4-s3").partOfSpeech,/系动词/);
 assert.match(getWordKnowledge("come",{articleId:"p4",sourceId:"p4-s15"}).grammarRole,/完全倒装/);assert.match(getWordKnowledge("that",{articleId:"p4",sourceId:"p4-s17"}).grammarRole,/替代/);
 assert.equal(card("notes","p3-s10").contextualMeaning,"注释");
});
