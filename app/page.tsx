"use client";

import { useState } from "react";
import { PiesaCard } from "@/components/PiesaCard";
import { piese } from "@/lib/piese";

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
            069 38 09 37
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
            {pieseVizibile.map((p) => <PiesaCard key={p.id} piesa={p} />)}
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