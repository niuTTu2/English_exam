import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { buildSenseOverview } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview.ts");
const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");

const entry = (overrides = {}) => ({
  key: "fixture", headword: "fixture", display: "fixture", kind: "word", partOfSpeech: "n.", contextualMeaning: "甲", use: "本句用法",
  collocations: [], otherMeanings: [], wordFamily: [], confusions: [], counts: { form: 999, lemma: 9999, family: 99999 }, occurrences: [], ...overrides,
});
const occurrence = (sourceId, meaning, partOfSpeech = "n.", overrides = {}) => ({
  sourceId, year: 2010, section: sourceId?.includes("option") ? "第21题选项A" : sourceId?.includes("prompt") ? "第21题题干" : "正文",
  excerpt: "A fixture in its actual source.", contexts: [{ expression: "fixture", meaning, partOfSpeech, use: "该词的本句作用" }], ...overrides,
});
const sense = (id, meaning, partOfSpeech = "n.") => ({ id, meaning, partOfSpeech, use: "既有教学解释", example: { english: "A teaching example.", chinese: "教学例句。" } });

test("real note shows all twelve reviewed senses; only real sense sources contribute counts", () => {
  const note = resolveEntry("note", false, "2010-p1-s1");
  const snapshot = JSON.stringify(note);
  const rows = buildSenseOverview(note, "2010-p1-s1");
  assert.equal(rows.length, 12);
  assert.equal(rows[0].meaning, "调子；基调；意味；情感色彩");
  assert.equal(rows[0].count, 2);
  assert.equal(rows[0].current, true);
  assert.deepEqual(rows[0].sources.map(source => source.sourceId), ["2010-p1-s1", "p5-s5"]);
  assert.equal(rows.find(row => row.meaning === "注释；附注").count, 1);
  assert.equal(rows.find(row => row.meaning === "注意；留意到").count, 1);
  assert.equal(rows.find(row => row.meaning === "笔记；记录").count, null);
  assert.equal(rows.reduce((sum, row) => sum + (row.count ?? 0), 0), 4);
  for (const original of note.senseGuide.senses) assert.ok(rows.some(row => row.meaning === original.meaning && row.example.english === original.example.english));
  assert.equal(JSON.stringify(note), snapshot, "display aggregation cannot mutate corpus or memory data");
});

test("real work counts reviewed source meanings separately and retains the exact old broad wording", () => {
  const rows = buildSenseOverview(resolveEntry("works", false, "2010-p1-s1"), "2010-p1-s1");
  const artwork = rows.find(row => row.id.endsWith("reviewed%3Aartwork"));
  const employment = rows.find(row => row.id.endsWith("reviewed%3Aemployment"));
  const operating = rows.find(row => row.id.endsWith("reviewed%3Aoperate"));
  assert.equal(artwork.count, 5);
  assert.equal(artwork.current, true);
  assert.equal(artwork.partOfSpeech, "n.");
  assert.equal(employment.count, 6);
  assert.equal(operating.count, 3);
  assert.ok(artwork.sources.some(source => source.sourceId === "question-201022-option-D"));
  const broad = employment.sources.find(source => source.sourceId === "p4-s16");
  assert.equal(broad.meaning, "工作；劳动；起作用");
  assert.equal(broad.partOfSpeech, "n./v.");
  assert.deepEqual(new Set(employment.sources.map(source => source.sourceId)), new Set(["2010-p2-s15", "2010-p2-s8", "2012-p5-s14", "2012-p5-s7", "p4-s16", "question-201124-option-C"]));
  assert.equal(operating.sources.some(source => source.sourceId === "p4-s16"), false);
  assert.equal(employment.sources.some(source => source.sourceId === "p4-s16"), true);
  const labour = rows.find(row => row.id.endsWith("reviewed%3Alabour"));
  assert.equal(labour.count, 3);
  assert.equal(labour.partOfSpeech, "v.");
  assert.deepEqual(new Set(labour.sources.map(source => source.sourceId)), new Set(["2011-p5-s18", "2012-p5-s1", "2012-translation-s6"]), "the noun employment count does not absorb the verb working sense");
});

