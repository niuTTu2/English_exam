#!/usr/bin/env node
/**
 * Read-only inventory of the currently imported vocabulary and its sense rows.
 * Usage: node scripts/audit-vocabulary-senses.mjs --output /absolute/audit.json
 * Suggestions identify review candidates, never authorize semantic merging.
 */
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const stable = values => [...new Set(values.map(value => JSON.stringify(value)))].sort().map(value => JSON.parse(value));
const hash = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const senseRows = entry => entry.overviewRows.filter(row => !row.annotationReason);
const annotationRows = entry => entry.overviewRows.filter(row => row.annotationReason);
const resolutionFingerprint = entry => hash(stable(entry.overviewRows.map(row => [row.id, row.meaning, row.partOfSpeech, row.count, row.annotationReason ?? null, row.dictionaryDetails ?? []])));

/** Hash exact source evidence, including distinct forms in the same sentence. */
export function senseInputFingerprint(entry) {
  return hash({
    key: entry.key,
    defaultContext: entry.defaultContext ?? null,
    sources: stable(entry.rawContexts.map(context => [context.sourceId, context.expression, context.partOfSpeech, context.meaning, context.use, context.excerpt, context.year, context.section])),
    extras: stable((entry.otherMeaningSources ?? entry.otherMeanings.map(meaning => ({ meaning }))).map(item => [item.meaning, stable(item.sources ?? [])])),
    guides: stable(entry.senseGuides ?? (entry.senseGuide ? [entry.senseGuide] : [])),
  });
}

export function createSenseLedger(audit, reviews, baseline = audit) {
  const decisions = new Map();
  for (const review of reviews) {
    if (!review.key || !["merged", "distinct", "mixed-unresolved"].includes(review.disposition) || !review.reason?.trim()) throw new Error(`Invalid manual review: ${JSON.stringify(review)}`);
    if (decisions.has(review.key)) throw new Error(`Duplicate manual review: ${review.key}`);
    decisions.set(review.key, review);
  }
  const needsReview = new Set([...baseline.entries, ...audit.entries].filter(entry => entry.overviewRows.length > 1).map(entry => entry.key));
  const missing = [...needsReview].filter(key => !decisions.has(key));
  if (missing.length) throw new Error(`Manual review missing for ${missing.length} multi-row words: ${missing.join(", ")}`);
  for (const key of decisions.keys()) if (!audit.entries.some(entry => entry.key === key)) throw new Error(`Review refers to absent term: ${key}`);
  return { schemaVersion: 1, note: "Manually reviewed sense grouping, not a claim that every original dictionary gloss is unambiguous. Exact source/extra/guide changes require a new review; do not auto-refresh this fixture.", summary: {
    terms: audit.entries.length,
    reviewedTerms: decisions.size,
    singleDisplayTerms: audit.entries.length - decisions.size,
    decisions: Object.fromEntries(["merged", "distinct", "mixed-unresolved"].map(disposition => [disposition, [...decisions.values()].filter(review => review.disposition === disposition).length])),
  }, entries: audit.entries.map(entry => ({
    key: entry.key, inputHash: senseInputFingerprint(entry),
    inputs: stable([
      ...entry.rawContexts.map(context => ["context", context.partOfSpeech, context.meaning]),
      ...(entry.defaultContext ? [["default", entry.defaultContext.partOfSpeech, entry.defaultContext.meaning]] : []),
      ...entry.otherMeanings.map(meaning => ["extra", "", meaning]),
      ...(entry.senseGuides ?? (entry.senseGuide ? [entry.senseGuide] : [])).flatMap(guide => guide.senses.map(sense => ["guide", sense.partOfSpeech, sense.meaning])),
    ]),
    evidence: {
      sources: stable(entry.rawContexts.map(context => [context.sourceId, context.expression, context.partOfSpeech, context.meaning])),
      default: entry.defaultContext ? [entry.defaultContext.key ?? null, entry.defaultContext.headword ?? null, entry.defaultContext.expression, entry.defaultContext.partOfSpeech, entry.defaultContext.meaning] : null,
      extras: [...entry.otherMeanings].sort(),
      guides: stable((entry.senseGuides ?? (entry.senseGuide ? [entry.senseGuide] : [])).flatMap(guide => guide.senses.map(sense => [sense.id, sense.partOfSpeech, sense.meaning]))),
    },
    baselineRows: baseline.entries.find(item => item.key === entry.key)?.overviewRows.length ?? entry.overviewRows.length,
    rows: senseRows(entry).length,
    annotationRows: annotationRows(entry).length,
    resolutionHash: resolutionFingerprint(entry),
    disposition: decisions.get(entry.key)?.disposition ?? "single-display",
    reason: decisions.get(entry.key)?.reason ?? "当前聚合仅一行；记录输入边界，不宣称该词已完成多义人工审阅。",
  })) };
}

