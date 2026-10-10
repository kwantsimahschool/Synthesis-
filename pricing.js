// ---- Data (edit here) ----
const plans = [
  { name: "Basic Box", monthly: 12, perks: ["1 stress reliever each month", "Free delivery over $30"], feat: false },
  { name: "Plus Box", monthly: 22, perks: ["2 stress relievers each month", "Free delivery", "Monthly breathing guide"], feat: true },
  { name: "Premium Box", monthly: 38, perks: ["3 relievers + 1 weighted item per quarter", "Free delivery", "Priority support", "Early access to new products"], feat: false }
];
const rows = [
  ["Items per month", "1", "2", "3"],
  ["Free delivery", "Over $30", "Yes", "Yes"],
  ["Breathing guide", "No", "Yes", "Yes"],
  ["Priority support", "No", "No", "Yes"],
  ["Early access", "No", "No", "Yes"]
];
const regular = [["Pebble Ball", 8], ["Knead Putty", 10], ["Spin Ring", 12], ["Lavender Sachet", 7], ["Focus Cube", 14], ["Weighted Lap Pad", 35]];

let yearly = false, picked = null;
const wrap = document.getElementById("plans");
const sw = document.getElementById("billing");
const pickMsg = document.getElementById("pickMsg");

function priceOf(p) { return yearly ? Math.round(p.monthly * 12 * 0.8) : p.monthly; }

function renderPlans() {
  wrap.innerHTML = "";
  plans.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "card plan" + (p.feat ? " featured" : "") + (picked === i ? " picked" : "");
    d.innerHTML = `<h3>${p.name}</h3><div class="price">$${priceOf(p)}<small> / ${yearly ? "year" : "month"}</small></div><ul>${p.perks.map(x => `<li>${x}</li>`).join("")}</ul><button class="btn">${picked === i ? "Selected" : "Choose plan"}</button>`;
    d.querySelector("button").addEventListener("click", () => { picked = i; update(); });
    wrap.appendChild(d);
  });
}
function renderCompare() {
  const t = document.getElementById("compare");
  const cls = i => picked === i ? ' class="col-picked"' : "";
  t.innerHTML = "<thead><tr><th>Feature</th>" + plans.map((p, i) => `<th${cls(i)}>${p.name}</th>`).join("") + "</tr></thead><tbody>" +
    rows.map(r => `<tr><td>${r[0]}</td>` + r.slice(1).map((c, i) => `<td${cls(i)}>${c}</td>`).join("") + "</tr>").join("") + "</tbody>";
}
function update() {
  renderPlans(); renderCompare();
  if (picked !== null) {
    const p = plans[picked];
    pickMsg.textContent = `${p.name}, billed ${yearly ? "yearly" : "monthly"}: $${priceOf(p)}${yearly ? " per year (you save $" + (p.monthly * 12 - priceOf(p)) + ")" : " per month"}.`;
    pickMsg.hidden = false;
  }
}
sw.addEventListener("click", () => {
  yearly = !yearly;
  sw.setAttribute("aria-checked", yearly);
  update();
});
document.querySelector("#regular tbody").innerHTML = regular.map(r => `<tr><td>${r[0]}</td><td>$${r[1]}</td></tr>`).join("");
update();
