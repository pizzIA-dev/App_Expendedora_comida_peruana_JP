/**
 * Gráfico con aspecto de QR, solo decorativo.
 * Los módulos son un patrón fijo sin datos codificados y el centro está
 * tapado por el rótulo DEMO: no contiene ninguna solicitud de pago.
 */
const SIZE = 21

function isFinder(x: number, y: number): boolean {
  const inBox = (bx: number, by: number) => x >= bx && x < bx + 7 && y >= by && y < by + 7
  return inBox(0, 0) || inBox(SIZE - 7, 0) || inBox(0, SIZE - 7)
}

function finderFill(x: number, y: number): boolean {
  const lx = x < 7 ? x : x - (SIZE - 7)
  const ly = y < 7 ? y : y - (SIZE - 7)
  const ring = lx === 0 || lx === 6 || ly === 0 || ly === 6
  const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
  return ring || core
}

const cells: { x: number; y: number }[] = []
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const on = isFinder(x, y) ? finderFill(x, y) : (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0
    if (on) cells.push({ x, y })
  }
}

export function DemoQr({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`-2 -2 ${SIZE + 4} ${SIZE + 4}`}
      role="img"
      aria-label="Código QR de demostración, sin valor de pago"
      className={className}
    >
      <rect x="-2" y="-2" width={SIZE + 4} height={SIZE + 4} rx="2.5" fill="#fff" />
      {cells.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#20352b" />
      ))}
      <rect x="3.5" y="7.5" width="14" height="6" rx="1.2" fill="#f3a019" stroke="#fff" strokeWidth="0.8" />
      <text
        x="10.5"
        y="12.1"
        textAnchor="middle"
        fontSize="4.2"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        fill="#20352b"
      >
        DEMO
      </text>
    </svg>
  )
}
