import { ChevronRight, Info, Plus, ShoppingBasket, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Notice } from '../components/Notice'
import { QuantityControl } from '../components/QuantityControl'
import { ScreenTitle } from '../components/ScreenTitle'
import { limits } from '../config/brand'
import { formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'
import { orderCount, orderLines, orderTotalCents, pluralPlatos, saucesLabel, stockOf } from '../features/order/orderSelectors'
import { useAddDish } from '../features/order/useAddDish'

export function SummaryScreen() {
  const { state, dispatch } = useOrder()
  const [confirmCancel, setConfirmCancel] = useState(false)
  const { incrementLine, isBlocked, ui: addDishUi } = useAddDish()

  // Líneas y total calculados siempre desde el catálogo
  const lines = orderLines(state.items)
  const total = orderTotalCents(state.items)
  const count = orderCount(state.items)

  // Pantalla protegida: no hay resumen sin platos
  if (lines.length === 0) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <>
      <ScreenTitle
        icon={ShoppingBasket}
        title={
          <>
            Confirma tu <span className="underline-accent">pedido</span>
          </>
        }
        subtitle="Revisa tus platos antes de continuar."
      />

      <div className="mt-4 grid gap-5 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-[1.55fr_1fr] kiosk:items-start kiosk:gap-6">
        <div className="flex flex-col gap-3 kiosk:max-h-full kiosk:min-h-0">
          <ul className="flex flex-col gap-3 kiosk:min-h-0 kiosk:overflow-y-auto kiosk:pr-1 kiosk:pb-1">
            {lines.map(({ lineId, dish, sauces, quantity, subtotalCents }) => (
              <li
                key={lineId}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[1.6rem] border border-line bg-white p-3 shadow-card"
              >
                <img
                  src={dish.image}
                  alt={dish.imageAlt}
                  className="h-20 w-24 shrink-0 rounded-[1.1rem] object-cover kiosk:h-[5.5rem] kiosk:w-[7.5rem]"
                />
                <div className="min-w-0 flex-1 basis-32">
                  <h2 className="text-[1.3rem] font-extrabold text-brand kiosk:text-[1.5rem]">{dish.name}</h2>
                  <p className="text-[1rem] text-ink">
                    <span className="text-ink-soft">{sauces.length > 1 ? 'Salsas:' : 'Salsa:'}</span> {saucesLabel(sauces)}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-ink-soft">
                    {formatSoles(dish.priceCents)} c/u
                    <span className="rounded-full bg-mint px-2.5 py-0.5 font-semibold text-brand">
                      Disponibles: {stockOf(state.stock, dish.id)}
                    </span>
                  </p>
                </div>
                <QuantityControl
                  className="w-40"
                  dishName={dish.name}
                  quantity={quantity}
                  incrementBlocked={isBlocked(dish.id)}
                  onDecrement={() => dispatch({ type: 'DECREMENT_LINE', lineId })}
                  onIncrement={() => incrementLine(lineId, dish.id)}
                />
                <p className="ml-auto w-24 text-right font-display text-[1.35rem] font-extrabold text-ink">
                  <span className="sr-only">Subtotal: </span>
                  {formatSoles(subtotalCents)}
                </p>
                <button
                  type="button"
                  aria-label={`Eliminar ${dish.name} (${saucesLabel(sauces)}) del pedido`}
                  onClick={() => dispatch({ type: 'REMOVE_LINE', lineId })}
                  className="grid size-[max(2.75rem,44px)] shrink-0 place-items-center rounded-full text-danger hover:bg-danger-soft"
                >
                  <Trash2 aria-hidden className="size-5" />
                </button>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2.5 rounded-2xl bg-mint-soft px-4 py-3 text-[0.98rem] text-ink">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
            <span>
              <strong className="text-brand">Límite por pedido: máximo {limits.maxPerOrder} platos.</strong> La
              cantidad puede variar según la disponibilidad.
            </span>
          </p>
        </div>

        {/* En kiosco el panel no supera el alto disponible: si hay muchas líneas, la lista desplaza */}
        <aside className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card kiosk:flex kiosk:max-h-full kiosk:flex-col">
          <h2 className="bg-mint px-6 py-4 text-[1.5rem] font-bold text-brand">Resumen de tu pedido</h2>
          <div className="flex flex-col gap-4 p-6 kiosk:min-h-0 kiosk:gap-3 kiosk:p-5">
            <ul className="flex flex-col gap-2 border-b border-line pb-4 text-[1.1rem] kiosk:min-h-0 kiosk:overflow-y-auto kiosk:pb-3">
              {lines.map(({ lineId, dish, sauces, quantity, subtotalCents }) => (
                <li key={lineId} className="flex items-baseline justify-between gap-4">
                  <span>
                    {dish.name} <span className="text-ink-soft">× {quantity}</span>
                    {sauces.length > 0 && <span className="block text-[0.9rem] text-ink-soft">{saucesLabel(sauces)}</span>}
                  </span>
                  <span className="font-bold">{formatSoles(subtotalCents)}</span>
                </li>
              ))}
            </ul>
            <p className="flex items-center justify-between gap-4 rounded-2xl bg-mint px-5 py-4 font-display font-extrabold text-brand">
              <span className="text-[1.3rem]">
                Total a pagar
                <span className="block font-sans text-[0.9rem] font-semibold text-ink-soft">{pluralPlatos(count)}</span>
              </span>
              <span className="text-[1.9rem] leading-none whitespace-nowrap kiosk:text-[2.1rem]">{formatSoles(total)}</span>
            </p>
            <Notice tone="warning">Pago ficticio: no se realizará ningún cobro.</Notice>
          </div>
        </aside>
      </div>

      <ActionBar
        left={
          <>
            <Button onClick={() => dispatch({ type: 'ADD_MORE' })}>
              <Plus aria-hidden className="size-5" strokeWidth={2.8} />
              Agregar más platos
            </Button>
            <Button variant="danger" onClick={() => setConfirmCancel(true)}>
              <X aria-hidden className="size-5" strokeWidth={2.8} />
              Cancelar pedido
            </Button>
          </>
        }
        right={
          <Button variant="primary" size="lg" onClick={() => dispatch({ type: 'GO_TO_HEATING' })}>
            Continuar
            <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmCancel}
        title="¿Cancelar tu pedido?"
        description="Se vaciará tu pedido y volverás al menú para elegir de nuevo."
        confirmLabel="Sí, cancelar"
        cancelLabel="Conservar pedido"
        onConfirm={() => dispatch({ type: 'CLEAR_ORDER' })}
        onCancel={() => setConfirmCancel(false)}
      />
      {addDishUi}
    </>
  )
}
