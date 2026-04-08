// ===== REVIEWS CAROUSEL =====
(function () {
  const track   = document.getElementById('revTrack');
  const prevBtn = document.getElementById('revPrev');
  const nextBtn = document.getElementById('revNext');
  const dotsEl  = document.getElementById('revDots');
  if (!track) return;

  const cards      = track.querySelectorAll('.rev-card');
  const total      = cards.length;
  const visible    = () => window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  let current      = 0;
  let autoTimer    = null;

  // Build dots
  const pages = () => Math.ceil(total / visible());
  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const d = document.createElement('button');
      d.className = 'rev-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Page ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(page) {
    const p = Math.max(0, Math.min(page, pages() - 1));
    current = p;
    const cardW = cards[0].offsetWidth + 20; // gap = 20px
    track.style.transform = `translateX(-${p * visible() * cardW}px)`;
    dotsEl.querySelectorAll('.rev-dot').forEach((d, i) => d.classList.toggle('active', i === p));
  }

  function next() { goTo(current + 1 < pages() ? current + 1 : 0); }
  function prev() { goTo(current - 1 >= 0 ? current - 1 : pages() - 1); }

  prevBtn.addEventListener('click', () => { clearInterval(autoTimer); prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { clearInterval(autoTimer); next(); startAuto(); });

  // Touch swipe
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { clearInterval(autoTimer); diff > 0 ? next() : prev(); startAuto(); }
  });

  function startAuto() { autoTimer = setInterval(next, 7000); }

  buildDots();
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
})();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navActions= document.querySelector('.nav-actions');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ===== STATS COUNTER =====
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix  || '';
  const decimals = parseInt(el.dataset.decimals) || 0;
  const compact  = el.dataset.format === 'compact';
  const duration = 2000;
  const startTime = performance.now();
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function formatCompact(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  }
  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutExpo(progress);
    const current  = eased * target;
    if (compact) {
      el.textContent = formatCompact(Math.round(current)) + suffix;
    } else if (decimals > 0) {
      el.textContent = current.toFixed(decimals) + suffix;
    } else {
      el.textContent = Math.round(current).toLocaleString('en-IN') + suffix;
    }
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsSection = document.getElementById('stats');
let countersStarted = false;
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.teacher-profile-card, .adm-step, .about-value'
).forEach((el, i) => {
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${(i % 6) * 0.08}s, transform 0.55s ease ${(i % 6) * 0.08}s`;
    revealObserver.observe(el);
  }
});

// ===== ENQUIRY FORM =====
(function () {
  const form = document.getElementById('enquiryForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Submitting…';
    setTimeout(() => {
      form.innerHTML = `<div style="text-align:center;padding:32px">
        <div style="font-size:48px">✅</div>
        <div style="font-size:18px;font-weight:800;margin-top:12px">Enquiry Submitted!</div>
        <p style="color:#64748B;margin-top:8px">Our admissions team will contact you within 24 hours.</p>
      </div>`;
    }, 1200);
  });
})();

// ===== VIDEO MODAL =====
(function () {
  const backdrop = document.getElementById('demoBackdrop');
  const closeBtn = document.getElementById('demoClose');
  const watchBtn = document.getElementById('watchDemoBtn');
  const video    = document.getElementById('demoVideo');
  const overlay  = document.getElementById('demoPlayOverlay');
  if (!backdrop || !watchBtn) return;

  function openModal()  {
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (video)   { video.pause(); video.currentTime = 0; }
    if (overlay) overlay.classList.remove('hidden');
    watchBtn.focus();
  }

  watchBtn.addEventListener('click', e => { e.preventDefault(); openModal(); });
  if (overlay) overlay.addEventListener('click', () => { overlay.classList.add('hidden'); if (video) video.play(); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });
})();

// ===== PAGE LOADER TRANSITION =====
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  // Skip loader if already visited this session
  if (sessionStorage.getItem('loaderShown')) {
    loader.style.display = 'none';
    document.body.classList.add('page-ready');
    return;
  }

  function reveal() {
    sessionStorage.setItem('loaderShown', '1');
    loader.classList.add('fade-out');
    document.body.classList.add('page-ready');
  }

  if (document.readyState === 'complete') {
    setTimeout(reveal, 1100);
  } else {
    window.addEventListener('load', () => setTimeout(reveal, 1100));
  }
})();
