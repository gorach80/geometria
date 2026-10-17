export interface Point {
  x: number;
  y: number;
}

export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Calculates the internal angle at vertex B formed by rays BA and BC in degrees (0 to 180)
 */
export function calculateAngle(A: Point, B: Point, C: Point): number {
  const v1 = { x: A.x - B.x, y: A.y - B.y };
  const v2 = { x: C.x - B.x, y: C.y - B.y };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.hypot(v1.x, v1.y);
  const mag2 = Math.hypot(v2.x, v2.y);

  if (mag1 === 0 || mag2 === 0) return 0;

  const cosTheta = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return (Math.acos(cosTheta) * 180) / Math.PI;
}

/**
 * SVG Arc path for angle visualization at vertex B between A and C
 */
export function describeArc(
  center: Point,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;

  const startX = center.x + radius * Math.cos(startRad);
  const startY = center.y + radius * Math.sin(startRad);
  const endX = center.x + radius * Math.cos(endRad);
  const endY = center.y + radius * Math.sin(endRad);

  let diff = endAngleDeg - startAngleDeg;
  while (diff < 0) diff += 360;
  while (diff >= 360) diff -= 360;

  const largeArcFlag = diff > 180 ? 1 : 0;

  return `M ${center.x} ${center.y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
}

/**
 * Get heading angle in degrees of vector from B to P
 */
export function getHeading(B: Point, P: Point): number {
  return (Math.atan2(P.y - B.y, P.x - B.x) * 180) / Math.PI;
}

/**
 * Formats an SVG angle wedge at vertex B between arms to A and to C
 */
export function getAngleWedge(A: Point, B: Point, C: Point, radius: number): string {
  const angleA = getHeading(B, A);
  const angleC = getHeading(B, C);

  // Determine direction to sweep interior angle <= 180
  let diff = (angleC - angleA + 360) % 360;
  if (diff > 180) {
    // sweep from C to A
    return describeArc(B, radius, angleC, angleC + (360 - diff));
  } else {
    // sweep from A to C
    return describeArc(B, radius, angleA, angleA + diff);
  }
}
