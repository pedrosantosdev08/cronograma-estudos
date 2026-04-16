import { 
  faBookBookmark, 
  faCalendarCheck, 
  faClock, 
  faLayerGroup 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 1. Tipagem explícita em vez de 'any' para melhor DX e evitar bugs
interface StatsProps {
  stats: {
    materiasUnicas: number;
    totalSessoes: number;
    diasAtivos: number;
    horasTotais: number | string;
  };
}

export const ResumoCards = ({ stats }: StatsProps) => {
  // 2. Configuração de itens com ícones e cores temáticas
  const itens = [
    { 
      label: "Matérias", 
      valor: stats.materiasUnicas, 
      icon: faBookBookmark, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Sessões", 
      valor: stats.totalSessoes, 
      icon: faLayerGroup, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      label: "Dias Ativos", 
      valor: stats.diasAtivos, 
      icon: faCalendarCheck, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Horas Totais", 
      valor: `${stats.horasTotais}h`, 
      icon: faClock, 
      color: "text-amber-600", 
      bg: "bg-amber-50" 
    },
  ];

  return (
    // 3. Grid responsivo: 2 colunas no mobile, 4 no desktop
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {itens.map((item) => (
        <div 
          key={item.label} 
          className="relative overflow-hidden bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md group"
        >
          {/* Decoração sutil de fundo */}
          <div className={`absolute -right-2 -top-2 w-12 h-12 rounded-full opacity-10 transition-transform group-hover:scale-150 ${item.bg}`} />

          <div className="flex flex-col items-center md:items-start gap-3">
            {/* Ícone com Badge */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${item.bg} ${item.color} text-sm`}>
              <FontAwesomeIcon icon={item.icon} />
            </div>

            <div className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
                {item.valor}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-[0.1em] mt-1">
                {item.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};