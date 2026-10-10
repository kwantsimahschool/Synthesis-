// ---- Product data (edit here) ----
const products = [
  { id: "pebble-ball", name: "Pebble Ball", cat: "Hands", price: 8, img: "images/pebble-ball.svg",
    text: "A soft, slow-rebound stress ball with a smooth pebble shape.",
    use: "Squeeze for 5 seconds, release for 5. Repeat 10 times." },
  { id: "knead-putty", name: "Knead Putty", cat: "Hands", price: 10, img: "images/knead-putty.svg",
    text: "Warm, quiet putty you can stretch, fold and press.",
    use: "Keep your hands busy during calls or study sessions." },
  { id: "spin-ring", name: "Spin Ring", cat: "Focus", price: 12, img: "images/spin-ring.svg",
    text: "A stainless steel ring with a spinning outer band.",
    use: "Spin slowly with your thumb when you need to stay seated and focused." },
  { id: "lavender-sachet", name: "Lavender Sachet", cat: "Scent", price: 7, img: "images/lavender-sachet.svg",
    text: "Dried lavender in a washable cotton pouch.",
    use: "Squeeze to release the scent, breathe in for 4 counts, out for 6." },
  { id: "weighted-pad", name: "Weighted Lap Pad", cat: "Comfort", price: 35, img: "images/weighted-pad.svg",
    text: "A 2 kg lap pad that feels like a steady hug.",
    use: "Rest it on your lap while reading, or on your chest while winding down." },
  { id: "focus-cube", name: "Focus Cube", cat: "Focus", price: 14, img: "images/focus-cube.svg",
    text: "A silent cube with clicky, rolling and spinning sides.",
    use: "Use it during meetings instead of tapping your pen." }
];
const users = {
  "Students": "Keep a putty or ball in your bag. Squeeze before an exam and during revision breaks. Quiet products mean no trouble in class.",
  "Office workers": "Use the Spin Ring or Focus Cube during calls. Keep a lavender sachet on the desk for a mid-afternoon reset.",
  "Parents": "Weighted pads and putty make a calm corner for kids and adults alike. Try a shared 'squeeze and breathe' minute after school.",
  "Night-shift workers": "The weighted pad and sachet help your body switch off when you get home."
};
const vid = { id: "REPLACE_WITH_YOUTUBE_ID" }; // e.g. "dQw4w9WgXcQ"

// ---- Filter + render ----
const grid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
const cats = ["All", ...new Set(products.map(p => p.cat))];
let active = "All";
function render() {
  grid.innerHTML = "";
  products.filter(p => active === "All" || p.cat === active).forEach(p => {
    const b = document.createElement("button");
    b.className = "card product";
    b.innerHTML = `<img src="${p.img}" alt="${p.name}"><div class="body"><span class="tag">${p.cat}</span><h3>${p.name}</h3><p>$${p.price}</p></div>`;
    b.addEventListener("click", () => openModal(p));
    grid.appendChild(b);
  });
}
cats.forEach(c => {
  const b = document.createElement("button");
  b.className = "chip"; b.textContent = c;
  b.setAttribute("aria-pressed", c === active);
  b.addEventListener("click", () => {
    active = c;
    filters.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  });
  filters.appendChild(b);
});
render();

// ---- Modal ----
const modal = document.getElementById("modal");
function openModal(p) {
  document.getElementById("mImg").src = p.img;
  document.getElementById("mImg").alt = p.name;
  document.getElementById("mTitle").textContent = p.name;
  document.getElementById("mText").textContent = p.text;
  document.getElementById("mUse").textContent = p.use;
  document.getElementById("mPrice").textContent = "$" + p.price;
  modal.showModal();
}
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// ---- Tabs ----
const tabs = document.getElementById("tabs");
const panel = document.getElementById("tabPanel");
Object.keys(users).forEach((k, idx) => {
  const b = document.createElement("button");
  b.className = "chip"; b.role = "tab"; b.textContent = k;
  b.addEventListener("click", () => {
    tabs.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-selected", x === b));
    panel.innerHTML = `<h3>${k}</h3><p>${users[k]}</p>`;
  });
  tabs.appendChild(b);
  if (idx === 0) b.click();
});

// ---- Video (loads only when clicked) ----
const video = document.getElementById("video");
if (vid.id.startsWith("REPLACE")) {
  video.innerHTML = `<div><strong>Tutorial video goes here</strong><p>Add your YouTube video ID in js/features.js</p></div>`;
} else {
  video.innerHTML = `<div><button id="playVid">Play tutorial</button></div>`;
  document.getElementById("playVid").addEventListener("click", () => {
    video.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${vid.id}?autoplay=1" title="Unclench tutorial" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  });
}
