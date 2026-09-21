
import { CRONOGRAMA_3TRI_PE_PLAN } from './cronogramaAulas3Tri';

export interface AulaPlan {
    id?: string;
    data: string;
    tri: string;
    modulo: string;
    titulo: string;
    desc: string;
    trabalho?: 'passar' | 'recolher' | null;
    status?: string;
    destaque?: boolean;
    resumo: string;
}

const COMMON_RESUMOS: Record<string, string> = {
    'Futevôlei': `🎯 **Objetivo da Aula:** Apresentar a realidade das aulas (falta de quadra) e introduzir a história e técnica do futevôlei.\n\n🗣️ **Dinâmica:**\n• Conversa franca sobre o uso da sala de aula como espaço de esporte tático.\n• Slides sobre as regras básicas do Futevôlei.\n\n📜 **Reflexão:** Como adaptar um esporte de praia para o contexto urbano da Baixada?`,
    'Futepátio': `🎯 **Objetivo da Aula:** Desenvolver coordenação e controle de bola em espaço reduzido.\n\n🗣️ **Prática:**\n• Montagem de "mesas" no pátio ou uso de bancos.\n• Jogo 1x1 ou 2x2 com regras de controle (no máximo 3 toques).\n\n📜 **Reflexão:** A criatividade como ferramenta de resistência à falta de infraestrutura escolar.`,
    'Mancala': `🎯 **Objetivo da Aula:** Estudo de matrizes civilizatórias africanas através do jogo.\n\n🗣️ **Dinâmica:**\n• Explicar que Mancala não é sobre guerra (como xadrez), mas sobre agricultura e distribuição.\n• Jogar em duplas nas carteiras com sementes/feijões.\n\n📜 **Amparo Legal:** Cumprimento da Lei 10.639/03.`,
    'Várzea': `🎯 **Objetivo da Aula:** Analisar a história social do futebol no Brasil.\n\n🗣️ **Dinâmica:**\n• Debate sobre a elitização do futebol (Vasco vs Clubes aristocráticos).\n• Torneio de Futebol de Botão adaptado com tampinhas.\n\n📜 **Reflexão:** Por que o futebol da várzea é o berço da nossa cultura corporal?`,
    'E-Sports': `🎯 **Objetivo da Aula:** Debater o impacto das telas na saúde física.\n\n🗣️ **Dinâmica:**\n• Debate sobre o lucro das desenvolvedoras de games.\n• Prática: "Stop" (Adedonha) Esportivo no caderno.\n\n📜 **Reflexão:** O esporte como ferramenta de desconexão digital.`,
    'Onça': `🎯 **Objetivo da Aula:** Valorizar a cultura Bororo/Guarani.\n\n🗣️ **Dinâmica:**\n• Desenhar o tabuleiro no caderno.\n• Jogo de estratégia: 1 onça vs 14 cachorros.\n\n📜 **Amparo Legal:** Cumprimento da Lei 11.645/08.`,
    'Tabuleiros': `🎯 **Objetivo da Aula:** Desenvolver raciocínio tático e paciência.\n\n🗣️ **Dinâmica:**\n• Torneio livre em sala.\n• Professor como instrutor orientador.`,
    'Paralímpico': `🎯 **Objetivo da Aula:** Acolhimento pós-férias e introdução teórica à Inclusão e Esporte Paralímpico.\n\n🗣️ **Dinâmica (100% Teórica em Sala):**\n• **Acolhimento & Quebra-gelo:** Roda de conversa de boas-vindas perguntando como foram as férias de julho.\n• **Slides & Quadro Intercalados:** Apresentação teórica alternando 1 slide de fala/exposição do professor e 1 slide de conteúdo para cópia no quadro.\n• **Debate:** Acessibilidade, capacitismo e inclusão na escola e na sociedade.\n\n📜 **Reflexão:** Como tornar nossa escola e cidade mais acessíveis para todos?`,
    'Padrões': `🎯 **Objetivo da Aula:** Crítica aos padrões de beleza irreais.\n\n🗣️ **Dinâmica:**\n• Jogo "Quem sou eu?" com personalidades negras/indígenas.\n• Debate sobre racismo estético.`,
    'Lutas': `🎯 **Objetivo da Aula:** Diferenciar Luta de Briga.\n\n🗣️ **Dinâmica:**\n• Vídeo/Debate sobre a criminalização da Capoeira.\n• Vivência: "Briga de Galo" segura.\n\n⚠️ **TRABALHO:** Construção do tabuleiro de Shisima ou Mancala.`,
    'Precisão': `🎯 **Objetivo da Aula:** Foco e controle motor.\n\n🗣️ **Dinâmica:**\n• Arremesso de precisão em lixeiras com distâncias variadas.`,
    'Ilha': `🎯 **Objetivo da Aula:** Fomentar o trabalho em equipe.\n\n🗣️ **Dinâmica:**\n• Jogo "A Ilha" na sala (jornais no chão).`,
    'Shisima': `🎯 **Objetivo da Aula:** Praticar a lógica matemática queniana.\n\n🗣️ **Dinâmica:**\n• Organizar torneio com tabuleiros recicláveis.\n\n📥 **TRABALHO:** Recolher os tabuleiros.`,
    'Postura': `🎯 **Objetivo da Aula:** Prevenção de dores e vícios posturais.\n\n🗣️ **Dinâmica:**\n• Guia de ginástica laboral na cadeira escolar.`,
    'Olimpíadas': `🎯 **Objetivo da Aula:** Entender que o esporte não é neutro.\n\n🗣️ **Dinâmica:**\n• Jogo da Forca com termos de ética e política.`,
    'Dominó': `🎯 **Objetivo da Aula:** Tradição cultural e probabilidade básica.\n\n🗣️ **Dinâmica:**\n• Torneio de Dominó em groups.`,
    'Apartheid': `🎯 **Objetivo da Aula:** Estudar o esporte como ferramenta política.\n\n🗣️ **Dinâmica:**\n• Debate sobre o banimento da África do Sul das Olimpíadas.\n\n⚠️ **TRABALHO:** Pesquisa: Atletas Negros Contra o Racismo.`,
    'Música': `🎯 **Objetivo da Aula:** Conectar ritmo e história.\n\n🗣️ **Dinâmica:**\n• Percussão corporal rítmica nas carteiras.`,
    'Cidade': `🎯 **Objetivo da Aula:** Conectar geografia urbana e lazer.\n\n🗣️ **Dinâmica:**\n• Debate: Por que faltam praças seguras na periferia?\n\n📥 **TRABALHO:** Entrega da pesquisa sobre Atletas Negros.`,
    'Avaliação': `🎯 **Objetivo da Aula:** Sistematização do conhecimento anual.\n\n🗣️ **Dinâmica:**\n• Aplicação de avaliação teórica e tempo livre.`,
    'Final': `🎯 **Objetivo da Aula:** Finalizar o ciclo letivo com reflexão coletiva.`
};

