"use client";

import { useState } from "react";
import { Plus, Menu, X } from "lucide-react";
import Link from "next/link";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

const navItems = [
  { label: "Jak to działa", href: "/#jak-to-dziala" },
  { label: "Korzyści", href: "/#korzysci" },
  { label: "Cennik", href: "/#cennik" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-qd-white border-b border-qd-border sticky top-0 z-50">
      <div className={`${container} flex items-center justify-between h-[72px]`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-qd-primary rounded-lg flex items-center justify-center">
            <Plus className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-heading text-[22px] font-semibold text-qd-text">
            QuickDoc
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="font-body text-sm font-medium text-qd-text-secondary hover:text-qd-text transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/wizyta" className="bg-qd-primary text-white font-heading text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Weź L4
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6 text-qd-text" /> : <Menu className="w-6 h-6 text-qd-text" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-qd-border bg-qd-white">
          <div className={`${container} flex flex-col gap-1 py-4`}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm font-medium text-qd-text-secondary hover:text-qd-text py-3 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/wizyta"
              onClick={() => setOpen(false)}
              className="bg-qd-primary text-white font-heading text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-center mt-2"
            >
              Weź L4
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