test("frequency ordering includes body, prompt and option, deduplicates sources, and does not promote the current sense", () => {
  const value = entry({ contextualMeaning: "乙", senseGuide: { label: "fixture", senses: [sense("alpha", "甲"), sense("beta", "乙"), sense("gamma", "丙")] }, occurrences: [
    occurrence("s1", "甲"), occurrence("s1", "甲"), occurrence("question-21-prompt", "甲"), occurrence("question-21-option-A", "甲"), occurrence("s2", "乙"),
  ] });
  const rows = buildSenseOverview(value, "s2");
  assert.deepEqual(rows.map(row => [row.meaning, row.count, row.current]), [["甲", 3, false], ["乙", 1, true], ["丙", null, false]]);
  assert.deepEqual(new Set(rows[0].sources.map(source => source.section)), new Set(["正文", "第21题题干", "第21题选项A"]));
  assert.equal(rows[2].sources.length, 0, "the guide's teaching example is not an exam source");
});

test("same source and same sense count once even with two inflections; different POS or meaning stay separate", () => {
  const value = entry({ occurrences: [
    occurrence("s1", "甲", "n.", { contexts: [
      { expression: "fixture", meaning: "甲", partOfSpeech: "n.", use: "名词" },
      { expression: "fixtures", meaning: "甲", partOfSpeech: "n.（复数）", use: "复数" },
      { expression: "fixture", meaning: "甲", partOfSpeech: "v.", use: "动词" },
      { expression: "fixture", meaning: "乙", partOfSpeech: "n.", use: "另一义" },
    ] }),
  ] });
  const rows = buildSenseOverview(value, "s1");
  assert.equal(rows.length, 3);
  assert.ok(rows.every(row => row.count === 1));
  assert.equal(rows.filter(row => row.current).length, 1);
  assert.equal(rows.find(row => row.current).partOfSpeech, "n.");
});

test("unknown totals and unattributed occurrences remain unknown, and POS-free extras never borrow current POS", () => {
  const value = entry({ otherMeanings: ["乙", "v. 丙", "丁 adj.", "甲"], occurrences: [occurrence(undefined, "甲"), { sourceId: "unclassified", year: 2010, section: "正文", excerpt: "No reviewed word sense." }] });
  const rows = buildSenseOverview(value);
  assert.equal(rows.length, 4);
  assert.ok(rows.every(row => row.count === null && row.sources.length === 0));
  assert.equal(rows.find(row => row.meaning === "乙").partOfSpeech, "");
  assert.equal(rows.find(row => row.meaning === "丙").partOfSpeech, "v.");
  assert.equal(rows.find(row => row.meaning === "丁").partOfSpeech, "adj.");
  assert.equal(rows.filter(row => row.meaning === "甲").length, 1);
});

test("an untyped extra cannot choose between matching noun and verb senses", () => {
  const rows = buildSenseOverview(entry({ otherMeanings: ["甲"], occurrences: [occurrence("s1", "甲", "n."), occurrence("s2", "甲", "v.")] }), "s1");
  assert.equal(rows.length, 3);
  assert.equal(rows.find(row => row.partOfSpeech === "").count, null);
  assert.deepEqual(rows.slice(0, 2).map(row => row.count), [1, 1]);
});

test("unregistered synonymous order merges exactly, while unrelated senses and mixed POS stay distinct", () => {
  const rows = buildSenseOverview(entry({ contextualMeaning: "甲；乙", occurrences: [
    occurrence("s2", "乙；甲"), occurrence("s1", "甲；乙"), occurrence("s3", "甲", "v."), occurrence("s4", "甲；乙；丙", "n./v."),
  ] }), "s1");
  assert.equal(rows.length, 3);
  assert.equal(rows[0].count, 2);
  assert.equal(rows[0].current, true);
  assert.equal(rows.find(row => row.partOfSpeech === "n./v.").count, 1);
});

test("ties and identities are deterministic across corpus ordering and opened source; cache is term-local", () => {
  const value = entry({ occurrences: [occurrence("s2", "乙"), occurrence("s1", "甲")] });
  const rows = buildSenseOverview(value, "s1");
  assert.equal(buildSenseOverview(value, "s1"), rows);
  assert.notEqual(buildSenseOverview(value, "s2"), rows);
  const reversed = buildSenseOverview({ ...value, occurrences: [...value.occurrences].reverse() }, "s1");
  assert.deepEqual(reversed, rows);
  assert.deepEqual(rows.map(row => row.id), [...rows.map(row => row.id)].sort());
  assert.deepEqual(buildSenseOverview({ ...value, contextualMeaning: "乙" }, "s2").map(row => [row.id, row.count]), rows.map(row => [row.id, row.count]));
});
