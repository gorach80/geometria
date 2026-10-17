import React from 'react';
import { Compass } from 'lucide-react';

interface HeaderProps {
  activeTab: 'poster' | 'simulator' | 'quiz' | 'solver' | 'theory';
  setActiveTab: (tab: 'poster' | 'simulator' | 'quiz' | 'solver' | 'theory') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <div
          onClick={() => setActiveTab('poster')}
          className="cursor-pointer flex items-center gap-2.5 text-slate-900 font-extrabold tracking-tight text-lg font-heading whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <span>Teoremas UPSE</span>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('poster')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'poster'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Lámina Digital
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Simuladores
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'quiz'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Banco de Preguntas
          </button>
          <button
            onClick={() => setActiveTab('solver')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'solver'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Solucionador
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'theory'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Formulario
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs whitespace-nowrap shrink-0"
          >
            Evaluación Pre-UPSE
          </button>
        </div>
      </div>
    </header>
  );
};
