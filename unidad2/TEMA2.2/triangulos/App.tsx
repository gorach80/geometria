/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PosterInfographic } from './components/PosterInfographic';
import { PracticeQuiz } from './components/PracticeQuiz';
import { ProblemSolver } from './components/ProblemSolver';
import { TheorySummary } from './components/TheorySummary';
import { Theorem1SumInterior } from './components/simulators/Theorem1SumInterior';
import { Theorem2ExteriorAngle } from './components/simulators/Theorem2ExteriorAngle';
import { Theorem3TriangleInequality } from './components/simulators/Theorem3TriangleInequality';
import { Theorem4LargestSideAngle } from './components/simulators/Theorem4LargestSideAngle';
import { Theorem5Mediatrix } from './components/simulators/Theorem5Mediatrix';
import { Theorem6InteriorBisector } from './components/simulators/Theorem6InteriorBisector';
import { THEOREMS_DATA } from './data/theoremsData';
import { TheoremId } from './types/theorems';
import { Sparkles, Layers, CheckCircle2, ChevronRight, BookOpen, PenTool } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'poster' | 'simulator' | 'quiz' | 'solver' | 'theory'>('poster');
  const [activeTheoremId, setActiveTheoremId] = useState<TheoremId>(1);

  const currentTheorem = THEOREMS_DATA.find((t) => t.id === activeTheoremId) || THEOREMS_DATA[0];

  const handleSelectTheoremFromPoster = (id: TheoremId) => {
    setActiveTheoremId(id);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Tab 1: Lámina Digital / Infografía */}
        {activeTab === 'poster' && (
          <PosterInfographic onSelectTheorem={handleSelectTheoremFromPoster} />
        )}

        {/* Tab 2: Simulador Interactivo */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Theorem Selector Pill Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {THEOREMS_DATA.map((t) => {
                  const isActive = t.id === activeTheoremId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTheoremId(t.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                        isActive
                          ? `${t.themeColor.bg} text-white shadow-xs`
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isActive ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {t.badgeNumber}
                      </span>
                      <span>{t.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Theorem Hero Bar */}
            <div className={`p-5 rounded-3xl border bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${currentTheorem.themeColor.border}`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${currentTheorem.themeColor.badgeBg}`}>
                    Teorema {currentTheorem.badgeNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Pre-UPSE Geometría</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  {currentTheorem.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">
                  {currentTheorem.statement}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono-math text-xs font-bold text-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-normal uppercase">Fórmula:</span>
                  {currentTheorem.formula[0]}
                </div>
              </div>
            </div>

            {/* Active Simulator Component */}
            <div>
              {activeTheoremId === 1 && <Theorem1SumInterior />}
              {activeTheoremId === 2 && <Theorem2ExteriorAngle />}
              {activeTheoremId === 3 && <Theorem3TriangleInequality />}
              {activeTheoremId === 4 && <Theorem4LargestSideAngle />}
              {activeTheoremId === 5 && <Theorem5Mediatrix />}
              {activeTheoremId === 6 && <Theorem6InteriorBisector />}
            </div>

            {/* Bottom Navigation between Theorems */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
              <button
                onClick={() => setActiveTheoremId((prev) => (prev > 1 ? ((prev - 1) as TheoremId) : 6))}
                className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                ← Teorema Anterior
              </button>
              <span className="font-mono-math text-slate-500">
                Teorema {activeTheoremId} de 6
              </span>
              <button
                onClick={() => setActiveTheoremId((prev) => (prev < 6 ? ((prev + 1) as TheoremId) : 1))}
                className="px-4 py-2 font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition shadow-xs"
              >
                Siguiente Teorema →
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Banco de Preguntas / Quiz */}
        {activeTab === 'quiz' && <PracticeQuiz />}

        {/* Tab 4: Solucionador de Ejercicios */}
        {activeTab === 'solver' && <ProblemSolver />}

        {/* Tab 5: Formulario y Teoría */}
        {activeTab === 'theory' && (
          <TheorySummary onGoToSimulator={handleSelectTheoremFromPoster} />
        )}
      </main>

      <Footer />
    </div>
  );
}
