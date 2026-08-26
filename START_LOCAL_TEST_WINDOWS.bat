@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [需要安装] 请先安装 Node.js 22 或更高版本，然后重新双击本文件。
  echo https://nodejs.org/
  pause
  exit /b 1
)

node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>22||(a===22&&b>=13)?0:1)"
if errorlevel 1 (
  echo [版本过低] 项目需要 Node.js 22.13 或更高版本。
  pause
  exit /b 1
)

if not exist node_modules\.bin\vite.cmd (
  echo 首次运行，正在安装项目依赖……
  call npm ci
  if errorlevel 1 (
    echo 依赖安装失败，请把本窗口完整报错交给维护项目的 GPT/Codex。
    pause
    exit /b 1
  )
)

echo 本地测试地址：http://localhost:5173
echo 停止测试：在本窗口按 Ctrl+C。
start "" http://localhost:5173
call npm run dev:local
