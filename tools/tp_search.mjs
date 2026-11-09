// Ambil kartu produk Official Store dari pencarian Tokopedia, simpan mentah (pencocokan dilakukan di Python).
const fs = await import("node:fs/promises");
// Path absolut (script ego-browser nggak jalan di folder project). miss.json: daftar parfum yang dicari,
// buat pakai: python -I tools/tp_search_match.py --miss  (lihat tools/README.md)
const DIR = "C:/Users/Asus/orca/projects/projak projek/parfum-compare/tools/";
const miss = JSON.parse(await fs.readFile(DIR + "tp_miss.json", "utf8"));
let out = {};
try { out = JSON.parse(await fs.readFile(DIR + "tp_search.json", "utf8")); } catch {}
const task = await taskSpace("parfum shopee links");
const page = task.page("p1");
const clean = (s) => s.replace(/\(.*?\)/g, " ").replace(/\b(EDT|EDP|EDC)\b/g, " ").replace(/\s+/g, " ").trim();
for (const p of miss) {
  if (out[p.id]) continue;
  const q = `${p.brand.replace("&", "")} ${clean(p.name)}`.replace(/\s+/g, " ");
  try {
    await page.goto("https://www.tokopedia.com/search?official=true&q=" + encodeURIComponent(q));
    await page.waitForFunction(() => document.querySelectorAll('img[alt="product-image"]').length > 3 || /tidak ditemukan|Oops/i.test(document.body.innerText), undefined, { timeout: 20000 }).catch(() => {});
    await page.mouse.move(600, 500);
    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(1500);
    const cards = await page.evaluate(() => [...document.querySelectorAll("a[href*='tokopedia.com/']")]
      .filter((a) => a.querySelector('img[alt="product-image"]'))
      .map((a) => ({
        url: a.href.split("?")[0],
        os: !!a.querySelector('img[src*="official_store"]'),
        text: a.innerText.split("\n").map((s) => s.trim()).filter(Boolean),
      })).slice(0, 40));
    out[p.id] = { q, cards };
    console.log(p.id, cards.length, cards.filter((c) => c.os).length);
  } catch (e) {
    console.log("ERR", p.id, String(e).slice(0, 120));
  }
  await fs.writeFile(DIR + "tp_search.json", JSON.stringify(out, null, 1));
  await page.waitForTimeout(2500 + Math.random() * 2000);
}
console.log("done", Object.keys(out).length);
