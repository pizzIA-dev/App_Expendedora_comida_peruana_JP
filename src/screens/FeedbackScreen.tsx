import { Check, House, Send, Star } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { Notice } from '../components/Notice'
import { ScreenTitle } from '../components/ScreenTitle'
import { notices } from '../config/brand'
import { useOrder } from '../features/order/OrderContext'

const SCALES = [
  { id: 'facilidad', label: 'Facilidad', question: '¿Qué tan fácil fue completar tu pedido?', low: 'Muy difícil', high: 'Muy fácil' },
  { id: 'claridad', label: 'Claridad', question: '¿Qué tan clara fue la información?', low: 'Nada clara', high: 'Muy clara' },
  { id: 'confianza', label: 'Confianza', question: '¿Cuánta confianza te dio la máquina?', low: 'Ninguna', high: 'Mucha' },
] as const

type ScaleId = (typeof SCALES)[number]['id']

/**
 * Evaluación demostrativa: el estado vive solo en este componente y
 * desaparece al salir. En M0 no se guarda ni se envía nada.
 */
export function FeedbackScreen() {
  const { dispatch } = useOrder()
  const [ratings, setRatings] = useState<Partial<Record<ScaleId, number>>>({})
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const finish = () => dispatch({ type: 'RESET' })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-1 flex-col items-center justify-center gap-5 py-10 text-center">
        <span className="grid size-24 animate-pop place-items-center rounded-full bg-brand text-white">
          <Check aria-hidden className="size-14" strokeWidth={3.2} />
        </span>
        <h1 tabIndex={-1} data-screen-title className="text-[2.6rem] font-extrabold text-brand kiosk:text-[3.6rem]">
          ¡Gracias por tu <span className="underline-accent">opinión</span>!
        </h1>
        <p className="max-w-[34rem] text-[1.2rem] text-ink-soft">
          En esta maqueta tus respuestas no se guardan ni se envían.
        </p>
        <Button variant="primary" size="lg" onClick={finish} autoFocus>
          <House aria-hidden className="size-7" />
          Volver al inicio
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col kiosk:min-h-0">
      <ScreenTitle
        icon={Star}
        title={
          <>
            ¿Cómo fue tu <span className="underline-accent">experiencia</span>?
          </>
        }
        subtitle="Evaluación opcional · menos de un minuto."
      />

      <div className="mt-4 grid gap-4 kiosk:grid-cols-3 kiosk:gap-5">
        {SCALES.map((scale) => (
          <fieldset key={scale.id} className="rounded-[1.6rem] border border-line bg-white p-4 shadow-card kiosk:p-5">
            <legend className="float-left w-full">
              <span className="block font-display text-[1.45rem] font-extrabold text-brand">{scale.label}</span>
              <span className="mt-0.5 block text-[1rem] text-ink-soft">{scale.question}</span>
            </legend>
            <div className="clear-both flex justify-between gap-2 pt-3">
              {[1, 2, 3, 4, 5].map((n) => {
                const checked = ratings[scale.id] === n
                return (
                  <label
                    key={n}
                    className={`grid aspect-square min-h-[max(3.25rem,52px)] flex-1 place-items-center rounded-2xl border-2 font-display text-[1.5rem] font-extrabold transition has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                      checked ? 'border-brand bg-brand text-white' : 'border-line bg-mint-soft text-ink hover:border-leaf'
                    }`}
                  >
                    <input
                      type="radio"
                      name={scale.id}
                      value={n}
                      checked={checked}
                      onChange={() => setRatings((r) => ({ ...r, [scale.id]: n }))}
                      className="sr-only"
                      aria-label={`${n} de 5`}
                    />
                    {n}
                  </label>
                )
              })}
            </div>
            <p aria-hidden className="mt-2 flex justify-between text-[0.85rem] font-semibold text-ink-soft">
              <span>1 · {scale.low}</span>
              <span>5 · {scale.high}</span>
            </p>
          </fieldset>
        ))}
      </div>

      <label htmlFor="mejoras" className="mt-4 font-display text-[1.3rem] font-bold text-brand">
        ¿Qué mejorarías? <span className="font-sans text-[0.95rem] font-medium text-ink-soft">(opcional)</span>
      </label>
      <textarea
        id="mejoras"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={300}
        rows={2}
        placeholder="Escribe aquí tu sugerencia…"
        className="mt-2 w-full resize-none rounded-[1.4rem] border-2 border-line bg-white px-5 py-3 text-[1.1rem] text-ink placeholder:text-ink-soft/80 focus:border-brand kiosk:min-h-0 kiosk:flex-1"
      />

      <Notice className="mt-3 self-start">{notices.feedback}. No pedimos nombre, correo ni teléfono.</Notice>

      <ActionBar
        left={<Button onClick={finish}>Omitir</Button>}
        right={
          <Button type="submit" variant="primary" size="lg">
            <Send aria-hidden className="size-6" />
            Enviar opinión
          </Button>
        }
      />
    </form>
  )
}
