const fs = require('fs');
const path = './components/SlidePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(`              ) : (
                <div className="max-w-5xl">
                  <p className="text-2xl md:text-3xl font-bold text-slate-200 leading-relaxed text-justify indent-8">
                    {(slideAtual.points || slideAtual.topicos).join(' ')}
                  </p>
                </div>
              )`, ``);

content = content.replace(`                    ) : (
                      <div className="max-w-xl">
                        <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed text-justify indent-8">
                          {(slideAtual.points || slideAtual.topicos).join(' ')}
                        </p>
                      </div>
                    )`, ``);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully patched SlidePlayer.tsx');
