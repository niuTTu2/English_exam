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
const article = articleContents["2011-writing-b"];

test("2011图表作文保留四句、150词下限与原图哈希，遮挡数据只作约数", () => {
  const source = JSON.parse(readFileSync(new URL("fixtures/2011-writing-b.json", import.meta.url), "utf8"));
  const normalize = text => text.replace(/\s+/g, " ").trim();
  assert.equal(normalize(article.sentences.map(s => s.text).join(" ")), normalize(source.paragraphs.map(p => p.text).join(" ")));
  assert.deepEqual(article.sentences.map(s => s.id), Array.from({length:4},(_,i)=>`2011-writing-b-s${i+1}`));
  assert.equal(article.questions.length, 0);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201148); assert.equal(task.number, 48); assert.equal(task.points, 15);
  assert.deepEqual(task.wordLimit, { mode: "at-least", count: 150 });
  assert.deepEqual(task.instructions, article.sentences);
  assert.equal(createHash("sha256").update(readFileSync(new URL(`../public${source.image.path}`, import.meta.url))).digest("hex"), source.image.sha256);
  assert.deepEqual(task.chart.rows, [{brand:"国产品牌",before:"略高于25%",after:"略高于30%"},{brand:"日系品牌",before:"接近35%",after:"略高于25%"},{brand:"美系品牌",before:"约10%",after:"约10%"}]);
  assert.match(task.chart.note, /遮挡.*近似值/);
  assert.ok(task.pitfalls.some(value=>/份额.*绝对销量/.test(value)));
  assert.ok(task.pitfalls.some(value=>/原因/.test(value)));
  for (const text of task.sample.english) assert.ok(!allSentences.some(s=>s.text===text));
});

test("四句指令没有虚构从句，过去分词定语、共享情态和名词宾语分开", () => {
  assert.ok(article.sentences.every(s=>s.beginnerSyntax.clauses.length===0));
  const [first, second, third, fourth] = article.sentences;
  assert.equal(first.beginnerSyntax.components[2].function, "后置定语");
  assert.equal(first.beginnerSyntax.components[2].modifies, "essay");
  assert.equal(first.beginnerSyntax.components[2].text, "based on the following chart");
  assert.equal(second.beginnerSyntax.components[2].text, "should");
  assert.equal(second.beginnerSyntax.components[2].modifies, "interpret与give");
  assert.equal(second.beginnerSyntax.components.filter(c=>c.function==="宾语").length, 2);
  assert.equal(third.beginnerSyntax.components.at(-1).text, "at least 150 words");
  assert.equal(fourth.beginnerSyntax.components.at(-1).function, "分值信息");
});

test("五项练习检查实际提示与范围端点，地图和作文评分不混入", async () => {
  const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
  const { rangeTokens, selectedRange, practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
  const sources=trainingSources(article);
  assert.equal(sources.length,4);assert.equal(article.guide,undefined);
  assert.equal(sources.reduce((n,s)=>n+s.practice.length,0),5);
  for(const s of sources)for(const task of s.practice){
    const labels=new Set([...(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[]),...s.phrases].map(x=>x.toLowerCase()));
    for(const label of task.hintWords)assert.ok(labels.has(label.toLowerCase()),`${s.id}/${label}`);
    assert.equal(task.revision,1);
    if(task.kind==="range"){
      const tokens=rangeTokens(s.text),start=s.text.indexOf(task.answer);
      assert.equal(selectedRange(s.text,tokens.findIndex(t=>t.start===start),tokens.findIndex(t=>t.end===start+task.answer.length)),task.answer);
    }
  }
  const tasks=sources[1].practice;
  assert.ok(!practiceHintTargets(sources,"previous-answer","",sources[1].id,tasks[0]).includes(taskKey(sources[1].id,tasks[1])),"语法反馈没有透露份额和销量关系");
});

test("图表写作词卡不会沿用书信人物或署名，位置介词与依据介词按来源区分", async () => {
  const {resolveEntry}=await vite.ssrLoadModule("/app/study-app.tsx");
  const {getPhraseKnowledge}=await vite.ssrLoadModule("/app/knowledge-base.ts");
  const card=(n,w)=>resolveEntry(w,false,`2011-writing-b-s${n}`);
  assert.equal(card(1,"on").partOfSpeech,"prep.");assert.equal(card(1,"on").contextualMeaning,"以……为依据");
  assert.equal(card(4,"on").contextualMeaning,"在……上");
  assert.equal(card(2,"your").collocations[0],"your writing");assert.equal(card(4,"your").collocations[0],"your essay");
  assert.equal(card(2,"writing").headword,"writing");assert.equal(card(1,"Write").headword,"write");
  assert.match(card(2,"should").grammarSummary,/interpret.*give/);
  assert.equal(card(2,"give").collocations[0],"give your comments");
  assert.match(card(2,"give").contextualSubstitutions[0].rewrittenSentence,/offer your comments/);
  assert.doesNotMatch(card(3,"least").contextualMeaning,/至少/);
  for(const s of article.sentences)for(const word of new Set(s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[])){
    const entry=resolveEntry(word,false,s.id);
    assert.doesNotMatch([entry.use,entry.grammarSummary].join(" "),/cousin|Li Ming|李明|own name|本年Text2|and hence/);
    for(const pattern of entry.collocations)assert.ok(getPhraseKnowledge(pattern),`${s.id}/${word}/${pattern}`);
    for(const structure of entry.structures??[])assert.ok(structure.pattern&&structure.meaning&&structure.rule);
  }
});
