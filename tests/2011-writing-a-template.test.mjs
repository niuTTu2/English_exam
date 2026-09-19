import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents, allSentences } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents["2011-writing-a"];

test("2011写作A完整保留原题六句、人物角色、两个目的及约100词要求", () => {
  const source = JSON.parse(readFileSync(new URL("fixtures/2011-writing-a.json", import.meta.url), "utf8"));
  const normalize = text => text.replace(/\s+/g, " ").trim();
  assert.equal(source.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(source.paragraphs.map(paragraph => paragraph.text).join(" ")));
  assert.deepEqual(article.sentences.map(sentence => sentence.id), Array.from({ length: 6 }, (_, index) => `2011-writing-a-s${index + 1}`));
  assert.equal(article.questions.length, 0);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201147); assert.equal(task.number, 47); assert.equal(task.points, 10);
  assert.deepEqual(task.wordLimit, { mode: "about", count: 100 });
  assert.deepEqual(task.instructions, article.sentences);
  for (const sample of task.sample.english.filter(text => text.length > 40)) assert.ok(!allSentences.some(sentence => sentence.text === sample), "参考范文不能计入原卷语料");
});

test("写作指令精确区分被动、双宾语、并列目的与疑问词不定式", () => {
  const flatten = components => components.flatMap(component => [component, ...flatten(component.children ?? [])]);
  const [first, second, , , fifth, sixth] = article.sentences;
  assert.equal(first.beginnerSyntax.clauses.length, 1);
  assert.equal(first.beginnerSyntax.clauses[0].predicate, "has just been admitted");
  assert.equal(second.beginnerSyntax.clauses.length, 0, "how to不是有限从句");
  const components = flatten(second.beginnerSyntax.components);
  assert.ok(components.some(component => component.text === "prepared" && component.function === "表语"));
  assert.ok(components.some(component => component.text === "how to get prepared for university life" && component.function === "介词宾语"));
  assert.equal(second.beginnerSyntax.components[1].function, "间接宾语");
  assert.equal(second.beginnerSyntax.components[2].function, "直接宾语");
  assert.match(second.beginnerSyntax.components[3].text, /^to 1\)congratulate.*2\)give.*university life$/);
  assert.equal(fifth.beginnerSyntax.components[1].text, "Zhang Wei");
  assert.equal(sixth.beginnerSyntax.components.at(-1).function, "分值信息");
});

test("七项指令训练保留真实提示和明确反馈方向，不虚构篇章地图或作文评分", async () => {
  const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
  const { practiceHintTargets, taskKey, rangeTokens, selectedRange } = await vite.ssrLoadModule("/app/learning-model.ts");
  const sources = trainingSources(article);
  assert.equal(sources.length, 6); assert.equal(sources.reduce((sum, source) => sum + source.practice.length, 0), 7);
  assert.equal(article.guide, undefined);
  for (const source of sources) {
    const labels = new Set([...(source.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? []), ...source.phrases].map(label => label.toLowerCase()));
    for (const task of source.practice) {
      assert.equal(task.revision, 1);
      for (const label of task.hintWords) assert.ok(labels.has(label.toLowerCase()), `${source.id}/${label}`);
      if (task.kind === "range") {
        const start = source.text.indexOf(task.answer), tokens = rangeTokens(source.text);
        assert.equal(selectedRange(source.text, tokens.findIndex(token => token.start === start), tokens.findIndex(token => token.end === start + task.answer.length)), task.answer);
      }
    }
  }
  const forbidden = sources[3].practice[0], replacement = sources[4].practice[0];
  assert.ok(practiceHintTargets(sources, "previous-answer", "", sources[3].id, forbidden).includes(taskKey(sources[4].id, replacement)));
  assert.ok(practiceHintTargets(sources, "previous-answer", "", sources[4].id, replacement).includes(taskKey(sources[3].id, forbidden)));
  assert.ok(!practiceHintTargets(sources, "previous-answer", "", sources[4].id, replacement).includes(taskKey(sources[2].id, sources[2].practice[0])));
});

test("写作词卡按六个指令来源区分介词、不定式、状态与禁止要求", async () => {
  const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { getPhraseKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
  const card = (number, word) => resolveEntry(word, false, `2011-writing-a-s${number}`);
  assert.equal(card(1, "to").partOfSpeech, "prep.");
  assert.equal(card(2, "to").partOfSpeech, "不定式标记");
  assert.match(card(2, "for").grammarSummary, /university life/);
  assert.doesNotMatch(card(2, "for").grammarSummary, /seed|insurance/);
  assert.equal(card(2, "prepared").contextualMeaning, "准备好的");
  assert.match(card(2, "prepared").partOfSpeech, /^adj/);
  assert.equal(card(2, "on").contextualMeaning, "关于");
  assert.equal(card(3, "on").contextualMeaning, "在……上");
  assert.match(card(4, "not").use, /署名/); assert.doesNotMatch(card(4, "not").use, /frequently/);
  assert.equal(card(4, "Do").collocations[0], "Do not sign your own name");
  assert.equal(card(6, "write").collocations[0], "Do not write your address");
  assert.equal(card(6, "your").collocations[0], "your address");
  for (const sentence of article.sentences) for (const word of new Set(sentence.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? [])) {
    const entry = resolveEntry(word, false, sentence.id);
    for (const phrase of entry.collocations) assert.ok(getPhraseKnowledge(phrase), `${sentence.id}/${word}/${phrase}`);
    for (const structure of entry.structures ?? []) assert.ok(structure.pattern && structure.meaning && structure.rule);
  }
});
