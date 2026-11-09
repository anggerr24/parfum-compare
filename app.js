const KEY = { custom: "parfum.custom", fav: "parfum.fav", theme: "parfum.theme" };
const MAX_COMPARE = 4;
// "all" = notes yang nggak dibagi per layer (sumbernya cuma kasih daftar notes).
const LAYERS = [["top", "Top"], ["middle", "Middle"], ["base", "Base"], ["all", "Notes"]];
const CONC = { X: "Extrait", EDP: "EDP", EDT: "EDT", EDC: "Cologne" };
// Tag acara & cuaca: perkiraan dari family + proyeksi, bukan data dari brand.
const TAGS = {
  kantor: { label: "Kantor", test: (p) => ["Fresh", "Aromatic", "Musky", "Floral", "Fruity"].includes(p.family) && p.sillage <= 7 },
  kencan: { label: "Kencan", test: (p) => ["Gourmand", "Oriental", "Floral", "Fruity", "Musky"].includes(p.family) },
  santai: { label: "Santai", test: (p) => ["Fresh", "Fruity", "Aromatic", "Musky"].includes(p.family) },
  formal: { label: "Formal", test: (p) => ["Oriental", "Woody", "Leather", "Gourmand"].includes(p.family) && p.sillage >= 6 },
  panas: { label: "Cuaca panas", test: (p) => ["Fresh", "Aromatic", "Fruity", "Floral", "Musky"].includes(p.family) },
  malam: { label: "Malam & hujan", test: (p) => ["Gourmand", "Oriental", "Woody", "Leather"].includes(p.family) },
};
const VIBES = {
  segar: ["Fresh", "Aromatic", "Fruity"],
  manis: ["Gourmand", "Fruity", "Oriental"],
  bunga: ["Floral", "Musky"],
  kayu: ["Woody", "Oriental", "Leather", "Aromatic"],
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");
const rupiahShort = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}jt` : `${Math.round(n / 1000)}rb`).replace(".", ",");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => String(s).trim().toLowerCase();
const hasLayer = (p, k) => (p.notes[k] || []).length > 0;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  q: "",
  origin: "",
  gender: "",
  family: "",
  occasion: "",
  brand: "",
  sort: "value",
  maxPrice: Infinity,
  notes: [],      // filter notes, lowercase
  view: "brand",  // "brand" | "grid"
  favOnly: false,
  compare: [],    // ids
};

// ---------- storage ----------

function load(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const favs = new Set(load(KEY.fav, []));

// ---------- gambar ----------

function hue(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 55% 48%)`;
}

// Logo merek dari img/brands/<slug>.png (favicon situs resmi). Kalau nggak ada, balik ke inisial.
const brandSlug = (name) => name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function brandMark(name, tag = "span") {
  return `<${tag} class="mono has-logo" style="--hue:${hue(name)}"><span class="ini">${esc(monogram(name))}</span><img src="img/brands/${brandSlug(name)}.png"
    alt="Logo ${esc(name)}" loading="lazy" onerror="this.parentNode.classList.remove('has-logo');this.remove()"></${tag}>`;
}

function monogram(name) {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
}

// Ilustrasi botol SVG, dipakai kalau foto belum ada.
function bottleSvg(p) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <rect x="66" y="14" width="28" height="22" rx="4" fill="#2b2622"/>
    <rect x="72" y="36" width="16" height="12" fill="#bdb5aa"/>
    <rect x="40" y="48" width="80" height="98" rx="14" fill="${hue(p.brand)}" opacity=".85"/>
    <rect x="48" y="56" width="10" height="70" rx="5" fill="#fff" opacity=".35"/>
    <rect x="58" y="84" width="44" height="28" rx="4" fill="#fff" opacity=".9"/>
    <text x="80" y="104" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#2b2622">${esc(monogram(p.brand))}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

// Prioritas: field `image` → img/<id>.jpg → ilustrasi botol.
function img(p) {
  const src = p.image || `img/${p.id}.jpg`;
  return `<img src="${esc(src)}"${p.imgFit === "cover" ? ' class="cover"' : ""} data-fallback="${bottleSvg(p)}" alt="${esc(p.brand + " " + p.name)}" loading="lazy" onerror="this.onerror=null;this.src=this.dataset.fallback">`;
}

// Kecilin foto upload biar muat di localStorage.
function fileToDataUrl(file, max = 480) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const im = new Image();
      im.onerror = reject;
      im.onload = () => {
        const scale = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement("canvas");
        c.width = Math.round(im.width * scale);
        c.height = Math.round(im.height * scale);
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(im, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.85));
      };
      im.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ---------- data ----------

let all = [];
let brands = [];

// Kualitas = gabungan rating, ketahanan, dan proyeksi (0–10).
// Value = kualitas dibagi harga per ml, dinormalisasi ke 0–100 terhadap parfum terbaik.
function rebuild() {
  all = [...PERFUMES, ...load(KEY.custom, []).map((p) => ({ ...p, custom: true }))].map((p) => {
    const ppm = p.price / p.size;
    const quality = p.rating * 0.5 + p.longevity * 0.3 + p.sillage * 0.2;
    const noteSet = new Set(LAYERS.flatMap(([k]) => p.notes[k] || []).map(norm));
    const q = { ...p, origin: p.origin || "Impor", ppm, quality, noteSet, rawValue: quality / ppm };
    q.tags = Object.keys(TAGS).filter((k) => TAGS[k].test(q));
    return q;
  });
  const best = Math.max(...all.map((p) => p.rawValue));
  all.forEach((p) => (p.value = Math.round((p.rawValue / best) * 100)));

  const byBrand = new Map();
  all.forEach((p) => {
    if (!byBrand.has(p.brand)) byBrand.set(p.brand, { name: p.brand, origin: p.origin, items: [] });
    byBrand.get(p.brand).items.push(p);
  });
  brands = [...byBrand.values()].sort((a, b) =>
    a.origin === b.origin ? a.name.localeCompare(b.name) : a.origin === "Lokal" ? -1 : 1);

  state.compare = state.compare.filter((id) => all.some((p) => p.id === id));
}

const byId = (id) => all.find((p) => p.id === id);

function similarity(a, b) {
  let shared = 0;
  a.noteSet.forEach((n) => b.noteSet.has(n) && shared++);
  const union = a.noteSet.size + b.noteSet.size - shared;
  return union ? shared / union : 0;
}

