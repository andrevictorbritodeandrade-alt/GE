import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Printer, Download, X } from 'lucide-react';

interface PlanosImpressaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  turma: string;
  escola: string;
  professor: string;
  disciplina?: string;
  trimestres: {
    name: string;
    periodo?: string;
    aulas: { data: string; tema: string; desenvolvimento: string }[];
  }[];
}

export const PlanosImpressaoModal: React.FC<PlanosImpressaoModalProps> = ({
  isOpen, onClose, turma, escola, professor, disciplina = 'Educação Física & Itinerários Formativos', trimestres
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      const pdf = new jsPDF('p', 'mm', 'a4'); // Modo Retrato A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      
      let heightLeft = contentHeight;
      let position = margin;

      // Primeira página
      pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
      heightLeft -= (pageHeight - (margin * 2));

      // Páginas subsequentes (quando o conteúdo for longo)
      while (heightLeft > 0) {
        position = margin - (contentHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
        heightLeft -= (pageHeight - (margin * 2));
      }

      const safeFileName = `Planos_Aula_${escola.replace(/[^a-zA-Z0-9]/g, '_')}_2026.pdf`;
      pdf.save(safeFileName);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-2 sm:p-4 print:p-0 print:bg-white print:static print:inset-auto">
      {/* Inline Print Styles para garantir Modo Retrato A4 e ocultar UI na impressão */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-plan-doc, #printable-plan-doc * {
            visibility: visible;
          }
          #printable-plan-doc {
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
          tr {
            page-break-inside: avoid;
          }
          .trimestre-section {
            page-break-inside: auto;
          }
        }
      `}</style>

      <div className="flex flex-col h-[94vh] w-full max-w-4xl bg-slate-100 rounded-2xl overflow-hidden shadow-2xl border border-slate-300 print:border-none print:shadow-none print:h-auto print:w-full print:bg-white">
        
        {/* Barra de Ações Superior (Oculta na impressão) */}
        <div className="no-print p-4 bg-white border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center z-10 shadow-sm">
          <div>
            <h2 className="font-black text-slate-800 text-base flex items-center gap-2">
              <Printer className="w-5 h-5 text-blue-600" />
              Visualização para Impressão • Modo Retrato (A4)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Documento formatado por trimestres para assinatura e protocolo escolar
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
            id="printable-plan-doc"
            ref={printRef}
            className="w-full max-w-[210mm] bg-white min-h-[297mm] p-8 md:p-12 shadow-lg rounded-sm text-slate-900 font-sans print:shadow-none print:p-0 print:max-w-none print:w-full"
            style={{ boxSizing: 'border-box' }}
          >
            {/* Cabeçalho Institucional Padrão SEEDUC */}
            <header className="border-b-2 border-slate-900 pb-5 mb-6 text-center">
              <div className="text-[11px] uppercase tracking-widest font-black text-slate-600 mb-1">
                GOVERNO DO ESTADO DO RIO DE JANEIRO • SECRETARIA DE ESTADO DE EDUCAÇÃO
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">
                RESOLUÇÃO SEEDUC Nº 6392/2025 • CALENDÁRIO ESCOLAR OFICIAL 2026 (206 DIAS LETIVOS)
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mt-1">
                {escola}
              </h1>

              <div className="mt-3 pt-3 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left text-xs text-slate-700 font-medium">
                <div>
                  <span className="font-bold text-slate-900">Docente:</span> {professor}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Turma(s):</span> {turma}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Componente:</span> {disciplina}
                </div>
              </div>
            </header>

            {/* Listagem de Trimestres em Documento Único */}
            <div className="space-y-6">
              {trimestres.map((tri, i) => (
                <div key={i} className="trimestre-section border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 border-b border-slate-300 px-4 py-2.5 flex justify-between items-center">
                    <h2 className="font-black text-xs uppercase tracking-wide text-slate-900">
                      {tri.name}
                    </h2>
                    {tri.periodo && (
                      <span className="text-[11px] font-bold text-slate-600">
                        {tri.periodo}
                      </span>
                    )}
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-2.5 w-20 border-r border-slate-200 text-center">Data</th>
                        <th className="p-2.5 w-1/3 border-r border-slate-200">Tema da Aula</th>
                        <th className="p-2.5">Desenvolvimento Metodológico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {tri.aulas.map((aula, j) => (
                        <tr key={j} className="hover:bg-slate-50/50">
                          <td className="p-2.5 text-center font-bold text-slate-800 border-r border-slate-200 align-top whitespace-nowrap">
                            {aula.data}
                          </td>
                          <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200 align-top">
                            {aula.tema}
                          </td>
                          <td className="p-2.5 text-slate-700 align-top leading-relaxed text-[11px]">
                            {aula.desenvolvimento}
                          </td>
                        </tr>
                      ))}
                      {tri.aulas.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-slate-400 italic">
                            Nenhuma aula registrada para este trimestre.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Rodapé Oficial para Data e Assinatura */}
            <footer className="mt-12 pt-6 border-t-2 border-slate-400 text-xs text-slate-700">
              <div className="flex flex-col sm:flex-row justify-between items-end gap-8">
                <div className="space-y-1 text-[11px]">
                  <p>
                    <span className="font-bold">Emissão do Documento:</span> {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-slate-500">
                    Sistema de Gestão Escolar e Planejamento Pedagógico • SEEDUC-RJ 2026
                  </p>
                </div>

                <div className="text-center min-w-[240px]">
                  <div className="border-t border-slate-900 pt-2 mb-1">
                    <p className="font-bold text-slate-900">{professor}</p>
                    <p className="text-[11px] text-slate-600">Docente de Educação Física • SEEDUC-RJ</p>
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
