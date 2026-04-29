import Link from "next/link";
import { Piesa } from "@/lib/piese";

const stareColor: Record<string, string> = {
  Excelentă: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
  "Foarte bună": "bg-blue-900/60 text-blue-300 border border-blue-700",
  Bună: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
};

export function PiesaCard({ piesa }: { piesa: Piesa }) {
  return (
    <Link href={`/piesa/${piesa.id}`} className="group block">
      <article className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#e2b96f]/40 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden cursor-pointer">
        {/* Imagine */}
        <div className="relative overflow-hidden">
          <img
            src={piesa.imagine_placeholder}
            alt={piesa.nume}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0d0d14]/80 backdrop-blur-sm text-[#e2b96f] text-xs font-black tracking-widest border border-[#e2b96f]/30">
            {piesa.model_bmw}
          </span>
          {/* Hover overlay cu "Vezi detalii" */}
          <div className="absolute inset-0 bg-[#0d0d14]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 rounded-xl bg-[#e2b96f] text-[#0d0d14] text-sm font-bold">
              Vezi detalii →
            </span>
          </div>
        </div>

        {/* Conținut */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h2 className="text-base font-bold text-white leading-snug group-hover:text-[#e2b96f] transition-colors">
              {piesa.nume}
            </h2>
            <span
              className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold ${
                stareColor[piesa.stare] ?? "bg-white/10 text-white/60 border border-white/20"
              }`}
            >
              {piesa.stare}
            </span>
          </div>

          <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1 line-clamp-3">
            {piesa.descriere}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
            <span>{piesa.km.toLocaleString("ro-RO")} km</span>
            <span>·</span>
            <span>{piesa.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div>
              <p className="text-xs text-white/30 mb-0.5">Preț</p>
              <p className="text-xl font-black text-[#e2b96f]">
                {piesa.pret.toLocaleString("ro-RO")} lei
              </p>
            </div>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white/60 text-sm font-semibold group-hover:bg-[#e2b96f] group-hover:text-[#0d0d14] group-hover:border-[#e2b96f] transition-all">
              Detalii →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
