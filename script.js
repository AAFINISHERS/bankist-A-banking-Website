'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnOperation = document.querySelector('#btn--operation');
const btnFeatures = document.querySelector('#btn--features');
const btnTestmonials = document.querySelector('#btn--testmonials');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for the better experience of the user and improvement
 <button class='btn btn--close--cookie'>Got it!</button> `;
header.append(message);
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });
const scrollingTo = ElCordinates => {
  const cordinates = window.scrollTo({
    left: ElCordinates.left + window.pageXOffset,
    top: ElCordinates.top + window.pageYOffset,
    behavior: 'smooth',
  });
  return cordinates;
};
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function (e) {
  const s1Cordinates = section1.getBoundingClientRect();
  scrollingTo(s1Cordinates);
});
const section2 = document.querySelector('#section--2');
btnOperation.addEventListener('click', function (e) {
  const s2Coordinates = section2.getBoundingClientRect();
  scrollingTo(s2Coordinates);
});
btnFeatures.addEventListener('click', function (e) {
  const s1Cordinates = section1.getBoundingClientRect();
  scrollingTo(s1Cordinates);
});
const section3 = document.querySelector('#section--3');
btnTestmonials.addEventListener('click', function (e) {
  const s3Cordinates = section3.getBoundingClientRect();
  scrollingTo(s3Cordinates);
});
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // active content

  tabContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// the "bind" method does not work with the arrow function.

const handleHover = function (e) {
  const link = e.target;
  const navEl = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');
  navEl.forEach(el => {
    if (el !== link) el.style.opacity = this;
    logo.style.opacity = this;
  });
};
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const section = document.querySelectorAll('.section');
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

const scrollViewer = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const showView = new IntersectionObserver(scrollViewer, {
  root: null,
  threshold: 0.15,
});
section.forEach(function (section) {
  showView.observe(section);
  // section.classList.add('section--hidden');
});

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgTarget = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
const slideBtnRight = document.querySelector('.slider__btn--right');
const slideBtnLeft = document.querySelector('.slider__btn--left');
const dots = document.querySelector('.dots');

const sliderFunction = function () {
  const createDots = function (slides) {
    slides.forEach((_, i) =>
      dots.insertAdjacentHTML(
        'beforeend',
        `
    <button class='dots__dot' data-slide='${i}'></button>
  `
      )
    );
  };
  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(
        `.dots__dot[data-slide='${slide}']
    `
      )
      .classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDots(slide);
    activeDots(0);
  };

  let currSlide = 0;
  const maxSlide = slide.length - 1;

  const goToSlide = function (slides) {
    slide.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slides)}%)`)
    );
  };
  const nextSlide = function () {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else currSlide++;
    goToSlide(currSlide);
    activeDots(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else currSlide--;
    goToSlide(currSlide);
    activeDots(currSlide);
  };

  slideBtnRight.addEventListener('click', nextSlide);
  slideBtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
    e.key === 'ArrowRight' && nextSlide();
  });

  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('Dot');
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
  init();
};
sliderFunction();
