import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Award, CheckCircle2, AlertCircle, Save, 
  Search, GraduationCap, Star, Info,
  Printer, Download, Eye, EyeOff, BarChart3, TrendingUp, Users, Target,
  ArrowRight, School, Calendar, BookOpen, AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { ClassDataMap, ClassData, Student, TrimestreGrade } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { safeLocalStorage } from '../utils/storage';
import { ScreenHeader } from './ScreenHeader';
import { BackButton } from './BackButton';
import { initialClassData } from '../constants';
import { calculateExpectedClassesForTrimester, getAnnualTeachingStats } from '../utils/teachingCalendar';

interface GradesViewProps {
  onBack: () => void;
  classData?: ClassDataMap;
  setClassData?: React.Dispatch<React.SetStateAction<ClassDataMap>>;
  onSave?: (newData: ClassDataMap) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({ 
  onBack, 
  classData, 
  setClassData, 
  onSave 
}) => {
  // Navigation levels: Level 1 = School selection, Level 2 = Class selection, Level 3 = Grades & Trimester view
  const [selectedSchool, setSelectedSchool] = useState<string | null>(() => {
    return safeLocalStorage.getItem('grades_selectedSchool') || null;
  });
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() => {
    return safeLocalStorage.getItem('grades_selectedClassId') || null;
  });
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>(() => {
    return safeLocalStorage.getItem('grades_selectedTrimestre') || "1";
  });

  const [activeTab, setActiveTab] = useState<'trimester' | 'annual' | 'analytics'>('trimester');
  const [showDetailedRecovery, setShowDetailedRecovery] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Sync state between props and local state
  const [localClassData, setLocalClassData] = useState<ClassDataMap>(() => {
    if (classData && Object.keys(classData).length > 0) return classData;
    const stored = safeLocalStorage.getItem('app_classData');
    return stored ? JSON.parse(stored) : initialClassData;
  });

  useEffect(() => {
    if (classData && Object.keys(classData).length > 0) {
      setLocalClassData(classData);
    }
  }, [classData]);

