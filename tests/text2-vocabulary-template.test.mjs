import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { resolveEntry, buildYearPhraseItems, currentCounts } = await vite.ssrLoadModule("/app/study-app.tsx");
const { getWordKnowledge, getPhraseKnowledge } = await vite.ssrLoadModule("/app/knowledge-base.ts");
const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
const { canonicalLemma } = await vite.ssrLoadModule("/app/lexicon.ts");
const { passage2010P2SourceWordKnowledge } = await vite.ssrLoadModule("/app/2010-passage-2-word-knowledge.ts");
const card = (word, sourceId) => resolveEntry(word, false, sourceId);

test("Text2词卡结构按当前指代、介词关系与非谓语形式读取，不沿用旧篇例句", () => {
  assert.match(card("It's", "2010-p2-s7").grammarSummary, /妻子才是家中话多者/);
  assert.match(card("it", "2010-p2-s19").grammarSummary, /newspaper/);
  assert.doesNotMatch(card("it", "2010-p2-s19").grammarSummary, /has infected|病毒/);
  assert.equal(card("with", "2010-p2-s11").structures[0].pattern, "wreak havoc with something");
  assert.equal(card("with", "2010-p2-s19").structures[0].pattern, "with + noun + past participle");
  assert.match(card("as", "2010-p2-s13").structures[0].pattern, /give A as/);
  assert.equal(card("as", "2010-p2-s15").structures[0].pattern, "such as + examples");
  assert.match(card("as", "2010-p2-s18").grammarSummary, /observed 的宾语/);
  assert.doesNotMatch(card("as", "2010-p2-s18").grammarSummary, /auctioneer|called out bids/);
});

test("Text2数量词不串成双分句比较、only if 或复合形容词", () => {
  assert.equal(card("more", "2010-p2-s10").structures[0].pattern, "talk more than women");
  assert.equal(card("more", "2010-p2-s15").structures[0].pattern, "far more than their share");
  assert.equal(card("far", "2010-p2-s15").structures[0].pattern, "far + comparative");
  assert.equal(card("only", "2010-p2-s13").structures[0].pattern, "only a few of the men");
  assert.equal(card("few", "2010-p2-s13").structures[0].pattern, "a few of the men");
  assert.equal(card("few", "2010-p2-s18").structures[0].pattern, "few + plural noun");
  assert.equal(card("social", "2010-p2-s15").structures[0].meaning, "社交活动的安排");
});

test("Text2题目词卡采用25个真实来源，疑问词、比较词和介词结构不借正文定位句", () => {
  const what = card("What", "question-201026-prompt");
  assert.match(what.grammarRole, /疑问表语/);
  assert.doesNotMatch(what.grammarSummary, /What makes|合格研究论文/);
  const which = card("Which", "question-201029-prompt");
  assert.match(which.grammarRole, /疑问代词作主语/);
  assert.doesNotMatch(which.grammarSummary, /FluMist/);
  assert.equal(card("between", "question-201028-option-C").structures[0].pattern, "between + plural noun");
  assert.equal(card("between", "question-201029-option-D").structures[0].pattern, "between A and B");
  assert.equal(card("more", "question-201028-option-D").structures[0].pattern, "more + adjective + than ...");
  assert.equal(card("more", "question-201029-option-A").structures[0].pattern, "more + uncountable noun");
  assert.equal(card("for", "question-201030-option-C").structures[0].pattern, "reasons for + event / state");
  assert.equal(card("to", "question-201030-option-D").structures[0].pattern, "an introduction to somebody");
  assert.equal(card("Sharing", "question-201026-option-D").structures[0].pattern, "share housework");
  assert.equal(card("Talk", "question-201030-option-A").structures[0].pattern, "the book Divorce Talk");
  const explicitSource = getWordKnowledge("what", { articleId: "2010-p2", sourceId: "question-201026-prompt", sentenceId: "2010-p2-s18" });
  assert.equal(explicitSource.grammarRole, what.grammarRole);
});

test("Text2来源知识必须能对应原文词形，且词卡实际选择同一条解释", () => {
  const article = articleContents["2010-p2"];
  const sources = new Map([
    ...article.sentences.map(sentence => [sentence.id, sentence.text]),
    ...article.questions.flatMap(question => [[`question-${question.id}-prompt`, question.prompt], ...question.options.map(option => [`question-${question.id}-option-${option.key}`, option.text])]),
  ]);
  for (const [sourceId, terms] of Object.entries(passage2010P2SourceWordKnowledge)) {
    const source = sources.get(sourceId);
    assert.ok(source, `${sourceId}必须是真实正文或题目来源`);
    const tokens = source.match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/gi) ?? [];
    for (const [headword, entry] of Object.entries(terms)) {
      const token = tokens.find(word => canonicalLemma(word, { articleId: "2010-p2", sourceId }) === headword);
      assert.ok(token, `${sourceId}原文没有${headword}这一词位`);
      assert.equal(card(token, sourceId).grammarSummary, entry.grammarSummary, `${sourceId}/${headword}未接入实际词卡`);
      assert.ok(entry.structures[0].pattern && entry.structures[0].meaning && entry.structures[0].rule);
    }
  }
});

test("Text2专属接入保留其他篇结构，新增搭配有中文和规范式", () => {
  assert.match(card("as", "2010-p1-s4").grammarSummary, /auctioneer|called out bids/);
  assert.equal(card("it", "2010-translation-s10").structures[0].pattern, "give it some time");
  for (const label of ["judging from the context", "the phrase means", "in public", "sharing housework", "Divorce Talk", "more research"]) {
    const entry = getPhraseKnowledge(label);
    assert.ok(entry?.canonical && entry?.meaning && entry?.structures[0].rule, label);
    assert.match(entry.meaning, /[\u4e00-\u9fff]/);
  }
});

test("Text2题干选项的真实词组进入年度索引，规范结构不写回原文", () => {
  const article = articleContents["2010-p2"];
  for (const question of article.questions) {
    const analyses = [question.analysis.prompt, ...Object.values(question.analysis.options)];
    for (const analysis of analyses) {
      for (const phrase of analysis.phrases) {
        assert.ok(analysis.text.includes(phrase), `${analysis.id}/${phrase}不是原文连续片段`);
        assert.ok(getPhraseKnowledge(phrase)?.structures.length, `${analysis.id}/${phrase}缺少规范结构`);
      }
    }
  }
  const items = buildYearPhraseItems(2010);
  for (const [expression, sourceId] of [
    ["Judging from the context", "question-201027-prompt"],
    ["exerting influence", "question-201027-option-B"],
    ["attach much importance to communication", "question-201028-option-C"],
    ["stems from sex inequalities", "question-201029-option-B"],
    ["immediately after this text", "question-201030-prompt"],
    ["a brief introduction to the political scientist Andrew Hacker", "question-201030-option-D"],
  ]) {
    const entry = items.find(item => item.source === expression);
    assert.ok(entry, `${expression}未进入2010年度词组索引`);
    assert.equal(entry.sentenceId, sourceId);
    assert.equal(entry.count, 1);
  }
  assert.equal(getPhraseKnowledge("between couples").canonical, "between + plural noun");
  assert.equal(getPhraseKnowledge("between man and wife").canonical, "between A and B");
  assert.equal(getPhraseKnowledge("tends to be more talkative").key, getPhraseKnowledge("tend to talk").key);
  assert.equal(currentCounts("Sharing housework", true, "question-201026-option-D").form, 1, "双入口标注不能重复计数");
});
