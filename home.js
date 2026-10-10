// ---- Squeeze ball ----
const ball = document.getElementById("ball");
const countEl = document.getElementById("count");
const msg = document.getElementById("ballMsg");
let count = 0;
const messages = {
  1: "That's it. Let your shoulders drop.",
  10: "Ten squeezes. Breathe out slowly.",
  25: "Notice your jaw. Unclench it.",
  50: "Fifty. You've earned a glass of water.",
  100: "A hundred squeezes! The real one lasts much longer."
};
function press() {
  if (ball.classList.contains("squeezed")) return;
  ball.classList.remove("bounce");
  ball.classList.add("squeezed");
  count++;
  countEl.textContent = count;
  if (messages[count]) msg.textContent = messages[count];
}
function release() {
  if (!ball.classList.contains("squeezed")) return;
  ball.classList.remove("squeezed");
  ball.classList.add("bounce");
}
ball.addEventListener("pointerdown", press);
["pointerup", "pointerleave", "pointercancel"].forEach(e => ball.addEventListener(e, release));
ball.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); press(); } });
ball.addEventListener("keyup", e => { if (e.key === " " || e.key === "Enter") release(); });
ball.addEventListener("animationend", () => ball.classList.remove("bounce"));

// ---- Testimonial slider ----
const slides = [
  { t: "I keep the putty in my pencil case. It got me through my final exams.", w: "Kofi, university student" },
  { t: "The lavender sachet is on my desk all day. My team keeps borrowing it.", w: "Efua, office manager" },
  { t: "The weighted pad helps me wind down after night shifts.", w: "Nana, nurse" },
  { t: "My kids fight over the spin ring. Honestly, so do I.", w: "Abena, parent of two" }
];
let i = 0, timer;
const slideText = document.getElementById("slideText");
const slideWho = document.getElementById("slideWho");
function show(n) {
  i = (n + slides.length) % slides.length;
  slideText.textContent = "\u201C" + slides[i].t + "\u201D";
  slideWho.textContent = slides[i].w;
}
function auto() {
  clearInterval(timer);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(i + 1), 6000);
}
document.getElementById("next").addEventListener("click", () => { show(i + 1); auto(); });
document.getElementById("prev").addEventListener("click", () => { show(i - 1); auto(); });
const sl = document.getElementById("slider");
sl.addEventListener("mouseenter", () => clearInterval(timer));
sl.addEventListener("mouseleave", auto);
show(0); auto();

// ---- Subscribe form ----
const form = document.getElementById("subForm");
const email = document.getElementById("subEmail");
const err = document.getElementById("subError");
const ok = document.getElementById("subOk");
form.addEventListener("submit", e => {
  e.preventDefault();
  const v = email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  ok.hidden = true;
  email.closest(".field").classList.toggle("invalid", !valid);
  if (!valid) {
    err.textContent = v ? "Enter an email like name@example.com." : "Enter your email address.";
    email.focus();
    return;
  }
  err.textContent = "";
  ok.textContent = "You're subscribed. Check " + v + " for a welcome note.";
  ok.hidden = false;
  form.reset();
});
