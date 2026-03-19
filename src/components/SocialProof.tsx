"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

const testimonials = [
  { quote: "Bardzo pozytywnie oceniam wizytę. Lekarz wykazał się dużym profesjonalizmem, pełną uwagą i zaangażowaniem. Czułam się dobrze poinformowana. Gorąco polecam!", name: "Katarzyna", initials: "KW", stars: 5, date: "2d temu" },
  { quote: "Pani doktor godna polecenia. Miła, konkretna. Wytlumaczyla na czym polega problem. Kontakt całodobowy zapewniony. Można kontaktować się o każdej porze.", name: "Anonim", initials: "A", stars: 5, date: "14d temu" },
  { quote: "Bardzo dobry lekarz, trafiona diagnoza i wdrożone leczenie. Podejście Pana Doktora do pacjenta bdb!!", name: "Alicja", initials: "AL", stars: 4, date: "1m temu" },
  { quote: "Super Pan, szybko doradził co i jak.", name: "Damian", initials: "DW", stars: 5, date: "3d temu" },
  { quote: "Lekarz bardzo kompetentny, otwarty na pacjenta. W przystępny sposób wyjaśnia problem pacjenta. Pełna kultura, jestem bardzo zadowolona z wizyty. W razie potrzeby chętnie skorzystam ponownie.", name: "Pacjentka", initials: "P", stars: 5, date: "21d temu" },
  { quote: "Profesjonalna obsługa, serdecznie polecam wszystkim potrzebującym pomocy lekarza, diagnoza trafna, zalecenia bardzo dobre :)", name: "Alicja", initials: "AK", stars: 4, date: "2m temu" },
  { quote: "Konsultacja przebiegła szybko i sprawnie.", name: "Malwina", initials: "M", stars: 5, date: "8d temu" },
  { quote: "Pełen profesjonalizm. Bardzo dobry i przyjazny kontakt. Lekarz szczegółowo wszystko wyjaśnił, opowiedział, przeprowadził dodatkowe badania podczas wizyty. Polecam na 100%", name: "Anonim", initials: "A", stars: 5, date: "5d temu" },
  { quote: "Bardzo miły i kompetentny lekarz", name: "Michał", initials: "MR", stars: 4, date: "3d temu" },
  { quote: "Wizyta przebiegła bardzo sprawnie, bez opóźnień, na duży plus SMS przypominający dzień przed wizytą.", name: "Paweł", initials: "PB", stars: 5, date: "30d temu" },
  { quote: "Bardzo merytoryczna konsultacja. Lekarz nie tylko odpowiadał na moje wątpliwości, ale również podsuwał możliwe rozwiązania. Świetne podejście do pacjenta.", name: "Anna", initials: "AN", stars: 5, date: "12d temu" },
  { quote: "Merytorycznie i sprawnie komunikacyjnie. Dziękuję", name: "Tomasz", initials: "TK", stars: 5, date: "9d temu" },
  { quote: "Polecam Pan Doktor bardzo rzeczowy, dawno nie spotkałem się z takim podejściem do pacjenta, zasłużone 5 gwiazdek", name: "M.L.", initials: "ML", stars: 5, date: "18d temu" },
  { quote: "Porada bardzo dobra. Wystąpiło małe opóźnienie w kontakcie, ale jak lekarz już zadzwonił to miło i rzeczowo odpowiedział na pytania.", name: "Aneta", initials: "AT", stars: 5, date: "25d temu" },
  { quote: "Bardzo kompetentny uprzejmy i dociekliwy lekarz", name: "Rafał", initials: "RN", stars: 5, date: "8d temu" },
  { quote: "Konsultacja przebiegła sprawnie, krótko, zwięźle i na temat. Polecam!", name: "Ewa", initials: "EM", stars: 5, date: "1d temu" },
  { quote: "Pan doktor bardzo mily i uprzejmy jednak nie otrzymalam porady typowo medycznej.", name: "Patrycja", initials: "PK", stars: 3, date: "3m temu" },
  { quote: "Bardzo miła i kompetentna Pani doktor. Wysłuchała o objawach. Wyjaśniła, jak postępować. Kilka razy upewniała się, czy nie mam więcej pytań czy wątpliwości. Polecam :)", name: "Franciszek", initials: "FK", stars: 5, date: "6d temu" },
  { quote: "bardzo dobrze, lekarka spokojnie przekazała wszystkie informacje, rzecowo i profesjonalnie", name: "Marta", initials: "MS", stars: 5, date: "15d temu" },
  { quote: "Wszystko przebiegło wzorowo", name: "Jakub", initials: "JK", stars: 5, date: "4d temu" },
  { quote: "Szybko, sprawnie, miło. Polecam doktora Wilka.", name: "Joanna", initials: "JA", stars: 5, date: "11d temu" },
  { quote: "WSZYSTKO SPRAWNIE , KONKRETNIE !!", name: "Aleksandra", initials: "AO", stars: 5, date: "20d temu" },
  { quote: "Rzeczowo, konkretne pytania, zalecenia wystawione od razu", name: "Marek", initials: "MZ", stars: 5, date: "7d temu" },
  { quote: "Już nigdy nie mam zamiaru iść do lekarza osobiście jesli nie jest to konieczne!", name: "Marek", initials: "MK", stars: 5, date: "1m temu" },
  { quote: "Bardzo sprawna i komunikatywna obsługa strony", name: "Monika", initials: "MN", stars: 5, date: "5d temu" },
  { quote: "Zdecydowanie polecam, bardzo merytoryczne porady!", name: "Adam", initials: "AD", stars: 5, date: "2m temu" },
  { quote: "Polecam obsługa na wysokim poziomie", name: "Kamil", initials: "KP", stars: 5, date: "10d temu" },
  { quote: "Bardzo polecam porady u Pani Doktor !", name: "Iwona", initials: "IW", stars: 5, date: "6d temu" },
];

