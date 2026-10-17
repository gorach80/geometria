import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProblemSolver: React.FC = () => {
  const [solverType, setSolverType] = useState<'angles' | 'exterior' | 'inequality' | 'bisector' | 'mediatrix'>('angles');

  // State for Angles Solver
  const [angA, setAngA] = useState<string>('65');
  const [angB, setAngB] = useState<string>('45');

  // State for Exterior Angle Solver
  const [extA, setExtA] = useState<string>('50');
  const [extB, setExtB] = useState<string>('70');

  // State for Inequality Solver
  const [sideA, setSideA] = useState<string>('6');
  const [sideB, setSideB] = useState<string>('8');
  const [sideC, setSideC] = useState<string>('11');

  // State for Bisector Solver
  const [bisC, setBisC] = useState<string>('12'); // side AB
  const [bisB, setBisB] = useState<string>('9');  // side AC
  const [bisM, setBisM] = useState<string>('8');  // segment BD

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
              Herramienta de Apoyo para Tareas
            </span>
            <span className="text-xs text-slate-500">Resolutor Paso a Paso</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Calculadora y Demostrador de Ejercicios
          </h3>
        </div>

        {/* Solver Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSolverType('angles')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              solverType === 'angles' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Suma Ángulos (180°)
          </button>
          <button
            onClick={() => setSolverType('exterior')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              solverType === 'exterior' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ángulo Exterior
          </button>
          <button
            onClick={() => setSolverType('inequality')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              solverType === 'inequality' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Desigualdad Triangular
          </button>
          <button
            onClick={() => setSolverType('bisector')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              solverType === 'bisector' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Bisectriz Interior
          </button>
        </div>
      </div>

      {/* Solver Content */}
      <div className="mt-6">
        {solverType === 'angles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                Ingresa los 2 ángulos conocidos:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Ángulo interior A (°):
                  </label>
                  <input
                    type="number"
                    value={angA}
                    onChange={(e) => setAngA(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Ángulo interior B (°):
                  </label>
                  <input
                    type="number"
                    value={angB}
                    onChange={(e) => setAngB(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono-math"
                  />
                </div>
              </div>
            </div>

            {/* Result */}
            {(() => {
              const a = parseFloat(angA) || 0;
              const b = parseFloat(angB) || 0;
              const c = 180 - (a + b);
              const isValid = a > 0 && b > 0 && a + b < 180;

              return (
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-2">
                      Resultado y Demostración:
                    </span>
                    {isValid ? (
                      <div className="space-y-3 font-mono-math text-xs text-slate-700">
                        <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                          <span className="text-slate-500 block text-[11px]">Tercer Ángulo C:</span>
                          <span className="text-2xl font-bold text-blue-700">{c}°</span>
                        </div>
                        <div className="space-y-1 text-slate-600 bg-white/60 p-3 rounded-xl border border-blue-100">
                          <p>1. Teorema: A + B + C = 180°</p>
                          <p>2. Sustitución: {a}° + {b}° + C = 180°</p>
                          <p>3. Suma: {a + b}° + C = 180°</p>
                          <p>4. Despeje: C = 180° - {a + b}° = <strong className="text-blue-700">{c}°</strong></p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-rose-600 font-semibold p-4 bg-rose-50 border border-rose-200 rounded-xl">
                        Los valores ingresados deben ser positivos y su suma menor a 180°.
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-3 border-t border-blue-200 mt-4">
                    Clasificación del triángulo:{' '}
                    {isValid && (
                      <strong className="text-slate-800">
                        {c === 90 || a === 90 || b === 90
                          ? 'Rectángulo'
                          : c > 90 || a > 90 || b > 90
                          ? 'Obtusángulo'
                          : 'Acutángulo'}
                        {' · '}
                        {a === b && b === c
                          ? 'Equilátero'
                          : a === b || b === c || a === c
                          ? 'Isósceles'
                          : 'Escaleno'}
                      </strong>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {solverType === 'exterior' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                Ingresa los dos ángulos interiores no adyacentes:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Ángulo interior A (°):
                  </label>
                  <input
                    type="number"
                    value={extA}
                    onChange={(e) => setExtA(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Ángulo interior B (°):
                  </label>
                  <input
                    type="number"
                    value={extB}
                    onChange={(e) => setExtB(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono-math"
                  />
                </div>
              </div>
            </div>

            {(() => {
              const a = parseFloat(extA) || 0;
              const b = parseFloat(extB) || 0;
              const x = a + b;
              const intC = 180 - x;

              return (
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                      Cálculo del Ángulo Exterior:
                    </span>
                    <div className="space-y-3 font-mono-math text-xs text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                        <span className="text-slate-500 block text-[11px]">Ángulo Exterior x:</span>
                        <span className="text-2xl font-bold text-emerald-700">{x}°</span>
                      </div>
                      <div className="space-y-1 text-slate-600 bg-white/60 p-3 rounded-xl border border-emerald-100">
                        <p>1. Teorema: x = A + B</p>
                        <p>2. Sustitución: x = {a}° + {b}°</p>
                        <p>3. Resultado: <strong className="text-emerald-700">x = {x}°</strong></p>
                        <p>4. Comprobación de par lineal: C_int = 180° - {x}° = {intC}°</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-800 pt-3 border-t border-emerald-200 mt-4">
                    ✓ Se cumple x &gt; A ({x}° &gt; {a}°) y x &gt; B ({x}° &gt; {b}°).
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {solverType === 'inequality' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                Ingresa las 3 longitudes de lados:
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Lado a:
                  </label>
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Lado b:
                  </label>
                  <input
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Lado c:
                  </label>
                  <input
                    type="number"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono-math"
                  />
                </div>
              </div>
            </div>

            {(() => {
              const a = parseFloat(sideA) || 0;
              const b = parseFloat(sideB) || 0;
              const c = parseFloat(sideC) || 0;

              const c1 = a + b > c;
              const c2 = a + c > b;
              const c3 = b + c > a;
              const isValid = c1 && c2 && c3 && a > 0 && b > 0 && c > 0;

              return (
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
                      Análisis de Existencia:
                    </span>
                    <div className="p-3 bg-white rounded-xl border border-amber-200 text-center mb-3">
                      <span className={`text-lg font-bold ${isValid ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {isValid ? '✓ Sí forma un triángulo' : '✗ NO forma un triángulo'}
                      </span>
                    </div>
                    <div className="space-y-1.5 font-mono-math text-xs text-slate-700 bg-white/60 p-3 rounded-xl border border-amber-100">
                      <p>• {a} + {b} = {a + b} {c1 ? '>' : '≯'} {c} ({c1 ? 'Cumple' : 'Falla'})</p>
                      <p>• {a} + {c} = {a + c} {c2 ? '>' : '≯'} {b} ({c2 ? 'Cumple' : 'Falla'})</p>
                      <p>• {b} + {c} = {b + c} {c3 ? '>' : '≯'} {a} ({c3 ? 'Cumple' : 'Falla'})</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-amber-900 pt-3 border-t border-amber-200 mt-4">
                    Intervalo para 'a' con b={b} y c={c}: <strong className="font-mono-math">{Math.abs(b - c)} &lt; a &lt; {b + c}</strong>.
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {solverType === 'bisector' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                Ingresa los datos para la bisectriz interior:
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Lado c (AB adyacente a m):
                  </label>
                  <input
                    type="number"
                    value={bisC}
                    onChange={(e) => setBisC(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Lado b (AC adyacente a n):
                  </label>
                  <input
                    type="number"
                    value={bisB}
                    onChange={(e) => setBisB(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono-math"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Segmento m (BD):
                  </label>
                  <input
                    type="number"
                    value={bisM}
                    onChange={(e) => setBisM(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono-math"
                  />
                </div>
              </div>
            </div>

            {(() => {
              const c = parseFloat(bisC) || 0;
              const b = parseFloat(bisB) || 0;
              const m = parseFloat(bisM) || 0;
              const n = c > 0 ? (m * b) / c : 0;
              const totalBase = m + n;

              return (
                <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-2">
                      Cálculo de Proporcionalidad:
                    </span>
                    <div className="p-3 bg-white rounded-xl border border-teal-200 text-center mb-3">
                      <span className="text-slate-500 block text-[11px]">Segmento n (DC) despejado:</span>
                      <span className="text-2xl font-bold text-teal-700 font-mono-math">{n.toFixed(2)}</span>
                    </div>
                    <div className="space-y-1 text-slate-600 bg-white/60 p-3 rounded-xl border border-teal-100 font-mono-math text-xs">
                      <p>1. Teorema: m / n = c / b</p>
                      <p>2. En cruz: n · c = m · b</p>
                      <p>3. Despeje: n = (m · b) / c</p>
                      <p>4. Cálculo: n = ({m} · {b}) / {c} = <strong className="text-teal-700">{n.toFixed(2)}</strong></p>
                      <p>5. Lado base total BC: m + n = {m} + {n.toFixed(2)} = {totalBase.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-teal-800 pt-3 border-t border-teal-200 mt-4">
                    Razón de semejanza: c / b = {(c / (b || 1)).toFixed(2)} == m / n = {(m / (n || 1)).toFixed(2)}.
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
