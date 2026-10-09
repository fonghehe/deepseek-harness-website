---
title: '概覽'
description: 'DeepSeek Harness 重現網站的頁面結構、實作方式和測試方法。'
---

# 概覽

本儲存庫用 Next.js 和 React 重現 DeepSeek Harness 網站。這份文件介紹頁面結構、元件、多語言、動畫和測試方法。文件本身由 VitePress 建置。

網站和文件支援 26 種語言。`/docs/` 預設開啟英文文件，`/harness/` 開啟簡體中文網站。每種語言的文件都有相同的五個欄目。阿拉伯語、希伯來語、波斯語和烏爾都語使用 RTL 版面。

## 頁面結構

頁面依次展示首屏標題和下載入口、桌面預覽、四組動畫示範、能力卡片和開發者區域。卡片詳細資料使用原生折疊控制項。停用 JavaScript 後，標題、連結和卡片仍可閱讀。

## 原始碼入口

| 要修改的內容         | 從哪裡看                                                          |
| -------------------- | ----------------------------------------------------------------- |
| 頁面分區與卡片       | `src/components/landing-page.tsx`、`sections/feature-section.tsx` |
| 語言名稱、路由與方向 | `src/i18n/locales.json`                                           |
| 語言選單             | `src/components/controls/locale-menu.tsx`                         |
| 版面與 RTL 樣式      | `src/components/styles/harness.css`                               |
| 動畫播放條件         | `src/hooks/use-demo-scene.ts`                                     |
| GPU 背景             | `src/components/graphics/particle-field.tsx`                      |
| 網站中繼資料         | `src/lib/website-metadata.ts`                                     |
| 文件快取             | `src/lib/document-cache.ts`                                       |
| 資源校驗             | `tests/tools/check-assets.mjs`                                    |

文件中的元件路徑預設相對於 `src/components/`，完整路徑會單獨寫出。

## 工具分工

Next.js 負責路由、伺服器端渲染和網站中繼資料。React 負責頁面元件和互動控制項。Framer Motion 處理入場與捲動效果，Three.js 繪製裝飾背景，四組示範使用 CSS 時間軸。

VitePress 使用 Vue，將文件建置到 `public/docs`，再由 Next.js 在 `/docs/` 下提供存取。相依套件版本見 `package.json` 和鎖定檔。

## 資源與版面檢查

字型、圖示和品牌圖片保存在本地。`tests/fixtures/assets.json` 記錄它們的校驗值，第三方資源歸屬見 `NOTICE.md`。

版面檢查包括長語言名稱、行動版選單、文件表格，以及 RTL 頁面裡的命令。檢查時要同時看初始 HTML 和 Hydration 後的頁面。

## 驗證方式

`pnpm verify` 檢查格式、lint、資源、翻譯、單元測試、型別和生產建置。`pnpm verify:full` 還會執行瀏覽器回歸和效能預算檢查。

每次修改都應記錄實際執行的檢查。螢幕閱讀器、真實手機、譯文品質和原站畫面比較仍需人工檢查。本地結果不能證明遠端 CI 或部署已經成功。

## 閱讀順序

- [架構](./architecture/)：路由、元件、動畫和文件交付。
- [前端工程亮點](./highlights/)：實作說明與原始碼位置。
- [官網建設要點](./requirements/)：修改和發佈前的檢查清單。
- [學習路徑](./learning/)：原始碼閱讀順序和六個練習。

可以開啟<WebsiteLink locale="zh-TW">網站</WebsiteLink>，對照頁面閱讀。
