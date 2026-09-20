import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const load = path => vite.ssrLoadModule(`/app/${path}`);
const [data, source, content, study, fixture, keys] = await Promise.all([
  load("data.ts"), load("2013-passage-1-source.ts"), load("article-v2/content.ts"), load("study-app.tsx"),
  readFile(new URL("./fixtures/2013-passage-1-source.json", import.meta.url), "utf8").then(JSON.parse),
  load("verified-answer-keys.ts"),
]);
const [{ ExamPage }, { QuickReadingCard }, { QuestionAnalysisPage }, { ArticleVocabularyPage }] = await Promise.all([
  load("article-v2/exam-page.tsx"), load("article-v2/quick-reading-card.tsx"), load("article-v2/question-mistake-card.tsx"), load("article-v2/article-vocabulary-page.tsx"),
]);
const article = data.articleContents["2013-p1"];
const empty = { version: 1, updatedAt: 0, answers: {}, practiceAttempts: {}, termNotes: {}, sentenceNotes: {}, lists: [], listItems: {}, marks: {}, submittedSections: {} };
const noop = () => {};
const render = (Component, props = {}) => renderToStaticMarkup(React.createElement(Component, { article, data: empty, onUpdate: noop, ...props }));

test("pilot source is an exact, single-article transcription of the supplied DOCX fixture", () => {
  assert.equal(fixture.sha256, "7f00fcff824e1a0c21261d1f4d13e742b8f173748f56ec50abf275b143e75131");
  assert.deepEqual(fixture.bodyParagraphs, [114, 115, 116, 117, 118, 119]);
  assert.deepEqual(source.passage2013P1ParagraphNumbers.map(group => group.map(n => source.passage2013P1Texts[n - 1]).join(" ")), fixture.paragraphs);
  assert.deepEqual(source.passage2013P1RawQuestions, fixture.questions);
  assert.equal(article.sentences.length, 14);
  assert.equal(article.paragraphs.length, 6);
  assert.equal(article.questions.length, 5);
  assert.equal(Object.keys(data.articleContents).length, 37);
  assert.deepEqual(article.questions.map(q => q.answer), ["A", "D", "B", "B", "C"]);
  assert.deepEqual(keys.verifiedAnswerKey2013Passage1, { 21: "A", 22: "D", 23: "B", 24: "B", 25: "C" });
});

test("real pilot uses explicit V2 routing and passes the production content/corpus gate", () => {
  assert.equal(article.experienceVersion, 2);
  assert.deepEqual(data.sectionsByYear[2013].map(item => item.id), ["2013-p1", "2013-p2"]);
  assert.deepEqual(content.validateV2Article(article, study.vocabularyCorpus), []);
  assert.equal(data.articleContents["2012-p1"].experienceVersion, undefined);
});

test("ordinary sentences stay shallow while selected key sentences disclose structure on demand", () => {
  const ordinary = article.sentences[3];
  assert.equal(content.hasDeepReading(ordinary), false);
  assert.equal(ordinary.practice?.length ?? 0, 0);
  const ordinaryHtml = render(QuickReadingCard, { sentence: ordinary, onTerm: noop });
  assert.ok(ordinaryHtml.includes("先这样读"));
  assert.ok(!ordinaryHtml.includes("展开完整结构"));
  const key = article.sentences[13];
  assert.equal(content.hasDeepReading(key), true);
  assert.equal(key.practice.length, 1);
  const keyHtml = render(QuickReadingCard, { sentence: key, onTerm: noop });
  assert.ok(keyHtml.includes('<details class="v2-deep-disclosure"><summary>我还是没读懂'));
  assert.ok(keyHtml.includes("句子骨架与各部分关系"));
  assert.ok(!keyHtml.includes("<details open"));
});

test("exam hides teaching content and preserves all original paragraphs and options", () => {
  const html = render(ExamPage);
  assert.equal((html.match(/data-paragraph-id=/g) ?? []).length, 6);
  assert.equal((html.match(/type="radio"/g) ?? []).length, 20);
  for (const leak of ["正确答案", "一句话意思", "最关键的差别", "同义转换", "句子骨架"]) assert.ok(!html.includes(leak), leak);
});

test("submitted analysis leads with the learner's wrong choice and its exact distinction", () => {
  const answered = { ...empty, answers: { 201321: "B" }, submittedSections: { "2013-p1": true } };
  const html = render(QuestionAnalysisPage, { data: answered, onSource: noop, renderDetails: () => React.createElement("p", null, "完整解析占位") });
  const ordered = ["你选择", "正确答案", "最关键的差别", "最小充分原文证据", "原文怎样换成正确选项", "本次干扰方式"];
  let last = -1;
  for (const label of ordered) { const next = html.indexOf(label); assert.ok(next > last, label); last = next; }
  assert.ok(html.includes("B 说就业压力缓解"));
  assert.ok(html.includes("人更容易找到工作吗"));
});

test("words keep source-specific senses and phrases enter the shared memory system as independent objects", () => {
  const corpus = study.vocabularyCorpus;
  for (const sourceId of ["2013-p1-s1", "question-201321-option-C"]) {
    const textile = study.resolveEntry("textile", false, sourceId);
    assert.equal(textile.partOfSpeech, "adj.");
    assert.equal(textile.contextualMeaning, "纺织业的");
    assert.match(textile.use, /textile 修饰 mills?/);
    assert.doesNotMatch(textile.use, /cars|并列作主语/);
    assert.match(textile.collocations[0], /textile mills?（纺织厂）/);
  }
  const averageMill = corpus.resolveCandidate("average", false, "2013-p1-s1", true);
  const averageOver = corpus.resolveCandidate("average", false, "2013-p1-s5", true);
  assert.ok(averageMill && averageOver);
  assert.notEqual(averageMill.entry.contextualMeaning, averageOver.entry.contextualMeaning);
  assert.notEqual(averageMill.context.id, averageOver.context.id);
  const phrase = corpus.resolveCandidate("stand out", true, "2013-p1-s8", true);
  assert.equal(phrase?.entry.kind, "phrase");
  assert.match(phrase?.entry.key ?? "", /^pattern:/);
  assert.equal(phrase?.context.sourceId, "2013-p1-s8");
  const html = render(ArticleVocabularyPage, { corpus, onTerm: noop, onSource: noop });
  assert.ok(html.includes("独立词组"));
  assert.ok(html.includes("回到原句或题目"));
  assert.ok(html.includes("加入待学"));
  assert.ok(html.includes("加入复习"));
});

test("every pilot word and annotated phrase resolves through its exact source context", async () => {
  const knowledge = await load("knowledge-base.ts");
  const sources = content.articleSources(article);
  const issues = [];
  for (const [sourceId, text] of sources) {
    for (const token of new Set(text.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [])) {
      const guide = study.resolveEntry(token, false, sourceId);
      if (guide.partOfSpeech.startsWith("word（")) issues.push(`${sourceId}/${token}: guessed POS`);
      if (!guide.contextualMeaning?.trim()) issues.push(`${sourceId}/${token}: missing meaning`);
      if (!guide.use?.trim()) issues.push(`${sourceId}/${token}: missing use`);
    }
  }
  for (const sentence of article.sentences) for (const phrase of sentence.phrases) {
    assert.ok(knowledge.getPhraseKnowledge(phrase, { articleId: article.id }), `${sentence.id}/${phrase} missing scoped phrase knowledge`);
  }
  assert.deepEqual(issues, []);
});
