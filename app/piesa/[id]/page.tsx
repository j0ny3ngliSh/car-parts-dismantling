import { notFound } from "next/navigation";
import Link from "next/link";
import { getPiesaById } from "@/lib/parts";

const WHATSAPP_NR = "37369380937";

const stareStyle: Record<string, string> = {
  Excelentă: "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60",
  "Foarte bună": "bg-blue-900/50 text-blue-300 border border-blue-700/60",
  Bună: "bg-amber-900/50 text-amber-300 border border-amber-700/60",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-white/[0.07] last:border-0">
      <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/35">
        {label}
      </span>
      <span className="text-sm text-white/80 leading-relaxed">{value}</span>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const piesa = await getPiesaById(id);
  
  if (!piesa) return { title: "Piesă negăsită" };

  return {
    title: `${piesa.name} ${piesa.bmw_model} – BMW Dezmembrări`,
    description: piesa.description,
  };
}

export default async function PiesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const piesa = await getPiesaById(id);

  if (!piesa) notFound();

  const { details } = piesa;
  const mesajWA = encodeURIComponent(
    `Bună ziua! Sunt interesat de piesa *${piesa.name}* (${piesa.bmw_model}) – cod ${piesa.id.toUpperCase()}. ` +
      `Preț afișat: ${piesa.price.toLocaleString("ro-RO")} lei. Puteți da mai multe detalii?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NR}?text=${mesajWA}`;

  return (
    <main className="min-h-screen bg-[#0d0d14] text-white font-sans">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-black text-[#e2b96f]">BMW</span>
            <span className="text-xs font-semibold text-white/35 uppercase tracking-widest border-l border-white/20 pl-3 group-hover:text-white/60 transition-colors">
              Dezmembrări Premium
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi la catalog
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
          <Link href="/" className="hover:text-[#e2b96f] transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-[#e2b96f]">{details.category}</span>
          <span>/</span>
          <span className="text-white/50">{piesa.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-8">
              <img
                src={piesa.image_placeholder}
                alt={piesa.name}
                className="w-full object-cover h-72 lg:h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14]/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-[#0d0d14]/85 backdrop-blur-sm text-[#e2b96f] text-xs font-black tracking-widest border border-[#e2b96f]/30">
                  {piesa.bmw_model}
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${stareStyle[piesa.condition]}`}>
                  {piesa.condition}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-white/40 mb-0.5">Cod intern</p>
                <p className="text-sm font-mono font-bold text-white/70">{piesa.id.toUpperCase()}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2b96f] mb-2">{details.category}</p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4 leading-tight">{piesa.name}</h1>
              <p className="text-base text-white/55 leading-relaxed">{piesa.description}</p>
            </div>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-5">Specificații tehnice</h2>
              {details.oem_code && <Row label="Cod OEM" value={details.oem_code} />}
              {details.color && <Row label="Culoare" value={details.color} />}
              {details.manufacturing_year && <Row label="An fabricație" value={details.manufacturing_year} />}
              <Row label="Kilometraj" value={`${piesa.km.toLocaleString("ro-RO")} km`} />
              <Row label="Stare" value={piesa.condition} />
              <Row label="Garanție" value={details.warranty} />
              <Row label="Categorie" value={details.category} />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-5">Compatibil cu</h2>
              <ul className="space-y-2">
                {details.compatible_with.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e2b96f] shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            {details.notes && (
              <section className="rounded-2xl border border-amber-800/40 bg-amber-900/10 p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-amber-400/70 mb-3">Observații importante</h2>
                <p className="text-sm text-amber-200/70 leading-relaxed">{details.notes}</p>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
              <div className="mb-6">
                <p className="text-xs text-white/35 uppercase tracking-widest mb-1">Preț</p>
                <p className="text-4xl font-black text-[#e2b96f] leading-none">
                  {piesa.price.toLocaleString("ro-RO")}
                  <span className="text-xl font-semibold ml-2 text-[#e2b96f]/70">lei</span>
                </p>
                <p className="text-xs text-white/30 mt-2">TVA inclus · Preț negociabil</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Model", value: piesa.bmw_model },
                  { label: "Km", value: `${(piesa.km / 1000).toFixed(0)}k` },
                  { label: "Stare", value: piesa.condition },
                  { label: "Garanție", value: details.warranty },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.07]">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
                    <p className="text-sm font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#e2b96f] px-4 py-3 text-sm font-semibold text-[#0d0d14] transition hover:bg-[#d0a15c]"
              >
                Contactează prin WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}