import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Award, CheckCircle2, AlertCircle, Save, 
  Search, GraduationCap, Star, Info,
  Printer, Download, Eye, EyeOff, BarChart3, TrendingUp, Users, Target,
  ArrowRight, School, Calendar, BookOpen, AlertTriangle, ArrowLeft,
  Check, Filter, Sparkles, HelpCircle, Layers
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

  // Hub views
  const [activeHubView, setActiveHubView] = useState<'schools' | 'classes'>('classes');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>("all");

  
  // Selected class & trimester
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() => {
    const saved = safeLocalStorage.getItem('grades_selectedClassId');
    return saved && (classData?.[saved] || initialClassData[saved]) ? saved : null;
  });

  const [selectedTrimestre, setSelectedTrimestre] = useState<string>(() => {
    return safeLocalStorage.getItem('grades_selectedTrimestre') || "1";
  });

  const [activeTab, setActiveTab] = useState<'trimester' | 'annual' | 'analytics'>('trimester');
  const [showDetailedRecovery, setShowDetailedRecovery] = useState<boolean>(false);
  const [hubSearchTerm, setHubSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const [isDocenteOnlineModalOpen, setIsDocenteOnlineModalOpen] = useState(false);
  const [isGeneratingDocentePdf, setIsGeneratingDocentePdf] = useState(false);
  const docentePrintRef = useRef<HTMLDivElement>(null);

  // Persist selections
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

  // List of all classes array
  const allClassList = useMemo(() => {
    const merged: Record<string, ClassData> = { ...initialClassData, ...(localClassData || {}) };
    return Object.values(merged).sort((a, b) => {
      // Prioritize 802, 801, 803, then others
      const priority = ["802", "801", "803", "1001", "2001", "2002", "603", "604", "eja1"];
      const indexA = priority.indexOf(a.id);
      const indexB = priority.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  }, [localClassData]);

  // Filtered classes for the main hub view
  const filteredHubClasses = useMemo(() => {
    return allClassList.filter(cls => {
      const matchSchool = selectedSchoolFilter === "all" || cls.school === selectedSchoolFilter;
      const matchSearch = hubSearchTerm.trim() === "" || 
        cls.name.toLowerCase().includes(hubSearchTerm.toLowerCase()) ||
        cls.school.toLowerCase().includes(hubSearchTerm.toLowerCase()) ||
        (cls.grade && `${cls.grade}º ano`.toLowerCase().includes(hubSearchTerm.toLowerCase()));
      return matchSchool && matchSearch;
    });
  }, [allClassList, selectedSchoolFilter, hubSearchTerm]);

  // Active current class
  const currentClass: ClassData | null = useMemo(() => {
    if (!selectedClassId) return null;
    return localClassData[selectedClassId] || initialClassData[selectedClassId] || null;
  }, [selectedClassId, localClassData]);

  // Expected classes statistics (Mondays and Fridays) from SEEDUC 2026 calendar
  const trimesterIdNum = parseInt(selectedTrimestre, 10) || 1;
  const expectedClassesStats = useMemo(() => {
    return calculateExpectedClassesForTrimester(trimesterIdNum);
  }, [trimesterIdNum]);

  const annualTeachingStats = useMemo(() => {
    return getAnnualTeachingStats();
  }, []);

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
      safeLocalStorage.setItem('app_classData', JSON.stringify(updated));
      return updated;
    });
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
        console.error("Erro ao sincronizar na nuvem:", err);
      }
    }
    
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Helper to compute stats for any class
  const getTrimesterLaunchStats = (cls: ClassData, trimester: string) => {
    const students = cls.students || [];
    if (students.length === 0) return { total: 0, graded: 0, avg: 0, pct: 0 };
    
    let graded = 0;
    let sum = 0;
    const tNum = parseInt(trimester, 10) || 1;

    students.forEach(s => {
      // If student not enrolled in this trimester, don't count in required
      if (s.enrolledTrimesters && !s.enrolledTrimesters.includes(tNum)) {
        return;
      }
      const g = computeTrimestreGrade(s.trimestreGrades?.[trimester]);
      if (g.hasData) {
        graded++;
        sum += g.finalTotal;
      }
    });

    const eligibleStudents = students.filter(s => !s.enrolledTrimesters || s.enrolledTrimesters.includes(tNum));
    const totalEligible = eligibleStudents.length;
    const avg = graded > 0 ? parseFloat((sum / graded).toFixed(1)) : 0;
    const pct = totalEligible > 0 ? Math.round((graded / totalEligible) * 100) : 0;

    return { total: totalEligible, graded, avg, pct };
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

  // Filtered students for search in class view
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

  // Export DocenteOnline report to PDF in Landscape
  const handleExportDocenteOnlinePdf = async () => {
    if (!docentePrintRef.current) return;
    setIsGeneratingDocentePdf(true);
    try {
      const element = docentePrintRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      // 'l' for landscape, 'mm', 'a4'
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // If height is larger than page, scale down to fit beautifully
      let finalHeight = imgHeight;
      let finalWidth = imgWidth;
      if (imgHeight > pdfHeight) {
        finalHeight = pdfHeight - 20; // 10mm top/bottom margin
        finalWidth = (canvas.width * finalHeight) / canvas.height;
      }
      
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      pdf.save(`Relatorio_DocenteOnline_${currentClass?.name || 'Turma'}_Trimestre_${selectedTrimestre}.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF do DocenteOnline:", err);
    } finally {
      setIsGeneratingDocentePdf(false);
      setIsDocenteOnlineModalOpen(false);
    }
  };

  // =========================================================================
  // VIEW LEVEL 1: HUB UNIFICADO DE TODAS AS TURMAS & NOTAS
  // =========================================================================
  if (!selectedClassId || !currentClass) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-fade-in font-sans">
        <ScreenHeader
          onBack={onBack}
          badge="NOTAS & AVALIAÇÕES • 2026"
          statusBadge="SEEDUC-RJ ATIVO"
          title="DIÁRIO DE NOTAS & AVALIAÇÕES"
          subtitle="Acompanhamento e lançamento de notas do 1º, 2º e 3º Trimestres de todas as turmas"
          rightTitle="RESOLUÇÃO SEEDUC Nº 6392/2025"
          rightSubtitle="Part (2.0) • Trab (3.0) • Prova (5.0) • Média: 6.0"
          rightExtra="Aprovação Anual: 18.0 pontos • 27 aulas Seg/Sex por Trimestre"
        />

        {/* Global KPI Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-slate-800">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200/80 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Total de Turmas</span>
              <span className="text-xl font-black text-slate-900">{allClassList.length} turmas</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-200/70 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">1º Trimestre (Concluído)</span>
              <span className="text-xl font-black text-emerald-950">Lançado ✓</span>
            </div>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-200/70 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 block">2º Trimestre (Vigente)</span>
              <span className="text-xl font-black text-sky-950">Lançado ✓</span>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/70 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block">3º Trimestre (Futuro)</span>
              <span className="text-xl font-black text-amber-950">08/09 a 22/12</span>
            </div>
          </div>
        </div>

        {/* Hub Content */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Minhas Turmas ({filteredHubClasses.length})</h2>
              <p className="text-xs text-slate-500 font-medium">Visualize e gerencie notas e frequências de todas as suas turmas</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={hubSearchTerm}
                onChange={(e) => setHubSearchTerm(e.target.value)}
                placeholder="Buscar por turma, código ou escola..."
                className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Turmas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {filteredHubClasses.length > 0 ? filteredHubClasses.map(cls => {
                  const t1Stats = getTrimesterLaunchStats(cls, "1");
                  const t2Stats = getTrimesterLaunchStats(cls, "2");
                  const totalStudents = cls.students?.length || 0;

                  return (
                    <div
                      key={cls.id}
                      className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Header tags */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-black text-[11px] uppercase tracking-wider rounded-lg border border-emerald-200">
                            {cls.grade ? `${cls.grade}º ANO` : 'REGULAR'}
                          </span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            {totalStudents} alunos
                          </span>
                        </div>

                        {/* Class Name */}
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-emerald-700 transition-colors">
                          {cls.name}
                        </h3>

                        {/* School Name */}
                        <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-1" title={cls.school}>
                          {cls.school}
                        </p>

                        {/* Trimester Status Progress Mini-cards */}
                        <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          {/* 1º Trimestre status */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              1º Trimestre:
                            </span>
                            {t1Stats.graded > 0 ? (
                              <span className="font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md text-[11px]">
                                {t1Stats.graded}/{t1Stats.total} notas • Média {t1Stats.avg}
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">Em aberto</span>
                            )}
                          </div>

                          {/* 2º Trimestre status */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                              2º Trimestre:
                            </span>
                            {t2Stats.graded > 0 ? (
                              <span className="font-black text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-md text-[11px]">
                                {t2Stats.graded}/{t2Stats.total} notas • Média {t2Stats.avg}
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">Em aberto</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedClassId(cls.id);
                            setSelectedTrimestre("1");
                            setActiveTab('trimester');
                          }}
                          className="flex-1 py-2 px-2.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-900 border border-emerald-200 hover:border-emerald-600 rounded-xl text-xs font-black uppercase tracking-tight transition-all text-center"
                          title="Abrir diretamente as notas do 1º Trimestre"
                        >
                          1º Trim
                        </button>

                        <button
                          onClick={() => {
                            setSelectedClassId(cls.id);
                            setSelectedTrimestre("2");
                            setActiveTab('trimester');
                          }}
                          className="flex-1 py-2 px-2.5 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-900 border border-sky-200 hover:border-sky-600 rounded-xl text-xs font-black uppercase tracking-tight transition-all text-center"
                          title="Abrir diretamente as notas do 2º Trimestre"
                        >
                          2º Trim
                        </button>

                        <button
                          onClick={() => {
                            setSelectedClassId(cls.id);
                            setActiveTab('annual');
                          }}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 rounded-xl text-xs font-black uppercase tracking-tight transition-all flex items-center gap-1 shrink-0"
                          title="Abrir Diário Completo e Visão Geral Anual"
                        >
                          <span>Diário</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="col-span-full py-16 text-center text-slate-400 uppercase tracking-widest text-xs font-black">
                    Nenhuma turma encontrada para o filtro selecionado.
                  </div>
                )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW LEVEL 2: DIÁRIO DE NOTAS DA TURMA SELECIONADA
  // =========================================================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-fade-in font-sans">
      {/* Screen Header */}
      <ScreenHeader
        onBack={() => setSelectedClassId(null)}
        badge={currentClass ? `${currentClass.grade}º ANO • ${currentClass.name}` : 'NOTAS'}
        statusBadge={saveSuccess ? "SINCRONIZADO COM SUCESSO" : isSaving ? "SALVANDO..." : "CONECTADO"}
        title={currentClass ? `NOTAS DA TURMA ${currentClass.name.toUpperCase()}` : "LANÇAMENTO DE NOTAS"}
        subtitle={`${currentClass?.school} • Horário: ${currentClass?.schedule || 'Regular'} • Segundas e Sextas`}
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
              onClick={() => setIsDocenteOnlineModalOpen(true)}
              className="px-3 h-10 flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
              title="Relatório Trimestral Paisagem para lançar no DocenteOnline SEEDUC-RJ"
            >
              <Printer className="w-4 h-4" />
              <span>DocenteOnline (Paisagem)</span>
            </button>
            <button
              onClick={() => setSelectedClassId(null)}
              className="px-3 h-10 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase rounded-xl border border-white/20 shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Turmas</span>
            </button>
          </div>
        }
      />

      {/* Quick Class Switcher Strip */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 pl-2 shrink-0">Trocar Turma:</span>
        <div className="flex items-center gap-1.5">
          {allClassList.map(cls => {
            const isCurrent = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-tight transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cls.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sync / Success alert banner */}
      {saveSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 p-4 rounded-2xl flex items-center justify-between shadow-md animate-slide-down">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Notas Atualizadas com Sucesso!</p>
              <p className="text-[11px] font-medium text-emerald-700">Todas as notas foram salvas localmente e sincronizadas com o banco de dados.</p>
            </div>
          </div>
        </div>
      )}

      {/* Info & Class Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Alunos Matriculados</span>
          <span className="text-xl font-black text-slate-800">{currentClass?.students?.length || 0} alunos</span>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 block mb-0.5">Notas Lançadas</span>
          <span className="text-xl font-black text-sky-900">{classStats.gradedCount} / {classStats.totalStudents}</span>
          <span className="text-[9px] text-sky-600 block mt-0.5">Média Geral: {classStats.averageGrade}</span>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-0.5">Meta Trimestral</span>
          <span className="text-xl font-black text-amber-900">6.0 pts</span>
          <span className="text-[9px] text-amber-600 block mt-0.5">Aprovação: {classStats.approvalRate}%</span>
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
                    <th className="py-3 px-3 min-w-[220px]">Nome do Aluno</th>
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
                    const isEnrolledInThisTrim = !student.enrolledTrimesters || student.enrolledTrimesters.includes(trimesterIdNum);

                    return (
                      <tr key={student.id} className="hover:bg-slate-100/80 transition-colors">
                        {/* Index */}
                        <td className="py-3 px-2 text-center font-bold text-slate-500">
                          {idx + 1}
                        </td>

                        {/* Name */}
                        <td className="py-3 px-3 font-extrabold text-slate-900">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span>{student.name}</span>
                            {!isEnrolledInThisTrim && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black rounded-md border border-amber-300">
                                Matriculado no 2º Trimestre
                              </span>
                            )}
                          </div>
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
                            placeholder="-"
                            className={`w-14 text-center py-1 font-black rounded-lg focus:outline-none text-xs border shadow-xs ${
                              gradeData.recovery !== undefined 
                                ? 'bg-rose-100 border-rose-300 text-rose-900 font-extrabold' 
                                : 'bg-white border-slate-300 text-slate-700'
                            }`}
                          />
                        </td>

                        {/* Final Grade for Trimester */}
                        <td className="py-3 px-2 text-center bg-emerald-50/30 border-r border-slate-200">
                          <div className={`font-black text-base ${
                            gradeData.isFinalPassing ? 'text-emerald-800' : 'text-rose-700'
                          }`}>
                            {gradeData.finalTotal.toFixed(1)}
                          </div>
                          <span className={`px-2 py-0.5 rounded font-black text-[9px] uppercase tracking-wider inline-block ${
                            gradeData.isRecovered 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : gradeData.isFinalPassing 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {gradeData.isRecovered ? 'Recuperado' : gradeData.isFinalPassing ? 'Apto' : 'Em Rec.'}
                          </span>
                        </td>

                        {/* Annual Accumulator */}
                        <td className="py-3 px-2 text-center bg-indigo-50/40">
                          <div className="font-black text-indigo-950 text-sm">
                            {annualData.annualTotal.toFixed(1)} / 18.0
                          </div>
                          <span className={`text-[9px] font-bold block ${
                            annualData.isAnnualApproved ? 'text-emerald-600' : 'text-indigo-600'
                          }`}>
                            {annualData.isAnnualApproved 
                              ? 'Meta Atingida ✓' 
                              : `Faltam ${annualData.pointsNeeded.toFixed(1)} pts`}
                          </span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={showDetailedRecovery ? 14 : 11} className="py-12 text-center text-slate-400 font-bold uppercase text-xs">
                        Nenhum aluno encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Save & Export Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 flex-wrap">
              <div className="text-xs text-slate-500 font-medium">
                Resolução SEEDUC Nº 6392/2025 • Lançamento automático com cálculo da média e recuperação
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANNUAL OVERVIEW TABLE (3 TRIMESTRES) */}
        {activeTab === 'annual' && (
          <div className="space-y-4">
            <div className="overflow-x-auto bg-[#fdfaf6] p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
              <table className="w-full text-left border-collapse min-w-[950px] text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-700 uppercase tracking-wider text-[11px] font-black">
                    <th className="py-3 px-2 text-center w-12">Nº</th>
                    <th className="py-3 px-3 min-w-[220px]">Nome do Aluno</th>
                    <th className="py-3 px-2 text-center bg-emerald-50 border-x border-slate-200">
                      <div>1º Trimestre</div>
                      <div className="text-[9px] font-bold text-emerald-700">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-2 text-center bg-sky-50 border-r border-slate-200">
                      <div>2º Trimestre</div>
                      <div className="text-[9px] font-bold text-sky-700">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-2 text-center bg-amber-50 border-r border-slate-200">
                      <div>3º Trimestre</div>
                      <div className="text-[9px] font-bold text-amber-700">(Meta: 6.0)</div>
                    </th>
                    <th className="py-3 px-2 text-center bg-indigo-100/70 border-r border-slate-200 text-indigo-950 font-black">
                      <div>Total Anual</div>
                      <div className="text-[9px] font-bold text-indigo-800">Soma (Meta: 18.0)</div>
                    </th>
                    <th className="py-3 px-2 text-center bg-purple-50 border-r border-slate-200">
                      <div>Faltas Totais</div>
                      <div className="text-[9px] font-bold text-purple-700">Ano Letivo</div>
                    </th>
                    <th className="py-3 px-2 text-center bg-slate-100 font-black text-slate-900">
                      <div>Situação Final</div>
                      <div className="text-[9px] font-bold text-slate-600">SEEDUC-RJ</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((student, idx) => {
                    const annual = computeAnnualGrades(student);
                    const att = getStudentAttendance(student, 1);

                    return (
                      <tr key={student.id} className="hover:bg-slate-100/80 transition-colors">
                        <td className="py-3 px-2 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-3 font-extrabold text-slate-900">{student.name}</td>
                        
                        {/* T1 Grade */}
                        <td className="py-3 px-2 text-center bg-emerald-50/30 border-x border-slate-200 font-black">
                          <span className={`text-sm ${annual.t1.finalTotal >= 6.0 ? 'text-emerald-700' : annual.t1.hasData ? 'text-rose-600' : 'text-slate-400'}`}>
                            {annual.t1.hasData ? annual.t1.finalTotal.toFixed(1) : '-'}
                          </span>
                        </td>

                        {/* T2 Grade */}
                        <td className="py-3 px-2 text-center bg-sky-50/30 border-r border-slate-200 font-black">
                          <span className={`text-sm ${annual.t2.finalTotal >= 6.0 ? 'text-sky-700' : annual.t2.hasData ? 'text-rose-600' : 'text-slate-400'}`}>
                            {annual.t2.hasData ? annual.t2.finalTotal.toFixed(1) : '-'}
                          </span>
                        </td>

                        {/* T3 Grade */}
                        <td className="py-3 px-2 text-center bg-amber-50/30 border-r border-slate-200 font-black">
                          <span className={`text-sm ${annual.t3.finalTotal >= 6.0 ? 'text-amber-700' : annual.t3.hasData ? 'text-rose-600' : 'text-slate-400'}`}>
                            {annual.t3.hasData ? annual.t3.finalTotal.toFixed(1) : '-'}
                          </span>
                        </td>

                        {/* Annual Total */}
                        <td className="py-3 px-2 text-center bg-indigo-50/60 border-r border-slate-200 font-black">
                          <div className={`text-base ${annual.isAnnualApproved ? 'text-emerald-700' : 'text-indigo-900'}`}>
                            {annual.annualTotal.toFixed(1)}
                          </div>
                          <span className="text-[9px] text-slate-500 font-medium">de 18.0</span>
                        </td>

                        {/* Total Absences */}
                        <td className="py-3 px-2 text-center bg-purple-50/30 border-r border-slate-200 font-black text-purple-900">
                          <div className="text-sm">{att.annualAbsences} faltas</div>
                          <div className="text-[9px] font-medium text-slate-500">{att.annualPercent}% freq.</div>
                        </td>

                        {/* Final Status */}
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider inline-block ${
                            annual.isAnnualApproved 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                              : annual.annualTotal > 0
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-slate-100 text-slate-600'
                          }`}>
                            {annual.isAnnualApproved ? 'Aprovado ✓' : annual.annualTotal > 0 ? `Faltam ${annual.pointsNeeded.toFixed(1)}` : 'Em Andamento'}
                          </span>
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

      {/* PDF Export Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-black uppercase text-slate-900">Boletim Trimestral Oficial • SEEDUC-RJ</h3>
                <p className="text-xs text-slate-500 font-medium">{currentClass?.school} • Turma {currentClass?.name}</p>
              </div>
              <button 
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 font-black text-sm"
              >
                ✕
              </button>
            </div>

            {/* Printable Area */}
            <div ref={printRef} className="p-6 bg-white border border-slate-300 rounded-2xl space-y-4 text-xs">
              <div className="text-center border-b-2 border-slate-900 pb-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Governo do Estado do Rio de Janeiro • Secretaria de Estado de Educação</h2>
                <h3 className="text-xs font-extrabold uppercase text-slate-800 mt-0.5">{currentClass?.school}</h3>
                <p className="text-[10px] text-slate-600">Diário e Boletim de Rendimento Escolar • Disciplina: {currentClass?.discipline || 'Educação Física'} • {selectedTrimestre}º Trimestre 2026</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-bold">
                <div>Turma: <span className="text-slate-950 font-extrabold">{currentClass?.name}</span></div>
                <div>Ano de Escolaridade: <span className="text-slate-950 font-extrabold">{currentClass?.grade}º Ano</span></div>
                <div>Período: <span className="text-slate-950 font-extrabold">{selectedTrimestre}º Trimestre</span></div>
              </div>

              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 font-black text-slate-800 uppercase">
                    <th className="py-1.5 px-2 text-left">Nº</th>
                    <th className="py-1.5 px-2 text-left">Aluno</th>
                    <th className="py-1.5 px-2 text-center">Part (2.0)</th>
                    <th className="py-1.5 px-2 text-center">Trab (3.0)</th>
                    <th className="py-1.5 px-2 text-center">Prova (5.0)</th>
                    <th className="py-1.5 px-2 text-center">Recuperação</th>
                    <th className="py-1.5 px-2 text-center">Média Final</th>
                    <th className="py-1.5 px-2 text-center">Faltas</th>
                    <th className="py-1.5 px-2 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((s, i) => {
                    const g = computeTrimestreGrade(s.trimestreGrades?.[selectedTrimestre]);
                    const att = getStudentAttendance(s, trimesterIdNum);
                    return (
                      <tr key={s.id}>
                        <td className="py-1 px-2 font-bold">{i + 1}</td>
                        <td className="py-1 px-2 font-extrabold">{s.name}</td>
                        <td className="py-1 px-2 text-center">{g.participation !== undefined ? g.participation.toFixed(1) : '-'}</td>
                        <td className="py-1 px-2 text-center">{g.assignment !== undefined ? g.assignment.toFixed(1) : '-'}</td>
                        <td className="py-1 px-2 text-center">{g.exam !== undefined ? g.exam.toFixed(1) : '-'}</td>
                        <td className="py-1 px-2 text-center">{g.recovery !== undefined ? g.recovery.toFixed(1) : '-'}</td>
                        <td className="py-1 px-2 text-center font-black">{g.hasData ? g.finalTotal.toFixed(1) : '-'}</td>
                        <td className="py-1 px-2 text-center">{att.trimesterAbsences}</td>
                        <td className="py-1 px-2 text-center font-bold">
                          {g.isFinalPassing ? 'Apto' : g.hasData ? 'Rec' : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleExportPdf}
                disabled={isGeneratingPdf}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DocenteOnline Landscape Print Modal */}
      {isDocenteOnlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-6 text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-black uppercase text-amber-800 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-amber-600" />
                  <span>Relatório de Apoio ao DocenteOnline SEEDUC-RJ</span>
                </h3>
                <p className="text-xs text-slate-500 font-semibold">Exibição em Paisagem • Apenas Faltas e Nota Final • Ideal para digitação rápida</p>
              </div>
              <button 
                onClick={() => setIsDocenteOnlineModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 font-black text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Preview Area for Landscape */}
            <div className="overflow-x-auto bg-slate-100 p-4 rounded-2xl border border-slate-200 max-h-[60vh] overflow-y-auto">
              {/* Landscape Sheet Container (297mm x 210mm) */}
              <div 
                ref={docentePrintRef} 
                className="bg-white p-10 text-slate-900 border border-slate-300 shadow-lg mx-auto flex flex-col justify-between"
                style={{ 
                  width: '297mm', 
                  minHeight: '210mm', 
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  {/* Elegant Official Header */}
                  <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3 mb-4">
                    <div className="text-left">
                      <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Governo do Estado do Rio de Janeiro</h2>
                      <h3 className="text-xs font-bold text-slate-700 uppercase">Secretaria de Estado de Educação - SEEDUC-RJ</h3>
                      <p className="text-[10px] text-slate-500">Subsecretaria de Gestão de Ensino • Resolução SEEDUC Nº 6392/2025</p>
                    </div>
                    <div className="text-right border-l border-slate-300 pl-4">
                      <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block">
                        Fácil Lançamento DocenteOnline
                      </span>
                    </div>
                  </div>

                  {/* Wide Info Board */}
                  <div className="grid grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold mb-5">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Unidade Escolar</span>
                      <span className="text-slate-900 uppercase truncate font-extrabold">{currentClass?.school}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Turma / Componente</span>
                      <span className="text-slate-900 uppercase font-extrabold">{currentClass?.name} — {currentClass?.discipline}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Período Avaliativo</span>
                      <span className="text-slate-900 uppercase font-extrabold">{selectedTrimestre}º Trimestre 2026</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Data de Geração</span>
                      <span className="text-slate-900 font-extrabold">{new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <h1 className="text-center font-black text-base uppercase tracking-widest text-slate-950 mb-4 underline">
                    Apoio Administrativo: Rendimento e Frequência para Digitação
                  </h1>

                  {/* Clean 4-Column Table */}
                  <table className="w-full border-collapse border border-slate-950 text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-950 font-black uppercase tracking-wider text-[10px] border-b border-slate-950">
                        <th className="border border-slate-950 py-2 px-3 text-center w-16">Nº</th>
                        <th className="border border-slate-950 py-2 px-4 text-left">Nome Completo do Aluno</th>
                        <th className="border border-slate-950 py-2 px-3 text-center w-48 bg-amber-50/50">Faltas (No Trimestre)</th>
                        <th className="border border-slate-950 py-2 px-3 text-center w-48 bg-emerald-50/50">Nota Final (Rendimento)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-400">
                      {filteredStudents.map((s, idx) => {
                        const g = computeTrimestreGrade(s.trimestreGrades?.[selectedTrimestre]);
                        const att = getStudentAttendance(s, trimesterIdNum);
                        
                        // Check if status is cancelled or similar
                        const isCancelled = s.status === 'cancelado' || s.status === 'transferido';

                        return (
                          <tr key={s.id} className={`${isCancelled ? 'bg-slate-50 text-slate-400 line-through' : 'even:bg-slate-50/40'}`}>
                            <td className="border border-slate-950 py-1.5 px-3 text-center font-black">{idx + 1}</td>
                            <td className="border border-slate-950 py-1.5 px-4 font-black uppercase">{s.name}</td>
                            <td className="border border-slate-950 py-1.5 px-3 text-center font-extrabold text-amber-900 bg-amber-50/20 text-sm">
                              {isCancelled ? 'CANCELADO' : `${att.trimesterAbsences}`}
                            </td>
                            <td className="border border-slate-950 py-1.5 px-3 text-center font-black text-emerald-950 bg-emerald-50/20 text-sm">
                              {isCancelled ? '—' : (g.hasData ? g.finalTotal.toFixed(1) : '0.0')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Print signatures and generation info */}
                <div className="mt-8 pt-4 border-t border-dashed border-slate-400 flex items-end justify-between text-[10px] text-slate-500">
                  <div>
                    <p className="font-extrabold text-slate-700 uppercase">Resumo da Planilha:</p>
                    <p>Alunos Ativos: {filteredStudents.filter(s => s.status !== 'cancelado' && s.status !== 'transferido').length} de {filteredStudents.length}</p>
                    <p>Geração do PDF: Clube do Xadrez para Gestão SEEDUC RJ 2026</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-56 border-b border-slate-950 mb-1 mx-auto"></div>
                    <p className="font-black uppercase text-slate-800">Assinatura do Professor Regente</p>
                    <p className="text-[9px]">CPF: ***.***.***-**</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold">
                * Dica: Mantenha este PDF aberto ao lado ou impresso para economizar 90% do tempo ao digitar no DocenteOnline.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDocenteOnlineModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExportDocenteOnlinePdf}
                  disabled={isGeneratingDocentePdf}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingDocentePdf ? 'Gerando Relatório...' : 'Baixar PDF Paisagem'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
