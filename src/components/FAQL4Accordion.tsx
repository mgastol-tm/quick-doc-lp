"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Czy e-ZLA wystawione online jest prawnie ważne?",
    a: "Tak, e-zwolnienie (e-ZLA) wystawione po konsultacji z naszym lekarzem jest w pełni prawnie ważne, zgodnie z ustawą z dnia 25 czerwca 1999 r. o świadczeniach pieniężnych z ubezpieczenia społecznego w razie choroby i macierzyństwa. Trafia automatycznie do ZUS i jest akceptowane przez każdego pracodawcę w Polsce.",
  },
  {
    q: "Jak szybko lekarz do mnie zadzwoni?",
    a: "Zazwyczaj jeszcze w tej samej godzinie, czasem dłużej, ale ogólnie niezwykle sprawnie. Lekarz dzwoni na podany przez Ciebie numer telefonu.",
  },
  {
    q: "Czy pracodawca zaakceptuje zwolnienie wystawione online?",
    a: "Tak. E-ZLA wystawione po konsultacji online ma taką samą moc prawną jak zwolnienie z tradycyjnej wizyty. Pracodawca otrzymuje je automatycznie przez system ZUS.",
  },
  {
    q: "Co jeśli lekarz uzna, że nie potrzebuję zwolnienia?",
    a: "Decyzja o wystawieniu zwolnienia zawsze należy do lekarza. Lekarz przeprowadza pełną konsultację medyczną i ocenia zasadność zwolnienia. Jeśli nie stwierdzi podstaw, przekaże Ci zalecenia dotyczące leczenia. Opłata obejmuje samą konsultację, niezależnie od wyniku.",
  },
  {
    q: "Czy mogę otrzymać receptę podczas konsultacji?",
    a: "Tak, lekarz może wystawić e-receptę podczas konsultacji. Recepta zostanie przesłana na Twój adres e-mail i będzie dostępna w każdej aptece w Polsce.",
  },
  {
    q: "Gdzie zobaczę wystawione e-ZLA?",
    a: "E-zwolnienie jest widoczne od razu na Twoim koncie w Internetowym Koncie Pacjenta (IKP) na pacjent.gov.pl. Zostaje też automatycznie przesłane do ZUS.",
  },
];

export default function FAQL4Accordion() {
  return (
    <Accordion.Root type="single" collapsible className="w-full flex flex-col">
      {faqs.map(({ q, a }, i) => (
        <Accordion.Item
          key={q}
          value={`item-${i}`}
          className={i < faqs.length - 1 ? "border-b border-qd-border" : ""}
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex items-center justify-between py-4 md:py-5 gap-4 w-full text-left group">
              <span className="font-heading text-sm md:text-base font-medium text-qd-text">{q}</span>
              <ChevronDown className="w-[18px] h-[18px] md:w-5 md:h-5 text-qd-text-secondary shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out]">
            <p className="font-body text-[13px] md:text-sm text-qd-text-secondary leading-[1.6] pb-4 md:pb-5 pr-8">
              {a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
