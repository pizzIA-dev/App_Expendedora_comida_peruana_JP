import { ArrowLeft, ChevronRight, CircleCheck, Star, Utensils } from 'lucide-react'
import { useState } from 'react'
import { ActionBar } from '../components/ActionBar'
import { AvailabilityBadge } from '../components/AvailabilityBadge'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Notice } from '../components/Notice'
import { ScreenTitle } from '../components/ScreenTitle'
import { notices } from '../config/brand'
import { dishes, formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'

export function CatalogScreen() {
  const { state, dispatch } = useOrder()
  const [confirmExit, setConfirmExit] = useState(false)

  const goHome = () => {
    // Solo se pide confirmación si hay una selección que se descartaría
    if (state.selectedDishId) setConfirmExit(true)
    else dispatch({ type: 'RESET' })
  }

  return (
    <>
      <ScreenTitle
        icon={Utensils}
        title={
          <>
            Elige tu <span className="underline-accent">plato</span>
          </>
        }
        subtitle="Comida peruana, lista para disfrutar."
      />

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-5 kiosk:gap-4">
        {dishes.map((dish) => {
          const selected = dish.id === state.selectedDishId
          return (
            <li
              key={dish.id}
              className={`flex flex-col overflow-hidden rounded-[1.6rem] border bg-white shadow-card ${
                selected ? 'border-accent ring-3 ring-accent/50' : 'border-line'
              }`}
            >
              <div className="relative h-32 sm:h-40 kiosk:h-auto kiosk:min-h-0 kiosk:flex-1">
                <img
                  src={dish.image}
                  alt={dish.imageAlt}
                  className={`absolute inset-0 size-full object-cover ${dish.available ? '' : 'opacity-70 grayscale'}`}
                />
                {selected ? (
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.85rem] font-bold text-ink">
                    <CircleCheck aria-hidden className="size-4" /> Tu selección
                  </span>
                ) : (
                  dish.featured && (
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.85rem] font-bold text-ink">
                      <Star aria-hidden className="size-4 fill-current" /> Sugerencia
                    </span>
                  )
                )}
              </div>

              <div className="flex flex-col gap-2 p-3 kiosk:gap-2.5 kiosk:p-4">
                <h2 className="text-[1.2rem] font-bold text-brand kiosk:text-[1.4rem]">{dish.name}</h2>
                <p className="hidden text-[0.95rem] leading-snug text-ink-soft sm:line-clamp-2 kiosk:min-h-[2.6em]">
                  {dish.shortDescription}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-mint px-3 py-1 font-display text-[1.25rem] font-extrabold text-brand">
                    {formatSoles(dish.priceCents)}
                  </span>
                  <AvailabilityBadge available={dish.available} />
                </div>
                <Button
                  variant={dish.available ? 'primary' : 'secondary'}
                  className="mt-1 w-full px-3 shadow-none"
                  aria-label={`Ver detalles de ${dish.name}${dish.available ? '' : ' (agotado)'}`}
                  onClick={() => dispatch({ type: 'VIEW_DISH', dishId: dish.id })}
                >
                  Ver detalles
                  <ChevronRight aria-hidden className="size-5 max-sm:hidden" strokeWidth={3} />
                </Button>
              </div>
            </li>
          )
        })}
      </ul>

      <ActionBar
        left={
          <Button onClick={goHome}>
            <ArrowLeft aria-hidden className="size-5" strokeWidth={2.6} />
            Volver al inicio
          </Button>
        }
        right={<Notice>{notices.food}.</Notice>}
      />

      <ConfirmDialog
        open={confirmExit}
        title="¿Volver al inicio?"
        description="Se descartará el plato que habías seleccionado."
        confirmLabel="Sí, descartar"
        cancelLabel="Seguir eligiendo"
        onConfirm={() => dispatch({ type: 'RESET' })}
        onCancel={() => setConfirmExit(false)}
      />
    </>
  )
}
