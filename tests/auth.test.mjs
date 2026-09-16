import assert from "node:assert/strict";
import { createHash, pbkdf2Sync } from "node:crypto";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { Miniflare } from "miniflare";

const root = fileURLToPath(new URL("..", import.meta.url));
const bundled = await build({
  stdin: { contents: `
    import * as password from './app/api/auth/password/route.ts';
    import * as session from './app/api/auth/session/route.ts';
    import * as code from './app/api/auth/verify-code/route.ts';
    import * as study from './app/api/study-state/route.ts';
    const deriveBits = crypto.subtle.deriveBits.bind(crypto.subtle);
    crypto.subtle.deriveBits = (algorithm, ...args) => {
      if (algorithm.name === 'PBKDF2' && algorithm.iterations > 100000) {
        return Promise.reject(new DOMException('Pbkdf2 failed: iteration counts above 100000 are not supported', 'NotSupportedError'));
      }
      return deriveBits(algorithm, ...args);
    };
    const routes = { '/api/auth/password': password, '/api/auth/session': session, '/api/auth/verify-code': code, '/api/study-state': study };
    export default { async fetch(request) {
      return routes[new URL(request.url).pathname]?.[request.method]?.(request) ?? new Response('Not found', { status: 404 });
    } };
  `, resolveDir: root, loader: "ts" },
  bundle: true, write: false, format: "esm", platform: "neutral",
  external: ["cloudflare:workers"], conditions: ["workerd", "worker", "browser"],
});
const runtime = new Miniflare({
  modules: true, script: bundled.outputFiles[0].text,
  compatibilityDate: "2026-05-15", compatibilityFlags: ["nodejs_compat"],
  d1Databases: ["DB"],
  bindings: { ALLOWED_EMAIL_DOMAINS: "example.test", OTP_PEPPER: "synthetic-test-pepper" },
});
after(() => runtime.dispose());
const database = await runtime.getD1Database("DB");
for (const filename of ["0000_serious_galactus.sql", "0001_password_login.sql"]) {
  const migration = await readFile(new URL(`../drizzle/${filename}`, import.meta.url), "utf8");
  for (const statement of migration.replaceAll("--> statement-breakpoint", "").split(";").filter((value) => value.trim())) {
    await database.prepare(statement).run();
  }
}

const digest = (value) => createHash("sha256").update(value).digest("hex");
const passphrase = "synthetic-password";

async function seedUser(name, domain = "example.test") {
  const userId = `user-${name}`;
  const email = `${name}@${domain}`;
  const token = `synthetic-session-${name}`;
  await database.prepare("INSERT INTO users(id,email,created_at) VALUES (?,?,?)").bind(userId, email, Date.now()).run();
  await database.prepare("INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES (?,?,?,?)")
    .bind(digest(`${token}:synthetic-test-pepper`), userId, Date.now() + 60_000, Date.now()).run();
  return { userId, email, cookie: `zhenti_session=${token}` };
}

