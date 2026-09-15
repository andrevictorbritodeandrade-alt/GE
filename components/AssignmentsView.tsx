import React from 'react';
import { ClipboardList, Printer } from 'lucide-react';
import { ClassDataMap, ClassData, Assignment } from '../types';
import { ScreenHeader } from './ScreenHeader';
import { BackButton } from './BackButton';

interface AssignmentsViewProps {
  classData: ClassDataMap;
  onBack: () => void;
  onSelectAssignment: (assignment: Assignment, classId: string) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({ classData, onBack, onSelectAssignment }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      <ScreenHeader
        onBack={onBack}
        badge="AVALIAÇÕES & TAREFAS • 2026"
        statusBadge="PLANEJAMENTO"
        title="TRABALHOS E ATIVIDADES"
        subtitle="Relação de trabalhos avaliativos, prazos de entrega e pontuações por turma"
      />

      <div className="grid gap-6">
        {Object.values(classData as any).map((cls) => {
          const classItem = cls as ClassData;
          return classItem.assignments && classItem.assignments.length > 0 && (
            <div key={classItem.id} className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <ClipboardList className="text-indigo-600" />
                {classItem.name} - {classItem.school}
              </h2>
              <div className="space-y-4">
                {classItem.assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{assignment.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{assignment.description}</p>
                      </div>
                      <button 
                        onClick={() => onSelectAssignment(assignment, classItem.id)}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all opacity-0 group-hover:opacity-100"
                        title="Imprimir Trabalho"
                      >
                        <Printer size={14} /> Imprimir
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <span>Entrega: {assignment.dueDate}</span>
                      <span>Valor: {assignment.totalPoints.toFixed(1)} pts</span>
                      <span>Formato: {assignment.format}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
