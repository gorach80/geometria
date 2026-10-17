import { QuizQuestion } from '../types/theorems';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    theoremId: 1,
    theoremName: 'Suma de Ángulos Internos',
    difficulty: 'Básico',
    question: 'En un triángulo ABC, el ángulo interior en A mide 65° y el ángulo interior en B mide 45°. ¿Cuál es la medida del tercer ángulo interior C?',
    diagramDescription: 'Triángulo con ∠A = 65°, ∠B = 45°, ∠C = ?',
    options: ['60°', '70°', '80°', '90°'],
    correctIndex: 1,
    formulaUsed: 'A + B + C = 180°',
    explanation: [
      'Paso 1: Aplicamos el teorema de la suma de los ángulos internos: A + B + C = 180°.',
      'Paso 2: Sustituimos los valores conocidos: 65° + 45° + C = 180°.',
      'Paso 3: Sumamos los ángulos conocidos: 110° + C = 180°.',
      'Paso 4: Despejamos C: C = 180° - 110° = 70°.'
    ]
  },
  {
    id: 2,
    theoremId: 1,
    theoremName: 'Suma de Ángulos Internos',
    difficulty: 'Intermedio',
    question: 'Los ángulos interiores de un triángulo están en la razón proporcional 2 : 3 : 5. ¿Cuánto mide el ángulo mayor?',
    diagramDescription: 'Ángulos proporcionales: 2x, 3x, 5x',
    options: ['36°', '54°', '90°', '100°'],
    correctIndex: 2,
    formulaUsed: '2x + 3x + 5x = 180°',
    explanation: [
      'Paso 1: Definimos los ángulos en función de una constante x: A = 2x, B = 3x, C = 5x.',
      'Paso 2: Planteamos la suma euclidiana: 2x + 3x + 5x = 180°.',
      'Paso 3: Reducimos términos semejantes: 10x = 180°  ⇒  x = 18°.',
      'Paso 4: Calculamos el ángulo mayor (5x): 5 · (18°) = 90° (¡resulta ser un triángulo rectángulo!).'
    ]
  },
  {
    id: 3,
    theoremId: 2,
    theoremName: 'Ángulo Exterior',
    difficulty: 'Básico',
    question: 'En un triángulo, dos ángulos interiores no adyacentes miden 52° y 68°. ¿Cuál es la medida del ángulo exterior correspondiente al tercer vértice?',
    diagramDescription: 'x exterior con interiores opuestos A = 52° y B = 68°',
    options: ['110°', '120°', '130°', '140°'],
    correctIndex: 1,
    formulaUsed: 'x = A + B',
    explanation: [
      'Paso 1: Por el Teorema del Ángulo Exterior: el ángulo exterior x es igual a la suma de los dos ángulos interiores no adyacentes.',
      'Paso 2: Reemplazamos: x = 52° + 68° = 120°.',
      'Paso 3: Verificación: el interior adyacente mide 180° - 120° = 60°, y 52° + 68° + 60° = 180°.'
    ]
  },
  {
    id: 4,
    theoremId: 2,
    theoremName: 'Ángulo Exterior',
    difficulty: 'Avanzado',
    question: 'En la figura, el ángulo exterior en C mide (5x + 10)°, mientras que los ángulos interiores en A y B miden (2x + 15)° y (x + 25)° respectivamente. Halla el valor de x.',
    diagramDescription: 'Exterior: 5x + 10 = (2x + 15) + (x + 25)',
    options: ['10°', '15°', '20°', '25°'],
    correctIndex: 1,
    formulaUsed: 'x_ext = A + B',
    explanation: [
      'Paso 1: Aplicamos el Teorema del Ángulo Exterior: 5x + 10 = (2x + 15) + (x + 25).',
      'Paso 2: Simplificamos el miembro derecho: 5x + 10 = 3x + 40.',
      'Paso 3: Trasponemos términos semejantes: 5x - 3x = 40 - 10.',
      'Paso 4: 2x = 30  ⇒  x = 15°.'
    ]
  },
  {
    id: 5,
    theoremId: 3,
    theoremName: 'Desigualdad Triangular',
    difficulty: 'Básico',
    question: '¿Cuál de las siguientes ternas de segmentos NO puede formar un triángulo?',
    diagramDescription: 'Comprobación de a + b > c para cada caso',
    options: ['3 cm, 4 cm, 5 cm', '5 cm, 7 cm, 9 cm', '4 cm, 6 cm, 11 cm', '6 cm, 8 cm, 10 cm'],
    correctIndex: 2,
    formulaUsed: 'a + b > c',
    explanation: [
      'Paso 1: Enunciado del teorema: para que exista un triángulo, la suma de los dos lados menores debe ser mayor que el tercer lado.',
      'Paso 2: Evaluamos la opción C (4, 6, 11): 4 + 6 = 10.',
      'Paso 3: Comparamos con el tercer lado: 10 no es mayor que 11 (10 < 11).',
      'Paso 4: Por tanto, los extremos de 4 y 6 no alcanzan a cerrarse sobre 11. ¡No existe triángulo!'
    ]
  },
  {
    id: 6,
    theoremId: 3,
    theoremName: 'Desigualdad Triangular',
    difficulty: 'Intermedio',
    question: 'Dos lados de un triángulo miden 6 cm y 9 cm. Si la longitud del tercer lado x es un número entero de centímetros, ¿cuántos valores posibles puede tomar x?',
    diagramDescription: '|9 - 6| < x < 9 + 6',
    options: ['9 valores', '10 valores', '11 valores', '12 valores'],
    correctIndex: 2,
    formulaUsed: '|b - c| < a < b + c',
    explanation: [
      'Paso 1: Aplicamos la propiedad de existencia de triángulos: |9 - 6| < x < 9 + 6.',
      'Paso 2: Desarrollamos el intervalo: 3 < x < 15.',
      'Paso 3: Los valores enteros posibles son: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14.',
      'Paso 4: Contamos los valores enteros: 14 - 4 + 1 = 11 valores posibles.'
    ]
  },
  {
    id: 7,
    theoremId: 4,
    theoremName: 'Lado Mayor y Ángulo Mayor',
    difficulty: 'Básico',
    question: 'En un triángulo ABC se sabe que ∠A = 40° y ∠B = 85°. ¿Cuál es el lado de mayor longitud del triángulo?',
    diagramDescription: 'Triángulo con ∠A = 40°, ∠B = 85°, ∠C = ?',
    options: ['Lado a (opuesto a A)', 'Lado b (opuesto a B)', 'Lado c (opuesto a C)', 'Los lados b y c son iguales'],
    correctIndex: 1,
    formulaUsed: 'Mayor ángulo ⇔ Mayor lado opuesto',
    explanation: [
      'Paso 1: Hallamos el ángulo C: C = 180° - (40° + 85°) = 180° - 125° = 55°.',
      'Paso 2: Comparamos los ángulos: 85° (B) > 55° (C) > 40° (A).',
      'Paso 3: Aplicamos el teorema: al ángulo mayor le corresponde el lado opuesto mayor.',
      'Paso 4: El ángulo mayor es ∠B = 85°, por lo que el lado opuesto b (o AC) es el lado mayor.'
    ]
  },
  {
    id: 8,
    theoremId: 4,
    theoremName: 'Lado Mayor y Ángulo Mayor',
    difficulty: 'Intermedio',
    question: 'Un triángulo tiene lados de medidas a = 14 cm, b = 10 cm y c = 8 cm. Si ordenamos sus ángulos interiores de menor a mayor, ¿cuál es el orden correcto?',
    diagramDescription: 'Lados: c=8 < b=10 < a=14',
    options: ['A < B < C', 'C < B < A', 'B < C < A', 'C < A < B'],
    correctIndex: 1,
    formulaUsed: 'c < b < a  ⇔  C < B < A',
    explanation: [
      'Paso 1: Ordenamos las longitudes de los lados de menor a mayor: c (8) < b (10) < a (14).',
      'Paso 2: Por el Teorema del Lado Mayor y Ángulo Mayor: al menor lado se opone el menor ángulo, y al mayor lado se opone el mayor ángulo.',
      'Paso 3: En consecuencia: C < B < A.'
    ]
  },
  {
    id: 9,
    theoremId: 5,
    theoremName: 'Teorema de la Mediatriz',
    difficulty: 'Básico',
    question: 'En un triángulo, la recta L es la mediatriz del lado AB. Si P es un punto sobre dicha recta y la distancia PA = 12 cm, ¿cuánto mide la distancia PB?',
    diagramDescription: 'P en la mediatriz de AB con PA = 12 cm',
    options: ['6 cm', '12 cm', '24 cm', 'No se puede determinar sin el ángulo'],
    correctIndex: 1,
    formulaUsed: 'P ∈ mediatriz(AB)  ⇒  PA = PB',
    explanation: [
      'Paso 1: Recordamos la definición y teorema: todo punto de la mediatriz de un segmento equidista de sus extremos.',
      'Paso 2: Dado que P pertenece a la mediatriz de AB, por teorema: PA = PB.',
      'Paso 3: Como PA = 12 cm, directamente PB = 12 cm.'
    ]
  },
  {
    id: 10,
    theoremId: 5,
    theoremName: 'Teorema de la Mediatriz',
    difficulty: 'Intermedio',
    question: 'En un triángulo ABC, la mediatriz del lado AC corta al lado BC en el punto P. Si ∠C = 35° y ∠B = 75°, ¿cuánto mide el ángulo ∠PAB?',
    diagramDescription: 'ΔPAC isósceles con PA = PC, hallar ∠PAB',
    options: ['35°', '40°', '30°', '45°'],
    correctIndex: 0,
    formulaUsed: 'ΔPAC es isósceles con PA = PC ⇒ ∠PAC = ∠C = 35°',
    explanation: [
      'Paso 1: Hallamos el ángulo total ∠A del triángulo ABC: ∠A = 180° - (75° + 35°) = 70°.',
      'Paso 2: Dado que P está en la mediatriz de AC, PA = PC. Por lo tanto, el triángulo ΔPAC es isósceles con base AC.',
      'Paso 3: En el triángulo isósceles ΔPAC, los ángulos en la base son iguales: ∠PAC = ∠C = 35°.',
      'Paso 4: Por suma de ángulos adyacentes: ∠PAB = ∠A_total - ∠PAC = 70° - 35° = 35°.'
    ]
  },
  {
    id: 11,
    theoremId: 6,
    theoremName: 'Bisectriz Interior',
    difficulty: 'Básico',
    question: 'En un triángulo ABC, AD es la bisectriz interior del ángulo A. Si los lados adyacentes miden AB = 9 cm y AC = 6 cm, y el segmento BD = 6 cm, ¿cuánto mide el segmento DC (n)?',
    diagramDescription: 'AB = 9, AC = 6, BD = 6, DC = n',
    options: ['3 cm', '4 cm', '4.5 cm', '5 cm'],
    correctIndex: 1,
    formulaUsed: 'BD / DC = AB / AC  ⇒  m / n = c / b',
    explanation: [
      'Paso 1: Planteamos el Teorema de la Bisectriz Interior: BD / DC = AB / AC.',
      'Paso 2: Sustituimos los datos conocidos: 6 / n = 9 / 6.',
      'Paso 3: Multiplicamos en cruz: 9 · n = 6 · 6  ⇒  9n = 36.',
      'Paso 4: Despejamos n: n = 36 / 9 = 4 cm.'
    ]
  },
  {
    id: 12,
    theoremId: 6,
    theoremName: 'Bisectriz Interior',
    difficulty: 'Intermedio',
    question: 'En un triángulo ABC, AB = 10 y AC = 15. Si el lado opuesto BC mide 20 y se traza la bisectriz interior AD (con D sobre BC), ¿cuánto mide el segmento menor determinado sobre BC?',
    diagramDescription: 'c = 10, b = 15, m + n = 20',
    options: ['6', '8', '10', '12'],
    correctIndex: 1,
    formulaUsed: 'm / n = 10 / 15 = 2 / 3  con  m + n = 20',
    explanation: [
      'Paso 1: Por el Teorema de la Bisectriz: m / n = c / b = 10 / 15 = 2 / 3.',
      'Paso 2: Expresamos los segmentos con una constante k: m = 2k, n = 3k.',
      'Paso 3: Dado que D está en BC: m + n = BC  ⇒  2k + 3k = 20  ⇒  5k = 20  ⇒  k = 4.',
      'Paso 4: Calculamos los segmentos: m = 2(4) = 8 y n = 3(4) = 12. El segmento menor mide 8.'
    ]
  }
];
