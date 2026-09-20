import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { getFunctionSemanticAlias: alias } = await vite.ssrLoadModule("/app/vocabulary-learning/function-semantic-aliases.ts");
const { resolveMemorySense } = await vite.ssrLoadModule("/app/vocabulary-learning/sense-registry.ts");

test("function grouping preserves as degree/comparison POS and other genuinely different grammatical roles", () => {
  const degree = alias("as", "adv", "同样地");
  const comparison = alias("as", "conj", "与……一样");
  assert.equal(degree.pos, "adv");
  assert.equal(comparison.pos, "conj");
  assert.notEqual(degree.id, comparison.id);
  assert.equal(alias("as", "adv/conj", "和……一样"), undefined);
  assert.equal(alias("as", "adv/conj", "构成数量比较的as…as"), undefined);
  assert.equal(alias("as", "comparison marker", "和……一样（比较标记）"), undefined);
  assert.equal(alias("as", "adv", "多达（搭配中）"), undefined, "a whole as much as annotation cannot identify the first or second as");
  const candidate = (pos, meaning) => ({ entry: { key: "as", kind: "word", partOfSpeech: pos, contextualMeaning: meaning, occurrences: [] }, context: { id: `as-${pos}`, sourceId: `as-${pos}`, expression: "as" } });
  const senses = [resolveMemorySense(candidate("adv.", "同样地")), resolveMemorySense(candidate("conj.", "与……一样")), resolveMemorySense(candidate("adv./conj.", "和……一样"))];
  assert.equal(new Set(senses.map(sense => sense.senseId)).size, 3);
  assert.deepEqual(senses.map(sense => sense.partOfSpeech), ["adv", "conj", "adv/conj"]);
  assert.equal(alias("that", "conj", "引出担忧内容").id, alias("that", "conj", "引出所知内容").id);
  assert.notEqual(alias("that", "conj", "引出担忧内容").id, alias("that", "pron", "这些词（关系指代）").id);
  assert.equal(alias("be", "aux", "构成被动").id, alias("be", "aux", "被动标记").id);
  assert.notEqual(alias("be", "aux", "被动标记").id, alias("be", "aux", "进行时助动词").id);
  assert.notEqual(alias("be", "aux", "被动标记").id, alias("be", "v", "是").id);
});
