import { Ban, Check } from 'lucide-react'

/** Disponibilidad con icono y texto (no depende solo del color). */
export function AvailabilityBadge({ available, className = '' }: { available: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.85rem] font-bold ${
        available ? 'bg-mint text-brand' : 'bg-ink text-white'
      } ${className}`}
    >
      {available ? (
        <Check aria-hidden className="size-4" strokeWidth={3} />
      ) : (
        <Ban aria-hidden className="size-4" strokeWidth={2.6} />
      )}
      {available ? 'Disponible' : 'Agotado'}
    </span>
  )
}
