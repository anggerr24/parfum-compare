"""Unduh logo/ikon resmi tiap merek (favicon situs resmi) ke img/brands/<slug>.png + contact sheet.

python -I logos.py <img_brands_dir> <sheet.png> [brand ...]
"""
import html, io, json, os, re, sys, urllib.parse, urllib.request
from PIL import Image, ImageDraw

OUT, SHEET = sys.argv[1:3]
ONLY = set(sys.argv[3:])
os.makedirs(OUT, exist_ok=True)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

DOMAINS = {
    "Alchemist": "alchemistfragrance.com", "HMNS": "hmnsperfume.com", "Kahf": "kahfeveryday.com",
    "Mykonos": "officialmykonos.com", "Oaken Lab": "oakenlab.com", "Project 1945": "project1945.id",
    "SAFF & Co.": "saffnco.com", "Studio Sable": "studiosable.com", "Velixir": "velixir.com", "Carl & Claire": "carlandclaire.com",
    "Afnan": "afnan.com", "Ariana Grande": "arianagrandefragrances.com", "Armaf": "armaf.com",
    "Burberry": "burberry.com", "Bvlgari": "bulgari.com", "Byredo": "byredo.com", "Calvin Klein": "calvinklein.com",
    "Carolina Herrera": "carolinaherrera.com", "Chanel": "chanel.com", "Dior": "dior.com",
    "Dolce & Gabbana": "dolcegabbana.com", "Giorgio Armani": "armanibeauty.com", "Givenchy": "givenchy.com",
    "Gucci": "gucci.com", "Hugo Boss": "hugoboss.com", "Initio": "initioparfums.com",
    "Jean Paul Gaultier": "jeanpaulgaultier.com", "Jo Malone London": "jomalone.com", "Kayali": "kayali.com",
    "Kilian": "bykilian.com", "Lancôme": "lancome.com", "Lattafa": "lattafa.com", "Le Labo": "lelabofragrances.com",
    "Maison Francis Kurkdjian": "franciskurkdjian.com", "Maison Margiela": "maisonmargiela.com",
    "Montblanc": "montblanc.com", "Mugler": "mugler.com", "Nishane": "nishane.com",
    "Parfums de Marly": "parfums-de-marly.com", "Prada": "prada.com", "Rabanne": "rabanne.com",
    "Rasasi": "rasasi.com", "Tom Ford": "tomford.com", "Valentino": "valentino.com", "Versace": "versace.com",
    "Victoria's Secret": "victoriassecret.com", "Yves Saint Laurent": "ysl.com",
}


def slug(b):
    return re.sub(r"[^a-z0-9]+", "-", b.lower().replace("ô", "o")).strip("-")


def get(url, timeout=25):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=timeout).read()


def load_img(raw):
    im = Image.open(io.BytesIO(raw))
    if getattr(im, "n_frames", 1) > 1:  # .ico: ambil frame terbesar
        sizes = sorted(im.info.get("sizes", [im.size]), key=lambda s: s[0])
        if sizes:
            im.size = sizes[-1]
    return im.convert("RGBA")


def candidates(domain):
    """Ikon dari <link> di homepage (apple-touch-icon / icon), lalu layanan favicon Google."""
    out = []
    try:
        page = get(f"https://{domain}/", 20).decode("utf-8", "replace")
        for tag in re.findall(r"<link[^>]+>", page, re.I):
            rel = re.search(r'rel=["\']([^"\']+)', tag, re.I)
            href = re.search(r'href=["\']([^"\']+)', tag, re.I)
            if rel and href and "icon" in rel.group(1).lower():
                sz = re.search(r'sizes=["\'](\d+)', tag)
                out.append((int(sz.group(1)) if sz else (180 if "apple" in rel.group(1).lower() else 32),
                            urllib.parse.urljoin(f"https://{domain}/", html.unescape(href.group(1)))))
    except Exception as e:
        print("   homepage gagal:", domain, type(e).__name__)
    out.sort(key=lambda x: -x[0])
    out.append((256, f"https://www.google.com/s2/favicons?domain={domain}&sz=256"))
    return [u for _, u in out]


report = {}
for brand, domain in DOMAINS.items():
    if ONLY and brand not in ONLY:
        continue
    best = None
    for u in candidates(domain):
        if u.lower().endswith(".svg"):
            continue
        try:
            im = load_img(get(u))
        except Exception:
            continue
        if best is None or im.size[0] > best[0].size[0]:
            best = (im, u)
        if im.size[0] >= 120:
            break
    if not best:
        print("XX", brand)
        continue
    im, u = best
    im.thumbnail((256, 256))
    im.save(os.path.join(OUT, slug(brand) + ".png"))
    report[brand] = {"src": u, "size": im.size}
    print(f"{brand:26} {im.size} {u[:90]}")

json.dump(report, open(os.path.join(OUT, "_report.json"), "w"), indent=1)

files = [f for f in sorted(os.listdir(OUT)) if f.endswith(".png")]
W = 140
sheet = Image.new("RGB", (W * 8, (W + 22) * ((len(files) + 7) // 8)), "#f3efe9")
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(os.path.join(OUT, f)).convert("RGBA")
    im.thumbnail((W - 20, W - 20))
    x, y = (i % 8) * W, (i // 8) * (W + 22)
    bg = Image.new("RGBA", im.size, "white")
    sheet.paste(Image.alpha_composite(bg, im).convert("RGB"), (x + (W - im.size[0]) // 2, y + 6))
    d.text((x + 4, y + W), f[:-4][:22], fill="black")
sheet.save(SHEET)
