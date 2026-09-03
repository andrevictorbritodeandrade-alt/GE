export const SLIDES_JOGOS_TABULEIRO = [
  { 
    tipo: 'capa',
    title: 'Jogos de Tabuleiro, Cartas e Mentais',
    subtitle: 'A importância dos jogos de salão na Educação Física',
    dicaProfessor: 'Deixe na tela inicial. Fundo leve, imagens de peças de xadrez ou cartas.'
  },
  {
    tipo: 'texto_simples',
    title: 'Por que jogar na Educação Física?',
    points: [
      'Desenvolvimento mental: estímulo do raciocínio lógico, memória e tomada de decisão rápida e estratégica.',
      'Controle emocional: ensino da paciência, de saber ganhar e também de saber lidar com a derrota.',
      'Interação social: desenvolvimento da socialização fora do ambiente das telas e das redes sociais.',
      'Educação Motora: jogos como Jenga e Pega varetas estimulam a coordenação motora fina.',
      'Esportes da mente: modalides consagradas como Xadrez são consideradas esportes de mente pela exigência e alta concentração.'
    ],
    dicaProfessor: 'Lembrete: o cérebro também comanda nosso corpo. Educação Física abrange a complexidade humana. Dialogar sobre a necessidade de exercitar a mente.'
  },
  {
    tipo: 'texto_simples',
    title: 'Jogos Notáveis',
    points: [
      'Uno e Baralho: Clássicos e dinâmicos para grupos e raciocínio imediato.',
      'Xadrez e Dama: Jogos de estratégia antecipada em longo prazo (esportes de mente).',
      'Sudoku e Tangram: Jogos solitários que desafiam a lógica numérica e espacial geométrica.',
      'Pega Varetas e Jenga: A exigência do corpo na sustentação (micro-motricidade e força isométrica controlada).',
      'Jogo da Memória: Excelentes para estimular funções frontais do cérebro.'
    ],
    dicaProfessor: 'Reúna a turma e pergunto: Qual jogo vocês costumam se dar melhor? Já experimentaram algum desses?'
  }
];

// Factory para novos tipos de slides
const createSlide = (title: string, subtitle: string, content: string, type: string = 'text', theme: string = 'hero') => ({
  title,
  subtitle,
  content,
  type,
  theme
});

export const SLIDES_GENERICOS = {
  'Jogos do Mundo': [
     {
       type: 'capa',
       title: 'Jogos do Mundo: Uma Volta ao Planeta',
       subtitle: 'A herança cultural, histórica e regras dos esportes intelectuais',
       dicaProfessor: 'Organize a sala para um debate. Deixe esse slide no telão enquanto os alunos se organizam.'
     },
     {
       type: 'texto_simples',
       title: '1. Continente Africano',
       subtitle: 'Mancala, Seega e Fanorona',
       content: 'O continente berço da humanidade nos legou formas matemáticas brilhantes de partilha, distribuição e agilidade lógica.',
       points: [
         'Mancala (Oware / Kalah): Semeadura estratégica. O objetivo é colher mais sementes. Semeia-se de forma consecutiva e captura-se ao terminar em cavas específicas.',
         'Seega: Jogo egípcio de posicionamento de peças no deserto. Os jogadores intercalam posições para cercar e eliminar o oponente pelos flancos.',
         'Fanorona: Conhecido jogo de Madagascar com grade geométrica. A captura das peças vizinhas acontece por aproximação ou por recuo rápido na linha.'
       ],
       dicaProfessor: 'Foque em ressaltar que a Mancala é um jogo de semeadura e colheita, que reflete cooperação e economia agrária africana.'
     },
     {
       type: 'texto_simples',
       title: '2. Continente Asiático',
       subtitle: 'Go (Weiqi), Shogi e Mahjong',
       content: 'Estratégia abstrata, análise espacial paciente de territórios e cálculos de probabilidade mental.',
       points: [
         'Go (Weiqi): A complexidade máxima com regras simples. Dois povos demarcam territórios flutuando pedras pretas e brancas em um grid milenar.',
         'Shogi: O Xadrez Japonês. Possibilita a regra inovadora de Drop — você pode posicionar qualquer peça capturada do adversário de volta ao jogo sob seu comando.',
         'Mahjong: Jogo tradicional com peças de bambu/marfim. O objetivo é ordenar melds (sequências ou trincas idênticas) e finalizar com um par perfeito.'
       ],
       dicaProfessor: 'Explique como a regra do Drop no Shogi torna o jogo altamente incisivo e dinâmico.'
     },
     {
       type: 'texto_simples',
       title: '3. Continente Europeu',
       subtitle: 'Xadrez Clássico, Damas e Sueca',
       content: 'O continente que refinou sistemas táticos feudais, esportes mentais olímpicos e hierarquias de poder.',
       points: [
         'Xadrez Clássico: Batalha geométrica com o intuito de dar Xeque-Mate no Rei. Cada classe de peça representa o sistema medieval europeu.',
         'Damas: Jogo ágil focado na diagonal. Saltos obrigatórios de captura com a recompensa de promover a peça comum a Dama livre ao cruzar o tabuleiro.',
         'Sueca: Clássico jogo de baralho em duplas. Vence quem obtiver a maior pontuação acumulada nas vazas definindo um naipe de trunfo surpresa.'
       ],
       dicaProfessor: 'Instigue os alunos explicando que o Xadrez clássico é um esporte da mente olímpico mundial.'
     },
     {
       type: 'texto_simples',
       title: '4. Continente Americano',
       subtitle: 'Truco, Patolli e Conquian',
       content: 'Uma combinação rica de misticismo, teatro e agilidade verbal para desequilibrar o oponente.',
       points: [
         'Truco: O rei do blefe e da expressão corporal na América do Sul. Vence quem convencer o rival que possui as melhores cartas na rodada.',
         'Patolli: Herança mística Azteca. Um jogo ritual de corrida no formato de cruz, utilizando feijões marcados como dados divinos.',
         'Conquian: Precursor astuto de rummy e buraco no México. Jogado com baralho espanhol de 40 cartas para compor de forma matemática trincas e sequências.'
       ],
       dicaProfessor: 'Fale de como o Truco utiliza da dramatização humana e gesticulação facial para intimidar o rival.'
     },
     {
       type: 'texto_simples',
       title: '5. Continente da Oceania',
       subtitle: 'Mu Torere, Surakarta e Hawaiian Kōnane',
       content: 'Desenhos simétricos conectados com as estrelas e a natureza, focados em asfixia espacial do rival.',
       points: [
         'Mu Torere: Jogo Maori (Nova Zelândia) jogado em uma grade de estrela de 8 pontas. O objetivo supremo é encurralar e travar o rival impedindo-o de mover.',
         'Surakarta: Jogo tradicional da Indonésia/Oceania com loops de curvas na borda. Só se capturam peças rivais deslizando taticamente através dos círculos.',
         'Hawaiian Kōnane: Semelhante a damas mas com pedras vulcânicas pretas e brancas na grelha. Salta-se peças para capturas abundantes até que não haja jogadas.'
       ],
       dicaProfessor: 'Discuta sobre a extraordinária facilidade visual e profundidade matemática do Mu Torere que intriga IA modernas.'
     },
     {
       type: 'texto_simples',
       title: 'Próxima Aula: Apresentação Científica',
       subtitle: 'Criação dos Grupos e Oficinas de Trabalho',
       content: 'Iremos formar grupos e produzir nossos próprios jogos de tabuleiro globais para experimentação prática.',
       points: [
         'Divisão da Turma: Organizar grupos estáveis de 4 a 5 alunos.',
         'Escolha do Tema: Cada grupo escolhe um jogo internacional de interesse para pesquisar a fundo suas regras e construir de forma artesanal.',
         'Oficina em Sala: Na próxima semana (22/06), traremos materiais recicláveis (cartolina, tampinhas, papelão) para desenhar e jogar!'
       ],
       dicaProfessor: 'Divida os grupos de forma respeitosa e garanta uma variedade cultural para as oficinas.'
     }
  ],
  'Futebol de Botão': [
    createSlide('Futebol de Botão', 'Arte na mesa', 'Uma invenção brasileira que une tática, paciência e habilidade.', 'capa', 'hero'),
    createSlide('Regras e Tática', 'Como dominar o flick', 'O campo de botão é um campo de xadrez em alta velocidade.', 'text', 'cards'),
  ],
  'Jogos Cooperativos': [
       createSlide('Jogos Cooperativos', 'Ninguém perde', 'A importância de crescer em conjunto.', 'capa', 'hero'),
       createSlide('A Ilha', 'Cooperação radical', 'Todos precisam caber no mesmo espaço reduzido.', 'text', 'cards'),
  ]
};

export const SLIDES_HANDEBOL = [
  {
    title: "HANDEBOL: ROTAÇÕES DE LINHA",
    subtitle: "2º Tri • Aula 26/06 (Correção de Fluxo)",
    content: "OBJETIVO: Conhecer as posições de retaguarda e ataque em quadra.",
    type: "hero",
    theme: "hero"
  },
  {
    title: "A QUADRA DE JOGO",
    points: [
      "LINHA DE 6m: Área exclusiva do goleiro. Ninguém mais pisa!",
      "LINHA DE 9m: Linha pontilhada para cobrança de faltas (Tiro Livre).",
      "DIMENSÕES: 40m de comprimento por 20m de largura."
    ],
    type: "list",
    theme: "cards"
  },
  {
    title: "POSIÇÕES DE ATAQUE",
    points: [
      "PONTAS: Jogam nas extremidades. São rápidos e finalizam com saltos laterais.",
      "ARMADORES: Ficam na linha de 9m. Organizam o jogo e chutam de longe.",
      "PIVÔ: Joga infiltrado no meio da defesa adversária (linha de 6m)."
    ],
    type: "list",
    theme: "theory"
  },
  {
    title: "RETAGUARDA (DEFESA)",
    points: [
      "GOLEIRO: Único que pode tocar a bola com os pés na área.",
      "DEFENSORES BASE: Posicionam-se entre a linha de 6m e 9m.",
      "MARCAÇÃO: O objetivo é bloquear o arremesso e impedir a infiltração."
    ],
    type: "list",
    theme: "theory"
  },
  {
    title: "SISTEMAS TÁTICOS",
    subtitle: "O sistema é escolhido conforme a força do adversário!",
    points: [
      "6:0: Todos os 6 jogadores na linha de área. Barreira humana!",
      "3:3 (MEIO A MEIO): 3 defensores na frente e 3 atrás. Divide a quadra ao meio.",
      "5:1: 5 jogadores na linha e 1 adiantado para atrapalhar o armador."
    ],
    type: "list",
    theme: "cards"
  },
  {
    title: "RESUMO PARA A PROVA",
    points: [
      "PIVÔ: Joga de costas para o gol, criando espaços.",
      "ARMADOR CENTRAL: O 'cérebro' do time, inicia as jogadas.",
      "LINHA DE 6m: Limite máximo para o ataque (não pode pisar).",
      "MEIO A MEIO: Equilíbrio entre defesa recuada e agressiva.",
      "FALTA NO TIRO LIVRE: Cobrada na linha pontilhada (9m)."
    ],
    type: "list",
    theme: "timeline"
  }
];

