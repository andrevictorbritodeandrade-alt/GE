import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Printer, Download, X, BookOpen } from 'lucide-react';

interface AulaImpressaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aula: {
    titulo: string;
    data: string;
    tri: string;
    modulo?: string;
    desc?: string;
    resumo: string;
    trabalho?: string;
    status?: string;
  } | null;
  escola: string;
  turma: string;
  professor?: string;
  disciplina?: string;
}

export const AulaImpressaoModal: React.FC<AulaImpressaoModalProps> = ({
  isOpen,
  onClose,
  aula,
  escola,
  turma,
  professor = 'André Brito',
  disciplina = 'Educação Física & Itinerários Formativos'
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !aula) return null;

  const handlePrintDirect = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Retrato A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 12;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let heightLeft = contentHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
      heightLeft -= (pageHeight - (margin * 2));

      while (heightLeft > 0) {
        position = margin - (contentHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
        heightLeft -= (pageHeight - (margin * 2));
      }

      const safeTitle = (aula.titulo || 'Aula').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Roteiro_Aula_${safeTitle}_${aula.data.replace('/', '-')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF da aula:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Divide o texto do resumo para renderização estruturada limpa
  const paragraphs = aula.resumo ? aula.resumo.split('\n').filter(p => p.trim() !== '') : [];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-2 sm:p-4 print:p-0 print:bg-white print:static print:inset-auto">
      {/* Estilos específicos para impressão retrato da aula individual */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm 15mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-single-aula-doc, #printable-single-aula-doc * {
            visibility: visible;
          }
          #printable-single-aula-doc {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .aula-block {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="flex flex-col h-[94vh] w-full max-w-3xl bg-slate-100 rounded-2xl overflow-hidden shadow-2xl border border-slate-300 print:border-none print:shadow-none print:h-auto print:w-full print:bg-white">
        
        {/* Barra Superior de Ações */}
        <div className="no-print p-4 bg-white border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center z-10 shadow-sm">
          <div>
            <h2 className="font-black text-slate-800 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Roteiro de Aula Individual • Modo Retrato (A4)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Objetivos pedagógicos e roteiro de fala para condução da aula
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrintDirect}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
            </button>
            <button 
              onClick={handleDownloadPdf} 
              disabled={isGenerating}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow transition-all disabled:opacity-50 active:scale-95"
            >
              <Download className="w-4 h-4" /> {isGenerating ? 'Gerando...' : 'Baixar PDF'}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Folha de Impressão (Preview / Print Target) */}
        <div className="flex-grow overflow-auto p-4 sm:p-8 bg-slate-200 flex justify-center print:bg-white print:p-0">
          <div 
            id="printable-single-aula-doc"
            ref={printRef}
            className="w-full max-w-[210mm] bg-white min-h-[297mm] p-8 md:p-12 shadow-lg rounded-sm text-slate-900 font-sans print:shadow-none print:p-0 print:max-w-none print:w-full flex flex-col justify-between"
            style={{ boxSizing: 'border-box' }}
          >
            <div>
              {/* Cabeçalho Institucional Padrão SEEDUC */}
              <header className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
                <div className="text-[10px] uppercase tracking-widest font-black text-slate-600 mb-0.5">
                  GOVERNO DO ESTADO DO RIO DE JANEIRO • SECRETARIA DE ESTADO DE EDUCAÇÃO
                </div>
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-2">
                  RESOLUÇÃO SEEDUC Nº 6392/2025 • CALENDÁRIO ESCOLAR 2026
                </div>

                <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                  {escola}
                </h1>

                <div className="mt-3 pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left text-xs text-slate-700 font-medium">
                  <div>
                    <span className="font-bold text-slate-900">Docente:</span> {professor}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Turma:</span> {turma}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Data Prevista:</span> {aula.data}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Trimestre:</span> {aula.tri}
                  </div>
                </div>
              </header>

              {/* Título e Módulo da Aula */}
              <div className="mb-6 p-4 bg-slate-50 border-l-4 border-emerald-600 rounded-r-lg">
                <div className="text-[11px] font-black uppercase tracking-wider text-emerald-800 mb-1">
                  MÓDULO: {aula.modulo || 'DESENVOLVIMENTO PEDAGÓGICO'} • COMPONENTE: {disciplina}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {aula.titulo}
                </h2>
                {aula.desc && (
                  <p className="text-xs text-slate-600 mt-1 font-medium italic">
                    {aula.desc}
                  </p>
                )}
              </div>

              {/* Roteiro e Objetivos Formatados Limpos */}
              <div className="space-y-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
                {paragraphs.map((p, idx) => {
                  const isAmparoLegal = p.includes('📜 **Amparo Legal') || p.includes('📜 **Reflexão');
                  const isDinamica = p.includes('🗣️ **O que falar/Dinâmica') || p.includes('🗣️ **Dinâmica') || p.includes('🗣️ **Prática') || p.includes('🗣️ **Roteiro Pedagógico');
                  const isObjetivo = p.includes('🎯 **Objetivo');
                  const isTrabalho = p.includes('⚠️ **TRABALHO') || p.includes('⚠️ **LEMBRETE') || p.includes('📥 **TRABALHO');

                  const formattedParts = p.split('**').map((part, i) =>
                    i % 2 === 1 ? <strong key={i} className="text-slate-900 font-black">{part}</strong> : part
                  );

                  if (isObjetivo) {
                    return (
                      <div key={idx} className="aula-block p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950">
                        <div className="font-bold text-xs uppercase tracking-wide text-blue-800 mb-1">
                          🎯 Objetivo da Aula
                        </div>
                        <div className="text-slate-900 font-medium">
                          {formattedParts}
                        </div>
                      </div>
                    );
                  }

                  if (isDinamica) {
                    return (
                      <div key={idx} className="aula-block p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg text-slate-900">
                        <div className="font-bold text-xs uppercase tracking-wide text-emerald-800 mb-1">
                          🗣️ Roteiro de Fala & Dinâmica Metodológica
                        </div>
                        <div className="leading-relaxed">
                          {formattedParts}
                        </div>
                      </div>
                    );
                  }

                  if (isAmparoLegal) {
                    return (
                      <div key={idx} className="aula-block p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-xs">
                        <div className="font-bold uppercase tracking-wide text-amber-900 mb-1">
                          📜 Amparo Legal & Reflexão Crítica
                        </div>
                        <div>
                          {formattedParts}
                        </div>
                      </div>
                    );
                  }

                  if (isTrabalho) {
                    return (
                      <div key={idx} className="aula-block p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-950 text-xs font-medium">
                        <div className="font-bold uppercase tracking-wide text-rose-900 mb-1">
                          ⚠️ Observações Avaliativas / Trabalhos
                        </div>
                        <div>
                          {formattedParts}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="aula-block pl-2 border-l-2 border-slate-200">
                      {formattedParts}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Rodapé Oficial da Folha */}
            <footer className="mt-12 pt-6 border-t border-slate-300 text-xs text-slate-600">
              <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
                <div className="space-y-0.5 text-[10px]">
                  <p>
                    <span className="font-bold text-slate-800">Emissão:</span> {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-slate-500">
                    Documento de planejamento pedagógico individualizado • SEEDUC-RJ 2026
                  </p>
                </div>

                <div className="text-center min-w-[220px]">
                  <div className="border-t border-slate-800 pt-1.5">
                    <p className="font-bold text-slate-900 text-xs">{professor}</p>
                    <p className="text-[10px] text-slate-500">Docente de Educação Física • SEEDUC-RJ</p>
                  </div>
                </div>
              </div>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
};
