import { Ban, Check } from 'lucide-react'

/** Disponibilidad con icono y texto (no depende solo del color): «Disponible (12)» o «Agotado». */
export function AvailabilityBadge({ stock, className = '' }: { stock: number; className?: string }) {
  const available = stock > 0
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.85rem] font-bold whitespace-nowrap ${
        available ? 'bg-mint text-brand' : 'bg-danger text-white'
      } ${className}`}
    >
      {available ? (
        <Check aria-hidden className="size-4" strokeWidth={3} />
      ) : (
        <Ban aria-hidden className="size-4" strokeWidth={2.6} />
      )}
      {available ? (
        <>
          Disponible <span aria-hidden>({stock})</span>
          <span className="sr-only">: {stock} unidades</span>
        </>
      ) : (
        'Agotado'
      )}
    </span>
  )
}
