import React, { useState, useRef } from 'react';
import { Point, distance, calculateAngle, getAngleWedge } from '../../utils/geometry';
import { Lightbulb, ArrowUpDown, Award } from 'lucide-react';

export const Theorem4LargestSideAngle: React.FC = () => {
  const [points, setPoints] = useState<{ A: Point; B: Point; C: Point }>({
    A: { x: 100, y: 260 },
    B: { x: 380, y: 260 },
    C: { x: 290, y: 70 }
  });

  const [activeDrag, setActiveDrag] = useState<'A' | 'B' | 'C' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Distances / Sides
  const rawDistA = distance(points.B, points.C); // side a (opposes A)
  const rawDistB = distance(points.A, points.C); // side b (opposes B)
  const rawDistC = distance(points.A, points.B); // side c (opposes C)

  // Scale distances to friendly numbers (e.g., cm scale)
  const scale = 20 / 300;
  const sideA = parseFloat((rawDistA * scale).toFixed(1));
  const sideB = parseFloat((rawDistB * scale).toFixed(1));
  const sideC = parseFloat((rawDistC * scale).toFixed(1));

  // Angles
  const rawAngA = calculateAngle(points.B, points.A, points.C);
  const rawAngB = calculateAngle(points.A, points.B, points.C);
  const rawAngC = calculateAngle(points.A, points.C, points.B);
  const totalAng = rawAngA + rawAngB + rawAngC;
  const angleA = Math.round((rawAngA / totalAng) * 180);
  const angleB = Math.round((rawAngB / totalAng) * 180);
  const angleC = 180 - angleA - angleB;

  // Sorting elements
  const elements = [
    { name: 'A', sideName: 'a', sideVal: sideA, angVal: angleA, oppSideName: 'BC' },
    { name: 'B', sideName: 'b', sideVal: sideB, angVal: angleB, oppSideName: 'AC' },
    { name: 'C', sideName: 'c', sideVal: sideC, angVal: angleC, oppSideName: 'AB' }
  ];

  const sortedBySide = [...elements].sort((x, y) => y.sideVal - x.sideVal);
  const sortedByAngle = [...elements].sort((x, y) => y.angVal - x.angVal);

  const handlePointerDown = (vertex: 'A' | 'B' | 'C') => {
    setActiveDrag(vertex);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(40, Math.min(420, e.clientX - rect.left));
    const y = Math.max(40, Math.min(300, e.clientY - rect.top));

    setPoints((prev) => ({
      ...prev,
      [activeDrag]: { x, y }
    }));
  };

  const handlePointerUp = () => {
    setActiveDrag(null);
  };

  const applyPreset = (type: 'rectangulo' | 'isosceles' | 'escaleno') => {
    if (type === 'rectangulo') {
      setPoints({
        A: { x: 100, y: 260 },
        B: { x: 370, y: 260 },
        C: { x: 100, y: 90 }
      });
    } else if (type === 'isosceles') {
      setPoints({
        A: { x: 100, y: 260 },
        B: { x: 360, y: 260 },
        C: { x: 230, y: 80 }
      });
    } else {
      setPoints({
        A: { x: 80, y: 260 },
        B: { x: 390, y: 260 },
        C: { x: 300, y: 65 }
      });
    }
  };

  const getColorRank = (vertName: string) => {
    const rank = sortedBySide.findIndex((el) => el.name === vertName);
    if (rank === 0) return { stroke: '#7c3aed', fill: '#f5f3ff', tag: 'Mayor' }; // 1st
    if (rank === 1) return { stroke: '#2563eb', fill: '#eff6ff', tag: 'Medio' }; // 2nd
    return { stroke: '#059669', fill: '#ecfdf5', tag: 'Menor' }; // 3rd
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                Correspondencia Lado ↔ Ángulo
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Arrastra cualquier vértice para comparar
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => applyPreset('escaleno')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Escaleno
              </button>
              <button
                onClick={() => applyPreset('rectangulo')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Rectángulo
              </button>
              <button
                onClick={() => applyPreset('isosceles')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                Isósceles
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
                <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="460" height="330" fill="url(#grid4)" rx="12" />

              {/* Triangle Polygon */}
              <polygon
                points={`${points.A.x},${points.A.y} ${points.B.x},${points.B.y} ${points.C.x},${points.C.y}`}
                fill="#8b5cf6"
                fillOpacity="0.08"
                stroke="#334155"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Sides with visual thickness corresponding to their length */}
              {/* Side c (AB) */}
              <line
                x1={points.A.x}
                y1={points.A.y}
                x2={points.B.x}
                y2={points.B.y}
                stroke={getColorRank('C').stroke}
                strokeWidth={sortedBySide[0].name === 'C' ? 5 : 3}
              />
              {/* Side b (AC) */}
              <line
                x1={points.A.x}
                y1={points.A.y}
                x2={points.C.x}
                y2={points.C.y}
                stroke={getColorRank('B').stroke}
                strokeWidth={sortedBySide[0].name === 'B' ? 5 : 3}
              />
              {/* Side a (BC) */}
              <line
                x1={points.B.x}
                y1={points.B.y}
                x2={points.C.x}
                y2={points.C.y}
                stroke={getColorRank('A').stroke}
                strokeWidth={sortedBySide[0].name === 'A' ? 5 : 3}
              />

              {/* Angle wedges */}
              <path
                d={getAngleWedge(points.C, points.A, points.B, 30)}
                fill={getColorRank('A').stroke}
                fillOpacity="0.3"
                stroke={getColorRank('A').stroke}
                strokeWidth="2"
              />
              <path
                d={getAngleWedge(points.C, points.B, points.A, 30)}
                fill={getColorRank('B').stroke}
                fillOpacity="0.3"
                stroke={getColorRank('B').stroke}
                strokeWidth="2"
              />
              <path
                d={getAngleWedge(points.A, points.C, points.B, 30)}
                fill={getColorRank('C').stroke}
                fillOpacity="0.3"
                stroke={getColorRank('C').stroke}
                strokeWidth="2"
              />

              {/* Angle labels */}
              <text
                x={points.A.x + 18}
                y={points.A.y - 12}
                fill={getColorRank('A').stroke}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                A: {angleA}°
              </text>
              <text
                x={points.B.x - 56}
                y={points.B.y - 12}
                fill={getColorRank('B').stroke}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                B: {angleB}°
              </text>
              <text
                x={points.C.x - 18}
                y={points.C.y + (points.C.y < 120 ? 32 : -14)}
                fill={getColorRank('C').stroke}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                C: {angleC}°
              </text>

              {/* Side length tags */}
              <text
                x={(points.A.x + points.B.x) / 2}
                y={points.A.y + 22}
                textAnchor="middle"
                fill={getColorRank('C').stroke}
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                c = {sideC}
              </text>
              <text
                x={(points.A.x + points.C.x) / 2 - 24}
                y={(points.A.y + points.C.y) / 2}
                textAnchor="middle"
                fill={getColorRank('B').stroke}
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                b = {sideB}
              </text>
              <text
                x={(points.B.x + points.C.x) / 2 + 24}
                y={(points.B.y + points.C.y) / 2}
                textAnchor="middle"
                fill={getColorRank('A').stroke}
                fontSize="13"
                fontWeight="800"
                fontFamily="JetBrains Mono"
              >
                a = {sideA}
              </text>

              {/* Draggable handles */}
              {(['A', 'B', 'C'] as const).map((vert) => {
                const pt = points[vert];
                const isDragging = activeDrag === vert;
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
                      fill={getColorRank(vert).stroke}
                      stroke="#ffffff"
                      strokeWidth="3"
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
            <span className="flex items-center gap-1.5 text-purple-700 font-semibold">
              <Award className="w-4 h-4" />
              Lado mayor: <code className="font-mono-math">{sortedBySide[0].sideName} ({sortedBySide[0].sideVal})</code>
              {' '}opuesto al Ángulo mayor: <code className="font-mono-math">{sortedBySide[0].name} ({sortedBySide[0].angVal}°)</code>
            </span>
          </div>
        </div>

        {/* Live Comparison Table */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Orden de Magnitudes (Lado ⇔ Ángulo Opuesto)
            </h4>

            {/* Ranking cards */}
            <div className="space-y-2.5">
              {sortedBySide.map((item, index) => {
                const badgeTitle = index === 0 ? 'Lado y Ángulo Mayor' : index === 1 ? 'Intermedio' : 'Lado y Ángulo Menor';
                const badgeStyle = index === 0 ? 'bg-purple-50 text-purple-700 border-purple-200' : index === 1 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
                return (
                  <div
                    key={item.name}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${badgeStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white font-bold flex items-center justify-center border text-[11px] shadow-xs">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-800">
                          {badgeTitle}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          Vértice {item.name} se opone al lado {item.sideName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono-math">
                      <div className="font-bold text-slate-900">
                        Lado {item.sideName} = {item.sideVal}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-600">
                        Ángulo {item.name} = {item.angVal}°
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Logical Equivalence Expression */}
            <div className="mt-4 p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs">
              <span className="font-bold text-purple-900 block mb-1">
                Relación Biunívoca Exacta:
              </span>
              <div className="font-mono-math font-bold text-slate-800 text-center py-2 bg-white rounded-lg border border-purple-200 text-sm">
                {sortedBySide[0].sideName} &gt; {sortedBySide[1].sideName} &gt; {sortedBySide[2].sideName}
                <span className="text-purple-600 mx-2">⇔</span>
                {sortedBySide[0].name} &gt; {sortedBySide[1].name} &gt; {sortedBySide[2].name}
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Como <code className="font-mono-math">{sortedBySide[0].sideVal} &gt; {sortedBySide[1].sideVal} &gt; {sortedBySide[2].sideVal}</code>,
                entonces estrictamente <code className="font-mono-math">{sortedBySide[0].angVal}° &gt; {sortedBySide[1].angVal}° &gt; {sortedBySide[2].angVal}°</code>.
              </p>
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Aplicación en Pruebas de Admisión</span>
            </div>
            <p className="leading-relaxed">
              En ejercicios con triángulos superpuestos donde te piden "¿Cuál es el segmento de mayor longitud en toda la figura?",
              aplica este teorema <strong>triángulo por triángulo</strong> analizando los ángulos opuestos. Nunca te fíes solo del dibujo a simple vista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
