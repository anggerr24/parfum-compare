// File ini dibuat oleh assemble.py. Sumber per parfum:
// - ratingSrc "fragrantica": rating bintang Fragrantica × 2 (Okt 2026), `votes` = jumlah vote.
// - ratingSrc "femaledaily": rating Female Daily (fd.rating /5, fd.reviews), dikalibrasi ke skala Fragrantica
//   (rata-rata Bayes + geser rata-rata) biar adil dibanding rating Fragrantica.
// - ratingSrc "estimasi": rating perkiraan (belum ada data Fragrantica).
// - notesSrc "resmi": notes dari deskripsi toko resmi brand; "manual": piramida umum, belum diverifikasi ulang.
//   Tanpa notesSrc = notes dari Fragrantica. `notes.all` = notes tanpa pembagian top/middle/base.
// - imgFit "cover" = fotonya foto suasana (bukan packshot), ditampilkan memenuhi kotak.
// - buy: link beli. kind "site" = situs resmi brand, "marketplace" = toko brand di marketplace, "retailer" = toko pihak ketiga.
// - family ditebak otomatis dari notes. longevity & sillage: estimasi (berdasarkan konsentrasi).
// - variants: ukuran lain dari toko resmi. priceSrc "toko" = harga normal toko resmi, "retailer" = harga retailer,
//   "estimasi" = perkiraan retail Indonesia. checked = bulan harga dicek.
const PERFUMES = [
 {
  "id": "dior-sauvage-edt",
  "name": "Sauvage EDT",
  "brand": "Dior",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDT",
  "size": 100,
  "price": 2100000,
  "longevity": 8,
  "sillage": 8,
  "rating": 7.7,
  "votes": 34800,
  "fragrantica": "31861",
  "notes": {
   "top": [
    "Bergamot",
    "Pepper"
   ],
   "middle": [
    "Sichuan Pepper",
    "Lavender",
    "Pink Pepper",
    "Vetiver",
    "Patchouli",
    "Geranium",
    "Elemi"
   ],
   "base": [
    "Ambroxan",
    "Cedar",
    "Labdanum"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 4.9,
   "reviews": 14,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/dior/dior-sauvage"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "dior-sauvage-edp",
  "name": "Sauvage EDP",
  "brand": "Dior",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 2400000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.4,
  "votes": 15195,
  "fragrantica": "48100",
  "notes": {
   "top": [
    "Bergamot"
   ],
   "middle": [
    "Sichuan Pepper",
    "Lavender",
    "Star Anise",
    "Nutmeg"
   ],
   "base": [
    "Ambroxan",
    "Vanilla"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 4.6,
   "reviews": 30,
   "recommend": 86,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/dior/dior-sauvage-24"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/dior-sauvage-edp-for-men-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "dior-sauvage-elixir",
  "name": "Sauvage Elixir",
  "brand": "Dior",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "X",
  "size": 60,
  "price": 2900000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.6,
  "votes": 19631,
  "fragrantica": "68415",
  "notes": {
   "top": [
    "Nutmeg",
    "Cinnamon",
    "Cardamom",
    "Grapefruit"
   ],
   "middle": [
    "Lavender"
   ],
   "base": [
    "Licorice",
    "Sandalwood",
    "Amber",
    "Patchouli",
    "Vetiver"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 4.3,
   "reviews": 6,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/dior/dior-sauvage-elixir-midnight-2"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/parfum-dior-sauvage-elixir-parfum-60ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "dior-homme-intense",
  "name": "Dior Homme Intense",
  "brand": "Dior",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 2500000,
  "longevity": 8,
  "sillage": 6,
  "rating": 9.0,
  "votes": 24993,
  "fragrantica": "13016",
  "notes": {
   "top": [
    "Lavender"
   ],
   "middle": [
    "Iris",
    "Ambrette (Musk Mallow)",
    "Pear"
   ],
   "base": [
    "Cedar",
    "Vetiver"
   ]
  },
  "ratingSrc": "fragrantica",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/christian-dior-homme-intense-edp-100ml-1732092945180820946",
    "kind": "official"
   }
  ]
 },
 {
  "id": "dior-miss-dior-bb",
  "name": "Miss Dior Blooming Bouquet",
  "brand": "Dior",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDT",
  "size": 100,
  "price": 2300000,
  "longevity": 5,
  "sillage": 5,
  "rating": 8.2,
  "votes": 11561,
  "fragrantica": "23280",
  "notes": {
   "top": [
    "Sicilian Mandarin"
   ],
   "middle": [
    "Pink Peony",
    "Rose",
    "Apricot",
    "Peach"
   ],
   "base": [
    "White Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 4.6,
   "reviews": 106,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/dior/miss-dior"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/dior-miss-dior-blooming-bouquet-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "montblanc-explorer",
  "name": "Explorer",
  "brand": "Montblanc",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 1100000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.5,
  "votes": 18079,
  "fragrantica": "52002",
  "notes": {
   "top": [
    "Bergamot",
    "Pink Pepper",
    "Clary Sage"
   ],
   "middle": [
    "Vetiver",
    "Leather"
   ],
   "base": [
    "Ambroxan",
    "Akigalawood",
    "Patchouli",
    "Cacao"
   ]
  },
  "ratingSrc": "fragrantica",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&F Store Official",
    "url": "https://www.tokopedia.com/cf-store-official/montblanc-explorer-eau-de-parfum-100-ml-parfum-pria",
    "kind": "official"
   }
  ]
 },
 {
  "id": "hmns-orgsm",
  "name": "Orgsm",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 524358,
  "longevity": 7,
  "sillage": 7,
  "rating": 9.1,
  "votes": 364,
  "fragrantica": "75908",
  "notes": {
   "top": [
    "Apple"
   ],
   "middle": [
    "Rose",
    "Peony",
    "Jasmine"
   ],
   "base": [
    "Vanilla",
    "Amber"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/orgsm",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-orgsm-eau-de-parfum-100-ml-1731175403904205896",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.0,
   "reviews": 526,
   "recommend": 88,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/orgasm"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-alpha",
  "name": "Alpha",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 524372,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.1,
  "votes": 144,
  "fragrantica": "75907",
  "notes": {
   "top": [
    "Grass",
    "Citruses"
   ],
   "middle": [
    "Woody Notes",
    "Green Tea"
   ],
   "base": [
    "Cedar",
    "Vetiver"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/alpha-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-alpha-eau-de-parfum-100-ml-1731175403881268296",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.4,
   "reviews": 84,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/alpha"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-ambar-janma",
  "name": "Ambar Janma",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 661010,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.9,
  "votes": 118,
  "fragrantica": "75911",
  "notes": {
   "all": [
    "Patchouli",
    "Rose",
    "Suede",
    "Black Tea"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-ambar-janma-manusia-harum",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-ambar-janma-eau-de-parfum-100-ml-1729591400042104904",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 156,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/ambar-janma"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-the-perfection",
  "name": "The Perfection",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 633215,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.3,
  "votes": 113,
  "fragrantica": "75967",
  "notes": {
   "top": [
    "Clove",
    "Nutmeg",
    "Bergamot",
    "Elemi"
   ],
   "middle": [
    "Lavender",
    "Green Pear",
    "Lily of the Valley",
    "Marigold"
   ],
   "base": [
    "Leather",
    "Musk",
    "Driftwood",
    "Sandalwood"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-the-perfection",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-the-perfection-eau-de-parfum-100-ml-1729384575803163720",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 33,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/the-perfection"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-sotb",
  "name": "S.O.T.B",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 30,
  "price": 359000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.1,
  "votes": 48,
  "fragrantica": "98611",
  "notes": {
   "top": [
    "Ylang-Ylang",
    "Galbanum",
    "Mandarin"
   ],
   "middle": [
    "Tuberose",
    "Orange Blossom",
    "Jasmine"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi SAFF & Co.",
    "url": "https://saffnco.com/products/extrait-de-parfum-sotb",
    "kind": "site"
   },
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-s-o-t-b-1729546158305610083",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.1,
   "reviews": 586,
   "recommend": 98,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-sotb-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-xocolatl",
  "name": "Xocolatl",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 35,
  "price": 299000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.2,
  "votes": 25,
  "fragrantica": "98615",
  "notes": {
   "top": [
    "Mandarin",
    "Pear",
    "Apple"
   ],
   "middle": [
    "Gardenia",
    "Plumeria",
    "Heliotrope",
    "Maltol"
   ],
   "base": [
    "Coconut",
    "Sandalwood",
    "Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi SAFF & Co.",
    "url": "https://saffnco.com/products/extrait-de-parfum-xocolatl",
    "kind": "site"
   },
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-xocolatl-1729612500227885411",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.7,
   "reviews": 91,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-xocolatl-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-solaris",
  "name": "Solaris",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 30,
  "price": 299000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.2,
  "votes": 41,
  "fragrantica": "98616",
  "notes": {
   "top": [
    "Mandarin",
    "Violet Leaf",
    "Bergamot"
   ],
   "middle": [
    "Iris",
    "Cedar",
    "Freesia"
   ],
   "base": [
    "Tonka",
    "Amber",
    "Vetiver"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi SAFF & Co.",
    "url": "https://saffnco.com/products/extrait-de-parfum-solaris",
    "kind": "site"
   },
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-solaris-1729587196227848547",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.6,
   "reviews": 29,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/solaris-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-saff",
  "name": "Saff",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 30,
  "price": 359000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "votes": 27,
  "fragrantica": "98618",
  "notes": {
   "top": [
    "Bergamot",
    "Mandarin",
    "Saffron"
   ],
   "middle": [
    "Jasmine",
    "Lily of the Valley",
    "Ylang-Ylang"
   ],
   "base": [
    "Leather",
    "Amber",
    "Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi SAFF & Co.",
    "url": "https://saffnco.com/products/extrait-de-parfum-saff",
    "kind": "site"
   },
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-saff-1729386845826090339",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.1,
   "reviews": 48,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-4"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-loui",
  "name": "Loui",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 30,
  "price": 249000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.6,
  "votes": 28,
  "fragrantica": "100306",
  "notes": {
   "top": [
    "Aldehydes",
    "Violet Leaf",
    "Verbena"
   ],
   "middle": [
    "Rose",
    "Peony",
    "Lily of the Valley"
   ],
   "base": [
    "Musk",
    "Cedar"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi SAFF & Co.",
    "url": "https://saffnco.com/products/extrait-de-parfum-loui",
    "kind": "site"
   },
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-loui-1733462846295278947",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.3,
   "reviews": 176,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-5"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-pink-laundry",
  "name": "Pink Laundry",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 249000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.1,
  "votes": 20,
  "fragrantica": "120335",
  "notes": {
   "top": [
    "Aldehydes",
    "Green Notes",
    "Chamomile"
   ],
   "middle": [
    "Rose",
    "Lily of the Valley",
    "Jasmine"
   ],
   "base": [
    "Powdery Notes",
    "Sandalwood",
    "Patchouli"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/pink-laundry",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-pink-laundry-eau-de-parfum-30ml-3293d",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.4,
   "reviews": 136,
   "recommend": 88,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/pink-laundry-eau-de-parfum"
  },
  "variants": [
   {
    "size": 30,
    "price": 199000
   },
   {
    "size": 50,
    "price": 249000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-mojo",
  "name": "Got My Mojo Back",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 249000,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.9,
  "votes": 27,
  "fragrantica": "120331",
  "notes": {
   "top": [
    "Chocolate",
    "Blackcurrant",
    "Almond"
   ],
   "middle": [
    "Jasmine",
    "Tuberose",
    "Cedar"
   ],
   "base": [
    "Praline",
    "Amber",
    "Sandalwood"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/got-my-mojo-back",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-got-my-mojo-back-eau-de-parfum-30ml-7f95d",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.5,
   "reviews": 101,
   "recommend": 98,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/got-my-mojo-back-eau-de-parfum"
  },
  "variants": [
   {
    "size": 30,
    "price": 199000
   },
   {
    "size": 50,
    "price": 249000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-musc-vanille",
  "name": "Musc Vanille",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 529000,
  "longevity": 7,
  "sillage": 5,
  "rating": 6.5,
  "votes": 16,
  "fragrantica": "97939",
  "notes": {
   "top": [
    "Pink Pepper",
    "Black Pepper"
   ],
   "middle": [
    "Coconut",
    "White Flowers"
   ],
   "base": [
    "White Musk",
    "Vanilla",
    "Woody Notes"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/alchemist-fragrance-musc-vanille-les-classiques",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-musc-vanille-les-classiques-1734583742212900340",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 5.0,
   "reviews": 4,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/musc-vanille-edp"
  },
  "variants": [
   {
    "size": 30,
    "price": 389000
   },
   {
    "size": 50,
    "price": 529000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-out-west-absolu",
  "name": "Out West Absolu",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 789000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "votes": 3,
  "fragrantica": "134505",
  "notes": {
   "top": [
    "Pear"
   ],
   "middle": [
    "Narcissus",
    "Thyme"
   ],
   "base": [
    "Labdanum",
    "Vetiver",
    "Tobacco",
    "Iris"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/out-west-absolu-copy-1",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-reflection",
  "name": "Reflection",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.7,
  "votes": 322,
  "fragrantica": "121124",
  "notes": {
   "top": [
    "Grapefruit",
    "Mandarin",
    "Fruity Notes",
    "Bergamot",
    "Green Notes"
   ],
   "middle": [
    "Peach",
    "Jasmine",
    "Geranium",
    "Patchouli",
    "Rose"
   ],
   "base": [
    "Musk",
    "Amber",
    "Cedar",
    "Sandalwood",
    "Vanilla"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-reflection-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · waytoglow",
    "url": "https://www.tokopedia.com/waytoglow/mykonos-reflection-extrait-de-parfum-50ml-100ml-unisex-1733549394070242509",
    "kind": "official"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-california",
  "name": "California",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 10.0,
  "votes": 5,
  "fragrantica": "121150",
  "notes": {
   "top": [
    "Lavender",
    "Cardamom",
    "Lemon"
   ],
   "middle": [
    "Coriander",
    "Lychee",
    "Nutmeg",
    "Geranium"
   ],
   "base": [
    "Tonka",
    "White Musk",
    "Vetiver"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-california-club-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-california-club-extrait-de-parfum-50ml-1730883094553134216",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-sunset-in-sumba",
  "name": "Sunset in Sumba",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 100,
  "price": 325000,
  "longevity": 7,
  "sillage": 6,
  "rating": 7.8,
  "votes": 24,
  "fragrantica": "83910",
  "notes": {
   "top": [
    "Mandarin",
    "Red Apple",
    "Cardamom",
    "Elemi"
   ],
   "middle": [
    "Clove",
    "Incense",
    "Lavender"
   ],
   "base": [
    "Vanilla",
    "Patchouli"
   ]
  },
  "ratingSrc": "fragrantica",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-sunset-in-sumba-perfume-edp-parfum-unisex-100ml-1730928031487198753",
    "kind": "marketplace"
   }
  ],
  "fd": {
   "rating": 4.8,
   "reviews": 13,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/sunset-in-sumba-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-fields-of-ubud",
  "name": "Fields of Ubud",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 9.1,
  "ratingSrc": "fragrantica",
  "fragrantica": "83912",
  "notes": {
   "all": [
    "Bergamot",
    "Rice",
    "Fig",
    "Clary Sage",
    "Lily of the Valley",
    "Sesame",
    "Tonka",
    "Musk",
    "Cedar"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-fields-of-ubud-perfume-extrait-de-parfum-unisex-100ml-2024-edition-1734227149653968417",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.2,
   "reviews": 10,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-fields-of-ubud-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "votes": 49
 },
 {
  "id": "p1945-princess-of-java",
  "name": "Princess of Java",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 325000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.0,
  "ratingSrc": "fragrantica",
  "fragrantica": "83911",
  "notes": {
   "top": [
    "Peach",
    "Green Pear",
    "Bitter Orange"
   ],
   "middle": [
    "Tuberose",
    "Neroli",
    "Jasmine",
    "Orange Blossom"
   ],
   "base": [
    "Vanilla",
    "Sandalwood",
    "Musk",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-princess-of-java-edp-parfum-unisex-100ml-magnet-1736086061190120993-1736085945388533281",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.5,
   "reviews": 36,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-princess-of-java-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "votes": 61
 },
 {
  "id": "p1945-great-batavia",
  "name": "The Great Batavia",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.1,
  "ratingSrc": "fragrantica",
  "fragrantica": "83909",
  "notes": {
   "top": [
    "Apple",
    "Lemon",
    "Watermelon",
    "Spearmint"
   ],
   "middle": [
    "Lavender",
    "Clove",
    "Geranium",
    "Elemi"
   ],
   "base": [
    "Patchouli",
    "Vanilla",
    "Tonka",
    "Moss"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-the-great-batavia-perfume-extrait-de-parfum-unisex-100ml-1731756662958360097",
    "kind": "marketplace"
   }
  ],
  "fd": {
   "rating": 4.5,
   "reviews": 8,
   "recommend": 87,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-the-great-batavia-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "votes": 47
 },
 {
  "id": "p1945-waters-of-maluku",
  "name": "Waters of Maluku",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.7,
  "ratingSrc": "fragrantica",
  "fragrantica": "83913",
  "notes": {
   "top": [
    "Grapefruit",
    "Carrot",
    "Ginger"
   ],
   "middle": [
    "Lotus",
    "Peony",
    "Clove"
   ],
   "base": [
    "Wet Stones",
    "Clearwood",
    "Vetiver"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-waters-of-maluku-perfume-edp-parfum-unisex-100ml-1735372843604477473",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.5,
   "reviews": 11,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-waters-of-maluku-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "votes": 49
 },
 {
  "id": "p1945-symphony-of-borobudur",
  "name": "Symphony of Borobudur",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 345000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Fig",
    "Mandarin",
    "Tuberose"
   ],
   "middle": [
    "Violet",
    "Incense",
    "Sandalwood",
    "Milk"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Benzoin",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-symphony-of-borobudur-perfume-edp-parfum-unisex-100ml-1730291553632224801",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.6,
   "reviews": 5,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/symphony-of-borobudur-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-heiress-of-minahasa",
  "name": "Heiress of Minahasa",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 345000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Mandarin",
    "Pepper",
    "Rhubarb"
   ],
   "middle": [
    "Rose",
    "Incense",
    "Patchouli",
    "Cashmere Wood"
   ],
   "base": [
    "Vetiver",
    "Sandalwood",
    "Benzoin",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tuesbelle Scent",
    "url": "https://tuesbellescent.com/products/662180/project-1945-heiress-of-minahasa-eau-de-parfum-__-100ml",
    "kind": "retailer"
   }
  ],
  "fd": {
   "rating": 5.0,
   "reviews": 3,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/heiress-of-minahasa-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-bamboe-roencing",
  "name": "Bamboe Roencing",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Galbanum",
    "Marine",
    "Peach"
   ],
   "middle": [
    "Jasmine",
    "Osmanthus",
    "Rose",
    "Ylang-Ylang"
   ],
   "base": [
    "Cedar",
    "Honey",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-bamboe-roencing-perfume-extrait-de-parfum-unisex-100ml-1735676707509667361-1735676678059820577",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.8,
   "reviews": 20,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/bamboe-roencing-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-arumanis",
  "name": "Arumanis",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Apple",
    "Pistachio",
    "Mandarin",
    "Orange"
   ],
   "middle": [
    "Chocolate",
    "Heliotrope",
    "Lily of the Valley"
   ],
   "base": [
    "Cedar",
    "Musk",
    "Sandalwood",
    "Vanilla"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-arumanis-perfume-extrait-de-parfum-unisex-100ml-1732913023640110625",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-velvet-toraja",
  "name": "Velvet Toraja",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Mandarin",
    "Pear",
    "Lime"
   ],
   "middle": [
    "Fig",
    "Jasmine",
    "Coffee"
   ],
   "base": [
    "Vanilla",
    "Patchouli",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-velvet-toraja-perfume-extrait-de-parfum-unisex-100ml-1733289406851417633",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-trails-of-bromo",
  "name": "Trails of Bromo",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Orange",
    "Apple",
    "Java Tea"
   ],
   "middle": [
    "Petitgrain",
    "Violet Leaf",
    "Cedar"
   ],
   "base": [
    "Musk",
    "Amber",
    "Moss"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-trails-of-bromo-perfume-extrait-de-parfum-unisex-100ml-1737686105227167265-1737686105288902177",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-sunrise-in-mentawai",
  "name": "Sunrise in Mentawai",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "X",
  "size": 100,
  "price": 345000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Basil",
    "Grapefruit"
   ],
   "middle": [
    "Peony",
    "Chamomile",
    "Cedar"
   ],
   "base": [
    "Sandalwood",
    "Ambroxan",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-sunrise-in-mentawai-perfume-extrait-de-parfum-unisex-100-ml-1738326727310214689-1738326717581264417",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-horas",
  "name": "Horas (x Chicco Jerikho)",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 375000,
  "longevity": 7,
  "sillage": 6,
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Rum",
    "Chocolate",
    "Coffee",
    "Caramel",
    "Almond",
    "Heliotrope",
    "Vetiver",
    "Sandalwood"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-x-cj-horas-perfume-edp-parfum-unisex-100ml-1737091423909807649",
    "kind": "marketplace"
   }
  ],
  "fd": {
   "rating": 3.8,
   "reviews": 4,
   "recommend": 75,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/x-cj-horas-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-petruk",
  "name": "Petruk (x Chicco Jerikho)",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 375000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Lemon",
    "Leather",
    "Cardamom",
    "Apple",
    "Rose",
    "Pepper",
    "Lavender",
    "Cedar",
    "Vetiver"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-x-cj-petruk-perfume-edp-parfum-unisex-100ml-1737091434725869089",
    "kind": "marketplace"
   }
  ],
  "fd": {
   "rating": 4.0,
   "reviews": 1,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/x-cj-petruk-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-samosir",
  "name": "Samosir (x Chicco Jerikho)",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "EDP",
  "size": 100,
  "price": 375000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Bergamot",
    "Green Notes",
    "Jasmine",
    "Honeysuckle",
    "Green Tea",
    "Honey",
    "Labdanum",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-x-cj-samosir-perfume-edp-parfum-unisex-100ml-1730927278768555658",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.7,
   "reviews": 7,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/samosir-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "p1945-apresiasi",
  "name": "Apresiasi",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 10,
  "price": 95000,
  "longevity": 7,
  "sillage": 6,
  "rating": 9.0,
  "ratingSrc": "fragrantica",
  "fragrantica": "83914",
  "notes": {
   "top": [
    "Bergamot",
    "Ambrette Seeds",
    "Orange"
   ],
   "middle": [
    "Neroli",
    "Petitgrain",
    "Musk"
   ],
   "base": [
    "Vetiver",
    "Cedar",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-apresiasi-perfume-edp-parfum-unisex-10ml-1737091430986909217",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.4,
   "reviews": 7,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-apresiasi-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "votes": 21
 },
 {
  "id": "p1945-nusantaras-embrace",
  "name": "Nusantara's Embrace",
  "brand": "Project 1945",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "EDP",
  "size": 10,
  "price": 95000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Citruses",
    "Incense",
    "Star Anise"
   ],
   "middle": [
    "Rice",
    "Black Orris",
    "Water Lily"
   ],
   "base": [
    "Sesame",
    "Sandalwood",
    "Hay"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Tokopedia · PROJECT 1945",
    "url": "https://www.tokopedia.com/project1945/project-1945-nusantara-s-embrace-perfume-edp-parfum-unisex-10ml-1737091388977808929",
    "kind": "marketplace"
   }
  ],
  "imgFit": "cover",
  "fd": {
   "rating": 4.6,
   "reviews": 7,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/project-1945/eau-de-parfum-3-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "oaken-batavia-barber",
  "name": "Batavia Barber",
  "brand": "Oaken Lab",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 899000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.9,
  "votes": 9,
  "fragrantica": "82651",
  "notes": {
   "all": [
    "Leather",
    "Patchouli",
    "Jasmine",
    "Neroli",
    "Musk",
    "Moss",
    "Bergamot",
    "Lavender",
    "Orange"
   ]
  },
  "ratingSrc": "fragrantica",
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "buy": [
   {
    "store": "Tokopedia · Oaken Lab",
    "url": "https://www.tokopedia.com/oakenlab/oaken-lab-perfume-50ml-batavia-barber",
    "kind": "marketplace"
   }
  ]
 },
 {
  "id": "studio-sable-heure-doree",
  "name": "L'Heure Dorée",
  "brand": "Studio Sable",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 588000,
  "longevity": 7,
  "sillage": 6,
  "rating": 9.1,
  "votes": 9,
  "fragrantica": "90893",
  "notes": {
   "all": [
    "Red Mandarin",
    "Labdanum",
    "Jasmine",
    "Violet Leaf",
    "Peach",
    "Black Tea"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 5.0,
   "reviews": 4,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/studio-sable/l-heure-doree-eau-de-parfum"
  },
  "priceSrc": "retailer",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-revered-oud",
  "name": "Revered Oud",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 391500,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.5,
  "votes": 102,
  "fragrantica": "92941",
  "notes": {
   "top": [
    "Rose",
    "Lemon",
    "Fruity Notes"
   ],
   "middle": [
    "Amber",
    "Gourmand Accord"
   ],
   "base": [
    "Vanilla",
    "Oud",
    "Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "fd": {
   "rating": 4.1,
   "reviews": 25,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/kahf/revered-oud-eau-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026",
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-parfum-revered-oud-100-ml-parfum-pria-wangi-tahan-lama-1729570274082851064",
    "kind": "official"
   }
  ]
 },
 {
  "id": "velixir-ares",
  "name": "Ares",
  "brand": "Velixir",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "EDP",
  "size": 100,
  "price": 445000,
  "longevity": 7,
  "sillage": 7,
  "rating": 9.0,
  "votes": 33,
  "fragrantica": "127591",
  "notes": {
   "top": [
    "Citruses",
    "Grapefruit",
    "Mandarin"
   ],
   "middle": [
    "Sandalwood",
    "Cedar"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Musk"
   ]
  },
  "ratingSrc": "fragrantica",
  "priceSrc": "retailer",
  "checked": "Okt 2026"
 },
 {
  "id": "chanel-bleu-edp",
  "name": "Bleu de Chanel EDP",
  "brand": "Chanel",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "EDP",
  "size": 100,
  "price": 2600000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.8,
  "ratingSrc": "fragrantica",
  "fragrantica": "25967",
  "notes": {
   "top": [
    "Grapefruit",
    "Lemon",
    "Mint",
    "Bergamot",
    "Pink Pepper",
    "Aldehydes",
    "Coriander"
   ],
   "middle": [
    "Ginger",
    "Jasmine",
    "Nutmeg",
    "Melon"
   ],
   "base": [
    "Incense",
    "Amber",
    "Cedar",
    "Sandalwood",
    "Amberwood",
    "Patchouli",
    "Labdanum"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.5,
   "reviews": 18,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/chanel/bleu-de-chanel"
  },
  "priceSrc": "estimasi",
  "votes": 23650,
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/chanel-bleu-de-chanel-edp-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "chanel-allure-sport",
  "name": "Allure Homme Sport",
  "brand": "Chanel",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 2300000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.5,
  "ratingSrc": "fragrantica",
  "fragrantica": "607",
  "notes": {
   "top": [
    "Orange",
    "Blood Mandarin",
    "Sea Notes",
    "Aldehydes"
   ],
   "middle": [
    "Pepper",
    "Neroli",
    "Cedar"
   ],
   "base": [
    "Tonka",
    "Vanilla",
    "White Musk",
    "Amber",
    "Vetiver",
    "Elemi"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "votes": 16059,
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/chanel-allure-homme-sport-man-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "chanel-no5-edp",
  "name": "N°5 EDP",
  "brand": "Chanel",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 3200000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.1,
  "ratingSrc": "fragrantica",
  "fragrantica": "40069",
  "notes": {
   "top": [
    "Aldehydes",
    "Ylang-Ylang",
    "Neroli",
    "Bergamot",
    "Lemon",
    "Peach"
   ],
   "middle": [
    "Iris",
    "Jasmine",
    "Rose",
    "Lily of the Valley"
   ],
   "base": [
    "Amber",
    "Sandalwood",
    "Musk",
    "Vanilla",
    "Oakmoss",
    "Vetiver",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "votes": 12551
 },
 {
  "id": "chanel-chance-tendre",
  "name": "Chance Eau Tendre",
  "brand": "Chanel",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDT",
  "size": 100,
  "price": 2600000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.2,
  "ratingSrc": "fragrantica",
  "fragrantica": "8069",
  "notes": {
   "top": [
    "Quince",
    "Grapefruit"
   ],
   "middle": [
    "Hyacinth",
    "Jasmine"
   ],
   "base": [
    "White Musk",
    "Iris",
    "Cedar",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 8,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/chanel/chance-eau-tendre-edp"
  },
  "priceSrc": "estimasi",
  "votes": 20338
 },
 {
  "id": "chanel-coco-mlle",
  "name": "Coco Mademoiselle EDP",
  "brand": "Chanel",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 2900000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.2,
  "ratingSrc": "fragrantica",
  "fragrantica": "611",
  "notes": {
   "top": [
    "Orange",
    "Mandarin",
    "Bergamot",
    "Orange Blossom"
   ],
   "middle": [
    "Rose",
    "Jasmine",
    "Mimosa",
    "Ylang-Ylang"
   ],
   "base": [
    "Patchouli",
    "White Musk",
    "Vanilla",
    "Vetiver",
    "Tonka"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "votes": 33666
 },
 {
  "id": "ysl-y-edp",
  "name": "Y EDP",
  "brand": "Yves Saint Laurent",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Aromatic",
  "conc": "EDP",
  "size": 100,
  "price": 2000000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": "50757",
  "notes": {
   "top": [
    "Apple",
    "Ginger",
    "Bergamot"
   ],
   "middle": [
    "Sage",
    "Juniper",
    "Geranium"
   ],
   "base": [
    "Amberwood",
    "Tonka",
    "Cedar",
    "Vetiver",
    "Olibanum"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.9,
   "reviews": 8,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/yves-saint-laurent/y-eau-de-parfum"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/ysl-yves-saint-laurent-y-edp-for-men-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ysl-libre",
  "name": "Libre EDP",
  "brand": "Yves Saint Laurent",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 90,
  "price": 2400000,
  "longevity": 8,
  "sillage": 7,
  "rating": 9.0,
  "ratingSrc": "femaledaily",
  "fragrantica": "56077",
  "notes": {
   "top": [
    "Lavender",
    "Mandarin",
    "Blackcurrant",
    "Petitgrain"
   ],
   "middle": [
    "Lavender",
    "Orange Blossom",
    "Jasmine"
   ],
   "base": [
    "Vanilla",
    "Musk",
    "Cedar",
    "Ambergris"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.8,
   "reviews": 156,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/yves-saint-laurent/libre-eau-de-parfum"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/ysl-yves-saint-laurent-libre-libre-eau-de-parfum-90ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ysl-black-opium",
  "name": "Black Opium EDP",
  "brand": "Yves Saint Laurent",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 90,
  "price": 2300000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": "25324",
  "notes": {
   "top": [
    "Pear",
    "Pink Pepper",
    "Orange Blossom"
   ],
   "middle": [
    "Coffee",
    "Jasmine",
    "Bitter Almond",
    "Licorice"
   ],
   "base": [
    "Vanilla",
    "Patchouli",
    "Cedar",
    "Cashmere Wood"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.5,
   "reviews": 259,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/yves-saint-laurent/black-opium"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/ysl-yves-saint-laurent-black-opium-edp-90ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ysl-lndlh",
  "name": "La Nuit de L'Homme",
  "brand": "Yves Saint Laurent",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDT",
  "size": 100,
  "price": 1900000,
  "longevity": 5,
  "sillage": 5,
  "rating": 8.4,
  "ratingSrc": "estimasi",
  "fragrantica": "5521",
  "notes": {
   "top": [
    "Cardamom"
   ],
   "middle": [
    "Lavender",
    "Cedar",
    "Bergamot"
   ],
   "base": [
    "Vetiver",
    "Caraway"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "armani-adg-edt",
  "name": "Acqua di Giò EDT",
  "brand": "Giorgio Armani",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 1600000,
  "longevity": 6,
  "sillage": 6,
  "rating": 7.9,
  "ratingSrc": "estimasi",
  "fragrantica": "410",
  "notes": {
   "top": [
    "Lime",
    "Lemon",
    "Bergamot",
    "Jasmine",
    "Orange",
    "Mandarin",
    "Neroli"
   ],
   "middle": [
    "Sea Notes",
    "Calone",
    "Peach",
    "Rosemary",
    "Freesia",
    "Hyacinth"
   ],
   "base": [
    "White Musk",
    "Cedar",
    "Oakmoss",
    "Patchouli",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "armani-adg-profumo",
  "name": "Acqua di Giò Profumo",
  "brand": "Giorgio Armani",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Aromatic",
  "conc": "EDP",
  "size": 75,
  "price": 2300000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "29727",
  "notes": {
   "top": [
    "Sea Notes",
    "Bergamot"
   ],
   "middle": [
    "Rosemary",
    "Sage",
    "Geranium"
   ],
   "base": [
    "Incense",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 2,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/giorgio-armani/acqua-di-gio-profumo-1"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "armani-si",
  "name": "Sì EDP",
  "brand": "Giorgio Armani",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 2300000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "18453",
  "notes": {
   "top": [
    "Blackcurrant"
   ],
   "middle": [
    "Rose",
    "Freesia"
   ],
   "base": [
    "Vanilla",
    "Patchouli",
    "Ambroxan",
    "Woody Notes"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.6,
   "reviews": 137,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/giorgio-armani/si-eau-de-parfum"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/giorgio-armani-si-woman-edp-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "armani-code",
  "name": "Armani Code",
  "brand": "Giorgio Armani",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 125,
  "price": 1700000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.2,
  "ratingSrc": "estimasi",
  "fragrantica": "412",
  "notes": {
   "top": [
    "Lemon",
    "Bergamot"
   ],
   "middle": [
    "Star Anise",
    "Olive Blossom",
    "Guaiac Wood"
   ],
   "base": [
    "Leather",
    "Tobacco",
    "Tonka"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "versace-eros-edt",
  "name": "Eros EDT",
  "brand": "Versace",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDT",
  "size": 100,
  "price": 1400000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": "16657",
  "notes": {
   "top": [
    "Mint",
    "Green Apple",
    "Lemon"
   ],
   "middle": [
    "Tonka",
    "Ambroxan",
    "Geranium"
   ],
   "base": [
    "Vanilla",
    "Vetiver",
    "Oakmoss",
    "Cedar"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.6,
   "reviews": 14,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/versace/eros-pour-homme"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "versace-eros-flame",
  "name": "Eros Flame",
  "brand": "Versace",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 1500000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.1,
  "ratingSrc": "estimasi",
  "fragrantica": "52180",
  "notes": {
   "top": [
    "Mandarin",
    "Black Pepper",
    "Chinotto",
    "Lemon",
    "Rosemary"
   ],
   "middle": [
    "Pepper",
    "Rose",
    "Geranium"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Sandalwood",
    "Patchouli",
    "Cedar",
    "Oakmoss"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/versace-eros-flame-edp-for-men-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "versace-dylan-blue",
  "name": "Dylan Blue",
  "brand": "Versace",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 1400000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.2,
  "ratingSrc": "femaledaily",
  "fragrantica": "40031",
  "notes": {
   "top": [
    "Bergamot",
    "Water Notes",
    "Grapefruit",
    "Fig Leaf"
   ],
   "middle": [
    "Ambroxan",
    "Black Pepper",
    "Patchouli",
    "Violet Leaf",
    "Papyrus"
   ],
   "base": [
    "Incense",
    "Musk",
    "Tonka",
    "Saffron"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.0,
   "reviews": 2,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/versace/versace-dylan-blue-pour-homme-1"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/versace-dylan-blue-pour-homme-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "versace-bright-crystal",
  "name": "Bright Crystal",
  "brand": "Versace",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDT",
  "size": 90,
  "price": 1300000,
  "longevity": 5,
  "sillage": 5,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": "632",
  "notes": {
   "top": [
    "Pomegranate",
    "Yuzu",
    "Water Notes"
   ],
   "middle": [
    "Peony",
    "Magnolia",
    "Lotus"
   ],
   "base": [
    "Musk",
    "Mahogany",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.3,
   "reviews": 66,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/versace/bright-crystal"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "prada-lhomme",
  "name": "L'Homme",
  "brand": "Prada",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Floral",
  "conc": "EDT",
  "size": 100,
  "price": 2200000,
  "longevity": 6,
  "sillage": 5,
  "rating": 8.2,
  "ratingSrc": "estimasi",
  "fragrantica": "39029",
  "notes": {
   "top": [
    "Neroli",
    "Black Pepper",
    "Cardamom"
   ],
   "middle": [
    "Iris",
    "Violet",
    "Geranium",
    "Mate"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Cedar",
    "Sandalwood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/prada-l-homme-for-men-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "prada-lr-carbon",
  "name": "Luna Rossa Carbon",
  "brand": "Prada",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 1800000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": "43402",
  "notes": {
   "top": [
    "Bergamot",
    "Pepper"
   ],
   "middle": [
    "Lavender",
    "Metallic Notes",
    "Water Notes"
   ],
   "base": [
    "Patchouli",
    "Ambroxan"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/prada-luna-rossa-carbon-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "valentino-bir-donna",
  "name": "Born in Roma Donna",
  "brand": "Valentino",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 2400000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": "55805",
  "notes": {
   "top": [
    "Blackcurrant",
    "Pink Pepper",
    "Bergamot"
   ],
   "middle": [
    "Jasmine",
    "Jasmine Tea"
   ],
   "base": [
    "Vanilla",
    "Cashmeran",
    "Guaiac Wood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "mugler-alien",
  "name": "Alien EDP",
  "brand": "Mugler",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Woody",
  "conc": "EDP",
  "size": 60,
  "price": 2000000,
  "longevity": 9,
  "sillage": 8,
  "rating": 7.9,
  "ratingSrc": "estimasi",
  "fragrantica": "707",
  "notes": {
   "top": [
    "Jasmine"
   ],
   "middle": [
    "Cashmeran",
    "Woody Notes"
   ],
   "base": [
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "mugler-angel",
  "name": "Angel EDP",
  "brand": "Mugler",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 2100000,
  "longevity": 9,
  "sillage": 9,
  "rating": 7.6,
  "ratingSrc": "estimasi",
  "fragrantica": "704",
  "notes": {
   "top": [
    "Cotton Candy",
    "Coconut",
    "Blackcurrant",
    "Melon",
    "Bergamot",
    "Mandarin"
   ],
   "middle": [
    "Honey",
    "Red Berries",
    "Plum",
    "Apricot",
    "Peach",
    "Jasmine",
    "Rose"
   ],
   "base": [
    "Patchouli",
    "Chocolate",
    "Caramel",
    "Vanilla",
    "Tonka",
    "Amber",
    "Musk"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "tomford-ombre-leather",
  "name": "Ombré Leather",
  "brand": "Tom Ford",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 100,
  "price": 4200000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": "50239",
  "notes": {
   "top": [
    "Cardamom"
   ],
   "middle": [
    "Leather",
    "Jasmine"
   ],
   "base": [
    "Amber",
    "Moss",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 1,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/tom-ford/tom-ford-the-ultimate-bronzer-2"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "tomford-tobacco-vanille",
  "name": "Tobacco Vanille",
  "brand": "Tom Ford",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 4700000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "1825",
  "notes": {
   "top": [
    "Tobacco Leaf",
    "Spicy Notes"
   ],
   "middle": [
    "Vanilla",
    "Cacao",
    "Tonka",
    "Tobacco Blossom"
   ],
   "base": [
    "Dried Fruits",
    "Woody Notes"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.7,
   "reviews": 10,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/tom-ford/tobacco-vanille"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "tomford-lost-cherry",
  "name": "Lost Cherry",
  "brand": "Tom Ford",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 50,
  "price": 4900000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": "51411",
  "notes": {
   "top": [
    "Black Cherry",
    "Cherry Liqueur",
    "Bitter Almond"
   ],
   "middle": [
    "Rose",
    "Jasmine"
   ],
   "base": [
    "Peru Balsam",
    "Tonka",
    "Sandalwood",
    "Vetiver",
    "Cinnamon",
    "Clove"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.4,
   "reviews": 16,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/tom-ford/lost-cherry"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "mfk-br540-35",
  "name": "Baccarat Rouge 540 (35ml)",
  "brand": "Maison Francis Kurkdjian",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 35,
  "price": 3500000,
  "longevity": 9,
  "sillage": 9,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": "33519",
  "notes": {
   "top": [
    "Saffron",
    "Jasmine"
   ],
   "middle": [
    "Amberwood",
    "Ambergris"
   ],
   "base": [
    "Fir Resin",
    "Cedar"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.3,
   "reviews": 90,
   "recommend": 83,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/maison-francis-kurkdjian/baccarat-rouge-540"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "pdm-layton",
  "name": "Layton",
  "brand": "Parfums de Marly",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Floral",
  "conc": "EDP",
  "size": 125,
  "price": 4700000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.6,
  "ratingSrc": "estimasi",
  "fragrantica": "39314",
  "notes": {
   "top": [
    "Apple",
    "Lavender",
    "Bergamot",
    "Mandarin"
   ],
   "middle": [
    "Geranium",
    "Violet",
    "Jasmine"
   ],
   "base": [
    "Vanilla",
    "Cardamom",
    "Sandalwood",
    "Pepper",
    "Patchouli",
    "Guaiac Wood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "pdm-delina",
  "name": "Delina",
  "brand": "Parfums de Marly",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Woody",
  "conc": "EDP",
  "size": 75,
  "price": 4900000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": "43871",
  "notes": {
   "top": [
    "Lychee",
    "Rhubarb",
    "Bergamot",
    "Nutmeg"
   ],
   "middle": [
    "Rose",
    "Peony",
    "Musk",
    "Vanilla"
   ],
   "base": [
    "Cashmeran",
    "Incense",
    "Cedar",
    "Vetiver"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.9,
   "reviews": 10,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/parfums-de-marly/delina"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/parfums-de-marly-delina-edp-75ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "byredo-gypsy-water",
  "name": "Gypsy Water",
  "brand": "Byredo",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 50,
  "price": 3300000,
  "longevity": 5,
  "sillage": 5,
  "rating": 7.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "3575",
  "notes": {
   "top": [
    "Bergamot",
    "Lemon",
    "Pepper",
    "Juniper"
   ],
   "middle": [
    "Incense",
    "Pine Needles",
    "Iris"
   ],
   "base": [
    "Amber",
    "Vanilla",
    "Sandalwood"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 3.8,
   "reviews": 12,
   "recommend": 83,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/byredo/byredo-gypsy-water-2"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "byredo-mojave-ghost",
  "name": "Mojave Ghost",
  "brand": "Byredo",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 3300000,
  "longevity": 6,
  "sillage": 5,
  "rating": 7.3,
  "ratingSrc": "femaledaily",
  "fragrantica": "27040",
  "notes": {
   "top": [
    "Ambrette",
    "Sapodilla"
   ],
   "middle": [
    "Magnolia",
    "Violet",
    "Sandalwood"
   ],
   "base": [
    "Ambergris",
    "Cedar",
    "Musk"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 3.7,
   "reviews": 18,
   "recommend": 77,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/byredo/mojave-ghost-28"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "jomalone-wsss",
  "name": "Wood Sage & Sea Salt",
  "brand": "Jo Malone London",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "EDC",
  "size": 100,
  "price": 2600000,
  "longevity": 4,
  "sillage": 4,
  "rating": 7.7,
  "ratingSrc": "estimasi",
  "fragrantica": "25529",
  "notes": {
   "top": [
    "Ambrette"
   ],
   "middle": [
    "Sea Salt"
   ],
   "base": [
    "Sage"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "jomalone-pear-freesia",
  "name": "English Pear & Freesia",
  "brand": "Jo Malone London",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDC",
  "size": 100,
  "price": 2600000,
  "longevity": 4,
  "sillage": 4,
  "rating": 7.8,
  "ratingSrc": "estimasi",
  "fragrantica": "10314",
  "notes": {
   "top": [
    "Pear",
    "Melon"
   ],
   "middle": [
    "Freesia",
    "Rose"
   ],
   "base": [
    "Musk",
    "Patchouli",
    "Rhubarb",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "kilian-ldbs",
  "name": "Love, Don't Be Shy",
  "brand": "Kilian",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 4600000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.2,
  "ratingSrc": "estimasi",
  "fragrantica": "4322",
  "notes": {
   "top": [
    "Neroli",
    "Bergamot",
    "Pink Pepper",
    "Coriander",
    "Lavender"
   ],
   "middle": [
    "Orange Blossom",
    "Rose",
    "Jasmine",
    "Iris"
   ],
   "base": [
    "Caramel",
    "Vanilla",
    "Musk",
    "Labdanum"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "kilian-angels-share",
  "name": "Angels' Share",
  "brand": "Kilian",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 4600000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.6,
  "ratingSrc": "estimasi",
  "fragrantica": "62615",
  "notes": {
   "top": [
    "Cognac"
   ],
   "middle": [
    "Cinnamon",
    "Tonka",
    "Oak"
   ],
   "base": [
    "Praline",
    "Vanilla",
    "Sandalwood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "initio-side-effect",
  "name": "Side Effect",
  "brand": "Initio",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 90,
  "price": 4900000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.4,
  "ratingSrc": "estimasi",
  "fragrantica": "42260",
  "notes": {
   "top": [
    "Rum"
   ],
   "middle": [
    "Tobacco",
    "Cinnamon"
   ],
   "base": [
    "Vanilla"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/initio-side-effect-edp-90ml-1731599805808280625",
    "kind": "official"
   }
  ]
 },
 {
  "id": "nishane-hacivat",
  "name": "Hacivat",
  "brand": "Nishane",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "X",
  "size": 50,
  "price": 3500000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.6,
  "ratingSrc": "estimasi",
  "fragrantica": "44174",
  "notes": {
   "top": [
    "Pineapple",
    "Bergamot",
    "Grapefruit"
   ],
   "middle": [
    "Patchouli",
    "Cedar",
    "Jasmine"
   ],
   "base": [
    "Oakmoss",
    "Woody Notes"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "boss-bottled",
  "name": "Boss Bottled",
  "brand": "Hugo Boss",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Woody",
  "conc": "EDT",
  "size": 100,
  "price": 1400000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": "383",
  "notes": {
   "top": [
    "Apple",
    "Plum",
    "Bergamot",
    "Lemon",
    "Geranium"
   ],
   "middle": [
    "Cinnamon",
    "Mahogany",
    "Carnation"
   ],
   "base": [
    "Vanilla",
    "Sandalwood",
    "Cedar",
    "Vetiver"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 3,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/hugo-boss/hugo-boss-boss-bottled-eau-de-toilette"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/hugo-boss-bottled-eau-de-toilette-men-100ml-1731846471470712274",
    "kind": "official"
   }
  ]
 },
 {
  "id": "burberry-her",
  "name": "Her EDP",
  "brand": "Burberry",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Fruity",
  "conc": "EDP",
  "size": 100,
  "price": 2200000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "femaledaily",
  "fragrantica": "51694",
  "notes": {
   "top": [
    "Strawberry",
    "Raspberry",
    "Blackberry",
    "Sour Cherry",
    "Blackcurrant",
    "Mandarin",
    "Lemon"
   ],
   "middle": [
    "Violet",
    "Jasmine"
   ],
   "base": [
    "Musk",
    "Vanilla",
    "Cashmeran",
    "Amber",
    "Patchouli",
    "Oakmoss"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.2,
   "reviews": 16,
   "recommend": 75,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/burberry/her-edp"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "gucci-guilty-ph",
  "name": "Guilty Pour Homme",
  "brand": "Gucci",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Floral",
  "conc": "EDT",
  "size": 90,
  "price": 1700000,
  "longevity": 6,
  "sillage": 6,
  "rating": 7.7,
  "ratingSrc": "estimasi",
  "fragrantica": "11037",
  "notes": {
   "top": [
    "Lemon",
    "Lavender"
   ],
   "middle": [
    "Orange Blossom",
    "Neroli"
   ],
   "base": [
    "Cedar",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/gucci-guilty-pour-homme-edt-90ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ch-good-girl",
  "name": "Good Girl EDP",
  "brand": "Carolina Herrera",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 80,
  "price": 2000000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "39681",
  "notes": {
   "top": [
    "Almond",
    "Coffee",
    "Bergamot",
    "Lemon"
   ],
   "middle": [
    "Tuberose",
    "Jasmine",
    "Orange Blossom",
    "Rose"
   ],
   "base": [
    "Tonka",
    "Cacao",
    "Vanilla",
    "Praline",
    "Sandalwood",
    "Musk",
    "Cedar"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.6,
   "reviews": 63,
   "recommend": 98,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carolina-herrera/good-girl"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "ch-212-vip-men",
  "name": "212 VIP Men",
  "brand": "Carolina Herrera",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 1700000,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.8,
  "ratingSrc": "estimasi",
  "fragrantica": "12865",
  "notes": {
   "top": [
    "Passionfruit",
    "Lime",
    "Pepper",
    "Ginger"
   ],
   "middle": [
    "Vodka",
    "Gin",
    "Mint"
   ],
   "base": [
    "Amber",
    "Woody Notes",
    "Leather"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/ch-carolina-herrera-212-vip-men-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ck-one",
  "name": "CK One",
  "brand": "Calvin Klein",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDT",
  "size": 100,
  "price": 700000,
  "longevity": 4,
  "sillage": 4,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": "276",
  "notes": {
   "top": [
    "Lemon",
    "Green Notes",
    "Bergamot",
    "Pineapple",
    "Mandarin",
    "Cardamom",
    "Papaya"
   ],
   "middle": [
    "Lily of the Valley",
    "Jasmine",
    "Violet",
    "Nutmeg",
    "Rose",
    "Iris",
    "Freesia"
   ],
   "base": [
    "Musk",
    "Cedar",
    "Sandalwood",
    "Oakmoss",
    "Green Tea",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.3,
   "reviews": 56,
   "recommend": 98,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/calvin-klein/one-1"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "ck-eternity-men",
  "name": "Eternity for Men",
  "brand": "Calvin Klein",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Aromatic",
  "conc": "EDT",
  "size": 100,
  "price": 800000,
  "longevity": 6,
  "sillage": 5,
  "rating": 7.6,
  "ratingSrc": "estimasi",
  "fragrantica": "258",
  "notes": {
   "top": [
    "Lavender",
    "Lemon",
    "Bergamot",
    "Mandarin"
   ],
   "middle": [
    "Basil",
    "Juniper",
    "Sage",
    "Geranium",
    "Jasmine",
    "Lily of the Valley"
   ],
   "base": [
    "Vetiver",
    "Sandalwood",
    "Rosewood",
    "Amber",
    "Musk"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/calvin-klein-eternity-for-men-edt-100ml-1732496278874654162",
    "kind": "official"
   }
  ]
 },
 {
  "id": "bvlgari-aqva",
  "name": "Aqva Pour Homme",
  "brand": "Bvlgari",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Aromatic",
  "conc": "EDT",
  "size": 100,
  "price": 1400000,
  "longevity": 6,
  "sillage": 6,
  "rating": 7.8,
  "ratingSrc": "estimasi",
  "fragrantica": "153",
  "notes": {
   "top": [
    "Mandarin",
    "Petitgrain"
   ],
   "middle": [
    "Seaweed",
    "Cotton",
    "Santolina"
   ],
   "base": [
    "Posidonia",
    "Mineral Notes",
    "Clary Sage"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/bvlgari-aqva-pour-homme-edt-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "jpg-le-male-edt",
  "name": "Le Male EDT",
  "brand": "Jean Paul Gaultier",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "EDT",
  "size": 125,
  "price": 1500000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.2,
  "ratingSrc": "estimasi",
  "fragrantica": "430",
  "notes": {
   "top": [
    "Lavender",
    "Mint",
    "Cardamom",
    "Bergamot",
    "Artemisia"
   ],
   "middle": [
    "Cinnamon",
    "Orange Blossom",
    "Cumin"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Amber",
    "Sandalwood",
    "Cedar"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/parfum-jpg-le-male-for-men-eau-de-toilette-125ml-1730349723883767250",
    "kind": "official"
   }
  ]
 },
 {
  "id": "jpg-le-male-elixir",
  "name": "Le Male Elixir",
  "brand": "Jean Paul Gaultier",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Gourmand",
  "conc": "X",
  "size": 125,
  "price": 2300000,
  "longevity": 9,
  "sillage": 9,
  "rating": 8.4,
  "ratingSrc": "estimasi",
  "fragrantica": "81642",
  "notes": {
   "top": [
    "Lavender",
    "Mint"
   ],
   "middle": [
    "Vanilla",
    "Benzoin"
   ],
   "base": [
    "Honey",
    "Tonka",
    "Tobacco"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/jpg-jean-paul-gaultier-le-male-elixir-parfum-125ml-1730287204830774738",
    "kind": "official"
   }
  ]
 },
 {
  "id": "jpg-le-beau",
  "name": "Le Beau EDT",
  "brand": "Jean Paul Gaultier",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Gourmand",
  "conc": "EDT",
  "size": 125,
  "price": 1900000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": "55785",
  "notes": {
   "top": [
    "Bergamot"
   ],
   "middle": [
    "Coconut"
   ],
   "base": [
    "Tonka"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/jpg-jean-paul-gaultier-le-beau-edt-125ml-1730337531183400402",
    "kind": "official"
   }
  ]
 },
 {
  "id": "jpg-scandal",
  "name": "Scandal EDP",
  "brand": "Jean Paul Gaultier",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 80,
  "price": 2000000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.9,
  "ratingSrc": "estimasi",
  "fragrantica": "45651",
  "notes": {
   "top": [
    "Blood Orange",
    "Mandarin"
   ],
   "middle": [
    "Honey",
    "Gardenia",
    "Orange Blossom",
    "Jasmine",
    "Peach"
   ],
   "base": [
    "Beeswax",
    "Caramel",
    "Patchouli",
    "Licorice"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/jpg-jean-paul-gaultier-scandal-women-edp-80ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "rabanne-1-million",
  "name": "1 Million EDT",
  "brand": "Rabanne",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "EDT",
  "size": 100,
  "price": 1400000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": "3747",
  "notes": {
   "top": [
    "Grapefruit",
    "Mint",
    "Blood Mandarin"
   ],
   "middle": [
    "Rose",
    "Cinnamon",
    "Spices"
   ],
   "base": [
    "Leather",
    "Amber",
    "Woody Notes",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.6,
   "reviews": 6,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/paco-rabanne/1-million"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "rabanne-invictus",
  "name": "Invictus",
  "brand": "Rabanne",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDT",
  "size": 100,
  "price": 1500000,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.7,
  "ratingSrc": "estimasi",
  "fragrantica": "18471",
  "notes": {
   "top": [
    "Grapefruit",
    "Sea Notes",
    "Mandarin"
   ],
   "middle": [
    "Bay Leaf",
    "Jasmine"
   ],
   "base": [
    "Ambergris",
    "Guaiac Wood",
    "Oakmoss",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "rabanne-lady-million",
  "name": "Lady Million",
  "brand": "Rabanne",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 80,
  "price": 1700000,
  "longevity": 8,
  "sillage": 8,
  "rating": 7.3,
  "ratingSrc": "femaledaily",
  "fragrantica": "9045",
  "notes": {
   "top": [
    "Raspberry",
    "Neroli",
    "Lemon"
   ],
   "middle": [
    "Gardenia",
    "Jasmine",
    "Orange Blossom"
   ],
   "base": [
    "Honey",
    "Patchouli",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 3.6,
   "reviews": 13,
   "recommend": 92,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/paco-rabanne/lady-million-1"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "givenchy-linterdit",
  "name": "L'Interdit EDP",
  "brand": "Givenchy",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 80,
  "price": 2100000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": "51488",
  "notes": {
   "top": [
    "Pear",
    "Bergamot"
   ],
   "middle": [
    "Tuberose",
    "Orange Blossom",
    "Jasmine"
   ],
   "base": [
    "Vetiver",
    "Patchouli",
    "Ambroxan",
    "Vanilla"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.5,
   "reviews": 13,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/givenchy/linterdit"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "lancome-lveb",
  "name": "La Vie Est Belle EDP",
  "brand": "Lancôme",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 2000000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.2,
  "ratingSrc": "femaledaily",
  "fragrantica": "14982",
  "notes": {
   "top": [
    "Blackcurrant",
    "Pear"
   ],
   "middle": [
    "Iris",
    "Jasmine",
    "Orange Blossom"
   ],
   "base": [
    "Praline",
    "Vanilla",
    "Patchouli",
    "Tonka"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.4,
   "reviews": 194,
   "recommend": 95,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/lancome/la-vie-est-belle-2"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · C&C Official Store",
    "url": "https://www.tokopedia.com/cncparfumori/lancome-la-vie-est-belle-edp-100ml-1733652054260483538",
    "kind": "official"
   }
  ]
 },
 {
  "id": "dg-light-blue",
  "name": "Light Blue EDT",
  "brand": "Dolce & Gabbana",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDT",
  "size": 100,
  "price": 1300000,
  "longevity": 5,
  "sillage": 6,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": "485",
  "notes": {
   "top": [
    "Lemon",
    "Apple",
    "Cedar",
    "Bellflower"
   ],
   "middle": [
    "Bamboo",
    "Jasmine",
    "Rose"
   ],
   "base": [
    "Cedar",
    "Musk",
    "Amber"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.3,
   "reviews": 157,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/dolce-gabbana/light-blue"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "mm-fireplace",
  "name": "Replica By the Fireplace",
  "brand": "Maison Margiela",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDT",
  "size": 100,
  "price": 2300000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.2,
  "ratingSrc": "estimasi",
  "fragrantica": "31623",
  "notes": {
   "top": [
    "Pink Pepper",
    "Orange Blossom",
    "Clove"
   ],
   "middle": [
    "Chestnut",
    "Guaiac Wood",
    "Juniper"
   ],
   "base": [
    "Vanilla",
    "Peru Balsam",
    "Cashmeran"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Zataru",
    "url": "https://www.tokopedia.com/zataru/maison-margiela-replica-by-the-fireplace-unisex-edt-100-ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "ag-cloud",
  "name": "Cloud",
  "brand": "Ariana Grande",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 900000,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.8,
  "ratingSrc": "estimasi",
  "fragrantica": "50384",
  "notes": {
   "top": [
    "Lavender",
    "Pear",
    "Bergamot"
   ],
   "middle": [
    "Whipped Cream",
    "Praline",
    "Coconut",
    "Vanilla Orchid"
   ],
   "base": [
    "Musk",
    "Woody Notes"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "vs-bombshell",
  "name": "Bombshell",
  "brand": "Victoria's Secret",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 1500000,
  "longevity": 6,
  "sillage": 6,
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": "10190",
  "notes": {
   "top": [
    "Passionfruit",
    "Grapefruit",
    "Pineapple",
    "Tangerine",
    "Strawberry"
   ],
   "middle": [
    "Peony",
    "Vanilla Orchid",
    "Red Berries",
    "Jasmine",
    "Lily of the Valley"
   ],
   "base": [
    "Musk",
    "Woody Notes",
    "Oakmoss"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.6,
   "reviews": 295,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/victoria-s-secret/bombshell-2"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "kayali-vanilla28",
  "name": "Vanilla | 28",
  "brand": "Kayali",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 2600000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": "52616",
  "notes": {
   "top": [
    "Vanilla Orchid"
   ],
   "middle": [
    "Brown Sugar",
    "Tonka"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Musk"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 3,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/kayali/vanilla-28-vanilla-2"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "lattafa-khamrah",
  "name": "Khamrah",
  "brand": "Lattafa",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 550000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.4,
  "ratingSrc": "estimasi",
  "fragrantica": "75805",
  "notes": {
   "top": [
    "Cinnamon",
    "Nutmeg",
    "Bergamot"
   ],
   "middle": [
    "Dates",
    "Praline",
    "Tuberose",
    "Mahonial"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Amberwood",
    "Myrrh",
    "Benzoin",
    "Akigalawood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/lattafa-khamrah-edp-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "lattafa-khamrah-qahwa",
  "name": "Khamrah Qahwa",
  "brand": "Lattafa",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 550000,
  "longevity": 9,
  "sillage": 8,
  "rating": 8.3,
  "ratingSrc": "estimasi",
  "fragrantica": "88175",
  "notes": {
   "top": [
    "Cinnamon",
    "Cardamom",
    "Ginger"
   ],
   "middle": [
    "Praline",
    "Candied Fruits",
    "White Flowers"
   ],
   "base": [
    "Vanilla",
    "Coffee",
    "Tonka",
    "Benzoin",
    "Musk"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/lattafa-khamrah-qahwa-edp-100ml-1733701367685612593",
    "kind": "official"
   }
  ]
 },
 {
  "id": "lattafa-asad",
  "name": "Asad",
  "brand": "Lattafa",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Oriental",
  "conc": "EDP",
  "size": 100,
  "price": 400000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.1,
  "ratingSrc": "estimasi",
  "fragrantica": "72821",
  "notes": {
   "top": [
    "Black Pepper",
    "Pineapple",
    "Tobacco"
   ],
   "middle": [
    "Coffee",
    "Patchouli",
    "Iris"
   ],
   "base": [
    "Vanilla",
    "Amber",
    "Benzoin",
    "Labdanum"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/lattafa-asad-for-men-edp-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "lattafa-yara",
  "name": "Yara",
  "brand": "Lattafa",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 400000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": "76880",
  "notes": {
   "top": [
    "Orchid",
    "Heliotrope",
    "Tangerine"
   ],
   "middle": [
    "Gourmand Accord",
    "Tropical Fruits"
   ],
   "base": [
    "Vanilla",
    "Musk",
    "Sandalwood"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi"
 },
 {
  "id": "armaf-cdni-man",
  "name": "Club de Nuit Intense Man",
  "brand": "Armaf",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fruity",
  "conc": "EDT",
  "size": 105,
  "price": 600000,
  "longevity": 9,
  "sillage": 9,
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": "34696",
  "notes": {
   "top": [
    "Lemon",
    "Pineapple",
    "Bergamot",
    "Blackcurrant",
    "Apple"
   ],
   "middle": [
    "Birch",
    "Jasmine",
    "Rose"
   ],
   "base": [
    "Musk",
    "Ambergris",
    "Patchouli",
    "Vanilla"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 5.0,
   "reviews": 1,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/armaf/club-de-nuit-intense-man"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "armaf-cdn-untold",
  "name": "Club de Nuit Untold",
  "brand": "Armaf",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 105,
  "price": 650000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.1,
  "ratingSrc": "estimasi",
  "fragrantica": "78476",
  "notes": {
   "top": [
    "Saffron",
    "Jasmine"
   ],
   "middle": [
    "Amberwood",
    "Ambergris"
   ],
   "base": [
    "Fir Resin",
    "Cedar"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/armaf-club-de-nuit-untold-edp-105ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "afnan-9pm",
  "name": "9PM",
  "brand": "Afnan",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 500000,
  "longevity": 8,
  "sillage": 8,
  "rating": 8.1,
  "ratingSrc": "estimasi",
  "fragrantica": "65414",
  "notes": {
   "top": [
    "Apple",
    "Cinnamon",
    "Lavender",
    "Bergamot"
   ],
   "middle": [
    "Orange Blossom",
    "Lily of the Valley"
   ],
   "base": [
    "Vanilla",
    "Tonka",
    "Amber",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · ETC Official Store",
    "url": "https://www.tokopedia.com/etcofficial/parfum-pria-afnan-9pm-edp-100ml-for-men",
    "kind": "official"
   }
  ]
 },
 {
  "id": "rasasi-hawas",
  "name": "Hawas for Him",
  "brand": "Rasasi",
  "origin": "Impor",
  "gender": "Pria",
  "family": "Fresh",
  "conc": "EDP",
  "size": 100,
  "price": 700000,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": "46890",
  "notes": {
   "top": [
    "Apple",
    "Bergamot",
    "Lemon",
    "Cinnamon"
   ],
   "middle": [
    "Plum",
    "Orange Blossom",
    "Cardamom"
   ],
   "base": [
    "Ambergris",
    "Musk",
    "Driftwood",
    "Patchouli"
   ]
  },
  "notesSrc": "manual",
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/parfum-rasasi-hawas-for-him-edp-100ml-1731599790809252913",
    "kind": "official"
   }
  ]
 },
 {
  "id": "lelabo-santal33",
  "name": "Santal 33",
  "brand": "Le Labo",
  "origin": "Impor",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 3800000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "femaledaily",
  "fragrantica": "12201",
  "notes": {
   "all": [
    "Sandalwood",
    "Cardamom",
    "Violet",
    "Papyrus",
    "Leather",
    "Iris",
    "Cedar",
    "Ambrox",
    "Spices"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.2,
   "reviews": 14,
   "recommend": 71,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/le-labo/santal-34"
  },
  "priceSrc": "estimasi"
 },
 {
  "id": "gucci-bloom",
  "name": "Bloom EDP",
  "brand": "Gucci",
  "origin": "Impor",
  "gender": "Wanita",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 2300000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.2,
  "ratingSrc": "femaledaily",
  "fragrantica": "44894",
  "notes": {
   "all": [
    "Tuberose",
    "Jasmine",
    "Rangoon Creeper"
   ]
  },
  "notesSrc": "manual",
  "fd": {
   "rating": 4.4,
   "reviews": 142,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/gucci/bloom-bloom"
  },
  "priceSrc": "estimasi",
  "buy": [
   {
    "store": "Tokopedia · Love By Winni",
    "url": "https://www.tokopedia.com/lovebywinnicollection/gucci-bloom-eau-de-parfum-100ml",
    "kind": "official"
   }
  ]
 },
 {
  "id": "mykonos-slow-living",
  "name": "Slow Living",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Amalfi Lemon",
    "Lemon Blossom"
   ],
   "middle": [
    "Neroli",
    "Lavender"
   ],
   "base": [
    "Orcanox"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-slow-living-edp-50ml",
    "kind": "site"
   }
  ],
  "fd": {
   "rating": 4.7,
   "reviews": 18,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/mykonos/slow-living-edt"
  },
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-constantine",
  "name": "Constantine",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Cardamom",
    "Violet Leaf",
    "Pineapple",
    "Mandarin"
   ],
   "middle": [
    "Lily of the Valley",
    "Jasmine",
    "Lavender",
    "Artemisia"
   ],
   "base": [
    "Amberwood",
    "Moss",
    "White Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-constantine-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · waytoglow",
    "url": "https://www.tokopedia.com/waytoglow/mykonos-constantine-extrait-de-parfum-50ml-unisex-1736909884693775565",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-marbella",
  "name": "Marbella",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Orange",
    "Lemon",
    "Passionfruit",
    "Mango"
   ],
   "middle": [
    "Frangipani",
    "Solar Notes",
    "Blackcurrant"
   ],
   "base": [
    "Vanilla",
    "Benzoin",
    "Musk",
    "Labdanum"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-marbella-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-untamed",
  "name": "Untamed",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Blackcurrant",
    "Bergamot",
    "Lemon",
    "Aldehydes",
    "Crisp Linen Accord"
   ],
   "middle": [
    "Praline",
    "Musk",
    "Jasmine",
    "Violet",
    "Coconut Soap Accord"
   ],
   "base": [
    "Black Amber",
    "Cedar",
    "Vetiver",
    "Musk",
    "Vanilla",
    "Cashmeran"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-untamed-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-inferno",
  "name": "Inferno",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Blackcurrant",
    "Bergamot",
    "Grapefruit",
    "Caramelized Pineapple"
   ],
   "middle": [
    "Clove",
    "Nutmeg",
    "Ginger",
    "Cardamom",
    "Rose"
   ],
   "base": [
    "Patchouli",
    "Oakmoss",
    "Amber",
    "Musk",
    "Vetiver",
    "Tonka",
    "Ambroxan"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-inferno-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-imperium",
  "name": "Imperium",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Lime",
    "Bergamot",
    "Mandarin",
    "Tropical Fruits"
   ],
   "middle": [
    "Sicilian Orange",
    "Ginger",
    "Jasmine",
    "Coconut Water"
   ],
   "base": [
    "Patchouli",
    "White Musk",
    "Tonka"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-imperium-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-invade",
  "name": "Invade",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Pink Pepper",
    "Lavender Absolute",
    "Juniper"
   ],
   "middle": [
    "Cashmeran",
    "Cinnamon Bark",
    "Caramel"
   ],
   "base": [
    "Amber",
    "Vanilla",
    "Drywoods"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-x-setiawanade-invade-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-x-setiawanade-invade-extrait-de-parfum-50ml-1730791442657477768",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-myego",
  "name": "MyEgo",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 50,
  "price": 499000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Muscat Grapes",
    "Pink Pepper",
    "Bergamot",
    "Aldehydes"
   ],
   "middle": [
    "Amber",
    "Jasmine",
    "Geranium"
   ],
   "base": [
    "Musk",
    "Vanilla",
    "Transparent wood",
    "Iso E Super"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-x-alterego-myego-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 499000
   },
   {
    "size": 100,
    "price": 859000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-empire",
  "name": "Empire",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 50,
  "price": 499000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Lime",
    "Bergamot",
    "Mandarin",
    "Tropical fruits"
   ],
   "middle": [
    "Sicilian Orange",
    "Ginger",
    "Jasmine",
    "Coconut water"
   ],
   "base": [
    "Patchouli",
    "White Musk",
    "Tonka"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-x-rrq-empire-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 499000
   },
   {
    "size": 100,
    "price": 859000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-verve",
  "name": "Verve",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Vanilla",
    "Pear",
    "Blackcurrant"
   ],
   "middle": [
    "Jasmine",
    "Iris",
    "Orange Blossom"
   ],
   "base": [
    "Praline",
    "Vanilla",
    "Tonka",
    "Patchouli"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-verve-extrait-de-parfum-when-in-paris-edp-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-verve-extrait-de-parfum-50ml",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.3,
   "reviews": 41,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/verve-x-yves-ryan-verve-x-yves-ryan-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-stilettos",
  "name": "Stilettos",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "longevity": 7,
  "sillage": 6,
  "rating": 7.5,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Blackberry",
    "Sour Cherry",
    "Mandarin"
   ],
   "middle": [
    "Violet",
    "Jasmine"
   ],
   "base": [
    "Cashmere wood",
    "Amber",
    "Patchouli",
    "Musk",
    "Vanilla"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-stilettos-edp-50ml",
    "kind": "site"
   }
  ],
  "fd": {
   "rating": 3.9,
   "reviews": 31,
   "recommend": 90,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/stilettos-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-utopia",
  "name": "Utopia",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 9.0,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "White Tea",
    "Fruits",
    "Citruses"
   ],
   "middle": [
    "Iris",
    "Jasmine",
    "Ylang-Ylang"
   ],
   "base": [
    "Cedar",
    "White Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-utopia-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "fd": {
   "rating": 4.8,
   "reviews": 59,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/utopia-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-sorrento",
  "name": "Sorrento",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Fizzy Grapefruit",
    "Bergamot",
    "Mandarin",
    "Magnolia",
    "Ginger"
   ],
   "middle": [
    "Fizzy Grapefruit",
    "Neroli",
    "Ginger",
    "Powdery Notes",
    "Water Notes"
   ],
   "base": [
    "Fizzy Grapefruit",
    "Amber",
    "Musk",
    "Cedar",
    "Patchouli",
    "Iris"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-sorrento-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · beyoutee.id",
    "url": "https://www.tokopedia.com/beyouteeid/mykonos-sorrento-extrait-de-parfum-50ml-100ml-1734452065183499835",
    "kind": "official"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-sparkling-ros",
  "name": "Sparkling Rosé",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Rose",
    "Orange",
    "Geranium"
   ],
   "middle": [
    "Rose",
    "Sparkling Red Berries",
    "Plum",
    "Sandalwood"
   ],
   "base": [
    "Patchouli",
    "Amber",
    "Guaiac wood",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-sparkling-rose-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-silent-whisper",
  "name": "Silent Whisper",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Apple",
    "Honeydew",
    "Melon"
   ],
   "middle": [
    "Lily of The Valley",
    "Amber"
   ],
   "base": [
    "Vanilla",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-silent-whisper-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · waytoglow",
    "url": "https://www.tokopedia.com/waytoglow/mykonos-silent-whisper-extrait-de-parfum-100ml-50ml-1731977442293089485",
    "kind": "official"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-satin-blanc",
  "name": "Satin Blanc",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Black Pepper",
    "Green Apple"
   ],
   "middle": [
    "Cedar",
    "Jasmine Tea",
    "Floral Bouquet",
    "Aquatic"
   ],
   "base": [
    "White Amber",
    "Tonka",
    "Vanilla"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-satin-blanc-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-satin-blanc-extrait-de-parfum-100ml-1729857782301427848",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 51,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/satin-blanc-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-royal-ispahan",
  "name": "Royal Ispahan",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Raspberry",
    "Lychee",
    "Cotton Flower"
   ],
   "middle": [
    "Violet",
    "Rose Milk",
    "Soft Wood"
   ],
   "base": [
    "Vanilla",
    "Guaiac Wood",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-royal-ispahan-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-reflection-elixir",
  "name": "Reflection Elixir",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Grapefruit",
    "Bergamot",
    "Ginger",
    "Rhubarb Leaves"
   ],
   "middle": [
    "Ylang-Ylang",
    "Peach",
    "Magnolia"
   ],
   "base": [
    "Ambroxan",
    "Musk",
    "Chypre Accord"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-reflection-elixir-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-pink-drops",
  "name": "Pink Drops",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Strawberry Preserve",
    "Almond",
    "Caramel"
   ],
   "middle": [
    "Milk",
    "Heliotrope"
   ],
   "base": [
    "Vanilla",
    "White Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-pink-drops-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-pink-drops-extrait-de-parfum-50ml-1729735120138306696",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 3.8,
   "reviews": 33,
   "recommend": 87,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/pink-drops-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-penthouse",
  "name": "Penthouse",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Sparkling Blackcurrant",
    "Aldehydes",
    "Mandarin Zest",
    "Rose Mist"
   ],
   "middle": [
    "Velvety White Floral",
    "White Tea Vapor",
    "White Soap Accord",
    "Cashmere Wood",
    "Cedar"
   ],
   "base": [
    "Tonka Foam",
    "Iso E Super",
    "Amber",
    "Clean Musks",
    "Cashmeran"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-penthouse-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-paradise",
  "name": "Paradise",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Coconut",
    "Mandarin",
    "Pear",
    "Pineapple"
   ],
   "middle": [
    "Frangipani",
    "Jasmine",
    "Lily"
   ],
   "base": [
    "Amber",
    "Vanilla",
    "Woody"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-paradise-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-mayfair",
  "name": "Mayfair",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Orange",
    "Raspberry"
   ],
   "middle": [
    "Caramel",
    "Lavender",
    "Jasmine"
   ],
   "base": [
    "Wood",
    "Leather",
    "Patchouli",
    "Sandalwood"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-mayfair-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-mayfair-extrait-de-parfum-100ml-1734324474729890952-1737841252807115912",
    "kind": "official"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-milk-drops",
  "name": "Milk Drops",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 499000,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Floral Bouquet",
    "Milk"
   ],
   "middle": [
    "Milk",
    "Green Notes"
   ],
   "base": [
    "Tonka",
    "White Musk",
    "White Wood"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-milk-drops-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-milk-drops-extrait-de-parfum-50ml-1729588085762589832",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.0,
   "reviews": 41,
   "recommend": 85,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/milk-drops-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-monaco-royale",
  "name": "Monaco Royale",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Pear",
    "Melon",
    "Green Notes"
   ],
   "middle": [
    "Soft Wood",
    "Cedar"
   ],
   "base": [
    "Moss",
    "Caramel",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-monaco-royale-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-inception",
  "name": "Inception",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Ginger",
    "Orange",
    "Lemon"
   ],
   "middle": [
    "Neroli",
    "Cinnamon",
    "Black Tea",
    "Biga Flower"
   ],
   "base": [
    "Guaiac",
    "Musk",
    "Cedar",
    "LorenoxTM"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-inception-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-luminos",
  "name": "Luminos",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 599000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Apple",
    "Banana (Part of The Blue Java Banana Accord)"
   ],
   "middle": [
    "White Florals",
    "Rose",
    "Tuberose",
    "Lily of The Valley",
    "Orange Blossom",
    "Vanilla (Part of The Blue Java Banana Accord)"
   ],
   "base": [
    "Amber",
    "Edible Notes",
    "Solar Accord",
    "Amberwood",
    "Cashmere",
    "Ice Cream (Part of The Blue Java Banana)"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-luminos-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-enchanted",
  "name": "Enchanted",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Mandarin"
   ],
   "middle": [
    "Peony",
    "Rose",
    "Violet",
    "Peach"
   ],
   "base": [
    "Iris",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-enchanted-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-enchanted-extrait-de-parfum-50ml-1731320361215755400",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.3,
   "reviews": 118,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/enchanted-extrait-de-parfum"
  },
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-dark-secret",
  "name": "Dark Secret",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Black Cherry",
    "Saffron",
    "Bergamot"
   ],
   "middle": [
    "Cinnamon",
    "Nutmeg",
    "Marigold",
    "Jasmine",
    "Praline"
   ],
   "base": [
    "Amber",
    "Musk",
    "Tonka",
    "Sandalwood"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-dark-secret-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-dark-secret-extrait-de-parfum-100ml-1729857491223677064",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-dreamscape",
  "name": "Dreamscape",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Mango",
    "Italian Lemon",
    "Rhubarb"
   ],
   "middle": [
    "Ginger",
    "Jasmine",
    "Violet",
    "Praline",
    "Pink Pepper"
   ],
   "base": [
    "Cedar",
    "Grey Amber",
    "Tonka Beans",
    "Moss"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-dreamscape-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-conquer",
  "name": "Conquer",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Bergamot",
    "Ginger",
    "Cardamom"
   ],
   "middle": [
    "Iris",
    "Orange Blossom"
   ],
   "base": [
    "Patchouli",
    "Musk",
    "Modern Amber",
    "Vanilla"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-conquer-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-crimson",
  "name": "Crimson",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Poached Peach Creme",
    "Cherry Nectar",
    "Bergamot"
   ],
   "middle": [
    "Geranium Petals",
    "Caramel Creme Accord",
    "Jasmine Absolute"
   ],
   "base": [
    "Patchouli Madagascar",
    "Honeyed Amber",
    "White Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-crimson-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-crimson-extrait-de-parfum-100ml-1733451018103456904",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-cafe-drops",
  "name": "Cafe Drops",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Orchid",
    "Jasmine",
    "Coffee"
   ],
   "middle": [
    "Vanilla",
    "Caramel",
    "Tonka",
    "Milk"
   ],
   "base": [
    "Amber",
    "Musk",
    "Wood",
    "Patchouli"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-cafe-drops-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-cafe-drops-extrait-de-parfum-50ml-1729735209514665096",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-black-opera",
  "name": "Black Opera",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "top": [
    "Vanilla",
    "Orange Blossom",
    "Pink Pepper"
   ],
   "middle": [
    "Licorice",
    "Jasmine",
    "Almond",
    "Coffee"
   ],
   "base": [
    "Cashmere wood",
    "Jasmine",
    "Vanilla",
    "Patchouli"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-black-opera-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-black-opera-extrait-de-parfum-100ml-1729423105290700936",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-baby-love",
  "name": "Baby Love",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "longevity": 7,
  "sillage": 6,
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Violet",
    "Musk",
    "Rose"
   ],
   "middle": [
    "Violet",
    "Rose"
   ],
   "base": [
    "Violet",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-baby-love-edp-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-baby-love-edp-50ml-1731320386896299144",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 81,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/baby-love-edp-mykonos"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-aphrodite",
  "name": "Aphrodite",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.2,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "top": [
    "Jasmine",
    "Burnt Cinnamon",
    "Myrrh"
   ],
   "middle": [
    "Cedar",
    "Tonka",
    "Sandalwood"
   ],
   "base": [
    "White Musk",
    "Tobacco",
    "Vanilla",
    "Mineral Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-aphrodite-extrait-de-parfum-50ml-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-aphrodite-extrait-de-parfum-50ml-100ml-1729633771460397192",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.4,
   "reviews": 132,
   "recommend": 89,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/aphrodite-edp"
  },
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-darker-orgsm",
  "name": "Darker Shade of Orgsm",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 612519,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "all": [
    "Cypriol",
    "Caramel"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-darker-shades-of-orgasm-eau-de-parfum",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-darker-shade-of-orgsm-eau-de-parfum-100-ml-1729587387360577608",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-orgsm-melting",
  "name": "Orgsm Melting Temptation",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 607013,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "all": [
    "Caramel",
    "Apple",
    "Pear",
    "Chocolate",
    "Vanilla",
    "Amber",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/orgsm-melting-temptation",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-orgsm-melting-temptation-eau-de-parfum-100-ml-1732948742600623176",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-the-prestige",
  "name": "The Prestige",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "EDP",
  "size": 100,
  "price": 633215,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "all": [
    "Grapefruit",
    "Tobacco Leaf",
    "Tolu Balsam",
    "Vetiver"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-the-prestige",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-the-prestige-eau-de-parfum-100-ml-1729558067640304712",
    "kind": "official"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-farhampton",
  "name": "Farhampton",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 100,
  "price": 563343,
  "longevity": 8,
  "sillage": 7,
  "rating": 7.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Bergamot",
    "Lavender",
    "Orange Blossom",
    "Labdanum",
    "Tonka"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/farhampton-100ml-extrait-de-parfum",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-farhampton-parfum-100-ml-1729384575682118728",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.1,
   "reviews": 69,
   "recommend": 89,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/farhampton"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-eos",
  "name": "Essence of the Sun (EOS)",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 563343,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Solar Accord",
    "Tropical Flowers",
    "Vanilla",
    "Tonka"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/essence-of-the-sun-eos-100ml-edp",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-essence-of-the-sun-eau-de-parfum-100-ml-1731175403893326920",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 268,
   "recommend": 92,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/hmns-pefume-essence-of-sun-eos"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-unpatched",
  "name": "Unpatched",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 633215,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Jasmine",
    "Vanilla",
    "Chocolate",
    "Caramel",
    "Akigalawood",
    "Tonka",
    "Amber",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-unpatched",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-unpatched-eau-de-parfum-100-ml-1731175380388185160",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.8,
   "reviews": 12,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/unpatched"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-addict",
  "name": "Addict",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 568422,
  "longevity": 7,
  "sillage": 7,
  "rating": 7.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Berries",
    "Rose",
    "Coffee",
    "Patchouli",
    "Amber"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/addict-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-addict-eau-de-parfum-100-ml-1730916483777987656",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 3.9,
   "reviews": 17,
   "recommend": 82,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/addiction-powder-blush-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-philea",
  "name": "Philea",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 607013,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Magnolia",
    "Mimosa",
    "Cashmeran"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-philea-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-philea-eau-de-parfum-100-ml-1732295136609272904",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.2,
   "reviews": 23,
   "recommend": 95,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/philea"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-sore-eterna",
  "name": "Sore Eterna",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 607013,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Bergamot",
    "Ylang-Ylang",
    "Rose",
    "Cedar",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/hmns-perfume-sore-eterna-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-sore-eterna-eau-de-parfum-100-ml-1731942143733761096",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.4,
   "reviews": 17,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/sore-eterna-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-untitled-01",
  "name": "Untitled Humans Aroma 01",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 100,
  "price": 633215,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Fig",
    "Sandalwood"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/untitled-humans",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-untitled-humans-aroma-01-eau-de-parfum-100-ml-1729857550254770248",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.5,
   "reviews": 12,
   "recommend": 91,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/untitled-humans"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "hmns-untitled-02",
  "name": "Untitled Humans Aroma 02",
  "brand": "HMNS",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Floral",
  "conc": "EDP",
  "size": 100,
  "price": 607013,
  "longevity": 7,
  "sillage": 7,
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Rose",
    "Musk"
   ]
  },
  "notesSrc": "resmi",
  "buy": [
   {
    "store": "Toko resmi HMNS",
    "url": "https://hmnsperfume.com/products/untitled-humans-aroma-02",
    "kind": "site"
   },
   {
    "store": "Tokopedia · HMNS Perfume",
    "url": "https://www.tokopedia.com/hmnsperfume/hmns-untitled-humans-aroma-02-eau-de-parfum-100-ml-1730966756287611976",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 5.0,
   "reviews": 6,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/hmns-perfume/untitled-humans-aroma-02"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-musc-laiteux",
  "name": "Musc Laiteux",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 50,
  "price": 529000,
  "longevity": 7,
  "sillage": 5,
  "rating": 8.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Floral Notes",
    "Musk",
    "Rice Milk"
   ]
  },
  "notesSrc": "resmi",
  "imgFit": "cover",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/alchemist-fragrance-musc-laiteux-les-classiques",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-musc-laiteux-les-classiques-1734583944375666164",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 5.0,
   "reviews": 8,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/musc-laiteux-edp"
  },
  "variants": [
   {
    "size": 30,
    "price": 389000
   },
   {
    "size": 50,
    "price": 529000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-cachemire",
  "name": "Cachemire",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Musky",
  "conc": "EDP",
  "size": 50,
  "price": 529000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Apple",
    "Rose",
    "Ambrette",
    "Musk",
    "Cedar"
   ]
  },
  "notesSrc": "resmi",
  "imgFit": "cover",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/alchemist-fragrance-cachmire-les-classiques",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-cachemire-les-classiques-1734583987501958644",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.8,
   "reviews": 6,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/cachemire-edp"
  },
  "variants": [
   {
    "size": 30,
    "price": 389000
   },
   {
    "size": 50,
    "price": 529000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-bois-et-musc",
  "name": "Bois et Musc",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Woody",
  "conc": "EDP",
  "size": 50,
  "price": 529000,
  "longevity": 7,
  "sillage": 6,
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notes": {
   "all": [
    "Woody Notes",
    "Moss",
    "Musk",
    "Lily of the Valley"
   ]
  },
  "notesSrc": "resmi",
  "imgFit": "cover",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/bois-et-musc-copy-1",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Alchemist Fragrance",
    "url": "https://www.tokopedia.com/alchemistfragrance/alchemist-fragrance-bois-et-musc-les-classiques-1734583576357340660",
    "kind": "official"
   }
  ],
  "fd": {
   "rating": 4.8,
   "reviews": 6,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/alchemist-fragrance/bois-et-music-edp"
  },
  "variants": [
   {
    "size": 30,
    "price": 389000
   },
   {
    "size": 50,
    "price": 529000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-out-west-am",
  "name": "Out West A.M.",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Fresh",
  "conc": "X",
  "size": 50,
  "price": 579000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "all": [
    "Pink Pepper",
    "Ginger",
    "Lemon",
    "Patchouli",
    "Cedar",
    "Leather"
   ]
  },
  "notesSrc": "resmi",
  "imgFit": "cover",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/out-west-a-m-extrait-de-parfum",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "alchemist-out-west-pm",
  "name": "Out West P.M.",
  "brand": "Alchemist",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Oriental",
  "conc": "X",
  "size": 50,
  "price": 679000,
  "longevity": 8,
  "sillage": 7,
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notes": {
   "all": [
    "Saffron",
    "Gunsmoke",
    "Labdanum",
    "Vetiver",
    "Vanilla"
   ]
  },
  "notesSrc": "resmi",
  "imgFit": "cover",
  "buy": [
   {
    "store": "Toko resmi Alchemist",
    "url": "https://alchemistfragrance.com/products/out-west-p-m-elixir",
    "kind": "site"
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-nautilus",
  "name": "Nautilus",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "notes": {
   "top": [
    "Pear",
    "Bergamot",
    "Ginger",
    "Mandarin"
   ],
   "middle": [
    "Pear",
    "Orange Blossom",
    "Jasmine"
   ],
   "base": [
    "Amber",
    "Musk",
    "Vanilla",
    "Guaiac Wood",
    "Ambroxan"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-nautilus-extrait-de-parfum-100ml",
    "kind": "site"
   }
  ],
  "family": "Fresh",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-xoxo-rosy",
  "name": "Xoxo Rosy",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Rose",
    "Pink Pepper",
    "Green Notes"
   ],
   "middle": [
    "Rose",
    "Rose Petals",
    "Orange Jam",
    "Red Berries"
   ],
   "base": [
    "Amber",
    "Musk",
    "Rose"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-xoxo-rosy-edp-50ml",
    "kind": "site"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-vanilla-clouds",
  "name": "Vanilla Clouds",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Vanilla",
    "Heliotrope",
    "White Floral Accord"
   ],
   "middle": [
    "Vanilla",
    "Marshmallow",
    "Iris"
   ],
   "base": [
    "Caramel",
    "White Musk",
    "Vanilla"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-vanilla-clouds-extrait-de-parfum-50ml-1",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-vanilla-clouds-extrait-de-parfum-50ml-1731320318229775496",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-senja",
  "name": "Senja",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Coffee",
    "Almond"
   ],
   "middle": [
    "Patchouli",
    "Chocolate",
    "Milk"
   ],
   "base": [
    "Sandalwood",
    "Chocolate",
    "Vetiver",
    "Cistus"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-senja-edp-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-senja-extrait-de-parfum-50ml-100ml-1729669054393780360",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-pink-beach",
  "name": "Pink Beach",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Kiwi",
    "Rhubarb",
    "Pink Pepper"
   ],
   "middle": [
    "Jasmine",
    "Watermelon",
    "Cyclamen"
   ],
   "base": [
    "Powdery Notes",
    "Sandalwood",
    "Tonka",
    "Cedar",
    "Musk",
    "Juniper Berries"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-pink-beach-edp-50ml",
    "kind": "site"
   }
  ],
  "family": "Woody",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.6,
   "reviews": 36,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/pink-beach-mykonos-x-yves-ryan-pink-beach-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-on-the-rocks",
  "name": "On The Rocks",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "notes": {
   "top": [
    "Bergamot",
    "Apple",
    "Myrrh"
   ],
   "middle": [
    "Orange Flower",
    "Guiacwood",
    "Praline"
   ],
   "base": [
    "Vanilla",
    "Ambroxan",
    "Praline"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-on-the-rocks-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-on-the-rocks-extrait-de-parfum-100ml-1730852260807804040",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-musk-aura",
  "name": "Musk Aura",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "notes": {
   "top": [
    "Bergamot",
    "Yuzu",
    "Apple"
   ],
   "middle": [
    "Lily of the Valley",
    "Sambac Jasmine",
    "Ylang-Ylang"
   ],
   "base": [
    "Amber",
    "Musk",
    "Citruses",
    "Nectarine"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-musk-aura-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-musk-aura-extrait-de-parfum-100ml-1729676335070873736",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-moroccan-vanilla",
  "name": "Moroccan Vanilla",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 100,
  "price": 799000,
  "notes": {
   "top": [
    "Moroccan Vanilla",
    "Rose",
    "Lemon"
   ],
   "middle": [
    "Rose",
    "Vanilla",
    "Lemon",
    "Sugar"
   ],
   "base": [
    "White Musk",
    "Sugar",
    "Vanilla"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-moroccan-vanilla-extrait-de-parfum-100ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-moroccan-vanilla-extrait-de-perfum-100ml-1729416658963302536",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.4,
   "reviews": 45,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/mykonos-moroccan-vanilla-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-matcha-latte",
  "name": "Matcha Latte",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "all": [
    "Matcha",
    "White Chocolate",
    "Floral Notes"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-matcha-latte-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "family": "Floral",
  "rating": 7.2,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 3.8,
   "reviews": 80,
   "recommend": 83,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/matcha-latte-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-hawaiian-crush",
  "name": "Hawaiian Crush",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Lychee",
    "Red Fruits",
    "Black Tea"
   ],
   "middle": [
    "Rose",
    "Lily Of The Valley",
    "Lychee",
    "Black tea"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Musk",
    "Incense"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-hawaiian-crush-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-hawaiian-crush-extrait-de-parfum-50ml-1729652655252669576",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-coconut-dreams",
  "name": "Coconut Dreams",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Coconut",
    "Aloe Vera",
    "Lily of the Valley"
   ],
   "middle": [
    "Coconut cream",
    "Vanilla",
    "Sweet Rice"
   ],
   "base": [
    "Vanilla",
    "Cashmere Wood"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-coconut-dreams-extrait-de-parfum-50ml",
    "kind": "site"
   }
  ],
  "family": "Gourmand",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-caramel-fudge-cookie",
  "name": "Caramel Fudge Cookie",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "EDP",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Cookie Dough",
    "Caramel",
    "Vanilla"
   ],
   "middle": [
    "Caramel",
    "Condensed Milk",
    "Sea Salt"
   ],
   "base": [
    "White Musk",
    "Vanilla",
    "Caramel",
    "Praline"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-caramel-fudge-cookie-edp-50ml",
    "kind": "site"
   }
  ],
  "family": "Gourmand",
  "rating": 7.5,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 3.9,
   "reviews": 30,
   "recommend": 80,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/mykonos-eau-de-perfume-caramel-fudge-cookie-3"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-california-club",
  "name": "California Club",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Bergamot",
    "Lemon",
    "Violet Leaf"
   ],
   "middle": [
    "Rose",
    "Violet",
    "Iris"
   ],
   "base": [
    "Amberwood",
    "Ambrette",
    "Sandalwood"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-california-club-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-california-club-extrait-de-parfum-50ml-1730883094553134216",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-california-blue",
  "name": "California Blue",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Lavender",
    "Pear",
    "Grapefruit",
    "Pink Salt"
   ],
   "middle": [
    "Rhubarb",
    "Water Blossoms",
    "Marine Notes"
   ],
   "base": [
    "Moss",
    "Softwood",
    "Caramel"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-california-blue-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-california-blue-extrait-de-parfum-50ml-100ml-1732972681387672712",
    "kind": "official"
   }
  ],
  "family": "Fresh",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "variants": [
   {
    "size": 50,
    "price": 449000
   },
   {
    "size": 100,
    "price": 799000
   }
  ],
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "mykonos-bonfire-vanilla",
  "name": "Bonfire Vanilla",
  "brand": "Mykonos",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 50,
  "price": 449000,
  "notes": {
   "top": [
    "Cloves",
    "Nutmeg",
    "Pink Pepper",
    "Orange Zest",
    "Vanilla"
   ],
   "middle": [
    "Smoked Wood",
    "Pepper",
    "Guaiac Wood",
    "Burnt Brown Sugar"
   ],
   "base": [
    "Smoked Wood",
    "Vanilla",
    "Marshmallow",
    "Caramel"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Mykonos",
    "url": "https://officialmykonos.com/products/mykonos-bonfire-vanilla-extrait-de-parfum-50ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Mykonos",
    "url": "https://www.tokopedia.com/mykonos/mykonos-bonfire-vanilla-extrait-de-parfum-50ml-1731320390670910600",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 7.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.1,
   "reviews": 33,
   "recommend": 93,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/mykonos/bonfire-vanilla-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-mystical-mirage",
  "name": "Mystical Mirage",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "all": [
    "Oud",
    "Turkish Rose",
    "Violet",
    "Vanilla"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/istanbul",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-garden-of-eden",
  "name": "Garden of Eden",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Saffron",
    "Jasmine"
   ],
   "middle": [
    "Amber",
    "Wood"
   ],
   "base": [
    "Cedar"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/lavish-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-garden-of-eden-ex-lavish-edp-30ml",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Oriental",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-into-the-woods",
  "name": "Into the Woods",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Violet",
    "Lotus",
    "Verbena"
   ],
   "middle": [
    "Lily of The Valley",
    "Tea Rose"
   ],
   "base": [
    "Sandalwood",
    "Amber",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/natura",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-into-the-woods-edp-30ml",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-morning-glory",
  "name": "Morning Glory",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Citruses",
    "White Floral",
    "Fruity"
   ],
   "middle": [
    "Floral",
    "Jasmine",
    "Lily of The Valley"
   ],
   "base": [
    "Moss",
    "Musky",
    "Oriental"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/gorgeous-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-morning-glory-edp-30ml-1729601137318988407",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.8,
   "reviews": 34,
   "recommend": 97,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfume-rollerball-17"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-take-my-hand",
  "name": "Take My Hand",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Bergamot",
    "Fruity",
    "Floral"
   ],
   "middle": [
    "Floral",
    "Patchouli"
   ],
   "base": [
    "Ambery",
    "Animalic"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/cherish-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-take-my-hand-edp-30ml-1729601139833604727",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.3,
   "reviews": 33,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfum-27"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-enchantee",
  "name": "Enchantée",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Citruses",
    "Ginger",
    "Peach"
   ],
   "middle": [
    "White Flowers",
    "Jasmine",
    "Tuberose",
    "Heliotrope"
   ],
   "base": [
    "Ambrette",
    "Musk",
    "Gourmand"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/carl-claire-emily-in-paris-enchantee-edp-30ml",
    "kind": "site"
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-a-love-like-this",
  "name": "A Love Like This",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Lily",
    "Aromatic",
    "Eucalyptus",
    "Ginger"
   ],
   "middle": [
    "Lily",
    "Ambery",
    "Jasmine"
   ],
   "base": [
    "Cedar",
    "Musky",
    "Patchouli"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/blossom-30-ml",
    "kind": "site"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.2,
   "reviews": 28,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfum-5"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-dancing-with-my-shadow",
  "name": "Dancing with my Shadow",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Floral",
    "Fresh",
    "Herbaceous"
   ],
   "middle": [
    "Floral",
    "Oriental",
    "Rose"
   ],
   "base": [
    "Ambery",
    "Balsamic",
    "Musky"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/musk-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-dancing-with-my-shadow-edp-30ml-1729566788952033911",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.4,
   "reviews": 15,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfume-rollerball-33"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-delicate-embrace",
  "name": "Delicate Embrace",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Citruses",
    "Freesia",
    "Fruity",
    "Pear"
   ],
   "middle": [
    "Lily of The Valley",
    "Rose"
   ],
   "base": [
    "Ambery",
    "Musky"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/delicate-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/best-seller-carl-claire-delicate-embrace-edp-30ml-1729566789531044471",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 7.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.1,
   "reviews": 59,
   "recommend": 91,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfum-57"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-spring-sonata",
  "name": "Spring Sonata",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Citruses",
    "Rose",
    "Peony",
    "Jasmine",
    "Fruity"
   ],
   "middle": [
    "Floral",
    "Fruity",
    "Lactonic"
   ],
   "base": [
    "Ambery",
    "Floral",
    "Musky"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/lady-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-spring-sonata-edp-30ml-1729566792341293687",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.3,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.4,
   "reviews": 38,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfume-rollerball-19-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-song-of-the-youth",
  "name": "Song of the Youth",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Citruses",
    "Floral",
    "Fruity"
   ],
   "middle": [
    "Magnolia",
    "Musky",
    "Iris",
    "Vanilla"
   ],
   "base": [
    "Ambery",
    "Animalic",
    "Moss"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/song-of-the-youth-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/best-seller-carl-claire-song-of-the-youth-edp-30ml-1729560389380115063",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.8,
   "reviews": 29,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfum-17"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-talking-to-the-moon",
  "name": "Talking to the Moon",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "Fruity",
    "Orange Blossom"
   ],
   "middle": [
    "Jasmine",
    "Tuberose",
    "Woody"
   ],
   "base": [
    "Ambery",
    "Musky",
    "Sweet"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/talking-to-the-moon-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/carl-claire-talking-to-the-moon-edp-30ml-1729560392558414455",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 7.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.1,
   "reviews": 25,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/eau-de-parfum-10"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "cc-black-dahlia",
  "name": "Black Dahlia",
  "brand": "Carl & Claire",
  "origin": "Lokal",
  "gender": "Wanita",
  "conc": "EDP",
  "size": 30,
  "price": 279000,
  "notes": {
   "top": [
    "White Floral",
    "Gourmand",
    "Coffee"
   ],
   "middle": [
    "Vanilla",
    "Floral",
    "Woody"
   ],
   "base": [
    "Ambery",
    "Musky",
    "Sweet"
   ]
  },
  "buy": [
   {
    "store": "Toko resmi Carl & Claire",
    "url": "https://carlandclaire.com/products/black-dahlia-30-ml",
    "kind": "site"
   },
   {
    "store": "Tokopedia · Carl & Claire",
    "url": "https://www.tokopedia.com/carlclaire/no-1-best-selling-carl-claire-black-dahlia-edp-30ml-1729560386872248951",
    "kind": "marketplace"
   }
  ],
  "variants": [
   {
    "size": 10,
    "price": 99000
   },
   {
    "size": 30,
    "price": 279000
   }
  ],
  "imgFit": "cover",
  "family": "Gourmand",
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.3,
   "reviews": 76,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/carl-claire/black-orchid-53"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-mechline",
  "name": "Mechline",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 409000,
  "notes": {
   "top": [
    "Monarda",
    "Pompelmo",
    "Violet Leaf"
   ],
   "middle": [
    "Lotus",
    "Rose de Mai",
    "Lily of the Valley"
   ],
   "base": [
    "Duchess Violet",
    "Cedar",
    "Musk Voile"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-mechline-1737674537840575843-1737674540968346979",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-alencine",
  "name": "Alencine",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 409000,
  "notes": {
   "top": [
    "Cypress",
    "Pine Needle",
    "Baie Rose"
   ],
   "middle": [
    "Jasmine",
    "Pompon Rose",
    "Magnolia"
   ],
   "base": [
    "Mousseline",
    "Georgywood",
    "Mystikal"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-eulalie-1737672729362400611-1737674392146773347",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-postojna",
  "name": "Postojna",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 35,
  "price": 349000,
  "notes": {
   "top": [
    "Blue Apple",
    "Lillikoi",
    "Violet Leaf"
   ],
   "middle": [
    "Muguet",
    "Pink Pepper",
    "Maillette"
   ],
   "base": [
    "Rockrose",
    "Hollow Musk",
    "Sandalwood"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-postojna-1735675183579366755-1735880049237329251",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-eulalie",
  "name": "Eulalie",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 35,
  "price": 349000,
  "notes": {
   "top": [
    "Lychee",
    "Crème de Framboise",
    "Petalia"
   ],
   "middle": [
    "Sampaguita",
    "Roseraie de L'Hay",
    "Akigalawood"
   ],
   "base": [
    "Amberwoods",
    "Sheer Musk",
    "Cashmeran"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-eulalie-1734292001394165091",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 8.5,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 5.0,
   "reviews": 1,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/eulalie-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-kieraha",
  "name": "Kie Raha",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 35,
  "price": 299000,
  "notes": {
   "top": [
    "Cajuput",
    "Yuzu",
    "Bigarade"
   ],
   "middle": [
    "Aquamare",
    "Orchid",
    "Crystal Amber"
   ],
   "base": [
    "Sulawesi Patchouli",
    "Red Cedar",
    "Sandalwood"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-kie-raha-1732963360808666467",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-raenira",
  "name": "Rae Nira",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 299000,
  "notes": {
   "top": [
    "Cajuput",
    "Bigarade",
    "Lavender"
   ],
   "middle": [
    "Jasmine",
    "Calypsone",
    "Immortelle"
   ],
   "base": [
    "Tolu Balsam",
    "Golden Amber",
    "Cashmere"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-rae-nira-1732964974169064803",
    "kind": "official"
   }
  ],
  "family": "Oriental",
  "rating": 8.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 5.0,
   "reviews": 4,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/rae-nira-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-sofr",
  "name": "S.O.F.R",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 349000,
  "notes": {
   "top": [
    "Tangerine Heart",
    "Bergamot",
    "Charentais"
   ],
   "middle": [
    "Sampaguita",
    "Mimosa",
    "Tuberose"
   ],
   "base": [
    "Amber",
    "Edenolide",
    "Pompona"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-s-o-f-r-1733461270388508003",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-kirithra",
  "name": "Kirithra",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 349000,
  "notes": {
   "top": [
    "Sidr Honey",
    "Clementine",
    "Birch tar"
   ],
   "middle": [
    "Roseraie de l'Hay",
    "Sampaguita",
    "Akigalawood"
   ],
   "base": [
    "Georgywood",
    "Cashmeran",
    "Sulawesi Patchouli"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-kirithra-1731416064915572067",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.7,
   "reviews": 9,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/kirithra-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-chno",
  "name": "Chno",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 35,
  "price": 249000,
  "notes": {
   "top": [
    "Pink Pepper",
    "Orange blossom",
    "Pear"
   ],
   "middle": [
    "Coffee",
    "Jasmin",
    "Bitter almond",
    "Licorice"
   ],
   "base": [
    "Vanilla",
    "Patchouli",
    "Cedar",
    "Cashmere wood"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-chno-1729386846131029347",
    "kind": "official"
   }
  ],
  "family": "Gourmand",
  "rating": 8.1,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.3,
   "reviews": 100,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-coco",
  "name": "Coco",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 249000,
  "notes": {
   "top": [
    "Citruses",
    "Floral",
    "Green"
   ],
   "middle": [
    "Marine",
    "Woody"
   ],
   "base": [
    "Musky",
    "Oriental"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-coco-1729386845764355427",
    "kind": "official"
   }
  ],
  "family": "Fresh",
  "rating": 8.2,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.4,
   "reviews": 76,
   "recommend": 94,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/cocosweet-unique-charming-solid-perfume-2"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-maleali",
  "name": "Maleali",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 299000,
  "notes": {
   "top": [
    "Bush Juniper",
    "Tellicherry Pepper"
   ],
   "middle": [
    "Palo Santo",
    "Red Sandalwood"
   ],
   "base": [
    "Nagarmotha",
    "Sulawesi Patchouli"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-maleali-1729879059004950883",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 7.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.1,
   "reviews": 27,
   "recommend": 88,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/maleali-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-minouet",
  "name": "Minouet",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 299000,
  "notes": {
   "top": [
    "Starkrimson",
    "Galbanum"
   ],
   "middle": [
    "Roseraie de l'Hay",
    "Bigarade Orange",
    "Iris Pallida"
   ],
   "base": [
    "Cashmere Wood",
    "Fior di Latte",
    "Ambergris"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-minouet-1729857029609064803",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.5,
   "reviews": 51,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/minouet-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-morfosia",
  "name": "Morfosia",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 349000,
  "notes": {
   "top": [
    "Rhubarb",
    "Yuzu",
    "Elletaria"
   ],
   "middle": [
    "Shogayu",
    "Narcissus",
    "Cape Jasmine"
   ],
   "base": [
    "Amber",
    "Red Cedar",
    "Haiti Vetiver"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-morfosia",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.9,
   "reviews": 15,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/morfosia-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-iraileima",
  "name": "Irai Leima",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 359000,
  "notes": {
   "top": [
    "Cassis bud",
    "Dalanghita",
    "Pink peppercorn"
   ],
   "middle": [
    "Duchesse de Nemours",
    "Water Iris",
    "Raat Ki Rani"
   ],
   "base": [
    "Ambrette",
    "Ancient waters"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-irai-leima-1733437577265972579",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.7,
   "reviews": 45,
   "recommend": 88,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/irai-leima-edp"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-iliad",
  "name": "Iliad",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 299000,
  "notes": {
   "top": [
    "Pink Peppercorn",
    "Peony",
    "Muguet"
   ],
   "middle": [
    "Ylang-Ylang",
    "Iris",
    "Hedione"
   ],
   "base": [
    "Amber",
    "Cashmeran",
    "Patchouli"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-iliad-1729618000268527971",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.6,
   "reviews": 33,
   "recommend": 90,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-iliad-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-laspozas",
  "name": "Las Pozas",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 249000,
  "notes": {
   "top": [
    "Datura"
   ],
   "middle": [
    "Sumatran benzoin",
    "Nutmeg"
   ],
   "base": [
    "Cashmeran",
    "Cedar",
    "Sandalwood"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-las-pozas-1729601899434838371",
    "kind": "official"
   }
  ],
  "family": "Woody",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.6,
   "reviews": 91,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extrait-de-parfum-las-pozas-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-ostara",
  "name": "Ostara",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 35,
  "price": 299000,
  "notes": {
   "top": [
    "Raspberry",
    "Passionfruit",
    "Pear"
   ],
   "middle": [
    "Cassis Buds",
    "Lily of the Valley"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Heliotrope"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-ostara-1729546178483292515",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 7.7,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.1,
   "reviews": 104,
   "recommend": 92,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/ostara-3"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-omnia",
  "name": "Omnia",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 249000,
  "notes": {
   "top": [
    "Grapefruit",
    "Green Notes"
   ],
   "middle": [
    "Rose",
    "Floral",
    "Iris"
   ],
   "base": [
    "Woody",
    "Heliotrope",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-omnia-1729386845796992355",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.5,
   "reviews": 141,
   "recommend": 98,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/extract-de-parfum-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "saff-troupe",
  "name": "Troupe",
  "brand": "SAFF & Co.",
  "origin": "Lokal",
  "gender": "Unisex",
  "conc": "X",
  "size": 30,
  "price": 199000,
  "notes": {
   "top": [
    "Citruses",
    "Fresh",
    "Pear"
   ],
   "middle": [
    "Rose",
    "Orange Blossom",
    "Freesia"
   ],
   "base": [
    "Patchouli",
    "Musky",
    "Amber"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · SAFF & Co.",
    "url": "https://www.tokopedia.com/saffnco/saff-co-extrait-de-parfum-troupe-1729386782924506467",
    "kind": "official"
   }
  ],
  "family": "Floral",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 4.6,
   "reviews": 95,
   "recommend": 95,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/saff-co/troupe-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-mineralwave",
  "name": "Mineralwave",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "X",
  "size": 50,
  "price": 448750,
  "notes": {
   "top": [
    "Bergamot",
    "Ozonic",
    "Green Leaves",
    "Cardamom"
   ],
   "middle": [
    "Green Tea",
    "Akigalawood",
    "Ambergris",
    "Cedar"
   ],
   "base": [
    "Dry Amver",
    "Sandalwood",
    "Musc"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/new-mineralwave-extrait-de-parfum-50-ml-citrus-woody-cardamom-green-team-ambergis-cedarwood-sandalwood-musk-white-bergamot-akigalawood-1734200039672677624-1735721754914817272",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Fresh",
  "rating": 8.6,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "fd": {
   "rating": 5.0,
   "reviews": 2,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/kahf/mineralwave-extrait-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-humbling-forest",
  "name": "Humbling Forest",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDP",
  "size": 100,
  "price": 390000,
  "notes": {
   "top": [
    "Cypress",
    "Rosemary",
    "Grapefruit"
   ],
   "middle": [
    "Cedar",
    "Guaiac Wood",
    "Jasmine"
   ],
   "base": [
    "Patchouli",
    "Sandalwood",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/new-kahf-humbling-forest-eau-de-parfum-100-ml-crisp-cypress-rosemary-grapefruit-cedarwood-guaiac-jasmine-patchouli-sandalwood-and-musk-1732833805531251960",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Woody",
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.2,
   "reviews": 41,
   "recommend": 95,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/kahf/kahf-eau-de-toilette-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-invigorating-waterfall",
  "name": "Invigorating Waterfall",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDP",
  "size": 100,
  "price": 390000,
  "notes": {
   "top": [
    "Sea Notes",
    "Lemon"
   ],
   "middle": [
    "Cedar",
    "Violet",
    "Floral Notes"
   ],
   "base": [
    "Amber",
    "Patchouli",
    "Vetiver",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/new-kahf-invigorating-waterfall-eau-de-parfum-100-ml-crisp-cypress-rosemary-grapefruit-cedarwood-guaiac-jasmine-patchouli-sandalwood-and-musk-1732833786042680568",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Floral",
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.5,
   "reviews": 36,
   "recommend": 91,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/kahf/invigorating-waterfall-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-spicestone",
  "name": "Spicestone",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "X",
  "size": 50,
  "price": 448750,
  "notes": {
   "all": [
    "Cinnamon",
    "Vanilla",
    "Tonka Bean",
    "Lavender",
    "Patchouli"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/new-kahf-spicestone-extrait-de-parfum-50-ml-gourmand-spicy-aromatic-cinnamon-vanilla-tonka-bean-lavender-sedikit-patchouli-di-dry-down-unique-symrose-scent-1732651781164401912-1735721490020861176",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Gourmand",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-ambremusc",
  "name": "Ambremusc",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "X",
  "size": 50,
  "price": 448750,
  "notes": {
   "all": [
    "Black Tea",
    "Bergamot",
    "Amberwood",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/new-kahf-ambermusc-extrait-de-parfum-50-ml-x-bryan-domani-tea-floral-clean-musky-skin-like-scent-black-tea-bergamot-amberwood-lorenox-di-dry-downnya-1732651797188216056-1735721719768712440",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Fresh",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 8,
  "sillage": 7,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-saffron-oud",
  "name": "Saffron Oud",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDP",
  "size": 100,
  "price": 391500,
  "notes": {
   "top": [
    "Mandarin",
    "Saffron",
    "Clove"
   ],
   "middle": [
    "Rose",
    "Leather",
    "Oud"
   ],
   "base": [
    "Cedar",
    "Patchouli",
    "Sandalwood",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-parfum-saffron-oud-100-ml-parfum-pria-wangi-tahan-lama-1729570274214578424",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Woody",
  "rating": 9.0,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 7,
  "sillage": 6,
  "fd": {
   "rating": 4.9,
   "reviews": 17,
   "recommend": 100,
   "url": "https://reviews.femaledaily.com/products/fragrance/edp/kahf/saffron-oud-eau-de-parfum"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-revered-oud-edt",
  "name": "Revered Oud EDT",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDT",
  "size": 35,
  "price": 111915,
  "notes": {
   "top": [
    "Roses",
    "Lemon",
    "Fruity"
   ],
   "middle": [
    "Amber",
    "Gourmand"
   ],
   "base": [
    "Vanilla",
    "Oud",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-toilette-revered-oud-35-ml-parfum-pria-wangi-tahan-lama-1729386647019619576",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Gourmand",
  "rating": 8.8,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 6,
  "sillage": 5,
  "fd": {
   "rating": 4.7,
   "reviews": 84,
   "recommend": 96,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/kahf/kahf-revered-oud-eau-de-toilette"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-true-brotherhood-edt",
  "name": "True Brotherhood EDT",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDT",
  "size": 35,
  "price": 111915,
  "notes": {
   "all": [
    "Cinnamon",
    "Tonka Bean",
    "Lavender",
    "Citrus",
    "Incense"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-toilette-true-brotherhood-35-ml-parfum-pria-wangi-tahan-lama-aroma-maskulin-elegan-segar-hangat-minyak-wangi-pria-sentuhan-cinnamon-tonka-beans-lavender-citrus-men-fragrance-edt-bulumata-1729386648661689592",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Oriental",
  "rating": 8.0,
  "ratingSrc": "estimasi",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 6,
  "sillage": 5,
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-humbling-forest-edt",
  "name": "Humbling Forest EDT",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDT",
  "size": 35,
  "price": 111915,
  "notes": {
   "top": [
    "Cypress",
    "Rosemary",
    "Grapefruit"
   ],
   "middle": [
    "Cedar",
    "Guaiac Wood",
    "Jasmine"
   ],
   "base": [
    "Sandalwood",
    "Patchouli",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-toilette-humbling-forest-35-ml-parfum-pria-wangi-tahan-lama-1729416922236881144",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Woody",
  "rating": 7.9,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 6,
  "sillage": 5,
  "fd": {
   "rating": 4.2,
   "reviews": 41,
   "recommend": 95,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/kahf/kahf-eau-de-toilette-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 },
 {
  "id": "kahf-invigorating-waterfall-edt",
  "name": "Invigorating Waterfall EDT",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Pria",
  "conc": "EDT",
  "size": 35,
  "price": 111915,
  "notes": {
   "top": [
    "Marine",
    "Water",
    "Lemon"
   ],
   "middle": [
    "Cedar",
    "Floral",
    "Violet"
   ],
   "base": [
    "Dry Amber",
    "Patchouli",
    "Veliver",
    "Musk"
   ]
  },
  "buy": [
   {
    "store": "Tokopedia · Kahf Official",
    "url": "https://www.tokopedia.com/kahfofficial/kahf-eau-de-toilette-invigorating-waterfall-35-ml-parfum-pria-wangi-tahan-lama-1729386649265538296",
    "kind": "official"
   }
  ],
  "imgFit": "cover",
  "family": "Fresh",
  "rating": 8.4,
  "ratingSrc": "femaledaily",
  "fragrantica": null,
  "notesSrc": "resmi",
  "longevity": 6,
  "sillage": 5,
  "fd": {
   "rating": 4.5,
   "reviews": 36,
   "recommend": 91,
   "url": "https://reviews.femaledaily.com/products/fragrance/edt/kahf/invigorating-waterfall-1"
  },
  "priceSrc": "toko",
  "checked": "Okt 2026"
 }
];
