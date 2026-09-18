import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents["2010-p1"];

function checkTaskAnswer(task, text) {
  if (task.kind === "token") return assert.ok(text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g).includes(task.answer));
  if (task.kind === "range") return assert.ok((task.rangeText ?? text).includes(task.answer));
  if (task.kind === "choice") return assert.ok(task.options.includes(task.answer));
  const answer = JSON.parse(task.answer);
  assert.ok(answer.length && answer.every(value => task.options.includes(value)));
  if (task.kind === "link") assert.deepEqual(answer, task.links.map(link => link.target));
  else { assert.equal(task.kind, "order"); assert.equal(new Set(answer).size, answer.length); }
}

test("声明完成的训练层必须具备可核对的结构，不能只更改完成标签", async () => {
  const { withReviewedSyntax } = await vite.ssrLoadModule("/app/reviewed-syntax.ts");
  const { grammarConcepts, errorCategories } = await vite.ssrLoadModule("/app/learning-model.ts");
  assert.deepEqual(article.teachingStatus, { syntax: true, vocabulary: true, evidence: true, practice: true });
  for (const item of Object.values(articleContents)) {
    const status = item.teachingStatus;
    if (!status) continue; // 既有内容仍明确标作待升级，不用兼容界面冒充完成。
    const sentences = new Map(item.sentences.map(sentence => [sentence.id, sentence]));
    const evidence = value => assert.ok(sentences.get(value.sentenceId)?.text.includes(value.quote) && value.quote.trim(), `${item.id}的证据必须来自连续原文`);
    if (status.syntax) for (const sentence of item.sentences) {
      assert.ok(sentence.beginnerSyntax?.reading?.focus, `${sentence.id}缺阅读关键`);
      assert.ok(sentence.chunks.every(chunk => chunk.visualRole && chunk.grammarFunction && !chunk.role));
      assert.deepEqual(withReviewedSyntax(sentence, sentence.chunks.map(chunk => chunk.visualRole)).chunks, sentence.chunks);
      assert.equal(sentence.translationAlignment?.map(block => block.english).join(""), sentence.text);
    }
    if (status.practice) {
      assert.ok(item.guide && item.paragraphs?.length, `${item.id}缺原卷段落和篇章地图`);
      assert.deepEqual(item.paragraphs.flatMap(paragraph => paragraph.sentenceIds), [...sentences.keys()]);
      assert.equal(new Set(item.paragraphs.map(p => p.id)).size, item.paragraphs.length);
      assert.deepEqual(item.guide.paragraphs.map(p => p.paragraphId), item.paragraphs.map(p => p.id));
      assert.ok(item.guide.route.length && item.guide.mainIdea);
      for (const sentence of item.sentences) {
        assert.ok(item.guide.sentenceRoles[sentence.id]);
        const tasks = sentence.practice;
        assert.ok(tasks?.length >= 1 && tasks.length <= 3, `${sentence.id}需1—3个任务`);
        assert.equal(new Set(tasks.map(task => task.id)).size, tasks.length);
        for (const task of tasks) {
          assert.ok(task.id && task.prompt && task.feedback && Number.isSafeInteger(task.revision) && task.revision > 0);
          assert.ok(Object.hasOwn(grammarConcepts, task.conceptId) && Object.hasOwn(errorCategories, task.errorType));
          evidence({ sentenceId: sentence.id, quote: task.evidence });
          checkTaskAnswer(task, sentence.text);
        }
      }
      for (const ref of item.guide.references) {
        evidence({ sentenceId: ref.sentenceId, quote: ref.expression });
        assert.ok(ref.targetSentenceIds.length && ref.targetSentenceIds.every(id => sentences.has(id)));
      }
      for (const entry of [...item.guide.timeline, ...item.guide.voices]) {
        assert.ok(entry.evidence.length); entry.evidence.forEach(evidence);
      }
    }
    if (status.evidence) for (const question of item.questions) {
      const reasoning = question.reasoning;
      assert.ok(reasoning?.evidence.length && reasoning.questionType && reasoning.restatement && reasoning.transfer);
      assert.ok(["sentence", "adjacent-sentences", "paragraph", "whole-passage"].includes(reasoning.scope));
      reasoning.evidence.forEach(evidence);
      const ids = new Set(reasoning.evidence.map(entry => entry.id));
      assert.equal(ids.size, reasoning.evidence.length);
      assert.deepEqual(Object.keys(reasoning.options).sort(), question.options.map(option => option.key).sort());
      for (const option of question.options) {
        const reason = reasoning.options[option.key];
        assert.equal(reason.judgment, option.key === question.answer ? "选入" : "排除");
        assert.ok(reason.reasoning && reason.evidenceIds.length && reason.evidenceIds.every(id => ids.has(id)));
        if (option.key !== question.answer) assert.ok(reason.errorType);
      }
      assert.ok(reasoning.paraphrases.length);
      for (const link of reasoning.paraphrases) {
        assert.ok(link.evidenceIds.length && link.evidenceIds.every(id => ids.has(id)));
        assert.ok(question.options.some(option => option.text === link.optionText));
      }
      for (const group of reasoning.locatingGroups ?? []) assert.ok(group.length && group.every(id => sentences.has(id)));
      if (reasoning.scope !== "sentence") assert.ok(new Set(reasoning.evidence.map(entry => entry.sentenceId)).size > 1, "联合定位不能仍只有单句证据");
    }
  }
});

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
  const initial = renderToStaticMarkup(React.createElement(ArticleGuidePanel, { article, onSentence() {} }));
  assert.match(initial, /先尝试全部3项/); assert.doesNotMatch(initial, /class="article-main-idea"|class="paragraph-map"/);
  const html = renderToStaticMarkup(React.createElement(ArticleGuidePanel, { article: { ...article, guide: { ...guide, practice: undefined } }, onSentence() {} }));
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
    assert.deepEqual(Object.keys(analysis.options ?? {}).sort(), question.options.map(option => option.key).sort(), "Text 1所有选项均有语言讲解，不只分析正确项");
    for (const [key, option] of Object.entries(analysis.options ?? {})) assert.equal(option.text, question.options.find(o => o.key === key).text);
    for (const part of [analysis.prompt, ...Object.values(analysis.options ?? {})]) {
      assert.equal(part.chunks.map(c => c.text).join(""), part.text);
      const checkChildren = (components, parent) => components.forEach(component => {
        assert.ok(parent.includes(component.text), `${part.id}子成分必须在父范围内：${component.text}`);
        checkChildren(component.children ?? [], component.text);
      });
      checkChildren(part.beginnerSyntax.components, part.text);
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
      checkTaskAnswer(task, sentence.text);
    }
    assert.equal(model.sentencePracticeStatus(sentence.practice, {}, sentence.id), "new");
  }
  const sentence = article.sentences[2], task = sentence.practice[0];
  const first = { id: "first", articleId: article.id, sentenceId: sentence.id, taskId: task.id, revision: 1, answer: "wrong", correct: false, assisted: false, at: 10, conceptId: task.conceptId, errorType: task.errorType };
  const second = { ...first, id: "second", at: 20, correct: true, assisted: true, answer: task.answer };
  assert.equal(model.sentencePracticeStatus(sentence.practice, { first }, sentence.id), "needs-review");
  assert.equal(model.sentencePracticeStatus(sentence.practice, { first, second }, sentence.id), "assisted");
  assert.equal(model.practiceDueAt(first), first.at + model.DAY_MS);
  assert.equal(model.practiceDueAt(second), second.at + 86400000);
  assert.equal(model.sentencePracticeStatus(sentence.practice, { stale: { ...second, revision: 99 } }, sentence.id), "new");
  const { TrainingReview } = await vite.ssrLoadModule("/app/training-review.tsx");
  const review = renderToStaticMarkup(React.createElement(TrainingReview, { articles: [article], attempts: { first }, reflections: {}, questionWork: {}, submitted: {}, now: first.at + model.DAY_MS, onSentence() {}, onQuestion() {} }));
  assert.match(review, /2010 Text 1 · 第3句/); assert.match(review, /主系表/); // 答错按新规则次日到期；错误记录仍保留。
  assert.doesNotMatch(review, /本次没有到期/);
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const props = { sentence, attempts: {}, session: { id: "round", startedAt: 0, lastActiveAt: 10, hints: [] }, reflection: model.emptyReflection(), revealed: false, onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} };
  const before = renderToStaticMarkup(React.createElement(SentencePracticePanel, props));
  assert.doesNotMatch(before, /practice-feedback|参考：/);
  assert.match(before, /disabled=""[^>]*>先完成至少一项尝试/);
  const after = renderToStaticMarkup(React.createElement(SentencePracticePanel, { ...props, attempts: { first: { ...first, sessionId: "round" } } }));
  assert.match(after, /这项需要再练/);
  assert.match(after, /查看主干与讲解/);
  const { vocabularyPriority } = await vite.ssrLoadModule("/app/vocabulary-priority.ts");
  const entry = headword => ({ headword, display: headword, kind: "word" });
  assert.equal(vocabularyPriority(entry("hirst"), "2010-p1-s1", article.id).recommendedReview, false);
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
  assert.match(matched, /关键覆盖、选句精确度和范围判断均符合参考路径/);
  assert.match(matched, /不能证明推理正确/);
});


