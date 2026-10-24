(() => {
  'use strict';

  // ─── NAV SCROLL ───
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── HAMBURGER MENU ───
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  if (burger && drawer && nav) {
    const closeMenu = () => {
      nav.classList.remove('menu-open');
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', () => {
      const opening = !nav.classList.contains('menu-open');
      nav.classList.toggle('menu-open', opening);
      drawer.classList.toggle('is-open', opening);
      burger.setAttribute('aria-expanded', String(opening));
      document.body.style.overflow = opening ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  // ─── GOATCOUNTER CTA EVENTS ───
  document.querySelectorAll('[data-gc-event]').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-gc-event');
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: name, title: name, event: true });
      }
    });
  });
})();
