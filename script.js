const header = document.querySelector(".site-header");
const mobileCall = document.querySelector(".mobile-call");
const calculatorInputs = {
  length: document.querySelector("#floor-length"),
  width: document.querySelector("#floor-width"),
  waste: document.querySelector("#floor-waste"),
  pack: document.querySelector("#floor-pack"),
};
const calculatorResults = {
  area: document.querySelector("#result-area"),
  total: document.querySelector("#result-total"),
  packs: document.querySelector("#result-packs"),
};
const formFields = document.querySelectorAll("input, select, textarea");
let isEditingForm = false;

const updateChrome = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  mobileCall?.classList.toggle("is-visible", window.scrollY > 420 && !isEditingForm);
};

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("load", updateChrome);
updateChrome();

const formatArea = (value) =>
  `${value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} m²`;

const readNumber = (input) => {
  if (!input) return 0;
  const normalized = input.value.replace(",", ".");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

const updateCalculator = () => {
  if (!calculatorResults.area) return;

  const length = readNumber(calculatorInputs.length);
  const width = readNumber(calculatorInputs.width);
  const waste = readNumber(calculatorInputs.waste);
  const pack = readNumber(calculatorInputs.pack);
  const area = length * width;
  const total = area * (1 + waste / 100);
  const packs = pack > 0 && total > 0 ? Math.ceil(total / pack) : 0;

  calculatorResults.area.textContent = formatArea(area);
  calculatorResults.total.textContent = formatArea(total);
  calculatorResults.packs.textContent = packs > 0 ? `${packs} pacz.` : "-";
};

Object.values(calculatorInputs).forEach((input) => {
  input?.addEventListener("input", updateCalculator);
  input?.addEventListener("change", updateCalculator);
  input?.addEventListener("keyup", updateCalculator);
});

window.calculateFloor = updateCalculator;
updateCalculator();

formFields.forEach((field) => {
  field.addEventListener("focus", () => {
    isEditingForm = true;
    updateChrome();
  });
  field.addEventListener("blur", () => {
    isEditingForm = false;
    updateChrome();
  });
});
