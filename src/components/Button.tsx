import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-3 rounded-full font-display font-bold leading-none ' +
  'transition duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-cta hover:bg-brand-deep ' +
    'disabled:bg-line disabled:text-ink-soft disabled:shadow-none',
  secondary:
    'border border-line bg-mint-soft text-ink hover:bg-mint disabled:text-ink-soft disabled:opacity-60',
  danger: 'border border-danger/35 bg-white text-danger hover:bg-danger-soft',
}

/* Altura mínima táctil: nunca menos de 56 px aunque la raíz escale */
const sizes: Record<Size, string> = {
  md: 'min-h-[max(3.5rem,56px)] px-6 text-[1.1rem]',
  lg: 'min-h-[max(4.25rem,64px)] px-8 text-[1.45rem] kiosk:min-w-[25rem]',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
