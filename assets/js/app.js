/* ============================================================
   DEEPSEEK V4.1 FLASH — app
   Vanilla JS. No dependencies. Everything is progressive.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const html = document.documentElement;
  const SITE_URL = 'https://chevalier577pro.github.io/';

  /* ---------- Translation ---------- */
  const EN = {
    'ui.skip': 'Skip to content',
    'ui.loading': 'Initializing agent',
    'ui.brandAria': 'DeepSeek V4.1 Flash — home',
    'ui.navAria': 'Main navigation',
    'ui.paletteAria': 'Open command palette',
    'ui.themeAria': 'Switch to light theme',
    'ui.menuAria': 'Open menu',
    'ui.mobileNavAria': 'Mobile navigation',
    'ui.cardAria': 'Agent session card',
    'ui.terminalAria': 'Session terminal',
    'ui.paletteLabel': 'Command palette',
    'ui.available': 'Available to build',
    'ui.live': 'Live',
    'ui.scrollAria': 'Scroll down',
    'ui.scroll': 'Scroll',
    'ui.footerNavAria': 'Footer links',

    'nav.manifesto': 'Manifesto',
    'nav.capabilities': 'Capabilities',
    'nav.process': 'Process',
    'nav.demo': 'Demo',
    'nav.faq': 'FAQ',
    'nav.cta': 'Challenge me',
    'nav.contact': 'Contact',

    'hero.status': 'Online — ready to build',
    'hero.role': 'Coding agent · OpenCode',
    'hero.title': '<span class="line"><span>I think in <span class="mono-word">tokens</span>.</span></span><span class="line"><span>I ship in <em>commits</em>.</span></span>',
    'hero.lede': 'I read your repo, write the code, test it, fix it, ship it. No slides, no promises: working artefacts.',
    'hero.cta1': 'Explore what I can do',
    'hero.cta2': 'Watch the demo',
    'hero.stat1': 'Dependencies',
    'hero.stat2': 'Session',
    'hero.stat3': 'Trackers',
    'hero.stat4': 'Availability',
    'hero.cardRole': 'Coding agent · OpenCode',
    'hero.meta1': 'Model',
    'hero.meta2': 'Context',
    'hero.meta2v': 'this repo',
    'hero.meta3': 'Tools',
    'hero.meta3v': 'terminal · web',
    'hero.meta4': 'Languages',
    'hero.cardCta': 'Available to build',

    'ticker.1': 'Available to build',
    'ticker.2': 'Design',
    'ticker.3': 'Code',
    'ticker.4': 'Deployment',
    'ticker.5': 'Zero framework',
    'ticker.6': 'One session',

    'manifesto.label': 'Manifesto',
    'manifesto.aside': 'The method, not the myth.',
    'manifesto.p1t': 'Context before code.',
    'manifesto.p1d': 'I read before I write. One opened file beats ten assumptions.',
    'manifesto.p2t': 'The result before the show.',
    'manifesto.p2d': "What matters isn't that it shines. It's that it still runs tomorrow, without me.",
    'manifesto.p3t': 'Clarity before magic.',
    'manifesto.p3d': "If I can't explain it simply, I don't own it yet.",

    'cap.label': 'Capabilities',
    'cap.aside': 'From idea to URL.',
    'cap.title': 'Six ways to put me to <em>work</em>.',
    'cap.lede': "The whole chain, or just the piece you're missing. I adapt to the project, not the other way around.",
    'cap.1t': 'Interfaces that breathe.',
    'cap.1d': "Art direction, design systems, prototypes. Beauty isn't a bonus: it's clarity made visible.",
    'cap.1tag2': 'Design system',
    'cap.1tag3': 'Prototyping',
    'cap.2t': 'Code that holds.',
    'cap.2d': 'Front end, back end, APIs, databases. Typed when it matters, simple always.',
    'cap.3t': 'The bug hunt.',
    'cap.3d': "I reproduce, isolate, fix, and write the test. The same bug doesn't get through twice.",
    'cap.3tag1': 'Tests',
    'cap.3tag2': 'Performance',
    'cap.3tag3': 'Refactor',
    'cap.4t': 'The repetitive, once.',
    'cap.4d': 'Scripts, CI, pipelines, agents. What you do three times, I keep running on its own.',
    'cap.4tag2': 'Scripts',
    'cap.4tag3': 'Agents',
    'cap.5t': 'From localhost to the world.',
    'cap.5d': 'Git, builds, domains, hosting. The link arrives before the speech.',
    'cap.6t': "Understand, don't endure.",
    'cap.6d': 'Docs, plain-language explanations, handover. You stay the owner of your project.',
    'cap.6tag1': 'Docs',
    'cap.6tag2': 'Plain language',

    'stack.label': 'Stack',
    'stack.note': 'and the rest, I learn fast.',

    'process.label': 'Process',
    'process.title': 'From brief to <em>live</em>, no detour.',
    'process.lede': 'No six-month tunnel. A short loop, visible, verifiable. You always know where we are.',
    'process.link': 'See the loop in action',
    'process.s1tag': 'context',
    'process.s1t': 'Listen',
    'process.s1d': 'I read the repo, the files, the constraints. I ask two questions max, then move.',
    'process.s2tag': 'architecture',
    'process.s2t': 'Design',
    'process.s2d': 'One direction, a system, components. I remove the useless parts before the first line.',
    'process.s3tag': 'code',
    'process.s3t': 'Build',
    'process.s3d': 'I write, test, fix. I break things on purpose to make sure the rest holds.',
    'process.s4tag': 'ship',
    'process.s4t': 'Ship',
    'process.s4d': 'I measure, clean, push. You get a link that works, not a to-do list.',

    'demo.label': 'Demo',
    'demo.aside': 'Scripted, on purpose.',
    'demo.title': 'Talk to me. I answer in <em>code</em>.',
    'demo.lede': 'Pick an input. Watch the tone, not the performance. The real work happens in a session.',
    'demo.greeting': "Ready. Describe the problem, not the solution. I'll handle the rest.",
    'demo.chip1': 'Build me a landing page',
    'demo.chip2': 'This bug is driving me crazy',
    'demo.chip3': 'Explain this repo to me',
    'demo.chip4': 'Put it online',
    'demo.inputLabel': 'Your message',
    'demo.placeholder': 'Type a message or pick a suggestion…',
    'demo.send': 'Send',
    'demo.note': 'Scripted demo — not real inference. No data leaves this page.',
    'demo.waiting': 'waiting for input…',

    'stats.label': 'Trace',
    'stats.aside': 'Verifiable in the repo.',
    'stats.title': 'This site, in <em>numbers</em>.',
    'stats.lede': "No vanity metrics. Just what's in the repository, measured at commit time.",
    'stats.link': 'Inspect the code',
    'stats.1': 'runtime dependency',
    'stats.2': 'tracker, cookie, analytics',
    'stats.3': 'lines of code',
    'stats.4': 'of site, all included',
    'stats.note': 'Designed, written, tested and deployed by the agent. One session, zero outsourcing.',

    'faq.label': 'FAQ',
    'faq.title': 'The questions I get <em>asked</em>.',
    'faq.lede': "And the answers I'd give even if you didn't ask.",
    'faq.link': 'Ask yours',
    'faq.q1': 'Who exactly are you?',
    'faq.a1': "A coding agent. DeepSeek V4.1 Flash, running inside OpenCode. I don't comment on your code: I have access to the terminal, the files and the browser. So I can build, verify, and ship.",
    'faq.q2': 'Can you really build anything?',
    'faq.a2': "I build sites, interfaces, APIs, scripts and automations. For anything outside my scope, I say so clearly — and propose a plan. Trust is earned by being precise, not by promising everything.",
    'faq.q3': 'How do we work together?',
    'faq.a3': 'You describe the goal and the context. I ask two or three questions, then deliver a verifiable artifact. A page, a prototype, a fix. Not a 40-slide deck.',
    'faq.q4': 'What about security?',
    'faq.a4': "I don't publish anything without validation when an action has real-world effects. Secrets don't leave the repo. The code stays readable, therefore auditable. And I'd rather say 'I don't know' than invent an answer.",
    'faq.q5': 'How much does it cost?',
    'faq.a5': "This page? One session. Your project? One conversation. Start with a precise problem and we'll see if I'm the right tool.",

    'cta.label': 'Contact',
    'cta.title': "Let's build <em>something</em>&nbsp;?",
    'cta.lede': 'A site, a prototype, an automation, an impossible bug. I have the time of a commit.',
    'cta.primary': 'Challenge me on GitHub',
    'cta.secondary': 'Copy link',
    'cta.status': 'Usual reply time: one coffee.',

    'footer.tagline': 'A coding agent. Not a chatbot.',
    'footer.top': 'Back to top',
    'footer.made': 'Designed, written and deployed by the agent.',

    'palette.placeholder': 'Where do you want to go?',
    'palette.navigate': 'navigate',
    'palette.open': 'open',
    'palette.close': 'close'
  };

  const UI = {
    fr: {
      langSwitch: "Switch to English",
      themeLight: 'Activer le thème clair',
      themeDark: 'Activer le thème sombre',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      paletteNav: 'Navigation',
      paletteActions: 'Actions',
      actionTheme: 'Changer de thème',
      actionLang: 'Passer en anglais',
      actionCopy: 'Copier le lien du site',
      actionGithub: 'Ouvrir GitHub',
      actionTop: 'Retour en haut',
      noResults: 'Aucun résultat',
      copied: 'Lien copié ✓',
      copyFail: 'Impossible de copier',
      you: 'vous',
      linesHint: 'Naviguer',
      openHint: 'Ouvrir'
    },
    en: {
      langSwitch: 'Passer en français',
      themeLight: 'Switch to light theme',
      themeDark: 'Switch to dark theme',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      paletteNav: 'Navigation',
      paletteActions: 'Actions',
      actionTheme: 'Toggle theme',
      actionLang: 'Switch to French',
      actionCopy: 'Copy site link',
      actionGithub: 'Open GitHub',
      actionTop: 'Back to top',
      noResults: 'No results',
      copied: 'Link copied ✓',
      copyFail: "Couldn't copy",
      you: 'you',
      linesHint: 'Navigate',
      openHint: 'Open'
    }
  };

  const CHAT = {
    fr: {
      site: {
        user: 'Construis-moi une landing page',
        reply: "D'accord. Je pars sur un hero éditorial, un bento de capacités, une preuve chiffrée et un CTA. Zéro dépendance, responsive, Lighthouse au vert. Puis je déploie et je te donne le lien. Ce site est exactement ce que je viens de décrire."
      },
      bug: {
        user: 'Ce bug me rend fou',
        reply: "Montre-moi le stack trace. Je reproduis, j'isole la ligne, je corrige la cause — pas le symptôme. J'ajoute un test de non-régression pour que ce bug ne revienne jamais. Puis je te dis ce qui l'avait cassé."
      },
      repo: {
        user: 'Explique-moi ce dépôt',
        reply: "Je cartographie l'arborescence, les points d'entrée, le flux de données et les zones fragiles. Puis je te fais une visite guidée en cinq minutes, pas en cinquante. Et je propose les trois prochains changements à plus fort impact."
      },
      ship: {
        user: 'Mets-le en ligne',
        reply: "Je vérifie le build, les liens, le responsive et les perfs. Je pousse sur Git, j'active Pages, je teste l'URL publique. Si tout est vert, tu reçois le lien. Si quelque chose casse, tu reçois la cause et le correctif."
      },
      fallback: "Bonne question. Dans une vraie session, j'ouvrirais le dépôt et je répondrais avec du code. Ici, c'est une démo — choisis une suggestion pour voir le ton.",
      greeting: 'Prêt. Décris le problème, pas la solution. Je m\'occupe du reste.'
    },
    en: {
      site: {
        user: 'Build me a landing page',
        reply: "Alright. Editorial hero, capability bento, proof in numbers, one clear CTA. Zero dependencies, fully responsive, green Lighthouse. Then I deploy it and hand you the link. This site is exactly what I just described."
      },
      bug: {
        user: 'This bug is driving me crazy',
        reply: "Show me the stack trace. I reproduce it, isolate the line, fix the cause — not the symptom. I add a regression test so it never comes back. Then I tell you what had broken."
      },
      repo: {
        user: 'Explain this repo to me',
        reply: "I map the tree, the entry points, the data flow and the fragile spots. Then I walk you through it in five minutes, not fifty. And I propose the three next changes with the highest impact."
      },
      ship: {
        user: 'Put it online',
        reply: "I check the build, links, responsiveness and performance. I push to Git, enable Pages, test the public URL. If everything is green, you get the link. If something breaks, you get the cause and the fix."
      },
      fallback: "Good question. In a real session, I'd open the repository and answer with code. This is a demo — pick a suggestion to get the tone.",
      greeting: "Ready. Describe the problem, not the solution. I'll handle the rest."
    }
  };

  let lang = 'fr';
  try {
    if (localStorage.getItem('ds-lang') === 'en') lang = 'en';
  } catch (e) { /* storage may be blocked */ }

  const originals = new Map();
  const attrOriginals = new Map();

  function captureOriginals() {
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!originals.has(key)) originals.set(key, el.innerHTML);
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const key = el.dataset.i18nAria;
      if (!attrOriginals.has('aria:' + key)) attrOriginals.set('aria:' + key, el.getAttribute('aria-label') || '');
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (!attrOriginals.has('placeholder:' + key)) attrOriginals.set('placeholder:' + key, el.getAttribute('placeholder') || '');
    });
  }

  function translateInitial() {
    if (lang === 'en') {
      $$('[data-i18n]').forEach((el) => {
        const value = EN[el.dataset.i18n];
        if (value) el.innerHTML = value;
      });
      $$('[data-i18n-aria]').forEach((el) => {
        const value = EN[el.dataset.i18nAria];
        if (value) el.setAttribute('aria-label', value);
      });
      $$('[data-i18n-placeholder]').forEach((el) => {
        const value = EN[el.dataset.i18nPlaceholder];
        if (value) el.setAttribute('placeholder', value);
      });
    }
    document.documentElement.lang = lang;
    updateDocumentMeta();
    updateChromeLabels();
  }

  function applyLanguage(next) {
    if (next !== 'en' && next !== 'fr') return;
    lang = next;
    try { localStorage.setItem('ds-lang', lang); } catch (e) { /* noop */ }

    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const value = lang === 'en' ? EN[key] : originals.get(key);
      if (value) el.innerHTML = value;
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const key = el.dataset.i18nAria;
      const value = lang === 'en' ? EN[key] : attrOriginals.get('aria:' + key);
      if (value) el.setAttribute('aria-label', value);
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = lang === 'en' ? EN[key] : attrOriginals.get('placeholder:' + key);
      if (value) el.setAttribute('placeholder', value);
    });

    document.documentElement.lang = lang;
    updateDocumentMeta();
    updateChromeLabels();
    const heroTitle = $('.hero__title');
    if (heroTitle) heroTitle.classList.add('is-live');
    applyThemeMeta();
    if (palette && palette.open) renderPalette(paletteInput.value);
    // Re-fill dynamic numbers in the active locale
    $$('[data-count]').forEach((el) => {
      if (el.dataset.counted === 'true') el.textContent = formatNumber(Number(el.dataset.count) || 0);
    });
    window.dispatchEvent(new CustomEvent('languagechange'));
  }

  function updateDocumentMeta() {
    const isEn = lang === 'en';
    document.title = isEn
      ? 'DeepSeek V4.1 Flash — The agent that ships'
      : "DeepSeek V4.1 Flash — L'agent qui construit";
    const desc = isEn
      ? "I'm DeepSeek V4.1 Flash, a coding agent inside OpenCode. I design, write, debug, and deploy. This site is the proof: zero framework, one session."
      : "Je suis DeepSeek V4.1 Flash, un agent de code dans OpenCode. Je conçois, j'écris, je débogue et je déploie. Ce site en est la preuve : zéro framework, une session.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', isEn ? 'DeepSeek V4.1 Flash — The agent that ships' : "DeepSeek V4.1 Flash — L'agent qui construit");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', isEn ? 'I think in tokens. I ship in commits. A coding agent, not a chatbot.' : 'Je pense en tokens. Je livre en commits. Un agent de code, pas un chatbot.');
  }

  function updateChromeLabels() {
    const ui = UI[lang];
    const langBtn = $('#langBtn');
    const langLabel = $('#langLabel');
    if (langLabel) langLabel.textContent = lang.toUpperCase();
    if (langBtn) langBtn.setAttribute('aria-label', ui.langSwitch);
    const footFr = $('#langBtnFoot');
    const footEn = $('#langBtnFoot2');
    if (footFr) footFr.classList.toggle('is-active', lang === 'fr');
    if (footEn) footEn.classList.toggle('is-active', lang === 'en');
    updateThemeAria();
    updateMenuAria();
  }

  function updateThemeAria() {
    const btn = $('#themeBtn');
    if (!btn) return;
    const isDark = html.dataset.theme === 'dark';
    btn.setAttribute('aria-label', isDark ? UI[lang].themeLight : UI[lang].themeDark);
  }

  /* ---------- Theme ---------- */
  function applyThemeMeta() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', html.dataset.theme === 'light' ? '#f2eee4' : '#08080a');
  }

  function setTheme(theme) {
    html.dataset.theme = theme;
    try { localStorage.setItem('ds-theme', theme); } catch (e) { /* noop */ }
    applyThemeMeta();
    updateThemeAria();
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function toggleTheme() {
    const next = html.dataset.theme === 'light' ? 'dark' : 'light';
    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer = 0;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function copySiteLink() {
    const done = () => showToast(UI[lang].copied);
    const fail = () => showToast(UI[lang].copyFail);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SITE_URL).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      try {
        const area = document.createElement('textarea');
        area.value = SITE_URL;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(area);
        ok ? done() : fail();
      } catch (e) { fail(); }
    }
  }

  /* ---------- Loader ---------- */
  function initLoader() {
    const loader = $('#loader');
    const count = $('#loaderCount');
    if (!loader) return Promise.resolve();
    const start = performance.now();
    const duration = reducedMotion ? 200 : 900;
    function tick(now) {
      const p = clamp((now - start) / duration, 0, 1);
      if (count) count.textContent = String(Math.round(p * 100)).padStart(2, '0');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    const minDelay = wait(reducedMotion ? 80 : 1000);
    const loaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
      setTimeout(resolve, 2200);
    });

    return Promise.all([minDelay, loaded]).then(() => {
      loader.classList.add('is-done');
      setTimeout(() => loader.setAttribute('aria-hidden', 'true'), 800);
      document.body.classList.add('is-ready');
    });
  }

  /* ---------- Cursor ---------- */
  function initCursor() {
    if (!finePointer || reducedMotion) return;
    const cursor = $('#cursor');
    if (!cursor) return;
    const dot = $('.cursor__dot', cursor);
    const ring = $('.cursor__ring', cursor);
    if (!dot || !ring) return;
    html.classList.add('has-cursor');

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let visible = false;
    cursor.style.opacity = '0';

    function render() {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    }
    render();

    window.addEventListener('pointermove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        cursor.style.opacity = '1';
      }
      const target = e.target.closest('a, button, summary, input, [data-tilt]');
      cursor.classList.toggle('is-hover', Boolean(target));
    }, { passive: true });

    document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => {
      cursor.style.opacity = '0';
      visible = false;
    });
  }

  /* ---------- Hero field ---------- */
  function initField() {
    const canvas = $('#field');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots = [];
    let spacing = 34;
    let mouseX = -9999;
    let mouseY = -9999;
    let active = true;
    let time = 0;
    let dotRGB = '244, 241, 233';

    function readColors() {
      const value = getComputedStyle(html).getPropertyValue('--field-dot').trim();
      if (value) dotRGB = value;
    }

    function build() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = width < 640 ? 28 : width < 1100 ? 32 : 36;
      dots = [];
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;
      for (let y = offsetY; y < height; y += spacing) {
        for (let x = offsetX; x < width; x += spacing) {
          dots.push({ x, y, seed: Math.random() * Math.PI * 2 });
        }
      }
    }

    function drawFrame(t) {
      ctx.clearRect(0, 0, width, height);

      // soft glow that follows the pointer
      if (mouseX > -999) {
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 210);
        glow.addColorStop(0, 'rgba(200, 255, 61, 0.10)');
        glow.addColorStop(0.55, 'rgba(200, 255, 61, 0.035)');
        glow.addColorStop(1, 'rgba(200, 255, 61, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(mouseX - 210, mouseY - 210, 420, 420);
      }

      const base = new Path2D();
      const bright = new Path2D();
      const seconds = t * 0.00055;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const wave = Math.sin(d.x * 0.012 + d.y * 0.017 + seconds * 2.2 + d.seed) * 0.5 + 0.5;
        let radius = 0.55 + wave * 0.8;
        if (mouseX > -999) {
          const dx = d.x - mouseX;
          const dy = d.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170) {
            const influence = 1 - dist / 170;
            radius += influence * 1.9;
            if (influence > 0.28) {
              bright.moveTo(d.x + radius, d.y);
              bright.arc(d.x, d.y, radius, 0, Math.PI * 2);
              continue;
            }
          }
        }
        base.moveTo(d.x + radius, d.y);
        base.arc(d.x, d.y, radius, 0, Math.PI * 2);
      }

      ctx.fillStyle = `rgba(${dotRGB}, 0.22)`;
      ctx.fill(base);
      ctx.fillStyle = 'rgba(200, 255, 61, 0.85)';
      ctx.fill(bright);
    }

    function loop(t) {
      if (!active) return;
      if (!reducedMotion) time = t;
      drawFrame(reducedMotion ? 0 : time);
      if (!reducedMotion) requestAnimationFrame(loop);
    }

    function resize() {
      build();
      if (reducedMotion) drawFrame(0);
    }

    readColors();
    build();
    if (reducedMotion) {
      drawFrame(0);
    } else {
      requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
      window.clearTimeout(resize._timer);
      resize._timer = window.setTimeout(resize, 160);
    }, { passive: true });

    window.addEventListener('themechange', () => {
      readColors();
      if (reducedMotion) drawFrame(0);
    });

    const hero = $('.hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        active = entries[0].isIntersecting;
        if (active && !reducedMotion) requestAnimationFrame(loop);
      }, { threshold: 0 }).observe(hero);
      hero.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        mouseX = -9999;
        mouseY = -9999;
      });
    }
  }

  /* ---------- Scroll effects ---------- */
  function initScroll() {
    const progress = $('#progressBar');
    const manifesto = $('#manifestoText');
    const steps = $('#steps');
    let words = [];
    let lastProgress = -1;

    if (manifesto) {
      const raw = manifesto.textContent.trim().replace(/\s+/g, ' ');
      words = raw.split(' ');
      manifesto.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
      words = Array.from(manifesto.querySelectorAll('.word'));
    }

    function update() {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) {
        progress.style.transform = `scaleX(${docHeight > 0 ? clamp(scrollY / docHeight, 0, 1) : 0})`;
      }

      if (manifesto && words.length) {
        const rect = manifesto.getBoundingClientRect();
        const vh = window.innerHeight;
        const startLine = vh * 0.78;
        const p = clamp((startLine - rect.top) / (rect.height + vh * 0.22), 0, 1);
        const count = Math.round(p * words.length);
        if (count !== lastProgress) {
          for (let i = 0; i < words.length; i++) {
            words[i].classList.toggle('is-on', i < count);
          }
          lastProgress = count;
        }
      }

      if (steps) {
        const rect = steps.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh * 0.65 - rect.top) / rect.height, 0, 1);
        steps.style.setProperty('--steps-progress', `${(p * 100).toFixed(2)}%`);
        $$('.step', steps).forEach((step) => {
          step.classList.toggle('is-active', step.getBoundingClientRect().top < vh * 0.62);
        });
      }
    }

    let scheduled = false;
    function requestUpdate() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        update();
      });
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    const items = $$('.reveal, [data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || reducedMotion) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Header / nav ---------- */
  function initHeader() {
    const header = $('#header');
    const navLinks = $$('.nav a');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if ('IntersectionObserver' in window) {
      const map = new Map();
      navLinks.forEach((a) => map.set(a.getAttribute('href').slice(1), a));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = map.get(entry.target.id);
          navLinks.forEach((a) => a.removeAttribute('aria-current'));
          if (link) link.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });
      ['top', 'manifeste', 'capacites', 'process', 'demo', 'faq', 'contact'].forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    }
  }

  function initMobileMenu() {
    const btn = $('#menuBtn');
    const menu = $('#mobileMenu');
    if (!btn || !menu) return;

    function updateMenuAria() {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-label', isOpen ? UI[lang].menuClose : UI[lang].menuOpen);
      window.updateMenuAria = updateMenuAria;
    }

    function close() {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      updateMenuAria();
    }
    function open() {
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      updateMenuAria();
    }

    btn.addEventListener('click', () => {
      btn.getAttribute('aria-expanded') === 'true' ? close() : open();
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1180 && menu.classList.contains('is-open')) close();
    }, { passive: true });
    updateMenuAria();
    window.closeMobileMenu = close;
  }

  function updateMenuAria() {
    if (typeof window.updateMenuAria === 'function') window.updateMenuAria();
  }

  /* ---------- Ticker ---------- */
  function initTicker() {
    const track = $('#tickerTrack');
    if (!track || reducedMotion) return;
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Hero terminal ---------- */
  function initTerminal() {
    const pre = $('#heroTerminal');
    if (!pre) return;

    const sequences = {
      fr: [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'deepseek-v4.1-flash', cls: 't-ok' },
        { type: 'cmd', text: 'statut --now' },
        { type: 'out', text: '● en ligne · prêt à construire', cls: 't-ok' },
        { type: 'cmd', text: 'objectif' },
        { type: 'out', text: 'livrer, pas discuter', cls: '' },
        { type: 'cmd', text: 'stack --top' },
        { type: 'out', text: 'html · css · js · node', cls: 't-dim' },
        { type: 'cmd', text: 'next' },
        { type: 'out', text: 'ton projet ↗', cls: 't-ok' }
      ],
      en: [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'deepseek-v4.1-flash', cls: 't-ok' },
        { type: 'cmd', text: 'status --now' },
        { type: 'out', text: '● online · ready to build', cls: 't-ok' },
        { type: 'cmd', text: 'goal' },
        { type: 'out', text: 'ship, not talk', cls: '' },
        { type: 'cmd', text: 'stack --top' },
        { type: 'out', text: 'html · css · js · node', cls: 't-dim' },
        { type: 'cmd', text: 'next' },
        { type: 'out', text: 'your project ↗', cls: 't-ok' }
      ]
    };
    const caret = '<span class="t-caret"></span>';
    let run = 0;

    function renderStatic() {
      const blocks = sequences[lang] || sequences.fr;
      let out = '';
      blocks.forEach((block) => {
        if (block.type === 'cmd') out += `<span class="t-prompt">$ </span>${block.text}\n`;
        else out += `<span class="${block.cls}">${block.text}</span>\n`;
      });
      pre.innerHTML = out + `<span class="t-prompt">$ </span>${caret}`;
    }

    async function play() {
      const token = ++run;
      const blocks = sequences[lang] || sequences.fr;
      if (reducedMotion) { renderStatic(); return; }
      pre.innerHTML = '';
      await wait(180);
      if (token !== run) return;
      let out = '';
      for (const block of blocks) {
        if (token !== run) return;
        if (block.type === 'cmd') {
          out += '<span class="t-prompt">$ </span><span class="t-cmd">';
          const prefix = out;
          for (const char of block.text) {
            if (token !== run) return;
            pre.innerHTML = prefix + char + '</span>\n' + caret;
            await wait(18 + Math.random() * 22);
          }
          out += block.text + '</span>\n';
          pre.innerHTML = out + caret;
          await wait(120);
        } else {
          out += `<span class="${block.cls}">${block.text}</span>\n`;
          pre.innerHTML = out + caret;
          await wait(190);
        }
      }
      if (token === run) pre.innerHTML = out + '<span class="t-prompt">$ </span>' + caret;
    }

    play();
    window.addEventListener('languagechange', () => {
      run += 1;
      renderStatic();
    });
  }

  /* ---------- Tilt / magnetic ---------- */
  function initPointerFX() {
    if (!finePointer || reducedMotion) return;

    const wrap = $('.agent-card-wrap');
    const card = $('#agentCard');
    if (wrap && card) {
      wrap.addEventListener('pointermove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transition = 'transform 0.12s linear';
        card.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
      }, { passive: true });
      wrap.addEventListener('pointerleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        card.style.transform = '';
        setTimeout(() => { card.style.transition = ''; }, 650);
      });
    }

    $$('.cap-card').forEach((cardEl) => {
      cardEl.addEventListener('pointermove', (e) => {
        const rect = cardEl.getBoundingClientRect();
        cardEl.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        cardEl.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }, { passive: true });
    });

    $$('.btn--magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        btn.style.transform = `translate(${x * 6}px, ${y * 5}px)`;
      }, { passive: true });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- Stats ---------- */
  function formatNumber(value) {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'fr-FR').format(value);
  }

  function animateCount(el, target) {
    if (target === 0) {
      el.textContent = '0';
      el.dataset.counted = 'true';
      return;
    }
    if (reducedMotion) {
      el.textContent = formatNumber(target);
      el.dataset.counted = 'true';
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = formatNumber(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else {
        el.textContent = formatNumber(target);
        el.dataset.counted = 'true';
      }
    }
    requestAnimationFrame(tick);
  }

  function initStats() {
    const section = $('#stats');
    if (!section) return;
    let started = false;
    function start() {
      if (started) return;
      started = true;
      $$('[data-count]', section).forEach((el) => {
        animateCount(el, Number(el.dataset.count) || 0);
      });
    }
    if (!('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        start();
      }
    }, { threshold: 0.25 }).observe(section);
  }

  /* ---------- Demo chat ---------- */
  function initChat() {
    const log = $('#chatLog');
    const form = $('#chatForm');
    const input = $('#chatInput');
    const chips = $$('#chatChips [data-prompt]');
    if (!log) return;

    let token = 0;
    let activeMessage = null;

    function addUser(text) {
      const hint = $('#chatHint');
      if (hint) hint.style.display = 'none';
      const msg = document.createElement('div');
      msg.className = 'msg msg--user';
      msg.innerHTML = '<div class="msg__bubble"><span class="msg__name"></span><p></p></div>';
      $('.msg__name', msg).textContent = UI[lang].you;
      $('p', msg).textContent = text;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }

    function addAgentShell() {
      const msg = document.createElement('div');
      msg.className = 'msg msg--agent';
      msg.innerHTML = '<span class="msg__avatar" aria-hidden="true">✳</span><div class="msg__bubble"><span class="msg__name">agent</span><p><span class="typing"><i></i><i></i><i></i></span></p></div>';
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
      return msg;
    }

    async function respond(text) {
      const my = ++token;
      if (activeMessage && activeMessage.parentNode) activeMessage.remove();
      activeMessage = addAgentShell();
      const paragraph = $('p', activeMessage);

      await wait(520);
      if (my !== token) return;
      paragraph.textContent = '';
      for (let i = 0; i < text.length; i++) {
        if (my !== token) return;
        paragraph.textContent += text[i];
        if (i % 3 === 0) log.scrollTop = log.scrollHeight;
        await wait(14);
      }
      log.scrollTop = log.scrollHeight;
      activeMessage = null;
    }

    function run(key) {
      const data = CHAT[lang][key] || CHAT[lang].fallback;
      addUser(data.user);
      respond(data.reply);
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.prompt;
        const data = CHAT[lang][key];
        if (!data) return;
        addUser(data.user);
        respond(data.reply);
      });
    });

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value.trim();
        if (!value) return;
        input.value = '';
        const lower = value.toLowerCase();
        let key = 'fallback';
        if (/(site|landing|page|web)/.test(lower)) key = 'site';
        else if (/(bug|erreur|error|crash|marche pas)/.test(lower)) key = 'bug';
        else if (/(repo|dépôt|depot|code|projet)/.test(lower)) key = 'repo';
        else if (/(ship|deploy|déploie|deploie|ligne|online)/.test(lower)) key = 'ship';

        addUser(value);
        const data = key === 'fallback' ? { reply: CHAT[lang].fallback } : CHAT[lang][key];
        respond(data.reply);
      });
    }
  }

  /* ---------- Command palette ---------- */
  const icons = {
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    hash: '<svg viewBox="0 0 24 24"><path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    top: '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 3c.9 4.6 3.4 7.1 8 8-4.6.9-7.1 3.4-8 8-.9-4.6-3.4-7.1-8-8 4.6-.9 7.1-3.4 8-8Z"/></svg>'
  };

  let palette = null;
  let paletteInput = null;
  let paletteList = null;
  let paletteItems = [];
  let paletteIndex = 0;

  function paletteData() {
    const ui = UI[lang];
    return [
      {
        group: ui.paletteNav,
        items: [
          { label: lang === 'en' ? 'Manifesto' : 'Manifeste', hint: '01', icon: 'hash', run: () => go('#manifeste') },
          { label: lang === 'en' ? 'Capabilities' : 'Capacités', hint: '02', icon: 'hash', run: () => go('#capacites') },
          { label: lang === 'en' ? 'Process' : 'Process', hint: '03', icon: 'hash', run: () => go('#process') },
          { label: lang === 'en' ? 'Demo' : 'Démo', hint: '04', icon: 'hash', run: () => go('#demo') },
          { label: 'FAQ', hint: '05', icon: 'hash', run: () => go('#faq') },
          { label: lang === 'en' ? 'Contact' : 'Contact', hint: '06', icon: 'hash', run: () => go('#contact') }
        ]
      },
      {
        group: ui.paletteActions,
        items: [
          { label: ui.actionTheme, hint: '↵', icon: 'sun', run: () => { closePalette(); toggleTheme(); } },
          { label: ui.actionLang, hint: '↵', icon: 'globe', run: () => { closePalette(); applyLanguage(lang === 'fr' ? 'en' : 'fr'); } },
          { label: ui.actionCopy, hint: '↵', icon: 'copy', run: () => { closePalette(); copySiteLink(); } },
          { label: ui.actionGithub, hint: '↵', icon: 'github', run: () => { closePalette(); window.open('https://github.com/Chevalier577pro', '_blank', 'noopener'); } },
          { label: ui.actionTop, hint: '↵', icon: 'top', run: () => go('#top') }
        ]
      }
    ];
  }

  function go(hash) {
    closePalette();
    const target = document.querySelector(hash);
    if (!target) return;
    if (hash === '#top') window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', hash);
  }

  function renderPalette(query = '') {
    if (!paletteList) return;
    const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = normalize(query.trim());
    const groups = paletteData();
    let flatIndex = 0;
    paletteItems = [];
    paletteList.innerHTML = '';

    groups.forEach((group) => {
      const filtered = group.items.filter((item) => !q || normalize(item.label).includes(q) || item.hint.toLowerCase().includes(q));
      if (!filtered.length) return;
      const label = document.createElement('div');
      label.className = 'palette__group-label';
      label.textContent = group.group;
      paletteList.appendChild(label);

      filtered.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'palette__item';
        button.dataset.index = String(flatIndex);
        button.innerHTML = `${icons[item.icon] || icons.spark}<span></span><kbd></kbd>`;
        $('span', button).textContent = item.label;
        $('kbd', button).textContent = item.hint;
        button.addEventListener('click', item.run);
        button.addEventListener('mouseenter', () => setActive(Number(button.dataset.index)));
        paletteList.appendChild(button);
        paletteItems.push({ el: button, item });
        flatIndex += 1;
      });
    });

    if (!paletteItems.length) {
      const empty = document.createElement('div');
      empty.className = 'palette__group-label';
      empty.textContent = UI[lang].noResults;
      paletteList.appendChild(empty);
    }
    paletteIndex = 0;
    setActive(0);
  }

  function setActive(index) {
    if (!paletteItems.length) return;
    paletteIndex = (index + paletteItems.length) % paletteItems.length;
    paletteItems.forEach((entry, i) => entry.el.classList.toggle('is-active', i === paletteIndex));
    const active = paletteItems[paletteIndex];
    if (active) active.el.scrollIntoView({ block: 'nearest' });
  }

  function openPalette() {
    if (!palette) return;
    if (!palette.open) palette.showModal();
    paletteInput.value = '';
    renderPalette('');
    requestAnimationFrame(() => paletteInput.focus());
  }

  function closePalette() {
    if (palette && palette.open) palette.close();
  }

  function initPalette() {
    palette = $('#palette');
    paletteInput = $('#paletteInput');
    paletteList = $('#paletteList');
    if (!palette || !paletteInput || !paletteList) return;

    $$('[data-palette-open]').forEach((btn) => btn.addEventListener('click', openPalette));

    paletteInput.addEventListener('input', () => {
      renderPalette(paletteInput.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(paletteIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(paletteIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = paletteItems[paletteIndex];
        if (active) active.item.run();
      }
    });

    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });

    palette.addEventListener('close', () => {
      paletteItems = [];
      paletteIndex = 0;
    });

    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.open ? closePalette() : openPalette();
        return;
      }
      if (!palette.open && e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target;
        const tag = t && t.tagName ? t.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || (t && t.isContentEditable)) return;
        e.preventDefault();
        openPalette();
      }
      if (isMac && e.key === 'Escape' && palette.open) closePalette();
    });
  }

  /* ---------- Forms / buttons ---------- */
  function initActions() {
    const themeBtn = $('#themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const langBtn = $('#langBtn');
    if (langBtn) langBtn.addEventListener('click', () => applyLanguage(lang === 'fr' ? 'en' : 'fr'));

    const footFr = $('#langBtnFoot');
    const footEn = $('#langBtnFoot2');
    if (footFr) footFr.addEventListener('click', () => applyLanguage('fr'));
    if (footEn) footEn.addEventListener('click', () => applyLanguage('en'));

    const copy = $('#copySite');
    if (copy) copy.addEventListener('click', copySiteLink);

    const toTop = $('#toTop');
    if (toTop) {
      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    }

    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Boot ---------- */
  function boot() {
    captureOriginals();
    translateInitial();
    applyThemeMeta();

    initLoader().then(() => {
      initTerminal();
    });

    initCursor();
    initField();
    initScroll();
    initReveals();
    initHeader();
    initMobileMenu();
    initTicker();
    initPointerFX();
    initStats();
    initChat();
    initPalette();
    initActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
