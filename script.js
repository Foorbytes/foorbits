(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const printerButton = document.querySelector('[data-printer-button]');
  const printerMessage = document.querySelector('[data-printer-message]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navigation.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const statuses = [
    'STATUS: MAKING TINY CHAOS',
    'STATUS: FIRST LAYER LOOKS SUSPICIOUSLY PERFECT',
    'STATUS: PRINT PAL ESCAPED THE BUILD PLATE',
    'STATUS: ARTICULEAGUE ASSEMBLING',
    'STATUS: DRAGON CONTAINMENT UNLIKELY',
    'STATUS: PROTOTYPE SPAGHETTI ACCEPTED',
    'STATUS: AMS ARGUMENT SUCCESSFULLY RESOLVED',
    'STATUS: SHELF SPACE CRITICALLY LOW'
  ];

  let lastStatus = 0;
  if (printerButton && printerMessage) {
    printerButton.addEventListener('click', () => {
      let nextStatus = lastStatus;
      while (nextStatus === lastStatus && statuses.length > 1) {
        nextStatus = Math.floor(Math.random() * statuses.length);
      }
      lastStatus = nextStatus;
      printerMessage.textContent = statuses[nextStatus];
    });
  }

  document.querySelectorAll('img[data-image-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const container = image.parentElement;
      if (!container) return;
      container.classList.add('image-fallback');
      container.dataset.fallbackLabel = image.dataset.imageFallback || 'Foorbits 3D';
    }, { once: true });
  });

  document.querySelectorAll('.reveal[data-delay]').forEach((element) => {
    element.style.setProperty('--reveal-delay', `${element.dataset.delay}ms`);
  });

  const revealElements = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    revealElements.forEach((element) => observer.observe(element));
  }
})();
