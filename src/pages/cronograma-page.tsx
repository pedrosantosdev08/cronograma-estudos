import { useState, useMemo, useEffect } from "react";
import { gerarSemanaAtual } from "../utils/dateUtils";
import {
  Cronograma,
  type Atividade,
} from "../components/Cronograma/Cronograma";

import { ResumoCards } from "../components/ResumoCards/ResumoCards";
import { TitleCronograma } from "../components/TitleCronograma/TitleCronograma";

export const CronogramaPage = () => {
  const semana = useMemo(() => gerarSemanaAtual(), []);

  const [atividades, setAtividades] = useState<Record<string, Atividade[]>>(
    () => {
      try {
        const saved = localStorage.getItem("@Cronograma:atividades");
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    },
  );

  useEffect(() => {
    localStorage.setItem("@Cronograma:atividades", JSON.stringify(atividades));
  }, [atividades]);

  const stats = useMemo(() => {
    const listaGeral = Object.values(atividades).flat();

    const totalHorasCalculadas = listaGeral.reduce((acc, curr) => {
      const duracaoStr = curr.duracao.toLowerCase();
      if (duracaoStr.includes("min")) {
        return acc + parseInt(duracaoStr) / 60;
      }
      return acc + (parseFloat(duracaoStr) || 0);
    }, 0);

    return {
      materiasUnicas: new Set(
        listaGeral.map((a) => a.materia.toLowerCase().trim()),
      ).size,
      totalSessoes: listaGeral.length,
      diasAtivos: Object.keys(atividades).filter(
        (k) => atividades[k].length > 0,
      ).length,
      horasTotais: totalHorasCalculadas,
    };
  }, [atividades]);

  return (
    /* DIV PAI: Controla o fundo e o alinhamento global.
       Utilizamos o mesmo gradiente para não haver "cortes" visuais entre as seções.
    */
    <div className="min-h-screen w-full bg-linear-to-br from-[#0C0916]/10 via-(--primary)/10 to-[#0C0916]/10 flex flex-col items-center">
      
      {/* CONTAINER DE CONTEÚDO: 
          Define a largura máxima para que o layout não "espalhe" demais em monitores UltraWide.
      */}
      <div className="w-full max-w-screen-2xl px-4 md:px-8 py-8 flex flex-col gap-6">
        
        {/* Header com as horas totais */}
        <header className="w-full">
          <TitleCronograma semana={semana} totalHoras={stats.horasTotais} />
        </header>

        <main className="w-full flex flex-col gap-8">
          {/* O componente Cronograma já possui seu estilo interno, 
              mas aqui garantimos que ele ocupe a largura correta.
          */}
          <Cronograma
            semana={semana}
            atividades={atividades}
            setAtividades={setAtividades}
          />

          {/* Cards de resumo logo abaixo do cronograma */}
          <section className="w-full">
            <ResumoCards stats={stats} />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold opacity-60">
            Plano de Estudos Inteligente • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};