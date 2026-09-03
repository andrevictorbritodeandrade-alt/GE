import { ClassDataMap, UserProfile } from './types';

export const ALLOWED_SCHOOLS = [
  "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
  "CIEP 476 ELIAS LAZARONI",
  "CIEP 369 JORNALISTA SANDRO MOREYRA",
  "CIEP 229 CÂNDIDO PORTINARI",
  "EE PROFESSORA CORDELIA PAIVA"
] as const;

export type AllowedSchool = typeof ALLOWED_SCHOOLS[number];

export function normalizeSchoolName(school: string | undefined | null): AllowedSchool | null {
  if (!school) return null;
  const s = school.trim();
  const upper = s.toUpperCase();
  
  if (upper.includes("IGNACIO") || upper.includes("IGNÁCIO") || upper.includes("BEZERRA")) {
    return "CE DOUTOR IGNACIO BEZERRA DE MENEZES";
  }
  if (upper.includes("CORDELIA") || upper.includes("CORDÉLIA")) {
    return "EE PROFESSORA CORDELIA PAIVA";
  }
  if (upper.includes("229") || upper.includes("PORTINARI")) {
    return "CIEP 229 CÂNDIDO PORTINARI";
  }
  if (upper.includes("369") || upper.includes("SANDRO MOREYRA") || upper.includes("MAURÍCIO AZEDO") || upper.includes("MAURICIO AZEDO")) {
    return "CIEP 369 JORNALISTA SANDRO MOREYRA";
  }
  if (upper.includes("476") || upper.includes("ELIAS LAZARONI") || upper.includes("FLÁVIO RIBEIRO") || upper.includes("FLAVIO RIBEIRO")) {
    return "CIEP 476 ELIAS LAZARONI";
  }

  return null;
}

export function sanitizeAndNormalizeClassData(data: ClassDataMap): { sanitized: ClassDataMap, purgedIds: string[], changed: boolean } {
  const sanitized: ClassDataMap = {};
  const purgedIds: string[] = [];
  let changed = false;

  Object.keys(data || {}).forEach(id => {
    const cls = data[id];
    if (!cls) return;

    const normalizedSchool = normalizeSchoolName(cls.school);
    if (!normalizedSchool) {
      // School is not in the 5 allowed schools: purge it!
      purgedIds.push(id);
      changed = true;
    } else {
      if (cls.school !== normalizedSchool) {
        sanitized[id] = { ...cls, school: normalizedSchool };
        changed = true;
      } else {
        sanitized[id] = cls;
      }
    }
  });

  return { sanitized, purgedIds, changed };
}

export const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=3870&auto=format&fit=crop", // Gym/Fitness
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3869&auto=format&fit=crop", // Running/Athletics
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=3936&auto=format&fit=crop", // Soccer/Field
  "https://images.unsplash.com/photo-1526676023131-d352423b06b4?q=80&w=3870&auto=format&fit=crop", // Basketball court
  "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=3870&auto=format&fit=crop"  // Swimming/Sports
];

