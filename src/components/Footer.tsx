import { Plus } from "lucide-react";
import Link from "next/link";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

const linkHrefs: Record<string, string> = {
  "O nas": "/o-nas",
  "Kontakt": "/kontakt",
  "Kariera": "/kariera",
};

const footerLinks = [
  { title: "Produkt", links: ["Jak to działa", "Cennik", "FAQ"] },
  { title: "Firma", links: ["O nas", "Kontakt", "Kariera"] },
  { title: "Prawo", links: ["Polityka prywatności", "Regulamin", "RODO"] },
];

export default function Footer() {
  return (
    <footer className="bg-qd-dark">
      <div className={`${container} flex flex-col gap-8 md:gap-10 py-10 md:py-12`}>
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 md:max-w-[300px]">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-6 h-6 md:w-7 md:h-7 bg-qd-primary rounded-md flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="font-heading text-base md:text-lg font-semibold text-white">QuickDoc</span>
            </Link>
            <p className="font-body text-xs md:text-[13px] text-qd-text-secondary leading-[1.6]">
              Szybkie, legalne konsultacje lekarskie online w celu uzyskania zwolnienia lekarskiego. Dostępne 24/7.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 md:gap-16">
            {footerLinks.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-2.5 flex-1 md:flex-none">
                <span className="font-heading text-xs md:text-[13px] font-semibold text-white">{title}</span>
                {links.map((link) => {
                  const href = linkHrefs[link];
                  if (href) {
                    return (
                      <Link key={link} href={href} className="font-body text-xs md:text-[13px] text-qd-text-secondary hover:text-white transition-colors">
                        {link}
                      </Link>
                    );
                  }
                  return (
                    <a key={link} href="#" className="font-body text-xs md:text-[13px] text-qd-text-secondary hover:text-white transition-colors">
                      {link}
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-qd-dark-border pt-5 flex flex-col md:flex-row items-center md:justify-between gap-2">
          <span className="font-body text-[11px] md:text-xs text-qd-text-secondary">
            © 2026 QuickDoc. Wszelkie prawa zastrzeżone.
          </span>
          <span className="font-body text-[11px] md:text-xs text-qd-text-secondary">
            Stworzone z troską o Twoje zdrowie
          </span>
        </div>
      </div>
    </footer>
  );
}
