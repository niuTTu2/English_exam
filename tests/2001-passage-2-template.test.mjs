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
const { passage2001P2SourceContexts } = await vite.ssrLoadModule("/app/2001-passage-2-contexts.ts");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const { practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
const { assessLocation } = await vite.ssrLoadModule("/app/location-model.ts");
const article = articleContents["2001-p2"];
const card = (text, source) => resolveEntry(text, false, source);
const tokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];

test("2001 Text2按PDF保留四段27句、四题20来源，恢复he异常但不改ID", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2001-passage-2-source.json", import.meta.url)));
  assert.equal(fixture.sourceSha256, "ed26be7b9d1c64262e9241105aab2b5d89da6bac51ff91e666dab656076a4e44");
  assert.deepEqual(article.sentences.map(({ id, number, text }) => ({ id, text, number })), fixture.sentences);
  assert.deepEqual(article.questions.map(q => Object.fromEntries(["id", "number", "prompt", "options", "answer", "sentenceId"].map(k => [k, q[k]]))), fixture.questions);
  assert.deepEqual(article.paragraphs.map(p => p.sentenceIds), fixture.paragraphs.map(ns => ns.map(n => `2001-p2-s${n}`)));
  assert.equal(article.questions.reduce((n, q) => n + 1 + Object.keys(q.analysis.options).length, 0), 20);
  assert.deepEqual(article.questions.map(q => q.answer), ["C", "A", "D", "A"]);
  assert.match(article.sentences[8].text, /will he netted/);
  assert.match(card("he", "2001-p2-s9").grammarSummary, /疑似应校读为be/);
  assert.doesNotMatch(card("he", "2001-p2-s9").partOfSpeech, /pron/);
});

test("2001 Text2复杂句与题目保留真实主谓层级，不补造省略内容", () => {
  const s = n => article.sentences[n - 1];
  assert.equal(s(4).beginnerSyntax.components[0].text, "What was less visible then");
  assert.match(s(7).beginnerSyntax.components.find(c => c.text === "it").function, /形式主语/);
  assert.equal(s(8).beginnerSyntax.clauses[0].predicate, "will be left behind");
  assert.equal(s(13).beginnerSyntax.clauses[0].predicate, "have");
  assert.equal(s(23).textKind, "phrase");
  assert.match(JSON.stringify(s(25).beginnerSyntax.components), /逻辑主语/);
  assert.match(JSON.stringify(s(27).beginnerSyntax.components), /needed.*infrastructures/);
  assert.equal(s(25).beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences.reduce((n, s) => n + s.beginnerSyntax.clauses.length, 0), 20);
  assert.equal(new Set(article.sentences.map(s => s.beginnerSyntax.reading.questions[0].question)).size, 27);
  const q25 = article.questions[0].analysis.options, q27 = article.questions[2].analysis.options, q28 = article.questions[3].analysis.options;
  assert.equal(q25.A.textKind, "phrase");
  assert.equal(q25.B.beginnerSyntax.clauses[0].predicate, "are");
  assert.equal(q25.C.beginnerSyntax.clauses[0].predicate, "must guard");
  assert.ok(Object.values(q27).every(o => o.textKind === "phrase"));
  assert.ok(Object.values(q28).every(o => o.beginnerSyntax.clauses.length === 1));
  assert.deepEqual(q28.D.beginnerSyntax.clauses[0].predicateDetails, [{ function: "宾语", text: "how much control" }]);
});

test("2001 Text2提示真实可点，what两任务只按实际泄露方向关联", () => {
  for (const source of article.sentences) {
    const entries = new Set([...tokens(source.text), ...source.phrases].map(s => s.toLowerCase()));
    for (const task of source.practice) for (const hint of task.hintWords ?? []) assert.ok(entries.has(hint.toLowerCase()), `${source.id}/${task.id}/${hint}`);
  }
  const sources = trainingSources(article), source = article.sentences[3], [range, link] = source.practice;
  assert.deepEqual(practiceHintTargets(sources, "previous-answer", range.id, source.id, range), [taskKey(source.id, range)]);
  assert.deepEqual(new Set(practiceHintTargets(sources, "previous-answer", link.id, source.id, link)), new Set(source.practice.map(t => taskKey(source.id, t))));
  assert.equal(article.sentences.reduce((n, s) => n + s.practice.length, 0), 39);
  assert.equal(article.guide.practice.length, 3);
});

test("2001 Text2来源词卡隔离存在句、形式主语、比较、实义have和两种well", () => {
  assert.equal(card("What", "2001-p2-s4").structures[0].pattern, "What was less visible then");
  assert.match(card("there", "2001-p2-s5").grammarSummary, /reasons/);
  assert.equal(card("As", "2001-p2-s7").contextualMeaning, "随着");
  assert.match(card("it", "2001-p2-s7").grammarSummary, /to universalize access/);
  assert.match(card("more", "2001-p2-s8").partOfSpeech, /det/);
  assert.equal(card("well", "2001-p2-s11").collocations[0], "may well be");
  assert.equal(card("well", "2001-p2-s16").collocations[0], "might well study");
  assert.match(card("have", "2001-p2-s13").partOfSpeech, /实义/);
  assert.equal(card("have", "2001-p2-s25").structures[0].pattern, "have foreign capital helping you build");
  assert.match(card("which", "2001-p2-s25").grammarSummary, /Third Wave infrastructure/);
  assert.match(card("them", "2001-p2-s20").grammarSummary, /them.*设施/);
  assert.equal(card("so", "2001-p2-s17").collocations[0], "do so");
  assert.equal(card("else", "2001-p2-s24").structures[0].pattern, "anywhere else");
  assert.equal(card("mean", "2001-p2-s27").collocations[0], "does mean recognizing");
});

