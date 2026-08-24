import fs from 'fs';

let code = fs.readFileSync('components/DecolonialApp.tsx', 'utf8');

const helper = `
  const renderTrimestre = (title, aulas, startIndex, corHeader, corBadge, turma) => {
    if (aulas.length === 0) return null;
    const now = new Date();
    
    const processedAulas = aulas.map((aula, localIdx) => {
      let isPast = false;
      if (aula.data) {
        const parts = aula.data.split('/');
        if (parts.length === 2) {
          const classDate = new Date(2026, parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59);
          isPast = classDate.getTime() < now.getTime();
        }
      }
      return { ...aula, isPast, globalIdx: startIndex + localIdx };
    });

    const pastAulas = processedAulas.filter(a => a.isPast);
    const futureAulas = processedAulas.filter(a => !a.isPast);

    return (
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className={\`h-10 w-3 \${corHeader.split(' ')[0]} rounded-full shadow-lg\`}></div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">{title}</h2>
          <div className="flex-grow border-t-2 border-slate-200 border-dashed ml-4"></div>
        </div>

        {pastAulas.length > 0 && (
          <details className="mb-8 group/details bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
            <summary className="cursor-pointer flex items-center justify-between p-4 bg-slate-50 font-black text-slate-700 uppercase tracking-widest hover:bg-slate-100 transition-colors list-none">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-600" />
                Aulas Anteriores ({pastAulas.length})
              </div>
              <span className="text-xl group-open/details:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 bg-slate-50/50">
              {pastAulas.map(aula => renderCard(aula, aula.globalIdx, corHeader, corBadge, turma, false))}
            </div>
          </details>
        )}

        {futureAulas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {futureAulas.map((aula, idx) => renderCard(aula, aula.globalIdx, corHeader, corBadge, turma, idx === 0))}
          </div>
        )}
      </section>
    );
  };
`;

// Insert the helper just before renderPlanejamentoClasses
code = code.replace(
  /const renderPlanejamentoClasses = \(turma: '8ano' \| 'ap' \| 'ap_sexta'\) => {/,
  helper + "\n  const renderPlanejamentoClasses = (turma: '8ano' | 'ap' | 'ap_sexta') => {"
);

fs.writeFileSync('components/DecolonialApp.tsx', code);
