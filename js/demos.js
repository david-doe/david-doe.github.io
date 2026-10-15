/* ==========================================================================
   js/demos.js — démos interactives des pages projet (bloc { type: "demo" })
   --------------------------------------------------------------------------
   Chaque bloc <div class="demo" data-demo="..."> est rempli ici. Les données
   viennent de assets/data/canada-grocery.json (construit par
   tools/build_cgp_data.py à partir de l'application publiée).
   Démos : tour (visite de l'application), cost, taxed, forecast, effects.
   ========================================================================== */
(function () {
  'use strict';

  const DATA_URL = 'assets/data/canada-grocery.json?v=1';
  let loading = null;
  const load = () => loading || (loading = fetch(DATA_URL).then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }));

  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const lang = () => (window.Render && window.Render.getLang()) || 'fr';
  const FR = () => lang() === 'fr';
  const tr = (en, fr) => (FR() ? fr : en);
  const num = (x, d) => new Intl.NumberFormat(FR() ? 'fr-FR' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
  const money = (x) => (FR() ? num(x, 2) + ' $' : '$' + num(x, 2));
  const pct = (x, d) => (FR() ? num(x, d == null ? 0 : d) + ' %' : num(x, d == null ? 0 : d) + '%');
  const signed = (x, d) => (x > 0 ? '+' : x < 0 ? '−' : '') + num(Math.abs(x), d == null ? 1 : d);
  const monthLabel = (m) => {
    const [y, mo] = m.split('-').map(Number);
    return new Intl.DateTimeFormat(FR() ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' }).format(new Date(y, mo - 1, 1));
  };
  const C = { blue: '#9fb4ff', pink: '#e0708a', accent: '#d9657f', grid: 'rgba(255,255,255,.08)', muted: '#a3a3b5', soft: '#ffd9e2', amber: '#e8b86b' };

  /* ------------------------------------------------------------------------
     Petits composants
     ------------------------------------------------------------------------ */
  function seg(name, options, current) {
    return '<div class="seg" role="group" aria-label="' + esc(name) + '">' + options.map((o) =>
      '<button type="button" class="seg__btn" data-v="' + esc(o[0]) + '" aria-pressed="' + (o[0] === current) + '">' + esc(o[1]) + '</button>').join('') + '</div>';
  }
  function onSeg(root, sel, fn) {
    root.querySelectorAll(sel + ' .seg__btn').forEach((b) => b.addEventListener('click', () => {
      root.querySelectorAll(sel + ' .seg__btn').forEach((x) => x.setAttribute('aria-pressed', x === b));
      fn(b.dataset.v);
    }));
  }
  const widthOf = (el) => Math.max(300, Math.round(el.clientWidth || 760));
  /** Redessine quand la largeur du bloc change nettement (rotation, redimensionnement). */
  function onResize(el, fn) {
    let w = el.clientWidth, t = 0;
    const h = () => {
      if (!el.isConnected) { window.removeEventListener('resize', h); return; }
      clearTimeout(t);
      t = setTimeout(() => { if (Math.abs(el.clientWidth - w) > 24) { w = el.clientWidth; fn(); } }, 150);
    };
    window.addEventListener('resize', h);
  }
  function tipAt(frame, tip, html, xPct, yPx) {
    tip.innerHTML = html;
    tip.hidden = false;
    tip.style.left = (xPct * 100) + '%';
    tip.style.top = yPx + 'px';
    tip.classList.toggle('is-left', xPct > 0.6);
  }

  /* ------------------------------------------------------------------------
     1. Visite de l'application : un onglet = une capture + ce qu'il fait + pourquoi
     ------------------------------------------------------------------------ */
  const TOUR = [
    { k: 'context', en: 'Context', fr: 'Contexte',
      what: ['Opens with what happened: the 2018 surtax, the 2025 counter-tariffs and the September 2026 dairy and sugar list, the open question (who pays, and how much), and the four questions the project answers.',
        "S'ouvre sur ce qui s'est passé : la surtaxe de 2018, les contre-tarifs de 2025 et la liste laitière et sucrière de septembre 2026, la question ouverte (qui paie, et combien) et les quatre questions auxquelles le projet répond."],
      why: ['The estimates only make sense once you know which tariffs applied and when. This tab therefore gives the timeline before the figures, and each fact refers to its source (numbered R1, R2, and so on).',
        "Les estimations n'ont de sens que si l'on sait quels tarifs ont été appliqués et quand. Cet onglet donne donc la chronologie avant les chiffres, et chaque fait renvoie à sa source (numérotée R1, R2, etc.)."] },
    { k: 'overview', en: 'Results', fr: 'Résultats',
      what: ['Four headline figures, five findings in plain words, a paragraph on the latest month written automatically from the data, and a summary image with a link to share.',
        "Quatre chiffres clés, cinq constats en mots simples, un paragraphe sur le dernier mois rédigé automatiquement à partir des données, et une image de synthèse avec un lien à partager."],
      why: ['This tab sums up the results for readers who will not go through the other tabs. The paragraph on the latest month is produced by the code from the latest data, so it is updated with them.',
        'Cet onglet résume les résultats pour ceux qui ne parcourront pas les autres onglets. Le paragraphe sur le dernier mois est produit par le code à partir des dernières données : il se met à jour avec elles.'] },
    { k: 'cost', en: 'What it costs me', fr: 'Ce que ça me coûte',
      what: ['The household enters its monthly grocery bill and picks 2025 (measured) or 2026 (scenarios). The app gives a central estimate, a plausible range, the formula, and the cost category by category.',
        "Le ménage saisit sa facture mensuelle et choisit 2025 (mesuré) ou 2026 (scénarios). L'application donne une estimation centrale, une fourchette plausible, la formule, et le coût catégorie par catégorie."],
      why: ['The share of the tariff passed on to prices is converted into dollars per month, which is easier for a household to interpret. The formula is displayed so the calculation can be checked. Hatched categories are upper bounds: their customs codes cover more than the taxed products alone.',
        'La part du tarif répercutée sur les prix est convertie en dollars par mois, plus facile à interpréter pour un ménage. La formule est affichée pour que le calcul puisse être vérifié. Les catégories hachurées sont des bornes hautes : leurs codes douaniers couvrent plus que les seuls produits taxés.'] },
    { k: 'taxed', en: 'Is it taxed?', fr: 'Est-ce taxé ?',
      what: ['Type a product and see every tariff that hit it: year, rate, whether it was taxed directly, only as an ingredient or only above an import quota, the price index it belongs to, and the dates.',
        "Tapez un produit et voyez chaque tarif qui l'a visé : année, taux, taxé directement, seulement comme ingrédient ou seulement au-delà d'un contingent, l'indice de prix auquel il appartient, et les dates."],
      why: ['The answers come from the official tariff lists, matched line by line to the consumer price index. The tab separates products taxed as sold in stores from products taxed only as an ingredient, which is why the price of milk did not move in 2026.',
        "Les réponses viennent des listes tarifaires officielles, rattachées ligne par ligne à l'indice des prix à la consommation. L'onglet distingue les produits taxés tels qu'ils sont vendus en magasin de ceux taxés seulement comme ingrédient : c'est ce qui explique que le prix du lait n'ait pas bougé en 2026."] },
    { k: 'prices', en: 'Prices and forecasts', fr: 'Prix et prévisions',
      what: ['Pick any of 101 food price series: its history, a 12-month forecast and 80% and 95% intervals, with the backtest that shows how good the forecasts were in the past.',
        "Choisissez l'une des 101 séries de prix alimentaires : son historique, une prévision à 12 mois et des intervalles à 80 % et 95 %, avec le backtest qui montre la qualité passée des prévisions."],
      why: ["Each forecast comes with its uncertainty interval. The model was kept because it does better, over 2019 to 2025, than a simple method that repeats last year's value. The intervals are calibrated on the same years: the 80% interval contains the observed value in about 80% of cases.",
        "Chaque prévision est accompagnée de son intervalle d'incertitude. Le modèle a été retenu parce qu'il fait mieux, sur 2019 à 2025, qu'une méthode simple qui reprend la valeur de l'an dernier. Les intervalles sont calibrés sur ces mêmes années : celui à 80 % contient la valeur observée dans environ 80 % des cas."] },
    { k: 'provinces', en: 'Provinces', fr: 'Provinces',
      what: ['Food inflation over 12 months for every province and two territorial capitals, and any province compared with Canada over time.',
        "L'inflation alimentaire sur 12 mois pour chaque province et deux capitales territoriales, et n'importe quelle province comparée au Canada dans le temps."],
      why: ['Food prices do not rise at the same pace everywhere in Canada: the gap between provinces reaches several points, which the national average does not show.',
        "Les prix alimentaires n'augmentent pas au même rythme partout au Canada : l'écart entre provinces atteint plusieurs points, ce que la moyenne nationale ne montre pas."] },
    { k: 'effects', en: 'Tariff effects', fr: 'Effets des tarifs',
      what: ['For each tariffed series, the gap with a synthetic twin built from similar untaxed series, placebo series that should show nothing, and the estimated share of the tariff passed on to prices with its interval.',
        "Pour chaque série taxée, l'écart avec un jumeau synthétique construit à partir de séries semblables non taxées, des séries placebo qui ne devraient rien montrer, et la part estimée du tarif répercutée sur les prix avec son intervalle."],
      why: ['The elements needed to judge the estimate stay on screen: placebo series, permutation p-values and intervals, even when they are wide. The result is also compared with the Bank of Canada estimate.',
        "Les éléments qui permettent de juger l'estimation restent affichés : séries placebo, p-valeurs par permutation et intervalles, même quand ils sont larges. Le résultat est aussi comparé à l'estimation de la Banque du Canada."] },
    { k: 'questions', en: 'Questions', fr: 'Questions',
      what: ['Verified answers to the common questions, each with its source. No AI model writes them.',
        "Des réponses vérifiées aux questions courantes, chacune avec sa source. Aucun modèle d'IA ne les rédige."],
      why: ['An AI document search was built, then removed from the app. On new questions it answered correctly in 79% of cases (100% in English, 56% in French), below the 80% per language set before the test. It will be added back if it reaches that level.',
        "Une recherche documentaire par IA a été construite, puis retirée de l'application. Sur de nouvelles questions, elle répondait juste dans 79 % des cas (100 % en anglais, 56 % en français), sous le seuil de 80 % par langue fixé avant le test. Elle sera réintégrée si elle atteint ce seuil."] },
    { k: 'method', en: 'Method and data', fr: 'Méthode et données',
      what: ['The method in five steps, the limits, downloadable tables and a citation.',
        "La méthode en cinq étapes, les limites, des tableaux téléchargeables et une citation."],
      why: ['Each figure in the app refers to a decision in the log and to a public source. The data are updated after each monthly release from Statistics Canada.',
        "Chaque chiffre de l'application renvoie à une décision du journal et à une source publique. Les données sont mises à jour après chaque publication mensuelle de Statistique Canada."] }
  ];

  function tour(root) {
    let cur = 'cost';
    const L = lang();
    root.innerHTML =
      '<div class="tour">' +
        '<div class="tour__tabs" role="tablist" aria-label="' + esc(tr('Sections of the app', "Sections de l'application")) + '">' +
          TOUR.map((s) => '<button type="button" role="tab" class="tour__tab" data-k="' + s.k + '" aria-selected="' + (s.k === cur) + '">' + esc(s[L]) + '</button>').join('') +
        '</div>' +
        '<div class="tour__view" role="tabpanel">' +
          '<div class="tour__shot"><img alt="" decoding="async"></div>' +
          '<div class="tour__text"><p class="tour__label">' + esc(tr('What it does', 'Ce que ça fait')) + '</p><p class="tour__what"></p>' +
          '<p class="tour__label">' + esc(tr('Why it is designed this way', 'Pourquoi c’est pensé ainsi')) + '</p><p class="tour__why"></p></div>' +
        '</div>' +
      '</div>';
    const img = root.querySelector('.tour__shot img');
    const show = (k) => {
      cur = k;
      const s = TOUR.find((x) => x.k === k);
      const i = L === 'fr' ? 1 : 0;
      img.src = 'assets/img/cgp/tour-' + k + '-' + L + '.webp';
      img.alt = tr('Screenshot of the app, section ', "Capture de l'application, section ") + s[L];
      root.querySelector('.tour__what').textContent = s.what[i];
      root.querySelector('.tour__why').textContent = s.why[i];
      root.querySelectorAll('.tour__tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.k === k));
    };
    root.querySelectorAll('.tour__tab').forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
    root.querySelector('.tour__tabs').addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const i = TOUR.findIndex((x) => x.k === cur) + (e.key === 'ArrowRight' ? 1 : -1);
      const k = TOUR[(i + TOUR.length) % TOUR.length].k;
      show(k);
      root.querySelector('.tour__tab[data-k="' + k + '"]').focus();
    });
    TOUR.forEach((s) => { const p = new Image(); p.src = 'assets/img/cgp/tour-' + s.k + '-' + L + '.webp'; });
    show(cur);
  }

  /* ------------------------------------------------------------------------
     2. Ce que ça me coûte : facture -> coût central, fourchette, par catégorie
     ------------------------------------------------------------------------ */
  function cost(root, D) {
    let ev = 'CA2025', bill = 1000;
    root.innerHTML =
      '<div class="demo__controls">' +
        '<label class="demo__field"><span>' + esc(tr('My grocery spending per month', "Mes dépenses d'épicerie par mois")) + '</span>' +
          '<span class="demo__bill"><input type="range" min="100" max="3000" step="50" value="' + bill + '" aria-label="' + esc(tr('Monthly grocery bill', "Facture d'épicerie mensuelle")) + '">' +
          '<input type="number" min="0" max="10000" step="50" value="' + bill + '" class="demo__num" aria-label="' + esc(tr('Monthly grocery bill in dollars', "Facture d'épicerie mensuelle en dollars")) + '"><b>$</b></span></label>' +
        '<div class="demo__field"><span>' + esc(tr('Tariffs', 'Tarifs')) + '</span>' + seg(tr('Tariffs', 'Tarifs'), [['CA2025', tr('2025 (measured)', '2025 (mesuré)')], ['CA2026', tr('2026 (scenarios)', '2026 (scénarios)')]], ev) + '</div>' +
      '</div>' +
      '<ul class="demo__kpis"></ul>' +
      '<p class="demo__sub">' + esc(tr('Where the cost comes from', "D'où vient le coût")) + '</p>' +
      '<div class="demo__frame"><svg class="demo__svg" role="img"></svg><div class="demo__tip" hidden></div></div>' +
      '<p class="demo__note"></p>' +
      '<p class="demo__formula"></p>';
    const range = root.querySelector('input[type=range]'), box = root.querySelector('.demo__num');
    const svg = root.querySelector('svg'), tip = root.querySelector('.demo__tip'), frame = root.querySelector('.demo__frame');

    function draw() {
      const c = D.cost[ev];
      const mid = bill * c.rate * c.pt[1] * c.share[1], lo = bill * c.rate * c.pt[0] * c.share[0], hi = bill * c.rate * c.pt[2] * c.share[2];
      root.querySelector('.demo__kpis').innerHTML =
        '<li><b>' + money(mid) + '</b><span>' + esc(tr('per month, central estimate', 'par mois, estimation centrale')) + '</span></li>' +
        '<li><b>' + money(lo) + ' – ' + money(hi) + '</b><span>' + esc(tr('per month, plausible range', 'par mois, fourchette plausible')) + '</span></li>' +
        '<li><b>' + money(mid * c.months) + '</b><span>' + esc(tr('over ' + c.months + ' months', 'sur ' + c.months + ' mois')) + '</span></li>';
      const rows = (ev === 'CA2025' ? D.basket2025 : D.basket2026).map((r) => ({ name: r[lang()], upper: r.upper, v: bill * c.rate * c.pt[1] * r.w }))
        .sort((a, b) => b.v - a.v);
      const tot = rows.reduce((s, r) => s + r.v, 0);
      const W = widthOf(frame), narrow = W < 560;
      const rowH = narrow ? 44 : 34, m = { l: narrow ? 0 : Math.min(300, Math.round(W * 0.4)), r: 70, t: 6 }, H = m.t + rows.length * rowH + 12;
      const max = Math.max.apply(null, rows.map((r) => r.v)) || 1;
      const x = (v) => m.l + (v / max) * (W - m.l - m.r);
      let g = '<defs><pattern id="hatch-' + root.id + '" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="' + C.blue + '" fill-opacity=".45"/><line x1="0" y1="0" x2="0" y2="7" stroke="' + C.blue + '" stroke-width="3"/></pattern></defs>';
      rows.forEach((r, i) => {
        const y = m.t + i * rowH;
        const maxc = Math.floor(((narrow ? W - 10 : m.l - 16)) / 7.4);
        const label = r.name.length > maxc ? r.name.slice(0, maxc - 1).trim() + '…' : r.name;
        const by = narrow ? y + 21 : y + 7, bh = narrow ? 14 : rowH - 14;
        g += '<g class="demo__bar" data-i="' + i + '">' +
          '<rect class="demo__hit" x="0" y="' + y + '" width="' + W + '" height="' + rowH + '"/>' +
          (narrow ? '<text x="0" y="' + (y + 14) + '" class="demo__lab">' : '<text x="' + (m.l - 12) + '" y="' + (y + rowH / 2 + 4) + '" text-anchor="end" class="demo__lab">') +
          esc(label) + (r.upper ? ' *' : '') + '</text>' +
          '<rect x="' + m.l + '" y="' + by + '" width="' + Math.max(2, x(r.v) - m.l) + '" height="' + bh + '" rx="4" fill="' + (r.upper ? 'url(#hatch-' + root.id + ')' : C.blue) + '"/>' +
          '<text x="' + (x(r.v) + 8) + '" y="' + (by + bh / 2 + 4.5) + '" class="demo__val">' + esc(money(r.v)) + '</text></g>';
      });
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('aria-label', tr('Monthly cost by category', 'Coût mensuel par catégorie') + ': ' + rows.map((r) => r.name + ' ' + money(r.v)).join(', '));
      svg.innerHTML = g;
      svg.querySelectorAll('.demo__bar').forEach((el) => {
        el.addEventListener('pointerenter', () => {
          const r = rows[+el.dataset.i];
          tipAt(frame, tip, '<strong>' + esc(r.name) + '</strong><span>' + esc(money(r.v)) + ' ' + esc(tr('per month', 'par mois')) + ' · ' + esc(pct(100 * r.v / tot)) + ' ' + esc(tr('of the cost', 'du coût')) + '</span>' +
            (r.upper ? '<em>' + esc(tr('Upper bound', 'Borne haute')) + '</em>' : ''), 0.55, (m.t + (+el.dataset.i) * rowH) * frame.clientWidth / W);
        });
        el.addEventListener('pointerleave', () => { tip.hidden = true; });
      });
      const top4 = rows.slice(0, 4).reduce((s, r) => s + r.v, 0) / tot;
      const direct = rows.filter((r) => !r.upper).reduce((s, r) => s + r.v, 0);
      root.querySelector('.demo__note').textContent = ev === 'CA2025'
        ? tr('The four largest categories carry ' + pct(100 * top4) + ' of the cost. * Hatched bars are upper bounds: their customs codes are broader than the taxed products.',
          'Les quatre premières catégories portent ' + pct(100 * top4) + ' du coût. * Les barres hachurées sont des bornes hautes : leurs codes douaniers sont plus larges que les produits taxés.')
        : tr('Cheese is the only product taxed as sold in stores: ' + money(direct) + ' per month. * Hatched bars are ingredients, upper bounds: part of these imports goes to restaurants and food manufacturers.',
          'Le fromage est le seul produit taxé tel qu’il est vendu en magasin : ' + money(direct) + ' par mois. * Les barres hachurées sont des ingrédients, en borne haute : une partie de ces importations va aux restaurants et aux fabricants.');
      root.querySelector('.demo__formula').innerHTML = esc(tr('Cost = spending × tariff rate (', 'Coût = dépenses × taux du tarif (')) + '<b>' + esc(pct(100 * c.rate)) + '</b>' +
        esc(tr(') × share passed on (', ') × part répercutée (')) + '<b>' + esc(pct(100 * c.pt[1])) + '</b>' +
        esc(tr(ev === 'CA2025' ? ', measured' : ', central scenario', ev === 'CA2025' ? ', mesurée' : ', scénario central')) +
        esc(tr(') × share of food spending on tariffed US goods (', ') × part des dépenses alimentaires sur des produits américains taxés (')) + '<b>' + esc(pct(100 * c.share[1], 1)) + '</b>).';
    }
    const setBill = (v) => { bill = Math.max(0, Math.min(10000, +v || 0)); range.value = Math.min(3000, bill); box.value = bill; draw(); };
    range.addEventListener('input', () => setBill(range.value));
    box.addEventListener('input', () => setBill(box.value));
    onSeg(root, '.demo__controls', (v) => { ev = v; draw(); });
    onResize(frame, draw);
    draw();
  }

  /* ------------------------------------------------------------------------
     3. Est-ce taxé ? : recherche dans les listes tarifaires rattachées à l'IPC
     ------------------------------------------------------------------------ */
  function taxed(root, D) {
    const HOW = { direct: ['taxed directly', 'taxé directement'], partial: ['partly taxed', 'en partie taxé'], input: ['ingredients taxed', 'ingrédients taxés'], over_quota_only: ['only above the import quota', 'seulement au-delà du contingent'] };
    const chips = FR() ? ['fromage', 'café', 'jus', 'lait', 'pâtes', 'chocolat', 'beurre'] : ['cheese', 'coffee', 'juice', 'milk', 'pasta', 'chocolate', 'butter'];
    root.innerHTML =
      '<label class="demo__field demo__field--wide"><span>' + esc(tr('Type a product', 'Tapez un produit')) + '</span>' +
        '<input type="search" class="demo__search" autocomplete="off" placeholder="' + esc(tr('e.g. orange juice', 'ex. : jus d’orange')) + '"></label>' +
      '<div class="demo__chips">' + chips.map((c) => '<button type="button" class="demo__chip">' + esc(c) + '</button>').join('') + '</div>' +
      '<p class="demo__count" aria-live="polite"></p><ul class="taxed"></ul>';
    const input = root.querySelector('input'), list = root.querySelector('.taxed'), count = root.querySelector('.demo__count');
    const i = FR() ? 1 : 0;
    function run() {
      const q = fold(input.value.trim());
      if (!q) { list.innerHTML = ''; count.textContent = tr('63 tariff lines mapped to price series across 2018, 2025 and 2026.', '63 lignes tarifaires rattachées à des séries de prix en 2018, 2025 et 2026.'); return; }
      const hits = D.lookup.filter((r) => fold([r.en, r.fr, r.note_en, r.note_fr].join(' ')).includes(q));
      count.textContent = hits.length
        ? tr(hits.length + (hits.length > 1 ? ' matches' : ' match'), hits.length + (hits.length > 1 ? ' résultats' : ' résultat'))
        : tr('No match: this product is not on the food tariff lists mapped to the price index.', "Aucun résultat : ce produit ne figure pas sur les listes tarifaires alimentaires rattachées à l'indice des prix.");
      list.innerHTML = hits.map((r) => '<li class="taxed__item taxed__item--' + esc(r.how) + '">' +
        '<span class="taxed__year">' + esc(r.year) + '</span>' +
        '<div><p class="taxed__series">' + esc(r[lang()]) + ' <span class="taxed__rate">' + esc(r.rate) + '</span></p>' +
        '<p class="taxed__how">' + esc((HOW[r.how] || [r.how, r.how])[i]) + ' · ' + esc(r.start) + ' → ' + esc(r.end || tr('in force', 'en vigueur')) + '</p>' +
        '<p class="taxed__note">' + esc(FR() ? r.note_fr : r.note_en) + '</p></div></li>').join('');
    }
    input.addEventListener('input', run);
    root.querySelectorAll('.demo__chip').forEach((b) => b.addEventListener('click', () => { input.value = b.textContent; run(); }));
    input.value = chips[0];
    run();
  }

  /* ------------------------------------------------------------------------
     4. Prix et prévisions : historique, prévision à 12 mois, intervalles 80 / 95 %
     ------------------------------------------------------------------------ */
  function forecast(root, D) {
    let idx = 0, scen = true;
    root.innerHTML =
      '<div class="demo__controls">' +
        '<label class="demo__field demo__field--wide"><span>' + esc(tr('Price series', 'Série de prix')) + '</span><select class="demo__select">' +
          D.series.map((s, i) => '<option value="' + i + '">' + esc(s[lang()]) + '</option>').join('') + '</select></label>' +
        '<label class="demo__check" hidden><input type="checkbox" checked> ' + esc(tr('Show the 2026 tariff scenarios', 'Afficher les scénarios des tarifs de 2026')) + '</label>' +
      '</div>' +
      '<ul class="demo__legend"></ul>' +
      '<div class="demo__frame"><svg class="demo__svg demo__svg--line" role="img"></svg><div class="demo__tip" hidden></div></div>' +
      '<p class="demo__note"></p>';
    const sel = root.querySelector('select'), chk = root.querySelector('.demo__check'), svg = root.querySelector('svg');
    const tip = root.querySelector('.demo__tip'), frame = root.querySelector('.demo__frame');

    function draw() {
      const s = D.series[idx];
      const isCheese = s.en === 'Cheese';
      chk.hidden = !isCheese;
      const hist = s.hist.filter((h) => h[0] >= '2022-01');
      const fc = s.fc;
      const months = hist.map((h) => h[0]).concat(fc.map((f) => f[0]));
      const n = months.length, nh = hist.length;
      const showScen = isCheese && scen;
      const vals = hist.map((h) => h[1]).concat(fc.map((f) => f[4]), fc.map((f) => f[5]), showScen ? D.cheese.high : []);
      let lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
      const pad = (hi - lo) * 0.08 || 1; lo -= pad; hi += pad;
      const W = widthOf(frame), H = W < 560 ? 300 : 380, m = { t: 16, r: 14, b: 40, l: 46 };
      const iw = W - m.l - m.r, ih = H - m.t - m.b;
      const x = (i) => m.l + (i / (n - 1)) * iw, y = (v) => m.t + ih - ((v - lo) / (hi - lo)) * ih;
      const path = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      const band = (a, b) => path(fc.map((f, i) => [x(nh + i), y(f[a])])) +
        ' ' + fc.slice().reverse().map((f, i) => 'L' + x(nh + fc.length - 1 - i).toFixed(1) + ' ' + y(f[b]).toFixed(1)).join(' ') + ' Z';
      let g = '';
      const step = (hi - lo) / 5;
      for (let k = 0; k <= 5; k++) {
        const v = lo + k * step;
        g += '<line class="demo__grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="demo__axis" x="' + (m.l - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + esc(num(v, 0)) + '</text>';
      }
      months.forEach((mo, i) => { if (mo.endsWith('-01') && (W >= 480 || +mo.slice(0, 4) % 2 === 0)) g += '<text class="demo__axis" x="' + x(i) + '" y="' + (H - 14) + '" text-anchor="middle">' + mo.slice(0, 4) + '</text>'; });
      const tIdx = months.indexOf('2026-09');
      if (tIdx > 0) g += '<line class="demo__marker" x1="' + x(tIdx - 0.73) + '" x2="' + x(tIdx - 0.73) + '" y1="' + m.t + '" y2="' + (m.t + ih) + '"/><text class="demo__marklab" x="' + (x(tIdx - 0.73) - 6) + '" y="' + (m.t + 12) + '" text-anchor="end">' + esc(tr('Tariffs, 8 Sep 2026', 'Tarifs, 8 sept. 2026')) + '</text>';
      g += '<path d="' + band(4, 5) + '" fill="' + C.blue + '" fill-opacity=".12"/><path d="' + band(2, 3) + '" fill="' + C.blue + '" fill-opacity=".22"/>';
      g += '<path class="demo__line" d="' + path(hist.map((h, i) => [x(i), y(h[1])])) + '" stroke="#fff"/>';
      g += '<path class="demo__line demo__line--dash" d="' + path([[x(nh - 1), y(hist[nh - 1][1])]].concat(fc.map((f, i) => [x(nh + i), y(f[1])]))) + '" stroke="' + C.blue + '"/>';
      if (showScen) {
        [['low', C.amber], ['central', C.accent], ['high', C.soft]].forEach((k) => {
          g += '<path class="demo__line demo__line--thin" d="' + path(D.cheese[k[0]].map((v, i) => [x(nh + i), y(v)])) + '" stroke="' + k[1] + '"/>';
        });
      }
      g += '<line class="demo__cursor" y1="' + m.t + '" y2="' + (m.t + ih) + '" x1="-10" x2="-10"/><rect class="demo__hitarea" x="' + m.l + '" y="' + m.t + '" width="' + iw + '" height="' + ih + '"/>';
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('aria-label', s[lang()] + ': ' + tr('index since 2022 and 12-month forecast with 80% and 95% intervals', 'indice depuis 2022 et prévision à 12 mois avec intervalles à 80 % et 95 %'));
      svg.innerHTML = g;

      const leg = [['#fff', tr('Observed', 'Observé'), ''], [C.blue, tr('Forecast', 'Prévision'), 'dash'], [C.blue, tr('80% / 95% interval', 'Intervalle 80 % / 95 %'), 'band']];
      if (showScen) leg.push([C.amber, tr('Low scenario (25% passed on, temporary)', 'Scénario bas (25 % répercuté, temporaire)'), ''], [C.accent, tr('Central (60%)', 'Central (60 %)'), ''], [C.soft, tr('High (70%, lasting)', 'Haut (70 %, durable)'), '']);
      root.querySelector('.demo__legend').innerHTML = leg.map((l) => '<li><span class="' + l[2] + '" style="background:' + l[0] + '"></span>' + esc(l[1]) + '</li>').join('');

      const last = hist[nh - 1][1], end = fc[fc.length - 1];
      root.querySelector('.demo__note').textContent = isCheese
        ? tr('Forecast for ' + monthLabel(end[0]) + ': ' + signed(100 * (end[1] / last - 1)) + '% without the tariffs (80% interval ' + signed(100 * (end[2] / last - 1)) + '% to ' + signed(100 * (end[3] / last - 1)) + '%). Even the high scenario adds at most ' + pct(100 * (D.cheese.high[D.cheese.high.length - 1] / end[1] - 1), 1) + ' to the cheese price index: the tariff effect stays well inside the forecast uncertainty.',
          'Prévision pour ' + monthLabel(end[0]) + ' : ' + signed(100 * (end[1] / last - 1)) + ' % sans les tarifs (intervalle à 80 % de ' + signed(100 * (end[2] / last - 1)) + ' % à ' + signed(100 * (end[3] / last - 1)) + ' %). Même le scénario haut n’ajoute qu’au plus ' + pct(100 * (D.cheese.high[D.cheese.high.length - 1] / end[1] - 1), 1) + ' à l’indice des prix du fromage : l’effet du tarif reste bien dans l’incertitude de la prévision.')
        : tr('Forecast for ' + monthLabel(end[0]) + ': ' + signed(100 * (end[1] / last - 1)) + '% over 12 months (80% interval ' + signed(100 * (end[2] / last - 1)) + '% to ' + signed(100 * (end[3] / last - 1)) + '%). Data to ' + monthLabel(hist[nh - 1][0]) + '.',
          'Prévision pour ' + monthLabel(end[0]) + ' : ' + signed(100 * (end[1] / last - 1)) + ' % sur 12 mois (intervalle à 80 % de ' + signed(100 * (end[2] / last - 1)) + ' % à ' + signed(100 * (end[3] / last - 1)) + ' %). Données jusqu’à ' + monthLabel(hist[nh - 1][0]) + '.');

      const cursor = svg.querySelector('.demo__cursor');
      const show = (i) => {
        i = Math.max(0, Math.min(n - 1, i));
        cursor.setAttribute('x1', x(i)); cursor.setAttribute('x2', x(i));
        cursor.style.opacity = 1;
        let html = '<strong>' + esc(monthLabel(months[i])) + '</strong>';
        if (i < nh) html += '<span>' + esc(tr('Observed', 'Observé')) + '<b>' + num(hist[i][1], 1) + '</b></span>';
        else {
          const f = fc[i - nh];
          html += '<span>' + esc(tr('Forecast', 'Prévision')) + '<b>' + num(f[1], 1) + '</b></span><span>' + esc(tr('80% interval', 'Intervalle 80 %')) + '<b>' + num(f[2], 1) + ' – ' + num(f[3], 1) + '</b></span>';
          if (showScen) html += '<span>' + esc(tr('Central scenario', 'Scénario central')) + '<b>' + num(D.cheese.central[i - nh], 1) + '</b></span>';
        }
        tipAt(frame, tip, html, x(i) / W, 12);
      };
      const hit = svg.querySelector('.demo__hitarea');
      hit.addEventListener('pointermove', (e) => {
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const ctm = svg.getScreenCTM(); if (!ctm) return;
        const p = pt.matrixTransform(ctm.inverse());
        show(Math.round(((p.x - m.l) / iw) * (n - 1)));
      });
      hit.addEventListener('pointerleave', () => { tip.hidden = true; cursor.style.opacity = 0; });
    }
    sel.addEventListener('change', () => { idx = +sel.value; draw(); });
    chk.querySelector('input').addEventListener('change', (e) => { scen = e.target.checked; draw(); });
    onResize(frame, draw);
    draw();
  }

  /* ------------------------------------------------------------------------
     5. Effets des tarifs : écart avec le jumeau synthétique, et part répercutée
     ------------------------------------------------------------------------ */
  function effects(root, D) {
    let ev = 'CA2025';
    root.innerHTML =
      '<div class="demo__controls"><div class="demo__field"><span>' + esc(tr('Episode', 'Épisode')) + '</span>' +
        seg(tr('Episode', 'Épisode'), [['CA2025', tr('2025 (25%)', '2025 (25 %)')], ['CA2018', tr('2018 (10%)', '2018 (10 %)')]], ev) + '</div></div>' +
      '<p class="demo__sub">' + esc(tr('Share of the tariff passed on to shelf prices', 'Part du tarif répercutée sur les prix en magasin')) + '</p>' +
      '<div class="demo__frame"><svg class="demo__svg demo__svg--pt" role="img"></svg></div>' +
      '<p class="demo__sub">' + esc(tr('Gap with the synthetic twin, by series (points of index, while the tariff applied)', 'Écart avec le jumeau synthétique, par série (points d’indice, pendant le tarif)')) + '</p>' +
      '<ul class="demo__legend"><li><span style="background:' + C.blue + '"></span>' + esc(tr('Tariffed series', 'Série taxée')) + '</li><li><span style="background:' + C.amber + '"></span>' + esc(tr('Placebo (should show nothing)', 'Placebo (ne devrait rien montrer)')) + '</li></ul>' +
      '<div class="demo__frame"><svg class="demo__svg demo__svg--dots" role="img"></svg><div class="demo__tip" hidden></div></div>' +
      '<p class="demo__note"></p>';
    const svgPt = root.querySelector('.demo__svg--pt'), svg = root.querySelector('.demo__svg--dots');
    const tip = root.querySelector('.demo__tip'), frame = svg.parentNode;
    onResize(frame, () => draw());

    function draw() {
      const P = D.passThrough[ev];
      const W = widthOf(frame), narrow = W < 560, H = 96, m = { l: 24, r: 24 };
      const lo = Math.min(-0.5, P.lo - 0.1), hi = Math.max(1.0, P.hi + 0.1);
      const x = (v) => m.l + ((v - lo) / (hi - lo)) * (W - m.l - m.r);
      let g = '';
      [lo, 0, 0.5, 1, hi].filter((v, i, a) => a.indexOf(v) === i).forEach((v) => {
        if (v < lo || v > hi) return;
        g += '<line class="demo__grid" x1="' + x(v) + '" x2="' + x(v) + '" y1="18" y2="64"/><text class="demo__axis" x="' + x(v) + '" y="84" text-anchor="middle">' + esc(pct(100 * v)) + '</text>';
      });
      g += '<line x1="' + x(P.lo) + '" x2="' + x(P.hi) + '" y1="41" y2="41" stroke="' + C.blue + '" stroke-width="10" stroke-linecap="round" stroke-opacity=".45"/>' +
        '<circle cx="' + x(P.est) + '" cy="41" r="9" fill="' + C.blue + '" stroke="#30303d" stroke-width="3"/>' +
        '<text class="demo__val" x="' + x(P.est) + '" y="20" text-anchor="middle">' + esc(tr('This project ', 'Ce projet ') + pct(100 * P.est)) + '</text>' +
        '<line x1="' + x(P.boc) + '" x2="' + x(P.boc) + '" y1="26" y2="58" stroke="' + C.accent + '" stroke-width="3"/>' +
        '<text class="demo__marklab" x="' + x(P.boc) + '" y="72" text-anchor="middle">' + esc(tr('Bank of Canada ', 'Banque du Canada ') + pct(100 * P.boc)) + '</text>';
      svgPt.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svgPt.setAttribute('aria-label', tr('Pass-through ', 'Transmission ') + pct(100 * P.est) + ', ' + tr('95% interval ', 'intervalle à 95 % ') + pct(100 * P.lo) + ' – ' + pct(100 * P.hi));
      svgPt.innerHTML = g;

      const rows = D.effects[ev];
      const rowH = 22, mm = { l: narrow ? 150 : 300, r: 24, t: 8 }, HH = mm.t + rows.length * rowH + 34;
      const ext = Math.max.apply(null, rows.map((r) => Math.abs(r.eff))) * 1.1 || 1;
      const xx = (v) => mm.l + ((v + ext) / (2 * ext)) * (W - mm.l - mm.r);
      let d = '<line class="demo__zero" x1="' + xx(0) + '" x2="' + xx(0) + '" y1="' + mm.t + '" y2="' + (mm.t + rows.length * rowH) + '"/>';
      [-ext * 0.9, -ext * 0.45, ext * 0.45, ext * 0.9].forEach((v) => {
        d += '<text class="demo__axis" x="' + xx(v) + '" y="' + (HH - 10) + '" text-anchor="middle">' + esc(signed(v, Math.abs(v) < 5 ? 1 : 0)) + '</text>';
      });
      rows.forEach((r, i) => {
        const y = mm.t + i * rowH + rowH / 2;
        const cut = narrow ? 18 : 40, name = r[lang()].length > cut ? r[lang()].slice(0, cut - 1) + '…' : r[lang()];
        d += '<g class="demo__dotrow" data-i="' + i + '"><rect class="demo__hit" x="0" y="' + (y - rowH / 2) + '" width="' + W + '" height="' + rowH + '"/>' +
          '<text class="demo__lab demo__lab--sm" x="' + (mm.l - 10) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(name) + '</text>' +
          '<line x1="' + xx(0) + '" x2="' + xx(r.eff) + '" y1="' + y + '" y2="' + y + '" stroke="' + (r.group === 'placebo' ? C.amber : C.blue) + '" stroke-opacity=".35" stroke-width="2"/>' +
          '<circle cx="' + xx(r.eff) + '" cy="' + y + '" r="' + (r.p < 0.1 ? 6.5 : 5) + '" fill="' + (r.group === 'placebo' ? C.amber : C.blue) + '" fill-opacity="' + (r.p < 0.1 ? 1 : 0.55) + '"/></g>';
      });
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + HH);
      svg.setAttribute('aria-label', tr('Gap with the synthetic twin for each series', 'Écart avec le jumeau synthétique pour chaque série'));
      svg.innerHTML = d;
      svg.querySelectorAll('.demo__dotrow').forEach((el) => {
        el.addEventListener('pointerenter', () => {
          const r = rows[+el.dataset.i];
          tipAt(frame, tip, '<strong>' + esc(r[lang()]) + '</strong><span>' + esc(tr('Gap', 'Écart')) + '<b>' + esc(signed(r.eff, 1)) + ' pt</b></span><span>' + esc(tr('Permutation p-value', 'p-valeur par permutation')) + '<b>' + esc(num(r.p, 2)) + '</b></span><em>' + esc(r.group === 'placebo' ? tr('Placebo', 'Placebo') : tr('Tariffed', 'Taxée')) + '</em>',
            0.5, (mm.t + (+el.dataset.i) * rowH) * frame.clientWidth / W);
        });
        el.addEventListener('pointerleave', () => { tip.hidden = true; });
      });
      root.querySelector('.demo__note').textContent = ev === 'CA2025'
        ? tr('About ' + pct(100 * P.est) + ' of the tariff reached shelf prices once world commodity prices are removed (95% interval ' + pct(100 * P.lo) + ' to ' + pct(100 * P.hi) + '), consistent with the Bank of Canada. Coffee stands out, but its rise came from world prices. Larger dots: p < 0.10.',
          'Environ ' + pct(100 * P.est) + ' du tarif a atteint les prix en magasin une fois les cours mondiaux retirés (intervalle à 95 % de ' + pct(100 * P.lo) + ' à ' + pct(100 * P.hi) + '), en cohérence avec la Banque du Canada. Le café ressort, mais sa hausse vient des cours mondiaux. Gros points : p < 0,10.')
        : tr('No detectable effect in 2018: the interval (' + pct(100 * P.lo) + ' to ' + pct(100 * P.hi) + ') is too wide to confirm or reject the Bank of Canada’s 70% for food. Larger dots: p < 0.10.',
          'Aucun effet détectable en 2018 : l’intervalle (' + pct(100 * P.lo) + ' à ' + pct(100 * P.hi) + ') est trop large pour confirmer ou contredire les 70 % de la Banque du Canada pour l’alimentation. Gros points : p < 0,10.');
    }
    onSeg(root, '.demo__controls', (v) => { ev = v; draw(); });
    draw();
  }

  /* ------------------------------------------------------------------------
     Montage
     ------------------------------------------------------------------------ */
  const DEMOS = { tour: tour, cost: cost, taxed: taxed, forecast: forecast, effects: effects };

  function mountAll() {
    const els = Array.prototype.slice.call(document.querySelectorAll('.demo__body[data-demo]'));
    if (!els.length) return;
    els.forEach((el, i) => { el.id = el.id || 'demo-' + i; });
    els.filter((el) => el.dataset.demo === 'tour').forEach((el) => tour(el));
    const rest = els.filter((el) => el.dataset.demo !== 'tour');
    if (!rest.length) return;
    rest.forEach((el) => { el.innerHTML = '<p class="demo__loading">' + esc(tr('Loading the data…', 'Chargement des données…')) + '</p>'; });
    load().then((D) => rest.forEach((el) => {
      try { (DEMOS[el.dataset.demo] || function () {})(el, D); } catch (e) { el.innerHTML = '<p class="demo__loading">' + esc(tr('This demo could not load.', 'Cette démo n’a pas pu se charger.')) + '</p>'; }
    })).catch(() => rest.forEach((el) => {
      el.innerHTML = '<p class="demo__loading">' + esc(tr('The data could not load. Open the live app instead.', 'Les données n’ont pas pu se charger. Ouvrez plutôt l’application en ligne.')) + '</p>';
    }));
  }

  window.Demos = { mountAll: mountAll };
})();
