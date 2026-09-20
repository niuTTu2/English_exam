import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root,
  resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
const { buildSenseOverview } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview.ts");
const { resolveReviewedSense } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-registry.ts");
const rows = key => buildSenseOverview(resolveEntry(key, false));
const atSource = (key, sourceId) => rows(key).filter(row => row.sources.some(source => source.sourceId === sourceId));

test("default-only mixed summaries remain inspectable without becoming extra lexical senses", () => {
  for (const key of ["her", "little", "once", "till", "whatever"]) {
    const value = resolveEntry(key, false);
    const summary = rows(key).find(row => row.meaning === value.contextualMeaning);
    assert.ok(summary?.annotationReason, `${key}: default summary is retained as an explicit note`);
  }
  const otherwise = rows("otherwise");
  assert.equal(otherwise.filter(row => !row.annotationReason).length, 1, "otherwise synonymous default wording shares its existing sense");
  assert.equal(rows("while").some(row => !row.annotationReason && row.partOfSpeech.includes("/")), false, "an exact contrast gloss is not a noun/verb mixed sense");
});

test("whole all-but and not-only structures cannot inflate plain contrast frequency", () => {
  for (const sourceId of ["2010-p1-s2", "2001-p1-s9", "2012-p2-s3"]) {
    const matched = atSource("but", sourceId);
    assert.ok(matched.length > 0);
    assert.ok(matched.every(row => row.annotationReason), sourceId);
  }
  assert.equal(resolveReviewedSense("but", "word", "conj./prep.", "但是；然而", "2010-p1-s2", "but"), undefined,
    "a reviewed exact-source annotation must block older broad contrast aliases");
});

test("real sources distinguish direction, predicative state and time versus topic", () => {
  assert.equal(atSource("down", "2010-p1-s7").find(row => !row.annotationReason)?.partOfSpeech, "adv.");
  assert.equal(atSource("down", "2010-p1-s11").find(row => !row.annotationReason)?.partOfSpeech, "adj.");
  assert.equal(atSource("about", "2010-p1-s14").find(row => !row.annotationReason)?.partOfSpeech, "adv.");
  assert.equal(atSource("about", "2011-p4-s6").find(row => !row.annotationReason)?.partOfSpeech, "prep.");
});

test("as role, time, degree and manner retain separate source identities and POS", () => {
  const examples = [["2011-p5-s11", "prep."], ["2010-cloze-s6", "conj."], ["2011-p5-s7", "adv."], ["2012-p5-s23", "conj."]];
  const matched = examples.map(([sourceId, pos]) => {
    const row = atSource("as", sourceId).find(value => !value.annotationReason);
    assert.ok(row, sourceId);
    assert.equal(row.partOfSpeech, pos, sourceId);
    return row.id;
  });
  assert.equal(new Set(matched).size, examples.length);
});

test("a retained deduction sense receives no invented count from mixed must summaries", () => {
  const must = rows("must");
  const deduction = must.find(row => row.meaning === "一定；必然（推断）");
  assert.ok(deduction);
  assert.equal(deduction.count, null);
  assert.equal(deduction.sources.length, 0);
  assert.equal(atSource("must", "cloze-s1").find(row => !row.annotationReason)?.meaning, "必须；应当");
});

test("additional default entry audit removes pronoun wording duplicates and keeps real alternatives", () => {
  assert.equal(rows("him").filter(row => !row.annotationReason).length, 1);
  assert.equal(rows("him").find(row => !row.annotationReason)?.meaning, "他（宾格）");
  assert.equal(rows("itself").filter(row => !row.annotationReason).length, 1);
  const us = rows("us").filter(row => !row.annotationReason);
  assert.equal(us.length, 1);
  assert.equal(us[0].meaning, "美国", "actual imported US contexts must not be relabeled as the unrelated pronoun us");
  const whether = rows("whether");
  assert.equal(whether.find(row => row.meaning === "是否")?.count, 6);
  assert.equal(whether.find(row => row.meaning === "不论（whether ... or ...）")?.count, null);
  assert.ok(whether.find(row => row.meaning === "是否；不论")?.annotationReason);
  assert.equal(rows("would").find(row => row.meaning === "过去常常会")?.count, 1);
  assert.equal(rows("would").filter(row => !row.annotationReason).length, 1, "an obsolete generated fallback cannot create unattested lexical senses");
});

test("remaining shared-translation candidates preserve true boundaries and fix source misclassification", () => {
  assert.equal(atSource("so", "p2-s22").find(row => !row.annotationReason)?.meaning, "如此；这么（程度）");
  assert.equal(atSource("so", "2001-p2-s17").find(row => !row.annotationReason)?.meaning, "如此；那样（替代前述内容）");
  assert.equal(atSource("have", "2001-p2-s11").find(row => !row.annotationReason)?.partOfSpeech, "v.");
  assert.equal(atSource("have", "2012-p4-s7").find(row => !row.annotationReason)?.partOfSpeech, "aux.");
  assert.notEqual(atSource("have", "p2-s11").find(row => !row.annotationReason)?.id,
    atSource("have", "p1-s2").find(row => !row.annotationReason)?.id, "childbirth is distinct from general possession");
  assert.notEqual(atSource("still", "translation-s33").find(row => !row.annotationReason)?.id,
    atSource("still", "2001-p2-s16").find(row => !row.annotationReason)?.id, "comparative emphasis is distinct from continuation");
  const veryExplanation = rows("very").find(row => row.meaning.includes("副词义不能覆盖"));
  assert.ok(veryExplanation?.annotationReason, "a teaching paragraph is not an extra lexical sense");
});
