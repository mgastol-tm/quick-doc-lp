import Header from "@/components/Header";
import Footer from "@/components/Footer";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

export default function KontaktPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="bg-white flex-1">
        <div className={`${container} py-12 md:py-20 flex flex-col gap-6`}>
          <h1 className="font-heading text-3xl md:text-[44px] font-semibold text-[var(--qd-text)] tracking-[-1px]">
            Kontakt
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--qd-text-secondary)] leading-[1.7] max-w-[700px]">
            Masz pytania? Skontaktuj się z nami — chętnie pomożemy.
          </p>
          <div className="flex flex-col gap-3 font-body text-base text-[var(--qd-text)]">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:kontakt@quickdoc.pl" className="text-[var(--qd-primary)] hover:underline">
                kontakt@quickdoc.pl
              </a>
            </p>
            <p>
              <span className="font-semibold">Telefon:</span> +48 800 123 456
            </p>
            <p>
              <span className="font-semibold">Godziny obsługi:</span> Pon–Pt, 8:00–20:00
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
