import React from 'react'
import { type InputProps } from '../../../interfaces/Forms/Input.interface'

const TextArea = ({ label, placeholder, name, value, className = '', onChange }: InputProps): JSX.Element => {
  return (
    <>
      {(label != null) && <label className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label>}
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full max-w-xs mt-1 ${className}`}
      />
    </>
  )
}

export default TextArea
