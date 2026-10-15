"""Build assets/data/canada-grocery.json for the interactive demos of the Canadian grocery prices project page.

    python tools/build_cgp_data.py ../canada-grocery-prices

Reads the app's published data bundle (app/data/ of github.com/david-doe/canada-grocery-prices) and keeps only
what the demos need: household cost, tariff lists, forecasts with intervals, cheese scenarios and tariff effects.
"""
import json
import sys
from pathlib import Path

import pandas as pd

SRC = Path(sys.argv[1]) / "app" / "data"
OUT = Path(__file__).resolve().parents[1] / "assets" / "data" / "canada-grocery.json"
clean = lambda s: str(s).replace(" (2013=100)", "").replace(" (202304=100)", "").replace(" (202404=100)", "")
r = lambda x, d=3: None if pd.isna(x) else round(float(x), d)

labels = pd.read_csv(SRC / "series_labels.csv")
fr = dict(zip(labels.series, labels.series_fr))
cost = pd.read_csv(SRC / "tariff_cost.csv").set_index("event_id")
b25 = pd.read_csv(SRC / "basket_2025.csv")
b26 = pd.read_csv(SRC / "basket_2026.csv")
lookup = pd.read_csv(SRC / "tariff_lookup.csv").fillna("")
fc = pd.read_csv(SRC / "forecasts.csv")
cpi = pd.read_csv(SRC / "cpi_food.csv")
scen = pd.read_csv(SRC / "scenarios_cheese.csv")
ptc = pd.read_csv(SRC / "pass_through_commodity.csv")
sc = pd.read_csv(SRC / "sc_results.csv")
notes = json.loads((SRC / "monthly_notes.json").read_text(encoding="utf-8"))

series = []
for s, g in fc.groupby("series", sort=False):
    h = cpi[(cpi.series == s) & (cpi.month >= "2019-01")].sort_values("month")
    series.append({"en": clean(s), "fr": clean(fr.get(s, s)),
                   "hist": [[m, r(v, 1)] for m, v in zip(h.month, h.value)],
                   "fc": [[m, r(a, 2), r(b, 2), r(c, 2), r(d, 2), r(e, 2)]
                          for m, a, b, c, d, e in zip(g.month, g.forecast, g.lo80, g.hi80, g.lo95, g.hi95)]})
series.sort(key=lambda d: (d["en"] != "Food purchased from stores", d["en"] != "Cheese", d["en"]))

pt = lambda ev, sample: ptc[(ptc.event_id == ev) & (ptc["sample"] == sample) & (ptc.outcome == "commodity-adjusted (lags 0-11)")].iloc[0]
data = {
    "notes": {k: notes[k] for k in ["month", "stores_yoy", "forecast_12m", "forecast_month"]},
    "cost": {ev: {"months": int(c.months), "rate": r(c.rate, 4), "share": [r(c.share_low, 5), r(c.share_central, 5), r(c.share_high, 5)],
                  "pt": [r(c.pt_low), r(c.pt_central), r(c.pt_high)]} for ev, c in cost.iterrows()},
    "basket2025": [{"en": clean(x.series), "fr": clean(x.series_fr), "w": r(x.spend_share * x.exposure, 6), "upper": bool(x.upper_bound)}
                   for x in b25.itertuples()],
    "basket2026": [{"en": x.group, "fr": x.group_fr, "w": r(x.share * x.rate / cost.loc["CA2026", "rate"], 6), "upper": bool(x.upper_bound)}
                   for x in b26.itertuples()],
    "lookup": [{"year": x.event_id[2:], "rate": x.rate, "how": x.exposure, "en": clean(x.series), "fr": clean(x.series_fr),
                "note_en": x.note_en, "note_fr": x.note_fr, "start": x.start, "end": x.end} for x in lookup.itertuples()],
    "series": series,
    "cheese": {"months": list(scen.month), "low": [r(v, 2) for v in scen["low (25%, temporary)"]],
               "central": [r(v, 2) for v in scen["central (60%)"]], "high": [r(v, 2) for v in scen["high (70%, persistent)"]]},
    "passThrough": {
        "CA2018": {"est": r(pt("CA2018", "all treated").pass_through), "lo": r(pt("CA2018", "all treated").lo), "hi": r(pt("CA2018", "all treated").hi), "boc": 0.70},
        "CA2025": {"est": r(pt("CA2025", "without coffee and confectionery").pass_through), "lo": r(pt("CA2025", "without coffee and confectionery").lo),
                   "hi": r(pt("CA2025", "without coffee and confectionery").hi), "boc": 0.25}},
    "effects": {ev: [{"en": clean(x.series), "fr": clean(fr.get(x.series, x.series)), "group": x.group, "eff": r(x.effect_during, 2), "p": r(x.p_value, 3)}
                     for x in g.sort_values("effect_during").itertuples()]
                for ev, g in sc[sc.spec == "main"].groupby("event_id")},
}
OUT.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"{OUT.name}: {OUT.stat().st_size / 1e3:.0f} kB, {len(series)} series, {len(data['lookup'])} tariff rows")
