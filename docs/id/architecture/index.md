---
title: 'Arsitektur'
description: 'Komponen React, rute Next.js, animasi, dan penyajian artikel VitePress.'
---

# Arsitektur

`landing-page.tsx` menyusun halaman. `layout/` mengelola kerangka, `controls/` tindakan, `sections/` bagian halaman, dan `previews/` ilustrasi beserta CSS. `motion/` berisi Framer Motion; `graphics/` berisi scene Three.js, geometri, dan shader.

Halaman memvalidasi locale dan mengirim kamus ke komponen. Server dan klien memakai JSX yang sama; tata letak menetapkan `lang` dan `dir`. RichText hanya memproses tag yang disepakati. Situs tidak memuat HTML tangkapan atau aplikasi hasil kompilasi dari situs asli.

`use-demo-scene.ts` menggabungkan jeda pengguna, visibilitas, tab aktif, dan preferensi pengurangan gerak. CSS mempertahankan posisi saat dijeda; skenario workflow berganti pada akhir siklus. Empat cerita berlangsung 22, 17,5, 11, dan 15 detik.

Three.js dimuat saat diperlukan. Rendering dibatasi 30fps dan resolusi piksel CSS, berhenti di luar layar atau tab latar, dan dilewati untuk gerak berkurang. Geometri, material, tekstur, dan renderer dibersihkan. Framer Motion menangani pegas header, kemunculan bagian, dan perspektif saat menggulir.

`pnpm build` membangun VitePress ke `public/docs`, lalu Next.js. Navigasi dokumen memperbarui arah baca dan SEO. Cache server memisahkan origin serta bahasa/jalur artikel, dibatasi 128 entri selama lima menit, menghapus render gagal, dan mendukung ETag dengan respons `304` tanpa isi.

GitHub Pages memakai `build:pages` dan `check:pages` dengan `SITE_URL` lengkap. Metadata ekspor ditetapkan saat build; cache dan ETag aplikasi berlaku pada penyajian melalui server. Ekspor tidak mengubah sumber kerja. Petunjuk ada di `DEVELOPMENT.md`.

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

[Sorotan frontend](../highlights/) · [Kebutuhan situs](../requirements/) · [Panduan belajar](../learning/)

<WebsiteLink locale="id">Situs</WebsiteLink>
