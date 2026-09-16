import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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
const syntaxGuide = await vite.ssrLoadModule("/app/syntax-guide.ts");
const verifiedSyntax = await vite.ssrLoadModule("/app/verified-syntax-2000.ts");
const allSentences = data.allSentences ?? data.sentences;
const allQuestions = data.allQuestions ?? data.questions;

const forbiddenPlaceholder = /(待精审|后续补充|持续补充|结合本句成分理解|暂无资料|将在所属真题精审|该词未出现在)/;
const forbiddenSyntaxPlaceholder = /(从引导词后找动作发出者|找带时态、情态或语态变化的动词|再看谓语后是否需要宾语|结合相邻主干判断)/;
const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
const englishTokens = (value) => value.toLowerCase().match(/[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];

function isTokenSubsequence(shorter, longer) {
  let cursor = 0;
  for (const token of longer) {
    if (token.replaceAll("’", "'") === shorter[cursor]?.replaceAll("’", "'")) cursor += 1;
  }
  return cursor === shorter.length;
}

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
  requireBeginnerSyntax(analysis, label);
}

function requireBeginnerSyntax(analysis, label) {
  const guide = syntaxGuide.buildBeginnerSyntaxGuide(analysis);
  const source = analysis.text.toLowerCase();
  assert.equal(guide.components.length, analysis.beginnerSyntax?.components?.length ?? analysis.chunks.length, `${label} 的零基础成分数量错误`);
  assert.equal(guide.layers.length, analysis.layers.length, `${label} 的细分层级数量错误`);
  assert.ok(
    isTokenSubsequence(englishTokens(analysis.trunk), englishTokens(analysis.text)),
    `${label}.trunk 必须由原句按原顺序删减得到，不能换词、补词或改写释义`,
  );

  for (const [index, component] of guide.components.entries()) {
    requireText(component.text, `${label}.beginner.components[${index}].text`);
    requireText(component.form, `${label}.beginner.components[${index}].form`);
    requireText(component.function, `${label}.beginner.components[${index}].function`);
    requireText(component.modifies, `${label}.beginner.components[${index}].modifies`);
    requireText(component.explanation, `${label}.beginner.components[${index}].explanation`);
    assert.doesNotMatch(
      component.function,
      /^(补充说明成分|宾语 \/ 表语|句子成分|状语 \/ 背景成分|补足说明成分)$/,
      `${label}.beginner.components[${index}] 仍使用空泛成分标签`,
    );
    assert.ok(source.includes(component.text.toLowerCase()), `${label}.beginner.components[${index}] 不是原句中的准确片段`);
  }
  for (const [index, layer] of guide.layers.entries()) {
    requireText(layer.label, `${label}.beginner.layers[${index}].label`);
    requireText(layer.english, `${label}.beginner.layers[${index}].english`);
    requireText(layer.explanation, `${label}.beginner.layers[${index}].explanation`);
    requireText(layer.function, `${label}.beginner.layers[${index}].function`);
    requireText(layer.form, `${label}.beginner.layers[${index}].form`);
    requireText(layer.question, `${label}.beginner.layers[${index}].question`);
    requireText(layer.modifies, `${label}.beginner.layers[${index}].modifies`);
  }
  for (const [index, clause] of guide.clauses.entries()) {
    requireText(clause.text, `${label}.beginner.clauses[${index}].text`);
    requireText(clause.type, `${label}.beginner.clauses[${index}].type`);
    requireText(clause.marker, `${label}.beginner.clauses[${index}].marker`);
    requireText(clause.role, `${label}.beginner.clauses[${index}].role`);
    requireText(clause.subject, `${label}.beginner.clauses[${index}].subject`);
    requireText(clause.predicate, `${label}.beginner.clauses[${index}].predicate`);
    requireText(clause.translationOrder, `${label}.beginner.clauses[${index}].translationOrder`);
    assert.ok(source.includes(clause.text.toLowerCase()), `${label}.beginner.clauses[${index}] 不是原句中的准确从句边界`);
    assert.doesNotMatch(JSON.stringify(clause), forbiddenSyntaxPlaceholder, `${label}.beginner.clauses[${index}] 仍是自动占位提示`);
  }
  if (!syntaxGuide.isLegacySyntaxSentence(analysis.id)) {
    assert.ok(analysis.beginnerSyntax, `${label} 是新增句子，必须人工填写 beginnerSyntax，不能只依赖旧数据推导`);
  }
  if (syntaxGuide.isLegacySyntaxSentence(analysis.id) && guide.clauses.length > 0 && !analysis.beginnerSyntax) {
    assert.ok(
      Object.hasOwn(verifiedSyntax.verifiedClauses2000, analysis.id),
      `${label} 的从句必须进入 2000 年人工复核表，不能由界面自动猜测`,
    );
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
    requireBeginnerSyntax(sentence, sentence.id);
  }
});

