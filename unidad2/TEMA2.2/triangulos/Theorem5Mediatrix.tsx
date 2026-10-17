import React, { useState, useRef } from 'react';
import { Point, distance } from '../../utils/geometry';
import { Lightbulb, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const Theorem5Mediatrix: React.FC = () => {
  // Base segment endpoints A and B
  const [ptA, setPtA] = useState<Point>({ x: 90, y: 260 });
  const [ptB, setPtB] = useState<Point>({ x: 370, y: 260 });
  // Vertex C of triangle
  const [ptC, setPtC] = useState<Point>({ x: 230, y: 70 });

  // Parameter t along the perpendicular bisector line for point P
  // Midpoint M:
  const midM: Point = {
    x: (ptA.x + ptB.x) / 2,
    y: (ptA.y + ptB.y) / 2
  };

  // Normal vector perpendicular to AB (upwards)
  const dx = ptB.x - ptA.x;
  const dy = ptB.y - ptA.y;
  const lenAB = Math.hypot(dx, dy) || 1;
  // unit normal: (-dy/len, dx/len)
  const nx = -dy / lenAB;
  const ny = dx / lenAB;

  // Slider or offset for P along mediatrix
  const [distPFromM, setDistPFromM] = useState<number>(140);
  const [lateralOffset, setLateralOffset] = useState<number>(0); // 0 means exactly on mediatrix!
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Position of P:
  const ptP: Point = {
    x: midM.x + nx * distPFromM + (dx / lenAB) * lateralOffset,
    y: midM.y + ny * distPFromM + (dy / lenAB) * lateralOffset
  };

  // Live distances
  const scale = 20 / 280;
  const distPA = parseFloat((distance(ptP, ptA) * scale).toFixed(1));
  const distPB = parseFloat((distance(ptP, ptB) * scale).toFixed(1));
  const distAM = parseFloat((distance(ptA, midM) * scale).toFixed(1));
  const distMB = parseFloat((distance(ptB, midM) * scale).toFixed(1));

  const isOnMediatrix = Math.abs(lateralOffset) < 1;
  const isEqual = Math.abs(distPA - distPB) <= 0.1;

  // Mediatrix line representation (extended through canvas)
  const lineMedStart: Point = {
    x: midM.x + nx * (-40),
    y: midM.y + ny * (-40)
  };
  const lineMedEnd: Point = {
    x: midM.x + nx * 230,
    y: midM.y + ny * 230
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                Mediatriz y Equidistancia
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isOnMediatrix ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {isOnMediatrix ? '✓ P sobre la mediatriz (PA = PB)' : '✗ P fuera de la mediatriz (PA ≠ PB)'}
              </span>
            </div>
            {lateralOffset !== 0 && (
              <button
                onClick={() => setLateralOffset(0)}
                className="text-xs px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 font-medium hover:bg-rose-200 transition"
              >
                Reubicar P en la mediatriz
              </button>
            )}
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[350px] mx-auto select-none mt-2">
            <svg
              ref={svgRef}
              viewBox="0 0 460 330"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <pattern id="grid5" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="460" height="330" fill="url(#grid5)" rx="12" />

              {/* Triangle ABC background */}
              <polygon
                points={`${ptA.x},${ptA.y} ${ptB.x},${ptB.y} ${ptC.x},${ptC.y}`}
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <text x={ptC.x} y={ptC.y - 12} textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
                C
              </text>

              {/* Isosceles triangle PAB formed by point P */}
              <polygon
                points={`${ptA.x},${ptA.y} ${ptB.x},${ptB.y} ${ptP.x},${ptP.y}`}
                fill="#f43f5e"
                fillOpacity="0.1"
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray={isOnMediatrix ? 'none' : '3,3'}
              />

              {/* Mediatrix Line */}
              <line
                x1={lineMedStart.x}
                y1={lineMedStart.y}
                x2={lineMedEnd.x}
                y2={lineMedEnd.y}
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeDasharray="5,4"
              />
              <text x={lineMedEnd.x + 8} y={lineMedEnd.y + 4} fill="#e11d48" fontSize="11" fontWeight="700">
                Mediatriz L
              </text>

              {/* Right angle marker at M */}
              {isOnMediatrix && (
                <rect
                  x={midM.x - 12}
                  y={midM.y - 12}
                  width="12"
                  height="12"
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
              )}

              {/* Base segment AB */}
              <line
                x1={ptA.x}
                y1={ptA.y}
                x2={ptB.x}
                y2={ptB.y}
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Segments PA and PB */}
              <line
                x1={ptP.x}
                y1={ptP.y}
                x2={ptA.x}
                y2={ptA.y}
                stroke={isOnMediatrix ? '#e11d48' : '#94a3b8'}
                strokeWidth="3"
              />
              <line
                x1={ptP.x}
                y1={ptP.y}
                x2={ptB.x}
                y2={ptB.y}
                stroke={isOnMediatrix ? '#e11d48' : '#94a3b8'}
                strokeWidth="3"
              />

              {/* Midpoint M marks (single tick marks) */}
              <line x1={(ptA.x + midM.x)/2 - 3} y1={ptA.y - 6} x2={(ptA.x + midM.x)/2 - 3} y2={ptA.y + 6} stroke="#0f172a" strokeWidth="2" />
              <line x1={(ptB.x + midM.x)/2 + 3} y1={ptB.y - 6} x2={(ptB.x + midM.x)/2 + 3} y2={ptB.y + 6} stroke="#0f172a" strokeWidth="2" />

              {/* PA and PB equal marks (double tick marks) */}
              {isOnMediatrix && (
                <>
                  {/* Mark on PA */}
                  <g transform={`translate(${(ptA.x + ptP.x)/2}, ${(ptA.y + ptP.y)/2}) rotate(${(Math.atan2(ptP.y - ptA.y, ptP.x - ptA.x)*180)/Math.PI + 90})`}>
                    <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#e11d48" strokeWidth="2" />
                    <line x1="3" y1="-5" x2="3" y2="5" stroke="#e11d48" strokeWidth="2" />
                  </g>
                  {/* Mark on PB */}
                  <g transform={`translate(${(ptB.x + ptP.x)/2}, ${(ptB.y + ptP.y)/2}) rotate(${(Math.atan2(ptP.y - ptB.y, ptP.x - ptB.x)*180)/Math.PI + 90})`}>
                    <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#e11d48" strokeWidth="2" />
                    <line x1="3" y1="-5" x2="3" y2="5" stroke="#e11d48" strokeWidth="2" />
                  </g>
                </>
              )}

              {/* Points */}
              {/* Midpoint M */}
              <circle cx={midM.x} cy={midM.y} r="5" fill="#e11d48" />
              <text x={midM.x} y={midM.y + 22} textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">
                M
              </text>

              {/* Point A */}
              <circle cx={ptA.x} cy={ptA.y} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <text x={ptA.x - 18} y={ptA.y + 20} fill="#0f172a" fontSize="14" fontWeight="800">
                A
              </text>

              {/* Point B */}
              <circle cx={ptB.x} cy={ptB.y} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <text x={ptB.x + 10} y={ptB.y + 20} fill="#0f172a" fontSize="14" fontWeight="800">
                B
              </text>

              {/* Point P (Special) */}
              <circle cx={ptP.x} cy={ptP.y} r="10" fill="#e11d48" stroke="#ffffff" strokeWidth="3" />
              <text x={ptP.x + 16} y={ptP.y - 2} fill="#e11d48" fontSize="14" fontWeight="800">
                P
              </text>

              {/* Distance Readouts on SVG */}
              <text
                x={(ptA.x + ptP.x) / 2 - 24}
                y={(ptA.y + ptP.y) / 2}
                fill={isOnMediatrix ? '#be123c' : '#64748b'}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                PA = {distPA}
              </text>
              <text
                x={(ptB.x + ptP.x) / 2 + 20}
                y={(ptB.y + ptP.y) / 2}
                fill={isOnMediatrix ? '#be123c' : '#64748b'}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                PB = {distPB}
              </text>
            </svg>
          </div>

          {/* Interactive Sliders for P */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Posición de P sobre la Mediatriz:</span>
                <span className="font-mono-math text-rose-700 font-bold">{distPFromM} px</span>
              </div>
              <input
                type="range"
                min="40"
                max="210"
                value={distPFromM}
                onChange={(e) => setDistPFromM(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Desvío lateral (fuera de mediatriz):</span>
                <span className={`font-mono-math font-bold ${isOnMediatrix ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {lateralOffset === 0 ? '0 (Exacto)' : `${lateralOffset > 0 ? '+' : ''}${lateralOffset} px`}
                </span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={lateralOffset}
                onChange={(e) => setLateralOffset(parseInt(e.target.value, 10))}
                className="w-full accent-slate-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Math Breakdown Deck */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Igualdad de Distancias y Triángulo Isósceles
            </h4>

            {/* Formula Box */}
            <div className={`p-4 rounded-xl border text-center font-mono-math transition-colors ${
              isOnMediatrix ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-semibold text-rose-800 block mb-1">
                {isOnMediatrix ? 'Teorema Cumplido' : 'Condición violada'}
              </span>
              <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold flex-wrap">
                <span className="text-rose-700 bg-rose-100 px-3 py-0.5 rounded-lg border border-rose-300 shadow-xs">
                  PA = {distPA}
                </span>
                <span className="text-slate-400 font-normal">
                  {isOnMediatrix ? '=' : '≠'}
                </span>
                <span className="text-rose-700 bg-rose-100 px-3 py-0.5 rounded-lg border border-rose-300 shadow-xs">
                  PB = {distPB}
                </span>
              </div>
            </div>

            {/* Step-by-step logic */}
            <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800">Demostración por Congruencia (L-A-L):</div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>
                  <strong>Lado común:</strong> El segmento <span className="font-mono-math font-semibold">PM</span> es compartido por los triángulos ΔPMA y ΔPMB.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>
                  <strong>Ángulo recto:</strong> <span className="font-mono-math font-semibold">∠PMA = ∠PMB = 90°</span> (por ser mediatriz perpendicular).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>
                  <strong>Lados iguales:</strong> <span className="font-mono-math font-semibold">AM = MB = {distAM}</span> (M es punto medio de AB).
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Por tanto, <strong>ΔPMA ≅ ΔPMB</strong> y en consecuencia <strong className="text-rose-700 font-mono-math">PA = PB</strong>. ¡El triángulo ΔPAB siempre es isósceles!
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Técnica Clave en Geometría UPSE</span>
            </div>
            <p className="leading-relaxed">
              En problemas de trazos auxiliares, si ves una recta perpendicular que pasa por el punto medio de un segmento,
              <strong>une inmediatamente el punto P con los dos extremos</strong> para formar el triángulo isósceles ΔPAB. Esto traslada ángulos iguales a la base y resuelve el 80% de los ejercicios de este tipo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
