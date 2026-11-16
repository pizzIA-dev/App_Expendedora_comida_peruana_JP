import type { Dish } from '../types'
import raw from './dishes.json'

export const dishes = raw as Dish[]

export function findDish(id: string | null): Dish | undefined {
  return id ? dishes.find((d) => d.id === id) : undefined
}

/** S/ 16.00 a partir de céntimos */
export function formatSoles(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`
}
