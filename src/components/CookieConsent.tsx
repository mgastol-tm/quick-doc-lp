"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.fromEntries(args.map((a, i) => [String(i), a])));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_personalization: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
      });
    }
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-[720px] mx-auto bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="font-body text-[13px] md:text-sm text-qd-text-secondary leading-[1.5] flex-1">
          Korzystamy z plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie.
          Więcej informacji w naszej{" "}
          <a href="/polityka-prywatnosci" className="underline text-qd-primary hover:opacity-80">
            polityce prywatności
          </a>.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={reject}
            className="font-heading text-[13px] md:text-sm font-medium text-qd-text-secondary px-4 py-2 rounded-full border border-qd-border hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Odrzuć
          </button>
          <button
            onClick={accept}
            className="font-heading text-[13px] md:text-sm font-semibold text-white bg-qd-primary px-4 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
