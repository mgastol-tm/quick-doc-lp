"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    TelemediCheckout?: {
      mount: (config: TelemediMountConfig) => void;
      unmount: (containerId: string) => void;
    };
  }
}

interface TelemediMountConfig {
  containerId: string;
  mode: string;
  channel: string;
  source: string;
  detailedSource: string;
  hideHeader: boolean;
  hideGoOption: boolean;
  onSuccess?: (result: { consultationId: string; surveyUrl?: string }) => void;
  onError?: (error: { message: string }) => void;
  onHeightChange?: (height: number) => void;
}

const CONTAINER_ID = "checkout-embed";
const SCRIPT_URL =
  "https://telemedi.com/pl/lekarze/embed/checkout-embed.js";
const LOAD_TIMEOUT_MS = 10_000;

type EmbedState = "loading" | "ready" | "success" | "error" | "fallback";

export default function EmbedCheckout() {
  const [state, setState] = useState<EmbedState>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState(0);
  const mountedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function mountEmbed() {
      if (!window.TelemediCheckout || mountedRef.current) return;

      // Forward sessionStorage tracking params via URL (Task 2.2)
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
        // sessionStorage unavailable — continue without params
      }

      try {
        window.TelemediCheckout.mount({
          containerId: CONTAINER_ID,
          mode: "sickLeave",
          channel: "phone",
          source: "quickdoc",
          detailedSource: `doktorteraz.pl${window.location.pathname}`,
          hideHeader: true,
          hideGoOption: true,
          onSuccess: (result) => {
            if (result.surveyUrl) {
              setSurveyUrl(result.surveyUrl);
            }
            setState("success");
          },
          onError: (error) => {
            setErrorMsg(error.message || "Wystapil blad. Sprobuj ponownie.");
            setState("error");
          },
          onHeightChange: (height) => {
            if (height > 0) {
              setIframeHeight(height);
              setState((prev) => prev === "loading" ? "ready" : prev);
            }
          },
        });
        mountedRef.current = true;
      } finally {
        // Restore original URL immediately
        window.history.replaceState(null, "", originalUrl);
      }
    }

    // Check if script is already loaded
    if (window.TelemediCheckout) {
      mountEmbed();
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-cookieconsent", "ignore");
    scriptRef.current = script;

    script.onload = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      mountEmbed();
    };

    script.onerror = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("fallback");
    };

    // Timeout fallback if script hangs
    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) {
        setState("fallback");
      }
    }, LOAD_TIMEOUT_MS);

    document.body.appendChild(script);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (mountedRef.current && window.TelemediCheckout) {
        window.TelemediCheckout.unmount(CONTAINER_ID);
        mountedRef.current = false;
      }
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  // Success state
  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="w-16 h-16 bg-qd-primary-light rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-qd-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-qd-text">
          Wizyta umowiona!
        </h3>
        <p className="font-body text-sm md:text-base text-qd-text-secondary max-w-md">
          Twoja konsultacja zostala zarezerwowana. Lekarz skontaktuje sie z Toba wkrotce.
        </p>
        {surveyUrl && (
          <a
            href={surveyUrl}
            className="bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold px-8 py-3.5 md:py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Przejdz do ankiety
          </a>
        )}
      </div>
    );
  }

  // Error state
  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="font-body text-sm md:text-base text-red-600">
          {errorMsg || "Wystapil blad podczas ladowania formularza."}
        </p>
        <a
          href="/wizyta"
          className="font-body text-sm text-qd-primary underline hover:opacity-80"
        >
          Przejdz do strony wizyty
        </a>
      </div>
    );
  }

  // Fallback state (script failed to load)
  if (state === "fallback") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="font-body text-sm md:text-base text-qd-text-secondary">
          Nie udalo sie zaladowac formularza rezerwacji.
        </p>
        <a
          href="/wizyta"
          className="bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold px-8 py-3.5 md:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          Przejdz do strony wizyty
        </a>
      </div>
    );
  }

  // Loading + ready states
  return (
    <div className="w-full relative">
      {/* Shimmer skeleton - absolutely positioned over the embed while loading */}
      {state === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col gap-4 animate-pulse bg-white">
          <div className="h-12 bg-qd-primary/10 rounded-xl" />
          <div className="h-64 bg-qd-primary/10 rounded-xl" />
          <div className="h-12 bg-qd-primary/10 rounded-xl w-2/3 mx-auto" />
        </div>
      )}
      {/* Embed container — always visible and full-size so iframe can render */}
      <div
        id={CONTAINER_ID}
        style={{
          overflow: "hidden",
          minHeight: state === "loading" ? "400px" : undefined,
          width: "100%",
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
