---
title: '學習路徑'
description: '原始碼閱讀順序，以及六個網站修改與驗證練習。'
---

# 學習路徑

先看頁面，再追蹤對應原始碼。下面六個練習分別修改或檢查卡片、語言、快取、動效、文件中繼資料和資源。

## 階段一：先理解體驗

開啟英文官網，沿分區閱讀、展開卡片、切換語言，再在窄螢幕阿拉伯語頁面中重複。使用鍵盤和減少動態效果，停用 JavaScript 檢查閱讀路徑。隨後閱讀語言註冊表、內容 JSON、`styles/harness.css` 和 `controls/locale-menu.tsx`。

產出一份訪客路徑和狀態清單，說明首屏、示範、詳情與行動之間的關係，以及原生控制項與腳本增強的職責。

## 階段二：追蹤一份響應

依次閱讀語言頁面、根佈局、`landing-page.tsx`、`sections/feature-section.tsx` 和 `website-metadata.ts`。比較響應 HTML 與 Hydration 後 DOM，區分伺服器端內容和用戶端事件；Next.js 管理序列化，無需修改 Flight 或捕獲模板。

產出包含語言、來源、伺服器端元件、元資訊與 Hydration 的流程圖。解釋共同字典與 JSX 如何避免兩份渲染邏輯；另行追蹤文件的快取與 ETag。

## 階段三：理解文件交付

閱讀 VitePress 設定、Vue 主題、共享描述和文件路由。分別執行獨立開發、建置和 Next.js 交付，比較首次載入與用戶端導航後的元資訊。

明確靜態生成、伺服器端 SEO 注入和用戶端 SEO 更新的邊界，解釋文件使用 Vue 與官網使用 React 的分工。

## 實踐一：修改卡片

選擇現有卡片，優化多語言標題與細節，保留穩定 ID 和連結。追蹤伺服器端 `FeatureSection` 的 JSX，保留原生折疊，不複製另一套用戶端模板。執行翻譯檢查和建置，驗證 Hydration 前後、阿拉伯語窄螢幕、無腳本折疊以及四個原示範。

檢查卡片在 Hydration 後仍顯示相同譯文，四組示範也能正常執行。

## 實踐二：檢查語言設定

選阿拉伯語與日語，從註冊表追蹤到路徑、`lang`、`dir`、文件入口、可瀏覽標籤、元資訊和 sitemap。官網切換時攜帶查詢參數與片段，文件切換時停留在架構文章。

列出新增一種語言需要修改的檔案，包括字典、共用描述和五篇文章。人工檢查混排命令的標點和長標籤換行。

## 實踐三：檢查 ETag 與快取隔離

啟動生產服務，複製首次請求返回的實際 ETag，再進行條件請求：

```sh
curl -i http://localhost:3100/docs/en/architecture/
curl -i -H 'If-None-Match: W/"COPY_THE_RETURNED_HASH"' http://localhost:3100/docs/en/architecture/
curl -i -H 'Host: preview.example' http://localhost:3100/docs/en/architecture/
```

佔位值必須換成真實 ETag。僅匹配文件返回空體 `304`。另一個語言或未設定 `SITE_URL` 的不同預覽 host，應有自己的 canonical 與 ETag。

解釋熱快取為何不能消除 JS 執行、失敗渲染為何移除、靜態輸入為何需重新驗證而內容 hash 建置 chunk 可以 immutable。

## 實踐四：檢查減少動態效果

比較正常與減少動態效果的首屏。取消入場動畫後內容必須保持可見，不能停留在初始 `opacity: 0`。同時檢查示範暫停和裝飾 Canvas 不分配。

閱讀無障礙與粒子測試，解釋前台/可見條件、30fps 和像素密度限制。在相同條件下記錄前後測量，避免從單次噪聲結論宣稱效能提升，或為了分數破壞正常示範。

## 實踐五：檢查導覽後的中繼資料

同步修改一篇文章多語言描述和 frontmatter，建置後跨文章、跨阿拉伯語/英語 導航。逐步檢查標題、描述、canonical、分享 URL、alternate 與方向。

檢查上一篇文章的 SEO 節點是否已刪除，並追蹤主題的清理和取消更新邏輯。

## 實踐六：修改示範情境

閱讀示範元件、`use-demo-scene.ts`、`graphics/particle-field.tsx` 和 `tests/fixtures/assets.json`。改變一處示範過渡，保持使用者暫停與可見性邏輯；靜態輸入變化才評審更新 hash。建置後檢查產物，不應再請求 `/harness-source/`。

解釋為何元件、CSS 與靜態輸入提交，而 `.next` 與 `public/docs` 忽略，指出不同資源的快取策略。

## 如何形成有證據的專案介紹

記錄問題、修改檔案、執行的檢查和剩餘限制。需要時附上截圖、回應或測試結果，說明修改後的行為。重複使用的品牌資源要註明來源。

## 實踐後的檢查

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm perf:check
pnpm check:links --strict
```

根據改動選擇瀏覽器和效能檢查。外部服務無法使用與本地檢查失敗分開記錄。回到[架構](../architecture/)，核對追蹤到的請求流程。

## 追蹤一次完整改進

定位一個長任務，做一次小範圍修改，再比較資源大小、互動和截圖。報告保留在忽略目錄。更新快照基線前先審查差異；本機快照是回歸參考，不能證明與原站像素一致。

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| 術語              | 含義                                      |
| ----------------- | ----------------------------------------- |
| SSR               | 伺服器端渲染                              |
| Hydration         | Hydration：讓伺服器端 HTML 具備用戶端互動 |
| Reduced motion    | 減少動態效果偏好                          |
| RTL               | 從右到左佈局                              |
| Visual regression | 視覺回歸測試                              |
| Resource budget   | 資源預算                                  |
