import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-500 text-xs py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="font-semibold text-slate-800">
            Teoremas de Triángulos · Aplicación Didáctica Interactiva
          </span>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Desarrollado para estudiantes del Preuniversitario y Nivelación de la UPSE (Universidad Estatal Península de Santa Elena).
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span>Geometría Plana y Trigonometría</span>
          <span aria-hidden="true">·</span>
          <span>Ecuador</span>
        </div>
      </div>
    </footer>
  );
};
