import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const vite = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents["2010-p1"];

function checkEvidence(evidence) {
  const sentence = article.sentences.find(s => s.id === evidence.sentenceId);
  assert.ok(sentence, `证据引用的句子存在：${evidence.sentenceId}`);
  assert.ok(evidence.quote && sentence.text.includes(evidence.quote), `证据必须是连续原文：${evidence.quote}`);
}

test("篇章地图覆盖原卷五段十九句，指代与时间线都能回到原文", async () => {
  const guide = article.guide;
  assert.deepEqual(guide.paragraphs.map(p => p.paragraphId), article.paragraphs.map(p => p.id));
  assert.deepEqual(Object.keys(guide.sentenceRoles), article.sentences.map(s => s.id));
  for (const reference of guide.references) {
    checkEvidence({ sentenceId: reference.sentenceId, quote: reference.expression });
    for (const id of reference.targetSentenceIds) assert.ok(article.sentences.some(s => s.id === id));
  }
  for (const event of [...guide.timeline, ...guide.voices]) {
    assert.ok(event.evidence.length);
    event.evidence.forEach(checkEvidence);
  }
  assert.match(guide.timeline.find(event => event.label.includes("统计区间")).event, /重叠/);
  assert.match(guide.voices.find(voice => voice.speaker === "Edward Dolman").boundary, /不等于作者/);
  const { ArticleGuidePanel } = await vite.ssrLoadModule("/app/article-guide-panel.tsx");
  const html = renderToStaticMarkup(React.createElement(ArticleGuidePanel, { article, onSentence() {} }));
  assert.match(html, /指代|统计区间|是谁在作判断/);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/);
});

test("词块翻译覆盖原文并显式区分补出的中文逻辑", () => {
  for (const sentence of article.sentences) {
    assert.equal(sentence.translationAlignment.map(block => block.english).join(""), sentence.text);
    assert.ok(sentence.translationAlignment.every(block => /[\u4e00-\u9fff]/.test(block.chinese)));
  }
  assert.match(article.sentences[2].translationNotes.join(""), /原文没有however/);
  assert.match(article.sentences[0].literal, /Beautiful Inside My Head Forever/);
  assert.match(article.sentences[11].literal, /担保赔付款/);
});

test("五题证据、范围、反向判断与拆句均引用真实原文", async () => {
  for (const question of article.questions) {
    const r = question.reasoning;
    assert.ok(r && r.restatement && r.transfer);
    assert.equal(new Set(r.evidence.map(e => e.id)).size, r.evidence.length);
    r.evidence.forEach(checkEvidence);
    const ids = new Set(r.evidence.map(e => e.id));
    for (const option of question.options) {
      const reason = r.options[option.key];
      assert.equal(reason.judgment, option.key === question.answer ? "选入" : "排除");
      assert.ok(reason.reasoning && reason.evidenceIds.length);
      for (const id of reason.evidenceIds) assert.ok(ids.has(id));
      if (option.key !== question.answer) assert.ok(reason.errorType);
    }
    for (const chain of r.paraphrases) {
      for (const id of chain.evidenceIds) assert.ok(ids.has(id));
      assert.ok(question.options.some(option => option.text === chain.optionText));
    }
    const analysis = question.analysis;
    assert.equal(analysis.prompt.text, question.prompt);
    for (const [key, option] of Object.entries(analysis.options ?? {})) assert.equal(option.text, question.options.find(o => o.key === key).text);
    for (const part of [analysis.prompt, ...Object.values(analysis.options ?? {})]) {
      assert.equal(part.chunks.map(c => c.text).join(""), part.text);
      part.beginnerSyntax.clauses.forEach(clause => assert.ok(part.text.includes(clause.text)));
      assert.ok(part.chunks.every(c => c.grammarFunction && c.visualRole));
    }
  }
  const q23 = article.questions[2].reasoning;
  assert.equal(q23.scope, "whole-passage");
  for (const key of ["A", "C", "D"]) assert.equal(q23.options[key].errorType, "事实成立，非本题所求");
  assert.equal(q23.options.B.judgment, "选入");
  const q25 = article.questions[4].reasoning;
  assert.equal(q25.scope, "whole-passage");
  const covered = new Set(q25.evidence.map(e => article.paragraphs.find(p => p.sentenceIds.includes(e.sentenceId)).id));
  assert.equal(covered.size, 5);
  const { QuestionEvidencePanel } = await vite.ssrLoadModule("/app/question-evidence-panel.tsx");
  const html = renderToStaticMarkup(React.createElement(QuestionEvidencePanel, { question: article.questions[2], onSentence() {} }));
  assert.match(html, /全文范围/);
  assert.match(html, /事实成立，非本题所求/);
  assert.match(html, /矛盾对照/);
});

