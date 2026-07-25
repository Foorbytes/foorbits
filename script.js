(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const printerButton = document.querySelector('[data-printer-button]');
  const printerMessage = document.querySelector('[data-printer-message]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const identityStyles = document.createElement('link');
  identityStyles.rel = 'stylesheet';
  identityStyles.href = 'identity.css?v=20260724';
  document.head.append(identityStyles);

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

  const setupImageFallback = (image) => {
    image.addEventListener('error', () => {
      const container = image.parentElement;
      if (!container) return;
      container.classList.add('image-fallback');
      container.dataset.fallbackLabel = image.dataset.imageFallback || 'Foorbits 3D';
    }, { once: true });
  };

  document.querySelectorAll('img[data-image-fallback]').forEach(setupImageFallback);

  const makerWorldProfile = 'https://makerworld.com/en/@foorbits';
  const curatedIdentityImages = {
    hero: [
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/91f39fa4-49ed-4213-8e36-5fc93400942d/1.png',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/17e7bc0b-bb52-45eb-ade1-242cb05f5ce3/IMG_4714.jpeg',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/95271446-0560-47f5-a2ae-f35c00625c51/IMG_4321.jpeg'
    ],
    worlds: [
      'https://makerworld.bblmw.com/makerworld/model/US1557302051b217/design/2025-05-20_b52b4436974918.jpeg?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/6d767857-00c2-4885-a781-60b697520843/IMG_4807.jpeg',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/ad182151-fb00-40a3-bc0c-83332c76046c/IMG_4429.jpeg'
    ],
    profile: [
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/227a3739-6e90-41b2-9b07-9e309fc89bc7/IMG_4596.jpeg',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/2ba246ca-ad44-48c4-8139-6aa1a21d070a/IMG_4300.jpeg'
    ],
    benefits: [
      'https://makerworld.bblmw.com/makerworld/model/US1557302051b217/design/2025-05-20_b52b4436974918.jpeg?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/07c6b802-ab94-4b02-a7d5-5abb15aded8c/IMG_4763.jpeg',
      'https://makerworld.bblmw.com/makerworld/model/USeb1522b260b98e/design/2025-07-14_c37da8f7dddc7.png?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/8fcd00c5-e5a6-4bbf-9f47-3ab31f1acb27/IMG_4220.jpeg'
    ],
    final: [
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/4485b95b-86d7-475d-b5d9-11abc0f81481/21%2BMINUTE%2BPRINT%21-2.png',
      'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/4b5b38ea-e026-47ef-89b1-bf7912490559/IMG_4234.jpeg'
    ]
  };

  const createDecorativeImage = (src, className = '') => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = '';
    image.className = className;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.addEventListener('error', () => image.remove(), { once: true });
    return image;
  };

  const mountIdentityDetails = () => {
    const heroCopy = document.querySelector('.hero-copy');
    if (heroCopy && !heroCopy.querySelector('.hero-identity-strip')) {
      const strip = document.createElement('div');
      strip.className = 'hero-identity-strip';
      strip.setAttribute('aria-label', 'Original models from the Foorbits workshop');

      const label = document.createElement('span');
      label.className = 'hero-identity-strip__label';
      label.textContent = 'Printed in the Foorbits workshop';

      const photos = document.createElement('div');
      photos.className = 'hero-identity-strip__photos';

      curatedIdentityImages.hero.forEach((src, index) => {
        const link = document.createElement('a');
        link.className = 'identity-thumb';
        link.href = makerWorldProfile;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.setAttribute('aria-label', `Explore Foorbits model ${index + 1} on MakerWorld`);

        const image = document.createElement('img');
        image.src = src;
        image.alt = 'Original Foorbits 3D-printed model';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.referrerPolicy = 'no-referrer';
        image.dataset.imageFallback = 'Foorbits';
        setupImageFallback(image);

        link.append(image);
        photos.append(link);
      });

      strip.append(label, photos);
      heroCopy.append(strip);
    }

    const worldsIntro = document.querySelector('.worlds-intro');
    if (worldsIntro && !worldsIntro.querySelector('.worlds-model-strip')) {
      const strip = document.createElement('div');
      strip.className = 'worlds-model-strip';
      strip.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.textContent = 'From the Makerverse';

      curatedIdentityImages.worlds.forEach((src) => {
        const frame = document.createElement('figure');
        frame.append(createDecorativeImage(src));
        strip.append(frame);
      });

      strip.prepend(label);
      worldsIntro.append(strip);
    }

    const profileCard = document.querySelector('.profile-card');
    if (profileCard && !profileCard.querySelector('.profile-card__models')) {
      const models = document.createElement('div');
      models.className = 'profile-card__models';
      models.setAttribute('aria-hidden', 'true');

      curatedIdentityImages.profile.forEach((src) => {
        const frame = document.createElement('figure');
        frame.className = 'profile-card__model';
        frame.append(createDecorativeImage(src));
        models.append(frame);
      });

      profileCard.prepend(models);
    }

    const benefitCards = document.querySelectorAll('.benefit-grid article');
    benefitCards.forEach((card, index) => {
      if (card.querySelector('.benefit-model')) return;
      card.classList.add(`benefit-card--${index + 1}`);
      const image = createDecorativeImage(
        curatedIdentityImages.benefits[index % curatedIdentityImages.benefits.length],
        'benefit-model'
      );
      card.prepend(image);
    });

    const finalCta = document.querySelector('.final-cta');
    if (finalCta && !finalCta.querySelector('.final-cta__models')) {
      const models = document.createElement('div');
      models.className = 'final-cta__models';
      models.setAttribute('aria-hidden', 'true');

      curatedIdentityImages.final.forEach((src, index) => {
        const frame = document.createElement('figure');
        frame.className = `final-cta__model final-cta__model--${index + 1}`;
        frame.append(createDecorativeImage(src));
        models.append(frame);
      });

      finalCta.prepend(models);
    }
  };

  mountIdentityDetails();

  const showcaseModels = [
    {
      id: 'gamma-guy',
      name: 'Gamma Guy',
      heroKicker: 'HERO DETECTED',
      category: 'ARTICULEAGUE',
      tag: 'POSEABLE HERO',
      description: 'Gamma-powered chunk, flexi-style articulation, and enough heroic attitude to guard an entire spool rack.',
      url: 'https://makerworld.com/en/models/1437435-gamma-guy-articuleague-s1',
      linkText: 'View the model',
      heroImage: 'https://makerworld.bblmw.com/makerworld/model/US1557302051b217/design/2025-05-21_696aed6cd76.png?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      featureImage: 'https://makerworld.bblmw.com/makerworld/model/US1557302051b217/design/2025-05-20_b52b4436974918.jpeg?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      alt: 'A colorful 3D-printed Gamma Guy figure from the ArticuLeague collection'
    },
    {
      id: 'arachnodude',
      name: 'ArachnoDude',
      heroKicker: 'WEB-SLINGING PRINT',
      category: 'ARTICULEAGUE',
      tag: 'FLEXI ATTITUDE',
      description: 'A web-slinging defender of the Makerverse, engineered with bold colors and a very serious stance about failed filament.',
      url: 'https://makerworld.com/en/models/1443602-arachnodude-articuleague-s1',
      linkText: 'View the model',
      heroImage: 'https://makerworld.bblmw.com/makerworld/model/USeb1522b260b98e/design/2025-07-14_c37da8f7dddc7.png?x-oss-process=image%2Fresize%2Cw_800%2Fformat%2Cwebp',
      featureImage: 'https://makerworld.bblmw.com/makerworld/model/USeb1522b260b98e/design/2025-07-14_c37da8f7dddc7.png?x-oss-process=image%2Fresize%2Cw_1000%2Fformat%2Cwebp',
      alt: 'A colorful 3D-printed ArachnoDude figure from the ArticuLeague collection'
    },
    {
      id: 'tiny-chaos',
      name: 'Tiny Chaos',
      heroKicker: 'FRESH OFF THE PLATE',
      category: 'GALLERY SPOTLIGHT',
      tag: 'FOORBITS ORIGINAL',
      description: 'A surprise favorite from the Foorbits workshop, selected from a growing collection of creatures, characters, and printable oddballs.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/91f39fa4-49ed-4213-8e36-5fc93400942d/1.png',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/07c6b802-ab94-4b02-a7d5-5abb15aded8c/IMG_4763.jpeg',
      alt: 'A featured original 3D print from the Foorbits gallery'
    },
    {
      id: 'build-plate-escapee',
      name: 'Build Plate Escapee',
      heroKicker: 'CONTAINMENT FAILED',
      category: 'WORKSHOP PICK',
      tag: 'PRINTED PERSONALITY',
      description: 'One of the workshop residents slipped past quality control and landed directly in today’s rotating showcase.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/4485b95b-86d7-475d-b5d9-11abc0f81481/21%2BMINUTE%2BPRINT%21-2.png',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/6d767857-00c2-4885-a781-60b697520843/IMG_4807.jpeg',
      alt: 'A fun original 3D print selected from the Foorbits workshop gallery'
    },
    {
      id: 'shelf-surprise',
      name: 'Shelf Surprise',
      heroKicker: 'SHELF ENERGY RISING',
      category: 'FOORBITS FAVORITE',
      tag: 'DISPLAY READY',
      description: 'A rotating gallery pick with the bold silhouette, clean color blocking, and personality that define a Foorbits print.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/17e7bc0b-bb52-45eb-ade1-242cb05f5ce3/IMG_4714.jpeg',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/227a3739-6e90-41b2-9b07-9e309fc89bc7/IMG_4596.jpeg',
      alt: 'A colorful original Foorbits model displayed as a gallery spotlight'
    },
    {
      id: 'fresh-filament',
      name: 'Fresh Filament',
      heroKicker: 'SPOOL POWERED',
      category: 'ROTATING SHOWCASE',
      tag: 'MAKERWORLD PICK',
      description: 'Today’s fresh-filament selection, pulled from the wider Foorbits catalog of heroes, flexis, dragons, minis, and desk buddies.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/3a12b476-0643-4b17-8553-c5091a1a974e/IMG_4451.jpeg',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/ad182151-fb00-40a3-bc0c-83332c76046c/IMG_4429.jpeg',
      alt: 'An original Foorbits 3D print highlighted from the MakerWorld collection'
    },
    {
      id: 'desk-defender',
      name: 'Desk Defender',
      heroKicker: 'DESK ZONE SECURED',
      category: 'WORKBENCH SPOTLIGHT',
      tag: 'SMALL BUT MIGHTY',
      description: 'A compact dose of printable character chosen to defend keyboards, filament spools, and whatever snacks are nearby.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/95271446-0560-47f5-a2ae-f35c00625c51/IMG_4321.jpeg',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/2ba246ca-ad44-48c4-8139-6aa1a21d070a/IMG_4300.jpeg',
      alt: 'A desk-sized original model from the Foorbits 3D print gallery'
    },
    {
      id: 'mystery-foorbit',
      name: 'Mystery Foorbit',
      heroKicker: 'UNKNOWN PRINT DETECTED',
      category: 'SURPRISE FEATURE',
      tag: 'TINY WEIRDO',
      description: 'A mystery visitor from the Foorbits gallery, here to prove that every build plate has room for one more strange little character.',
      url: makerWorldProfile,
      linkText: 'Explore the collection',
      heroImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/4b5b38ea-e026-47ef-89b1-bf7912490559/IMG_4234.jpeg',
      featureImage: 'https://images.squarespace-cdn.com/content/v1/67d43fe55de38e1268996d39/8fcd00c5-e5a6-4bbf-9f47-3ab31f1acb27/IMG_4220.jpeg',
      alt: 'A mystery original 3D print selected from the Foorbits gallery'
    }
  ];

  const shuffle = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  };

  const getShowcaseSelection = () => {
    const storageKey = 'foorbits-showcase-v2';
    const modelById = new Map(showcaseModels.map((model) => [model.id, model]));

    try {
      const savedIds = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
      if (
        Array.isArray(savedIds) &&
        savedIds.length === 4 &&
        new Set(savedIds).size === 4 &&
        savedIds.every((id) => modelById.has(id))
      ) {
        return savedIds.map((id) => modelById.get(id));
      }
    } catch {
      // A fresh selection below keeps the page working when storage is unavailable.
    }

    const selection = shuffle(showcaseModels).slice(0, 4);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(selection.map((model) => model.id)));
    } catch {
      // Session storage is optional. The selected models still render normally.
    }
    return selection;
  };

  const resetImageFallback = (image) => {
    const container = image.parentElement;
    if (!container) return;
    container.classList.remove('image-fallback');
    delete container.dataset.fallbackLabel;
  };

  const applyHeroModel = (figure, model) => {
    const kicker = figure.querySelector('.model-card__label span');
    const name = figure.querySelector('.model-card__label strong');
    const image = figure.querySelector('img');
    if (!kicker || !name || !image) return;

    kicker.textContent = model.heroKicker;
    name.textContent = model.name;
    resetImageFallback(image);
    image.src = model.heroImage;
    image.alt = model.alt;
    image.dataset.imageFallback = model.name;
    figure.dataset.showcaseModel = model.id;
  };

  const applyFeatureModel = (card, model) => {
    const imageLink = card.querySelector('.feature-card__image');
    const image = card.querySelector('img');
    const topLine = card.querySelectorAll('.feature-card__topline span');
    const heading = card.querySelector('h3');
    const description = card.querySelector('.feature-card__body > p');
    const textLink = card.querySelector('.text-link');
    if (!imageLink || !image || topLine.length < 2 || !heading || !description || !textLink) return;

    imageLink.href = model.url;
    imageLink.setAttribute('aria-label', `${model.linkText}: ${model.name}`);
    resetImageFallback(image);
    image.src = model.featureImage;
    image.alt = model.alt;
    image.dataset.imageFallback = model.name;
    topLine[0].textContent = model.category;
    topLine[1].textContent = model.tag;
    heading.textContent = model.name;
    description.textContent = model.description;
    textLink.href = model.url;
    textLink.innerHTML = `${model.linkText} <span aria-hidden="true">↗</span>`;
    card.dataset.showcaseModel = model.id;
  };

  const selectedModels = getShowcaseSelection();
  const heroCards = document.querySelectorAll('.hero-art .model-card');
  const featureCards = document.querySelectorAll('.featured-grid .feature-card');

  heroCards.forEach((figure, index) => {
    const model = selectedModels[index];
    if (model) applyHeroModel(figure, model);
  });

  featureCards.forEach((card, index) => {
    const model = selectedModels[index + heroCards.length];
    if (model) applyFeatureModel(card, model);
  });

  document.documentElement.dataset.showcaseReady = 'true';

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