export const SLIDES_POVOS_ORIGINARIOS = [
  {
    title: "FORMAÇÃO DAS SOCIEDADES GLOBAIS",
    subtitle: "POVOS ORIGINÁRIOS | 1º Ano Ensino Médio | Aula 26/06",
    type: "hero",
    theme: "hero"
  },
  {
    title: "O APAGAMENTO HISTÓRICO",
    content: "A história sob a ótica dos vencidos.",
    type: "hero",
    theme: "quote"
  },
  {
    title: "O MITO DO 'DESCOBRIMENTO'",
    points: [
      "A história oficial frequentemente ignora milênios de evolução social e tecnológica.",
      "A colonização impôs uma visão que apagou a memória de sociedades complexas.",
      "Não houve 'descobrimento', mas sim a invasão de territórios já amplamente habitados e estruturados."
    ],
    type: "list",
    theme: "cards"
  },
  {
    title: "O MUNDO ANTES DE 1500",
    points: [
      "ÁFRICA E ÁSIA: Rotas comerciais globais complexas, universidades antigas e grandes impérios já estabelecidos.",
      "AMÉRICAS: Metrópoles gigantescas como Tenochtitlán (México) e Cahokia (EUA), maiores que as cidades europeias da época.",
      "OCEANIA: Navegadores mestres com profundo conhecimento estelar, perfeitamente integrados ao oceano."
    ],
    type: "list",
    theme: "theory"
  },
  {
    title: "ENGENHARIA NAS AMÉRICAS",
    subtitle: "COMPLEXIDADE PURA",
    content: "Dos terraços agrícolas Incas nas montanhas dos Andes às ilhas flutuantes (chinampas) construídas pelos Astecas no México. Havia um domínio absoluto da matemática, astronomia e uma adaptação arquitetônica.",
    type: "text",
    theme: "cards"
  },
  {
    title: "A TERRA DE PINDORAMA",
    content: "Afunilando para o Brasil antes de 1500.",
    type: "hero",
    theme: "hero"
  },
  {
    title: "DIVERSIDADE ESTRUTURAL",
    points: [
      "AMAZÔNIA: Caciques poderosos, grandes aldeias interligadas e manejo florestal milenar.",
      "LITORAL: Domínio dos povos Tupi-Guarani, organizados em vastas e eficientes redes de trocas.",
      "INTERIOR: Povos Macro-Jê com total domínio das estações, rios e geografia do Cerrado."
    ],
    type: "list",
    theme: "timeline"
  },
  {
    title: "ECONOMIA E CULTURA",
    points: [
      "Agricultura Avançada: Domesticação essencial da mandioca e do milho.",
      "Tecnologia do Solo: A 'Terra Preta de Índio' é uma biotecnologia que fertilizou a Amazônia.",
      "Estruturas Sociais: Decisões tomadas em conselho, rompendo com a rigidez hierárquica feudal da Europa."
    ],
    type: "list",
    theme: "theory"
  },
  {
    title: "UM TERRITORIO POVOADO",
    subtitle: "5 MILHÕES DE HABITANTES (ESTIMATIVA 1500)",
    content: "NÃO ERA UM VAZIO! Havia mais de 1.000 línguas diferentes sendo faladas. O continente era cortado por uma teia impressionante de estradas e alianças, como o famoso Caminho do Peabiru, ligando regiões distantes.",
    type: "text",
    theme: "cards"
  },
  {
    title: "PERSPECTIVA",
    content: "\"O Brasil originário era uma civilização tropical complexa, não um vazio demográfico à espera do colonizador.\" — INSPIRADO EM DARCY RIBEIRO",
    type: "hero",
    theme: "quote"
  },
  {
    title: "NOSSA DÍVIDA TECNOLÓGICA",
    points: [
      "ALIMENTAÇÃO: Mandioca, milho, batata e cacau domesticados por nativos garantem a segurança alimentar mundial hoje.",
      "SUSTENTABILIDADE: O manejo florestal originário é o grande modelo para manter a Floresta Amazônica viva e produtiva.",
      "MEDICINA: Grande parte da ciência médica atual deriva diretamente de princípios ativos botânicos descobertos por eles."
    ],
    type: "list",
    theme: "cards"
  },
  {
    title: "REFLEXÃO FINAL",
    content: "Como a nossa sociedade atual pode honrar e aplicar as engenharias e o conhecimento dos povos nativos?",
    type: "hero",
    theme: "hero"
  }
];

