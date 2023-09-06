import type React from 'react'
import { type IconType } from 'react-icons'

export interface ButtonProps {
  label?: string | Element | JSX.Element
  name?: string
  className?: string
  icon?: JSX.Element | IconType
  variant?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  direction?: string
  disabled?: boolean
}
