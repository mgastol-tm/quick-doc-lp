"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Jak szybko mogę porozmawiać z lekarzem?",
    a: "Zazwyczaj jeszcze w tej samej godzinie, czasem dłużej, ale ogólnie niezwykle sprawnie. Wszystko załatwisz online, bez wychodzenia z domu.",
  },
  {
    q: "Jakie specjalizacje są dostępne?",
    a: "Obecnie oferujemy konsultacje w sprawie zwolnień lekarskich (L4/e-ZLA). Wkrótce uruchomimy konsultacje z internistą, pediatrą i psychiatrą.",
  },
  {
    q: "Czy mogę otrzymać receptę podczas konsultacji?",
    a: "Tak, lekarz może wystawić e-receptę podczas konsultacji online. Recepta zostanie przesłana na Twój adres e-mail i będzie dostępna w każdej aptece w Polsce.",
  },
  {
    q: "Czy e-zwolnienie (L4) jest prawnie ważne?",
    a: "Tak, e-zwolnienie (e-ZLA) wystawione po konsultacji z naszym lekarzem jest w pełni prawnie ważne, zgodnie z ustawą z dnia 25 czerwca 1999 r. o świadczeniach pieniężnych z ubezpieczenia społecznego w razie choroby i macierzyństwa. Trafia automatycznie do ZUS i jest akceptowane przez każdego pracodawcę w Polsce.",
  },
  {
    q: "Ile kosztuje konsultacja online?",
    a: "Konsultacja w sprawie zwolnienia L4 kosztuje 79 zł. To jednorazowa opłata bez ukrytych kosztów i bez subskrypcji — płacisz tylko wtedy, gdy potrzebujesz.",
  },
];

export default function FAQAccordion() {
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
