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

export const notices = {
  simulation: 'Simulación académica: no se realizará ningún cobro ni entrega real',
  simulationShort: 'Simulación académica',
  food: 'Información alimentaria ilustrativa para esta simulación',
  bank: 'No ingreses datos bancarios reales',
  feedback: 'Demostración: tus respuestas no se guardan ni se envían',
} as const

/** Duraciones de la simulación, en milisegundos */
export const timings = {
  paymentProcessing: 1400,
  paymentApproved: 1100,
  dispatch: 3800,
} as const
