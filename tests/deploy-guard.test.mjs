import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("automatic migration skips local, unrelated CI and non-production branches before accessing any target", () => {
  for (const variables of [
    { WORKERS_CI: "", WORKERS_CI_BRANCH: "" },
    { WORKERS_CI: "", WORKERS_CI_BRANCH: "main", CI: "true" },
    { WORKERS_CI: "1", WORKERS_CI_BRANCH: "preview" },
    { WORKERS_CI: "1", WORKERS_CI_BRANCH: "" },
  ]) {
    const result = spawnSync(process.execPath, ["scripts/deploy-cloudflare.mjs", "--ci-migrate"], {
      cwd: root, env: { ...process.env, ...variables }, encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /跳过远端迁移/);
    assert.doesNotMatch(result.stdout, /Wrangler|Executing|执行.*SQL/);
  }
});

test("production target can be checked without starting Wrangler or a migration", () => {
  const result = spawnSync(process.execPath, ["scripts/deploy-cloudflare.mjs", "--ci-migrate", "--check"], {
    cwd: root, env: { ...process.env, WORKERS_CI: "1", WORKERS_CI_BRANCH: "main" }, encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /发布目标核验通过/);
  assert.match(result.stdout, /未执行迁移或发布/);
});
