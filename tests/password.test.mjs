import assert from "node:assert/strict";
import { pbkdf2Sync } from "node:crypto";
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
  for (const iterations of ["0", "1", "100001", "600001", "999999999", "0100000"]) {
    assert.equal(await verifyPassword("synthetic-password", `pbkdf2-sha256$${iterations}$${"ab".repeat(16)}$${"cd".repeat(32)}`), false);
  }
});

test("password hashing and verification respect the hosted runtime iteration limit", async (context) => {
  const deriveBits = crypto.subtle.deriveBits.bind(crypto.subtle);
  const limited = context.mock.method(crypto.subtle, "deriveBits", (algorithm, ...args) => {
    if (algorithm.name === "PBKDF2" && algorithm.iterations > 100_000) {
      return Promise.reject(new DOMException("Pbkdf2 failed: iteration counts above 100000 are not supported", "NotSupportedError"));
    }
    return deriveBits(algorithm, ...args);
  });
  const password = " synthetic-runtime-password ";
  const encoded = await hashPassword(password);
  assert.match(encoded, /^pbkdf2-sha256\$100000\$[a-f0-9]{32}\$[a-f0-9]{64}$/);
  const [, , salt, hash] = encoded.split("$");
  assert.equal(hash, pbkdf2Sync(password, Buffer.from(salt, "hex"), 100_000, 32, "sha256").toString("hex"));
  assert.equal(await verifyPassword(password, encoded), true);
  assert.equal(await verifyPassword(password.trim(), encoded), false);
  assert.equal(limited.mock.callCount(), 3);
});

test("legacy 600000-iteration hashes remain verifiable when supported", async () => {
  const password = "synthetic-legacy-password";
  const salt = "0123456789abcdef0123456789abcdef";
  const hash = pbkdf2Sync(password, Buffer.from(salt, "hex"), 600_000, 32, "sha256").toString("hex");
  const encoded = `pbkdf2-sha256$600000$${salt}$${hash}`;
  assert.equal(await verifyPassword(password, encoded), true);
  assert.equal(await verifyPassword("synthetic-incorrect-password", encoded), false);
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