test("提示只作用于相关任务，隔日无提示重练恢复独立，间隔按实际历史递进", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const [predicate, subject] = article.sentences[0].practice;
  const sentenceId = article.sentences[0].id;
  let session = m.continuePracticeSession(undefined, 100, "round-1");
  const add = (type, source, keys) => session = m.addPracticeHint(session, { id: `${type}-${source}`, type, source, at: 100, taskKeys: keys });
  add("article-map", "map", article.sentences.flatMap(s => s.practice.filter(t => m.hintAffectsTask(t, "article-map", "map")).map(t => m.taskKey(s.id, t))));
  add("word", "Damien Hirst", []);
  const answer = (task, at, current = session) => m.makePracticeAttempt({ id: `a-${task.id}-${at}`, articleId: article.id, sentenceId, task, answer: task.answer, at, session: current });
  assert.equal(answer(predicate, 101).assisted, false, "文章地图及人名不影响谓语题");
  add("previous-answer", predicate.id, [m.taskKey(sentenceId, predicate)]);
  assert.equal(answer(subject, 102).assisted, false, "第一题反馈不无条件污染第二题");
  assert.equal(answer(predicate, 102).assisted, true, "本轮刚看过本题反馈的重做仍记提示");
  assert.equal(m.hintAffectsTask(predicate, "word", "ended"), true);
  const fresh = m.continuePracticeSession(session, 3 * m.DAY_MS, "round-2");
  assert.equal(fresh.hints.length, 0);
  const independent = answer(predicate, 3 * m.DAY_MS, fresh);
  assert.equal(independent.relevantHintUsed, false);
  const wrong = { ...answer(predicate, 101), correct: false, answer: "history" };
  assert.equal(m.sentencePracticeStatus([predicate], { wrong, independent }, sentenceId), "independent");
  const successes = [independent];
  for (const days of [3, 7, 14, 30]) {
    const schedule = m.practiceSchedule(successes);
    assert.equal(schedule.intervalDays, days);
    const nextSession = m.continuePracticeSession(undefined, schedule.dueAt, `round-${days}`);
    successes.push(answer(predicate, schedule.dueAt, nextSession));
  }
  const firstSchedule = m.practiceSchedule([independent]);
  assert.deepEqual(m.practiceSchedule([independent, { ...independent, id: "early", at: independent.at + 1 }]), firstSchedule, "提前刷题不晋级也不延后到期日");
  const failed = { ...successes.at(-1), id: "failed", at: successes.at(-1).at + 1, correct: false };
  assert.equal(m.practiceSchedule([...successes, failed]).intervalDays, 1);
  assert.equal(m.practiceSchedule([...successes, failed]).streak, 0);
  const metrics = m.practiceMetrics([{ id: sentenceId, practice: [predicate] }], { wrong }, 101);
  assert.deepEqual(metrics, { total: 1, completed: 1, independent: 0, due: 0 });
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const oldAnswerHidden = renderToStaticMarkup(React.createElement(SentencePracticePanel, { sentence: article.sentences[0], attempts: { wrong }, session: fresh, reflection: m.emptyReflection(), revealed: false, onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} }));
  assert.doesNotMatch(oldAnswerHidden, /practice-feedback|参考：/);
  assert.ok(m.isPracticeAttempt(independent));
  assert.equal(m.isPracticeAttempt({ ...independent, relevantHintUsed: true }), false);
  assert.ok(m.isPracticeSession(fresh));
  const restored = m.preserveTrainingRecords({ practiceAttempts: { independent }, practiceSessions: { [article.id]: fresh } }, { termNotes: { note: "旧端笔记" } });
  assert.equal(restored.practiceAttempts.independent, independent);
  assert.equal(restored.practiceSessions[article.id], fresh);
});

