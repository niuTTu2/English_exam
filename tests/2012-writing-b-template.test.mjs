import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents, allSentences } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents["2012-writing-b"];

test("2012满意度作文保留原文、原图九个数值及年龄边界，不当作年份趋势",()=>{
  const source=JSON.parse(readFileSync(new URL("fixtures/2012-writing-b.json",import.meta.url),"utf8"));
  const normalize=t=>t.replace(/\s+/g," ").trim();
  assert.equal(normalize(article.sentences.map(s=>s.text).join(" ")),normalize(source.paragraphs.map(p=>p.text).join(" ")));
  assert.deepEqual(article.sentences.map(s=>s.id),Array.from({length:4},(_,i)=>`2012-writing-b-s${i+1}`));
  const task=article.writingTasks[0];assert.equal(task.id,201248);assert.equal(task.points,15);assert.deepEqual(task.wordLimit,{mode:"at-least",count:150});
  assert.equal(createHash("sha256").update(readFileSync(new URL(`../${source.image.path}`,import.meta.url))).digest("hex"),source.image.sha256);
  assert.deepEqual(task.chart.columns,source.columns);assert.deepEqual(task.chart.rows,source.rows);
  assert.deepEqual([task.chart.width,task.chart.height],[644,329]);assert.equal(task.chart.format,"table");
  assert.match(task.pitfalls.join(" "),/不清楚/);assert.match(task.pitfalls.join(" "),/没有年份/);
  assert.ok(task.pitfalls.some(s=>/0\.0%满意.*全员不满意/.test(s)));
  assert.equal(article.questions.length,0);assert.equal(article.guide,undefined);
  for(const text of task.sample.english)assert.ok(!allSentences.some(s=>s.text===text));
});

test("四句零从句、describe与give并列且五项任务保持实际提示与范围",async()=>{
  const {trainingSources}=await vite.ssrLoadModule("/app/training-sources.ts");
  const {rangeTokens,selectedRange}=await vite.ssrLoadModule("/app/learning-model.ts");
  const sources=trainingSources(article);assert.equal(sources.length,4);assert.equal(sources.reduce((n,s)=>n+s.practice.length,0),5);
  assert.ok(sources.every(s=>s.beginnerSyntax.clauses.length===0));
  assert.equal(sources[0].beginnerSyntax.components[2].modifies,"essay");
  assert.equal(sources[1].beginnerSyntax.components[2].modifies,"describe与give");
  assert.equal(sources[1].beginnerSyntax.components.filter(c=>c.function==="宾语").length,2);
  const statistical=sources[1].practice.find(t=>t.id==="table-scope");
  assert.match(statistical.answer,/不满意率最高.*不能.*人数最多/);
  for(const s of sources)for(const task of s.practice){
    const labels=new Set([...(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[]),...s.phrases].map(x=>x.toLowerCase()));
    for(const label of task.hintWords)assert.ok(labels.has(label.toLowerCase()),`${s.id}/${label}`);
    if(task.kind==="range"){
      const tokens=rangeTokens(s.text),start=s.text.indexOf(task.answer);
      assert.equal(selectedRange(s.text,tokens.findIndex(t=>t.start===start),tokens.findIndex(t=>t.end===start+task.answer.length)),task.answer);
    }
  }
});

test("表格写作实际词卡只讲本篇来源与150词下限，保留offer迁移",async()=>{
  const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
  const {getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
  const card=(n,w)=>resolveEntry(w,false,`2012-writing-b-s${n}`);
  assert.equal(card(1,"on").partOfSpeech,"prep.");assert.equal(card(4,"on").contextualMeaning,"在……上");
  assert.equal(card(2,"writing").headword,"writing");assert.equal(card(2,"your").collocations[0],"your writing");
  assert.match(card(2,"should").grammarSummary,/describe.*give/);assert.equal(card(2,"give").collocations[0],"give your comments");
  assert.match(card(2,"give").contextualSubstitutions[0].rewrittenSentence,/offer your comments/);
  assert.equal(card(3,"words").collocations[0],"at least 150 words");
  for(const s of article.sentences)for(const w of new Set(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[])){
    const e=resolveEntry(w,false,s.id);
    assert.doesNotMatch([e.use,e.grammarSummary,e.collocations[0]].join(" "),/100 words|one hundred words|市场份额|2008|cousin|own name|and hence/);
    for(const p of e.collocations)assert.ok(getPhraseKnowledge(p),`${s.id}/${w}/${p}`);
  }
});
