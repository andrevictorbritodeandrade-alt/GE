const fs = require('fs');
let content = fs.readFileSync('components/DecolonialApp.tsx', 'utf8');

// Replace the lines with correct generic slides if they don't have specific ones
content = content.replace(
  /'8ano_10\/08': SLIDES_CAPOEIRA.map.*/,
  `'8ano_10/08': SLIDES_GENERICOS['Corpo, Mídia e Padrões'].map((s: any) => ({...s, tipo: s.type || 'texto'})),`
);
content = content.replace(
  /'8ano_17\/08': SLIDES_CAPOEIRA.map.*/,
  `'8ano_17/08': SLIDES_GENERICOS['Avaliação Teórica / Livre'].map((s: any) => ({...s, tipo: s.type || 'texto'})),`
);
content = content.replace(
  /'8ano_31\/08': .*/g,
  `'8ano_31/08': SLIDES_GENERICOS['Festival de Tabuleiros'].map((s: any) => ({...s, tipo: s.type || 'texto'})),`
);

fs.writeFileSync('components/DecolonialApp.tsx', content);
