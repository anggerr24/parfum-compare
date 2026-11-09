"""Tambah parfum baru ke data.js dari toko resmi: Mykonos & Carl & Claire (feed situs resmi), SAFF & Co. & Kahf
(halaman produk Official Store Tokopedia, hasil tp_products.py). Parfum yang sudah ada dilewati.

python -I tools/add_brands.py
Butuh: tools/feeds/officialmykonos.com.json, tools/feeds/carlandclaire.com.json, tools/feeds/saffnco.com.json,
       tools/tp_saff.json, tools/tp_kahf.json
"""
import html, io, json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data.js")
IMG = os.path.join(HERE, "..", "img")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
sys.stdout.reconfigure(encoding="utf-8")

# family & normalisasi notes dari build.py (tanpa menjalankan scraping-nya)
src = open(os.path.join(HERE, "build.py"), encoding="utf-8").read()
ns = {}
exec(src.split("def fetch(")[0].replace("MASTER, CACHE, IMG, OUT = sys.argv[1:5]", "").replace("os.makedirs(CACHE, exist_ok=True)\nos.makedirs(IMG, exist_ok=True)", ""), ns)
exec("def clean(n):" + src.split("def clean(n):")[1].split("def parse(")[0], ns)
family, clean = ns["family"], ns["clean"]

text = open(DATA, encoding="utf-8").read()
head, body = text.split("const PERFUMES = ", 1)
data = json.loads(body.rstrip().rstrip(";"))
have = {p["id"] for p in data}
added = []


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("é", "e").replace("’", "'").replace("'", "")).strip("-")


def notes_list(s):
    out = []
    for x in re.split(r"[,|/]|\.\s| and | dan ", s):
        x = re.sub(r"\(.*?\)|™|®|\s*a\.k\.a\.?\s.*$", "", x).strip(" .:-*​ ﻿")
        if 1 < len(x) < 40:
            out.append(clean(x))
    return list(dict.fromkeys(out))


def plain(body_html):
    """HTML → teks; tag blok jadi baris baru, tag inline dibuang (biar 'C<span>oconut</span>' tetap 'Coconut')."""
    t = re.sub(r"(?i)<\s*(br|/p|/li|/div|/h\d|p|li|div)[^>]*>", "\n", body_html or "")
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    return re.sub(r"[ \t ]+", " ", t)


def pyramid(t):
    """Cari Top/Middle/Base (atau Heart/Bottom/Dry Down) di teks; balik {top, middle, base} atau None."""
    lab = r"(top|middle|heart|base|bottom|dry\s*down)(?:\s*notes?)?"
    parts = {}
    ms = list(re.finditer(rf"(?im)^\s*[-•*]?\s*{lab}\s*[:|]?[ \t|:]*", t))
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(t)
        # Notes cuma satu baris (kadang baru mulai di baris berikutnya: "Top Notes: |\nPear, ...").
        lines = [l for l in t[m.end():end].split("\n") if l.strip(" |:\t﻿")]
        chunk = lines[0] if lines else ""
        if re.match(r"(?i)\s*﻿?\s*(no\.?\s*)?bpom", chunk):
            continue
        k = {"heart": "middle", "bottom": "base"}.get(m.group(1).lower(), m.group(1).lower())
        k = "base" if k.startswith("dry") else k
        vals = notes_list(chunk.replace("&", ","))
        if vals and k not in parts:
            parts[k] = vals
    return parts if len(parts) == 3 else None


def save_img(url, pid, cover=False):
    dest = os.path.join(IMG, pid + ".jpg")
    if os.path.exists(dest):
        return
    from PIL import Image
    raw = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40).read()
    im = Image.open(io.BytesIO(raw))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    im = im.convert("RGB")
    im.thumbnail((700, 700))
    im.save(dest, quality=86)


def add(e, img_url, cover=False):
    if e["id"] in have:
        return
    if cover:
        e["imgFit"] = "cover"  # foto suasana, bukan packshot
    e.update({"family": family(e["notes"]), "rating": 8.0, "ratingSrc": "estimasi", "fragrantica": None, "notesSrc": "resmi"})
    e["longevity"], e["sillage"] = (8, 7) if e["conc"] == "X" else (7, 6) if e["conc"] == "EDP" else (6, 5)
    data.append(e)
    have.add(e["id"])
    added.append(e["id"])
    try:
        save_img(img_url, e["id"])
    except Exception as ex:
        print("   gambar gagal:", e["id"], ex)
    print(f"+ {e['brand']:13} {e['name']:28} {e['conc']:3} {e['size']}ml Rp{e['price']:,} {e['gender']}")


