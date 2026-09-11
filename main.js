import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// Loading Screen & Initial Setup
// ==========================================================================
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('.loader-progress-bar', {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut'
  })
  .to('.loader-text', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  .to('.loader', {
    yPercent: -100,
    duration: 1,
    ease: 'power4.inOut',
    delay: 0.5
  })
  .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .from('.hero-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.stat-card', {
    x: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.4');
});

// ==========================================================================
// Smooth Scrolling (Lenis)
// ==========================================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ==========================================================================
// Custom Cursor
// ==========================================================================
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
  });

  const interactiveElements = document.querySelectorAll('a, button, .expertise-card, .luxury-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursorGlow, { scale: 2, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursorGlow, { scale: 1, duration: 0.3 });
    });
  });
}

// ==========================================================================
// Header Scroll Effect & Mobile Menu
// ==========================================================================
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('span');
  if (navLinks.classList.contains('active')) {
    icon.textContent = 'close';
  } else {
    icon.textContent = 'menu';
  }
});

// Close mobile menu on click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.querySelector('span').textContent = 'menu';
  });
});

// ==========================================================================
// GSAP ScrollTrigger Animations
// ==========================================================================

// Parallax Effects
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.to(img, {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

gsap.utils.toArray('.parallax-img-sm').forEach(img => {
  gsap.to(img, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Reveal Text
gsap.utils.toArray('.reveal-text').forEach(elem => {
  gsap.from(elem, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Reveal Up (Cards, Grids)
gsap.utils.toArray('.reveal-up').forEach(elem => {
  gsap.from(elem, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Image Reveal (Clip Path)
gsap.utils.toArray('.reveal-image').forEach(container => {
  const img = container.querySelector('img');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    xPercent: -100,
    ease: "power2.out"
  });
  tl.from(img, 1.5, {
    xPercent: 100,
    scale: 1.3,
    delay: -1.5,
    ease: "power2.out"
  });
});

// Number Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 90%',
    onEnter: () => {
      const target = +counter.getAttribute('data-target');
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power1.inOut'
      });
    },
    once: true
  });
});

// Testimonial Scroll Animation
const testimonialCards = gsap.utils.toArray('.testimonial-card');
if(testimonialCards.length > 0) {
  gsap.from(testimonialCards, {
    x: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonial-slider',
      start: 'top 80%'
    }
  });
}

// Gallery Filtering
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(card, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in', onComplete: () => {
            card.style.display = 'none';
          }});
        }
      });
    });
  });
}
