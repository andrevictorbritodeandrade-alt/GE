import { ClassDataMap, UserProfile } from './types';

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
    school: "EE Professora Cordelia Paiva",
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
    school: "EE Professora Cordelia Paiva",
    discipline: "Educação Física",
    students: [
      { id: 802001, name: "Henzo Martins da Silva Evangelista", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" } },
      { id: 802002, name: "Isabella Ribeiro Gomes", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 } },
      { id: 802003, name: "Isabella Vitoria Correa Pereira", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "F" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 } },
      { id: 802004, name: "Isabelly Lopes do Nascimento", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "F" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 } },
      { id: 802005, name: "Jhully Victoria C. dos S. de Oliveira", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802006, name: "João Davi Gomes Pereira", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802007, name: "João Gabriel Alves da Costa", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802008, name: "João Marcos Oliveira Ribeiro", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802009, name: "Julia Oliveira da Silva", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "F" } },
      { id: 802010, name: "Juliana Arueira Luparelli", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "F" } },
      { id: 802011, name: "Kaique Cruz Gonçalves Damião", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802012, name: "Kevin Gabriel Gomes da Silva", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802013, name: "Lara Maria de Sousa Soares", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 } },
      { id: 802015, name: "Lara Vieira de Andrade", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "F", "27/07": "P" } },
      { id: 802016, name: "Lavinnya de Souza de Araújo", attendance: { "11/05": "F", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "F", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 } },
      { id: 802017, name: "Laysa Ambrozio Claudio", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802018, name: "Leticia Costa Santos", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 3.0 } },
      { id: 802019, name: "Lívia Duarte Soares de Lima", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 } },
      { id: 802020, name: "Lívia Fernandes Gaiani", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802021, name: "Luis Fernando Amorim de Deus", attendance: { "11/05": "F", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802023, name: "Manuela Ribeiro dos Santos", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "F", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.5 } },
      { id: 802022, name: "Manuella Figueiredo da Silva", attendance: { "11/05": "P", "18/05": "P", "25/05": "P", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.2 } },
      { id: 802024, name: "Manuella Magalhães Martins", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802025, name: "Maria Rita de Jesus Sergio", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" }, grades: { "jogos_do_mundo_802_2026_06_22": 2.2 } },
      { id: 802026, name: "Mellyna Santos Spatafora", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "F", "27/07": "F" } },
      { id: 802027, name: "Sophia Oliveira Ribeiro", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } },
      { id: 802014, name: "Lara Monteiro dos Santos", attendance: { "11/05": "P", "18/05": "P", "25/05": "F", "01/06": "P", "08/06": "P", "15/06": "P", "22/06": "P", "27/07": "P" } }
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
    school: "EE Professora Cordelia Paiva",
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
    school: "CE Doutor Ignacio Bezerra de Menezes",
    discipline: "ILGCH (Linguagens e Ciências Humanas)",
    students: [],
    schedule: "10:35 – 12:15",
    days: ["Terça"]
  },
  "CE_IGNACIO_2001": { 
    id: "CE_IGNACIO_2001", 
    name: "IFFC 2001", 
    grade: "2ª Série EM", 
    school: "CE Doutor Ignacio Bezerra de Menezes",
    discipline: "IFFC (Iniciação Filosófico-Científica)",
    students: [],
    schedule: "07:00 – 08:40",
    days: ["Terça"]
  },
  "CE_IGNACIO_2002": { 
    id: "CE_IGNACIO_2002", 
    name: "IFLA 2002", 
    grade: "2ª Série EM", 
    school: "CE Doutor Ignacio Bezerra de Menezes",
    discipline: "IFLA (Iniciação Filosófico-Literária e Artes)",
    students: [],
    schedule: "08:40 – 10:20",
    days: ["Terça"]
  },
  "CIEP229_EJA": { 
    id: "CIEP229_EJA", 
    name: "EJANEM I01", 
    grade: "EJA EM", 
    school: "CIEP 229 Cândido Portinari",
    discipline: "Educação Física",
    students: [],
    schedule: "19:40 – 21:20",
    days: ["Segunda"]
  },
  "CIEP369": {
    id: "CIEP369",
    name: "Turma CIEP 369",
    grade: "8",
    school: "CIEP 369",
    discipline: "Educação Física",
    students: [],
    schedule: "14:25 – 16:20",
    days: ["Segunda"]
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