test("定位同时检查覆盖、精确率与范围，全选不能通过，23题接受多条证据路径", async () => {
  const { assessLocation, makeLocationAttempt, isLocationAttempt, locationHistory } = await vite.ssrLoadModule("/app/location-model.ts");
  const ids = article.sentences.map(s => s.id), select = (...n) => n.map(n => `2010-p1-s${n}`);
  const q24 = article.questions[3].reasoning;
  assert.equal(assessLocation(q24, { scope: "sentence", sentenceIds: ids }, ids).passed, false);
  const exact = assessLocation(q24, { scope: "sentence", sentenceIds: select(18) }, ids);
  assert.equal(exact.passed, true);
  assert.equal(assessLocation(q24, { scope: "sentence", sentenceIds: select(17, 18, 19) }, ids).passed, true);
  const noise = assessLocation(q24, { scope: "sentence", sentenceIds: select(1, 18) }, ids);
  assert.equal(noise.coverage, 1); assert.equal(noise.precision, .5); assert.equal(noise.passed, false);
  assert.equal(assessLocation(q24, { scope: "whole-passage", sentenceIds: select(18) }, ids).passed, false);
  for (const numbers of [[5, 8], [8, 11, 14, 19], [7, 8, 11, 19]]) assert.equal(assessLocation(article.questions[2].reasoning, { scope: "whole-passage", sentenceIds: select(...numbers) }, ids).passed, true);
  for (const question of article.questions) {
    const policy = question.reasoning.locationPolicy;
    assert.ok(policy.revision > 0 && policy.paths.length);
    for (const path of policy.paths) assert.ok(path.groups.length && path.groups.flat().concat(path.supportingSentenceIds).every(id => ids.includes(id)));
    assert.equal(assessLocation(question.reasoning, { scope: question.reasoning.scope, sentenceIds: ids }, ids).passed, false);
  }
  const first = makeLocationAttempt({ id: "first", articleId: article.id, questionId: 201024, at: 1, stage: "initial", work: { scope: "sentence", sentenceIds: ids } }, q24, ids);
  const second = makeLocationAttempt({ id: "second", articleId: article.id, questionId: 201024, at: 2, stage: "review", work: { scope: "sentence", sentenceIds: select(18) } }, q24, ids);
  assert.ok(isLocationAttempt(first) && isLocationAttempt(second));
  assert.deepEqual(locationHistory({ first, second }, 201024).map(a => a.result.passed), [false, true]);
  const { preserveTrainingRecords } = await vite.ssrLoadModule("/app/learning-model.ts");
  assert.equal(Object.keys(preserveTrainingRecords({ locationAttempts: { first } }, { locationAttempts: { second } }).locationAttempts).length, 2);
  const { isStudySnapshot, hasStudyRecords } = await vite.ssrLoadModule("/app/study-sync.ts");
  assert.ok(isStudySnapshot({ version: 1, updatedAt: 1, locationAttempts: { first, second } }));
  assert.ok(hasStudyRecords({ locationAttempts: { first } }));
  assert.equal(isStudySnapshot({ version: 1, updatedAt: 1, locationAttempts: { invalid: {} } }), false);
});

