import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = 'Voltar',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm md:text-base rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 uppercase tracking-wider cursor-pointer border border-blue-400/30 group select-none ${className}`}
      title={label}
    >
      <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-1.5 duration-200 shrink-0" strokeWidth={2.8} />
      <span className="font-black tracking-wide">{label}</span>
    </button>
  );
};

export default BackButton;
