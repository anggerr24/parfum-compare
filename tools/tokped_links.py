"""Link Tokopedia langsung ke halaman produk di toko resmi merek lokal (bukan hasil pencarian).

python -I tools/tokped_links.py          -> unduh daftar produk toko (cache di tools/cache_tp/), cocokkan, tulis ke data.js

Field yang ditulis: p.buy = [{"store": "Tokopedia · <toko>", "url": ..., "kind": "official"|"marketplace"}]
"official" = toko berlabel Official Store, "marketplace" = toko atas nama brand tanpa label Official Store.
"""
import json, os, re, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data.js")
CACHE = os.path.join(HERE, "cache_tp")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
SHOPS = {  # merek -> (domain toko Tokopedia, nama toko, kind)
    "HMNS": ("hmnsperfume", "HMNS Perfume", "official"),
    "Mykonos": ("mykonos", "Mykonos", "official"),
    "Alchemist": ("alchemistfragrance", "Alchemist Fragrance", "official"),
    "SAFF & Co.": ("saffnco", "SAFF & Co.", "official"),
    "Kahf": ("kahfofficial", "Kahf Official", "official"),
    "Oaken Lab": ("oakenlab", "Oaken Lab", "marketplace"),
    "Project 1945": ("project1945", "PROJECT 1945", "marketplace"),
    "Carl & Claire": ("carlclaire", "Carl & Claire", "marketplace"),
}
# Kata di slug yang nandain bukan botol parfum utama (dicek per kata, bukan potongan kata: "alchemist" ≠ "mist").
SKIP = re.compile(r"(?:^|-)(travel|decant|mini|discovery|bundle|paket|hampers|gift|set|body|hair|mist|lotion|wash|deodorant|soap|sabun|refill|sample|tester|candle|reed|diffuser|gwp|vial|5ml|10ml|15ml|exploration|kit)(?:-|$)")
os.makedirs(CACHE, exist_ok=True)
sys.stdout.reconfigure(encoding="utf-8")


def get(url, fn):
    """Halaman < 60 KB = halaman blokir sementara dari Tokopedia: coba lagi, dan jangan disimpan ke cache."""
    path = os.path.join(CACHE, fn)
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    for attempt in range(4):
        time.sleep(3 + attempt * 8)
        s = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40).read().decode("utf-8", "replace")
        if len(s) > 60000:
            open(path, "w", encoding="utf-8").write(s)
            return s
    print("   (keblok, dilewati)", url)
    return ""


def shop_products(domain):
    urls = []
    for page in range(1, 9):
        s = get(f"https://www.tokopedia.com/{domain}/product/page/{page}", f"{domain}-{page}.html")
        found = [u for u in re.findall(rf"https://www\.tokopedia\.com/{re.escape(domain)}/[a-z0-9-]+", s)
                 if not re.search(r"/(info|review|product|etalase|sold|note)$", u)]
        new = [u for u in dict.fromkeys(found) if u not in urls]
        if not new:
            break
        urls += new
    return urls


def words(s):
    s = s.lower().replace("&", " ").replace("é", "e").replace("ô", "o")
    s = re.sub(r"\(.*?\)", " ", s)
    return [w for w in re.split(r"[^a-z0-9]+", s) if w]


text = open(DATA, encoding="utf-8").read()
head, body = text.split("const PERFUMES = ", 1)
data = json.loads(body.rstrip().rstrip(";"))
done = 0
for brand, (domain, shop, kind) in SHOPS.items():
    urls = shop_products(domain)
    print(f"{brand}: {len(urls)} produk di toko {domain}")
    for p in data:
        if p["brand"] != brand:
            continue
        name = [w for w in words(p["name"]) if w not in ("x", "chicco", "jerikho", "edp", "edt")]
        cands = []
        brand_words = set(words(brand)) | {"fragrance", "perfume", "parfum", "official"}
        for u in urls:
            slug = u.rsplit("/", 1)[1]
            # buang nama merek di depan slug ("saff-co-extrait-...") biar parfum "Saff" nggak cocok ke semua produk
            parts = slug.split("-")
            while parts and parts[0] in brand_words:
                parts.pop(0)
            slug = "-".join(parts)
            if SKIP.search(slug):
                continue
            sw = slug.split("-")
            # semua kata nama harus ada berurutan di slug
            joined = "-".join(name)
            if joined and f"-{joined}-" in f"-{slug}-":
                score = (f"{p['size']}ml" in slug or f"{p['size']}-ml" in slug) * 2 + (len(sw) < 14)
                cands.append((score, -len(slug), u))
        if cands:
            url = max(cands)[2]
            old = next((b for b in p.get("buy", []) if "tokopedia.com" in b["url"]), None)
            p["buy"] = [b for b in p.get("buy", []) if "tokopedia.com" not in b["url"]] + [{"store": f"Tokopedia · {shop}", "url": url, "kind": kind}]
            done += 1
            print(f"   {p['name']:30} -> {url.rsplit('/', 1)[1][:70]}{'' if not old or old['url'] == url else '  (ganti)'}")
        else:
            print(f"   {p['name']:30} -> (nggak ketemu)")

with open(DATA, "w", encoding="utf-8") as f:
    f.write(head + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
print(done, "parfum dapat link Tokopedia langsung")
