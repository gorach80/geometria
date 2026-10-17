import React, { useState, useRef } from 'react';
import { Point, distance, getAngleWedge, calculateAngle } from '../../utils/geometry';
import { Lightbulb, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';

export const Theorem6InteriorBisector: React.FC = () => {
  // Vertices of triangle: A is top vertex whose angle is bisected
  const [ptA, setPtA] = useState<Point>({ x: 220, y: 70 });
  const [ptB, setPtB] = useState<Point>({ x: 90, y: 260 });
  const [ptC, setPtC] = useState<Point>({ x: 380, y: 260 });

  const [activeDrag, setActiveDrag] = useState<'A' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Distances:
  // c = AB (adjacent side 1)
  // b = AC (adjacent side 2)
  const distAB = distance(ptA, ptB);
  const distAC = distance(ptA, ptC);

  // Exact position of D on BC by internal angle bisector theorem:
  // BD / DC = AB / AC  =>  BD = BC * (AB / (AB + AC))
  const ratioProp = distAB / (distAB + distAC);
  const ptD: Point = {
    x: ptB.x + ratioProp * (ptC.x - ptB.x),
    y: ptB.y + ratioProp * (ptC.y - ptB.y)
  };

  const distBD = distance(ptB, ptD);
  const distDC = distance(ptD, ptC);

  // Scale to human-friendly academic dimensions
  const scale = 24 / 300;
  const c = parseFloat((distAB * scale).toFixed(1));
  const b = parseFloat((distAC * scale).toFixed(1));
  const m = parseFloat((distBD * scale).toFixed(1));
  const n = parseFloat((distDC * scale).toFixed(1));

  // Proportions
  const ratioSegments = (m / n).toFixed(2);
  const ratioSides = (c / b).toFixed(2);
  const cross1 = (m * b).toFixed(1);
  const cross2 = (n * c).toFixed(1);

  // Bisected angles at A
  const angleAtA = calculateAngle(ptB, ptA, ptC);
  const halfAngle = (angleAtA / 2).toFixed(1);

  const handlePointerDown = () => {
    setActiveDrag('A');
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(120, Math.min(340, e.clientX - rect.left));
    const y = Math.max(50, Math.min(160, e.clientY - rect.top));
    setPtA({ x, y });
  };

  const handlePointerUp = () => {
    setActiveDrag(null);
  };

  // Quick problem solver states
  const [calcInput, setCalcInput] = useState({ c: '12', b: '8', m: '6', target: 'n' as 'n' | 'm' | 'c' | 'b' });
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const solveUnknown = () => {
    const valC = parseFloat(calcInput.c);
    const valB = parseFloat(calcInput.b);
    const valM = parseFloat(calcInput.m);

    if (calcInput.target === 'n') {
      if (valC > 0 && valB > 0 && valM > 0) {
        // n = (m * b) / c
        const res = (valM * valB) / valC;
        setCalcResult(`n = (m · b) / c = (${valM} · ${valB}) / ${valC} = ${res.toFixed(2)} cm`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                Proporcionalidad Geométrica
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Arrastra el vértice A para cambiar los lados
              </span>
            </div>
            <div className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg font-mono-math">
              ∠BAD = ∠DAC = {halfAngle}° (Bisectriz)
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[350px] mx-auto select-none mt-2">
            <svg
              ref={svgRef}
              viewBox="0 0 460 330"
              className="w-full h-full touch-none cursor-crosshair overflow-visible"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <defs>
                <pattern id="grid6" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="460" height="330" fill="url(#grid6)" rx="12" />

              {/* Triangle Polygon */}
              <polygon
                points={`${ptA.x},${ptA.y} ${ptB.x},${ptB.y} ${ptC.x},${ptC.y}`}
                fill="#0d9488"
                fillOpacity="0.08"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Bisector line AD */}
              <line
                x1={ptA.x}
                y1={ptA.y}
                x2={ptD.x}
                y2={ptD.y}
                stroke="#0d9488"
                strokeWidth="3"
                strokeDasharray="6,4"
              />

              {/* Angle arc bisector marks at A */}
              <path
                d={getAngleWedge(ptB, ptA, ptD, 28)}
                fill="#14b8a6"
                fillOpacity="0.35"
                stroke="#0d9488"
                strokeWidth="2"
              />
              <path
                d={getAngleWedge(ptD, ptA, ptC, 36)}
                fill="#14b8a6"
                fillOpacity="0.35"
                stroke="#0d9488"
                strokeWidth="2"
              />

              {/* Segment markings on base BC */}
              {/* Segment m = BD */}
              <line
                x1={ptB.x}
                y1={ptB.y + 12}
                x2={ptD.x - 3}
                y2={ptD.y + 12}
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Segment n = DC */}
              <line
                x1={ptD.x + 3}
                y1={ptD.y + 12}
                x2={ptC.x}
                y2={ptC.y + 12}
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Points */}
              {/* Point D */}
              <circle cx={ptD.x} cy={ptD.y} r="6" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
              <text x={ptD.x} y={ptD.y - 12} textAnchor="middle" fill="#0d9488" fontSize="13" fontWeight="800">
                D
              </text>

              {/* Point B */}
              <circle cx={ptB.x} cy={ptB.y} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <text x={ptB.x - 18} y={ptB.y + 4} fill="#0f172a" fontSize="14" fontWeight="800">
                B
              </text>

              {/* Point C */}
              <circle cx={ptC.x} cy={ptC.y} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <text x={ptC.x + 12} y={ptC.y + 4} fill="#0f172a" fontSize="14" fontWeight="800">
                C
              </text>

              {/* Vertex A (draggable) */}
              <g className="cursor-grab active:cursor-grabbing" onPointerDown={handlePointerDown}>
                <circle cx={ptA.x} cy={ptA.y} r="12" fill="#0d9488" stroke="#ffffff" strokeWidth="3" className="shadow-md" />
                <text x={ptA.x} y={ptA.y - 18} textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">
                  A
                </text>
              </g>

              {/* Segment Labels */}
              <text
                x={(ptA.x + ptB.x) / 2 - 24}
                y={(ptA.y + ptB.y) / 2}
                fill="#2563eb"
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                c = {c}
              </text>
              <text
                x={(ptA.x + ptC.x) / 2 + 18}
                y={(ptA.y + ptC.y) / 2}
                fill="#dc2626"
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                b = {b}
              </text>
              <text
                x={(ptB.x + ptD.x) / 2}
                y={ptB.y + 30}
                textAnchor="middle"
                fill="#2563eb"
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                m = {m}
              </text>
              <text
                x={(ptD.x + ptC.x) / 2}
                y={ptC.y + 30}
                textAnchor="middle"
                fill="#dc2626"
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                n = {n}
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="font-medium text-slate-600">
              Proporción: los segmentos <strong className="text-blue-600">m</strong> y <strong className="text-rose-600">n</strong> son directamente proporcionales a los lados <strong className="text-blue-600">c</strong> y <strong className="text-rose-600">b</strong>.
            </span>
          </div>
        </div>

        {/* Live Proportionality Rigor Deck */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Verificación de la Razón de Proporcionalidad
            </h4>

            {/* Live Fractions Display */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-center font-mono-math">
              <span className="text-xs font-semibold text-teal-800 block mb-2">
                BD / DC = AB / AC  ⇒  m / n = c / b
              </span>
              <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-bold flex-wrap">
                {/* Fraction m/n */}
                <div className="inline-flex flex-col items-center bg-white px-3 py-1.5 rounded-lg border border-teal-200">
                  <span className="text-blue-600 border-b border-slate-300 w-full text-center pb-0.5">m ({m})</span>
                  <span className="text-red-600 pt-0.5">n ({n})</span>
                </div>

                <span className="text-slate-400">=</span>

                {/* Fraction c/b */}
                <div className="inline-flex flex-col items-center bg-white px-3 py-1.5 rounded-lg border border-teal-200">
                  <span className="text-blue-600 border-b border-slate-300 w-full text-center pb-0.5">c ({c})</span>
                  <span className="text-red-600 pt-0.5">b ({b})</span>
                </div>

                <span className="text-slate-400">=</span>

                <span className="text-teal-800 bg-white px-3 py-2 rounded-lg border border-teal-300 shadow-xs">
                  {ratioSegments}
                </span>
              </div>
            </div>

            {/* Cross Multiplication Check */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono-math flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[11px]">Producto Cruzado: m · b = n · c</span>
                <span className="font-bold text-slate-800">
                  {m} · {b} = {cross1} ≈ {n} · {c} = {cross2}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            </div>

            {/* Quick UPSE Practice Calculator */}
            <div className="mt-4 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                <Calculator className="w-4 h-4 text-teal-600" />
                <span>Despejador Rápido de Ejercicios</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Ingresa tres valores conocidos y halla el 4to segmento desconocido (n):
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-math">Lado c:</label>
                  <input
                    type="number"
                    value={calcInput.c}
                    onChange={(e) => setCalcInput({ ...calcInput, c: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono-math bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-math">Lado b:</label>
                  <input
                    type="number"
                    value={calcInput.b}
                    onChange={(e) => setCalcInput({ ...calcInput, b: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono-math bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono-math">Segmento m:</label>
                  <input
                    type="number"
                    value={calcInput.m}
                    onChange={(e) => setCalcInput({ ...calcInput, m: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono-math bg-white"
                  />
                </div>
              </div>

              <button
                onClick={solveUnknown}
                className="w-full mt-2.5 py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <span>Calcular valor de n</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {calcResult && (
                <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono-math text-emerald-800">
                  {calcResult}
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Regla Mnemotécnica UPSE</span>
            </div>
            <p className="leading-relaxed">
              Recuerda siempre emparejar cada segmento de la base con el <strong>lado que tiene al lado</strong>:
              <code>m</code> va con <code>c</code>, y <code>n</code> va con <code>b</code>.
              La relación es siempre <code>m / n = c / b</code> o <code>m / c = n / b</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
