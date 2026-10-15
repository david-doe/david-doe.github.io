/* ==========================================================================
   js/main.js — comportements du site
   --------------------------------------------------------------------------
   Navbar, burger, barre de progression, scroll spy, apparitions au scroll,
   modale, carrousel des travaux, bascule hard/soft skills, filtres,
   sommaire de projet, graphique interactif et bascule FR / EN.
   ========================================================================== */
(function () {
  'use strict';

  const R = window.Render;
  if (!R) return;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');

  /* Chaque initialisation enregistre ici de quoi se nettoyer :
     on peut ainsi reconstruire la page (changement de langue) sans fuite. */
  let cleanups = [];
  const onCleanup = (fn) => cleanups.push(fn);
  function teardown() {
    cleanups.forEach((fn) => { try { fn(); } catch (e) { /* ignoré */ } });
    cleanups = [];
  }
  function listen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    onCleanup(() => target.removeEventListener(type, fn, opts));
  }

  /* ------------------------------------------------------------------------
     Navbar : état « scrollé » + barre de progression (installés une fois)
     ------------------------------------------------------------------------ */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      const bar = $('.progress__bar');
      if (bar) bar.style.transform = 'scaleX(' + pct / 100 + ')';
      const header = $('#site-header');
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ------------------------------------------------------------------------
     Menu burger (mobile) et sélecteur de langue
     ------------------------------------------------------------------------ */
  function setupNav() {
    const header = $('#site-header');
    if (!header) return;
    const burger = $('.nav__burger', header);
    const close = () => {
      header.classList.remove('is-open');
      document.documentElement.classList.remove('is-locked');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    };
    if (burger) {
      listen(burger, 'click', () => {
        const open = !header.classList.contains('is-open');
        header.classList.toggle('is-open', open);
        document.documentElement.classList.toggle('is-locked', open);
        burger.setAttribute('aria-expanded', String(open));
      });
    }
    $$('.nav__link', header).forEach((a) => listen(a, 'click', close));
    listen(document, 'keydown', (e) => { if (e.key === 'Escape' && header.classList.contains('is-open')) { close(); burger && burger.focus(); } });
    listen(window, 'resize', () => { if (window.innerWidth > 960) close(); });
    onCleanup(close);

    $$('.lang__btn', header).forEach((b) => listen(b, 'click', () => switchLang(b.dataset.lang)));
  }

  /** Bascule FR / EN : la page est reconstruite sur place, en fondu. */
  function switchLang(l) {
    if (l === R.getLang()) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    const focusLang = document.activeElement && document.activeElement.classList.contains('lang__btn');
    document.body.classList.add('is-switching');
    setTimeout(() => {
      R.setLang(l);
      document.documentElement.classList.add('no-intro');
      const url = new URL(location.href);
      if (url.searchParams.has('lang')) { url.searchParams.delete('lang'); history.replaceState(null, '', url); }
      R.renderPage();
      init(true);
      const nmax = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: ratio * nmax, behavior: 'instant' });
      if (focusLang) { const b = $('.lang__btn[data-lang="' + l + '"]'); if (b) b.focus(); }
      requestAnimationFrame(() => document.body.classList.remove('is-switching'));
    }, reduceMotion() ? 0 : 200);
  }

  /* ------------------------------------------------------------------------
     Apparitions au scroll (une seule fois)
     ------------------------------------------------------------------------ */
  function setupReveal(instant) {
    const items = $$('.reveal:not(.is-visible)');
    if (instant || reduceMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
    onCleanup(() => io.disconnect());
  }

  /* ------------------------------------------------------------------------
     Scroll spy de la page d'accueil
     ------------------------------------------------------------------------ */
  function setupScrollSpy() {
    const links = $$('.nav__link[data-target]');
    const sections = links.map((a) => document.getElementById(a.dataset.target)).filter((s) => s && !s.hidden);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const setActive = (id) => links.forEach((a) => {
      const on = a.dataset.target === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
    onCleanup(() => io.disconnect());
  }

  /* ------------------------------------------------------------------------
     Modale réutilisable (piège de focus, Échap, clic dehors)
     ------------------------------------------------------------------------ */
  function openModal(content) {
    const opener = document.activeElement;
    const wrap = document.createElement('div');
    wrap.className = 'modal';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'modal-title');
    wrap.innerHTML =
      '<div class="modal__overlay" data-close></div>' +
      '<div class="modal__box">' +
        '<button type="button" class="modal__x" data-close aria-label="' + R.L('close') + '">' + R.icon('close') + '</button>' +
        '<h2 class="modal__title" id="modal-title"></h2>' +
        '<div class="modal__body" tabindex="0">' + content.html + '</div>' +
        '<div class="modal__foot"><button type="button" class="btn btn--outline" data-close>' + R.L('close') + '</button></div>' +
      '</div>';
    $('.modal__title', wrap).textContent = content.title;
    document.body.appendChild(wrap);
    document.documentElement.classList.add('is-locked');
    requestAnimationFrame(() => wrap.classList.add('is-open'));

    const focusables = () => $$('button, [href], [tabindex]:not([tabindex="-1"])', wrap);
    const close = () => {
      wrap.classList.remove('is-open');
      document.documentElement.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      setTimeout(() => wrap.remove(), reduceMotion() ? 0 : 250);
      if (opener && opener.focus) opener.focus();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    $$('[data-close]', wrap).forEach((b) => b.addEventListener('click', close));
    setTimeout(() => { const x = $('.modal__x', wrap); if (x) x.focus(); }, 30);
  }

  function setupAboutModal() {
    $$('[data-modal="about"]').forEach((b) => listen(b, 'click', () => openModal(R.aboutModalContent())));
  }

  /* ------------------------------------------------------------------------
     Carrousel des travaux (défilement latéral)
     ------------------------------------------------------------------------ */
  function setupCarousel(root) {
    const viewport = $('.carousel__viewport', root);
    const track = $('.carousel__track', root);
    const slides = Array.from(track.children);
    const dots = $$('.carousel__dot', root);
    const current = $('.carousel__current', root);
    const n = slides.length;
    let index = 0;

    const offset = (k) => slides[k].offsetLeft;
    const setX = (x, animate) => {
      track.style.transition = animate ? '' : 'none';
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
    };

    function go(k, animate) {
      index = ((k % n) + n) % n;
      setX(-offset(index), animate !== false);
      slides.forEach((s, j) => {
        const on = j === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
        $$('a', s).forEach((a) => { a.tabIndex = on ? 0 : -1; });
      });
      dots.forEach((d, j) => {
        d.classList.toggle('is-active', j === index);
        if (j === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
        // Relance l'animation de progression du point actif
        const bar = d.firstElementChild;
        if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      });
      if (current) current.textContent = pad(index + 1);
    }

    // Flèches et points
    const prev = $('.carousel__arrow--prev', root);
    const next = $('.carousel__arrow--next', root);
    if (prev) listen(prev, 'click', () => go(index - 1));
    if (next) listen(next, 'click', () => go(index + 1));
    dots.forEach((d, j) => listen(d, 'click', () => go(j)));

    // Lecture automatique toutes les 6 s : le point actif se remplit,
    // la fin de son animation fait passer au projet suivant.
    dots.forEach((d) => listen(d.firstElementChild, 'animationend', () => { if (d.classList.contains('is-active')) go(index + 1); }));
    const pause = () => root.classList.add('is-paused');
    const resume = () => { if (!root.contains(document.activeElement)) root.classList.remove('is-paused'); };
    listen(root, 'mouseenter', pause);
    listen(root, 'mouseleave', () => { root.classList.remove('is-paused'); });
    listen(root, 'focusin', pause);
    listen(root, 'focusout', () => setTimeout(resume, 0));
    // Pas de défilement automatique quand le carrousel est hors de l'écran
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(([en]) => root.classList.toggle('is-offscreen', !en.isIntersecting), { threshold: 0.25 });
      io.observe(root);
      onCleanup(() => io.disconnect());
    }

    // Clavier
    listen(root, 'keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });

    // Un clic sur un projet voisin (visible sur les côtés) le fait venir au centre
    slides.forEach((s, j) => listen(s, 'click', (e) => {
      if (j !== index) { e.preventDefault(); go(j); }
    }));

    // Glisser (souris et tactile)
    let startX = 0, startY = 0, dx = 0, base = 0, t0 = 0, down = false, dragging = false;
    listen(viewport, 'pointerdown', (e) => {
      if (e.button !== 0) return;
      down = true; dragging = false; dx = 0;
      startX = e.clientX; startY = e.clientY; t0 = performance.now();
      base = -offset(index);
    });
    listen(viewport, 'pointermove', (e) => {
      if (!down) return;
      dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - startY)) return;
        dragging = true;
        root.classList.add('is-dragging');
        try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignoré */ }
      }
      const edge = (index === 0 && dx > 0) || (index === n - 1 && dx < 0);
      setX(base + (edge ? dx * 0.35 : dx), false);
    });
    const end = () => {
      if (!down) return;
      down = false;
      if (!dragging) return;
      root.classList.remove('is-dragging');
      const v = Math.abs(dx) / Math.max(1, performance.now() - t0);
      const threshold = Math.min(120, viewport.offsetWidth * 0.15);
      if ((dx < -threshold || (dx < -20 && v > 0.5)) && index < n - 1) go(index + 1);
      else if ((dx > threshold || (dx > 20 && v > 0.5)) && index > 0) go(index - 1);
      else go(index);
      // Le clic qui suit un glissement ne doit pas ouvrir le projet
      const block = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
      root.addEventListener('click', block, { capture: true, once: true });
      setTimeout(() => root.removeEventListener('click', block, { capture: true }), 50);
    };
    listen(viewport, 'pointerup', end);
    listen(viewport, 'pointercancel', end);
    listen(viewport, 'dragstart', (e) => e.preventDefault());

    listen(window, 'resize', () => go(index, false));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => go(index, false));
    go(0, false);
  }

  /* ------------------------------------------------------------------------
     Hard skills ↔ soft skills
     ------------------------------------------------------------------------ */
  function setupSkillsToggle() {
    const host = $('#skills');
    const btn = host && $('[data-skills-toggle]', host);
    if (!btn) return;
    listen(btn, 'click', () => {
      host.classList.add('is-fading');
      setTimeout(() => {
        host.dataset.view = host.dataset.view === 'hard' ? 'soft' : 'hard';
        R.updateSkillsHint(host);
        $$('.skills__view .reveal', host).forEach((el) => el.classList.add('is-visible'));
        host.classList.remove('is-fading');
      }, reduceMotion() ? 0 : 240);
    });
  }

  /* ------------------------------------------------------------------------
     Filtres en pastilles (pages Travaux et Compétences)
     ------------------------------------------------------------------------ */
  function setupFilters(items, onApply) {
    const buttons = $$('.filter');
    if (!buttons.length) return;
    let active = '__all';
    const container = items[0] && items[0].parentElement;
    const apply = (animate) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === active)));
      const run = () => {
        onApply(active);
        if (container) container.classList.remove('is-filtering');
      };
      if (animate && container && !reduceMotion()) {
        container.classList.add('is-filtering');
        setTimeout(run, 200);
      } else run();
    };
    buttons.forEach((b) => listen(b, 'click', () => { active = b.dataset.filter; apply(true); }));
    apply(false);
    return () => apply(true);
  }

  function setupWorksPage() {
    const page = $('#works-page');
    if (!page) return;
    const S = R.site();
    const cards = $$('.works-list .pcard', page);
    const empty = $('.works__empty', page);
    const count = $('.works__count', page);
    const banner = $('.tech-filter', page);
    let tech = new URLSearchParams(location.search).get('tech') || '';

    const words = () => {
      if (!tech) return null;
      const skill = R.findSkill(tech);
      return skill ? R.matchWords(skill) : [tech.toLowerCase()];
    };
    const drawBanner = () => {
      if (!tech) { banner.hidden = true; banner.innerHTML = ''; return; }
      const skill = R.findSkill(tech);
      banner.hidden = false;
      banner.innerHTML = '<span>' + R.L('techFilter', { tech: '<strong></strong>' }) + '</span><button type="button" class="tech-filter__clear">' + R.icon('close') + R.L('clearFilter') + '</button>';
      $('strong', banner).textContent = skill ? skill.name : tech;
      $('button', banner).addEventListener('click', () => {
        tech = '';
        const url = new URL(location.href);
        url.searchParams.delete('tech');
        history.replaceState(null, '', url);
        drawBanner();
        reapply && reapply();
      });
    };

    const reapply = setupFilters(cards, (cat) => {
      const w = words();
      let shown = 0;
      cards.forEach((c, k) => {
        const p = S.projects[k];
        const okCat = cat === '__all' || p.category === cat;
        const okTech = !w || (p.tags || []).some((t) => w.includes(String(t).toLowerCase()));
        c.hidden = !(okCat && okTech);
        if (!c.hidden) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (count) count.textContent = shown === 1 ? R.L('projectCount') : R.L('projectsCount', { n: shown });
    });
    drawBanner();
  }

  function setupSkillsPage() {
    const page = $('#skills-page');
    if (!page) return;
    const cards = $$('.kcard', page);
    setupFilters(cards, (cat) => {
      cards.forEach((c) => { c.hidden = !(cat === '__all' || c.dataset.category === cat); });
    });
  }

  /* ------------------------------------------------------------------------
     Page projet : sommaire actif au scroll
     ------------------------------------------------------------------------ */
  function setupToc() {
    const toc = $('.toc');
    if (!toc) return;
    const mq = window.matchMedia('(max-width: 900px)');
    toc.open = !mq.matches;
    const links = $$('[data-toc]', toc);
    const heads = links.map((a) => document.getElementById(a.dataset.toc)).filter(Boolean);
    links.forEach((a) => listen(a, 'click', () => { if (mq.matches) toc.open = false; }));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.dataset.toc === en.target.id));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach((h) => io.observe(h));
    onCleanup(() => io.disconnect());
  }

  /* ------------------------------------------------------------------------
     Graphiques interactifs (bloc « chart » des projets)
     ------------------------------------------------------------------------ */
  function setupCharts() {
    $$('.chart').forEach((fig) => {
      const json = $('.chart__data', fig);
      if (!json) return;
      let data;
      try { data = JSON.parse(json.textContent); } catch (e) { return; }
      const svg = $('.chart__svg', fig);
      const frame = $('.chart__frame', fig);
      const tip = $('.chart__tip', fig);
      const cursor = $('.chart__cursor', fig);
      const dots = $$('.chart__dot', fig);
      const m = data.m, n = data.labels.length;
      const iw = data.W - m.l - m.r, ih = data.H - m.t - m.b;
      const x = (i) => m.l + (n === 1 ? iw / 2 : (i * iw) / (n - 1));
      const y = (v) => m.t + ih - (v / data.top) * ih;
      let cur = -1;
      frame.tabIndex = 0;

      function show(i) {
        cur = Math.max(0, Math.min(n - 1, i));
        const cx = x(cur);
        cursor.setAttribute('x1', cx); cursor.setAttribute('x2', cx);
        dots.forEach((d) => {
          const s = data.series[+d.dataset.s];
          d.setAttribute('cx', cx); d.setAttribute('cy', y(s.values[cur]));
        });
        fig.classList.add('is-hover');
        tip.hidden = false;
        tip.innerHTML = '<strong>' + data.labels[cur] + '</strong>' + data.series.map((s) => '<span><i style="background:' + s.color + '"></i>' + s.name + '<b>' + R.fmt(s.values[cur]) + '</b></span>').join('');
        const pct = cx / data.W;
        tip.style.left = (pct * 100) + '%';
        tip.classList.toggle('is-left', pct > 0.62);
      }
      function hide() { fig.classList.remove('is-hover'); tip.hidden = true; }

      listen(svg, 'pointermove', (e) => {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const p = pt.matrixTransform(ctm.inverse());
        show(Math.round(((p.x - m.l) / iw) * (n - 1)));
      });
      listen(svg, 'pointerleave', hide);
      listen(frame, 'keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur < 0 ? n - 1 : cur - 1); }
        if (e.key === 'Escape') hide();
      });
      listen(frame, 'blur', hide);
    });
  }

  /* ------------------------------------------------------------------------
     Halo lumineux qui suit le pointeur sur les cartes
     ------------------------------------------------------------------------ */
  function setupGlow() {
    $$('.pcard--list, .kcard, .tcard').forEach((c) => listen(c, 'pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    }));
  }

  /* ------------------------------------------------------------------------
     Initialisation (rejouée après chaque changement de langue)
     ------------------------------------------------------------------------ */
  function init(instant) {
    teardown();
    setupNav();
    const page = document.body.dataset.page;
    if (page === 'home') {
      setupAboutModal();
      $$('.carousel').forEach(setupCarousel);
      setupSkillsToggle();
      setupScrollSpy();
    }
    if (page === 'works') setupWorksPage();
    if (page === 'skills') setupSkillsPage();
    if (page === 'project') { setupToc(); setupCharts(); if (window.Demos) window.Demos.mountAll(); }
    setupGlow();
    setupReveal(instant);
    onScroll();
  }

  R.renderPage();
  init(false);
  document.documentElement.classList.add('is-ready');

  // Arrivée sur index.html#section depuis une sous-page : on recale après le rendu.
  if (location.hash && document.body.dataset.page === 'home') {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
})();
