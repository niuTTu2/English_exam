import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { resolveEntry, currentOccurrences, buildYearWordItems } = await vite.ssrLoadModule("/app/study-app.tsx");
const { passage2010P2PreferredCollocations } = await vite.ssrLoadModule("/app/2010-passage-2-collocations.ts");

test("Text2首屏搭配按当前来源排序，并且展开后保留其他用法", () => {
  const cases = [
    ["Judging", "question-201027-prompt", "judging from the context"],
    ["means", "question-201027-prompt", "the phrase means"],
    ["public", "question-201028-option-A", "in public"],
    ["Sharing", "question-201026-option-D", "sharing housework"],
    ["Talk", "question-201030-option-A", "Divorce Talk"],
    ["share", "2010-p2-s15", "far more than their share"],
    ["share", "2010-p2-s18", "share this expectation"],
    ["with", "2010-p2-s11", "wreaking havoc with marriage"],
    ["with", "2010-p2-s19", "with a newspaper held up in front of his face"],
  ];
  for (const [form, sourceId, label] of cases) {
    const entry = resolveEntry(form, false, sourceId);
    assert.equal(entry.collocationDetails[0].label, label, `${sourceId}/${form}`);
    assert.match(entry.collocationDetails[0].meaning, /[\u4e00-\u9fff]/);
    assert.ok(entry.collocationDetails[0].target);
    assert.ok(currentOccurrences(form, false, sourceId).some(item => item.sourceId === sourceId));
  }
  assert.ok(resolveEntry("Sharing", false, "question-201026-option-D").collocations.includes("far more than their share"));
});

test("全部人工优先搭配都能打开中文讲解，不能创建英文空卡", () => {
  for (const [sourceId, words] of Object.entries(passage2010P2PreferredCollocations)) {
    for (const [headword, labels] of Object.entries(words)) {
      const entry = resolveEntry(headword, false, sourceId);
      assert.equal(entry.collocationDetails[0].label, labels[0], `${sourceId}/${headword}`);
      const detail = entry.collocationDetails[0];
      assert.match(detail.meaning, /[\u4e00-\u9fff]/);
      assert.ok(detail.target?.startsWith("phrase:"), `${sourceId}/${detail.label}`);
      const linked = resolveEntry(detail.label, true, sourceId);
      assert.match(linked.contextualMeaning, /[\u4e00-\u9fff]/);
      assert.ok(linked.structures?.length, detail.label);
    }
  }
});

test("更多研究使用数量限定词，U.S.仍作为真实缩写单词进入索引", () => {
  for (const [form, sourceId, partOfSpeech] of [["less", "2010-p2-s10", /^adv\./], ["more", "2010-p2-s15", /^pron\./], ["to", "2010-p2-s3", /^prep\./], ["to", "2010-p2-s8", /infinitive marker/]]) {
    assert.match(resolveEntry(form, false, sourceId).partOfSpeech, partOfSpeech);
  }
  assert.equal(resolveEntry("as", false, "2010-p2-s15").contextualMeaning, "引出例子");
  const entry = resolveEntry("more", false, "question-201029-option-A");
  assert.match(entry.partOfSpeech, /determiner/);
  assert.equal(entry.contextualMeaning, "更多的");
  assert.equal(entry.collocationDetails[0].label, "more research");
  const abbreviation = resolveEntry("U.S.", false, "question-201030-option-C");
  assert.notEqual(abbreviation.headword, "possessive-suffix");
  assert.ok(currentOccurrences("U.S.", false, "question-201030-option-C").some(item => item.sourceId === "question-201030-option-C"));
  assert.ok(buildYearWordItems(2010).some(item => item.headword === abbreviation.headword));
});
