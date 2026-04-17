import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InfoCardProps {
  icon: IconDefinition;
  number: number | string;
  description: string;
   
}

export const InfoCard = ({ icon, number, description, }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#171325] border border-gray-100/10 shadow-sm">
      {/* Container do Ícone */}
      <div className={ "flex text-(--primary) bg-[#221A39] items-center justify-center w-12 h-12 bg-opacity-10 rounded-2xl"}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>

      {/* Container do Texto */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-white">
          {number}
        </span>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
};