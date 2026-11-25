import { ArrowLeft, Check, ChevronRight, Microwave, Snowflake, Soup } from 'lucide-react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { ScreenTitle } from '../components/ScreenTitle'
import { useOrder } from '../features/order/OrderContext'
import { orderLines } from '../features/order/orderSelectors'
import type { HeatingChoice } from '../types'

/** Tres ondas de vapor decorativas */
export function Steam({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 40"
      className={`text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d="M10 36c-5-6 5-10 0-17s3-11 0-16M24 36c-5-6 5-10 0-17s3-11 0-16M38 36c-5-6 5-10 0-17s3-11 0-16" />
    </svg>
  )
}

const OPTIONS: {
  id: HeatingChoice
  title: string
  description: string
}[] = [
  {
    id: 'heat',
    title: 'Calentamiento rápido',
    description:
      'Calienta los componentes principales de tu plato (carne, arroz, pastas o guisos) para disfrutarlo caliente.',
  },
  {
    id: 'none',
    title: 'Sin calentamiento',
    description: 'Recibe tu plato fresco y listo para consumir.',
  },
]

export function HeatingScreen() {
  const { state, dispatch } = useOrder()
  const dish = orderLines(state.items)[0]?.dish

  if (!dish) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <>
      <ScreenTitle
        icon={Soup}
        title={
          <>
            ¿Cómo deseas recibir tu <span className="underline-accent">comida</span>?
          </>
        }
        subtitle="Elige la opción que prefieras."
      />

      <fieldset className="mt-4 kiosk:min-h-0 kiosk:flex-1">
        <legend className="sr-only">Preparación del pedido</legend>
        <div className="grid gap-4 kiosk:h-full kiosk:max-h-[30rem] kiosk:grid-cols-2 kiosk:gap-6">
          {OPTIONS.map(({ id, title, description }) => {
            const checked = state.heating === id
            const heat = id === 'heat'
            return (
              <label
                key={id}
                className={`relative flex flex-col gap-4 rounded-[2rem] border-2 p-5 transition has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent kiosk:gap-5 kiosk:p-7 ${
                  checked ? 'border-brand bg-mint-soft shadow-card' : 'border-line bg-white hover:border-leaf'
                }`}
              >
                <input
                  type="radio"
                  name="heating"
                  value={id}
                  checked={checked}
                  onChange={() => dispatch({ type: 'CHOOSE_HEATING', heating: id })}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`absolute top-5 right-5 z-10 grid size-10 place-items-center rounded-full border-2 kiosk:top-6 kiosk:right-6 ${
                    checked ? 'border-brand bg-brand text-white' : 'border-ink-soft/50 bg-white'
                  }`}
                >
                  {checked && <Check className="size-6 animate-pop" strokeWidth={3.4} />}
                </span>

                {/* Ilustración: el plato del pedido en su envase, con calor o en frío */}
                <div aria-hidden className="relative h-36 kiosk:h-auto kiosk:min-h-[7rem] kiosk:flex-1">
                  <div className="absolute inset-y-0 left-6 right-6 overflow-hidden rounded-[1.4rem] border-[6px] border-[#ead9bd] bg-[#ead9bd] shadow-card kiosk:left-10 kiosk:right-10">
                    <img src={dish.image} alt="" className="size-full rounded-[1rem] object-cover" />
                  </div>
                  <span
                    className={`absolute top-2 left-0 grid size-14 place-items-center rounded-2xl text-white shadow-card kiosk:size-16 ${
                      heat ? 'bg-brand' : 'bg-[#2b7bd6]'
                    }`}
                  >
                    {heat ? <Microwave className="size-8 kiosk:size-9" /> : <Snowflake className="size-8 kiosk:size-9" />}
                  </span>
                  {heat && <Steam className="absolute -top-3 left-1/2 size-12 -translate-x-1/2 kiosk:size-14" />}
                </div>

                <div className="pr-12">
                  <p className="font-display text-[1.7rem] leading-tight font-extrabold text-brand kiosk:text-[2rem]">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[1.1rem] text-ink-soft kiosk:text-[1.15rem]">{description}</p>
                </div>
                <span className="text-[0.95rem] font-bold text-brand">{checked ? 'Seleccionado' : 'Toca para elegir'}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <ActionBar
        left={
          <Button onClick={() => dispatch({ type: 'BACK_TO_SUMMARY' })}>
            <ArrowLeft aria-hidden className="size-5" strokeWidth={2.6} />
            Volver
          </Button>
        }
        right={
          <>
            {!state.heating && (
              <p id="heating-hint" className="text-[1rem] font-semibold text-ink-soft">
                Elige una opción para continuar.
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              disabled={!state.heating}
              aria-describedby={state.heating ? undefined : 'heating-hint'}
              onClick={() => dispatch({ type: 'GO_TO_PAYMENT' })}
            >
              Continuar al pago
              <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
            </Button>
          </>
        }
      />
    </>
  )
}
