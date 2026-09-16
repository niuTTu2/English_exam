# 真题句读｜真题精审与协作维护

GitHub 是唯一代码源，`main` 已连接既有 Cloudflare 部署。维护者按篇精审、独立提交推送，不再逐篇等待用户复核。新增服务器、域名或公开访问范围仍需单独授权。

接手请阅读 [开始说明](START_HERE.md)、[可直接交给 Codex 的指令](PROMPT_FOR_FRIEND_GPT.md)、[当前进度](docs/IMPORT_PROGRESS.md) 和 [精简审计流程](docs/RELEASE_CHECKLIST.md)。普通内容导入只需内容测试与构建，通过后不重复完整套件；内容精细标准不变。原卷附件需另行交接，不会自动随 Git 克隆。

Windows 用户先阅读 `START_HERE.md`，最快可直接双击 `START_LOCAL_TEST_WINDOWS.bat`。
好友的 GPT/Codex 在修改前必须阅读根目录 `AGENTS.md` 和 `docs/` 中的质量规范。

下面保留原项目的技术说明。

# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## 底层脚本说明（保留的 Sites 模板）

The project originated from a Sites template. Current content delivery uses GitHub → Cloudflare; follow `docs/RELEASE_CHECKLIST.md` for local checks. Retained Sites metadata does not authorize a separate Sites deployment. Install locked dependencies when required; do not repeat an unchanged installation for every article.

This starter does not use `wrangler.jsonc`.

`install:ci` is intentionally a single, non-retrying `npm ci`. It refuses a concurrent install for the same project, consumes a matching image-seeded npm cache with `--prefer-offline` while retaining registry fallback for a missing cache object, otherwise downloads and verifies the complete vinext tarball recorded in `package-lock.json`, limits npm to one socket, and terminates a stalled install. `build` applies a short timeout. These helpers target Linux and use GNU `timeout`; they are not native macOS scripts.

Scripts that need writable project-scoped home, npm, XDG, and temporary paths use `scripts/sites-env.sh`. The `dev` and `start` scripts honor the caller's runtime environment and keep Wrangler logs inside the checkout. The generated `.sites-runtime/` directory is disposable and ignored by Git.

## Included Shape

- edit site code under `app/`
- `app/chatgpt-auth.ts` provides optional dispatch-owned ChatGPT sign-in helpers
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- In a Server Component, start sign-in with
  `<a href={chatGPTSignInPath(returnTo)} target="_top">`. The auth helper
  module is server-only; do not import it into a Client Component.
- Do not use `fetch`, XHR, a client-side router, or a framework link that can
  prefetch the sign-in route. SIWC must start as a top-level navigation.
- Never request the AuthAPI authorization endpoint directly. The dispatch-owned
  `/signin-with-chatgpt` route must start the SIWC flow.
- Use `chatGPTSignOutPath(returnTo)` for browser sign-out links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Diagnostic Commands

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `npm test`: build and verify the rendered development-preview metadata
- `npm run db:generate`: generate Drizzle migrations after schema changes

For article delivery, run one content check and one production build as specified in `docs/RELEASE_CHECKLIST.md`; documentation-only edits do not require a build.

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Cloudflare Workers Builds

Connect the `main` branch to the existing `english-exam` Worker with these settings:

- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npm run deploy:cloudflare`
- Production branch: `main`

The deploy command uses the Wrangler configuration generated in `dist/server`, including the production `zhenti-judu-prod` D1 binding. Runtime secrets such as `RESEND_API_KEY` stay in Cloudflare Worker Secrets and must not be committed to this repository. The production custom domains are `onehjt.dpdns.org` and `english.onehjt.dpdns.org`.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
