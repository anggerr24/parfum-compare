// Pencarian: ngerti bahasa Indonesia (melati → jasmine, kopi → coffee, segar → fresh, …) dan toleran typo.
// Tiap kata di query harus cocok (AND); tiap kata boleh cocok lewat terjemahannya (OR).

const ID_EN = {
  // bunga
  "melati": ["jasmine"], "mawar": ["rose"], "sedap malam": ["tuberose"], "kenanga": ["ylang"], "kamboja": ["frangipani", "plumeria"],
  "anggrek": ["orchid"], "teratai": ["lotus", "water lily"], "lili": ["lily"], "bunga jeruk": ["orange blossom", "neroli"],
  "bunga": ["floral", "flower", "blossom", "rose", "jasmine", "peony", "lily", "iris", "violet", "tuberose", "freesia", "magnolia"],
  "bedak": ["iris", "orris", "violet", "heliotrope", "powdery"], "lavender": ["lavender"],
  // buah
  "jeruk": ["citrus", "bergamot", "mandarin", "orange", "lemon", "lime", "grapefruit", "yuzu", "tangerine", "neroli"],
  "lemon": ["lemon"], "jeruk nipis": ["lime"], "apel": ["apple"], "pir": ["pear"], "persik": ["peach"], "ceri": ["cherry"],
  "stroberi": ["strawberry"], "beri": ["berr", "blackcurrant", "raspberry"], "nanas": ["pineapple"], "mangga": ["mango"],
  "semangka": ["watermelon"], "melon": ["melon"], "kelapa": ["coconut"], "pisang": ["banana"], "anggur": ["grape"],
  "leci": ["lychee"], "delima": ["pomegranate"], "plum": ["plum"], "buah": ["fruity", "fruit", "apple", "pear", "peach", "berr", "cherry", "pineapple"],
  // manis / makanan
  "kopi": ["coffee"], "cokelat": ["chocolate", "cacao"], "coklat": ["chocolate", "cacao"], "vanila": ["vanilla"], "vanili": ["vanilla"],
  "karamel": ["caramel", "praline", "toffee"], "madu": ["honey"], "susu": ["milk"], "gula": ["sugar", "caramel", "cotton candy"],
  "kacang": ["almond", "pistachio", "praline", "chestnut"], "almon": ["almond"], "teh": ["tea"], "nasi": ["rice"], "beras": ["rice"],
  "manis": ["gourmand", "vanilla", "caramel", "praline", "honey", "sugar", "tonka", "chocolate", "candy"],
  "kue": ["gourmand", "vanilla", "tonka", "praline", "caramel"], "rum": ["rum"], "minuman": ["rum", "cognac", "whisky", "gin", "vodka", "liqueur"],
  // rempah
  "kayu manis": ["cinnamon"], "cengkeh": ["clove"], "kapulaga": ["cardamom"], "jahe": ["ginger"], "lada": ["pepper"], "merica": ["pepper"],
  "pala": ["nutmeg"], "kunyit": ["turmeric"], "adas": ["anise", "fennel"], "kemangi": ["basil"],
  "rempah": ["spic", "oriental", "pepper", "cinnamon", "clove", "cardamom", "nutmeg", "saffron", "ginger"],
  "pedas": ["pepper", "spic", "cinnamon", "ginger"], "safron": ["saffron"],
  // kayu & tanah
  "kayu": ["woody", "wood", "cedar", "sandalwood", "oud", "vetiver", "guaiac"], "cendana": ["sandalwood"], "gaharu": ["oud", "agarwood"],
  "nilam": ["patchouli"], "akar wangi": ["vetiver"], "lumut": ["moss"], "pinus": ["pine", "fir"], "tembakau": ["tobacco"],
  "kulit": ["leather", "suede"], "dupa": ["incense", "olibanum", "myrrh"], "kemenyan": ["benzoin", "incense"], "asap": ["smoke", "incense", "gunsmoke"],
  "ambar": ["amber"], "resin": ["resin", "labdanum", "benzoin"], "tanah": ["patchouli", "vetiver", "earthy"],
  // segar / bersih
  "segar": ["fresh", "citrus", "bergamot", "lemon", "marine", "aquatic", "mint", "green"], "seger": ["fresh", "citrus", "bergamot", "lemon", "marine"],
  "laut": ["marine", "sea", "aquatic", "salt", "calone"], "pantai": ["marine", "sea", "aquatic", "salt", "coconut", "solar"],
  "air": ["water", "aquatic", "marine"], "garam": ["salt"], "daun": ["leaf", "leaves", "green", "violet leaf"], "rumput": ["grass", "green"],
  "hijau": ["green"], "mint": ["mint"], "bersih": ["musk", "clean", "soap", "aldehyde", "cotton", "linen"], "sabun": ["soap", "musk", "aldehyde"],
  "kasturi": ["musk"], "musk": ["musk"], "herbal": ["aromatic", "sage", "rosemary", "basil", "thyme", "herb"],
  // orang & konsentrasi
  "cowok": ["pria"], "laki": ["pria"], "cewek": ["wanita"], "perempuan": ["wanita"], "unisex": ["unisex"],
  "lokal": ["lokal"], "impor": ["impor"], "luar": ["impor"], "tahan lama": ["extrait"],
};
// Kata umum yang nggak perlu dicocokkan.
const STOPWORDS = new Set(["parfum", "parfume", "perfume", "minyak", "wangi", "wangian", "aroma", "bau", "yang", "buat", "untuk",
  "dan", "atau", "kayak", "seperti", "ada", "dengan", "pake", "pakai", "notes", "note", "rasa", "nuansa", "the", "of"]);
