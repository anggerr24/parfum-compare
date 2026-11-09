"""Bangun data.js dari master.tsv + halaman Fragrantica.

python -I build.py <master.tsv> <cache_dir> <img_dir> <out_data_js>
"""
import html, json, os, re, sys, time, urllib.error, urllib.request

MASTER, CACHE, IMG, OUT = sys.argv[1:5]
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
os.makedirs(CACHE, exist_ok=True)
os.makedirs(IMG, exist_ok=True)

RENAME = {
    "cedarwood": "Cedar", "virginia cedar": "Cedar", "atlas cedar": "Cedar", "tonka bean": "Tonka",
    "woodsy notes": "Woody Notes", "vanille": "Vanilla", "vanilla bean": "Vanilla", "madagascar vanilla": "Vanilla",
    "orris": "Iris", "orris root": "Iris", "agarwood (oud)": "Oud", "agarwood": "Oud",
    "ylang ylang": "Ylang-Ylang", "ylang-ylang": "Ylang-Ylang", "lily-of-the-valley": "Lily of the Valley",
    "mandarin orange": "Mandarin", "violet leaves": "Violet Leaf", "citrus": "Citruses",
    "black currant": "Blackcurrant", "cassis": "Blackcurrant", "sea notes": "Sea Notes",
    "ambergris": "Ambergris", "white musk": "White Musk", "elemi resin": "Elemi", "cacao pod": "Cacao",
    "indonesian patchouli leaf": "Patchouli", "haitian vetiver": "Vetiver", "calabrian bergamot": "Bergamot",
    "bulgarian rose": "Rose", "turkish rose": "Rose", "damask rose": "Rose", "may rose": "Rose",
    "jasmine sambac": "Jasmine", "pink pepper": "Pink Pepper", "sichuan pepper": "Sichuan Pepper",
}

FAMILY_KEYS = {
    "Gourmand": "vanilla praline caramel chocolate cacao coffee tonka honey sugar cream coconut almond maltol cookie milk marshmallow candy toffee chestnut rum pistachio dates gourmand",
    "Floral": "blossom flowers rose jasmine tuberose peony iris lily gardenia orange blossom ylang freesia violet magnolia neroli heliotrope mimosa narcissus frangipani plumeria osmanthus lotus orchid white flowers marigold peach blossom floral",
    "Fresh": "lemon bergamot grapefruit mandarin lime yuzu citruses orange sea marine aquatic calone mint green tea cucumber ozonic water salt aldehydes",
    "Woody": "cedar sandalwood vetiver oud guaiac woody birch cypress akigalawood driftwood pine cashmeran oakmoss moss",
    "Oriental": "amber incense myrrh labdanum benzoin spices cinnamon clove saffron cardamom tobacco nutmeg olibanum balsam resin opoponax",
    "Leather": "leather suede",
    "Aromatic": "lavender sage rosemary geranium juniper artemisia thyme basil fougere tarragon",
    "Fruity": "apple pear pineapple blackcurrant peach berries raspberry cherry plum lychee fruity strawberry fig melon mango",
    "Musky": "musk ambrette ambrettolide powdery",
}


def fetch(url, dest, binary=False):
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.fragrantica.com/"})
    for attempt in range(12):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
            break
        except urllib.error.HTTPError as e:
            if e.code != 429:
                print("  ! gagal", url, e, file=sys.stderr, flush=True)
                return False
            wait = 600
            print(f"  .. 429, tunggu {wait}s", file=sys.stderr, flush=True)
            time.sleep(wait)
        except Exception as e:  # noqa: BLE001
            print("  ! gagal", url, e, file=sys.stderr, flush=True)
            return False
    else:
        return False
    open(dest, "wb").write(data)
    time.sleep(8 if "fragrantica.com" in url else 0.5)
    return True


def clean(n):
    n = html.unescape(n).replace("®", "").replace("™", "").strip(" .")
    n = re.sub(r"\s+", " ", n)
    return RENAME.get(n.lower(), n[:1].upper() + n[1:])


def split(s):
    return [clean(x) for x in re.split(r",\s*|\s+and\s+", s) if x.strip()]


def family(notes):
    weights = {"top": 0.7, "middle": 1.0, "base": 1.0, "all": 1.0}
    score = {f: 0.0 for f in FAMILY_KEYS}
    for layer, ns in notes.items():
        for n in ns:
            words = set(re.findall(r"[a-z]+", n.lower()))
            for f, keys in FAMILY_KEYS.items():
                if words & set(keys.split()):
                    score[f] += weights[layer]
    return max(score, key=lambda f: score[f]) if any(score.values()) else "Aromatic"


def parse(path):
    t = open(path, encoding="utf-8", errors="replace").read()
    title = html.unescape(re.search(r"<title>([^<]*)", t).group(1))
    gender = "Unisex" if "women and men" in title else "Wanita" if "for women" in title else "Pria" if "for men" in title else "Unisex"
    r = re.search(r'itemprop="ratingValue"[^>]*>([\d.]+)', t)
    c = re.search(r'itemprop="ratingCount" content="(\d+)"', t)
    m = re.search(r"Top notes? (?:is|are) (.*?); middle notes? (?:is|are) (.*?); base notes? (?:is|are) (.*?)\.\s", t)
    if m:
        notes = {"top": split(m.group(1)), "middle": split(m.group(2)), "base": split(m.group(3))}
    else:
        f = re.search(r"\bfeatures ([A-Z][^.<]*?)\.\s", t)
        notes = {"all": split(f.group(1))} if f else None
    return title, gender, float(r.group(1)) if r else None, int(c.group(1)) if c else 0, notes


out, skipped = [], []
for line in open(MASTER, encoding="utf-8"):
    if not line.strip() or line.startswith("#"):
        continue
    pid, fid, brand, name, origin, price, size, conc, lon, sil = line.rstrip("\n").split("\t")
    if not fid.isdigit():
        skipped.append((pid, "tanpa id Fragrantica"))
        continue
    page = os.path.join(CACHE, f"{fid}.html")
    if not fetch(f"https://www.fragrantica.com/perfume/x/x-{fid}.html", page):
        skipped.append((pid, "halaman gagal"))
        continue
    title, gender, rating, votes, notes = parse(page)
    if not notes or rating is None:
        skipped.append((pid, f"notes/rating kosong ({title})"))
        continue
    fetch(f"https://fimgs.net/mdimg/perfume/375x500.{fid}.jpg", os.path.join(IMG, f"{pid}.jpg"), binary=True)
    out.append({
        "id": pid, "name": name, "brand": brand, "origin": origin, "gender": gender,
        "family": family(notes), "conc": conc, "size": int(size), "price": int(price),
        "longevity": int(lon), "sillage": int(sil), "rating": round(rating * 2, 1), "votes": votes,
        "fragrantica": fid, "notes": notes,
    })
    print(f"ok {pid:32} {gender:7} {out[-1]['family']:9} {rating} ({votes})", flush=True)

header = """// File ini DIBUAT OTOMATIS oleh build.py dari master.tsv — edit master.tsv lalu jalankan ulang.
// notes, gender & rating: Fragrantica (rating bintang 1–5 × 2), diambil Okt 2026.
// family: ditebak otomatis dari notes. longevity & sillage: estimasi (berdasarkan konsentrasi).
// harga lokal: toko resmi / retailer Okt 2026. harga impor: perkiraan retail Indonesia.
"""
with open(OUT, "w", encoding="utf-8") as f:
    f.write(header + "const PERFUMES = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print(f"\n{len(out)} parfum ditulis, {len(skipped)} dilewati:")
for s in skipped:
    print("  -", *s)
