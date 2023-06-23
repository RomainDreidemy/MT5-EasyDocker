import type React from 'react'

export interface InputProps {
  label?: string
  type: string
  placeholder?: string
  name?: string
  value?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
