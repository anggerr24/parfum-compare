// Gambaran wangi dari notes: ikon + frasa per notes, dan perumpamaan suasana.
// Ini tafsiran otomatis dari daftar notes, bukan hasil nyium langsung.

// [pola, ikon, frasa, suasana, bobot?]. Urutan penting: pola yang lebih spesifik di atas.
// Bobot < 1 buat notes "pengikat" yang ada di hampir semua parfum (musk, amber, kayu, nilam) biar nggak
// semua parfum jadi suasana hutan/laundry.
const NOTE_RULES = [
  [/orange blossom|neroli|lemon blossom|olive blossom|tobacco blossom/, "🌼", "bunga jeruk yang bersih", "bunga"],
  [/violet leaf|fig leaf|rhubarb leaves/, "🌿", "daun hijau segar", "herbal"],
  [/rose milk|rice milk|milk|rice/, "🥛", "susu hangat yang lembut", "kue"],
  [/bergamot/, "🍋", "jeruk bergamot yang segar", "jeruk"],
  [/grapefruit/, "🍊", "jeruk bali asem-seger", "jeruk"],
  [/lemon|lime|yuzu|citrus/, "🍋", "perasan lemon", "jeruk"],
  [/mandarin|tangerine|orange|chinotto|petitgrain/, "🍊", "kulit jeruk manis", "jeruk"],
  [/rose/, "🌹", "kelopak mawar", "bunga"],
  [/jasmine/, "🌸", "melati", "bunga"],
  [/tuberose/, "🤍", "sedap malam", "bunga"],
  [/frangipani|plumeria/, "🌺", "bunga kamboja", "bunga"],
  [/ylang/, "🌼", "kenanga", "bunga"],
  [/lavender/, "💜", "lavender ala barbershop", "barbershop"],
  [/iris|orris|violet|heliotrope|powdery/, "🪻", "bedak bayi yang halus", "laundry"],
  [/gardenia|osmanthus|honeysuckle|white flower|white floral|tropical flowers|biga|rangoon|velvety/, "🌸", "bunga putih", "bunga"],
  [/lily|muguet|freesia|peony|magnolia|hyacinth|mimosa|narcissus|lotus|orchid|carnation|marigold|geranium|bellflower|floral/, "💐", "buket bunga segar", "bunga"],
  [/coffee/, "☕", "kopi yang baru digiling", "kafe"],
  [/chocolate|cacao/, "🍫", "cokelat", "kue"],
  [/vanilla/, "🍦", "vanila manis", "kue", 0.8],
  [/caramel|praline|brown sugar|maltol|cotton candy|toffee|gourmand|edible|whipped|ice cream|creme|honey/, "🍮", "karamel & gula", "kue"],
  [/tonka/, "🍪", "biskuit hangat", "kue", 0.6],
  [/almond|pistachio|chestnut/, "🥜", "kacang panggang", "kue"],
  [/coconut/, "🥥", "kelapa muda", "pantai"],
  [/apple/, "🍏", "apel renyah", "buah"],
  [/pear/, "🍐", "pir berair", "buah"],
  [/berr|blackcurrant|cherry|strawberry|raspberry|pomegranate|grape/, "🍒", "buah beri", "buah"],
  [/rhubarb/, "🍒", "rhubarb asam", "buah"],
  [/peach|apricot|plum|quince|mango|papaya|pineapple|passion|lychee|melon|banana|tropical|dates|dried fruit|candied|sapodilla|fruit/, "🍑", "buah tropis", "buah"],
  [/cinnamon/, "🟤", "kayu manis", "rempah"],
  [/clove/, "🌰", "cengkeh", "rempah"],
  [/cardamom/, "🫛", "kapulaga", "rempah"],
  [/ginger/, "🫚", "jahe", "rempah"],
  [/pepper/, "🌶️", "lada yang pedas-segar", "rempah", 0.6],
  [/saffron|nutmeg|star anise|cumin|caraway|coriander|spic|licorice|elemi/, "✴️", "rempah hangat", "rempah"],
  [/tea|mate/, "🍵", "teh", "teh"],
  [/mint/, "🌱", "daun mint dingin", "barbershop"],
  [/basil|sage|rosemary|thyme|artemisia|bay leaf|juniper|santolina|herb|aromatic/, "🌿", "daun herbal", "barbershop"],
  [/green|grass|galbanum|bamboo|verbena|carrot/, "🌿", "rumput & daun hijau", "herbal"],
  [/sea|marine|water|aquatic|calone|salt|seaweed|posidonia|wet stones/, "🌊", "angin laut", "pantai"],
  [/solar|sun/, "☀️", "kulit hangat habis berjemur", "pantai"],
  [/mineral|metallic|gunsmoke|smoke/, "💨", "asap & mineral", "lounge"],
  [/oud/, "🪵", "kayu gaharu", "lounge"],
  [/sandalwood/, "🪵", "kayu cendana yang creamy", "hutan"],
  [/vetiver/, "🌾", "akar wangi", "hutan", 0.7],
  [/patchouli/, "🍂", "nilam yang earthy", "hutan", 0.5],
  [/moss|chypre/, "🌲", "lumut hutan", "hutan", 0.7],
  [/pine|fir/, "🌲", "pohon pinus", "hutan"],
  [/hay|sesame/, "🌾", "jerami & biji panggang", "hutan"],
  [/tobacco/, "🍂", "daun tembakau", "lounge"],
  [/leather|suede/, "🧥", "jaket kulit", "lounge"],
  [/rum|cognac|vodka|gin|liqueur|whisky/, "🥃", "minuman di bar", "lounge"],
  [/incense|olibanum|myrrh/, "🕯️", "asap dupa", "lounge"],
  [/ambroxan|ambergris|ambrox|orcanox/, "✨", "kulit bersih bermineral", "laundry", 0.5],
  [/amber|labdanum|benzoin|balsam|resin|tolu|peru/, "🔥", "resin hangat", "rempah", 0.5],
  [/cedar|wood|guaiac|cashmeran|akigalawood|mahogany|birch|oak|cypriol|papyrus|iso e|cashmere|clearwood|drywood/, "🪵", "serutan kayu", "hutan", 0.5],
  [/musk|ambrette|clean|cotton|linen|soap|aldehyde/, "🫧", "baju bersih wangi sabun", "laundry", 0.6],
];

