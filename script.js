/* ==========================================================================
   CYBERSECURITY PORTFOLIO — script.js
   Vanilla JS, no build step, no dependencies.
   ========================================================================== */

/* ---------------------------------------------------------------------
   1. CONFIG — edit these values once and they propagate to every
   matching element in index.html automatically (hero, about, contact,
   footer). This is the only place you should need to put your details.
   --------------------------------------------------------------------- */
const CONFIG = {
  name: "ABAIDULLAH",
  initials: "ubi.sec",
  roles: ["Red Teaming", "Penetration Testing", "Offensive Security", "Ethical Hacking", "Cybersecurity"],
  email: "abaidullahali92@gmail.com",
  github: "https://github.com/ubi-sec",
  linkedin: "https://www.linkedin.com/in/abaid-ullah-1229492ba/",
  location: "Faisalabad Pakistan",
  availability: "Open to Red Team, Penetration Testing & Cybersecurity opportunities",
  resumePath: "assets/resume.pdf",
  htbProfile: "https://profile.hackthebox.com/profile/01a02c04-9cd2-702d-9252-3274354377aa?utm_medium=copy_url",
  thmProfile: "https://tryhackme.com/p/ABAIDULLAH",
  thmUsername: "ABAIDULLAH"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------
   2. Apply CONFIG to the DOM
   --------------------------------------------------------------------- */
function applyConfig() {
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const key = el.getAttribute("data-cfg");
    if (CONFIG[key] !== undefined) el.textContent = CONFIG[key];
  });

  document.querySelectorAll("[data-cfg-href]").forEach((el) => {
    const key = el.getAttribute("data-cfg-href");
    const map = {
      email: `mailto:${CONFIG.email}`,
      github: CONFIG.github,
      linkedin: CONFIG.linkedin,
      resume: CONFIG.resumePath,
      htb: CONFIG.htbProfile,
      thm: CONFIG.thmProfile
    };
    if (map[key]) el.setAttribute("href", map[key]);
  });

  document.title = `${CONFIG.name} — Red Teaming & Penetration Testing`;
}

/* ---------------------------------------------------------------------
   3. Mobile navigation (hamburger menu)
   --------------------------------------------------------------------- */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openNav = () => {
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeNav() : openNav();
  });

  nav.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeNav();
  });
}

/* ---------------------------------------------------------------------
   4. Header state on scroll + active-link scrollspy
   --------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  let ticking = false;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();
}

function initScrollSpy() {
  const sections = document.querySelectorAll("main .section, .hero");
  const links = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  const linkFor = (id) =>
    document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          const active = linkFor(entry.target.id);
          if (active) active.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((s) => {
    if (s.id) observer.observe(s);
  });
}

/* ---------------------------------------------------------------------
   5. Scroll-reveal animations
   --------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   6. Hero role typewriter
   --------------------------------------------------------------------- */
function initRoleTypewriter() {
  const el = document.getElementById("role-text");
  if (!el) return;
  const roles = CONFIG.roles.length ? CONFIG.roles : ["Cybersecurity Professional"];

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1700);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  };

  setTimeout(tick, 500);
}

/* ---------------------------------------------------------------------
   7. Animated stat counters
   --------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1100;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   8. TryHackMe badge (with graceful fallback if it fails to load)
   --------------------------------------------------------------------- */
function initThmBadge() {
  const img = document.getElementById("thm-badge");
  const fallback = document.getElementById("thm-badge-fallback");
  if (!img || !fallback || !CONFIG.thmUsername) return;

  img.addEventListener("load", () => {
    img.style.display = "block";
    fallback.style.display = "none";
  });
  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "flex";
  });

  img.src = `https://tryhackme-badges.s3.amazonaws.com/${CONFIG.thmUsername}.png`;
}

