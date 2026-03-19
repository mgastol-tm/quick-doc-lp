import {
  ShieldCheck, ArrowRight, ClipboardList,
  Video, FileText,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQL4Accordion from "@/components/FAQL4Accordion";
import SocialProof from "@/components/SocialProof";
import EmbedCheckout from "@/components/EmbedCheckout";

export const metadata = {
  title: "Umów wizytę — zwolnienie lekarskie L4 online | Doktor Teraz",
  description: "Zarezerwuj konsultację lekarską online i uzyskaj e-zwolnienie (e-ZLA). Szybko, wygodnie i bez kolejek.",
  robots: { index: false, follow: true },
};

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

/* --------- Checkout Embed --------- */
function CheckoutSection() {
  return (
    <section className="bg-white">
      <div className={`${container} flex flex-col items-center gap-7 md:gap-10 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">
            UMÓW WIZYTĘ
          </span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] text-center">
            Umów wizytę online
          </h2>
        </div>
        <div className="w-full max-w-[720px]">
          <EmbedCheckout />
        </div>
      </div>
    </section>
  );
}

/* --------- Partners --------- */
const partners = [
  { name: "PZU", src: "/partners/pzu.png" },
  { name: "Allianz", src: "/partners/allianz.png" },
  { name: "AXA", src: "/partners/axa.png" },
  { name: "UNIQA", src: "/partners/uniqa.png" },
  { name: "Compensa", src: "/partners/compensa.png" },
  { name: "InterRisk", src: "/partners/interrisk.png" },
  { name: "Mondial", src: "/partners/mondial.png" },
  { name: "Signal Iduna", src: "/partners/signal-iduna.png" },
  { name: "Saltus", src: "/partners/saltus.png" },
  { name: "TU Zdrowie", src: "/partners/tu-zdrowie.png" },
];

function Partners() {
  return (
    <section className="bg-white border-y border-qd-border overflow-hidden py-8 md:py-10">
      <div className="flex flex-col items-center gap-5 md:gap-6">
        <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-text-secondary tracking-[2px]">
          NASI PARTNERZY
        </span>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-[marquee_25s_linear_infinite] will-change-transform [backface-visibility:hidden]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {partners.map(({ name, src }) => (
                  <div key={`${name}-${copy}`} className="flex items-center justify-center w-[120px] md:w-[180px] shrink-0">
                    <Image src={src} alt={name} width={180} height={64} loading="eager" className="h-12 md:h-16 w-auto object-contain opacity-40 grayscale" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}

/* --------- How It Works --------- */
const steps = [
  { num: "1", icon: Video, title: "Telekonsultacja", desc: "Umów się na wizytę online. Lekarz skontaktuje się z Tobą telefonicznie, przez wideo lub czat — wygodnie, z domu." },
  { num: "2", icon: ClipboardList, title: "Opisz objawy", desc: "Opowiedz lekarzowi o swoich dolegliwościach. Lekarz przeprowadzi wywiad i postawi diagnozę." },
  { num: "3", icon: FileText, title: "Otrzymaj zalecenia i e-ZLA", desc: "Lekarz przekaże zalecenia medyczne. Jeśli zachodzi potrzeba — wystawi e-zwolnienie (e-ZLA), widoczne od razu na koncie IKP." },
];

function HowItWorks() {
  return (
    <section className="bg-qd-section-light">
      <div className={`${container} flex flex-col items-center gap-7 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">
            JAK TO DZIAŁA
          </span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] text-center">
            Jak uzyskać zwolnienie lekarskie online?
          </h2>
          <p className="font-body text-sm md:text-base text-qd-text-secondary text-center">
            Bez umawiania wizyt. Cały proces zrealizujesz z telefonu lub laptopa.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="flex-1 bg-qd-section-light border border-qd-border rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-row md:flex-col items-start gap-3.5 md:gap-5">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-qd-primary rounded-full flex items-center justify-center shrink-0">
                <span className="font-heading text-base md:text-xl font-semibold text-white">{num}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-5 flex-1">
                <Icon className="hidden md:block w-8 h-8 text-qd-primary" />
                <h3 className="font-heading text-base md:text-xl font-semibold text-qd-text">{title}</h3>
                <p className="font-body text-[13px] md:text-sm text-qd-text-secondary leading-[1.5] md:leading-[1.6]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------- Pricing --------- */
const features = [
  "Wideokonsultacja z lekarzem specjalistą",
  "Oficjalne elektroniczne zwolnienie lekarskie",
  "Wysyłka do ZUS i pracodawcy automatycznie",
  "Dostępne 24/7, 365 dni w roku",
];

function Pricing() {
  return (
    <section className="bg-white">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">CENNIK</span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Ile kosztuje zwolnienie lekarskie online?
          </h2>
          <p className="font-body text-sm md:text-base text-qd-text-secondary text-center">
            Jedna stała opłata. Bez ukrytych kosztów, bez subskrypcji.
          </p>
        </div>

        <div className="w-full max-w-[520px] border border-qd-border rounded-2xl bg-white overflow-hidden">
          <div className="p-6 md:p-8 pb-5 md:pb-6 border-b border-qd-border flex flex-col gap-2">
            <h3 className="font-heading text-base md:text-lg font-semibold text-qd-text">Konsultacja online</h3>
            <p className="font-body text-[13px] md:text-sm text-qd-text-secondary leading-[1.5]">
              Konsultacja lekarska z fokusem na zwolnienie lekarskie (e-ZLA).
            </p>
            <div className="flex items-end gap-1 mt-1">
              <span className="font-heading text-[32px] md:text-[40px] font-semibold text-qd-text tracking-[-1px]">79 zł</span>
              <span className="font-body text-[13px] md:text-sm text-qd-text-secondary pb-1">/ konsultacja</span>
            </div>
          </div>

          <div className="p-6 md:px-8 md:py-6 flex flex-col gap-2.5 md:gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2 md:gap-2.5">
                <ShieldCheck className="w-4 h-4 text-qd-primary shrink-0" />
                <span className="font-body text-[13px] md:text-sm text-qd-text">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-body text-[11px] md:text-xs text-qd-text-secondary text-center max-w-[520px]">
          Decyzja o wystawieniu zwolnienia lekarskiego zawsze należy do lekarza. Opłata obejmuje konsultację, niezależnie od jej wyniku.
        </p>
      </div>
    </section>
  );
}

/* --------- FAQ --------- */
function FAQ() {
  return (
    <section className="bg-qd-section-light">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20 max-w-[800px]`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">FAQ</span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Zwolnienie lekarskie online — pytania i odpowiedzi
          </h2>
        </div>

        <FAQL4Accordion />
      </div>
    </section>
  );
}

/* --------- Final CTA --------- */
function FinalCTA() {
  return (
    <section className="bg-qd-primary">
      <div className={`${container} flex flex-col items-center gap-6 md:gap-8 py-12 md:py-20`}>
        <h2 className="font-heading text-[26px] md:text-[44px] font-semibold text-white tracking-[-1px] text-center">
          Źle się czujesz? Nie czekaj.
        </h2>
        <p className="font-body text-[15px] md:text-lg text-white/90 text-center">
          Uzyskaj zwolnienie lekarskie online — wygodnie, szybko i bez kolejek.
        </p>
        <a href="/zwolnienia-lekarskie-online-l4/umow-wizyte" className="bg-white font-heading text-[15px] md:text-base font-semibold text-qd-primary px-7 md:px-8 py-3.5 md:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
          Rozpocznij wizytę <span className="text-qd-primary">79 zł</span> <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] text-qd-primary" />
        </a>
        <p className="font-body text-xs md:text-[13px] text-white/90 text-center">
          Bez subskrypcji — płacisz tylko wtedy, gdy potrzebujesz
        </p>
      </div>
    </section>
  );
}

/* --------- Page --------- */
export default function UmowWizyteL4() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <CheckoutSection />
      <SocialProof />
      <Partners />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
