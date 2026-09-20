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
const reviewedSyntax = await vite.ssrLoadModule("/app/reviewed-syntax.ts");
const allSentences = data.allSentences ?? data.sentences;
const v2SentenceIds = new Set(Object.values(data.articleContents).filter(a => a.experienceVersion === 2).flatMap(a => a.sentences.map(s => s.id)));
const allQuestions = data.allQuestions ?? data.questions;

test("单词本句义与词组、句意分开，保留词形与语境差异", async () => {
  const word = (articleId, sentenceId, token) => lexicon.getLexicalGuide(token, { articleId, sourceId: sentenceId, sentenceId });
  assert.equal(word("2010-p1", "2010-p1-s1", "dramatic").contextualMeaning, "戏剧性的；引人注目的");
  assert.equal(word("2010-p1", "2010-p1-s4", "filed").contextualMeaning, "提出；提交（申请）");
  assert.equal(word("2010-p1", "2010-p1-s5", "momentum").contextualMeaning, "动力；势头");
  assert.equal(word("2010-p1", "2010-p1-s15", "confident").contextualMeaning, "确信的；有信心的");
  assert.equal(word("2010-p2", "2010-p2-s1", "room").contextualMeaning, "房间；室");
  assert.equal(word("2010-p2", "2010-p2-s6", "room").contextualMeaning, "满屋的人");
  assert.match(word("2010-p2", "2010-p2-s1", "room").use, /living room|客厅/);
  assert.equal(word("2001-cloze", "2001-cloze-s3", "offer").contextualMeaning, "提供；给予");
  assert.match(word("2001-cloze", "2001-cloze-s3", "offer").use, /sufficient control/);
  assert.equal(word("cloze", "cloze-s1", "wishes").contextualMeaning, "希望；想要");
  assert.match(knowledge.getPhraseKnowledge("between his consumption and his production").meaning, /之间/);
  // 单词没有携带原文的主语、宾语和否定；这些信息仍留在本句用法中。
  assert.equal(word("2010-translation", "2010-translation-s8", "in").contextualMeaning, "在（某一时段）");
  assert.match(word("2010-translation", "2010-translation-s8", "in").use, /wake up/);
  const study = await vite.ssrLoadModule("/app/study-app.tsx");
  const wordCard = study.resolveEntry("dramatic", false, "2010-p1-s1");
  const phraseCard = study.resolveEntry("on a dramatic note", true, "2010-p1-s1");
  assert.equal(wordCard.kind, "word");
  assert.equal(phraseCard.kind, "phrase");
  assert.notEqual(wordCard.contextualMeaning, phraseCard.contextualMeaning);
  assert.equal(wordCard.contextualMeaning, "戏剧性的；引人注目的");
});

test("Text 1题干选项词卡使用各自语境，参与义不串成身体变化，名词不误并动词", async () => {
  const { resolveEntry } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { passage2010P1QuestionContexts } = await vite.ssrLoadModule("/app/2010-passage-1-question-contexts.ts");
  const card = (token, sourceId) => resolveEntry(token, false, sourceId);
  const involved = card("involved", "question-201022-option-A");
  assert.match(involved.contextualMeaning, /参与/);
  assert.doesNotMatch(involved.use, /^has involved little physical change 表示只涉及/);
  assert.match(involved.use, /involved in/);
  assert.match(card("involved", "p2-s21").contextualMeaning, /涉及/);
  assert.match(card("involved", "p2-s21").use, /physical change|身体变化/);
  assert.match(card("worth", "question-201022-option-D").contextualMeaning, /值得/);
  assert.doesNotMatch(card("worth", "question-201022-option-D").use, /65 billion/);
  const fluctuation = card("Fluctuation", "question-201025-option-A");
  assert.equal(fluctuation.headword, "fluctuation");
  assert.match(fluctuation.partOfSpeech, /n\./);
  assert.match(card("made", "question-201021-option-D").contextualMeaning, /完成|举行/);
  for (const [sourceId, terms] of Object.entries(passage2010P1QuestionContexts)) {
    const match = sourceId.match(/^question-(\d+)-(prompt|option-([A-D]))$/);
    assert.ok(match, `来源ID无效：${sourceId}`);
    const question = data.articleContents["2010-p1"].questions.find(q => q.id === Number(match[1]));
    assert.ok(question, `找不到题目：${sourceId}`);
    const text = match[2] === "prompt" ? question.prompt : question.options.find(option => option.key === match[3]).text;
    for (const [lemma, entry] of Object.entries(terms)) {
      const token = englishTokens(text).find(token => lexicon.canonicalLemma(token, { articleId: "2010-p1", sourceId }) === lemma);
      assert.ok(token, `${sourceId}中没有原形${lemma}`);
      assert.ok(entry.contextualMeaning && entry.use && entry.partOfSpeech);
      assert.equal(card(token, sourceId).contextualMeaning, entry.contextualMeaning, `${sourceId}/${token}必须使用来源语境`);
      assert.equal(card(token, sourceId).partOfSpeech, entry.partOfSpeech);
    }
  }
});

const forbiddenPlaceholder = /(待精审|后续补充|持续补充|结合本句成分理解|暂无资料|将在所属真题精审|该词未出现在)/;
const forbiddenSyntaxPlaceholder = /(从引导词后找动作发出者|找带时态、情态或语态变化的动词|再看谓语后是否需要宾语|结合相邻主干判断)/;
const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
const syntaxComponents = (components) => components.flatMap((component) => [component, ...syntaxComponents(component.children ?? [])]);
const englishTokens = (value) => value.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];

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

