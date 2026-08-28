import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false },
});

after(async () => {
  await vite.close();
});

const data = await vite.ssrLoadModule("/app/data.ts");
const lexicon = await vite.ssrLoadModule("/app/lexicon.ts");
const knowledge = await vite.ssrLoadModule("/app/knowledge-base.ts");
const contextualVocabulary = await vite.ssrLoadModule("/app/contextual-vocabulary.ts");
const answerKeys = await vite.ssrLoadModule("/app/verified-answer-keys.ts");
const allSentences = data.allSentences ?? data.sentences;
const allQuestions = data.allQuestions ?? data.questions;

const forbiddenPlaceholder = /(待精审|后续补充|持续补充|结合本句成分理解|暂无资料|将在所属真题精审|该词未出现在)/;
const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

function requireText(value, label) {
  assert.equal(typeof value, "string", `${label} 必须是字符串`);
  assert.ok(value.trim(), `${label} 不能为空`);
  assert.doesNotMatch(value, forbiddenPlaceholder, `${label} 含占位内容`);
}

function requireStructure(structure, label) {
  requireText(structure.pattern, `${label}.pattern`);
  requireText(structure.meaning, `${label}.meaning`);
  requireText(structure.rule, `${label}.rule`);
  for (const [index, example] of (structure.examples ?? []).entries()) {
    requireText(example.english, `${label}.examples[${index}].english`);
    requireText(example.chinese, `${label}.examples[${index}].chinese`);
  }
}

function requireSentenceAnalysis(analysis, label) {
  assert.ok(analysis, `${label} 缺少分析对象`);
  requireText(analysis.text, `${label}.text`);
  requireText(analysis.trunk, `${label}.trunk`);
  requireText(analysis.literal, `${label}.literal`);
  requireText(analysis.natural, `${label}.natural`);
  requireText(analysis.logic, `${label}.logic`);
  assert.ok(analysis.chunks.length >= 2, `${label} 缺少彩色结构分块`);
  assert.equal(
    normalizeText(analysis.chunks.map((chunk) => chunk.text).join("")),
    normalizeText(analysis.text),
    `${label} 的 chunks 不能还原原文`,
  );
  for (const [index, chunk] of analysis.chunks.entries()) {
    requireText(chunk.text, `${label}.chunks[${index}].text`);
    assert.ok(["condition", "subject", "predicate", "object", "modifier", "connector"].includes(chunk.role), `${label} 存在无效结构角色`);
  }
  assert.ok(analysis.layers.length > 0, `${label} 缺少逐层拆解`);
  analysis.layers.forEach((layer, index) => {
    requireText(layer.label, `${label}.layers[${index}].label`);
    requireText(layer.text, `${label}.layers[${index}].text`);
  });
  assert.ok(analysis.grammar.length > 0, `${label} 缺少语法说明`);
  analysis.grammar.forEach((item, index) => requireText(item, `${label}.grammar[${index}]`));
  for (const [index, phrase] of (analysis.phrases ?? []).entries()) {
    requireText(phrase, `${label}.phrases[${index}]`);
    assert.ok(analysis.text.toLowerCase().includes(phrase.toLowerCase()), `${label}.phrases[${index}] 不在分析原文中`);
    assert.ok(knowledge.getPhraseKnowledge(phrase), `${label}.phrases[${index}] 缺少知识条目`);
  }
}

