// ===== NAVBAR SCROLL BEHAVIOR =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close nav when link clicked (mobile)
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-item[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString('id-ID');
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
      });
      statObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ===== KOLEKSI TAB FILTER =====
const tabBtns = document.querySelectorAll('.tab-btn');
const kendaraanCards = document.querySelectorAll('.kendaraan-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    kendaraanCards.forEach(card => {
      const type = card.getAttribute('data-type');
      if (filter === 'semua' || type === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add CSS keyframe for filter animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.layanan-card, .kendaraan-card, .testi-card, .keunggulan-item, .kontak-form-wrap, .kontak-info, .info-item, .visual-card-stack'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay based on element position in group
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== KONTAK FORM — Submit via WhatsApp =====
const kontakForm = document.getElementById('kontak-form');

if (kontakForm) {
  kontakForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const hp = document.getElementById('hp').value.trim();
    const minat = document.getElementById('minat').value;
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama || !hp) {
      shakeForm();
      return;
    }

    const minatText = minat ? `\nSaya tertarik dengan: *${minat}*` : '';
    const pesanText = pesan ? `\nPesan: ${pesan}` : '';

    const waMessage = encodeURIComponent(
      `Halo Ridwan! 👋\n\nNama saya: *${nama}*\nNo. HP: *${hp}*${minatText}${pesanText}\n\nMohon informasinya. Terima kasih! 🙏`
    );

    window.open(`https://wa.me/6281234567890?text=${waMessage}`, '_blank');
  });
}

function shakeForm() {
  const form = document.getElementById('kontak-form');
  form.style.animation = 'shake 0.4s ease';
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(shakeStyle);
  setTimeout(() => { form.style.animation = ''; }, 500);
}

// ===== SMOOTH ACTIVE STATE FOR HERO SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SHOW WA FLOAT AFTER SCROLL =====
const waFloat = document.getElementById('wa-float');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    waFloat.style.opacity = '1';
    waFloat.style.transform = 'scale(1)';
  } else {
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'scale(0.8)';
  }
});

// Initial WA float state
waFloat.style.opacity = '0';
waFloat.style.transform = 'scale(0.8)';
waFloat.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
