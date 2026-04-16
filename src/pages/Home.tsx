import { useState, useMemo, useEffect } from "react";
import { gerarSemanaAtual } from "../utils/dateUtils";
import { Cronograma, type Atividade } from "../components/Cronograma/Cronograma";
import { Header } from "../components/Header/Header";
import { ResumoCards } from "../components/ResumoCards/ResumoCards"; // Usando o componente que refatoramos

export const Home = () => {
  // A semana não muda, useMemo está correto
  const semana = useMemo(() => gerarSemanaAtual(), []);

  // Estado com Inicialização preguiçosa (Lazy Initializer)
  const [atividades, setAtividades] = useState<Record<string, Atividade[]>>(() => {
    try {
      const saved = localStorage.getItem("@Cronograma:atividades");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {}; // Fallback para erro de parse
    }
  });

  // Sincronização com LocalStorage
  useEffect(() => {
    localStorage.setItem("@Cronograma:atividades", JSON.stringify(atividades));
  }, [atividades]);

  // Cálculo de Estatísticas Memorizado
  const stats = useMemo(() => {
    const listaGeral = Object.values(atividades).flat();

    // Lógica robusta para tratar h e min
    const totalHorasCalculadas = listaGeral.reduce((acc, curr) => {
      const duracaoStr = curr.duracao.toLowerCase();
      if (duracaoStr.includes("min")) {
        return acc + (parseInt(duracaoStr) / 60);
      }
      return acc + (parseFloat(duracaoStr) || 0);
    }, 0);

    return {
      materiasUnicas: new Set(listaGeral.map((a) => a.materia.toLowerCase().trim())).size,
      totalSessoes: listaGeral.length,
      diasAtivos: Object.keys(atividades).filter((k) => atividades[k].length > 0).length,
      horasTotais: totalHorasCalculadas,
    };
  }, [atividades]);

  return (
    // Ajustado padding e max-width para melhor leitura em telas ultra-wide
    <div className="max-w-360 mx-auto p-4 md:p-8 min-h-screen">
      
      {/* Header com as horas totais */}
      <Header semana={semana} totalHoras={stats.horasTotais} />

      <main className="mt-4">
        {/* Cronograma com Scroll Snap interno que configuramos */}
        <Cronograma
          semana={semana}
          atividades={atividades}
          setAtividades={setAtividades}
        />

        
        <ResumoCards stats={stats} />
      </main>

      {/* Footer Simples */}
      <footer className="mt-12 pb-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
          Plano de Estudos Inteligente • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};