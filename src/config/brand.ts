/**
 * Marca y textos configurables.
 * La marca es PROVISIONAL hasta que el equipo apruebe nombre e identidad
 * (ver docs/decisions.md). Cambiarla aquí la actualiza en toda la interfaz.
 */
export const brand = {
  name: 'Sazón al Paso',
  tagline: 'Autoservicio',
  machine: 'Expendedora de comida peruana',
  orderPrefix: 'SP',
} as const

/**
 * Avisos visibles. Desde el 2026-11-16 (pedido del usuario) el aviso de simulación solo
 * aparece donde hay cobro: resumen y pago.
 */
export const notices = {
  food: 'Información alimentaria referencial',
  bank: 'No ingreses datos bancarios reales',
  feedback: 'Demostración: tus respuestas no se guardan ni se envían',
} as const

export const limits = {
  /** Unidades máximas de un mismo plato por pedido */
  maxPerDish: 5,
} as const

/** Duraciones de la simulación, en milisegundos */
export const timings = {
  paymentProcessing: 1400,
  paymentApproved: 1100,
  dispatch: 3800,
} as const
