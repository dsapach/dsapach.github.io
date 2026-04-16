/* ═══════════════════════════════════════════════════════════
   DENIS SAPACH — PORTFOLIO · script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── GSAP REGISTRATION ──────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   1. NAVIGATION
══════════════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Transparent → dark on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  navbar.classList.toggle('menu-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
  });
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const observerOptions = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ══════════════════════════════════════════════════════════
   2. HERO ANIMATIONS (GSAP)
══════════════════════════════════════════════════════════ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .to('#heroEyebrow', { opacity: 1, y: 0, duration: .7, delay: .2 })
    .to('#heroName', { opacity: 1, y: 0, duration: .9 }, '-=.3')
    .to('#heroSubtitle', { opacity: 1, y: 0, duration: .7 }, '-=.5')
    .to('#heroDesc', { opacity: 1, y: 0, duration: .7 }, '-=.5')
    .to('#heroActions', { opacity: 1, y: 0, duration: .7 }, '-=.4')
    .to('#heroStats', { opacity: 1, y: 0, duration: .7 }, '-=.4');

  // Initial states
  gsap.set(['#heroEyebrow','#heroName','#heroSubtitle','#heroDesc','#heroActions','#heroStats'], {
    opacity: 0, y: 30
  });
  tl.play();
}

/* ══════════════════════════════════════════════════════════
   3. TYPEWRITER EFFECT
══════════════════════════════════════════════════════════ */
function initTypewriter() {
  const el     = document.getElementById('typewriter');
  const cursor = document.querySelector('.cursor');
  const words  = ['Motion Designer', 'UI Designer', 'Lottie Expert', 'Brand Animator'];
  let wIndex   = 0;
  let cIndex   = 0;
  let deleting = false;
  let pausing  = false;

  const TYPING_SPEED  = 80;
  const DELETING_SPEED= 45;
  const PAUSE_AFTER   = 1800;
  const PAUSE_BEFORE  = 400;

  function tick() {
    const currentWord = words[wIndex];

    if (pausing) return;

    if (!deleting) {
      el.textContent = currentWord.substring(0, cIndex + 1);
      cIndex++;
      if (cIndex === currentWord.length) {
        pausing = true;
        setTimeout(() => { pausing = false; deleting = true; tick(); }, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      el.textContent = currentWord.substring(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        wIndex   = (wIndex + 1) % words.length;
        pausing  = true;
        setTimeout(() => { pausing = false; tick(); }, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  // Start after hero anim
  setTimeout(tick, 1400);
}

/* ══════════════════════════════════════════════════════════
   4. SCROLL-TRIGGERED ANIMATIONS (GSAP ScrollTrigger)
══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Generic fade-up for all .fade-up elements
  gsap.utils.toArray('.fade-up').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--delay')) || 0;
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0,
        duration: .85,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Skill bar animation: trigger when cards enter view
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillCards.forEach(card => skillObserver.observe(card));

  // Stagger skill cards
  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: .7,
        delay: i * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Lottie cards stagger
  gsap.utils.toArray('.lottie-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: .7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Portfolio cards stagger
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, scale: .94 },
      {
        opacity: 1, scale: 1,
        duration: .65,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#portfolioGrid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section headings parallax nudge
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ══════════════════════════════════════════════════════════
   5. PORTFOLIO FILTER
══════════════════════════════════════════════════════════ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          gsap.fromTo(card,
            { opacity: 0, scale: .9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: .45, delay: i * 0.05, ease: 'power2.out' }
          );
        } else {
          gsap.to(card, {
            opacity: 0, scale: .92, y: 12, duration: .3, ease: 'power2.in',
            onComplete: () => card.classList.add('hidden')
          });
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   6. PLAY BUTTON (SHOWREEL PLACEHOLDER)
══════════════════════════════════════════════════════════ */
function initShowreel() {
  const playBtn  = document.getElementById('playBtn');
  const videoWrap = document.querySelector('.video-wrap');

  if (!playBtn || !videoWrap) return;

  function activatePlayer() {
    // Replace placeholder with actual YouTube embed
    // CHANGE 'YOUR_VIDEO_ID' to your real YouTube video ID
    const VIDEO_ID = 'YOUR_VIDEO_ID';
    const iframe   = document.createElement('iframe');
    iframe.src     = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;
    iframe.title   = 'Denis Sapach — Showreel 2026';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';

    gsap.to(playBtn, {
      opacity: 0, scale: .8, duration: .3, ease: 'power2.in',
      onComplete: () => {
        // Only swap if we have a real video ID
        if (VIDEO_ID !== 'YOUR_VIDEO_ID') {
          videoWrap.querySelector('.video-placeholder').appendChild(iframe);
          playBtn.remove();
        } else {
          // Demo: just animate the play button
          gsap.to(playBtn, { opacity: 1, scale: 1, duration: .3 });
          const label = playBtn.querySelector('.play-label');
          if (label) {
            label.textContent = '▶ Replace YOUR_VIDEO_ID in script.js';
          }
        }
      }
    });
  }

  playBtn.addEventListener('click', activatePlayer);
  playBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activatePlayer(); }
  });
}

/* ══════════════════════════════════════════════════════════
   7. LOTTIE ANIMATIONS
══════════════════════════════════════════════════════════ */
function initLottieAnimations() {
  // Lottie animations are loaded here.
  // Replace the path strings with your actual .json file paths.
  // Example paths assume you create an /animations/ folder.
  //
  // const animConfigs = [
  //   { id: 'lottie1', path: 'animations/loading.json' },
  //   { id: 'lottie2', path: 'animations/success.json' },
  //   { id: 'lottie3', path: 'animations/icon-set.json' },
  // ];
  //
  // animConfigs.forEach(({ id, path }) => {
  //   const container = document.getElementById(id);
  //   if (!container) return;
  //   lottie.loadAnimation({
  //     container,
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     path
  //   });
  // });

  // ── DEMO: Inline SVG Lottie-style pulse animations ──
  // These replace the spinners with animated SVG rings once visible,
  // giving a preview of how Lottie slots will look.
  const DEMO_ANIMATIONS = [
    { id: 'lottie1', color: '#4D9FFF', shape: 'circle' },
    { id: 'lottie2', color: '#00DDB3', shape: 'check' },
    { id: 'lottie3', color: '#A855F7', shape: 'star' },
  ];

  DEMO_ANIMATIONS.forEach(({ id, color, shape }) => {
    const container = document.getElementById(id);
    if (!container) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadDemoAnimation(container, color, shape);
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(container);
  });
}

function loadDemoAnimation(container, color, shape) {
  const placeholder = container.querySelector('.lottie-placeholder');
  if (!placeholder) return;

  // Fade out placeholder
  gsap.to(placeholder, {
    opacity: 0, duration: .4,
    onComplete: () => {
      placeholder.style.display = 'none';

      const svgNS = 'http://www.w3.org/2000/svg';
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;';

      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 120 120');
      svg.setAttribute('width', '120');
      svg.setAttribute('height', '120');
      svg.style.overflow = 'visible';

      // Outer ring
      const ring1 = document.createElementNS(svgNS, 'circle');
      ring1.setAttribute('cx', '60'); ring1.setAttribute('cy', '60');
      ring1.setAttribute('r', '48');
      ring1.setAttribute('fill', 'none');
      ring1.setAttribute('stroke', color);
      ring1.setAttribute('stroke-width', '2');
      ring1.setAttribute('stroke-dasharray', '301');
      ring1.setAttribute('stroke-dashoffset', '301');
      ring1.setAttribute('stroke-linecap', 'round');
      ring1.setAttribute('opacity', '0.3');

      // Inner graphic
      const inner = document.createElementNS(svgNS, shape === 'check' ? 'path' : shape === 'star' ? 'polygon' : 'circle');

      if (shape === 'circle') {
        inner.setAttribute('cx', '60'); inner.setAttribute('cy', '60');
        inner.setAttribute('r', '22');
        inner.setAttribute('fill', 'none');
        inner.setAttribute('stroke', color);
        inner.setAttribute('stroke-width', '3');
        inner.setAttribute('opacity', '0.8');
      } else if (shape === 'check') {
        inner.setAttribute('d', 'M38 60 l16 16 28-28');
        inner.setAttribute('fill', 'none');
        inner.setAttribute('stroke', color);
        inner.setAttribute('stroke-width', '4');
        inner.setAttribute('stroke-linecap', 'round');
        inner.setAttribute('stroke-linejoin', 'round');
        inner.setAttribute('stroke-dasharray', '60');
        inner.setAttribute('stroke-dashoffset', '60');
      } else if (shape === 'star') {
        inner.setAttribute('points', '60,32 66,50 86,50 70,62 76,80 60,68 44,80 50,62 34,50 54,50');
        inner.setAttribute('fill', color);
        inner.setAttribute('opacity', '0.7');
      }

      // Spin ring
      const spinRing = document.createElementNS(svgNS, 'circle');
      spinRing.setAttribute('cx', '60'); spinRing.setAttribute('cy', '60');
      spinRing.setAttribute('r', '48');
      spinRing.setAttribute('fill', 'none');
      spinRing.setAttribute('stroke', color);
      spinRing.setAttribute('stroke-width', '2.5');
      spinRing.setAttribute('stroke-dasharray', '50 250');
      spinRing.setAttribute('stroke-linecap', 'round');

      svg.appendChild(ring1);
      svg.appendChild(inner);
      svg.appendChild(spinRing);
      wrapper.appendChild(svg);
      container.appendChild(wrapper);

      // GSAP animations on the SVG elements
      // Spinning arc
      gsap.to(spinRing, {
        rotation: 360,
        transformOrigin: '60px 60px',
        duration: 2,
        ease: 'linear',
        repeat: -1
      });

      // Ring fill in
      gsap.to(ring1, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });

      // Check path draw
      if (shape === 'check') {
        gsap.to(inner, {
          attr: { 'stroke-dashoffset': 0 },
          duration: .8,
          ease: 'power2.out',
          delay: .3,
          repeat: -1,
          repeatDelay: 1.5,
          yoyo: true,
          yoyoEase: 'power2.in'
        });
      }

      // Pulse inner
      gsap.to(inner, {
        scale: shape === 'star' ? 1.15 : 1.08,
        transformOrigin: '60px 60px',
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      gsap.from(wrapper, { opacity: 0, scale: .8, duration: .5, ease: 'back.out(1.7)' });
    }
  });
}

/* ══════════════════════════════════════════════════════════
   8. SMOOTH SCROLL
══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   9. CUSTOM CURSOR (DESKTOP)
   Blue arrow via CSS SVG data URI — no JS needed
══════════════════════════════════════════════════════════ */
function initCursorGlow() {
  // Cursor is handled entirely via CSS SVG data URI.
  // Nothing to do here — keeping function for compatibility.
}

/* ══════════════════════════════════════════════════════════
   10. CARD TILT EFFECT
══════════════════════════════════════════════════════════ */
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.skill-card, .lottie-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 800,
        ease: 'power1.out',
        duration: .3
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0, rotationX: 0,
        duration: .5,
        ease: 'elastic.out(1,.75)'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   11. COUNTER ANIMATION (Stats in hero)
══════════════════════════════════════════════════════════ */
function initCounters() {
  const stats = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.textContent, 10);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let start    = 0;
      const duration = 1200;
      const step   = Math.ceil(target / (duration / 16));

      const update = () => {
        start = Math.min(start + step, target);
        el.textContent = start + suffix;
        if (start < target) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 1 });

  stats.forEach(stat => observer.observe(stat));
}

/* ══════════════════════════════════════════════════════════
   12. SECTION REVEAL PROGRESS INDICATOR
══════════════════════════════════════════════════════════ */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 2000;
    background: linear-gradient(90deg, #4D9FFF, #A855F7);
    width: 0%; transition: width .1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled  = window.scrollY;
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width  = pct + '%';
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initTypewriter();
  initScrollAnimations();
  initPortfolioFilter();
  initShowreel();
  initLottieAnimations();
  initSmoothScroll();
  initCursorGlow();
  initCardTilt();
  initCounters();
  initProgressBar();

  // Ensure scrolled state is correct on page load (in case of refresh mid-page)
  if (window.scrollY > 40) navbar.classList.add('scrolled');
});
