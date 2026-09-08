const fs = require('fs');
const path = './data/materiaisApoio.ts';
let content = fs.readFileSync(path, 'utf8');

const oldSlide = "'O que é ILGCH?': `";
const newSlideContent = `  'O que é ILGCH?': \`# Introdução às Eletivas do Novo Ensino Médio (SEEDUC RJ)

O Novo Ensino Médio da SEEDUC RJ propõe a criação de trilhas e Itinerários Formativos para o acúmulo e direcionamento de estudos avançados focados na realidade do aluno.

## O que significam as siglas ILGCH, IFFC e IFLA?

A Secretaria de Educação do Estado do Rio de Janeiro organiza as matérias eletivas através de eixos estruturantes:

*   **ILGCH:** Itinerário de Linguagens e Ciências Humanas. Disciplinas (como Sociologia, Filosofia, Educação Física e Literatura) deixam de ser ilhas isoladas e passam a trabalhar em projetos práticos focados em problemas da sociedade humana.
*   **IFFC e IFLA:** São módulos complementares de Formação Cultural, Linguagens e Iniciação Científica exigidos pela rede estadual. Eles visam desenvolver habilidades essenciais para o mercado de trabalho e o senso crítico contemporâneo.

## Por que estamos aqui?

Neste semestre, o nosso foco não será copiar do quadro, mas **debater, pesquisar e construir projetos**. A nossa matriz curricular exigirá que vocês coloquem a mão na massa para entender como as linguagens e as ciências humanas moldam o esporte, a cultura e a sociedade.
\`,
`;

const regex = /'O que é ILGCH\?': `[\s\S]*?`,/;
if (regex.test(content)) {
    content = content.replace(regex, newSlideContent);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated slides for ILGCH');
} else {
    console.log('Failed to find slides string with regex');
}
