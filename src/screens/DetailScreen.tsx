import { ArrowLeft, Ban, CalendarClock, ChevronRight, Leaf, ShoppingBasket, Snowflake, Soup, Star, TriangleAlert } from 'lucide-react'
import { ActionBar } from '../components/ActionBar'
import { AvailabilityBadge } from '../components/AvailabilityBadge'
import { Button } from '../components/Button'
import { Notice } from '../components/Notice'
import { Sparks } from '../components/ScreenTitle'
import { notices } from '../config/brand'
import { findDish, formatSoles } from '../data/catalog'
import { useOrder } from '../features/order/OrderContext'

export function DetailScreen() {
  const { state, dispatch } = useOrder()
  const dish = findDish(state.viewingDishId)

  // Pantalla protegida: sin plato válido no hay nada que mostrar
  if (!dish) {
    return (
      <div className="grid flex-1 place-items-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Volver al inicio</Button>
      </div>
    )
  }

  const facts = [
    { icon: Soup, label: 'Porción', value: dish.portion },
    { icon: CalendarClock, label: 'Preparación (ficticia)', value: dish.preparation },
    { icon: Snowflake, label: 'Conservación (ilustrativa)', value: dish.storage },
  ]

  return (
    <>
      <div className="grid gap-5 pt-4 kiosk:min-h-0 kiosk:flex-1 kiosk:grid-cols-[0.8fr_1fr] kiosk:gap-8">
        <figure className="relative h-56 overflow-hidden rounded-[2rem] shadow-card sm:h-80 kiosk:h-auto">
          <img
            src={dish.image}
            alt={dish.imageAlt}
            className={`absolute inset-0 size-full object-cover ${dish.available ? '' : 'opacity-75 grayscale'}`}
          />
          {dish.featured && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 font-display text-[1rem] font-bold text-ink">
              <Star aria-hidden className="size-5 fill-current" /> Sugerencia
            </span>
          )}
        </figure>

        <div className="flex flex-col gap-3 kiosk:min-h-0 kiosk:gap-3.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1
              tabIndex={-1}
              data-screen-title
              className="relative pr-10 text-[2.4rem] font-extrabold text-brand kiosk:text-[3.3rem]"
            >
              {dish.name}
              <Sparks className="absolute -top-1 right-0 size-8" />
            </h1>
            <p className="rounded-full bg-mint px-5 py-2 font-display text-[2rem] leading-none font-extrabold text-brand">
              <span className="sr-only">Precio: </span>
              {formatSoles(dish.priceCents)}
            </p>
          </div>

          <p className="text-[1.15rem] text-ink-soft">{dish.description}</p>

          <AvailabilityBadge available={dish.available} className="self-start" />

          <dl className="grid gap-2.5 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2.5">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint text-brand">
                  <Icon className="size-5" />
                </span>
                <div className="leading-tight">
                  <dt className="text-[0.8rem] font-semibold text-ink-soft">{label}</dt>
                  <dd className="text-[0.98rem] font-bold text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <section className="rounded-2xl bg-mint-soft px-4 py-3">
              <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-brand">
                <Leaf aria-hidden className="size-5" /> Ingredientes
              </h2>
              <p className="mt-1.5 text-[1rem] text-ink">{capitalize(dish.ingredients.join(', '))}.</p>
            </section>
            <section className="rounded-2xl bg-accent-soft px-4 py-3">
              <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-accent-ink">
                <TriangleAlert aria-hidden className="size-5" /> Alérgenos
              </h2>
              <ul className="mt-1.5 text-[1rem] text-ink">
                {dish.allergens.map((a) => (
                  <li key={a}>{a}.</li>
                ))}
              </ul>
            </section>
          </div>

          <Notice>
            {notices.food}.
            {dish.contentStatus === 'provisional' && ' Contenido provisional, pendiente de revisión.'}
          </Notice>
        </div>
      </div>

      <ActionBar
        left={
          <Button onClick={() => dispatch({ type: 'BACK_TO_CATALOG' })}>
            <ArrowLeft aria-hidden className="size-5" strokeWidth={2.6} />
            Volver al menú
          </Button>
        }
        right={
          <>
            {!dish.available && (
              <p id="soldout-hint" className="text-[1rem] font-semibold text-ink-soft">
                Este plato está agotado. Elige otro del menú.
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              disabled={!dish.available}
              aria-describedby={dish.available ? undefined : 'soldout-hint'}
              onClick={() => dispatch({ type: 'SELECT_DISH' })}
            >
              {dish.available ? (
                <>
                  <ShoppingBasket aria-hidden className="size-7" />
                  Seleccionar plato
                  <ChevronRight aria-hidden className="size-7" strokeWidth={3} />
                </>
              ) : (
                <>
                  <Ban aria-hidden className="size-6" />
                  Plato agotado
                </>
              )}
            </Button>
          </>
        }
      />
    </>
  )
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
