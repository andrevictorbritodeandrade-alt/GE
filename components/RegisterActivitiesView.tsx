import React, { useState } from 'react';
import { ArrowLeft, Save, BookOpen, ClipboardList } from 'lucide-react';
import { ClassDataMap, ClassData } from '../types';
import { ScreenHeader } from './ScreenHeader';
import { BackButton } from './BackButton';

interface RegisterActivitiesViewProps {
  classData: ClassDataMap;
  onBack: () => void;
}

export const RegisterActivitiesView: React.FC<RegisterActivitiesViewProps> = ({ classData, onBack }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('AP 101');
  const [activityDescription, setActivityDescription] = useState('');
  const [attendance, setAttendance] = useState('');

  const handleSave = () => {
    // Save feedback
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      <ScreenHeader
        onBack={onBack}
        badge="REGISTRO DIÁRIO • 2026"
        statusBadge="DIÁRIO DE CLASSE"
        title="REGISTRO DE ATIVIDADES E PRESENÇA"
        subtitle="Lançamento de conteúdos ministrados e controle de frequência por turma"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Classes List / Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold mb-4">Escolha a Turma</h2>
            <div className="space-y-4">
                {(Object.values(classData) as ClassData[]).map(cls => (
                    <button 
                        key={cls.id}
                        onClick={() => setSelectedClassId(cls.id)}
                        className={`w-full p-4 rounded-xl text-left border-2 flex items-center gap-4 ${selectedClassId === cls.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                        <BookOpen className={`w-6 h-6 ${selectedClassId === cls.id ? 'text-blue-500' : 'text-slate-400'}`} />
                        <div>
                            <p className="font-bold">{cls.name}</p>
                            <p className="text-xs text-slate-500">{cls.school}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Activity/Attendance Input */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold mb-4">Registrar para: {selectedClassId}</h2>
            <textarea 
                className="w-full h-32 p-4 border rounded-xl mb-4"
                placeholder="Descreva a atividade de hoje..."
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
            />
            <textarea 
                className="w-full h-32 p-4 border rounded-xl mb-4"
                placeholder="Liste os alunos presentes..."
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
            />
            <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                <Save className="w-5 h-5" /> Salvar Atividade e Presença
            </button>
        </div>
      </div>
    </div>
  );
};
