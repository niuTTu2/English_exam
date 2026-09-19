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
const { passage2001P1SourceContexts } = await vite.ssrLoadModule("/app/2001-passage-1-contexts.ts");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const { practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
const { assessLocation } = await vite.ssrLoadModule("/app/location-model.ts");
const article = articleContents["2001-p1"];
const card = (text, source) => resolveEntry(text, false, source);
const tokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];

test("2001 Text1保留PDF核验的四段十六句、四题二十来源和独立答案", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2001-passage-1-source.json", import.meta.url)));
  assert.equal(fixture.sourceSha256, "ed26be7b9d1c64262e9241105aab2b5d89da6bac51ff91e666dab656076a4e44");
  assert.deepEqual(article.sentences.map(({ id, number, text }) => ({ id, text, number })), fixture.sentences);
  assert.deepEqual(article.questions.map(q => Object.fromEntries(["id", "number", "prompt", "options", "answer", "sentenceId"].map(k => [k, q[k]]))), fixture.questions);
  assert.deepEqual(article.paragraphs.map(p => p.sentenceIds), fixture.paragraphs.map(ns => ns.map(n => `2001-p1-s${n}`)));
  assert.equal(article.questions.reduce((n, q) => n + 1 + Object.keys(q.analysis.options).length, 0), 20);
  assert.deepEqual(article.questions.map(q => q.answer), ["D", "B", "A", "C"]);
});

test("2001 Text1复杂关系保留真实层级：what宾语、only if、同位复述及让步范围", () => {
  const s = n => article.sentences[n - 1];
  assert.deepEqual(s(9).beginnerSyntax.clauses[0].predicateDetails, [{ function: "宾语", text: "an acceptable research paper" }]);
  assert.equal(s(6).beginnerSyntax.clauses[0].subject, "the person concerned");
  assert.match(s(10).beginnerSyntax.clauses[0].role, /必要条件/);
  assert.equal(s(12).beginnerSyntax.components[2].function, "表语");
  assert.equal(s(12).beginnerSyntax.components[2].children[1].function, "宾语补足语");
  assert.equal(s(15).beginnerSyntax.components[0].text, s(15).beginnerSyntax.clauses[0].text);
  assert.equal(s(15).beginnerSyntax.components[0].children[0].function, "主语");
  assert.equal(s(14).beginnerSyntax.components[2].children[0].function, "非谓语逻辑主语");
  assert.doesNotMatch(s(2).grammar.join(" "), /主句并列谓语/);
  assert.doesNotMatch(s(9).natural, /原创/);
  assert.doesNotMatch(s(11).natural, /只做/);
  assert.equal(new Set(article.sentences.map(s => s.beginnerSyntax.reading.questions[0].question)).size, 16);
});

test("2001 Text1每个提示都是当前实际点击入口，反馈不会扩散到未声明任务", () => {
  for (const source of article.sentences) {
    const entries = new Set([...tokens(source.text), ...source.phrases].map(s => s.toLowerCase()));
    for (const task of source.practice) for (const hint of task.hintWords ?? []) assert.ok(entries.has(hint.toLowerCase()), `${source.id}/${task.id}/${hint}`);
  }
  const sources = trainingSources(article), source = article.sentences[1], task = source.practice[0];
  assert.deepEqual(practiceHintTargets(sources, "word", "handle", source.id), [taskKey(source.id, task)]);
  const feedback = practiceHintTargets(sources, "previous-answer", task.id, source.id, task);
  assert.deepEqual(new Set(feedback), new Set(source.practice.map(t => taskKey(source.id, t))));
  const reverse = practiceHintTargets(sources, "previous-answer", source.practice[1].id, source.id, source.practice[1]);
  assert.deepEqual(reverse, [taskKey(source.id, source.practice[1])]);
});

