const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');
const contactForm = document.querySelector('.contact-form');

const themeIcons = {
  dark: 'fa-solid fa-moon',
  light: 'fa-solid fa-sun'
};

const setTheme = (mode) => {
  body.classList.toggle('dark', mode === 'dark');
  const icon = themeToggle.querySelector('i');
  icon.className = mode === 'dark' ? themeIcons.light : themeIcons.dark;
};

const toggleTheme = () => {
  const isDark = body.classList.toggle('dark');
  setTheme(isDark ? 'dark' : 'light');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
};

const openMobileNav = () => {
  navLinks.classList.toggle('open');
};

const closeMobileNav = () => {
  navLinks.classList.remove('open');
};

const initTheme = () => {
  const preferred = localStorage.getItem('portfolio-theme');
  if (preferred) {
    setTheme(preferred);
  } else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
};

const initReveal = () => {
  const revealItems = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach(item => observer.observe(item));
};

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (menuBtn) {
  menuBtn.addEventListener('click', openMobileNav);
}

if (navLinkItems.length) {
  navLinkItems.forEach((link) => link.addEventListener('click', closeMobileNav));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks! Your message has been captured. I will follow up soon.');
    contactForm.reset();
  });
}

initTheme();
initReveal();
