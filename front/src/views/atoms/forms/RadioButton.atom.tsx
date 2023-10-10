import React from 'react'
import { type CheckboxProps } from '../../../interfaces/Forms/Checkbox.interface'

const Radio = ({ label, name, value = false, className = '', onChange, onKeyDown }: CheckboxProps): JSX.Element => {
  return (
        <label className={`label cursor-pointer ${className}`} style={{ justifyContent: 'unset', gap: '10px' }}>
            <input
                type="radio"
                name={name}
                checked={value}
                className={'radio'}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <span className="label-text">
                {label}
            </span>
        </label>
  )
}

export default Radio