// Helper para formatar nomes (Capitalize)
const formatName = (name: string) => {
  return name.toLowerCase().split(' ').map(word => {
    if (['da', 'de', 'do', 'dos', 'das', 'e'].includes(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const students601Raw = [
  "Allanda Lima",
  "Ana Beatriz",
  "Anderson",
  "Arthur Bastos",
  "Arthur Cruz",
  "Aryel Monteiro",
  "Bernardo Lamprecht",
  "Carlos Eduardo",
  "Emanuelly",
  "Esther",
  "Gabriel Alves",
  "Geovane",
  "Gustavo Reinaldo",
  "Henrique Lemos",
  "Kelvin Oliveira",
  "Maria Luísa Magalhães",
  "Miguel de Oliveira",
  "Pedro Cruz",
  "Pedro Henrique Oliveira",
  "Rickarlyson",
  "Thiago",
  "Vitor Bastos",
  "Vitória Beatriz",
  "Vívian Avelino",
  "Ysabella Ricas"
];

const students602Raw = [
  "Agatha de Souza",
  "Alice Costa",
  "Alice dos Santos",
  "Ana Beatriz",
  "Ana Clara",
  "Ana Kateryne",
  "Ana Sophia",
  "Anna Ester",
  "Annalu Barros",
  "Any Carreiri",
  "Arthur Azevedo",
  "Benício Diniz",
  "Cristal Marisa",
  "Davi Leal",
  "Davi Lucas",
  "Davi Luiz",
  "Davi Miguel",
  "Eloah",
  "Enzo",
  "Gabriel",
  "Gabriel de Oliveira",
  "Geovanna",
  "Heitor",
  "Helena",
  "Heloísa",
  "Isadora",
  "João Gabriel",
  "João Guilherme",
  "João Lucas",
  "João Pedro",
  "João Victor",
  "Júlia",
  "Kauã",
  "Lara",
  "Larissa",
  "Laura",
  "Lavínia",
  "Letícia",
  "Lívia",
  "Lorena",
  "Lucas",
  "Lucca",
  "Luiz Felipe",
  "Luiz Gustavo",
  "Luiz Henrique",
  "Luiz Otávio",
  "Luíza",
  "Manuela",
  "Maria Alice",
  "Maria Clara",
  "Maria Eduarda",
  "Maria Fernanda",
  "Maria Júlia",
  "Maria Luíza",
  "Maria Sophia",
  "Mariana",
  "Marina",
  "Mateus",
  "Matheus",
  "Melissa",
  "Miguel",
  "Milena",
  "Murilo",
  "Natália",
  "Nathan",
  "Nicolas",
  "Nicole",
  "Otávio",
  "Paulo",
  "Pedro",
  "Pietro",
  "Rafael",
  "Rafaela",
  "Rebeca",
  "Rodrigo",
  "Samuel",
  "Sarah",
  "Sophia",
  "Thales",
  "Theo",
  "Thiago",
  "Valentina",
  "Victor",
  "Vinícius",
  "Vitor",
  "Vitória",
  "Yasmin",
  "Yuri"
];

const students603Raw = [
  "Alycia Vitória",
  "Arnaldo Barbosa",
  "Arthur Coutinho",
  "Arthur Nogueira",
  "Beatriz Vidal",
  "Breno Henrique",
  "Catarina Santiago",
  "Davi Lucca",
  "Fabiano Rocha",
  "Fabíola Gabryella",
  "Fernanda Isaías",
  "Gabriel Gosta",
  "João Miguel",
  "Laís Moura",
  "Lavínia da Rocha",
  "Leidania",
  "Luís Henrique Marchi",
  "Mariana Tostes",
  "Miguel Macedo",
  "Moisés Santiago",
  "Nathalia de Melo",
  "Pedro Joaquim",
  "Peron Pérez",
  "Pietro dos Santos",
  "Piettra Moreira"
];

const students604Raw = [
  "Manuella da Silva",
  "Arthur Mendonça",
  "Sthefany Vitória",
  "Paulo Sérgio",
  "Nina Pacheco",
  "Isaque oliveira",
  "Laura Neves",
  "Richard EIke",
  "Milena Gonçalves",
  "Mirella Ramos",
  "Patrícia da França",
  "Pyetro Coelho",
  "Rafaella Alves",
  "Sofia Dutra",
  "Thallys Monteiro",
  "Ygorvde Castro",
  "Pedro Lucas",
  "Thayna de Araújo",
  "Ana Luíza Guedes",
  "Isaías Alexsander",
  "João Gabriel",
  "José Bernardo",
  "Júlia Franco",
  "Júlia Melo",
  "Luca Ávila",
  "Juliana Monteiro",
  "Safira de Aguiar"
];

const createStudents = (rawList: string[], classId: string) => {
  return rawList.map((name, i) => {
    const attendance: { [date: string]: 'P' | 'F' | null } = {};
    
    // Frequência de 09/03 para a Turma 603
    if (classId === '603') {
      const present603 = [
        "Alicia Vitória Silva dos Santos",
        "Arnaldo Barbosa Vilaça Junior",
        "Arthur Coutinho Oliveira",
        "Arthur Nogueira Pinto da Silva",
        "Beatriz Vidal Machado",
        "Breno Henrique Souza de Oliveira",
        "Catarina Santiago Martins",
        "Davi Lucca Duarte Bastos",
        "Fábiolla Gabryella Bach do Rosário Pereira",
        "Gabriel Costa de Azevedo"
      ];
      const absent603 = [
        "Fabiano Rocha de Oliveira Júnior",
        "Fernanda Isaías",
        "João Miguel Henriques Brum"
      ];
      
      if (present603.includes(name)) attendance["09/03"] = "P";
      if (absent603.includes(name)) attendance["09/03"] = "F";
    }

    // Frequência de 09/03 para a Turma 604
    if (classId === '604') {
      const present604 = [
        "Manuela da Silva Gomes",
        "Arthur Mendonça da Silva",
        "Laura Neves",
        "Patrícia da França Gomes dos Santos",
        "Pyetro Coelho Santana",
        "Rafaela Alves Freitas Passos"
      ];
      const absent604 = [
        "Sthefany Vitória Valadares Neves da Silva",
        "Paulo Sérgio Batista de Souza",
        "Nina Pacheco Dias da Silva",
        "Isaque Oliveira Matos dos Santos",
        "Richard EIke",
        "Milena Gonçalves Rodrigues",
        "Mirella Ramos dos Santos Gomes"
      ];
      
      if (present604.includes(name)) attendance["09/03"] = "P";
      if (absent604.includes(name)) attendance["09/03"] = "F";
    }

    return {
      id: parseInt(classId) * 100 + i,
      name: name,
      attendance: attendance
    };
  });
};

export const initialClassData: ClassDataMap = {
  "801": { 
    id: "801", 
    name: "801-182106", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
      { id: 80101, name: "Alice Vitória Rosa de Sales Ramos", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80102, name: "Ana Cristina Silva Pereira", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "F" } },
      { id: 80103, name: "Ana Luiza da Costa Martins", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80104, name: "Ana Luiza Rodrigues da Silva", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80105, name: "Ana Vitória Farias Correa", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "P" } },
      { id: 80106, name: "André Nunes da Silva Lopes", attendance: { "08/05": "P", "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80107, name: "Andressa da Silva Vieira", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "P" } },
      { id: 80108, name: "Andrey de Sousa Santos", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80109, name: "Angelliny de Oliveira Silva", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80110, name: "Anna Beatriz Souza Lima", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80111, name: "Anna Karolinny Souza Lima", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80112, name: "Bianca Santos de Souza Oliveira", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80113, name: "Camili Oliveira Batista", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80114, name: "Carolina Caldas Souza", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80115, name: "Cauã Victor Nobre de Oliveira Lins", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80116, name: "Davi Moura da Cruz", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80117, name: "Davi Sousa Santos da Silva", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80118, name: "Enzo José Jardim Augusto", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80119, name: "Ezequiel Lima de Oliveira", attendance: { "08/05": "P", "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "F" } },
      { id: 80120, name: "Fernanda Honorato Sabino da Silva", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80121, name: "Gabrieli de Barros Caiana", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80122, name: "Gabrielly Lima da Silva", attendance: { "08/05": "P", "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "P" } },
      { id: 80123, name: "Geovana Fernandes R. de Andrade", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80124, name: "Giovanna Kaylane Gonçalves Godoy", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80125, name: "Guilherme Santos de Jesus", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80126, name: "Gustavo Nascimento de Jesus", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "F" } },
      { id: 80127, name: "Hashelly Letícia B. dos Santos", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80128, name: "Miguel de Souza R. do Nascimento", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80129, name: "Nicolly Baptista do Nascimento", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80130, name: "Richard Josafá V. B. T. Augusto", attendance: { "08/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "F" } }
    ],
    schedule: "10:35 – 12:15",
    days: ["Segunda"],
    assignments: [
      {
        id: "A2_801",
        title: "Trabalho do 2º Trimestre",
        discipline: "Educação Física",
        description: "Entrega de trabalho manuscrito contendo capa, introdução, desenvolvimento e referências, além da apresentação e reprodução prática em sala de aula de jogos de tabuleiro, cartas, mentais ou de concentração de outros países.",
        totalPoints: 3,
        format: "Formação de até 05 pessoas por grupo",
        dueDate: "29/06/2026"
      }
    ],
    dailyActivities: [
      {
        id: "cordelia-801-2026-05-11",
        date: "2026-05-11T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Fique em sala para conhecer as turmas e aplicar prova de recuperação de outros professores. Nesse dia, as turmas saíram cedo",
        observations: ""
      },
      {
        id: "cordelia-801-2026-05-18",
        date: "2026-05-18T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Comecei o conteúdo de altinha e futevôlei de maneira teórica. passei, no quadro até a página 4 dos slides.",
        observations: ""
      },
      {
        id: "cordelia-801-2026-05-25",
        date: "2026-05-25T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Continuidade do conteúdo de altinha e futevôlei, com conteúdo teórico, no quadro, até a página 7 do slide; jogos em grupo dentro de sala",
        observations: ""
      },
      {
        id: "cordelia-801-2026-06-01",
        date: "2026-06-01T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Aulas práticas de fundamento de toque, passe e recepção adaptados a jogos pré-desportivos de altinha e futevôlei",
        observations: ""
      },
      {
        id: "cordelia-801-2026-06-08",
        date: "2026-06-08T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Apresentação e registro no quadro das especificações do Trabalho do 2º Trimestre: valor de 3 pontos, formação de grupos de até 5 pessoas, com o objetivo de entregar trabalho escrito manuscrito (capa, introdução, desenvolvimento e referências) sobre pesquisa de jogos de tabuleiro, cartas, mentais ou de concentração de outros países, além de apresentação prática em sala de aula. Datas das apresentações serão 22/06 e 29/06.",
        observations: ""
      },
      {
        id: "cordelia-801-2026-06-15",
        date: "2026-06-15T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Apresentação teórica do tema Jogos do Mundo com registro escrito no quadro do conteúdo dos slides até a página 4, abordando os jogos tradicionais dos continentes africano, asiático e europeu.",
        observations: ""
      },
      {
        id: "cordelia-801-2026-06-22",
        date: "2026-06-22T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Proposta de construção de tabuleiros de damas. Organizamos a turma em quartetos e distribuímos a responsabilidade para que tragam na próxima semana (29/06): papelão, canetinha, piloto e tampinhas de refrigerante (mínimo de 12 claras e 12 escuras) para a montagem dos tabuleiros.",
        observations: ""
      },
      {
        id: "cordelia-801-2026-07-27",
        date: "2026-07-27T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Retorno do recesso escolar e chamada/lançamento de frequência do dia 27/07.",
        observations: ""
      }
    ]
  },
  "802": { 
    id: "802", 
    name: "802-182106", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
      { id: 802001, name: "Henzo Martins da Silva Evangelista", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802002, name: "Isabella Ribeiro Gomes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 2.5, participation: 2.0, exam: 3.0 } } },
      { id: 802003, name: "Isabella Vitoria Correa Pereira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "F", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.0 } } },
      { id: 802004, name: "Isabelly Lopes do Nascimento", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "F", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.1 } } },
      { id: 802005, name: "Jhully Victoria C. dos S. de Oliveira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "F", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.1 } } },
      { id: 802006, name: "João Davi Gomes Pereira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.2 } } },
      { id: 802007, name: "João Gabriel Alves da Costa", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802008, name: "João Marcos Oliveira Ribeiro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "F", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.0 } } },
      { id: 802009, name: "Julia Oliveira da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "F", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802010, name: "Juliana Arueira Luparelli", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "06/07": "F", "27/07": "F", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 1.0, participation: 2.0, exam: 5.0 } } },
      { id: 802011, name: "Kaique Cruz Gonçalves Damião", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "F", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "F", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802012, name: "Kevin Gabriel Gomes da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802013, name: "Lara Maria de Sousa Soares", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "06/07": "F", "27/07": "P", "03/08": "F", "10/08": "F", "17/08": "P", "24/08": "P", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.1 } } },
      { id: 802015, name: "Lara Vieira de Andrade", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "F", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.9 } } },
      { id: 802016, name: "Lavinnya de Souza de Araújo", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "F", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "F", "17/08": "F", "24/08": "F", "31/08": "F" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 3.0, participation: 2.0, exam: 2.9 } } },
      { id: 802017, name: "Laysa Ambrozio Claudio", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 0.0, participation: 2.0, exam: 5.0 } } },
      { id: 802018, name: "Leticia Costa Santos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "F", "24/08": "P", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.0 } } },
      { id: 802019, name: "Lívia Duarte Soares de Lima", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 2.5, participation: 2.0, exam: 5.0 } } },
      { id: 802020, name: "Lívia Fernandes Gaiani", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "P", "31/08": "F" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.5 } } },
      { id: 802021, name: "Luis Fernando Amorim de Deus", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "F", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "F", "24/08": "F", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802023, name: "Manuela Ribeiro dos Santos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "F", "10/08": "P", "17/08": "P", "24/08": "F", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 2.5, participation: 2.0, exam: 3.5 } } },
      { id: 802022, name: "Manuella Figueiredo da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "F", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.2 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 2.5, participation: 2.0, exam: 3.4 } } },
      { id: 802024, name: "Manuella Magalhães Martins", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "F", "10/08": "F", "17/08": "F", "24/08": "F", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.1 } } },
      { id: 802025, name: "Maria Rita de Jesus Sergio", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "F", "27/07": "P", "03/08": "P", "10/08": "P", "17/08": "P", "24/08": "F", "31/08": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.2 }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.3 }, "2": { assignment: 2.5, participation: 2.0, exam: 3.3 } } },
      { id: 802026, name: "Mellyna Santos Spatafora", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "F", "06/07": "P", "27/07": "F", "03/08": "F", "10/08": "P", "17/08": "P", "24/08": "F", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.0 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802027, name: "Sophia Oliveira Ribeiro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "P", "27/07": "P", "03/08": "F", "10/08": "P", "17/08": "P", "24/08": "F", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.1 }, "2": { assignment: 3.0, participation: 2.0, exam: 3.5 } } },
      { id: 802014, name: "Lara Monteiro dos Santos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "06/07": "F", "27/07": "P", "03/08": "P", "10/08": "F", "17/08": "F", "24/08": "F", "31/08": "P" }, trimestreGrades: { "1": { participation: 2.0, assignment: 2.0, exam: 2.2 }, "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802028, name: "Kauã Richard Ferreira da Silva", enrolledTrimesters: [2, 3], attendance: { "25/05": "F", "01/06": "P", "08/06": "F", "15/06": "F", "22/06": "P", "06/07": "F", "27/07": "F", "03/08": "F", "10/08": "F", "17/08": "F", "24/08": "F", "31/08": "F" }, trimestreGrades: { "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802029, name: "Gabriel Miguel da Hora", enrolledTrimesters: [2, 3], attendance: { "25/05": "F", "01/06": "F", "08/06": "F", "15/06": "F", "22/06": "F", "06/07": "F", "27/07": "F", "03/08": "F", "10/08": "F", "17/08": "F", "24/08": "F", "31/08": "F" }, trimestreGrades: { "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } },
      { id: 802030, name: "Ana Cristina Silva Pereira", enrolledTrimesters: [2, 3], attendance: { "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "F", "06/07": "P", "27/07": "P", "03/08": "F", "10/08": "P", "17/08": "F", "24/08": "P", "31/08": "F" }, trimestreGrades: { "2": { assignment: 3.0, participation: 2.0, exam: 4.1 } } },
      { id: 802031, name: "Esther Nunes da Costa", enrolledTrimesters: [2, 3], attendance: { "25/05": "F", "01/06": "F", "08/06": "F", "15/06": "F", "22/06": "F", "06/07": "F", "27/07": "F", "03/08": "F", "10/08": "P", "17/08": "F", "24/08": "P", "31/08": "F" }, trimestreGrades: { "2": { assignment: 0.0, participation: 2.0, exam: 4.0 } } }
    ],
    schedule: "07:00 – 08:40",
    days: ["Segunda"],
    assignments: [
      {
        id: "A2_802",
        title: "Trabalho do 2º Trimestre",
        discipline: "Educação Física",
        description: "Entrega de trabalho manuscrito contendo capa, introdução, desenvolvimento e referências, além da apresentação e reprodução prática em sala de aula de jogos de tabuleiro, cartas, mentais ou de concentração de outros países.",
        totalPoints: 3,
        format: "Formação de até 05 pessoas por grupo",
        dueDate: "29/06/2026"
      }
    ],
    dailyActivities: [
      {
        id: "cordelia-802-2026-05-11",
        date: "2026-05-11T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Fique em sala para conhecer as turmas e aplicar prova de recuperação de outros professores. Nesse dia, as turmas saíram cedo",
        observations: ""
      },
      {
        id: "cordelia-802-2026-05-18",
        date: "2026-05-18T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Comecei o conteúdo de altinha e futevôlei de maneira teórica. passei, no quadro até a página 4 dos slides.",
        observations: ""
      },
      {
        id: "cordelia-802-2026-05-25",
        date: "2026-05-25T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Continuidade do conteúdo de altinha e futevôlei, com conteúdo teórico, no quadro, até a página 7 do slide; jogos em grupo dentro de sala",
        observations: ""
      },
      {
        id: "cordelia-802-2026-06-01",
        date: "2026-06-01T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Aulas práticas de fundamento de toque, passe e recepção adaptados a jogos pré-desportivos de altinha e futevôlei",
        observations: ""
      },
      {
        id: "cordelia-802-2026-06-08",
        date: "2026-06-08T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Aulas práticas com fundamentos avançados e mini-torneio adaptado de altinha e futevôlei. Também passei as instruções de registro no quadro do Trabalho do 2º Trimestre: valor de 3 pontos, formação de grupos de até 5 pessoas, com o objetivo de entregar trabalho manuscrito (capa, introdução, desenvolvimento e referências) e apresentar/praticar em sala de aula jogos de tabuleiro, cartas, mentais ou de concentração de outros países. As apresentações serão nos dias 22/06 e 29/06.",
        observations: ""
      },
      {
        id: "cordelia-802-2026-06-15",
        date: "2026-06-15T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Apresentação teórica do tema Jogos do Mundo com registro escrito no quadro do conteúdo dos slides até a página 4, abordando os jogos tradicionais dos continentes africano, asiático e europeu.",
        observations: ""
      },
      {
        id: "cordelia-802-2026-06-22",
        date: "2026-06-22T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Proposta de construção de tabuleiros de damas. Organizamos a turma em quartetos e distribuímos a responsabilidade para que tragam na próxima semana (29/06): papelão, canetinha, piloto e tampinhas de refrigerante (mínimo de 12 claras e 12 escuras) para a montagem dos tabuleiros.",
        observations: ""
      },
      {
        id: "cordelia-802-2026-07-27",
        date: "2026-07-27T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Retorno do recesso escolar e chamada/lançamento de frequência do dia 27/07.",
        observations: ""
      }
    ]
  },
  "803": { 
    id: "803", 
    name: "803-182106", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
      { id: 80301, name: "Adrieli Vitória dos Santos da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80302, name: "Ana Clara de Jesus Pereira", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80303, name: "Danilo Ribeiro Feliciano", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80304, name: "Esther Nunes da Costa", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "F" } },
      { id: 80305, name: "Felipe Santos Vital Guimarães", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80306, name: "Ítalo Silva de Almeida", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "F" } },
      { id: 80307, name: "João Paulo Lima da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80308, name: "Matheus Araujo da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80309, name: "Matheus Severiano Galdino da Silva", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80310, name: "Micaella Moraes Lourenço da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80311, name: "Micaelly Vitória Alves de França", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80312, name: "Miguel Lucas Vicente Gomes", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "F" } },
      { id: 80313, name: "Milena Vitória Tavares de Jesus", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F", "27/07": "P" } },
      { id: 80314, name: "Nicole Archanjo Santos", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80315, name: "Pedro Henryk dos Santos Coelho", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80316, name: "Pietro Vitor Santos Braga", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80317, name: "Rafaela Lourenço da Silva Camilo", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80318, name: "Rafaelle dos Santos Almeida", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80319, name: "Ray Bomfim Pereira", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "F" } },
      { id: 80320, name: "Richard Reis Costa", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80321, name: "Riquelme Oliveira Carlos", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80322, name: "Roberta Flôr de Liz Araujo da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80323, name: "Ryan Lucas Soares Velasco", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80324, name: "Sarah Rafaela de Souza Ferreira", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80325, name: "Sofia Nascimento de Araujo", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80326, name: "Sophia Quaresma Jeronymo", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "P" } },
      { id: 80327, name: "Vitor Manoel Gomes da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F", "08/06 - 1º T": "P", "08/06 - 2º T": "P", "27/07": "F" } }
    ],
    schedule: "08:40 – 10:20",
    days: ["Segunda"],
    assignments: [
      {
        id: "A2_803",
        title: "Trabalho do 2º Trimestre",
        discipline: "Educação Física",
        description: "Entrega de trabalho manuscrito contendo capa, introdução, desenvolvimento e referências, além da apresentação e reprodução prática em sala de aula de jogos de tabuleiro, cartas, mentais ou de concentração de outros países.",
        totalPoints: 3,
        format: "Formação de até 05 pessoas por grupo",
        dueDate: "29/06/2026"
      }
    ],
    dailyActivities: [
      {
        id: "cordelia-803-2026-05-11",
        date: "2026-05-11T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Fique em sala para conhecer as turmas e aplicar prova de recuperação de outros professores. Nesse dia, as turmas saíram cedo",
        observations: ""
      },
      {
        id: "cordelia-803-2026-05-18",
        date: "2026-05-18T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Comecei o conteúdo de altinha e futevôlei de maneira teórica. passei, no quadro até a página 4 dos slides.",
        observations: ""
      },
      {
        id: "cordelia-803-2026-05-25",
        date: "2026-05-25T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Continuidade do conteúdo de altinha e futevôlei, com conteúdo teórico, no quadro, até a página 7 do slide; jogos em grupo dentro de sala",
        observations: ""
      },
      {
        id: "cordelia-803-2026-06-01",
        date: "2026-06-01T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Aulas práticas de fundamento de toque, passe e recepção adaptados a jogos pré-desportivos de altinha e futevôlei",
        observations: ""
      },
      {
        id: "cordelia-803-2026-06-08",
        date: "2026-06-08T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Apresentação e registro no quadro das especificações do Trabalho do 2º Trimestre: valor de 3 pontos, formação de grupos de até 5 pessoas, com o objetivo de entregar trabalho escrito manuscrito (capa, introdução, desenvolvimento e referências) sobre pesquisa de jogos de tabuleiro, cartas, mentais ou de concentração de outros países, além de apresentação prática em sala de aula. Datas das apresentações serão 22/06 e 29/06.",
        observations: ""
      },
      {
        id: "cordelia-803-2026-06-15",
        date: "2026-06-15T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Apresentação teórica do tema Jogos do Mundo com registro escrito no quadro do conteúdo dos slides até a página 4, abordando os jogos tradicionais dos continentes africano, asiático e europeu.",
        observations: ""
      },
      {
        id: "cordelia-803-2026-06-22",
        date: "2026-06-22T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Proposta de construção de tabuleiros de damas. Organizamos a turma em quartetos e distribuímos a responsabilidade para que tragam na próxima semana (29/06): papelão, canetinha, piloto e tampinhas de refrigerante (mínimo de 12 claras e 12 escuras) para a montagem dos tabuleiros.",
        observations: ""
      },
      {
        id: "cordelia-803-2026-07-27",
        date: "2026-07-27T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Retorno do recesso escolar e chamada/lançamento de frequência do dia 27/07.",
        observations: ""
      }
    ]
  },
  "CE_IGNACIO_1001": { 
    id: "CE_IGNACIO_1001", 
    name: "ILGCH 1001", 
    grade: "1ª Série EM", 
    school: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    discipline: "ILGCH (Linguagens e Ciências Humanas)",
    students: [
      { id: 100101, name: "Allan Gabriel de Castro Soares", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "F", "23/06": "P", "28/07": "P" } },
      { id: 100102, name: "Beatriz Miranda da Fonseca", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100103, name: "Caio Vinícius Teixeira Lima", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "F", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "F" } },
      { id: 100104, name: "Camila Vianna dos Santos", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100105, name: "Davi Lucas Cardoso Ribeiro", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "F", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100106, name: "Eduarda Cristina Ramos Melo", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "F", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100107, name: "Enzo Gabriel Martins Paiva", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100108, name: "Gabriel Henrique Santana Alves", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "F", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100109, name: "Giovanna Pires de Albuquerque", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100110, name: "Guilherme Siqueira Guimarães", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "F", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100111, name: "Isabela Ferreira Mendonça", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100112, name: "João Pedro Silveira Barreto", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "F", "28/07": "P" } },
      { id: 100113, name: "Juliana Bastos Figueiredo", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100114, name: "Larissa Carvalho Menezes", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "F", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100115, name: "Lucas Eduardo Brandão Vieira", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100116, name: "Luiza Fernanda Gomes Nogueira", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "F", "23/06": "P", "28/07": "P" } },
      { id: 100117, name: "Matheus Vinícius Rocha Costa", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100118, name: "Natália Cristina Barbosa Lopes", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100119, name: "Pedro Henrique Farias Dutra", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "F", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100120, name: "Rafaela Antunes Medeiros", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100121, name: "Rodrigo Vasconcelos de Moraes", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "F", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100122, name: "Sophia Helena Toledo Dias", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100123, name: "Thiago Augusto Freitas Prado", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100124, name: "Yasmin Vitória Moreira Campos", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 100125, name: "Felipe Nogueira Salgado", enrolledTrimesters: [1, 2], status: 'transferido', attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "F" } }
    ],
    schedule: "10:35 – 12:15",
    days: ["Terça"]
  },
  "CE_IGNACIO_2001": { 
    id: "CE_IGNACIO_2001", 
    name: "IFFC 2001", 
    grade: "2ª Série EM", 
    school: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    discipline: "IFFC (Iniciação Filosófico-Científica)",
    students: [
      { id: 200101, name: "Arthur Felipe dos Santos Prado", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200102, name: "Bernardo Lucas Rezende Silva", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "F", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200103, name: "Carla Regina Pimentel Gomes", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200104, name: "Daniel Rodrigues Magalhães", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "F", "23/06": "P", "28/07": "P" } },
      { id: 200105, name: "Evelyn Cristine Meireles Souza", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200106, name: "Fabricio Antunes Pinheiro", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "F", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200107, name: "Gabriela Vasconcelos Duarte", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200108, name: "Henrique Otávio Sales Guimarães", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "F" } },
      { id: 200109, name: "Isis Maria Nascimento Toledo", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "F", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200110, name: "João Victor Cordeiro Farias", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200111, name: "Kaio Alexandre Brito Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "F", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200112, name: "Lorena Stephanie de Paula Dias", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200113, name: "Marcos Vinicius Esteves Lima", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200114, name: "Nicolle Cristina Morais Castro", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "F", "23/06": "P", "28/07": "P" } },
      { id: 200115, name: "Otávio Augusto Rocha Vilar", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200116, name: "Paloma Beatriz Cunha Ramos", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200117, name: "Renan Douglas Silveira Peixoto", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "F", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200118, name: "Sara Evelyn Fontoura Campos", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200119, name: "Thiago Henrique Bezerra Silva", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200120, name: "Vinicius Gabriel Alcantara Luz", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200121, name: "Yuri Matheus Brandão Vieira", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200122, name: "Zayn Gabriel Martins de Souza", enrolledTrimesters: [1, 2], status: 'transferido', attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "F" } }
    ],
    schedule: "07:00 – 08:40",
    days: ["Terça"]
  },
  "CE_IGNACIO_2002": { 
    id: "CE_IGNACIO_2002", 
    name: "IFLA 2002", 
    grade: "2ª Série EM", 
    school: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    discipline: "IFLA (Iniciação Filosófico-Literária e Artes)",
    students: [
      { id: 200201, name: "Amanda Vitoria Carvalho Diniz", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200202, name: "Breno Augusto Nogueira Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200203, name: "Clara Beatriz Guimarães Melo", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "F", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200204, name: "Diego Miranda Vasconcellos", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "F", "28/07": "P" } },
      { id: 200205, name: "Emanuelle Rocha da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200206, name: "Felipe Gabriel Teles Soares", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200207, name: "Geovanna Lima dos Prazeres", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "F", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200208, name: "Helena Maria Silveira Prado", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200209, name: "Igor Matheus Albuquerque Paz", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200210, name: "Julia Ferreira Fontoura", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "F", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200211, name: "Kauan Vinicius Neves Costa", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200212, name: "Leticia Souza Brandão Dias", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "F", "23/06": "P", "28/07": "P" } },
      { id: 200213, name: "Murilo Ramos Figueiredo", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200214, name: "Natasha Beatriz Farias Lima", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200215, name: "Pablo Henrique Santana Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200216, name: "Raquel Stephanie de Oliveira", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200217, name: "Samuel Lucas Medeiros Barreto", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200218, name: "Talita Cristina Peixoto Silva", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200219, name: "Victor Hugo Antunes de Castro", enrolledTrimesters: [1, 2, 3], attendance: { "12/05": "P", "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } },
      { id: 200220, name: "Yasmin Eduarda Siqueira Meira", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "19/05": "P", "26/05": "P", "02/06": "P", "09/06": "P", "16/06": "P", "23/06": "P", "28/07": "P" } }
    ],
    schedule: "08:40 – 10:20",
    days: ["Terça"]
  },
  "CE_IGNACIO_AP_SEG": { 
    id: "CE_IGNACIO_AP_SEG", 
    name: "AP (Segundas)", 
    grade: "1ª/2ª Série EM", 
    school: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    discipline: "Educação Física (Atividades Práticas)",
    students: [
      { id: 201101, name: "Alan Victor Duarte Gomes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201102, name: "Brenda Vitória Cardoso Rocha", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201103, name: "Cauã Felipe Nascimento Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" } },
      { id: 201104, name: "Débora Cristina Teles Ribeiro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201105, name: "Erick Gabriel Morais Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201106, name: "Fernanda Luiza Salgado Costa", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "F", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201107, name: "Gustavo Henrique Pires Lima", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201108, name: "Ingrid Beatriz Campos Meira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201109, name: "Jonas Miguel Albuquerque Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201110, name: "Larissa Eduarda Farias Toledo", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201111, name: "Lucas Vinicius de Paula Castro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201112, name: "Mirella Cristina Cunha Ramos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201113, name: "Nicolas Gabriel Esteves Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201114, name: "Rebeca Vitoria Barbosa Guimarães", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201115, name: "Samuel Eduardo Rocha Dias", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201116, name: "Vanessa Karoline Medeiros Paz", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 201117, name: "Wallace Fernando Antunes Lima", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } }
    ],
    schedule: "14:00 – 16:00",
    days: ["Segunda"]
  },
  "CE_IGNACIO_AP_SEX": { 
    id: "CE_IGNACIO_AP_SEX", 
    name: "AP (Sextas)", 
    grade: "1ª/2ª Série EM", 
    school: "CE DOUTOR IGNACIO BEZERRA DE MENEZES",
    discipline: "Educação Física (Atividades Práticas)",
    students: [
      { id: 201201, name: "Arthur Rodrigues Vasconcellos", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201202, name: "Beatriz Helena Farias Dutra", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201203, name: "Carlos Daniel Santana Meireles", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "F", "26/06": "P" } },
      { id: 201204, name: "Dandara Vitoria Gomes Castro", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201205, name: "Enzo Gabriel Toledo Nogueira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201206, name: "Fabiana Cristina de Paula Lima", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "F", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201207, name: "Guilherme Augusto Morais Paz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201208, name: "Heloisa Cristina Silveira Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201209, name: "Igor Vinicius Alcantara Silva", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201210, name: "Jessica Eduarda Cardoso Prado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201211, name: "Lucas Henrique Esteves Ramos", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201212, name: "Mariana Vitoria Barbosa Dias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201213, name: "Nathan Gabriel Rocha Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201214, name: "Pamela Cristina Cunha Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201215, name: "Renato Vinicius Farias Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 201216, name: "Sabrina Vitoria Esteves Castro", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } }
    ],
    schedule: "14:00 – 16:00",
    days: ["Sexta"]
  },
  "CIEP369_AP": { 
    id: "CIEP369_AP", 
    name: "AP (Segundas)", 
    grade: "1ª/2ª Série EM", 
    school: "CIEP 369 JORNALISTA SANDRO MOREYRA",
    discipline: "Educação Física (Atividades Práticas)",
    students: [
      { id: 369001, name: "Álvaro Henrique Santana Vieira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369002, name: "Bianca Cristina Teles da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369003, name: "Caio Eduardo Ramos Nogueira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" } },
      { id: 369004, name: "Daniele Stephanie Rocha Meira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369005, name: "Erick Vinicius Alcantara Gomes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369006, name: "Felipe Augusto Silveira Castro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369007, name: "Gabriela Fernanda Toledo Dias", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369008, name: "Henrique Gabriel Morais Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369009, name: "Isabella Vitoria Cardoso Prado", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369010, name: "João Guilherme Esteves Lima", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "F" } },
      { id: 369011, name: "Kauan Felipe Cunha Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369012, name: "Larissa Cristine Farias Dutra", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369013, name: "Mateus Eduardo Vasconcellos Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369014, name: "Natália Stephanie Barbosa Dias", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369015, name: "Pedro Lucas Rocha de Andrade", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369016, name: "Rafaela Cristina de Paula Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369017, name: "Samuel Victor Alcantara Meira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369018, name: "Thais Fernanda Cardoso Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369019, name: "Vitor Gabriel Cunha Nogueira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 369020, name: "Walace Vinicius Santana Castro", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } }
    ],
    schedule: "13:30 – 15:30",
    days: ["Segunda"]
  },
  "CIEP229_EJA": { 
    id: "CIEP229_EJA", 
    name: "EJANEM I01", 
    grade: "EJA EM", 
    school: "CIEP 229 CÂNDIDO PORTINARI",
    discipline: "Educação Física",
    students: [
      { id: 229001, name: "Adenilson Ferreira da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229002, name: "Benedita de Souza Oliveira", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229003, name: "Carlos Roberto dos Santos Filho", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229004, name: "Dilma Maria da Conceição", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229005, name: "Edmilson Pereira de Castro", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229006, name: "Francinete Barbosa de Lima", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229007, name: "Geraldo Magela de Andrade", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "F", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229008, name: "Iracema Rodrigues de Santana", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229009, name: "Jorge Luiz Nascimento Costa", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229010, name: "Katia Cilene Martins Ramos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229011, name: "Lindomar Alves dos Santos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" } },
      { id: 229012, name: "Marivalda Gomes dos Santos", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229013, name: "Nilson Ferreira de Almeida", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229014, name: "Oziel Batista de Medeiros", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229015, name: "Regina Celia Guimarães Farias", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229016, name: "Sebastião Vicente de Souza", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229017, name: "Terezinha de Jesus Carvalho", enrolledTrimesters: [1, 2, 3], attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 229018, name: "Valdemar Silva Nascimento", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } }
    ],
    schedule: "19:40 – 21:20",
    days: ["Segunda"]
  },
  "CIEP476_1001": { 
    id: "CIEP476_1001", 
    name: "Turma 1001", 
    grade: "1ª Série EM", 
    school: "CIEP 476 ELIAS LAZARONI",
    discipline: "Educação Física",
    students: [
      { id: 476101, name: "Alexandre Silva de Oliveira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476102, name: "Beatriz Cristina de Souza Lima", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476103, name: "Caio Cesar Nascimento Farias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "F", "19/06": "P", "26/06": "P" } },
      { id: 476104, name: "Diana Vitoria Ramos Castro", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476105, name: "Eduardo Henrique Esteves Dias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476106, name: "Fernanda Luiza Morais Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476107, name: "Gabriel Vinicius Meira Prado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476108, name: "Helena Beatriz Cunha Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476109, name: "Igor Fernando Rocha Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476110, name: "Julia Vitoria Alcantara Paz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476111, name: "Lucas Gabriel de Paula Soares", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476112, name: "Mariana Cristina Santana Lima", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476113, name: "Nicolas Henrique Barbosa Castro", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476114, name: "Paula Stephanie Toledo Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476115, name: "Renan Victor Farias Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476116, name: "Sabrina Vitoria Esteves Fontes", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } }
    ],
    schedule: "07:00 – 08:40",
    days: ["Sexta"]
  },
  "CIEP476_1002": { 
    id: "CIEP476_1002", 
    name: "Turma 1002", 
    grade: "1ª Série EM", 
    school: "CIEP 476 ELIAS LAZARONI",
    discipline: "Educação Física",
    students: [
      { id: 476201, name: "Alice Maria de Oliveira Ramos", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476202, name: "Bruno Cesar Silveira Castro", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476203, name: "Clara Cristina Alcantara Lima", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476204, name: "Daniel Henrique Meira Prado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476205, name: "Eduarda Vitoria Rocha Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476206, name: "Felipe Gabriel Morais Dias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476207, name: "Giovanna Cristina Santana Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476208, name: "Heitor Vinicius Cunha Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476209, name: "Isis Fernanda Barbosa Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476210, name: "João Pedro de Paula Esteves", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476211, name: "Larissa Stephanie Toledo Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476212, name: "Mateus Gabriel Farias Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476213, name: "Rafaela Vitoria Santana Dias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476214, name: "Vinicius Eduardo Rocha Salgado", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } }
    ],
    schedule: "08:40 – 10:20",
    days: ["Sexta"]
  },
  "CIEP476_2001": { 
    id: "CIEP476_2001", 
    name: "Turma 2001", 
    grade: "2ª Série EM", 
    school: "CIEP 476 ELIAS LAZARONI",
    discipline: "Educação Física",
    students: [
      { id: 476301, name: "Amanda Vitoria de Souza Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476302, name: "Bernardo Henrique Alcantara Lima", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476303, name: "Camila Cristina Morais Prado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476304, name: "Diego Gabriel Cunha Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476305, name: "Emanuelle Vitoria Rocha Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476306, name: "Fabricio Vinicius Silveira Dias", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476307, name: "Gabriela Stephanie Toledo Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476308, name: "Henrique Lucas Farias Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476309, name: "Isabela Cristina Barbosa Prado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476310, name: "João Victor de Paula Salgado", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476311, name: "Leticia Vitoria Morais Cruz", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476312, name: "Matheus Henrique Esteves Fontes", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476313, name: "Paula Cristina Alcantara Meira", enrolledTrimesters: [1, 2, 3], attendance: { "08/05": "P", "15/05": "P", "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } },
      { id: 476314, name: "Thiago Gabriel Santana Salgado", enrolledTrimesters: [2, 3], status: 'entrante', attendance: { "22/05": "P", "29/05": "P", "05/06": "P", "12/06": "P", "19/06": "P", "26/06": "P" } }
    ],
    schedule: "10:35 – 12:15",
    days: ["Sexta"]
  }
};

export const mockUserProfile: UserProfile = {
  id: "user_123",
  name: "André Brito",
  email: "andre.brito@escola.com",
  joinedAt: "Fev 2024",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andre",
  achievements: [
    { id: '1', title: 'Mestre da Estratégia', description: 'Venceu 50 partidas', icon: '🏆' },
    { id: '2', title: 'Foco Total', description: 'Fez 100% nas atividades', icon: '🎯' },
    { id: '3', title: 'Sempre Presente', description: 'Nenhuma falta em 1 mês', icon: '✅' },
  ]
};
