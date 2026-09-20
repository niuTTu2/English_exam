import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { buildSenseOverview } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview.ts");
const { normalizeMeaning } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-registry.ts");
const { createMemory, mergeCandidate } = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
const now = 1_789_891_200_000;

function entry(key, meaning, partOfSpeech = "n.", occurrences = []) {
  return { key, headword: key, display: key, kind: "word", partOfSpeech, contextualMeaning: meaning,
    use: "具体用法保存在原始语境中", collocations: [], otherMeanings: [], wordFamily: [], confusions: [],
    counts: { form: 500, lemma: 900, family: 1200 }, occurrences };
}
function occurrence(sourceId, meaning, partOfSpeech = "n.", expression = "fixture", use = `在 ${sourceId} 中的具体用法`) {
  return { sourceId, year: 2011, section: "Text 1", excerpt: `The original source ${sourceId}.`, contexts: [{ expression, meaning, partOfSpeech, use }] };
}
function candidate(value, sourceId, meaning = value.contextualMeaning, partOfSpeech = value.partOfSpeech, expression = value.display) {
  return { entry: { ...value, contextualMeaning: meaning, partOfSpeech, display: expression }, context: {
    id: `${sourceId}:${expression.toLowerCase()}`, sourceId, articleId: "fixture-article", year: 2011,
    sourceType: "sentence", expression,
  } };
}

test("real and combines all fourteen synonymous gloss variants into one counted coordination sense", () => {
  const value = resolveEntry("and", false, "2011-cloze-s1");
  const before = JSON.stringify(value);
  const contexts = value.occurrences.flatMap(item => (item.contexts ?? []).map(context => ({ ...context, sourceId: item.sourceId })));
  assert.equal(new Set(contexts.map(context => context.meaning)).size, 14, "the real corpus still exercises the reported fragmentation");
  const rows = buildSenseOverview(value, "2011-cloze-s1");
  assert.equal(rows.length, 1, "和、并且、而且、又以及范围连接用法 belong to one coordination sense");
  assert.equal(rows[0].current, true);
  assert.equal(rows[0].count, new Set(contexts.map(context => context.sourceId)).size);
  assert.ok(rows[0].count > 250, "the merged frequency includes the previously scattered small rows");
  for (const original of contexts) assert.ok(rows[0].sources.some(source => source.sourceId === original.sourceId
    && source.expression === original.expression && source.meaning === original.meaning && source.use === original.use),
  `the source-specific gloss and usage must remain inspectable: ${original.sourceId} / ${original.meaning}`);
  assert.equal(JSON.stringify(value), before, "aggregation must not rewrite frozen content");
});

test("the same semantic resolver prevents new and memory duplicates and keeps all original sources", () => {
  const value = resolveEntry("and", false, "2011-cloze-s1");
  const memories = {};
  const expectedSources = new Set();
  const freshIds = new Set();
  for (const source of value.occurrences) for (const context of source.contexts ?? []) {
    if (!source.sourceId) continue;
    const item = candidate(value, source.sourceId, context.meaning, context.partOfSpeech, context.expression);
    freshIds.add(createMemory(item, now).id);
    const memory = mergeCandidate(memories, item, now);
    memories[memory.id] = memory;
    expectedSources.add(source.sourceId);
  }
  assert.equal(freshIds.size, 1, "same-sense identity must not depend on which variant was learned first");
  assert.equal(Object.keys(memories).length, 1);
  assert.deepEqual(new Set(Object.values(memories)[0].contexts.map(context => context.sourceId)), expectedSources);
});

