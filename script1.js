// ========== EFFET MATRIX ==========
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アカサタナハマヤラワ0123456789SKYTERMINAL<>$#@!';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(5, 8, 16, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = Math.random() > 0.7 ? '#00e5ff' : '#00ff9d';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ========== DÉFILEMENT FLUIDE ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========== ONGLETS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// ========== COMPTEUR ANIMÉ ==========
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = target / 60;

  const update = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  update();
};

// Lancer quand visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => observer.observe(num));

// ========== EFFET MACHINE À ÉCRIRE (optionnel) ==========
// Ajoute un effet de frappe aux titres de leçons
window.addEventListener('load', () => {
  console.log('%c[Sky-Terminal]', 'color: #00ff9d; font-size: 20px; font-weight: bold;');
  console.log('%cFormation Termux par Sky Plug SCM × The Terror SCM', 'color: #00e5ff; font-size: 14px;');
  console.log('%cRejoins-nous sur Telegram : t.me/Sky_Plug', 'color: #00ff9d; font-size: 12px;');
});