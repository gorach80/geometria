import React from 'react';
import { THEOREMS_DATA } from '../data/theoremsData';
import { TheoremId } from '../types/theorems';
import { Sparkles, ArrowRight, Printer, Star } from 'lucide-react';

interface PosterInfographicProps {
  onSelectTheorem: (id: TheoremId) => void;
}

export const PosterInfographic: React.FC<PosterInfographicProps> = ({ onSelectTheorem }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner mirroring the poster title style */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                UPSE · Universidad Estatal Península de Santa Elena
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading uppercase text-white drop-shadow-sm">
              TEOREMAS DE TRIÁNGULOS
            </h2>
            <p className="mt-2 text-indigo-100 text-sm md:text-base leading-relaxed">
              Guía didáctica fundamental de geometría plana para estudiantes de curso de nivelación y preuniversitario.
              Haz clic en cualquiera de las 6 fichas para abrir su <strong>simulador interactivo</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl border border-white/20 transition backdrop-blur-xs"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ficha</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Theorem Cards Grid (Faithful to the 2x3 poster layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Suma de Ángulos Internos */}
        <div
          onClick={() => onSelectTheorem(1)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-blue-500 hover:border-blue-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                1
              </span>
              <div className="bg-blue-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DE LA SUMA DE LOS ÁNGULOS INTERNOS
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              La suma de los ángulos internos de cualquier triángulo es <strong>180°</strong>.
            </p>

            {/* Formula Tag */}
            <div className="inline-block bg-blue-50 border border-blue-200 text-blue-900 font-bold font-mono-math text-sm px-3 py-1 rounded-lg mb-4">
              <span className="text-red-600">A</span> + <span className="text-emerald-600">B</span> + <span className="text-blue-600">C</span> = 180°
            </div>

            {/* SVG Diagram */}
            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full max-h-40">
                {/* Angle Arcs */}
                <path d="M 50 130 A 18 18 0 0 0 65 118 L 50 130 Z" fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M 190 130 A 18 18 0 0 1 175 118 L 190 130 Z" fill="#16a34a" fillOpacity="0.4" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M 120 30 A 18 18 0 0 0 110 46 L 120 30 Z" fill="#2563eb" fillOpacity="0.4" stroke="#2563eb" strokeWidth="1.5" />
                {/* Triangle */}
                <polygon points="50,130 190,130 120,30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Vertices */}
                <text x="36" y="140" fill="#dc2626" fontSize="13" fontWeight="800">A</text>
                <text x="196" y="140" fill="#16a34a" fontSize="13" fontWeight="800">B</text>
                <text x="116" y="20" fill="#2563eb" fontSize="13" fontWeight="800">C</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Ángulo Exterior */}
        <div
          onClick={() => onSelectTheorem(2)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-emerald-500 hover:border-emerald-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                2
              </span>
              <div className="bg-emerald-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DEL ÁNGULO EXTERIOR
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              Un ángulo exterior de un triángulo es igual a la suma de los dos ángulos internos no adyacentes.
            </p>

            <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold font-mono-math text-sm px-3 py-1 rounded-lg mb-4">
              <span className="text-sky-600">x</span> = <span className="text-red-600">A</span> + <span className="text-emerald-600">B</span>
            </div>

            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 250 160" className="w-full h-full max-h-40">
                {/* Extended ray CD */}
                <line x1="160" y1="130" x2="230" y2="130" stroke="#1e293b" strokeWidth="2.5" />
                <polygon points="230,126 238,130 230,134" fill="#1e293b" />
                {/* Angle wedges */}
                <path d="M 50 130 A 18 18 0 0 0 66 118 L 50 130 Z" fill="#16a34a" fillOpacity="0.4" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M 130 30 A 18 18 0 0 0 120 46 L 130 30 Z" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
                {/* Exterior x arc */}
                <path d="M 160 130 A 20 20 0 0 1 180 130 L 160 130 Z" fill="#0284c7" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" />
                {/* Triangle */}
                <polygon points="50,130 160,130 130,30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Vertices */}
                <text x="40" y="144" fill="#16a34a" fontSize="13" fontWeight="800">B</text>
                <text x="156" y="144" fill="#0f172a" fontSize="13" fontWeight="800">C</text>
                <text x="228" y="144" fill="#64748b" fontSize="13" fontWeight="800">D</text>
                <text x="126" y="20" fill="#ef4444" fontSize="13" fontWeight="800">A</text>
                <text x="174" y="120" fill="#0284c7" fontSize="14" fontWeight="800">x</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Desigualdad Triangular */}
        <div
          onClick={() => onSelectTheorem(3)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-amber-500 hover:border-amber-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-amber-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                3
              </span>
              <div className="bg-amber-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DE LA DESIGUALDAD TRIANGULAR
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              En todo triángulo, la suma de las longitudes de dos lados cualesquiera es mayor que la longitud del tercer lado.
            </p>

            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="bg-amber-50 border border-amber-200 text-amber-900 font-bold font-mono-math text-xs px-2.5 py-0.5 rounded-md">
                <span className="text-red-600">a</span> + <span className="text-blue-600">b</span> &gt; <span className="text-emerald-600">c</span>
              </span>
              <span className="bg-amber-50 border border-amber-200 text-amber-900 font-bold font-mono-math text-xs px-2.5 py-0.5 rounded-md">
                <span className="text-red-600">a</span> + <span className="text-emerald-600">c</span> &gt; <span className="text-blue-600">b</span>
              </span>
              <span className="bg-amber-50 border border-amber-200 text-amber-900 font-bold font-mono-math text-xs px-2.5 py-0.5 rounded-md">
                <span className="text-blue-600">b</span> + <span className="text-emerald-600">c</span> &gt; <span className="text-red-600">a</span>
              </span>
            </div>

            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full max-h-40">
                <polygon points="50,130 190,130 120,30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <text x="36" y="140" fill="#0f172a" fontSize="13" fontWeight="800">A</text>
                <text x="196" y="140" fill="#0f172a" fontSize="13" fontWeight="800">B</text>
                <text x="116" y="20" fill="#0f172a" fontSize="13" fontWeight="800">C</text>
                <text x="75" y="75" fill="#2563eb" fontSize="13" fontWeight="800" fontStyle="italic">b</text>
                <text x="160" y="75" fill="#dc2626" fontSize="13" fontWeight="800" fontStyle="italic">a</text>
                <text x="118" y="144" fill="#059669" fontSize="13" fontWeight="800" fontStyle="italic">c</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Lado Mayor y Ángulo Mayor */}
        <div
          onClick={() => onSelectTheorem(4)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-purple-500 hover:border-purple-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                4
              </span>
              <div className="bg-purple-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DEL LADO MAYOR Y ÁNGULO MAYOR
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              En todo triángulo, al lado mayor se opone el ángulo mayor y viceversa.
            </p>

            <div className="flex items-center gap-2 flex-wrap mb-4 font-mono-math text-xs font-bold text-purple-900">
              <span className="bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                <span className="text-red-600">a</span> &gt; <span className="text-blue-600">b</span> ⇔ <span className="text-red-600">A</span> &gt; <span className="text-blue-600">B</span>
              </span>
              <span className="bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                <span className="text-red-600">a</span> &gt; <span className="text-emerald-600">c</span> ⇔ <span className="text-red-600">A</span> &gt; <span className="text-emerald-600">C</span>
              </span>
              <span className="bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                <span className="text-blue-600">b</span> &gt; <span className="text-emerald-600">c</span> ⇔ <span className="text-blue-600">B</span> &gt; <span className="text-emerald-600">C</span>
              </span>
            </div>

            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full max-h-40">
                {/* Triangle with noticeable different angles */}
                <path d="M 40 130 A 24 24 0 0 0 60 114 L 40 130 Z" fill="#dc2626" fillOpacity="0.4" stroke="#dc2626" />
                <path d="M 200 130 A 24 24 0 0 1 185 110 L 200 130 Z" fill="#2563eb" fillOpacity="0.4" stroke="#2563eb" />
                <path d="M 110 50 A 20 20 0 0 0 100 66 L 110 50 Z" fill="#16a34a" fillOpacity="0.4" stroke="#16a34a" />
                <polygon points="40,130 200,130 110,50" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <text x="26" y="140" fill="#0f172a" fontSize="13" fontWeight="800">A</text>
                <text x="206" y="140" fill="#0f172a" fontSize="13" fontWeight="800">B</text>
                <text x="106" y="40" fill="#0f172a" fontSize="13" fontWeight="800">C</text>
                <text x="68" y="85" fill="#2563eb" fontSize="13" fontWeight="800" fontStyle="italic">b</text>
                <text x="160" y="85" fill="#dc2626" fontSize="13" fontWeight="800" fontStyle="italic">a</text>
                <text x="120" y="144" fill="#16a34a" fontSize="13" fontWeight="800" fontStyle="italic">c</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 5: Teorema de la Mediatriz */}
        <div
          onClick={() => onSelectTheorem(5)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-rose-500 hover:border-rose-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                5
              </span>
              <div className="bg-rose-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DE LA MEDIATRIZ
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              Todo punto de la mediatriz de un lado de un triángulo es equidistante de los extremos de dicho lado.
            </p>

            <div className="inline-block bg-rose-50 border border-rose-200 text-rose-900 font-bold font-mono-math text-sm px-3 py-1 rounded-lg mb-4">
              Si P está en la mediatriz de AB, entonces: <span className="text-rose-700">PA = PB</span>
            </div>

            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full max-h-40">
                {/* Triangle */}
                <polygon points="50,130 190,130 120,30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Mediatrix Line */}
                <line x1="120" y1="130" x2="120" y2="20" stroke="#e11d48" strokeWidth="2" strokeDasharray="4,3" />
                {/* Right angle at M */}
                <rect x="112" y="122" width="8" height="8" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                {/* Point P */}
                <circle cx="120" cy="75" r="4" fill="#e11d48" />
                {/* Segments PA and PB */}
                <line x1="120" y1="75" x2="50" y2="130" stroke="#e11d48" strokeWidth="1.5" />
                <line x1="120" y1="75" x2="190" y2="130" stroke="#e11d48" strokeWidth="1.5" />
                {/* Equal tick marks */}
                <text x="80" y="98" fill="#e11d48" fontSize="12" fontWeight="700">∥</text>
                <text x="150" y="98" fill="#e11d48" fontSize="12" fontWeight="700">∥</text>
                <text x="82" y="138" fill="#0f172a" fontSize="11" fontWeight="700">|</text>
                <text x="152" y="138" fill="#0f172a" fontSize="11" fontWeight="700">|</text>
                {/* Labels */}
                <text x="36" y="140" fill="#0f172a" fontSize="13" fontWeight="800">A</text>
                <text x="196" y="140" fill="#0f172a" fontSize="13" fontWeight="800">B</text>
                <text x="116" y="20" fill="#0f172a" fontSize="13" fontWeight="800">C</text>
                <text x="126" y="78" fill="#e11d48" fontSize="12" fontWeight="800">P</text>
                <text x="116" y="146" fill="#0f172a" fontSize="12" fontWeight="800">M</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 6: Teorema de la Bisectriz Interior */}
        <div
          onClick={() => onSelectTheorem(6)}
          className="group cursor-pointer bg-white rounded-2xl border-2 border-teal-500 hover:border-teal-600 transition shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                6
              </span>
              <div className="bg-teal-600 text-white font-bold text-xs md:text-sm px-3 py-1.5 rounded-lg uppercase tracking-wide">
                TEOREMA DE LA BISECTRIZ INTERIOR
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-medium mb-3">
              La bisectriz de un ángulo interior de un triángulo divide al lado opuesto en segmentos proporcionales a los lados adyacentes.
            </p>

            <div className="flex items-center gap-4 mb-4 font-mono-math text-xs font-bold text-teal-900">
              <div className="bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg">
                <span className="border-b border-slate-400 pb-0.5 inline-block">BD</span> / DC = <span className="border-b border-slate-400 pb-0.5 inline-block">AB</span> / AC
              </div>
              <div className="bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg text-emerald-800">
                <span className="border-b border-slate-400 pb-0.5 inline-block">m</span> / n = <span className="border-b border-slate-400 pb-0.5 inline-block">c</span> / b
              </div>
            </div>

            <div className="w-full h-44 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full max-h-40">
                {/* Angle arcs at A */}
                <path d="M 120 40 A 16 16 0 0 0 110 50 L 120 40 Z" fill="#14b8a6" fillOpacity="0.5" />
                <path d="M 120 40 A 16 16 0 0 1 130 50 L 120 40 Z" fill="#14b8a6" fillOpacity="0.5" />
                {/* Triangle */}
                <polygon points="40,130 200,130 120,40" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Bisector AD */}
                <line x1="120" y1="40" x2="110" y2="130" stroke="#0d9488" strokeWidth="2" strokeDasharray="4,3" />
                {/* Labels */}
                <text x="116" y="30" fill="#0f172a" fontSize="13" fontWeight="800">A</text>
                <text x="26" y="140" fill="#0f172a" fontSize="13" fontWeight="800">B</text>
                <text x="206" y="140" fill="#0f172a" fontSize="13" fontWeight="800">C</text>
                <text x="106" y="145" fill="#0d9488" fontSize="12" fontWeight="800">D</text>
                <text x="70" y="80" fill="#2563eb" fontSize="13" fontWeight="800" fontStyle="italic">c</text>
                <text x="165" y="80" fill="#dc2626" fontSize="13" fontWeight="800" fontStyle="italic">b</text>
                <text x="70" y="144" fill="#2563eb" fontSize="12" fontWeight="800" fontStyle="italic">m</text>
                <text x="150" y="144" fill="#dc2626" fontSize="12" fontWeight="800" fontStyle="italic">n</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold mt-4">
            <span>Abrir Simulador Dinámico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Faithful Bottom "¡RECUERDA!" banner from the poster */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-xs">
          <Star className="w-7 h-7 fill-amber-300 text-amber-950" />
        </div>
        <div className="flex-1">
          <div className="text-amber-950 font-black text-sm uppercase tracking-wider mb-0.5">
            ¡RECUERDA!
          </div>
          <p className="text-amber-900 text-xs md:text-sm font-medium leading-relaxed">
            Estos teoremas son fundamentales para <strong>demostrar propiedades</strong> y <strong>resolver problemas de geometría</strong> en los exámenes de admisión y nivelación de la UPSE.
          </p>
        </div>
        <div className="text-xs text-amber-800 font-semibold bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200">
          Geometría Plana · Pre-UPSE
        </div>
      </div>
    </div>
  );
};
