import React, { useEffect } from 'react'
import { type CheckboxProps } from '../../../interfaces/Forms/Checkbox.interface'
import useToggle from '../../../hooks/useToggle'

const Radio = ({ label, name, value = false, className = '', onChange, onKeyDown }: CheckboxProps): JSX.Element => {
  const [checked, toggle] = useToggle(value)

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log('-', checked)
    // toggle()

    // if (onChange == null) return

    // onChange(event)
  }

  useEffect(() => {
    console.log(checked)
  }, [checked])

  return (
        <label className={`label cursor-pointer ${className}`} style={{ justifyContent: 'unset', gap: '10px' }}>
            <input
                type="radio"
                name={name}
                checked={checked}
                className={'radio'}
                onChange={toggle}
                onKeyDown={onKeyDown}
            />
            <span className="label-text">
                {label}
            </span>
        </label>
  )
}

export default Radio
