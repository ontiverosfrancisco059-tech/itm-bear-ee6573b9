/* BEAR · Ceviches & Cervezas Bien Frías — Campeche */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Año del footer */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Header al hacer scroll */
  var header = $("#header");
  var toTop = $("#toTop");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 480);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Menú móvil */
  var navToggle = $("#navToggle");
  var mobileNav = $("#mobileNav");

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    $$("a", mobileNav).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Filtro del menú */
  var tabs = $$(".menu-tab");
  var cards = $$(".menu-card");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      var filter = tab.dataset.filter;
      cards.forEach(function (card) {
        var show = filter === "todos" || card.dataset.cat === filter;
        card.classList.toggle("is-hidden", !show);
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      });
    });
  });

  /* Día de hoy en el horario */
  var dayMap = { 1: "lun-vie", 2: "lun-vie", 3: "lun-vie", 4: "lun-vie", 5: "lun-vie", 6: "sab", 0: "dom" };
  var todayKey = dayMap[new Date().getDay()];
  $$(".hours-table tr").forEach(function (row) {
    if (row.dataset.day === todayKey) row.classList.add("today");
  });

  /* Aparición al hacer scroll */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Utilidad de captura: ?reveal=1 muestra todo al cargar */
  if (/[?&]reveal=1/.test(location.search)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }
})();