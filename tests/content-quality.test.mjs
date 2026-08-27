import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
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
      (phrase.pitfalls ?? []).forEach((item, index) => requireText(item, `${source}.pitfalls[${index}]`));
    }
  }
});

test("正文、题干选项中的全部词形都有有效知识", () => {
  const corpus = [
    ...allSentences.map((sentence) => sentence.text),
    ...allQuestions.flatMap((question) => [question.prompt, ...question.options.map((option) => option.text)]),
  ].join(" ");
  const tokens = [...new Set(corpus.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:'[a-z]+)?/g) ?? [])];

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
    assert.ok(article.questions.length > 0, `${article.id} 缺少题目`);
    article.sentences.forEach((sentence) => assert.ok(sentence.id.startsWith(`${article.id}-`), `${sentence.id} 未使用文章稳定前缀`));
    article.questions.forEach((question) => assert.ok(article.sentences.some((sentence) => sentence.id === question.sentenceId), `第 ${question.id} 题定位句不属于 ${article.id}`));
  }
});