test("句子分析完整并可还原原文", () => {
  const ids = new Set();
  for (const sentence of allSentences) {
    assert.ok(!ids.has(sentence.id), `句子 ID 重复：${sentence.id}`);
    ids.add(sentence.id);
    assert.ok(Number.isInteger(sentence.number) && sentence.number > 0, `${sentence.id} 序号无效`);
    requireText(sentence.text, `${sentence.id}.text`);
    requireText(sentence.trunk, `${sentence.id}.trunk`);
    requireText(sentence.literal, `${sentence.id}.literal`);
    requireText(sentence.natural, `${sentence.id}.natural`);
    requireText(sentence.logic, `${sentence.id}.logic`);
    assert.ok(sentence.chunks.length >= 2, `${sentence.id} 缺少彩色结构分块`);
    assert.equal(
      normalizeText(sentence.chunks.map((chunk) => chunk.text).join("")),
      normalizeText(sentence.text),
      `${sentence.id} 的 chunks 不能还原原句`,
    );
    for (const [index, chunk] of sentence.chunks.entries()) {
      requireText(chunk.text, `${sentence.id}.chunks[${index}].text`);
      assert.ok(["condition", "subject", "predicate", "object", "modifier", "connector"].includes(chunk.role), `${sentence.id} 存在无效结构角色`);
    }
    assert.ok(sentence.layers.length > 0, `${sentence.id} 缺少逐层拆解`);
    sentence.layers.forEach((layer, index) => {
      requireText(layer.label, `${sentence.id}.layers[${index}].label`);
      requireText(layer.text, `${sentence.id}.layers[${index}].text`);
    });
    assert.ok(sentence.grammar.length > 0, `${sentence.id} 缺少语法说明`);
    sentence.grammar.forEach((item, index) => requireText(item, `${sentence.id}.grammar[${index}]`));
  }
});

test("自测空格、题号和答案严格对应", () => {
  const sentenceIds = new Set(allSentences.map((sentence) => sentence.id));
  for (const article of Object.values(data.articleContents)) {
    const blankIds = [];
    for (const sentence of article.sentences) {
      const matches = [...(sentence.testText ?? "").matchAll(/___\((\d+)\)/g)].map((match) => Number(match[1]));
      blankIds.push(...matches);
      assert.equal(sentence.answerWords?.length ?? 0, matches.length, `${sentence.id} 的答案词数量与自测空格不一致`);
    }
    if (article.kind === "cloze") {
      assert.deepEqual(
        [...blankIds].sort((a, b) => a - b),
        article.questions.map((question) => question.id).sort((a, b) => a - b),
        `${article.id} 自测空格编号与题号不一致`,
      );
    } else {
      assert.deepEqual(blankIds, [], `${article.id} 阅读正文不应出现完形空格`);
    }
  }

  const questionIds = allQuestions.map((question) => question.id);
  assert.deepEqual([...new Set(questionIds)], questionIds, "题号存在重复");

  for (const question of allQuestions) {
    assert.ok(sentenceIds.has(question.sentenceId), `第 ${question.id} 题定位句不存在`);
    requireText(question.prompt, `question[${question.id}].prompt`);
    requireText(question.locating, `question[${question.id}].locating`);
    assert.deepEqual(question.options.map((option) => option.key), ["A", "B", "C", "D"], `第 ${question.id} 题选项键错误`);
    assert.ok(question.options.some((option) => option.key === question.answer), `第 ${question.id} 题答案不在选项中`);
    for (const option of question.options) {
      requireText(option.text, `question[${question.id}].option[${option.key}]`);
      requireText(question.explanations[option.key], `question[${question.id}].explanations[${option.key}]`);
    }
  }
});

