---
title: 'Gambaran proyek'
description: 'Struktur, implementasi, dan pengujian situs yang membuat ulang DeepSeek Harness.'
---

# Gambaran proyek

Repositori ini membuat ulang situs DeepSeek Harness dengan Next.js dan React. Dokumentasi menjelaskan struktur halaman, komponen, bahasa, animasi, dan pengujian. Artikel dibangun dengan VitePress.

Pengunjung mengenali produk di bagian awal, melihat empat demonstrasi, membuka kartu rincian, lalu memilih tindakan. Konten server, tautan nyata, dan elemen HTML yang dapat dibuka tetap berguna tanpa JavaScript.

`src/i18n/locales.json` menyatukan bahasa, jalur, arah baca, dan metadata. `/harness/` tetap menjadi pintu masuk bahasa Tionghoa; `/docs/` membuka bahasa Inggris. Semua edisi dokumentasi memiliki lima bab yang sama.

Komponen yang terbaca memudahkan pemeliharaan. Namun, hasil build tidak membuktikan kesetiaan visual, mutu terjemahan, atau performa pada perangkat nyata. Ketiganya memerlukan pemeriksaan yang sesuai.

[Arsitektur](./architecture/) · [Sorotan frontend](./highlights/) · [Kebutuhan situs](./requirements/) · [Panduan belajar](./learning/)

<WebsiteLink locale="id">Situs</WebsiteLink>
