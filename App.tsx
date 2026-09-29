import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { Profile } from './components/Profile';
import { BackgroundSlider } from './components/BackgroundSlider';
import { DashboardView } from './components/DashboardView';
import { StatisticsView } from './components/StatisticsView';
import { ClassesView } from './components/ClassesView';
import { EmentaView } from './components/EmentaView';
import { PlanoDeCursoView } from './components/PlanoDeCursoView';
import { CurriculoEmentaHubView } from './components/CurriculoEmentaHubView';
import { DiarioNotasHubView } from './components/DiarioNotasHubView';
import { PlanosAulasHubView } from './components/PlanosAulasHubView';
import { ScheduleView } from './components/ScheduleView';
import { GalleryView } from './components/GalleryView';
import { DecolonialApp } from './components/DecolonialApp';
import { PlanoAnualPE } from './components/PlanoAnualPE';
import { OcorrenciasView } from './components/OcorrenciasView';
import { ExamRepositoryView } from './components/ExamRepositoryView';
import { SlideViewer } from './components/SlideViewer';
import { CalendarView } from './components/CalendarView';
import { WeatherWidget } from './components/WeatherWidget';
import { BottomNav } from './components/BottomNav';
import { DailyActivityLogView } from './components/DailyActivityLogView';
import { PortalView } from './components/PortalView';
import { ProfessorLoginView } from './components/ProfessorLoginView';
import { AlunosView } from './components/AlunosView';
import { GradesView } from './components/GradesView';
import { AssignmentsView } from './components/AssignmentsView';
import { AssignmentPrintView } from './components/AssignmentPrintView';
import { ViewState, ClassDataMap, ClassData, GalleryData, Assignment } from './types';
import { mockUserProfile, initialClassData, sanitizeAndNormalizeClassData } from './constants';
import { initFirebase, subscribeToClasses, saveClassesToFirestore, deleteClassesBatchFromFirestore, subscribeToGallery, saveGalleryToFirestore } from './services/firebaseService';
import { AiAssistant } from './components/AiAssistant';
import { safeLocalStorage } from './utils/storage';

// --- Global Footer Component ---
const GlobalFooter = () => (
  <footer className="w-full py-6 text-center relative z-50 shrink-0 mt-auto bg-[#fdfaf6]/80 backdrop-blur-md border-t border-slate-300">
    <div className="container mx-auto px-4 flex flex-col items-center gap-1">
        <p className="text-[10px] md:text-xs font-bold text-slate-800">
          Desenvolvido por: André Victor Brito de Andrade • CREF 039443 G/RJ
        </p>
      <p className="text-[10px] md:text-xs font-medium text-slate-600">
        Contato: andrevictorbritodeandrade@gmail.com
      </p>
      <p className="text-[10px] md:text-xs font-medium text-slate-500">
        versão: 1.1
      </p>
    </div>
  </footer>
);

// --- Sync Status Indicator ---
const SyncStatusIndicator = ({ status }: { status: 'synced' | 'saving' | 'error' }) => {
  return null;
};

