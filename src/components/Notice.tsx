import { Info, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

/** Aviso de simulación / información ilustrativa. Icono + texto, nunca solo color. */
export function Notice({
  tone = 'info',
  children,
  className = '',
}: {
  tone?: 'info' | 'warning'
  children: ReactNode
  className?: string
}) {
  const Icon = tone === 'warning' ? TriangleAlert : Info
  const tones =
    tone === 'warning' ? 'bg-accent-soft text-accent-ink' : 'bg-mint-soft text-ink-soft'
  return (
    <p
      className={`flex items-start gap-2 rounded-2xl px-4 py-2.5 text-[0.95rem] font-medium ${tones} ${className}`}
    >
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}
