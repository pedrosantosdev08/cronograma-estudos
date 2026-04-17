import {
  faArrowTrendUp,
  faBook,
  faCalendar,
  faFileLines,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

export interface Bloco {
  id: "manha" | "tarde" | "noite";
  nome: string;
  subtitulo: string;
  icone: string;
}

export const OPCOES_CORES = [
  { id: "cyan", bg: "bg-cyan-400" },
  { id: "rose", bg: "bg-rose-900" },
  { id: "amber", bg: "bg-amber-400" },
  { id: "emerald", bg: "bg-emerald-400" },
];

export const NAVCARD_DATA = [
  {
    id: 1,
    icon: faCalendar,
    navTitle: "Horário Semanal",
    navDescription: "Organize sua semana de estudos com blocos de energia",
    navSubTitle: "Sessões esta semana",
    iconColor: "#891CFC",
    path: "/cronograma"
  },
  {
    id: 2,
    icon: faBook,
    navTitle: "Conteúdos",
    navDescription: "Acesse materiais e recursos de estudo organizados",
    navSubTitle: "Materiais disponíveis",
    iconColor: "#0082D2",
    path: "/conteudos"
  },
  {
    id: 3,
    icon: faListCheck,
    navTitle: "Checklist de Assuntos",
    navDescription: "Acompanhe o progresso em cada matéria",
    navSubTitle: "Concluídos",
    iconColor: "#00B25D",
    path: "/checklist"
  },
  {
    id: 4,
    icon: faFileLines,
    navTitle: "Minhas Redações",
    navDescription: "Pratique e revise suas redações",
    navSubTitle: "Redações escritas",
    iconColor: "#FF7400",
    path: "/redacao"
  },
  {
    id: 5,
    icon: faArrowTrendUp,
    navTitle: "Meu desempenho",
    navDescription: "Visualize estatísticas e evolução nos estudos",
    navSubTitle: "Média geral",
    iconColor: "#F61263",
    path: "/desempenho"
  },
];
