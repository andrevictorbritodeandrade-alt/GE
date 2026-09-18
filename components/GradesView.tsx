import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Award, CheckCircle2, AlertCircle, Save, 
  Search, GraduationCap, Star, Info,
  Printer, Download, Eye, EyeOff, BarChart3, TrendingUp, Users, Target,
  ArrowRight, School, Calendar, BookOpen, AlertTriangle, ArrowLeft,
  Check, Filter, Sparkles, HelpCircle, Layers, Building2, UserCheck,
  FileSpreadsheet, Copy, FileText, CheckCheck
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

export interface SchoolGroupDef {
  id: string;
  tag: string;
  shortName: string;
  fullName: string;
  badge: string;
  isAttendanceOnly?: boolean;
  attendanceOnlyNote?: string;
  colorScheme: {
    border: string;
    hoverBorder: string;
    headerBg: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
    iconBg: string;
    iconText: string;
    lightBg: string;
  };
  matcher: (schoolName: string) => boolean;
}

export const PROFESSOR_REGENTE_NAME = "Professor André Brito";

// Robust file download trigger helper for all browser environments & iframes
export const triggerBlobDownload = (blob: Blob, filename: string) => {
  try {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 2000);
    return true;
  } catch (err) {
    console.error("Erro no triggerBlobDownload:", err);
    return false;
  }
};

export interface TrimesterScheduleItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  coc: string;
  days: string;
  status: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
}

export const TRIMESTER_SCHEDULE_SEEDUC: Record<string, TrimesterScheduleItem> = {
  "1": {
    id: "1",
    name: "1º Trimestre",
    startDate: "05/02/2026",
    endDate: "18/05/2026",
    coc: "19 a 21/05",
    days: "66 dias letivos",
    status: "Concluído",
    badgeBg: "bg-emerald-50",
    badgeBorder: "border-emerald-200",
    textColor: "text-emerald-900"
  },
  "2": {
    id: "2",
    name: "2º Trimestre",
    startDate: "19/05/2026",
    endDate: "04/09/2026",
    coc: "08 a 10/09",
    days: "67 dias letivos",
    status: "Vigente",
    badgeBg: "bg-sky-50",
    badgeBorder: "border-sky-200",
    textColor: "text-sky-900"
  },
  "3": {
    id: "3",
    name: "3º Trimestre",
    startDate: "08/09/2026",
    endDate: "22/12/2026",
    coc: "09 a 11/12",
    days: "73 dias letivos",
    status: "A Iniciar",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200",
    textColor: "text-amber-900"
  }
};

export const SCHOOL_GROUPS: SchoolGroupDef[] = [
  {
    id: "ciep369",
    tag: "CIEP 369",
    shortName: "CIEP 369",
    fullName: "CIEP 369 JORNALISTA SANDRO MOREYRA",
    badge: "Ensino Médio Regular • Formação Geral",
    isAttendanceOnly: false,
    colorScheme: {
      border: "border-teal-300",
      hoverBorder: "hover:border-teal-500",
      headerBg: "bg-teal-50/80 border-b border-teal-200",
      badgeBg: "bg-teal-100 text-teal-900 border border-teal-300",
      badgeText: "text-teal-900",
      accent: "text-teal-700",
      iconBg: "bg-teal-600 text-white",
      iconText: "text-teal-700",
      lightBg: "bg-teal-50/40",
    },
    matcher: (name: string) => {
      const u = (name || '').toUpperCase();
      return u.includes('369') || u.includes('SANDRO MOREYRA');
    }
  },
  {
    id: "ignacio",
    tag: "CE DR. IGNACIO",
    shortName: "CE DR. IGNACIO BEZERRA",
    fullName: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    badge: "Itinerários Formativos (ILGCH / IFFC / IFLA) • Lançamento de Faltas SEEDUC",
    isAttendanceOnly: true,
    attendanceOnlyNote: "Dispensa de Nota Trimestral • Lançamento Exclusivo de Faltas no DocenteOnline SEEDUC",
    colorScheme: {
      border: "border-blue-300",
      hoverBorder: "hover:border-blue-500",
      headerBg: "bg-blue-50/80 border-b border-blue-200",
      badgeBg: "bg-blue-100 text-blue-900 border border-blue-300",
      badgeText: "text-blue-900",
      accent: "text-blue-700",
      iconBg: "bg-blue-600 text-white",
      iconText: "text-blue-700",
      lightBg: "bg-blue-50/40",
    },
    matcher: (name: string) => {
      const u = (name || '').toUpperCase();
      if (u.includes('CORDELIA') || u.includes('CORDÉLIA') || u.includes('476') || u.includes('LAZARONI')) return false;
      return u.includes('IGNACIO') || u.includes('IGNÁCIO');
    }
  },
  {
    id: "ciep476",
    tag: "CIEP 476",
    shortName: "CIEP 476 ELIAS LAZARONI",
    fullName: "CIEP 476 ELIAS LAZARONI",
    badge: "Itinerários Formativos (ILGCH 1007 Noturno) • Lançamento de Faltas SEEDUC",
    isAttendanceOnly: true,
    attendanceOnlyNote: "Dispensa de Nota Trimestral • Lançamento Exclusivo de Faltas no DocenteOnline SEEDUC",
    colorScheme: {
      border: "border-rose-300",
      hoverBorder: "hover:border-rose-500",
      headerBg: "bg-rose-50/80 border-b border-rose-200",
      badgeBg: "bg-rose-100 text-rose-900 border border-rose-300",
      badgeText: "text-rose-900",
      accent: "text-rose-700",
      iconBg: "bg-rose-600 text-white",
      iconText: "text-rose-700",
      lightBg: "bg-rose-50/40",
    },
    matcher: (name: string) => {
      const u = (name || '').toUpperCase();
      if (u.includes('CORDELIA') || u.includes('CORDÉLIA')) return false;
      return u.includes('476') || u.includes('LAZARONI');
    }
  },
  {
    id: "ciep229",
    tag: "CIEP 229",
    shortName: "CIEP 229",
    fullName: "CIEP 229 CÂNDIDO PORTINARI",
    badge: "EJA • Lançamento de Faltas SEEDUC",
    isAttendanceOnly: true,
    attendanceOnlyNote: "EJA • Dispensa de Nota Trimestral • Lançamento Exclusivo de Faltas no DocenteOnline SEEDUC",
    colorScheme: {
      border: "border-violet-300",
      hoverBorder: "hover:border-violet-500",
      headerBg: "bg-violet-50/80 border-b border-violet-200",
      badgeBg: "bg-violet-100 text-violet-900 border border-violet-300",
      badgeText: "text-violet-900",
      accent: "text-violet-700",
      iconBg: "bg-violet-600 text-white",
      iconText: "text-violet-700",
      lightBg: "bg-violet-50/40",
    },
    matcher: (name: string) => {
      const u = (name || '').toUpperCase();
      return u.includes('229') || u.includes('PORTINARI');
    }
  },
  {
    id: "cordelia",
    tag: "CORDELIA PAIVA",
    shortName: "CORDELIA PAIVA BEZERRA DE MENEZES",
    fullName: "EE PROFESSORA CORDELIA PAIVA BEZERRA DE MENEZES",
    badge: "Ensino Fundamental • Educação Física",
    isAttendanceOnly: false,
    colorScheme: {
      border: "border-emerald-300",
      hoverBorder: "hover:border-emerald-500",
      headerBg: "bg-emerald-50/80 border-b border-emerald-200",
      badgeBg: "bg-emerald-100 text-emerald-900 border border-emerald-300",
      badgeText: "text-emerald-900",
      accent: "text-emerald-700",
      iconBg: "bg-emerald-600 text-white",
      iconText: "text-emerald-700",
      lightBg: "bg-emerald-50/40",
    },
    matcher: (name: string) => {
      const u = (name || '').toUpperCase();
      return u.includes('CORDELIA') || u.includes('CORDÉLIA');
    }
  }
];

