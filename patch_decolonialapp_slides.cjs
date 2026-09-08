const fs = require('fs');
const path = './components/DecolonialApp.tsx';
let content = fs.readFileSync(path, 'utf8');

const newSlides = `'ilgch_04/09': [
    {
      tipo: 'capa',
      titulo: 'O que é ILGCH / IFFC / IFLA?',
      subtitulo: 'Matérias Eletivas da SEEDUC/RJ (Novo Ensino Médio)',
      dicaProfessor: 'Aula conceitual e estruturante do itinerário. Explique os eixos de formação da rede estadual.',
      imagemDeFundo: '[Imagem de debate filosófico, arte e cultura corporal]'
    },
    {
      tipo: 'texto_simples',
      titulo: 'As Siglas e os Itinerários',
      topicos: [
        'ILGCH: Itinerário de Linguagens e Ciências Humanas',
        'IFFC: Itinerário Formativo de Formação Cultural / Investigação',
        'IFLA: Itinerário Formativo de Linguagens e Suas Tecnologias',
        'Por que a SEEDUC/RJ implementa essas eletivas?'
      ],
      dicaProfessor: 'Construa um mapa mental no quadro desmistificando as siglas.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Nosso Foco no Semestre',
      topicos: [
        'Projetos práticos e debates críticos',
        'Cultura Corporal, Mídia, Sociedade e Direitos Humanos',
        'Abandono do modelo isolado: tudo está conectado',
        'Como a sociedade e a cultura moldam nossas ações'
      ],
      dicaProfessor: 'Destaque que a disciplina exige reflexão, e não apenas cópia do quadro.'
    }
  ],`;

const regex = /'ilgch_04\/09': \[\s*\{\s*tipo: 'capa'[\s\S]*?dicaProfessor: 'Construa um mapa mental no quadro ligando: Corpo, Cultura, Sociedade e Autonomia.'\s*\}\s*\],/;
if (regex.test(content)) {
    content = content.replace(regex, newSlides);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated slides for ilgch_04/09');
} else {
    console.log('Failed to find ilgch_04/09 slides with regex');
}
