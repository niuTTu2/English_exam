import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { StudySentence, resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const { practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
const { getWordKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
const article = articleContents.p3, sentence = n => article.sentences[n - 1];
const fixture = JSON.parse(readFileSync(new URL("fixtures/2000-passage-3-source.json", import.meta.url), "utf8"));
const card = (word, source) => resolveEntry(word, false, source);
const decode = text => text.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

test("2000 Text 3保持原卷四段、13句、19—22题与原始措辞", () => {
  assert.deepEqual(article.sentences.map(({ id, text }) => ({ id, text })), fixture.sentences);
  assert.deepEqual(article.questions.map(({ id, prompt, options, answer }) => ({ id, prompt, options, answer })), fixture.questions);
  assert.deepEqual(article.paragraphs.map(p => p.sentenceIds.map(id => Number(id.replace("p3-s", "")))), fixture.paragraphs);
  assert.match(sentence(3).text, /conditionally speeding up/);
  assert.match(sentence(3).translationNotes.join(" "), /原卷|原文/);
  assert.equal(article.sentences.reduce((n, s) => n + s.practice.length, 0), 22);
  assert.equal(article.guide.practice.length, 3);
});

test("让步、真正主语、till从句和末段原则都有准确人工范围", () => {
  const whatever = sentence(2).beginnerSyntax.clauses.find(c => c.marker === "whatever");
  assert.match(whatever.type, /让步/);
  assert.ok(whatever.predicateDetails.some(d => d.text === "whatever" && /表语/.test(d.function)));
  const till = sentence(3).beginnerSyntax.clauses.find(c => c.marker === "till");
  assert.equal(till.text, "till now we live in a world of noise and violence and speed");
  assert.equal(till.subject, "we"); assert.equal(till.predicate, "live");
  assert.equal(sentence(3).beginnerSyntax.clauses.length, 2);
  const subjects = sentence(10).beginnerSyntax.components.filter(c => /真正主语/.test(c.function));
  assert.equal(subjects.length, 2);
  assert.ok(subjects[0].text.startsWith("to read") && subjects[1].text.startsWith("to find"));
  assert.equal(sentence(12).beginnerSyntax.clauses[0].type, "同位语从句");
  assert.match(sentence(12).beginnerSyntax.reading.focus, /原则|前提/);
  assert.match(article.questions.find(q => q.id === 22).reasoning.paraphrases.map(p => p.limit).join(" "), /持续|寿命|年限/);
});

test("所有Text 3提示标签都是讲解解锁前可点击的实际词形或原文词组", () => {
  for (const item of article.sentences) {
    const html = renderToStaticMarkup(React.createElement(StudySentence, { sentence: item, mode: "words", showPhrases: true, isExpanded: false, isMarked: false, note: "", onToggle() {}, onMark() {}, onTerm() {}, onNote() {} }));
    const labels = new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(m => decode(m[1]).toLowerCase()));
    for (const task of item.practice) for (const label of task.hintWords ?? []) assert.ok(labels.has(label.toLowerCase()), `${item.id}/${task.id}: ${label}`);
  }
  const sources = trainingSources(article), source = sentence(10), subjects = source.practice.find(t => t.id === "two-real-subjects"), story = source.practice.find(t => t.id === "story-versus-line"), bridge = source.practice.find(t => t.id === "bridge-clause");
  const affected = practiceHintTargets(sources, "previous-answer", subjects.id, source.id, subjects);
  assert.ok(affected.includes(taskKey(source.id, story)));
  assert.ok(!affected.includes(taskKey(source.id, bridge)), "真正主语反馈未给off从句范围，不污染定语从句任务");
  const theory = sentence(2).practice.find(t => t.id === "theory-reference"), concession = sentence(2).practice.find(t => t.id === "concession-layers");
  assert.ok(!practiceHintTargets(sources, "previous-answer", concession.id, sentence(2).id, concession).includes(taskKey(sentence(2).id, theory)));
});

test("同句异形、题干选项及结构知识按真实来源解释", () => {
  assert.match(card("speeding", "p3-s3").partOfSpeech, /^v\./);
  assert.match(card("speed", "p3-s3").partOfSpeech, /^n\./);
  assert.equal(card("speed", "p3-s3").contextualMeaning, "速度");
  assert.match(card("falling", "p3-s10").partOfSpeech, /动名词/);
  assert.equal(card("notes", "p3-s10").contextualMeaning, "注释");
  assert.equal(card("will", "p3-s8").contextualMeaning, "意愿");
  assert.equal(card("type", "p3-s8").contextualMeaning, "印刷字体");
  assert.equal(card("novel", "question-20-prompt").contextualMeaning, "新颖的");
  assert.match(card("review", "question-19-option-B").partOfSpeech, /^n\./);
  assert.match(card("using", "question-21-option-D").partOfSpeech, /动名词/);
  assert.match(card("more", "question-22-option-D").use, /类别/);
  assert.match(getWordKnowledge("it", { articleId: "p3", sourceId: "p3-s10" }).grammarRole, /形式/);
  assert.match(getWordKnowledge("it", { articleId: "p3", sourceId: "p3-s11" }).grammarRole, /具体/);
  assert.match(getWordKnowledge("however", { articleId: "p3", sourceId: "p3-s1" }).grammarRole, /让步/);
  assert.match(getWordKnowledge("however", { articleId: "p3", sourceId: "p3-s2" }).grammarRole, /转折/);
  assert.match(getWordKnowledge("consist", { articleId: "p3", sourceId: "p3-s10" }).grammarRole, /不及物/);
  assert.equal(card("regarded", "p3-s1").contextualSubstitutions.find(s => s.label === "consider").fit, "with-adjustment");
});