export const SLIDES_LUTA_MARAJOARA = [
  {
    tipo: 'capa',
    type: 'capa',
    titulo: 'LUTA MARAJOARA: O COMBATE ANCESTRAL',
    title: 'LUTA MARAJOARA: O COMBATE ANCESTRAL',
    subtitulo: 'História, Regras Oficiais, Grappling Caboclo e Filosofia • Ilha de Marajó (PA)',
    subtitle: 'História, Regras Oficiais, Grappling Caboclo e Filosofia • Ilha de Marajó (PA)',
    dicaProfessor: 'Deixe esta capa projetada no Datashow enquanto organiza as carteiras e faz a chamada. Apresente a Luta Marajoara como patrimônio imaterial genuinamente brasileiro.',
    professorDica: 'Deixe esta capa projetada no Datashow enquanto organiza as carteiras e faz a chamada. Apresente a Luta Marajoara como patrimônio imaterial genuinamente brasileiro.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: 'ROTEIRO DO PROFESSOR (ORIENTAÇÕES DIDÁTICAS)',
    title: 'ROTEIRO DO PROFESSOR (ORIENTAÇÕES DIDÁTICAS)',
    subtitulo: 'Orientações pedagógicas para condução da aula no Datashow (Não copiar)',
    subtitle: 'Orientações pedagógicas para condução da aula no Datashow (Não copiar)',
    topicos: [
      '1. CONTEXTUALIZAÇÃO: Explicar que o Brasil não depende de modelos orientais ou ocidentais para ter artes marciais nobres; possuímos a Capoeira, o Huka-Huka e a Luta Marajoara.',
      '2. DIFERENÇA VITAL (LUTA x BRIGA): Enfatizar que a briga é agressão descontrolada e crime. A luta tem regras, árbitro, cavalheirismo e preservação absoluta da saúde do oponente.',
      '3. GEOGRAFIA E AMBIENTE: Conectar a luta com o arquipélago do Marajó (PA), o ecossistema de manguezais, campos alagados e a lida com o búfalo-d’água.',
      '4. ADAPTAÇÃO SEGURA EM SALA: Devido ao espaço de sala de aula e pátio, a vivência prática será de base, equilíbrio isométrico e desequilíbrio sutil em duplas, SEM quedas no chão duro.'
    ],
    points: [
      '1. CONTEXTUALIZAÇÃO: Explicar que o Brasil não depende de modelos orientais ou ocidentais para ter artes marciais nobres; possuímos a Capoeira, o Huka-Huka e a Luta Marajoara.',
      '2. DIFERENÇA VITAL (LUTA x BRIGA): Enfatizar que a briga é agressão descontrolada e crime. A luta tem regras, árbitro, cavalheirismo e preservação absoluta da saúde do oponente.',
      '3. GEOGRAFIA E AMBIENTE: Conectar a luta com o arquipélago do Marajó (PA), o ecossistema de manguezais, campos alagados e a lida com o búfalo-d’água.',
      '4. ADAPTAÇÃO SEGURA EM SALA: Devido ao espaço de sala de aula e pátio, a vivência prática será de base, equilíbrio isométrico e desequilíbrio sutil em duplas, SEM quedas no chão duro.'
    ],
    dicaProfessor: 'Avise aos estudantes que haverá momentos de cópia essencial no caderno para fixação dos conceitos e posterior visto pedagógico.',
    professorDica: 'Avise aos estudantes que haverá momentos de cópia essencial no caderno para fixação dos conceitos e posterior visto pedagógico.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '1. ORIGEM HISTÓRICA E O TERRITÓRIO DE MARAJÓ',
    title: '1. ORIGEM HISTÓRICA E O TERRITÓRIO DE MARAJÓ',
    subtitulo: 'Patrimônio Cultural de Natureza Imaterial do Pará (Lei Estadual nº 7.755/2013)',
    subtitle: 'Patrimônio Cultural de Natureza Imaterial do Pará (Lei Estadual nº 7.755/2013)',
    topicos: [
      'BERÇO AMAZÔNICO: Nascida na Ilha de Marajó (Pará), o maior arquipélago fluviomarítimo do planeta Terra, banhado pelo Rio Amazonas e pelo Oceano Atlântico.',
      'ENCONTRO ANCESTRAL: Criada a partir do encontro entre povos indígenas originários (como a etnia Aruá) e os ribeirinhos e vaqueiros caboclos da região.',
      'MOMENTOS DE CELEBRAÇÃO: Tradicionalmente praticada em festas populares e religiosas, como as festas do Glorioso São Sebastião em Cachoeira do Arari, Soure e Salvaterra.',
      'TRANSMISSÃO ORAL: Ensinada de pai para filho pelos mestres vaqueiros, resistindo por gerações como prova viva da cultura corporal do Norte do Brasil.'
    ],
    points: [
      'BERÇO AMAZÔNICO: Nascida na Ilha de Marajó (Pará), o maior arquipélago fluviomarítimo do planeta Terra, banhado pelo Rio Amazonas e pelo Oceano Atlântico.',
      'ENCONTRO ANCESTRAL: Criada a partir do encontro entre povos indígenas originários (como a etnia Aruá) e os ribeirinhos e vaqueiros caboclos da região.',
      'MOMENTOS DE CELEBRAÇÃO: Tradicionalmente praticada em festas populares e religiosas, como as festas do Glorioso São Sebastião em Cachoeira do Arari, Soure e Salvaterra.',
      'TRANSMISSÃO ORAL: Ensinada de pai para filho pelos mestres vaqueiros, resistindo por gerações como prova viva da cultura corporal do Norte do Brasil.'
    ],
    dicaProfessor: 'Mostre a importância do cumprimento da Lei 11.645/08 ao valorizar a matriz indígena e cabocla na Educação Física.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '2. A INSPIRAÇÃO NOS BÚFALOS-D\'ÁGUA',
    title: '2. A INSPIRAÇÃO NOS BÚFALOS-D\'ÁGUA',
    subtitulo: 'A observação da natureza como método de combate corporal',
    subtitle: 'A observação da natureza como método de combate corporal',
    topicos: [
      'OS BÚFALOS DE MARAJÓ: A Ilha de Marajó abriga o maior rebanho de búfalos do Ocidente. Esses animais são o meio de transporte, força e sobrevivência do vaqueiro.',
      'A OBSERVAÇÃO DO CONFRONTO: Os vaqueiros notaram como os búfalos mediam forças: colidiam as testas e empurravam com o pescoço e patas até que um cedesse o território.',
      'SEM LETALIDADE: O confronto entre os animais não visava rasgar ou matar, mas demonstrar superioridade de força e equilíbrio territorial.',
      'TRANSPOSIÇÃO CORPORAL: Os homens reproduziram essa mecânica: projetar a base, colar o tronco, usar os braços como alavancas e empurrar sem desferir golpes.'
    ],
    points: [
      'OS BÚFALOS DE MARAJÓ: A Ilha de Marajó abriga o maior rebanho de búfalos do Ocidente. Esses animais são o meio de transporte, força e sobrevivência do vaqueiro.',
      'A OBSERVAÇÃO DO CONFRONTO: Os vaqueiros notaram como os búfalos mediam forças: colidiam as testas e empurravam com o pescoço e patas até que um cedesse o território.',
      'SEM LETALIDADE: O confronto entre os animais não visava rasgar ou matar, mas demonstrar superioridade de força e equilíbrio territorial.',
      'TRANSPOSIÇÃO CORPORAL: Os homens reproduziram essa mecânica: projetar a base, colar o tronco, usar os braços como alavancas e empurrar sem desferir golpes.'
    ],
    dicaProfessor: 'Peça aos estudantes para pensarem como o ser humano aprende com os animais: da mesma forma que a Capoeira e o Kung Fu imitam bichos, a Luta Marajoara estuda o búfalo.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '3. O CAMPO DE LUTA: AREIA, GRAMA E LAMA',
    title: '3. O CAMPO DE LUTA: AREIA, GRAMA E LAMA',
    subtitulo: 'O círculo natural e o desafio do solo escorregadio',
    subtitle: 'O círculo natural e o desafio do solo escorregadio',
    topicos: [
      'A RODA NO CHÃO: Não existem ringues fechados, grades ou cordas. A luta ocorre dentro de um círculo natural desenhado na terra pelos espectadores.',
      'SOLO TRADICIONAL: Disputada na areia das praias fluviais, na grama dos campos ou na LAMA ÚMIDA (argila das marés baixas amazônicas).',
      'O DESAFIO DA LAMA: Quando lutam na lama, o corpo fica extremamente escorregadio e os pés perdem a tração, exigindo sensibilidade de pegada e equilíbrio refinado.',
      'RESPEITO À TERRA: A argila e a terra são sagradas para o caboclo. Sujar o corpo de barro simboliza a comunhão e a honra com o chão onde se pisa.'
    ],
    points: [
      'A RODA NO CHÃO: Não existem ringues fechados, grades ou cordas. A luta ocorre dentro de um círculo natural desenhado na terra pelos espectadores.',
      'SOLO TRADICIONAL: Disputada na areia das praias fluviais, na grama dos campos ou na LAMA ÚMIDA (argila das marés baixas amazônicas).',
      'O DESAFIO DA LAMA: Quando lutam na lama, o corpo fica extremamente escorregadio e os pés perdem a tração, exigindo sensibilidade de pegada e equilíbrio refinado.',
      'RESPEITO À TERRA: A argila e a terra são sagradas para o caboclo. Sujar o corpo de barro simboliza a comunhão e a honra com o chão onde se pisa.'
    ],
    dicaProfessor: 'Explique que em torneios modernos usa-se tatame ou círculo de areia, mas o festival tradicional raiz preserva a lama como símbolo maior.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '4. O OBJETIVO SUPREMO: AS COSTAS NO CHÃO',
    title: '4. O OBJETIVO SUPREMO: AS COSTAS NO CHÃO',
    subtitulo: 'A mecânica da vitória límpida sem contagem de pontos complexa',
    subtitle: 'A mecânica da vitória límpida sem contagem de pontos complexa',
    topicos: [
      'A QUEDA VÁLIDA (IPPON MARAJOARA): O objetivo absoluto e único da luta é derrubar o adversário e fazer com que suas COSTAS ou OMBROS encostem no chão.',
      'QUEDAS PARCIAIS NÃO VALEM: Se o oponente cair de joelhos, de quatro apoios ou de bruços (com a barriga no solo), a luta NÃO termina.',
      'INTERRUPÇÃO E REINÍCIO: Em caso de queda parcial, o árbitro interrompe o combate e os lutadores retornam imediatamente à posição de pé, no centro do círculo.',
      'DURAÇÃO RÁPIDA: A luta é decidida em rounds dinâmicos de 2 a 3 minutos ou por morte súbita (a primeira queda limpa encerra o combate na hora).'
    ],
    points: [
      'A QUEDA VÁLIDA (IPPON MARAJOARA): O objetivo absoluto e único da luta é derrubar o adversário e fazer com que suas COSTAS ou OMBROS encostem no chão.',
      'QUEDAS PARCIAIS NÃO VALEM: Se o oponente cair de joelhos, de quatro apoios ou de bruços (com a barriga no solo), a luta NÃO termina.',
      'INTERRUPÇÃO E REINÍCIO: Em caso de queda parcial, o árbitro interrompe o combate e os lutadores retornam imediatamente à posição de pé, no centro do círculo.',
      'DURAÇÃO RÁPIDA: A luta é decidida em rounds dinâmicos de 2 a 3 minutos ou por morte súbita (a primeira queda limpa encerra o combate na hora).'
    ],
    dicaProfessor: 'Compare com o Sumô (onde encostar qualquer parte além dos pés perde) e com o Judô (onde o Ippon exige projeção de costas).'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '5. REGRAS TÉCNICAS E SISTEMA DE AGARRE',
    title: '5. REGRAS TÉCNICAS E SISTEMA DE AGARRE',
    subtitulo: 'Modalidade de Grappling puro: alavancas, equilíbrios e rasteiras',
    subtitle: 'Modalidade de Grappling puro: alavancas, equilíbrios e rasteiras',
    topicos: [
      'O ABRAÇO INICIAL: Os lutadores começam curvados, testas próximas, mãos buscando pegadas firmes nos ombros, nuca e tronco do rival.',
      'PEGADAS PERMITIDAS: É permitido agarrar os braços, costas, cintura, quadris e a vestimenta do adversário (bermuda tradicional ou faixa na cintura).',
      'ALAVANCAS E RASTEIRAS: Utilizam-se rasteiras de pé ("calços" e "ganchos") e giros de quadril para tirar o oponente do seu centro de gravidade.',
      'SEM LUTA DE CHÃO: A Luta Marajoara não tem combate no solo! Encostou as costas no chão, o juiz ergue a mão do vencedor e os dois se abraçam.'
    ],
    points: [
      'O ABRAÇO INICIAL: Os lutadores começam curvados, testas próximas, mãos buscando pegadas firmes nos ombros, nuca e tronco do rival.',
      'PEGADAS PERMITIDAS: É permitido agarrar os braços, costas, cintura, quadris e a vestimenta do adversário (bermuda tradicional ou faixa na cintura).',
      'ALAVANCAS E RASTEIRAS: Utilizam-se rasteiras de pé ("calços" e "ganchos") e giros de quadril para tirar o oponente do seu centro de gravidade.',
      'SEM LUTA DE CHÃO: A Luta Marajoara não tem combate no solo! Encostou as costas no chão, o juiz ergue a mão do vencedor e os dois se abraçam.'
    ],
    dicaProfessor: 'Demonstre a postura básica com os pés afastados na largura dos ombros, joelhos semiflexionados e mãos prontas para o contato.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '6. O QUE É TERMINANTEMENTE PROIBIDO (FALTAS)',
    title: '6. O QUE É TERMINANTEMENTE PROIBIDO (FALTAS)',
    subtitulo: 'Regulamento rígido para garantir a integridade e evitar violência',
    subtitle: 'Regulamento rígido para garantir a integridade e evitar violência',
    topicos: [
      '🚫 PROIBIDO GOLPES TRAUMÁTICOS: Socos, tapas, chutes, cotoveladas, joelhadas e cabeçadas geram DESCLASSIFICAÇÃO IMEDIATA.',
      '🚫 PROIBIDO FINALIZAÇÕES ARTICULARES: Não existem chaves de braço, chaves de perna ou torções de dedos.',
      '🚫 PROIBIDO ESTRANGULAMENTOS: É expressamente proibido apertar a traqueia (esganadura), sufocar ou puxar cabelos.',
      '🚫 PROIBIDO ATINGIR OLHOS E GENITAIS: Qualquer conduta desleal ou atitude antidesportiva expulsa o atleta da roda de combate.'
    ],
    points: [
      '🚫 PROIBIDO GOLPES TRAUMÁTICOS: Socos, tapas, chutes, cotoveladas, joelhadas e cabeçadas geram DESCLASSIFICAÇÃO IMEDIATA.',
      '🚫 PROIBIDO FINALIZAÇÕES ARTICULARES: Não existem chaves de braço, chaves de perna ou torções de dedos.',
      '🚫 PROIBIDO ESTRANGULAMENTOS: É expressamente proibido apertar a traqueia (esganadura), sufocar ou puxar cabelos.',
      '🚫 PROIBIDO ATINGIR OLHOS E GENITAIS: Qualquer conduta desleal ou atitude antidesportiva expulsa o atleta da roda de combate.'
    ],
    dicaProfessor: 'Reforce: uma luta sem socos e sem chutes mostra que a inteligência do corpo e o domínio da física superam a força bruta desmedida.'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '7. ÉTICA, FILOSOFIA E "QUEM CAI, LEVANTA"',
    title: '7. ÉTICA, FILOSOFIA E "QUEM CAI, LEVANTA"',
    subtitulo: 'A formação cidadã e o respeito ancestral pelo adversário',
    subtitle: 'A formação cidadã e o respeito ancestral pelo adversário',
    topicos: [
      '"QUEM CAI, LEVANTA": O lema marajoara ensina que a queda é parte da vida. Não há vergonha em cair; a honra está em levantar a cabeça e seguir firme.',
      'O ADVERSÁRIO COMO PARCEIRO: Não existe ódio. Sem o colega em frente, você jamais conseguiria testar seus próprios limites corporais.',
      'CORDIALIDADE OBRIGATÓRIA: O combate sempre se inicia com aperto de mão e termina com um caloroso abraço entre os oponentes.',
      'LEGADO NO MMA MODERNO: Campeões mundiais de MMA (como os irmãos Iuri e Ildemar "Marajó") levaram essa técnica centenária aos maiores palcos mundiais.'
    ],
    points: [
      '"QUEM CAI, LEVANTA": O lema marajoara ensina que a queda é parte da vida. Não há vergonha em cair; a honra está em levantar a cabeça e seguir firme.',
      'O ADVERSÁRIO COMO PARCEIRO: Não existe ódio. Sem o colega em frente, você jamais conseguiria testar seus próprios limites corporais.',
      'CORDIALIDADE OBRIGATÓRIA: O combate sempre se inicia com aperto de mão e termina com um caloroso abraço entre os oponentes.',
      'LEGADO NO MMA MODERNO: Campeões mundiais de MMA (como os irmãos Iuri e Ildemar "Marajó") levaram essa técnica centenária aos maiores palcos mundiais.'
    ],
    dicaProfessor: 'Discuta com a turma a metáfora: "Quantas vezes caímos na vida e precisamos levantar?"'
  },
  {
    tipo: 'texto_simples',
    type: 'texto_simples',
    titulo: '✍️ LOUSA DO ALUNO: REGISTRO NO CADERNO (OBRIGATÓRIO)',
    title: '✍️ LOUSA DO ALUNO: REGISTRO NO CADERNO (OBRIGATÓRIO)',
    subtitulo: 'Copiem no caderno agora. O professor passará nas carteiras dando visto!',
    subtitle: 'Copiem no caderno agora. O professor passará nas carteiras dando visto!',
    topicos: [
      '• 1. ORIGEM: Ilha de Marajó (Pará), criada por povos indígenas e caboclos, inspirada na disputa de força dos búfalos.',
      '• 2. OBJETIVO: Derrubar o oponente até que ele encoste as COSTAS ou OMBROS no chão (queda limpa).',
      '• 3. TERRENO: Praticada em círculo na areia, grama ou lama/argila (sem cordas ou ringues de grade).',
      '• 4. MECÂNICA: Grappling puro (agarre, alavancas e rasteiras). Não há luta no solo.',
      '• 5. PROIBIÇÕES: É proibido socos, chutes, cotoveladas, joelhadas, estrangulamentos ou chaves de articulação.',
      '• 6. FILOSOFIA: "Quem cai, levanta" – Respeito ao adversário e preservação da integridade física.'
    ],
    points: [
      '• 1. ORIGEM: Ilha de Marajó (Pará), criada por povos indígenas e caboclos, inspirada na disputa de força dos búfalos.',
      '• 2. OBJETIVO: Derrubar o oponente até que ele encoste as COSTAS ou OMBROS no chão (queda limpa).',
      '• 3. TERRENO: Praticada em círculo na areia, grama ou lama/argila (sem cordas ou ringues de grade).',
      '• 4. MECÂNICA: Grappling puro (agarre, alavancas e rasteiras). Não há luta no solo.',
      '• 5. PROIBIÇÕES: É proibido socos, chutes, cotoveladas, joelhadas, estrangulamentos ou chaves de articulação.',
      '• 6. FILOSOFIA: "Quem cai, levanta" – Respeito ao adversário e preservação da integridade física.'
    ],
    category: 'LOUSA_ALUNO',
    dicaProfessor: 'Professor: Circule pela sala, tire dúvidas dos alunos e carimbe/viste os cadernos como nota processual de participação.',
    professorDica: 'Professor: Circule pela sala, tire dúvidas dos alunos e carimbe/viste os cadernos como nota processual de participação.'
  },
  {
    tipo: 'destaque_centro',
    type: 'destaque_centro',
    titulo: 'DESAFIO COGNITIVO & VIVÊNCIA PRÁTICA SEGURA',
    title: 'DESAFIO COGNITIVO & VIVÊNCIA PRÁTICA SEGURA',
    texto: '"A FORÇA DE UM POVO SE MEDE PELA SUA CAPACIDADE DE FICAR EM PÉ DIANTE DOS DESAFIOS."',
    content: '"A FORÇA DE UM POVO SE MEDE PELA SUA CAPACIDADE DE FICAR EM PÉ DIANTE DOS DESAFIOS."',
    subtexto: 'Atividade: Em duplas, teste da base do búfalo (sem contato traumático). Reflexão: Por que valorizar as lutas do nosso Brasil?',
    subtitle: 'Atividade: Em duplas, teste da base do búfalo (sem contato traumático). Reflexão: Por que valorizar as lutas do nosso Brasil?',
    dicaProfessor: 'Conduza a vivência segura nas carteiras: mãos espalmadas nos ombros do parceiro para sentir o centro de gravidade e desequilíbrio sem puxões bruscos.'
  }
];