test("零基础句法能识别词组作用、时间地点状语和从句内部结构", () => {
  const gold = syntaxGuide.buildBeginnerSyntaxGuide(allSentences.find((sentence) => sentence.id === "cloze-s1"));
  assert.equal(gold.clauses[0].type, "条件状语从句");
  assert.equal(gold.clauses[0].subject, "a farmer");
  assert.equal(gold.clauses[0].predicate, "wishes");
  assert.ok(gold.components.some((item) => item.text === "between his consumption and his production" && item.function.includes("定语")), "金标准句缺少 between 介词短语的修饰说明");

  const timeGuide = syntaxGuide.buildBeginnerSyntaxGuide(allSentences.find((sentence) => sentence.id === "p4-s10"));
  assert.ok(timeGuide.components.some((item) => item.text === "Last year" && item.function === "时间状语"), "Last year 应识别为时间状语");

  const placeGuide = syntaxGuide.buildBeginnerSyntaxGuide(allSentences.find((sentence) => sentence.id === "p4-s14"));
  assert.ok(placeGuide.components.some((item) => item.text.includes("In Japan") && item.function.includes("地点")), "In Japan 应识别为地点状语");

  const complexSentence = allSentences.find((sentence) => sentence.id === "p5-s9");
  const complexGuide = syntaxGuide.buildBeginnerSyntaxGuide(complexSentence);
  assert.equal(complexSentence.trunk, "we are treated to fine hypocritical spectacles", "复杂句主干必须保留原文，不能改写释义");
  assert.deepEqual(complexGuide.clauses.map((clause) => clause.marker.split("（")[0]), ["which", "who", "whose"], "p5-s9 必须完整拆出三个定语从句");
  assert.equal(complexGuide.clauses[0].subject, "which（= fine hypocritical spectacles）");
  assert.equal(complexGuide.clauses[1].objectOrComplement, "his meals（宾语）；in three-star restaurants（地点状语）");
  assert.equal(complexGuide.clauses[2].subject, "whose own children（= the journalist's own children）");
});

