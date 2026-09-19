import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { resolveEntry, buildYearPhraseItems } = await vite.ssrLoadModule("/app/study-app.tsx");
const { getWordKnowledge, getPhraseKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
const { canonicalLemma } = await vite.ssrLoadModule("/app/lexicon.ts");
const { cloze2001SourceContexts } = await vite.ssrLoadModule("/app/2001-cloze-contexts.ts");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const { practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
const { assessLocation } = await vite.ssrLoadModule("/app/location-model.ts");
const article = articleContents["2001-cloze"];
const card = (text, source) => resolveEntry(text, false, source);
const tokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];

test("2001完形保留PDF七段九句、原始缺to字形和20空80选项", () => {
 const f=JSON.parse(readFileSync(new URL('./fixtures/2001-cloze-source.json',import.meta.url)));
 assert.equal(f.sourceSha256,'ed26be7b9d1c64262e9241105aab2b5d89da6bac51ff91e666dab656076a4e44');
 assert.deepEqual(article.sentences.map(s=>Object.fromEntries(['id','number','text','testText','answerWords'].map(k=>[k,s[k]]))),f.sentences);
 assert.deepEqual(article.questions.map(q=>Object.fromEntries(['id','number','prompt','options','answer','sentenceId'].map(k=>[k,q[k]]))),f.questions);
 assert.deepEqual(article.paragraphs.map(p=>p.sentenceIds),f.paragraphs.map(ns=>ns.map(n=>`2001-cloze-s${n}`)));
 assert.equal(article.questions.flatMap(q=>q.options).length,80);
 assert.equal(article.sentences.flatMap(s=>s.testText.match(/___\(\d+\)/g)??[]).length,20);
 assert.match(article.sentences[8].text,/encouraged exaggerate/);
 assert.match(article.sentences[8].beginnerSyntax.reading.focus,/原卷.*缺to/);
});

test("2001完形精确嵌套、宾补及原文异常位置不扁平化", () => {
 const s=n=>article.sentences[n-1];
 assert.equal(s(1).beginnerSyntax.components[2].children[1].function,'付款施事补足');
 assert.equal(s(2).beginnerSyntax.clauses[0].predicateDetails.length,2);
 assert.equal(s(2).beginnerSyntax.clauses[1].text,'that can be given to a case before a trial begins');
 assert.match(s(3).beginnerSyntax.components[4].text,/he agreed.*which said.*that self regulation/);
 assert.equal(s(4).beginnerSyntax.components.length,3);
 assert.match(s(4).beginnerSyntax.components[2].children[0].children[3].text,/when he said/);
 assert.deepEqual(s(5).beginnerSyntax.clauses[1].predicateDetails,[{function:'宾语',text:'the European Convention on Human Rights'},{function:'宾语补足语',text:'legally binding'}]);
 assert.equal(s(5).beginnerSyntax.clauses[2].predicate,'was');
 assert.equal(s(6).beginnerSyntax.components[0].children[2].function,'表语');
 assert.equal(s(7).chunks[2].visualRole,'complement');
 assert.equal(s(8).beginnerSyntax.clauses.length,0);
 assert.match(s(8).beginnerSyntax.components[2].form,/完成不定式/);
 assert.match(s(9).beginnerSyntax.components[2].children[3].function,/原卷异常/);
 assert.equal(article.sentences.reduce((n,s)=>n+s.beginnerSyntax.clauses.length,0),16);
});

test("2001完形任务使用真实入口，词组提示与反馈方向保持可追溯", () => {
 for(const s of article.sentences){
  const allowed=new Set([...tokens(s.text),...s.phrases].map(x=>x.toLowerCase()));
  for(const t of s.practice)for(const h of t.hintWords??[])assert.ok(allowed.has(h.toLowerCase()),`${s.id}/${t.id}/${h}`);
 }
 assert.equal(article.sentences.reduce((n,s)=>n+s.practice.length,0),17);
 assert.equal(article.guide.practice.length,3);
 const source=article.sentences[7],task=source.practice[0];
 assert.deepEqual(practiceHintTargets(trainingSources(article),'word','were said to have received payments',source.id),[taskKey(source.id,task)]);
 assert.deepEqual(practiceHintTargets(trainingSources(article),'previous-answer',task.id,source.id,task),[taskKey(source.id,task)]);
});

test("2001完形全部来源语境对应实际词元，题干片段不冒充完整正文", () => {
 const sources=new Map([...article.sentences.map(s=>[s.id,s.text]),...article.questions.flatMap(q=>[[`question-${q.id}-prompt`,q.prompt],...q.options.map(o=>[`question-${q.id}-option-${o.key}`,o.text])])]);
 let count=0;
 for(const [source,entries]of Object.entries(cloze2001SourceContexts))for(const [headword,entry]of Object.entries(entries)){
  count++;
  const token=tokens(sources.get(source)).find(t=>canonicalLemma(t,{articleId:'2001-cloze',sourceId:source})===headword);
  assert.ok(token,`${source}/${headword}`);
  const actual=card(token,source);
  assert.equal(actual.contextualMeaning,entry.contextualMeaning);
  assert.equal(actual.grammarSummary,getWordKnowledge(headword,{articleId:'2001-cloze',sourceId:source}).grammarSummary);
  for(const phrase of entry.preferredCollocations??[])assert.ok(getPhraseKnowledge(phrase),phrase);
 }
 assert.equal(count,221);
 assert.match(card('that','question-200105-prompt').grammarSummary,/只有这一处that/);
 assert.doesNotMatch(card('that','question-200105-prompt').grammarSummary,/bill/);
 assert.match(card('to','question-200118-prompt').grammarSummary,/第一处.*第二处/);
 assert.doesNotMatch(card('to','question-200118-prompt').grammarSummary,/newspapers/);
});

test("2001完形正文与候选词卡分开：名词动词、连接词与法律状态", () => {
 assert.match(card('tightening','2001-cloze-s2').partOfSpeech,/名词化/);
 assert.match(card('with','2001-cloze-s3').grammarSummary,/agree/);
 assert.equal(card('came','2001-cloze-s4').contextualMeaning,'发生');
 assert.equal(card('of','2001-cloze-s1').structures[0].pattern,'the trial of Rosemary West');
 assert.equal(card('of','question-200111-prompt').structures[0].pattern,'the ___ of privacy controls');
 assert.equal(card('did','2001-cloze-s3').collocations[0],'offer sufficient control');
 assert.equal(card('after','2001-cloze-s7').collocations[0],'was sentenced to 10 life sentences');
 assert.match(card('binding','2001-cloze-s5').partOfSpeech,/adj/);
 assert.match(card('sentences','2001-cloze-s7').grammarSummary,/sentenced.*动词.*sentences.*名词/);
 assert.match(card('have','2001-cloze-s8').grammarSummary,/完成不定式/);
 assert.match(card('might','2001-cloze-s9').grammarSummary,/可能风险/);
 assert.match(card('with','question-200116-option-A').grammarSummary,/负责照管者/);
 assert.match(card('as','question-200101-option-D').grammarSummary,/举例|例子/);
 assert.match(card('as','question-200106-option-D').grammarSummary,/连|候选/);
 assert.match(card('present','question-200108-option-A').partOfSpeech,/v/);
 assert.match(card('Publication','question-200109-option-B').partOfSpeech,/n/);
 assert.match(card('that','question-200119-option-D').grammarSummary,/concerns/);
 assert.equal(card('have','2001-p1-s10').structures[0].pattern,'have increasingly become acceptable');
 assert.equal(card('with','2010-p2-s19').structures[0].pattern.includes('past participle'),true);
});

test("2001完形题目证据围绕语法搭配，保留近义选项的真实适用范围", () => {
 for(const q of article.questions){
  assert.equal(Object.keys(q.reasoning.options).length,4);
  for(const o of q.options){const r=q.reasoning.options[o.key];assert.equal(r.reasoning,q.explanations[o.key]);if(o.key!==q.answer)assert.ok(['语法不符','搭配不符','语境不符'].includes(r.errorType));}
  for(const path of q.reasoning.locationPolicy.paths)assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:path.groups.map(g=>g[0])},article.sentences.map(s=>s.id)).passed,true);
  assert.equal(assessLocation(q.reasoning,{scope:q.reasoning.scope,sentenceIds:article.sentences.map(s=>s.id)},article.sentences.map(s=>s.id)).passed,false);
 }
 assert.match(article.questions[1].explanations.B,/不能概括/);
 assert.match(article.questions[8].explanations.A,/语法上并非不可能/);
 assert.match(article.questions[11].explanations.D,/宁愿/);
 assert.match(article.questions[17].explanations.A,/不能绝对说不成立/);
 assert.match(article.questions[12].explanations.D,/不能概括.*必须用into/);
 assert.match(article.questions[19].explanations.D,/不是语法不成立/);
 assert.equal(article.questions[16].reasoning.scope,'paragraph');
});

test("2001完形地图区分历史报道、说话者保证和未证实担忧", () => {
 assert.equal(article.guide.paragraphs.length,7);
 assert.equal(article.guide.references.length,8);
 assert.equal(article.guide.timeline.length,4);
 assert.equal(article.guide.voices.length,3);
 assert.match(article.guide.voices[2].boundary,/might.*可能性/);
 assert.match(article.guide.voices[1].boundary,/保证.*作者/);
 for(const s of article.sentences)assert.equal(s.translationAlignment.map(b=>b.english).join(''),s.text);
 assert.ok(buildYearPhraseItems(2001).find(x=>x.source.toLowerCase()==='were said to have received payments'));
});
