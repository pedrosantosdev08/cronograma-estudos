import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DiaSemana } from "../../utils/dateUtils";
import {
  faBars,
  faCalendarDays,
  faClock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ArrowBack } from "../ui/ArrowBack/ArrowBack";

interface HeaderProps {
  semana: DiaSemana[];
  totalHoras: number;
}

export const TitleCronograma = ({ semana, totalHoras }: HeaderProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  // Impede o scroll do corpo quando o menu mobile está aberto
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggleMenu]);

  if (!semana || semana.length === 0) return null;

  return (
    <header className="relative flex min-h-10 h-full justify-between items-center sm:px-6 lg:px-8 mx-auto">
      {/* Lado Esquerdo: Título e Subtítulo */}
      <div className="flex-1 pr-4">
        <ArrowBack />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text-main) mb-1 leading-tight">
          Horário Semanal
        </h1>
        <p className="text-(--text-muted) text-xs sm:text-sm max-w-md line-clamp-2 sm:line-clamp-none">
          Organize suas sessões de estudo e acompanhe seu progresso semanalmente
        </p>
      </div>

      {/* Lado Direito: Informações (DESKTOP E TABLET LARGO) */}
      <div className="hidden lg:flex gap-6 xl:gap-10 items-center">
        <div className="text-right">
          <h2 className="text-(--text-muted) text-[12px] uppercase font-bold  mb-1">
            Semana Atual
          </h2>
          <p className="font-bold text-(--text-main) whitespace-nowrap text-sm xl:text-base">
            {semana[0].data} de {semana[0].mes}. — {semana[6].data} de{" "}
            {semana[6].mes}.
          </p>
        </div>

        <div className="w-px h-10 bg-gray-200" aria-hidden="true" />

        <div className="text-right">
          <h2 className="text-(--text-muted) text-[12px] uppercase font-bold  mb-1">
            Total Planejado
          </h2>
          <p className="font-black text-(--text-accent) text-2xl xl:text-2xl">
            {Number(totalHoras.toFixed(1))}h
          </p>
        </div>
      </div>

      {/* Botão de Acionamento (MOBILE E TABLET) */}
      <button
        className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-(--primary-low) text-(--text-main) active:scale-95 transition-all z-[60]  shadow-sm"
        onClick={() => setToggleMenu(!toggleMenu)}
        aria-label={toggleMenu ? "Fechar menu" : "Abrir resumo"}
      >
        <FontAwesomeIcon
          icon={toggleMenu ? faXmark : faBars}
          className={`text-xl  transition-transform duration-300 ${toggleMenu ? "rotate-90" : ""}`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[50] transition-opacity duration-300 lg:hidden ${
          toggleMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setToggleMenu(false)}
      />

      {/* Drawer Lateral */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white z-[55] shadow-2xl
          transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          lg:hidden flex flex-col
          ${toggleMenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-xl tracking-tight">
            Resumo Semanal
          </h3>
        </div>

        <div className="p-8 space-y-12 overflow-y-auto">
          {/* Card de Horas */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-2xl text-blue-600">
              <FontAwesomeIcon icon={faClock} className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Total Planejado
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-blue-600 leading-none">
                  {Number(totalHoras.toFixed(1))}
                </span>
                <span className="text-sm font-bold text-blue-300 uppercase">
                  hrs
                </span>
              </div>
            </div>
          </div>

          {/* Card de Calendário */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-2xl text-emerald-600">
              <FontAwesomeIcon icon={faCalendarDays} className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Período
              </p>
              <div className="space-y-1">
                <p className="text-gray-900 font-bold text-lg">
                  {semana[0].data} {semana[0].mes}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px w-4 bg-gray-200" />
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-tighter">
                    até
                  </span>
                  <div className="h-px w-4 bg-gray-200" />
                </div>
                <p className="text-gray-900 font-bold text-lg">
                  {semana[6].data} {semana[6].mes}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-8 bg-gray-50 text-[10px] text-gray-400 font-bold text-center uppercase tracking-[0.4em]">
          Cronograma • v1.0
        </div>
      </aside>
    </header>
  );
};
