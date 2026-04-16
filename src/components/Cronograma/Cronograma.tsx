import React, { useState } from "react";
import { FormularioAtividade } from "../FormularioAtividade/FormularioAtividade";
import { SlotVazio } from "../ui/SlotVazio/SlotVazio";
import { CardAtividade } from "../CardAtividade/CardAtividade";

import type { DiaSemana } from "../../utils/dateUtils";

export interface Atividade {
  materia: string;

  conteudo: string;

  duracao: string;

  cor: string;
}

interface CronogramaProps {
  semana: DiaSemana[];

  atividades: Record<string, Atividade[]>;

  setAtividades: React.Dispatch<
    React.SetStateAction<Record<string, Atividade[]>>
  >;
}

interface CronogramaProps {
  semana: DiaSemana[];
  atividades: Record<string, Atividade[]>;
  setAtividades: React.Dispatch<
    React.SetStateAction<Record<string, Atividade[]>>
  >;
}

export const Cronograma = ({
  semana,
  atividades,
  setAtividades,
}: CronogramaProps) => {
  const [slotAtivo, setSlotAtivo] = useState<string | null>(null);

  const handleAddAtividade = (idDoSlot: string, dadosNovos: Atividade) => {
    setAtividades((prev) => ({
      ...prev,
      [idDoSlot]: [...(prev[idDoSlot] || []), dadosNovos],
    }));
    setSlotAtivo(null);
  };

  const handleDeleteAtividade = (
    idDoSlot: string,
    indexParaRemover: number,
  ) => {
    setAtividades((prev) => {
      const listaAtual = prev[idDoSlot] || [];
      const novaLista = listaAtual.filter(
        (_, index) => index !== indexParaRemover,
      );
      const novoEstado = { ...prev };
      if (novaLista.length === 0) {
        delete novoEstado[idDoSlot];
      } else {
        novoEstado[idDoSlot] = novaLista;
      }
      return novoEstado;
    });
  };

  return (
    <main
      className="
        flex flex-col gap-10        
        md:grid md:grid-cols-7 md:gap-6 
      bg-white p-4 md:p-10 
        rounded-3xl md:rounded-[3rem] 
        shadow-[0_0_10px_rgba(59,130,246,0.3)] shadow-blue-400
       mt-8
      "
    >
      {semana.map((dia) => {
        const idDoSlot = `${dia.data}-${dia.mes}`;
        const listaDeAtividades = atividades[idDoSlot] || [];
        const estaEditando = slotAtivo === idDoSlot;

        return (
          /* Este container agora é a "coluna" do dia no Desktop e o "bloco" no Mobile */
          <div key={idDoSlot} className="flex flex-col gap-4">
            {/* CABEÇALHO DO DIA */}
            <div className="flex flex-col items-start md:items-center min-w-0">
              <span className="text-[10px] uppercase font-black text-(--text-accent) tracking-[0.2em] mb-1">
                {dia.nome.slice(0, 3)}
              </span>
              <span className="text-2xl md:text-3xl font-black text-gray-700">
                {dia.data}
              </span>
              <div className="w-8 h-1 bg-(--primary) rounded-full mt-2" />
            </div>

            {/* CONTAINER DE CARDS */}
            <div
              className="               
                flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x
                md:flex-col md:overflow-visible md:pb-0 md:min-h-100
              "
            >
              {listaDeAtividades.map((atv, index) => (
                <div
                  key={`${idDoSlot}-${index}`}
                  /* min-w-70 ou similar para o card não encolher no mobile */
                  className="min-w-70 md:min-w-0 snap-center"
                >
                  <CardAtividade
                    atividade={atv}
                    onDelete={() => handleDeleteAtividade(idDoSlot, index)}
                  />
                </div>
              ))}

              {estaEditando ? (
                <div className="min-w-70 md:min-w-0 animate-in fade-in slide-in-from-top-4 duration-300">
                  <FormularioAtividade
                    onSave={(dados) => handleAddAtividade(idDoSlot, dados)}
                    onCancel={() => setSlotAtivo(null)}
                  />
                </div>
              ) : (
                <div className="min-w-70 md:min-w-0">
                  <SlotVazio onClick={() => setSlotAtivo(idDoSlot)} />
                </div>
              )}
            </div>

            {/* Divisor visual apenas no mobile */}
            <hr className="md:hidden border-gray-100 mt-2" />
          </div>
        );
      })}
    </main>
  );
};
