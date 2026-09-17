# 真题句读｜真题精审与协作维护

GitHub 是唯一代码源，`main` 已连接既有 Cloudflare 部署。维护者按篇精审、独立提交推送，不再逐篇等待用户复核。新增服务器、域名或公开访问范围仍需单独授权。

接手请阅读 [开始说明](START_HERE.md)、[可直接交给 Codex 的指令](PROMPT_FOR_FRIEND_GPT.md)、[当前进度](docs/IMPORT_PROGRESS.md) 和 [精简审计流程](docs/RELEASE_CHECKLIST.md)。普通内容导入只需内容测试与构建，通过后不重复完整套件；内容精细标准不变。原卷附件需另行交接，不会自动随 Git 克隆。

Windows 用户先阅读 `START_HERE.md`，最快可直接双击 `START_LOCAL_TEST_WINDOWS.bat`。
好友的 GPT/Codex 在修改前必须阅读根目录 `AGENTS.md` 和 `docs/` 中的质量规范。

2010 年英语二阅读包含 Text 1—4 和 Part B，原卷题号连续覆盖 21—45。Part B 保留真实 T/F 判断题；从年度目录进入「阅读 Part B」，在自测中作答后查看定位和两项理由。其余阅读仍采用原有 A—D 四选一，不改旧题号或学习记录键。

2010 年「英译汉」收录第46题：三段、10句、15分。自测模式使用一个答题框提交全文，提交后保留三段参考译文，并按需展开10句解析；不提供自动评分。单词、词组和逐句用法进入2010年度词表。2000年翻译继续采用原有逐句作答，旧学习记录键不变。

年度词表按原形合并次数，同时检索每个真实出处的词形、中文义和词性。例如搜“结伴”可以找到 Part B 中的 company，搜 peering 会打开“张望”这一语境。词卡的“切换词条语境”只用于浏览，不覆盖已经保存的复习来源；复习清单中的“切换复习语境”仍会保存选择。点击“回到原句精读”“回到题目出处”或“出现次数与年份”中的出处，可以定位到对应句子、题干或选项，不清空已作答内容。

词卡先显示本句义，再按需展开「其他义项与用法」：既有多义补充与各真题语境继续保留；`app/vocabulary-senses.ts` 另提供19个多义词、7类词组的已核验常见义项、搭配和双语教学例句。`note` 包括笔记、注释、音符、基调/意味、注意、记录、指出等12项，不因当前原句只用到其中一义就隐藏其他义项。此覆盖不等于全词库考义已经穷尽，不将教学例句标成真题或计入考频。

「出现次数与年份」的每条出处同时显示实际词形/表达、词性和该出处中文义；例如 `note` 的说明性注释、虚伪意味、注意到异常、收尾基调分别保留，`a lack of demand` 与 `a lack of sales` 仍共享规范键但显示需求不足与销售不足。相关专项回归：`node --test tests/vocabulary-senses.test.mjs`。新增常见义项不改笔记、复习或账号同步数据；自测未解锁时不显示义项面板。设计与词典来源见 `docs/change-reports/vocabulary-senses.md`。

2011 年英语二整卷已接入：完形填空、Text 1—4、Part B、英译汉和两道写作，共九个模块、137句（含十句写作指令），45道客观题与三道主观任务连续覆盖1—48题。Part B为真实A—G七选项人物匹配：选项共用一次，各人物选择字母，有两项多余；共享选项在年度词表只计一次出处，提交后查看全部七项理由。英译汉为三段七句、15分，一个答题框提交全文，无自动评分。四选一、2010 T/F及旧学习记录键不变。第25题转载分歧保留于解析与报告。逐篇提交与公开页面核验状态见 `docs/IMPORT_PROGRESS.md`。

写作 Part A保留原题约100词、10分、收信人Li Ming、署名Zhang Wei和不写地址的要求。自测可保存英文草稿并查看辅助词数，提交后按需展开审题、99词教学范文、逐段译文、表达规则和自查清单；不自动评分。选择「继续修改（保留草稿）」不会清空作文。自由作答复用现有记录字段，以独立文章ID和任务ID隔离，不修改账号或同步协议。范文不是原卷文本或唯一答案，不进入真题词频。

写作 Part B收录第48题：至少150词、15分，原样保留2008—2009年国内轿车市场部分品牌份额图。柱顶标签在原卷中被遮挡，仅按刻度写近似值；图表附中文替代文字和可展开表格。169词三段教学范文区分份额与销量、图表事实与可能解释；学习模式可按需看指导，自测提交前不显示范文。完整性与来源专项：`node --test tests/content-2011.test.mjs`。

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

### 邮箱密码登录

