import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom", configFile: false, root,
  server: { middlewareMode: true, hmr: false },
});
after(() => vite.close());
const { hashPassword, verifyPassword, isValidPassword } = await vite.ssrLoadModule("/app/api/_lib/password.ts");

test("password length has no character-composition restrictions", () => {
  for (const value of [null, undefined, 12345678, {}, "", "1234567", "a".repeat(129)]) {
    assert.equal(isValidPassword(value), false);
  }
  for (const value of ["12345678", "a".repeat(128), "中文也可以作为密码", " eight  "]) {
    assert.equal(isValidPassword(value), true);
  }
});

test("password hashes use independent salts and preserve whitespace", async () => {
  const sample = " synthetic-password ";
  const first = await hashPassword(sample);
  const second = await hashPassword(sample);
  assert.notEqual(first, second);
  assert.equal(first.includes(sample), false);
  assert.equal(await verifyPassword(sample, first), true);
  assert.equal(await verifyPassword(sample.trim(), first), false);
  assert.equal(await verifyPassword("different-password", first), false);
  await assert.rejects(hashPassword("short"), /8—128/);
});

test("malformed or unbounded stored hashes are rejected", async () => {
  for (const value of ["", "plain-text", "pbkdf2-sha256$999999999$abc$def", "pbkdf2-sha256$600000$xx$yy"]) {
    assert.equal(await verifyPassword("synthetic-password", value), false);
  }
});

test("the additive migration preserves existing users, sessions and study records and is idempotent", async () => {
  const database = new DatabaseSync(":memory:");
  try {
    database.exec(await readFile(new URL("../drizzle/0000_serious_galactus.sql", import.meta.url), "utf8"));
    database.exec("INSERT INTO users VALUES ('synthetic-user', 'learner@example.test', 123)");
    database.exec("INSERT INTO sessions VALUES ('synthetic-token', 'synthetic-user', 999999, 123)");
    database.exec("INSERT INTO study_states VALUES ('synthetic-user', '{\"termNotes\":{\"word\":\"保留原笔记\"}}', 234)");
    const readOriginal = () => ["users", "sessions", "study_states"].map((table) => database.prepare(`SELECT * FROM ${table}`).all());
    const before = readOriginal();
    const migration = await readFile(new URL("../drizzle/0001_password_login.sql", import.meta.url), "utf8");
    database.exec(migration);
    database.exec(migration);
    assert.deepEqual(readOriginal(), before);
    assert.equal(database.prepare("SELECT COUNT(*) AS count FROM user_passwords").get().count, 0);
    assert.throws(() => database.exec("INSERT INTO user_passwords(user_id,password_hash,updated_at) VALUES ('missing','synthetic',1)"), /FOREIGN KEY/);
  } finally {
    database.close();
  }
});
