import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

export const Theorem3TriangleInequality: React.FC = () => {
  const [a, setA] = useState<number>(7);
  const [b, setB] = useState<number>(8);
  const [c, setC] = useState<number>(10);

  // Inequalities checks
  const check1 = a + b > c;
  const check2 = a + c > b;
  const check3 = b + c > a;
  const isValidTriangle = check1 && check2 && check3;
  const isDegenerate = (a + b === c) || (a + c === b) || (b + c === a);

  // For visual representation: place side c along horizontal axis
  // Scale factor to fit inside SVG
  const maxSide = Math.max(a, b, c, 12);
  const svgWidth = 460;
  const svgHeight = 280;
  const scale = 260 / maxSide;

  // Let base be side c (from pA to pB)
  const baseLen = c * scale;
  const pA = { x: (svgWidth - baseLen) / 2, y: 220 };
  const pB = { x: pA.x + baseLen, y: 220 };

  // Calculate intersection of circles centered at pA (radius b*scale) and pB (radius a*scale)
  // standard circle-circle intersection:
  // d = baseLen
  // x_offset = (d^2 - r2^2 + r1^2) / (2d)
  const r1 = b * scale; // side b is from A to C
  const r2 = a * scale; // side a is from B to C
  const d = baseLen;

  let vertexC: { x: number; y: number } | null = null;
  if (isValidTriangle && d > 0) {
    const xOffset = (d * d - r2 * r2 + r1 * r1) / (2 * d);
    const ySquare = r1 * r1 - xOffset * xOffset;
    if (ySquare >= 0) {
      const yOffset = Math.sqrt(ySquare);
      vertexC = {
        x: pA.x + xOffset,
        y: pA.y - yOffset
      };
    }
  }

  const setPreset = (sideA: number, sideB: number, sideC: number) => {
    setA(sideA);
    setB(sideB);
    setC(sideC);
  };

  const diffBC = Math.abs(b - c);
  const sumBC = b + c;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Visual Simulation Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                Comprobador de Existencia
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                isValidTriangle
                  ? 'bg-emerald-100 text-emerald-800'
                  : isDegenerate
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {isValidTriangle ? '✓ Triángulo Válido' : isDegenerate ? '⚠ Degenerado (Línea)' : '✗ No se puede formar'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setPreset(6, 8, 10)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                (6, 8, 10)
              </button>
              <button
                onClick={() => setPreset(4, 5, 12)}
                className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium transition"
              >
                (4, 5, 12) Imposible
              </button>
              <button
                onClick={() => setPreset(7, 7, 7)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                (7, 7, 7)
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[350px] mx-auto select-none mt-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
            >
              <defs>
                <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={svgWidth} height={svgHeight} fill="url(#grid3)" rx="12" />

              {/* Circles showing reachable compass arcs */}
              <circle
                cx={pA.x}
                cy={pA.y}
                r={r1}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                strokeOpacity="0.4"
              />
              <circle
                cx={pB.x}
                cy={pB.y}
                r={r2}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                strokeOpacity="0.4"
              />

              {/* Base line c */}
              <line
                x1={pA.x}
                y1={pA.y}
                x2={pB.x}
                y2={pB.y}
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* If triangle is valid, draw sides a and b */}
              {vertexC ? (
                <>
                  <polygon
                    points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${vertexC.x},${vertexC.y}`}
                    fill="#f59e0b"
                    fillOpacity="0.12"
                    stroke="#1e293b"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Side b (A to C) */}
                  <line
                    x1={pA.x}
                    y1={pA.y}
                    x2={vertexC.x}
                    y2={vertexC.y}
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                  />
                  {/* Side a (B to C) */}
                  <line
                    x1={pB.x}
                    y1={pB.y}
                    x2={vertexC.x}
                    y2={vertexC.y}
                    stroke="#ef4444"
                    strokeWidth="3.5"
                  />

                  {/* Vertex C point */}
                  <circle cx={vertexC.x} cy={vertexC.y} r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                  <text x={vertexC.x} y={vertexC.y - 14} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">
                    C
                  </text>
                </>
              ) : (
                /* Disconnected arms visualization */
                <>
                  {/* Side b rotated 45 deg */}
                  <line
                    x1={pA.x}
                    y1={pA.y}
                    x2={pA.x + r1 * Math.cos(-Math.PI / 3)}
                    y2={pA.y + r1 * Math.sin(-Math.PI / 3)}
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeDasharray="6,4"
                  />
                  {/* Side a rotated 135 deg */}
                  <line
                    x1={pB.x}
                    y1={pB.y}
                    x2={pB.x - r2 * Math.cos(-Math.PI / 3)}
                    y2={pB.y + r2 * Math.sin(-Math.PI / 3)}
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeDasharray="6,4"
                  />
                  <rect
                    x={svgWidth / 2 - 130}
                    y={70}
                    width="260"
                    height="44"
                    rx="8"
                    fill="#fff1f2"
                    stroke="#fecdd3"
                  />
                  <text
                    x={svgWidth / 2}
                    y={96}
                    textAnchor="middle"
                    fill="#be123c"
                    fontSize="12"
                    fontWeight="700"
                  >
                    {isDegenerate
                      ? 'Los extremos coinciden en una sola línea'
                      : '¡Los arcos no se intersectan! Longitud insuficiente'}
                  </text>
                </>
              )}

              {/* Vertices A and B */}
              <circle cx={pA.x} cy={pA.y} r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
              <text x={pA.x - 16} y={pA.y + 20} fill="#0f172a" fontSize="14" fontWeight="800">
                A
              </text>

              <circle cx={pB.x} cy={pB.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
              <text x={pB.x + 10} y={pB.y + 20} fill="#0f172a" fontSize="14" fontWeight="800">
                B
              </text>

              {/* Side length tags */}
              <text x={(pA.x + pB.x) / 2} y={pA.y + 24} textAnchor="middle" fill="#047857" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">
                c = {c}
              </text>
              {vertexC && (
                <>
                  <text x={(pA.x + vertexC.x) / 2 - 18} y={(pA.y + vertexC.y) / 2} fill="#1d4ed8" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">
                    b = {b}
                  </text>
                  <text x={(pB.x + vertexC.x) / 2 + 18} y={(pB.y + vertexC.y) / 2} fill="#b91c1c" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">
                    a = {a}
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Sliders for sides */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-red-600 font-mono-math">Lado a:</span>
                <span className="font-bold text-slate-800 font-mono-math">{a}</span>
              </div>
              <input
                type="range"
                min="2"
                max="18"
                value={a}
                onChange={(e) => setA(parseInt(e.target.value, 10))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-600 font-mono-math">Lado b:</span>
                <span className="font-bold text-slate-800 font-mono-math">{b}</span>
              </div>
              <input
                type="range"
                min="2"
                max="18"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-600 font-mono-math">Lado c:</span>
                <span className="font-bold text-slate-800 font-mono-math">{c}</span>
              </div>
              <input
                type="range"
                min="2"
                max="18"
                value={c}
                onChange={(e) => setC(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Inequality Math Checks */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Verificación de las 3 Desigualdades
            </h4>

            <div className="space-y-2.5">
              {/* Check 1 */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono-math ${
                check1 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div>
                  <div className="font-bold text-slate-700">a + b &gt; c</div>
                  <div className="text-slate-500 text-[11px]">
                    {a} + {b} = {a + b} {check1 ? '>' : '≯'} {c}
                  </div>
                </div>
                {check1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </div>

              {/* Check 2 */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono-math ${
                check2 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div>
                  <div className="font-bold text-slate-700">a + c &gt; b</div>
                  <div className="text-slate-500 text-[11px]">
                    {a} + {c} = {a + c} {check2 ? '>' : '≯'} {b}
                  </div>
                </div>
                {check2 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </div>

              {/* Check 3 */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono-math ${
                check3 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div>
                  <div className="font-bold text-slate-700">b + c &gt; a</div>
                  <div className="text-slate-500 text-[11px]">
                    {b} + {c} = {b + c} {check3 ? '>' : '≯'} {a}
                  </div>
                </div>
                {check3 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </div>
            </div>

            {/* Existence Interval Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <span className="font-bold text-amber-900 block mb-1">
                Intervalo de Existencia para el lado 'a':
              </span>
              <div className="font-mono-math font-semibold text-slate-800 text-center py-1.5 bg-white rounded-lg border border-amber-200">
                |b - c| &lt; a &lt; b + c
              </div>
              <div className="text-center font-mono-math text-amber-800 mt-1 font-medium">
                |{b} - {c}| &lt; a &lt; {b} + {c}  ⇒  <span className="font-bold underline">{diffBC} &lt; a &lt; {sumBC}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Con b = {b} y c = {c}, el lado <strong>a</strong> debe medir estrictamente más de {diffBC} y menos de {sumBC}.
                (Actualmente a = {a} {a > diffBC && a < sumBC ? '✓ Cumple' : '✗ No cumple'}).
              </p>
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Truco de Examen UPSE</span>
            </div>
            <p className="leading-relaxed">
              No necesitas comprobar las 3 fórmulas siempre. Basta con <strong>identificar el lado más largo</strong> y comprobar que sea menor que la suma de los otros dos: <code>lado_mayor &lt; lado_medio + lado_menor</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
