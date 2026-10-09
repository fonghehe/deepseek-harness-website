---
title: 'البنية'
description: 'مكونات React ومسارات Next.js وتشغيل الحركة وتسليم وثائق VitePress.'
---

# البنية

يُبنى الموقع من مكونات React وHooks وCSS التي يديرها هذا المستودع. يتولى Next.js العرض على الخادم (SSR) والتهيئة التفاعلية. لا يُحمّل الموقع HTML ملتقطاً أو تطبيقاً مجمعاً من الموقع الأصلي. وتُستخدم صور العلامة والخطوط وأيقونات الملفات ورمز WeChat QR كموارد ثابتة.

## مجلدات المكونات

تبقى نقطة دخول الصفحة في `landing-page.tsx`، وتُجمع المكونات حسب مسؤوليتها: التخطيط، عناصر التحكم، العروض وGPU. يجمع `previews/` شيفرة JSX واستعلامات الحاوية والخطوط الزمنية، ويجمع `graphics/` العارض والهندسة وبرامج التظليل. تبقى مساعدات النص في `shared/` وخطاف التشغيل المشترك في `src/hooks/use-demo-scene.ts`. تشير الاستيرادات إلى الوحدات مباشرة دون ملف إعادة تصدير مركزي، حتى تظهر حدود الخادم والعميل ومسارات التحميل المؤجل للرسومات بوضوح.

```text
src/components/
├── landing-page.tsx    # تركيب الصفحة
├── layout/             # الرأس والتذييل والعلامة
├── controls/           # اللغة والتنزيل والنسخ والتواصل
├── sections/           # أقسام العروض والبطاقات التفصيلية
├── previews/           # خمسة عروض وخطوطها الزمنية في CSS
├── motion/             # الدخول والمنظور وحركة CTA
├── graphics/           # مشاهد Three.js والهندسة وبرامج التظليل
├── shared/             # العناوين والنص المنسق
└── styles/             # متغيرات التصميم والتجاوب وRTL
```

## تركيب المكونات

```text
page.tsx → locale + dictionary → LandingPage → Next.js SSR
layout.tsx → html lang / dir
browser → generated chunks → client events / demo state
/docs/ → /docs/en/ → VitePress article
```

| المكون                           | المصدر                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| الرأس واللغة والتنزيلات          | `layout/header.tsx`, `controls/locale-menu.tsx`, `controls/download-menu.tsx`   |
| معاينة سطح المكتب في القسم الأول | `previews/desktop-preview.tsx`                                                  |
| أربعة عروض تفاعلية               | `sections/capability-demos.tsx`, `use-demo-scene.ts`                            |
| بطاقات تفاصيل بعناصر تحكم أصلية  | `sections/feature-section.tsx`                                                  |
| الحافظة وCanvas والتواصل         | `controls/copy-command.tsx`, `graphics/particle-field.tsx`, `layout/footer.tsx` |
| الأنماط والبيانات الوصفية        | `styles/harness.css`, `website-metadata.ts`                                     |

## SSR واللغات

تتحقق الصفحة من اللغة وتمرر القاموس إلى LandingPage بخصائص props. يستخدم الخادم والعميل JSX نفسه. يفسر RichText الوسوم المسموحة ولا يحقن HTML عشوائيا. تحدد تخطيطات جذور مجموعات المسارات lang وdir على الخادم.

## التحكم بتشغيل العروض

يجمع `use-demo-scene` بين ظهور العنصر في مجال العرض ونشاط الصفحة وتفضيل تقليل الحركة والإيقاف الذي يطلبه المستخدم. يحفظ CSS `animation-play-state` الموضع دون إعادة رسم React لكل إطار؛ يغير workflow السيناريو بعد كل دورة.

## دورة Canvas

