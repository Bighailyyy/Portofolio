/* PROGRESS BAR */
const bar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
});

/*NAVBAR SCROLL*/
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/*MOBILE NAV */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}
/*REVEAL ON SCROLL*/
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.project-card').forEach(el => revealObserver.observe(el));

/*COUNT-UP ANIMATION*/
function countUp(el, target, duration = 1400) {
  let start = null;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + '+';
    }
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(n => {
        countUp(n, parseInt(n.dataset.target));
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: .5 });

document.querySelectorAll('.hero-card').forEach(el => statsObserver.observe(el));

/*SMOOTH ANCHOR SCROLL*/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
