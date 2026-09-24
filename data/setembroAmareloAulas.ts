export interface SlideItem {
  id: number;
  tipo: 'capa' | 'discussao' | 'conceito' | 'dados' | 'literatura' | 'atividade' | 'fechamento' | string;
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
  subtitulo: string;
  data: string;
  tags: string[];
  status: 'Aula Atual' | 'Aguardando' | 'Concluída' | string;
  descricao: string;
  modulo?: string;
  slides: SlideItem[];
}

export const AULAS_SETEMBRO_AMARELO: AulaItem[] = [
  {
    id: "aula_1",
    titulo: "Aula 1: Homem Não Chora? Desconstruindo Estigmas",
    subtitulo: "Saúde Mental e Valorização da Vida",
    data: "19/09",
    tags: ["Gênero", "Saúde Mental", "Setembro Amarelo"],
    status: "Concluída",
    descricao: "Reflexão sobre estereótipos de gênero, repressão de sentimentos e introdução à saúde mental.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Setembro Amarelo",
        subtitulo: "Homem Não Chora? Desconstruindo Estigmas",
        imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Abrir a aula com acolhimento. Dizer que é um espaço de escuta."
      },
      {
        id: 2,
        tipo: "discussao",
        titulo: "Homem não chora?",
        subtitulo: "Ou homem pode chorar? Chorar é só coisa de mulher?",
        imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O que vocês já ouviram sobre isso?",
          "De onde vem essa ideia?",
          "Isso muda dependendo da família, da escola, dos amigos?"
        ],
        notas: "Abrir para a turma. Anotar falas no quadro. Não corrigir de imediato."
      },
      {
        id: 3,
        tipo: "conceito",
        titulo: "Gênero e Emoções",
        subtitulo: "O peso do silenciamento",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Historicamente, sentimentos foram associados ao feminino",
          "Na sociedade machista, aproximar-se do feminino é visto como ofensa",
          "Homens aprendem a reprimir: 'engolir o choro'",
          "Reprimir não é sinônimo de força"
        ],
        notas: "Explicar que não é sobre culpar homens individualmente, mas sobre um sistema."
      },
      {
        id: 4,
        tipo: "conceito",
        titulo: "O que acontece quando não se fala?",
        subtitulo: "Silenciamento vs. Explosão",
        imagem_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Silenciamento das emoções",
          "Acúmulo de tensão interna",
          "Explosão em acessos de raiva",
          "A raiva pode ser um sintoma, não a causa"
        ],
        notas: "Exemplo: pessoa que não consegue dizer 'estou triste' e grita com quem ama."
      },
      {
        id: 5,
        tipo: "dados",
        titulo: "O Silenciamento do Homem Negro",
        subtitulo: "Interseccionalidade e Saúde Mental",
        imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "bell hooks: vulnerabilidade escondida como estratégia de sobrevivência",
          "Invulnerabilidade é erroneamente vista como força",
          "Homens negros enfrentam racismo + machismo",
          "Isso afasta do cuidado em saúde mental"
        ],
        notas: "Ponto sensível. Explicar interseccionalidade. Não generalizar."
      },
      {
        id: 6,
        tipo: "conceito",
        titulo: "O que é Saúde Mental?",
        subtitulo: "Definição da OMS",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Estado de bem-estar",
          "Realizar capacidades",
          "Lidar com estresse normal da vida",
          "Trabalhar de forma produtiva",
          "Contribuir com a comunidade"
        ],
        notas: "Enfatizar que não é apenas ausência de doença."
      },
      {
        id: 7,
        tipo: "conceito",
        titulo: "Sinais de Alerta",
        subtitulo: "Como identificar em si e nos outros",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Mudanças na fala: 'queria desaparecer', 'não vejo saída'",
          "Mudanças no comportamento: isolamento, queda no rendimento",
          "Mudanças emocionais: tristeza profunda, irritabilidade",
          "Mudanças físicas: sono, cansaço, dores sem causa"
        ],
        notas: "Não transformar em diagnóstico. São sinais para olhar com cuidado."
      },
      {
        id: 8,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Falar é um ato de coragem",
        imagem_url: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Cuidar da saúde mental é resistência",
          "Próxima aula: as raízes sociais do sofrimento",
          "CVV: 188 - Apoio Emocional Gratuito e 24h"
        ],
        notas: "Agradecer a participação. Reforçar que a escola é espaço de apoio."
      }
    ]
  },
  {
    id: "aula_2",
    titulo: "AULA 2: As Raízes do Silêncio",
    subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
    data: "25/09",
    tags: ["SETEMBRO AMARELO", "SAÚDE MENTAL", "RACISMO"],
    status: "Concluída",
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
          "Próxima aula: Tecer a Rede – Estratégias de Cuidado, Rede de Apoio e Mural da Vida",
          "CVV: Ligue 188 (ligação gratuita e 24h)"
        ],
        notas: "Encerrar reforçando a importância da empatia e da escuta. Lembrar que ninguém precisa aguentar tudo sozinho. Deixar o número do CVV visível."
      }
    ]
  },
  {
    id: "aula_3",
    titulo: "Aula 3: O que é ser Cidadão?",
    subtitulo: "Direitos, Deveres e Participação Social",
    data: "03/10",
    tags: ["Cidadania", "Direitos", "Participação"],
    status: "Aula Atual",
    descricao: "Introdução ao conceito de cidadania, direitos fundamentais e participação na sociedade.",
    modulo: "Cidadania e Política",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "O que é ser Cidadão?",
        subtitulo: "Direitos e Participação Social",
        imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Introduzir a transição de temas: da saúde mental e valorização da vida para os direitos de cidadania."
      },
      {
        id: 2,
        tipo: "discussao",
        titulo: "O que é ser cidadão?",
        subtitulo: "Mais do que um documento ou o ato de votar",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "É só ter CPF e RG?",
          "É só votar a cada dois anos?",
          "Ou é ter acesso pleno à saúde, educação e dignidade?",
          "Como a cidadania se expressa na nossa escola e no bairro?"
        ],
        notas: "Ouvir a turma. Registrar palavras-chave no quadro."
      },
      {
        id: 3,
        tipo: "conceito",
        titulo: "Cidadania Formal vs. Cidadania Real",
        subtitulo: "A distância entre a lei e o cotidiano",
        imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Cidadania Formal: o que está escrito nas leis e na Constituição de 1988",
          "Cidadania Real: o que o cidadão de fato vivencia nas periferias",
          "A conquista de direitos como processo histórico contínuo",
          "Nenhum direito foi dado de graça: todos foram conquistados"
        ],
        notas: "Explicar a importância da consciência crítica para a exigência de direitos."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Cidadania é Ação Coletiva",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Ser cidadão é cuidar de si e da comunidade",
          "Próxima aula: Eleições e Democracia – O Poder do Voto",
          "Como podemos exercer cidadania hoje na escola?"
        ],
        notas: "Finalizar incentivando a participação ativa dos estudantes."
      }
    ]
  }
];

// Normalize slides for player compatibility
export const normalizeSlidesForPlayer = (slides: SlideItem[]) => {
  return slides.map(s => ({
    ...s,
    title: s.titulo,
    subtitle: s.subtitulo,
    points: s.topicos,
    dicaProfessor: s.notas,
    type: s.tipo,
    imagem_url: s.imagem_url
  }));
};

export const SLIDES_AULA_1_SETEMBRO_AMARELO = normalizeSlidesForPlayer(AULAS_SETEMBRO_AMARELO[0].slides);
export const SLIDES_AULA_2_SETEMBRO_AMARELO = normalizeSlidesForPlayer(AULAS_SETEMBRO_AMARELO[1].slides);
export const SLIDES_AULA_3_SETEMBRO_AMARELO = normalizeSlidesForPlayer(AULAS_SETEMBRO_AMARELO[2].slides);
