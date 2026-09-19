import assert from "node:assert/strict";
import test,{after} from "node:test";
import {createServer} from "vite";
import {fileURLToPath} from "node:url";
import {readFileSync} from "node:fs";
const root=fileURLToPath(new URL("..",import.meta.url)),vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts"),{resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx"),{assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");
const article=articleContents["2012-p3"],s=n=>article.sentences[n-1],all=article.sentences.map(s=>s.id);
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("2012 Text3保留原卷六段，比较倒装、观点来源和嵌入同位语独立精审",()=>{
 const fixture=JSON.parse(readFileSync(new URL("./fixtures/2012-p3.json",import.meta.url)));
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds.map(id=>article.sentences.find(s=>s.id===id).text).join(" ")),fixture.paragraphs.map(p=>p.text));
 assert.deepEqual(article.questions.map(q=>q.answer),["A","B","A","C","D"]);
 assert.equal(s(14).beginnerSyntax.clauses.length,3);assert.match(s(14).beginnerSyntax.clauses[1].type,/倒装/);
 assert.equal(s(14).beginnerSyntax.clauses[1].subject,"cotton fibres that have been separated from cotton seeds");
 assert.equal(s(8).beginnerSyntax.components[0].children[0].children[0].modifies,"Myriad");
 assert.equal(s(22).beginnerSyntax.clauses[0].subject,"the Supreme Court");
 assert.equal(s(22).beginnerSyntax.clauses[0].predicateDetails[0].text,"which");
 assert.match(article.questions.find(q=>q.number===32).reasoning.paraphrases[0].limit,/必要|不能倒转/);
 assert.equal(article.questions.find(q=>q.number===31).analysis.options.A.textKind,"phrase");
 assert.equal(article.questions.find(q=>q.number===33).analysis.options.A.beginnerSyntax.clauses.length,0);
});
test("2012 Text3任务仅绑定原句入口，多句定位防止从比喻和满座单句过关",()=>{
 for(const sentence of article.sentences){const actual=new Set([...tokens(sentence.text),...sentence.phrases].map(t=>t.toLowerCase()));for(const task of sentence.practice)for(const hint of task.hintWords??[])assert.ok(actual.has(hint.toLowerCase()),`${sentence.id}/${task.id}不存在入口${hint}`);}
 for(const [number,left,right] of [[31,3,4],[33,20,21],[34,23,24]]){const q=article.questions.find(q=>q.number===number);assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:[s(right).id]},all).passed,false);assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:[s(left).id,s(right).id]},all).passed,true);}
 const q35=article.questions.find(q=>q.number===35);assert.equal(assessLocation(q35.reasoning,{scope:"whole-passage",sentenceIds:all},all).passed,false);assert.equal(assessLocation(q35.reasoning,{scope:"whole-passage",sentenceIds:[s(8).id,s(11).id,s(16).id]},all).passed,true);
});
test("2012 Text3实点词卡隔离法律动词与题目语义，保留packed程度替换",()=>{
 for(const [word,source,pos,meaning,pattern] of [
 ["agitated",s(4).id,/adj\./,/不安/,/violently agitated/],["ruling",s(7).id,/v\.-ing/,/裁定/,/ruling that/],["ruling",s(8).id,/n\./,/裁决/,/ruling was/],
 ["rather",s(9).id,/adv\./,/相当/,/rather busy/],["make",s(11).id,/v\./,/提出/,/make three/],["may",s(11).id,/modal/,/获准/,/may not be patented/],
 ["individual",s(16).id,/adj\./,/单个/,/individual genes/],["within",s(16).id,/prep\./,/内部/,/within it/],["file",s(19).id,/v\./,/申请/,/file many more/],
 ["determined",s(22).id,/v\.-ed/,/决定/,/determined by a suit/],["held",s(23).id,/v\./,/举办/,/held a convention/],
 ["issue","question-201231-option-B",/v\./,/发布/,/issue a warning/],["rule","question-201231-option-D",/v\./,/排除/,/rule out/],
 ["great","question-201234-option-C",/adj\./,/重大/,/great concern/],["critical","question-201235-option-A",/adj\./,/批评/,/^critical$/],
 ]){const e=resolveEntry(word,false,source);assert.match(e.partOfSpeech,pos);assert.match(e.contextualMeaning,meaning);assert.match(e.structures[0].pattern,pattern);assert.match(e.collocationDetails[0].label,pattern);assert.ok(e.collocationDetails[0].target);}
 for(const source of [s(11).id,s(16).id,"question-201231-prompt"])assert.doesNotMatch(resolveEntry("it",false,source).grammarSummary,/病毒|infected/);
 assert.match(resolveEntry("as",false,s(18).id).grammarSummary,/背景从句/);
 assert.match(resolveEntry("which",false,s(22).id).grammarSummary,/宾语/);
 const packed=resolveEntry("packed",false,s(24).id);assert.ok(JSON.stringify(packed).includes("Each meeting was crowded."));
});
