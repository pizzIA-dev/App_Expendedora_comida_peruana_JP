import { limits } from '../../config/brand'
import { findDish } from '../../data/catalog'
import { findSauce } from '../../data/sauces'
import type { Dish, OrderItem, Sauce } from '../../types'

/** Stock vigente en la sesión: plato → unidades */
export type StockMap = Record<string, number>

export interface OrderLine {
  lineId: string
  dish: Dish
  sauces: Sauce[]
  quantity: number
  subtotalCents: number
}

/** sauceIds ya normalizados (ver normalizeSauceIds) */
export function lineIdOf(dishId: string, sauceIds: string[]): string {
  return `${dishId}|${sauceIds.join('+') || 'sin'}`
}

/** «Ají amarillo, Mayonesa» o «Sin acompañamiento» */
export function saucesLabel(sauces: Sauce[]): string {
  return sauces.length ? sauces.map((s) => s.name).join(', ') : 'Sin acompañamiento'
}

/** Líneas del pedido con precios tomados siempre del catálogo (las salsas no cuestan) */
export function orderLines(items: OrderItem[]): OrderLine[] {
  return items.flatMap((item) => {
    const dish = findDish(item.dishId)
    return dish
      ? [
          {
            lineId: item.lineId,
            dish,
            sauces: item.sauceIds.flatMap((id) => {
              const sauce = findSauce(id)
              return sauce ? [sauce] : []
            }),
            quantity: item.quantity,
            subtotalCents: dish.priceCents * item.quantity,
          },
        ]
      : []
  })
}

export function orderTotalCents(items: OrderItem[]): number {
  return orderLines(items).reduce((sum, line) => sum + line.subtotalCents, 0)
}

/** Cantidad total de platos del pedido */
export function orderCount(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

/** Unidades de un plato en el pedido, sumando todas sus salsas */
export function quantityOf(items: OrderItem[], dishId: string): number {
  return items.reduce((sum, i) => (i.dishId === dishId ? sum + i.quantity : sum), 0)
}

export function stockOf(stock: StockMap, dishId: string): number {
  return stock[dishId] ?? 0
}

const byName = new Intl.Collator('es', { sensitivity: 'base' })

/**
 * Orden del menú: primero los sugeridos, luego el resto en orden alfabético y al final los
 * agotados (también alfabéticos). Usa el stock de la sesión: un plato que se agota durante la
 * demo pasa al final.
 */
export function catalogOrder(dishes: Dish[], stock: StockMap): Dish[] {
  const rank = (d: Dish) => (stockOf(stock, d.id) <= 0 ? 2 : d.featured ? 0 : 1)
  return [...dishes].sort((a, b) => rank(a) - rank(b) || byName.compare(a.name, b.name))
}

export type AddBlock = 'soldOut' | 'stock' | 'order'

/**
 * Por qué no se puede agregar otra unidad de un plato (o null si se puede).
 * La usan el reducer (guarda) y la interfaz (mensaje), así nunca discrepan.
 */
export function addBlockReason(items: OrderItem[], stock: StockMap, dishId: string): AddBlock | null {
  const available = stockOf(stock, dishId)
  if (available <= 0) return 'soldOut'
  if (quantityOf(items, dishId) >= available) return 'stock'
  if (orderCount(items) >= limits.maxPerOrder) return 'order'
  return null
}

export const blockMessages: Record<AddBlock, string> = {
  soldOut: 'Este plato está agotado.',
  stock: 'Has alcanzado la cantidad disponible de este plato.',
  order: `Llegaste al máximo de ${limits.maxPerOrder} platos por pedido.`,
}

export function pluralPlatos(count: number): string {
  return count === 1 ? '1 plato' : `${count} platos`
}
