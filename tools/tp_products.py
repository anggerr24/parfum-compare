"""Ambil deskripsi + harga + foto halaman produk di toko Tokopedia (buat merek yang notes-nya cuma ada di Tokopedia).

python -I tools/tp_products.py <domain_toko> <pola_slug_regex> <out.json>
Contoh: python -I tools/tp_products.py saffnco "extrait-de-parfum" tools/tp_saff.json

Pakai daftar produk dari tools/cache_tp/<domain>-N.html (diisi tokped_links.py), halaman produk di-cache di tools/cache_tp/prod/.
"""
import glob, json, os, re, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache_tp", "prod")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
STR = r'"((?:[^"\\]|\\.)*)"'
os.makedirs(CACHE, exist_ok=True)
sys.stdout.reconfigure(encoding="utf-8")
domain, pattern, out = sys.argv[1:4]
SKIP = re.compile(r"(?:^|-)(travel|decant|mini|discovery|bundle|paket|hampers|gift|set|body|hair|mist|lotion|wash|deo|deodorant|potion|dew|soap|refill|sample|tester|candle|reed|diffuser|gwp|vial|5ml|exploration|kit|merch)(?:-|$)")


def jstr(raw):
    try:
        return json.loads('"%s"' % raw)
    except Exception:
        return raw


def get(url, fn):
    path = os.path.join(CACHE, fn)
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    for attempt in range(4):
        time.sleep(3 + attempt * 8)
        s = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40).read().decode("utf-8", "replace")
        if len(s) > 60000:
            open(path, "w", encoding="utf-8").write(s)
            return s
    print("   (keblok)", url)
    return ""


urls = []
for f in sorted(glob.glob(os.path.join(HERE, "cache_tp", f"{domain}-*.html"))):
    for u in re.findall(rf"https://www\.tokopedia\.com/{re.escape(domain)}/[a-z0-9-]+", open(f, encoding="utf-8").read()):
        slug = u.rsplit("/", 1)[1]
        if re.search(pattern, slug) and not SKIP.search(slug) and u not in urls:
            urls.append(u)
print(len(urls), "produk cocok pola")

result = {}
for u in urls:
    slug = u.rsplit("/", 1)[1]
    s = get(u, slug[:120] + ".html")
    if not s:
        continue
    title = re.search(r'"productName":' + STR, s)
    desc = max((jstr(m.group(1)) for m in re.finditer(r'"(?:description|content)":' + STR, s)), key=lambda t: ("notes" in t.lower(), len(t)), default="")
    price = re.search(r'"originalPrice":(\d{4,})', s) or re.search(r'"price":(\d{4,})', s)
    imgs = []
    for m in re.findall(r'"(?:urlOriginal|URLMaxRes)":"(https:[^"]+)"', s):
        im = jstr(m)
        if im.split("~")[0] not in [x.split("~")[0] for x in imgs]:
            imgs.append(im)
    result[u] = {"title": jstr(title.group(1)) if title else slug, "price": int(price.group(1)) if price else None,
                 "desc": desc, "images": imgs[:6]}
    print("-", result[u]["title"][:70], "|", result[u]["price"])
json.dump(result, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
