import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { auditVocabularySenses } from "../scripts/audit-vocabulary-senses.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root,
  resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const registry = await vite.ssrLoadModule("/app/vocabulary-learning/reviewed-senses.ts");
const { normalizePartOfSpeech, normalizeMeaning } = await vite.ssrLoadModule("/app/vocabulary-learning/semantic-normalization.ts");
let auditPromise;
const getAudit = () => auditPromise ??= auditVocabularySenses(vite);
const sameGloss = (leftPos, leftMeaning, rightPos, rightMeaning) => normalizePartOfSpeech(leftPos) === normalizePartOfSpeech(rightPos) && normalizeMeaning(leftMeaning) === normalizeMeaning(rightMeaning);
const missingEntryPlaceholder = /该词未出现在当前精审语料中|释义会在它所属的真题文章精审时补全|该词的详细用法会随对应真题精审持续补充|待精审|暂无资料/;

test("every reviewed alias resolves to its declared stable identity without conflicting gloss ownership", () => {
  const identities = new Map();
  let aliases = 0;
  for (const table of registry.reviewedSenseTables) for (const [term, groups] of Object.entries(table)) for (const group of groups) {
    assert.ok(group.id && group.pos && group.meaning, term);
    assert.doesNotMatch(JSON.stringify(group), missingEntryPlaceholder, `${term}: a missing-entry placeholder is not a lexical sense or an alias`);
    const key = JSON.stringify([term, group.id, normalizePartOfSpeech(group.pos)]);
    assert.ok(!identities.has(key) || identities.get(key) === group.meaning, `One identity must have one canonical gloss: ${key}`);
    identities.set(key, group.meaning);
    for (const [pos, meanings] of group.forms ?? []) for (const meaning of meanings) {
      const mapped = registry.getReviewedSenseMapping(term, pos, meaning);
      assert.equal(mapped?.id, group.id, `${term}: ${pos} ${meaning}`);
      assert.equal(normalizePartOfSpeech(mapped.pos), normalizePartOfSpeech(group.pos), term);
      aliases++;
    }
  }
  assert.ok(aliases > 0, "the registry must actually validate aliases");
});

test("every reviewed exact source and inflection override resolves to its declared sense", () => {
  let sources = 0;
  for (const table of registry.reviewedSenseTables) for (const [term, groups] of Object.entries(table)) for (const group of groups) {
    for (const [sourceId, pos, meaning, expression] of group.sources ?? []) {
      const mapped = registry.getReviewedSenseMapping(term, pos, meaning, sourceId, expression);
      assert.equal(mapped?.id, group.id, `${term}: ${sourceId}/${expression ?? "*"} ${meaning}`);
      assert.equal(normalizePartOfSpeech(mapped.pos), normalizePartOfSpeech(group.pos), term);
      sources++;
    }
  }
  assert.ok(sources > 0, "broad legacy glosses must have reviewed source mappings");
});

test("explicit annotations retain their explanations and yield to a precise source sense", () => {
  let annotations = 0;
  for (const table of registry.reviewedAnnotationTables) for (const [term, groups] of Object.entries(table)) for (const group of groups) {
    assert.ok(group.reason.trim(), term);
    assert.doesNotMatch(JSON.stringify(group), missingEntryPlaceholder, `${term}: repair the missing entry instead of classifying its placeholder as a dictionary note`);
    const examples = [
      ...(group.forms ?? []).flatMap(([pos, meanings]) => meanings.map(meaning => [pos, meaning, undefined, undefined])),
      ...(group.sources ?? []).map(([sourceId, pos, meaning, expression]) => [pos, meaning, sourceId, expression]),
    ];
    for (const [pos, meaning, sourceId, expression] of examples) {
      const resolved = registry.getReviewedSenseMapping(term, pos, meaning, sourceId, expression);
      const annotation = registry.getReviewedSenseAnnotation(term, pos, meaning, sourceId, expression);
      if (resolved) assert.equal(annotation, undefined, `${term}: a known source remains a sense`);
      else assert.equal(annotation?.reason, group.reason, `${term}: ${meaning}`);
      annotations++;
    }
  }
  assert.ok(annotations > 0, "reviewed composite notes should remain explicitly traceable");
});

