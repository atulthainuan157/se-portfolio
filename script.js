/* =========================================================
   Portfolio — Interactive JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing animation ---------- */
  const roles = [
    'BTech CSE Student',
    'Software Developer',
    'Full Stack Web Developer',
    'Problem Solver',
    'Backend Engineer',
  ];
  const typingEl = document.getElementById('typingText');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_TYPE = 2000;
  const PAUSE_AFTER_DELETE = 400;

  function typeRole() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(typeRole, TYPING_SPEED);
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(typeRole, DELETING_SPEED);
    }
  }
  typeRole();

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 60;

  function handleNavScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------- Active nav link highlighting ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Staggered reveal for grid children ---------- */
  const staggerContainers = document.querySelectorAll(
    '.skills-grid, .projects-grid, .profiles-grid, .achievements-grid'
  );
  staggerContainers.forEach(container => {
    const cards = container.children;
    Array.from(cards).forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  /* ---------- Contact form (cosmetic) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.pointerEvents = '';
        form.reset();
      }, 2500);
    });
  }

});
