export type TheoremId = 1 | 2 | 3 | 4 | 5 | 6;

export interface TheoremItem {
  id: TheoremId;
  badgeNumber: number;
  title: string;
  shortTitle: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
    softBg: string;
  };
  statement: string;
  formula: string[];
  explanation: string;
  upseKeyAdvice: string;
  formulaLabels: { label: string; meaning: string }[];
  properties: string[];
}

export interface QuizQuestion {
  id: number;
  theoremId: TheoremId;
  theoremName: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  question: string;
  diagramDescription?: string;
  options: string[];
  correctIndex: number;
  explanation: string[];
  formulaUsed: string;
}
