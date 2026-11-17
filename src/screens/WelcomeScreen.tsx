import { ChevronRight, ListChecks, Pointer, Soup, Timer, Utensils } from 'lucide-react'
import { Button } from '../components/Button'
import { Sparks } from '../components/ScreenTitle'
import { brand } from '../config/brand'
import { dishes, formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'

const FEATURES = [
  { icon: Timer, label: 'Rápido' },
  { icon: Soup, label: 'Sabor casero' },
  { icon: ListChecks, label: 'En pocos pasos' },
]

export function WelcomeScreen() {
  const { dispatch } = useOrder()
  const hero = dishes.find((d) => d.featured) ?? dishes[0]

  return (
    <div className="grid flex-1 items-center gap-6 py-5 kiosk:min-h-0 kiosk:grid-cols-[1.08fr_1fr] kiosk:gap-4 kiosk:py-0">
      {/* Foto en móvil */}
      <img
        src={hero.image}
        alt={hero.imageAlt}
        className="h-52 w-full rounded-[2rem] object-cover shadow-card sm:h-72 kiosk:hidden"
      />

      <div className="relative z-10 flex flex-col items-start gap-5 kiosk:gap-6">
        <p className="relative flex items-center gap-2.5 rounded-full bg-brand-mid px-4 py-2 font-display text-[1rem] font-semibold text-white">
          <Utensils aria-hidden className="size-5" />
          {brand.machine}
          <Sparks className="absolute -top-4 -right-9 size-8" />
        </p>

        <h1
          tabIndex={-1}
          data-screen-title
          className="text-[2.7rem] font-extrabold text-brand kiosk:text-[4.4rem]"
        >
          Comida peruana, lista para <span className="underline-accent whitespace-nowrap">tu ritmo</span>
        </h1>

        <p className="text-[1.3rem] text-ink-soft kiosk:text-[1.7rem]">Elige tu almuerzo en pocos pasos</p>

        <Button
          variant="primary"
          size="lg"
          className="w-full kiosk:w-auto"
          onClick={() => dispatch({ type: 'START' })}
        >
          <Pointer aria-hidden className="size-7" />
          Comenzar pedido
          <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
        </Button>

        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-ink">
              <Icon aria-hidden className="size-6 text-leaf" strokeWidth={2.3} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Composición de kiosco: plato circular sobre forma verde que sangra al borde */}
      <div className="relative hidden self-stretch kiosk:block">
        <div
          aria-hidden
          className="absolute inset-y-0 -right-8 left-[22%] rounded-l-[999px] bg-linear-to-br from-leaf via-brand-mid to-brand-deep"
        />
        <div className="absolute top-1/2 left-0 aspect-square h-[84%] -translate-y-1/2">
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="size-full rounded-full border-[0.7rem] border-white object-cover shadow-[0_30px_60px_-20px_rgb(5_67_42/0.7)]"
          />
          <p className="absolute bottom-[7%] left-[-3%] flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 shadow-card">
            <span className="rounded-full bg-accent px-3 py-1.5 font-display text-[1.05rem] font-extrabold text-ink">
              {formatSoles(hero.priceCents)}
            </span>
            <span className="font-display text-[1.1rem] font-bold text-brand">{hero.name}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
