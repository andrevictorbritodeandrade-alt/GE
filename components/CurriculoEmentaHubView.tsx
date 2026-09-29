import React from 'react';
import { ScreenHeader } from './ScreenHeader';
import ementaImg from '../src/assets/images/ementa_premium_1779983243784.png';
import planoCursoImg from '../src/assets/images/plano_curso_premium_1779983225779.png';
import { BookOpen, Layers, Sparkles, GraduationCap, ChevronRight, FileText } from 'lucide-react';

interface CurriculoEmentaHubViewProps {
  onBack: () => void;
  onSelectEmenta: () => void;
  onSelectCurriculo: () => void;
}

export const CurriculoEmentaHubView: React.FC<CurriculoEmentaHubViewProps> = ({
  onBack,
  onSelectEmenta,
  onSelectCurriculo,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-20 select-none">
      {/* Header Padrão Unificado */}
      <ScreenHeader
        onBack={onBack}
        badge="SEEDUC-RJ • 2026"
        statusBadge="DIRETRIZES OFICIAIS"
        title="CURRÍCULO & EMENTA"
        subtitle="Bases fundamentais, ementa oficial e matriz curricular trimestral da disciplina"
      />

      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 pointer-events-none select-none">
          📚
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Estrutura Pedagógica Integrada
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
            Diretrizes Curriculares & Planejamento 2026
          </h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Selecione abaixo para consultar a <strong>Ementa Oficial</strong> com fundamentação teórica e metodológica, ou acesse o <strong>Currículo</strong> com o planejamento trimestral detalhado por componente e unidade escolar.
          </p>
        </div>
      </div>

      {/* The 2 Cards Grid - Exactly matching the user's reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {/* Card 1: EMENTA */}
        <div
          onClick={onSelectEmenta}
          className="group relative aspect-[1.2/1] sm:aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-amber-950 via-slate-900 to-yellow-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-amber-400 hover:shadow-amber-500/20 flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {ementaImg && (
              <img
                src={ementaImg}
                alt="Ementa"
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
              EMENTA
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-normal">
              Fundamentos e bases
            </p>
          </div>
        </div>

        {/* Card 2: CURRÍCULO (ex-Plano de Curso) */}
        <div
          onClick={onSelectCurriculo}
          className="group relative aspect-[1.2/1] sm:aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-rose-950 via-slate-900 to-pink-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-rose-400 hover:shadow-rose-500/20 flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {planoCursoImg && (
              <img
                src={planoCursoImg}
                alt="Currículo"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-rose-950/20 group-hover:bg-rose-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-rose-500 text-white font-black text-[11px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Rosa Coral
            </span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-rose-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1.5">
            <div className="w-10 h-1.5 bg-rose-400 rounded-full mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-rose-300 transition-colors">
              CURRÍCULO
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-normal">
              Planejamento trimestral
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
