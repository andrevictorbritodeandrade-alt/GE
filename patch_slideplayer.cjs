const fs = require('fs');
const path = './components/SlidePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{\(slideAtual\.points \|\| slideAtual\.topicos\) && \([\s\S]*?isTeacherSlide \? \([\s\S]*?<ul className="space-y-6 max-w-5xl">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\?\.map\(\(topico: string, idx: number\) => \([\s\S]*?<li key=\{idx\} className="text-xl md:text-3xl font-bold text-slate-200 flex items-start gap-4 leading-tight">[\s\S]*?<span className="text-emerald-400 mt-1">»<\/span> \{topico\}[\s\S]*?<\/li>[\s\S]*?\}\)[\s\S]*?<\/ul>[\s\S]*?\) : \([\s\S]*?<div className="max-w-5xl">[\s\S]*?<p className="text-2xl md:text-3xl font-bold text-slate-200 leading-relaxed text-justify indent-8">[\s\S]*?\{\(slideAtual\.points \|\| slideAtual\.topicos\)\.join\(' '\)\}[\s\S]*?<\/p>[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?\)\}/;

const replacement = `{(slideAtual.points || slideAtual.topicos) && (
              <ul className="space-y-6 max-w-5xl">
                {(slideAtual.points || slideAtual.topicos)?.map((topico: string, idx: number) => (
                  <li key={idx} className="text-xl md:text-3xl font-bold text-slate-200 flex items-start gap-4 leading-tight">
                    <span className="text-emerald-400 mt-1">»</span> {topico}
                  </li>
                ))}
              </ul>
            )}`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully patched SlidePlayer.tsx');
} else {
    console.log('Failed to find regex match in SlidePlayer.tsx');
}
