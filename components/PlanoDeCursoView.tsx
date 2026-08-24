import React, { useState } from 'react';
import { 
  BookOpen, Target, Layers, Calendar, Printer, ChevronLeft, 
  CheckCircle2, Clock, Brain, Activity, Sparkles, GraduationCap, 
  Award, Search, ChevronDown, ChevronUp, Download, BarChart3,
  Lightbulb, Dumbbell, Compass, Check, AlertTriangle, School,
  FileText, Microscope, Palette, Users
} from 'lucide-react';
import { ScreenHeader } from './ScreenHeader';
import { BackButton } from './BackButton';

interface PlanoDeCursoViewProps {
  onBack: () => void;
}

export const PlanoDeCursoView: React.FC<PlanoDeCursoViewProps> = ({ onBack }) => {
  const [mainTab, setMainTab] = useState<'estudos_orientados' | 'reforco_escolar' | 'educacao_fisica' | 'calendario'>('educacao_fisica');
  const [selectedSubTab, setSelectedSubTab] = useState<string>('cordelia_8ano');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    window.print();
  };

  // =========================================================================
  // 1. PLANOS DE CURSO: ESTUDOS ORIENTADOS (POR ANO DE ESCOLARIDADE)
  // =========================================================================
  const planosEstudosOrientados: Record<string, any> = {
    'eo_fundamental': {
      id: 'eo_fundamental',
      gradeLabel: '8º e 9º Anos do Ensino Fundamental',
      title: 'Plano de Curso: Estudos Orientados — Ensino Fundamental',
      subtitle: 'Organização, Rotinas de Estudo e Autonomia da Aprendizagem',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'EE Cordélia Paiva', classes: ['801', '802', '803'] }
      ],
      ementa: 'Construção da identidade de estudante e introdução a técnicas práticas de organização pessoal, gestão de tempo, leitura compreensiva e preparação para avaliações. Foco em superar a procrastinação, organizar cadernos/materiais e desenvolver estratégias de síntese visual e escrita.',
      objetivos: [
        'Aprender a organizar a rotina diária de estudos e prazos escolares utilizando agendas e planners.',
        'Desenvolver técnicas de leitura ativa, sublinhado e anotações marginais eficientes.',
        'Estimular a elaboração de esquemas visuais simples, tabelas e mapas mentais para fixação.',
        'Fortalecer a autoconfiança, a persistência e a postura protagonista diante de dúvidas e avaliações.'
      ],
      avaliacaoWeights: [
        { name: 'Engajamento e Rotina', percent: 35, color: 'bg-blue-500', text: 'Pontualidade, caderno organizado e participação nas oficinas' },
        { name: 'Atividades Práticas de Síntese', percent: 35, color: 'bg-indigo-600', text: 'Mapas mentais, fichas de estudo e cronogramas pessoais' },
        { name: 'Portfólio de Autoavaliação', percent: 30, color: 'bg-purple-600', text: 'Registro contínuo de metas atingidas e evolução pessoal' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre (Foco em Organização & Leitura)',
          items: [
            { titulo: 'Unidade 1: O Ambiente e a Rotina de Estudos', desc: 'Como planejar a semana; uso do planner escolar; eliminação de distrações e método Pomodoro adaptado para o EF.' },
            { titulo: 'Unidade 2: Leitura Ativa e Técnicas de Resumo', desc: 'Identificação da ideia central de parágrafos; técnicas de grifo consciente; confecção de resumos em tópicos e fichas de vocabulário.' }
          ]
        },
        {
          bimestre: '2º Semestre (Foco em Síntese & Autonomia)',
          items: [
            { titulo: 'Unidade 3: Esquemas Visuais e Mapas Conceituais', desc: 'Construção de mapas mentais coloridos com palavras-chave; cartões de memorização (flashcards) para datas e conceitos.' },
            { titulo: 'Unidade 4: Preparação para Avaliações e Projeto Pessoal', desc: 'Técnicas de resolução de provas, controle de ansiedade, revisão espaçada e estabelecimento de metas de aprendizagem para o ano seguinte.' }
          ]
        }
      ]
    },
    'eo_1ano_em': {
      id: 'eo_1ano_em',
      gradeLabel: '1ª Série do Ensino Médio',
      title: 'Plano de Curso: Estudos Orientados — 1ª Série do Ensino Médio',
      subtitle: 'Transição, Metodologias Científicas e Curadoria Crítica da Informação',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['ILGCH 1001'] }
      ],
      ementa: 'Adaptação à complexidade do Novo Ensino Médio e dos Itinerários Formativos. Aborda métodos de pesquisa em fontes confiáveis, combate à desinformação, técnicas avançadas de anotações (Método Cornell), planejamento estratégico de estudos e introdução ao Projeto de Vida acadêmico e profissional.',
      objetivos: [
        'Dominar técnicas estruturadas de tomada de notas em aula (Método Cornell e sínteses analíticas).',
        'Desenvolver competências de pesquisa digital crítica, seleção de fontes e combate a Fake News.',
        'Organizar cronogramas de estudo por blocos de áreas de conhecimento da BNCC.',
        'Construir o primeiro esboço do Projeto de Vida articulando os itinerários formativos aos objetivos futuros.'
      ],
      avaliacaoWeights: [
        { name: 'Produções Metodológicas', percent: 40, color: 'bg-indigo-600', text: 'Anotações Cornell, mapas conceituais e guias de pesquisa' },
        { name: 'Portfólio Digital/Físico', percent: 30, color: 'bg-blue-600', text: 'Documentação dos planos semanais e revisões sistemáticas' },
        { name: 'Seminário de Métodos & Projeto', percent: 30, color: 'bg-teal-600', text: 'Apresentação de estratégias de estudo e autoavaliação' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Estruturação & Ferramentas Avançadas',
          items: [
            { titulo: 'Unidade 1: Diagnóstico e Método Cornell', desc: 'Identificação de estilos de aprendizagem (VAK); metodologia de anotações Cornell; gestão de agenda digital e física.' },
            { titulo: 'Unidade 2: Curadoria Digital e Pesquisa Acadêmica', desc: 'Operadores booleanos de busca; avaliação de fontes acadêmicas e governamentais; normas básicas de citação ética e plágio.' }
          ]
        },
        {
          bimestre: '2º Semestre: Pensamento Estratégico & Projeto de Vida',
          items: [
            { titulo: 'Unidade 3: Síntese Interdisciplinar', desc: 'Integração de conceitos entre Ciências Humanas, Linguagens e Ciências da Natureza através de painéis conceituais e mapas de correlação.' },
            { titulo: 'Unidade 4: Planejamento para o Futuro', desc: 'Conexão dos estudos com exames nacionais (ENEM, vestibulares e cursos técnicos); plano de metas SMART individual.' }
          ]
        }
      ]
    },
    'eo_2ano_em': {
      id: 'eo_2ano_em',
      gradeLabel: '2ª Série do Ensino Médio',
      title: 'Plano de Curso: Estudos Orientados — 2ª Série do Ensino Médio',
      subtitle: 'Aprofundamento Acadêmico, Foco no ENEM e Autonomia Avançada',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['IFFC 2001', 'IFLA 2002'] }
      ],
      ementa: 'Aprofundamento de estratégias de alta performance e rigor acadêmico para a 2ª Série do Ensino Médio. Foco na resolução de questões complexas do ENEM e vestibulares estaduais (UERJ), produção de resenhas críticas, organização de grupos de estudo cooperativos e consolidação do Projeto de Vida.',
      objetivos: [
        'Aprimorar a capacidade de análise de matrizes de referência do ENEM e resolução sistemática de simulados.',
        'Desenvolver técnicas de memorização de longo prazo (repetição espaçada, curvas de esquecimento e active recall).',
        'Capacitar para a redação de resenhas críticas e sínteses teóricas de nível pré-universitário.',
        'Orientar a escolha vocacional e a preparação prática para os vestibulares e o mercado de trabalho.'
      ],
      avaliacaoWeights: [
        { name: 'Simulados & Análise de Erros', percent: 40, color: 'bg-purple-600', text: 'Caderno de erros comentados e planos de correção pedagógica' },
        { name: 'Resenhas e Sínteses Críticas', percent: 30, color: 'bg-indigo-600', text: 'Artigos de estudo e produções textuais aprofundadas' },
        { name: 'Plano de Ação Pré-Vestibular', percent: 30, color: 'bg-pink-600', text: 'Cronograma individual de estudos para o 3º ano e vestibulares' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Técnicas de Alta Performance e Matrizes do ENEM',
          items: [
            { titulo: 'Unidade 1: Active Recall e Flashcards Digitais', desc: 'Uso de ferramentas como Anki/fichamento; estudo ativo por questões; estratégias de gestão de energia e foco mental prolongado.' },
            { titulo: 'Unidade 2: Desconstrução de Questões do ENEM e UERJ', desc: 'Análise de distratores, competências e habilidades cobradas; elaboração de roteiros temáticos de revisão.' }
          ]
        },
        {
          bimestre: '2º Semestre: Resenhas Críticas e Direcionamento de Carreira',
          items: [
            { titulo: 'Unidade 3: Produção Textual e Resenhas Acadêmicas', desc: 'Estruturação de textos de síntese crítica para os itinerários formativos (IFFC e IFLA).' },
            { titulo: 'Unidade 4: Projeto de Vida e Transição para o 3º Ano', desc: 'Mapeamento de cursos superiores, SISU, PROUNI e itinerários profissionais; plano de preparação para o ano de conclusão.' }
          ]
        }
      ]
    },
    'eo_eja': {
      id: 'eo_eja',
      gradeLabel: 'EJA — Educação de Jovens e Adultos (Fase I / Ensino Médio)',
      title: 'Plano de Curso: Estudos Orientados — EJA Ensino Médio',
      subtitle: 'Reorganização do Tempo, Autonomia e Letramento Digital do Trabalhador',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CIEP 229 Cândido Portinari', classes: ['EJANEM I01'] }
      ],
      ementa: 'Estratégias de estudo acolhedoras e contextualizadas para o público jovem e adulto trabalhador. Foco no aproveitamento do tempo livre, técnicas práticas de leitura e interpretação de textos do cotidiano/trabalho, letramento digital e preparação para exames de certificação (ENCCEJA/ENEM).',
      objetivos: [
        'Resgatar a autoconfiança no processo de aprendizagem e valorizar os saberes prévios dos estudantes.',
        'Desenvolver estratégias realistas de estudo compatíveis com a jornada de trabalho e vida familiar.',
        'Capacitar no uso do celular e ferramentas digitais básicas para pesquisa, estudo e capacitação profissional.',
        'Preparar os estudantes para provas de certificação escolar e oportunidades de qualificação no mercado.'
      ],
      avaliacaoWeights: [
        { name: 'Participação nas Rodas e Oficinas', percent: 40, color: 'bg-emerald-600', text: 'Engajamento presencial, troca de experiências e assiduidade' },
        { name: 'Atividades Práticas de Caderno', percent: 30, color: 'bg-teal-600', text: 'Esquemas de leitura, mapas de metas e exercícios aplicados' },
        { name: 'Plano Pessoal de Qualificação', percent: 30, color: 'bg-blue-600', text: 'Roteiro de continuidade de estudos e certificação profissional' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Organização do Tempo e Letramento do Estudante Trabalhador',
          items: [
            { titulo: 'Unidade 1: Conciliando Trabalho, Família e Estudos', desc: 'Gestão de micro-momentos de estudo; técnicas de leitura rápida e sublinhado de textos informativos.' },
            { titulo: 'Unidade 2: Ferramentas Digitais para o Cotidiano', desc: 'Uso do smartphone para estudo, aplicativos de leitura de PDF, e-mails e plataformas do Governo (Conexão Educação).' }
          ]
        },
        {
          bimestre: '2º Semestre: Preparação para Certificações e Mundo do Trabalho',
          items: [
            { titulo: 'Unidade 3: Resolução Prática de Provas e Interpretação Textual', desc: 'Técnicas de leitura de enunciados, gráficos e tabelas frequentes em exames (ENCCEJA/ENEM).' },
            { titulo: 'Unidade 4: Projeto de Vida e Qualificação Profissional', desc: 'Elaboração de currículo moderno, cursos técnicos gratuitos, direitos trabalhistas e próximos passos educacionais.' }
          ]
        }
      ]
    }
  };

  // =========================================================================
  // 2. PLANOS DE CURSO: REFORÇO ESCOLAR INTERDISCIPLINAR (POR ANO)
  // =========================================================================
  const planosReforcoEscolar: Record<string, any> = {
    'reforco_fundamental': {
      id: 'reforco_fundamental',
      gradeLabel: '8º e 9º Anos do Ensino Fundamental',
      title: 'Plano de Curso: Reforço Escolar — Ensino Fundamental',
      subtitle: 'Nivelamento de Linguagens, Raciocínio Lógico e Matemática com Movimento',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'EE Cordélia Paiva', classes: ['801', '802', '803'] }
      ],
      ementa: 'Recuperação e consolidação de habilidades essenciais de leitura, escrita e raciocínio lógico-matemático. Utiliza dinâmicas corporais, jogos de regras, análise estatística de jogos escolares e resolução prática de problemas para superar defasagens de aprendizagem de forma dinâmica e significativa.',
      objetivos: [
        'Consolidar as quatro operações, frações, porcentagens e médias por meio de dados e tabelas de jogos.',
        'Desenvolver a interpretação textual e produção de pequenos gêneros (regras, crônicas esportivas, resumos).',
        'Trabalhar a geometria espacial e plana a partir das dimensões da quadra e materiais esportivos.',
        'Promover a cooperação e a autoavaliação contínua na superação de lacunas de aprendizagem.'
      ],
      avaliacaoWeights: [
        { name: 'Participação Prática & Circuitos', percent: 40, color: 'bg-emerald-600', text: 'Engajamento nas oficinas de lógica, medições e jogos de palavras' },
        { name: 'Caderno de Nivelamento & Tabelas', percent: 30, color: 'bg-teal-600', text: 'Registros de cálculos, gráficos de desempenho e produções escritas' },
        { name: 'Desafio Prático em Grupo', percent: 30, color: 'bg-blue-600', text: 'Criação de jogos com regulamento escrito e pontuação calculada' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Matemática Aplicada & Leitura Contextualizada',
          items: [
            { titulo: 'Unidade 1: Grandezas, Medidas e Geometria Prática', desc: 'Uso de fitas métricas e trenas para cálculo de perímetro e área da quadra; conversões de medidas (m, cm, km) em circuitos.' },
            { titulo: 'Unidade 2: Estatística Básica e Interpretação Textual', desc: 'Coleta de dados de arremessos e partidas; construção de tabelas e gráficos de barras; leitura orientada de notícias esportivas.' }
          ]
        },
        {
          bimestre: '2º Semestre: Raciocínio Lógico & Produção Escrita Autoral',
          items: [
            { titulo: 'Unidade 3: Jogos de Estratégia e Resolução de Problemas', desc: 'Damas, xadrez básico, dominó fracionário e desafios de lógica sequencial.' },
            { titulo: 'Unidade 4: Escrita de Regras e Festival de Jogos Criados', desc: 'Redação em grupo de um manual de regras claro e coerente; apresentação oral e teste prático com a turma.' }
          ]
        }
      ]
    },
    'reforco_em': {
      id: 'reforco_em',
      gradeLabel: '1ª e 2ª Séries do Ensino Médio',
      title: 'Plano de Curso: Reforço Escolar — Ensino Médio',
      subtitle: 'Recuperação de Habilidades Críticas da BNCC: Argumentação e Lógica',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['1001', '2001', '2002'] }
      ],
      ementa: 'Nivelamento de competências leitoras, argumentativas e lógico-quantitativas necessárias para o sucesso no Ensino Médio e avaliações externas (Avalia RJ, Saeb, ENEM). Enfatiza a leitura crítica de infográficos, raciocínio proporcional, redação dissertativo-argumentativa e pensamento científico.',
      objetivos: [
        'Aprimorar a leitura e interpretação de gráficos, infográficos e textos científicos contemporâneos.',
        'Desenvolver a estruturação lógica de argumentos e a coesão textual em redações e respostas discursivas.',
        'Dominar cálculos de probabilidade simples, proporções, taxas percentuais e interpretação de indicadores sociais.',
        'Estimular o rigor analítico e a capacidade de relacionar causas e consequências em fenômenos sociais e naturais.'
      ],
      avaliacaoWeights: [
        { name: 'Oficinas de Resolução de Problemas', percent: 40, color: 'bg-indigo-600', text: 'Exercícios práticos de lógica, interpretação de dados e argumentação' },
        { name: 'Produção Textual e Reescrita', percent: 30, color: 'bg-purple-600', text: 'Textos argumentativos, sínteses de artigos e análises críticas' },
        { name: 'Painel Interdisciplinar Integrador', percent: 30, color: 'bg-blue-600', text: 'Apresentação em equipe resolvendo um problema real da comunidade' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Letramento Matemático & Leitura Crítica',
          items: [
            { titulo: 'Unidade 1: Análise de Dados e Indicadores Sociais', desc: 'Interpretação de censos escolares, estatísticas de saúde e gráficos econômicos; cálculo de taxas e proporções.' },
            { titulo: 'Unidade 2: Estrutura Argumentativa e Tese', desc: 'Identificação da tese do autor; diferenciação entre fato, opinião e falácia lógica; redação de parágrafos argumentativos.' }
          ]
        },
        {
          bimestre: '2º Semestre: Raciocínio Científico & Síntese Interdisciplinar',
          items: [
            { titulo: 'Unidade 3: Lógica Dedutiva e Método Científico', desc: 'Resolução de problemas através de hipóteses, deduções e testes práticos; análise de experimentos clássicos.' },
            { titulo: 'Unidade 4: Redação de Síntese e Projeto de Intervenção', desc: 'Construção de propostas de intervenção fundamentadas com proposta de solução viável e cálculo de viabilidade.' }
          ]
        }
      ]
    },
    'reforco_eja': {
      id: 'reforco_eja',
      gradeLabel: 'EJA — Educação de Jovens e Adultos',
      title: 'Plano de Curso: Reforço Escolar — EJA Ensino Médio',
      subtitle: 'Matemática Financeira do Cotidiano, Leitura Cidadã e Direitos',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CIEP 229 Cândido Portinari', classes: ['EJANEM I01'] }
      ],
      ementa: 'Nivelamento de aprendizagens com foco na aplicabilidade imediata para jovens e adultos. Aborda matemática financeira prática (orçamento familiar, juros, descontos, compras a prazo), interpretação de contratos e contas de serviços, leitura de notícias e escrita de documentos funcionais.',
      objetivos: [
        'Capacitar no cálculo e interpretação de juros simples, descontos e planejamento do orçamento familiar.',
        'Desenvolver a leitura crítica de faturas, contratos de trabalho, contracheques e editais de emprego.',
        'Fortalecer a escrita clara de solicitações, cartas de apresentação e mensagens formais.',
        'Promover o protagonismo cidadão e a segurança no manejo de informações do dia a dia.'
      ],
      avaliacaoWeights: [
        { name: 'Atividades Práticas de Vida Real', percent: 40, color: 'bg-emerald-600', text: 'Simulações de orçamento, análise de faturas e cálculos práticos' },
        { name: 'Caderno de Exercícios e Produções', percent: 30, color: 'bg-teal-600', text: 'Textos funcionais e problemas de matemática resolvidos' },
        { name: 'Roda de Diálogo e Troca de Saberes', percent: 30, color: 'bg-blue-600', text: 'Participação, assiduidade e contribuição com experiências práticas' }
      ],
      unidades: [
        {
          bimestre: '1º Semestre: Matemática do Cotidiano & Finanças Pessoais',
          items: [
            { titulo: 'Unidade 1: Operações Fundamentais e Orçamento', desc: 'Controle de receitas e despesas familiares; cálculo de porcentagens em promoções e compras a prazo vs. à vista.' },
            { titulo: 'Unidade 2: Juros, Inflação e Contas de Consumo', desc: 'Leitura de contas de luz, água e faturas de cartão; compreensão do que são taxas de juros e armadilhas de endividamento.' }
          ]
        },
        {
          bimestre: '2º Semestre: Leitura de Direitos, Trabalho e Escrita Cidadã',
          items: [
            { titulo: 'Unidade 3: Leitura e Interpretação de Documentos', desc: 'Análise de holerites/contracheques, direitos da CLT, avisos oficiais e formulários governamentais (Gov.br).' },
            { titulo: 'Unidade 4: Produção de Textos Formais e Comunicação', desc: 'Escrita de requerimentos simples, currículos profissionais atualizados e mensagens formais de trabalho.' }
          ]
        }
      ]
    }
  };

  // =========================================================================
  // 3. PLANOS DE CURSO: EDUCAÇÃO FÍSICA & ITINERÁRIOS FORMATIVOS (SEEDUC-RJ)
  // =========================================================================
  const planosEducacaoFisicaEItinerarios: Record<string, any> = {
    'cordelia_8ano': {
      id: 'cordelia_8ano',
      badge: 'Ensino Fundamental • 8º Ano',
      title: 'Plano de Curso: Educação Física — 8º Ano do Ensino Fundamental',
      subtitle: 'Cultura Corporal, Esportes de Rede/Parede, Handebol, Jogos do Mundo e Saúde',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'Colégio Estadual Cordélia Paiva', classes: ['Turma 801', 'Turma 802', 'Turma 803'] }
      ],
      ementa: 'Vivência e reflexão crítica sobre as práticas corporais da cultura de movimento no 8º ano do EF. Aborda esportes de rede/parede (Altinha e Futevôlei), esportes de invasão (Handebol, Basquete, Futsal), jogos de tabuleiro e concentração de matrizes mundiais (África, Ásia e Europa), manifestações rítmicas, práticas corporais inclusivas e promoção de hábitos de vida ativa.',
      objetivos: [
        'Apropriar-se dos fundamentos técnicos e táticos da Altinha e do Futevôlei (toque, passe, controle na areia/quadra).',
        'Compreender as regras, história e dinâmica coletiva do Handebol e esportes de invasão.',
        'Resgatar e confeccionar jogos de tabuleiro e cartas de diferentes partes do mundo (mancala, damas com material reciclável, xadrez).',
        'Debater a importância da atividade física, nutrição saudável e respeito à diversidade corporal.'
      ],
      avaliacaoWeights: [
        { name: 'Vivência Prática & Cooperação', percent: 40, color: 'bg-amber-600', text: 'Participação ativa nos treinos, jogos pré-desportivos e fair play' },
        { name: 'Trabalho do 2º Trimestre (Jogos do Mundo)', percent: 30, color: 'bg-orange-600', text: 'Trabalho manuscrito (capa, intro, desenv, refs) e apresentação prática de jogos de tabuleiro' },
        { name: 'Avaliação Teórica & Caderno', percent: 30, color: 'bg-red-600', text: 'Provas trimestrais de regras/fundamentos e anotações teóricas do quadro' }
      ],
      unidades: [
        {
          bimestre: '1º Trimestre (05/02 a 18/05) — Diagnóstico e Fundamentos',
          items: [
            { titulo: 'Unidade 1: Corpo, Saúde e Diagnóstico Motor', desc: 'Medição antropométrica básica, resistência aeróbica e introdução às regras de convivência e segurança na quadra.' },
            { titulo: 'Unidade 2: Esportes Coletivos de Invasão', desc: 'Fundamentos de passe, drible e marcação; importância do trabalho em equipe e combate ao preconceito.' }
          ]
        },
        {
          bimestre: '2º Trimestre (19/05 a 04/09) — Altinha, Futevôlei & Jogos do Mundo',
          items: [
            { titulo: 'Unidade 3: Esportes de Rede e Areia (Altinha e Futevôlei)', desc: 'História, regras, toque de pé, coxa, peito e cabeça; jogos pré-desportivos e fute-mesa adaptado.' },
            { titulo: 'Unidade 4: Jogos de Tabuleiro, Concentração e Culturas do Mundo', desc: 'Pesquisa e confecção de tabuleiros de damas e jogos tradicionais africanos e asiáticos com tampinhas e papelão.' }
          ]
        },
        {
          bimestre: '3º Trimestre (08/09 a 22/12) — Handebol, Inclusão Paralímpica e Vida Ativa',
          items: [
            { titulo: 'Unidade 5: Handebol Técnico-Tático', desc: 'Recepção, passe ombro, arremesso em suspensão, sistema defensivo 6:0 e regras oficiais.' },
            { titulo: 'Unidade 6: Esporte Paralímpico e Plano de Vida Ativa', desc: 'Vivências de goalball, vôlei sentado e elaboração do plano individual de prática sustentável de exercícios.' }
          ]
        }
      ]
    },
    'ciep229_eja': {
      id: 'ciep229_eja',
      badge: 'EJA • Ensino Médio Fase I',
      title: 'Plano de Curso: Educação Física — EJA Ensino Médio',
      subtitle: 'Ergonomia, Saúde do Trabalhador, Lazer Ativo e Qualidade de Vida',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CIEP 229 Cândido Portinari', classes: ['Turma EJANEM I01'] }
      ],
      ementa: 'Educação Física voltada para a realidade do estudante jovem e adulto trabalhador. Foco em ginástica laboral, prevenção de Lesões por Esforços Repetitivos (LER/DORT), ergonomia postural, o direito ao lazer e vivências esportivas e recreativas adaptadas ao turno da noite.',
      objetivos: [
        'Compreender princípios de ergonomia e postura correta para o dia a dia de trabalho e tarefas domésticas.',
        'Praticar exercícios de alongamento, mobilidade articular e relaxamento para redução do estresse.',
        'Refletir sobre o lazer como direito social e elemento essencial para a saúde física e mental.',
        'Vivenciar práticas corporais cooperativas e esportes recreativos em ambiente acolhedor.'
      ],
      avaliacaoWeights: [
        { name: 'Participação nas Vivências Práticas', percent: 40, color: 'bg-emerald-600', text: 'Engajamento nos circuitos posturais, alongamentos e jogos recreativos' },
        { name: 'Caderno de Hábitos Saudáveis & Ergonomia', percent: 30, color: 'bg-teal-600', text: 'Registro de rotinas posturais e reflexões teóricas' },
        { name: 'Seminário de Saúde do Trabalhador', percent: 30, color: 'bg-blue-600', text: 'Apresentação em grupo sobre prevenção de dores ocupacionais e lazer' }
      ],
      unidades: [
        {
          bimestre: '1º Trimestre — Consciência Corporal e Postura',
          items: [
            { titulo: 'Unidade 1: Ergonomia no Trabalho e no Lar', desc: 'Biomecânica da coluna, como levantar pesos com segurança e ajuste ergonômico de postos de trabalho.' },
            { titulo: 'Unidade 2: Ginástica Laboral e Respiratória', desc: 'Séries curtas de alongamentos para pausas ativas e controle da ansiedade e estresse.' }
          ]
        },
        {
          bimestre: '2º Trimestre — Lazer, Esportes e Integração',
          items: [
            { titulo: 'Unidade 3: O Lazer como Direito e Qualidade de Vida', desc: 'História do lazer para a classe trabalhadora; espaços públicos de atividade física nas comunidades.' },
            { titulo: 'Unidade 4: Jogos Recreativos e Cooperativos', desc: 'Voleibol adaptado, peteca, caminhada orientada e jogos de tabuleiro para integração social.' }
          ]
        },
        {
          bimestre: '3º Trimestre — Saúde Preventiva e Longevidade',
          items: [
            { titulo: 'Unidade 5: Prevenção de Doenças Crônicas', desc: 'Hipertensão, diabetes, sedentarismo e como manter o coração saudável com exercícios regulares.' },
            { titulo: 'Unidade 6: Elaboração do Plano de Autocuidado', desc: 'Construção de uma rotina semanal sustentável de atividade física para o trabalhador.' }
          ]
        }
      ]
    },
    'ilgch_1001': {
      id: 'ilgch_1001',
      badge: 'Itinerário Formativo • 1ª Série EM',
      title: 'Plano de Curso: ILGCH — Decolonização de Corpos, Estética, Mídia e Espaços',
      subtitle: 'Itinerário Formativo de Linguagens e Ciências Humanas e Sociais Aplicadas',
      period: 'Ano Letivo 2026 • SEEDUC-RJ (Lei 10.639/03 e 11.645/08)',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['Turma ILGCH 1001'] }
      ],
      ementa: 'Análise crítica e decolonial da cultura corporal e das representações estéticas nos meios de comunicação de massa e mídias digitais. Fundamentado na Lei Federal 10.639/03 e 11.645/08 e autores como Frantz Fanon, Lélia Gonzalez e Silvio Almeida, o curso investiga o racismo estético, a hipersexualização, a padronização eurocêntrica, o colorismo, os filtros digitais e valoriza as epistemologias e práticas corporais afrodiaspóricas e originárias.',
      objetivos: [
        'Analisar a corporeidade como território histórico e político atravessado por marcadores de raça, gênero e classe.',
        'Compreender as dimensões do racismo institucional e estrutural (Silvio Almeida) e o racismo por denegação (Lélia Gonzalez).',
        'Desconstruir os padrões estéticos eurocêntricos reproduzidos pela publicidade, algoritmos e filtros de redes sociais.',
        'Valorizar as manifestações corporais, lutas ancestrais (capoeira), danças urbanas e esportes dos povos originários e afro-brasileiros.'
      ],
      avaliacaoWeights: [
        { name: 'Debates & Seminários Temáticos', percent: 40, color: 'bg-purple-600', text: 'Participação crítica nas discussões sobre artigos teóricos e temas da mídia' },
        { name: 'Portfólio Crítico & Mapas Mentais', percent: 30, color: 'bg-indigo-600', text: 'Produção escrita de resumos conceituais, análise de propagandas e filtros' },
        { name: 'Projeto Final / Sarau Decolonial', percent: 30, color: 'bg-pink-600', text: 'Apresentação em grupo de ensaio visual, audiovisual ou intervenção cultural' }
      ],
      unidades: [
        {
          bimestre: '1º Trimestre (05/02 a 18/05) — Cultura Corporal e o Iceberg do Padrão',
          items: [
            { titulo: 'Unidade 1: Corpo como Marcador e Território', desc: 'Todo corpo é um mapa; corporeidade e linguagem; quem define o belo?; a indústria da insegurança corporal.' },
            { titulo: 'Unidade 2: O Racismo Invisível e Estético', desc: 'Conceitos de Fanon, Lélia Gonzalez e Silvio Almeida; branquitude como norma universal; colorismo na mídia.' }
          ]
        },
        {
          bimestre: '2º Trimestre (19/05 a 04/09) — Algoritmos, Filtros e Resistência Ancestral',
          items: [
            { titulo: 'Unidade 3: Algoritmos e o Branqueamento Digital', desc: 'Filtros de redes sociais afinadores de traços; reprodução de vieses pela inteligência artificial; impacto psíquico na juventude.' },
            { titulo: 'Unidade 4: Práticas Corporais dos Povos Originários e Afro-Brasileiros', desc: 'Jogos indígenas (corrida de tora, xikunahity); Capoeira como pedagogia de resistência e ancestralidade.' }
          ]
        },
        {
          bimestre: '3º Trimestre (08/09 a 22/12) — Gênero no Esporte, Equidade Salarial e Síntese',
          items: [
            { titulo: 'Unidade 5: Gênero, Sociedade e Apagamento no Esporte', desc: 'Divisão sexista dos corpos; pioneiras olímpicas brasileiras; disparidade salarial e hipersexualização midiática.' },
            { titulo: 'Unidade 6: Seminário Integrador e Sarau de Resistência', desc: 'Apresentação dos projetos finais e intervenção no espaço escolar para a Semana da Consciência Negra.' }
          ]
        }
      ]
    },
    'iffc_2001': {
      id: 'iffc_2001',
      badge: 'Itinerário Formativo • 2ª Série EM',
      title: 'Plano de Curso: IFFC — Iniciação Filosófico-Científica e Formação Científica',
      subtitle: 'Itinerário Formativo de Aprofundamento Científico e Filosófico (SEEDUC-RJ)',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['Turma IFFC 2001'] }
      ],
      ementa: 'Conforme as orientações curriculares da SEEDUC-RJ para os Itinerários Formativos do Novo Ensino Médio, o componente IFFC (Iniciação / Formação Filosófico-Científica) visa desenvolver o espírito investigativo, o pensamento crítico e os métodos de produção do conhecimento científico. Aborda a epistemologia da ciência (de Aristóteles a Karl Popper e Thomas Kuhn), formulação de hipóteses, ética e bioética na pesquisa, técnicas de coleta e análise de dados quanti-qualitativos, combate ao negacionismo científico e divulgação científica escolar.',
      objetivos: [
        'Compreender o método científico como processo rigoroso, testável e historicamente situado.',
        'Desenvolver a capacidade de elaborar perguntas de pesquisa, formular hipóteses e desenhar experimentos simples.',
        'Analisar criticamente o impacto social, ético e ambiental dos avanços científicos e tecnológicos (Bioética).',
        'Elaborar e apresentar um artigo ou projeto de pesquisa escolar aplicando normas básicas de metodologia (ABNT).'
      ],
      avaliacaoWeights: [
        { name: 'Projeto de Iniciação Científica Escolar', percent: 40, color: 'bg-blue-600', text: 'Elaboração do projeto de pesquisa (tema, problema, justificativa, metodologia e coleta)' },
        { name: 'Debates Epistemológicos e Bioéticos', percent: 30, color: 'bg-indigo-600', text: 'Participação em júris simulados sobre ética na ciência, inteligência artificial e biotecnologia' },
        { name: 'Caderno de Metodologia e Relatórios', percent: 30, color: 'bg-emerald-600', text: 'Resenhas de artigos científicos, fichamentos e relatórios de observação empírica' }
      ],
      unidades: [
        {
          bimestre: '1º Trimestre — Epistemologia, Filosofia da Ciência e Pensamento Crítico',
          items: [
            { titulo: 'Unidade 1: O que é Ciência? Filosofia e Conhecimento', desc: 'Diferença entre senso comum, mito, religião e conhecimento científico; falseabilidade (Karl Popper) e paradigmas (Thomas Kuhn).' },
            { titulo: 'Unidade 2: O Método Científico na Prática', desc: 'Observação sistemática, formulação de hipóteses, variáveis dependentes e independentes, grupos de controle.' }
          ]
        },
        {
          bimestre: '2º Trimestre — Ética, Bioética e Combate ao Negacionismo',
          items: [
            { titulo: 'Unidade 3: Ética na Pesquisa e Bioética Contemporânea', desc: 'História dos comitês de ética; manipulação genética, privacidade de dados, IA e testes científicos em humanos/animais.' },
            { titulo: 'Unidade 4: Divulgação Científica vs. Pseudociência', desc: 'Como checar afirmações científicas; artigos revisados por pares (peer review); combate a notícias falsas em saúde e clima.' }
          ]
        },
        {
          bimestre: '3º Trimestre — Execução da Pesquisa e Feira de Ciências Escolar',
          items: [
            { titulo: 'Unidade 5: Coleta, Tratamento de Dados e Estatística', desc: 'Elaboração de questionários (Google Forms / impressos), amostragem, gráficos e análise de resultados.' },
            { titulo: 'Unidade 6: Redação do Artigo Científico e Apresentação', desc: 'Estruturação do relatório final (resumo, introdução, metodologia, resultados, conclusão) e apresentação oral.' }
          ]
        }
      ]
    },
    'ifla_2002': {
      id: 'ifla_2002',
      badge: 'Itinerário Formativo • 2ª Série EM',
      title: 'Plano de Curso: IFLA — Iniciação Filosófico-Literária e Artes',
      subtitle: 'Itinerário Formativo de Linguagens, Literatura e Expressões Artísticas (SEEDUC-RJ)',
      period: 'Ano Letivo 2026 • SEEDUC-RJ',
      schools: [
        { name: 'CE Doutor Ignácio B. Menezes', classes: ['Turma IFLA 2002'] }
      ],
      ementa: 'Alinhado às diretrizes da SEEDUC-RJ para o Novo Ensino Médio, o componente IFLA (Iniciação Filosófico-Literária e Artes) promove o diálogo transdisciplinar entre a literatura, a filosofia da arte (estética) e as linguagens artísticas contemporâneas (visuais, cênicas, sonoras e digitais). Explora a estética da recepção, as poéticas periféricas e urbanas (slam, rap, grafite), o patrimônio cultural do Estado do Rio de Janeiro, a curadoria de exposições escolares e a produção autoral poética e audiovisual.',
      objetivos: [
        'Analisar criticamente obras literárias e manifestações artísticas sob o prisma da filosofia estética.',
        'Compreender as relações entre texto literário, contexto histórico e questões identitárias contemporâneas.',
        'Desenvolver produções autorais poéticas, narrativas, fotográficas ou audiovisuais.',
        'Planejar e executar uma curadoria cultural escolar (varal poético, sarau, podcast literário ou galeria visual).'
      ],
      avaliacaoWeights: [
        { name: 'Produção Autoral & Criação Artística', percent: 40, color: 'bg-pink-600', text: 'Criação de poemas, ensaios literários, zines, ilustrações ou curtas audiovisuais' },
        { name: 'Curadoria e Participação em Saraus', percent: 30, color: 'bg-purple-600', text: 'Organização da mostra cultural, varal de textos e apresentação cênico-literária' },
        { name: 'Caderno de Estética e Resenhas Críticas', percent: 30, color: 'bg-indigo-600', text: 'Resenhas de obras lidas, análises conceituais de exposições e fichamentos teóricos' }
      ],
      unidades: [
        {
          bimestre: '1º Trimestre — Estética Filosófica e a Palavra como Criação',
          items: [
            { titulo: 'Unidade 1: O Belo, o Sublime e a Filosofia da Arte', desc: 'Conceitos clássicos e contemporâneos de arte; a arte como reflexão sobre a condição humana e denúncia social.' },
            { titulo: 'Unidade 2: Literatura e Representação da Realidade', desc: 'Vozes marginalizadas na literatura brasileira (Carolina Maria de Jesus, Lima Barreto, Conceição Evaristo).' }
          ]
        },
        {
          bimestre: '2º Trimestre — Poéticas Urbanas, Linguagens Híbridas e Audiovisual',
          items: [
            { titulo: 'Unidade 3: Slam, Poesia Falada e Cultura Hip-Hop', desc: 'A palavra falada (spoken word), ritmo, métrica e a batalha de poesia como espaço de debate social fluminense.' },
            { titulo: 'Unidade 4: Artes Visuais, Fotografia e Narrativas Digitais', desc: 'Composição de imagem, zines independentes, foto-poesia e criação de podcasts literários.' }
          ]
        },
        {
          bimestre: '3º Trimestre — Curadoria Cultural e Festival de Linguagens',
          items: [
            { titulo: 'Unidade 5: O que é Curadoria Artística?', desc: 'Como selecionar obras, criar narrativas expositivas, escrever textos curatoriais e montar espaços imersivos.' },
            { titulo: 'Unidade 6: Sarau Cultural e Lançamento de Produções', desc: 'Realização do sarau integrado no colégio com leitura dramática, mostra de zines e apresentações artísticas.' }
          ]
        }
      ]
    }
  };

  // Resolve currently active plan
  let currentPlanData: any = null;
  if (mainTab === 'estudos_orientados') {
    currentPlanData = planosEstudosOrientados[selectedSubTab] || planosEstudosOrientados['eo_fundamental'];
  } else if (mainTab === 'reforco_escolar') {
    currentPlanData = planosReforcoEscolar[selectedSubTab] || planosReforcoEscolar['reforco_fundamental'];
  } else if (mainTab === 'educacao_fisica') {
    currentPlanData = planosEducacaoFisicaEItinerarios[selectedSubTab] || planosEducacaoFisicaEItinerarios['cordelia_8ano'];
  }

  return (
    <div className="space-y-8 animate-fade-in pb-20 max-w-6xl mx-auto">
      {/* Header Padrão Unificado */}
      <div className="print:hidden">
        <ScreenHeader
          onBack={onBack}
          badge="SEEDUC-RJ • 2026"
          statusBadge="RESOLUÇÃO Nº 6392/2025"
          title="PLANO DE CURSO OFICIAL"
          subtitle="Planejamento curricular completo por componente, unidade escolar e ano de escolaridade"
          actions={
            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 text-xs"
            >
              <Printer className="w-4 h-4" />
              Imprimir / PDF
            </button>
          }
        />
      </div>

      {/* Main Disciplines Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 print:hidden">
        {/* 1. Educação Física & Itinerários */}
        <button
          onClick={() => {
            setMainTab('educacao_fisica');
            setSelectedSubTab('cordelia_8ano');
          }}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
            mainTab === 'educacao_fisica'
              ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white border-amber-400 shadow-xl scale-[1.02]'
              : 'bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${mainTab === 'educacao_fisica' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'}`}>
              <Dumbbell className="w-5 h-5" />
            </div>
            {mainTab === 'educacao_fisica' && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-tight leading-snug">Educação Física & Itinerários</h3>
            <p className={`text-[11px] font-medium mt-1 ${mainTab === 'educacao_fisica' ? 'text-amber-100' : 'text-slate-500'}`}>
              Cordélia, Ignácio, Sandro Moreyra, Portinari & Lazaroni
            </p>
          </div>
        </button>

        {/* 2. Estudos Orientados */}
        <button
          onClick={() => {
            setMainTab('estudos_orientados');
            setSelectedSubTab('eo_fundamental');
          }}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
            mainTab === 'estudos_orientados'
              ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-indigo-400 shadow-xl scale-[1.02]'
              : 'bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${mainTab === 'estudos_orientados' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
              <Compass className="w-5 h-5" />
            </div>
            {mainTab === 'estudos_orientados' && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-tight leading-snug">Estudos Orientados</h3>
            <p className={`text-[11px] font-medium mt-1 ${mainTab === 'estudos_orientados' ? 'text-indigo-100' : 'text-slate-500'}`}>
              Organização, Métodos & Projeto de Vida (EF, EM e EJA)
            </p>
          </div>
        </button>

        {/* 3. Reforço Escolar */}
        <button
          onClick={() => {
            setMainTab('reforco_escolar');
            setSelectedSubTab('reforco_fundamental');
          }}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
            mainTab === 'reforco_escolar'
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-xl scale-[1.02]'
              : 'bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${mainTab === 'reforco_escolar' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
              <Brain className="w-5 h-5" />
            </div>
            {mainTab === 'reforco_escolar' && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-tight leading-snug">Reforço Escolar</h3>
            <p className={`text-[11px] font-medium mt-1 ${mainTab === 'reforco_escolar' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Nivelamento, Lógica, Escrita & Movimento (EF, EM e EJA)
            </p>
          </div>
        </button>

        {/* 4. Calendário 2026 */}
        <button
          onClick={() => setActiveTabToCalendario()}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
            mainTab === 'calendario'
              ? 'bg-gradient-to-br from-purple-600 to-indigo-800 text-white border-purple-400 shadow-xl scale-[1.02]'
              : 'bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${mainTab === 'calendario' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-600'}`}>
              <Calendar className="w-5 h-5" />
            </div>
            {mainTab === 'calendario' && (
              <span className="w-2.5 h-2.5 rounded-full bg-purple-300 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-tight leading-snug">Calendário SEEDUC 2026</h3>
            <p className={`text-[11px] font-medium mt-1 ${mainTab === 'calendario' ? 'text-purple-100' : 'text-slate-500'}`}>
              Resolução 6392/2025 • 3 Trimestres & COCs
            </p>
          </div>
        </button>
      </div>

      {/* SUB-TABS SELECTOR: ANOS DE ESCOLARIDADE E TURMAS */}
      {mainTab !== 'calendario' && (
        <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Layers size={13} />
              Selecione o Ano de Escolaridade / Escola & Turma:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {mainTab === 'educacao_fisica' && (
              <>
                <button
                  onClick={() => setSelectedSubTab('cordelia_8ano')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'cordelia_8ano'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <School size={14} />
                  <span>CE Cordélia Paiva • 801, 802 e 803 (8º Ano EF)</span>
                </button>

                <button
                  onClick={() => setSelectedSubTab('ciep229_eja')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'ciep229_eja'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Activity size={14} />
                  <span>CIEP 229 Cândido Portinari • EJANEM I01 (EJA EM)</span>
                </button>

                <button
                  onClick={() => setSelectedSubTab('ilgch_1001')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'ilgch_1001'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>ILGCH • 1001 (CE Dr. Ignácio)</span>
                </button>

                <button
                  onClick={() => setSelectedSubTab('iffc_2001')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'iffc_2001'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Microscope size={14} />
                  <span>IFFC • 2001 (CE Dr. Ignácio — Formação Científica)</span>
                </button>

                <button
                  onClick={() => setSelectedSubTab('ifla_2002')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'ifla_2002'
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Palette size={14} />
                  <span>IFLA • 2002 (CE Dr. Ignácio — Linguagens & Artes)</span>
                </button>
              </>
            )}

            {mainTab === 'estudos_orientados' && (
              <>
                <button
                  onClick={() => setSelectedSubTab('eo_fundamental')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'eo_fundamental'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Ensino Fundamental II (8º e 9º Anos)</span>
                </button>
                <button
                  onClick={() => setSelectedSubTab('eo_1ano_em')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'eo_1ano_em'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>1ª Série do Ensino Médio (Transição & Métodos)</span>
                </button>
                <button
                  onClick={() => setSelectedSubTab('eo_2ano_em')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'eo_2ano_em'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>2ª Série do Ensino Médio (ENEM & Autonomia)</span>
                </button>
                <button
                  onClick={() => setSelectedSubTab('eo_eja')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'eo_eja'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>EJA — Educação de Jovens e Adultos</span>
                </button>
              </>
            )}

            {mainTab === 'reforco_escolar' && (
              <>
                <button
                  onClick={() => setSelectedSubTab('reforco_fundamental')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'reforco_fundamental'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Ensino Fundamental II (8º e 9º Anos)</span>
                </button>
                <button
                  onClick={() => setSelectedSubTab('reforco_em')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'reforco_em'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Ensino Médio (1ª e 2ª Séries — Argumentação & Lógica)</span>
                </button>
                <button
                  onClick={() => setSelectedSubTab('reforco_eja')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    selectedSubTab === 'reforco_eja'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>EJA — Educação de Jovens e Adultos (Matemática & Cidadania)</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* VIEW CONTENT AREA */}
      {mainTab === 'calendario' ? (
        /* CALENDARIO & DATAS OFICIAIS SEEDUC-RJ 2026 (RESOLUÇÃO 6392/2025) */
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3 text-purple-600 font-extrabold text-xs uppercase tracking-widest mb-2">
              <Calendar className="w-5 h-5" />
              <span>Governo do Estado do Rio de Janeiro • Secretaria de Estado de Educação (SEEDUC-RJ)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Calendário Escolar Oficial 2026 — Resolução SEEDUC Nº 6392/2025
            </h2>
            <p className="text-slate-600 mt-2 font-medium text-sm">
              Total de <strong>206 dias letivos</strong> estruturados em 3 Trimestres e Conselhos de Classe (COC) para o Ensino Regular, EJA e Itinerários Formativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bloco 1º Trimestre */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-xs uppercase">1º Trimestre</span>
                <span className="font-bold text-xs text-blue-900">66 Dias Letivos</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">05 de Fevereiro a 18 de Maio</p>
              <div className="pt-2 border-t border-blue-200 text-xs text-slate-700 space-y-1">
                <p>• <strong>Início do Período [I]:</strong> 05/02/2026</p>
                <p>• <strong>Avaliação Diagnóstica [AVALI]:</strong> Fevereiro</p>
                <p>• <strong>COC 1 (Conselho de Classe):</strong> 19 a 21 de Maio</p>
              </div>
            </div>

            {/* Bloco 2º Trimestre */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-black text-xs uppercase">2º Trimestre</span>
                <span className="font-bold text-xs text-amber-900">67 Dias Letivos</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">19 de Maio a 04 de Setembro</p>
              <div className="pt-2 border-t border-amber-200 text-xs text-slate-700 space-y-1">
                <p>• <strong>Recesso Escolar [R]:</strong> Julho</p>
                <p>• <strong>Censo Escolar [C]:</strong> 28 de Maio</p>
                <p>• <strong>COC 2 (Conselho de Classe):</strong> 08 a 10 de Setembro</p>
              </div>
            </div>

            {/* Bloco 3º Trimestre */}
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-black text-xs uppercase">3º Trimestre</span>
                <span className="font-bold text-xs text-purple-900">73 Dias Letivos</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">08 de Setembro a 22 de Dezembro</p>
              <div className="pt-2 border-t border-purple-200 text-xs text-slate-700 space-y-1">
                <p>• <strong>Dia do Mestre [DM]:</strong> 15 de Outubro</p>
                <p>• <strong>COC 3 (Conselho de Classe):</strong> 09 a 11 de Dezembro</p>
                <p>• <strong>Término do Período [T]:</strong> 22 de Dezembro</p>
              </div>
            </div>
          </div>

          {/* Dicionário de Legendas & Semanas de Projetos */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-black text-slate-900 text-sm uppercase flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-indigo-600" />
              Semanas de Projetos Específicos & Avaliações da Rede SEEDUC-RJ
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-black mb-1">[SVM]</span>
                <p className="font-bold text-slate-800">Semana da Mulher</p>
                <span className="text-[10px] text-slate-500">Valorização Feminina</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-black mb-1">[PVE/CBL]</span>
                <p className="font-bold text-slate-800">Combate ao Bullying</p>
                <span className="text-[10px] text-slate-500">Cultura de Paz</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-black mb-1">[SEP]</span>
                <p className="font-bold text-slate-800">Sem. Paralímpica</p>
                <span className="text-[10px] text-slate-500">Inclusão e Acessibilidade</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-black mb-1">[SCI]</span>
                <p className="font-bold text-slate-800">Semana Cultural</p>
                <span className="text-[10px] text-slate-500">Arte e Patrimônio</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-800 font-black mb-1">[AVALIA RJ]</span>
                <p className="font-bold text-slate-800">Avalia RJ</p>
                <span className="text-[10px] text-slate-500">Avaliação Externa</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-black mb-1">[PEM]</span>
                <p className="font-bold text-slate-800">Ed. em Movimento</p>
                <span className="text-[10px] text-slate-500">Esporte e Saúde</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* DETAILED COURSE PLAN DOCUMENT */
        currentPlanData && (
          <div className="bg-white rounded-3xl p-8 md:p-14 shadow-2xl border border-slate-200 space-y-10 print:shadow-none print:border-none print:p-0">
            
            {/* Official Header Document */}
            <div className="text-center border-b-2 border-slate-900 pb-8 space-y-3 font-sans">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-black uppercase tracking-wider">
                <span>Governo do Estado do Rio de Janeiro</span>
                <span>•</span>
                <span>SEEDUC-RJ</span>
                <span>•</span>
                <span>Resolução Nº 6392/2025</span>
              </div>

              {currentPlanData.badge && (
                <div className="pt-1">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wide">
                    {currentPlanData.badge}
                  </span>
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mt-2">
                {currentPlanData.title}
              </h1>

              <p className="text-sm md:text-base font-bold text-indigo-700 uppercase tracking-wide">
                {currentPlanData.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-slate-600 uppercase tracking-widest pt-2">
                <span><strong>Docente:</strong> Prof. André Victor Brito de Andrade • CREF 039443 G/RJ</span>
                <span>•</span>
                <span><strong>Ano Letivo:</strong> 2026</span>
                <span>•</span>
                <span><strong>Carga Letiva:</strong> 206 Dias</span>
              </div>

              {/* Unidades Escolares & Turmas Atendidas */}
              {currentPlanData.schools && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-center gap-3">
                  {currentPlanData.schools.map((school: any, i: number) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-left">
                      <span className="block text-[10px] font-black text-slate-500 uppercase">Unidade Escolar:</span>
                      <span className="font-extrabold text-xs text-slate-900">{school.name}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {school.classes.map((c: string) => (
                          <span key={c} className="text-[10px] font-mono font-extrabold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 1. Ementa da Disciplina */}
            <section className="space-y-3">
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b-2 border-indigo-600 pb-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                1. Ementa Curricular
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200 italic font-medium">
                "{currentPlanData.ementa}"
              </p>
            </section>

            {/* 2. Objetivos Gerais e Específicos */}
            {currentPlanData.objetivos && (
              <section className="space-y-4">
                <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b-2 border-indigo-600 pb-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  2. Objetivos de Aprendizagem & Competências
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlanData.objetivos.map((obj: string, i: number) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-800 text-xs md:text-sm font-medium leading-normal">
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Conteúdos Programáticos Estruturados */}
            {currentPlanData.unidades && (
              <section className="space-y-5">
                <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b-2 border-indigo-600 pb-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  3. Conteúdos Programáticos por Período
                </h2>
                <div className="space-y-5">
                  {currentPlanData.unidades.map((unidadeGroup: any, i: number) => (
                    <div key={i} className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200 space-y-4">
                      <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider">
                        {unidadeGroup.bimestre}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {unidadeGroup.items.map((item: any, j: number) => (
                          <div key={j} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                            <h4 className="font-extrabold text-indigo-900 text-sm">{item.titulo}</h4>
                            <p className="text-slate-700 text-xs leading-relaxed font-medium">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Metodologia e Sistema de Avaliação */}
            {currentPlanData.avaliacaoWeights && (
              <section className="space-y-5">
                <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b-2 border-indigo-600 pb-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  4. Metodologia & Critérios de Avaliação Formativa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentPlanData.avaliacaoWeights.map((av: any, i: number) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-2xl text-slate-900">{av.percent}%</span>
                        <span className={`w-3 h-3 rounded-full ${av.color}`} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-xs uppercase tracking-tight">{av.name}</h4>
                        <p className="text-slate-500 text-[11px] font-medium mt-1 leading-relaxed">{av.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Orientações Pedagógicas para a Prática Docente */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-6 rounded-3xl border border-amber-300/60 space-y-3 print:hidden">
              <h4 className="font-black text-amber-900 text-sm uppercase flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Diretrizes de Prática Pedagógica & Acolhimento
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-800 font-medium">
                <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <strong>Acolhimento e Diagnóstico:</strong> Mapear dificuldades individuais, estilos de estudo e histórico de cada turma nas primeiras semanas.
                </div>
                <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <strong>Metodologias Ativas:</strong> Priorizar resolução de problemas em grupo, oficinas práticas de movimento e protagonismo do estudante.
                </div>
                <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <strong>Recuperação Contínua:</strong> Oferecer oportunidades paralelas de recuperação aos estudantes com rendimento abaixo da média 5.0.
                </div>
                <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <strong>Registro no Conexão Educação:</strong> Manter a frequência e diários de bordo atualizados em conformidade com o calendário SEEDUC-RJ.
                </div>
              </div>
            </div>

            {/* Assinaturas Oficiais para Impressão */}
            <div className="pt-10 border-t-2 border-slate-900 grid grid-cols-2 gap-12 text-center text-xs font-bold text-slate-700 uppercase tracking-wider font-sans">
              <div className="border-t border-slate-400 pt-2">
                <p className="font-black text-slate-900">Prof. André Victor Brito de Andrade</p>
                <p className="text-[10px] text-slate-500 font-normal">CREF 039443 G/RJ • Docente Responsável</p>
              </div>
              <div className="border-t border-slate-400 pt-2">
                <p className="font-black text-slate-900">Coordenação Pedagógica / Direção</p>
                <p className="text-[10px] text-slate-500 font-normal">SEEDUC-RJ</p>
              </div>
            </div>

          </div>
        )
      )}

      {/* Media Print CSS override */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, button, nav, input { display: none !important; }
          .animate-fade-in { animation: none !important; }
          @page { margin: 1.2cm; size: A4 portrait; }
        }
      `}</style>
    </div>
  );

  function setActiveTabToCalendario() {
    setMainTab('calendario');
  }
};