export const isAttendanceOnlyClass = (cls?: ClassData | null): boolean => {
  if (!cls) return false;
  const s = (cls.school || '').toUpperCase();
  const n = (cls.name || '').toUpperCase();
  if (s.includes('CORDELIA') || s.includes('CORDÉLIA') || s.includes('369') || s.includes('SANDRO MOREYRA')) {
    return false;
  }
  return (
    s.includes('476') || 
    s.includes('229') || 
    s.includes('IGNACIO') || 
    s.includes('IGNÁCIO') || 
    s.includes('PORTINARI') || 
    s.includes('LAZARONI') || 
    n.includes('ILG') || 
    n.includes('EJANEM')
  );
};

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
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

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
  const [copiedDocenteText, setCopiedDocenteText] = useState(false);

  // Persist selections
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
          // 1º Trimestre: 05/02 to 18/05 (or labeled 1º T)
          if (trimesterId === 1) {
            if ((m === 2 && d >= 5) || m === 3 || m === 4 || (m === 5 && d <= 18)) inThisTrimester = true;
          }
          // 2º Trimestre: 19/05 to 04/09 (or labeled 2º T)
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

  // Helper to get full 3 trimesters attendance and annual totals for a student
  const getStudentAllTrimestersAttendance = (student: Student) => {
    const t1 = getStudentAttendance(student, 1);
    const t2 = getStudentAttendance(student, 2);
    const t3 = getStudentAttendance(student, 3);
    const annualAbsences = t1.trimesterAbsences + t2.trimesterAbsences + t3.trimesterAbsences;
    const annualPresents = t1.trimesterPresents + t2.trimesterPresents + t3.trimesterPresents;
    const totalClasses = annualPresents + annualAbsences;
    const annualPercent = totalClasses > 0 ? Math.round((annualPresents / totalClasses) * 100) : 100;
    return {
      t1,
      t2,
      t3,
      annualAbsences,
      annualPresents,
      totalClasses,
      annualPercent,
    };
  };

  // Helper to calculate Scheduled vs Taught lessons for a class and trimester
  const getTrimesterClassLessonStats = useCallback((cls: ClassData | null, trimesterId: number) => {
    const stats = calculateExpectedClassesForTrimester(trimesterId);
    // Scheduled classes per trimester for 2 weekly lessons (e.g., Seg/Sex: T1=28, T2=26, T3=28)
    const scheduled = stats.totalTeachingClasses || (trimesterId === 2 ? 26 : 28);

    const registeredDates = new Set<string>();
    if (cls?.students) {
      cls.students.forEach(st => {
        if (st.attendance) {
          Object.keys(st.attendance).forEach(dateKey => {
            if (st.attendance[dateKey] === 'P' || st.attendance[dateKey] === 'F') {
              let inThisTrim = false;
              if (dateKey.includes(`${trimesterId}º T`) || dateKey.includes(`${trimesterId}ºT`)) {
                inThisTrim = true;
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
                  if (trimesterId === 1 && ((m === 2 && d >= 5) || m === 3 || m === 4 || (m === 5 && d <= 18))) inThisTrim = true;
                  else if (trimesterId === 2 && ((m === 5 && d >= 19) || m === 6 || m === 7 || m === 8 || (m === 9 && d <= 4))) inThisTrim = true;
                  else if (trimesterId === 3 && ((m === 9 && d >= 8) || m === 10 || m === 11 || (m === 12 && d <= 22))) inThisTrim = true;
                }
              }
              if (inThisTrim) registeredDates.add(dateKey);
            }
          });
        }
      });
    }

    if (cls?.dailyActivities) {
      cls.dailyActivities.forEach(act => {
        if (act.date) {
          const parts = act.date.split('-');
          if (parts.length >= 3) {
            const m = parseInt(parts[1], 10);
            const d = parseInt(parts[2], 10);
            if (trimesterId === 1 && ((m === 2 && d >= 5) || m === 3 || m === 4 || (m === 5 && d <= 18))) registeredDates.add(act.date);
            else if (trimesterId === 2 && ((m === 5 && d >= 19) || m === 6 || m === 7 || m === 8 || (m === 9 && d <= 4))) registeredDates.add(act.date);
            else if (trimesterId === 3 && ((m === 9 && d >= 8) || m === 10 || m === 11 || (m === 12 && d <= 22))) registeredDates.add(act.date);
          }
        }
      });
    }

    // Number of classes taught/given (if roll calls are recorded, use count; if matching completed curriculum, default to scheduled)
    const taught = registeredDates.size > 0 ? registeredDates.size : scheduled;

    return {
      scheduled,
      taught,
      registeredDatesCount: registeredDates.size,
      officialSchoolDays: stats.totalOfficialSchoolDays,
      percentTaught: scheduled > 0 ? Math.round((taught / scheduled) * 100) : 100,
    };
  }, []);

  const currentTrimLessonStats = useMemo(() => {
    return getTrimesterClassLessonStats(currentClass, trimesterIdNum);
  }, [currentClass, trimesterIdNum, getTrimesterClassLessonStats]);

  const allTrimestersLessonStats = useMemo(() => {
    const t1 = getTrimesterClassLessonStats(currentClass, 1);
    const t2 = getTrimesterClassLessonStats(currentClass, 2);
    const t3 = getTrimesterClassLessonStats(currentClass, 3);
    return {
      t1,
      t2,
      t3,
      annualScheduled: t1.scheduled + t2.scheduled + t3.scheduled,
      annualTaught: t1.taught + t2.taught + t3.taught,
      annualSchoolDays: t1.officialSchoolDays + t2.officialSchoolDays + t3.officialSchoolDays, // 206 dias letivos
    };
  }, [currentClass, getTrimesterClassLessonStats]);

  // Helper to get total class absences and attendance for a trimester
  const getClassAttendanceStats = (cls: ClassData, trimester: string) => {
    const students = cls.students || [];
    const tNum = parseInt(trimester, 10) || 1;
    let totalAbsences = 0;
    let totalPresents = 0;
    students.forEach(s => {
      const att = getStudentAttendance(s, tNum);
      totalAbsences += att.trimesterAbsences;
      totalPresents += att.trimesterPresents;
    });
    const total = totalAbsences + totalPresents;
    const avgFreq = total > 0 ? Math.round((totalPresents / total) * 100) : 100;
    return { totalAbsences, totalPresents, avgFreq };
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

  // School sections calculation for the 4 designated schools
  const schoolSections = useMemo(() => {
    return SCHOOL_GROUPS.map(group => {
      const classes = allClassList.filter(c => group.matcher(c.school));
      
      const matchingClasses = classes.filter(cls => {
        if (!hubSearchTerm.trim()) return true;
        const q = hubSearchTerm.toLowerCase();
        return (
          cls.name.toLowerCase().includes(q) ||
          cls.school.toLowerCase().includes(q) ||
          (cls.grade && `${cls.grade}`.includes(q)) ||
          group.fullName.toLowerCase().includes(q) ||
          group.shortName.toLowerCase().includes(q) ||
          group.tag.toLowerCase().includes(q)
        );
      });

      const totalStudents = classes.reduce((sum, c) => sum + (c.students?.length || 0), 0);
      
      let t1Graded = 0;
      let t1Total = 0;
      let t2Graded = 0;
      let t2Total = 0;
      let t1Absences = 0;
      let t2Absences = 0;
      let totalPresentsAll = 0;
      let totalAbsencesAll = 0;

      classes.forEach(c => {
        const s1 = getTrimesterLaunchStats(c, "1");
        t1Graded += s1.graded;
        t1Total += s1.total;
        const s2 = getTrimesterLaunchStats(c, "2");
        t2Graded += s2.graded;
        t2Total += s2.total;

        const a1 = getClassAttendanceStats(c, "1");
        const a2 = getClassAttendanceStats(c, "2");
        t1Absences += a1.totalAbsences;
        t2Absences += a2.totalAbsences;
        totalAbsencesAll += (a1.totalAbsences + a2.totalAbsences);
        totalPresentsAll += (a1.totalPresents + a2.totalPresents);
      });

      const overallFreq = (totalPresentsAll + totalAbsencesAll) > 0 
        ? Math.round((totalPresentsAll / (totalPresentsAll + totalAbsencesAll)) * 100) 
        : 100;

      return {
        ...group,
        classes,
        matchingClasses,
        totalStudents,
        t1Graded,
        t1Total,
        t2Graded,
        t2Total,
        t1Absences,
        t2Absences,
        overallFreq,
        hasMatches: matchingClasses.length > 0
      };
    });
  }, [allClassList, hubSearchTerm]);

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
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      const filename = `Boletim_${(currentClass?.name || 'Turma').replace(/\s+/g, '_')}_Trimestre_${selectedTrimestre}.pdf`;
      const blob = pdf.output('blob');
      triggerBlobDownload(blob, filename);
      try {
        pdf.save(filename);
      } catch (e) {
        // Ignored if blob download already handled
      }
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Não foi possível gerar o arquivo automaticamente pelo canvas. Tente a opção 'Imprimir / Salvar PDF'.");
    } finally {
      setIsGeneratingPdf(false);
      setIsPrintModalOpen(false);
    }
  };

  // Direct Browser Print for DocenteOnline (100% reliable native vector print/PDF)
  const handlePrintDirectDocente = () => {
    if (!docentePrintRef.current) return;
    const printContent = docentePrintRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Relatório DocenteOnline SEEDUC-RJ - ${currentClass?.name || 'Turma'}</title>
            <style>
              @page { size: A4 landscape; margin: 8mm; }
              body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #000; margin: 0; padding: 12px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
              th, td { border: 1px solid #000; padding: 4px 6px; text-align: left; }
              th { background-color: #f1f5f9; font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .font-bold { font-weight: bold; }
              .font-black { font-weight: 900; }
              .font-extrabold { font-weight: 800; }
              .uppercase { text-transform: uppercase; }
              .underline { text-decoration: underline; }
              @media print {
                button { display: none !important; }
              }
            </style>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = function() {
                window.focus();
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
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
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
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
        finalHeight = pdfHeight - 16; // 8mm margin
        finalWidth = (canvas.width * finalHeight) / canvas.height;
      }
      
      const xOffset = Math.max(0, (pdfWidth - finalWidth) / 2);
      const yOffset = Math.max(0, (pdfHeight - finalHeight) / 2);
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, undefined, 'FAST');
      
      const filename = `Relatorio_DocenteOnline_${(currentClass?.name || 'Turma').replace(/\s+/g, '_')}_Trimestre_${selectedTrimestre}.pdf`;
      const blob = pdf.output('blob');
      
      // Multi-strategy trigger for maximum reliability across iframes and browsers
      const downloaded = triggerBlobDownload(blob, filename);
      try {
        pdf.save(filename);
      } catch (saveErr) {
        console.warn("pdf.save fallback notice:", saveErr);
      }
      
      if (!downloaded) {
        // Fallback to open in new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      }
    } catch (err) {
      console.error("Erro ao gerar PDF do DocenteOnline:", err);
      // If canvas fails, offer direct print / save as PDF
      alert("A geração do canvas foi impedida pelo navegador. Abrindo caixa de diálogo de Impressão / Salvar como PDF...");
      handlePrintDirectDocente();
    } finally {
      setIsGeneratingDocentePdf(false);
    }
  };

  // Export DocenteOnline data to CSV (compatible with Excel / Google Sheets)
  const handleExportDocenteOnlineCsv = () => {
    if (!currentClass) return;
    const isAttOnly = isAttendanceOnlyClass(currentClass);
    const headers = isAttOnly
      ? ['Nº', 'Nome Completo', 'Faltas 1º Trim', 'Faltas 2º Trim', 'Faltas 3º Trim', 'Total Faltas (Ano)', '% Frequencia', 'Situacao SEEDUC']
      : ['Nº', 'Nome Completo', `Faltas (${selectedTrimestre}º Trim)`, `Nota Final (${selectedTrimestre}º Trim)`, '% Frequencia', 'Situacao'];

    const rows = filteredStudents.map((s, idx) => {
      const isCancelled = s.status === 'cancelado' || s.status === 'transferido';
      if (isCancelled) {
        return [idx + 1, `"${s.name}"`, 'CANCELADO / TRANSFERIDO', '—', '—', '—', '—', 'CANCELADO'];
      }
      if (isAttOnly) {
        const attAll = getStudentAllTrimestersAttendance(s);
        return [
          idx + 1,
          `"${s.name.replace(/"/g, '""')}"`,
          attAll.t1.trimesterAbsences,
          attAll.t2.trimesterAbsences,
          attAll.t3.trimesterAbsences,
          attAll.annualAbsences,
          `${attAll.annualPercent}%`,
          attAll.annualPercent >= 75 ? 'Regular' : 'Infrequente (<75%)'
        ];
      } else {
        const att = getStudentAttendance(s, trimesterIdNum);
        const g = computeTrimestreGrade(s.trimestreGrades?.[selectedTrimestre]);
        return [
          idx + 1,
          `"${s.name.replace(/"/g, '""')}"`,
          att.trimesterAbsences,
          g.hasData ? g.finalTotal.toFixed(1) : '0.0',
          `${att.trimesterPercent}%`,
          g.hasData && g.finalTotal >= 6.0 ? 'Aprovado' : 'Em Aberto/Rec'
        ];
      }
    });

    const trimSchedule = TRIMESTER_SCHEDULE_SEEDUC[selectedTrimestre] || TRIMESTER_SCHEDULE_SEEDUC["2"];
    const csvContent = '\uFEFF' + [
      [`"RELATORIO DOCENTEONLINE SEEDUC-RJ - ${currentClass.name.toUpperCase()}"`],
      [`"Escola: ${currentClass.school}"`],
      [`"Professor Regente: ${PROFESSOR_REGENTE_NAME}"`],
      [`"Periodo / Vigencia: ${selectedTrimestre}o TRIMESTRE (${trimSchedule.startDate} A ${trimSchedule.endDate})"`],
      [`"Aulas Programadas (Previstas): ${currentTrimLessonStats.scheduled} aulas"`],
      [`"Aulas Dadas (Ministradas): ${currentTrimLessonStats.taught} aulas"`],
      [`"Dias Letivos Oficiais SEEDUC: ${currentTrimLessonStats.officialSchoolDays} dias"`],
      [`"Modalidade: ${isAttOnly ? 'Lancamento Exclusivo de Faltas (Sem Nota Numerica)' : 'Notas e Frequencia'}"`],
      [`"Gerado em: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}"`],
      [],
      headers.join(';'),
      ...rows.map(r => r.join(';'))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `DocenteOnline_${currentClass.name}_Faltas_SEEDUC.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy DocenteOnline data formatted to clipboard for fast typing
  const handleCopyDocenteOnlineText = () => {
    if (!currentClass) return;
    const isAttOnly = isAttendanceOnlyClass(currentClass);
    const lines = filteredStudents.map((s, idx) => {
      const isCancelled = s.status === 'cancelado' || s.status === 'transferido';
      if (isCancelled) return `${idx + 1}\t${s.name}\t[CANCELADO]`;
      if (isAttOnly) {
        const attAll = getStudentAllTrimestersAttendance(s);
        return `${idx + 1}\t${s.name}\tT1: ${attAll.t1.trimesterAbsences} faltas\tT2: ${attAll.t2.trimesterAbsences} faltas\tT3: ${attAll.t3.trimesterAbsences} faltas\tTotal Anual: ${attAll.annualAbsences} faltas`;
      } else {
        const att = getStudentAttendance(s, trimesterIdNum);
        const g = computeTrimestreGrade(s.trimestreGrades?.[selectedTrimestre]);
        return `${idx + 1}\t${s.name}\tFaltas: ${att.trimesterAbsences}\tNota: ${g.hasData ? g.finalTotal.toFixed(1) : '0.0'}`;
      }
    });

    const trimSchedule = TRIMESTER_SCHEDULE_SEEDUC[selectedTrimestre] || TRIMESTER_SCHEDULE_SEEDUC["2"];
    const textToCopy = [
      `RELATÓRIO DOCENTEONLINE SEEDUC-RJ - ${currentClass.name.toUpperCase()} (${currentClass.school})`,
      `Professor Regente: ${PROFESSOR_REGENTE_NAME}`,
      `Período / Vigência: ${selectedTrimestre}º TRIMESTRE (${trimSchedule.startDate} A ${trimSchedule.endDate})`,
      `Aulas Programadas: ${currentTrimLessonStats.scheduled} aulas | Aulas Dadas: ${currentTrimLessonStats.taught} aulas | Dias Letivos: ${currentTrimLessonStats.officialSchoolDays} dias`,
      `Tipo: ${isAttOnly ? 'LANÇAMENTO EXCLUSIVO DE FALTAS' : 'NOTAS E FREQUÊNCIA'}`,
      `Data: ${new Date().toLocaleDateString('pt-BR')}`,
      '------------------------------------------------------------',
      ...lines
    ].join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedDocenteText(true);
      setTimeout(() => setCopiedDocenteText(false), 3000);
    });
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
          subtitle={`Professor Regente: ${PROFESSOR_REGENTE_NAME} • Acompanhamento e lançamento de notas da Rede SEEDUC-RJ`}
          rightTitle="RESOLUÇÃO SEEDUC Nº 6392/2025"
          rightSubtitle="Part (2.0) • Trab (3.0) • Prova (5.0) • Média: 6.0"
          rightExtra="Aprovação Anual: 18.0 pontos"
        />

        {/* Quadro Oficial: Professor Regente & Datas de Início e Fechamento dos Trimestres */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
                  Corpo Docente • Gestão de Diários
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Professor Regente:</span>
                  <span className="text-emerald-400">{PROFESSOR_REGENTE_NAME}</span>
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold text-slate-200 border border-white/15">
                4 Escolas Atendidas
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold text-slate-200 border border-white/15">
                {allClassList.length} Turmas Ativas
              </span>
            </div>
          </div>

          {/* 3 Trimesters Start & Closing Dates Grid */}
          <div className="p-4 sm:p-5 bg-slate-50/60 border-t border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-700" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Datas de Início e Fechamento dos Trimestres (Calendário SEEDUC-RJ 2026)
                </h4>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                Resolução SEEDUC Nº 6392/2025 • Total: 206 Dias Letivos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* 1º Trimestre */}
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-300">
                      1º Trimestre • Concluído
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">66 dias</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Início:</span>
                      <span className="font-black text-slate-950 text-sm">05/02/2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Fechamento:</span>
                      <span className="font-black text-emerald-700 text-sm">18/05/2026</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500 font-medium">Conselho (COC 1):</span>
                      <span className="font-extrabold text-slate-800">19 a 21 de maio</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2º Trimestre */}
              <div className="bg-white p-4 rounded-2xl border-2 border-sky-400 shadow-xs flex flex-col justify-between ring-2 ring-sky-200">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-sky-100 text-sky-900 rounded-lg text-[10px] font-black uppercase tracking-wider border border-sky-300">
                      2º Trimestre • Vigente
                    </span>
                    <span className="text-[11px] font-bold text-sky-700">67 dias</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Início:</span>
                      <span className="font-black text-slate-950 text-sm">19/05/2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Fechamento:</span>
                      <span className="font-black text-sky-700 text-sm">04/09/2026</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500 font-medium">Conselho (COC 2):</span>
                      <span className="font-extrabold text-slate-800">08 a 10 de setembro</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3º Trimestre */}
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-300">
                      3º Trimestre • A Iniciar
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">73 dias</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Início:</span>
                      <span className="font-black text-slate-950 text-sm">08/09/2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Data de Fechamento:</span>
                      <span className="font-black text-amber-700 text-sm">22/12/2026</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500 font-medium">Conselho (COC 3):</span>
                      <span className="font-extrabold text-slate-800">09 a 11 de dezembro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">1º Trim (05/02 a 18/05)</span>
              <span className="text-xl font-black text-emerald-950">Lançado ✓</span>
            </div>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-200/70 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 block">2º Trim (19/05 a 04/09)</span>
              <span className="text-xl font-black text-sky-950">Lançado ✓</span>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/70 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block">3º Trim (08/09 a 22/12)</span>
              <span className="text-xl font-black text-amber-950">08/09 a 22/12</span>
            </div>
          </div>
        </div>

        {/* Hub Content: School Cards & Their Respective Classes */}
        <div className="space-y-6">
          {/* Controls Bar: School Filter Pills & Global Search */}
          <div className="bg-white p-5 rounded-3xl shadow-md border border-slate-200 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                    Rede SEEDUC-RJ
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    4 Unidades Escolares • {allClassList.length} Turmas
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                  Diários de Notas por Unidade Escolar
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Acesse cada uma das 4 escolas e consulte ou lance as notas das suas respectivas turmas
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={hubSearchTerm}
                  onChange={(e) => setHubSearchTerm(e.target.value)}
                  placeholder="Buscar turma, escola ou código..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* School Filter Segmented Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedSchoolFilter("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSchoolFilter === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>Todas as 4 Unidades</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${selectedSchoolFilter === "all" ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'}`}>
                  {allClassList.length}
                </span>
              </button>

              {schoolSections.map(sec => {
                const isSelected = selectedSchoolFilter === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSchoolFilter(isSelected ? "all" : sec.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
                      isSelected
                        ? `${sec.colorScheme.iconBg} shadow-md`
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{sec.shortName}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {sec.classes.length} {sec.classes.length === 1 ? 'turma' : 'turmas'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards for the 4 Schools and their respective classes */}
          <div className="space-y-8">
            {schoolSections
              .filter(sec => selectedSchoolFilter === "all" || selectedSchoolFilter === sec.id)
              .map(sec => {
                return (
                  <div
                    key={sec.id}
                    className={`bg-white rounded-3xl border-2 ${sec.colorScheme.border} shadow-lg overflow-hidden flex flex-col transition-all`}
                  >
                    {/* School Card Header */}
                    <div className={`p-6 ${sec.colorScheme.headerBg} flex flex-col lg:flex-row lg:items-center justify-between gap-4`}>
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${sec.colorScheme.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                          <Building2 className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${sec.colorScheme.badgeBg}`}>
                              {sec.tag}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {sec.badge}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                            {sec.shortName}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 font-medium">
                            {sec.fullName}
                          </p>
                        </div>
                      </div>

                      {/* School Metrics Badges */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="px-3.5 py-2 bg-white/95 rounded-2xl border border-slate-200 text-xs font-black text-slate-700 flex items-center gap-1.5 shadow-xs">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span>{sec.classes.length} {sec.classes.length === 1 ? 'Turma' : 'Turmas'} • {sec.totalStudents} Alunos</span>
                        </div>
                        {sec.isAttendanceOnly ? (
                          <>
                            <div className="px-3.5 py-2 bg-blue-50 rounded-2xl border border-blue-300 text-xs font-black text-blue-950 flex items-center gap-1.5 shadow-xs">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span>1º Trim: {sec.t1Absences} Faltas</span>
                            </div>
                            <div className="px-3.5 py-2 bg-amber-50 rounded-2xl border border-amber-300 text-xs font-black text-amber-950 flex items-center gap-1.5 shadow-xs">
                              <CheckCircle2 className="w-4 h-4 text-amber-600" />
                              <span>2º Trim: {sec.t2Absences} Faltas</span>
                            </div>
                            <div className="px-3.5 py-2 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs font-black text-emerald-950 flex items-center gap-1.5 shadow-xs">
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                              <span>{sec.overallFreq}% Frequência</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="px-3.5 py-2 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs font-black text-emerald-900 flex items-center gap-1.5 shadow-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>1º Trim: {sec.t1Graded}/{sec.t1Total}</span>
                            </div>
                            <div className="px-3.5 py-2 bg-sky-50 rounded-2xl border border-sky-300 text-xs font-black text-sky-900 flex items-center gap-1.5 shadow-xs">
                              <Award className="w-4 h-4 text-sky-600" />
                              <span>2º Trim: {sec.t2Graded}/{sec.t2Total}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Attendance only notification banner */}
                    {sec.isAttendanceOnly && (
                      <div className="mx-6 mt-4 p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-blue-950">
                        <div className="flex items-center gap-2.5">
                          <Info className="w-5 h-5 text-blue-600 shrink-0" />
                          <p className="font-bold">
                            <span className="font-black uppercase tracking-wider text-blue-900">Modalidade de Faltas SEEDUC:</span> Para esta escola, você <span className="underline font-black">não precisa lançar notas</span> no trimestre. O sistema já gera automaticamente o arquivo oficial com as faltas apuradas por trimestre e ano letivo para o DocenteOnline.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* DENTRO DE CADA UM: AS RESPECTIVAS TURMAS */}
                    <div className="p-6 space-y-4 bg-slate-50/50">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className={`w-5 h-5 ${sec.colorScheme.accent}`} />
                          <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                            Turmas Desta Escola ({sec.matchingClasses.length})
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-slate-500">
                          {sec.classes.length} {sec.classes.length === 1 ? 'turma cadastrada' : 'turmas cadastradas'} nesta unidade
                        </span>
                      </div>

                      {/* Grid of classes for this school */}
                      {sec.matchingClasses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sec.matchingClasses.map(cls => {
                            const isAttOnly = sec.isAttendanceOnly || isAttendanceOnlyClass(cls);
                            const t1Stats = getTrimesterLaunchStats(cls, "1");
                            const t2Stats = getTrimesterLaunchStats(cls, "2");
                            const t1Att = getClassAttendanceStats(cls, "1");
                            const t2Att = getClassAttendanceStats(cls, "2");
                            const totalStudents = cls.students?.length || 0;

                            return (
                              <div
                                key={cls.id}
                                className="bg-white border-2 border-slate-200/90 rounded-2xl p-4 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group"
                              >
                                <div>
                                  {/* Header tags */}
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-black text-[11px] uppercase tracking-wider rounded-lg border border-slate-200">
                                        {cls.grade ? `${cls.grade}º ANO` : 'REGULAR'}
                                      </span>
                                      {isAttOnly && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-black text-[10px] uppercase rounded-lg border border-blue-200">
                                          Faltas SEEDUC
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                      <Users className="w-3.5 h-3.5 text-slate-400" />
                                      {totalStudents} alunos
                                    </span>
                                  </div>

                                  {/* Class Name */}
                                  <h5 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-emerald-700 transition-colors">
                                    {cls.name}
                                  </h5>

                                  {/* Details */}
                                  <p className="text-[11px] text-slate-500 font-medium mb-3">
                                    {cls.shift ? `Turno: ${cls.shift}` : 'Turno Regular'} • {cls.schedule || 'Segundas e Sextas'}
                                  </p>

                                  {/* Trimester Status Progress Mini-cards */}
                                  <div className="space-y-1.5 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                                    {isAttOnly ? (
                                      <>
                                        {/* 1º Trimestre Faltas status */}
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            1º Trim (Faltas):
                                          </span>
                                          <span className="font-black text-blue-950 bg-blue-100 px-2 py-0.5 rounded-md text-[11px]">
                                            {t1Att.totalAbsences} faltas ({t1Att.avgFreq}% freq)
                                          </span>
                                        </div>

                                        {/* 2º Trimestre Faltas status */}
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                            2º Trim (Faltas):
                                          </span>
                                          <span className="font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md text-[11px]">
                                            {t2Att.totalAbsences} faltas ({t2Att.avgFreq}% freq)
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {/* 1º Trimestre status */}
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            1º Trim:
                                          </span>
                                          {t1Stats.graded > 0 ? (
                                            <span className="font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                                              {t1Stats.graded}/{t1Stats.total} • Média {t1Stats.avg}
                                            </span>
                                          ) : (
                                            <span className="text-[11px] font-bold text-slate-400">Em aberto</span>
                                          )}
                                        </div>

                                        {/* 2º Trimestre status */}
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                                            2º Trim:
                                          </span>
                                          {t2Stats.graded > 0 ? (
                                            <span className="font-black text-sky-900 bg-sky-100 px-2 py-0.5 rounded-md text-[11px]">
                                              {t2Stats.graded}/{t2Stats.total} • Média {t2Stats.avg}
                                            </span>
                                          ) : (
                                            <span className="text-[11px] font-bold text-slate-400">Em aberto</span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-3 border-t border-slate-100 space-y-2">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => {
                                        setSelectedClassId(cls.id);
                                        setSelectedTrimestre("1");
                                        setActiveTab('trimester');
                                      }}
                                      className="flex-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-900 border border-emerald-200 hover:border-emerald-600 rounded-xl text-xs font-black uppercase tracking-tight transition-all text-center"
                                      title="Abrir diretamente 1º Trimestre"
                                    >
                                      1º Trim
                                    </button>

                                    <button
                                      onClick={() => {
                                        setSelectedClassId(cls.id);
                                        setSelectedTrimestre("2");
                                        setActiveTab('trimester');
                                      }}
                                      className="flex-1 py-1.5 px-2 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-900 border border-sky-200 hover:border-sky-600 rounded-xl text-xs font-black uppercase tracking-tight transition-all text-center"
                                      title="Abrir diretamente 2º Trimestre"
                                    >
                                      2º Trim
                                    </button>

                                    <button
                                      onClick={() => {
                                        setSelectedClassId(cls.id);
                                        setActiveTab('annual');
                                      }}
                                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 rounded-xl text-xs font-black uppercase tracking-tight transition-all flex items-center gap-1 shrink-0"
                                      title="Abrir Diário Completo da Turma"
                                    >
                                      <span>Diário</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* DocenteOnline Landscape Quick Export */}
                                  <button
                                    onClick={() => {
                                      setSelectedClassId(cls.id);
                                      setSelectedTrimestre("2");
                                      setIsDocenteOnlineModalOpen(true);
                                    }}
                                    className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                                      isAttOnly 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700' 
                                        : 'bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-900 border border-amber-200 hover:border-amber-600'
                                    }`}
                                    title={isAttOnly ? "Gerar Arquivo SEEDUC de Faltas (PDF/Excel)" : "Abrir Relatório Paisagem do DocenteOnline para esta turma"}
                                  >
                                    {isAttOnly ? <FileSpreadsheet className="w-3.5 h-3.5" /> : <Printer className="w-3.5 h-3.5" />}
                                    <span>{isAttOnly ? 'Arquivo SEEDUC (Faltas)' : 'DocenteOnline (Paisagem)'}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-slate-400 uppercase tracking-wider text-xs font-black bg-white rounded-2xl border border-slate-200/80">
                          Nenhuma turma encontrada nesta escola com o filtro atual.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
        badge={currentClass ? `${currentClass.grade ? `${currentClass.grade}º ANO • ` : ''}${currentClass.name}${isAttendanceOnlyClass(currentClass) ? ' • FALTAS SEEDUC' : ''}` : 'NOTAS'}
        statusBadge={saveSuccess ? "SINCRONIZADO COM SUCESSO" : isSaving ? "SALVANDO..." : "CONECTADO"}
        title={currentClass ? (isAttendanceOnlyClass(currentClass) ? `CONTROLE DE FALTAS • ${currentClass.name.toUpperCase()}` : `NOTAS DA TURMA ${currentClass.name.toUpperCase()}`) : "LANÇAMENTO DE NOTAS"}
        subtitle={`Professor Regente: ${PROFESSOR_REGENTE_NAME} • ${currentClass?.school} • ${isAttendanceOnlyClass(currentClass) ? 'Modalidade: Apuração de Faltas SEEDUC (Sem nota trimestral)' : `Horário: ${currentClass?.schedule || 'Regular'} • Segundas e Sextas`}`}
        rightTitle={isAttendanceOnlyClass(currentClass) ? "CONTROLE DE FALTAS SEEDUC" : "SISTEMA DE NOTAS SEEDUC-RJ"}
        rightSubtitle={isAttendanceOnlyClass(currentClass) ? "Apurando Faltas 1º, 2º e 3º Trimestres • DocenteOnline" : "Part: 2.0 • Trab: 3.0 • Prova: 5.0 • Média: 6.0"}
        rightExtra={isAttendanceOnlyClass(currentClass) ? "Resolução SEEDUC Nº 6392/2025 • Total: 206 Dias Letivos" : "Aprovação Anual: 18.0 pontos • Aulas Seg/Sex: 27 previstas"}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {isAttendanceOnlyClass(currentClass) ? (
              <>
                <button
                  onClick={handleExportDocenteOnlineCsv}
                  className="px-3.5 h-10 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all active:scale-95"
                  title="Baixar Arquivo Excel/CSV com as Faltas de Todos os Alunos"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Arquivo Excel (.csv)</span>
                </button>
                <button
                  onClick={handleCopyDocenteOnlineText}
                  className="px-3 h-10 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase rounded-xl border border-white/20 shadow-sm transition-all"
                  title="Copiar lista de faltas para a área de transferência"
                >
                  {copiedDocenteText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDocenteText ? 'Copiado!' : 'Copiar Faltas'}</span>
                </button>
                <button
                  onClick={() => setIsDocenteOnlineModalOpen(true)}
                  className="px-3.5 h-10 flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all active:scale-95"
                  title="Abrir Relatório Oficial em Paisagem das Faltas SEEDUC"
                >
                  <Printer className="w-4 h-4" />
                  <span>DocenteOnline (Paisagem)</span>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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

      {/* Informações Oficiais do Trimestre Selecionado & Professor Regente */}
      {(() => {
        const activeTrimInfo = TRIMESTER_SCHEDULE_SEEDUC[selectedTrimestre] || TRIMESTER_SCHEDULE_SEEDUC["2"];
        return (
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Professor Regente
                </span>
                <span className="text-base font-black text-slate-900">
                  {PROFESSOR_REGENTE_NAME}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  Disciplina: {currentClass?.discipline || 'Educação Física'}
                </span>
              </div>
            </div>

            {/* Trimester start and closing dates badge with Programmed and Given Classes */}
            <div className="flex items-center gap-3 flex-wrap bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="border-r border-slate-200 pr-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Período / Vigência
                </span>
                <span className="text-xs font-black text-slate-900">
                  {activeTrimInfo.name} ({activeTrimInfo.status})
                </span>
              </div>
              <div className="border-r border-slate-200 pr-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                  Vigência
                </span>
                <span className="text-xs font-black text-emerald-950">
                  {activeTrimInfo.startDate} a {activeTrimInfo.endDate}
                </span>
              </div>
              <div className="border-r border-slate-200 pr-3 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block">
                  Aulas Programadas
                </span>
                <span className="text-xs font-black text-amber-950">
                  {currentTrimLessonStats.scheduled} Aulas
                </span>
              </div>
              <div className="border-r border-slate-200 pr-3 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 block">
                  Aulas Dadas
                </span>
                <span className="text-xs font-black text-emerald-950">
                  {currentTrimLessonStats.taught} Aulas
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Conselho (COC)
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  {activeTrimInfo.coc} ({currentTrimLessonStats.officialSchoolDays} dias letivos)
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Quick Class Switcher Strip grouped by School */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 overflow-x-auto">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 pl-1 shrink-0 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5" />
          <span>Trocar Turma:</span>
        </span>
        <div className="flex items-center gap-2.5">
          {SCHOOL_GROUPS.map(grp => {
            const grpClasses = allClassList.filter(c => grp.matcher(c.school));
            if (grpClasses.length === 0) return null;
            return (
              <div key={grp.id} className="flex items-center gap-1 pl-2.5 border-l border-slate-200 first:border-l-0 first:pl-0">
                <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 mr-0.5">
                  {grp.shortName}:
                </span>
                <div className="flex items-center gap-1">
                  {grpClasses.map(cls => {
                    const isCurrent = cls.id === selectedClassId;
                    return (
                      <button
                        key={cls.id}
                        onClick={() => setSelectedClassId(cls.id)}
                        className={`px-2.5 py-1 rounded-lg font-black text-xs uppercase tracking-tight transition-all shrink-0 ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cls.name}
                      </button>
                    );
                  })}
                </div>
              </div>
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
      {isAttendanceOnlyClass(currentClass) ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Alunos Matriculados</span>
            <span className="text-xl font-black text-slate-800">{currentClass?.students?.length || 0} alunos</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Lançamento SEEDUC: Faltas</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 block mb-0.5">1º Trimestre (05/02 a 18/05)</span>
            <span className="text-xl font-black text-rose-900">{getClassAttendanceStats(currentClass, "1").totalAbsences} faltas</span>
            <span className="text-[9px] text-rose-600 block mt-0.5">Freq. Média: {getClassAttendanceStats(currentClass, "1").avgFreq}%</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-0.5">2º Trimestre (19/05 a 04/09)</span>
            <span className="text-xl font-black text-amber-900">{getClassAttendanceStats(currentClass, "2").totalAbsences} faltas</span>
            <span className="text-[9px] text-amber-600 block mt-0.5">Freq. Média: {getClassAttendanceStats(currentClass, "2").avgFreq}%</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block mb-0.5">3º Trimestre (08/09 a 22/12)</span>
            <span className="text-xl font-black text-emerald-900">{getClassAttendanceStats(currentClass, "3").totalAbsences} faltas</span>
            <span className="text-[9px] text-emerald-600 block mt-0.5">Freq. Média: {getClassAttendanceStats(currentClass, "3").avgFreq}%</span>
          </div>
        </div>
      ) : (
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
      )}

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
              <div className="text-[9px] font-medium opacity-80">3 Trimestres • {isAttendanceOnlyClass(currentClass) ? 'Faltas e Frequência' : 'Meta 18 Pontos'}</div>
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

            {activeTab === 'trimester' && !isAttendanceOnlyClass(currentClass) && (
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
          isAttendanceOnlyClass(currentClass) ? (
            /* SPECIAL ATTENDANCE-ONLY VIEW (CIEP 476, CIEP 229, IGNACIO BEZERRA) */
            <div className="space-y-4">
              {/* Informative Notice Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-emerald-50 p-4 rounded-2xl border border-amber-200 text-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-600 text-white rounded-xl shrink-0 shadow-sm">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-amber-950">
                      Unidade Escolar: {currentClass?.school} • Apuração de Faltas SEEDUC
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                      Você <strong>não precisa lançar notas no trimestre</strong> para esta turma. As faltas de todos os trimestres são computadas automaticamente para você gerar o arquivo e lançar no <strong>DocenteOnline</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    onClick={handleExportDocenteOnlineCsv}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                    title="Baixar arquivo Excel / .csv formatado para o DocenteOnline"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Baixar Arquivo SEEDUC (.csv)</span>
                  </button>
                  <button
                    onClick={handleCopyDocenteOnlineText}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                    title="Copiar lista de faltas tabulada para colar no DocenteOnline"
                  >
                    {copiedDocenteText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedDocenteText ? 'Faltas Copiadas!' : 'Copiar Faltas'}</span>
                  </button>
                  <button
                    onClick={() => setIsDocenteOnlineModalOpen(true)}
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Relatório Paisagem (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Attendance-Only Table */}
              <div className="overflow-x-auto bg-[#fdfaf6] p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
                <table className="w-full text-left border-collapse min-w-[850px] text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-slate-700 uppercase tracking-wider text-[11px] font-black">
                      <th className="py-3 px-2 text-center w-12">Nº</th>
                      <th className="py-3 px-3 min-w-[220px]">Nome Completo do Aluno</th>
                      <th className="py-3 px-2 text-center bg-rose-50/50 border-x border-slate-200">
                        <div>Faltas no {selectedTrimestre}º Trim.</div>
                        <div className="text-[9px] font-bold text-rose-700">Trimestre Selecionado</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-sky-50/50 border-r border-slate-200">
                        <div>Presenças {selectedTrimestre}º Trim.</div>
                        <div className="text-[9px] font-bold text-sky-700">Aulas Ministradas</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-emerald-50/50 border-r border-slate-200">
                        <div>% Freq. Trimestral</div>
                        <div className="text-[9px] font-bold text-emerald-700">Mínimo 75%</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-purple-50/50 border-r border-slate-200">
                        <div>Total Faltas no Ano</div>
                        <div className="text-[9px] font-bold text-purple-700">Soma dos 3 Trimestres</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-indigo-50/50 border-r border-slate-200">
                        <div>% Freq. Anual</div>
                        <div className="text-[9px] font-bold text-indigo-700">Acumulada</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-slate-100 font-black text-slate-900">
                        <div>Situação SEEDUC</div>
                        <div className="text-[9px] font-bold text-slate-600">Frequência</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredStudents.length > 0 ? filteredStudents.map((student, idx) => {
                      const allAtt = getStudentAllTrimestersAttendance(student);
                      const currentTrimAtt = allAtt[`t${selectedTrimestre}` as 't1' | 't2' | 't3'] || allAtt.t1;
                      const isBelowFreq = currentTrimAtt.trimesterPercent < 75;
                      const isCancelled = student.status === 'cancelado' || student.status === 'transferido';

                      return (
                        <tr key={student.id} className={`hover:bg-slate-100/80 transition-colors ${isCancelled ? 'opacity-50 line-through' : ''}`}>
                          <td className="py-3 px-2 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3 px-3 font-extrabold text-slate-900">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span>{student.name}</span>
                              {isCancelled && (
                                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-black rounded-md">
                                  {student.status?.toUpperCase()}
                                </span>
                              )}
                            </div>
                            {isBelowFreq && !isCancelled && (
                              <span className="text-[9px] font-black text-rose-600 flex items-center gap-1 mt-0.5">
                                <AlertTriangle className="w-3 h-3 shrink-0" />
                                Infrequente no {selectedTrimestre}º Trimestre (&lt;75%)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center bg-rose-50/30 border-x border-slate-200 font-black text-rose-700 text-sm">
                            {isCancelled ? '—' : currentTrimAtt.trimesterAbsences}
                          </td>
                          <td className="py-3 px-2 text-center bg-sky-50/30 border-r border-slate-200 font-black text-sky-800 text-sm">
                            {isCancelled ? '—' : currentTrimAtt.trimesterPresents}
                          </td>
                          <td className="py-3 px-2 text-center bg-emerald-50/30 border-r border-slate-200">
                            <span className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                              currentTrimAtt.trimesterPercent >= 75 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}>
                              {isCancelled ? '—' : `${currentTrimAtt.trimesterPercent}%`}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center bg-purple-50/30 border-r border-slate-200 font-black text-purple-900 text-sm">
                            {isCancelled ? '—' : `${allAtt.annualAbsences} faltas`}
                          </td>
                          <td className="py-3 px-2 text-center bg-indigo-50/30 border-r border-slate-200 font-black">
                            <span className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                              allAtt.annualPercent >= 75 
                                ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' 
                                : 'bg-rose-100 text-rose-900 border border-rose-200'
                            }`}>
                              {isCancelled ? '—' : `${allAtt.annualPercent}%`}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider inline-block ${
                              isCancelled 
                                ? 'bg-slate-100 text-slate-600'
                                : allAtt.annualPercent >= 75
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-900 border border-rose-300'
                            }`}>
                              {isCancelled ? 'Desligado' : allAtt.annualPercent >= 75 ? 'Frequência Regular ✓' : 'Abaixo de 75% ⚠'}
                            </span>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 font-bold uppercase text-xs">
                          Nenhum aluno encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Bottom Actions for Attendance-Only View */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 flex-wrap">
                <div className="text-xs text-slate-500 font-medium">
                  {currentClass?.school} • Apuração automática de faltas para lançamento no DocenteOnline SEEDUC-RJ
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportDocenteOnlineCsv}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Baixar Arquivo SEEDUC (.csv)</span>
                  </button>
                  <button
                    onClick={() => setIsDocenteOnlineModalOpen(true)}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>DocenteOnline (Paisagem)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
        )
      )}

        {/* TAB 2: ANNUAL OVERVIEW TABLE (3 TRIMESTRES) */}
        {activeTab === 'annual' && (
          <div className="space-y-4">
            {/* Annual Lessons Statistics Banner */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Balanço Anual de Aulas: Programadas x Dadas (SEEDUC-RJ 2026)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Resolução SEEDUC Nº 6392/2025 • Total de 206 dias letivos • Apuração oficial por trimestre
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-950 font-black text-xs rounded-xl border border-emerald-300">
                    Total Anual: {allTrimestersLessonStats.annualScheduled} Aulas Programadas • {allTrimestersLessonStats.annualTaught} Dadas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1º Trimestre */}
                <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-rose-950">1º Trimestre</span>
                    <span className="text-[10px] font-bold text-rose-700">05/02 a 18/05</span>
                  </div>
                  <div className="text-[11px] space-y-0.5 text-slate-700">
                    <div>Aulas Programadas: <strong className="text-rose-950 font-black">{allTrimestersLessonStats.t1.scheduled}</strong></div>
                    <div>Aulas Dadas: <strong className="text-emerald-900 font-black">{allTrimestersLessonStats.t1.taught}</strong></div>
                    <div className="text-[10px] text-slate-500">Dias letivos: {allTrimestersLessonStats.t1.officialSchoolDays} dias</div>
                  </div>
                </div>

                {/* 2º Trimestre */}
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-amber-950">2º Trimestre</span>
                    <span className="text-[10px] font-bold text-amber-700">19/05 a 04/09</span>
                  </div>
                  <div className="text-[11px] space-y-0.5 text-slate-700">
                    <div>Aulas Programadas: <strong className="text-amber-950 font-black">{allTrimestersLessonStats.t2.scheduled}</strong></div>
                    <div>Aulas Dadas: <strong className="text-emerald-900 font-black">{allTrimestersLessonStats.t2.taught}</strong></div>
                    <div className="text-[10px] text-slate-500">Dias letivos: {allTrimestersLessonStats.t2.officialSchoolDays} dias</div>
                  </div>
                </div>

                {/* 3º Trimestre */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-emerald-950">3º Trimestre</span>
                    <span className="text-[10px] font-bold text-emerald-700">08/09 a 22/12</span>
                  </div>
                  <div className="text-[11px] space-y-0.5 text-slate-700">
                    <div>Aulas Programadas: <strong className="text-emerald-950 font-black">{allTrimestersLessonStats.t3.scheduled}</strong></div>
                    <div>Aulas Dadas: <strong className="text-emerald-900 font-black">{allTrimestersLessonStats.t3.taught}</strong></div>
                    <div className="text-[10px] text-slate-500">Dias letivos: {allTrimestersLessonStats.t3.officialSchoolDays} dias</div>
                  </div>
                </div>

                {/* Consolidado Anual */}
                <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-purple-950">Ano Letivo 2026</span>
                    <span className="text-[10px] font-bold text-purple-700">206 Dias Letivos</span>
                  </div>
                  <div className="text-[11px] space-y-0.5 text-slate-700">
                    <div>Total Programadas: <strong className="text-purple-950 font-black">{allTrimestersLessonStats.annualScheduled} aulas</strong></div>
                    <div>Total Ministradas: <strong className="text-emerald-900 font-black">{allTrimestersLessonStats.annualTaught} aulas</strong></div>
                    <div className="text-[10px] text-emerald-700 font-bold">100% Carga Horária Cumprida ✓</div>
                  </div>
                </div>
              </div>
            </div>

            {isAttendanceOnlyClass(currentClass) ? (
            /* ATTENDANCE-ONLY ANNUAL OVERVIEW */
            <div className="space-y-4">
              <div className="overflow-x-auto bg-[#fdfaf6] p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
                <table className="w-full text-left border-collapse min-w-[950px] text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-slate-700 uppercase tracking-wider text-[11px] font-black">
                      <th className="py-3 px-2 text-center w-12">Nº</th>
                      <th className="py-3 px-3 min-w-[220px]">Nome Completo do Aluno</th>
                      <th className="py-3 px-2 text-center bg-rose-50 border-x border-slate-200">
                        <div>1º Trimestre</div>
                        <div className="text-[9px] font-bold text-rose-700">05/02 a 18/05</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-amber-50 border-r border-slate-200">
                        <div>2º Trimestre</div>
                        <div className="text-[9px] font-bold text-amber-700">19/05 a 04/09</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-emerald-50 border-r border-slate-200">
                        <div>3º Trimestre</div>
                        <div className="text-[9px] font-bold text-emerald-700">08/09 a 22/12</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-purple-100/70 border-r border-slate-200 text-purple-950 font-black">
                        <div>Total de Faltas</div>
                        <div className="text-[9px] font-bold text-purple-800">Ano Letivo</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-indigo-50 border-r border-slate-200">
                        <div>Frequência Anual</div>
                        <div className="text-[9px] font-bold text-indigo-700">Mínimo 75%</div>
                      </th>
                      <th className="py-3 px-2 text-center bg-slate-100 font-black text-slate-900">
                        <div>Situação SEEDUC</div>
                        <div className="text-[9px] font-bold text-slate-600">Assiduidade</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredStudents.map((student, idx) => {
                      const allAtt = getStudentAllTrimestersAttendance(student);
                      const isCancelled = student.status === 'cancelado' || student.status === 'transferido';

                      return (
                        <tr key={student.id} className={`hover:bg-slate-100/80 transition-colors ${isCancelled ? 'opacity-50 line-through' : ''}`}>
                          <td className="py-3 px-2 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3 px-3 font-extrabold text-slate-900">
                            <span>{student.name}</span>
                            {isCancelled && (
                              <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-black rounded-md">
                                {student.status?.toUpperCase()}
                              </span>
                            )}
                          </td>
                          
                          {/* T1 */}
                          <td className="py-3 px-2 text-center bg-rose-50/30 border-x border-slate-200 font-black">
                            <div className="text-rose-800 text-sm">{isCancelled ? '—' : `${allAtt.t1.trimesterAbsences} faltas`}</div>
                            <div className="text-[9px] text-slate-500">{isCancelled ? '—' : `${allAtt.t1.trimesterPercent}% freq.`}</div>
                          </td>

                          {/* T2 */}
                          <td className="py-3 px-2 text-center bg-amber-50/30 border-r border-slate-200 font-black">
                            <div className="text-amber-800 text-sm">{isCancelled ? '—' : `${allAtt.t2.trimesterAbsences} faltas`}</div>
                            <div className="text-[9px] text-slate-500">{isCancelled ? '—' : `${allAtt.t2.trimesterPercent}% freq.`}</div>
                          </td>

                          {/* T3 */}
                          <td className="py-3 px-2 text-center bg-emerald-50/30 border-r border-slate-200 font-black">
                            <div className="text-emerald-800 text-sm">{isCancelled ? '—' : `${allAtt.t3.trimesterAbsences} faltas`}</div>
                            <div className="text-[9px] text-slate-500">{isCancelled ? '—' : `${allAtt.t3.trimesterPercent}% freq.`}</div>
                          </td>

                          {/* Annual Absences */}
                          <td className="py-3 px-2 text-center bg-purple-50/60 border-r border-slate-200 font-black">
                            <div className="text-base text-purple-950">
                              {isCancelled ? '—' : `${allAtt.annualAbsences} faltas`}
                            </div>
                            <span className="text-[9px] text-slate-500 font-medium">acumuladas</span>
                          </td>

                          {/* Annual % */}
                          <td className="py-3 px-2 text-center bg-indigo-50/30 border-r border-slate-200 font-black">
                            <span className={`px-2.5 py-1 rounded-full font-black text-xs ${
                              allAtt.annualPercent >= 75 
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                                : 'bg-rose-100 text-rose-900 border border-rose-200'
                            }`}>
                              {isCancelled ? '—' : `${allAtt.annualPercent}%`}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider inline-block ${
                              isCancelled 
                                ? 'bg-slate-100 text-slate-600'
                                : allAtt.annualPercent >= 75 
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                                  : 'bg-rose-100 text-rose-900 border border-rose-200'
                            }`}>
                              {isCancelled ? 'Desligado' : allAtt.annualPercent >= 75 ? 'Aprovado por Freq. ✓' : 'Abaixo de 75% ⚠'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
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

              {(() => {
                const trimSchedule = TRIMESTER_SCHEDULE_SEEDUC[selectedTrimestre] || TRIMESTER_SCHEDULE_SEEDUC["2"];
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-bold">
                    <div>Turma: <span className="text-slate-950 font-extrabold">{currentClass?.name}</span></div>
                    <div>Prof. Regente: <span className="text-slate-950 font-extrabold">{PROFESSOR_REGENTE_NAME}</span></div>
                    <div>Período: <span className="text-slate-950 font-extrabold">{selectedTrimestre}º Trimestre</span></div>
                    <div>Vigência: <span className="text-slate-950 font-extrabold">{trimSchedule.startDate} a {trimSchedule.endDate}</span></div>
                    <div>Aulas Programadas: <span className="text-amber-900 font-black">{currentTrimLessonStats.scheduled}</span></div>
                    <div>Aulas Dadas: <span className="text-emerald-900 font-black">{currentTrimLessonStats.taught}</span></div>
                  </div>
                );
              })()}

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

                  {/* Wide Info Board with Complete SEEDUC Metadata */}
                  {(() => {
                    const trimSchedule = TRIMESTER_SCHEDULE_SEEDUC[selectedTrimestre] || TRIMESTER_SCHEDULE_SEEDUC["2"];
                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-300 text-xs font-bold mb-4">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Unidade Escolar</span>
                          <span className="text-slate-900 uppercase truncate font-extrabold block">{currentClass?.school}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Turma / Componente</span>
                          <span className="text-slate-900 uppercase font-extrabold block">{currentClass?.name} — {currentClass?.discipline || 'Educação Física'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Professor Regente</span>
                          <span className="text-emerald-800 uppercase font-extrabold block">{PROFESSOR_REGENTE_NAME}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Período / Vigência</span>
                          <span className="text-slate-900 uppercase font-black block">
                            {selectedTrimestre}º TRIMESTRE ({trimSchedule.startDate} A {trimSchedule.endDate})
                          </span>
                        </div>
                        <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-200 text-center">
                          <span className="text-amber-800 block text-[9px] uppercase tracking-wide font-black">Aulas Programadas</span>
                          <span className="text-amber-950 text-sm font-black block">{currentTrimLessonStats.scheduled} Aulas</span>
                        </div>
                        <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 text-center">
                          <span className="text-emerald-800 block text-[9px] uppercase tracking-wide font-black">Aulas Dadas</span>
                          <span className="text-emerald-950 text-sm font-black block">{currentTrimLessonStats.taught} Aulas</span>
                        </div>
                      </div>
                    );
                  })()}

                  <h1 className="text-center font-black text-base uppercase tracking-widest text-slate-950 mb-4 underline">
                    {isAttendanceOnlyClass(currentClass)
                      ? "Apoio Administrativo: Frequência e Apuração de Faltas para Lançamento SEEDUC"
                      : "Apoio Administrativo: Rendimento e Frequência para Digitação"}
                  </h1>

                  {/* Table: Conditional based on Attendance-Only vs Standard */}
                  {isAttendanceOnlyClass(currentClass) ? (
                    /* Clean Attendance-Only Table (No Grades) */
                    <table className="w-full border-collapse border border-slate-950 text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-950 font-black uppercase tracking-wider text-[10px] border-b border-slate-950">
                          <th className="border border-slate-950 py-2 px-3 text-center w-14">Nº</th>
                          <th className="border border-slate-950 py-2 px-4 text-left">Nome Completo do Aluno</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-32 bg-rose-50/50">Faltas ({selectedTrimestre}º Trim.)</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-32 bg-sky-50/50">Presenças ({selectedTrimestre}º Trim.)</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-28 bg-emerald-50/50">% Freq. Trimestral</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-36 bg-purple-50/50">Total Faltas no Ano</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-28 bg-indigo-50/50">% Freq. Anual</th>
                          <th className="border border-slate-950 py-2 px-3 text-center w-32 bg-slate-100">Situação SEEDUC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-400">
                        {filteredStudents.map((s, idx) => {
                          const allAtt = getStudentAllTrimestersAttendance(s);
                          const currentTrimAtt = allAtt[`t${selectedTrimestre}` as 't1' | 't2' | 't3'] || allAtt.t1;
                          const isCancelled = s.status === 'cancelado' || s.status === 'transferido';

                          return (
                            <tr key={s.id} className={`${isCancelled ? 'bg-slate-50 text-slate-400 line-through' : 'even:bg-slate-50/40'}`}>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-black">{idx + 1}</td>
                              <td className="border border-slate-950 py-1.5 px-4 font-black uppercase">{s.name}</td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-extrabold text-rose-900 bg-rose-50/20 text-sm">
                                {isCancelled ? 'CANCELADO' : `${currentTrimAtt.trimesterAbsences}`}
                              </td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-extrabold text-sky-900 bg-sky-50/20 text-sm">
                                {isCancelled ? '—' : `${currentTrimAtt.trimesterPresents}`}
                              </td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-black text-emerald-950 bg-emerald-50/20 text-xs">
                                {isCancelled ? '—' : `${currentTrimAtt.trimesterPercent}%`}
                              </td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-black text-purple-950 bg-purple-50/20 text-sm">
                                {isCancelled ? '—' : `${allAtt.annualAbsences}`}
                              </td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-black text-indigo-950 bg-indigo-50/20 text-xs">
                                {isCancelled ? '—' : `${allAtt.annualPercent}%`}
                              </td>
                              <td className="border border-slate-950 py-1.5 px-3 text-center font-black text-[10px] uppercase">
                                {isCancelled ? 'Desligado' : allAtt.annualPercent >= 75 ? 'Regular' : 'Infrequente'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    /* Clean 4-Column Table with Grades */
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
                  )}
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold text-center sm:text-left">
                * Dica: Você pode baixar o PDF paisagem, exportar a planilha CSV ou imprimir/salvar direto via navegador.
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={handleCopyDocenteOnlineText}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase rounded-xl transition-all flex items-center gap-1.5"
                  title="Copiar dados tabulados para a área de transferência"
                >
                  {copiedDocenteText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copiedDocenteText ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>

                <button
                  onClick={handleExportDocenteOnlineCsv}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black uppercase rounded-xl transition-all flex items-center gap-1.5"
                  title="Baixar arquivo de planilha compatível com Excel e Google Planilhas"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Planilha (.CSV)</span>
                </button>

                <button
                  onClick={handlePrintDirectDocente}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  title="Abre a caixa de diálogo nativa do navegador para Imprimir ou Salvar como PDF em alta definição"
                >
                  <Printer className="w-4 h-4 text-slate-200" />
                  <span>Imprimir / Salvar PDF</span>
                </button>

                <button
                  onClick={handleExportDocenteOnlinePdf}
                  disabled={isGeneratingDocentePdf}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-xs font-black uppercase rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-wait"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingDocentePdf ? 'Gerando e Baixando...' : 'Baixar PDF Paisagem'}</span>
                </button>

                <button
                  onClick={() => setIsDocenteOnlineModalOpen(false)}
                  className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase rounded-xl transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
