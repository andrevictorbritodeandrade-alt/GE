import React from 'react';
import { BackButton } from './BackButton';

interface ScreenHeaderProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  statusBadge?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  rightExtra?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onBack,
  title,
  subtitle,
  badge = 'SEEDUC-RJ • 2026',
  statusBadge = 'ATIVO',
  rightTitle = 'PROFESSOR RESPONSÁVEL',
  rightSubtitle = 'André Victor Brito de Andrade',
  rightExtra = 'CREF 039443 G/RJ • SEEDUC-RJ',
  actions,
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl text-white mb-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <BackButton onClick={onBack} label="VOLTAR" />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            {badge && (
              <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-wider border border-blue-400/30">
                {badge}
              </span>
            )}
            {statusBadge && (
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                {statusBadge}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-300 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
        {actions}
        <div className="text-left md:text-right">
          {rightTitle && (
            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">
              {rightTitle}
            </p>
          )}
          {rightSubtitle && (
            <p className="text-base font-black text-white">
              {rightSubtitle}
            </p>
          )}
          {rightExtra && (
            <p className="text-[11px] text-slate-400 font-medium">
              {rightExtra}
            </p>
          )}
        </div>
      </div>

      {children && <div className="w-full mt-2 pt-3 border-t border-white/10">{children}</div>}
    </div>
  );
};