/* ---------------------------------------------------------------------
   9. Contact form (mailto fallback — no backend required)
   To collect submissions server-side instead, point this form at a
   service like Formspree or EmailJS and replace the body of
   handleSubmit() with a fetch() call to that service.
   --------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fields = ["name", "email", "subject", "message"];

  const setError = (field, message) => {
    const row = document.getElementById(field).closest(".form-row");
    const errorEl = document.getElementById(`${field}-error`);
    row.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach((field) => {
      const value = document.getElementById(field).value.trim();
      if (!value) {
        setError(field, "This field is required.");
        valid = false;
      } else if (field === "email" && !isValidEmail(value)) {
        setError(field, "Enter a valid email address.");
        valid = false;
      } else {
        setError(field, "");
      }
    });

    if (!valid) {
      status.textContent = "Please fix the highlighted fields.";
      status.classList.add("is-error");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const body = `From: ${name} (${email})\n\n${message}`;
    const mailto = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.classList.remove("is-error");
    status.textContent = "Opening your email client to send this message...";
    window.location.href = mailto;
    form.reset();
  });
}

/* ---------------------------------------------------------------------
   10. Subtle real-time 3D background (Three.js — network of nodes)
   Loaded from a CDN only when motion is allowed, so reduced-motion
   visitors never download it at all. If it fails to load for any
   reason (offline, blocked, no WebGL), the page's existing CSS
   dot-grid pattern remains as the visual fallback — nothing breaks.
   --------------------------------------------------------------------- */
function loadThreeAndInitBackground() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  script.async = true;
  script.onload = () => initBackground3D(canvas);
  script.onerror = () => {};
  document.head.appendChild(script);
}

function initBackground3D(canvas) {
  if (typeof THREE === "undefined") return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return;
  }

  const isSmall = window.innerWidth < 700;
  const nodeCount = isSmall ? 34 : 70;
  const maxDist = isSmall ? 6 : 8;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 14;

  const group = new THREE.Group();
  scene.add(group);

  // Nodes
  const positions = new Float32Array(nodeCount * 3);
  const drift = [];
  for (let i = 0; i < nodeCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    drift.push({ speed: 0.15 + Math.random() * 0.25, offset: Math.random() * Math.PI * 2 });
  }
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    color: 0xef4a63,
    size: 0.09,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true
  });
  group.add(new THREE.Points(pointsGeo, pointsMat));

  // Edges — nearest neighbours computed once at init (cheap per-frame cost after that)
  const edgeSet = new Set();
  const edgePairs = [];
  for (let i = 0; i < nodeCount; i++) {
    const candidates = [];
    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < maxDist * maxDist) candidates.push([j, d]);
    }
    candidates.sort((a, b) => a[1] - b[1]);
    candidates.slice(0, 2).forEach(([j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edgePairs.push([i, j]);
      }
    });
  }
  const linePositions = new Float32Array(edgePairs.length * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x8b7cf6, transparent: true, opacity: 0.18 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  function syncLines() {
    const p = pointsGeo.attributes.position.array;
    const l = lineGeo.attributes.position.array;
    edgePairs.forEach(([a, b], idx) => {
      l[idx * 6] = p[a * 3];
      l[idx * 6 + 1] = p[a * 3 + 1];
      l[idx * 6 + 2] = p[a * 3 + 2];
      l[idx * 6 + 3] = p[b * 3];
      l[idx * 6 + 4] = p[b * 3 + 1];
      l[idx * 6 + 5] = p[b * 3 + 2];
    });
    lineGeo.attributes.position.needsUpdate = true;
  }

  const clock = new THREE.Clock();
  let frameId = null;

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const p = pointsGeo.attributes.position.array;
    for (let i = 0; i < nodeCount; i++) {
      const d = drift[i];
      p[i * 3 + 1] += Math.sin(t * d.speed + d.offset) * 0.0018;
      p[i * 3] += Math.cos(t * d.speed * 0.8 + d.offset) * 0.0012;
    }
    pointsGeo.attributes.position.needsUpdate = true;
    syncLines();
    group.rotation.y = t * 0.02;
    group.rotation.x = Math.sin(t * 0.05) * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    } else if (!frameId) {
      animate();
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  });
}

/* ---------------------------------------------------------------------
   11. Back to top + footer year
   --------------------------------------------------------------------- */
function initFooter() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
}

/* ---------------------------------------------------------------------
   Init
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initNav();
  initHeaderScroll();
  initScrollSpy();
  initReveal();
  initRoleTypewriter();
  initCounters();
  initThmBadge();
  initContactForm();
  initFooter();
  loadThreeAndInitBackground();
});
