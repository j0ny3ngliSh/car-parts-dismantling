"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Piesa } from "@/lib/parts";

const initialFormState: Piesa = {
  id: "",
  name: "",
  bmw_model: "",
  price: 0,
  description: "",
  image_placeholder: "",
  condition: "Bună",
  km: 0,
  details: {
    category: "",
    oem_code: "",
    color: "",
    manufacturing_year: "",
    warranty: "30 zile",
    compatible_with: [],
    notes: "",
  },
};

export default function NewPiesaPage() {
  const [form, setForm] = useState<Piesa>(initialFormState);
  const [compatibilTexte, setCompatibilTexte] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }
      setSessionChecked(true);
    };

    checkSession();
  }, [router]);

  const handleChange = (
    key: keyof Piesa | keyof Piesa["details"],
    value: string | number
  ) => {
    if (key in form) {
      setForm((current) => ({
        ...current,
        [key]: value,
      } as Piesa));
      return;
    }

    setForm((current) => ({
      ...current,
      details: {
        ...current.details,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...form,
      price: Number(form.price),
      km: Number(form.km),
      details: {
        ...form.details,
        compatible_with: compatibilTexte
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    };

    const response = await fetch("/api/parts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Nu s-a putut crea piesa.");
      return;
    }

    router.push("/admin");
  };

  if (!sessionChecked) {
    return <p className="text-white/60">Verific autentificarea...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#e2b96f] mb-2">Admin</p>
        <h1 className="text-3xl font-black text-white">Adaugă piesă nouă</h1>
        <p className="text-sm text-white/60">Completează detaliile pentru a adăuga o piesă în catalog.</p>
      </div>

      {message ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{message}</p> : null}

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Cod intern
            <input
              type="text"
              value={form.id}
              onChange={(event) => handleChange("id", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
          <label className="block text-sm text-white/70">
            Model BMW
            <input
              type="text"
              value={form.bmw_model}
              onChange={(event) => handleChange("bmw_model", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Nume piesă
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
          <label className="block text-sm text-white/70">
            Preț (lei)
            <input
              type="number"
              value={form.price}
              onChange={(event) => handleChange("price", Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
        </div>

        <label className="block text-sm text-white/70">
          Descriere
          <textarea
            value={form.description}
            onChange={(event) => handleChange("description", event.target.value)}
            className="mt-2 w-full min-h-[130px] rounded-3xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Imagine URL
            <input
              type="url"
              value={form.image_placeholder}
              onChange={(event) => handleChange("image_placeholder", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            />
          </label>
          <label className="block text-sm text-white/70">
            Kilometraj
            <input
              type="number"
              value={form.km}
              onChange={(event) => handleChange("km", Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Categorie
            <input
              type="text"
              value={form.details.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
              required
            />
          </label>
          <label className="block text-sm text-white/70">
            Stare
            <select
              value={form.condition}
              onChange={(event) => handleChange("condition", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            >
              <option>Bună</option>
              <option>Foarte bună</option>
              <option>Excelentă</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Cod OEM
            <input
              type="text"
              value={form.details.oem_code}
              onChange={(event) => handleChange("oem_code", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            />
          </label>
          <label className="block text-sm text-white/70">
            Culoare
            <input
              type="text"
              value={form.details.color}
              onChange={(event) => handleChange("color", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            An fabricație
            <input
              type="text"
              value={form.details.manufacturing_year}
              onChange={(event) => handleChange("manufacturing_year", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            />
          </label>
          <label className="block text-sm text-white/70">
            Garanție
            <input
              type="text"
              value={form.details.warranty}
              onChange={(event) => handleChange("warranty", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            />
          </label>
        </div>

        <label className="block text-sm text-white/70">
          Compatibil cu (separate prin virgulă)
          <input
            type="text"
            value={compatibilTexte}
            onChange={(event) => setCompatibilTexte(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
          />
        </label>

        <label className="block text-sm text-white/70">
          Observații
          <textarea
            value={form.details.notes}
            onChange={(event) => handleChange("notes", event.target.value)}
            className="mt-2 w-full min-h-[120px] rounded-3xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#e2b96f] px-5 py-3 text-sm font-semibold text-[#0d0d14] transition hover:bg-[#d0a15c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Se salvează..." : "Adaugă piesă"}
        </button>
      </form>
    </div>
  );
}
