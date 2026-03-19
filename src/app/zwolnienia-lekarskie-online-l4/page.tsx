import {
  ShieldCheck, Clock4, FileCheck, ArrowRight, ClipboardList,
  Video, FileText, Zap, Laptop, Shield, Lock,
  MonitorPlay, UserRound, FileBadge, PhoneCall,
  BookOpen, Building2, Globe, CalendarDays,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQL4Accordion from "@/components/FAQL4Accordion";
import SocialProof from "@/components/SocialProof";
import EmbedCheckout from "@/components/EmbedCheckout";
import { faqItems } from "@/data/faq-l4";

export const metadata = {
  title: "Zwolnienie lekarskie online (L4) — lekarz w 1 godzinę | Doktor Teraz",
  description: "Zwolnienie lekarskie online (e-ZLA) od 79 zł. Lekarz w ciągu godziny — legalnie, 24/7. Ponad 500 specjalistów, 4.9/5 ocena. Doktor Teraz.",
  alternates: {
    canonical: "https://doktorteraz.pl/zwolnienia-lekarskie-online-l4",
  },
};

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

/* ───────── JSON-LD Structured Data ───────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Doktor Teraz",
  url: "https://doktorteraz.pl",
  description: "Konsultacje lekarskie online ze zwolnieniem lekarskim (e-ZLA)",
  medicalSpecialty: "General Practice",
  availableService: {
    "@type": "MedicalTherapy",
    name: "Konsultacja lekarska online z e-zwolnieniem",
    serviceType: "Telehealth",
  },
  priceRange: "79 PLN",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "40000",
    bestRating: "5",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://doktorteraz.pl" },
    { "@type": "ListItem", position: 2, name: "Zwolnienie lekarskie online (L4)", item: "https://doktorteraz.pl/zwolnienia-lekarskie-online-l4" },
  ],
};

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="bg-qd-section-green">
      <div className={`${container} flex flex-col md:flex-row items-start gap-7 md:gap-[60px] py-10 md:py-20`}>
        <div className="flex flex-col gap-7 md:gap-8 flex-1 md:sticky md:top-24">
          {/* Badge */}
          <div className="flex items-center gap-1.5 md:gap-2 bg-qd-primary-light border border-[#0B8A5E33] rounded-full px-3 md:px-3.5 py-[5px] md:py-1.5 w-fit">
            <span className="w-[6px] h-[6px] md:w-2 md:h-2 rounded-full bg-qd-primary" />
            <span className="font-body text-[11px] md:text-[13px] font-medium text-[#066B48]">
              Dostępne 24/7 — Bez kolejek
            </span>
          </div>

          <h1 className="font-heading text-[32px] md:text-[52px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] leading-[1.1] md:leading-[1.05] max-w-[580px]">
            Konsultacja ze zwolnieniem lekarskim L4 online
          </h1>

          <p className="font-body text-[15px] md:text-lg text-[#555555] leading-[1.5] md:leading-[1.6] max-w-[520px]">
            Skonsultuj się z lekarzem online i uzyskaj e-zwolnienie lekarskie (e-ZLA) <strong className="font-semibold text-qd-text underline decoration-qd-primary decoration-2 underline-offset-4">nawet w 15 minut</strong>. Legalnie, bez kolejek, z domu.
          </p>

          {/* Trust row */}
          <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
            {[
              { icon: ShieldCheck, text: "Lekarze", textDesktop: "Lekarze specjaliści" },
              { icon: Clock4, text: "Szybko", textDesktop: "Szybko i wygodnie" },
              { icon: FileCheck, text: "e-ZLA", textDesktop: "Ważne e-ZLA (L4)" },
            ].map(({ icon: Icon, text, textDesktop }) => (
              <div key={text} className="flex items-center gap-1 md:gap-1.5">
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-qd-primary" />
                <span className="font-body text-[11px] md:text-[13px] font-medium text-[#555555]">
                  <span className="md:hidden">{text}</span>
                  <span className="hidden md:inline">{textDesktop}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout form */}
        <div className="w-full md:w-[600px] shrink-0">
          <div className="bg-white rounded-2xl border border-qd-border p-5 md:p-6 shadow-sm overflow-hidden">
            <EmbedCheckout />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── How It Works ───────── */
const steps = [
  { num: "1", icon: Video, title: "Telekonsultacja", desc: "Umów się na wizytę online. Lekarz skontaktuje się z Tobą telefonicznie, przez wideo lub czat — wygodnie, z domu." },
  { num: "2", icon: ClipboardList, title: "Opisz objawy", desc: "Opowiedz lekarzowi o swoich dolegliwościach. Lekarz przeprowadzi wywiad i postawi diagnozę." },
  { num: "3", icon: FileText, title: "Otrzymaj zalecenia i e-ZLA", desc: "Lekarz przekaże zalecenia medyczne. Jeśli zachodzi potrzeba — wystawi e-zwolnienie (e-ZLA), widoczne od razu na koncie IKP." },
];

function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-qd-section-light scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-7 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">
            JAK TO DZIAŁA
          </span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] text-center">
            Jak uzyskać zwolnienie lekarskie online?
          </h2>
          <p className="font-body text-sm md:text-base text-[#555555] text-center">
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
                <p className="font-body text-[13px] md:text-sm text-[#555555] leading-[1.5] md:leading-[1.6]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Platform Stats ───────── */
const platformStats = [
  { icon: MonitorPlay, title: "40 000+ konsultacji miesięcznie", desc: "Przez naszą platformę realizowanych jest ponad 40 tys. konsultacji każdego miesiąca." },
  { icon: UserRound, title: "500+ lekarzy", desc: "Z naszej platformy korzysta ponad 500 lekarzy specjalistów z pełnymi uprawnieniami." },
  { icon: FileBadge, title: "E-zwolnienie przy wskazaniach", desc: "Możesz otrzymać zwolnienie lekarskie w przypadku wskazań medycznych — widoczne od razu w IKP." },
  { icon: PhoneCall, title: "Kontakt po konsultacji", desc: "Możesz dopytać lekarza o szczegóły nawet po zakończonej konsultacji." },
];

function PlatformStats() {
  return (
    <section className="bg-qd-section-green">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">
            NASZA PLATFORMA
          </span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Zaufana platforma telemedyczna
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {platformStats.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-qd-border rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col items-center text-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-qd-primary-light rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-qd-primary" />
              </div>
              <h3 className="font-heading text-sm md:text-base font-semibold text-qd-text">{title}</h3>
              <p className="font-body text-[12px] md:text-[13px] text-[#555555] leading-[1.5]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Benefits ───────── */
const benefits = [
  { icon: Zap, title: "Dostępne 24/7", desc: "Źle się czujesz o 2 w nocy? Nasi lekarze są dostępni przez całą dobę, również w weekendy i święta." },
  { icon: Laptop, title: "Bez wychodzenia z domu", desc: "Rejestracja online, konsultacja przez telefon, wideo lub czat, dokumenty elektronicznie. Bez dojazdów, bez kolejek." },
  { icon: Shield, title: "Lekarze specjaliści", desc: "Wszyscy nasi lekarze posiadają pełne uprawnienia. E-ZLA wystawione po konsultacji jest prawnie wiążące i akceptowane przez każdego pracodawcę." },
  { icon: Lock, title: "Pełna poufność", desc: "Twoje dane medyczne są szyfrowane i chronione. Działamy zgodnie z przepisami o ochronie danych osobowych." },
];

function Benefits() {
  return (
    <section id="korzysci" className="bg-qd-dark scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">
            DLACZEGO DOKTOR TERAZ
          </span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-white tracking-[-1px] text-center">
            Dlaczego warto wybrać e-zwolnienie online?
          </h2>
          <p className="font-body text-sm md:text-base text-[#B0B0B0] text-center">
            Kiedy jesteś chory, ostatnie czego chcesz to skomplikowany proces.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-qd-dark-card border border-qd-dark-border rounded-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4">
              <Icon className="w-[22px] h-[22px] md:w-6 md:h-6 text-qd-primary" />
              <h3 className="font-heading text-base md:text-lg font-semibold text-white">{title}</h3>
              <p className="font-body text-[13px] md:text-sm text-[#B0B0B0] leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── E-ZLA Explainer ───────── */
function EZLAExplainer() {
  return (
    <section className="bg-white">
      <div className={`${container} py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3 mb-8 md:mb-14">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">
            PRZEWODNIK
          </span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Czym jest e-zwolnienie lekarskie (e-ZLA)?
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-14">
          {/* Text content */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="font-body text-sm md:text-base text-qd-text leading-[1.7]">
              E-zwolnienie lekarskie (e-ZLA) to elektroniczna forma zwolnienia lekarskiego, która od 2018 roku całkowicie zastąpiła papierowe druki. Lekarz wystawia e-ZLA w systemie informatycznym, a dokument automatycznie trafia do ZUS oraz do pracodawcy przez platformę PUE ZUS / ePłatnik. Pacjent nie musi dostarczać żadnych papierów.
            </p>
            <p className="font-body text-sm md:text-base text-qd-text leading-[1.7]">
              Zwolnienie lekarskie online działa dokładnie tak samo jak zwolnienie wystawione podczas wizyty stacjonarnej. Po konsultacji telemedycznej lekarz ocenia stan zdrowia pacjenta i — jeśli stwierdzi wskazania medyczne — wystawia e-ZLA, które ma pełną moc prawną, zgodnie z ustawą z dnia 25 czerwca 1999 r. o świadczeniach pieniężnych z ubezpieczenia społecznego w razie choroby i macierzyństwa.
            </p>
            <p className="font-body text-sm md:text-base text-qd-text leading-[1.7]">
              E-zwolnienie online może otrzymać każdy, kto opłaca składki chorobowe: pracownicy etatowi, zleceniobiorcy objęci ubezpieczeniem chorobowym oraz przedsiębiorcy opłacający dobrowolną składkę chorobową. Lekarz decyduje o długości zwolnienia — standardowo od 1 do 182 dni. Wystawione L4 online możesz sprawdzić na Internetowym Koncie Pacjenta (IKP) na stronie pacjent.gov.pl.
            </p>
          </div>

          {/* Key facts card */}
          <div className="md:w-[380px] shrink-0">
            <div className="bg-qd-section-light border border-qd-border rounded-2xl p-6 md:p-8 flex flex-col gap-5">
              <h3 className="font-heading text-base md:text-lg font-semibold text-qd-text">Najważniejsze fakty</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: BookOpen, label: "Podstawa prawna", value: "Ustawa z 25.06.1999 r. o świadczeniach pieniężnych z ubezpieczenia społecznego" },
                  { icon: Globe, label: "Gdzie sprawdzić e-ZLA", value: "pacjent.gov.pl (IKP) — profil zaufany lub e-dowód" },
                  { icon: Building2, label: "Kto może otrzymać", value: "Pracownicy etatowi, zleceniobiorcy, przedsiębiorcy opłacający składki chorobowe" },
                  { icon: CalendarDays, label: "Czas trwania", value: "Od 1 do 182 dni — lekarz decyduje na podstawie stanu zdrowia" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 bg-qd-primary-light rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-[18px] h-[18px] text-qd-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-heading text-[13px] font-semibold text-qd-text">{label}</span>
                      <span className="font-body text-[12px] md:text-[13px] text-[#555555] leading-[1.5]">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Pricing ───────── */
const features = [
  "Wideokonsultacja z lekarzem specjalistą",
  "Oficjalne elektroniczne zwolnienie lekarskie",
  "Wysyłka do ZUS i pracodawcy automatycznie",
  "Dostępne 24/7, 365 dni w roku",
];

function Pricing() {
  return (
    <section id="cennik" className="bg-qd-section-light scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">CENNIK</span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Ile kosztuje zwolnienie lekarskie online?
          </h2>
          <p className="font-body text-sm md:text-base text-[#555555] text-center">
            Jedna stała opłata. Bez ukrytych kosztów, bez subskrypcji.
          </p>
        </div>

        <div className="w-full max-w-[520px] border border-qd-border rounded-2xl bg-white overflow-hidden">
          <div className="p-6 md:p-8 pb-5 md:pb-6 border-b border-qd-border flex flex-col gap-2">
            <h3 className="font-heading text-base md:text-lg font-semibold text-qd-text">Konsultacja online</h3>
            <p className="font-body text-[13px] md:text-sm text-[#555555] leading-[1.5]">
              Konsultacja lekarska z fokusem na zwolnienie lekarskie (e-ZLA).
            </p>
            <div className="flex items-end gap-1 mt-1">
              <span className="font-heading text-[32px] md:text-[40px] font-semibold text-qd-text tracking-[-1px]">79 zł</span>
              <span className="font-body text-[13px] md:text-sm text-[#555555] pb-1">/ konsultacja</span>
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

          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <a href="/zwolnienia-lekarskie-online-l4/umow-wizyte" className="block w-full bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold py-3.5 md:py-4 rounded-full text-center hover:opacity-90 transition-opacity">
              Rozpocznij wizytę <span className="text-white">79 zł</span>
            </a>
          </div>
        </div>

        <p className="font-body text-[11px] md:text-xs text-[#555555] text-center max-w-[520px]">
          Decyzja o wystawieniu zwolnienia lekarskiego zawsze należy do lekarza. Opłata obejmuje konsultację, niezależnie od jej wyniku.
        </p>
      </div>
    </section>
  );
}

/* ───────── Partners ───────── */
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
        <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#555555] tracking-[2px]">
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

/* ───────── FAQ ───────── */
function FAQ() {
  return (
    <section id="faq" className="bg-qd-section-light scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20 max-w-[800px]`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-[#07704D] tracking-[2px]">FAQ</span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Zwolnienie lekarskie online — pytania i odpowiedzi
          </h2>
        </div>

        <FAQL4Accordion />
      </div>
    </section>
  );
}

/* ───────── Final CTA ───────── */
function FinalCTA() {
  return (
    <section className="bg-qd-primary">
      <div className={`${container} flex flex-col items-center gap-6 md:gap-8 py-12 md:py-20`}>
        <h2 className="font-heading text-[26px] md:text-[44px] font-semibold text-white tracking-[-1px] text-center">
          Źle się czujesz? Nie czekaj.
        </h2>
        <p className="font-body text-[15px] md:text-lg text-white text-center">
          Uzyskaj zwolnienie lekarskie online — wygodnie, szybko i bez kolejek.
        </p>
        <a href="/zwolnienia-lekarskie-online-l4/umow-wizyte" className="bg-white font-heading text-[15px] md:text-base font-semibold text-qd-primary px-7 md:px-8 py-3.5 md:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
          Rozpocznij wizytę <span className="text-qd-primary">79 zł</span> <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] text-qd-primary" />
        </a>
        <p className="font-body text-xs md:text-[13px] text-white text-center">
          Bez subskrypcji — płacisz tylko wtedy, gdy potrzebujesz
        </p>
      </div>
    </section>
  );
}

/* ───────── Page ───────── */
export default function ZwolnieniaLekarskieL4() {
  return (
    <>
      <main className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <Hero />
        <Partners />
        <SocialProof />
        <HowItWorks />
        <PlatformStats />
        <Benefits />
        <EZLAExplainer />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
