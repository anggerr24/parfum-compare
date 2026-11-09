"""Ambil rating Female Daily per merek (halaman kategori ?brand=<slug>), cache ke fdcache/.

python -I fd.py <scratch_dir> <brand_slug> [<brand_slug> ...]
Output: fd.json (gabungan, di-merge dengan isi sebelumnya).
"""
import json, os, re, sys, time, urllib.request

SCR = sys.argv[1]
sys.stdout.reconfigure(encoding="utf-8")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
CATS = ["edp", "edt"]
CACHE = os.path.join(SCR, "fdcache")
os.makedirs(CACHE, exist_ok=True)

ITEM = re.compile(
    r'"slug":"([^"]+)","description":.{0,4000}?"brand":\{[^{}]*?"name":"([^"]+)","slug":"([^"]+)"'
    r'.{0,3000}?"rating":\{"rating_overall":([\d.]+).{0,400}?"product":\{"name":"([^"]*)"\},"total_review":(\d+)'
    r'.{0,300}?"recommended_percentage":(\d+|null)', re.S)


def get(url):
    fn = os.path.join(CACHE, re.sub(r"[^a-z0-9]+", "_", url.lower())[-150:] + ".html")
    if os.path.exists(fn):
        return open(fn, encoding="utf-8").read()
    time.sleep(1.5)
    try:
        s = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40).read().decode("utf-8", "replace")
    except Exception as e:
        print("  !", url, e)
        return ""
    open(fn, "w", encoding="utf-8").write(s)
    return s


out_fn = os.path.join(SCR, "fd.json")
found = json.load(open(out_fn, encoding="utf-8")) if os.path.exists(out_fn) else {}
for brand in sys.argv[2:]:
    n0 = len(found)
    for cat in CATS:
        for page in range(1, 8):
            url = f"https://reviews.femaledaily.com/products/fragrance/{cat}?brand={brand}" + (f"&page={page}" if page > 1 else "")
            s = get(url)
            new = 0
            for slug, bname, bslug, rating, pname, total, rec in ITEM.findall(s):
                if bslug != brand:
                    continue
                key = f"{cat}/{bslug}/{slug}"
                if key not in found:
                    new += 1
                found[key] = {"brand": bname, "name": pname, "rating": float(rating), "reviews": int(total),
                              "recommend": None if rec == "null" else int(rec),
                              "url": f"https://reviews.femaledaily.com/products/fragrance/{cat}/{bslug}/{slug}"}
            if not new:
                break
    print(f"{brand}: +{len(found) - n0}")
json.dump(found, open(out_fn, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