def normal_price(v):
    return round(max(float(v["price"]), float(v.get("compare_at_price") or 0)))


# --- Mykonos (feed situs resmi) ---
MANUAL_MYK = {"matcha latte": {"all": ["Matcha", "White Chocolate", "Floral Notes"]}}
for p in json.load(open(os.path.join(HERE, "feeds", "officialmykonos.com.json"), encoding="utf-8"))["products"]:
    t = p["title"]
    if re.search(r"(?i)travel|discovery|bundle|set|mini|decant|body|mist|hair|candle|gift|hamper|lotion|wash|sampler|kit|tester", t):
        continue
    name = re.sub(r"^Mykonos\s*(x\s*\S+)?\s*[-–]\s*|\s*(Extrait de Parfum|EDP|Eau de Parfum).*$", "", t, flags=re.I).strip()
    pid = "mykonos-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    notes = pyramid(plain(p["body_html"])) or MANUAL_MYK.get(name.lower())
    if not notes:
        continue
    v = min(p["variants"], key=lambda v: float(v["price"]))
    sz = re.search(r"(\d+)\s*ml", v["title"], re.I) or re.search(r"(\d+)\s*ml", t, re.I)
    conc = "EDP" if re.search(r"\bEDP\b", t) and "Extrait" not in t else "X"
    add({"id": pid, "name": name, "brand": "Mykonos", "origin": "Lokal", "gender": "Unisex", "conc": conc,
         "size": int(sz.group(1)), "price": normal_price(v), "notes": notes,
         "buy": [{"store": "Toko resmi Mykonos", "url": f"https://officialmykonos.com/products/{p['handle']}", "kind": "site"}]},
        p["images"][0]["src"] + "&width=800" if p["images"] else "")

# --- Carl & Claire (feed situs resmi; ukuran utama 30 ml) ---
MANUAL_CC = {"mystical mirage": {"all": ["Oud", "Turkish Rose", "Violet", "Vanilla"]}}
cc = json.load(open(os.path.join(HERE, "feeds", "carlandclaire.com.json"), encoding="utf-8"))["products"]
for p in cc:
    t = p["title"]
    if "30ml" not in t.replace(" ", "").lower():
        continue
    name = re.sub(r"^Carl & Claire\s*-?\s*|\s*\(ex\.[^)]*\)|\s*EDP.*$", "", t).strip()
    pid = "cc-" + slug(name)
    notes = pyramid(plain(p["body_html"])) or MANUAL_CC.get(name.lower())
    if not notes:
        print("   tanpa notes:", t)
        continue
    gender = {"FOR HER": "Wanita", "FOR HIM": "Pria"}.get(p["product_type"].strip().upper(), "Wanita" if p["product_type"].strip() == "" else "Unisex")
    e = {"id": pid, "name": name, "brand": "Carl & Claire", "origin": "Lokal", "gender": gender, "conc": "EDP",
         "size": 30, "price": normal_price(p["variants"][0]), "notes": notes,
         "buy": [{"store": "Toko resmi Carl & Claire", "url": f"https://carlandclaire.com/products/{p['handle']}", "kind": "site"}]}
    small = next((q for q in cc if q is not p and name.lower() in q["title"].lower() and "10ml" in q["title"].replace(" ", "").lower()), None)
    if small:
        e["variants"] = [{"size": 10, "price": normal_price(small["variants"][0])}, {"size": 30, "price": e["price"]}]
    # foto pertama Carl & Claire = kartu promo berinfografis, foto kedua = botol di set foto
    add(e, (p["images"][1] if len(p["images"]) > 1 else p["images"][0])["src"] if p["images"] else "", cover=len(p["images"]) > 1)