test("content words also group equivalent descriptions while keeping their domain-specific source glosses", () => {
  for (const [key, expectedMinimum] of [["important", 4], ["problem", 10], ["new", 7]]) {
    const value = resolveEntry(key, false);
    const rows = buildSenseOverview(value);
    const examined = rows.filter(row => row.count !== null);
    assert.equal(examined.length, 1, `${key} must use one core meaning across its wording variants`);
    assert.ok(examined[0].count >= expectedMinimum);
    const expected = value.occurrences.flatMap(source => (source.contexts ?? []).map(context => ({ sourceId: source.sourceId, ...context })));
    assert.equal(examined[0].count, new Set(expected.map(source => source.sourceId)).size);
    for (const source of expected) assert.ok(examined[0].sources.some(item => item.sourceId === source.sourceId && item.meaning === source.meaning && item.use === source.use));
    const ids = new Set(expected.map(source => createMemory(candidate(value, source.sourceId, source.meaning, source.partOfSpeech, source.expression), now).id));
    assert.equal(ids.size, 1, `${key} display grouping and new learning identities must agree`);
  }
});

test("function words group changing referents and clause descriptions without merging different grammatical roles", () => {
  const that = entry("that", "引出担忧内容", "conj.", [occurrence("content-a", "引出担忧内容", "conj."), occurrence("content-b", "引出所知内容", "conj."),
    occurrence("relative", "关系代词，指数据库", "pron."), occurrence("demonstrative", "那（美国当时资金不足）", "pron.")]);
  const thatRows = buildSenseOverview(that, "content-a");
  assert.equal(thatRows.length, 3);
  assert.equal(thatRows.find(row => row.current).count, 2);
  const be = entry("be", "构成被动", "aux.", [occurrence("passive-a", "构成被动", "aux."), occurrence("passive-b", "被动标记", "aux."),
    occurrence("progressive-a", "进行时助动词", "aux."), occurrence("progressive-b", "过去进行时标记", "aux."), occurrence("linking", "是", "v.")]);
  const beRows = buildSenseOverview(be, "passive-a");
  assert.equal(beRows.length, 3);
  assert.deepEqual(beRows.map(row => row.count).sort(), [1, 2, 2]);
  const it = entry("it", "它（美国）", "pron.", [occurrence("country", "它（美国）", "pron."), occurrence("homework", "它（指家庭作业）", "pron."),
    occurrence("formal-subject", "形式主语", "pron."), occurrence("formal-object", "形式宾语（不单独翻译）", "pron.")]);
  const itRows = buildSenseOverview(it, "country");
  assert.equal(itRows.length, 3);
  assert.equal(itRows.find(row => row.current).count, 2, "a new pronoun referent is a new context, not a new word meaning");
});

test("merging synonymous rows counts a source once but preserves its distinct wording and usage", () => {
  const first = occurrence("shared-source", "和", "conj.", "and", "连接主语");
  const second = occurrence("shared-source", "并且", "conj.", "and", "连接两个分句");
  const third = occurrence("another-source", "而且", "conj.", "and", "补充后一项");
  const value = entry("and", "和；并且", "conj.", [first, second, first, third]);
  const [row] = buildSenseOverview(value, "shared-source");
  assert.equal(row.count, 2, "frequency is the source union, never a sum of old row counts");
  assert.equal(row.sources.length, 3, "an exact duplicate disappears, distinct same-source explanations survive");
  assert.deepEqual(new Set(row.sources.filter(source => source.sourceId === "shared-source").map(source => source.use)), new Set(["连接主语", "连接两个分句"]));
});

test("punctuation, synonymous ordering and repeated tokens do not create separate unregistered senses", () => {
  const meanings = ["需求；需要", "需要，需求。", " 需求、需要；需求 ", "需要;需求"];
  assert.equal(new Set(meanings.map(normalizeMeaning)).size, 1);
  const sources = meanings.map((meaning, index) => occurrence(`source-${index}`, meaning, "n.", "fixture"));
  const value = entry("fixture", meanings[0], "n.", sources);
  const rows = buildSenseOverview(value, "source-0");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].count, 4);
  assert.equal(new Set(meanings.map((meaning, index) => createMemory(candidate(value, `source-${index}`, meaning), now).id)).size, 1);
});

