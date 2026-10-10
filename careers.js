// ---- Open roles ----
const roles = [
  { t: "Customer support", k: "Employee", v: "Customer support (employee)", d: "Help customers pick the right product and fix delivery issues." },
  { t: "Product designer", k: "Employee", v: "Product designer (employee)", d: "Design new tactile products and test them with real users." },
  { t: "Marketing intern", k: "Intern", v: "Marketing intern", d: "Write posts, help run campaigns and learn on the job. 3 months." }
];
const roleSel = document.getElementById("role");
document.getElementById("roles").innerHTML = roles.map((r, i) =>
  `<div class="card"><span class="tag">${r.k}</span><h3>${r.t}</h3><p>${r.d}</p><button class="btn ghost" data-i="${i}">Apply</button></div>`).join("");
document.getElementById("roles").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  roleSel.value = roles[b.dataset.i].v;
  validate(roleSel);
  document.getElementById("appForm").scrollIntoView();
  document.getElementById("name").focus();
});

// ---- Validation rules: each returns an error string or "" ----
const rules = {
  role: v => v ? "" : "Choose a role.",
  name: v => /^[A-Za-z][A-Za-z'.\- ]{1,}$/.test(v.trim()) && v.trim().includes(" ") ? "" : "Enter your first and last name (letters only).",
  age: v => { const n = Number(v); return v !== "" && Number.isInteger(n) && n >= 16 && n <= 70 ? "" : "Enter a whole number between 16 and 70."; },
  exp: v => { const n = Number(v); return v !== "" && n >= 0 && n <= 50 ? "" : "Enter years of experience (0 if none)."; },
  nation: v => /^[A-Za-z][A-Za-z \-]+$/.test(v.trim()) ? "" : "Enter your nationality, e.g. Ghanaian.",
  address: v => v.trim().length >= 8 ? "" : "Enter your full address (at least 8 characters).",
  home: v => /^[+\d][\d\s\-]{6,14}$/.test(v.trim()) ? "" : "Enter a valid phone number (7 to 15 digits).",
  mobile: v => /^[+\d][\d\s\-]{8,14}$/.test(v.trim()) ? "" : "Enter a valid mobile number (9 to 15 digits).",
  reason: v => { const w = words(v); return w < 30 ? "Write at least 30 words (you have " + w + ")." : w > 150 ? "Keep it under 150 words (you have " + w + ")." : ""; }
};
const words = s => s.trim() ? s.trim().split(/\s+/).length : 0;
const form = document.getElementById("appForm");
const terms = document.getElementById("terms");
const submit = document.getElementById("submitBtn");
const touched = new Set();

function validate(el) {
  const msg = rules[el.id](el.value);
  const field = el.closest(".field");
  field.classList.toggle("invalid", !!msg);
  field.querySelector(".error").textContent = msg;
  return !msg;
}
function allValid() { return Object.keys(rules).every(id => !rules[id](document.getElementById(id).value)); }
function gate() { submit.disabled = !(terms.checked && allValid()); }

Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => { touched.add(id); validate(el); gate(); });
  el.addEventListener("input", () => { if (touched.has(id)) validate(el); gate(); });
});
terms.addEventListener("change", gate);

// ---- Live word counter ----
const reason = document.getElementById("reason");
const wc = document.getElementById("wordCount");
reason.addEventListener("input", () => {
  const w = words(reason.value);
  wc.textContent = w + " / 150 words (minimum 30)";
});

// ---- Submit ----
form.addEventListener("submit", e => {
  e.preventDefault();
  const bad = Object.keys(rules).map(id => document.getElementById(id)).filter(el => !validate(el));
  if (bad.length) { bad[0].focus(); return; }
  const out = document.getElementById("result");
  out.textContent = `Thank you, ${document.getElementById("name").value.trim()}. Your application for "${roleSel.value}" has been received. We'll reply to ${document.getElementById("mobile").value.trim()} within 5 working days.`;
  out.hidden = false;
  out.focus();
  form.reset(); touched.clear(); wc.textContent = "0 / 150 words (minimum 30)";
  submit.disabled = true;
});