function priceRange(items) {
  const ps = items.map((p) => p.price);
  const lo = Math.min(...ps), hi = Math.max(...ps);
  return lo === hi ? rupiah(lo) : `${rupiah(lo)} – ${rupiah(hi)}`;
}

// ---------- filter ----------

function setupFilters() {
  const families = [...new Set(all.map((p) => p.family))].sort();
  $("#family").innerHTML = '<option value="">Semua family</option>' +
    families.map((f) => `<option${f === state.family ? " selected" : ""}>${esc(f)}</option>`).join("");
  $("#familyList").innerHTML = families.map((f) => `<option value="${esc(f)}">`).join("");
  $("#occasion").innerHTML = '<option value="">Semua acara</option>' +
    Object.entries(TAGS).map(([k, t]) => `<option value="${k}"${k === state.occasion ? " selected" : ""}>${t.label}</option>`).join("");
  const imports = all.filter((p) => p.origin === "Impor").sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name));
  $("#dupeSelect").innerHTML = '<option value="">— pilih parfum impor —</option>' +
    imports.map((p) => `<option value="${esc(p.id)}">${esc(p.brand)} — ${esc(p.name)}</option>`).join("");
  $("#brandList").innerHTML = brands.map((b) => `<option value="${esc(b.name)}">`).join("");

  const notes = new Map();
  all.forEach((p) => p.noteSet.forEach((n) => notes.has(n) || notes.set(n, LAYERS.flatMap(([k]) => p.notes[k] || []).find((x) => norm(x) === n))));
  $("#noteList").innerHTML = [...notes.values()].sort().map((n) => `<option value="${esc(n)}">`).join("");

  const slider = $("#maxPrice");
  const wasAtMax = state.maxPrice === Infinity || state.maxPrice >= Number(slider.max);
  slider.min = 0;
  slider.max = Math.ceil(Math.max(...all.map((p) => p.price)) / 50000) * 50000;
  slider.value = wasAtMax ? slider.max : state.maxPrice;
  state.maxPrice = Number(slider.value);
  $("#maxPriceOut").textContent = rupiah(state.maxPrice);

  return notes.size;
}

function filtered() {
  const groups = searchGroups(state.q);
  const list = all.filter((p) =>
    (!groups.length || matchesQuery(p, groups)) &&
    (!state.origin || p.origin === state.origin) &&
    (!state.gender || p.gender === state.gender) &&
    (!state.family || p.family === state.family) &&
    (!state.occasion || p.tags.includes(state.occasion)) &&
    (!state.brand || p.brand === state.brand) &&
    (!state.favOnly || favs.has(p.id)) &&
    p.price <= state.maxPrice &&
    state.notes.every((n) => p.noteSet.has(n))
  );
  const sorters = {
    value: (a, b) => b.value - a.value,
    rating: (a, b) => b.rating - a.rating,
    quality: (a, b) => b.quality - a.quality,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    ppm: (a, b) => a.ppm - b.ppm,
    longevity: (a, b) => b.longevity - a.longevity,
  };
  return list.sort(sorters[state.sort]);
}

// ---------- render ----------

const heartSvg = '<svg viewBox="0 0 24 24" class="ic"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.4 5 6.9 5c2 0 3.4 1.1 4.1 2.3C11.7 6.1 13.1 5 15.1 5c3.5 0 5.7 3.6 4.4 6.8C19.5 16.4 12 21 12 21z"/></svg>';

function meter(label, v) {
  return `<div class="meter"><span>${label}</span><span class="track"><span class="fill" style="--w:${v * 10}%"></span></span><b>${+v.toFixed(1)}</b></div>`;
}

function ring(p) {
  return `<div class="ring" style="--target:${p.value}" title="Skor value: kualitas dibanding harga/ml"><span>${p.value}<small>VALUE</small></span></div>`;
}

function originBadge(p) {
  return `<span class="origin-badge ${p.origin === "Lokal" ? "lokal" : "impor"}">${esc(p.origin)}</span>`;
}

function noteChips(p, limit = 6) {
  const hl = new Set(state.notes);
  const groups = searchGroups(state.q);
  const items = LAYERS.flatMap(([k]) => (p.notes[k] || []).map((n) => [k, n]));
  const shown = items.slice(0, limit).map(([k, n]) => {
    const hit = hl.has(norm(n)) || noteHit(n, groups);
    return `<span class="nchip ${k}${hit ? " hit" : ""}">${esc(n)}</span>`;
  });
  if (items.length > limit) shown.push(`<span class="nchip more">+${items.length - limit}</span>`);
  return `<div class="note-chips">${shown.join("")}</div>`;
}

function compareBtn(p) {
  const on = state.compare.includes(p.id);
  const full = !on && state.compare.length >= MAX_COMPARE;
  return `<button class="ghost-btn sm${on ? " on" : ""}" data-compare="${esc(p.id)}" ${full ? "disabled" : ""}>${on ? "✓ Dibandingkan" : "+ Bandingkan"}</button>`;
}

// Link beli: selalu 2 pilihan, Tokopedia & Shopee.
// - Tokopedia: link produk langsung kalau ada di data (`buy`, diisi tools/tokped_links.py), selain itu
//   pencarian yang difilter ke toko berlabel Official Store.
// - Shopee: pencarian di Shopee Mall (cuma toko resmi/distributor resmi).
function buyOptions(p) {
  if (p.custom) return [];
  const q = encodeURIComponent(`${p.brand} ${p.name.replace(/\(.*?\)/g, "")}`.replace(/\s+/g, " ").trim());
  const direct = p.buy?.find((b) => b.url.includes("tokopedia.com"));
  return [
    direct
      ? { store: "Tokopedia", url: direct.url, direct: true, kind: direct.kind, shop: direct.store.replace(/^Tokopedia · /, "") }
      : { store: "Tokopedia", url: `https://www.tokopedia.com/search?st=product&q=${q}&official=true` },
    { store: "Shopee", url: `https://shopee.co.id/mall/search?keyword=${q}` },
  ];
}

function buyLinks(p, small) {
  return buyOptions(p).map((b) => `<a class="${small ? "ghost-btn sm" : "btn"} buy-${b.store.toLowerCase()}" href="${esc(b.url)}"
    target="_blank" rel="noopener noreferrer" title="${b.direct ? `Beli di ${b.store}` : `Cari di toko resmi ${b.store}`}">${small ? b.store : `🛒 ${b.store}`}</a>`).join("");
}

