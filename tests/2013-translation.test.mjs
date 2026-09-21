import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());

const data = await vite.ssrLoadModule("/app/data.ts");

const expectedTranslation = [
  "I can pick a date from the past 53 years and know instantly where I was, what happened in the news and even the day of the week.",
  "I've been able to do this since I was four.",
  "I never feel overwhelmed with the amount of information my brain absorbs.",
  "My mind seems to be able to cope and the information is stored away neatly.",
  "When I think of a sad memory, I do what everybody does – try to put it to one side.",
  "I don't think it's harder for me just because my memory is clearer.",
  "Powerful memory doesn't make my emotions any more acute or vivid.",
  "I can recall the day my grandfather died and the sadness I felt when we went to the hospital the day before.",
  "I also remember that the musical play Hair opened on Broadway on the same day – they both just pop into my mind in the same way.",
];

test("2013第46题完整保留两段九句和整篇15分作答边界", () => {
  const article = data.articleContents["2013-translation"];
  assert.equal(article.kind, "translation");
  assert.deepEqual(article.sentences.map(item => item.text), expectedTranslation);
  assert.deepEqual(article.paragraphs.map(item => item.sentenceIds), [
    ["2013-translation-s1", "2013-translation-s2"],
    Array.from({ length: 7 }, (_, index) => `2013-translation-s${index + 3}`),
  ]);
  assert.equal(article.translationTasks.length, 1);
  const [task] = article.translationTasks;
  assert.equal(task.id, 201346);
  assert.equal(task.number, 46);
  assert.equal(task.format, "passage");
  assert.equal(task.points, 15);
  assert.equal(task.source, `${expectedTranslation.slice(0, 2).join(" ")}\n\n${expectedTranslation.slice(2).join(" ")}`);
  assert.match(task.answer, /过去53年|四岁/);
  assert.match(task.answer, /祖父|《毛发》|百老汇/);
});

test("2013目录按原卷顺序公开完形、四篇阅读和翻译", () => {
  assert.deepEqual(data.sectionsByYear[2013].map(item => item.id), ["2013-cloze", "2013-p1", "2013-p2", "2013-p3", "2013-p4", "2013-translation"]);
});
