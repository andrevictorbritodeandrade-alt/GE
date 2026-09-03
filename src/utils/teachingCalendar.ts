/**
 * Utilitário de Calendário SEEDUC-RJ 2026 (Resolução SEEDUC Nº 6392/2025)
 * Específico para cálculo de aulas previstas de Segunda e Sexta-feira
 */

export interface TrimesterInfo {
  id: number;
  name: string;
  shortName: string;
  rangeText: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  officialSchoolDays: number; // Dias letivos gerais da rede
}

export const OFFICIAL_TRIMESTERS: TrimesterInfo[] = [
  {
    id: 1,
    name: '1º Trimestre',
    shortName: '1º Trim',
    rangeText: '05/02 a 18/05',
    startDate: '2026-02-05',
    endDate: '2026-05-18',
    officialSchoolDays: 66,
  },
  {
    id: 2,
    name: '2º Trimestre',
    shortName: '2º Trim',
    rangeText: '19/05 a 04/09',
    startDate: '2026-05-19',
    endDate: '2026-09-04',
    officialSchoolDays: 67,
  },
  {
    id: 3,
    name: '3º Trimestre',
    shortName: '3º Trim',
    rangeText: '08/09 a 22/12',
    startDate: '2026-09-08',
    endDate: '2026-12-22',
    officialSchoolDays: 73,
  },
];

// Feriados e Recessos oficiais de 2026 (SEEDUC-RJ) formatados em YYYY-MM-DD
export const OFFICIAL_HOLIDAYS_RECESS_2026: Record<string, string> = {
  '2026-01-01': 'Confraternização Universal (Feriado)',
  // Carnaval
  '2026-02-16': 'Carnaval (Recesso)',
  '2026-02-17': 'Carnaval (Feriado)',
  '2026-02-18': 'Quarta-feira de Cinzas (Recesso)',
  // Semana Santa / Paixão de Cristo
  '2026-04-02': 'Quinta-feira Santa (Recesso)',
  '2026-04-03': 'Paixão de Cristo (Feriado)',
  // Tiradentes e São Jorge
  '2026-04-21': 'Tiradentes (Feriado)',
  '2026-04-23': 'São Jorge (Feriado Estadual RJ)',
  // Dia do Trabalho
  '2026-05-01': 'Dia do Trabalho (Feriado)',
  // Corpus Christi
  '2026-06-04': 'Corpus Christi (Feriado)',
  // Recesso de Julho (13/07 a 26/07)
  '2026-07-13': 'Recesso Escolar de Julho',
  '2026-07-14': 'Recesso Escolar de Julho',
  '2026-07-15': 'Recesso Escolar de Julho',
  '2026-07-16': 'Recesso Escolar de Julho',
  '2026-07-17': 'Recesso Escolar de Julho',
  '2026-07-20': 'Recesso Escolar de Julho',
  '2026-07-21': 'Recesso Escolar de Julho',
  '2026-07-22': 'Recesso Escolar de Julho',
  '2026-07-23': 'Recesso Escolar de Julho',
  '2026-07-24': 'Recesso Escolar de Julho',
  // Independência
  '2026-09-07': 'Independência do Brasil (Feriado)',
  // Nossa Senhora Aparecida
  '2026-10-12': 'N. Sra Aparecida / Padroeira (Feriado)',
  // Dia do Mestre (15/10)
  '2026-10-15': 'Dia do Professor / Mestre',
  // Finados
  '2026-11-02': 'Finados (Feriado)',
  // Proclamação da República
  '2026-11-15': 'Proclamação da República (Feriado)',
  // Consciência Negra
  '2026-11-20': 'Dia da Consciência Negra (Feriado)',
  // Recesso de Fim de Ano
  '2026-12-25': 'Natal (Feriado)',
};

export interface DayClassItem {
  dateISO: string; // '2026-02-09'
  formatted: string; // '09/02'
  dayOfWeek: 'Segunda' | 'Sexta';
  isHolidayOrRecess: boolean;
  holidayName?: string;
  isSchoolDay: boolean;
}

