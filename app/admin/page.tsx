"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Piesa } from "@/lib/parts";

export default function AdminIndexPage() {
  const [piese, setPiese] = useState<Piesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      setSessionChecked(true);
      await loadPiese();
    };

    init();
  }, [router]);

  const loadPiese = async () => {
    setLoading(true);
    const response = await fetch("/api/parts");
    if (!response.ok) {
      setMessage("Nu s-au putut încărca piesele.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setPiese(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Ștergi această piesă din stoc?");
    if (!confirmed) return;

    const response = await fetch(`/api/parts/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Nu s-a putut șterge piesa.");
      return;
    }

    await loadPiese();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (!sessionChecked) {
    return <p className="text-white/60">Verific autentificarea...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#e2b96f] mb-2">Admin</p>
          <h1 className="text-3xl font-black text-white">Catalog piese</h1>
          <p className="text-sm text-white/60">Gestionează catalogul de piese BMW.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/new"
            className="rounded-2xl bg-[#e2b96f] px-5 py-3 text-sm font-semibold text-[#0d0d14] hover:bg-[#d0a15c]"
          >
            Adaugă piesă
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/70 hover:border-white/20 hover:text-white"
          >
            Deconectare
          </button>
        </div>
      </div>

      {message ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{message}</p> : null}

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/80 p-8 text-white/60">Se încarcă piese...</div>
      ) : piese.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/80 p-8 text-white/60">
          Nu există piese în catalog.
        </div>
      ) : (
        <div className="grid gap-5">
          {piese.map((piesa) => (
            <div
              key={piesa.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2">{piesa.bmw_model}</p>
                  <h2 className="text-xl font-bold text-white">{piesa.name}</h2>
                  <p className="mt-2 text-sm text-white/60">{piesa.details.category}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/admin/${piesa.id}`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-[#e2b96f]/40 hover:text-[#e2b96f]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(piesa.id)}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-500/20"
                  >
                    Șterge
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/50">
                <span>{piesa.km.toLocaleString("ro-RO")} km</span>
                <span>•</span>
                <span>{piesa.price.toLocaleString("ro-RO")} lei</span>
                <span>•</span>
                <span>{piesa.condition}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
