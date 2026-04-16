import {
  faCheck,
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OPCOES_CORES } from "../../data/data";
import { useEffect, useRef, useState } from "react";
import type { FormularioProps } from "../../utils/dateUtils";

export const FormularioAtividade = ({ onSave, onCancel }: FormularioProps) => {
  const [materia, setMateria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [duracao, setDuracao] = useState("1h");
  const [cor, setCor] = useState("blue");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!materia.trim()) return;
    onSave({ materia, conteudo, duracao, cor });
  };

  return (
    <div
      ref={formRef}
      onClick={(e) => e.stopPropagation()}
      className="
        p-4 bg-white shadow-2xl rounded-2xl border-2 border-blue-500/20 
        flex flex-col gap-3 z-50 relative 
        w-full max-w-full box-border
        animate-in fade-in zoom-in slide-in-from-top-2 duration-300
        
      "
    >
      {/* Campo Matéria */}
      <div className="flex flex-col gap-1 w-full ">
        <label className="text-[9px] font-black text-(--text-accent) uppercase tracking-widest ml-1">
          Matéria
        </label>
        <select
          autoFocus
          className="w-full text-sm font-bold outline-none bg-gray-50 text-black rounded-lg p-2.5 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-(--primary)"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        >
          <option value="">Selecione uma matéria</option>
          <option value="Matemática">Matemática</option>
          <option value="Física">Física</option>
          <option value="Química">Química</option>
          <option value="Biologia">Biologia</option>
          <option value="História">História</option>
          <option value="Geográfia">Geográfia</option>
          <option value="Português">Português</option>
          <option value="Inglês">Inglês</option>
          <option value="Redação">Redação</option>
        </select>
      </div>

      {/* Campo Conteúdo */}
      <div className="flex flex-col gap-1 w-full text-(--primary)">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Assunto
        </label>
        <input
          className="w-full text-xs outline-none bg-gray-50 rounded-lg p-2.5 focus:bg-white border border-transparent focus:border-(--primary) transition-all"
          placeholder="O que vai estudar?"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />
      </div>

      {/* Seção Inferior: Duração e Cores */}
      <div className="flex flex-col gap-3 w-full text-(--primary)">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[9px] font-black text-(--primary) uppercase tracking-widest ml-1">
            Duração
          </label>
          <div className="relative w-full">
            <select
              className="
                w-full text-xs outline-none bg-gray-50 rounded-lg 
                p-2.5 pr-10 border border-transparent 
                focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50
                cursor-pointer appearance-none transition-all font-medium text-gray-700
              "
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
            >
              <option value="30min">30 minutos</option>
              <option value="1h">1 hora</option>
              <option value="1h30">1h 30m</option>
              <option value="2h">2 horas</option>
              <option value="3h">3 horas</option>
            </select>
            {/* Ícone de seta para indicar que é um select (já que usamos appearance-none) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
            </div>
          </div>
        </div>

        {/* Seleção de Cores - Agora com flex-wrap para não quebrar em colunas estreitas */}
        <div className="flex flex-wrap gap-2 py-1 justify-center w-full">
          {OPCOES_CORES.map((opcao) => (
            <button
              key={opcao.id}
              type="button"
              title={opcao.id}
              onClick={() => setCor(opcao.id)}
              className={`w-5 h-5 rounded-full ${opcao.bg} transition-all duration-300 ${
                cor === opcao.id
                  ? "ring-2 ring-offset-2 ring-blue-500 scale-110 shadow-md"
                  : "opacity-40 hover:opacity-100 scale-90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-wrap  gap-2 pt-2 border-t border-gray-50 w-full">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-all uppercase tracking-tighter min-w-20"
          onClick={onCancel}
        >
          <FontAwesomeIcon icon={faXmark} /> Cancelar
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={!materia.trim()}
          className="
            flex-2 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl
            text-[10px] font-black uppercase tracking-tighter shadow-md transition-all
            enabled:bg-(--primary) enabled:text-white enabled:hover:bg-(--primary) enabled:active:scale-95
            disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none min-w-25
          "
        >
          <FontAwesomeIcon icon={faCheck} /> Confirmar
        </button>
      </div>
    </div>
  );
};
