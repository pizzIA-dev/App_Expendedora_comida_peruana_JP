import type { ReactNode } from 'react'

/**
 * Barra de acciones al pie de cada pantalla.
 * Posición constante: «volver» a la izquierda, acción principal a la derecha.
 * En móvil se apila (la principal primero) y fluye con el contenido: no es fija.
 */
export function ActionBar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="mt-auto flex flex-col-reverse gap-3 pt-5 pb-5 kiosk:flex-row kiosk:items-center kiosk:justify-between kiosk:pt-4 kiosk:pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">{left}</div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">{right}</div>
    </div>
  )
}
