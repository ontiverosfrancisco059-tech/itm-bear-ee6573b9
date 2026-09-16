(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var head = document.querySelector(".site-head");

  if (head) {
    var onScroll = function () {
      head.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú tabs ---------- */
  var tabs = document.querySelectorAll(".menu__tab");
  var panels = document.querySelectorAll(".menu__panel");

  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");

      Array.prototype.forEach.call(tabs, function (other) {
        other.classList.toggle("is-active", other === tab);
        other.setAttribute("aria-selected", other === tab ? "true" : "false");
      });

      Array.prototype.forEach.call(panels, function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-panel") === target);
      });
    });
  });

  /* ---------- Scroll spy (active nav link) ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (links.length && sections.length) {
    var spy = function () {
      var pos = window.scrollY + 120;
      var current = null;

      sections.forEach(function (section) {
        if (section.offsetTop <= pos) current = section.getAttribute("id");
      });

      if (pos + window.innerHeight >= document.body.scrollHeight) {
        current = sections[sections.length - 1].getAttribute("id");
      }

      links.forEach(function (link) {
        var id = link.getAttribute("href");
        link.classList.toggle("is-active", id === "#" + current);
      });
    };

    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".why__card, .menu__list .dish, .nos__plate, .nos__text, .visit__info, .visit__map, .hours__card"
    )
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el, index) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(index % 4, 3) * 0.08 + "s";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- "¿Estamos abiertos hoy?" ---------- */
  var hoursCard = document.querySelector(".hours__card");
  if (hoursCard) {
    var rows = hoursCard.querySelectorAll(".hours__list li");
    var note = hoursCard.querySelector(".hours__note");
    if (rows.length === 3 && note) {
      var dayIndex = new Date().getDay();
      var index = dayIndex === 0 || dayIndex === 6 ? (dayIndex === 6 ? 1 : 2) : 0;

      rows.forEach(function (row, i) {
        if (i === index) {
          row.classList.add("is-today");
          row.innerHTML =
            row.innerHTML +
            '<span class="hours__flag">Hoy</span>';
        }
      });

      var open = true;
      var range = "\u2014";

      if (dayIndex === 6) range = "8:00 a 22:00";
      else if (dayIndex === 0) range = "9:00 a 15:00";
      else range = "7:00 a 21:00";

      if (dayIndex === 0 && new Date().getHours() >= 15) open = false;
      else if (dayIndex === 1 && new Date().getHours() >= 22) open = false;

      note.textContent = open
        ? "\uD83C\uDF7B ¡Hoy estamos abiertos de " + range + "! Pásale a sentarte."
        : "Hoy ya cerramos (" + range + "), pero mañana te esperamos. \uD83D\uDC4B";
    }
  }
})();