export const CORPO_MIDIA_SLIDES = [
  { title: "DEBATE: CORPO E MÍDIA", subtitle: "Desconstruindo estereótipos com Frantz Fanon e Cida Bento.", type: "text", theme: "hero" },
  { title: "O PONTO DE PARTIDA", content: "Uma reflexão sociológica sobre como a TV e a internet limitam as narrativas sobre corpos negros e periféricos.", type: "text", theme: "quote" },
  { title: "NOSSOS GUIAS TEÓRICOS", points: [
    "**FRANTZ FANON (Sociogenia):** A experiência vivida do negro é marcada pela marcação histórica e social de inferioridade.",
    "**FRANTZ FANON (Epidermização):** A internalização da inferioridade baseada na cor da pele como constructo social.",
    "**CIDA BENTO (Pacto Narcísico):** Mecanismo de autopreservação branca que privilegia seus pares em detrimento da meritocracia real.",
    "**CIDA BENTO (Branquitude):** O poder de definir o que é o 'normal' ou 'humano' universal, excluindo o outro."
  ], type: "list", theme: "theory" },
  { title: "FANON: A SOCIOGENIA", content: "A experiência vivida do negro é marcada pela epidermização da inferioridade – uma construção social que domina o psiquismo.", type: "text", hasImage: true },
  { title: "CIDA BENTO: O PACTO", content: "O Pacto Narcísico da branquitude atua como um sistema que garante privilégios e a manutenção da estrutura de poder, invisibilizando o racismo.", type: "text", hasImage: true },
  { title: "COMO O ESTEREÓTIPO ATUA?", points: ["**HIPERSEXUALIZAÇÃO:** Redução do corpo apenas ao desejo.", "**MARGINALIZAÇÃO:** O corpo negro fora do centro da narrativa.", "**SUBSERVIÊNCIA:** Papéis subalternos reforçados."], type: "list", theme: "cards" },
  { title: "DADOS DA REALIDADE", content: "Fonte: Agência Brasil / Perfil Racial da Imprensa Brasileira.", type: "chart" },
  { title: "CITAÇÃO", content: '"Oh, meu corpo, faça de mim sempre um homem que questiona!" - Frantz Fanon', type: "text", theme: "hero" },
  { title: "EVOLUÇÃO DA REPRESENTAÇÃO", points: ["**DÉCADAS 70-80:** Papéis predominantemente caricatos.", "**ANOS 90-2000:** Primeiros avanços com protagonistas.", "**ATUALMENTE:** Narrativas diversas e combate ao pacto."], type: "list", theme: "timeline" },
  { title: "UM NOVO OLHAR: RESISTÊNCIA", content: "Criadores de conteúdo e jornalistas independentes estão quebrando o pacto narcísico e produzindo novos significados.", type: "text", hasImage: true },
  { title: "CONCLUSÃO E DEBATE", content: "Como podemos descolonizar o nosso olhar midiático e construir novas representações para corpos negros?", type: "text", theme: "hero" }
];


export const SLIDES_3TRI = {
  'Gênero, Sociedade e Esporte': [
    { title: "Gênero, Sociedade e Esporte", subtitle: "O debate do século XXI", type: "hero", dicaProfessor: "Introduza o tema com leveza, perguntando o que eles entendem por 'esporte de menino' vs 'esporte de menina'." },
    { title: "Construção Social", content: "Por que dividimos o esporte por gênero? É biológico ou histórico?", type: "text", dicaProfessor: "Explique brevemente que esportes são construções históricas." },
    { title: "O que é Feminino no Esporte?", points: ["Regras históricas", "Inclusão vs Exclusão", "Papéis sociais"], type: "list", dicaProfessor: "Use exemplos de como regras foram alteradas para incluir ou excluir mulheres." },
    { title: "Reflexão Final", content: "O esporte tem gênero?", type: "hero", dicaProfessor: "Pergunte a opinião deles para iniciar o debate." }
  ],
  'O Apagamento Invisível': [
    { title: "O Apagamento Invisível", subtitle: "Mulheres na Ciência", type: "hero", dicaProfessor: "Contextualize a importância de mulheres na história da ciência." },
    { title: "O Efeito Matilda", content: "Quando o Nobel é dado a homens pelo trabalho de mulheres.", type: "text", dicaProfessor: "Explique o termo efeito Matilda." },
    { title: "Grandes Esquecidas", points: ["Rosalind Franklin", "Lise Meitner", "Jocelyn Bell Burnell"], type: "list", dicaProfessor: "Fale brevemente sobre cada uma delas." },
    { title: "Reflexão", content: "De quem são as glórias da ciência?", type: "hero", dicaProfessor: "Debata sobre autoria e reconhecimento." }
  ],
  'Divisão Sexista do Corpo': [
    { title: "Divisão Sexista", subtitle: "O peso do preconceito", type: "hero", dicaProfessor: "Fale sobre como corpos são julgados." },
    { title: "Corpos de Atletas", points: ["Hipertrofia feminina", "Estética vs Performance", "O julgamento do público"], type: "list", dicaProfessor: "Questione por que esforço feminino é tratado como 'luta contra própria natureza'." },
    { title: "Reflexão", content: "Prática corporal tem gênero?", type: "hero", dicaProfessor: "Finalize perguntando se eles acham que exercício tem gênero." }
  ],
  'Hipersexualização e Espetáculo': [
    { title: "Hipersexualização", subtitle: "O espetáculo do corpo", type: "hero", dicaProfessor: "Inicie debate sobre consumo de mídia esportiva." },
    { title: "Foco na Mídia", content: "Foco na aparência ou na técnica?", type: "text", dicaProfessor: "Analise como imprensa cobra performance masculina e beleza feminina." },
    { title: "Impactos", points: ["Traje versus performance", "Comercialização", "Resistência política"], type: "list", dicaProfessor: "Cite exemplos de uniformes." },
    { title: "Esporte como Espetáculo", content: "Apenas técnica ou apelo comercial?", type: "hero", dicaProfessor: "Reflita sobre valor comercial do corpo." }
  ],
  'Equidade Salarial no Esporte': [
    { title: "Equidade Salarial", subtitle: "Luta por direitos", type: "hero", dicaProfessor: "Aborde o tema econômico." },
    { title: "O Ciclo Vicioso", points: ["Falta de investimento", "Horários ruins", "Baixa audiência"], type: "list", dicaProfessor: "Desenhe no quadro como esse ciclo se mantém." },
    { title: "Igualdade é possível?", content: "Luta global por direitos.", type: "hero", dicaProfessor: "Finalize discutindo a luta das atletas pelo mundo." }
  ],
  'As Pioneiras Olímpicas': [
    { title: "Pioneiras Olímpicas", subtitle: "Legado no Brasil", type: "hero", dicaProfessor: "Apresente Aída dos Santos e Maria Lenk." },
    { title: "Proibições Históricas", points: ["Decreto de Vargas", "Corpo feminino", "Luta pelo esporte"], type: "list", dicaProfessor: "Explique o decreto de Vargas." },
    { title: "O Preço da Liberdade", content: "Eram proibidas de atuar.", type: "hero", dicaProfessor: "Reflita sobre a importância da coragem delas." }
  ],
  'Debate Integrador': [
    { title: "Debate Final", subtitle: "Consolidando o ano", type: "hero", dicaProfessor: "Inicie debate sobre o percurso do ano." },
    { title: "Pontos Chave", points: ["O que ficou?", "O que mudou?", "O futuro no ILGCH"], type: "list", dicaProfessor: "Instigue-os a falar pontos mais impactantes." },
    { title: "O que levamos?", content: "Pense no ano.", type: "hero", dicaProfessor: "Finalize reforçando o pensamento crítico." }
  ],
  'Síntese Final': [
    { title: "Síntese Final", subtitle: "Nosso percurso", type: "hero", dicaProfessor: "Finalize o percurso da disciplina." },
    { title: "Review", content: "Os eixos do ano: Gênero, Ciência, Esporte.", type: "text", dicaProfessor: "Dê visão panorâmica do que foi estudado." },
    { title: "Rumo ao Futuro", content: "Estamos prontos para os próximos passos?", type: "hero", dicaProfessor: "Encerre com fala inspiradora." }
  ]
};

