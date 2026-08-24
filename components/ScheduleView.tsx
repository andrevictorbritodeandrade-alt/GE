import React from 'react';
import { ScreenHeader } from './ScreenHeader';
import { Clock, Calendar as CalendarIcon, MapPin, School, BookOpen, User, CheckCircle2 } from 'lucide-react';

interface ScheduleViewProps {
  onBack: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header Padrão Unificado */}
      <ScreenHeader
        onBack={onBack}
        badge="GRADE HORÁRIA OFICIAL • 2026"
        statusBadge="ATIVO"
        title="QUADRO DE HORÁRIOS E LOTAÇÃO"
        subtitle="Grade horária semanal de aulas de Educação Física nas unidades escolares em exercício"
        rightTitle="PROFESSOR RESPONSÁVEL"
        rightSubtitle="André Victor Brito de Andrade"
        rightExtra="CREF 039443 G/RJ • SEEDUC-RJ"
      />

      {/* Visão Geral da Lotação nas Unidades Escolares */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. EE Cordélia Paiva */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
              Segunda • Manhã
            </span>
            <h3 className="font-black text-slate-900 text-sm mt-2 leading-tight">EE Profª Cordélia Paiva</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Turmas 802, 803, 801 (8º EF)</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-700 font-bold">
            <span>07:00 às 12:15</span>
            <span className="bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">Manhã</span>
          </div>
        </div>

        {/* 2. CIEP 229 */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-purple-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md">
              Segunda • Noite
            </span>
            <h3 className="font-black text-slate-900 text-sm mt-2 leading-tight">CIEP 229 Cândido Portinari</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Turma EJANEM I01 (EJA Médio)</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-700 font-bold">
            <span>19:00 às 19:30</span>
            <span className="bg-purple-50 px-1.5 py-0.5 rounded text-[10px]">Noite</span>
          </div>
        </div>

        {/* 3. CE Dr. Ignácio Bezerra */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
              Sexta • Manhã
            </span>
            <h3 className="font-black text-slate-900 text-sm mt-2 leading-tight">CE Dr. Ignácio Bezerra</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">ILGCH 1001, IFFC 2001, IFLA 2002</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
            <span>07:00 às 12:15</span>
            <span className="bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Manhã</span>
          </div>
        </div>

        {/* 4. CIEP 369 */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
              Sexta • Tarde
            </span>
            <h3 className="font-black text-slate-900 text-sm mt-2 leading-tight">CIEP 369</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Educação Física</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-700 font-bold">
            <span>14:25 às 16:20</span>
            <span className="bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">Tarde</span>
          </div>
        </div>

        {/* 5. CIEP 476 */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-rose-100 text-rose-900 rounded-md">
              Sexta • Noite
            </span>
            <h3 className="font-black text-slate-900 text-sm mt-2 leading-tight">CIEP 476</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">Educação Física</p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-rose-700 font-bold">
            <span>19:30 às 20:30</span>
            <span className="bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">Noite</span>
          </div>
        </div>
      </div>

      {/* Matriz Completa do Horário Semanal: Segunda e Sexta */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-xl border border-white/20 bg-white/95 backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" /> Grade Horária Semanal
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Dias de regência: Segunda-Feira e Sexta-Feira
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
              <CheckCircle2 size={14} className="text-blue-600" /> 5 Unidades Escolares
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="border border-slate-800 p-4 text-center font-black uppercase tracking-wider text-xs w-56">Turno / Horário</th>
                <th className="border border-slate-800 p-4 text-center font-black uppercase tracking-wider text-xs bg-blue-900/80 w-1/2">
                  <div className="flex items-center justify-center gap-2 text-base">
                    <span>📅</span> SEGUNDA-FEIRA
                  </div>
                  <span className="text-[11px] text-blue-200 font-normal normal-case">EE Profª Cordélia Paiva & CIEP 229</span>
                </th>
                <th className="border border-slate-800 p-4 text-center font-black uppercase tracking-wider text-xs bg-emerald-900/80 w-1/2">
                  <div className="flex items-center justify-center gap-2 text-base">
                    <span>📅</span> SEXTA-FEIRA
                  </div>
                  <span className="text-[11px] text-emerald-200 font-normal normal-case">CE Dr. Ignácio Bezerra, CIEP 369 & CIEP 476</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  period: '1º e 2º Tempos (Manhã)', 
                  time: '07:00 – 08:40', 
                  mon: { 
                    school: 'EE Profª Cordélia Paiva', 
                    class: 'Turma 802', 
                    code: '802-182106', 
                    tag: '8º Ano EF', 
                    color: 'blue' 
                  }, 
                  fri: { 
                    school: 'CE Dr. Ignácio Bezerra de Menezes', 
                    class: 'ILGCH 1001', 
                    code: 'ILG_CH_1001', 
                    tag: '1ª Série EM', 
                    color: 'emerald' 
                  } 
                },
                { 
                  period: '3º e 4º Tempos (Manhã)', 
                  time: '08:40 – 10:20', 
                  mon: { 
                    school: 'EE Profª Cordélia Paiva', 
                    class: 'Turma 803', 
                    code: '803-182106', 
                    tag: '8º Ano EF', 
                    color: 'blue' 
                  }, 
                  fri: { 
                    school: 'CE Dr. Ignácio Bezerra de Menezes', 
                    class: 'IFFC 2001', 
                    code: 'IF_FC_2001', 
                    tag: '2ª Série EM', 
                    color: 'emerald' 
                  } 
                },
                { 
                  period: '5º e 6º Tempos (Manhã)', 
                  time: '10:35 – 12:15', 
                  mon: { 
                    school: 'EE Profª Cordélia Paiva', 
                    class: 'Turma 801', 
                    code: '801-182106', 
                    tag: '8º Ano EF', 
                    color: 'blue' 
                  }, 
                  fri: { 
                    school: 'CE Dr. Ignácio Bezerra de Menezes', 
                    class: 'IFLA 2002', 
                    code: 'IF_LA_2002', 
                    tag: '2ª Série EM', 
                    color: 'emerald' 
                  } 
                },
                { 
                  period: 'Turno da Tarde', 
                  time: '14:25 – 16:20', 
                  mon: null, 
                  fri: { 
                    school: 'CIEP 369', 
                    class: 'Educação Física', 
                    code: '14:25 – 16:20', 
                    tag: 'Vespertino', 
                    color: 'amber' 
                  } 
                },
                { 
                  period: 'Turno Noturno', 
                  time: '19:00 – 19:30 / 19:30 – 20:30', 
                  mon: { 
                    school: 'CIEP 229 Cândido Portinari', 
                    class: 'EJANEM I01', 
                    code: '19:00 – 19:30', 
                    tag: 'EJA Médio', 
                    color: 'purple' 
                  }, 
                  fri: { 
                    school: 'CIEP 476', 
                    class: 'Educação Física', 
                    code: '19:30 – 20:30', 
                    tag: 'Noturno', 
                    color: 'rose' 
                  } 
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="border border-slate-200 p-4 font-bold text-center bg-slate-100 text-slate-800 whitespace-nowrap">
                    <span className="block text-slate-900 font-black">{row.period}</span>
                    <span className="text-xs text-blue-600 font-bold">{row.time}</span>
                  </td>
                  
                  {/* SEGUNDA-FEIRA */}
                  <td className="border border-slate-200 p-3.5 align-middle">
                    {row.mon ? (
                      <div className={`p-4 rounded-2xl border text-left transition-transform hover:-translate-y-0.5 shadow-sm ${
                        row.mon.color === 'blue' ? 'bg-blue-50/80 border-blue-200 hover:bg-blue-100/70' :
                        'bg-purple-50/80 border-purple-200 hover:bg-purple-100/70'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg ${
                            row.mon.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                          }`}>
                            {row.mon.class}
                          </span>
                          <span className="text-[10px] font-extrabold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {row.mon.tag}
                          </span>
                        </div>
                        <p className="text-slate-900 font-extrabold text-sm leading-tight mb-1">{row.mon.school}</p>
                        <p className="text-slate-500 text-xs font-mono font-bold flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" /> {row.mon.code}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                        <span className="text-slate-400 font-semibold text-xs uppercase">Sem Aula Neste Turno</span>
                      </div>
                    )}
                  </td>

                  {/* SEXTA-FEIRA */}
                  <td className="border border-slate-200 p-3.5 align-middle">
                    {row.fri ? (
                      <div className={`p-4 rounded-2xl border text-left transition-transform hover:-translate-y-0.5 shadow-sm ${
                        row.fri.color === 'emerald' ? 'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/70' :
                        row.fri.color === 'amber' ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/70' :
                        'bg-rose-50/80 border-rose-200 hover:bg-rose-100/70'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg ${
                            row.fri.color === 'emerald' ? 'bg-emerald-600 text-white' :
                            row.fri.color === 'amber' ? 'bg-amber-600 text-white' :
                            'bg-rose-600 text-white'
                          }`}>
                            {row.fri.class}
                          </span>
                          <span className="text-[10px] font-extrabold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {row.fri.tag}
                          </span>
                        </div>
                        <p className="text-slate-900 font-extrabold text-sm leading-tight mb-1">{row.fri.school}</p>
                        <p className="text-slate-500 text-xs font-mono font-bold flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" /> {row.fri.code}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                        <span className="text-slate-400 font-semibold text-xs uppercase">Sem Aula Neste Turno</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
