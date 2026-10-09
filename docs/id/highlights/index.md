---
title: 'Sorotan frontend'
description: 'Catatan implementasi kontrol, bahasa, animasi, SEO, dan sumber daya.'
---

# Sorotan frontend

## Informasi yang bertahap

Mulai dengan manfaat, lanjutkan ke contoh, rincian, dan tindakan. Kartu tambahan mengikuti struktur serta gaya visual demonstrasi yang sudah ada.

## Kontrol yang dapat diakses

Gunakan tautan nyata dan disclosure HTML. Periksa fokus, Escape, pemulihan fokus, menu sempit, dan keadaan tanpa JavaScript.

## Bahasa dan arah baca

Kamus, label aksesibel, metadata, navigasi, dan artikel harus selaras. RTL memerlukan properti CSS logis; kode tetap LTR. Kunci yang cocok belum menjamin terjemahan yang alami.

## SEO dan cache

Canonical, hreflang, data terstruktur, dan metadata berbagi harus sesuai dengan halaman saat ini, termasuk setelah navigasi klien. Origin berbeda tidak boleh berbagi metadata yang keliru.

## Sumber dan lisensi

Komponen, shader, CSS, Markdown, dan input statis dipelihara sebagai sumber. Hash dalam `tests/fixtures/assets.json` memeriksa integritas. `.next`, `public/docs`, dan laporan adalah keluaran; branding mengikuti `NOTICE.md`.

## Bukti performa

Ukur payload, LCP, CLS, dan waktu pemblokiran. Ulangi pengukuran dan periksa perangkat nyata. Jangan mengganti baseline untuk menyembunyikan regresi; pengujian lokal dan CI jarak jauh adalah bukti yang berbeda.

[Arsitektur](../architecture/) · [Kebutuhan situs](../requirements/) · [Panduan belajar](../learning/)

<WebsiteLink locale="id">Situs</WebsiteLink>
