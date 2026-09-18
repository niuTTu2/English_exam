import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
const { assessLocation } = await vite.ssrLoadModule("/app/location-model.ts");
const { practiceHintTargets } = await vite.ssrLoadModule("/app/learning-model.ts");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const article = articleContents["2012-p1"];
const s = n => article.sentences[n - 1];
const tokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];

test("2012 Text 1原卷五段与训练层共享稳定句ID，深层关系不扁平化", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-p1.json", import.meta.url)));
  assert.deepEqual(article.paragraphs.map(p => p.sentenceIds.map(id => article.sentences.find(s => s.id === id).text).join(" ")), fixture.paragraphs.map(p => p.text));
  assert.deepEqual(article.questions.map(q => q.answer), ["A","C","D","B","A"]);
  const policy = s(3).beginnerSyntax.components.at(-1);
  assert.match(policy.children[0].children[0].text, /^that with the exception/);
  assert.equal(policy.children[0].children[0].children[0].text, "with the exception of some advanced courses");
  const ensure = s(16).beginnerSyntax.components.at(-1);
  assert.equal(ensure.children[0].children[0].text, "students receive");
  assert.equal(ensure.children[1].children[0].text, "than they are willing to review and correct");
  assert.equal(s(16).beginnerSyntax.clauses.at(-1).predicate, "are");
  assert.deepEqual(s(16).beginnerSyntax.clauses.at(-1).predicateDetails, [{ function: "表语", text: "willing to review and correct" }]);
});

test("2012 Text 1任务提示匹配真实入口，标题全选和24题单侧条件不能过关", () => {
  for (const sentence of article.sentences) {
    const actual = new Set([...tokens(sentence.text), ...sentence.phrases].map(text => text.toLowerCase()));
    for (const task of sentence.practice) for (const hint of task.hintWords ?? []) assert.ok(actual.has(hint.toLowerCase()), `${sentence.id}/${task.id}不是实际查词入口：${hint}`);
  }
  const sources = trainingSources(article);
  assert.ok(practiceHintTargets(sources, "word", "scorned", s(1).id).some(key => key.includes("two-been")));
  assert.deepEqual(practiceHintTargets(sources, "word", "Los", s(2).id), []);
  const q24 = article.questions.find(q => q.number === 24), q25 = article.questions.find(q => q.number === 25);
  assert.equal(assessLocation(q24.reasoning, { scope: "paragraph", sentenceIds: [s(14).id] }, article.sentences.map(s=>s.id)).passed, false);
  assert.equal(assessLocation(q24.reasoning, { scope: "paragraph", sentenceIds: [s(14).id, s(15).id] }, article.sentences.map(s=>s.id)).passed, true);
  assert.equal(assessLocation(q25.reasoning, { scope: "whole-passage", sentenceIds: article.sentences.map(s=>s.id) }, article.sentences.map(s=>s.id)).passed, false);
  assert.match(article.questions.find(q=>q.number===23).reasoning.options.C.reasoning, /并非毫不相关/);
});

test("2012 Text 1词卡隔离熟词语法与题目义项，优先搭配贴合当前来源", () => {
  for (const [word, source, pos, meaning, pattern] of [
    ["works", "2012-p1-s12", /v\./, /奏效/, /works best/],
    ["move", "2012-p1-s14", /v\./, /着手/, /move to reduce/],
    ["key", "question-201224-prompt", /adj\./, /关键/, /key question/],
    ["places", "question-201224-option-C", /v\./, /施加/, /places extra burdens/],
    ["counts", "question-201224-option-B", /v\./, /重要/, /counts much in schooling/],
    ["Approach", "question-201225-option-A", /n\./, /办法/, /Faulty Approach/],
  ]) {
    const entry = resolveEntry(word, false, source);
    assert.match(entry.partOfSpeech, pos); assert.match(entry.contextualMeaning, meaning);
    assert.match(entry.collocationDetails[0].label, pattern);
    assert.ok(entry.collocationDetails[0].target);
    assert.match(entry.structures[0].pattern, pattern);
  }
  for (const source of ["2012-p1-s1","2012-p1-s7","2012-p1-s8","2012-p1-s11","2012-p1-s14","2012-p1-s15","2012-p1-s18","question-201221-prompt","question-201223-prompt","question-201224-option-B"]) assert.doesNotMatch(resolveEntry("it", false, source).grammarSummary, /病毒|infected|success history/);
  assert.match(resolveEntry("while", false, "2012-p1-s17").grammarSummary, /时间/);
  assert.match(resolveEntry("as", false, "2012-p1-s8").grammarSummary, /数量/);
  assert.match(resolveEntry("may", false, "2012-p1-s3").contextualMeaning, /允许/);
});