test("交卷后的新定位不锁住输入，初次与复盘结果分开保存", async () => {
  const { QuestionLocationPractice } = await vite.ssrLoadModule("/app/question-location-practice.tsx");
  const html = renderToStaticMarkup(React.createElement(QuestionLocationPractice, { question: article.questions[3], sentences: article.sentences, work: { scope: "sentence", sentenceIds: ["2010-p1-s18"] }, submitted: true, editing: true, onChange() {} }));
  assert.match(html, /提交本次定位/); assert.doesNotMatch(html, /disabled/); assert.doesNotMatch(html, /关键覆盖 100/);
  const { OriginalPassage } = await vite.ssrLoadModule("/app/original-passage.tsx");
  const reading = renderToStaticMarkup(React.createElement(OriginalPassage, { article, marked: new Set(), onMark() {}, selection: { questionNumber: 24, ids: ["2010-p1-s18"], onToggle() {}, onDone() {} } }));
  assert.equal((reading.match(/class="original-paragraph"/g) ?? []).length, 5);
  assert.equal((reading.match(/class="location-sentence"/g) ?? []).length, 19);
  assert.equal((reading.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.match(reading, /完成选择，返回原题/);
});

test("复杂句有生成型任务、原文范围可操作，改版历史不冒充新任务通过", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const { PracticeTaskInput } = await vite.ssrLoadModule("/app/practice-task-input.tsx");
  for (const n of [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19]) {
    const sentence = article.sentences[n - 1];
    assert.ok(sentence.practice.some(t => ["range", "link", "order"].includes(t.kind)), sentence.id);
    for (const task of sentence.practice) {
      checkTaskAnswer(task, sentence.text);
      if (task.kind === "range") {
        const source = task.rangeText ?? sentence.text, tokens = m.rangeTokens(source), offset = source.indexOf(task.answer);
        const first = tokens.findIndex(token => token.start === offset), last = tokens.findIndex(token => token.end === offset + task.answer.length);
        assert.ok(first >= 0 && last >= first, `${sentence.id}范围端点必须可点击`);
        assert.equal(m.selectedRange(source, first, last), task.answer);
      }
      if (["range", "link", "order"].includes(task.kind)) {
        assert.equal(task.revision, 2);
        const old = { id: "old", sentenceId: sentence.id, taskId: task.id, revision: 1, answer: task.answer, correct: true, at: 1 };
        assert.equal(m.latestTaskAttempt({ old }, task, sentence.id), undefined);
        const html = renderToStaticMarkup(React.createElement(PracticeTaskInput, { task, text: sentence.text, attemptNumber: 0, onAnswer() {} }));
        assert.match(html, /提交所选范围|提交连接|提交组合/);
        assert.doesNotMatch(html, /正确答案/);
      }
    }
  }
  assert.equal(m.selectedRange("A quick test.", 2, 0), "A quick test");
  assert.deepEqual(m.practiceOptions(["A", "B", "C"], "task", 0), m.practiceOptions(["A", "B", "C"], "task", 0));
  assert.notDeepEqual(m.practiceOptions(["A", "B", "C"], "task", 0), m.practiceOptions(["A", "B", "C"], "task", 1));
});

test("地图先主动回忆三项，反馈只泄露声明的任务，不扩大到全篇句法", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const { trainingSources, articleMapSource } = await vite.ssrLoadModule("/app/training-sources.ts");
  const sources = trainingSources(article), map = articleMapSource(article);
  assert.equal(map.practice.length, 3);
  for (const task of map.practice) { checkTaskAnswer(task, map.text); assert.ok(map.text.includes(task.evidence)); }
  for (const source of sources) for (const task of source.practice ?? []) {
    for (const id of task.leaksToTaskIds ?? []) assert.ok(source.practice.some(t => t.id === id));
    for (const leak of task.leaksToTasks ?? []) assert.ok(sources.some(s => s.id === leak.sentenceId && s.practice?.some(t => t.id === leak.taskId)));
  }
  const targets = m.practiceHintTargets(sources, "previous-answer", "map-feedback", map.id, map.practice[1]);
  assert.ok(targets.some(key => key.includes("2010-p1-s17/not-but")));
  assert.ok(!targets.some(key => key.includes("2010-p1-s1/main-predicate")));
  const first = article.sentences[0], predicate = first.practice[0], subject = first.practice[1];
  assert.ok(!m.practiceHintTargets(sources, "previous-answer", "first-feedback", first.id, predicate).includes(m.taskKey(first.id, subject)));
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const session = { id: "map-round", startedAt: 1, lastActiveAt: 5, hints: [] };
  const attempts = {};
  const props = { sentence: map, attempts, session, reflection: m.emptyReflection(), revealed: false, minAttempts: 3, allowReflection: false, revealLabel: "查看完整文章地图", onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} };
  map.practice.forEach((task, i) => attempts[i] = m.makePracticeAttempt({ id: String(i), articleId: article.id, sentenceId: map.id, task, answer: "__unsure__", at: 2 + i, session }));
  const ready = renderToStaticMarkup(React.createElement(SentencePracticePanel, props));
  assert.match(ready, /class="show-teaching">查看完整文章地图/);
  assert.doesNotMatch(ready, /translation-trial/);
});

