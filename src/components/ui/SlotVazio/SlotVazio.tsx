import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SlotVazioProps {
  onClick: () => void;
}

export const SlotVazio = ({ onClick }: SlotVazioProps) => {
  return (
    <button
      onClick={onClick}
      // 1. Mudança para <button> por semântica e acessibilidade
      // 2. Ajuste de min-h para ser consistente com o CardAtividade
      className="
        group h-full min-h-30 w-full 
        border-2 border-dashed border-gray-600 rounded-2xl
        flex items-center justify-center 
        transition-all duration-300 ease-out
        hover:border-(--primary) hover:bg-purple-50/50 hover:shadow-sm
        active:scale-[0.98] active:bg-purple-100/50
        focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-purple-400
      "
    >
      <div className="flex flex-col items-center gap-2 transition-all duration-300">
        {/* Ícone estilizado com círculo de fundo no hover */}
        <div
          className="
          md:opacity-0 md:group-hover:opacity-100 
          w-8 h-8 rounded-full border border-gray-200 
          flex items-center justify-center
          text-gray-300 transition-all duration-300
          group-hover:border-blue-300 group-hover:bg-white group-hover:text-purple-500
          group-hover:rotate-90
        "
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
        </div>

        {/* Texto: Visível no mobile, mas ganha destaque no hover do desktop */}
        <span
          className="
          text-[9px] font-black uppercase tracking-[0.2em]
          text-gray-300 transition-all duration-300
          md:opacity-0 md:group-hover:opacity-100 /* Esconde no desktop, mostra no mobile */
          group-hover:text-purple-500
        "
        >
          Adicionar
        </span>
      </div>
    </button>
  );
};
