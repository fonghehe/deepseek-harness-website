---
title: 'वेबसाइट की आवश्यकताएँ'
description: 'लेआउट, नेविगेशन, सुलभता, प्रकाशन और प्रदर्शन की जाँच।'
---

# वेबसाइट की आवश्यकताएँ

ऐनिमेशन बंद करके कंटेंट की पठनीयता जाँचें। लंबे नाम, मेन्यू और कमांड छोटे स्क्रीन में फिट होने चाहिए। Hydration के बाद कीबोर्ड, विराम, कॉपी और लिंक जाँचें।

हर भाषा को शब्दकोश, कार्ड, सहायक तकनीक के लेबल, मेटाडेटा, नेविगेशन, विवरण और पाँच लेख चाहिए। प्लेसहोल्डर व rich text टैग बचाएँ। Frontmatter को `docs/descriptions.json` से मेल खाना चाहिए।

ब्राउज़र परीक्षण से पहले production build बनाएँ और खाली पोर्ट चुनें। checksum के संदर्भ को बदलने से पहले त्रुटि की वजह खोजें। सर्वर पर पूरा `public` रखें; `SITE_URL`, अंग्रेज़ी प्रवेश, 404, sitemap, favicon, डायनेमिक हिस्से और कैश जाँचें। Pages में पाथ प्रीफ़िक्स भी जाँचें।

संकरी स्क्रीन, RTL, मिश्रित दिशा, फ़ोकस, स्क्रीन रीडर और कम ऐनिमेशन जाँचें। डिवाइस और ब्राउज़र दर्ज करें। अनुवादों की हिंदी मातृभाषी से समीक्षा अभी आवश्यक है।

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[आर्किटेक्चर](../architecture/) · [फ्रंटएंड के तरीके](../highlights/) · [सीखने का रास्ता](../learning/)

<WebsiteLink locale="hi">वेबसाइट</WebsiteLink>
