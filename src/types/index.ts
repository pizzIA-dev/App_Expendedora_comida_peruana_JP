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
  /** Unidades disponibles al iniciar la demo; 0 = agotado */
  stock: number
  featured?: boolean
  /** Muestra la etiqueta «Nuevo» */
  isNew?: boolean
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

export interface Sauce {
  id: string
  name: string
  /** Foto de la salsa (public/images/salsas) */
  image: string
}

/**
 * Una línea del pedido = un plato con una combinación concreta de salsas.
 * El mismo plato con otra combinación ocupa otra línea.
 */
export interface OrderItem {
  lineId: string
  dishId: string
  /** Salsas elegidas, sin repetir y en el orden del catálogo de salsas; vacío = sin acompañamiento */
  sauceIds: string[]
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