test("十九句任务有真实证据与稳定概念，不用展开记录充当掌握", async () => {
  const model = await vite.ssrLoadModule("/app/learning-model.ts");
  for (const sentence of article.sentences) {
    assert.ok(sentence.practice.length >= 1 && sentence.practice.length <= 3);
    assert.equal(new Set(sentence.practice.map(task => task.id)).size, sentence.practice.length);
    for (const task of sentence.practice) {
      assert.ok(sentence.text.includes(task.evidence), `${sentence.id}: ${task.evidence}`);
      assert.ok(Object.hasOwn(model.grammarConcepts, task.conceptId));
      assert.ok(Object.hasOwn(model.errorCategories, task.errorType));
      assert.ok(task.kind === "token" ? sentence.text.includes(task.answer) : task.options.includes(task.answer));
    }
    assert.equal(model.sentencePracticeStatus(sentence.practice, {}, sentence.id), "new");
  }
  const sentence = article.sentences[2], task = sentence.practice[0];
  const first = { id: "first", articleId: article.id, sentenceId: sentence.id, taskId: task.id, revision: 1, answer: "wrong", correct: false, assisted: false, at: 10, conceptId: task.conceptId, errorType: task.errorType };
  const second = { ...first, id: "second", at: 20, correct: true, assisted: true, answer: task.answer };
  assert.equal(model.sentencePracticeStatus(sentence.practice, { first }, sentence.id), "needs-review");
  assert.equal(model.sentencePracticeStatus(sentence.practice, { first, second }, sentence.id), "assisted");
  assert.equal(model.practiceDueAt(first), first.at);
  assert.equal(model.practiceDueAt(second), second.at + 86400000);
  assert.equal(model.sentencePracticeStatus(sentence.practice, { stale: { ...second, revision: 99 } }, sentence.id), "new");
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const props = { sentence, attempts: {}, reflection: model.emptyReflection(), revealed: false, onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} };
  const before = renderToStaticMarkup(React.createElement(SentencePracticePanel, props));
  assert.doesNotMatch(before, /practice-feedback|参考：/);
  assert.match(before, /disabled=""[^>]*>先完成至少一项尝试/);
  const after = renderToStaticMarkup(React.createElement(SentencePracticePanel, { ...props, attempts: { first } }));
  assert.match(after, /这项需要再练/);
  assert.match(after, /查看主干与讲解/);
  const { vocabularyPriority } = await vite.ssrLoadModule("/app/vocabulary-priority.ts");
  const entry = headword => ({ headword, display: headword, kind: "word" });
  assert.equal(vocabularyPriority(entry("hirst"), "2010-p1-s1", article.id).defaultReview, false);
  assert.equal(vocabularyPriority(entry("momentum"), "2010-p1-s5", article.id).id, "core");
  assert.equal(vocabularyPriority(entry("note"), "2010-p1-s1", article.id).id, "sense");
  assert.equal(vocabularyPriority(entry("art"), "2010-p1-s6", article.id).id, "name");
  assert.notEqual(vocabularyPriority(entry("art"), "2010-p1-s1", article.id).id, "name");
});

test("定位练习在提交前不显示参考，空白未练不计错误", async () => {
  const { QuestionLocationPractice } = await vite.ssrLoadModule("/app/question-location-practice.tsx");
  const props = { question: article.questions[0], sentences: article.sentences, work: { scope: "", sentenceIds: [] }, submitted: false, onChange() {} };
  const before = renderToStaticMarkup(React.createElement(QuestionLocationPractice, props));
  assert.doesNotMatch(before, /参考范围是|已列入定位复盘|已覆盖参考定位/);
  const blank = renderToStaticMarkup(React.createElement(QuestionLocationPractice, { ...props, submitted: true }));
  assert.match(blank, /不计作错误/);
  const matched = renderToStaticMarkup(React.createElement(QuestionLocationPractice, { ...props, submitted: true, work: { scope: "adjacent-sentences", sentenceIds: ["2010-p1-s3", "2010-p1-s4"] } }));
  assert.match(matched, /已覆盖参考定位的关键位置/);
  assert.match(matched, /不等于推理一定正确/);
});
