import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false, watch: null } });
after(() => vite.close());
const load = name => vite.ssrLoadModule(`/app/${name}.ts`);
const { translation2011Sentences: sentences, translation2011Paragraphs: paragraphs, translation2011ArticleParagraphs: articleParagraphs, translation2011Tasks: tasks } = await load("2011-translation-data");
const { translation2011ReviewedContexts: contexts, getTranslation2011ReviewedKnowledge: knowledge } = await load("2011-translation-contexts");
const { translation2011PreferredContexts: preferred, translation2011TrainingContexts: trainingContexts, translation2011SourcePhraseGuides: sourceGuides, translation2011SourcePhraseAliases: sourceAliases, translation2011SourceCollocationGlosses: sourceGlosses } = await load("2011-translation-collocations");
const { translation2011Lexicon: originalLexicon, translation2011SentenceContexts: originalContexts } = await load("2011-translation-lexicon");
const { translation2011PhraseGuides: originalGuides } = await load("2011-translation-knowledge");
const { canonicalLemma } = await load("lexicon");
const { getPhraseKnowledge } = await load("knowledge-base");
const { grammarConcepts, errorCategories, rangeTokens, selectedRange, hintAffectsTask, practiceHintTargets } = await load("learning-model");
const { withReviewedSyntax } = await load("reviewed-syntax");
const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-translation.json", import.meta.url), "utf8"));
const sentence = number => sentences[number - 1];
const englishTokens = text => text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];
const headFor = (token, sourceId) => canonicalLemma(token, { articleId: "2011-translation", sourceId });
const requireText = (value, label) => assert.ok(typeof value === "string" && value.trim().length > 0, label);
const placeholder = /后续补充|结合本句理解|待精审|暂无资料/;

