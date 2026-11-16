import { Check } from 'lucide-react'

export const STEPS = ['Elegir', 'Confirmar', 'Pagar', 'Retirar'] as const

/**
 * Indicador constante de cuatro etapas (PLANNING §7).
 * `current` es el índice activo; `allDone` marca también la última como completada.
 */
export function Stepper({ current, allDone = false }: { current: number; allDone?: boolean }) {
  return (
    <nav aria-label="Progreso del pedido" className="px-4 pt-3 kiosk:px-8 kiosk:pt-4">
      <ol className="mx-auto flex max-w-[62rem] items-center">
        {STEPS.map((label, i) => {
          const done = allDone || i < current
          const active = !allDone && i === current
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div
                aria-current={active ? 'step' : undefined}
                className={`flex items-center gap-2 rounded-full border py-1 pl-1 kiosk:gap-3 kiosk:py-1.5 kiosk:pr-6 kiosk:pl-1.5 ${
                  active ? 'pr-4' : 'pr-1 sm:pr-4'
                } ${
                  active
                    ? 'border-brand bg-brand text-white shadow-cta'
                    : done
                      ? 'border-line bg-white text-ink'
                      : 'border-line bg-white text-ink-soft'
                }`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full font-display text-[0.95rem] font-bold kiosk:size-9 kiosk:text-[1.1rem] ${
                    active
                      ? 'bg-white text-brand'
                      : done
                        ? 'bg-brand text-white'
                        : 'bg-mint text-ink-soft'
                  }`}
                >
                  {done ? <Check aria-hidden className="size-4 kiosk:size-5" strokeWidth={3.2} /> : i + 1}
                </span>
                {/* En móvil solo la etapa activa muestra su nombre; el resto queda para lectores */}
                <span
                  className={`font-display text-[1rem] font-bold kiosk:text-[1.15rem] ${active ? '' : 'max-sm:sr-only'}`}
                >
                  {label}
                  <span className="sr-only">
                    {done ? ' (completado)' : active ? ' (etapa actual)' : ' (pendiente)'}
                  </span>
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={`mx-1 h-0.5 flex-1 rounded-full kiosk:mx-3 ${done ? 'bg-brand' : 'bg-line'}`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
