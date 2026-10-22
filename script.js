// ===== i18n Translation Dictionary =====
const i18n = {
    zh: {
        'sidebar.role': 'ECCE @ 宁波诺丁汉大学',
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.skills': '技能',
        'nav.projects': '项目',
        'nav.contact': '联系',
        'theme.light': '浅色',
        'theme.dark': '深色',
        'hero.desc': '2026-2027 就读宁波诺丁汉大学 ECCE 硕士，本科山农大数据专业。写 Python、调 PyTorch、玩大模型，也做产品、剪视频、写博客。',
        'hero.csdn': '// 我的 CSDN()',
        'about.title': '关于我',
        'about.edu': '🎓 教育经历',
        'about.master.degree': 'ECCE 硕士',
        'about.master.detail': '2026 - 2027 | 电子通信与计算机工程 | 雅思 7.0',
        'about.bachelor.degree': '数据科学与大数据技术 本科',
        'about.bachelor.detail': '2021.09 - 2025.06 | GPA 前 30% | 数学建模校赛一等奖',
        'about.exp': '💼 经历',
        'about.exp.p1.title': '齐鲁易码政务产品',
        'about.exp.p1.role': '产品经理',
        'about.exp.p1.desc': '主导 6 类二维码赋码管理系统的 0-1 需求设计，对接山东省公共资源交易平台。',
        'about.exp.p2.title': '山东广电',
        'about.exp.p2.role': '剪辑实习生',
        'about.exp.p2.desc': '短视频内容运营，3 个月抖音粉丝增长 20,000+，单周最高播放 129 万。',
        'skills.title': '技能',
        'skills.g1': 'AI / 深度学习',
        'skills.g2': '产品 & 设计',
        'skills.g3': '媒体 & 运维',
        'skills.llm': '大模型应用',
        'skills.dl': '深度学习基础',
        'skills.prototype': '墨刀 / Axure',
        'skills.web': '前端 & 官网运维',
        'skills.office': 'Office 全家桶',
        'projects.title': '项目',
        'projects.thesis.title': '基于改进 Faster R-CNN 的马铃薯叶片病害识别',
        'projects.thesis.desc': '本科毕业论文（44 页）。针对 Faster R-CNN 检测精度不足的问题，引入 MobileNetV4 作为特征提取骨干网络，并融合坐标注意力（CA）机制，提升模型对马铃薯叶片病斑的检测准确率。',
        'projects.thesis.school': '院校',
        'projects.thesis.advisor': '指导教师',
        'projects.thesis.year': '完成时间',
        'projects.p1.title': '齐鲁易码 · 政务二维码管理系统',
        'projects.p1.desc': '产品经理，0-1 主导身份码、商品码、竞价码等 6 类二维码功能设计。对接山东省公共资源交易平台、药械系统、电子营业执照系统，实现数据互通。',
        'projects.p2.title': '华大科技 / 华虹设计 官网运维',
        'projects.p2.desc': '负责三家企业官网日常运维、数据备份与前端界面优化。实现响应式自适应设计，提升多设备访问体验。',
        'projects.p3.title': 'CSDN 技术博客（51 篇原创）',
        'projects.p3.desc': '大模型、深度学习专栏。涵盖 PyTorch 张量操作、神经网络训练、LLM 应用实践等内容，累计访问量 16,000+。',
        'projects.p4.title': 'Coursework · LLM + Vehicle Control',
        'projects.p4.desc': '探索将大语言模型集成到 VLM（Vehicle Longitudinal Model）框架中，用 LLM 辅助车辆控制决策。过程导向的实验性项目。',
        'projects.p5.title': '山东广电 · 短视频运营',
        'projects.p5.desc': '3 个月抖音粉丝增长 20,000+，单周最高播放量 129 万。独立完成 300+ 新闻类带货视频剪辑，单条观看量平均提升 30%。',
        'tag.product': '产品设计',
        'tag.gov': '政务',
        'tag.prototype': '原型',
        'tag.ops': '运维',
        'tag.responsive': '响应式',
        'tag.fe': '前端',
        'tag.techwriting': '技术写作',
        'tag.llm': '大模型',
        'tag.exploring': '探索中',
        'tag.editing': '剪辑',
        'tag.shortvideo': '短视频',
        'tag.data': '数据驱动',
        'contact.title': '联系',
        'contact.desc': '欢迎交流 AI、产品、视频剪辑或任何有趣的话题。'
    },
    en: {
        'sidebar.role': 'ECCE @ University of Nottingham Ningbo',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'theme.light': 'Light',
        'theme.dark': 'Dark',
        'hero.desc': "Starting ECCE Master's at UNNC (2026-2027). Bachelor's in Big Data at Shandong Agricultural University. Python · PyTorch · LLMs · PM · Video editing · Tech blogging.",
        'hero.csdn': '// my_csdn_blog()',
        'about.title': 'About Me',
        'about.edu': '🎓 Education',
        'about.master.degree': 'MSc ECCE',
        'about.master.detail': '2026 - 2027 | Electronic, Communication & Computer Engineering | IELTS 7.0',
        'about.bachelor.degree': 'BSc Data Science & Big Data',
        'about.bachelor.detail': '2021.09 - 2025.06 | Top 30% GPA | 1st Prize, Math Modeling Competition',
        'about.exp': '💼 Experience',
        'about.exp.p1.title': 'Qilu Yima · Govt QR System',
        'about.exp.p1.role': 'Product Manager',
        'about.exp.p1.desc': 'Led end-to-end design of 6 QR code types for public resource trading. Integrated with Shandong provincial trading platforms.',
        'about.exp.p2.title': 'Shandong Broadcasting',
        'about.exp.p2.role': 'Video Editing Intern',
        'about.exp.p2.desc': 'Short-form video content ops. Grew Douyin followers by 20,000+ in 3 months, peak 1.29M weekly views.',
        'skills.title': 'Skills',
        'skills.g1': 'AI / Deep Learning',
        'skills.g2': 'Product & Design',
        'skills.g3': 'Media & Ops',
        'skills.llm': 'LLM Applications',
        'skills.dl': 'Deep Learning Fund.',
        'skills.prototype': 'Modao / Axure',
        'skills.web': 'Frontend & Site Ops',
        'skills.office': 'Office Suite',
        'projects.title': 'Projects',
        'projects.thesis.title': 'Improved Faster R-CNN for Potato Leaf Disease Detection',
        'projects.thesis.desc': "44-page undergraduate thesis. Replaced Faster R-CNN's backbone with MobileNetV4 and added Coordinate Attention (CA) to improve disease spot detection accuracy.",
        'projects.thesis.school': 'University',
        'projects.thesis.advisor': 'Supervisor',
        'projects.thesis.year': 'Completed',
        'projects.p1.title': 'Qilu Yima · Govt QR Management System',
        'projects.p1.desc': "Product manager owning end-to-end design of 6 QR code types (identity, product, bidding...). Connected Shandong's public resource trading, medical device, and e-license systems.",
        'projects.p2.title': 'Huada / Huahong Corporate Website Ops',
        'projects.p2.desc': 'Day-to-day ops for 3 corporate websites. Data backup, responsive design improvements, and UI optimization.',
        'projects.p3.title': 'CSDN Tech Blog (51 Original Posts)',
        'projects.p3.desc': 'Deep Learning & LLM columns — PyTorch tensor ops, NN training, LLM apps. 16,000+ total views.',
        'projects.p4.title': 'Coursework · LLM + Vehicle Control',
        'projects.p4.desc': 'Integrating a Large Language Model into the Vehicle Longitudinal Model (VLM) framework for AI-assisted driving decisions. Process-oriented exploration.',
        'projects.p5.title': 'Shandong Broadcasting · Short Video Ops',
        'projects.p5.desc': '20,000+ Douyin followers in 3 months, peak 1.29M weekly views. Edited 300+ news-commerce videos, avg +30% view uplift.',
        'tag.product': 'Product',
        'tag.gov': 'Govt',
        'tag.prototype': 'Prototype',
        'tag.ops': 'Ops',
        'tag.responsive': 'Responsive',
        'tag.fe': 'Frontend',
        'tag.techwriting': 'Tech Writing',
        'tag.llm': 'LLMs',
        'tag.exploring': 'Exploring',
        'tag.editing': 'Editing',
        'tag.shortvideo': 'Short Video',
        'tag.data': 'Data-Driven',
        'contact.title': 'Contact',
        'contact.desc': "Open to chat about AI, product, video editing, or anything curious. Let's connect!"
    }
};

