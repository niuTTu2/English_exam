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