export const ALTINHA_FUTVOLEI_SLIDES = [
  {
    title: "Altinha & Futevôlei",
    subtitle: "Da Roda para a Rede: Uma jornada pelas areias",
    type: "text",
    theme: "hero"
  },
  {
    title: "As Origens",
    content: "Como a paixão nacional pelo futebol encontrou seu espaço na praia.",
    type: "text",
    theme: "hero"
  },
  {
    title: "História nas Areias Cariocas",
    points: [
      "Futevôlei (Anos 60): Nasceu nas praias de Copacabana. Foi uma forma criativa encontrada pelos banhistas para burlar a lei da época que proibia jogar futebol perto da água, utilizando as quadras de vôlei já montadas na areia.",
      "Altinha (Anos 90/00): Popularizou-se mais tarde, com forte presença em Ipanema. Nasceu não como um jogo de pontos, mas como uma exibição de controle, cooperação e espetáculo visual, mantendo a bola no ar sem usar as mãos."
    ],
    type: "list"
  },
  {
    title: "A Arte da Altinha",
    content: "A Altinha é essencialmente um jogo cooperativo. Não há vencedores ou perdedores, o objetivo é coletivo: não deixar a bola cair no chão. Forma-se uma \"roda\" amigável onde os jogadores utilizam extrema técnica, tempo de bola e criatividade para manter a redonda em movimento constante e fluido.",
    type: "text"
  },
  {
    title: "Fundamentos da Altinha",
    points: [
      "Chapa: O passe mais seguro e utilizado na roda. Garante que a bola vá na direção correta, com controle e altura ideal para o próximo parceiro.",
      "Peito e Cabeça: Fundamentais para recepção. Usados para amortecer bolas altas ou fortes, \"matando\" a bola no peito e preparando-a para o toque seguinte.",
      "Acrobacias: Puxetas, bicicletas e voleios. Muito utilizadas para salvar bolas difíceis que estão caindo fora do alcance, além de garantir o \"show\" da roda."
    ],
    type: "list"
  },
  {
    title: "O Desafio do Futevôlei",
    content: "Ao contrário da Altinha, o Futevôlei é puramente competitivo. Jogado geralmente em duplas, o grande objetivo é fazer a bola tocar na areia da quadra adversária. Exige os mesmos excelentes fundamentos de controle corporal da Altinha, mas adiciona a complexidade da rede de 2,20m, limites de quadra, regras de saque e pontuação.",
    type: "text"
  },
  {
    title: "Fundamentos do Futevôlei",
    points: [
      "Saque: O início da disputa do ponto. Exige precisão e força para dificultar ao máximo a recepção da equipe adversária do outro lado da rede.",
      "Recepção & Passe: O primeiro toque após o saque. Crucial para colocar a bola em jogo, geralmente usando o peito para levantar a bola perfeitamente para o parceiro.",
      "Ataque: A finalização da jogada. Pode ser uma \"pingada\" sutil buscando o espaço vazio, ou um forte \"shark attack\" para vencer a defense rival."
    ],
    type: "list"
  },
  {
    title: "A Progressão",
    content: "Construindo a intimidade com a bola antes de enfrentar a rede.",
    type: "text",
    theme: "hero"
  },
  {
    title: "O Caminho do Aprendizado",
    points: [
      "1. Controle: Domínio individual da bola. Embaixadinhas, domínio de coxa, peito e toques na parede.",
      "2. A Roda: Prática da Altinha. Foco total em passes cooperativos, leitura corporal e tempo de bola.",
      "3. Direção: Treinar passes com um alvo fixo na roda, simulando o que será o levantamento na quadra.",
      "4. A Rede: Introdução do obstáculo visual e físico. Transição para o jogo de duplas com regras oficiais."
    ],
    type: "list"
  },
  {
    title: "Por que começar pela Altinha?",
    points: [
      "Desenvolve a \"intimidade\": com a bola sem a pressão psicológica de perder pontos.",
      "Aumenta significativamente: o tempo de reação, reflexo e leitura da trajetória da bola.",
      "Condiciona e prepara: as articulações e a musculatura para a movimentação pesada na areia.",
      "Ensina instintivamente: a importância da altura e da velocidade ideais de um passe.",
      "É extremamente inclusivo: e divertido desde o primeiro dia de prática."
    ],
    type: "list"
  },
  {
    title: "Resumo Comparativo",
    points: [
      "Objetivo Principal: Altinha (Manter a bola no ar) vs Futevôlei (Fazer a bola cair na quadra rival).",
      "Dinâmica de Jogo: Altinha (100% Cooperativa) vs Futevôlei (Altamente Competitiva).",
      "Estrutura & Espaço: Altinha (Roda livre em qualquer lugar) vs Futevôlei (Quadra demarcada com rede de 2,20m).",
      "Limite de Toques: Altinha (Ilimitados dentro da roda) vs Futevôlei (Máximo de 3 toques por equipe)."
    ],
    type: "list"
  },
  {
    title: "Fim de Papo!",
    subtitle: "A teoria está feita. Dúvidas antes do aquecimento?",
    content: "Partiu Areia! ☀️",
    type: "text",
    theme: "hero"
  }
];

