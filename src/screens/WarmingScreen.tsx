import { Clock, LoaderCircle, Microwave, Package } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { Sparks } from '../components/ScreenTitle'
import { timings } from '../config/brand'
import { useOrder } from '../features/order/OrderContext'
import { orderCount, orderLines, pluralPlatos } from '../features/order/orderSelectors'
import { Steam } from './HeatingScreen'

/** Solo aparece tras el pago si el cliente eligió «Calentamiento rápido» */
export function WarmingScreen() {
  const { state, dispatch } = useOrder()
  const lines = orderLines(state.items)
  const count = orderCount(state.items)
  const dish = lines[0]?.dish
  const [progress, setProgress] = useState(0)

  // Calentamiento ficticio: la barra avanza y al llegar al 100 % pasa a la entrega
  useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - start) / timings.warming) * 100))
      setProgress(p)
      if (p >= 100) {
        window.clearInterval(id)
        dispatch({ type: 'WARMING_DONE' })
      }
    }, 120)
    return () => window.clearInterval(id)
  }, [dispatch])

  if (!dish) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 pt-5 text-center kiosk:pt-4">
        <div className="flex items-center gap-4 kiosk:gap-5">
          <span aria-hidden className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-mint text-brand sm:grid kiosk:size-20">
            <Steam className="size-9 text-brand kiosk:size-11" />
          </span>
          <h1
            tabIndex={-1}
            data-screen-title
            className="relative pr-10 text-[2.3rem] font-extrabold text-brand kiosk:text-[3.4rem]"
          >
            Calentando tu <span className="underline-accent">pedido</span>
            <Sparks className="absolute -top-2 right-0 size-9" />
          </h1>
        </div>
        <p className="text-[1.1rem] text-ink-soft kiosk:text-[1.3rem]">
          La máquina está realizando el calentamiento interno antes del despacho.
        </p>
      </div>

      <div className="grid items-center gap-6 pt-5 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-[0.85fr_1.15fr] kiosk:gap-10 kiosk:pt-4">
        {/* Ilustración del módulo de calentamiento */}
        <figure aria-hidden className="kiosk:h-full kiosk:max-h-[26rem]">
          <div className="flex h-64 gap-3 rounded-[2rem] border-4 border-mint bg-white p-4 shadow-card kiosk:h-full kiosk:p-5">
            <div className="relative flex-1 overflow-hidden rounded-[1.4rem] bg-[#2a1d10] shadow-[inset_0_8px_24px_rgb(0_0_0/0.7)]">
              <div className="absolute inset-0 animate-glow bg-[radial-gradient(ellipse_at_50%_0%,#ffd58a_0%,#e0912c_40%,transparent_80%)]" />
              <div className="absolute inset-x-[12%] top-[8%] h-1.5 rounded-full bg-[#ffe2a8] shadow-[0_0_16px_#ffc663]" />
              <div className="absolute inset-x-[12%] top-[14%] h-1.5 rounded-full bg-[#ffe2a8] shadow-[0_0_16px_#ffc663]" />
              <Steam className="absolute top-[24%] left-1/2 size-12 -translate-x-1/2 text-white/80 kiosk:size-14" />
              <div className="absolute inset-x-[14%] bottom-[10%] h-[42%] overflow-hidden rounded-[1rem] border-[5px] border-white/90 shadow-2xl">
                <img src={dish.image} alt="" className="size-full object-cover" />
              </div>
            </div>
            <div className="flex w-12 flex-col items-center gap-2 rounded-2xl bg-brand py-4 kiosk:w-14">
              <span className="h-2 w-6 rounded-full bg-leaf" />
              <span className="h-2 w-6 rounded-full bg-mint/70" />
              <Microwave className="mt-auto mb-1 size-7 text-white" />
            </div>
          </div>
        </figure>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-3 font-display text-[1.6rem] font-extrabold text-ink kiosk:text-[2rem]">
              <LoaderCircle aria-hidden className="size-8 animate-spin text-leaf" />
              Proceso en curso
            </p>
            <p className="flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-[1rem] text-ink kiosk:text-[1.1rem]">
              <Clock aria-hidden className="size-5" />
              Tiempo estimado: <strong>1–2 minutos</strong>
            </p>
          </div>

          <div>
            <div
              role="progressbar"
              aria-label="Avance del calentamiento"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="h-10 overflow-hidden rounded-full border border-line bg-mint-soft p-1 kiosk:h-12"
            >
              <div
                className="flex h-full min-w-[3.5rem] items-center justify-end rounded-full bg-linear-to-r from-leaf to-brand pr-3 font-display text-[1.15rem] font-extrabold text-white transition-[width] duration-150 ease-linear kiosk:text-[1.3rem]"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <p className="mt-2 text-[1.05rem] text-ink-soft kiosk:text-[1.15rem]">
              Solo se calientan los componentes aptos para calor.
            </p>
          </div>

          <div className="flex items-center gap-5 rounded-[1.6rem] bg-mint-soft p-5">
            <span aria-hidden className="grid size-16 shrink-0 place-items-center rounded-full bg-mint text-brand kiosk:size-20">
              <Package className="size-8 kiosk:size-10" />
            </span>
            <div className="border-l-2 border-line pl-5">
              <p className="font-display text-[1.4rem] font-extrabold text-brand kiosk:text-[1.7rem]">
                Envase resistente al calor
              </p>
              <p className="text-[1.05rem] text-ink kiosk:text-[1.15rem]">Los ingredientes fríos se mantienen separados.</p>
            </div>
          </div>

          <p className="text-[1rem] font-semibold text-ink-soft">
            Pedido {state.orderCode} · {pluralPlatos(count)}
          </p>
        </div>
      </div>

      <ActionBar
        right={
          <p
            role="status"
            className="flex min-h-[max(4.25rem,64px)] items-center gap-3 rounded-full bg-line px-8 font-display text-[1.3rem] font-bold text-ink-soft"
          >
            <LoaderCircle aria-hidden className="size-6 animate-spin" />
            Preparando entrega…
          </p>
        }
      />
    </>
  )
}