- 首次使用：打开右上角个人账号，切换“验证码登录”；登录后再次打开账号面板，设置并确认密码。
- 密码为8—128个字符，无需组合大小写或特殊符号；下次使用原邮箱和密码即可登录同一账号。
- 忘记密码：用邮箱验证码登录，在账号面板重新设置密码；没有共享或默认密码。
- 邮件服务暂不可用时，已设置密码的账号仍可登录。密码能力需要原D1、邮箱允许范围、OTP_PEPPER，不依赖邮件发送密钥。
- 两种登录均先确认账号和云端版本再开放上传；新设备不再按本机时间戳覆盖云端。读取失败时保留本机并暂停上传，可在账号面板“重试同步”。
- 本机记录按邮箱隔离，访客及旧版记录不会自动混入已有账号。独立的离线修改与云端修改按最近同步基线合并；同一条笔记/答案发生冲突时保留双方并暂停上传，不静默选一方覆盖。
- 账号面板提供“导出本机备份”和“恢复本机旧记录到当前账号”；手动恢复只合并无冲突条目，遇到冲突整次停止。旧版 `zhenti-judu-study-state-v1` 保持原样；切换账号不删除其他账号的本机副本。详见 [同步保护与恢复说明](docs/STUDY_SYNC_RECOVERY.md)。

### 账号与同步增量迁移

`npm run deploy:cloudflare`先核对既有Worker和D1目标，依次执行`drizzle/0001_password_login.sql`与`drizzle/0002_study_state_backups.sql`，成功后才发布Worker。SQL幂等增加密码表、学习记录历史表及更新前备份触发器，不重建原用户、会话和学习记录，不重复执行旧的0000建表脚本。备份保护未就绪时新同步接口拒绝写入。不要回滚到无版本校验的旧同步接口。

为兼容Cloudflare控制台仍使用默认`npx wrangler deploy`的情况，`npm run build`的`postbuild`也执行迁移门禁，但严格限定`WORKERS_CI=1`且`WORKERS_CI_BRANCH=main`。本地、其他CI及预览分支构建全部跳过远端迁移。两处重复执行仍是幂等新增表，不重复改写用户数据。

既有Cloudflare Builds部署凭据需要对绑定D1具有执行增量SQL的权限；权限不足时发布会停止，不能绕过迁移继续部署。不要把令牌或验证码写入仓库。可先运行`node scripts/deploy-cloudflare.mjs --check`只检查构建目标，不连接数据库或发布。

验证：`node --test tests/password.test.mjs tests/auth.test.mjs tests/study-sync.test.mjs`使用合成凭证和隔离内存数据库，不发送邮件、不读取生产数据；`tests/auth.test.mjs`通过现有工具链的Miniflare验证真实路由，并额外模拟托管环境的PBKDF2迭代上限，避免本地无限制运行时掩盖线上错误。

基础保护与边界：新密码保存为PBKDF2-SHA-256（100000次、每次独立随机盐），不存明文；该迭代数适配现有托管运行时限制，是兼容性折中，并不等同于600000次的离线猜测防护。旧600000次凭证仍按原参数校验；若运行时拒绝该参数，则提示本人通过验证码登录后重新设置，不静默改写或清空旧凭证。本人设置要求有效会话和同源请求，既有邮箱允许范围不变；已有密码账号10分钟内最多5次尝试。密码不进入学习记录或浏览器持久存储。该轻量方案不增加多因素认证或外部风控，限流可能暂时影响被重复尝试的账号，可用验证码恢复。学习快照字段及稳定词条键保持v1兼容；同步传输另校验账号、服务端版本和空白覆盖风险。

保存失败提示末尾的`PWD-SAVE-SESSION`、`PWD-SAVE-HASH`或`PWD-SAVE-STORAGE`分别标记会话检查、密码计算、凭证写入阶段。反馈时只提供提示或参考码，不提供密码、验证码、Cookie或数据库内容。服务端仅记录固定事件名和阶段码，不记录原始异常或凭证。

### 复习语境、到期队列与统计

- 标记单词或加入清单时保存原文出处；复习和不同自定义清单分别记忆选择，不再用当前页面的文章冒充原语境。词卡显示年份、正文/题干/选项来源及原文。
- 旧记录保持原词条键、标签、笔记和复习计划。没有保存出处且匹配多个语境时，先选择真实出处；可在词卡内“切换复习语境”。唯一出处可直接打开，不猜测多义词的来源。
- “今日待复习”和“已到期”只计入已到时间的词条；“全部”仍保留未来计划，“逾期”单独显示。整句及错题未设间隔，仍归入已到期。日期按本机时区计算，重新打开或回到页面时刷新。
- 年度词组次数统计本年度正文、题干和选项里的原文表达；卡片的同一结构次数与出处共用定位索引。例如2010年的`In the U.S.`共2次：完形第9句和Text 2第30题选项C，而不是只统计正文的一次。
- 自测说明使用当前题目的显示题号；不修改题干、答案或计时器默认设置。

新增语境元数据是既有v1学习快照的可选`termContexts`字段，与原记录一起保存和同步，不新增数据库表或替换旧账号。专项验证：`node --test tests/study-experience.test.mjs tests/study-sync.test.mjs`。

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
