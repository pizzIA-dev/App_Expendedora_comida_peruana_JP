import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Stepper } from '../components/Stepper'
import { useOrder } from '../features/order/OrderContext'
import { CatalogScreen } from '../screens/CatalogScreen'
import { DeliveryScreen } from '../screens/DeliveryScreen'
import { DetailScreen } from '../screens/DetailScreen'
import { FeedbackScreen } from '../screens/FeedbackScreen'
import { PaymentScreen } from '../screens/PaymentScreen'
import { SummaryScreen } from '../screens/SummaryScreen'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import type { Screen } from '../types'

/** Etapa del indicador por pantalla; null = fuera del proceso de compra */
const STEP_BY_SCREEN: Record<Screen, number | null> = {
  welcome: null,
  catalog: 0,
  detail: 0,
  summary: 1,
  payment: 2,
  delivery: 3,
  feedback: null,
}

const SCREENS: Record<Screen, () => React.JSX.Element> = {
  welcome: WelcomeScreen,
  catalog: CatalogScreen,
  detail: DetailScreen,
  summary: SummaryScreen,
  payment: PaymentScreen,
  delivery: DeliveryScreen,
  feedback: FeedbackScreen,
}

export function App() {
  const { state } = useOrder()
  const { screen } = state
  const step = STEP_BY_SCREEN[screen]
  const ScreenComponent = SCREENS[screen]

  // Cada pantalla nueva empieza arriba y con el foco en su título
  useEffect(() => {
    window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('[data-screen-title]')?.focus({ preventScroll: true })
  }, [screen])

  return (
    <div className="relative flex min-h-dvh flex-col kiosk:h-dvh kiosk:overflow-hidden kiosk:pl-7">
      <div aria-hidden className="andean-strip fixed inset-y-0 left-0 hidden w-7 kiosk:block" />
      <Header />
      {step !== null && <Stepper current={step} allDone={screen === 'delivery' && state.deliveryReady} />}
      <main key={screen} className="flex min-h-0 flex-1 animate-screen-in flex-col px-4 kiosk:px-8">
        <ScreenComponent />
      </main>
    </div>
  )
}
