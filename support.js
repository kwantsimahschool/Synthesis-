// ---- Helplines: EDIT THESE with real numbers for your country and verify them on an official source ----
const helplines = [
  { name: "National suicide and crisis helpline", number: "", note: "+233 244 846 701" },
  { name: "Mental health support line", number: "", note: "0800 678 678" },
  { name: "Emergency services", number: "", note: "National Emergency SOS: 112" }
];

const list = document.getElementById("helplines");

helplines.forEach(h => {
  const li = document.createElement("li");
  li.className = "help";
  const has = h.number.trim() !== "";
  li.innerHTML = `<div><strong>${h.name}</strong><br><span class="muted">${has ? "Free and confidential where available" : h.note}</span></div>` +
    (has ? `<span class="num">${h.number}</span><span><a class="btn" href="tel:${h.number.replace(/\s/g, "")}">Call</a> <button class="btn ghost" data-copy="${h.number}">Copy number</button></span>` : "");
  list.appendChild(li);
});
list.addEventListener("click", async e => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copied"; }
  catch { b.textContent = "Select and copy manually"; }
  setTimeout(() => b.textContent = "Copy number", 2000);
});

// ---- Rotating quotes (fictional) ----
const quotes = [
  "I thought I had to be fine before I could ask for help. Asking was the start of being fine.",
  "Some days the win is just getting up. That counts.",
  "Telling one person changed everything. I wish I had done it sooner.",
  "The feeling passed. I'm glad I stayed to see it.",
  "Being kind to myself felt silly until it started working."
];
let q = 0;
const qt = document.getElementById("quoteText");
function showQuote() { qt.textContent = "\u201C" + quotes[q] + "\u201D"; }
document.getElementById("nextQuote").addEventListener("click", () => { q = (q + 1) % quotes.length; showQuote(); });
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(() => { q = (q + 1) % quotes.length; showQuote(); }, 9000);
showQuote();

// ---- Breathing guide (4 in, 6 out) ----
const br = document.getElementById("breather");
const bt = document.getElementById("breathText");
const bb = document.getElementById("breathBtn");
let running = false, bTimer;
bb.addEventListener("click", () => {
  running = !running;
  br.classList.toggle("run", running);
  bb.textContent = running ? "Stop" : "Start breathing guide";
  clearInterval(bTimer);
  if (running) {
    const tick = () => {
      bt.textContent = "Breathe in";
      setTimeout(() => { if (running) bt.textContent = "Breathe out"; }, 4000);
    };
    tick(); bTimer = setInterval(tick, 10000);
  } else bt.textContent = "Ready";
});
