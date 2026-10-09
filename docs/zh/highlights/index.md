---
title: '前端工程亮点'
description: '页面控件、多语言、动画、SEO 和资源管理的实现说明。'
---

# 前端工程亮点

下面按页面布局、控件、多语言和渲染介绍具体实现，并列出相关源码或检查方法。

## 1. 页面分区

首屏放标题和下载入口，四组演示展示使用场景，卡片补充细节。访客不必播放所有动画也能阅读页面。

## 2. 共享卡片

`sections/feature-section.tsx` 从 `src/i18n/site-content.json` 读取卡片内容。卡片沿用页面的字体和间距，原有演示继续保留。

## 3. 本地资源

品牌图片、字体、文件图标和微信二维码在本地提供。`NOTICE.md` 记录来源，`tests/fixtures/assets.json` 记录校验值。测量页面体积时也要算上这些文件。

## 4. 语言注册表

`src/i18n/locales.json` 为网站、文档和 SEO 提供路由、名称、语言标签与阅读方向。校验器检查键名、占位符和文章覆盖；措辞与换行仍需人工检查。

## 5. RTL 样式

阿拉伯语、希伯来语、波斯语和乌尔都语使用 RTL。逻辑 CSS 属性定位菜单和卡片，代码与命令保持 LTR。窄屏检查要包含混排文本、标点和长菜单名称。

## 6. 原生控件

语言菜单和详情卡片使用原生折叠控件及真实链接。JavaScript 补充 Escape、外部点击关闭、焦点恢复和 URL 参数、片段保留。

## 7. SSR 与水合

选中的字典传入 `LandingPage`，服务端渲染和水合使用同一份 JSX。浏览器测试在脚本加载后检查可见译文，包括演示里的消息。

## 8. 动画播放与资源清理

`use-demo-scene.ts` 综合可见性、前后台、动态效果偏好和用户暂停状态。CSS 保存播放进度。Three.js 背景离屏后停止，卸载时释放 GPU 资源，细节见[架构](../architecture/)。

## 9. 元信息更新

Next.js 在响应里输出本地化元信息、canonical、语言链接和分享信息。文档切换文章或语言后，VitePress 主题继续更新这些内容。

## 10. 文档缓存

文档缓存区分来源和文章路径，限制条目数量、合并并发渲染并清除失败项。ETag 测试同时检查匹配时的 `304`，以及不同域名和语言之间的隔离。

## 11. 资源校验

`check:assets` 校验静态输入，并拒绝捕获的运行时文件。`pnpm build` 生成网站的 JS 和 CSS。源码与静态输入提交到 Git，`.next` 和生成文档保持忽略。

## 12. 检查工具

Oxlint 检查代码，Oxfmt 检查格式，Playwright 运行浏览器操作，axe 检查部分无障碍规则，Lighthouse 测量实验室性能。`pnpm verify` 运行确定性检查，`verify:full` 增加浏览器和性能检查。

## 需要人工检查的项目

检查真实手机、键盘与读屏器操作、译文，以及与原站的画面对比。当前构建的性能需要重新测量，带日期的报告只说明当时版本的结果。

检查清单见[官网建设要点](../requirements/)，源码练习见[学习路径](../learning/)。

## 背景初始化

装饰图形等待字体与首屏入场结束，经过绘制和空闲任务后初始化。恒定为零的 flow-map 分支已移除，输出保持一致。帧计数只在显式分析时启用；离屏与后台暂停、30fps、减少动态效果和 GPU 清理继续保留。分别审计 Node 与 Pages，并结合重复实验和真实设备判断效果。

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
