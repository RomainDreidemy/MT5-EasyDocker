import React from 'react'
import { type ButtonProps } from '../../../interfaces/Forms/Button.interface'

const Button = ({ label, name, className = '', icon, variant = 'primary', onClick, direction = 'left' }: ButtonProps): JSX.Element => {
  const styles: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link'
  }

  const isDirection = (to: string): boolean | string => to === direction && label

  return (
      <button
          type="button"
          name={name}
          onClick={onClick}
          className={`btn flex-nowrap ${styles[variant]} ${className}`}>
        {isDirection('right')}
        {icon}
        {isDirection('left')}
      </button>
  )
}

export default Button
