import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { getContentSemanticAlias: alias } = await vite.ssrLoadModule("/app/vocabulary-learning/content-semantic-aliases.ts");

test("content-word equivalences cover nouns, verbs and inflected adjectives beyond the screenshot", () => {
  for (const [word, pos, first, second] of [
    ["approach", "n", "做法；方案", "方法；途径"],
    ["recent", "adj", "近来的", "近期的"],
    ["small", "adj", "更小的", "小的；较小的"],
    ["child", "n", "孩子", "儿童"],
    ["agree", "v", "同意", "认同；赞同"],
    ["letter", "n", "信件", "信；书信"],
    ["compare", "v", "相比", "比较"],
    ["efficiency", "n", "效率", "效率；高效性"],
    ["create", "v", "建立；创建", "造成；产生"],
  ]) {
    assert.ok(alias(word, pos, first), word);
    assert.deepEqual(alias(word, pos, first), alias(word, pos, second), word);
  }
});

test("one core sense keeps qualifiers in exact source glosses without fragmenting by their wording", () => {
  assert.deepEqual(alias("talk", "n", "谈话（书名 Divorce Talk 的组成部分）"), alias("talk", "n", "谈话；交谈"));
  assert.deepEqual(alias("proportion", "n", "广告收入占全部收入的比例"), alias("proportion", "n", "比例；所占份额"));
  assert.notEqual(alias("proportion", "n", "比例关系；尺度配比").id, alias("proportion", "n", "比例；所占份额").id);
});

test("shared words do not merge separate meanings, POS or broad old summaries", () => {
  assert.notEqual(alias("day", "n", "天").id, alias("day", "n", "所处时代").id);
  assert.notEqual(alias("stress", "n", "压力").id, alias("stress", "v", "强调").id);
  assert.equal(alias("decline", "v", "拒绝"), undefined);
  assert.equal(alias("develop", "v", "形成；养成"), undefined);
  assert.equal(alias("deny", "v", "否认"), undefined);
  assert.equal(alias("letter", "n", "字面条文"), undefined);
  assert.equal(alias("create", "n", "建立；创建"), undefined);
  assert.equal(alias("struggle", "n/v", "斗争；抗争"), undefined);
  assert.equal(alias("course", "n", "过程；课程；当然（of course）"), undefined);
  assert.equal(alias("domestic", "adj", "国内的"), undefined);
  assert.equal(alias("interpret", "v", "表现；阐释"), undefined, "literary representation differs from explaining a chart");
  assert.equal(alias("board", "n", "委员会；董事会").meaning, "委员会；董事会", "school boards are not necessarily corporate boards");
});

test("format normalization shares punctuation, whitespace and duplicate-token handling", () => {
  assert.deepEqual(alias("reason", "n", "原因；理由"), alias("reason", "n", " 理由、原因，原因。 "));
  assert.equal(alias("reason", "n", "理由；原因；推理"), undefined, "an extra meaning is not a harmless formatting change");
  assert.equal(alias("reason", "n", "原因（反义）"), undefined, "qualifiers cannot be stripped to guess equivalence");
});
