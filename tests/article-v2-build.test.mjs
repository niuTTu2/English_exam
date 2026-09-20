import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("V2 UI and CSS stay out of the V1 static dependency graph; synthetic content is not shipped", async () => {
  const manifest = JSON.parse(await readFile(new URL("../dist/client/.vite/manifest.json", import.meta.url), "utf8"));
  const entry = "app/article-v2/article-v2.tsx", seen = new Set();
  function visit(id) { if (seen.has(id)) return; seen.add(id); for (const dependency of manifest[id]?.imports ?? []) visit(dependency); }
  visit("app/study-app.tsx");
  assert.equal(manifest[entry].isDynamicEntry, true);
  assert.ok(manifest["app/study-app.tsx"].dynamicImports.includes(entry));
  assert.equal(seen.has(entry), false);
  const staticCss = new Set([...seen].flatMap(id => manifest[id]?.css ?? []));
  for (const file of manifest[entry].css) assert.equal(staticCss.has(file), false);
  assert.equal(Object.keys(manifest).some(id => id.startsWith("tests/")), false);
  for (const asset of Object.values(manifest).filter(item => item.file.endsWith(".js"))) {
    const code = await readFile(new URL(`../dist/client/${asset.file}`, import.meta.url), "utf8");
    assert.ok(!code.includes("V2 合成测试文章") && !code.includes("synthetic.v2-s1"));
  }
});
