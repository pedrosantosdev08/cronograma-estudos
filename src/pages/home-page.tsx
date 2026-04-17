import { faClock, faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { NAVCARD_DATA } from "../data/data";
import { NavCard } from "../components/NavCard/NavCard";

export const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-linear-to-br from-[#0C0916]/10 via-(--primary)/10 to-[#0C0916]/10">
        <header className="p-6 w-full max-w-7xl">
          <div className="flex items-center gap-2 mb-4">
            {/* <img src="/logo.svg" alt="StudyFlow Logo" className="w-8 h-8" /> */}
            <span className="text-(--primary) font-bold">StudyFlow</span>
          </div>

          <h1 className="text-5xl font-bold mb-2">
            Boa noite,{" "}
            <span className="bg-linear-to-r from-(--primary) via-white to-(--primary) bg-clip-text text-transparent">
              Estudante
            </span>
          </h1>
          <p className="text-gray-600 text-xl">
            Continue de onde parou. Seu progresso está sendo acompanhado.
          </p>
        </header>

        <main className="p-6 w-full max-w-7xl">
          {/* Grid responsivo: 1 coluna no mobile, 2 no tablet, 4 no desktop */}
          <section className="grid grid-cols-1 w-full  sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <InfoCard
              icon={faFire}
              number={5}
              description="Dias consecutivos"
            />
            <InfoCard
              icon={faClock}
              number={24}
              description="Horas esta semana"
            />
            <InfoCard
              icon={faClock}
              number={85}
              description="Meta diária (%)"
            />
            <InfoCard icon={faStar} number="2.450" description="Pontos XP" />
          </section>

          <section className="w-full">
            <h2 className="text-xl font-semibold mb-4">Navegação Rápida</h2>
            <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-4">
              {NAVCARD_DATA.map((nav) => (
                <NavCard key={nav.id} {...nav} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
