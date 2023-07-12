import type React from 'react'

export interface ButtonProps {
  label: string
  name?: string
  className?: string
  icon?: JSX.Element
  variant?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  direction?: string
  disabled?: boolean
}
