import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);

test("build emits the worker and expected storage bindings", async () => {
  const workerSource = await readFile(new URL("dist/server/index.js", root), "utf8");
  const manifest = JSON.parse(await readFile(new URL("dist/.openai/hosting.json", root), "utf8"));

  assert.match(workerSource, /export\s*\{/);
  assert.equal(manifest.d1, "DB");
  assert.equal(manifest.r2, null);
  assert.equal("project_id" in manifest, false, "交接包不能携带正式网站身份");
});
