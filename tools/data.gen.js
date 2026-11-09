// File ini DIBUAT OTOMATIS oleh build.py dari master.tsv — edit master.tsv lalu jalankan ulang.
// notes, gender & rating: Fragrantica (rating bintang 1–5 × 2), diambil Okt 2026.
// family: ditebak otomatis dari notes. longevity & sillage: estimasi (berdasarkan konsentrasi).
// harga lokal: toko resmi / retailer Okt 2026. harga impor: perkiraan retail Indonesia.
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  "price": 235900,
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
  }
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
  "price": 204900,
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
  }
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
  "price": 211900,
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
  }
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
  "price": 240900,
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
  }
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
  "price": 185900,
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
 },
 {
  "id": "kahf-revered-oud",
  "name": "Revered Oud",
  "brand": "Kahf",
  "origin": "Lokal",
  "gender": "Unisex",
  "family": "Gourmand",
  "conc": "EDP",
  "size": 100,
  "price": 245500,
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
  }
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
  }
 }
];
