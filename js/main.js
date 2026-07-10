(() => {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".navbar nav");

  const setNavigation = (open) => {
    if (!navbar || !navToggle) return;
    navbar.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };

  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      setNavigation(!navbar.classList.contains("active"));
    });

    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavigation(false));
    });

    document.addEventListener("click", (event) => {
      if (navbar.classList.contains("active") && !navbar.contains(event.target)) {
        setNavigation(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavigation(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) setNavigation(false);
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.setAttribute("role", "button");
    question.setAttribute("tabindex", "0");
    question.setAttribute("aria-expanded", String(item.classList.contains("active")));

    const toggleFaq = () => {
      const willOpen = !item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("active", willOpen);
      question.setAttribute("aria-expanded", String(willOpen));
    };

    question.addEventListener("click", toggleFaq);
    question.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFaq();
      }
    });
  });

  const slides = [...document.querySelectorAll(".testimonial-card")];
  const previous = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let currentSlide = 0;
  const showSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? "block" : "none";
    });
  };
  if (slides.length) {
    showSlide(0);
    previous?.addEventListener("click", () => showSlide(currentSlide - 1));
    next?.addEventListener("click", () => showSlide(currentSlide + 1));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.target) || 0;
        const started = performance.now();
        const duration = 900;
        const render = (now) => {
          const progress = Math.min((now - started) / duration, 1);
          counter.textContent = Math.round(target * progress).toLocaleString() + "+";
          if (progress < 1) requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        observer.unobserve(counter);
      });
    }, { threshold: 0.35 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const topButton = document.createElement("button");
  topButton.type = "button";
  topButton.className = "top-btn";
  topButton.setAttribute("aria-label", "Back to top");
  topButton.textContent = "↑";
  document.body.append(topButton);

  const progress = document.createElement("div");
  progress.className = "progress";
  document.body.append(progress);

  const updateScrollUi = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0";
    topButton.style.opacity = window.scrollY > 600 ? "1" : "0";
    topButton.style.pointerEvents = window.scrollY > 600 ? "auto" : "none";
  };
  window.addEventListener("scroll", updateScrollUi, { passive: true });
  updateScrollUi();
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
