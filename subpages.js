/* VentureRush Tech — Shared Interactions for About, Privacy Policy & Terms */
(function () {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Navigation Drawer
  const menuBtn = document.getElementById('menuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => mobileDrawer.classList.toggle('open'));
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    });
  }

  // 3. Animated Metric Counters (About page)
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      el.textContent = prefix + (decimals > 0 ? val.toFixed(decimals) : Math.round(val)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // 4. Smooth Scroll Reveal Observer (Matching index.html & portfolio-*.html)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (!entry.target._counted) {
          entry.target._counted = true;
          entry.target.querySelectorAll('.counter').forEach(animateCounter);
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.anim-reveal').forEach(el => observer.observe(el));

  // 5. Sticky Table of Contents Scroll-Spy (Privacy Policy & Terms pages)
  const tocLinks = document.querySelectorAll('.toc-list a[href^="#"]');
  if (tocLinks.length > 0) {
    const sections = [...tocLinks]
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });

    sections.forEach(sec => spy.observe(sec));
  }
})();