function request(path, method = "GET", payload, cookie, origin = "https://study.example.test") {
  return runtime.dispatchFetch(`https://study.example.test${path}`, {
    method,
    headers: { Origin: origin, "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    ...(payload !== undefined ? { body: typeof payload === "string" ? payload : JSON.stringify(payload) } : {}),
  });
}

function savePassword(user, password = passphrase, extra = {}) {
  return request("/api/auth/password", "PUT", { password, confirmation: password, ...extra }, user.cookie);
}

test("password login works without email sending and preserves the existing account and records", async () => {
  const user = await seedUser("existing");
  const original = JSON.stringify({ termNotes: { context: "已有学习记录" } });
  await database.prepare("INSERT INTO study_states(user_id,payload,updated_at) VALUES (?,?,?)").bind(user.userId, original, 123).run();
  const initial = await (await request("/api/auth/session", "GET", undefined, user.cookie)).json();
  assert.equal(initial.configured, false);
  assert.equal(initial.passwordConfigured, true);
  assert.equal(initial.user.hasPassword, false);
  const saved = await savePassword(user);
  assert.equal(saved.status, 200);
  assert.deepEqual(await saved.json(), { ok: true });
  assert.equal((await (await request("/api/auth/session", "GET", undefined, user.cookie)).json()).user.hasPassword, true);
  const login = await request("/api/auth/password", "POST", { email: `  ${user.email.toUpperCase()}  `, password: passphrase });
  assert.equal(login.status, 200);
  assert.deepEqual(await login.json(), { user: { email: user.email, hasPassword: true } });
  assert.match(login.headers.get("Set-Cookie"), /HttpOnly; Secure; SameSite=Lax/);
  const cookie = login.headers.get("Set-Cookie").split(";")[0];
  assert.equal((await (await request("/api/study-state", "GET", undefined, cookie)).json()).state.termNotes.context, "已有学习记录");
  assert.equal((await database.prepare("SELECT payload FROM study_states WHERE user_id=?").bind(user.userId).first()).payload, original);
  assert.equal((await request("/api/auth/session", "DELETE", undefined, cookie)).status, 200);
  assert.equal((await (await request("/api/auth/session", "GET", undefined, cookie)).json()).user, null);
});

test("unknown, unset, wrong and disallowed accounts have the same failure", async () => {
  const unset = await seedUser("unset");
  const set = await seedUser("incorrect");
  await savePassword(set);
  const responses = [];
  for (const email of ["missing@example.test", unset.email, set.email, "outside@blocked.test"]) {
    const response = await request("/api/auth/password", "POST", { email, password: "synthetic-wrong" });
    assert.equal(response.status, 401);
    assert.equal(response.headers.has("Set-Cookie"), false);
    responses.push(await response.text());
  }
  assert.equal(new Set(responses).size, 1);
});

test("setting passwords requires same origin, an active allowed account and matching valid input", async () => {
  const user = await seedUser("validation");
  const other = await seedUser("unmodified");
  const outside = await seedUser("outside", "blocked.test");
  assert.equal((await request("/api/auth/password", "PUT", { password: passphrase, confirmation: passphrase })).status, 401);
  assert.equal((await request("/api/auth/password", "PUT", {}, user.cookie, "https://attacker.test")).status, 403);
  const malformedSession = await request("/api/auth/password", "PUT", {}, "zhenti_session=%");
  assert.equal(malformedSession.status, 503);
  assert.match((await malformedSession.json()).error, /PWD-SAVE-SESSION/);
  assert.equal((await savePassword(outside)).status, 403);
  assert.equal((await savePassword(user, "short")).status, 400);
  assert.equal((await savePassword(user, passphrase, { confirmation: "different" })).status, 400);
  assert.equal((await request("/api/auth/password", "POST", { email: [], password: passphrase })).status, 400);
  assert.equal((await request("/api/auth/password", "POST", "invalid-json")).status, 400);
  assert.equal((await savePassword(user, passphrase, { userId: other.userId, email: other.email })).status, 200);
  assert.equal(await database.prepare("SELECT user_id FROM user_passwords WHERE user_id=?").bind(other.userId).first(), null);
  await database.prepare("UPDATE sessions SET expires_at=0 WHERE user_id=?").bind(user.userId).run();
  assert.equal((await savePassword(user)).status, 401);
});

test("updating a password invalidates the previous password without replacing the account", async () => {
  const user = await seedUser("update");
  await savePassword(user);
  assert.equal((await savePassword(user, "synthetic-new-password")).status, 200);
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: passphrase })).status, 401);
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: "synthetic-new-password" })).status, 200);
  assert.equal((await database.prepare("SELECT id FROM users WHERE email=?").bind(user.email).first()).id, user.userId);
});

