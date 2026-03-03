import { Plus, Menu } from "lucide-react";
import Link from "next/link";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

export default function Header() {
  return (
    <header className="bg-[var(--qd-white)] border-b border-[var(--qd-border)] sticky top-0 z-50">
      <div className={`${container} flex items-center justify-between h-[72px]`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--qd-primary)] rounded-lg flex items-center justify-center">
            <Plus className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-heading text-[22px] font-semibold text-[var(--qd-text)]">
            QuickDoc
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Jak to działa", "Korzyści", "Cennik", "FAQ"].map((item) => (
            <a key={item} href="#" className="font-body text-sm font-medium text-[var(--qd-text-secondary)] hover:text-[var(--qd-text)] transition-colors">
              {item}
            </a>
          ))}
          <Link href="/wizyta" className="bg-[var(--qd-primary)] text-white font-heading text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Weź L4
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden">
          <Menu className="w-6 h-6 text-[var(--qd-text)]" />
        </button>
      </div>
    </header>
  );
}
