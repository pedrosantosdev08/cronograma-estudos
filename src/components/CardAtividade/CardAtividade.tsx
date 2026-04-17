import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Atividade } from "../Cronograma/Cronograma";

interface CardAtividadeProps {
  atividade: Atividade;
  onDelete: () => void;
}

const colorVariants = {
  blue: "bg-blue-50/80 border-blue-100 text-blue-800 shadow-blue-100/20",
  rose: "bg-rose-50/80 border-rose-100 text-rose-800 shadow-rose-100/20",
  amber: "bg-amber-50/80 border-amber-100 text-amber-800 shadow-amber-100/20",
  emerald: "bg-emerald-50/80 border-emerald-100 text-emerald-800 shadow-emerald-100/20",
} as const;

export const CardAtividade = ({ atividade, onDelete }: CardAtividadeProps) => {
  const variant = colorVariants[atividade.cor as keyof typeof colorVariants] || colorVariants.blue;

  return (
    <div
      className={`
        relative p-4 rounded-2xl border transition-all duration-300
        group hover:shadow-xl hover:-translate-y-1 flex flex-col gap-2
        ${variant}
      `}
    >
      {/* Botão Deletar: Ajustado para o novo padding */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="
          absolute -top-2 -right-2 
          bg-white text-red-500 border border-red-300
          w-8 h-8 rounded-full 
          flex items-center justify-center 
          shadow-lg hover:bg-red-500 hover:text-white
          transition-all duration-200 z-10
          md:opacity-0 md:group-hover:opacity-100
        "
        aria-label="Excluir atividade"
      >
        <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
      </button>

      {/* Cabeçalho do Card: Matéria */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Ícone discreto para reforçar o contexto de estudo */}
          <span>&#x2022;</span>
          <h4 className="text-[15px] leading-tight tracking-tight uppercase lg:text-[11px]">
            {atividade.materia}
          </h4>
        </div>
      </div>

      {/* Conteúdo: */}
      <p className="text-[11px] leading-relaxed opacity-80 line-clamp-3 font-medium">
        {atividade.conteudo}
      </p>

      {/* Rodapé: Duração */}
      <div className="flex items-center mt-1">
        <div className="
          flex items-center gap-1.5 px-2.5 py-1 rounded-lg
          bg-white/40 border border-white/20 
          text-[10px] font-black tracking-widest uppercase
        ">
          <FontAwesomeIcon icon={faClock} className="opacity-40" />
          <span>{atividade.duracao}</span>
        </div>
      </div>
    </div>
  );
};