test("unreviewed words and unmatched wording cannot inherit an approximate mapping or annotation", () => {
  assert.equal(registry.getReviewedSenseMapping("__unreviewed__", "n.", "工作；作品"), undefined);
  assert.equal(registry.getReviewedSenseAnnotation("__unreviewed__", "n.", "工作；作品"), undefined);
  for (const table of registry.reviewedSenseTables) for (const term of Object.keys(table)) {
    assert.equal(registry.getReviewedSenseMapping(term, "n.", "__not_a_reviewed_gloss__"), undefined, term);
    assert.equal(registry.getReviewedSenseAnnotation(term, "n.", "__not_a_reviewed_gloss__"), undefined, term);
  }
});

test("the whole imported corpus retains every exact source, inflection, gloss, POS and explanation", async () => {
  const audit = await getAudit();
  let checked = 0;
  for (const entry of audit.entries) {
    assert.ok(entry.defaultContext, `${entry.key}: the no-source dictionary entry must be audited`);
    assert.doesNotMatch(entry.defaultContext.meaning, missingEntryPlaceholder, `${entry.key}: an imported word must not have an empty default card`);
    assert.ok(entry.overviewRows.some(row => row.current), `${entry.key}: default entry must remain represented in a sense or an explicit retained annotation`);
    const preserved = entry.overviewRows.flatMap(row => row.sources);
    for (const original of entry.rawContexts) {
      assert.ok(preserved.some(source => ["sourceId", "expression", "partOfSpeech", "meaning", "use", "excerpt", "year", "section"].every(field => source[field] === original[field])), `${entry.key}: missing or rewritten ${original.sourceId}/${original.expression} ${original.meaning}`);
      checked++;
    }
    for (const row of entry.overviewRows) assert.equal(row.count, row.sources.length ? new Set(row.sources.map(source => source.sourceId)).size : null, `${entry.key}: counts must use distinct real sources`);
  }
  assert.equal(checked, audit.summary.sourceContexts);
});

test("distinct memory identities cannot leave identical normalized POS and gloss rows in the display", async () => {
  const audit = await getAudit();
  assert.deepEqual(audit.entries.flatMap(entry => entry.identicalLabels.map(collision => ({ key: entry.key, ...collision }))), [], "Repair the reviewed identity/alias mapping instead of hiding duplicates only in the UI");
});

test("every source override and composite-note extraction cites exact existing corpus evidence", async () => {
  const audit = await getAudit();
  const corpus = new Map(audit.entries.map(entry => [entry.key, entry]));
  const missingEvidence = [];
  function evidenceFor(term) {
    const entry = corpus.get(term);
    assert.ok(entry, `Reviewed word absent from imported corpus: ${term}`);
    const dictionary = entry.otherMeanings.flatMap(text => {
      const tags = text.match(/\b(?:n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g) ?? [];
      const meaning = text.replace(/\b(?:n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g, "").replace(/^\s*[/／]\s*|\s*[/／]\s*$/g, "").trim();
      return [[tags.join(" / "), meaning], [tags.join(" / "), text], ["", text]];
    });
    const glosses = [...entry.rawContexts.map(context => [context.partOfSpeech, context.meaning]), ...(entry.defaultContext ? [[entry.defaultContext.partOfSpeech, entry.defaultContext.meaning]] : []), ...dictionary,
      ...entry.senseGuides.flatMap(guide => guide.senses.map(sense => [sense.partOfSpeech, sense.meaning]))];
    return { entry, glosses };
  }
  for (const table of registry.reviewedSenseTables) for (const [term, groups] of Object.entries(table)) {
    const { entry, glosses } = evidenceFor(term);
    for (const group of groups) {
      for (const [sourceId, pos, meaning, expression] of group.sources ?? []) {
        if (!entry.rawContexts.some(context => context.sourceId === sourceId && (!expression || context.expression === expression) && sameGloss(context.partOfSpeech, context.meaning, pos, meaning))) missingEvidence.push({ term, group: group.id, type: "source", sourceId, expression, pos, meaning });
      }
      for (const [pos, meaning] of group.fromNotes ?? []) {
        if (!glosses.some(([sourcePos, sourceMeaning]) => sameGloss(sourcePos, sourceMeaning, pos, meaning))) missingEvidence.push({ term, group: group.id, type: "fromNotes", pos, meaning });
      }
    }
  }
  assert.deepEqual(missingEvidence, [], "Every declaration needs exact source/default/extra/guide evidence; investigate each missing citation rather than deleting genuine sources");
});
