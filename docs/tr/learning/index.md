---
title: 'Öğrenme yolu'
description: 'Kod okuma sırası ve siteyi değiştirmek için altı doğrulama alıştırması.'
---

# Öğrenme yolu

Siteyi açın ve sayfayı oluşturan kodu okuyun. Altı alıştırma kartları, dilleri, önbelleği, animasyonları, makale meta verilerini ve kaynakları ele alır.

1. Bir kartı tüm dillerde geliştirin; ID ve bağlantıları koruyup sunucu HTML’i ile hydration sonrası DOM’u karşılaştırın.
2. Dil kaydından menü, makale, `lang`, `dir` ve sitemap’e ilerleyin; dil değişiminde sorgu ve fragment korunmalı.
3. Gerçek ETag ile boş `304` ve dil/origin önbellek ayrımını kanıtlayın.
4. Normal animasyonu bozmadan duraklatma, görünürlük, arka plan ve azaltılmış hareketi sınayın.
5. Makale ve dil değiştirip canonical, paylaşım metadatası ve yönün yenilendiğini doğrulayın.
6. Sahnenin bir aşamasını değiştirin; kaynak, girdi ve hash inceleyin. Derlenmiş çıktılar `/harness-source/` istememeli.

Referansları değiştirmeden önce veri boyutu, etkileşim ve görüntü farklarını inceleyin. Raporları versionlanan kaynakların dışında tutun. Ziyaretçi sorununu, kodun sorumluluğunu, test sonucunu ve kanıt sınırını açıklayın; yerel görüntüler özgün siteyle piksel eşitliğini kanıtlamaz.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Terim             | Anlamı                                                           |
| ----------------- | ---------------------------------------------------------------- |
| SSR               | Sunucu tarafında oluşturma                                       |
| Hydration         | Hydration: sunucunun HTML çıktısına istemci etkileşimleri ekleme |
| Reduced motion    | Hareketi azaltma tercihi                                         |
| RTL               | Sağdan sola yerleşim                                             |
| Visual regression | Görsel regresyon testleri                                        |
| Resource budget   | Kaynak bütçesi                                                   |

[Mimari](../architecture/) · [Frontend yaklaşımı](../highlights/) · [Site gereksinimleri](../requirements/)

<WebsiteLink locale="tr">Site</WebsiteLink>
