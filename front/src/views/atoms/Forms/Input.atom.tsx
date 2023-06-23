import React from 'react'

interface InputProps {
  label?: string
  type: string
  placeholder?: string
  name?: string
  value?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = ({ label, type, placeholder, name, value, className = '', onChange, onKeyDown }: InputProps): JSX.Element => {
  return (
        <>
            {(label != null) && <label className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label> }
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`input input-bordered w-full max-w-xs mt-1 ${className}`}
            />
        </>
  )
}

export default Input