test("复盘显示篇目与错误时间，能直接打开指定任务，词汇优先级明确是建议", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const sentence = article.sentences[4], task = sentence.practice[0];
  const session = { id: "review-round", startedAt: 1, lastActiveAt: 2, hints: [] };
  const attempt = m.makePracticeAttempt({ id: "wrong-link", articleId: article.id, sentenceId: sentence.id, task, answer: JSON.stringify(["losing", "losing"]), at: 2, session });
  const { TrainingReview } = await vite.ssrLoadModule("/app/training-review.tsx");
  const html = renderToStaticMarkup(React.createElement(TrainingReview, { articles: [article], attempts: { [attempt.id]: attempt }, reflections: {}, questionWork: {}, submitted: {}, now: m.DAY_MS + 2, onSentence() {}, onQuestion() {} }));
  assert.match(html, /2010 Text 1 · 第5句/); assert.match(html, /The world art market/); assert.match(html, /上次错误/); assert.match(html, /since 2003 → losing/);
  assert.match(html, /今日到期/); assert.match(html, /曾经借助提示/); assert.match(html, /全部文章/);
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const direct = renderToStaticMarkup(React.createElement(SentencePracticePanel, { sentence, initialTaskId: "duration", attempts: {}, reflection: m.emptyReflection(), revealed: false, onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} }));
  assert.match(direct, /按时间关系排列三块意思/); assert.doesNotMatch(direct, /class="link-task"/);
  const { vocabularyPriority } = await vite.ssrLoadModule("/app/vocabulary-priority.ts");
  const name = vocabularyPriority({ headword: "hirst", display: "Hirst", kind: "word" }, "2010-p1-s1", article.id);
  assert.match(name.reason, /建议不加入/); assert.doesNotMatch(name.reason, /默认/);
  const functionWord = vocabularyPriority({ headword: "that", display: "that", kind: "word" }, "2010-p1-s9", article.id);
  assert.equal(functionWord.recommendedReview, false); assert.match(functionWord.reason, /句法任务/);
  assert.doesNotMatch(article.sentences[1].beginnerSyntax.components.map(c => `${c.modifies}${c.explanation}`).join(""), /对象性主语/);
  assert.match(article.sentences[0].natural, /拍卖达米恩/);
});

