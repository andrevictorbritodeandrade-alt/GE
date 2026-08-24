import React, { useState } from 'react';
import heroImage from '../src/assets/images/theoretical_studies_hero_1785433620164.jpg';
import { BackButton } from './BackButton';

interface ProfessorLoginViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ProfessorLoginView: React.FC<ProfessorLoginViewProps> = ({ onBack, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1989') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword('');
    }
  };

  return (
    <div className="relative z-50 min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="max-w-md w-full bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative animate-scale-in">
        <div className="mb-4">
          <BackButton onClick={onBack} label="Voltar" />
        </div>

        <div className="text-center mb-6 mt-2">
          {/* Avatar / Icon */}
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20 bg-emerald-500 flex items-center justify-center">
            {!imgError ? (
              <img 
                src={heroImage} 
                alt="Prof. André Brito" 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)}
              />
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )}
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Acesso Professor</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Insira o PIN de segurança para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite o PIN"
              className={`w-full bg-slate-50 border ${error ? 'border-red-400 text-red-600 ring-2 ring-red-200' : 'border-slate-200 text-slate-900'} text-center text-2xl tracking-[0.5em] font-mono rounded-2xl px-6 py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner placeholder:text-slate-300 placeholder:tracking-normal font-bold`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs text-center mt-2 font-bold uppercase tracking-wider animate-bounce">
                PIN INCORRETO
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest py-3.5 rounded-2xl transition-colors shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            Acessar Sistema
          </button>
        </form>
      </div>
    </div>
  );
};
