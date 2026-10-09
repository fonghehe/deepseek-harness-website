---
title: '概览'
description: 'DeepSeek Harness 复刻网站的页面结构、实现方式和测试方法。'
---

# 概览

本仓库用 Next.js 和 React 复刻 DeepSeek Harness 网站。这份文档介绍页面结构、组件、多语言、动画和测试方法。文档本身由 VitePress 构建。

网站和文档支持 26 种语言。`/docs/` 默认打开英文文档，`/harness/` 打开简体中文网站。每种语言的文档都有相同的五个栏目。阿拉伯语、希伯来语、波斯语和乌尔都语使用 RTL 布局。

## 页面结构

页面依次展示首屏标题和下载入口、桌面预览、四组动画演示、能力卡片和开发者区域。卡片详情使用原生折叠控件。禁用 JavaScript 后，标题、链接和卡片仍可阅读。

## 源码入口

| 要修改的内容         | 从哪里看                                                          |
| -------------------- | ----------------------------------------------------------------- |
| 页面分区与卡片       | `src/components/landing-page.tsx`、`sections/feature-section.tsx` |
| 语言名称、路由与方向 | `src/i18n/locales.json`                                           |
| 语言菜单             | `src/components/controls/locale-menu.tsx`                         |
| 布局与 RTL 样式      | `src/components/styles/harness.css`                               |
| 动画播放条件         | `src/hooks/use-demo-scene.ts`                                     |
| GPU 背景             | `src/components/graphics/particle-field.tsx`                      |
| 网站元信息           | `src/lib/website-metadata.ts`                                     |
| 文档缓存             | `src/lib/document-cache.ts`                                       |
| 资源校验             | `tests/tools/check-assets.mjs`                                    |

文档中的组件路径默认相对于 `src/components/`，完整路径会单独写出。

## 工具分工

Next.js 负责路由、服务端渲染和网站元信息。React 负责页面组件和交互控件。Framer Motion 处理入场与滚动效果，Three.js 绘制装饰背景，四组演示使用 CSS 时间轴。

VitePress 使用 Vue，将文档构建到 `public/docs`，再由 Next.js 在 `/docs/` 下提供访问。依赖版本见 `package.json` 和锁文件。

## 资源与布局检查

字体、图标和品牌图片保存在本地。`tests/fixtures/assets.json` 记录它们的校验值，第三方资源归属见 `NOTICE.md`。

布局检查包括长语言名称、移动端菜单、文档表格，以及 RTL 页面里的命令。检查时要同时看初始 HTML 和水合后的页面。

## 验证方式

`pnpm verify` 检查格式、lint、资源、翻译、单元测试、类型和生产构建。`pnpm verify:full` 还会运行浏览器回归和性能预算检查。

每次修改都应记录实际运行的检查。读屏器、真实手机、译文质量和原站画面对比仍需人工检查。本地结果不能证明远端 CI 或部署已经成功。

## 阅读顺序

- [架构](./architecture/)：路由、组件、动画和文档交付。
- [前端工程亮点](./highlights/)：实现说明与源码位置。
- [官网建设要点](./requirements/)：修改和发布前的检查清单。
- [学习路径](./learning/)：源码阅读顺序和六个练习。

可以打开<WebsiteLink locale="zh">网站</WebsiteLink>，对照页面阅读。
