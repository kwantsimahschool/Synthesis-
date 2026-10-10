// Expandable founder biography
const btn = document.getElementById("bioBtn");
const more = document.getElementById("bioMore");
btn.addEventListener("click", () => {
  const open = more.hidden;
  more.hidden = !open;
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "Show less" : "Read more";
});
