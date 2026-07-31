# 天公壇公園景點網站

Astro + Tailwind CSS + TypeScript 的多頁景點網站，部署目標為 Cloudflare Workers。網站不使用資料庫、登入或 CMS，所有資料都寫在 `src/data/site.ts`。

## 主要功能

- 繁體中文單語網站
- 首頁、遊園指南、交通停車、照片牆、行程工具、FAQ 多頁架構
- GA4：`G-HXM22WWPKP`
- JSON-LD：TouristAttraction / LocalBusiness / FAQPage
- Google 地圖 iframe 已使用 `zh-TW` 與 `tw`
- 照片牆：本機圖片、響應式大圖網格、懶載入、點擊放大
- 行程清單：localStorage 本地收藏，不上傳
- 景點紀念卡：Canvas 本地合成與 PNG 下載，不上傳照片
- footer 非官方聲明

## 域名配置

站點域名只在 `astro.config.mjs` 的 `configuredSite` 設定。尚未確定域名時保持空字串，專案仍可構建；canonical、Open Graph 絕對 URL 與 sitemap 會優雅降級或不啟用。域名確定後，只需把正式網址填入同一處並重新構建。

## 本地開發

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm build
```

## Cloudflare Workers

```bash
corepack pnpm deploy
```

## 注意

圖片已存放於 `public/images`，頁面不引用外部圖片；第三方腳本只保留使用者指定的 GA4。地圖 iframe 屬於使用者要求嵌入內容。
