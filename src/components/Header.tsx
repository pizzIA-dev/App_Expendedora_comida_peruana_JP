import { Clock, FlaskConical, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand, notices } from '../config/brand'

const timeFormat = new Intl.DateTimeFormat('es-PE', { hour: 'numeric', minute: '2-digit', hour12: true })

function useClock(): string {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return timeFormat.format(now)
}

export function Header() {
  const time = useClock()
  return (
    <header className="flex items-center gap-3 border-b border-line bg-white/80 px-4 py-2.5 kiosk:gap-5 kiosk:px-8 kiosk:py-3">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-brand text-white">
          <UtensilsCrossed className="size-6" strokeWidth={2.4} />
        </span>
        <div className="leading-none">
          <p className="font-display text-[1.3rem] font-extrabold tracking-tight text-brand">{brand.name}</p>
          <p className="mt-1 text-[0.72rem] font-bold tracking-[0.14em] text-ink-soft uppercase">
            {brand.tagline}
          </p>
        </div>
      </div>

      <p className="hidden border-l-2 border-line pl-5 font-display text-[1.05rem] font-semibold text-ink kiosk:block">
        {brand.machine}
      </p>

      <div className="ml-auto flex items-center gap-4">
        <p
          title={notices.simulation}
          className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[0.85rem] font-bold text-accent-ink"
        >
          <FlaskConical aria-hidden className="size-4 shrink-0" />
          <span className="hidden sm:inline">{notices.simulationShort}</span>
          <span className="sm:hidden">Simulación</span>
        </p>
        <p className="hidden items-center gap-2 font-display text-[1.1rem] font-semibold text-ink sm:flex">
          <Clock aria-hidden className="size-5 text-brand" />
          <time>{time}</time>
        </p>
      </div>
    </header>
  )
}
