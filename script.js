// ===== i18n Translation Dictionary =====
const i18n = {
    zh: {
        'sidebar.role': 'ECCE @ 宁波诺丁汉大学',
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.skills': '技术栈',
        'nav.projects': '研究项目',
        'nav.contact': '联系',
        'theme.light': '浅色',
        'theme.dark': '深色',
        'hero.desc': '2026-2027 学年入读宁波诺丁汉大学 ECCE 硕士项目。本科毕业于山东农业大学数据科学与大数据技术专业。研究兴趣涵盖计算机视觉、大语言模型及自动驾驶车辆控制。',
        'hero.csdn': '// 技术博客()',
        'about.title': '关于',
        'about.edu': '🎓 教育背景',
        'about.master.degree': '电子通信与计算机工程硕士',
        'about.master.detail': '2026 - 2027 | MSc ECCE | IELTS 7.0',
        'about.bachelor.degree': '数据科学与大数据技术学士',
        'about.bachelor.detail': '2021.09 - 2025.06 | Top 30% GPA | 全国大学生数学建模竞赛校赛一等奖',
        'about.res': '🔬 研究方向',
        'about.res.desc': '计算机视觉领域聚焦于目标检测算法的改进与农业病害识别应用；当前探索大语言模型在自动驾驶车辆纵向控制框架中的集成方法。',
        'skills.title': '技术栈',
        'skills.g1': '深度学习 & 计算机视觉',
        'skills.g2': '编程语言 & 工具',
        'skills.g3': '系统设计 & 前端',
        'skills.objdet': '目标检测 (Faster R-CNN / YOLO)',
        'skills.llm': '大模型应用开发',
        'skills.sysdesign': '系统架构设计',
        'skills.dataaug': '数据增强 & 模型调优',
        'projects.title': '研究项目',
        'projects.thesis.title': '基于改进 Faster R-CNN 的马铃薯叶片病害识别',
        'projects.thesis.desc': '本科毕业论文。针对原始 Faster R-CNN 在农业病害检测场景下精度不足的问题，以 MobileNetV4 替换传统骨干网络以降低计算开销，并引入坐标注意力（Coordinate Attention）机制增强模型对病斑位置与尺寸的敏感度。在 PlantVillage 数据集上完成训练与对比实验，采用 mAP@0.5 作为核心评价指标，并构建基于 Flask 的可视化推理界面用于部署验证。',
        'projects.thesis.year': '完成时间',
        'projects.p1.title': 'LLM-Based Vehicle Control Framework',
        'projects.p1.desc': '探索性研究：将大语言模型集成至车辆纵向控制（VLM）框架，利用 LLM 的自然语言理解与推理能力辅助跟车决策与异常工况识别。涉及 Python 仿真环境搭建、VLM 模型参数调优、LLM API 调用链路设计，以及控制稳定性与时延特性的初步分析。',
        'projects.p2.title': 'CSDN 技术博客（51 篇原创）',
        'projects.p2.desc': '开设"大模型""深度学习"等专栏，2026 年持续更新技术笔记 50 篇，涵盖 PyTorch 张量操作详解、神经网络训练流程剖析、Faster R-CNN 论文精读与 LLM 应用实践，累计访问量 16,000+、获收藏 199 次。',
        'projects.p3.title': '政务二维码赋码管理系统',
        'projects.p3.desc': '以产品经理角色参与山东省公共资源交易数字化转型项目。主导身份码、商品码、竞价码等 6 类二维码实体的需求建模与功能设计，完成跨系统对接方案（公共资源交易平台、药械交易系统、电子营业执照系统），输出 PRD 文档与原型设计。',
        'projects.p4.title': '企业级门户网站前端优化',
        'projects.p4.desc': '负责三家科技企业官网的前端维护与性能优化。完成响应式布局重构，实现桌面端与移动端自适应；优化资源加载策略，提升首屏渲染速度；构建内容管理工作流，支持非技术人员后台更新。',
        'tag.techwriting': '技术写作',
        'tag.product': '产品设计',
        'tag.gov': '政务数字化',
        'tag.prototype': '原型',
        'tag.ops': '运维',
        'tag.responsive': '响应式',
        'tag.fe': '前端',
        'tag.llm': '大模型',
        'tag.exploring': '探索中',
        'tag.editing': '剪辑',
        'tag.shortvideo': '短视频',
        'tag.data': '数据驱动',
        'contact.title': '联系',
        'contact.desc': '欢迎就计算机视觉、大模型应用、自动驾驶控制等方向交流。'
    },
    en: {
        'sidebar.role': 'ECCE @ University of Nottingham Ningbo',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Tech Stack',
        'nav.projects': 'Research',
        'nav.contact': 'Contact',
        'theme.light': 'Light',
        'theme.dark': 'Dark',
        'hero.desc': "Starting MSc ECCE at UNNC (2026-2027). BSc in Big Data from Shandong Agricultural University. Research interests: computer vision, LLMs, and autonomous vehicle control.",
        'hero.csdn': '// tech_blog()',
        'about.title': 'About',
        'about.edu': '🎓 Education',
        'about.master.degree': 'MSc Electronic, Communication & Computer Engineering',
        'about.master.detail': '2026 - 2027 | University of Nottingham Ningbo | IELTS 7.0',
        'about.bachelor.degree': 'BSc Data Science & Big Data Technology',
        'about.bachelor.detail': '2021.09 - 2025.06 | Top 30% GPA | 1st Prize, Math Modeling Competition',
        'about.res': '🔬 Research Focus',
        'about.res.desc': 'Computer vision — improved object detection for agricultural disease diagnosis. Currently exploring LLM integration into longitudinal vehicle control frameworks.',
        'skills.title': 'Tech Stack',
        'skills.g1': 'Deep Learning & CV',
        'skills.g2': 'Languages & Tools',
        'skills.g3': 'Systems & Frontend',
        'skills.objdet': 'Object Detection (Faster R-CNN / YOLO)',
        'skills.llm': 'LLM Application Dev',
        'skills.sysdesign': 'System Architecture',
        'skills.dataaug': 'Data Augmentation & Tuning',
        'projects.title': 'Research Projects',
        'projects.thesis.title': 'Improved Faster R-CNN for Potato Leaf Disease Detection',
        'projects.thesis.desc': "Undergraduate thesis (44 pages). Replaced Faster R-CNN's backbone with MobileNetV4 for reduced compute overhead, and integrated Coordinate Attention (CA) to improve sensitivity to lesion position and scale. Trained and benchmarked on PlantVillage, mAP@0.5 as primary metric. Deployed via Flask for visual inference validation.",
        'projects.thesis.year': 'Completed',
        'projects.p1.title': 'LLM-Based Vehicle Control Framework',
        'projects.p1.desc': "Exploratory research: integrating a Large Language Model into the Vehicle Longitudinal Model (VLM) framework. Leveraging LLM reasoning for car-following decisions and anomaly detection. Work includes Python simulation, VLM parameter tuning, LLM API pipeline design, and preliminary control stability analysis.",
        'projects.p2.title': 'CSDN Tech Blog (51 Original Posts)',
        'projects.p2.desc': "Columns on 'LLM Applications' and 'Deep Learning' — 50 posts updated through 2026, covering PyTorch tensor internals, NN training pipelines, Faster R-CNN paper breakdowns, and LLM hands-on guides. 16,000+ views and 199 bookmarks.",
        'projects.p3.title': 'Govt QR Code Management System',
        'projects.p3.desc': 'Product manager on Shandong province public resource trading digitalization. Led requirements modeling for 6 QR code entity types (identity, product, bidding...). Designed cross-system integration with trading, medical device, and e-license platforms. Delivered PRD and prototype specs.',
        'projects.p4.title': 'Corporate Portal Frontend Optimization',
        'projects.p4.desc': 'Frontend maintenance for 3 tech company websites. Rewrote responsive layouts, optimized resource loading for faster first paint, and built CMS workflow for non-technical content updates.',
        'tag.techwriting': 'Tech Writing',
        'tag.product': 'Product',
        'tag.gov': 'Govt',
        'tag.prototype': 'Prototype',
        'tag.ops': 'Ops',
        'tag.responsive': 'Responsive',
        'tag.fe': 'Frontend',
        'tag.llm': 'LLMs',
        'tag.exploring': 'Exploring',
        'tag.editing': 'Editing',
        'tag.shortvideo': 'Short Video',
        'tag.data': 'Data-Driven',
        'contact.title': 'Contact',
        'contact.desc': "Open to chat about computer vision, LLM applications, or autonomous vehicle control research."
    }
};

