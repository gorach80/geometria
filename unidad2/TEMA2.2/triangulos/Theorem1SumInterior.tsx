import React, { useState, useRef } from 'react';
import { Point, calculateAngle, getAngleWedge } from '../../utils/geometry';
import { RotateCcw, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';

export const Theorem1SumInterior: React.FC = () => {
  const [points, setPoints] = useState<{ A: Point; B: Point; C: Point }>({
    A: { x: 90, y: 280 },
    B: { x: 370, y: 280 },
    C: { x: 230, y: 70 }
  });

  const [activeDrag, setActiveDrag] = useState<'A' | 'B' | 'C' | null>(null);
  const [showParallelProof, setShowParallelProof] = useState<boolean>(true);
  const [mysteryMode, setMysteryMode] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<string>('');
  const [guessFeedback, setGuessFeedback] = useState<'correct' | 'wrong' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Raw angles
  const rawA = calculateAngle(points.B, points.A, points.C);
  const rawB = calculateAngle(points.A, points.B, points.C);
  const rawC = calculateAngle(points.A, points.C, points.B);

  // Normalize so sum is strictly 180 in UI display
  const total = rawA + rawB + rawC;
  const angleA = Math.round((rawA / total) * 180);
  const angleB = Math.round((rawB / total) * 180);
  const angleC = 180 - angleA - angleB;

  const handlePointerDown = (vertex: 'A' | 'B' | 'C') => {
    setActiveDrag(vertex);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(30, Math.min(430, e.clientX - rect.left));
    const y = Math.max(40, Math.min(310, e.clientY - rect.top));

    setPoints((prev) => ({
      ...prev,
      [activeDrag]: { x, y }
    }));
  };

  const handlePointerUp = () => {
    setActiveDrag(null);
  };

  const applyPreset = (type: 'equilatero' | 'rectangulo' | 'obtusangulo') => {
    if (type === 'equilatero') {
      setPoints({
        A: { x: 90, y: 280 },
        B: { x: 370, y: 280 },
        C: { x: 230, y: 37.5 }
      });
    } else if (type === 'rectangulo') {
      setPoints({
        A: { x: 100, y: 280 },
        B: { x: 360, y: 280 },
        C: { x: 100, y: 80 }
      });
    } else {
      setPoints({
        A: { x: 70, y: 280 },
        B: { x: 390, y: 280 },
        C: { x: 140, y: 160 }
      });
    }
    setGuessFeedback(null);
    setUserGuess('');
  };

  const checkMysteryGuess = () => {
    const val = parseInt(userGuess, 10);
    if (val === angleC) {
      setGuessFeedback('correct');
    } else {
      setGuessFeedback('wrong');
    }
  };

  // Euclidean parallel line coords through C parallel to AB
  const dx = points.B.x - points.A.x;
  const dy = points.B.y - points.A.y;
  const pLineStart = { x: points.C.x - dx * 0.8, y: points.C.y - dy * 0.8 };
  const pLineEnd = { x: points.C.x + dx * 0.8, y: points.C.y + dy * 0.8 };

  return (
    <div className="flex flex-col gap-5">
      {/* Simulation Stage & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Laboratorio Interactivo
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Arrastra los vértices A, B o C
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => applyPreset('equilatero')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Equilátero
              </button>
              <button
                onClick={() => applyPreset('rectangulo')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Rectángulo
              </button>
              <button
                onClick={() => applyPreset('obtusangulo')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Obtusángulo
              </button>
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
                <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="460" height="330" fill="url(#grid1)" rx="12" />

              {/* Parallel line through C (Euclid's proof) */}
              {showParallelProof && (
                <g className="transition-opacity duration-300">
                  <line
                    x1={pLineStart.x}
                    y1={pLineStart.y}
                    x2={pLineEnd.x}
                    y2={pLineEnd.y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text
                    x={pLineEnd.x - 40}
                    y={pLineEnd.y - 8}
                    fill="#64748b"
                    fontSize="11"
                    fontStyle="italic"
                  >
                    L || AB (Recta paralela)
                  </text>
                </g>
              )}

              {/* Angle wedges */}
              <path
                d={getAngleWedge(points.C, points.A, points.B, 34)}
                fill="#ef4444"
                fillOpacity="0.25"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <path
                d={getAngleWedge(points.C, points.B, points.A, 34)}
                fill="#22c55e"
                fillOpacity="0.25"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <path
                d={getAngleWedge(points.A, points.C, points.B, 34)}
                fill="#3b82f6"
                fillOpacity="0.25"
                stroke="#3b82f6"
                strokeWidth="2"
              />

              {/* Triangle polygon */}
              <polygon
                points={`${points.A.x},${points.A.y} ${points.B.x},${points.B.y} ${points.C.x},${points.C.y}`}
                fill="#3b82f6"
                fillOpacity="0.07"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Angle labels inside triangle */}
              <text
                x={points.A.x + 22}
                y={points.A.y - 12}
                fill="#b91c1c"
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                A: {angleA}°
              </text>
              <text
                x={points.B.x - 58}
                y={points.B.y - 12}
                fill="#15803d"
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                B: {angleB}°
              </text>
              <text
                x={points.C.x - 22}
                y={points.C.y + (points.C.y < 120 ? 32 : -14)}
                fill="#1d4ed8"
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                {mysteryMode ? 'C: x = ?' : `C: ${angleC}°`}
              </text>

              {/* Draggable Vertex Handles */}
              {(['A', 'B', 'C'] as const).map((vert) => {
                const pt = points[vert];
                const isDragging = activeDrag === vert;
                const vertColor = vert === 'A' ? '#ef4444' : vert === 'B' ? '#22c55e' : '#3b82f6';
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
                      y={pt.y + (vert === 'C' ? -16 : 24)}
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
                checked={showParallelProof}
                onChange={(e) => setShowParallelProof(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-700">Ver demostración con recta paralela (Euclides)</span>
            </label>
            <button
              onClick={() => {
                setMysteryMode(!mysteryMode);
                setGuessFeedback(null);
                setUserGuess('');
              }}
              className="font-medium text-blue-600 hover:text-blue-800 transition"
            >
              {mysteryMode ? 'Modo normal' : 'Modo incógnita (Práctica)'}
            </button>
          </div>
        </div>

        {/* Real-time Math Deck & Explanation */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Real-time Equation Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Comprobación Matemática en Tiempo Real
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono-math">
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold flex-wrap">
                <span className="text-red-600 bg-red-100/70 px-2.5 py-0.5 rounded-lg border border-red-200">
                  {angleA}°
                </span>
                <span className="text-slate-400">+</span>
                <span className="text-emerald-600 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {angleB}°
                </span>
                <span className="text-slate-400">+</span>
                <span className="text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {mysteryMode ? 'x' : `${angleC}°`}
                </span>
                <span className="text-slate-400">=</span>
                <span className="text-slate-900 bg-amber-100/80 px-3 py-0.5 rounded-lg border border-amber-300 shadow-xs">
                  180°
                </span>
              </div>
            </div>

            {/* Sum Visualizer Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5 font-mono-math">
                <span>Distribución del Ángulo Llano (180°)</span>
                <span>{angleA + angleB + (mysteryMode ? angleC : angleC)}° / 180°</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                <div
                  style={{ width: `${(angleA / 180) * 100}%` }}
                  className="bg-red-500 transition-all duration-150"
                  title={`Ángulo A: ${angleA}°`}
                />
                <div
                  style={{ width: `${(angleB / 180) * 100}%` }}
                  className="bg-emerald-500 transition-all duration-150"
                  title={`Ángulo B: ${angleB}°`}
                />
                <div
                  style={{ width: `${(angleC / 180) * 100}%` }}
                  className="bg-blue-500 transition-all duration-150"
                  title={`Ángulo C: ${angleC}°`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span className="text-red-600 font-semibold">A: {angleA}° ({Math.round((angleA/180)*100)}%)</span>
                <span className="text-emerald-600 font-semibold">B: {angleB}° ({Math.round((angleB/180)*100)}%)</span>
                <span className="text-blue-600 font-semibold">C: {angleC}° ({Math.round((angleC/180)*100)}%)</span>
              </div>
            </div>

            {/* Mystery mode interaction */}
            {mysteryMode && (
              <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  Reto Pre-UPSE: ¿Cuánto vale el ángulo C (x)?
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    placeholder="Escribe el valor en grados"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono-math"
                  />
                  <button
                    onClick={checkMysteryGuess}
                    className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shrink-0"
                  >
                    Verificar
                  </button>
                </div>
                {guessFeedback === 'correct' && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ¡Excelente! 180° - ({angleA}° + {angleB}°) = {angleC}°.
                  </div>
                )}
                {guessFeedback === 'wrong' && (
                  <p className="mt-2 text-xs font-semibold text-rose-600">
                    Casi. Recuerda: x = 180° - ({angleA}° + {angleB}°) = 180° - {angleA + angleB}° = {angleC}°.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Academic Exam Tip */}
          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tip Clave para el Preuniversitario UPSE</span>
            </div>
            <p className="leading-relaxed">
              En problemas donde te digan que dos ángulos son suplementarios o complementarios a otros datos,
              establece siempre: <strong>A + B + C = 180°</strong>. Si el triángulo es rectángulo, simplifica
              directamente: <strong>los otros dos ángulos agudos suman 90°</strong> (A + B = 90°).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
