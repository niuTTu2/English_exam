import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents, allSentences } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents["2012-writing-a"];

test("2012投诉邮件保留六句、原卷双空格、题设边界及约100词",()=>{
  const source=JSON.parse(readFileSync(new URL("fixtures/2012-writing-a.json",import.meta.url),"utf8"));
  const normalize=t=>t.replace(/\s+/g," ").trim();
  assert.equal(normalize(article.sentences.map(s=>s.text).join(" ")),normalize(source.paragraphs.map(p=>p.text).join(" ")));
  assert.deepEqual(article.sentences.map(s=>s.id),Array.from({length:6},(_,i)=>`2012-writing-a-s${i+1}`));
  assert.ok(article.sentences[0].text.includes("that  you bought"));
  assert.ok(article.sentences[1].text.includes("to  the  customer service center"));
  const task=article.writingTasks[0];assert.equal(task.id,201247);assert.equal(task.points,10);
  assert.deepEqual(task.wordLimit,{mode:"about",count:100});assert.deepEqual(task.instructions,article.sentences);
  assert.equal(article.questions.length,0);assert.equal(article.guide,undefined);
  assert.match(task.sample.notes.join(" "),/自动关机.*教学示例.*不是原卷/);
  for(const text of task.sample.english.filter(s=>s.length>40))assert.ok(!allSentences.some(s=>s.text===text));
});

test("两层从句及两个to按真实范围，署名反馈有方向且不会污染字数任务",async()=>{
  const {rangeTokens,selectedRange,practiceHintTargets,taskKey}=await vite.ssrLoadModule("/app/learning-model.ts");
  const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
  const sources=trainingSources(article),first=sources[0],second=sources[1];
  assert.equal(first.beginnerSyntax.clauses.length,2);
  assert.equal(first.beginnerSyntax.clauses[0].predicate,"have found");
  assert.equal(first.beginnerSyntax.clauses[1].predicateDetails[0].text,"that");
  assert.equal(second.beginnerSyntax.clauses.length,0);
  assert.equal(second.beginnerSyntax.components[2].text,"to  the  customer service center");
  assert.equal(second.beginnerSyntax.components[3].text,"to 1) make a complaint, and 2) demand a prompt solution");
  assert.equal(sources.reduce((n,s)=>n+s.practice.length,0),7);
  for(const s of sources)for(const task of s.practice){
    const labels=new Set([...(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[]),...s.phrases].map(x=>x.toLowerCase()));
    for(const label of task.hintWords)assert.ok(labels.has(label.toLowerCase()),`${s.id}/${label}`);
    if(task.kind==="range"){
      const tokens=rangeTokens(s.text),start=s.text.indexOf(task.answer);
      assert.equal(selectedRange(s.text,tokens.findIndex(t=>t.start===start),tokens.findIndex(t=>t.end===start+task.answer.length)),task.answer);
    }
  }
  const targets=practiceHintTargets(sources,"previous-answer","",sources[4].id,sources[4].practice[0]);
  assert.ok(targets.includes(taskKey(sources[3].id,sources[3].practice[0])));
  assert.ok(!targets.includes(taskKey(sources[2].id,sources[2].practice[0])));
});

test("投诉来源词卡复核find、something、with、that、store、make及否定指令",async()=>{
  const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
  const {getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
  const card=(n,w)=>resolveEntry(w,false,`2012-writing-a-s${n}`);
  assert.equal(card(1,"found").headword,"find");assert.equal(card(1,"found").collocations[0],"have found something wrong");
  assert.equal(card(1,"store").collocations[0],"an online store");assert.equal(card(2,"make").collocations[0],"make a complaint");
  assert.equal(card(1,"that").partOfSpeech,"relative pron.");assert.match(card(1,"that").use,/bought的宾语/);
  assert.match(card(1,"with").grammarSummary,/wrong with/);
  assert.match(card(2,"to").grammarSummary,/第一个to.*第二个to/);
  assert.equal(card(2,"prompt").partOfSpeech,"adj.");assert.equal(card(2,"prompt").contextualMeaning,"及时的；迅速的");
  assert.equal(card(4,"Do").collocations[0],"Do not sign your own name");
  assert.equal(card(6,"write").collocations[0],"Do not write your address");
  for(const s of article.sentences)for(const w of new Set(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[])){
    const e=resolveEntry(w,false,s.id);
    assert.doesNotMatch([e.use,e.grammarSummary,e.collocations[0]].join(" "),/beyond his comprehension|competition from overseas|filled with warnings|not frequently|and hence|store grain|European Convention/);
    for(const p of e.collocations)assert.ok(getPhraseKnowledge(p),`${s.id}/${w}/${p}`);
  }
});