function buyBox(p) {
  const opts = buyOptions(p);
  if (!opts.length) return "";
  const t = opts[0];
  const tp = !t.direct
    ? "Tokopedia: hasil pencarian khusus toko <b>Official Store</b>."
    : t.kind === "official"
      ? `Tokopedia: ✔ langsung ke produknya di <b>${esc(t.shop)}</b> (Official Store).`
      : `Tokopedia: langsung ke produknya di toko <b>${esc(t.shop)}</b> (atas nama brand, belum berlabel Official Store).`;
  return `<div class="buy-box">
    <div class="buy-row">${buyLinks(p)}</div>
    <p>${tp} Shopee: hasil pencarian khusus <b>Shopee Mall</b>. Pilih toko yang namanya brand atau distributor resminya,
      dan cek lagi harganya sebelum bayar.</p>
  </div>`;
}

// Satu baris daftar parfum (dipakai di "mirip", dupe, dan hasil kuis). Klik → detail.
function listItem(p, i, sub, pct) {
  return `<li data-detail="${esc(p.id)}" style="animation-delay:${i * 50}ms">
    <div class="media" data-fam="${esc(p.family)}">${img(p)}</div>
    <div class="grow">
      <b>${esc(p.brand)} — ${esc(p.name)}</b>
      <div class="small muted">${rupiah(p.price)} / ${p.size} ml · ${rupiah(p.ppm)}/ml</div>
      ${sub}
    </div>
    ${pct}
  </li>`;
}

function commonNotes(p, target) {
  return [...new Set(LAYERS.flatMap(([k]) => p.notes[k] || []))].filter((n) => target.noteSet.has(norm(n)));
}

// Dupe lokal: parfum lokal dengan notes paling mirip. Ambang 12% biar yang cuma sama 1 notes umum nggak ikut.
function dupesFor(p, n = 6) {
  return all
    .filter((x) => x.origin === "Lokal" && x.id !== p.id)
    .map((x) => ({ p: x, s: similarity(p, x) }))
    .filter((r) => r.s >= 0.12)
    .sort((a, b) => b.s - a.s)
    .slice(0, n);
}

function dupeList(target, list) {
  if (!list.length) return '<p class="muted small">Belum ada parfum lokal yang notes-nya cukup mirip.</p>';
  return `<ul class="sim-list">${list.map(({ p, s }, i) => {
    const save = 1 - p.ppm / target.ppm;
    const saving = save > 0
      ? `<b style="color:var(--good)">hemat ${Math.round(save * 100)}% per ml</b>`
      : `<span class="muted">lebih mahal per ml</span>`;
    const common = commonNotes(p, target).slice(0, 5).map((x) => `<mark>${esc(x)}</mark>`).join(" ");
    return listItem(p, i, `<div class="small">${saving} · sama: ${common}</div>`, `<span class="sim-pct">${Math.round(s * 100)}%</span>`);
  }).join("")}</ul>`;
}

function renderDupes(id) {
  const p = byId(id);
  $("#dupeBody").innerHTML = p
    ? `<div class="dupe-target">${img(p)}<div><span class="brandline">${esc(p.brand)}</span><b>${esc(p.name)}</b>
        <div class="small muted">${rupiah(p.price)} / ${p.size} ml · ${rupiah(p.ppm)}/ml</div></div></div>${dupeList(p, dupesFor(p))}`
    : "";
}

