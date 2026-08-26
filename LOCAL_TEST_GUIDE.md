# 本地测试说明

## 电脑单机测试

- 地址：`http://localhost:5173`
- 默认不发送邮件、不登录、不连接公网数据库。
- 学习记录保存在浏览器本地；清除浏览器站点数据会删除这些记录。
- 不要使用浏览器无痕模式做长期测试。

## 同一 Wi-Fi 手机测试

1. 双击 `START_LAN_TEST_WINDOWS.bat`。
2. 在 `ipconfig` 输出中找到电脑的 IPv4 地址，例如 `192.168.1.20`。
3. 手机访问 `http://192.168.1.20:5173`。
4. 只允许 Windows 防火墙的专用网络，不允许公用网络。

该方式只在局域网内使用。不要配置路由器端口转发、DMZ、内网穿透或公网防火墙放行。

## 运行质量检查

Windows 直接运行环境如果没有 Bash，可使用 Docker：

```powershell
docker compose -f docker-compose.local.yml run --rm app npm run quality
```

内容检查也可以直接运行：

```powershell
npm run quality:content
```

## 停止 Docker 测试

双击 `STOP_LOCAL_TEST_DOCKER.bat`，或执行：

```powershell
docker compose -f docker-compose.local.yml down
```

## 测试数据

- 浏览器学习记录：浏览器 `localStorage`。
- Docker/本地数据库模拟数据：项目的 `local-data/`。
- `local-data/`、`.env*`、密钥和依赖目录不得交给其他人或提交到代码仓库。