// Helper to deduplicate student arrays by name (case-insensitive) and by ID, while merging attendance
const deduplicateStudentsByNameAndId = (students: any[]): { deduplicated: any[], wasChanged: boolean } => {
  if (!students || !Array.isArray(students)) return { deduplicated: students, wasChanged: false };
  const seenNames = new Map<string, any>();
  const seenIds = new Map<string, any>();
  const deduplicated: any[] = [];
  let wasChanged = false;

  students.forEach((s: any) => {
    if (!s || !s.name) return;
    const cleanName = s.name.trim().toLowerCase();
    const cleanId = String(s.id);

    const matchByName = seenNames.get(cleanName);
    const matchById = seenIds.get(cleanId);
    const existing = matchByName || matchById;

    if (existing) {
      wasChanged = true;
      // Merge attendance to the existing student
      existing.attendance = {
        ...(existing.attendance || {}),
        ...(s.attendance || {})
      };
    } else {
      const copy = { ...s, attendance: { ...(s.attendance || {}) } };
      deduplicated.push(copy);
      seenNames.set(cleanName, copy);
      seenIds.set(cleanId, copy);
    }
  });

  if (deduplicated.length !== students.length) {
    wasChanged = true;
  }
  return { deduplicated, wasChanged };
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'portal' | 'alunos' | 'professor_login' | 'professor'>(() => {
    const saved = safeLocalStorage.getItem('app_accessLevel');
    if (saved === 'alunos') {
      return saved;
    }
    // Default to professor directly
    return 'professor';
  });
  const ALL_VALID_VIEWS: ViewState[] = [
    'home', 'statistics', 'classes', 'profile', 'ementa', 'plano', 
    'lesson-content', 'schedule', 'gallery', 'assignments', 'biblioteca', 
    'register-activities', 'decolonial', 'calendar', 'daily-activities', 'alunos-view', 'assignment-print'
  ];

  const [currentView, setView] = useState<ViewState>(() => {
    let hash = '';
    try {
      hash = window.location.hash.replace('#', '');
    } catch (e) {
      console.warn("Could not read location.hash:", e);
    }
    if (hash && ALL_VALID_VIEWS.includes(hash as ViewState)) {
      return hash as ViewState;
    }
    const saved = safeLocalStorage.getItem('app_currentView') as ViewState;
    if (saved && ALL_VALID_VIEWS.includes(saved)) {
      return saved;
    }
    return 'home';
  });
  
  useEffect(() => {
    safeLocalStorage.setItem('app_accessLevel', accessLevel);
  }, [accessLevel]);

  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        if (hash && ALL_VALID_VIEWS.includes(hash as ViewState)) {
          setView(hash as ViewState);
        }
      } catch (e) {
        console.warn("hashchange handler error:", e);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Shared State
  const [classData, setClassData] = useState<ClassDataMap>(() => {
    const stored = safeLocalStorage.getItem('app_classData');
    let base = { ...initialClassData };
    if (stored) {
      try {
        base = JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse stored classData:", e);
      }
    }
    
    // Ensure all initial daily activities and students are merged
    Object.keys(initialClassData).forEach(id => {
      if (!base[id]) {
        base[id] = { ...initialClassData[id] };
      } else {
        // For Cordelia (801, 802, 803), Ignacio (2001, 2002), CIEP 229 (EJA), CIEP 369 (AP 201) and CIEP 476 (1001, 1007), enforce the exact authoritative roster from initialClassData
        if (id === '801' || id === '802' || id === '803' || id === 'CE_IGNACIO_2001' || id === 'CE_IGNACIO_2002' || id === 'CIEP229_EJA' || id === 'CIEP369_AP201' || id === 'CIEP476_1007' || id === 'CIEP476_1001') {
          const initList = initialClassData[id].students || [];
          const currentStuds = base[id].students || [];
          base[id].students = initList.map((initS: any) => {
            const existing = currentStuds.find((s: any) => String(s.id) === String(initS.id) || (s.name && s.name.trim().toLowerCase() === initS.name.trim().toLowerCase()));
            const mergedTrim = { ...(initS.trimestreGrades || {}) };
            if (existing?.trimestreGrades) {
              Object.keys(existing.trimestreGrades).forEach((k: string) => {
                mergedTrim[k] = { ...(mergedTrim[k] || {}), ...existing.trimestreGrades[k] };
              });
            }
            return {
              ...initS,
              attendance: { ...initS.attendance, ...(existing?.attendance || {}) },
              trimestreGrades: mergedTrim
            };
          });
        } else if (initialClassData[id].students && initialClassData[id].students.length > 0) {
          // Merge missing students or update if empty
          if (!base[id].students || base[id].students.length === 0) {
            base[id].students = [...initialClassData[id].students];
          } else {
            const existingStudentIds = new Set(base[id].students.map((s: any) => String(s.id)));
            initialClassData[id].students.forEach((stud: any) => {
              if (!existingStudentIds.has(String(stud.id))) {
                base[id].students.push(stud);
              }
            });

            // Merge attendance records and trimester grades from initialClassData to base students
            base[id].students.forEach((baseStud: any) => {
              const initStud = initialClassData[id].students.find((s: any) => String(s.id) === String(baseStud.id));
              if (initStud) {
                if (initStud.attendance) {
                  baseStud.attendance = {
                    ...baseStud.attendance,
                    ...initStud.attendance
                  };
                }
                if (initStud.trimestreGrades) {
                  const mergedTrim: any = { ...initStud.trimestreGrades, ...(baseStud.trimestreGrades || {}) };
                  Object.keys(initStud.trimestreGrades).forEach((tKey: string) => {
                    mergedTrim[tKey] = {
                      ...initStud.trimestreGrades[tKey],
                      ...(baseStud.trimestreGrades?.[tKey] || {})
                    };
                  });
                  baseStud.trimestreGrades = mergedTrim;
                }
              }
            });
          }
        }

        // Ensure enrolledTrimesters is defaulted for all students
        if (base[id].students && base[id].students.length > 0) {
          base[id].students.forEach((s: any) => {
            if (!s.enrolledTrimesters || !Array.isArray(s.enrolledTrimesters) || s.enrolledTrimesters.length === 0) {
              const initStud = initialClassData[id]?.students?.find((item: any) => String(item.id) === String(s.id));
              s.enrolledTrimesters = initStud?.enrolledTrimesters || [1, 2, 3];
            }
          });
        }

        if (initialClassData[id].dailyActivities && initialClassData[id].dailyActivities!.length > 0) {
          if (!base[id].dailyActivities) {
            base[id].dailyActivities = [];
          }
          const existingIds = new Set(base[id].dailyActivities!.map((a: any) => a.id));
          initialClassData[id].dailyActivities!.forEach((act: any) => {
            if (!existingIds.has(act.id)) {
              base[id].dailyActivities!.push(act);
            } else {
              const existingAct = base[id].dailyActivities!.find((a: any) => a.id === act.id);
              if (existingAct && existingAct.actualActivity !== act.actualActivity && act.actualActivity.includes("Trabalho do 2º Trimestre")) {
                existingAct.actualActivity = act.actualActivity;
              }
            }
          });
        }

        if (initialClassData[id].assignments && initialClassData[id].assignments!.length > 0) {
          if (!base[id].assignments) {
            base[id].assignments = [];
          }
          const existingAssignIds = new Set(base[id].assignments!.map((a: any) => a.id));
          initialClassData[id].assignments!.forEach((assign: any) => {
            if (!existingAssignIds.has(assign.id)) {
              base[id].assignments!.push(assign);
            }
          });
        }
      }
    });

    const { sanitized, changed } = sanitizeAndNormalizeClassData(base);
    if (changed) {
      safeLocalStorage.setItem('app_classData', JSON.stringify(sanitized));
    }
    return sanitized;
  });
  const [galleryData, setGalleryData] = useState<GalleryData>(() => {
    const stored = safeLocalStorage.getItem('app_galleryData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse stored galleryData:", e);
      }
    }
    return { images: [] };
  });

  // Persistence Refs
  const isRemoteClassUpdate = useRef(false);
  const hasLoadedClasses = useRef(false);
  const isRemoteGalleryUpdate = useRef(false);
  const hasLoadedGallery = useRef(false);

  // Sync Status State
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'error'>('synced');
  const [isInitializing, setIsInitializing] = useState(false);

  // Helper to save classes explicitly with debounce-like behavior for rapid updates
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSaveClasses = async (newData: ClassDataMap) => {
    setSyncStatus('saving');
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveClassesToFirestore(newData);
        setSyncStatus('synced');
      } catch (error) {
        console.error("Erro ao salvar:", error);
        setSyncStatus('error');
      }
    }, 1500); // 1.5s delay to batch rapid attendance marking
  };

  // Helper to save gallery explicitly
  const handleSaveGallery = async (newData: GalleryData) => {
    setSyncStatus('saving');
    try {
      await saveGalleryToFirestore(newData);
      setSyncStatus('synced');
    } catch (error) {
      console.error("Erro ao salvar galeria:", error);
      setSyncStatus('error');
    }
  };

  useEffect(() => {
    safeLocalStorage.setItem('app_classData', JSON.stringify(classData));
    if (hasLoadedClasses.current) {
      if (isRemoteClassUpdate.current) {
        isRemoteClassUpdate.current = false;
      } else {
        handleSaveClasses(classData);
      }
    }
  }, [classData]);

  useEffect(() => {
    safeLocalStorage.setItem('app_galleryData', JSON.stringify(galleryData));
    if (hasLoadedGallery.current) {
      if (isRemoteGalleryUpdate.current) {
        isRemoteGalleryUpdate.current = false;
      } else {
        handleSaveGallery(galleryData);
      }
    }
  }, [galleryData]);

  // State for Navigation within Classes
  const [selectedGrade, setSelectedGrade] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('grade') || safeLocalStorage.getItem('app_selectedGrade');
    } catch (e) {
      return safeLocalStorage.getItem('app_selectedGrade');
    }
  });
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('classId') || safeLocalStorage.getItem('app_selectedClassId');
    } catch (e) {
      return safeLocalStorage.getItem('app_selectedClassId');
    }
  });
  const [selectedAssignment, setSelectedAssignment] = useState<{ assignment: Assignment, classId: string } | null>(null);

  useEffect(() => {
    safeLocalStorage.setItem('app_currentView', currentView);
    try {
      window.location.hash = currentView;
    } catch (e) {
      console.warn("Setting location.hash failed:", e);
    }
    // Expose setView to window for external access (like from ClassesView)
    (window as any).setView = setView;
  }, [currentView]);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (selectedGrade) {
        safeLocalStorage.setItem('app_selectedGrade', selectedGrade);
        url.searchParams.set('grade', selectedGrade);
      } else {
        safeLocalStorage.removeItem('app_selectedGrade');
        url.searchParams.delete('grade');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn("URL manipulation failed:", e);
    }
  }, [selectedGrade]);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (selectedClassId) {
        safeLocalStorage.setItem('app_selectedClassId', selectedClassId);
        url.searchParams.set('classId', selectedClassId);
      } else {
        safeLocalStorage.removeItem('app_selectedClassId');
        url.searchParams.delete('classId');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn("URL manipulation failed:", e);
    }
  }, [selectedClassId]);

  useEffect(() => {
    // Safety timeout to ensure the app loads even if Firestore is slow or offline
    const safetyTimeout = setTimeout(() => {
      setIsInitializing(false);
      console.warn("Safety load triggered: Firestore sync taking longer than expected. Proceeding with cache / local fallback data.");
    }, 2000);

    // Inicializa Firebase ao carregar o app
    const success = initFirebase();
    if (success) {
      // Subscribe to classes
      const unsubClasses = subscribeToClasses((firebaseClasses) => {
        clearTimeout(safetyTimeout);
        setIsInitializing(false);
        if (Object.keys(firebaseClasses).length > 0) {
          isRemoteClassUpdate.current = true;
          
          let migratedClasses = { ...firebaseClasses };
          let needsUpdateRemote = false;

          // Merge local initial structure with remote data to ensure all classes exist
          Object.keys(initialClassData).forEach(id => {
            if (!migratedClasses[id]) {
              migratedClasses[id] = initialClassData[id];
              needsUpdateRemote = true;
            } else {
              // Ensure critical fields (days, schedule) are up to date if missing
              if (!migratedClasses[id].days || migratedClasses[id].days.length === 0) {
                 migratedClasses[id].days = initialClassData[id].days;
                 needsUpdateRemote = true;
              }
              if (!migratedClasses[id].schedule) {
                 migratedClasses[id].schedule = initialClassData[id].schedule;
                 needsUpdateRemote = true;
              }
              if (!migratedClasses[id].school) {
                 migratedClasses[id].school = initialClassData[id].school;
                 needsUpdateRemote = true;
              }
              // Merge missing students and merge attendance from initialClassData students to base
              if (initialClassData[id].students && initialClassData[id].students.length > 0) {
                if (!migratedClasses[id].students || migratedClasses[id].students.length === 0) {
                  migratedClasses[id].students = [...initialClassData[id].students];
                  needsUpdateRemote = true;
                } else {
                  const existingStudentIds = new Set(migratedClasses[id].students.map((s: any) => String(s.id)));
                  initialClassData[id].students.forEach((stud: any) => {
                    if (!existingStudentIds.has(String(stud.id))) {
                      migratedClasses[id].students.push(stud);
                      needsUpdateRemote = true;
                    }
                  });

                  migratedClasses[id].students.forEach((baseStud: any) => {
                    const initStud = initialClassData[id].students.find((s: any) => String(s.id) === String(baseStud.id));
                    if (initStud && initStud.attendance) {
                      let changed = false;
                      if (!baseStud.attendance) {
                        baseStud.attendance = {};
                        changed = true;
                      }
                      if (id === '801' || id === '803') {
                        Object.keys(baseStud.attendance).forEach(k => {
                          if (k.includes(' - 1º T') || k.includes(' - 2º T')) {
                            delete baseStud.attendance[k];
                            changed = true;
                          }
                        });
                      }
                      if (id === '802' || id === '803') {
                        baseStud.attendance = { ...initStud.attendance };
                        changed = true;
                      } else {
                        Object.keys(initStud.attendance).forEach(date => {
                          if (baseStud.attendance[date] !== initStud.attendance[date]) {
                            baseStud.attendance[date] = initStud.attendance[date];
                            changed = true;
                          }
                        });
                      }
                      if (initStud.trimestreGrades) {
                        if (!baseStud.trimestreGrades) {
                          baseStud.trimestreGrades = {};
                          changed = true;
                        }
                        Object.keys(initStud.trimestreGrades).forEach(tKey => {
                          if (!baseStud.trimestreGrades[tKey] || id === '801' || id === '802' || id === '803') {
                            baseStud.trimestreGrades[tKey] = {
                              ...(baseStud.trimestreGrades[tKey] || {}),
                              ...initStud.trimestreGrades[tKey]
                            };
                            changed = true;
                          }
                        });
                      }
                      if (changed) {
                        needsUpdateRemote = true;
                      }
                    }
                  });
                }
              }
              // Ensure default daily activities (like for Cordelia Paiva classes) are merged in
              if (initialClassData[id].dailyActivities && initialClassData[id].dailyActivities!.length > 0) {
                if (!migratedClasses[id].dailyActivities) {
                  migratedClasses[id].dailyActivities = [];
                }
                const existingIds = new Set(migratedClasses[id].dailyActivities!.map(a => a.id));
                initialClassData[id].dailyActivities!.forEach(act => {
                  if (!existingIds.has(act.id)) {
                    migratedClasses[id].dailyActivities!.push(act);
                    needsUpdateRemote = true;
                  } else {
                    const existingAct = migratedClasses[id].dailyActivities!.find(a => a.id === act.id);
                    if (existingAct && existingAct.actualActivity !== act.actualActivity && act.actualActivity.includes("Trabalho do 2º Trimestre")) {
                      existingAct.actualActivity = act.actualActivity;
                      needsUpdateRemote = true;
                    }
                  }
                });
              }

              // Ensure default assignments are merged in
              if (initialClassData[id].assignments && initialClassData[id].assignments!.length > 0) {
                if (!migratedClasses[id].assignments) {
                  migratedClasses[id].assignments = [];
                }
                const existingAssignIds = new Set(migratedClasses[id].assignments!.map(a => a.id));
                initialClassData[id].assignments!.forEach(assign => {
                  if (!existingAssignIds.has(assign.id)) {
                    migratedClasses[id].assignments!.push(assign);
                    needsUpdateRemote = true;
                  }
                });
              }
            }
          });

          // Deduplicate students for all loaded classes to resolve any duplicates (by ID or Name)
          Object.keys(migratedClasses).forEach(id => {
            if (migratedClasses[id] && migratedClasses[id].students) {
              const { deduplicated, wasChanged } = deduplicateStudentsByNameAndId(migratedClasses[id].students);
              if (wasChanged) {
                migratedClasses[id].students = deduplicated;
                needsUpdateRemote = true;
              }
            }
          });

            // Merge any missing initial class definitions (Ignacio and CIEP 229)
            Object.keys(initialClassData).forEach(id => {
              if (!migratedClasses[id]) {
                migratedClasses[id] = { ...initialClassData[id] };
                needsUpdateRemote = true;
              }
            });

             // Ensure Turma 803 contains all 30 students with their complete 2º Trimestre grades and attendance records
            if (migratedClasses["803"]) {
              const initStudents803 = initialClassData["803"]?.students || [];
              migratedClasses["803"].students = initStudents803.map((s: any) => ({ ...s }));
              needsUpdateRemote = true;
            }

            // Clean up Turma 802 to contain the correct 28 students with their presence/absence records (18/05, 25/05, and 01/06 - double periods), ensuring no duplicates and added Kauã
            if (migratedClasses["802"]) {
              const studs802 = migratedClasses["802"].students || [];
              const init802Students = initialClassData["802"]?.students || [];

              const hasAttendanceMismatch802 = studs802.length < 28 || studs802.some((s: any) => {
                const initS = init802Students.find((c: any) => c.id === s.id);
                if (!initS) return false;
                return !s.attendance || !s.attendance["08/06 - 1º T"];
              });

              if (hasAttendanceMismatch802 || studs802.length < init802Students.length) {
                migratedClasses["802"].students = init802Students.map((initS: any) => {
                  const existing = studs802.find((s: any) => s.id === initS.id || s.name === initS.name);
                  const mergedTrim: any = {};
                  if (initS.trimestreGrades) {
                    Object.keys(initS.trimestreGrades).forEach((tKey) => {
                      mergedTrim[tKey] = { ...initS.trimestreGrades[tKey] };
                    });
                  }
                  if (existing?.trimestreGrades) {
                    Object.keys(existing.trimestreGrades).forEach((tKey) => {
                      mergedTrim[tKey] = {
                        ...(mergedTrim[tKey] || {}),
                        ...existing.trimestreGrades[tKey]
                      };
                    });
                  }
                  return {
                    ...initS,
                    attendance: { ...initS.attendance, ...(existing?.attendance || {}) },
                    trimestreGrades: mergedTrim
                  };
                });
                needsUpdateRemote = true;
              }
            }

            // Ensure Turma 801 contains all 32 students with their complete 2º Trimestre grades, attendance records and no duplicates
            if (migratedClasses["801"]) {
              const initStudents801 = initialClassData["801"]?.students || [];
              migratedClasses["801"].students = initStudents801.map((s: any) => ({ ...s }));
              
              if (initialClassData["801"]?.dailyActivities) {
                migratedClasses["801"].dailyActivities = initialClassData["801"].dailyActivities.map((a: any) => ({ ...a }));
              }
              if (initialClassData["801"]?.assignments) {
                migratedClasses["801"].assignments = initialClassData["801"].assignments.map((a: any) => ({ ...a }));
              }
              needsUpdateRemote = true;
            }

            // Ensure all initial classes and student rosters are preserved
            Object.keys(initialClassData).forEach(id => {
              if (id === '801' || id === '802' || id === '803') {
                return;
              }
              if (!migratedClasses[id]) {
                migratedClasses[id] = { ...initialClassData[id] };
                needsUpdateRemote = true;
              } else {
                // If remote class has missing students compared to initialClassData, merge students
                if (initialClassData[id].students && initialClassData[id].students.length > 0) {
                  if (!migratedClasses[id].students || migratedClasses[id].students.length === 0) {
                    migratedClasses[id].students = [...initialClassData[id].students];
                    needsUpdateRemote = true;
                  } else {
                    const existingIds = new Set(migratedClasses[id].students.map((s: any) => String(s.id)));
                    initialClassData[id].students.forEach((stud: any) => {
                      if (!existingIds.has(String(stud.id))) {
                        migratedClasses[id].students.push({ ...stud });
                        needsUpdateRemote = true;
                      }
                    });
                  }
                }
              }

              // Ensure enrolledTrimesters, attendance, and trimesterGrades are synced on all students
              if (migratedClasses[id].students) {
                migratedClasses[id].students.forEach((s: any) => {
                  const initStud = initialClassData[id]?.students?.find((item: any) => String(item.id) === String(s.id));
                  if (!s.enrolledTrimesters || !Array.isArray(s.enrolledTrimesters) || s.enrolledTrimesters.length === 0) {
                    s.enrolledTrimesters = initStud?.enrolledTrimesters || [1, 2, 3];
                  }
                  if (initStud?.attendance) {
                    s.attendance = {
                      ...s.attendance,
                      ...initStud.attendance
                    };
                  }
                  if (initStud?.trimestreGrades) {
                    const mergedTrim: any = { ...initStud.trimestreGrades, ...(s.trimestreGrades || {}) };
                    Object.keys(initStud.trimestreGrades).forEach((tKey: string) => {
                      mergedTrim[tKey] = {
                        ...initStud.trimestreGrades[tKey],
                        ...(s.trimestreGrades?.[tKey] || {})
                      };
                    });
                    s.trimestreGrades = mergedTrim;
                  }
                });
              }
            });
          
            // Standardize and sanitize all school names and purge deprecated schools locally for state
            const { sanitized } = sanitizeAndNormalizeClassData(migratedClasses);
            isRemoteClassUpdate.current = true;
            setClassData(sanitized);
        } else if (!hasLoadedClasses.current) {
          // If Firestore is empty, initialize with local/blueprint data without recursive save
          const stored = safeLocalStorage.getItem('app_classData');
          let rawData = stored ? JSON.parse(stored) : initialClassData;
          const { sanitized } = sanitizeAndNormalizeClassData(rawData);
          isRemoteClassUpdate.current = true;
          setClassData(sanitized);
        }
        hasLoadedClasses.current = true;
      });

      // Subscribe to gallery
      const unsubGallery = subscribeToGallery((firebaseGallery) => {
        if (firebaseGallery && firebaseGallery.images) {
          isRemoteGalleryUpdate.current = true;
          setGalleryData(firebaseGallery);
        } else if (!hasLoadedGallery.current) {
          const stored = safeLocalStorage.getItem('app_galleryData');
          if (stored) {
            const dataToSave = JSON.parse(stored);
            isRemoteGalleryUpdate.current = true;
            setGalleryData(dataToSave);
          }
        }
        hasLoadedGallery.current = true;
      });

      return () => {
        clearTimeout(safetyTimeout);
        unsubClasses();
        unsubGallery();
      };
    } else {
      clearTimeout(safetyTimeout);
      setIsInitializing(false);
    }
  }, []);

  // Hardware Back Button Handling
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Prevent default back behavior if we can handle it internally
      if (selectedClassId) {
        setSelectedClassId(null);
        window.history.pushState({ app: 'classes_grade' }, '', window.location.pathname);
      } else if (selectedGrade) {
        setSelectedGrade(null);
        window.history.pushState({ app: 'classes_home' }, '', window.location.pathname);
      } else if (currentView !== 'home') {
        setView('home');
        window.history.pushState({ app: 'home' }, '', window.location.pathname);
      } else {
        // If at home, push state again to prevent exiting the app
        window.history.pushState({ app: 'home' }, '', window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView, selectedGrade, selectedClassId]);

  const goBack = () => {
    if (selectedClassId) {
        setSelectedClassId(null);
    } else if (selectedGrade) {
        setSelectedGrade(null);
    } else {
        setView('home');
    }
  };

  const setViewWithHistory = (v: ViewState) => {
    resetClassesNav(); 
    setView(v);
  };

  const resetClassesNav = () => {
    setSelectedGrade(null);
    setSelectedClassId(null);
  };

  const renderView = () => {
    switch(currentView) {
      case 'home': return <DashboardView setView={setViewWithHistory} classData={classData} />;
      case 'statistics': return (
        <GradesView 
          onBack={goBack} 
          classData={classData} 
          setClassData={setClassData}
          onSave={handleSaveClasses}
          initialHubMode="estatisticas"
        />
      );
      case 'diario_hub': return (
        <DiarioNotasHubView 
          onBack={goBack}
          onSelectFrequencias={() => setView('classes')}
          onSelectNotas={() => setView('grades')}
        />
      );
      case 'classes': return (
        <ClassesView 
          classData={classData} 
          setClassData={setClassData} 
          onBack={() => {
            if (selectedClassId) {
              setSelectedClassId(null);
            } else if (selectedGrade) {
              setSelectedGrade(null);
            } else {
              setView('diario_hub');
            }
          }}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          onSave={handleSaveClasses}
          syncStatus={syncStatus}
        />
      );
      case 'curriculo_hub': return (
        <CurriculoEmentaHubView 
          onBack={goBack} 
          onSelectEmenta={() => setView('ementa')}
          onSelectCurriculo={() => setView('plano')}
        />
      );
      case 'ementa': return <EmentaView onBack={() => setView('curriculo_hub')} />;
      case 'plano': return <PlanoDeCursoView onBack={() => setView('curriculo_hub')} />;
      case 'schedule': return <ScheduleView onBack={goBack} />;
      case 'gallery': return (
        <GalleryView 
          onBack={goBack} 
          data={galleryData} 
          setData={setGalleryData} 
        />
      );
      case 'profile': return (
        <Profile 
          user={mockUserProfile} 
          onBack={goBack} 
          classData={classData}
          setClassData={setClassData}
          onLogout={() => {
            setAccessLevel('portal');
            setView('home');
          }}
          onNavigateToStudents={() => setView('alunos-view')}
        />
      );
      case 'alunos-view': return (
        <AlunosView 
          onBack={goBack} 
          classData={classData}
        />
      );
      case 'planos_aulas_hub': return (
        <PlanosAulasHubView 
          onBack={goBack}
          onSelectPlanoDeCurso={() => setView('plano_anual_pe')}
          onSelectPlanosDeAula={() => setView('planejamento')}
          onSelectAulasDatashow={() => setView('repositorio_aulas')}
          onSelectRepositorioProvas={() => setView('repositorio_provas')}
        />
      );
      case 'planejamento': return (
        <DecolonialApp 
          initialView="planejamento"
          onBack={() => setView('planos_aulas_hub')} 
          setSlideViewerOpen={setSlideViewerOpen} 
          classData={classData}
          setClassData={setClassData}
          onSave={handleSaveClasses}
        />
      );
      case 'plano_anual_pe': return <PlanoAnualPE onBack={() => setView('planos_aulas_hub')} />;
      case 'repositorio_aulas': return (
        <DecolonialApp 
          initialView="repositorio_aulas"
          onBack={() => setView('planos_aulas_hub')} 
          setSlideViewerOpen={setSlideViewerOpen} 
          classData={classData}
          setClassData={setClassData}
          onSave={handleSaveClasses}
        />
      );
      case 'ocorrencias': return <OcorrenciasView onBack={goBack} />;
      case 'repositorio_provas': return <ExamRepositoryView onBack={() => setView('planos_aulas_hub')} />;
      case 'calendar': return <CalendarView onBack={goBack} />;
      case 'grades': return (
        <GradesView 
          onBack={() => setView('diario_hub')} 
          classData={classData} 
          setClassData={setClassData} 
          onSave={handleSaveClasses}
        />
      );
      case 'assignments': return (
        <AssignmentsView 
          classData={classData} 
          onBack={goBack} 
          onSelectAssignment={(assignment, classId) => {
            setSelectedAssignment({ assignment, classId });
            setView('assignment-print');
          }}
        />
      );
      case 'assignment-print': return selectedAssignment ? (
        <AssignmentPrintView 
          assignment={selectedAssignment.assignment}
          className={classData[selectedAssignment.classId]?.name || ''}
          school={classData[selectedAssignment.classId]?.school || ''}
          onBack={() => setView('assignments')}
        />
      ) : <DashboardView setView={setViewWithHistory} classData={classData} />;
      case 'daily-activities': return (
        <DailyActivityLogView 
          classData={classData} 
          onBack={goBack} 
          setClassData={setClassData}
          onSave={handleSaveClasses}
        />
      );
      default: return <DashboardView setView={setViewWithHistory} classData={classData} />;
    }
  };

  const getTitle = () => {
     switch(currentView) {
      case 'home': return 'Início';
      case 'statistics': return 'Estatísticas';
      case 'grades': return 'Notas & Avaliações';
      case 'classes': 
        if (selectedClassId && classData[selectedClassId]) return classData[selectedClassId].name.toUpperCase();
        if (selectedGrade) return `${selectedGrade}º ANO`;
        return 'Turmas';
      case 'diario_hub': return 'Frequências & Notas';
      case 'curriculo_hub': return 'Currículo & Ementa';
      case 'ementa': return 'Ementa Escolar';
      case 'plano': return 'Currículo';
      case 'schedule': return 'Quadro de Horários';
      case 'gallery': return 'Galeria';
      case 'profile': return 'Perfil';
      case 'planos_aulas_hub': return 'Planos & Aulas';
      case 'planejamento': return 'Planos de Aula';
      case 'plano_anual_pe': return 'Plano de Curso';
      case 'repositorio_aulas': return 'Aulas (Datashow)';
      case 'ocorrencias': return 'Ocorrências';
      case 'repositorio_provas': return 'Repositório de Provas';
      case 'calendar': return 'Calendário';
      case 'daily-activities': return 'Registro Diário';
      default: return 'Painel';
    }
  };

  // Slide Viewer State
  const [slideViewerOpen, setSlideViewerOpen] = useState<{ type: 'corpo-midia' | 'altinha-futvolei' | 'decolonial_player' } | null>(null);

  useEffect(() => {
    (window as any).openSlideViewer = (type: 'corpo-midia' | 'altinha-futvolei') => setSlideViewerOpen({ type });
  }, []);

  // ... (existing code for App)

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf6] text-slate-800 font-sans p-6 text-center">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6 shadow-md"></div>
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Iniciando Sync de Dados</h1>
        <p className="text-slate-500 font-medium animate-pulse">Sincronizando com a Nuvem...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative font-sans">
      {/* Slide Viewer Global Overlay */}
      {slideViewerOpen && slideViewerOpen.type !== 'decolonial_player' && (
        <SlideViewer 
          onClose={() => setSlideViewerOpen(null)} 
          slideType={slideViewerOpen.type} 
        />
      )}

      {/* Global Background */}
      <div className="print:hidden">
        <BackgroundSlider />
      </div>
      
      {accessLevel === 'portal' && (
        <PortalView onSelectAccess={(level) => setAccessLevel(level)} />
      )}

      {accessLevel === 'alunos' && (
        <AlunosView 
          onBack={() => setAccessLevel('portal')} 
          classData={classData}
        />
      )}

      {accessLevel === 'professor_login' && (
        <ProfessorLoginView 
          onBack={() => setAccessLevel('portal')} 
          onSuccess={() => {
            setAccessLevel('professor');
            setView('home');
          }} 
        />
      )}

      {/* Wrapper for Content + Footer */}
      {accessLevel === 'professor' && (
      <div className="flex-1 flex flex-col z-10">
        
          <div className="flex-1 flex flex-col">
             
             {/* Sidebar */}
             <div className="print:hidden">
               <Sidebar 
                 isOpen={isSidebarOpen} 
                 onClose={() => setSidebarOpen(false)} 
                 currentView={currentView}
                 setView={(v) => { resetClassesNav(); setView(v); }}
                 onSwitchToPortal={() => setAccessLevel('portal')}
               />
             </div>

             {/* Header */}
             {currentView !== 'assignment-print' && (
               <header className="bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 sticky top-0 z-30 shadow-2xl shrink-0 transition-all duration-300 text-white print:hidden">
                 <button 
                   onClick={() => setSidebarOpen(true)}
                   className="p-2 mr-3 rounded-xl bg-white/5 hover:bg-white/10 text-white focus:outline-none transition-all active:scale-90 border border-white/10 shadow-lg"
                 >
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                 </button>
                 
                 <div className="flex items-center gap-3">
                   <div className="flex flex-col justify-center">
                     <h1 className="text-base md:text-lg font-black leading-tight tracking-tighter uppercase">{currentView === 'home' ? 'CONTEÚDOS TEÓRICOS' : getTitle()}</h1>
                     <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] truncate">
                       {currentView === 'home' ? 'Prof. André Brito' : 'MÓDULO DE GESTÃO'}
                     </p>
                   </div>
                 </div>
                 
                 <div className="ml-auto flex items-center gap-2 md:gap-5">
                    <div className="hidden sm:block">
                      <SyncStatusIndicator status={syncStatus} />
                    </div>
                    <button
                      onClick={() => setAccessLevel('portal')}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      title="Voltar ao Menu Iniciar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="hidden sm:inline">Menu Iniciar</span>
                    </button>
                    <WeatherWidget />
                 </div>
               </header>
             )}

             {/* Main Content Area */}
             <main className={`flex-1 ${currentView === 'assignment-print' ? 'p-0' : currentView === 'home' ? 'p-2 md:p-4 pb-16 md:pb-4' : 'p-3 md:p-6 pb-20 md:pb-6'} print:p-0`}>
               <div className="w-full">
                  {currentView === 'home' ? (
                    <DashboardView setView={setViewWithHistory} classData={classData} />
                  ) : renderView()}
               </div>
             </main>

             {currentView !== 'assignment-print' && (
               <div className="print:hidden">
                 <BottomNav 
                   currentView={currentView} 
                   setView={setViewWithHistory} 
                 />
               </div>
             )}
             
          </div>
      </div>
      )}

      {/* Global Footer (Always visible, unless viewing slides) */}
      {!slideViewerOpen && accessLevel === 'professor' && (
        <div className="print:hidden">
          <GlobalFooter />
        </div>
      )}
    </div>
  );
};

export default App;