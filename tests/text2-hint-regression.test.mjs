import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { StudySentence } = await vite.ssrLoadModule("/app/study-app.tsx");
const m = await vite.ssrLoadModule("/app/learning-model.ts");
const { trainingSources } = await vite.ssrLoadModule("/app/training-sources.ts");
const article = articleContents["2010-p2"], sources = trainingSources(article);
const sentence = number => article.sentences[number - 1];
const task = (number, id) => sentence(number).practice.find(item => item.id === id);
const decode = text => text.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

test("Text 2提示词来自讲解解锁前的真实单词或词组按钮", () => {
  for (const item of article.sentences) {
    const html = renderToStaticMarkup(React.createElement(StudySentence, {
      sentence: item, mode: "words", showPhrases: true, isExpanded: false, isMarked: false,
      note: "", onToggle() {}, onMark() {}, onTerm() {}, onNote() {},
    }));
    const labels = new Set([...html.matchAll(/<button\b[^>]*>([^<]*)<\/button>/g)].map(match => decode(match[1]).toLowerCase()));
    for (const itemTask of item.practice) for (const label of itemTask.hintWords ?? []) {
      assert.ok(labels.has(label.toLowerCase()), `${item.id}/${itemTask.id}: ${label}不是原句查词入口`);
    }
  }
});

test("查真实变形、缩写和原文词组后，相关答对记为辅助而非独立掌握", () => {
  const cases = [
    [1, "invitation-actors", "them"], [1, "group-clause", "invited"],
    [2, "perfect-state", "had"], [2, "perfect-state", "been"],
    [4, "finite-nodded", "nodded"], [4, "finite-nodded", "nodded in agreement"],
    [5, "gesture-and-quote", "She's"], [6, "two-reactions", "looked"],
    [7, "quote-reference", "It's"], [8, "nothing-to-say", "nothing to say"],
    [9, "if-condition", "we'd"], [9, "keep-object-complement", "going"],
    [11, "havoc-direction", "wreaking havoc with marriage"], [12, "passive-trunk", "observed"],
    [13, "give-as", "gave"], [14, "given-premise", "Given the current divorce rate"],
    [15, "complaint-subject", "complaints"], [15, "negated-focus", "focused not on tangible inequities"],
    [17, "talk-to", "talk to me"], [18, "few-and-first", "first and foremost"],
    [19, "scene-actors", "sitting"], [19, "scene-actors", "held"], [19, "scene-actors", "wanting"],
    [19, "scene-actors", "with a newspaper held up in front of his face"],
  ];
  for (const [number, id, label] of cases) {
    const item = sentence(number), itemTask = task(number, id);
    const affected = m.practiceHintTargets(sources, "word", label, item.id);
    assert.ok(affected.includes(m.taskKey(item.id, itemTask)), `${item.id}/${id}: ${label}漏记提示`);
    const session = m.addPracticeHint({ id: "current-round", startedAt: 1, lastActiveAt: 1, hints: [] }, {
      id: "lookup", type: "word", source: label, at: 2, taskKeys: affected,
    });
    const attempt = m.makePracticeAttempt({ id: "after-lookup", articleId: article.id, sentenceId: item.id, task: itemTask, answer: itemTask.answer, at: 3, session });
    assert.equal(attempt.correct, true);
    assert.equal(attempt.assisted, true);
    assert.equal(m.independentAttempt(attempt), false);
  }
});

test("无关人名、同句无关查词和只教内层关系的反馈不污染其他任务", () => {
  for (const [number, label] of [[1, "Virginia"], [12, "Hacker"], [13, "Riessman"], [18, "Hacker"]]) {
    assert.deepEqual(m.practiceHintTargets(sources, "word", label, sentence(number).id), []);
  }
  const adverb = task(2, "adverb-attachment"), contrast = task(2, "public-contrast"), predicate = task(2, "perfect-state");
  const adverbHints = m.practiceHintTargets(sources, "word", "frequently", sentence(2).id);
  assert.ok(adverbHints.includes(m.taskKey(sentence(2).id, adverb)));
  assert.ok(!adverbHints.includes(m.taskKey(sentence(2).id, predicate)));
  assert.ok(!adverbHints.includes(m.taskKey(sentence(2).id, contrast)));
  const feedback = (number, id) => m.practiceHintTargets(sources, "previous-answer", id, sentence(number).id, task(number, id));
  assert.ok(!feedback(2, "adverb-attachment").includes(m.taskKey(sentence(2).id, contrast)));
  assert.ok(!feedback(18, "want-complement").includes(m.taskKey(sentence(18).id, task(18, "reported-contrast"))));
  assert.ok(feedback(18, "reported-contrast").includes(m.taskKey(sentence(18).id, task(18, "want-complement"))));
  assert.ok(feedback(14, "given-premise").includes(m.taskKey(sentence(14).id, task(14, "rate-denominator"))));
});

test("提示判定或题干变化的任务升版，旧事件保留但不冒充新版独立掌握", () => {
  // 本轮仅这两个任务的题意、查词入口及反馈依赖均未改变。
  const unchanged = new Set(["2010-p2-s10/content-clause", "2010-p2-s14/rate-denominator"]);
  assert.match(task(2, "perfect-state").prompt, /伴随动作和地点留在词块池中，不选入主系表/);
  let revisedCount = 0;
  for (const item of article.sentences) for (const itemTask of item.practice) {
    const isUnchanged = unchanged.has(`${item.id}/${itemTask.id}`);
    assert.equal(itemTask.revision, isUnchanged ? 1 : 2, `${item.id}/${itemTask.id}版本与判定变更一致`);
    const oldTask = { ...itemTask, revision: 1 };
    const session = { id: "old-round", startedAt: 1, lastActiveAt: 2, hints: [] };
    const oldAttempt = m.makePracticeAttempt({ id: `${item.id}/${itemTask.id}/old`, articleId: article.id, sentenceId: item.id, task: oldTask, answer: oldTask.answer, at: 2, session });
    const attempts = { [oldAttempt.id]: oldAttempt };
    assert.equal(m.independentAttempt(oldAttempt), true, "旧事件保留当时判定，不反向篡改历史");
    if (isUnchanged) {
      assert.equal(m.latestTaskAttempt(attempts, itemTask, item.id), oldAttempt);
    } else {
      revisedCount++;
      assert.equal(m.latestTaskAttempt(attempts, itemTask, item.id), undefined);
      assert.equal(m.sentencePracticeStatus([itemTask], attempts, item.id), "new");
    }
    assert.equal(attempts[oldAttempt.id], oldAttempt);
    assert.equal(attempts[oldAttempt.id].revision, 1);
  }
  assert.equal(revisedCount, 33);
  assert.equal(task(10, "content-clause").revision, 1);
  assert.equal(task(14, "rate-denominator").revision, 1);
});
