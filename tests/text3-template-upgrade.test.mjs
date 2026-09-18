import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const article=articleContents["2010-p3"];
const sentence=n=>article.sentences[n-1];
test("Text 3保持用户原卷7段与31—35全部原题，嵌套修饰和完整when边界一致",()=>{
 const fixture=JSON.parse(readFileSync(new URL("./fixtures/2010-p3-source.json",import.meta.url),"utf8"));
 const lookup=new Map(article.sentences.map(s=>[s.id,s.text]));
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds.map(id=>lookup.get(id)).join(" ")),fixture.paragraphs);
 assert.deepEqual(article.questions.map(({id,number,prompt,options,answer})=>({id,number,prompt,options,answer})),fixture.questions);
 const when=sentence(2).beginnerSyntax.clauses.find(c=>c.marker==="when");
 assert.ok(when.text.endsWith("a carefully designed set of daily cues"));
 const range=sentence(2).practice.find(t=>t.id==="customer-clause"); assert.equal(range.answer,when.text);
 assert.ok(!sentence(2).practice.find(t=>t.id==="help-actions").leaksToTaskIds?.includes("customer-clause"));
 const who=sentence(13).beginnerSyntax.clauses.find(c=>c.marker==="who");
 assert.ok(who.text.includes("the company that sold")); assert.ok(who.text.endsWith("last year"));
 const companyClause=sentence(13).beginnerSyntax.clauses.find(c=>c.marker==="that");
 assert.equal(companyClause.subject,"that（Procter & Gamble）");
 for(const option of ["A","B","C"])assert.equal(article.questions[2].reasoning.options[option].errorType,"事实成立，非本题所求");
});
test("Text 3实际查词提示与语境卡不串旧篇，不把企业自述移作作者态度",async()=>{
 const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
 const {hintAffectsTask}=await vite.ssrLoadModule("/app/learning-model.ts");
 const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
 for(const s of article.sentences){const labels=new Set([...tokens(s.text),...s.phrases].map(x=>x.toLowerCase()));for(const task of s.practice)for(const label of task.hintWords??[]){assert.ok(labels.has(label.toLowerCase()),`${s.id}/${task.id}/${label}`);assert.equal(hintAffectsTask(task,"word",label),true)}}
 const cases=[
 ["2010-p3-s8","with",/prep/,/用/,/工具/,"with Colgate, Crest or one of the other brands"],
 ["2010-p3-s11","commercials",/^n\./,/广告片/,/复数名词/],
 ["2010-p3-s14","it's",/^pron/,/培养积极习惯/,/不是形式主语/],
 ["2010-p3-s15","through",/^prep/,/通过/,/句首through.*have learned.*末尾through.*tying/],
 ["question-201032-option-C","buying",/^v\.-ing/,/购买/,/不是企业收购/,"people's buying power"],
 ["question-201032-option-C","power",/^n\./,/能力/,/经济购买能力/,"people's buying power"],
 ["question-201033-prompt","Which",/疑问代词/,/哪一个/,/疑问主语/],
 ["question-201034-option-C","commercial",/^adj\./,/商业的/,/修饰promotions/],
 ["question-201035-option-C","positive",/^adj\./,/正面的/,/态度表语/,"positive"],
 ];
 for(const [id,word,pos,meaning,use,first]of cases){const e=resolveEntry(word,false,id);assert.match(e.partOfSpeech,pos);assert.match(e.contextualMeaning,meaning);assert.match(e.use,use);if(first)assert.equal(e.collocationDetails[0].label,first);assert.doesNotMatch(e.grammarSummary??"",/病毒|auctioneer|digital divide|public defender/)}
 assert.equal(resolveEntry("people",false,"2010-p3-s7").headword,resolveEntry("people's",false,"2010-p3-s3").headword);
 assert.equal(article.questions[4].reasoning.options.C.errorType,"观点归属错误");
});