function requireChunkRole(chunk, label) {
  if (chunk.visualRole) {
    assert.ok(Object.hasOwn(reviewedSyntax.visualRoleLabels, chunk.visualRole), `${label} 视觉类别无效`);
    assert.equal(chunk.role, undefined, `${label} 新版不得再混入旧语法配色字段`);
    for (const field of ["grammarFunction", "form", "relation", "componentText"]) requireText(chunk[field], `${label}.${field}`);
  } else {
    assert.ok(["condition", "subject", "predicate", "object", "modifier", "connector"].includes(chunk.role), `${label} 旧配色无效`);
  }
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
    requireChunkRole(chunk, label);
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

  function checkComponent(component, path, parentText) {
    const index = path;
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
    assert.ok(parentText.includes(component.text.toLowerCase()), `${label}.components[${path}] 不在父级原文边界内`);
    for (const [childIndex, child] of (component.children ?? []).entries()) {
      checkComponent(child, `${path}.children[${childIndex}]`, component.text.toLowerCase());
    }
  }
  guide.components.forEach((component, index) => checkComponent(component, index, source));
  for (const [index, layer] of guide.layers.entries()) {
    requireText(layer.label, `${label}.beginner.layers[${index}].label`);
    requireText(layer.english, `${label}.beginner.layers[${index}].english`);
    requireText(layer.explanation, `${label}.beginner.layers[${index}].explanation`);
    assert.equal(layer.label, analysis.layers[index].label, `${label} 不能从关键词猜测或覆盖作者的层级标签`);
    assert.ok(!Object.hasOwn(layer, "modifies"), `${label} 不得自动生成未核验的修饰对象`);
  }
  if (guide.reading) {
    requireText(guide.reading.focus, `${label}.reading.focus`);
    assert.ok(guide.reading.questions.length >= 1 && guide.reading.questions.length <= 3, `${label} 阅读难点应控制为1—3项`);
    for (const point of guide.reading.questions) {
      requireText(point.question, `${label}.reading.question`);
      requireText(point.answer, `${label}.reading.answer`);
      requireText(point.evidence, `${label}.reading.evidence`);
      assert.ok(source.includes(point.evidence.toLowerCase()), `${label} 阅读解释必须关联本句准确原文`);
    }
    for (const event of guide.reading.timeline ?? []) {
      requireText(event.label, `${label}.reading.timeline.label`);
      requireText(event.explanation, `${label}.reading.timeline.explanation`);
    }
  }
  for (const [index, clause] of guide.clauses.entries()) {
    requireText(clause.text, `${label}.beginner.clauses[${index}].text`);
    requireText(clause.type, `${label}.beginner.clauses[${index}].type`);
    requireText(clause.marker, `${label}.beginner.clauses[${index}].marker`);
    requireText(clause.role, `${label}.beginner.clauses[${index}].role`);
    requireText(clause.subject, `${label}.beginner.clauses[${index}].subject`);
    requireText(clause.predicate, `${label}.beginner.clauses[${index}].predicate`);
    for (const detail of clause.predicateDetails ?? []) {
      requireText(detail.function, `${label}.clause.predicateDetails.function`);
      requireText(detail.text, `${label}.clause.predicateDetails.text`);
      assert.doesNotMatch(detail.function, /宾语.*表语|宾语.*补语/, "精审后的从句必须区分实际成分名称");
    }
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
    // V2 has a separate understanding/evidence gate; V1 keeps every original syntax check.
    if (v2SentenceIds.has(sentence.id)) continue;
    requireText(sentence.trunk, `${sentence.id}.trunk`);
    requireText(sentence.literal, `${sentence.id}.literal`);
    requireText(sentence.natural, `${sentence.id}.natural`);
    requireText(sentence.logic, `${sentence.id}.logic`);
    assert.ok(sentence.chunks.length >= (sentence.textKind === "phrase" ? 1 : 2), `${sentence.id} 缺少彩色结构分块`);
    assert.equal(
      normalizeText(sentence.chunks.map((chunk) => chunk.text).join("")),
      normalizeText(sentence.text),
      `${sentence.id} 的 chunks 不能还原原句`,
    );
    for (const [index, chunk] of sentence.chunks.entries()) {
      requireText(chunk.text, `${sentence.id}.chunks[${index}].text`);
      requireChunkRole(chunk, sentence.id);
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
  assert.equal(complexGuide.clauses[0].subject, "which");
  assert.deepEqual(complexGuide.clauses[1].predicateDetails, [{ function: "宾语", text: "his meals" }]);
  assert.equal(complexGuide.clauses[2].subject, "whose own children");
});

test("2010 Text 1 配色与精确语法分离，第一层与人工成分使用同一份数据", () => {
  const sentences = data.articleContents["2010-p1"].sentences;
  for (const sentence of sentences) {
    assert.equal(sentence.chunks.map(chunk => chunk.text).join(""), sentence.text);
    sentence.chunks.forEach((chunk, i) => {
      const component = sentence.beginnerSyntax.components[i];
      assert.equal(chunk.grammarFunction, component.function);
      assert.equal(chunk.componentText, component.text);
      assert.equal(chunk.relation, component.modifies);
      assert.equal(chunk.role, undefined);
    });
    for (const clause of sentence.beginnerSyntax.clauses) assert.ok(clause.predicateDetails?.length);
  }
  const s3 = sentences[2];
  assert.equal(s3.chunks[2].grammarFunction, "表语");
  assert.equal(s3.chunks[2].visualRole, "complement");
  assert.equal(sentences[3].chunks[0].grammarFunction, "时间状语从句");
  assert.equal(sentences[3].chunks[0].visualRole, "modifier");
  assert.throws(() => reviewedSyntax.withReviewedSyntax(s3, ["subject", "predicate", "object"]), /表语不能/);
  assert.throws(() => reviewedSyntax.withReviewedSyntax(s3, ["subject"]), /一一对应/);
  assert.throws(() => reviewedSyntax.withReviewedSyntax({ ...s3, text: "It was missing a last victory." }, ["subject", "predicate", "complement"]), /连续覆盖/);
});

test("2010 Text 1 阅读讲解保留真实层级、时态关系与否定对比", () => {
  const sentences = data.articleContents["2010-p1"].sentences;
  assert.equal(sentences.length, 19);
  assert.equal(new Set(sentences.map(sentence => sentence.beginnerSyntax.reading.focus)).size, 19);
  for (const sentence of sentences) assert.ok(sentence.beginnerSyntax.reading.questions.length > 0);
  const s5 = sentences.find(sentence => sentence.id === "2010-p1-s5");
  const guide = syntaxGuide.buildBeginnerSyntaxGuide(s5);
  assert.equal(guide.clauses.length, 0, "after + -ing 和 since + 年份不能被凭关键词造出有限从句");
  const predicate = guide.components.find(component => component.function === "谓语");
  assert.equal(predicate.text, "had already been losing");
  assert.equal(guide.components.find(component => component.function === "宾语").text, "momentum");
  const after = guide.components.find(component => component.text.startsWith("after "));
  const rising = after.children.find(component => component.text.startsWith("rising "));
  for (const fragment of ["bewilderingly", "since 2003"]) {
    assert.equal(rising.children.find(component => component.text === fragment).modifies, "修饰 rising");
  }
  assert.equal(guide.components.find(component => component.text === "for a while").modifies, "修饰 had been losing");
  assert.match(guide.reading.questions[0].answer, /2008/);
  assert.match(guide.reading.questions[0].answer, /不说明.*结束/);
  assert.equal(guide.reading.timeline.length, 3);
  const s8 = sentences.find(sentence => sentence.id === "2010-p1-s8");
  assert.ok(s8.beginnerSyntax.clauses[0].text.endsWith("in a way matched by few other industries"));
  const s17 = sentences.find(sentence => sentence.id === "2010-p1-s17");
  assert.match(s17.trunk, /not a lack of demand but a lack of good work/);
  assert.deepEqual(syntaxGuide.buildBeginnerSyntaxGuide({
    ...s5, beginnerSyntax: undefined, layers: [{ label: "时间", text: "since 2003：上涨的起点。" }],
  }).clauses, [], "数据缺失时也不能在正式页面猜出从句");
});

test("2000 年全部复杂句的从句数量与人工审计基线一致", () => {
  const expected = {
    "cloze-s1": 1, "cloze-s3": 1, "cloze-s4": 1, "cloze-s6": 1,
    "p1-s1": 1, "p1-s2": 1, "p1-s4": 1, "p1-s5": 2, "p1-s13": 3,
    "p1-s16": 2, "p1-s20": 1, "p1-s24": 1, "p1-s25": 1,
    "14-prompt-analysis": 1, // Text1完整题目语言层：believe后的省略that宾语从句。
    "17-prompt-analysis": 1, // Text2第17题题干that宾语从句，because接口保留原题。
    "p2-s4": 1, "p2-s5": 2, "p2-s10": 1, "p2-s17": 1, "p2-s19": 1,
    "p2-s20": 1, "p2-s24": 1, "p2-s25": 1, "p2-s27": 2,
    "p3-s1": 4, "p3-s2": 3, "p3-s3": 2, "p3-s6": 1, "p3-s8": 1,
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
    "p4-q26-answer": 1, "p5-q27-prompt": 1, "p5-q27-answer": 1, "p5-q28-prompt": 1, "p5-q28-option-b": 1,
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
  assert.equal(Object.values(actual).reduce((sum, count) => sum + count, 0), 103, "旧98条加Text3的till、第14/17/27题题干与第28题B选项从句，共103条");
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
    if (question.format === "true-false") {
      assert.deepEqual(question.options, [{ key: "T", text: "True" }, { key: "F", text: "False" }], `第 ${question.id} 题必须保留原卷T/F选项`);
      assert.deepEqual(Object.keys(question.explanations).sort(), ["F", "T"], `第 ${question.id} 题必须只有两项真实判断理由`);
    } else if (question.format === "matching") {
      assert.deepEqual(question.options.map(option => option.key), ["A", "B", "C", "D", "E", "F", "G"], `第 ${question.id} 题必须保留七个真实匹配选项`);
      assert.deepEqual(Object.keys(question.explanations).sort(), ["A", "B", "C", "D", "E", "F", "G"], `第 ${question.id} 题必须解释全部七个选项`);
      const owner = allQuestions.find(candidate => candidate.id === question.sharedOptionsId);
      assert.equal(owner?.format, "matching", "共享选项的来源题必须存在");
      assert.deepEqual(question.options, owner.options, "共用选项不得在不同题目中改写");
    } else {
      assert.ok(question.format === undefined || question.format === "multiple-choice");
      assert.deepEqual(question.options.map((option) => option.key), ["A", "B", "C", "D"], `第 ${question.id} 题选项键错误`);
    }
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
  // 题干、选项同样是真题来源，不能把合法的题目语境误报为不存在的正文句。
  for (const article of Object.values(data.articleContents)) for (const question of article.questions) {
    const sources = [{ id: `question-${question.id}-prompt`, text: question.prompt }, ...question.options.map(option => ({ id: data.questionOptionSourceId(question, option.key), text: option.text }))];
    for (const source of sources) {
      if (sentenceById.has(source.id)) assert.equal(sentenceById.get(source.id).text, source.text, "共用选项来源必须一致");
      sentenceById.set(source.id, source);
      articleBySentence.set(source.id, article.id);
    }
  }

  for (const [sentenceId, wordContexts] of Object.entries(contextualVocabulary.sentenceWordContexts)) {
    const sentence = sentenceById.get(sentenceId);
    assert.ok(sentence, `语境词条指向不存在的句子：${sentenceId}`);
    const sourceTokens = sentence.text.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];

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
      const effectiveContext = contextualVocabulary.getSentenceWordContext(sentenceId, headword) ?? context;
      if (effectiveContext.contextualMeaning) assert.equal(actualGuide.contextualMeaning, effectiveContext.contextualMeaning);
      if (effectiveContext.use) assert.equal(actualGuide.use, effectiveContext.use);
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
  const articleBySentence = new Map(Object.values(data.articleContents).flatMap(article => article.sentences.map(sentence => [sentence.id, article])));
  for (const sentence of allSentences) {
    const lower = sentence.text.toLowerCase();
    for (const source of sentence.phrases) {
      assert.ok(lower.includes(source.toLowerCase()), `${sentence.id} 的词组不在原句中：${source}`);
      const article = articleBySentence.get(sentence.id);
      const phrase = knowledge.getPhraseKnowledge(source, article?.experienceVersion === 2 ? { articleId: article.id } : undefined);
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
  const tokens = [...new Set(analysisText.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [])];
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
  const v1Articles = Object.values(data.articleContents).filter(article => article.experienceVersion !== 2);
  const corpus = [
    ...v1Articles.flatMap(article => article.sentences.map(sentence => sentence.text)),
    ...v1Articles.flatMap(article => article.questions.flatMap(question => [question.prompt, ...question.options.map(option => option.text)])),
  ].join(" ");
  const tokens = [...new Set(corpus.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [])];

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
      assert.ok(article.translationTasks?.length, `${article.id} 必须有翻译任务`);
      const covered = article.translationTasks.flatMap(data.translationTaskSentences);
      assert.deepEqual(covered.map(sentence => sentence.id), article.sentences.map(sentence => sentence.id), `${article.id} 翻译任务须按顺序精确覆盖全部句子，不能重复或遗漏`);
      assert.equal(new Set(article.translationTasks.map(task => task.id)).size, article.translationTasks.length);
      for (const task of article.translationTasks) {
        for (const field of ["prompt", "source", "answer", "locating"]) requireText(task[field], `${article.id}.${task.id}.${field}`);
        assert.equal(task.sentenceId, data.translationTaskSentences(task)[0].id);
        if (task.format === "passage") {
          assert.ok(Number.isInteger(task.number) && task.number > 0);
          assert.ok(task.points > 0);
          assert.ok(task.paragraphs.length > 0 && task.paragraphs.every(paragraph => paragraph.length > 0));
          assert.equal(task.source, task.paragraphs.map(paragraph => paragraph.map(sentence => sentence.text).join(" ")).join("\n\n"));
        } else {
          assert.equal(task.source, task.analysis.text);
          requireSentenceAnalysis(task.analysis, `${article.id}.${task.id}.analysis`);
        }
      }
    } else if (article.kind === "writing") {
      assert.equal(article.questions.length, 0, `${article.id} 写作不得伪装成选择题`);
      assert.ok(article.writingTasks?.length, `${article.id} 必须有原题写作任务`);
      assert.deepEqual(article.writingTasks.flatMap(task => task.instructions.map(sentence => sentence.id)), article.sentences.map(sentence => sentence.id), `${article.id} 写作指令须完整、按顺序覆盖`);
      assert.equal(new Set(article.writingTasks.map(task => task.id)).size, article.writingTasks.length);
      for (const task of article.writingTasks) {
        assert.ok(Number.isInteger(task.id) && Number.isInteger(task.number) && task.number > 0);
        assert.ok(task.points > 0);
        assert.ok(["letter", "chart-essay"].includes(task.genre));
        assert.ok(["about", "at-least"].includes(task.wordLimit.mode));
        assert.ok(task.wordLimit.count > 0);
        for (const field of ["requirements", "checklist", "pitfalls"]) {
          assert.ok(task[field].length >= 3, `${article.id}.${field} 应有实质指导`);
          task[field].forEach((value, index) => requireText(value, `${article.id}.${field}.${index}`));
        }
        assert.ok(task.outline.length >= 3);
        for (const item of task.outline) for (const field of ["title", "content"]) requireText(item[field], `${article.id}.outline.${field}`);
        assert.ok(task.sample.english.length >= 3);
        assert.equal(task.sample.english.length, task.sample.chinese.length);
        assert.equal(task.sample.english.length, task.sample.notes.length);
        for (const field of ["english", "chinese", "notes"]) task.sample[field].forEach((value, index) => requireText(value, `${article.id}.sample.${field}.${index}`));
        assert.ok(task.languageTips.length >= 3);
        for (const tip of task.languageTips) for (const field of ["english", "chinese", "usage"]) requireText(tip[field], `${article.id}.languageTips.${field}`);
        if (task.genre === "chart-essay") {
          assert.ok(task.chart?.rows.length);
          for (const field of ["src", "alt", "note"]) requireText(task.chart[field], `${article.id}.chart.${field}`);
          if (task.chart.format === "table") {
            requireText(task.chart.caption, `${article.id}.chart.caption`);
            assert.ok(task.chart.columns.length >= 2);
            assert.equal(new Set(task.chart.columns).size, task.chart.columns.length);
            task.chart.columns.forEach((column, index) => requireText(column, `${article.id}.chart.columns.${index}`));
            assert.equal(new Set(task.chart.rows.map(row => row.label)).size, task.chart.rows.length);
            for (const row of task.chart.rows) {
              requireText(row.label, `${article.id}.chart.row.label`);
              assert.equal(row.values.length, task.chart.columns.length - 1, "数据格数量必须与表头匹配");
              row.values.forEach((value, index) => requireText(value, `${article.id}.chart.row.values.${index}`));
            }
          } else {
            assert.ok(task.chart.format === undefined || task.chart.format === "year-comparison");
            for (const row of task.chart.rows) for (const field of ["brand", "before", "after"]) requireText(row[field], `${article.id}.chart.row.${field}`);
          }
        }
      }
    } else {
      assert.ok(article.questions.length > 0, `${article.id} 缺少题目`);
    }
    article.sentences.forEach((sentence) => assert.ok(sentence.id.startsWith(`${article.id}-`), `${sentence.id} 未使用文章稳定前缀`));
    article.questions.forEach((question) => assert.ok(article.sentences.some((sentence) => sentence.id === question.sentenceId), `第 ${question.id} 题定位句不属于 ${article.id}`));
  }
});

test("2010英译汉保留第46题三段整篇及原卷标点、从句边界", () => {
  const article = data.articleContents["2010-translation"];
  assert.equal(article.questions.length, 0);
  assert.equal(article.translationTasks.length, 1);
  const [task] = article.translationTasks;
  assert.equal(task.id, 201046);
  assert.equal(task.number, 46);
  assert.equal(task.format, "passage");
  assert.equal(task.points, 15);
  assert.deepEqual(task.paragraphs.map(paragraph => paragraph.length), [2, 2, 6]);
  assert.equal(task.answer.split("\n\n").length, 3);
  assert.equal(createHash("sha256").update(normalizeText(task.source)).digest("hex"), "2c7abcd9c5095aa4fc33075de6c6b32f7396cb420269fd7c67dad1bc56984ec1");
  assert.deepEqual(article.sentences.map(sentence => sentence.number), Array.from({ length: 10 }, (_, index) => index + 1));
  assert.deepEqual(article.sentences.map(sentence => sentence.beginnerSyntax.clauses.length), [0, 1, 0, 0, 0, 2, 0, 1, 0, 0]);
  assert.match(article.sentences[1].beginnerSyntax.components[0].function, /主语/);
  assert.match(article.sentences[1].beginnerSyntax.components[0].form, /动名词完成式/);
  assert.match(article.sentences[3].text, /boom and burst/);
  assert.match(article.sentences[5].beginnerSyntax.clauses[1].type, /非限制性定语从句/);
  assert.match(article.sentences[7].grammar.join(" "), /过去反复/);
  assert.equal(article.sentences[6].text, '"I was miserable.');
  assert.ok(article.sentences[9].text.endsWith(".'\""));
  article.sentences.forEach(sentence => requireSentenceAnalysis(sentence, sentence.id));
  assert.deepEqual(data.translationTaskSentences(task), article.sentences);
});

test("2010英译汉逐词覆盖、跨句隔离、有效链接及全年索引", async () => {
  const article = data.articleContents["2010-translation"];
  const study = await vite.ssrLoadModule("/app/study-app.tsx");
  const imported = await vite.ssrLoadModule("/app/2010-translation-lexicon.ts");
  const [properNameNote] = knowledge.getSynonymDetails(imported.translation2010Lexicon.ning.examSynonyms);
  assert.equal(properNameNote.target, undefined, "专名的中文替换限制不是英文词条，不能生成空链接");
  assert.match(properNameNote.meaning, /专名/);
  const allTokens = article.sentences.flatMap(sentence => englishTokens(sentence.text));
  assert.equal(allTokens.length, 150);
  assert.equal(new Set(allTokens).size, 113);
  const words = study.buildYearWordItems(2010);
  const phrases = study.buildYearPhraseItems(2010);
  for (const sentence of article.sentences) {
    for (const token of englishTokens(sentence.text)) {
      const guide = lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: sentence.id });
      requireText(guide.contextualMeaning, `${sentence.id}.${token}.meaning`);
      requireText(guide.use, `${sentence.id}.${token}.use`);
      assert.ok(!guide.partOfSpeech.startsWith("word（"));
      assert.ok(guide.specialForms.length && guide.examSynonyms.length);
      const entry = study.resolveEntry(token, false, sentence.id);
      assert.equal(entry.headword, guide.headword);
      assert.equal(entry.contextualMeaning, guide.contextualMeaning);
      const contextualKnowledge = knowledge.getWordKnowledge(guide.headword, { articleId: article.id, sentenceId: sentence.id });
      if (imported.translation2010Lexicon[guide.headword]) {
        assert.equal(entry.grammarSummary, guide.use, "本篇核心句法不能沿用其他文章的具体用法");
        contextualKnowledge.structures.forEach(structure => requireStructure(structure, `${sentence.id}.${token}.syntax`));
      }
      assert.ok(words.find(word => word.headword === guide.headword)?.contexts.some(context => context.sentenceId === sentence.id));
    }
    for (const phrase of sentence.phrases) {
      const guide = knowledge.getPhraseKnowledge(phrase);
      assert.equal(guide.sourceExpression, phrase);
      requireText(guide.canonical, `${phrase}.canonical`);
      requireText(guide.grammarRole, `${phrase}.grammarRole`);
      guide.structures.forEach(structure => requireStructure(structure, phrase));
      assert.ok(phrases.some(item => item.canonical === guide.canonical));
    }
  }
  const guide = (token, number) => lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: `2010-translation-s${number}` });
  assert.match(guide("it", 2).contextualMeaning, /形式宾语/);
  assert.match(guide("It", 5).contextualMeaning, /开展/);
  assert.match(guide("It", 6).contextualMeaning, /决定/);
  assert.match(guide("it", 10).contextualMeaning, /发展/);
  assert.equal(study.resolveEntry("it", false, "2010-translation-s10").structures[0].pattern, "give it some time");
  assert.match(study.resolveEntry("it", false, "2010-translation-s2").structures[0].pattern, /make it clear/);
  assert.doesNotMatch(study.resolveEntry("it", false, "2010-translation-s10").grammarSummary, /has infected|病毒/);
  assert.match(guide("that", 2).contextualMeaning, /宾语/);
  assert.match(guide("that", 8).contextualMeaning, /结果/);
  assert.match(guide("translated", 6).contextualMeaning, /转化|表现/);
  assert.match(guide("Boulder", 4).contextualMeaning, /地名/);
  assert.equal(guide("selling", 3).headword, "sell");
  assert.equal(guide("sales", 6).headword, "sale");
  assert.equal(guide("unsustainability", 2).headword, "unsustainability");
  assert.notEqual(guide("it", 2).contextualMeaning, lexicon.getLexicalGuide("it", { articleId: "2010-p5", sentenceId: "2010-p5-s28" }).contextualMeaning);
  assert.equal(knowledge.getPhraseKnowledge("a lack of sales").key, knowledge.getPhraseKnowledge("a lack of demand").key);
  for (const [number, word, replacement] of [[3, "recall", ["recalls", "remembers"]], [7, "miserable", ["miserable", "very unhappy"]]]) {
    const substitution = guide(word, number).contextualSubstitutions[0];
    assert.equal(substitution.rewrittenSentence, article.sentences[number - 1].text.replace(...replacement));
    const target = lexicon.getLexicalGuide(substitution.target.slice(5), { articleId: article.id });
    requireText(target.contextualMeaning, `${substitution.target}.meaning`);
    requireText(target.use, `${substitution.target}.use`);
    assert.ok(!target.partOfSpeech.startsWith("word（"));
  }
  for (const [headword, entry] of Object.entries(imported.translation2010Lexicon)) {
    for (const collocation of entry.collocations) assert.ok(knowledge.getPhraseKnowledge(collocation), `${headword}.${collocation} 缺少中文搭配`);
    for (const detail of knowledge.getSynonymDetails(entry.examSynonyms)) {
      if (!detail.target?.startsWith("word:")) continue;
      const target = lexicon.getLexicalGuide(detail.target.slice(5), { articleId: article.id });
      requireText(target.contextualMeaning, `${headword}.${detail.target}.meaning`);
      requireText(target.use, `${headword}.${detail.target}.use`);
      assert.ok(!target.partOfSpeech.startsWith("word（"));
    }
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
  assert.match(guide("use", 11).partOfSpeech, /^n\./);
  assert.equal(guide("use", 11).contextualMeaning, "使用");
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

test("2010 Part B 原卷哈希、真实T/F与全部从句一致", () => {
  const article = data.articleContents["2010-p5"];
  const hash = text => createHash("sha256").update(normalizeText(text)).digest("hex");
  assert.equal(article.title, "Copying Birds May Save Aircraft Fuel");
  assert.equal(hash(article.sentences.map(sentence => sentence.text).join(" ")), "9b06d766d0665d36fbbec9a06e1b4b46a31bf430b90866788cb1caff2799b210");
  assert.equal(hash(article.questions.flatMap(question => [question.prompt, ...question.options.map(option => option.text)]).join(" ")), "5da9cfc2f0f9130dfbce3ae78e9d65cb933b5995e9bea0500104ef17bab93c21");
  assert.deepEqual(article.sentences.map(sentence => sentence.number), Array.from({ length: 28 }, (_, index) => index + 1));
  assert.deepEqual(article.questions.map(question => question.number), [41, 42, 43, 44, 45]);
  assert.deepEqual(article.sentences.map(sentence => sentence.beginnerSyntax.clauses.length), [0, 0, 1, 1, 1, 0, 0, 2, 1, 3, 1, 0, 0, 0, 0, 1, 0, 2, 2, 0, 2, 1, 1, 1, 1, 3, 1, 0]);
  for (const question of article.questions) {
    assert.equal(question.format, "true-false");
    assert.equal(question.answer, answerKeys.verifiedAnswerKey2010Passage5[question.number]);
    assert.deepEqual(question.options, [{ key: "T", text: "True" }, { key: "F", text: "False" }]);
    for (const option of question.options) assert.equal(data.questionExplanation(question, option.key), question.explanations[option.key]);
    assert.throws(() => data.questionExplanation(question, "A"), /Missing explanation/);
  }
  assert.ok(answerKeys.verifiedAnswerSources2010Passage5.some(source => source.url.includes("koolearn.com") && source.range.includes("F T F T F")));
  assert.match(article.sentences[8].beginnerSyntax.clauses[0].predicate, /省略are/);
  assert.equal(article.sentences[9].beginnerSyntax.clauses[1].predicate, "were to assemble / assume / change / proceed");
  assert.match(article.sentences[17].beginnerSyntax.clauses[0].type, /主语从句/);
  assert.deepEqual(article.sentences[22].beginnerSyntax.clauses[0].predicateDetails, [{ function: "省略的表语", text: "easier to reschedule" }]);
  assert.match(article.sentences[25].beginnerSyntax.clauses[0].type, /同位语/);
  const flattenComponents = components => components.flatMap(component => [component, ...flattenComponents(component.children ?? [])]);
  assert.equal(flattenComponents(article.sentences[26].beginnerSyntax.components).find(component => component.text === "lost over Berlin").modifies, "Lancaster");
  assert.match(article.questions[2].explanations.T, /因果|might/);
  assert.match(article.questions[4].explanations.T, /未经证实/);
  const reading = Object.values(data.articleContents).filter(item => item.year === 2010 && item.kind === "reading");
  assert.deepEqual(reading.map(item => item.id), ["2010-p1", "2010-p2", "2010-p3", "2010-p4", "2010-p5"]);
  assert.deepEqual(reading.flatMap(item => item.questions.map(question => question.number)), Array.from({ length: 25 }, (_, index) => index + 21));
});

test("2010 Part B 全词形、搭配、语境隔离与关联目标可用", async () => {
  const article = data.articleContents["2010-p5"];
  const imported = await vite.ssrLoadModule("/app/2010-passage-5-lexicon.ts");
  const { passage2010P5ReviewedContexts } = await vite.ssrLoadModule("/app/2010-passage-5-contexts.ts");
  const sources = [...article.sentences.map(sentence => ({ text: sentence.text, sentenceId: sentence.id })), ...article.questions.flatMap(question => [{ text: question.prompt, sourceId: `question-${question.id}-prompt` }, ...question.options.map(option => ({ text: option.text, sourceId: `question-${question.id}-option-${option.key}` }))])];
  const forms = new Set();
  for (const source of sources) for (const token of englishTokens(source.text)) {
    forms.add(token);
    const guide = lexicon.getLexicalGuide(token, { articleId: article.id, ...source });
    requireText(guide.contextualMeaning, `${token}.meaning`);
    requireText(guide.use, `${token}.use`);
    assert.ok(!guide.partOfSpeech.startsWith("word（"), `${token} 不得使用推测词性`);
  }
  assert.equal(forms.size, 318);
  for (const sentence of article.sentences) {
    const context = { articleId: article.id, sentenceId: sentence.id };
    const lemmas = englishTokens(sentence.text).map(token => lexicon.canonicalLemma(token, context));
    for (const [headword, entry] of Object.entries(imported.passage2010P5SentenceContexts[sentence.id])) {
      assert.ok(lemmas.includes(headword), `${sentence.id} 不包含语境词 ${headword}`);
      assert.equal(lexicon.getLexicalGuide(headword, context).use, passage2010P5ReviewedContexts[sentence.id]?.[headword]?.use ?? entry.use);
      for (const substitution of entry.contextualSubstitutions ?? []) {
        const target = lexicon.getLexicalGuide(substitution.target.slice(5), { articleId: article.id });
        requireText(target.contextualMeaning, `${substitution.target}.meaning`);
        requireText(target.use, `${substitution.target}.use`);
        assert.ok(!target.partOfSpeech.startsWith("word（"));
      }
    }
  }
  for (const entry of Object.values(imported.passage2010P5Lexicon)) {
    for (const detail of knowledge.getCollocationDetails(entry.collocations)) {
      requireText(detail.meaning, detail.label);
      assert.ok(knowledge.getPhraseKnowledge(detail.label), `${detail.label} 搭配必须可打开`);
    }
    for (const detail of knowledge.getSynonymDetails(entry.examSynonyms)) {
      assert.ok(detail.target?.startsWith("word:"));
      const guide = lexicon.getLexicalGuide(detail.target.slice(5), { articleId: article.id });
      requireText(guide.contextualMeaning, `${detail.target}.meaning`);
      requireText(guide.use, `${detail.target}.use`);
      assert.ok(!guide.partOfSpeech.startsWith("word（"));
    }
  }
  const guideAt = (token, number) => lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: `2010-p5-s${number}` });
  assert.match(guideAt("company", 15).contextualMeaning, /结伴/);
  assert.match(guideAt("peering", 17).contextualMeaning, /张望/);
  assert.match(lexicon.getLexicalGuide("peers", { articleId: "2010-p4" }).contextualMeaning, /同侪|同等/);
  assert.match(guideAt("wakes", 20).contextualMeaning, /尾流/);
  assert.match(guideAt("should", 28).use, /推断/);
  assert.notEqual(guideAt("seen", 19).contextualMeaning, guideAt("see", 17).contextualMeaning);
  assert.equal(lexicon.canonicalLemma("findings", { articleId: article.id }), "finding");
  assert.equal(lexicon.canonicalLemma("finding", { articleId: "2010-p3" }), "find");
  assert.equal(lexicon.canonicalLemma("including", { articleId: "2010-p4" }), "including");
  for (const [derived, base] of [["reduction", "reduce"], ["separation", "separate"], ["departure", "depart"], ["clearly", "clear"], ["flight", "fly"]]) {
    assert.equal(lexicon.canonicalLemma(derived, { articleId: article.id }), derived);
    assert.equal(lexicon.familyAliases[derived], base);
  }
  assert.equal(guideAt("peer", 17).contextualSubstitutions[0].rewrittenSentence, article.sentences[16].text.replace("peering", "looking"));
  assert.equal(guideAt("unsubstantiated", 26).contextualSubstitutions[0].rewrittenSentence, article.sentences[25].text.replace("unsubstantiated", "unconfirmed"));
  assert.equal(knowledge.getPhraseKnowledge("known as upwash").key, knowledge.getPhraseKnowledge("also known as (A) H1N1").key);
  assert.equal(knowledge.getPhraseKnowledge("one of the areas").key, "one-of-series");
});