test("2011翻译仅复用用户快照，保留三段七句、46题与唯一整篇作答任务", () => {
  assert.equal(fixture.source, "考研英语二2011年真题（整卷）.docx");
  assert.equal(fixture.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.deepEqual(fixture.paragraphs.map(part => part.index), [277, 278, 279]);
  assert.deepEqual(fixture.instructions.map(part => part.index), [275, 276]);
  assert.equal(fixture.instructions[0].text, "46. Directions:");
  assert.equal(sentences.length, 7);
  assert.deepEqual(sentences.map(item => item.id), Array.from({ length: 7 }, (_, index) => `2011-translation-s${index + 1}`));
  assert.deepEqual(sentences.map(item => item.number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(paragraphs.map(part => part.length), [1, 4, 2]);
  assert.deepEqual(paragraphs.map(part => part.map(item => item.text).join(" ")), fixture.paragraphs.map(part => part.text));
  assert.deepEqual(articleParagraphs.map(part => part.sentenceIds), paragraphs.map(part => part.map(item => item.id)));
  assert.deepEqual(articleParagraphs.map(part => part.id), ["2011-translation-p1", "2011-translation-p2", "2011-translation-p3"]);
  assert.equal(tasks.length, 1);
  const task = tasks[0];
  assert.equal(task.id, 201146);
  assert.equal(task.number, 46);
  assert.equal(task.format, "passage");
  assert.equal(task.points, 15);
  assert.equal(task.sentenceId, sentence(1).id);
  assert.equal(task.source, fixture.paragraphs.map(part => part.text).join("\n\n"));
  assert.deepEqual(task.paragraphs.flat(), sentences);
  assert.deepEqual(task.answer.split("\n\n"), paragraphs.map(part => part.map(item => item.natural).join("")));
  assert.match(task.prompt, /一次提交全文.*不作自动评分/);
  assert.equal(task.options, undefined);
  assert.equal(task.guide, undefined);
});

test("7句精确成分、父子边界、主干词序及连续词块可还原原文", () => {
  const checkComponents = (components, parent) => {
    let cursor = 0;
    for (const item of components) {
      for (const field of ["text", "form", "function", "modifies", "explanation"]) requireText(item[field], `${item.text}/${field}`);
      const offset = parent.indexOf(item.text, cursor);
      assert.ok(offset >= cursor, `父子边界或顺序错误：${item.text}`);
      cursor = offset + item.text.length;
      checkComponents(item.children ?? [], item.text);
    }
  };
  for (const item of sentences) {
    assert.equal(item.chunks.map(chunk => chunk.text).join(""), item.text);
    assert.ok(item.chunks.every(chunk => chunk.visualRole && chunk.grammarFunction && !chunk.role));
    assert.deepEqual(withReviewedSyntax(item, item.chunks.map(chunk => chunk.visualRole)).chunks, item.chunks);
    checkComponents(item.beginnerSyntax.components, item.text);
    const words = englishTokens(item.text).map(word => word.toLowerCase());
    let cursor = -1;
    for (const word of englishTokens(item.trunk).map(word => word.toLowerCase())) {
      cursor = words.indexOf(word, cursor + 1);
      assert.ok(cursor >= 0, `${item.id}: 主干改写或打乱词序：${word}`);
    }
    assert.equal(item.translationAlignment.map(block => block.english).join(""), item.text);
    for (const block of item.translationAlignment) requireText(block.chinese, `${item.id}缺词块译义`);
    requireText(item.literal, `${item.id}缺直译`);
    requireText(item.natural, `${item.id}缺通顺译文`);
    assert.ok(item.translationNotes.length > 0);
    const reading = item.beginnerSyntax.reading;
    requireText(reading.focus, `${item.id}缺阅读难点`);
    assert.ok(reading.questions.length >= 1 && reading.questions.length <= 3);
    for (const entry of reading.questions) {
      assert.ok(item.text.includes(entry.evidence));
      requireText(entry.question, item.id);
      requireText(entry.answer, item.id);
    }
    for (const entry of item.beginnerSyntax.clauses) {
      assert.ok(item.text.includes(entry.text));
      assert.equal(entry.objectOrComplement, undefined);
      for (const field of ["type", "marker", "role", "subject", "predicate", "translationOrder"]) requireText(entry[field], `${item.id}/${field}`);
      assert.ok(Array.isArray(entry.predicateDetails));
      for (const detail of entry.predicateDetails) {
        assert.ok(entry.text.includes(detail.text));
        requireText(detail.function, item.id);
      }
    }
    assert.ok(!placeholder.test(JSON.stringify(item)), item.id);
  }
});

test("反问、比较替代、目的不定式和结果回指保留准确边界", () => {
  assert.deepEqual(sentences.map(item => item.beginnerSyntax.clauses.length), [2, 0, 1, 0, 2, 0, 0]);
  const first = sentence(1).beginnerSyntax;
  assert.equal(first.components[0].text, "Who");
  assert.equal(first.components[0].function, "主语");
  assert.equal(first.components[1].text, "would have thought");
  assert.ok(first.clauses[0].text.endsWith("all CO2 emissions"));
  assert.equal(first.clauses[1].text, "as the world's airlines do");
  assert.equal(first.clauses[1].predicate, "do");
  assert.deepEqual(first.clauses[1].predicateDetails, []);
  assert.equal(sentence(2).beginnerSyntax.components.find(item => item.function === "谓语").text, "take");
  const third = sentence(3).beginnerSyntax.clauses[0];
  assert.equal(third.subject, "how many attempts");
  assert.equal(third.predicate, "are needed");
  assert.deepEqual(third.predicateDetails, []);
  assert.equal(third.text, 'how many attempts are needed to get the "right" answer');
  const fourth = sentence(4).beginnerSyntax.components;
  assert.equal(fourth[0].children.find(item => item.text === "quickly").modifies, "deliver");
  assert.equal(fourth.at(-1).modifies, "data centres");
  assert.match(sentence(4).natural, /^因此/);
  const fifth = sentence(5).beginnerSyntax;
  assert.equal(fifth.clauses[0].text, "While producing large quantities of CO2");
  assert.match(fifth.clauses[0].subject, /these computers/);
  assert.equal(fifth.clauses[1].text, "which uses even more energy");
  assert.match(fifth.components.at(-1).modifies, /制冷.*做法/);
  const seventh = sentence(7).beginnerSyntax;
  assert.equal(seventh.components[2].function, "表语");
  assert.equal(sentence(7).chunks[2].visualRole, "complement");
  assert.equal(seventh.components.at(-1).modifies, "to be done");
  assert.deepEqual(seventh.clauses, []);
});

test("11项主动任务均可操作，无伪造选择题且提示与反馈依赖精确", () => {
  assert.equal(sentences.reduce((count, item) => count + item.practice.length, 0), 11);
  for (const item of sentences) {
    assert.ok(item.practice.length >= 1 && item.practice.length <= 3);
    const ids = new Set(item.practice.map(task => task.id));
    assert.equal(ids.size, item.practice.length);
    const labels = new Set([...englishTokens(item.text), ...item.phrases].map(label => label.toLowerCase()));
    for (const task of item.practice) {
      assert.ok(["range", "link", "order"].includes(task.kind));
      assert.ok(Number.isInteger(task.revision) && task.revision >= 1);
      assert.ok(grammarConcepts[task.conceptId]);
      assert.ok(errorCategories[task.errorType]);
      assert.ok(item.text.includes(task.evidence));
      assert.equal(task.mapRevealsAnswer, false);
      requireText(task.prompt, task.id);
      requireText(task.feedback, task.id);
      if (task.kind === "range") {
        const text = task.rangeText ?? item.text;
        const start = text.indexOf(task.answer);
        const tokens = rangeTokens(text);
        const first = tokens.findIndex(token => token.start === start);
        const last = tokens.findIndex(token => token.end === start + task.answer.length);
        assert.ok(first >= 0 && last >= first, `${item.id}/${task.id}: 端点必须可选`);
        assert.equal(selectedRange(text, first, last), task.answer);
      } else {
        const answer = JSON.parse(task.answer);
        assert.ok(answer.every(value => task.options.includes(value)));
        if (task.kind === "link") {
          assert.deepEqual(answer, task.links.map(pair => pair.target));
          assert.ok(task.links.every(pair => item.text.includes(pair.source)));
        }
      }
      for (const label of task.hintWords ?? []) {
        assert.ok(labels.has(label.toLowerCase()), `${item.id}/${task.id}: 非真实提示入口${label}`);
        assert.ok(hintAffectsTask(task, "word", label));
      }
      for (const targetId of task.leaksToTaskIds ?? []) assert.ok(ids.has(targetId) && targetId !== task.id);
    }
  }
  const unrelated = sentence(1).practice[0];
  assert.equal(hintAffectsTask(unrelated, "word", "globally"), false);
  const third = sentence(3);
  const actualTargets = practiceHintTargets([third], "previous-answer", "feedback", third.id, third.practice[0]);
  assert.equal(actualTargets.length, 2);
});

test("逐词覆盖规范词位，所有本句义、词性、用法与知识按句隔离", () => {
  assert.equal(Object.keys(contexts).length, 7);
  assert.equal(Object.keys(preferred).length, 7);
  const coverageIssues = sentences.flatMap(item => {
    const heads = new Set(englishTokens(item.text).map(token => headFor(token, item.id)));
    const expected = Object.keys(contexts[item.id]);
    return [
      ...[...heads].filter(head => !expected.includes(head)).map(head => `${item.id}: 缺规范词位${head}`),
      ...expected.filter(head => !heads.has(head)).map(head => `${item.id}: 多余词位${head}`),
    ];
  });
  assert.deepEqual(coverageIssues, []);
  for (const item of sentences) {
    const heads = new Set(englishTokens(item.text).map(token => headFor(token, item.id)));
    assert.deepEqual(Object.keys(contexts[item.id]).sort(), [...heads].sort(), `${item.id}: 词位遗漏或伪造`);
    for (const head of heads) {
      const context = trainingContexts[item.id][head];
      const entry = knowledge(head, item.id);
      for (const field of ["partOfSpeech", "contextualMeaning", "use"]) requireText(context[field], `${item.id}/${head}/${field}`);
      assert.ok(!placeholder.test(JSON.stringify(context)));
      assert.equal(entry.grammarRole, context.partOfSpeech);
      assert.equal(entry.grammarSummary, context.use);
      assert.ok(entry.structures.length > 0);
      for (const structure of entry.structures) for (const field of ["pattern", "meaning", "rule"]) requireText(structure[field], `${item.id}/${head}/${field}`);
      assert.ok(context.preferredCollocations.length > 0, `${item.id}/${head}缺句内搭配`);
      assert.ok(context.preferredCollocations.every(expression => item.text.includes(expression)), `${item.id}/${head}搭配串句`);
    }
  }
  assert.equal(knowledge("have", "2010-translation-s1"), undefined);
  assert.equal(knowledge("have"), undefined);
  assert.match(contexts[sentence(1).id].it.partOfSpeech, /abbreviation/);
  assert.equal(contexts[sentence(1).id].it.contextualMeaning, "信息技术");
  assert.notEqual(contexts[sentence(1).id].have.partOfSpeech, contexts[sentence(4).id].have.partOfSpeech);
  assert.notEqual(contexts[sentence(1).id].do.partOfSpeech, contexts[sentence(7).id].do.partOfSpeech);
  assert.notEqual(contexts[sentence(5).id].more.partOfSpeech, contexts[sentence(7).id].more.partOfSpeech);
  assert.notEqual(contexts[sentence(6).id].monitor.partOfSpeech, contexts[sentence(7).id].monitor.partOfSpeech);
  assert.match(contexts[sentence(7).id].to.use, /介词.*不定式/);
  assert.match(contexts[sentence(7).id].be.use, /第一处is.*there is.*to be done/);
  assert.equal(contexts[sentence(7).id].just.contextualMeaning, "仅仅");
  assert.equal(contexts[sentence(7).id].do.contextualMeaning, "完成；做");
});

test("新搭配有中文规则与实例，复用既有规范键而不覆盖旧优质知识", () => {
  for (const [expression, key] of Object.entries(sourceAliases)) {
    assert.ok(sentences.some(item => item.text.toLowerCase().includes(expression)), expression);
    const entry = originalGuides[key] ?? sourceGuides[key] ?? getPhraseKnowledge(key);
    assert.ok(entry, `${expression}/${key}: 断链`);
    requireText(entry.canonical, key);
    requireText(entry.meaning, key);
    assert.ok(entry.structures.some(structure => structure.examples?.length > 0), `${key}须至少有一个有效双语实例`);
    for (const structure of entry.structures) {
      for (const field of ["pattern", "meaning", "rule"]) requireText(structure[field], `${key}/${field}`);
      if (sourceGuides[key]) assert.ok(structure.examples?.length > 0, `${key}新增结构缺实例`);
      for (const example of structure.examples ?? []) {
        requireText(example.english, key);
        requireText(example.chinese, key);
      }
    }
    requireText(sourceGlosses[expression].meaning, expression);
    requireText(sourceGlosses[expression].note, expression);
  }
  assert.equal(sourceAliases["between 0.2 and 7.0"], "between-a-and-b");
  assert.equal(sourceAliases["a great deal of heat"], "great-deal-attention");
  assert.equal(sourceGuides["between-a-and-b"], undefined);
  assert.equal(sourceGuides["great-deal-attention"], undefined);
  assert.equal(sourceGuides["take-toll-on"], undefined);
  assert.match(originalLexicon.volume.otherMeanings.join(""), /书/);
  assert.match(originalLexicon.toll.otherMeanings.join(""), /通行费/);
  assert.match(originalLexicon.monitor.otherMeanings.join(""), /显示器/);
  assert.deepEqual(knowledge("volume", sentence(1).id).pitfalls, originalLexicon.volume.examSynonyms);
  const substitutions = trainingContexts[sentence(3).id].right.contextualSubstitutions;
  assert.deepEqual(substitutions, originalContexts[sentence(3).id].right.contextualSubstitutions);
  assert.equal(substitutions[0].target, "word:correct");
  assert.equal(substitutions[0].rewrittenSentence, sentence(3).text.replace('"right"', '"correct"'));
  requireText(originalLexicon.correct.use, "correct目标词条");
});

test("公共接入必须核验实际词卡与文章完成层，不因注册丢失而跳过", async () => {
  const { articleContents, translationTaskSentences } = await load("data");
  const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
  const article = articleContents["2011-translation"];
  assert.deepEqual(article.paragraphs, articleParagraphs);
  assert.deepEqual(article.teachingStatus, { syntax: true, vocabulary: true, evidence: true, practice: true });
  assert.equal(article.guide, undefined);
  assert.deepEqual(article.questions, []);
  assert.deepEqual(translationTaskSentences(article.translationTasks[0]), article.sentences);
  for (const item of article.sentences) {
    assert.deepEqual(item.beginnerSyntax, sentence(item.number).beginnerSyntax);
    for (const token of englishTokens(item.text)) {
      const head = headFor(token, item.id);
      const expected = trainingContexts[item.id][head];
      const card = resolveEntry(token, false, item.id);
      assert.equal(card.partOfSpeech, expected.partOfSpeech, `${item.id}/${token}`);
      assert.equal(card.contextualMeaning, expected.contextualMeaning, `${item.id}/${token}`);
      assert.equal(card.grammarSummary, expected.use, `${item.id}/${token}`);
      assert.equal(card.collocations[0], expected.preferredCollocations[0]);
      assert.ok(card.collocationDetails[0].target);
    }
  }
});
