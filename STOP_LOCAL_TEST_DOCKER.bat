@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
docker compose -f docker-compose.local.yml down
pause
