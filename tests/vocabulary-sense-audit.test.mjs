import assert from "node:assert/strict";
import test from "node:test";
import { compareSenseLedger, createSenseLedger, senseInputFingerprint } from "../scripts/audit-vocabulary-senses.mjs";

const context = (sourceId, expression = "work", meaning = "工作") => ({ sourceId, expression, partOfSpeech: "n.", meaning, use: "名词作宾语", excerpt: `They discuss ${expression}.` });
const row = (id = "work:employment", meaning = "工作", count = 1) => ({ id, meaning, partOfSpeech: "n.", count });
const entry = (changes = {}) => ({ key: "work", rawContexts: [context("s1")], otherMeanings: ["n. 作品"], otherMeaningSources: [{ meaning: "n. 作品", sources: [{ sourceId: "s1", expression: "work" }] }], senseGuides: [], overviewRows: [row()], ...changes });
const audit = entries => ({ entries });
const review = (disposition = "merged") => ({ key: "work", disposition, reason: "同义工作译法归并；艺术作品义继续独立。" });

test("sense audit fingerprints retain each source/form and ignore traversal order", () => {
  const initial = entry({ rawContexts: [context("s1"), context("s1", "works", "作品")] });
  assert.equal(senseInputFingerprint(initial), senseInputFingerprint({ ...initial, rawContexts: [...initial.rawContexts].reverse() }));
  assert.notEqual(senseInputFingerprint(initial), senseInputFingerprint({ ...initial, rawContexts: [initial.rawContexts[0]] }));
  for (const field of ["meaning", "use", "excerpt", "expression", "partOfSpeech", "sourceId"]) {
    const next = structuredClone(initial);
    next.rawContexts[0][field] += " changed";
    assert.notEqual(senseInputFingerprint(initial), senseInputFingerprint(next), field);
  }
});

test("sense audit fingerprints include source-specific extras and guide meanings", () => {
  const initial = entry();
  const extra = structuredClone(initial);
  extra.otherMeaningSources.push({ meaning: "v. 起作用", sources: [{ sourceId: "s2", expression: "works" }] });
  assert.notEqual(senseInputFingerprint(initial), senseInputFingerprint(extra));
  const guide = { ...initial, senseGuides: [{ senses: [{ id: "operate", partOfSpeech: "v.", meaning: "起作用" }] }] };
  assert.notEqual(senseInputFingerprint(initial), senseInputFingerprint(guide));
  const defaultEntry = { ...initial, defaultContext: { expression: "work", partOfSpeech: "n. / v.", meaning: "工作；作品；起作用", use: "默认查词入口" } };
  assert.notEqual(senseInputFingerprint(initial), senseInputFingerprint(defaultEntry));
});

test("ledger creation requires explicit review of every baseline or current multi-row word", () => {
  const before = audit([entry({ overviewRows: [row(), row("work:artwork", "作品")] })]);
  const after = audit([entry()]);
  assert.throws(() => createSenseLedger(after, [], before), /Manual review missing.*work/);
  assert.throws(() => createSenseLedger(before, [], after), /Manual review missing.*work/);
  const ledger = createSenseLedger(after, [review()], before);
  assert.equal(ledger.entries[0].baselineRows, 2);
  assert.equal(ledger.entries[0].rows, 1);
  assert.equal(ledger.entries[0].disposition, "merged");
});

test("ledger records retained and ambiguous decisions without claiming all inputs are mapped", () => {
  const value = audit([entry({ overviewRows: [row(), row("source:old", "工作；作品")] })]);
  for (const disposition of ["distinct", "mixed-unresolved"]) {
    const ledger = createSenseLedger(value, [review(disposition)]);
    assert.equal(ledger.entries[0].disposition, disposition);
    assert.deepEqual(compareSenseLedger(value, ledger), []);
  }
  const single = createSenseLedger(audit([entry()]), []);
  assert.equal(single.entries[0].disposition, "single-display");
  assert.match(single.entries[0].reason, /不宣称/);
});

test("new or changed imported inputs fail review comparison without editing the ledger", () => {
  const original = audit([entry()]);
  const ledger = createSenseLedger(original, []);
  const saved = structuredClone(ledger);
  const changed = audit([entry({ rawContexts: [context("s2", "works", "作品")] }), entry({ key: "note" })]);
  assert.deepEqual(compareSenseLedger(changed, ledger), [{ key: "work", reason: "source-or-meaning-changed" }, { key: "note", reason: "new-term" }]);
  assert.deepEqual(ledger, saved);
  assert.deepEqual(compareSenseLedger(audit([]), ledger), [{ key: "work", reason: "removed-term" }]);
});

test("changed grouping identities, glosses and deduplicated counts cannot bypass the ledger", () => {
  const ledger = createSenseLedger(audit([entry()]), []);
  for (const changed of [row("work:different"), row("work:employment", "作品"), row("work:employment", "工作", 2)]) {
    assert.deepEqual(compareSenseLedger(audit([entry({ overviewRows: [changed] })]), ledger), [{ key: "work", reason: "sense-grouping-changed" }]);
  }
});

test("annotation classification is tracked separately and cannot silently replace a sense", () => {
  const initial = entry({ overviewRows: [row(), { ...row("source:note", "工作；作品"), annotationReason: "混合旧释义" }] });
  const value = audit([initial]);
  const ledger = createSenseLedger(value, [review("mixed-unresolved")]);
  assert.equal(ledger.entries[0].rows, 1);
  assert.equal(ledger.entries[0].annotationRows, 1);
  const next = structuredClone(initial);
  delete next.overviewRows[1].annotationReason;
  assert.deepEqual(compareSenseLedger(audit([next]), ledger), [{ key: "work", reason: "sense-grouping-changed" }]);
  const details = structuredClone(initial);
  details.overviewRows[0].dictionaryDetails = ["新的旧词典说明"];
  assert.deepEqual(compareSenseLedger(audit([details]), ledger), [{ key: "work", reason: "sense-grouping-changed" }]);
});

test("ledger creation rejects duplicate or incomplete manual decisions", () => {
  const value = audit([entry()]);
  assert.throws(() => createSenseLedger(value, [review(), review()]), /Duplicate manual review/);
  assert.throws(() => createSenseLedger(value, [{ ...review(), reason: "" }]), /Invalid manual review/);
  assert.throws(() => createSenseLedger(value, [{ ...review(), disposition: "automatically-correct" }]), /Invalid manual review/);
  assert.throws(() => createSenseLedger(value, [{ ...review(), key: "absent" }]), /absent term/);
  const ledger = createSenseLedger(value, []);
  ledger.entries[0].reason = "";
  assert.throws(() => compareSenseLedger(value, ledger), /Incomplete or invalid manual review/);
});
