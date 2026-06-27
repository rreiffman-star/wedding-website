import "./styles.css";

const PASSWORD = "stephross2026";
const STORAGE_KEY = "ross-stephanie-wedding-access";

const passwordScreen = document.querySelector("#passwordScreen");
const siteShell = document.querySelector("#siteShell");
const form = document.querySelector("#passwordForm");
const input = document.querySelector("#passwordInput");
const error = document.querySelector("#passwordError");
const interactiveMarks = document.querySelectorAll(".interactive-gondolier");

let pointerFrame = 0;

function setMotionVars(clientX, clientY) {
  const x = clientX / window.innerWidth - 0.5;
  const y = clientY / window.innerHeight - 0.5;
  document.documentElement.style.setProperty("--pointer-x", x.toFixed(4));
  document.documentElement.style.setProperty("--pointer-y", y.toFixed(4));
}

function wakeMark(mark) {
  mark.classList.remove("is-awake");
  window.requestAnimationFrame(() => {
    mark.classList.add("is-awake");
  });
}

function unlockSite() {
  passwordScreen.classList.add("hidden");
  siteShell.classList.remove("locked");
  document.body.classList.add("is-unlocked");
  interactiveMarks.forEach((mark, index) => {
    window.setTimeout(() => wakeMark(mark), index * 120);
  });
}

if (sessionStorage.getItem(STORAGE_KEY) === "granted") {
  unlockSite();
} else {
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim() === PASSWORD) {
    sessionStorage.setItem(STORAGE_KEY, "granted");
    unlockSite();
    return;
  }

  error.textContent = "That password did not work. Please try again.";
  input.select();
});

window.addEventListener(
  "pointermove",
  (event) => {
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      setMotionVars(event.clientX, event.clientY);
      pointerFrame = 0;
    });
  },
  { passive: true },
);

window.addEventListener(
  "scroll",
  () => {
    const scrollRatio = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    document.documentElement.style.setProperty("--scroll-y", scrollRatio.toFixed(4));
  },
  { passive: true },
);

interactiveMarks.forEach((mark) => {
  mark.addEventListener("click", () => wakeMark(mark));
  mark.addEventListener("animationend", (event) => {
    if (event.animationName === "gondolaWake") {
      mark.classList.remove("is-awake");
    }
  });
});
