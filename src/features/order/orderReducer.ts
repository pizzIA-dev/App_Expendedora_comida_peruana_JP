import { dishes, findDish } from '../../data/catalog'
import { normalizeSauceIds } from '../../data/sauces'
import type { OrderItem, PaymentMethod, PaymentStatus, Screen } from '../../types'
import { addBlockReason, lineIdOf, type StockMap } from './orderSelectors'

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
  /**
   * Stock de la sesión. Arranca con el de dishes.json, baja con cada compra simulada y se
   * conserva entre pedidos; al recargar la página vuelve al valor inicial (sin backend).
   */
  stock: StockMap
}

export const initialStock: StockMap = Object.fromEntries(dishes.map((d) => [d.id, d.stock]))

export const initialState: OrderState = {
  screen: 'welcome',
  viewingDishId: null,
  items: [],
  paymentMethod: null,
  paymentStatus: 'idle',
  orderCode: null,
  deliveryReady: false,
  stock: initialStock,
}

export type OrderAction =
  | { type: 'START' }
  | { type: 'VIEW_DISH'; dishId: string }
  | { type: 'BACK_TO_CATALOG' }
  /** Agrega una unidad del plato con las salsas elegidas ([] = sin acompañamiento) */
  | { type: 'ADD_ITEM'; dishId: string; sauceIds: string[] }
  /** Quita una unidad del plato (de la última línea agregada), usado desde el menú */
  | { type: 'DECREMENT_DISH'; dishId: string }
  | { type: 'INCREMENT_LINE'; lineId: string }
  | { type: 'DECREMENT_LINE'; lineId: string }
  | { type: 'REMOVE_LINE'; lineId: string }
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
      return { ...initialState, stock: state.stock, screen: 'catalog' }

    case 'VIEW_DISH':
      if (state.screen !== 'catalog' || !findDish(action.dishId)) return state
      return { ...state, screen: 'detail', viewingDishId: action.dishId }

    case 'BACK_TO_CATALOG':
      if (state.screen !== 'detail') return state
      return { ...state, screen: 'catalog' }

    case 'ADD_ITEM': {
      if (!EDITABLE.includes(state.screen)) return state
      const dish = findDish(action.dishId)
      if (!dish) return state
      // Salsas existentes y sin repetir
      const sauceIds = normalizeSauceIds(action.sauceIds)
      if (!sauceIds) return state
      if (addBlockReason(state.items, state.stock, dish.id)) return state
      const lineId = lineIdOf(dish.id, sauceIds)
      const exists = state.items.some((i) => i.lineId === lineId)
      const items = exists
        ? state.items.map((i) => (i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { lineId, dishId: dish.id, sauceIds, quantity: 1 }]
      const next = withItems(state, items)
      // Desde el detalle se vuelve al menú para poder seguir eligiendo
      return state.screen === 'detail' ? { ...next, screen: 'catalog' } : next
    }

    case 'INCREMENT_LINE': {
      if (!EDITABLE.includes(state.screen)) return state
      const line = state.items.find((i) => i.lineId === action.lineId)
      if (!line || addBlockReason(state.items, state.stock, line.dishId)) return state
      return withItems(
        state,
        state.items.map((i) => (i.lineId === line.lineId ? { ...i, quantity: i.quantity + 1 } : i)),
      )
    }

    case 'DECREMENT_LINE': {
      if (!EDITABLE.includes(state.screen)) return state
      if (!state.items.some((i) => i.lineId === action.lineId)) return state
      const items = state.items
        .map((i) => (i.lineId === action.lineId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
      return withItems(state, items)
    }

    case 'DECREMENT_DISH': {
      if (!EDITABLE.includes(state.screen)) return state
      const last = [...state.items].reverse().find((i) => i.dishId === action.dishId)
      if (!last) return state
      return orderReducer(state, { type: 'DECREMENT_LINE', lineId: last.lineId })
    }

    case 'REMOVE_LINE':
      if (!EDITABLE.includes(state.screen)) return state
      if (!state.items.some((i) => i.lineId === action.lineId)) return state
      return withItems(
        state,
        state.items.filter((i) => i.lineId !== action.lineId),
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

    case 'PAYMENT_DONE': {
      if (state.screen !== 'payment' || state.paymentStatus !== 'approved') return state
      // La compra simulada descuenta el stock de la sesión
      const stock = { ...state.stock }
      for (const item of state.items) stock[item.dishId] = Math.max(0, (stock[item.dishId] ?? 0) - item.quantity)
      return { ...state, screen: 'delivery', orderCode: action.orderCode, deliveryReady: false, stock }
    }

    case 'DELIVERY_READY':
      if (state.screen !== 'delivery') return state
      return { ...state, deliveryReady: true }

    case 'OPEN_FEEDBACK':
      if (state.screen !== 'delivery' || !state.deliveryReady) return state
      return { ...state, screen: 'feedback' }

    case 'RESET':
      return { ...initialState, stock: state.stock }
  }
}
