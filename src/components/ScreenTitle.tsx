import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** Tres trazos naranjas decorativos, como en las referencias */
export function Sparks({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={`text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    >
      <path d="M6 12 12 3M16 21l15-9M19 33l14 1" />
    </svg>
  )
}

/**
 * Título de pantalla. El h1 recibe el foco al cambiar de pantalla
 * (ver App.tsx) para que teclado y lectores empiecen desde arriba.
 */
export function ScreenTitle({
  icon: Icon,
  title,
  subtitle,
  aside,
}: {
  icon: LucideIcon
  title: ReactNode
  subtitle?: string
  aside?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
      <span
        aria-hidden
        className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-mint text-brand sm:grid"
      >
        <Icon className="size-8" strokeWidth={2.2} />
      </span>
      <h1
        tabIndex={-1}
        data-screen-title
        className="relative pr-9 text-[2.1rem] font-extrabold text-brand kiosk:text-[3rem]"
      >
        {title}
        <Sparks className="absolute -top-2 right-0 size-8" />
      </h1>
      {subtitle && (
        <p className="w-full text-[1.1rem] text-ink-soft kiosk:w-auto kiosk:border-l-2 kiosk:border-line kiosk:pl-5 kiosk:text-[1.25rem]">
          {subtitle}
        </p>
      )}
      {aside && <div className="kiosk:ml-auto">{aside}</div>}
    </div>
  )
}
