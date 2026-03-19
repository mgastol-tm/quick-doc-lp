"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    TelemediFindDoctorWidget?: {
      mount: (config: Record<string, unknown>) => void;
      unmount: (containerId: string) => void;
    };
  }
}

const WIDGET_CONTAINER_ID = "find-doctor-widget";
const SCRIPT_URL =
  "https://telemedi.com/pl/lekarze/widget/telemedi-find-doctor-widget.js";
const LOAD_TIMEOUT_MS = 15_000;

export default function EmbedFindDoctor() {
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function mountWidget() {
      if (!window.TelemediFindDoctorWidget || mountedRef.current) return;

      // Forward sessionStorage tracking params via URL
      const originalUrl = window.location.href;
      try {
        const stored = JSON.parse(
          sessionStorage.getItem("initialSearchParams") || "{}"
        );
        const params = new URLSearchParams(window.location.search);
        let modified = false;
        for (const [key, value] of Object.entries(stored)) {
          if (typeof value === "string" && value && !params.has(key)) {
            params.set(key, value);
            modified = true;
          }
        }
        if (modified) {
          const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
          window.history.replaceState(null, "", newUrl);
        }
      } catch {
        // sessionStorage unavailable
      }

      try {
        window.TelemediFindDoctorWidget.mount({
          containerId: WIDGET_CONTAINER_ID,
          apiHost: "https://telemedi.co",
          detailedSource: `doktorteraz.pl${window.location.pathname}`,
          checkoutEmbed: true,
          hideGoOption: true,
          hideNfzOption: true,
          onCheckoutSuccess: (result: Record<string, unknown>) => {
            console.log("Booking success:", result.consultationId);
          },
        });
        mountedRef.current = true;
      } finally {
        window.history.replaceState(null, "", originalUrl);
      }
    }

    // Already loaded (e.g. strict mode re-run or cached script)
    if (window.TelemediFindDoctorWidget) {
      mountWidget();
      return;
    }

    // Check if script tag already exists (strict mode re-run)
    const existingScript = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      // Script tag exists but hasn't loaded yet — wait for it
      const onLoad = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        mountWidget();
      };
      const onError = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setFailed(true);
      };
      existingScript.addEventListener("load", onLoad);
      existingScript.addEventListener("error", onError);

      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) setFailed(true);
      }, LOAD_TIMEOUT_MS);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        existingScript.removeEventListener("load", onLoad);
        existingScript.removeEventListener("error", onError);
      };
    }

    // First mount — create and append script
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-cookieconsent", "ignore");

    script.onload = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      mountWidget();
    };

    script.onerror = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setFailed(true);
    };

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) setFailed(true);
    }, LOAD_TIMEOUT_MS);

    document.body.appendChild(script);

    // Don't remove the script on cleanup — let it persist for re-mounts
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (mountedRef.current && window.TelemediFindDoctorWidget) {
        window.TelemediFindDoctorWidget.unmount(WIDGET_CONTAINER_ID);
        mountedRef.current = false;
      }
    };
  }, []);

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="font-body text-sm md:text-base text-qd-text-secondary">
          Nie udało się załadować formularza rezerwacji.
        </p>
        <a
          href="/wizyta"
          className="bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold px-8 py-3.5 md:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          Przejdź do strony wizyty
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{`#${WIDGET_CONTAINER_ID} [class*="avg-time"], #${WIDGET_CONTAINER_ID} [class*="avgTime"], #${WIDGET_CONTAINER_ID} [class*="wait-time"], #${WIDGET_CONTAINER_ID} [class*="waitTime"] { display: none !important; }`}</style>
      <div id={WIDGET_CONTAINER_ID} style={{ width: "100%" }} />
    </div>
  );
}
