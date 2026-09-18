import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
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

test("句法首屏突出本句关键，细节折叠且父子关系保留", async () => {
  const { SentenceSyntaxPanel } = await vite.ssrLoadModule("/app/sentence-syntax-panel.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const renderText = text => text;
  const s5 = articleContents["2010-p1"].sentences[4];
  const html = renderToStaticMarkup(React.createElement(SentenceSyntaxPanel, { analysis: s5, renderText }));
  assert.match(html, /本句关键/);
  assert.ok(html.indexOf("两个时间短语管不同的动作") < html.indexOf("<details"));
  assert.equal((html.match(/The world art market had been losing momentum\./g) ?? []).length, 1);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/);
  assert.doesNotMatch(html, /从句内部|0 个|继续细分时间/);
  const disclosureNames = [...html.matchAll(/<details[^>]* name="([^"]+)"/g)].map(match => match[1]);
  assert.equal(disclosureNames.length, 0, "读者可以同时打开关系树和本句难点对照");
  assert.match(html, /aria-label="rising bewilderingly since 2003 的内部结构"/);
  assert.match(html, /data-syntax-component="since 2003"/);
  assert.match(html, /先后顺序（结合上下文）/);
  const s16 = articleContents["2010-p1"].sentences[15];
  const complex = renderToStaticMarkup(React.createElement(SentenceSyntaxPanel, { analysis: s16, renderText }));
  assert.match(complex, /从句内部/);
  assert.match(complex, /主语从句/);
  assert.match(complex, /表语从句/);
  assert.match(complex, /宾语补足语/);
  const old = renderToStaticMarkup(React.createElement(SentenceSyntaxPanel, { analysis: articleContents.cloze.sentences[0], renderText }));
  assert.match(old, /条件状语从句/);
  assert.doesNotMatch(old, /本句难在哪里/);
});

