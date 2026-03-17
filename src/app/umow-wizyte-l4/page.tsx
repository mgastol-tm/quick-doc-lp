import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmbedCheckout from "@/components/EmbedCheckout";

export const metadata = {
  title: "Umów wizytę — zwolnienie lekarskie L4 online | QuickDoc",
  description: "Zarezerwuj konsultację lekarską online i uzyskaj e-zwolnienie (e-ZLA). Szybko, wygodnie i bez kolejek.",
};

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

export default function UmowWizyteL4() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="bg-white flex-1">
        <div className={`${container} flex flex-col items-center gap-7 md:gap-10 py-12 md:py-20`}>
          <div className="flex flex-col items-center gap-3">
            <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">
              UMÓW WIZYTĘ
            </span>
            <h2 className="font-heading text-2xl md:text-[40px] font-semibold text-qd-text tracking-[-0.5px] md:tracking-[-1px] text-center">
              Umów wizytę online
            </h2>
          </div>
          <div className="w-full max-w-[720px]">
            <EmbedCheckout />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
