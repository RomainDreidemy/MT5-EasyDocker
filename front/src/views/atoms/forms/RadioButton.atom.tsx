import React from 'react'
import { type CheckboxProps } from '../../../interfaces/Forms/Checkbox.interface'
import useToggle from '../../../hooks/useToggle'

const Radio = ({ label, name, value = false, className = '', onChange, onKeyDown }: CheckboxProps): JSX.Element => {
  const [checked, toggle] = useToggle(value)

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(checked)
    toggle()

    // if (onChange == null) return

    onChange(event)
  }

  return (
        <label className={`label cursor-pointer ${className}`} style={{ justifyContent: 'unset', gap: '10px' }}>
            <input
                type="radio"
                name={name}
                checked={checked}
                className={'checkbox'}
                onChange={onUpdate}
                onKeyDown={onKeyDown}
            />
            <span className="label-text">
                {label}
            </span>
        </label>
  )
}

export default Radio
