---
title: 'דרישות האתר'
description: 'בדיקות לפריסה, ניווט, נגישות, פרסום וביצועים.'
---

# דרישות האתר

בדקו שאפשר לקרוא את התוכן ללא אנימציה. שמות ארוכים, תפריטים ופקודות צריכים להתאים למסך צר. אחרי הידרציה, בדקו מקלדת, השהיה, העתקה וקישורים.

כל שפה דורשת מילון, כרטיסים, תוויות נגישות, מטא־נתונים, ניווט, תיאורים וחמישה מאמרים. שימרו משתנים ותגיות rich text. Frontmatter חייב להתאים ל־`docs/descriptions.json`.

בנו גרסת ייצור לפני בדיקות דפדפן והשתמשו בפורט פנוי. חקרו שגיאת checksum לפני עדכון הקלט. השרת צריך לקבל את כל `public`; בדקו `SITE_URL`, כניסה באנגלית, 404, sitemap, favicon, חלקים דינמיים ומטמון. ב־Pages בדקו גם קידומת נתיב.

בדקו מסך צר, RTL, כיוונים מעורבים, מיקוד, קורא מסך והפחתת אנימציה. תעדו מכשיר ודפדפן. תרגומים עדיין דורשים בדיקה של דוברי שפת אם.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[ארכיטקטורה](../architecture/) · [בחירות בפרונטאנד](../highlights/) · [מסלול למידה](../learning/)

<WebsiteLink locale="he">אתר</WebsiteLink>
