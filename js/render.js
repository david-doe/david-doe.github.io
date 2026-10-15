/* ==========================================================================
   js/render.js — construit les pages à partir de window.SITE
   --------------------------------------------------------------------------
   Rien n'est écrit en dur dans les pages HTML : tout vient de data/content.js
   (français) et de data/content.en.js (surcouche anglaise).
   Ce fichier ne contient que du rendu (HTML généré). Les comportements
   (carrousel, modale, scroll spy...) sont dans js/main.js.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Icônes SVG inline (24 px, trait fin, couleur = currentColor)
     ------------------------------------------------------------------------ */
  const ICONS = {
    // Soft skills
    equipe: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    autonomie: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>',
    curiosite: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    analyse: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
    organisation: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
    creativite: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
    pedagogie: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    adaptabilite: '<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 23-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    rigueur: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    // Compétences techniques
    python: '<path d="M12 2c-3 0-4.5 1.2-4.5 3.2V8h5v1H5.2C3.2 9 2 10.6 2 13s1.2 4 3.2 4H7v-2.6C7 12.6 8.4 11 10.4 11h4.2c1.6 0 2.9-1.3 2.9-2.9V5.2C17.5 3.2 15.5 2 12 2Z"/><path d="M12 22c3 0 4.5-1.2 4.5-3.2V16h-5v-1h7.3c2 0 3.2-1.6 3.2-4s-1.2-4-3.2-4H17v2.6c0 1.8-1.4 3.4-3.4 3.4H9.4c-1.6 0-2.9 1.3-2.9 2.9v2.9c0 1.9 2 3.1 5.5 3.1Z"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
    chart: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx="1"/><rect x="12" y="8" width="3" height="10" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/>',
    r: '<ellipse cx="12" cy="10" rx="10" ry="6.5"/><path d="M9 21V8h5a3 3 0 0 1 0 6H9"/><path d="m13 14 4 7"/>',
    powerbi: '<rect x="4" y="11" width="4" height="10" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="16" y="3" width="4" height="18" rx="1"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    git: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 8.5v7"/><path d="M18 10.5c0 4-6 3-10.5 5.6"/>',
    // Interface
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    dot: '<circle cx="12" cy="12" r="3"/>'
  };

  /** Renvoie le SVG d'une icône ; un nom inconnu retombe sur une puce. */
  function icon(name, cls) {
    const body = ICONS[name] || ICONS.dot;
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  /* ------------------------------------------------------------------------
     2. Utilitaires
     ------------------------------------------------------------------------ */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (arr) => Array.isArray(arr) && arr.length > 0;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const pad = (n) => String(n).padStart(2, '0');
  const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

  /* ------------------------------------------------------------------------
     3. Langue : FR (content.js) + surcouche EN (content.en.js)
     ------------------------------------------------------------------------ */
  const LANGS = ['fr', 'en'];

  function detectLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    try {
      const saved = localStorage.getItem('lang');
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* stockage indisponible (file:// sous certains navigateurs) */ }
    return 'fr';
  }

  /**
   * Fusion profonde : les objets se fusionnent, les tableaux d'objets
   * se fusionnent élément par élément (par `slug` pour les projets),
   * les tableaux simples (chaînes, lignes de tableau) sont remplacés.
   */
  function merge(base, over, key) {
    if (over === undefined) return base;
    if (Array.isArray(base) && Array.isArray(over)) {
      if (!base.some(isObj)) return over.slice();
      if (key === 'projects') {
        return base.map((b) => merge(b, over.find((o) => o && o.slug === b.slug)));
      }
      return base.map((b, i) => merge(b, over[i]));
    }
    if (isObj(base) && isObj(over)) {
      const out = Object.assign({}, base);
      Object.keys(over).forEach((k) => { out[k] = merge(base[k], over[k], k); });
      return out;
    }
    return over;
  }

  const BASE = window.SITE || {};
  let lang = detectLang();
  let S = build(lang);

  function build(l) {
    return l === 'en' && window.SITE_EN ? merge(BASE, window.SITE_EN) : BASE;
  }

  function setLang(l) {
    lang = LANGS.includes(l) ? l : 'fr';
    S = build(lang);
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignoré */ }
    document.documentElement.lang = lang;
  }

  /** Texte d'interface, avec remplacement de {variables}. */
  function L(key, vars) {
    let txt = (S.labels && S.labels[key]) || key;
    if (vars) Object.keys(vars).forEach((k) => { txt = txt.replace('{' + k + '}', vars[k]); });
    return txt;
  }

  const fmt = (n) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(n);

  /* ------------------------------------------------------------------------
     4. Thème et métadonnées
     ------------------------------------------------------------------------ */
  function applyTheme() {
    const t = S.theme || {};
    const root = document.documentElement.style;
    if (t.accent) root.setProperty('--accent', t.accent);
    if (t.accentHover) root.setProperty('--accent-hover', t.accentHover);
    if (t.accentBright) root.setProperty('--accent-bright', t.accentBright);
  }

  function setMeta(title, description) {
    const m = S.meta || {};
    const t = title || m.title || '';
    const d = description || m.description || '';
    document.title = t;
    const set = (sel, attr, val) => { const n = $(sel); if (n && val) n.setAttribute(attr, val); };
    set('meta[name="description"]', 'content', d);
    set('meta[property="og:title"]', 'content', t);
    set('meta[property="og:description"]', 'content', d);
    set('meta[property="og:locale"]', 'content', lang === 'fr' ? 'fr_FR' : 'en_US');
    if (m.url) {
      set('meta[property="og:url"]', 'content', m.url + location.pathname.replace(/^.*\//, '/') + location.search);
    }
  }

  /* ------------------------------------------------------------------------
     5. Composants réutilisables
     ------------------------------------------------------------------------ */

  /** Pastilles. `items` : chaînes ou { label, url }. */
  function pills(items, cls) {
    if (!has(items)) return '';
    return '<ul class="pills' + (cls ? ' ' + cls : '') + '">' + items.map((it) => {
      const o = typeof it === 'string' ? { label: it } : it;
      if (!o || !o.label) return '';
      return o.url
        ? '<li><a class="pill pill--link" href="' + esc(o.url) + '" target="_blank" rel="noopener">' + esc(o.label) + icon('external', 'pill__ext') + '</a></li>'
        : '<li><span class="pill">' + esc(o.label) + '</span></li>';
    }).join('') + '</ul>';
  }

  const projectUrl = (p) => p.externalUrl || ('project.html?slug=' + encodeURIComponent(p.slug));
  const projectTarget = (p) => (p.externalUrl ? ' target="_blank" rel="noopener"' : '');
  const metaLine = (a, b) => [a, b].filter(Boolean).map(esc).join(' <span class="sep">·</span> ');

  /**
   * Carte projet (carrousel ou liste).
   * variant "slide" : grande carte du carrousel ; "list" : page Travaux.
   */
  function projectCard(p, variant, index) {
    const list = variant === 'list';
    const stats = list && has(p.highlights)
      ? '<dl class="pcard__stats">' + p.highlights.slice(0, 3).map((h) => '<div><dt>' + esc(h.value) + '</dt><dd>' + esc(h.label) + '</dd></div>').join('') + '</dl>'
      : '';
    return (
      '<article class="pcard pcard--' + variant + '"' + (index != null ? ' data-index="' + index + '"' : '') + ' data-category="' + esc(p.category || '') + '">' +
        (p.image ? '<div class="pcard__media"><img src="' + esc(p.image) + '" alt="" loading="' + (index ? 'lazy' : 'eager') + '" decoding="async"></div>' : '<div class="pcard__media pcard__media--empty"></div>') +
        '<div class="pcard__shade" aria-hidden="true"></div>' +
        '<div class="pcard__grid" aria-hidden="true"></div>' +
        (index != null && !list ? '<span class="pcard__num" aria-hidden="true">' + pad(index + 1) + '</span>' : '') +
        '<div class="pcard__body">' +
          '<p class="pcard__meta">' + metaLine(p.date, p.kind) + '</p>' +
          '<h3 class="pcard__title"><a class="pcard__link" href="' + esc(projectUrl(p)) + '"' + projectTarget(p) + '>' + esc(p.title) + '</a></h3>' +
          '<p class="pcard__desc">' + esc(list ? (p.summary || p.description) : p.description) + '</p>' +
          stats +
          pills(p.tags) +
          '<span class="pcard__cta">' + esc(L('viewProject')) + icon('arrowRight') + '</span>' +
        '</div>' +
      '</article>'
    );
  }

  /** Carte d'expérience ou de formation. */
  function timelineCard(item, i) {
    const theme = item.theme === 'dark' ? 'dark' : 'light';
    return (
      '<article class="tcard tcard--' + theme + ' reveal" style="--d:' + (i * 80) + 'ms">' +
        (item.logo ? '<img class="tcard__logo" src="' + esc(item.logo) + '" alt="" aria-hidden="true" loading="lazy">' : '') +
        '<div class="tcard__inner">' +
          '<p class="tcard__meta">' + metaLine(item.period, item.kind) + '</p>' +
          '<h3 class="tcard__title">' + esc(item.title) + '</h3>' +
          (item.description ? '<p class="tcard__desc">' + esc(item.description) + '</p>' : '') +
          (has(item.bullets) ? '<ul class="tcard__list">' + item.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
          pills(item.links) +
        '</div>' +
      '</article>'
    );
  }

  function softSkillCard(s, i) {
    return '<li class="scard reveal" style="--d:' + (i * 50) + 'ms"><span class="scard__icon">' + icon(s.icon) + '</span><span class="scard__label">' + esc(s.label) + '</span></li>';
  }

  function sectionTitle(text, light) {
    return '<h2 class="section-title' + (light ? ' section-title--light' : '') + ' reveal">' + esc(text) + '</h2>';
  }

  /* ------------------------------------------------------------------------
     6. Navigation, sélecteur de langue et footer (toutes les pages)
     ------------------------------------------------------------------------ */

  /** Une entrée de navigation disparaît si sa section est vide. */
  function sectionHasContent(id) {
    switch (id) {
      case 'travaux': return has(S.projects);
      case 'skills': return has(S.skills) || has(S.softSkills);
      case 'experience': return has(S.experience);
      case 'formation': return has(S.education);
      case 'contact': return !!(S.person && S.person.email) || !!(S.socials && (S.socials.linkedin || S.socials.mail));
      default: return true;
    }
  }

  function renderNav(isHome) {
    const host = $('#site-header');
    if (!host) return;
    const person = S.person || {};
    const links = (S.nav || []).filter((n) => {
      const id = (n.href.split('#')[1] || '');
      return n.label && sectionHasContent(id);
    }).map((n) => {
      const id = n.href.split('#')[1] || '';
      const href = isHome && id ? '#' + id : n.href;
      return '<li><a class="nav__link" href="' + esc(href) + '" data-target="' + esc(id) + '">' + esc(n.label) + '</a></li>';
    }).join('');

    host.innerHTML =
      '<div class="nav container">' +
        '<a class="nav__logo" href="' + (isHome ? '#accueil' : 'index.html') + '">' + esc(person.logoText || ((person.firstName || '') + ' ' + (person.lastName || ''))) + '</a>' +
        '<nav class="nav__menu" id="nav-menu" aria-label="Navigation principale"><ul class="nav__links">' + links + '</ul></nav>' +
        '<div class="nav__end">' +
          '<div class="lang" role="group" aria-label="' + esc(L('langSwitch')) + '">' +
            LANGS.map((l) => '<button type="button" class="lang__btn' + (l === lang ? ' is-active' : '') + '" data-lang="' + l + '" aria-pressed="' + (l === lang) + '" lang="' + l + '">' + l.toUpperCase() + '</button>').join('<span class="lang__sep" aria-hidden="true">/</span>') +
          '</div>' +
          '<button type="button" class="nav__burger" aria-expanded="false" aria-controls="nav-menu" aria-label="' + esc(L('menu')) + '">' + icon('burger', 'icon--open') + icon('close', 'icon--close') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="progress" aria-hidden="true"><span class="progress__bar"></span></div>';

    const skip = $('.skip-link');
    if (skip) skip.textContent = L('skip');
  }

  function socialButtons() {
    const so = S.socials || {};
    const list = [
      { key: 'linkedin', url: so.linkedin, label: 'LinkedIn' },
      { key: 'github', url: so.github, label: 'GitHub' },
      { key: 'mail', url: so.mail || (S.person && S.person.email ? 'mailto:' + S.person.email : ''), label: 'E-mail' }
    ].filter((s) => s.url);
    return list.map((s) => '<a class="social" href="' + esc(s.url) + '" aria-label="' + s.label + '"' + (s.key === 'mail' ? '' : ' target="_blank" rel="noopener"') + '>' + icon(s.key) + '</a>').join('');
  }

  function renderFooter() {
    const host = $('#site-footer');
    if (!host) return;
    const p = S.person || {};
    const name = [p.firstName, p.lastName].filter(Boolean).join(' ');
    host.innerHTML =
      '<div class="container footer__top">' +
        '<p>© <span data-year>' + new Date().getFullYear() + '</span> · ' + esc(name) + '</p>' +
        '<div class="footer__socials">' + socialButtons() + '</div>' +
      '</div>' +
      '<p class="footer__credit">' + esc(L('createdBy')) + ' ' + esc(name) + '</p>';
  }

  /* ------------------------------------------------------------------------
     7. Page d'accueil
     ------------------------------------------------------------------------ */
  function renderHero() {
    const host = $('#accueil');
    if (!host) return;
    const p = S.person || {};
    const split = (word, offset) => Array.from(word || '').map((c, i) => '<span class="char" style="--i:' + (i + offset) + '">' + (c === ' ' ? '&nbsp;' : esc(c)) + '</span>').join('');
    const first = p.firstName || '';
    host.innerHTML =
      '<div class="hero__bg" aria-hidden="true"><span class="hero__glow hero__glow--1"></span><span class="hero__glow hero__glow--2"></span><span class="hero__lines"></span></div>' +
      '<div class="container hero__inner">' +
        '<div class="hero__text">' +
          '<h1 class="hero__name" aria-label="' + esc(first + ' ' + (p.lastName || '')) + '">' +
            '<span class="hero__line" aria-hidden="true">' + split(first, 0) + '</span>' +
            '<span class="hero__line hero__line--accent" aria-hidden="true">' + split(p.lastName, first.length) + '</span>' +
          '</h1>' +
          (p.tagline ? '<p class="hero__tagline">' + esc(p.tagline) + '</p>' : '') +
          '<a class="btn btn--outline hero__cta" href="#apropos">' + esc(L('learnMore')) + icon('arrowRight') + '</a>' +
        '</div>' +
        (p.photo ? '<div class="hero__visual"><span class="hero__orbit" aria-hidden="true"></span><div class="blob"><img src="' + esc(p.photo) + '" alt="' + esc(first + ' ' + (p.lastName || '')) + '" width="900" height="1200"></div></div>' : '') +
      '</div>' +
      '<a class="hero__scroll" href="#apropos" aria-label="' + esc(L('scrollDown')) + '">' + icon('chevronDown') + '</a>';
  }

  function renderAbout() {
    const host = $('#apropos');
    if (!host) return;
    const p = S.person || {};
    if (!p.aboutShort && !has(p.aboutLong)) { host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML =
      '<div class="container container--narrow center">' +
        sectionTitle(L('aboutTitle')) +
        (p.aboutShort ? '<p class="lead reveal">' + esc(p.aboutShort) + '</p>' : '') +
        (has(p.aboutLong) ? '<button type="button" class="btn btn--solid reveal" data-modal="about">' + esc(L('learnMore')) + '</button>' : '') +
      '</div>';
  }

  /** Contenu de la modale « À propos ». */
  function aboutModalContent() {
    const p = S.person || {};
    return {
      title: L('aboutTitle'),
      html: (p.aboutLong || []).map((t) => '<p>' + esc(t) + '</p>').join('')
    };
  }

  function renderWorks() {
    const host = $('#travaux');
    if (!host) return;
    const all = S.projects || [];
    if (!all.length) { host.hidden = true; return; }
    host.hidden = false;
    let featured = all.filter((p) => p.featured);
    if (!featured.length) featured = all;
    host.innerHTML =
      '<div class="container center">' +
        sectionTitle(L('worksTitle'), true) +
        '<p class="section-sub reveal">' + esc(L('worksSubtitle')) + '</p>' +
      '</div>' +
      '<div class="container">' +
        '<div class="carousel reveal" tabindex="0" role="region" aria-roledescription="carousel" aria-label="' + esc(L('worksTitle')) + '">' +
          '<div class="carousel__viewport"><div class="carousel__track">' +
            featured.map((p, i) => projectCard(p, 'slide', i)).join('') +
          '</div></div>' +
          (featured.length > 1
            ? '<button type="button" class="carousel__arrow carousel__arrow--prev" aria-label="' + esc(L('prev')) + '">' + icon('chevronLeft') + '</button>' +
              '<button type="button" class="carousel__arrow carousel__arrow--next" aria-label="' + esc(L('next')) + '">' + icon('chevronRight') + '</button>'
            : '') +
          '<div class="carousel__footer">' +
            '<p class="carousel__count" aria-live="polite"><span class="carousel__current">01</span><span class="carousel__total"> / ' + pad(featured.length) + '</span></p>' +
            (featured.length > 1 ? '<div class="carousel__dots">' + featured.map((p, i) => '<button type="button" class="carousel__dot" aria-label="' + esc(L('goToSlide', { n: i + 1 })) + '"><span></span></button>').join('') + '</div>' : '<span></span>') +
            '<a class="carousel__all" href="works.html">' + esc(L('allWorks')) + icon('arrowRight') + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function skillMarquee() {
    const cards = (S.skills || []).map((s) => '<li class="mcard"><span class="mcard__icon">' + icon(s.icon) + '</span><span>' + esc(s.name) + '</span></li>').join('');
    // La liste est doublée pour obtenir une boucle parfaite (translation de -50 %).
    return '<div class="marquee"><ul class="marquee__track">' + cards + '</ul><ul class="marquee__track" aria-hidden="true">' + cards + '</ul></div>';
  }

  function renderSkills() {
    const host = $('#skills');
    if (!host) return;
    const hasHard = has(S.skills);
    const hasSoft = has(S.softSkills);
    if (!hasHard && !hasSoft) { host.hidden = true; return; }
    host.hidden = false;
    const def = (S.ui && S.ui.skillsDefaultView) === 'soft' ? 'soft' : 'hard';
    const view = !hasHard ? 'soft' : !hasSoft ? 'hard' : def;
    host.dataset.view = view;
    const canToggle = hasHard && hasSoft;
    host.innerHTML =
      '<div class="container center">' +
        '<h2 class="section-title reveal">' +
          (canToggle
            ? '<button type="button" class="skills__word" data-skills-toggle aria-controls="skills-views">' + esc(L(view)) + '</button>'
            : '<span class="skills__word skills__word--static">' + esc(L(view)) + '</span>') +
          ' <span class="skills__rest">' + esc(L('skillsWord')) + '</span>' +
        '</h2>' +
        (canToggle ? '<p class="section-sub section-sub--italic reveal skills__hint"></p>' : '') +
      '</div>' +
      '<div class="skills__views" id="skills-views" aria-live="polite">' +
        (hasHard ? '<div class="skills__view skills__view--hard">' + skillMarquee() + '</div>' : '') +
        (hasSoft ? '<div class="skills__view skills__view--soft container"><ul class="soft-grid">' + S.softSkills.map(softSkillCard).join('') + '</ul></div>' : '') +
      '</div>' +
      (hasHard ? '<div class="container center"><a class="btn btn--solid reveal" href="skills.html">' + esc(L('learnMore')) + '</a></div>' : '');
    updateSkillsHint(host);
  }

  /** Met à jour le titre et le sous-titre selon la vue (hard/soft). */
  function updateSkillsHint(host) {
    const view = host.dataset.view;
    const word = $('.skills__word', host);
    if (word) word.textContent = L(view);
    const hint = $('.skills__hint', host);
    if (hint) {
      const parts = L(view === 'hard' ? 'hintHard' : 'hintSoft').split('{word}');
      hint.innerHTML = esc(parts[0]) + '<strong>' + esc(L(view)) + '</strong>' + esc(parts[1] || '');
    }
  }

  function renderTimeline(id, items, titleKey) {
    const host = $('#' + id);
    if (!host) return;
    if (!has(items)) { host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML =
      '<div class="container center">' + sectionTitle(L(titleKey), true) + '</div>' +
      '<div class="container timeline">' + items.map(timelineCard).join('') + '</div>';
  }

  function renderContact() {
    const host = $('#contact');
    if (!host) return;
    if (!sectionHasContent('contact')) { host.hidden = true; return; }
    host.hidden = false;
    const c = S.contact || {};
    const so = S.socials || {};
    const mail = so.mail || (S.person && S.person.email ? 'mailto:' + S.person.email : '');
    let intro = esc(c.intro || '');
    const link = (word, url, ext) => {
      if (!word || !url) return;
      const w = esc(word);
      const i = intro.indexOf(w);
      if (i < 0) return;
      intro = intro.slice(0, i) + '<a class="text-link" href="' + esc(url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + w + '</a>' + intro.slice(i + w.length);
    };
    link(c.mailWord, mail, false);
    link(c.linkedinWord, so.linkedin, true);
    host.innerHTML =
      '<div class="container container--narrow center">' +
        sectionTitle(L('contactTitle')) +
        '<p class="lead reveal">' + intro + '</p>' +
        (mail ? '<a class="btn btn--solid btn--lg reveal" href="' + esc(mail) + '">' + icon('mail') + esc(c.buttonLabel || 'Mail') + '</a>' : '') +
        (S.person && S.person.email ? '<p class="contact__email reveal">' + esc(S.person.email) + '</p>' : '') +
      '</div>';
  }

  function renderHome() {
    setMeta();
    renderHero();
    renderAbout();
    renderWorks();
    renderSkills();
    renderTimeline('experience', S.experience, 'experienceTitle');
    renderTimeline('formation', S.education, 'educationTitle');
    renderContact();
  }

  /* ------------------------------------------------------------------------
     8. Correspondance compétence ↔ projets (?tech=)
     ------------------------------------------------------------------------ */
  const matchWords = (skill) => (has(skill.match) ? skill.match : [skill.name]).map((w) => String(w).toLowerCase());

  function projectsForWords(words) {
    return (S.projects || []).filter((p) => (p.tags || []).some((t) => words.includes(String(t).toLowerCase())));
  }

  /** Retrouve la compétence par son nom, dans n'importe quelle langue. */
  function findSkill(name) {
    const n = String(name || '').toLowerCase();
    const fr = BASE.skills || [];
    const en = (window.SITE_EN && window.SITE_EN.skills) || [];
    let idx = fr.findIndex((s) => String(s.name).toLowerCase() === n);
    if (idx < 0) idx = en.findIndex((s) => s && String(s.name).toLowerCase() === n);
    return idx >= 0 ? (S.skills || [])[idx] : null;
  }

  /* ------------------------------------------------------------------------
     9. Page Travaux
     ------------------------------------------------------------------------ */
  function renderWorksPage() {
    setMeta(L('worksTitle') + ' · ' + ((S.person && S.person.firstName) || '') + ' ' + ((S.person && S.person.lastName) || ''));
    const host = $('#works-page');
    if (!host) return;
    const cats = (S.projectCategories || []).filter((c) => (S.projects || []).some((p) => p.category === c));
    host.innerHTML =
      '<header class="page-head container center">' +
        '<h1 class="page-title reveal">' + esc(L('worksTitle')) + '</h1>' +
        '<p class="section-sub reveal">' + esc(L('worksPageSubtitle')) + '</p>' +
        '<div class="filters reveal" role="group" aria-label="Filtres">' +
          ['__all'].concat(cats).map((c) => '<button type="button" class="filter" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c === '__all' ? L('all') : c) + '</button>').join('') +
        '</div>' +
        '<div class="tech-filter" hidden></div>' +
        '<p class="works__count" aria-live="polite"></p>' +
      '</header>' +
      '<div class="container works-list">' + (S.projects || []).map((p, i) => projectCard(p, 'list', i)).join('') + '</div>' +
      '<p class="container works__empty center" hidden>' + esc(L('noResults')) + '</p>';
  }

  /* ------------------------------------------------------------------------
     10. Page Compétences
     ------------------------------------------------------------------------ */
  function renderSkillsPage() {
    setMeta(L('skillsPageTitle') + ' · ' + ((S.person && S.person.firstName) || '') + ' ' + ((S.person && S.person.lastName) || ''));
    const host = $('#skills-page');
    if (!host) return;
    const skills = S.skills || [];
    const cats = (S.skillCategories || []).filter((c) => skills.some((s) => s.category === c));
    const cards = skills.map((s, i) => {
      const n = projectsForWords(matchWords(s)).length;
      return '<article class="kcard reveal" data-category="' + esc(s.category || '') + '" style="--d:' + ((i % 3) * 70) + 'ms">' +
        '<span class="kcard__icon">' + icon(s.icon) + '</span>' +
        '<h3 class="kcard__name">' + esc(s.name) + '</h3>' +
        (s.description ? '<p class="kcard__desc">' + esc(s.description) + '</p>' : '') +
        (n ? '<a class="kcard__btn" href="works.html?tech=' + encodeURIComponent(s.name) + '">' + esc(L('seeProjects')) + ' <span class="kcard__n">' + n + '</span></a>' : '') +
      '</article>';
    }).join('');
    host.innerHTML =
      '<section class="section section--dark page-top">' +
        '<header class="page-head container center">' +
          '<h1 class="page-title reveal">' + esc(L('skillsPageTitle')) + '</h1>' +
          '<p class="section-sub reveal">' + esc(L('skillsPageSubtitle')) + '</p>' +
          (cats.length ? '<div class="filters reveal" role="group" aria-label="Filtres">' + ['__all'].concat(cats).map((c) => '<button type="button" class="filter" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c === '__all' ? L('all') : c) + '</button>').join('') + '</div>' : '') +
        '</header>' +
        '<div class="container kgrid">' + cards + '</div>' +
      '</section>' +
      (has(S.softSkills)
        ? '<section class="section section--light"><div class="container center">' + sectionTitle(L('softSkillsTitle')) + '</div><div class="container"><ul class="soft-grid">' + S.softSkills.map(softSkillCard).join('') + '</ul></div></section>'
        : '');
  }

  /* ------------------------------------------------------------------------
     11. Page Projet (étude de cas)
     ------------------------------------------------------------------------ */

  /** Graphique en courbes SVG (bloc { type: "chart" }). */
  function lineChart(b, id) {
    const series = (b.series || []).filter((s) => has(s.values));
    const labels = b.labels || [];
    if (!series.length || !labels.length) return '';
    const W = 960, H = 440, m = { t: 24, r: 20, b: 46, l: 64 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const maxV = Math.max.apply(null, series.map((s) => Math.max.apply(null, s.values)));
    const step = Math.pow(10, Math.floor(Math.log10(maxV || 1)));
    const top = Math.ceil(maxV / step) * step;
    const ticks = 5;
    const x = (i) => m.l + (labels.length === 1 ? iw / 2 : (i * iw) / (labels.length - 1));
    const y = (v) => m.t + ih - (v / top) * ih;
    const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
    const monthFmt = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' });
    const nice = (lbl) => {
      const mm = /^(\d{4})-(\d{2})$/.exec(lbl);
      return mm ? monthFmt.format(new Date(+mm[1], +mm[2] - 1, 1)) : lbl;
    };
    const short = (v) => (v >= 1000 ? fmt(v / 1000) + (lang === 'fr' ? ' k' : 'k') : fmt(v));

    let grid = '';
    for (let t = 0; t <= ticks; t++) {
      const v = (top / ticks) * t;
      grid += '<line class="chart__grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>' +
        '<text class="chart__ylab" x="' + (m.l - 12) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + esc(short(v)) + '</text>';
    }
    const every = Math.max(1, Math.round(labels.length / 8));
    let xl = '';
    labels.forEach((lbl, i) => {
      if (i % every !== 0 && i !== labels.length - 1) return;
      if (i !== labels.length - 1 && labels.length - 1 - i < every / 2) return;
      xl += '<text class="chart__xlab" x="' + x(i) + '" y="' + (H - m.b + 26) + '" text-anchor="middle">' + esc(/^\d{4}-\d{2}$/.test(lbl) ? nice(lbl) : lbl) + '</text>';
    });

    const paths = series.map((s, si) => {
      const pts = s.values.map((v, i) => [x(i), y(v)]);
      const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      const area = d + ' L' + x(s.values.length - 1).toFixed(1) + ' ' + y(0) + ' L' + x(0) + ' ' + y(0) + ' Z';
      const color = s.color || (si ? '#e0708a' : '#9fb4ff');
      return '<defs><linearGradient id="' + id + '-g' + si + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + esc(color) + '" stop-opacity=".28"/><stop offset="1" stop-color="' + esc(color) + '" stop-opacity="0"/></linearGradient></defs>' +
        '<path class="chart__area" d="' + area + '" fill="url(#' + id + '-g' + si + ')"/>' +
        '<path class="chart__line" d="' + d + '" stroke="' + esc(color) + '" pathLength="1"/>';
    }).join('');

    const dots = series.map((s, si) => '<circle class="chart__dot" r="5" data-s="' + si + '" fill="' + esc(s.color || (si ? '#e0708a' : '#9fb4ff')) + '"/>').join('');
    const legend = series.map((s, si) => '<li><span style="background:' + esc(s.color || (si ? '#e0708a' : '#9fb4ff')) + '"></span>' + esc(s.name) + '</li>').join('');
    const data = { labels: labels.map(nice), series: series.map((s) => ({ name: s.name, color: s.color, values: s.values })), m: m, W: W, H: H, top: top };

    return '<figure class="chart reveal" id="' + id + '">' +
      (b.title ? '<figcaption class="chart__title">' + esc(b.title) + '</figcaption>' : '') +
      '<ul class="chart__legend">' + legend + '</ul>' +
      '<div class="chart__frame">' +
        '<svg class="chart__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc((b.title || '') + '. ' + (b.caption || '')) + '" preserveAspectRatio="xMidYMid meet">' +
          grid + paths + xl +
          '<line class="chart__cursor" y1="' + m.t + '" y2="' + (m.t + ih) + '" x1="-10" x2="-10"/>' + dots +
          '<rect class="chart__hit" x="' + m.l + '" y="' + m.t + '" width="' + iw + '" height="' + ih + '"/>' +
        '</svg>' +
        '<div class="chart__tip" hidden></div>' +
      '</div>' +
      (b.caption ? '<p class="chart__caption">' + esc(b.caption) + '</p>' : '') +
      '<script type="application/json" class="chart__data">' + JSON.stringify(data).replace(/</g, '\\u003c') + '</script>' +
    '</figure>';
  }

  /** Blocs du corps de projet ; un type inconnu est ignoré. */
  function renderBlock(b, i, used) {
    if (!b || !b.type) return '';
    switch (b.type) {
      case 'h2': {
        let id = slugify(b.text) || 'section-' + i;
        while (used[id]) id += '-' + i;
        used[id] = true;
        return '<h2 class="prose__h2" id="' + id + '">' + esc(b.text) + '</h2>';
      }
      case 'h3': return '<h3 class="prose__h3">' + esc(b.text) + '</h3>';
      case 'p': return '<p>' + esc(b.text) + '</p>';
      case 'ul':
      case 'ol': return has(b.items) ? '<' + b.type + '>' + b.items.map((it) => '<li>' + esc(it) + '</li>').join('') + '</' + b.type + '>' : '';
      case 'img': return b.src ? '<figure class="prose__fig reveal"><img src="' + esc(b.src) + '" alt="' + esc(b.alt || '') + '" loading="lazy">' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>' : '';
      case 'table':
        if (!has(b.rows)) return '';
        return '<figure class="table-wrap reveal">' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') +
          '<div class="table-scroll" tabindex="0"><table>' +
          (has(b.head) ? '<thead><tr>' + b.head.map((h) => '<th scope="col">' + esc(h) + '</th>').join('') + '</tr></thead>' : '') +
          '<tbody>' + b.rows.map((r) => '<tr>' + (r || []).map((c, ci) => (ci === 0 ? '<th scope="row">' : '<td>') + esc(c) + (ci === 0 ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</tbody>' +
          '</table></div></figure>';
      case 'callout':
        return '<aside class="callout reveal">' + (b.title ? '<p class="callout__title">' + esc(b.title) + '</p>' : '') + (b.text ? '<p>' + esc(b.text) + '</p>' : '') + '</aside>';
      case 'chart': return lineChart(b, 'chart-' + i);
      case 'demo':
        return '<figure class="demo reveal">' + (b.title ? '<figcaption class="demo__title">' + esc(b.title) + '</figcaption>' : '') +
          (b.intro ? '<p class="demo__intro">' + esc(b.intro) + '</p>' : '') +
          '<div class="demo__body" data-demo="' + esc(b.demo) + '"></div>' +
          (b.caption ? '<p class="chart__caption">' + esc(b.caption) + '</p>' : '') + '</figure>';
      default: return '';
    }
  }

  function renderProjectPage() {
    const host = $('#project-page');
    if (!host) return;
    const slug = new URLSearchParams(location.search).get('slug');
    const list = S.projects || [];
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx < 0) {
      setMeta(L('notFoundTitle'));
      host.innerHTML = '<section class="notfound container center"><p class="notfound__code">?</p><h1 class="page-title">' + esc(L('notFoundTitle')) + '</h1><p class="section-sub">' + esc(L('notFoundText')) + '</p><a class="btn btn--outline" href="works.html">' + icon('arrowLeft') + esc(L('backToWorks')) + '</a></section>';
      return;
    }
    const p = list[idx];
    setMeta(p.title + ' · ' + ((S.person && S.person.firstName) || '') + ' ' + ((S.person && S.person.lastName) || ''), p.summary);
    const used = {};
    const body = (p.body || []).map((b, i) => renderBlock(b, i, used)).join('');
    const toc = (p.body || []).filter((b) => b && b.type === 'h2');
    const tocIds = Object.keys(used);
    const tocHtml = toc.length
      ? '<details class="toc" open><summary class="toc__title">' + esc(L('toc')) + icon('chevronDown') + '</summary><ol class="toc__list">' + toc.map((b, i) => '<li><a href="#' + tocIds[i] + '" data-toc="' + tocIds[i] + '">' + esc(b.text) + '</a></li>').join('') + '</ol></details>'
      : '';
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    const navCard = (q, key, dir) => '<a class="pnav pnav--' + dir + '" href="' + esc(projectUrl(q)) + '"' + projectTarget(q) + '><span class="pnav__label">' + (dir === 'prev' ? icon('arrowLeft') : '') + esc(L(key)) + (dir === 'next' ? icon('arrowRight') : '') + '</span><span class="pnav__title">' + esc(q.title) + '</span></a>';

    host.innerHTML =
      '<header class="phead container">' +
        '<nav class="crumbs" aria-label="Fil d\'Ariane"><a href="works.html">' + esc(L('breadcrumb')) + '</a><span aria-hidden="true">›</span><span aria-current="page">' + esc(p.title) + '</span></nav>' +
        (p.category ? '<span class="pill pill--outline">' + esc(p.category) + '</span>' : '') +
        '<p class="phead__meta">' + metaLine(p.date, p.kind) + '</p>' +
        '<h1 class="phead__title">' + esc(p.title) + '</h1>' +
        (p.summary ? '<p class="phead__summary">' + esc(p.summary) + '</p>' : '') +
        pills(p.tags) +
        (p.repoUrl || p.liveUrl ? '<p class="phead__actions">' +
          (p.liveUrl ? '<a class="btn btn--solid" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener">' + icon('external') + esc(L('openApp')) + '</a>' : '') +
          (p.repoUrl ? '<a class="btn ' + (p.liveUrl ? 'btn--outline' : 'btn--solid') + '" href="' + esc(p.repoUrl) + '" target="_blank" rel="noopener">' + icon('github') + esc(L('viewCode')) + '</a>' : '') +
        '</p>' : '') +
      '</header>' +
      (p.image ? '<div class="container"><div class="phead__banner"><img src="' + esc(p.image) + '" alt="" decoding="async"><span class="pcard__grid" aria-hidden="true"></span></div></div>' : '') +
      (has(p.facts) ? '<section class="container psection" aria-label="' + esc(L('projectSheet')) + '"><h2 class="eyebrow">' + esc(L('projectSheet')) + '</h2><dl class="facts">' + p.facts.map((f) => '<div><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>').join('') + '</dl></section>' : '') +
      (has(p.highlights) ? '<section class="container psection" aria-label="' + esc(L('keyFigures')) + '"><h2 class="eyebrow">' + esc(L('keyFigures')) + '</h2><ul class="kpis">' + p.highlights.map((h, i) => '<li class="kpi reveal" style="--d:' + (i * 80) + 'ms"><span class="kpi__value">' + esc(h.value) + '</span><span class="kpi__label">' + esc(h.label) + '</span></li>').join('') + '</ul></section>' : '') +
      (body ? '<div class="container pbody' + (toc.length ? '' : ' pbody--solo') + '">' + (toc.length ? '<aside class="pbody__aside">' + tocHtml + '</aside>' : '') + '<article class="prose">' + body + '</article></div>' : '') +
      '<footer class="container pfoot">' +
        '<a class="btn btn--outline" href="works.html">' + icon('arrowLeft') + esc(L('backToWorks')) + '</a>' +
        (list.length > 1 ? '<div class="pnav-grid">' + navCard(prev, 'prevProject', 'prev') + navCard(next, 'nextProject', 'next') + '</div>' : '') +
      '</footer>';
  }

  /* ------------------------------------------------------------------------
     12. Page 404
     ------------------------------------------------------------------------ */
  function render404() {
    setMeta(L('page404Title'));
    const host = $('#notfound-page');
    if (!host) return;
    host.innerHTML = '<section class="notfound container center"><p class="notfound__code">404</p><h1 class="page-title">' + esc(L('page404Title')) + '</h1><p class="section-sub">' + esc(L('page404Text')) + '</p><a class="btn btn--solid" href="index.html">' + icon('arrowLeft') + esc(L('backHome')) + '</a></section>';
  }

  /* ------------------------------------------------------------------------
     13. Point d'entrée : rend la page courante
     ------------------------------------------------------------------------ */
  function renderPage() {
    const page = document.body.dataset.page;
    document.documentElement.lang = lang;
    applyTheme();
    renderNav(page === 'home');
    renderFooter();
    if (page === 'home') renderHome();
    else if (page === 'works') renderWorksPage();
    else if (page === 'skills') renderSkillsPage();
    else if (page === 'project') renderProjectPage();
    else if (page === '404') render404();
  }

  window.Render = {
    renderPage: renderPage,
    setLang: setLang,
    getLang: () => lang,
    site: () => S,
    L: L,
    icon: icon,
    fmt: fmt,
    aboutModalContent: aboutModalContent,
    updateSkillsHint: updateSkillsHint,
    findSkill: findSkill,
    matchWords: matchWords
  };
})();
