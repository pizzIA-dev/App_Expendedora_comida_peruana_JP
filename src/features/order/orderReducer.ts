import { limits } from '../../config/brand'
import { findDish } from '../../data/catalog'
import type { OrderItem, PaymentMethod, PaymentStatus, Screen } from '../../types'

export interface OrderState {
  screen: Screen
  /** Plato cuyo detalle se está consultando */
  viewingDishId: string | null
  /** Platos del pedido, en el orden en que se agregaron */
  items: OrderItem[]
  paymentMethod: PaymentMethod | null
  paymentStatus: PaymentStatus
  orderCode: string | null
  deliveryReady: boolean
}

export const initialState: OrderState = {
  screen: 'welcome',
  viewingDishId: null,
  items: [],
  paymentMethod: null,
  paymentStatus: 'idle',
  orderCode: null,
  deliveryReady: false,
}

export type OrderAction =
  | { type: 'START' }
  | { type: 'VIEW_DISH'; dishId: string }
  | { type: 'BACK_TO_CATALOG' }
  | { type: 'ADD_ITEM'; dishId: string }
  | { type: 'DECREMENT_ITEM'; dishId: string }
  | { type: 'REMOVE_ITEM'; dishId: string }
  | { type: 'GO_TO_SUMMARY' }
  | { type: 'ADD_MORE' }
  | { type: 'CLEAR_ORDER' }
  | { type: 'GO_TO_PAYMENT' }
  | { type: 'BACK_TO_SUMMARY' }
  | { type: 'CHOOSE_METHOD'; method: PaymentMethod }
  | { type: 'PAY' }
  | { type: 'PAYMENT_APPROVED' }
  | { type: 'PAYMENT_DONE'; orderCode: string }
  | { type: 'DELIVERY_READY' }
  | { type: 'OPEN_FEEDBACK' }
  | { type: 'RESET' }

/** El pedido solo se edita antes de pagar */
const EDITABLE: Screen[] = ['catalog', 'detail', 'summary']

/** Tras editar el pedido: se limpia el método de pago y un resumen vacío vuelve al menú */
function withItems(state: OrderState, items: OrderItem[]): OrderState {
  const screen = state.screen === 'summary' && items.length === 0 ? 'catalog' : state.screen
  return { ...state, items, screen, paymentMethod: null }
}

/**
 * Las guardas viven aquí, no solo en los botones: una acción que no
 * corresponde al estado actual se ignora (p. ej. doble toque en «Simular pago»).
 */
export function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'START':
      return { ...initialState, screen: 'catalog' }

    case 'VIEW_DISH':
      if (state.screen !== 'catalog' || !findDish(action.dishId)) return state
      return { ...state, screen: 'detail', viewingDishId: action.dishId }

    case 'BACK_TO_CATALOG':
      if (state.screen !== 'detail') return state
      return { ...state, screen: 'catalog' }

    case 'ADD_ITEM': {
      if (!EDITABLE.includes(state.screen)) return state
      const dish = findDish(action.dishId)
      if (!dish || !dish.available) return state
      const current = state.items.find((i) => i.dishId === dish.id)
      if (current && current.quantity >= limits.maxPerDish) return state
      const items = current
        ? state.items.map((i) => (i.dishId === dish.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { dishId: dish.id, quantity: 1 }]
      const next = withItems(state, items)
      // Desde el detalle se vuelve al menú para poder seguir eligiendo
      return state.screen === 'detail' ? { ...next, screen: 'catalog' } : next
    }

    case 'DECREMENT_ITEM': {
      if (!EDITABLE.includes(state.screen)) return state
      if (!state.items.some((i) => i.dishId === action.dishId)) return state
      const items = state.items
        .map((i) => (i.dishId === action.dishId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
      return withItems(state, items)
    }

    case 'REMOVE_ITEM':
      if (!EDITABLE.includes(state.screen)) return state
      if (!state.items.some((i) => i.dishId === action.dishId)) return state
      return withItems(
        state,
        state.items.filter((i) => i.dishId !== action.dishId),
      )

    case 'GO_TO_SUMMARY':
      if (state.screen !== 'catalog' || state.items.length === 0) return state
      return { ...state, screen: 'summary' }

    case 'ADD_MORE':
      if (state.screen !== 'summary') return state
      return { ...state, screen: 'catalog' }

    // Cancelar el pedido lo vacía y deja al usuario en el menú, listo para elegir de nuevo
    case 'CLEAR_ORDER':
      if (state.screen !== 'summary' && state.screen !== 'catalog') return state
      return { ...state, screen: 'catalog', items: [], paymentMethod: null }

    case 'GO_TO_PAYMENT':
      if (state.screen !== 'summary' || state.items.length === 0) return state
      return { ...state, screen: 'payment' }

    case 'BACK_TO_SUMMARY':
      if (state.screen !== 'payment' || state.paymentStatus !== 'idle') return state
      return { ...state, screen: 'summary' }

    case 'CHOOSE_METHOD':
      if (state.screen !== 'payment' || state.paymentStatus !== 'idle') return state
      return { ...state, paymentMethod: action.method }

    case 'PAY':
      if (state.screen !== 'payment' || state.paymentStatus !== 'idle' || !state.paymentMethod) {
        return state
      }
      return { ...state, paymentStatus: 'processing' }

    case 'PAYMENT_APPROVED':
      if (state.screen !== 'payment' || state.paymentStatus !== 'processing') return state
      return { ...state, paymentStatus: 'approved' }

    case 'PAYMENT_DONE':
      if (state.screen !== 'payment' || state.paymentStatus !== 'approved') return state
      return { ...state, screen: 'delivery', orderCode: action.orderCode, deliveryReady: false }

    case 'DELIVERY_READY':
      if (state.screen !== 'delivery') return state
      return { ...state, deliveryReady: true }

    case 'OPEN_FEEDBACK':
      if (state.screen !== 'delivery' || !state.deliveryReady) return state
      return { ...state, screen: 'feedback' }

    case 'RESET':
      return initialState
  }
}
