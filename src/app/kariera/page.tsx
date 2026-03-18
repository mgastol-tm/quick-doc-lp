import Header from "@/components/Header";
import Footer from "@/components/Footer";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

export default function KarieraPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="bg-white flex-1">
        <div className={`${container} py-12 md:py-20 flex flex-col gap-6`}>
          <h1 className="font-heading text-3xl md:text-[44px] font-semibold text-qd-text tracking-[-1px]">
            Kariera
          </h1>
          <p className="font-body text-base md:text-lg text-qd-text-secondary leading-[1.7] max-w-[700px]">
            Brak aktualnych ofert pracy. Śledź tę stronę — nowe ogłoszenia pojawią się wkrótce.
          </p>
          <p className="font-body text-base md:text-lg text-qd-text-secondary leading-[1.7] max-w-[700px]">
            Jeśli chcesz dołączyć do naszego zespołu, wyślij swoje CV na{" "}
            <a href="mailto:kariera@quickdoc.pl" className="text-qd-primary hover:underline">
              kariera@quickdoc.pl
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
