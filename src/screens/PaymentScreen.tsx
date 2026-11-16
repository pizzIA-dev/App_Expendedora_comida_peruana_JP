import { ArrowLeft, Check, ChevronRight, CreditCard, LoaderCircle, Nfc, QrCode, ShieldCheck, Wallet } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { DemoQr } from '../components/DemoQr'
import { Notice } from '../components/Notice'
import { ScreenTitle } from '../components/ScreenTitle'
import { brand, notices, timings } from '../config/brand'
import { formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'
import { orderCount, orderTotalCents, pluralPlatos } from '../features/order/orderSelectors'
import type { PaymentMethod } from '../types'

const METHODS: {
  id: PaymentMethod
  icon: typeof QrCode
  title: string
  tag: string
  description: string
  visual: ReactNode
}[] = [
  {
    id: 'wallet',
    icon: QrCode,
    title: 'Billetera digital',
    tag: 'QR de demostración',
    description: 'En una máquina real escanearías un código con tu billetera. Aquí es solo una demostración.',
    visual: <DemoQr className="size-28 rounded-xl shadow-card kiosk:size-32" />,
  },
  {
    id: 'card',
    icon: CreditCard,
    title: 'Tarjeta',
    tag: 'Simulación',
    description: 'En una máquina real acercarías tu tarjeta al lector. Aquí no se pide ningún dato.',
    visual: (
      <div
        aria-hidden
        className="flex h-28 w-44 flex-col justify-between rounded-2xl bg-linear-to-br from-brand-mid to-brand-deep p-3.5 text-white shadow-card kiosk:h-32 kiosk:w-52"
      >
        <div className="flex items-center justify-between">
          <span className="h-7 w-10 rounded-md bg-accent/90" />
          <Nfc className="size-7" />
        </div>
        <p className="font-display text-[0.95rem] font-bold tracking-[0.2em]">TARJETA DEMO</p>
      </div>
    ),
  },
]

export function PaymentScreen() {
  const { state, dispatch } = useOrder()
  const total = orderTotalCents(state.items)
  const count = orderCount(state.items)
  const { paymentMethod, paymentStatus } = state
  const busy = paymentStatus !== 'idle'

  // Secuencia ficticia: procesando → aprobado → entrega
  useEffect(() => {
    if (paymentStatus === 'processing') {
      const id = window.setTimeout(() => dispatch({ type: 'PAYMENT_APPROVED' }), timings.paymentProcessing)
      return () => window.clearTimeout(id)
    }
    if (paymentStatus === 'approved') {
      const id = window.setTimeout(() => {
        const orderCode = `${brand.orderPrefix}-${1000 + Math.floor(Math.random() * 9000)}`
        dispatch({ type: 'PAYMENT_DONE', orderCode })
      }, timings.paymentApproved)
      return () => window.clearTimeout(id)
    }
  }, [paymentStatus, dispatch])

  if (count === 0) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <>
      <ScreenTitle
        icon={Wallet}
        title={
          <>
            Elige cómo <span className="underline-accent">pagar</span>
          </>
        }
        subtitle="Pago simulado, sin dinero real."
        aside={
          <p className="flex items-center gap-3 rounded-full bg-mint py-2 pr-6 pl-5 font-display font-extrabold text-brand">
            <span className="text-[1.05rem]">Total · {pluralPlatos(count)}</span>
            <span className="text-[1.8rem] leading-none">{formatSoles(total)}</span>
          </p>
        }
      />

      <fieldset disabled={busy} className="mt-4 kiosk:min-h-0 kiosk:flex-1">
        <legend className="sr-only">Método de pago simulado</legend>
        <div className="grid gap-4 kiosk:h-full kiosk:grid-cols-2 kiosk:gap-6">
          {METHODS.map(({ id, icon: Icon, title, tag, description, visual }) => {
            const checked = paymentMethod === id
            return (
              <label
                key={id}
                className={`relative flex flex-col gap-4 rounded-[2rem] border-2 p-5 transition has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent kiosk:p-7 ${
                  checked ? 'border-brand bg-mint-soft shadow-card' : 'border-line bg-white hover:border-leaf'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={id}
                  checked={checked}
                  onChange={() => dispatch({ type: 'CHOOSE_METHOD', method: id })}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`absolute top-5 right-5 grid size-9 place-items-center rounded-full border-2 kiosk:top-6 kiosk:right-6 ${
                    checked ? 'border-brand bg-brand text-white' : 'border-ink-soft/50 bg-white'
                  }`}
                >
                  {checked && <Check className="size-5 animate-pop" strokeWidth={3.4} />}
                </span>

                <div className="flex items-center gap-4 pr-12">
                  <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint text-brand">
                    <Icon className="size-8" />
                  </span>
                  <div>
                    <p className="font-display text-[1.7rem] leading-tight font-extrabold text-brand kiosk:text-[2rem]">
                      {title}
                    </p>
                    <p className="mt-1 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-[0.9rem] font-bold text-accent-ink">
                      {tag}
                    </p>
                  </div>
                </div>

                <p className="text-[1.05rem] text-ink-soft">{description}</p>
                <div className="mt-auto flex items-end justify-between gap-4">
                  {visual}
                  <span className="text-[0.95rem] font-bold text-brand">{checked ? 'Seleccionado' : 'Toca para elegir'}</span>
                </div>
              </label>
            )
          })}
        </div>
      </fieldset>

      <Notice tone="warning" className="mt-4 self-start">
        {notices.bank}. Esta pantalla no solicita tarjeta, PIN ni CVV.
      </Notice>

      <ActionBar
        left={
          <Button disabled={busy} onClick={() => dispatch({ type: 'BACK_TO_SUMMARY' })}>
            <ArrowLeft aria-hidden className="size-5" strokeWidth={2.6} />
            Volver
          </Button>
        }
        right={
          <>
            {!paymentMethod && (
              <p id="method-hint" className="text-[1rem] font-semibold text-ink-soft">
                Elige un método para continuar.
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              disabled={!paymentMethod || busy}
              aria-describedby={paymentMethod ? undefined : 'method-hint'}
              onClick={() => dispatch({ type: 'PAY' })}
            >
              <ShieldCheck aria-hidden className="size-7" />
              Simular pago
              <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
            </Button>
          </>
        }
      />

      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-deep/60 p-4 backdrop-blur-xs">
          <div
            role="status"
            aria-live="assertive"
            className="flex w-[min(92vw,30rem)] animate-pop flex-col items-center gap-4 rounded-[2rem] bg-white p-9 text-center shadow-2xl"
          >
            {paymentStatus === 'processing' ? (
              <>
                <LoaderCircle aria-hidden className="size-16 animate-spin text-brand" />
                <p className="font-display text-[1.8rem] font-extrabold text-brand">Procesando pago ficticio…</p>
                <p className="text-[1.05rem] text-ink-soft">No se está realizando ningún cobro.</p>
              </>
            ) : (
              <>
                <span className="grid size-16 animate-pop place-items-center rounded-full bg-brand text-white">
                  <Check aria-hidden className="size-9" strokeWidth={3.4} />
                </span>
                <p className="font-display text-[1.8rem] font-extrabold text-brand">Pago simulado aprobado</p>
                <p className="text-[1.05rem] text-ink-soft">Confirmación ficticia: no se cobró nada.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
