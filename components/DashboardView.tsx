import React, { useMemo } from 'react';
import { ViewState, ClassDataMap, ClassData } from '../types';

import frequenciasImg from '../src/assets/images/frequencias_premium_1779983180555.png';
import notasImg from '../src/assets/images/notas_card_premium_1788455599418.jpg';
import gradeHorariosImg from '../src/assets/images/grade_horarios_premium_1779983196214.png';
import estatisticasImg from '../src/assets/images/estatisticas_premium_1779983211882.png';
import ementaImg from '../src/assets/images/ementa_premium_1779983243784.png';
import planoCursoImg from '../src/assets/images/plano_curso_premium_1779983225779.png';
import gestaoProfessorImg from '../src/assets/images/gestao_professor_premium_1779983261744.png';
import calendarioImg from '../src/assets/images/calendario_2026_premium_1779983280133.png';
import registroDiarioImg from '../src/assets/images/registro_diario_premium_1779983296811.png';

interface DashboardViewProps {
  setView: (view: ViewState) => void;
  classData: ClassDataMap;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setView, classData }) => {
  
  // Quick stats calculation
  const stats = useMemo(() => {
    const classes = (Object.values(classData) as ClassData[]).filter(c => 
      c.school && c.school.trim() !== ''
    );
    
    let totalStudents = 0;
    let totalPresents = 0;
    let totalPossible = 0;

    classes.forEach(c => {
      totalStudents += c.students?.length || 0;
      c.students?.forEach(s => {
        if (s.attendance) {
          totalPresents += Object.values(s.attendance).filter(v => v === 'P').length;
          totalPossible += Object.keys(s.attendance).length;
        }
      });
    });

    const avgAttendance = totalPossible > 0 ? Math.round((totalPresents / totalPossible) * 100) : 87;

    return { totalStudents: totalStudents || 201, totalClasses: classes.length || 9, avgAttendance };
  }, [classData]);

  const menuCards = [
    {
      id: 'classes',
      title: 'FREQUÊNCIAS',
      description: 'Chamadas diárias',
      image: frequenciasImg,
      action: () => setView('classes'),
      colorName: 'Azul Celeste',
      badgeClass: 'bg-sky-500/90 text-white shadow-sm',
      barBg: 'bg-sky-400',
      hoverBorder: 'hover:border-sky-400 hover:shadow-sky-500/20',
      hoverText: 'group-hover:text-sky-300',
      glowGradient: 'from-sky-600/40',
      bgFallback: 'bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950'
    },
    {
      id: 'grades',
      title: 'NOTAS',
      description: 'Lançamento e médias',
      image: notasImg,
      action: () => setView('grades'),
      colorName: 'Âmbar Dourado',
      badgeClass: 'bg-amber-500/90 text-white shadow-sm',
      barBg: 'bg-amber-400',
      hoverBorder: 'hover:border-amber-400 hover:shadow-amber-500/20',
      hoverText: 'group-hover:text-amber-300',
      glowGradient: 'from-amber-600/40',
      bgFallback: 'bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950'
    },
    {
      id: 'schedule',
      title: 'GRADE DE HORÁRIOS',
      description: 'Cronograma semanal',
      image: gradeHorariosImg,
      action: () => setView('schedule'),
      colorName: 'Esmeralda',
      badgeClass: 'bg-emerald-500/90 text-white shadow-sm',
      barBg: 'bg-emerald-400',
      hoverBorder: 'hover:border-emerald-400 hover:shadow-emerald-500/20',
      hoverText: 'group-hover:text-emerald-300',
      glowGradient: 'from-emerald-600/40',
      bgFallback: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950'
    },
    {
      id: 'statistics',
      title: 'ESTATÍSTICAS',
      description: 'Assiduidade e médias',
      image: estatisticasImg,
      action: () => setView('statistics'),
      colorName: 'Índigo Violeta',
      badgeClass: 'bg-indigo-500/90 text-white shadow-sm',
      barBg: 'bg-indigo-400',
      hoverBorder: 'hover:border-indigo-400 hover:shadow-indigo-500/20',
      hoverText: 'group-hover:text-indigo-300',
      glowGradient: 'from-indigo-600/40',
      bgFallback: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950'
    },
    {
      id: 'ementa',
      title: 'EMENTA',
      description: 'Fundamentos e bases',
      image: ementaImg,
      action: () => setView('ementa'),
      colorName: 'Âmbar Dourado',
      badgeClass: 'bg-amber-500/90 text-white shadow-sm',
      barBg: 'bg-amber-400',
      hoverBorder: 'hover:border-amber-400 hover:shadow-amber-500/20',
      hoverText: 'group-hover:text-amber-300',
      glowGradient: 'from-amber-600/40',
      bgFallback: 'bg-gradient-to-br from-amber-950 via-slate-900 to-yellow-950'
    },
    {
      id: 'plano',
      title: 'PLANO DE CURSO',
      description: 'Planejamento trimestral',
      image: planoCursoImg,
      action: () => setView('plano'),
      colorName: 'Rosa Coral',
      badgeClass: 'bg-rose-500/90 text-white shadow-sm',
      barBg: 'bg-rose-400',
      hoverBorder: 'hover:border-rose-400 hover:shadow-rose-500/20',
      hoverText: 'group-hover:text-rose-300',
      glowGradient: 'from-rose-600/40',
      bgFallback: 'bg-gradient-to-br from-rose-950 via-slate-900 to-pink-950'
    },
    {
      id: 'decolonial',
      title: 'GESTÃO PROFESSOR',
      description: 'Corpos e mídias',
      image: gestaoProfessorImg,
      action: () => setView('decolonial'),
      colorName: 'Púrpura',
      badgeClass: 'bg-purple-500/90 text-white shadow-sm',
      barBg: 'bg-purple-400',
      hoverBorder: 'hover:border-purple-400 hover:shadow-purple-500/20',
      hoverText: 'group-hover:text-purple-300',
      glowGradient: 'from-purple-600/40',
      bgFallback: 'bg-gradient-to-br from-purple-950 via-slate-900 to-violet-950'
    },
    {
      id: 'calendar',
      title: 'CALENDÁRIO 2026',
      description: 'Rede SEEDUC/RJ',
      image: calendarioImg,
      action: () => setView('calendar'),
      colorName: 'Laranja Flame',
      badgeClass: 'bg-orange-500/90 text-white shadow-sm',
      barBg: 'bg-orange-400',
      hoverBorder: 'hover:border-orange-400 hover:shadow-orange-500/20',
      hoverText: 'group-hover:text-orange-300',
      glowGradient: 'from-orange-600/40',
      bgFallback: 'bg-gradient-to-br from-orange-950 via-slate-900 to-red-950'
    },
    {
      id: 'daily-activities',
      title: 'REGISTRO DIÁRIO',
      description: 'Diário de pautas',
      image: registroDiarioImg,
      action: () => setView('daily-activities'),
      colorName: 'Menta Teal',
      badgeClass: 'bg-teal-500/90 text-white shadow-sm',
      barBg: 'bg-teal-400',
      hoverBorder: 'hover:border-teal-400 hover:shadow-teal-500/20',
      hoverText: 'group-hover:text-teal-300',
      glowGradient: 'from-teal-600/40',
      bgFallback: 'bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-start py-1 px-1 sm:px-3 animate-fade-in select-none">
      
      {/* Ultra Compact Top Header & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-7 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">
              Prof. André Brito
            </h2>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Controle de Aulas • Ed. Física & Geografia
            </p>
          </div>
        </div>

        {/* 3 Compact Metric Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-xs">
            <span className="text-[11px]">👥</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Alunos:</span>
            <span className="font-black text-slate-900 text-xs">{stats.totalStudents}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-xl border border-emerald-200/70 text-xs">
            <span className="text-[11px]">📈</span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Assiduidade:</span>
            <span className="font-black text-emerald-800 text-xs">{stats.avgAttendance}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl border border-amber-200/70 text-xs">
            <span className="text-[11px]">🏫</span>
            <span className="text-[10px] font-bold text-amber-700 uppercase">Turmas:</span>
            <span className="font-black text-amber-800 text-xs">{stats.totalClasses}</span>
          </div>
        </div>
      </div>

      {/* 8 Square Cards Grid (4x2 on desktop, 2x4 on mobile) - Guaranteed to fit on one screen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 w-full">
        {menuCards.map((card) => (
          <div 
            key={card.id}
            onClick={card.action}
            className={`group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-slate-300/40 ${card.bgFallback} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${card.hoverBorder}`}
          >
            {/* Card Background Illustration */}
            <div className="absolute inset-0 z-0">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-500"
              />
              {/* Color glow overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${card.glowGradient} via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-[1]`} />
              {/* Dark protection gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:via-black/40 transition-all duration-300 z-[2]" />
            </div>

            {/* Color Tag Badge (Top Left) */}
            <div className="absolute top-2 left-2 z-10">
              <span className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider rounded-lg backdrop-blur-md ${card.badgeClass}`}>
                {card.colorName}
              </span>
            </div>

            {/* Card Content (Bottom) */}
            <div className="absolute inset-0 p-2.5 sm:p-3.5 z-10 flex flex-col justify-end items-start text-left">
              {/* Color indicator bar */}
              <div className={`w-6 h-[2.5px] ${card.barBg} rounded-full mb-1 sm:mb-1.5 group-hover:w-10 transition-all duration-300`} />

              <h3 className={`text-xs sm:text-sm md:text-base font-black text-white leading-tight uppercase tracking-tight ${card.hoverText} drop-shadow-sm`}>
                {card.title}
              </h3>
              
              <p className="text-[9px] sm:text-[11px] text-slate-200 font-semibold line-clamp-1 mt-0.5 opacity-90 group-hover:opacity-100">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
