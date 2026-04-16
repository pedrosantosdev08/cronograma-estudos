
  export interface DiaSemana {
  nome: string;
  data: number;
  mes: string;
  ano: number;
}

interface Atividade {
  materia: string;
  conteudo: string;
  duracao: string;
  cor: string;
}

export interface FormularioProps {
  onSave: (dados: Atividade) => void;
  onCancel: () => void;
}

export const gerarSemanaAtual = (): DiaSemana[] => {
    const hoje = new Date();
    const domingo = new Date(hoje);
    domingo.setDate(hoje.getDate() - hoje.getDay());
    const semana = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo);
      dia.setDate(domingo.getDate() + i);

      semana.push({
        nome: dia.toLocaleDateString("pt-BR", { weekday: "long" }),
        data: dia.getDate(),
        mes: dia.toLocaleDateString("pt-BR", { month: "long" }),
        ano: dia.getFullYear(),
      });
    }

    return semana;
  };


