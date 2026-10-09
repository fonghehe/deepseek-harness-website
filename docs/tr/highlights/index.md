---
title: 'Frontend yaklaşımı'
description: 'Kontroller, diller, animasyonlar, SEO ve kaynakların uygulama notları.'
---

# Frontend yaklaşımı

## Bilgi sıralaması

Faydayı açıklayın, örnek gösterin, ayrıntıya ve eyleme geçin. Ek kartlar mevcut gösterimlerin yapısını ve görsel dilini sürdürür.

## Erişilebilir kontroller

Gerçek bağlantılar ve doğal HTML açılır öğeleri kullanın. Odak, Escape, odağın geri dönmesi, dar menüler ve JavaScript olmayan durumlar incelenmelidir.

## Dil ve yön

Sözlükler, erişilebilir etiketler, metadata, gezinme ve makaleler birlikte tamamlanır. RTL mantıksal CSS özellikleri gerektirir; kod LTR kalır. Eşleşen anahtarlar çeviri kalitesini kanıtlamaz.

## SEO ve kaynaklar

Canonical, hreflang, yapılandırılmış veri ve paylaşım metadatası gezinmeden sonra da geçerli sayfayı göstermelidir. Farklı origin’ler yanlış metadata paylaşmamalıdır.

Bileşenler, shader, CSS, Markdown ve statik girdiler kaynak olarak korunur. `tests/fixtures/assets.json` bütünlüğü doğrular. `.next`, `public/docs` ve raporlar çıktıdır. Marka ve lisans sınırları `NOTICE.md` içindedir.

## Performans kanıtı

Aktarılan veri, LCP, CLS ve bloklama süresini ölçün. Ölçümleri tekrarlayın, gerçek cihazları inceleyin. Regresyonu gizlemek için baseline değiştirmeyin. Yerel test ve uzak CI ayrı kanıtlardır.

[Mimari](../architecture/) · [Site gereksinimleri](../requirements/) · [Öğrenme yolu](../learning/)

<WebsiteLink locale="tr">Site</WebsiteLink>
