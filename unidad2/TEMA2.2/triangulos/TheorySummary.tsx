import React from 'react';
import { THEOREMS_DATA } from '../data/theoremsData';
import { TheoremId } from '../types/theorems';
import { BookOpen, CheckCircle, Lightbulb, ArrowRight, Printer } from 'lucide-react';

interface TheorySummaryProps {
  onGoToSimulator: (id: TheoremId) => void;
}

export const TheorySummary: React.FC<TheorySummaryProps> = ({ onGoToSimulator }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Material de Estudio · Pre-UPSE
              </span>
              <span className="text-xs text-slate-500">Curso de Nivelación y Admisión</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Formulario y Resumen Teórico Completo
            </h3>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Formulario</span>
          </button>
        </div>

        {/* List of 6 detailed theorems */}
        <div className="divide-y divide-slate-100">
          {THEOREMS_DATA.map((theorem) => (
            <div key={theorem.id} className="py-6 first:pt-6 last:pb-0">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full ${theorem.themeColor.bg} text-white font-extrabold flex items-center justify-center text-sm shrink-0 shadow-xs`}>
                    {theorem.badgeNumber}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {theorem.title}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {theorem.shortTitle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onGoToSimulator(theorem.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <span>Ver en Simulador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Statement */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-3 text-xs md:text-sm text-slate-800 leading-relaxed">
                <strong>Enunciado Oficial:</strong> {theorem.statement}
              </div>

              {/* Formulas & Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col justify-center text-center">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Fórmula(s) Matemática(s)
                  </span>
                  <div className="space-y-1 font-mono-math font-bold text-slate-900 text-sm md:text-base">
                    {theorem.formula.map((f, fIdx) => (
                      <div key={fIdx} className="bg-slate-50 py-1.5 px-2 rounded-lg border border-slate-200/80">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-2 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    {theorem.explanation}
                  </p>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Clave para el Examen de Admisión UPSE:</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      {theorem.upseKeyAdvice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Properties bullet list */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {theorem.properties.map((prop, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50/80 text-[11px] text-slate-700 border border-slate-100">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{prop}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
