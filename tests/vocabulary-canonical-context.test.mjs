import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
const { buildSenseOverview } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview.ts");
const { SenseOverviewPanel } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview-panel.tsx");
const { createMemory, memoryId, mergeCandidate } = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const { memoryGroups, memorySemanticKey } = await vite.ssrLoadModule("/app/vocabulary-learning/memory-groups.ts");
const { importedEntryContext } = await vite.ssrLoadModule("/app/vocabulary-learning/imported-entry-fallback.ts");
const now = new Date(2026, 8, 20, 10).getTime();

function candidate(entry, context, sourceId) {
  return { entry: { ...entry, contextualMeaning: context.meaning, partOfSpeech: context.partOfSpeech }, context: {
    id: `${sourceId}:${context.expression}`, sourceId, articleId: "fixture", year: 2012, sourceType: "sentence", expression: context.expression,
  } };
}

test("same-source patent and health forms resolve independently without changing stable word keys", () => {
  for (const [word, sourceId, expressions, expectedPOS] of [
    ["patents", "2012-p3-s2", ["patents", "patented"], ["n", "v"]],
    ["health", "2010-cloze-s13", ["health", "healthy"], ["n", "adj"]],
  ]) {
    const entry = resolveEntry(word, false, sourceId);
    const contexts = entry.occurrences.find(source => source.sourceId === sourceId).contexts;
    const memories = expressions.map(expression => {
      const context = contexts.find(item => item.expression === expression);
      assert.ok(context, `${sourceId}:${expression} must be an actual imported form`);
      return createMemory(candidate(entry, context, sourceId), now);
    });
    assert.deepEqual(memories.map(memory => memory.partOfSpeech), expectedPOS);
    assert.ok(memories.every(memory => memory.termKey === entry.key));
    assert.equal(new Set(memories.map(memory => memory.id)).size, 2);
    const legacy = Object.fromEntries(memories.map((memory, i) => {
      const senseId = `source:${sourceId}|${expressions[i]}`;
      const context = contexts.find(item => item.expression === expressions[i]);
      const saved = { ...memory, senseId, id: memoryId(entry.key, "word", senseId, "adj/n/v"), partOfSpeech: context.partOfSpeech, meaning: context.meaning, dueAt: now + i * 86400000 };
      return [saved.id, saved];
    }));
    const before = structuredClone(legacy);
    assert.equal(memoryGroups(legacy).groups.length, 2, "a source ID without its expression cannot collapse two actual senses");
    assert.deepEqual(legacy, before, "read-time classification cannot rewrite historical IDs, meanings or due dates");
    const sequential = {};
    for (const expression of expressions) {
      const context = contexts.find(item => item.expression === expression);
      const item = candidate(entry, context, sourceId);
      // Existing corpus word context IDs intentionally lack a form suffix.
      item.context.id = `${sourceId}:word:${entry.key}`;
      item.context.expression = expression[0].toUpperCase() + expression.slice(1);
      const memory = mergeCandidate(sequential, item, now);
      sequential[memory.id] = memory;
    }
    assert.equal(Object.keys(sequential).length, 2, "marking the second form must not inherit the first sense just because their legacy context IDs match");
    assert.deepEqual(Object.values(sequential).map(memory => memory.partOfSpeech), expectedPOS);
  }
});

test("the but in all but two cannot inherit the ordinary conjunction's semantic group", () => {
  const entry = resolveEntry("but", false, "2010-p1-s2");
  const context = entry.occurrences.find(source => source.sourceId === "2010-p1-s2").contexts.find(item => item.expression.toLowerCase() === "but");
  const memory = createMemory(candidate(entry, context, "2010-p1-s2"), now);
  const ordinary = createMemory(candidate(entry, { expression: "but", meaning: "但是；而是", partOfSpeech: "conj." }, "ordinary-fixture"), now);
  assert.notEqual(memorySemanticKey(memory), memorySemanticKey(ordinary));
  const rows = buildSenseOverview(entry, "2010-p1-s2");
  const containing = rows.filter(row => row.sources.some(source => source.sourceId === "2010-p1-s2"));
  assert.equal(containing.length, 1);
  assert.ok(containing[0].annotationReason, "the complete quantity structure is retained as usage, not a new contrast sense");
});

