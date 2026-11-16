import { ArrowLeft, ChevronRight, Plus, ShoppingBasket, Star, Utensils } from 'lucide-react'
import { useState } from 'react'
import { ActionBar } from '../components/ActionBar'
import { AvailabilityBadge } from '../components/AvailabilityBadge'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Notice } from '../components/Notice'
import { QuantityControl } from '../components/QuantityControl'
import { ScreenTitle } from '../components/ScreenTitle'
import { limits } from '../config/brand'
import { dishes, formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'
import { orderCount, orderTotalCents, pluralPlatos, quantityOf } from '../features/order/orderSelectors'

export function CatalogScreen() {
  const { state, dispatch } = useOrder()
  const [confirmExit, setConfirmExit] = useState(false)
  const count = orderCount(state.items)
  const total = orderTotalCents(state.items)

  const goHome = () => {
    // Solo se pide confirmación si hay un pedido que se descartaría
    if (count > 0) setConfirmExit(true)
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
        subtitle="Agrega uno o varios platos a tu pedido."
      />

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-5 kiosk:gap-4">
        {dishes.map((dish) => {
          const quantity = quantityOf(state.items, dish.id)
          const inOrder = quantity > 0
          return (
            <li
              key={dish.id}
              className={`flex flex-col overflow-hidden rounded-[1.6rem] border bg-white shadow-card ${
                inOrder ? 'border-brand ring-3 ring-brand/25' : 'border-line'
              }`}
            >
              <div className="relative h-32 sm:h-40 kiosk:h-auto kiosk:min-h-0 kiosk:flex-1">
                <img
                  src={dish.image}
                  alt={dish.imageAlt}
                  className={`absolute inset-0 size-full object-cover ${dish.available ? '' : 'opacity-70 grayscale'}`}
                />
                {dish.featured && (
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.85rem] font-bold text-ink">
                    <Star aria-hidden className="size-4 fill-current" /> Sugerencia
                  </span>
                )}
                <AvailabilityBadge
                  available={dish.available}
                  className={`absolute bottom-2.5 left-2.5 shadow-card ${dish.available ? 'bg-white' : ''}`}
                />
              </div>

              <div className="flex flex-col gap-2 p-3 kiosk:p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h2 className="text-[1.2rem] font-bold text-brand kiosk:text-[1.35rem]">{dish.name}</h2>
                  <span className="rounded-full bg-mint px-3 py-0.5 font-display text-[1.15rem] font-extrabold text-brand">
                    {formatSoles(dish.priceCents)}
                  </span>
                </div>
                <p className="hidden text-[0.92rem] leading-snug text-ink-soft sm:line-clamp-2 kiosk:min-h-[2.5em]">
                  {dish.shortDescription}
                </p>

                {inOrder ? (
                  <QuantityControl
                    dishName={dish.name}
                    quantity={quantity}
                    incrementDisabled={quantity >= limits.maxPerDish}
                    onDecrement={() => dispatch({ type: 'DECREMENT_ITEM', dishId: dish.id })}
                    onIncrement={() => dispatch({ type: 'ADD_ITEM', dishId: dish.id })}
                  />
                ) : (
                  <Button
                    variant="primary"
                    className="w-full px-3 shadow-none"
                    disabled={!dish.available}
                    aria-label={dish.available ? `Agregar ${dish.name} al pedido` : `${dish.name} está agotado`}
                    onClick={() => dispatch({ type: 'ADD_ITEM', dishId: dish.id })}
                  >
                    {dish.available ? (
                      <>
                        <Plus aria-hidden className="size-5" strokeWidth={3} />
                        Agregar
                      </>
                    ) : (
                      'Agotado'
                    )}
                  </Button>
                )}

                <button
                  type="button"
                  aria-label={`Ver detalles de ${dish.name}`}
                  onClick={() => dispatch({ type: 'VIEW_DISH', dishId: dish.id })}
                  className="flex min-h-[max(2.75rem,44px)] items-center justify-center gap-1 rounded-full font-display text-[1rem] font-bold text-brand underline decoration-line decoration-2 underline-offset-4 hover:bg-mint-soft hover:decoration-brand"
                >
                  Ver detalles
                  <ChevronRight aria-hidden className="size-4" strokeWidth={3} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <ActionBar
        left={
          <>
            <Button onClick={goHome} className="whitespace-nowrap">
              <ArrowLeft aria-hidden className="size-5" strokeWidth={2.6} />
              Volver al inicio
            </Button>
            <Notice className="kiosk:whitespace-nowrap">Información alimentaria ilustrativa.</Notice>
          </>
        }
        right={
          <>
            <p id="order-hint" aria-live="polite" className="text-[1.05rem] font-semibold text-ink-soft kiosk:whitespace-nowrap">
              {count > 0 ? (
                <>
                  Tu pedido: <strong className="text-brand">{pluralPlatos(count)}</strong> ·{' '}
                  <strong className="text-brand">{formatSoles(total)}</strong>
                </>
              ) : (
                'Agrega al menos un plato para continuar.'
              )}
            </p>
            <Button
              variant="primary"
              size="lg"
              disabled={count === 0}
              aria-describedby="order-hint"
              onClick={() => dispatch({ type: 'GO_TO_SUMMARY' })}
            >
              <ShoppingBasket aria-hidden className="size-7" />
              Ver mi pedido
              <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
            </Button>
          </>
        }
      />

      <ConfirmDialog
        open={confirmExit}
        title="¿Volver al inicio?"
        description="Se descartarán los platos que agregaste a tu pedido."
        confirmLabel="Sí, descartar"
        cancelLabel="Seguir eligiendo"
        onConfirm={() => dispatch({ type: 'RESET' })}
        onCancel={() => setConfirmExit(false)}
      />
    </>
  )
}
