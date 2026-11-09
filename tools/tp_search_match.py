"""Cocokkan hasil pencarian Tokopedia (Official Store) ke parfum di data.js -> link langsung ke produk.

python -I tools/tp_search_match.py --miss                      -> tools/tp_miss.json: parfum yang belum punya link langsung
python -I tools/tp_search_match.py <tp_search.json>            -> laporan (nggak nulis apa-apa)
python -I tools/tp_search_match.py <tp_search.json> --write    -> tulis ke data.js

tp_search.json dibuat tools/tp_search.mjs (dijalankan lewat ego-browser, karena pencarian Tokopedia dirender JavaScript).
Aturan ketat: cuma toko berbadge Official Store, semua kata nama parfum ada di judul, konsentrasi & gender cocok,
nggak ada kata varian lain (Elixir, Intense, Parfum, ...), bukan tester/decant/set, dan harganya masuk akal.
"""
import json, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data.js")
sys.stdout.reconfigure(encoding="utf-8")

BRAND_ALIAS = {
    "Yves Saint Laurent": ["ysl", "yves saint laurent", "saint laurent"], "Giorgio Armani": ["armani"],
    "Rabanne": ["rabanne"], "Hugo Boss": ["boss"], "Maison Francis Kurkdjian": ["kurkdjian", "mfk"],
    "Jo Malone London": ["jo malone"], "Carolina Herrera": ["carolina herrera", "ch"], "Calvin Klein": ["calvin klein", "ck"],
    "Jean Paul Gaultier": ["gaultier", "jpg"], "Dolce & Gabbana": ["dolce", "d g", "dg"], "Parfums de Marly": ["marly", "pdm"],
    "Victoria's Secret": ["victoria s secret", "victorias secret"], "Maison Margiela": ["margiela", "replica"],
    "Lancôme": ["lancome"], "Tom Ford": ["tom ford"], "Le Labo": ["le labo"], "Ariana Grande": ["ariana grande"],
    "Carl & Claire": ["carl claire", "carl and claire"], "SAFF & Co.": ["saff"], "Project 1945": ["project 1945"],
    "Studio Sable": ["studio sable"], "Montblanc": ["montblanc", "mont blanc"],
}
# kata yang nandain produk lain / bukan botol utama
JUNK = {"tester", "decant", "decants", "mini", "miniature", "travel", "set", "gift", "giftset", "refill", "deodorant", "deo",
        "body", "lotion", "shower", "gel", "vial", "sample", "bundle", "paket", "hampers", "split", "inspired", "dupe",
        "bibit", "kw", "searah", "isi", "series", "variant", "variants", "replika", "aroma", "candle", "coffret", "discovery", "pouch", "hair", "mist", "soap", "share"}
FLANK = {"elixir", "intense", "intensely", "extreme", "absolu", "absolue", "absolute", "fraiche", "sport", "night", "noir",
         "nuit", "prive", "privee", "gold", "platinum", "royal", "aqua", "acqua", "victory", "legend", "edition", "limited",
         "summer", "collector", "eau", "parfum", "profumo", "extrait", "cologne", "flame", "pure", "elixirs", "le", "la",
         "black", "blue", "red", "rouge", "pink", "white", "rose", "oud", "power", "glow", "fresh", "fever", "tendre",
         "blooming", "bouquet", "infinite", "magnetic", "elysium", "silver", "leather", "vip", "on", "fire", "absolutely",
         "candy", "crystal", "bright", "imperial", "eros", "him", "her", "homme", "femme", "men", "man", "women", "woman",
         "pria", "wanita", "unisex", "and", "club", "de", "nuit", "untold", "carbon", "rossa", "luna", "qahwa", "hawas"}
SAFE = {"original", "ori", "authentic", "spray", "for", "pour", "new", "ml", "edt", "edp", "edc", "the", "by", "official",
        "christian", "giorgio", "yves", "saint", "laurent", "ysl", "unisex", "bpom", "segel", "sealed", "vapo", "vaporisateur"}
GENERIC = {"original", "ori", "100", "parfum", "perfume", "parfume", "eau", "de", "toilette", "edt", "edp", "edc", "ml",
           "for", "pour", "the", "official", "store", "spray", "new", "authentic", "100ml", "50ml", "original100",
           "fragrance", "fragrances", "by", "x"}
FEM = {"femme", "women", "woman", "her", "wanita", "donna", "lady", "female"}
MASC = {"homme", "men", "man", "him", "pria", "uomo", "male"}


def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"\bno\.?\s?5\b", "no5", s)
    s = s.replace("n°5", "no5").replace("n5", "no5").replace("&", " ").replace("'", "").replace("’", "")
    return re.sub(r"[^a-z0-9]+", " ", s).split()


def money(s):
    m = re.fullmatch(r"Rp\s?([\d.]+)", s.strip())
    return int(m.group(1).replace(".", "")) if m else None


def conc_of(words, text):
    t = " ".join(words)
    if re.search(r"\b(edt|eau de toilette|toilette)\b", t):
        return "EDT"
    if re.search(r"\b(edc|cologne)\b", t):
        return "EDC"
    if re.search(r"\b(extrait|elixir)\b", t):
        return "X"
    if re.search(r"\b(edp|eau de parfum)\b", t):
        return "EDP"
    return None