export const SLIDES_PARALIMPICO = [
  {
    slideNumber: "1/7",
    category: "ROTEIRO_PROFESSOR",
    title: "1/7 • 🗣️ ROTEIRO DO PROFESSOR: RODA DE ACOLHIMENTO E ESCUTA ATIVA",
    subtitle: "Recepção de Volta das Férias de Julho • Transição para o 2º Trimestre Letivo",
    content: "Exposição inicial e mediação de roda de conversa com a turma (Ensino Fundamental, Médio e EJA). Momento de recepção afetiva, escuta sobre o recesso escolar e explicitação da metodologia de aula teórica em sala de aula sem livro didático.",
    speechScript: [
      "1. Acolhimento Afetuoso e Escuta Ativa: 'Sejam muito bem-vindos de volta! Como foram as férias de julho de vocês? Conseguiram descansar, se divertir ou fazer algo diferente com a família e amigos? Gostaria de ouvir 3 a 4 alunos de forma voluntária sobre o que mais marcou esse período de recesso.'",
      "2. Sensibilização Sobre a Rotina e o Corpo: 'Quando entramos de férias, nossos horários, sono e alimentação mudam. Como o corpo e a mente de vocês sentiram essa transição de hoje pela manhã ao voltar para os horários escolares, carteiras e tarefas?'",
      "3. Contrato Pedagógico e Ausência de Livro Didático: 'Vocês já sabem que em nossa escola não dispomos de livro didático impresso para Educação Física. Por isso, a nossa sala de aula é nosso espaço de reflexão crítica e nosso caderno é nosso livro didático autoral. Tudo o que eu registrar no quadro nesta aula substitui o livro físico e será a matéria oficial para estudo das provas e composição da nota do 2º Trimestre.'",
      "4. Introdução ao Módulo de Inclusão e Paradesporto: 'Hoje abrimos oficialmente a Unidade 2 do nosso plano de ensino. Vamos tratar de um tema fundamental para a vida civil: Inclusão Social, Acessibilidade e o Movimento Paralímpico. Vamos alternar momentos de explicação oral minha (onde vocês apenas escutam e debatem) e momentos de cópia no quadro (onde vocês registram no caderno).'"
    ],
    referencias: [
      "BNCC EF67EF03: Experimentar, fruir e recriar esportes de marca, precisão, invasão e combate, valorizando a inclusão e a diversidade.",
      "SEEDUC-RJ: Diretrizes de Acolhimento, Diagnóstico e Reagrupamento no Retorno do Recesso (2º Trimestre Letivo)."
    ],
    graphicType: "acolhimento_roda",
    dicaProfessor: "Disponha as carteiras em semicírculo ou roda se possível. Dê espaço para os alunos falarem brevemente do recesso para quebrar a ansiedade do retorno antes de iniciar a matéria no quadro."
  },
  {
    slideNumber: "2/7",
    category: "LOUSA_ALUNO",
    title: "2/7 • ✍️ CONTEÚDO NO QUADRO: INCLUSÃO E ACESSIBILIDADE",
    subtitle: "CÓPIA INTEGRAL NO CADERNO (Matéria do Aluno - Estudo para Prova)",
    quadroHeader: "UNIDADE 2: INCLUSÃO SOCIAL E DIREITO AO ESPORTE",
    points: [
      "1. Acolhimento e Convivência: O retorno às aulas fortalece a empatia, a solidariedade e o respeito incondicional às diferenças individuais dentro e fora da escola.",
      "2. Conceito de Inclusão Social: É o processo de garantia do direito de todas as pessoas — independentemente de suas condições físicas, sensoriais ou intelectuais — de participarem ativamente da sociedade com autonomia, dignidade e igualdade de oportunidades.",
      "3. Princípio da Acessibilidade (Lei nº 13.146/2015): É a garantia de utilização, com segurança e autonomia, dos espaços urbanos, edificações, transportes, equipamentos e meios de comunicação por pessoas com deficiência ou mobilidade reduzida.",
      "4. Adaptação do Meio: Não é a pessoa com deficiência que deve se 'mudar' ou se 'isolar', mas sim a sociedade e a escola que devem se adaptar para eliminar todas as barreiras."
    ],
    referencias: [
      "Lei Federal nº 13.146/2015 (Estatuto da Pessoa com Deficiência - LBI, Art. 2º e 3º).",
      "Declaração de Salamanca (UNESCO, 1994) - Princípios de Educação Inclusiva."
    ],
    graphicType: "acessibilidade_quadro",
    dicaProfessor: "Escreva este bloco com letra bem visível no quadro. Aguarde todos os alunos terminarem a cópia antes de passar para o slide seguinte de explicação oral."
  },
  {
    slideNumber: "3/7",
    category: "ROTEIRO_PROFESSOR",
    title: "3/7 • 🗣️ ROTEIRO DO PROFESSOR: HISTÓRIA E EVOLUÇÃO DO PARADESPORTO",
    subtitle: "Roteiro Teórico Completo: Da Reabilitação ao Alto Rendimento Global",
    content: "Exposição oral aprofundada do professor contextualizando a origem, a evolução tecnológica e a importância social e geopolítica do Paradesporto no mundo e no Brasil.",
    speechScript: [
      "1. Contexto Histórico da Pós-Guerra (Stoke Mandeville, 1948): 'Pessoal, prestem muita atenção nesta história. O esporte adaptado não nasceu como entretenimento, mas como sobrevivência humana. Em 1948, no hospital de Stoke Mandeville, na Inglaterra, o neurocirurgião alemão Sir Ludwig Guttmann começou a usar a prática do esporte (inicialmente o tiro com arco e o basquete em cadeira de rodas) para reabilitar veteranos da Segunda Guerra Mundial que haviam sofrido lesão na coluna e paralisia. Naquela época, pessoas com lesão medular eram tratadas pela medicina tradicional como pacientes sem futuro. Guttmann provou que o esporte devolvia a dignidade, a força muscular e a vontade de viver.'",
      "2. A Evolução para os Jogos Paralímpicos (Roma, 1960 e IPC, 1989): 'A iniciativa deu tão certo que em 1960, em Roma (Itália), foram realizados os I Jogos Paralímpicos Oficiais da História, com 400 atletas de 23 países. Em 1989, foi fundado o Comitê Paralímpico Internacional (IPC), consolidando o movimento como o segundo maior evento esportivo do planeta, atrás apenas dos Jogos Olímpicos.'",
      "3. O Brasil como Potência Paralímpica Mundial: 'Vocês sabiam que o Brasil é uma das maiores superpotências mundiais do esporte paralímpico? Nas edições de Rio 2016, Tóquio 2020 e Paris 2024, o Brasil ficou no TOP 10 do quadro geral de medalhas! Temos destaques lendários no Atletismo (com atletas velocistas cegos e amputados), Natação, Futebol de 5 e Bocha Paralímpica.'",
      "4. Desconstruindo o Capacitismo e o Olhar de 'Pena': 'Aqui está o ponto central da nossa reflexão: o que é CAPACITISMO? É o preconceito de achar que a pessoa com deficiência é 'menos capaz' ou 'incapaz'. Muito cuidado: atletas paralímpicos NÃO são 'coitadinhos' ou 'exemplos de caridade'. Eles são atletas de elite de altíssimo rendimento, com rotinas de treino extenuantes de 6 a 8 horas por dia, nutrição rigorosa e tecnologia de ponta, como próteses de fibra de carbono e cadeiras superleves aerodinâmicas.'",
      "5. Pergunta de Impacto para a Turma: 'Vocês já assistiram a uma prova de atletismo com próteses de lâmina de carbono ou a um jogo de Futebol de 5 para cegos? Qual foi a sensação ao ver a velocidade e a precisão desses atletas?'"
    ],
    referencias: [
      "Comitê Paralímpico Internacional (IPC) - Guia Oficial de História Paralímpica.",
      "Comitê Paralímpico Brasileiro (CPB) - O Paradesporto de Alto Rendimento no Brasil.",
      "GUTTMANN, Sir Ludwig. 'Pioneering Work in Paraplegia and Disability Sport' (1976)."
    ],
    graphicType: "historia_paralimpica",
    dicaProfessor: "Use a imagem da lâmina de carbono e das cadeiras esportivas no slide para mostrar a tecnologia aliada à alta performance atlética."
  },
  {
    slideNumber: "4/7",
    category: "LOUSA_ALUNO",
    title: "4/7 • ✍️ CONTEÚDO NO QUADRO: HISTÓRIA E MODALIDADES",
    subtitle: "CÓPIA INTEGRAL NO CADERNO (Resumo dos Fatos e Regras Principais)",
    quadroHeader: "CAPÍTULO 1: HISTÓRIA, REGRAS E MODALIDADES PARALÍMPICAS",
    points: [
      "1. Origem Histórica: O paradesporto nasceu em 1948 na Inglaterra (Stoke Mandeville), idealizado pelo Dr. Ludwig Guttmann para reabilitação de lesionados de guerra. Os I Jogos Paralímpicos ocorreram em Roma (1960).",
      "2. Classificação Funcional: Sistema técnico e médico que avalia e agrupa os atletas conforme o grau de funcionalidade física ou sensorial, garantindo disputas equilibradas e justas.",
      "3. Vôlei Sentado: Disputado em quadra menor (10m x 6m) com rede baixa (1,15m masculino e 1,05m feminino). Regra principal: é obrigatório manter os glúteos em contato com o solo no momento de tocar na bola.",
      "4. Futebol de 5 (Cegos): Praticado por atletas com deficiência visual usando venda nos olhos para nivelamento. A bola possui guizos sonoros internos e a torcida deve permanecer em absoluto silêncio durante a partida.",
      "5. Atletismo e Natação Adaptados: Uso de próteses de fibra de carbono, cadeiras de três rodas e atletas-guia para orientação em pista e piscina."
    ],
    referencias: [
      "World ParaVolley - Official Sit Volleyball Rules & Regulations.",
      "IBSA (International Blind Sports Federation) - Blind Football Rules."
    ],
    graphicType: "volei_sentado_quadro",
    dicaProfessor: "Desenhe no quadro a representação simplificada da quadra de Vôlei Sentado (10x6m) ressaltando a regra do glúteo no chão."
  },
  {
    slideNumber: "5/7",
    category: "ROTEIRO_PROFESSOR",
    title: "5/7 • 🗣️ ROTEIRO DO PROFESSOR: DEBATE SOBRE BARREIRAS E DIREITOS",
    subtitle: "Roteiro Teórico Completo: Tipos de Barreiras, Legislação e Realidade Local",
    content: "Mediação de debate e análise sociológica da realidade dos bairros e da escola (Baixada Fluminense / Maricá), conectando os conceitos da Lei nº 13.146/2015 com a vivência cotidiana dos alunos.",
    speechScript: [
      "1. Diferenciando as Barreiras Físicas (Arquitetônicas e de Transporte): 'Alunos, a Lei nº 13.146/2015 classifica as barreiras que impedem o acesso das pessoas em diferentes tipos. As primeiras são as Barreiras Arquitetônicas e Urbanísticas: calçadas esburacadas, degraus sem rampa, falta de sinalização tátil no chão, portas estreitas que não passam cadeira de rodas e banheiros sem barra de apoio. Também temos as Barreiras de Transporte: ônibus sem elevador funcional ou motoristas que não param para cadeirantes.'",
      "2. Aprofundando as Barreiras Atitudinais e Comunicacionais: 'Mas existe uma barreira ainda mais invisível e cruel: a Barreira Atitudinal. O que é isso? São os comportamentos, os preconceitos, o capacitismo, as piadas de mau gosto, a falta de paciência e a tendência de ignorar ou infantilizar a pessoa com deficiência. Também há a Barreira Comunicacional: faltar intérprete de Libras, braille ou textos legíveis.'",
      "3. Diagnóstico Crítico da Nossa Escola e do Nosso Bairro: 'Agora eu pergunto a vocês de forma bem direta: se um aluno em cadeira de rodas ou cego se matriculasse hoje na nossa turma do CIEP / nossa escola, ele conseguiria sozinho ir do portão até a sala de aula, ao banheiro, ao refeitório e à quadra de Educação Física?'",
      "4. Conexão com o Caminho de Casa até a Escola: 'E no bairro onde vocês moram? As calçadas da rua de vocês permitem que uma pessoa com muleta ou cadeira de rodas circule em um dia de chuva? Por que o poder público muitas vezes esquece da acessibilidade nas periferias?'",
      "5. Síntese do Conceito de Cidadania Ativa: 'Lembrem-se: rampas, sinalização tátil e respeito NÃO SÃO FAVORES nem caridade. São DIREITOS assegurados por lei para que todo cidadão viva com dignidade!'"
    ],
    referencias: [
      "Estatuto da Pessoa com Deficiência (Lei Federal nº 13.146/2015 - Art. 3º - Tipologia das Barreiras).",
      "ABNT NBR 9050: Acessibilidade a Edificações, Espaços, Mapeamentos e Equipamentos Urbanos."
    ],
    graphicType: "barreiras_cidade",
    dicaProfessor: "Estimule os alunos a apontarem locais específicos da escola e do bairro que precisam de reformas de acessibilidade."
  },
  {
    slideNumber: "6/7",
    category: "LOUSA_ALUNO",
    title: "6/7 • ✍️ CONTEÚDO NO QUADRO: EXERCÍCIO AVALIATIVO DE FIXAÇÃO",
    subtitle: "CÓPIA INTEGRAL NO CADERNO + RESPOSTAS INDIVIDUAIS",
    quadroHeader: "CAPÍTULO 2: CAPACITISMO, ATITUDE E EXERCÍCIO AVALIATIVO",
    points: [
      "1. Capacitismo: Preconceito estrutural que discrimina, inferioriza ou duvida da capacidade de pessoas com deficiência.",
      "2. Acessibilidade Atitudinal: Ação consciente de combater preconceitos, eliminar vocabulário ofensivo e garantir a inclusão de todos com respeito.",
      "3. EXERCÍCIO DE FIXAÇÃO NO CADERNO (Copiar e Responder Agora):",
      "   • Q1) O que é Inclusão Social e qual a diferença entre Barreiras Arquitetônicas e Barreiras Atitudinais?",
      "   • Q2) No Vôlei Sentado, qual é a regra fundamental no momento de tocar na bola sobre a quadra?",
      "   • Q3) Cite 2 barreiras de acessibilidade que você observa no seu bairro/escola e proponha uma solução prática de melhoria."
    ],
    referencias: [
      "Exercício de Fixação Teórica para Composição de Nota do 2º Trimestre.",
      "Avaliação Contínua e Diagnóstica de Educação Física • SEEDUC-RJ."
    ],
    graphicType: "exercicio_quadro",
    dicaProfessor: "Dê 10 a 15 minutos para que os alunos respondam individualmente no caderno. Passe pelas carteiras auxiliando quem tem dúvida."
  },
  {
    slideNumber: "7/7",
    category: "ROTEIRO_PROFESSOR",
    title: "7/7 • 🗣️ ROTEIRO DO PROFESSOR: ENCERRAMENTO E VISTO OFICIAL",
    subtitle: "Roteiro Pedagógico Completo: Visto no Caderno, Orientações e Próxima Aula",
    content: "Roteiro de fechamento pedagógico, conferência individual de caderno para atribuição de nota/visto e orientações de continuidade do 2º Trimestre.",
    speechScript: [
      "1. Organização do Tempo e Chamada para Visto: 'Turma, faltam 10 minutos para o término da nossa aula. Peço que todos mantenham seus cadernos abertos sobre as carteiras com a matéria copiada e o exercício respondido.'",
      "2. Passagem pelas Carteiras (Avaliação Formativa): 'Vou passar de bancada em bancada aplicando o visto oficial. Esse visto comprova que vocês têm a matéria no caderno para estudar para a nossa avaliação do 2º Trimestre. Alunos que precisam de mais tempo para copiar ou responder podem continuar enquanto eu vou conferindo.'",
      "3. Valorização do Esforço do Aluno: 'Parabéns pelo capricho nas anotações de hoje! Lembrem-se de que como não temos livro didático físico, a organização do caderno de vocês é a garantia de que vocês têm o conteúdo completo.'",
      "4. Spoiler / Gancho para a Próxima Aula: 'Na nossa próxima aula, vamos dar continuidade a esta Unidade com vivência prática adaptada e discussões críticas sobre Mídia, Redes Sociais e Padrões de Beleza no Esporte!'"
    ],
    referencias: [
      "Plano de Curso Anual 2026 de Educação Física • SEEDUC-RJ.",
      "Ficha de Acompanhamento e Registro de Frequência / Vistos de Caderno."
    ],
    graphicType: "fechamento_visto",
    dicaProfessor: "Carimbe ou assine com data o caderno de cada aluno. Aponte e elogie o esforço individual dos alunos das turmas de Correção de Fluxo e do 8º Ano."
  }
];

