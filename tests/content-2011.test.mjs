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
const answers = await vite.ssrLoadModule("/app/verified-answer-keys.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const normalize = value => value.replace(/\s+/g, " ").replace(/\s+([,.;?!])/g, "$1").trim();
const cloze = data.articleContents["2011-cloze"];

function checkReadingSource(articleId, firstQuestion, sentenceCount, answerKey) {
  const article = data.articleContents[articleId];
  const fixture = JSON.parse(readFileSync(new URL(`./fixtures/${articleId}.json`, import.meta.url), "utf8"));
  assert.equal(article.sentences.length, sentenceCount);
  assert.equal(article.questions.length, 5);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(paragraph => paragraph.text).join(" ")));
  article.questions.forEach((question, index) => {
    assert.equal(question.number, firstQuestion + index);
    assert.equal(question.id, 201100 + question.number);
    assert.equal(question.prompt, fixture.questions[index * 5].text.replace(/^\d+\.\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), fixture.questions.slice(index * 5 + 1, index * 5 + 5).map(option => option.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
    assert.equal(question.answer, answerKey[question.number]);
  });
}

test("2011Text1四段19句与原卷、独立答案一致并保留25题分歧说明", () => {
  checkReadingSource("2011-p1", 21, 19, answers.verifiedAnswerKey2011Passage1);
  const article = data.articleContents["2011-p1"];
  assert.equal(article.sentences[16].beginnerSyntax.clauses.length, 6);
  assert.equal(article.questions[4].answer, "D");
  assert.match(article.questions[4].locating, /分歧/);
  assert.match(article.sentences[11].natural, /概率|可能性/);
  assert.doesNotMatch(article.sentences[11].natural, /百分点/);
  for (const source of answers.verifiedAnswerSources2011Passage1) assert.ok(source.url.startsWith("https://"));
});

test("2011Text1词卡纠正董事、股票、副词比较级与过去式，不污染其他篇", () => {
  const cases = [["director", 1, /董事/], ["rest", 2, /余下/], ["compensation", 3, /薪酬/], ["left", 4, /离开|辞去/], ["weathered", 8, /渡过|经受/], ["earnings", 12, /盈利|收益/], ["stock", 13, /股票/], ["worse", 13, /差|不佳/], ["they", 10, /研究人员/], ["them", 15, /董事/], ["times", 18, /时期/], ["once", 19, /再一次/]];
  for (const [token, number, meaning] of cases) assert.match(study.resolveEntry(token, false, `2011-p1-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("worse", { articleId: "2011-p1" }), "badly");
  assert.match(lexicon.getLexicalGuide("worse", { articleId: "2011-p1" }).partOfSpeech, /adv/);
  assert.match(lexicon.getLexicalGuide("offers", { articleId: "2011-p1" }).partOfSpeech, /n\./);
  assert.match(study.resolveEntry("once", false, "2011-cloze-s9").contextualMeaning, /一次/);
  assert.match(study.resolveEntry("very", false, "2011-cloze-s2").partOfSpeech, /adj/);
  assert.match(study.resolveEntry("very", false, "2011-p1-s19").partOfSpeech, /adv/);
  const replacement = lexicon.getLexicalGuide("keep", { articleId: "2011-p1", sentenceId: "2011-p1-s18" }).contextualSubstitutions[0];
  assert.equal(replacement.target, "word:retain");
  assert.ok(study.resolveEntry("retain", false).contextualMeaning);
});

test("2011完形逐字保留附件九段、20题80项及独立答案", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-cloze.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.equal(fixture.paragraphs.length, 9);
  assert.equal(cloze.sentences.length, 16);
  assert.equal(cloze.questions.length, 20);
  assert.deepEqual(cloze.sentences.map(sentence => sentence.id), Array.from({ length: 16 }, (_, index) => `2011-cloze-s${index + 1}`));
  const keys = answers.verifiedAnswerKey2011Cloze;
  const restored = fixture.paragraphs.map(paragraph => paragraph.text.replace(/__(\d+)__/g, (_, number) => {
    const options = fixture.options.slice((Number(number) - 1) * 5 + 1, Number(number) * 5);
    return options["ABCD".indexOf(keys[number])].text.replace(/^\[\s*[A-D]\s*\]\s*/, "");
  })).join(" ");
  assert.equal(normalize(cloze.sentences.map(sentence => sentence.text).join(" ")), normalize(restored));
  assert.equal(normalize(cloze.sentences.map(sentence => sentence.testText ?? sentence.text).join(" ")).replace(/___\((\d+)\)/g, "__$1__"), normalize(fixture.paragraphs.map(paragraph => paragraph.text).join(" ")));
  for (const question of cloze.questions) {
    assert.equal(question.id, 201100 + question.number);
    assert.equal(question.answer, keys[question.number]);
    const sourceOptions = fixture.options.slice((question.number - 1) * 5 + 1, question.number * 5).map(option => option.text.replace(/^\[\s*[A-D]\s*\]\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), sourceOptions);
  }
  assert.match(cloze.sentences[13].text, /an initiative push/);
  assert.ok(answers.verifiedAnswerSources2011Cloze.some(source => source.url.includes("eol.cn")));
});

test("2011完形新语境隔离、词形归一及年份出处中文义", () => {
  const cases = [["very", 2, /恰恰|正是/], ["once", 9, /一次/], ["private", 6, /私营/], ["range", 5, /一系列/], ["services", 5, /服务/], ["push", 14, /推动/], ["license", 8, /执照|许可/], ["licensed", 16, /许可/], ["themselves", 16, /网民|用户/]];
  for (const [token, number, meaning] of cases) {
    const sentenceId = `2011-cloze-s${number}`;
    assert.match(lexicon.getLexicalGuide(token, { articleId: cloze.id, sentenceId }).contextualMeaning, meaning);
    assert.match(study.resolveEntry(token, false, sentenceId).contextualMeaning, meaning);
  }
  assert.match(lexicon.getLexicalGuide("very", { articleId: cloze.id, sentenceId: "2011-cloze-s2" }).partOfSpeech, /adj/);
  assert.equal(lexicon.canonicalLemma("united", { articleId: cloze.id }), "unite");
  assert.equal(lexicon.canonicalLemma("means", { articleId: "2010-p2", sourceId: "question-201027-prompt" }), "mean");
  assert.equal(knowledge.getPhraseKnowledge("should be forced to register").key, "be-forced-to-do");
  const words = study.buildYearWordItems(2011);
  for (const word of words) for (const context of word.contexts) {
    assert.ok(context.meaning?.trim());
    assert.equal(context.meaning, study.resolveEntry(context.sourceForm, false, context.sentenceId).contextualMeaning);
  }
  const provide = lexicon.getLexicalGuide("affords", { articleId: cloze.id, sentenceId: "2011-cloze-s1" }).contextualSubstitutions[0];
  assert.equal(provide.target, "word:provide");
  assert.match(provide.rewrittenSentence, /^The Internet provides/);
  assert.ok(study.resolveEntry("provide", false).contextualMeaning);
  const afford = study.resolveEntry("affords", false, "2011-cloze-s1");
  assert.ok(afford.otherMeanings.some(meaning => /有能力|经济条件/.test(meaning)));
});
