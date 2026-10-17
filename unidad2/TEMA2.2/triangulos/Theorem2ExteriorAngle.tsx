import React, { useState, useRef } from 'react';
import { Point, calculateAngle, getAngleWedge } from '../../utils/geometry';
import { Lightbulb, CheckCircle2, Shuffle } from 'lucide-react';

export const Theorem2ExteriorAngle: React.FC = () => {
  const [points, setPoints] = useState<{ A: Point; B: Point; C: Point }>({
    A: { x: 200, y: 80 },
    B: { x: 90, y: 260 },
    C: { x: 280, y: 260 }
  });

  const [activeDrag, setActiveDrag] = useState<'A' | 'B' | 'C' | null>(null);
  const [showSupplementary, setShowSupplementary] = useState<boolean>(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Raw angles
  const rawA = calculateAngle(points.B, points.A, points.C);
  const rawB = calculateAngle(points.A, points.B, points.C);
  const rawC = calculateAngle(points.A, points.C, points.B);

  const total = rawA + rawB + rawC;
  const angleA = Math.round((rawA / total) * 180);
  const angleB = Math.round((rawB / total) * 180);
  const angleC_int = 180 - angleA - angleB;
  const angleExterior = angleA + angleB;

  // Extension point D along BC ray
  const dx = points.C.x - points.B.x;
  const dy = points.C.y - points.B.y;
  const len = Math.hypot(dx, dy) || 1;
  const unitX = dx / len;
  const unitY = dy / len;
  const pointD: Point = {
    x: points.C.x + unitX * 120,
    y: points.C.y + unitY * 120
  };

  const handlePointerDown = (vertex: 'A' | 'B' | 'C') => {
    setActiveDrag(vertex);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(40, Math.min(320, e.clientX - rect.left));
    const y = Math.max(50, Math.min(290, e.clientY - rect.top));

    setPoints((prev) => ({
      ...prev,
      [activeDrag]: { x, y }
    }));
  };

  const handlePointerUp = () => {
    setActiveDrag(null);
  };

  const randomizePositions = () => {
    const rxA = Math.floor(130 + Math.random() * 140);
    const ryA = Math.floor(60 + Math.random() * 80);
    const rxB = Math.floor(60 + Math.random() * 60);
    const rxC = Math.floor(250 + Math.random() * 70);
    setPoints({
      A: { x: rxA, y: ryA },
      B: { x: rxB, y: 260 },
      C: { x: rxC, y: 260 }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Simulador Dinámico
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Prolongación del lado BC hacia D
              </span>
            </div>
            <button
              onClick={randomizePositions}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Probar otro triángulo
            </button>
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
                <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
                </marker>
              </defs>
              <rect width="460" height="330" fill="url(#grid2)" rx="12" />

              {/* Extended Ray BC -> D */}
              <line
                x1={points.C.x}
                y1={points.C.y}
                x2={pointD.x}
                y2={pointD.y}
                stroke="#1e293b"
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />

              {/* Angle wedges */}
              {/* Internal A */}
              <path
                d={getAngleWedge(points.B, points.A, points.C, 32)}
                fill="#dc2626"
                fillOpacity="0.3"
                stroke="#dc2626"
                strokeWidth="2"
              />
              {/* Internal B */}
              <path
                d={getAngleWedge(points.A, points.B, points.C, 32)}
                fill="#16a34a"
                fillOpacity="0.3"
                stroke="#16a34a"
                strokeWidth="2"
              />
              {/* Internal C (Optional/Supplementary) */}
              {showSupplementary && (
                <path
                  d={getAngleWedge(points.A, points.C, points.B, 26)}
                  fill="#94a3b8"
                  fillOpacity="0.25"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              )}
              {/* Exterior Angle x at C */}
              <path
                d={getAngleWedge(points.A, points.C, pointD, 38)}
                fill="#0284c7"
                fillOpacity="0.35"
                stroke="#0284c7"
                strokeWidth="2.5"
              />

              {/* Triangle Body */}
              <polygon
                points={`${points.A.x},${points.A.y} ${points.B.x},${points.B.y} ${points.C.x},${points.C.y}`}
                fill="#059669"
                fillOpacity="0.08"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Labels */}
              <text
                x={points.A.x + 10}
                y={points.A.y - 12}
                fill="#dc2626"
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                A: {angleA}°
              </text>
              <text
                x={points.B.x - 25}
                y={points.B.y + 22}
                fill="#16a34a"
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                B: {angleB}°
              </text>
              {showSupplementary && (
                <text
                  x={points.C.x - 42}
                  y={points.C.y - 10}
                  fill="#64748b"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="JetBrains Mono"
                >
                  {angleC_int}°
                </text>
              )}
              <text
                x={points.C.x + 32}
                y={points.C.y - 14}
                fill="#0369a1"
                fontSize="14"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                x = {angleExterior}°
              </text>
              <text
                x={pointD.x - 10}
                y={pointD.y + 20}
                fill="#475569"
                fontSize="12"
                fontWeight="700"
              >
                D
              </text>

              {/* Vertices handles */}
              {(['A', 'B', 'C'] as const).map((vert) => {
                const pt = points[vert];
                const isDragging = activeDrag === vert;
                const vertColor = vert === 'A' ? '#dc2626' : vert === 'B' ? '#16a34a' : '#0284c7';
                return (
                  <g
                    key={vert}
                    className="cursor-grab active:cursor-grabbing transition-transform"
                    onPointerDown={() => handlePointerDown(vert)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isDragging ? 14 : 10}
                      fill={vertColor}
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="shadow-md"
                    />
                    <text
                      x={pt.x}
                      y={pt.y + (vert === 'A' ? -16 : 24)}
                      textAnchor="middle"
                      fill="#0f172a"
                      fontSize="14"
                      fontWeight="800"
                    >
                      {vert}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSupplementary}
                onChange={(e) => setShowSupplementary(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-slate-700">Mostrar ángulo interior adyacente ({angleC_int}°)</span>
            </label>
            <span className="text-slate-500 font-mono-math">
              {angleC_int}° + {angleExterior}° = 180° (Par lineal)
            </span>
          </div>
        </div>

        {/* Math Rigor Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Fórmula y Demostración Algebraica
            </h4>

            {/* Formula Highlight */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center font-mono-math">
              <span className="text-xs font-semibold text-emerald-800 block mb-1">
                x = A + B
              </span>
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold flex-wrap">
                <span className="text-sky-700 bg-sky-100 px-3 py-0.5 rounded-lg border border-sky-300 shadow-xs">
                  x = {angleExterior}°
                </span>
                <span className="text-slate-400">=</span>
                <span className="text-red-600 bg-red-100/70 px-2.5 py-0.5 rounded-lg border border-red-200">
                  {angleA}°
                </span>
                <span className="text-slate-400">+</span>
                <span className="text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {angleB}°
                </span>
              </div>
            </div>

            {/* Step by step proof */}
            <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800">¿Por qué funciona este teorema?</div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 font-mono-math">1.</span>
                <span>
                  Los 3 ángulos interiores suman 180°:{' '}
                  <span className="font-mono-math font-semibold text-slate-800">
                    A + B + C = 180°
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 font-mono-math">2.</span>
                <span>
                  El ángulo interior C y el exterior x forman una línea recta:{' '}
                  <span className="font-mono-math font-semibold text-slate-800">
                    C + x = 180°
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 font-mono-math">3.</span>
                <span>
                  Igualando ambas expresiones: C + (A + B) = C + x  ⇒{' '}
                  <strong className="text-emerald-700 font-mono-math">x = A + B</strong>.
                </span>
              </div>
            </div>

            {/* Live Comparison Indicators */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-100/80 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">¿x &gt; A?</span>
                <span className="font-bold text-emerald-700 font-mono-math">
                  {angleExterior}° &gt; {angleA}° <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-600 ml-1" />
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100/80 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">¿x &gt; B?</span>
                <span className="font-bold text-emerald-700 font-mono-math">
                  {angleExterior}° &gt; {angleB}° <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-600 ml-1" />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Regla de Oro en la UPSE</span>
            </div>
            <p className="leading-relaxed">
              El ángulo exterior <strong>SIEMPRE es estrictamente mayor</strong> que cualquiera de los dos
              interiores no adyacentes. Si en un ejercicio de opción múltiple obtienes un ángulo exterior menor que
              A o B, revisa inmediatamente tu cálculo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
