const fs = require('fs');
const path = './components/SlidePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

// The messed up part 1
content = content.replace(
    /\{\(slideAtual\.points \|\| slideAtual\.topicos\) && \([\s\S]*?<ul className="space-y-6 max-w-5xl">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\?\.map\(\(topico: string, idx: number\) => \([\s\S]*?<li key=\{idx\} className="text-xl md:text-3xl font-bold text-slate-200 flex items-start gap-4 leading-tight">[\s\S]*?<span className="text-emerald-400 mt-1">»<\/span> \{topico\}[\s\S]*?<\/li>[\s\S]*?\}\)[\s\S]*?<\/ul>[\s\S]*?\) : \([\s\S]*?<div className="max-w-5xl">[\s\S]*?<p className="text-2xl md:text-3xl font-bold text-slate-200 leading-relaxed text-justify indent-8">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\.join\(' '\)\}[\s\S]*?<\/p>[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?\)\}/,
    `{(slideAtual.points || slideAtual.topicos) && (
              <ul className="space-y-6 max-w-5xl">
                {(slideAtual.points || slideAtual.topicos)?.map((topico: string, idx: number) => (
                  <li key={idx} className="text-xl md:text-3xl font-bold text-slate-200 flex items-start gap-4 leading-tight">
                    <span className="text-emerald-400 mt-1">»</span> {topico}
                  </li>
                ))}
              </ul>
            )}`
);

// The messed up part 2
content = content.replace(
    /\{\(slideAtual\.points \|\| slideAtual\.topicos\) && \([\s\S]*?<ul className="space-y-4 max-w-xl">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\?\.map\(\(topico: string, idx: number\) => \([\s\S]*?<li key=\{idx\} className="text-base md:text-lg font-bold text-slate-700 flex items-start gap-3 leading-relaxed">[\s\S]*?<span className="text-blue-600 mt-1 font-bold shrink-0">●<\/span> <span>\{topico\}<\/span>[\s\S]*?<\/li>[\s\S]*?\}\)[\s\S]*?<\/ul>[\s\S]*?\) : \([\s\S]*?<div className="max-w-xl">[\s\S]*?<p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed text-justify indent-8">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\.join\(' '\)\}[\s\S]*?<\/p>[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?\)\}/,
    `{(slideAtual.points || slideAtual.topicos) && (
              <ul className="space-y-4 max-w-xl">
                {(slideAtual.points || slideAtual.topicos)?.map((topico: string, idx: number) => (
                  <li key={idx} className="text-base md:text-lg font-bold text-slate-700 flex items-start gap-3 leading-relaxed">
                    <span className="text-blue-600 mt-1 font-bold shrink-0">●</span> <span>{topico}</span>
                  </li>
                ))}
              </ul>
            )}`
);


fs.writeFileSync(path, content, 'utf8');
console.log('Successfully patched SlidePlayer.tsx');
