"use client";

import { useState } from "react";

type IdentifyPartResponse = {
  name: string;
  bmw_model: string;
  category: string;
  oem_code: string;
  description: string;
  compatible_with: string[];
};

type PartScannerProps = {
  onPartIdentified: (data: IdentifyPartResponse) => void;
};

export default function PartScanner({ onPartIdentified }: PartScannerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    // Convert image to base64 to send to our API
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(",")[1];

      try {
        const response = await fetch("/api/identify-part", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data }), // Trimit poza, nu doar codul
        });

        if (!response.ok) throw new Error("Identificare eșuată");

        const data = await response.json();
        onPartIdentified(data);
        setMessage("Piesă identificată cu succes!");
      } catch (error) {
        setMessage("Eroare la identificare. Încearcă o poză mai clară.");
      } finally {
        setLoading(false);
        // Reset input
        e.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-4 items-center p-6 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
        <label className="cursor-pointer group flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#e2b96f] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0d0d14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">
            {loading ? "Se analizează..." : "Fă poză la etichetă"}
          </span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleCapture}
            disabled={loading}
          />
        </label>
        
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#e2b96f] animate-pulse">
            <span className="h-2 w-2 rounded-full bg-[#e2b96f]"></span>
            Gemini analizează piesa...
          </div>
        )}
      </div>

      {message && (
        <p className={`text-center text-sm ${message.includes("Eroare") ? "text-rose-300" : "text-emerald-300"}`}>
          {message}
        </p>
      )}
    </div>
  );
}