test("shared translation fragments cannot bridge genuinely different unreviewed senses", () => {
  const sources = [occurrence("financial", "银行"), occurrence("riverside", "河岸"), occurrence("broad-legacy", "银行；河岸")];
  const value = entry("bank", "银行", "n.", sources);
  const rows = buildSenseOverview(value, "financial");
  assert.equal(rows.length, 3);
  assert.deepEqual(new Set(rows.map(row => row.meaning)), new Set(["银行", "河岸", "银行；河岸"]));
  assert.ok(rows.every(row => row.count === 1), "a broad unclassified legacy gloss must not lend a count to both senses");
  assert.equal(new Set(sources.map(source => createMemory(candidate(value, source.sourceId, source.contexts[0].meaning), now).id)).size, 3);
  const qualified = entry("unreviewed", "状态（物理）", "n.", [occurrence("physical", "状态（物理）"), occurrence("social", "状态（社会）")]);
  assert.equal(buildSenseOverview(qualified, "physical").length, 2, "parenthetical qualifiers are not universally disposable");
});

test("same Chinese translation does not merge different parts of speech or different stable terms", () => {
  const value = entry("unreviewed", "工作", "n.", [occurrence("noun", "工作", "n."), occurrence("verb", "工作", "v.")]);
  const rows = buildSenseOverview(value, "noun");
  assert.equal(rows.length, 2);
  assert.equal(rows.filter(row => row.current).length, 1);
  const noun = createMemory(candidate(value, "noun"), now);
  const verb = createMemory(candidate(value, "verb", "工作", "v."), now);
  const otherTerm = createMemory(candidate({ ...value, key: "another-stable-word" }, "noun"), now);
  const phrase = createMemory(candidate({ ...value, kind: "phrase" }, "noun"), now);
  assert.equal(new Set([noun.id, verb.id, otherTerm.id, phrase.id]).size, 4);
  const research = entry("research", "研究", "n.", [occurrence("research-noun", "研究", "n."), occurrence("research-verb", "研究", "v."), occurrence("research-mixed", "研究", "n./v.")]);
  assert.equal(buildSenseOverview(research, "research-noun").length, 3, "a reviewed alias shared by noun and verb cannot classify a mixed-POS legacy record");
});

test("note keeps every reviewed sense and teaching example while combining only its tone sources", () => {
  const value = resolveEntry("note", false, "2010-p1-s1");
  const rows = buildSenseOverview(value, "2010-p1-s1");
  assert.equal(rows.length, 12);
  for (const guide of value.senseGuide.senses) assert.ok(rows.some(row => row.meaning === guide.meaning && row.example?.english === guide.example.english));
  const tone = rows.find(row => row.current);
  assert.deepEqual(new Set(tone.sources.map(source => source.sourceId)), new Set(["2010-p1-s1", "p5-s5"]));
  assert.equal(tone.count, 2);
  const annotation = rows.find(row => row.meaning === "注释；附注");
  const record = rows.find(row => row.meaning === "笔记；记录");
  assert.notEqual(annotation.id, record.id);
  assert.equal(record.count, null, "a teaching example is never counted as an exam source");
});

test("work preserves artwork, employment, operation and the unresolved mixed-POS legacy gloss", () => {
  const rows = buildSenseOverview(resolveEntry("works", false, "2010-p1-s1"), "2010-p1-s1");
  const artwork = rows.find(row => row.id.includes("reviewed%3Aartwork"));
  const employment = rows.find(row => row.id.includes("reviewed%3Aemployment"));
  const operating = rows.find(row => row.id.includes("reviewed%3Aoperate"));
  assert.equal(artwork.count, 5);
  assert.equal(employment.count, 3);
  assert.equal(operating.count, 2);
  assert.equal(new Set([artwork.id, employment.id, operating.id]).size, 3);
  const broad = rows.find(row => row.meaning === "工作；劳动；起作用");
  assert.equal(broad.count, 1);
  assert.equal(broad.partOfSpeech, "n./v.");
});

test("semantic grouping and canonical labels are independent of source ordering and active context", () => {
  const value = entry("and", "和", "conj.", [occurrence("z-source", "并且", "conj.", "and"), occurrence("a-source", "而且", "conj.", "and")]);
  const first = buildSenseOverview(value, "z-source");
  const reversed = buildSenseOverview({ ...value, contextualMeaning: "而且", occurrences: [...value.occurrences].reverse() }, "a-source");
  assert.deepEqual(first, reversed);
});
