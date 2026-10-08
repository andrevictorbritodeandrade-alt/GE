import React from 'react';
import { ScreenHeader } from './ScreenHeader';
import planoAnualImg from '../src/assets/images/plano_anual_capa_1788477231515.jpg';
import planejamentoImg from '../src/assets/images/planejamento_capa_1788477213719.jpg';
import aulasDatashowImg from '../src/assets/images/aulas_datashow_capa_1788477246185.jpg';
import repositorioProvasImg from '../src/assets/images/repositorio_provas_capa_1788477270457.jpg';
import { ChevronRight } from 'lucide-react';

interface PlanosAulasHubViewProps {
  onBack: () => void;
  onSelectPlanoDeCurso: () => void;
  onSelectPlanosDeAula: () => void;
  onSelectAulasDatashow: () => void;
  onSelectRepositorioProvas: () => void;
}

export const PlanosAulasHubView: React.FC<PlanosAulasHubViewProps> = ({
  onBack,
  onSelectPlanoDeCurso,
  onSelectPlanosDeAula,
  onSelectAulasDatashow,
  onSelectRepositorioProvas,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-20 select-none">
      {/* Header Padrão Unificado */}
      <ScreenHeader
        onBack={onBack}
        badge="SEEDUC-RJ • 2026"
        statusBadge="PLANEJAMENTO & RECURSOS"
        title="PLANOS & AULAS"
        subtitle="Plano de curso, planos de aula, apresentações em Datashow e repositório de provas teóricas"
      />

      {/* 4 Cards Grid - 2x2 Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
        {/* Card 1: PLANO DE CURSO (ex-Plano Anual) */}
        <div
          onClick={onSelectPlanoDeCurso}
          className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-emerald-400 hover:shadow-emerald-500/20 flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {planoAnualImg && (
              <img
                src={planoAnualImg}
                alt="Plano de Curso"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-emerald-500 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Esmeralda
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1">
            <div className="w-9 h-1 bg-emerald-400 rounded-full mb-1.5" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
              PLANO DE CURSO
            </h3>
            <p className="text-slate-300 text-xs font-medium tracking-normal">
              Gestão de aulas de PE
            </p>
          </div>
        </div>

        {/* Card 2: PLANOS DE AULA (ex-Planejamento) */}
        <div
          onClick={onSelectPlanosDeAula}
          className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-blue-400 hover:shadow-blue-500/20 flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {planejamentoImg && (
              <img
                src={planejamentoImg}
                alt="Planos de Aula"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-blue-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-blue-500 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Azul
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1">
            <div className="w-9 h-1 bg-blue-400 rounded-full mb-1.5" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-300 transition-colors">
              PLANOS DE AULA
            </h3>
            <p className="text-slate-300 text-xs font-medium tracking-normal">
              Cronograma e resumos
            </p>
          </div>
        </div>

        {/* Card 3: AULAS (DATASHOW) */}
        <div
          onClick={onSelectAulasDatashow}
          className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-purple-400 hover:shadow-purple-500/20 flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {aulasDatashowImg && (
              <img
                src={aulasDatashowImg}
                alt="Aulas Datashow"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-purple-950/20 group-hover:bg-purple-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-purple-500 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Púrpura
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1">
            <div className="w-9 h-1 bg-purple-400 rounded-full mb-1.5" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-purple-300 transition-colors">
              AULAS (DATASHOW)
            </h3>
            <p className="text-slate-300 text-xs font-medium tracking-normal">
              Slides apresentação
            </p>
          </div>
        </div>

        {/* Card 4: REPOSITÓRIO DE PROVAS */}
        <div
          onClick={onSelectRepositorioProvas}
          className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border border-slate-300/30 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] hover:border-cyan-400 hover:shadow-cyan-500/20 flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            {repositorioProvasImg && (
              <img
                src={repositorioProvasImg}
                alt="Repositório de Provas"
                className="w-full h-full object-cover object-center brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-cyan-950/20 group-hover:bg-cyan-900/10 transition-colors duration-300" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-cyan-500 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Ciano
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 space-y-1">
            <div className="w-9 h-1 bg-cyan-400 rounded-full mb-1.5" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
              REPOSITÓRIO DE PROVAS
            </h3>
            <p className="text-slate-300 text-xs font-medium tracking-normal">
              Avaliações teóricas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
