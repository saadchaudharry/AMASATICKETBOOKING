/* AMASA Ticket Booking — script.js */

// ==========================================
// NAVBAR: scroll effect + mobile toggle
// ==========================================
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================
// SMOOTH SCROLL for all anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// INTERSECTION OBSERVER: fade-up animations
// ==========================================
const fadeEls = document.querySelectorAll(
  '.service-card, .why-card, .stat, .ci-item, .about-text p, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.dataset.delay = i % 6;
  observer.observe(el);
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString('en-IN') + suffix;
  }, 16);
}

const counters = document.querySelectorAll('.count');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const suffix = counter.closest('.stat').querySelector('span').textContent.includes('%') ? '%' : '+';
        animateCounter(counter, target, suffix === '%' ? '' : '+');
      });
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObserver.observe(statsSection);

// ==========================================
// CONTACT FORM: WhatsApp redirect
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !service) {
      formMsg.style.color = '#ef4444';
      formMsg.textContent = 'Please fill in all required fields.';
      return;
    }

    const waText = encodeURIComponent(
      `Hi Ahad! I want to book a ticket.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDetails: ${message || 'N/A'}`
    );

    formMsg.style.color = '#22c55e';
    formMsg.textContent = '✓ Redirecting you to WhatsApp…';

    setTimeout(() => {
      window.open(`https://wa.me/919892776756?text=${waText}`, '_blank');
      contactForm.reset();
      formMsg.textContent = '';
    }, 1000);
  });
}

// ==========================================
// ACTIVE NAV HIGHLIGHT on scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold)'
      : '';
  });
}, { passive: true });
