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