def match(p, cards):
    name_w = [w for w in norm(re.sub(r"\(.*?\)", " ", p["name"])) if w not in ("edt", "edp", "edc")]
    brand_opts = [a.split() for a in BRAND_ALIAS.get(p["brand"], [])] + [norm(p["brand"])]
    out = []
    for c in cards:
        if not c.get("os"):
            continue
        texts = c["text"]
        title = next((t for t in texts if len(t) > 12 and not t.startswith("Rp") and not t.endswith("%")), "")
        tw = norm(title)
        shop = norm(c["url"].split("/")[3])
        tset = set(tw)
        if tset & JUNK or "+" in title or "/" in title:
            continue
        if not any(all(b in tset for b in opt) or "".join(opt) in "".join(shop) for opt in brand_opts):
            continue
        # nama parfum: semua kata ada, berurutan
        js = " ".join(tw)
        if " ".join(name_w) not in js:
            continue
        # selain nama, merek, konsentrasi, ukuran, gender: cuma kata "aman" yang boleh ada di judul.
        # Jadi "Libre Berry Crush", "Code Parfum", "Eau Sauvage", "Sauvage Elixir" ketolak.
        brand_words = {w for opt in brand_opts for w in opt} | set(norm(p["brand"]))
        rest = re.sub(r"\b(eau de (parfum|toilette|cologne)|extrait de parfum|parfum (pria|wanita|unisex|original))\b", " ", js)
        rest = re.sub(r"^\s*(parfum|perfume|parfume)\b", " ", rest)
        if p.get("conc") == "X":
            rest = re.sub(r"\b(extrait|parfum)\b", " ", rest)
        extra = [w for w in rest.split() if w not in name_w and w not in brand_words and w not in SAFE
                 and not re.fullmatch(r"\d+(ml)?", w)]
        if [w for w in extra if w not in FEM | MASC]:
            continue
        g = set(extra)
        if p["gender"] == "Pria" and g & FEM or p["gender"] == "Wanita" and g & MASC:
            continue
        cc = conc_of(tw, title)
        want = p.get("conc")
        if want in ("EDT", "EDP", "EDC") and cc != want or want == "X" and cc not in ("X", None):
            continue  # konsentrasi harus tertulis & sama (Sauvage EDT ≠ EDP)
        prices = [money(t) for t in texts if money(t)]
        normal = max(prices) if prices else None
        if normal and not (0.5 * p["price"] <= normal <= 3.2 * p["price"]):
            continue
        sizes = [int(x) for x in re.findall(r"(\d{2,3})\s?ml", title.lower())]
        if sizes and p["size"] not in sizes:
            continue  # listing ukuran lain (mis. 200 ml) -> harga di halaman beda sama yang kita tampilkan
        score = (3 if sizes else 0) + (2 if cc == want else 0)
        score += 2 if any("".join(opt) in "".join(shop) for opt in brand_opts) else 0  # toko milik brand-nya sendiri
        shopname = texts[-2] if len(texts) >= 2 else c["url"].split("/")[3]
        out.append((score, -len(tw), c["url"], title, shopname, normal, sizes))
    return max(out) if out else None


def main():
    res = json.load(open(sys.argv[1], encoding="utf-8"))
    text = open(DATA, encoding="utf-8").read()
    head, body = text.split("const PERFUMES = ", 1)
    data = json.loads(body.rstrip().rstrip(";"))
    n = 0
    for p in data:
        r = res.get(p["id"])
        if not r or any("tokopedia.com" in b["url"] for b in p.get("buy", [])):
            continue
        m = match(p, r["cards"])
        if not m:
            print(f"  -- {p['id']:30} (nggak ada yang cocok)")
            continue
        score, _, url, title, shop, normal, sizes = m
        n += 1
        size_note = "" if not sizes or p["size"] in sizes else f"  [ukuran listing {sizes} ml, data {p['size']} ml]"
        print(f"  ok {p['id']:30} {shop[:24]:24} {title[:60]:60} {normal}{size_note}")
        if "--write" in sys.argv:
            p["buy"] = p.get("buy", []) + [{"store": f"Tokopedia · {shop}", "url": url, "kind": "official"}]
    print(n, "parfum dapat link Official Store")
    if "--write" in sys.argv:
        with open(DATA, "w", encoding="utf-8") as f:
            f.write(head + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")


def write_miss():
    """Daftar parfum yang belum punya link Tokopedia langsung -> tools/tp_miss.json (input tp_search.mjs)."""
    text = open(DATA, encoding="utf-8").read()
    data = json.loads(text.split("const PERFUMES = ", 1)[1].rstrip().rstrip(";"))
    miss = [{k: p.get(k) for k in ("id", "brand", "name", "conc", "size", "price", "gender")}
            for p in data if not any("tokopedia.com" in b["url"] for b in p.get("buy", []))]
    json.dump(miss, open(os.path.join(HERE, "tp_miss.json"), "w", encoding="utf-8"), ensure_ascii=False)
    print(len(miss), "parfum -> tools/tp_miss.json")


write_miss() if sys.argv[1] == "--miss" else main()
