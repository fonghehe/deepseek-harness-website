---
title: '架构'
description: 'React 组件、Next.js 路由、动画播放和 VitePress 文档交付。'
---

# 架构

官网由本仓库的 React 组件、Hook 和 CSS 实现，Next.js 管理路由、SSR、元信息和水合。品牌、字体、文件图标与中文二维码是复用的静态输入；捕获 HTML、上游编译 chunk 和 Flight/字符串适配已移除。

## 组件目录与职责

页面入口保留在 `landing-page.tsx`，其余组件按职责归类，布局、控件、演示和 GPU 修改都有明确入口。`previews/` 将演示 JSX、容器查询和时间轴放在一起；`graphics/` 将渲染器、几何与着色器放在一起。文字辅助组件位于 `shared/`，共用播放 Hook 仍在 `src/hooks/use-demo-scene.ts`。使用直接模块引用，不增加统一导出文件，服务端与客户端边界、GPU 按需加载路径都能直接读到。

```text
src/components/
├── landing-page.tsx    # 页面组合入口
├── layout/             # 页头、页脚与品牌
├── controls/           # 语言、下载、复制与社交控件
├── sections/           # 能力演示区与扩展卡片
├── previews/           # 五个演示组件及其 CSS 时间轴
├── motion/             # 入场、透视与 CTA 动效
├── graphics/           # Three.js 场景、着色器与几何
├── shared/             # 标题与富文本辅助组件
└── styles/             # 设计变量、响应式布局与 RTL
```

## 路由与根布局

```text
src/app/(chinese)/layout.tsx              中文 lang / LTR
src/app/(chinese)/page.tsx                跳转 /harness/
src/app/(chinese)/harness/page.tsx        中文页面
src/app/(localized)/[locale]/layout.tsx   其他语言 lang / dir
src/app/(localized)/[locale]/harness/page.tsx 其他语言页面
src/app/docs/[[...slug]]/route.ts         VitePress 文档交付
```

路由组不会进入 URL。每个根布局在服务端输出正确语言与方向，未知语言返回 404，`/zh/harness/` 重定向中文主路径。原生链接进行完整文档导航，保留浏览器组合键行为。

## 请求流程

```text
请求 → 校验语言 → LandingPage → 服务端内容与属性
     → Next.js SSR → Metadata / JSON-LD → HTML
浏览器 → 本项目构建 chunk → 水合控件 → 演示与 Canvas 时钟
```

页面复用同一结构，不复制多份布局。字典作为组件属性传入，首次 HTML 和水合后的标签一致。React 转义普通字符串，`RichText` 只解释字典约定的格式标签，不插入任意翻译 HTML；JSON-LD 采用脚本内容转义。

## 组件职责

| 模块                                                      | 责任                               |
| --------------------------------------------------------- | ---------------------------------- |
| `landing-page.tsx`                                        | 组合完整访客路径                   |
| `layout/header.tsx`、`controls/locale-menu.tsx`           | 品牌、响应式菜单、语言与焦点       |
| `controls/download-menu.tsx`、`controls/copy-command.tsx` | 真实下载地址与复制                 |
| `previews/desktop-preview.tsx`                            | 桌面窗体、侧栏、会话与输入框示意   |
| `sections/capability-demos.tsx`                           | 插件、文件、计划任务与轨迹四个场景 |
| `use-demo-scene.ts`                                       | 可见性、前后台、用户暂停与播放控制 |
| `sections/feature-section.tsx`                            | 由服务端 JSX 输出原生详情卡片      |
| `graphics/particle-field.tsx`                             | Three.js 按需场景与资源清理        |
| `layout/footer.tsx`                                       | 中文微信二维码，其他语言 X 链接    |
| `styles/harness.css`                                      | 设计变量、响应式、RTL 与动画       |

服务端组件处理内容和组合，客户端组件处理浏览器状态与事件。交互逻辑可从源码直接维护，无隐藏的原站编译应用依赖。

## 演示生命周期

每张卡片观察可见性、文档前后台与减少动态效果偏好，再结合显式暂停形成一个运行条件。浏览器通过 animation-play-state 保存 CSS 时间线位置，无需 React 定时推进阶段或反复渲染。工作流在故事动画完成一轮时切换场景；卸载释放观察器与媒体监听。

