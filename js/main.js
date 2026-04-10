/* =========================================
   Water Ambassadors — main.js  (fixed)
   ========================================= */

/* ─── Navbar ─── */
(function () {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('hamburger');
    const mob = document.getElementById('nav-mobile');

    window.addEventListener(
        'scroll',
        () => {
            navbar?.classList.toggle('scrolled', window.scrollY > 40);
        },
        { passive: true },
    );

    burger?.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        mob?.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    mob?.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
            burger?.classList.remove('open');
            mob.classList.remove('open');
            document.body.style.overflow = '';
        }),
    );

    const cur = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, #nav-mobile a').forEach((a) => {
        if (a.getAttribute('href') === cur) a.classList.add('active');
    });
})();

/* ─── Floating Particles ─── */
(function () {
    const bg = document.querySelector('.ocean-bg');
    if (!bg) return;
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const sz = Math.random() * 6 + 2;
        p.style.cssText =
            `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;` +
            `animation-duration:${Math.random() * 20 + 15}s;animation-delay:${Math.random() * -20}s;` +
            `opacity:${Math.random() * 0.12 + 0.04};`;
        bg.appendChild(p);
    }
})();

/* ─── Hero Canvas ─── 
   Sizes to the #hero element (100vh), slow gentle waves.
   The canvas element uses CSS width:100%/height:100% but its
   pixel buffer is set explicitly from the hero's bounding rect.
*/
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Wave parameters — all speeds in radians-per-second (very slow)
    const WAVES = [
        { yF: 0.48, amp: 30, f: 0.006, spd: 0.22, ph: 0.0, a: 0.06 },
        { yF: 0.57, amp: 22, f: 0.009, spd: 0.16, ph: 1.4, a: 0.042 },
        { yF: 0.64, amp: 16, f: 0.013, spd: 0.3, ph: 2.7, a: 0.03 },
        { yF: 0.71, amp: 11, f: 0.008, spd: 0.13, ph: 0.9, a: 0.02 },
        { yF: 0.77, amp: 7, f: 0.016, spd: 0.38, ph: 3.3, a: 0.013 },
    ];

    let W = 0,
        H = 0,
        t = 0,
        lastTs = null;

    function resize() {
        const hero = document.getElementById('hero');
        const r = hero ? hero.getBoundingClientRect() : null;
        W = canvas.width = r ? r.width : window.innerWidth;
        H = canvas.height = r ? r.height : window.innerHeight;
    }

    function draw(ts) {
        if (lastTs === null) lastTs = ts;
        t += (ts - lastTs) / 1000; // elapsed seconds
        lastTs = ts;

        ctx.clearRect(0, 0, W, H);

        WAVES.forEach((w) => {
            ctx.beginPath();
            ctx.moveTo(0, H);
            for (let x = 0; x <= W; x += 3) {
                const y =
                    H * w.yF +
                    Math.sin(x * w.f + t * w.spd + w.ph) * w.amp +
                    Math.sin(x * w.f * 1.9 + t * w.spd * 0.65 + w.ph + 1.1) * w.amp * 0.32;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(W, H);
            ctx.closePath();
            ctx.fillStyle = `rgba(61,174,212,${w.a})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
})();

/* ─── Scroll Reveal ─── */
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
})();

/* ─── Partners — CSS marquee, built from PARTNERS array ─── 
   PARTNERS must be defined in index.html before main.js loads.
   The track is doubled (original + clone) and animated with the
   CSS @keyframes marquee (translateX 0 → -50%).
*/
(function () {
    const wrapper = document.querySelector('.partners-track-wrapper');
    const track = document.getElementById('partners-track');
    if (!wrapper || !track || typeof PARTNERS === 'undefined' || !PARTNERS.length) return;

    function card(p) {
        const d = document.createElement('div');
        d.className = 'partner-card glass';
        const img = document.createElement('img');
        img.src = 'images/partners/' + p.file;
        img.alt = p.name;
        img.loading = 'lazy';
        img.onerror = function () {
            this.parentElement.innerHTML = `<span style="font-size:.7rem;color:var(--text-secondary);text-align:center;">${p.name}</span>`;
        };
        d.appendChild(img);
        return d;
    }

    function createBlock() {
        return PARTNERS.map(card);
    }

    // Build a block that fills the visible wrapper before cloning it.
    track.append(...createBlock());
    const minWidth = wrapper.clientWidth * 1.05;
    while (track.scrollWidth < minWidth) {
        track.append(...createBlock());
    }

    const originalChildren = Array.from(track.children);
    originalChildren.forEach((child) => track.appendChild(child.cloneNode(true)));
})();

/* ─── Gallery / Report Modal ─── */
(function () {
    const modal = document.getElementById('report-modal');
    if (!modal) return;
    document.getElementById('open-report')?.addEventListener('click', () => modal.classList.add('open'));
    document.getElementById('close-report')?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.remove('open');
    });
})();

/* ─── Poster Carousel ─── 
   Built from the POSTERS array (defined in index.html).
   Uses a scroll-snap scroller so it is truly infinite on mobile too.
   Prev / Next buttons scroll by one slide width + gap.
   Active class is tracked for the CSS size difference.
*/
(function () {
    const scroller = document.getElementById('poster-scroller');
    if (!scroller || typeof POSTERS === 'undefined' || !POSTERS.length) return;

    const dotsWrap = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const N = POSTERS.length;
    let current = 0;
    let autoTimer;
    let isScrolling = false;

    /* Build slides */
    POSTERS.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'poster-slide glass' + (i === 0 ? ' active' : '');
        div.dataset.index = i;
        const img = document.createElement('img');
        img.src = 'images/posters/' + p.file;
        img.alt = p.label;
        img.loading = 'lazy';
        img.onerror = function () {
            this.parentElement.style.background = 'linear-gradient(160deg,#0a2342,#1a6a9a)';
            this.style.display = 'none';
        };
        const grad = document.createElement('div');
        grad.className = 'poster-gradient';
        const lbl = document.createElement('p');
        lbl.className = 'poster-label';
        lbl.textContent = p.label;
        div.append(img, grad, lbl);
        scroller.appendChild(div);
    });

    /* Build dots */
    if (dotsWrap) {
        POSTERS.forEach((_, i) => {
            const b = document.createElement('button');
            b.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            b.setAttribute('aria-label', 'Poster ' + (i + 1));
            b.addEventListener('click', () => {
                stopAuto();
                scrollTo(i);
                startAuto();
            });
            dotsWrap.appendChild(b);
        });
    }

    function allSlides() {
        return [...scroller.querySelectorAll('.poster-slide')];
    }
    function allDots() {
        return dotsWrap ? [...dotsWrap.querySelectorAll('.carousel-dot')] : [];
    }

    function setActive(idx) {
        current = ((idx % N) + N) % N;
        allSlides().forEach((s, i) => s.classList.toggle('active', i === current));
        allDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function scrollTo(idx) {
        const slides = allSlides();
        if (!slides.length) return;
        setActive(idx);
        // Scroll the target slide into the centre of the scroller
        const target = slides[current];
        if (!target) return;
        const scrollerRect = scroller.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const offset = target.offsetLeft - scroller.offsetLeft - scrollerRect.width / 2 + targetRect.width / 2;
        scroller.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
    }

    /* Detect which slide is centred after a scroll (for the dot / active class) */
    let scrollEndTimer;
    scroller.addEventListener(
        'scroll',
        () => {
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                const slides = allSlides();
                const cx = scroller.scrollLeft + scroller.offsetWidth / 2;
                let closest = 0,
                    minDist = Infinity;
                slides.forEach((s, i) => {
                    const dist = Math.abs(s.offsetLeft - scroller.offsetLeft + s.offsetWidth / 2 - cx);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                });
                setActive(closest);
            }, 80);
        },
        { passive: true },
    );

    prevBtn?.addEventListener('click', () => {
        stopAuto();
        scrollTo(current - 1);
        startAuto();
    });
    nextBtn?.addEventListener('click', () => {
        stopAuto();
        scrollTo(current + 1);
        startAuto();
    });

    function startAuto() {
        autoTimer = setInterval(() => scrollTo(current + 1), 4500);
    }
    function stopAuto() {
        clearInterval(autoTimer);
    }

    /* Init */
    requestAnimationFrame(() => {
        scrollTo(0);
        startAuto();
    });
})();

/* ─── Song Player ─── */
(function () {
    const audio = document.getElementById('audio-player');
    if (!audio) return;

    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prog = document.getElementById('progress-input');
    const curEl = document.getElementById('current-time');
    const durEl = document.getElementById('duration');
    const volSldr = document.getElementById('volume-input');
    const eqBars = document.querySelector('.eq-bars');
    const disc = document.getElementById('player-disc');

    const fmt = (s) =>
        isFinite(s) && s >= 0 ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00';

    function fillSlider(el, pct) {
        if (!el) return;
        el.style.background = `linear-gradient(to right, var(--ocean-glow) ${pct}%, rgba(255,255,255,0.12) ${pct}%)`;
    }

    /* Toggle playing state — only CSS classes, no inline style on the disc */
    function setPlaying(on) {
        if (playIcon) {
            playIcon.classList.toggle('fa-play', !on);
            playIcon.classList.toggle('fa-pause', on);
        }
        eqBars?.classList.toggle('playing', on);
        disc?.classList.toggle('spinning', on); // CSS spin-disc animation
    }

    playBtn?.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {}); // silently ignore if no src yet
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('ended', () => {
        setPlaying(false);
        if (prog) {
            prog.value = 0;
            fillSlider(prog, 0);
        }
        if (curEl) curEl.textContent = '0:00';
    });

    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        if (prog) {
            prog.value = pct;
            fillSlider(prog, pct);
        }
        if (curEl) curEl.textContent = fmt(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        if (durEl) durEl.textContent = fmt(audio.duration);
    });

    prog?.addEventListener('input', () => {
        if (!audio.duration) return;
        audio.currentTime = (prog.value / 100) * audio.duration;
        fillSlider(prog, parseFloat(prog.value));
    });

    volSldr?.addEventListener('input', () => {
        audio.volume = volSldr.value / 100;
        fillSlider(volSldr, parseFloat(volSldr.value));
    });

    /* Init slider fills */
    fillSlider(prog, 0);
    if (volSldr) fillSlider(volSldr, parseFloat(volSldr.value));

    document.getElementById('skip-back')?.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
    document.getElementById('skip-forward')?.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
    });
})();
