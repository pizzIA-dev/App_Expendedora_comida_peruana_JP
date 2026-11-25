import { useEffect, useState } from 'react'
import { SaucePicker } from '../../components/SaucePicker'
import { Toast } from '../../components/Toast'
import type { Dish } from '../../types'
import { useOrder } from './OrderContext'
import { addBlockReason, blockMessages } from './orderSelectors'

/**
 * Flujo para agregar platos, compartido por menú, detalle y resumen:
 * si no se puede (stock o límite del pedido) muestra el motivo; si se puede, abre la ventana
 * de salsas. El reducer repite las mismas guardas.
 * Renderiza `ui` una vez en la pantalla que use el hook.
 */
export function useAddDish() {
  const { state, dispatch } = useOrder()
  const [pickFor, setPickFor] = useState<Dish | null>(null)
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(id)
  }, [toast])

  /** Devuelve true si se puede agregar; si no, muestra el motivo */
  const check = (dishId: string): boolean => {
    const reason = addBlockReason(state.items, state.stock, dishId)
    if (reason) setToast({ id: Date.now(), text: blockMessages[reason] })
    return reason === null
  }

  const addDish = (dish: Dish) => {
    if (check(dish.id)) setPickFor(dish)
  }

  /** «+» de una línea del resumen: misma salsa, sin volver a preguntar */
  const incrementLine = (lineId: string, dishId: string) => {
    if (check(dishId)) dispatch({ type: 'INCREMENT_LINE', lineId })
  }

  const ui = (
    <>
      <SaucePicker
        dish={pickFor}
        onClose={() => setPickFor(null)}
        onConfirm={(sauceIds) => {
          if (pickFor) dispatch({ type: 'ADD_ITEM', dishId: pickFor.id, sauceIds })
          setPickFor(null)
        }}
      />
      <Toast message={toast} />
    </>
  )

  return {
    addDish,
    incrementLine,
    isBlocked: (dishId: string) => addBlockReason(state.items, state.stock, dishId) !== null,
    ui,
  }
}