test("2001 Text1来源词卡修正比较、数词、助动词和介词的真实串篇故障", () => {
  assert.equal(card("one", "2001-p1-s2").contextualMeaning, "一个；单个");
  assert.equal(card("only", "2001-p1-s3").structures[0].pattern, "only one of a series");
  assert.equal(card("with", "2001-p1-s7").structures[0].pattern, "with its consequent requirement");
  assert.equal(card("more", "2001-p1-s7").structures[0].pattern, "more complex training");
  assert.equal(card("more", "question-200121-prompt").structures[0].pattern, "more clearly seen");
  assert.match(card("concerned", "2001-p1-s6").partOfSpeech, /后置/);
  assert.equal(card("values", "2001-p1-s6").contextualMeaning, "价值观");
  assert.equal(card("have", "2001-p1-s10").structures[0].pattern, "have increasingly become acceptable");
  assert.match(card("have", "question-200122-option-D").partOfSpeech, /实义动词/);
  assert.equal(card("there", "question-200122-option-A").structures[0].pattern, "there is little distinction");
  assert.equal(card("little", "question-200122-option-A").contextualMeaning, "几乎没有；很少");
  assert.equal(card("with", "question-200122-option-B").collocations[0], "compete with professionals");
  assert.equal(card("ones", "question-200122-option-D").collocations[0], "no local ones");
  assert.equal(card("against", "question-200123-option-D").structures[0].pattern, "discrimination against amateurs");
  assert.equal(card("to", "question-200123-prompt").contextualMeaning, "为了");
  assert.equal(card("as", "question-200121-prompt").contextualMeaning, "例如");
  assert.equal(card("right", "2001-p1-s10").collocations[0], "in their own right");
});

test("2001 Text1来源知识均对应真实词元，保留旧替换与其他文章语境", () => {
  const sources = new Map([...article.sentences.map(s => [s.id, s.text]), ...article.questions.flatMap(q => [[`question-${q.id}-prompt`, q.prompt], ...q.options.map(o => [`question-${q.id}-option-${o.key}`, o.text])])]);
  for (const [source, entries] of Object.entries(passage2001P1SourceContexts)) for (const [headword, entry] of Object.entries(entries)) {
    const token = tokens(sources.get(source)).find(t => canonicalLemma(t, { articleId: "2001-p1", sourceId: source }) === headword);
    assert.ok(token, `${source}/${headword}必须在实际来源中出现`);
    assert.equal(card(token, source).contextualMeaning, entry.contextualMeaning);
    assert.equal(card(token, source).grammarSummary, getWordKnowledge(headword, { articleId: "2001-p1", sourceId: source }).grammarSummary);
    for (const phrase of entry.preferredCollocations ?? []) assert.ok(getPhraseKnowledge(phrase), phrase);
  }
  assert.ok(card("accumulation", "2001-p1-s1").contextualSubstitutions.some(s => s.label === "expansion"));
  assert.match(card("with", "2010-p2-s19").structures[0].pattern, /past participle/);
  assert.equal(card("more", "question-201029-option-A").structures[0].pattern, "more + uncountable noun");
  assert.match(card("as", "2010-p1-s4").grammarSummary, /auctioneer|called out bids/);
});

test("2001 Text1题目词组进入年度索引，实际来源不能被定位句替代", () => {
  const items = buildYearPhraseItems(2001);
  for (const q of article.questions) for (const [source, part] of [[`question-${q.id}-prompt`, q.analysis.prompt], ...q.options.map(o => [`question-${q.id}-option-${o.key}`, q.analysis.options[o.key]])]) for (const phrase of part.phrases) {
    const knowledge = getPhraseKnowledge(phrase);
    assert.ok(knowledge, phrase);
    const item = items.find(item => item.source.toLowerCase() === phrase.toLowerCase());
    assert.ok(item, `${source}/${phrase}必须进入年度词组`);
    assert.ok(resolveEntry(phrase, true, source).occurrences.some(c => c.sourceId === source), `${source}/${phrase}来源不可串到正文定位句`);
  }
});

test("2001 Text1推断题与例证题接受合理路径，全选正文不能算定位通过", () => {
  for (const q of article.questions) {
    const policy = q.reasoning.locationPolicy;
    for (const path of policy.paths) {
      const selected = path.groups.map(group => group[0]);
      assert.equal(assessLocation(q.reasoning, { scope: q.reasoning.scope, sentenceIds: selected }, article.sentences.map(s => s.id)).passed, true);
    }
    assert.equal(assessLocation(q.reasoning, { scope: q.reasoning.scope, sentenceIds: article.sentences.map(s => s.id) }, article.sentences.map(s => s.id)).passed, false);
  }
  assert.match(article.questions[0].reasoning.paraphrases[0].limit, /心理学没有实验/);
  assert.equal(article.questions[2].reasoning.options.B.errorType, "把局部当全文");
});
