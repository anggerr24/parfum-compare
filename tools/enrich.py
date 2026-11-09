"""Tambah ke data.js: rating Female Daily, varian ukuran (feed toko resmi), sumber & tanggal harga.

python -I enrich.py <scratch_dir> <data_js>
"""
import json, os, re, statistics, sys, unicodedata

SCR, DATA = sys.argv[1:3]
sys.stdout.reconfigure(encoding="utf-8")
CHECKED = "Okt 2026"

text = open(DATA, encoding="utf-8").read()
header, body = text.split("const PERFUMES = ", 1)
data = json.loads(body.rstrip().rstrip(";"))
fd = json.load(open(os.path.join(SCR, "fd.json"), encoding="utf-8"))

# --- 1) Female Daily ---
FD_BRAND = {  # merek kita -> slug merek di Female Daily (selain yang otomatis)
    "HMNS": "hmns-perfume", "SAFF & Co.": "saff-co", "Alchemist": "alchemist-fragrance", "Yves Saint Laurent": "yves-saint-laurent",
    "Jo Malone London": "jo-malone-london", "Rabanne": "paco-rabanne", "Lancôme": "lancome", "Dolce & Gabbana": "dolce-gabbana",
    "Victoria's Secret": "victoria-s-secret",
}
STRIP = r"\b(edp|edt|eau de (parfum|toilette|cologne)|extrait( de parfum)?|perfume|parfum|x cj|x\s+\w+$|\d+\s?ml|unisex|for (men|women|him|her)|pour (homme|femme))\b"


