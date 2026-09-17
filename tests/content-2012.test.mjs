
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const data = await vite.ssrLoadModule("/app/data.ts");
const lexicon = await vite.ssrLoadModule("/app/lexicon.ts");
const knowledge = await vite.ssrLoadModule("/app/knowledge-base.ts");
const contexts = await vite.ssrLoadModule("/app/contextual-vocabulary.ts");
const answers = await vite.ssrLoadModule("/app/verified-answer-keys.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const normalize = text => text.replace(/\s+/g, " ").replace(/\s+([,.;?!])/g, "$1").trim();
const tokens = text => text.match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)*(?:['’][a-z]+)?/gi) ?? [];
const articles = Object.values(data.articleContents).filter(article => article.year === 2012);
const sourceHash = "b91cfe8e6a3eb63b02fc6573514e34a67937bf8160a5712ce640315e2da306f9";

test("2012PartB原卷共享七选项与人物观点准确", () => {
  const article = data.articleContents["2012-p5"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-p5.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.sentences.length, 28);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.questions.length, 5);
  article.questions.forEach((question, index) => {
    assert.equal(question.id, 201241 + index);
    assert.equal(question.number, 41 + index);
    assert.equal(question.format, "matching");
    assert.equal(question.sharedOptionsId, 201241);
    assert.equal(question.prompt, fixture.questions[index].text.replace(/^\d+\.\s*/, ""));
    assert.equal(question.answer, answers.verifiedAnswerKey2012Passage5[41 + index]);
    assert.deepEqual(question.options.map(option => option.text), fixture.options.map(row => row.text.replace(/^\[\s*[A-G]\s*\]\s*/, "")));
    assert.deepEqual(Object.keys(question.explanations), [..."ABCDEFG"]);
    assert.equal(data.questionOptionSourceId(question, "F"), "question-201241-option-F");
  });
  assert.equal(article.sentences[13].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[19].beginnerSyntax.clauses[0].marker, "who");
  assert.match(article.sentences[17].natural, /并不是所有/);
  assert.match(article.sentences[25].natural, /并存/);
  assert.match(article.questions[1].explanations.F, /必要/);
  assert.match(article.questions[1].explanations.D, /错配/);
  for (const [token, number, meaning] of [["fortune", 8, /命运/], ["patient", 14, /耐心/], ["power", 22, /权力/], ["held", 15, /榜样/], ["downstairs", 28, /下层/], ["appreciation", 24, /理解/], ["Smiles", 13, /斯迈尔斯/]]) assert.match(study.resolveEntry(token, false, "2012-p5-s" + number).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("lives", { articleId: "2012-p5" }), "life");
  assert.equal(lexicon.canonicalLemma("writing", { articleId: "2012-p5" }), "writing");
});

test("2012翻译两段六句完整保留、分母与原文瑕疵明确", () => {
  const article = data.articleContents["2012-translation"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-translation.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.sentences.length, 6);
  assert.equal(article.questions.length, 0);
  assert.equal(article.translationTasks.length, 1);
  const task = article.translationTasks[0];
  assert.equal(task.id, 201246);
  assert.equal(task.number, 46);
  assert.equal(task.format, "passage");
  assert.equal(task.points, 15);
  assert.deepEqual(task.paragraphs.map(paragraph => paragraph.length), [2, 4]);
  assert.deepEqual(task.source.split("\n\n").map(normalize), fixture.paragraphs.map(row => normalize(row.text)));
  assert.match(task.source, /their best and brightest departure/);
  assert.match(task.locating, /非标准连接/);
  assert.match(article.sentences[3].natural, /近40%.*约占3.3%/);
  assert.match(article.sentences[5].natural, /原本可以/);
  assert.equal(article.sentences[1].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[5].beginnerSyntax.clauses.length, 2);
  for (const [token, number, meaning] of [["privilege", 2, /优待/], ["emigrants", 4, /移居国外/], ["around", 4, /大约/], ["long", 5, /长期/], ["depriving", 6, /失去/], ["could", 6, /本来/]]) assert.match(study.resolveEntry(token, false, "2012-translation-s" + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("privilege", false, "2012-translation-s2").partOfSpeech, /v/);
});

test("2012投诉邮件保留原指令与两任务，不将范文计入真题", () => {
  const article = data.articleContents["2012-writing-a"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-writing-a.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.kind, "writing");
  assert.equal(article.sentences.length, 6);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.questions.length, 0);
  assert.equal(article.writingTasks.length, 1);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201247);
  assert.equal(task.number, 47);
  assert.equal(task.points, 10);
  assert.deepEqual(task.wordLimit, { mode: "about", count: 100 });
  assert.equal(task.genre, "letter");
  assert.equal(task.chart, undefined);
  assert.deepEqual(task.instructions, article.sentences);
  assert.match(task.sample.english.at(-1), /Zhang Wei$/);
  assert.equal(task.sample.english.length, task.sample.chinese.length);
  assert.equal(task.sample.english.length, task.sample.notes.length);
  assert.match(task.sample.english.join(" "), /electronic dictionary.*online store/);
  assert.match(task.sample.english.join(" "), /replace.*refund/);
  assert.ok(task.sample.notes.some(note => /自行补充/.test(note)));
  assert.ok(task.requirements.some(rule => /不写.*地址/.test(rule)));
  assert.ok(!data.allSentences.some(sentence => sentence.text.includes(task.sample.english[1])));
  for (const [token, number, meaning] of [["prompt", 2, /及时/], ["complaint", 2, /投诉/], ["address", 6, /地址/], ["points", 6, /分/]]) assert.match(study.resolveEntry(token, false, "2012-writing-a-s" + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("prompt", false, "2012-writing-a-s2").partOfSpeech, /adj/);
  assert.equal(knowledge.getPhraseKnowledge("at the end of the letter").key, "2010-p1-at-the-end-of");
});

test("2012满意度作文保留九格数据与原图，不套用年份轴", () => {
  const article = data.articleContents["2012-writing-b"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-writing-b.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.kind, "writing");
  assert.equal(article.sentences.length, 4);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.questions.length, 0);
  assert.equal(article.writingTasks.length, 1);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201248);
  assert.equal(task.number, 48);
  assert.equal(task.points, 15);
  assert.deepEqual(task.wordLimit, { mode: "at-least", count: 150 });
  assert.equal(task.genre, "chart-essay");
  assert.deepEqual(task.instructions, article.sentences);
  assert.equal(task.chart.format, "table");
  assert.deepEqual(task.chart.columns, fixture.columns);
  assert.deepEqual(task.chart.rows, fixture.rows);
  assert.equal(task.chart.width, fixture.image.width);
  assert.equal(task.chart.height, fixture.image.height);
  assert.equal(createHash("sha256").update(readFileSync(new URL("../" + fixture.image.path, import.meta.url))).digest("hex"), fixture.image.sha256);
  for (const row of task.chart.rows) {
    assert.equal(row.values.length, task.chart.columns.length - 1);
    assert.ok(Math.abs(row.values.reduce((total, value) => total + parseFloat(value), 0) - 100) < 0.0001);
    for (const value of row.values) assert.ok(task.sample.english[0].includes(value.replace("%", "")));
  }
  assert.ok(study.writingWordCount(task.sample.english.join(" ")) >= 150);
  assert.equal(task.sample.english.length, task.sample.chinese.length);
  assert.equal(task.sample.english.length, task.sample.notes.length);
  assert.match(task.sample.english[0], /40 or below/);
  assert.match(task.sample.english[0], /over 50/);
  assert.match(task.sample.english[1], /might/);
  assert.ok(!data.allSentences.some(sentence => sentence.text.includes(task.sample.english[0])));
  assert.match(study.resolveEntry("table", false, "2012-writing-b-s1").contextualMeaning, /统计表|表格/);
  assert.equal(lexicon.canonicalLemma("writing", { articleId: article.id }), "writing");
  assert.equal(knowledge.getPhraseKnowledge("based on the following table").key, "based-on");
  assert.equal(knowledge.getPhraseKnowledge("at least 150 words").key, "p5-collocation-at-least");
});

