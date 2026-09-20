(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var body = document.body;

  var navToggle = $('#navToggle');
  var header = $('#siteHeader');

  function closeMenu() {
    body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  $$('.nav-link, .nav-cta').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });

  function onScroll() {
    if (window.scrollY > 10) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    var toTop = $('.to-top');
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 480);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toTopBtn = $('.to-top');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeMenu();
    });
  }

  var PAPEL_COLORS = ['#b3202c', '#e08f15', '#f4b41a', '#1e7f46', '#14818e', '#d6367b'];

  $$('.js-papel').forEach(function (el) {
    var count = Math.max(8, Math.ceil((el.offsetWidth || 900) / 42));
    for (var i = 0; i < count; i++) {
      var flag = document.createElement('div');
      flag.className = 'flag';
      flag.style.setProperty('--fc', PAPEL_COLORS[i % PAPEL_COLORS.length]);
      flag.setAttribute('aria-hidden', 'true');
      el.appendChild(flag);
    }
  });

  var tabs = $$('.tab');
  var panels = $$('.menu-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        var active = panel.id === 'panel-' + tab.dataset.tab;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });

  var DAY_LABELS = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
  var today = new Date().getDay();
  var todayLabel = '';

  $$('.schedule li').forEach(function (row) {
    if (Number(row.getAttribute('data-day')) === today) {
      row.classList.add('is-today');
      todayLabel = row.querySelector('span').textContent;
    }
  });

  var statusEl = $('.about-card-status');
  var noteEl = $('.js-today-note');

  if (statusEl && todayLabel) {
    var hour = new Date().getHours();
    if (today === 0 && (hour < 9 || hour >= 15)) setClosed();
    else if (today === 6 && (hour < 8 || hour >= 22)) setClosed();
    else if (today >= 1 && today <= 5 && (hour < 7 || hour >= 21)) setClosed();
    else statusEl.textContent = 'Abierto el d\u00eda de hoy';
  }

  function setClosed() {
    statusEl.textContent = 'Cerrado por ahora';
    statusEl.classList.add('is-closed');
    if (noteEl) {
      noteEl.textContent = 'Hoy (' + todayLabel + ') te esperamos: ven al local, no cerramos temprano si hay hambre.';
      noteEl.classList.add('is-closed-note');
    }
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  var yearEl = $('.js-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();