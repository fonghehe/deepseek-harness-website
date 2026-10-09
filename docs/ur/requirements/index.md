---
title: 'ویب سائٹ کے تقاضے'
description: 'ترتیب، نیویگیشن، رسائی، اشاعت اور کارکردگی کی جانچ۔'
---

# ویب سائٹ کے تقاضے

اینیمیشن بند کرکے مواد کی پڑھنے کی سہولت جانچیں۔ طویل نام، مینو اور کمانڈ چھوٹی اسکرین میں آنے چاہییں۔ Hydration کے بعد کی بورڈ، وقفہ، کاپی اور لنکس جانچیں۔

ہر زبان کو لغت، کارڈ، معاون ٹیکنالوجی کے لیبل، میٹا ڈیٹا، نیویگیشن، تفصیل اور پانچ مضامین درکار ہیں۔ پلیس ہولڈر اور rich text ٹیگ محفوظ رکھیں۔ Frontmatter کو `docs/descriptions.json` سے ملنا چاہیے۔

براؤزر ٹیسٹ سے پہلے production build بنائیں اور خالی پورٹ چنیں۔ checksum کی مثال بدلنے سے پہلے خرابی کی وجہ تلاش کریں۔ سرور پر مکمل `public` رکھیں؛ `SITE_URL`، انگریزی داخلی راستہ، 404، sitemap، favicon، متحرک حصے اور کیش جانچیں۔ Pages میں پاتھ کا سابقہ بھی جانچیں۔

تنگ اسکرین، RTL، مختلف سمتوں کا متن، فوکس، اسکرین ریڈر اور کم اینیمیشن جانچیں۔ آلہ اور براؤزر درج کریں۔ ترجمے ابھی اردو مادری زبان رکھنے والے قاری کی نظرثانی کے منتظر ہیں۔

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[آرکیٹیکچر](../architecture/) · [فرنٹ اینڈ کے طریقے](../highlights/) · [سیکھنے کا راستہ](../learning/)

<WebsiteLink locale="ur">ویب سائٹ</WebsiteLink>
