"""Rakit data.js final: hasil Fragrantica + notes resmi toko + notes manual.

python -I assemble.py <scratch_dir> <out_data_js> <img_dir>
"""
import html, json, os, re, sys, time, urllib.request

SCR, OUT, IMG = sys.argv[1:4]
sys.path.insert(0, SCR)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"

# --- fungsi family & normalisasi notes dari build.py (tanpa menjalankan scraping-nya) ---
src = open(os.path.join(SCR, "build.py"), encoding="utf-8").read()
ns = {}
exec(src.split("def fetch(")[0].replace("MASTER, CACHE, IMG, OUT = sys.argv[1:5]", "").replace("os.makedirs(CACHE, exist_ok=True)\nos.makedirs(IMG, exist_ok=True)", ""), ns)
exec("def clean(n):" + src.split("def clean(n):")[1].split("def parse(")[0], ns)
family, clean = ns["family"], ns["clean"]

def notes_from(top="", mid="", base="", all_=""):
    sp = lambda s: [clean(x) for x in s.split(",") if x.strip()]
    if all_:
        return {"all": sp(all_)}
    return {"top": sp(top), "middle": sp(mid), "base": sp(base)}

master = {}
for line in open(os.path.join(SCR, "master.tsv"), encoding="utf-8"):
    if line.strip() and not line.startswith("#"):
        r = line.rstrip("\n").split("\t")
        master[r[0]] = dict(fid=r[1], brand=r[2], name=r[3], origin=r[4], price=int(r[5]), size=int(r[6]), conc=r[7], lon=int(r[8]), sil=int(r[9]))

def entry(pid, notes, rating, gender, **over):
    m = {**master.get(pid, {}), **over}
    return {
        "id": pid, "name": m["name"], "brand": m["brand"], "origin": m["origin"], "gender": gender,
        "family": family(notes), "conc": m["conc"], "size": m["size"], "price": m["price"],
        "longevity": m["lon"], "sillage": m["sil"], "rating": rating, "ratingSrc": "estimasi",
        "fragrantica": m["fid"] if str(m.get("fid", "")).isdigit() else None, "notes": notes,
    }

