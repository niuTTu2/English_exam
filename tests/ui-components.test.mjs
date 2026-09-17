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
