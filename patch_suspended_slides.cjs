const fs = require('fs');
const path = './components/DecolonialApp.tsx';
let content = fs.readFileSync(path, 'utf8');

const newSlides = `'ilgch_28/08': [
    {
      tipo: 'capa',
      titulo: 'Aulas Suspensas',
      subtitulo: 'Motivos de Força Maior',
      dicaProfessor: 'Não houve aula nesta data. Iniciar conteúdo na próxima semana.',
      imagemDeFundo: '[Imagem de sala vazia ou quadro em branco]'
    }
  ],`;

const regex = /'ilgch_28\/08': \[\s*\{\s*tipo: 'capa'[\s\S]*?dicaProfessor: 'Apresente a estrutura do ano letivo e escute as expectativas dos alunos.'\s*\}\s*\],/;
if (regex.test(content)) {
    content = content.replace(regex, newSlides);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated slides for ilgch_28/08');
} else {
    console.log('Failed to find ilgch_28/08 slides with regex');
}
