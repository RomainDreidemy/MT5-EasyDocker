import type React from 'react'
import { type TOnChange } from './file.interface'

export interface CheckboxProps {
  label?: string
  name?: string
  value?: boolean
  className?: string
  onChange?: (e: TOnChange) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
