import React from 'react'

interface ButtonProps {
  label: string
  name?: string
  className?: string
  icon?: JSX.Element
  variant?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  direction?: string
}

const Button = ({ label, name, className = '', icon, variant = 'primary', onClick, direction = 'left' }: ButtonProps): JSX.Element => {
  const styles: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link'
  }

  return (
      <button
          type="button"
          name={name}
          onClick={onClick}
          className={`btn flex-nowrap ${styles[variant]} ${className}`}>
        {direction === 'right' && label}
        {icon}
        {direction === 'left' && label}
      </button>
  )
}

export default Button