export const SLIDES_AULA_INTERATIVA_EM = [
  {
    slideNumber: "1/6",
    type: "capa",
    tipo: "capa",
    title: "A GUERRA PELA SUA MENTE",
    subtitle: "Algoritmos, Dopamina, Telas e Onde Fica o Seu Corpo? (30 a 50 min)",
    dicaProfessor: "🗣️ ROTEIRO (Introdução - 5 min): \"Bom dia, pessoal! Hoje nós vamos iniciar uma discussão crucial sobre uma guerra invisível que está acontecendo agora mesmo, neste exato segundo, dentro do seu bolso. Quem aqui olhou o celular nos últimos 15 minutos? E por quê? Não é bronca! Quero que vocês pensem: vocês escolheram abrir o celular ou sentiram uma 'coceira' física na mão puxando o aparelho? Hoje vamos entender como as gigantes da tecnologia usam a ciência e bilhões de dólares para colonizar nossa atenção e prender nossos corpos, e como podemos retomar o controle de nossa mente e da nossa rotina.\""
  },
  {
    slideNumber: "2/6",
    type: "texto_simples",
    tipo: "texto_simples",
    title: "1. A Armadilha da Dopamina Rápida",
    subtitle: "Como o seu cérebro é enganado pelo feed infinito",
    points: [
      "Dopamina = Neuroquímico do Desejo: É liberada na ANTECIPAÇÃO da novidade (antes mesmo de ver o próximo vídeo).",
      "Efeito Caça-Níquel (Slot Machine): O feed intercala vídeos normais com vídeos incríveis — esse padrão incerto vicia o cérebro.",
      "Fadiga de Foco: Cada notificação fraciona sua atenção. Após 20 min de Reels/TikTok, a capacidade de focar na aula despenca.",
      "Provocação para a Turma: 'Você realmente escolheu ver os últimos 15 vídeos ou o algoritmo te hipnotizou?'"
    ],
    dicaProfessor: "🗣️ ROTEIRO (10 min): \"A dopamina não é o hormônio do prazer, mas do DESEJO e da expectativa de algo novo! No feed infinito (TikTok/Reels), o algoritmo funciona como uma máquina caça-níqueis de cassino: ele intercala posts sem graça com posts maravilhosos para o seu cérebro nunca saber quando virá o prêmio. Isso vicia e cansa sua mente. Após 20 minutos disso, sua capacidade de focar despenca. Vamos propor um desafio: abram agora o celular em 'Tempo de Tela' nas configurações e falem honestamente: quanto tempo passaram nas redes ontem? Vamos descobrir para onde está indo o tempo de vida de vocês.\""
  },
  {
    slideNumber: "3/6",
    type: "texto_simples",
    tipo: "texto_simples",
    title: "2. Corpo Imóvel x Cérebro Acelerado",
    subtitle: "O impacto invisível da tela no seu corpo e na sua rotina",
    points: [
      "Pescoço de Texto (Tech Neck): Inclinar a cabeça para olhar a tela equivale a colocar 27 kg sobre a sua coluna cervical.",
      "Luz Azul e Sono Destruído: Usar celular antes de dormir bloqueia a melatonina. Você acorda exausto mesmo dormindo 8 horas.",
      "Comparação e Ansiedade: Filtros e vidas perfeitas geram a ilusão de que todos estão felizes — menos você.",
      "A Resposta do Corpo: Exercícios físicos e esportes liberam endorfina e serotonina reais, limpando a névoa mental."
    ],
    dicaProfessor: "🗣️ ROTEIRO (10 min): \"Enquanto o seu cérebro está acelerado com dezenas de vídeos de 15 segundos, o seu corpo está estático e curvado. Sabiam que inclinar a cabeça para olhar a tela do celular joga um peso de até 27kg na coluna cervical (Tech Neck)? É como carregar uma criança no pescoço! E a luz azul bloqueia a melatonina, gerando cansaço crônico mesmo dormindo 8 horas. No mental, os filtros geram ansiedade extrema de comparação. Mas o movimento físico libera serotonina e endorfina de verdade! Vamos todos ficar de pé por 10 segundos, alinhar a postura, olhar para cima, respirar fundo e sentir o alívio imediato na coluna. Sinta seu corpo de verdade!\""
  },
  {
    slideNumber: "4/6",
    type: "texto_simples",
    tipo: "texto_simples",
    title: "3. Quem Comanda a Sua Identidade?",
    subtitle: "Decolonize o seu feed e recupere o controle da sua atenção",
    points: [
      "A Bolha de Filtro: O algoritmo só mostra o que te dá raiva ou reforça o que você já pensa. Você para de ver o mundo real.",
      "Se você não paga pelo produto, O PRODUTO É VOCÊ: O seu tempo de vida e atenção são vendidos para anunciantes.",
      "Decolonizar o Tempo Livre: Retomar o comando sobre suas horas sem depender da validação do feed.",
      "Estratégias Hacks: Desativar notificações banais, praticar esportes e criar momentos do dia 'Livre de Telas'."
    ],
    dicaProfessor: "🗣️ ROTEIRO (10 min): \"Tem uma frase famosa no Vale do Silício: 'Se você não paga pelo produto, o produto é você'. O que eles estão vendendo para as marcas anunciantes é o seu tempo de atenção e de vida. Decolonizar o feed significa tomar as rédeas de suas horas reais. Dicas práticas de hackers de atenção: desativem notificações inúteis que servem só para chamar vocês, não durmam com o celular ao lado da cama e usem o esporte como desintoxicação. Se vocês ficassem sem internet por 24 horas inteiras neste final de semana, o que seu corpo e sua mente fariam de divertido e ativo na vida real?\""
  },
  {
    slideNumber: "5/6",
    type: "destaque_centro",
    tipo: "destaque_centro",
    texto: "🔥 DEBATE EXPRESS (10 MINUTOS)",
    subtexto: "Qual é a primeira coisa que você faz ao acordar e a última antes de dormir? Você controla a tela ou a tela te controla?",
    dicaProfessor: "🗣️ ROTEIRO (10 min): \"Agora, turma, vamos debater de forma totalmente sincera e sem julgamentos. Qual é a primeira coisa que você faz ao acordar e a última antes de dormir? É olhar as notificações? Quem aqui já sentiu ansiedade física quando o celular ficou descarregado ou sem internet? Vocês acham que são vocês que controlam as telas ou as telas é que controlam a rotina de vocês? Quero ouvir as opiniões honestas de 4 a 5 alunos.\""
  },
  {
    slideNumber: "6/6",
    type: "texto_simples",
    tipo: "texto_simples",
    title: "✍️ ATIVIDADE PARA O CADERNO (Cópia e Resposta em Aula)",
    subtitle: "Responda individualmente agora. O professor passará nas carteiras dando visto e nota!",
    points: [
      "1) Explique como a DOPAMINA e o efeito 'caça-níquel' (rolagem infinita) mantêm os jovens presos nas redes sociais.",
      "2) Cite 2 impactos FÍSICOS (no corpo) e 1 impacto MENTAL causados pelo uso excessivo de celulares.",
      "3) O que significa a frase: 'Se você não paga pelo produto, o produto é o seu tempo de atenção'?",
      "4) [DESAFIO PESSOAL] Escreva uma meta prática de 3 passos para reduzir seu tempo de tela e praticar uma atividade física nesta semana."
    ],
    dicaProfessor: "🗣️ ROTEIRO (15 min): \"Mantenham os cadernos abertos e canetas na mão. Copiem e respondam a essas 4 perguntas de forma sincera. Podem debater entre si de forma produtiva. Enquanto vocês respondem, eu passarei em cada carteira individualmente para tirar dúvidas, conversar sobre as metas de vocês e já dar o visto e a nota de participação do trimestre direto no caderno! Mãos à obra!\""
  }
];



