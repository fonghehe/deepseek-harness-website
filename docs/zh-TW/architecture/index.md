---
title: '架構'
description: 'React 元件、Next.js 路由、動畫播放和 VitePress 文件交付。'
---

# 架構

官網由本儲存庫的 React 元件、Hook 和 CSS 實作，Next.js 管理路由、SSR、元資訊和 Hydration 。品牌、字型、檔案圖示與中文 QR 碼是重複使用的靜態輸入；捕獲 HTML、上游編譯 chunk 和 Flight/字符串配合已移除。

## 元件目錄與職責

頁面入口保留在 `landing-page.tsx`，其餘元件按職責歸類，佈局、控制項、示範和 GPU 修改都有明確入口。`previews/` 將示範 JSX、容器查詢和時間軸放在一起；`graphics/` 將渲染器、幾何與著色器放在一起。文字輔助元件位於 `shared/`，共用播放 Hook 仍在 `src/hooks/use-demo-scene.ts`。使用直接模組引用，不增加統一導出文件，伺服器端與用戶端邊界、GPU 按需載入路徑都能直接讀到。

```text
src/components/
├── landing-page.tsx    # 頁面組合入口
├── layout/             # 頁頭、頁腳與品牌
├── controls/           # 語言、下載、複製與社交控制項
├── sections/           # 能力示範區與擴展卡片
├── previews/           # 五個示範元件及其 CSS 時間軸
├── motion/             # 入場、透視與 CTA 動效
├── graphics/           # Three.js 場景、著色器與幾何
├── shared/             # 標題與富文本輔助元件
└── styles/             # 設計變量、響應式佈局與 RTL
```

## 路由與根佈局

```text
src/app/(chinese)/layout.tsx              中文 lang / LTR
src/app/(chinese)/page.tsx                跳轉 /harness/
src/app/(chinese)/harness/page.tsx        中文頁面
src/app/(localized)/[locale]/layout.tsx   其他語言 lang / dir
src/app/(localized)/[locale]/harness/page.tsx 其他語言頁面
src/app/docs/[[...slug]]/route.ts         VitePress 文件交付
```

路由組不會進入 URL。每個根佈局在伺服器端輸出正確語言與方向，未知語言返回 404，`/zh/harness/` 重定向中文主路徑。原生連結進行完整文件導航，保留瀏覽器組合鍵行為。

## 一份請求與一棵元件樹

```text
請求 → 驗證語言 → LandingPage → 伺服器端內容與屬性
     → Next.js SSR → Metadata / JSON-LD → HTML
瀏覽器 → 本專案建置 chunk → Hydration控制項 → 示範與 Canvas 時鐘
```

頁面重複使用同一結構，不複製多份版面。字典作為元件屬性傳入，首次 HTML 和 Hydration 後的標籤一致。React 轉義普通字符串，`RichText` 只解釋字典約定的格式標籤，不插入任意翻譯 HTML；JSON-LD 採用腳本內容轉義。

## 元件職責

| 模組                                                      | 責任                                 |
| --------------------------------------------------------- | ------------------------------------ |
| `landing-page.tsx`                                        | 組合完整訪客路徑                     |
| `layout/header.tsx`、`controls/locale-menu.tsx`           | 品牌、響應式選單、語言與焦點         |
| `controls/download-menu.tsx`、`controls/copy-command.tsx` | 真實下載地址與複製                   |
| `previews/desktop-preview.tsx`                            | 桌面窗體、側欄、會話與輸入框示意     |
| `sections/capability-demos.tsx`                           | 外掛、文件、計畫任務與軌跡四個場景   |
| `use-demo-scene.ts`                                       | 可見性、前背景、使用者暫停與播放控制 |
| `sections/feature-section.tsx`                            | 由伺服器端 JSX 輸出原生詳情卡片      |
| `graphics/particle-field.tsx`                             | Three.js 按需場景與資源清理          |
| `layout/footer.tsx`                                       | 中文微信QR 碼，其他語言 X 連結       |
| `styles/harness.css`                                      | 設計變量、響應式、RTL 與動畫         |

伺服器端元件處理內容和組合，用戶端元件處理瀏覽器狀態與事件。互動邏輯可從原始碼直接維護，無隱藏的原站編譯應用依賴。

## 示範生命週期

每張卡片觀察可見性、文件前背景與減少動態效果偏好，再結合顯式暫停形成一個執行條件。瀏覽器透過 animation-play-state 保存 CSS 時間線位置，無需 React 定時推進階段或反復渲染。工作流程在故事動畫完成一輪時切換場景；卸載釋放觀察器與媒體監聽。

