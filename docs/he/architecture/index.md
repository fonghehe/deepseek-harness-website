---
title: 'ארכיטקטורה'
description: 'רכיבי React, נתיבי Next.js, אנימציות והגשת מאמרי VitePress.'
---

# ארכיטקטורה

`landing-page.tsx` מרכיב את העמוד. `layout/`, `controls/` ו־`sections/` מפרידים מסגרת, פעולות ותוכן. `previews/` כולל איורים ו־CSS; `motion/` את Framer Motion; `graphics/` סצנות Three.js, גאומטריה ושיידרים.

העמוד מאמת את השפה ומעביר מילון לרכיבים. השרת והלקוח משתמשים באותו JSX; הפריסה קובעת `lang` ו־`dir`. RichText מטפל רק בתגיות המוסכמות. האתר לא טוען HTML שנלכד או את היישום המהודר של האתר המקורי.

`use-demo-scene.ts` משלב השהיה, נראות, לשונית פעילה והפחתת אנימציה. CSS שומר התקדמות בזמן השהיה; תרחישים מתחלפים בסוף מחזור. ארבע ההדגמות נמשכות 22, 17.5, 11 ו־15 שניות.

Three.js נטען לפי הצורך ומצייר עד 30fps ברזולוציית פיקסלי CSS. הציור נעצר מחוץ למסך וברקע; הפחתת אנימציה מונעת הפעלת GPU. גאומטריה, חומרים, מרקמים ומנוע הציור משוחררים. Framer Motion מנהל קפיצי כותרת, כניסת מקטעים ופרספקטיבה בגלילה.

`pnpm build` בונה VitePress אל `public/docs` ואז Next.js. ניווט בתיעוד מעדכן כיוון ו־SEO. מטמון השרת מפריד origin ושפה/נתיב מאמר, שומר עד 128 רשומות לחמש דקות ומסיר רינדורים שנכשלו. ETag תואם מחזיר `304` ללא גוף.

Pages משתמש ב־`build:pages` וב־`check:pages` עם `SITE_URL` מלא. מטא־נתונים סטטיים נקבעים בבנייה; מטמון ו־ETag של היישום שייכים להגשת שרת. הייצוא לא משנה מקורות עבודה. ההוראות ב־`DEVELOPMENT.md`.

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

[בחירות בפרונטאנד](../highlights/) · [דרישות האתר](../requirements/) · [מסלול למידה](../learning/)

<WebsiteLink locale="he">אתר</WebsiteLink>
