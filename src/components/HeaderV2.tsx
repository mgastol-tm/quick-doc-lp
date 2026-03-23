"use client";

import { useState } from "react";
import { Plus, Menu, X } from "lucide-react";
import Link from "next/link";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

const navItems = [
  { label: "Specjalizacje", href: "/#specjalizacje" },
  { label: "Jak to działa", href: "/#jak-to-dziala" },
  { label: "Korzyści", href: "/#korzysci" },
  { label: "Cennik", href: "/#cennik" },
  { label: "FAQ", href: "/#faq" },
];

export default function HeaderV2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className={`${container} flex items-center justify-between h-[72px]`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/25">
            <Plus className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-heading text-[22px] font-semibold text-white drop-shadow-sm">
            Doktor Teraz
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="font-body text-sm font-medium text-white/80 hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/#specjalizacje" className="bg-white/20 backdrop-blur-md border border-white/25 text-white font-heading text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/30 transition-colors">
            Umów wizytę
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
          <div className={`${container} flex flex-col gap-1 py-4`}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm font-medium text-white/80 hover:text-white py-3 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#specjalizacje"
              onClick={() => setOpen(false)}
              className="bg-white/20 backdrop-blur-md text-white font-heading text-sm font-medium px-6 py-3 rounded-full hover:bg-white/30 transition-colors text-center mt-2"
            >
              Umów wizytę
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
