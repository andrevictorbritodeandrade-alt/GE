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
    data: "05/09",
    tags: ["Gênero", "Saúde Mental", "Setembro Amarelo"],
    status: "Aula Atual",
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
    titulo: "Aula 2: As Raízes do Silêncio",
    subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
    data: "12/09",
    tags: ["Racismo", "Desigualdade", "Literatura"],
    status: "Aguardando",
    descricao: "Análise de como raça, classe, etnia e gênero atravessam a saúde mental, com base em Conceição Evaristo.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "As Raízes do Silêncio",
        subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
        imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Retomar clima de respeito. Avisar que a aula traz dados e literatura."
      },
      {
        id: 2,
        tipo: "literatura",
        titulo: "Literatura como Espelho",
        subtitulo: "Conceição Evaristo – Canção para Ninar Menino Grande",
        imagem_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Fio Jasmim: infância marcada por tensões",
          "Silêncio como resposta",
          "Masculinidade negra e opressões",
          "O livro dá rosto ao que os dados mostram"
        ],
        notas: "Apresentar a autora. Dizer que é ficção, mas fala de realidades."
      },
      {
        id: 3,
        tipo: "dados",
        titulo: "Jovens Negros e Suicídio",
        subtitulo: "Os números da desigualdade",
        imagem_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "A cada 10 jovens que tiram a própria vida, 6 são negros",
          "Homens negros de 10 a 29 anos: 45% mais risco",
          "Racismo estrutural adoece",
          "Discriminação cotidiana gera desesperança"
        ],
        notas: "Apresentar dados com cuidado. Explicar que racismo é determinante social."
      },
      {
        id: 4,
        tipo: "dados",
        titulo: "Povos Indígenas",
        subtitulo: "A maior taxa do país",
        imagem_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Taxa de suicídio: 62,7 por 100 mil",
          "Entre homens indígenas de 20 a 24 anos: 107,9 por 100 mil",
          "Causas: marginalização, perda de território, violência",
          "Risco 10,7 vezes maior após violência"
        ],
        notas: "Contextualizar histórico de violência e resistência."
      },
      {
        id: 5,
        tipo: "conceito",
        titulo: "Interseccionalidade",
        subtitulo: "A multiplicação de opressões",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Marcadores se cruzam: raça, classe, gênero, sexualidade",
          "Combinação potencializa vulnerabilidade",
          "Exemplo: jovem negro, pobre e LGBTQIA+",
          "Não é soma, é multiplicação de opressões"
        ],
        notas: "Explicar conceito de forma simples. Dar exemplos do cotidiano."
      },
      {
        id: 6,
        tipo: "fechamento",
        titulo: "Sofrimento é Social",
        subtitulo: "Prevenção exige enfrentamento",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Prevenção exige acolhimento individual",
          "E também enfrentamento do racismo, da pobreza e da violência",
          "Ninguém deveria ter que ser forte o tempo todo",
          "Próxima aula: tecer a rede de apoio"
        ],
        notas: "Reforçar que a aula não é para culpar alunos. É para ampliar olhar."
      }
    ]
  },
  {
    id: "aula_3",
    titulo: "Aula 3: Tecer a Rede",
    subtitulo: "Autocuidado, Apoio e Ação Coletiva",
    data: "19/09",
    tags: ["Autocuidado", "Rede de Apoio", "CVV"],
    status: "Aguardando",
    descricao: "Apresentação de redes de apoio, estratégias de autocuidado e construção de um mural coletivo.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Tecer a Rede",
        subtitulo: "Autocuidado, Apoio e Ação Coletiva",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Última aula. Momento de prática e acolhimento."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que é Autocuidado?",
        subtitulo: "Não é luxo, é necessidade",
        imagem_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Estratégias para regular emoções",
          "Pode ser individual ou coletivo",
          "Buscar ajuda profissional também é autocuidado",
          "Dizer não, descansar, pedir ajuda"
        ],
        notas: "Desmistificar que autocuidado é só spa."
      },
      {
        id: 3,
        tipo: "atividade",
        titulo: "Nossa Caixa de Ferramentas",
        subtitulo: "O que te faz bem?",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O que te faz bem quando está triste ou ansioso?",
          "Escreva em um post-it",
          "Vamos montar um painel coletivo",
          "Exemplos: música, esporte, conversa, natureza"
        ],
        notas: "Distribuir post-its. Colar em cartolina. Valorizar todas as respostas."
      },
      {
        id: 4,
        tipo: "conceito",
        titulo: "Rede de Apoio",
        subtitulo: "Onde buscar ajuda",
        imagem_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "CVV: 188 – gratuito, sigiloso, 24h",
          "CAPS: Centros de Atenção Psicossocial",
          "UBS: Unidades Básicas de Saúde",
          "Na escola: professores, orientação, coordenação"
        ],
        notas: "Distribuir cartão com contatos. Dizer que pedir ajuda não é fraqueza."
      },
      {
        id: 5,
        tipo: "atividade",
        titulo: "Caixa do Incentivo à Vida",
        subtitulo: "Mensagens de esperança",
        imagem_url: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Escreva uma mensagem anônima de apoio",
          "Pode ser frase, verso, desenho",
          "Depois, cada um retira uma mensagem",
          "Vamos criar o Mural da Vida"
        ],
        notas: "Preparar caixa decorada. Garantir que todos participem."
      },
      {
        id: 6,
        tipo: "fechamento",
        titulo: "Mensagem Final",
        subtitulo: "Você não está sozinho",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Falar salva",
          "CVV: 188",
          "Setembro Amarelo: todos os dias",
          "A escola é um espaço de apoio"
        ],
        notas: "Encerrar com acolhimento. Disponibilizar-se para conversas individuais."
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
