# 从这里开始

这是“真题句读”的持续维护入口。GitHub 仓库是唯一代码源，`main` 分支已连接 Cloudflare；用户已明确授权按“一篇文章一个提交”的方式持续精审、检查、推送和自动部署。

## 最快测试方法（Windows）

1. 安装 Node.js 22 或更高版本。
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

1. 一次只处理一篇。
2. 逐字核对正文、题干、选项、标点和题号。
3. 完成句子、单词、词组和题目全部精审。
4. 执行 `npm run quality`。
5. 依据 `docs/CHANGE_REPORT_TEMPLATE.md` 在 `docs/change-reports/` 新建本篇报告。
6. 按 `docs/RELEASE_CHECKLIST.md` 完成交付自审，并测试手机与电脑页面。
7. 更新 `docs/IMPORT_PROGRESS.md`。
8. 只提交本篇及必要索引，形成独立 Git 提交并推送 `origin/main`。
9. 核验 Cloudflare 线上版本后，再开始下一篇。

禁止把正式邮件密钥、数据库内容或验证码写入仓库和聊天。除既有 GitHub → Cloudflare 自动部署外，新增服务器、域名、网络端口或外部服务仍需单独授权。