const text2 = articleContents["2010-p2"];

test("Text 2按用户原卷保留五段，题干及所有选项的语言分析与实际文本一致", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2010-p2-source.json", import.meta.url), "utf8"));
  const normalize = text => text.replace(/\s+/g, " ").trim();
  const sentence = new Map(text2.sentences.map(s => [s.id, s.text]));
  assert.deepEqual(text2.paragraphs.map(p => normalize(p.sentenceIds.map(id => sentence.get(id)).join(" "))), fixture.paragraphs.map(normalize));
  assert.deepEqual(text2.questions.map(q => q.answer), ["A", "C", "B", "D", "B"]);
  let phrases = 0;
  for (const question of text2.questions) {
    assert.equal(question.analysis.prompt.text, question.prompt);
    assert.equal(Object.keys(question.analysis.options).length, 4);
    for (const option of question.options) assert.equal(question.analysis.options[option.key].text, option.text);
    for (const analysis of [question.analysis.prompt, ...Object.values(question.analysis.options)]) {
      assert.equal(analysis.chunks.map(c => c.text).join(""), analysis.text);
      assert.ok(analysis.chunks.every(c => c.visualRole && c.grammarFunction));
      const check = (components, parent) => components.forEach(c => {
        assert.ok(parent.includes(c.text), `${analysis.id}: ${c.text}`);
        check(c.children ?? [], c.text);
      });
      check(analysis.beginnerSyntax.components, analysis.text);
      for (const clause of analysis.beginnerSyntax.clauses) {
        assert.ok(analysis.text.includes(clause.text));
        assert.ok(!clause.objectOrComplement, "从句细节不能继续混称宾语或表语");
      }
      if (analysis.textKind === "phrase") {
        phrases++;
        assert.equal(analysis.beginnerSyntax.clauses.length, 0, "名词短语和动名词选项不能虚构完整从句");
        assert.ok(!analysis.beginnerSyntax.components.some(c => c.function === "谓语"));
      }
    }
  }
  assert.equal(phrases, 12);
  assert.ok(text2.sentences.every(s => s.translationAlignment.every(b => /[\u4e00-\u9fff]/.test(b.chinese))));
});

