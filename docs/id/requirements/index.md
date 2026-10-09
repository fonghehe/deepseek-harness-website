---
title: 'Kebutuhan situs'
description: 'Pemeriksaan tata letak, navigasi, aksesibilitas, publikasi, dan performa.'
---

# Kebutuhan situs

Pastikan isi dapat dibaca tanpa animasi. Nama panjang, menu, dan perintah harus muat di layar sempit. Setelah hidrasi, uji keyboard, jeda demo, penyalinan, dan tautan.

Setiap bahasa memerlukan kamus, kartu, label aksesibel, metadata, navigasi, deskripsi, dan lima artikel. Pertahankan placeholder serta tag rich text. Cocokkan frontmatter dengan `docs/descriptions.json`.

Bangun produksi sebelum pengujian browser dan gunakan port yang belum dipakai. Jalankan pemeriksaan sesuai perubahan. Selidiki kegagalan checksum sebelum memperbarui inventaris input.

Publikasi server harus menyertakan seluruh `public`. Periksa `SITE_URL`, pintu masuk dokumentasi Inggris, 404, sitemap, ikon, chunk dinamis, dan perilaku cache. Ekspor Pages harus lulus pemeriksaan awalan jalur.

Periksa layar sempit, RTL, teks bercampur arah, fokus, pembaca layar, dan gerak berkurang. Catat perangkat serta browser. Penutur asli tetap perlu meninjau terjemahan; pemeriksaan otomatis tidak menggantikan peninjauan tersebut.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Arsitektur](../architecture/) · [Sorotan frontend](../highlights/) · [Panduan belajar](../learning/)

<WebsiteLink locale="id">Situs</WebsiteLink>
