# 从这里开始

这是“真题句读”的持续维护入口。GitHub 仓库是唯一代码源，`main` 分支已连接 Cloudflare；用户已明确授权按“一篇文章一个提交”的方式持续精审、检查、推送和自动部署。

## 最快测试方法（Windows）

1. 安装 Node.js 22.13 或更高版本。生产构建需要 Bash 与 GNU timeout；Windows 可使用 WSL 或 Docker。
2. 解压项目，双击 `START_LOCAL_TEST_WINDOWS.bat`。
3. 首次运行会安装依赖，完成后浏览器打开 `http://localhost:5173`。
4. 测试结束时，在命令窗口按 `Ctrl+C`。

邮件服务尚未配置属于正常状态。测试版会使用本机模式，标记、笔记和复习进度保存在当前浏览器中。

## 手机在同一 Wi-Fi 下测试

双击 `START_LAN_TEST_WINDOWS.bat`，允许 Windows 防火墙的“专用网络”访问，然后在手机浏览器输入命令窗口显示的电脑局域网地址。不要设置路由器端口转发，不要用于公网访问。

## Docker 方法

已经安装 Docker Desktop 时，可双击 `START_LOCAL_TEST_DOCKER.bat`。数据目录为 `local-data/`。

## 接手维护前必须阅读

1. `AGENTS.md`
2. `docs/CONTENT_QUALITY_STANDARD.md`
3. `docs/ARTICLE_IMPORT_TEMPLATE.md`
4. `docs/RELEASE_CHECKLIST.md`
5. `PROMPT_FOR_FRIEND_GPT.md`

## 每次添加文章的固定流程

1. 查看 `git status`，保护已有改动；工作区干净时执行 `git pull --ff-only origin main`。分叉、冲突或权限问题先处理，禁止强推。
2. 阅读 `docs/IMPORT_PROGRESS.md` 的当前接续点，确认能读取对应原卷，再处理一篇文章。
3. 完成正文、题目、句法、词汇词组、语境同义替换与索引接入；语义自审随录入完成。
4. 以 `docs/RELEASE_CHECKLIST.md` 为唯一执行清单：内容导入运行一次 `npm run quality:content` 与一次 `npm run build`；修复失败后仅重跑受影响检查。
5. 新建本篇交付报告，更新进度；不重复审计旧文章，不复制多份勾选表。
6. 审阅差异，仅提交本篇和必要索引，独立提交并推送 `origin/main`。
7. 有权限时核验该提交的 Cloudflare 部署状态；无权限则记录“推送已完成，部署未核验”，不得宣称上线成功。

同事可将 `PROMPT_FOR_FRIEND_GPT.md` 全文交给 Codex。原卷附件不会自动随 Git 克隆；缺少时请提供原文件，不要依赖上一会话的临时路径。当前接续点：2010 年英语二 Text 3（31—35）；以后以进度台账为准。

禁止把正式邮件密钥、数据库内容或验证码写入仓库和聊天。除既有 GitHub → Cloudflare 自动部署外，新增服务器、域名、网络端口或外部服务仍需单独授权。
