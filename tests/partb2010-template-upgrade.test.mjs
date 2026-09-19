import assert from "node:assert/strict";
import test,{after} from "node:test";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {createServer} from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
const{articleContents}=await vite.ssrLoadModule("/app/data.ts");const a=articleContents["2010-p5"],sentence=n=>a.sentences[n-1];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("2010 PartB还原六段28句和真实T/F，嵌套目的、括号及传闻层级不丢失",async()=>{
 const f=JSON.parse(readFileSync(new URL("./fixtures/2010-p5-source.json",import.meta.url),"utf8"));const lookup=new Map(a.sentences.map(s=>[s.id,s.text]));
 assert.deepEqual(a.paragraphs.map(p=>p.sentenceIds.map(id=>lookup.get(id)).join(" ")),f.paragraphs);
 assert.deepEqual(a.questions.map(({id,number,format,prompt,options,answer})=>({id,number,format,prompt,options,answer})),f.questions);
 const cs=sentence(10).beginnerSyntax.clauses;assert.equal(cs.length,3);assert.ok(cs[0].text.endsWith("proceed to London"));assert.ok(cs[1].text.endsWith("proceed to London"));assert.equal(cs[2].text,"so all could have a turn in the most favourable positions");assert.equal(sentence(10).practice[0].answer,cs[2].text);
 assert.ok(sentence(11).beginnerSyntax.clauses[0].text.endsWith("(coupled with a reduction in carbon-dioxide output)"));
 const how=sentence(19).beginnerSyntax.clauses[0];assert.ok(how.text.endsWith("that make formation flight more efficient"));assert.equal(sentence(19).practice[0].answer,how.text);
 assert.equal(sentence(26).beginnerSyntax.clauses[1].subject,"they（military aircraft）");assert.equal(sentence(26).beginnerSyntax.clauses[2].subject,"they（reports）");
 assert.equal(sentence(27).beginnerSyntax.clauses[0].predicate,"省略was");
 const lost=sentence(27).beginnerSyntax.components.find(c=>c.text.startsWith("the skipper")).children[0].children[0];assert.equal(lost.modifies,"Lancaster");
 const{assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");const ids=a.sentences.map(s=>s.id),sel=(...ns)=>ns.map(n=>`2010-p5-s${n}`);
 const cases=[[0,"sentence",[3]],[1,"sentence",[7]],[2,"adjacent-sentences",[15,17]],[3,"adjacent-sentences",[19]],[4,"sentence",[26]]];
 for(const[i,scope,ns]of cases){assert.ok(assessLocation(a.questions[i].reasoning,{scope,sentenceIds:sel(...ns)},ids).passed);assert.equal(assessLocation(a.questions[i].reasoning,{scope,sentenceIds:ids},ids).passed,false);}
 assert.equal(assessLocation(a.questions[4].reasoning,{scope:"sentence",sentenceIds:sel(24,25)},ids).passed,false);
 for(const q of a.questions){assert.deepEqual(Object.keys(q.analysis.options).sort(),["F","T"]);assert.deepEqual(Object.keys(q.reasoning.options).sort(),["F","T"]);}
});
test("2010 PartB真实词卡43来源与提示词正确，保留鸟与飞机、动词与名词的边界",async()=>{
 const{resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");const{canonicalLemma}=await vite.ssrLoadModule("/app/lexicon.ts");const{hintAffectsTask}=await vite.ssrLoadModule("/app/learning-model.ts");
 const{passage2010P5ReviewedContexts:contexts}=await vite.ssrLoadModule("/app/2010-passage-5-contexts.ts");const{passage2010P5PreferredContexts:preferred}=await vite.ssrLoadModule("/app/2010-passage-5-collocations.ts");
 const sources=new Map([...a.sentences.map(s=>[s.id,s.text]),...a.questions.flatMap(q=>[[`question-${q.id}-prompt`,q.prompt],...q.options.map(o=>[`question-${q.id}-option-${o.key}`,o.text])])]);assert.equal(Object.keys(contexts).length,43);
 for(const s of a.sentences){const labels=new Set([...tokens(s.text),...s.phrases].map(x=>x.toLowerCase()));for(const task of s.practice)for(const label of task.hintWords??[]){assert.ok(labels.has(label.toLowerCase()),`${s.id}/${task.id}/${label}`);assert.ok(hintAffectsTask(task,"word",label));}}
 for(const[source,words]of Object.entries(contexts))for(const[head,entry]of Object.entries(words)){const token=tokens(sources.get(source)).find(w=>canonicalLemma(w,{articleId:a.id,sourceId:source})===head);assert.ok(token,`${source}/${head}没有词位`);const card=resolveEntry(token,false,source);assert.equal(card.contextualMeaning,entry.contextualMeaning,`${source}/${head}`);assert.equal(card.partOfSpeech,entry.partOfSpeech);assert.equal(card.grammarSummary,entry.use);}
 for(const[source,words]of Object.entries(preferred))for(const[head,entry]of Object.entries(words)){const token=tokens(sources.get(source)).find(w=>canonicalLemma(w,{articleId:a.id,sourceId:source})===head);assert.ok(token,`${source}/${head}没有词位`);const card=resolveEntry(token,false,source);for(const phrase of entry.preferredCollocations){assert.ok(sources.get(source).includes(phrase),`${source}/${phrase}不连续`);assert.equal(card.collocations[0],phrase);assert.ok(card.collocationDetails[0].target);}}
 const card=(w,n)=>resolveEntry(w,false,typeof n==="number"?`2010-p5-s${n}`:n);
 assert.match(card("experience",7).partOfSpeech,/^v\./);assert.match(card("experience","question-201042-prompt").partOfSpeech,/^n\./);
 assert.match(card("as",6).use,/名称/);assert.match(card("as",11).use,/降幅/);assert.match(card("as",23).use,/类比/);assert.match(card("As",24).use,/评注/);
 assert.match(card("operational",18).grammarSummary,/guidelines/);assert.doesNotMatch(card("operational",18).grammarSummary,/operational research/);
 assert.match(card("has",25).grammarSummary,/不是has begun/);assert.match(card("should",28).grammarSummary,/推断/);
 assert.equal(card("company",15).contextualMeaning,"结伴；同伴");assert.equal(card("wakes",20).contextualMeaning,"尾流");
 assert.ok(card("peering",17).contextualSubstitutions.length);assert.ok(card("unsubstantiated",26).contextualSubstitutions.length);
 const{vocabularyPriority}=await vite.ssrLoadModule("/app/vocabulary-priority.ts");assert.equal(vocabularyPriority(card("A350",1),"2010-p5-s1",a.id).id,"name");assert.equal(vocabularyPriority(card("company",15),"2010-p5-s15",a.id).id,"sense");
});