test("2012已核验九模块完整索引且Text2按原卷异文保留", () => {
  assert.deepEqual(articles.map(article => article.id), ["2012-cloze", "2012-p1", "2012-p2", "2012-p3", "2012-p4", "2012-p5", "2012-translation", "2012-writing-a", "2012-writing-b"]);
  assert.equal(articles.reduce((count, article) => count + article.sentences.length, 0), 138);
  assert.equal(articles.reduce((count, article) => count + article.questions.length, 0), 45);
  const tasks = articles.flatMap(article => [...article.questions, ...(article.translationTasks ?? []), ...(article.writingTasks ?? [])]);
  const expected = Array.from({ length: 48 }, (_, index) => index + 1);
  assert.deepEqual(tasks.map(task => task.number), expected);
  assert.equal(new Set(tasks.map(task => task.id)).size, 48);
});

function checkReadingSource(id, startNumber, sentenceCount, key) {
  const article = data.articleContents[id];
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/' + id + '.json', import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(article.sentences.length, sentenceCount);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.questions.length, 5);
  article.questions.forEach((question, index) => {
    assert.equal(question.id, 201200 + startNumber + index);
    assert.equal(question.number, startNumber + index);
    assert.equal(question.answer, key[question.number]);
    assert.equal(question.prompt, fixture.questions[index * 5].text.replace(/^\d+\.\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), fixture.questions.slice(index * 5 + 1, index * 5 + 5).map(row => row.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
    assert.deepEqual(Object.keys(question.explanations), ["A", "B", "C", "D"]);
  });
}

test("2012Text1原卷、政策限定与嵌套从句准确", () => {
  checkReadingSource("2012-p1", 21, 18, answers.verifiedAnswerKey2012Passage1);
  const article = data.articleContents["2012-p1"];
  assert.equal(article.sentences[2].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[6].beginnerSyntax.clauses.length, 3);
  assert.equal(article.sentences[15].beginnerSyntax.clauses.length, 4);
  assert.match(article.questions[2].explanations.C, /泛化|范围/);
  assert.match(article.sentences[13].natural, /如果/);
  assert.match(article.sentences[14].natural, /若/);
  for (const [token, number, meaning] of [["address", 4, /处理/], ["pass", 7, /放过/], ["well", 10, /表现|好/], ["works", 12, /奏效/], ["matters", 15, /重要/], ["matter", 17, /这件事/], ["right", 18, /正确|妥当/]]) assert.match(study.resolveEntry(token, false, '2012-p1-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("questioned", false, "question-201213-option-D").partOfSpeech, /v/);
  assert.match(study.resolveEntry("questions", false, "2012-p1-s13").partOfSpeech, /n/);
  assert.match(study.resolveEntry("articles", false, "2012-cloze-s5").contextualMeaning, /物品/);
});

test("2012Text2原卷异文、营销论证与答案字母准确", () => {
  checkReadingSource("2012-p2", 26, 18, answers.verifiedAnswerKey2012Passage2);
  const article = data.articleContents["2012-p2"];
  assert.match(article.sentences[2].text, /between girls as not only innocent/);
  assert.match(article.sentences[2].logic, /原卷搭配异常/);
  assert.equal(article.sentences[9].beginnerSyntax.clauses.length, 4);
  assert.match(article.sentences[9].natural, /直到.*才/);
  assert.match(article.questions[3].explanations.A, /细分/);
  assert.match(article.questions[4].explanations.C, /逐利/);
  for (const [token, number, meaning] of [["singular", 4, /异常突出|极其/], ["considered", 8, /被认为/], ["own", 10, /自身应有/], ["dictated", 11, /强力左右/], ["Take", 12, /以.*例/], ["wear", 15, /服装/], ["magnify", 18, /夸大|强化/]]) assert.match(study.resolveEntry(token, false, `2012-p2-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("women", { articleId: "2012-p2" }), "woman");
  assert.equal(lexicon.canonicalLemma("businessmen", { articleId: "2012-p2" }), "businessman");
  assert.ok(answers.verifiedAnswerSources2012Passage2.some(source => source.url.includes("hrbeu.edu.cn")));
});

test("2012Text3保留历史时点、三个论点与倒装比较", () => {
  checkReadingSource("2012-p3", 31, 24, answers.verifiedAnswerKey2012Passage3);
  const article = data.articleContents["2012-p3"];
  assert.equal(article.sentences[13].beginnerSyntax.clauses.length, 3);
  assert.match(article.sentences[13].natural, /一样.*自然产物/);
  assert.match(article.sentences[15].natural, /会不会/);
  assert.match(article.questions[1].explanations.B, /不表示所有人工产品/);
  assert.equal(lexicon.canonicalLemma("ruling", { articleId: "2012-p3", sentenceId: "2012-p3-s7" }), "rule");
  assert.equal(lexicon.canonicalLemma("ruling", { articleId: "2012-p3", sentenceId: "2012-p3-s8" }), "ruling");
  assert.equal(lexicon.canonicalLemma("meeting", { articleId: "2012-p3" }), "meeting");
  for (const [token, number, meaning] of [["brief", 14, /法律|诉讼/], ["suit", 22, /诉讼/], ["term", 22, /审期|开庭/], ["hear", 22, /审理/], ["coach", 23, /培训/], ["landscape", 23, /形势|格局/], ["packed", 24, /挤满/], ["hold", 7, /持有/], ["held", 23, /举办/]]) assert.match(study.resolveEntry(token, false, '2012-p3-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("means", false, "question-201234-prompt").partOfSpeech, /v/);
  assert.match(study.resolveEntry("means", false, "question-201220-option-B").partOfSpeech, /n/);
});

test("2012Text4部分否定、虚拟参照和程度比较保留", () => {
  checkReadingSource("2012-p4", 36, 18, answers.verifiedAnswerKey2012Passage4);
  const article = data.articleContents["2012-p4"];
  assert.equal(article.sentences[12].beginnerSyntax.clauses.length, 4);
  assert.match(article.sentences[12].natural, /并不.*所有人/);
  assert.match(article.sentences[12].beginnerSyntax.clauses[2].type, /虚拟/);
  assert.match(article.sentences[17].natural, /越久.*越深/);
  assert.match(article.questions[3].explanations.B, /反事实/);
  assert.match(article.questions[4].explanations.D, /确定存在/);
  for (const [token, number, meaning] of [["respects", 6, /方面/], ["rights", 9, /权利/], ["does", 10, /代替/], ["divides", 12, /分野|鸿沟/], ["fairly", 13, /相当|较为/], ["lean", 15, /艰难|拮据/], ["fabric", 17, /结构/]]) assert.match(study.resolveEntry(token, false, '2012-p4-s' + number).contextualMeaning, meaning);
  assert.match(study.resolveEntry("right", false, "2012-p1-s18").partOfSpeech, /adv/);
  assert.equal(lexicon.canonicalLemma("spending", { articleId: "2012-p4" }), "spending");
});

test("2012每篇真实来源词卡、从句边界与年度出处有效", () => {
  assert.ok(articles.length > 0);
  for (const article of articles) {
    const sources = [...article.sentences.map(sentence => [sentence.id, sentence.text]), ...article.questions.flatMap(question => [[`question-${question.id}-prompt`, question.prompt], ...question.options.map(option => [data.questionOptionSourceId(question, option.key), option.text])])];
    for (const [sourceId, text] of sources) for (const token of tokens(text)) {
      const entry = study.resolveEntry(token, false, sourceId);
      for (const field of ["contextualMeaning", "partOfSpeech", "use"]) {
        assert.ok(entry[field]?.trim(), `${sourceId}/${token}/${field}`);
        assert.doesNotMatch(entry[field], /待精审|暂无|该词未出现在|需结合来源|后续补充/, `${sourceId}/${token}/${field}`);
      }
    }
    for (const sentence of article.sentences) {
      assert.equal(sentence.chunks.map(chunk => chunk.text).join(""), sentence.text);
      assert.ok(sentence.beginnerSyntax?.components.length);
      let cursor = 0;
      const trunk = tokens(sentence.trunk).map(token => token.toLowerCase());
      for (const token of tokens(sentence.text)) if (token.toLowerCase() === trunk[cursor]) cursor += 1;
      assert.equal(cursor, trunk.length, `${sentence.id}主干只能按原文顺序删减`);
      for (const component of sentence.beginnerSyntax.components) {
        assert.ok(sentence.text.includes(component.text), `${sentence.id}/${component.text}`);
        for (const field of ["form", "function", "modifies", "explanation"]) assert.ok(component[field]?.trim());
      }
      for (const clause of sentence.beginnerSyntax.clauses) {
        assert.ok(sentence.text.includes(clause.text), `${sentence.id}/${clause.text}`);
        for (const field of ["type", "marker", "role", "subject", "predicate", "translationOrder"]) assert.ok(clause[field]?.trim());
      }
      for (const phrase of sentence.phrases) {
        assert.ok(sentence.text.includes(phrase), `${sentence.id}/${phrase}`);
        const guide = knowledge.getPhraseKnowledge(phrase);
        assert.ok(guide?.structures.length, `${sentence.id}/${phrase}`);
        assert.ok(guide.meaning?.trim());
      }
      for (const token of tokens(sentence.text)) {
        const lemma = lexicon.canonicalLemma(token, { articleId: article.id, sentenceId: sentence.id });
        const context = contexts.getSentenceWordContext(sentence.id, lemma);
        for (const replacement of context?.contextualSubstitutions ?? []) {
          assert.ok(replacement.rewrittenSentence && replacement.nuance && replacement.chinese);
          const [kind, ...target] = replacement.target.split(":");
          const entry = study.resolveEntry(target.join(":"), kind === "phrase");
          assert.doesNotMatch(entry.contextualMeaning, /该词未出现在|暂无|待精审/);
        }
      }
    }
  }
  for (const word of study.buildYearWordItems(2012)) for (const context of word.contexts) {
    assert.ok(context.meaning?.trim());
    assert.equal(context.meaning, study.resolveEntry(context.sourceForm, false, context.sentenceId).contextualMeaning);
  }
});

test("2012完形逐字保留三段、16句、20题80选项及答案依据", () => {
  const article = data.articleContents["2012-cloze"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2012-cloze.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, sourceHash);
  assert.equal(fixture.paragraphs.length, 3);
  assert.equal(article.sentences.length, 16);
  assert.equal(article.questions.length, 20);
  const key = answers.verifiedAnswerKey2012Cloze;
  const restored = fixture.paragraphs.map(row => row.text.replace(/__(\d+)__/g, (_, number) => fixture.options[(Number(number) - 1) * 5 + 1 + "ABCD".indexOf(key[number])].text.replace(/^\[\s*[A-D]\s*\]\s*/, ""))).join(" ");
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(restored));
  assert.equal(normalize(article.sentences.map(sentence => sentence.testText ?? sentence.text).join(" ")).replace(/___\((\d+)\)/g, "__$1__"), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  for (const question of article.questions) {
    assert.equal(question.id, 201200 + question.number);
    assert.equal(question.answer, key[question.number]);
    assert.deepEqual(question.options.map(option => option.text), fixture.options.slice((question.number - 1) * 5 + 1, question.number * 5).map(row => row.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
  }
  assert.equal(key[7], "C");
  assert.match(article.questions[6].explanations.B, /可以成立|可成立/);
  assert.match(article.sentences[8].logic, /历史/);
  assert.equal(article.sentences[1].beginnerSyntax.clauses.length, 6);
  assert.equal(article.sentences[12].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[5].trunk, "And Joe?");
  assert.ok(answers.verifiedAnswerSources2012Cloze.some(source => source.url.includes("hrbeu.edu.cn")));
});

test("2012完形熟词义、分词与专名按实际出处隔离", () => {
  for (const [token, number, meaning] of [["articles", 5, /物品/], ["Issue", 5, /配发/], ["bore", 2, /承担|承受/], ["well", 3, /好|充分/], ["president", 9, /总统/], ["covering", 13, /报道/], ["writing", 13, /写作|报道/], ["Bill", 14, /比尔/], ["point", 16, /时刻/]]) assert.match(study.resolveEntry(token, false, `2012-cloze-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("meaning", { articleId: "2012-cloze", sourceId: "question-201207-option-B" }), "mean");
  assert.equal(lexicon.canonicalLemma("exhaustion", { articleId: "2012-cloze" }), "exhaustion");
  assert.equal(lexicon.canonicalLemma("distinguished", { articleId: "2012-cloze" }), "distinguished");
assert.equal(lexicon.canonicalLemma("writing", { articleId: "2011-writing-a" }), "write");
  assert.equal(lexicon.canonicalLemma("best"), "best");
  assert.ok(study.resolveEntry("articles", false, "2012-cloze-s5").otherMeanings.some(meaning => /文章/.test(meaning)));
});
