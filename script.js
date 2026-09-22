(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      if (siteNav.classList.contains("open") && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && !hasReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("revealed");
    });
  }

  (function lightbox() {
    var lightboxEl = document.getElementById("lightbox");
    if (!lightboxEl) return;

    var lightboxImg = lightboxEl.querySelector("img");
    var lightboxCaption = lightboxEl.querySelector("figcaption");
    var closeBtn = lightboxEl.querySelector(".lightbox-close");

    function open(src, caption) {
      lightboxImg.src = src;
      lightboxImg.alt = caption || "Imagen ampliada de BEAR";
      if (lightboxCaption) {
        lightboxCaption.textContent = caption || "";
      }
      lightboxEl.classList.add("open");
      lightboxEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightboxEl.classList.remove("open");
      lightboxEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightboxImg.removeAttribute("src");
    }

    document.querySelectorAll(".gallery-open").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var full = btn.getAttribute("data-full");
        var captionText = btn.querySelector("figcaption");
        open(full, captionText ? captionText.textContent : "");
      });
    });

    closeBtn.addEventListener("click", close);
    lightboxEl.addEventListener("click", function (event) {
      if (event.target === lightboxEl) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  })();

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();