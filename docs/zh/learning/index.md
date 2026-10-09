---
title: '学习路径'
description: '源码阅读顺序，以及六个网站修改与验证练习。'
---

# 学习路径

先看页面，再追踪对应源码。下面六个练习分别修改或检查卡片、语言、缓存、动效、文档元信息和资源。

## 阶段一：先理解体验

打开英文官网，沿分区阅读、展开卡片、切换语言，再在窄屏阿拉伯语页面中重复。使用键盘和减少动态效果，禁用 JavaScript 检查阅读路径。随后阅读语言注册表、内容 JSON、`styles/harness.css` 和 `controls/locale-menu.tsx`。

产出一份访客路径和状态清单，说明首屏、演示、详情与行动之间的关系，以及原生控件与脚本增强的职责。

## 阶段二：追踪一份响应

依次阅读语言页面、根布局、`landing-page.tsx`、`sections/feature-section.tsx` 和 `website-metadata.ts`。比较响应 HTML 与水合后 DOM，区分服务端内容和客户端事件；Next.js 管理序列化，无需修改 Flight 或捕获模板。

产出包含语言、来源、服务端组件、元信息与水合的流程图。解释共同字典与 JSX 如何避免两份渲染逻辑；另行追踪文档的缓存与 ETag。

## 阶段三：理解文档交付

阅读 VitePress 配置、Vue 主题、共享描述和文档路由。分别运行独立开发、构建和 Next.js 交付，比较首次加载与客户端导航后的元信息。

明确静态生成、服务端 SEO 注入和客户端 SEO 更新的边界，解释文档使用 Vue 与官网使用 React 的分工。

## 实践一：修改卡片

选择现有卡片，优化多语言标题与细节，保留稳定 ID 和链接。追踪服务端 `FeatureSection` 的 JSX，保留原生折叠，不复制另一套客户端模板。运行翻译检查和构建，验证水合前后、阿拉伯语窄屏、无脚本折叠以及四个原演示。

检查卡片在水合后仍显示相同译文，四组演示也能正常运行。

## 实践二：检查语言配置

选阿拉伯语与日语，从注册表追踪到路径、`lang`、`dir`、文档入口、可访问标签、元信息和 sitemap。官网切换时携带查询参数与片段，文档切换时停留在架构文章。

列出新增一种语言需要修改的文件，包括字典、共享描述和五篇文章。人工检查混排命令的标点和长标签换行。

## 实践三：检查 ETag 与缓存隔离

启动生产服务，复制首次请求返回的实际 ETag，再进行条件请求：

```sh
curl -i http://localhost:3100/docs/en/architecture/
curl -i -H 'If-None-Match: W/"COPY_THE_RETURNED_HASH"' http://localhost:3100/docs/en/architecture/
curl -i -H 'Host: preview.example' http://localhost:3100/docs/en/architecture/
```

占位值必须换成真实 ETag。仅匹配文档返回空体 `304`。另一个语言或未配置 `SITE_URL` 的不同预览 host，应有自己的 canonical 与 ETag。

解释热缓存为何不能消除 JS 执行、失败渲染为何移除、静态输入为何需重新验证而内容 hash 构建 chunk 可以 immutable。

## 实践四：检查减少动态效果

比较正常与减少动态效果的首屏。取消入场动画后内容必须保持可见，不能停留在初始 `opacity: 0`。同时检查演示暂停和装饰 Canvas 不分配。

阅读无障碍与粒子测试，解释前台/可见条件、30fps 和像素密度限制。在相同条件下记录前后测量，避免从单次噪声结论宣称性能提升，或为了分数破坏正常演示。

## 实践五：检查导航后的元信息

同步修改一篇文章多语言描述和 frontmatter，构建后跨文章、跨阿拉伯语/英语 导航。逐步检查标题、描述、canonical、分享 URL、alternate 与方向。

检查上一篇文章的 SEO 节点是否已删除，并追踪主题的清理和取消更新逻辑。

## 实践六：修改演示场景

阅读演示组件、`use-demo-scene.ts`、`graphics/particle-field.tsx` 和 `tests/fixtures/assets.json`。改变一处演示过渡，保持用户暂停与可见性逻辑；静态输入变化才评审更新 hash。构建后检查产物，不应再请求 `/harness-source/`。

解释为何组件、CSS 与静态输入提交，而 `.next` 与 `public/docs` 忽略，指出不同资源的缓存策略。

## 记录修改结果

记录问题、修改文件、运行的检查和剩余限制。需要时附上截图、响应或测试结果，说明修改后的行为。复用的品牌资源要注明来源。

## 实践后的检查

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm perf:check
pnpm check:links --strict
```

根据改动选择浏览器和性能检查。外部服务不可用与本地检查失败分开记录。回到[架构](../architecture/)，核对追踪到的请求流程。

## 分析一次性能改动

定位一个长任务，做一次小范围修改，再比较资源体积、交互和截图。报告保留在忽略目录。更新快照基线前先审查差异；本地快照是回归参考，不能证明与原站像素一致。

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| 术语              | 含义                               |
| ----------------- | ---------------------------------- |
| SSR               | 服务端渲染                         |
| Hydration         | 水合：让服务端 HTML 具备客户端交互 |
| Reduced motion    | 减少动态效果偏好                   |
| RTL               | 从右到左布局                       |
| Visual regression | 视觉回归测试                       |
| Resource budget   | 资源预算                           |
