"""Tambah lini Project 1945 lengkap + link beli (toko resmi) ke data.js.

python -I extend.py <scratch_dir> <data_js> <img_dir>
"""
import html, io, json, os, re, sys, urllib.request

SCR, DATA, IMG = sys.argv[1:4]
sys.stdout.reconfigure(encoding="utf-8")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

src = open(os.path.join(SCR, "build.py"), encoding="utf-8").read()
ns = {}
exec(src.split("def fetch(")[0].replace("MASTER, CACHE, IMG, OUT = sys.argv[1:5]", "").replace("os.makedirs(CACHE, exist_ok=True)\nos.makedirs(IMG, exist_ok=True)", ""), ns)
exec("def clean(n):" + src.split("def clean(n):")[1].split("def parse(")[0], ns)
family, clean = ns["family"], ns["clean"]

text = open(DATA, encoding="utf-8").read()
header, body = text.split("const PERFUMES = ", 1)
data = json.loads(body.rstrip().rstrip(";"))
byid = {p["id"]: p for p in data}
for p in data:
    p["name"] = re.sub(r"^[-\s]+", "", p["name"])

# --- 1) Project 1945: notes & harga normal dari listing toko PROJECT 1945 di Tokopedia (Okt 2026) ---
TP = "https://www.tokopedia.com/project1945/"
TB = "https://tuesbellescent.com/products/"
P1945 = [
    # id, nama, conc, size, harga, top, mid, base / all, url beli, file gambar sumber (index tp/ atau url)
    ("sunset-in-sumba", "Sunset in Sumba", "EDP", 100, 325000, None, None, None, "project-1945-sunset-in-sumba-perfume-edp-parfum-unisex-100ml-1730928031487198753"),
    ("fields-of-ubud", "Fields of Ubud", "X", 100, 345000, None, None, "Bergamot, Rice, Fig, Clary Sage, Lily of the Valley, Sesame, Tonka Bean, Musk, Cedar", "project-1945-fields-of-ubud-perfume-extrait-de-parfum-unisex-100ml-2024-edition-1734227149653968417"),
    ("princess-of-java", "Princess of Java", "EDP", 100, 325000, "Peach, Green Pear, Bitter Orange", "Tuberose, Neroli, Jasmine, Orange Blossom", "Vanilla, Sandalwood, Musk, Amber", "project-1945-princess-of-java-edp-parfum-unisex-100ml-magnet-1736086061190120993-1736085945388533281"),
    ("great-batavia", "The Great Batavia", "X", 100, 345000, "Apple, Lemon, Watermelon, Spearmint", "Lavender, Clove, Geranium, Elemi", "Patchouli, Vanilla, Tonka Bean, Moss", "project-1945-the-great-batavia-perfume-extrait-de-parfum-unisex-100ml-1731756662958360097"),
    ("waters-of-maluku", "Waters of Maluku", "X", 100, 345000, "Grapefruit, Carrot, Ginger", "Lotus, Peony, Clove", "Wet Stones, Clearwood, Vetiver", "project-1945-waters-of-maluku-perfume-edp-parfum-unisex-100ml-1735372843604477473"),
    ("symphony-of-borobudur", "Symphony of Borobudur", "EDP", 100, 345000, "Fig, Mandarin, Tuberose", "Violet, Incense, Sandalwood, Milk", "Vanilla, Tonka Bean, Benzoin, Musk", "project-1945-symphony-of-borobudur-perfume-edp-parfum-unisex-100ml-1730291553632224801"),
    ("heiress-of-minahasa", "Heiress of Minahasa", "EDP", 100, 345000, "Bergamot, Mandarin, Pepper, Rhubarb", "Rose, Incense, Patchouli, Cashmere Wood", "Vetiver, Sandalwood, Benzoin, Musk", TB + "662180/project-1945-heiress-of-minahasa-eau-de-parfum-__-100ml"),
    ("bamboe-roencing", "Bamboe Roencing", "X", 100, 345000, "Bergamot, Galbanum, Marine, Peach", "Jasmine, Osmanthus, Rose, Ylang-Ylang", "Cedar, Honey, Musk", "project-1945-bamboe-roencing-perfume-extrait-de-parfum-unisex-100ml-1735676707509667361-1735676678059820577"),
    ("arumanis", "Arumanis", "X", 100, 345000, "Apple, Pistachio, Mandarin, Orange", "Chocolate, Heliotrope, Lily of the Valley", "Cedar, Musk, Sandalwood, Vanilla", "project-1945-arumanis-perfume-extrait-de-parfum-unisex-100ml-1732913023640110625"),
    ("velvet-toraja", "Velvet Toraja", "X", 100, 345000, "Mandarin, Pear, Lime", "Fig, Jasmine, Coffee", "Vanilla, Patchouli, Amber", "project-1945-velvet-toraja-perfume-extrait-de-parfum-unisex-100ml-1733289406851417633"),
    ("trails-of-bromo", "Trails of Bromo", "X", 100, 345000, "Orange, Apple, Java Tea", "Petitgrain, Violet Leaf, Cedar", "Musk, Amber, Moss", "project-1945-trails-of-bromo-perfume-extrait-de-parfum-unisex-100ml-1737686105227167265-1737686105288902177"),
    ("sunrise-in-mentawai", "Sunrise in Mentawai", "X", 100, 345000, "Bergamot, Basil, Grapefruit", "Peony, Chamomile, Cedar", "Sandalwood, Ambroxan, Musk", "project-1945-sunrise-in-mentawai-perfume-extrait-de-parfum-unisex-100-ml-1737346072744920609-1737346075728512545"),
    ("horas", "Horas (x Chicco Jerikho)", "EDP", 100, 375000, None, None, "Rum, Chocolate, Coffee, Caramel, Almond, Heliotrope, Vetiver, Sandalwood", "project-1945-x-cj-horas-perfume-edp-parfum-unisex-100ml-1737091423909807649"),
    ("petruk", "Petruk (x Chicco Jerikho)", "EDP", 100, 375000, None, None, "Lemon, Leather, Cardamom, Apple, Rose, Pepper, Lavender, Cedar, Vetiver", "project-1945-x-cj-petruk-perfume-edp-parfum-unisex-100ml-1737091434725869089"),
    ("samosir", "Samosir (x Chicco Jerikho)", "EDP", 100, 375000, None, None, "Bergamot, Green Notes, Jasmine, Honeysuckle, Green Tea, Honey, Labdanum, Musk", "project-1945-x-cj-samosir-perfume-edp-parfum-unisex-100ml-1730927278768555658"),
    ("apresiasi", "Apresiasi", "EDP", 10, 95000, "Bergamot, Ambrette Seeds, Orange", "Neroli, Petitgrain, Musk", "Vetiver, Cedar, Amber", "project-1945-apresiasi-perfume-edp-parfum-unisex-10ml-1737091430986909217"),
    ("nusantaras-embrace", "Nusantara's Embrace", "EDP", 10, 95000, "Citrus, Incense, Star Anise", "Rice, Black Orris, Water Lily", "Sesame, Sandalwood, Hay", "project-1945-nusantara-s-embrace-perfume-edp-parfum-unisex-10ml-1737091388977808929"),
]
URLS = [l.strip() for l in open(os.path.join(SCR, "tp", "urls.txt"), encoding="utf-8")]