test("2000 年答案与独立核验清单一致", () => {
  assert.equal(Object.keys(answerKeys.verifiedAnswerKey2000).length, 30, "2000 年答案清单必须覆盖第 1—30 题");
  for (const question of allQuestions) {
    assert.equal(
      question.answer,
      answerKeys.verifiedAnswerKey2000[question.id],
      `第 ${question.id} 题答案偏离独立核验清单`,
    );
  }
  assert.ok(answerKeys.verifiedAnswerSources2000.length >= 2, "答案修订必须保留可追溯来源");
  for (const source of answerKeys.verifiedAnswerSources2000) {
    requireText(source.range, "answerSource.range");
    requireText(source.label, "answerSource.label");
    assert.match(source.url, /^https:\/\//, "答案来源必须使用可访问链接");
  }
});

test("同一词条按文章和句子语境显示本句义与可替换表达", () => {
  const sentenceById = new Map(allSentences.map((sentence) => [sentence.id, sentence]));

  for (const [sentenceId, wordContexts] of Object.entries(contextualVocabulary.sentenceWordContexts)) {
    const sentence = sentenceById.get(sentenceId);
    assert.ok(sentence, `语境词条指向不存在的句子：${sentenceId}`);
    const sourceTokens = sentence.text.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];

    for (const [headword, context] of Object.entries(wordContexts)) {
      assert.ok(
        sourceTokens.some((token) => lexicon.canonicalLemma(token) === headword),
        `${sentenceId} 中不存在语境词 ${headword}`,
      );
      if (context.contextualMeaning) requireText(context.contextualMeaning, `${sentenceId}.${headword}.contextualMeaning`);
      if (context.use) requireText(context.use, `${sentenceId}.${headword}.use`);

      const substitutions = context.contextualSubstitutions ?? [];
      assert.ok(substitutions.length >= 1 && substitutions.length <= 3, `${sentenceId}.${headword} 的本句替换应为 1—3 项`);
      for (const [index, item] of substitutions.entries()) {
        const label = `${sentenceId}.${headword}.contextualSubstitutions[${index}]`;
        requireText(item.label, `${label}.label`);
        requireText(item.chinese, `${label}.chinese`);
        requireText(item.rewrittenSentence, `${label}.rewrittenSentence`);
        requireText(item.nuance, `${label}.nuance`);
        assert.ok(["direct", "with-adjustment"].includes(item.fit), `${label}.fit 无效`);
        assert.match(item.target, /^(word|phrase):[^:]+$/, `${label}.target 必须是可点击知识链接`);
        assert.notEqual(normalizeText(item.rewrittenSentence), normalizeText(sentence.text), `${label} 没有完成实际改写`);
        if (item.fit === "with-adjustment") requireText(item.adjustment, `${label}.adjustment`);
      }
    }
  }

  const passageRequire = lexicon.getLexicalGuide("requires", { articleId: "p3", sentenceId: "p3-s5" });
  const translationRequire = lexicon.getLexicalGuide("requires", { articleId: "translation", sentenceId: "translation-s31" });
  assert.notEqual(passageRequire.use, translationRequire.use, "同一 require 在阅读与翻译语境中不应共用本句说明");

  const firstRegard = lexicon.getLexicalGuide("regarded", { articleId: "p5", sentenceId: "p5-s1" });
  const secondRegard = lexicon.getLexicalGuide("regarded", { articleId: "p5", sentenceId: "p5-s2" });
  assert.notEqual(firstRegard.contextualMeaning, secondRegard.contextualMeaning, "同篇不同句的 regard 词义必须能独立覆盖");
});

test("所有预标词组都有规范原型、中文义和语法", () => {
  for (const sentence of allSentences) {
    const lower = sentence.text.toLowerCase();
    for (const source of sentence.phrases) {
      assert.ok(lower.includes(source.toLowerCase()), `${sentence.id} 的词组不在原句中：${source}`);
      const phrase = knowledge.getPhraseKnowledge(source);
      assert.ok(phrase, `词组缺少知识条目：${source}`);
      requireText(phrase.canonical, `${source}.canonical`);
      requireText(phrase.type, `${source}.type`);
      requireText(phrase.meaning, `${source}.meaning`);
      requireText(phrase.summary, `${source}.summary`);
      requireText(phrase.grammarRole, `${source}.grammarRole`);
      assert.ok(phrase.structures.length > 0, `${source} 缺少规范结构`);
      phrase.structures.forEach((structure, index) => requireStructure(structure, `${source}.structures[${index}]`));
      if (sentence.id.startsWith("p2-") || sentence.id.startsWith("p3-")) {
        assert.ok(phrase.pitfalls?.length > 0, `${source} 缺少易错点`);
      }
      (phrase.pitfalls ?? []).forEach((item, index) => requireText(item, `${source}.pitfalls[${index}]`));
    }
  }
});

