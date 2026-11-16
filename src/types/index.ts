export interface Dish {
  id: string
  name: string
  /** Texto corto para la tarjeta del catálogo */
  shortDescription: string
  description: string
  image: string
  imageAlt: string
  /** El dinero se guarda siempre en céntimos */
  priceCents: number
  available: boolean
  featured?: boolean
  portion: string
  ingredients: string[]
  allergens: string[]
  /** Dato ficticio para la simulación */
  preparation: string
  /** Dato ilustrativo para la simulación */
  storage: string
  /** Estado de revisión del contenido alimentario */
  contentStatus: 'provisional' | 'revisado'
}

export interface OrderItem {
  dishId: string
  quantity: number
}

export type Screen =
  | 'welcome'
  | 'catalog'
  | 'detail'
  | 'summary'
  | 'payment'
  | 'delivery'
  | 'feedback'

export type PaymentMethod = 'wallet' | 'card'

export type PaymentStatus = 'idle' | 'processing' | 'approved'
