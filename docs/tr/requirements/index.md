---
title: 'Site gereksinimleri'
description: 'Düzen, gezinme, erişilebilirlik, yayın ve performans kontrolleri.'
---

# Site gereksinimleri

İçeriği animasyon olmadan okuyabilmelisiniz. Uzun adlar, menüler ve komutlar dar ekrana sığmalıdır. Hydration sonrasında klavyeyi, duraklatmayı, kopyalamayı ve bağlantıları kontrol edin.

Her dil sözlük, kartlar, erişilebilir etiketler, metadata, gezinme, açıklamalar ve beş makale gerektirir. Yer tutucuları ve rich text etiketlerini koruyun; frontmatter ile `docs/descriptions.json` aynı olmalıdır.

Tarayıcı testinden önce üretim derlemesi hazırlayın ve boş bir port kullanın. Kontrolleri değişikliğe göre seçin. Kaynak envanterini güncellemeden önce checksum hatasının nedenini araştırın.

Sunucu yayını bütün `public` dizinini içermelidir. `SITE_URL`, İngilizce belge girişi, 404, sitemap, favicon, dinamik parçalar ve önbelleği kontrol edin. Pages dışa aktarımının yol öneki doğrulanmalıdır.

Dar ekranı, RTL’yi, karışık yönlü metni, odağı, ekran okuyucuyu ve azaltılmış hareketi inceleyin. Cihaz ve tarayıcıyı kaydedin. Çeviri için ana dili konuşan birinin incelemesi hâlâ gereklidir.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Mimari](../architecture/) · [Frontend yaklaşımı](../highlights/) · [Öğrenme yolu](../learning/)

<WebsiteLink locale="tr">Site</WebsiteLink>
