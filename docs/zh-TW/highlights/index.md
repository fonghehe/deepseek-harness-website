---
title: '前端工程亮點'
description: '頁面控制項、多語言、動畫、SEO 和資源管理的實作說明。'
---

# 前端工程亮點

下面按頁面版面、控制項、多語言和渲染介紹具體實作，並列出相關原始碼或檢查方法。

## 1. 頁面分區

首屏放標題和下載入口，四組示範展示使用情境，卡片補充細節。訪客不必播放所有動畫也能閱讀頁面。

## 2. 共用卡片

`sections/feature-section.tsx` 從 `src/i18n/site-content.json` 讀取卡片內容。卡片沿用頁面的字型和間距，原有示範繼續保留。

## 3. 本地資源

品牌圖片、字型、檔案圖示和微信 QR 碼在本地提供。`NOTICE.md` 記錄來源，`tests/fixtures/assets.json` 記錄校驗值。測量頁面大小時也要算上這些檔案。

## 4. 語言註冊表

`src/i18n/locales.json` 為網站、文件和 SEO 提供路由、名稱、語言標籤與閱讀方向。驗證工具檢查鍵名、預留位置和文章覆蓋；措辭與換行仍需人工檢查。

## 5. RTL 樣式

阿拉伯語、希伯來語、波斯語和烏爾都語使用 RTL。邏輯 CSS 屬性定位選單和卡片，程式碼與命令保持 LTR。窄螢幕檢查要包含混排文字、標點和長選單名稱。

## 6. 原生控制項

語言選單和詳細資料卡片使用原生折疊控制項及實際連結。JavaScript 補充 Escape、外部點擊關閉、焦點恢復和 URL 參數、片段保留。

## 7. SSR 與 Hydration

選取的字典傳入 `LandingPage`，伺服器端渲染和 Hydration 使用同一份 JSX。瀏覽器測試在指令碼載入後檢查可見譯文，包括示範裡的訊息。

## 8. 動畫播放與資源清理

`use-demo-scene.ts` 綜合可見性、前景與背景狀態、動態效果偏好和使用者暫停狀態。CSS 保存播放進度。Three.js 背景離屏後停止，卸載時釋放 GPU 資源，細節見[架構](../architecture/)。

## 9. 中繼資料更新

Next.js 在回應裡輸出本地化中繼資料、canonical、語言連結和分享資訊。文件切換文章或語言後，VitePress 主題繼續更新這些內容。

## 10. 文件快取

文件快取區分來源和文章路徑，限制項目數量、合併並行渲染並清除失敗項。ETag 測試同時檢查符合時的 `304`，以及不同網域和語言之間的隔離。

## 11. 資源校驗

`check:assets` 校驗靜態輸入，並拒絕擷取的執行程式檔案。`pnpm build` 生成網站的 JS 和 CSS。原始碼與靜態輸入提交到 Git，`.next` 和生成文件保持忽略。

## 12. 檢查工具

Oxlint 檢查程式碼，Oxfmt 檢查格式，Playwright 執行瀏覽器操作，axe 檢查部分無障礙規則，Lighthouse 測量實驗室效能。`pnpm verify` 執行確定性檢查，`verify:full` 增加瀏覽器和效能檢查。

## 亮點之外的客觀邊界

檢查真實手機、鍵盤與螢幕閱讀器操作、譯文，以及與原站的畫面比較。目前建置的效能需要重新測量，附日期的報告只說明當時版本的結果。

檢查清單見[官網建設要點](../requirements/)，原始碼練習見[學習路徑](../learning/)。

## 以證據優化效能

裝飾圖形等待字型與首屏入場結束，經過繪制和空閒任務後初始化。恆定為零的 flow-map 分支已移除，輸出保持一致。幀計數只在顯式分析時啟用；離屏與背景暫停、30fps、減少動態效果和 GPU 清理繼續保留。分別審計 Node 與 Pages，並結合重複實驗和真實設備判斷效果。

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