CSS 动画遵守 `data-running`，暂停或离屏保持位置，不因每次滚动重启。四种演示是可控的说明场景，不会真的创建任务或安装插件。轨迹详情按原时间线切换，暂停按钮具有本地化可访问名称。

减少动态效果时也取消入场动画，最终内容仍应可见。验收既检查动画停止，也检查标题没有被固定在初始透明状态。

## 粒子背景

`ParticleField` 在可见且位于前台时加载场景模块。首屏使用 `RawShaderMaterial` 和流体 GLSL，生态区域的方块使用 `InstancedBufferGeometry`。支持的环境通过 `compileAsync` 异步准备着色器。

渲染最多 30fps，使用 CSS 像素分辨率。离屏或进入后台时停止，减少动态效果时跳过 GPU 分配。卸载时释放几何体、材质、纹理和渲染器。移动端禁用 CTA 画布，WebGL 不可用时保留 CSS 背景。

Framer Motion 处理页头弹簧、入场和滚动透视。四组演示使用 CSS 时间轴，暂停时保留进度：

| 演示   | 周期    |
| ------ | ------- |
| 插件   | 22 秒   |
| 文件   | 17.5 秒 |
| 工作流 | 11 秒   |
| 轨迹   | 15 秒   |

## 共享配置与 RTL

语言注册表连接原生名称、语言语义、方向、官网/文档路径与分享 locale。网站、VitePress、hreflang 和 sitemap 共用它。`product.json` 维护仓库、下载和社交目的地址。

阿拉伯语在服务端设 RTL，逻辑 CSS 定位菜单和卡片控件，技术代码保持隔离 LTR。官网切换保留参数和片段，文档切换保留文章。原生语言控件增强 Escape、外部关闭和焦点恢复。

## 网站 SEO 与文档缓存

`website-metadata.ts` 使用 Next.js Metadata API 输出本地化元信息、canonical、alternate、分享内容和黑色图标；公开来源由 `SITE_URL` 或预览请求确定。官网组件由框架渲染，不再套手写 HTML 缓存。

`document-cache.ts` 只保护已构建文档，最多 128 项、TTL 五分钟，合并并发、剔除失败，键包含来源和文章路径。弱 ETag 支持空体 304；跨域和跨语言不能共享错误 canonical。

## 文档构建与交付

```sh
pnpm docs:dev
pnpm docs:build
pnpm build
```

VitePress/Vue 生成忽略的 `public/docs`，Next.js 随后构建并同源提供文章。生产、独立开发和预览的文档入口默认英文。Vue 主题在客户端导航更新方向和 SEO 节点，取消过时更新。描述与共享 JSON 对齐。

提交 React/CSS、字典、Markdown、配置和静态输入，忽略 `.next`、生成文档、缓存和报告。`tests/fixtures/assets.json` 记录剩余输入，只读检查会阻止旧捕获运行时重新出现。

## 人工检查

源码所有权让交互可读，但不能自动证明完全的视觉还原、全部浏览器流程或更低移动端耗时。应对照桌面与 390px 画面、四个演示、键盘、减少动态效果、无脚本阅读和社交入口。历史性能记录描述旧实现，新组件需要单独测量。

继续[前端工程亮点](../highlights/)与[学习路径](../learning/)完成源码实践。

## 官网公开发布

GitHub Pages 将官网和全部文档发布为静态文件。`pnpm build:pages` 使用实际部署 URL 和仓库路径前缀，`pnpm check:pages` 验证本地链接与 SEO。正常 Next.js 服务端模式继续保留。按请求生成的来源信息、应用缓存响应头和文档条件 ETag 属于服务端交付；Pages 在构建时确定元数据。发布步骤见 `DEVELOPMENT.md`。

## 服务端与客户端组件

文件和执行轨迹的静态图形由服务端渲染。播放控件和切换场景的工作流使用客户端组件。最大的插件 SVG 树保留客户端边界，避免 HTML/RSC 序列化过大。移动边界前，应同时比较 HTML 和浏览器脚本体积。

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
