"""Ambil rating Fragrantica (bintang × 2 + jumlah vote) buat parfum di data.js, pelan-pelan biar nggak diblok.

python -I tools/fr_ratings.py ids      -> cari ID Fragrantica dari halaman merek (DESIGNERS) & tulis ke fr_ids.json
python -I tools/fr_ratings.py fetch    -> unduh halaman parfum (cache di tools/cache_fr/), 1 halaman / DELAY detik
python -I tools/fr_ratings.py apply    -> tulis rating ke data.js (ratingSrc "fragrantica", votes)

Berhenti otomatis kalau server balas selain 200 (mis. 429/403). Halaman yang sudah di-cache nggak diunduh ulang.
"""
import json, os, re, sys, time, urllib.error, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data.js")
CACHE = os.path.join(HERE, "cache_fr")
IDS = os.path.join(HERE, "fr_ids.json")
DELAY = int(os.environ.get("FR_DELAY", "10"))  # detik antar halaman; naikin kalau kena 429
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
DESIGNERS = {  # merek kita -> halaman merek di Fragrantica
    "Project 1945": "Project-1945", "Mykonos": "Mykonos", "HMNS": "HMNS", "Alchemist": "Alchemist",
}
os.makedirs(CACHE, exist_ok=True)
sys.stdout.reconfigure(encoding="utf-8")


class Blocked(Exception):
    pass


def fetch(url, fn):
    path = os.path.join(CACHE, fn)
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    time.sleep(DELAY)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    try:
        s = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        raise Blocked(f"{e.code} {url}")
    open(path, "w", encoding="utf-8").write(s)
    return s


def load_data():
    text = open(DATA, encoding="utf-8").read()
    head, body = text.split("const PERFUMES = ", 1)
    return head, json.loads(body.rstrip().rstrip(";"))


def key(s):
    return " ".join(re.sub(r"[^a-z0-9]+", " ", s.lower()).split())


def cmd_ids():
    _, data = load_data()
    found = json.load(open(IDS, encoding="utf-8")) if os.path.exists(IDS) else {}
    for brand, page in DESIGNERS.items():
        try:
            s = fetch(f"https://www.fragrantica.com/designers/{page}.html", f"designer-{page}.html")
        except Blocked as e:
            print("STOP:", e)
            break
        links = dict()  # nama -> id
        for href, fid in re.findall(r'href="(/perfume/[^"]+-(\d+)\.html)"', s):
            name = href.split("/")[3].rsplit("-", 1)[0].replace("-", " ")
            links.setdefault(key(name), fid)
        print(f"{brand}: {len(links)} parfum di halaman merek")
        for p in data:
            if p["brand"] != brand or p.get("fragrantica"):
                continue
            k = key(re.sub(r"\(.*?\)", "", p["name"]))
            fid = links.get(k) or next((v for n, v in links.items() if n.startswith(k + " ") or n == k), None)
            if fid:
                found[p["id"]] = fid
                print(f"  {p['name']:30} -> {fid}")
            else:
                print(f"  {p['name']:30} -> (nggak ketemu)")
    json.dump(found, open(IDS, "w", encoding="utf-8"), indent=1)


def targets():
    _, data = load_data()
    ids = json.load(open(IDS, encoding="utf-8")) if os.path.exists(IDS) else {}
    for p in data:
        fid = p.get("fragrantica") or ids.get(p["id"])
        if fid and p.get("ratingSrc") != "fragrantica":
            yield p, fid


def cmd_fetch():
    todo = list(targets())
    print(len(todo), "halaman")
    for i, (p, fid) in enumerate(todo, 1):
        try:
            fetch(f"https://www.fragrantica.com/perfume/x/x-{fid}.html", f"{fid}.html")
            print(f"[{i}/{len(todo)}] ok {p['id']}")
        except Blocked as e:
            print("STOP:", e)
            break


def parse(fid):
    path = os.path.join(CACHE, f"{fid}.html")
    if not os.path.exists(path):
        return None
    s = open(path, encoding="utf-8").read()
    rv = re.search(r'itemprop="ratingValue"[^>]*>([\d.]+)', s)
    rc = re.search(r'itemprop="ratingCount"[^>]*>([\d,]+)', s)
    title = re.search(r"<title>([^<]+)", s)
    if not rv:
        return {"title": title.group(1) if title else "?"}
    return {"rating": float(rv.group(1)), "votes": int(rc.group(1).replace(",", "")) if rc else 0,
            "title": title.group(1).strip() if title else "?"}


def cmd_apply(min_votes=10):
    head, data = load_data()
    ids = json.load(open(IDS, encoding="utf-8")) if os.path.exists(IDS) else {}
    n = 0
    for p in data:
        fid = p.get("fragrantica") or ids.get(p["id"])
        if not fid or p.get("ratingSrc") == "fragrantica":
            continue
        r = parse(fid)
        if not r:
            continue
        print(f"{p['brand']} {p['name']:28} <- {r.get('title', '')[:60]} | {r.get('rating')} ({r.get('votes')})")
        if r.get("rating") and r["votes"] >= min_votes:
            p["fragrantica"] = str(fid)
            p["rating"] = round(r["rating"] * 2, 1)
            p["votes"] = r["votes"]
            p["ratingSrc"] = "fragrantica"
            n += 1
    with open(DATA, "w", encoding="utf-8") as f:
        f.write(head + "const PERFUMES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    print(n, "rating diganti ke Fragrantica")


{"ids": cmd_ids, "fetch": cmd_fetch, "apply": cmd_apply}[sys.argv[1]]()