# --- SAFF & Co. (notes dari Official Store Tokopedia, foto dari situs resmi) ---
saff_feed = json.load(open(os.path.join(HERE, "feeds", "saffnco.com.json"), encoding="utf-8"))["products"]
for u, v in json.load(open(os.path.join(HERE, "tp_saff.json"), encoding="utf-8")).items():
    m = re.search(r"Extrait de Parfum\s*-\s*([^-]+?)\s*-", v["title"] + " -") or re.search(r"extrait-de-parfum-([a-z-]+?)(?:-\d+)?$", u)
    raw = (m.group(1) if m else "").replace("-", " ").strip()
    if not raw:
        continue
    name = raw.upper() if re.fullmatch(r"[A-Z.]+", raw.replace(" ", "")) and "." in raw else raw.title()
    name = {"Sotb": "S.O.T.B", "S.O.T.B": "S.O.T.B", "S.O.F.R": "S.O.F.R"}.get(name, name)
    pid = "saff-" + slug(name).replace("-", "")
    if pid in have or "saff-" + slug(name) in have:
        continue
    desc = v["desc"]
    notes = pyramid(desc.replace("|", ":"))
    if not notes:
        print("   tanpa notes:", name)
        continue
    sz = re.search(r"(?i)size\s*\|?\s*(\d+)", desc)
    g = re.search(r"(?i)gender\s*\|\s*([^\n]+)", desc)
    gt = g.group(1).lower() if g else "unisex"
    gender = "Unisex" if "unisex" in gt else "Wanita" if "woman" in gt or "women" in gt else "Pria" if "man" in gt else "Unisex"
    fp = next((q for q in saff_feed if re.search(rf"(?i)extrait de parfum\s+{re.escape(raw)}\s*$", q["title"].strip())), None)
    img = fp["images"][0]["src"] if fp and fp["images"] else (v["images"][0] if v["images"] else "")
    add({"id": pid, "name": name, "brand": "SAFF & Co.", "origin": "Lokal", "gender": gender, "conc": "X",
         "size": int(sz.group(1)) if sz else 30, "price": v["price"], "notes": notes,
         "buy": [{"store": "Tokopedia · SAFF & Co.", "url": u, "kind": "official"}]}, img)

# --- Kahf (Official Store Tokopedia) ---
KAHF = {  # judul (potongan) -> (nama, conc, ukuran, notes manual kalau di halaman nggak lengkap)
    "Saffron Oud Eau de Parfum": ("Saffron Oud", "EDP", 100, None),
    "Eau de Toilette Revered Oud": ("Revered Oud EDT", "EDT", 35, None),
    "Eau de Toilette Humbling Forest": ("Humbling Forest EDT", "EDT", 35, None),
    "Eau de Toilette Invigorating Waterfall": ("Invigorating Waterfall EDT", "EDT", 35, None),
    "Eau de Toilette True Brotherhood": ("True Brotherhood EDT", "EDT", 35, {"all": ["Cinnamon", "Tonka Bean", "Lavender", "Citrus", "Incense"]}),
    "Humbling Forest Eau de Parfum": ("Humbling Forest", "EDP", 100, {"top": ["Cypress", "Rosemary", "Grapefruit"], "middle": ["Cedar", "Guaiac Wood", "Jasmine"], "base": ["Patchouli", "Sandalwood", "Musk"]}),
    "Invigorating Waterfall Eau de Parfum": ("Invigorating Waterfall", "EDP", 100, {"top": ["Sea Notes", "Lemon"], "middle": ["Cedar", "Violet", "Floral Notes"], "base": ["Amber", "Patchouli", "Vetiver", "Musk"]}),
    "Mineralwave": ("Mineralwave", "X", 50, None),
    "Spicestone": ("Spicestone", "X", 50, {"all": ["Cinnamon", "Vanilla", "Tonka Bean", "Lavender", "Patchouli"]}),
    "Ambremusc": ("Ambremusc", "X", 50, {"all": ["Black Tea", "Bergamot", "Amberwood", "Musk"]}),
}
EXTRAIT_50ML = 448750  # harga normal 50 ml extrait di Official Store Kahf (Nov 2026)
for u, v in json.load(open(os.path.join(HERE, "tp_kahf.json"), encoding="utf-8")).items():
    hit = next((k for k in KAHF if k.lower() in v["title"].lower()), None)
    if not hit:
        continue
    name, conc, size, manual = KAHF[hit]
    notes = manual or pyramid(v["desc"])
    if not notes:
        print("   tanpa notes:", name)
        continue
    price = EXTRAIT_50ML if conc == "X" else v["price"]
    add({"id": "kahf-" + slug(name), "name": name, "brand": "Kahf", "origin": "Lokal", "gender": "Pria", "conc": conc,
         "size": size, "price": price, "notes": notes, "buy": [{"store": "Tokopedia · Kahf Official", "url": u, "kind": "official"}]},
        v["images"][0] if v["images"] else "", cover=True)

# Kahf Revered Oud EDP: harga normal Official Store (sebelumnya harga diskon Watsons yang dihitung balik).
for p in data:
    if p["id"] == "kahf-revered-oud":
        p["price"] = 391500
        p["gender"] = "Pria"

with open(DATA, "w", encoding="utf-8") as f:
    f.write(head + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
print(len(added), "parfum baru; total", len(data))
