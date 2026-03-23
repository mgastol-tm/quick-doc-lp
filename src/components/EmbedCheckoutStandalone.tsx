"use client";

import { useEffect, useRef, useState } from "react";

const CONTAINER_ID = "checkout-standalone";
const SCRIPT_URL =
  "https://telemedi.com/pl/lekarze/widget/telemedi-checkout-widget.js";
const LOAD_TIMEOUT_MS = 15_000;

export default function EmbedCheckoutStandalone() {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function mountWidget() {
      if (!window.TelemediCheckout || mountedRef.current) return;

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
        window.TelemediCheckout.mount({
          containerId: CONTAINER_ID,
          mode: "sickLeave",
          source: `doktorteraz.pl${window.location.pathname}`,
          hideHeader: true,
          hideGoOption: true,
          blikEnabled: false,
          onSuccess: (result) => {
            console.log("Checkout success:", result);
          },
          onError: (error) => {
            console.error("Checkout error:", error);
          },
          onPaymentRedirect: (url: string) => {
            window.location.href = url;
          },
        });
        mountedRef.current = true;
        setLoading(false);
      } finally {
        window.history.replaceState(null, "", originalUrl);
      }
    }

    // Already loaded
    if (window.TelemediCheckout) {
      mountWidget();
      return;
    }

    // Check for existing script tag (React strict mode)
    const existingScript = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
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

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (mountedRef.current && window.TelemediCheckout) {
        window.TelemediCheckout.unmount(CONTAINER_ID);
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
    <div className="w-full relative">
      {loading && (
        <div className="flex flex-col gap-4 p-5 md:p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl w-1/2" />
          <div className="h-14 bg-gray-200 rounded-full w-2/3 mx-auto mt-2" />
        </div>
      )}
      <div id={CONTAINER_ID} style={{ width: "100%" }} />
    </div>
  );
}
