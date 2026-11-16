import { findDish } from '../../data/catalog'
import type { PaymentMethod, PaymentStatus, Screen } from '../../types'

export interface OrderState {
  screen: Screen
  /** Plato cuyo detalle se está consultando */
  viewingDishId: string | null
  /** Plato elegido para el pedido (siempre una unidad) */
  selectedDishId: string | null
  paymentMethod: PaymentMethod | null
  paymentStatus: PaymentStatus
  orderCode: string | null
  deliveryReady: boolean
}

export const initialState: OrderState = {
  screen: 'welcome',
  viewingDishId: null,
  selectedDishId: null,
  paymentMethod: null,
  paymentStatus: 'idle',
  orderCode: null,
  deliveryReady: false,
}

export type OrderAction =
  | { type: 'START' }
  | { type: 'VIEW_DISH'; dishId: string }
  | { type: 'BACK_TO_CATALOG' }
  | { type: 'SELECT_DISH' }
  | { type: 'CHANGE_DISH' }
  | { type: 'GO_TO_PAYMENT' }
  | { type: 'BACK_TO_SUMMARY' }
  | { type: 'CHOOSE_METHOD'; method: PaymentMethod }
  | { type: 'PAY' }
  | { type: 'PAYMENT_APPROVED' }
  | { type: 'PAYMENT_DONE'; orderCode: string }
  | { type: 'DELIVERY_READY' }
  | { type: 'OPEN_FEEDBACK' }
  | { type: 'RESET' }

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

    case 'SELECT_DISH': {
      if (state.screen !== 'detail') return state
      const dish = findDish(state.viewingDishId)
      if (!dish || !dish.available) return state
      const changed = dish.id !== state.selectedDishId
      return {
        ...state,
        screen: 'summary',
        selectedDishId: dish.id,
        paymentMethod: changed ? null : state.paymentMethod,
      }
    }

    case 'CHANGE_DISH':
      if (state.screen !== 'summary') return state
      return { ...state, screen: 'catalog', paymentMethod: null }

    case 'GO_TO_PAYMENT': {
      if (state.screen !== 'summary') return state
      const dish = findDish(state.selectedDishId)
      if (!dish || !dish.available) return state
      return { ...state, screen: 'payment' }
    }

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