test("2001 Text2题目自身语法和词义不沿用正文定位句", () => {
  assert.equal(card("rich", "question-200125-option-B").contextualMeaning, "富裕的");
  assert.match(card("rich", "question-200125-option-B").grammarSummary, /修饰countries/);
  assert.match(card("worse", "question-200125-option-A").grammarSummary, /bad的比较级/);
  assert.match(card("funds", "question-200126-option-B").partOfSpeech, /n/);
  assert.match(card("support", "question-200127-option-A").partOfSpeech, /n/);
  assert.match(card("building", "question-200127-option-C").partOfSpeech, /动名词/);
  assert.match(card("it", "question-200128-prompt").partOfSpeech, /形式主语/);
  assert.match(card("it", "question-200128-option-A").grammarSummary, /country/);
  assert.match(card("much", "question-200128-prompt").partOfSpeech, /adv/);
  assert.match(card("much", "question-200128-option-D").partOfSpeech, /det/);
  assert.match(card("control", "question-200127-option-B").grammarSummary, /施事/);
  assert.match(card("control", "question-200128-option-D").grammarSummary, /国家.*外国公司/);
  assert.equal(card("over", "question-200126-option-D").collocations[0], "all over the world");
  assert.equal(card("over", "question-200128-option-D").collocations[0], "control over foreign corporations");
});

test("2001 Text2来源知识对应真实词元，保留旧替换及跨篇隔离", () => {
  const sources = new Map([...article.sentences.map(s => [s.id, s.text]), ...article.questions.flatMap(q => [[`question-${q.id}-prompt`, q.prompt], ...q.options.map(o => [`question-${q.id}-option-${o.key}`, o.text])])]);
  for (const [source, entries] of Object.entries(passage2001P2SourceContexts)) for (const [headword, entry] of Object.entries(entries)) {
    const token = tokens(sources.get(source)).find(t => canonicalLemma(t, { articleId: "2001-p2", sourceId: source }) === headword);
    assert.ok(token, `${source}/${headword}必须在来源中出现`);
    assert.equal(card(token, source).contextualMeaning, entry.contextualMeaning);
    assert.equal(card(token, source).grammarSummary, getWordKnowledge(headword, { articleId: "2001-p2", sourceId: source }).grammarSummary);
    for (const phrase of entry.preferredCollocations ?? []) assert.ok(getPhraseKnowledge(phrase), phrase);
  }
  assert.ok(card("netted", "2001-p2-s9").contextualSubstitutions.some(s => s.fit === "with-adjustment" && /he/.test(s.adjustment)));
  assert.equal(card("have", "2001-p1-s10").structures[0].pattern, "have increasingly become acceptable");
  assert.match(card("as", "2010-p1-s4").grammarSummary, /auctioneer|called out bids/);
  assert.match(card("with", "2010-p2-s19").structures[0].pattern, /past participle/);
});

test("2001 Text2题目24处词组进入年度统计并指向实际题目来源", () => {
  const items = buildYearPhraseItems(2001); let total = 0;
  for (const q of article.questions) for (const [source, part] of [[`question-${q.id}-prompt`, q.analysis.prompt], ...q.options.map(o => [`question-${q.id}-option-${o.key}`, q.analysis.options[o.key]])]) for (const phrase of part.phrases) {
    total++;
    assert.ok(getPhraseKnowledge(phrase), phrase);
    assert.ok(items.find(item => item.source.toLowerCase() === phrase.toLowerCase()), `${source}/${phrase}`);
    assert.ok(resolveEntry(phrase, true, source).occurrences.some(c => c.sourceId === source));
  }
  assert.equal(total, 24);
});

test("2001 Text2最小证据路径通过，全选正文失败，功能事实不能替代政府动机", () => {
  for (const q of article.questions) {
    for (const path of q.reasoning.locationPolicy.paths) assert.equal(assessLocation(q.reasoning, { scope: q.reasoning.scope, sentenceIds: path.groups.map(g => g[0]) }, article.sentences.map(s => s.id)).passed, true);
    assert.equal(assessLocation(q.reasoning, { scope: q.reasoning.scope, sentenceIds: article.sentences.map(s => s.id) }, article.sentences.map(s => s.id)).passed, false);
  }
  assert.match(article.questions[1].reasoning.options.D.reasoning, /功能.*|动机/);
  assert.equal(article.guide.paragraphs.length, 4);
  assert.equal(article.guide.references.length, 17);
});
