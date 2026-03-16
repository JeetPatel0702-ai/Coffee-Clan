// ==========================================
//  COFFEE CLAN — script.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── Mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay    = document.getElementById('mobileOverlay');
  const menuClose  = document.getElementById('menuClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── Hero word-by-word reveal ── */
  const h1 = document.querySelector('#hero h1');
  if (h1) {
    const words = h1.textContent.trim().split(' ');
    h1.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    document.querySelectorAll('#hero h1 .word').forEach((w, i) => {
      setTimeout(() => {
        w.style.opacity = '1';
        w.style.transform = 'translateY(0)';
      }, 300 + i * 120);
    });
  }

  /* ── Intersection Observer — fade-up ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('visible');
        io.unobserve(target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ── Stagger children inside containers ── */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.querySelectorAll('.fade-up');
    children.forEach((el, i) => {
      el.style.transitionDelay = `${i * 100}ms`;
    });
  });

  /* ── Review carousel clone for infinite scroll ── */
  const track = document.querySelector('.carousel-track');
  if (track) {
    const items = track.innerHTML;
    track.innerHTML += items; // duplicate for seamless loop
  }

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
