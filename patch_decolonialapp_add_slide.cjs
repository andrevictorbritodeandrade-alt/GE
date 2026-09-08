const fs = require('fs');
const path = './components/DecolonialApp.tsx';
let content = fs.readFileSync(path, 'utf8');

const slide3 = `    {
      tipo: 'texto_simples',
      titulo: 'Nosso Foco no Semestre',
      topicos: [
        'Projetos práticos e debates críticos',
        'Cultura Corporal, Mídia, Sociedade e Direitos Humanos',
        'Abandono do modelo isolado: tudo está conectado',
        'Como a sociedade e a cultura moldam nossas ações'
      ],
      dicaProfessor: 'Destaque que a disciplina exige reflexão, e não apenas cópia do quadro.'
    }`;

const slide4 = `    {
      tipo: 'texto_simples',
      titulo: 'O que Esperar das Próximas Aulas?',
      topicos: [
        'Análise da Cultura Corporal e do Esporte sob a ótica social',
        'Como a Mídia constrói Padrões de Beleza inalcançáveis',
        'A Herança de Lutas e Resistência do povo Afro e Indígena',
        'Vamos assistir vídeos, debater em roda e escrever nossas próprias opiniões'
      ],
      dicaProfessor: 'Deixe claro que haverá espaço seguro para eles expressarem opiniões contrárias, desde que com base e respeito.'
    }`;

content = content.replace(slide3, slide3 + ",\n" + slide4);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added the 4th slide.');
