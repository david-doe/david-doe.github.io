/* English overrides — merged on top of data/content.js when the EN language is active. */
window.SITE_EN = {
  meta: {
    title: "David DOE · Data portfolio",
    description: "Portfolio of David DOE, Master’s student in SIAD at the University of Lille: data analysis, BI and machine learning."
  },

  person: {
    tagline: "Master’s student in Information Systems and Decision Support (SIAD)",
    aboutShort: "A Master’s student in SIAD (Data Science track) at the University of Lille, I work across the whole data pipeline: preparing and validating data, analysing it, then delivering it to business teams in a form they can actually use.",
    aboutLong: [
      "I am studying for a Master’s in SIAD (Information Systems and Decision Support) at the University of Lille. What interests me is the whole data pipeline: collecting data, cleaning it, analysing it, then explaining to people what it tells us.",
      "My background is in economics: a bachelor’s degree in international economics at the University of Lomé, Togo, followed by a bachelor’s in economics and management in Dunkirk, with honours (Bien). The Master’s moved me over to the tools side: SQL, Python, SAS, R and Power BI.",
      "In my coursework I have worked on real-world cases: the effect of Covid on loans at Lille’s public libraries, advisor profiles and a good-seller score for a consumer credit call centre, the chances of passing the first year of a sociology degree, the drivers of home ownership in Switzerland, customer churn at a telecom operator, and shrinkage and early returns in a discount store. Each time, the same thread: frame the question, check data quality, choose the simplest method that holds up, and make the result easy to read.",
      "People tend to describe me as rigorous, self-reliant and curious. Away from the screen, I play futsal."
    ]
  },

  nav: [
    { label: "Home" },
    { label: "Work" },
    { label: "Skills" },
    { label: "Experience" },
    { label: "Education" },
    { label: "Contact" }
  ],

  projectCategories: ["Causal inference & forecasting", "Data analysis & BI", "Scoring", "Time series", "Econometrics", "Data visualisation"],

  projects: [
    {
      slug: "prix-epicerie-canada",
      title: "What Canada's counter-tariffs cost at the grocery store",
      date: "Aug. 2026 - Present",
      kind: "Personal project",
      category: "Causal inference & forecasting",
      summary: "How much do Canadian counter-tariffs raise grocery prices, how fast, and for how long? A bilingual live app built only on public data.",
      description: "Price tracker, causal estimate of the share of tariffs passed on to prices (synthetic control, difference-in-differences), 12-month forecasts with conformal intervals and the cost for a household, in a bilingual Streamlit app updated every month.",
      facts: [
        { label: "Context", value: "Personal project on public data (Statistics Canada, Bank of Canada, UN Comtrade)" },
        { label: "Team", value: "Solo" },
        { label: "Tools", value: "Python (pandas, statsmodels, scikit-learn, LightGBM), SQL (DuckDB), Streamlit, Plotly, GitHub Actions" },
        { label: "Deliverables", value: "Bilingual live app, public, reproducible GitHub repository, log of 34 sourced decisions, one-page summary" }
      ],
      highlights: [
        { value: "≈ 40%", label: "of the 2025 tariff passed on to prices once world commodity prices are removed (Bank of Canada: about 25%)" },
        { value: "$0.52", label: "per $100 of groceries: what the 2025 counter-tariffs cost an average household" },
        { value: "101", label: "price series forecast 12 months ahead, with 41% less error than the 'same as last year' method" },
        { value: "34", label: "method decisions, each justified by a source and traced in a log" }
      ],
      body: [
        { type: "h2", text: "Context and question" },
        { type: "p", text: "Since 2018, Canada has answered US tariffs with counter-tariffs on US goods, food included: a 10% surtax in 2018, 25% tariffs on a long list in 2025, then, on 8 September 2026, 25% on cheese and 50% on milk powders, whey, honey, molasses and bakery mixes. Each time, one can ask who pays these tariffs, and how much." },
        { type: "p", text: "The project answers four questions: what exactly was taxed, how much of the tariff reached the shelves, tariff or world prices, and where prices are heading." },
        { type: "callout", title: "What the project adds", text: "The Bank of Canada already measured the effect of the 2025 tariffs (about 25% passed on, temporarily) with detailed product-level data. The project does not present this as a discovery: it replicates it with public data, focuses on food, extends it to the 2026 tariffs and turns it into dollars for a household, in an app where every figure refers to its source." },
        { type: "h2", text: "The app, tab by tab" },
        { type: "p", text: "The app is live, in English and French, in light or dark theme. The tour below shows each tab, what it does and why it is designed that way. The demos that follow use the app's real data: you can try them here without leaving the page." },
        { type: "demo", demo: "tour", title: "Guided tour", intro: "Click a tab (or use the arrow keys) to see the matching screenshot." },
        { type: "h2", text: "What the tariffs cost a household" },
        { type: "p", text: "For a household, a pass-through percentage means little; the project converts it into dollars per month. The cost is computed as follows: spending × tariff rate × share passed on × share of food spending on tariffed US goods. That last share comes from UN Comtrade imports by 6-digit product code over Statistics Canada household spending." },
        { type: "demo", demo: "cost", title: "Demo: your bill", intro: "Change the bill and the episode. Hover over a bar to see its share of the cost." },
        { type: "ul", items: [
          "2025: about $0.52 per $100 of groceries during the six months the tariffs applied, about 0.5 point of the 1.8% rise in grocery prices over those months.",
          "2026: about $0.11 per $100. Cheese, the only product taxed as sold in stores, accounts for only $0.02 of it; the rest falls on ingredients, part of which goes to restaurants and food manufacturers.",
          "Categories whose customs codes are broader than the taxed products are shown as hatched upper bounds."
        ] },
        { type: "h2", text: "What was taxed, line by line" },
        { type: "p", text: "The official lists (Finance Canada, Canada Gazette) hold hundreds of tariff lines. Each one was mapped to the consumer price index (CPI) series where the product appears, with its type of exposure: taxed directly, partly, only as an ingredient, or only above an import quota. That distinction explains, for example, why milk did not move in 2026: only milk powders, which are ingredients, are taxed." },
        { type: "demo", demo: "taxed", title: "Demo: is it taxed?", intro: "Type a product or pick a suggestion." },
        { type: "h2", text: "Measuring the effect: a causal method" },
        { type: "p", text: "Comparing prices before and after a tariff is not enough: prices also rise for other reasons. Each tariffed series is therefore compared with a 'synthetic twin', a weighted mix of similar untaxed series that followed the same path before the tariff. The gap after the tariff estimates its effect, and its significance is tested by permutation. Untaxed placebo series act as a check: they should show nothing." },
        { type: "p", text: "To go from effect to pass-through, each series' gap is related to its exposure (the share of tariffed US goods in the series) in a difference-in-differences regression with a continuous treatment. Finally, commodity-linked series (coffee, cocoa, sugar, wheat) are adjusted for World Bank world prices: without that adjustment, coffee, whose arabica price doubled, would read as a tariff effect." },
        { type: "demo", demo: "effects", title: "Demo: tariff effects", intro: "Compare 2025 and 2018. Hover over a dot to see the gap and its p-value." },
        { type: "table", caption: "What the estimates say", head: ["Episode", "Estimated pass-through", "Reading"], rows: [
          ["2025 (25%)", "≈ 40% [−7%; 86%]", "Consistent with the Bank of Canada (≈ 25%); coffee excluded, a world-price effect"],
          ["2018 (10%)", "not detectable", "Interval too wide to confirm or reject the Bank of Canada's 70%"],
          ["2026 (25% and 50%)", "at most +0.6 point on cheese", "US cheese is only about 2.4% of household spending on cheese"]
        ] },
        { type: "callout", title: "Why the effect is so hard to see", text: "In 2025, tariffed US goods made up a median 9% of a tariffed CPI series. Even a 25% tariff fully passed on would move these series by about 3 points, while monthly public data can only detect about 5 points. This limit comes from the data, not from the method." },
        { type: "h2", text: "Forecasting prices, with their margin of error" },
        { type: "p", text: "The 101 food price series are forecast 12 months ahead. The rule: a simple method first ('same as last year', the seasonal naive baseline), then ETS and a global LightGBM model, all evaluated in a rolling-origin backtest on 2019-2025, as if made in the past. No random cross-validation: on a time series, the model would learn from data later than the period being forecast." },
        { type: "table", caption: "Backtest results (2019-2025)", head: ["Criterion", "Result"], rows: [
          ["Error (MASE, lower is better)", "1.28 for the published model against 2.16 for the seasonal naive baseline"],
          ["Coverage of the 80% interval", "85% to 87% of observed values in 2023-2025"],
          ["Coverage of the 95% interval", "96% to 97%"],
          ["2026 forecast, food prices", "+3.5%, just below the Food Price Report's +4% to +6%"]
        ] },
        { type: "p", text: "The intervals are computed by conformal prediction: calibrated on the model's past errors, they assume no statistical distribution and their actual coverage is checked." },
        { type: "demo", demo: "forecast", title: "Demo: prices and forecasts", intro: "Pick a series. For cheese, the 2026 tariff scenarios are added to the forecast made just before them." },
        { type: "h2", text: "Comparing prices with the forecast made before the tariffs" },
        { type: "p", text: "The forecast made with data to August 2026, the month before the tariffs, is kept unchanged: it is the estimate of what prices would have been without them. Each month, a series is flagged if its price is above the top of its 80% interval, and we check whether tariffed series are flagged more often than the others." },
        { type: "p", text: "Applied to past episodes, this rule does not single out tariffed series: in 2018, 4% of them are flagged against 7% of untaxed series; in 2025, 14% against 15%. This is expected: a tariff moves a CPI series by about 3 points at most, while public monthly data can only show a gap of about 5 points. The only clear gap in 2025, coffee (18% above its forecast), comes from the rise in the world price of arabica." },
        { type: "p", text: "The app therefore shows no alert: it would almost never go off, or would go off for a reason other than the tariff. The demo above shows observed cheese prices against this forecast." },
        { type: "h2", text: "Where AI is used" },
        { type: "ul", items: [
          "Tariff-line classification (NLP): for each new list, TF-IDF, multilingual embeddings and rank fusion suggest candidate CPI series, scored against the hand-made mapping. The right series is among the top 5 suggestions in 81% of cases, and first in 44%.",
          "Document search with written answers (RAG): built, evaluated on a held-out set of 34 questions with a hand-checked answer key, then removed from the app. It answered 79% of questions correctly (English 100%, French 56%), below the 80% per language set in advance. Next fix: translate French questions before the search.",
          "Free-text assistant: ready, with its bilingual evaluation set; it will be shown only once its accuracy is measured and published."
        ] },
        { type: "h2", text: "Production" },
        { type: "ul", items: [
          "Public sources only: Statistics Canada (CPI, household spending), Bank of Canada (exchange rate), UN Comtrade (imports by product), World Bank (commodity prices).",
          "After each monthly CPI release, a scheduled task updates the data, runs the tests, publishes the new data to GitHub (the app redeploys itself) and compares the price of cheese with the frozen forecast.",
          "30 automated tests run on every push (GitHub Actions); the app redeploys on every merge.",
          "Every method choice is a numbered, sourced decision, in English and French.",
          "SQL queries (DuckDB) on the same tables, for ad hoc analyses."
        ] },
        { type: "h2", text: "Limitations" },
        { type: "ul", items: [
          "Public monthly indexes mix taxed and untaxed products: small effects cannot be measured precisely.",
          "Import exposure is measured at the 6-digit product level and at border value: it is an approximation.",
          "A placebo test on dairy products partly failed: dairy prices follow their own regulated dynamics.",
          "The 2026 tariffs are too recent to be measured: their effect is shown as scenarios based on pass-through rates already published (Bank of Canada)."
        ] },
        { type: "h2", text: "Skills used" },
        { type: "ul", items: [
          "Causal inference: synthetic control with permutation tests, difference-in-differences with a continuous treatment, placebos",
          "Time series forecasting: seasonal naive baseline, rolling-origin backtest, LightGBM, conformal intervals",
          "NLP and information retrieval, scored against human labels with bootstrap intervals",
          "Data collection through public APIs and a reproducible processing pipeline",
          "Bilingual web app (Streamlit, Plotly) deployed and updated every month",
          "Automated tests, continuous integration and decision documentation"
        ] }
      ]
    },
    {
      slug: "projet-noz",
      title: "Running a discount store with its own data",
      date: "Sep. - Oct. 2026",
      kind: "Personal project",
      category: "Data analysis & BI",
      summary: "Which batches will be sent back too early, which aisle is losing stock, and when do you need staff at the tills? A full SQL, Python and Power BI pipeline.",
      description: "PostgreSQL database with 22 data quality checks, statistical tests, an early-return risk model (AUC 0.92 at day 7), a 7-day sales forecast and a 3-page Power BI dashboard, built on a store simulated from my internship at NOZ.",
      tags: ["SQL", "PostgreSQL", "Python", "sklearn", "Power BI", "Logit", "Holt-Winters"],
      facts: [
        { label: "Context", value: "Personal project, Master SIAD" },
        { label: "Team", value: "Solo" },
        { label: "Tools", value: "PostgreSQL, Python (pandas, scikit-learn, statsmodels), Power BI (DAX)" },
        { label: "Deliverables", value: "Reproducible GitHub repository, PDF report, business summary, dashboard" }
      ],
      highlights: [
        { value: "3,060", label: "batches tracked day by day (95,332 rows) over 20 simulated months" },
        { value: "65%", label: "of early returns caught while monitoring only 20% of batches" },
        { value: "42.5%", label: "of unexplained shrinkage in two aisles that make 19% of sales" },
        { value: "11%", label: "error on the 7-day sales forecast" }
      ],
      body: [
        { type: "h2", text: "Context" },
        { type: "p", text: "During my third-year internship at NOZ in Saint-Pol-sur-Mer (2025), I saw a clearance store that does not choose what it receives: head office sends the batches. This creates three problems: batches sent back to the warehouse before the end of their 7 weeks on the shelves because the store is full, stock that disappears without anyone knowing where until the next inventory, and extra staff on delivery days rather than on busy sales days." },
        { type: "callout", title: "Simulated data", text: "No internal NOZ data is used. I wrote a store simulator calibrated on the figures from my internship report (weekly sales, day-of-week profile, sales share by aisle, about 20 pallets per delivery). The results are used to test the method; they do not describe the real store." },
        { type: "h2", text: "The database" },
        { type: "p", text: "Seven PostgreSQL tables linked by foreign keys: the store day by day, deliveries, daily sales for each batch, the outcome of each batch, inventories and categories. Before any analysis, 22 data quality checks run automatically, and loading stops if a single one fails. Five SQL views prepare the indicators for Python and Power BI." },
        { type: "img", src: "assets/img/noz-schema_base_noz.png", alt: "Diagram of the NOZ database tables", caption: "The database schema, as shown in DBeaver." },
        { type: "h2", text: "What the analysis shows" },
        { type: "table", caption: "The four questions and their answers (simulated store)", head: ["Question", "Answer"], rows: [
          ["Can we spot batches sent back before 49 days?", "Yes. Logistic regression: AUC of 0.836 on arrival, 0.922 after one week on the shelves. Monitoring 20% of batches catches 65% of them."],
          ["Where is unexplained shrinkage concentrated?", "Well-being and Drugstore-Perfume-Hygiene: 42.5% of unexplained shrinkage for 19% of sales."],
          ["Do we sell more on delivery days?", "No (p = 0.86). Saturday brings 35% more sales, with no delivery."],
          ["Can we forecast the week's sales?", "Holt-Winters: 11% error, 21.5% better than the naive method."]
        ] },
        { type: "p", text: "A useful finding for the shop floor: when the store is more than 110% full, incoming batches are sent back early 1.7 times more often (15.7% vs 9.4%)." },
        { type: "h2", text: "The dashboard" },
        { type: "p", text: "Three Power BI pages for a store manager: an anomaly radar by aisle, a staff planning page and a page on store saturation, with a what-if parameter to test the alert threshold." },
        { type: "img", src: "assets/img/noz-pbi_page1_radar_anomalies.png", alt: "Anomaly radar page of the Power BI dashboard", caption: "Page 1: shrinkage and early returns by aisle." },
        { type: "h2", text: "Recommendations" },
        { type: "ol", items: [
          "Every Monday, review the short list of the riskiest batches: discount, better placement or early return.",
          "Above 110% fill rate, clear out the batches that no longer sell first, before the next delivery.",
          "Count the Well-being and Drugstore-Perfume-Hygiene aisles more often.",
          "Build the till rota from forecast sales, not from delivery days."
        ] },
        { type: "h2", text: "Limitations" },
        { type: "p", text: "The relationships found had been programmed into the simulator: the exercise shows that the method can recover them. The model does not yet forecast saturation itself, and the real effect of a discount on sales is still to be measured. Before any decision, the pipeline should be rerun on a real store's data." },
        { type: "h2", text: "Skills used" },
        { type: "ul", items: ["Relational database design and data quality checks in SQL", "Statistical tests and effect sizes", "Classification with a time-based split and no data leakage", "Time series forecasting", "Power BI dashboard with DAX measures", "Reproducible, documented project on GitHub"] }
      ]
    },
    {
      slug: "score-churn-telco",
      title: "Predicting customer churn at a telecom operator",
      date: "Apr. - May 2026",
      kind: "Academic project",
      category: "Scoring",
      summary: "Which customers are going to leave, and which levers can keep them? A churn scoring model and a report for the business.",
      description: "Churn scoring model using logistic regression on 7,043 customers of a telecom operator (Telco Customer Churn dataset), interpreted through odds ratios, with a threshold chosen to maximise recall and business recommendations.",
      tags: ["R", "RMarkdown", "Logistic regression", "Odds ratios"],
      facts: [
        { label: "Context", value: "Master SIAD, R programming course" },
        { label: "Team", value: "Pair, with Roman Delbare" },
        { label: "Tools", value: "R (glm), RMarkdown" },
        { label: "Deliverables", value: "RMarkdown script, HTML report, business report (PDF)" }
      ],
      highlights: [
        { value: "7,043", label: "customers analysed, 21 variables" },
        { value: "78%", label: "of churned customers detected on the test set (30% threshold)" },
        { value: "76%", label: "accuracy on the test set" },
        { value: "÷ 4", label: "odds of churning with a two-year contract" }
      ],
      body: [
        { type: "h2", text: "Context and question" },
        { type: "p", text: "A telecom operator is losing customers, and every departure costs more than retaining a customer. The project is to build a churn score, i.e. the probability that a customer leaves, in order to spot at-risk customers and understand which levers to act on. The work was carried out with Roman Delbare, using the public Telco Customer Churn dataset (IBM)." },
        { type: "h2", text: "The data" },
        { type: "p", text: "The dataset contains 7,043 customers and 21 variables. The target variable is Churn: 1 if the customer left, 0 if they stayed. Only 11 rows had a missing value, on total charges: they were removed." },
        { type: "ul", items: [
          "All qualitative variables are recoded as binary variables, with a reference category defined for each one.",
          "Variables created: contract type (one-year, two-year), internet type (DSL, none), paperless billing, payment method, online security, tech support, TV and movie streaming, dependants, multiple phone lines."
        ] },
        { type: "h2", text: "The model" },
        { type: "p", text: "Logistic regression (glm function, binomial family), with a 70% training / 30% test split. Two specifications were compared. The final model drops variables with no effect (sex, living with a partner, device protection, no phone line). Tenure and total charges, correlated at 0.82, both stay in the model: a limitation to keep in mind." },
        { type: "callout", title: "How to read an odds ratio", text: "An odds ratio (OR) above 1 increases the odds of churning, an OR below 1 reduces them: the change is (OR - 1) x 100 for an OR above 1, and (1 - OR) x 100 otherwise. To assess significance, we look at the 95% confidence interval: we test whether the coefficient equals 0, which amounts to testing whether the OR equals 1. If the interval contains 1, the absence of an effect remains plausible, which is equivalent to a p-value above 0.05: we do not conclude that there is an effect." },
        { type: "h2", text: "Results" },
        { type: "table", caption: "Odds ratios of significant variables", head: ["Variable", "Odds ratio", "Effect on the odds of churning"], rows: [
          ["Two-year contract", "0.244", "-75.6%"],
          ["No internet", "0.258", "-74.2%"],
          ["One-year contract", "0.532", "-46.8%"],
          ["DSL internet", "0.547", "-45.3%"],
          ["Online security", "0.643", "-35.7%"],
          ["Tech support", "0.663", "-33.7%"],
          ["Payment by credit card", "0.629", "-37.1%"],
          ["Paperless billing", "1.453", "+45.3%"],
          ["TV streaming", "1.369", "+36.9%"],
          ["Multiple phone lines", "1.235", "+23.5%"],
          ["Tenure (per month)", "0.948", "-5.2%"]
        ] },
        { type: "p", text: "Two variables do not stand out: being a senior, and having dependants. For the latter, the OR of 0.827 suggests a protective trend (-17.3%), but the confidence interval [0.682; 1.000] touches 1. We therefore cannot claim that it reduces churn, and it is not kept as a lever for action." },
        { type: "table", caption: "Performance on the test set (30% of customers, never seen by the model)", head: ["Metric", "50% threshold", "30% threshold"], rows: [
          ["Accuracy", "80%", "76%"],
          ["Recall (churned customers correctly detected)", "55%", "78%"],
          ["Precision", "63%", "53%"]
        ] },
        { type: "h3", text: "Why a 30% threshold" },
        { type: "p", text: "The threshold was chosen to maximise recall: it is better to miss few customers who are about to leave, even if that means targeting some who would have stayed. The threshold was tuned on the training set, then checked on the test set, where results are almost identical: no sign of overfitting. The trade-off is a precision of 53%, meaning roughly one targeted customer in two is a false positive, which remains acceptable for a low-cost retention action." },
        { type: "h2", text: "The score" },
        { type: "p", text: "The score is the probability of churn P(churn) = 1 / (1 + e^(-z)), where z combines the model’s 17 variables: a constant of 0.5154, tenure (-0.0533 per month), a two-year contract (-1.4121), no internet (-1.3546), paperless billing (+0.3738), and so on. The full formula is given in the report." },
        { type: "h2", text: "Business recommendations" },
        { type: "ol", items: [
          "Promote long-term contracts: this is the variable most associated with staying, with a two-year contract cutting the odds of churning by roughly four.",
          "Expand add-on services, especially online security and tech support, which are associated with less frequent churn.",
          "Strengthen retention during the first year, the most fragile period: target fibre customers on a monthly contract with paperless billing."
        ] },
        { type: "h2", text: "Limitations" },
        { type: "p", text: "An odds ratio describes an association, not a cause: offering a customer a longer contract does not guarantee they will stay. With a precision of 53%, the score is for prioritising actions, not for deciding customer by customer. The dataset is a snapshot at a single point in time, with no follow-up over time." },
        { type: "h2", text: "Skills applied" },
        { type: "ul", items: ["Preparing and recoding a customer dataset, including choosing reference categories", "Logistic regression in R and variable selection", "Interpreting odds ratios and confidence intervals", "Choosing a threshold based on the business objective", "Reproducible business report with RMarkdown"] }
      ]
    },
    {
      slug: "dataviz-naissances",
      title: "Births in France in four charts",
      date: "Apr. - May 2026",
      kind: "Academic project",
      category: "Data visualisation",
      summary: "Where do children's surnames come from, where are they born, and is the birth rate really falling? Four charts built in R from INSEE data, then a Shiny app to explore each département.",
      description: "Four ggplot2 charts on INSEE's detailed birth files (2018-2024): origin of the surname, a map by département with a zoom on the Paris region, the seven-year trend, and the link between the parents' ages.",
      tags: ["R", "ggplot2", "Shiny", "Data visualisation", "INSEE"],
      facts: [
        { label: "Context", value: "Master SIAD, data visualisation course" },
        { label: "Team", value: "Pair, with Roman Delbare" },
        { label: "Tools", value: "R (tidyverse, ggplot2, sf, Shiny, bslib), Python for data preparation" },
        { label: "Deliverables", value: "Commented RMarkdown script, four charts and a Shiny app" }
      ],
      highlights: [
        { value: "5.1 M", label: "births covered, from 2018 to 2024" },
        { value: "80.6%", label: "of children born in 2021 carry their father's surname only" },
        { value: "-13%", label: "births between 2018 and 2024" },
        { value: "2.7 yrs", label: "average age gap between father and mother" }
      ],
      body: [
        { type: "h2", text: "The idea" },
        { type: "p", text: "Every year INSEE publishes a file with one row per birth: parents' ages, département, the child's sex, the origin of their surname… The goal of the course was to tell the story of this data in a few clear charts, then explain our choices and what AI suggested, keeping what improved readability and rejecting the rest." },
        { type: "h2", text: "The four charts" },
        { type: "table", caption: "The four charts", head: ["Question", "Chart", "What it shows"], rows: [
          ["Where does the surname of children born in 2021 come from?", "Bars, one panel per sex", "80.6% carry their father's surname only. The double name \u201cfather then mother\u201d (10.1%) comes ahead of the mother's surname alone (6.3%). No difference between girls and boys."],
          ["Where are children born?", "Map by département, zoom on the Paris region", "From 430 births in Lozère to 41,880 in Paris."],
          ["Where does 2021 sit in the trend?", "Line chart 2018-2024", "An almost continuous decline, from 758,590 births in 2018 to 660,787 in 2024, with a slight rebound in 2021."],
          ["Does the father's age follow the mother's?", "Scatter plot of 10,000 births, regression line and diagonal", "Yes, clearly. Fathers are 33.9 on average, mothers 31.2."]
        ] },
        { type: "h2", text: "Our choices" },
        { type: "ul", items: [
          "A single palette inspired by INSEE publications, so the four charts read as one set.",
          "On the map, Lozère and Paris are highlighted, and the Paris region gets its own zoom: otherwise its eight départements are unreadable.",
          "For the scatter plot, a sample of 10,000 births drawn with a fixed seed: with 740,000 points you can no longer see anything.",
          "The diagonal \u201cfather's age = mother's age\u201d shows that the regression line sits above it: fathers are slightly older."
        ] },
        { type: "h2", text: "The AI's suggestions" },
        { type: "p", text: "We asked AI to critique each chart. We kept the values above the bars, the lighter grid, labels that do not overlap and the diagonal on the scatter plot. We rejected flipping the bar chart axes, which made the panels harder to read, and removing the vertical axis from the line chart: without a scale, a chart can mislead." },
        { type: "h2", text: "The Shiny app" },
        { type: "p", text: "Each chart shows a single year and a single angle. The app lets readers explore the data, across four tabs: an animated map from 2018 to 2024, a portrait of any département compared with France, births month by month, and mothers' ages." },
        { type: "img", src: "assets/img/dataviz-shiny-departement.png", alt: "My département tab of the Shiny app, with Nord compared with France", caption: "Nord lost 15.4% of its births between 2018 and 2024, against 12.8% for France, and its mothers are younger than average." },
        { type: "ul", items: [
          "Births are assigned to the département where the mother lives, not where the maternity ward is: otherwise, closing a maternity ward moves births from one département to another.",
          "The map shows the change since 2018 rather than a count: between 2018 and 2024, births fall everywhere in mainland France, from 6% in Mayenne to 21% in Paris.",
          "The seasons tab reveals the dip of January and February 2021, nine months after the first lockdown.",
          "A Python script aggregates the 5 million rows once into tables of a few hundred KB: the app starts in seconds."
        ] },
        { type: "img", src: "assets/img/dataviz-shiny-saisons.png", alt: "Seasons tab: births per day, month by month, in 2019, 2021 and 2024", caption: "Births per day: the January 2021 dip and the overall decline in 2024." },
        { type: "h2", text: "Limitations" },
        { type: "p", text: "The map shows a number of births, not a rate: Paris comes first mainly because it is the most populated département. Overseas départements (5.4% of 2021 births) are not on the map. Finally, our shades of blue can be hard to tell apart for colour-blind readers." },
        { type: "h2", text: "Skills used" },
        { type: "ul", items: ["Preparing large files (over 700,000 rows a year) with dplyr", "Picking the right chart for each question", "Mapping with sf", "Critical review of our own charts and of AI suggestions", "Lightweight Shiny app built on pre-aggregated data"] }
      ]
    },
    {
      slug: "mediatheques-covid",
      title: "Impact of Covid on Lille’s public libraries",
      date: "Sep. - Oct. 2025",
      kind: "Academic project",
      category: "Time series",
      summary: "How many transactions did Covid cost Lille’s public libraries, and when does activity return to its 2019 level?",
      description: "Measuring the effect of Covid-19 on loans and returns at the Lille-Lomme-Hellemmes public libraries (2019-2023), using time series models and a daily forecast for 2023.",
      tags: ["SAS", "Excel", "Time series"],
      facts: [
        { label: "Context", value: "Master SIAD, semester 1 (2025-2026)" },
        { label: "Team", value: "Pair, with Ndeye Bineta Guirane" },
        { label: "Tools", value: "SAS, Excel" },
        { label: "Deliverables", value: "Case study report and presentation slides" }
      ],
      highlights: [
        { value: "17,233", label: "hourly observations cleaned" },
        { value: "1,493", label: "days analysed (8 am-7 pm)" },
        { value: "-3,238", label: "transactions per day: estimated impact of Covid" },
        { value: "2023", label: "year in which the forecast returns to the 2019 level" }
      ],
      body: [
        { type: "h2", text: "Context and question" },
        { type: "p", text: "The Lille-Lomme-Hellemmes library service wanted to understand how Covid-19 had affected its loans and returns, how long it would take to get back to the 2019 level, and what to expect day by day in the coming year. The results are meant to help organise the offering and plan staff." },
        { type: "h2", text: "The data" },
        { type: "p", text: "The source file contained 17,233 hourly observations, from 1 January 2019 to 31 January 2023. After aggregating by day and keeping only opening hours (8 am-7 pm), 1,493 days remained. Over the period, there are on average about 1,590 loans and 1,965 returns per day. Hour by hour, activity is very uneven: 138 loans per time slot on average, but a median of only 19. Most time slots are quiet, and a few rush hours pull the average up." },
        { type: "h3", text: "Three data preparation decisions" },
        { type: "ul", items: [
          "Closure days (Sundays, public holidays, lockdowns) are coded as 0: this is a genuine absence of activity, not missing data.",
          "Extreme peaks are kept after verification. On 29 October 2020, the day before the second lockdown, there were 9,049 loans in the day, 2,167 of them between 5 and 6 pm. On 12 January 2021, 2,915 returns came in between 9 and 10 am. Over a full day, the record for returns is 19 May 2021, with 7,387 returns.",
          "Only actual opening hours are kept, so as not to distort the averages."
        ] },
        { type: "h2", text: "The method" },
        { type: "p", text: "I compared an additive model and a multiplicative model in SAS, with day of the week, month, trend and a “Covid” regime (normal period versus disruption period) as explanatory variables. Residuals were checked (normality, autocorrelation) and standard errors were corrected for heteroscedasticity using White’s correction." },
        { type: "chart", title: "Monthly loans and returns", caption: "Monthly totals of loans and returns, January 2019 to January 2023.", series: [{ name: "Loans" }, { name: "Returns" }] },
        { type: "h2", text: "Results" },
        { type: "table", caption: "Effect of the Covid regime in the additive models, per operating day", head: ["Metric", "Estimated effect"], rows: [
          ["Loans", "-1,384 per day"],
          ["Returns", "-1,854 per day"],
          ["Total activity (loans + returns)", "-3,238 per day"]
        ] },
        { type: "ul", items: [
          "Average level in 2019: about 4,522 transactions per day. In 2022: about 3,825.",
          "The 2023 forecast was tested on January 2023, a month held out during estimation: it closely tracks the Wednesday and Saturday peaks.",
          "For 2023, the model forecasts about 5,305 transactions per day, above 2019: the pre-crisis level is therefore regained in the first half of the year."
        ] },
        { type: "callout", title: "Key takeaway", text: "Covid cost more than 3,200 transactions per day during periods of strict restrictions, and, according to the forecast, the network returns to its pre-crisis level in 2023." },
        { type: "h2", text: "Skills applied" },
        { type: "ul", items: ["Preparing and documenting hourly data (Excel)", "Time series and model diagnostics (SAS)", "Forecasting with out-of-sample validation", "Analytical report and oral presentation with recommendations"] }
      ]
    },
    {
      slug: "etude-cofitypotel",
      title: "Cofitypotel study: advisor profiles and a good-seller score",
      date: "Jan. - Feb. 2026",
      kind: "Academic project",
      category: "Scoring",
      summary: "Four profiles of call-centre advisors, then a scoring model to spot good sellers and find out which profile sells best.",
      description: "Two-part study for a consumer credit call centre: a typology of advisors based only on their phone data (PCA, clustering, discriminant analysis), then a logistic regression scoring model (AUC of 0.82) cross-checked against the profiles. Analysis rebuilt in Python, with a Power BI dashboard.",
      tags: ["Python", "sklearn", "R", "Power BI", "PCA", "Clustering", "Logit"],
      facts: [
        { label: "Context", value: "Master SIAD, semester 2 (2025-2026), supervised by a tutor" },
        { label: "Team", value: "Pair, with Thibault Perz" },
        { label: "Tools", value: "R (original study), Python (pandas, scikit-learn), Power BI" },
        { label: "Deliverables", value: "Two analysis reports, reproducible Python notebook, Power BI dashboard" }
      ],
      highlights: [
        { value: "907", label: "quarterly observations, 251 advisors, 8 quarters" },
        { value: "92%", label: "of advisors correctly classified by discriminant analysis (cross-validation)" },
        { value: "AUC 0.82", label: "for the good-seller score, on the test set" },
        { value: "17% / 70%", label: "good sellers among outbound specialists / quality-focused advisors" }
      ],
      body: [
        { type: "h2", text: "Context" },
        { type: "p", text: "Cofitypotel is a consumer credit company whose call-centre advisors sell revolving credit, insurance and instalment loans. They all share the same targets, but each organises their work as they see fit: call volume, follow-up calls, time spent with each customer. Management first wanted a map of these practices, then to know which ones go with good results on credit limit increases (raising the ceiling of an existing revolving credit)." },
        { type: "callout", title: "Two studies", text: "Part 1: describe behaviours without looking at sales. Part 2: model sales performance, then compare the two analyses, which were carried out independently." },
        { type: "h2", text: "Part 1: the advisor typology" },
        { type: "h3", text: "Making the data comparable" },
        { type: "p", text: "From 2,502 monthly observations, I built 907 quarterly observations (251 advisors, 8 quarters over 2003-2004), the quarter being the window over which delays between a call and a sale even out. Indicators are scaled to 7 hours of presence per day to compare full-time and part-time staff fairly, and extreme values are capped by winsorisation (1st and 99th percentiles) rather than removed." },
        { type: "p", text: "This gives thirteen indicators: call volumes, talk time, average call length, calls handled per hour, answer rate, share of available time spent talking, share of outbound calls." },
        { type: "h3", text: "Summarise, then group" },
        { type: "p", text: "A PCA condenses the thirteen indicators into four axes (35%, 22%, 19% and 10% of variance): inbound activity, outbound orientation, call length, use of available time. A two-step clustering (Ward hierarchical clustering, then K-means) gives four profiles. Linear discriminant analysis recovers them well: 92% of advisors correctly classified in leave-one-out cross-validation." },
        { type: "table", caption: "The four behavioural profiles", head: ["Profile", "Size", "Share of HML", "What sets it apart"], rows: [
          ["Standard actives", "467", "70%", "Close to average, slightly below on volume; online credit checks take up part of the HML advisors' time"],
          ["Quality-focused actives", "288", "21%", "Many inbound calls, slightly longer conversations, very few follow-up calls"],
          ["Outbound specialists", "139", "45%", "Large share of follow-up calls, very little inbound talk time"],
          ["Intensive callers", "13", "23%", "Very high activity on both inbound and outbound calls"]
        ] },
        { type: "p", text: "A first finding: the gaps between advisors authorised to set up loans online (HML) and the others (NHML) are about volume, not efficiency. With the same available time, everyone handles the same number of calls per hour. Profiles do move, though: from one quarter to the next, half of the advisors change group. So it is better to track how an advisor evolves than to label them once and for all." },
        { type: "h2", text: "Part 2: the good-seller score" },
        { type: "h3", text: "Defining the target" },
        { type: "p", text: "An advisor is a “good seller” if they close more accepted limit increases per day of presence than the median of their colleagues. This relative definition is not sensitive to seasonal swings and gives two classes of the same size." },
        { type: "h3", text: "Choosing the variables" },
        { type: "ul", items: [
          "Mann-Whitney tests and Cramér's V (bootstrap confidence intervals): inbound call volumes have the strongest links with the target, the share of outbound calls a negative one.",
          "Spearman matrix and VIF: volume variables are almost redundant. One representative per block is kept; in the final model all VIFs stay below 2.",
          "80/20 split between training and test, with standardisation computed on the training set only.",
          "Variable entry order fixed in advance rather than automatic stepwise selection, then model choice based on AUC, BIC and a likelihood ratio test: the four-variable model is kept."
        ] },
        { type: "h3", text: "The final model" },
        { type: "table", caption: "Odds ratios for a one standard deviation increase", head: ["Variable", "Odds ratio", "Reading"], rows: [
          ["Share of available time spent talking", "2.45", "More time in conversation, better odds of being a good seller"],
          ["Calls handled per day", "2.16", "More calls handled, more chances to sell"],
          ["Calls handled per hour", "1.62", "Smooth flow from one call to the next"],
          ["Share of outbound calls in talk time", "0.71", "The only unfavourable variable: about 30% lower odds"]
        ] },
        { type: "ul", items: [
          "AUC of 0.818 on the test set and 0.812 on the training set: no sign of overfitting. McFadden R² of 0.24, good calibration (Hosmer-Lemeshow test).",
          "At the Youden threshold, the model spots 87 good sellers out of 100 and recognises 67 other advisors out of 100.",
          "In the two highest score deciles, 86% of advisors really are good sellers, 1.8 times more than at random."
        ] },
        { type: "h2", text: "Cross-checking the two analyses" },
        { type: "p", text: "The profiles were built without any sales data, and the scoring model knows nothing about the profiles: the fact that they reach the same ranking therefore strengthens both." },
        { type: "table", caption: "Sales performance by profile", head: ["Profile", "Good sellers", "Average score", "Rank"], rows: [
          ["Quality-focused actives", "70%", "0.69", "1st"],
          ["Standard actives", "47%", "0.47", "2nd"],
          ["Outbound specialists", "17%", "0.17", "3rd"],
          ["Intensive callers", "69%", "0.90", "too few to conclude (13)"]
        ] },
        { type: "ul", items: [
          "Outbound specialists perform worst in both analyses: their defining trait, the share of follow-up calls, is precisely the only unfavourable variable in the model.",
          "Quality-focused actives sell best: many inbound calls and very few follow-ups, exactly what the score rewards.",
          "For limit increases, sales mostly happen when customers call in themselves, with a need."
        ] },
        { type: "callout", title: "What the Python version corrected", text: "While rebuilding the study in Python, I found two issues in the original version: withdrawal time was truncated at 24 hours for a quarter of the rows, and the cross-check table in the second report did not use the same grouping as the typology. Once fixed, the ranking changes: quality-focused actives, not intensive callers, sell best. The notebook documents every difference." },
        { type: "h2", text: "The dashboard" },
        { type: "p", text: "Results are exported as clean tables (advisor codes anonymised) and used in a three-page Power BI dashboard: profiles, good-seller score by group, and quarterly tracking with moves between groups." },
        { type: "img", src: "assets/img/cofitypotel-pbi-profils.png", alt: "Profiles page of the Cofitypotel Power BI dashboard", caption: "Page 1 of the dashboard: advisor profiles." },
        { type: "img", src: "assets/img/cofitypotel-pbi-score.png", alt: "Good-seller score page of the Cofitypotel Power BI dashboard", caption: "Page 2: average score by group and the model's odds ratios." },
        { type: "img", src: "assets/img/cofitypotel-pbi-suivi.png", alt: "Quarterly tracking page of the Cofitypotel Power BI dashboard", caption: "Page 3: good sellers quarter by quarter and moves between groups." },
        { type: "h2", text: "Recommendations" },
        { type: "ul", items: [
          "Focus training first on outbound specialists, to help them convert on inbound calls.",
          "Add each advisor's profile to the quarterly dashboard and follow how it changes from one quarter to the next.",
          "Use the assignment model to place a new advisor in a group after one quarter of data.",
          "For HML advisors in the “standard actives” group, check their online credit workload before reading it as a lack of commitment."
        ] },
        { type: "h2", text: "Limitations" },
        { type: "p", text: "Eight quarters and 251 advisors is short for firm conclusions. Choosing four groups is defensible but not the only option: clustering quality is almost the same with two or three groups. Profiles are not very stable over time. Finally, the score only applies to this product, and a statistical link does not prove that copying a group would increase sales." }
      ]
    },
    {
      slug: "reussite-licence-sociologie",
      title: "Succeeding in the first year of a sociology degree",
      date: "Semester 1, 2025-2026",
      kind: "Academic project",
      category: "Econometrics",
      summary: "Which student profiles pass their first semester in sociology, and can their chances be estimated at enrolment?",
      description: "Estimating the average grade and the probability of passing the first semester for incoming sociology undergraduates, using linear regression and a logit model, with an analysis of dropouts.",
      tags: ["SAS", "Linear regression", "Logit", "Excel"],
      facts: [
        { label: "Context", value: "Master SIAD, semester 1 (2025-2026), supervised by a tutor" },
        { label: "Team", value: "Pair, with Ndeye Bineta Guirane" },
        { label: "Tools", value: "SAS, Excel" },
        { label: "Deliverable", value: "Case study report" }
      ],
      highlights: [
        { value: "265", label: "social sciences (SHS) students analysed (out of 535)" },
        { value: "R² 0.32", label: "for the linear regression of the average grade" },
        { value: "+4 pts", label: "on the average grade for a baccalaureate with honours (Bien)" },
        { value: "76%", label: "probability of passing for the reference profile" }
      ],
      body: [
        { type: "h2", text: "Context and question" },
        { type: "p", text: "The Institute of Sociology and Anthropology at Lille 1 wanted to better inform and support its incoming students. The question: which personal, academic and social characteristics go hand in hand with success in the first year, can the grade or the probability of passing be estimated, and do students who drop out have a particular profile?" },
        { type: "h2", text: "The data" },
        { type: "p", text: "The file covers the 2004-2005 cohort: 535 students and 122 variables, of whom 265 students in the social sciences (SHS) track were kept for the analysis (251 who sat the exams, 14 absentees treated as “dropouts”). The target variable is the first-semester average out of 20: 9.04 on average, a median of 10.13, with very wide spreads (from 0 to 15.3)." },
        { type: "h3", text: "Preparation" },
        { type: "ul", items: [
          "Removal of undocumented, empty or redundant variables, as well as two rows of minimum and maximum values that had slipped into the file.",
          "Qualitative variables converted into dummy variables, using the most frequent categories as reference.",
          "Variables kept: sex, age, baccalaureate honours, residence in a priority urban area (ZUS), employment status and occupation of the head of household, scholarship, university catchment area. The baccalaureate track, with no significant link to the average grade, is excluded."
        ] },
        { type: "h2", text: "What the descriptive statistics show" },
        { type: "ul", items: [
          "Baccalaureate honours are the factor most strongly linked to success (correlation of 0.39): 83% of students have a pass-level grade (passable), and fewer than half of them pass their semester, compared with more than 80% for the Assez bien and Bien honours.",
          "Success declines with age (correlation of -0.29): an 87% pass rate at 17, 35% at 20.",
          "Social background matters: scholarship holders pass less often than non-holders (44% vs 61%), as do students living in a ZUS (43% vs 55%)."
        ] },
        { type: "h2", text: "Two models" },
        { type: "p", text: "The linear regression explains about 32% of the variability of the average grade (adjusted R² of 0.19). After stepwise selection, an Assez bien honours adds about 2.6 points and a Bien honours about 4 points, while an economically inactive head of household takes away about 3.3 points. Residuals are close to normally distributed and heteroscedasticity, tested with the Glejser test, remains low." },
        { type: "p", text: "The logit model, which estimates the probability of achieving an average of at least 10, retains being 19 years old (unfavourable), Assez bien honours (favourable), a retired head of household and the Valenciennes catchment area (unfavourable). For the reference profile, the probability of passing is about 76%." },
        { type: "h2", text: "What about dropouts?" },
        { type: "p", text: "I calculated a predicted score for each of the 14 students who dropped out and compared it with that of the others: 8.43 on average versus 8.82. Their starting profile is therefore slightly less favourable, but one case stands out with a score of 11.2: a dropout that the variables in the file do not explain." },
        { type: "callout", title: "Key takeaway", text: "Prior academic record, above all baccalaureate honours, outweighs everything else. The models remain guidance aids: they leave more than two thirds of the variability unexplained." },
        { type: "h2", text: "Skills applied" },
        { type: "ul", items: ["Cleaning and recoding a wide file (122 variables)", "Linear regression and logit in SAS, with residual diagnostics", "Quantified interpretation for a non-specialist audience", "Analysis of a rare event (14 dropouts)"] }
      ]
    },
    {
      slug: "panel-suisse-statut-residentiel",
      title: "Homeowner or tenant: evidence from the Swiss panel",
      date: "Nov. - Dec. 2025",
      kind: "Academic project",
      category: "Econometrics",
      summary: "What drives people to become homeowners in Switzerland: income, married life, or where they live?",
      description: "Econometric analysis of the housing tenure of more than 7,000 people in the Swiss Household Panel (2014), comparing a linear probability model and a Logit model.",
      tags: ["SAS", "Excel", "LPM", "Logit"],
      facts: [
        { label: "Context", value: "Master SIAD, econometrics course" },
        { label: "Team", value: "Group of three" },
        { label: "Tools", value: "SAS, Excel" },
        { label: "Deliverables", value: "Written report, cleaned database and SAS script" }
      ],
      highlights: [
        { value: "7,244", label: "people aged 18 to 60 after cleaning (out of 10,129)" },
        { value: "× 2.9", label: "odds of being a homeowner in a rural area" },
        { value: "× 2.3", label: "odds for married people" },
        { value: "73.2%", label: "concordant pairs for the Logit model" }
      ],
      body: [
        { type: "h2", text: "Research question" },
        { type: "p", text: "Home ownership is often seen as a sign of a stable situation, while renting can reflect mobility or budget constraints. The question: which factors explain the choice of housing tenure in Switzerland, owning or renting? The study draws on an extract of the 2014 Swiss Household Panel, for individuals aged 18 to 60." },
        { type: "h2", text: "What the literature says" },
        { type: "p", text: "The literature review guided the choice of variables. Housing is both a consumer good and an asset. Life-cycle theory (Modigliani) links access to home ownership to age and family life, the permanent income hypothesis (Friedman) puts current income into perspective, and several studies highlight the weight of the institutional context, geography and a sense of financial security." },
        { type: "h2", text: "The data" },
        { type: "p", text: "The initial database had 10,129 individuals and 117 variables. Cleaning was done in SAS, with every decision justified in the script." },
        { type: "ul", items: [
          "Target variable PROPRIO: 1 for a homeowner, 0 for a tenant. Rent-free occupants are grouped with tenants, since they do not bear the investment of buying.",
          "Income: converted into thousands of Swiss francs; the “no income” code is set to 0 (genuine economic information), and other negative codes are treated as non-responses.",
          "Twelve explanatory variables created from the original variables: income, financial satisfaction, employment, age, marriage, children, sex, education level, born in Switzerland, length of residence, rural area and region.",
          "After removing missing values, 7,244 individuals remain."
        ] },
        { type: "h2", text: "Initial observations" },
        { type: "p", text: "Eight of the twelve variables have a significant link with being a homeowner. The strongest is marriage (correlation of 0.27), far ahead of income (0.06): buying a home looks more like a household decision that pools resources than a matter of individual salary. Age and length of residence are highly correlated with each other (0.73): only age is kept in the models, which avoids redundancy and matches life-cycle theory." },
        { type: "h2", text: "LPM versus Logit" },
        { type: "p", text: "I estimated a linear probability model, easy to read in percentage points, then a Logit, which guarantees probabilities between 0 and 1. Signs and significance are very stable from one model to the other. The Logit reaches 73.2% concordant pairs (take one owner and one renter at random: the model gives the owner the higher probability 73% of the time), with a McFadden R² of 0.21 (adjusted R² of 0.15 for the LPM)." },
        { type: "table", caption: "Effect of each variable on the probability of being a homeowner", head: ["Variable", "LPM (probability points)", "Logit (odds ratio)"], rows: [
          ["Rural area", "+21.7", "2.90"],
          ["Married", "+18.6", "2.29"],
          ["Born in Switzerland", "+18.1", "2.30"],
          ["Children in the household", "+6.5", "1.37"],
          ["Financial satisfaction (per point)", "+3.1", "1.16"],
          ["Age (per year)", "+0.4", "1.017"],
          ["Employed", "-6.7", "0.73"],
          ["Education level (per level)", "-0.2", "0.99"],
          ["Net annual income", "not significant", "not significant"],
          ["Sex", "not significant", "not significant"]
        ] },
        { type: "h2", text: "What we learn" },
        { type: "ul", items: [
          "Structural factors dominate: living in a rural area nearly triples the odds of being a homeowner, and being married multiplies them by 2.3. Prices and supply differ between urban centres and outlying areas.",
          "Net annual income has no significant effect, whereas each point of financial satisfaction raises the odds by 16%. What seems to matter is the ability to manage a budget and save, more than the salary level.",
          "Being born in Switzerland multiplies the odds by 2.3, which points to transfers of wealth (gifts, inheritances) that are less accessible to people who came from abroad.",
          "The effects of education and employment are weak, or even negative: home ownership reflects a stage in the life cycle and accumulated wealth more than immediate career success.",
          "Regions 1, 4 and 6 have 40 to 45% lower odds than region 7, a sign of a highly heterogeneous housing market."
        ] },
        { type: "callout", title: "Key takeaway", text: "In Switzerland, home ownership depends more on married life, place of residence and local roots than on current income." },
        { type: "h2", text: "Limitations" },
        { type: "p", text: "The data are a 2014 snapshot: we observe associations, not cause-and-effect relationships. Income measures an annual flow, not accumulated wealth, and a variable on recent inheritances was excluded for this reason. Panel data over several years would make it possible to track the transition from tenant to homeowner." },
        { type: "h2", text: "Skills applied" },
        { type: "ul", items: ["Literature review and hypothesis formulation", "Documented cleaning of a large survey database (SAS)", "Binary outcome models: LPM and Logit, interpreted in probability points and odds ratios", "Writing a structured report for non-specialist readers"] }
      ]
    }
  ],

  skillCategories: ["Languages & statistics", "Databases", "BI & data visualisation", "Quality & tooling"],

  skills: [
    { name: "Python", category: "Languages & statistics", description: "Pandas, scikit-learn and statsmodels to clean data, build models and automate analyses.", match: ["Python", "sklearn"] },
    { name: "SQL", category: "Databases", description: "Querying and preparing data, notably on Oracle.", match: ["SQL"] },
    { name: "SAS", category: "Languages & statistics", description: "Time series, regressions, scoring and statistical reporting.", match: ["SAS"] },
    { name: "R", category: "Languages & statistics", description: "Statistics and visualisation with ggplot, in RStudio.", match: ["RStudio", "R", "RMarkdown"] },
    { name: "Statistics & ML", category: "Languages & statistics", description: "Time series, PCA, clustering, scoring and econometric modelling.", match: ["PCA", "Clustering", "Linear regression", "Logit", "LPM", "Logistic regression", "Odds ratios"] },
    { name: "Power BI", category: "BI & data visualisation", description: "Dashboards with DAX and Power Query, KPI tracking and reporting to business teams.", match: ["Power BI"] },
    { name: "Advanced Excel", category: "BI & data visualisation", description: "VBA, pivot tables and macros to automate reporting.", match: ["Excel"] },
    { name: "Shiny & Streamlit", category: "BI & data visualisation", description: "Lightweight web apps to explore analysis results.", match: ["Shiny", "Streamlit"] },
    { name: "Data quality", category: "Quality & tooling", description: "Consistency checks, anomaly detection and documentation of business rules.", match: [] },
    { name: "Git & GitHub", category: "Quality & tooling", description: "Versioning code and collaborating on a shared project.", match: [] }
  ],

  softSkills: [
    { label: "Rigour" },
    { label: "Self-reliance" },
    { label: "Curiosity" },
    { label: "Analytical mindset" },
    { label: "Organisation" },
    { label: "Proactiveness" },
    { label: "Clear communication" },
    { label: "Adaptability" },
    { label: "Team spirit" }
  ],

  experience: [
    {
      period: "January 2025 - Present", kind: "Student job", title: "Team member (multi-role)",
      description: "Team coordination and customer service in a fast-paced environment, alongside my studies.",
      links: [{ label: "Domino's Pizza" }, { label: "Lille" }]
    },
    {
      period: "April 2025 - June 2025", kind: "Internship", title: "Operations management intern",
      description: "Final-year bachelor's internship in a NOZ discount store, in a team of 9.",
      bullets: [
        "Receiving the 3 weekly deliveries and stocking shelves, with a shelf layout that changes with each arrival",
        "Helping track the store's indicators: first-week and end-of-life sell-through rates, shrinkage, weekly ranking among 350 stores",
        "What I took away: indicators were stored as one report per week, to be opened one by one and printed if needed; there was no way to compare weeks or spot trends at a glance, which slowed decisions (markdowns, returns of unsold stock)",
        "This inspired my NOZ project: a SQL, Python and Power BI pipeline that automates this tracking on a simulated store (see the Projects section)"
      ],
      links: [{ label: "NOZ" }, { label: "Saint-Pol-sur-Mer" }]
    }
  ],

  education: [
    {
      period: "2025 - 2027", kind: "Degree", title: "Master SIAD",
      description: "Statistics, econometric modelling, machine learning, SQL, ETL, data visualisation, data governance and applied AI.",
      links: [{ label: "University of Lille" }, { label: "SIAD" }]
    },
    {
      period: "2024 - 2025", kind: "Bachelor’s · with honours (Bien)", title: "Bachelor’s in Economics and Management",
      description: "Bachelor’s year at the Université du Littoral in Dunkirk, which brought me closer to data and management.",
      links: [{ label: "Université du Littoral" }, { label: "Dunkirk" }]
    },
    {
      period: "2021 - 2024", kind: "Bachelor’s", title: "Bachelor’s in International Economics",
      description: "Three years of a bachelor’s degree in international economics at the University of Lomé, Togo.",
      links: [{ label: "University of Lomé" }, { label: "Togo" }]
    },
    {
      period: "2019 - 2020", kind: "Baccalaureate · with honours (Bien)", title: "Scientific Baccalaureate",
      description: "Scientific Baccalaureate obtained in Togo, with honours (Bien).",
      links: [{ label: "Togo" }]
    }
  ],

  contact: {
    intro: "You can reach me by email or on LinkedIn.",
    mailWord: "email",
    linkedinWord: "LinkedIn",
    buttonLabel: "Send me an email"
  },

  labels: {
    skip: "Skip to content",
    menu: "Menu",
    langSwitch: "Passer le site en français",
    learnMore: "Learn more",
    close: "Close",
    scrollDown: "Scroll down",
    aboutTitle: "About me",
    worksTitle: "My work",
    worksSubtitle: "A selection of my most recent projects.",
    viewProject: "View project",
    allWorks: "See all projects",
    prev: "Previous",
    next: "Next",
    goToSlide: "Go to project {n}",
    hard: "Hard",
    soft: "Soft",
    skillsWord: "skills",
    hintHard: "Click {word} to see the soft skills",
    hintSoft: "Click {word} to see the hard skills",
    experienceTitle: "Experience",
    educationTitle: "Education",
    contactTitle: "Contact",
    createdBy: "Built by",
    all: "All",
    projectsCount: "{n} projects",
    projectCount: "1 project",
    techFilter: "Tool: {tech}",
    clearFilter: "Clear filter",
    noResults: "No project matches this filter yet.",
    skillsPageTitle: "My skills",
    skillsPageSubtitle: "The tools and methods I use, from data preparation to reporting.",
    seeProjects: "See projects",
    softSkillsTitle: "Soft skills",
    worksPageSubtitle: "All my projects, filterable by field. Each card sums up the question, the tools and the key figures.",
    breadcrumb: "Work",
    projectSheet: "Project facts",
    keyFigures: "Key figures",
    toc: "Contents",
    backToWorks: "Back to projects",
    viewCode: "View the code on GitHub",
    openApp: "Open the app",
    prevProject: "Previous project",
    nextProject: "Next project",
    notFoundTitle: "Project not found",
    notFoundText: "This project doesn’t exist or has moved.",
    page404Title: "Page not found",
    page404Text: "The page you are looking for doesn’t exist (anymore).",
    backHome: "Back to home"
  }
};
