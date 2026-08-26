@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
  echo [需要安装] 请先安装并启动 Docker Desktop。
  pause
  exit /b 1
)

echo 本地测试地址：http://localhost:5173
start "" http://localhost:5173
docker compose -f docker-compose.local.yml up --build