// ===== Typewriter =====
const phrases = {
    zh: ['计算机视觉', 'PyTorch 调优', '大语言模型', '目标检测算法', '自动驾驶控制', 'IELTS 7.0'],
    en: ['Computer Vision', 'PyTorch Tuning', 'LLM Apps', 'Object Detection', 'Vehicle Control', 'IELTS 7.0']
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
const themeBtn = document.getElementById('themeToggle');

function applyLang(lang) {
    document.body.dataset.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    // Name display
    document.querySelectorAll('.sidebar-name').forEach(el => el.classList.add('hidden'));
    document.querySelector(lang === 'zh' ? '.sidebar-name' : '.sidebar-name-en')?.classList.remove('hidden');
    document.querySelectorAll('.hero-name-cn, .hero-name-en').forEach(el => el.classList.add('hidden'));
    document.querySelector(lang === 'zh' ? '.hero-name-cn' : '.hero-name-en')?.classList.remove('hidden');
    currentPhrases = phrases[lang]; phraseIdx = 0; charIdx = 0; deleting = false;
    localStorage.setItem('lang', lang);
    langToggle.querySelector('.lang-label').textContent = lang === 'zh' ? 'EN' : '中';
    updateThemeBtn();
}

const savedLang = localStorage.getItem('lang') || 'zh';
applyLang(savedLang);

langToggle?.addEventListener('click', () => {
    applyLang(document.body.dataset.lang === 'zh' ? 'en' : 'zh');
});

// ===== Scroll Spy =====
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
}, { threshold: 0.35 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ===== Theme Toggle =====
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
    if (!themeBtn) return;
    const label = themeBtn.querySelector('.toggle-label');
    const icon = themeBtn.querySelector('.toggle-icon');
    const lang = document.body.dataset.lang === 'en' ? 'en' : 'zh';
    const toLight = document.body.dataset.theme === 'dark';
    if (label) label.textContent = toLight ? i18n[lang]['theme.light'] : i18n[lang]['theme.dark'];
    if (icon) icon.textContent = toLight ? '☀' : '🌙';
}

// ===== Fade-in =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== Card spotlight (radial glow follows cursor) =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
});
