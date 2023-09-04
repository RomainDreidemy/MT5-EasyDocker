import React from 'react'
import { type CheckboxProps } from '../../../interfaces/Forms/Checkbox.interface'

const Checkbox = ({ label, name, value, className = '', onChange, onKeyDown }: CheckboxProps): JSX.Element => {
  return (
        <label className={`label cursor-pointer ${className}`} style={{ justifyContent: 'unset', gap: '10px' }}>
            <input
                type="checkbox"
                name={name}
                value={value}
                className={'checkbox'}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <span className="label-text">
                {label}
            </span>
        </label>
  )
}

export default Checkbox
