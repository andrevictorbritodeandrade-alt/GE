import { ClassDataMap, UserProfile } from './types';

export const ALLOWED_SCHOOLS = [
  "CE DR. IGNACIO BEZERRA DE MENEZES",
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
  
  if (upper.includes("LAZARONI") || upper.includes("476")) {
    return "CIEP 476 ELIAS LAZARONI";
  }
  if (upper.includes("IGNACIO") || upper.includes("IGNÁCIO") || upper.includes("BEZERRA")) {
    return "CE DR. IGNACIO BEZERRA DE MENEZES";
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

  return null;
}

export const PURGED_CLASS_IDS = new Set([
  "CIEP369_AP",
  "CIEP369_AP101",
  "CE_IGNACIO_AP_SEG",
  "CE_IGNACIO_AP_SEX",
  "CE_IGNACIO_1001",
  "CIEP476_1002",
  "CIEP476_1003",
  "CIEP476_2001"
]);

export function sanitizeAndNormalizeClassData(data: ClassDataMap): { sanitized: ClassDataMap, purgedIds: string[], changed: boolean } {
  const sanitized: ClassDataMap = {};
  const purgedIds: string[] = [];
  let changed = false;

  Object.keys(data || {}).forEach(id => {
    if (PURGED_CLASS_IDS.has(id)) {
      purgedIds.push(id);
      changed = true;
      return;
    }

    const cls = data[id];
    if (!cls) return;

    let updatedCls = { ...cls };

    // Strip any -182106 or -181016 or numerical suffixes from names
    if (updatedCls.name && /-18\d+/.test(updatedCls.name)) {
      updatedCls.name = updatedCls.name.replace(/-18\d+/g, '').trim();
      changed = true;
    }

    // Clean up specific class names
    if (id === '801' && updatedCls.name !== '801') {
      updatedCls.name = '801';
      changed = true;
    }
    if (id === '802' && updatedCls.name !== '802') {
      updatedCls.name = '802';
      changed = true;
    }
    if (id === '803' && updatedCls.name !== '803') {
      updatedCls.name = '803';
      changed = true;
    }
    if (id === 'CIEP369_AP201') {
      if (updatedCls.name !== 'AP 201') {
        updatedCls.name = 'AP 201';
        changed = true;
      }
    }
    if (id === 'CIEP476_1007') {
      if (updatedCls.name !== 'ILG CH 1007') {
        updatedCls.name = 'ILG CH 1007';
        changed = true;
      }
    }
    if (id === 'CIEP476_1001') {
      if (updatedCls.name !== '1001') {
        updatedCls.name = '1001';
        changed = true;
      }
    }

    const normalizedSchool = normalizeSchoolName(updatedCls.school);
    if (!normalizedSchool) {
      // School is not in the allowed schools: purge it!
      purgedIds.push(id);
      changed = true;
    } else {
      if (updatedCls.school !== normalizedSchool) {
        sanitized[id] = { ...updatedCls, school: normalizedSchool };
        changed = true;
      } else {
        sanitized[id] = updatedCls;
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
    name: "801", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
            {
                  "id": 80101,
                  "name": "Alice Vitória Rosa de Sales Ramos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80103,
                  "name": "Ana Luiza da Costa Martins",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "F",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80104,
                  "name": "Ana Luiza Rodrigues da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "F",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80105,
                  "name": "Ana Vitória Farias Correa",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80106,
                  "name": "André Nunes da Silva Lopes",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "F",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "F",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80107,
                  "name": "Andressa da Silva Vieira",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80108,
                  "name": "Andrey de Sousa Santos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80109,
                  "name": "Angelliny de Oliveira Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80110,
                  "name": "Anna Beatriz Souza Lima",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80111,
                  "name": "Anna Karolinny Souza Lima",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80112,
                  "name": "Bianca Santos de Souza Oliveira",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80113,
                  "name": "Camili Oliveira Batista",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80114,
                  "name": "Carolina Caldas Souza",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80115,
                  "name": "Cauã Victor Nobre de Oliveira Lins",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "F",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80116,
                  "name": "Davi Moura da Cruz",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80117,
                  "name": "Davi Sousa Santos da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80118,
                  "name": "Enzo José Jardim Augusto",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80120,
                  "name": "Fernanda Honorato Sabino da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80121,
                  "name": "Gabrieli de Barros Caiana",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80122,
                  "name": "Gabrielly Lima da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "F",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80123,
                  "name": "Geovana Fernandes R. de Andrade",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80124,
                  "name": "Giovanna Kaylane Gonçalves Godoy",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80125,
                  "name": "Guilherme Santos de Jesus",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80126,
                  "name": "Gustavo Nascimento de Jesus",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "F",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 1,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80127,
                  "name": "Hashelly Letícia B. dos Santos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80128,
                  "name": "João Paulo",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80129,
                  "name": "Maria Luisa",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80130,
                  "name": "Miguel de Souza R. do Nascimento",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80131,
                  "name": "Nicolly Baptista do Nascimento",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "F",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 80132,
                  "name": "Richard Josafá V. B. T. Augusto",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "08/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            }
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
      },
      {
        id: "cordelia-801-2026-09-14",
        date: "2026-09-14T12:00:00.000Z",
        plannedActivity: "Lançamento de frequência",
        actualActivity: "Lançamento de frequência e acompanhamento da turma.",
        observations: "Ana Cristina e Ezequiel saíram da turma."
      }
    ]
  },
  "802": { 
    id: "802", 
    name: "802", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
            {
                  "id": 802001,
                  "name": "Henzo Martins da Silva Evangelista",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802002,
                  "name": "Isabella Ribeiro Gomes",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 2.5
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 3
                        }
                  }
            },
            {
                  "id": 802003,
                  "name": "Isabella Vitoria Correa Pereira",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "F",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 3
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3
                        }
                  }
            },
            {
                  "id": 802004,
                  "name": "Isabelly Lopes do Nascimento",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "F",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 3
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3.1
                        }
                  }
            },
            {
                  "id": 802005,
                  "name": "Jhully Victoria C. dos S. de Oliveira",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4.1
                        }
                  }
            },
            {
                  "id": 802006,
                  "name": "João Davi Gomes Pereira",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4.2
                        }
                  }
            },
            {
                  "id": 802007,
                  "name": "João Gabriel Alves da Costa",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802008,
                  "name": "João Marcos Oliveira Ribeiro",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3
                        }
                  }
            },
            {
                  "id": 802009,
                  "name": "Julia Oliveira da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "F",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802010,
                  "name": "Juliana Arueira Luparelli",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "F",
                        "27/07": "F",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 1,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 802011,
                  "name": "Kaique Cruz Gonçalves Damião",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "F",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802012,
                  "name": "Kevin Gabriel Gomes da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802013,
                  "name": "Lara Maria de Sousa Soares",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "F",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 3
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3.1
                        }
                  }
            },
            {
                  "id": 802015,
                  "name": "Lara Vieira de Andrade",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "F",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3.9
                        }
                  }
            },
            {
                  "id": 802016,
                  "name": "Lavinnya de Souza de Araújo",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 3
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 2.9
                        }
                  }
            },
            {
                  "id": 802017,
                  "name": "Laysa Ambrozio Claudio",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 802018,
                  "name": "Leticia Costa Santos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 3
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3
                        }
                  }
            },
            {
                  "id": 802019,
                  "name": "Lívia Duarte Soares de Lima",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 2.5
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 5
                        }
                  }
            },
            {
                  "id": 802020,
                  "name": "Lívia Fernandes Gaiani",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4.5
                        }
                  }
            },
            {
                  "id": 802021,
                  "name": "Luis Fernando Amorim de Deus",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802023,
                  "name": "Manuela Ribeiro dos Santos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 2.5
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 3.5
                        }
                  }
            },
            {
                  "id": 802022,
                  "name": "Manuella Figueiredo da Silva",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 2.2
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 3.4
                        }
                  }
            },
            {
                  "id": 802024,
                  "name": "Manuella Magalhães Martins",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4.1
                        }
                  }
            },
            {
                  "id": 802025,
                  "name": "Maria Rita de Jesus Sergio",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "F",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "grades": {
                        "jogos_do_mundo_802_2026_06_22": 2.2
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.3
                        },
                        "2": {
                              "assignment": 2.5,
                              "participation": 2,
                              "exam": 3.3
                        }
                  }
            },
            {
                  "id": 802026,
                  "name": "Mellyna Santos Spatafora",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "F",
                        "06/07": "P",
                        "27/07": "F",
                        "03/08": "P",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802027,
                  "name": "Sophia Oliveira Ribeiro",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "P",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.1
                        },
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 3.5
                        }
                  }
            },
            {
                  "id": 802014,
                  "name": "Lara Monteiro dos Santos",
                  "enrolledTrimesters": [
                        1,
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "F",
                        "01/06": "P",
                        "06/06": "F",
                        "08/06": "P",
                        "15/06": "P",
                        "22/06": "P",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "P",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "P",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "1": {
                              "participation": 2,
                              "assignment": 2,
                              "exam": 2.2
                        },
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802028,
                  "name": "Kauã Richard Ferreira da Silva",
                  "enrolledTrimesters": [
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "F",
                        "22/06": "P",
                        "06/07": "F",
                        "27/07": "F",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802029,
                  "name": "Gabriel Miguel da Hora",
                  "enrolledTrimesters": [
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "F",
                        "18/05": "F",
                        "25/05": "F",
                        "01/06": "F",
                        "06/06": "F",
                        "08/06": "F",
                        "15/06": "F",
                        "22/06": "F",
                        "06/07": "F",
                        "27/07": "F",
                        "03/08": "F",
                        "10/08": "F",
                        "17/08": "F",
                        "24/08": "F",
                        "31/08": "F",
                        "14/09": "P"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            },
            {
                  "id": 802030,
                  "name": "Ana Cristina Silva Pereira",
                  "enrolledTrimesters": [
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "P",
                        "18/05": "P",
                        "25/05": "P",
                        "01/06": "P",
                        "06/06": "P",
                        "08/06": "F",
                        "15/06": "P",
                        "22/06": "F",
                        "06/07": "P",
                        "27/07": "P",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 3,
                              "participation": 2,
                              "exam": 4.1
                        }
                  }
            },
            {
                  "id": 802031,
                  "name": "Esther Nunes da Costa",
                  "enrolledTrimesters": [
                        2,
                        3
                  ],
                  "attendance": {
                        "11/05": "F",
                        "18/05": "F",
                        "25/05": "F",
                        "01/06": "F",
                        "06/06": "F",
                        "08/06": "F",
                        "15/06": "F",
                        "22/06": "F",
                        "06/07": "F",
                        "27/07": "F",
                        "03/08": "F",
                        "10/08": "P",
                        "17/08": "F",
                        "24/08": "P",
                        "31/08": "F",
                        "14/09": "F"
                  },
                  "trimestreGrades": {
                        "2": {
                              "assignment": 0,
                              "participation": 2,
                              "exam": 4
                        }
                  }
            }
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
      },
      {
        id: "cordelia-802-2026-09-14",
        date: "2026-09-14T12:00:00.000Z",
        plannedActivity: "Lançamento de frequência",
        actualActivity: "Lançamento de frequência e acompanhamento da turma.",
        observations: ""
      }
    ]
  },
  "803": { 
    id: "803", 
    name: "803", 
    grade: "8", 
    school: "EE PROFESSORA CORDELIA PAIVA",
    discipline: "Educação Física",
    students: [
      {
        id: 80301,
        name: "Micaella Moraes Lourenço da Silva",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "F",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "F",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80302,
        name: "Micaelly Vitória Alves de França",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "F",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80303,
        name: "Miguel Lucas Vicente Gomes",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "F",
          "08/06": "F",
          "15/06": "F",
          "22/06": "P",
          "06/07": "F",
          "27/07": "F",
          "03/08": "F",
          "10/08": "F",
          "17/08": "P",
          "24/08": "F",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80304,
        name: "Milena Vitória Tavares de Jesus",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "F",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80305,
        name: "Nicole Archanjo Santos",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "F",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 4.8
          }
        }
      },
      {
        id: 80306,
        name: "Pedro Henryk dos Santos Coelho",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "F",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "F",
          "17/08": "P",
          "24/08": "F",
          "31/08": "F",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 4.9
          }
        }
      },
      {
        id: 80307,
        name: "Pietro Vitor Santos Braga",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "F",
          "01/06": "F",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 4.8
          }
        }
      },
      {
        id: 80308,
        name: "Rafaella Lourenço da Silva Camilo",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80309,
        name: "Richard Reis Costa",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "F",
          "01/06": "P",
          "08/06": "P",
          "15/06": "F",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "F",
          "24/08": "P",
          "31/08": "P",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80310,
        name: "Riquelme Oliveira Carlos",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "F",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80311,
        name: "Roberta Flôr de Liz Araujo da Silva",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80312,
        name: "Ryan Lucas Soares Velasco",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "F",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 4.9
          }
        }
      },
      {
        id: 80313,
        name: "Sarah Rafaela de Souza Ferreira",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "F",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80314,
        name: "Sofia Nascimento de Araujo",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "F",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 3,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80315,
        name: "Sophia Quaresma Jeronymo",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "P",
          "01/06": "P",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "P",
          "03/08": "P",
          "10/08": "P",
          "17/08": "P",
          "24/08": "P",
          "31/08": "P",
          "14/09": "P"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 5
          }
        }
      },
      {
        id: 80316,
        name: "Vitor Manoel Gomes da Silva",
        enrolledTrimesters: [1, 2, 3],
        attendance: {
          "11/05": "P",
          "18/05": "P",
          "25/05": "F",
          "01/06": "F",
          "08/06": "P",
          "15/06": "P",
          "22/06": "P",
          "06/07": "P",
          "27/07": "F",
          "03/08": "P",
          "10/08": "F",
          "17/08": "P",
          "24/08": "F",
          "31/08": "P",
          "14/09": "F"
        },
        trimestreGrades: {
          "1": {
            participation: 2,
            assignment: 2,
            exam: 3
          },
          "2": {
            assignment: 0,
            participation: 2,
            exam: 4.9
          }
        }
      }
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
      },
      {
        id: "cordelia-803-2026-09-14",
        date: "2026-09-14T12:00:00.000Z",
        plannedActivity: "Lançamento de frequência",
        actualActivity: "Lançamento de frequência e acompanhamento da turma.",
        observations: "Ray, João Paulo, Ítalo e Esther saíram da turma."
      }
    ]
  },
  "CIEP369_AP201": {
    id: "CIEP369_AP201",
    name: "AP 201",
    grade: "2ª Série EM",
    school: "CIEP 369 JORNALISTA SANDRO MOREYRA",
    discipline: "Educação Física",
    schedule: "14:25 – 16:05",
    days: ["Quinta"],
    assignments: [
      {
        id: "AP201_TRAB_1",
        title: "Trabalho Avaliativo: Futsal e Voleibol",
        discipline: "Educação Física",
        description: "Mapeamento tático e fundamentos teóricos dos esportes de quadra (Futsal e Voleibol).",
        totalPoints: 10,
        format: "Individual - Escrito",
        dueDate: "30/09/2026"
      }
    ],
    students: [
      { id: 369201, name: "Arthur Mendonça Dias Moreno", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369202, name: "Arthur Peçanha dos Santos Fernandes", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369203, name: "Bruno Coutinho Oliveira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369204, name: "Gabryel Hamurabi do Rosario Barbosa", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369205, name: "Giovanna Vittorya Viana Rodrigues", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369206, name: "Isaac da Silva Pinho", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369207, name: "Jullya Evelly da Silva Rosa", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369208, name: "Kaio Ryan Martins Teixeira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369209, name: "Kayke Santos Machado", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369210, name: "Marco Aurélio Ferreira dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369211, name: "Miguel Ribeiro Pinto", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369212, name: "Nicolly Dias de Souza Fabrício", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369213, name: "Rhyan Enzo Portela da Silva de Lima", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369214, name: "Samara Galasso Sodre", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369215, name: "Sergio Lucas Santos de Almeida", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 369216, name: "Victor Hugo Pecanha Guida", enrolledTrimesters: [1, 2, 3], attendance: {} }
    ]
  },
  "CIEP476_1007": {
    id: "CIEP476_1007",
    name: "ILG CH 1007",
    grade: "1ª Série EM",
    school: "CIEP 476 ELIAS LAZARONI",
    discipline: "ILGCH (Linguagens e Ciências Humanas)",
    schedule: "19:40 – 21:20",
    days: ["Sexta"],
    assignments: [
      {
        id: "A1",
        title: "O Corpo na Mídia - Estereótipo vs. Realidade",
        description: "Pesquisa sobre como corpos negros e periféricos são vistos na mídia.",
        totalPoints: 3,
        dueDate: "22/05/2026",
        discipline: "ILGCH",
        format: "Individual ou dupla"
      }
    ],
    dailyActivities: [
      {
        id: "ciep476-1007-2026-05-08",
        date: "2026-05-08T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "não houve aula a noite, pois a turma tinha sido liberada",
        observations: ""
      },
      {
        id: "ciep476-1007-2026-05-15",
        date: "2026-05-15T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "fui liberado pelo diretor da turma da noite",
        observations: ""
      },
      {
        id: "ciep476-1007-2026-05-22",
        date: "2026-05-22T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "inicio do conteúdo sobre ILGCH e a proposta da disciplina",
        observations: ""
      },
      {
        id: "ciep476-1007-2026-05-29",
        date: "2026-05-29T12:00:00.000Z",
        plannedActivity: "",
        actualActivity: "Aprofundamento da matéria e chamada",
        observations: ""
      }
    ],
    students: [
      { id: 100701, name: "Gabriel Luiz de Souza Bezerra", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100702, name: "Rhyan Pereira Cazimiro", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100703, name: "Pablo da Silva Rios", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100704, name: "João Pedro Samora Soares", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100705, name: "Ketelyn Vitória Vieira Fernandes Nascimento", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100706, name: "Breno Gabriel Santos Reis Ruas", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100707, name: "Anny Camilly Gomes da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100708, name: "Julio Cesar de Sousa Costa", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100709, name: "Andre Luiz Borges da Rocha Filho", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100710, name: "Ana Clara Mendonça Guimarães", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100711, name: "Rafael Santos Pereira da Silva", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } },
      { id: 100712, name: "Vitor Hugo Santos Nascimento", enrolledTrimesters: [1, 2, 3], attendance: { "29/05": "P" } }
    ]
  },
  "CIEP229_EJA": { 
    id: "CIEP229_EJA", 
    name: "EJANEM I01", 
    grade: "EJA EM", 
    school: "CIEP 229 CÂNDIDO PORTINARI",
    discipline: "Educação Física",
    schedule: "19:40 – 21:20",
    days: ["Segunda"],
    students: [
      { id: 229001, name: "Mylena Carapina Duarte", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229002, name: "Vanessa da Silva de Lima", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229003, name: "Regilângela Soares de Souza", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229004, name: "Aparecida de Jesus Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229005, name: "Janaína Gomes Lima da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229006, name: "Felipe da Silva Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229007, name: "Paola da Paz Santos Pinto", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229008, name: "Anderson Amantino da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229009, name: "Kauan de Castro Marcelino", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229010, name: "Wellington Vinicius Silva da Cruz", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229011, name: "Francisca Nayara Batista Teixeira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229012, name: "Phelipe da Silva Porcino", socialName: "Melyssa da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229013, name: "Almir Tavares Nunes", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229014, name: "Edineide Alves de Oliveira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229015, name: "Jozias Ribeiro da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 229016, name: "Rayssa Santos Ramos", enrolledTrimesters: [1, 2, 3], attendance: {} }
    ]
  },
  "CE_IGNACIO_2001": {
    id: "CE_IGNACIO_2001",
    name: "2001",
    grade: "2ª Série EM",
    school: "CE DR. IGNACIO BEZERRA DE MENEZES",
    discipline: "IFFC / Educação Física",
    schedule: "10:40 – 12:20",
    days: ["Terça", "Sexta"],
    assignments: [
      {
        id: "IGNACIO_2001_TRAB_1",
        title: "Pesquisa Temática: Identidade, Cultura Corporal e Sociedade",
        discipline: "Educação Física",
        description: "Pesquisa individual e análise crítica sobre as manifestações corporais, lutas e esportes na contemporaneidade.",
        totalPoints: 3,
        format: "Individual - Escrito",
        dueDate: "26/10/2026"
      }
    ],
    students: [
      { id: 200101, name: "Allyson Davi Costa da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200102, name: "Ana Julia Lourenço dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200103, name: "Fellipe Deyvis Teixeira Felix", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200104, name: "Giullia Vitor Domingos Barbosa", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200105, name: "Hemilly Victória Carvalho Amorim Veloso", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200106, name: "João Ghabriel Lourenço de Souza", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200107, name: "Kamily Vitória Brandão da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200108, name: "Kauã Anderson Pereira da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200109, name: "Kauê Miguel Álvaro dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200110, name: "Luiz Fernando Araújo da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200111, name: "Maria Eduarda Alves da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200112, name: "Maryanna Nascimento Martins", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200113, name: "Matheus Filipi Ferreira da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200114, name: "Melki Abraão da Conceição Pereira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200115, name: "Miguel de Oliveira Santos", enrolledTrimesters: [1, 2, 3], attendance: {} }
    ]
  },
  "CE_IGNACIO_2002": {
    id: "CE_IGNACIO_2002",
    name: "2002",
    grade: "2ª Série EM",
    school: "CE DR. IGNACIO BEZERRA DE MENEZES",
    discipline: "IFLA / Educação Física",
    schedule: "10:40 – 12:20",
    days: ["Terça", "Sexta"],
    assignments: [
      {
        id: "IGNACIO_2002_TRAB_1",
        title: "Pesquisa Temática: Identidade, Cultura Corporal e Sociedade",
        discipline: "Educação Física",
        description: "Pesquisa individual e análise crítica sobre as manifestações corporais, lutas e esportes na contemporaneidade.",
        totalPoints: 3,
        format: "Individual - Escrito",
        dueDate: "26/10/2026"
      }
    ],
    students: [
      { id: 200201, name: "Akilis Rafael de Carvalho Souza", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200202, name: "Alex José Luiza da Cruz", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200203, name: "Alexya Alcântara Pereira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200204, name: "Andrey Vitor Farias Conrado", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200205, name: "Annanda Victoria Santos da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200206, name: "Artur Dias Vieira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200207, name: "Breno Willians de Carvalho Antero Alves", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200208, name: "Cayo Daniel Ferreira Satiro", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200209, name: "Daniel Alexander dos Santos Martins", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200210, name: "Darlany Alves da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200211, name: "Gabriela do Nascimento Bragança", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200212, name: "Geovanna Lourenço dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200213, name: "Gessica da Cruz Munhoes", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200214, name: "Gian Cordeiro Nascimento da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 200215, name: "Giulya Duarte Borges", enrolledTrimesters: [1, 2, 3], attendance: {} }
    ]
  },
  "CIEP476_1001": {
    id: "CIEP476_1001",
    name: "1001",
    grade: "1ª Série EM",
    school: "CIEP 476 ELIAS LAZARONI",
    discipline: "ILGCH (Linguagens e Ciências Humanas)",
    schedule: "07:00 – 08:40",
    days: ["Terça", "Sexta"],
    assignments: [
      {
        id: "CIEP476_1001_TRAB_1",
        title: "Pesquisa Temática: Decolonização de Corpos, Estética e Mídia",
        discipline: "ILGCH",
        description: "Pesquisa individual e análise crítica sobre padrões de corpo, mídias e manifestações corporais.",
        totalPoints: 3,
        format: "Individual - Escrito",
        dueDate: "26/10/2026"
      }
    ],
    students: [
      { id: 100101, name: "Ana Júlia de Souza Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100102, name: "Cristhian Henrique Pessanha de Paula Mattos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100103, name: "Gilberto da Silva Ferreira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100104, name: "Kauê da Silva Lage", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100105, name: "Kauhe do Valle Oliveira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100106, name: "Kaylane do Nascimento Corrêa", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100107, name: "Larissa Fernanda Rodrigues dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100108, name: "Laura Stelet Coelho", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100109, name: "Layane Santiago de Almeida", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100110, name: "Lohany Moraes Mathias", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100111, name: "Lucas Gabriel Tavares da Silva", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100112, name: "Luiz Fellipe Gomes Pereira", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100113, name: "Maicon Douglas da Silva Rocha", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100114, name: "Maicon Ferreira dos Santos", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100115, name: "Maria Eduarda Silva de Souza", enrolledTrimesters: [1, 2, 3], attendance: {} },
      { id: 100116, name: "Maycon Alexandre de Carvalho Antero Circuncizão", enrolledTrimesters: [1, 2, 3], attendance: {} }
    ]
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