// Frasa dua kata dicek duluan biar "kayu manis" nggak kepecah jadi "kayu" + "manis".
const PHRASES = Object.keys(ID_EN).filter((k) => k.includes(" ")).sort((a, b) => b.length - a.length);

function searchGroups(raw) {
  let q = " " + norm(raw).replace(/[^\p{L}\p{N}' ]+/gu, " ") + " ";
  const groups = [];
  for (const ph of PHRASES) {
    if (q.includes(" " + ph + " ")) {
      groups.push([ph, ...ID_EN[ph]]);
      q = q.replace(" " + ph + " ", " ");
    }
  }
  q.split(/\s+/).filter((w) => w && !STOPWORDS.has(w)).forEach((w) => groups.push([w, ...(ID_EN[w] || [])]));
  return groups;
}

// Teks yang dicari per parfum (nama, merek, notes, family, gender, asal, konsentrasi, suasana, tag acara).
function haystack(p) {
  if (!p._hay) {
    const notes = LAYERS.flatMap(([k]) => p.notes[k] || []).join(" ");
    const scene = typeof scentProfile === "function" ? scentProfile(p).scene.label : "";
    const tags = (p.tags || []).map((t) => TAGS[t].label).join(" ");
    p._hay = norm([p.name, p.brand, notes, p.family, p.gender, p.origin, CONC[p.conc] || "", scene, tags].join(" "))
      .normalize("NFKD").replace(/[̀-ͯ]/g, "");
    p._tokens = [...new Set(p._hay.split(/[^a-z0-9']+/).filter((t) => t.length > 2))];
  }
  return p._hay;
}

// Jarak edit (Levenshtein) dengan batas: berhenti cepat kalau udah lewat batas.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

function wordMatches(p, alts) {
  const hay = haystack(p);
  if (alts.some((a) => hay.includes(a))) return true;
  // Toleransi typo cuma buat kata asli user (bukan terjemahan), minimal 4 huruf.
  const w = alts[0];
  if (w.length < 4) return false;
  const max = w.length >= 7 ? 2 : 1;
  return p._tokens.some((t) => editDistance(w, t, max) <= max);
}

function matchesQuery(p, groups) {
  return groups.every((alts) => wordMatches(p, alts));
}

// Buat highlight notes di kartu: notes yang kena salah satu kata/terjemahan.
function noteHit(note, groups) {
  const n = norm(note);
  return groups.some((alts) => alts.some((a) => a.length > 2 && n.includes(a)));
}
