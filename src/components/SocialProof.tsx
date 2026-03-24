"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

const testimonials = [
  { quote: "Bardzo sprawnie. Powiadomienie o zwolnieniu dostałam mailem w niecałe pół godziny.", name: "Bożena", initials: "BK", stars: 5, date: "1d temu" },
  { quote: "Jestem zaskoczony - zwolnienie dostałem w niedzielę po mniej niż dwóch godzinach od złożenia konsultacji.", name: "Grzegorz", initials: "GW", stars: 5, date: "3d temu" },
  { quote: "Nie miałem siły na wyjście do przychodni i czekanie do lekarza. Czekałem trochę dłużej niż dwie godziny, ale ostatecznie dostałem zwolnienie.", name: "Kacper", initials: "KS", stars: 4, date: "5d temu" },
  { quote: "Bez kolejek, bez wychodzenia z domu. Lekarz bardzo profesjonalny, wysłuchał, postawił diagnozę i wystawił e-ZLA. Polecam każdemu.", name: "Katarzyna", initials: "KW", stars: 5, date: "3d temu" },
  { quote: "Konsultacja szybka i konkretna. Lekarz od razu wiedział co robić, wystawił zwolnienie i zalecenia. Całość zajęła może godzinę od rejestracji.", name: "Damian", initials: "DW", stars: 5, date: "8d temu" },
  { quote: "Korzystałam już 3 razy. Za każdym razem sprawnie, bez problemów. E-zwolnienie trafia do pracodawcy automatycznie — nie muszę nic nosić.", name: "Anna", initials: "AN", stars: 5, date: "12d temu" },
  { quote: "Miałem wątpliwości czy to legalne — ale e-ZLA pojawiło się na pacjent.gov.pl w kilka minut po konsultacji. Pracodawca przyjął bez pytań.", name: "Tomasz", initials: "TK", stars: 5, date: "9d temu" },
  { quote: "Pani doktor bardzo miła i kompetentna. Dokładnie wypytała o objawy, wytłumaczyła diagnozę. Zwolnienie otrzymałam jeszcze tego samego dnia.", name: "Alicja", initials: "AL", stars: 5, date: "14d temu" },
  { quote: "79 zł i po problemie. Nie musiałem jechać do lekarza z gorączką. Konsultacja telefoniczna, e-zwolnienie na IKP. Tak powinno to wyglądać.", name: "Paweł", initials: "PB", stars: 5, date: "1d temu" },
  { quote: "Szybko, sprawnie, bez zbędnych formalności. Lekarz zadzwonił szybciej niż się spodziewałam. Zwolnienie widoczne od razu w systemie.", name: "Malwina", initials: "M", stars: 5, date: "7d temu" },
  { quote: "Zachorowałem w święta — żadna przychodnia nie działała. Tu umówiłem się online i w 2 godziny miałem konsultację i e-zwolnienie. Super usługa.", name: "Michał", initials: "MR", stars: 5, date: "4d temu" },
  { quote: "Lekarz bardzo rzeczowy, konkretne pytania, szybka diagnoza. E-ZLA wystawione od ręki. Nie wyobrażam sobie już czekania w kolejce w przychodni.", name: "Ewa", initials: "EM", stars: 5, date: "6d temu" },
  { quote: "Polecam serdecznie. Całą sprawę załatwiłem z telefonu leżąc w łóżku. Lekarz profesjonalny, zwolnienie automatycznie u pracodawcy.", name: "Marek", initials: "MZ", stars: 5, date: "10d temu" },
  { quote: "Pierwszy raz korzystałam z e-zwolnienia online. Proces prosty, lekarz miły. Zwolnienie pojawiło się na IKP w kilka minut. Na pewno skorzystam znowu.", name: "Joanna", initials: "JA", stars: 5, date: "11d temu" },
  { quote: "Dostępność 24/7 to ogromny plus. Zachorowałem w piątek wieczorem, a już w sobotę rano miałem e-zwolnienie. Bez stresu, bez kolejek.", name: "Rafał", initials: "RN", stars: 5, date: "15d temu" },
  { quote: "Bardzo dobra obsługa. Ankieta zajęła 2 minuty, lekarz zadzwonił szybko. Wszystko załatwione bez wychodzenia z domu. Gorąco polecam!", name: "Monika", initials: "MN", stars: 5, date: "3d temu" },
  { quote: "Pan doktor dokładny i cierpliwy. Wyjaśnił zalecenia, wystawił zwolnienie. E-ZLA od razu widoczne na koncie pacjenta. Bez zarzutu.", name: "Franciszek", initials: "FK", stars: 5, date: "20d temu" },
  { quote: "Już nigdy nie idę do przychodni po zwolnienie. Tutaj szybciej, wygodniej i taniej niż prywatna wizyta stacjonarna. 79 zł to uczciwa cena.", name: "Jakub", initials: "JK", stars: 5, date: "8d temu" },
  { quote: "Moja żona skorzystała pierwsza, potem ja. Oboje dostaliśmy e-zwolnienie tego samego dnia. Lekarze kompetentni, obsługa bezproblemowa.", name: "Adam", initials: "AD", stars: 5, date: "18d temu" },
  { quote: "Konsultacja przebiegła sprawnie i profesjonalnie. Lekarz nie tylko wystawił zwolnienie, ale też zalecił konkretne leczenie. Pełen profesjonalizm.", name: "Marta", initials: "MS", stars: 5, date: "5d temu" },
  { quote: "Wygodne rozwiązanie, szczególnie jak jest się zbyt chorym żeby wstać z łóżka. Lekarz zadzwonił, przeprowadził wywiad, zwolnienie gotowe.", name: "Kamil", initials: "KP", stars: 5, date: "13d temu" },
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
