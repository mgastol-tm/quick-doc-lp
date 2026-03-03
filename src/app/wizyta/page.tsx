"use client";

import { useEffect } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    Telemedico: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

export default function WizytaPage() {
  useEffect(() => {
    window.Telemedico =
      window.Telemedico ||
      function (...args: unknown[]) {
        (window.Telemedico.q = window.Telemedico.q || []).push(args);
      };

    window.Telemedico({
      visitDatePicker: "sickleave",
      sickLeaveSpecializationId: "00d6ee7d-deea-43fc-81f6-0013c9561ba2",
    });
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-1 bg-white">
        <div id="telemedico-widget" className="pt-8 md:pt-12" />
      </section>
      <Footer />
      <Script
        src="https://widget.telemedi.com/consbook-widget/widget.js"
        id="telemedico-script"
        strategy="afterInteractive"
      />
    </main>
  );
}
