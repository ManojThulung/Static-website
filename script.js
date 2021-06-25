"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////// SCROLL FUNCTION /////////////////////////////////////
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  // This is works for every browser from old to new
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });

  //Below is another modern method to scroll and works only for modern browser
  // section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////// PAGE NAVIGATION ///////////////////////////////////
// There are two ways to using scroll

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//another way which event delegation
// It is more efficient and effective than above method.
// 1. Add event listener to common parent element.
// 2. Determine what element originated the event.
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////// TABBED COMPONENT //////////////////////////////////
const btnTab = document.querySelector(".operations__tab-container");
const btnOperationTab = document.querySelectorAll(".operations__tab");
const operationContent = document.querySelectorAll(".operations__content");

btnTab.addEventListener("click", function (e) {
  const btn = e.target.closest(".operations__tab");
  if (!btn) return;
  // Remove active classes
  btnOperationTab.forEach((b) => b.classList.remove("operations__tab--active"));
  operationContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Add active btn
  btn.classList.add("operations__tab--active");

  // Add active operation content
  document
    .querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////// NAV FADE ANIMATION ///////////////////////////////
const nav = document.querySelector(".nav");

// Function to made fade opacity
const hoverEffects = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const navLink = e.target;
    const sibling = navLink.closest(".nav").querySelectorAll(".nav__link");
    const image = navLink.closest(".nav").querySelector("img");

    sibling.forEach((navItem) => {
      if (navItem !== navLink) {
        navItem.style.opacity = opacity;
      }
      image.style.opacity = opacity;
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  hoverEffects(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  hoverEffects(e, 1);
});

////////////////////////////////// STICKY NAVIGATION BAR /////////////////////////
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////// REVEAL SECTIONS //////////////////////////////////
const sections = document.querySelectorAll(".section");

const revealSection = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach((sec) => {
  sectionObserver.observe(sec);
  // sec.classList.add("section--hidden");
});
/////////////////////////// LAZY LOADING IMAGES /////////////////////////////
const images = document.querySelectorAll("img[data-src]");

const revealImage = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: "300px",
});

images.forEach((img) => imageObserver.observe(img));

/////////////////////////// TESTIMONIALS SLIDE FUNCTION //////////////////////////
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnSliderRight = document.querySelector(".slider__btn--right");
const btnSliderleft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");
let slideNo = 0;
// slider.style.transform = "scale(0.4) translateX(-500px)";
// slider.style.overflow = "visible";

// createing dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// hightlight active dot
const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const contentSlider = function (slideNo) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideNo)}%)`;
  });
};

const nextSlide = function () {
  if (slideNo === slides.length - 1) {
    slideNo = 0;
  } else {
    slideNo++;
  }
  contentSlider(slideNo);
  activeDot(slideNo);
};

const prevSlide = function () {
  if (slideNo === 0) {
    slideNo = slides.length - 1;
  } else {
    slideNo--;
  }
  contentSlider(slideNo);
  activeDot(slideNo);
};

const init = function () {
  contentSlider(0);
  createDots();
  activeDot(0);
};

init();

slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

btnSliderRight.addEventListener("click", nextSlide);
btnSliderleft.addEventListener("click", prevSlide);

// keyboard event handler
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    contentSlider(slide);
    activeDot(slide);
  }
});
