import type { Sauce } from '../types'

/**
 * Salsas y cremas, iguales para todos los platos y sin costo adicional (solo en la simulación).
 * Se pueden elegir varias por plato, sin repetir ninguna. Fotos: ver docs/assets.md.
 */
export const sauces: Sauce[] = [
  { id: 'aji-amarillo', name: 'Ají amarillo', image: '/images/salsas/aji-amarillo.jpg' },
  { id: 'rocoto', name: 'Crema de rocoto', image: '/images/salsas/rocoto.jpg' },
  { id: 'mayonesa', name: 'Mayonesa', image: '/images/salsas/mayonesa.jpg' },
  { id: 'ketchup', name: 'Ketchup', image: '/images/salsas/ketchup.jpg' },
]

export function findSauce(id: string): Sauce | undefined {
  return sauces.find((s) => s.id === id)
}

/** Ids válidos, sin repetir y en el orden del catálogo (así la misma elección da la misma línea) */
export function normalizeSauceIds(ids: string[]): string[] | null {
  const unique = new Set(ids)
  if (unique.size !== ids.length || ids.some((id) => !findSauce(id))) return null
  return sauces.filter((s) => unique.has(s.id)).map((s) => s.id)
}
