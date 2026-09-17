import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const { articleContents, availableYears } = await vite.ssrLoadModule("/app/data.ts");
const { getPhraseKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
const { getVocabularySenseGuide, wordSenseGuides } = await vite.ssrLoadModule("/app/vocabulary-senses.ts");

test("curated senses have distinct IDs, parts of speech, Chinese usage and bilingual teaching examples", () => {
  assert.equal(Object.keys(wordSenseGuides).length, 19);
  const phraseLabels = ["make up words", "in turn", "as well as", "almost as well as", "rather than", "rather than to Parliament", "narrow rather than widen", "a heavy note of hypocrisy", "ended on a dramatic note", "in company"];
  const guides = [
    ...Object.keys(wordSenseGuides).map(word => getVocabularySenseGuide(word)),
    ...phraseLabels.map(label => getVocabularySenseGuide(label, getPhraseKnowledge(label).key)),
  ];
  for (const guide of guides) {
    assert.ok(guide?.senses.length > 0);
    assert.equal(new Set(guide.senses.map(sense => sense.id)).size, guide.senses.length, guide.label);
    for (const sense of guide.senses) {
      assert.ok(sense.partOfSpeech);
      assert.match(sense.meaning, /[\u4e00-\u9fff]/);
      assert.match(sense.use, /[\u4e00-\u9fff]/);
      assert.match(sense.example.english, /[A-Za-z]/);
      assert.match(sense.example.chinese, /[\u4e00-\u9fff]/);
      assert.doesNotMatch(JSON.stringify(sense), /待精审|后续补充|暂无资料/);
    }
  }
  assert.equal(getVocabularySenseGuide("not-a-real-word"), undefined);
  assert.equal(getVocabularySenseGuide("not-a-real-phrase", "unknown-key"), undefined);
});

test("note exposes all twelve reviewed senses from every inflected form without replacing the source meaning", () => {
  const expected = [
    ["notes", "p3-s10", "n.", /说明性注释/],
    ["note", "p5-s5", "n.", /浓重的虚伪意味/],
    ["noted", "2010-cloze-s5", "v.", /注意到并记录/],
    ["note", "2010-p1-s1", "n.", /基调.*情绪色彩/],
  ];
  for (const [form, sourceId, partOfSpeech, meaning] of expected) {
    const entry = study.resolveEntry(form, false, sourceId);
    assert.equal(entry.key, "note");
    assert.equal(entry.headword, "note");
    assert.equal(entry.partOfSpeech, partOfSpeech);
    assert.match(entry.contextualMeaning, meaning);
    assert.equal(entry.senseGuide.senses.length, 12);
    assert.deepEqual(entry.senseGuide.senses, wordSenseGuides.note);
    for (const id of ["record", "annotation", "music", "tone", "notice", "write-down", "mention", "banknote"]) {
      assert.ok(entry.senseGuide.senses.some(sense => sense.id === id));
    }
    const occurrence = entry.occurrences.find(item => item.sourceId === sourceId);
    assert.deepEqual(occurrence.contexts.map(context => [context.expression, context.partOfSpeech, context.meaning, context.use]), [[form, partOfSpeech, entry.contextualMeaning, entry.use]]);
  }
  assert.equal(study.resolveEntry("noted", false, "2010-cloze-s5").contextualSubstitutions[0].target, "word:observe");
  assert.equal(study.resolveEntry("dramatic", false, "2010-p1-s1").contextualSubstitutions[0].target, "word:striking");
  assert.equal(study.currentCounts("note", false).lemma, 4, "教学例句和常见义项不进入真题统计");
  assert.equal(study.currentOccurrences("note", false).length, 4);
});

test("all real word occurrences carry their own Chinese meaning, use and actual form", () => {
  const checked = new Set();
  let multipleForms = 0;
  for (const year of availableYears) {
    for (const word of study.buildYearWordItems(year)) {
      if (checked.has(word.headword)) continue;
      checked.add(word.headword);
      const occurrences = study.currentOccurrences(word.sourceForm, false, word.sentenceId);
      assert.equal(new Set(occurrences.map(item => item.sourceId)).size, occurrences.length);
      for (const occurrence of occurrences) {
        assert.ok(study.sourceDestination(occurrence.sourceId));
        assert.ok(occurrence.contexts.length > 0);
        if (occurrence.contexts.length > 1) multipleForms += 1;
        for (const context of occurrence.contexts) {
          const entry = study.resolveEntry(context.expression, false, occurrence.sourceId);
          assert.equal(entry.headword, word.headword, `${context.expression} / ${occurrence.sourceId}`);
          assert.equal(context.meaning, entry.contextualMeaning);
          assert.equal(context.partOfSpeech, entry.partOfSpeech);
          assert.equal(context.use, entry.use);
          assert.match(context.meaning, /[\u4e00-\u9fff]/);
          assert.ok(context.use);
          assert.ok(occurrence.excerpt.toLowerCase().includes(context.expression));
        }
      }
    }
  }
  assert.ok(checked.size > 1900);
  assert.ok(multipleForms > 0, "同一句中的多个屈折词形都要保留");
});

test("company keeps business and companionship senses separated across source years", () => {
  const occurrences = study.currentOccurrences("company", false);
  assert.match(occurrences.find(item => item.sourceId === "2010-p3-s1").contexts[0].meaning, /公司/);
  assert.match(occurrences.find(item => item.sourceId === "2010-p5-s15").contexts[0].meaning, /结伴/);
  assert.deepEqual(study.resolveEntry("companies", false, "2010-p3-s1").senseGuide, study.resolveEntry("company", false, "2010-p5-s15").senseGuide);
});

test("phrases share canonical senses but show each actual source expression's Chinese meaning", () => {
  const occurrences = study.currentOccurrences("a lack of demand", true);
  assert.match(occurrences.find(item => item.sourceId === "2010-p1-s17").contexts[0].meaning, /需求不足/);
  assert.match(occurrences.find(item => item.sourceId === "2010-translation-s6").contexts[0].meaning, /销售不足/);
  assert.equal(study.resolveEntry("a lack of sales", true, "2010-translation-s6").key, "pattern:2010-p1-a-lack-of-demand");
  const comparison = study.currentOccurrences("as well as", true).find(item => item.sourceId === "p2-s4");
  assert.match(comparison.contexts[0].meaning, /一样好/);
  assert.doesNotMatch(comparison.contexts[0].meaning, /以及/);
  const entry = study.resolveEntry("as well as", true, "p2-s4");
  assert.equal(entry.contextualMeaning, comparison.contexts[0].meaning);
  assert.match(entry.canonicalForm, /comparison/);
  assert.match(entry.structures[0].rule, /比较/);
  assert.deepEqual(entry.senseGuide, study.resolveEntry("almost as well as", true, "p2-s4").senseGuide);
  assert.equal(entry.key, "pattern:collocation:as well as", "浏览补充用法不迁移已存储的键");
});

test("every annotated phrase occurrence has source-specific Chinese without losing repeated instances", () => {
  const labels = new Set(Object.values(articleContents).flatMap(article => [
    ...article.sentences.flatMap(sentence => sentence.phrases),
    ...article.questions.flatMap(question => question.options.filter(option => option.text.includes(" ") && getPhraseKnowledge(option.text)).map(option => option.text)),
  ]));
  for (const label of labels) {
    const occurrences = study.currentOccurrences(label, true);
    const matches = study.findPhraseOccurrences(label, true);
    assert.equal(occurrences.length, new Set(matches.map(match => match.source.id)).size, label);
    for (const occurrence of occurrences) {
      const expressions = new Set(matches.filter(match => match.source.id === occurrence.sourceId).map(match => match.label.toLowerCase().normalize("NFKC")));
      assert.equal(occurrence.contexts.length, expressions.size, `${label} / ${occurrence.sourceId}`);
      for (const context of occurrence.contexts) {
        assert.match(context.meaning, /[\u4e00-\u9fff]/, `${label} / ${occurrence.sourceId}`);
        assert.ok(context.partOfSpeech);
        assert.ok(context.use);
        assert.equal(context.meaning, study.resolveEntry(context.expression, true, occurrence.sourceId).contextualMeaning);
      }
    }
  }
});

test("grouping combines equal meanings without removing different forms or sources", () => {
  const sample = [
    { sourceId: "p3-s10", contexts: [{ expression: "note", partOfSpeech: "n.", meaning: "笔记", use: "用法一" }, { expression: "notes", partOfSpeech: "n.", meaning: "笔记", use: "用法二" }] },
    { sourceId: "p5-s5", contexts: [{ expression: "note", partOfSpeech: "n.", meaning: "意味", use: "用法三" }] },
  ];
  const grouped = study.groupOccurrenceSenses(sample);
  assert.equal(grouped.length, 2);
  assert.deepEqual(grouped[0].examples.map(example => example.expression), ["note", "notes"]);
  assert.equal(grouped[1].examples[0].sourceId, "p5-s5");
});

test("sense panel is collapsed, distinguishes teaching examples and preserves legacy meanings", () => {
  const entry = study.resolveEntry("note", false, "p5-s5");
  const html = renderToStaticMarkup(React.createElement(study.TermSenses, { entry: { ...entry, otherMeanings: ["原有多义补充不丢失"] }, onSource: () => {} }));
  assert.match(html, /其他义项与用法/);
  assert.match(html, /音符；单音；音高/);
  assert.match(html, /指出；提到；特别说明/);
  assert.match(html, /教学例句（非真题）/);
  assert.match(html, /原有多义补充不丢失/);
  assert.match(html, /已导入真题用法/);
  assert.match(html, /aria-label="回到出处：/);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:[\s=>])/);
});

test("year rows render Chinese meanings and inflected forms inside their existing source links", () => {
  const entry = study.resolveEntry("note", false, "2010-p1-s1");
  const html = renderToStaticMarkup(React.createElement(study.TermDetails, { entry, sentenceId: "2010-p1-s1", onReference: () => {}, onSource: () => {} }));
  assert.match(html, /出现次数与年份/);
  assert.equal((html.match(/本处义：/g) ?? []).length, 4);
  assert.match(html, /<b>noted<\/b>/);
  assert.match(html, /浓重的虚伪意味/);
  assert.match(html, /说明性注释/);
  assert.match(html, /回到出处：2000/);
  assert.match(html, /回到出处：2010/);
});
