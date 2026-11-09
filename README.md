# Banding Parfum

Website statis buat bandingin parfum lokal & impor berdasarkan harga, kualitas, dan notes.
Buka `index.html` langsung di browser — nggak perlu install apa-apa (font dari Google Fonts, sisanya lokal).

## Fitur

- **218 parfum dari 47 merek** (144 lokal, 74 impor), termasuk lini Project 1945 lengkap (17 varian),
  Carl & Claire, dan varian lengkap Mykonos/SAFF & Co./Kahf. Dikelompokkan per merek atau satu grid.
- **Jelajahi per merek**: tile merek lokal & impor, klik buat lihat semua parfumnya.
- **🏆 Paling worth it**: podium top 3 + peringkat 4–8 berdasarkan skor value, bisa per kategori (lokal, impor,
  budget, gender) dan bisa dibatasi ke parfum yang ratingnya dari review asli. Dihitung langsung dari data.
- **Gambaran wangi** (`scent.js`): tiap parfum dapat perumpamaan suasana ("Kayak lewat toko bunga…"), ikon notes,
  dan perjalanan wangi awal → tengah → akhir. Ini tafsiran otomatis dari notes (aturannya di `NOTE_RULES` &
  `SCENES`), bukan hasil nyium langsung.
- **Pencarian bahasa Indonesia** (`search.js`): "melati", "kopi", "kayu manis", "segar", "buat cowok" otomatis
  diterjemahkan ke notes/family; toleran typo ("sauvge", "bacarat"); kata umum (parfum, wangi, buat) diabaikan.
- Filter: pencarian (shortcut `/`), lokal/impor, gender, family, **acara & cuaca**
  (kantor, kencan, santai, formal, cuaca panas, malam & hujan), harga maksimal, notes, dan favorit.
- **Kuis "Parfum buat kamu"**: 5 pertanyaan (gender, selera wangi, acara, budget, lokal/impor) → 6 rekomendasi.
- **Dupe lokal**: pilih parfum impor → parfum lokal dengan notes paling mirip + berapa persen lebih hemat per ml.
  Detail parfum impor juga nampilin 3 alternatif lokal teratas.
- **Skor value** (0–100): kualitas dibagi harga per ml, relatif ke parfum terbaik.
  Kualitas = 50% rating + 30% ketahanan + 20% proyeksi.
- **Detail parfum**: piramida notes (klik notes buat jadi filter), rating Female Daily, ukuran lain
  (50/100 ml) dari toko resmi, sumber & tanggal harga, meter, sumber data.
- **Bandingkan** sampai 4 parfum: nilai terbaik ditandai ★, notes yang sama di-highlight, % kemiripan.
- **Cari yang mirip**: ranking berdasarkan kesamaan notes (Jaccard).
- **Link beli**: tiap parfum punya 2 tombol, **Tokopedia** dan **Shopee**.
  Tokopedia = link langsung ke halaman produk di toko resmi brand lokal (Official Store HMNS, Mykonos, Alchemist,
  SAFF & Co., Kahf; toko atas nama brand Project 1945, Oaken Lab, Carl & Claire), selain itu pencarian yang difilter
  ke toko berlabel Official Store. Shopee = pencarian di Shopee Mall.
- **Halaman ringkas**: tampilan per merek nampilin 6 merek dulu (masing-masing 1 baris, tombol "Lihat semua"),
  tampilan grid 24 parfum dulu (tombol "Tampilkan lagi"), plus tombol ⬆ balik ke atas.
- Favorit, tema terang/gelap, tambah parfum sendiri (localStorage), animasi (otomatis mati kalau
  sistem minta *reduced motion*).

## Data (`data.js`)

Tiap parfum punya keterangan sumber, yang juga ditampilkan di dialog detail:

| Field | Arti |
|---|---|
| `ratingSrc: "fragrantica"` | rating bintang Fragrantica × 2, `votes` = jumlah vote (dipakai kalau ≥ 10 vote) |
| `ratingSrc: "femaledaily"` | rating Female Daily (`fd.rating` /5, `fd.reviews`, `fd.recommend` %), dikalibrasi ke skala Fragrantica: rata-rata Bayes (8 review semu) lalu digeser selisih rata-rata kedua situs, karena rating Female Daily rata-rata lebih tinggi |
| `ratingSrc: "estimasi"` | rating perkiraan (belum ada di Fragrantica/Female Daily) |
| `notesSrc: "resmi"` | notes dari deskripsi toko resmi (situs brand atau Official Store Tokopedia) |
| `notesSrc: "manual"` | piramida notes umum, belum diverifikasi ulang |
| tanpa `notesSrc` | notes dari Fragrantica |
| `notes.all` | notes tanpa pembagian top/middle/base |
| `buy` | link produk yang diketahui; link Tokopedia di sini dipakai buat tombol Tokopedia (tombol lain dibuat otomatis dari nama parfum) |
| `variants` | ukuran lain + harga dari toko resmi |
| `priceSrc` / `checked` | `toko` = harga normal toko resmi, `retailer` = harga retailer, `estimasi` = perkiraan; `checked` = bulan dicek |
| `imgFit: "cover"` | foto suasana (bukan packshot), ditampilkan memenuhi kotak |

- Harga lokal = harga normal (bukan promo) di toko resmi, dicek Okt–Nov 2026. Harga impor = perkiraan retail
  Indonesia (Sephora/Sociolla/Blibli nggak bisa dibaca otomatis).
- Ketahanan & proyeksi = estimasi berdasarkan konsentrasi. Family ditebak otomatis dari notes,
  tag acara & cuaca ditebak dari family + proyeksi (aturannya di `TAGS`, `app.js`).
- Logo merek di `img/brands/<slug>.png` = ikon/favicon dari situs resmi brand (dipakai buat identifikasi aja).
  Velixir, Initio, dan Rasasi belum ada logonya, jadi tampil inisial.
- Cara update data & script-nya: lihat [`tools/README.md`](tools/README.md).
- Foto di `img/<id>.jpg` (Fragrantica & toko resmi brand), milik masing-masing brand —
  aman buat pemakaian pribadi, bukan buat dipublikasikan/komersial.
