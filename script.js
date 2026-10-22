// ===== Typewriter Effect =====
const phrases = [
    'Python',
    'PyTorch',
    'tensors',
    'neural networks',
    'LLMs',
    'JavaScript'
];
const typewriterEl = document.getElementById('typewriter');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function type() {
    if (!typewriterEl) return;
    const current = phrases[phraseIdx];
    if (!deleting) {
        typewriterEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(type, 1500);
            return;
        }
    } else {
        typewriterEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }
    setTimeout(type, deleting ? 50 : 110);
}
type();

// ===== Scroll Spy (sidebar highlight) =====
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(item => {
                item.classList.toggle('active', item.dataset.target === id);
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => spyObserver.observe(s));

// ===== Animated Skill Bars =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                const w = bar.dataset.width || 50;
                bar.style.setProperty('--target-width', w + '%');
                bar.classList.add('animated');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== Theme Toggle =====
const themeBtn = document.getElementById('themeToggle');
const toggleIcon = themeBtn?.querySelector('.toggle-icon');
const toggleLabel = themeBtn?.querySelector('.toggle-label');
const saved = localStorage.getItem('theme');
if (saved) document.body.dataset.theme = saved;
updateThemeBtn();

themeBtn?.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeBtn();
});

function updateThemeBtn() {
    if (document.body.dataset.theme === 'light') {
        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (toggleLabel) toggleLabel.textContent = 'Dark';
    } else {
        if (toggleIcon) toggleIcon.textContent = '☀';
        if (toggleLabel) toggleLabel.textContent = 'Light';
    }
}

// ===== Fade-in on Scroll =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});
