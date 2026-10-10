// Shared: mobile menu, current-page highlight, footer year
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
const here = location.pathname.split("/").pop() || "index.html";
nav.querySelectorAll("a").forEach(a => {
  if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
});
document.getElementById("year").textContent = new Date().getFullYear();