test("Text 2的范围答案可点击，反馈只影响声明的关联任务", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const { trainingSources, articleMapSource } = await vite.ssrLoadModule("/app/training-sources.ts");
  const sources = trainingSources(text2), map = articleMapSource(text2);
  assert.equal(text2.sentences.flatMap(s => s.practice).length, 35);
  assert.equal(map.practice.length, 3);
  for (const source of sources) for (const task of source.practice) {
    checkTaskAnswer(task, source.text);
    if (task.kind === "range") {
      const text = task.rangeText ?? source.text, tokens = m.rangeTokens(text), offset = text.indexOf(task.answer);
      const first = tokens.findIndex(t => t.start === offset), last = tokens.findIndex(t => t.end === offset + task.answer.length);
      assert.ok(first >= 0 && last >= first, `${source.id}/${task.id}: 不可点击的范围端点`);
      assert.equal(m.selectedRange(text, first, last), task.answer);
    }
    for (const id of task.leaksToTaskIds ?? []) assert.ok(source.practice.some(t => t.id === id));
    for (const leak of task.leaksToTasks ?? []) assert.ok(sources.some(s => s.id === leak.sentenceId && s.practice.some(t => t.id === leak.taskId)));
  }
  const targets = m.practiceHintTargets(sources, "previous-answer", "map-feedback", map.id, map.practice[1]);
  assert.ok(targets.includes(m.taskKey("2010-p2-s15", text2.sentences[14].practice[1])));
  assert.ok(!targets.includes(m.taskKey("2010-p2-s4", text2.sentences[3].practice[0])));
  const premise = text2.sentences[13];
  assert.ok(m.practiceHintTargets(sources, "previous-answer", "premise-feedback", premise.id, premise.practice[0]).includes(m.taskKey(premise.id, premise.practice[1])));
});

test("Text 2反向题保留统计口径，主旨定位需覆盖五段且不能全选过关", async () => {
  const { assessLocation } = await vite.ssrLoadModule("/app/location-model.ts");
  const ids = text2.sentences.map(s => s.id), select = (...numbers) => numbers.map(n => `2010-p2-s${n}`);
  for (const question of text2.questions) {
    const r = question.reasoning;
    for (const path of r.locationPolicy.paths) {
      assert.equal(assessLocation(r, { scope: r.scope, sentenceIds: path.groups.map(g => g[0]) }, ids).passed, true, `${question.id}/${path.id}`);
    }
    assert.equal(assessLocation(r, { scope: r.scope, sentenceIds: ids }, ids).passed, false);
  }
  const q28 = text2.questions[2].reasoning;
  for (const path of [[13, 14], [9, 10, 13, 14, 18]]) assert.equal(assessLocation(q28, { scope: "whole-passage", sentenceIds: select(...path) }, ids).passed, true);
  assert.equal(assessLocation(q28, { scope: "sentence", sentenceIds: select(13, 14) }, ids).passed, false);
  assert.equal(q28.options.B.judgment, "选入");
  assert.match(q28.options.B.reasoning, /50%修饰离婚率/);
  for (const option of ["A", "C", "D"]) assert.equal(q28.options[option].errorType, "事实成立，非本题所求");
  const q29 = text2.questions[3].reasoning;
  assert.equal(assessLocation(q29, { scope: "whole-passage", sentenceIds: select(18) }, ids).passed, false);
  assert.equal(assessLocation(q29, { scope: "whole-passage", sentenceIds: select(2, 10, 13, 16, 19) }, ids).passed, true);
  assert.match(text2.questions[4].reasoning.paraphrases[0].limit, /未提供真实后文/);
});

