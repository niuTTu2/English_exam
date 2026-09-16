import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const vite = await createServer({ appType: "custom", configFile: false,
  root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const { prepareLocalSnapshot, readRemoteSnapshot } = await vite.ssrLoadModule("/app/study-sync.ts");

test("rendering and login do not pretend that unchanged local records were edited", () => {
  const current = { updatedAt: 0, termNotes: { word: "笔记" } };
  const initial = prepareLocalSnapshot(current, null, 123, 999);
  assert.equal(initial.updatedAt, 123);
  assert.equal(prepareLocalSnapshot(current, initial, 0, 1000).updatedAt, 123);
  assert.equal(prepareLocalSnapshot({ ...current, termNotes: { word: "新笔记" } }, initial, 0, 1000).updatedAt, 1000);
  assert.equal(prepareLocalSnapshot(current, null, 0, 999).updatedAt, 0);
});

test("login loads newer remote records and compares against local edits made during the request", async () => {
  let local = { updatedAt: 10, termNotes: { word: "本机" } };
  const remote = { state: { updatedAt: 19, termNotes: { word: "云端" } }, updatedAt: 20 };
  const loaded = await readRemoteSnapshot(() => local, async () => Response.json(remote));
  assert.equal(loaded.termNotes.word, "云端");
  assert.equal(loaded.updatedAt, 20);
  const preserved = await readRemoteSnapshot(() => local, async () => {
    local = { updatedAt: 30, termNotes: { word: "读取期间新增" } };
    return Response.json(remote);
  });
  assert.equal(preserved, null);
});

test("failed remote reads never fall through to upload; empty remote keeps local state", async () => {
  const methods = [];
  await assert.rejects(readRemoteSnapshot(() => null, async (url, options) => {
    assert.equal(url, "/api/study-state");
    methods.push(options?.method ?? "GET");
    return new Response("unavailable", { status: 503 });
  }), /暂不上传/);
  assert.deepEqual(methods, ["GET"]);
  assert.equal(await readRemoteSnapshot(() => ({ updatedAt: 30 }), async () => Response.json({ state: null })), null);
});
