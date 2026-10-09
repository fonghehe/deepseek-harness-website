---
title: 'Projeye genel bakış'
description: 'DeepSeek Harness sitesinin yeniden oluşturulması: yapı, uygulama ve testler.'
---

# Projeye genel bakış

Bu depo, DeepSeek Harness sitesini Next.js ve React ile yeniden oluşturur. Belgeler sayfa yapısını, bileşenleri, dilleri, animasyonları ve testleri açıklar. Makaleler VitePress ile oluşturulur.

Ziyaretçi önce ürünü tanır, dört gösterimi izler, ayrıntı kartlarını açar ve bir sonraki adımı seçer. Sunucu içeriği, gerçek bağlantılar ve doğal HTML açılır öğeleri JavaScript olmadan da işe yarar.

`src/i18n/locales.json` dil adlarını, yolları, yönleri ve metadatayı birleştirir. `/harness/` Çince girişi korur; `/docs/` İngilizceyi açar. Her belge sürümü aynı beş bölümü içerir.

Okunabilir bileşenler bakımı kolaylaştırır. Derlemenin geçmesi piksel doğruluğunu, doğal çeviriyi veya gerçek cihaz performansını kanıtlamaz; bunları ayrıca incelemek gerekir.

[Mimari](./architecture/) · [Frontend yaklaşımı](./highlights/) · [Site gereksinimleri](./requirements/) · [Öğrenme yolu](./learning/)

<WebsiteLink locale="tr">Site</WebsiteLink>
