/* =========================================
   APP INITIALIZER
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initScrollSpy();
  initTestimonialCarousel();
  initRevealOnScroll();
  initScrollTopButton();
});


/* =========================================
   NAVBAR SCROLL SHRINK
========================================= */
function initNavbarScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const handleScroll = throttle(() => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }, 100);

  window.addEventListener("scroll", handleScroll);
}


/* =========================================
   BOOTSTRAP SCROLLSPY (SAFE INIT)
========================================= */
function initScrollSpy() {
  if (typeof bootstrap === "undefined") return;

  new bootstrap.ScrollSpy(document.body, {
    target: ".navbar",
    offset: 80,
  });
}


/* =========================================
   TESTIMONIAL CAROUSEL (SAFE INIT)
========================================= */
function initTestimonialCarousel() {
  if (typeof $ === "undefined" || !$.fn.owlCarousel) return;

  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 600,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
}


/* =========================================
   SCROLL REVEAL ANIMATIONS (OPTIMIZED)
========================================= */
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((el) => observer.observe(el));
}


/* =========================================
   SCROLL TO TOP BUTTON
========================================= */
function initScrollTopButton() {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';

  document.body.appendChild(btn);

  const handleScroll = throttle(() => {
    btn.classList.toggle("show", window.scrollY > 500);
  }, 100);

  window.addEventListener("scroll", handleScroll);

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}


/* =========================================
   UTILITY: THROTTLE (PERFORMANCE BOOST)
========================================= */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}