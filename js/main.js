/* =========================================
   Water Ambassadors — Main JS
   ========================================= */

/* ─── Navbar scroll effect + active links ─── */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active nav links
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ─── Ocean Background Particles ─── */
(function () {
  const oceanBg = document.querySelector('.ocean-bg');
  if (!oceanBg) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * -20}s;
      opacity: ${Math.random() * 0.15 + 0.05};
    `;
    oceanBg.appendChild(p);
  }
})();

/* ─── Hero Canvas Water Ripple ─── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, animFrame;
  const waves = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Wave {
    constructor(i) {
      this.index = i;
      this.y = H * (0.45 + i * 0.08);
      this.amp = 18 + i * 8;
      this.freq = 0.008 - i * 0.001;
      this.speed = 0.0008 + i * 0.0003;
      this.phase = Math.random() * Math.PI * 2;
      this.alpha = 0.06 - i * 0.012;
    }

    draw(t) {
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 4) {
        const y = this.y
          + Math.sin(x * this.freq + t * this.speed * 1000 + this.phase) * this.amp
          + Math.sin(x * this.freq * 1.7 + t * this.speed * 800 + this.phase * 1.3) * (this.amp * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = `rgba(61, 174, 212, ${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    waves.length = 0;
    for (let i = 0; i < 5; i++) waves.push(new Wave(i));
  }

  let lastT = 0;
  function loop(t) {
    const dt = t - lastT;
    lastT = t;
    ctx.clearRect(0, 0, W, H);

    // Subtle gradient overlay
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(13, 27, 62, 0)');
    grad.addColorStop(1, 'rgba(10, 35, 66, 0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    waves.forEach(w => w.draw(t));
    animFrame = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
  resize();
  init();
  requestAnimationFrame(loop);
})();

/* ─── Scroll Reveal ─── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ─── Partners Carousel (auto-scroll with clone) ─── */
(function () {
  const track = document.querySelector('.partners-track');
  if (!track) return;
  // Clone children for seamless loop
  const items = [...track.children];
  items.forEach(item => track.appendChild(item.cloneNode(true)));
})();

/* ─── Gallery / Report Modal ─── */
(function () {
  const modal = document.getElementById('report-modal');
  const openBtn = document.getElementById('open-report');
  const closeBtn = document.getElementById('close-report');
  if (!modal) return;

  openBtn?.addEventListener('click', () => modal.classList.add('open'));
  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
})();

/* ─── Poster Carousel ─── */
(function () {
  const track = document.querySelector('.poster-track');
  if (!track) return;

  const slides = [...track.querySelectorAll('.poster-slide')];
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let current = 0;
  let autoplay;

  if (!slides.length) return;

  // Build dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Poster ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(idx) {
    slides[current]?.classList.remove('active');
    dotsContainer?.querySelectorAll('.carousel-dot')[current]?.classList.remove('active');

    current = (idx + slides.length) % slides.length;
    slides[current]?.classList.add('active');
    dotsContainer?.querySelectorAll('.carousel-dot')[current]?.classList.add('active');

    const slideW = slides[0]?.offsetWidth || 280;
    const gap = 28;
    const centerOffset = (track.parentElement?.offsetWidth || 800) / 2 - (slides[current]?.offsetWidth || 360) / 2;
    const targetX = -(current * (slideW + gap)) + centerOffset;
    track.style.transform = `translateX(${Math.min(0, targetX)}px)`;
  }

  prevBtn?.addEventListener('click', () => { clearInterval(autoplay); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { clearInterval(autoplay); goTo(current + 1); startAuto(); });

  function startAuto() {
    autoplay = setInterval(() => goTo(current + 1), 4500);
  }

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { clearInterval(autoplay); goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
  });

  goTo(0);
  startAuto();
})();

/* ─── Song Player ─── */
(function () {
  const audio = document.getElementById('audio-player');
  if (!audio) return;

  const playBtn = document.getElementById('play-btn');
  const playIcon = document.getElementById('play-icon');
  const progressInput = document.getElementById('progress-input');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volumeInput = document.getElementById('volume-input');
  const eqBars = document.querySelector('.eq-bars');
  const playerArt = document.querySelector('.player-art');

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  playBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.textContent = '⏸';
      eqBars?.classList.add('playing');
      playerArt?.classList.add('playing');
    } else {
      audio.pause();
      playIcon.textContent = '▶';
      eqBars?.classList.remove('playing');
      playerArt?.classList.remove('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressInput) progressInput.value = pct;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    // Update progress track fill
    if (progressInput) {
      progressInput.style.background = `linear-gradient(to right, var(--ocean-glow) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    if (playIcon) playIcon.textContent = '▶';
    eqBars?.classList.remove('playing');
    playerArt?.classList.remove('playing');
    if (progressInput) progressInput.value = 0;
  });

  progressInput?.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (progressInput.value / 100) * audio.duration;
  });

  volumeInput?.addEventListener('input', () => {
    audio.volume = volumeInput.value / 100;
    volumeInput.style.background = `linear-gradient(to right, var(--ocean-glow) ${volumeInput.value}%, rgba(255,255,255,0.1) ${volumeInput.value}%)`;
  });

  // Skip buttons
  document.getElementById('skip-back')?.addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
  document.getElementById('skip-forward')?.addEventListener('click', () => { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); });
})();
