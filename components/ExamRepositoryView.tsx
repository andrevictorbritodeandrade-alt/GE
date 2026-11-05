import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText, CheckCircle2, Download, Printer, Search } from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';
import { ScreenHeader } from './ScreenHeader';
import { BackButton } from './BackButton';

interface Question {
  id: string;
  type: 'multiple_choice' | 'discursive';
  text: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  expectedAnswer?: React.ReactNode;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  classes: string[];
  trimester: string;
  totalPoints: number;
  questions: Question[];
}

const EXAMS: Exam[] = [
  {
    id: 'exam_8ano_cordelia',
    title: 'Avaliação Teórica Consolidada: Conteúdos de Educação Física (Turmas 801, 802, 803 - EE Cordélia Paiva)',
    subject: 'Educação Física',
    classes: ['Turmas 801, 802, 803 - EE Cordélia Paiva'],
    trimester: '2º / 3º Trimestre',
    totalPoints: 5.0,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'A Capoeira é muito mais do que uma prática corporal ou uma dança rítmica; ela é um monumento vivo de resistência política e cultural forjada por africanos escravizados no Brasil. No período colonial e imperial, os praticantes enfrentaram severa perseguição e criminalização, culminando na proibição explícita da capoeira no Código Penal da República de 1890. Apenas na década de 1930, com a valorização promovida por Mestre Bimba e a posterior chancela da UNESCO como Patrimônio Imaterial da Humanidade, essa manifestação ganhou o reconhecimento oficial que merece em nossa sociedade.\n\nCom base no texto acima e nos estudos sobre as Lutas do Brasil, qual foi o principal papel histórico atribuído à ginga e aos movimentos corporais da capoeira durante o período de escravidão?',
        options: [
          'A) Servir exclusivamente como entretenimento festivo nas senzalas sem qualquer propósito de autodefesa marcial.',
          'B) Disfarçar o treinamento físico de autodefesa e resistência tática sob a aparência de uma dança cultural para enganar os feitores.',
          'C) Funcionar como uma regra obrigatória imposta pelo governo imperial para selecionar soldados para o exército.',
          'D) Substituir os jogos de tabuleiro africanos nas praças públicas do Rio de Janeiro.'
        ],
        correctAnswer: 'B',
        points: 1.0
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Praticada tradicionalmente nas festividades e comunidades da Ilha de Marajó, no Pará, a Luta Marajoara é uma das expressões corporais mais nobres e antigas do Brasil, inspirada na observação da força e do equilíbrio dos búfalos-d\'água. Diferente de brigas callejeras ou de esportes violentos sem regulamentação, essa arte marcial possui regras rígidas de grappling onde socos, chutes e estrangulamentos são terminantemente proibidos. O combate ocorre em círculos na areia ou na lama, tendo como objetivo supremo derrubar o oponente fazendo-o encostar as costas no chão, guiada pelo lema ético de que "quem cai, levanta".\n\nConsiderando o texto e os fundamentos éticos da Luta Marajoara estudados em aula, qual é o critério principal para definir a vitória em um combate oficial?',
        options: [
          'A) Aplicar um golpe traumático de soco ou chute direto no rosto do adversário.',
          'B) Forçar o oponente a cair de joelhos ou de bruços no centro da arena circular.',
          'C) Desequilibrar o oponente e fazer com que ele encoste as costas ou os ombros no chão (queda limpa dorsal).',
          'D) Manter o adversário imobilizado pelo pescoço por mais de um minuto contínuo.'
        ],
        correctAnswer: 'C',
        points: 1.0
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'O estudo dos jogos de salão e de tabuleiro no planejamento trimestral da Educação Física escolar vai muito além do simples lazer recreativo nas carteiras. Através de tabuleiros tradicionais de origem africana e indígena, como a Mancala e o Shisima, os estudantes exercitam o raciocínio lógico, a estratégia tática e o reconhecimento de matrizes civilizatórias não eurocêntricas. A Mancala, por exemplo, originária da África, simula a distribuição de sementes e o ciclo agrícola, provando que o desenvolvimento cognitivo e matemático esteve presente em civilizações milenares antes mesmo da invenção dos computadores modernos.\n\nCom base na leitura acima e nas aulas sobre Jogos de Tabuleiro, qual é o principal objetivo pedagógico e cultural do uso da Mancala nas escolas?',
        options: [
          'A) Ensinar técnicas de combate físico e manuseio de armas brancas antigas.',
          'B) Valorizar as matrizes civilizatórias africanas e desenvolver o raciocínio tático-matemático através de uma tradição milenar.',
          'C) Treinar os alunos exclusivamente para competições olímpicas de xadrez profissional.',
          'D) Substituir as aulas teóricas de matemática por regras de jogos de azar comerciais.'
        ],
        correctAnswer: 'B',
        points: 1.0
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        text: 'A prática do Futevôlei adaptada ao ambiente escolar e urbano nos desafia a repensar a infraestrutura tradicional das aulas de Educação Física. Nascido nas praias cariocas, o esporte exige dos praticantes alto controle motor, domínio de espaço reduzido e precisão técnica, uma vez que o uso das mãos e braços é totalmente proibido pelas regras oficiais. Ao levarmos essa modalidade para a sala de aula ou pátio sem quadras de areia oficiais, discutimos a criatividade como ferramenta de resistência e inclusão frente às limitações estruturais das escolas públicas.\n\nDe acordo com o texto e as regras fundamentais do Futevôlei discutidas nas aulas da turma 8º ano, qual característica técnica diferencia este esporte do Voleibol tradicional?',
        options: [
          'A) A permissão para segurar a bola com as mãos antes de efetuar o passe para o companheiro.',
          'B) A proibição do uso de mãos e braços, exigindo o toque com os pés, coxas, peito e cabeça.',
          'C) A obrigação de que a bola bata no chão duas vezes antes de cada rebatida.',
          'D) A ausência de qualquer rede divisória entre as equipes participantes.'
        ],
        correctAnswer: 'B',
        points: 1.0
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        text: 'As lutas dos povos originários do Brasil possuem profundo significado ritualístico, espiritual e comunitário, estando integradas às celebrações tradicionais como o Kuarup, no Alto Xingu. A Huka-Huka, por exemplo, é uma luta corporal praticada entre aldeias para homenagear os mortos ilustres e testar a força, a agilidade e o respeito mútuo entre os jovens guerreiros. Iniciada sempre de joelhos, com o abraço inicial obrigatório e sem nenhum tipo de golpe traumático de impacto, essa manifestação cumpre rigorosamente as diretrizes da Lei 11.645/08 na valorização da história e cultura indígena brasileira.\n\nAnalisando o texto acima sobre a Huka-Huka e as tradições do Xingu, assinale a alternativa que descreve corretamente o início e a dinâmica dessa luta ritualística:',
        options: [
          'A) Os lutadores começam em pé, trocando socos e chutes com luvas de proteção pesadas.',
          'B) Os atletas iniciam a disputa de joelhos no centro da arena, utilizando um abraço inicial e buscando o desequilíbrio sem golpes de impacto.',
          'C) A luta ocorre apenas no período noturno com o uso de zarabatanas e arcos de precisão.',
          'D) O combate é individual e tem como único objetivo eliminar fisicamente o adversário da tribo rival.'
        ],
        correctAnswer: 'B',
        points: 1.0
      }
    ]
  },
  {
    id: 'exam_esportes_ap',
    title: 'Avaliação Teórica: Esportes de Quadra e Rede (Handebol, Futsal e Vôlei)',
    subject: 'Educação Física',
    classes: ['Turmas 801, 802, 803 - EE Cordelia Paiva', 'EJANEM I01 - CIEP 229'],
    trimester: '2º Trimestre',
    totalPoints: 5.0,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Qual é a principal função da linha de 6 metros na quadra de handebol?',
        options: [
          'A) É a linha onde se cobram os tiros livres.',
          'B) É a área exclusiva do goleiro, onde nenhum outro jogador pode pisar.',
          'C) É a marca de onde os armadores devem realizar os passes.',
          'D) É o local exato do meio de campo.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Em relação às posições táticas no Futsal, assinale a opção que descreve corretamente uma das funções:',
        options: [
          'A) O Fixo atua principalmente no ataque, próximo ao gol adversário.',
          'B) O Pivô joga mais recuado, auxiliando o goleiro.',
          'C) Os Alas jogam pelas laterais da quadra, ajudando na defesa e no ataque.',
          'D) No Futsal, não existem posições definidas, todos os jogadores atacam juntos.'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'No Futevôlei, o esporte possui uma dinâmica semelhante ao Vôlei. No entanto, em relação aos toques na bola, é correto afirmar que:',
        options: [
          'A) É permitido usar as mãos e os braços para realizar passes e recepções.',
          'B) Os jogadores utilizam principalmente pés, coxas, peito e cabeça para manter a bola no ar.',
          'C) Cada equipe pode dar apenas um toque na bola antes de passá-la para o outro lado.',
          'D) A bola pode quicar no chão da quadra antes de ser tocada pelo jogador.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        text: 'No Handebol, qual jogador é considerado o "cérebro" do time e atua na linha de 9m organizando as jogadas?',
        options: [
          'A) O Pivô',
          'B) O Ponta',
          'C) O Armador Central',
          'D) O Goleiro'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        text: 'Sobre o limite de posse e toques no Voleibol, é correto afirmar:',
        options: [
          'A) Cada equipe pode dar quantos toques quiser antes de passar a bola.',
          'B) A equipe tem um limite máximo de 3 toques para devolver a bola à quadra adversária (não contando o bloqueio).',
          'C) A bola pode tocar no chão uma vez antes de ser rebatida.',
          'D) Um mesmo jogador pode dar dois toques consecutivos na bola.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q6',
        type: 'discursive',
        text: 'Desenhe uma quadra de Handebol contendo as linhas de 6 metros e 9 metros. Em seguida, desenhe e posicione corretamente os 7 jogadores de uma equipe (incluindo o goleiro) para representar o sistema tático defensivo 5:1.',
        points: 0.5,
        expectedAnswer: (
          <div className="flex flex-col items-center mt-2 space-y-4">
            <p>O aluno deve desenhar a meia quadra com a área de 6m (contínua) e 9m (tracejada). O goleiro fica dentro da área de 6m. 5 defensores formam uma linha (meio círculo) ao redor da linha de 6m e 1 defensor fica mais adiantado (o "bico" ou "ponta de lança"), entre as linhas de 6m e 9m ou próximo à de 9m.</p>
            <div className="w-full max-w-[280px] h-[200px] border-4 border-slate-700 bg-orange-100/50 rounded-sm relative flex flex-col items-center justify-end overflow-hidden shadow-inner">
              {/* Goal */}
              <div className="absolute top-0 w-24 h-4 border-4 border-t-0 border-slate-700 bg-slate-300"></div>
              
              {/* 6m Line */}
              <div className="absolute top-0 w-[240px] h-[100px] border-b-4 border-slate-700 rounded-b-full"></div>
              
              {/* 9m Line */}
              <div className="absolute top-0 w-[300px] h-[150px] border-b-4 border-dashed border-slate-700 rounded-b-full opacity-50"></div>
              
              {/* Players (Red Dots) */}
              <div className="absolute top-8 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold">G</div>
              
              {/* 5 line */}
              <div className="absolute top-[85px] left-[25px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-[102px] left-[65px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-[108px] left-[132px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-[102px] right-[65px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-[85px] right-[25px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              
              {/* 1 advanced */}
              <div className="absolute top-[135px] left-[132px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>
        )
      },
      {
        id: 'q7',
        type: 'discursive',
        text: 'No Futsal, além do goleiro, estudamos as funções táticas de linha. Cite as posições escolares do Futsal (Fixo, Alas e Pivô) e explique a função principal de uma delas.',
        points: 0.5,
        expectedAnswer: "Fixo (Defesa e armação de jogadas desde o campo defensivo); Alas (Apoio pelas laterais, velocidade, ajudam na defesa e no ataque); Pivô (Referência no ataque, joga mais adiantado, muitas vezes de costas para o gol, para segurar a bola e preparar jogadas)."
      },
      {
        id: 'q8',
        type: 'discursive',
        text: 'Quais são as principais funções desempenhadas pelo Pivô no Futsal e no Handebol? Aponte uma semelhança no estilo de jogo dessa posição nos dois esportes.',
        points: 0.5,
        expectedAnswer: "Futsal: Atua avançado, segura a bola no ataque de costas para o gol e distribui o jogo. Handebol: Joga infiltrado na defesa adversária (próximo à linha de 6m) criando espaços e bloqueios. Semelhança: Ambos jogam avançados, perto da área de gol do adversário, muitas vezes de costas para a marcação, servindo como referência ofensiva."
      },
      {
        id: 'q9',
        type: 'discursive',
        text: 'O Futevôlei foi um dos primeiros esportes de rede praticados no trimestre. Cite duas partes do corpo que foram estimuladas e praticadas para realizar a recepção e o passe da bola.',
        points: 0.5,
        expectedAnswer: "Pés, coxas, peito e/ou cabeça."
      },
      {
        id: 'q10',
        type: 'discursive',
        text: 'Tanto o Handebol quanto o Futsal possuem regras rígidas sobre as áreas próximas ao gol (linha de 6m). O que acontece no Handebol se um jogador de ataque pisar nessa área durante um arremesso?',
        points: 0.5,
        expectedAnswer: "Se o jogador de ataque pisar na área de 6m antes de soltar a bola no arremesso, a jogada é invalidada (invasão) e é marcado tiro livre para a equipe defensora. Obs: é permitido saltar para dentro da área desde que a bola seja lançada antes do jogador tocar o solo."
      }
    ]
  },
  {
    id: 'exam_povos_orig',
    title: 'Avaliação Teórica: Povos Originários e Sociedade Global',
    subject: 'ILGCH - Decolonização de corpos, estética, mídia e espaços',
    classes: ['ILGCH 1001 - CE Dr. Ignácio'],
    trimester: '2º Trimestre',
    totalPoints: 5.0,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Segundo a perspectiva apresentada, por que a ideia de "descobrimento" do Brasil é considerada um mito?',
        options: [
          'A) Porque as terras eram completamente vazias e ninguém as habitava.',
          'B) Porque os europeus já sabiam o caminho para a Índia.',
          'C) Porque houve uma invasão de territórios já amplamente habitados e estruturados por milhares de anos.',
          'D) Porque as terras foram compradas amigavelmente pelos colonizadores.'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Qual destas afirmações sobre o mundo antes de 1500 é CORRETA?',
        options: [
          'A) Na América existiam apenas pequenos grupos sem organização.',
          'B) Metrópoles gigantescas como Tenochtitlán eram maiores que as cidades europeias da época.',
          'C) A África não possuía universidades ou rotas comerciais globais.',
          'D) Na Oceania, os navegadores desconheciam a leitura das estrelas.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'Qual foi o principal manejo agrícola citado que permitiu a sobrevivência e estabilidade nutricional no mundo até os dias de hoje?',
        options: [
          'A) Apenas a domesticação do trigo e da cevada.',
          'B) A domesticação essencial da mandioca e do milho pelos povos nativos.',
          'C) A invenção de fertilizantes químicos.',
          'D) A criação de pastos para grandes rebanhos de gado na Amazônia.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        text: 'O que era a "Terra Preta de Índio"?',
        options: [
          'A) Um tipo de solo infértil encontrado no deserto.',
          'B) Uma biotecnologia milenar que fertilizou vastas regiões da Amazônia.',
          'C) Um pigmento usado apenas para pintura corporal.',
          'D) Uma lenda sobre a origem da chuva.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        text: 'Qual antropólogo brasileiro inspirou a reflexão de que o Brasil não era um vazio demográfico?',
        options: [
          'A) Gilberto Freyre',
          'B) Darcy Ribeiro',
          'C) Florestan Fernandes',
          'D) Sérgio Buarque de Holanda'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q6',
        type: 'discursive',
        text: 'A estimativa é que existissem cerca de 5 milhões de habitantes no território que hoje é o Brasil em 1500. Mencione uma evidência da complexidade de comunicação e infraestrutura desses povos.',
        points: 0.5
      },
      {
        id: 'q7',
        type: 'discursive',
        text: 'Explique a diferença entre a estrutura social e a tomada de decisão dos povos originários em comparação com a rigidez hierárquica feudal da Europa.',
        points: 0.5
      },
      {
        id: 'q8',
        type: 'discursive',
        text: 'Como os povos Macro-Jê do interior se diferenciavam na organização territorial em relação aos povos da Amazônia?',
        points: 0.5
      },
      {
        id: 'q9',
        type: 'discursive',
        text: 'De acordo com a aula, qual é a nossa grande dívida tecnológica na área de sustentabilidade e medicina para com os povos originários?',
        points: 0.5
      },
      {
        id: 'q10',
        type: 'discursive',
        text: 'O que as "chinampas" astecas e os terraços agrícolas incas representam em termos de conhecimento matemático e adaptativo?',
        points: 0.5
      }
    ]
  },
  {
    id: 'trab_futsal_volei_ap201',
    title: 'Trabalho Avaliativo: Futsal e Voleibol',
    subject: 'Educação Física',
    classes: ['Turma AP 201 - CIEP 369'],
    trimester: '3º Trimestre',
    totalPoints: 10.0,
    questions: [
      {
        id: 'q1',
        type: 'discursive',
        text: 'No Voleibol, o que é o sistema de "Rodízio" e em que sentido os jogadores devem se mover na quadra?',
        points: 2.0,
        expectedAnswer: 'O rodízio é a troca de posições dos jogadores toda vez que a equipe recupera o saque. O sentido de movimentação é o horário.'
      },
      {
        id: 'q2',
        type: 'discursive',
        text: 'No Futsal, cite as 4 posições principais de linha (Fixo, Alas e Pivô) e explique brevemente a função principal do "Fixo".',
        points: 2.0,
        expectedAnswer: 'Posições: Fixo, Alas (Direito e Esquerdo) e Pivô. O Fixo é o jogador mais recuado, responsável pela organização defensiva e início das jogadas.'
      },
      {
        id: 'q3',
        type: 'discursive',
        text: 'No Voleibol, em qual situação de jogo a "Manchete" é mais recomendada em comparação ao "Toque de Dedos"?',
        points: 2.0,
        expectedAnswer: 'O toque é feito com as pontas dos dedos acima da cabeça, usado para levantamento. A manchete é feita com os antebraços unidos, recomendada para recepção de saques e defesas de ataques potentes.'
      },
      {
        id: 'q4',
        type: 'discursive',
        text: 'Explique como deve ser cobrado o "Tiro de Canto" (Escanteio) no Futsal e qual o tempo limite que o jogador tem para realizar a cobrança.',
        points: 2.0,
        expectedAnswer: 'Deve ser cobrado com os pés, com a bola sobre a linha. O jogador tem 4 segundos para realizar a cobrança.'
      },
      {
        id: 'q5',
        type: 'discursive',
        text: 'DESENHO TÁTICO: No espaço abaixo, desenhe uma quadra de Futsal ou Voleibol e posicione os jogadores em um sistema tático estudado (ex: 3:1 no Futsal ou 6:0 no Voleibol).',
        points: 2.0,
        expectedAnswer: 'O aluno deve desenhar o retângulo da quadra com as linhas principais e posicionar 5 (futsal) ou 6 (vôlei) jogadores de forma coerente com o sistema escolhido.'
      }
    ]
  }
];

export const ExamRepositoryView = ({ onBack }: { onBack: () => void }) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(() => {
    const savedId = safeLocalStorage.getItem('exam_selectedExamId');
    if (savedId) {
      return EXAMS.find(e => e.id === savedId) || null;
    }
    return null;
  });
  const [showPrintWarning, setShowPrintWarning] = useState(false);

  useEffect(() => {
    if (selectedExam) {
      safeLocalStorage.setItem('exam_selectedExamId', selectedExam.id);
    } else {
      safeLocalStorage.removeItem('exam_selectedExamId');
    }
  }, [selectedExam]);

  const handlePrint = () => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
      setTimeout(() => setShowPrintWarning(false), 5000);
    }
    try {
      window.print();
    } catch (e) {
      console.error("Print failed", e);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          @page { size: portrait; margin: 15mm; }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background: white !important; 
          }
          .print\\:hidden { display: none !important; }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          /* Reset backgrounds and shadows for print */
          .print\\:bg-white { background-color: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:m-0 { margin: 0 !important; }
        }
      `}</style>
      <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans print:p-0 print:shadow-none print:border-none print:bg-white print:min-h-0">
        <div className="print:hidden">
          <ScreenHeader
            onBack={selectedExam ? () => setSelectedExam(null) : onBack}
            badge="BANCO DE AVALIAÇÕES"
            statusBadge={selectedExam ? "PROVA SELECIONADA" : "ATIVO"}
            title={selectedExam ? selectedExam.title : "REPOSITÓRIO DE PROVAS"}
            subtitle={selectedExam ? `${selectedExam.subject} • ${selectedExam.trimester} • Total: ${selectedExam.totalPoints.toFixed(1)} Pts` : "Crie, visualize, edite e imprima as avaliações teóricas formatadas"}
          />
        </div>

        <div className="max-w-6xl mx-auto print:max-w-none">
          {!selectedExam ? (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {EXAMS.map(exam => (
                <motion.div 
                  key={exam.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 border border-slate-300 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  onClick={() => setSelectedExam(exam)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {exam.title}
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md uppercase">
                        {exam.totalPoints.toFixed(1)} Pts
                      </span>
                    </div>
                    
                    <p className="text-sm font-bold text-slate-500 mb-2">{exam.subject}</p>
                    <p className="text-xs text-slate-400 mb-4">{exam.trimester}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exam.classes.map(cls => (
                        <span key={cls} className="bg-slate-100 border border-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-2 text-blue-600 font-bold text-sm">
                    Ver Avaliação <ChevronLeft className="rotate-180" size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden print:border-none print:shadow-none">
            <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden print:hidden">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase print:text-2xl">{selectedExam.title}</h2>
                    <p className="text-slate-300 mt-2 font-medium print:text-black">{selectedExam.subject} • {selectedExam.trimester}</p>
                  </div>
                  <div className="flex gap-3 print:hidden relative">
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                      <Printer size={16} /> Imprimir Prova
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                      <Download size={16} /> Baixar PDF
                    </button>

                    {showPrintWarning && (
                      <div className="absolute top-full mt-4 right-0 w-64 bg-amber-100 border border-amber-300 text-amber-900 text-sm font-medium p-4 rounded-lg shadow-lg z-50 flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">⚠️</div>
                        <p>Para imprimir ou salvar em PDF, abra o aplicativo em uma <strong>nova guia</strong> clicando no ícone superior direito do navegador.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExam.classes.map(cls => (
                    <span key={cls} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium print:bg-transparent print:text-black print:border print:border-black print:rounded-sm">
                      Turma: {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12 print:p-0 print:space-y-6">
              {/* Título da Prova apenas na Impressão */}
              <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-4">
                <h2 className="text-xl font-extrabold uppercase tracking-tight">{selectedExam.title}</h2>
                <p className="text-sm font-bold uppercase text-slate-600 mt-1">{selectedExam.subject} • {selectedExam.trimester}</p>
              </div>

              {/* Cabeçalho da Prova para o Aluno preencher */}
              <div className="border-2 border-slate-900 p-6 rounded-xl space-y-4 mb-8 bg-white print:border-black print:text-black print:p-4 print:mb-4 print:space-y-2">
                <div className="flex flex-col md:flex-row justify-between gap-6 print:flex-row print:gap-4">
                  <div className="flex-1 space-y-5 print:space-y-3">
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Escola:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Aluno(a):</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex flex-col gap-5 print:w-1/4 print:gap-3">
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Turma:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Data:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-4 border-t-2 border-slate-200 print:border-black print:grid-cols-2 print:mt-4 print:pt-2 print:gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 uppercase text-lg print:text-xs">Professor:</span>
                    <span className="text-slate-700 uppercase font-bold text-lg print:text-xs">André Brito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 uppercase text-lg print:text-xs">Disciplina:</span>
                    <span className="text-slate-700 uppercase font-bold text-lg print:text-xs">Educação Física</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-slate-200 pb-4 print:border-black print:mt-2">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight print:text-sm print:text-black">Caderno de Questões</h3>
                <p className="font-bold text-slate-500 uppercase tracking-wider text-sm print:text-xs print:text-black">
                  {selectedExam.questions.length} Questões ({selectedExam.totalPoints.toFixed(1)} Pontos Totais)
                </p>
              </div>

              {selectedExam.questions.map((q, idx) => (
                <div key={q.id} className="relative pl-8 md:pl-12 border-l-4 border-slate-200 hover:border-blue-500 transition-colors print-avoid-break print:border-l-0 print:pl-0 print:mb-4">
                  <span className="absolute -left-5 md:-left-6 top-0 bg-white border-4 border-slate-200 text-slate-600 font-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl shadow-sm print:static print:w-auto print:h-auto print:border-none print:bg-transparent print:text-black print:mb-1 print:text-xs print:font-extrabold">
                    Questão {idx + 1}
                  </span>
                  
                  <div className="mb-4 print:mb-2">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-lg text-slate-900 font-medium leading-relaxed print:text-xs print:font-semibold">{q.text}</h4>
                      <span className="shrink-0 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md print:bg-transparent print:text-black print:text-[10px] print:font-bold">
                        {q.points.toFixed(1)} pts
                      </span>
                    </div>
                  </div>

                  {q.type === 'multiple_choice' && q.options && (
                    <div className="space-y-3 mt-6 print:space-y-1 print:mt-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.correctAnswer === opt.charAt(0);
                        return (
                          <div 
                            key={oIdx} 
                            className={`p-4 rounded-xl border-2 transition-all ${isCorrect ? 'border-emerald-500 bg-emerald-50/50 print:!border-slate-200 print:!bg-white' : 'border-slate-200 bg-slate-50 print:!bg-white print:!border-slate-200'}`}
                          >
                            <div className="flex items-start gap-3">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 print:hidden" size={20} />
                                  <div className="hidden print:block w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5 print:w-4 print:h-4 print:border" />
                                </>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5 print:w-4 print:h-4 print:border" />
                              )}
                              <span className={`text-base ${isCorrect ? 'text-emerald-900 font-semibold print:!text-slate-900 print:!font-normal' : 'text-slate-700 print:!text-slate-900'} print:text-xs`}>
                                {opt}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'discursive' && (
                    <div className="mt-6 space-y-4 print:mt-2 print:space-y-2">
                      <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl min-h-[120px] flex items-center justify-center print:border-solid print:border-slate-300 print:bg-white print:min-h-[80px] print:p-2">
                        <span className="text-slate-400 font-medium text-sm print:hidden">Espaço para resposta do aluno (5 a 8 linhas)</span>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl print:hidden">
                        <div className="text-sm text-amber-800 font-medium">
                          <strong>Gabarito Esperado (Professor):</strong>
                          {q.expectedAnswer ? (
                            <div className="mt-2 text-slate-800 font-normal">{q.expectedAnswer}</div>
                          ) : (
                            <span className="ml-1">A resposta deve ser elaborada com base nos conceitos apresentados nos slides e anotações teóricas da aula.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
