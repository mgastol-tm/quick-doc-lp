"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq-l4";

export default function FAQL4Accordion() {
  return (
    <Accordion.Root type="single" collapsible className="w-full flex flex-col">
      {faqItems.map(({ q, a }, i) => (
        <Accordion.Item
          key={q}
          value={`item-${i}`}
          className={i < faqItems.length - 1 ? "border-b border-qd-border" : ""}
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
