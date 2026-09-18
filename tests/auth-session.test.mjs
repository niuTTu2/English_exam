import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";

const source = await readFile(new URL("../app/auth-session.ts", import.meta.url), "utf8");
const compiled = stripTypeScriptTypes(source, { mode: "strip" });
const { readAuthSession, AuthSessionError } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const guest = { configured: true, passwordConfigured: true, user: null };
const jsonResponse = value => new Response(JSON.stringify(value), { headers: { "Content-Type": "application/json" } });
const rejectsWithCode = (promise, code) => assert.rejects(promise, error => error instanceof AuthSessionError && error.code === code);

test("successful guest checks use same-origin credentials and bypass HTTP caches", async () => {
  const result = await readAuthSession({ fetcher: async (path, options) => {
    assert.equal(path, "/api/auth/session");
    assert.equal(options.credentials, "same-origin");
    assert.equal(options.cache, "no-store");
    assert.equal(options.signal.aborted, false);
    return jsonResponse(guest);
  } });
  assert.deepEqual(result, guest);
});

test("validated false capabilities and temporary password failure preserve their distinct meaning", async () => {
  const unavailable = { configured: false, passwordConfigured: false, user: null };
  assert.deepEqual(await readAuthSession({ fetcher: async () => jsonResponse(unavailable) }), unavailable);
  const knownUser = { configured: true, passwordConfigured: false, passwordUnavailable: true,
    user: { email: "synthetic@example.test", hasPassword: false } };
  assert.deepEqual(await readAuthSession({ fetcher: async () => jsonResponse(knownUser) }), knownUser);
  const passwordOnly = { configured: false, passwordConfigured: true, user: null };
  assert.deepEqual(await readAuthSession({ fetcher: async () => jsonResponse(passwordOnly) }), passwordOnly);
});

test("HTTP failures cannot become anonymous successful sessions even with plausible JSON", async () => {
  for (const status of [401, 403, 500, 503]) {
    await rejectsWithCode(readAuthSession({ fetcher: async () => new Response(JSON.stringify(guest), { status }) }), "unavailable");
  }
});

test("network failures and HTML responses are actionable errors instead of false capabilities", async () => {
  await rejectsWithCode(readAuthSession({ fetcher: async () => { throw new TypeError("synthetic network failure"); } }), "network");
  await rejectsWithCode(readAuthSession({ fetcher: async () => new Response("<!doctype html><h1>Unavailable</h1>") }), "invalid");
});

test("malformed session payloads never imply logout or unavailable configuration", async () => {
  for (const value of [
    null, [], true, {}, { error: "unavailable" },
    { ...guest, configured: "true" }, { ...guest, passwordConfigured: 0 },
    { configured: true, passwordConfigured: true },
    { ...guest, passwordUnavailable: "false" }, { ...guest, user: [] },
    { ...guest, user: {} }, { ...guest, user: { email: "" } },
    { ...guest, user: { email: "not-an-email" } },
    { ...guest, user: { email: "synthetic@example.test", hasPassword: "yes" } },
  ]) {
    await rejectsWithCode(readAuthSession({ fetcher: async () => jsonResponse(value) }), "invalid");
  }
});

test("a hanging network request times out and aborts the underlying fetch", async () => {
  let fetchSignal;
  await rejectsWithCode(readAuthSession({ timeoutMs: 15, fetcher: (_, options) => {
    fetchSignal = options.signal;
    return new Promise(() => {});
  } }), "timeout");
  assert.equal(fetchSignal.aborted, true);
});

test("the timeout also covers a response body that never finishes", async () => {
  await rejectsWithCode(readAuthSession({ timeoutMs: 15, fetcher: async () => ({
    ok: true, json: () => new Promise(() => {}),
  }) }), "timeout");
});

test("retry after a failed request reads new capabilities successfully", async () => {
  let attempt = 0;
  const fetcher = async () => ++attempt === 1
    ? new Response('{"error":"temporary"}', { status: 503 })
    : jsonResponse(guest);
  await rejectsWithCode(readAuthSession({ fetcher }), "unavailable");
  assert.deepEqual(await readAuthSession({ fetcher }), guest);
  assert.equal(attempt, 2);
});

test("cancellation prevents a late request from replacing a subsequent successful check", async () => {
  const controller = new AbortController();
  let resolveOld;
  let oldSignal;
  const old = readAuthSession({ signal: controller.signal, fetcher: (_, options) => {
    oldSignal = options.signal;
    return new Promise(resolve => { resolveOld = resolve; });
  } });
  controller.abort();
  await assert.rejects(old, { name: "AbortError" });
  assert.equal(oldSignal.aborted, true);
  assert.deepEqual(await readAuthSession({ fetcher: async () => jsonResponse(guest) }), guest);
  resolveOld(jsonResponse({ configured: false, passwordConfigured: false, user: null }));
  await assert.rejects(old, { name: "AbortError" });
});

test("already cancelled checks never issue a network request", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(readAuthSession({ signal: controller.signal, fetcher: () => {
    assert.fail("cancelled request reached fetch");
  } }), { name: "AbortError" });
});