test("Text 2词卡按正文和题目出处区分词性，重点建议不影响其他文章", async () => {
  const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { vocabularyPriority } = await vite.ssrLoadModule("/app/vocabulary-priority.ts");
  const card = (word, n) => resolveEntry(word, false, `2010-p2-s${n}`);
  assert.match(card("home", 8).partOfSpeech, /^adv/);
  assert.match(card("home", 10).partOfSpeech, /^n\./);
  assert.match(card("share", 15).partOfSpeech, /^n\./);
  assert.match(card("share", 18).partOfSpeech, /^v\./);
  assert.match(card("Given", 14).partOfSpeech, /^prep/);
  assert.match(card("given", 15).partOfSpeech, /^v\./);
  assert.match(resolveEntry("means", false, "question-201027-prompt").contextualMeaning, /意思/);
  assert.match(resolveEntry("account", false, "question-201030-option-A").contextualMeaning, /介绍|叙述/);
  const entry = word => ({ headword: word, display: word, kind: "word" });
  assert.equal(vocabularyPriority(entry("hacker"), "2010-p2-s12", text2.id).recommendedReview, false);
  assert.equal(vocabularyPriority(entry("divorce"), "question-201030-option-A", text2.id).id, "name");
  assert.equal(vocabularyPriority(entry("divorce"), "2010-p2-s14", text2.id).id, "core");
  assert.equal(vocabularyPriority(entry("share"), "2010-p2-s15", text2.id).id, "sense");
  assert.equal(vocabularyPriority(entry("although"), "2010-p2-s10", text2.id).id, "function");
  assert.equal(vocabularyPriority(entry("hacker"), "2010-p3-s1", "2010-p3"), undefined);
  assert.equal(vocabularyPriority(entry("momentum"), "2010-p1-s5", "2010-p1").id, "core");
});

test("Text 2训练入口先尝试再讲解，错误能以正确篇目进入统一复盘", async () => {
  const m = await vite.ssrLoadModule("/app/learning-model.ts");
  const { ArticleGuidePanel } = await vite.ssrLoadModule("/app/article-guide-panel.tsx");
  const guide = renderToStaticMarkup(React.createElement(ArticleGuidePanel, { article: text2, onSentence() {} }));
  assert.match(guide, /先尝试全部3项/);
  assert.doesNotMatch(guide, /class="article-main-idea"|class="paragraph-map"/);
  const { SentencePracticePanel } = await vite.ssrLoadModule("/app/sentence-practice-panel.tsx");
  const sentence = text2.sentences[13], task = sentence.practice[1];
  const session = { id: "text2-round", startedAt: 1, lastActiveAt: 2, hints: [] };
  const attempt = m.makePracticeAttempt({ id: "text2-rate", articleId: text2.id, sentenceId: sentence.id, task, answer: task.options[1], at: 2, session });
  assert.equal(attempt.correct, false);
  const initial = renderToStaticMarkup(React.createElement(SentencePracticePanel, { sentence, attempts: {}, session, reflection: m.emptyReflection(), revealed: false, onAttempt() {}, onReveal() {}, onRetry() {}, onReflection() {} }));
  assert.doesNotMatch(initial, /practice-feedback|参考：/);
  assert.match(initial, /先完成至少一项尝试/);
  const { TrainingReview } = await vite.ssrLoadModule("/app/training-review.tsx");
  const review = renderToStaticMarkup(React.createElement(TrainingReview, { articles: [text2], attempts: { [attempt.id]: attempt }, reflections: {}, questionWork: {}, submitted: {}, now: m.DAY_MS + 2, onSentence() {}, onQuestion() {} }));
  assert.match(review, /2010 Text 2 · 第14句/);
  assert.match(review, /nearly 50 percent/);
  assert.match(review, /上次错误/);
});
