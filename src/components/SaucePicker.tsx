import { Ban, Check, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { sauces } from '../data/sauces'
import type { Dish } from '../types'
import { Button } from './Button'

interface SaucePickerProps {
  /** Plato que se está agregando; null = ventana cerrada */
  dish: Dish | null
  /** sauceIds vacío = sin acompañamiento */
  onConfirm: (sauceIds: string[]) => void
  onClose: () => void
}

const option =
  'relative flex w-full flex-col overflow-hidden rounded-[1.6rem] border-2 bg-white text-center font-display ' +
  'text-[1.02rem] leading-tight font-bold transition active:scale-[0.98] sm:text-[1.15rem]'

/**
 * Ventana «¿Deseas agregar una salsa o crema?» que aparece al agregar un plato.
 * Se pueden marcar varias salsas (cada una una sola vez); «Sin acompañamiento» desmarca todas.
 * El plato se agrega al confirmar.
 */
export function SaucePicker({ dish, onConfirm, onClose }: SaucePickerProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = dish !== null
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      setSelected([])
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  const toggle = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((s) => s !== id) : [...current, id]))

  const none = selected.length === 0
  const confirmLabel = none
    ? 'Agregar sin salsa'
    : `Agregar con ${selected.length} ${selected.length === 1 ? 'salsa' : 'salsas'}`

  return (
    <dialog
      ref={ref}
      aria-labelledby="sauce-title"
      aria-describedby="sauce-desc"
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      className="m-auto w-[min(94vw,60rem)] rounded-[2rem] bg-white p-5 text-ink shadow-2xl open:animate-pop kiosk:p-7"
    >
      {dish && (
        <>
          <div className="flex items-start gap-4">
            <img src={dish.image} alt="" className="hidden h-20 w-24 shrink-0 rounded-2xl object-cover sm:block" />
            <div className="min-w-0 flex-1">
              <h2 id="sauce-title" className="text-[1.6rem] font-extrabold text-brand kiosk:text-[1.9rem]">
                ¿Deseas agregar una salsa o crema?
              </h2>
              <p id="sauce-desc" className="mt-1 text-[1.02rem] text-ink-soft">
                Para tu <strong className="text-ink">{dish.name}</strong>. Puedes elegir varias; cada una va en
                una porción individual aparte.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[0.95rem] font-bold text-brand">
                <Check aria-hidden className="size-4" strokeWidth={3} /> Sin costo adicional
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar sin agregar el plato"
              onClick={onClose}
              className="grid size-[max(2.75rem,44px)] shrink-0 place-items-center rounded-full text-ink-soft hover:bg-mint-soft"
            >
              <X aria-hidden className="size-6" />
            </button>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {sauces.map((sauce) => {
              const checked = selected.includes(sauce.id)
              return (
                <li key={sauce.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggle(sauce.id)}
                    className={`${option} ${checked ? 'border-brand bg-mint-soft text-brand ring-3 ring-brand/25' : 'border-line text-brand hover:border-brand'}`}
                  >
                    <img src={sauce.image} alt="" className="h-[4.5rem] w-full object-cover sm:h-28" />
                    <span className="flex min-h-[2.9rem] items-center justify-center px-2 py-1.5 sm:min-h-[3.2rem] sm:py-2">{sauce.name}</span>
                    <span
                      aria-hidden
                      className={`absolute top-2 right-2 grid size-8 place-items-center rounded-full border-2 ${
                        checked ? 'border-brand bg-brand text-white' : 'border-white bg-white/85 text-transparent'
                      }`}
                    >
                      <Check className="size-5" strokeWidth={3.2} />
                    </span>
                  </button>
                </li>
              )
            })}
            <li>
              <button
                type="button"
                role="checkbox"
                aria-checked={none}
                onClick={() => setSelected([])}
                className={`${option} h-full ${none ? 'border-brand bg-mint-soft text-brand ring-3 ring-brand/25' : 'border-line text-ink-soft hover:border-brand'}`}
              >
                <span aria-hidden className="grid h-[4.5rem] w-full place-items-center bg-mint-soft sm:h-28">
                  <Ban className="size-10" />
                </span>
                <span className="flex min-h-[2.9rem] items-center justify-center px-2 py-1.5 sm:min-h-[3.2rem] sm:py-2">Sin acompañamiento</span>
              </button>
            </li>
          </ul>

          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button onClick={onClose}>Volver</Button>
            <Button variant="primary" onClick={() => onConfirm(selected)} autoFocus>
              {confirmLabel}
              <ChevronRight aria-hidden className="size-6" strokeWidth={3} />
            </Button>
          </div>
        </>
      )}
    </dialog>
  )
}
