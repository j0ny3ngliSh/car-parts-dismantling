"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

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
  const scannerId = useMemo(
    () => `html5qr-code-region-${Math.random().toString(36).slice(2)}`,
    []
  );
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lastCode, setLastCode] = useState<string>("");

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => undefined);
        try {
          scannerRef.current.clear();
        } catch (e) {
          // ignore
        }
        scannerRef.current = null;
      }
    };
  }, []);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (error) {
        console.warn("Scanner stop warning:", error);
      } finally {
        scannerRef.current = null;
        setScanning(false);
      }
    } else {
      setScanning(false);
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    if (!decodedText) return;
    setLastCode(decodedText);
    await stopScanner();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/identify-part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: decodedText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData?.error || "Error identifying the part code.");
        return;
      }

      const data = await response.json();
      if (data?.error) {
        setMessage(data.error);
        return;
      }

      onPartIdentified(data);
      setMessage("Code identified and fields updated successfully.");
    } catch (error) {
      setMessage("Network error during part identification.");
    } finally {
      setLoading(false);
    }
  };

  const handleScanFailure = (errorMessage: string) => {
    console.debug("Scan failure:", errorMessage);
  };

  const startScanner = async () => {
  if (scanning) {
    await stopScanner();
    return;
  }

  setMessage(null);
  setScanning(true);

  setTimeout(async () => {
    try {
      const html5QrCode = new Html5Qrcode(scannerId, {
        // We move formats here to be sure they are registered
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
        ],
        verbose: false
      });
      
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { 
          facingMode: "environment" 
        },
        {
          fps: 15,
          // A wider qrbox is much better for long BMW barcodes
          qrbox: { width: 300, height: 150 },
          // Force a lower resolution for faster processing on high-end iPhones
          videoConstraints: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
          }
        },
        handleScanSuccess,
        handleScanFailure
      );
    } catch (error) {
      console.error("Camera start error:", error);
      setMessage(error instanceof Error ? error.message : "Camera access denied.");
      setScanning(false);
      scannerRef.current = null;
    }
  }, 200);
};

  const handleClose = async () => {
    await stopScanner();
    setMessage(null);
    setLastCode("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <button
          type="button"
          onClick={startScanner}
          className="inline-flex items-center justify-center rounded-2xl bg-[#e2b96f] px-4 py-3 text-sm font-semibold text-[#0d0d14] transition hover:bg-[#d0a15c] disabled:opacity-60"
        >
          {scanning ? "Stop Scanning" : "Scan Code"}
        </button>
        {(scanning || loading || message) && (
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        )}
        {loading && (
          <span className="inline-flex items-center gap-2 text-sm text-white/80">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            AI identifying part...
          </span>
        )}
      </div>

      {message && (
        <p className={`text-sm ${message.includes("Error") ? "text-rose-300" : "text-emerald-300"}`}>
          {message}
        </p>
      )}

      {/* The scanning container must be present in the DOM when scanning is true */}
      {scanning && (
        <div
          id={scannerId}
          className="h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black"
          style={{ position: 'relative' }}
        />
      )}
    </div>
  );
}