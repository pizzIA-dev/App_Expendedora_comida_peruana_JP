import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import { initialState, orderReducer, type OrderAction, type OrderState } from './orderReducer'

interface OrderContextValue {
  state: OrderState
  dispatch: Dispatch<OrderAction>
}

const OrderContext = createContext<OrderContextValue | null>(null)

/** Estado en memoria: una recarga vuelve a la bienvenida (suficiente para M0). */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState)
  return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder debe usarse dentro de <OrderProvider>')
  return ctx
}
