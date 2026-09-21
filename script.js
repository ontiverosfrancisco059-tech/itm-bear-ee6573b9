(() => {
  "use strict";

  const WA_NUMBER = "529811332914";

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    const closeNav = () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    mainNav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", closeNav)
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- Active section highlight ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- WhatsApp order buttons pre-fill the dish ---------- */
  document.querySelectorAll(".dish-name").forEach((dishNameEl) => {
    const dishName = dishNameEl.textContent.trim();
    const priceEl =
      dishNameEl.parentElement?.querySelector?.(".dish-price");
    const price = priceEl ? ` ${priceEl.textContent.trim()}` : "";
    const dish = `${dishName}${price}`;

    const link = document.createElement("a");
    link.className = "dish-order";
    link.textContent = "Pedir";
    link.href =
      `https://wa.me/${WA_NUMBER}?text=` +
      encodeURIComponent(
        `¡Hola BEAR! 🍤 Quiero pedir: ${dish}`
      );
    link.target = "_blank";
    link.rel = "noopener";

    dishNameEl.parentElement.appendChild(link);
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow =
        window.scrollY > 8
          ? "0 6px 22px rgba(0,0,0,0.34)"
          : "0 4px 18px rgba(0,0,0,0.28)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();