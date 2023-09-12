import type React from 'react'

export interface FileProps {
  label?: string
  name?: string
  value?: File | undefined | null
  onChange?: (e: TOnChange) => void
}

export type TOnChange = React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
