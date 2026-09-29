import React from 'react';
import { Printer, Download, ChevronLeft } from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentPrintViewProps {
  assignment: Assignment;
  className: string;
  school: string;
  onBack: () => void;
}

export const AssignmentPrintView: React.FC<AssignmentPrintViewProps> = ({ 
  assignment, 
  className, 
  school, 
  onBack 
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 print:p-0 print:bg-white">
      <style>{`
        @media print {
          @page { size: portrait; margin: 15mm; }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background: white !important; 
          }
          .print-hidden { display: none !important; }
        }
      `}</style>

      {/* Navigation and Actions */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print-hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors"
        >
          <ChevronLeft size={20} /> Voltar
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
          >
            <Printer size={18} /> Imprimir Trabalho
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-all"
          >
            <Download size={18} /> Salvar PDF
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        {/* School Header */}
        <div className="p-8 border-b-2 border-slate-900 flex items-center justify-between gap-6 print:p-4 print:border-black">
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight print:text-lg">
              {school}
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1 print:text-[10px]">
              Secretaria de Estado de Educação - SEEDUC RJ
            </p>
          </div>
          <div className="text-right shrink-0">
             <div className="inline-block px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest print:border print:border-black print:text-black print:bg-transparent">
               TRABALHO AVALIATIVO
             </div>
             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase print:text-black">Ref: 2026.3</p>
          </div>
        </div>

        {/* Student Form */}
        <div className="p-8 bg-slate-50/50 space-y-4 print:p-4 print:bg-white print:border-b print:border-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 print:border-black">
                  <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap print:text-[10px] print:text-black">Aluno(a):</span>
                  <div className="flex-1 h-5"></div>
                </div>
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 print:border-black">
                  <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap print:text-[10px] print:text-black">Disciplina:</span>
                  <span className="text-xs font-bold text-slate-800 uppercase print:text-[10px] print:text-black">Educação Física</span>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 print:border-black">
                  <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap print:text-[10px] print:text-black">Turma:</span>
                  <span className="text-xs font-bold text-slate-800 uppercase print:text-[10px] print:text-black">{className}</span>
                </div>
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 print:border-black">
                  <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap print:text-[10px] print:text-black">Data:</span>
                  <div className="flex-1 h-5"></div>
                </div>
             </div>
          </div>
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-200 print:border-black print:pt-2">
            <p className="text-[10px] font-black uppercase text-slate-400 print:text-black">Professor: André Victor Brito</p>
            <p className="text-[10px] font-black uppercase text-slate-400 print:text-black">Valor: {assignment.totalPoints.toFixed(1)} Pontos</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 print:p-4 print:space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 print:text-sm">
              {assignment.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed print:text-xs">
              {assignment.description}
            </p>
          </div>

          {/* ROTEIRO DO TRABALHO DE PESQUISA DE GINÁSTICA (SE SELECIONADO OU DEFAULT) */}
          {assignment.title?.toLowerCase().includes('ginástica') || assignment.title?.toLowerCase().includes('pesquisa') ? (
            <div className="space-y-8 text-slate-800 text-sm print:text-xs">
              <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 print:bg-white print:border-black print:p-4">
                <h3 className="font-black text-amber-900 uppercase tracking-wider mb-3 print:text-black print:text-xs">
                  📋 ROTEIRO DO TRABALHO DE PESQUISA – EDUCAÇÃO FÍSICA
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-bold text-slate-700 text-xs print:text-[10px] print:text-black">
                  <span>📅 Lançamento: 28/09/2026</span>
                  <span>📥 Entrega: 26/10/2026 (Aula 19)</span>
                  <span>💯 Valor: 3,0 pontos</span>
                </div>
              </div>

              {/* 1. Normas e Padrões */}
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 uppercase border-l-4 border-indigo-600 pl-3 print:border-black">
                  1. Normas e Padrões de Apresentação
                </h4>
                <div className="space-y-2 pl-4 text-slate-700 leading-relaxed print:text-black">
                  <p><strong>Capa Obrigatória:</strong> Nome da Escola, Nome Completo do Aluno, Turma e Número, Nome do Professor (Prof. André Brito), Título: <em>"A História e as Modalidades da Ginástica"</em>, Local e Ano (Maricá - 2026).</p>
                  <p><strong>Cabeçalho nas Páginas Internas:</strong> Nome do Aluno e Disciplina no topo de cada folha.</p>
                  <p><strong>Formato:</strong> Manuscrito (à mão, caneta azul ou preta) ou digitado. Mínimo de 2 páginas de conteúdo (sem contar a capa).</p>
                </div>
              </div>

              {/* 2. Roteiro de Pesquisa */}
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 uppercase border-l-4 border-indigo-600 pl-3 print:border-black">
                  2. Roteiro de Pesquisa (O que deve conter)
                </h4>
                <ul className="list-disc pl-8 space-y-2 text-slate-700 print:text-black">
                  <li><strong>A Chegada da Ginástica no Brasil:</strong> Como e quando a ginástica chegou ao nosso país (século XIX, influência militar e das escolas alemã e sueca).</li>
                  <li><strong>A Criação da Seleção Brasileira de Ginástica:</strong> Organização da Confederação Brasileira de Ginástica (CBG) e a evolução do Brasil nas competições internacionais.</li>
                  <li><strong>As Modalidades da Ginástica:</strong> Descrever as principais modalidades (história, como funciona e aparelhos/elementos utilizados).</li>
                </ul>
              </div>

              {/* 3. Gabarito de Orientação / Modalidades */}
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 uppercase border-l-4 border-indigo-600 pl-3 print:border-black">
                  3. Lista e Gabarito de Orientação das Modalidades (CBG / FIG)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 print:grid-cols-1">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 print:bg-white print:border-black print:p-2">
                    <h5 className="font-bold text-indigo-700 text-xs uppercase mb-1 print:text-black">🏆 Modalidades Olímpicas Principais</h5>
                    <ul className="text-xs space-y-1 text-slate-600 print:text-black print:text-[10px]">
                      <li>• <strong>Ginástica Artística:</strong> Solo, Cavalo com Alças, Argolas, Salto, Barras Paralelas/Fixa (M); Salto, Barras Assimétricas, Trave, Solo (F).</li>
                      <li>• <strong>Ginástica Rítmica (GR):</strong> Arco, Bola, Maças, Fita e Corda.</li>
                      <li>• <strong>Ginástica de Trampolim:</strong> Saltos e acrobacias no ar.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 print:bg-white print:border-black print:p-2">
                    <h5 className="font-bold text-indigo-700 text-xs uppercase mb-1 print:text-black">🏅 Outras Modalidades Oficiais e Não Competitiva</h5>
                    <ul className="text-xs space-y-1 text-slate-600 print:text-black print:text-[10px]">
                      <li>• <strong>Ginástica Acrobática:</strong> Duplas/grupos e pirâmides humanas.</li>
                      <li>• <strong>Ginástica Aeróbica Esportiva:</strong> Movimentos dinâmicos rítmicos.</li>
                      <li>• <strong>Parkour:</strong> Transposição fluida de obstáculos.</li>
                      <li>• <strong>Ginástica para Todos (GPT):</strong> Inclusiva e não competitiva.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 print:space-y-8">
              {/* Questão 1 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-slate-800 flex gap-2 print:text-xs">
                    <span className="font-black text-indigo-600 print:text-black">01.</span>
                    No Voleibol, o que é o sistema de "Rodízio" e em que sentido os jogadores devem se mover na quadra?
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 whitespace-nowrap print:text-black">(2,0 pts)</span>
                </div>
                <div className="h-24 border-b border-slate-200 print:border-black print:h-16"></div>
              </div>

              {/* Questão 2 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-slate-800 flex gap-2 print:text-xs">
                    <span className="font-black text-indigo-600 print:text-black">02.</span>
                    No Futsal, cite as 4 posições principais de linha (Fixo, Alas e Pivô) e explique brevemente a função principal do "Fixo".
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 whitespace-nowrap print:text-black">(2,0 pts)</span>
                </div>
                <div className="h-32 border-b border-slate-200 print:border-black print:h-24"></div>
              </div>

              {/* Questão 3 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-slate-800 flex gap-2 print:text-xs">
                    <span className="font-black text-indigo-600 print:text-black">03.</span>
                    No Voleibol, em qual situação de jogo a "Manchete" é mais recomendada em comparação ao "Toque de Dedos"?
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 whitespace-nowrap print:text-black">(2,0 pts)</span>
                </div>
                <div className="h-24 border-b border-slate-200 print:border-black print:h-16"></div>
              </div>

              {/* Questão 4 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-slate-800 flex gap-2 print:text-xs">
                    <span className="font-black text-indigo-600 print:text-black">04.</span>
                    Explique como deve ser cobrado o "Tiro de Canto" (Escanteio) no Futsal e qual o tempo limite que o jogador tem para realizar a cobrança.
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 whitespace-nowrap print:text-black">(2,0 pts)</span>
                </div>
                <div className="h-32 border-b border-slate-200 print:border-black print:h-24"></div>
              </div>

              {/* Questão 5 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-slate-800 flex gap-2 print:text-xs">
                    <span className="font-black text-indigo-600 print:text-black">05.</span>
                    DESENHO TÁTICO: No espaço abaixo, desenhe uma quadra de Futsal ou Voleibol e posicione os jogadores em um sistema tático estudado.
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 whitespace-nowrap print:text-black">(2,0 pts)</span>
                </div>
                <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center print:border-solid print:border-black print:h-48">
                  <span className="text-slate-300 font-bold uppercase text-xs print:hidden">Espaço para desenho tático</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 flex justify-between items-center print:pt-4 print:border-black">
             <p className="text-[10px] font-bold text-slate-400 italic print:text-black">"O esporte é ferramenta de transformação social."</p>
             <p className="text-[10px] font-black uppercase text-slate-900 print:text-black">Boa sorte!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
