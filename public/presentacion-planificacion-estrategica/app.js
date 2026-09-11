(() => {
  "use strict";

  const deck = document.querySelector("#deck");
  const slides = [...document.querySelectorAll(".slide")];
  const previousButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const fullscreenButton = document.querySelector("#fullscreen");
  const helpButton = document.querySelector("#help");
  const closeHelpButton = document.querySelector("#close-help");
  const helpPanel = document.querySelector("#help-panel");
  const openContactFormLink = document.querySelector("#open-contact-form");
  const closeContactButton = document.querySelector("#close-contact");
  const contactPanel = document.querySelector("#contact-panel");
  const contactForm = document.querySelector("#contact-form");
  const counter = document.querySelector("#counter");
  const progress = document.querySelector("#progress i");
  const requestedSlide = Number.parseInt(new URLSearchParams(window.location.search).get("slide"), 10);

  let activeIndex = Number.isFinite(requestedSlide)
    ? Math.min(Math.max(requestedSlide - 1, 0), slides.length - 1)
    : 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function formatNumber(value) {
    return String(value).padStart(2, "0");
  }

  function updateScale() {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    document.documentElement.style.setProperty("--scale", String(scale));
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(activeIndex + 1));
    window.history.replaceState({}, "", url);
  }

  function showSlide(index, { updateHistory = true } = {}) {
    activeIndex = Math.min(Math.max(index, 0), slides.length - 1);

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-before", slideIndex < activeIndex);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    const activeSlide = slides[activeIndex];
    const title = activeSlide.dataset.title || "Presentación";
    counter.textContent = `${formatNumber(activeIndex + 1)} / ${formatNumber(slides.length)}`;
    progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
    document.title = `${title} | Anima Praxis`;

    if (updateHistory) updateUrl();
  }

  function next() {
    showSlide(activeIndex + 1);
  }

  function previous() {
    showSlide(activeIndex - 1);
  }

  function toggleHelp(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean"
      ? forceOpen
      : !helpPanel.classList.contains("open");
    helpPanel.classList.toggle("open", shouldOpen);
    helpPanel.setAttribute("aria-hidden", String(!shouldOpen));
    if (shouldOpen) closeHelpButton.focus();
  }

  function toggleContactForm(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean"
      ? forceOpen
      : !contactPanel.classList.contains("open");
    contactPanel.classList.toggle("open", shouldOpen);
    contactPanel.setAttribute("aria-hidden", String(!shouldOpen));
    if (shouldOpen) contactForm.elements.name.focus();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("El navegador no permitió activar la pantalla completa.", error);
    }
  }

  previousButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);
  fullscreenButton.addEventListener("click", toggleFullscreen);
  helpButton.addEventListener("click", () => toggleHelp());
  closeHelpButton.addEventListener("click", () => toggleHelp(false));
  helpPanel.addEventListener("click", (event) => {
    if (event.target === helpPanel) toggleHelp(false);
  });
  openContactFormLink.addEventListener("click", (event) => {
    event.preventDefault();
    toggleContactForm(true);
  });
  closeContactButton.addEventListener("click", () => toggleContactForm(false));
  contactPanel.addEventListener("click", (event) => {
    if (event.target === contactPanel) toggleContactForm(false);
  });
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const company = formData.get("company").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim() || "No informado";
    const message = formData.get("message").trim();
    const subject = `Solicitud de diagnóstico estratégico · ${company}`;
    const body = [
      "Solicitud de diagnóstico estratégico inicial y postulación al programa piloto.",
      "",
      `Nombre: ${name}`,
      `Empresa: ${company}`,
      `Correo: ${email}`,
      `Teléfono: ${phone}`,
      "",
      "Principal reto estratégico:",
      message,
    ].join("\n");
    window.location.href = `mailto:faviles@animapraxis.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (contactPanel.classList.contains("open")) {
      if (key === "escape") toggleContactForm(false);
      return;
    }

    if (helpPanel.classList.contains("open")) {
      if (key === "escape") toggleHelp(false);
      return;
    }

    if (["arrowright", "pagedown", " "].includes(key)) {
      event.preventDefault();
      next();
    } else if (["arrowleft", "pageup"].includes(key)) {
      event.preventDefault();
      previous();
    } else if (key === "home") {
      event.preventDefault();
      showSlide(0);
    } else if (key === "end") {
      event.preventDefault();
      showSlide(slides.length - 1);
    } else if (key === "f") {
      event.preventDefault();
      toggleFullscreen();
    } else if (key === "?") {
      event.preventDefault();
      toggleHelp(true);
    }
  });

  deck.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  deck.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX < 0 ? next() : previous();
    }
  }, { passive: true });

  window.addEventListener("resize", updateScale, { passive: true });
  window.addEventListener("popstate", () => {
    const slide = Number.parseInt(new URLSearchParams(window.location.search).get("slide"), 10);
    if (Number.isFinite(slide)) showSlide(slide - 1, { updateHistory: false });
  });

  updateScale();
  showSlide(activeIndex);
})();