test("提交答案后的题目分析完整且英文词可追溯", () => {
  const analysisTextParts = [];
  for (const articleId of ["p3", "p4", "p5"]) {
    const article = data.articleContents[articleId];
    assert.ok(article, `${articleId} 内容对象不存在`);
    for (const question of article.questions) {
      const analysis = question.analysis;
      assert.ok(analysis, `第 ${question.id} 题缺少提交后分析`);
      requireSentenceAnalysis(analysis.prompt, `question[${question.id}].analysis.prompt`);
      assert.deepEqual(Object.keys(analysis.options ?? {}).sort(), ["A", "B", "C", "D"], `第 ${question.id} 题四项分析不完整`);
      for (const key of ["A", "B", "C", "D"]) {
        requireSentenceAnalysis(analysis.options[key], `question[${question.id}].analysis.options.${key}`);
      }
      requireSentenceAnalysis(analysis.answer, `question[${question.id}].analysis.answer`);

      const entries = [analysis.prompt, analysis.answer, ...Object.values(analysis.options ?? {})];
      analysisTextParts.push(...entries.flatMap((item) => [
        item.text,
        ...item.chunks.map((chunk) => chunk.text),
        item.trunk,
        ...item.layers.flatMap((layer) => [layer.label, layer.text]),
        ...item.grammar,
        item.literal,
        item.natural,
        item.logic,
        ...(item.phrases ?? []),
      ]));
    }
  }

  const translationArticle = data.articleContents.translation;
  assert.ok(translationArticle, "translation 内容对象不存在");
  assert.equal(translationArticle.translationTasks?.length, translationArticle.sentences.length, "英译汉任务必须与句子一一对应");
  for (const task of translationArticle.translationTasks ?? []) {
    assert.ok(Number.isInteger(task.id), `英译汉任务 ${task.id} 的 ID 无效`);
    assert.ok(translationArticle.sentences.some((sentence) => sentence.id === task.sentenceId), `英译汉任务 ${task.id} 定位句不存在`);
    requireText(task.prompt, `translationTask[${task.id}].prompt`);
    requireText(task.source, `translationTask[${task.id}].source`);
    requireText(task.answer, `translationTask[${task.id}].answer`);
    requireText(task.locating, `translationTask[${task.id}].locating`);
    assert.equal(task.source, task.analysis.text, `英译汉任务 ${task.id} 的 source 必须等于 analysis.text`);
    requireSentenceAnalysis(task.analysis, `translationTask[${task.id}].analysis`);
    analysisTextParts.push(
      task.prompt,
      task.source,
      task.answer,
      task.locating,
      task.analysis.text,
      ...task.analysis.chunks.map((chunk) => chunk.text),
      task.analysis.trunk,
      ...task.analysis.layers.flatMap((layer) => [layer.label, layer.text]),
      ...task.analysis.grammar,
      task.analysis.literal,
      task.analysis.natural,
      task.analysis.logic,
      ...(task.analysis.phrases ?? []),
    );
  }

  const analysisText = analysisTextParts.join(" ");
  const tokens = [...new Set(analysisText.match(/(?:[A-Za-z]\.){2,}|(?<![0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [])];
  for (const rawToken of tokens) {
    // A/B and A-D are grammar-pattern variables, not vocabulary items.
    if (/^[A-D](?:-[A-D])?$/.test(rawToken)) continue;
    const token = rawToken.toLowerCase();
    const guide = lexicon.getLexicalGuide(token);
    const lemma = guide.headword;
    const key = data.aliasToVocab[token] ?? data.aliasToVocab[lemma] ?? lemma;
    const core = data.vocab[key];
    const wordKnowledge = knowledge.getWordKnowledge(lemma);
    const meaning = data.basicMeanings[token] ?? data.basicMeanings[lemma] ?? core?.contextualMeaning ?? guide.contextualMeaning;
    const use = guide.use ?? core?.use ?? wordKnowledge?.grammarSummary;
    requireText(guide.headword, `${token}.headword`);
    requireText(guide.partOfSpeech, `${token}.partOfSpeech`);
    assert.ok(!guide.partOfSpeech.startsWith("word（"), `${token} 使用了推测词性`);
    requireText(meaning, `${token}.contextualMeaning`);
    requireText(use, `${token}.use`);
    assert.ok(guide.specialForms.length > 0, `${token} 缺少特殊变形说明`);
    assert.ok(guide.examSynonyms.length > 0, `${token} 缺少近义词处理说明`);
  }
});

test("正文、题干选项中的全部词形都有有效知识", () => {
  const corpus = [
    ...allSentences.map((sentence) => sentence.text),
    ...allQuestions.flatMap((question) => [question.prompt, ...question.options.map((option) => option.text)]),
  ].join(" ");
  const tokens = [...new Set(corpus.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [])];

  for (const token of tokens) {
    const guide = lexicon.getLexicalGuide(token);
    const lemma = guide.headword;
    const key = data.aliasToVocab[token] ?? data.aliasToVocab[lemma] ?? lemma;
    const core = data.vocab[key];
    const wordKnowledge = knowledge.getWordKnowledge(lemma);
    const meaning = data.basicMeanings[token] ?? data.basicMeanings[lemma] ?? core?.contextualMeaning ?? guide.contextualMeaning;
    const use = guide.use ?? core?.use ?? wordKnowledge?.grammarSummary;

    requireText(guide.headword, `${token}.headword`);
    requireText(guide.partOfSpeech, `${token}.partOfSpeech`);
    assert.ok(!guide.partOfSpeech.startsWith("word（"), `${token} 使用了推测词性`);
    requireText(meaning, `${token}.contextualMeaning`);
    requireText(use, `${token}.use`);
    assert.ok(guide.specialForms.length > 0, `${token} 缺少特殊变形说明`);
    assert.ok(guide.examSynonyms.length > 0, `${token} 缺少近义词处理说明`);

    for (const [index, structure] of (wordKnowledge?.structures ?? []).entries()) {
      requireStructure(structure, `${token}.structures[${index}]`);
    }

    for (const detail of knowledge.getCollocationDetails(guide.collocations ?? [])) {
      requireText(detail.label, `${token}.collocation.label`);
      requireText(detail.meaning, `${token}.collocation[${detail.label}].meaning`);
      assert.ok(detail.target, `${token} 的搭配不可点击：${detail.label}`);
      assert.ok(knowledge.getPhraseKnowledge(detail.label), `${token} 的搭配链接没有知识页：${detail.label}`);
    }
    for (const detail of knowledge.getSynonymDetails(guide.examSynonyms ?? [])) {
      requireText(detail.label, `${token}.synonym.label`);
      requireText(detail.meaning, `${token}.synonym[${detail.label}].meaning`);
      if (detail.target?.startsWith("phrase:")) {
        assert.ok(knowledge.getPhraseKnowledge(detail.label), `${token} 的近义词组链接没有知识页：${detail.label}`);
      }
    }
    for (const detail of knowledge.getFamilyDetails(guide.wordFamily ?? [])) {
      requireText(detail.label, `${token}.family.label`);
      requireText(detail.meaning, `${token}.family[${detail.label}].meaning`);
      assert.notEqual(detail.meaning, "与当前词同源", `${token} 的同源词缺少中文义：${detail.label}`);
      assert.ok(detail.target, `${token} 的同源词不可点击：${detail.label}`);
    }
  }
});

test("已就绪文章与目录、题号和稳定 ID 一致", () => {
  const readyIds = data.sections.filter((section) => section.status === "ready").map((section) => section.id);
  assert.deepEqual(readyIds, Object.keys(data.articleContents), "目录中的已就绪文章必须都有完整内容对象");
  for (const article of Object.values(data.articleContents)) {
    assert.ok(article.sentences.length > 0, `${article.id} 缺少正文句子`);
    if (article.kind === "translation") {
      assert.equal(article.questions.length, 0, `${article.id} 不应伪装成选择题`);
      assert.equal(article.translationTasks?.length, article.sentences.length, `${article.id} 翻译任务数量必须与句子一致`);
    } else {
      assert.ok(article.questions.length > 0, `${article.id} 缺少题目`);
    }
    article.sentences.forEach((sentence) => assert.ok(sentence.id.startsWith(`${article.id}-`), `${sentence.id} 未使用文章稳定前缀`));
    article.questions.forEach((question) => assert.ok(article.sentences.some((sentence) => sentence.id === question.sentenceId), `第 ${question.id} 题定位句不属于 ${article.id}`));
  }
});
