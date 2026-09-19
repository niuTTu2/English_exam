import assert from "node:assert/strict";
import test,{after} from "node:test";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {createServer} from "vite";
const root=fileURLToPath(new URL("..",import.meta.url));
const vite=await createServer({configFile:false,root,resolve:{alias:{"@":root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
const {articleContents}=await vite.ssrLoadModule("/app/data.ts");
const a=articleContents["2010-p4"],sentence=n=>a.sentences[n-1];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];
test("Text4对照用户原卷四段和36—40真实题目，嵌套边界与时间层级一致",async()=>{
 const f=JSON.parse(readFileSync(new URL("./fixtures/2010-p4-source.json",import.meta.url),"utf8"));const lookup=new Map(a.sentences.map(s=>[s.id,s.text]));
 assert.deepEqual(a.paragraphs.map(p=>p.sentenceIds.map(id=>lookup.get(id)).join(" ")),f.paragraphs);
 assert.deepEqual(a.questions.map(({id,number,prompt,options,answer})=>({id,number,prompt,options,answer})),f.questions);
 assert.equal(sentence(1).beginnerSyntax.clauses.length,6);
 const who=sentence(1).beginnerSyntax.clauses.find(c=>c.marker==="who");assert.equal(who.text,"who meet minimal qualifications of age and literacy");
 assert.equal(sentence(1).practice.find(t=>t.id==="qualified-citizens").answer,who.text);
 const requirement=sentence(13).beginnerSyntax.clauses[0];assert.equal(requirement.text,"that juries be representative of all parts of the community");assert.equal(requirement.predicate,"be");
 assert.equal(sentence(13).practice[0].answer,requirement.text);assert.doesNotMatch(sentence(13).practice[0].prompt,/止于community/);
 assert.ok(!sentence(9).practice[1].leaksToTaskIds?.includes("unless-exception"));
 const {assessLocation}=await vite.ssrLoadModule("/app/location-model.ts");const ids=a.sentences.map(s=>s.id),sel=(...ns)=>ns.map(n=>`2010-p4-s${n}`);
 for(const ns of [[10],[9,10],[8,9,10]])assert.ok(assessLocation(a.questions[2].reasoning,{scope:"adjacent-sentences",sentenceIds:sel(...ns)},ids).passed);
 assert.ok(assessLocation(a.questions[3].reasoning,{scope:"adjacent-sentences",sentenceIds:sel(11,12)},ids).passed);
 assert.equal(assessLocation(a.questions[3].reasoning,{scope:"adjacent-sentences",sentenceIds:sel(13,14)},ids).passed,false);
 assert.ok(assessLocation(a.questions[4].reasoning,{scope:"whole-passage",sentenceIds:sel(1,6,10,12)},ids).passed);
 assert.equal(assessLocation(a.questions[4].reasoning,{scope:"whole-passage",sentenceIds:ids},ids).passed,false);
});
test("Text4真实提示入口及39来源词义：US、代表、使役、法案分层均不串篇",async()=>{
 const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");const {canonicalLemma}=await vite.ssrLoadModule("/app/lexicon.ts");const {hintAffectsTask}=await vite.ssrLoadModule("/app/learning-model.ts");
 const {passage2010P4ReviewedContexts:contexts}=await vite.ssrLoadModule("/app/2010-passage-4-contexts.ts");
 const {passage2010P4PreferredContexts:preferred}=await vite.ssrLoadModule("/app/2010-passage-4-collocations.ts");
 const sources=new Map([...a.sentences.map(s=>[s.id,s.text]),...a.questions.flatMap(q=>[[`question-${q.id}-prompt`,q.prompt],...q.options.map(o=>[`question-${q.id}-option-${o.key}`,o.text])])]);
 assert.equal(Object.keys(contexts).length,39);
 for(const s of a.sentences){const labels=new Set([...tokens(s.text),...s.phrases].map(x=>x.toLowerCase()));for(const t of s.practice)for(const label of t.hintWords??[]){assert.ok(labels.has(label.toLowerCase()),`${s.id}/${t.id}/${label}`);assert.ok(hintAffectsTask(t,"word",label));}}
 for(const [source,words]of Object.entries(contexts))for(const[head,entry]of Object.entries(words)){const token=tokens(sources.get(source)).find(token=>canonicalLemma(token,{articleId:a.id,sourceId:source})===head);assert.ok(token,`${source}/${head}无对应词位`);const card=resolveEntry(token,false,source);assert.equal(card.contextualMeaning,entry.contextualMeaning,`${source}/${head}`);assert.equal(card.partOfSpeech,entry.partOfSpeech);assert.equal(card.grammarSummary,entry.use);}
 for(const[source,words]of Object.entries(preferred))for(const[head,entry]of Object.entries(words)){const token=tokens(sources.get(source)).find(token=>canonicalLemma(token,{articleId:a.id,sourceId:source})===head);assert.ok(token,`${source}/${head}`);const card=resolveEntry(token,false,source);for(const expression of entry.preferredCollocations){assert.ok(sources.get(source).includes(expression),`${source}/${expression}不连续`);assert.equal(card.collocations[0],expression);assert.ok(card.collocationDetails[0].target);}}
 const checks=[["US","question-201036-prompt","us","美国"],["US","question-201040-prompt","us","美国"],["representative","2010-p4-s2","representative","代议制的"],["representatives","2010-p4-s3","representative","代表"],["representative","2010-p4-s13","representative","有代表性的"],["themselves","2010-p4-s3","themselves","他们自己"],["special","2010-p4-s12","special","特殊的"],["centers","question-201040-prompt","center","以……为中心"],["random","2010-p4-s12","random","随机"]];
 for(const[word,source,head,meaning]of checks){const card=resolveEntry(word,false,source);assert.equal(card.headword,head);assert.equal(card.contextualMeaning,meaning);}
 assert.equal(canonicalLemma("us",{articleId:"2010-p3"}),"we");
 assert.equal(resolveEntry("centers",false,"question-201040-prompt").partOfSpeech,"v.（第三人称单数）");
 const {vocabularyPriority}=await vite.ssrLoadModule("/app/vocabulary-priority.ts");
 assert.equal(vocabularyPriority(resolveEntry("letter",false,"2010-p4-s1"),"2010-p4-s1",a.id).id,"sense");
 assert.equal(vocabularyPriority(resolveEntry("US",false,"question-201036-prompt"),"question-201036-prompt",a.id).id,"name");
});