# Foto pertama beberapa listing = banner promo, jadi pakai foto ke-n (foto suasana → imgFit cover).
ALT = {"arumanis": 1, "bamboe-roencing": 4, "fields-of-ubud": 4, "great-batavia": 2, "princess-of-java": 4,
       "samosir": 3, "sunrise-in-mentawai": 1, "symphony-of-borobudur": 1, "trails-of-bromo": 4, "velvet-toraja": 4}
COVER = set(ALT) - {"great-batavia"} | {"apresiasi", "nusantaras-embrace", "waters-of-maluku"}


def tp_image(slug, n=0):
    """Foto ke-n listing Tokopedia (tanpa duplikat)."""
    i = next(k for k, u in enumerate(URLS, 1) if u.endswith(slug))
    s = open(os.path.join(SCR, "tp", f"{i}.html"), encoding="utf-8").read()
    seen = []
    for m in re.findall(r'"(?:urlOriginal|URLMaxRes)":"(https:[^"]+)"', s):
        u = json.loads('"%s"' % m)
        if u.split("~")[0] not in [x.split("~")[0] for x in seen]:
            seen.append(u)
    return seen[n]


def tb_image(url):
    s = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30).read().decode("utf-8", "replace")
    return html.unescape(re.search(r'<meta property="og:image" content="([^"]+)"', s).group(1))


def save_img(url, pid):
    from PIL import Image
    raw = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40).read()
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    im.thumbnail((700, 700))
    im.save(os.path.join(IMG, pid + ".jpg"), quality=86)