  // Persist selections
  useEffect(() => {
    if (selectedSchool) safeLocalStorage.setItem('grades_selectedSchool', selectedSchool);
    else safeLocalStorage.removeItem('grades_selectedSchool');
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedClassId) safeLocalStorage.setItem('grades_selectedClassId', selectedClassId);
    else safeLocalStorage.removeItem('grades_selectedClassId');
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedTrimestre) safeLocalStorage.setItem('grades_selectedTrimestre', selectedTrimestre);
  }, [selectedTrimestre]);

  // Extract all schools
  const schools = useMemo(() => {
    const list = Array.from(new Set([
      ...(Object.values(localClassData || {}) as ClassData[]).map(c => c.school),
      ...(Object.values(initialClassData) as ClassData[]).map(c => c.school)
    ].filter((s): s is string => typeof s === 'string' && s.trim().length > 0))).sort();
    return list;
  }, [localClassData]);

  // Classes for selected school
  const schoolClasses = useMemo(() => {
    if (!selectedSchool) return [];
    return (Object.values(localClassData) as ClassData[]).filter(
      (cls) => cls.school === selectedSchool
    );
  }, [localClassData, selectedSchool]);

  // Active class
  const currentClass = selectedClassId ? localClassData[selectedClassId] : null;

  // Expected classes statistics (Mondays and Fridays) from SEEDUC 2026 calendar
  const trimesterIdNum = parseInt(selectedTrimestre, 10) || 1;
  const expectedClassesStats = useMemo(() => {
    return calculateExpectedClassesForTrimester(trimesterIdNum);
  }, [trimesterIdNum]);

  const annualTeachingStats = useMemo(() => {
    return getAnnualTeachingStats();
  }, []);

  // Handler for grade changes
  const handleGradeChange = (
    studentId: number, 
    field: keyof TrimestreGrade, 
    valueString: string
  ) => {
    let value: number | undefined = valueString.trim() === '' ? undefined : parseFloat(valueString.replace(',', '.'));
    
    // Limits constraint validation
    if (value !== undefined && !isNaN(value)) {
      if ((field === 'participation' || field === 'recParticipation') && value > 2) value = 2;
      if ((field === 'assignment' || field === 'recAssignment') && value > 3) value = 3;
      if ((field === 'exam' || field === 'recExam') && value > 5) value = 5;
      if (field === 'recovery' && value > 10) value = 10;
      if (value < 0) value = 0;
      // Round to 1 decimal place
      value = parseFloat(value.toFixed(1));
    }

    setLocalClassData(prev => {
      const updated = { ...prev };
      const cls = updated[selectedClassId!];
      if (cls && cls.students) {
        cls.students = cls.students.map(student => {
          if (student.id === studentId) {
            const currentTrimGrades = student.trimestreGrades || {};
            const currentTrim = currentTrimGrades[selectedTrimestre] || {};
            return {
              ...student,
              trimestreGrades: {
                ...currentTrimGrades,
                [selectedTrimestre]: {
                  ...currentTrim,
                  [field]: value
                }
              }
            };
          }
          return student;
        });
      }
      // Save immediately to local storage (offline-first)
      safeLocalStorage.setItem('app_classData', JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to calculate student attendance (trimester and annual)
  const getStudentAttendance = (student: Student, trimesterId: number) => {
    if (!student.attendance || Object.keys(student.attendance).length === 0) {
      return {
        trimesterPresents: 0,
        trimesterAbsences: 0,
        trimesterTotal: 0,
        trimesterPercent: 100,
        annualPresents: 0,
        annualAbsences: 0,
        annualTotal: 0,
        annualPercent: 100,
      };
    }

    let annualP = 0;
    let annualF = 0;
    let trimP = 0;
    let trimF = 0;

    Object.entries(student.attendance).forEach(([dateKey, val]) => {
      if (val !== 'P' && val !== 'F') return;

      // Annual accumulation
      if (val === 'P') annualP++;
      else if (val === 'F') annualF++;

      // Check if dateKey belongs to this trimester
      let inThisTrimester = false;

      if (dateKey.includes(`${trimesterId}º T`) || dateKey.includes(`${trimesterId}ºT`)) {
        inThisTrimester = true;
      } else {
        const datePart = dateKey.split(' - ')[0].trim();
        let d: number | null = null;
        let m: number | null = null;

        if (datePart.includes('/')) {
          const parts = datePart.split('/');
          d = parseInt(parts[0], 10);
          m = parseInt(parts[1], 10);
        } else if (datePart.includes('-')) {
          const parts = datePart.split('-');
          m = parseInt(parts[1], 10);
          d = parseInt(parts[2], 10);
        }

        if (d !== null && m !== null && !isNaN(d) && !isNaN(m)) {
          // 1º Trimestre: 05/02 to 18/05
          if (trimesterId === 1) {
            if ((m === 2 && d >= 5) || m === 3 || m === 4 || (m === 5 && d <= 18)) inThisTrimester = true;
          }
          // 2º Trimestre: 19/05 to 04/09
          else if (trimesterId === 2) {
            if ((m === 5 && d >= 19) || m === 6 || m === 7 || m === 8 || (m === 9 && d <= 4)) inThisTrimester = true;
          }
          // 3º Trimestre: 08/09 to 22/12
          else if (trimesterId === 3) {
            if ((m === 9 && d >= 8) || m === 10 || m === 11 || (m === 12 && d <= 22)) inThisTrimester = true;
          }
        }
      }

      if (inThisTrimester) {
        if (val === 'P') trimP++;
        else if (val === 'F') trimF++;
      }
    });

    const trimTotal = trimP + trimF;
    const trimPercent = trimTotal > 0 ? parseFloat(((trimP / trimTotal) * 100).toFixed(1)) : 100;

    const annualTotal = annualP + annualF;
    const annualPercent = annualTotal > 0 ? parseFloat(((annualP / annualTotal) * 100).toFixed(1)) : 100;

    return {
      trimesterPresents: trimP,
      trimesterAbsences: trimF,
      trimesterTotal: trimTotal,
      trimesterPercent: trimPercent,
      annualPresents: annualP,
      annualAbsences: annualF,
      annualTotal,
      annualPercent,
    };
  };

  // Helper to compute a single student's trimester grades
  const computeTrimestreGrade = (grades?: TrimestreGrade) => {
    if (!grades) {
      return {
        hasData: false,
        participation: undefined,
        recParticipation: undefined,
        effectivePart: 0,
        assignment: undefined,
        recAssignment: undefined,
        effectiveTrab: 0,
        exam: undefined,
        recExam: undefined,
        effectiveExam: 0,
        regularTotal: 0,
        isRegularPassing: false, // >= 6.0
        recovery: undefined,
        finalTotal: 0,
        isFinalPassing: false, // >= 6.0
        isRecovered: false,
      };
    }

    const p = typeof grades.participation === 'number' ? grades.participation : undefined;
    const recP = typeof grades.recParticipation === 'number' ? grades.recParticipation : undefined;
    const effectivePart = recP !== undefined && p !== undefined ? Math.max(p, recP) : (recP ?? p ?? 0);

    const t = typeof grades.assignment === 'number' ? grades.assignment : undefined;
    const recT = typeof grades.recAssignment === 'number' ? grades.recAssignment : undefined;
    const effectiveTrab = recT !== undefined && t !== undefined ? Math.max(t, recT) : (recT ?? t ?? 0);

    const e = typeof grades.exam === 'number' ? grades.exam : undefined;
    const recE = typeof grades.recExam === 'number' ? grades.recExam : undefined;
    const effectiveExam = recE !== undefined && e !== undefined ? Math.max(e, recE) : (recE ?? e ?? 0);

    const hasData = p !== undefined || t !== undefined || e !== undefined || recP !== undefined || recT !== undefined || recE !== undefined || grades.recovery !== undefined;

    const regularTotal = parseFloat((effectivePart + effectiveTrab + effectiveExam).toFixed(1));
    const isRegularPassing = regularTotal >= 6.0;

    const rec = typeof grades.recovery === 'number' ? grades.recovery : undefined;
    
    let finalTotal = regularTotal;
    let isRecovered = false;

    if (rec !== undefined) {
      finalTotal = parseFloat(Math.max(regularTotal, rec).toFixed(1));
      if (!isRegularPassing && finalTotal >= 6.0) {
        isRecovered = true;
      }
    }

    const isFinalPassing = finalTotal >= 6.0;

    return {
      hasData,
      participation: p,
      recParticipation: recP,
      effectivePart,
      assignment: t,
      recAssignment: recT,
      effectiveTrab,
      exam: e,
      recExam: recE,
      effectiveExam,
      regularTotal,
      isRegularPassing,
      recovery: rec,
      finalTotal,
      isFinalPassing,
      isRecovered,
    };
  };

  // Helper to compute annual 3-trimester overview for a student
  const computeAnnualGrades = (student: Student) => {
    const t1 = computeTrimestreGrade(student.trimestreGrades?.['1']);
    const t2 = computeTrimestreGrade(student.trimestreGrades?.['2']);
    const t3 = computeTrimestreGrade(student.trimestreGrades?.['3']);

    const annualTotal = parseFloat((t1.finalTotal + t2.finalTotal + t3.finalTotal).toFixed(1));
    const isAnnualApproved = annualTotal >= 18.0;
    const pointsNeeded = Math.max(0, parseFloat((18.0 - annualTotal).toFixed(1)));

    return {
      t1,
      t2,
      t3,
      annualTotal,
      isAnnualApproved,
      pointsNeeded,
    };
  };

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    safeLocalStorage.setItem('app_classData', JSON.stringify(localClassData));
    
    if (setClassData) {
      setClassData(localClassData);
    }
    
    if (onSave) {
      try {
        await onSave(localClassData);
      } catch (err) {
        console.error("Erro ao salvar no Firestore:", err);
      }
    }
    
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Pre-fill realistic mock grades for rapid testing
  const handlePreFillMockGrades = () => {
    if (!selectedClassId) return;

    setLocalClassData(prev => {
      const updated = { ...prev };
      const cls = updated[selectedClassId];
      if (cls && cls.students) {
        cls.students = cls.students.map(student => {
          const rand = Math.random();
          let part = 0;
          let trab = 0;
          let exam = 0;
          let rec: number | undefined = undefined;

          if (rand > 0.25) {
            // Aprovados direto (>= 6.0)
            part = parseFloat((1.2 + Math.random() * 0.8).toFixed(1)); // 1.2 a 2.0
            trab = parseFloat((1.8 + Math.random() * 1.2).toFixed(1)); // 1.8 a 3.0
            exam = parseFloat((3.0 + Math.random() * 2.0).toFixed(1)); // 3.0 a 5.0
          } else {
            // Inicialmente abaixo de 6.0
            part = parseFloat((0.8 + Math.random() * 0.6).toFixed(1)); // 0.8 a 1.4
            trab = parseFloat((1.0 + Math.random() * 0.8).toFixed(1)); // 1.0 a 1.8
            exam = parseFloat((1.5 + Math.random() * 1.5).toFixed(1)); // 1.5 a 3.0
            
            // 70% chance de recuperação para alcançar os 6.0
            if (Math.random() > 0.3) {
              rec = parseFloat((6.0 + Math.random() * 1.5).toFixed(1)); // 6.0 a 7.5
            }
          }

          const currentTrimGrades = student.trimestreGrades || {};
          return {
            ...student,
            trimestreGrades: {
              ...currentTrimGrades,
              [selectedTrimestre]: {
                participation: part,
                assignment: trab,
                exam: exam,
                recovery: rec
              }
            }
          };
        });
      }
      safeLocalStorage.setItem('app_classData', JSON.stringify(updated));
      return updated;
    });
  };

  // Statistics calculation for the current class and trimester
  const classStats = useMemo(() => {
    if (!currentClass || !currentClass.students || currentClass.students.length === 0) {
      return {
        totalStudents: 0,
        gradedCount: 0,
        approvedCount: 0,
        recoveryCount: 0,
        averageGrade: 0,
        approvalRate: 0,
        highestGrade: 0,
        lowestGrade: 0,
        distribution: [
          { range: '0.0 - 5.9', label: 'Abaixo da Média (< 6.0)', count: 0, color: '#ef4444' },
          { range: '6.0 - 7.9', label: 'Aprovado (6.0 - 7.9)', count: 0, color: '#10b981' },
          { range: '8.0 - 10.0', label: 'Excelente (8.0 - 10.0)', count: 0, color: '#3b82f6' }
        ]
      };
    }

    const students = currentClass.students;
    let totalGradeSum = 0;
    let approved = 0;
    let recovery = 0;
    let graded = 0;
    let highest = 0;
    let lowest = 10;

    const buckets = [
      { range: '0.0 - 5.9', label: 'Abaixo da Média (< 6.0)', count: 0, color: '#ef4444' },
      { range: '6.0 - 7.9', label: 'Aprovado (6.0 - 7.9)', count: 0, color: '#10b981' },
      { range: '8.0 - 10.0', label: 'Excelente (8.0 - 10.0)', count: 0, color: '#3b82f6' }
    ];

    students.forEach(student => {
      const g = computeTrimestreGrade(student.trimestreGrades?.[selectedTrimestre]);
      if (g.hasData) {
        graded++;
        totalGradeSum += g.finalTotal;
        if (g.finalTotal > highest) highest = g.finalTotal;
        if (g.finalTotal < lowest) lowest = g.finalTotal;

        if (g.isFinalPassing) {
          approved++;
        } else {
          recovery++;
        }

        if (g.finalTotal < 6.0) {
          buckets[0].count++;
        } else if (g.finalTotal < 8.0) {
          buckets[1].count++;
        } else {
          buckets[2].count++;
        }
      }
    });

    const averageGrade = graded > 0 ? parseFloat((totalGradeSum / graded).toFixed(1)) : 0;
    const approvalRate = graded > 0 ? parseFloat(((approved / graded) * 100).toFixed(1)) : 0;

    return {
      totalStudents: students.length,
      gradedCount: graded,
      approvedCount: approved,
      recoveryCount: recovery,
      averageGrade,
      approvalRate,
      highestGrade: highest,
      lowestGrade: lowest === 10 && graded === 0 ? 0 : lowest,
      distribution: buckets
    };
  }, [currentClass, selectedTrimestre]);

  // Filtered students for search
  const filteredStudents = useMemo(() => {
    if (!currentClass?.students) return [];
    return currentClass.students
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [currentClass, searchTerm]);

  // Export to PDF
  const handleExportPdf = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Boletim_${currentClass?.name || 'Turma'}_Trimestre_${selectedTrimestre}.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setIsGeneratingPdf(false);
      setIsPrintModalOpen(false);
    }
  };

  // ==========================================
  // VIEW LEVEL 1: SELEÇÃO DA UNIDADE ESCOLAR
  // ==========================================
  if (!selectedSchool) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
        <ScreenHeader
          onBack={onBack}
          badge="NOTAS & AVALIAÇÕES • 2026"
          statusBadge="SEEDUC-RJ"
          title="DIÁRIO DE NOTAS"
          subtitle="Selecione a instituição de ensino para acessar o lançamento trimestral e faltas"
          rightTitle="RESOLUÇÃO SEEDUC Nº 6392/2025"
          rightSubtitle="Média Trimestral: 6.0 pts • Aprovação Anual: 18.0 pts"
          rightExtra="Aulas Seg/Sex: 27 aulas/trimestre • 81 aulas no ano"
        />

        <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200 text-slate-800 font-sans w-full relative overflow-hidden">
          <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 uppercase">Selecione a Unidade Escolar</h2>
              <p className="text-xs text-slate-500 font-medium">Escolha uma das instituições em exercício para visualizar as turmas e gerenciar as notas</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <Star className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-black text-emerald-800 uppercase tracking-tight">Critérios: Part (2) • Trab (3) • Prova (5)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10 w-full">
            {schools.length > 0 ? schools.map(school => {
              const classesInSchool = (Object.values(localClassData) as ClassData[]).filter(c => c.school === school);
              return (
                <button
                  key={school}
                  onClick={() => setSelectedSchool(school)}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 hover:border-emerald-500 transition-all text-left overflow-hidden flex flex-col justify-between h-[180px] shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-3 right-3 opacity-[0.08] pointer-events-none group-hover:scale-110 transition-transform duration-500 text-slate-400">
                    <GraduationCap className="w-12 h-12 text-emerald-600" />
                  </div>
                  
                  <div className="relative z-10 w-full">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 shadow-inner border border-emerald-100">
                      <School className="w-5 h-5 text-emerald-700" />
                    </div>
                    
                    <h3 className="text-base font-black text-slate-800 tracking-tight uppercase leading-tight mb-1 line-clamp-2">
                      {school}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-medium leading-snug">
                      {classesInSchool.length} {classesInSchool.length === 1 ? 'turma ativa' : 'turmas ativas'} • Lançamento de notas
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-2 flex items-center text-emerald-700 text-[11px] font-black tracking-wider uppercase group-hover:text-emerald-600 transition-colors">
                    ACESSAR TURMAS
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            }) : (
              <div className="col-span-full py-16 text-center text-slate-400 uppercase tracking-widest text-xs font-black">
                Nenhuma instituição encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW LEVEL 2: SELEÇÃO DA TURMA
  // ==========================================
  if (!selectedClassId) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
        <ScreenHeader
          onBack={() => setSelectedSchool(null)}
          badge="TURMAS DISPONÍVEIS"
          statusBadge={selectedSchool}
          title="ESCOLHA A TURMA"
          subtitle={`Instituição: ${selectedSchool} • Selecione para gerenciar notas e faltas`}
          rightTitle="RESOLUÇÃO SEEDUC Nº 6392/2025"
          rightSubtitle="3 Trimestres • Meta 18.0 pontos"
          rightExtra="Aulas Seg/Sex: 27 por Trimestre • 81 Anuais"
        />

        <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200 text-slate-800 font-sans w-full">
          <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 uppercase">Turmas em Exercício</h2>
              <p className="text-xs text-slate-500 font-medium">Selecione uma turma para registrar as avaliações de Participação, Trabalho, Prova e Recuperação</p>
            </div>
            <button
              onClick={() => setSelectedSchool(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase transition-all"
            >
              Trocar Escola
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {schoolClasses.length > 0 ? schoolClasses.map(cls => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:bg-emerald-50/40 hover:border-emerald-500 transition-all text-left overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider rounded-lg border border-emerald-200">
                      {cls.grade ? `${cls.grade}º ANO` : 'TURMA'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {cls.students?.length || 0} alunos
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-1">
                    {cls.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium mb-3">
                    Horário: {cls.schedule || 'Regular'} • Aulas: {cls.days?.join(' e ') || 'Segundas e Sextas'}
                  </p>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-bold uppercase">Aulas Previstas (Seg/Sex):</span>
                    <span className="font-black text-emerald-700">27 / Trimestre</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-emerald-700 text-xs font-black uppercase tracking-wider group-hover:text-emerald-600">
                  <span>ACESSAR NOTAS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )) : (
              <div className="col-span-full py-16 text-center text-slate-400 uppercase tracking-widest text-xs font-black">
                Nenhuma turma cadastrada para esta instituição.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW LEVEL 3: LANÇAMENTO DE NOTAS DA TURMA
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-fade-in font-sans">
      {/* Screen Header */}
      <ScreenHeader
        onBack={() => setSelectedClassId(null)}
        badge={currentClass ? `${currentClass.grade}º ANO • ${currentClass.name}` : 'NOTAS'}
        statusBadge={saveSuccess ? "SINCRONIZADO COM SUCESSO" : isSaving ? "SALVANDO..." : "CONECTADO"}
        title={currentClass ? currentClass.name.toUpperCase() : "LANÇAMENTO DE NOTAS"}
        subtitle={`${selectedSchool} • Horário: ${currentClass?.schedule || 'N/D'} • Segundas e Sextas`}
        rightTitle="SISTEMA DE NOTAS SEEDUC-RJ"
        rightSubtitle="Part: 2.0 • Trab: 3.0 • Prova: 5.0 • Média: 6.0"
        rightExtra="Aprovação Anual: 18.0 pontos • Aulas Seg/Sex: 27 previstas"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 h-10 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Salvando...' : 'Salvar Notas'}
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-3 h-10 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase rounded-xl border border-white/20 shadow-sm transition-all"
              title="Exportar / Imprimir Boletim"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Boletim</span>
            </button>
            <button
              onClick={() => setSelectedClassId(null)}
              className="px-3 h-10 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase rounded-xl border border-white/20 shadow-sm transition-all"
            >
              Turmas
            </button>
          </div>
        }
      />

      {/* Sync / Success alert banner */}
      {saveSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 p-4 rounded-2xl flex items-center justify-between shadow-md animate-slide-down">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Notas Atualizadas com Sucesso!</p>
              <p className="text-[11px] font-medium text-emerald-700">Todas as notas e recuperações foram salvas localmente no navegador e sincronizadas na nuvem.</p>
            </div>
          </div>
        </div>
      )}

      {/* Info & Class Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Alunos Matriculados</span>
          <span className="text-xl font-black text-slate-800">{currentClass?.students?.length || 0}</span>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 block mb-0.5">Aulas Seg/Sex Previstas</span>
          <span className="text-xl font-black text-sky-900">{expectedClassesStats.totalTeachingClasses} aulas</span>
          <span className="text-[9px] text-sky-600 block mt-0.5">({expectedClassesStats.mondaysTeaching} Seg + {expectedClassesStats.fridaysTeaching} Sex)</span>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-0.5">Meta Trimestral</span>
          <span className="text-xl font-black text-amber-900">6.0 pts</span>
          <span className="text-[9px] text-amber-600 block mt-0.5">Recuperação p/ quem não alcançar</span>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block mb-0.5">Aprovação Anual</span>
          <span className="text-xl font-black text-emerald-900">18.0 pts</span>
          <span className="text-[9px] text-emerald-600 block mt-0.5">Soma dos 3 Trimestres</span>
        </div>
      </div>

      {/* Main Tab Controller & Trimester Selector */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Trimester Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "1", label: "1º Trimestre", info: "05/02 a 18/05 • 27 Aulas Seg/Sex" },
              { id: "2", label: "2º Trimestre", info: "19/05 a 04/09 • 27 Aulas Seg/Sex" },
              { id: "3", label: "3º Trimestre", info: "08/09 a 22/12 • 27 Aulas Seg/Sex" },
            ].map(trim => (
              <button
                key={trim.id}
                onClick={() => {
                  setSelectedTrimestre(trim.id);
                  setActiveTab('trimester');
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-tight transition-all text-left ${
                  selectedTrimestre === trim.id && activeTab === 'trimester'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <div>{trim.label}</div>
                <div className="text-[9px] font-medium opacity-80">{trim.info}</div>
              </button>
            ))}

            {/* Annual Overview Tab */}
            <button
              onClick={() => setActiveTab('annual')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-tight transition-all text-left ${
                activeTab === 'annual'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <div>Visão Geral Anual</div>
              <div className="text-[9px] font-medium opacity-80">3 Trimestres • Meta 18 Pontos</div>
            </button>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar aluno..."
                className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {activeTab === 'trimester' && (
              <button
                onClick={() => setShowDetailedRecovery(!showDetailedRecovery)}
                className={`px-3 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all border ${
                  showDetailedRecovery 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="Mostrar/Ocultar campos de recuperação específica para cada item (Participação, Trabalho, Prova)"
              >
                {showDetailedRecovery ? <EyeOff className="w-3.5 h-3.5 text-emerald-700" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                <span>{showDetailedRecovery ? 'Rec. Simplificada' : 'Rec. Específicas'}</span>
              </button>
            )}

            <button
              onClick={handlePreFillMockGrades}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl text-xs font-black uppercase transition-all"
              title="Preenche notas de exemplo realistas para teste e demonstração"
            >
              Simular Notas
            </button>
          </div>
        </div>

        {/* TAB 1: TRIMESTER GRADEBOOK TABLE */}
        {activeTab === 'trimester' && (
          <div className="space-y-4">
            <div className="overflow-x-auto bg-[#fdfaf6] p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
              <table className="w-full text-left border-collapse min-w-[950px] text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-700 uppercase tracking-wider text-[11px] font-black">
                    <th className="py-3 px-2 text-center w-12">Nº</th>
                    <th className="py-3 px-3 min-w-[200px]">Nome do Aluno</th>
                    <th className="py-3 px-2 text-center bg-rose-50/50 border-x border-slate-200">Faltas</th>
                    <th className="py-3 px-2 text-center bg-sky-50/50 border-r border-slate-200">Presenças</th>
                    <th className="py-3 px-2 text-center bg-emerald-50/50 border-r border-slate-200">% Freq.</th>
                    
                    {/* Participation */}
                    <th className="py-3 px-2 text-center bg-blue-50/40 border-r border-slate-200">
                      <div>Part.</div>
                      <div className="text-[9px] font-bold text-slate-400">(0 a 2.0)</div>
                    </th>
                    {showDetailedRecovery && (
                      <th className="py-3 px-2 text-center bg-blue-100/50 border-r border-slate-200 text-blue-900">
                        <div>Rec. Part</div>
                        <div className="text-[9px] font-bold">(0 a 2.0)</div>
                      </th>
                    )}

                    {/* Assignment */}
                    <th className="py-3 px-2 text-center bg-purple-50/40 border-r border-slate-200">
                      <div>Trab.</div>
                      <div className="text-[9px] font-bold text-slate-400">(0 a 3.0)</div>
                    </th>
                    {showDetailedRecovery && (
                      <th className="py-3 px-2 text-center bg-purple-100/50 border-r border-slate-200 text-purple-900">
                        <div>Rec. Trab</div>
                        <div className="text-[9px] font-bold">(0 a 3.0)</div>
                      </th>
                    )}

                    {/* Exam */}
                    <th className="py-3 px-2 text-center bg-amber-50/40 border-r border-slate-200">
                      <div>Prova</div>
                      <div className="text-[9px] font-bold text-slate-400">(0 a 5.0)</div>
                    </th>
                    {showDetailedRecovery && (
                      <th className="py-3 px-2 text-center bg-amber-100/50 border-r border-slate-200 text-amber-900">
                        <div>Rec. Prova</div>
                        <div className="text-[9px] font-bold">(0 a 5.0)</div>
                      </th>
                    )}

                    {/* Regular Sum */}
                    <th className="py-3 px-2 text-center bg-slate-100 border-r border-slate-200">
                      <div>Média Reg.</div>
                      <div className="text-[9px] font-bold text-slate-500">(Meta: 6.0)</div>
                    </th>

                    {/* General Recovery (if < 6.0) */}
                    <th className="py-3 px-2 text-center bg-rose-50 border-r border-slate-200 text-rose-900">
                      <div>Rec. Trimestre</div>
                      <div className="text-[9px] font-bold text-rose-600">p/ alcançar 6.0</div>
                    </th>

                    {/* Final Grade for Trimester */}
                    <th className="py-3 px-2 text-center bg-emerald-100/70 border-r border-slate-200 text-emerald-950 font-black">
                      <div>Média Final</div>
                      <div className="text-[9px] font-bold text-emerald-800">Status</div>
                    </th>

                    {/* Annual Progress */}
                    <th className="py-3 px-2 text-center bg-indigo-50/60 text-indigo-950">
                      <div>Progresso Anual</div>
                      <div className="text-[9px] font-bold text-indigo-700">(Meta: 18 pts)</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.length > 0 ? filteredStudents.map((student, idx) => {
                    const att = getStudentAttendance(student, trimesterIdNum);
                    const gradeData = computeTrimestreGrade(student.trimestreGrades?.[selectedTrimestre]);
                    const annualData = computeAnnualGrades(student);

                    const isBelowFreq = att.trimesterPercent < 75;

                    return (
                      <tr key={student.id} className="hover:bg-slate-100/80 transition-colors">
                        {/* Index */}
                        <td className="py-3 px-2 text-center font-bold text-slate-500">
                          {idx + 1}
                        </td>

                        {/* Name */}
                        <td className="py-3 px-3 font-extrabold text-slate-900">
                          <div>{student.name}</div>
                          {isBelowFreq && (
                            <span className="text-[9px] font-black text-rose-600 flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              Infrequente (&lt;75%)
                            </span>
                          )}
                        </td>

                        {/* Absences */}
                        <td className="py-3 px-2 text-center bg-rose-50/30 border-x border-slate-200 font-black text-rose-700">
                          <div className="text-sm">{att.trimesterAbsences}</div>
                          <div className="text-[9px] font-medium text-slate-400" title="Faltas acumuladas no ano">{att.annualAbsences} no ano</div>
                        </td>

                        {/* Presences */}
                        <td className="py-3 px-2 text-center bg-sky-50/30 border-r border-slate-200 font-black text-sky-800">
                          <div className="text-sm">{att.trimesterPresents}</div>
                          <div className="text-[9px] font-medium text-slate-400">{att.annualPresents} no ano</div>
                        </td>

                        {/* Frequency Percentage */}
                        <td className="py-3 px-2 text-center bg-emerald-50/30 border-r border-slate-200">
                          <span className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                            att.trimesterPercent >= 75 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {att.trimesterPercent}%
                          </span>
                        </td>

                        {/* Participation Input (0 a 2.0) */}
                        <td className="py-2 px-1 text-center bg-blue-50/20 border-r border-slate-200">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="2"
                            value={gradeData.participation !== undefined ? gradeData.participation : ''}
                            onChange={(e) => handleGradeChange(student.id, 'participation', e.target.value)}
                            placeholder="0.0"
                            className="w-14 text-center py-1 font-black text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs shadow-xs"
                          />
                        </td>
                        {showDetailedRecovery && (
                          <td className="py-2 px-1 text-center bg-blue-100/30 border-r border-slate-200">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="2"
                              value={gradeData.recParticipation !== undefined ? gradeData.recParticipation : ''}
                              onChange={(e) => handleGradeChange(student.id, 'recParticipation', e.target.value)}
                              placeholder="Rec"
                              className="w-14 text-center py-1 font-black text-blue-900 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-xs shadow-xs"
                            />
                          </td>
                        )}

                        {/* Assignment Input (0 a 3.0) */}
                        <td className="py-2 px-1 text-center bg-purple-50/20 border-r border-slate-200">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="3"
                            value={gradeData.assignment !== undefined ? gradeData.assignment : ''}
                            onChange={(e) => handleGradeChange(student.id, 'assignment', e.target.value)}
                            placeholder="0.0"
                            className="w-14 text-center py-1 font-black text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-purple-500 text-xs shadow-xs"
                          />
                        </td>
                        {showDetailedRecovery && (
                          <td className="py-2 px-1 text-center bg-purple-100/30 border-r border-slate-200">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="3"
                              value={gradeData.recAssignment !== undefined ? gradeData.recAssignment : ''}
                              onChange={(e) => handleGradeChange(student.id, 'recAssignment', e.target.value)}
                              placeholder="Rec"
                              className="w-14 text-center py-1 font-black text-purple-900 bg-purple-50 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 text-xs shadow-xs"
                            />
                          </td>
                        )}

                        {/* Exam Input (0 a 5.0) */}
                        <td className="py-2 px-1 text-center bg-amber-50/20 border-r border-slate-200">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={gradeData.exam !== undefined ? gradeData.exam : ''}
                            onChange={(e) => handleGradeChange(student.id, 'exam', e.target.value)}
                            placeholder="0.0"
                            className="w-14 text-center py-1 font-black text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 text-xs shadow-xs"
                          />
                        </td>
                        {showDetailedRecovery && (
                          <td className="py-2 px-1 text-center bg-amber-100/30 border-r border-slate-200">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={gradeData.recExam !== undefined ? gradeData.recExam : ''}
                              onChange={(e) => handleGradeChange(student.id, 'recExam', e.target.value)}
                              placeholder="Rec"
                              className="w-14 text-center py-1 font-black text-amber-900 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-600 text-xs shadow-xs"
                            />
                          </td>
                        )}

                        {/* Regular Sum */}
                        <td className="py-3 px-2 text-center bg-slate-50 border-r border-slate-200">
                          <div className={`font-black text-sm ${gradeData.isRegularPassing ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {gradeData.regularTotal.toFixed(1)}
                          </div>
                          <span className={`text-[9px] font-bold uppercase block ${gradeData.isRegularPassing ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {gradeData.isRegularPassing ? 'Aprovado' : '< 6.0'}
                          </span>
                        </td>

                        {/* General Recovery (0 a 10.0) */}
                        <td className="py-2 px-1 text-center bg-rose-50/40 border-r border-slate-200">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={gradeData.recovery !== undefined ? gradeData.recovery : ''}
                            onChange={(e) => handleGradeChange(student.id, 'recovery', e.target.value)}
                            placeholder={!gradeData.isRegularPassing ? "Rec 6.0" : "-"}
                            className={`w-16 text-center py-1 font-black rounded-lg text-xs shadow-xs border ${
                              !gradeData.isRegularPassing && gradeData.recovery === undefined
                                ? 'bg-rose-100/80 border-rose-300 text-rose-900 placeholder-rose-400 animate-pulse'
                                : 'bg-white border-slate-300 text-slate-800'
                            }`}
                          />
                        </td>

                        {/* Final Grade for Trimester */}
                        <td className="py-3 px-2 text-center bg-emerald-50/60 border-r border-slate-200 font-black">
                          <div className={`text-base ${gradeData.isFinalPassing ? 'text-emerald-800' : 'text-rose-700'}`}>
                            {gradeData.finalTotal.toFixed(1)}
                          </div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                            gradeData.isRecovered 
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : gradeData.isFinalPassing 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {gradeData.isRecovered ? 'Recuperado' : gradeData.isFinalPassing ? 'Aprovado' : 'Abaixo'}
                          </span>
                        </td>

                        {/* Annual Progress */}
                        <td className="py-3 px-2 text-center bg-indigo-50/40">
                          <div className="font-black text-indigo-950 text-xs">
                            {annualData.annualTotal.toFixed(1)} / 18.0
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">
                            {annualData.isAnnualApproved ? (
                              <span className="text-emerald-700 font-black">Meta Atingida!</span>
                            ) : (
                              `Faltam ${annualData.pointsNeeded.toFixed(1)}`
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={13} className="py-12 text-center text-slate-400 font-bold uppercase text-xs">
                        Nenhum aluno encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Summary of Trimester Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Aprovados no Trimestre (&ge; 6.0)</span>
                  <div className="text-2xl font-black text-emerald-950">{classStats.approvedCount} alunos</div>
                  <span className="text-xs font-bold text-emerald-600">Taxa de aprovação: {classStats.approvalRate}%</span>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">Abaixo da Média / Em Recuperação</span>
                  <div className="text-2xl font-black text-rose-950">{classStats.recoveryCount} alunos</div>
                  <span className="text-xs font-bold text-rose-600">Necessitam de recuperação para 6.0</span>
                </div>
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-700">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-700">Média Geral da Turma</span>
                  <div className="text-2xl font-black text-sky-950">{classStats.averageGrade} / 10.0</div>
                  <span className="text-xs font-bold text-sky-600">Maior: {classStats.highestGrade} • Menor: {classStats.lowestGrade}</span>
                </div>
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-700">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANNUAL 3-TRIMESTER CONSOLIDATED TABLE (META 18 PONTOS) */}
        {activeTab === 'annual' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start gap-3">
              <Award className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900">Consolidação Anual • Resolução SEEDUC Nº 6392/2025</h4>
                <p className="text-[11px] font-medium text-indigo-800">
                  Para aprovação final no ano letivo de 2026, o aluno deve acumular no mínimo <strong>18,0 pontos</strong> na soma dos 3 trimestres e atingir frequência mínima de <strong>75%</strong>.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-[#fdfaf6] p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
              <table className="w-full text-left border-collapse min-w-[900px] text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-700 uppercase tracking-wider text-[11px] font-black">
                    <th className="py-3 px-2 text-center w-12">Nº</th>
                    <th className="py-3 px-3 min-w-[220px]">Nome do Aluno</th>
                    <th className="py-3 px-2 text-center bg-rose-50/50 border-x border-slate-200">Faltas Anuais</th>
                    <th className="py-3 px-2 text-center bg-sky-50/50 border-r border-slate-200">% Freq. Anual</th>
                    <th className="py-3 px-3 text-center bg-slate-100 border-r border-slate-200">
                      <div>1º Trimestre</div>
                      <div className="text-[9px] font-bold text-slate-400">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-3 text-center bg-slate-100 border-r border-slate-200">
                      <div>2º Trimestre</div>
                      <div className="text-[9px] font-bold text-slate-400">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-3 text-center bg-slate-100 border-r border-slate-200">
                      <div>3º Trimestre</div>
                      <div className="text-[9px] font-bold text-slate-400">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-3 text-center bg-indigo-100 border-r border-slate-200 text-indigo-950 font-black">
                      <div>TOTAL ANUAL</div>
                      <div className="text-[9px] font-bold text-indigo-700">(Meta: 18.0 pts)</div>
                    </th>
                    <th className="py-3 px-3 text-center bg-emerald-50 text-emerald-950 font-black">
                      Situação Final
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((student, idx) => {
                    const att = getStudentAttendance(student, 1);
                    const annual = computeAnnualGrades(student);

                    return (
                      <tr key={student.id} className="hover:bg-slate-100/80 transition-colors">
                        <td className="py-3 px-2 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-3 font-black text-slate-900">{student.name}</td>
                        
                        {/* Absences */}
                        <td className="py-3 px-2 text-center bg-rose-50/30 border-x border-slate-200 font-black text-rose-700">
                          {att.annualAbsences} faltas
                        </td>

                        {/* Frequency */}
                        <td className="py-3 px-2 text-center bg-sky-50/30 border-r border-slate-200">
                          <span className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                            att.annualPercent >= 75 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {att.annualPercent}%
                          </span>
                        </td>

                        {/* T1 */}
                        <td className="py-3 px-3 text-center bg-slate-50 border-r border-slate-200">
                          <div className={`font-black text-sm ${annual.t1.isFinalPassing ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {annual.t1.finalTotal.toFixed(1)}
                          </div>
                        </td>

                        {/* T2 */}
                        <td className="py-3 px-3 text-center bg-slate-50 border-r border-slate-200">
                          <div className={`font-black text-sm ${annual.t2.isFinalPassing ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {annual.t2.finalTotal.toFixed(1)}
                          </div>
                        </td>

                        {/* T3 */}
                        <td className="py-3 px-3 text-center bg-slate-50 border-r border-slate-200">
                          <div className={`font-black text-sm ${annual.t3.isFinalPassing ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {annual.t3.finalTotal.toFixed(1)}
                          </div>
                        </td>

                        {/* Total Anual */}
                        <td className="py-3 px-3 text-center bg-indigo-50 border-r border-slate-200 font-black">
                          <div className={`text-base ${annual.isAnnualApproved ? 'text-emerald-800' : 'text-rose-700'}`}>
                            {annual.annualTotal.toFixed(1)}
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">
                            {annual.isAnnualApproved ? 'Aprovado' : `Faltam ${annual.pointsNeeded.toFixed(1)}`}
                          </span>
                        </td>

                        {/* Final Status */}
                        <td className="py-3 px-3 text-center bg-emerald-50/40">
                          {annual.isAnnualApproved ? (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black text-[10px] uppercase rounded-lg border border-emerald-300">
                              Aprovado no Ano
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-black text-[10px] uppercase rounded-lg border border-amber-300">
                              Em Recuperação Final
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* PDF PRINT MODAL */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase">Boletim Escolar • Resolução SEEDUC-RJ</h3>
                <p className="text-xs text-slate-500 font-medium">Visualização oficial para ata e Conselho de Classe (COC)</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportPdf}
                  disabled={isGeneratingPdf}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingPdf ? 'Gerando...' : 'Baixar PDF'}
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Print Content Preview */}
            <div ref={printRef} className="p-8 bg-white border border-slate-300 rounded-xl text-slate-900 font-sans space-y-6">
              <div className="border-b-2 border-slate-800 pb-4 text-center">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">GOVERNO DO ESTADO DO RIO DE JANEIRO</h2>
                <h1 className="text-lg font-black uppercase tracking-tight text-slate-900">SECRETARIA DE ESTADO DE EDUCAÇÃO (SEEDUC-RJ)</h1>
                <p className="text-xs font-bold uppercase text-slate-600 mt-1">{selectedSchool}</p>
                <div className="flex justify-between text-xs font-bold text-slate-700 mt-3 pt-2 border-t border-slate-200">
                  <span>Turma: {currentClass?.name} ({currentClass?.grade}º Ano)</span>
                  <span>{selectedTrimestre}º Trimestre • Ano Letivo 2026</span>
                  <span>Aulas Seg/Sex Previstas: {expectedClassesStats.totalTeachingClasses}</span>
                </div>
              </div>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-800 text-[10px] font-black uppercase">
                    <th className="py-2 px-1 text-center w-8">Nº</th>
                    <th className="py-2 px-2">Nome do Aluno</th>
                    <th className="py-2 px-1 text-center">Faltas</th>
                    <th className="py-2 px-1 text-center">Presenças</th>
                    <th className="py-2 px-1 text-center">% Freq</th>
                    <th className="py-2 px-1 text-center">Part (2)</th>
                    <th className="py-2 px-1 text-center">Trab (3)</th>
                    <th className="py-2 px-1 text-center">Prova (5)</th>
                    <th className="py-2 px-1 text-center">Média Reg</th>
                    <th className="py-2 px-1 text-center">Rec. Trim</th>
                    <th className="py-2 px-1 text-center">Nota Final</th>
                    <th className="py-2 px-2 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {filteredStudents.map((s, i) => {
                    const att = getStudentAttendance(s, trimesterIdNum);
                    const g = computeTrimestreGrade(s.trimestreGrades?.[selectedTrimestre]);
                    return (
                      <tr key={s.id} className="text-[11px]">
                        <td className="py-1.5 px-1 text-center font-bold">{i + 1}</td>
                        <td className="py-1.5 px-2 font-bold">{s.name}</td>
                        <td className="py-1.5 px-1 text-center">{att.trimesterAbsences}</td>
                        <td className="py-1.5 px-1 text-center">{att.trimesterPresents}</td>
                        <td className="py-1.5 px-1 text-center">{att.trimesterPercent}%</td>
                        <td className="py-1.5 px-1 text-center">{g.participation !== undefined ? g.participation.toFixed(1) : '-'}</td>
                        <td className="py-1.5 px-1 text-center">{g.assignment !== undefined ? g.assignment.toFixed(1) : '-'}</td>
                        <td className="py-1.5 px-1 text-center">{g.exam !== undefined ? g.exam.toFixed(1) : '-'}</td>
                        <td className="py-1.5 px-1 text-center font-bold">{g.regularTotal.toFixed(1)}</td>
                        <td className="py-1.5 px-1 text-center">{g.recovery !== undefined ? g.recovery.toFixed(1) : '-'}</td>
                        <td className="py-1.5 px-1 text-center font-black">{g.finalTotal.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-center font-black uppercase text-[10px]">
                          {g.isFinalPassing ? 'Aprovado' : 'Recuperação'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="pt-6 border-t border-slate-300 flex justify-between text-xs text-slate-600 font-bold">
                <div>Professor Responsável: André Victor Brito de Andrade • CREF 039443 G/RJ</div>
                <div>Data: {new Date().toLocaleDateString('pt-BR')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
