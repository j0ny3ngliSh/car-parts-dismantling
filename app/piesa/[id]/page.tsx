"use client";

import { useState } from "react";

const piese = [
  {
    id: "bmw-001",
    nume: "Far LED Adaptiv",
    model_bmw: "G30",
    pret: 1850,
    descriere:
      "Far stânga LED adaptiv original BMW Seria 5 G30 (2017-2023). Stare excelentă, fără fisuri sau defecte. Include cablaj și modul de control.",
    imagine_placeholder:
      "https://placehold.co/400x260/1a1a2e/e2b96f?text=Far+LED+G30",
    stare: "Foarte bună",
    km: 62000,
  },
  {
    id: "bmw-002",
    nume: "Motor Diesel N57",
    model_bmw: "F10",
    pret: 8500,
    descriere:
      "Motor complet N57D30A 3.0d 258CP extras din BMW Seria 5 F10 xDrive. 112.000 km reali, verificabili. Include toate anexele. Garanție 60 zile.",
    imagine_placeholder:
      "https://placehold.co/400x260/1a1a2e/e2b96f?text=Motor+N57+F10",
    stare: "Bună",
    km: 112000,
  },
  {
    id: "bmw-003",
    nume: "Volan M-Sport cu padele",
    model_bmw: "F30",
    pret: 950,
    descriere:
      "Volan M-Sport original cu padele schimbător de viteze și butoane multifuncționale. Alcantara și piele fină. Potrivit pentru F30, F31, F34.",
    imagine_placeholder:
      "https://placehold.co/400x260/1a1a2e/e2b96f?text=Volan+M-Sport+F30",
    stare: "Excelentă",
    km: 45000,
  },
  {
    id: "bmw-004",
    nume: "Cutie Automată ZF 8HP",
    model_bmw: "G01",
    pret: 4200,
    descriere:
      "Cutie de viteze automată ZF 8HP50 extrasă din BMW X3 G01 xDrive30d. Funcționează perfect, fără erori. Pregătită pentru instalare imediată.",
    imagine_placeholder:
      "https://placehold.co/400x260/1a1a2e/e2b96f?text=Cutie+ZF+8HP+G01",
    stare: "Bună",
    km: 89000,
  },
  {
    id: "bmw-005",
    nume: "Hayon cu sticlă panoramică",
    model_bmw: "F11",
    pret: 1200,
    descriere:
      "Hayon complet BMW Seria 5 F11 Touring în culoarea Alpinweiß (A96). Fără lovituri sau rugină. Include motoare electrice, broască și cablaj.",
    imagine_placeholder:
      "https://placehold.co/400x260/1a1a2e/e2b96f?text=Hayon+F11+Touring",
    stare: "Bună",
    km: 134000,
  },
];

const modele = ["Toate", ...Array.from(new Set(piese.map((p) => p.model_bmw)))];

const stareColor: Record<string, string> = {
  Excelentă: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
  "Foarte bună": "bg-blue-900/60 text-blue-300 border border-blue-700",
  Bună: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
};

export default function Page() {
  const [filtru, setFiltru] = useState("Toate");
  const [sortare, setSortare] = useState("default");

  const pieseVizibile = piese
    .filter((p) => filtru === "Toate" || p.model_bmw === filtru)
    .sort((a, b) => {
      if (sortare === "pret-asc") return a.pret - b.pret;
      if (sortare === "pret-desc") return b.pret - a.pret;
      return 0;
    });

  return (
    <main className="min-h-screen bg-[#0d0d14] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-[#e2b96f]">
              BMW
            </span>
            <span className="text-sm font-medium text-white/40 uppercase tracking-widest border-l border-white/20 pl-3">
              Dezmembrări Premium
            </span>
          </div>
          <a
            href="tel:+37369380937"
            className="text-sm text-[#e2b96f] font-medium hover:underline"
          >
            +373 69 38 09 37
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2b96f] mb-3">
          Piese originale verificate
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
          Piese BMW de calitate,
          <br />
          <span className="text-[#e2b96f]">prețuri corecte.</span>
        </h1>
        <p className="text-white/50 text-base max-w-lg">
          Stoc permanent de piese originale extrase din vehicule accidentate sau
          uzate. Garanție pe fiecare piesă, livrare rapidă.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          {/* Model Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
              Model
            </span>
            <div className="flex flex-wrap gap-2">
              {modele.map((m) => (
                <button
                  key={m}
                  onClick={() => setFiltru(m)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${
                    filtru === m
                      ? "bg-[#e2b96f] text-[#0d0d14] border-[#e2b96f]"
                      : "bg-transparent text-white/50 border-white/15 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
              Sortare
            </span>
            <select
              value={sortare}
              onChange={(e) => setSortare(e.target.value)}
              className="bg-white/5 border border-white/15 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#e2b96f]/60 appearance-none cursor-pointer"
            >
              <option value="default">Implicit</option>
              <option value="pret-asc">Preț crescător</option>
              <option value="pret-desc">Preț descrescător</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-white/30 mt-3 pl-1">
          {pieseVizibile.length}{" "}
          {pieseVizibile.length === 1 ? "piesă găsită" : "piese găsite"}
          {filtru !== "Toate" && (
            <span className="text-[#e2b96f]"> pentru modelul {filtru}</span>
          )}
        </p>
      </section>

      {/* Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {pieseVizibile.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-4xl mb-4">○</p>
            <p className="text-lg font-semibold">Nicio piesă disponibilă</p>
            <p className="text-sm mt-1">
              Încearcă un alt filtru sau revin-o mai târziu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pieseVizibile.map((piesa) => (
              <article
                key={piesa.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#e2b96f]/40 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={piesa.imagine_placeholder}
                    alt={piesa.nume}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Model badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0d0d14]/80 backdrop-blur-sm text-[#e2b96f] text-xs font-black tracking-widest border border-[#e2b96f]/30">
                    {piesa.model_bmw}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="text-base font-bold text-white leading-snug">
                      {piesa.nume}
                    </h2>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        stareColor[piesa.stare] ??
                        "bg-white/10 text-white/60 border border-white/20"
                      }`}
                    >
                      {piesa.stare}
                    </span>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
                    {piesa.descriere}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {piesa.km.toLocaleString("ro-RO")} km
                    </span>
                    <span>•</span>
                    <span>Cod: {piesa.id.toUpperCase()}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs text-white/30 mb-0.5">Preț</p>
                      <p className="text-xl font-black text-[#e2b96f]">
                        {piesa.pret.toLocaleString("ro-RO")} lei
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-[#e2b96f] text-[#0d0d14] text-sm font-bold hover:bg-[#f0cc84] active:scale-95 transition-all">
                      Contactează
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-black text-[#e2b96f]">
            BMW Dezmembrări Premium
          </span>
          <p className="text-xs text-white/30">
            Piese verificate · Garanție inclusă · Livrare națională
          </p>
        </div>
      </footer>
    </main>
  );
}
