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
        /* Estrutura Base: Mobile primeiro */
         flex flex-col gap-10 mt-2 p-4 rounded-3xl  bg-(--bg-card) 
        
        /* Tablet: Começa a transição para grid mas com scroll se necessário */
        sm:p-6 
        
        /* Desktop: Layout de 7 colunas fixas */
        lg:grid lg:grid-cols-7 lg:gap-4 lg:p-8 lg:rounded-2xl 
      "
    >
      {semana.map((dia) => {
        const idDoSlot = `${dia.data}-${dia.mes}`;
        const listaDeAtividades = atividades[idDoSlot] || [];
        const estaEditando = slotAtivo === idDoSlot;

        return (
          <div key={idDoSlot} className="flex flex-col gap-4 min-w-0">
            {/* CABEÇALHO DO DIA - Centralizado no desktop, alinhado à esquerda no mobile */}
            <div className="flex flex-col items-start lg:items-center min-w-0">
              <span className="text-2xl capitalize font-black text-(--text-accent) mb-1">
                {dia.nome.slice(0, 3)}
              </span>
              <span className="text-2xl md:text-2xl text-white">
                {dia.data}
              </span>
              <div className="w-8 h-1 bg-(--primary) rounded-full mt-2" />
            </div>

            {/* CONTAINER DE CARDS - Horizontal no mobile/tablet, Vertical no Desktop */}
            <div
              className="               
                flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x
                lg:flex-col lg:overflow-visible lg:pb-0 lg:min-h-[400px]
              "
            >
              {listaDeAtividades.map((atv, index) => (
                <div
                  key={`${idDoSlot}-${index}`}
                  /* min-w-[280px] garante que o card seja legível no scroll horizontal */
                  className="min-w-[280px] lg:min-w-0 snap-center"
                >
                  <CardAtividade
                    atividade={atv}
                    onDelete={() => handleDeleteAtividade(idDoSlot, index)}
                  />
                </div>
              ))}

              {estaEditando ? (
                <div className="min-w-[280px] lg:min-w-0 animate-in fade-in slide-in-from-top-4 duration-300">
                  <FormularioAtividade
                    onSave={(dados) => handleAddAtividade(idDoSlot, dados)}
                    onCancel={() => setSlotAtivo(null)}
                  />
                </div>
              ) : (
                <div className="min-w-[280px] lg:min-w-0">
                  <SlotVazio onClick={() => setSlotAtivo(idDoSlot)} />
                </div>
              )}
            </div>

            {/* Divisor visual apenas abaixo do Desktop */}
            <hr className="lg:hidden border-gray-100 mt-2" />
          </div>
        );
      })}
    </main>
  );
};