def key(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = s.lower().replace("&", " and ").replace("’", "'")
    s = re.sub(r"\(.*?\)", " ", s)
    s = re.sub(STRIP, " ", s)
    return " ".join(re.sub(r"[^a-z0-9]+", " ", s).split())


def slug(b):
    return re.sub(r"[^a-z0-9]+", "-", b.lower()).strip("-")


# Nama di Female Daily yang beda ejaan / nama lama.
ALIAS = {"hmns-orgsm": "orgasm", "hmns-eos": "essence of sun", "hmns-untitled-01": "untitled humans",
         "alchemist-bois-et-musc": "bois et music"}
FEM, MASC = re.compile(r"(?i)\b(for her|femme|women|woman|lady)\b"), re.compile(r"(?i)\b(for him|homme|men|man)\b")


def gender_ok(p, c):
    text = c["name"] + " " + c["url"].rsplit("/", 1)[-1].replace("-", " ")
    if p["gender"] == "Pria" and FEM.search(text):
        return False
    if p["gender"] == "Wanita" and MASC.search(text):
        return False
    return True


by_brand = {}
for k, v in fd.items():
    by_brand.setdefault(k.split("/")[1], []).append(v)

matched = []
for p in data:
    cands = by_brand.get(FD_BRAND.get(p["brand"], slug(p["brand"])), [])
    pk = ALIAS.get(p["id"]) or key(p["name"])
    cands = [c for c in cands if gender_ok(p, c)]
    # conc ikut dicocokkan kalau FD punya versi beda (mis. Sauvage EDT vs EDP)
    want_conc = {"EDT": "edt", "EDP": "edp", "X": "extrait"}.get(p.get("conc"), "")
    exact = [c for c in cands if key(c["name"]) == pk and c["reviews"] > 0]
    if len(exact) > 1 and want_conc:
        exact = [c for c in exact if want_conc in c["name"].lower() or want_conc in c["url"]] or exact
    if not exact:
        # nama kita sebagai awal nama FD ("Sauvage" vs "Sauvage Elixir" -> jangan)
        exact = [c for c in cands if c["reviews"] > 0 and (key(c["name"]) == pk or pk and key(c["name"]).split() == pk.split())]
    if exact:
        best = max(exact, key=lambda c: c["reviews"])
        p["fd"] = {"rating": best["rating"], "reviews": best["reviews"], "recommend": best["recommend"], "url": best["url"]}
        matched.append(p)
    else:
        p.pop("fd", None)

# Skala Female Daily cenderung lebih tinggi dari Fragrantica. Kalibrasi:
# rata-rata Bayes (m review semu di rata-rata FD), lalu geser ke skala Fragrantica.
fd_vals = [p["fd"]["rating"] * 2 for p in matched]
frag_vals = [p["rating"] for p in data if p.get("ratingSrc") == "fragrantica"]
fd_mean, frag_mean = statistics.mean(fd_vals), statistics.mean(frag_vals)
M = 8
for p in matched:
    if p.get("ratingSrc") == "fragrantica":
        continue  # Fragrantica (vote jauh lebih banyak) tetap jadi rating utama
    n = p["fd"]["reviews"]
    bayes = (n * p["fd"]["rating"] * 2 + M * fd_mean) / (n + M)
    p["rating"] = round(min(10, max(1, bayes - fd_mean + frag_mean)), 1)
    p["ratingSrc"] = "femaledaily"
print(f"FD cocok: {len(matched)} parfum; rata FD {fd_mean:.2f}, rata Fragrantica {frag_mean:.2f}")

# --- 2) Varian ukuran + harga terbaru dari feed toko resmi ---
FEEDS = {"officialmykonos.com": "officialmykonos.com.json", "hmnsperfume.com": "hmnsperfume.com.json",
         "alchemistfragrance.com": "alchemistfragrance.com.json", "saffnco.com": "saffnco.com.json"}
feeds = {d: {x["handle"]: x for x in json.load(open(os.path.join(SCR, "feeds", f), encoding="utf-8"))["products"]} for d, f in FEEDS.items()}
for p in data:
    b = (p.get("buy") or [{}])[0]
    m = re.match(r"https://([^/]+)/products/([^/?#]+)", b.get("url", ""))
    if not m or m.group(1) not in feeds:
        continue
    prod = feeds[m.group(1)].get(m.group(2))
    if not prod:
        continue
    sizes = {}
    for v in prod["variants"]:
        sz = re.search(r"(\d+)\s*ml", v["title"], re.I) or (len(prod["variants"]) == 1 and re.search(r"(\d+)\s*ml", prod["title"], re.I))
        # satu varian tanpa keterangan ukuran ("Default Title") = ukuran parfum itu sendiri
        s = int(sz.group(1)) if sz else (p["size"] if len(prod["variants"]) == 1 else None)
        if s:
            # harga normal: kalau lagi diskon, Shopify nyimpen harga normalnya di compare_at_price
            price = round(max(float(v["price"]), float(v.get("compare_at_price") or 0)))
            sizes[s] = min(price, sizes.get(s, price))
    if len(sizes) > 1:
        p["variants"] = [{"size": s, "price": sizes[s]} for s in sorted(sizes)]
    if p["size"] in sizes and sizes[p["size"]] != p["price"]:
        print(f"  harga {p['id']}: {p['price']} -> {sizes[p['size']]}")
        p["price"] = sizes[p["size"]]

# --- 3) Sumber harga ---
for p in data:
    if p["origin"] == "Lokal":
        p["priceSrc"] = "toko" if p.get("buy") else "retailer"
        p["checked"] = CHECKED
    else:
        p["priceSrc"] = "estimasi"
        p.pop("checked", None)

header = re.sub(r"// - harga lokal:.*\n", "", header)
if "femaledaily" not in header:
    header = header.replace('// - ratingSrc "estimasi"', '// - ratingSrc "femaledaily": rating Female Daily (fd.rating /5, fd.reviews), dikalibrasi ke skala Fragrantica\n'
                            '//   (rata-rata Bayes + geser rata-rata) biar adil dibanding rating Fragrantica.\n// - ratingSrc "estimasi"')
    header += ('// - variants: ukuran lain dari toko resmi. priceSrc "toko" = harga normal toko resmi, "retailer" = harga retailer,\n'
               '//   "estimasi" = perkiraan retail Indonesia. checked = bulan harga dicek.\n')
with open(DATA, "w", encoding="utf-8") as f:
    f.write(header + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")

from collections import Counter
print(Counter(p.get("ratingSrc") for p in data), "| varian:", sum("variants" in p for p in data))
for p in data:
    if p["origin"] == "Lokal" and "fd" not in p:
        print("  lokal tanpa FD:", p["id"])