CSS 動畫遵守 `data-running`，暫停或離屏保持位置，不因每次滾動重啟。四種示範是可控的說明場景，不會真的建立任務或安裝外掛。軌跡詳情按原時間線切換，暫停按鈕具有本機化可瀏覽名稱。

減少動態效果時也取消入場動畫，最終內容仍應可見。驗收既檢查動畫停止，也檢查標題沒有被固定在初始透明狀態。

## 粒子背景

`ParticleField` 在可見且位於前景時載入場景模組。首屏使用 `RawShaderMaterial` 和流體 GLSL，生態區域的方塊使用 `InstancedBufferGeometry`。支援的環境透過 `compileAsync` 非同步準備著色器。

渲染最多 30fps，使用 CSS 像素解析度。離屏或進入背景時停止，減少動態效果時跳過 GPU 分配。卸載時釋放幾何體、材質、紋理和渲染器。行動版停用 CTA 畫布，WebGL 無法使用時保留 CSS 背景。

Framer Motion 處理頁頭彈簧、入場和捲動透視。四組示範使用 CSS 時間軸，暫停時保留進度：

| 示範     | 週期    |
| -------- | ------- |
| 外掛     | 22 秒   |
| 檔案     | 17.5 秒 |
| 工作流程 | 11 秒   |
| 軌跡     | 15 秒   |

## 共享設定與 RTL

語言註冊表連接原生名稱、語言語義、方向、官網/文件路徑與分享 locale。網站、VitePress、hreflang 和 sitemap 共用它。`product.json` 維護儲存庫、下載和社交目的地址。

阿拉伯語在伺服器端設 RTL，邏輯 CSS 定位選單和卡片控制項，技術程式碼保持隔離 LTR。官網切換保留參數和片段，文件切換保留文章。原生語言控制項增強 Escape、外部關閉和焦點恢復。

## 網站 SEO 與文件快取

`website-metadata.ts` 使用 Next.js Metadata API 輸出本機化元資訊、canonical、alternate、分享內容和黑色圖示；公開來源由 `SITE_URL` 或預覽請求確定。官網元件由框架渲染，不再套手寫 HTML 快取。

`document-cache.ts` 只保護已建置文件，最多 128 項、TTL 五分鐘，合併併發、剔除失敗，鍵包含來源和文章路徑。弱 ETag 支援空體 304；跨域和跨語言不能共享錯誤 canonical。

## 文件建置與交付

```sh
pnpm docs:dev
pnpm docs:build
pnpm build
```

VitePress/Vue 生成忽略的 `public/docs`，Next.js 隨後建置並同源提供文章。生產、獨立開發和預覽的文件入口預設英文。Vue 主題在用戶端導航更新方向和 SEO 節點，取消過時更新。描述與共享 JSON 對齊。

提交 React/CSS、字典、Markdown、設定和靜態輸入，忽略 `.next`、生成文件、快取和報告。`tests/fixtures/assets.json` 記錄剩餘輸入，只讀檢查會阻止舊捕獲執行環境重新出現。

## 仍需驗收的邊界

原始碼所有權讓互動可讀，但不能自動證明完全的視覺還原、全部瀏覽器流程或更低移動端耗時。應對照桌面與 390px 畫面、四個示範、鍵盤、減少動態效果、無腳本閱讀和社交入口。歷史效能記錄描述舊實作，新元件需要單獨測量。

繼續[前端工程亮點](../highlights/)與[學習路徑](../learning/)完成原始碼實踐。

## 官網公開發佈

GitHub Pages 將官網和全部文件發佈為靜態文件。`pnpm build:pages` 使用實際部署 URL 和儲存庫路徑前綴，`pnpm check:pages` 驗證本機連結與 SEO。正常 Next.js 伺服器端模式繼續保留。按請求生成的來源資訊、應用快取響應頭和文件條件 ETag 屬於伺服器端交付；Pages 在建置時確定中繼資料。發佈步驟見 `DEVELOPMENT.md`。

## 明確渲染與部署邊界

文件和執行軌跡的靜態圖形由伺服器端渲染。播放控制項和切換場景的工作流程使用用戶端元件。最大的外掛 SVG 樹保留用戶端邊界，避免 HTML/RSC 序列化過大。移動邊界前，應同時比較 HTML 和瀏覽器腳本體積。

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
