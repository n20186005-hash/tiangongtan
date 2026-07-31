# 交付自檢記錄

本專案已完成下列本地靜態檢查：

- `pnpm-workspace.yaml` 已包含根專案套件與依賴建構政策。
- 套件依賴使用精確版本號，未使用 `latest`、`*`、`^` 或 `~`。
- `packageManager` 固定為 `pnpm@11.18.0`。
- `engines.node` 採用 Astro 7 的最低需求 `>=22.12.0`，`.node-version` 保留建議版本 24.18.1。
- 原始碼未出現 `example.com`、`localhost`、`chrome-extension://`。
- sitemap 僅在 `astro.config.mjs` 的 `configuredSite` 有值時啟用，未手寫 URL 清單或 `lastmod`。

## 已通過項目

- `pnpm install`：依賴與 lockfile 同步完成。
- `pnpm dev`：本地伺服器正常啟動，首頁回傳 HTTP 200。
- `pnpm check`：0 errors、0 warnings、0 hints。
- `pnpm build`：Cloudflare Workers 生產構建成功。
- `wrangler deploy --dry-run`：部署設定、Worker 模組與靜態資產驗證成功。
