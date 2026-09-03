
export type ViewState = 'home' | 'statistics' | 'classes' | 'grades' | 'profile' | 'ementa' | 'plano' | 'lesson-content' | 'schedule' | 'gallery' | 'assignments' | 'biblioteca' | 'register-activities' | 'decolonial' | 'calendar' | 'daily-activities' | 'alunos-view';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface TrimestreGrade {
  participation?: number;     // max 2.0
  recParticipation?: number;  // max 2.0 (recuperação da participação)
  assignment?: number;       // max 3.0
  recAssignment?: number;    // max 3.0 (recuperação do trabalho)
  exam?: number;             // max 5.0
  recExam?: number;          // max 5.0 (recuperação da prova)
  recovery?: number;         // max 10.0 (recuperação geral do trimestre se média < 6.0)
  observations?: string;     // observações pedagógicas
}

export interface Student {
  id: number;
  name: string;
  attendance: { [date: string]: 'P' | 'F' | null };
  grades?: { [assignmentId: string]: number };
  trimestreGrades?: { [trimestre: string]: TrimestreGrade };
  enrolledTrimesters?: number[]; // [1, 2, 3] or subset of trimesters enrolled
  status?: 'ativo' | 'transferido' | 'evadido' | 'entrante';
}

export interface Assignment {
  id: string;
  title: string;
  discipline: string;
  description: string;
  totalPoints: number;
  format: string;
  dueDate: string;
}

export interface DailyActivity {
  id: string;
  date: string; // ISO string
  plannedActivity: string;
  actualActivity: string;
  observations: string;
}

export interface ClassData {
  id: string;
  name: string;
  grade: string; 
  school: string; 
  discipline?: string;
  students: Student[];
  assignments?: Assignment[];
  dailyActivities?: DailyActivity[];
  schedule?: string;
  days?: string[];
}

export interface ClassDataMap {
  [classId: string]: ClassData;
}

export interface DashboardCardData {
  id: string;
  title: string;
  value: string | number;
  type: 'number' | 'currency' | 'text' | 'status';
  trend?: string;
  icon?: string;
  lastUpdated: number;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  description: string;
  createdAt: number;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface OccurrenceData {
  id: string;
  date: string;
  type: 'class' | 'student';
  classId: string;
  className: string;
  school: string;
  studentId: number | null;
  studentName: string | null;
  description: string;
  createdAt: number;
}
