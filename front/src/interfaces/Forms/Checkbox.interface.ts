import type React from 'react'

export interface CheckboxProps {
  label?: string
  name?: string
  value?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
