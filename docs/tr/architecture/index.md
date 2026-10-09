---
title: 'Mimari'
description: 'React bileşenleri, Next.js yolları, animasyonlar ve VitePress makaleleri.'
---

# Mimari

`landing-page.tsx` sayfayı birleştirir. `layout/` çerçeveyi, `controls/` eylemleri, `sections/` bölümleri, `previews/` çizimleri ve CSS’i yönetir. `motion/` Framer Motion; `graphics/` Three.js sahneleri, geometri ve shader içerir.

Sayfa dil kodunu doğrular ve sözlüğü bileşenlere geçirir. Sunucu ve istemci aynı JSX’i kullanır; düzen `lang` ve `dir` değerlerini belirler. RichText yalnızca izin verilen etiketleri işler. Yakalanmış HTML veya özgün sitenin derlenmiş uygulaması yüklenmez.

`use-demo-scene.ts` kullanıcı duraklatmasını, görünürlüğü, etkin sekmeyi ve azaltılmış hareket tercihini birleştirir. CSS duraklatmada ilerlemeyi korur; iş akışı senaryosu döngü sonunda değişir. Dört gösterim 22, 17,5, 11 ve 15 saniyelik zaman çizelgelerini korur.

Three.js gerektiğinde yüklenir. Çizim 30fps ve CSS piksel çözünürlüğüyle sınırlıdır; ekran dışında ve arka planda durur, azaltılmış harekette GPU başlatılmaz. Geometri, materyal, doku ve renderer serbest bırakılır. Framer Motion başlık yaylarını, bölüm girişlerini ve kaydırma perspektifini yönetir.

`pnpm build` önce VitePress’i `public/docs` içine, ardından Next.js’i derler. Belge gezinmesi yön ve SEO’yu yeniler. Sunucu önbelleği origin ile dil/makale yolunu ayırır; beş dakika boyunca en fazla 128 kayıt tutar, başarısız oluşturmaları kaldırır ve eşleşen ETag için gövdesiz `304` döndürür.

GitHub Pages tam `SITE_URL` ile `build:pages` ve `check:pages` kullanır. Statik metadata derleme anında belirlenir; uygulama önbelleği ve ETag sunucu moduna aittir. Dışa aktarma çalışma kaynaklarını değiştirmez. Ayrıntılar `DEVELOPMENT.md` içindedir.

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

[Frontend yaklaşımı](../highlights/) · [Site gereksinimleri](../requirements/) · [Öğrenme yolu](../learning/)

<WebsiteLink locale="tr">Site</WebsiteLink>
