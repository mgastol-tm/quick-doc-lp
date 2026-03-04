"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const widgetConfig = {
  targetElementID: "telemedico-widget",
  apiHost: "https://telemedi.co",
  apiKey: " ",
  logoImage: "",
  displayMode: "regular",
  splashScreen: false,
  splashScreenBackgroundImage: "",
  formDescription: "",
  fullWidthLayout: true,
  widgetHost: "https://widget.telemedi.com/consbook-widget/",
  covidVisibility: false,
  saveSession: false,
  loadSession: false,
  defaultStrategy: "newUserStrategy",
  showUserSessionStatus: false,
  VPOZDeclarationsPromotionCodeSource: "",
  additionalPaymentLinkRedirectURL: true,
  dashboardHost: "https://panel.telemedi.com",
  ignoredChannels: [] as string[],
  defaultChannel: "PHONE",
  language: "pl",
  referralPromotionEnabled: false,
  detailedSource: "quickdoc",
  fusionAuthEnabled: true,
  fusionAuthHost: "https://sso-middleware.telemedi.com",
  clinicId: "e255f0a2-36e6-4b41-b6c3-580669d42cbc",
  sickLeaveSpecializationId: "9e7ce922-8a0a-494e-8525-754b120c03dd",
  targetenv: "production",
  visitDatePicker: "sickleave",
  shouldPaymentProviderRedirectBackToCurrentHost: true,
  shouldAddLanguageToRedirectUrl: true,
  telemediSubscriptionEnabled: false,
  enabledTelemediGoInEprescription: false,
  enabledTelemediGoInSickLeave: false,
  showPozButton: false,
  showFreePozTerms: false,
  showPaidVisitsOnly: true,
  otherMessagesForB2bClinicEnabled: true,
};

export default function WizytaPage() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    win.Telemedico = win.Telemedico || function (...args: unknown[]) {
      (win.Telemedico.q = win.Telemedico.q || []).push(args);
    };

    const js = document.createElement("script");
    js.id = "Telemedico";
    js.src = "https://widget.telemedi.com/consbook-widget/widget.js";
    js.async = true;
    const fjs = document.getElementsByTagName("script")[0];
    fjs.parentNode!.insertBefore(js, fjs);

    win.Telemedico(widgetConfig);

    // Inject styles into shadow root to hide POZ/NFZ elements
    const hideStyles = `
      .fk-footer__poz,
      .fk-footer__not-logged-user-poz,
      .poz-info,
      .poz-data,
      .info-content-poz,
      .fk-declaration-info__poz-signup-mobile,
      [class*="poz-signup"],
      [class*="book-free"] {
        display: none !important;
      }
    `;

    const observer = new MutationObserver(() => {
      const widgetEl = document.getElementById("telemedico-widget");
      if (!widgetEl) return;
      const shadowRoot = widgetEl.shadowRoot || widgetEl.querySelector("*")?.shadowRoot;
      if (shadowRoot && !shadowRoot.querySelector("#qd-hide-poz")) {
        const style = document.createElement("style");
        style.id = "qd-hide-poz";
        style.textContent = hideStyles;
        shadowRoot.appendChild(style);
      }
      // Also check children for shadow roots
      widgetEl.querySelectorAll("*").forEach((el) => {
        const sr = el.shadowRoot;
        if (sr && !sr.querySelector("#qd-hide-poz")) {
          const style = document.createElement("style");
          style.id = "qd-hide-poz";
          style.textContent = hideStyles;
          sr.appendChild(style);
        }
      });
    });

    observer.observe(document.getElementById("telemedico-widget") || document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      const el = document.getElementById("Telemedico");
      if (el) el.remove();
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-1 bg-white">
        <div className="max-w-[1240px] mx-auto w-full px-5 md:px-10 pt-8 md:pt-12 pb-12 md:pb-20">
          <div id="telemedico-widget" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
