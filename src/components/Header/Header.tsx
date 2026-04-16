import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DiaSemana } from "../../utils/dateUtils";
import {
  faBars,
  faCalendarDays,
  faClock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface HeaderProps {
  semana: DiaSemana[];
  totalHoras: number;
}

export const Header = ({ semana, totalHoras }: HeaderProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  if (!semana || semana.length === 0) return null;

  return (
    // Ajustado px-4 para mobile e px-8 para desktop para ganhar espaço
    <header className="relative flex min-h-30 justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto ">
      {/* Titulo do Header - Ajuste de escala responsiva */}
      <div className="max-w-[60%] md:max-w-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-(--text-main) mb-1 leading-tight ">
          Cronograma de Estudos
        </h1>
        <p className="text-(--text-muted) text-sm">
          Organize suas sessões de estudo e acompanhe seu progresso semanalmente
        </p>
      </div>

      {/* Container de informações - DESKTOP ONLY */}
      <div className="hidden md:flex gap-4 lg:gap-8 items-center">
        <div className="text-right">
          <h2 className="text-(--text-muted) text-xs uppercase tracking-wider">
            Semana Atual
          </h2>
          <p className="font-bold text-(--text-main) whitespace-nowrap">
            {semana[0].data} de {semana[0].mes}. - {semana[6].data} de{" "}
            {semana[6].mes}.
          </p>
        </div>

        <span className="border-l border-gray-200 h-10 my-auto"></span>

        <div>
          <h2 className="text-(--text-muted) text-xs uppercase tracking-wider">
            Total Planejado
          </h2>
          <p className="font-bold text-(--text-accent) text-2xl lg:text-3xl">
            {Number(totalHoras.toFixed(1))}h
          </p>
        </div>
      </div>

      {/* Botão de Acionamento - MOBILE ONLY */}
      <button
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-full  active:scale-95 transition-all z-60"
        onClick={() => setToggleMenu(!toggleMenu)}
        aria-label="Abrir resumo"
      >
        <FontAwesomeIcon
          icon={toggleMenu ? faXmark : faBars}
          className={`text-(--text-color) text-xl transition-transform duration-300 ${toggleMenu ? "rotate-90 " : ""}`}
        />
      </button>

      {/* Overlay - Z-index garantido */}
      <div
        className={`fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[45] transition-opacity duration-300 md:hidden ${
          toggleMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setToggleMenu(false)}
      />

      {/* Menu Lateral (Drawer) */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[55] shadow-2xl
          transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          md:hidden flex flex-col
          ${toggleMenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-8 border-b border-gray-50 mt-4">
          <h3 className="font-bold text-gray-800 text-xl">Resumo</h3>
        </div>

        <div className="p-8 space-y-10">
          {/* Horas */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm shadow-blue-100">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">
                Total Planejado
              </p>
              <p className="text-4xl font-black text-blue-600 leading-none tracking-tight">
                {Number(totalHoras.toFixed(1))}
                <span className="text-sm font-bold ml-1 text-blue-300">
                  HRS
                </span>
              </p>
            </div>
          </div>

          {/* Calendário */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm shadow-emerald-100">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">
                Semana Atual
              </p>
              <p className="text-gray-700 font-bold leading-relaxed text-lg flex items-center gap-2">
                <span className="text-gray-900">
                  {semana[0].data} {semana[0].mes}
                </span>
                
                <span className="text-gray-300 font-medium text-sm flex items-center gap-2 my-1">
                  até
                </span>
                <span className="text-gray-900">
                  {semana[6].data} {semana[6].mes}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto p-8 bg-gray-50/50 text-[10px] text-gray-400 font-bold text-center uppercase tracking-[0.3em]">
          Cronograma v1.0
        </div>
      </div>
    </header>
  );
};