export const SLIDES_CAPOEIRA = [
    {
      tipo: 'capa',
      type: 'capa',
      titulo: 'LUTAS DO BRASIL: CAPOEIRA',
      title: 'LUTAS DO BRASIL: CAPOEIRA',
      subtitulo: 'Luta, Dança, Ritmo e Resistência Antirracista Ancestral',
      subtitle: 'Luta, Dança, Ritmo e Resistência Antirracista Ancestral',
      dicaProfessor: 'Acolha os alunos e introduza a Capoeira como um monumento de inteligência estratégica e resistência cultural afro-brasileira (Lei 10.639/03).',
      professorDica: 'Acolha os alunos e introduza a Capoeira como um monumento de inteligência estratégica e resistência cultural afro-brasileira (Lei 10.639/03).'
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: 'ROTEIRO DO PROFESSOR (NÃO COPIAR)',
      title: 'ROTEIRO DO PROFESSOR (NÃO COPIAR)',
      subtitulo: 'Diretrizes didáticas para condução no Datashow',
      subtitle: 'Diretrizes didáticas para condução no Datashow',
      topicos: [
        '1. ENREDO DE LUTAS: Conectar a Capoeira com a matriz africana e a Luta Marajoara com a matriz indígena/cabocla.',
        '2. LUTA x BRIGA: Desconstruir o preconceito histórico que associava a Capoeira à vadiagem ou criminalidade.',
        '3. MÚSICA COMO CÓDIGO: Explicar que os toques de berimbau avisavam a aproximação de feitores (toque de Cavalaria).',
        '4. TRABALHO AVALIATIVO: Explicar a construção do jogo africano (Mancala ou Shisima) com materiais recicláveis.'
      ],
      points: [
        '1. ENREDO DE LUTAS: Conectar a Capoeira com a matriz africana e a Luta Marajoara com a matriz indígena/cabocla.',
        '2. LUTA x BRIGA: Desconstruir o preconceito histórico que associava a Capoeira à vadiagem ou criminalidade.',
        '3. MÚSICA COMO CÓDIGO: Explicar que os toques de berimbau avisavam a aproximação de feitores (toque de Cavalaria).',
        '4. TRABALHO AVALIATIVO: Explicar a construção do jogo africano (Mancala ou Shisima) com materiais recicláveis.'
      ],
      dicaProfessor: 'Use tom afirmativo e reflexivo. Deixe claro que a aula teórica no Datashow garante embasamento crítico antes de qualquer movimento.',
      professorDica: 'Use tom afirmativo e reflexivo. Deixe claro que a aula teórica no Datashow garante embasamento crítico antes de qualquer movimento.'
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '1. O CONCEITO DE LUTA: RESPEITO E CULTURA',
      title: '1. O CONCEITO DE LUTA: RESPEITO E CULTURA',
      subtitulo: 'Diferenciando definitivamente Luta de Briga',
      subtitle: 'Diferenciando definitivamente Luta de Briga',
      topicos: [
        'REGRAS E ÉTICA: As lutas possuem regras claras, árbitro, tradição milenar e o dever ético de proteger o oponente.',
        'BRIGA É VIOLÊNCIA: Briga não tem regras, busca ferir, humilhar e destruir. É caso de polícia e infração disciplinar.',
        'AUTODEFESA E LIBERDADE: As lutas nasceram como ferramentas de sobrevivência, caça e libertação de povos oprimidos.',
        'MATRIZES BRASILEIRAS: O Brasil possui tradições marciais ímpares: Capoeira (africana), Luta Marajoara (cabocla) e Huka-Huka (indígena).'
      ],
      points: [
        'REGRAS E ÉTICA: As lutas possuem regras claras, árbitro, tradição milenar e o dever ético de proteger o oponente.',
        'BRIGA É VIOLÊNCIA: Briga não tem regras, busca ferir, humilhar e destruir. É caso de polícia e infração disciplinar.',
        'AUTODEFESA E LIBERDADE: As lutas nasceram como ferramentas de sobrevivência, caça e libertação de povos oprimidos.',
        'MATRIZES BRASILEIRAS: O Brasil possui tradições marciais ímpares: Capoeira (africana), Luta Marajoara (cabocla) e Huka-Huka (indígena).'
      ],
      category: 'LOUSA_ALUNO'
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '2. ORIGEM: SENZALAS E QUILOMBOS',
      title: '2. ORIGEM: SENZALAS E QUILOMBOS',
      subtitulo: 'A arte marcial gestada na dor e forjada na liberdade',
      subtitle: 'A arte marcial gestada na dor e forjada na liberdade',
      topicos: [
        'SÉCULO XVI: Desenvolvida no Brasil colonial por africanos escravizados de diversas etnias (especialmente bantos/angolanos).',
        'DISFARCE DE DANÇA: Como o treinamento marcial era punido com tortura e morte, os escravizados uniram cânticos, palmas e instrumentos para que parecesse apenas uma dança inofensiva.',
        'ARMAS DO CORPO: Proibidos de portar armas de ferro, os capoeiristas transformaram os pés, pernas, cabeça e cotovelos em armas velozes e precisas.',
        'QUILOMBOS COMO FORTALEZA: Nos quilombos (como o Quilombo dos Palmares), a Capoeira foi a principal tática de guerrilha contra capitães-do-mato.'
      ],
      points: [
        'SÉCULO XVI: Desenvolvida no Brasil colonial por africanos escravizados de diversas etnias (especialmente bantos/angolanos).',
        'DISFARCE DE DANÇA: Como o treinamento marcial era punido com tortura e morte, os escravizados uniram cânticos, palmas e instrumentos para que parecesse apenas uma dança inofensiva.',
        'ARMAS DO CORPO: Proibidos de portar armas de ferro, os capoeiristas transformaram os pés, pernas, cabeça e cotovelos em armas velozes e precisas.',
        'QUILOMBOS COMO FORTALEZA: Nos quilombos (como o Quilombo dos Palmares), a Capoeira foi a principal tática de guerrilha contra capitães-do-mato.'
      ],
      category: 'LOUSA_ALUNO'
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '3. A RODA, O RITMO E OS INSTRUMENTOS',
      title: '3. A RODA, O RITMO E OS INSTRUMENTOS',
      subtitulo: 'A orquestra sagrada que comanda a velocidade do jogo',
      subtitle: 'A orquestra sagrada que comanda a velocidade do jogo',
      topicos: [
        'O BERIMBAU COMO COMANDANTE: O berimbau comanda o ritmo da roda. São 3 tipos: Gunga (grave/comando), Médio (marcação) e Viola (agudo/improviso).',
        'BATERIA COMPLETA: Composta por berimbaus, atabaque (pulsação terrena), pandeiros, agogô e reco-reco.',
        'A CHULA E A LADAINHA: Os cânticos preservam a memória histórica oral, contam façanhas de heróis quilombolas e transmitem ensinamentos filosóficos.',
        'A RODA: Espaço circular onde todos são iguais em energia, batendo palmas no tempo e respondendo ao coro coletivo.'
      ],
      points: [
        'O BERIMBAU COMO COMANDANTE: O berimbau comanda o ritmo da roda. São 3 tipos: Gunga (grave/comando), Médio (marcação) e Viola (agudo/improviso).',
        'BATERIA COMPLETA: Composta por berimbaus, atabaque (pulsação terrena), pandeiros, agogô e reco-reco.',
        'A CHULA E A LADAINHA: Os cânticos preservam a memória histórica oral, contam façanhas de heróis quilombolas e transmitem ensinamentos filosóficos.',
        'A RODA: Espaço circular onde todos são iguais em energia, batendo palmas no tempo e respondendo ao coro coletivo.'
      ]
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '4. MOVIMENTOS E A GINGA',
      title: '4. MOVIMENTOS E A GINGA',
      subtitulo: 'Equilíbrio contínuo, esquiva e malícia corporal',
      subtitle: 'Equilíbrio contínuo, esquiva e malícia corporal',
      topicos: [
        'A GINGA: O passo fundamental. É uma movimentação contínua de vaivém corporal que não permite ao oponente prever de onde virá o golpe ou a esquiva.',
        'ESQUIVAS: Ao invés de bloquear golpes com força bruta (como no karatê), o capoeirista se esquiva (esquiva baixa, lateral, cocorinha), usando o chão como refúgio.',
        'GOLPES TRAUMÁTICOS E GIRATÓRIOS: Meia-lua de compasso, armada, queixada, martelo e cabeçada.',
        'MALÍCIA (MANDINGA): A inteligência de simular um movimento para desferir outro, ludibriando o adversário com elegância corporal.'
      ],
      points: [
        'A GINGA: O passo fundamental. É uma movimentação contínua de vaivém corporal que não permite ao oponente prever de onde virá o golpe ou a esquiva.',
        'ESQUIVAS: Ao invés de bloquear golpes com força bruta (como no karatê), o capoeirista se esquiva (esquiva baixa, lateral, cocorinha), usando o chão como refúgio.',
        'GOLPES TRAUMÁTICOS E GIRATÓRIOS: Meia-lua de compasso, armada, queixada, martelo e cabeçada.',
        'MALÍCIA (MANDINGA): A inteligência de simular um movimento para desferir outro, ludibriando o adversário com elegância corporal.'
      ]
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '5. PERSEGUIÇÃO PENAL E RECONHECIMENTO',
      title: '5. PERSEGUIÇÃO PENAL E RECONHECIMENTO',
      subtitulo: 'Do Código Penal de 1890 ao título da UNESCO',
      subtitle: 'Do Código Penal de 1890 ao título da UNESCO',
      topicos: [
        'CRIMINALIZAÇÃO (1890): Após a abolição da escravidão, o Código Penal Republicano no art. 402 proibiu a prática da capoeira nas ruas, com pena de cadeia e trabalho forçado na Ilha de Fernando de Noronha.',
        'MESTRE BIMBA (1930): Manuel dos Reis Machado criou a "Capoeira Regional" e fundou a primeira academia com regras pedagógicas em Salvador, demonstrando a arte ao presidente Getúlio Vargas.',
        'LIBERAÇÃO LEGAL: Em 1937, Vargas declarou a Capoeira como "único esporte verdadeiramente nacional".',
        'PATRIMÔNIO DA HUMANIDADE: Em 2014, a Roda de Capoeira foi declarada Patrimônio Cultural Imaterial da Humanidade pela UNESCO.'
      ],
      points: [
        'CRIMINALIZAÇÃO (1890): Após a abolição da escravidão, o Código Penal Republicano no art. 402 proibiu a prática da capoeira nas ruas, com pena de cadeia e trabalho forçado na Ilha de Fernando de Noronha.',
        'MESTRE BIMBA (1930): Manuel dos Reis Machado criou a "Capoeira Regional" e fundou a primeira academia com regras pedagógicas em Salvador, demonstrando a arte ao presidente Getúlio Vargas.',
        'LIBERAÇÃO LEGAL: Em 1937, Vargas declarou a Capoeira como "único esporte verdadeiramente nacional".',
        'PATRIMÔNIO DA HUMANIDADE: Em 2014, a Roda de Capoeira foi declarada Patrimônio Cultural Imaterial da Humanidade pela UNESCO.'
      ]
    },
    {
      tipo: 'texto_simples',
      type: 'texto_simples',
      titulo: '✍️ LOUSA DO ALUNO: REGISTRO NO CADERNO (OBRIGATÓRIO)',
      title: '✍️ LOUSA DO ALUNO: REGISTRO NO CADERNO (OBRIGATÓRIO)',
      subtitulo: 'Copiem com atenção. Registro essencial para avaliação processual',
      subtitle: 'Copiem com atenção. Registro essencial para avaliação processual',
      topicos: [
        '• 1. ORIGEM: Criada por africanos escravizados no Brasil (séc. XVI) como forma de autodefesa e resistência.',
        '• 2. DISFARCE: Associada à música, canto e palmas para que os feitores não percebessem o treinamento marcial.',
        '• 3. INSTRUMENTO PRINCIPAL: O Berimbau (Gunga, Médio e Viola) comanda o ritmo e a velocidade do jogo.',
        '• 4. MOVIMENTO BASE: A Ginga (movimento oscilante de braços e pernas que permite ataque e esquiva contínuos).',
        '• 5. HISTÓRIA LEGAL: Foi proibida no Código Penal de 1890 e legalizada nos anos 1930 por Mestre Bimba.',
        '• 6. UNESCO (2014): Declarada Patrimônio Cultural Imaterial da Humanidade.'
      ],
      points: [
        '• 1. ORIGEM: Criada por africanos escravizados no Brasil (séc. XVI) como forma de autodefesa e resistência.',
        '• 2. DISFARCE: Associada à música, canto e palmas para que os feitores não percebessem o treinamento marcial.',
        '• 3. INSTRUMENTO PRINCIPAL: O Berimbau (Gunga, Médio e Viola) comanda o ritmo e a velocidade do jogo.',
        '• 4. MOVIMENTO BASE: A Ginga (movimento oscilante de braços e pernas que permite ataque e esquiva contínuos).',
        '• 5. HISTÓRIA LEGAL: Foi proibida no Código Penal de 1890 e legalizada nos anos 1930 por Mestre Bimba.',
        '• 6. UNESCO (2014): Declarada Patrimônio Cultural Imaterial da Humanidade.'
      ],
      category: 'LOUSA_ALUNO'
    },
    {
      tipo: 'destaque_centro',
      type: 'destaque_centro',
      titulo: 'TRABALHO AVALIATIVO (2º TRIMESTRE)',
      title: 'TRABALHO AVALIATIVO (2º TRIMESTRE)',
      texto: 'CONSTRUÇÃO DE JOGOS AFRICANOS: TABULEIRO DE SHISIMA OU MANCALA',
      content: 'CONSTRUÇÃO DE JOGOS AFRICANOS: TABULEIRO DE SHISIMA OU MANCALA',
      subtexto: 'Construir em casa com papelão/caixa de ovos/tampinhas e entregar na data estipulada (Vale 3,0 pontos).',
      subtitle: 'Construir em casa com papelão/caixa de ovos/tampinhas e entregar na data estipulada (Vale 3,0 pontos).',
      dicaProfessor: 'Explique que a próxima aula explorará a Luta Marajoara para concluir o ciclo das lutas do Brasil!'
    }
];