يحمل `ParticleField` مشاهد Three.js فقط عندما تكون مرئية وعلامة تبويب المتصفح نشطة. يحافظ `RawShaderMaterial` على GLSL وألوان السوائل، ويرسم `InstancedBufferGeometry` البلاطات باستدعاء واحد. يجهز `compileAsync` البرامج بالتوازي عندما تدعم البيئة ذلك. يقتصر الرسم على 30fps ودقة بكسلات CSS ويتوقف خارج الشاشة وفي الخلفية. تمنع الحركة المخفضة تخصيص GPU، وتحرر عملية التنظيف الأشكال الهندسية والمواد والقوام ومحركات الرسم. يدير Framer Motion نوابض التنقل والدخول والمنظور المرتبط بالتمرير دون إعادة رسم React في كل إطار. تحتفظ العروض الأربعة بمسارات CSS ذات 22s و17.5s و11s و15s وتحجيم الحاوية وموضع الإيقاف.

## تسليم الوثائق

يولّد VitePress وVue الوثائق في `public/docs`، ويقدّمها Next.js من المصدر نفسه الذي يقدّم الموقع. تفتح بيئتا التطوير والمعاينة المستقلتان النسخة الإنجليزية افتراضياً أيضاً. بعد التنقل، يحدّث قالب Vue اتجاه القراءة وبيانات SEO، ويحذف البيانات السابقة ويلغي التحديثات التي لم تعد مطلوبة.

## SEO والتخزين المؤقت للمقالات

يستخدم `website-metadata.ts` واجهة Metadata في Next.js مع `SITE_URL` أو مصدر طلب المعاينة، دون افتراض منطقة محددة للعربية. تفصل ذاكرة التخزين المؤقت لمقالات VitePress بين المصادر والمقالات، وتحتفظ بما لا يزيد عن 128 إدخالاً لمدة خمس دقائق، وتحذف نتائج العرض الفاشلة. عند تطابق ETag ضعيف، تُرجع استجابة `304` بلا محتوى.

## المدخلات والبناء

تُحفظ المكونات وHooks وCSS وMarkdown والموارد الثابتة في نظام التحكم بالإصدارات. يولد `pnpm build` ملفات JavaScript وCSS، ويُستبعد `.next` و`public/docs` من Git. تتحقق الفحوص المستندة إلى `tests/fixtures/assets.json` من سلامة الموارد وتمنع إعادة إدخال HTML ملتقط أو شيفرة تشغيل من الموقع الأصلي.

تعرض الصينية وحدها QR WeChat، وتربط اللغات الأخرى إلى https://x.com/deepseek_ai.

تحسن ملكية المكونات قابلية القراءة لكنها لا تثبت دقة الصورة أو كل التفاعلات أو أداء الهاتف. تصف التقارير التاريخية التنفيذ السابق. تحتاج الترجمة وتركيز لوحة المفاتيح والنصوص المختلطة الاتجاه إلى مراجعة بشرية.

تفصل النسخة الإنجليزية الأساسية هذه المواضيع. [English](../../en/architecture/)

## نشر الموقع

ينشر GitHub Pages الموقع وجميع الوثائق كملفات ثابتة. يستخدم `pnpm build:pages` عنوان النشر الفعلي وبادئة مسار المستودع، ويتحقق `pnpm check:pages` من الروابط المحلية وSEO. يبقى وضع خادم Next.js متاحًا. مصدر الطلب وترويسات التخزين المؤقت للتطبيق وETag الشرطي للوثائق تخص التسليم عبر الخادم؛ يحدد Pages البيانات الوصفية أثناء البناء. خطوات النشر في `DEVELOPMENT.md`.

## حدود العرض والنشر

تُعرض الرسوم الثابتة للملفات وآثار التنفيذ على الخادم. تعمل أدوات التشغيل وسيناريوهات سير العمل المتغيرة على العميل. تحتفظ شجرة SVG الكبيرة للإضافات بحدود العميل لتقليل تسلسل HTML/RSC. قارن حجم HTML والبرامج قبل تغيير الحدود.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
