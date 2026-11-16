import { findDish } from '../../data/catalog'
import type { Dish, OrderItem } from '../../types'

export interface OrderLine {
  dish: Dish
  quantity: number
  subtotalCents: number
}

/** Líneas del pedido con precios tomados siempre del catálogo */
export function orderLines(items: OrderItem[]): OrderLine[] {
  return items.flatMap((item) => {
    const dish = findDish(item.dishId)
    return dish ? [{ dish, quantity: item.quantity, subtotalCents: dish.priceCents * item.quantity }] : []
  })
}

export function orderTotalCents(items: OrderItem[]): number {
  return orderLines(items).reduce((sum, line) => sum + line.subtotalCents, 0)
}

/** Cantidad total de unidades */
export function orderCount(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function quantityOf(items: OrderItem[], dishId: string): number {
  return items.find((i) => i.dishId === dishId)?.quantity ?? 0
}

export function pluralPlatos(count: number): string {
  return count === 1 ? '1 plato' : `${count} platos`
}