// ===== Typewriter Effect =====
const phrases = {
    zh: ['AI & 大数据', 'PyTorch 调参', '大模型应用', '产品经理思维', '剪映剪辑', 'IELTS 7.0'],
    en: ['AI & Big Data', 'PyTorch Tuning', 'LLM Apps', 'PM Thinking', 'Video Editing', 'IELTS 7.0']
};
let currentPhrases = phrases.zh;
const typewriterEl = document.getElementById('typewriter');
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
    if (!typewriterEl) return;
    const current = currentPhrases[phraseIdx];
    if (!deleting) {
        typewriterEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(type, 1500); return; }
    } else {
        typewriterEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % currentPhrases.length; }
    }
    setTimeout(type, deleting ? 50 : 110);
}
type();

// ===== i18n Toggle =====
const langToggle = document.getElementById('langToggle');

function applyLang(lang) {
    document.body.dataset.lang = lang;
    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    // Switch name display
    document.querySelectorAll('.sidebar-name').forEach(el => el.classList.add('hidden'));
    document.querySelector(lang === 'zh' ? '.sidebar-name' : '.sidebar-name-en')?.classList.remove('hidden');
    document.querySelectorAll('.hero-name-cn, .hero-name-en').forEach(el => el.classList.add('hidden'));
    document.querySelector(lang === 'zh' ? '.hero-name-cn' : '.hero-name-en')?.classList.remove('hidden');
    // Restart typewriter
    currentPhrases = phrases[lang];
    phraseIdx = 0; charIdx = 0; deleting = false;
    type();
    // Save
    localStorage.setItem('lang', lang);
    // Update button label
    langToggle.querySelector('.lang-label').textContent = lang === 'zh' ? 'EN' : '中';
}

// Load saved lang or default zh
const savedLang = localStorage.getItem('lang') || 'zh';
applyLang(savedLang);

langToggle?.addEventListener('click', () => {
    const next = document.body.dataset.lang === 'zh' ? 'en' : 'zh';
    applyLang(next);
});

// ===== Scroll Spy (sidebar highlight) =====
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(item => item.classList.toggle('active', item.dataset.target === id));
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
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.body.dataset.theme = savedTheme;
updateThemeBtn();

themeBtn?.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeBtn();
});

function updateThemeBtn() {
    const label = themeBtn?.querySelector('.toggle-label');
    if (!label) return;
    const lang = document.body.dataset.lang === 'en' ? 'en' : 'zh';
    label.textContent = document.body.dataset.theme === 'dark' ? i18n[lang]['theme.light'] : i18n[lang]['theme.dark'];
}

// ===== Fade-in on Scroll =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});
