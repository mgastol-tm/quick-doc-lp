import {
  ShieldCheck, Clock4, FileCheck, ArrowRight, ClipboardList,
  Video, FileText, Zap, Laptop, Shield, Lock,
  MonitorPlay, UserRound, FileBadge, PhoneCall,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQL4Accordion from "@/components/FAQL4Accordion";

export const metadata = {
  title: "Zwolnienie lekarskie online (L4) — wygodnie i szybko | QuickDoc",
  description: "Uzyskaj e-zwolnienie lekarskie (e-ZLA) online — wygodnie, szybko i bez kolejek. QuickDoc — lekarz online bez wychodzenia z domu.",
};

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="bg-qd-section-green overflow-hidden">
      <div className={`${container} flex flex-col md:flex-row items-center gap-7 md:gap-[60px] py-10 md:pt-20 md:pb-0`}>
        <div className="flex flex-col gap-7 md:gap-8 flex-1">
          {/* Badge */}
          <div className="flex items-center gap-1.5 md:gap-2 bg-qd-primary-light border border-[#0B8A5E33] rounded-full px-3 md:px-3.5 py-[5px] md:py-1.5 w-fit">
            <span className="w-[6px] h-[6px] md:w-2 md:h-2 rounded-full bg-qd-primary" />
            <span className="font-body text-[11px] md:text-[13px] font-medium text-qd-primary">
              Dostępne 24/7 — Bez kolejek
            </span>
          </div>

          <h1 className="font-heading text-[32px] md:text-[52px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] leading-[1.1] md:leading-[1.05] max-w-[580px]">
            Zwolnienie lekarskie online — wygodnie i szybko
          </h1>

          <p className="font-body text-[15px] md:text-lg text-qd-text-secondary leading-[1.5] md:leading-[1.6] max-w-[520px]">
            Omiń kolejki w przychodni. Skonsultuj się z lekarzem specjalistą online, uzyskaj diagnozę i odbierz e-ZLA — wszystko z domu.
          </p>

          {/* Doctor image - mobile only */}
          <div className="md:hidden w-full flex justify-center max-h-[280px] -mb-7">
            <Image src="/doctor-hero.png" alt="Lekarz" width={300} height={320} className="object-contain max-h-[280px] w-auto" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <a href="/wizyta" className="bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold px-8 py-3.5 md:py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Rozpocznij wizytę <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </a>
            <a href="#jak-to-dziala" className="bg-white border border-qd-border font-heading text-[15px] md:text-base font-medium px-8 py-3.5 md:py-4 rounded-full text-center text-qd-text hover:bg-gray-50 transition-colors">
              Jak to działa?
            </a>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 md:pb-20">
            {[
              { icon: ShieldCheck, text: "Lekarze", textDesktop: "Lekarze specjaliści" },
              { icon: Clock4, text: "Szybko", textDesktop: "Szybko i wygodnie" },
              { icon: FileCheck, text: "e-ZLA", textDesktop: "Ważne e-ZLA (L4)" },
            ].map(({ icon: Icon, text, textDesktop }) => (
              <div key={text} className="flex items-center gap-1 md:gap-1.5">
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-qd-primary" />
                <span className="font-body text-[11px] md:text-[13px] font-medium text-qd-text-secondary">
                  <span className="md:hidden">{text}</span>
                  <span className="hidden md:inline">{textDesktop}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor image - desktop only */}
        <div className="hidden md:flex items-end justify-center shrink-0 self-end">
          <Image src="/doctor-hero.png" alt="Lekarz" width={420} height={460} className="object-contain max-h-[500px] w-auto" />
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
    <section id="jak-to-dziala" className="bg-white scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-7 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">
            JAK TO DZIAŁA
          </span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] text-center">
            Trzy proste kroki do konsultacji
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

/* ───────── Platform Stats ───────── */
const platformStats = [
  { icon: MonitorPlay, text: "Przez naszą platformę realizowanych jest ponad 40 tys. konsultacji miesięcznie" },
  { icon: UserRound, text: "Z naszej platformy korzysta ponad 500 lekarzy" },
  { icon: FileBadge, text: "Możesz otrzymać zwolnienie lekarskie w przypadku wskazań medycznych" },
  { icon: PhoneCall, text: "Możesz dopytać lekarza o szczegóły nawet po konsultacji" },
];

function PlatformStats() {
  return (
    <section className="bg-qd-section-green">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {platformStats.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-4 md:gap-5 bg-white border border-qd-border rounded-xl md:rounded-2xl p-5 md:p-7">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-qd-primary-light rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-qd-primary" />
              </div>
              <p className="font-body text-[13px] md:text-sm text-qd-text leading-[1.6] pt-2 md:pt-3">{text}</p>
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
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">
            DLACZEGO QUICKDOC
          </span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-white tracking-[-1px] text-center">
            Stworzony na chwile, gdy najbardziej potrzebujesz
          </h2>
          <p className="font-body text-sm md:text-base text-qd-text-secondary text-center">
            Kiedy jesteś chory, ostatnie czego chcesz to skomplikowany proces.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-qd-dark-card border border-qd-dark-border rounded-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4">
              <Icon className="w-[22px] h-[22px] md:w-6 md:h-6 text-qd-primary" />
              <h3 className="font-heading text-base md:text-lg font-semibold text-white">{title}</h3>
              <p className="font-body text-[13px] md:text-sm text-qd-text-secondary leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Social Proof ───────── */
const testimonials = [
  { quote: "E-recepta i e-ZLA wystawione i przesłane na maila w ciągu 15 minut od wizyty. Również od strony formalnej wizyta przebiegła wzorowo.", name: "Tomasz", initials: "TK" },
  { quote: "Przemiła konsultacja z Panią Doktor, bardzo profesjonalne i empatyczne podejście. Pani Doktor była niezwykle zaangażowana i okazała dużą troskę o moje zdrowie.", name: "Katarzyna", initials: "KW" },
  { quote: "Rzeczowa konsultacja. Każda z dolegliwości została zaopiekowana i omówiona pod kątem ewentualnych przyczyn. Polecam na 100%.", name: "Michał", initials: "MR" },
  { quote: "Bardzo szczegółowy i konkretny wywiad, jestem bardzo zadowolona — Doktor nie zlekceważył żadnych objawów.", name: "Agnieszka", initials: "AL" },
  { quote: "Bardzo dobra forma kontaktu z lekarzem. Sprawna i skuteczna konsultacja, bez kolejek i stresu.", name: "Paweł", initials: "PB" },
  { quote: "Polecam ze szczerego serca. Pan doktor rzetelnie przyjrzał się wynikom moich badań, a następnie szczegółowo omówił dalsze kroki.", name: "Marta", initials: "MS" },
];

function SocialProof() {
  return (
    <section className="bg-qd-section-light overflow-hidden pb-12 md:pb-20">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20`}>
        {/* Stats */}
        <div className="flex items-center justify-center w-full max-w-[700px]">
          {[
            { num: "62 000+", label: "Pacjentów", labelDesktop: "Obsłużonych pacjentów" },
            { num: "12 min", label: "Śr. czas", labelDesktop: "Średni czas konsultacji", border: true },
            { num: "4.9/5", label: "Ocena", labelDesktop: "Ocena pacjentów" },
          ].map(({ num, label, labelDesktop, border }) => (
            <div key={num} className={`flex-1 flex flex-col items-center gap-1 py-4 md:py-6 ${border ? "border-x border-qd-border" : ""}`}>
              <span className="font-heading text-[28px] md:text-5xl font-semibold text-qd-primary tracking-[-1px]">{num}</span>
              <span className="font-body text-[11px] md:text-sm font-medium text-qd-text-secondary">
                <span className="md:hidden">{label}</span>
                <span className="hidden md:inline">{labelDesktop}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials - mobile: stacked */}
        <div className="w-full flex flex-col md:hidden gap-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>

      {/* Desktop carousel - full width for visual effect */}
      <div className="hidden md:block relative w-full h-[290px] -mt-4">
        <div className="absolute inset-0 flex gap-4 px-4 items-start justify-center">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} desktop />
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-qd-section-light to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-qd-section-light to-transparent z-10" />
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, initials, desktop }: { quote: string; name: string; initials: string; desktop?: boolean }) {
  return (
    <div className={`bg-white border border-qd-border rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4 ${desktop ? "w-[340px] h-[270px] shrink-0" : "w-full h-[220px]"}`}>
      <span className="text-sm md:text-base text-qd-stars">★★★★★</span>
      <p className="font-body text-[13px] md:text-sm text-qd-text leading-[1.6] flex-1">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2.5 md:gap-3 mt-auto">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-qd-primary-light flex items-center justify-center">
          <span className="font-heading text-xs md:text-sm font-semibold text-qd-primary">{initials}</span>
        </div>
        <span className="font-heading text-[13px] md:text-sm font-semibold text-qd-text">{name}</span>
      </div>
    </div>
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
    <section id="cennik" className="bg-white scroll-mt-[72px]">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-14 py-12 md:py-20`}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">CENNIK</span>
          <h2 className="font-heading text-[26px] md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Prosty, przejrzysty cennik
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

          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <a href="/wizyta" className="block w-full bg-qd-primary text-white font-heading text-[15px] md:text-base font-semibold py-3.5 md:py-4 rounded-full text-center hover:opacity-90 transition-opacity">
              Rozpocznij wizytę
            </a>
          </div>
        </div>

        <p className="font-body text-[11px] md:text-xs text-qd-text-secondary text-center max-w-[520px]">
          Decyzja o wystawieniu zwolnienia lekarskiego zawsze należy do lekarza. Opłata obejmuje konsultację, niezależnie od jej wyniku.
        </p>
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
          <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">FAQ</span>
          <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-1px] text-center">
            Najczęściej zadawane pytania
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
        <p className="font-body text-[15px] md:text-lg text-white/80 text-center">
          Uzyskaj zwolnienie lekarskie online — wygodnie, szybko i bez kolejek.
        </p>
        <a href="/wizyta" className="bg-white font-heading text-[15px] md:text-base font-semibold text-qd-primary px-7 md:px-8 py-3.5 md:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
          Rozpocznij wizytę <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] text-qd-primary" />
        </a>
        <p className="font-body text-xs md:text-[13px] text-white/60 text-center">
          Bez subskrypcji — płacisz tylko wtedy, gdy potrzebujesz
        </p>
      </div>
    </section>
  );
}

/* ───────── Page ───────── */
export default function ZwolnieniaLekarskieL4() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