test("2010初读按原卷五段连续呈现，读句和结构不混入查词按钮", async () => {
  const { OriginalPassage } = await vite.ssrLoadModule("/app/original-passage.tsx");
  const { StudySentence } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const article = articleContents["2010-p1"];
  assert.deepEqual(article.paragraphs.map(p => p.sentenceIds.length), [4, 4, 4, 3, 4]);
  assert.deepEqual(article.paragraphs.flatMap(p => p.sentenceIds), article.sentences.map(s => s.id));
  const html = renderToStaticMarkup(React.createElement(OriginalPassage, { article, marked: new Set(), onMark() {} }));
  assert.equal((html.match(/class="original-paragraph"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /word-button|phrase-action|主干|供给惜售/);
  // 交互模式对未配置练习的兼容内容也成立；配置练习时另验证先练后讲门禁。
  const props = { sentence: { ...article.sentences[0], practice: undefined }, isExpanded: true, isMarked: false, note: "", onToggle() {}, onMark() {}, onTerm() {}, onNote() {} };
  const gated = renderToStaticMarkup(React.createElement(StudySentence, { ...props, sentence: article.sentences[0], mode: "structure" }));
  assert.match(gated, /先完成至少一项尝试/);
  assert.doesNotMatch(gated, /data-syntax-panel|class="colored-sentence"|class="translation-block"/);
  const read = renderToStaticMarkup(React.createElement(StudySentence, props));
  assert.doesNotMatch(read, /class="word-button|phrase-action|colored-sentence/);
  assert.match(read, /完整语法资料/);
  assert.match(read, /翻译与篇章作用/);
  const structure = renderToStaticMarkup(React.createElement(StudySentence, { ...props, mode: "structure" }));
  assert.match(structure, /按词块查看语法作用/);
  assert.doesNotMatch(structure, /class="word-button|phrase-action/);
  const words = renderToStaticMarkup(React.createElement(StudySentence, { ...props, mode: "words" }));
  assert.match(words, /本句词组/);
  assert.doesNotMatch(words, /colored-sentence/);
});

test("2012满意度表支持三态度列、精确数据和原图尺寸", async () => {
  const { WritingPromptChart, WritingTestTask } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents, availableYears, sectionsByYear } = await vite.ssrLoadModule("/app/data.ts");
  assert.deepEqual(availableYears, [2000, 2001, 2010, 2011, 2012]);
  assert.deepEqual(sectionsByYear[2012].map(section => section.id), ["2012-cloze", "2012-p1", "2012-p2", "2012-p3", "2012-p4", "2012-p5", "2012-translation", "2012-writing-a", "2012-writing-b"]);
  const task = articleContents["2012-writing-b"].writingTasks[0];
  const chart = renderToStaticMarkup(React.createElement(WritingPromptChart, { task }));
  assert.match(chart, /class="writing-chart"/);
  assert.match(chart, /src="\/exams\/2012-writing-b-original\.jpg"/);
  assert.match(chart, /width="644" height="329"/);
  for (const column of ["年龄组", "满意", "不清楚", "不满意"]) assert.ok(chart.includes('scope="col">' + column));
  assert.equal((chart.match(/scope="row"/g) ?? []).length, 3);
  assert.equal((chart.match(/<td>/g) ?? []).length, 9);
  assert.match(chart, /64\.0%/);
  assert.match(chart, /原图精确百分数/);
  assert.doesNotMatch(chart, /2008年|2009年|不是精确标签|<details[^>]*open/);
  const props = { task, answer: "The table reports job satisfaction.", submitted: false, onAnswer() {}, onSubmit() {}, onEdit() {}, onTerm() {} };
  const pending = renderToStaticMarkup(React.createElement(WritingTestTask, props));
  assert.equal((pending.match(/<textarea/g) ?? []).length, 1);
  assert.equal((pending.match(/<img/g) ?? []).length, 1);
  assert.match(pending, /至少150词/);
  assert.doesNotMatch(pending, /Career expectations, workload/);
  const submitted = renderToStaticMarkup(React.createElement(WritingTestTask, { ...props, submitted: true }));
  assert.match(submitted, /不作自动评分/);
  assert.match(submitted, /继续修改.*保留草稿/);
});

test("写作字数辅助计数保留缩写与连字符，不混入汉字", async () => {
  const { writingWordCount } = await vite.ssrLoadModule("/app/study-app.tsx");
  assert.equal(writingWordCount(""), 0);
  assert.equal(writingWordCount("中文说明\n  "), 0);
  assert.equal(writingWordCount("I'm ready for university-level work in 2011."), 7);
});

test("图表作文原图在学习与自测均可读，至少150词提示不冒充评分", async () => {
  const { WritingPromptChart, WritingTestTask } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const task = articleContents["2011-writing-b"].writingTasks[0];
  const chart = renderToStaticMarkup(React.createElement(WritingPromptChart, { task }));
  assert.match(chart, /src="\/exams\/2011-writing-b-original\.jpg"/);
  assert.match(chart, /alt="原卷柱状图/);
  assert.match(chart, /不是精确标签/);
  assert.match(chart, /scope="col">2008年/);
  assert.match(chart, /scope="col">2009年/);
  assert.equal((chart.match(/scope="row"/g) ?? []).length, 3);
  assert.doesNotMatch(chart, /<details[^>]*open/);
  const props = { task, answer: "The chart shows market shares.", onAnswer() {}, onSubmit() {}, onEdit() {}, onTerm() {}, submitted: false };
  const pending = renderToStaticMarkup(React.createElement(WritingTestTask, props));
  assert.equal((pending.match(/<textarea/g) ?? []).length, 1);
  assert.equal((pending.match(/<img/g) ?? []).length, 1);
  assert.match(pending, /至少150词/);
  assert.match(pending, /尚未达到原题最低字数/);
  assert.doesNotMatch(pending, /参考范文与逐段说明|One possible explanation/);
  const adequate = renderToStaticMarkup(React.createElement(WritingTestTask, { ...props, answer: task.sample.english.join("\n\n") }));
  assert.doesNotMatch(adequate, /尚未达到原题最低字数/);
  const submitted = renderToStaticMarkup(React.createElement(WritingTestTask, { ...props, submitted: true }));
  assert.equal((submitted.match(/<img/g) ?? []).length, 1);
  assert.match(submitted, /不作自动评分/);
  assert.doesNotMatch(submitted, /<details[^>]*open/);
});

test("2011书信自测只有一个输入框，提交前不泄露范文，提交后折叠并可继续修改", async () => {
  const { WritingTestTask, WritingStudyGuide } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const task = articleContents["2011-writing-a"].writingTasks[0];
  const props = { task, answer: "Dear Li Ming,", onAnswer() {}, onSubmit() {}, onEdit() {}, onTerm() {} };
  const pending = renderToStaticMarkup(React.createElement(WritingTestTask, { ...props, submitted: false }));
  assert.equal((pending.match(/<textarea/g) ?? []).length, 1);
  assert.match(pending, /id="writing-answer-201147"/);
  assert.match(pending, /当前3词/);
  assert.match(pending, /原题要求约100词/);
  assert.doesNotMatch(pending, /参考范文与逐段说明|Congratulations on your admission|继续修改/);
  const submitted = renderToStaticMarkup(React.createElement(WritingTestTask, { ...props, submitted: true }));
  assert.match(submitted, /继续修改（保留草稿）/);
  assert.match(submitted, /参考范文与逐段说明/);
  assert.match(submitted, /<textarea[^>]*disabled=""/);
  assert.doesNotMatch(submitted, /<details[^>]*open/);
  const guide = renderToStaticMarkup(React.createElement(WritingStudyGuide, { task }));
  assert.match(guide, /99词/);
  assert.match(guide, /不作自动评分/);
  assert.doesNotMatch(guide, /<details[^>]*open/);
});

test("2011 matching renders one seven-option bank with stable source anchors", async () => {
  const { MatchingOptionBank } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const html = renderToStaticMarkup(React.createElement(MatchingOptionBank, { question: articleContents["2011-p5"].questions[0], onTerm() {} }));
  assert.match(html, /有两项多余/);
  for (const key of ["A", "B", "C", "D", "E", "F", "G"]) {
    assert.equal(html.match(new RegExp(`id="source-question-201141-option-${key}"`, "g"))?.length, 1);
  }
  assert.match(html, /Change4Life/);
  assert.doesNotMatch(html, /正确答案/);
});

test("精读无需提交即可查看原题、逐项依据和语言讲解，兼容不同选择题型", async () => {
  const { QuestionStudyCard, default: StudyApp } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const article = articleContents["2010-p1"];
  for (const question of article.questions) {
    const html = renderToStaticMarkup(React.createElement(QuestionStudyCard, { question, onTerm() {}, onSentence() {} }));
    assert.match(html, new RegExp(`id="source-question-${question.id}-prompt"`));
    assert.match(html, /题干怎么读 · 结构与用法/);
    for (const option of question.options) {
      assert.ok(html.includes(`id="source-question-${question.id}-option-${option.key}"`));
      assert.ok(html.includes(`${option.key}项 · 为什么选／不选`));
      assert.ok(html.includes(`${option.key}项 · 句意、时态与搭配用法`));
      assert.ok(html.includes(`data-syntax-panel="${question.analysis.options[option.key].id}"`));
    }
    assert.doesNotMatch(html, /选择 [A-D]|提交答案|尚待补充/);
    assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/, "题目可读，长解释默认折叠");
    assert.match(html, /<button type="button" class="term-token"/);
  }
  const negative = renderToStaticMarkup(React.createElement(QuestionStudyCard, { question: article.questions[2], onTerm() {}, onSentence() {} }));
  assert.equal((negative.match(/事实成立，非本题所求/g) ?? []).length, 3, "NOT题不把不选项说成事实错误");
  const title = renderToStaticMarkup(React.createElement(QuestionStudyCard, { question: article.questions[4], onTerm() {}, onSentence() {} }));
  assert.equal((title.match(/读懂这个短语/g) ?? []).length, 4);
  assert.equal((title.match(/短语核心/g) ?? []).length, 4);
  const legacy = [articleContents.cloze.questions[0], articleContents["2011-p5"].questions[0], ...Object.values(articleContents).flatMap(a => a.questions).filter(q => q.format === "true-false").slice(0, 1)];
  for (const question of legacy) {
    const html = renderToStaticMarkup(React.createElement(QuestionStudyCard, { question, onTerm() {}, onSentence() {} }));
    for (const option of question.options) assert.ok(html.includes(`${option.key}项 · 为什么选／不选`));
    assert.match(html, /回原文核对/);
  }
  const initialTest = renderToStaticMarkup(React.createElement(StudyApp));
  assert.match(initialTest, /直接查看题目/);
  assert.match(initialTest, /学习题目与选项解析/);
  assert.doesNotMatch(initialTest, /class="study-option-reason"|class="question-analysis-body"|class="answer-analysis"/, "自测未交卷不直接显示精读答案");
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("keeps the required animation and scrolling utilities available", async () => {
  const css = [
    await readCssTree(path.join(root, "dist")),
    await readFile(path.join(root, "vendor/shadcn-tailwind-4.13.0.css"), "utf8"),
    await readFile(path.join(root, "app/globals.css"), "utf8"),
  ].join("\n");

  assert.match(css, /--tw-enter-opacity/);
  assert.match(css, /scrollbar-width:\s*none/);
  assert.match(css, /scrollbar-gutter:\s*stable/);
  assert.match(css, /scroll-fade-reveal-b/);
  assert.match(css, /mask-image:/);
  assert.match(css, /tw-shimmer/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("整篇翻译只出现一个原题输入框，提交后保留十句折叠解析", async () => {
  const { TranslationTestTask } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const task = articleContents["2010-translation"].translationTasks[0];
  const props = { task, answer: "第一段译文\n\n第二段译文\n\n第三段译文", onAnswer() {}, onSubmit() {}, onTerm() {} };
  const pending = renderToStaticMarkup(React.createElement(TranslationTestTask, { ...props, submitted: false }));
  assert.equal((pending.match(/<textarea/g) ?? []).length, 1);
  assert.match(pending, /translation-task-number">46</);
  assert.match(pending, /rows="8"/);
  assert.match(pending, /15分/);
  assert.match(pending, /提交全文/);
  assert.doesNotMatch(pending, /class="translation-result"/);
  assert.equal((pending.match(/data-sentence-id="2010-translation-s\d+"/g) ?? []).length, 10);
  assert.equal((pending.match(/<p><span data-sentence-id/g) ?? []).length, 3);
  const submitted = renderToStaticMarkup(React.createElement(TranslationTestTask, { ...props, submitted: true }));
  assert.match(submitted, /全文已提交/);
  assert.match(submitted, /参考译文/);
  assert.equal((submitted.match(/<details class="translation-analysis"/g) ?? []).length, 10);
  assert.doesNotMatch(submitted, /<details class="translation-analysis" open/);
  assert.match(submitted, /第10句 · 查看句读/);
  const sentenceTask = articleContents.translation.translationTasks[0];
  const legacy = renderToStaticMarkup(React.createElement(TranslationTestTask, { ...props, task: sentenceTask, submitted: true }));
  assert.match(legacy, /本句已提交/);
  assert.match(legacy, /rows="3"/);
  assert.equal((legacy.match(/<details class="translation-analysis" open/g) ?? []).length, 1);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("2011全文翻译使用一个46题作答框及三段七句，而非七道翻译题", async () => {
  const { TranslationTestTask } = await vite.ssrLoadModule("/app/study-app.tsx");
  const { articleContents } = await vite.ssrLoadModule("/app/data.ts");
  const task = articleContents["2011-translation"].translationTasks[0];
  const props = { task, answer: "完整三段译文", onAnswer() {}, onSubmit() {}, onTerm() {} };
  const pending = renderToStaticMarkup(React.createElement(TranslationTestTask, { ...props, submitted: false }));
  assert.equal((pending.match(/<textarea/g) ?? []).length, 1);
  assert.equal((pending.match(/<p><span data-sentence-id/g) ?? []).length, 3);
  assert.match(pending, /translation-task-number">46</);
  assert.doesNotMatch(pending, /class="translation-result"/);
  const submitted = renderToStaticMarkup(React.createElement(TranslationTestTask, { ...props, submitted: true }));
  assert.equal((submitted.match(/<details class="translation-analysis"/g) ?? []).length, 7);
  assert.doesNotMatch(submitted, /<details class="translation-analysis" open/);
});
