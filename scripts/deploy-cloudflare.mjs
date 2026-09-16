import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const configPath = "dist/server/wrangler.json";
const config = JSON.parse(await readFile(new URL(`../${configPath}`, import.meta.url), "utf8"));
const database = config.d1_databases?.find((binding) => binding.binding === "DB");
if (config.name !== "english-exam" || database?.database_name !== "zhenti-judu-prod" || database?.database_id !== "07579767-4ace-4097-a9e8-06814ded6e53") {
  throw new Error("发布目标与既有生产 Worker / D1 不一致，已停止。请核对配置，不会执行迁移或发布。");
}

if (process.argv.includes("--check")) {
  console.log("发布目标核验通过：english-exam / zhenti-judu-prod。本次仅检查，未执行迁移或发布。");
} else {
  const wrangler = fileURLToPath(import.meta.resolve("wrangler/bin/wrangler.js"));
  const commands = [
    ["d1", "execute", database.database_name, "--remote", "--config", configPath, "--file", "drizzle/0001_password_login.sql", "--yes"],
    ["deploy", "--config", configPath],
  ];
  for (const args of commands) {
    const result = spawnSync(process.execPath, [wrangler, ...args], { cwd: root, stdio: "inherit" });
    if (result.error || result.status !== 0) {
      console.error("迁移或发布未成功，已停止后续步骤。不会绕过权限或改用其他目标。");
      process.exit(result.status ?? 1);
    }
  }
}