test("2010 Text 4 原卷、五项原则、年份和答案精审一致", async () => {
  const article = data.articleContents["2010-p4"];
  const hash = text => createHash("sha256").update(normalizeText(text)).digest("hex");
  assert.equal(hash(article.sentences.map(sentence => sentence.text).join(" ")), "e936bf7ee17ac332ae5b49f1228e6a6eb2c5a868ce24ff4e07e41b8ea04f81dd");
  assert.equal(hash(article.questions.flatMap(question => [question.prompt, ...question.options.map(option => option.text)]).join(" ")), "d4933dc836a8f582f5aa31ff10d659d55348747c003efdf77efdf8add6ed8d0f");
  assert.deepEqual(article.questions.map(question => question.number), [36, 37, 38, 39, 40]);
  assert.deepEqual(article.sentences.map(sentence => sentence.beginnerSyntax.clauses.length), [6, 0, 0, 0, 0, 1, 0, 2, 1, 1, 0, 0, 1, 0]);
  for (const question of article.questions) assert.equal(question.answer, answerKeys.verifiedAnswerKey2010Passage4[question.number]);
  assert.equal(article.sentences[12].beginnerSyntax.clauses[0].predicate, "be");
  assert.equal(knowledge.getPhraseKnowledge("entitled to trial").key, knowledge.getPhraseKnowledge("was entitled to privacy").key);
  const entries = await vite.ssrLoadModule("/app/2010-passage-4-lexicon.ts");
  for (const sentence of article.sentences) for (const token of englishTokens(sentence.text)) {
    const guide = lexicon.getLexicalGuide(token, { articleId: article.id, sentenceId: sentence.id });
    requireText(guide.contextualMeaning, `${sentence.id}.${token}.meaning`);
    requireText(guide.use, `${sentence.id}.${token}.use`);
    assert.ok(!guide.partOfSpeech.startsWith("word（"));
  }
  for (const entry of Object.values(entries.passage2010P4Lexicon)) for (const detail of knowledge.getSynonymDetails(entry.examSynonyms)) {
    if (!detail.target?.startsWith("word:")) continue;
    const target = lexicon.getLexicalGuide(detail.target.slice(5), { articleId: article.id });
    requireText(target.contextualMeaning, `${detail.target}.meaning`);
    requireText(target.use, `${detail.target}.use`);
    assert.ok(!target.partOfSpeech.startsWith("word（"));
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
  assert.ok(article.sentences.every(sentence => sentence.beginnerSyntax.reading?.questions.length));
  assert.equal(new Set(article.sentences.map(sentence => sentence.beginnerSyntax.reading.focus)).size, 19);
  const evening = syntaxComponents(article.sentences[1].beginnerSyntax.components);
  assert.match(evening.find(component => component.text === "had been").form + evening.find(component => component.text === "had been").function, /系动词/);
  assert.equal(evening.find(component => component.text === "particularly").modifies, "talkative");
  assert.equal(evening.find(component => component.text === "frequently").modifies, "offering");
  assert.equal(evening.find(component => component.text === "silently").modifies, "sat");
  const research = article.sentences[14];
  assert.deepEqual(research.beginnerSyntax.clauses, [], "第15句分词、不定式和份额比较不得伪造成完整从句");
  const researchParts = syntaxComponents(research.beginnerSyntax.components);
  assert.ok(researchParts.some((component) => component.text === "having given up" && /完成|having \+ 过去分词/.test(component.explanation + component.form)));
  const examples = researchParts.find(component => component.text.startsWith("such as "));
  assert.equal(examples.children.length, 2, "两个大例子不能和清洁、做饭的内部举例平铺");
  assert.ok(syntaxComponents(examples.children[1].children).some(component => component.text.startsWith("like cleaning") && component.modifies === "work"));
  assert.match(research.trunk, /not/);
  const finding = article.sentences[17];
  assert.ok(finding.beginnerSyntax.clauses.some((clause) => clause.text === "as Hacker observed years before" && /非限制性定语从句/.test(clause.type)));
  const ending = article.sentences[18];
  const endingParts = syntaxComponents(ending.beginnerSyntax.components);
  const withPhrase = endingParts.find(component => component.text === "with a newspaper held up in front of his face");
  assert.ok(withPhrase.children.some(component => component.text === "held up" && component.function === "宾语补足语" && component.modifies === "a newspaper"));
  assert.ok(!ending.beginnerSyntax.clauses.some((clause) => clause.text.startsWith("with ")));
  assert.ok(endingParts.some((component) => component.text === "wanting to talk" && /woman/.test(component.modifies)));
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
    const sourceTokens = sentence.text.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];
    for (const [headword, context] of Object.entries(contextualVocabulary.sentenceWordContexts[sentence.id])) {
      assert.ok(sourceTokens.some((token) => lexicon.canonicalLemma(token) === headword), `${sentence.id} 中不存在语境词 ${headword}`);
      requireText(context.contextualMeaning, `${sentence.id}.${headword}.meaning`);
      requireText(context.use, `${sentence.id}.${headword}.use`);
      const guide = guideFor(headword, sentence.number);
      assert.equal(guide.contextualMeaning, context.contextualMeaning);
      assert.equal(guide.use, context.use);
    }
  }
  assert.equal(guideFor("room", 1).contextualMeaning, "房间；室");
  assert.match(guideFor("room", 1).use, /living room/);
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
  assert.equal(guideFor("work", 15).contextualMeaning, "工作；事务");
  assert.match(guideFor("work", 15).use, /生活|家务/);
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
    if (sourceId === "question-201027-prompt") {
      assert.equal(entry.grammarRole, "第三人称单数谓语");
      assert.match(entry.grammarSummary, /the phrase/);
      assert.equal(entry.structures[0].pattern, "an expression means + meaning");
    } else {
      assert.equal(entry.grammarRole, "第三人称单数谓语；本句后接宾语内容从句");
      assert.match(entry.grammarSummary, /宾语/);
    }
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
        const tokens = text.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [];
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
