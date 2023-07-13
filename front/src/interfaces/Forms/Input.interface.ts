import type React from 'react'

export interface InputProps {
  label?: string
  type: string
  placeholder?: string
  name?: string
  value?: string
  className?: string
  onChange?: (e: TOnChange) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export type TOnChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
