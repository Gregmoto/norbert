const header = document.querySelector(".site-header");
const mobileCall = document.querySelector(".mobile-call");

const updateChrome = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  mobileCall?.classList.toggle("is-visible", window.scrollY > 420);
};

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("load", updateChrome);
updateChrome();
