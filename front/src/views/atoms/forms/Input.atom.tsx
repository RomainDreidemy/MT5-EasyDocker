import React from 'react'
import { type InputProps } from '../../../interfaces/Forms/Input.interface'

const Input = ({ label, type, placeholder, name, value, className = '', onChange, onKeyDown, maxLength, required = false, disabled }: InputProps): JSX.Element => {
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
                maxLength={maxLength}
                disabled={disabled}
                className={`input input-bordered w-full max-w-xs mt-1 ${className}`}
                required={required}
            />
        </>
  )
}

export default Input