order = [p["id"] for p in data]
for slug, name, conc, size, price, top, mid, base, link in P1945:
    pid = "p1945-" + slug
    old = byid.get(pid)
    if old and old.get("ratingSrc") == "fragrantica":
        e = old  # pertahankan rating & notes Fragrantica, cukup sinkron harga
        e["price"], e["size"], e["conc"] = price, size, conc
    else:
        notes = {"all": [clean(x) for x in base.split(",")]} if top is None else \
            {k: [clean(x) for x in v.split(",")] for k, v in (("top", top), ("middle", mid), ("base", base))}
        e = {
            "id": pid, "name": name, "brand": "Project 1945", "origin": "Lokal", "gender": "Unisex",
            "family": family(notes), "conc": conc, "size": size, "price": price,
            "longevity": 8 if conc == "X" else 7, "sillage": 7 if conc == "X" else 6,
            "rating": 8.0, "ratingSrc": "estimasi", "fragrantica": None, "notes": notes, "notesSrc": "resmi",
        }
    tokped = not link.startswith("http")
    e["buy"] = [{"store": "Tokopedia · PROJECT 1945", "url": TP + link if tokped else link,
                 "kind": "marketplace" if tokped else "retailer"}]
    if not tokped:
        e["buy"][0]["store"] = "Tuesbelle Scent"
    if pid not in byid:
        data.insert(max(i for i, p in enumerate(data) if p["brand"] == "Project 1945") + 1, e)
        byid[pid] = e
    if slug in COVER:
        e["imgFit"] = "cover"
    dest = os.path.join(IMG, pid + ".jpg")
    if not os.path.exists(dest):
        save_img(tp_image(link, ALT.get(slug, 0)) if tokped else tb_image(link), pid)
        print("img", pid)

# --- 2) Link beli toko resmi untuk merek lokal dengan toko Shopify ---
SHOPS = {
    "Mykonos": ("officialmykonos.com", "officialmykonos.com.json"),
    "HMNS": ("hmnsperfume.com", "hmnsperfume.com.json"),
    "Alchemist": ("alchemistfragrance.com", "alchemistfragrance.com.json"),
    "SAFF & Co.": ("saffnco.com", "saffnco.com.json"),
}
HANDLE = {  # nama yang beda jauh dari judul produk di toko
    "hmns-darker-orgsm": "hmns-perfume-darker-shades-of-orgasm-eau-de-parfum",
    "hmns-orgsm-melting": "orgsm-melting-temptation",
    "hmns-the-prestige": "hmns-perfume-the-prestige",
    "hmns-farhampton": "farhampton-100ml-extrait-de-parfum",
    "hmns-eos": "essence-of-the-sun-eos-100ml-edp",
    "hmns-unpatched": "hmns-perfume-unpatched",
    "hmns-addict": "addict-100ml",
    "hmns-philea": "hmns-perfume-philea-100ml",
    "hmns-sore-eterna": "hmns-perfume-sore-eterna-100ml",
    "hmns-untitled-01": "untitled-humans",
    "hmns-untitled-02": "untitled-humans-aroma-02",
    "alchemist-musc-laiteux": "alchemist-fragrance-musc-laiteux-les-classiques",
    "alchemist-cachemire": "alchemist-fragrance-cachmire-les-classiques",
    "alchemist-bois-et-musc": "bois-et-musc-copy-1",
    "alchemist-out-west-am": "out-west-a-m-extrait-de-parfum",
    "alchemist-out-west-pm": "out-west-p-m-elixir",
    "alchemist-pink-laundry": "pink-laundry",
    "alchemist-mojo": "got-my-mojo-back",
    "hmns-alpha": "alpha-100ml",
    "mykonos-reflection": "mykonos-reflection-extrait-de-parfum-50ml-100ml",
    "mykonos-invade": "mykonos-x-setiawanade-invade-extrait-de-parfum-50ml",
    "saff-sotb": "extrait-de-parfum-sotb",
}
key = lambda s: re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()
for brand, (dom, fn) in SHOPS.items():
    prods = json.load(open(os.path.join(SCR, "feeds", fn), encoding="utf-8"))["products"]
    handles = {p["handle"] for p in prods}
    for e in data:
        if e["brand"] != brand or e.get("buy"):
            continue
        h = HANDLE.get(e["id"])
        if not h:
            n = key(e["name"])
            cands = [p for p in prods if re.search(r"\b%s\b" % re.escape(n), key(p["title"]))
                     and not re.search(r"(?i)travel|discovery|bundle|set|mini|decant|body|mist|hair|lotion|coffee|blindbox", p["title"])]
            if cands:
                h = min(cands, key=lambda p: len(p["title"]))["handle"]
        if h in handles:
            e["buy"] = [{"store": "Toko resmi " + brand, "url": f"https://{dom}/products/{h}", "kind": "site"}]
        else:
            print("tanpa link:", e["id"])

header = header.replace("// - family ditebak", "// - buy: link beli. kind \"site\" = situs resmi brand, \"marketplace\" = toko brand di marketplace, \"retailer\" = toko pihak ketiga.\n// - family ditebak")
with open(DATA, "w", encoding="utf-8") as f:
    f.write(header + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
p19 = [p for p in data if p["brand"] == "Project 1945"]
print(len(data), "parfum;", len(p19), "Project 1945;", sum(bool(p.get("buy")) for p in data), "punya link beli")
