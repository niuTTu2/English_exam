import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { articleContents, translationTaskSentences } = await vite.ssrLoadModule("/app/data.ts");
const article = articleContents.translation;
const sentence = number => article.sentences.find(item => item.number === number);
const tokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];

test("2000翻译保持原卷五个划线片段与31—35逐句任务，不伪造整篇题或地图", () => {
  const source = JSON.parse(readFileSync(new URL("fixtures/2000-translation-source.json", import.meta.url), "utf8"));
  assert.equal(source.sha256, "4eb3d9c807216619162410da95936cac14f6af57f630aa425841d221c47ad0fe");
  assert.equal(source.page, 6);
  assert.deepEqual(article.sentences.map(({ number, text }) => ({ number, text })), source.sentences);
  assert.deepEqual(article.teachingStatus, { syntax: true, vocabulary: true, evidence: true, practice: true });
  assert.deepEqual(article.translationTasks.map(task => task.id), [31, 32, 33, 34, 35]);
  assert.equal(article.guide, undefined);
  assert.equal(article.questions.length, 0);
  for (const task of article.translationTasks) {
    assert.notEqual(task.format, "passage");
    assert.equal(task.analysis, sentence(task.id));
    assert.deepEqual(translationTaskSentences(task), [sentence(task.id)]);
    assert.equal(task.source, task.analysis.text);
    assert.equal(task.answer, task.analysis.natural);
  }
  assert.ok(sentence(34).text.startsWith("in "));
  assert.ok(sentence(32).text.includes("country’s"));
});

test("并列主语从句、被动进行时、插入关系与独立分词结构均按真实边界训练", () => {
  assert.deepEqual(article.sentences.map(item => item.beginnerSyntax.clauses.length), [0, 2, 1, 2, 0]);
  assert.equal(sentence(31).beginnerSyntax.components.filter(item => /并列宾语/.test(item.function)).length, 2);
  assert.equal(sentence(32).beginnerSyntax.components.find(item => item.text === "obvious").function, "表语");
  assert.equal(sentence(32).practice[0].answer, sentence(32).beginnerSyntax.clauses[1].text);
  assert.ok(sentence(32).beginnerSyntax.clauses.every(item => item.type === "主语从句"));
  assert.equal(sentence(33).beginnerSyntax.components.find(item => item.text === "are being exposed").function, "第二并列谓语");
  assert.equal(sentence(33).beginnerSyntax.components.find(item => item.text === "new wants").function, "宾语");
  assert.match(sentence(34).beginnerSyntax.clauses[0].role, /changes/);
  assert.deepEqual(sentence(34).beginnerSyntax.clauses[0].predicateDetails, []);
  assert.equal(sentence(34).practice[0].answer, "the process of industrialization");
  assert.match(sentence(35).beginnerSyntax.components.at(-1).modifies, /migration movements/);
  assert.equal(sentence(35).beginnerSyntax.clauses.length, 0);
  assert.equal(article.sentences.reduce((count, item) => count + item.practice.length, 0), 9);
  for (const item of article.sentences) {
    assert.equal(item.translationAlignment.map(block => block.english).join(""), item.text);
    assert.ok(item.beginnerSyntax.reading.questions.every(question => item.text.includes(question.evidence)));
    assert.ok(item.practice.some(task => ["range", "link", "order"].includes(task.kind)));
    assert.ok(item.translationNotes.length);
  }
});

test("迁移问题两题反馈只传播到确有答案重叠的同句任务", async () => {
  const { practiceHintTargets, taskKey } = await vite.ssrLoadModule("/app/learning-model.ts");
  const item = sentence(35);
  const expected = item.practice.map(task => taskKey(item.id, task)).sort();
  for (const task of item.practice) {
    assert.deepEqual(practiceHintTargets(article.sentences, "previous-answer", task.id, item.id, task).sort(), expected);
  }
  const independent = sentence(34);
  for (const task of independent.practice) {
    assert.deepEqual(practiceHintTargets(article.sentences, "previous-answer", task.id, independent.id, task), [taskKey(independent.id, task)]);
  }
  assert.match(sentence(33).practice[1].prompt, /to new customs与to introduce/);
});

test("翻译词卡与知识层复用当前来源，that、to、or和means不串义", async () => {
  const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { canonicalLemma } = await vite.ssrLoadModule("/app/lexicon.ts");
  const { translation2000ReviewedContexts } = await vite.ssrLoadModule("/app/2000-translation-contexts.ts");
  const { hintAffectsTask } = await vite.ssrLoadModule("/app/learning-model.ts");
  for (const item of article.sentences) {
    const labels = new Set([...tokens(item.text), ...item.phrases].map(value => value.toLowerCase()));
    for (const task of item.practice) for (const label of task.hintWords ?? []) {
      assert.ok(labels.has(label.toLowerCase()), `${item.id}/${task.id}/${label}`);
      assert.ok(hintAffectsTask(task, "word", label));
    }
    for (const [headword, expected] of Object.entries(translation2000ReviewedContexts[item.id])) {
      const token = tokens(item.text).find(value => canonicalLemma(value, { articleId: article.id, sourceId: item.id }) === headword);
      assert.ok(token, `${item.id}/${headword}必须匹配实际词位`);
      const card = resolveEntry(token, false, item.id);
      assert.equal(card.contextualMeaning, expected.contextualMeaning, `${item.id}/${headword}`);
      assert.equal(card.partOfSpeech, expected.partOfSpeech);
      assert.equal(card.grammarSummary, expected.use);
      for (const phrase of expected.preferredCollocations ?? []) {
        assert.ok(item.text.toLowerCase().includes(phrase.toLowerCase()));
        assert.ok(card.collocations.includes(phrase));
        assert.ok(card.collocationDetails.find(detail => detail.label === phrase)?.target);
      }
    }
  }
  const card = (token, number) => resolveEntry(token, false, `translation-s${number}`);
  assert.match(card("that", 32).use, /主语|并列/);
  assert.match(card("that", 34).use, /followed主语/);
  assert.match(card("to", 33).use, /三个位置/);
  assert.match(card("or", 34).use, /约数/);
  assert.match(card("or", 35).use, /两个原因/);
  assert.match(card("wants", 33).partOfSpeech, /^n\./);
  assert.equal(card("means", 35).headword, "means");
  assert.ok(card("requires", 31).contextualSubstitutions.length, "原有可靠同义改写不能被覆盖丢失");
});
