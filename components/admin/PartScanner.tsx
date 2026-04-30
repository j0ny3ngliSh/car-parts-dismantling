"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

/**
 * Expected shape of the AI identification response
 */
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
  // Generate a unique ID for the scanner container to avoid DOM conflicts
  const scannerId = useMemo(
    () => `html5qr-code-region-${Math.random().toString(36).slice(2)}`,
    []
  );
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lastCode, setLastCode] = useState<string>("");

  // Component cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        // .stop() is asynchronous and returns a Promise
        scannerRef.current.stop().catch(() => undefined);
        
        // .clear() is synchronous (void), so calling .catch() on it causes build errors
        try {
          scannerRef.current.clear();
        } catch (e) {
          // Ignore sync cleanup errors
        }
        scannerRef.current = null;
      }
    };
  }, []);

  /**
   * Stops the camera and clears the scanner instance
   */
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        // Check if scanner is actually active before attempting to stop
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        // Sync cleanup of the DOM elements
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

  /**
   * Triggered when a barcode/QR is successfully detected
   */
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
        setMessage(
          errorData?.error || "Error identifying the part code."
        );
        return;
      }

      const data = await response.json();
      if (data?.error) {
        setMessage(data.error);
        return;
      }

      // Update the parent form with identified data
      onPartIdentified(data);
      setMessage("Code identified and fields updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Network error during part identification."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScanFailure = (errorMessage: string) => {
    // Keep scanning and ignore routine decode failures
    console.debug("Scan failure:", errorMessage);
  };

  /**
   * Initializes and starts the camera stream
   */
  const startScanner = async () => {
    if (scanning) {
      await stopScanner();
      return;
    }

    setMessage(null);
    setScanning(true);

    // FIX: Pass supported formats here, during initialization
    const html5QrCode = new Html5Qrcode(scannerId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODABAR,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
      ],
      verbose: false
    });
    
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" }, // Prefer back camera
        {
          fps: 10,
          qrbox: 250,
          // formatsToSupport was removed from here
        },
        handleScanSuccess,
        handleScanFailure
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Camera access denied or unavailable."
      );
      setScanning(false);
      scannerRef.current = null;
    }
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
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-[#e2b96f] px-4 py-3 text-sm font-semibold text-[#0d0d14] transition hover:bg-[#d0a15c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {scanning ? "Stop Scanning" : "Scan Code"}
        </button>
        {(scanning || loading || message) && (
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Close
          </button>
        )}
        {loading ? (
          <span className="inline-flex items-center gap-2 text-sm text-white/80">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            AI identifying part...
          </span>
        ) : null}
      </div>

      {message ? (
        <p className={`text-sm ${message.includes("Error") || message.includes("denied") ? "text-rose-300" : "text-emerald-300"}`}>
          {message}
        </p>
      ) : null}

      {lastCode ? (
        <p className="text-xs text-white/50">Last scanned code: {lastCode}</p>
      ) : null}

      {scanning ? (
        <div
          id={scannerId}
          className="h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14]"
        />
      ) : null}
    </div>
  );
}