export interface ExpectedClassesStats {
  trimesterId: number;
  trimesterName: string;
  rangeText: string;
  totalOfficialSchoolDays: number;
  mondaysTotal: number;
  mondaysTeaching: number;
  mondaysHolidays: number;
  fridaysTotal: number;
  fridaysTeaching: number;
  fridaysHolidays: number;
  totalTeachingClasses: number; // Total de aulas esperadas (Segundas + Sextas letivas)
  daysList: DayClassItem[];
}

/**
 * Calcula os dias de aula previstos (Segundas e Sextas) para um determinado trimestre
 */
export function calculateExpectedClassesForTrimester(trimesterId: number): ExpectedClassesStats {
  const trim = OFFICIAL_TRIMESTERS.find(t => t.id === trimesterId) || OFFICIAL_TRIMESTERS[0];
  const start = new Date(`${trim.startDate}T12:00:00`);
  const end = new Date(`${trim.endDate}T12:00:00`);

  let mondaysTotal = 0;
  let mondaysTeaching = 0;
  let mondaysHolidays = 0;

  let fridaysTotal = 0;
  let fridaysTeaching = 0;
  let fridaysHolidays = 0;

  const daysList: DayClassItem[] = [];

  const curr = new Date(start);
  while (curr <= end) {
    const day = curr.getDay(); // 1 = Monday, 5 = Friday
    if (day === 1 || day === 5) {
      const y = curr.getFullYear();
      const m = String(curr.getMonth() + 1).padStart(2, '0');
      const d = String(curr.getDate()).padStart(2, '0');
      const iso = `${y}-${m}-${d}`;
      const formatted = `${d}/${m}`;
      const dayName: 'Segunda' | 'Sexta' = day === 1 ? 'Segunda' : 'Sexta';

      const holiday = OFFICIAL_HOLIDAYS_RECESS_2026[iso];
      const isHoliday = !!holiday;
      const isSchoolDay = !isHoliday;

      if (day === 1) {
        mondaysTotal++;
        if (isSchoolDay) mondaysTeaching++;
        else mondaysHolidays++;
      } else {
        fridaysTotal++;
        if (isSchoolDay) fridaysTeaching++;
        else fridaysHolidays++;
      }

      daysList.push({
        dateISO: iso,
        formatted,
        dayOfWeek: dayName,
        isHolidayOrRecess: isHoliday,
        holidayName: holiday,
        isSchoolDay
      });
    }
    curr.setDate(curr.getDate() + 1);
  }

  return {
    trimesterId: trim.id,
    trimesterName: trim.name,
    rangeText: trim.rangeText,
    totalOfficialSchoolDays: trim.officialSchoolDays,
    mondaysTotal,
    mondaysTeaching,
    mondaysHolidays,
    fridaysTotal,
    fridaysTeaching,
    fridaysHolidays,
    totalTeachingClasses: mondaysTeaching + fridaysTeaching,
    daysList
  };
}

/**
 * Retorna as estatísticas consolidadas para todos os 3 trimestres e o total anual
 */
export function getAnnualTeachingStats() {
  const trim1 = calculateExpectedClassesForTrimester(1);
  const trim2 = calculateExpectedClassesForTrimester(2);
  const trim3 = calculateExpectedClassesForTrimester(3);

  const annualTotalTeaching = trim1.totalTeachingClasses + trim2.totalTeachingClasses + trim3.totalTeachingClasses;
  const annualMondaysTeaching = trim1.mondaysTeaching + trim2.mondaysTeaching + trim3.mondaysTeaching;
  const annualFridaysTeaching = trim1.fridaysTeaching + trim2.fridaysTeaching + trim3.fridaysTeaching;
  const annualOfficialDays = trim1.totalOfficialSchoolDays + trim2.totalOfficialSchoolDays + trim3.totalOfficialSchoolDays;

  return {
    trimesters: [trim1, trim2, trim3],
    annual: {
      totalTeachingClasses: annualTotalTeaching,
      mondaysTeaching: annualMondaysTeaching,
      fridaysTeaching: annualFridaysTeaching,
      totalOfficialDays: annualOfficialDays,
    }
  };
}
