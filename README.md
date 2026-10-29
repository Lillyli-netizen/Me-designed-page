# Me-designed-page · AI-Guided Personal Homepage

EEEE3134 Coursework Part I — **Version 2 (AI-Guided)**: I provided detailed design instructions (layout, color system, bilingual content, interactions) and iterated with an AI coding assistant to implement them.

**Live:** <https://lillyli-netizen.github.io/Me-designed-page/>

**Version 1 (AI-Generated):** <https://lillyli-netizen.github.io/AI-generated-page/> · [Repo](https://github.com/Lillyli-netizen/AI-generated-page)

## Features

- Dark / light theme toggle (persisted in `localStorage`)
- Chinese / English bilingual switch (persisted)
- Typewriter hero, scroll-spy sidebar navigation, fade-in sections
- Skill bars animate on scroll (IntersectionObserver)
- Fully responsive — sidebar collapses to a bottom bar on mobile

## Tech Stack

HTML5 · CSS3 (custom properties, Grid / Flexbox) · Vanilla JavaScript

## Structure

| File | Role |
|---|---|
| `index.html` | Page content with `data-i18n` hooks |
| `style.css` | Theme variables (dark/light), layout, animations |
| `script.js` | i18n dictionary, typewriter, scroll observers, theme & language toggles |

---

Coursework for EEEE3134. AI assistance was used for code development as permitted by the coursework brief; all personal reflections in the accompanying report are authored independently by the student.
