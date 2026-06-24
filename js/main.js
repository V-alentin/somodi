/* ==========================================================================
   Somodi Vendégház — interakciók
   Vanilla JS, nincs külső függőség.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Header: scroll állapot ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobil menü ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      // egyszerre csak egy nyitva (a szülő csoporton belül)
      const group = item.closest(".faq") || document;
      group.querySelectorAll(".faq__item.is-open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq__a").style.maxHeight = null;
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.maxHeight = open ? null : a.scrollHeight + "px";
    });
  });

  /* ---------- Carousel ---------- */
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector(".carousel__track");
    const slides = Array.from(root.querySelectorAll(".carousel__slide"));
    const prev = root.querySelector(".carousel__btn--prev");
    const next = root.querySelector(".carousel__btn--next");
    const dotsWrap = root.querySelector(".carousel__dots");
    if (!track || slides.length === 0) return;
    let idx = 0;

    // dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "carousel__dot" + (i === 0 ? " is-active" : "");
        b.type = "button";
        b.setAttribute("aria-label", "Kép " + (i + 1));
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
      });
    }

    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".carousel__dot").forEach((d, i) =>
          d.classList.toggle("is-active", i === idx)
        );
      }
    }
    if (prev) prev.addEventListener("click", () => go(idx - 1));
    if (next) next.addEventListener("click", () => go(idx + 1));

    // swipe
    let startX = 0;
    track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? idx + 1 : idx - 1);
    }, { passive: true });
  });

  /* ---------- Lightbox (galéria) ---------- */
  const lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const items = Array.from(document.querySelectorAll("[data-lb-src]"));
    let current = 0;

    const open = (i) => {
      current = i;
      lbImg.src = items[current].getAttribute("data-lb-src");
      lbImg.alt = items[current].getAttribute("data-lb-alt") || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const step = (d) => open((current + d + items.length) % items.length);

    items.forEach((it, i) => it.addEventListener("click", () => open(i)));
    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---------- Foglalási naptár (statikus demo) ---------- */
  const cal = document.querySelector("[data-calendar]");
  if (cal) {
    const titleEl = cal.querySelector(".cal__title");
    const grid = cal.querySelector(".cal__grid");
    const prevBtn = cal.querySelector('[data-cal="prev"]');
    const nextBtn = cal.querySelector('[data-cal="next"]');
    const MONTHS = ["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"];
    const DOW = ["H","K","Sze","Cs","P","Szo","V"];

    // Egy fix kezdőhónap, hogy ne függjön a Date.now()-tól a demo.
    // Néhány "foglalt" nap demonstrációként.
    let view = { y: 2026, m: 6 }; // 2026 Július (m = 0-index → 6)
    const booked = {
      "2026-6": [4, 5, 11, 12, 18, 19, 25, 26],
      "2026-7": [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
    };

    function render() {
      titleEl.textContent = MONTHS[view.m] + " " + view.y;
      grid.innerHTML = "";
      DOW.forEach((d) => {
        const el = document.createElement("div");
        el.className = "cal__dow";
        el.textContent = d;
        grid.appendChild(el);
      });
      const first = new Date(view.y, view.m, 1).getDay(); // 0=vas
      const offset = (first + 6) % 7; // hétfő-kezdés
      const days = new Date(view.y, view.m + 1, 0).getDate();
      for (let i = 0; i < offset; i++) {
        const e = document.createElement("div");
        e.className = "cal__day is-empty";
        grid.appendChild(e);
      }
      const key = view.y + "-" + view.m;
      const bookedDays = booked[key] || [];
      for (let d = 1; d <= days; d++) {
        const e = document.createElement("div");
        e.className = "cal__day";
        e.textContent = d;
        if (bookedDays.includes(d)) {
          e.classList.add("is-booked");
          e.title = "Foglalt";
        } else {
          e.addEventListener("click", () => {
            grid.querySelectorAll(".is-selected").forEach((x) => x.classList.remove("is-selected"));
            e.classList.add("is-selected");
            // ISO dátum (YYYY-MM-DD) az érkezés mezőhöz (type="date")
            const iso = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const erkezes = document.querySelector("#erkezes");
            if (erkezes) {
              erkezes.value = iso;
              // Ha a távozás üres vagy korábbi, állítsuk a következő napra alapként
              const tavozas = document.querySelector("#tavozas");
              if (tavozas && (!tavozas.value || tavozas.value <= iso)) {
                const nd = new Date(view.y, view.m, d + 1);
                tavozas.value = `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, "0")}-${String(nd.getDate()).padStart(2, "0")}`;
              }
            }
            // "Tovább a foglaláshoz" gomb megjelenítése a naptár alatt
            const goBtn = cal.querySelector("[data-cal-next-step]");
            if (goBtn) goBtn.style.display = "";
          });
        }
        grid.appendChild(e);
      }
    }
    prevBtn.addEventListener("click", () => {
      view.m--; if (view.m < 0) { view.m = 11; view.y--; }
      render();
    });
    nextBtn.addEventListener("click", () => {
      view.m++; if (view.m > 11) { view.m = 0; view.y++; }
      render();
    });

    // "Tovább a foglaláshoz" — az űrlaphoz görget és a Vezetéknév mezőre fókuszál
    const nextStep = cal.querySelector("[data-cal-next-step]");
    if (nextStep) {
      nextStep.addEventListener("click", () => {
        const form = document.querySelector("[data-form]");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "center" });
          const firstField = form.querySelector("#vezeteknev");
          if (firstField) setTimeout(() => firstField.focus(), 400);
        }
      });
    }
    render();
  }

  /* ---------- Foglalási űrlap (Web3Forms) ---------- */
  document.querySelectorAll("[data-form]").forEach((form) => {
    const ok = form.querySelector(".form-success");
    const errBox = form.querySelector(".form-error");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Kötelező mezők ellenőrzése (a novalidate miatt kézzel),
      // kiemelten a GDPR-hozzájárulásra.
      const consent = form.querySelector("#gdpr");
      if (consent && !consent.checked) {
        consent.setCustomValidity("A foglaláshoz el kell fogadnod az adatkezelési tájékoztatót.");
      } else if (consent) {
        consent.setCustomValidity("");
      }
      // Érkezés < távozás ellenőrzés
      const erk = form.querySelector("#erkezes");
      const tav = form.querySelector("#tavozas");
      if (erk && tav && erk.value && tav.value && tav.value <= erk.value) {
        tav.setCustomValidity("A távozás dátuma legyen későbbi az érkezésnél.");
      } else if (tav) {
        tav.setCustomValidity("");
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }

      // Ha az access key még a fejlesztői helykitöltő, ne küldjünk élesben — jelezzük.
      const keyField = form.querySelector('[name="access_key"]');
      const isDemo = !keyField || /YOUR-WEB3FORMS-ACCESS-KEY/.test(keyField.value);

      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.7"; }

      try {
        if (isDemo) {
          // Demo mód: nincs valódi kulcs, csak vizuális visszajelzés.
          await new Promise((r) => setTimeout(r, 300));
        } else {
          const res = await fetch(form.action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });
          const data = await res.json();
          if (!res.ok || !data.success) {
            throw new Error(data.message || "Ismeretlen hiba");
          }
        }

        if (ok) {
          ok.classList.add("is-visible");
          ok.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.querySelectorAll("input, textarea, select").forEach((f) => {
          if (f.type === "hidden") return;
          if (f.type === "checkbox" || f.type === "radio") f.checked = false;
          else if (f.type !== "submit") f.value = "";
        });
      } catch (err) {
        if (errBox) {
          errBox.style.display = "block";
          errBox.textContent =
            "Sajnos nem sikerült elküldeni a kérést. Kérjük, próbáld újra, vagy keress minket telefonon: +36 30 789 1496.";
          errBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ""; }
      }
    });
  });

  /* ---------- Aktuális év a footerben ---------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    // statikus, hogy ne kelljen Date — kézzel frissíthető
    yearEl.textContent = "2026";
  }
})();
