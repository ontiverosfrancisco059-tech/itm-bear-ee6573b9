(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  var year = document.getElementById("year");

  function toggleNav(force) {
    var open = typeof force === "boolean" ? force : !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      toggleNav();
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggleNav(false);
      });
    });
  }

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
    highlightActiveLink();
  }

  function highlightActiveLink() {
    if (!nav) return;
    var links = nav.querySelectorAll('a[href^="#"]');
    var pos = window.scrollY + header.offsetHeight + 120;
    var current = null;

    links.forEach(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      if (target.offsetTop <= pos) {
        current = link;
      }
    });

    links.forEach(function (link) {
      link.classList.toggle("active", link === current);
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();