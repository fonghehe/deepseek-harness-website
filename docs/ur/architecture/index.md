---
title: 'آرکیٹیکچر'
description: 'React کمپوننٹس، Next.js راستے، اینیمیشن اور VitePress مضامین کی فراہمی۔'
---

# آرکیٹیکچر

`landing-page.tsx` صفحہ بناتا ہے۔ `layout/`، `controls/` اور `sections/` ساخت، کنٹرول اور مواد الگ رکھتے ہیں۔ `previews/` میں مناظر اور CSS، `motion/` میں Framer Motion اور `graphics/` میں Three.js مناظر، جیومیٹری اور shader ہیں۔

صفحہ زبان کی توثیق کرکے لغت کمپوننٹس کو دیتا ہے۔ سرور اور کلائنٹ ایک ہی JSX استعمال کرتے ہیں؛ layout `lang` اور `dir` مقرر کرتا ہے۔ RichText صرف طے شدہ ٹیگ قبول کرتا ہے۔ اصل ویب سائٹ کا محفوظ HTML یا کمپائل شدہ رن ٹائم لوڈ نہیں ہوتا۔

`use-demo-scene.ts` صارف کا وقفہ، نظر آنا، فعال ٹیب اور کم اینیمیشن کی ترجیح یکجا کرتا ہے۔ وقفے میں CSS پیش رفت محفوظ رکھتا ہے؛ چکر پورا ہونے پر منظر بدلتا ہے۔ چار کہانیاں 22، 17.5، 11 اور 15 سیکنڈ کی ہیں۔

Three.js ضرورت پر لوڈ ہوتا ہے، زیادہ سے زیادہ 30fps اور CSS پکسل ریزولیوشن استعمال کرتا ہے۔ اسکرین سے باہر یا پس منظر کے ٹیب میں رک جاتا ہے؛ کم اینیمیشن پر GPU شروع نہیں ہوتا۔ جیومیٹری، مواد، ٹیکسچر اور رینڈرر آزاد کیے جاتے ہیں۔ Framer Motion ہیڈر کے اسپرنگ، حصوں کے داخلے اور اسکرول کے پرسپیکٹو کو سنبھالتا ہے۔

`pnpm build` پہلے VitePress کو `public/docs` میں، پھر Next.js کو بناتا ہے۔ دستاویزات کی نیویگیشن سمت اور SEO اپ ڈیٹ کرتی ہے۔ سرور کیش origin اور زبان/مضمون کا راستہ الگ رکھتا ہے: زیادہ سے زیادہ 128 اندراج، پانچ منٹ کی مدت اور ناکام رینڈر کا اخراج۔ ETag ملنے پر باڈی کے بغیر `304` ملتا ہے۔

Pages میں مکمل `SITE_URL` کے ساتھ `build:pages` اور `check:pages` چلائیں۔ جامد میٹا ڈیٹا build کے وقت طے ہوتا ہے؛ ایپ کیش اور ETag سرور موڈ کا رویہ ہیں۔ ایکسپورٹ کام کرنے والا سورس نہیں بدلتا۔ ترقی کی ہدایات `DEVELOPMENT.md` میں ہیں۔

```text
src/components/
├── landing-page.tsx
├── layout/
├── controls/
├── sections/
├── previews/
├── motion/
├── graphics/
├── shared/
└── styles/

page.tsx → locale + dictionary → LandingPage → Next.js SSR
/docs/ → /docs/en/ → VitePress article
```

[فرنٹ اینڈ کے طریقے](../highlights/) · [ویب سائٹ کے تقاضے](../requirements/) · [سیکھنے کا راستہ](../learning/)

<WebsiteLink locale="ur">ویب سائٹ</WebsiteLink>