function runQuiz(f) {
  const vibe = VIBES[f.get("vibe")], occ = f.get("occasion"), budget = Number(f.get("budget"));
  const g = f.get("gender"), o = f.get("origin");
  const ranked = all
    .filter((p) => p.price <= budget && (!g || p.gender === g || p.gender === "Unisex") && (!o || p.origin === o))
    .map((p) => ({ p, vibe: vibe.includes(p.family), occ: p.tags.includes(occ) }))
    .map((r) => ({ ...r, s: (r.vibe ? 3 : 0) + (r.occ ? 2 : 0) + r.p.value / 50 + r.p.rating / 10 }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 6);
  $("#quizResult").innerHTML = ranked.length
    ? `<h3>Rekomendasi buat kamu</h3><ul class="sim-list">${ranked.map((r, i) => {
        const why = [r.vibe && `wangi ${f.get("vibe")}`, r.occ && TAGS[occ].label.toLowerCase(), `value ${r.p.value}`].filter(Boolean).join(" · ");
        return listItem(r.p, i, `<div class="small">cocok: ${esc(why)}</div>`, `<span class="sim-pct">#${i + 1}</span>`);
      }).join("")}</ul><button class="ghost-btn sm" type="button" data-quiz-again>Ulang kuis</button>`
    : '<p class="muted">Nggak ada yang masuk budget itu — coba naikin budget-nya.</p><button class="ghost-btn sm" type="button" data-quiz-again>Ulang kuis</button>';
  $("#quizForm").hidden = true;
}

// ---------- gambaran wangi ----------

function scentLine(p) {
  const s = scentProfile(p);
  return `<div class="scent-line" data-scene="${s.main}" title="${esc(s.analogy)}">
    <span class="strip">${s.strip.join("")}</span><span class="scene">${s.scene.icon} ${s.scene.label}</span></div>`;
}

function scentCard(p) {
  const s = scentProfile(p);
  const stages = s.stages.map((st) => `<div class="stage">
      <span class="emo">${st.icons.join("")}</span>
      <b>${st.label}</b>${st.hint ? `<small>${st.hint}</small>` : ""}
      <span>${esc(joinId(st.phrases))}</span>
    </div>`).join('<span class="arrow" aria-hidden="true">→</span>');
  return `<div class="scent-card" data-scene="${s.main}">
    <div class="scene-head">
      <div class="scene-icon">${s.scene.icon}</div>
      <div><h4>Wanginya kayak…</h4><p>${esc(s.analogy)}</p></div>
    </div>
    <div class="journey${s.stages.length === 1 ? " single" : ""}">${stages}</div>
    <p class="tiny">Gambaran otomatis dari notes, bukan hasil nyium langsung.</p>
  </div>`;
}

// ---------- paling worth it ----------

const BEST_TABS = [
  ["all", "Semua", () => true],
  ["lokal", '<span class="flag"></span>Lokal', (p) => p.origin === "Lokal"],
  ["impor", "🌍 Impor", (p) => p.origin === "Impor"],
  ["b300", "≤ 300rb", (p) => p.price <= 300000],
  ["b600", "300–600rb", (p) => p.price > 300000 && p.price <= 600000],
  ["b1500", "600rb–1,5jt", (p) => p.price > 600000 && p.price <= 1500000],
  ["bmax", "> 1,5jt", (p) => p.price > 1500000],
  ["pria", "Pria", (p) => p.gender === "Pria"],
  ["wanita", "Wanita", (p) => p.gender === "Wanita"],
  ["unisex", "Unisex", (p) => p.gender === "Unisex"],
];
const best = { tab: "all", real: false };

function renderBest() {
  $("#bestTabs").innerHTML = BEST_TABS.map(([k, label]) =>
    `<button class="chip${best.tab === k ? " on" : ""}" role="tab" aria-selected="${best.tab === k}" data-best="${k}">${label}</button>`).join("");
  const test = BEST_TABS.find(([k]) => k === best.tab)[2];
  const list = all
    .filter((p) => test(p) && (!best.real || ["fragrantica", "femaledaily"].includes(p.ratingSrc)))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  if (!list.length) {
    $("#bestBody").innerHTML = '<p class="muted">Belum ada parfum di kategori ini.</p>';
    return;
  }
  const medals = ["🥇", "🥈", "🥉"];
  const podium = list.slice(0, 3).map((p, i) => `
    <button class="pod reveal" data-detail="${esc(p.id)}" data-fam="${esc(p.family)}" style="--d:${i * 90}ms">
      <span class="medal">${medals[i]}</span>
      <div class="media">${img(p)}</div>
      <span class="brandline">${esc(p.brand)}</span>
      <b>${esc(p.name)}</b>
      <span class="pod-price">${rupiah(p.price)} · ${p.size} ml</span>
      ${scentLine(p)}
      <span class="pod-value"><b>${p.value}</b> value · rating ${+p.rating.toFixed(1)}${p.ratingSrc === "estimasi" ? "*" : ""}</span>
    </button>`).join("");
  const rest = list.slice(3).map((p, i) => listItem(p, i,
    `<div class="small">${scentProfile(p).scene.icon} ${esc(scentProfile(p).scene.label)} · rating ${+p.rating.toFixed(1)}${p.ratingSrc === "estimasi" ? "*" : ""}</div>`,
    `<span class="sim-pct">${p.value}</span>`)).join("");

  const pool = all.filter(test);
  const avg = (o) => {
    const xs = pool.filter((p) => p.origin === o);
    return xs.length ? xs.reduce((s, p) => s + p.ppm, 0) / xs.length : 0;
  };
  const lok = avg("Lokal"), imp = avg("Impor");
  const insight = lok && imp
    ? `💡 Rata-rata harga per ml di kategori ini: lokal <b>${rupiah(lok)}</b>, impor <b>${rupiah(imp)}</b> — impor ${+(imp / lok).toFixed(1)}× lebih mahal.`
    : "";
  $("#bestBody").innerHTML = `
    <div class="podium">${podium}</div>
    ${rest ? `<ul class="sim-list best-rest">${rest}</ul>` : ""}
    <p class="small muted best-note">${insight}
      Skor value condong ke parfum yang murah per ml; urutkan “Kualitas tertinggi” di bawah kalau yang dicari kualitas.
      * = rating estimasi (belum ada review). Harga impor masih perkiraan.</p>`;
  observeReveal();
}

function card(p) {
  return `
  <article class="card reveal${state.compare.includes(p.id) ? " selected" : ""}" data-card="${esc(p.id)}" data-fam="${esc(p.family)}">
    <button class="media" data-detail="${esc(p.id)}" aria-label="Detail ${esc(p.name)}">
      ${img(p)}
      ${p.origin === "Lokal" ? originBadge(p) : ""}
    </button>
    <button class="fav" data-fav="${esc(p.id)}" aria-pressed="${favs.has(p.id)}" aria-label="Favorit">${heartSvg}</button>
    <div class="card-body">
      <div class="card-top">
        <div>
          <div class="brandline">${esc(p.brand)}${p.conc ? " · " + CONC[p.conc] : ""}</div>
          <h3><button data-detail="${esc(p.id)}">${esc(p.name)}</button></h3>
        </div>
        ${ring(p)}
      </div>
      <div class="pills">
        <span class="pill fam">${esc(p.family)}</span>
        <span class="pill">${esc(p.gender)}</span>
        ${p.custom ? '<span class="pill">custom</span>' : ""}
      </div>
      ${scentLine(p)}
      <div class="price">${rupiah(p.price)}<small>${p.size} ml · ${rupiah(p.ppm)}/ml</small></div>
      <div class="meters">
        ${meter("Rating", p.rating)}
        ${meter("Ketahanan", p.longevity)}
        ${meter("Proyeksi", p.sillage)}
      </div>
      ${noteChips(p, 4)}
      <div class="card-actions">
        ${compareBtn(p)}
        <button class="ghost-btn sm" data-similar="${esc(p.id)}">Mirip</button>
        ${buyLinks(p, true)}
        ${p.custom ? `<button class="ghost-btn sm" data-delete="${esc(p.id)}">Hapus</button>` : ""}
      </div>
    </div>
  </article>`;
}

function brandHead(b, items) {
  return `
  <div class="brand-head">
    ${brandMark(b.name, "div")}
    <div>
      <h2>${esc(b.name)} ${originBadge(b)}</h2>
      <p>${items.length} parfum · ${priceRange(items)}</p>
    </div>
    <div class="line"></div>
  </div>`;
}

// Biar halaman nggak kepanjangan: 6 merek dulu (masing-masing 1 baris), grid 24 dulu.
const PER_BRAND = 4;
const BRAND_STEP = 6;
const GRID_STEP = 24;
const shown = { brands: new Set(), brandCount: BRAND_STEP, grid: GRID_STEP };
const brandAnchor = (name) => "brand-" + name.replace(/\W+/g, "-");

// keep = true kalau cuma buka/tutup "lihat semua"; selain itu (filter berubah) tampilan diringkas lagi.
function render(keep = false) {
  if (!keep) {
    shown.brands.clear();
    shown.brandCount = BRAND_STEP;
    shown.grid = GRID_STEP;
  }
  const list = filtered();
  renderActiveFilters(list.length);

  if (!list.length) {
    $("#results").innerHTML = `<div class="empty"><div class="big">🫙</div><p>Nggak ada parfum yang cocok. Coba longgarin filternya.</p>
      <button class="ghost-btn" data-reset>Reset filter</button></div>`;
  } else if (state.view === "brand") {
    const groups = brands
      .map((b) => ({ b, items: list.filter((p) => p.brand === b.name) }))
      .filter((g) => g.items.length);
    const restBrands = groups.length - shown.brandCount;
    $("#results").innerHTML = `<p class="result-meta">${list.length} parfum dari ${groups.length} merek</p>` +
      groups.slice(0, shown.brandCount).map(({ b, items }) => {
        const full = !!state.brand || shown.brands.has(b.name) || items.length <= PER_BRAND;
        const more = full
          ? (items.length > PER_BRAND && !state.brand
            ? `<button class="more-btn" data-more-brand="${esc(b.name)}">Ringkas ▴</button>` : "")
          : `<button class="more-btn" data-more-brand="${esc(b.name)}">Lihat semua ${items.length} parfum ${esc(b.name)} ▾</button>`;
        return `<section class="brand-section" id="${esc(brandAnchor(b.name))}">
          ${brandHead(b, items)}<div class="grid">${(full ? items : items.slice(0, PER_BRAND)).map(card).join("")}</div>${more}</section>`;
      }).join("") +
      (restBrands > 0
        ? `<button class="more-btn big" data-more-brands>Tampilkan ${Math.min(restBrands, BRAND_STEP)} merek lagi · sisa ${restBrands} merek ▾</button>
           <p class="small muted more-hint">Atau langsung klik mereknya di “Jelajahi per merek”.</p>`
        : "");
  } else {
    const rest = list.length - shown.grid;
    $("#results").innerHTML = `<p class="result-meta">${list.length} parfum</p><div class="grid">${list.slice(0, shown.grid).map(card).join("")}</div>` +
      (rest > 0 ? `<button class="more-btn" data-more-grid>Tampilkan ${Math.min(rest, GRID_STEP)} lagi · sisa ${rest} ▾</button>` : "");
  }
  observeReveal();
  renderTray();
  renderBrands();
}

function renderActiveFilters(count) {
  const chips = [];
  if (state.brand) chips.push(`<button class="chip" data-unbrand>Merek: ${esc(state.brand)} ✕</button>`);
  if (state.favOnly) chips.push('<button class="chip" data-unfav>Favorit aja ✕</button>');
  state.notes.forEach((n) => chips.push(`<button class="chip" data-unnote="${esc(n)}">Notes: ${esc(n)} ✕</button>`));
  if (state.occasion) chips.push(`<button class="chip" data-unoccasion>Acara: ${TAGS[state.occasion].label} ✕</button>`);
  if (chips.length || state.q || state.origin || state.gender || state.family) {
    chips.push('<button class="chip clear" data-reset>Reset semua</button>');
  }
  $("#activeFilters").innerHTML = chips.join("");
}

function renderBrands() {
  const groups = ["Lokal", "Impor"].map((o) => ({ o, list: brands.filter((b) => b.origin === o) }));
  $("#brandGrid").innerHTML = groups.map(({ o, list }) => `
    <div class="brand-group">
      <h3>${o === "Lokal" ? '<span class="flag"></span>Merek lokal' : "Merek impor"} <span>· ${list.length}</span></h3>
      <div class="brand-tiles">
        ${list.map((b) => `<button class="brand-tile${state.brand === b.name ? " on" : ""}" data-brand="${esc(b.name)}" style="--hue:${hue(b.name)}">
          ${brandMark(b.name)}
          <span><b>${esc(b.name)}</b><small>${b.items.length} parfum · dari ${rupiahShort(Math.min(...b.items.map((p) => p.price)))}</small></span>
        </button>`).join("")}
      </div>
    </div>`).join("");
}

function renderTray() {
  const tray = $("#tray");
  tray.classList.toggle("show", state.compare.length > 0);
  $("#trayItems").innerHTML = state.compare.map((id) => {
    const p = byId(id);
    return `<button class="tray-item" data-compare="${esc(id)}" title="Hapus dari perbandingan">${img(p)}${esc(p.name)} ✕</button>`;
  }).join("");
  const n = state.compare.length;
  $("#trayHint").textContent = n < 2 ? "Pilih minimal 2 parfum" : "";
  $("#openCompare").disabled = n < 2;
  $("#openCompare").textContent = `Bandingkan (${n}/${MAX_COMPARE})`;
}

// Kartu muncul bertahap waktu masuk layar.
let revealObserver;
function observeReveal() {
  const els = $$(".reveal:not(.in)");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    let i = 0;
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      e.target.style.setProperty("--d", `${Math.min(i++ * 60, 420)}ms`);
      e.target.classList.add("in");
      revealObserver.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => revealObserver.observe(el));
}

// ---------- dialog ----------

function openDlg(d) {
  d.classList.remove("closing");
  if (!d.open) d.showModal();
}

function closeDlg(d) {
  if (!d.open || d.classList.contains("closing")) return;
  if (reduceMotion) return d.close();
  d.classList.add("closing");
  setTimeout(() => { d.classList.remove("closing"); d.close(); }, 200);
}

function sourceNote(p) {
  if (p.custom) return "Data yang kamu tambahkan sendiri.";
  const rating = {
    fragrantica: `Rating Fragrantica dari ${(p.votes || 0).toLocaleString("id-ID")} vote`,
    femaledaily: `Rating Female Daily dari ${p.fd?.reviews} review`,
  }[p.ratingSrc] || "Rating: estimasi";
  const notes = { resmi: "notes dari deskripsi resmi brand", manual: "notes: piramida umum (belum diverifikasi ulang)" }[p.notesSrc] || "notes dari Fragrantica";
  const link = p.fragrantica
    ? ` · <a class="src-link" href="https://www.fragrantica.com/perfume/x/x-${esc(p.fragrantica)}.html" target="_blank" rel="noopener">Fragrantica ↗</a>`
    : "";
  const fd = p.fd ? ` · <a class="src-link" href="${esc(p.fd.url)}" target="_blank" rel="noopener">Female Daily ↗</a>` : "";
  return `${rating} · ${notes}. Ketahanan, proyeksi &amp; tag acara perkiraan${link}${fd}`;
}

// Ringkasan Female Daily (rating /5, jumlah review, % rekomendasi).
function fdBadge(p) {
  if (!p.fd) return "";
  const rec = p.fd.recommend != null ? ` · ${p.fd.recommend}% rekomendasi` : "";
  return `<a class="fd-badge" href="${esc(p.fd.url)}" target="_blank" rel="noopener">
    <b>★ ${p.fd.rating.toFixed(1)}</b><span>/5 Female Daily · ${p.fd.reviews} review${rec}</span></a>`;
}

function priceInfo(p) {
  const other = (p.variants || []).filter((v) => v.size !== p.size);
  const sizes = other.length
    ? `<div class="variants">Ukuran lain: ${other.map((v) => `<span class="pill">${v.size} ml · ${rupiah(v.price)} <small>(${rupiah(v.price / v.size)}/ml)</small></span>`).join(" ")}</div>`
    : "";
  const src = p.custom ? "" : {
    toko: `Harga normal di toko resmi, dicek ${esc(p.checked || "")} (belum termasuk promo).`,
    retailer: `Harga dari retailer, dicek ${esc(p.checked || "")}.`,
  }[p.priceSrc] || "Harga perkiraan retail Indonesia — cek harga terbaru di toko.";
  return sizes + (src ? `<p class="small muted">${src}</p>` : "");
}

function openDetail(id) {
  const p = byId(id);
  const tiers = LAYERS.filter(([k]) => hasLayer(p, k)).map(([k, label]) => `
    <div class="tier ${k}"><h4>${k === "all" ? "Notes" : label + " notes"}</h4>
      <div class="note-chips">${p.notes[k].map((n) => `<button class="nchip ${k}" data-addnote="${esc(n)}" title="Filter pakai notes ini">${esc(n)}</button>`).join("")}</div>
    </div>`).join("");
  $("#detailBody").innerHTML = `
  <div class="detail" data-fam="${esc(p.family)}">
    <div class="media">${img(p)}</div>
    <div class="detail-info">
      <button class="x" data-close aria-label="Tutup">×</button>
      <div>
        <div class="brandline">${esc(p.brand)}${p.conc ? " · " + CONC[p.conc] : ""}</div>
        <h2>${esc(p.name)}</h2>
      </div>
      <div class="pills">
        ${originBadge(p)}
        <span class="pill fam">${esc(p.family)}</span>
        <span class="pill">${esc(p.gender)}</span>
        ${p.tags.map((t) => `<span class="pill tag">${TAGS[t].label}</span>`).join("")}
      </div>
      <div class="detail-row">
        ${ring(p)}
        <div class="price">${rupiah(p.price)}<small>${p.size} ml · ${rupiah(p.ppm)}/ml</small></div>
      </div>
      ${priceInfo(p)}
      ${fdBadge(p)}
      <div class="meters">
        ${meter("Kualitas", p.quality)}
        ${meter("Rating", p.rating)}
        ${meter("Ketahanan", p.longevity)}
        ${meter("Proyeksi", p.sillage)}
      </div>
      ${scentCard(p)}
      <div class="pyramid">${tiers}</div>
      ${buyBox(p)}
      ${p.origin === "Impor" ? `<div class="dupes"><h4>🔁 Alternatif lokal</h4>${dupeList(p, dupesFor(p, 3))}</div>` : ""}
      <div class="card-actions">
        ${compareBtn(p)}
        <button class="ghost-btn sm" data-similar="${esc(p.id)}">Cari yang mirip</button>
        <button class="ghost-btn sm" data-fav="${esc(p.id)}" aria-pressed="${favs.has(p.id)}">${favs.has(p.id) ? "♥ Favorit" : "♡ Favoritkan"}</button>
      </div>
      <p class="src-link">${sourceNote(p)}</p>
    </div>
  </div>`;
  openDlg($("#detailDlg"));
}

function renderCompare() {
  const items = state.compare.map(byId);
  const counts = new Map();
  items.forEach((p) => p.noteSet.forEach((n) => counts.set(n, (counts.get(n) || 0) + 1)));
  const shared = new Set([...counts].filter(([, c]) => c > 1).map(([n]) => n));
  const cols = items.length + 1;

  const metric = (label, get, fmt, better) => {
    const vals = items.map(get);
    const best = better === "low" ? Math.min(...vals) : Math.max(...vals);
    const max = Math.max(...vals);
    return `<tr><th>${label}</th>${vals.map((v) => {
      const w = better === "low" ? (best / v) * 100 : (v / max) * 100;
      return `<td class="${v === best ? "best" : ""}"><div class="cmp-cell"><span class="val">${fmt(v)}</span><span class="cmp-bar"><i style="--w:${w}%"></i></span></div></td>`;
    }).join("")}</tr>`;
  };
  const num = (v) => +v.toFixed(1);
  const noteRow = (k, label) => `<tr><th>${label}</th>${items.map((p) =>
    `<td>${(p.notes[k] || []).map((n) => (shared.has(norm(n)) ? `<mark>${esc(n)}</mark>` : esc(n))).join(", ") || "—"}</td>`).join("")}</tr>`;

  const pairs = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++)
      pairs.push(`${esc(items[i].name)} ↔ ${esc(items[j].name)}: <b>${Math.round(similarity(items[i], items[j]) * 100)}%</b>`);

  $("#compareBody").innerHTML = `
  <table>
    <thead><tr><th></th>${items.map((p) => `<th><div class="cmp-head" data-fam="${esc(p.family)}">
      <div class="media">${img(p)}</div>
      <span class="brandline">${esc(p.brand)}</span><b>${esc(p.name)}</b></div></th>`).join("")}</tr></thead>
    <tbody>
      <tr class="section-row"><th colspan="${cols}">Harga</th></tr>
      ${metric("Harga", (p) => p.price, rupiah, "low")}
      ${metric("Harga / ml", (p) => p.ppm, rupiah, "low")}
      <tr><th>Ukuran</th>${items.map((p) => `<td>${p.size} ml${p.conc ? " · " + CONC[p.conc] : ""}</td>`).join("")}</tr>
      ${metric("Skor value", (p) => p.value, (v) => v + "/100", "high")}
      <tr class="section-row"><th colspan="${cols}">Kualitas</th></tr>
      ${metric("Kualitas", (p) => p.quality, num, "high")}
      ${metric("Rating", (p) => p.rating, num, "high")}
      ${metric("Ketahanan", (p) => p.longevity, num, "high")}
      ${metric("Proyeksi", (p) => p.sillage, num, "high")}
      <tr class="section-row"><th colspan="${cols}">Notes <span class="muted small">— yang di-highlight dimiliki lebih dari satu parfum</span></th></tr>
      <tr><th>Asal · family</th>${items.map((p) => `<td>${esc(p.origin)} · ${esc(p.family)}</td>`).join("")}</tr>
      ${LAYERS.filter(([k]) => items.some((p) => hasLayer(p, k))).map(([k, label]) => noteRow(k, label)).join("")}
      <tr><th>Kemiripan notes</th><td colspan="${cols - 1}">${pairs.join(" &nbsp;·&nbsp; ")}</td></tr>
    </tbody>
  </table>`;
}

function renderSimilar(id) {
  const target = byId(id);
  const ranked = all
    .filter((p) => p.id !== id)
    .map((p) => ({ p, s: similarity(target, p) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8);

  $("#similarTitle").textContent = `Mirip ${target.name}`;
  $("#similarBody").innerHTML = ranked.length
    ? `<ul class="sim-list">${ranked.map(({ p, s }, i) => {
        const cheaper = p.ppm < target.ppm ? `<b style="color:var(--good)">lebih murah per ml</b> · ` : "";
        const common = commonNotes(p, target).slice(0, 6).map((n) => `<mark>${esc(n)}</mark>`).join(" ");
        return listItem(p, i, `<div class="small">${cheaper}Sama: ${common}</div>`, `<span class="sim-pct">${Math.round(s * 100)}%</span>`);
      }).join("")}</ul>`
    : '<p class="muted">Belum ada parfum dengan notes yang sama.</p>';
}

// ---------- aksi ----------

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  $("#toasts").append(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, 2200);
}

// Update tombol/kartu di tempat biar animasi grid nggak ke-reset.
function syncCompareUI() {
  $$("[data-card]").forEach((el) => el.classList.toggle("selected", state.compare.includes(el.dataset.card)));
  $$(".card-actions [data-compare]").forEach((btn) => {
    const p = byId(btn.dataset.compare);
    btn.outerHTML = compareBtn(p);
  });
  renderTray();
}

function toggleCompare(id) {
  const p = byId(id);
  const i = state.compare.indexOf(id);
  if (i >= 0) {
    state.compare.splice(i, 1);
  } else if (state.compare.length < MAX_COMPARE) {
    state.compare.push(id);
    toast(`${p.name} masuk perbandingan`);
  }
  syncCompareUI();
}

function toggleFav(id) {
  const p = byId(id);
  favs.has(id) ? favs.delete(id) : favs.add(id);
  save(KEY.fav, [...favs]);
  toast(favs.has(id) ? `♥ ${p.name} difavoritkan` : `${p.name} dihapus dari favorit`);
  $("#favCount").textContent = favs.size;
  if (state.favOnly) return render();
  $$(`[data-fav="${CSS.escape(id)}"]`).forEach((b) => {
    b.setAttribute("aria-pressed", favs.has(id));
    if (!b.classList.contains("fav")) b.textContent = favs.has(id) ? "♥ Favorit" : "♡ Favoritkan";
  });
}

function addNoteFilter(raw) {
  const n = norm(raw);
  if (n && !state.notes.includes(n)) state.notes.push(n);
  $("#noteInput").value = "";
  render();
}

function scrollToResults() {
  const top = $("#toolbar").getBoundingClientRect().top + scrollY;
  scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

function resetFilters() {
  Object.assign(state, { q: "", origin: "", gender: "", family: "", occasion: "", brand: "", notes: [], favOnly: false, maxPrice: Infinity });
  $("#q").value = "";
  $("#family").value = "";
  $("#occasion").value = "";
  ["#originSeg", "#genderSeg"].forEach((s) => setSeg(s, ""));
  $("#favToggle").setAttribute("aria-pressed", "false");
  setupFilters();
  render();
}

function setSeg(sel, v) {
  $$(`${sel} button`).forEach((b) => b.classList.toggle("on", b.dataset.v === v));
}

function countUp() {
  const target = {
    perfumes: all.length,
    brands: brands.length,
    local: all.filter((p) => p.origin === "Lokal").length,
    notes: new Set(all.flatMap((p) => [...p.noteSet])).size,
  };
  $$("[data-stat]").forEach((el) => {
    const to = target[el.dataset.stat];
    if (reduceMotion) return (el.textContent = to);
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function bindEvents() {
  let qTimer;
  $("#q").addEventListener("input", (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.q = e.target.value; render(); }, 150);
  });
  $("#q").addEventListener("keydown", (e) => { if (e.key === "Enter") scrollToResults(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !$("dialog[open]")) {
      e.preventDefault();
      $("#q").focus();
    }
  });

  [["#originSeg", "origin"], ["#genderSeg", "gender"], ["#viewSeg", "view"]].forEach(([sel, key]) =>
    $(sel).addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state[key] = b.dataset.v;
      setSeg(sel, b.dataset.v);
      render();
    }));
  $("#family").addEventListener("change", (e) => { state.family = e.target.value; render(); });
  $("#occasion").addEventListener("change", (e) => { state.occasion = e.target.value; render(); });

  $("#bestReal").addEventListener("change", (e) => { best.real = e.target.checked; renderBest(); });
  $("#quizBtn").addEventListener("click", () => openDlg($("#quizDlg")));
  $("#quizForm").addEventListener("submit", (e) => { e.preventDefault(); runQuiz(new FormData(e.target)); });
  $("#dupeBtn").addEventListener("click", () => { openDlg($("#dupeDlg")); $("#dupeSelect").focus(); });
  $("#dupeSelect").addEventListener("change", (e) => renderDupes(e.target.value));
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $("#maxPrice").addEventListener("input", (e) => {
    state.maxPrice = Number(e.target.value);
    $("#maxPriceOut").textContent = rupiah(state.maxPrice);
    clearTimeout(qTimer);
    qTimer = setTimeout(render, 120);
  });

  const noteInput = $("#noteInput");
  noteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addNoteFilter(noteInput.value); }
  });
  // Pilih dari datalist langsung jadi filter.
  noteInput.addEventListener("input", (e) => {
    if (e.inputType && e.inputType !== "insertReplacementText") return; // lagi ngetik manual
    const v = norm(noteInput.value);
    if ([...$("#noteList").options].some((o) => norm(o.value) === v)) addNoteFilter(v);
  });

  $("#favToggle").addEventListener("click", () => {
    state.favOnly = !state.favOnly;
    $("#favToggle").setAttribute("aria-pressed", state.favOnly);
    if (state.favOnly && !favs.size) toast("Belum ada favorit — klik ♥ di kartu parfum");
    render();
    scrollToResults();
  });

  $("#brandMore").addEventListener("click", () => {
    const g = $("#brandGrid");
    g.classList.toggle("collapsed");
    $("#brandMore").textContent = g.classList.contains("collapsed") ? "Tampilkan semua merek" : "Ringkas";
  });

  $("#themeBtn").addEventListener("click", () => {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    const cur = document.documentElement.dataset.theme || (dark ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY.theme, next); } catch {} // teks biasa, dibaca skrip di <head>
  });

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, li[data-detail]");
    if (!t) return;
    const d = t.dataset;
    if (d.compare) toggleCompare(d.compare);
    else if (d.fav) toggleFav(d.fav);
    else if (d.detail) {
      // Item daftar di dialog lain (mirip/dupe/kuis) → tutup dialognya dulu. Di dialog detail cukup ganti isinya.
      const dlg = t.closest("dialog");
      if (t.matches("li") && dlg && dlg.id !== "detailDlg") dlg.close();
      openDetail(d.detail);
      $("#detailDlg").scrollTop = 0;
    }
    else if (d.best) { best.tab = d.best; renderBest(); }
    else if (d.moreBrand) {
      const name = d.moreBrand;
      const closing = shown.brands.has(name);
      closing ? shown.brands.delete(name) : shown.brands.add(name);
      render(true);
      // Habis "Ringkas", balik ke judul mereknya biar nggak nyasar di tengah halaman.
      if (closing) document.getElementById(brandAnchor(name))?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    else if ("moreGrid" in d) { shown.grid += GRID_STEP; render(true); }
    else if ("moreBrands" in d) { shown.brandCount += BRAND_STEP; render(true); }
    else if ("toTop" in d) scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    else if ("quizAgain" in d) { $("#quizResult").innerHTML = ""; $("#quizForm").hidden = false; }
    else if (d.similar) { renderSimilar(d.similar); closeDlg($("#detailDlg")); openDlg($("#similarDlg")); }
    else if (d.brand !== undefined && t.classList.contains("brand-tile")) {
      state.brand = state.brand === d.brand ? "" : d.brand;
      render();
      scrollToResults();
    }
    else if (d.addnote) { closeDlg($("#detailDlg")); addNoteFilter(d.addnote); toast(`Filter notes: ${d.addnote}`); scrollToResults(); }
    else if (d.unnote) { state.notes = state.notes.filter((n) => n !== d.unnote); render(); }
    else if ("unbrand" in d) { state.brand = ""; render(); }
    else if ("unoccasion" in d) { state.occasion = ""; $("#occasion").value = ""; render(); }
    else if ("unfav" in d) { state.favOnly = false; $("#favToggle").setAttribute("aria-pressed", "false"); render(); }
    else if ("reset" in d) resetFilters();
    else if (d.delete) deleteCustom(d.delete);
    else if ("close" in d) closeDlg(t.closest("dialog"));
  });

  $("#clearCompare").addEventListener("click", () => { state.compare = []; syncCompareUI(); });
  $("#openCompare").addEventListener("click", () => { renderCompare(); openDlg($("#compareDlg")); });
  $("#addBtn").addEventListener("click", () => openDlg($("#addDlg")));
  $("#addForm").addEventListener("submit", addCustom);

  $$("dialog").forEach((d) => {
    d.addEventListener("click", (e) => { if (e.target === d) closeDlg(d); });
    d.addEventListener("cancel", (e) => { e.preventDefault(); closeDlg(d); });
  });

  // Tombol balik ke atas muncul setelah scroll agak jauh.
  const toTop = $("#toTop");
  addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 900), { passive: true });

  // Bayangan toolbar waktu nempel di atas.
  const sentinel = document.createElement("div");
  $("#toolbar").before(sentinel);
  new IntersectionObserver(([e]) => $("#toolbar").classList.toggle("stuck", !e.isIntersecting)).observe(sentinel);
}

async function addCustom(e) {
  e.preventDefault();
  const form = e.target;
  const f = new FormData(form);
  let image = String(f.get("imageUrl") || "").trim();
  const file = f.get("imageFile");
  if (file && file.size) {
    try {
      image = await fileToDataUrl(file);
    } catch {
      toast("Foto nggak bisa dibaca, coba file lain.");
      return;
    }
  }
  const split = (k) => String(f.get(k) || "").split(",").map((s) => s.trim()).filter(Boolean);
  const p = {
    id: "custom-" + Date.now(),
    name: f.get("name").trim(),
    brand: f.get("brand").trim(),
    origin: f.get("origin"),
    gender: f.get("gender"),
    family: f.get("family").trim(),
    conc: f.get("conc"),
    price: Number(f.get("price")),
    size: Number(f.get("size")),
    longevity: Number(f.get("longevity")),
    sillage: Number(f.get("sillage")),
    rating: Number(f.get("rating")),
    notes: { top: split("top"), middle: split("middle"), base: split("base") },
  };
  if (image) p.image = image;
  if (!save(KEY.custom, [...load(KEY.custom, []), p])) {
    toast("Gagal menyimpan — penyimpanan browser penuh?");
    return;
  }
  form.reset();
  closeDlg(form.closest("dialog"));
  toast(`${p.name} ditambahkan`);
  refresh();
}

function deleteCustom(id) {
  if (!confirm("Hapus parfum ini?")) return;
  save(KEY.custom, load(KEY.custom, []).filter((p) => p.id !== id));
  refresh();
}

function refresh() {
  rebuild();
  setupFilters();
  render();
  renderBest();
}

refresh();
bindEvents();
countUp();
$("#favCount").textContent = favs.size;
