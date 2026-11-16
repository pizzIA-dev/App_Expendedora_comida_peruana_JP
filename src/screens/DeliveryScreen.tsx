import { Check, ChevronRight, House, LoaderCircle, Star } from 'lucide-react'
import { useEffect } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { Sparks } from '../components/ScreenTitle'
import { timings } from '../config/brand'
import { findDish } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'

export function DeliveryScreen() {
  const { state, dispatch } = useOrder()
  const dish = findDish(state.selectedDishId)
  const ready = state.deliveryReady

  // Despacho ficticio de duración constante
  useEffect(() => {
    if (ready) return
    const id = window.setTimeout(() => dispatch({ type: 'DELIVERY_READY' }), timings.dispatch)
    return () => window.clearTimeout(id)
  }, [ready, dispatch])

  if (!dish) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid items-center gap-6 pt-5 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-[1fr_1.05fr] kiosk:gap-10 kiosk:pt-4">
        {/* Ilustración del compartimento */}
        <figure className="kiosk:h-full kiosk:max-h-[30rem]">
          <div className="flex h-72 flex-col rounded-[2rem] bg-linear-to-b from-[#d9dfdc] via-[#b9c2bd] to-[#98a39d] p-4 shadow-card kiosk:h-[calc(100%-2rem)] kiosk:p-6">
            <div aria-hidden className="mx-auto mb-4 h-5 w-36 rounded-full bg-[#1c2a23]" />
            <div className="relative flex-1 overflow-hidden rounded-[1.4rem] bg-[#16221c] shadow-[inset_0_8px_24px_rgb(0_0_0/0.7)]">
              {ready ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ffd58a_0%,#c98a2c_35%,transparent_75%)]"
                  />
                  <div className="absolute inset-x-[14%] top-[16%] bottom-[10%] animate-pop overflow-hidden rounded-[1.2rem] border-4 border-white/85 shadow-2xl">
                    <img src={dish.image} alt={`${dish.name} en el compartimento (ilustración)`} className="size-full object-cover" />
                    <p className="absolute inset-x-0 bottom-0 bg-brand/95 py-1.5 text-center font-display text-[1rem] font-bold text-white">
                      {dish.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div aria-hidden className="absolute inset-0 animate-glow bg-[radial-gradient(ellipse_at_50%_0%,#f3a01955_0%,transparent_70%)]" />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 overflow-hidden bg-white/10">
                    <div className="h-full w-1/3 animate-slide rounded-full bg-accent" />
                  </div>
                  <p className="absolute inset-0 grid place-items-center font-display text-[1.2rem] font-semibold text-white/80">
                    Preparando…
                  </p>
                </>
              )}
            </div>
          </div>
          <figcaption className="mt-2 text-center text-[0.9rem] font-medium text-ink-soft">
            Compartimento inferior · ilustración de la simulación
          </figcaption>
        </figure>

        <div className="flex flex-col items-start gap-4">
          <span
            aria-hidden
            className={`grid size-20 place-items-center rounded-full ${ready ? 'bg-brand text-white' : 'bg-mint text-brand'}`}
          >
            {ready ? (
              <Check className="size-11 animate-pop" strokeWidth={3.4} />
            ) : (
              <LoaderCircle className="size-11 animate-spin" />
            )}
          </span>

          <h1
            tabIndex={-1}
            data-screen-title
            className="relative pr-12 text-[2.6rem] font-extrabold text-brand kiosk:text-[3.7rem]"
          >
            ¡Pedido <span className="underline-accent">confirmado</span>!
            <Sparks className="absolute -top-2 right-0 size-10" />
          </h1>

          <p className="rounded-full border border-line bg-white px-5 py-2 text-[1.1rem]">
            Pedido <strong className="font-display text-[1.3rem] text-brand">{state.orderCode}</strong>
            <span className="text-ink-soft"> · código ficticio</span>
          </p>

          <div role="status" aria-live="polite" className="w-full rounded-[1.6rem] bg-mint-soft p-5">
            <p className="flex items-center gap-3 font-display text-[1.6rem] font-extrabold text-brand kiosk:text-[1.9rem]">
              {ready ? (
                <Check aria-hidden className="size-8" strokeWidth={3.2} />
              ) : (
                <LoaderCircle aria-hidden className="size-8 animate-spin" />
              )}
              {ready ? 'Listo para retirar' : 'Preparando despacho'}
            </p>
            <p className="mt-2 text-[1.2rem] text-ink">
              {ready
                ? 'Retira tu almuerzo del compartimento inferior (simulación).'
                : 'Tu almuerzo estará listo en unos segundos (simulación).'}
            </p>
          </div>
        </div>
      </div>

      <ActionBar
        left={
          ready && (
            <Button onClick={() => dispatch({ type: 'RESET' })}>
              <House aria-hidden className="size-5" strokeWidth={2.6} />
              Finalizar
            </Button>
          )
        }
        right={
          ready ? (
            <Button variant="primary" size="lg" onClick={() => dispatch({ type: 'OPEN_FEEDBACK' })}>
              <Star aria-hidden className="size-7" />
              Evaluar experiencia
              <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
            </Button>
          ) : (
            <p className="min-h-[max(4.25rem,64px)] content-center text-[1.05rem] font-semibold text-ink-soft">
              Espera un momento…
            </p>
          )
        }
      />
    </>
  )
}
