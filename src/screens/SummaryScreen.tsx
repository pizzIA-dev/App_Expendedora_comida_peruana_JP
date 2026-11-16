import { ChevronRight, CreditCard, Repeat, ShoppingBasket, X } from 'lucide-react'
import { useState } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Notice } from '../components/Notice'
import { ScreenTitle } from '../components/ScreenTitle'
import { findDish, formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'

/** M0: siempre una unidad por pedido (requisito del Word) */
const QUANTITY = 1

export function SummaryScreen() {
  const { state, dispatch } = useOrder()
  const [confirmCancel, setConfirmCancel] = useState(false)
  const dish = findDish(state.selectedDishId)

  // Pantalla protegida: no hay resumen sin plato válido
  if (!dish) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  // El total se calcula siempre desde el catálogo
  const total = dish.priceCents * QUANTITY

  return (
    <>
      <ScreenTitle
        icon={ShoppingBasket}
        title={
          <>
            Confirma tu <span className="underline-accent">pedido</span>
          </>
        }
        subtitle="Revisa tu selección antes de continuar."
      />

      <div className="mt-4 grid gap-5 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-[1.55fr_1fr] kiosk:items-start kiosk:gap-6">
        <article className="flex flex-col gap-4 rounded-[2rem] border border-line bg-white p-4 shadow-card sm:flex-row kiosk:gap-6 kiosk:p-5">
          <img
            src={dish.image}
            alt={dish.imageAlt}
            className="h-44 w-full rounded-[1.4rem] object-cover sm:h-auto sm:min-h-52 sm:w-[42%] kiosk:min-h-[17rem]"
          />
          <div className="flex flex-1 flex-col items-start gap-3 kiosk:py-2">
            <h2 className="text-[1.9rem] font-extrabold text-brand kiosk:text-[2.3rem]">{dish.name}</h2>
            <p className="text-[1.05rem] text-ink-soft">{dish.description}</p>
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div>
                <dt className="text-[0.85rem] font-semibold text-ink-soft">Cantidad</dt>
                <dd className="font-display text-[1.4rem] font-bold text-ink">
                  {QUANTITY} unidad
                </dd>
              </div>
              <div>
                <dt className="text-[0.85rem] font-semibold text-ink-soft">Precio</dt>
                <dd className="font-display text-[1.4rem] font-bold text-ink">{formatSoles(dish.priceCents)}</dd>
              </div>
            </dl>
            <p className="text-[0.92rem] text-ink-soft">Cada pedido incluye una sola unidad.</p>
            <Button className="mt-auto" onClick={() => dispatch({ type: 'CHANGE_DISH' })}>
              <Repeat aria-hidden className="size-5" strokeWidth={2.6} />
              Cambiar plato
            </Button>
          </div>
        </article>

        <aside className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
          <h2 className="bg-mint px-6 py-4 text-[1.5rem] font-bold text-brand">Resumen de tu pedido</h2>
          <div className="flex flex-col gap-4 p-6">
            <p className="flex items-baseline justify-between gap-4 border-b border-line pb-4 text-[1.15rem]">
              <span>
                {dish.name} <span className="text-ink-soft">× {QUANTITY}</span>
              </span>
              <span className="font-bold">{formatSoles(dish.priceCents)}</span>
            </p>
            <p className="flex items-center justify-between gap-4 rounded-2xl bg-mint px-5 py-4 font-display font-extrabold text-brand">
              <span className="text-[1.3rem]">Total a pagar</span>
              <span className="text-[2.1rem] leading-none">{formatSoles(total)}</span>
            </p>
            <Notice tone="warning">Pago ficticio: no se realizará ningún cobro.</Notice>
          </div>
        </aside>
      </div>

      <ActionBar
        left={
          <Button variant="danger" onClick={() => setConfirmCancel(true)}>
            <X aria-hidden className="size-5" strokeWidth={2.8} />
            Cancelar pedido
          </Button>
        }
        right={
          <Button variant="primary" size="lg" onClick={() => dispatch({ type: 'GO_TO_PAYMENT' })}>
            <CreditCard aria-hidden className="size-7" />
            Continuar al pago
            <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmCancel}
        title="¿Cancelar tu pedido?"
        description="Se borrará tu selección y volverás a la pantalla de inicio."
        confirmLabel="Sí, cancelar"
        cancelLabel="Conservar pedido"
        onConfirm={() => dispatch({ type: 'RESET' })}
        onCancel={() => setConfirmCancel(false)}
      />
    </>
  )
}
