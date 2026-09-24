export interface SlideItem {
  id: number;
  tipo: 'capa' | 'discussao' | 'conceito' | 'dados' | 'literatura' | 'atividade' | 'fechamento' | 'texto_simples' | string;
  titulo: string;
  subtitulo?: string;
  imagem_url?: string;
  topicos?: string[];
  notas?: string;
  // Aliases for compatibility
  title?: string;
  subtitle?: string;
  dicaProfessor?: string;
  points?: string[];
  content?: string;
  texto?: string;
}

export interface AulaItem {
  id: string;
  titulo: string;
  titulo_aula?: string;
  subtitulo?: string;
  data: string;
  tags: string[];
  status: 'AULA ATUAL' | 'AGUARDANDO' | 'CONCLUÍDA' | string;
  descricao: string;
  modulo?: string;
  slides: SlideItem[];
}

export const CRONOGRAMA_3TRI_AULAS: AulaItem[] = [
  {
    id: "aula_1",
    titulo: "AULA 1",
    titulo_aula: "HOMEM NÃO CHORA?",
    subtitulo: "Saúde Mental e Valorização da Vida",
    data: "19/09",
    tags: ["SETEMBRO AMARELO", "GÊNERO", "SAÚDE MENTAL"],
    status: "CONCLUÍDA",
    descricao: "Desconstrução de estereótipos de gênero e introdução à saúde mental.",
    modulo: "Setembro Amarelo",
    slides: [
      { id: 1, tipo: "capa", titulo: "Setembro Amarelo", subtitulo: "Homem Não Chora? Desconstruindo Estigmas", imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop", notas: "Abrir a aula com acolhimento." },
      { id: 2, tipo: "discussao", titulo: "Homem não chora?", subtitulo: "Ou homem pode chorar?", imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", topicos: ["O que vocês já ouviram sobre demonstrar fraqueza?", "De onde vem a ideia da rocha inabalável?"], notas: "Anotar as respostas no quadro." },
      { id: 3, tipo: "conceito", titulo: "Saúde Mental", subtitulo: "Mais do que ausência de doença", imagem_url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=800&auto=format&fit=crop", topicos: ["Estado de bem-estar", "Lidar com estresses normais"], notas: "Saúde mental é um direito fundamental." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Canais de Ajuda", imagem_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop", topicos: ["CVV 188", "Apoio pedagógico"], notas: "Ninguém está sozinho." }
    ]
  },
  {
    id: "aula_2",
    titulo: "AULA 2",
    titulo_aula: "AS RAÍZES DO SILÊNCIO",
    subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
    data: "25/09",
    tags: ["SETEMBRO AMARELO", "SAÚDE MENTAL", "RACISMO"],
    status: "CONCLUÍDA",
    descricao: "Marcadores sociais, racismo e o sofrimento psíquico com base em Conceição Evaristo.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "As Raízes do Silêncio",
        subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
        imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Retomar o clima de respeito da aula anterior. Avisar que a aula traz dados, literatura e discussão social. Dizer que pode ser um tema pesado e que todos podem se sentir à vontade para falar ou apenas ouvir."
      },
      {
        id: 2,
        tipo: "objetivos",
        titulo: "Objetivos da Aula",
        subtitulo: "",
        imagem_url: "",
        topicos: [
          "Compreender como fatores sociais, raciais e econômicos afetam a saúde mental",
          "Conhecer dados sobre suicídio entre jovens negros e indígenas",
          "Refletir sobre a literatura de Conceição Evaristo como espelho da realidade",
          "Entender o conceito de interseccionalidade"
        ],
        notas: "Apresentar rapidamente. Dizer que a aula conecta o que foi visto na Aula 1 com a realidade social brasileira."
      },
      {
        id: 3,
        tipo: "retomada",
        titulo: "De onde vem o silêncio?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Na Aula 1, falamos sobre gênero e repressão dos sentimentos",
          "Vimos que homens são ensinados a 'engolir o choro'",
          "Mas será que esse silêncio atinge todo mundo da mesma forma?",
          "Hoje vamos olhar para raça, classe, etnia, gênero e sexualidade"
        ],
        notas: "Perguntar o que os alunos lembram da aula anterior. Conectar com o novo tema."
      },
      {
        id: 4,
        tipo: "conceito",
        titulo: "O Sofrimento Não é Só Individual",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "A dor psicológica tem raízes sociais",
          "Racismo, pobreza, violência e discriminação adoecem",
          "O que parece 'problema pessoal' muitas vezes é reflexo de uma estrutura",
          "Prevenir o suicídio é também enfrentar essas estruturas"
        ],
        notas: "Explicar que não é para culpar o indivíduo. É para ampliar o olhar. Dizer que a sociedade adoece as pessoas."
      },
      {
        id: 5,
        tipo: "literatura",
        titulo: "Literatura como Espelho",
        subtitulo: "Conceição Evaristo – Canção para Ninar Menino Grande",
        imagem_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Conceição Evaristo é uma das maiores escritoras brasileiras",
          "O livro conta a história de Fio Jasmim, um homem negro",
          "Desde a infância, sua subjetividade é marcada por tensões e silêncios",
          "O silêncio é a resposta que ele encontra para sobreviver"
        ],
        notas: "Apresentar a autora e o livro. Dizer que é ficção, mas fala de realidades. Perguntar se alguém já leu algo dela."
      },
      {
        id: 6,
        tipo: "discussao",
        titulo: "Lendo Fio Jasmim",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Trecho selecionado do livro (ler em voz alta)",
          "Por que Fio Jasmim não fala sobre o que sente?",
          "O que o silêncio dele representa?",
          "Quem mais na sociedade é silenciado?"
        ],
        notas: "Ler um trecho curto e impactante. Deixar os alunos falarem. Mediar para não romantizar o silêncio. Conectar com a Aula 1 (homem não chora)."
      },
      {
        id: 7,
        tipo: "dados",
        titulo: "Jovens Negros e Suicídio",
        subtitulo: "Os números da desigualdade",
        imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "A cada 10 jovens que tiram a própria vida no Brasil, 6 são negros",
          "Homens negros de 10 a 29 anos têm 45% mais risco de suicídio",
          "A taxa entre jovens negros é de 31,2 por 100 mil habitantes",
          "O racismo estrutural e a discriminação cotidiana adoecem"
        ],
        notas: "Apresentar os dados com cuidado e seriedade. Explicar que o racismo é um determinante social de saúde. Não deixar a discussão virar apenas número: são vidas."
      },
      {
        id: 8,
        tipo: "dados",
        titulo: "Povos Indígenas e Saúde Mental",
        subtitulo: "A maior taxa do país",
        imagem_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "A taxa de suicídio entre indígenas é a maior do Brasil: 62,7 por 100 mil",
          "Entre homens indígenas de 20 a 24 anos, a taxa chega a 107,9 por 100 mil",
          "Causas: perda de território, marginalização, violência, apagamento cultural",
          "O risco de suicídio é 10,7 vezes maior após sofrer violência interpessoal"
        ],
        notas: "Contextualizar com o histórico de violência contra os povos originários. Destacar que a perda da terra e da identidade é uma dor coletiva. Conectar com a resistência indígena."
      },
      {
        id: 9,
        tipo: "conceito",
        titulo: "Interseccionalidade",
        subtitulo: "A multiplicação das vulnerabilidades",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Conceito criado por Kimberlé Crenshaw e desenvolvido por Akotirene no Brasil",
          "Os marcadores sociais não operam isolados: raça, classe, gênero, sexualidade e território se cruzam",
          "A combinação desses fatores potencializa o sofrimento e a vulnerabilidade",
          "Exemplo: um jovem negro, pobre e LGBTQIA+ enfrenta barreiras multiplicadas"
        ],
        notas: "Explicar o conceito de forma simples e visual. Usar o exemplo do cruzamento de ruas (de onde vem a palavra). Mostrar que não é uma 'soma' de preconceitos, mas uma experiência única de opressão."
      },
      {
        id: 10,
        tipo: "atividade",
        titulo: "Atividade em Duplas: Mapeando os Silêncios",
        subtitulo: "",
        imagem_url: "",
        topicos: [
          "Em duplas, conversem e anotem:",
          "1. Quais grupos na nossa sociedade têm mais dificuldade de ter sua dor ouvida?",
          "2. Que 'frases prontas' a sociedade costuma usar para desvalorizar a dor dessas pessoas? (Ex: 'é mimimi', 'frescura', 'falta de Deus')",
          "3. O que a escola e a comunidade podem fazer para quebrar esses silêncios?"
        ],
        notas: "Dar 10 minutos para as duplas conversarem. Circular pela sala. Ouvir 3 ou 4 duplas no fechamento."
      },
      {
        id: 11,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "O Sofrimento é Social, o Cuidado Também",
        imagem_url: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Prevenir o suicídio é cuidar do indivíduo, mas também lutar contra as desigualdades",
          "Reconhecer que certas dores têm cor, classe e gênero é o primeiro passo para o acolhimento",
          "Próxima aula: O que é ser Cidadão? – Direitos e Participação Política",
          "CVV: Ligue 188 (ligação gratuita e 24h)"
        ],
        notas: "Encerrar reforçando a importância da empatia e da escuta. Lembrar que ninguém precisa aguentar tudo sozinho. Deixar o número do CVV visível."
      }
    ]
  },
  {
    id: "aula_3",
    titulo: "AULA 3",
    titulo_aula: "O QUE É SER CIDADÃO?",
    subtitulo: "Direitos e Participação",
    data: "03/10",
    tags: ["CIDADANIA", "DIREITOS"],
    status: "AULA ATUAL",
    descricao: "Introdução ao conceito de cidadania, direitos e deveres na sociedade.",
    modulo: "Cidadania e Política",
    slides: [
      { id: 1, tipo: "capa", titulo: "O que é ser Cidadão?", subtitulo: "Direitos e Participação", imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop", notas: "Transição para o tema de Cidadania e Política." },
      { id: 2, tipo: "discussao", titulo: "O que é ser cidadão?", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", topicos: ["É só ter CPF?", "É só votar?", "É ter acesso a direitos?"], notas: "Cidadania vai além do voto." },
      { id: 3, tipo: "conceito", titulo: "Cidadania Formal vs Real", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", topicos: ["O que está na lei", "O que vivemos de fato"], notas: "Luta por direitos constante." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Cidadania é ação", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Como exercer cidadania na escola?"], notas: "Cidadania no cotidiano." }
    ]
  },
  {
    id: "aula_4",
    titulo: "AULA 4",
    titulo_aula: "ELEIÇÕES E DEMOCRACIA",
    subtitulo: "O Poder do Voto",
    data: "10/10",
    tags: ["CIDADANIA", "ELEIÇÕES"],
    status: "AGUARDANDO",
    descricao: "O papel do voto, a importância da participação política e a história da democracia.",
    modulo: "Cidadania e Política",
    slides: [
      { id: 1, tipo: "capa", titulo: "Eleições e Democracia", subtitulo: "O Poder do Voto", imagem_url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop", notas: "Aula em ano eleitoral." },
      { id: 2, tipo: "conceito", titulo: "O Voto no Brasil", subtitulo: "Conquista Histórica", imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop", topicos: ["Voto obrigatório e facultativo", "Luta das mulheres (1932)"], notas: "Conquista histórica." },
      { id: 3, tipo: "discussao", titulo: "Por que votar?", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", topicos: ["Seu voto faz diferença?", "Como escolher um candidato?"], notas: "Pensamento crítico." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Voto consciente", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Informação é a base do voto"], notas: "Voto e cidadania." }
    ]
  },
  {
    id: "aula_5",
    titulo: "AULA 5",
    titulo_aula: "FAKE NEWS E POLÍTICA",
    subtitulo: "Desinformação e Democracia",
    data: "17/10",
    tags: ["CIDADANIA", "MÍDIAS"],
    status: "AGUARDANDO",
    descricao: "Como identificar desinformação e o impacto das notícias falsas.",
    modulo: "Cidadania e Política",
    slides: [
      { id: 1, tipo: "capa", titulo: "Fake News e Política", subtitulo: "Desinformação em Jogo", imagem_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop", notas: "Mentiras e democracia." },
      { id: 2, tipo: "conceito", titulo: "O que são Fake News?", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop", topicos: ["Deepfakes", "Bolhas de filtro"], notas: "IA e desinformação." },
      { id: 3, tipo: "atividade", titulo: "Guia de Checagem", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop", topicos: ["Verifique a fonte", "Agências de checagem"], notas: "Aprender a checar." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Não compartilhe mentiras", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["A desinformação mata"], notas: "Responsabilidade individual." }
    ]
  },
  {
    id: "aula_6",
    titulo: "AULA 6",
    titulo_aula: "DIREITOS E DEVERES",
    subtitulo: "A Constituição Cidadã",
    data: "31/10",
    tags: ["CIDADANIA", "CONSTITUIÇÃO"],
    status: "AGUARDANDO",
    descricao: "Análise da Constituição Federal e direitos dos jovens (ECA).",
    modulo: "Cidadania e Política",
    slides: [
      { id: 1, tipo: "capa", titulo: "Direitos e Deveres", subtitulo: "A Constituição Cidadã", imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop", notas: "1988: Constituição Cidadã." },
      { id: 2, tipo: "conceito", titulo: "Constituição de 1988", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop", topicos: ["Direitos Fundamentais", "ECA"], notas: "Direitos garantidos." },
      { id: 3, tipo: "discussao", titulo: "Nossos Direitos na Prática", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", topicos: ["Quais direitos são mais desrespeitados?", "Canais de denúncia"], notas: "Defender direitos." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Novembro: Consciência Negra", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Preparem-se para Novembro"], notas: "Transição temática." }
    ]
  },
  {
    id: "aula_7",
    titulo: "AULA 7",
    titulo_aula: "IDENTIDADE E AUTODECLARAÇÃO",
    subtitulo: "Quem eu sou?",
    data: "07/11",
    tags: ["CONSCIÊNCIA NEGRA", "IDENTIDADE"],
    status: "AGUARDANDO",
    descricao: "Debate sobre pardismo, autodeclaração e identidade negra.",
    modulo: "Consciência Negra",
    slides: [
      { id: 1, tipo: "capa", titulo: "Identidade e Autodeclaração", subtitulo: "Quem eu sou?", imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1200&auto=format&fit=crop", notas: "Novembro Negro." },
      { id: 2, tipo: "conceito", titulo: "Autodeclaração", subtitulo: "Ato Político", imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop", topicos: ["IBGE", "Identidade como resistência"], notas: "Reconhecimento." },
      { id: 3, tipo: "discussao", titulo: "O Pardismo", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", topicos: ["Democracia racial", "Apagamento"], notas: "Miscigenação e política." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Resistência", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Sua identidade importa"], notas: "Identidade negra." }
    ]
  },
  {
    id: "aula_8",
    titulo: "AULA 8",
    titulo_aula: "RACISMO ESTRUTURAL E RECREATIVO",
    subtitulo: "Invisível e Cruel",
    data: "14/11",
    tags: ["CONSCIÊNCIA NEGRA", "RACISMO"],
    status: "AGUARDANDO",
    descricao: "Análise do racismo estrutural e recreativo.",
    modulo: "Consciência Negra",
    slides: [
      { id: 1, tipo: "capa", titulo: "Racismo Estrutural e Recreativo", subtitulo: "Além do individual", imagem_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop", notas: "Racismo institucional." },
      { id: 2, tipo: "conceito", titulo: "Racismo Estrutural", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", topicos: ["Apartheid", "Desigualdade", "Violência"], notas: "Estrutura social." },
      { id: 3, tipo: "conceito", titulo: "Racismo Recreativo", subtitulo: "Piadas que matam", imagem_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop", topicos: ["Blackface", "Estereótipos"], notas: "Humilhação." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Denuncie", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Disque 100"], notas: "Antirracismo." }
    ]
  },
  {
    id: "aula_9",
    titulo: "AULA 9",
    titulo_aula: "CULTURA E REPRESENTATIVIDADE",
    subtitulo: "Apropriação vs Intercâmbio",
    data: "21/11",
    tags: ["CONSCIÊNCIA NEGRA", "CULTURA"],
    status: "AGUARDANDO",
    descricao: "Apropriação cultural na moda, esporte e música.",
    modulo: "Consciência Negra",
    slides: [
      { id: 1, tipo: "capa", titulo: "Cultura e Representatividade", subtitulo: "Apropriação vs Intercâmbio", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop", notas: "Apreciar vs Usurpar." },
      { id: 2, tipo: "conceito", titulo: "Apropriação Cultural", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", topicos: ["Moda e música", "Uso sem respeito"], notas: "Símbolos e respeito." },
      { id: 3, tipo: "discussao", titulo: "Representatividade importa", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", topicos: ["Atletas negros", "Música periférica"], notas: "Protagonismo negro." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Respeito à cultura", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Zumbi e Dandara"], notas: "Ancestralidade." }
    ]
  },
  {
    id: "aula_10",
    titulo: "AULA 10",
    titulo_aula: "DIA DA CONSCIÊNCIA NEGRA",
    subtitulo: "Resistência de Palmares",
    data: "28/11",
    tags: ["CONSCIÊNCIA NEGRA", "RESISTÊNCIA"],
    status: "AGUARDANDO",
    descricao: "Zumbi, Dandara e o 20 de Novembro.",
    modulo: "Consciência Negra",
    slides: [
      { id: 1, tipo: "capa", titulo: "Dia da Consciência Negra", subtitulo: "Resistência", imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1200&auto=format&fit=crop", notas: "20 de Novembro: Feriado Nacional." },
      { id: 2, tipo: "conceito", titulo: "Zumbi e Dandara", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", topicos: ["Liberdade", "Quilombo dos Palmares"], notas: "Resistência histórica." },
      { id: 3, tipo: "reflexao", titulo: "Retrospectiva de Novembro", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop", topicos: ["O que aprendemos?", "A luta continua"], notas: "Reflexão final do mês." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Encerramento", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Última aula do ano chegando"], notas: "Fim do trimestre." }
    ]
  },
  {
    id: "aula_11",
    titulo: "AULA 11",
    titulo_aula: "SÍNTESE E ENCERRAMENTO",
    subtitulo: "Até logo!",
    data: "05/12",
    tags: ["ENCERRAMENTO", "AVALIAÇÃO"],
    status: "AGUARDANDO",
    descricao: "Retrospectiva do ano e mensagens de despedida.",
    modulo: "Encerramento",
    slides: [
      { id: 1, tipo: "capa", titulo: "Síntese e Encerramento", subtitulo: "Fim do Ciclo", imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop", notas: "Última aula." },
      { id: 2, tipo: "reflexao", titulo: "Nossa Jornada", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", topicos: ["Saúde Mental", "Cidadania", "Consciência Negra"], notas: "Evolução." },
      { id: 3, tipo: "atividade", titulo: "Autoavaliação", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", topicos: ["O que eu levo?", "Sugestões"], notas: "Feedback." },
      { id: 4, tipo: "fechamento", titulo: "Boas Festas", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Até o próximo ano!"], notas: "Encerramento." }
    ]
  }
];

// Helper to convert to PE_PLAN format
export const CRONOGRAMA_3TRI_PE_PLAN = CRONOGRAMA_3TRI_AULAS.map((aula, idx) => ({
  id: aula.id,
  data: aula.data,
  tri: '3º Tri',
  modulo: aula.modulo || aula.tags[0] || 'Geral',
  titulo: `${aula.titulo}: ${aula.titulo_aula || aula.titulo}`,
  desc: aula.descricao,
  status: idx === 0 ? 'concluido' : undefined,
  destaque: idx === 0,
  resumo: `🎯 **Objetivo da Aula:**\n${aula.descricao}\n\n🏷️ **Tags:** ${aula.tags.join(' • ')}\n\n🗣️ **Slides e Dinâmicas:**\n${aula.slides.map(s => `• **${s.titulo}**: ${s.notas || (s.topicos && s.topicos.length > 0 ? s.topicos[0] : 'Exposição teórica e debate.')}`).join('\n')}`
}));
