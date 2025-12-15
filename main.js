(() => {
  const navbtn = document.getElementById('navbtn');
  const panel = document.getElementById('navpanel');

  function toggleMenu(force) {
    const isOpen = force ?? navbtn.getAttribute('aria-expanded') === 'true' ? false : true;
    navbtn.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
    navbtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  }

  if (navbtn && panel) {
    navbtn.addEventListener('click', () => {
      const expanded = navbtn.getAttribute('aria-expanded') === 'true';
      navbtn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      navbtn.setAttribute('aria-label', !expanded ? 'Cerrar menú' : 'Abrir menú');
    });

    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navbtn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      navbtn.setAttribute('aria-label', 'Abrir menú');
    }));
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  // Reveal animations
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('reveal-in');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();