"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollInTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth Scroll Behavior

btnScrollInTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// navigation scroll

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tapped component

tabsContainer.addEventListener("click", function (e) {
  // پیدا کردن دکمه کلیک شده و ریختن تمامی مشخصات آن در متغیر
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  // حذف کردن تمام کلاس های اکتیو از روی تب ها
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  // اضافه کردن کلاس اکتیو به تب کلیک شده
  clicked.classList.add("operations__tab--active");

  // حذف کردن تمام کلاس های اکتیو از روی تب کانتنت ها
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // اضافه کردن کلاس اکتیو به تب کانتنت کلیک شده
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// nav hover

// برای اینکه جلوگیری بکنیم از تکرار کد این فانکشن رو ساختیم
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    // روی هر دکمه هاور باشیم اطلاعاتش میریزه تو این متغیر
    const link = e.target;
    // با استفاده از متغیر لینک میایم همه دکمه های نویگیشن رو انتخاب میکنیم و میریزیم تو این متغیر
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// این برای اینه که وقتی ماوس وارد این فضا میشه
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

// اینم برای اینه که وقتی ماوس از این فضا خارج میشه
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// Sticky navigation

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// کالبک
const stickyNav = function (entries) {
  // چون یدونه درصد ترشئلد داریم اینکار رو کردیم و لازم نیست از فورایچ استفاده کنیم
  const [entry] = entries;

  // این شرط رو به خاطر این گذاشتیم که چون تو حالت اول که همه ویو چورت مشخص هستش و هدر چسبیده به نویگیشن هم درصد صفر حساب میشه ولی ما میخوایم هم درصد صفر باشه هم وقتی که بخش هدر دیده نشه واسه همین این شرط رو گذاشتیم که دیده شدن صفحه هدر فالس باشه
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
// آپشن
const opsObserve = {
  // وقتی نال میذاریم بر اساس ویوپورت تصمیم میگیره
  root: null,
  // صفر درصد یعنی وقتی از دید خارج شد
  threshold: 0,
  // اینم یعنی وقتی انقدر پیکسل مونده برسی به اون سکشن نویگیشن رو بیار
  rootMargin: `-${navHeight}px`,
};

const headerObserve = new IntersectionObserver(stickyNav, opsObserve);

// اینو باید صدا کنی چون بالا توی متغیر گذاشتی
headerObserve.observe(header);

// آشکار سازی سکشن ها (Reveals Section)

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// چون تعداد عناصری که میخوایم آبزیرو کنیم از یدونه بیشتر هستن از این روش استفاده میکنیم
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading

const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    // reaplace img with data src img
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTarget.forEach((img) => imgObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  let curSlide = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelector(".dots");

  // ساختن دات ها
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  // فعال کردن دات
  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dots) => dots.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  activateDots(0);

  // تابع رفتن به اسلاید بعدی و قبلی
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const pervSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  // این همان کار این را میکند
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  goToSlide(0);

  // next slide
  btnRight.addEventListener("click", nextSlide);

  // previes slide
  btnLeft.addEventListener("click", pervSlide);

  // استغده از کلید های کیبورد برای جا به جا شدن
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") pervSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDots(curSlide);
    }
  });
}
slider()