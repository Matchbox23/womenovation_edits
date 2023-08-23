("use strict");

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight == 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) {
    document.body.classList.add("non-flexbox-gap");
  }
}
checkFlexGap();

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

/*
// Articles More Btn
buttonEl = document.querySelector(".articles-btn");
let hide = false;

buttonEl.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(hide);
  if (!hide) {
    var el = document.querySelector(".row--hidden");
    if (el) {
      el.classList.remove("row--hidden");
      if (!document.querySelector(".row--hidden")) {
        hide = true;
        buttonEl.innerHTML = "Hide Articles";
      }
    }
  } else {
    var cards = document.getElementsByClassName("card-row");
    buttonEl.innerHTML = "More Articles";
    for (var i = 1; i < cards.length; i++) {
      cards[i].classList.add("row--hidden");
      hide = false;
    }
  }
});
*/

// Animations
const allSections = document.querySelectorAll(".u-toAnimate");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  var animation = entry.target.getAttribute("animation");
  entry.target.classList.add("animate__animated");
  entry.target.classList.add(`animate__${animation}`);
  entry.target.classList.add("u-visible");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Sticky navigation
const sectionHeroElement = document.querySelector(".hero");

const observer = new IntersectionObserver(
  function (enteries) {
    const ent = enteries[0];
    const bodyElement = document.querySelector("body");
    if (!ent.isIntersecting) {
      bodyElement.classList.add("sticky");
    } else {
      bodyElement.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);
observer.observe(sectionHeroElement);

// Modals
let currentModal = "";

const body = document.querySelector("body");
const html = document.querySelector("html");
const openModal = document.querySelectorAll(".open-modal");
const closeModal = document.querySelectorAll(".modal__close");
const overlay = document.querySelector(".overlay");

function closeFunction() {
  document.querySelector(`.modal-${currentModal}`).classList.add("hidden");
  body.style.overflowY = "inherit";
  html.style.overflowY = "inherit";
  console.log(currentModal);
  overlay.classList.add("hidden");
  currentModal = "";
}

for (let i = 0; i < openModal.length; i++) {
  openModal[i].addEventListener("click", function () {
    let classes = openModal[i].classList;
    currentModal = classes[2];
    document.querySelector(`.modal-${currentModal}`).classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    body.style.overflowY = "hidden";
    html.style.overflowY = "hidden";
  });
}

for (let i = 0; i < closeModal.length; i++) {
  closeModal[i].addEventListener("click", function () {
    closeFunction();
  });
}

document
  .querySelector(".clickable-overlay")
  .addEventListener("click", function () {
    closeFunction();
  });

document.addEventListener("keydown", function (k) {
  if (currentModal != "" && k.key == "Escape") closeFunction();
});

// Mobile navigation
const menuBtn = document.querySelector(".nav-mobile");
const header = document.querySelector(".nav");

menuBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");

  document.querySelector("html").classList.toggle("u-no-overflow");
  document.querySelector("body").classList.toggle("u-no-overflow");
});

// Smooth scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    if (href === "#") {
      e.preventDefault();
    } else if (href.startsWith("#") && href != "#carouselExampleIndicators") {
      e.preventDefault();
      const sectionElement = document.querySelector(href);
      sectionElement.scrollIntoView({ behavior: "smooth" });
      header.classList.remove("nav-open");
    }
  });
});
