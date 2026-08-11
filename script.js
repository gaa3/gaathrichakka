// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fade-in sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .connect').forEach(el => {
  el.classList.add('fade-init');
  observer.observe(el);
});

// Initiatives carousel arrows
const track = document.getElementById('initiativesTrack');
const prevBtn = document.getElementById('initiativesPrev');
const nextBtn = document.getElementById('initiativesNext');

if (track && prevBtn && nextBtn) {
  const scrollByCard = (direction) => {
    const card = track.querySelector('.card');
    const cardWidth = card ? card.getBoundingClientRect().width : 320;
    const gap = 26;
    track.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
  };

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));

  const updateArrowState = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
  };

  track.addEventListener('scroll', updateArrowState);
  window.addEventListener('resize', updateArrowState);
  updateArrowState();
}

// View more projects toggle
const moreToggle = document.getElementById('moreProjectsToggle');
const morePanel = document.getElementById('moreProjects');

if (moreToggle && morePanel) {
  moreToggle.addEventListener('click', () => {
    const isOpen = morePanel.classList.toggle('open');
    moreToggle.setAttribute('aria-expanded', isOpen);
    moreToggle.querySelector('.view-more-label').textContent = isOpen ? 'View Fewer Projects' : 'View More Projects';
    if (isOpen) {
      morePanel.hidden = false;
    } else {
      morePanel.addEventListener('transitionend', () => {
        if (!morePanel.classList.contains('open')) morePanel.hidden = true;
      }, { once: true });
    }
  });
}