test("2000 年全部复杂句的从句数量与人工审计基线一致", () => {
  const expected = {
    "cloze-s1": 1, "cloze-s3": 1, "cloze-s4": 1, "cloze-s6": 1,
    "p1-s1": 1, "p1-s2": 1, "p1-s4": 1, "p1-s5": 2, "p1-s13": 3,
    "p1-s16": 2, "p1-s20": 1, "p1-s24": 1, "p1-s25": 1,
    "p2-s4": 1, "p2-s5": 2, "p2-s10": 1, "p2-s17": 1, "p2-s19": 1,
    "p2-s20": 1, "p2-s24": 1, "p2-s25": 1, "p2-s27": 2,
    "p3-s1": 4, "p3-s2": 3, "p3-s3": 1, "p3-s6": 1, "p3-s8": 1,
    "p3-s10": 3, "p3-s11": 1, "p3-s12": 1,
    "p4-s1": 1, "p4-s3": 1, "p4-s4": 1, "p4-s5": 1, "p4-s6": 1,
    "p4-s7": 1, "p4-s8": 1, "p4-s12": 3, "p4-s14": 2, "p4-s15": 1,
    "p4-s16": 1, "p4-s17": 1,
    "p5-s1": 1, "p5-s2": 2, "p5-s3": 1, "p5-s4": 2, "p5-s5": 1,
    "p5-s6": 1, "p5-s7": 1, "p5-s8": 4, "p5-s9": 3, "p5-s11": 1,
    "p5-s12": 1, "p5-s13": 3, "p5-s14": 2, "p5-s15": 1,
    "translation-s32": 2, "translation-s33": 1, "translation-s34": 2,
    "p3-q20-prompt": 1, "p3-q20-answer": 1,
    "p3-q21-prompt": 1, "p3-q21-answer": 1,
    "p3-q22-prompt": 1, "p3-q22-answer": 1,
    "p4-q26-answer": 1, "p5-q27-answer": 1, "p5-q28-prompt": 1,
    "p5-q29-prompt": 1, "p5-q30-prompt": 1,
  };
  const articles2000 = Object.values(data.articleContents).filter((article) => article.year === 2000);
  const questions2000 = articles2000.flatMap((article) => article.questions);
  const analyses = articles2000.flatMap((article) => article.sentences);
  for (const question of questions2000) {
    analyses.push(
      question.analysis?.prompt,
      ...Object.values(question.analysis?.options ?? {}),
      question.analysis?.answer,
    );
  }
  const actual = Object.fromEntries(
    analyses
      .filter(Boolean)
      .map((analysis) => [analysis.id, syntaxGuide.buildBeginnerSyntaxGuide(analysis).clauses.length])
      .filter(([, count]) => count > 0),
  );
  assert.deepEqual(actual, expected, "复杂句的从句有遗漏、误增或边界审计未同步");
  assert.equal(Object.values(actual).reduce((sum, count) => sum + count, 0), 98, "人工审计从句总数应保持为 98");
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
        article.questions.map((question) => question.number ?? question.id).sort((a, b) => a - b),
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
  const questions2000 = Object.values(data.articleContents).filter((article) => article.year === 2000).flatMap((article) => article.questions);
  for (const question of questions2000) {
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

test("2001 年完形答案与独立核验清单一致", () => {
  const article = data.articleContents["2001-cloze"];
  assert.ok(article, "2001 年完形内容对象不存在");
  assert.equal(Object.keys(answerKeys.verifiedAnswerKey2001Cloze).length, 20, "2001 年完形答案清单必须覆盖第 1—20 题");
  assert.equal(article.questions.length, 20, "2001 年完形必须包含 20 题");
  for (const question of article.questions) {
    assert.equal(
      question.answer,
      answerKeys.verifiedAnswerKey2001Cloze[question.number],
      `2001 年完形第 ${question.number} 题答案偏离独立核验清单`,
    );
  }
  assert.ok(answerKeys.verifiedAnswerSources2001Cloze.length >= 2, "2001 年完形答案必须保留至少两个来源");
  for (const source of answerKeys.verifiedAnswerSources2001Cloze) {
    requireText(source.range, "answerSource2001.range");
    requireText(source.label, "answerSource2001.label");
    assert.match(source.url, /^https:\/\//, "2001 年答案来源必须使用可访问链接");
  }
});

test("2001 年 Passage 1 原文、句法与答案通过独立门禁", () => {
  const article = data.articleContents["2001-p1"];
  assert.ok(article, "2001 年 Passage 1 内容对象不存在");
  assert.equal(article.sentences.length, 16, "2001 年 Passage 1 必须严格拆为 16 句");
  assert.equal(article.questions.length, 4, "2001 年 Passage 1 必须包含第 21—24 题");
  assert.deepEqual(article.sentences.map((sentence) => sentence.number), Array.from({ length: 16 }, (_, index) => index + 1), "2001 年 Passage 1 句号必须连续");
  assert.deepEqual(article.questions.map((question) => question.number), [21, 22, 23, 24], "原卷显示题号必须为 21—24");
  assert.equal(Object.keys(answerKeys.verifiedAnswerKey2001Passage1).length, 4, "2001 年 Passage 1 答案清单必须覆盖四题");

  for (const question of article.questions) {
    assert.equal(
      question.answer,
      answerKeys.verifiedAnswerKey2001Passage1[question.number],
      `2001 年 Passage 1 第 ${question.number} 题答案偏离独立核验清单`,
    );
  }

  assert.ok(answerKeys.verifiedAnswerSources2001Passage1.length >= 2, "2001 年 Passage 1 答案必须保留至少两个来源");
  for (const source of answerKeys.verifiedAnswerSources2001Passage1) {
    requireText(source.range, "answerSource2001P1.range");
    requireText(source.label, "answerSource2001P1.label");
    assert.match(source.url, /^https:\/\//, "2001 年 Passage 1 答案来源必须使用可访问链接");
  }

  const expectedClauseCounts = {
    "2001-p1-s6": 1,
    "2001-p1-s9": 1,
    "2001-p1-s10": 1,
    "2001-p1-s12": 1,
    "2001-p1-s14": 1,
    "2001-p1-s15": 1,
  };
  const actualClauseCounts = Object.fromEntries(
    article.sentences
      .map((sentence) => [sentence.id, syntaxGuide.buildBeginnerSyntaxGuide(sentence).clauses.length])
      .filter(([, count]) => count > 0),
  );
  assert.deepEqual(actualClauseCounts, expectedClauseCounts, "2001 年 Passage 1 的从句边界或数量有遗漏");
});

test("2001 年 Passage 1 的同义替换链接均为完整知识条目", () => {
  const article = data.articleContents["2001-p1"];
  const contexts = Object.entries(contextualVocabulary.sentenceWordContexts)
    .filter(([sentenceId]) => sentenceId.startsWith("2001-p1-"));
  assert.equal(contexts.length, article.sentences.length, "2001 年 Passage 1 每句至少应有一个可靠的本句替换入口");

  for (const [sentenceId, words] of contexts) {
    assert.ok(article.sentences.some((sentence) => sentence.id === sentenceId), `同义替换指向不存在的句子：${sentenceId}`);
    for (const context of Object.values(words)) {
      for (const substitution of context.contextualSubstitutions ?? []) {
        if (!substitution.target.startsWith("word:")) continue;
        const target = substitution.target.slice("word:".length);
        const guide = lexicon.getLexicalGuide(target);
        requireText(guide.partOfSpeech, `${sentenceId}.${target}.partOfSpeech`);
        assert.ok(!guide.partOfSpeech.startsWith("word（"), `${sentenceId} 的替换词 ${target} 使用了推测词性`);
        requireText(guide.contextualMeaning, `${sentenceId}.${target}.contextualMeaning`);
        requireText(guide.use, `${sentenceId}.${target}.use`);
      }
    }
  }
});

test("2001 年 Passage 2 原文、句法与答案通过独立门禁", () => {
  const article = data.articleContents["2001-p2"];
  assert.ok(article, "2001 年 Passage 2 内容对象不存在");
  assert.equal(article.sentences.length, 27, "2001 年 Passage 2 必须严格拆为 27 句");
  assert.equal(article.questions.length, 4, "2001 年 Passage 2 必须包含第 25—28 题");
  assert.deepEqual(article.sentences.map((sentence) => sentence.number), Array.from({ length: 27 }, (_, index) => index + 1), "2001 年 Passage 2 句号必须连续");
  assert.deepEqual(article.questions.map((question) => question.number), [25, 26, 27, 28], "原卷显示题号必须为 25—28");
  assert.equal(Object.keys(answerKeys.verifiedAnswerKey2001Passage2).length, 4, "2001 年 Passage 2 答案清单必须覆盖四题");

  for (const question of article.questions) {
    assert.equal(
      question.answer,
      answerKeys.verifiedAnswerKey2001Passage2[question.number],
      `2001 年 Passage 2 第 ${question.number} 题答案偏离独立核验清单`,
    );
  }

  assert.ok(answerKeys.verifiedAnswerSources2001Passage2.length >= 2, "2001 年 Passage 2 答案必须保留至少两个来源");
  for (const source of answerKeys.verifiedAnswerSources2001Passage2) {
    requireText(source.range, "answerSource2001P2.range");
    requireText(source.label, "answerSource2001P2.label");
    assert.match(source.url, /^https:\/\//, "2001 年 Passage 2 答案来源必须使用可访问链接");
  }

  const expectedClauseCounts = {
    "2001-p2-s4": 2,
    "2001-p2-s6": 1,
    "2001-p2-s7": 3,
    "2001-p2-s8": 1,
    "2001-p2-s10": 1,
    "2001-p2-s11": 2,
    "2001-p2-s13": 1,
    "2001-p2-s16": 2,
    "2001-p2-s17": 1,
    "2001-p2-s18": 1,
    "2001-p2-s22": 1,
    "2001-p2-s24": 1,
    "2001-p2-s25": 2,
    "2001-p2-s27": 1,
  };
  const actualClauseCounts = Object.fromEntries(
    article.sentences
      .map((sentence) => [sentence.id, syntaxGuide.buildBeginnerSyntaxGuide(sentence).clauses.length])
      .filter(([, count]) => count > 0),
  );
  assert.deepEqual(actualClauseCounts, expectedClauseCounts, "2001 年 Passage 2 的从句边界或数量有遗漏");
});

test("2001 年 Passage 2 的同义替换链接均为完整知识条目", () => {
  const article = data.articleContents["2001-p2"];
  const contexts = Object.entries(contextualVocabulary.sentenceWordContexts)
    .filter(([sentenceId]) => sentenceId.startsWith("2001-p2-"));
  assert.equal(contexts.length, article.sentences.length, "2001 年 Passage 2 每句至少应有一个可靠的本句替换入口");

  for (const [sentenceId, words] of contexts) {
    assert.ok(article.sentences.some((sentence) => sentence.id === sentenceId), `同义替换指向不存在的句子：${sentenceId}`);
    for (const context of Object.values(words)) {
      for (const substitution of context.contextualSubstitutions ?? []) {
        if (!substitution.target.startsWith("word:")) continue;
        const target = substitution.target.slice("word:".length);
        const guide = lexicon.getLexicalGuide(target);
        requireText(guide.partOfSpeech, `${sentenceId}.${target}.partOfSpeech`);
        assert.ok(!guide.partOfSpeech.startsWith("word（"), `${sentenceId} 的替换词 ${target} 使用了推测词性`);
        requireText(guide.contextualMeaning, `${sentenceId}.${target}.contextualMeaning`);
        requireText(guide.use, `${sentenceId}.${target}.use`);
      }
    }
  }
});

test("2010 年完形原文、20 题答案与零基础句法通过独立门禁", () => {
  const article = data.articleContents["2010-cloze"];
  assert.ok(article, "2010 年完形内容对象不存在");
  assert.equal(article.sentences.length, 13, "2010 年完形必须严格拆为 13 句");
  assert.equal(article.questions.length, 20, "2010 年完形必须包含 20 题");
  assert.deepEqual(article.sentences.map((sentence) => sentence.number), Array.from({ length: 13 }, (_, index) => index + 1), "2010 年完形句号必须连续");
  assert.equal(Object.keys(answerKeys.verifiedAnswerKey2010Cloze).length, 20, "2010 年完形答案清单必须覆盖第 1—20 题");
  for (const question of article.questions) {
    assert.equal(question.answer, answerKeys.verifiedAnswerKey2010Cloze[question.number], `2010 年完形第 ${question.number} 题答案偏离独立核验清单`);
  }
  assert.ok(answerKeys.verifiedAnswerSources2010Cloze.length >= 2, "2010 年完形必须保留至少两个核验来源");
  for (const source of answerKeys.verifiedAnswerSources2010Cloze) {
    requireText(source.range, "answerSource2010.range");
    requireText(source.label, "answerSource2010.label");
    assert.match(source.url, /^https:\/\//, "2010 年答案来源必须使用可访问链接");
  }

  const expectedClauseCounts = {
    "2010-cloze-s1": 1,
    "2010-cloze-s3": 1,
    "2010-cloze-s5": 1,
    "2010-cloze-s6": 1,
    "2010-cloze-s7": 1,
    "2010-cloze-s8": 2,
    "2010-cloze-s11": 1,
    "2010-cloze-s12": 2,
  };
  const actualClauseCounts = Object.fromEntries(article.sentences.map((sentence) => [sentence.id, syntaxGuide.buildBeginnerSyntaxGuide(sentence).clauses.length]).filter(([, count]) => count > 0));
  assert.deepEqual(actualClauseCounts, expectedClauseCounts, "2010 年完形的从句边界或数量有遗漏");
});

test("2010 年完形每句都有语境化同义替换且链接有效", () => {
  const article = data.articleContents["2010-cloze"];
  const contexts = Object.entries(contextualVocabulary.sentenceWordContexts).filter(([sentenceId]) => sentenceId.startsWith("2010-cloze-"));
  assert.equal(contexts.length, 13, "2010 年完形 13 句每句至少应有一个本句替换入口");
  for (const [sentenceId, words] of contexts) {
    assert.ok(article.sentences.some((sentence) => sentence.id === sentenceId), `同义替换指向不存在的句子：${sentenceId}`);
    for (const context of Object.values(words)) {
      for (const substitution of context.contextualSubstitutions ?? []) {
        if (substitution.target.startsWith("word:")) {
          const guide = lexicon.getLexicalGuide(substitution.target.slice(5), { articleId: "2010-cloze" });
          requireText(guide.contextualMeaning, `${sentenceId}.replacement.meaning`);
          requireText(guide.use, `${sentenceId}.replacement.use`);
          assert.ok(!guide.partOfSpeech.startsWith("word（"), `${sentenceId} 的替换词使用了推测词性`);
        } else {
          assert.ok(knowledge.getPhraseKnowledge(substitution.target.slice(7)), `${sentenceId} 的替换词组没有完整知识链接`);
        }
      }
    }
  }
});

test("同一词条按文章和句子语境显示本句义与可替换表达", () => {
  const sentenceById = new Map(allSentences.map((sentence) => [sentence.id, sentence]));
  const articleBySentence = new Map(Object.values(data.articleContents).flatMap((article) => article.sentences.map((sentence) => [sentence.id, article.id])));

  for (const [sentenceId, wordContexts] of Object.entries(contextualVocabulary.sentenceWordContexts)) {
    const sentence = sentenceById.get(sentenceId);
    assert.ok(sentence, `语境词条指向不存在的句子：${sentenceId}`);
    const sourceTokens = sentence.text.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];

    for (const [headword, context] of Object.entries(wordContexts)) {
      const lexicalContext = { articleId: articleBySentence.get(sentenceId), sentenceId };
      assert.ok(
        sourceTokens.some((token) => lexicon.canonicalLemma(token, lexicalContext) === headword),
        `${sentenceId} 中不存在语境词 ${headword}`,
      );
      if (context.contextualMeaning) requireText(context.contextualMeaning, `${sentenceId}.${headword}.contextualMeaning`);
      if (context.use) requireText(context.use, `${sentenceId}.${headword}.use`);

      const substitutions = context.contextualSubstitutions ?? [];
      if (context.contextualSubstitutions !== undefined) {
        assert.ok(Array.isArray(context.contextualSubstitutions));
        assert.ok(substitutions.length >= 1 && substitutions.length <= 3, `${sentenceId}.${headword} 明确提供的本句替换应为 1—3 项`);
      } else {
        requireText(context.contextualMeaning, `${sentenceId}.${headword}.contextualMeaning`);
        requireText(context.use, `${sentenceId}.${headword}.use`);
      }
      const actualGuide = lexicon.getLexicalGuide(headword, lexicalContext);
      if (context.contextualMeaning) assert.equal(actualGuide.contextualMeaning, context.contextualMeaning);
      if (context.use) assert.equal(actualGuide.use, context.use);
      assert.deepEqual(actualGuide.contextualSubstitutions, substitutions);
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
  const readyIds = Object.values(data.sectionsByYear).flat().filter((section) => section.status === "ready").map((section) => section.id);
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

test("2010 Text 3 原卷哈希、答案及逐句从句边界一致", () => {
  const article = data.articleContents["2010-p3"];
  const hash = text => createHash("sha256").update(normalizeText(text)).digest("hex");
  assert.equal(hash(article.sentences.map(sentence => sentence.text).join(" ")), "811788c373f1cccaa2e4f080e51e7c3c6fd3ce5766c5d25b94c957f8a5c701f4");
  assert.equal(hash(article.questions.flatMap(question => [question.prompt, ...question.options.map(option => option.text)]).join(" ")), "ac8c7dd741af57e610a700b8909fe8a77a53d9d644b2087ff2ce6143e90eda62");
  assert.deepEqual(article.sentences.map(sentence => sentence.number), Array.from({ length: 16 }, (_, index) => index + 1));
  assert.deepEqual(article.questions.map(question => question.number), [31, 32, 33, 34, 35]);
  assert.deepEqual(article.sentences.map(sentence => sentence.beginnerSyntax.clauses.length), [0, 1, 2, 1, 2, 3, 0, 0, 0, 0, 0, 0, 3, 0, 1, 2]);
  for (const question of article.questions) assert.equal(question.answer, answerKeys.verifiedAnswerKey2010Passage3[question.number]);
  assert.ok(answerKeys.verifiedAnswerSources2010Passage3.length);
  assert.match(article.sentences[0].text, /had perfected/);
  assert.match(article.questions[4].explanations.B, /批评/);
});

test("2010 Text 3 词汇语境隔离、全词形覆盖及词组复用", async () => {
  const article = data.articleContents["2010-p3"];
  for (const sentence of article.sentences) {
    for (const token of englishTokens(sentence.text)) {
      const guide = lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: sentence.id });
      requireText(guide.contextualMeaning, `${sentence.id}.${token}.meaning`);
      requireText(guide.use, `${sentence.id}.${token}.use`);
      assert.ok(!guide.partOfSpeech.startsWith("word（"));
    }
  }
  const guide = (token, number) => lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: `2010-p3-s${number}` });
  assert.match(guide("art", 1).contextualMeaning, /技巧|手法/);
  assert.match(lexicon.getLexicalGuide("art", { articleId: "2010-p1" }).contextualMeaning, /艺术/);
  assert.equal(guide("finding", 5).headword, "find");
  assert.match(guide("wipes", 6).contextualMeaning, /湿巾/);
  assert.match(guide("use", 11).contextualMeaning, /名词/);
  assert.match(guide("it's", 14).contextualMeaning, /培养/);
  assert.equal(lexicon.canonicalLemma("advertising", { articleId: article.id }), "advertising");
  assert.equal(lexicon.canonicalLemma("best", { articleId: "2010-p2", sentenceId: "2010-p2-s19" }), "best");
  assert.equal(knowledge.getPhraseKnowledge("between hair brushing and putting on makeup").key, "between-a-and-b");
  const entries = await vite.ssrLoadModule("/app/2010-passage-3-lexicon.ts");
  for (const entry of Object.values(entries.passage2010P3Lexicon)) {
    for (const detail of knowledge.getSynonymDetails(entry.examSynonyms)) {
      if (!detail.target?.startsWith("word:")) continue;
      const target = lexicon.getLexicalGuide(detail.target.slice(5), { articleId: article.id });
      requireText(target.contextualMeaning, `${detail.target}.meaning`);
      requireText(target.use, `${detail.target}.use`);
      assert.ok(!target.partOfSpeech.startsWith("word（"));
    }
  }
});

test("2010 Text 1 以单篇门禁覆盖句法、答案、词组和同义替换", () => {
  const article = data.articleContents["2010-p1"];
  assert.equal(article.sentences.length, 19, "2010 Text 1 必须保留 19 个稳定句子");
  assert.equal(article.questions.length, 5, "2010 Text 1 必须覆盖第 21—25 题");
  assert.deepEqual(article.questions.map((question) => [question.number, question.answer]), [[21, "D"], [22, "A"], [23, "B"], [24, "C"], [25, "C"]]);
  assert.deepEqual(article.questions.map((question) => question.answer), Object.values(answerKeys.verifiedAnswerKey2010Passage1));
  assert.ok(answerKeys.verifiedAnswerSources2010Passage1.length >= 2, "2010 Text 1 必须保留至少两个核验来源");

  for (const sentence of article.sentences) {
    assert.ok(sentence.beginnerSyntax?.components.length >= 3, `${sentence.id} 缺少初学者句内成分拆解`);
    requireText(sentence.literal, `${sentence.id}.literal`);
    requireText(sentence.natural, `${sentence.id}.natural`);
    requireText(sentence.logic, `${sentence.id}.logic`);
    assert.ok(sentence.phrases.length > 0, `${sentence.id} 缺少预标词组`);
    for (const phrase of sentence.phrases) assert.ok(knowledge.getPhraseKnowledge(phrase), `${sentence.id} 的词组没有正式知识页：${phrase}`);
    const contexts = contextualVocabulary.sentenceWordContexts[sentence.id] ?? {};
    assert.ok(Object.values(contexts).some((entry) => entry.contextualSubstitutions?.length), `${sentence.id} 缺少原句同义替换`);
  }
});

test("2010 Text 2 保留用户原卷、题号、答案依据及复杂句边界", () => {
  const article = data.articleContents["2010-p2"];
  assert.equal(article.sentences.length, 19);
  assert.deepEqual(article.sentences.map((sentence) => sentence.id), Array.from({ length: 19 }, (_, index) => `2010-p2-s${index + 1}`));
  assert.deepEqual(article.questions.map((question) => [question.id, question.number, question.answer]), [[201026, 26, "A"], [201027, 27, "C"], [201028, 28, "B"], [201029, 29, "D"], [201030, 30, "B"]]);
  assert.deepEqual(article.questions.map((question) => question.answer), Object.values(answerKeys.verifiedAnswerKey2010Passage2));
  const body = article.sentences.map((sentence) => sentence.text).join(" ");
  const questions = JSON.stringify(article.questions.map((question) => ({ number: question.number, prompt: question.prompt, options: question.options.map((option) => option.text) })));
  assert.equal(createHash("sha256").update(body).digest("hex"), "108a95e5c4bef2ca4a0552143fe3eb2c4484e9850c1b4c7046fab25b9eb73c10", "正文必须逐字保留用户 DOCX 第148—152段，包括跨句引号");
  assert.equal(createHash("sha256").update(questions).digest("hex"), "47995e0dbc5548b0d908681d5eac99bf02ae9a561c5df3146399168ebc3f29b2", "题干、下划线、标点和选项必须保留用户 DOCX 第153—177段");
  assert.deepEqual(article.sentences.map((sentence) => sentence.beginnerSyntax.clauses.length), [1, 1, 2, 0, 1, 0, 1, 1, 1, 3, 0, 0, 2, 0, 0, 1, 0, 2, 2]);
  const research = article.sentences[14];
  assert.deepEqual(research.beginnerSyntax.clauses, [], "第15句分词、不定式和份额比较不得伪造成完整从句");
  assert.ok(research.beginnerSyntax.components.some((component) => component.text.includes("having given up") && /完成/.test(component.explanation + component.form)));
  const finding = article.sentences[17];
  assert.ok(finding.beginnerSyntax.clauses.some((clause) => clause.text === "as Hacker observed years before" && /非限制性定语从句/.test(clause.type)));
  const ending = article.sentences[18];
  assert.ok(ending.beginnerSyntax.components.some((component) => component.text === "with a newspaper held up in front of his face" && /宾补|宾语补足语/.test(component.explanation)));
  assert.ok(!ending.beginnerSyntax.clauses.some((clause) => clause.text.startsWith("with ")));
  assert.ok(ending.beginnerSyntax.components.some((component) => component.text === "wanting to talk" && /woman/.test(component.modifies)));
  assert.match(article.questions[2].explanations.B, /离婚率/);
  assert.match(article.questions[2].explanations.B, /占比/);
  assert.match(article.questions[4].explanations.B, /不表示原卷实际包含/);
  assert.equal(answerKeys.verifiedAnswerSources2010Passage2.length, 3);
  assert.ok(answerKeys.verifiedAnswerSources2010Passage2.some((source) => source.url.includes("koolearn.com") && source.range.includes("A C B D B")));
  assert.ok(answerKeys.verifiedAnswerSources2010Passage2.some((source) => source.url.includes("hhkaobo.com") && source.range.includes("第28题")));
  assert.ok(answerKeys.verifiedAnswerSources2010Passage2.some((source) => source.url.includes("chsi.com.cn") && source.range.includes("未采用")));
});

test("2010 Text 2 词义按句隔离且屈折词形与派生词族分开", () => {
  const guideFor = (token, number) => lexicon.getLexicalGuide(token, { articleId: "2010-p2", sentenceId: `2010-p2-s${number}` });
  for (const sentence of data.articleContents["2010-p2"].sentences) {
    const sourceTokens = sentence.text.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];
    for (const [headword, context] of Object.entries(contextualVocabulary.sentenceWordContexts[sentence.id])) {
      assert.ok(sourceTokens.some((token) => lexicon.canonicalLemma(token) === headword), `${sentence.id} 中不存在语境词 ${headword}`);
      requireText(context.contextualMeaning, `${sentence.id}.${headword}.meaning`);
      requireText(context.use, `${sentence.id}.${headword}.use`);
      const guide = guideFor(headword, sentence.number);
      assert.equal(guide.contextualMeaning, context.contextualMeaning);
      assert.equal(guide.use, context.use);
    }
  }
  assert.match(guideFor("room", 1).contextualMeaning, /客厅/);
  assert.match(guideFor("room", 6).contextualMeaning, /人|听众/);
  assert.notEqual(guideFor("share", 15).contextualMeaning, guideFor("share", 18).contextualMeaning);
  assert.match(guideFor("share", 15).use, /名词/);
  assert.match(guideFor("share", 18).use, /动词/);
  assert.match(guideFor("given", 14).use, /介词|鉴于/);
  assert.match(guideFor("given", 15).use, /放弃|完成式/);
  assert.notEqual(guideFor("that", 1).use, guideFor("that", 3).use);
  assert.notEqual(guideFor("most", 13).use, guideFor("most", 15).use);
  assert.match(guideFor("it", 19).contextualMeaning, /报纸/);
  assert.match(guideFor("wanting", 19).use, /逻辑主语是 woman/);
  assert.match(guideFor("one", 2).use, /数词/);
  assert.match(guideFor("ideas", 2).contextualMeaning, /想法/);
  assert.equal(lexicon.canonicalLemma("ideas"), "idea");
  assert.equal(lexicon.canonicalLemma("laughing"), "laugh");
  for (const [derived, base] of [["complaint", "complain"], ["laughter", "laugh"], ["communication", "communicate"], ["motivation", "motivate"], ["conversational", "conversation"], ["gathering", "gather"]]) {
    assert.equal(lexicon.canonicalLemma(derived), derived, `${derived} 应保持独立原形`);
    assert.equal(lexicon.familyAliases[derived], base, `${derived} 只在词族层关联 ${base}`);
  }
  const oldIdeas = lexicon.getLexicalGuide("ideas", { articleId: "translation" });
  assert.match(oldIdeas.use, /customs/);
  assert.doesNotMatch(oldIdeas.use, /offering|主旨/);
  assert.doesNotMatch(lexicon.getLexicalGuide("work", { articleId: "2010-p1" }).contextualMeaning, /日常生活事务/);
  assert.match(guideFor("work", 15).contextualMeaning, /日常生活/);
  const questionContext = { articleId: "2010-p2" };
  assert.match(lexicon.getLexicalGuide("line", questionContext).use, /第2段第3行/);
  assert.match(lexicon.getLexicalGuide("para", questionContext).use, /第2段/);
  assert.match(lexicon.getLexicalGuide("will", questionContext).partOfSpeech, /modal/);
  const verbMeans = lexicon.getLexicalGuide("means", { ...questionContext, sourceId: "question-201027-prompt" });
  assert.equal(verbMeans.headword, "mean");
  assert.match(verbMeans.use, /第三人称单数/);
  assert.match(lexicon.getLexicalGuide("means", { articleId: "translation" }).contextualMeaning, /手段|方法/);
});

test("means 的语境原形贯通词卡、题干出处和年度次数且不误并名词", async () => {
  const study = await vite.ssrLoadModule("/app/study-app.tsx");
  for (const sourceId of ["p2-s5", "p2-s19", "p2-s20", "question-201027-prompt"]) {
    assert.equal(lexicon.canonicalLemma("means", { sourceId }), "mean");
    const entry = study.resolveEntry("means", false, sourceId);
    assert.equal(entry.headword, "mean");
    assert.equal(entry.key, "mean");
    assert.match(entry.contextualMeaning, /意味着|意思/);
    assert.doesNotMatch(entry.use, /doesn't mean 与 does mean/);
    assert.match(entry.grammarRole, /名词、动名词或内容从句/);
    assert.doesNotMatch(entry.grammarSummary, /本文用 doesn't\/does mean/);
    assert.equal(entry.counts.lemma, study.currentCounts("mean", false).lemma);
    assert.ok(entry.occurrences.some((occurrence) => /第 27 题题干/.test(occurrence.section)));
    assert.ok(entry.occurrences.every((occurrence) => !occurrence.excerpt.includes("by modern means of transport")));
  }
  assert.equal(lexicon.canonicalLemma("means"), "means", "没有语境时不能全局猜成动词");
  assert.equal(lexicon.canonicalLemma("means", { sourceId: "translation-s35" }), "means");
  const nounEntry = study.resolveEntry("means", false, "translation-s35");
  assert.equal(nounEntry.headword, "means");
  assert.match(nounEntry.contextualMeaning, /手段|方法/);
  assert.equal(nounEntry.counts.form, study.currentCounts("means", false, "question-201027-prompt").form, "同表层词形的精确次数相同，原形统计才按语境拆分");
  assert.ok(nounEntry.occurrences.some((occurrence) => occurrence.excerpt.includes("by modern means of transport")));
  assert.ok(nounEntry.occurrences.every((occurrence) => !occurrence.excerpt.includes("most probably means")));
  for (const year of [2000, 2010]) {
    const expected = new Map();
    for (const article of Object.values(data.articleContents).filter((candidate) => candidate.year === year)) {
      const sources = [
        ...article.sentences.map((sentence) => [sentence.id, sentence.text]),
        ...article.questions.flatMap((question) => [[`question-${question.id}-prompt`, question.prompt], ...question.options.map((option) => [`question-${question.id}-option-${option.key}`, option.text])]),
      ];
      for (const [sourceId, text] of sources) {
        const tokens = text.toLowerCase().match(/(?:[a-z]\.){2,}|(?<![0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];
        for (const token of tokens) {
          const headword = lexicon.canonicalLemma(token, { sourceId, articleId: article.id });
          if (headword !== "mean" && headword !== "means") continue;
          expected.set(headword, (expected.get(headword) ?? 0) + 1);
        }
      }
    }
    const actual = study.buildYearWordItems(year).filter((entry) => entry.headword === "mean" || entry.headword === "means");
    assert.deepEqual(new Map(actual.map((entry) => [entry.headword, entry.count])), expected);
    if (year === 2010) {
      const verbItem = actual.find((entry) => entry.headword === "mean");
      assert.ok(verbItem.forms.includes("means"));
      assert.equal(verbItem.sentenceId, "2010-p1-s10", "保留旧篇的首次出现位置，不让新增题干覆盖已有出处");
      assert.equal(verbItem.sourceForm, "meant", "代表词形必须真实出现在所选出处，不能把题干means配到旧句meant上");
      assert.equal(study.resolveEntry(verbItem.sourceForm, false, verbItem.sentenceId).headword, verbItem.headword, "年度词表点击后不得从动词跳到名词");
      assert.match(study.resolveEntry(verbItem.sourceForm, false, verbItem.sentenceId).use, /collectors stayed away/);
      assert.equal(actual.some((entry) => entry.headword === "means"), false, "本年度动词三单不得额外生成名词词条");
    }
  }
});

test("2010 Text 2 提供的六个替换保留整句且所有新增近义词链接有效", async () => {
  const article = data.articleContents["2010-p2"];
  const importedLexicon = await vite.ssrLoadModule("/app/2010-passage-2-lexicon.ts");
  const expected = [
    [1, "address", "was addressing", "was speaking to", "word:speak"],
    [2, "frequently", "frequently", "often", "word:often"],
    [3, "frequently", "frequently", "often", "word:often"],
    [11, "wreak", "wreaking havoc with", "causing serious damage to", "word:cause"],
    [13, "report", "reports", "states", "word:state"],
    [15, "tangible", "tangible", "concrete", "word:concrete"],
  ];
  for (const [number, headword, original, replacement, target] of expected) {
    const sentence = article.sentences[number - 1];
    const lexicalContext = { articleId: article.id, sentenceId: sentence.id };
    const guide = lexicon.getLexicalGuide(headword, lexicalContext);
    assert.equal(guide.contextualSubstitutions.length, 1);
    const substitution = guide.contextualSubstitutions[0];
    assert.equal(substitution.rewrittenSentence, sentence.text.replace(original, replacement), `${sentence.id} 的改写不能丢失其他命题信息`);
    assert.equal(substitution.target, target);
    const targetGuide = lexicon.getLexicalGuide(target.slice(5), { articleId: article.id });
    requireText(targetGuide.contextualMeaning, `${target}.meaning`);
    requireText(targetGuide.use, `${target}.use`);
    assert.ok(!targetGuide.partOfSpeech.startsWith("word（"));
  }
  for (const [headword, entry] of Object.entries(importedLexicon.passage2010P2Lexicon)) {
    for (const detail of knowledge.getSynonymDetails(entry.examSynonyms)) {
      if (!detail.target?.startsWith("word:")) continue;
      const targetGuide = lexicon.getLexicalGuide(detail.target.slice(5), { articleId: article.id });
      requireText(targetGuide.contextualMeaning, `${headword}.${detail.target}.meaning`);
      requireText(targetGuide.use, `${headword}.${detail.target}.use`);
      assert.ok(!targetGuide.partOfSpeech.startsWith("word（"), `${headword} 的 ${detail.target} 不得使用推测词性`);
    }
  }
  const originalPhrase = knowledge.getPhraseKnowledge("wreaking havoc with marriage");
  assert.equal(originalPhrase.sourceExpression, "wreaking havoc with marriage");
  assert.equal(originalPhrase.canonical, "wreak havoc with / on something");
  assert.equal(knowledge.getPhraseKnowledge("focused on communication").key, "focus-on-object");
  assert.equal(knowledge.getPhraseKnowledge("such as").key, "such-as");
  assert.equal(knowledge.getPhraseKnowledge("communication between couples").key, "between-a-and-b");
  assert.equal(knowledge.getPhraseKnowledge("between man and wife").key, "between-a-and-b");
});