def download(url, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.fragrantica.com/"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            open(dest, "wb").write(r.read())
    except Exception as e:  # noqa: BLE001
        print("  ! gambar gagal", url, e, file=sys.stderr)
    time.sleep(0.3)

out = []

# 1) Hasil Fragrantica (notes + rating asli)
gen = open(os.path.join(SCR, "data.gen.js"), encoding="utf-8").read()
for p in json.loads(gen.split("const PERFUMES = ", 1)[1].rstrip().rstrip(";")):
    p["ratingSrc"] = "fragrantica"
    out.append(p)
done = {p["id"] for p in out}

# 2) Impor: notes manual (piramida umum), rating estimasi
IMPOR = {
    "chanel-bleu-edp": (8.6, "Pria", "Grapefruit, Lemon, Mint, Bergamot, Pink Pepper, Aldehydes, Coriander", "Ginger, Jasmine, Nutmeg, Melon", "Incense, Amber, Cedar, Sandalwood, Amberwood, Patchouli, Labdanum"),
    "chanel-allure-sport": (8.2, "Pria", "Orange, Blood Mandarin, Sea Notes, Aldehydes", "Pepper, Neroli, Cedar", "Tonka, Vanilla, White Musk, Amber, Vetiver, Elemi"),
    "chanel-no5-edp": (8.0, "Wanita", "Aldehydes, Ylang-Ylang, Neroli, Bergamot, Lemon, Peach", "Iris, Jasmine, Rose, Lily of the Valley", "Amber, Sandalwood, Musk, Vanilla, Oakmoss, Vetiver, Patchouli"),
    "chanel-chance-tendre": (8.0, "Wanita", "Quince, Grapefruit", "Hyacinth, Jasmine", "White Musk, Iris, Cedar, Amber"),
    "chanel-coco-mlle": (8.4, "Wanita", "Orange, Mandarin, Bergamot, Orange Blossom", "Rose, Jasmine, Mimosa, Ylang-Ylang", "Patchouli, White Musk, Vanilla, Vetiver, Tonka"),
    "ysl-y-edp": (8.3, "Pria", "Apple, Ginger, Bergamot", "Sage, Juniper, Geranium", "Amberwood, Tonka, Cedar, Vetiver, Olibanum"),
    "ysl-libre": (8.1, "Wanita", "Lavender, Mandarin, Blackcurrant, Petitgrain", "Lavender, Orange Blossom, Jasmine", "Vanilla, Musk, Cedar, Ambergris"),
    "ysl-black-opium": (8.0, "Wanita", "Pear, Pink Pepper, Orange Blossom", "Coffee, Jasmine, Bitter Almond, Licorice", "Vanilla, Patchouli, Cedar, Cashmere Wood"),
    "ysl-lndlh": (8.4, "Pria", "Cardamom", "Lavender, Cedar, Bergamot", "Vetiver, Caraway"),
    "armani-adg-edt": (7.9, "Pria", "Lime, Lemon, Bergamot, Jasmine, Orange, Mandarin, Neroli", "Sea Notes, Calone, Peach, Rosemary, Freesia, Hyacinth", "White Musk, Cedar, Oakmoss, Patchouli, Amber"),
    "armani-adg-profumo": (8.6, "Pria", "Sea Notes, Bergamot", "Rosemary, Sage, Geranium", "Incense, Patchouli"),
    "armani-si": (7.9, "Wanita", "Blackcurrant", "Rose, Freesia", "Vanilla, Patchouli, Ambroxan, Woody Notes"),
    "armani-code": (8.2, "Pria", "Lemon, Bergamot", "Star Anise, Olive Blossom, Guaiac Wood", "Leather, Tobacco, Tonka"),
    "versace-eros-edt": (8.0, "Pria", "Mint, Green Apple, Lemon", "Tonka, Ambroxan, Geranium", "Vanilla, Vetiver, Oakmoss, Cedar"),
    "versace-eros-flame": (8.1, "Pria", "Mandarin, Black Pepper, Chinotto, Lemon, Rosemary", "Pepper, Rose, Geranium", "Vanilla, Tonka, Sandalwood, Patchouli, Cedar, Oakmoss"),
    "versace-dylan-blue": (7.7, "Pria", "Bergamot, Water Notes, Grapefruit, Fig Leaf", "Ambroxan, Black Pepper, Patchouli, Violet Leaf, Papyrus", "Incense, Musk, Tonka, Saffron"),
    "versace-bright-crystal": (7.6, "Wanita", "Pomegranate, Yuzu, Water Notes", "Peony, Magnolia, Lotus", "Musk, Mahogany, Amber"),
    "prada-lhomme": (8.2, "Pria", "Neroli, Black Pepper, Cardamom", "Iris, Violet, Geranium, Mate", "Amber, Patchouli, Cedar, Sandalwood"),
    "prada-lr-carbon": (8.0, "Pria", "Bergamot, Pepper", "Lavender, Metallic Notes, Water Notes", "Patchouli, Ambroxan"),
    "valentino-bir-donna": (8.0, "Wanita", "Blackcurrant, Pink Pepper, Bergamot", "Jasmine, Jasmine Tea", "Vanilla, Cashmeran, Guaiac Wood"),
    "mugler-alien": (7.9, "Wanita", "Jasmine", "Cashmeran, Woody Notes", "Amber"),
    "mugler-angel": (7.6, "Wanita", "Cotton Candy, Coconut, Blackcurrant, Melon, Bergamot, Mandarin", "Honey, Red Berries, Plum, Apricot, Peach, Jasmine, Rose", "Patchouli, Chocolate, Caramel, Vanilla, Tonka, Amber, Musk"),
    "tomford-ombre-leather": (8.1, "Unisex", "Cardamom", "Leather, Jasmine", "Amber, Moss, Patchouli"),
    "tomford-tobacco-vanille": (8.4, "Unisex", "Tobacco Leaf, Spicy Notes", "Vanilla, Cacao, Tonka, Tobacco Blossom", "Dried Fruits, Woody Notes"),
    "tomford-lost-cherry": (8.0, "Unisex", "Black Cherry, Cherry Liqueur, Bitter Almond", "Rose, Jasmine", "Peru Balsam, Tonka, Sandalwood, Vetiver, Cinnamon, Clove"),
    "mfk-br540-35": (8.2, "Unisex", "Saffron, Jasmine", "Amberwood, Ambergris", "Fir Resin, Cedar"),
    "pdm-layton": (8.6, "Pria", "Apple, Lavender, Bergamot, Mandarin", "Geranium, Violet, Jasmine", "Vanilla, Cardamom, Sandalwood, Pepper, Patchouli, Guaiac Wood"),
    "pdm-delina": (8.4, "Wanita", "Lychee, Rhubarb, Bergamot, Nutmeg", "Rose, Peony, Musk, Vanilla", "Cashmeran, Incense, Cedar, Vetiver"),
    "byredo-gypsy-water": (7.8, "Unisex", "Bergamot, Lemon, Pepper, Juniper", "Incense, Pine Needles, Iris", "Amber, Vanilla, Sandalwood"),
    "byredo-mojave-ghost": (7.9, "Unisex", "Ambrette, Sapodilla", "Magnolia, Violet, Sandalwood", "Ambergris, Cedar, Musk"),
    "jomalone-wsss": (7.7, "Unisex", "Ambrette", "Sea Salt", "Sage"),
    "jomalone-pear-freesia": (7.8, "Wanita", "Pear, Melon", "Freesia, Rose", "Musk, Patchouli, Rhubarb, Amber"),
    "kilian-ldbs": (8.2, "Wanita", "Neroli, Bergamot, Pink Pepper, Coriander, Lavender", "Orange Blossom, Rose, Jasmine, Iris", "Caramel, Vanilla, Musk, Labdanum"),
    "kilian-angels-share": (8.6, "Unisex", "Cognac", "Cinnamon, Tonka, Oak", "Praline, Vanilla, Sandalwood"),
    "initio-side-effect": (8.4, "Unisex", "Rum", "Tobacco, Cinnamon", "Vanilla"),
    "nishane-hacivat": (8.6, "Unisex", "Pineapple, Bergamot, Grapefruit", "Patchouli, Cedar, Jasmine", "Oakmoss, Woody Notes"),
    "boss-bottled": (7.8, "Pria", "Apple, Plum, Bergamot, Lemon, Geranium", "Cinnamon, Mahogany, Carnation", "Vanilla, Sandalwood, Cedar, Vetiver"),
    "burberry-her": (7.9, "Wanita", "Strawberry, Raspberry, Blackberry, Sour Cherry, Blackcurrant, Mandarin, Lemon", "Violet, Jasmine", "Musk, Vanilla, Cashmeran, Amber, Patchouli, Oakmoss"),
    "gucci-guilty-ph": (7.7, "Pria", "Lemon, Lavender", "Orange Blossom, Neroli", "Cedar, Patchouli"),
    "ch-good-girl": (7.9, "Wanita", "Almond, Coffee, Bergamot, Lemon", "Tuberose, Jasmine, Orange Blossom, Rose", "Tonka, Cacao, Vanilla, Praline, Sandalwood, Musk, Cedar"),
    "ch-212-vip-men": (7.8, "Pria", "Passionfruit, Lime, Pepper, Ginger", "Vodka, Gin, Mint", "Amber, Woody Notes, Leather"),
    "ck-one": (7.3, "Unisex", "Lemon, Green Notes, Bergamot, Pineapple, Mandarin, Cardamom, Papaya", "Lily of the Valley, Jasmine, Violet, Nutmeg, Rose, Iris, Freesia", "Musk, Cedar, Sandalwood, Oakmoss, Green Tea, Amber"),
    "ck-eternity-men": (7.6, "Pria", "Lavender, Lemon, Bergamot, Mandarin", "Basil, Juniper, Sage, Geranium, Jasmine, Lily of the Valley", "Vetiver, Sandalwood, Rosewood, Amber, Musk"),
    "bvlgari-aqva": (7.8, "Pria", "Mandarin, Petitgrain", "Seaweed, Cotton, Santolina", "Posidonia, Mineral Notes, Clary Sage"),
    "jpg-le-male-edt": (8.2, "Pria", "Lavender, Mint, Cardamom, Bergamot, Artemisia", "Cinnamon, Orange Blossom, Cumin", "Vanilla, Tonka, Amber, Sandalwood, Cedar"),
    "jpg-le-male-elixir": (8.4, "Pria", "Lavender, Mint", "Vanilla, Benzoin", "Honey, Tonka, Tobacco"),
    "jpg-le-beau": (8.0, "Pria", "Bergamot", "Coconut", "Tonka"),
    "jpg-scandal": (7.9, "Wanita", "Blood Orange, Mandarin", "Honey, Gardenia, Orange Blossom, Jasmine, Peach", "Beeswax, Caramel, Patchouli, Licorice"),
    "rabanne-1-million": (7.6, "Pria", "Grapefruit, Mint, Blood Mandarin", "Rose, Cinnamon, Spices", "Leather, Amber, Woody Notes, Patchouli"),
    "rabanne-invictus": (7.7, "Pria", "Grapefruit, Sea Notes, Mandarin", "Bay Leaf, Jasmine", "Ambergris, Guaiac Wood, Oakmoss, Patchouli"),
    "rabanne-lady-million": (7.6, "Wanita", "Raspberry, Neroli, Lemon", "Gardenia, Jasmine, Orange Blossom", "Honey, Patchouli, Amber"),
    "givenchy-linterdit": (8.0, "Wanita", "Pear, Bergamot", "Tuberose, Orange Blossom, Jasmine", "Vetiver, Patchouli, Ambroxan, Vanilla"),
    "lancome-lveb": (7.9, "Wanita", "Blackcurrant, Pear", "Iris, Jasmine, Orange Blossom", "Praline, Vanilla, Patchouli, Tonka"),
    "dg-light-blue": (7.7, "Wanita", "Lemon, Apple, Cedar, Bellflower", "Bamboo, Jasmine, Rose", "Cedar, Musk, Amber"),
    "mm-fireplace": (8.2, "Unisex", "Pink Pepper, Orange Blossom, Clove", "Chestnut, Guaiac Wood, Juniper", "Vanilla, Peru Balsam, Cashmeran"),
    "ag-cloud": (7.8, "Wanita", "Lavender, Pear, Bergamot", "Whipped Cream, Praline, Coconut, Vanilla Orchid", "Musk, Woody Notes"),
    "vs-bombshell": (7.5, "Wanita", "Passionfruit, Grapefruit, Pineapple, Tangerine, Strawberry", "Peony, Vanilla Orchid, Red Berries, Jasmine, Lily of the Valley", "Musk, Woody Notes, Oakmoss"),
    "kayali-vanilla28": (8.1, "Wanita", "Vanilla Orchid", "Brown Sugar, Tonka", "Amber, Patchouli, Musk"),
    "lattafa-khamrah": (8.4, "Unisex", "Cinnamon, Nutmeg, Bergamot", "Dates, Praline, Tuberose, Mahonial", "Vanilla, Tonka, Amberwood, Myrrh, Benzoin, Akigalawood"),
    "lattafa-khamrah-qahwa": (8.3, "Unisex", "Cinnamon, Cardamom, Ginger", "Praline, Candied Fruits, White Flowers", "Vanilla, Coffee, Tonka, Benzoin, Musk"),
    "lattafa-asad": (8.1, "Pria", "Black Pepper, Pineapple, Tobacco", "Coffee, Patchouli, Iris", "Vanilla, Amber, Benzoin, Labdanum"),
    "lattafa-yara": (8.0, "Wanita", "Orchid, Heliotrope, Tangerine", "Gourmand Accord, Tropical Fruits", "Vanilla, Musk, Sandalwood"),
    "armaf-cdni-man": (8.0, "Pria", "Lemon, Pineapple, Bergamot, Blackcurrant, Apple", "Birch, Jasmine, Rose", "Musk, Ambergris, Patchouli, Vanilla"),
    "armaf-cdn-untold": (8.1, "Unisex", "Saffron, Jasmine", "Amberwood, Ambergris", "Fir Resin, Cedar"),
    "afnan-9pm": (8.1, "Pria", "Apple, Cinnamon, Lavender, Bergamot", "Orange Blossom, Lily of the Valley", "Vanilla, Tonka, Amber, Patchouli"),
    "rasasi-hawas": (8.0, "Pria", "Apple, Bergamot, Lemon, Cinnamon", "Plum, Orange Blossom, Cardamom", "Ambergris, Musk, Driftwood, Patchouli"),
}
IMPOR_ALL = {
    "lelabo-santal33": (8.0, "Unisex", "Sandalwood, Cardamom, Violet, Papyrus, Leather, Iris, Cedar, Ambrox, Spices"),
    "gucci-bloom": (8.0, "Wanita", "Tuberose, Jasmine, Rangoon Creeper"),
}
for pid, (r, g, t, m, b) in IMPOR.items():
    if pid not in done:
        out.append({**entry(pid, notes_from(t, m, b), r, g), "notesSrc": "manual"})
for pid, (r, g, a) in IMPOR_ALL.items():
    if pid not in done:
        out.append({**entry(pid, notes_from(all_=a), r, g), "notesSrc": "manual"})
for p in out:
    if p["origin"] == "Impor" and p.get("fragrantica"):
        download(f"https://fimgs.net/mdimg/perfume/375x500.{p['fragrantica']}.jpg", os.path.join(IMG, p["id"] + ".jpg"))
done = {p["id"] for p in out}

# 3) Lokal dari toko resmi (notes resmi, foto toko). Rating belum ada → estimasi 8.0.
def feed(name):
    return {p["handle"]: p for p in json.load(open(os.path.join(SCR, "feeds", name), encoding="utf-8"))["products"]}

def body(p):
    t = html.unescape(re.sub(r"<[^>]+>", " | ", p["body_html"] or ""))
    return re.sub(r"(\s*\|\s*)+", " | ", t)

def shop_img(p, pid):
    if p["images"]:
        u = p["images"][0]["src"]
        download(u + ("&" if "?" in u else "?") + "width=700", os.path.join(IMG, pid + ".jpg"))

myk = feed("officialmykonos.com.json")
for h, p in myk.items():
    m = dict(re.findall(r"(Top|Middle|Base) Notes?\s*:\s*([^|]*)", body(p)))
    if not all(m.get(k, "").strip() for k in ("Top", "Middle", "Base")):
        continue
    name = re.sub(r"^Mykonos\s*[-–]\s*|\s*(Extrait de Parfum|EDP|Eau de Parfum).*$", "", p["title"], flags=re.I).strip()
    name = re.sub(r"^Mykonos x \S+\s*", "", name, flags=re.I).strip() or p["title"]
    pid = "mykonos-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    if pid in done:
        continue
    v = sorted(p["variants"], key=lambda v: float(v["price"]))[0]
    sz = re.search(r"(\d+)\s*ml", v["title"], re.I) or re.search(r"(\d+)ml", h)
    size = int(sz.group(1))
    conc = "EDP" if "-edp-" in h else "X"
    notes = notes_from(m["Top"].replace(".", ","), m["Middle"].replace(".", ","), m["Base"].replace(".", ","))
    e = entry(pid, notes, 8.0, "Unisex", brand="Mykonos", name=name, origin="Lokal", price=int(float(v["price"])),
              size=size, conc=conc, lon=8 if conc == "X" else 7, sil=7 if conc == "X" else 6, fid="")
    e["notesSrc"] = "resmi"
    out.append(e)
    done.add(pid)
    shop_img(p, pid)

hm = feed("hmnsperfume.com.json")
HMNS = {
    "hmns-darker-orgsm": ("hmns-perfume-darker-shades-of-orgasm-eau-de-parfum", "Cypriol, Caramel"),
    "hmns-orgsm-melting": ("orgsm-melting-temptation", "Caramel, Apple, Pear, Chocolate, Vanilla, Amber, Musk"),
    "hmns-the-prestige": ("hmns-perfume-the-prestige", "Grapefruit, Tobacco Leaf, Tolu Balsam, Vetiver"),
    "hmns-farhampton": ("farhampton-100ml-extrait-de-parfum", "Bergamot, Lavender, Orange Blossom, Labdanum, Tonka"),
    "hmns-eos": ("essence-of-the-sun-eos-100ml-edp", "Solar Accord, Tropical Flowers, Vanilla, Tonka"),
    "hmns-unpatched": ("hmns-perfume-unpatched", "Jasmine, Vanilla, Chocolate, Caramel, Akigalawood, Tonka, Amber, Musk"),
    "hmns-addict": ("addict-100ml", "Berries, Rose, Coffee, Patchouli, Amber"),
    "hmns-philea": ("hmns-perfume-philea-100ml", "Magnolia, Mimosa, Cashmeran"),
    "hmns-sore-eterna": ("hmns-perfume-sore-eterna-100ml", "Bergamot, Ylang-Ylang, Rose, Cedar, Musk"),
    "hmns-untitled-01": ("untitled-humans", "Fig, Sandalwood"),
    "hmns-untitled-02": ("untitled-humans-aroma-02", "Rose, Musk"),
}
for pid, (h, a) in HMNS.items():
    if pid in done:
        continue
    e = entry(pid, notes_from(all_=a), 8.0, "Unisex", fid="")
    e["notesSrc"] = "resmi"
    out.append(e)
    done.add(pid)
    shop_img(hm[h], pid)

alc = feed("alchemistfragrance.com.json")
ALC = {
    "alchemist-musc-laiteux": ("alchemist-fragrance-musc-laiteux-les-classiques", "Floral Notes, Musk, Rice Milk"),
    "alchemist-cachemire": ("alchemist-fragrance-cachmire-les-classiques", "Apple, Rose, Ambrette, Musk, Cedar"),
    "alchemist-bois-et-musc": ("bois-et-musc-copy-1", "Woody Notes, Moss, Musk, Lily of the Valley"),
    "alchemist-out-west-am": ("out-west-a-m-extrait-de-parfum", "Pink Pepper, Ginger, Lemon, Patchouli, Cedar, Leather"),
    "alchemist-out-west-pm": ("out-west-p-m-elixir", "Saffron, Gunsmoke, Labdanum, Vetiver, Vanilla"),
}
for pid, (h, a) in ALC.items():
    if pid in done:
        continue
    e = entry(pid, notes_from(all_=a), 8.0, "Unisex", fid="")
    e["notesSrc"] = "resmi"
    out.append(e)
    done.add(pid)
    shop_img(alc[h], pid)

# Gambar parfum yang sudah ada (Fragrantica) untuk entri hasil scraping.
for p in out:
    if p.get("fragrantica"):
        download(f"https://fimgs.net/mdimg/perfume/375x500.{p['fragrantica']}.jpg", os.path.join(IMG, p["id"] + ".jpg"))

header = """// File ini dibuat oleh assemble.py. Sumber per parfum:
// - ratingSrc "fragrantica": rating bintang Fragrantica × 2 (Okt 2026), `votes` = jumlah vote.
// - ratingSrc "estimasi": rating perkiraan (belum ada data Fragrantica).
// - notesSrc "resmi": notes dari deskripsi toko resmi brand; "manual": piramida umum, belum diverifikasi ulang.
//   Tanpa notesSrc = notes dari Fragrantica. `notes.all` = notes tanpa pembagian top/middle/base.
// - family ditebak otomatis dari notes. longevity & sillage: estimasi (berdasarkan konsentrasi).
// - harga lokal: toko resmi / retailer Okt 2026. harga impor: perkiraan retail Indonesia.
"""
with open(OUT, "w", encoding="utf-8") as f:
    f.write(header + "const PERFUMES = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
loc = sum(p["origin"] == "Lokal" for p in out)
print(f"{len(out)} parfum ({loc} lokal, {len(out) - loc} impor), {len({p['brand'] for p in out})} merek")
missing = [p["id"] for p in out if not os.path.exists(os.path.join(IMG, p["id"] + ".jpg"))]
print("tanpa gambar:", missing)
