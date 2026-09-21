import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", root, configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const dated = await vite.ssrLoadModule("/app/vocabulary-learning/dated-words.ts");

function candidate(key, sourceId) {
  return { manual: true, entry: { key, headword: key, display: key, kind: "word", partOfSpeech: "n.", contextualMeaning: `${key}义`, use: "测试",
    collocations: [], otherMeanings: [], wordFamily: [], confusions: [], counts: { form: 1, lemma: 1, family: 1 }, occurrences: [] },
  context: { id: `${sourceId}:${key}`, sourceId, articleId: "2013-p4", year: 2013, sourceType: "sentence", expression: key } };
}

test("待学与已学按首次真实学习日期分组，单纯标记仍属于待学", () => {
  const day = 86_400_000;
  const now = new Date(2026, 8, 21, 12).getTime();
  const pending = model.createMemory({ ...candidate("pending", "s1"), context: { ...candidate("pending", "s1").context, mark: "完全不会" } }, now - day);
  const learned = model.createMemory(candidate("learned", "s2"), now - 2 * day);
  const legacy = { ...model.createMemory(candidate("legacy", "s3"), now - 3 * day), lastRating: "known", updatedAt: now - day };
  const memories = { [pending.id]: pending, [learned.id]: learned, [legacy.id]: legacy };
  const attempts = { one: { id: "one", sessionId: "one", queueItemId: "one", memoryId: learned.id, contextId: learned.primaryContextId,
    kind: "reading", rating: "known", createdAt: now, wasNew: true } };
  const words = dated.datedWords(memories, attempts);
  assert.deepEqual(words.filter(item => item.state === "pending").map(item => item.memory.headword), ["pending"]);
  assert.deepEqual(words.filter(item => item.state === "learned").map(item => item.memory.headword).sort(), ["learned", "legacy"]);
  const groups = dated.groupDatedWords(words.filter(item => item.state === "learned"), now);
  assert.match(groups[0].label, /今天/);
  assert.equal(groups[0].items[0].memory.headword, "learned");
  assert.ok(groups.every((group, index) => !index || groups[index - 1].day > group.day));
});
