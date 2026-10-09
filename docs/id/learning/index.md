---
title: 'Panduan belajar'
description: 'Urutan membaca kode dan enam latihan untuk mengubah serta memeriksa situs.'
---

# Panduan belajar

Buka situs lalu baca kode yang membentuk halaman. Enam latihan memeriksa kartu, bahasa, cache, animasi, metadata artikel, dan sumber daya.

1. Ubah kartu di semua bahasa, pertahankan ID dan tautan, lalu bandingkan HTML server dengan DOM setelah hidrasi.
2. Telusuri locale dari registry sampai menu, artikel, `lang`, `dir`, sitemap, dan perpindahan yang mempertahankan query serta fragment.
3. Gunakan ETag yang benar untuk memeriksa `304` kosong dan isolasi cache antara bahasa serta origin.
4. Periksa jeda, visibilitas, tab latar, dan gerak berkurang tanpa merusak animasi normal.
5. Ganti artikel dan bahasa, lalu pastikan canonical, metadata berbagi, dan arah diperbarui.
6. Ubah satu fase scene; tinjau sumber, input, dan hash. Hasil build tidak boleh meminta `/harness-source/`.

Bandingkan analisis payload, interaksi, dan tangkapan layar sebelum mengubah referensi. Simpan laporan di luar sumber yang dilacak. Jelaskan masalah pengunjung, tanggung jawab kode, hasil pengujian, dan batas bukti; tangkapan lokal tidak membuktikan kesamaan piksel dengan situs asli.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Istilah           | Makna                                               |
| ----------------- | --------------------------------------------------- |
| SSR               | Rendering di server                                 |
| Hydration         | Hidrasi: menambahkan interaksi klien ke HTML server |
| Reduced motion    | Preferensi untuk mengurangi animasi                 |
| RTL               | Tata letak dari kanan ke kiri                       |
| Visual regression | Pengujian regresi visual                            |
| Resource budget   | Anggaran sumber daya                                |

[Arsitektur](../architecture/) · [Sorotan frontend](../highlights/) · [Kebutuhan situs](../requirements/)

<WebsiteLink locale="id">Situs</WebsiteLink>
