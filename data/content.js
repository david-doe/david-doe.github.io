/* ==========================================================================
   data/content.js — TOUT le contenu éditable du site (version française).
   La version anglaise (data/content.en.js) vient se superposer à celle-ci
   quand on bascule en EN : seuls les textes y sont traduits.
   ========================================================================== */
window.SITE = {
  theme: { accent: "#8b1e3f", accentHover: "#6f1631", accentBright: "#d9657f" },

  ui: { skillsDefaultView: "hard" },   // "hard" ou "soft"

  meta: {
    title: "David DOE · Portfolio data",
    description: "Portfolio de David DOE, étudiant en Master SIAD à l'Université de Lille : data analysis, BI et machine learning.",
    url: "https://david-doe.github.io"   // domaine du site (à changer si tu prends un nom de domaine)
  },

  person: {
    firstName: "David",
    lastName: "DOE",
    logoText: "David D.",
    tagline: "Étudiant en Master Systèmes d'information et Aide à la Décision (SIAD)",
    photo: "assets/img/photo-portrait.jpg",      // ta photo (portrait 3:4, 900 x 1200 px)
    email: "doe260902@gmail.com",
    aboutShort: "Étudiant en Master SIAD parcours Data Science à l'Université de Lille, je travaille sur toute la chaîne data : préparer et fiabiliser les données, les analyser, puis les restituer aux équipes métiers sous une forme qu'elles peuvent utiliser.",
    aboutLong: [
      "Je prépare le Master SIAD (Systèmes d'information et Aide à la Décision) à l'Université de Lille. Ce qui m'intéresse, c'est toute la chaîne data : récupérer des données, les nettoyer, les analyser, puis expliquer ce qu'elles disent à des gens.",
      "Je viens de l'économie : licence d'économie internationale à l'Université de Lomé, au Togo, puis licence d'économie-gestion à Dunkerque, mention Bien. Le Master m'a fait passer du côté des outils : SQL, Python, SAS, R et Power BI.",
      "En cours, j'ai travaillé sur des cas concrets : l'effet du Covid sur les prêts des médiathèques de Lille, les profils et le score de bon vendeur des conseillers d'une plateforme de crédit, les chances de réussite en première année de sociologie, les déterminants du statut de propriétaire en Suisse, le départ des clients d'un opérateur télécom, ou encore la démarque et les retours de lots dans un magasin discount. À chaque fois, le même fil : poser la question, vérifier la qualité des données, choisir la méthode la plus simple qui tient, et rendre le résultat lisible.",
      "Côté caractère, on me décrit plutôt rigoureux, autonome et curieux. Hors écran, je joue au futsal."
    ]
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/david-doe/",
    github: "https://github.com/david-doe",
    mail: "mailto:doe260902@gmail.com"
  },

  nav: [
    { label: "Accueil", href: "index.html#accueil" },
    { label: "Travaux", href: "index.html#travaux" },
    { label: "Skills", href: "index.html#skills" },
    { label: "Expérience", href: "index.html#experience" },
    { label: "Formation", href: "index.html#formation" },
    { label: "Contact", href: "index.html#contact" }
  ],

  projectCategories: ["Inférence causale & prévision", "Data analyse & BI", "Scoring", "Séries temporelles", "Économétrie", "Datavisualisation"],

  projects: [
    {
      slug: "prix-epicerie-canada",
      title: "Ce que les contre-tarifs coûtent à l'épicerie au Canada",
      date: "Août - Oct. 2026",
      kind: "Projet personnel",
      category: "Inférence causale & prévision",
      summary: "De combien les contre-tarifs canadiens font-ils monter les prix de l'épicerie, à quelle vitesse et pour combien de temps ? Une application bilingue en ligne, fondée uniquement sur des données publiques.",
      description: "Suivi des prix, estimation causale de la part des tarifs répercutée sur les prix (contrôle synthétique, doubles différences), prévisions à 12 mois avec intervalles conformes et coût pour un ménage, dans une application Streamlit bilingue mise à jour chaque mois.",
      image: "assets/img/projet-canada-epicerie.svg",
      tags: ["Python", "Inférence causale", "Contrôle synthétique", "LightGBM", "Prédiction conforme", "Streamlit", "SQL", "NLP"],
      externalUrl: "",
      liveUrl: "https://canada-grocery-prices.streamlit.app/",
      repoUrl: "https://github.com/david-doe/canada-grocery-prices",
      featured: true,
      facts: [
        { label: "Cadre", value: "Projet personnel sur données publiques (Statistique Canada, Banque du Canada, UN Comtrade)" },
        { label: "Équipe", value: "Seul" },
        { label: "Outils", value: "Python (pandas, statsmodels, scikit-learn, LightGBM), SQL (DuckDB), Streamlit, Plotly, GitHub Actions" },
        { label: "Livrables", value: "Application bilingue en ligne, dépôt GitHub public et reproductible, journal de 34 décisions sourcées, résumé d'une page" }
      ],
      highlights: [
        { value: "≈ 40 %", label: "du tarif de 2025 répercuté sur les prix, une fois les cours mondiaux retirés (Banque du Canada : environ 25 %)" },
        { value: "0,52 $", label: "par 100 $ d'épicerie : le coût des contre-tarifs de 2025 pour un ménage moyen" },
        { value: "101", label: "séries de prix prévues à 12 mois, avec une erreur réduite de 41 % face à la méthode « comme l'an dernier »" },
        { value: "34", label: "décisions de méthode, chacune justifiée par une source et tracée dans un journal" }
      ],
      body: [
        { type: "h2", text: "Contexte et question" },
        { type: "p", text: "Depuis 2018, le Canada répond aux tarifs américains par des contre-tarifs sur des produits américains, alimentation comprise : une surtaxe de 10 % en 2018, des tarifs de 25 % sur une large liste en 2025, puis, le 8 septembre 2026, des tarifs de 25 % sur le fromage et de 50 % sur les poudres de lait, le lactosérum, le miel, la mélasse et les mélanges pour boulangerie. À chaque épisode, on peut se demander qui paie ces tarifs, et combien." },
        { type: "p", text: "Le projet répond à quatre questions : qu'est-ce qui a été taxé exactement, quelle part du tarif a atteint les rayons, le tarif ou les cours mondiaux, et où vont les prix." },
        { type: "callout", title: "Ce que le projet apporte", text: "La Banque du Canada a déjà mesuré l'effet des tarifs de 2025 (environ 25 % répercuté, de façon temporaire) avec des données détaillées par produit. Le projet ne présente donc pas ce résultat comme une découverte : il le reproduit avec des données publiques, se concentre sur l'alimentation, l'étend aux tarifs de 2026 et le traduit en dollars pour un ménage, dans une application où chaque chiffre renvoie à sa source." },
        { type: "h2", text: "L'application, onglet par onglet" },
        { type: "p", text: "L'application est en ligne, en anglais et en français, en thème clair ou sombre. La visite ci-dessous montre chaque onglet, ce qu'il fait et pourquoi il est pensé ainsi. Les démos qui suivent reprennent les données réelles de l'application : vous pouvez les manipuler ici sans quitter la page." },
        { type: "demo", demo: "tour", title: "Visite guidée", intro: "Cliquez sur un onglet (ou utilisez les flèches du clavier) pour voir la capture correspondante." },
        { type: "h2", text: "Ce que les tarifs coûtent à un ménage" },
        { type: "p", text: "Pour un ménage, un pourcentage de transmission parle peu ; le projet le convertit en dollars par mois. Le coût se calcule ainsi : dépenses × taux du tarif × part répercutée × part des dépenses alimentaires sur des produits américains taxés. Cette dernière part vient des importations UN Comtrade par produit (code à 6 chiffres) rapportées aux dépenses des ménages de Statistique Canada." },
        { type: "demo", demo: "cost", title: "Démo : votre facture", intro: "Changez le montant de la facture et l'épisode. Survolez une barre pour voir sa part du coût." },
        { type: "ul", items: [
          "2025 : environ 0,52 $ par 100 $ d'épicerie pendant les six mois d'application, soit environ 0,5 point des 1,8 % de hausse des prix en magasin sur la période.",
          "2026 : environ 0,11 $ par 100 $. Le fromage, seul produit taxé tel qu'il est vendu en magasin, n'en représente que 0,02 $ ; le reste porte sur des ingrédients, dont une partie va aux restaurants et aux fabricants.",
          "Les catégories dont les codes douaniers sont plus larges que les produits taxés sont affichées comme bornes hautes, hachurées."
        ] },
        { type: "h2", text: "Ce qui a été taxé, ligne par ligne" },
        { type: "p", text: "Les listes officielles (Finances Canada, Gazette du Canada) comptent des centaines de lignes tarifaires. Chacune a été rattachée à la série de l'indice des prix à la consommation (IPC) où le produit apparaît, avec son type d'exposition : taxé directement, en partie, seulement comme ingrédient, ou seulement au-delà d'un contingent d'importation. Cette nuance explique par exemple pourquoi le lait n'a pas bougé en 2026 : seules les poudres de lait, des ingrédients, sont taxées." },
        { type: "demo", demo: "taxed", title: "Démo : est-ce taxé ?", intro: "Tapez un produit ou choisissez une suggestion." },
        { type: "h2", text: "Mesurer l'effet : une méthode causale" },
        { type: "p", text: "Comparer les prix avant et après un tarif ne suffit pas : les prix montent aussi pour d'autres raisons. Chaque série taxée est donc comparée à un « jumeau synthétique », un mélange pondéré de séries semblables non taxées qui suivait la même trajectoire avant le tarif. L'écart après le tarif estime son effet, et sa significativité est testée par permutation. Des séries placebo, non taxées, servent de contrôle : elles ne devraient rien montrer." },
        { type: "p", text: "Pour passer de l'effet à la part répercutée, l'écart de chaque série est rapporté à son exposition (la part de produits américains taxés dans la série) dans une régression en doubles différences à traitement continu. Enfin, les séries liées à une matière première (café, cacao, sucre, blé) sont corrigées des cours mondiaux de la Banque mondiale : sans cette correction, le café, dont l'arabica a doublé, passerait pour un effet du tarif." },
        { type: "demo", demo: "effects", title: "Démo : effets des tarifs", intro: "Comparez 2025 et 2018. Survolez un point pour voir l'écart et sa p-valeur." },
        { type: "table", caption: "Ce que disent les estimations", head: ["Épisode", "Part répercutée estimée", "Lecture"], rows: [
          ["2025 (25 %)", "≈ 40 % [−7 % ; 86 %]", "Cohérent avec la Banque du Canada (≈ 25 %) ; café exclu, effet des cours mondiaux"],
          ["2018 (10 %)", "non détectable", "Intervalle trop large pour confirmer ou contredire les 70 % de la Banque du Canada"],
          ["2026 (25 % et 50 %)", "au plus +0,6 point sur le fromage", "Le fromage américain ne pèse qu'environ 2,4 % des dépenses en fromage"]
        ] },
        { type: "callout", title: "Pourquoi l'effet est si difficile à voir", text: "En 2025, les produits américains taxés ne pesaient en médiane que 9 % d'une série de l'IPC taxée. Même un tarif de 25 % entièrement répercuté ne déplacerait ces séries que d'environ 3 points, alors que les données mensuelles publiques ne permettent de détecter qu'environ 5 points. Cette limite vient des données, pas de la méthode." },
        { type: "h2", text: "Prévoir les prix, avec leur marge d'erreur" },
        { type: "p", text: "Les 101 séries de prix alimentaires sont prévues à 12 mois. La règle : une méthode simple d'abord (« comme l'an dernier », dite naïve saisonnière), puis ETS et un modèle LightGBM global, tous évalués par backtest (test sur le passé) à origine glissante sur 2019-2025, comme s'ils avaient été faits dans le passé. Aucune validation croisée aléatoire : sur une série temporelle, le modèle apprendrait sur des données postérieures à la période prévue." },
        { type: "table", caption: "Résultats du backtest (2019-2025)", head: ["Critère", "Résultat"], rows: [
          ["Erreur (MASE, plus bas = mieux)", "1,28 pour le modèle publié contre 2,16 pour la méthode naïve saisonnière"],
          ["Couverture de l'intervalle à 80 %", "85 % à 87 % des valeurs observées en 2023-2025"],
          ["Couverture de l'intervalle à 95 %", "96 % à 97 %"],
          ["Prévision 2026, prix alimentaires", "+3,5 %, juste sous la fourchette de +4 % à +6 % du Food Price Report"]
        ] },
        { type: "p", text: "Les intervalles sont calculés par prédiction conforme : calibrés sur les erreurs passées du modèle, ils ne supposent aucune loi statistique et leur couverture réelle est vérifiée." },
        { type: "demo", demo: "forecast", title: "Démo : prix et prévisions", intro: "Choisissez une série. Pour le fromage, les scénarios des tarifs de 2026 s'ajoutent à la prévision faite juste avant eux." },
        { type: "h2", text: "Surveiller les tarifs de 2026" },
        { type: "p", text: "La prévision faite avec les données jusqu'à août 2026, le mois précédant les tarifs, est figée : c'est la trajectoire que les prix auraient suivie sans eux. Chaque mois, les prix observés y sont comparés. Avant d'en faire une alerte, la règle a été rejouée sur les épisodes passés : elle ne détecte rien (2018 : 4 % des séries taxées signalées contre 7 % des non taxées ; 2025 : 14 % contre 15 %), et son seul signal fort, le café, venait des cours mondiaux. Aucune alerte n'est donc affichée ; la règle sert seulement à l'analyse." },
        { type: "h2", text: "Ce qui utilise l'IA" },
        { type: "ul", items: [
          "Classification des lignes tarifaires (NLP) : pour chaque nouvelle liste, TF-IDF, plongements multilingues et fusion de rangs proposent les séries de l'IPC candidates, évalués contre le rattachement manuel. La bonne série est dans les 5 propositions dans 81 % des cas, et en première position dans 44 % des cas.",
          "Recherche documentaire avec réponses rédigées (RAG) : construite, évaluée sur un jeu de 34 questions réservées avec un corrigé vérifié à la main, puis retirée de l'application. Elle répondait juste à 79 % des questions (anglais 100 %, français 56 %), sous le seuil de 80 % par langue fixé à l'avance. Prochaine correction : traduire les questions françaises avant la recherche.",
          "Assistant en langage libre : prêt, avec son jeu d'évaluation bilingue ; il ne sera affiché qu'une fois sa fiabilité mesurée et publiée."
        ] },
        { type: "h2", text: "Industrialisation" },
        { type: "ul", items: [
          "Sources publiques uniquement : Statistique Canada (IPC, dépenses des ménages), Banque du Canada (taux de change), UN Comtrade (importations par produit), Banque mondiale (cours des matières premières).",
          "Après chaque publication mensuelle de l'IPC, une tâche planifiée met les données à jour, ouvre une demande de fusion et compare le prix du fromage à la prévision figée.",
          "30 tests automatiques tournent à chaque envoi de code (GitHub Actions) ; l'application se redéploie à chaque fusion.",
          "Chaque choix de méthode est une décision numérotée et sourcée, en anglais et en français.",
          "Requêtes SQL (DuckDB) sur les mêmes tables, pour des analyses ponctuelles."
        ] },
        { type: "h2", text: "Limites" },
        { type: "ul", items: [
          "Les indices mensuels publics mélangent produits taxés et non taxés : les petits effets ne peuvent pas être mesurés précisément.",
          "L'exposition aux importations est mesurée au niveau des produits à 6 chiffres et à la valeur à la frontière : c'est une approximation.",
          "Un test placebo sur les produits laitiers a en partie échoué : leurs prix suivent une dynamique réglementée qui leur est propre.",
          "Les tarifs de 2026 sont trop récents pour être mesurés : leur effet est présenté sous forme de scénarios fondés sur les taux de répercussion déjà publiés (Banque du Canada)."
        ] },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: [
          "Inférence causale : contrôle synthétique avec tests de permutation, doubles différences à traitement continu, placebos",
          "Prévision de séries temporelles : référence naïve saisonnière, backtest à origine glissante, LightGBM, intervalles conformes",
          "NLP et recherche d'information, évalués contre des étiquettes humaines avec intervalles bootstrap",
          "Collecte de données par API publiques et chaîne de traitement reproductible",
          "Application web bilingue (Streamlit, Plotly) déployée et mise à jour chaque mois",
          "Tests automatisés, intégration continue et documentation des décisions"
        ] }
      ]
    },
    {
      slug: "projet-noz",
      title: "Piloter un magasin discount avec ses données",
      date: "Oct. 2026",
      kind: "Projet personnel",
      category: "Data analyse & BI",
      summary: "Quels lots vont repartir trop tôt, quel rayon perd de la marchandise, et quand faut-il du monde en caisse ? Une chaîne complète SQL, Python et Power BI.",
      description: "Base PostgreSQL avec 22 contrôles de qualité, tests statistiques, modèle de risque de retour anticipé (AUC 0,92 au jour 7), prévision du CA à 7 jours et tableau de bord Power BI de 3 pages, sur un magasin simulé à partir de mon stage chez NOZ.",
      image: "assets/img/projet-noz.svg",
      tags: ["SQL", "PostgreSQL", "Python", "sklearn", "Power BI", "Logit", "Holt-Winters"],
      externalUrl: "",
      repoUrl: "https://github.com/david-doe/projet-noz",
      featured: true,
      facts: [
        { label: "Cadre", value: "Projet personnel, Master SIAD" },
        { label: "Équipe", value: "Seul" },
        { label: "Outils", value: "PostgreSQL, Python (pandas, scikit-learn, statsmodels), Power BI (DAX)" },
        { label: "Livrables", value: "Dépôt GitHub reproductible, rapport PDF, résumé métier, tableau de bord" }
      ],
      highlights: [
        { value: "3 060", label: "lots suivis jour par jour (95 332 lignes), sur 20 mois simulés" },
        { value: "65 %", label: "des retours anticipés repérés en ne surveillant que 20 % des lots" },
        { value: "42,5 %", label: "de la démarque inconnue dans deux rayons qui font 19 % du CA" },
        { value: "11 %", label: "d'erreur sur la prévision du CA à 7 jours" }
      ],
      body: [
        { type: "h2", text: "Contexte" },
        { type: "p", text: "En stage de L3 chez NOZ à Saint-Pol-sur-Mer (2025), j'ai vu un magasin de déstockage qui ne choisit pas ce qu'il reçoit : la centrale envoie les lots. Trois problèmes en découlent : des lots renvoyés à l'entrepôt avant la fin de leurs 7 semaines en rayon parce que le magasin est plein, de la marchandise qui disparaît sans qu'on sache où avant l'inventaire, et du personnel renforcé les jours de livraison plutôt que les jours de vente." },
        { type: "callout", title: "Des données simulées", text: "Aucune donnée interne de NOZ n'est utilisée. J'ai écrit un simulateur de magasin calé sur les relevés de mon mémoire de stage (CA hebdomadaire, profil des jours, parts de CA par rayon, environ 20 palettes par livraison). Les résultats servent à tester la méthode ; ils ne décrivent pas le vrai magasin." },
        { type: "h2", text: "La base de données" },
        { type: "p", text: "Sept tables PostgreSQL reliées par des clés étrangères : le magasin jour par jour, les arrivages, les ventes de chaque lot chaque jour, la sortie de chaque lot, les inventaires et les catégories. Avant toute analyse, 22 contrôles de qualité tournent automatiquement, et le chargement s'arrête si un seul échoue. Cinq vues SQL préparent les indicateurs pour Python et Power BI." },
        { type: "img", src: "assets/img/noz-schema_base_noz.png", alt: "Schéma des tables de la base NOZ", caption: "Le schéma de la base, vu dans DBeaver." },
        { type: "h2", text: "Ce que montrent les analyses" },
        { type: "table", caption: "Les quatre questions et leurs réponses (magasin simulé)", head: ["Question", "Réponse"], rows: [
          ["Peut-on repérer les lots renvoyés avant 49 jours ?", "Oui. Régression logistique : AUC de 0,836 à l'arrivée du lot, 0,922 après une semaine en rayon. En surveillant 20 % des lots, on en repère 65 %."],
          ["Où se concentre la démarque inconnue ?", "Bien-être et Droguerie-Parfumerie-Hygiène : 42,5 % de la démarque inconnue pour 19 % du CA."],
          ["Vend-on plus les jours de livraison ?", "Non (p = 0,86). Le samedi fait 35 % de CA en plus, sans livraison."],
          ["Peut-on prévoir le CA de la semaine ?", "Holt-Winters : 11 % d'erreur, 21,5 % de mieux que la méthode naïve."]
        ] },
        { type: "p", text: "Un résultat utile pour le terrain : quand le magasin est rempli à plus de 110 %, les lots qui arrivent repartent trop tôt 1,7 fois plus souvent (15,7 % contre 9,4 %)." },
        { type: "h2", text: "Le tableau de bord" },
        { type: "p", text: "Trois pages Power BI pour un responsable de magasin : un radar des anomalies par rayon, une page de planification du personnel et une page sur la saturation, avec un paramètre « what-if » pour tester le seuil d'alerte." },
        { type: "img", src: "assets/img/noz-pbi_page1_radar_anomalies.png", alt: "Page « Radar des anomalies » du tableau de bord Power BI", caption: "Page 1 : démarque et retours anticipés par rayon." },
        { type: "h2", text: "Recommandations" },
        { type: "ol", items: [
          "Chaque lundi, revoir la courte liste des lots les plus à risque : remise, meilleur emplacement ou retour anticipé.",
          "Au-delà de 110 % de remplissage, sortir d'abord les lots qui ne se vendent plus, avant la prochaine livraison.",
          "Compter plus souvent les rayons Bien-être et Droguerie-Parfumerie-Hygiène.",
          "Construire le planning de caisse à partir des ventes prévues, pas des jours de livraison."
        ] },
        { type: "h2", text: "Limites" },
        { type: "p", text: "Les relations mises en évidence avaient été programmées dans le simulateur : l'exercice montre que la méthode sait les retrouver. Le modèle ne prévoit pas encore la saturation elle-même, et l'effet réel d'une remise sur les ventes reste à mesurer. Avant toute décision, il faudrait relancer la chaîne sur les données d'un vrai magasin." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Modélisation d'une base relationnelle et contrôles de qualité en SQL", "Tests statistiques et tailles d'effet", "Classification avec découpage temporel et sans fuite de données", "Prévision de séries temporelles", "Tableau de bord Power BI avec mesures DAX", "Projet reproductible et documenté sur GitHub"] }
      ]
    },
    {
      slug: "score-churn-telco",
      title: "Prédire le départ des clients d'un opérateur télécom",
      date: "2026",
      kind: "Projet académique",
      category: "Scoring",
      summary: "Quels clients vont partir, et sur quels leviers agir pour les garder ? Un modèle de score de churn et un rapport pour le métier.",
      description: "Modèle de score de churn par régression logistique sur 7 043 clients d'un opérateur télécom (jeu Telco Customer Churn), avec lecture en odds ratios, choix du seuil pour maximiser le rappel et recommandations business.",
      image: "assets/img/projet-churn.svg",
      tags: ["R", "RMarkdown", "Régression logistique", "Odds ratios"],
      externalUrl: "",
      repoUrl: "https://github.com/david-doe/churn-telco",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, cours de programmation R" },
        { label: "Équipe", value: "Binôme, avec Roman Delbare" },
        { label: "Outils", value: "R (glm), RMarkdown" },
        { label: "Livrables", value: "Script RMarkdown, rapport HTML, rapport métier PDF" }
      ],
      highlights: [
        { value: "7 043", label: "clients analysés, 21 variables" },
        { value: "78 %", label: "des clients partis repérés sur l'échantillon test (seuil de 30 %)" },
        { value: "76 %", label: "de bonnes prédictions sur l'échantillon test" },
        { value: "÷ 4", label: "des chances de départ avec un contrat de deux ans" }
      ],
      body: [
        { type: "h2", text: "Contexte et question" },
        { type: "p", text: "Un opérateur télécom perd des clients, et chaque départ coûte plus cher qu'une fidélisation. Le projet consiste à construire un score de churn, c'est-à-dire la probabilité qu'un client parte, pour repérer les clients à risque et comprendre sur quels leviers agir. Le travail est mené en binôme avec Roman Delbare, à partir du jeu public Telco Customer Churn (IBM)." },
        { type: "h2", text: "Les données" },
        { type: "p", text: "Le jeu contient 7 043 clients et 21 variables. La variable à expliquer est Churn : 1 si le client est parti, 0 s'il est resté. Seules 11 lignes avaient une valeur manquante, sur les charges totales : elles ont été retirées." },
        { type: "ul", items: [
          "Toutes les variables qualitatives sont recodées en variables binaires, avec une modalité de référence définie pour chacune.",
          "Variables créées : type de contrat (annuel, deux ans), type d'internet (DSL, aucun), facturation électronique, mode de paiement, sécurité en ligne, assistance technique, streaming TV et films, personnes à charge, plusieurs numéros de téléphone."
        ] },
        { type: "h2", text: "Le modèle" },
        { type: "p", text: "Régression logistique (fonction glm, famille binomiale), avec un découpage 70 % apprentissage et 30 % test. Deux spécifications ont été comparées. Le modèle final retire les variables sans effet (sexe, vie en couple, protection de l'appareil, absence de ligne téléphonique). L'ancienneté et le montant total facturé, corrélés à 0,82, restent tous les deux dans le modèle : c'est une limite à garder en tête." },
        { type: "callout", title: "Comment lire un odds ratio", text: "Un odds ratio (OR) supérieur à 1 augmente les chances de départ, un OR inférieur à 1 les réduit : la variation vaut (OR - 1) x 100 pour un OR supérieur à 1, et (1 - OR) x 100 sinon. Pour juger de la significativité, on regarde l'intervalle de confiance à 95 % : on teste que le coefficient vaut 0, ce qui revient à tester que l'OR vaut 1. Si l'intervalle contient 1, l'absence d'effet reste plausible, ce qui équivaut à une p-valeur supérieure à 0,05 : on ne conclut pas à un effet." },
        { type: "h2", text: "Les résultats" },
        { type: "table", caption: "Odds ratios des variables significatives", head: ["Variable", "Odds ratio", "Effet sur les chances de départ"], rows: [
          ["Contrat de deux ans", "0,244", "-75,6 %"],
          ["Pas d'internet", "0,258", "-74,2 %"],
          ["Contrat annuel", "0,532", "-46,8 %"],
          ["Internet DSL", "0,547", "-45,3 %"],
          ["Sécurité en ligne", "0,643", "-35,7 %"],
          ["Assistance technique", "0,663", "-33,7 %"],
          ["Paiement par carte bancaire", "0,629", "-37,1 %"],
          ["Facturation électronique", "1,453", "+45,3 %"],
          ["Streaming TV", "1,369", "+36,9 %"],
          ["Plusieurs numéros de téléphone", "1,235", "+23,5 %"],
          ["Ancienneté (par mois)", "0,948", "-5,2 %"]
        ] },
        { type: "p", text: "Deux variables ne ressortent pas : être senior, et avoir des personnes à charge. Pour cette dernière, l'OR de 0,827 suggère une tendance protectrice (-17,3 %), mais l'intervalle de confiance [0,682 ; 1,000] touche 1. On ne peut donc pas affirmer qu'elle réduit le départ, et elle n'est pas retenue comme levier d'action." },
        { type: "table", caption: "Performance sur l'échantillon test (30 % des clients, jamais vus par le modèle)", head: ["Indicateur", "Seuil de 50 %", "Seuil de 30 %"], rows: [
          ["Accuracy", "80 %", "76 %"],
          ["Rappel (clients partis bien repérés)", "55 %", "78 %"],
          ["Précision", "63 %", "53 %"]
        ] },
        { type: "h3", text: "Pourquoi un seuil à 30 %" },
        { type: "p", text: "Le seuil a été choisi pour maximiser le rappel : mieux vaut rater peu de clients prêts à partir, quitte à en cibler quelques-uns qui seraient restés. Le seuil a été réglé sur l'échantillon d'apprentissage, puis vérifié sur l'échantillon test, où les résultats sont presque identiques : aucun signe de sur-apprentissage. Le prix à payer est une précision de 53 %, soit environ un client sur deux ciblé à tort, ce qui reste acceptable pour une action de fidélisation peu coûteuse." },
        { type: "h2", text: "Le score" },
        { type: "p", text: "Le score est la probabilité de départ P(churn) = 1 / (1 + e^(-z)), où z combine les 17 variables du modèle : une constante de 0,5154, l'ancienneté (-0,0533 par mois), un contrat de deux ans (-1,4121), pas d'internet (-1,3546), la facturation électronique (+0,3738), et ainsi de suite. La formule complète figure dans le rapport." },
        { type: "h2", text: "Recommandations business" },
        { type: "ol", items: [
          "Pousser les contrats longue durée : c'est la variable la plus liée au fait de rester, avec un contrat de deux ans qui divise par environ quatre les chances de départ.",
          "Développer les services additionnels, en particulier la sécurité en ligne et l'assistance technique, associés à des départs moins fréquents.",
          "Renforcer la fidélisation la première année, période la plus fragile : cibler les clients en fibre, avec un contrat mensuel et une facturation électronique."
        ] },
        { type: "h2", text: "Limites" },
        { type: "p", text: "Un odds ratio décrit une association, pas une cause : proposer un contrat plus long à un client ne garantit pas qu'il restera. Avec une précision de 53 %, le score sert à prioriser des actions, pas à décider client par client. Le jeu de données est une photo à un instant donné, sans suivi dans le temps." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Préparation et recodage d'un jeu client, avec choix des modalités de référence", "Régression logistique sous R et sélection de variables", "Lecture d'odds ratios et d'intervalles de confiance", "Choix d'un seuil selon l'objectif métier", "Rapport métier reproductible avec RMarkdown"] }
      ]
    },
    {
      slug: "dataviz-naissances",
      title: "Les naissances en France en quatre graphiques",
      date: "Avril 2026",
      kind: "Projet académique",
      category: "Datavisualisation",
      summary: "D'où vient le nom des enfants, où naissent-ils, et la natalité baisse-t-elle vraiment ? Quatre graphiques construits avec R sur les données de l'INSEE, puis une application Shiny pour explorer chaque département.",
      description: "Quatre visualisations ggplot2 sur les fichiers détail des naissances de l'INSEE (2018-2024) : origine du nom, carte par département avec zoom sur l'Île-de-France, évolution sur sept ans et lien entre l'âge des deux parents.",
      image: "assets/img/projet-dataviz.svg",
      tags: ["R", "ggplot2", "Shiny", "Datavisualisation", "INSEE"],
      externalUrl: "",
      repoUrl: "https://github.com/david-doe/dataviz-naissances-france",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, cours de datavisualisation" },
        { label: "Équipe", value: "Binôme, avec Roman Delbare" },
        { label: "Outils", value: "R (tidyverse, ggplot2, sf, Shiny, bslib), Python pour préparer les données" },
        { label: "Livrables", value: "Script RMarkdown commenté, quatre graphiques et une application Shiny" }
      ],
      highlights: [
        { value: "5,1 M", label: "naissances couvertes, de 2018 à 2024" },
        { value: "80,6 %", label: "des enfants nés en 2021 portent le nom du père seul" },
        { value: "-13 %", label: "de naissances entre 2018 et 2024" },
        { value: "2,7 ans", label: "d'écart d'âge moyen entre le père et la mère" }
      ],
      body: [
        { type: "h2", text: "L'idée" },
        { type: "p", text: "L'INSEE publie chaque année un fichier avec une ligne par naissance : âge des parents, département, sexe de l'enfant, origine de son nom de famille… L'objectif du cours était de raconter ces données en quelques graphiques clairs, puis d'expliquer nos choix et ce que l'IA nous a proposé, en gardant ce qui améliorait la lecture et en refusant le reste." },
        { type: "h2", text: "Les quatre graphiques" },
        { type: "table", caption: "Les quatre graphiques", head: ["Question", "Graphique", "Ce qu'on voit"], rows: [
          ["D'où vient le nom des enfants nés en 2021 ?", "Barres, une facette par sexe", "80,6 % portent le nom du père seul. Le double nom « père puis mère » (10,1 %) passe devant le nom de la mère seul (6,3 %). Aucune différence entre filles et garçons."],
          ["Où naissent les enfants ?", "Carte des départements, zoom sur l'Île-de-France", "De 430 naissances en Lozère à 41 880 à Paris."],
          ["Où se situe 2021 dans la tendance ?", "Courbe 2018-2024", "Une baisse presque continue, de 758 590 naissances en 2018 à 660 787 en 2024, avec un léger rebond en 2021."],
          ["L'âge du père suit-il celui de la mère ?", "Nuage de 10 000 naissances, droite de régression et diagonale", "Oui, nettement. Les pères ont en moyenne 33,9 ans, les mères 31,2 ans."]
        ] },
        { type: "h2", text: "Nos choix" },
        { type: "ul", items: [
          "Une seule palette, inspirée des publications de l'INSEE, pour que les quatre graphiques se lisent comme un ensemble.",
          "Sur la carte, la Lozère et Paris sont mis en valeur, et l'Île-de-France a son propre zoom : sinon ses huit départements sont illisibles.",
          "Pour le nuage de points, un échantillon de 10 000 naissances tiré avec une graine fixe : avec 740 000 points, on ne voit plus rien.",
          "La diagonale « âge du père = âge de la mère » aide à voir que la droite de régression est au-dessus : les pères sont un peu plus âgés."
        ] },
        { type: "h2", text: "Les suggestions de l'IA" },
        { type: "p", text: "Nous avons demandé à l'IA de critiquer chaque graphique. Nous avons gardé les valeurs au-dessus des barres, l'allègement de la grille, les étiquettes qui ne se chevauchent pas et la diagonale du nuage de points. Nous avons refusé d'inverser les axes des barres, qui rendait les facettes plus difficiles à lire, et de supprimer l'axe vertical de la courbe : sans échelle, un graphique peut tromper." },
        { type: "h2", text: "L'application Shiny" },
        { type: "p", text: "Chaque graphique montre une seule année et un seul angle. L'application permet d'explorer les données, en quatre onglets : une carte animée de 2018 à 2024, le portrait d'un département comparé à la France, les naissances mois par mois et l'âge des mères." },
        { type: "img", src: "assets/img/dataviz-shiny-departement.png", alt: "Onglet « Mon département » de l'application Shiny, avec le Nord comparé à la France", caption: "Le Nord perd 15,4 % de naissances entre 2018 et 2024, contre 12,8 % pour la France, et ses mères sont plus jeunes que la moyenne." },
        { type: "ul", items: [
          "Les naissances sont rattachées au département où vit la mère, et non à celui de la maternité : sinon, la fermeture d'une maternité déplace des naissances d'un département à l'autre.",
          "La carte montre l'évolution depuis 2018 plutôt qu'un effectif : entre 2018 et 2024, les naissances baissent partout en métropole, de 6 % en Mayenne à 21 % à Paris.",
          "L'onglet des saisons fait apparaître le creux de janvier et février 2021, neuf mois après le premier confinement.",
          "Un script Python agrège une fois les 5 millions de lignes en tables de quelques centaines de Ko : l'application démarre en quelques secondes."
        ] },
        { type: "img", src: "assets/img/dataviz-shiny-saisons.png", alt: "Onglet « Les saisons » : naissances par jour, mois par mois, en 2019, 2021 et 2024", caption: "Naissances par jour : le creux de janvier 2021 et la baisse générale de 2024." },
        { type: "h2", text: "Limites" },
        { type: "p", text: "La carte montre un nombre de naissances et non un taux : Paris arrive en tête surtout parce que c'est le département le plus peuplé. Les départements d'outre-mer (5,4 % des naissances de 2021) ne sont pas sur la carte. Enfin, nos nuances de bleu peuvent être difficiles à distinguer pour une personne daltonienne." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Préparation de gros fichiers (plus de 700 000 lignes par an) avec dplyr", "Choix du bon graphique pour chaque question", "Cartographie avec sf", "Regard critique sur ses propres graphiques et sur les suggestions de l'IA", "Application Shiny légère, avec des données agrégées à l'avance"] }
      ]
    },
    {
      slug: "mediatheques-covid",
      title: "Impact du Covid sur les médiathèques de Lille",
      date: "Sept. - Oct. 2025",
      kind: "Projet académique",
      category: "Séries temporelles",
      summary: "Combien d'opérations le Covid a-t-il fait perdre aux médiathèques de Lille, et quand le niveau de 2019 revient-il ?",
      description: "Mesure de l'effet du Covid-19 sur les prêts et retours des médiathèques de Lille-Lomme-Hellemmes (2019-2023), avec des modèles de séries temporelles et une prévision journalière pour 2023.",
      image: "assets/img/projet-mediatheques.svg",
      tags: ["SAS", "Excel", "Séries temporelles"],
      externalUrl: "",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, semestre 1 (2025-2026)" },
        { label: "Équipe", value: "Binôme, avec Ndeye Bineta Guirane" },
        { label: "Outils", value: "SAS, Excel" },
        { label: "Livrables", value: "Rapport d'étude de cas et diaporama de restitution" }
      ],
      highlights: [
        { value: "17 233", label: "observations horaires nettoyées" },
        { value: "1 493", label: "jours analysés (8h-19h)" },
        { value: "-3 238", label: "opérations par jour : impact estimé du Covid" },
        { value: "2023", label: "année où la prévision retrouve le niveau de 2019" }
      ],
      body: [
        { type: "h2", text: "Contexte et question" },
        { type: "p", text: "Le service des médiathèques de Lille-Lomme-Hellemmes voulait comprendre comment le Covid-19 avait touché ses prêts et ses retours, combien de temps il faudrait pour retrouver le niveau de 2019, et à quoi s'attendre jour par jour pour l'année à venir. Les résultats doivent servir à organiser l'offre et à planifier les équipes." },
        { type: "h2", text: "Les données" },
        { type: "p", text: "Le fichier de départ contenait 17 233 observations horaires, du 1er janvier 2019 au 31 janvier 2023. Après agrégation par jour et filtrage des heures d'ouverture (8h-19h), il restait 1 493 jours. Sur la période, on compte en moyenne environ 1 590 prêts et 1 965 retours par jour. À l'échelle de l'heure, l'activité est très inégale : 138 prêts en moyenne par créneau, mais une médiane de 19 seulement. La plupart des créneaux sont calmes, quelques heures de pointe tirent la moyenne vers le haut." },
        { type: "h3", text: "Trois décisions de préparation" },
        { type: "ul", items: [
          "Les jours de fermeture (dimanches, jours fériés, confinements) sont codés à 0 : c'est une vraie absence d'activité, pas une donnée manquante.",
          "Les pics extrêmes sont conservés après vérification. Le 29 octobre 2020, veille du second confinement, on compte 9 049 prêts dans la journée, dont 2 167 entre 17 h et 18 h. Le 12 janvier 2021, 2 915 retours arrivent entre 9 h et 10 h. Sur une journée entière, le record de retours est le 19 mai 2021, avec 7 387 retours.",
          "Seules les heures d'ouverture réelles sont gardées, pour ne pas fausser les moyennes."
        ] },
        { type: "h2", text: "La méthode" },
        { type: "p", text: "J'ai comparé un modèle additif et un modèle multiplicatif sous SAS, avec comme variables explicatives le jour de la semaine, le mois, la tendance et un régime « Covid » (période normale contre période de rupture). Les résidus ont été contrôlés (normalité, autocorrélation) et les écarts-types corrigés de l'hétéroscédasticité par la correction de White." },
        { type: "chart", title: "Évolution mensuelle des prêts et des retours", caption: "Sommes mensuelles des prêts et des retours, de janvier 2019 à janvier 2023.",
          labels: ["2019-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11", "2019-12", "2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07", "2020-08", "2020-09", "2020-10", "2020-11", "2020-12", "2021-01", "2021-02", "2021-03", "2021-04", "2021-05", "2021-06", "2021-07", "2021-08", "2021-09", "2021-10", "2021-11", "2021-12", "2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06", "2022-07", "2022-08", "2022-09", "2022-10", "2022-11", "2022-12", "2023-01"],
          series: [
            { name: "Prêts", color: "#9fb4ff", values: [68000, 63500, 72500, 61500, 62000, 54000, 45000, 46000, 59000, 65500, 65000, 53500, 67000, 69500, 30000, 500, 9000, 17500, 32000, 27500, 1000, 55500, 17000, 41000, 51000, 49500, 56000, 57500, 46500, 47500, 38000, 34000, 47000, 56000, 52000, 49500, 54000, 52500, 60000, 55000, 50000, 51500, 40500, 45500, 54000, 60500, 59500, 50500, 61500] },
            { name: "Retours", color: "#e0708a", values: [88000, 79500, 92500, 82000, 81000, 75500, 70500, 57500, 65000, 80500, 82000, 75000, 84500, 83500, 38000, 0, 5500, 25000, 40000, 27000, 0, 51500, 29500, 50500, 61500, 62500, 67000, 70500, 69000, 61500, 54500, 41500, 50500, 62000, 61500, 62500, 62500, 60500, 71000, 66500, 61000, 65500, 58500, 52000, 58000, 70000, 70500, 62000, 68500] }
          ] },
        { type: "h2", text: "Les résultats" },
        { type: "table", caption: "Effet du régime Covid dans les modèles additifs, par jour de fonctionnement", head: ["Indicateur", "Effet estimé"], rows: [
          ["Prêts", "-1 384 par jour"],
          ["Retours", "-1 854 par jour"],
          ["Activité globale (prêts + retours)", "-3 238 par jour"]
        ] },
        { type: "ul", items: [
          "Niveau moyen de 2019 : environ 4 522 opérations par jour. En 2022 : environ 3 825.",
          "La prévision 2023 a été testée sur janvier 2023, un mois laissé de côté pendant l'estimation : elle suit bien les pics du mercredi et du samedi.",
          "Pour 2023, le modèle prévoit environ 5 305 opérations par jour, au-dessus de 2019 : le niveau d'avant-crise est donc retrouvé dès le premier semestre."
        ] },
        { type: "callout", title: "À retenir", text: "Le Covid a coûté plus de 3 200 opérations par jour pendant les périodes de fortes restrictions, et, selon la prévision, le réseau retrouve son niveau d'avant-crise en 2023." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Préparation et documentation de données horaires (Excel)", "Séries temporelles et diagnostics de modèle (SAS)", "Prévision avec validation hors échantillon", "Rapport analytique et restitution orale avec recommandations"] }
      ]
    },
    {
      slug: "etude-cofitypotel",
      title: "Étude Cofitypotel : profils de conseillers et score de bon vendeur",
      date: "Janv. - Fév. 2026",
      kind: "Projet académique",
      category: "Scoring",
      summary: "Quatre profils de conseillers téléphoniques, puis un modèle de score pour repérer les bons vendeurs et savoir quel profil vend le mieux.",
      description: "Étude en deux temps pour une plateforme de crédit : une typologie des conseillers à partir de leurs seules données téléphoniques (ACP, classification, analyse discriminante), puis un modèle de score par régression logistique (AUC de 0,82) croisé avec les profils. Analyse refaite en Python et tableau de bord Power BI.",
      image: "assets/img/projet-cofitypotel.svg",
      tags: ["Python", "sklearn", "R", "Power BI", "ACP", "Clustering", "Logit"],
      externalUrl: "",
      repoUrl: "https://github.com/david-doe/cofitypotel_",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, semestre 2 (2025-2026), encadré par un tuteur" },
        { label: "Équipe", value: "Binôme, avec Thibault Perz" },
        { label: "Outils", value: "R (étude d'origine), Python (pandas, scikit-learn), Power BI" },
        { label: "Livrables", value: "Deux rapports d'analyse, notebook Python reproductible, tableau de bord Power BI" }
      ],
      highlights: [
        { value: "907", label: "observations trimestrielles, 251 conseillers, 8 trimestres" },
        { value: "92 %", label: "de conseillers bien classés par l'analyse discriminante (validation croisée)" },
        { value: "AUC 0,82", label: "pour le score de bon vendeur, sur l'échantillon test" },
        { value: "17 % / 70 %", label: "de bons vendeurs chez les spécialistes sortants / les actifs qualitatifs" }
      ],
      body: [
        { type: "h2", text: "Contexte" },
        { type: "p", text: "Cofitypotel est une société de crédit à la consommation dont les conseillers téléphoniques vendent du crédit revolving, de l'assurance et des crédits amortissables. Tous ont les mêmes objectifs, mais chacun organise son activité comme il l'entend : volume d'appels, relances, temps passé avec chaque client. La direction voulait d'abord cartographier ces pratiques, puis savoir lesquelles vont avec de bons résultats sur les augmentations de réserves de crédit (la hausse du plafond d'un crédit revolving déjà souscrit)." },
        { type: "callout", title: "Deux études", text: "Partie 1 : décrire les comportements sans regarder les ventes. Partie 2 : modéliser la performance commerciale, puis confronter les deux analyses, menées de façon indépendante." },
        { type: "h2", text: "Partie 1 : la typologie des conseillers" },
        { type: "h3", text: "Préparer des données comparables" },
        { type: "p", text: "À partir de 2 502 observations mensuelles, j'ai construit 907 observations trimestrielles (251 conseillers, 8 trimestres sur 2003-2004), le trimestre étant la fenêtre où les décalages entre un appel et une vente se compensent. Les indicateurs sont ramenés à 7 heures de présence par jour pour comparer équitablement temps plein et temps partiels, et les valeurs extrêmes sont plafonnées par winsorisation (1er et 99e percentiles) plutôt que supprimées." },
        { type: "p", text: "Treize indicateurs en découlent : volumes d'appels, temps de conversation, durée moyenne d'un entretien, appels pris par heure, taux de décroché, part du temps disponible passée en conversation, part des appels sortants." },
        { type: "h3", text: "Résumer, puis regrouper" },
        { type: "p", text: "Une ACP condense les treize indicateurs en quatre axes (35 %, 22 %, 19 % et 10 % de la variance) : intensité de l'activité entrante, orientation vers les appels sortants, durée des entretiens, utilisation du temps disponible. Une double classification (CAH selon le critère de Ward, puis K-means) donne quatre profils. L'analyse discriminante linéaire les retrouve bien : 92 % de conseillers bien classés en validation croisée Leave-One-Out." },
        { type: "table", caption: "Les quatre profils comportementaux", head: ["Profil", "Effectif", "Part de HML", "Ce qui le distingue"], rows: [
          ["Actifs standard", "467", "70 %", "Proches de la moyenne, un peu en retrait sur les volumes ; les études de crédit en ligne prennent une partie du temps des HML"],
          ["Actifs qualitatifs", "288", "21 %", "Beaucoup d'appels entrants, entretiens un peu plus longs, très peu de relances"],
          ["Spécialistes sortants", "139", "45 %", "Grande part de relances, conversation entrante très faible"],
          ["Relanceurs intensifs", "13", "23 %", "Activité très forte sur les appels entrants et sortants à la fois"]
        ] },
        { type: "p", text: "Un premier constat : les écarts entre conseillers habilités au montage en ligne (HML) et non habilités (NHML) portent sur les volumes, pas sur l'efficacité. À temps disponible égal, tout le monde traite le même nombre d'appels par heure. En revanche, les profils bougent : d'un trimestre au suivant, la moitié des conseillers change de groupe. Il faut donc suivre l'évolution d'un conseiller plutôt que l'étiqueter une fois pour toutes." },
        { type: "h2", text: "Partie 2 : le score de bon vendeur" },
        { type: "h3", text: "Définir la cible" },
        { type: "p", text: "Un conseiller est « bon vendeur » s'il réalise plus d'augmentations acceptées par jour de présence que la médiane de ses collègues. Cette définition relative n'est pas sensible aux variations saisonnières et donne deux classes de même taille." },
        { type: "h3", text: "Choisir les variables" },
        { type: "ul", items: [
          "Tests de Mann-Whitney et V de Cramér (intervalles de confiance par bootstrap) : les volumes d'appels entrants ont les liens les plus forts avec la cible, la part des appels sortants un lien négatif.",
          "Matrice de Spearman et VIF : les variables de volume sont presque redondantes. Un représentant par bloc est retenu ; dans le modèle final, tous les VIF restent sous 2.",
          "Découpage 80 / 20 entre apprentissage et test, standardisation calculée sur l'apprentissage seul.",
          "Ordre d'entrée des variables fixé à l'avance plutôt qu'un stepwise automatique, puis choix du modèle sur l'AUC, le BIC et un test du rapport de vraisemblance : le modèle à quatre variables est retenu."
        ] },
        { type: "h3", text: "Le modèle final" },
        { type: "table", caption: "Odds ratios pour une hausse d'un écart-type de la variable", head: ["Variable", "Odds ratio", "Lecture"], rows: [
          ["Part du temps disponible en conversation", "2,45", "Plus de temps en conversation, plus de chances d'être bon vendeur"],
          ["Appels pris par jour", "2,16", "Plus d'appels traités, plus d'occasions de vendre"],
          ["Appels pris par heure", "1,62", "Fluidité de l'enchaînement des appels"],
          ["Part des appels sortants dans la conversation", "0,71", "Seule variable défavorable : environ 30 % de chances en moins"]
        ] },
        { type: "ul", items: [
          "AUC de 0,818 sur l'échantillon test et 0,812 sur l'apprentissage : aucun signe de sur-ajustement. R² de McFadden de 0,24, bonne calibration (test de Hosmer-Lemeshow).",
          "Au seuil de Youden, le modèle repère 87 bons vendeurs sur 100 et reconnaît 67 autres conseillers sur 100.",
          "Dans les deux déciles de scores les plus élevés, 86 % des conseillers sont réellement de bons vendeurs, soit 1,8 fois plus qu'au hasard."
        ] },
        { type: "h2", text: "Croiser les deux analyses" },
        { type: "p", text: "Les profils ont été construits sans aucune donnée de vente, et le modèle de score ne connaît pas les profils : le fait qu'elles aboutissent au même classement renforce donc chacune des deux." },
        { type: "table", caption: "Performance commerciale par profil", head: ["Profil", "Bons vendeurs", "Score moyen", "Rang"], rows: [
          ["Actifs qualitatifs", "70 %", "0,69", "1er"],
          ["Actifs standard", "47 %", "0,47", "2e"],
          ["Spécialistes sortants", "17 %", "0,17", "3e"],
          ["Relanceurs intensifs", "69 %", "0,90", "trop peu nombreux pour conclure (13)"]
        ] },
        { type: "ul", items: [
          "Les spécialistes sortants sont les moins performants dans les deux analyses : leur trait principal, la part de relances, est justement la seule variable défavorable du modèle.",
          "Les actifs qualitatifs vendent le mieux : beaucoup d'appels entrants et très peu de relances, exactement ce que le score valorise.",
          "Pour les augmentations de réserves, la vente se fait surtout quand le client appelle lui-même, avec un besoin."
        ] },
        { type: "callout", title: "Ce que la version Python a corrigé", text: "En refaisant l'étude en Python, j'ai trouvé deux problèmes dans la version d'origine : le temps de retrait était tronqué à 24 heures pour un quart des lignes, et le tableau de croisement du second rapport ne reposait pas sur la même partition que la typologie. Une fois corrigé, le classement change : ce sont les actifs qualitatifs, et non les relanceurs, qui vendent le mieux. Le notebook documente chaque écart." },
        { type: "h2", text: "Le tableau de bord" },
        { type: "p", text: "Les résultats sont exportés en tables propres (codes des conseillers anonymisés) et repris dans un tableau de bord Power BI de trois pages : les profils, le score de bon vendeur par groupe, et le suivi trimestriel avec les passages d'un groupe à l'autre." },
        { type: "img", src: "assets/img/cofitypotel-pbi-profils.png", alt: "Page Profils du tableau de bord Power BI Cofitypotel", caption: "Page 1 du tableau de bord : les profils de conseillers." },
        { type: "img", src: "assets/img/cofitypotel-pbi-score.png", alt: "Page Score de bon vendeur du tableau de bord Power BI Cofitypotel", caption: "Page 2 : le score moyen par groupe et les odds ratios du modèle." },
        { type: "img", src: "assets/img/cofitypotel-pbi-suivi.png", alt: "Page Suivi trimestriel du tableau de bord Power BI Cofitypotel", caption: "Page 3 : les bons vendeurs trimestre par trimestre et les passages d'un groupe à l'autre." },
        { type: "h2", text: "Recommandations" },
        { type: "ul", items: [
          "Orienter en priorité la formation vers les spécialistes sortants, pour leur apprendre à convertir sur les appels entrants.",
          "Ajouter le profil de chaque conseiller au tableau de bord trimestriel et regarder son évolution d'un trimestre à l'autre.",
          "Utiliser le modèle d'affectation pour placer un nouveau conseiller dans un groupe après un trimestre de données.",
          "Pour les HML du groupe « actifs standard », regarder la charge d'études de crédit avant d'y voir un manque d'engagement."
        ] },
        { type: "h2", text: "Limites" },
        { type: "p", text: "Huit trimestres et 251 conseillers, c'est court pour conclure de façon définitive. Le choix de quatre groupes est défendable sans être le seul possible : la qualité de la classification est presque la même avec deux ou trois groupes. Les profils sont peu stables dans le temps. Enfin, le score ne vaut que pour ce produit, et un lien statistique ne prouve pas qu'imiter un groupe ferait vendre plus." }
      ]
    },
    {
      slug: "reussite-licence-sociologie",
      title: "Réussir sa première année de licence de sociologie",
      date: "Semestre 1, 2025-2026",
      kind: "Projet académique",
      category: "Économétrie",
      summary: "Quels profils d'étudiants réussissent leur premier semestre en sociologie, et peut-on estimer ses chances à l'entrée ?",
      description: "Estimation de la moyenne et de la probabilité de valider le premier semestre pour les futurs inscrits en licence de sociologie, par régression linéaire et modèle logit, avec une analyse des abandons.",
      image: "assets/img/projet-sociologie.svg",
      tags: ["SAS", "Régression linéaire", "Logit", "Excel"],
      externalUrl: "",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, semestre 1 (2025-2026), encadré par un tuteur" },
        { label: "Équipe", value: "Binôme, avec Ndeye Bineta Guirane" },
        { label: "Outils", value: "SAS, Excel" },
        { label: "Livrable", value: "Rapport d'étude de cas" }
      ],
      highlights: [
        { value: "265", label: "étudiants de SHS analysés (sur 535)" },
        { value: "R² 0,32", label: "pour la régression linéaire de la moyenne" },
        { value: "+4 pts", label: "de moyenne pour une mention Bien au bac" },
        { value: "76 %", label: "de chances de réussite pour le profil de référence" }
      ],
      body: [
        { type: "h2", text: "Contexte et question" },
        { type: "p", text: "L'Institut de sociologie et d'anthropologie de Lille 1 voulait mieux informer et accompagner ses futurs inscrits. La question : quelles caractéristiques personnelles, scolaires et sociales vont avec la réussite en première année, peut-on estimer la note ou la probabilité d'avoir la moyenne, et les étudiants qui abandonnent ont-ils un profil particulier ?" },
        { type: "h2", text: "Les données" },
        { type: "p", text: "Le fichier couvre la promotion 2004-2005 : 535 étudiants et 122 variables, dont 265 étudiants du parcours SHS retenus pour l'analyse (251 présents aux épreuves, 14 absents considérés comme « abandons »). La variable à expliquer est la moyenne du premier semestre sur 20 : 9,04 en moyenne, 10,13 de médiane, avec des écarts très marqués (de 0 à 15,3)." },
        { type: "h3", text: "Préparation" },
        { type: "ul", items: [
          "Suppression des variables non décrites, vides ou redondantes, ainsi que de deux lignes de valeurs minimales et maximales glissées dans le fichier.",
          "Variables qualitatives transformées en variables muettes, avec comme référence les modalités les plus fréquentes.",
          "Variables retenues : sexe, âge, mention au bac, résidence en ZUS, situation et profession du chef de famille, bourse, bassin universitaire. La série du bac, sans lien significatif avec la moyenne, est écartée."
        ] },
        { type: "h2", text: "Ce que montrent les statistiques descriptives" },
        { type: "ul", items: [
          "La mention au bac est le facteur le plus lié à la réussite (corrélation de 0,39) : 83 % des étudiants ont une mention passable, et ils sont moins de la moitié à valider leur semestre, contre plus de 80 % pour les mentions Assez bien et Bien.",
          "La réussite baisse avec l'âge (corrélation de -0,29) : 87 % de validation à 17 ans, 35 % à 20 ans.",
          "Le contexte social pèse : les boursiers valident moins souvent que les non-boursiers (44 % contre 61 %), de même que les étudiants résidant en ZUS (43 % contre 55 %)."
        ] },
        { type: "h2", text: "Deux modèles" },
        { type: "p", text: "La régression linéaire explique environ 32 % de la variabilité de la moyenne (R² ajusté de 0,19). Après sélection stepwise, une mention Assez bien ajoute environ 2,6 points, une mention Bien environ 4 points, alors qu'un chef de famille inactif retire environ 3,3 points. Les résidus sont proches d'une loi normale et l'hétéroscédasticité, testée par le test de Glejser, reste faible." },
        { type: "p", text: "Le modèle logit, qui estime la probabilité d'obtenir au moins 10 de moyenne, retient l'âge de 19 ans (défavorable), la mention Assez bien (favorable), un chef de famille à la retraite et le bassin de Valenciennes (défavorables). Pour le profil de référence, la probabilité de réussite est d'environ 76 %." },
        { type: "h2", text: "Et les abandons ?" },
        { type: "p", text: "J'ai calculé un score prédit pour chacun des 14 étudiants qui ont abandonné et je l'ai comparé à celui des autres : 8,43 en moyenne contre 8,82. Leur profil de départ est donc un peu moins favorable, mais un cas se détache avec un score de 11,2 : un abandon que les variables du fichier n'expliquent pas." },
        { type: "callout", title: "À retenir", text: "Le parcours scolaire antérieur, d'abord la mention au bac, pèse plus que tout le reste. Les modèles restent des aides à l'orientation : ils laissent plus des deux tiers de la variabilité inexpliquée." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Nettoyage et recodage d'un fichier large (122 variables)", "Régression linéaire et logit sous SAS, avec diagnostics de résidus", "Interprétation chiffrée pour un public non spécialiste", "Analyse d'un phénomène rare (14 abandons)"] }
      ]
    },
    {
      slug: "panel-suisse-statut-residentiel",
      title: "Propriétaire ou locataire : le cas du panel suisse",
      date: "Nov. - Déc. 2025",
      kind: "Projet académique",
      category: "Économétrie",
      summary: "Qu'est-ce qui pousse à devenir propriétaire en Suisse : le salaire, la vie de couple, le lieu de vie ?",
      description: "Analyse économétrique du statut résidentiel de plus de 7 000 personnes du Panel Suisse des Ménages (2014), avec un modèle de probabilité linéaire et un modèle Logit comparés.",
      image: "assets/img/projet-panel.svg",
      tags: ["SAS", "Excel", "MPL", "Logit"],
      externalUrl: "",
      featured: true,
      facts: [
        { label: "Cadre", value: "Master SIAD, cours d'économétrie" },
        { label: "Équipe", value: "Groupe de trois" },
        { label: "Outils", value: "SAS, Excel" },
        { label: "Livrables", value: "Rapport écrit, base de données nettoyée et script SAS" }
      ],
      highlights: [
        { value: "7 244", label: "personnes de 18 à 60 ans après nettoyage (sur 10 129)" },
        { value: "× 2,9", label: "de chances d'être propriétaire en zone rurale" },
        { value: "× 2,3", label: "de chances pour les personnes mariées" },
        { value: "73,2 %", label: "de paires concordantes pour le modèle Logit" }
      ],
      body: [
        { type: "h2", text: "Problématique" },
        { type: "p", text: "Être propriétaire est souvent vu comme le signe d'une situation stable, alors que la location peut traduire de la mobilité ou des contraintes budgétaires. La question posée : quels déterminants expliquent le choix du statut résidentiel en Suisse, propriétaire ou locataire ? L'étude s'appuie sur un extrait du Panel Suisse des Ménages de 2014, pour des individus de 18 à 60 ans." },
        { type: "h2", text: "Ce que dit la littérature" },
        { type: "p", text: "La revue de littérature a guidé le choix des variables. Le logement est à la fois un bien de consommation et un patrimoine. La théorie du cycle de vie (Modigliani) rattache l'accès à la propriété à l'âge et à la vie de famille, l'hypothèse du revenu permanent (Friedman) relativise le revenu du moment, et plusieurs travaux soulignent le poids du contexte institutionnel, de la géographie et du sentiment de sécurité financière." },
        { type: "h2", text: "Les données" },
        { type: "p", text: "La base de départ comptait 10 129 individus et 117 variables. Le nettoyage a été fait sous SAS, chaque décision étant justifiée dans le script." },
        { type: "ul", items: [
          "Variable à expliquer PROPRIO : 1 pour un propriétaire, 0 pour un locataire. Les occupants à titre gratuit sont rangés avec les locataires, puisqu'ils ne supportent pas l'investissement de l'achat.",
          "Revenu : converti en milliers de francs suisses, le code « sans revenu » est ramené à 0 (information économique réelle), les autres codes négatifs sont traités comme des non-réponses.",
          "Douze variables explicatives créées à partir des variables d'origine : revenu, satisfaction financière, emploi, âge, mariage, enfants, sexe, niveau de formation, né en Suisse, durée de résidence, zone rurale et région.",
          "Après suppression des valeurs manquantes, il reste 7 244 individus."
        ] },
        { type: "h2", text: "Premières observations" },
        { type: "p", text: "Huit des douze variables ont un lien significatif avec le fait d'être propriétaire. Le plus fort est le mariage (corrélation de 0,27), loin devant le revenu (0,06) : l'accession ressemble davantage à une décision de ménage qui met ses ressources en commun qu'à une question de salaire individuel. L'âge et la durée de résidence sont très corrélés entre eux (0,73) : seul l'âge est gardé dans les modèles, ce qui évite la redondance et correspond à la théorie du cycle de vie." },
        { type: "h2", text: "MPL contre Logit" },
        { type: "p", text: "J'ai estimé un modèle de probabilité linéaire, facile à lire en points de pourcentage, puis un Logit, qui garantit des probabilités entre 0 et 1. Les signes et la significativité sont très stables d'un modèle à l'autre. Le Logit atteint 73,2 % de paires concordantes (pour deux personnes prises au hasard, l'une propriétaire et l'autre locataire, le modèle donne la plus forte probabilité au propriétaire dans 73 % des cas), avec un R² de McFadden de 0,21 (R² ajusté de 0,15 pour le MPL)." },
        { type: "table", caption: "Effet de chaque variable sur la probabilité d'être propriétaire", head: ["Variable", "MPL (points de probabilité)", "Logit (odds ratio)"], rows: [
          ["Zone rurale", "+21,7", "2,90"],
          ["Marié", "+18,6", "2,29"],
          ["Né en Suisse", "+18,1", "2,30"],
          ["Enfants dans le ménage", "+6,5", "1,37"],
          ["Satisfaction financière (par point)", "+3,1", "1,16"],
          ["Âge (par année)", "+0,4", "1,017"],
          ["Actif occupé", "-6,7", "0,73"],
          ["Niveau de formation (par palier)", "-0,2", "0,99"],
          ["Revenu annuel net", "non significatif", "non significatif"],
          ["Sexe", "non significatif", "non significatif"]
        ] },
        { type: "h2", text: "Ce qu'on en tire" },
        { type: "ul", items: [
          "Les facteurs structurels dominent : vivre en zone rurale multiplie par près de 3 les chances d'être propriétaire, être marié par 2,3. Les prix et l'offre ne sont pas les mêmes entre centres urbains et périphéries.",
          "Le revenu annuel net n'a pas d'effet significatif, alors que chaque point de satisfaction financière augmente les chances de 16 %. Ce qui compte semble être la capacité à gérer son budget et à épargner, plus que le niveau du salaire.",
          "Naître en Suisse multiplie les chances par 2,3, ce qui évoque les transmissions de patrimoine (dons, héritages) moins accessibles aux personnes venues de l'étranger.",
          "Les effets du diplôme et de l'emploi sont faibles, voire négatifs : être propriétaire marque davantage un moment du cycle de vie et un patrimoine qu'une réussite professionnelle immédiate.",
          "Les régions 1, 4 et 6 ont 40 à 45 % de chances en moins que la région 7, signe d'un marché immobilier très hétérogène."
        ] },
        { type: "callout", title: "À retenir", text: "En Suisse, le statut de propriétaire tient plus à la vie de couple, au lieu de vie et à l'ancrage local qu'au revenu du moment." },
        { type: "h2", text: "Limites" },
        { type: "p", text: "Les données sont une photo de 2014 : on lit des associations, pas des relations de cause à effet. Le revenu mesure un flux annuel, pas le patrimoine accumulé, et une variable sur les héritages récents a été écartée pour cette raison. Des données de panel sur plusieurs années permettraient de suivre le passage de locataire à propriétaire." },
        { type: "h2", text: "Compétences mobilisées" },
        { type: "ul", items: ["Revue de littérature et formulation d'hypothèses", "Nettoyage documenté d'une grande base d'enquête (SAS)", "Modèles pour variable binaire : MPL et Logit, lecture en points de probabilité et en odds ratios", "Rédaction d'un rapport structuré pour des lecteurs non spécialistes"] }
      ]
    }
  ],

  skillCategories: ["Langages & stats", "Bases de données", "BI & dataviz", "Qualité & outils"],

  skills: [
    { name: "Python", category: "Langages & stats", icon: "python", description: "Pandas, scikit-learn et statsmodels pour nettoyer, modéliser et automatiser des analyses.", match: ["Python", "sklearn"] },
    { name: "SQL", category: "Bases de données", icon: "database", description: "Requêtes et préparation de données, notamment sous Oracle.", match: ["SQL"] },
    { name: "SAS", category: "Langages & stats", icon: "chart", description: "Séries temporelles, régressions, scoring et rapports statistiques.", match: ["SAS"] },
    { name: "R", category: "Langages & stats", icon: "r", description: "Statistiques et visualisation avec ggplot, sous RStudio.", match: ["RStudio", "R", "RMarkdown"] },
    { name: "Statistiques & ML", category: "Langages & stats", icon: "chart", description: "Séries temporelles, ACP, clustering, scoring et modélisation économétrique.", match: ["ACP", "Clustering", "Régression linéaire", "Logit", "MPL", "Régression logistique", "Odds ratios"] },
    { name: "Power BI", category: "BI & dataviz", icon: "powerbi", description: "Tableaux de bord avec DAX et Power Query, suivi de KPIs et restitution aux équipes métiers.", match: ["Power BI"] },
    { name: "Excel avancé", category: "BI & dataviz", icon: "table", description: "VBA, tableaux croisés dynamiques et macros pour automatiser des reportings.", match: ["Excel"] },
    { name: "Shiny & Streamlit", category: "BI & dataviz", icon: "code", description: "Applications web légères pour explorer des résultats d'analyse.", match: ["Shiny", "Streamlit"] },
    { name: "Data quality", category: "Qualité & outils", icon: "check", description: "Contrôles de cohérence, détection d'anomalies et documentation des règles de gestion.", match: [] },
    { name: "Git & GitHub", category: "Qualité & outils", icon: "git", description: "Versionner son code et travailler à plusieurs sur un même projet.", match: [] }
  ],

  softSkills: [
    { label: "Rigueur", icon: "rigueur" },
    { label: "Autonomie", icon: "autonomie" },
    { label: "Curiosité", icon: "curiosite" },
    { label: "Esprit d'analyse", icon: "analyse" },
    { label: "Organisation", icon: "organisation" },
    { label: "Force de proposition", icon: "creativite" },
    { label: "Pédagogie", icon: "pedagogie" },
    { label: "Adaptabilité", icon: "adaptabilite" },
    { label: "Esprit d'équipe", icon: "equipe" }
  ],

  experience: [
    {
      period: "Janvier 2025 - Présent", kind: "Contrat étudiant", title: "Employé polyvalent",
      description: "Coordination d'équipe et service client dans un environnement à forte cadence, menés en parallèle des études.",
      logo: "assets/img/logo-dominos.svg", theme: "light",
      links: [{ label: "Domino's Pizza", url: "https://www.dominos.fr" }, { label: "Lille", url: "" }]
    },
    {
      period: "Avril 2025 - Juin 2025", kind: "Stage", title: "Stagiaire gestion",
      description: "Stage de fin de licence dans un magasin NOZ (déstockage), au sein d'une équipe de 9 personnes.",
      bullets: [
        "Réception des 3 livraisons hebdomadaires et mise en rayon, avec une organisation des linéaires qui change selon les arrivages",
        "Participation au suivi des indicateurs : taux de vente en 1re semaine et en fin de vie, démarque, classement hebdomadaire parmi 350 magasins",
        "Ce que j'en ai retenu : les indicateurs étaient stockés en un rapport par semaine, à ouvrir un par un et à imprimer si besoin ; impossible de comparer les semaines ou de voir les tendances d'un coup d'œil, ce qui ralentissait les décisions (remises, retours des invendus)",
        "Ce constat a inspiré mon projet NOZ : une chaîne SQL, Python et Power BI qui automatise ce suivi sur un magasin simulé (voir la section Projets)"
      ],
      logo: "assets/img/logo-noz.svg", theme: "dark",
      links: [{ label: "NOZ", url: "https://www.noz.fr" }, { label: "Saint-Pol-sur-Mer", url: "" }]
    }
  ],

  education: [
    {
      period: "2025 - 2027", kind: "Diplôme", title: "Master SIAD",
      description: "Statistiques, modélisation économétrique, machine learning, SQL, ETL, datavisualisation, gouvernance des données et IA appliquée.",
      logo: "assets/img/logo-univ-lille.svg", theme: "dark",
      links: [{ label: "Université de Lille", url: "https://www.univ-lille.fr" }, { label: "SIAD", url: "" }]
    },
    {
      period: "2024 - 2025", kind: "Licence · Mention Bien", title: "Licence Économie-Gestion",
      description: "Année de licence à l'Université du Littoral, à Dunkerque, qui m'a rapproché des données et de la gestion.",
      logo: "assets/img/logo-ulco.svg", theme: "light",
      links: [{ label: "Université du Littoral", url: "https://www.univ-littoral.fr" }, { label: "Dunkerque", url: "" }]
    },
    {
      period: "2021 - 2024", kind: "Licence", title: "Licence Économie Internationale",
      description: "Trois années de licence d'économie internationale à l'Université de Lomé, au Togo.",
      logo: "assets/img/logo-lome.svg", theme: "dark",
      links: [{ label: "Université de Lomé", url: "" }, { label: "Togo", url: "" }]
    },
    {
      period: "2019 - 2020", kind: "Baccalauréat · Mention Bien", title: "Baccalauréat scientifique",
      description: "Baccalauréat scientifique obtenu au Togo, avec la mention Bien.",
      logo: "assets/img/logo-bac.svg", theme: "light",
      links: [{ label: "Togo", url: "" }]
    }
  ],

  contact: { intro: "Je suis joignable aussi bien par mail que par LinkedIn.", mailWord: "mail", linkedinWord: "LinkedIn", buttonLabel: "M'envoyer un mail" },

  /* Textes de l'interface (boutons, titres de section, messages). */
  labels: {
    skip: "Aller au contenu",
    menu: "Menu",
    langSwitch: "Passer le site en anglais",
    learnMore: "En savoir plus",
    close: "Fermer",
    scrollDown: "Défiler vers la suite",
    aboutTitle: "À propos de moi",
    worksTitle: "Mes travaux",
    worksSubtitle: "Voici une sélection de mes travaux les plus récents.",
    viewProject: "Voir le projet",
    allWorks: "Voir tous les travaux",
    prev: "Précédent",
    next: "Suivant",
    goToSlide: "Aller au projet {n}",
    hard: "Hard",
    soft: "Soft",
    skillsWord: "skills",
    hintHard: "Cliquez sur {word} pour voir les soft skills",
    hintSoft: "Cliquez sur {word} pour voir les hard skills",
    experienceTitle: "Expérience",
    educationTitle: "Formation",
    contactTitle: "Contact",
    createdBy: "Créé par",
    all: "Tous",
    projectsCount: "{n} projets",
    projectCount: "1 projet",
    techFilter: "Outil : {tech}",
    clearFilter: "Retirer le filtre",
    noResults: "Aucun projet ne correspond à ce filtre pour l'instant.",
    skillsPageTitle: "Mes compétences",
    skillsPageSubtitle: "Les outils et méthodes que j'utilise, de la préparation des données à la restitution.",
    seeProjects: "Voir les projets",
    softSkillsTitle: "Mes aptitudes",
    worksPageSubtitle: "Tous mes projets, filtrables par domaine. Chaque carte résume la question, les outils et les chiffres clés.",
    breadcrumb: "Travaux",
    projectSheet: "Fiche projet",
    keyFigures: "Chiffres clés",
    toc: "Table des matières",
    backToWorks: "Retour aux travaux",
    viewCode: "Voir le code sur GitHub",
    openApp: "Ouvrir l'application",
    prevProject: "Projet précédent",
    nextProject: "Projet suivant",
    notFoundTitle: "Projet introuvable",
    notFoundText: "Ce projet n'existe pas ou a changé d'adresse.",
    page404Title: "Page introuvable",
    page404Text: "La page que vous cherchez n'existe pas, ou plus.",
    backHome: "Retour à l'accueil"
  }
};
