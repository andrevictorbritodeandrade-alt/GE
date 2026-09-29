import React from 'react';
import { ScreenHeader } from './ScreenHeader';
import frequenciasImg from '../src/assets/images/frequencias_premium_1779983180555.png';
import notasImg from '../src/assets/images/notas_card_premium_1788455599418.jpg';
import { ChevronRight, Sparkles, ClipboardCheck, Award } from 'lucide-react';

interface DiarioNotasHubViewProps {
  onBack: () => void;
  onSelectFrequencias: () => void;
  onSelectNotas: () => void;
}

export const DiarioNotasHubView: React.FC<DiarioNotasHubViewProps> = ({
  onBack,
  onSelectFrequencias,
  onSelectNotas,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-20 select-none">
      {/* Header Padrão Unificado */}
      <ScreenHeader
        onBack={onBack}
        badge="SEEDUC-RJ • 2026"
        statusBadge="DIÁRIO OFICIAL"
        title="FREQUÊNCIAS & NOTAS"
        subtitle="Controle diário de presença, lançamento de avaliações, médias e estatísticas das turmas"
      />

      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 pointer-events-none select-none">
          📊
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Gestão Pedagógica de Turmas
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
            Diário de Classe & Registro Avaliativo
          </h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Selecione <strong>Frequências</strong> para gerenciar chamadas diárias, presenças e faltas por tempo, ou acesse <strong>Notas</strong> para lançamentos trimestrais, ponderações, recuperação e estatísticas consolidadas.
          </p>
        </div>
      </div>

      {/* The 2 Cards Grid - Exactly matching the user's reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {/* Card 1: FREQUÊNCIAS */}
        <div
          onClick={onSelectFrequencias}
          className="group relative aspect-[1.2/1] sm:aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-sky-400 hover:shadow-sky-500/20 flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {frequenciasImg && (
              <img
                src={frequenciasImg}
                alt="Frequências"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-sky-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-sky-500 text-white font-black text-[11px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Azul Celeste
            </span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-sky-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1.5">
            <div className="w-10 h-1.5 bg-sky-400 rounded-full mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-sky-300 transition-colors">
              FREQUÊNCIAS
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-normal">
              Chamadas diárias
            </p>
          </div>
        </div>

        {/* Card 2: NOTAS */}
        <div
          onClick={onSelectNotas}
          className="group relative aspect-[1.2/1] sm:aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-amber-400 hover:shadow-amber-500/20 flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {notasImg && (
              <img
                src={notasImg}
                alt="Notas"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-amber-950/20 group-hover:bg-amber-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-amber-500 text-white font-black text-[11px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Âmbar Dourado
            </span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1.5">
            <div className="w-10 h-1.5 bg-amber-400 rounded-full mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
              NOTAS
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-normal">
              Lançamento, médias e estatísticas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
