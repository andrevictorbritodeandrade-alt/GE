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
  // ==========================================
  // SETEMBRO (SETEMBRO AMARELO) - Aulas 1 a 3
  // ==========================================
  {
    id: "aula_1",
    titulo: "AULA 1",
    titulo_aula: "HOMEM NÃO CHORA?",
    subtitulo: "Saúde Mental e Valorização da Vida",
    data: "05/09",
    tags: ["SETEMBRO AMARELO", "GÊNERO"],
    status: "AULA ATUAL",
    descricao: "Desconstrução de estereótipos de gênero e introdução à saúde mental.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Setembro Amarelo",
        subtitulo: "Homem Não Chora? Desconstruindo Estigmas",
        imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Abrir a aula com acolhimento. Dizer que a sala é um espaço seguro de escuta e reflexão sincera."
      },
      {
        id: 2,
        tipo: "discussao",
        titulo: "Homem não chora?",
        subtitulo: "Ou homem pode chorar? Chorar é só coisa de mulher?",
        imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O que vocês já ouviram sobre demonstrar fraqueza ou sentimentos?",
          "De onde vem a ideia de que o homem precisa ser uma rocha inabalável?",
          "Isso muda dependendo da família, da escola, da rua ou dos amigos?"
        ],
        notas: "Abrir para a turma falar livremente. Anotar palavras-chave no quadro sem julgar de imediato."
      },
      {
        id: 3,
        tipo: "conceito",
        titulo: "O que é Saúde Mental?",
        subtitulo: "Mais do que ausência de doença — OMS",
        imagem_url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Estado de bem-estar onde o indivíduo reconhece suas próprias capacidades.",
          "Capacidade de lidar com os estresses normais da vida cotidiana.",
          "Trabalhar de forma produtiva e contribuir ativamente para sua comunidade.",
          "Sentir tristeza, medo ou raiva faz parte do ser humano; o problema é o silenciamento crônico."
        ],
        notas: "Destacar que saúde mental não é 'loucura' nem privilégio: é um direito fundamental."
      },
      {
        id: 4,
        tipo: "dados",
        titulo: "Gênero e Sofrimento Psíquico",
        subtitulo: "Estatísticas que revelam o impacto do silêncio",
        imagem_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Homens procuram menos os serviços de saúde básica e psicológica por vergonha ou estigma.",
          "A repressão emocional masculina frequentemente se converte em agressividade, vícios ou isolamento.",
          "bell hooks: 'O primeiro ato de violência que o patriarcado exige dos homens é contra si mesmos, mutilando sua capacidade de sentir'."
        ],
        notas: "Apresentar a citação de bell hooks e debater como a vulnerabilidade exige coragem real."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Rede de Apoio e Acolhimento",
        subtitulo: "Falar é o primeiro passo para curar",
        imagem_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop",
        topicos: [
          "Procure amigos de confiança, professores, orientação pedagógica e familiares.",
          "Serviços públicos disponíveis: UBS (Posto de Saúde) e CAPS Infantojuvenil.",
          "CVV - Centro de Valorização da Vida: Ligue 188 (Gratuito, confidencial, 24 horas por dia)."
        ],
        notas: "Finalizar reforçando que ninguém precisa carregar seus fardos sozinho. Informar o número 188 no quadro."
      }
    ]
  },
  {
    id: "aula_2",
    titulo: "AULA 2",
    titulo_aula: "AS RAÍZES DO SILÊNCIO",
    subtitulo: "Marcadores Sociais e Sofrimento Psíquico",
    data: "12/09",
    tags: ["SETEMBRO AMARELO", "SAÚDE MENTAL"],
    status: "AGUARDANDO",
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
        notas: "Retomar clima de respeito. Avisar que a aula traz dados sociológicos, literatura e determinantes de saúde."
      },
      {
        id: 2,
        tipo: "literatura",
        titulo: "Literatura como Espelho",
        subtitulo: "'Canção para Ninar Menino Grande' — Conceição Evaristo",
        imagem_url: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O personagem Fio Jasmim e as contradições do afeto e da masculinidade negra.",
          "A 'escrevivência': a escrita que nasce da vivência cotidiana dos corpos periféricos.",
          "Como as expectativas sociais criam couraças que impedem o choro e o pedido de socorro."
        ],
        notas: "Ler um trecho ou refletir sobre a força da literatura brasileira em dar nome às dores cotidianas."
      },
      {
        id: 3,
        tipo: "dados",
        titulo: "Determinantes Sociais de Saúde",
        subtitulo: "Saúde mental não acontece no vácuo",
        imagem_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Fatores estruturais: desemprego, violência urbana, insegurança alimentar e falta de saneamento.",
          "Juventude negra e periférica enfrenta sobrecarga de expectativas e racismo institucional.",
          "Povos originários: impactos do isolamento, ameaça ao território ancestral e apagamento cultural."
        ],
        notas: "Problematizar a culpabilização individual. Mostrar que o contexto social adoece os indivíduos."
      },
      {
        id: 4,
        tipo: "conceito",
        titulo: "Interseccionalidade na Saúde",
        subtitulo: "Como diferentes formas de opressão se cruzam",
        imagem_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Gênero + Raça + Classe social: vulnerabilidades que se sobrepõem e exigem respostas integradas.",
          "Frantz Fanon: 'Pele Negra, Máscaras Brancas' — a alienação psicológica provocada pela opressão racial.",
          "Reconhecer as raízes do sofrimento é o primeiro passo para a emancipação e cura coletiva."
        ],
        notas: "Conectar Frantz Fanon com a realidade dos estudantes na Baixada Fluminense e periferias."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Cuidado Comunitário e Resistência",
        subtitulo: "O afeto como tecnologia de sobrevivência",
        imagem_url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
        topicos: [
          "Criar espaços de escuta entre amigos e colegas na escola.",
          "Romper com o tabu de que buscar psicólogo ou psiquiatra é fraqueza.",
          "CVV 188 • CAPS • Postos de Saúde da Família."
        ],
        notas: "Finalizar com uma mensagem de acolhimento e solidariedade entre os alunos."
      }
    ]
  },
  {
    id: "aula_3",
    titulo: "AULA 3",
    titulo_aula: "TECER A REDE",
    subtitulo: "Autocuidado, Apoio e Ação Coletiva",
    data: "19/09",
    tags: ["SETEMBRO AMARELO", "ACOLHIMENTO"],
    status: "AGUARDANDO",
    descricao: "Autocuidado, redes de apoio (CVV) e construção de um mural coletivo.",
    modulo: "Setembro Amarelo",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Tecer a Rede",
        subtitulo: "Autocuidado, Apoio e Ação Coletiva",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Última aula de setembro. Momento de prática, acolhimento, respiração coletiva e criação do mural."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que é Autocuidado Real?",
        subtitulo: "Muito além de produtos comerciais",
        imagem_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Cuidado Físico: Sono reparador, alimentação digna, movimento corporal e pausas nas telas.",
          "Cuidado Emocional: Dizer 'não', estabelecer limites saudáveis e expressar o que sente.",
          "Cuidado Comunitário: Fortalecer laços com quem nos apoia e nos faz bem."
        ],
        notas: "Explicar que autocuidado não é egoísmo, mas autopreservação para poder viver plenamente."
      },
      {
        id: 3,
        tipo: "atividade",
        titulo: "Nossa Caixa de Ferramentas",
        subtitulo: "Práticas e estratégias para os dias difíceis",
        imagem_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Escrever em post-its / caderno: 1 música que te acalma, 1 lugar seguro, 1 pessoa de confiança.",
          "Aprender a respiração quadrada (4s inspira, 4s segura, 4s expira, 4s segura).",
          "Construir a 'Caixa do Incentivo à Vida' com bilhetes anônimos de apoio para a turma."
        ],
        notas: "Distribuir papéis para a dinâmica. Garantir que todos recebam uma mensagem positiva."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Mural da Vida & Canais de Ajuda",
        subtitulo: "Acolhimento contínuo durante todo o ano letivo",
        imagem_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
        topicos: [
          "CVV - Ligue 188 (Ligação gratuita e confidencial 24 horas por dia).",
          "CAPS / UBS mais próxima de sua residência.",
          "Equipe pedagógica da escola sempre aberta para ouvir e orientar."
        ],
        notas: "Concluir fixando os recados no mural da sala ou no caderno individual."
      }
    ]
  },

  // ==========================================
  // OUTUBRO (CIDADANIA E ELEIÇÕES) - Aulas 4 a 9
  // ==========================================
  {
    id: "aula_4",
    titulo: "AULA 4",
    data: "26/09",
    tags: ["CIDADANIA", "DIREITOS"],
    status: "AGUARDANDO",
    titulo_aula: "O QUE É SER CIDADÃO?",
    descricao: "Introdução ao conceito de cidadania, direitos e deveres na sociedade contemporânea.",
    modulo: "Cidadania e Política",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "O que é ser Cidadão?",
        subtitulo: "Direitos, Deveres e Participação",
        imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Iniciar a transição do Setembro Amarelo para o tema de Outubro. Perguntar o que eles acham que é cidadania."
      },
      {
        id: 2,
        tipo: "objetivos",
        titulo: "Objetivos da Aula",
        subtitulo: "",
        imagem_url: "",
        topicos: [
          "Compreender o conceito de cidadania",
          "Diferenciar direitos de deveres",
          "Refletir sobre a participação social"
        ],
        notas: "Apresentar rapidamente."
      },
      {
        id: 3,
        tipo: "discussao",
        titulo: "O que é ser cidadão?",
        subtitulo: "Para você, o que significa?",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "É só ter um CPF?",
          "É só votar?",
          "É ter acesso a saúde e educação?",
          "É respeitar o próximo?"
        ],
        notas: "Anotar as respostas no quadro. Mostrar que cidadania vai além do voto."
      },
      {
        id: 4,
        tipo: "conceito",
        titulo: "Cidadania Formal vs. Real",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Cidadania Formal: garantida pela lei (Constituição)",
          "Cidadania Real: vivida no dia a dia",
          "Nem sempre o que está na lei é acessível a todos",
          "A luta por direitos é constante"
        ],
        notas: "Explicar que a lei garante, mas a realidade muitas vezes não. Exemplo: direito à saúde, mas falta de médicos."
      },
      {
        id: 5,
        tipo: "atividade",
        titulo: "Mapa dos Direitos",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Em grupos, listem 3 direitos que vocês têm",
          "E 3 deveres que vocês cumprem",
          "Compartilhem com a turma"
        ],
        notas: "Mediar a discussão. Mostrar que todo direito tem um dever correspondente."
      },
      {
        id: 6,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Cidadania é ação",
        imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Cidadania não é só um status, é uma prática",
          "Próxima aula: Eleições e Democracia",
          "Pergunta para casa: Como posso exercer minha cidadania na escola?"
        ],
        notas: "Reforçar que a participação começa no cotidiano."
      }
    ]
  },
  {
    id: "aula_5",
    titulo: "AULA 5",
    data: "03/10",
    tags: ["CIDADANIA", "ELEIÇÕES"],
    status: "AGUARDANDO",
    titulo_aula: "ELEIÇÕES E DEMOCRACIA",
    descricao: "O papel do voto, a importância da participação política e a história da democracia no Brasil.",
    modulo: "Cidadania e Política",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Eleições e Democracia",
        subtitulo: "O Poder do Voto",
        imagem_url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Aula importante em ano eleitoral. Contextualizar."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que é Democracia?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Governo do povo",
          "Democracia Direta vs. Representativa",
          "Democracia Participativa (conselhos, audiências)",
          "No Brasil: voto direto e secreto"
        ],
        notas: "Explicar os tipos de democracia com exemplos práticos."
      },
      {
        id: 3,
        tipo: "dados",
        titulo: "O Voto no Brasil",
        subtitulo: "Quem pode votar?",
        imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Obrigatório: 18 a 70 anos",
          "Facultativo: 16 e 17 anos, +70 e analfabetos",
          "Voto é uma conquista histórica",
          "Mulheres só puderam votar em 1932"
        ],
        notas: "Destacar a luta das mulheres e dos movimentos sociais pelo direito ao voto."
      },
      {
        id: 4,
        tipo: "discussao",
        titulo: "Por que votar?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Você já acompanha política?",
          "Acha que seu voto faz diferença?",
          "O que te desanima na política?",
          "Como escolher um candidato?"
        ],
        notas: "Abrir para debate. Não impor posições, mas incentivar o pensamento crítico."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Voto é ferramenta de mudança",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Próxima aula: Fake News e Política",
          "Pesquisar: Como identificar uma notícia falsa?",
          "CVV: 188"
        ],
        notas: "Reforçar que a informação é a base do voto consciente."
      }
    ]
  },
  {
    id: "aula_6",
    titulo: "AULA 6",
    data: "10/10",
    tags: ["CIDADANIA", "MÍDIAS"],
    status: "AGUARDANDO",
    titulo_aula: "FAKE NEWS E POLÍTICA",
    descricao: "Como identificar desinformação e o impacto das notícias falsas no processo democrático.",
    modulo: "Cidadania e Política",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Fake News e Política",
        subtitulo: "A Desinformação em Jogo",
        imagem_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Introduzir o tema com exemplos recentes."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que são Fake News?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Notícias falsas criadas para enganar",
          "Deepfakes: vídeos e áudios manipulados por IA",
          "Bolhas de filtro: só vemos o que concordamos",
          "Impacto: manipulação de eleições e violência"
        ],
        notas: "Explicar o conceito de deepfake. Mostrar como a IA pode ser usada para o mal."
      },
      {
        id: 3,
        tipo: "dados",
        titulo: "Como Identificar?",
        subtitulo: "Guia rápido de checagem",
        imagem_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Verifique a fonte",
          "Cheque a data",
          "Leia além do título",
          "Desconfie de sensacionalismo",
          "Use agências de checagem (Lupa, Aos Fatos)"
        ],
        notas: "Ensinar técnicas práticas de verificação."
      },
      {
        id: 4,
        tipo: "atividade",
        titulo: "Checando uma Notícia",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Professor, traga 2 manchetes (uma real, uma falsa)",
          "Em grupos, analisem e decidam qual é falsa",
          "Justifiquem a resposta"
        ],
        notas: "Atividade prática. Pode ser feita no celular dos alunos."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Informação é poder",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Não compartilhe sem checar",
          "A desinformação mata",
          "Próxima aula: Direitos e Deveres"
        ],
        notas: "Reforçar a responsabilidade individual no combate às fake news."
      }
    ]
  },
  {
    id: "aula_7",
    titulo: "AULA 7",
    data: "17/10",
    tags: ["CIDADANIA", "CONSTITUIÇÃO"],
    status: "AGUARDANDO",
    titulo_aula: "DIREITOS E DEVERES",
    descricao: "Análise da Constituição Federal e os direitos garantidos aos jovens e adolescentes.",
    modulo: "Cidadania e Política",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Direitos e Deveres",
        subtitulo: "A Constituição Cidadã",
        imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Contextualizar a Constituição de 1988."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "Constituição de 1988",
        subtitulo: "A Constituição Cidadã",
        imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Garante direitos fundamentais",
          "Saúde, educação, moradia, segurança",
          "Direitos dos jovens: ECA (Estatuto da Criança e do Adolescente)",
          "Deveres: respeitar leis, pagar impostos, preservar o meio ambiente"
        ],
        notas: "Mostrar que os direitos dos jovens são garantidos por lei."
      },
      {
        id: 3,
        tipo: "discussao",
        titulo: "Nossos Direitos na Prática",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Vocês conhecem o ECA?",
          "Quais direitos vocês acham que são mais desrespeitados?",
          "O que podemos fazer quando um direito é violado?"
        ],
        notas: "Discutir canais de denúncia (Conselho Tutelar, Disque 100)."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Cidadania se constrói",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Semana do Saco Cheio: descansem!",
          "Reflitam sobre tudo que aprenderam neste mês",
          "Nos vemos em Novembro: Consciência Negra"
        ],
        notas: "Avisar sobre o recesso da próxima semana."
      }
    ]
  },
  {
    id: "aula_8",
    titulo: "AULA 8",
    data: "24/10",
    tags: ["RECESSO", "DESCANSO"],
    status: "AGUARDANDO",
    titulo_aula: "SEMANA DO SACO CHEIO",
    descricao: "Recesso escolar. Momento de descanso e reflexão.",
    modulo: "Recesso",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Semana do Saco Cheio",
        subtitulo: "Momento de Recarregar",
        imagem_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Slide único para a semana de recesso. Não haverá aula expositiva."
      },
      {
        id: 2,
        tipo: "reflexao",
        titulo: "Dicas para o Recesso",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Descanse a mente",
          "Durma bem",
          "Faça algo que gosta",
          "Leia um livro",
          "Cuide da sua saúde mental"
        ],
        notas: "Enviar mensagem de carinho e descanso para a turma."
      }
    ]
  },
  {
    id: "aula_9",
    titulo: "AULA 9",
    data: "31/10",
    tags: ["SEMINÁRIOS", "APRESENTAÇÃO"],
    status: "AGUARDANDO",
    titulo_aula: "APRESENTAÇÕES DE PROJETOS",
    descricao: "Apresentação dos trabalhos desenvolvidos ao longo do bimestre.",
    modulo: "Seminários",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Apresentações de Projetos",
        subtitulo: "Mostrando o que aprendemos",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Organizar a ordem das apresentações."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "Regras da Apresentação",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Tempo: 5 a 10 minutos por grupo",
          "Respeito total aos colegas",
          "Avaliação: clareza, pesquisa e criatividade",
          "Perguntas ao final"
        ],
        notas: "Deixar claro os critérios de avaliação."
      },
      {
        id: 3,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Novembro é logo ali",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Próxima aula: Identidade e Autodeclaração",
          "Novembro é o mês da Consciência Negra",
          "Preparem-se para mergulhar nesse tema"
        ],
        notas: "Criar expectativa para o mês de novembro."
      }
    ]
  },

  // ==========================================
  // NOVEMBRO (CONSCIÊNCIA NEGRA) - Aulas 10 a 13
  // ==========================================
  {
    id: "aula_10",
    titulo: "AULA 10",
    data: "07/11",
    tags: ["CONSCIÊNCIA NEGRA", "IDENTIDADE"],
    status: "AGUARDANDO",
    titulo_aula: "IDENTIDADE E AUTODECLARAÇÃO",
    descricao: "Debate sobre pardismo, autodeclaração e a construção da identidade negra no Brasil.",
    modulo: "Consciência Negra",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Identidade e Autodeclaração",
        subtitulo: "Quem eu sou?",
        imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Iniciar o mês da Consciência Negra com acolhimento."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que é Autodeclaração?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "É como você se identifica",
          "Categorias do IBGE: Branco, Preto, Pardo, Amarelo, Indígena",
          "Autodeclaração é um ato político",
          "Muitos negros não se reconhecem como tal"
        ],
        notas: "Explicar o conceito de autodeclaração e sua importância."
      },
      {
        id: 3,
        tipo: "discussao",
        titulo: "O Pardismo",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O que é ser pardo?",
          "O mito da democracia racial",
          "Por que muitos preferem se dizer pardos e não pretos?",
          "O racismo estrutural e o apagamento da identidade"
        ],
        notas: "Tema sensível. Mediar com cuidado. Explicar que a miscigenação foi usada para apagar identidades."
      },
      {
        id: 4,
        tipo: "literatura",
        titulo: "Vozes da Literatura",
        subtitulo: "Conceição Evaristo e outras",
        imagem_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Conceição Evaristo: escrevivência",
          "A importância de se ver representado",
          "Poemas e trechos que falam de identidade",
          "A força da ancestralidade"
        ],
        notas: "Ler um poema curto de Conceição Evaristo."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Identidade é resistência",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Você sabe qual é a sua identidade?",
          "Próxima aula: Racismo Estrutural e Recreativo",
          "Pesquisar: O que é racismo recreativo?"
        ],
        notas: "Reforçar que a identidade é um processo em construção."
      }
    ]
  },
  {
    id: "aula_11",
    titulo: "AULA 11",
    data: "14/11",
    tags: ["CONSCIÊNCIA NEGRA", "RACISMO"],
    status: "AGUARDANDO",
    titulo_aula: "RACISMO ESTRUTURAL E RECREATIVO",
    descricao: "Análise do racismo invisível e estrutural, exemplos na segregação, África do Sul, Brasil, Jim Crow e Blackface.",
    modulo: "Consciência Negra",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Racismo Estrutural e Recreativo",
        subtitulo: "O Racismo para além do individual",
        imagem_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Aula densa. Explicar que racismo não é só xingamento."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "Racismo Estrutural",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Não é só ato individual",
          "Está nas instituições, leis e práticas",
          "Exemplos: Jim Crow (EUA), Apartheid (África do Sul)",
          "No Brasil: desigualdade salarial, violência policial"
        ],
        notas: "Contextualizar historicamente."
      },
      {
        id: 3,
        tipo: "conceito",
        titulo: "Racismo Recreativo",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Aquele 'racismo' disfarçado de piada",
          "Blackface: pintar o rosto para imitar negros",
          "Fantasias de carnaval e piadas de mau gosto",
          "O impacto na saúde mental da população negra"
        ],
        notas: "Mostrar exemplos de blackface e por que é ofensivo."
      },
      {
        id: 4,
        tipo: "dados",
        titulo: "O Racismo no Brasil",
        subtitulo: "Números que doem",
        imagem_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "A cada 10 jovens mortos, 6 são negros",
          "Renda média do negro é menor que a do branco",
          "Negros são maioria nas prisões",
          "Racismo adoece: depressão e ansiedade"
        ],
        notas: "Apresentar dados do IBGE e Fiocruz."
      },
      {
        id: 5,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "O que podemos fazer?",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Reconhecer o racismo é o primeiro passo",
          "Não rir de piadas racistas",
          "Próxima aula: Cultura e Representatividade",
          "Denuncie: Disque 100"
        ],
        notas: "Reforçar a responsabilidade individual e coletiva."
      }
    ]
  },
  {
    id: "aula_12",
    titulo: "AULA 12",
    data: "21/11",
    tags: ["CONSCIÊNCIA NEGRA", "CULTURA"],
    status: "AGUARDANDO",
    titulo_aula: "CULTURA E REPRESENTATIVIDADE",
    descricao: "Apropriação cultural vs. intercâmbio. A fronteira da apropriação na moda, no esporte e na música.",
    modulo: "Consciência Negra",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Cultura e Representatividade",
        subtitulo: "Apropriação vs. Intercâmbio",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Explicar a diferença entre apreciar e se apropriar."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "O que é Apropriação Cultural?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Usar elementos de uma cultura sem respeito ou contexto",
          "Exemplo: turbante, dreads, música",
          "Quando a pessoa negra usa, é discriminada; quando a branca usa, é moda",
          "Intercâmbio: troca respeitosa e com crédito"
        ],
        notas: "Debater exemplos práticos do cotidiano."
      },
      {
        id: 3,
        tipo: "discussao",
        titulo: "Casos na Moda, Esporte e Música",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Marcas que usam cultura negra sem contratar negros",
          "Atletas negros e a luta por representatividade",
          "Música: funk, samba, rap",
          "Vocês já viram isso acontecer?"
        ],
        notas: "Incentivar a turma a dar exemplos."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Respeito é a chave",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Apropriação é violência simbólica",
          "Representatividade importa",
          "Próxima aula: Dia da Consciência Negra",
          "Pesquisar: Quem foi Zumbi dos Palmares?"
        ],
        notas: "Reforçar a importância do respeito à cultura do outro."
      }
    ]
  },
  {
    id: "aula_13",
    titulo: "AULA 13",
    data: "28/11",
    tags: ["CONSCIÊNCIA NEGRA", "FERIADO"],
    status: "AGUARDANDO",
    titulo_aula: "DIA DA CONSCIÊNCIA NEGRA",
    descricao: "Celebração e síntese dos aprendizados do mês. Feriado Nacional (20/11).",
    modulo: "Consciência Negra",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Dia da Consciência Negra",
        subtitulo: "20 de Novembro",
        imagem_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Aula de celebração e síntese."
      },
      {
        id: 2,
        tipo: "conceito",
        titulo: "Zumbi dos Palmares",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Quem foi Zumbi?",
          "Líder do Quilombo dos Palmares",
          "Símbolo de resistência e luta",
          "20 de novembro: data de sua morte",
          "Feriado Nacional desde 2023"
        ],
        notas: "Contextualizar a importância histórica."
      },
      {
        id: 3,
        tipo: "reflexao",
        titulo: "O que aprendemos?",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Identidade e autodeclaração",
          "Racismo estrutural e recreativo",
          "Apropriação cultural",
          "A luta continua"
        ],
        notas: "Fazer uma retrospectiva do mês de novembro."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Fechamento",
        subtitulo: "Consciência Negra todos os dias",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Não é só um feriado, é uma luta",
          "Próxima aula: Síntese e Encerramento",
          "Preparem suas reflexões finais"
        ],
        notas: "Encerrar o mês com chave de ouro."
      }
    ]
  },

  // ==========================================
  // DEZEMBRO (ENCERRAMENTO) - Aula 14
  // ==========================================
  {
    id: "aula_14",
    titulo: "AULA 14",
    data: "05/12",
    tags: ["ENCERRAMENTO", "AVALIAÇÃO"],
    status: "AGUARDANDO",
    titulo_aula: "SÍNTESE E ENCERRAMENTO",
    descricao: "Retrospectiva do ano, avaliação final e mensagens de despedida.",
    modulo: "Encerramento",
    slides: [
      {
        id: 1,
        tipo: "capa",
        titulo: "Síntese e Encerramento",
        subtitulo: "Até o próximo ano!",
        imagem_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop",
        topicos: [],
        notas: "Última aula do ano. Momento de descontração e avaliação."
      },
      {
        id: 2,
        tipo: "reflexao",
        titulo: "Nossa Linha do Tempo",
        subtitulo: "Setembro a Dezembro",
        imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Setembro Amarelo: Saúde Mental",
          "Outubro: Cidadania e Eleições",
          "Novembro: Consciência Negra",
          "Dezembro: Encerramento"
        ],
        notas: "Mostrar a evolução dos temas."
      },
      {
        id: 3,
        tipo: "atividade",
        titulo: "Autoavaliação",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "O que eu aprendi neste ano?",
          "O que eu levo para a vida?",
          "Como me senti nas aulas?",
          "Sugestões para o próximo ano"
        ],
        notas: "Distribuir papel. Pode ser anônimo."
      },
      {
        id: 4,
        tipo: "fechamento",
        titulo: "Mensagem Final",
        subtitulo: "",
        imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop",
        topicos: [
          "Você é importante",
          "Cuide da sua saúde mental",
          "CVV: 188",
          "Boas festas e um excelente 2027!"
        ],
        notas: "Encerrar com acolhimento e votos de boas festas."
      }
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
