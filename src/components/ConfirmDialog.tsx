import { useEffect, useRef } from 'react'
import { Button } from './Button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** Confirmación modal con <dialog> nativo: atrapa el foco y cierra con Esc. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      className="m-auto w-[min(92vw,34rem)] rounded-[2rem] bg-white p-7 text-ink shadow-2xl open:animate-pop kiosk:p-9"
    >
      <h2 id="confirm-title" className="text-[1.9rem] font-extrabold text-brand">
        {title}
      </h2>
      <p id="confirm-desc" className="mt-3 text-[1.15rem] text-ink-soft">
        {description}
      </p>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="primary" onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
      </div>
    </dialog>
  )
}
