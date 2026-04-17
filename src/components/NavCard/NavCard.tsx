import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface NavCardProps {
  icon: IconDefinition;
  navTitle: string;
  navDescription: string;
  path: string; // ✅ Está aqui
  navSubTitle: string;
  onClick?: () => void;
  iconColor?: string;
}

interface CustomCSS extends React.CSSProperties {
  [key: string]: string | number | undefined;
}

export const NavCard = ({
  icon,
  navTitle,
  navDescription,
  navSubTitle,
  path,          
  iconColor = "#891CFC",
  onClick,
}: NavCardProps) => {
  
  const dynamicStyle: CustomCSS = {
    "--hover-glow": `linear-gradient(to top right, var(--bg-card) 70%, ${iconColor}33 105%)`,
    "--shadow-color": `${iconColor}44`,
    "--icon-bg-gradient": `linear-gradient(135deg, ${iconColor}22, #2C2147)`,
  };

  return (
    <Link
      to={path} // ✅ Agora o 'path' existe para o Link
      style={dynamicStyle}
      onClick={onClick}
      className="flex flex-col p-6 bg-(--bg-card) rounded-2xl border border-transparent 
                 transition-all duration-300 cursor-pointer w-full no-underline 
                 hover:bg-[image:var(--hover-glow)]                  
                 hover:shadow-[0_0_30px_var(--shadow-color)]
                 hover:border-white/5 group"
    >
      {/* Container do Ícone */}
      <div
        style={{ backgroundImage: "var(--icon-bg-gradient)" }}
        className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl 
                   border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300"
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: iconColor }}
          className="text-xl"
        />
      </div>

      {/* Conteúdo de Texto */}
      <h4 className="font-bold text-white text-lg mb-2">{navTitle}</h4>
      <p className="text-sm text-gray-400 leading-relaxed mb-6 grow">
        {navDescription}
      </p>

      {/* Separador e Subtítulo */}
      <div className="w-full bg-white/10 h-px mb-4"></div>
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest italic">
        {navSubTitle}
      </span>
    </Link>
  );
};