/** A changed source, new meaning, new lemma or changed grouping all require review. */
export function compareSenseLedger(audit, ledger) {
  if (ledger.schemaVersion !== 1 || !Array.isArray(ledger.entries)) throw new Error("Unsupported sense review ledger");
  for (const entry of ledger.entries) {
    if (!entry.key || !/^[a-f0-9]{64}$/.test(entry.inputHash ?? "") || !/^[a-f0-9]{64}$/.test(entry.resolutionHash ?? "")
      || !["merged", "distinct", "mixed-unresolved", "single-display"].includes(entry.disposition) || !entry.reason?.trim()
      || entry.disposition === "single-display" && (entry.baselineRows > 1 || entry.rows + (entry.annotationRows ?? 0) > 1)) throw new Error(`Incomplete or invalid manual review ledger entry: ${entry.key ?? "missing key"}`);
  }
  const previous = new Map(ledger.entries.map(entry => [entry.key, entry]));
  if (previous.size !== ledger.entries.length) throw new Error("Duplicate terms in sense review ledger");
  const changes = [];
  for (const entry of audit.entries) {
    const saved = previous.get(entry.key);
    if (!saved) changes.push({ key: entry.key, reason: "new-term" });
    else {
      if (saved.inputHash !== senseInputFingerprint(entry)) changes.push({ key: entry.key, reason: "source-or-meaning-changed" });
      const resolutionHash = resolutionFingerprint(entry);
      if (saved.resolutionHash !== resolutionHash) changes.push({ key: entry.key, reason: "sense-grouping-changed" });
    }
    previous.delete(entry.key);
  }
  for (const key of previous.keys()) changes.push({ key, reason: "removed-term" });
  return changes;
}

/** One complete term per line keeps evidence reviewable without megabytes of indentation. */
export function serializeSenseLedger(ledger) {
  const { entries, ...header } = ledger;
  return `${JSON.stringify(header, null, 2).slice(0, -2)},\n  "entries": [\n${entries.map(entry => `    ${JSON.stringify(entry)}`).join(",\n")}\n  ]\n}\n`;
}

