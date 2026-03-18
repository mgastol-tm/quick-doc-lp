import Header from "@/components/Header";
import Footer from "@/components/Footer";

const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";

export default function ONasPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="bg-white flex-1">
        <div className={`${container} py-12 md:py-20 flex flex-col gap-6`}>
          <h1 className="font-heading text-3xl md:text-[44px] font-semibold text-qd-text tracking-[-1px]">
            O nas
          </h1>
          <p className="font-body text-base md:text-lg text-qd-text-secondary leading-[1.7] max-w-[700px]">
            QuickDoc to platforma telemedyczna, która umożliwia szybkie i wygodne konsultacje lekarskie online. Naszą misją jest zapewnienie każdemu pacjentowi dostępu do profesjonalnej opieki medycznej — bez kolejek, bez stresu, z dowolnego miejsca.
          </p>
          <p className="font-body text-base md:text-lg text-qd-text-secondary leading-[1.7] max-w-[700px]">
            Współpracujemy wyłącznie z licencjonowanymi lekarzami posiadającymi pełne uprawnienia i wpis do rejestru Izby Lekarskiej. Działamy zgodnie z obowiązującymi przepisami prawa i dbamy o bezpieczeństwo danych naszych pacjentów.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
