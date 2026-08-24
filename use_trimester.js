import fs from 'fs';

let code = fs.readFileSync('components/DecolonialApp.tsx', 'utf8');

// Replace renderPlanejamentoClasses usage
code = code.replace(
  /\{tri1\.length > 0 && \([\s\S]*?<\/section>\s*\)}/,
  "{renderTrimestre('1º Trimestre (Final)', tri1, 0, 'bg-blue-500', 'bg-blue-50 text-blue-800 border border-blue-200', turma)}"
);
code = code.replace(
  /<section>\s*<div className="flex items-center gap-4 mb-8">[\s\S]*?2º Trimestre[\s\S]*?<\/section>/,
  "{renderTrimestre('2º Trimestre', tri2, tri1.length, 'bg-blue-600', 'bg-blue-50 text-blue-800 border border-blue-200', turma)}"
);
code = code.replace(
  /<section>\s*<div className="flex items-center gap-4 mb-8">[\s\S]*?3º Trimestre[\s\S]*?<\/section>/,
  "{renderTrimestre('3º Trimestre', tri3, tri1.length + tri2.length, 'bg-green-600', 'bg-green-50 text-green-800 border border-green-200', turma)}"
);

// Replace renderPlanejamentoGestao usage
code = code.replace(
  /<section>\s*<div className="flex items-center gap-3 mb-6 mt-8">[\s\S]*?2º Trimestre[\s\S]*?<\/section>/,
  "{renderTrimestre('2º Trimestre', tri2, 0, 'bg-blue-600', 'bg-blue-50 text-blue-800 border border-blue-200', 'ilgch')}"
);
code = code.replace(
  /<section>\s*<div className="flex items-center gap-3 mb-6">[\s\S]*?3º Trimestre[\s\S]*?<\/section>/,
  "{renderTrimestre('3º Trimestre', tri3, tri2.length, 'bg-green-600', 'bg-green-50 text-green-800 border border-green-200', 'ilgch')}"
);

fs.writeFileSync('components/DecolonialApp.tsx', code);