export async function auditVocabularySenses(existingVite) {
  const vite = existingVite ?? await createServer({ appType: "custom", configFile: false, root,
    resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
  try {
    const study = await vite.ssrLoadModule("/app/study-app.tsx");
    const { availableYears } = await vite.ssrLoadModule("/app/data.ts");
    const { buildSenseOverview } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-overview.ts");
    const { resolveReviewedSense, normalizeMeaning, normalizePartOfSpeech } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-registry.ts");
    const functionSource = await readFile(new URL("../app/vocabulary-learning/function-semantic-aliases.ts", import.meta.url), "utf8");
    const functionTerms = new Set([...functionSource.matchAll(/^  "([^"]+)": \[/gm)].map(match => match[1]));
    // Additional closed-class entries use the shared semantic aliases or have not
    // needed a dedicated function-word mapping yet. Keep them in one review batch.
    for (const key of ["a", "an", "the", "and", "or", "but", "nor", "as", "at", "by", "of", "on", "in", "off", "up", "out", "down", "over", "under", "into", "onto", "through", "throughout", "across", "around", "about", "against", "after", "before", "during", "until", "till", "since", "once", "while", "when", "whenever", "where", "wherever", "why", "how", "whether", "if", "unless", "although", "though", "because", "despite", "without", "within", "beside", "besides", "beyond", "between", "among", "all", "any", "some", "no", "none", "both", "each", "either", "neither", "every", "another", "other", "such", "enough", "much", "many", "few", "little", "less", "more", "most", "least", "this", "that", "these", "those", "here", "there", "then", "thus", "therefore", "however", "hence", "otherwise", "yet", "still", "already", "even", "also", "only", "not", "never", "ever", "so", "too", "very", "quite", "rather", "just", "indeed", "almost", "nearly", "perhaps", "maybe", "who", "whom", "whose", "which", "what", "whatever", "whoever", "i", "me", "my", "mine", "myself", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "we", "us", "our", "ours", "ourselves", "they", "them", "their", "theirs", "themselves", "be", "have", "do", "can", "could", "may", "might", "must", "shall", "should", "will", "would", "ought", "need", "dare"]) functionTerms.add(key);
    const items = new Map();
    const resolved = new Map();
    function resolveSource(form, sourceId) {
      const key = JSON.stringify([form, sourceId]);
      if (!resolved.has(key)) resolved.set(key, study.resolveEntry(form, false, sourceId));
      return resolved.get(key);
    }
    const yearStats = [];
    for (const year of availableYears) {
      const words = study.buildYearWordItems(year);
      yearStats.push({ year, lemmaCount: words.length, tokenCount: words.reduce((sum, word) => sum + word.count, 0) });
      for (const word of words) {
        const first = word.contexts[0];
        const value = resolveSource(first.sourceForm, first.sentenceId);
        let item = items.get(value.key);
        if (!item) {
          const rows = buildSenseOverview(value, first.sentenceId);
          const rawContexts = value.occurrences.flatMap(occurrence => (occurrence.contexts ?? []).map(context => ({
            ...context, sourceId: occurrence.sourceId, year: occurrence.year, section: occurrence.section, excerpt: occurrence.excerpt,
            reviewed: resolveReviewedSense(value.key, value.kind, context.partOfSpeech, context.meaning, occurrence.sourceId, context.expression) ?? null,
          })));
          item = { key: value.key, headword: value.headword, batch: functionTerms.has(value.key) ? "function" : /^[a-f]/i.test(value.key) ? "a-f" : /^[g-m]/i.test(value.key) ? "g-m" : /^[n-s]/i.test(value.key) ? "n-s" : "t-z", years: [], forms: [], rawContexts, overviewRows: rows, senseGuide: value.senseGuide ?? null, senseGuides: [], otherMeanings: [], otherMeaningSources: [], counts: value.counts, suggestions: [], originalEntry: value, firstSource: first.sentenceId };
          const defaultEntry = resolveSource(value.headword, undefined);
          item.defaultContext = { key: defaultEntry.key, headword: defaultEntry.headword, expression: defaultEntry.display, partOfSpeech: defaultEntry.partOfSpeech, meaning: defaultEntry.contextualMeaning, use: defaultEntry.use };
          if (defaultEntry.senseGuide) item.senseGuides.push(defaultEntry.senseGuide);
          for (const meaning of defaultEntry.otherMeanings) item.otherMeaningSources.push({ meaning, sources: [{ sourceId: null, expression: defaultEntry.display }] });
          items.set(value.key, item);
        }
        item.years.push(year);
        item.forms = [...new Set([...item.forms, ...word.forms])].sort();
        // Source/form pairs are retained: distinct inflections in the same source
        // can have different meanings or POS and must not disappear from an audit.
        for (const context of word.contexts) for (const form of context.sourceForms) {
          const sourceEntry = resolveSource(form, context.sentenceId);
          if (!item.rawContexts.some(value => value.sourceId === context.sentenceId && value.expression === form)) {
            const occurrence = sourceEntry.occurrences.find(value => value.sourceId === context.sentenceId);
            const sourceContext = occurrence?.contexts?.find(value => value.expression === form);
            if (!sourceContext) throw new Error(`Missing real source/form in vocabulary inventory: ${item.key} ${context.sentenceId} ${form}`);
            item.rawContexts.push({ ...sourceContext, sourceId: context.sentenceId, year: occurrence.year, section: occurrence.section, excerpt: occurrence.excerpt,
              reviewed: resolveReviewedSense(item.key, sourceEntry.kind, sourceContext.partOfSpeech, sourceContext.meaning, context.sentenceId, form) ?? null });
          }
          if (sourceEntry.senseGuide && !item.senseGuides.some(guide => JSON.stringify(guide) === JSON.stringify(sourceEntry.senseGuide))) item.senseGuides.push(sourceEntry.senseGuide);
          for (const meaning of sourceEntry.otherMeanings) {
            let extra = item.otherMeaningSources.find(value => value.meaning === meaning);
            if (!extra) { extra = { meaning, sources: [] }; item.otherMeaningSources.push(extra); }
            extra.sources.push({ sourceId: context.sentenceId, expression: form });
          }
        }
      }
    }
    const entries = [...items.values()].sort((a, b) => a.key.localeCompare(b.key, "en"));
    for (const item of entries) {
      item.identicalLabels = [];
      item.otherMeanings = item.otherMeaningSources.map(value => value.meaning).sort();
      item.otherMeaningSources.sort((a, b) => a.meaning.localeCompare(b.meaning));
      for (const extra of item.otherMeaningSources) extra.sources = stable(extra.sources);
      // An audit sees the union of every source's dictionary extras. The opened
      // card may expose only a subset, so report that difference explicitly.
      const senses = stable(item.senseGuides.flatMap(guide => guide.senses));
      const expandedEntry = { ...item.originalEntry, contextualMeaning: item.defaultContext.meaning, partOfSpeech: item.defaultContext.partOfSpeech, use: item.defaultContext.use, display: item.defaultContext.expression, sourceExpression: undefined, otherMeanings: item.otherMeanings, ...(senses.length ? { senseGuide: { ...item.senseGuide, senses } } : {}) };
      const expandedRows = buildSenseOverview(expandedEntry);
      item.firstSourceRowCount = item.overviewRows.length;
      item.overviewRows = expandedRows;
      delete item.originalEntry;
      delete item.firstSource;
      for (let left = 0; left < item.overviewRows.length; left++) for (let right = left + 1; right < item.overviewRows.length; right++) {
        const a = item.overviewRows[left];
        const b = item.overviewRows[right];
        if (a.annotationReason || b.annotationReason) continue;
        if (normalizePartOfSpeech(a.partOfSpeech) !== normalizePartOfSpeech(b.partOfSpeech)) continue;
        if (normalizeMeaning(a.meaning) === normalizeMeaning(b.meaning)) item.identicalLabels.push({ left: a.id, right: b.id, partOfSpeech: normalizePartOfSpeech(a.partOfSpeech), meaning: a.meaning });
        const aParts = normalizeMeaning(a.meaning).split(";");
        const bParts = normalizeMeaning(b.meaning).split(";");
        const shared = aParts.filter(part => bParts.includes(part));
        const stripUsage = value => value.replace(/[（(][^）)]*[）)]/g, "");
        if (shared.length || normalizeMeaning(stripUsage(a.meaning)) === normalizeMeaning(stripUsage(b.meaning))) item.suggestions.push({ left: a.id, right: b.id, sharedGlossParts: shared, reason: shared.length ? "shared-gloss-token-review-required" : "qualifier-only-difference-review-required" });
      }
    }
    const result = { schemaVersion: 1, note: "An inventory, not a machine assertion of semantic equivalence. Contextual glosses and review state are never changed.", years: yearStats, summary: {
      terms: entries.length, rows: entries.reduce((sum, item) => sum + item.overviewRows.length, 0), senseRows: entries.reduce((sum, item) => sum + senseRows(item).length, 0), annotationRows: entries.reduce((sum, item) => sum + annotationRows(item).length, 0), multiRowTerms: entries.filter(item => senseRows(item).length > 1).length,
      sourceContexts: entries.reduce((sum, item) => sum + item.rawContexts.length, 0), contextsWithoutExplicitMapping: entries.reduce((sum, item) => sum + item.rawContexts.filter(context => !context.reviewed).length, 0),
      termsWithSuggestions: entries.filter(item => item.suggestions.length).length,
      termsWithIdenticalLabels: entries.filter(item => item.identicalLabels.length).length,
      batches: Object.fromEntries(["function", "a-f", "g-m", "n-s", "t-z"].map(batch => [batch, { terms: entries.filter(item => item.batch === batch).length, multiRowTerms: entries.filter(item => item.batch === batch && senseRows(item).length > 1).length }])),
    }, entries };
    return result;
  } finally { if (!existingVite) await vite.close(); }
}

async function main() {
  const args = process.argv.slice(2);
  const option = name => args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
  const output = option("--output");
  const check = args.includes("--check-ledger");
  const write = args.includes("--write-ledger");
  if ((!output && !check && !write) || check && write) throw new Error("Usage: node scripts/audit-vocabulary-senses.mjs [--output audit.json] [--check-ledger | --write-ledger --reviews a.json,b.json --baseline audit.json] [--ledger tests/fixtures/vocabulary-sense-review.json]");
  const ledgerPath = resolve(option("--ledger") ?? resolve(root, "tests/fixtures/vocabulary-sense-review.json"));
  const audit = await auditVocabularySenses();
  if (output) await writeFile(resolve(output), JSON.stringify(audit, null, 2) + "\n");
  if (write) {
    if (!option("--reviews")) throw new Error("--write-ledger requires explicit --reviews files");
    const reviews = (await Promise.all(option("--reviews").split(",").map(async path => JSON.parse(await readFile(resolve(path), "utf8"))))).flat();
    const baseline = option("--baseline") ? JSON.parse(await readFile(resolve(option("--baseline")), "utf8")) : audit;
    await writeFile(ledgerPath, serializeSenseLedger(createSenseLedger(audit, reviews, baseline)));
  }
  if (check) {
    const changes = compareSenseLedger(audit, JSON.parse(await readFile(ledgerPath, "utf8")));
    if (changes.length) {
      console.error(JSON.stringify({ error: "Vocabulary sense review required; ledger was not changed", changes }, null, 2));
      process.exitCode = 1;
      return;
    }
  }
  console.log(JSON.stringify({ ...(output ? { output: resolve(output) } : {}), ...audit.summary, ...(check || write ? { ledger: ledgerPath, ledgerStatus: check ? "unchanged-reviewed-inputs" : "written-from-explicit-reviews" } : {}) }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main().catch(error => { console.error(error.message); process.exitCode = 1; });
