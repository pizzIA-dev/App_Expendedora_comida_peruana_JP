import { Minus, Plus, Trash2 } from 'lucide-react'

interface QuantityControlProps {
  dishName: string
  quantity: number
  onDecrement: () => void
  onIncrement: () => void
  /**
   * No se puede sumar (stock o límite del pedido). El botón sigue respondiendo para que
   * la pantalla explique el motivo, pero se ve atenuado y se anuncia como no disponible.
   */
  incrementBlocked?: boolean
  className?: string
}

const stepButton =
  'grid size-[max(2.75rem,44px)] shrink-0 place-items-center rounded-full transition active:scale-95 ' +
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100'

/** Control − cantidad +. Al llegar a 1, el botón de restar quita la línea. */
export function QuantityControl({
  dishName,
  quantity,
  onDecrement,
  onIncrement,
  incrementBlocked = false,
  className = '',
}: QuantityControlProps) {
  const removes = quantity <= 1
  return (
    <div
      role="group"
      aria-label={`Cantidad de ${dishName}`}
      className={`flex min-h-[max(3.5rem,56px)] items-center justify-between gap-1 rounded-full border-2 border-brand bg-white p-1 ${className}`}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label={removes ? `Quitar ${dishName} del pedido` : `Quitar una unidad de ${dishName}`}
        className={`${stepButton} bg-mint text-brand hover:bg-line`}
      >
        {removes ? <Trash2 aria-hidden className="size-5" /> : <Minus aria-hidden className="size-5" strokeWidth={3} />}
      </button>
      <span aria-live="polite" className="min-w-8 text-center font-display text-[1.4rem] font-extrabold text-brand">
        {quantity}
        <span className="sr-only"> en tu pedido</span>
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-disabled={incrementBlocked || undefined}
        aria-label={`Agregar una unidad de ${dishName}`}
        className={`${stepButton} bg-brand text-white hover:bg-brand-deep ${incrementBlocked ? 'opacity-40' : ''}`}
      >
        <Plus aria-hidden className="size-5" strokeWidth={3} />
      </button>
    </div>
  )
}
