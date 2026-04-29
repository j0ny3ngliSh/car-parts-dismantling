"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10 max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[#e2b96f] mb-3">Acces administrare</p>
        <h1 className="text-3xl font-black text-white">Login admin</h1>
        <p className="mt-2 text-sm text-white/60">Autentificare pentru a gestiona piese și stocul online.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm text-white/70">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            required
          />
        </label>

        <label className="block text-sm text-white/70">
          Parolă
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0d14] px-4 py-3 text-white outline-none focus:border-[#e2b96f]"
            required
          />
        </label>

        {message ? <p className="text-sm text-rose-300">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#e2b96f] px-5 py-3 text-sm font-semibold text-[#0d0d14] transition hover:bg-[#d0a15c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Se autentifică..." : "Autentificare"}
        </button>
      </form>
    </div>
  );
}
