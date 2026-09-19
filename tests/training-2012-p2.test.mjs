import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
const {assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");
const {grammarConcepts}=await vite.ssrLoadModule("/app/learning-model.ts");
const article=articleContents["2012-p2"],s=n=>article.sentences[n-1];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("2012 Text 2原卷四段与异文保留，限定词、省略连接和状语从句不混淆",()=>{
 const fixture=JSON.parse(readFileSync(new URL("./fixtures/2012-p2.json",import.meta.url)));
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds.map(id=>article.sentences.find(s=>s.id===id).text).join(" ")),fixture.paragraphs.map(p=>p.text));
 assert.deepEqual(article.questions.map(q=>q.answer),["C","B","B","A","C"]);
 assert.match(s(3).text,/between girls as not only/);
 assert.doesNotMatch(s(3).text,/between girls and pink/);
 assert.ok(s(13).beginnerSyntax.clauses.some(c=>c.marker.includes("省略")));
 assert.ok(s(13).beginnerSyntax.components.some(c=>JSON.stringify(c).includes("指示限定")));
 assert.equal(s(18).beginnerSyntax.clauses.length,1);
 assert.match(s(18).beginnerSyntax.clauses[0].type,/状语/);
 assert.equal(s(8).beginnerSyntax.components.find(c=>c.text==="the more masculine colour").function,"主语补足语");
 assert.match(s(9).natural,/玛丽|玛利/);assert.match(s(9).natural,/坚定/);assert.match(s(9).natural,/忠贞/);
 assert.match(s(10).natural,/至少/);assert.match(s(17).natural,/利润/);
});
test("2012 Text 2每项提示可真实点击，具体建议和全文推断需多句定位",()=>{
 for(const sentence of article.sentences){
  const actual=new Set([...tokens(sentence.text),...sentence.phrases].map(t=>t.toLowerCase()));
  for(const task of sentence.practice)for(const hint of task.hintWords??[])assert.ok(actual.has(hint.toLowerCase()),`${sentence.id}/${task.id}没有入口${hint}`);
 }
 assert.equal(grammarConcepts["clause-concession"],"让步状语从句");
 assert.equal(s(2).practice[0].conceptId,"clause-concession");
 assert.equal(s(6).practice[0].conceptId,"clause-cause");
 assert.equal(s(18).practice[0].conceptId,"clause-place");
 const all=article.sentences.map(s=>s.id),q29=article.questions.find(q=>q.number===29),q30=article.questions.find(q=>q.number===30);
 assert.equal(assessLocation(q29.reasoning,{scope:"paragraph",sentenceIds:[s(15).id]},all).passed,false);
 assert.equal(assessLocation(q29.reasoning,{scope:"paragraph",sentenceIds:[s(15).id,s(17).id]},all).passed,true);
 assert.equal(assessLocation(q30.reasoning,{scope:"whole-passage",sentenceIds:all},all).passed,false);
 assert.equal(assessLocation(q30.reasoning,{scope:"whole-passage",sentenceIds:[s(10).id,s(17).id,s(18).id]},all).passed,true);
});
test("2012 Text 2实点词卡按来源识别颜色、姓氏、限定词、动词与消费义",()=>{
 for(const [token,source,pos,meaning,pattern] of [
  ["white",s(6).id,/n\./,/白色/,/wore white/],["getting",s(6).id,/v\.-ing/,/使/,/getting clothes clean/],
  ["associate",s(5).id,/adj\./,/副/,/associate professor/],["associated",s(8).id,/v\.-ed/,/联系/,/associated with strength/],
  ["that",s(13).id,/det\./,/那个/,/that phase/],["Cook",s(14).id,/proper n\./,/库克/,/Daniel Cook/],
  ["sales",s(15).id,/n\./,/销售/,/increase sales/],["proved",s(17).id,/linking v\./,/表明/,/has proved/],
  ["means","question-201226-prompt",/v\./,/意指/,/author means/],["White","question-201227-option-C",/n\./,/白色/,/White is preferred/],
  ["consumption","question-201228-option-D",/n\./,/消费/,/childhood consumption/],["equal","question-201229-option-B",/adj\./,/同等/,/equal importance/],
 ]){const e=resolveEntry(token,false,source);assert.match(e.partOfSpeech,pos,`${source}/${token}`);assert.match(e.contextualMeaning,meaning);assert.match(e.structures[0].pattern,pattern);assert.match(e.collocationDetails[0].label,pattern);assert.ok(e.collocationDetails[0].target);}
 for(const source of [s(1).id,s(2).id,s(3).id,s(5).id,s(10).id,s(14).id,s(16).id,"question-201230-prompt"])assert.doesNotMatch(resolveEntry("it",false,source).grammarSummary,/病毒|infected/);
 assert.match(resolveEntry("since",false,s(6).id).grammarSummary,/因为/);
 assert.match(resolveEntry("where",false,s(18).id).grammarSummary,/无名词先行词|没有名词先行词/);
 assert.match(resolveEntry("that",false,s(13).id).grammarSummary,/连接词实际上省略/);
});