test("composite dictionary notes retain their text while each explicitly stated meaning remains visible without invented counts", () => {
  const entry = resolveEntry("letter", false);
  const rows = buildSenseOverview(entry);
  const alphabet = rows.find(row => row.meaning === "字母");
  const literal = rows.find(row => row.meaning === "字面条文");
  assert.ok(alphabet && literal);
  assert.equal(alphabet.count, null);
  assert.ok(rows.some(row => row.annotationReason && row.meaning.includes("a capital letter")));
  const html = renderToStaticMarkup(React.createElement(SenseOverviewPanel, { entry }));
  assert.match(html, /<strong>字母<\/strong>/);
  assert.match(html, /<strong>字面条文<\/strong>/);
  assert.match(html, /<details class="vl-sense-details vl-sense-annotations"><summary>原始用法补充/);
  assert.match(html, /a capital letter/);
  assert.doesNotMatch(html, /class="vl-sense-details vl-sense-annotations" open/);
});

test("bare imported lemmas reuse real inflected contexts; source-specific lookup never borrows another sentence", () => {
  for (const word of ["path", "route", "sow", "vessel", "channel"]) {
    const entry = resolveEntry(word, false);
    assert.ok(entry.occurrences.length, word);
    assert.doesNotMatch(entry.contextualMeaning, /该词未出现在|精审时补全/, word);
    assert.ok(entry.occurrences.some(source => source.contexts?.some(context => context.meaning === entry.contextualMeaning)), word);
  }
  const sources = [{ sourceId: "other", contexts: [{ expression: "fixtures", partOfSpeech: "n.", meaning: "固定装置", use: "原注" }] }];
  const before = structuredClone(sources);
  assert.equal(importedEntryContext(sources, "missing"), undefined);
  assert.equal(importedEntryContext(sources), sources[0].contexts[0]);
  assert.deepEqual(sources, before);
});

test("source POS and usage survive a missing guide meaning while bare imported lemmas retain one matching context", () => {
  const expected = "irrigation channel 指灌溉渠；作动词 channel sth into... 表把资源导向某处。";
  for (const sourceId of ["cloze-s5", "question-6-option-D"]) {
    const entry = resolveEntry("channels", false, sourceId);
    const context = entry.occurrences.find(source => source.sourceId === sourceId).contexts.find(item => item.expression === "channels");
    assert.equal(entry.use, expected, `${sourceId}: the choice explanation must not replace reviewed word usage`);
    assert.equal(entry.use, context.use);
    assert.equal(entry.contextualMeaning, context.meaning);
  }
  for (const [expression, sourceIds, expectedPOS] of [
    ["fertilizers", ["cloze-s4", "question-5-prompt"], "n.（复数）"],
    ["implements", ["cloze-s4", "question-4-prompt"], "n.（复数，工具）"],
  ]) for (const sourceId of sourceIds) {
    const entry = resolveEntry(expression, false, sourceId);
    const context = entry.occurrences.find(source => source.sourceId === sourceId).contexts.find(item => item.expression === expression);
    assert.equal(entry.partOfSpeech, expectedPOS, `${sourceId}: retain the actual plural/source role`);
    assert.equal(entry.partOfSpeech, context.partOfSpeech);
    assert.equal(entry.contextualMeaning, context.meaning);
    assert.equal(entry.use, context.use);
  }
  for (const word of ["path", "route", "sow", "vessel", "channel"]) {
    const entry = resolveEntry(word, false);
    assert.ok(entry.occurrences.some(source => source.contexts?.some(context => context.meaning === entry.contextualMeaning && context.partOfSpeech === entry.partOfSpeech && context.use === entry.use)), `${word}: bare fallback uses one coherent imported context`);
  }
});

test("independently imported nouns and homographs keep their source keys at the default lookup entrance", () => {
  for (const [word, meaning] of [["found", "创建；创立"], ["ruling", "裁决；判决"], ["prompting", "驱策；推动的冲动"],
    ["regarding", "关于"], ["building", "建筑物"], ["feeling", "感情；感觉"]]) {
    const entry = resolveEntry(word, false);
    assert.equal(entry.key, word);
    assert.equal(entry.contextualMeaning, meaning);
    assert.ok(entry.occurrences.some(source => source.contexts.some(context => context.meaning === meaning)));
  }
  assert.notEqual(resolveEntry("found", false).key, resolveEntry("find", false).key);
  assert.notEqual(resolveEntry("ruling", false).key, resolveEntry("rule", false).key);
});
