import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const data = await vite.ssrLoadModule("/app/data.ts");
const lexicon = await vite.ssrLoadModule("/app/lexicon.ts");
const knowledge = await vite.ssrLoadModule("/app/knowledge-base.ts");
const contexts = await vite.ssrLoadModule("/app/contextual-vocabulary.ts");
const answers = await vite.ssrLoadModule("/app/verified-answer-keys.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const normalize = text => text.replace(/\s+/g, " ").replace(/\s+([,.;?!])/g, "$1").trim();
const tokens = text => text.match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)*(?:['’][a-z]+)?/gi) ?? [];
const articles = Object.values(data.articleContents).filter(article => article.year === 2012);
const sourceHash = "b91cfe8e6a3eb63b02fc6573514e34a67937bf8160a5712ce640315e2da306f9";

function checkReadingSource(id, startNumber, sentenceCount, key) {
  const article = data.articleContents[id];
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/' + id + '.json', import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.sentences.length, sentenceCount);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.questions.length, 5);
  article.questions.forEach((question, index) => {
    assert.equal(question.id, 201200 + startNumber + index);
    assert.equal(question.number, startNumber + index);
    assert.equal(question.answer, key[question.number]);
    assert.equal(question.prompt, fixture.questions[index * 5].text.replace(/^\d+\.\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), fixture.questions.slice(index * 5 + 1, index * 5 + 5).map(row => row.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
    assert.deepEqual(Object.keys(question.explanations), ["A", "B", "C", "D"]);
  });
}

test("2012Text1原卷、政策限定与嵌套从句准确", () => {
  checkReadingSource("2012-p1", 21, 18, answers.verifiedAnswerKey2012Passage1);
  const article = data.articleContents["2012-p1"];
  assert.equal(article.sentences[2].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[6].beginnerSyntax.clauses.length, 3);
  assert.equal(article.sentences[15].beginnerSyntax.clauses.length, 4);
  assert.match(article.questions[2].explanations.C, /泛化|范围/);
  assert.match(article.sentences[13].natural, /如果/);
  assert.match(article.sentences[14].natural, /若/);
  for (const [token, number, meaning] of [["address", 4, /处理/], ["pass", 7, /放过/], ["well", 10, /表现|好/], ["works", 12, /奏效/], ["matters", 15, /重要/], ["matter", 17, /这件事/], ["right", 18, /正确|妥当/]]) assert.match(study.resolveEntry(token, false, '2012-p1-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("questioned", false, "question-201213-option-D").partOfSpeech, /v/);
  assert.match(study.resolveEntry("questions", false, "2012-p1-s13").partOfSpeech, /n/);
  assert.match(study.resolveEntry("articles", false, "2012-cloze-s5").contextualMeaning, /物品/);
});

test("2012Text3保留历史时点、三个论点与倒装比较", () => {
  checkReadingSource("2012-p3", 31, 24, answers.verifiedAnswerKey2012Passage3);
  const article = data.articleContents["2012-p3"];
  assert.equal(article.sentences[13].beginnerSyntax.clauses.length, 3);
  assert.match(article.sentences[13].natural, /一样.*自然产物/);
  assert.match(article.sentences[15].natural, /会不会/);
  assert.match(article.questions[1].explanations.B, /不表示所有人工产品/);
  assert.equal(lexicon.canonicalLemma("ruling", { articleId: "2012-p3", sentenceId: "2012-p3-s7" }), "rule");
  assert.equal(lexicon.canonicalLemma("ruling", { articleId: "2012-p3", sentenceId: "2012-p3-s8" }), "ruling");
  assert.equal(lexicon.canonicalLemma("meeting", { articleId: "2012-p3" }), "meeting");
  for (const [token, number, meaning] of [["brief", 14, /法律|诉讼/], ["suit", 22, /诉讼/], ["term", 22, /审期|开庭/], ["hear", 22, /审理/], ["coach", 23, /培训/], ["landscape", 23, /形势|格局/], ["packed", 24, /挤满/], ["hold", 7, /持有/], ["held", 23, /举办/]]) assert.match(study.resolveEntry(token, false, '2012-p3-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("means", false, "question-201234-prompt").partOfSpeech, /v/);
  assert.match(study.resolveEntry("means", false, "question-201220-option-B").partOfSpeech, /n/);
});

test("2012Text4部分否定、虚拟参照和程度比较保留", () => {
  checkReadingSource("2012-p4", 36, 18, answers.verifiedAnswerKey2012Passage4);
  const article = data.articleContents["2012-p4"];
  assert.equal(article.sentences[12].beginnerSyntax.clauses.length, 4);
  assert.match(article.sentences[12].natural, /并不.*所有人/);
  assert.match(article.sentences[12].beginnerSyntax.clauses[2].type, /虚拟/);
  assert.match(article.sentences[17].natural, /越久.*越深/);
  assert.match(article.questions[3].explanations.B, /反事实/);
  assert.match(article.questions[4].explanations.D, /确定存在/);
  for (const [token, number, meaning] of [["respects", 6, /方面/], ["rights", 9, /权利/], ["does", 10, /代替/], ["divides", 12, /分野|鸿沟/], ["fairly", 13, /相当|较为/], ["lean", 15, /艰难|拮据/], ["fabric", 17, /结构/]]) assert.match(study.resolveEntry(token, false, '2012-p4-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("right", false, "2012-p1-s18").partOfSpeech, /adv/);
  assert.equal(lexicon.canonicalLemma("spending", { articleId: "2012-p4" }), "spending");
});

test("2012每篇真实来源词卡、从句边界与年度出处有效", () => {
  assert.ok(articles.length > 0);
  for (const article of articles) {
    const sources = [...article.sentences.map(sentence => [sentence.id, sentence.text]), ...article.questions.flatMap(question => [[`question-${question.id}-prompt`, question.prompt], ...question.options.map(option => [data.questionOptionSourceId(question, option.key), option.text])])];
    for (const [sourceId, text] of sources) for (const token of tokens(text)) {
      const entry = study.resolveEntry(token, false, sourceId);
      for (const field of ["contextualMeaning", "partOfSpeech", "use"]) {
        assert.ok(entry[field]?.trim(), `${sourceId}/${token}/${field}`);
        assert.doesNotMatch(entry[field], /待精审|暂无|该词未出现在|需结合来源|后续补充/, `${sourceId}/${token}/${field}`);
      }
    }
    for (const sentence of article.sentences) {
      assert.equal(sentence.chunks.map(chunk => chunk.text).join(""), sentence.text);
      assert.ok(sentence.beginnerSyntax?.components.length);
      let cursor = 0;
      const trunk = tokens(sentence.trunk).map(token => token.toLowerCase());
      for (const token of tokens(sentence.text)) if (token.toLowerCase() === trunk[cursor]) cursor += 1;
      assert.equal(cursor, trunk.length, `${sentence.id}主干只能按原文顺序删减`);
      for (const component of sentence.beginnerSyntax.components) {
        assert.ok(sentence.text.includes(component.text), `${sentence.id}/${component.text}`);
        for (const field of ["form", "function", "modifies", "explanation"]) assert.ok(component[field]?.trim());
      }
      for (const clause of sentence.beginnerSyntax.clauses) {
        assert.ok(sentence.text.includes(clause.text), `${sentence.id}/${clause.text}`);
        for (const field of ["type", "marker", "role", "subject", "predicate", "translationOrder"]) assert.ok(clause[field]?.trim());
      }
      for (const phrase of sentence.phrases) {
        assert.ok(sentence.text.includes(phrase), `${sentence.id}/${phrase}`);
        const guide = knowledge.getPhraseKnowledge(phrase);
        assert.ok(guide?.structures.length, `${sentence.id}/${phrase}`);
        assert.ok(guide.meaning?.trim());
      }
      for (const token of tokens(sentence.text)) {
        const lemma = lexicon.canonicalLemma(token, { articleId: article.id, sentenceId: sentence.id });
        const context = contexts.getSentenceWordContext(sentence.id, lemma);
        for (const replacement of context?.contextualSubstitutions ?? []) {
          assert.ok(replacement.rewrittenSentence && replacement.nuance && replacement.chinese);
          const [kind, ...target] = replacement.target.split(":");
          const entry = study.resolveEntry(target.join(":"), kind === "phrase");
          assert.doesNotMatch(entry.contextualMeaning, /该词未出现在|暂无|待精审/);
        }
      }
    }
  }
  for (const word of study.buildYearWordItems(2012)) for (const context of word.contexts) {
    assert.ok(context.meaning?.trim());
    assert.equal(context.meaning, study.resolveEntry(context.sourceForm, false, context.sentenceId).contextualMeaning);
  }
});

test("2012完形逐字保留三段、16句、20题80选项及答案依据", () => {
  const article = data.articleContents["2012-cloze"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-cloze.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(fixture.paragraphs.length, 3);
  assert.equal(article.sentences.length, 16);
  assert.equal(article.questions.length, 20);
  const key = answers.verifiedAnswerKey2012Cloze;
  const restored = fixture.paragraphs.map(row => row.text.replace(/__(\d+)__/g, (_, number) => fixture.options[(Number(number) - 1) * 5 + 1 + "ABCD".indexOf(key[number])].text.replace(/^\[\s*[A-D]\s*\]\s*/, ""))).join(" ");
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(restored));
  assert.equal(normalize(article.sentences.map(sentence => sentence.testText ?? sentence.text).join(" ")).replace(/___\((\d+)\)/g, "__$1__"), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  for (const question of article.questions) {
    assert.equal(question.id, 201200 + question.number);
    assert.equal(question.answer, key[question.number]);
    assert.deepEqual(question.options.map(option => option.text), fixture.options.slice((question.number - 1) * 5 + 1, question.number * 5).map(row => row.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
  }
  assert.equal(key[7], "C");
  assert.match(article.questions[6].explanations.B, /可以成立|可成立/);
  assert.match(article.sentences[8].logic, /历史/);
  assert.equal(article.sentences[1].beginnerSyntax.clauses.length, 6);
  assert.equal(article.sentences[12].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[5].trunk, "And Joe?");
  assert.ok(answers.verifiedAnswerSources2012Cloze.some(source => source.url.includes("hrbeu.edu.cn")));
});

test("2012完形熟词义、分词与专名按实际出处隔离", () => {
  for (const [token, number, meaning] of [["articles", 5, /物品/], ["Issue", 5, /配发/], ["bore", 2, /承担|承受/], ["well", 3, /好|充分/], ["president", 9, /总统/], ["covering", 13, /报道/], ["writing", 13, /写作|报道/], ["Bill", 14, /比尔/], ["point", 16, /时刻/]]) assert.match(study.resolveEntry(token, false, `2012-cloze-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("meaning", { articleId: "2012-cloze", sourceId: "question-201207-option-B" }), "mean");
  assert.equal(lexicon.canonicalLemma("exhaustion", { articleId: "2012-cloze" }), "exhaustion");
  assert.equal(lexicon.canonicalLemma("distinguished", { articleId: "2012-cloze" }), "distinguished");
assert.equal(lexicon.canonicalLemma("writing", { articleId: "2011-writing-a" }), "write");
  assert.equal(lexicon.canonicalLemma("best"), "best");
  assert.ok(study.resolveEntry("articles", false, "2012-cloze-s5").otherMeanings.some(meaning => /文章/.test(meaning)));
});
