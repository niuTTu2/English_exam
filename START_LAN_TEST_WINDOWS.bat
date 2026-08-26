@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set LOCAL_LAN_TEST=1

where node >nul 2>nul
if errorlevel 1 (
  echo [需要安装] 请先安装 Node.js 22 或更高版本。
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

echo 请在下面寻找 192.168.x.x 或 10.x.x.x 形式的 IPv4 地址：
ipconfig | findstr /R /C:"IPv4"
echo.
echo 手机访问：http://电脑IPv4地址:5173
echo 只允许 Windows 防火墙的“专用网络”，不要开放公用网络或路由器端口。
call npm run dev:lan
