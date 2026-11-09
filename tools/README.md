# tools/ — script buat update data

Semua script jalan pakai Python 3 + Pillow (`pip install pillow`), dari folder `parfum-compare/`.
`data.js` adalah sumber data utama: script di bawah **mengubah `data.js` di tempat**, jadi commit/backup dulu
sebelum menjalankan.

## Update rutin (harga, rating, link)

Urutan yang disarankan:

```sh
# 1. Feed toko resmi terbaru (Shopify): harga, varian ukuran, notes Mykonos/Carl & Claire/HMNS/Alchemist/SAFF
curl -sL "https://officialmykonos.com/products.json?limit=250" -o tools/feeds/officialmykonos.com.json
curl -sL "https://hmnsperfume.com/products.json?limit=250"     -o tools/feeds/hmnsperfume.com.json
curl -sL "https://alchemistfragrance.com/products.json?limit=250" -o tools/feeds/alchemistfragrance.com.json
curl -sL "https://saffnco.com/products.json?limit=250"         -o tools/feeds/saffnco.com.json
curl -sL "https://carlandclaire.com/products.json?limit=250"   -o tools/feeds/carlandclaire.com.json

# 2. Link Tokopedia langsung ke produk (toko resmi brand lokal). Hapus tools/cache_tp/ dulu biar ambil yang baru.
python -I tools/tokped_links.py

# 2b. Sisanya (impor & produk yang nggak ada di toko brand): cari di Official Store Tokopedia lewat ego-browser
#     (pencarian Tokopedia dirender JavaScript, jadi butuh browser beneran).
python -I tools/tp_search_match.py --miss                       # -> tools/tp_miss.json
ego-browser nodejs < tools/tp_search.mjs                        # -> tools/tp_search.json (±1 menit/parfum, bisa dilanjut)
python -I tools/tp_search_match.py tools/tp_search.json         # cek dulu hasilnya
python -I tools/tp_search_match.py tools/tp_search.json --write

# 3. Rating Female Daily (hapus tools/fdcache/ dulu biar ambil yang baru), lalu gabungkan:
python -I tools/fd.py tools hmns-perfume mykonos saff-co alchemist-fragrance project-1945 kahf carl-claire oaken-lab studio-sable dior chanel ...
python -I tools/enrich.py tools data.js      # rating FD (dikalibrasi), varian ukuran, harga normal, sumber harga

# 4. Rating Fragrantica — PELAN, server gampang ngebatesin (429). Berhenti otomatis kalau ditolak; tinggal ulang lagi nanti.
python -I tools/fr_ratings.py ids            # cari ID dari halaman merek
FR_DELAY=45 python -I tools/fr_ratings.py fetch
python -I tools/fr_ratings.py apply
```

## Tambah parfum

- `add_brands.py` — tambah parfum baru dari feed Mykonos & Carl & Claire, dan dari halaman produk Official Store
  Tokopedia (SAFF & Co., Kahf; ambil dulu pakai `tp_products.py`). Parfum yang sudah ada dilewati.
- `tp_products.py <toko> <pola_slug> <out.json>` — ambil deskripsi/harga/foto produk dari toko Tokopedia.
- `extend.py` — lini Project 1945 (notes dari toko PROJECT 1945 di Tokopedia).
- `logos.py` — logo merek (favicon situs resmi) ke `img/brands/`. Cek hasilnya di contact sheet sebelum dipakai.

Foto produk baru otomatis diunduh ke `img/<id>.jpg` kalau belum ada. **Selalu cek fotonya** (contact sheet):
listing marketplace sering pakai banner promo sebagai foto pertama.

## Script lama (rebuild total — jangan dijalankan kecuali mau mulai dari nol)

- `build.py` — scraper Fragrantica awal (hasilnya `data.gen.js`).
- `assemble.py` — merakit `data.js` dari nol (`master.tsv` + `data.gen.js` + feed). **Menimpa semua perubahan
  sesudahnya** (Project 1945, Carl & Claire, link, rating FD, dll.), jadi setelah itu harus jalankan ulang
  `extend.py`, `add_brands.py`, `tokped_links.py`, `enrich.py`, `fr_ratings.py apply`.
- `master.tsv` — daftar awal: id, ID Fragrantica, merek, nama, asal, harga, ukuran, konsentrasi.

## Catatan sumber

- Female Daily, Fragrantica, dan Tokopedia kadang ngeblok sementara kalau request terlalu cepat. Semua script
  pakai cache + jeda; kalau keblok, tunggu lalu jalankan lagi (yang sudah di-cache nggak diunduh ulang).
- Sephora Indonesia, Sociolla, Blibli: nggak bisa dibaca otomatis (403 / produk dimuat lewat JavaScript), jadi harga
  impor masih perkiraan (`priceSrc: "estimasi"`).
- Harga yang dipakai = **harga normal** (bukan harga promo). Shopify: `compare_at_price` kalau ada; Tokopedia:
  `originalPrice`.