export default function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white overflow-hidden pb-12 md:pb-20">
      <div className={`${container} flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20`}>
        {/* Stats */}
        <div className="flex items-center justify-center w-full max-w-[700px]">
          {[
            { num: "40 000+", label: "Pacjentów", labelDesktop: "Pacjentów miesięcznie" },
            { num: "500+", label: "Lekarzy", labelDesktop: "Lekarzy specjalistów", border: true },
            { num: "4.9/5", label: "Ocena", labelDesktop: "Ocena pacjentów" },
          ].map(({ num, label, labelDesktop, border }) => (
            <div key={num} className={`flex-1 flex flex-col items-center gap-1 py-4 md:py-6 ${border ? "border-x border-qd-border" : ""}`}>
              <span className="font-heading text-[28px] md:text-5xl font-semibold text-qd-primary tracking-[-1px]">{num}</span>
              <span className="font-body text-[11px] md:text-sm font-medium text-[#555555]">
                <span className="md:hidden">{label}</span>
                <span className="hidden md:inline">{labelDesktop}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable carousel */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth px-5 md:px-10 pb-4 no-scrollbar"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-qd-border rounded-full items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-10"
          aria-label="Przewiń w lewo"
        >
          <ChevronLeft className="w-5 h-5 text-qd-text" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-qd-border rounded-full items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-10"
          aria-label="Przewiń w prawo"
        >
          <ChevronRight className="w-5 h-5 text-qd-text" />
        </button>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-[40px] md:w-[80px] bg-gradient-to-r from-white to-transparent pointer-events-none z-[5]" />
        <div className="absolute right-0 top-0 bottom-0 w-[40px] md:w-[80px] bg-gradient-to-l from-white to-transparent pointer-events-none z-[5]" />
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, initials, stars, date }: { quote: string; name: string; initials: string; stars: number; date: string }) {
  return (
    <div className="w-[280px] md:w-[340px] shrink-0 bg-white border border-qd-border rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4 h-[220px] md:h-[250px]">
      <span className="text-sm md:text-base text-qd-stars">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
      <p className="font-body text-[13px] md:text-sm text-qd-text leading-[1.6] flex-1 line-clamp-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2.5 md:gap-3 mt-auto">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-qd-primary-light flex items-center justify-center">
          <span className="font-heading text-xs md:text-sm font-semibold text-qd-text">{initials}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-[13px] md:text-sm font-semibold text-qd-text">{name}</span>
          <span className="font-body text-[11px] md:text-[12px] text-[#555555]">{date}</span>
        </div>
      </div>
    </div>
  );
}
