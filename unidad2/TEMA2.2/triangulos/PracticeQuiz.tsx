import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion, TheoremId } from '../types/theorems';
import { CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeQuiz: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TheoremId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qId: number]: boolean }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filtered list
  const questions: QuizQuestion[] = selectedCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.theoremId === selectedCategory);

  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  const currentAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = isAnswered && currentAnswer === currentQ?.correctIndex;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index
    }));
    setShowExplanation((prev) => ({
      ...prev,
      [currentQ.id]: true
    }));

    if (index === currentQ.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
    setQuizFinished(false);
  };

  // Score calculation
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              Banco de Preguntas Preuniversitario UPSE
            </span>
            <span className="text-xs text-slate-500">Curso de Admisión & Nivelación</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Simulador de Examen de Teoremas de Triángulos
          </h3>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentIndex(0);
              setQuizFinished(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({QUIZ_QUESTIONS.length})
          </button>
          {([1, 2, 3, 4, 5, 6] as TheoremId[]).map((tId) => (
            <button
              key={tId}
              onClick={() => {
                setSelectedCategory(tId);
                setCurrentIndex(0);
                setQuizFinished(false);
              }}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                selectedCategory === tId
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Teorema {tId}
            </button>
          ))}
        </div>
      </div>

      {!quizFinished && currentQ ? (
        <div className="mt-6">
          {/* Progress bar and counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>
              Pregunta <strong className="text-slate-900 font-mono-math">{currentIndex + 1}</strong> de{' '}
              <strong className="text-slate-900 font-mono-math">{totalQuestions}</strong>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium">
                Dificultad: <strong className="text-amber-700">{currentQ.difficulty}</strong>
              </span>
              <span className="text-emerald-700 font-semibold font-mono-math">
                Aciertos: {correctCount} / {totalAnswered}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-700 font-mono-math">
                Teorema {currentQ.theoremId}: {currentQ.theoremName}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>
            {currentQ.diagramDescription && (
              <div className="mt-2 text-xs font-mono-math text-slate-500 bg-white/80 p-2 rounded-lg border border-slate-200 inline-block">
                📐 Datos: {currentQ.diagramDescription}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = currentAnswer === idx;
              const isOptionCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                } else {
                  btnStyle = 'bg-white border-slate-200 opacity-60 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition text-sm font-medium ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 font-mono-math shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation accordion */}
          {showExplanation[currentQ.id] && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Resolución Paso a Paso (Criterio UPSE)</span>
                </div>
                <span className="text-xs font-mono-math text-blue-800 font-semibold bg-white px-2 py-0.5 rounded border border-blue-200">
                  Fórmula: {currentQ.formulaUsed}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                {currentQ.explanation.map((step, sIdx) => (
                  <p key={sIdx} className="leading-relaxed font-mono-math text-[12px]">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              Anterior
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar
              </button>
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-40 transition shadow-sm"
              >
                <span>{currentIndex === totalQuestions - 1 ? 'Finalizar Examen' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="mt-8 text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-300">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-2">
            ¡Evaluación Completada!
          </h4>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            Has respondido todas las preguntas de teoremas de triángulos preparadas para el preuniversitario UPSE.
          </p>

          {/* Score Card */}
          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
            <div className="text-4xl font-extrabold text-slate-900 font-mono-math mb-1">
              {scorePercent}%
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {correctCount} correctas de {totalQuestions} preguntas
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                scorePercent >= 80
                  ? 'bg-emerald-100 text-emerald-800'
                  : scorePercent >= 60
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {scorePercent >= 80 ? '¡Excelente Nivel! Listo para la Admisión UPSE' : scorePercent >= 60 ? 'Buen avance, repasa los teoremas débiles' : 'Se recomienda repasar los simuladores'}
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition inline-flex items-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Intentar nuevamente</span>
          </button>
        </div>
      )}
    </div>
  );
};
