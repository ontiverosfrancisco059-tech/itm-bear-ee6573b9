/* BEAR · Ceviches y cervezas frías — interacciones del sitio */
(function () {
  "use strict";

  var WA_LINK = "https://wa.me/529811332914?text=" + encodeURIComponent("Hola BEAR, quiero hacer un pedido");

  /* ---------- año del pie ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- header pegajoso ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- menú móvil ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("nav-toggle");
  var closeBtn = document.getElementById("nav-close");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-locked", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  closeBtn.addEventListener("click", function () { setMenu(false); });
  nav.querySelectorAll("a:not(.nav__close)").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- revelados al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- pestañas del menú ---------- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      panels.forEach(function (p) {
        p.classList.toggle("is-active", p.dataset.panel === tab.dataset.tab);
      });
    });
  });

  /* ---------- widget de comentarios ---------- */
  var commentsRoot = document.getElementById("comments-root");
  if (commentsRoot) {
    var WIDGET_URL = "https://itm-void-excepcional.pages.dev/comments.js";
    var PROJECT_ID = "ee6573b9-d5de-47e8-b614-796d31124119";
    var PHONE_PUBLIC = false;
    var PUBLIC_IDENTITY = "display_name_only";
    var MODERATION_REQUIRED = true;
    var REQUIRE_GOOGLE_LOGIN = true;

    var script = document.createElement("script");
    script.src = WIDGET_URL;
    script.defer = true;
    script.setAttribute("data-widget", "comments");
    script.setAttribute("data-project-id", PROJECT_ID);
    script.setAttribute("data-container", "comments-root");
    script.setAttribute("data-phone-public", String(PHONE_PUBLIC));
    script.setAttribute("data-public-identity", PUBLIC_IDENTITY);
    script.setAttribute("data-moderation-required", String(MODERATION_REQUIRED));
    script.setAttribute("data-require-google-login", String(REQUIRE_GOOGLE_LOGIN));

    commentsRoot.setAttribute("data-project-id", PROJECT_ID);
    commentsRoot.setAttribute("data-widget", "comments");

    function markComments() {
      if (commentsRoot.childElementCount > 0 && commentsRoot.dataset.ready !== "1") {
        var loaders = commentsRoot.querySelectorAll(".comments__loading");
        loaders.forEach(function (n) { n.remove(); });
        commentsRoot.dataset.ready = "1";
      }
    }
    var mo = new MutationObserver(markComments);
    mo.observe(commentsRoot, { childList: true, subtree: true });

    document.head.appendChild(script);
    window.__BEAR_COMMENTS__ = { root: commentsRoot, markLoaded: markComments };
    window.addEventListener("load", function () {
      setTimeout(markComments, 900);
    });
  }
})();