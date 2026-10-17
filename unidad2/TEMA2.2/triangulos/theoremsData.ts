import { TheoremItem } from '../types/theorems';

export const THEOREMS_DATA: TheoremItem[] = [
  {
    id: 1,
    badgeNumber: 1,
    title: 'TEOREMA DE LA SUMA DE LOS ÁNGULOS INTERNOS',
    shortTitle: 'Suma de Ángulos Internos',
    themeColor: {
      bg: 'bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-700',
      accent: '#2563EB',
      badgeBg: 'bg-blue-600 text-white',
      softBg: 'bg-blue-50 border-blue-200'
    },
    statement: 'La suma de los ángulos internos de cualquier triángulo es 180°.',
    formula: ['A + B + C = 180°'],
    explanation: 'En geometría euclidiana, si sumas los tres ángulos que se forman en los vértices interiores de cualquier triángulo (acutángulo, rectángulo u obtusángulo), el resultado siempre será un ángulo llano (180° o π radianes).',
    upseKeyAdvice: 'En los exámenes de admisión UPSE, si conoces 2 ángulos de un triángulo o te dan relaciones algebraicas (ej: A = 2x, B = 3x, C = 5x), plantea la ecuación igualada a 180° para despejar x rápidamente.',
    formulaLabels: [
      { label: 'A, B, C', meaning: 'Medidas de los ángulos interiores del triángulo en grados sexagesimales' },
      { label: '180°', meaning: 'Constante euclidiana universal equivalente a media vuelta (ángulo llano)' }
    ],
    properties: [
      'Válido para todo tipo de triángulo en el plano.',
      'En un triángulo rectángulo, los dos ángulos agudos son complementarios (suman 90°).',
      'En un triángulo equilátero, cada ángulo interior mide exactamente 60° (180° / 3).'
    ]
  },
  {
    id: 2,
    badgeNumber: 2,
    title: 'TEOREMA DEL ÁNGULO EXTERIOR',
    shortTitle: 'Ángulo Exterior',
    themeColor: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-500',
      text: 'text-emerald-700',
      accent: '#059669',
      badgeBg: 'bg-emerald-600 text-white',
      softBg: 'bg-emerald-50 border-emerald-200'
    },
    statement: 'Un ángulo exterior de un triángulo es igual a la suma de los dos ángulos internos no adyacentes.',
    formula: ['x = A + B'],
    explanation: 'Al prolongar uno de los lados de un triángulo, el ángulo exterior formado con el lado consecutivo es suplementario con el ángulo interno adyacente. Como los 3 internos suman 180°, el ángulo exterior equivale exactamente a la suma de los otros dos ángulos interiores que no están a su lado.',
    upseKeyAdvice: 'Este teorema ahorra valiosos minutos en la prueba: en lugar de calcular primero el tercer ángulo interior y luego restarlo de 180°, suma directamente los dos opuestos: x = A + B.',
    formulaLabels: [
      { label: 'x', meaning: 'Medida del ángulo exterior en un vértice' },
      { label: 'A, B', meaning: 'Ángulos interiores opuestos (no adyacentes al vértice del ángulo exterior)' }
    ],
    properties: [
      'Un ángulo exterior siempre es estrictamente mayor que cualquiera de los dos ángulos interiores no adyacentes (x > A y x > B).',
      'La suma de los tres ángulos exteriores (uno por vértice) de cualquier triángulo siempre es 360°.',
      'El ángulo interior adyacente C y el exterior x forman un par lineal: C + x = 180°.'
    ]
  },
  {
    id: 3,
    badgeNumber: 3,
    title: 'TEOREMA DE LA DESIGUALDAD TRIANGULAR',
    shortTitle: 'Desigualdad Triangular (Existencia)',
    themeColor: {
      bg: 'bg-amber-600',
      border: 'border-amber-500',
      text: 'text-amber-700',
      accent: '#D97706',
      badgeBg: 'bg-amber-600 text-white',
      softBg: 'bg-amber-50 border-amber-200'
    },
    statement: 'En todo triángulo, la suma de las longitudes de dos lados cualesquiera es mayor que la longitud del tercer lado.',
    formula: [
      'a + b > c',
      'a + c > b',
      'b + c > a'
    ],
    explanation: 'Para que tres segmentos puedan unirse y formar una figura cerrada (triángulo), ninguno de ellos puede ser tan largo que supere o iguale a la suma de los otros dos. De forma compacta: |b - c| < a < b + c (Propiedad de Existencia de Triángulos).',
    upseKeyAdvice: 'Pregunta clásica de admisión: "¿Cuáles de las siguientes ternas pueden formar un triángulo?". Verifica si la suma de los dos lados más cortos es ESTRICTAMENTE MAYOR que el lado mayor. Si es menor o igual, NO existe el triángulo.',
    formulaLabels: [
      { label: 'a, b, c', meaning: 'Longitudes de los tres lados del triángulo' },
      { label: '|b - c| < a < b + c', meaning: 'Teorema de existencia: cualquier lado debe estar comprendido entre la diferencia positiva y la suma de los otros dos' }
    ],
    properties: [
      'Si a + b = c, los segmentos se superponen formando una línea recta colapsada (triángulo degenerado).',
      'Si a + b < c, los extremos nunca logran tocarse.',
      'Permite hallar el rango de posibles valores enteros que puede tomar un lado desconocido.'
    ]
  },
  {
    id: 4,
    badgeNumber: 4,
    title: 'TEOREMA DEL LADO MAYOR Y ÁNGULO MAYOR',
    shortTitle: 'Lado Mayor y Ángulo Mayor',
    themeColor: {
      bg: 'bg-purple-600',
      border: 'border-purple-500',
      text: 'text-purple-700',
      accent: '#7C3AED',
      badgeBg: 'bg-purple-600 text-white',
      softBg: 'bg-purple-50 border-purple-200'
    },
    statement: 'En todo triángulo, al lado mayor se opone el ángulo mayor y viceversa.',
    formula: [
      'a > b ⇔ A > B',
      'a > c ⇔ A > C',
      'b > c ⇔ B > C'
    ],
    explanation: 'Existe una correspondencia biunívoca en el orden de magnitud: la abertura más grande siempre "mira" hacia el lado más largo, y la abertura más pequeña "mira" hacia el lado más corto. Si dos lados son iguales, sus ángulos opuestos también son iguales (triángulo isósceles).',
    upseKeyAdvice: 'Si te piden ordenar los lados a, b, c de menor a mayor a partir de sus ángulos o viceversa, primero halla todos los ángulos con la suma de 180° y luego aplica la relación directa: menor ángulo ↔ menor lado opuesto.',
    formulaLabels: [
      { label: 'a, b, c', meaning: 'Longitudes de los lados' },
      { label: 'A, B, C', meaning: 'Ángulos opuestos a los lados a, b, c respectivamente' },
      { label: '⇔', meaning: 'Doble implicación lógica: se cumple en ambos sentidos (si y solo si)' }
    ],
    properties: [
      'En un triángulo rectángulo, la hipotenusa siempre es el lado mayor porque se opone al ángulo recto de 90°.',
      'En un triángulo obtusángulo, el lado opuesto al ángulo obtuso (> 90°) es estrictamente el más largo.',
      'Lados iguales se oponen a ángulos iguales: a = b ⇔ A = B.'
    ]
  },
  {
    id: 5,
    badgeNumber: 5,
    title: 'TEOREMA DE LA MEDIATRIZ',
    shortTitle: 'Teorema de la Mediatriz',
    themeColor: {
      bg: 'bg-rose-600',
      border: 'border-rose-500',
      text: 'text-rose-700',
      accent: '#E11D48',
      badgeBg: 'bg-rose-600 text-white',
      softBg: 'bg-rose-50 border-rose-200'
    },
    statement: 'Todo punto de la mediatriz de un lado de un triángulo es equidistante de los extremos de dicho lado.',
    formula: ['Si P está en la mediatriz de AB, entonces: PA = PB'],
    explanation: 'La mediatriz de un segmento es la recta perpendicular trazada exactamente por su punto medio M. Al tomar cualquier punto P sobre esta recta y unirlo con los vértices A y B, se forman dos triángulos congruentes (por criterio LAL: AM = MB, ángulo recto compartido, y lado PM común), por lo que siempre PA = PB.',
    upseKeyAdvice: '¡Propiedad clave en problemas de trazos auxiliares! Cuando veas una mediatriz que interseca a un lado, une el punto P con el otro extremo para formar inmediatamente un triángulo isósceles ΔPAB donde los lados PA y PB son iguales y los ángulos en la base son congruentes.',
    formulaLabels: [
      { label: 'M', meaning: 'Punto medio del segmento base AB (AM = MB)' },
      { label: 'P', meaning: 'Cualquier punto ubicado sobre la recta mediatriz perpendicular a AB' },
      { label: 'PA = PB', meaning: 'Las distancias desde P hacia A y hacia B son exactamente iguales' }
    ],
    properties: [
      'El triángulo ΔPAB resultante siempre es un triángulo isósceles con base AB.',
      'El segmento PM es a la vez mediatriz, altura, mediana y bisectriz del ángulo ∠APB.',
      'Las tres mediatrices de un triángulo concurren en un punto notable llamado Circuncentro (centro de la circunferencia circunscrita).'
    ]
  },
  {
    id: 6,
    badgeNumber: 6,
    title: 'TEOREMA DE LA BISECTRIZ INTERIOR',
    shortTitle: 'Bisectriz Interior',
    themeColor: {
      bg: 'bg-teal-600',
      border: 'border-teal-500',
      text: 'text-teal-700',
      accent: '#0D9488',
      badgeBg: 'bg-teal-600 text-white',
      softBg: 'bg-teal-50 border-teal-200'
    },
    statement: 'La bisectriz de un ángulo interior de un triángulo divide al lado opuesto en segmentos proporcionales a los lados adyacentes.',
    formula: [
      'BD / DC = AB / AC',
      'm / n = c / b'
    ],
    explanation: 'Si desde el vértice A se traza la bisectriz interior que corta al lado opuesto BC en el punto D, dicho punto divide al lado en dos segmentos m (BD) y n (DC). La proporción entre estos dos segmentos es idéntica a la proporción entre los lados adyacentes c (AB) y b (AC). En producto cruzado: m · b = n · c.',
    upseKeyAdvice: 'Frecuente en geometría de la UPSE: te dan tres medidas (por ejemplo c = 12, b = 8, m = 6) y te piden hallar n (o el lado total BC = m + n). Aplica la regla de tres o producto cruzado: n = (m · b) / c.',
    formulaLabels: [
      { label: 'c, b', meaning: 'Longitudes de los lados adyacentes al vértice bisecado (c = AB, b = AC)' },
      { label: 'm, n', meaning: 'Segmentos determinados sobre el lado opuesto por la bisectriz (m = BD, n = DC)' },
      { label: 'm / n = c / b', meaning: 'Razón de proporcionalidad directa entre segmentos y lados' }
    ],
    properties: [
      'Las tres bisectrices interiores de un triángulo concurren en el Incentro (centro de la circunferencia inscrita).',
      'Si el triángulo es isósceles con AB = AC, entonces m = n y la bisectriz coincide con la mediana y la altura.',
      'También existe el teorema para la bisectriz exterior con relación análoga.'
    ]
  }
];
