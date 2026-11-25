import { Info } from 'lucide-react'

/** Aviso breve flotante (p. ej. «Has alcanzado la cantidad disponible de este plato»). */
export function Toast({ message }: { message: { id: number; text: string } | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center px-4 kiosk:bottom-32"
    >
      {message && (
        <p
          key={message.id}
          className="flex animate-pop items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[1.1rem] font-semibold text-white shadow-2xl"
        >
          <Info aria-hidden className="size-5 shrink-0 text-accent" />
          {message.text}
        </p>
      )}
    </div>
  )
}
