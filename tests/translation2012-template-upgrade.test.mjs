import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { translation2012Sentences: sentences, translation2012Tasks: tasks, translation2012ArticleParagraphs: paragraphs } = await vite.ssrLoadModule("/app/2012-translation-data.ts");
const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-translation.json", import.meta.url), "utf8"));
const tokens = text => text.match(/[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];
const sentence = number => sentences[number - 1];
const flatten = components => components.flatMap(component => [component, ...flatten(component.children ?? [])]);
const componentFor = (number, text) => flatten(sentence(number).beginnerSyntax.components).find(component => component.text === text);

function checkComponents(components, parentText) {
  let cursor = 0;
  for (const component of components) {
    const start = parentText.indexOf(component.text, cursor);
    assert.ok(start >= cursor, `父子范围或顺序错误：${component.text}`);
    for (const field of ["form", "function", "modifies", "explanation"]) assert.ok(component[field]?.trim(), `${component.text}/${field}`);
    cursor = start + component.text.length;
    checkComponents(component.children ?? [], component.text);
  }
}

test("复用2012用户原卷快照：六句两段、第46题201246、整篇一次作答", () => {
  assert.equal(fixture.sha256, "b91cfe8e6a3eb63b02fc6573514e34a67937bf8160a5712ce640315e2da306f9");
  assert.deepEqual(fixture.paragraphs.map(paragraph => paragraph.index), [264, 265]);
  assert.equal(sentences.length, 6);
  assert.deepEqual(sentences.map(item => item.id), Array.from({ length: 6 }, (_, index) => `2012-translation-s${index + 1}`));
  assert.deepEqual(sentences.map(item => item.number), [1, 2, 3, 4, 5, 6]);
  assert.equal(tasks.length, 1);
  const task = tasks[0];
  assert.equal(task.id, 201246);
  assert.equal(task.number, 46);
  assert.equal(task.points, 15);
  assert.equal(task.format, "passage");
  assert.equal(task.sentenceId, "2012-translation-s1");
  assert.equal(task.source, fixture.paragraphs.map(paragraph => paragraph.text).join("\n\n"));
  assert.deepEqual(task.paragraphs.map(paragraph => paragraph.map(item => item.text).join(" ")), fixture.paragraphs.map(paragraph => paragraph.text));
  assert.deepEqual(task.paragraphs.map(paragraph => paragraph.length), [2, 4]);
  assert.deepEqual(task.paragraphs.flat(), sentences);
  assert.equal(task.answer, task.paragraphs.map(paragraph => paragraph.map(item => item.natural).join("")).join("\n\n"));
  assert.match(task.prompt, /整篇一次作答.*不作自动评分/);
  assert.equal(task.options, undefined);
  assert.deepEqual(paragraphs, [
    { id: "2012-translation-p1", sentenceIds: ["2012-translation-s1", "2012-translation-s2"] },
    { id: "2012-translation-p2", sentenceIds: ["2012-translation-s3", "2012-translation-s4", "2012-translation-s5", "2012-translation-s6"] },
  ]);
});

test("精确成分、父子树、从句、主干词序和连续词块对译", () => {
  assert.deepEqual(sentences.map(item => item.beginnerSyntax.clauses.length), [1, 2, 1, 1, 0, 2]);
  for (const item of sentences) {
    const syntax = item.beginnerSyntax;
    assert.equal(item.chunks.map(chunk => chunk.text).join(""), item.text);
    assert.equal(item.chunks.length, syntax.components.length);
    assert.deepEqual(item.chunks.map(chunk => chunk.grammarFunction), syntax.components.map(component => component.function));
    assert.ok(item.chunks.every(chunk => chunk.visualRole && chunk.relation && chunk.explanation));
    checkComponents(syntax.components, item.text);
    const originalWords = tokens(item.text.toLowerCase());
    let cursor = 0;
    for (const token of tokens(item.trunk.toLowerCase())) {
      const index = originalWords.indexOf(token, cursor);
      assert.ok(index >= cursor, `${item.id}主干不能改写或重排：${token}`);
      cursor = index + 1;
    }
    assert.ok(syntax.reading.focus);
    assert.ok(syntax.reading.questions.length >= 1 && syntax.reading.questions.length <= 3);
    for (const entry of syntax.reading.questions) {
      assert.ok(item.text.includes(entry.evidence));
      assert.ok(entry.question && entry.answer);
    }
    for (const clause of syntax.clauses) {
      assert.ok(item.text.includes(clause.text));
      for (const field of ["type", "marker", "role", "subject", "predicate", "translationOrder"]) assert.ok(clause[field]);
      assert.equal(clause.objectOrComplement, undefined);
      assert.ok(Array.isArray(clause.predicateDetails));
      for (const entry of clause.predicateDetails) {
        assert.ok(entry.function);
        assert.ok(clause.text.includes(entry.text), `${item.id}从句内部证据：${entry.text}`);
      }
    }
    assert.equal(item.translationAlignment.map(block => block.english).join(""), item.text);
    assert.ok(item.translationAlignment.every(block => /[\u4e00-\u9fff]/u.test(block.chinese)));
    assert.ok(item.translationNotes.length && item.literal && item.natural && item.logic && item.grammar.length && item.layers.length);
    assert.ok(item.phrases.every(phrase => item.text.includes(phrase)));
  }
  assert.equal(componentFor(1, "are").function, "谓语");
  assert.equal(componentFor(1, "concerned").function, "表语");
  assert.equal(sentence(2).chunks.at(-1).visualRole, "complement");
  assert.equal(componentFor(3, "have found").function, "谓语");
  assert.equal(componentFor(4, "had").function, "从句谓语");
  assert.equal(componentFor(5, "has long bothered").function, "谓语");
  assert.equal(componentFor(6, "fear").function, "谓语");
});

test("两处原文瑕疵不静默修补，也不硬造正常句法", async () => {
  assert.ok(sentence(1).text.includes("their best and brightest departure"));
  assert.ok(sentence(4).text.includes("over the age 25"));
  assert.ok(!sentence(4).text.includes("over the age of 25"));
  assert.match(componentFor(1, "their best and brightest departure").form, /非规范/);
  assert.match(componentFor(1, "their best and brightest departure").explanation, /不能.*正常修饰.*不能断言/);
  assert.match(sentence(1).translationNotes.join(" "), /仅供学习.*the departure of their best and brightest/);
  assert.match(componentFor(4, "over the age 25").explanation, /不硬讲.*同位语/);
  assert.match(sentence(4).translationNotes.join(" "), /仅供学习.*over the age of 25/);
  const { getPhraseKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
  const rawDeparture = getPhraseKnowledge("their best and brightest departure");
  assert.ok(rawDeparture);
  assert.equal(rawDeparture.canonical, "the departure of + person/group");
  assert.match(rawDeparture.summary, /不规范.*不是校正/);
  const rawAge = getPhraseKnowledge("over the age 25");
  assert.equal(rawAge.canonical, "over the age of + number");
  assert.match(rawAge.pitfalls.join(" "), /不能.*补入原文/);
});

test("嵌套定语、百分比分母、could have统领和非有限for结构", () => {
  const outer = sentence(2).beginnerSyntax.clauses[0];
  const inner = sentence(2).beginnerSyntax.clauses[1];
  assert.ok(outer.text.endsWith(inner.text));
  assert.equal(outer.predicate, "try");
  assert.deepEqual(outer.predicateDetails, [{ function: "宾语（不定式）", text: "to attract" }, { function: "attract的宾语（关系代词）", text: "that" }]);
  assert.equal(inner.subject, "that");
  assert.equal(inner.predicate, "privilege");
  assert.deepEqual(inner.predicateDetails, [{ function: "宾语", text: "college graduates" }]);
  assert.equal(sentence(3).beginnerSyntax.clauses[0].predicate, "are");
  assert.equal(componentFor(3, "to emigrate").function, "形容词补足语");
  assert.ok(sentence(4).beginnerSyntax.clauses[0].text.endsWith("compared with around 3.3% of all Indians over the age 25"));
  assert.equal(componentFor(4, "of emigrants").function, "分母范围");
  assert.equal(componentFor(4, "of all Indians over the age 25").function, "分母范围");
  assert.match(sentence(4).beginnerSyntax.reading.questions[0].answer, /分母是移居国外者.*分母是全部超过25岁的印度人/);
  const fear = sentence(6).beginnerSyntax.clauses[0];
  const relative = sentence(6).beginnerSyntax.clauses[1];
  assert.ok(fear.text.endsWith(relative.text));
  assert.ok(relative.text.endsWith("for their factories to make"));
  assert.match(relative.predicate, /could have taught；worked；come up with.*共用could have/);
  assert.equal(relative.predicateDetails.length, 1);
  assert.equal(relative.predicateDetails[0].text, "clever new products for their factories to make");
  assert.equal(componentFor(6, "at their universities").function, "地点状语");
  assert.equal(componentFor(6, "in their hospitals").function, "地点状语");
  assert.equal(componentFor(6, "their factories").function, "不定式逻辑主语");
  assert.equal(componentFor(6, "for their factories to make").function, "后置定语");
  assert.equal(componentFor(6, "for their factories to make").modifies, "products");
  assert.match(componentFor(6, "for their factories to make").explanation, /不是有限从句.*products.*宾语/);
  assert.ok(!sentence(6).beginnerSyntax.clauses.some(clause => clause.text.startsWith("for ")));
});

test("11项有效主动任务：可操作范围、答案、提示、反馈依赖，不伪造原卷选择题", async () => {
  const { grammarConcepts, errorCategories, rangeTokens, selectedRange, hintAffectsTask } = await vite.ssrLoadModule("/app/learning-model.ts");
  assert.deepEqual(sentences.map(item => item.practice.length), [2, 2, 1, 2, 1, 3]);
  assert.equal(sentences.reduce((total, item) => total + item.practice.length, 0), 11);
  for (const item of sentences) {
    assert.equal(new Set(item.practice.map(task => task.id)).size, item.practice.length);
    assert.ok(item.practice.some(task => ["range", "link", "order"].includes(task.kind)));
    const labels = new Set([...tokens(item.text), ...item.phrases].map(label => label.toLowerCase()));
    for (const task of item.practice) {
      assert.ok(task.id && Number.isInteger(task.revision) && task.revision > 0);
      assert.ok(grammarConcepts[task.conceptId] && errorCategories[task.errorType]);
      assert.ok(task.prompt && task.feedback && item.text.includes(task.evidence));
      assert.equal(task.mapRevealsAnswer, false);
      assert.equal(hintAffectsTask(task, "article-map", "anything"), false);
      assert.equal(hintAffectsTask(task, "word", "unrelated"), false);
      assert.ok(["range", "link", "order"].includes(task.kind));
      for (const label of task.hintWords) {
        assert.ok(labels.has(label.toLowerCase()), `${item.id}/${task.id}不存在的提示入口：${label}`);
        assert.equal(hintAffectsTask(task, "word", label), true);
      }
      for (const target of task.leaksToTaskIds ?? []) assert.ok(item.practice.some(candidate => candidate.id === target && candidate.id !== task.id));
      if (task.kind === "range") {
        const text = task.rangeText ?? item.text;
        const rangeWords = rangeTokens(text);
        const offset = text.indexOf(task.answer);
        const start = rangeWords.findIndex(token => token.start === offset);
        const end = rangeWords.findIndex(token => token.end === offset + task.answer.length);
        assert.ok(start >= 0 && end >= start);
        assert.equal(selectedRange(text, start, end), task.answer);
      } else {
        const answers = JSON.parse(task.answer);
        assert.ok(answers.every(answer => task.options.includes(answer)));
        if (task.kind === "link") {
          assert.deepEqual(answers, task.links.map(entry => entry.target));
          assert.ok(task.links.every(entry => item.text.includes(entry.source)));
          assert.equal(new Set(task.links.map(entry => entry.source)).size, task.links.length);
        } else assert.equal(new Set(answers).size, task.options.length);
      }
    }
  }
  assert.equal(hintAffectsTask(sentence(1).practice[0], "word", "Silicon Valley"), false);
  assert.equal(hintAffectsTask(sentence(1).practice[1], "word", "Silicon Valley"), true);
  assert.ok(sentence(2).practice.every(task => task.leaksToTaskIds.length === 1));
  assert.ok(sentence(4).practice.every(task => task.leaksToTaskIds.length === 1));
  assert.deepEqual(sentence(6).practice[0].leaksToTaskIds, ["shared-modal", "referents-and-maker"]);
  assert.ok(!sentence(6).practice[1].leaksToTaskIds.includes("referents-and-maker"));
});

test("全词形实际词卡：词义、词性、用法、知识结构及优先词组按来源隔离", async context => {
  const { resolveEntry, buildYearWordItems, buildYearPhraseItems } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { canonicalLemma } = await vite.ssrLoadModule("/app/lexicon.ts");
  const { translation2012ReviewedContexts: contexts } = await vite.ssrLoadModule("/app/2012-translation-contexts.ts");
  const { getTranslation2012WordKnowledge } = await vite.ssrLoadModule("/app/2012-translation-knowledge.ts");
  assert.equal(Object.keys(contexts).length, 6);
  let scanned = 0;
  for (const item of sentences) {
    const actualHeads = new Set();
    for (const token of [...new Set(tokens(item.text))]) {
      const headword = canonicalLemma(token, { articleId: "2012-translation", sourceId: item.id });
      actualHeads.add(headword);
      const expected = contexts[item.id][headword];
      assert.ok(expected, `${item.id}/${token}/${headword}未精审`);
      const card = resolveEntry(token, false, item.id);
      assert.equal(card.headword, headword);
      assert.equal(card.contextualMeaning, expected.contextualMeaning, `${item.id}/${token}词义串句`);
      assert.equal(card.partOfSpeech, expected.partOfSpeech, `${item.id}/${token}词性串句`);
      assert.equal(card.use, expected.use, `${item.id}/${token}用法串句`);
      assert.equal(card.grammarSummary, expected.use, `${item.id}/${token}知识层带回旧语境`);
      const knowledge = getTranslation2012WordKnowledge(headword, item.id);
      assert.deepEqual(card.structures, knowledge.structures);
      for (const structure of card.structures) {
        assert.ok(item.text.includes(structure.pattern), `${item.id}/${token}结构证据串句：${structure.pattern}`);
        assert.ok(/[\u4e00-\u9fff]/u.test(structure.meaning) && structure.rule);
      }
      for (const phrase of expected.preferredCollocations) {
        assert.ok(item.text.includes(phrase));
        assert.ok(card.collocations.includes(phrase));
        const entry = card.collocationDetails.find(detail => detail.label === phrase);
        assert.ok(entry?.target, `${item.id}/${token}词组链接无内容：${phrase}`);
      }
      if (expected.preferredCollocations.length) assert.equal(card.collocations[0], expected.preferredCollocations[0]);
      scanned += 1;
    }
    assert.deepEqual([...actualHeads].sort(), Object.keys(contexts[item.id]).sort());
    for (const phrase of item.phrases) {
      const card = resolveEntry(phrase, true, item.id);
      assert.equal(card.sourceExpression, phrase);
      assert.ok(card.canonicalForm && card.contextualMeaning && card.use && card.structures.length);
    }
  }
  const card = (token, number) => resolveEntry(token, false, `2012-translation-s${number}`);
  assert.equal(card("have", 3).partOfSpeech, "aux.");
  assert.match(card("had", 4).partOfSpeech, /实义/);
  assert.equal(card("has", 5).contextualMeaning, "标记完成时");
  assert.equal(card("have", 6).contextualMeaning, "标记完成式");
  assert.equal(card("survey", 4).partOfSpeech, "n.");
  assert.equal(card("privilege", 2).partOfSpeech, "v.");
  assert.equal(card("drain", 5).partOfSpeech, "n.");
  assert.equal(card("around", 4).partOfSpeech, "adv.");
  assert.equal(card("long", 5).partOfSpeech, "adv.");
  assert.equal(card("immigration", 2).contextualMeaning, "移民入境；移入");
  assert.equal(card("emigrate", 3).contextualMeaning, "移居国外；移出");
  assert.notEqual(card("with", 4).contextualMeaning, card("with", 6).contextualMeaning);
  assert.notEqual(card("to", 1).partOfSpeech, card("to", 6).partOfSpeech);
  assert.match(card("They", 6).use, /They.*policymakers.*them.*贫穷国家/);
  assert.match(card("developed", 1).contextualMeaning, /developing.*developed/);
  assert.equal(card("developing", 3).contextualMeaning, "发展中的");
  assert.match(card("Indians", 4).partOfSpeech, /adj.*Indian.*n.*Indians/);
  const substitution = card("bothered", 5).contextualSubstitutions.find(entry => entry.label === "troubled");
  assert.equal(substitution.rewrittenSentence, 'This "brain drain" has long troubled policymakers in poor countries.');
  assert.ok(resolveEntry("troubled", false, sentence(5).id).use);
  assert.ok(buildYearWordItems(2012).find(item => item.headword === "emigrate").contexts.some(entry => entry.sentenceId === sentence(3).id));
  assert.ok(buildYearPhraseItems(2012).some(item => item.source === "their best and brightest departure"));
  context.diagnostic(`实际扫描${scanned}个逐句去重词形，${Object.values(contexts).reduce((total, entries) => total + Object.keys(entries).length, 0)}条逐句词元语境。`);
});

test("真实公共入口保留整篇任务、两段及四层状态，不强加地图或阅读选择题", async context => {
  const { articleContents, translationTaskSentences } = await vite.ssrLoadModule("/app/data.ts");
  const article = articleContents["2012-translation"];
  assert.deepEqual(article.sentences, sentences);
  assert.deepEqual(article.translationTasks, tasks);
  assert.deepEqual(translationTaskSentences(article.translationTasks[0]), sentences);
  assert.equal(article.kind, "translation");
  assert.deepEqual(article.questions, []);
  assert.equal(article.guide, undefined);
  assert.deepEqual(article.paragraphs, paragraphs);
  assert.deepEqual(article.teachingStatus, { syntax: true, vocabulary: true, evidence: true, practice: true });
  context.diagnostic("公共段落及四层状态已接入并通过本篇专项；此专项不替代全库发布门禁。");
});
