import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const data = await vite.ssrLoadModule("/app/data.ts");
const lexicon = await vite.ssrLoadModule("/app/lexicon.ts");
const knowledge = await vite.ssrLoadModule("/app/knowledge-base.ts");
const answers = await vite.ssrLoadModule("/app/verified-answer-keys.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const normalize = value => value.replace(/\s+/g, " ").replace(/\s+([,.;?!])/g, "$1").trim();
const cloze = data.articleContents["2011-cloze"];

test("2011图表作文48保留四句原题、原图字节、近似精度与最低字数", () => {
  const article = data.articleContents["2011-writing-b"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-writing-b.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.equal(article.kind, "writing");
  assert.equal(article.sentences.length, 4);
  assert.equal(article.questions.length, 0);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.writingTasks.length, 1);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201148);
  assert.equal(task.number, 48);
  assert.equal(task.genre, "chart-essay");
  assert.equal(task.points, 15);
  assert.deepEqual(task.wordLimit, { mode: "at-least", count: 150 });
  assert.deepEqual(task.instructions, article.sentences);
  assert.equal(task.chart.src, fixture.image.path);
  const image = readFileSync(new URL(`../public${task.chart.src}`, import.meta.url));
  assert.equal(createHash("sha256").update(image).digest("hex"), fixture.image.sha256);
  assert.match(task.chart.note, /遮挡/);
  assert.match(task.chart.note, /近似值/);
  assert.match(task.chart.alt, /部分品牌/);
  assert.deepEqual(task.chart.rows, [{ brand: "国产品牌", before: "略高于25%", after: "略高于30%" }, { brand: "日系品牌", before: "接近35%", after: "略高于25%" }, { brand: "美系品牌", before: "约10%", after: "约10%" }]);
  const sample = task.sample.english.join(" ");
  assert.ok(study.writingWordCount(sample) >= 150);
  assert.equal(task.sample.english.length, 3);
  assert.equal(task.sample.chinese.length, 3);
  assert.equal(task.sample.notes.length, 3);
  assert.match(sample, /market shares/);
  assert.match(sample, /possible explanation/);
  assert.match(sample, /might/);
  assert.match(sample, /chart alone does not explain/);
  assert.doesNotMatch(sample, /Dear|Yours|Zhang Wei|Li Ming/);
  assert.ok(task.pitfalls.some(item => /绝对销量/.test(item)));
  assert.ok(task.pitfalls.some(item => /100%/.test(item)));
  assert.ok(!data.allSentences.some(sentence => task.sample.english.includes(sentence.text)));
  for (const [token, number, meaning] of [["based", 1, /依据/], ["on", 1, /依据/], ["following", 1, /下面|下列/], ["writing", 2, /作文|写作/], ["comments", 2, /评论/], ["least", 3, /至少/], ["on", 4, /在/], ["points", 4, /分/]]) assert.match(study.resolveEntry(token, false, `2011-writing-b-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("writing", { articleId: article.id }), "writing");
  assert.equal(lexicon.canonicalLemma("Write", { articleId: article.id }), "write");
  assert.equal(knowledge.getPhraseKnowledge("based on the following chart").key, knowledge.getPhraseKnowledge("be based on").key);
  assert.equal(knowledge.getPhraseKnowledge("at least 150 words").key, knowledge.getPhraseKnowledge("at least").key);
  assert.match(study.resolveEntry("offer", false, "2011-writing-b-s2").contextualMeaning, /提出/);
  assert.equal(study.resolveEntry("give", false, "2011-writing-b-s2").contextualSubstitutions[0].rewrittenSentence, "In your writing, you should 1)interpret the chart and 2)offer your comments.");
});

test("2011整卷九个模块连续覆盖1—48题，全部进入年度索引", () => {
  const articles = Object.values(data.articleContents).filter(article => article.year === 2011);
  assert.equal(articles.length, 9);
  assert.equal(articles.flatMap(article => article.sentences).length, 137);
  assert.deepEqual(data.sectionsByYear[2011].map(section => section.id), articles.map(article => article.id));
  const tasks = articles.flatMap(article => [...article.questions, ...(article.translationTasks ?? []), ...(article.writingTasks ?? [])]);
  assert.deepEqual(tasks.map(task => task.number).sort((left, right) => left - right), Array.from({ length: 48 }, (_, index) => index + 1));
  assert.equal(new Set(tasks.map(task => task.id)).size, 48);
  for (const task of tasks) assert.equal(task.id, 201100 + task.number);
  const yearWords = study.buildYearWordItems(2011);
  for (const article of articles) assert.ok(yearWords.some(word => word.contexts.some(context => context.sentenceId.startsWith(`${article.id}-`))), `${article.id} 应进入年度词表`);
  const writingWord = yearWords.find(word => word.contexts.some(context => context.sentenceId === "2011-writing-b-s2" && context.sourceForm.toLowerCase() === "writing"));
  assert.ok(writingWord);
  assert.ok(writingWord.contexts.some(context => /作文|写作/.test(context.meaning)));
});

test("2011书信47完整保留原题六句、约100词和署名限制，范文不计考频", () => {
  const article = data.articleContents["2011-writing-a"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-writing-a.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.equal(article.kind, "writing");
  assert.equal(article.sentences.length, 6);
  assert.equal(article.questions.length, 0);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  assert.equal(article.writingTasks.length, 1);
  const task = article.writingTasks[0];
  assert.equal(task.id, 201147);
  assert.equal(task.number, 47);
  assert.equal(task.points, 10);
  assert.equal(task.genre, "letter");
  assert.deepEqual(task.wordLimit, { mode: "about", count: 100 });
  assert.deepEqual(task.instructions, article.sentences);
  assert.equal(task.chart, undefined);
  assert.equal(task.sample.english[0], "Dear Li Ming,");
  assert.equal(task.sample.english.at(-1), "Yours,\nZhang Wei");
  assert.equal(study.writingWordCount(task.sample.english.join(" ")), 99);
  assert.equal(task.sample.english.length, task.sample.chinese.length);
  assert.equal(task.sample.english.length, task.sample.notes.length);
  assert.ok(task.requirements.some(rule => /地址/.test(rule)));
  assert.ok(task.requirements.some(rule => /祝贺/.test(rule)));
  assert.ok(task.requirements.some(rule => /建议/.test(rule)));
  for (const [token, number, meaning] of [["admitted", 1, /录取/], ["just", 1, /刚刚/], ["her", 2, /她/], ["on", 2, /关于/], ["on", 3, /在/], ["about", 3, /大约/], ["own", 4, /自己/], ["instead", 5, /改用|代替/], ["address", 6, /地址/], ["points", 6, /分/]]) assert.match(study.resolveEntry(token, false, `2011-writing-a-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("admitted", { articleId: article.id }), "admit");
  assert.equal(lexicon.canonicalLemma("prepared", { articleId: article.id }), "prepare");
  const replacement = study.resolveEntry("Suppose", false, "2011-writing-a-s1").contextualSubstitutions[0];
  assert.equal(replacement.rewrittenSentence, "Assume your cousin Li Ming has just been admitted to a university.");
  assert.equal(replacement.target, "word:assume");
  assert.match(study.resolveEntry("assume", false, "2011-writing-a-s1").contextualMeaning, /假|设/);
  assert.match(study.resolveEntry("assume", false).contextualMeaning, /采取|呈现/);
  assert.equal(knowledge.getPhraseKnowledge("at the end of the letter").key, knowledge.getPhraseKnowledge("at the end of").key);
  const corpus = data.allSentences.map(sentence => sentence.text).join(" ");
  assert.ok(!corpus.includes(task.sample.english[1]), "教学范文不得计入真题语料");
  assert.match(study.resolveEntry("do", false, "2011-translation-s1").contextualMeaning, /代替/);
});

test("2011英译汉46为三段七句整篇，保留约数、单位和指代", () => {
  const article = data.articleContents["2011-translation"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-translation.json", import.meta.url), "utf8"));
  assert.equal(article.sentences.length, 7);
  assert.equal(article.questions.length, 0);
  assert.equal(article.translationTasks.length, 1);
  const task = article.translationTasks[0];
  assert.equal(task.id, 201146);
  assert.equal(task.number, 46);
  assert.equal(task.points, 15);
  assert.equal(task.format, "passage");
  assert.deepEqual(task.paragraphs.map(paragraph => paragraph.length), [1, 4, 2]);
  assert.equal(task.source, fixture.paragraphs.map(row => row.text).join("\n\n"));
  assert.equal(task.answer.split("\n\n").length, 3);
  assert.match(article.sentences[0].natural, /约.*2%/);
  assert.match(article.sentences[2].natural, /0\.2至7\.0克/);
  assert.match(article.sentences[4].natural, /同时/);
  assert.match(article.sentences[6].natural, /不应只是大企业/);
  for (const [token, number, meaning] of [["IT", 1, /信息技术/], ["volume", 1, /总量|数量/], ["do", 1, /代替|排放/], ["toll", 2, /损害|代价/], ["then", 4, /因此/], ["While", 5, /同时/], ["which", 5, /制冷/], ["done", 7, /完成/]]) assert.match(study.resolveEntry(token, false, `2011-translation-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("CO2", { articleId: article.id }), "co2");
  assert.equal(knowledge.getPhraseKnowledge("a great deal of heat").key, knowledge.getPhraseKnowledge("A great deal of attention").key);
  assert.ok(study.resolveEntry("right", false, "2011-translation-s3").contextualSubstitutions[0].rewrittenSentence.includes('"correct" answer'));
});

test("2011PartB保留21句、五人物、共享七项且只有A/F多余", () => {
  const article = data.articleContents["2011-p5"];
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-p5.json", import.meta.url), "utf8"));
  assert.equal(article.sentences.length, 21);
  assert.equal(article.questions.length, 5);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(row => row.text).join(" ")));
  article.questions.forEach((question, index) => {
    assert.equal(question.format, "matching");
    assert.equal(question.number, 41 + index);
    assert.equal(question.answer, answers.verifiedAnswerKey2011Passage5[question.number]);
    assert.equal(question.prompt, fixture.questions[index].text.replace(/^\d+\.\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), fixture.options.map(row => row.text.replace(/^\[\s*[A-G]\s*\]\s*/, "")));
    assert.deepEqual(Object.keys(question.explanations).sort(), ["A", "B", "C", "D", "E", "F", "G"]);
    assert.equal(data.questionOptionSourceId(question, "G"), "question-201141-option-G");
  });
  const used = new Set(article.questions.map(question => question.answer));
  assert.deepEqual(article.questions[0].options.filter(option => !used.has(option.key)).map(option => option.key), ["A", "F"]);
  assert.match(article.questions[2].locating, /批评者/);
  assert.equal(article.sentences[15].beginnerSyntax.clauses.length, 3);
  for (const [token, number, meaning] of [["He", 11, /兰斯利/], ["He", 17, /布格拉/], ["credit", 15, /话费/], ["free", 17, /禁止|无/], ["paper", 20, /白皮书/], ["poor", 1, /不良|不健康/]]) assert.match(study.resolveEntry(token, false, `2011-p5-s${number}`).contextualMeaning, meaning);
  const campaign = study.buildYearWordItems(2011).find(item => item.key === "change4life" || item.lemma === "change4life" || item.headword === "change4life");
  assert.ok(campaign);
  assert.equal(campaign.contexts.filter(context => context.sentenceId.startsWith("question-")).length, 1, "共用E选项不能统计成五次出现");
  assert.ok(study.resolveEntry("back", false, "2011-p5-s21").contextualSubstitutions[0].rewrittenSentence.includes("doctors support"));
});

test("2011Text4保留六段17句、历史数量、原卷拼写及德法政策方向", () => {
  checkReadingSource("2011-p4", 36, 17, answers.verifiedAnswerKey2011Passage4);
  const article = data.articleContents["2011-p4"];
  assert.match(article.sentences[3].text, /16 countries/);
  assert.match(article.sentences[9].text, /all 27 members/);
  assert.match(article.sentences[14].text, /trading block/);
  assert.equal(article.sentences[4].beginnerSyntax.clauses.length, 2);
  assert.equal(article.sentences[9].beginnerSyntax.clauses.length, 3);
  for (const [token, number, meaning] of [["make", 1, /挺过|成功/], ["It", 7, /讨论/], ["It", 10, /德国/], ["powers", 7, /大国/], ["figures", 13, /人士/], ["write", 14, /无望/], ["too", 14, /过于|太/], ["make", 17, /使/]]) {
    assert.match(study.resolveEntry(token, false, `2011-p4-s${number}`).contextualMeaning, meaning);
  }
  assert.equal(lexicon.canonicalLemma("means", { articleId: "2011-p4" }), "mean");
  assert.match(article.sentences[11].natural, /富国转向穷国/);
  assert.match(article.questions[2].explanations.C, /all 27/);
  const replacement = study.resolveEntry("save", false, "2011-p4-s6").contextualSubstitutions[0];
  assert.equal(replacement.target, "word:rescue");
  assert.doesNotMatch(study.resolveEntry("rescue", false).contextualMeaning, /该词未/);
});

test("2011Text3七段17句及31—35原题完整，比较与否定准确", () => {
  checkReadingSource("2011-p3", 31, 17, answers.verifiedAnswerKey2011Passage3);
  const article = data.articleContents["2011-p3"];
  assert.equal(article.sentences[8].beginnerSyntax.clauses.length, 2);
  assert.match(article.sentences[8].beginnerSyntax.clauses[0].objectOrComplement, /材料|that/);
  assert.match(article.sentences[8].beginnerSyntax.clauses[1].subject, /that/);
  assert.match(article.sentences[10].natural, /公寓更小/);
  assert.match(article.sentences[12].text, /not entirely foreign/);
  assert.match(article.sentences[12].natural, /也有美国本土的根源/);
  assert.match(article.sentences[16].natural, /并未普及/);
  assert.match(article.sentences[16].natural, /多数/);
  assert.equal(lexicon.canonicalLemma("means", { articleId: "2011-p3" }), "mean");
  assert.equal(lexicon.canonicalLemma("buildings", { articleId: "2011-p3" }), "building");
  assert.equal(lexicon.canonicalLemma("building", { articleId: "2011-p3", sentenceId: "2011-p3-s14" }), "build");
  assert.equal(lexicon.canonicalLemma("founded", { articleId: "2011-p3" }), "found");
  assert.match(study.resolveEntry("I", false, "2011-p3-s1").contextualMeaning, /缩写/);
  assert.match(study.resolveEntry("commissioned", false, "2011-p3-s15").contextualMeaning, /委托/);
  assert.match(study.resolveEntry("Commission", false, "2011-p2-s5").contextualMeaning, /委员会/);
  assert.equal(knowledge.getPhraseKnowledge("both desirable and inevitable").key, "both-a-and-b");
  const replacement = study.resolveEntry("derive", false, "2011-p3-s8").contextualSubstitutions[0];
  assert.equal(replacement.target, "word:stem");
  assert.ok(study.resolveEntry("stem", false).contextualMeaning);
});

test("2011全部正文、题干与选项在真实来源语境下没有空白词卡", () => {
  for (const article of Object.values(data.articleContents).filter(article => article.year === 2011)) {
    const sources = [
      ...article.sentences.map(sentence => [sentence.id, sentence.text]),
      ...article.questions.flatMap(question => [[`question-${question.id}-prompt`, question.prompt], ...question.options.map(option => [data.questionOptionSourceId(question, option.key), option.text])]),
    ];
    for (const [sourceId, text] of sources) for (const token of new Set(text.toLowerCase().match(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/g) ?? [])) {
      const entry = study.resolveEntry(token, false, sourceId);
      assert.match(entry.contextualMeaning, /[\u4e00-\u9fff]/, `${sourceId}:${token}中文义`);
      assert.ok(entry.use?.trim(), `${sourceId}:${token}用法`);
      assert.doesNotMatch(`${entry.contextualMeaning} ${entry.use} ${entry.partOfSpeech}`, /该词未出现在|随对应真题精审|word（|结合本句成分理解/, `${sourceId}:${token}`);
    }
  }
});

function checkReadingSource(articleId, firstQuestion, sentenceCount, answerKey) {
  const article = data.articleContents[articleId];
  const fixture = JSON.parse(readFileSync(new URL(`./fixtures/${articleId}.json`, import.meta.url), "utf8"));
  assert.equal(article.sentences.length, sentenceCount);
  assert.equal(article.questions.length, 5);
  assert.equal(normalize(article.sentences.map(sentence => sentence.text).join(" ")), normalize(fixture.paragraphs.map(paragraph => paragraph.text).join(" ")));
  article.questions.forEach((question, index) => {
    assert.equal(question.number, firstQuestion + index);
    assert.equal(question.id, 201100 + question.number);
    assert.equal(question.prompt, fixture.questions[index * 5].text.replace(/^\d+\.\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), fixture.questions.slice(index * 5 + 1, index * 5 + 5).map(option => option.text.replace(/^\[\s*[A-D]\s*\]\s*/, "")));
    assert.equal(question.answer, answerKey[question.number]);
  });
}

test("2011Text1四段19句与原卷、独立答案一致并保留25题分歧说明", () => {
  checkReadingSource("2011-p1", 21, 19, answers.verifiedAnswerKey2011Passage1);
  const article = data.articleContents["2011-p1"];
  assert.equal(article.sentences[16].beginnerSyntax.clauses.length, 6);
  assert.equal(article.questions[4].answer, "D");
  assert.match(article.questions[4].locating, /分歧/);
  assert.match(article.sentences[11].natural, /概率|可能性/);
  assert.doesNotMatch(article.sentences[11].natural, /百分点/);
  for (const source of answers.verifiedAnswerSources2011Passage1) assert.ok(source.url.startsWith("https://"));
});

test("2011Text2五段30句保留反问、残句、倒装与原题26—30", () => {
  checkReadingSource("2011-p2", 26, 30, answers.verifiedAnswerKey2011Passage2);
  const article = data.articleContents["2011-p2"];
  assert.match(article.sentences[0].beginnerSyntax.components[0].form, /疑问/);
  assert.match(article.sentences[12].text, /^Not the 20%/);
  assert.equal(article.sentences[26].text, "So have science and general business reporters.");
  assert.equal(article.sentences[26].beginnerSyntax.clauses.length, 0, "肯定承接倒装不是从句");
  assert.match(article.sentences[26].beginnerSyntax.components[1].explanation, /gone.*省略/);
  assert.match(article.sentences[21].text, /87%/);
  assert.match(article.sentences[22].text, /35%/);
  assert.match(article.questions[0].prompt, /Lines3-4/);
});

test("2011Text2按来源解析多义并保持旧篇词形键和词组键", () => {
  const cases = [["Whatever", 1, /究竟/], ["trade", 5, /贸易/], ["It", 8, /委员会/], ["little", 10, /几乎没有/], ["routine", 13, /常见|惯常/], ["papers", 15, /报纸/], ["had", 18, /竟敢|胆量/], ["they", 19, /措施/], ["Fully", 22, /高达|足足/], ["So", 27, /也一样/], ["virtue", 30, /优点|长处/]];
  for (const [token, number, meaning] of cases) assert.match(study.resolveEntry(token, false, `2011-p2-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("meeting", { articleId: "2011-p2" }), "meeting");
  assert.equal(lexicon.canonicalLemma("highly", { articleId: "2011-p2" }), "highly");
  assert.equal(lexicon.canonicalLemma("less", { articleId: "2010-p2" }), "less");
  assert.equal(lexicon.canonicalLemma("less"), "less");
  assert.equal(lexicon.canonicalLemma("Lines3", { articleId: "2011-p2" }), "line");
  assert.match(study.resolveEntry("trade", false, "2011-p1-s16").contextualMeaning, /升级/);
  assert.equal(knowledge.getPhraseKnowledge("all the same").key, "all-the-same");
  assert.equal(knowledge.getPhraseKnowledge("as a result").key, "as-result-2001p2");
  const replacement = lexicon.getLexicalGuide("shrugged", { articleId: "2011-p2", sentenceId: "2011-p2-s11" }).contextualSubstitutions[0];
  assert.equal(replacement.fit, "with-adjustment");
  assert.match(replacement.rewrittenSentence, /have weathered the recession/);
  assert.ok(study.resolveEntry("weather", false).contextualMeaning);
});

test("2011Text1词卡纠正董事、股票、副词比较级与过去式，不污染其他篇", () => {
  const cases = [["director", 1, /董事/], ["rest", 2, /余下/], ["compensation", 3, /薪酬/], ["left", 4, /离开|辞去/], ["weathered", 8, /渡过|经受/], ["earnings", 12, /盈利|收益/], ["stock", 13, /股票/], ["worse", 13, /差|不佳/], ["they", 10, /研究人员/], ["them", 15, /董事/], ["times", 18, /时期/], ["once", 19, /再一次/]];
  for (const [token, number, meaning] of cases) assert.match(study.resolveEntry(token, false, `2011-p1-s${number}`).contextualMeaning, meaning);
  assert.equal(lexicon.canonicalLemma("worse", { articleId: "2011-p1" }), "badly");
  assert.match(lexicon.getLexicalGuide("worse", { articleId: "2011-p1" }).partOfSpeech, /adv/);
  assert.match(lexicon.getLexicalGuide("offers", { articleId: "2011-p1" }).partOfSpeech, /n\./);
  assert.match(study.resolveEntry("once", false, "2011-cloze-s9").contextualMeaning, /一次/);
  assert.match(study.resolveEntry("very", false, "2011-cloze-s2").partOfSpeech, /adj/);
  assert.match(study.resolveEntry("very", false, "2011-p1-s19").partOfSpeech, /adv/);
  const replacement = lexicon.getLexicalGuide("keep", { articleId: "2011-p1", sentenceId: "2011-p1-s18" }).contextualSubstitutions[0];
  assert.equal(replacement.target, "word:retain");
  assert.ok(study.resolveEntry("retain", false).contextualMeaning);
});

test("2011完形逐字保留附件九段、20题80项及独立答案", () => {
  const fixture = JSON.parse(readFileSync(new URL("./fixtures/2011-cloze.json", import.meta.url), "utf8"));
  assert.equal(fixture.sha256, "c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82");
  assert.equal(fixture.paragraphs.length, 9);
  assert.equal(cloze.sentences.length, 16);
  assert.equal(cloze.questions.length, 20);
  assert.deepEqual(cloze.sentences.map(sentence => sentence.id), Array.from({ length: 16 }, (_, index) => `2011-cloze-s${index + 1}`));
  const keys = answers.verifiedAnswerKey2011Cloze;
  const restored = fixture.paragraphs.map(paragraph => paragraph.text.replace(/__(\d+)__/g, (_, number) => {
    const options = fixture.options.slice((Number(number) - 1) * 5 + 1, Number(number) * 5);
    return options["ABCD".indexOf(keys[number])].text.replace(/^\[\s*[A-D]\s*\]\s*/, "");
  })).join(" ");
  assert.equal(normalize(cloze.sentences.map(sentence => sentence.text).join(" ")), normalize(restored));
  assert.equal(normalize(cloze.sentences.map(sentence => sentence.testText ?? sentence.text).join(" ")).replace(/___\((\d+)\)/g, "__$1__"), normalize(fixture.paragraphs.map(paragraph => paragraph.text).join(" ")));
  for (const question of cloze.questions) {
    assert.equal(question.id, 201100 + question.number);
    assert.equal(question.answer, keys[question.number]);
    const sourceOptions = fixture.options.slice((question.number - 1) * 5 + 1, question.number * 5).map(option => option.text.replace(/^\[\s*[A-D]\s*\]\s*/, ""));
    assert.deepEqual(question.options.map(option => option.text), sourceOptions);
  }
  assert.match(cloze.sentences[13].text, /an initiative push/);
  assert.ok(answers.verifiedAnswerSources2011Cloze.some(source => source.url.includes("eol.cn")));
});

test("2011完形新语境隔离、词形归一及年份出处中文义", () => {
  const cases = [["very", 2, /恰恰|正是/], ["once", 9, /一次/], ["private", 6, /私营/], ["range", 5, /一系列/], ["services", 5, /服务/], ["push", 14, /推动/], ["license", 8, /执照|许可/], ["licensed", 16, /许可/], ["themselves", 16, /网民|用户/]];
  for (const [token, number, meaning] of cases) {
    const sentenceId = `2011-cloze-s${number}`;
    assert.match(lexicon.getLexicalGuide(token, { articleId: cloze.id, sentenceId }).contextualMeaning, meaning);
    assert.match(study.resolveEntry(token, false, sentenceId).contextualMeaning, meaning);
  }
  assert.match(lexicon.getLexicalGuide("very", { articleId: cloze.id, sentenceId: "2011-cloze-s2" }).partOfSpeech, /adj/);
  assert.equal(lexicon.canonicalLemma("united", { articleId: cloze.id }), "unite");
  assert.equal(lexicon.canonicalLemma("means", { articleId: "2010-p2", sourceId: "question-201027-prompt" }), "mean");
  assert.equal(knowledge.getPhraseKnowledge("should be forced to register").key, "be-forced-to-do");
  const words = study.buildYearWordItems(2011);
  for (const word of words) for (const context of word.contexts) {
    assert.ok(context.meaning?.trim());
    assert.equal(context.meaning, study.resolveEntry(context.sourceForm, false, context.sentenceId).contextualMeaning);
  }
  const provide = lexicon.getLexicalGuide("affords", { articleId: cloze.id, sentenceId: "2011-cloze-s1" }).contextualSubstitutions[0];
  assert.equal(provide.target, "word:provide");
  assert.match(provide.rewrittenSentence, /^The Internet provides/);
  assert.ok(study.resolveEntry("provide", false).contextualMeaning);
  const afford = study.resolveEntry("affords", false, "2011-cloze-s1");
  assert.ok(afford.otherMeanings.some(meaning => /有能力|经济条件/.test(meaning)));
});
