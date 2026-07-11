/* =========================================================
   CJ COIMPORT — script.js
   Vanilla JS ES6+ — Sin dependencias externas
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================== LOADER ===================== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 500);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => { if (loader) loader.classList.add('loaded'); }, 2500);

  /* ===================== FOOTER YEAR ===================== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===================== NAVBAR SCROLL STATE ===================== */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ===================== MOBILE MENU ===================== */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Mobile accordion (Productos)
  document.querySelectorAll('.mobile-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = panel.classList.contains('open');
      panel.classList.toggle('open', !isOpen);
      trigger.querySelector('span').textContent = isOpen ? '+' : '−';
    });
  });

  /* ===================== SCROLL REVEAL ===================== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ===================== ANIMATED COUNTERS ===================== */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-target')) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* ===================== HERO SLIDER ===================== */
  const heroSlider = document.getElementById('heroSlider');
  const heroDotsContainer = document.getElementById('heroDots');

  if (heroSlider && heroDotsContainer) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let heroInterval;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      heroDotsContainer.appendChild(dot);
    });
    const heroDots = heroDotsContainer.querySelectorAll('span');

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      heroDots[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      heroDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }

    function startHeroAutoplay() {
      heroInterval = setInterval(nextSlide, 4500);
    }
    function stopHeroAutoplay() {
      clearInterval(heroInterval);
    }

    startHeroAutoplay();
    heroSlider.addEventListener('mouseenter', stopHeroAutoplay);
    heroSlider.addEventListener('mouseleave', startHeroAutoplay);
  }

  /* ===================== TESTIMONIAL SLIDER ===================== */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDotsContainer = document.getElementById('testimonialDots');

  if (testimonialTrack && testimonialDotsContainer) {
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    let testimonialInterval;

    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToTestimonial(i));
      testimonialDotsContainer.appendChild(dot);
    });
    const tDots = testimonialDotsContainer.querySelectorAll('span');

    function goToTestimonial(index) {
      cards[currentTestimonial].classList.remove('active');
      tDots[currentTestimonial].classList.remove('active');
      currentTestimonial = index;
      cards[currentTestimonial].classList.add('active');
      tDots[currentTestimonial].classList.add('active');
    }

    function nextTestimonial() {
      goToTestimonial((currentTestimonial + 1) % cards.length);
    }

    function startTestimonialAutoplay() {
      testimonialInterval = setInterval(nextTestimonial, 5500);
    }
    function stopTestimonialAutoplay() {
      clearInterval(testimonialInterval);
    }

    startTestimonialAutoplay();
    testimonialTrack.addEventListener('mouseenter', stopTestimonialAutoplay);
    testimonialTrack.addEventListener('mouseleave', startTestimonialAutoplay);
  }

  /* ===================== FAQ ACCORDION ===================== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other FAQ items (single-open accordion)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ===================== LIGHT PARALLAX (HERO GLOW) ===================== */
  const heroGlow = document.querySelector('.hero-glow');
  const heroGrid = document.querySelector('.hero-grid');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroGlow) heroGlow.style.transform = `translateY(${scrollY * 0.25}px)`;
    if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.1}px)`;
  }, { passive: true });

  /* ===================== BACK TO TOP ===================== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================== FORM VALIDATION ===================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      name: { el: document.getElementById('cf-name'), err: document.getElementById('err-name'), validate: v => v.trim().length >= 3, msg: 'Ingresa tu nombre completo (mín. 3 caracteres).' },
      email: { el: document.getElementById('cf-email'), err: document.getElementById('err-email'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Ingresa un correo electrónico válido.' },
      phone: { el: document.getElementById('cf-phone'), err: document.getElementById('err-phone'), validate: v => /^[\d\s()+-]{7,}$/.test(v.trim()), msg: 'Ingresa un teléfono válido.' },
      category: { el: document.getElementById('cf-category'), err: document.getElementById('err-category'), validate: v => v.trim() !== '', msg: 'Selecciona una categoría.' },
      message: { el: document.getElementById('cf-message'), err: document.getElementById('err-message'), validate: v => v.trim().length >= 10, msg: 'Cuéntanos un poco más (mín. 10 caracteres).' }
    };

    const validateField = (key) => {
      const field = fields[key];
      const value = field.el.value;
      const isValid = field.validate(value);
      const group = field.el.closest('.form-group');

      if (!isValid) {
        group.classList.add('error');
        field.err.textContent = field.msg;
      } else {
        group.classList.remove('error');
        field.err.textContent = '';
      }
      return isValid;
    };

    // Validate on blur
    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => validateField(key));
      fields[key].el.addEventListener('input', () => {
        if (fields[key].el.closest('.form-group').classList.contains('error')) {
          validateField(key);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let allValid = true;
      Object.keys(fields).forEach(key => {
        const valid = validateField(key);
        if (!valid) allValid = false;
      });

      if (!allValid) {
        const firstError = contactForm.querySelector('.form-group.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Build data object (simulated submission — no backend in this delivery)
      const formData = {
        name: fields.name.el.value.trim(),
        company: document.getElementById('cf-company').value.trim(),
        email: fields.email.el.value.trim(),
        phone: fields.phone.el.value.trim(),
        category: fields.category.el.value,
        message: fields.message.el.value.trim(),
        date: new Date().toISOString()
      };

      console.log('Solicitud de cotización recibida:', formData);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;

      submitBtn.disabled = true;
      btnText.textContent = 'Enviando...';

      setTimeout(() => {
        const successMsg = document.getElementById('formSuccess');
        successMsg.classList.add('show');
        contactForm.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;

        setTimeout(() => successMsg.classList.remove('show'), 6000);
      }, 900);
    });
  }

  /* ===================== SMOOTH ANCHOR SCROLL ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});