test("concurrent attempts share an atomic limit and an expired window allows recovery", async () => {
  const user = await seedUser("limited");
  await savePassword(user);
  const results = await Promise.all(Array.from({ length: 8 }, () => request("/api/auth/password", "POST", { email: user.email, password: "synthetic-wrong" })));
  assert.equal(results.filter((response) => response.status === 401).length, 5);
  assert.equal(results.filter((response) => response.status === 429).length, 3);
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: passphrase })).status, 429);
  await database.prepare("UPDATE user_passwords SET attempt_window_started_at=0 WHERE user_id=?").bind(user.userId).run();
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: passphrase })).status, 200);
  assert.equal((await database.prepare("SELECT failed_attempts FROM user_passwords WHERE user_id=?").bind(user.userId).first()).failed_attempts, 0);
});

test("existing email verification still creates a session for the same account", async () => {
  const user = await seedUser("otp");
  const requestId = "synthetic-code-request";
  const code = "123456";
  await database.prepare("INSERT INTO login_codes(id,email,code_hash,expires_at,created_at) VALUES (?,?,?,?,?)")
    .bind(requestId, user.email, digest(`${requestId}:${user.email}:${code}:synthetic-test-pepper`), Date.now() + 60_000, Date.now()).run();
  const response = await request("/api/auth/verify-code", "POST", { requestId, email: user.email, code });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { user: { email: user.email } });
  assert.match(response.headers.get("Set-Cookie"), /zhenti_session=/);
  assert.equal((await request("/api/auth/verify-code", "POST", { requestId, email: user.email, code })).status, 400);
});

test("legacy passwords exceeding the runtime limit can be reset through the existing account", async () => {
  const user = await seedUser("legacy");
  const salt = "0123456789abcdef0123456789abcdef";
  const hash = pbkdf2Sync(passphrase, Buffer.from(salt, "hex"), 600_000, 32, "sha256").toString("hex");
  const encoded = `pbkdf2-sha256$600000$${salt}$${hash}`;
  await database.prepare("INSERT INTO user_passwords(user_id,password_hash,updated_at) VALUES (?,?,?)")
    .bind(user.userId, encoded, Date.now()).run();
  const response = await request("/api/auth/password", "POST", { email: user.email, password: passphrase });
  assert.equal(response.status, 409);
  assert.match((await response.json()).error, /验证码.*重新设置密码/);
  assert.equal(response.headers.has("Set-Cookie"), false);
  assert.equal((await database.prepare("SELECT password_hash FROM user_passwords WHERE user_id=?").bind(user.userId).first()).password_hash, encoded);
  assert.equal((await savePassword(user, "synthetic-reset-password")).status, 200);
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: "synthetic-reset-password" })).status, 200);
  assert.equal((await database.prepare("SELECT id FROM users WHERE email=?").bind(user.email).first()).id, user.userId);
});

test("storage failures expose only a safe reference and preserve the previous password", async () => {
  const user = await seedUser("storage-failure");
  assert.equal((await savePassword(user)).status, 200);
  await database.prepare("CREATE TRIGGER reject_password_update BEFORE UPDATE OF password_hash ON user_passwords BEGIN SELECT RAISE(ABORT, 'synthetic-sensitive-database-detail'); END").run();
  try {
    const response = await savePassword(user, "synthetic-new-password");
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.match(body.error, /PWD-SAVE-STORAGE/);
    assert.doesNotMatch(JSON.stringify(body), /synthetic|example\.test|SQL|D1|password_hash/);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  } finally {
    await database.prepare("DROP TRIGGER reject_password_update").run();
  }
  assert.equal((await request("/api/auth/password", "POST", { email: user.email, password: passphrase })).status, 200);
});

test("a missing password migration does not discard an existing valid session", async () => {
  const user = await seedUser("migration-unavailable");
  await database.prepare("DROP TABLE user_passwords").run();
  const response = await request("/api/auth/session", "GET", undefined, user.cookie);
  const session = await response.json();
  assert.equal(session.user.email, user.email);
  assert.equal(session.passwordConfigured, false);
  const login = await request("/api/auth/password", "POST", { email: user.email, password: passphrase });
  assert.equal(login.status, 503);
  assert.doesNotMatch(await login.text(), /SQL|table|D1|password_hash/);
});
