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
    data: "05/09",
    tags: ["SETEMBRO AMARELO", "GÊNERO"],
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
    subtitulo: "Marcadores Sociais e Sofrimento",
    data: "12/09",
    tags: ["SETEMBRO AMARELO", "SAÚDE MENTAL"],
    status: "CONCLUÍDA",
    descricao: "Marcadores sociais, racismo e o sofrimento psíquico com base em Conceição Evaristo.",
    modulo: "Setembro Amarelo",
    slides: [
      { id: 1, tipo: "capa", titulo: "As Raízes do Silêncio", subtitulo: "Marcadores Sociais e Sofrimento Psíquico", imagem_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", notas: "Aula sobre dados sociológicos." },
      { id: 2, tipo: "literatura", titulo: "Literatura como Espelho", subtitulo: "Conceição Evaristo", imagem_url: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&auto=format&fit=crop", topicos: ["Escrevivência", "Couraças que impedem o choro"], notas: "Força da literatura periférica." },
      { id: 3, tipo: "dados", titulo: "Determinantes Sociais", subtitulo: "O contexto adoece", imagem_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop", topicos: ["Desemprego", "Violência", "Racismo Institucional"], notas: "Problematizar a culpabilização individual." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Cuidado Comunitário", imagem_url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop", topicos: ["Afeto como tecnologia de sobrevivência"], notas: "Mensagem de solidariedade." }
    ]
  },
  {
    id: "aula_3",
    titulo: "AULA 3",
    titulo_aula: "TECER A REDE",
    subtitulo: "Autocuidado e Ação Coletiva",
    data: "19/09",
    tags: ["SETEMBRO AMARELO", "ACOLHIMENTO"],
    status: "AULA ATUAL",
    descricao: "Autocuidado, redes de apoio e construção de um mural coletivo.",
    modulo: "Setembro Amarelo",
    slides: [
      { id: 1, tipo: "capa", titulo: "Tecer a Rede", subtitulo: "Autocuidado e Ação Coletiva", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop", notas: "Prática e acolhimento." },
      { id: 2, tipo: "conceito", titulo: "Autocuidado Real", subtitulo: "Além do comercial", imagem_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", topicos: ["Sono reparador", "Dizer não", "Laços comunitários"], notas: "Autocuidado é autopreservação." },
      { id: 3, tipo: "atividade", titulo: "Nossa Caixa de Ferramentas", subtitulo: "Estratégias", imagem_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop", topicos: ["Respiração quadrada", "Bilhetes de apoio"], notas: "Prática de respiração." },
      { id: 4, tipo: "fechamento", titulo: "Mural da Vida", subtitulo: "Apoio contínuo", imagem_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop", topicos: ["CVV 188", "Canais de ajuda"], notas: "Fixar recados no mural." }
    ]
  },
  {
    id: "aula_4",
    titulo: "AULA 4",
    titulo_aula: "O QUE É SER CIDADÃO?",
    subtitulo: "Direitos e Participação",
    data: "03/10",
    tags: ["CIDADANIA", "DIREITOS"],
    status: "AGUARDANDO",
    descricao: "Introdução ao conceito de cidadania, direitos e deveres na sociedade.",
    modulo: "Cidadania e Política",
    slides: [
      { id: 1, tipo: "capa", titulo: "O que é ser Cidadão?", subtitulo: "Direitos e Participação", imagem_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop", notas: "Transição para o tema de Outubro." },
      { id: 2, tipo: "discussao", titulo: "O que é ser cidadão?", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", topicos: ["É só ter CPF?", "É só votar?", "É ter acesso a direitos?"], notas: "Cidadania vai além do voto." },
      { id: 3, tipo: "conceito", titulo: "Cidadania Formal vs Real", subtitulo: "", imagem_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", topicos: ["O que está na lei", "O que vivemos de fato"], notas: "Luta por direitos constante." },
      { id: 4, tipo: "fechamento", titulo: "Fechamento", subtitulo: "Cidadania é ação", imagem_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800&auto=format&fit=crop", topicos: ["Como exercer cidadania na escola?"], notas: "Cidadania no cotidiano." }
    ]
  },
  {
    id: "aula_5",
    titulo: "AULA 5",
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
    id: "aula_6",
    titulo: "AULA 6",
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
    id: "aula_7",
    titulo: "AULA 7",
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
    id: "aula_8",
    titulo: "AULA 8",
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
    id: "aula_9",
    titulo: "AULA 9",
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
    id: "aula_10",
    titulo: "AULA 10",
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
    id: "aula_11",
    titulo: "AULA 11",
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
    id: "aula_12",
    titulo: "AULA 12",
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