const SCENES = {
  kue: { icon: "🧁", label: "Toko kue", text: "masuk toko kue pas roti & vanilanya baru keluar oven" },
  kafe: { icon: "☕", label: "Kafe", text: "nongkrong di kafe, aroma kopi baru digiling" },
  jeruk: { icon: "🍊", label: "Kebun jeruk", text: "ngupas jeruk pagi-pagi — seger dan bikin melek" },
  bunga: { icon: "💐", label: "Toko bunga", text: "lewat toko bunga yang buketnya baru dirangkai" },
  laundry: { icon: "🧺", label: "Baju bersih", text: "baju putih yang baru diangkat dari jemuran" },
  hutan: { icon: "🌲", label: "Hutan", text: "jalan di hutan pinus habis hujan, kayu dan tanah basah" },
  barbershop: { icon: "💈", label: "Barbershop", text: "barbershop klasik habis cukur, rapi dan maskulin" },
  rempah: { icon: "🌶️", label: "Rempah hangat", text: "toko rempah — lada, kayu manis, dan resin yang hangat berkarakter" },
  lounge: { icon: "🛋️", label: "Lounge mewah", text: "lounge hotel mewah: sofa kulit, kayu gelap, sedikit asap" },
  buah: { icon: "🧺", label: "Keranjang buah", text: "buka keranjang buah segar yang manis" },
  pantai: { icon: "🏖️", label: "Pantai", text: "angin pantai sore, kulit habis berjemur" },
  teh: { icon: "🍵", label: "Teh sore", text: "secangkir teh hangat di sore hari" },
  herbal: { icon: "🌿", label: "Taman hijau", text: "taman hijau habis disiram, daun dan rumput segar" },
};
// Kalau notes nggak ada yang cocok, pakai suasana dari family.
const FAMILY_SCENE = {
  Floral: "bunga", Fresh: "pantai", Woody: "hutan", Oriental: "rempah", Gourmand: "kue",
  Aromatic: "barbershop", Fruity: "buah", Leather: "lounge", Musky: "laundry",
};

const noteCache = new Map();
function noteInfo(note) {
  const n = note.toLowerCase();
  if (!noteCache.has(n)) {
    const r = NOTE_RULES.find(([re]) => re.test(n));
    noteCache.set(n, r ? { icon: r[1], phrase: r[2], scene: r[3], w: r[4] ?? 1 } : null);
  }
  return noteCache.get(n);
}

// Bobot layer: middle (heart) paling nentuin karakter; top cepat hilang, base kebanyakan pengikat.
const LAYER_WEIGHT = { top: 0.9, middle: 1.25, base: 0.9, all: 1 };

function scentProfile(p) {
  if (p._scent) return p._scent;
  const score = {};
  for (const [k, w] of Object.entries(LAYER_WEIGHT)) {
    (p.notes[k] || []).forEach((n, i) => {
      const info = noteInfo(n);
      if (info) score[info.scene] = (score[info.scene] || 0) + w * info.w * (i < 2 ? 1.2 : 1); // notes awal = paling dominan
    });
  }
  const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]).map(([s]) => s);
  const main = ranked[0] || FAMILY_SCENE[p.family] || "laundry";
  const second = ranked.find((s) => s !== main);
  const phrases = (k, max) => [...new Set((p.notes[k] || []).map((n) => noteInfo(n)?.phrase).filter(Boolean))].slice(0, max);
  const icons = (k, max) => [...new Set((p.notes[k] || []).map((n) => noteInfo(n)?.icon).filter(Boolean))].slice(0, max);

  const stages = p.notes.all
    ? [{ label: "Wanginya", icons: icons("all", 5), phrases: phrases("all", 4) }]
    : [
        { label: "Awal", hint: "0–15 menit", icons: icons("top", 3), phrases: phrases("top", 2) },
        { label: "Tengah", hint: "1–3 jam", icons: icons("middle", 3), phrases: phrases("middle", 2) },
        { label: "Akhir", hint: "nempel lama", icons: icons("base", 3), phrases: phrases("base", 2) },
      ].filter((s) => s.icons.length);

  const scene = SCENES[main];
  let analogy = `Kayak ${scene.text}`;
  if (second && score[second] >= (score[main] || 0) * 0.45) analogy += `, dengan sentuhan ${SCENES[second].label.toLowerCase()}`;
  analogy += ".";
  return (p._scent = { main, scene, second: second && SCENES[second], stages, analogy, strip: [...new Set(stages.flatMap((s) => s.icons))].slice(0, 5) });
}

const joinId = (arr) => (arr.length > 1 ? `${arr.slice(0, -1).join(", ")} dan ${arr.at(-1)}` : arr[0] || "");