export const PE_PLAN: Record<string, AulaPlan[]> = {
    '8ano': [
        { 
            data: '18/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Teoria: Futevôlei', desc: 'Introdução ao futevôlei (Até slide 4 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação do esporte e história.\n• Passar conteúdo teórico no quadro até o **Slide 4**.\n\n📜 **Reflexão:** Como as regras do futevôlei se assemelham ao vôlei tradicional?` 
        },
        { 
            data: '25/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Teoria: Futevôlei (Cont.)', desc: 'Continuidade teórica (Até slide 7 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Aprofundar o conhecimento tático.\n\n🗣️ **Dinâmica:**\n• Retomada das regras.\n• Continuidade do conteúdo no quadro até o **Slide 7**.\n\n📜 **Reflexão:** A importância do posicionamento em esportes de rede.` 
        },
        { 
            data: '01/06', tri: '2º Tri', modulo: 'Jogos de Salão', titulo: 'Jogos e Concentração', desc: 'Introdução de jogos de tabuleiro, cartas e mentais.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Estimular o raciocínio lógico e concentração.\n\n🗣️ **Dinâmica:**\n• Vivência prática em sala: Uno, Pega Varetas, Dominó, Ludo e Dama.\n\n⚠️ **TRABALHO TRIMESTRAL:** "Apresentar e reproduzir em sala, jogos de tabuleiro, cartas, mentais ou de concentração de outros países/continentes". Grupos de até 5 pessoas.` 
        },
        { 
            data: '08/06', tri: '2º Tri', modulo: 'Jogos de Salão', titulo: 'Teoria: Jogos de Tabuleiro', desc: 'A importância desses jogos na Education Física (Slides).', 
            resumo: `🎯 **Objetivo da Aula:** Fundamentar o uso de jogos de salão pedagogicamente.\n\n🗣️ **Dinâmica:**\n• Aula teórica com slides.\n• Por que jogos de cartas e tabuleiro estão na Ed. Física? (Mental e Motor).\n\n📜 **Reflexão:** O esporte vai além do esforço físico braçal.` 
        },
        { 
            data: '15/06', tri: '2º Tri', modulo: 'Jogos de Tabuleiro', titulo: 'Jogos do Mundo', desc: 'Aula do Professor sobre jogos de tabuleiro de outros países.', 
            resumo: `🎯 **Objetivo da Aula:** Ampliar o repertório cultural sobre jogos de tabuleiro.\n\n🗣️ **Dinâmica:**\n• Apresentação de jogos internacionais e suas origens.\n• Preparação para as apresentações dos grupos na próxima aula.` 
        },
        { 
            data: '22/06', tri: '2º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Jogos do Mundo', desc: 'Início das apresentações em grupo (Aprox. 3 grupos).', 
            destaque: true,
            resumo: `🎯 **Objetivo da Aula:** Avaliar a pesquisa e reprodução dos jogos internacionais.\n\n🗣️ **Dinâmica:**\n• Apresentação e experimentação dos jogos propostos pelos 3 primeiros grupos.\n\n📜 **Reflexão:** A diversidade cultural através dos jogos tradicionais.` 
        },
        { 
            data: '29/06', tri: '2º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Jogos do Mundo (Fin.)', desc: 'Restante da apresentação dos grupos.', 
            resumo: `🎯 **Objetivo da Aula:** Conclusão das apresentações trimestrais.\n\n🗣️ **Dinâmica:**\n• Apresentação dos grupos restantes.\n• Coleta das reflexões escritas sobre o trabalho.\n\n📥 **TRABALHO:** Recolher o roteiro dos jogos apresentados.` 
        },
        { 
            data: '06/07', tri: '2º Tri', modulo: 'Competição', titulo: 'Torneio de Dama', desc: 'Competição rápida em estilo mata-mata em sala.', 
            resumo: `🎯 **Objetivo da Aula:** Aplicar táticas de jogo em ambiente competitivo saudável.\n\n🗣️ **Dinâmica:**\n• Torneio de Dama "Mata-mata" realizado inteiramente no espaço da sala de aula.\n\n📜 **Reflexão:** Lidar com a vitória e a derrota em jogos estratégicos.` 
        },
        { data: '27/07', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Retorno de Férias: Esporte Paralímpico', desc: 'Acolhimento e Teoria Intercalada (Fala do Prof. + Quadro).', resumo: COMMON_RESUMOS['Paralímpico'] },
        { data: '03/08', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Teoria: Paralimpismo', desc: 'Aprofundamento sobre esportes adaptados (Teoria).', resumo: `🎯 **Objetivo da Aula:** Compreender a história e as classificações funcionais do esporte paralímpico.\n\n🗣️ **Dinâmica:**\n• Aula expositiva em sala sobre as categorias paralímpicas.\n• Debate sobre acessibilidade no esporte de alto rendimento.\n\n📜 **Reflexão:** O esporte adaptado como ferramenta de inclusão e superação de barreiras.` },
        { data: '10/08', tri: '2º Tri', modulo: 'Sociedade', titulo: 'Mídias e Padrões', desc: 'Racismo estético e padrões de beleza.', resumo: `🎯 **Objetivo da Aula:** Crítica aos padrões de beleza irreais e racismo estético.\n\n🗣️ **Dinâmica:**\n• Debate sobre a representação do corpo na mídia.\n• Atividade de identificação de padrões em propagandas.\n\n📜 **Reflexão:** Como a mídia influência nossa percepção sobre o próprio corpo?` },
        { data: '17/08', tri: '2º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica', desc: 'Aplicação da prova formal do 2º trimestre em sala.', resumo: `🎯 **Objetivo da Aula:** Sistematização e verificação de aprendizagem do trimestre.\n\n🗣️ **Dinâmica:**\n• Aplicação individual de prova escrita abrangendo conteúdos teóricos e jogos de tabuleiro.` },
        { 
            data: '24/08', tri: '2º Tri', modulo: 'Lutas', titulo: 'Lutas do Brasil: Capoeira', desc: 'Resistência antirracista através da Capoeira, dança-luta e matrizes africanas (Datashow).', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:**
Compreender a Capoeira como patrimônio cultural imaterial da humanidade (UNESCO), fruto da resistência política e física de africanos escravizados no Brasil, analisando sua estratégia de disfarce corporal (dança-luta), instrumentos musicais, criminalização histórica no Código Penal de 1890 e a libertação pedagógica promovida por Mestre Bimba nos anos 1930 (Leis 10.639/03 e BNCC EF08EF14/EF08EF15).

🗣️ **Roteiro Pedagógico do Professor (Passo a Passo com Datashow):**
1. **Acolhimento & Sensibilização (5 min):** Projetar os slides no Datashow. Introduzir a Capoeira como um monumento de inteligência estratégica e autodefesa forjada nas senzalas e quilombos (Palmares).
2. **A Dança como Disfarce Militar (10 min):** Explicar como os escravizados uniram cânticos, palmas e o berimbau para que os feitores e capitães-do-mato acreditassem que se tratava apenas de uma dança festiva, escondendo o treinamento marcial de autodefesa.
3. **A Bateria e o Berimbau (10 min):** Apresentar a orquestra da capoeira (Gunga, Médio, Viola, Atabaque, Pandeiro e Agogô) e o papel do ritmo ditando a malícia e a velocidade do jogo.
4. **Mecânica Corporal e a Ginga (5 min):** Demonstrar que a Ginga é a base viva de oscilação do centro de gravidade, permitindo esquivas imediatas sem bloqueios rígidos de impacto.
5. **História Legal e Criminalização (5 min):** Contextualizar a perseguição pós-abolição (art. 402 do Código Penal de 1890) e a posterior valorização nacional com Mestre Bimba em 1930 e o título da UNESCO em 2014.
6. **Lousa e Registro no Caderno (10 min):** Cópia do resumo estruturado projetado no slide para fixação e avaliação processual.
7. **Lançamento do Trabalho Avaliativo (5 min):** Explicação da confecção dos jogos africanos (Shisima ou Mancala) com material reciclado em casa.

⚠️ **TRABALHO AVALIATIVO (3,0 pts):** Construção do tabuleiro de Shisima ou Mancala em casa com material reciclável para entrega no início do 3º trimestre.` 
        },
        { 
            data: '31/08', tri: '2º Tri', modulo: 'Lutas', titulo: 'Lutas do Brasil: Luta Marajoara', desc: 'A tradição ancestral da Ilha de Marajó, história cabocla/indígena e regras oficiais de combate (Datashow).', 
            resumo: `🎯 **Objetivo Geral da Aula:**
Compreender a Luta Marajoara como patrimônio cultural imaterial do Brasil e do Pará (Lei Estadual nº 7.755/2013), fruto do encontro entre povos indígenas originários (como os Aruás) e caboclos/ribeirinhos do arquipélago do Marajó. Analisar sua inspiração na disputa de força dos búfalos-d’água, regras oficiais de projeção/grappling, proibições de integridade física e o princípio ético da resiliência ("quem cai, levanta"), atendendo à Lei 11.645/08 e às habilidades EF08EF14/EF08EF15 da BNCC.

🗣️ **Roteiro Pedagógico do Professor (Passo a Passo com Datashow):**
1. **Acolhimento e Pergunta Disparadora (5 a 10 min):**
   • Projetar os slides da Luta Marajoara no Datashow.
   • Pergunta reflexiva: *"Vocês sabiam que o Brasil tem uma das lutas corpo a corpo mais antigas e nobres do mundo, praticada em círculo na areia ou na lama, onde dar soco ou chute é terminantemente proibido?"*
   • Explicar a distinção absoluta entre LUTA (regras, árbitro, cavalheirismo e respeito à integridade física) e BRIGA (violência cega, covardia e infração penal).

2. **Origem Histórica e Geografia Marajoara (10 min):**
   • Apresentação do Arquipélago de Marajó (Pará), maior arquipélago fluviomarítimo da Terra, moldado pelas marés do Rio Amazonas e Oceano Atlântico.
   • Criação tradicional pela fusão de saberes dos povos indígenas locais e vaqueiros/caboclos das fazendas de gado.
   • Prática nas festividades comunitárias tradicionais, como a festa do Glorioso São Sebastião em Cachoeira do Arari, Soure e Salvaterra.

3. **A Sabedoria dos Búfalos e o Campo de Luta (10 min):**
   • A Ilha de Marajó possui o maior rebanho de búfalos do Ocidente.
   • Os vaqueiros observavam como os machos disputavam liderança empurrando com as testas e pescoços, sem se dilacerar nem matar.
   • A luta ocorre em círculos demarcados no chão (sem grades ou cordas de ringue), em areia, grama ou na clássica lama/argila úmida da maré, exigindo máxima estabilidade isométrica e sensibilidade tátil com os pés.

4. **Regras Oficiais e Sistema de Grappling (10 min):**
   • **Objetivo Supremo:** Desequilibrar o oponente e fazer com que ele encoste as COSTAS ou OMBROS no chão (queda limpa dorsal).
   • **Quedas Não Finais:** Se o lutador cair de joelhos, de quatro apoios ou de bruços (barriga no chão), o combate NÃO é finalizado; a luta é interrompida e recomeça de pé no centro do círculo.
   • **Pegadas Válidas:** Grappling tradicional puro (agarre nos braços, costas, cintura, quadris e vestimenta/bermuda). Uso de rasteiras com os pés (calços e ganchos) e giros de quadril.
   • **Duração:** Decidida em rounds dinâmicos de 2 a 3 minutos ou por morte súbita na primeira queda válida de costas.

5. **Terminantemente PROIBIDO (Faltas e Segurança) (5 min):**
   • Proibição de golpes traumáticos: socos, tapas, chutes, cotoveladas, joelhadas e cabeçadas causam desclassificação imediata.
   • Proibição de finalizações: sem chaves de braço, perna, dedos ou torções articulares.
   • Proibição de estrangulamentos: proibido apertar pescoço (esganadura), sufocar ou puxar cabelos.

6. **Filosofia Marajoara e Formação Cidadã (5 min):**
   • *"Quem cai, levanta":* A queda não é humilhação, mas oportunidade pedagógica de reerguer-se com honra.
   • Adversário como parceiro: sem ele não há combate. A luta obrigatoriamente se inicia e se encerra com abraço fraterno e aperto de mãos.
   • Legado moderno: Presença de mestres marajoaras no MMA internacional demonstrando a eficácia das alavancas corporais.

7. **Registro na Lousa / Caderno do Aluno (10 min):**
   • Cópia do resumo esquemático obrigatório projetado no slide para fixação no caderno individual.
   • O professor circula pelas carteiras concedendo visto processual.

8. **Vivência Prática Segura em Sala / Pátio (Adaptada) (10 min):**
   • Em duplas, mantendo postura ereta com os joelhos semiflexionados.
   • Desafio do "Búfalo em Equilíbrio": mãos apoiadas espalmadas nos ombros do parceiro; tentar fazer o colega dar um passo para trás usando apenas o recuo e desequilíbrio sutil de base, sem puxões bruscos, solavancos ou contato violento.` 
        },
        ...CRONOGRAMA_3TRI_PE_PLAN
    ],
    'ap': [
        { 
            data: '18/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Teoria (Aula 1/2 - TEÓRICA)', desc: 'Conceitos gerais de Futevôlei no quadro (Até slide 4).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação do esporte e história.\n• Conteúdo no quadro até o **Slide 4**.\n\n📜 **Reflexão:** Como se assemelha ao vôlei?` 
        },
        { 
            data: '25/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Prática (Aula 2/2 - PRÁTICA)', desc: 'Prática de passes de perna e cabeça na quadra/pátio.', 
            resumo: `🎯 **Objetivo da Aula:** Vivência motora prática.\n\n🗣️ **Dinâmica:**\n• Prática na quadra de vôlei com passes adaptados empurrando a bola com pé e cabeça.` 
        },
        { 
            data: '01/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Regras Gerais (Aula 1/4 - TEÓRICA)', desc: 'Dimensões da quadra, limites de posse e funções táticas no time.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer regras fundamentais do Futsal.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenhar a quadra, áreas de goleiro e posições escolares (goleiro, fixo, alas, pivô).` 
        },
        { 
            data: '08/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Condução e Domínio (Aula 2/4 - PRÁTICA)', desc: 'Treino prático de passes e controle de bola individual na quadra.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver condução de bola coordenada.\n\n🗣️ **Dinâmica (Prática):**\n• Drills de controle e passes em duplas na quadra.` 
        },
        { 
            data: '15/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Sistemas de Jogo (Aula 3/4 - MEIO A MEIO)', desc: 'Sistemas táticos fáceis (2-2 e 3-1) na sala de aula e drills em quadra. Passagem do Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Compreender sistemas posicionais e orientar sobre o Trabalho.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Explicação simples dos sistemas 2-2 e 3-1.\n• Passes e chutes em quadra com posicionamento em triângulo.\n\n⚠️ **TRABALHO DE PESQUISA (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Pesquisa **teórica** individual. Escolha um esporte de quadra ou campo (Futsal, Basquete, Handebol ou Vôlei).\n\n🔍 **ONDE PESQUISAR:** No Google, livros ou sites esportivos oficiais.\n\n📑 **ESTRUTURA OBRIGATÓRIA:**\n1. **Capa:** Nome do CIEP, Educação Física, seu nome, número de chamada, turma (AP) e ano (2026).\n2. **Introdução:** Quem criou o esporte, onde e em que ano nasceu.\n3. **Desenvolvimento:**\n   - Desenhar a quadra/campo e colocar os tamanhos oficiais (metros).\n   - Escrever as **3 regras principais** do esporte.\n   - Listar os principais movimentos (ex: passe, drible, arremesso).\n4. **Referências:** Escrever quais sites ou livros usou.` 
        },
        { 
            data: '22/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Jogo Coletivo (Aula 4/4 - PRÁTICA)', desc: 'Jogo livre focado em passes, conduta social ética e controle de turma.', 
            resumo: `🎯 **Objetivo da Aula:** Aplicar as regras em cooperação de equipe.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo escolar de futsal em quadra focado no controle de comportamento.` 
        },
        { 
            data: '29/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Regras de Rotação (Aula 1/4 - TEÓRICA)', desc: 'Estudo das posições da quadra (1 a 6) e regras de rodízio e pontuação.', 
            resumo: `🎯 **Objetivo da Aula:** Compreender o sentido horário do rodízio no Voleibol.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho das posições da quadra de vôlei e fluxo de rodízio.` 
        },
        { data: '06/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Recepção e Toque (Aula 2/4 - PRÁTICA)', desc: 'Base corporal de recepção na quadra: manchete e toque de dedos.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver recepção estável.\n\n🗣️ **Dinâmica (Prática):**\n• Exercício prático de manchete de dedão e passe de toque.` 
        },
        { data: '27/07', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Retorno de Férias: Esporte Paralímpico', desc: 'Acolhimento e Teoria Intercalada (Fala do Prof. + Quadro).', resumo: COMMON_RESUMOS['Paralímpico'] },
        { 
            data: '03/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Sistemas de Jogo (Aula 3/4 - MEIO A MEIO)', desc: 'Mecânica do sistema 6x0 em sala e prática de posse em quadra. Recolhimento do Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Assimilar movimentação tática simples e recolher trabalhos escolares.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Explicação rápida do sistema simples sem especialização (6x0).\n• Jogo de voleibol facilitado com controle de posse.\n\n📥 **TRABALHO:** Recolher a Pesquisa Escolar (3 pts) sobre Esportes de Campo e Quadra.` 
        },
        { 
            data: '10/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Handebol: Regras Rápidas (Aula 1/2 - TEÓRICA)', desc: 'Regras de drible e condução do basquete e área de goleiro do handebol.', 
            resumo: `🎯 **Objetivo da Aula:** Entender regras estruturais das quadras de basquete e handebol.\n\n🗣️ **Dinâmica (Quadro):**\n• Estudo de infrações (andada, duplo drible no basquete, invasão de área no handebol).` 
        },
        { 
            data: '17/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Handebol: Prática (Aula 2/2 - PRÁTICA)', desc: 'Passes de peito, arremesso ao cesto e passes táticos escolares.', 
            resumo: `🎯 **Objetivo da Aula:** Vivenciar arremessos e recepções de bola.\n\n🗣️ **Dinâmica (Prática):**\n• Drills de finalização em passes em diagonal.` 
        },
        { 
            data: '24/08', tri: '2º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica: Esportes de Quadra (SALA - sem prática)', desc: 'Aplicação da avaliação escrita individual na sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Sistematizar saberes cognitivos de Futsal, Vôlei e Basquetebol.\n\n🗣️ **Dinâmica:**\n• Aplicação de prova escrita individual em sala.` 
        },
        { 
            data: '31/08', tri: '2º Tri', modulo: 'Lutas', titulo: 'Lutas do Brasil: Luta Marajoara', desc: 'A tradição ancestral da Ilha de Marajó, história cabocla/indígena e regras oficiais de combate (Datashow).', 
            resumo: `🎯 **Objetivo Geral da Aula:**
Compreender a Luta Marajoara como patrimônio cultural imaterial brasileiro e paraense (Lei Estadual nº 7.755/2013). Analisar sua inspiração na disputa de força dos búfalos-d’água, regras oficiais de projeção/grappling, proibições de integridade física e o lema ético de resiliência ("quem cai, levanta"), atendendo à Lei 11.645/08 e às habilidades EF08EF14/EF08EF15 da BNCC.

🗣️ **Roteiro Pedagógico do Professor (Passo a Passo com Datashow):**
1. **Acolhimento & Provocação (5 a 10 min):** Distinção entre LUTA (regras, respeito e arte marcial) e BRIGA (violência e descontrole).
2. **Origem e Geografia de Marajó (10 min):** O maior arquipélago fluviomarítimo do planeta, a herança indígena Aruá e cabocla.
3. **Manejo dos Búfalos e o Campo de Luta (10 min):** Como a observação dos búfalos ensinou a empurrar e desequilibrar sem machucar. A luta na areia e na argila úmida.
4. **Regras Oficiais & Grappling (10 min):** Derrubar de costas no chão. Quedas parciais de joelhos ou bruços não encerram a luta. Proibição absoluta de socos, chutes e estrangulamentos.
5. **Filosofia do "Quem cai, levanta" (5 min):** Resiliência e respeito: abraço inicial e final.
6. **Lousa e Registro no Caderno (10 min):** Cópia do resumo estruturado projetado no slide para fixação e avaliação processual.
7. **Vivência Prática Segura (10 min):** Base isométrica do búfalo em duplas (desequilíbrio de base seguro sem impacto).` 
        },
        ...CRONOGRAMA_3TRI_PE_PLAN
    ],
    'ap_sexta': [
        { 
            data: '15/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Teoria (Aula 1/2 - TEÓRICA)', desc: 'Regras de pontos e conceitos básicos (Até slide 4 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação de slides técnicos no quadro.` 
        },
        { 
            data: '22/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Prática (Aula 2/2 - PRÁTICA)', desc: 'Vivência técnica de recepção com pernas e passes rápidos.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver movimentos de recepção tática na quadra.` 
        },
        { 
            data: '12/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Handebol: Regras Gerais (Aula 1/4 - TEÓRICA)', desc: 'Funções de armador, alas, pivô e goleiro no handebol. Passagem do Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Compreender as posições e passar instrução tática do trabalho.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho das áreas de meta oficiais e as funções de cada atleta.\n\n⚠️ **TRABALHO DE PESQUISA (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Pesquisa **teórica** individual. Escolha um esporte de quadra ou campo (Futsal, Basquete, Handebol ou Vôlei).\n\n🔍 **ONDE PESQUISAR:** No Google, livros ou sites esportivos oficiais.\n\n📑 **ESTRUTURA OBRIGATÓRIA:**\n1. **Capa:** Nome do CIEP, Educação Física, seu nome, número de chamada, com turma e ano (2026).\n2. **Introdução:** Quem criou o esporte, onde e em que ano nasceu.\n3. **Desenvolvimento:**\n   - Desenhar a quadra/campo e colocar os tamanhos oficiais (metros).\n   - Escrever as **3 regras principais** do esporte.\n   - Listar os principais movimentos (ex: passe, drible, arremesso).\n4. **Referências:** Escrever quais sites ou livros usou.` 
        },
        { 
            data: '19/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Handebol: Passes e Arremessos (Aula 2/4 - PRÁTICA)', desc: 'Controle de passes de bola rápidos e condução de equipe com a mão em rodízio.', 
            resumo: `🎯 **Objetivo da Aula:** Praticar fundamentos coordenados na quadra.\n\n🗣️ **Dinâmica (Prática):**\n• Treinos de passes curtos sob pressão em duplas na quadra.` 
        },
        { 
            data: '26/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Handebol: Rotações de Linha (Aula 3/4 - MEIO A MEIO)', desc: 'Esquema tático posicional ofensivo e passes táticos em triângulo.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer as posições de retaguarda e ataque em quadra.` 
        },
        { 
            data: '03/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Handebol: Partidas e Jogo Técnico (Aula 4/4 - PRÁTICA)', desc: 'Jogo livre escolar de handebol e controle de turma. Recolhimento do Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Praticar o espírito esportivo e recolher trabalhos escolares.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo tático final focado em disciplina e espírito coletivo.\n\n📥 **TRABALHO:** Recolher a Pesquisa Escolar (3 pts) sobre Esportes de Campo e Quadra.` 
        },
        { data: '27/07', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Retorno de Férias: Esporte Paralímpico', desc: 'Acolhimento e Teoria Intercalada (Fala do Prof. + Quadro).', resumo: COMMON_RESUMOS['Paralímpico'] },
        { 
            data: '31/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Regras de Quadra (Aula 1/4 - TEÓRICA)', desc: 'Sentido do rodízio escolar (1 a 6) e limites de 3 toques na bola.', 
            resumo: `🎯 **Objetivo da Aula:** Dominar o andamento das regras de quadra no Voleibol.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho visual dos postes da rede e o rodízio.` 
        },
        { 
            data: '07/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Passe de manchete (Aula 2/4 - PRÁTICA)', desc: 'Fundamento técnico da manchete correta e controle de passes direcionados.', 
            resumo: `🎯 **Objetivo da Aula:** Dominar a manchete sem errar a precisão corporal.` 
        },
        { 
            data: '14/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Saques e Levantamento (Aula 3/4 - MEIO A MEIO)', desc: 'Mecânica do saque por baixo em sala e treino tático coordenado na quadra.', 
            resumo: `🎯 **Objetivo da Aula:** Praticar saques fáceis sobre a rede posicionada.` 
        },
        { 
            data: '21/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Jogos de Equipe (Aula 4/4 - PRÁTICA)', desc: 'Partidas com passe obrigatório e mini campeonato de voleibol.', 
            resumo: `🎯 **Objetivo da Aula:** Integrar passes e rodízio em situação real de jogo escolar.` 
        },
        { 
            data: '28/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Futsal: Prática Rápida (Aula 1/1 - MEIO A MEIO)', desc: 'Fundamentos expressos corporais rápidos de finalização na tabela/gol.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer dinâmicas de basquete e futsal com controle de drible.` 
        },
        { 
            data: '04/09', tri: '2º Tri', modulo: 'Recuperação', titulo: 'Recuperação e Segunda Chamada (SALA - sem prática)', desc: 'Reposição de prova final presencial em sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Sanar pendências e fechar as médias do segundo período.\n\n🗣️ **Dinâmica:**\n• Avaliações individualizadas na sala.` 
        },
        ...CRONOGRAMA_3TRI_PE_PLAN
    ],
        'ilgch': [
        { data: '28/08', tri: '2º Tri', modulo: 'Introdução', titulo: 'Aulas Suspensas', desc: 'Aulas suspensas por motivos de força maior.', status: 'concluido', resumo: `🎯 **Objetivo da Aula:** Sem aula por motivo de força maior.` },
        { data: '04/09', tri: '2º Tri', modulo: 'Introdução', titulo: 'O que é ILGCH / IFFC / IFLA?', desc: 'Apresentação das matérias eletivas exigidas pela SEEDUC RJ.', status: 'concluido', resumo: `🎯 **Objetivo da Aula:** Apresentar a disciplina e seus eixos formativos.\n\n🗣️ **Dinâmica:**\n• O que significa Itinerário Formativo?\n• Ciências Humanas e Sociais Aplicadas.\n\n📜 **Reflexão:** Qual a importância das disciplinas eletivas na formação do aluno?` },
        ...CRONOGRAMA_3TRI_PE_PLAN
    ]
};

PE_PLAN['ciep369'] = PE_PLAN['8ano'];
PE_PLAN['correcao_fluxo'] = PE_PLAN['ap'];
PE_PLAN['setembro_amarelo'] = CRONOGRAMA_3TRI_PE_PLAN;
PE_PLAN['cronograma_3tri'] = CRONOGRAMA_3TRI_PE_PLAN;

