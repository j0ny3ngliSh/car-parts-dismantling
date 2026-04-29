import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | BMW Dezmembrări",
  description: "Panou administrare piese BMW Dezmembrări Premium.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05060d] text-white">
      <header className="border-b border-white/10 bg-[#0d0d14]/90 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/admin" className="text-lg font-bold text-[#e2b96f]">
            BMW Dezmembrări Admin
          </Link>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Vizitează site
            </Link>
            <Link href="/admin/login" className="rounded-full bg-white/5 px-4 py-2 text-white hover:bg-white/10">
              Login admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
