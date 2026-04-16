export interface Bloco {
  id: 'manha' | 'tarde' | 'noite'; 
  nome: string;
  subtitulo: string;
  icone: string;
}

export const BLOCOS:Bloco[]  = [
  { id: "manha", nome: "Foco Profundo", subtitulo: "Manhã", icone: "🌅" },
  { id: "tarde", nome: "Equilíbrio", subtitulo: "Tarde", icone: "☀️" },
  { id: "noite", nome: "Revisão", subtitulo: "Noite", icone: "🌙" },
];

export const OPCOES_CORES = [
  { id: 'blue', bg: 'bg-blue-500' },
  { id: 'rose', bg: 'bg-rose-500' },
  { id: 'amber', bg: 'bg-amber-500' },
  { id: 'emerald', bg: 'bg-emerald-500' },
];